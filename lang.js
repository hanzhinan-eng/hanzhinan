/* 韩国生活指南 · 中文/한국어 切换
   规则：
   - <html data-lang="zh|ko">：当前语言。CSS 用它隐藏 .zh 或 .ko 元素
   - 任何带 data-ko="…" 的元素：切到韩语时文字换成 data-ko，切回时还原
   - 带 data-ko-ph 的输入框：placeholder 同上
   - <html data-ko="none|part|full">：这一页有多少韩语。none/part 时切到韩语会在正文顶部提示
   - 记住选择：localStorage hz-lang；网址 ?lang=ko 也能指定 */
(function(){
  var KEY='hz-lang', root=document.documentElement;
  function saved(){ try{ return localStorage.getItem(KEY); }catch(e){ return null; } }
  function save(v){ try{ localStorage.setItem(KEY,v); }catch(e){} }
  var q=(location.search.match(/[?&]lang=(zh|ko)/)||[])[1];
  var cur=q||saved()||'zh';
  if(q) save(q);

  function swapText(el,toKo){
    if(toKo){ if(el.dataset.zh===undefined) el.dataset.zh=el.textContent; el.textContent=el.dataset.ko; }
    else if(el.dataset.zh!==undefined) el.textContent=el.dataset.zh;
  }
  function apply(lang){
    cur=lang; root.setAttribute('data-lang',lang); root.setAttribute('lang',lang==='ko'?'ko':'zh-CN');
    var toKo=lang==='ko';
    document.querySelectorAll('[data-ko]').forEach(function(el){ if(el!==root) swapText(el,toKo); });
    document.querySelectorAll('[data-ko-ph]').forEach(function(el){
      if(toKo){ if(el.dataset.zhPh===undefined) el.dataset.zhPh=el.placeholder; el.placeholder=el.dataset.koPh; }
      else if(el.dataset.zhPh!==undefined) el.placeholder=el.dataset.zhPh;
    });
    var btn=document.getElementById('lang-btn');
    if(btn){ btn.textContent=toKo?'中文':'한국어'; btn.setAttribute('aria-label',toKo?'切换到中文':'한국어로 보기'); }
    var note=document.getElementById('ko-note');
    if(note) note.hidden=!toKo;
    try{ document.dispatchEvent(new CustomEvent('hz-lang',{detail:lang})); }catch(e){}
  }
  function makeNote(){
    var level=root.getAttribute('data-ko')||'none';
    if(level==='full') return;
    var site=document.querySelector('.site'); if(!site) return;
    var p=document.createElement('p'); p.id='ko-note'; p.className='ko-note'; p.hidden=true;
    p.innerHTML=(level==='part'
      ? '이 페이지는 제목과 안내만 한국어예요. 본문은 아직 중국어만 있어요.'
      : '이 페이지는 아직 중국어만 있어요. 한국어 안내가 있는 곳: ')
      + (level==='part' ? '' : '<a href="/">홈</a> · <a href="/guanyu">이 사이트에 대해</a> · <a href="/jiaoyu#notice">정부 지원</a> · <a href="/hsk">중국어 HSK</a> · <a href="/yingyu">초등 영단어</a>');
    var first=site.querySelector('.crumb, h1, .home-hero') || site.firstElementChild;
    site.insertBefore(p, first);
  }
  document.addEventListener('DOMContentLoaded',function(){
    makeNote();
    var btn=document.getElementById('lang-btn');
    if(btn) btn.addEventListener('click',function(){ var n=cur==='ko'?'zh':'ko'; save(n); apply(n); });
    apply(cur);
  });
  root.setAttribute('data-lang',cur); /* 先设一次，避免闪一下 */
})();
