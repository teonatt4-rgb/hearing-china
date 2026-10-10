/* One language at a time. Original text is retained; visitor input is never translated. */
(() => {
  'use strict';
  const normal = value => String(value).replace(/\s+/g, ' ').trim();
  const english = new Map(Object.entries(window.SITE_LOCALES.en).map(([k,v]) => [normal(k),v]));
  const chinese = new Map(Object.entries(window.SITE_LOCALES.zh).map(([k,v]) => [normal(k),v]));
  const originals = new WeakMap(), attributes = new WeakMap();
  const skip = 'script,style,textarea,select,option,.locale-secondary,.header-seal,.footer-seal,.side-seal,.arrival-seal,.transport-defs,[data-visitor-content]';
  const secondary = '.en,.en-title,.cul-en,.en-intro,.byline-en,.curation-english,.section-sub > span,.game-sub > span,footer > span,.final-credit > span:last-child,.landmark-subtitle,#ps-title small';
  function pair(base,translation) {
    if (base && translation) english.set(normal(base.textContent),normal(translation.textContent));
  }
  document.querySelectorAll('.card').forEach(card => {
    pair(card.querySelector('.zh'),card.querySelector('.en'));
    pair(card.querySelector('.cul-zh'),card.querySelector('.cul-en'));
    const title=card.querySelector('h3'), en=card.querySelector('.en-title');
    if(title && en) {
      const node=Array.from(title.childNodes).find(n=>n.nodeType===3 && normal(n.textContent));
      if(node && !english.has(normal(node.textContent))) english.set(normal(node.textContent),normal(en.textContent));
    }
  });
  document.querySelectorAll('[data-en]').forEach(el=> {
    if (!el.matches('.souvenir-chip')) english.set(normal(el.textContent),el.dataset.en);
  });
  document.querySelectorAll('.clabel').forEach(el=>{
    const parts=el.textContent.split(' ｜ ');
    if(parts.length===2){english.set(normal(el.textContent),parts[1]);chinese.set(normal(el.textContent),parts[0]);}
  });
  function traditional(text) {
    return Array.from(text,c=>window.SITE_TRADITIONAL[c]||c).join('')
      .replace(/[云么并余后于里]/g,c=>({'云':'雲','么':'麼','并':'並','余':'餘','后':'後','于':'於','里':'裡'}[c]))
      .replace(/制作/g,'製作').replace(/聯系/g,'聯繫').replace(/關系/g,'關係')
      .replace(/采集/g,'採集').replace(/采用/g,'採用').replace(/冷面/g,'冷麵').replace(/松弛/g,'鬆弛').replace(/後臺/g,'後台');
  }
  function translate(value) {
    const key=normal(value);
    if(!key) return value;
    let answer;
    if(window.siteLanguage==='en') {
      answer=english.get(key);
      if(answer===undefined && /^[＋+−-] /.test(key)) {
        const inner=key.slice(2), parts=inner.split(' / ');
        answer=key.slice(0,2)+(english.get(inner)||parts[1]||english.get(parts[0])||inner);
      }
      if(answer===undefined) answer=value;
    } else {
      answer=chinese.get(key)||value;
      if(window.siteLanguage==='zh-Hant') answer=traditional(answer);
    }
    return answer;
  }
  window.siteText=translate;
  function textNode(node) {
    if(!node.parentElement || node.parentElement.closest(skip)) return;
    let record=originals.get(node);
    if(!record || node.nodeValue!==record.last) record={source:node.nodeValue,last:node.nodeValue};
    const result=translate(record.source);
    if(node.nodeValue!==result) node.nodeValue=result;
    record.last=result; originals.set(node,record);
  }
  function attribute(el,name) {
    let record=attributes.get(el)||{};
    const value=el.getAttribute(name);
    if(value===null) return;
    if(!record[name] || value!==record[name].last) record[name]={source:value,last:value};
    const result=translate(record[name].source);
    if(value!==result) el.setAttribute(name,result);
    record[name].last=result;attributes.set(el,record);
  }
  let pending=false;
  const observer=new MutationObserver(records=> {
    if(records.every(record=>(record.target.nodeType===1?record.target:record.target.parentElement)?.closest('[data-no-locale]')))return;
    if(!pending){pending=true;queueMicrotask(()=>{pending=false;render();});}
  });
  function render() {
    observer.disconnect();
    document.querySelectorAll(secondary).forEach(el=>el.classList.add('locale-secondary'));
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) textNode(walker.currentNode);
    document.querySelectorAll('[placeholder],[aria-label],[alt],[title]').forEach(el=> {
      if(el.closest('.locale-secondary,[data-visitor-content]'))return;
      ['placeholder','aria-label','alt','title'].forEach(name=>attribute(el,name));
    });
    observer.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','alt','title']});
  }
  const select=document.getElementById('site-language');
  function setLanguage(language) {
    window.siteLanguage=['zh-Hans','zh-Hant','en'].includes(language)?language:'zh-Hans';
    document.documentElement.lang=window.siteLanguage;
    select.value=window.siteLanguage;
    document.title=translate('听见中国')+' · '+translate('从岭南出发');
    render();
    try{localStorage.setItem('hearing-china-language',window.siteLanguage);}catch(_){}
    window.dispatchEvent(new CustomEvent('languagechange'));
  }
  select.addEventListener('change',()=>setLanguage(select.value));
  let initial='zh-Hans';try{initial=localStorage.getItem('hearing-china-language')||initial;}catch(_){}
  setLanguage(initial);
})();
