// cart.js — Toca do Coelho Marmitas
(function () {
  'use strict';

  var WPP = '5521997912517';
  var cart = [];

  // ── Estilos ────────────────────────────────────────────────
  var css = `
    .btn-add {
      display: block;
      width: 100%;
      margin-top: 8px;
      padding: 8px 0;
      background: #4a5a3a;
      color: #f5f0e8;
      border: none;
      border-radius: 20px;
      font-size: 0.76rem;
      font-weight: 700;
      cursor: pointer;
      letter-spacing: 0.5px;
      transition: background 0.15s, transform 0.1s;
      font-family: 'Lato', sans-serif;
    }
    .btn-add:hover { background: #5a6e47; }
    .btn-add.tc-ok { background: #c9a96e !important; }

    .btn-combo-add {
      display: block;
      width: 100%;
      margin-top: 14px;
      padding: 11px 0;
      background: #4a5a3a;
      color: #f5f0e8;
      border: none;
      border-radius: 20px;
      font-size: 0.84rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s;
      font-family: 'Lato', sans-serif;
    }
    .btn-combo-add:hover { background: #5a6e47; }
    .btn-combo-add.tc-ok { background: #c9a96e !important; }

    #tc-fab {
      position: fixed;
      bottom: 88px;
      right: 20px;
      z-index: 997;
      display: none;
      align-items: center;
      gap: 8px;
      background: #4a5a3a;
      color: #f5f0e8;
      border: none;
      border-radius: 50px;
      padding: 13px 18px;
      font-family: 'Lato', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 18px rgba(74,90,58,0.5);
      animation: tcPop 0.3s cubic-bezier(.4,0,.2,1);
    }
    @keyframes tcPop {
      from { transform: scale(0.7); opacity: 0; }
      to   { transform: scale(1);   opacity: 1; }
    }
    #tc-badge {
      background: #c9a96e;
      color: #fff;
      border-radius: 50%;
      min-width: 22px;
      height: 22px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      font-weight: 800;
      padding: 0 4px;
    }

    #tc-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 998;
    }
    #tc-drawer {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      max-height: 90vh;
      background: #fff;
      border-radius: 20px 20px 0 0;
      z-index: 999;
      overflow-y: auto;
      padding: 0 18px 30px;
      transform: translateY(100%);
      transition: transform 0.3s cubic-bezier(.4,0,.2,1);
      box-shadow: 0 -4px 30px rgba(0,0,0,0.12);
    }
    #tc-drawer.tc-open { transform: translateY(0); }

    .tc-handle {
      width: 38px; height: 4px;
      background: #e0dbd1;
      border-radius: 2px;
      margin: 14px auto 16px;
    }
    .tc-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
    }
    .tc-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      color: #4a5a3a;
      margin: 0;
    }
    .tc-close {
      background: none;
      border: none;
      font-size: 1.3rem;
      color: #bbb;
      cursor: pointer;
      padding: 4px 6px;
      line-height: 1;
    }
    .tc-close:hover { color: #666; }

    .tc-empty {
      text-align: center;
      color: #bbb;
      font-size: 0.85rem;
      padding: 30px 0;
      font-family: 'Lato', sans-serif;
    }
    .tc-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid #f0ece3;
    }
    .tc-item-info { flex: 1; min-width: 0; }
    .tc-item-nome {
      font-size: 0.8rem;
      color: #333;
      line-height: 1.35;
      font-family: 'Lato', sans-serif;
    }
    .tc-item-det { font-size: 0.68rem; color: #aaa; margin-top: 2px; }
    .tc-item-preco {
      font-size: 0.85rem;
      font-weight: 700;
      color: #4a5a3a;
      min-width: 60px;
      text-align: right;
      font-family: 'Lato', sans-serif;
    }
    .tc-qty {
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .tc-qbtn {
      width: 27px; height: 27px;
      border: 1.5px solid #ccc;
      background: none;
      border-radius: 50%;
      font-size: 1rem;
      color: #555;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      line-height: 1;
    }
    .tc-qbtn:hover { border-color: #4a5a3a; color: #4a5a3a; }
    .tc-qn {
      font-weight: 700;
      min-width: 18px;
      text-align: center;
      font-size: 0.9rem;
      font-family: 'Lato', sans-serif;
    }

    .tc-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 14px;
      padding: 12px 16px;
      background: #f5f0e8;
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.95rem;
      color: #4a5a3a;
      font-family: 'Lato', sans-serif;
    }
    .tc-obs-combo {
      font-size: 0.74rem;
      color: #aaa;
      text-align: center;
      margin-top: 8px;
      font-family: 'Lato', sans-serif;
    }

    .tc-form { margin-top: 16px; }
    .tc-form label {
      display: block;
      font-size: 0.76rem;
      color: #666;
      font-weight: 600;
      margin-bottom: 4px;
      font-family: 'Lato', sans-serif;
    }
    .tc-form input, .tc-form textarea, .tc-form select {
      width: 100%;
      padding: 10px 13px;
      border: 1.5px solid #ddd;
      border-radius: 9px;
      font-family: 'Lato', sans-serif;
      font-size: 0.88rem;
      color: #333;
      margin-bottom: 11px;
      box-sizing: border-box;
      background: #fff;
    }
    .tc-form textarea { resize: vertical; min-height: 60px; }
    .tc-form input:focus, .tc-form textarea:focus, .tc-form select:focus {
      border-color: #4a5a3a;
      outline: none;
    }

    .tc-btn-wpp {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      width: 100%;
      padding: 15px;
      background: #25D366;
      color: #fff;
      border: none;
      border-radius: 12px;
      font-family: 'Lato', sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      margin-top: 12px;
    }
    .tc-btn-wpp:hover { background: #1dbe5a; }
    .tc-btn-clear {
      display: block;
      width: 100%;
      padding: 9px;
      background: none;
      border: 1.5px solid #e8e4dc;
      border-radius: 8px;
      font-size: 0.78rem;
      color: #bbb;
      cursor: pointer;
      margin-top: 8px;
      font-family: 'Lato', sans-serif;
    }

    @media (min-width: 520px) {
      #tc-drawer {
        max-width: 460px;
        left: 50%;
        right: auto;
        transform: translateX(-50%) translateY(100%);
      }
      #tc-drawer.tc-open { transform: translateX(-50%) translateY(0); }
    }
  `;
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  // ── Helpers ────────────────────────────────────────────────
  function fmt(v) { return 'R$ ' + v.toFixed(2).replace('.', ','); }
  function parseP(s) {
    return parseFloat((s || '0').replace('R$', '').replace(',', '.').trim()) || 0;
  }
  function esc(s) {
    return (s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function escKey(k) { return k.replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }

  // ── Estado do carrinho ─────────────────────────────────────
  function total() { return cart.reduce(function(s,i){ return s + i.preco * i.qty; }, 0); }
  function count() { return cart.reduce(function(s,i){ return s + i.qty; }, 0); }

  function addItem(nome, det, preco, btn) {
    var key = nome + '||' + det;
    var found = cart.filter(function(i){ return i.key === key; })[0];
    if (found) { found.qty++; }
    else { cart.push({ key: key, nome: nome, det: det, preco: preco, qty: 1 }); }
    if (btn) {
      var orig = btn.textContent;
      btn.textContent = '✓ Adicionado!';
      btn.classList.add('tc-ok');
      setTimeout(function(){ btn.textContent = orig; btn.classList.remove('tc-ok'); }, 1500);
    }
    updateFab();
  }

  function changeQty(key, d) {
    var idx = -1;
    cart.forEach(function(i, j){ if(i.key===key) idx=j; });
    if (idx < 0) return;
    cart[idx].qty += d;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    renderDrawer();
    updateFab();
  }

  // ── FAB ────────────────────────────────────────────────────
  var fab = document.createElement('button');
  fab.id = 'tc-fab';
  fab.innerHTML = '🛒 Carrinho <span id="tc-badge">0</span>';
  fab.addEventListener('click', openDrawer);
  document.body.appendChild(fab);

  function updateFab() {
    var n = count();
    var badge = document.getElementById('tc-badge');
    if (badge) badge.textContent = n;
    fab.style.display = n > 0 ? 'flex' : 'none';
  }

  // ── Overlay ────────────────────────────────────────────────
  var overlay = document.createElement('div');
  overlay.id = 'tc-overlay';
  overlay.addEventListener('click', closeDrawer);
  document.body.appendChild(overlay);

  // ── Drawer ─────────────────────────────────────────────────
  var drawer = document.createElement('div');
  drawer.id = 'tc-drawer';
  document.body.appendChild(drawer);

  function renderDrawer() {
    var nomeVal = (document.getElementById('tc-nome') || {}).value || '';
    var foneVal = (document.getElementById('tc-fone') || {}).value || '';
    var endVal  = (document.getElementById('tc-end')  || {}).value || '';
    var pagVal  = (document.getElementById('tc-pag')  || {}).value || '';
    var obsVal  = (document.getElementById('tc-obs')  || {}).value || '';
    var temCombo = cart.some(function(i){ return i.det && i.det.indexOf('marmitas à sua escolha') >= 0; });

    var itemsHtml = cart.length === 0
      ? '<div class="tc-empty">Nenhum item adicionado ainda.<br>Clique em &quot;+ Adicionar&quot; nos produtos.</div>'
      : cart.map(function(i) {
          return '<div class="tc-item">' +
            '<div class="tc-item-info">' +
              '<div class="tc-item-nome">' + esc(i.nome) + '</div>' +
              (i.det ? '<div class="tc-item-det">' + esc(i.det) + '</div>' : '') +
            '</div>' +
            '<div class="tc-qty">' +
              '<button class="tc-qbtn" onclick="_tcQty(\'' + escKey(i.key) + '\',-1)">&minus;</button>' +
              '<span class="tc-qn">' + i.qty + '</span>' +
              '<button class="tc-qbtn" onclick="_tcQty(\'' + escKey(i.key) + '\',1)">+</button>' +
            '</div>' +
            '<div class="tc-item-preco">' + fmt(i.preco * i.qty) + '</div>' +
          '</div>';
        }).join('');

    var formHtml = cart.length === 0 ? '' : (
      '<div class="tc-total"><span>Total estimado</span><span>' + fmt(total()) + '</span></div>' +
      (temCombo ? '<p class="tc-obs-combo">⚠️ Combos: informe os pratos desejados nas Observações.</p>' : '') +
      '<div class="tc-form">' +
        '<label>Seu nome *</label>' +
        '<input id="tc-nome" type="text" placeholder="Como posso te chamar?" value="' + esc(nomeVal) + '">' +
        '<label>WhatsApp para confirmação</label>' +
        '<input id="tc-fone" type="tel" placeholder="(21) 9 0000-0000" value="' + esc(foneVal) + '">' +
        '<label>Endereço de entrega</label>' +
        '<input id="tc-end" type="text" placeholder="Rua, número, bairro…" value="' + esc(endVal) + '">' +
        '<label>Forma de pagamento *</label>' +
        '<select id="tc-pag">' +
          '<option value="">Selecione…</option>' +
          '<option value="Pix"' + (pagVal === 'Pix' ? ' selected' : '') + '>Pix</option>' +
          '<option value="Cartão de crédito"' + (pagVal === 'Cartão de crédito' ? ' selected' : '') + '>Cartão de crédito</option>' +
          '<option value="Cartão de débito"' + (pagVal === 'Cartão de débito' ? ' selected' : '') + '>Cartão de débito</option>' +
          '<option value="Dinheiro"' + (pagVal === 'Dinheiro' ? ' selected' : '') + '>Dinheiro</option>' +
        '</select>' +
        '<label>Observações / restrições alimentares</label>' +
        '<textarea id="tc-obs" placeholder="Ex: sem cebola, pratos do combo, alergias…">' + esc(obsVal) + '</textarea>' +
      '</div>' +
      '<button class="tc-btn-wpp" onclick="_tcEnviar()">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
        'Enviar pedido pelo WhatsApp' +
      '</button>' +
      '<button class="tc-btn-clear" onclick="_tcLimpar()">Limpar carrinho</button>'
    );

    drawer.innerHTML =
      '<div class="tc-handle"></div>' +
      '<div class="tc-head">' +
        '<h2 class="tc-title">🛒 Meu Carrinho</h2>' +
        '<button class="tc-close" onclick="_tcClose()">✕</button>' +
      '</div>' +
      itemsHtml +
      formHtml;
  }

  function openDrawer() {
    renderDrawer();
    overlay.style.display = 'block';
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ drawer.classList.add('tc-open'); });
    });
  }
  function closeDrawer() {
    drawer.classList.remove('tc-open');
    setTimeout(function(){ overlay.style.display = 'none'; }, 300);
  }

  // Globals
  window._tcClose   = closeDrawer;
  window._tcLimpar  = function(){ cart = []; updateFab(); renderDrawer(); };
  window._tcQty     = function(key, d){ changeQty(key, d); };
  window._tcEnviar  = function() {
    if (cart.length === 0) { alert('Carrinho vazio!'); return; }
    var nome = ((document.getElementById('tc-nome') || {}).value || '').trim();
    if (!nome) {
      alert('Por favor, informe seu nome para continuar.');
      var el = document.getElementById('tc-nome');
      if (el) el.focus();
      return;
    }
    var pag  = ((document.getElementById('tc-pag')  || {}).value || '').trim();
    if (!pag) {
      alert('Por favor, selecione a forma de pagamento.');
      var elp = document.getElementById('tc-pag');
      if (elp) elp.focus();
      return;
    }
    var fone = ((document.getElementById('tc-fone') || {}).value || '').trim();
    var end  = ((document.getElementById('tc-end')  || {}).value || '').trim();
    var obs  = ((document.getElementById('tc-obs')  || {}).value || '').trim();

    var linhas = cart.map(function(i){
      return '• ' + i.qty + 'x ' + i.nome + (i.det ? ' (' + i.det + ')' : '') + ' — ' + fmt(i.preco * i.qty);
    }).join('\n');

    var msg = '🛒 *PEDIDO MARMITAS — TOCA DO COELHO*\n\n';
    msg += '📦 *Itens:*\n' + linhas + '\n\n';
    msg += '💰 *Total estimado: ' + fmt(total()) + '*\n';
    msg += '💳 *Pagamento:* ' + pag + '\n';
    msg += '👤 *Nome:* ' + nome + '\n';
    if (fone) msg += '📱 *Telefone:* ' + fone + '\n';
    if (end)  msg += '📍 *Endereço:* ' + end + '\n';
    if (obs)  msg += '📝 *Obs:* ' + obs + '\n';
    msg += '\n_Pedido via site · ' + new Date().toLocaleDateString('pt-BR') + '_';

    var url = 'https://wa.me/' + WPP + '?text=' + encodeURIComponent(msg);
    window.open(url, '_blank');
    closeDrawer();
  };

  // ── Injetar botões nos cards ───────────────────────────────
  function inject() {
    // Marmitas (.card) — IIFE no card para corrigir closure de var
    var cards = document.querySelectorAll('.card');
    for (var c = 0; c < cards.length; c++) {
      (function(card) {
        if (card.dataset.tcDone) return;
        card.dataset.tcDone = '1';
        var nomeEl = card.querySelector('.card-nome');
        if (!nomeEl) return;
        var boxes = card.querySelectorAll('.preco-box');
        for (var b = 0; b < boxes.length; b++) {
          (function(box) {
            var vol  = (box.querySelector('.preco-vol')  || {}).textContent || '';
            var gram = (box.querySelector('.preco-gram') || {}).textContent || '';
            var pStr = (box.querySelector('.preco-val')  || {}).textContent || '0';
            var preco = parseP(pStr);
            if (!preco) return;
            var det = [vol.trim(), gram.trim()].filter(Boolean).join(' · ');
            var btn = document.createElement('button');
            btn.className = 'btn-add';
            btn.textContent = '+ Adicionar';
            btn.addEventListener('click', function() {
              // lê o nome no momento do clique (evita closure stale)
              var nome = nomeEl.textContent.trim();
              addItem(nome, det, preco, btn);
            });
            box.appendChild(btn);
          })(boxes[b]);
        }
      })(cards[c]);
    }

    // Combos (.combo-card)
    var combos = document.querySelectorAll('.combo-card');
    for (var k = 0; k < combos.length; k++) {
      (function(card){
        if (card.dataset.tcDone) return;
        card.dataset.tcDone = '1';
        var badge = (card.querySelector('.combo-badge') || {}).textContent || 'Combo';
        var qtd   = (card.querySelector('.combo-qtd')   || {}).textContent || '';
        var totalEl = card.querySelector('.total');
        var preco = totalEl ? parseP(totalEl.textContent) : 0;
        if (!preco) return;
        var btn = document.createElement('button');
        btn.className = 'btn-combo-add';
        btn.textContent = '+ Quero o ' + badge.trim();
        btn.addEventListener('click', function(){ addItem(badge.trim(), (qtd.trim() || '?') + ' marmitas à sua escolha', preco, btn); });
        card.appendChild(btn);
      })(combos[k]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  // Reinjetar ao trocar de aba
  document.addEventListener('click', function(e){
    if (e.target && e.target.classList.contains('aba')) {
      setTimeout(inject, 60);
    }
  });

})();
