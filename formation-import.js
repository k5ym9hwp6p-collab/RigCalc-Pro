const FormationImport=(()=>{
  const number=s=>{if(s===null||s===undefined||String(s).trim()==='')return null;const v=Number(String(s).replaceAll(',','').trim());return Number.isFinite(v)?v:null;};
  function parse(text){
    const rows=[];
    for(const line of text.split(/\r?\n/)){
      if(!line.trim())continue;
      let row;
      if(line.includes('\t')||line.includes(';')){
        const a=line.split(line.includes('\t')?'\t':';');if(!a[0].trim()||number(a[1])===null)continue;
        row={name:a[0].trim(),md:number(a[1]),tvd:number(a[2]),subsea:number(a[3]),offset:number(a[4]),expected:number(a[5]),mud:a[6]?.trim()||''};
      }else{
        const m=line.match(/^\s*(\d[\d,.]*)\s+(\d[\d,.]*)\s+([A-Za-z].*)$/);if(!m)continue;
        const detail=m[3].match(/^(.*?)\s+(-\d[\d,.]*)\s+(.*)$/);
        const pressures=[...(detail?.[3]||'').matchAll(/([~≈+-]?)\s*(\d[\d,]*(?:\.\d+)?)\s*kPa\b/gi)].map(m=>m[1]==='-'?null:number(m[2]));
        const mud=(detail?.[3]||'').match(/([><≥≤]?\s*\d[\d,]*(?:\.\d+)?)\s*kg/i);
        row={name:detail?detail[1].trim():m[3].trim(),md:number(m[1]),tvd:number(m[2]),subsea:detail?number(detail[2]):null,offset:pressures.length>=2?pressures[0]:null,expected:pressures.length>=2?pressures[1]:null,mud:mud?.[1]?.trim()||''};
      }
      row.raw=line;row.approved=false;rows.push(row);
    }
    return rows;
  }
  function convert(row,{useExpected=false,pressureUnit='kPa',filename='',datum='',kb=null}={}){
    const md=number(row.md),tvd=number(row.tvd),expected=number(row.expected);
    if(!row.name?.trim()||md===null||md<0)throw Error('Enter formation name and non-negative MD.');
    if(tvd!==null&&(tvd<0||tvd>md))throw Error('TVD must be between zero and MD; subsea elevation belongs in its own field.');
    if(useExpected&&expected!==null&&(!(expected>0)||!(tvd>0)))throw Error('A positive expected pressure requires a positive TVD.');
    if(useExpected&&expected!==null&&!datum.trim())throw Error('Enter the depth reference datum before calculating a pressure gradient.');
    const grad=useExpected&&expected!==null?expected*(pressureUnit==='MPa'?1000:1)/tvd:null;
    return {name:row.name.trim(),md,tvd,grad,lowGrad:null,highGrad:null,source:'Prognosis',confidence:'Low',importSource:{filename,datum,kb:number(kb),subsea:number(row.subsea),offsetPressure:number(row.offset),expectedPressure:expected,pressureUnit,plannedMudDensity:row.mud||'',raw:row.raw||'',reviewed:true}};
  }
  return {parse,convert,number};
})();
if(typeof module!=='undefined')module.exports=FormationImport;

if(typeof document!=='undefined')(()=>{
  const el=id=>document.getElementById(id),host=el('formationImportPanel');if(!host)return;
  let rows=[],image=null,filename='',crop=null,start=null,busy=false,revision=0,pressureUnit='kPa';
  const canvas=el('stickCanvas'),ctx=canvas.getContext('2d');
  const message=s=>{el('stickStatus').textContent=s;};
  function draw(){if(!image)return;ctx.drawImage(image,0,0,canvas.width,canvas.height);if(crop){ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,crop.x*image.width/canvas.width,crop.y*image.height/canvas.height,crop.w*image.width/canvas.width,crop.h*image.height/canvas.height,crop.x,crop.y,crop.w,crop.h);ctx.strokeStyle='#12b76a';ctx.lineWidth=3;ctx.strokeRect(crop.x,crop.y,crop.w,crop.h);}}
  function point(e){const r=canvas.getBoundingClientRect();return {x:Math.max(0,Math.min(canvas.width,(e.clientX-r.left)*canvas.width/r.width)),y:Math.max(0,Math.min(canvas.height,(e.clientY-r.top)*canvas.height/r.height))};}
  canvas.onpointerdown=e=>{if(!image||busy)return;start=point(e);canvas.setPointerCapture(e.pointerId);};
  canvas.onpointermove=e=>{if(!start)return;const p=point(e);crop={x:Math.min(start.x,p.x),y:Math.min(start.y,p.y),w:Math.abs(start.x-p.x),h:Math.abs(start.y-p.y)};draw();};
  canvas.onpointerup=()=>{start=null;if(crop&&(crop.w<10||crop.h<10))crop=null;revision++;draw();};
  canvas.onpointercancel=()=>{start=null;};
  el('stickResetCrop').onclick=()=>{crop=null;revision++;draw();};
  el('stickPhoto').onchange=async e=>{const file=e.target.files[0];if(!file)return;if(busy)return;revision++;filename=file.name;rows=[];render();el('stickText').value='';image=null;crop=null;
    const url=URL.createObjectURL(file),img=new Image();img.onload=()=>{image=img;canvas.width=1000;canvas.height=Math.round(img.height/img.width*1000);canvas.hidden=false;draw();URL.revokeObjectURL(url);message('Drag over the formation table to crop, then select Read photo.');};img.onerror=()=>{URL.revokeObjectURL(url);message('Photo could not be opened. Try a JPEG or PNG.');};img.src=url;
  };
  async function loadOCR(){if(globalThis.Tesseract)return;await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/tesseract.min.js';s.onload=resolve;s.onerror=()=>{s.remove();reject(Error('Photo reader could not load. Check your internet connection.'));};document.head.appendChild(s);});}
  el('stickRead').onclick=async()=>{
    if(!image){message('Choose a photo first.');return;}if(busy)return;busy=true;const rev=revision;el('stickRead').disabled=true;el('stickPhoto').disabled=true;let worker;
    try{
      await loadOCR();message('Loading photo reader…');
      worker=await Tesseract.createWorker('eng',1,{workerPath:'https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/worker.min.js',corePath:'https://cdn.jsdelivr.net/npm/tesseract.js-core@7.0.0',langPath:'https://cdn.jsdelivr.net/npm/@tesseract.js-data/eng@1.0.0/4.0.0_best_int',logger:m=>message(`${m.status}${m.progress!==undefined?' '+Math.round(m.progress*100)+'%':''}`)});
      const c=crop||{x:0,y:0,w:canvas.width,h:canvas.height},scan=document.createElement('canvas');const scale=Math.min(3,3000/c.w);scan.width=Math.round(c.w*scale);scan.height=Math.round(c.h*scale);
      scan.getContext('2d').drawImage(image,c.x*image.width/canvas.width,c.y*image.height/canvas.height,c.w*image.width/canvas.width,c.h*image.height/canvas.height,0,0,scan.width,scan.height);
      await worker.setParameters({tessedit_pageseg_mode:'6'});const {data}=await worker.recognize(scan);
      if(rev!==revision){message('Crop changed. Read the photo again.');return;}
      el('stickText').value=data.text;rows=FormationImport.parse(data.text);el('stickPressureUnit').value=pressureUnit='kPa';render();message(`${rows.length} candidate rows extracted. Photo text can contain mistakes: review each row and select Keep. Unmatched lines remain in the text box. If few rows were found, use a sharper photo or paste table text.`);
    }catch(e){message('Photo reading failed: '+e.message+' You can paste table text below instead.');}
    finally{if(worker)await worker.terminate();busy=false;el('stickRead').disabled=false;el('stickPhoto').disabled=false;}
  };
  function field(tr,row,key,type='number'){const td=document.createElement('td'),input=document.createElement('input');input.type=type;input.value=row[key]??'';if(type==='number')input.step='any';if(['name','md','tvd'].includes(key)&&(row[key]===null||row[key]==='')){input.className='stick-missing';input.placeholder='Check';}input.setAttribute('aria-label',key);input.onchange=()=>{row[key]=type==='number'?FormationImport.number(input.value):input.value;row.approved=false;render();};td.appendChild(input);tr.appendChild(td);}
  function render(){const body=el('stickRows');body.replaceChildren();rows.forEach((row,i)=>{const tr=document.createElement('tr'),td=document.createElement('td'),check=document.createElement('input');tr.classList.toggle('stick-needs-review',!row.approved);check.type='checkbox';check.checked=row.approved;check.setAttribute('aria-label','Keep '+row.name);check.onchange=()=>{row.approved=check.checked;tr.classList.toggle('stick-needs-review',!row.approved);};td.appendChild(check);tr.appendChild(td);['name','md','tvd','subsea','offset','expected','mud'].forEach(k=>field(tr,row,k,['name','mud'].includes(k)?'text':'number'));const remove=document.createElement('button');remove.textContent='Remove';remove.onclick=()=>{rows.splice(i,1);render();};const last=document.createElement('td');last.appendChild(remove);tr.appendChild(last);body.appendChild(tr);});}
  el('stickParse').onclick=()=>{rows=FormationImport.parse(el('stickText').value);render();message(`${rows.length} candidates. Check values and select Keep for each row to import.`);};
  el('stickPressureUnit').onchange=()=>{const next=el('stickPressureUnit').value,factor=next===pressureUnit?1:next==='MPa'?.001:1000;rows.forEach(r=>{for(const k of ['offset','expected'])if(r[k]!==null)r[k]*=factor;r.approved=false;});pressureUnit=next;render();message('Pressure values converted to '+next+'. Review and select Keep again.');};
  el('stickAddRow').onclick=()=>{rows.push({name:'',md:null,tvd:null,subsea:null,offset:null,expected:null,mud:'',approved:false});render();};
  function apply(replace){
    try{const kept=rows.filter(r=>r.approved);if(!kept.length)throw Error('Select Keep on at least one reviewed row.');
      const result=kept.map(r=>FormationImport.convert(r,{useExpected:el('stickUsePressure').checked,pressureUnit:el('stickPressureUnit').value,filename,datum:el('stickDatum').value,kb:el('stickKB').value}));
      const seen=new Set((replace?[]:wpData.formations).map(f=>`${f.name.toLowerCase().trim()}|${f.md}`));for(const f of result){const key=`${f.name.toLowerCase()}|${f.md}`;if(seen.has(key))throw Error('Duplicate formation and MD: '+f.name);seen.add(key);}
      const before=JSON.stringify(wpData.formations),next=replace?result:[...wpData.formations,...result];
      localStorage.setItem('rigcalc-formation-import-undo',before);const old=wpData.formations;wpData.formations=next;try{saveWP();}catch(e){wpData.formations=old;throw e;}renderWP();rows.forEach(r=>r.approved=false);render();message(`Imported ${result.length} reviewed formations. Undo import restores the previous table.`);
    }catch(e){message(e.message);}
  }
  el('stickAppend').onclick=()=>apply(false);
  el('stickReplace').onclick=()=>{if(!el('stickAllowReplace').checked){message('Select Replace entire existing table before replacing.');return;}apply(true);el('stickAllowReplace').checked=false;};
  el('stickUndo').onclick=()=>{try{const value=localStorage.getItem('rigcalc-formation-import-undo');if(!value){message('No import to undo.');return;}wpData.formations=JSON.parse(value);saveWP();localStorage.removeItem('rigcalc-formation-import-undo');renderWP();message('Previous formation table restored.');}catch(e){message('Undo failed: '+e.message);}};
})();
