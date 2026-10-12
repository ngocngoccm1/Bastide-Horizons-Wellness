import type { Translation } from '../data/translations';
import {localToday,validateValue,validateDates} from './validation';
const t:Translation=JSON.parse(document.getElementById('ui-translations')?.textContent||'{}');
const $=<T extends HTMLElement=HTMLElement>(selector:string,parent:ParentNode=document)=>parent.querySelector<T>(selector);
const $$=<T extends HTMLElement=HTMLElement>(selector:string,parent:ParentNode=document)=>Array.from(parent.querySelectorAll<T>(selector));
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const today=localToday();
$$<HTMLInputElement>('input[type="date"]').forEach(input=>input.min=today);
function rememberLanguage(href:string){try{const path=new URL(href,location.href).pathname;const base=import.meta.env.BASE_URL.replace(/\/?$/, '/');localStorage.setItem('bastide-language',path.slice(base.length).split('/')[0]);}catch{/* Browsing works even when storage is unavailable. */}}
$$<HTMLSelectElement>('[data-language]').forEach(select=>select.addEventListener('change',()=>{const href=select.value+location.hash;rememberLanguage(href);location.assign(href);}));
$$<HTMLAnchorElement>('[data-language-link]').forEach(link=>link.addEventListener('click',()=>rememberLanguage(link.href)));
try{localStorage.setItem('bastide-language',document.body.dataset.lang||'fr');}catch{}
function openDialog(dialog:HTMLDialogElement|null){if(!dialog)return;dialog.showModal();document.body.classList.add('modal-open');if(dialog.id==='mobile-menu')$('.menu-toggle')?.setAttribute('aria-expanded','true');}
function closeDialog(dialog:HTMLDialogElement|null){dialog?.close();}
$$<HTMLDialogElement>('dialog').forEach(dialog=>{
 dialog.addEventListener('close',()=>{if(dialog.id==='mobile-menu')$('.menu-toggle')?.setAttribute('aria-expanded','false');if(!$('dialog[open]'))document.body.classList.remove('modal-open');});
 dialog.addEventListener('click',event=>{if(event.target===dialog)closeDialog(dialog);});
 $$('[data-close]',dialog).forEach(button=>button.addEventListener('click',()=>closeDialog(dialog)));
});
const menu=$<HTMLDialogElement>('#mobile-menu');
$('.menu-toggle')?.addEventListener('click',()=>openDialog(menu));
$$('a',menu||document.createElement('div')).forEach(link=>link.addEventListener('click',()=>closeDialog(menu)));
$('.menu-toggle')?.addEventListener('keydown',event=>{if(event.key==='Escape')closeDialog(menu);});
const header=$('.site-header');
const sticky=$('.sticky-booking');
let contactVisible=false;
let scrollScheduled=false;
let solid=false;
function updateScroll(){
 const nextSolid=window.scrollY>35;
 if(nextSolid!==solid){header?.classList.toggle('solid',nextSolid);solid=nextSolid;}
 sticky?.classList.toggle('visible',window.scrollY>550&&!contactVisible);
 scrollScheduled=false;
}
window.addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateScroll);}},{passive:true});
updateScroll();
const contact=$('#contact');
if(contact)new IntersectionObserver(entries=>{contactVisible=entries[0].isIntersecting;updateScroll();},{threshold:0}).observe(contact);
if(!reduceMotion.matches){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}}),{threshold:.08});
 $$('[data-reveal]').forEach(element=>{if(element.getBoundingClientRect().top>window.innerHeight-50){element.classList.add('reveal-ready');observer.observe(element);}});
 reduceMotion.addEventListener('change',event=>{if(event.matches){$$('[data-reveal]').forEach(el=>el.classList.add('revealed'));observer.disconnect();}});
}
const interlude=$('.landscape-interlude');
const interludeImage=$('img',interlude||document.createElement('div'));
if(interlude&&interludeImage&&window.innerWidth>1000&&!reduceMotion.matches){
 let inView=false;
 new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;}).observe(interlude);
 window.addEventListener('scroll',()=>{if(!inView||reduceMotion.matches)return;requestAnimationFrame(()=>{const rect=interlude.getBoundingClientRect();const offset=Math.max(-22,Math.min(22,(rect.top-window.innerHeight/2)*.05));interludeImage.style.transform=`translateY(${offset}px)`;});},{passive:true});
}
function selectTab(kind:string,focus=false){
 $$<HTMLButtonElement>('[data-form-tab]').forEach(tab=>{const active=tab.dataset.formTab===kind;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus();});
 $$<HTMLElement>('[role="tabpanel"]').forEach(panel=>panel.hidden=panel.id!==`panel-${kind}`);
}
$$<HTMLButtonElement>('[data-form-tab]').forEach(tab=>{
 tab.addEventListener('click',()=>selectTab(tab.dataset.formTab!));
 tab.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const next=event.key==='Home'?'stay':event.key==='End'?'wellness':tab.dataset.formTab==='stay'?'wellness':'stay';selectTab(next,true);}});
});
$$('[data-wellness-link]').forEach(link=>link.addEventListener('click',()=>selectTab('wellness')));
$$('[data-service]').forEach(link=>link.addEventListener('click',()=>{selectTab('wellness');const input=$<HTMLSelectElement>('#wellness-service');if(input)input.value=link.dataset.service!;}));
const booking=$<HTMLFormElement>('.booking-bar');
booking?.addEventListener('submit',event=>{
 event.preventDefault();
 const data=new FormData(booking);
 const arrival=String(data.get('arrival')||'');const departure=String(data.get('departure')||'');const guests=String(data.get('guests')||'');
 let error:string|null=null;
 for(const [name,value] of [['arrival',arrival],['departure',departure],['guests',guests]]){const code=validateValue(name,value,true,today);if(code){error=t.contact[code];$<HTMLInputElement>(`[name="${name}"]`,booking)?.focus();break;}}
 if(!error){const code=validateDates(arrival,departure);if(code){error=t.contact[code];$('#booking-departure')?.focus();}}
 const status=$('#booking-error');if(status)status.textContent=error||'';
 if(error)return;
 selectTab('stay');
 for(const [name,value] of [['arrival',arrival],['departure',departure],['guests',guests]]){const input=$<HTMLInputElement>(`#stay-${name}`);if(input)input.value=value;}
 const formArrival=$<HTMLInputElement>('#stay-arrival');formArrival?.dispatchEvent(new Event('change'));
 contact?.scrollIntoView({behavior:reduceMotion.matches?'instant':'smooth'});
 location.hash='contact';
});
for(const prefix of ['booking','stay']){
 const arrival=$<HTMLInputElement>(`#${prefix}-arrival`);const departure=$<HTMLInputElement>(`#${prefix}-departure`);
 arrival?.addEventListener('change',()=>{if(departure){if(arrival.value){const date=new Date(`${arrival.value}T12:00:00`);date.setDate(date.getDate()+1);departure.min=localToday(date);}else departure.min=today;}});
}
$$<HTMLFormElement>('.inquiry-form').forEach(form=>{
 const fields=$$<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>('input:not([type="hidden"]):not([name="_gotcha"]),select,textarea',form);
 function errorFor(field:HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement,message:string){
  const display=$(`#${field.id}-error`);if(display)display.textContent=message;
  if(message)field.setAttribute('aria-invalid','true');else field.removeAttribute('aria-invalid');
 }
 fields.forEach(field=>field.addEventListener('input',()=>errorFor(field,'')));
 form.addEventListener('submit',async event=>{
  event.preventDefault();
  const status=$('.form-status',form)!;
  status.textContent='';status.className='form-status';
  const data=new FormData(form);
  let firstInvalid:HTMLElement|null=null;
  for(const field of fields){
   const value=field instanceof HTMLInputElement&&field.type==='checkbox'?(field.checked?'yes':''):field.value.trim();
   let code=validateValue(field.name,value,field.required,today);
   if(field.name==='departure'&&!code)code=validateDates(String(data.get('arrival')||''),value);
   const message=code?t.contact[code]:'';errorFor(field,message);
   if(code&&!firstInvalid)firstInvalid=field;
  }
  if(firstInvalid){status.textContent=t.contact.review;status.classList.add('error');firstInvalid.focus();return;}
  if(data.get('_gotcha'))return;
  for(const field of fields){if(field.type!=='checkbox')data.set(field.name,field.value.trim());}
  const endpoint=form.dataset.endpoint;
  if(!endpoint){status.textContent=t.contact.unconfigured;status.classList.add('error');status.focus();return;}
  const button=$<HTMLButtonElement>('.submit',form)!;const label=$('[data-submit-text]',button)!;
  button.disabled=true;label.textContent=t.contact.sending;form.setAttribute('aria-busy','true');
  const controller=new AbortController();const timer=window.setTimeout(()=>controller.abort(),20000);
  try{
   const response=await fetch(endpoint,{method:'POST',body:data,headers:{Accept:'application/json'},signal:controller.signal});
   const payload=await response.json().catch(()=>null);
   if(!response.ok||payload?.errors||payload?.error||payload?.ok===false)throw new Error('Submission not accepted');
   status.textContent=t.contact.success;status.classList.add('success');form.reset();fields.forEach(field=>errorFor(field,''));
  }catch{
   status.textContent=t.contact.error;status.classList.add('error');
  }finally{
   clearTimeout(timer);button.disabled=false;label.textContent=t.contact.submit;form.removeAttribute('aria-busy');status.focus();
  }
 });
});
$$('[data-open-detail]').forEach(button=>button.addEventListener('click',()=>openDialog($<HTMLDialogElement>(`#detail-${button.dataset.openDetail}`))));
$$<HTMLDialogElement>('.detail-dialog').forEach(dialog=>{
 const photos: {src:string;alt:string}[]=JSON.parse($('[data-detail-photos]',dialog)?.textContent||'[]');let current=0;
 $$('[data-detail-direction]',dialog).forEach(button=>button.addEventListener('click',()=>{current=(current+Number(button.dataset.detailDirection)+photos.length)%photos.length;const img=$<HTMLImageElement>('.detail-gallery img',dialog)!;img.src=photos[current].src;img.removeAttribute('srcset');img.alt=photos[current].alt;const counter=$('[data-detail-counter]',dialog);if(counter)counter.textContent=`${current+1} / ${photos.length}`;}));
 $('[data-room-inquiry]',dialog)?.addEventListener('click',event=>{const button=event.currentTarget as HTMLElement;closeDialog(dialog);selectTab('stay');const preference=$<HTMLSelectElement>('#stay-accommodation');if(preference)preference.value=button.dataset.roomInquiry!;});
});
const lightbox=$<HTMLDialogElement>('#lightbox');
const tiles=$$<HTMLButtonElement>('[data-gallery-image]');let activeTiles=tiles;let currentImage=0;
function showImage(index:number){
 if(!activeTiles.length)return;
 currentImage=(index+activeTiles.length)%activeTiles.length;
 const tile=activeTiles[currentImage];const img=$<HTMLImageElement>('#lightbox-image')!;
 img.src=tile.dataset.src!;img.alt=tile.dataset.alt!;
 const source=$<HTMLImageElement>('img',tile);if(source){img.width=source.width;img.height=source.height;}
 const caption=$('[data-lightbox-caption]');if(caption)caption.textContent=tile.dataset.alt!;
 const count=$('.lightbox-counter');if(count)count.textContent=`${currentImage+1} / ${activeTiles.length}`;
}
$$<HTMLButtonElement>('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.filter;
 $$('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 tiles.forEach(tile=>tile.hidden=filter!=='all'&&tile.dataset.category!==filter);
 activeTiles=tiles.filter(tile=>!tile.hidden);$('.gallery-grid')?.classList.toggle('filtered',filter!=='all');
}));
tiles.forEach(tile=>tile.addEventListener('click',()=>{showImage(activeTiles.indexOf(tile));openDialog(lightbox);}));
$('.lightbox-prev')?.addEventListener('click',()=>showImage(currentImage-1));$('.lightbox-next')?.addEventListener('click',()=>showImage(currentImage+1));
lightbox?.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showImage(currentImage-1);}if(event.key==='ArrowRight'){event.preventDefault();showImage(currentImage+1);}});
let touchX=0;let touchY=0;
lightbox?.addEventListener('touchstart',event=>{touchX=event.changedTouches[0].screenX;touchY=event.changedTouches[0].screenY;},{passive:true});
lightbox?.addEventListener('touchend',event=>{const dx=event.changedTouches[0].screenX-touchX;const dy=event.changedTouches[0].screenY-touchY;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))showImage(currentImage+(dx<0?1:-1));},{passive:true});
$('[data-copy-address]')?.addEventListener('click',async event=>{const button=event.currentTarget as HTMLElement;const status=$('.copy-status');try{await navigator.clipboard.writeText(button.dataset.copyAddress!);if(status)status.textContent=t.location.copied;}catch{if(status)status.textContent=t.location.copyError;}});
const map=$('[data-map-container]');const mapOriginal=map?.innerHTML;
function attachMapButton(){
 $('[data-map-load]',map||document.createElement('div'))?.addEventListener('click',()=>{
  if(!map)return;const iframe=document.createElement('iframe');iframe.title=map.dataset.mapTitle!;iframe.src=map.dataset.mapUrl!;iframe.loading='lazy';iframe.referrerPolicy='no-referrer-when-downgrade';iframe.allowFullscreen=true;map.replaceChildren(iframe);
 });
}
attachMapButton();
$('[data-cookie-open]')?.addEventListener('click',()=>openDialog($<HTMLDialogElement>('#cookie-dialog')));
$('[data-map-reset]')?.addEventListener('click',()=>{if(map&&mapOriginal){map.innerHTML=mapOriginal;attachMapButton();}const status=$('[data-reset-status]');if(status)status.textContent=t.footer.resetDone;});
