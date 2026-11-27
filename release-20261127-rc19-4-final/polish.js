/* RC19: run after RC17, only recognized existing controls/text; no forms or route changes. */
(()=>{'use strict';
function run(){const r=document.querySelector('#allrecords[data-tilda-project-id="44433709"].mayak-signature');if(!r)return;
const header=r.querySelector('.site-header .header-inner'),main=r.querySelector('#main-content');
if(header){const sub=header.querySelector('.logo-brand .brand-text small');if(sub&&sub.textContent.replace(/\s+/g,' ').trim().toLowerCase()==='центр взаимопомощи для женщин'&&!sub.children.length){const a=document.createElement('span'),b=document.createElement('span');a.textContent='Центр взаимопомощи';b.textContent='для женщин';sub.replaceChildren(a,b);}}
if(!main)return;const alias=r.dataset.tildaPageAlias||'';const norm=t=>t.replace(/\s+/g,' ').trim();
if(/^(partners|events|contacts|growth|guidance|support|community)(?:-|$)/.test(alias))for(const n of main.querySelectorAll('nav.mayak-fast-nav')){if(n.children.length===1&&n.firstElementChild.matches('a[href="/about"]')&&norm(n.textContent)==='О нас'){n.classList.add('mq19-duplicate-label');n.hidden=true;}}
if(!/^support(?:-hotlines)?$/.test(alias))return;
for(const e of main.querySelectorAll('p,span,small,strong,b,h2,h3,h4,a,div,dt,dd')){if(e.children.length)continue;const t=norm(e.textContent);
if(alias==='support'&&t==='Выберите, как вам удобнее обратиться. Мы поможем найти следующий шаг.')e.classList.add('mq19-intro');
if(alias==='support'&&t.toLowerCase()==='мы рядом')e.classList.add('mq19-eyebrow');
if(t==='Московская служба психологической помощи.'&&e.tagName!=='A')e.textContent='Справочный телефон Московской службы психологической помощи.';
const targets={'112':'tel:112','051':'tel:051','8495051':'tel:8495051','74991730909':'tel:+74991730909'};if(/^(112|051|8\s*\(495\)\s*051|\+7\s*\(499\)\s*173-09-09)$/.test(t)){e.classList.add('mq19-phone');const a=e.closest('a[href^="tel:"]');if(a)a.href=targets[t.replace(/\D/g,'')];}
}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else {if(document.readyState==='interactive')document.addEventListener('DOMContentLoaded',run,{once:true});else run();}
window.addEventListener('pageshow',run);
})();

/* RC19.1: move the original notice (never clone or change consent). Only support. */
(()=>{'use strict';
 function run(){const r=document.querySelector('#allrecords[data-tilda-project-id="44433709"][data-tilda-page-alias="support"].mayak-signature');if(!r)return;const lines=r.querySelector('#main-content .support-simple > .support-lines'),b=document.getElementById('cookie-banner');if(!lines||!b||!b.querySelector('[data-cookie-accept]'))return;b.classList.add('mq191-inline');r.classList.add('mq191-cookie-inline');if(lines.nextElementSibling!==b)lines.after(b);}
 if(document.readyState==='complete')run();else document.addEventListener('DOMContentLoaded',run,{once:true});window.addEventListener('pageshow',run);
})();

/* RC19.2: exact map page and existing nodes only; no generic link deletion. */
(()=>{'use strict';
function run(){const r=document.querySelector('#allrecords[data-tilda-project-id="44433709"][data-tilda-page-id="418820809"][data-tilda-page-alias="map"]');if(!r)return;
const m=r.querySelector('#main-content');if(!m)return;const norm=s=>s.replace(/\s+/g,' ').trim();
function hide(e){e.classList.add('mq192-map-redundant');e.hidden=true;}
for(const n of m.querySelectorAll('nav.mayak-fast-nav'))if(n.children.length===1&&n.firstElementChild.matches('a[href="/about"]')&&norm(n.textContent)==='О нас')hide(n);
const crumbs=m.querySelector('.v-crumbs');if(!crumbs||!crumbs.querySelector('a[href="/"]')||norm(crumbs.querySelector('[aria-current="page"]')?.textContent||'')!=='Все разделы')return;
for(const a of crumbs.querySelectorAll('a.mayak-map-shortcut[href="/map"]')){const sep=a.nextElementSibling;if(norm(a.textContent)==='Все разделы'&&sep?.tagName==='SPAN'&&sep.getAttribute('aria-hidden')==='true'&&norm(sep.textContent)==='·'){hide(a);hide(sep);}}
}
if(document.readyState==='loading'||document.readyState==='interactive')document.addEventListener('DOMContentLoaded',run,{once:true});else run();window.addEventListener('pageshow',run);
})();

/* RC19.4: preserve four labels and add the hint to the existing panorama, only when content is below the fold. */
(()=>{'use strict';
const mobile=matchMedia('(max-width:767px)'),reduce=matchMedia('(prefers-reduced-motion:reduce)');let frame=0;
function run(){const r=document.querySelector('#allrecords[data-tilda-project-id="44433709"].mayak-signature'),m=r?.querySelector('#main-content');if(!m)return;
if(r.dataset.tildaPageAlias==='support')for(const e of m.querySelectorAll('.mayak-support-section > .mayak-section-eyebrow'))if(['мы рядом','форматы поддержки','порядок обращения','важно знать'].includes(e.textContent.trim().toLowerCase()))e.classList.add('mq193-eyebrow');
const home=r.dataset.tildaPageId==='415120609',parent=m.querySelector(home?'.hero':'.v-content.mayak-v3-art'),inner=parent?.querySelector(home?':scope > .hero-inner':':scope > .v-inner'),art=parent?.querySelector(home?'.hero-bg-lighthouse':':scope > .mayak-v3-window');if(!parent||!inner||!art||parent.querySelector('.mq193-thread'))return;
const b=document.createElement('button');b.type='button';b.className='mq193-thread mq193-quiet';b.setAttribute('aria-label','Прокрутить к содержанию');b.innerHTML='<svg viewBox="0 0 18 31" fill="none" aria-hidden="true"><path d="M9 1V28" stroke="currentColor" stroke-width=".9" opacity=".5"/><path class="mq193-ray" d="M9 8V28M4 23l5 6 5-6" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>';
// Position relative to the panorama using existing parent, not a new layout row.
parent.insertBefore(b,inner);
function headerBottom(){return Math.max(0,r.querySelector('.site-header')?.getBoundingClientRect().bottom||0);}
function overlap(a,z){return a.left<z.right&&a.right>z.left&&a.top<z.bottom&&a.bottom>z.top;}
function update(){frame=0;const ar=art.getBoundingClientRect(),ir=inner.getBoundingClientRect(),pr=parent.getBoundingClientRect();const h=inner.querySelector('h1')||inner;const hr=h.getBoundingClientRect();
// No hint when the heading is already visible; home is intentionally subject to the same rule.
let quiet=!mobile.matches||ar.height<80||window.scrollY>32||hr.top<window.innerHeight-20;
// Place directly above the content in the existing picture, not over text.
const top=Math.min(ar.bottom,ir.top)-pr.top-47;b.style.setProperty('top',Math.max(0,top)+'px','important');b.style.setProperty('bottom','auto','important');
const br=b.getBoundingClientRect();for(const el of document.querySelectorAll('#cookie-banner:not([hidden]),button[data-v-ogonek],.mayak-search-panel:not([hidden]),#mobile-nav[aria-hidden="false"]')){const er=el.getBoundingClientRect();if(er.width&&er.height&&getComputedStyle(el).visibility!=='hidden'&&overlap(br,er))quiet=true;}
b.classList.toggle('mq193-quiet',quiet);b.tabIndex=quiet?-1:0;}
function schedule(){if(!frame)frame=requestAnimationFrame(update);}
b.addEventListener('click',()=>{const h=inner.querySelector('h1,h2')||inner;if(!h.hasAttribute('tabindex')){h.setAttribute('tabindex','-1');h.addEventListener('blur',()=>h.removeAttribute('tabindex'),{once:true});}h.focus({preventScroll:true});window.scrollTo({top:Math.max(0,window.scrollY+inner.getBoundingClientRect().top-headerBottom()-12),behavior:reduce.matches?'instant':'smooth'});schedule();});
window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});window.addEventListener('pageshow',schedule);mobile.addEventListener('change',schedule);if(window.ResizeObserver){const o=new ResizeObserver(schedule);o.observe(parent);o.observe(inner);o.observe(art);}const state=new MutationObserver(schedule);for(const el of document.querySelectorAll('#cookie-banner,.mayak-search-panel,#mobile-nav'))state.observe(el,{attributes:true,attributeFilter:['hidden','aria-hidden','style','class']});schedule();}
function boot(){run();if(document.querySelector('.mq193-thread'))return;const m=document.querySelector('#allrecords[data-tilda-project-id="44433709"] #main-content');if(!m)return;const o=new MutationObserver(()=>{run();if(m.querySelector('.mq193-thread'))o.disconnect();});o.observe(m,{childList:true,subtree:true});setTimeout(()=>o.disconnect(),5000);}
if(document.readyState==='loading'||document.readyState==='interactive')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();window.addEventListener('load',run,{once:true});window.addEventListener('pageshow',run);
})();
/* Diagnostic only: native transition capability and actual navigation events. No delays or interception. */
(()=>{for(const name of ['pageswap','pagereveal'])window.addEventListener(name,e=>{console.info('MAYAK_RC194',name,'native transition:',Boolean(e.viewTransition));if(e.viewTransition)e.viewTransition.ready.then(()=>console.info('MAYAK_RC194 transition ready')).catch(()=>console.info('MAYAK_RC194 transition skipped'));});})();

/* RC19.4 final: exact approved copy correction, only the named founder on /about. */
(()=>{'use strict';
 function run(){const root=document.querySelector('#allrecords[data-tilda-project-id="44433709"][data-tilda-page-id="415541609"][data-tilda-page-alias="about"]');if(!root)return;
 for(const card of root.querySelectorAll('.mayak-leader-copy')){if(card.querySelector('h3')?.textContent.trim()!=='Моисеева Анна Витальевна')continue;
 for(const p of card.querySelectorAll('p')){if(p.querySelector('strong')?.textContent.trim()!=='Сегодня:')continue;
 for(const n of p.childNodes){if(n.nodeType===Node.TEXT_NODE&&n.nodeValue.includes('младшая сестра на соревнованиях и сборах спортивной школы'))n.nodeValue=n.nodeValue.replace('младшая сестра на соревнованиях и сборах спортивной школы','младшая медсестра на соревнованиях и сборах спортивной школы');}}}}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();window.addEventListener('pageshow',run);
})();
