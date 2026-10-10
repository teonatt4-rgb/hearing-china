/* Local-only contribution prototype: no network, storage or publication. */
(() => {
  'use strict';
  const guest = document.getElementById('collection-drawer');
  guest.addEventListener('toggle', () => {
    guest.querySelector('.collection-open').textContent=guest.open?'收起特邀单元 ↑':'展开四首作品 ↗';
    if (guest.open && guest.querySelector('#featured-collection').classList.contains('hide')) document.querySelector('.filter-btn[data-region="all"]').click();
  });
  document.querySelectorAll('[data-open-chapter]').forEach(button => button.addEventListener('click', () => document.getElementById('skip-arrival').click()));
  document.querySelectorAll('[data-open-postcard]').forEach(button => button.addEventListener('click', () => {
    document.getElementById('echo-postcard').classList.remove('lingnan-locked');
    document.getElementById('echo-postcard').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
    document.getElementById('echo-message').focus({preventScroll:true});
  }));
  const form = document.getElementById('contribution-form');
  const result = document.getElementById('contribution-result');
  const preview = document.getElementById('contribution-preview');
  const download = document.getElementById('contribution-download');
  let objectUrl;
  function clearResult() {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = undefined;
    download.removeAttribute('href');
    preview.replaceChildren();
    result.hidden = true;
  }
  form.addEventListener('input', clearResult);
  form.addEventListener('change', clearResult);
  form.addEventListener('reset', clearResult);
  form.addEventListener('submit', event => {
    event.preventDefault();
    clearResult();
    const data = new FormData(form);
    const fields = ['piece','credits','performer','region','context','permission'];
    const draft = {status:'local-draft-not-submitted'};
    for (const name of fields) {
      const input = form.elements.namedItem(name);
      input.setCustomValidity('');
      const value = String(data.get(name) || '').trim();
      if (!value) {input.setCustomValidity(window.siteText('请填写这一项，不要只输入空格。'));input.reportValidity();return;}
      draft[name] = value;
    }
    const file = form.elements.namedItem('recording').files[0];
    draft.recording = file ? {name:file.name,bytes:file.size,type:file.type} : null;
    draft.notice = '本地投稿草稿；未上传，未审核，未公开。录音仅记录文件名与元数据，文件本身未包含在此草稿中。';
    const labels = {piece:'作品',credits:'作曲／改编',performer:'演奏者',region:'关联地区',context:'地域联系',permission:'来源与许可'};
    function row(label, value, visitor=true) {const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;if(visitor)dd.dataset.visitorContent='';preview.append(dt,dd);return dd;}
    fields.forEach(name => row(labels[name],draft[name]));
    const fileRow=row('录音文件','',false);
    if(file){const name=document.createElement('span');name.dataset.visitorContent='';name.textContent=file.name;fileRow.append(name,document.createTextNode('（仅文件名；未上传）'));}
    else fileRow.textContent='尚未选择';
    objectUrl = URL.createObjectURL(new Blob([JSON.stringify(draft,null,2)],{type:'application/json;charset=utf-8'}));
    download.href = objectUrl;
    result.hidden = false;
    document.getElementById('contribution-status').textContent='草稿已生成，仅在本页显示；尚未提交或公开。';
  });
  form.querySelectorAll('input,textarea').forEach(input => input.addEventListener('input', () => input.setCustomValidity('')));
  window.addEventListener('pagehide', clearResult);
})();
