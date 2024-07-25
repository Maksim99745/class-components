import{r as a,R as H}from"./react-BWtM72Fx.js";import{R as K}from"./react-dom-BGFKlzYW.js";import{m as W,D as G,a as X,R as Y,u as q,b as V,c as j,N as J,d as Q,e as Z}from"./react-router-C_NjS6MD.js";import{c as $,b as ee,E as te,s as re,d as k}from"./@remix-run-DGxTVJB8.js";/**
 * React Router DOM v6.25.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function C(){return C=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},C.apply(this,arguments)}function ne(e,n){if(e==null)return{};var t={},i=Object.keys(e),r,s;for(s=0;s<i.length;s++)r=i[s],!(n.indexOf(r)>=0)&&(t[r]=e[r]);return t}function ae(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function ie(e,n){return e.button===0&&(!n||n==="_self")&&!ae(e)}function U(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((n,t)=>{let i=e[t];return n.concat(Array.isArray(i)?i.map(r=>[t,r]):[[t,i]])},[]))}function se(e,n){let t=U(e);return n&&n.forEach((i,r)=>{t.has(r)||n.getAll(r).forEach(s=>{t.append(r,s)})}),t}const oe=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","unstable_viewTransition"],le="6";try{window.__reactRouterVersion=le}catch{}function be(e,n){return $({basename:void 0,future:C({},void 0,{v7_prependBasename:!0}),history:ee({window:void 0}),hydrationData:ue(),routes:e,mapRouteProperties:W,unstable_dataStrategy:void 0,unstable_patchRoutesOnMiss:void 0,window:void 0}).initialize()}function ue(){var e;let n=(e=window)==null?void 0:e.__staticRouterHydrationData;return n&&n.errors&&(n=C({},n,{errors:ce(n.errors)})),n}function ce(e){if(!e)return null;let n=Object.entries(e),t={};for(let[i,r]of n)if(r&&r.__type==="RouteErrorResponse")t[i]=new te(r.status,r.statusText,r.data,r.internal===!0);else if(r&&r.__type==="Error"){if(r.__subType){let s=window[r.__subType];if(typeof s=="function")try{let l=new s(r.message);l.stack="",t[i]=l}catch{}}if(t[i]==null){let s=new Error(r.message);s.stack="",t[i]=s}}else t[i]=r;return t}const fe=a.createContext({isTransitioning:!1}),de=a.createContext(new Map),pe="startTransition",F=H[pe],he="flushSync",D=K[he];function ve(e){F?F(e):e()}function P(e){D?D(e):e()}class me{constructor(){this.status="pending",this.promise=new Promise((n,t)=>{this.resolve=i=>{this.status==="pending"&&(this.status="resolved",n(i))},this.reject=i=>{this.status==="pending"&&(this.status="rejected",t(i))}})}}function Pe(e){let{fallbackElement:n,router:t,future:i}=e,[r,s]=a.useState(t.state),[l,d]=a.useState(),[f,o]=a.useState({isTransitioning:!1}),[c,m]=a.useState(),[p,T]=a.useState(),[w,b]=a.useState(),E=a.useRef(new Map),{v7_startTransition:x}=i||{},L=a.useCallback(u=>{x?ve(u):u()},[x]),h=a.useCallback((u,S)=>{let{deletedFetchers:v,unstable_flushSync:O,unstable_viewTransitionOpts:y}=S;v.forEach(g=>E.current.delete(g)),u.fetchers.forEach((g,B)=>{g.data!==void 0&&E.current.set(B,g.data)});let N=t.window==null||t.window.document==null||typeof t.window.document.startViewTransition!="function";if(!y||N){O?P(()=>s(u)):L(()=>s(u));return}if(O){P(()=>{p&&(c&&c.resolve(),p.skipTransition()),o({isTransitioning:!0,flushSync:!0,currentLocation:y.currentLocation,nextLocation:y.nextLocation})});let g=t.window.document.startViewTransition(()=>{P(()=>s(u))});g.finished.finally(()=>{P(()=>{m(void 0),T(void 0),d(void 0),o({isTransitioning:!1})})}),P(()=>T(g));return}p?(c&&c.resolve(),p.skipTransition(),b({state:u,currentLocation:y.currentLocation,nextLocation:y.nextLocation})):(d(u),o({isTransitioning:!0,flushSync:!1,currentLocation:y.currentLocation,nextLocation:y.nextLocation}))},[t.window,p,c,E,L]);a.useLayoutEffect(()=>t.subscribe(h),[t,h]),a.useEffect(()=>{f.isTransitioning&&!f.flushSync&&m(new me)},[f]),a.useEffect(()=>{if(c&&l&&t.window){let u=l,S=c.promise,v=t.window.document.startViewTransition(async()=>{L(()=>s(u)),await S});v.finished.finally(()=>{m(void 0),T(void 0),d(void 0),o({isTransitioning:!1})}),T(v)}},[L,l,c,t.window]),a.useEffect(()=>{c&&l&&r.location.key===l.location.key&&c.resolve()},[c,p,r.location,l]),a.useEffect(()=>{!f.isTransitioning&&w&&(d(w.state),o({isTransitioning:!0,flushSync:!1,currentLocation:w.currentLocation,nextLocation:w.nextLocation}),b(void 0))},[f.isTransitioning,w]),a.useEffect(()=>{},[]);let R=a.useMemo(()=>({createHref:t.createHref,encodeLocation:t.encodeLocation,go:u=>t.navigate(u),push:(u,S,v)=>t.navigate(u,{state:S,preventScrollReset:v==null?void 0:v.preventScrollReset}),replace:(u,S,v)=>t.navigate(u,{replace:!0,state:S,preventScrollReset:v==null?void 0:v.preventScrollReset})}),[t]),_=t.basename||"/",I=a.useMemo(()=>({router:t,navigator:R,static:!1,basename:_}),[t,R,_]),z=a.useMemo(()=>({v7_relativeSplatPath:t.future.v7_relativeSplatPath}),[t.future.v7_relativeSplatPath]);return a.createElement(a.Fragment,null,a.createElement(G.Provider,{value:I},a.createElement(X.Provider,{value:r},a.createElement(de.Provider,{value:E.current},a.createElement(fe.Provider,{value:f},a.createElement(Y,{basename:_,location:r.location,navigationType:r.historyAction,navigator:R,future:z},r.initialized||t.future.v7_partialHydration?a.createElement(we,{routes:t.routes,future:t.future,state:r}):n))))),null)}const we=a.memo(Re);function Re(e){let{routes:n,future:t,state:i}=e;return q(n,void 0,i,t)}const Se=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",ye=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ce=a.forwardRef(function(n,t){let{onClick:i,relative:r,reloadDocument:s,replace:l,state:d,target:f,to:o,preventScrollReset:c,unstable_viewTransition:m}=n,p=ne(n,oe),{basename:T}=a.useContext(J),w,b=!1;if(typeof o=="string"&&ye.test(o)&&(w=o,Se))try{let h=new URL(window.location.href),R=o.startsWith("//")?new URL(h.protocol+o):new URL(o),_=re(R.pathname,T);R.origin===h.origin&&_!=null?o=_+R.search+R.hash:b=!0}catch{}let E=Q(o,{relative:r}),x=ge(o,{replace:l,state:d,target:f,preventScrollReset:c,relative:r,unstable_viewTransition:m});function L(h){i&&i(h),h.defaultPrevented||x(h)}return a.createElement("a",C({},p,{href:w||E,onClick:b||s?i:L,ref:t,target:f}))});var A;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(A||(A={}));var M;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(M||(M={}));function ge(e,n){let{target:t,replace:i,state:r,preventScrollReset:s,relative:l,unstable_viewTransition:d}=n===void 0?{}:n,f=j(),o=V(),c=Z(e,{relative:l});return a.useCallback(m=>{if(ie(m,t)){m.preventDefault();let p=i!==void 0?i:k(o)===k(c);f(e,{replace:p,state:r,preventScrollReset:s,relative:l,unstable_viewTransition:d})}},[o,f,c,i,r,t,e,s,l,d])}function xe(e){let n=a.useRef(U(e)),t=a.useRef(!1),i=V(),r=a.useMemo(()=>se(i.search,t.current?null:n.current),[i.search]),s=j(),l=a.useCallback((d,f)=>{const o=U(typeof d=="function"?d(r):d);t.current=!0,s("?"+o,f)},[s,r]);return[r,l]}export{Ce as L,Pe as R,be as c,xe as u};
