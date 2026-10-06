/* Returns Coming: annular tags measured from the moment an event reaches the bit. */
const ReturnsEngine = (() => {
  function sections(holes, origin) {
    if (!Number.isFinite(origin) || origin <= 0) throw Error('Enter an origin MD greater than zero.');
    const rows=holes.map(h=>({from:Number(h.from),to:Number(h.to),id:Number(h.id),od:Number(h.od),over:Number(h.over)||0}))
      .filter(h=>h.to>0&&h.from<origin).sort((a,b)=>a.from-b.from);
    let end=0;
    const result=[];
    for (const h of rows) {
      if (![h.from,h.to,h.id,h.od,h.over].every(Number.isFinite)||h.to<=h.from||h.id<=h.od||h.od<0||h.over<0) throw Error('Check hole intervals, ID, string OD and excess volume.');
      const from=Math.max(0,h.from),to=Math.min(origin,h.to);
      if (Math.abs(from-end)>1e-6) throw Error('Hole geometry must cover surface to origin without gaps or overlaps.');
      const cap=Math.PI/4e6*(h.id*h.id-h.od*h.od)*(1+h.over/100);
      result.push({from,to,cap}); end=to;
    }
    if (Math.abs(end-origin)>1e-6) throw Error('Hole geometry does not reach the marker origin.');
    return result;
  }
  const volume=rows=>rows.reduce((sum,r)=>sum+(r.to-r.from)*r.cap,0);
  function position(rows,displaced) {
    let left=Math.max(0,displaced);
    for (const r of [...rows].reverse()) {
      const v=(r.to-r.from)*r.cap;
      if (left<v) return r.to-left/r.cap;
      left-=v;
    }
    return 0;
  }
  function predict(marker,tracking,output,spm,efficiency,running,state,now=Date.now()) {
    const displaced=Math.max(0,tracking-marker.startTrackingVolume),remaining=Math.max(0,volume(marker.sections)-displaced);
    const perStroke=output*Math.max(0,Math.min(100,efficiency))/100;
    const strokes=perStroke>0?remaining/perStroke:Infinity;
    const moving=running&&spm>0&&perStroke>0&&!['connection','reverse'].includes(state);
    const minutes=moving?strokes/spm:Infinity;
    return {displaced,remaining,md:position(marker.sections,displaced),strokes,minutes,eta:Number.isFinite(minutes)?now+minutes*60000:null,arrived:remaining<=1e-9};
  }
  return {sections,volume,position,predict};
})();
if (typeof module!=='undefined') module.exports=ReturnsEngine;

if (typeof document!=='undefined') (()=>{
  const KEY='rigcalc-return-tags-v108';
  let markers=[];
  try {const saved=JSON.parse(localStorage.getItem(KEY)||'[]');if(Array.isArray(saved))markers=saved.filter(m=>Array.isArray(m.sections)&&m.sections.length&&Number.isFinite(m.startTrackingVolume));} catch(e){}
  const persist=()=>localStorage.setItem(KEY,JSON.stringify(markers));
  const colors=['#12b76a','#f79009','#7f56d9','#ee46bc','#2f75b5'];
  const tvd=md=>trajectoryMode()==='vertical'?md:interpTVD(md);
  function originInfo(md) {
    const f=[...wpData.formations].filter(f=>Number(f.md)<=md).sort((a,b)=>b.md-a.md)[0];
    const low=Number(f?.lowGrad),high=Number(f?.highGrad);
    return {formation:f?.name||'Formation not entered',pressure:low>0&&high>=low?`${(low*1000/9.80665).toFixed(0)}–${(high*1000/9.80665).toFixed(0)} kg/m³ EMW`:'Pressure data not entered'};
  }
  function stateFor(m,snap,settings) {return ReturnsEngine.predict(m,snap.trackingVolume,settings.output,settings.spm,settings.efficiency,liveState.running,settings.state);}
  function drawTags(states) {
    const svg=q('wellPath')?.ownerSVGElement;if(!svg)return;
    let layer=q('returnTagMarkers');if(!layer){layer=document.createElementNS('http://www.w3.org/2000/svg','g');layer.id='returnTagMarkers';svg.appendChild(layer);}
    layer.replaceChildren();const geom=profilePlotGeometry(Math.max(0,n('wp_bit')));
    states.forEach(({m,s},i)=>{if(m.arrivedAt)return;const p=displayXY(s.md),c=document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('cx',geom.sx(p.x));c.setAttribute('cy',geom.sy(p.tvd));c.setAttribute('r','8');c.setAttribute('fill',colors[i%colors.length]);c.setAttribute('stroke','#fff');c.setAttribute('stroke-width','2');
      const title=document.createElementNS('http://www.w3.org/2000/svg','title');title.textContent=`${m.label}: ${s.md.toFixed(0)} m MD; origin ${m.originMD} m`;c.appendChild(title);layer.appendChild(c);
    });
  }
  function cell(tr,text){const td=document.createElement('td');td.textContent=text;tr.appendChild(td);return td;}
  function render() {
    const snap=activeSnapshot(),settings=currentLiveSettings();let changed=false;
    const states=markers.map(m=>({m,s:stateFor(m,snap,settings)}));
    states.forEach(({m,s})=>{if(!m.arrivedAt&&s.arrived){m.arrivedAt=Date.now();m.arrivalStrokes=snap.strokes;changed=true;}});
    if(changed)persist();
    const pending=states.filter(x=>!x.m.arrivedAt).sort((a,b)=>a.s.remaining-b.s.remaining||a.m.createdAt-b.m.createdAt);
    const body=q('returnsTable').querySelector('tbody');body.replaceChildren();
    if(!pending.length){const tr=document.createElement('tr');cell(tr,'No tagged returns pending. Tag an event at the bit to begin.').colSpan=7;body.appendChild(tr);}
    pending.forEach(({m,s})=>{const tr=document.createElement('tr');cell(tr,m.label);cell(tr,`${m.originMD.toFixed(0)} MD / ${m.originTVD.toFixed(0)} TVD m\n${m.formation}\n${m.pressure}`);
      cell(tr,`${s.md.toFixed(0)} MD / ${tvd(s.md).toFixed(0)} TVD m`);cell(tr,s.remaining.toFixed(3)+' m³');cell(tr,Number.isFinite(s.strokes)?s.strokes.toFixed(1):'Output / efficiency required');
      const paused=settings.state==='reverse'?'Reverse flow — ETA held':!liveState.running||settings.state==='connection'||settings.spm<=0?'Pumps Off — ETA paused':'Output / efficiency required';
      cell(tr,Number.isFinite(s.minutes)?`${s.minutes.toFixed(2)} min\n${new Date(s.eta).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}`:paused);
      const action=cell(tr,'');const button=document.createElement('button');button.textContent='Remove';button.onclick=()=>{markers=markers.filter(x=>x.id!==m.id);persist();render();};action.appendChild(button);body.appendChild(tr);
    });
    const arrivals=q('returnArrivals');arrivals.replaceChildren();
    states.filter(x=>x.m.arrivedAt).sort((a,b)=>b.m.arrivedAt-a.m.arrivedAt).forEach(({m})=>{const p=document.createElement('p');p.textContent=`AT SURFACE — ${m.label} — Origin ${m.originMD.toFixed(0)} m MD (${m.formation}) • detected ${new Date(m.arrivedAt).toLocaleTimeString()} • ${m.pressure}`;arrivals.appendChild(p);});
    drawTags(states);
  }
  q('tagReturnBtn').onclick=()=>{
    try {
      const origin=q('returnOrigin').value.trim()===''?n('wp_bit'):Number(q('returnOrigin').value);
      if(origin>n('wp_bit'))throw Error('Origin MD cannot exceed the current bit MD.');
      const rows=ReturnsEngine.sections(wpData.holes,origin),snap=activeSnapshot(),info=originInfo(origin);
      markers.push({id:`${Date.now()}-${Math.random().toString(36).slice(2)}`,label:q('returnLabel').value.trim()||q('returnType').value,originMD:origin,originTVD:tvd(origin),...info,createdAt:Date.now(),startStrokes:snap.strokes,startTrackingVolume:snap.trackingVolume,sections:rows});
      q('returnLabel').value='';q('returnError').textContent='';persist();render();
    }catch(e){q('returnError').textContent=e.message;}
  };
  q('clearReturnArrivalsBtn').onclick=()=>{markers=markers.filter(m=>!m.arrivedAt);persist();render();};
  ['liveResetBtn','wpResetBtn'].forEach(id=>q(id).addEventListener('click',()=>{markers=[];persist();render();}));
  document.addEventListener('change',render);setInterval(render,500);render();
})();
