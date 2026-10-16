(() => {
  try { if (sessionStorage.getItem('anurag-welcomed')) return; } catch (_) {}
  const dialog = document.createElement('dialog');
  dialog.className = 'welcome'; dialog.setAttribute('aria-label', 'Welcome to Anurag’s portfolio');
  dialog.innerHTML = '<div class="welcome-stage"><span class="welcome-wordmark">anurag</span><button class="welcome-start" type="button">Step inside ↗</button><div class="welcome-copy" aria-live="polite"></div><button class="welcome-skip" type="button">Skip intro</button></div>';
  document.body.appendChild(dialog);
  if (!dialog.showModal) { dialog.remove(); return; }
  const root=document.documentElement, copy=dialog.querySelector('.welcome-copy');
  let ended=false, running=false, progress=0, last=0, frame;
  function finish() {
    if(ended)return; ended=true;cancelAnimationFrame(frame);
    try{sessionStorage.setItem('anurag-welcomed','1')}catch(_){}
    dialog.classList.add('is-done');root.classList.remove('welcome-open');
    setTimeout(()=>{dialog.close();dialog.remove();},650);
  }
  function draw(now){
    if(ended)return;
    if(last)progress+=Math.min(now-last,50)/3400;
    last=now;
    if(progress>=1){finish();return;}
    const part=Math.min(2,Math.floor(progress*3)),t=(progress*3)%1;
    copy.textContent=['Welcome to my world.','I’m Anurag.','Let’s dive in.'][part];
    const fade=Math.min(1,t*7)*Math.min(1,(1-t)*7);
    copy.style.opacity=fade;
    copy.style.transform=`translateY(${(1-t)*35}px) scale(${part===2?1+Math.pow(t,3)*22:0.88+t*.35})`;
    frame=requestAnimationFrame(draw);
  }
  dialog.querySelector('.welcome-start').addEventListener('click',()=>{
    if(running)return;running=true;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return;}
    dialog.querySelector('.welcome-start').hidden=true;
    frame=requestAnimationFrame(draw);
  });
  dialog.addEventListener('wheel',e=>{if(running){e.preventDefault();progress+=Math.max(0,e.deltaY)/6500;}},{passive:false});
  dialog.querySelector('.welcome-skip').addEventListener('click',finish);
  dialog.addEventListener('cancel',e=>{e.preventDefault();finish()});
  root.classList.add('welcome-open');dialog.showModal();
})();
