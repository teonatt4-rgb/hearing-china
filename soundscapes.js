/* Eight short, silent listening impressions. They are interpretations, not footage or a music visualiser. */
(() => {
  'use strict';
  const scenes={
    'song-fishing':{
      title:'水上的光',colors:['#233f48','#0d2831','#dfbd7f','#a9d4d0'],
      art:`<circle class="scene-shimmer" cx="585" cy="145" r="60" fill="var(--scene-accent)" opacity=".7"/>
        <g class="scene-flow" fill="none" stroke="var(--scene-ink)" stroke-width="3" opacity=".72">
          <path d="M-40 312 Q84 283 204 312 T444 312 T684 312 T924 312"/>
          <path d="M-60 350 Q64 321 184 350 T424 350 T664 350 T904 350"/>
          <path d="M-30 392 Q100 363 220 392 T460 392 T700 392 T940 392"/>
        </g><g class="scene-float" stroke="var(--scene-accent)" stroke-width="3" fill="none" stroke-linecap="round"><path d="M316 280 Q408 310 502 280 L475 304 Q404 326 342 304 Z"/><path d="M406 286 L406 216 M406 220 Q452 242 467 278"/></g>`
    },
    'song-thunder':{
      title:'雨与电光',colors:['#27394b','#17273b','#f3d59d','#b8cada'],
      art:`<g class="scene-float" fill="var(--scene-ink)" opacity=".17"><ellipse cx="325" cy="168" rx="126" ry="43"/><ellipse cx="449" cy="150" rx="156" ry="57"/><ellipse cx="564" cy="180" rx="110" ry="37"/></g>
        <g class="scene-rain" fill="none" stroke="var(--scene-ink)" stroke-width="3" stroke-linecap="round" opacity=".56"><path d="M185 255 l-15 42 M245 278 l-15 42 M320 246 l-15 42 M389 270 l-15 42 M475 253 l-15 42 M550 274 l-15 42 M626 250 l-15 42"/></g>
        <path class="scene-flash" d="M425 153 L379 246 L431 233 L394 349 L519 214 L459 226 L492 153" fill="none" stroke="var(--scene-accent)" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>`
    },
    'song-rising':{
      title:'向上的线',colors:['#3d3b47','#242b3b','#e8c783','#c9cbd6'],
      art:`<g class="scene-rise" fill="none" stroke="var(--scene-ink)" stroke-width="4" stroke-linecap="round" opacity=".76"><path d="M70 392 C185 382 227 343 284 324 S389 298 438 245 S543 214 595 173 S671 141 730 110"/><path d="M65 426 C186 412 249 379 300 351 S402 329 450 280 S575 236 618 204" opacity=".45"/></g>
        <g class="scene-pulse" fill="var(--scene-accent)"><circle cx="285" cy="324" r="11"/><circle cx="438" cy="245" r="14"/><circle cx="594" cy="173" r="17"/><circle cx="730" cy="110" r="20"/></g>`
    },
    'song-kapok':{
      title:'木棉轻落',colors:['#3c3f3a','#273632','#e6a888','#d7d9ba'],
      art:`<path d="M-20 100 C176 116 279 150 475 276 M180 127 Q239 84 312 65 M277 164 Q280 227 344 286" fill="none" stroke="var(--scene-ink)" stroke-width="8" stroke-linecap="round" opacity=".72"/>
        <g class="scene-float" fill="var(--scene-accent)" opacity=".9"><ellipse cx="297" cy="110" rx="32" ry="15" transform="rotate(-23 297 110)"/><ellipse cx="323" cy="127" rx="31" ry="15" transform="rotate(34 323 127)"/><ellipse cx="344" cy="184" rx="32" ry="15" transform="rotate(-34 344 184)"/><ellipse cx="374" cy="205" rx="30" ry="14" transform="rotate(28 374 205)"/></g>
        <g class="scene-fall" fill="var(--scene-accent)" opacity=".65"><ellipse cx="561" cy="246" rx="25" ry="11" transform="rotate(32 561 246)"/><ellipse cx="628" cy="316" rx="22" ry="10" transform="rotate(-26 628 316)"/><ellipse cx="488" cy="361" rx="17" ry="8" transform="rotate(18 488 361)"/></g>`
    },
    'song-zandale':{
      title:'远方的风',colors:['#414742','#283b39','#d9be8e','#cbd5b8'],
      art:`<circle class="scene-shimmer" cx="573" cy="156" r="58" fill="var(--scene-accent)" opacity=".58"/>
        <g class="scene-flow" fill="none" stroke="var(--scene-ink)" stroke-width="3" opacity=".7"><path d="M-35 343 C101 289 212 324 330 311 S559 281 835 326"/><path d="M-25 390 C127 346 220 376 341 363 S618 334 845 372"/></g>
        <g class="scene-sway" fill="none" stroke="var(--scene-ink)" stroke-width="3" stroke-linecap="round"><path d="M145 418 Q135 328 173 276 M190 414 Q198 321 232 263 M242 430 Q226 350 262 300 M695 430 Q705 348 742 284"/></g>`
    },
    'song-changbai':{
      title:'松影与雪',colors:['#294049','#172f38','#d8e2d9','#b9d4cc'],
      art:`<path d="M-25 362 L186 158 L307 277 L448 120 L616 299 L748 164 L835 292" fill="none" stroke="var(--scene-ink)" stroke-width="4" opacity=".72"/>
        <g class="scene-sway" fill="none" stroke="var(--scene-ink)" stroke-width="3" stroke-linecap="round"><path d="M215 401 L215 264 M168 321 L215 278 L263 321 M178 347 L215 310 L253 347 M660 408 L660 271 M615 326 L660 284 L705 326 M626 351 L660 314 L694 351"/></g>
        <g class="scene-fall" fill="var(--scene-accent)" opacity=".8"><circle cx="160" cy="135" r="4"/><circle cx="308" cy="170" r="3"/><circle cx="391" cy="89" r="4"/><circle cx="523" cy="190" r="3"/><circle cx="694" cy="118" r="4"/><circle cx="745" cy="239" r="3"/></g>`
    },
    'song-kashgar':{
      title:'夜空微光',colors:['#202c49','#111b35','#e9d6aa','#b6c9e0'],
      art:`<path d="M-15 376 Q192 319 390 359 T825 346" fill="none" stroke="var(--scene-ink)" stroke-width="3" opacity=".42"/>
        <g class="scene-shimmer" fill="var(--scene-accent)"><circle cx="149" cy="122" r="5"/><circle cx="230" cy="191" r="3"/><circle cx="322" cy="87" r="6"/><circle cx="465" cy="167" r="4"/><circle cx="563" cy="94" r="5"/><circle cx="655" cy="203" r="3"/><circle cx="739" cy="112" r="5"/></g>
        <g class="scene-pulse" fill="none" stroke="var(--scene-ink)" stroke-width="2" opacity=".6"><circle cx="520" cy="236" r="67"/><circle cx="520" cy="236" r="100" opacity=".45"/></g>`
    },
    'song-erhai':{
      title:'月下水纹',colors:['#244550','#18313e','#eed9ad','#b5d8d7'],
      art:`<circle class="scene-shimmer" cx="569" cy="145" r="60" fill="var(--scene-accent)" opacity=".76"/>
        <g class="scene-flow" fill="none" stroke="var(--scene-ink)" stroke-width="3" opacity=".74"><path d="M-35 316 Q84 290 204 316 T444 316 T684 316 T924 316"/><path d="M-35 365 Q84 339 204 365 T444 365 T684 365 T924 365"/><path d="M-35 417 Q84 391 204 417 T444 417 T684 417 T924 417"/></g>
        <g class="scene-float" fill="none" stroke="var(--scene-accent)" stroke-width="3" stroke-linecap="round"><path d="M274 286 Q356 305 438 286 L411 309 Q353 323 300 309 Z"/><path d="M351 291 L351 215 Q391 237 402 279"/></g>`
    }
  };
  document.querySelectorAll('.card').forEach(card=>{
    const scene=scenes[card.id],quiet=card.querySelector('.quiet-art');
    if(!scene||!quiet)return;
    quiet.style.setProperty('--scene-top',scene.colors[0]);
    quiet.style.setProperty('--scene-bottom',scene.colors[1]);
    quiet.style.setProperty('--scene-accent',scene.colors[2]);
    quiet.style.setProperty('--scene-ink',scene.colors[3]);
    quiet.innerHTML=`<svg class="scene-visual" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><circle class="scene-halo" cx="570" cy="150" r="170" fill="var(--scene-accent)" opacity=".09"/><path class="scene-string" d="M-80 452 Q200 399 420 438 T880 417" fill="none" stroke="var(--scene-ink)" stroke-width="1.5" opacity=".25"/>${scene.art}</svg><div class="scene-caption"><small>声音意象 · 无声循环</small><p>${scene.title}</p><span>画面是聆听联想，并非作品情节</span></div>`;
  });
})();
