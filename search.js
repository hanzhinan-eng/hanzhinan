/* 韩国生活指南 · 站内搜索 (2026-10-26)
   - 不用 Google 等外部搜索：第一次点搜索框时，把公开页面读进来，在浏览器里找
   - 结果链接到「页面#标签」（各页的 showTab 会打开对应标签）
   - 当前语言是中文就搜中文内容，是韩语就搜韩语内容（没有韩语的部分照样能搜到）
   - 要加新页面：在 PAGES 里加一行；숨은 페이지(booktree·eng-quiz·my-english·my-mom-cards)는 넣지 않음 */
(function(){
  var PAGES=[
    ['/butie','信息','정보'],['/jiaoyu','上学','학교'],['/zhufang','住房','주거'],['/mama','资格证','자격증'],
    ['/gongzuo','找工作','일자리'],['/lvyou','旅游','여행'],['/anquan','安全','안전'],['/yuyan','语言','언어'],
    ['/hsk','中文 HSK','중국어 HSK'],['/yingyu','英语 800 词','초등 영단어'],['/hanyu','韩语','한국어'],
    ['/lvxing','旅行韩语','여행 한국어'],['/guanyu','关于本站','소개']
  ];
  var BLOCKS='h2,h3,h4,p,li,tr,dt,dd,summary,.ntc-sum';
  var box=document.getElementById('sq'), out=document.getElementById('sq-out');
  if(!box||!out) return;
  var docs=null, loading=null, timer=null;
  function lang(){ return document.documentElement.getAttribute('data-lang')==='ko'?'ko':'zh'; }
  function esc(t){ return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function clean(t){ return (t||'').replace(/\s+/g,' ').trim(); }

  function load(){
    if(docs) return Promise.resolve(docs);
    if(loading) return loading;
    out.innerHTML='<p class="sq-msg">'+(lang()==='ko'?'불러오는 중…':'正在读取各页面…')+'</p>';
    loading=Promise.all(PAGES.map(function(pg){
      return fetch(pg[0],{credentials:'same-origin'}).then(function(r){return r.ok?r.text():'';}).then(function(html){
        return html?{pg:pg,doc:new DOMParser().parseFromString(html,'text/html')}:null;
      }).catch(function(){return null;});
    })).then(function(list){ docs=list.filter(Boolean); return docs; });
    return loading;
  }

  // 一个块的文字（去掉另一种语言）
  function textOf(el,L){
    var c=el.cloneNode(true);
    c.querySelectorAll(L==='ko'?'.zh':'.ko').forEach(function(x){x.remove();});
    c.querySelectorAll('script,style,svg,button').forEach(function(x){x.remove();});
    c.querySelectorAll('td,th,small,dd,dt,br').forEach(function(x){ x.insertAdjacentText('afterend',' · '); });
    if(L==='ko'){ c.querySelectorAll('[data-ko]').forEach(function(x){x.textContent=x.getAttribute('data-ko');}); if(c.hasAttribute&&c.hasAttribute('data-ko')) c.textContent=c.getAttribute('data-ko'); }
    return clean(c.textContent).replace(/(\s·\s*)+$/,'').replace(/(\s*·\s*){2,}/g,' · ');
  }
  // 块所在的标签（panel id = 「x-名字」 → 链接 #名字）和标签名
  function where(el,doc,L){
    var panel=el.closest('.panel'), hash='', tab='';
    if(panel&&panel.id&&/^[a-z]-/.test(panel.id)){
      hash=panel.id.replace(/^[a-z]-/,'');
      var t=doc.querySelector('.subnav [data-tab="'+hash+'"]');
      if(t) tab=textOf(t,L);
    }
    // 最近的上一个小标题
    var head='', n=el;
    while(n&&n!==doc.body&&!head){
      var p=n.previousElementSibling;
      while(p&&!head){ if(/^H[23]$/.test(p.tagName)&&!p.classList.contains(L==='ko'?'zh':'ko')) head=textOf(p,L); else { var h=p.querySelector&&p.querySelector('h2,h3'); if(h&&p.tagName!=='SECTION') head=textOf(h,L);} p=p.previousElementSibling; }
      n=n.parentElement;
    }
    return {hash:hash,tab:tab,head:head};
  }
  function snippet(t,terms){
    var low=t.toLowerCase(), i=low.indexOf(terms[0]); if(i<0) i=0;
    var s=Math.max(0,i-28), e=Math.min(t.length,i+terms[0].length+60);
    var part=(s>0?'…':'')+t.slice(s,e)+(e<t.length?'…':'');
    var h=esc(part);
    terms.forEach(function(w){ if(!w) return; var re=new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'); h=h.replace(re,function(m){return '<mark>'+m+'</mark>';}); });
    return h;
  }
  function search(q){
    var L=lang(), terms=clean(q).toLowerCase().split(' ').filter(Boolean);
    if(!terms.length){ out.innerHTML=''; return; }
    load().then(function(list){
      if(clean(box.value).toLowerCase()!==terms.join(' ')) return;   // 输入已经变了
      var hits=[], seen={};
      list.forEach(function(d){
        var main=d.doc.querySelector('.site')||d.doc.body;
        main.querySelectorAll(BLOCKS).forEach(function(el){
          if(el.closest('nav,.subnav,.tabs,footer,script,.evf')) return;
          if(el.closest(L==='ko'?'.zh':'.ko')) return;   // 另一种语言的块
          if(el.querySelector(BLOCKS)&&el.tagName!=='TR') return;   // 只用最里面的块
          var t=textOf(el,L); if(t.length<2) return;
          var low=t.toLowerCase();
          if(!terms.every(function(w){return low.indexOf(w)>=0;})) return;
          var w=where(el,d.doc,L), key=d.pg[0]+'#'+w.hash+'|'+w.head+'|'+t.slice(0,40);
          if(seen[key]) return; seen[key]=1;
          var score=(/^H[234]$/.test(el.tagName)?3:0)+(low.indexOf(terms[0])<20?1:0)-(el.closest('.upd')?5:0);   // 更新记录排最后
          hits.push({d:d,w:w,t:t,score:score});
        });
      });
      hits.sort(function(a,b){return b.score-a.score;});
      var MAX=20;
      if(!hits.length){ out.innerHTML='<p class="sq-msg">'+(L==='ko'?'찾는 내용이 없어요. 다른 단어로 해 보세요.':'没找到。换个词试试，比如只输两个字。')+'</p>'; return; }
      out.innerHTML='<p class="sq-msg">'+(L==='ko'?hits.length+'곳에서 찾았어요':'找到 '+hits.length+' 处')+(hits.length>MAX?(L==='ko'?' (앞의 '+MAX+'개만 보여요)':'（只显示前 '+MAX+' 条）'):'')+'</p><ul class="sq-list">'+
        hits.slice(0,MAX).map(function(h){
          var name=L==='ko'?h.d.pg[2]:h.d.pg[1], path=[name,h.w.tab,h.w.head].filter(Boolean).join(' › ');
          return '<li><a href="'+h.d.pg[0]+(h.w.hash?'#'+h.w.hash:'')+'"><small>'+esc(path)+'</small><span>'+snippet(h.t,terms)+'</span></a></li>';
        }).join('')+'</ul>';
    });
  }
  box.addEventListener('focus',load,{once:true});
  box.addEventListener('input',function(){ clearTimeout(timer); timer=setTimeout(function(){search(box.value);},250); });
  var form=box.form; if(form) form.addEventListener('submit',function(e){e.preventDefault();search(box.value);});
  document.querySelectorAll('[data-sq]').forEach(function(b){ b.addEventListener('click',function(){ box.value=b.getAttribute('data-sq'); search(box.value); }); });
  document.addEventListener('hz-lang',function(){ if(clean(box.value)) search(box.value); });
})();
