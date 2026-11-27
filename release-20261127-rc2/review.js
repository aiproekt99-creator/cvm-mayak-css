(()=>{'use strict';
const html=document.documentElement;
const state={design:'refined',icon:'first'};
const iconURL=new URL('ogonek-first.png',document.currentScript.src).href;
const savedRope=new WeakMap(),savedIcon=new WeakMap();let pending=false;
const approved=`<svg class="mayak-og-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 8V6a4 4 0 0 1 8 0v2M9 10h14l-2 15H11L9 10ZM8 26h16M12 10l1 15m7-15-1 15M16 13c-2 3-3 4-3 6a3 3 0 0 0 6 0c0-2-2-3-3-6ZM4 12l2 1m22-1-2 1M5 20l2-1m20 1-2-1"/></svg>`;
const line=`<svg class="mayak-og-icon mayak-v2-icon" viewBox="0 0 32 40" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="16" cy="5" r="3"/><path d="M16 8v3m-9 5 9-5 9 5H7Zm2 1 2 16h10l2-16M8 34h16m-17 3h18M12 17l1 16m7-16-1 16"/><path d="M16 20c1 3 3 5 3 7a3 3 0 0 1-6 0c0-2 2-4 3-7Z" fill="currentColor" stroke="none"/></svg>`;
function root(){return document.querySelector('#allrecords[data-tilda-project-id="44433709"]');}
function ensureHelper(r){
 if(state.design!=='refined')return;
 let trigger=r.querySelector('[data-v-ogonek]'), dialog=r.querySelector('#v-ogonek');
 const madeButton=!trigger, madeDialog=!dialog;
 if(!trigger){trigger=document.createElement('button');trigger.type='button';trigger.className='v-assistant mayak-v3-created';trigger.setAttribute('data-v-ogonek','');trigger.setAttribute('aria-label','Огонёк — проводник по центру');trigger.innerHTML=approved+'<span>Огонёк</span>';trigger.querySelector('svg').classList.remove('mayak-v2-icon');r.append(trigger);}
 if(!dialog){dialog=document.createElement('dialog');dialog.id='v-ogonek';dialog.className='v-dialog mayak-og-refined mayak-v3-created';dialog.setAttribute('aria-labelledby','mayak-v3-og-title');dialog.innerHTML='<div class="mayak-og-top">'+approved+'<h2 id="mayak-v3-og-title">Огонёк</h2><button type="button" data-v-close-ogonek aria-label="Закрыть Огонёк">×</button></div><p>Я помогу найти следующий шаг. Что вам сейчас ближе?</p><div class="mayak-og-choices"><a href="/support"><strong>Мне нужна поддержка</strong><small>Куратор, психолог и помощь</small></a><a href="/guidance"><strong>Не знаю, с чего начать</strong><small>Правовые и социальные ориентиры</small></a><a href="/growth"><strong>Хочу двигаться дальше</strong><small>Обучение и развитие</small></a><a href="/community"><strong>Хочу найти своих</strong><small>Встречи и сообщество</small></a></div><a class="mayak-og-human" href="https://forms.yandex.ru/u/6aecfc72902902b87259b830/">Написать сотрудникам центра ↗</a><p>Огонёк — навигатор по сайту, не чат и не экстренная служба. Для связи с сотрудниками откроется анкета.</p>';dialog.querySelector('svg').classList.remove('mayak-v2-icon');r.append(dialog);dialog.querySelector('[data-v-close-ogonek]').addEventListener('click',()=>dialog.close());}
 // Keep the native button handler when both elements already exist. Supply a fallback only for missing pieces.
 if((madeButton||madeDialog)&&!trigger.dataset.mqFallback){trigger.dataset.mqFallback='1';trigger.addEventListener('click',()=>{if(!dialog.open){try{dialog.showModal();}catch(e){}}});}
}
function setArtwork(r){if(r.dataset.tildaPageId==='415120609')return;const c=r.querySelector('#main-content .v-content');if(!c)return;c.classList.add('mayak-v3-art');if(!c.querySelector(':scope > .mayak-v3-backdrop')){const b=document.createElement('div');b.className='mayak-v3-backdrop';b.setAttribute('aria-hidden','true');const w=document.createElement('div');w.className='mayak-v3-window';w.setAttribute('aria-hidden','true');c.prepend(b,w);}}
function setIcons(r){r.querySelectorAll('[data-v-ogonek],#v-ogonek .mayak-og-top').forEach(host=>{
 const old=host.querySelector('.mayak-og-icon,.mayak-review-og-image');if(!old)return;
 if(!savedIcon.has(host)){if(old.tagName.toLowerCase()!=='svg'||old.classList.contains('mayak-v2-icon'))return;savedIcon.set(host,old.cloneNode(true));}
 if(old.dataset.mqIcon===state.icon)return;let replacement;
 if(state.icon==='original')replacement=savedIcon.get(host).cloneNode(true);
 else if(state.icon==='line'){const temp=document.createElement('template');temp.innerHTML=line;replacement=temp.content.firstElementChild;}
 else{replacement=document.createElement('img');replacement.src=iconURL;replacement.alt='';replacement.className='mayak-review-og-image';replacement.setAttribute('aria-hidden','true');}
 replacement.dataset.mqIcon=state.icon;old.replaceWith(replacement);
 });}
function setLayout(r){const main=r.querySelector('#main-content');if(!main)return;
 main.querySelectorAll('.v-layout,.v-inner > .review-panel').forEach(el=>{const legal=r.dataset.tildaPageId==='418810009'||el.querySelector('table,.v-table-wrap,#documents,iframe');const layout=el.matches('.v-layout');el.classList.toggle('mayak-review-narrow',!legal&&!el.matches('.support-compact-layout')&&(!layout||!!(el.querySelector('.v-side')&&el.querySelector('.v-body'))));});
 // Only short unboxed text immediately following the existing panel. Do not rewrite any text.
 main.querySelectorAll('.v-body > p,.v-inner > p,.v-layout + p').forEach(el=>el.classList.toggle('mayak-review-note',el.textContent.trim().length>0&&el.textContent.trim().length<500));
}
const observedGrids=new WeakSet();
const gridObserver=window.ResizeObserver?new ResizeObserver(entries=>{for(const e of entries){const el=e.target;el.classList.toggle('mq-single-grid',e.contentRect.width<590);}}):null;
function fitGrids(r){r.querySelectorAll('#main-content .mayak-v3-art .v-grid').forEach(el=>{if(!el.querySelector(':scope > .v-card'))return;el.classList.toggle('mq-single-grid',el.clientWidth<590);if(gridObserver&&!observedGrids.has(el)){observedGrids.add(el);gridObserver.observe(el);}});}
function measureHeader(r){const h=r.querySelector('.site-header');if(h){const box=h.getBoundingClientRect();r.style.setProperty('--mq-header',Math.round(Math.max(0,Math.min(box.bottom,box.height+24)))+'px');}}
function apply(){const r=root();html.classList.toggle('mayak-review-on',state.design==='refined');html.dataset.mayakIcon=state.icon;
 if(r){measureHeader(r);ensureHelper(r);setIcons(r);setLayout(r);setArtwork(r);fitGrids(r);r.querySelectorAll('.support-compact-layout').forEach(el=>el.classList.add('mayak-v4-support'));}
 }
function boot(){if(!root())return;apply();new MutationObserver(records=>{if(pending||!records.some(x=>[...x.addedNodes].some(n=>n.nodeType===1)))return;pending=true;requestAnimationFrame(()=>{pending=false;apply();});}).observe(document.body,{childList:true,subtree:true});window.addEventListener('resize',apply);const header=root()?.querySelector('.site-header');if(header&&window.ResizeObserver)new ResizeObserver(()=>{const r=root();if(r)measureHeader(r);}).observe(header);window.addEventListener('scroll',()=>{const r=root();if(r)measureHeader(r);},{passive:true});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

/* V7: reuse existing search on mobile. Fallback only when no native search was installed. */
(()=>{'use strict';
 const mq=matchMedia('(max-width:767px)'), html=document.documentElement;
 const routes=[['/support','Поддержка'],['/about','О нас'],['/partners','Партнёры'],['/events','Новости'],['/contacts','Контакты'],['/map','Все разделы'],['/support-appointment','Запись к руководителю психолог'],['/support-curator','Куратор'],['/support-hotlines','Горячие линии'],['/guidance','Ориентиры помощь'],['/growth','Развитие обучение'],['/community','Сообщество'],['/contacts-details','Реквизиты документы устав ЕГРЮЛ'],['/partners-volunteer','Стать волонтёром'],['/events-past','Прошедшие события'],['/events-upcoming','Анонсы мероприятий']];
 const root=()=>document.querySelector('#allrecords[data-tilda-project-id="44433709"]');
 const active=()=>mq.matches&&html.classList.contains('mayak-review-on');
 const normalize=s=>s.toLocaleLowerCase('ru').replace(/ё/g,'е').trim();
 let idle=0, raf=0, observer;
 const moved=new Map();let toolbar=null;
 function restoreToolbar(){for(const [node,marker] of moved){if(marker.isConnected)marker.replaceWith(node);}moved.clear();if(toolbar){toolbar.remove();toolbar=null;}}
 function arrangeToolbar(inner){
  const buttons=['.mayak-search-button','.theme-toggle','.nav-toggle'].map(sel=>inner.querySelector(sel));if(buttons.some(b=>!b))return;
  if(toolbar&&!toolbar.isConnected)restoreToolbar();
  if(!toolbar){toolbar=document.createElement('div');toolbar.className='mq-v8-tools mq-v7-only';inner.append(toolbar);}
  for(const b of buttons){if(b.parentNode===toolbar)continue;const marker=document.createComment('mayak mobile control');b.before(marker);moved.set(b,marker);toolbar.append(b);}
 }

 function closeMenu(r){const n=r.querySelector('#mobile-nav');if(n?.getAttribute('aria-hidden')==='false'){const b=n.querySelector('.mobile-nav-close');if(b)b.click();if(n.getAttribute('aria-hidden')==='false'){n.setAttribute('aria-hidden','true');r.querySelector('.nav-toggle')?.setAttribute('aria-expanded','false');document.body.classList.remove('mobile-nav-open');}}}
 function closeSearch(r){const p=r.querySelector('.mayak-search-panel');if(p&&!p.hidden){const b=r.querySelector('.mayak-search-button');if(b)b.click();if(!p.hidden){p.hidden=true;b?.setAttribute('aria-expanded','false');}}}
 function fallback(r,inner){
  if(inner.querySelector('.mayak-search-button')||inner.querySelector('.mayak-search-panel'))return;
  const b=document.createElement('button');b.type='button';b.className='mayak-search-button mq-v7-only';b.setAttribute('aria-label','Поиск по разделам сайта');b.setAttribute('aria-controls','mq-v7-search');b.setAttribute('aria-expanded','false');b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5" stroke-linecap="round"/></svg>';
  const p=document.createElement('div');p.id='mq-v7-search';p.className='mayak-search-panel mq-v7-only';p.hidden=true;p.innerHTML='<form class="header-search"><input type="search" aria-label="Что вы хотите найти?" placeholder="Что вы хотите найти?" autocomplete="off"></form><ul class="mayak-search-results" aria-live="polite"></ul>';
  const input=p.querySelector('input'), results=p.querySelector('ul');
  function render(){results.replaceChildren();const q=normalize(input.value);for(const [url,title] of routes.filter(x=>normalize(x[1]).includes(q))){const li=document.createElement('li'),a=document.createElement('a');a.href=url;a.textContent=title;li.append(a);results.append(li);}if(!results.children.length){const li=document.createElement('li');li.textContent='Раздел не найден. Попробуйте другой запрос.';results.append(li);}}
  function hide(){p.hidden=true;b.setAttribute('aria-expanded','false');}
  b.addEventListener('click',()=>{if(!p.hidden){hide();return;}closeMenu(r);p.hidden=false;b.setAttribute('aria-expanded','true');render();input.focus();});input.addEventListener('input',render);
  p.querySelector('form').addEventListener('submit',e=>{e.preventDefault();results.querySelector('a')?.click();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!p.hidden){hide();b.focus();}});
  document.addEventListener('click',e=>{if(!p.hidden&&!p.contains(e.target)&&!b.contains(e.target))hide();});
  const tools=inner.querySelector('.mayak-signature-tools');(tools||inner).append(b);inner.append(p);
 }
 function setup(){const r=root();if(!r)return;const inner=r.querySelector('.site-header .header-inner');if(!inner)return;
  if(!active()){restoreToolbar();r.classList.remove('mq-v7-overlay','mq-v7-compact');return;}
  if(inner.querySelector(".mayak-search-button:not(.mq-v7-only)")){inner.querySelectorAll(".mayak-search-button.mq-v7-only,.mayak-search-panel.mq-v7-only").forEach(x=>{const marker=moved.get(x);if(marker){marker.remove();moved.delete(x);}x.remove();});}
  fallback(r,inner);
  arrangeToolbar(inner);
  const b=inner.querySelector('.mayak-search-button'), p=inner.querySelector('.mayak-search-panel'), n=r.querySelector('#mobile-nav'), h=r.querySelector('[data-v-ogonek]');
  if(b&&p&&!p.querySelector('.mq-v7-search-top')){const top=document.createElement('div');top.className='mq-v7-search-top mq-v7-only';top.innerHTML='<b>Поиск по «Маяку»</b><button type="button" class="mq-v7-search-close" aria-label="Закрыть поиск">×</button>';top.querySelector('button').addEventListener('click',()=>{closeSearch(r);b.focus();});p.prepend(top);}
  if(h&&!h.querySelector('.mq-v7-og-label')){for(const child of [...h.childNodes]){if(child.nodeType===3&&child.textContent.trim()){const span=document.createElement('span');span.className='mq-v7-og-label';span.textContent=child.textContent;child.replaceWith(span);}else if(child.nodeType===1&&child.matches('span')&&child.textContent.trim()&&!child.querySelector('svg,img'))child.classList.add('mq-v7-og-label');}if(!h.hasAttribute('aria-label'))h.setAttribute('aria-label','Огонёк');}
  const top=Math.max(0,Math.round(r.querySelector('.site-header').getBoundingClientRect().bottom))+8;const vh=window.visualViewport?.height||window.innerHeight;r.style.setProperty('--mq-v7-search-top',top+'px');r.style.setProperty('--mq-v7-search-height',Math.max(100,Math.floor(vh-top-12))+'px');
  r.classList.toggle('mq-v7-overlay',!!(p&&!p.hidden||n?.getAttribute('aria-hidden')==='false'));
 }
 function schedule(){if(!raf)raf=requestAnimationFrame(()=>{raf=0;setup();});}
 function boot(){setup();const r=root();if(!r)return;
  observer=new MutationObserver(schedule);observer.observe(r,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','aria-hidden','aria-expanded']});new MutationObserver(schedule).observe(html,{attributes:true,attributeFilter:['class']});
  r.addEventListener('click',e=>{if(!active())return;const t=e.target.closest?.('button,a');if(!t)return;if(t.matches('.mayak-search-button'))closeMenu(r);else if(t.matches('.nav-toggle'))closeSearch(r);else if(t.closest('#mobile-nav')&&t.matches('a'))closeMenu(r);},true);
  window.addEventListener('scroll',()=>{if(!active())return;r.classList.add('mq-v7-compact');clearTimeout(idle);idle=setTimeout(()=>{if(active())r.classList.toggle('mq-v7-compact',window.scrollY>100);},350);schedule();},{passive:true});
  window.addEventListener('resize',schedule);window.visualViewport?.addEventListener('resize',schedule);mq.addEventListener('change',schedule);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

/* V9 — route-derived active menu and footer collision safety, mobile only. */
(()=>{'use strict';
 const mq=matchMedia('(max-width:767px)'), html=document.documentElement;
 const root=()=>document.querySelector('#allrecords[data-tilda-project-id="44433709"]');
 const sections=['/support','/about','/partners','/events','/contacts','/guidance','/growth','/community'];
 function path(s){try{return new URL(s,location.href).pathname.replace(/\.html$/i,'').replace(/\/$/,'')||'/';}catch(e){return '';}}
 function section(p){if(p==='/about-test')return '/about';return sections.find(s=>p===s||p.startsWith(s+'-')||p.startsWith(s+'/'))||'';}
 let frame=0;const originalCurrent=new WeakMap();
 function update(){frame=0;const r=root();if(!r)return;const enabled=mq.matches&&html.classList.contains('mayak-review-on');const links=[...r.querySelectorAll('#mobile-nav a')];
  const here=path(location.href), group=section(here);let chosen=null;
  if(enabled&&group)chosen=links.find(a=>!a.matches('.mobile-cta')&&path(a.getAttribute('href'))===here)||links.find(a=>!a.matches('.mobile-cta')&&path(a.getAttribute('href'))===group);
  for(const a of links){const yes=a===chosen;a.classList.toggle('mq-v9-current',yes);if(enabled){if(!originalCurrent.has(a))originalCurrent.set(a,a.getAttribute('aria-current'));if(yes){const v=path(a.getAttribute('href'))===here?'page':'location';if(a.getAttribute('aria-current')!==v)a.setAttribute('aria-current',v);}else if(a.hasAttribute('aria-current'))a.removeAttribute('aria-current');}else if(originalCurrent.has(a)){const old=originalCurrent.get(a);if(old===null)a.removeAttribute('aria-current');else a.setAttribute('aria-current',old);originalCurrent.delete(a);}}
  const h=r.querySelector('[data-v-ogonek]'),footer=r.querySelector('footer'),credits=footer?.querySelector('.site-credits');
  if(!enabled||!h||!credits){r.classList.remove('mq-v9-footer');r.style.removeProperty('--mq-v9-helper-bottom');return;}
  const vh=window.innerHeight, c=credits.getBoundingClientRect(), b=h.getBoundingClientRect();const base=12;let bottom=base;
  // Prefer the reserved space below the signature. If it is not yet visible, place the control above it.
  if(c.bottom>0&&c.top<vh&&b.right>c.left&&b.left<c.right&&vh-base-b.height<c.bottom+6&&vh-base>c.top-6){
   if(vh-c.bottom>=b.height+base+6)bottom=base;
   else if(c.top>b.height+72)bottom=Math.max(base,Math.ceil(vh-c.top+8));
  }
  r.style.setProperty('--mq-v9-helper-bottom',bottom+'px');r.classList.toggle('mq-v9-footer',c.top<vh&&c.bottom>0);
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(update);}
 function boot(){update();const r=root();if(!r)return;new MutationObserver(schedule).observe(r,{subtree:true,childList:true,attributes:true,attributeFilter:['href','aria-hidden']});new MutationObserver(schedule).observe(html,{attributes:true,attributeFilter:['class','data-theme']});window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);window.addEventListener('pageshow',schedule);window.addEventListener('popstate',schedule);mq.addEventListener('change',schedule);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

/* V10 — do not change consent state, move the existing floating controls only while they intersect. */
(()=>{'use strict';const html=document.documentElement;let frame=0, observed=null, resize;
function update(){frame=0;const b=document.getElementById('cookie-banner'),r=document.querySelector('#allrecords[data-tilda-project-id="44433709"]');if(!r)return;
 if(b!==observed&&resize){if(observed)resize.unobserve(observed);observed=b;if(b)resize.observe(b);}
 const open=!!(html.classList.contains('mayak-review-on')&&b&&!b.hidden&&b.getClientRects().length&&getComputedStyle(b).visibility!=='hidden');
 html.classList.toggle('mq-v10-cookie-open',open);
 if(!open){r.classList.remove('mq-v10-cookie-collision');html.style.removeProperty('--mq-v10-cookie-clear');return;}
 const c=b.getBoundingClientRect(),h=r.querySelector('[data-v-ogonek]'),vh=window.innerHeight;
 html.style.setProperty('--mq-v10-cookie-clear',Math.max(12,Math.ceil(vh-c.top+10))+'px');
 if(h){const a=h.getBoundingClientRect();r.classList.toggle('mq-v10-cookie-collision',a.left<c.right+8&&a.right>c.left-8);}
}
function schedule(){if(!frame)frame=requestAnimationFrame(update);}
function boot(){if(window.ResizeObserver)resize=new ResizeObserver(schedule);new MutationObserver(schedule).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden']});new MutationObserver(schedule).observe(html,{attributes:true,attributeFilter:['class','data-theme']});window.addEventListener('resize',schedule);window.visualViewport?.addEventListener('resize',schedule);schedule();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

/* RC2: route-derived selection in desktop navigation and the news tabs. */
(()=>{'use strict';
const groups=['/support','/about','/partners','/events','/contacts','/guidance','/growth','/community'];
const eventPaths=['/events','/events-past','/events-upcoming'];
function path(value){try{const u=new URL(value,location.href);if(u.origin!==location.origin&&!['cvm-mayak.ru','www.cvm-mayak.ru'].includes(u.hostname))return '';return u.pathname.replace(/\.html$/i,'').replace(/\/+$/,'')||'/';}catch(e){return '';}}
function group(p){return p==='/about-test'?'/about':groups.find(g=>p===g||p.startsWith(g+'-')||p.startsWith(g+'/'))||'';}
function pick(links,here,allowGroup){const candidates=links.filter(a=>groups.includes(path(a.getAttribute('href')))||eventPaths.includes(path(a.getAttribute('href'))));const chosen=candidates.find(a=>path(a.getAttribute('href'))===here)||(allowGroup?candidates.find(a=>path(a.getAttribute('href'))===group(here)):null);
 for(const a of candidates){const yes=a===chosen;a.classList.toggle('mq-rc2-current',yes);if(yes){const v=path(a.getAttribute('href'))===here?'page':'location';if(a.getAttribute('aria-current')!==v)a.setAttribute('aria-current',v);}else if(a.hasAttribute('aria-current'))a.removeAttribute('aria-current');}}
let frame=0;function update(){frame=0;const r=document.querySelector('#allrecords[data-tilda-project-id="44433709"]');if(!r||!document.documentElement.classList.contains('mayak-review-on'))return;const here=path(location.href);for(const n of r.querySelectorAll('.site-header .main-nav'))pick([...n.querySelectorAll('a[href]')],here,true);if(eventPaths.includes(here))for(const n of r.querySelectorAll('#main-content .v-tabs'))pick([...n.querySelectorAll('a[href]')].filter(a=>eventPaths.includes(path(a.getAttribute('href')))),here,false);}
function schedule(){if(!frame)frame=requestAnimationFrame(update);}
function boot(){update();const r=document.querySelector('#allrecords[data-tilda-project-id="44433709"]');if(r)new MutationObserver(schedule).observe(r,{subtree:true,childList:true,attributes:true,attributeFilter:['href']});window.addEventListener('pageshow',schedule);window.addEventListener('popstate',schedule);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();})();
