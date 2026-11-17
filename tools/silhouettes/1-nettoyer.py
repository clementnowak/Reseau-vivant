import json,re,os,html
import xml.etree.ElementTree as ET
d=json.load(open('/mnt/user-data/uploads/reseau-vivant/silhouettes/phylopic-reseau-vivant.json'))
out='/home/claude/phylo/clean'; os.makedirs(out,exist_ok=True)
ok_d=re.compile(r'^[MmLlHhVvCcSsQqTtAaZz0-9eE.,+\-\s]+$'); ok_t=re.compile(r'^(translate|scale)\([0-9eE.,+\-\s]+\)(\s*(translate|scale)\([0-9eE.,+\-\s]+\))*$')
meta={}; sizes={}
for k,v in d.items():
    root=ET.fromstring(v['svg'])
    ns='{http://www.w3.org/2000/svg}'
    vb=root.get('viewBox'); assert re.match(r'^[0-9.\s\-]+$',vb)
    paths=[]; 
    for g in root.iter(ns+'g'):
        t=g.get('transform','')
        assert ok_t.match(t),(k,t)
        for p in g.iter(ns+'path'):
            dd=p.get('d'); assert ok_d.match(dd),(k)
            dd=re.sub(r'\s+',' ',dd).strip()
            paths.append(dd)
        gt=t
    # numbers: shorten decimals
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"><g transform="{gt}" fill="currentColor" stroke="none"><path d="{" ".join(paths)}"/></g></svg>'
    fn=k.replace('/','__')+'.svg'; open(f'{out}/{fn}','w').write(svg); sizes[k]=len(svg)
    meta[k]={'uuid':v['uuid'],'lic':v['lic'],'name':v['name'],'spec':v['spec'],'by':v['by'],'file':fn,'vb':vb}
json.dump(meta,open('/home/claude/phylo/meta.json','w'),ensure_ascii=False,indent=1)
print(len(meta),sum(sizes.values()),max(sizes.items(),key=lambda x:x[1]))
