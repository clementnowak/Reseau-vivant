import json,re,os,sys
meta=json.load(open('/home/claude/phylo/meta.json'))
DROP=set(sys.argv[1].split(',')) if len(sys.argv)>1 and sys.argv[1] else set()
extra=json.load(open(sys.argv[2])) if len(sys.argv)>2 else {}
byu={'savane':{}, 'recif':{}}; credits={'savane':[],'recif':[]}
for k,m in meta.items():
    if k in DROP: continue
    u,i=k.split('/'); s=open('/home/claude/phylo/small/'+m['file']).read()
    vb=re.search(r'viewBox="([^"]+)"',s).group(1); d=re.search(r' d="([^"]*)"',s).group(1)
    assert re.fullmatch(r'[MZ0-9. \-]+',d),k
    byu[u][i]=[vb,d]; credits[u].append((i,m['name'],m['spec'],m['by'],m['uuid'],m['lic']))
for k,v in extra.items():
    pass
for u in byu:
    body='window.RV_SIL = window.RV_SIL || {};\nwindow.RV_SIL["%s"] = %s;\n'%(u,json.dumps(byu[u],ensure_ascii=False,separators=(',',':')))
    open(f'/home/claude/reseau-vivant/univers/{u}/silhouettes.js','w').write(body)
    print(u,len(byu[u]),len(body))
json.dump(credits,open('/home/claude/phylo/credits.json','w'),ensure_ascii=False,indent=1)
