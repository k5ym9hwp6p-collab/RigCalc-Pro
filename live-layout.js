// Arrange existing controls without duplicating inputs or changing calculations.
(()=>{
  const screen=document.getElementById('wellprofile');if(!screen)return;
  const find=selector=>screen.querySelector(selector),byId=id=>document.getElementById(id);
  const title=find('.screen-title');title.querySelector('p').textContent='Set up your well, then follow live circulation.';
  const nav=document.createElement('div');nav.className='profile-view-switch';nav.setAttribute('role','group');nav.setAttribute('aria-label','Well profile view');
  const live=document.createElement('div');live.id='profileLiveView';const setup=document.createElement('div');setup.id='profileSetupView';
  const buttons=['Live operations','Well setup'].map((label,i)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.id=i?'showWellSetup':'showLiveOperations';b.setAttribute('aria-controls',i?setup.id:live.id);b.onclick=()=>select(i);nav.appendChild(b);return b;});
  title.after(nav);nav.after(live,setup);
  function select(i){live.hidden=!!i;setup.hidden=!i;buttons.forEach((b,index)=>{b.classList.toggle('selected',index===i);b.setAttribute('aria-pressed',String(index===i));});}
  function fold(label,node){const d=document.createElement('details');d.className='operation-details';const s=document.createElement('summary');s.textContent=label;d.appendChild(s);if(node)d.appendChild(node);return d;}
  const note=document.createElement('p');note.className='setup-intro';note.textContent='Enter your survey, hole sections, drill string and formation tops here. Both views use the same well data.';setup.appendChild(note);
  const trajectory=byId('wp_trajectory_type').closest('.profile-card');setup.appendChild(trajectory);
  for(const id of ['surveyTable','holeTable','stringTable','formationTable'])setup.appendChild(byId(id).closest('.profile-card'));
  const liveCard=find('.live-card'),controls=find('.wp-controls'),manual=fold('Manual circulation calculator');
  for(const id of ['wp_strokes','wp_minutes','wp_mode'])manual.appendChild(byId(id).closest('label'));
  manual.appendChild(find('.profile-summary'));controls.classList.add('live-pump-controls');
  liveCard.querySelector('.live-head').after(controls);
  const mode=liveCard.querySelector('.live-mode-grid'),state=byId('liveOperatingState').closest('label');state.classList.add('live-state-control');mode.before(state);
  const settingsFold=fold('Return path & tracking settings');mode.before(settingsFold);settingsFold.appendChild(mode);
  const stats=liveCard.querySelector('.live-stats'),statsMore=fold('More circulation readings');statsMore.classList.add('live-readings-details');
  const moreGrid=document.createElement('div');moreGrid.className='live-stats';statsMore.appendChild(moreGrid);
  for(const id of ['liveElapsed','liveTrackingVolume','liveFormation','liveRemainingStrokes'])moreGrid.appendChild(byId(id).parentElement);
  stats.after(statsMore);liveCard.querySelector('.live-note').hidden=true;
  byId('liveEta').parentElement.style.gridColumn='1 / -1';
  live.appendChild(liveCard);live.appendChild(byId('wellPlotCard'));
  const fluid=find('.fluid-card'),newFields=fluid.querySelector('.fluid-new'),create=fold('Track a sweep or pill');create.classList.add('new-fluid-form');
  const placement=fold('Optional density & spotting target');
  for(const id of ['fluidDensity','fluidTarget','fluidTargetEdge','fluidPipeModel'])placement.appendChild(byId(id).closest('label'));
  newFields.before(create);create.append(newFields,placement,byId('addFluidBtn'));byId('addFluidBtn').textContent='Start tracking fluid';byId('addFluidBtn').addEventListener('click',()=>{if(Number(byId('fluidVolume').value)>0)create.open=false;});
  fluid.querySelector('.fluid-head strong').textContent='Active sweeps & pills';live.appendChild(fluid);
  live.appendChild(find('.returns-card'));
  live.appendChild(fold('Circulation ledger, corrections & export',find('.circulation-ledger-card')));
  const wc=fold('Well-control tracking',find('.wc-live-card'));live.appendChild(wc);
  byId('wcTrackStartBtn').addEventListener('click',()=>{wc.open=true;byId('wcProfileOverlay').checked=true;updateWellControlLive();});
  try{if(wcProfileState.tracking)wc.open=true;else{byId('wcProfileOverlay').checked=false;updateWellControlLive();}}catch(e){}
  live.appendChild(manual);
  const warning=find('.disclaimer');if(warning)live.appendChild(warning);
  const finish=document.createElement('button');finish.className='setup-done';finish.textContent='Return to live operations';finish.onclick=()=>{select(0);nav.scrollIntoView({block:'start'});};setup.appendChild(finish);
  const status=document.createElement('span');status.id='stickSelectionCount';status.className='import-selection-count';byId('stickAppend').after(status);
  const updateCount=()=>{const count=byId('stickRows').querySelectorAll('input[type=checkbox]:checked').length;status.textContent=count+' selected';};
  byId('stickRows').addEventListener('change',updateCount);new MutationObserver(updateCount).observe(byId('stickRows'),{childList:true});updateCount();
  select(0);
})();
