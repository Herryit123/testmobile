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

  document.getElementById('cpCl').addEventListener('click', function(){
    panel.classList.remove('open');
    if(LAST_PAID){ var lp = LAST_PAID; LAST_PAID = null; downloadPF(lp.items, lp.tot, lp.ref, lp.info); }
  });
  panel.addEventListener('click', function(e){
    var d = e.target.closest('[data-del]');
    if(d){ CART.splice(+d.dataset.del,1); save(); renderPP(); }
  });
  document.getElementById('cpWa').addEventListener('click', function(){
    if(!CART.length) return;
    var msg = 'Buongiorno, vorrei confermare questo ordine:\n' + CART.map(function(c){ return '\u2022 ' + c.n + ' \u2014 \u20AC ' + c.p.toFixed(2); }).join('\n') + '\nTotale: \u20AC ' + tot().toFixed(2) + '\nGrazie!';
    window.open('https://wa.me/' + (typeof WHATSAPP !== 'undefined' ? WHATSAPP : '') + '?text=' + encodeURIComponent(msg), '_blank');
  });
  function openDoc(html){
    var old = document.getElementById('docOverlay65'); if(old) old.remove();
    var o = document.createElement('div'); o.id = 'docOverlay65';
    o.style.cssText = 'position:fixed;inset:0;z-index:9990;background:#fff;display:flex;flex-direction:column;font-family:Lato,sans-serif';
    o.innerHTML = '<div style="flex:1;overflow-y:auto;padding:26px 22px;color:#1c2833;font-size:13.5px">' + html + '</div>'
      + '<div style="flex:none;padding:12px 14px calc(12px + env(safe-area-inset-bottom));border-top:2px solid #d4e0ec;display:flex;gap:10px;background:#fff">'
      + '<button id="docPrint65" style="flex:1;padding:13px;border-radius:12px;font:800 13px Poppins;cursor:pointer;border:2px solid #003A70;background:#003A70;color:#fff">\uD83D\uDDA8\uFE0F Stampa / Salva PDF</button>'
      + '<button id="docClose65" style="flex:1;padding:13px;border-radius:12px;font:800 13px Poppins;cursor:pointer;border:2px solid #003A70;background:#fff;color:#003A70">\u2715 Chiudi</button></div>';
    document.body.appendChild(o);
    document.getElementById('docClose65').addEventListener('click', function(){ o.remove(); });
    document.getElementById('docPrint65').addEventListener('click', function(){ window.print(); });
  }
  function collectInfo(items){
    var det = {}, cli = {};
    items.forEach(function(c){
      (c.det || []).forEach(function(l){ det[l] = 1; });
      (c.cli || []).forEach(function(l){ cli[l] = 1; });
    });
    return { det: Object.keys(det), cli: Object.keys(cli) };
  }
  function infoBlocks(info){
    var h = '';
    if(info.cli.length) h += '<div style="display:flex;justify-content:space-between;gap:14px;margin:14px 0 0;font-size:12.5px;line-height:1.5"><div><b>' + info.cli[0] + '</b>' + (info.cli.length > 1 ? '<br>' + info.cli.slice(1).join('<br>') : '') + '</div></div>';
    if(info.det.length) h += '<div style="display:flex;justify-content:space-between;gap:14px;margin:8px 0 0;font-size:12.5px;line-height:1.5"><div>' + info.det.join('<br>') + '</div></div>';
    return h;
  }
  function buildPF(items, t, paidRef, detHTML, cliHTML){
    var rows = '';
    items.forEach(function(c){ rows += '<tr><td style="border:1px solid #d4e0ec;padding:8px">' + c.n + '</td><td style="border:1px solid #d4e0ec;padding:8px;text-align:right;font-weight:700;white-space:nowrap">\u20AC ' + c.p.toFixed(2) + '</td></tr>'; });
    var num = 'PF-2026-' + String(Math.floor(Math.random()*900)+100);
    var payline = paidRef
      ? '<p style="font-size:12.5px;color:#1c7a3d;font-weight:800;margin:8px 0">\u2705 PAGATA via PayPal \u2014 ordine ' + paidRef + '</p>'
      : '<p style="font-size:12.5px;color:#b07d00;font-weight:800;margin:8px 0">\u23F1 DA PAGARE \u2014 pagamento in negozio</p>';
    var htmlPF =
      '<h2 style="font:800 19px Poppins;color:#003A70;text-align:center">FATTURA PRO FORMA</h2>'
      + '<div style="display:flex;justify-content:space-between;gap:14px;margin:16px 0;font-size:12.5px;line-height:1.5"><div><b>Centro Post@ di Giuliani Enrico</b><br>Via L.S. Cherubini 68/D, 10138 Torino</div>'
      + '<div style="text-align:right">Pro forma N. <b>' + num + '</b><br>Data: ' + new Date().toLocaleDateString('it-IT') + '</div></div>'
      + (cliHTML || '')
      + (detHTML || '')
      + '<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:12.5px"><tr><th style="background:#003A70;color:#FFCC00;padding:8px;font-family:Poppins;text-align:left">Descrizione</th><th style="background:#003A70;color:#FFCC00;padding:8px;font-family:Poppins">Importo</th></tr>' + rows
      + '<tr><td style="border:1px solid #d4e0ec;padding:8px"><b>TOTALE PRO FORMA</b></td><td style="border:1px solid #d4e0ec;padding:8px;text-align:right;font:800 16px Poppins;color:#003A70;background:#FFF3C4"><b>\u20AC ' + t.toFixed(2) + '</b></td></tr></table>'
      + payline
      + '<p style="font-size:11.5px;color:#5a7a99">Documento non fiscale \u2014 richiesta di pagamento. Lo scontrino fiscale viene rilasciato in negozio al momento del pagamento/rilascio del servizio.</p>'
      + '<div style="margin-top:18px;text-align:center;border:2.5px dashed #c62828;color:#c62828;font:800 12.5px Poppins;padding:9px;letter-spacing:2px">PRO FORMA \u2014 ' + (paidRef ? 'PAGATA' : 'DA PAGARE') + '</div>';
    openDoc(htmlPF);
  }
  document.getElementById('cpPf').addEventListener('click', function(){
    if(!CART.length) return;
    buildPF(CART.slice(), tot(), null, infoBlocks(collectInfo(CART)), '');
  });

  var pricebox = document.querySelector('#pagina-preventivo .pricebox');
  if(pricebox){
  function wv(id){ var e = document.getElementById(id); return e ? e.value.trim() : ''; }
  function wizPrice(){
    var pr = pricebox.querySelector('.prezzo') || document.getElementById('resPrice');
    var v = pr ? parseFloat(pr.textContent.replace(/[^0-9,]/g,'').replace(',','.')) : 0;
    return isNaN(v) ? 0 : v;
  }
  function wizColliPeso(){
    var rows = Array.prototype.filter.call(
      document.querySelectorAll('#nazBody tr, #intBody tr'),
      function(r){ return r.offsetParent !== null; });
    var peso = 0;
    rows.forEach(function(r){
      var inp = r.cells && r.cells[1] ? r.cells[1].querySelector('input') : null;
      var v = inp ? parseFloat(inp.value.replace(',','.')) : 0;
      if(!isNaN(v)) peso += v;
    });
    return { n: rows.length, kg: peso };
  }
  function wizReady(){
    return wv('mNome') && wv('dNome') && wv('dCitta') && wv('dCap');
  }
  function wizData(){
    var cp = wizColliPeso();
    var from = [wv('mNome'), [wv('mVia'), wv('mCiv')].filter(Boolean).join(' '),
                [wv('mCap'), wv('mCitta')].filter(Boolean).join(' ')].filter(Boolean).join(', ');
    var toArr = [wv('dNome'), wv('dCogn')].filter(Boolean).join(' ');
    var to = [toArr, [wv('dVia'), wv('dCiv')].filter(Boolean).join(' '),
              [[wv('dCap'), wv('dCitta')].filter(Boolean).join(' '), wv('dProv')].filter(Boolean).join(' ')].filter(Boolean).join(', ');
    var desc = 'Spedizione ' + (wv('mCitta')||'——') + ' \u2192 ' + (wv('dCitta')||'——')
      + (wv('dProv') ? ' (' + wv('dProv') + ')' : '')
      + ' \u2014 ' + cp.n + (cp.n===1?' collo':' colli') + (cp.kg ? ', ' + String(cp.kg).replace('.',',') + ' kg' : '');
    var det = '<div class="pfh" style="margin-top:2px">'
      + '<div><b>Spedizione da:</b><br>' + (from||'\u2014') + '</div>'
      + '<div style="text-align:right"><b>A:</b><br>' + (to||'\u2014') + '</div></div>'
      + '<p style="font-size:12px;color:#5a7a99;margin:6px 0 0">'
      + cp.n + (cp.n===1?' collo':' colli') + (cp.kg ? ' \u00B7 Peso totale: ' + String(cp.kg).replace('.',',') + ' kg' : '')
      + (wv('sContenuto') ? ' \u00B7 Contenuto: ' + wv('sContenuto') : '') + '</p>';
    var detL = ['Spedizione da: ' + (from||'\u2014'), 'A: ' + (to||'\u2014'),
      cp.n + (cp.n===1?' collo':' colli') + (cp.kg ? ' \u00B7 Peso: ' + String(cp.kg).replace('.',',') + ' kg' : '')
      + (wv('sContenuto') ? ' \u00B7 Contenuto: ' + wv('sContenuto') : '')];
    var cliL = [];
    if(wv('mNome')) cliL.push('Cliente: ' + wv('mNome'));
    if(wv('mTel')) cliL.push('Tel: ' + wv('mTel'));
    if(wv('mMail')) cliL.push('Email: ' + wv('mMail'));
    var cliHTML = cliL.length
      ? '<div class="pfh" style="margin-top:2px"><div><b>' + cliL[0] + '</b>' + (cliL.length>1 ? '<br>' + cliL.slice(1).join('<br>') : '') + '</div></div>'
      : '';
    return { desc: desc, det: det, detL: detL, cliL: cliL, cliHTML: cliHTML };
  }

  var acts = document.createElement('div');
  acts.id = 'wizActs';
  acts.style.cssText = 'display:none;margin-top:12px';
  acts.innerHTML =
    '<button class="addcart65" id="btnQuote" type="button">\uD83D\uDDA8\uFE0F STAMPA E PAGA IN CONTANTI</button>';
  pricebox.insertAdjacentElement('afterend', acts);

  var steps4 = document.querySelectorAll('#pagina-preventivo .wstep');
  var card4 = steps4.length >= 4 ? steps4[3] : null;
  if(card4 && !document.getElementById('btnCart4')){
    var b4 = document.createElement('button');
    b4.id = 'btnCart4'; b4.className = 'addcart65'; b4.type = 'button';
    b4.style.display = 'none';
    b4.textContent = '\uD83D\uDED2 AGGIUNGI AL CARRELLO';
    card4.appendChild(b4);
    b4.addEventListener('click', function(){
      if(!wizReady()) return;
      var d = wizData();
      CART.push({ n: d.desc, p: wizPrice(), det: d.detL, cli: d.cliL }); save(); bumpCart();
    });
  }
  function refreshActs(){
    var on = wizReady() && wizPrice() > 0 && !!pricebox.offsetParent;
    acts.style.display = on ? 'block' : 'none';
    if(document.getElementById('btnCart4'))
      document.getElementById('btnCart4').style.display = wizReady() ? 'block' : 'none';
  }
  ['input','change','click'].forEach(function(ev){
    document.getElementById('pagina-preventivo').addEventListener(ev, function(){ setTimeout(refreshActs, 60); });
  });
  refreshActs();

  document.getElementById('btnQuote').addEventListener('click', function(){
    if(!wizReady()) return;
    var d = wizData(), t = wizPrice();
    sendSheet('da pagare', 'Paga in contanti');
    buildPF([{ n: d.desc, p: t }], t, null, d.det, d.cliHTML);
    downloadPF([{ n: d.desc, p: t }], t, null, { det: d.detL, cli: d.cliL });
  });

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
      CART.push({n: h4.textContent.trim(), p: isNaN(val)?0:val}); save(); bumpCart();
    });
    buy.appendChild(mb);
    card.appendChild(buy);
  });

  var PP_CLIENT_ID = "BAAW_DzibYtBczKX8e-SgiZikxgifdrznDxWzIsi4x4rvus4oPTJqjEc4ECSQ70hri2Q_ovVRyjmftG4vQ";
  var PP_SANDBOX = true; // ← false quando vai in produzione col Client ID live
  var ppTries = 0, ppInjecting = false, ppFallbackTimer = null;

  function tot(){ return CART.reduce(function(a,c){ return a + c.p; }, 0); }

  function loadPP(cb){
    if(window.paypal){ if(cb) return cb(); return renderPP(); }
    if(ppTries >= 3) return fallbackPP();
    if(ppInjecting) return;
    ppInjecting = true; ppTries++;
    var sc = document.createElement('script');
    sc.src = (PP_SANDBOX ? 'https://www.sandbox.paypal.com' : 'https://www.paypal.com')
      + '/sdk/js?client-id=' + PP_CLIENT_ID + '&currency=EUR&intent=capture';
    sc.onload = function(){ ppInjecting = false; if(cb) cb(); else renderPP(); };
    sc.onerror = function(){ ppInjecting = false; setTimeout(loadPP, 1500); };
    document.head.appendChild(sc);
    if(!ppFallbackTimer){
      ppFallbackTimer = setTimeout(function(){ if(!window.paypal) fallbackPP(); }, 7000);
    }
  }

  function fallbackPP(){
    var el = document.getElementById('cpPP'); if(!el || el.dataset.fb) return;
    if(!panel.classList.contains('open')) return;
    el.dataset.fb = '1';
    el.innerHTML = '<a class="cp-act cp-pay" style="display:block" target="_blank" rel="noopener" href="'
      + PP_LINK + tot().toFixed(2) + '">\uD83D\uDCB3 PAGA \u20AC ' + tot().toFixed(2) + ' (PayPal sicuro)</a>';
  }

  function renderPP(){
    if(!panel.classList.contains('open')) return;
    var el = document.getElementById('cpPP'); if(!el) return;
    delete el.dataset.fb;
    if(!CART.length){
      el.innerHTML = '<p style="text-align:center;color:#8aa0b8;font-size:12.5px;padding:8px">Aggiungi qualcosa per pagare con PayPal</p>';
      return;
    }
    if(!window.paypal){
      el.innerHTML = '<p style="text-align:center;color:#8aa0b8;font-size:12.5px;padding:10px">Caricamento PayPal in corso\u2026</p>';
      loadPP();
      return;
    }
    try{
      el.innerHTML = '';
      paypal.Buttons({
        style: { layout:'vertical', color:'gold', shape:'pill', label:'paypal', height: 42 },
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
    }catch(err){ fallbackPP(); }
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

  var LAST_PAID = null;
  function loadScript(src, cb){
    var sc = document.createElement('script');
    sc.src = src; sc.onload = cb;
    document.head.appendChild(sc);
  }
  function downloadPF(items, t, ref, info){
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', function(){
      try{
        var doc = new window.jspdf.jsPDF();
        doc.setFontSize(16); doc.setTextColor(0,58,112);
        doc.text('FATTURA PRO FORMA', 105, 18, {align:'center'});
        doc.setFontSize(10); doc.setTextColor(30,40,55);
        doc.text('Centro Post@ di Giuliani Enrico', 14, 30);
        doc.text('Via L.S. Cherubini 68/D, 10138 Torino', 14, 35);
        doc.text('Pro forma N. PF-2026-' + String(Math.floor(Math.random()*900)+100), 140, 30);
        doc.text('Data: ' + new Date().toLocaleDateString('it-IT'), 140, 35);
        var y = 46;
        if(info){
          (info.cli || []).forEach(function(l){ doc.text(l, 14, y); y += 5; });
          (info.det || []).forEach(function(l){ doc.text(doc.splitTextToSize(l, 180), 14, y); y += 5; });
        }
        y += 4;
        doc.setFont(undefined, 'bold');
        doc.text('Descrizione', 14, y); doc.text('Importo', 196, y, {align:'right'});
        doc.setDrawColor(0,58,112); doc.line(14, y+2, 196, y+2);
        y += 9; doc.setFont(undefined, 'normal');
        items.forEach(function(c){
          doc.text(doc.splitTextToSize(c.n, 140), 14, y);
          doc.text('EUR ' + c.p.toFixed(2), 196, y, {align:'right'});
          y += 8;
        });
        y += 4; doc.setFont(undefined, 'bold'); doc.setFontSize(12);
        doc.text('TOTALE: EUR ' + t.toFixed(2), 196, y, {align:'right'});
        y += 13;
        if(ref){
          doc.setTextColor(28,122,61); doc.setFontSize(11);
          doc.text('PAGATA via PayPal - ordine ' + ref, 14, y);
          doc.setTextColor(180,30,30); doc.setFontSize(13);
          doc.text('PRO FORMA - PAGATA', 105, y+18, {align:'center'});
        } else {
          doc.setTextColor(176,125,0); doc.setFontSize(11);
          doc.text('DA PAGARE - pagamento in contanti in negozio', 14, y);
          doc.setTextColor(180,30,30); doc.setFontSize(13);
          doc.text('PRO FORMA - DA PAGARE', 105, y+18, {align:'center'});
        }
        doc.setTextColor(90,110,130); doc.setFontSize(8);
        doc.text('Documento non fiscale - richiesta di pagamento. Scontrino fiscale rilasciato in negozio.', 14, y+32);
        doc.save(ref ? ('pro-forma-' + ref + '.pdf') : 'pro-forma-da-pagare.pdf');
      }catch(e){}
    });
  }
  function markPaid(orderId){
    var paidItems = CART.slice(), paidTot = tot();
    LAST_PAID = { items: paidItems, tot: paidTot, ref: orderId, info: collectInfo(paidItems) };
    sendSheet('pagato', 'PayPal ' + orderId);
    CART = []; save();
    document.getElementById('cpBd').innerHTML =
      '<div style="text-align:center;padding:40px 16px">'
      + '<div style="font-size:52px">\u2705</div>'
      + '<h3 style="font:800 20px Poppins;color:#003A70;margin:12px 0 6px">Pagamento ricevuto!</h3>'
      + '<p style="color:#5a7a99;font-size:13.5px">Ordine PayPal <b>' + orderId + '</b><br>Riceverai la conferma via email.<br>Porta la pro forma in negozio o inviala su WhatsApp.</p>'
      + '<button class="cp-act cp-pf" style="margin-top:16px" id="cpPfPaid">\uD83D\uDCC4 Vedi fattura pro forma</button>'
      + '</div>';
    document.getElementById('cpTot').textContent = '\u20AC 0,00';
    document.getElementById('cpPfPaid').addEventListener('click', function(){
      buildPF(paidItems, paidTot, orderId);
    });
    renderPP();
  }

  function bumpCart(){
    cartBtn.style.transform = 'scale(1.3)';
    setTimeout(function(){ cartBtn.style.transform = ''; }, 200);
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;right:80px;bottom:calc(92px + env(safe-area-inset-bottom));z-index:945;background:#003A70;color:#FFCC00;font:800 13px Poppins;padding:9px 16px;border-radius:999px;border:2px solid #FFCC00;box-shadow:0 6px 16px rgba(0,0,0,.3);transition:opacity .4s';
    t.textContent = 'Aggiunto al carrello \u2713';
    document.body.appendChild(t);
    setTimeout(function(){ t.style.opacity = '0'; setTimeout(function(){ t.remove(); }, 400); }, 1300);
  }

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
    document.getElementById('cpPf').style.display = CART.length ? '' : 'none';
    document.getElementById('cpWa').style.display = CART.length ? '' : 'none';
    renderPP();
  }

  document.getElementById('cpWa').addEventListener('click', function(){
    if(!CART.length) return;
    sendSheet('da pagare', 'WhatsApp');
  });
  cartBtn.addEventListener('click', function(){
    panel.classList.add('open'); renderCart();
  });
  renderCart();
});