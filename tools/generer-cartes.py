"""Génère les cartes SVG des univers du site, à partir de Natural Earth (domaine public).

Usage : python3 tools/generer-cartes.py <dossier geojson Natural Earth> <dossier du site>
Fichiers attendus : ne_110m_admin_0_countries.geojson et ne_50m_admin_0_countries.geojson
(https://github.com/nvkelso/natural-earth-vector, dossier geojson/).

Produit, pour chaque univers, un fragment HTML univers/<id>/cartes.html (deux cartes : le monde,
puis un zoom). Les zones qui se colorient portent l'attribut data-region ; le site les allume
selon l'animal choisi. Aucun style en ligne : tout passe par des classes (politique de sécurité).
"""
import json, math, sys

NE, SITE = sys.argv[1], sys.argv[2]


# ---------- Outils géométriques ----------
def dp(pts, tol):
    """Simplification de Douglas-Peucker."""
    if len(pts) < 3:
        return pts
    stack = [(0, len(pts) - 1)]
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    while stack:
        a, b = stack.pop()
        ax, ay = pts[a]; bx, by = pts[b]
        dx, dy = bx - ax, by - ay
        L = math.hypot(dx, dy)
        best, bi = 0, None
        for i in range(a + 1, b):
            px, py = pts[i]
            d = abs(dy * px - dx * py + bx * ay - by * ax) / L if L > 1e-6 else math.hypot(px - ax, py - ay)
            if d > best:
                best, bi = d, i
        if bi is not None and best > tol:
            keep[bi] = True
            stack += [(a, bi), (bi, b)]
    return [p for p, k in zip(pts, keep) if k]


def area(pts):
    return abs(sum(pts[i][0] * pts[i - 1][1] - pts[i - 1][0] * pts[i][1] for i in range(len(pts)))) / 2


def path(polys, proj, tol, minarea, shift=None):
    out = []
    for poly in polys:
        for ring in poly:
            ring2 = shift(ring) if shift else ring
            pts = dp([proj(lon, lat) for lon, lat in ring2], tol)
            if len(pts) < 4 or area(pts) < minarea:
                continue
            out.append('M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in pts[:-1]) + 'Z')
    return ''.join(out)


def poly_path(pts, proj):
    return 'M' + 'L'.join('{:.1f} {:.1f}'.format(*proj(lon, lat)) for lon, lat in pts) + 'Z'


def polys_of(f):
    g = f['geometry']
    return [g['coordinates']] if g['type'] == 'Polygon' else g['coordinates']


def multi(fs):
    r = []
    for f in fs:
        r.extend(polys_of(f))
    return r


# ---------- Projection du monde (Natural Earth I), centrée sur Greenwich ----------
def ne1(lon, lat):
    l = math.radians(lon); p = math.radians(lat); p2 = p * p; p4 = p2 * p2
    x = l * (0.870700 - 0.131979 * p2 - 0.013791 * p4 + 0.003971 * p4 * p4 * p2 - 0.001529 * p4 * p4 * p4)
    y = p * (1.007226 + 0.015085 * p2 - 0.044475 * p4 * p2 + 0.028874 * p4 * p4 - 0.005916 * p4 * p4 * p2)
    return x, y


S = 58
XMAX = ne1(180, 0)[0]; YTOP = ne1(0, 84)[1]


def wproj(lon, lat):
    x, y = ne1(lon, max(lat, -58))
    return (x + XMAX) * S + 4, (YTOP - y) * S + 4


W = round(2 * XMAX * S + 8); H = round((YTOP - ne1(0, -58)[1]) * S + 8)
world = json.load(open(NE + '/ne_110m_admin_0_countries.geojson'))
wfeat = [f for f in world['features'] if f['properties']['CONTINENT'] != 'Antarctica']


def zoom_box(lon0, lat0, lon1, lat1):
    xs = [wproj(lo, la)[0] for lo in (lon0, lon1) for la in (lat0, lat1, 0)]
    ys = [wproj(lo, la)[1] for lo in (lon0, lon1) for la in (lat0, lat1)]
    x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
    return f'<rect class="zoom-box" x="{x0 - 3:.1f}" y="{y0 - 3:.1f}" width="{x1 - x0 + 6:.1f}" height="{y1 - y0 + 6:.1f}" rx="6"/>'


def france():
    fr = wproj(2.4, 46.6)
    return (f'<circle class="france-dot" cx="{fr[0]:.1f}" cy="{fr[1]:.1f}" r="3.2"/>'
            f'<text class="france-label" x="{fr[0] - 6:.1f}" y="{fr[1] - 6:.1f}" text-anchor="end">France</text>')


def equator(width, y, x0=4, label_x=None, anchor='end'):
    lx = label_x if label_x is not None else width - 8
    return (f'<line class="equator" x1="{x0}" x2="{width - x0}" y1="{y:.1f}" y2="{y:.1f}"/>'
            f'<text class="equator-label" x="{lx}" y="{y - 4:.1f}" text-anchor="{anchor}">Équateur</text>')


def compass(x, y):
    return f'<g class="compass" transform="translate({x} {y})"><circle r="15"/><path d="M0 -11 L4 2 L0 0 L-4 2Z"/><text y="-17" text-anchor="middle">N</text></g>'


def fragment(world_caption, world_svg, zoom_svg, legend):
    return (f'<figure class="map-card world-card"><figcaption><span class="map-step">1</span> {world_caption}</figcaption>{world_svg}</figure>'
            '<div class="zoom-arrow" aria-hidden="true"><span>Zoom</span></div>'
            f'<figure class="map-card zoom-card"><figcaption><span class="map-step">2</span> <span id="mapCaption">Les régions où il vit</span></figcaption>{zoom_svg}'
            f'<p class="map-legend"><span class="legend-swatch" aria-hidden="true"></span> <span id="mapLegend">{legend}</span></p></figure>\n')


# =====================================================================
# Univers « savane africaine »
# =====================================================================
af = [f for f in wfeat if f['properties']['CONTINENT'] == 'Africa']
rest = [f for f in wfeat if f['properties']['CONTINENT'] != 'Africa']
eq_y = wproj(0, 0)[1]
world_savane = (f'<svg class="world-map" viewBox="0 0 {W} {H}" role="img" aria-labelledby="worldTitle"><title id="worldTitle">Carte du monde : l’Afrique est mise en couleur</title>'
                f'<rect class="sea" x="0" y="0" width="{W}" height="{H}" rx="14"/>{equator(W, eq_y)}'
                f'<path class="land" d="{path(multi(rest), wproj, 0.6, 1.5)}"/><path class="land africa" d="{path(multi(af), wproj, 0.6, 1.5)}"/>'
                f'{zoom_box(-20, 39, 53, -37)}{france()}'
                f'<text class="africa-label" x="{wproj(20, 8)[0]:.1f}" y="{wproj(20, 8)[1]:.1f}" text-anchor="middle">Afrique</text></svg>')

d50 = json.load(open(NE + '/ne_50m_admin_0_countries.geojson'))
A = [f for f in d50['features'] if f['properties']['CONTINENT'] == 'Africa' and f['properties']['ADM0_A3'] not in ('CPV', 'STP', 'COM')]
LON0, LON1, LAT0, LAT1 = -19, 53, 38.5, -36
K = 5.2


def aproj(lon, lat):
    return (lon - LON0) * K, (LAT0 - lat) * K


AW = round((LON1 - LON0) * K); AH = round((LAT0 - LAT1) * K)
REG = {'west': 'SEN GMB GNB GIN SLE LBR CIV MLI BFA GHA TGO BEN NER NGA MRT'.split(),
       'central': 'CMR TCD CAF COG COD GAB GNQ'.split(),
       'east': 'SDN SDS ETH ERI DJI SOM SOL KEN UGA RWA BDI TZA'.split(),
       'south': 'AGO ZMB MWI MOZ ZWE BWA NAM ZAF LSO SWZ'.split()}
CLIP = {'west': 15.5, 'central': 12.5, 'east': 15.5, 'south': 99}
code = {f['properties']['ADM0_A3']: f for f in A}
allpath = path(multi(A), aproj, 0.55, 0.8)
regions = clips = ''
for r, codes in REG.items():
    p = path(multi([code[c] for c in codes if c in code]), aproj, 0.55, 0.8)
    top = aproj(0, CLIP[r])[1]
    clips += f'<clipPath id="clip-{r}"><rect x="0" y="{max(top, 0):.1f}" width="{AW}" height="{AH}"/></clipPath>'
    regions += f'<path data-region="{r}" class="range-region" clip-path="url(#clip-{r})" d="{p}"/>'
sy0 = aproj(0, 18)[1]; sy1 = aproj(0, 12)[1]; sx0 = aproj(-17.5, 0)[0]; sx1 = aproj(39, 0)[0]
clips += f'<path id="af-land" d="{allpath}"/><clipPath id="clip-land"><use href="#af-land"/></clipPath>'
regions += f'<rect data-region="sahel" class="range-region" clip-path="url(#clip-land)" x="{sx0:.1f}" y="{sy0:.1f}" width="{sx1 - sx0:.1f}" height="{sy1 - sy0:.1f}"/>'


def lab(proj, cls, txt, lon, lat, extra='', anchor='middle'):
    x, y = proj(lon, lat)
    return f'<text class="{cls}" x="{x:.1f}" y="{y:.1f}" text-anchor="{anchor}"{extra}>{txt}</text>'


eq = aproj(0, 0)[1]
labels = (lab(aproj, 'region-label', 'Ouest', -6, 9.5, ' data-region="west"') + lab(aproj, 'region-label', 'Sahel', 9, 15.3, ' data-region="sahel"') +
          lab(aproj, 'region-label', 'Centre', 21, 3.5, ' data-region="central"') + lab(aproj, 'region-label', 'Est', 37.5, 3, ' data-region="east"') +
          lab(aproj, 'region-label', 'Sud', 24, -21, ' data-region="south"') + lab(aproj, 'desert-label', 'Sahara', 10, 25) +
          lab(aproj, 'ocean-label', 'Océan Atlantique', -7, -14) + lab(aproj, 'ocean-label', 'Océan Indien', 52.4, -6, '', 'end') + lab(aproj, 'isle-label', 'Madagascar', 46.5, -28.6))
africa = (f'<svg id="zoomMap" class="zoom-map africa-map" viewBox="0 0 {AW} {AH}" role="img" aria-labelledby="zoomTitle zoomDesc"><title id="zoomTitle">Carte de l’Afrique</title>'
          f'<desc id="zoomDesc">Les régions où vit l’animal choisi sont coloriées en orange.</desc><defs>{clips}</defs><rect class="sea" width="{AW}" height="{AH}" rx="14"/>'
          f'{equator(AW, eq, 0, 6, "start")}<use class="land-outline" href="#af-land"/><use class="land" href="#af-land"/><g class="ranges">{regions}</g>{labels}{compass(30, AH - 34)}</svg>')
open(SITE + '/univers/savane/cartes.html', 'w', encoding='utf-8').write(fragment('L’Afrique dans le monde', world_savane, africa, 'Il vit dans ces régions'))

# =====================================================================
# Univers « récif corallien »
# =====================================================================
# Zones de récifs, dessinées sous les terres : seule la partie en mer reste visible.
ZONES = {
    'mer_rouge': [[(32.2, 30.2), (34.8, 29.6), (36, 27), (39, 22), (42.5, 16), (43.8, 12.3), (42.4, 12), (40, 15.5), (37.5, 19), (35, 23.5), (33, 27.5)]],
    'indien': [[(39, -1), (42, 10), (51, 12.5), (57, 18), (66, 21), (72, 18), (77, 7), (82, 7), (88, 15), (94, 17), (98, 12), (99, 4), (95, -4), (85, -10), (74, -9), (63, -24), (48, -28), (38, -26), (34, -12)]],
    'triangle': [[(95, 7), (100, 10), (108, 13), (117, 21), (124, 21), (128, 12), (134, 6), (142, 0), (152, -1), (160, -5), (162, -11), (152, -11.5), (142, -9.6), (128, -9.6), (114, -9.6), (104, -7), (96, -1)]],
    'australie': [[(110, -12.5), (128, -10.5), (142, -10.4), (147, -10.4), (156, -16), (156, -27), (150, -27), (110, -27)]],
    'pacifique': [[(160, -12.5), (163, -4), (172, 2), (180, 4), (180, -24), (166, -24), (160, -18)],
                  [(-180, 4), (-160, 6), (-150, -8), (-135, -14), (-135, -26), (-160, -24), (-180, -24)]],
    'caraibes': [[(-91, 22), (-86, 26), (-80, 27.5), (-73, 27), (-62, 19), (-60, 12), (-62, 10), (-77, 8), (-83, 9), (-89, 14)]],
}
ZLON0, ZLON1, ZLAT0, ZLAT1 = 28, 180, 32, -32

zones_world = ''.join(f'<path data-region="{r}" class="range-region" d="{"".join(poly_path(p, wproj) for p in polys)}"/>' for r, polys in ZONES.items())
tropic_n = wproj(0, 23.44)[1]; tropic_s = wproj(0, -23.44)[1]
cx, cy = wproj(-76, 21)
world_recif = (f'<svg class="world-map recif-map" viewBox="0 0 {W} {H}" role="img" aria-labelledby="worldTitle"><title id="worldTitle">Carte du monde : les grandes régions de récifs coralliens, dans les mers chaudes</title>'
               f'<rect class="sea" x="0" y="0" width="{W}" height="{H}" rx="14"/>'
               f'<rect class="warm-belt" x="4" y="{tropic_n:.1f}" width="{W - 8}" height="{tropic_s - tropic_n:.1f}"/><line class="equator" x1="4" x2="{W - 4}" y1="{eq_y:.1f}" y2="{eq_y:.1f}"/>'
               f'<g class="ranges">{zones_world}</g><path class="land" d="{path(multi(wfeat), wproj, 0.6, 1.5)}"/>'
               f'{zoom_box(ZLON0, ZLAT0, ZLON1, ZLAT1)}{france()}'
               f'<text class="region-label small" data-region="caraibes" x="{cx:.1f}" y="{cy - 5:.1f}" text-anchor="middle">Caraïbes</text>'
               f'<text class="warm-label" x="10" y="{tropic_s + 11:.1f}">Mers chaudes</text></svg>')

KZ = 2.4


def zproj(lon, lat):
    return (lon - ZLON0) * KZ, (ZLAT0 - lat) * KZ


def unwrap(ring):
    # Les terres situées juste à l'ouest de la ligne de changement de date passent à droite de la carte.
    return [(lon + 360, lat) for lon, lat in ring] if max(lon for lon, _ in ring) < -100 else ring


ZW = round((ZLON1 - ZLON0) * KZ); ZH = round((ZLAT0 - ZLAT1) * KZ)
zfeat = [f for f in d50['features'] if f['properties']['CONTINENT'] in ('Africa', 'Asia', 'Oceania', 'Europe')]
zland = path(multi(zfeat), zproj, 0.45, 0.5, unwrap)
zones_zoom = ''.join(f'<path data-region="{r}" class="range-region" d="{"".join(poly_path(p, zproj) for p in polys)}"/>' for r, polys in ZONES.items() if r != 'caraibes')
zeq = zproj(0, 0)[1]


def zlab(cls, txt, lon, lat, region=None, anchor='middle', lines=None):
    x, y = zproj(lon, lat)
    extra = f' data-region="{region}"' if region else ''
    if lines:
        t = ''.join(f'<tspan x="{x:.1f}" dy="{0 if i == 0 else 13}">{l}</tspan>' for i, l in enumerate(lines))
        return f'<text class="{cls}" x="{x:.1f}" y="{y:.1f}" text-anchor="{anchor}"{extra}>{t}</text>'
    return f'<text class="{cls}" x="{x:.1f}" y="{y:.1f}" text-anchor="{anchor}"{extra}>{txt}</text>'


zlabels = (zlab('region-label', 'Mer Rouge', 41.5, 24, 'mer_rouge', 'start') + zlab('region-label', 'Océan Indien', 70, -6, 'indien') +
           zlab('region-label', '', 124, 2.5, 'triangle', lines=['Triangle', 'de corail']) + zlab('region-label', 'Australie', 134, -22, 'australie') +
           zlab('region-label', 'Pacifique', 179, -9, 'pacifique', 'end') +
           zlab('land-name', 'Afrique', 29.5, 8, anchor='start') + zlab('land-name', 'Asie', 92, 27))
zoom_recif = (f'<svg id="zoomMap" class="zoom-map recif-map" viewBox="0 0 {ZW} {ZH}" role="img" aria-labelledby="zoomTitle zoomDesc"><title id="zoomTitle">Carte de l’océan Indien et de l’ouest du Pacifique</title>'
              f'<desc id="zoomDesc">Les mers où vit l’animal choisi sont coloriées.</desc><rect class="sea" width="{ZW}" height="{ZH}" rx="14"/>'
              f'{equator(ZW, zeq, 0, ZW - 6)}<g class="ranges">{zones_zoom}</g><path class="land" d="{zland}"/>{zlabels}{compass(ZW - 24, 34)}</svg>')
open(SITE + '/univers/recif/cartes.html', 'w', encoding='utf-8').write(fragment('Les récifs dans le monde', world_recif, zoom_recif, 'Il vit dans ces mers'))
print('savane', len(world_savane) + len(africa), 'récif', len(world_recif) + len(zoom_recif), (W, H), (ZW, ZH))
