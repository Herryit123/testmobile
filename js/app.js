(function(){

const q = document.getElementById('q');
const cards = [...document.querySelectorAll('#pagina-listino .card')];
const groups = [...document.querySelectorAll('#pagina-listino .group')];
const chips = [...document.querySelectorAll('#groupChips .chip')];
const subChips = [...document.querySelectorAll('#pagina-listino .chip.sub')];
const empty = document.getElementById('empty');
let activeGroup = '', activeSub = '';

function apply() {
  const term = q.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(c => {
    const okG = !activeGroup || c.dataset.group === activeGroup;
    const okS = !activeSub || c.dataset.search.includes(activeSub);
    const okQ = !term || c.dataset.search.includes(term);
    const show = okG && okS && okQ;
    c.classList.toggle('hidden', !show);
    if (show) visible++;
  });
  groups.forEach(g => {
    const any = [...g.querySelectorAll('.card')].some(c => !c.classList.contains('hidden'));
    g.classList.toggle('hidden', !any);
  });
  empty.style.display = visible ? 'none' : 'block';
}

q.addEventListener('input', apply);
chips.forEach(ch => ch.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  ch.classList.add('active');
  activeGroup = ch.dataset.group; activeSub = '';
  subChips.forEach(s => s.classList.remove('active'));
  apply();
}));
subChips.forEach(ch => ch.addEventListener('click', () => {
  const was = ch.classList.contains('active');
  subChips.forEach(s => s.classList.remove('active'));
  activeSub = was ? '' : ch.dataset.sub;
  if (!was) ch.classList.add('active');
  apply();
}));

})();
;

(function(){
  var btn=document.getElementById('filterBtn'),panel=document.getElementById('filterPanel'),dot=document.getElementById('filterDot');
  if(!btn||!panel)return;
  function close(){panel.classList.remove('open');btn.setAttribute('aria-expanded','false');}
  btn.addEventListener('click',function(e){
    e.stopPropagation();
    var open=panel.classList.toggle('open');
    btn.setAttribute('aria-expanded',open?'true':'false');
  });
  document.addEventListener('click',function(e){
    if(panel.classList.contains('open')&&!panel.contains(e.target)){close();}
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&panel.classList.contains('open')){close();btn.focus();}
  });
  panel.querySelectorAll('#groupChips .chip').forEach(function(ch){
    ch.addEventListener('click',function(){
      close();
      if(dot) dot.hidden = !ch.dataset.group;
    });
  });
})();

;

const KIT_URL = "https://cp-to-12.pages.dev/";

;

document.addEventListener('DOMContentLoaded', function(){
  var listino = document.getElementById('pagina-listino');
  if(!listino) return;
  var chips = document.getElementById('groupChips');
  if(!chips || chips.dataset.nav) return;
  chips.dataset.nav = '1';
  var head = listino.querySelector('header') || listino.querySelector('.top');
  if(head && head.parentElement) head.parentElement.insertBefore(chips, head.nextSibling);
  var SHORT = {'Identit\u00E0 Digitale, PEC e Firma':'Identit\u00E0 Digitale','Casa e Immobili':'Casa','Certificati e Stato Civile':'Certificati','Casellario Giudiziale':'Casellario','Auto e Motori':'Auto','Aziende e Societ\u00E0':'Aziende','Persone e Reputazione':'Persone','Indagini e Recupero Crediti':'Indagini'};
  chips.querySelectorAll('.chip').forEach(function(c){
    if(c.dataset.group && SHORT[c.dataset.group] && !c.dataset.hi) c.textContent = SHORT[c.dataset.group];
  });
});

;

document.addEventListener('DOMContentLoaded', function(){
  var listino = document.getElementById('pagina-listino');
  if(!listino) return;
  var qq = document.getElementById('q');
  if(!qq || listino.querySelector('.lens65float')) return;
  var lens = document.createElement('button');
  lens.className = 'lens65float'; lens.type = 'button'; try{lens.setAttribute('aria-label',(HL[LANG]&&HL[LANG].liLens)||HL.it.liLens);}catch(e){}
  lens.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><line x1="20" y1="20" x2="16.5" y2="16.5"></line></svg>';
  listino.appendChild(lens);
  var sr = qq.closest('.search-row') || qq.parentElement;
  var xb = document.createElement('button');
  xb.className = 'close65'; xb.type = 'button'; xb.setAttribute('aria-label','Chiudi ricerca'); xb.textContent = '✕';
  sr.appendChild(xb);
  lens.addEventListener('click', function(){
    listino.classList.add('search-on');
    setTimeout(function(){ try{ qq.focus(); }catch(e){} }, 260);
  });
  xb.addEventListener('click', function(){
    qq.value = ''; qq.dispatchEvent(new Event('input'));
    listino.classList.remove('search-on');
  });
});