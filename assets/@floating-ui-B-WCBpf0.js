const z=Math.min,V=Math.max,Z=Math.round,Q=Math.floor,N=t=>({x:t,y:t}),Lt={left:"right",right:"left",bottom:"top",top:"bottom"},Pt={start:"end",end:"start"};function st(t,e,o){return V(t,z(e,o))}function K(t,e){return typeof t=="function"?t(e):t}function W(t){return t.split("-")[0]}function G(t){return t.split("-")[1]}function xt(t){return t==="x"?"y":"x"}function ct(t){return t==="y"?"height":"width"}function nt(t){return["top","bottom"].includes(W(t))?"y":"x"}function lt(t){return xt(nt(t))}function St(t,e,o){o===void 0&&(o=!1);const n=G(t),i=lt(t),r=ct(i);let s=i==="x"?n===(o?"end":"start")?"right":"left":n==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(s=tt(s)),[s,tt(s)]}function Dt(t){const e=tt(t);return[rt(t),e,rt(e)]}function rt(t){return t.replace(/start|end/g,e=>Pt[e])}function kt(t,e,o){const n=["left","right"],i=["right","left"],r=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return o?e?i:n:e?n:i;case"left":case"right":return e?r:s;default:return[]}}function Ft(t,e,o,n){const i=G(t);let r=kt(W(t),o==="start",n);return i&&(r=r.map(s=>s+"-"+i),e&&(r=r.concat(r.map(rt)))),r}function tt(t){return t.replace(/left|right|bottom|top/g,e=>Lt[e])}function Nt(t){return{top:0,right:0,bottom:0,left:0,...t}}function yt(t){return typeof t!="number"?Nt(t):{top:t,right:t,bottom:t,left:t}}function et(t){const{x:e,y:o,width:n,height:i}=t;return{width:n,height:i,top:o,left:e,right:e+n,bottom:o+i,x:e,y:o}}function gt(t,e,o){let{reference:n,floating:i}=t;const r=nt(e),s=lt(e),c=ct(s),l=W(e),f=r==="y",d=n.x+n.width/2-i.width/2,u=n.y+n.height/2-i.height/2,g=n[c]/2-i[c]/2;let a;switch(l){case"top":a={x:d,y:n.y-i.height};break;case"bottom":a={x:d,y:n.y+n.height};break;case"right":a={x:n.x+n.width,y:u};break;case"left":a={x:n.x-i.width,y:u};break;default:a={x:n.x,y:n.y}}switch(G(e)){case"start":a[s]-=g*(o&&f?-1:1);break;case"end":a[s]+=g*(o&&f?-1:1);break}return a}const Bt=async(t,e,o)=>{const{placement:n="bottom",strategy:i="absolute",middleware:r=[],platform:s}=o,c=r.filter(Boolean),l=await(s.isRTL==null?void 0:s.isRTL(e));let f=await s.getElementRects({reference:t,floating:e,strategy:i}),{x:d,y:u}=gt(f,n,l),g=n,a={},m=0;for(let h=0;h<c.length;h++){const{name:w,fn:p}=c[h],{x,y,data:b,reset:v}=await p({x:d,y:u,initialPlacement:n,placement:g,strategy:i,middlewareData:a,rects:f,platform:s,elements:{reference:t,floating:e}});d=x??d,u=y??u,a={...a,[w]:{...a[w],...b}},v&&m<=50&&(m++,typeof v=="object"&&(v.placement&&(g=v.placement),v.rects&&(f=v.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:i}):v.rects),{x:d,y:u}=gt(f,g,l)),h=-1)}return{x:d,y:u,placement:g,strategy:i,middlewareData:a}};async function ft(t,e){var o;e===void 0&&(e={});const{x:n,y:i,platform:r,rects:s,elements:c,strategy:l}=t,{boundary:f="clippingAncestors",rootBoundary:d="viewport",elementContext:u="floating",altBoundary:g=!1,padding:a=0}=K(e,t),m=yt(a),w=c[g?u==="floating"?"reference":"floating":u],p=et(await r.getClippingRect({element:(o=await(r.isElement==null?void 0:r.isElement(w)))==null||o?w:w.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(c.floating)),boundary:f,rootBoundary:d,strategy:l})),x=u==="floating"?{x:n,y:i,width:s.floating.width,height:s.floating.height}:s.reference,y=await(r.getOffsetParent==null?void 0:r.getOffsetParent(c.floating)),b=await(r.isElement==null?void 0:r.isElement(y))?await(r.getScale==null?void 0:r.getScale(y))||{x:1,y:1}:{x:1,y:1},v=et(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:x,offsetParent:y,strategy:l}):x);return{top:(p.top-v.top+m.top)/b.y,bottom:(v.bottom-p.bottom+m.bottom)/b.y,left:(p.left-v.left+m.left)/b.x,right:(v.right-p.right+m.right)/b.x}}const Mt=t=>({name:"arrow",options:t,async fn(e){const{x:o,y:n,placement:i,rects:r,platform:s,elements:c,middlewareData:l}=e,{element:f,padding:d=0}=K(t,e)||{};if(f==null)return{};const u=yt(d),g={x:o,y:n},a=lt(i),m=ct(a),h=await s.getDimensions(f),w=a==="y",p=w?"top":"left",x=w?"bottom":"right",y=w?"clientHeight":"clientWidth",b=r.reference[m]+r.reference[a]-g[a]-r.floating[m],v=g[a]-r.reference[a],C=await(s.getOffsetParent==null?void 0:s.getOffsetParent(f));let T=C?C[y]:0;(!T||!await(s.isElement==null?void 0:s.isElement(C)))&&(T=c.floating[y]||r.floating[m]);const M=b/2-v/2,j=T/2-h[m]/2-1,X=z(u[p],j),Y=z(u[x],j),R=X,q=T-h[m]-Y,A=T/2-h[m]/2+M,L=st(R,A,q),P=!l.arrow&&G(i)!=null&&A!==L&&r.reference[m]/2-(A<R?X:Y)-h[m]/2<0,k=P?A<R?A-R:A-q:0;return{[a]:g[a]+k,data:{[a]:L,centerOffset:A-L-k,...P&&{alignmentOffset:k}},reset:P}}}),Vt=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,n;const{placement:i,middlewareData:r,rects:s,initialPlacement:c,platform:l,elements:f}=e,{mainAxis:d=!0,crossAxis:u=!0,fallbackPlacements:g,fallbackStrategy:a="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:h=!0,...w}=K(t,e);if((o=r.arrow)!=null&&o.alignmentOffset)return{};const p=W(i),x=W(c)===c,y=await(l.isRTL==null?void 0:l.isRTL(f.floating)),b=g||(x||!h?[tt(c)]:Dt(c));!g&&m!=="none"&&b.push(...Ft(c,h,m,y));const v=[c,...b],C=await ft(e,w),T=[];let M=((n=r.flip)==null?void 0:n.overflows)||[];if(d&&T.push(C[p]),u){const R=St(i,s,y);T.push(C[R[0]],C[R[1]])}if(M=[...M,{placement:i,overflows:T}],!T.every(R=>R<=0)){var j,X;const R=(((j=r.flip)==null?void 0:j.index)||0)+1,q=v[R];if(q)return{data:{index:R,overflows:M},reset:{placement:q}};let A=(X=M.filter(L=>L.overflows[0]<=0).sort((L,P)=>L.overflows[1]-P.overflows[1])[0])==null?void 0:X.placement;if(!A)switch(a){case"bestFit":{var Y;const L=(Y=M.map(P=>[P.placement,P.overflows.filter(k=>k>0).reduce((k,Tt)=>k+Tt,0)]).sort((P,k)=>P[1]-k[1])[0])==null?void 0:Y[0];L&&(A=L);break}case"initialPlacement":A=c;break}if(i!==A)return{reset:{placement:A}}}return{}}}};async function Wt(t,e){const{placement:o,platform:n,elements:i}=t,r=await(n.isRTL==null?void 0:n.isRTL(i.floating)),s=W(o),c=G(o),l=nt(o)==="y",f=["left","top"].includes(s)?-1:1,d=r&&l?-1:1,u=K(e,t);let{mainAxis:g,crossAxis:a,alignmentAxis:m}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...u};return c&&typeof m=="number"&&(a=c==="end"?m*-1:m),l?{x:a*d,y:g*f}:{x:g*f,y:a*d}}const Ht=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var o,n;const{x:i,y:r,placement:s,middlewareData:c}=e,l=await Wt(e,t);return s===((o=c.offset)==null?void 0:o.placement)&&(n=c.arrow)!=null&&n.alignmentOffset?{}:{x:i+l.x,y:r+l.y,data:{...l,placement:s}}}}},$t=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:n,placement:i}=e,{mainAxis:r=!0,crossAxis:s=!1,limiter:c={fn:w=>{let{x:p,y:x}=w;return{x:p,y:x}}},...l}=K(t,e),f={x:o,y:n},d=await ft(e,l),u=nt(W(i)),g=xt(u);let a=f[g],m=f[u];if(r){const w=g==="y"?"top":"left",p=g==="y"?"bottom":"right",x=a+d[w],y=a-d[p];a=st(x,a,y)}if(s){const w=u==="y"?"top":"left",p=u==="y"?"bottom":"right",x=m+d[w],y=m-d[p];m=st(x,m,y)}const h=c.fn({...e,[g]:a,[u]:m});return{...h,data:{x:h.x-o,y:h.y-n}}}}};function I(t){return vt(t)?(t.nodeName||"").toLowerCase():"#document"}function O(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function F(t){var e;return(e=(vt(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function vt(t){return t instanceof Node||t instanceof O(t).Node}function S(t){return t instanceof Element||t instanceof O(t).Element}function D(t){return t instanceof HTMLElement||t instanceof O(t).HTMLElement}function ht(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof O(t).ShadowRoot}function J(t){const{overflow:e,overflowX:o,overflowY:n,display:i}=E(t);return/auto|scroll|overlay|hidden|clip/.test(e+n+o)&&!["inline","contents"].includes(i)}function zt(t){return["table","td","th"].includes(I(t))}function at(t){const e=ut(),o=E(t);return o.transform!=="none"||o.perspective!=="none"||(o.containerType?o.containerType!=="normal":!1)||!e&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!e&&(o.filter?o.filter!=="none":!1)||["transform","perspective","filter"].some(n=>(o.willChange||"").includes(n))||["paint","layout","strict","content"].some(n=>(o.contain||"").includes(n))}function _t(t){let e=B(t);for(;D(e)&&!_(e);){if(at(e))return e;e=B(e)}return null}function ut(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function _(t){return["html","body","#document"].includes(I(t))}function E(t){return O(t).getComputedStyle(t)}function ot(t){return S(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function B(t){if(I(t)==="html")return t;const e=t.assignedSlot||t.parentNode||ht(t)&&t.host||F(t);return ht(e)?e.host:e}function bt(t){const e=B(t);return _(e)?t.ownerDocument?t.ownerDocument.body:t.body:D(e)&&J(e)?e:bt(e)}function U(t,e,o){var n;e===void 0&&(e=[]),o===void 0&&(o=!0);const i=bt(t),r=i===((n=t.ownerDocument)==null?void 0:n.body),s=O(i);return r?e.concat(s,s.visualViewport||[],J(i)?i:[],s.frameElement&&o?U(s.frameElement):[]):e.concat(i,U(i,[],o))}function At(t){const e=E(t);let o=parseFloat(e.width)||0,n=parseFloat(e.height)||0;const i=D(t),r=i?t.offsetWidth:o,s=i?t.offsetHeight:n,c=Z(o)!==r||Z(n)!==s;return c&&(o=r,n=s),{width:o,height:n,$:c}}function dt(t){return S(t)?t:t.contextElement}function $(t){const e=dt(t);if(!D(e))return N(1);const o=e.getBoundingClientRect(),{width:n,height:i,$:r}=At(e);let s=(r?Z(o.width):o.width)/n,c=(r?Z(o.height):o.height)/i;return(!s||!Number.isFinite(s))&&(s=1),(!c||!Number.isFinite(c))&&(c=1),{x:s,y:c}}const It=N(0);function Ot(t){const e=O(t);return!ut()||!e.visualViewport?It:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function jt(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==O(t)?!1:e}function H(t,e,o,n){e===void 0&&(e=!1),o===void 0&&(o=!1);const i=t.getBoundingClientRect(),r=dt(t);let s=N(1);e&&(n?S(n)&&(s=$(n)):s=$(t));const c=jt(r,o,n)?Ot(r):N(0);let l=(i.left+c.x)/s.x,f=(i.top+c.y)/s.y,d=i.width/s.x,u=i.height/s.y;if(r){const g=O(r),a=n&&S(n)?O(n):n;let m=g,h=m.frameElement;for(;h&&n&&a!==m;){const w=$(h),p=h.getBoundingClientRect(),x=E(h),y=p.left+(h.clientLeft+parseFloat(x.paddingLeft))*w.x,b=p.top+(h.clientTop+parseFloat(x.paddingTop))*w.y;l*=w.x,f*=w.y,d*=w.x,u*=w.y,l+=y,f+=b,m=O(h),h=m.frameElement}}return et({width:d,height:u,x:l,y:f})}const Xt=[":popover-open",":modal"];function mt(t){return Xt.some(e=>{try{return t.matches(e)}catch{return!1}})}function Yt(t){let{elements:e,rect:o,offsetParent:n,strategy:i}=t;const r=i==="fixed",s=F(n),c=e?mt(e.floating):!1;if(n===s||c&&r)return o;let l={scrollLeft:0,scrollTop:0},f=N(1);const d=N(0),u=D(n);if((u||!u&&!r)&&((I(n)!=="body"||J(s))&&(l=ot(n)),D(n))){const g=H(n);f=$(n),d.x=g.x+n.clientLeft,d.y=g.y+n.clientTop}return{width:o.width*f.x,height:o.height*f.y,x:o.x*f.x-l.scrollLeft*f.x+d.x,y:o.y*f.y-l.scrollTop*f.y+d.y}}function qt(t){return Array.from(t.getClientRects())}function Rt(t){return H(F(t)).left+ot(t).scrollLeft}function Ut(t){const e=F(t),o=ot(t),n=t.ownerDocument.body,i=V(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),r=V(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight);let s=-o.scrollLeft+Rt(t);const c=-o.scrollTop;return E(n).direction==="rtl"&&(s+=V(e.clientWidth,n.clientWidth)-i),{width:i,height:r,x:s,y:c}}function Kt(t,e){const o=O(t),n=F(t),i=o.visualViewport;let r=n.clientWidth,s=n.clientHeight,c=0,l=0;if(i){r=i.width,s=i.height;const f=ut();(!f||f&&e==="fixed")&&(c=i.offsetLeft,l=i.offsetTop)}return{width:r,height:s,x:c,y:l}}function Gt(t,e){const o=H(t,!0,e==="fixed"),n=o.top+t.clientTop,i=o.left+t.clientLeft,r=D(t)?$(t):N(1),s=t.clientWidth*r.x,c=t.clientHeight*r.y,l=i*r.x,f=n*r.y;return{width:s,height:c,x:l,y:f}}function pt(t,e,o){let n;if(e==="viewport")n=Kt(t,o);else if(e==="document")n=Ut(F(t));else if(S(e))n=Gt(e,o);else{const i=Ot(t);n={...e,x:e.x-i.x,y:e.y-i.y}}return et(n)}function Ct(t,e){const o=B(t);return o===e||!S(o)||_(o)?!1:E(o).position==="fixed"||Ct(o,e)}function Jt(t,e){const o=e.get(t);if(o)return o;let n=U(t,[],!1).filter(c=>S(c)&&I(c)!=="body"),i=null;const r=E(t).position==="fixed";let s=r?B(t):t;for(;S(s)&&!_(s);){const c=E(s),l=at(s);!l&&c.position==="fixed"&&(i=null),(r?!l&&!i:!l&&c.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||J(s)&&!l&&Ct(t,s))?n=n.filter(d=>d!==s):i=c,s=B(s)}return e.set(t,n),n}function Qt(t){let{element:e,boundary:o,rootBoundary:n,strategy:i}=t;const s=[...o==="clippingAncestors"?mt(e)?[]:Jt(e,this._c):[].concat(o),n],c=s[0],l=s.reduce((f,d)=>{const u=pt(e,d,i);return f.top=V(u.top,f.top),f.right=z(u.right,f.right),f.bottom=z(u.bottom,f.bottom),f.left=V(u.left,f.left),f},pt(e,c,i));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Zt(t){const{width:e,height:o}=At(t);return{width:e,height:o}}function te(t,e,o){const n=D(e),i=F(e),r=o==="fixed",s=H(t,!0,r,e);let c={scrollLeft:0,scrollTop:0};const l=N(0);if(n||!n&&!r)if((I(e)!=="body"||J(i))&&(c=ot(e)),n){const u=H(e,!0,r,e);l.x=u.x+e.clientLeft,l.y=u.y+e.clientTop}else i&&(l.x=Rt(i));const f=s.left+c.scrollLeft-l.x,d=s.top+c.scrollTop-l.y;return{x:f,y:d,width:s.width,height:s.height}}function it(t){return E(t).position==="static"}function wt(t,e){return!D(t)||E(t).position==="fixed"?null:e?e(t):t.offsetParent}function Et(t,e){const o=O(t);if(mt(t))return o;if(!D(t)){let i=B(t);for(;i&&!_(i);){if(S(i)&&!it(i))return i;i=B(i)}return o}let n=wt(t,e);for(;n&&zt(n)&&it(n);)n=wt(n,e);return n&&_(n)&&it(n)&&!at(n)?o:n||_t(t)||o}const ee=async function(t){const e=this.getOffsetParent||Et,o=this.getDimensions,n=await o(t.floating);return{reference:te(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:n.width,height:n.height}}};function ne(t){return E(t).direction==="rtl"}const oe={convertOffsetParentRelativeRectToViewportRelativeRect:Yt,getDocumentElement:F,getClippingRect:Qt,getOffsetParent:Et,getElementRects:ee,getClientRects:qt,getDimensions:Zt,getScale:$,isElement:S,isRTL:ne};function ie(t,e){let o=null,n;const i=F(t);function r(){var c;clearTimeout(n),(c=o)==null||c.disconnect(),o=null}function s(c,l){c===void 0&&(c=!1),l===void 0&&(l=1),r();const{left:f,top:d,width:u,height:g}=t.getBoundingClientRect();if(c||e(),!u||!g)return;const a=Q(d),m=Q(i.clientWidth-(f+u)),h=Q(i.clientHeight-(d+g)),w=Q(f),x={rootMargin:-a+"px "+-m+"px "+-h+"px "+-w+"px",threshold:V(0,z(1,l))||1};let y=!0;function b(v){const C=v[0].intersectionRatio;if(C!==l){if(!y)return s();C?s(!1,C):n=setTimeout(()=>{s(!1,1e-7)},1e3)}y=!1}try{o=new IntersectionObserver(b,{...x,root:i.ownerDocument})}catch{o=new IntersectionObserver(b,x)}o.observe(t)}return s(!0),r}function se(t,e,o,n){n===void 0&&(n={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:l=!1}=n,f=dt(t),d=i||r?[...f?U(f):[],...U(e)]:[];d.forEach(p=>{i&&p.addEventListener("scroll",o,{passive:!0}),r&&p.addEventListener("resize",o)});const u=f&&c?ie(f,o):null;let g=-1,a=null;s&&(a=new ResizeObserver(p=>{let[x]=p;x&&x.target===f&&a&&(a.unobserve(e),cancelAnimationFrame(g),g=requestAnimationFrame(()=>{var y;(y=a)==null||y.observe(e)})),o()}),f&&!l&&a.observe(f),a.observe(e));let m,h=l?H(t):null;l&&w();function w(){const p=H(t);h&&(p.x!==h.x||p.y!==h.y||p.width!==h.width||p.height!==h.height)&&o(),h=p,m=requestAnimationFrame(w)}return o(),()=>{var p;d.forEach(x=>{i&&x.removeEventListener("scroll",o),r&&x.removeEventListener("resize",o)}),u==null||u(),(p=a)==null||p.disconnect(),a=null,l&&cancelAnimationFrame(m)}}const re=ft,ce=Ht,le=$t,fe=Vt,ae=Mt,ue=(t,e,o)=>{const n=new Map,i={platform:oe,...o},r={...i.platform,_c:n};return Bt(t,e,{...i,platform:r})};export{ae as a,se as b,ue as c,re as d,fe as f,ce as o,le as s};