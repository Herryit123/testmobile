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