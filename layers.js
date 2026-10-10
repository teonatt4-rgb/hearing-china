/* Chapters share the existing recordings, map and contribution prototype. */
(() => {
  'use strict';
  const wrap=document.querySelector('.wrap');
  const app=document.createElement('main');
  app.id='layer-app';
  wrap.insertBefore(app,document.querySelector('footer'));
  const page=(id,title)=>{
    const section=document.createElement('section');
    section.id='layer-'+id;section.className='layer-view';section.setAttribute('aria-label',title);
    app.append(section);return section;
  };
  const home=page('home','展览地图'),lingnan=page('lingnan','岭南章节'),workPage=page('work','作品聆听'),guest=page('huaxian','华弦集特别展'),contribute=page('contribute','共同点亮地图'),postcard=page('postcard','声音明信片');
  const map=document.getElementById('map-section'),lobby=document.getElementById('room-lobby');
  const journey=document.getElementById('journey-fold'),chapter=document.getElementById('chapter-listening');
  const extension=document.getElementById('extended-listening');
  const contribution=document.getElementById('contribute');
  const note=document.querySelector('.lobby-details:has(#project-origin)');
  const process=document.querySelector('.lobby-details:has(#process-authorship)');
  const mapLayout=map.querySelector('.map-layout');
  const shelf=map.querySelector('.listening-shelf');
  if(shelf)shelf.remove();
  mapLayout.after(lobby);
  lobby.classList.add('layer-portals');
  const homeHeader=document.querySelector('.wrap>header');
  const noteGrid=document.createElement('div');noteGrid.className='layer-note-grid';
  noteGrid.append(note,process);
  home.append(homeHeader,map,noteGrid);
  const quickListening=document.createElement('section');
  quickListening.className='quick-listening';
  quickListening.setAttribute('aria-label','直接聆听我的演奏');
  quickListening.innerHTML='<div class="quick-listening-intro"><span class="quick-listening-kicker">先听一首</span><strong>我的岭南演奏</strong><small>任选一首 · 点击即播放完整录音</small><a href="#huaxian">也可以从《华弦集》听起 ↗</a></div><div class="quick-listening-tracks"></div>';
  [
    ['song-fishing','丰收渔歌'],
    ['song-thunder','旱天雷'],
    ['song-rising','步步高'],
    ['song-kapok','木棉盛开时']
  ].forEach(([id,title],index)=>{
    const button=document.createElement('button');
    button.type='button';button.className='quick-listening-track';button.dataset.quickWork=id;
    button.setAttribute('aria-label','播放《'+title+'》完整录音');
    button.innerHTML='<span class="quick-track-number">'+String(index+1).padStart(2,'0')+'</span><span class="quick-track-title">'+title+'</span><span class="quick-track-play" aria-hidden="true">↗</span>';
    quickListening.querySelector('.quick-listening-tracks').append(button);
  });
  homeHeader.after(quickListening);
  [
    [note,'01 / 项目源起','为什么从岭南开始？','我的演奏和老师的启发，是这张地图最先亮起的地方。'],
    [process,'02 / 策展手记','展览背后 · 策展手记','从交通入口到声音与画面，看看这次策展如何形成。']
  ].forEach(([details,index,title,description])=>{
    details.querySelector('summary').innerHTML='<span class="layer-note-index">'+index+'</span><span class="layer-note-title">'+title+'</span><span class="layer-note-description">'+description+'</span><span class="layer-note-symbol" aria-hidden="true">＋</span>';
  });
  const homeIntro=homeHeader.querySelector('.intro');
  homeIntro.textContent='从我演奏的岭南作品出发，听见更多地方的小提琴音乐。这张地图，会随着作品慢慢生长。';
  homeHeader.querySelector('.curation-actions').remove();
  const mapHint=map.querySelector('.map-hint');
  mapHint.textContent='选择地图上的作品，或者从第一章开始。';
  map.querySelectorAll('.map-directions button').forEach((button,index)=>{
    const label=['岭南 · 第一站','东北','西北','西南'][index]||button.textContent;
    button.innerHTML='<span class="map-direction-number" aria-hidden="true">'+String(index+1).padStart(2,'0')+'</span><span>'+label+'</span>';
  });
  lobby.querySelector('.chapter-kicker').textContent='第一章 · 岭南';
  lobby.querySelector('h2').textContent='从岭南出发';
  lobby.querySelector('p').textContent='四首作品 · 梁珏童演奏';
  const invitationArt=document.createElement('div');invitationArt.className='invitation-art';
  invitationArt.innerHTML='<img class="invitation-image" src="8-kapok.jpg" alt="木棉与城市的 AI 生成视觉意象，并非实景"><span class="invitation-art-caption">木棉与城市 · AI 生成视觉意象</span>';
  lobby.querySelector('.invitation-image').replaceWith(invitationArt);
  const byline=document.createElement('div');byline.className='curator-byline';
  byline.innerHTML='<button type="button" class="curator-motion" aria-label="播放梁珏童的无声演奏片段" aria-pressed="false"><img src="teona-fishing-poster.jpg" alt=""><video src="teona-fishing-preview.mp4" poster="teona-fishing-poster.jpg" muted loop playsinline preload="none" aria-hidden="true"></video><span aria-hidden="true" class="curator-motion-icon">▶</span></button><div class="curator-byline-text"><small>策展 · 演奏</small><strong>梁珏童</strong><span>实拍演奏 · 无声片段</span><a href="#work/song-fishing">查看完整演奏 ↗</a></div>';
  lobby.querySelector('.invitation-copy p').after(byline);
  const previewButton=byline.querySelector('button'),performanceVideo=byline.querySelector('video'),previewIcon=byline.querySelector('.curator-motion-icon');
  performanceVideo.muted=true;performanceVideo.defaultMuted=true;
  const pausePreview=()=>{performanceVideo.pause();previewButton.classList.remove('is-playing');previewButton.setAttribute('aria-pressed','false');previewButton.setAttribute('aria-label','播放梁珏童的无声演奏片段');previewIcon.textContent='▶';};
  const playPreview=()=>performanceVideo.play().then(()=>{previewButton.classList.add('is-playing');previewButton.setAttribute('aria-pressed','true');previewButton.setAttribute('aria-label','暂停梁珏童的无声演奏片段');previewIcon.textContent='Ⅱ';}).catch(pausePreview);
  previewButton.addEventListener('click',()=>performanceVideo.paused?playPreview():pausePreview());
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const compactScreen=window.matchMedia('(max-width: 700px)');
  if('IntersectionObserver' in window){
    new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting&&!reducedMotion.matches&&!compactScreen.matches)playPreview();
      else pausePreview();
    }),{threshold:.45}).observe(previewButton);
  }
  lobby.querySelector('[data-listen-lingnan]').textContent='走进第一章 ↗';
  lobby.querySelector('.invitation-copy>a').textContent='也可以选择一条抵达路线 →';
  lobby.querySelector('.guest-invitation small').textContent='特别展 · 李泽熙';
  lobby.querySelector('.guest-invitation span>span').textContent='四首授权作品 ↗';
  lobby.querySelector('.join-invitation small').textContent='了解这张地图的下一章 ↗';
  lingnan.append(journey,chapter);
  journey.open=true;
  chapter.hidden=true;
  const skipTop=document.createElement('div');skipTop.className='layer-skip-row';
  skipTop.append(document.getElementById('skip-arrival'));
  journey.querySelector('.arrival-heading-row').after(skipTop);
  chapter.querySelector('h2').textContent='四首岭南作品';
  chapter.querySelector('.chapter-credit').textContent='任选一首聆听';
  journey.querySelector('summary span').textContent='先走一段路，再听音乐';
  journey.querySelector('summary small').textContent='飞机 · 高铁 · 地铁 · 船　可选 ↗';
  chapter.querySelectorAll('.piece-arrow').forEach(el=>el.textContent='聆听 ↗');
  extension.querySelector('.guest-heading p').textContent='老师李泽熙的《华弦集》启发了这张地图。这里收录她授权的四首作品，作曲与演奏均由她完成。';
  extension.querySelector('.chapter-kicker').textContent='特别展 · 李泽熙';
  extension.querySelector('.filter-bar')?.remove();
  guest.append(extension);
  guest.insertAdjacentHTML('beforeend','<div class="layer-next-invitation"><p>从老师的作品回到我的第一章</p><a href="#lingnan">去听岭南篇 →</a></div>');
  contribute.innerHTML='<div class="layer-page-heading"><span class="layer-eyebrow">下一章 · 一张仍在生长的地图</span><h1>共同点亮</h1><p>我希望未来能有更多演奏者，带着作品、录音与地域线索来到这里。</p></div>';
  contribute.append(contribution);
  const prototype=document.getElementById('contribution-prototype');
  prototype.open=false;
  postcard.innerHTML='<div class="layer-page-heading"><span class="layer-eyebrow">听后回声</span><h1>留下一句话</h1><p>如果某一首作品让你想起了什么，可以把这句话留在一张明信片上。</p></div>';
  postcard.append(document.getElementById('echo-postcard'));
  const focus=document.createElement('div');focus.className='layer-work-focus';
  workPage.innerHTML='<nav class="layer-work-breadcrumb"><a id="layer-work-back" href="#lingnan">← 返回岭南篇</a><span id="layer-work-count"></span></nav>';
  workPage.append(focus);
  const workFooter=document.createElement('nav');workFooter.className='layer-work-footer';
  workFooter.innerHTML='<button type="button" id="layer-prev">← 上一首</button><a href="#postcard">写一张声音明信片 ↗</a><button type="button" id="layer-next">下一首 →</button>';
  workPage.append(workFooter);
  const cards=[...document.querySelectorAll('.card')];
  cards.forEach(card=>{
    const body=card.querySelector('.body'),title=card.querySelector('h3'),credit=card.querySelector('.work-credit'),player=card.querySelector('.exhibit-player'),audio=card.querySelector('audio');
    const heading=document.createElement('div'),listening=document.createElement('div');
    heading.className='work-story-heading';listening.className='work-story-listening';
    [body.querySelector('.work-index'),body.querySelector('.region'),title,body.querySelector('.en-title'),credit].filter(Boolean).forEach(el=>heading.append(el));
    [player,audio,body.querySelector('.zh'),body.querySelector('.en'),body.querySelector('.listening-cue'),body.querySelector('.culture-toggle'),body.querySelector('.culture-box')].filter(Boolean).forEach(el=>listening.append(el));
    body.replaceChildren(heading,listening);
  });
  const own=['song-fishing','song-thunder','song-rising','song-kapok'];
  const teacher=['song-zandale','song-changbai','song-kashgar','song-erhai'];
  const performanceMedia={
    'song-fishing':['performance-fishing.mp4','teona-fishing-poster.jpg','丰收渔歌'],
    'song-thunder':['performance-thunder.mp4','performance-thunder-poster.jpg','旱天雷'],
    'song-rising':['performance-rising.mp4','performance-rising-poster.jpg','步步高'],
    'song-kapok':['performance-kapok.mp4','performance-kapok-poster.jpg','木棉盛开时']
  };
  own.forEach(id=>{
    const card=document.getElementById(id),box=card.querySelector('.imgbox'),audio=card.querySelector('audio');
    const [source,poster,title]=performanceMedia[id];
    const panel=document.createElement('div');panel.className='performance-video-panel';
    const video=document.createElement('video');video.className='performance-recording';video.src=source;video.poster=poster;video.preload='none';video.playsInline=true;video.muted=true;video.defaultMuted=true;
    video.setAttribute('aria-label',title+' · 梁珏童完整演奏录像');
    const caption=document.createElement('span');caption.className='performance-video-credit';caption.textContent='梁珏童演奏 · 完整实拍录像';
    const controls=document.createElement('div');controls.className='performance-video-controls';
    const play=document.createElement('button');play.type='button';play.className='performance-video-play';play.textContent='播放完整演奏';
    const seek=document.createElement('input');seek.type='range';seek.className='performance-video-seek';seek.min='0';seek.max='1000';seek.value='0';seek.setAttribute('aria-label','演奏视频进度');
    const time=document.createElement('span');time.className='performance-video-time';time.textContent='0:00 / —:—';
    controls.append(play,seek,time);panel.append(video,caption,controls);box.append(panel);
    const formatTime=seconds=>{const n=Math.floor(Number.isFinite(seconds)?seconds:0);return Math.floor(n/60)+':'+String(n%60).padStart(2,'0');};
    const duration=()=>Number.isFinite(audio.duration)&&audio.duration>0?audio.duration:video.duration;
    const updateVideo=()=>{
      const total=duration();
      seek.value=total?String(Math.round(audio.currentTime/total*1000)):'0';
      time.textContent=formatTime(audio.currentTime)+' / '+(total?formatTime(total):'—:—');
      play.textContent=audio.paused?'播放完整演奏':'暂停演奏';
      play.dataset.playing=String(!audio.paused);
    };
    const alignVideo=()=>{
      if(video.readyState<1)return;
      if(Math.abs(video.currentTime-audio.currentTime)>.12)video.currentTime=Math.min(audio.currentTime,video.duration||audio.currentTime);
    };
    const followAudio=()=>{
      if(!card.classList.contains('video-flipped'))return;
      alignVideo();
      if(audio.paused)video.pause();
      else if(video.paused)video.play().catch(()=>{});
    };
    play.addEventListener('click',()=>{if(audio.paused)audio.play().catch(()=>{play.textContent='录音暂时无法播放';});else audio.pause();});
    seek.addEventListener('input',()=>{if(duration()){audio.currentTime=Number(seek.value)/1000*duration();alignVideo();updateVideo();}});
    video.addEventListener('loadedmetadata',()=>{followAudio();updateVideo();});
    audio.addEventListener('loadedmetadata',updateVideo);
    audio.addEventListener('play',()=>{updateVideo();followAudio();});
    audio.addEventListener('pause',()=>{video.pause();updateVideo();});
    audio.addEventListener('ended',()=>{video.pause();updateVideo();});
    audio.addEventListener('timeupdate',()=>{updateVideo();if(card.classList.contains('video-flipped'))alignVideo();});
    audio.addEventListener('seeked',()=>{updateVideo();if(card.classList.contains('video-flipped'))alignVideo();});
    const flip=document.createElement('button');flip.type='button';flip.className='performance-flip';flip.setAttribute('aria-pressed','false');flip.textContent='翻面 · 看完整演奏';box.append(flip);
    box.querySelector('.sound-only')?.classList.add('sound-impression-secondary');
    flip.addEventListener('click',()=>{
      if(card.classList.contains('sound-focused'))box.querySelector('.sound-only')?.click();
      const flipped=card.classList.toggle('video-flipped');
      flip.setAttribute('aria-pressed',String(flipped));flip.textContent=flipped?'翻回 · 作品画面':'翻面 · 看完整演奏';
      if(flipped){
        if(video.readyState<1)video.load();
        else followAudio();
      }else video.pause();
    });
  });
  window.revealLingnanWorks=()=>{
    window.lingnanUnlocked=true;
    chapter.hidden=false;
    route('lingnan');
    requestAnimationFrame(()=>chapter.scrollIntoView({behavior:'smooth',block:'start'}));
  };
  let current=null,workOrigin=null;
  const stops=new Map(cards.map(card=>{const marker=document.createComment(card.id+' home');card.before(marker);return [card.id,marker];}));
  const pauseAll=()=>{document.querySelectorAll('audio').forEach(a=>a.pause());document.querySelectorAll('.performance-recording').forEach(v=>v.pause());};
  const restore=()=>{if(current){current.querySelector('.performance-recording')?.pause();current.classList.remove('video-flipped');const flip=current.querySelector('.performance-flip');if(flip){flip.setAttribute('aria-pressed','false');flip.textContent='翻面 · 看完整演奏';}stops.get(current.id).after(current);current=null;}};
  const route=(name)=>{location.hash=name; if(location.hash==='#'+name)showRoute();};
  const openWork=(id)=>{
    const card=document.getElementById(id);
    if(!card)return;
    const from=decodeURIComponent(location.hash.slice(1));
    if(!from.startsWith('work/'))workOrigin=['lingnan','city-game','chapter-listening'].includes(from)?'chapter-listening':from==='huaxian'||from==='extended-listening'?'huaxian':'home';
    else if(!workOrigin)workOrigin=card.dataset.region==='岭南'?'home':'huaxian';
    pauseAll();restore();
    current=card;focus.append(card);card.classList.remove('hide');card.classList.add('show');
    card.querySelector('.imgbox img').loading='eager';
    const sequence=card.dataset.region==='岭南'?own:teacher,index=sequence.indexOf(id);
    document.getElementById('layer-work-back').href='#'+workOrigin;
    document.getElementById('layer-work-back').textContent=workOrigin==='home'?'← 返回地图':workOrigin==='chapter-listening'?'← 返回岭南作品':'← 华弦集';
    document.getElementById('layer-work-count').textContent=String(index+1).padStart(2,'0')+' / '+String(sequence.length).padStart(2,'0');
    const prev=document.getElementById('layer-prev'),next=document.getElementById('layer-next');
    prev.disabled=index===0;next.disabled=false;
    next.textContent=index===sequence.length-1
      ?(card.dataset.region==='岭南'?'继续听《华弦集》 →':'回到展览地图 →')
      :'下一首 →';
    prev.onclick=()=>route('work/'+sequence[index-1]);
    next.onclick=()=>route(index===sequence.length-1
      ?(card.dataset.region==='岭南'?'huaxian':'home')
      :'work/'+sequence[index+1]);
    route('work/'+id);
  };
  byline.querySelector('a').addEventListener('click',event=>{
    event.preventDefault();
    pausePreview();
    openWork('song-fishing');
    document.querySelector('#song-fishing .performance-flip')?.click();
    document.querySelector('#song-fishing .performance-video-play')?.click();
  });
  quickListening.addEventListener('click',event=>{
    const button=event.target.closest('[data-quick-work]');
    if(!button)return;
    const id=button.dataset.quickWork;
    openWork(id);
    const audio=document.getElementById(id)?.querySelector('audio');
    if(!audio)return;
    const status=document.getElementById(id).querySelector('.player-status');
    status.textContent='正在载入录音…';
    audio.play().then(()=>{status.textContent='';}).catch(()=>{status.textContent='暂时无法播放，请点击作品页的播放键重试。';});
  });
  window.openExhibition=(region='all',songId)=>{
    if(region==='岭南'&&!window.lingnanUnlocked){route('lingnan');return;}
    const first=region==='岭南'?own[0]:region==='西北'?teacher[2]:region==='西南'?teacher[3]:teacher[0];
    openWork(songId||first);
  };
  lobby.querySelector('[data-listen-lingnan]').addEventListener('click',(event)=>{event.stopImmediatePropagation();route('lingnan');},true);
  const nav=document.createElement('nav');nav.className='layer-nav';nav.setAttribute('aria-label','展览章节');
  nav.innerHTML='<a href="#home"><i aria-hidden="true">01</i><span>地图</span></a><a href="#lingnan"><i aria-hidden="true">02</i><span>岭南</span></a><a href="#huaxian"><i aria-hidden="true">03</i><span>华弦集</span></a><a href="#contribute"><i aria-hidden="true">04</i><span>共建</span></a>';
  document.querySelector('.language-bar').after(nav);
  const visible={home,lingnan,work:workPage,huaxian:guest,contribute,postcard};
  let previousView=null;
  function showRoute(){
    const hash=decodeURIComponent(location.hash.slice(1));
    let id=hash.split('/')[0],anchor='';
    if(hash==='city-game'){id='lingnan';anchor='city-game';journey.open=true;}
    else if(hash==='chapter-listening'){id='lingnan';anchor='chapter-listening';}
    else if(hash==='extended-listening'){id='huaxian';}
    else if(hash==='echo-postcard'){id='postcard';}
    else if(hash==='project-origin'||hash==='process-authorship'){id='home';anchor=hash;document.getElementById(hash).closest('details').open=true;}
    else if(hash==='room-lobby'||hash==='map-section'||!hash)id='home';
    if(!visible[id])id='home';
    if(id==='lingnan'){
      journey.open=true;
      if(hash==='chapter-listening'){window.lingnanUnlocked=true;chapter.hidden=false;}
      else if(previousView!=='lingnan'&&previousView!=='work'){
        window.lingnanUnlocked=false;chapter.hidden=true;
        document.getElementById('reset-sound-walk').click();
      }
    }
    else if(id!=='work')window.lingnanUnlocked=false;
    if(id==='work'){
      const cardId=hash.slice(5);
      if(!cards.some(card=>card.id===cardId)){route('home');return;}
      if(!current||current.id!==cardId){openWork(cardId);return;}
    } else {pauseAll();restore();}
    Object.entries(visible).forEach(([key,el])=>el.hidden=key!==id);
    nav.querySelectorAll('a').forEach(a=>a.setAttribute('aria-current',String(a.hash==='#'+id||(id==='work'&&a.hash===(current?.dataset.region==='岭南'?'#lingnan':'#huaxian')))));
    document.body.classList.toggle('layer-work-active',id==='work');
    if(id==='postcard')document.getElementById('echo-postcard').classList.remove('lingnan-locked');
    if(id==='home')requestAnimationFrame(()=>{if(window.chart)window.chart.resize();});
    window.scrollTo(0,0);
    if(anchor)requestAnimationFrame(()=>document.getElementById(anchor)?.scrollIntoView({block:'start'}));
    previousView=id;
  }
  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-open-postcard],.shelf-postcard');
    if(target){event.preventDefault();event.stopPropagation();route('postcard');}
  },true);
  window.addEventListener('hashchange',showRoute);
  if(['#room-lobby','#map-section'].includes(location.hash))history.replaceState(null,'','#home');
  showRoute();
  document.body.classList.add('layered-ready');
})();
