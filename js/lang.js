const HL={
it:{p1t:'PREVENTIVO SPEDIZIONI',p1d:'Calcola subito il costo del tuo invio, collo per collo',p1c:'Vai al preventivo →',p2t:'LISTINO PREZZI',p2d:'Consulta le tariffe in vigore per zona e destinazione',p2c:'Sfoglia il listino →'},
en:{p1t:'SHIPPING QUOTE',p1d:'Get an instant cost estimate for your shipment',p1c:'Get a quote →',p2t:'PRICE LIST',p2d:'Browse current rates by zone and destination',p2c:'View price list →'},
es:{p1t:'PRESUPUESTO DE ENVÍO',p1d:'Calcula al instante el coste de tu envío',p1c:'Calcular →',p2t:'TARIFAS',p2d:'Consulta las tarifas vigentes por zona y destino',p2c:'Ver tarifas →'},
de:{p1t:'VERSANDANGEBOT',p1d:'Berechnen Sie sofort die Kosten Ihrer Sendung',p1c:'Angebot berechnen →',p2t:'PREISLISTE',p2d:'Aktuelle Tarife nach Zone und Ziel ansehen',p2c:'Preisliste →'},
ro:{p1t:'OFERTĂ EXPEDIȚIE',p1d:'Calculează instant costul expedierii tale',p1c:'Calculează →',p2t:'LISTĂ DE PREȚURI',p2d:'Consultă tarifele în vigoare pe zone și destinații',p2c:'Vezi lista →'},
zh:{p1t:'运费报价',p1d:'立即计算您的运费',p1c:'计算报价 →',p2t:'价格表',p2d:'按区域和目的地查看现行费率',p2c:'查看价格 →'}};
function vai(p){
  var h=document.getElementById('pagina-home'),pr=document.getElementById('pagina-preventivo'),li=document.getElementById('pagina-listino');
  if(h)h.style.display=p==='home'?'flex':'none';
  if(pr)pr.style.display=p==='prev'?'block':'none';
  if(li)li.style.display=p==='list'?'block':'none';
  window.scrollTo(0,0);
}
function applyLangHome(){
  document.querySelectorAll('[data-hi]').forEach(e=>{e.textContent=(HL[LANG]||HL.it)[e.dataset.hi]||HL.it[e.dataset.hi];});
  document.querySelectorAll('.langoptH').forEach(b=>b.classList.toggle('on',b.dataset.l===LANG));
  var lc=document.getElementById('langCurH');
  if(lc){lc.innerHTML=(FLAGSVG[LANG]||FLAGSVG.it)+'<b>'+String(LANG).toUpperCase()+'</b>';}
}
function toggleLangMenuH(e){
  if(e)e.stopPropagation();
  var m=document.getElementById('langMenuH'),b=document.getElementById('langDropBtnH');
  if(!m||!b)return;
  if(!m.classList.contains('open')){
    var r=b.getBoundingClientRect();
    m.style.top=(r.bottom+8)+'px';m.style.right=(window.innerWidth-r.right)+'px';
    b.setAttribute('aria-expanded','true');
  }else{b.setAttribute('aria-expanded','false');}
  m.classList.toggle('open');
}
function pickLangH(l){setLang(l);applyLangHome();
  var m=document.getElementById('langMenuH');if(m)m.classList.remove('open');
  var b=document.getElementById('langDropBtnH');if(b)b.setAttribute('aria-expanded','false');}
document.addEventListener('click',function(ev){
  var m=document.getElementById('langMenuH');
  if(m&&m.classList.contains('open')&&!m.contains(ev.target)){m.classList.remove('open');
    var b=document.getElementById('langDropBtnH');if(b)b.setAttribute('aria-expanded','false');}
});
window.addEventListener('resize',function(){var m=document.getElementById('langMenuH');if(m)m.classList.remove('open');});
try{applyLangHome();}catch(e){}