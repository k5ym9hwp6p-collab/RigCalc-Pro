(function(root){
  function calculate({bit,volume,pumped=0,holes=[],strings=[],target=null,edge="tail",output=0}){
    if(!(bit>0&&volume>0))return {error:"Enter positive bit depth and fluid volume."};
    const circle=d=>Math.PI*d*d/4000000;
    function sections(rows,capacity,label){
      const result=rows.map(r=>({...r,from:Math.max(0,Number(r.from)),to:Math.min(bit,Number(r.to))})).filter(r=>r.to>r.from).sort((a,b)=>a.from-b.from);
      let end=0;
      for(const r of result){
        if(Math.abs(r.from-end)>1e-6)throw Error(label+" must cover surface to bit without gaps or overlaps.");
        r.cap=capacity(r);if(!(r.cap>0&&Number.isFinite(r.cap)))throw Error("Check "+label+" diameters and capacity.");end=r.to;
      }
      if(Math.abs(end-bit)>1e-6)throw Error(label+" must cover surface to bit.");
      return result;
    }
    try{
      const ann=sections(holes,r=>Number(r.id)>Number(r.od)&&Number(r.od)>=0? (circle(Number(r.id))-circle(Number(r.od)))*(1+(Number(r.over)||0)/100):0,"Hole Geometry"),
        pipe=sections(strings,r=>Number(r.id)>0?circle(Number(r.id)):0,"Detailed drill string");
      const pipeVolume=pipe.reduce((s,r)=>s+(r.to-r.from)*r.cap,0),annVolume=ann.reduce((s,r)=>s+(r.to-r.from)*r.cap,0);
      function upMD(v){let left=Math.max(0,v);for(const r of [...ann].reverse()){const vol=(r.to-r.from)*r.cap;if(left<=vol)return r.to-left/r.cap;left-=vol;}return 0;}
      function aboveBit(md){return ann.reduce((s,r)=>s+Math.max(0,r.to-Math.max(md,r.from))*r.cap,0);}
      const frontV=Math.max(0,pumped-pipeVolume),tailV=Math.max(0,pumped-pipeVolume-volume),
        front=upMD(frontV),tail=upMD(tailV),inAnnulus=Math.max(0,Math.min(annVolume,frontV)-Math.min(annVolume,tailV));
      const result={pipeVolume,annVolume,front,tail,length:Math.max(0,tail-front),inAnnulus,
        fits:volume<=annVolume,fullFront:upMD(volume),fullTail:bit,fullLength:bit-upMD(volume),
        toTailExit:Math.max(0,pipeVolume+volume-pumped),target:null};
      if(target!==null){
        if(!Number.isFinite(target)||target<0||target>bit)result.target={error:"Target must be between surface and bit MD."};
        else{
          const up=aboveBit(target),required=pipeVolume+up+(edge==="tail"?volume:0),difference=required-pumped;
          const fitsAtTarget=edge==="tail"?annVolume-up>=volume:up>=volume;
          result.target={required,remaining:Math.max(0,difference),passed:difference<-1e-6,
            strokes:output>0?Math.max(0,difference)/output:null,front:upMD(up+(edge==="tail"?volume:0)),tail:upMD(Math.max(0,up-(edge==="front"?volume:0))),fits:fitsAtTarget};
        }
      }
      return result;
    }catch(e){return {error:e.message};}
  }
  const api={calculate};root.PillSpot=api;if(typeof module!=="undefined")module.exports=api;
})(typeof globalThis!=="undefined"?globalThis:this);
