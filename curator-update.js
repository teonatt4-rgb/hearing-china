/* 2026-10 update: clearer homepage, Cantonese Voice in the Lingnan chapter,
   Beautiful Love as a city-listening extension, curator note and transport announcements.
   Runs after layers.js has built the chapter views. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);

  // ---- Video links: fill in after uploading (YouTube "unlisted" share link) ----
  const VIDEO = {
    yueyin: '',        // 粤音 完整影片
    beautifulLove: ''  // Beautiful Love 完整影片
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

  // ---- 2. Lingnan chapter opens with Cantonese Voice ----
  const chapter = $('#chapter-listening');
  if (chapter) {
    const yy = document.createElement('section');
    yy.className = 'cu-film cu-yueyin';
    yy.setAttribute('aria-label', '粤音');
    yy.innerHTML =
      '<img src="yueyin-poster.jpg" alt="《粤音》海报：一位小提琴手与紫色的“粤音”二字" loading="lazy">' +
      '<div class="cu-film-copy">' +
      '<span class="cu-kicker">岭南篇 · 粤音</span>' +
      '<h3>粤音 Cantonese Voice</h3>' +
      '<p>在你听这四首作品之前，这是我为什么要做这个展览。一部 8 分 30 秒的短片，用四首岭南小提琴作品，讲一个粤语女孩的出发、回归、再出发。粤语旁白，三语字幕。</p>' +
      '<p class="cu-credit">脚本 · 拍摄 · 剪辑 · 演奏：梁珏童</p>' +
      (VIDEO.yueyin ? '<a class="cu-film-link" href="' + VIDEO.yueyin + '" target="_blank" rel="noopener">观看完整影片 ↗</a>'
                    : '<span class="cu-film-link is-pending">完整影片仅随申请材料提供</span>') +
      '</div>';
    const heading = chapter.querySelector('.chapter-listening-heading');
    (heading || chapter.firstChild) ? (heading ? heading.after(yy) : chapter.prepend(yy)) : chapter.append(yy);
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
      '<img src="bl-cover.jpg" alt="动画《Beautiful Love》封面：广州西关骑楼街与斑马线" loading="lazy">' +
      '<div class="cu-film-copy">' +
      '<span class="cu-kicker">在城市里听 · 延伸作品</span>' +
      '<h3>Beautiful Love — Same City, Different Rhythms</h3>' +
      '<p>一部 2 分 47 秒的动画。女孩戴上耳机穿过广州西关，镜头渐渐停在店员、老人、推车的青年身上。她转过街角离开，镜头留在原地。改变的不是城市的节奏，而是我们感知它的方式。</p>' +
      '<p class="cu-credit">导演 · 编剧 · 分镜 · 小提琴：梁珏童 · 画面由 Seedance 2.0 生成</p>' +
      (VIDEO.beautifulLove ? '<a class="cu-film-link" href="' + VIDEO.beautifulLove + '" target="_blank" rel="noopener">观看影片 ↗</a>'
                           : '<span class="cu-film-link is-pending">完整影片仅随申请材料提供</span>') +
      '</div>';

    const curator = document.createElement('section');
    curator.className = 'cu-curator';
    curator.setAttribute('aria-label', '关于策展人');
    curator.innerHTML =
      '<img src="teona-fishing-poster.jpg" alt="梁珏童演奏《丰收渔歌》" loading="lazy">' +
      '<div><span class="cu-kicker">关于策展人</span><h3>梁珏童 Liang Juetong</h3>' +
      '<p>在广州长大的粤语小提琴演奏者，星海音乐学院爵士小提琴本科。这个展览的策展、设计与岭南篇演奏都由我完成。</p>' +
      '<p class="cu-credit">联系：3190902788@qq.com</p></div>';

    const notes = home.querySelector('.layer-note-grid');
    if (notes) { notes.before(bl); notes.after(curator); } else { home.append(bl, curator); }
  }

  // ---- 4. Transport announcements: synthesised ambience + curator's voice ----
  // Files go in this folder as announce-plane.mp3 / announce-rail.mp3 / announce-metro.mp3 / announce-boat.mp3
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
      r.source = '背景声为程序合成；广播由梁珏童录制（粤语 / 普通话 / English）';
      r.transcript = announce[key];
      r.pending = '交通广播 · 粤语 / 普通话 / English';
    });
    // If a file is missing, fall back to the silent journey quietly.
    Object.keys(announce).forEach(key => {
      fetch('announce-' + key + '.mp3', { method: 'HEAD' }).then(res => {
        if (!res.ok && routes[key]) { routes[key].file = ''; routes[key].pending = '广播录制中，当前为无声预览。'; }
      }).catch(() => {});
    });
  }
  const label = $('.broadcast-label');
  if (label) label.textContent = '交通广播 / ANNOUNCEMENT';
})();
