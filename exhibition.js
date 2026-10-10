/* Progressive enhancement: keep the original players and cards, never duplicate recordings. */
(() => {
  'use strict';
  if(!window.HTMLDialogElement)return;
  const items=[
    {id:'song-kapok',name:'木棉盛开时',region:'岭南',image:'8-kapok.jpg'},
    {id:'song-fishing',name:'丰收渔歌',region:'岭南',image:'5-fishing.jpg'},
    {id:'song-thunder',name:'旱天雷',region:'岭南',image:'6-thunder.jpg'},
    {id:'song-rising',name:'步步高',region:'岭南',image:'7-rising.jpg'},
    {id:'song-zandale',name:'扎恩达勒',region:'东北',image:'1-zandale.jpg'},
    {id:'song-changbai',name:'长白松',region:'东北',image:'2-changbai.jpg'},
    {id:'song-kashgar',name:'喀什噶尔星空',region:'西北',image:'3-kashgar.jpg'},
    {id:'song-erhai',name:'洱海泛舟',region:'西南',image:'4-erhai.jpg'}
  ];
  // Use actual media paths from the existing cards as the source of truth.
  items.forEach(item=>{item.card=document.getElementById(item.id);item.image=item.card.querySelector('img').getAttribute('src');item.home=item.card.parentNode;item.anchor=document.createComment(item.id);item.card.before(item.anchor);});
  items.filter(item=>item.region!=='岭南').forEach(({card})=>{const credit=document.createElement('p');credit.className='work-credit';credit.textContent='《华弦集》· 李泽熙作曲与演奏 · 授权收录';card.querySelector('audio').before(credit);});
  items.forEach(({card})=>{
    const audio=card.querySelector('audio'),player=document.createElement('div');player.className='exhibit-player';
    player.innerHTML='<button type="button" class="exhibit-play">播放作品</button><input type="range" min="0" max="1000" value="0" step="1" aria-label="播放进度" disabled><output data-no-locale>0:00 / —:—</output><p class="player-status" role="status"></p>';
    audio.after(player);audio.controls=false;audio.hidden=true;
    const button=player.querySelector('button'),seek=player.querySelector('input'),time=player.querySelector('output'),status=player.querySelector('p');
    const stamp=n=>Number.isFinite(n)?Math.floor(n/60)+':'+String(Math.floor(n%60)).padStart(2,'0'):'—:—';
    const update=()=>{const valid=Number.isFinite(audio.duration)&&audio.duration>0;seek.disabled=!valid;seek.value=valid?String(audio.currentTime/audio.duration*1000):'0';time.textContent=stamp(audio.currentTime)+' / '+stamp(audio.duration);};
    button.addEventListener('click',async()=>{if(!audio.paused){audio.pause();return;}try{status.textContent='';await audio.play();}catch(_){status.textContent='暂时无法播放，请稍后重试。';}});
    audio.addEventListener('play',()=>{button.textContent='暂停作品';});audio.addEventListener('pause',()=>{button.textContent='播放作品';});audio.addEventListener('ended',()=>{button.textContent='播放作品';update();});
    audio.addEventListener('error',()=>{status.textContent='暂时无法播放，请稍后重试。';});audio.addEventListener('timeupdate',update);audio.addEventListener('loadedmetadata',update);
    seek.addEventListener('input',()=>{if(Number.isFinite(audio.duration))audio.currentTime=Number(seek.value)/1000*audio.duration;update();});
  });
  const dialog=document.createElement('dialog');dialog.className='exhibition';dialog.id='exhibition';dialog.setAttribute('aria-labelledby','exhibit-title');
  dialog.innerHTML=`<header class="exhibition-top"><div class="exhibition-heading"><small>听见中国 · 声音展厅</small><h2 id="exhibit-title"></h2></div><select id="exhibit-language" aria-label="选择网站语言"><option value="zh-Hans">简体中文</option><option value="zh-Hant">繁體中文</option><option value="en">English</option></select><button class="exhibit-close" type="button">返回地图 ×</button></header><nav class="exhibit-selector" aria-label="选择展厅中的作品"></nav><p class="exhibit-progress" aria-live="polite"></p><main id="exhibit-work"></main><footer class="exhibition-bottom"><button type="button" id="exhibit-prev">← 上一首</button><button type="button" class="exhibit-postcard">把聆听带走 · 明信片 ↗</button><button type="button" id="exhibit-next">下一首 →</button></footer>`;
  document.body.append(dialog);
  const work=dialog.querySelector('#exhibit-work'),selector=dialog.querySelector('.exhibit-selector');
  let selection=[],current=null,opener=null;
  function restoreCurrent(){
    if(!current)return;
    current.card.querySelectorAll('audio').forEach(a=>a.pause());
    current.anchor.after(current.card);current=null;
  }
  function selectWork(item,focus=false){
    restoreCurrent();current=item;item.card.querySelector('.imgbox img').loading='eager';work.append(item.card);item.card.classList.remove('hide');item.card.classList.add('show');
    selector.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.work===item.id)));
    const chosen=selector.querySelector('[aria-pressed="true"]');if(chosen)selector.scrollLeft=chosen.offsetLeft-selector.offsetLeft;
    const index=selection.indexOf(item);
    dialog.querySelector('.exhibit-progress').textContent=String(index+1).padStart(2,'0')+' / '+String(selection.length).padStart(2,'0');
    const atEnd=index===selection.length-1,lingnanOnly=selection.every(i=>i.region==='岭南');
    document.getElementById('exhibit-prev').disabled=index===0;document.getElementById('exhibit-next').disabled=atEnd&&!lingnanOnly;
    document.getElementById('exhibit-next').textContent=atEnd&&lingnanOnly?'继续听向远方 →':'下一首 →';
    if(focus){const h=item.card.querySelector('h3');h.tabIndex=-1;h.focus({preventScroll:true});dialog.scrollTop=0;}
    dialog.dispatchEvent(new Event('workchange'));
  }
  window.openExhibition=(region='all',songId)=>{
    if(!dialog.open)opener=document.activeElement;
    if(typeof window.stopArrival==='function')window.stopArrival();
    document.querySelectorAll('audio').forEach(a=>a.pause());
    selection=items.filter(item=>region==='all'||item.region===region);
    if(region==='岭南')selection.sort((a,b)=>['song-fishing','song-thunder','song-rising','song-kapok'].indexOf(a.id)-['song-fishing','song-thunder','song-rising','song-kapok'].indexOf(b.id));
    if(!selection.length)selection=items.slice();
    document.getElementById('exhibit-title').textContent=region==='all'?'全部作品 · 选择一首走近':region==='岭南'?'第一章 · 岭南聆听':region+' · 华弦集延伸聆听';
    dialog.querySelector('.exhibit-close').textContent=region==='岭南'?'返回岭南章节 ×':'返回展览 ×';
    selector.replaceChildren();selection.forEach(item=>{
      const b=document.createElement('button');b.type='button';b.className='exhibit-choice';b.dataset.work=item.id;
      const image=document.createElement('img');image.src=item.image;image.alt='';const title=document.createElement('span');title.textContent=item.name;b.append(image,title);b.addEventListener('click',()=>selectWork(item,true));selector.append(b);
    });
    selectWork(selection.find(item=>item.id===songId)||(region==='岭南'?selection.find(item=>item.id==='song-fishing'):selection[0]));
    document.getElementById('exhibit-language').value=window.siteLanguage||'zh-Hans';
    document.body.classList.add('exhibition-open');if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
    const chosen=selector.querySelector('[aria-pressed="true"]');if(chosen)selector.scrollLeft=chosen.offsetLeft-selector.offsetLeft;
  };
  function closeRoom(focus=true){restoreCurrent();document.body.classList.remove('exhibition-open');dialog.close();if(focus&&opener&&opener.isConnected)opener.focus({preventScroll:true});}
  dialog.querySelector('.exhibit-close').addEventListener('click',()=>closeRoom());
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeRoom();});
  dialog.addEventListener('close',()=>{if(!dialog.open){restoreCurrent();document.body.classList.remove('exhibition-open');}});
  document.getElementById('exhibit-prev').addEventListener('click',()=>selectWork(selection[selection.indexOf(current)-1],true));
  document.getElementById('exhibit-next').addEventListener('click',()=>{const next=selection[selection.indexOf(current)+1];if(next){selectWork(next,true);return;}closeRoom(false);const extension=document.getElementById('extended-listening');extension.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});extension.focus({preventScroll:true});});
  dialog.querySelector('.exhibit-postcard').addEventListener('click',()=>{closeRoom(false);document.querySelector('[data-open-postcard]').click();});
  document.getElementById('exhibit-language').addEventListener('change',event=>{const original=document.getElementById('site-language');original.value=event.target.value;original.dispatchEvent(new Event('change'));});
  window.addEventListener('languagechange',()=>{document.getElementById('exhibit-language').value=window.siteLanguage;});
  // Map first; invitations are visible, and taking the journey is optional.
  const map=document.getElementById('map-section'),arrival=document.getElementById('city-game');
  const mapCanvas=document.createElement('div');mapCanvas.className='map-canvas';
  while(map.firstChild)mapCanvas.append(map.firstChild);
  const mapLayout=document.createElement('div');mapLayout.className='map-layout';map.append(mapLayout);mapLayout.append(mapCanvas);
  const lobby=document.createElement('aside');lobby.id='room-lobby';lobby.className='map-invitations';
  lobby.innerHTML='<div class="lingnan-invitation"><img src="8-kapok.jpg" alt="" class="invitation-image"><div class="invitation-copy"><span class="chapter-kicker">第一站 · 岭南</span><h2>从我的故乡，<br>听起。</h2><p>梁珏童演奏 · 四首岭南作品</p><button type="button" class="ink-button" data-listen-lingnan>直接聆听 ↗</button><a href="#city-game">坐一程飞机、高铁、地铁或船 →</a></div></div><a class="guest-invitation" href="#extended-listening"><img src="3-kashgar.jpg" alt=""><span><small>特别展窗 · 李泽熙</small><strong>华弦集</strong><span>听听启发我的声音 ↗</span></span></a><a class="join-invitation" href="#contribute"><span class="join-star" aria-hidden="true">＋</span><span><strong>共同点亮地图</strong><small>下一处亮点，可能来自你的琴声 ↗</small></span></a>';
  // Resolve filenames from the real cards, not assumed paths.
  lobby.querySelector('.invitation-image').src=items.find(i=>i.id==='song-kapok').image;
  lobby.querySelector('.guest-invitation img').src=items.find(i=>i.id==='song-kashgar').image;
  mapLayout.append(lobby);
  lobby.querySelector('[data-listen-lingnan]').addEventListener('click',()=>window.openExhibition('岭南'));
  const quick=document.createElement('nav');quick.className='map-directions';quick.setAttribute('aria-label','地图聆听入口');
  quick.innerHTML='<span>想从哪里听起？</span>';
  ['岭南','东北','西北','西南'].forEach(region=>{const button=document.createElement('button');button.type='button';button.textContent=region==='岭南'?'岭南 · 第一站':region;button.addEventListener('click',()=>window.openExhibition(region));quick.append(button);});
  mapCanvas.querySelector('#china-map').after(quick);
  const journey=document.createElement('details');journey.className='journey-fold';journey.id='journey-fold';
  journey.innerHTML='<summary><span>去岭南的路，你来选。</span><small>飞机 / 高铁 / 地铁 / 船　↗</small></summary>';
  map.after(journey);journey.append(arrival);
  const chapter=document.createElement('section');chapter.className='chapter-listening';chapter.id='chapter-listening';
  chapter.innerHTML='<div class="chapter-listening-heading"><div><span class="chapter-kicker">第一章 · 岭南聆听</span><h2>这四首，先为你拉。</h2></div><span class="chapter-credit">梁珏童演奏 · 任选一首，不必按顺序</span></div><div class="chapter-pieces"></div>';
  journey.after(chapter);
  ['song-fishing','song-thunder','song-rising','song-kapok'].forEach((id,index)=>{
    const item=items.find(i=>i.id===id),button=document.createElement('button');button.type='button';button.className='chapter-piece';
    const img=document.createElement('img');img.src=item.image;img.alt='';img.loading='lazy';
    const copy=document.createElement('span');copy.className='piece-caption';
    const n=document.createElement('small');n.textContent=String(index+1).padStart(2,'0');
    const name=document.createElement('strong');name.textContent=item.name;
    const action=document.createElement('span');action.className='piece-arrow';action.textContent='打开聆听 ↗';
    copy.append(n,name,action);button.append(img,copy);button.addEventListener('click',()=>window.openExhibition('岭南',id));chapter.querySelector('.chapter-pieces').append(button);
  });
  const extension=document.createElement('section');extension.className='guest-extension';extension.id='extended-listening';extension.tabIndex=-1;
  extension.innerHTML='<div class="guest-heading"><div><span class="chapter-kicker">特别展窗 · 授权收录</span><h2>华弦集</h2></div><p>老师李泽熙的作品，启发了这张地图。<br>从岭南出发，也听听远方。</p></div><div class="room-portals"></div><p class="guest-credit">李泽熙作曲与演奏 · 四首作品，经授权收录</p>';
  chapter.after(extension);
  extension.append(document.querySelector('.filter-bar'));
  document.querySelector('.filter-btn.active')?.classList.remove('active');
  document.querySelector('.filter-btn[data-region="all"]').textContent='浏览全部 8 首 ↗';
  items.filter(i=>i.region!=='岭南').forEach(item=>{
    const button=document.createElement('button');button.type='button';button.className='room-portal';
    const img=document.createElement('img');img.src=item.image;img.alt='';img.loading='lazy';
    const name=document.createElement('span');name.textContent=item.name;
    const note=document.createElement('small');note.textContent=item.region;
    button.append(img,name,note);button.addEventListener('click',()=>window.openExhibition(item.region,item.id));extension.querySelector('.room-portals').append(button);
  });
  const contribution=document.getElementById('contribute');extension.after(contribution);
  const wrappers=new Map();
  [['project-origin','为什么从岭南开始？'],['process-authorship','展览背后 · 策展手记']].forEach(([id,title])=>{
    const section=document.getElementById(id),details=document.createElement('details'),summary=document.createElement('summary');
    details.className='lobby-details';summary.textContent=title;section.before(details);details.append(summary,section);wrappers.set(id,details);
  });
  contribution.after(wrappers.get('project-origin'),wrappers.get('process-authorship'));
  function revealAnchor(id){
    if(wrappers.has(id))wrappers.get(id).open=true;
    if(id==='city-game')journey.open=true;
  }
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>revealAnchor(link.getAttribute('href').slice(1))));
  revealAnchor(location.hash.slice(1));
  window.addEventListener('hashchange',()=>revealAnchor(location.hash.slice(1)));
  const headerNav=document.querySelector('body>.page header .curation-actions')||document.querySelector('header .curation-actions');
  if(headerNav){
    const links=headerNav.querySelectorAll('a');
    links[0].href='#chapter-listening';links[0].textContent='第一站 · 岭南';
    links[1].href='#extended-listening';links[1].textContent='特别展窗 · 华弦集';
  }
  // A visitor's own shortlist, kept in this page only: no fake audience activity.
  const saved=new Set(),shelf=document.createElement('section');shelf.className='listening-shelf';shelf.setAttribute('aria-label','我的聆听单');
  shelf.innerHTML='<div><span class="chapter-kicker">我的聆听单</span><p class="shelf-empty">听到喜欢的，就留在这里。</p><small>仅本次页面保留，刷新后清空。</small></div><div class="shelf-items"></div><p class="shelf-status" role="status"></p>';
  map.append(shelf);
  const shelfPostcard=document.createElement('button');shelfPostcard.type='button';shelfPostcard.className='shelf-postcard';shelfPostcard.textContent='写一张声音明信片 ↗';
  shelfPostcard.addEventListener('click',()=>document.querySelector('[data-open-postcard]').click());shelf.append(shelfPostcard);
  const saveButton=document.createElement('button');saveButton.type='button';saveButton.className='save-work';saveButton.setAttribute('aria-pressed','false');saveButton.textContent='＋ 留在我的聆听单';
  dialog.querySelector('.exhibition-bottom').prepend(saveButton);
  function updateSaved(){
    saveButton.setAttribute('aria-pressed',String(!!current&&saved.has(current.id)));
    saveButton.textContent=current&&saved.has(current.id)?'✓ 已留下 · 点击移除':'＋ 留在我的聆听单';
    const list=shelf.querySelector('.shelf-items');list.replaceChildren();
    shelf.querySelector('.shelf-empty').hidden=saved.size>0;
    saved.forEach(id=>{const item=items.find(i=>i.id===id),b=document.createElement('button');b.type='button';b.textContent=item.name;b.addEventListener('click',()=>window.openExhibition(item.region,id));list.append(b);});
  }
  saveButton.addEventListener('click',()=>{
    if(!current)return;
    if(saved.has(current.id)){saved.delete(current.id);shelf.querySelector('.shelf-status').textContent='已从本次聆听单移除。';}
    else{saved.add(current.id);shelf.querySelector('.shelf-status').textContent='已留下，回到地图就能找到。';}
    updateSaved();
  });
  dialog.addEventListener('workchange',updateSaved);
  // Keep original large artwork. A visitor may hide it when they want only sound.
  items.forEach(({card})=>{
    const toggle=card.querySelector('.culture-toggle');toggle.setAttribute('aria-expanded','false');
    if(toggle.tagName!=='BUTTON'){toggle.tabIndex=0;toggle.setAttribute('role','button');toggle.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle.click();}});}
    const viewButton=document.createElement('button');viewButton.type='button';viewButton.className='sound-only';viewButton.textContent='观看声音意象';viewButton.setAttribute('aria-pressed','false');
    const box=card.querySelector('.imgbox');box.append(viewButton);
    const quiet=document.createElement('div');quiet.className='quiet-art';box.append(quiet);
    viewButton.addEventListener('click',()=>{const quietMode=card.classList.toggle('sound-focused');viewButton.setAttribute('aria-pressed',String(quietMode));viewButton.textContent=quietMode?'返回作品画面':'观看声音意象';});
  });
  document.body.classList.add('exhibition-ready','map-first');
})();
