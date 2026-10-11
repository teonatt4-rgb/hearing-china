/* 2026-10 update: clearer homepage, Cantonese Voice trailer in the Lingnan chapter,
   Beautiful Love film, curator note, Hua Xian Ji filming stills (folded),
   transport announcements, and one-sound-at-a-time playback.
   Runs after layers.js has built the chapter views. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);

  const LINKS = {
    yueyinFull: 'https://youtu.be/07EZbPHOvIE',
    beautifulLove: 'https://youtu.be/SqWFoLmZcYE'
  };

  // ---- 1. Homepage: one-line purpose + three steps + three ways in ----
  const header = $('#layer-home > header') || $('.wrap > header');
  if (header) {
    const intro = header.querySelector('.intro');
    const purpose = document.createElement('div');
    purpose.className = 'cu-purpose';
    purpose.innerHTML =
      '<p class="cu-tagline">同一首曲子，可以有很多人的版本。</p>' +
      '<p class="cu-tagline-sub">这是一个从岭南出发的小提琴音乐策展。</p>' +
      '<ol class="cu-steps">' +
      '<li><b>01</b><span>选一种方式出发</span></li>' +
      '<li><b>02</b><span>听演奏，读笔记</span></li>' +
      '<li><b>03</b><span>带走一张声音明信片</span></li>' +
      '</ol>' +
      '<nav class="cu-ways" aria-label="选择参观方式">' +
      '<a class="cu-way cu-way-main" href="#city-game"><small>完整旅程</small><span>从出发开始 →</span></a>' +
      '<a class="cu-way" href="#chapter-listening"><small>只想听音乐</small><span>直接进入作品 →</span></a>' +
      '<a class="cu-way" href="#postcard"><small>只想玩一下</small><span>做一张声音明信片 →</span></a>' +
      '</nav>';
    if (intro) intro.after(purpose); else header.append(purpose);

    const why = document.createElement('p');
    why.className = 'cu-why';
    why.innerHTML = '<b>为什么从岭南开始？</b>因为我在这里长大，粤语是我的母语，我发表的论文分析的就是汕尾渔歌。岭南不是我选的题目，是我的来处。';
    purpose.after(why);
  }

  const filmVideo = (src, poster, label) =>
    '<video class="cu-video" controls playsinline preload="none" src="' + src + '" poster="' + poster + '" aria-label="' + label + '"></video>';

  // ---- 2. Lingnan chapter opens with the Cantonese Voice trailer ----
  const chapter = $('#chapter-listening');
  if (chapter) {
    const yy = document.createElement('section');
    yy.className = 'cu-film cu-yueyin';
    yy.setAttribute('aria-label', '粤音');
    yy.innerHTML =
      '<div class="cu-film-media">' + filmVideo('yueyin-trailer.mp4', 'yueyin-trailer-poster.jpg', '《粤音》预告片') + '</div>' +
      '<div class="cu-film-copy">' +
      '<span class="cu-kicker">岭南篇 · 粤音 · 预告片</span>' +
      '<h3>粤音 Cantonese Voice</h3>' +
      '<p>在你听这四首作品之前，这是我为什么要做这个展览。《粤音》是一部 8 分 30 秒的短片，用四首岭南小提琴作品，讲一个粤语女孩的出发、回归、再出发。粤语旁白，三语字幕。这里播放的是预告片，完整影片请到 YouTube 观看。</p>' +
      '<p class="cu-credit">脚本 · 拍摄 · 剪辑 · 演奏：梁珏童</p>' +
      '<a class="cu-film-link" href="' + LINKS.yueyinFull + '" target="_blank" rel="noopener">在 YouTube 观看完整影片 ↗</a>' +
      '<img class="cu-poster-thumb" src="yueyin-poster.jpg" alt="《粤音》海报" loading="lazy">' +
      '</div>';
    const heading = chapter.querySelector('.chapter-listening-heading');
    if (heading) heading.after(yy); else chapter.prepend(yy);
    const kicker = chapter.querySelector('.chapter-kicker');
    if (kicker) kicker.textContent = '第一章 · 岭南篇 · 粤音';
  }

  // ---- 3. Beautiful Love + curator note on the home view ----
  const home = $('#layer-home');
  if (home) {
    const bl = document.createElement('section');
    bl.className = 'cu-film cu-bl';
    bl.setAttribute('aria-label', 'Beautiful Love');
    bl.innerHTML =
      '<div class="cu-film-media">' + filmVideo('beautiful-love.mp4', 'bl-cover.jpg', 'Beautiful Love 动画') + '</div>' +
      '<div class="cu-film-copy">' +
      '<span class="cu-kicker">在城市里听 · 延伸作品</span>' +
      '<h3>Beautiful Love: Same City, Different Rhythms</h3>' +
      '<p>一部 2 分 47 秒的动画。女孩戴上耳机穿过广州西关，镜头渐渐停在店员、老人、推车的青年身上。她转过街角离开，镜头留在原地。改变的不是城市的节奏，而是我们感知它的方式。</p>' +
      '<p class="cu-credit">导演 · 编剧 · 分镜 · 小提琴：梁珏童 · 画面由 Seedance 2.0 生成</p>' +
      '<a class="cu-film-link" href="' + LINKS.beautifulLove + '" target="_blank" rel="noopener">在 YouTube 观看 ↗</a>' +
      '</div>';

    const curator = document.createElement('section');
    curator.className = 'cu-curator';
    curator.setAttribute('aria-label', '关于策展人');
    curator.innerHTML =
      '<img src="curator-portrait.jpg" alt="梁珏童在舞台上演奏小提琴" loading="lazy">' +
      '<div><span class="cu-kicker">关于策展人</span><h3>梁珏童 Liang Juetong</h3>' +
      '<p>在广州长大的粤语小提琴演奏者，星海音乐学院爵士小提琴本科。这个展览的策展、设计与岭南篇演奏都由我完成。</p>' +
      '<p class="cu-credit">联系：<a href="mailto:teonatt4@gmail.com">teonatt4@gmail.com</a></p></div>';

    const notes = home.querySelector('.layer-note-grid');
    if (notes) { notes.before(bl); notes.after(curator); } else { home.append(bl, curator); }
  }

  // ---- 4. Hua Xian Ji: filming stills, folded so only interested visitors open it ----
  const guestView = $('#layer-huaxian');
  if (guestView) {
    const stills = document.createElement('details');
    stills.className = 'cu-stills';
    stills.innerHTML =
      '<summary><span>幕后 · 我为《华弦集》拍摄的画面</span><small>展开看 4 张截图 ＋</small></summary>' +
      '<p>《华弦集》是李泽熙老师的一个创作与演奏项目，项目视频的拍摄与剪辑由我完成。这里收录的四首作品，录音来自这次拍摄。完整视频不在此公开。以下截图经李泽熙老师同意展示，只选取她本人的演奏画面。</p>' +
      '<div class="cu-stills-grid">' +
      [1, 2, 3, 4].map(i => '<img src="huaxian-still-' + i + '.jpg" alt="《华弦集》拍摄截图 ' + i + '：李泽熙演奏" loading="lazy">').join('') +
      '</div>' +
      '<p class="cu-credit">作曲与演奏：李泽熙 · 拍摄与剪辑：梁珏童</p>';
    const next = guestView.querySelector('.layer-next-invitation');
    if (next) next.before(stills); else guestView.append(stills);
  }

  // ---- 5. Transport announcements ----
  const announce = {
    plane: '各位旅客，我们即将抵达岭南。请回到座位，系好安全带。感谢您一路同行，欢迎来到岭南，一起聆听这里的声音。',
    rail: '各位旅客，列车即将驶入岭南。窗外是赤色的丹霞与青绿的山。请带好随身物品，准备下车。',
    metro: '下一站：岭南。岭南到了，请从左边车门下车。走出街巷，就是日常。',
    boat: '各位乘客，船即将靠岸。海风吹来，前方就是岭南。请扶好扶手，慢慢下船。欢迎回到岭南。'
  };
  const routes = window.arrivalRoutes;
  if (routes) {
    Object.keys(announce).forEach(key => {
      const r = routes[key];
      if (!r) return;
      r.file = 'announce-' + key + '.mp3';
      r.source = '广播由梁珏童录制（粤语 / 普通话 / English）';
      r.transcript = announce[key];
      r.pending = '交通广播 · 粤语 / 普通话 / English';
    });
  }
  const label = $('.broadcast-label');
  if (label) label.textContent = '交通广播 / ANNOUNCEMENT';

  // ---- 6. One sound at a time ----
  // Silent performance videos (.performance-recording, the muted curator preview) follow
  // their own audio and never count as a sound source.
  const isSilent = el => el.tagName === 'VIDEO' && (el.muted || el.classList.contains('performance-recording'));
  const stopOthers = source => {
    document.querySelectorAll('audio, video').forEach(el => {
      if (el !== source && !el.paused && !isSilent(el)) el.pause();
    });
  };
  document.addEventListener('play', event => {
    const el = event.target;
    if (!(el instanceof HTMLMediaElement) || isSilent(el)) return;
    stopOthers(el);
  }, true);

  // Leaving a view or hiding a film stops its playback.
  const stopHidden = () => {
    document.querySelectorAll('.cu-video').forEach(v => {
      if (!v.paused && !v.offsetParent) v.pause();
    });
  };
  window.addEventListener('hashchange', () => requestAnimationFrame(stopHidden));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) document.querySelectorAll('.cu-video').forEach(v => v.pause());
  });
})();

/* Work page: previous / next beside the counter, so a visitor can move on while watching. */
(() => {
  'use strict';
  const crumb = document.querySelector('.layer-work-breadcrumb');
  const count = document.getElementById('layer-work-count');
  const prev = document.getElementById('layer-prev'), next = document.getElementById('layer-next');
  if (!crumb || !count || !prev || !next) return;
  const nav = document.createElement('span');
  nav.className = 'cu-work-nav';
  const p = document.createElement('button'), n = document.createElement('button');
  p.type = n.type = 'button';
  p.textContent = '← 上一首'; n.textContent = '下一首 →';
  p.setAttribute('aria-label', '上一首作品'); n.setAttribute('aria-label', '下一首作品');
  count.replaceWith(nav);
  nav.append(p, count, n);
  p.addEventListener('click', () => prev.click());
  n.addEventListener('click', () => next.click());
  const sync = () => { p.disabled = prev.disabled; n.disabled = next.disabled; };
  new MutationObserver(sync).observe(prev, { attributes: true, attributeFilter: ['disabled'] });
  new MutationObserver(sync).observe(next, { attributes: true, attributeFilter: ['disabled'] });
  sync();
})();
