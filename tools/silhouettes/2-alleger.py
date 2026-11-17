import json,re,os,math
meta=json.load(open('/home/claude/phylo/meta.json'))
src='/home/claude/phylo/clean'; dst='/home/claude/phylo/small'; os.makedirs(dst,exist_ok=True)
tok=re.compile(r'([MmLlHhVvCcZz])|(-?\d*\.?\d+(?:[eE][-+]?\d+)?)')
def parse(d):
    items=[]; 
    for m in tok.finditer(d):
        items.append(m.group(1) if m.group(1) else float(m.group(2)))
    i=0; cmd=None; cur=(0,0); start=(0,0); polys=[]; poly=[]
    def num(n):
        nonlocal i
        v=items[i:i+n]; i+=n; return v
    while i<len(items):
        if isinstance(items[i],str): cmd=items[i]; i+=1
        if cmd in 'Zz':
            if poly: polys.append(poly); poly=[]
            cur=start; continue
        if cmd in 'Mm':
            x,y=num(2)
            if cmd=='m': x+=cur[0]; y+=cur[1]
            if poly: polys.append(poly)
            poly=[(x,y)]; cur=(x,y); start=cur; cmd='l' if cmd=='m' else 'L'
        elif cmd in 'Ll':
            x,y=num(2)
            if cmd=='l': x+=cur[0]; y+=cur[1]
            cur=(x,y); poly.append(cur)
        elif cmd in 'Hh':
            (x,)=num(1); x= x+cur[0] if cmd=='h' else x; cur=(x,cur[1]); poly.append(cur)
        elif cmd in 'Vv':
            (y,)=num(1); y= y+cur[1] if cmd=='v' else y; cur=(cur[0],y); poly.append(cur)
        elif cmd in 'Cc':
            a=num(6)
            if cmd=='c': a=[a[0]+cur[0],a[1]+cur[1],a[2]+cur[0],a[3]+cur[1],a[4]+cur[0],a[5]+cur[1]]
            p0=cur; p1=(a[0],a[1]); p2=(a[2],a[3]); p3=(a[4],a[5])
            for s in range(1,7):
                t=s/6; u=1-t
                poly.append((u**3*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t**3*p3[0], u**3*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t**3*p3[1]))
            cur=p3
    if poly: polys.append(poly)
    return polys
def dp(pts,eps):
    if len(pts)<3: return pts
    stack=[(0,len(pts)-1)]; keep=[False]*len(pts); keep[0]=keep[-1]=True
    while stack:
        a,b=stack.pop(); (x1,y1),(x2,y2)=pts[a],pts[b]; dx,dy=x2-x1,y2-y1; L=math.hypot(dx,dy) or 1e-9
        md=0;mi=-1
        for j in range(a+1,b):
            dist=abs(dy*(pts[j][0]-x1)-dx*(pts[j][1]-y1))/L
            if dist>md: md=dist;mi=j
        if md>eps: keep[mi]=True; stack+= [(a,mi),(mi,b)]
    return [p for p,k in zip(pts,keep) if k]
EPS=float(__import__('sys').argv[1]) if len(__import__('sys').argv)>1 else 0.35
tot=0; stats={}
for k,m in meta.items():
    s=open(f'{src}/{m["file"]}').read()
    d=re.search(r' d="([^"]+)"',s).group(1); tr=re.search(r'transform="([^"]+)"',s).group(1)
    sc=re.search(r'scale\(([-\d.eE]+),\s*([-\d.eE]+)\)',tr); tx=re.search(r'translate\(([-\d.eE]+),\s*([-\d.eE]+)\)',tr)
    sx,sy=float(sc.group(1)),float(sc.group(2)); ox,oy=(float(tx.group(1)),float(tx.group(2))) if tx else (0,0)
    polys=[[((x+0)*sx+ox*0, (y)*sy) for x,y in p] for p in parse(d)]
    # transform order: translate(ox,oy) scale(sx,sy) => X = ox + x*sx
    polys=[[(ox+x*sx/ sx*sx if False else ox+x*sx, oy+y*sy) for x,y in [(px/sx if False else px, py) for px,py in []]] for _ in []] or None
    pol=parse(d)
    pts_all=[(ox+x*sx, oy+y*sy) for p in pol for x,y in p]
    xs=[p[0] for p in pts_all]; ys=[p[1] for p in pts_all]
    x0,x1,y0,y1=min(xs),max(xs),min(ys),max(ys); S=max(x1-x0,y1-y0)
    scale=100/S; w=(x1-x0)*scale; h=(y1-y0)*scale
    eps=EPS
    while True:
        out=[]
        for p in pol:
            q=[((ox+x*sx-x0)*scale,(oy+y*sy-y0)*scale) for x,y in p]
            far=max(range(len(q)),key=lambda j:(q[j][0]-q[0][0])**2+(q[j][1]-q[0][1])**2)
            q=dp(q[:far+1],eps)[:-1]+dp(q[far:]+[q[0]],eps)[:-1]
            if len(q)>=3: out.append('M'+' '.join(f'{round(x,1):g} {round(y,1):g}' for x,y in q)+'Z')
        dd=''.join(out)
        if len(dd)<=6000 or eps>6: break
        eps*=1.4
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {h:.1f}" aria-hidden="true" focusable="false"><path fill="currentColor" d="{dd}"/></svg>'
    open(f'{dst}/{m["file"]}','w').write(svg); tot+=len(svg); stats[k]=(len(svg),round(w/h if h else 0,2))
print(tot, max(stats.items(),key=lambda x:x[1][0]), sorted(stats.items(),key=lambda x:x[1][0])[:3])
