/* 웹툰 회차 보기 화면 — 위 고정 막대(목록·이전화·다음화), 아래로 내리면 숨고 올리면 나타남,
 * 오른쪽 아래 맨 위·맨 아래 둥근 버튼, 회차 끝 안내 상자.
 * 회차 HTML 끝에 <script src="viewer.js" data-series=".." data-ep=".." data-list=".." data-prev=".." data-next=".."></script> 로 붙인다. */
(function () {
  var me = document.currentScript;
  var d = (me && me.dataset) || {};
  var series = d.series || '';
  var ep = d.ep || document.title;
  var list = d.list || '../#webtoon';
  var prev = d.prev || '';
  var next = d.next || '';

  var css = [
    '.wv-bar{position:fixed;left:0;right:0;top:0;z-index:100;height:56px;background:rgba(28,30,36,.97);color:#fff;',
    'font-family:"SUIT","Pretendard","Noto Sans KR","Malgun Gothic",sans-serif;transition:transform .25s ease;box-shadow:0 1px 0 rgba(255,255,255,.06)}',
    '.wv-bar.hide{transform:translateY(-100%)}',
    '.wv-in{height:100%;max-width:1200px;margin:0 auto;padding:0 12px 0 4px;display:flex;align-items:center;gap:12px}',
    '.wv-tt{display:flex;align-items:center;gap:10px;min-width:0;flex:1;color:#fff;text-decoration:none}',
    '.wv-back{flex:none;width:40px;height:40px;display:grid;place-items:center;border-radius:50%}',
    '.wv-back:hover{background:rgba(255,255,255,.1)}',
    '.wv-s{font-size:17px;font-weight:800;white-space:nowrap}',
    '.wv-d{width:1px;height:14px;background:rgba(255,255,255,.3);flex:none}',
    '.wv-e{font-size:15px;color:#d6d9e0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.wv-nav{display:flex;align-items:center;gap:2px;flex:none}',
    '.wv-nav a,.wv-nav span{display:flex;align-items:center;gap:5px;height:36px;padding:0 12px;border-radius:18px;color:#fff;',
    'font-size:14px;font-weight:600;text-decoration:none;white-space:nowrap}',
    '.wv-nav a:hover{background:rgba(255,255,255,.1)}',
    '.wv-nav span{color:rgba(255,255,255,.35);cursor:default}',
    '.wv-nav i{width:1px;height:12px;background:rgba(255,255,255,.2)}',
    '.wv-nav svg,.wv-back svg,.wv-fab svg,.wv-end svg{width:18px;height:18px;flex:none}',
    'body{padding-top:56px}',
    '.wv-fab{position:fixed;right:20px;bottom:24px;z-index:100;display:flex;flex-direction:column;gap:10px}',
    '.wv-fab button{width:48px;height:48px;border-radius:50%;border:1px solid #d7d9de;background:#fff;color:#333;cursor:pointer;',
    'display:grid;place-items:center;box-shadow:0 2px 10px rgba(0,0,0,.12)}',
    '.wv-fab button:hover{background:#f3f4f6}',
    '.wv-end{width:min(100vw,720px);margin:0 auto 60px;background:#fff;border-top:1px solid #e5e6ea;padding:28px 20px 32px;',
    'font-family:"SUIT","Pretendard","Noto Sans KR","Malgun Gothic",sans-serif;text-align:center}',
    '.wv-end b{display:block;font-size:18px;color:#1d1d1d}',
    '.wv-end p{margin-top:6px;font-size:14px;color:#888}',
    '.wv-end .r{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:20px}',
    '.wv-end a,.wv-end span{display:flex;align-items:center;justify-content:center;gap:6px;height:48px;border-radius:8px;border:1px solid #dcdfe4;',
    'font-size:15px;font-weight:700;color:#333;text-decoration:none;background:#fff}',
    '.wv-end a:hover{background:#f6f7f9}',
    '.wv-end a.p{background:#1c64ac;border-color:#1c64ac;color:#fff}',
    '.wv-end a.p:hover{background:#3a457f}',
    '.wv-end span{color:#b5b8bf;background:#f7f8fa}',
    '@media (max-width:640px){.wv-s{font-size:15px}.wv-e{font-size:13px}.wv-nav a,.wv-nav span{padding:0 8px;font-size:13px}',
    '.wv-nav .t{display:none}.wv-nav i{display:none}.wv-fab{right:12px;bottom:16px}.wv-fab button{width:42px;height:42px}}',
    '@media (max-width:640px){.wv-end{padding-bottom:130px;margin-bottom:0}}',
    '@media (max-width:340px){.wv-d,.wv-e{display:none}}',
    '@media print{.wv-bar,.wv-fab{display:none}body{padding-top:0}}'
  ].join('');
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var I = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 6v12L7 12z"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 6v12l8-6z"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 7h14M5 12h14M5 17h14"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>'
  };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var link = function (href, icon, text, cls) {
    return href
      ? '<a href="' + esc(href) + '"' + (cls ? ' class="' + cls + '"' : '') + '>' + icon + text + '</a>'
      : '<span aria-disabled="true">' + icon + text + '</span>';
  };

  // 위 막대
  var bar = document.createElement('header');
  bar.className = 'wv-bar';
  bar.innerHTML =
    '<div class="wv-in">' +
      '<a class="wv-tt" href="' + esc(list) + '" title="작품 목록으로">' +
        '<span class="wv-back" aria-hidden="true">' + I.back + '</span>' +
        '<span class="wv-s">' + esc(series) + '</span><span class="wv-d" aria-hidden="true"></span>' +
        '<span class="wv-e">' + esc(ep) + '</span>' +
      '</a>' +
      '<nav class="wv-nav" aria-label="회차 이동">' +
        link(prev, I.prev, '<b class="t">이전화</b>') + '<i aria-hidden="true"></i>' +
        link(list, I.list, '<b class="t">목록</b>') + '<i aria-hidden="true"></i>' +
        link(next, '', '<b class="t">다음화</b>' + I.next) +
      '</nav>' +
    '</div>';
  document.body.insertBefore(bar, document.body.firstChild);

  // 회차 끝 안내
  var strip = document.getElementById('strip');
  var end = document.createElement('section');
  end.className = 'wv-end';
  end.innerHTML =
    '<b>' + esc(series) + ' · ' + esc(ep) + '</b>' +
    '<p>' + (next ? '다음 화로 바로 이어서 볼 수 있습니다.' : '다음 화는 준비 중입니다.') + '</p>' +
    '<div class="r">' +
      link(prev, I.prev, '이전화') +
      link(list, I.list, '목록') +
      (next ? link(next, '', '다음화' + I.next, 'p') : '<span aria-disabled="true">준비 중</span>') +
    '</div>';
  if (strip && strip.parentNode) strip.parentNode.insertBefore(end, strip.nextSibling);
  else document.body.appendChild(end);

  // 맨 위 · 맨 아래 버튼
  var fab = document.createElement('div');
  fab.className = 'wv-fab';
  fab.innerHTML = '<button type="button" aria-label="맨 위로">' + I.up + '</button><button type="button" aria-label="맨 아래로">' + I.down + '</button>';
  document.body.appendChild(fab);
  var bt = fab.querySelectorAll('button');
  bt[0].onclick = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  bt[1].onclick = function () { window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }); };

  // 내리면 숨기고, 올리거나 맨 위·맨 아래에 닿으면 보이기. 그림을 누르면 막대를 껐다 켰다
  var last = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    var atEnd = y + window.innerHeight >= document.documentElement.scrollHeight - 40;
    if (y < 60 || atEnd || y < last - 4) bar.classList.remove('hide');
    else if (y > last + 4) bar.classList.add('hide');
    last = y;
  }, { passive: true });
  if (strip) strip.addEventListener('click', function (e) {
    if (e.target.closest('a,button')) return;
    bar.classList.toggle('hide');
  });

  // 키보드: ← 이전화, → 다음화
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowLeft' && prev) location.href = prev;
    if (e.key === 'ArrowRight' && next) location.href = next;
  });
})();
