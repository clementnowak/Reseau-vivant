"""Génère les deux cartes SVG du site (monde + Afrique) à partir de Natural Earth (domaine public).

Usage : python3 tools/generer-cartes.py <dossier geojson Natural Earth> <dossier de sortie>
Fichiers attendus : ne_110m_admin_0_countries.geojson et ne_50m_admin_0_countries.geojson
(https://github.com/nvkelso/natural-earth-vector, dossier geojson/).
Les SVG produits sont ensuite collés dans index.html (section #carte).
"""
import json, math, sys
NE = sys.argv[1]; OUT = sys.argv[2]

def dp(pts, tol):
    if len(pts) < 3: return pts
    stack=[(0,len(pts)-1)]; keep=[False]*len(pts); keep[0]=keep[-1]=True
    while stack:
        a,b=stack.pop(); ax,ay=pts[a]; bx,by=pts[b]; dx,dy=bx-ax,by-ay; L=math.hypot(dx,dy) or 1e-9
        best,bi=0,None
        for i in range(a+1,b):
            px,py=pts[i]; d=(abs(dy*px-dx*py+bx*ay-by*ax)/L) if L>1e-6 else math.hypot(px-ax,py-ay)
            if d>best: best,bi=d,i
        if bi is not None and best>tol: keep[bi]=True; stack+= [(a,bi),(bi,b)]
    return [p for p,k in zip(pts,keep) if k]

def area(pts):
    return abs(sum(pts[i][0]*pts[i-1][1]-pts[i-1][0]*pts[i][1] for i in range(len(pts))))/2

def path(polys, proj, tol, minarea):
    out=[]
    for poly in polys:
        for ri,ring in enumerate(poly):
            pts=[proj(lon,lat) for lon,lat in ring]
            pts=dp(pts,tol)
            if len(pts)<4 or area(pts)<minarea: continue
            out.append('M'+'L'.join(f'{x:.1f} {y:.1f}' for x,y in pts[:-1])+'Z')
    return ''.join(out)

def polys_of(f):
    g=f['geometry']; return [g['coordinates']] if g['type']=='Polygon' else g['coordinates']

# ---------- World map (Natural Earth I projection) ----------
def ne1(lon,lat):
    l=math.radians(lon); p=math.radians(lat); p2=p*p; p4=p2*p2
    x=l*(0.870700-0.131979*p2-0.013791*p4+0.003971*p4*p4*p2-0.001529*p4*p4*p4)
    y=p*(1.007226+0.015085*p2-0.044475*p4*p2+0.028874*p4*p4-0.005916*p4*p4*p2)
    return x,y
S=58
xmax=ne1(180,0)[0]; ytop=ne1(0,84)[1]
def wproj(lon,lat):
    x,y=ne1(lon,max(lat,-58)); return (x+xmax)*S+4,(ytop-y)*S+4
W=round(2*xmax*S+8); H=round((ytop-ne1(0,-58)[1])*S+8)
w=json.load(open(NE+'/ne_110m_admin_0_countries.geojson'))
af=[];rest=[]
for f in w['features']:
    if f['properties']['CONTINENT']=='Antarctica': continue
    (af if f['properties']['CONTINENT']=='Africa' else rest).append(f)
def multi(fs): 
    r=[]; [r.extend(polys_of(f)) for f in fs]; return r
world_rest=path(multi(rest),wproj,0.6,1.5)
world_af=path(multi(af),wproj,0.6,1.5)
# zoom box around Africa
x0,y0=wproj(-20,39); x1,y1=wproj(53,-37)
bx0=min(x0,wproj(-20,-37)[0]); bx1=max(x1,wproj(53,39)[0])
eq_y=wproj(0,0)[1]
fr=wproj(2.4,46.6)
world=f'''<svg class="world-map" viewBox="0 0 {W} {H}" role="img" aria-labelledby="worldTitle"><title id="worldTitle">Carte du monde : l’Afrique est mise en couleur</title><rect class="sea" x="0" y="0" width="{W}" height="{H}" rx="14"/><line class="equator" x1="4" x2="{W-4}" y1="{eq_y:.1f}" y2="{eq_y:.1f}"/><path class="land" d="{world_rest}"/><path class="land africa" d="{world_af}"/><rect class="zoom-box" x="{bx0-3:.1f}" y="{y0-3:.1f}" width="{bx1-bx0+6:.1f}" height="{y1-y0+6:.1f}" rx="6"/><circle class="france-dot" cx="{fr[0]:.1f}" cy="{fr[1]:.1f}" r="3.2"/><text class="france-label" x="{fr[0]-6:.1f}" y="{fr[1]-6:.1f}" text-anchor="end">France</text><text class="africa-label" x="{wproj(20,8)[0]:.1f}" y="{wproj(20,8)[1]:.1f}" text-anchor="middle">Afrique</text><text class="equator-label" x="{W-8}" y="{eq_y-4:.1f}" text-anchor="end">Équateur</text></svg>'''

# ---------- Africa map (equirectangular) ----------
d=json.load(open(NE+'/ne_50m_admin_0_countries.geojson'))
A=[f for f in d['features'] if f['properties']['CONTINENT']=='Africa' and f['properties']['ADM0_A3'] not in ('CPV','STP','COM')]
LON0,LON1,LAT0,LAT1=-19,53,38.5,-36
K=5.2
def aproj(lon,lat): return (lon-LON0)*K,(LAT0-lat)*K
AW=round((LON1-LON0)*K); AH=round((LAT0-LAT1)*K)
REG={'west':'SEN GMB GNB GIN SLE LBR CIV MLI BFA GHA TGO BEN NER NGA MRT'.split(),
     'central':'CMR TCD CAF COG COD GAB GNQ'.split(),
     'east':'SDN SDS ETH ERI DJI SOM SOL KEN UGA RWA BDI TZA'.split(),
     'south':'AGO ZMB MWI MOZ ZWE BWA NAM ZAF LSO SWZ'.split()}
CLIP={'west':15.5,'central':12.5,'east':15.5,'south':99}
code={f['properties']['ADM0_A3']:f for f in A}
allpath=path(multi(A),aproj,0.55,0.8)
regions=''
clips=''
for r,codes in REG.items():
    p=path(multi([code[c] for c in codes if c in code]),aproj,0.55,0.8)
    top=aproj(0,CLIP[r])[1]
    clips+=f'<clipPath id="clip-{r}"><rect x="0" y="{max(top,0):.1f}" width="{AW}" height="{AH}"/></clipPath>'
    regions+=f'<path id="map-{r}" class="range-region" clip-path="url(#clip-{r})" d="{p}"/>'
sy0=aproj(0,18)[1]; sy1=aproj(0,12)[1]; sx0=aproj(-17.5,0)[0]; sx1=aproj(39,0)[0]
clips+=f'<path id="af-land" d="{allpath}"/><clipPath id="clip-land"><use href="#af-land"/></clipPath>'
regions+=f'<rect id="map-sahel" class="range-region" clip-path="url(#clip-land)" x="{sx0:.1f}" y="{sy0:.1f}" width="{sx1-sx0:.1f}" height="{sy1-sy0:.1f}"/>'
def lab(cls,txt,lon,lat,extra='',anchor='middle'):
    x,y=aproj(lon,lat); return f'<text class="{cls}" x="{x:.1f}" y="{y:.1f}" text-anchor="{anchor}"{extra}>{txt}</text>'
eq=aproj(0,0)[1]
labels=(lab('region-label','Ouest',-6,9.5,' data-region="west"')+lab('region-label','Sahel',9,15.3,' data-region="sahel"')+
 lab('region-label','Centre',21,3.5,' data-region="central"')+lab('region-label','Est',37.5,3,' data-region="east"')+
 lab('region-label','Sud',24,-21,' data-region="south"')+lab('desert-label','Sahara',10,25)+
 lab('ocean-label','Océan Atlantique',-7,-14)+lab('ocean-label','Océan Indien',52.4,-6,'','end')+lab('isle-label','Madagascar',46.5,-28.6))
africa=f'''<svg id="africaMap" class="africa-map" viewBox="0 0 {AW} {AH}" role="img" aria-labelledby="africaTitle africaDesc"><title id="africaTitle">Carte de l’Afrique</title><desc id="africaDesc">Les régions où vit l’animal choisi sont coloriées en orange.</desc><defs>{clips}</defs><rect class="sea" width="{AW}" height="{AH}" rx="14"/><line class="equator" x1="0" x2="{AW}" y1="{eq:.1f}" y2="{eq:.1f}"/><text class="equator-label" x="6" y="{eq-5:.1f}">Équateur</text><use class="land-outline" href="#af-land"/><use class="land" href="#af-land"/><g class="ranges">{regions}</g>{labels}<g class="compass" transform="translate(30 {AH-34})"><circle r="15"/><path d="M0 -11 L4 2 L0 0 L-4 2Z"/><text y="-17" text-anchor="middle">N</text></g></svg>'''
open(OUT+'/world.svg','w').write(world); open(OUT+'/africa.svg','w').write(africa)
print(len(world),len(africa),W,H,AW,AH)
