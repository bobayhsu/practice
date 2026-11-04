/* 遊戲頁底部圖示列（2026-11-04）
   和《五大類故事》簡報底部同一排圖示：左邊 影片、說書人、練習、遊戲；右邊 靶心人、五大類、末頁、上一頁、首頁。
   放在簡報的同步視窗裡時，簡報本身已經疊了一排同樣的圖示，所以這裡只留出底部空間，不重複顯示。 */
(()=>{'use strict';
const FS='https://bobayhsu.github.io/fivestory/';
const ICON={"video": "<svg viewBox=\"0 0 24 24\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"3\"/><path d=\"M10 9.2v5.6l4.8-2.8z\" fill=\"currentColor\"/></svg>", "teller": "<svg viewBox=\"0 0 24 24\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1.3\" fill=\"currentColor\"/></svg>", "practice": "<svg viewBox=\"0 0 24 24\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"13.5\" r=\"7.5\"/><path d=\"M12 9.5v4l2.5 2M10 2.5h4M12 2.5V6\"/></svg>", "games": "<svg viewBox=\"0 0 24 24\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"2\" y=\"6\" width=\"20\" height=\"12\" rx=\"6\"/><path d=\"M7 10v4M5 12h4\"/><circle cx=\"15.5\" cy=\"11\" r=\"1\" fill=\"currentColor\"/><circle cx=\"18\" cy=\"13.5\" r=\"1\" fill=\"currentColor\"/></svg>", "formula": "<svg viewBox=\"0 0 24 24\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1.3\" fill=\"currentColor\"/></svg>", "types": "<svg viewBox=\"0 0 24 24\" width=\"30\" height=\"30\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"6\" cy=\"7\" r=\"2.3\"/><circle cx=\"12\" cy=\"7\" r=\"2.3\"/><circle cx=\"18\" cy=\"7\" r=\"2.3\"/><circle cx=\"9\" cy=\"15\" r=\"2.3\"/><circle cx=\"15\" cy=\"15\" r=\"2.3\"/></svg>", "end": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FBF8F3\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 6l7 6-7 6\"/><path d=\"M12 6l7 6-7 6\"/><path d=\"M20 5v14\"/></svg>", "back": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FBF8F3\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 5l-7 7 7 7\"/></svg>", "home": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#FBF8F3\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 11l9-8 9 8\"/><path d=\"M5 10v10h5v-6h4v6h5V10\"/></svg>"};
const inFrame=(()=>{try{return window.self!==window.top;}catch(_){return true;}})();
const st=document.createElement('style');
st.textContent='body{padding-bottom:calc(var(--gbar,64px) + env(safe-area-inset-bottom,0px))!important}'+
 '#gameBar{position:fixed;left:0;right:0;bottom:0;z-index:2147483646;display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 12px calc(8px + env(safe-area-inset-bottom,0px));pointer-events:none}'+
 '#gameBar .g{display:flex;gap:8px;pointer-events:auto}'+
 '#gameBar a{width:44px;height:44px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#FBF8F3;box-shadow:0 3px 8px rgba(0,0,0,.35);text-decoration:none;transition:transform .15s,background .15s}'+
 '#gameBar a:hover{transform:scale(1.08);background:#D2262E!important}'+
 '#gameBar svg{width:24px;height:24px}'+
 '@media (max-width:520px){#gameBar{padding:6px 6px calc(6px + env(safe-area-inset-bottom,0px));gap:4px}#gameBar .g{gap:4px}#gameBar a{width:36px;height:36px}#gameBar svg{width:20px;height:20px}}'+
 '@media (max-width:360px){#gameBar a{width:31px;height:31px}#gameBar svg{width:17px;height:17px}}';
document.head.appendChild(st);
const toG=document.getElementById('toGames');if(toG)toG.style.display='none';
if(inFrame){try{gameSync();}catch(e){console.warn('[遊戲同步] 啟動失敗',e);}return;}
/* 2026-11-04：在簡報同步視窗裡，遊戲裡的操作也讓手機、桌機同步。
   點擊、輸入、送出都會傳給另一台照做；變色賓果有隨機，所以改傳整個盤面。 */
function gameSync(){
  const P=window.parent;const qs=new URLSearchParams(P.location.search);
  if(!qs.has('sync')||!P.firebase||!P.firebase.database)return;
  const room=qs.get('sync')||'demo';if(!/^[A-Za-z0-9_-]{4,60}$/.test(room))return;
  const ref=P.firebase.database().ref('rooms/'+room+'/screen/gameCmd');
  const node='g-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
  const page=location.pathname.split('/').pop()||'index.html';
  const isBingo=!!document.querySelector('.board .tile .tile-number')&&typeof window.updateStatus==='function';
  let seq=0,first=true,lastId='';
  const pathOf=el=>{const p=[];while(el&&el!==document.body){const par=el.parentElement;if(!par)return null;p.unshift([...par.children].indexOf(el));el=par;}return el===document.body?p:null;};
  const byPath=p=>{let el=document.body;for(const i of p||[]){el=el&&el.children[i];}return el||null;};
  const send=(kind,extra)=>{ref.set(Object.assign({id:node+'-'+(++seq),source:node,page,kind,at:P.firebase.database.ServerValue.TIMESTAMP},extra)).catch(e=>console.warn('[遊戲同步] 寫入失敗',e));};
  const bingoState=()=>{const t=[...document.querySelectorAll('.board .tile')];return{nums:t.map(x=>x.dataset.number||''),sel:t.map((x,i)=>x.classList.contains('selected')?i:-1).filter(i=>i>=0),latest:t.findIndex(x=>x.classList.contains('latest'))};};
  const applyBingo=st=>{const t=[...document.querySelectorAll('.board .tile')];if(!st||!Array.isArray(st.nums)||st.nums.length!==t.length)return;
    t.forEach((x,i)=>{const n=st.nums[i];x.dataset.number=n;const l=x.querySelector('.tile-number');if(l)l.textContent=n;x.setAttribute('aria-label','標記 '+n);
      const on=(st.sel||[]).includes(i);x.classList.toggle('selected',on);x.classList.toggle('latest',i===st.latest);x.setAttribute('aria-pressed',String(on));});
    if(st.latest>=0){const x=t[st.latest];x.classList.remove('drawn');void x.offsetWidth;x.classList.add('drawn');}
    try{window.updateStatus();}catch(_){}};
  document.addEventListener('click',e=>{if(!e.isTrusted)return;
    if(e.target.closest&&e.target.closest('#gameBar'))return;
    if(isBingo){setTimeout(()=>send('state',{state:bingoState()}),30);return;}
    const sb=e.target.closest&&e.target.closest('button[type=submit],input[type=submit]');if(sb)return; // 送出交給 submit 事件
    const p=pathOf(e.target);if(p)send('click',{path:p});},true);
  document.addEventListener('input',e=>{if(!e.isTrusted||isBingo)return;const p=pathOf(e.target);if(p)send('input',{path:p,value:String(e.target.value||'')});},true);
  document.addEventListener('submit',e=>{if(!e.isTrusted||isBingo)return;const p=pathOf(e.target);if(p)send('submit',{path:p});},true);
  ref.on('value',snap=>{const c=snap.val();if(first){first=false;return;}
    if(!c||c.source===node||c.id===lastId||c.page!==page)return;lastId=c.id;
    try{
      if(c.kind==='state'&&isBingo){applyBingo(c.state);return;}
      const el=byPath(c.path);if(!el)return;
      if(c.kind==='click')el.click();
      else if(c.kind==='input'){el.value=c.value;el.dispatchEvent(new Event('input',{bubbles:true}));}
      else if(c.kind==='submit'&&el.requestSubmit)el.requestSubmit();
    }catch(err){console.warn('[遊戲同步] 套用失敗',err);}
  },err=>console.warn('[遊戲同步] 讀取失敗',err));
  addEventListener('pagehide',()=>{try{ref.off();}catch(_){}});
}
const mk=(key,title,href,color,onClick)=>{const a=document.createElement('a');a.href=href;a.title=title;a.setAttribute('aria-label',title);
  a.innerHTML=ICON[key];a.style.background=color;const s=a.querySelector('svg');if(s){s.removeAttribute('width');s.removeAttribute('height');}
  if(onClick)a.addEventListener('click',e=>{e.preventDefault();onClick();});return a;};
const blue='#1F5FA8',dark='#1E1C1A';
const bar=document.createElement('nav');bar.id='gameBar';bar.setAttribute('aria-label','導覽列');
const L=document.createElement('div');L.className='g';const R=document.createElement('div');R.className='g';
L.append(
  mk('video','影片','https://bobayhsu.github.io/allbobay/',blue),
  mk('teller','說書人','https://bobayhsu.github.io/bullseye/',blue),
  mk('practice','練習','../',blue),
  mk('games','遊戲','./',blue,()=>location.replace('./')));
R.append(
  mk('formula','靶心人公式',FS+'#2',dark),
  mk('types','五大類故事',FS+'#3',dark),
  mk('end','末頁',FS+'#end',dark),
  mk('back','上一頁','#',dark,()=>{if(history.length>1)history.back();else location.replace('./');}),
  mk('home','回首頁',FS,dark));
bar.append(L,R);
const add=()=>document.body.appendChild(bar);
document.body?add():addEventListener('DOMContentLoaded',add);
})();
