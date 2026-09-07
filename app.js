
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
function calcMPD(){const r=n("mpd_density"),t=n("mpd_tvd"),sb=n("mpd_sbp"),af=n("mpd_afp"),tar=n("mpd_target"),pp=n("mpd_ppg"),fg=n("mpd_fg"),lm=n("mpd_lowmargin"),hm=n("mpd_highmargin"),hy=r*9.80665*t/1000,st=hy+sb,ci=hy+sb+af,min=pp*t+lm,max=fg*t-hm,win=Math.max(max-min,0),es=t?st*1000/(9.80665*t):0,ec=t?ci*1000/(9.80665*t):0;set("r_mpd_hydro",hy/1000,3);set("r_mpd_static",st/1000,3);set("r_mpd_circ",ci/1000,3);set("r_mpd_esd",es,1);set("r_mpd_ecd",ec,1);set("r_mpd_req_static",Math.max(tar-hy,0),0);set("r_mpd_req_circ",Math.max(tar-hy-af,0),0);set("r_mpd_window",win,0);stat("mpd_static_status_box","r_mpd_static_status",st,min,max);stat("mpd_circ_status_box","r_mpd_circ_status",ci,min,max);q("windowMin").textContent=(min/1000).toFixed(2)+" MPa";q("windowMax").textContent=(max/1000).toFixed(2)+" MPa";const pct=max>min?Math.max(0,Math.min(100,(ci-min)/(max-min)*100)):50;q("windowMarker").style.bottom=`calc(${pct}% - 12px)`;q("windowMarker").textContent=(ci/1000).toFixed(2)+" MPa"}
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
 holes:[{from:0,to:616,id:311,od:244.5},{from:616,to:2855,id:222,od:127},{from:2855,to:3978,id:171.45,od:127}],
 formations:[{name:"Surface / Glacial",md:350,grad:9.8},{name:"Belly River",md:1010,grad:10.2},{name:"Cardium Ss",md:1460,grad:10.5},{name:"Viking Ss",md:2110,grad:10.8},{name:"Mannville",md:2460,grad:11.0},{name:"Nordegg",md:2680,grad:11.2},{name:"Fernie",md:3020,grad:11.5},{name:"Duvernay",md:3520,grad:12.0}]
};
let wpData=JSON.parse(localStorage.getItem("rigcalc-wellprofile")||"null")||JSON.parse(JSON.stringify(WP_DEFAULTS));
wpData.holes=(wpData.holes||[]).map(h=>({...h,over:Number(h.over)||0}));
function saveWP(){localStorage.setItem("rigcalc-wellprofile",JSON.stringify(wpData))}
function interpTVD(md){const s=[...wpData.survey].sort((a,b)=>a.md-b.md);if(!s.length)return md;if(md<=s[0].md)return s[0].tvd;for(let i=1;i<s.length;i++){if(md<=s[i].md){const f=(md-s[i-1].md)/(s[i].md-s[i-1].md||1);return s[i-1].tvd+f*(s[i].tvd-s[i-1].tvd)}}return s[s.length-1].tvd}
function annCapM3m(id,od){return Math.max(0,circle(id)-circle(od))}
function cumulativeAnnulus(fromMD,toMD){let total=0;for(const h of wpData.holes){const a=Math.max(fromMD,h.from),b=Math.min(toMD,h.to);if(b>a)total+=(b-a)*annCapM3m(h.id,h.od)*(1+(Number(h.over)||0)/100)}return total}
function totalAnnulusToBit(bitMD){return cumulativeAnnulus(0,bitMD)}
function frontMDFromPumped(bitMD,pumped){let remaining=Math.max(0,pumped),pos=bitMD;const hs=[...wpData.holes].sort((a,b)=>b.to-a.to);for(const h of hs){const top=Math.max(h.from,0),bot=Math.min(h.to,pos);if(bot<=top)continue;const cap=annCapM3m(h.id,h.od)*(1+(Number(h.over)||0)/100),vol=(bot-top)*cap;if(remaining<=vol)return bot-(cap?remaining/cap:0);remaining-=vol;pos=top}return 0}
function formationAtMD(md){const f=[...wpData.formations].sort((a,b)=>a.md-b.md);let cur=f[0]?.name||"—";for(const x of f){if(md>=x.md)cur=x.name;else break}return cur}
function surveyXY(md){const s=[...wpData.survey].sort((a,b)=>a.md-b.md);if(!s.length)return{md:0,tvd:0,x:0};let x=0,pts=[{md:s[0].md,tvd:s[0].tvd,x:0}],prev=s[0];for(let i=1;i<s.length;i++){const dmd=s[i].md-prev.md,dtvd=s[i].tvd-prev.tvd;x+=Math.sqrt(Math.max(0,dmd*dmd-dtvd*dtvd));pts.push({md:s[i].md,tvd:s[i].tvd,x});prev=s[i]}if(md<=pts[0].md)return pts[0];for(let i=1;i<pts.length;i++){if(md<=pts[i].md){const f=(md-pts[i-1].md)/(pts[i].md-pts[i-1].md||1);return{md,tvd:pts[i-1].tvd+f*(pts[i].tvd-pts[i-1].tvd),x:pts[i-1].x+f*(pts[i].x-pts[i-1].x)}}}return pts[pts.length-1]}
function plotWell(bitMD,frontMD){const raw0=[...wpData.survey].sort((a,b)=>a.md-b.md).filter(x=>x.md<=bitMD);if(!raw0.length)return;let x=0,raw=[{md:raw0[0].md,tvd:raw0[0].tvd,x:0}],prev=raw0[0];for(let i=1;i<raw0.length;i++){const dmd=raw0[i].md-prev.md,dtvd=raw0[i].tvd-prev.tvd;x+=Math.sqrt(Math.max(0,dmd*dmd-dtvd*dtvd));raw.push({md:raw0[i].md,tvd:raw0[i].tvd,x});prev=raw0[i]}if(raw[raw.length-1].md<bitMD)raw.push(surveyXY(bitMD));const maxX=Math.max(...raw.map(p=>p.x),100),maxT=Math.max(...raw.map(p=>p.tvd),100),sx=v=>60+v/maxX*580,sy=v=>35+v/maxT*350;q("wellPath").setAttribute("points",raw.map(p=>`${sx(p.x)},${sy(p.tvd)}`).join(" "));const bit=surveyXY(bitMD),front=surveyXY(frontMD);q("bitMarker").setAttribute("cx",sx(bit.x));q("bitMarker").setAttribute("cy",sy(bit.tvd));q("frontMarker").setAttribute("cx",sx(front.x));q("frontMarker").setAttribute("cy",sy(front.tvd));q("frontLabel").setAttribute("x",Math.min(610,sx(front.x)+14));q("frontLabel").setAttribute("y",Math.max(20,sy(front.tvd)-12));q("frontLabel").textContent=`Returns ${frontMD.toFixed(0)} m MD`;const g=q("formationBands");g.innerHTML="";const colors=["#2f75b5","#12b76a","#f79009","#7f56d9","#ee46bc","#6172f3"],fs=[...wpData.formations].sort((a,b)=>a.md-b.md);fs.forEach((f,i)=>{if(f.md>bitMD)return;const tvd=interpTVD(f.md),next=fs[i+1]&&fs[i+1].md<=bitMD?interpTVD(fs[i+1].md):interpTVD(bitMD),y=sy(tvd),h=Math.max(5,sy(next)-y),r=document.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("x","0");r.setAttribute("y",y);r.setAttribute("width","700");r.setAttribute("height",h);r.setAttribute("fill",colors[i%colors.length]);r.setAttribute("class","formation-band");g.appendChild(r);const t=document.createElementNS("http://www.w3.org/2000/svg","text");t.setAttribute("x","10");t.setAttribute("y",y+14);t.setAttribute("class","formation-text");t.textContent=f.name;g.appendChild(t)})}
function updateProfile(){const bit=Math.max(0,n("wp_bit")),out=Math.max(0,n("wp_output")),spm=Math.max(0,n("wp_spm")),mode=q("wp_mode").value,pumped=mode==="strokes"?Math.max(0,n("wp_strokes"))*out:Math.max(0,n("wp_minutes"))*spm*out,total=totalAnnulusToBit(bit),used=Math.min(total,pumped),front=frontMDFromPumped(bit,used),rem=Math.max(0,total-used),rs=out?rem/out:0,rt=spm?rs/spm:0;q("wp_bit_md").textContent=bit.toFixed(0);q("wp_front_md").textContent=front.toFixed(0);q("wp_rem_vol").textContent=rem.toFixed(2);q("wp_rem_strokes").textContent=rs.toFixed(0);q("wp_rem_time").textContent=rt.toFixed(1);q("wp_front_formation").textContent=formationAtMD(front);plotWell(bit,front);renderFormationPressures()}
function renderSurvey(){const tb=q("surveyTable").querySelector("tbody");tb.innerHTML="";wpData.survey.sort((a,b)=>a.md-b.md).forEach((r,i)=>{const tr=document.createElement("tr");tr.innerHTML=`<td><input data-sv="${i}" data-k="md" type="number" value="${r.md}"></td><td><input data-sv="${i}" data-k="tvd" type="number" value="${r.tvd}"></td><td><button data-del-sv="${i}">✕</button></td>`;tb.appendChild(tr)})}
function renderHoles(){const tb=q("holeTable").querySelector("tbody");tb.innerHTML="";wpData.holes.sort((a,b)=>a.from-b.from).forEach((r,i)=>{const tr=document.createElement("tr");tr.innerHTML=`<td><input data-hole="${i}" data-k="from" type="number" value="${r.from}"></td><td><input data-hole="${i}" data-k="to" type="number" value="${r.to}"></td><td><input data-hole="${i}" data-k="id" type="number" value="${r.id}"></td><td><input data-hole="${i}" data-k="od" type="number" value="${r.od}"></td><td><input data-hole="${i}" data-k="over" type="number" step="1" value="${Number(r.over)||0}"></td><td><button data-del-hole="${i}">✕</button></td>`;tb.appendChild(tr)})}
function renderFormationPressures(){const tb=q("formationTable").querySelector("tbody");tb.innerHTML="";wpData.formations.sort((a,b)=>a.md-b.md).forEach((r,i)=>{const p=r.grad*interpTVD(r.md)/1000,tr=document.createElement("tr");tr.innerHTML=`<td><input data-form="${i}" data-k="name" value="${r.name}"></td><td><input data-form="${i}" data-k="md" type="number" value="${r.md}"></td><td><input data-form="${i}" data-k="grad" type="number" step="0.1" value="${r.grad}"></td><td>${p.toFixed(2)} MPa</td><td><button data-del-form="${i}">✕</button></td>`;tb.appendChild(tr)})}
function renderWP(){renderSurvey();renderHoles();renderFormationPressures();updateProfile()}
document.addEventListener("change",e=>{const a=e.target.dataset;if(a.sv!==undefined){wpData.survey[+a.sv][a.k]=+e.target.value||0;saveWP();renderWP()}if(a.hole!==undefined){wpData.holes[+a.hole][a.k]=+e.target.value||0;saveWP();renderWP()}if(a.form!==undefined){wpData.formations[+a.form][a.k]=a.k==="name"?e.target.value:(+e.target.value||0);saveWP();renderWP()}if(e.target.id&&e.target.id.startsWith("wp_"))updateProfile()});
document.addEventListener("input",e=>{if(e.target.id&&["wp_bit","wp_output","wp_spm","wp_strokes","wp_minutes"].includes(e.target.id))updateProfile()});
document.addEventListener("click",e=>{if(e.target.dataset.delSv!==undefined){wpData.survey.splice(+e.target.dataset.delSv,1);saveWP();renderWP()}if(e.target.dataset.delHole!==undefined){wpData.holes.splice(+e.target.dataset.delHole,1);saveWP();renderWP()}if(e.target.dataset.delForm!==undefined){wpData.formations.splice(+e.target.dataset.delForm,1);saveWP();renderWP()}});
q("addSurveyBtn").onclick=()=>{const last=wpData.survey[wpData.survey.length-1]||{md:0,tvd:0};wpData.survey.push({md:last.md+100,tvd:last.tvd+80});saveWP();renderWP()};
q("addHoleBtn").onclick=()=>{const last=wpData.holes[wpData.holes.length-1]||{to:0,id:171.45,od:127};wpData.holes.push({from:last.to,to:last.to+500,id:last.id,od:last.od,over:Number(last.over)||0});saveWP();renderWP()};
q("addFormationBtn").onclick=()=>{wpData.formations.push({name:"New formation",md:1000,grad:10});saveWP();renderWP()};
q("wpResetBtn").onclick=()=>{q("wp_strokes").value=0;q("wp_minutes").value=0;updateProfile()};
renderWP();

// ===== RigCalc Pro v1.2: Circulate Live =====
const LIVE_KEY="rigcalc-live-v12";
let liveState={running:false,accumulatedMs:0,startedAt:null};
try{const stored=JSON.parse(localStorage.getItem(LIVE_KEY)||"null");if(stored){liveState.running=!!stored.running;liveState.accumulatedMs=Number(stored.accumulatedMs)||0;liveState.startedAt=stored.startedAt||null}}catch(e){}
function saveLive(){localStorage.setItem(LIVE_KEY,JSON.stringify(liveState))}
function currentLiveMs(){if(!liveState.running||!liveState.startedAt)return liveState.accumulatedMs;return liveState.accumulatedMs+Math.max(0,Date.now()-liveState.startedAt)}
function formatClock(ms){const sec=Math.floor(ms/1000),h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=sec%60;return h>0?`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`}
function setLiveButtons(){const running=liveState.running;q("liveStartBtn").disabled=running;q("livePauseBtn").disabled=!running;q("liveStateText").textContent=running?"Circulating":"Paused";q("livePulse").classList.toggle("running",running);q("livePulse").classList.toggle("paused",!running)}
function getLiveComputed(){const ms=currentLiveMs(),minutes=ms/60000,spm=Math.max(0,n("wp_spm")),output=Math.max(0,n("wp_output")),strokes=minutes*spm,pumped=strokes*output,bit=Math.max(0,n("wp_bit")),total=totalAnnulusToBit(bit),used=Math.min(total,pumped),front=frontMDFromPumped(bit,used),remaining=Math.max(0,total-used),remStrokes=output?remaining/output:0,remTime=spm?remStrokes/spm:0;return{ms,minutes,spm,output,strokes,pumped,bit,total,used,front,remaining,remStrokes,remTime}}
function renderLive(){const c=getLiveComputed();q("liveElapsed").textContent=formatClock(c.ms);q("liveStrokes").textContent=c.strokes.toFixed(0);q("liveVolume").textContent=c.pumped.toFixed(2)+" m³";q("liveFront").textContent=c.front.toFixed(0)+" m MD";q("liveFormation").textContent=formationAtMD(c.front);q("liveEta").textContent=c.remaining<=0.0001?"At surface":(Number.isFinite(c.remTime)?c.remTime.toFixed(1)+" min":"—");if(liveState.running||liveState.accumulatedMs>0){q("wp_bit_md").textContent=c.bit.toFixed(0);q("wp_front_md").textContent=c.front.toFixed(0);q("wp_rem_vol").textContent=c.remaining.toFixed(2);q("wp_rem_strokes").textContent=c.remStrokes.toFixed(0);q("wp_rem_time").textContent=c.remTime.toFixed(1);q("wp_front_formation").textContent=formationAtMD(c.front);plotWell(c.bit,c.front)}}
q("liveStartBtn").onclick=()=>{if(!liveState.running){liveState.running=true;liveState.startedAt=Date.now();saveLive();setLiveButtons();renderLive()}};
q("livePauseBtn").onclick=()=>{if(liveState.running){liveState.accumulatedMs=currentLiveMs();liveState.running=false;liveState.startedAt=null;saveLive();setLiveButtons();renderLive()}};
q("liveResetBtn").onclick=()=>{liveState={running:false,accumulatedMs:0,startedAt:null};saveLive();setLiveButtons();renderLive();updateProfile()};
const oldWpReset=q("wpResetBtn");if(oldWpReset){oldWpReset.addEventListener("click",()=>{liveState={running:false,accumulatedMs:0,startedAt:null};saveLive();setLiveButtons();renderLive()})}
["wp_bit","wp_output","wp_spm"].forEach(id=>q(id).addEventListener("input",()=>renderLive()));
setLiveButtons();renderLive();setInterval(renderLive,500);

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
        <div><span>Formation</span><strong>${st.front.formation}</strong></div>
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
const STRING_KEY="rigcalc-string-v14";
const STRING_DEFAULTS=[
  {name:"Drill Pipe",from:0,to:3500,id:108.6},
  {name:"HWDP",from:3500,to:3700,id:76.2},
  {name:"Drill Collars",from:3700,to:3900,id:71.4},
  {name:"BHA / Tools",from:3900,to:3978,id:50.8}
];
let stringData=[];
try{stringData=JSON.parse(localStorage.getItem(STRING_KEY)||"[]")||[]}catch(e){stringData=[]}
if(!stringData.length)stringData=JSON.parse(JSON.stringify(STRING_DEFAULTS));
function saveString(){localStorage.setItem(STRING_KEY,JSON.stringify(stringData))}
function stringCapM3m(id){return circle(Math.max(0,id))}
function effectiveStringSections(bitMD){
  return [...stringData].sort((a,b)=>a.from-b.from).map(s=>({
    ...s,
    from:Math.max(0,Number(s.from)||0),
    to:Math.min(bitMD,Number(s.to)||0),
    id:Math.max(0,Number(s.id)||0)
  })).filter(s=>s.to>s.from);
}
function detailedPipeVolumeToBit(bitMD){
  let vol=0;
  for(const s of effectiveStringSections(bitMD))vol+=(s.to-s.from)*stringCapM3m(s.id);
  return vol;
}
function pipeMDFromDetailedVolume(bitMD,vol){
  let remaining=Math.max(0,vol);
  const sections=effectiveStringSections(bitMD);
  for(const s of sections){
    const cap=stringCapM3m(s.id),sv=(s.to-s.from)*cap;
    if(remaining<=sv)return s.from+(cap?remaining/cap:0);
    remaining-=sv;
  }
  return bitMD;
}
function renderString(){
  const tb=q("stringTable").querySelector("tbody");tb.innerHTML="";
  stringData.sort((a,b)=>a.from-b.from).forEach((r,i)=>{
    const vol=Math.max(0,(Number(r.to)-Number(r.from))*stringCapM3m(Number(r.id)));
    const tr=document.createElement("tr");
    tr.innerHTML=`<td><input data-string="${i}" data-k="name" value="${r.name}"></td>
      <td><input data-string="${i}" data-k="from" type="number" value="${r.from}"></td>
      <td><input data-string="${i}" data-k="to" type="number" value="${r.to}"></td>
      <td><input data-string="${i}" data-k="id" type="number" step="0.1" value="${r.id}"></td>
      <td>${vol.toFixed(3)}</td><td><button data-del-string="${i}">✕</button></td>`;
    tb.appendChild(tr);
  });
  const bit=Math.max(0,n("wp_bit")),vol=detailedPipeVolumeToBit(bit),out=Math.max(0,n("wp_output")),spm=Math.max(0,n("wp_spm"));
  const strokes=out?vol/out:0,time=spm?strokes/spm:0;
  q("stringTotalVol").textContent=vol.toFixed(3);
  q("stringBitStrokes").textContent=strokes.toFixed(0);
  q("stringBitTime").textContent=time.toFixed(1);
}
q("addStringBtn").onclick=()=>{
  const last=stringData[stringData.length-1]||{to:0,id:108.6};
  stringData.push({name:"New component",from:Number(last.to)||0,to:(Number(last.to)||0)+100,id:Number(last.id)||100});
  saveString();renderString();renderFluidList();
};
document.addEventListener("change",e=>{
  const a=e.target.dataset;
  if(a.string!==undefined){
    stringData[+a.string][a.k]=a.k==="name"?e.target.value:(+e.target.value||0);
    saveString();renderString();renderFluidList();
  }
});
document.addEventListener("click",e=>{
  if(e.target.dataset.delString!==undefined){
    stringData.splice(+e.target.dataset.delString,1);saveString();renderString();renderFluidList();
  }
});

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
    return {phase:"Down drill string",md:downMD,progress:pipeVol?edgePumped/pipeVol:0,formation:formationAtMD(downMD),etaBit:rate?remainingPipe/rate:0,etaSurface:null};
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
  q("zoomReadout").textContent=`Front ${live.front.toFixed(0)} m MD • ${formationAtMD(live.front)} • ETA ${live.remaining<=.0001?"surface":live.remTime.toFixed(1)+" min"}`;
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
