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

;

const PP_LINK = "https://www.paypal.me/herry0196/";
const SHEET_URL = ""; // ← incolla qui l'URL /exec dello script Google quando ce l'hai

document.addEventListener('DOMContentLoaded', function(){

  var CART = [];
  try{ CART = JSON.parse(localStorage.getItem('cp_cart') || '[]'); }catch(e){ CART = []; }
  function save(){ try{ localStorage.setItem('cp_cart', JSON.stringify(CART)); }catch(e){} renderCart(); }

  var cartBtn = document.createElement('button');
  cartBtn.className = 'cartbtn65'; cartBtn.type = 'button';
  cartBtn.setAttribute('aria-label','Carrello');
  cartBtn.innerHTML = '\uD83D\uDED2<span class="n">0</span>';
  document.body.appendChild(cartBtn);

  var panel = document.createElement('div');
  panel.className = 'cartpanel65';
  panel.innerHTML = '<div class="cp-hd"><h3>\uD83D\uDED2 Il tuo carrello</h3></div>'
    + '<div class="cp-bd" id="cpBd"></div>'
    + '<div class="cp-ft">'
    + '<div class="cp-tot"><span>TOTALE</span><b id="cpTot">\u20AC 0,00</b></div>'
    + '<div id="cpPP" style="min-height:50px"></div>'
    + '<button class="cp-act cp-pf" id="cpPf">\uD83D\uDCC4 FATTURA PRO FORMA</button>'
    + '<button class="cp-act cp-wa" id="cpWa">\uD83D\uDCAC INVIA ORDINE SU WHATSAPP</button>'
    + '<button class="cp-act cp-cl" id="cpCl">\u2715 Chiudi</button></div>';
  document.body.appendChild(panel);

  var pf = document.createElement('div');
  pf.className = 'pfover65';
  pf.innerHTML = '<div class="pf-doc" id="pfDoc"></div>'
    + '<div class="pf-ft"><button onclick="window.print()">\uD83D\uDDA8\uFE0F Stampa / Salva PDF</button><button id="pfCl">\u2715 Chiudi</button></div>';
  document.body.appendChild(pf);

  document.getElementById('cpCl').addEventListener('click', function(){ panel.classList.remove('open'); });
  document.getElementById('pfCl').addEventListener('click', function(){ pf.classList.remove('open'); });
  panel.addEventListener('click', function(e){
    var d = e.target.closest('[data-del]');
    if(d){ CART.splice(+d.dataset.del,1); save(); renderPP(); }
  });
  document.getElementById('cpWa').addEventListener('click', function(){
    if(!CART.length) return;
    var msg = 'Buongiorno, vorrei confermare questo ordine:\n' + CART.map(function(c){ return '\u2022 ' + c.n + ' \u2014 \u20AC ' + c.p.toFixed(2); }).join('\n') + '\nTotale: \u20AC ' + tot().toFixed(2) + '\nGrazie!';
    window.open('https://wa.me/' + (typeof WHATSAPP !== 'undefined' ? WHATSAPP : '') + '?text=' + encodeURIComponent(msg), '_blank');
  });
  document.getElementById('cpPf').addEventListener('click', function(){
    if(!CART.length) return;
    var rows = '', t = tot();
    CART.forEach(function(c){ rows += '<tr class="pfr"><td>' + c.n + '</td><td>\u20AC ' + c.p.toFixed(2) + '</td></tr>'; });
    var num = 'PF-2026-' + String(Math.floor(Math.random()*900)+100);
    document.getElementById('pfDoc').innerHTML =
      '<h2>FATTURA PRO FORMA</h2>'
      + '<div class="pfh"><div><b>Centro Post@ di Giuliani Enrico</b><br>Via L.S. Cherubini 68/D, 10138 Torino</div>'
      + '<div style="text-align:right">Pro forma N. <b>' + num + '</b><br>Data: ' + new Date().toLocaleDateString('it-IT') + '</div></div>'
      + '<table><tr><th>Descrizione</th><th>Importo</th></tr>' + rows
      + '<tr class="pft"><td><b>TOTALE PRO FORMA</b></td><td><b>\u20AC ' + t.toFixed(2) + '</b></td></tr></table>'
      + '<p style="font-size:11.5px;color:#5a7a99">Documento non fiscale \u2014 richiesta di pagamento. Lo scontrino fiscale viene rilasciato in negozio al momento del pagamento/rilascio del servizio.</p>'
      + '<div class="stamp">PRO FORMA \u2014 NON FISCALE</div>';
    pf.classList.add('open');
  });

  var pricebox = document.querySelector('#pagina-preventivo .pricebox');
  if(pricebox && !document.getElementById('addShip65')){
    var b = document.createElement('button');
    b.id = 'addShip65'; b.className = 'addcart65'; b.type = 'button';
    b.textContent = '\uD83D\uDED2 AGGIUNGI AL CARRELLO';
    b.addEventListener('click', function(){
      var pr = pricebox.querySelector('.prezzo');
      var val = pr ? parseFloat(pr.textContent.replace(/[^0-9,]/g,'').replace(',','.')) : 0;
      var desc = 'Spedizione (preventivo) \u2014 ' + new Date().toLocaleDateString('it-IT');
      CART.push({n: desc, p: isNaN(val)?0:val}); save();
      panel.classList.add('open');
    });
    pricebox.insertAdjacentElement('afterend', b);
  }

  document.querySelectorAll('#pagina-listino .card').forEach(function(card){
    if(card.querySelector('.miniadd65')) return;
    var h4 = card.querySelector('h4'); if(!h4) return;
    var priceEl = card.querySelector('.price');
    var buy = document.createElement('div'); buy.className = 'buy65';
    if(priceEl) buy.appendChild(priceEl);
    var mb = document.createElement('button');
    mb.className = 'miniadd65'; mb.type = 'button'; mb.textContent = '\uD83D\uDED2';
    mb.setAttribute('aria-label','Aggiungi al carrello: ' + h4.textContent.trim());
    mb.addEventListener('click', function(ev){
      ev.stopPropagation();
      var val = priceEl ? parseFloat(priceEl.textContent.replace(/[^0-9,]/g,'').replace(',','.')) : NaN;
      CART.push({n: h4.textContent.trim(), p: isNaN(val)?0:val}); save();
      panel.classList.add('open');
    });
    buy.appendChild(mb);
    card.appendChild(buy);
  });

  var PP_CLIENT_ID = "EP7p71v20g-a2cg2WR0wgjhGfm9H5XBYDBfkpNNZU2OjpQZMrpPBrc2N252GB0_19kZTNRaCIa_6Yc0r";
  var PP_SANDBOX = true; // ← false quando vai in produzione col Client ID live
  var ppLoaded = false;
  function loadPP(cb){
    if(window.paypal) return cb();
    if(ppLoaded) return;
    ppLoaded = true;
    var sc = document.createElement('script');
    sc.src = (PP_SANDBOX ? 'https://www.sandbox.paypal.com' : 'https://www.paypal.com')
      + '/sdk/js?client-id=' + PP_CLIENT_ID + '&currency=EUR&intent=capture';
    sc.onload = cb; sc.onerror = function(){};
    document.head.appendChild(sc);
  }
  function renderPP(){
    if(!panel.classList.contains('open')) return;
    loadPP(function(){
      if(!window.paypal || !document.getElementById('cpPP')) return;
      document.getElementById('cpPP').innerHTML = '';
      if(!CART.length){
        document.getElementById('cpPP').innerHTML = '<p style="text-align:center;color:#8aa0b8;font-size:12.5px;padding:6px">Aggiungi qualcosa per pagare con PayPal</p>';
        return;
      }
      paypal.Buttons({
        style: { layout:'vertical', color:'gold', shape:'pill', label:'paypal' },
        createOrder: function(data, actions){
          return actions.order.create({
            purchase_units: [{ amount: { value: tot().toFixed(2), currency_code:'EUR' },
              description: 'Centro Post@ — ordine online' }]
          });
        },
        onApprove: function(data, actions){
          return actions.order.capture().then(function(details){
            markPaid(details.id);
          });
        },
        onError: function(){ alert('Pagamento non riuscito. Riprova o contattaci su WhatsApp.'); }
      }).render('#cpPP');
    });
  }
  function sendSheet(stato, ref){
    if(!(SHEET_URL && /^https:\/\//.test(SHEET_URL))) return;
    try{
      fetch(SHEET_URL, { method:'POST', headers:{'Content-Type':'text/plain'}, body: JSON.stringify({
        cliente:'', telefono:'',
        dettaglio: CART.map(function(c){ return c.n + ' (\u20AC ' + c.p.toFixed(2) + ')'; }).join(' | '),
        totale: tot().toFixed(2), ref: ref || '', stato: stato
      })}).catch(function(){});
    }catch(e){}
  }
  function markPaid(orderId){
    sendSheet('pagato', 'PayPal ' + orderId);
    CART = []; save();
    document.getElementById('cpBd').innerHTML =
      '<div style="text-align:center;padding:40px 16px">'
      + '<div style="font-size:52px">\u2705</div>'
      + '<h3 style="font:800 20px Poppins;color:#003A70;margin:12px 0 6px">Pagamento ricevuto!</h3>'
      + '<p style="color:#5a7a99;font-size:13.5px">Ordine PayPal <b>' + orderId + '</b><br>Riceverai la conferma via email.<br>Porta la pro forma in negozio o inviala su WhatsApp.</p>'
      + '<button class="cp-act cp-pf" style="margin-top:16px" onclick="document.getElementById(\'cpPf\').click()">\uD83D\uDCC4 Vedi fattura pro forma</button>'
      + '</div>';
    document.getElementById('cpTot').textContent = '\u20AC 0,00';
    renderPP();
  }

  function tot(){ return CART.reduce(function(a,c){ return a + c.p; }, 0); }
  function renderCart(){
    cartBtn.querySelector('.n').textContent = CART.length;
    var bd = document.getElementById('cpBd');
    if(!panel.classList.contains('open') || bd.querySelector('[style*="text-align:center"]')){  }
    var h = '', t = tot();
    CART.forEach(function(c,i){
      h += '<div class="cp-it"><b>' + c.n + '</b><span>\u20AC ' + c.p.toFixed(2) + '</span><button data-del="' + i + '">\u2715</button></div>';
    });
    if(!CART.length) h = '<p style="text-align:center;color:#8aa0b8;padding:24px 10px">Carrello vuoto.<br>Aggiungi una spedizione o un servizio.</p>';
    if(!bd.querySelector('h3')) bd.innerHTML = h;
    document.getElementById('cpTot').textContent = '\u20AC ' + t.toFixed(2);
    renderPP();
  }

  document.getElementById('cpWa').addEventListener('click', function(){
    if(!CART.length) return;
    sendSheet('da pagare', 'WhatsApp');
  });
  cartBtn.addEventListener('click', function(){
    panel.classList.add('open'); renderCart();
    setTimeout(renderPP, 320);
  });
  renderCart();
});