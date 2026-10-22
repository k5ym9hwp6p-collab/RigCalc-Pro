
const q=id=>document.getElementById(id), n=id=>{const el=q(id);return el?(parseFloat(el.value)||0):0};
const set=(id,v,d=3)=>{const el=q(id);if(el)el.textContent=Number.isFinite(v)?v.toFixed(d):"—"};
const circle=d=>0.0000007853981634*d*d;
function save(){const d={};document.querySelectorAll("input,select").forEach(e=>d[e.id]=e.value);localStorage.setItem("rigcalc-v1",JSON.stringify(d))}
function load(){try{const d=JSON.parse(localStorage.getItem("rigcalc-v1")||"{}");Object.entries(d).forEach(([k,v])=>{if(q(k))q(k).value=v})}catch(e){}}
function calcCap(){const h=n("cap_hole"),od=n("cap_od"),id=n("cap_id"),l=n("cap_len"),hc=circle(h),ac=circle(h)-circle(od),pc=circle(id);set("r_hole_cap",hc,6);set("r_hole_vol",hc*l,3);set("r_ann_cap",ac,6);set("r_ann_vol",ac*l,3);set("r_pipe_cap",pc,6);set("r_pipe_vol",pc*l,3);set("r_closed_disp",circle(od),6);set("r_steel_disp",circle(od)-circle(id),6)}
function calcPump(){const li=n("pump_liner"),st=n("pump_stroke"),ef=n("pump_eff")/100,spm=n("pump_spm"),ct=n("pump_count"),av=n("pump_annvol"),ac=n("pump_anncap"),th=3*0.0000000007853981634*li*li*st,ad=th*ef,co=ad*ct,fl=co*spm;set("r_pump_theor",th,6);set("r_pump_adj",ad,6);set("r_pump_flow",fl,3);set("r_bu_strokes",co?av/co:0,0);set("r_bu_time",fl?av/fl:0,2);set("r_stk_m",co?ac/co:0,2)}
function calcWC(){const r=n("wc_density"),t=n("wc_tvd"),s=n("wc_sidpp"),m=n("wc_margin"),p=n("wc_surface"),hy=r*9.80665*t/1000,inc=t?(s+m)*1000/(9.80665*t):0,k=r+inc,eq=t?r+p*1000/(9.80665*t):0;set("r_wc_hydro",hy/1000,3);set("r_wc_inc",inc,1);set("r_wc_kmd",k,1);set("r_wc_sg",k/1000,3);set("r_wc_eqd",eq,1)}
function calcCem(){const h=n("cem_hole"),od=n("cem_od"),l=n("cem_len"),ex=n("cem_excess")/100,ly=n("cem_lead_yield"),tv=n("cem_tail_vol"),ty=n("cem_tail_yield"),cap=circle(h)-circle(od),base=cap*l,total=base*(1+ex),tail=Math.min(tv,total),lead=Math.max(total-tail,0),s=(ly?lead*1000/ly:0)+(ty?tail*1000/ty:0);set("r_cem_cap",cap,6);set("r_cem_base",base,3);set("r_cem_total",total,3);set("r_cem_lead",lead,3);set("r_cem_tail",tail,3);set("r_cem_sacks",s,1)}
function calcTrip(){const od=n("trip_od"),id=n("trip_id"),sl=n("trip_stand"),st=n("trip_stands"),mode=q("trip_mode").value,start=n("trip_start"),obs=n("trip_obs"),len=sl*st,disp=mode==="Wet"?circle(od):circle(od)-circle(id),fill=len*disp,exp=start-fill,chg=start-obs,diff=chg-fill;set("r_trip_len",len,2);set("r_trip_disp",disp,6);set("r_trip_fill",fill,3);set("r_trip_expected",exp,3);set("r_trip_change",chg,3);set("r_trip_diff",diff,3);const b=q("trip_status_box");b.classList.toggle("status-bad",Math.abs(diff)>.25);b.classList.toggle("status-good",Math.abs(diff)<=.25)}
function stat(box,text,v,min,max){let t="Within window",g=true;if(v<min){t="Below minimum";g=false}if(v>max){t="Above maximum";g=false}q(text).textContent=t;q(box).classList.toggle("status-good",g);q(box).classList.toggle("status-bad",!g)}
function calcMPD(){
  const r=n("mpd_density"),t=n("mpd_tvd"),sb=n("mpd_sbp"),af=n("mpd_afp"),tar=n("mpd_target"),pp=n("mpd_ppg"),fg=n("mpd_fg"),lm=n("mpd_lowmargin"),hm=n("mpd_highmargin"),
  hy=r*9.80665*t/1000,st=hy+sb,ci=hy+sb+af,ppress=pp*t,fpress=fg*t,min=ppress+lm,max=fpress-hm,win=Math.max(max-min,0),
  es=t?st*1000/(9.80665*t):0,ec=t?ci*1000/(9.80665*t):0;
  set("r_mpd_hydro",hy/1000,3);set("r_mpd_static",st/1000,3);set("r_mpd_circ",ci/1000,3);set("r_mpd_esd",es,1);set("r_mpd_ecd",ec,1);
  set("r_mpd_req_static",Math.max(tar-hy,0),0);set("r_mpd_req_circ",Math.max(tar-hy-af,0),0);set("r_mpd_window",win,0);
  stat("mpd_static_status_box","r_mpd_static_status",st,min,max);stat("mpd_circ_status_box","r_mpd_circ_status",ci,min,max);
  q("windowMin").textContent=(min/1000).toFixed(2)+" MPa";q("windowMax").textContent=(max/1000).toFixed(2)+" MPa";
  const pct=max>min?Math.max(0,Math.min(100,(ci-min)/(max-min)*100)):50;q("windowMarker").style.bottom=`calc(${pct}% - 12px)`;q("windowMarker").textContent=(ci/1000).toFixed(2)+" MPa";

  set("r_mpd_pp",ppress/1000,3);set("r_mpd_fp",fpress/1000,3);set("r_mpd_lowlim",min/1000,3);set("r_mpd_highlim",max/1000,3);
  set("r_mpd_static_low",st-min,0);set("r_mpd_static_high",max-st,0);set("r_mpd_circ_low",ci-min,0);set("r_mpd_circ_high",max-ci,0);

  const banner=q("mpdWindowBanner"),text=q("mpdWindowBannerText"),detail=q("mpdWindowBannerDetail");
  if(banner&&text&&detail){
    banner.classList.remove("good","warn","bad");
    if(max<=min){banner.classList.add("bad");text.textContent="No usable operating window";detail.textContent="Entered pore/fracture limits and safety margins overlap."}
    else if(ci<min||ci>max||st<min||st>max){
      banner.classList.add("bad");text.textContent="One or more modeled pressures are outside the entered window";
      detail.textContent=`Static ${(st/1000).toFixed(2)} MPa; circulating ${(ci/1000).toFixed(2)} MPa.`;
    }else{
      const closest=Math.min(st-min,max-st,ci-min,max-ci);
      if(closest<500){banner.classList.add("warn");text.textContent="Inside window with limited margin";detail.textContent=`Closest modeled margin is ${closest.toFixed(0)} kPa.`}
      else{banner.classList.add("good");text.textContent="Modeled pressures are inside the entered operating window";detail.textContent=`Closest modeled margin is ${closest.toFixed(0)} kPa.`}
    }
  }
}
function all(){calcCap();calcPump();if(q("wc_density"))calcWC();if(q("cem_hole"))calcCem();calcTrip();calcMPD();save()}
document.querySelectorAll("input,select").forEach(e=>e.addEventListener("input",all));
document.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));q(b.dataset.open).classList.add("active");scrollTo(0,0)}));
document.querySelectorAll(".back").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));q("dashboard").classList.add("active");scrollTo(0,0)}));
q("installHelpBtn").onclick=()=>q("installModal").classList.remove("hidden");q("closeModal").onclick=()=>q("installModal").classList.add("hidden");
q("themeBtn").onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("rigcalc-theme",document.body.classList.contains("dark")?"dark":"light")};
if(localStorage.getItem("rigcalc-theme")==="dark")document.body.classList.add("dark");
load();all();
if("serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("service-worker.js"));

// ===== RigCalc Pro v1.1: Live Well Profile =====
const WP_DEFAULTS={
 survey:[{md:0,tvd:0},{md:516,tvd:516},{md:700,tvd:700},{md:1300,tvd:1292},{md:1900,tvd:1890},{md:2460,tvd:2458},{md:2810,tvd:2782},{md:3180,tvd:3060},{md:3520,tvd:3315},{md:3700,tvd:3390},{md:3978,tvd:3433}],
 holes:[{from:0,to:616,id:311,od:244.5},{from:616,to:2855,id:222,od:127},{from:2855,to:3978,id:171.45,od:127}]
};
let wpData=JSON.parse(localStorage.getItem("rigcalc-wellprofile")||"null")||JSON.parse(JSON.stringify(WP_DEFAULTS));
wpData.holes=(wpData.holes||[]).map(h=>({...h,over:Number(h.over)||0}));
wpData.formations=Array.isArray(wpData.formations)?wpData.formations:[];
// ===== Beta 1.15: lengths anchored to the bit =====
const BHA_KEY='rigcalc-bha-bottom-v115';
const BhaMath=(()=>{
 function sections(config,bit){
  const parts=config.parts||[],total=parts.reduce((s,p)=>s+Number(p.length),0);
  if(!Number.isFinite(bit)||bit<0||!Number.isFinite(total)||parts.some(p=>!Number.isFinite(Number(p.length))||Number(p.length)<=0))throw Error('Enter a positive length for every BHA component.');
  if(total>bit+1e-8)throw Error(`BHA length ${total.toFixed(1)} m exceeds current bit MD ${bit.toFixed(1)} m.`);
  const pipe=config.pipe;if(!pipe||![Number(pipe.id),Number(pipe.od)].every(v=>Number.isFinite(v)&&v>0)||Number(pipe.id)>=Number(pipe.od))throw Error('Drill pipe needs positive ID and OD, with ID smaller than OD.');
  let from=bit-total;const result=[{...pipe,name:pipe.name||'Drill Pipe',from:0,to:from,id:Number(pipe.id),od:Number(pipe.od),role:'pipe'}];
  parts.forEach((p,i)=>{if(![Number(p.id),Number(p.od)].every(v=>Number.isFinite(v)&&v>0)||Number(p.id)>=Number(p.od))throw Error(`Check ID / OD for ${p.name||'BHA component'}; ID must be smaller than OD.`);const to=from+Number(p.length);result.push({...p,from,to,id:Number(p.id),od:Number(p.od),role:'bha',partIndex:i});from=to;});
  return result;
 }
 function annulus(holes,string,bit){
  const hs=holes.map(h=>({...h,from:Number(h.from),to:Number(h.to)})).sort((a,b)=>a.from-b.from);
  if(hs.length)hs[hs.length-1].to=Math.max(hs[hs.length-1].to,bit);
  let end=0;const out=[];
  for(const h of hs){const from=Math.max(0,h.from),to=Math.min(bit,h.to);if(from>=bit||to<=0)continue;
   if(![from,to,Number(h.id),Number(h.over||0)].every(Number.isFinite)||to<=from||Number(h.over||0)<0||Math.abs(from-end)>1e-6)throw Error('Hole intervals need continuous, non-overlapping depths from surface to bit.');
   for(const s of string){const a=Math.max(from,s.from),b=Math.min(to,s.to);if(b>a){if(Number(h.id)<=s.od)throw Error(`Hole/casing ID must exceed ${s.name} OD at ${a.toFixed(0)} m MD.`);out.push({...h,from:a,to:b,od:s.od});}}
   end=to;
  }
  if(Math.abs(end-bit)>1e-6)throw Error('Enter hole geometry covering surface to bit.');return out;
 }
 return{sections,annulus};
})();
var bhaState;
try{bhaState=JSON.parse(localStorage.getItem(BHA_KEY)||'null');}catch(e){}
if(!bhaState){
 let rows;try{rows=JSON.parse(localStorage.getItem('rigcalc-string-drill-v109')||localStorage.getItem('rigcalc-string-v14')||'null');}catch(e){}
 if(!Array.isArray(rows)||!rows.length)rows=[{name:'Drill Pipe',from:0,to:3500,id:108.6},{name:'HWDP',from:3500,to:3700,id:76.2},{name:'Drill Collars',from:3700,to:3900,id:71.4},{name:'BHA / Tools',from:3900,to:3978,id:50.8}];
 rows=[...rows].sort((a,b)=>a.from-b.from);
 const odFor=r=>{if(Number(r.od)>0)return Number(r.od);const md=(Number(r.from)+Number(r.to))/2;const h=wpData.holes.find(h=>md>=h.from&&md<=h.to);return Number(h?.od)||0;};
 bhaState={enabled:true,pipe:{name:rows[0].name||'Drill Pipe',id:Number(rows[0].id)||0,od:odFor(rows[0])},parts:rows.slice(1).map(r=>({name:r.name||'BHA component',length:Number(r.to)-Number(r.from),id:Number(r.id)||0,od:odFor(r)})),review:true};
 localStorage.setItem(BHA_KEY,JSON.stringify(bhaState));
}
function autoBhaActive(){return !!bhaState?.enabled&&localStorage.getItem('rigcalc-string-mode-v109')!=='casing';}
function currentBhaSections(bit=Math.max(0,n('wp_bit'))){return BhaMath.sections(bhaState,bit);}
function annulusSections(bit=Math.max(0,n('wp_bit'))){if(!autoBhaActive())return wpData.holes;try{return BhaMath.annulus(wpData.holes,currentBhaSections(bit),bit);}catch(e){return [];}}

function saveWP(){localStorage.setItem("rigcalc-wellprofile",JSON.stringify(wpData))}
function interpTVD(md){const s=[...wpData.survey].sort((a,b)=>a.md-b.md);if(!s.length)return md;if(md<=s[0].md)return s[0].tvd;for(let i=1;i<s.length;i++){if(md<=s[i].md){const f=(md-s[i-1].md)/(s[i].md-s[i-1].md||1);return s[i-1].tvd+f*(s[i].tvd-s[i-1].tvd)}}return s[s.length-1].tvd}
function annCapM3m(id,od){return Math.max(0,circle(id)-circle(od))}
function cumulativeAnnulus(fromMD,toMD){let total=0;for(const h of annulusSections(Math.max(toMD,n('wp_bit')))){const a=Math.max(fromMD,h.from),b=Math.min(toMD,h.to);if(b>a)total+=(b-a)*annCapM3m(h.id,h.od)*(1+(Number(h.over)||0)/100)}return total}
function totalAnnulusToBit(bitMD){return cumulativeAnnulus(0,bitMD)}
function frontMDFromPumped(bitMD,pumped){let remaining=Math.max(0,pumped),pos=bitMD;const hs=[...annulusSections(bitMD)].sort((a,b)=>b.to-a.to);for(const h of hs){const top=Math.max(h.from,0),bot=Math.min(h.to,pos);if(bot<=top)continue;const cap=annCapM3m(h.id,h.od)*(1+(Number(h.over)||0)/100),vol=(bot-top)*cap;if(remaining<=vol)return bot-(cap?remaining/cap:0);remaining-=vol;pos=top}return 0}
function formationAtMD(md){const f=[...wpData.formations].sort((a,b)=>a.md-b.md);let cur=f[0]?.name||"—";for(const x of f){if(md>=x.md)cur=x.name;else break}return cur}
function surveyXY(md){const s=[...wpData.survey].sort((a,b)=>a.md-b.md);if(!s.length)return{md:0,tvd:0,x:0};let x=0,pts=[{md:s[0].md,tvd:s[0].tvd,x:0}],prev=s[0];for(let i=1;i<s.length;i++){const dmd=s[i].md-prev.md,dtvd=s[i].tvd-prev.tvd;x+=Math.sqrt(Math.max(0,dmd*dmd-dtvd*dtvd));pts.push({md:s[i].md,tvd:s[i].tvd,x});prev=s[i]}if(md<=pts[0].md)return pts[0];for(let i=1;i<pts.length;i++){if(md<=pts[i].md){const f=(md-pts[i-1].md)/(pts[i].md-pts[i-1].md||1);return{md,tvd:pts[i-1].tvd+f*(pts[i].tvd-pts[i-1].tvd),x:pts[i-1].x+f*(pts[i].x-pts[i-1].x)}}}return pts[pts.length-1]}
function drawDepthGrid(g,sy,maxDepth){if(!g)return;g.innerHTML="";for(let i=0;i<=4;i++){const d=maxDepth*i/4,y=sy(d),line=document.createElementNS("http://www.w3.org/2000/svg","line");line.setAttribute("x1","45");line.setAttribute("x2","680");line.setAttribute("y1",y);line.setAttribute("y2",y);line.setAttribute("class","depth-grid-line");g.appendChild(line);const t=document.createElementNS("http://www.w3.org/2000/svg","text");t.setAttribute("x","6");t.setAttribute("y",Math.min(420,y+4));t.setAttribute("class","depth-grid-text");t.textContent=`${d.toFixed(0)} m`;g.appendChild(t)}}
function plotWell(bitMD,frontMD){const raw0=[...wpData.survey].sort((a,b)=>a.md-b.md).filter(x=>x.md<=bitMD);if(!raw0.length)return;let x=0,raw=[{md:raw0[0].md,tvd:raw0[0].tvd,x:0}],prev=raw0[0];for(let i=1;i<raw0.length;i++){const dmd=raw0[i].md-prev.md,dtvd=raw0[i].tvd-prev.tvd;x+=Math.sqrt(Math.max(0,dmd*dmd-dtvd*dtvd));raw.push({md:raw0[i].md,tvd:raw0[i].tvd,x});prev=raw0[i]}if(raw[raw.length-1].md<bitMD)raw.push(surveyXY(bitMD));const maxX=Math.max(...raw.map(p=>p.x),100),maxT=Math.max(...raw.map(p=>p.tvd),100),sx=v=>60+v/maxX*580,sy=v=>35+v/maxT*350;q("wellPath").setAttribute("points",raw.map(p=>`${sx(p.x)},${sy(p.tvd)}`).join(" "));const bit=surveyXY(bitMD),front=surveyXY(frontMD);q("bitMarker").setAttribute("cx",sx(bit.x));q("bitMarker").setAttribute("cy",sy(bit.tvd));q("frontMarker").setAttribute("cx",sx(front.x));q("frontMarker").setAttribute("cy",sy(front.tvd));q("frontLabel").setAttribute("x",Math.min(545,sx(front.x)+14));q("frontLabel").setAttribute("y",Math.max(20,sy(front.tvd)-12));q("frontLabel").textContent=`Returns ${frontMD.toFixed(0)} MD / ${interpTVD(frontMD).toFixed(0)} TVD`;drawDepthGrid(q("depthGrid"),sy,maxT)}
function updateProfile(){const bit=Math.max(0,n("wp_bit")),out=Math.max(0,n("wp_output")),spm=Math.max(0,n("wp_spm")),mode=q("wp_mode").value,pumped=mode==="strokes"?Math.max(0,n("wp_strokes"))*out:Math.max(0,n("wp_minutes"))*spm*out,total=totalAnnulusToBit(bit),used=Math.min(total,pumped),front=frontMDFromPumped(bit,used),rem=Math.max(0,total-used),rs=out?rem/out:0,rt=spm?rs/spm:0;q("wp_bit_md").textContent=bit.toFixed(0);q("wp_front_md").textContent=front.toFixed(0);q("wp_front_tvd").textContent=interpTVD(front).toFixed(0);q("wp_rem_vol").textContent=rem.toFixed(2);q("wp_rem_strokes").textContent=rs.toFixed(0);q("wp_rem_time").textContent=rt.toFixed(1);plotWell(bit,front)}
function renderSurvey(){const tb=q("surveyTable").querySelector("tbody");tb.innerHTML="";wpData.survey.sort((a,b)=>a.md-b.md).forEach((r,i)=>{const tr=document.createElement("tr");tr.innerHTML=`<td><input data-sv="${i}" data-k="md" type="number" value="${r.md}"></td><td><input data-sv="${i}" data-k="tvd" type="number" value="${r.tvd}"></td><td><button data-del-sv="${i}">✕</button></td>`;tb.appendChild(tr)})}
function renderHoles(){const tb=q("holeTable").querySelector("tbody");tb.innerHTML="";wpData.holes.sort((a,b)=>a.from-b.from).forEach((r,i)=>{const tr=document.createElement("tr");tr.innerHTML=`<td><input data-hole="${i}" data-k="from" type="number" value="${r.from}"></td><td><input data-hole="${i}" data-k="to" type="number" value="${r.to}"></td><td><input data-hole="${i}" data-k="id" type="number" value="${r.id}"></td><td><input data-hole="${i}" data-k="od" type="number" value="${r.od}"></td><td><input data-hole="${i}" data-k="over" type="number" step="1" value="${Number(r.over)||0}"></td><td><button data-del-hole="${i}">✕</button></td>`;tb.appendChild(tr)})}
function renderFormationPressures(){}
function renderWP(){renderSurvey();renderHoles();updateProfile()}
document.addEventListener("change",e=>{const a=e.target.dataset;if(a.sv!==undefined){wpData.survey[+a.sv][a.k]=+e.target.value||0;saveWP();renderWP();if(typeof updateHoleCleaning==="function")updateHoleCleaning()}if(a.hole!==undefined){wpData.holes[+a.hole][a.k]=+e.target.value||0;saveWP();renderWP();if(typeof updateHoleCleaning==="function")updateHoleCleaning()}if(a.form!==undefined){wpData.formations[+a.form][a.k]=a.k==="name"?e.target.value:(+e.target.value||0);saveWP();renderWP()}if(e.target.id&&e.target.id.startsWith("wp_"))updateProfile()});
document.addEventListener("input",e=>{if(e.target.id&&["wp_bit","wp_output","wp_spm","wp_strokes","wp_minutes"].includes(e.target.id))updateProfile()});
document.addEventListener("click",e=>{if(e.target.dataset.delSv!==undefined){wpData.survey.splice(+e.target.dataset.delSv,1);saveWP();renderWP()}if(e.target.dataset.delHole!==undefined){wpData.holes.splice(+e.target.dataset.delHole,1);saveWP();renderWP()}if(e.target.dataset.delForm!==undefined){wpData.formations.splice(+e.target.dataset.delForm,1);saveWP();renderWP()}});
q("addSurveyBtn").onclick=()=>{const last=wpData.survey[wpData.survey.length-1]||{md:0,tvd:0};wpData.survey.push({md:last.md+100,tvd:last.tvd+80});saveWP();renderWP()};
q("addHoleBtn").onclick=()=>{const last=wpData.holes[wpData.holes.length-1]||{to:0,id:171.45,od:127};wpData.holes.push({from:last.to,to:last.to+500,id:last.id,od:last.od,over:Number(last.over)||0});saveWP();renderWP()};
if(q("addFormationBtn"))q("addFormationBtn").onclick=()=>{};
q("wpResetBtn").onclick=()=>{q("wp_strokes").value=0;q("wp_minutes").value=0;updateProfile()};
renderWP();

// ===== Beta 1.12: preserve displacement across rate/output changes =====
const LIVE_KEY="rigcalc-live-v12";
let liveState={running:false,accumulatedMs:0,startedAt:null,baseStrokes:0,baseVolume:0,segmentSpm:0,segmentOutput:0};
try{const stored=JSON.parse(localStorage.getItem(LIVE_KEY)||"null");if(stored){
  liveState={...liveState,...stored};
  if(!Number.isFinite(stored.baseVolume)||!Number.isFinite(stored.baseStrokes)){
    const ms=(Number(stored.accumulatedMs)||0)+(stored.running&&stored.startedAt?Math.max(0,Date.now()-stored.startedAt):0);
    liveState.accumulatedMs=ms;liveState.baseStrokes=ms/60000*Math.max(0,n("wp_spm"));liveState.baseVolume=liveState.baseStrokes*Math.max(0,n("wp_output"));liveState.startedAt=stored.running?Date.now():null;
    liveState.segmentSpm=Math.max(0,n("wp_spm"));liveState.segmentOutput=Math.max(0,n("wp_output"));
  }
}}catch(e){}
function saveLive(){localStorage.setItem(LIVE_KEY,JSON.stringify(liveState))}
function circulationSnapshot(now=Date.now()){
 const dt=liveState.running&&liveState.startedAt!==null?Math.max(0,now-liveState.startedAt):0;
 const strokes=dt/60000*liveState.segmentSpm;
 return {ms:liveState.accumulatedMs+dt,strokes:liveState.baseStrokes+strokes,pumped:liveState.baseVolume+strokes*liveState.segmentOutput};
}
function checkpointCirculation(){
 const snap=circulationSnapshot();liveState.accumulatedMs=snap.ms;liveState.baseStrokes=snap.strokes;liveState.baseVolume=snap.pumped;
 liveState.startedAt=liveState.running?Date.now():null;liveState.segmentSpm=Math.max(0,n("wp_spm"));liveState.segmentOutput=Math.max(0,n("wp_output"));saveLive();
}
function currentLiveMs(){return circulationSnapshot().ms}
function formatClock(ms){const sec=Math.floor(ms/1000),h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=sec%60;return h>0?`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`}
function setLiveButtons(){const running=liveState.running;q("liveStartBtn").disabled=running;q("livePauseBtn").disabled=!running;q("liveStateText").textContent=running&&n("wp_spm")>0?"Circulating":"Paused / pumps off";q("livePulse").classList.toggle("running",running&&n("wp_spm")>0);q("livePulse").classList.toggle("paused",!running||n("wp_spm")<=0)}
function getLiveComputed(){const snap=circulationSnapshot(),ms=snap.ms,minutes=ms/60000,spm=Math.max(0,n("wp_spm")),output=Math.max(0,n("wp_output")),strokes=snap.strokes,pumped=snap.pumped,bit=Math.max(0,n("wp_bit")),total=totalAnnulusToBit(bit),used=Math.min(total,pumped),front=frontMDFromPumped(bit,used),remaining=Math.max(0,total-used),remStrokes=output>0?remaining/output:Infinity,remTime=spm>0?remStrokes/spm:Infinity;return{ms,minutes,spm,output,strokes,pumped,bit,total,used,front,remaining,remStrokes,remTime}}
function renderLive(){const c=getLiveComputed();q("liveElapsed").textContent=formatClock(c.ms);q("liveStrokes").textContent=c.strokes.toFixed(0);q("liveVolume").textContent=c.pumped.toFixed(2)+" m³";q("liveFront").textContent=c.front.toFixed(0)+" m MD";q("liveDepth").textContent=`${c.front.toFixed(0)} MD / ${interpTVD(c.front).toFixed(0)} TVD`;q("liveEta").textContent=c.remaining<=0.0001?"At surface":(liveState.running&&Number.isFinite(c.remTime)?c.remTime.toFixed(1)+" min":"Pumps Off — ETA paused");if(liveState.running||liveState.accumulatedMs>0){q("wp_bit_md").textContent=c.bit.toFixed(0);q("wp_front_md").textContent=c.front.toFixed(0);q("wp_front_tvd").textContent=interpTVD(c.front).toFixed(0);q("wp_rem_vol").textContent=c.remaining.toFixed(2);q("wp_rem_strokes").textContent=c.remStrokes.toFixed(0);q("wp_rem_time").textContent=c.remTime.toFixed(1);plotWell(c.bit,c.front)}}
q("liveStartBtn").onclick=()=>{if(!liveState.running){checkpointCirculation();liveState.running=true;liveState.startedAt=Date.now();saveLive();setLiveButtons();renderLive()}};
q("livePauseBtn").onclick=()=>{if(liveState.running){checkpointCirculation();liveState.running=false;liveState.startedAt=null;saveLive();setLiveButtons();renderLive()}};
function resetLiveCirculation(){liveState={running:false,accumulatedMs:0,startedAt:null,baseStrokes:0,baseVolume:0,segmentSpm:Math.max(0,n("wp_spm")),segmentOutput:Math.max(0,n("wp_output"))};saveLive();setLiveButtons();renderLive()}
q("liveResetBtn").onclick=()=>{resetLiveCirculation();updateProfile()};
const oldWpReset=q("wpResetBtn");if(oldWpReset)oldWpReset.addEventListener("click",resetLiveCirculation);
["wp_output","wp_spm"].forEach(id=>q(id).addEventListener("input",()=>{checkpointCirculation();setLiveButtons();renderLive()}));
q("wp_bit").addEventListener("input",()=>renderLive());
saveLive();setLiveButtons();renderLive();setInterval(()=>renderLive(),500);

// ===== RigCalc Pro v1.3: Fluid Tracker =====
const FLUID_KEY="rigcalc-fluidtracker-v13";
let fluidEvents=[];
try{fluidEvents=JSON.parse(localStorage.getItem(FLUID_KEY)||"[]")||[]}catch(e){fluidEvents=[]}
function saveFluids(){localStorage.setItem(FLUID_KEY,JSON.stringify(fluidEvents))}
function liveTotalPumpedVolume(){return getLiveComputed().pumped}

// Approximate total internal drill-string volume using user-entered average pipe capacity.
function pipeInternalVolumeToBit(bitMD,pipeCap){return Math.max(0,bitMD*pipeCap)}
function mdDownPipeFromVolume(bitMD,pipeCap,vol){
  if(pipeCap<=0)return 0;
  return Math.min(bitMD,Math.max(0,vol/pipeCap));
}
function annulusMDUpFromBit(bitMD,annVol){
  return frontMDFromPumped(bitMD,annVol);
}
function fluidEdgeState(event,edgeStartOffset){
  const bit=Math.max(0,n("wp_bit"));
  const pipeCap=Math.max(0,Number(event.pipeCap)||0);
  const pipeVol=pipeInternalVolumeToBit(bit,pipeCap);
  const currentPumped=liveTotalPumpedVolume();
  const edgePumped=currentPumped-(Number(event.startPumpVol)||0)-edgeStartOffset;
  if(edgePumped<=0){
    return {phase:"At surface",md:0,progress:0,formation:"Surface",etaBit:pipeCap&&n("wp_spm")&&n("wp_output")?pipeVol/(n("wp_spm")*n("wp_output")):0,etaSurface:null};
  }
  if(edgePumped<pipeVol){
    const downMD=mdDownPipeFromVolume(bit,pipeCap,edgePumped);
    const remainingPipe=pipeVol-edgePumped;
    const rate=n("wp_spm")*n("wp_output");
    return {phase:"Down drill pipe",md:downMD,progress:pipeVol?edgePumped/pipeVol:0,formation:formationAtMD(downMD),etaBit:rate?remainingPipe/rate:0,etaSurface:null};
  }
  const annVol=edgePumped-pipeVol;
  const annTotal=totalAnnulusToBit(bit);
  const used=Math.min(annTotal,annVol);
  const md=annulusMDUpFromBit(bit,used);
  const rem=Math.max(0,annTotal-used);
  const rate=n("wp_spm")*n("wp_output");
  return {phase:rem<=0.0001?"At surface":"Up annulus",md,progress:annTotal?used/annTotal:1,formation:formationAtMD(md),etaBit:0,etaSurface:rate?rem/rate:0};
}
function fluidStates(event){
  const front=fluidEdgeState(event,0);
  const tail=fluidEdgeState(event,Number(event.volume)||0);
  return {front,tail};
}
function fmtEta(min){
  if(min===null||!Number.isFinite(min))return "—";
  if(min<=0)return "Now";
  return min.toFixed(1)+" min";
}
function fluidOverallStatus(front,tail){
  if(front.phase==="At surface"&&tail.phase==="At surface")return "Complete";
  if(front.phase==="Up annulus"&&tail.phase==="Down drill pipe")return "Straddling bit";
  if(front.phase==="Up annulus"||tail.phase==="Up annulus")return "Returning";
  if(front.phase==="Down drill pipe"||tail.phase==="Down drill pipe")return "Going down";
  return "Queued";
}
function renderFluidMarkers(){
  const g=q("fluidMarkers"); if(!g)return;
  g.innerHTML="";
  const bit=Math.max(0,n("wp_bit"));
  const pts=[...wpData.survey].sort((a,b)=>a.md-b.md).filter(x=>x.md<=bit);
  if(!pts.length)return;
  let xx=0,raw=[{md:pts[0].md,tvd:pts[0].tvd,x:0}],prev=pts[0];
  for(let i=1;i<pts.length;i++){const dmd=pts[i].md-prev.md,dtvd=pts[i].tvd-prev.tvd;xx+=Math.sqrt(Math.max(0,dmd*dmd-dtvd*dtvd));raw.push({md:pts[i].md,tvd:pts[i].tvd,x:xx});prev=pts[i]}
  if(raw[raw.length-1].md<bit)raw.push(surveyXY(bit));
  const maxX=Math.max(...raw.map(p=>p.x),100),maxT=Math.max(...raw.map(p=>p.tvd),100),sx=v=>60+v/maxX*580,sy=v=>35+v/maxT*350;
  fluidEvents.forEach((ev,idx)=>{
    const st=fluidStates(ev),pf=surveyXY(st.front.md),pt=surveyXY(st.tail.md);
    const line=document.createElementNS("http://www.w3.org/2000/svg","line");
    line.setAttribute("x1",sx(pf.x));line.setAttribute("y1",sy(pf.tvd));line.setAttribute("x2",sx(pt.x));line.setAttribute("y2",sy(pt.tvd));line.setAttribute("class","fluid-svg-line");g.appendChild(line);
    const cf=document.createElementNS("http://www.w3.org/2000/svg","circle");cf.setAttribute("cx",sx(pf.x));cf.setAttribute("cy",sy(pf.tvd));cf.setAttribute("r","7");cf.setAttribute("class","fluid-svg-front");g.appendChild(cf);
    const ct=document.createElementNS("http://www.w3.org/2000/svg","circle");ct.setAttribute("cx",sx(pt.x));ct.setAttribute("cy",sy(pt.tvd));ct.setAttribute("r","6");ct.setAttribute("class","fluid-svg-tail");g.appendChild(ct);
    const lab=document.createElementNS("http://www.w3.org/2000/svg","text");lab.setAttribute("x",Math.min(610,sx(pf.x)+10));lab.setAttribute("y",Math.max(16,sy(pf.tvd)-8));lab.setAttribute("class","fluid-svg-label");lab.textContent=ev.label||ev.type;g.appendChild(lab);
  });
}
function renderFluidList(){
  const host=q("fluidList"); if(!host)return;
  host.innerHTML="";
  if(!fluidEvents.length){host.innerHTML='<div class="fluid-item"><span style="color:var(--muted)">No fluids currently being tracked.</span></div>';renderFluidMarkers();return}
  fluidEvents.forEach((ev,i)=>{
    const st=fluidStates(ev),status=fluidOverallStatus(st.front,st.tail);
    const eta = st.front.phase==="Down drill pipe" ? st.front.etaBit : st.front.etaSurface;
    const div=document.createElement("div");div.className="fluid-item";
    div.innerHTML=`<div class="fluid-item-head"><div><strong>${ev.label||ev.type}</strong><div style="font-size:.75rem;color:var(--muted);margin-top:2px">${ev.type} • ${Number(ev.volume).toFixed(2)} m³ • ${status}</div></div><button data-fluid-del="${i}">✕</button></div>
      <div class="fluid-meta">
        <div><span>Front</span><strong>${st.front.md.toFixed(0)} m MD</strong></div>
        <div><span>Front phase</span><strong>${st.front.phase}</strong></div>
        <div><span>Tail</span><strong>${st.tail.md.toFixed(0)} m MD</strong></div>
        <div><span>Tail phase</span><strong>${st.tail.phase}</strong></div>
        <div><span>Front depth</span><strong>${st.front.md.toFixed(0)} MD / ${interpTVD(st.front.md).toFixed(0)} TVD</strong></div>
        <div><span>Front ETA</span><strong>${fmtEta(eta)}</strong></div>
      </div>
      <div class="fluid-progress"><i style="width:${Math.max(0,Math.min(100,(st.front.phase==="Up annulus"?50+st.front.progress*50:st.front.phase==="At surface"?100:st.front.progress*50)))}%"></i></div>`;
    host.appendChild(div);
  });
  renderFluidMarkers();
}
q("addFluidBtn").onclick=()=>{
  const type=q("fluidType").value,label=q("fluidLabel").value.trim()||type,volume=Math.max(0,n("fluidVolume")),pipeCap=Math.max(0,n("fluidPipeCap"));
  if(volume<=0||pipeCap<=0){alert("Enter a fluid volume and drill-pipe internal capacity greater than zero.");return}
  fluidEvents.push({type,label,volume,pipeCap,startPumpVol:liveTotalPumpedVolume(),createdAt:Date.now()});
  saveFluids();renderFluidList();
  const m=label.match(/(\d+)$/);if(m)q("fluidLabel").value=label.replace(/\d+$/,(Number(m[1])+1).toString());
};
q("clearFluidsBtn").onclick=()=>{fluidEvents=[];saveFluids();renderFluidList()};
document.addEventListener("click",e=>{if(e.target.dataset.fluidDel!==undefined){fluidEvents.splice(+e.target.dataset.fluidDel,1);saveFluids();renderFluidList()}});
setInterval(renderFluidList,500);
["wp_bit","wp_output","wp_spm","fluidPipeCap"].forEach(id=>{if(q(id))q(id).addEventListener("input",renderFluidList)});
renderFluidList();

// ===== RigCalc Pro v1.4: Detailed Drill String + Full-screen Profile =====
const STRING_LEGACY_KEY="rigcalc-string-v14";
const STRING_DRILL_KEY="rigcalc-string-drill-v109";
const STRING_CASING_KEY="rigcalc-string-casing-v109";
const STRING_MODE_KEY="rigcalc-string-mode-v109";
const STRING_DEFAULTS=[
  {name:"Drill Pipe",from:0,to:3500,id:108.6},
  {name:"HWDP",from:3500,to:3700,id:76.2},
  {name:"Drill Collars",from:3700,to:3900,id:71.4},
  {name:"BHA / Tools",from:3900,to:3978,id:50.8}
];
const CASING_DEFAULTS=[
  {name:"Casing",from:0,to:3900,id:201.9},
  {name:"Float / Shoe Track",from:3900,to:3978,id:185.0}
];
function cloneStringRows(v){return JSON.parse(JSON.stringify(v))}
function loadStringRows(key,defaults){try{const x=JSON.parse(localStorage.getItem(key)||"[]");if(Array.isArray(x)&&x.length)return x}catch(e){}return cloneStringRows(defaults)}
if(!localStorage.getItem(STRING_DRILL_KEY)){try{const legacy=JSON.parse(localStorage.getItem(STRING_LEGACY_KEY)||"[]");if(Array.isArray(legacy)&&legacy.length)localStorage.setItem(STRING_DRILL_KEY,JSON.stringify(legacy))}catch(e){}}
let drillStringData=loadStringRows(STRING_DRILL_KEY,STRING_DEFAULTS);
let casingStringData=loadStringRows(STRING_CASING_KEY,CASING_DEFAULTS);
let stringMode=localStorage.getItem(STRING_MODE_KEY)==="casing"?"casing":"drill";
let stringData=stringMode==="casing"?casingStringData:drillStringData;
function activeStringLabel(){return stringMode==="casing"?"Casing Run":"Drill String"}
function saveString(){if(stringMode==="casing"){casingStringData=stringData;localStorage.setItem(STRING_CASING_KEY,JSON.stringify(casingStringData))}else{drillStringData=stringData;localStorage.setItem(STRING_DRILL_KEY,JSON.stringify(drillStringData))}localStorage.setItem(STRING_MODE_KEY,stringMode)}
function switchStringMode(mode){if(mode!=="drill"&&mode!=="casing")return;saveString();stringMode=mode;stringData=stringMode==="casing"?casingStringData:drillStringData;localStorage.setItem(STRING_MODE_KEY,stringMode);renderString();renderFluidList();if(typeof updateTripPill==="function")updateTripPill()}
function stringCapM3m(id){return circle(Math.max(0,id))}
function effectiveStringSections(bitMD){if(autoBhaActive()){try{return currentBhaSections(bitMD).filter(s=>s.to>s.from);}catch(e){return [];}}return [...stringData].sort((a,b)=>a.from-b.from).map(s=>({...s,from:Math.max(0,Number(s.from)||0),to:Math.min(bitMD,Number(s.to)||0),id:Math.max(0,Number(s.id)||0)})).filter(s=>s.to>s.from)}
function detailedPipeVolumeToBit(bitMD){let vol=0;for(const s of effectiveStringSections(bitMD))vol+=(s.to-s.from)*stringCapM3m(s.id);return vol}
function pipeMDFromDetailedVolume(bitMD,vol){let remaining=Math.max(0,vol);const sections=effectiveStringSections(bitMD);for(const s of sections){const cap=stringCapM3m(s.id),sv=(s.to-s.from)*cap;if(remaining<=sv)return s.from+(cap?remaining/cap:0);remaining-=sv}return bitMD}
function updateStringModeUI(){const casing=stringMode==="casing";q("stringModeDrill")?.classList.toggle("active",!casing);q("stringModeCasing")?.classList.toggle("active",casing);if(q("stringModeLabel"))q("stringModeLabel").textContent=activeStringLabel();if(q("stringTrackingSource"))q("stringTrackingSource").textContent=activeStringLabel();if(q("fluidPipeModel"))q("fluidPipeModel").value=activeStringLabel()+" model";if(q("stringComponentHead"))q("stringComponentHead").textContent=casing?"Casing component":"Component";if(q("stringVolumeLabel"))q("stringVolumeLabel").textContent=casing?"Modelled casing internal volume":"Modelled internal volume to bit";if(q("stringModeNote"))q("stringModeNote").textContent=casing?"Casing Run mode has its own saved component list. Use casing / liner / float equipment IDs as required. Switching back restores the Drill String values exactly as saved.":"Drill String mode is intended for DP / HWDP / collars / BHA. Switching to Casing Run preserves these values."}
function renderString(){updateStringModeUI();const tb=q("stringTable").querySelector("tbody");tb.innerHTML="";stringData.sort((a,b)=>a.from-b.from).forEach((r,i)=>{const vol=Math.max(0,(Number(r.to)-Number(r.from))*stringCapM3m(Number(r.id)));const tr=document.createElement("tr");tr.innerHTML=`<td><input data-string="${i}" data-k="name" value="${r.name}"></td><td><input data-string="${i}" data-k="from" type="number" value="${r.from}"></td><td><input data-string="${i}" data-k="to" type="number" value="${r.to}"></td><td><input data-string="${i}" data-k="id" type="number" step="0.1" value="${r.id}"></td><td>${vol.toFixed(3)}</td><td><button data-del-string="${i}">✕</button></td>`;tb.appendChild(tr)});const bit=Math.max(0,n("wp_bit")),vol=detailedPipeVolumeToBit(bit),out=Math.max(0,n("wp_output")),spm=Math.max(0,n("wp_spm"));const strokes=out?vol/out:0,time=spm?strokes/spm:0;q("stringTotalVol").textContent=vol.toFixed(3);q("stringBitStrokes").textContent=strokes.toFixed(0);q("stringBitTime").textContent=time.toFixed(1)}
q("stringModeDrill")?.addEventListener("click",()=>switchStringMode("drill"));q("stringModeCasing")?.addEventListener("click",()=>switchStringMode("casing"));
q("addStringBtn").onclick=()=>{const last=stringData[stringData.length-1]||{to:0,id:stringMode==="casing"?200:108.6};stringData.push({name:stringMode==="casing"?"New casing component":"New component",from:Number(last.to)||0,to:(Number(last.to)||0)+100,id:Number(last.id)||(stringMode==="casing"?200:100)});saveString();renderString();renderFluidList()};
document.addEventListener("change",e=>{const a=e.target.dataset;if(a.string!==undefined){stringData[+a.string][a.k]=a.k==="name"?e.target.value:(+e.target.value||0);saveString();renderString();renderFluidList();if(typeof updateTripPill==="function")updateTripPill()}});
document.addEventListener("click",e=>{if(e.target.dataset.delString!==undefined){stringData.splice(+e.target.dataset.delString,1);saveString();renderString();renderFluidList();if(typeof updateTripPill==="function")updateTripPill()}});

// Override v1.3's edge-state function so every tracked fluid uses the detailed drill-string model.
fluidEdgeState=function(event,edgeStartOffset){
  const bit=Math.max(0,n("wp_bit"));
  const pipeVol=detailedPipeVolumeToBit(bit);
  const currentPumped=liveTotalPumpedVolume();
  const edgePumped=currentPumped-(Number(event.startPumpVol)||0)-edgeStartOffset;
  const rate=n("wp_spm")*n("wp_output");
  if(edgePumped<=0){
    return {phase:"At surface",md:0,progress:0,formation:"Surface",etaBit:rate?pipeVol/rate:0,etaSurface:null};
  }
  if(edgePumped<pipeVol){
    const downMD=pipeMDFromDetailedVolume(bit,edgePumped);
    const remainingPipe=pipeVol-edgePumped;
    return {phase:stringMode==="casing"?"Down casing":"Down drill string",md:downMD,progress:pipeVol?edgePumped/pipeVol:0,formation:formationAtMD(downMD),etaBit:rate?remainingPipe/rate:0,etaSurface:null};
  }
  const annVol=edgePumped-pipeVol,annTotal=totalAnnulusToBit(bit),used=Math.min(annTotal,annVol);
  const md=annulusMDUpFromBit(bit,used),rem=Math.max(0,annTotal-used);
  return {phase:rem<=0.0001?"At surface":"Up annulus",md,progress:annTotal?used/annTotal:1,formation:formationAtMD(md),etaBit:0,etaSurface:rate?rem/rate:0};
};

// New events no longer store/use average pipe capacity.
q("addFluidBtn").onclick=()=>{
  const type=q("fluidType").value,label=q("fluidLabel").value.trim()||type,volume=Math.max(0,n("fluidVolume"));
  if(volume<=0){alert("Enter a fluid volume greater than zero.");return}
  fluidEvents.push({type,label,volume,startPumpVol:liveTotalPumpedVolume(),createdAt:Date.now(),model:"detailed-v14"});
  saveFluids();renderFluidList();
  const m=label.match(/(\d+)$/);if(m)q("fluidLabel").value=label.replace(/\d+$/,(Number(m[1])+1).toString());
};

// ---- Full-screen zoom profile ----
let zoomScale=1;
function clonePlotForZoom(){
  const src=q("wellSvg"),host=q("zoomSvgHost");if(!src||!host)return;
  const clone=src.cloneNode(true);
  clone.removeAttribute("id");
  clone.querySelectorAll("[id]").forEach(el=>el.removeAttribute("id"));
  host.innerHTML="";
  host.appendChild(clone);
  host.style.transform=`scale(${zoomScale})`;
  host.style.width=`${100/zoomScale}%`;
  q("zoomResetBtn").textContent=Math.round(zoomScale*100)+"%";
  const live=getLiveComputed();
  q("zoomReadout").textContent=`Front ${live.front.toFixed(0)} m MD / ${interpTVD(live.front).toFixed(0)} m TVD • ETA ${live.remaining<=.0001?"surface":live.remTime.toFixed(1)+" min"}`;
}
function openZoom(){
  zoomScale=1;q("wellZoomModal").classList.remove("hidden");clonePlotForZoom();
  document.body.style.overflow="hidden";
}
function closeZoom(){q("wellZoomModal").classList.add("hidden");document.body.style.overflow=""}
q("wellSvg").addEventListener("click",openZoom);
q("zoomCloseBtn").onclick=closeZoom;
q("zoomInBtn").onclick=()=>{zoomScale=Math.min(3,zoomScale+.25);clonePlotForZoom()};
q("zoomOutBtn").onclick=()=>{zoomScale=Math.max(.75,zoomScale-.25);clonePlotForZoom()};
q("zoomResetBtn").onclick=()=>{zoomScale=1;clonePlotForZoom()};
q("wellZoomModal").addEventListener("click",e=>{if(e.target===q("wellZoomModal"))closeZoom()});
setInterval(()=>{if(!q("wellZoomModal").classList.contains("hidden"))clonePlotForZoom()},750);

["wp_bit","wp_output","wp_spm"].forEach(id=>q(id).addEventListener("input",()=>{renderString();renderFluidList()}));
renderString();
renderFluidList();

// ===== RigCalc Pro v1.5: Bit Hydraulics + Mud Motor =====
const JET_KEY="rigcalc-jets-v15";
let jetData=[];
try{jetData=JSON.parse(localStorage.getItem(JET_KEY)||"[]")||[]}catch(e){jetData=[]}
if(!jetData.length)jetData=[{size:12},{size:12},{size:12}];
function saveJets(){localStorage.setItem(JET_KEY,JSON.stringify(jetData))}
function jetDiameterMm(size32){return (Math.max(0,Number(size32)||0)/32)*25.4}
function jetAreaMm2(size32){const d=jetDiameterMm(size32);return Math.PI*d*d/4}
function totalTfaMm2(){return jetData.reduce((s,j)=>s+jetAreaMm2(j.size),0)}
function renderJets(){
  const tb=q("jetTable").querySelector("tbody");tb.innerHTML="";
  jetData.forEach((j,i)=>{
    const d=jetDiameterMm(j.size),a=jetAreaMm2(j.size),tr=document.createElement("tr");
    tr.innerHTML=`<td>J${i+1}</td><td><input data-jet="${i}" type="number" step="1" value="${j.size}"></td><td>${d.toFixed(3)}</td><td>${a.toFixed(2)}</td><td><button data-del-jet="${i}">✕</button></td>`;
    tb.appendChild(tr);
  });
  calcBitHydraulics();
}
function calcBitHydraulics(){
  const tfaMm2=totalTfaMm2(),tfaM2=tfaMm2/1e6,tfaIn2=tfaMm2/645.16;
  const qM3Min=Math.max(0,n("bit_flow")),qM3s=qM3Min/60,rho=Math.max(0,n("bit_density")),cd=Math.max(.01,n("bit_cd"));
  const velocity=tfaM2>0?qM3s/tfaM2:0;
  const dpPa=tfaM2>0?(rho/2)*Math.pow(qM3s/(cd*tfaM2),2):0;
  const kw=dpPa*qM3s/1000,hp=kw/0.745699872,impact=rho*qM3s*velocity;
  set("r_bit_tfa_mm",tfaMm2,2);set("r_bit_tfa_in",tfaIn2,4);set("r_bit_velocity",velocity,1);
  set("r_bit_dp",dpPa/1e6,2);set("r_bit_kw",kw,1);set("r_bit_hhp",hp,1);set("r_bit_force",impact,0);
}
q("addJetBtn").onclick=()=>{jetData.push({size:12});saveJets();renderJets()};
document.addEventListener("change",e=>{
  if(e.target.dataset.jet!==undefined){jetData[+e.target.dataset.jet].size=+e.target.value||0;saveJets();renderJets()}
});
document.addEventListener("click",e=>{
  if(e.target.dataset.delJet!==undefined){jetData.splice(+e.target.dataset.delJet,1);saveJets();renderJets()}
});
["bit_size","bit_flow","bit_density","bit_cd"].forEach(id=>q(id).addEventListener("input",calcBitHydraulics));

const MOTOR_KEY="rigcalc-motor-v15";
const motorFields=["motor_make","motor_model","motor_od","motor_bend","motor_min_flow","motor_max_flow","motor_rev_l","motor_max_dp","motor_max_torque","motor_max_rpm"];
function saveMotor(){const d={};motorFields.forEach(id=>d[id]=q(id).value);localStorage.setItem(MOTOR_KEY,JSON.stringify(d))}
function loadMotor(){try{const d=JSON.parse(localStorage.getItem(MOTOR_KEY)||"{}");Object.entries(d).forEach(([k,v])=>{if(q(k))q(k).value=v})}catch(e){}}
function gaugeClass(id,status){const el=q(id);el.classList.remove("good","warn","bad");el.classList.add(status)}
function calcMotor(){
  const flow=Math.max(0,n("motor_flow")),minF=Math.max(0,n("motor_min_flow")),maxF=Math.max(minF,n("motor_max_flow"));
  const revL=Math.max(0,n("motor_rev_l")),maxDp=Math.max(.001,n("motor_max_dp")),maxTorque=Math.max(0,n("motor_max_torque")),maxRpm=Math.max(.001,n("motor_max_rpm"));
  const off=Math.max(0,n("motor_offbottom")),on=Math.max(0,n("motor_onbottom")),surface=Math.max(0,n("motor_surface_rpm"));
  const dp=Math.max(0,on-off),rpm=flow*1000*revL,totalRpm=rpm+surface;
  const torque=Math.min(maxTorque,maxTorque*(dp/maxDp)),power=torque*(2*Math.PI*rpm/60)/1000;
  const flowPct=maxF>minF?((flow-minF)/(maxF-minF))*100:(flow/maxF*100),dpPct=dp/maxDp*100,rpmPct=rpm/maxRpm*100;
  const flowStatus=flow<minF?"Below min":flow>maxF?"Above max":"Within range";
  const dpStatus=dp>maxDp?"Above max":dpPct>=90?"Near max":"Within limit";
  const rpmStatus=rpm>maxRpm?"Above max":rpmPct>=90?"Near max":"Within limit";
  set("r_motor_dp",dp,2);set("r_motor_rpm",rpm,0);set("r_motor_total_rpm",totalRpm,0);set("r_motor_torque",torque,0);set("r_motor_power",power,1);
  q("r_motor_flow_status").textContent=flowStatus;q("r_motor_dp_status").textContent=dpStatus;q("r_motor_rpm_status").textContent=rpmStatus;
  q("r_motor_flow_pct").textContent=(maxF?Math.max(0,flowPct):0).toFixed(0)+"%";
  q("r_motor_dp_pct").textContent=dpPct.toFixed(0)+"%";q("r_motor_rpm_pct").textContent=rpmPct.toFixed(0)+"%";
  gaugeClass("motorFlowGauge",flowStatus==="Within range"?"good":"bad");
  gaugeClass("motorDpGauge",dpStatus==="Above max"?"bad":dpStatus==="Near max"?"warn":"good");
  gaugeClass("motorRpmGauge",rpmStatus==="Above max"?"bad":rpmStatus==="Near max"?"warn":"good");
}
q("saveMotorBtn").onclick=()=>{saveMotor();q("saveMotorBtn").textContent="Saved";setTimeout(()=>q("saveMotorBtn").textContent="Save",900)};
[...motorFields,"motor_flow","motor_offbottom","motor_onbottom","motor_surface_rpm"].forEach(id=>q(id).addEventListener("input",calcMotor));
q("bit_flow").addEventListener("change",()=>{q("motor_flow").value=q("bit_flow").value;calcMotor()});
q("motor_flow").addEventListener("change",()=>{q("bit_flow").value=q("motor_flow").value;calcBitHydraulics()});
loadMotor();renderJets();calcMotor();

// ===== RigCalc Pro v1.6: Cement Job Planner + Live Displacement =====
const CEMJOB_KEY="rigcalc-cementjob-v16";
const CEMSTAGE_KEY="rigcalc-cementstages-v16";
const CEMLIVE_KEY="rigcalc-cementlive-v181";

const cemJobFields=["cem2_hole","cem2_od","cem2_id","cem2_shoe","cem2_float","cem2_cross","cem2_toc","cem2_excess","cem2_lead_yield","cem2_tail_yield","cem2_tail_vol","cem2_shoe_vol","cem2_surface_vol","cem2_overdisp","cem2_output","cem2_rate","cem2_slow_trigger","cem2_slow_rate","cem2_final_pressure","cem2_bump_pressure"];
let cementStages=[];
try{cementStages=JSON.parse(localStorage.getItem(CEMSTAGE_KEY)||"[]")||[]}catch(e){cementStages=[]}
if(!cementStages.length)cementStages=[
  {name:"Preflush 1",volume:2.5,rate:1.0,limit:45},
  {name:"Preflush 2",volume:5.0,rate:1.0,limit:45},
  {name:"Lead Cement",volume:23.76,rate:1.0,limit:45},
  {name:"Tail Cement",volume:59.66,rate:1.0,limit:45},
  {name:"Displacement",volume:36.79,rate:1.2,limit:32}
];
let cemLive={running:false,stageIndex:0,stagePumped:0,lastTick:null,totalPumped:0};
try{
  const d=JSON.parse(localStorage.getItem(CEMLIVE_KEY)||"null");
  if(d)cemLive={...cemLive,...d};
}catch(e){}

function saveCemJob(){
  const d={};cemJobFields.forEach(id=>d[id]=q(id).value);
  localStorage.setItem(CEMJOB_KEY,JSON.stringify(d));
}
function loadCemJob(){
  try{const d=JSON.parse(localStorage.getItem(CEMJOB_KEY)||"{}");Object.entries(d).forEach(([k,v])=>{if(q(k))q(k).value=v})}catch(e){}
}
function saveCemStages(){localStorage.setItem(CEMSTAGE_KEY,JSON.stringify(cementStages))}
function saveCemLive(){localStorage.setItem(CEMLIVE_KEY,JSON.stringify(cemLive))}
function casingInternalCap(){return circle(Math.max(0,n("cem2_id")))}
function cemAnnCap(){return Math.max(0,circle(n("cem2_hole"))-circle(n("cem2_od")))}

function calcCementProgram(){
  const shoe=n("cem2_shoe"),toc=n("cem2_toc"),annCap=cemAnnCap(),base=Math.max(0,shoe-toc)*annCap,total=base*(1+n("cem2_excess")/100);
  const tail=Math.min(total,Math.max(0,n("cem2_tail_vol"))),lead=Math.max(0,total-tail);
  const ls=n("cem2_lead_yield")?lead*1000/n("cem2_lead_yield"):0;
  const ts=n("cem2_tail_yield")?tail*1000/n("cem2_tail_yield"):0;
  const cap=casingInternalCap();
  const crossSurf=Math.max(0,n("cem2_cross"))*cap;
  const floatCross=Math.max(0,n("cem2_float")-n("cem2_cross"))*cap;
  const bumpVol=crossSurf+floatCross+n("cem2_shoe_vol")+n("cem2_surface_vol")+n("cem2_overdisp");
  const out=n("cem2_output"),rate=n("cem2_rate"),strokes=out?bumpVol/out:0,time=rate?bumpVol/rate:0;
  set("r_cem2_anncap",annCap,6);set("r_cem2_basevol",base,3);set("r_cem2_totalcem",total,3);set("r_cem2_leadvol",lead,3);set("r_cem2_tailvol",tail,3);
  set("r_cem2_leadsacks",ls,1);set("r_cem2_tailsacks",ts,1);set("r_cem2_crosssurf",crossSurf,3);set("r_cem2_floatcross",floatCross,3);set("r_cem2_bumpvol",bumpVol,3);set("r_cem2_bumpstrokes",strokes,0);set("r_cem2_bumptime",time,1);
  return {annCap,base,total,tail,lead,crossSurf,floatCross,bumpVol,strokes,time,cap};
}
function renderCemStages(){
  const tb=q("cementStageTable").querySelector("tbody");tb.innerHTML="";
  cementStages.forEach((s,i)=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td><input data-cemstage="${i}" data-k="name" value="${s.name}"></td><td><input data-cemstage="${i}" data-k="volume" type="number" step="0.01" value="${s.volume}"></td><td><input data-cemstage="${i}" data-k="rate" type="number" step="0.01" value="${s.rate}"></td><td><input data-cemstage="${i}" data-k="limit" type="number" step="0.1" value="${s.limit}"></td><td><button data-del-cemstage="${i}">✕</button></td>`;
    tb.appendChild(tr);
  });
}
function totalScheduleVolume(){return cementStages.reduce((s,x)=>s+Math.max(0,Number(x.volume)||0),0)}
function currentCemStage(){
  if(!cementStages.length)return {index:0,stage:null};
  const index=Math.max(0,Math.min(cementStages.length-1,Number(cemLive.stageIndex)||0));
  return {index,stage:cementStages[index]};
}
function advanceCement(seconds){
  let sec=Math.max(0,seconds);
  while(sec>0&&cementStages.length){
    const {index,stage}=currentCemStage();
    if(!stage)break;
    const planned=Math.max(0,Number(stage.volume)||0);
    const rate=Math.max(0,Number(stage.rate)||0);
    if(planned<=0){
      if(index>=cementStages.length-1){cemLive.running=false;break}
      cemLive.stageIndex=index+1;cemLive.stagePumped=0;continue;
    }
    if(rate<=0)break;
    const remain=Math.max(0,planned-(Number(cemLive.stagePumped)||0));
    const possible=rate*sec/60;
    if(possible<remain){
      cemLive.stagePumped=(Number(cemLive.stagePumped)||0)+possible;
      cemLive.totalPumped=(Number(cemLive.totalPumped)||0)+possible;
      sec=0;
    }else{
      const usedSec=remain/rate*60;
      cemLive.stagePumped=planned;
      cemLive.totalPumped=(Number(cemLive.totalPumped)||0)+remain;
      sec=Math.max(0,sec-usedSec);
      if(index>=cementStages.length-1){cemLive.running=false;break}
      cemLive.stageIndex=index+1;cemLive.stagePumped=0;
    }
  }
}
function tickCementLive(){
  if(!cemLive.running)return;
  const now=Date.now();
  if(!cemLive.lastTick)cemLive.lastTick=now;
  const seconds=(now-cemLive.lastTick)/1000;
  cemLive.lastTick=now;
  advanceCement(seconds);
  saveCemLive();
}
function updateCemLive(){
  tickCementLive();
  const p=calcCementProgram(),scheduleTotal=totalScheduleVolume(),info=currentCemStage();
  const stage=info.stage,index=info.index,planned=Math.max(0,Number(stage?.volume)||0);
  const stagePumped=Math.max(0,Number(cemLive.stagePumped)||0),total=Math.max(0,Number(cemLive.totalPumped)||0);
  const remain=Math.max(0,scheduleTotal-total),out=Math.max(.000001,n("cem2_output"));
  q("cemLiveState").textContent=cemLive.running?"Pumping":"Paused";
  q("cemLivePulse").classList.toggle("running",cemLive.running);q("cemLivePulse").classList.toggle("paused",!cemLive.running);
  q("cemLiveStage").textContent=stage?.name||"—";
  q("cemLiveStageVol").textContent=stagePumped.toFixed(2)+" / "+planned.toFixed(2)+" m³";
  q("cemLiveTotal").textContent=total.toFixed(2)+" m³";
  q("cemLiveRemain").textContent=remain.toFixed(2)+" m³";
  q("cemLiveStrokes").textContent=(remain/out).toFixed(0);
  let eta=0;
  for(let i=index;i<cementStages.length;i++){
    const s=cementStages[i],v=Math.max(0,Number(s.volume)||0),r=Math.max(.0001,Number(s.rate)||1);
    eta+=(i===index?Math.max(0,v-stagePumped):v)/r;
  }
  q("cemLiveEta").textContent=remain<=.001?"At bump":eta.toFixed(1)+" min";
  const pct=scheduleTotal?Math.max(0,Math.min(100,total/scheduleTotal*100)):0;
  q("cemProgressFill").style.width=pct+"%";q("cemProgressMid").textContent=Math.round(pct)+"%";
  const stageName=(stage?.name||"").toLowerCase(),isDisp=stageName.includes("displac");
  const stageRemain=Math.max(0,planned-stagePumped),slowTrigger=Math.max(0,n("cem2_slow_trigger"));
  q("cemSlowAlert").classList.toggle("hidden",!(isDisp&&stageRemain>0&&stageRemain<=slowTrigger));
  if(isDisp&&stageRemain>0&&stageRemain<=slowTrigger)q("cemSlowAlert").textContent=`SLOW RATE NOW — target ${n("cem2_slow_rate").toFixed(2)} m³/min`;
  let dispPumped=0;
  for(let i=0;i<cementStages.length;i++){
    const nm=(cementStages[i].name||"").toLowerCase();
    if(nm.includes("displac")){
      if(i<index)dispPumped+=Math.max(0,Number(cementStages[i].volume)||0);
      else if(i===index)dispPumped+=stagePumped;
    }
  }
  const cap=p.cap;
  const frontMd=cap?Math.min(n("cem2_float"),Math.max(0,dispPumped-n("cem2_surface_vol"))/cap):0;
  q("cemFrontMd").textContent=frontMd.toFixed(0);q("cemFrontRemain").textContent=Math.max(0,n("cem2_float")-frontMd).toFixed(0);
  q("cemProgramStatus").textContent=remain<=.001?"Bump volume reached":(stage?.name||"Ready");
  q("cemStartBtn").disabled=cemLive.running;q("cemPauseBtn").disabled=!cemLive.running;
}
q("cemStartBtn").onclick=()=>{if(!cemLive.running&&cementStages.length){cemLive.running=true;cemLive.lastTick=Date.now();saveCemLive();updateCemLive()}};
q("cemPauseBtn").onclick=()=>{if(cemLive.running){tickCementLive();cemLive.running=false;cemLive.lastTick=null;saveCemLive();updateCemLive()}};
q("cemResetBtn").onclick=()=>{cemLive={running:false,stageIndex:0,stagePumped:0,lastTick:null,totalPumped:0};saveCemLive();updateCemLive()};
q("saveCementJobBtn").onclick=()=>{saveCemJob();q("saveCementJobBtn").textContent="Saved";setTimeout(()=>q("saveCementJobBtn").textContent="Save",900)};
q("addCemStageBtn").onclick=()=>{cementStages.push({name:"New stage",volume:1,rate:1,limit:0});saveCemStages();cemLive={running:false,stageIndex:0,stagePumped:0,lastTick:null,totalPumped:0};saveCemLive();renderCemStages();updateCemLive()};
document.addEventListener("change",e=>{
  const a=e.target.dataset;
  if(a.cemstage!==undefined){cementStages[+a.cemstage][a.k]=a.k==="name"?e.target.value:(+e.target.value||0);saveCemStages();renderCemStages();updateCemLive()}
});
document.addEventListener("click",e=>{
  if(e.target.dataset.delCemstage!==undefined){cementStages.splice(+e.target.dataset.delCemstage,1);saveCemStages();cemLive={running:false,stageIndex:0,stagePumped:0,lastTick:null,totalPumped:0};saveCemLive();renderCemStages();updateCemLive()}
});
cemJobFields.forEach(id=>q(id).addEventListener("input",()=>{calcCementProgram();updateCemLive()}));
loadCemJob();renderCemStages();calcCementProgram();updateCemLive();setInterval(updateCemLive,500);

// ===== RigCalc Pro v1.7: Advanced Cement Placement =====
const CEMSECTION_KEY="rigcalc-cemsections-v17";
const CEMADV_KEY="rigcalc-cemadv-v17";
let cemSections=[];
try{cemSections=JSON.parse(localStorage.getItem(CEMSECTION_KEY)||"[]")||[]}catch(e){cemSections=[]}
if(!cemSections.length)cemSections=[
  {name:"Surface casing annulus",from:0,to:638,outer:226.6,od:193.7,excess:0},
  {name:"Open hole fill",from:638,to:2659,outer:222.2,od:193.7,excess:120},
  {name:"Open hole tail",from:2659,to:3189.89,outer:222.2,od:193.7,excess:50}
];
const cemAdvFields=["cem_scav_vol","cem_scav_yield","cem_scav_water","cem_adv_lead_vol","cem_adv_lead_yield","cem_adv_lead_water","cem_adv_tail_vol","cem_adv_tail_yield","cem_adv_tail_water","cem_adv_preflush_water","cem_adv_disp_water","cem_adv_cleanup_water","cem_place_start","cem_place_vol","cem_place_dir"];
function saveCemSections(){localStorage.setItem(CEMSECTION_KEY,JSON.stringify(cemSections))}
function saveCemAdv(){const d={};cemAdvFields.forEach(id=>d[id]=q(id).value);localStorage.setItem(CEMADV_KEY,JSON.stringify(d))}
function loadCemAdv(){try{const d=JSON.parse(localStorage.getItem(CEMADV_KEY)||"{}");Object.entries(d).forEach(([k,v])=>{if(q(k))q(k).value=v})}catch(e){}}
function cemSectionCap(s){return Math.max(0,circle(Number(s.outer)||0)-circle(Number(s.od)||0))}
function cemSectionBaseVol(s){return Math.max(0,(Number(s.to)-Number(s.from))*cemSectionCap(s))}
function cemSectionSlurryVol(s){return cemSectionBaseVol(s)*(1+(Number(s.excess)||0)/100)}
function renderCemSections(){
  const tb=q("cementSectionTable").querySelector("tbody");tb.innerHTML="";
  cemSections.sort((a,b)=>a.from-b.from).forEach((s,i)=>{
    const cap=cemSectionCap(s),vol=cemSectionSlurryVol(s),tr=document.createElement("tr");
    tr.innerHTML=`<td><input data-cemsec="${i}" data-k="name" value="${s.name}"></td>
      <td><input data-cemsec="${i}" data-k="from" type="number" value="${s.from}"></td>
      <td><input data-cemsec="${i}" data-k="to" type="number" value="${s.to}"></td>
      <td><input data-cemsec="${i}" data-k="outer" type="number" value="${s.outer}"></td>
      <td><input data-cemsec="${i}" data-k="od" type="number" value="${s.od}"></td>
      <td><input data-cemsec="${i}" data-k="excess" type="number" value="${s.excess}"></td>
      <td>${cap.toFixed(5)}</td><td>${vol.toFixed(2)}</td><td><button data-del-cemsec="${i}">✕</button></td>`;
    tb.appendChild(tr);
  });
}
q("addCemSectionBtn").onclick=()=>{
  const last=cemSections[cemSections.length-1]||{to:0,outer:222.2,od:193.7,excess:0};
  cemSections.push({name:"New section",from:Number(last.to)||0,to:(Number(last.to)||0)+500,outer:Number(last.outer)||222.2,od:Number(last.od)||193.7,excess:Number(last.excess)||0});
  saveCemSections();renderCemSections();updateAdvancedCement();
};
document.addEventListener("change",e=>{
  const a=e.target.dataset;
  if(a.cemsec!==undefined){
    cemSections[+a.cemsec][a.k]=a.k==="name"?e.target.value:(+e.target.value||0);
    saveCemSections();renderCemSections();updateAdvancedCement();
  }
});
document.addEventListener("click",e=>{
  if(e.target.dataset.delCemsec!==undefined){
    cemSections.splice(+e.target.dataset.delCemsec,1);saveCemSections();renderCemSections();updateAdvancedCement();
  }
});
function tonnes(vol,yieldVal){return yieldVal>0?vol/yieldVal:0}
function placeVolume(start,vol,dir){
  let remaining=Math.max(0,vol),pos=start;
  const secs=[...cemSections].sort((a,b)=>a.from-b.from);
  if(dir==="up"){
    for(let i=secs.length-1;i>=0;i--){
      const s=secs[i],top=Number(s.from),bot=Number(s.to);
      if(pos<top||pos>bot)continue;
      const cap=cemSectionCap(s)*(1+(Number(s.excess)||0)/100);
      const available=(pos-top)*cap;
      if(remaining<=available)return {md:pos-(cap?remaining/cap:0),section:s.name};
      remaining-=available;pos=top;
    }
    for(let i=secs.length-1;i>=0;i--){
      const s=secs[i],bot=Number(s.to),top=Number(s.from);
      if(bot>=start)continue;
      const cap=cemSectionCap(s)*(1+(Number(s.excess)||0)/100),available=(bot-top)*cap;
      if(remaining<=available)return {md:bot-(cap?remaining/cap:0),section:s.name};
      remaining-=available;
    }
    return {md:0,section:"Surface"};
  } else {
    for(const s of secs){
      const top=Number(s.from),bot=Number(s.to);
      if(pos<top||pos>bot)continue;
      const cap=cemSectionCap(s)*(1+(Number(s.excess)||0)/100),available=(bot-pos)*cap;
      if(remaining<=available)return {md:pos+(cap?remaining/cap:0),section:s.name};
      remaining-=available;pos=bot;
    }
    for(const s of secs){
      const top=Number(s.from),bot=Number(s.to);
      if(top<=start)continue;
      const cap=cemSectionCap(s)*(1+(Number(s.excess)||0)/100),available=(bot-top)*cap;
      if(remaining<=available)return {md:top+(cap?remaining/cap:0),section:s.name};
      remaining-=available;
    }
    return {md:secs.length?Number(secs[secs.length-1].to):start,section:"Bottom"};
  }
}
function calcInterfaceFromBottom(vol){
  const bottom=cemSections.length?Math.max(...cemSections.map(s=>Number(s.to)||0)):n("cem2_shoe");
  return placeVolume(bottom,vol,"up");
}
function updateFluidTrain(){
  const tail=Math.max(0,n("cem_adv_tail_vol")),lead=Math.max(0,n("cem_adv_lead_vol")),spacer=Math.max(0,n("cem_adv_preflush_water"));
  const tailTop=calcInterfaceFromBottom(tail),leadTop=calcInterfaceFromBottom(tail+lead),spacerTop=calcInterfaceFromBottom(tail+lead+spacer);
  q("trainTailTop").textContent=tailTop.md.toFixed(0)+" m MD";
  q("trainLeadTop").textContent=leadTop.md.toFixed(0)+" m MD";
  q("trainSpacerTop").textContent=spacerTop.md.toFixed(0)+" m MD";
  const total=Math.max(.001,tail+lead+spacer+n("cem_adv_disp_water"));
  q("trainTail").style.flexGrow=Math.max(.2,tail/total*10);
  q("trainLead").style.flexGrow=Math.max(.2,lead/total*10);
  q("trainSpacer").style.flexGrow=Math.max(.2,spacer/total*10);
  q("trainDispl").style.flexGrow=Math.max(.2,n("cem_adv_disp_water")/total*10);
}
function updateAdvancedCement(){
  const sv=n("cem_scav_vol"),sy=n("cem_scav_yield"),sw=n("cem_scav_water");
  const lv=n("cem_adv_lead_vol"),ly=n("cem_adv_lead_yield"),lw=n("cem_adv_lead_water");
  const tv=n("cem_adv_tail_vol"),ty=n("cem_adv_tail_yield"),tw=n("cem_adv_tail_water");
  const st=tonnes(sv,sy),lt=tonnes(lv,ly),tt=tonnes(tv,ty);
  const sWater=st*sw,lWater=lt*lw,tWater=tt*tw,totalWater=sWater+lWater+tWater+n("cem_adv_preflush_water")+n("cem_adv_disp_water")+n("cem_adv_cleanup_water");
  set("r_cem_scav_t",st,2);set("r_cem_lead_t",lt,2);set("r_cem_tail_t",tt,2);set("r_cem_total_t",st+lt+tt,2);
  set("r_cem_scav_w",sWater,2);set("r_cem_lead_w",lWater,2);set("r_cem_tail_w",tWater,2);set("r_cem_total_water",totalWater,2);
  const start=n("cem_place_start"),vol=n("cem_place_vol"),dir=q("cem_place_dir").value,res=placeVolume(start,vol,dir);
  q("r_cem_place_md").textContent=res.md.toFixed(1);
  q("r_cem_place_height").textContent=Math.abs(start-res.md).toFixed(1);
  q("r_cem_place_section").textContent=res.section;
  updateFluidTrain();
  saveCemAdv();
}
cemAdvFields.forEach(id=>q(id).addEventListener("input",updateAdvancedCement));
q("cem_place_dir").addEventListener("change",updateAdvancedCement);
loadCemAdv();renderCemSections();updateAdvancedCement();

// ===== RigCalc Pro v1.8: Advanced Well Control =====
const WCJOB_KEY="rigcalc-wcjob-v18";
const wcJobFields=["wc2_mw","wc2_tvd","wc2_md","wc2_sidpp","wc2_sicp","wc2_gain","wc2_margin","wc2_scr","wc2_scr_spm","wc2_output","wc2_stringvol","wc2_annvol","wc2_shoe_tvd","wc2_lot_density","wc2_maasp_margin","wc2_work_maasp","wc2_method","wc2_steps","wc2_anncap"];
function saveWcJob(){const d={};wcJobFields.forEach(id=>d[id]=q(id).value);localStorage.setItem(WCJOB_KEY,JSON.stringify(d))}
function loadWcJob(){try{const d=JSON.parse(localStorage.getItem(WCJOB_KEY)||"{}");Object.entries(d).forEach(([k,v])=>{if(q(k))q(k).value=v})}catch(e){}}
function calcWcAdvanced(){
  const mw=Math.max(0,n("wc2_mw")),tvd=Math.max(.001,n("wc2_tvd")),sidpp=Math.max(0,n("wc2_sidpp")),margin=Math.max(0,n("wc2_margin"));
  const scr=Math.max(0,n("wc2_scr")),out=Math.max(.000001,n("wc2_output")),spm=Math.max(.001,n("wc2_scr_spm"));
  const stringVol=Math.max(0,n("wc2_stringvol")),annVol=Math.max(0,n("wc2_annvol"));
  const hydro=mw*9.80665*tvd/1000;
  const inc=(sidpp+margin)*1000/(9.80665*tvd);
  const kmw=mw+inc;
  const icp=scr+sidpp;
  const fcp=mw>0?scr*(kmw/mw):0;
  const stkBit=stringVol/out,stkAnn=annVol/out,stkTotal=stkBit+stkAnn;
  const timeBit=stkBit/spm,timeAnn=stkAnn/spm,timeTotal=stkTotal/spm;

  set("r_wc2_hydro",hydro/1000,3);set("r_wc2_inc",inc,1);set("r_wc2_kmw",kmw,1);set("r_wc2_kmw_sg",kmw/1000,3);
  set("r_wc2_icp",icp,0);set("r_wc2_fcp",fcp,0);set("r_wc2_stk_bit",stkBit,0);set("r_wc2_stk_ann",stkAnn,0);set("r_wc2_stk_total",stkTotal,0);
  set("r_wc2_time_bit",timeBit,1);set("r_wc2_time_ann",timeAnn,1);set("r_wc2_time_total",timeTotal,1);

  const shoeTvd=Math.max(.001,n("wc2_shoe_tvd")),lotD=Math.max(0,n("wc2_lot_density")),maaspMargin=Math.max(0,n("wc2_maasp_margin")),workMaasp=Math.max(0,n("wc2_work_maasp"));
  const fracP=lotD*9.80665*shoeTvd/1000;
  const shoeHyd=mw*9.80665*shoeTvd/1000;
  const maasp=Math.max(0,fracP-shoeHyd-maaspMargin);
  set("r_wc2_fracp",fracP,0);set("r_wc2_shoe_hydro",shoeHyd,0);set("r_wc2_maasp",maasp,0);
  q("r_wc2_maasp_status").textContent=workMaasp<=maasp?"Within calculated limit":"Above calculated limit";
  q("wc2MaaspStatusBox").classList.toggle("status-good",workMaasp<=maasp);
  q("wc2MaaspStatusBox").classList.toggle("status-bad",workMaasp>maasp);

  const gain=Math.max(0,n("wc2_gain")),anncap=Math.max(.000001,n("wc2_anncap")),height=gain/anncap,top=Math.max(0,n("wc2_md")-height);
  set("r_wc2_influx_h",height,1);set("r_wc2_influx_top",top,0);set("r_wc2_shortfall",sidpp,0);

  renderKillSheet({mw,kmw,icp,fcp,stkBit,stkAnn,stkTotal});
  saveWcJob();
}
function renderKillSheet(c){
  const tb=q("killSheetTable").querySelector("tbody");tb.innerHTML="";
  const steps=Math.max(2,Math.min(50,Math.round(n("wc2_steps")||10)));
  const method=q("wc2_method").value;

  if(method==="drillers"){
    // First circulation: maintain ICP while circulating influx out.
    let tr=document.createElement("tr");
    tr.innerHTML=`<td>1A</td><td>0</td><td>${c.icp.toFixed(0)}</td><td>Start first circulation at ICP</td>`;
    tb.appendChild(tr);
    tr=document.createElement("tr");
    tr.innerHTML=`<td>1B</td><td>${c.stkAnn.toFixed(0)}</td><td>${c.icp.toFixed(0)}</td><td>End first circulation / influx circulated out</td>`;
    tb.appendChild(tr);
    // Second circulation: pressure decreases as kill mud travels to bit.
    for(let i=0;i<=steps;i++){
      const f=i/steps,st=f*c.stkBit,p=c.icp+(c.fcp-c.icp)*f;
      const row=document.createElement("tr");
      row.innerHTML=`<td>2-${i+1}</td><td>${st.toFixed(0)}</td><td>${p.toFixed(0)}</td><td>${i===0?"Start kill mud":i===steps?"Kill mud at bit / FCP":"Reduce pump pressure on schedule"}</td>`;
      tb.appendChild(row);
    }
    const row=document.createElement("tr");
    row.innerHTML=`<td>2-END</td><td>${c.stkTotal.toFixed(0)}</td><td>${c.fcp.toFixed(0)}</td><td>Kill mud circulated to surface</td>`;
    tb.appendChild(row);
  } else {
    // Wait & Weight: ICP to FCP while KMW moves down string.
    for(let i=0;i<=steps;i++){
      const f=i/steps,st=f*c.stkBit,p=c.icp+(c.fcp-c.icp)*f;
      const row=document.createElement("tr");
      row.innerHTML=`<td>${i+1}</td><td>${st.toFixed(0)}</td><td>${p.toFixed(0)}</td><td>${i===0?"Start at ICP":i===steps?"Kill mud at bit / FCP":"Pressure schedule to bit"}</td>`;
      tb.appendChild(row);
    }
    const row=document.createElement("tr");
    row.innerHTML=`<td>END</td><td>${c.stkTotal.toFixed(0)}</td><td>${c.fcp.toFixed(0)}</td><td>Hold FCP until kill mud reaches surface</td>`;
    tb.appendChild(row);
  }
}
q("saveWcJobBtn").onclick=()=>{saveWcJob();q("saveWcJobBtn").textContent="Saved";setTimeout(()=>q("saveWcJobBtn").textContent="Save",900)};
wcJobFields.forEach(id=>q(id).addEventListener("input",calcWcAdvanced));
q("wc2_method").addEventListener("change",calcWcAdvanced);
loadWcJob();calcWcAdvanced();


// ===== RigCalc Pro v1.9: trajectory mode + Well Control / Live Profile integration =====
const WP_TRAJECTORY_KEY="rigcalc-wp-trajectory-v19";
function trajectoryMode(){return q("wp_trajectory_type")?.value||"deviated"}
function saveTrajectoryMode(){localStorage.setItem(WP_TRAJECTORY_KEY,trajectoryMode())}
function loadTrajectoryMode(){const v=localStorage.getItem(WP_TRAJECTORY_KEY);if(v&&q("wp_trajectory_type"))q("wp_trajectory_type").value=v}
function displayXY(md){return trajectoryMode()==="vertical"?{md,tvd:md,x:0}:surveyXY(md)}
function profilePlotGeometry(bitMD){
  if(trajectoryMode()==="vertical"){
    const maxT=Math.max(bitMD,100);
    return{sx:()=>350,sy:v=>35+Math.max(0,Math.min(maxT,v))/maxT*350,maxT,maxX:0};
  }
  const raw0=[...wpData.survey].sort((a,b)=>a.md-b.md).filter(x=>x.md<=bitMD);
  let maxX=100,maxT=100;
  if(raw0.length){
    let x=0,prev=raw0[0],xs=[0],ts=[raw0[0].tvd];
    for(let i=1;i<raw0.length;i++){const dmd=raw0[i].md-prev.md,dtvd=raw0[i].tvd-prev.tvd;x+=Math.sqrt(Math.max(0,dmd*dmd-dtvd*dtvd));xs.push(x);ts.push(raw0[i].tvd);prev=raw0[i]}
    const end=surveyXY(bitMD);xs.push(end.x);ts.push(end.tvd);maxX=Math.max(...xs,100);maxT=Math.max(...ts,100);
  }
  return{sx:v=>60+v/maxX*580,sy:v=>35+v/maxT*350,maxT,maxX};
}
plotWell=function(bitMD,frontMD){
  const geom=profilePlotGeometry(bitMD),sx=geom.sx,sy=geom.sy;
  let raw=[];
  if(trajectoryMode()==="vertical")raw=[{md:0,tvd:0,x:0},{md:bitMD,tvd:bitMD,x:0}];
  else{
    const raw0=[...wpData.survey].sort((a,b)=>a.md-b.md).filter(x=>x.md<=bitMD);if(!raw0.length)return;
    let x=0;raw=[{md:raw0[0].md,tvd:raw0[0].tvd,x:0}];let prev=raw0[0];
    for(let i=1;i<raw0.length;i++){const dmd=raw0[i].md-prev.md,dtvd=raw0[i].tvd-prev.tvd;x+=Math.sqrt(Math.max(0,dmd*dmd-dtvd*dtvd));raw.push({md:raw0[i].md,tvd:raw0[i].tvd,x});prev=raw0[i]}
    if(raw[raw.length-1].md<bitMD)raw.push(surveyXY(bitMD));
  }
  q("wellPath").setAttribute("points",raw.map(p=>`${sx(p.x)},${sy(p.tvd)}`).join(" "));
  const bit=displayXY(bitMD),front=displayXY(frontMD);
  q("bitMarker").setAttribute("cx",sx(bit.x));q("bitMarker").setAttribute("cy",sy(bit.tvd));
  q("frontMarker").setAttribute("cx",sx(front.x));q("frontMarker").setAttribute("cy",sy(front.tvd));
  q("frontLabel").setAttribute("x",Math.min(610,sx(front.x)+14));q("frontLabel").setAttribute("y",Math.max(20,sy(front.tvd)-12));q("frontLabel").textContent=`Returns ${frontMD.toFixed(0)} MD / ${interpTVD(frontMD).toFixed(0)} TVD`;
  drawDepthGrid(q("depthGrid"),sy,geom.maxT);
};
renderFluidMarkers=function(){
  const g=q("fluidMarkers");if(!g)return;g.innerHTML="";const bit=Math.max(0,n("wp_bit"));if(bit<=0)return;
  const geom=profilePlotGeometry(bit),sx=geom.sx,sy=geom.sy;
  fluidEvents.forEach(ev=>{const st=fluidStates(ev),pf=displayXY(st.front.md),pt=displayXY(st.tail.md);const line=document.createElementNS("http://www.w3.org/2000/svg","line");line.setAttribute("x1",sx(pf.x));line.setAttribute("y1",sy(pf.tvd));line.setAttribute("x2",sx(pt.x));line.setAttribute("y2",sy(pt.tvd));line.setAttribute("class","fluid-svg-line");g.appendChild(line);const cf=document.createElementNS("http://www.w3.org/2000/svg","circle");cf.setAttribute("cx",sx(pf.x));cf.setAttribute("cy",sy(pf.tvd));cf.setAttribute("r","7");cf.setAttribute("class","fluid-svg-front");g.appendChild(cf);const ct=document.createElementNS("http://www.w3.org/2000/svg","circle");ct.setAttribute("cx",sx(pt.x));ct.setAttribute("cy",sy(pt.tvd));ct.setAttribute("r","6");ct.setAttribute("class","fluid-svg-tail");g.appendChild(ct);const lab=document.createElementNS("http://www.w3.org/2000/svg","text");lab.setAttribute("x",Math.min(610,sx(pf.x)+10));lab.setAttribute("y",Math.max(16,sy(pf.tvd)-8));lab.setAttribute("class","fluid-svg-label");lab.textContent=ev.label||ev.type;g.appendChild(lab)});
};
function mdAtTVD(tvd){const s=[...wpData.survey].sort((a,b)=>a.md-b.md);if(!s.length)return tvd;if(tvd<=s[0].tvd)return s[0].md;for(let i=1;i<s.length;i++){const a=s[i-1],b=s[i];if((tvd>=a.tvd&&tvd<=b.tvd)||(tvd<=a.tvd&&tvd>=b.tvd)){const f=(tvd-a.tvd)/((b.tvd-a.tvd)||1);return a.md+f*(b.md-a.md)}}return s[s.length-1].md}
function holeAtMD(md){return [...annulusSections(n('wp_bit'))].find(h=>md>=Number(h.from)&&md<=Number(h.to))||annulusSections(n('wp_bit')).at(-1)||null}
function effectiveAnnCapAtMD(md){const h=holeAtMD(md);return h?annCapM3m(Number(h.id)||0,Number(h.od)||0)*(1+(Number(h.over)||0)/100):0}
function refreshWcGeometrySummary(){const bit=Math.max(0,n("wp_bit")),tvd=interpTVD(bit),sv=detailedPipeVolumeToBit(bit),av=totalAnnulusToBit(bit);if(q("wcGeomMd"))q("wcGeomMd").textContent=bit.toFixed(0);if(q("wcGeomTvd"))q("wcGeomTvd").textContent=tvd.toFixed(0);if(q("wcGeomString"))q("wcGeomString").textContent=sv.toFixed(3);if(q("wcGeomAnn"))q("wcGeomAnn").textContent=av.toFixed(3)}
function syncWellControlGeometry(force=false){
  const bit=Math.max(0,n("wp_bit")),tvd=interpTVD(bit),stringVol=detailedPipeVolumeToBit(bit),annVol=totalAnnulusToBit(bit),annCap=effectiveAnnCapAtMD(bit);
  const values={wc2_md:bit,wc2_tvd:tvd,wc2_stringvol:stringVol,wc2_annvol:annVol,wc2_anncap:annCap,wc2_output:Math.max(0,n("wp_output")),wc2_scr_spm:Math.max(0,n("wp_spm"))};
  Object.entries(values).forEach(([id,v])=>{if(q(id))q(id).value=Number(v).toFixed(id==="wc2_md"||id==="wc2_tvd"?0:4)});
  refreshWcGeometrySummary();if(typeof calcWcAdvanced==="function")calcWcAdvanced();
}
loadTrajectoryMode();
q("wp_trajectory_type")?.addEventListener("change",()=>{saveTrajectoryMode();updateProfile();renderFluidList();if(typeof clonePlotForZoom==="function")clonePlotForZoom()});
if(q("wcPullProfileBtn"))q("wcPullProfileBtn").onclick=()=>syncWellControlGeometry(true);
["wp_bit","wp_output","wp_spm"].forEach(id=>q(id)?.addEventListener("input",refreshWcGeometrySummary));
refreshWcGeometrySummary();

// ===== RigCalc Pro v1.10: Trip Pill / Weighted Pill Balance =====
const TRIP_PILL_KEY="rigcalc-trip-pill-v110";
const tripPillFields=["pill_mud_density","pill_density","pill_volume","pill_bit_md","pill_stand_len","pill_output","pill_use_profile","pill_x_form_grad","pill_x_csg_cap","pill_x_metal_disp","pill_x_overbalance"];

function saveTripPill(){
  const d={};
  tripPillFields.forEach(id=>{
    const el=q(id); if(!el)return;
    d[id]=el.type==="checkbox"?el.checked:el.value;
  });
  localStorage.setItem(TRIP_PILL_KEY,JSON.stringify(d));
}
function loadTripPill(){
  try{
    const d=JSON.parse(localStorage.getItem(TRIP_PILL_KEY)||"{}");
    Object.entries(d).forEach(([id,v])=>{
      const el=q(id);if(!el)return;
      if(el.type==="checkbox")el.checked=!!v;else el.value=v;
    });
  }catch(e){}
}
function tvdForPill(md){
  return interpTVD(Math.max(0,md));
}
function stringCapacityAtMD(md){
  const s=effectiveStringSections(n('wp_bit')).find(x=>md>=Number(x.from)&&md<Number(x.to));
  return s?stringCapM3m(Number(s.id)||0):0;
}
function stringVolumeBetween(fromMD,toMD){
  const a=Math.max(0,Math.min(fromMD,toMD)),b=Math.max(fromMD,toMD);
  let vol=0;
  for(const s of effectiveStringSections(n('wp_bit'))){
    const lo=Math.max(a,Number(s.from)||0),hi=Math.min(b,Number(s.to)||0);
    if(hi>lo)vol+=(hi-lo)*stringCapM3m(Number(s.id)||0);
  }
  return vol;
}
function mdAfterStringVolume(startMD,volume,bitMD){
  let remaining=Math.max(0,volume),pos=Math.max(0,startMD);
  const end=Math.max(pos,bitMD);
  const sections=effectiveStringSections(bitMD);
  for(const s of sections){
    const lo=Math.max(pos,Number(s.from)||0),hi=Math.min(end,Number(s.to)||0);
    if(hi<=lo)continue;
    const cap=stringCapM3m(Number(s.id)||0),sv=(hi-lo)*cap;
    if(remaining<=sv+.000000001)return lo+(cap?remaining/cap:0);
    remaining-=sv;pos=hi;
  }
  return null;
}
function tripPillResidual(topMD,vol,bitMD,mudD,pillD){
  const bottom=mdAfterStringVolume(topMD,vol,bitMD);
  if(bottom===null)return null;
  const topT=tvdForPill(topMD),bottomT=tvdForPill(bottom);
  return{
    bottom,
    topT,
    bottomT,
    residual:mudD*topT-(pillD-mudD)*(bottomT-topT)
  };
}
function solveTripPill(){
  const useProfile=q("pill_use_profile")?.checked;
  const bitMD=Math.max(0,useProfile?n("wp_bit"):n("pill_bit_md"));
  const mudD=Math.max(0,n("pill_mud_density")),pillD=Math.max(0,n("pill_density")),vol=Math.max(0,n("pill_volume"));
  const stand=Math.max(.001,n("pill_stand_len")),out=Math.max(.000001,n("pill_output"));
  const totalString=detailedPipeVolumeToBit(bitMD);
  const initialBottom=mdAfterStringVolume(0,vol,bitMD);
  let result={status:"",detail:"",kind:"warn",bitMD,mudD,pillD,vol,totalString,initialBottom,balanced:false,top:0,bottom:initialBottom||0};

  if(bitMD<=0||mudD<=0||pillD<=0||vol<=0){
    result.status="Need valid inputs";result.detail="Enter positive bit depth, mud density, pill density and pill volume.";result.kind="warn";return result;
  }
  if(vol>totalString+.000001||initialBottom===null){
    result.status="Pill volume exceeds string capacity";
    result.detail=`Pill volume ${vol.toFixed(3)} m³ is greater than the modeled string capacity to bit (${totalString.toFixed(3)} m³).`;
    result.kind="bad";return result;
  }
  if(pillD<=mudD){
    result.status="No positive weighted-pill drop";
    result.detail="Pill density must be greater than active mud density for this dry-pipe balance model.";
    result.kind="warn";return result;
  }

  // Root of: mud density × TVD(top) = density difference × vertical pill height.
  // Find the largest top MD for which the full pill still fits above the bit.
  let maxTop=bitMD;
  // Binary-search max top that can still contain the pill volume before bit.
  let loFit=0,hiFit=bitMD;
  for(let i=0;i<70;i++){
    const mid=(loFit+hiFit)/2;
    if(mdAfterStringVolume(mid,vol,bitMD)!==null)loFit=mid;else hiFit=mid;
  }
  maxTop=loFit;

  const f0=tripPillResidual(0,vol,bitMD,mudD,pillD);
  const f1=tripPillResidual(maxTop,vol,bitMD,mudD,pillD);
  if(!f0||!f1){
    result.status="Geometry solution unavailable";result.detail="Check detailed drill-string sections for gaps or invalid IDs.";result.kind="bad";return result;
  }

  // At surface the residual should normally be negative for a weighted pill.
  // Balance is reached when residual crosses zero.
  if(f1.residual<0){
    result.status="Balance not reached before pill reaches bit";
    result.detail="The modeled string does not provide enough TVD / internal volume for this pill to hydrostatically balance before its bottom reaches the bit.";
    result.kind="bad";result.top=maxTop;result.bottom=f1.bottom;return result;
  }

  let low=0,high=maxTop;
  for(let i=0;i<80;i++){
    const mid=(low+high)/2;
    const r=tripPillResidual(mid,vol,bitMD,mudD,pillD);
    if(!r)high=mid;
    else if(r.residual<0)low=mid;
    else high=mid;
  }
  const top=(low+high)/2;
  const r=tripPillResidual(top,vol,bitMD,mudD,pillD);
  result.balanced=true;result.top=top;result.bottom=r.bottom;
  result.topT=r.topT;result.bottomT=r.bottomT;
  result.status="Static balance found";
  result.detail="Balanced pill position solved from the detailed string capacity and survey TVD.";
  result.kind="good";
  return result;
}
function setPillText(id,value,d=1){
  const el=q(id);if(!el)return;
  el.textContent=Number.isFinite(value)?Number(value).toFixed(d):"—";
}
function renderTripPillSchematic(r){
  const rect=q("pillSlugRect"),level=q("pillFluidLevel"),topLab=q("pillTopLabel"),botLab=q("pillBottomLabel"),bitLab=q("pillBitLabel");
  if(!rect||!level)return;
  const bit=Math.max(1,r.bitMD||1);
  const top=Math.max(0,Math.min(bit,r.top||0)),bottom=Math.max(top,Math.min(bit,r.bottom||top));
  const y=m=>35+(m/bit)*350;
  const yt=y(top),yb=y(bottom);
  rect.setAttribute("y",yt);rect.setAttribute("height",Math.max(5,yb-yt));
  level.setAttribute("y1",yt);level.setAttribute("y2",yt);
  topLab.setAttribute("y",Math.max(45,yt+4));topLab.textContent=`Top ${top.toFixed(0)} m MD`;
  botLab.setAttribute("y",Math.min(395,yb+4));botLab.textContent=`Bottom ${bottom.toFixed(0)} m MD`;
  bitLab.textContent=`Bit ${bit.toFixed(0)} m MD`;
}
function updateTripPill(){
  if(q("pill_use_profile")?.checked){
    q("pill_bit_md").value=Math.max(0,n("wp_bit")).toFixed(0);
    q("pill_output").value=Math.max(0,n("wp_output")).toFixed(4);
  }
  const bit=Math.max(0,n("pill_bit_md")),tvd=interpTVD(bit),stringVol=detailedPipeVolumeToBit(bit);
  if(q("pillGeomMd"))q("pillGeomMd").textContent=bit.toFixed(0);
  if(q("pillGeomTvd"))q("pillGeomTvd").textContent=tvd.toFixed(0);
  if(q("pillGeomVol"))q("pillGeomVol").textContent=stringVol.toFixed(3);
  if(q("pillGeomType"))q("pillGeomType").textContent=trajectoryMode()==="vertical"?"Vertical display / survey TVD calc":"Deviated / Horizontal";

  const r=solveTripPill(),status=q("pillStatusCard");
  if(status){status.classList.remove("good","warn","bad");status.classList.add(r.kind)}
  if(q("pillStatus"))q("pillStatus").textContent=r.status;
  if(q("pillStatusDetail"))q("pillStatusDetail").textContent=r.detail;

  const strokes=r.vol/Math.max(.000001,n("pill_output"));
  setPillText("r_pill_strokes",strokes,0);
  setPillText("r_pill_initial_bottom",r.initialBottom,0);

  if(r.balanced){
    const length=r.bottom-r.top,drop=r.top,stands=drop/Math.max(.001,n("pill_stand_len")),whole=Math.floor(stands),remainder=drop-whole*Math.max(.001,n("pill_stand_len"));
    setPillText("r_pill_top_md",r.top,0);setPillText("r_pill_bottom_md",r.bottom,0);setPillText("r_pill_length_md",length,0);
    setPillText("r_pill_drop_md",drop,1);setPillText("r_pill_dry_stands",stands,2);setPillText("r_pill_whole_stands",whole,0);setPillText("r_pill_remainder",remainder,1);
    setPillText("r_pill_top_tvd",r.topT,0);setPillText("r_pill_bottom_tvd",r.bottomT,0);
    const initBottomT=tvdForPill(r.initialBottom||0);
    const initialDp=(r.pillD-r.mudD)*9.80665*initBottomT/1000;
    setPillText("r_pill_initial_dp",initialDp,0);
  }else{
    ["r_pill_top_md","r_pill_bottom_md","r_pill_length_md","r_pill_drop_md","r_pill_dry_stands","r_pill_whole_stands","r_pill_remainder","r_pill_top_tvd","r_pill_bottom_tvd"].forEach(id=>{if(q(id))q(id).textContent="—"});
    const initBottomT=r.initialBottom!==null&&r.initialBottom!==undefined?tvdForPill(r.initialBottom):0;
    const initialDp=(r.pillD-r.mudD)*9.80665*initBottomT/1000;
    setPillText("r_pill_initial_dp",initialDp,0);
  }
  renderTripPillSchematic(r);
  tripPillCrossCheck(r.balanced?r.top:NaN);
  saveTripPill();
}
function pullTripPillFromProfile(){
  if(q("pill_use_profile"))q("pill_use_profile").checked=true;
  if(q("pill_bit_md"))q("pill_bit_md").value=Math.max(0,n("wp_bit")).toFixed(0);
  if(q("pill_output"))q("pill_output").value=Math.max(0,n("wp_output")).toFixed(4);
  updateTripPill();
}
loadTripPill();
tripPillFields.forEach(id=>{
  const el=q(id);if(!el)return;
  el.addEventListener(el.type==="checkbox"?"change":"input",updateTripPill);
});
if(q("pillPullProfileBtn"))q("pillPullProfileBtn").onclick=pullTripPillFromProfile;
["wp_bit","wp_output"].forEach(id=>q(id)?.addEventListener("input",()=>{if(q("pill_use_profile")?.checked)updateTripPill()}));
updateTripPill();


// ===== RigCalc Pro Beta 1.05: Trip Pill independent cross-check =====
const TRIP_PILL_X_FIELDS=["pill_x_form_grad","pill_x_csg_cap","pill_x_metal_disp","pill_x_overbalance"];
function tripPillCrossCheck(geometryDrop){
  const mudD=Math.max(0,n("pill_mud_density")),bitMD=Math.max(0,n("pill_bit_md")),stand=Math.max(.001,n("pill_stand_len"));
  const tvd=Math.max(0,interpTVD(bitMD)),mudGrad=mudD*9.80665/1000,formGrad=Math.max(0,n("pill_x_form_grad"));
  const csgCap=Math.max(0,n("pill_x_csg_cap")),metal=Math.max(0,n("pill_x_metal_disp")),manualOB=Math.max(0,n("pill_x_overbalance"));
  const autoOB=Math.max(0,(mudGrad-formGrad)*tvd),ob=manualOB>0?manualOB:autoOB;
  let length=NaN,stands=NaN,diff=NaN,status="Need valid inputs",kind="status-warn";
  if(mudGrad>0&&metal>0&&csgCap>metal&&ob>=0){
    length=ob*(csgCap-metal)/(mudGrad*metal);
    stands=length/stand;
    if(Number.isFinite(geometryDrop)&&geometryDrop>0){
      diff=(length-geometryDrop)/geometryDrop*100;
      const ad=Math.abs(diff);
      if(ad<=10){status="Good agreement";kind="status-good"}
      else if(ad<=25){status="Review assumptions";kind="status-warn"}
      else{status="Large model difference";kind="status-bad"}
    }else{status="Cross-check calculated";kind="status-warn"}
  }
  set("r_pill_x_mud_grad",mudGrad,3);set("r_pill_x_ob",ob,0);set("r_pill_x_length",length,1);set("r_pill_x_stands",stands,2);set("r_pill_x_diff",diff,1);
  if(q("r_pill_x_status"))q("r_pill_x_status").textContent=status;
  const box=q("pillCrossStatusBox");if(box){box.classList.remove("status-good","status-warn","status-bad");box.classList.add(kind)}
}
TRIP_PILL_X_FIELDS.forEach(id=>q(id)?.addEventListener("input",()=>{const g=solveTripPill();tripPillCrossCheck(g.balanced?g.top:NaN);saveTripPill()}));


// ===== RigCalc Pro Beta 1.06: Education Layer =====
const EDU_MODE_KEY="rigcalc-education-mode-v106";
function eduInput(id){const el=q(id);const v=el?parseFloat(el.value):NaN;return Number.isFinite(v)?v:NaN}
function eduOut(id){const el=q(id);return el?el.textContent.trim():"—"}
function eduFmt(v,d=2){return Number.isFinite(v)?Number(v).toFixed(d):"—"}

function educationTopic(topic){
  const output=eduInput("wp_output"),spm=eduInput("wp_spm"),bit=eduInput("wp_bit");
  const pillMud=eduInput("pill_mud_density"),pillD=eduInput("pill_density"),pillV=eduInput("pill_volume");
  const mw=eduInput("wc2_mw"),tvd=eduInput("wc2_tvd"),sidpp=eduInput("wc2_sidpp"),scr=eduInput("wc2_scr");
  const mpdD=eduInput("mpd_density"),mpdT=eduInput("mpd_tvd"),sbp=eduInput("mpd_sbp"),afp=eduInput("mpd_afp");

  const T={
    capacities:{title:"Volumes & Capacities",html:`
      <div class="edu-why"><strong>Why it matters</strong><p>Fluid placement depends on geometry. Pipe capacity tells you what fits inside the string; annular capacity tells you what fits between the string and the hole or casing.</p></div>
      <h4>Pipe capacity</h4><div class="edu-formula">Capacity = π/4 × ID²</div>
      <p>RigCalc converts the entered ID to metres, calculates cross-sectional area, then expresses it as m³/m. Volume is capacity × length.</p>
      <h4>Annular capacity</h4><div class="edu-formula">Capacity = π/4 × (Hole ID² − Pipe OD²)</div>
      <h4>% over hole</h4><div class="edu-formula">Adjusted volume = Geometric volume × (1 + % over hole ÷ 100)</div>
      <p>This increases the calculated open-hole volume to account for washout/enlargement.</p>
      <div class="edu-caution">Use caliper data or an approved excess assumption when available. % over hole is a volume correction, not a measured hole shape.</div>`},

    pumps:{title:"Pumps & Bottoms-Up",html:`
      <div class="edu-why"><strong>Why it matters</strong><p>Once RigCalc knows the volume to move and pump output, it can convert that volume into strokes and time.</p></div>
      <h4>Strokes</h4><div class="edu-formula">Strokes = Required volume ÷ Pump output per stroke</div>
      <h4>Time</h4><div class="edu-formula">Minutes = Strokes ÷ Strokes per minute</div>
      <div class="edu-worked"><strong>Current pump inputs</strong><br>Output: ${eduFmt(output,4)} m³/stk<br>SPM: ${eduFmt(spm,0)}</div>
      <h4>Bottoms-up</h4><p>RigCalc sums annular volume interval-by-interval from bit to surface, including % over hole. That volume is converted to strokes and ETA.</p>
      <div class="edu-caution">Actual pump efficiency, compressibility, losses and cuttings loading can shift field returns from the theoretical value.</div>`},

    profile:{title:"Live Well Profile",html:`
      <div class="edu-why"><strong>Why it matters</strong><p>The profile turns calculated volumes into physical locations in the well.</p></div>
      <h4>Measured depth vs TVD</h4><p><strong>MD</strong> follows the wellbore. <strong>TVD</strong> is vertical depth.</p>
      <div class="edu-formula">Hydrostatic pressure is based on TVD, while fluid travel volume follows MD and local capacity.</div>
      <div class="edu-worked"><strong>Current modeled bit</strong><br>Bit MD: ${eduFmt(bit,0)} m<br>RigCalc interpolates TVD from the directional survey for hydrostatic calculations.</div>
      <h4>String modeling</h4><p>RigCalc stores Drill String and Casing Run as separate models. The active model supplies internal capacity for fluid-front calculations, while switching modes preserves the inactive model unchanged.</p><h4>Fluid fronts</h4><p>Each pumped volume is marched through the active string or annular capacities. A smaller capacity means the same volume travels farther.</p><h4>Full circulation</h4><p>One full circulation is the active string internal volume to the bit plus the annular volume from bit to surface. The marker travels down the active string, through the bit, then back up the annulus.</p>
      <h4>Vertical vs deviated display</h4><p>The trajectory selector changes the visualization. Pressure calculations continue to use survey TVD.</p>`},

    trippill:{title:"Trip Pill",html:`
      <div class="edu-why"><strong>Why it matters</strong><p>A weighted pill adds hydrostatic head inside the string. The internal fluid level can fall until the extra pill head is balanced by the missing active-mud head.</p></div>
      <h4>Static balance</h4><div class="edu-formula">ρmud × TVDtop = (ρpill − ρmud) × (TVDbottom − TVDtop)</div>
      <div class="edu-worked"><strong>Current inputs</strong><br>Mud: ${eduFmt(pillMud,0)} kg/m³<br>Pill: ${eduFmt(pillD,0)} kg/m³<br>Volume: ${eduFmt(pillV,3)} m³<br>Calculated dry-pipe drop: ${eduOut("r_pill_drop_md")} m</div>
      <h4>Why string IDs matter</h4><p>The pill occupies a different MD length in drill pipe, HWDP, collars and BHA. RigCalc solves its bottom through the actual variable internal capacities.</p>
      <h4>Independent cross-check</h4><p>The second dry-pipe method uses overbalance, wellbore capacity and tubular metal displacement. It is intentionally independent so disagreement can expose bad assumptions.</p>
      <div class="edu-caution">This is static hydrostatics only. Gel strength, float valves, restrictions, trapped pressure, swab/surge and dynamic U-tubing are not modeled.</div>`},

    cement:{title:"Cementing",html:`
      <div class="edu-why"><strong>Why it matters</strong><p>Cementing calculations answer two questions: how much slurry is needed, and how much displacement places each interface where the program requires.</p></div>
      <h4>Annular slurry volume</h4><div class="edu-formula">Volume = Annular capacity × Interval length × (1 + Excess % ÷ 100)</div>
      <h4>Dry cement</h4><div class="edu-formula">Dry cement mass = Slurry volume ÷ Yield</div>
      <h4>Displacement</h4><p>RigCalc separates surface-line volume, casing/liner internal volume, shoe track and over-displacement, then follows the programmed stages sequentially in Live Cement.</p>
      <div class="edu-caution">Verify casing tally, surface lines, yields, mix-water data, shoe track and service-company program before a job.</div>`},

    wellcontrol:{title:"Well Control",html:`
      <div class="edu-why"><strong>Why it matters</strong><p>Shut-in pressures are used to estimate formation pressure and the mud density needed to balance it.</p></div>
      <h4>Kill mud density</h4><div class="edu-formula">KMW = MW + SIDPP ÷ (0.00980665 × TVD)</div>
      <div class="edu-worked"><strong>Current values</strong><br>MW: ${eduFmt(mw,0)} kg/m³<br>SIDPP: ${eduFmt(sidpp,0)} kPa<br>TVD: ${eduFmt(tvd,0)} m<br>KMW: ${eduOut("r_wc2_kmw")} kg/m³</div>
      <h4>Initial circulating pressure</h4><div class="edu-formula">ICP = Slow circulating pressure + SIDPP</div>
      <div class="edu-worked">SCR: ${eduFmt(scr,0)} kPa → ICP: ${eduOut("r_wc2_icp")} kPa</div>
      <h4>Final circulating pressure</h4><div class="edu-formula">FCP ≈ SCR × (KMW ÷ Original MW)</div>
      <h4>MAASP</h4><p>RigCalc compares LOT/FIT-based shoe pressure with mud hydrostatic pressure at the shoe and the entered safety margin.</p>
      <div class="edu-caution">These are calculation references, not operational choke instructions. Use approved kill sheets, procedures, certified training and actual instrumentation.</div>`},

    hydraulics:{title:"Hydraulics & Hole Cleaning",html:`
      <div class="edu-why"><strong>Why it matters</strong><p>Hole cleaning depends on moving enough fluid through each annular section to transport cuttings while staying inside hydraulic and pressure limits.</p></div>
      <h4>Annular velocity</h4><div class="edu-formula">AV = Flow rate ÷ Effective annular area</div>
      <p>RigCalc calculates each hole interval separately and includes the entered % over hole. A washed-out section has more area and lower annular velocity at the same pump rate.</p>
      <h4>Transport ratio</h4><div class="edu-formula">Transport ratio ≈ (AV − Slip velocity) ÷ AV × 100%</div>
      <p>This is a transparent screening calculation using the cuttings slip velocity you enter.</p>
      <h4>Annular pressure loss</h4><div class="edu-formula">ΔP = f × (L ÷ Dh) × (ρV² ÷ 2)</div>
      <p>The current Beta uses Darcy-Weisbach with equivalent annular hydraulic diameter and effective viscosity.</p>
      <h4>ECD contribution</h4><div class="edu-formula">ΔECD = Annular ΔP ÷ (0.00980665 × TVD)</div>
      <div class="edu-caution">This is a first-pass field screen. Real drilling mud is non-Newtonian and hole cleaning is strongly affected by inclination, eccentricity, cuttings size/loading, pipe rotation/movement and bed formation.</div>`},

    mpd:{title:"Managed Pressure Drilling",html:`
      <div class="edu-why"><strong>Why it matters</strong><p>MPD aims to keep bottom-hole pressure inside the selected pore/fracture operating window while drilling and circulating.</p></div>
      <h4>Static BHP</h4><div class="edu-formula">Static BHP = Hydrostatic + Surface backpressure</div>
      <h4>Circulating BHP</h4><div class="edu-formula">Circulating BHP = Hydrostatic + Surface backpressure + Annular friction pressure</div>
      <h4>Equivalent circulating density</h4><div class="edu-formula">ECD = Circulating BHP ÷ (0.00980665 × TVD)</div>
      <div class="edu-worked"><strong>Current inputs</strong><br>Mud: ${eduFmt(mpdD,0)} kg/m³<br>TVD: ${eduFmt(mpdT,0)} m<br>SBP: ${eduFmt(sbp,0)} kPa<br>AFP: ${eduFmt(afp,0)} kPa<br>ECD: ${eduOut("r_mpd_ecd")} kg/m³</div>
      <h4>Operating window</h4><p>RigCalc applies the entered lower and upper safety margins to pore and fracture pressure and reports how far static and circulating BHP are from each limit.</p>
      <div class="edu-caution">The display is only as reliable as the pore/fracture gradients, AFP model, surface pressure and safety margins entered.</div>`}
  };
  return T[topic]||T.capacities;
}
function openEducation(topic,contextLabel=""){
  const d=educationTopic(topic);
  q("eduTitle").textContent=contextLabel?`${d.title} — ${contextLabel}`:d.title;
  q("eduBody").innerHTML=d.html;
  q("eduOverlay").classList.remove("hidden");
  document.body.style.overflow="hidden";
}
function closeEducation(){q("eduOverlay").classList.add("hidden");document.body.style.overflow=""}
function setEducationMode(on){
  document.body.classList.toggle("education-on",!!on);
  if(q("educationModeToggle"))q("educationModeToggle").checked=!!on;
  localStorage.setItem(EDU_MODE_KEY,on?"1":"0");
}
function addEduButton(card,topic){
  if(!card||card.querySelector(".edu-learn-btn"))return;
  const label=(card.querySelector("span")?.textContent||"").trim();
  const b=document.createElement("button");
  b.type="button";b.className="edu-learn-btn";b.textContent="ⓘ Learn";
  b.dataset.eduTopic=topic;b.dataset.eduLabel=label;
  card.appendChild(b);
}
function attachEducationButtons(){
  const sections=[
    ["capacities","capacities"],["pumps","pumps"],["livewell","profile"],["wellprofile","profile"],
    ["trippill","trippill"],["cementing","cement"],["wellcontrol","wellcontrol"],["mpd","mpd"],["holecleaning","hydraulics"]
  ];
  sections.forEach(([sid,topic])=>{
    const s=q(sid);if(!s)return;
    s.querySelectorAll(".results > div, .compact-results > div").forEach(card=>addEduButton(card,topic));
  });
  addEduButton(q("wellPlotCard"),"profile");
}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-edu-topic]");
  if(!b)return;
  e.preventDefault();
  openEducation(b.dataset.eduTopic,b.dataset.eduLabel||"");
});
if(q("eduCloseBtn"))q("eduCloseBtn").onclick=closeEducation;
if(q("eduOverlay"))q("eduOverlay").addEventListener("click",e=>{if(e.target===q("eduOverlay"))closeEducation()});
if(q("educationModeToggle"))q("educationModeToggle").addEventListener("change",e=>setEducationMode(e.target.checked));
attachEducationButtons();
setEducationMode(localStorage.getItem(EDU_MODE_KEY)==="1");

// ===== RigCalc Pro Beta 1.08: Hydraulics + Hole Cleaning =====
const HC_KEY="rigcalc-hole-cleaning-v108";
let hcOverlayVisible=true;
const HC_FIELDS=["hc_mw","hc_visc","hc_slip","hc_target_av","hc_rop","hc_rpm"];
function saveHoleCleaning(){const obj={overlay:hcOverlayVisible};HC_FIELDS.forEach(id=>{if(q(id))obj[id]=q(id).value});localStorage.setItem(HC_KEY,JSON.stringify(obj))}
function loadHoleCleaning(){try{const obj=JSON.parse(localStorage.getItem(HC_KEY)||"{}");HC_FIELDS.forEach(id=>{if(q(id)&&obj[id]!==undefined)q(id).value=obj[id]});if(obj.overlay!==undefined)hcOverlayVisible=!!obj.overlay}catch(e){}}
function hcInclinationAt(md){const s=[...wpData.survey].sort((a,b)=>a.md-b.md);if(s.length<2||trajectoryMode()==="vertical")return 0;let a=s[0],b=s[1];for(let i=1;i<s.length;i++){if(md<=s[i].md){a=s[i-1];b=s[i];break}a=s[Math.max(0,i-1)];b=s[i]}const dmd=Math.max(.001,Number(b.md)-Number(a.md)),dtvd=Number(b.tvd)-Number(a.tvd);return Math.acos(Math.max(-1,Math.min(1,dtvd/dmd)))*180/Math.PI}
function hcEffectiveGeometry(h){const hole=Math.max(0,Number(h.id)||0)/1000,pipe=Math.max(0,Number(h.od)||0)/1000,over=Math.max(0,Number(h.over)||0)/100,geoArea=Math.PI/4*Math.max(0,hole*hole-pipe*pipe),area=geoArea*(1+over),effHole=Math.sqrt(Math.max(0,pipe*pipe+4*area/Math.PI)),dh=Math.max(.0001,effHole-pipe);return{area,dh}}
function hcIntervals(){const bit=Math.max(0,n("wp_bit")),qMin=Math.max(0,n("wp_output"))*Math.max(0,n("wp_spm")),rho=Math.max(1,n("hc_mw")),mu=Math.max(.001,n("hc_visc"))/1000,slip=Math.max(0,n("hc_slip")),target=Math.max(.001,n("hc_target_av")),out=[];[...annulusSections(bit)].sort((a,b)=>a.from-b.from).forEach(h=>{const from=Math.max(0,Number(h.from)||0),to=Math.min(bit,Number(h.to)||0);if(to<=from)return;const g=hcEffectiveGeometry(h),av=g.area>0?qMin/g.area:0,v=av/60,re=rho*v*g.dh/mu;let f=0;if(re>0)f=re<2300?64/re:0.3164/Math.pow(re,.25);const len=to-from,dpKpa=f*(len/g.dh)*(rho*v*v/2)/1000,mid=(from+to)/2,incl=hcInclinationAt(mid),tr=av>0?Math.max(0,Math.min(100,(av-slip)/av*100)):0;let status="Good";if(av<target*.8||tr<40)status="Poor";else if(av<target||tr<60)status="Marginal";const rpm=Math.max(0,n("hc_rpm")),rop=Math.max(0,n("hc_rop")),highAngle=incl>=30;let note="";if(highAngle&&rpm<60)note="Low RPM";if(highAngle&&rop>30)note=note?note+" / High ROP":"High ROP";out.push({from,to,av,re,dpKpa,tr,incl,status,highAngle,note})});return out}
function hcSummary(){const rows=hcIntervals(),bit=Math.max(0,n("wp_bit")),tvd=Math.max(0,interpTVD(bit)),rho=Math.max(0,n("hc_mw")),totalDp=rows.reduce((s,r)=>s+r.dpKpa,0),ecdAdd=tvd>0?totalDp/(0.00980665*tvd):0,ecd=rho+ecdAdd,minAv=rows.length?Math.min(...rows.map(r=>r.av)):0,minTr=rows.length?Math.min(...rows.map(r=>r.tr)):0,minRow=rows.find(r=>Math.abs(r.av-minAv)<1e-9)||null,high=rows.filter(r=>r.highAngle).length;let overall="Good",kind="hc-good";if(rows.some(r=>r.status==="Poor")){overall="Poor section identified";kind="hc-poor"}else if(rows.some(r=>r.status==="Marginal")){overall="Marginal section identified";kind="hc-marginal"}return{rows,bit,tvd,totalDp,ecdAdd,ecd,minAv,minTr,minRow,high,overall,kind}}
function renderHydraulicsOverlay(){const g=q("hydraulicsOverlay");if(!g)return;g.innerHTML="";if(!hcOverlayVisible)return;const bit=Math.max(0,n("wp_bit"));if(bit<=0)return;const geom=profilePlotGeometry(bit),sx=geom.sx,sy=geom.sy;hcIntervals().forEach(r=>{const a=displayXY(r.from),b=displayXY(r.to),line=document.createElementNS("http://www.w3.org/2000/svg","line");line.setAttribute("x1",sx(a.x));line.setAttribute("y1",sy(a.tvd));line.setAttribute("x2",sx(b.x));line.setAttribute("y2",sy(b.tvd));line.setAttribute("class",`hc-overlay-${r.status.toLowerCase()}${r.highAngle?" hc-overlay-highangle":""}`);const title=document.createElementNS("http://www.w3.org/2000/svg","title");title.textContent=`${r.from.toFixed(0)}–${r.to.toFixed(0)} m MD | AV ${r.av.toFixed(1)} m/min | Transport ${r.tr.toFixed(0)}% | ${r.status}`;line.appendChild(title);g.appendChild(line)})}
function updateHoleCleaning(){if(!q("hcTable"))return;const s=hcSummary(),flow=Math.max(0,n("wp_output"))*Math.max(0,n("wp_spm"));q("hcBitMd").textContent=s.bit.toFixed(0);q("hcBitTvd").textContent=s.tvd.toFixed(0);q("hcFlow").textContent=flow.toFixed(3);q("hcIntervals").textContent=s.rows.length;q("hcMinAv").textContent=s.minAv.toFixed(1);q("hcMinAvDepth").textContent=s.minRow?`${s.minRow.from.toFixed(0)}–${s.minRow.to.toFixed(0)}`:"—";q("hcTotalDp").textContent=s.totalDp.toFixed(0);q("hcEcdAdd").textContent=s.ecdAdd.toFixed(1);q("hcEcd").textContent=s.ecd.toFixed(0);q("hcMinTr").textContent=s.minTr.toFixed(0);q("hcHighAngle").textContent=s.high;q("hcOverall").textContent=s.overall;const box=q("hcOverallBox");box.classList.remove("hc-good","hc-marginal","hc-poor");box.classList.add(s.kind);const tb=q("hcTable").querySelector("tbody");tb.innerHTML="";s.rows.forEach(r=>{const tr=document.createElement("tr");tr.className=`hc-row-${r.status.toLowerCase()}`;tr.innerHTML=`<td>${r.from.toFixed(0)}–${r.to.toFixed(0)}</td><td>${r.incl.toFixed(0)}°</td><td>${r.av.toFixed(1)}</td><td>${r.re.toFixed(0)}</td><td>${r.dpKpa.toFixed(0)}</td><td>${r.tr.toFixed(0)}%</td><td>${r.status}${r.note?` • ${r.note}`:""}</td>`;tb.appendChild(tr)});if(q("hcOverlayBtn"))q("hcOverlayBtn").textContent=hcOverlayVisible?"Hide profile overlay":"Show profile overlay";renderHydraulicsOverlay();saveHoleCleaning()}
const plotWellBeforeHydraulics=plotWell;plotWell=function(bitMD,frontMD){plotWellBeforeHydraulics(bitMD,frontMD);renderHydraulicsOverlay()};
HC_FIELDS.forEach(id=>q(id)?.addEventListener("input",updateHoleCleaning));["wp_bit","wp_output","wp_spm"].forEach(id=>q(id)?.addEventListener("input",updateHoleCleaning));q("hcRefreshBtn")?.addEventListener("click",updateHoleCleaning);q("hcOverlayBtn")?.addEventListener("click",()=>{hcOverlayVisible=!hcOverlayVisible;updateHoleCleaning()});q("hcOpenProfileBtn")?.addEventListener("click",()=>openScreen("wellprofile"));loadHoleCleaning();updateHoleCleaning();

// ===== RigCalc Pro Beta 1.10: Full Circulation Loop =====
const FULL_CIRC_KEY="rigcalc-full-circ-v110";
let fullCircEnabled=localStorage.getItem(FULL_CIRC_KEY)==="1";
function fullCircVolumes(){const bit=Math.max(0,n("wp_bit")),down=Math.max(0,detailedPipeVolumeToBit(bit)),up=Math.max(0,totalAnnulusToBit(bit));return{bit,down,up,total:down+up}}
function fullCircState(){
  const v=fullCircVolumes(),live=getLiveComputed(),pumped=Math.max(0,live.pumped); let within=0,completed=0;
  if(v.total>0&&pumped>0){completed=Math.floor((pumped-1e-9)/v.total);within=pumped-completed*v.total;within=Math.min(v.total,Math.max(0,within))}
  const progress=v.total>0?within/v.total*100:0,out=Math.max(0,n("wp_output")),spm=Math.max(0,n("wp_spm")),flow=out*spm; let phase="—",phaseKey="down",md=0,tvd=0,nextEvent="—";
  if(v.total<=0){phase="Need geometry";phaseKey="complete"}
  else if(within<=v.down){phase=stringMode==="casing"?"Down casing":"Down drill string";phaseKey="down";md=pipeMDFromDetailedVolume(v.bit,within);tvd=interpTVD(md);const left=Math.max(0,v.down-within);nextEvent=left<=0.0001?"At bit":`${left.toFixed(2)} m³ to bit`}
  else{phase="Up annulus";phaseKey="up";md=frontMDFromPumped(v.bit,within-v.down);tvd=interpTVD(md);const left=Math.max(0,v.total-within);nextEvent=left<=0.0001?"At surface":`${left.toFixed(2)} m³ to surface`}
  const remainVol=v.total>0?Math.max(0,v.total-within):0,totalStrokes=out>0?v.total/out:0,totalTime=flow>0?v.total/flow:0,remainTime=flow>0?remainVol/flow:0,downPct=v.total>0?v.down/v.total*100:0,upPct=v.total>0?v.up/v.total*100:0;
  return{...v,pumped,within,completed,progress,phase,phaseKey,md,tvd,nextEvent,remainVol,totalStrokes,totalTime,remainTime,downPct,upPct}
}
function renderFullCircMarker(){
  const marker=q("fullCircMarker"),label=q("fullCircLabel");if(!marker||!label)return;
  if(!fullCircEnabled){marker.style.display="none";label.style.display="none";return}
  const s=fullCircState();if(s.total<=0||!Number.isFinite(s.md)){marker.style.display="none";label.style.display="none";return}
  const geom=profilePlotGeometry(s.bit),p=displayXY(s.md),x=geom.sx(p.x),y=geom.sy(p.tvd);
  marker.setAttribute("cx",x);marker.setAttribute("cy",y);marker.setAttribute("class",`full-circ-marker phase-${s.phaseKey}`);label.setAttribute("class",`full-circ-label phase-${s.phaseKey}`);label.setAttribute("x",Math.min(520,x+14));label.setAttribute("y",Math.max(18,y-12));
  const arrow=s.phaseKey==="down"?"↓":"↑";label.textContent=`${arrow} ${s.phase}: ${s.md.toFixed(0)} MD / ${s.tvd.toFixed(0)} TVD`;marker.style.display="";label.style.display="";
}
function updateFullCirculationReadout(){
  if(!q("fullCircVol"))return;const s=fullCircState();q("fullCircVol").textContent=s.total.toFixed(2);q("fullCircStrokes").textContent=s.totalStrokes.toFixed(0);q("fullCircTime").textContent=s.totalTime.toFixed(1);q("fullCircProgress").textContent=s.progress.toFixed(0);q("fullCircPhase").textContent=s.phase;q("fullCircDepth").textContent=`${s.md.toFixed(0)} MD / ${s.tvd.toFixed(0)} TVD`;q("fullCircRemainVol").textContent=s.remainVol.toFixed(2);q("fullCircRemainTime").textContent=s.remainTime.toFixed(1);q("fullCircProgressBar").style.width=`${Math.max(0,Math.min(100,s.progress))}%`;q("fullCircEnabled").checked=fullCircEnabled;
  const card=q("fullCircLocationCard");if(card){card.classList.remove("down","up","complete");card.classList.add(s.phaseKey)}
  q("fullCircLocationTitle").textContent=s.phase;q("fullCircLoopBadge").textContent=`Loop ${s.completed+1}`;q("fullCircLocationMd").textContent=s.md.toFixed(0);q("fullCircLocationTvd").textContent=s.tvd.toFixed(0);q("fullCircLocationPumped").textContent=s.pumped.toFixed(2);q("fullCircNextEvent").textContent=s.nextEvent;q("loopRemainingVol").textContent=s.remainVol.toFixed(2);q("loopRemainingTime").textContent=liveState.running&&n("wp_spm")>0&&n("wp_output")>0?s.remainTime.toFixed(1):"Paused";
  q("fullCircDownScale").style.width=`${Math.max(0,Math.min(100,s.downPct))}%`;q("fullCircUpScale").style.width=`${Math.max(0,Math.min(100,s.upPct))}%`;renderFullCircMarker();
}
q("fullCircEnabled")?.addEventListener("change",e=>{fullCircEnabled=!!e.target.checked;localStorage.setItem(FULL_CIRC_KEY,fullCircEnabled?"1":"0");updateFullCirculationReadout()});
const renderLiveBeforeFullCirc=renderLive;renderLive=function(){renderLiveBeforeFullCirc();updateFullCirculationReadout()};
const plotWellBeforeFullCirc=plotWell;plotWell=function(bitMD,frontMD){plotWellBeforeFullCirc(bitMD,frontMD);renderFullCircMarker()};
["wp_bit","wp_output","wp_spm","wp_trajectory_type"].forEach(id=>q(id)?.addEventListener("input",updateFullCirculationReadout));
document.addEventListener("change",e=>{if(e.target?.dataset?.string!==undefined||e.target?.dataset?.hole!==undefined||e.target?.dataset?.sv!==undefined)updateFullCirculationReadout()});
updateFullCirculationReadout();
// Pixel offset is schematic; MD/TVD and capacities always remain unchanged.
function flowAnnulusPoint(md,bit){const geom=profilePlotGeometry(bit),p=displayXY(md);let x=geom.sx(p.x),y=geom.sy(p.tvd);if(q('flowAreasOn')?.checked){const a=displayXY(Math.max(0,md-.25)),b=displayXY(Math.min(bit,md+.25)),dx=geom.sx(b.x)-geom.sx(a.x),dy=geom.sy(b.tvd)-geom.sy(a.tvd),len=Math.hypot(dx,dy);x+=len?dy/len*10:10;y-=len?dx/len*10:0;}return{x,y};}
// ===== Beta 1.13: trajectory flow areas =====
const FlowAreasMath=(()=>{
 const area=id=>Math.PI/4e6*id*id;
 function model(holes,strings,bit,shoe){
  const warnings=[],annulus=[],inside=[];let annEnd=0,stringEnd=0;
  const knownShoe=Number.isFinite(shoe)&&shoe>=0;
  if(!knownShoe)warnings.push('Enter casing shoe MD to distinguish cased and open hole.');
  for(const [i,h]of [...holes].map((h,i)=>[i,h]).sort((a,b)=>Number(a[1].from)-Number(b[1].from))){
   const from=Math.max(0,Number(h.from)),to=Math.min(bit,Number(h.to)),id=Number(h.id),od=Number(h.od),over=Number(h.over)||0;
   if(Number(h.from)>=bit||Number(h.to)<=0)continue;
   if(![from,to,id,od,over].every(Number.isFinite)||to<=from||id<=od||od<0||over<0){warnings.push('Invalid hole / annulus interval omitted.');continue;}
   if(Math.abs(from-annEnd)>1e-6)warnings.push('Annulus has a gap or overlap; totals cover entered valid intervals only.');
   if(from<annEnd-1e-6)continue;annEnd=to;
   const cuts=[from,...(knownShoe&&shoe>from&&shoe<to?[shoe]:[]),to],cap=(area(id)-area(od))*(1+over/100);
   for(let k=1;k<cuts.length;k++){const a=cuts[k-1],b=cuts[k],kind=knownShoe?(a<shoe?'cased':'open'):'unknown';annulus.push({key:`ann-${i}-${k}`,kind,from:a,to:b,id,od,over,cap,volume:(b-a)*cap});}
  }
  for(const [i,s]of [...strings].map((s,i)=>[i,s]).sort((a,b)=>Number(a[1].from)-Number(b[1].from))){
   const from=Math.max(0,Number(s.from)),to=Math.min(bit,Number(s.to)),id=Number(s.id);
   if(Number(s.from)>=bit||Number(s.to)<=0)continue;
   if(![from,to,id].every(Number.isFinite)||to<=from||id<=0){warnings.push('Invalid string interval omitted.');continue;}
   if(Math.abs(from-stringEnd)>1e-6)warnings.push('String has a gap or overlap; totals cover entered valid intervals only.');
   if(from<stringEnd-1e-6)continue;stringEnd=to;
   const cap=area(id);inside.push({key:`string-${i}`,kind:'string',name:s.name||'String component',from,to,id,cap,volume:(to-from)*cap});
   if(annulus.some(h=>h.from<to&&h.to>from&&id>h.od))warnings.push('A string ID exceeds the corresponding entered string OD. Check both tables.');
  }
  if(bit>0&&annEnd<bit-1e-6)warnings.push('Annulus dimensions do not reach the bit.');
  if(bit>0&&stringEnd<bit-1e-6)warnings.push('String dimensions do not reach the bit.');
  const sum=kind=>[...annulus,...inside].filter(r=>r.kind===kind).reduce((s,r)=>s+r.volume,0);
  return{annulus,inside,knownShoe,totals:{string:sum('string'),cased:knownShoe?sum('cased'):null,open:knownShoe?sum('open'):null},warnings:[...new Set(warnings)]};
 }
 function path(from,to,survey,point,scale){const depths=[from,...survey.map(s=>Number(s.md)).filter(md=>md>from&&md<to).sort((a,b)=>a-b),to];return depths.map(md=>{const p=point(md);return{x:scale.sx(p.x),y:scale.sy(p.tvd)};});}
 function normal(md,bit,point,scale){const a=point(Math.max(0,md-.25)),b=point(Math.min(bit,md+.25)),dx=scale.sx(b.x)-scale.sx(a.x),dy=scale.sy(b.tvd)-scale.sy(a.tvd),len=Math.hypot(dx,dy);return len?{x:dy/len,y:-dx/len}:{x:1,y:0};}
 return{model,path,normal};
})();
(()=>{
 const KEY='rigcalc-flow-areas-v113';let options={show:true,shoe:''},selected=null,lastSignature='',current=null;
 try{const x=JSON.parse(localStorage.getItem(KEY)||'null');if(x)options={...options,...x};}catch(e){}
 q('flowAreasOn').checked=options.show;q('flowShoeMd').value=options.shoe;
 const names={string:'Inside drill string',cased:'Cased-hole annulus',open:'Open-hole annulus',unknown:'Annulus — casing shoe not entered'};
 const title=kind=>kind==='string'&&stringMode==='casing'?'Inside active casing':names[kind];
 function persist(){localStorage.setItem(KEY,JSON.stringify(options));}
 function svg(tag,attrs){const e=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);return e;}
 function detail(){
  let text='Tap a coloured band for its depth interval, capacity and volume. Tap a total to inspect all matching sections.';
  if(selected&&current){const all=[...current.annulus,...current.inside],rows=selected.kind?all.filter(r=>r.kind===selected.kind):all.filter(r=>r.key===selected.key);
   if(rows.length)text=rows.map(r=>`${title(r.kind)}${r.name?' — '+r.name:''}\n${r.from.toFixed(0)}–${r.to.toFixed(0)} m MD • ${(r.cap*1000).toFixed(2)} L/m • ${r.volume.toFixed(3)} m³\n${r.kind==='string'?`String ID ${r.id} mm`:`Hole/casing ID ${r.id} mm × string OD ${r.od} mm • ${r.over}% entered excess`}`).join('\n\n');
   else text='No modelled sections for this selection.';
  }
  q('flowAreaDetails').textContent=text;q('flowZoomDetails').textContent=text;
 }
 function render(){
  const bit=Math.max(0,n('wp_bit')),shoe=String(options.shoe).trim()===''?NaN:Number(options.shoe),signature=JSON.stringify([bit,shoe,options.show,wpData.holes,stringData,bhaState,wpData.survey,trajectoryMode(),stringMode]);
  if(signature===lastSignature)return;lastSignature=signature;
  current=FlowAreasMath.model(annulusSections(bit),effectiveStringSections(bit),bit,shoe);
  const outer=q('annulusFlowAreas'),inner=q('stringFlowAreas');outer.replaceChildren();inner.replaceChildren();
  for(const kind of ['string','cased','open']){const value=current.totals[kind];q(`flow${kind}Total`).textContent=`${title(kind)} · ${value===null?'Set shoe MD':value.toFixed(2)+' m³'}`;}
  q('flowAreaWarning').textContent=current.warnings.join(' ');
  const g=profilePlotGeometry(bit),point=displayXY;
  if(options.show){
   const maxSurvey=Math.max(0,...wpData.survey.map(s=>Number(s.md)||0));
   function draw(rows,host,width){for(const row of rows){if(trajectoryMode()!=='vertical'&&(maxSurvey<row.to||!wpData.survey.length))continue;
     const points=FlowAreasMath.path(row.from,row.to,wpData.survey,point,g).map(p=>`${p.x},${p.y}`).join(' ');
     const p=svg('polyline',{points,class:`flow-area flow-${row.kind}`,'stroke-width':width,'data-flow-key':row.key,tabindex:'0',role:'button','aria-label':`${title(row.kind)}, ${row.from} to ${row.to} metres measured depth. Capacity ${(row.cap*1000).toFixed(2)} litres per metre.`});
     const t=svg('title',{});t.textContent=`${title(row.kind)}: ${(row.cap*1000).toFixed(2)} L/m, ${row.volume.toFixed(3)} m³`;p.appendChild(t);host.appendChild(p);
   }}
   draw(current.annulus,outer,28);draw(current.inside,inner,8);
   if(trajectoryMode()!=='vertical'&&maxSurvey<bit)q('flowAreaWarning').textContent+=' Extend the directional survey to bit MD to display all bands.';
  }
  detail();
 }
 function pick(e){const target=e.target.closest?.('[data-flow-key]');if(!target)return;if(e.type==='keydown'&&!['Enter',' '].includes(e.key))return;e.preventDefault();e.stopImmediatePropagation();selected={key:target.getAttribute('data-flow-key')};q('flowCapacityPanel').open=true;detail();}
 for(const id of ['wellSvg','zoomSvgHost']){q(id).addEventListener('click',pick,true);q(id).addEventListener('keydown',pick,true);}
 for(const kind of ['string','cased','open'])q(`flow${kind}Total`).onclick=()=>{selected={kind};q('flowCapacityPanel').open=true;detail();};
 q('flowAreasOn').onchange=()=>{options.show=q('flowAreasOn').checked;persist();render();renderFullCircMarker();};
 q('flowShoeMd').oninput=()=>{options.shoe=q('flowShoeMd').value;persist();render();renderFullCircMarker();};
 const previousPlot=plotWell;plotWell=function(bit,front){previousPlot(bit,front);render();const p=flowAnnulusPoint(front,bit);q('frontMarker').setAttribute('cx',p.x);q('frontMarker').setAttribute('cy',p.y);};
 const previousFullMarker=renderFullCircMarker;
 renderFullCircMarker=function(){previousFullMarker();if(!options.show||!fullCircEnabled)return;const s=fullCircState();if(s.phaseKey!=='up')return;const geom=profilePlotGeometry(s.bit),p=displayXY(s.md),offset=FlowAreasMath.normal(s.md,s.bit,displayXY,geom);q('fullCircMarker').setAttribute('cx',geom.sx(p.x)+offset.x*10);q('fullCircMarker').setAttribute('cy',geom.sy(p.tvd)+offset.y*10);};
 document.addEventListener('change',()=>{render();renderFullCircMarker();});
 // Component/mode buttons can change geometry without emitting a change event.
 setInterval(render,500);render();renderFullCircMarker();
})();
// ===== Bottom-anchored BHA editor =====
(()=>{
 const originalRender=renderString,originalAdd=q('addStringBtn').onclick;
 const manualHead='<tr><th id="stringComponentHead">Component</th><th>From MD</th><th>To MD</th><th>ID mm</th><th>Internal m³</th><th></th></tr>';
 function store(){localStorage.setItem(BHA_KEY,JSON.stringify(bhaState));}
 function issue(){if(!autoBhaActive())return '';try{const sections=currentBhaSections();BhaMath.annulus(wpData.holes,sections,Math.max(0,n('wp_bit')));return '';}catch(e){return e.message;}}
 function tag(t,text){const el=document.createElement(t);if(text!==undefined)el.textContent=text;return el;}
 function inputCell(tr,index,key,value,type='number',readonly=false){const td=tag('td'),el=tag('input');el.type=type;el.value=value;el.readOnly=readonly;if(type==='number'){el.min='0';el.step='any';}el.dataset.bha=String(index);el.dataset.bhaKey=key;td.appendChild(el);tr.appendChild(td);}
 function refresh(){store();renderString();renderHoles();updateProfile();renderLive();renderFluidList();updateHoleCleaning();updateFullCirculationReadout();if(typeof updateTripPill==='function')updateTripPill();}
 renderString=function(){
  const casing=stringMode==='casing',active=autoBhaActive();q('bhaEnabled').checked=!!bhaState.enabled;q('bhaEnabled').disabled=casing;q('bhaIntro').hidden=casing;
  const head=q('stringTable').querySelector('thead');
  if(!active){head.innerHTML=manualHead;originalRender();q('bhaSummary').textContent=casing?'Casing Run uses its separate saved depth-based model.':'Manual depth-based string model.';q('bhaError').textContent='';return;}
  head.innerHTML='<tr><th id="stringComponentHead">Component · top to bottom</th><th>Length m</th><th>ID mm</th><th>OD mm</th><th>From MD</th><th>To MD</th><th>Internal m³</th><th></th></tr>';
  updateStringModeUI();q('stringModeNote').textContent='BHA lengths stay fixed. Drill pipe fills the depth above it. From/To MD are calculated from bit MD. Annulus uses these ODs; hole IDs and excess stay in Hole / annulus sections. The last hole section extends to current bit MD.';
  const body=q('stringTable').querySelector('tbody');body.replaceChildren();let sections=[];try{sections=currentBhaSections();}catch(e){}
  const all=[bhaState.pipe,...bhaState.parts],total=bhaState.parts.reduce((sum,p)=>sum+(Number(p.length)||0),0);
  all.forEach((r,i)=>{const tr=tag('tr'),section=sections[i],length=i?Number(r.length):Math.max(0,n('wp_bit')-total);
   inputCell(tr,i,'name',r.name,'text');inputCell(tr,i,'length',length,'number',i===0);inputCell(tr,i,'id',r.id);inputCell(tr,i,'od',r.od);
   tr.appendChild(tag('td',section?section.from.toFixed(1):'—'));tr.appendChild(tag('td',section?section.to.toFixed(1):'—'));tr.appendChild(tag('td',section?((section.to-section.from)*stringCapM3m(section.id)).toFixed(3):'—'));
   const td=tag('td');if(i){for(const [label,action]of [['↑','up'],['↓','down'],['×','delete']]){const b=tag('button',label);b.type='button';b.dataset.bhaAction=action;b.dataset.bhaPart=String(i-1);b.setAttribute('aria-label',`${action} ${r.name}`);td.appendChild(b);}}else td.textContent='Auto length';tr.appendChild(td);body.appendChild(tr);
  });
  const problem=issue();q('bhaError').textContent=problem;
  q('bhaSummary').textContent=`BHA ${total.toFixed(1)} m • Top ${Math.max(0,n('wp_bit')-total).toFixed(1)} m MD • Bit ${n('wp_bit').toFixed(1)} m MD`;
  const vol=detailedPipeVolumeToBit(Math.max(0,n('wp_bit'))),out=n('wp_output'),spm=n('wp_spm');q('stringTotalVol').textContent=sections.length?vol.toFixed(3):'Unavailable';q('stringBitStrokes').textContent=sections.length&&out>0?(vol/out).toFixed(0):'—';q('stringBitTime').textContent=sections.length&&out>0&&spm>0?(vol/out/spm).toFixed(1):'—';
 };
 q('bhaEnabled').onchange=()=>{bhaState.enabled=q('bhaEnabled').checked;refresh();};
 q('addStringBtn').onclick=()=>{if(!autoBhaActive()){originalAdd();return;}bhaState.parts.push({name:'New BHA component',length:10,id:50.8,od:0});refresh();};
 document.addEventListener('change',e=>{const d=e.target.dataset;if(d.bha!==undefined&&!e.target.readOnly){const i=Number(d.bha),r=i===0?bhaState.pipe:bhaState.parts[i-1];if(!r)return;r[d.bhaKey]=d.bhaKey==='name'?e.target.value:Number(e.target.value);refresh();}});
 document.addEventListener('click',e=>{const d=e.target.dataset;if(d.bhaAction){const i=Number(d.bhaPart);if(d.bhaAction==='delete')bhaState.parts.splice(i,1);else {const j=i+(d.bhaAction==='up'?-1:1);if(j>=0&&j<bhaState.parts.length)[bhaState.parts[i],bhaState.parts[j]]=[bhaState.parts[j],bhaState.parts[i]];}refresh();}});
 const oldHoles=renderHoles;renderHoles=function(){oldHoles();if(autoBhaActive())q('holeTable').querySelectorAll('input[data-k="od"]').forEach(el=>{el.disabled=true;el.value='';el.placeholder='Auto';el.title='String OD is supplied by the bottom-anchored String Modeling table.';});};
 function showInvalid(){const msg=issue();q('bhaError').textContent=msg;if(!msg)return;for(const id of ['liveEta','liveFront','liveDepth','fullCircLocationTitle','fullCircNextEvent','wp_rem_vol','wp_rem_strokes','wp_rem_time','fullCircVol','fullCircStrokes','fullCircTime','fullCircRemainVol','fullCircRemainTime','loopRemainingVol','loopRemainingTime'])if(q(id))q(id).textContent='Check BHA / hole dimensions';for(const id of ['frontMarker','fullCircMarker','fluidMarkers'])q(id)?.setAttribute('visibility','hidden');}
 const oldLive=renderLive;renderLive=function(){for(const id of ['frontMarker','fullCircMarker','fluidMarkers'])q(id)?.removeAttribute('visibility');oldLive();showInvalid();};
 const oldProfile=updateProfile;updateProfile=function(){oldProfile();showInvalid();};
 // Keep the inspector and loop totals honest when geometry is incomplete.
 const oldFull=updateFullCirculationReadout;updateFullCirculationReadout=function(){oldFull();showInvalid();};
 const oldSync=syncWellControlGeometry;syncWellControlGeometry=function(force){if(issue()){alert(issue());return;}oldSync(force);};
 q('wp_bit').addEventListener('change',()=>{renderString();renderHoles();updateProfile();renderLive();updateHoleCleaning();});
 renderString();renderHoles();updateProfile();renderLive();updateHoleCleaning();
})();
