import{r as Nl,o as Y,f as ie,C as Fl,v as G,D as Ul,B as rn,u as on,k as ht,E as Vn,l as Ee,G as Fa,y as Nt,m as oe,s as Xn,c as se,a as K,t as an,H as Hl,g as Qe,q as Ve,I as Wl,F as Wn,d as ct,n as Ua,S as Ha,V as Wa,J as $t,K as Ya,L as Qa,M as Ka,N as Va,O as Ja,P as $a,Q as aa,R as Yl,z as lr,e as ve,i as nn,U as Ql,W as Kl,X as Vl,T as pt,Y as oa,Z as ia,_ as Jl,$ as $l,a0 as Zl,a1 as Xl,p as Gl,h as es,x as ns,a2 as ts}from"./icon-08143d70.js";import{M as rs}from"./pick-colors-ca4b258e.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))l(d);new MutationObserver(d=>{for(const y of d)if(y.type==="childList")for(const A of y.addedNodes)A.tagName==="LINK"&&A.rel==="modulepreload"&&l(A)}).observe(document,{childList:!0,subtree:!0});function o(d){const y={};return d.integrity&&(y.integrity=d.integrity),d.referrerPolicy&&(y.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?y.credentials="include":d.crossOrigin==="anonymous"?y.credentials="omit":y.credentials="same-origin",y}function l(d){if(d.ep)return;d.ep=!0;const y=o(d);fetch(d.href,y)}})();const Gn=(e,n)=>{const o=e.__vccOpts||e;for(const[l,d]of n)o[l]=d;return o},as={};function os(e,n){const o=Nl("router-view");return Y(),ie(o)}const is=Gn(as,[["render",os]]);/*!
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */const An=typeof document<"u";function ls(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const te=Object.assign;function Ft(e,n){const o={};for(const l in n){const d=n[l];o[l]=Ce(d)?d.map(e):e(d)}return o}const Qn=()=>{},Ce=Array.isArray,Za=/#/g,ss=/&/g,ds=/\//g,ps=/=/g,cs=/\?/g,Xa=/\+/g,us=/%5B/g,As=/%5D/g,Ga=/%5E/g,ys=/%60/g,eo=/%7B/g,fs=/%7C/g,no=/%7D/g,hs=/%20/g;function sr(e){return encodeURI(""+e).replace(fs,"|").replace(us,"[").replace(As,"]")}function ms(e){return sr(e).replace(eo,"{").replace(no,"}").replace(Ga,"^")}function Zt(e){return sr(e).replace(Xa,"%2B").replace(hs,"+").replace(Za,"%23").replace(ss,"%26").replace(ys,"`").replace(eo,"{").replace(no,"}").replace(Ga,"^")}function bs(e){return Zt(e).replace(ps,"%3D")}function gs(e){return sr(e).replace(Za,"%23").replace(cs,"%3F")}function vs(e){return e==null?"":gs(e).replace(ds,"%2F")}function Jn(e){try{return decodeURIComponent(""+e)}catch{}return""+e}const Es=/\/$/,xs=e=>e.replace(Es,"");function Ut(e,n,o="/"){let l,d={},y="",A="";const m=n.indexOf("#");let g=n.indexOf("?");return m<g&&m>=0&&(g=-1),g>-1&&(l=n.slice(0,g),y=n.slice(g+1,m>-1?m:n.length),d=e(y)),m>-1&&(l=l||n.slice(0,m),A=n.slice(m,n.length)),l=Bs(l??n,o),{fullPath:l+(y&&"?")+y+A,path:l,query:d,hash:Jn(A)}}function ws(e,n){const o=n.query?e(n.query):"";return n.path+(o&&"?")+o+(n.hash||"")}function la(e,n){return!n||!e.toLowerCase().startsWith(n.toLowerCase())?e:e.slice(n.length)||"/"}function Cs(e,n,o){const l=n.matched.length-1,d=o.matched.length-1;return l>-1&&l===d&&yn(n.matched[l],o.matched[d])&&to(n.params,o.params)&&e(n.query)===e(o.query)&&n.hash===o.hash}function yn(e,n){return(e.aliasOf||e)===(n.aliasOf||n)}function to(e,n){if(Object.keys(e).length!==Object.keys(n).length)return!1;for(const o in e)if(!ks(e[o],n[o]))return!1;return!0}function ks(e,n){return Ce(e)?sa(e,n):Ce(n)?sa(n,e):e===n}function sa(e,n){return Ce(n)?e.length===n.length&&e.every((o,l)=>o===n[l]):e.length===1&&e[0]===n}function Bs(e,n){if(e.startsWith("/"))return e;if(!e)return n;const o=n.split("/"),l=e.split("/"),d=l[l.length-1];(d===".."||d===".")&&l.push("");let y=o.length-1,A,m;for(A=0;A<l.length;A++)if(m=l[A],m!==".")if(m==="..")y>1&&y--;else break;return o.slice(0,y).join("/")+"/"+l.slice(A).join("/")}var $n;(function(e){e.pop="pop",e.push="push"})($n||($n={}));var Kn;(function(e){e.back="back",e.forward="forward",e.unknown=""})(Kn||(Kn={}));function Ss(e){if(!e)if(An){const n=document.querySelector("base");e=n&&n.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),xs(e)}const Is=/^[^#]+#/;function Ls(e,n){return e.replace(Is,"#")+n}function Os(e,n){const o=document.documentElement.getBoundingClientRect(),l=e.getBoundingClientRect();return{behavior:n.behavior,left:l.left-o.left-(n.left||0),top:l.top-o.top-(n.top||0)}}const mt=()=>({left:window.scrollX,top:window.scrollY});function Rs(e){let n;if("el"in e){const o=e.el,l=typeof o=="string"&&o.startsWith("#"),d=typeof o=="string"?l?document.getElementById(o.slice(1)):document.querySelector(o):o;if(!d)return;n=Os(d,e)}else n=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(n):window.scrollTo(n.left!=null?n.left:window.scrollX,n.top!=null?n.top:window.scrollY)}function da(e,n){return(history.state?history.state.position-n:-1)+e}const Xt=new Map;function Ts(e,n){Xt.set(e,n)}function zs(e){const n=Xt.get(e);return Xt.delete(e),n}let _s=()=>location.protocol+"//"+location.host;function ro(e,n){const{pathname:o,search:l,hash:d}=n,y=e.indexOf("#");if(y>-1){let m=d.includes(e.slice(y))?e.slice(y).length:1,g=d.slice(m);return g[0]!=="/"&&(g="/"+g),la(g,"")}return la(o,e)+l+d}function Ps(e,n,o,l){let d=[],y=[],A=null;const m=({state:u})=>{const k=ro(e,location),x=o.value,w=n.value;let R=0;if(u){if(o.value=k,n.value=u,A&&A===x){A=null;return}R=w?u.position-w.position:0}else l(k);d.forEach(z=>{z(o.value,x,{delta:R,type:$n.pop,direction:R?R>0?Kn.forward:Kn.back:Kn.unknown})})};function g(){A=o.value}function E(u){d.push(u);const k=()=>{const x=d.indexOf(u);x>-1&&d.splice(x,1)};return y.push(k),k}function v(){const{history:u}=window;u.state&&u.replaceState(te({},u.state,{scroll:mt()}),"")}function b(){for(const u of y)u();y=[],window.removeEventListener("popstate",m),window.removeEventListener("beforeunload",v)}return window.addEventListener("popstate",m),window.addEventListener("beforeunload",v,{passive:!0}),{pauseListeners:g,listen:E,destroy:b}}function pa(e,n,o,l=!1,d=!1){return{back:e,current:n,forward:o,replaced:l,position:window.history.length,scroll:d?mt():null}}function Ds(e){const{history:n,location:o}=window,l={value:ro(e,o)},d={value:n.state};d.value||y(l.value,{back:null,current:l.value,forward:null,position:n.length-1,replaced:!0,scroll:null},!0);function y(g,E,v){const b=e.indexOf("#"),u=b>-1?(o.host&&document.querySelector("base")?e:e.slice(b))+g:_s()+e+g;try{n[v?"replaceState":"pushState"](E,"",u),d.value=E}catch(k){console.error(k),o[v?"replace":"assign"](u)}}function A(g,E){const v=te({},n.state,pa(d.value.back,g,d.value.forward,!0),E,{position:d.value.position});y(g,v,!0),l.value=g}function m(g,E){const v=te({},d.value,n.state,{forward:g,scroll:mt()});y(v.current,v,!0);const b=te({},pa(l.value,g,null),{position:v.position+1},E);y(g,b,!1),l.value=g}return{location:l,state:d,push:m,replace:A}}function qs(e){e=Ss(e);const n=Ds(e),o=Ps(e,n.state,n.location,n.replace);function l(y,A=!0){A||o.pauseListeners(),history.go(y)}const d=te({location:"",base:e,go:l,createHref:Ls.bind(null,e)},n,o);return Object.defineProperty(d,"location",{enumerable:!0,get:()=>n.location.value}),Object.defineProperty(d,"state",{enumerable:!0,get:()=>n.state.value}),d}function js(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),qs(e)}function Ms(e){return typeof e=="string"||e&&typeof e=="object"}function ao(e){return typeof e=="string"||typeof e=="symbol"}const He={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},oo=Symbol("");var ca;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(ca||(ca={}));function fn(e,n){return te(new Error,{type:e,[oo]:!0},n)}function De(e,n){return e instanceof Error&&oo in e&&(n==null||!!(e.type&n))}const ua="[^/]+?",Ns={sensitive:!1,strict:!1,start:!0,end:!0},Fs=/[.+*?^${}()[\]/\\]/g;function Us(e,n){const o=te({},Ns,n),l=[];let d=o.start?"^":"";const y=[];for(const E of e){const v=E.length?[]:[90];o.strict&&!E.length&&(d+="/");for(let b=0;b<E.length;b++){const u=E[b];let k=40+(o.sensitive?.25:0);if(u.type===0)b||(d+="/"),d+=u.value.replace(Fs,"\\$&"),k+=40;else if(u.type===1){const{value:x,repeatable:w,optional:R,regexp:z}=u;y.push({name:x,repeatable:w,optional:R});const S=z||ua;if(S!==ua){k+=10;try{new RegExp(`(${S})`)}catch(N){throw new Error(`Invalid custom RegExp for param "${x}" (${S}): `+N.message)}}let F=w?`((?:${S})(?:/(?:${S}))*)`:`(${S})`;b||(F=R&&E.length<2?`(?:/${F})`:"/"+F),R&&(F+="?"),d+=F,k+=20,R&&(k+=-8),w&&(k+=-20),S===".*"&&(k+=-50)}v.push(k)}l.push(v)}if(o.strict&&o.end){const E=l.length-1;l[E][l[E].length-1]+=.7000000000000001}o.strict||(d+="/?"),o.end?d+="$":o.strict&&(d+="(?:/|$)");const A=new RegExp(d,o.sensitive?"":"i");function m(E){const v=E.match(A),b={};if(!v)return null;for(let u=1;u<v.length;u++){const k=v[u]||"",x=y[u-1];b[x.name]=k&&x.repeatable?k.split("/"):k}return b}function g(E){let v="",b=!1;for(const u of e){(!b||!v.endsWith("/"))&&(v+="/"),b=!1;for(const k of u)if(k.type===0)v+=k.value;else if(k.type===1){const{value:x,repeatable:w,optional:R}=k,z=x in E?E[x]:"";if(Ce(z)&&!w)throw new Error(`Provided param "${x}" is an array but it is not repeatable (* or + modifiers)`);const S=Ce(z)?z.join("/"):z;if(!S)if(R)u.length<2&&(v.endsWith("/")?v=v.slice(0,-1):b=!0);else throw new Error(`Missing required param "${x}"`);v+=S}}return v||"/"}return{re:A,score:l,keys:y,parse:m,stringify:g}}function Hs(e,n){let o=0;for(;o<e.length&&o<n.length;){const l=n[o]-e[o];if(l)return l;o++}return e.length<n.length?e.length===1&&e[0]===40+40?-1:1:e.length>n.length?n.length===1&&n[0]===40+40?1:-1:0}function Ws(e,n){let o=0;const l=e.score,d=n.score;for(;o<l.length&&o<d.length;){const y=Hs(l[o],d[o]);if(y)return y;o++}if(Math.abs(d.length-l.length)===1){if(Aa(l))return 1;if(Aa(d))return-1}return d.length-l.length}function Aa(e){const n=e[e.length-1];return e.length>0&&n[n.length-1]<0}const Ys={type:0,value:""},Qs=/[a-zA-Z0-9_]/;function Ks(e){if(!e)return[[]];if(e==="/")return[[Ys]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function n(k){throw new Error(`ERR (${o})/"${E}": ${k}`)}let o=0,l=o;const d=[];let y;function A(){y&&d.push(y),y=[]}let m=0,g,E="",v="";function b(){E&&(o===0?y.push({type:0,value:E}):o===1||o===2||o===3?(y.length>1&&(g==="*"||g==="+")&&n(`A repeatable param (${E}) must be alone in its segment. eg: '/:ids+.`),y.push({type:1,value:E,regexp:v,repeatable:g==="*"||g==="+",optional:g==="*"||g==="?"})):n("Invalid state to consume buffer"),E="")}function u(){E+=g}for(;m<e.length;){if(g=e[m++],g==="\\"&&o!==2){l=o,o=4;continue}switch(o){case 0:g==="/"?(E&&b(),A()):g===":"?(b(),o=1):u();break;case 4:u(),o=l;break;case 1:g==="("?o=2:Qs.test(g)?u():(b(),o=0,g!=="*"&&g!=="?"&&g!=="+"&&m--);break;case 2:g===")"?v[v.length-1]=="\\"?v=v.slice(0,-1)+g:o=3:v+=g;break;case 3:b(),o=0,g!=="*"&&g!=="?"&&g!=="+"&&m--,v="";break;default:n("Unknown state");break}}return o===2&&n(`Unfinished custom RegExp for param "${E}"`),b(),A(),d}function Vs(e,n,o){const l=Us(Ks(e.path),o),d=te(l,{record:e,parent:n,children:[],alias:[]});return n&&!d.record.aliasOf==!n.record.aliasOf&&n.children.push(d),d}function Js(e,n){const o=[],l=new Map;n=ha({strict:!1,end:!0,sensitive:!1},n);function d(v){return l.get(v)}function y(v,b,u){const k=!u,x=$s(v);x.aliasOf=u&&u.record;const w=ha(n,v),R=[x];if("alias"in v){const F=typeof v.alias=="string"?[v.alias]:v.alias;for(const N of F)R.push(te({},x,{components:u?u.record.components:x.components,path:N,aliasOf:u?u.record:x}))}let z,S;for(const F of R){const{path:N}=F;if(b&&N[0]!=="/"){const ee=b.record.path,pe=ee[ee.length-1]==="/"?"":"/";F.path=b.record.path+(N&&pe+N)}if(z=Vs(F,b,w),u?u.alias.push(z):(S=S||z,S!==z&&S.alias.push(z),k&&v.name&&!fa(z)&&A(v.name)),x.children){const ee=x.children;for(let pe=0;pe<ee.length;pe++)y(ee[pe],z,u&&u.children[pe])}u=u||z,(z.record.components&&Object.keys(z.record.components).length||z.record.name||z.record.redirect)&&g(z)}return S?()=>{A(S)}:Qn}function A(v){if(ao(v)){const b=l.get(v);b&&(l.delete(v),o.splice(o.indexOf(b),1),b.children.forEach(A),b.alias.forEach(A))}else{const b=o.indexOf(v);b>-1&&(o.splice(b,1),v.record.name&&l.delete(v.record.name),v.children.forEach(A),v.alias.forEach(A))}}function m(){return o}function g(v){let b=0;for(;b<o.length&&Ws(v,o[b])>=0&&(v.record.path!==o[b].record.path||!io(v,o[b]));)b++;o.splice(b,0,v),v.record.name&&!fa(v)&&l.set(v.record.name,v)}function E(v,b){let u,k={},x,w;if("name"in v&&v.name){if(u=l.get(v.name),!u)throw fn(1,{location:v});w=u.record.name,k=te(ya(b.params,u.keys.filter(S=>!S.optional).concat(u.parent?u.parent.keys.filter(S=>S.optional):[]).map(S=>S.name)),v.params&&ya(v.params,u.keys.map(S=>S.name))),x=u.stringify(k)}else if(v.path!=null)x=v.path,u=o.find(S=>S.re.test(x)),u&&(k=u.parse(x),w=u.record.name);else{if(u=b.name?l.get(b.name):o.find(S=>S.re.test(b.path)),!u)throw fn(1,{location:v,currentLocation:b});w=u.record.name,k=te({},b.params,v.params),x=u.stringify(k)}const R=[];let z=u;for(;z;)R.unshift(z.record),z=z.parent;return{name:w,path:x,params:k,matched:R,meta:Xs(R)}}return e.forEach(v=>y(v)),{addRoute:y,resolve:E,removeRoute:A,getRoutes:m,getRecordMatcher:d}}function ya(e,n){const o={};for(const l of n)l in e&&(o[l]=e[l]);return o}function $s(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:Zs(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function Zs(e){const n={},o=e.props||!1;if("component"in e)n.default=o;else for(const l in e.components)n[l]=typeof o=="object"?o[l]:o;return n}function fa(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Xs(e){return e.reduce((n,o)=>te(n,o.meta),{})}function ha(e,n){const o={};for(const l in e)o[l]=l in n?n[l]:e[l];return o}function io(e,n){return n.children.some(o=>o===e||io(e,o))}function Gs(e){const n={};if(e===""||e==="?")return n;const l=(e[0]==="?"?e.slice(1):e).split("&");for(let d=0;d<l.length;++d){const y=l[d].replace(Xa," "),A=y.indexOf("="),m=Jn(A<0?y:y.slice(0,A)),g=A<0?null:Jn(y.slice(A+1));if(m in n){let E=n[m];Ce(E)||(E=n[m]=[E]),E.push(g)}else n[m]=g}return n}function ma(e){let n="";for(let o in e){const l=e[o];if(o=bs(o),l==null){l!==void 0&&(n+=(n.length?"&":"")+o);continue}(Ce(l)?l.map(y=>y&&Zt(y)):[l&&Zt(l)]).forEach(y=>{y!==void 0&&(n+=(n.length?"&":"")+o,y!=null&&(n+="="+y))})}return n}function ed(e){const n={};for(const o in e){const l=e[o];l!==void 0&&(n[o]=Ce(l)?l.map(d=>d==null?null:""+d):l==null?l:""+l)}return n}const nd=Symbol(""),ba=Symbol(""),bt=Symbol(""),dr=Symbol(""),Gt=Symbol("");function Un(){let e=[];function n(l){return e.push(l),()=>{const d=e.indexOf(l);d>-1&&e.splice(d,1)}}function o(){e=[]}return{add:n,list:()=>e.slice(),reset:o}}function Ye(e,n,o,l,d,y=A=>A()){const A=l&&(l.enterCallbacks[d]=l.enterCallbacks[d]||[]);return()=>new Promise((m,g)=>{const E=u=>{u===!1?g(fn(4,{from:o,to:n})):u instanceof Error?g(u):Ms(u)?g(fn(2,{from:n,to:u})):(A&&l.enterCallbacks[d]===A&&typeof u=="function"&&A.push(u),m())},v=y(()=>e.call(l&&l.instances[d],n,o,E));let b=Promise.resolve(v);e.length<3&&(b=b.then(E)),b.catch(u=>g(u))})}function Ht(e,n,o,l,d=y=>y()){const y=[];for(const A of e)for(const m in A.components){let g=A.components[m];if(!(n!=="beforeRouteEnter"&&!A.instances[m]))if(td(g)){const v=(g.__vccOpts||g)[n];v&&y.push(Ye(v,o,l,A,m,d))}else{let E=g();y.push(()=>E.then(v=>{if(!v)return Promise.reject(new Error(`Couldn't resolve component "${m}" at "${A.path}"`));const b=ls(v)?v.default:v;A.components[m]=b;const k=(b.__vccOpts||b)[n];return k&&Ye(k,o,l,A,m,d)()}))}}return y}function td(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function ga(e){const n=on(bt),o=on(dr),l=Ee(()=>{const g=G(e.to);return n.resolve(g)}),d=Ee(()=>{const{matched:g}=l.value,{length:E}=g,v=g[E-1],b=o.matched;if(!v||!b.length)return-1;const u=b.findIndex(yn.bind(null,v));if(u>-1)return u;const k=va(g[E-2]);return E>1&&va(v)===k&&b[b.length-1].path!==k?b.findIndex(yn.bind(null,g[E-2])):u}),y=Ee(()=>d.value>-1&&id(o.params,l.value.params)),A=Ee(()=>d.value>-1&&d.value===o.matched.length-1&&to(o.params,l.value.params));function m(g={}){return od(g)?n[G(e.replace)?"replace":"push"](G(e.to)).catch(Qn):Promise.resolve()}return{route:l,href:Ee(()=>l.value.href),isActive:y,isExactActive:A,navigate:m}}const rd=ht({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:ga,setup(e,{slots:n}){const o=Vn(ga(e)),{options:l}=on(bt),d=Ee(()=>({[Ea(e.activeClass,l.linkActiveClass,"router-link-active")]:o.isActive,[Ea(e.exactActiveClass,l.linkExactActiveClass,"router-link-exact-active")]:o.isExactActive}));return()=>{const y=n.default&&n.default(o);return e.custom?y:Fa("a",{"aria-current":o.isExactActive?e.ariaCurrentValue:null,href:o.href,onClick:o.navigate,class:d.value},y)}}}),ad=rd;function od(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const n=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(n))return}return e.preventDefault&&e.preventDefault(),!0}}function id(e,n){for(const o in n){const l=n[o],d=e[o];if(typeof l=="string"){if(l!==d)return!1}else if(!Ce(d)||d.length!==l.length||l.some((y,A)=>y!==d[A]))return!1}return!0}function va(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Ea=(e,n,o)=>e??n??o,ld=ht({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:n,slots:o}){const l=on(Gt),d=Ee(()=>e.route||l.value),y=on(ba,0),A=Ee(()=>{let E=G(y);const{matched:v}=d.value;let b;for(;(b=v[E])&&!b.components;)E++;return E}),m=Ee(()=>d.value.matched[A.value]);Nt(ba,Ee(()=>A.value+1)),Nt(nd,m),Nt(Gt,d);const g=oe();return Xn(()=>[g.value,m.value,e.name],([E,v,b],[u,k,x])=>{v&&(v.instances[b]=E,k&&k!==v&&E&&E===u&&(v.leaveGuards.size||(v.leaveGuards=k.leaveGuards),v.updateGuards.size||(v.updateGuards=k.updateGuards))),E&&v&&(!k||!yn(v,k)||!u)&&(v.enterCallbacks[b]||[]).forEach(w=>w(E))},{flush:"post"}),()=>{const E=d.value,v=e.name,b=m.value,u=b&&b.components[v];if(!u)return xa(o.default,{Component:u,route:E});const k=b.props[v],x=k?k===!0?E.params:typeof k=="function"?k(E):k:null,R=Fa(u,te({},x,n,{onVnodeUnmounted:z=>{z.component.isUnmounted&&(b.instances[v]=null)},ref:g}));return xa(o.default,{Component:R,route:E})||R}}});function xa(e,n){if(!e)return null;const o=e(n);return o.length===1?o[0]:o}const sd=ld;function dd(e){const n=Js(e.routes,e),o=e.parseQuery||Gs,l=e.stringifyQuery||ma,d=e.history,y=Un(),A=Un(),m=Un(),g=Fl(He);let E=He;An&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const v=Ft.bind(null,B=>""+B),b=Ft.bind(null,vs),u=Ft.bind(null,Jn);function k(B,T){let _,U;return ao(B)?(_=n.getRecordMatcher(B),U=T):U=B,n.addRoute(U,_)}function x(B){const T=n.getRecordMatcher(B);T&&n.removeRoute(T)}function w(){return n.getRoutes().map(B=>B.record)}function R(B){return!!n.getRecordMatcher(B)}function z(B,T){if(T=te({},T||g.value),typeof B=="string"){const V=Ut(o,B,T.path),le=n.resolve({path:V.path},T),Ge=d.createHref(V.fullPath);return te(V,le,{params:u(le.params),hash:Jn(V.hash),redirectedFrom:void 0,href:Ge})}let _;if(B.path!=null)_=te({},B,{path:Ut(o,B.path,T.path).path});else{const V=te({},B.params);for(const le in V)V[le]==null&&delete V[le];_=te({},B,{params:b(V)}),T.params=b(T.params)}const U=n.resolve(_,T),$=B.hash||"";U.params=v(u(U.params));const X=ws(l,te({},B,{hash:ms($),path:U.path})),J=d.createHref(X);return te({fullPath:X,hash:$,query:l===ma?ed(B.query):B.query||{}},U,{redirectedFrom:void 0,href:J})}function S(B){return typeof B=="string"?Ut(o,B,g.value.path):te({},B)}function F(B,T){if(E!==B)return fn(8,{from:T,to:B})}function N(B){return ke(B)}function ee(B){return N(te(S(B),{replace:!0}))}function pe(B){const T=B.matched[B.matched.length-1];if(T&&T.redirect){const{redirect:_}=T;let U=typeof _=="function"?_(B):_;return typeof U=="string"&&(U=U.includes("?")||U.includes("#")?U=S(U):{path:U},U.params={}),te({query:B.query,hash:B.hash,params:U.path!=null?{}:B.params},U)}}function ke(B,T){const _=E=z(B),U=g.value,$=B.state,X=B.force,J=B.replace===!0,V=pe(_);if(V)return ke(te(S(V),{state:typeof V=="object"?te({},$,V.state):$,force:X,replace:J}),T||_);const le=_;le.redirectedFrom=T;let Ge;return!X&&Cs(l,U,_)&&(Ge=fn(16,{to:le,from:U}),he(U,U,!0,!1)),(Ge?Promise.resolve(Ge):ne(le,U)).catch(fe=>De(fe)?De(fe,2)?fe:_e(fe):be(fe,le,U)).then(fe=>{if(fe){if(De(fe,2))return ke(te({replace:J},S(fe.to),{state:typeof fe.to=="object"?te({},$,fe.to.state):$,force:X}),T||le)}else fe=je(le,U,!0,J,$);return Ze(le,U,fe),fe})}function Je(B,T){const _=F(B,T);return _?Promise.reject(_):Promise.resolve()}function $e(B){const T=Ie.values().next().value;return T&&typeof T.runWithContext=="function"?T.runWithContext(B):B()}function ne(B,T){let _;const[U,$,X]=pd(B,T);_=Ht(U.reverse(),"beforeRouteLeave",B,T);for(const V of U)V.leaveGuards.forEach(le=>{_.push(Ye(le,B,T))});const J=Je.bind(null,B,T);return _.push(J),ye(_).then(()=>{_=[];for(const V of y.list())_.push(Ye(V,B,T));return _.push(J),ye(_)}).then(()=>{_=Ht($,"beforeRouteUpdate",B,T);for(const V of $)V.updateGuards.forEach(le=>{_.push(Ye(le,B,T))});return _.push(J),ye(_)}).then(()=>{_=[];for(const V of X)if(V.beforeEnter)if(Ce(V.beforeEnter))for(const le of V.beforeEnter)_.push(Ye(le,B,T));else _.push(Ye(V.beforeEnter,B,T));return _.push(J),ye(_)}).then(()=>(B.matched.forEach(V=>V.enterCallbacks={}),_=Ht(X,"beforeRouteEnter",B,T,$e),_.push(J),ye(_))).then(()=>{_=[];for(const V of A.list())_.push(Ye(V,B,T));return _.push(J),ye(_)}).catch(V=>De(V,8)?V:Promise.reject(V))}function Ze(B,T,_){m.list().forEach(U=>$e(()=>U(B,T,_)))}function je(B,T,_,U,$){const X=F(B,T);if(X)return X;const J=T===He,V=An?history.state:{};_&&(U||J?d.replace(B.fullPath,te({scroll:J&&V&&V.scroll},$)):d.push(B.fullPath,$)),g.value=B,he(B,T,_,J),_e()}let me;function Xe(){me||(me=d.listen((B,T,_)=>{if(!Me.listening)return;const U=z(B),$=pe(U);if($){ke(te($,{replace:!0}),U).catch(Qn);return}E=U;const X=g.value;An&&Ts(da(X.fullPath,_.delta),mt()),ne(U,X).catch(J=>De(J,12)?J:De(J,2)?(ke(J.to,U).then(V=>{De(V,20)&&!_.delta&&_.type===$n.pop&&d.go(-1,!1)}).catch(Qn),Promise.reject()):(_.delta&&d.go(-_.delta,!1),be(J,U,X))).then(J=>{J=J||je(U,X,!1),J&&(_.delta&&!De(J,8)?d.go(-_.delta,!1):_.type===$n.pop&&De(J,20)&&d.go(-1,!1)),Ze(U,X,J)}).catch(Qn)}))}let Te=Un(),Be=Un(),ze;function be(B,T,_){_e(B);const U=Be.list();return U.length?U.forEach($=>$(B,T,_)):console.error(B),Promise.reject(B)}function W(){return ze&&g.value!==He?Promise.resolve():new Promise((B,T)=>{Te.add([B,T])})}function _e(B){return ze||(ze=!B,Xe(),Te.list().forEach(([T,_])=>B?_(B):T()),Te.reset()),B}function he(B,T,_,U){const{scrollBehavior:$}=e;if(!An||!$)return Promise.resolve();const X=!_&&zs(da(B.fullPath,0))||(U||!_)&&history.state&&history.state.scroll||null;return rn().then(()=>$(B,T,X)).then(J=>J&&Rs(J)).catch(J=>be(J,B,T))}const Se=B=>d.go(B);let ge;const Ie=new Set,Me={currentRoute:g,listening:!0,addRoute:k,removeRoute:x,hasRoute:R,getRoutes:w,resolve:z,options:e,push:N,replace:ee,go:Se,back:()=>Se(-1),forward:()=>Se(1),beforeEach:y.add,beforeResolve:A.add,afterEach:m.add,onError:Be.add,isReady:W,install(B){const T=this;B.component("RouterLink",ad),B.component("RouterView",sd),B.config.globalProperties.$router=T,Object.defineProperty(B.config.globalProperties,"$route",{enumerable:!0,get:()=>G(g)}),An&&!ge&&g.value===He&&(ge=!0,N(d.location).catch($=>{}));const _={};for(const $ in He)Object.defineProperty(_,$,{get:()=>g.value[$],enumerable:!0});B.provide(bt,T),B.provide(dr,Ul(_)),B.provide(Gt,g);const U=B.unmount;Ie.add(B),B.unmount=function(){Ie.delete(B),Ie.size<1&&(E=He,me&&me(),me=null,g.value=He,ge=!1,ze=!1),U()}}};function ye(B){return B.reduce((T,_)=>T.then(()=>$e(_)),Promise.resolve())}return Me}function pd(e,n){const o=[],l=[],d=[],y=Math.max(n.matched.length,e.matched.length);for(let A=0;A<y;A++){const m=n.matched[A];m&&(e.matched.find(E=>yn(E,m))?l.push(m):o.push(m));const g=e.matched[A];g&&(n.matched.find(E=>yn(E,g))||d.push(g))}return[o,l,d]}function cd(){return on(bt)}function gt(){return on(dr)}function lo(e,n){return function(){return e.apply(n,arguments)}}const{toString:ud}=Object.prototype,{getPrototypeOf:pr}=Object,vt=(e=>n=>{const o=ud.call(n);return e[o]||(e[o]=o.slice(8,-1).toLowerCase())})(Object.create(null)),Re=e=>(e=e.toLowerCase(),n=>vt(n)===e),Et=e=>n=>typeof n===e,{isArray:mn}=Array,Zn=Et("undefined");function Ad(e){return e!==null&&!Zn(e)&&e.constructor!==null&&!Zn(e.constructor)&&xe(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const so=Re("ArrayBuffer");function yd(e){let n;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?n=ArrayBuffer.isView(e):n=e&&e.buffer&&so(e.buffer),n}const fd=Et("string"),xe=Et("function"),po=Et("number"),xt=e=>e!==null&&typeof e=="object",hd=e=>e===!0||e===!1,ut=e=>{if(vt(e)!=="object")return!1;const n=pr(e);return(n===null||n===Object.prototype||Object.getPrototypeOf(n)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},md=Re("Date"),bd=Re("File"),gd=Re("Blob"),vd=Re("FileList"),Ed=e=>xt(e)&&xe(e.pipe),xd=e=>{let n;return e&&(typeof FormData=="function"&&e instanceof FormData||xe(e.append)&&((n=vt(e))==="formdata"||n==="object"&&xe(e.toString)&&e.toString()==="[object FormData]"))},wd=Re("URLSearchParams"),Cd=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function et(e,n,{allOwnKeys:o=!1}={}){if(e===null||typeof e>"u")return;let l,d;if(typeof e!="object"&&(e=[e]),mn(e))for(l=0,d=e.length;l<d;l++)n.call(null,e[l],l,e);else{const y=o?Object.getOwnPropertyNames(e):Object.keys(e),A=y.length;let m;for(l=0;l<A;l++)m=y[l],n.call(null,e[m],m,e)}}function co(e,n){n=n.toLowerCase();const o=Object.keys(e);let l=o.length,d;for(;l-- >0;)if(d=o[l],n===d.toLowerCase())return d;return null}const uo=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),Ao=e=>!Zn(e)&&e!==uo;function er(){const{caseless:e}=Ao(this)&&this||{},n={},o=(l,d)=>{const y=e&&co(n,d)||d;ut(n[y])&&ut(l)?n[y]=er(n[y],l):ut(l)?n[y]=er({},l):mn(l)?n[y]=l.slice():n[y]=l};for(let l=0,d=arguments.length;l<d;l++)arguments[l]&&et(arguments[l],o);return n}const kd=(e,n,o,{allOwnKeys:l}={})=>(et(n,(d,y)=>{o&&xe(d)?e[y]=lo(d,o):e[y]=d},{allOwnKeys:l}),e),Bd=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Sd=(e,n,o,l)=>{e.prototype=Object.create(n.prototype,l),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:n.prototype}),o&&Object.assign(e.prototype,o)},Id=(e,n,o,l)=>{let d,y,A;const m={};if(n=n||{},e==null)return n;do{for(d=Object.getOwnPropertyNames(e),y=d.length;y-- >0;)A=d[y],(!l||l(A,e,n))&&!m[A]&&(n[A]=e[A],m[A]=!0);e=o!==!1&&pr(e)}while(e&&(!o||o(e,n))&&e!==Object.prototype);return n},Ld=(e,n,o)=>{e=String(e),(o===void 0||o>e.length)&&(o=e.length),o-=n.length;const l=e.indexOf(n,o);return l!==-1&&l===o},Od=e=>{if(!e)return null;if(mn(e))return e;let n=e.length;if(!po(n))return null;const o=new Array(n);for(;n-- >0;)o[n]=e[n];return o},Rd=(e=>n=>e&&n instanceof e)(typeof Uint8Array<"u"&&pr(Uint8Array)),Td=(e,n)=>{const l=(e&&e[Symbol.iterator]).call(e);let d;for(;(d=l.next())&&!d.done;){const y=d.value;n.call(e,y[0],y[1])}},zd=(e,n)=>{let o;const l=[];for(;(o=e.exec(n))!==null;)l.push(o);return l},_d=Re("HTMLFormElement"),Pd=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(o,l,d){return l.toUpperCase()+d}),wa=(({hasOwnProperty:e})=>(n,o)=>e.call(n,o))(Object.prototype),Dd=Re("RegExp"),yo=(e,n)=>{const o=Object.getOwnPropertyDescriptors(e),l={};et(o,(d,y)=>{let A;(A=n(d,y,e))!==!1&&(l[y]=A||d)}),Object.defineProperties(e,l)},qd=e=>{yo(e,(n,o)=>{if(xe(e)&&["arguments","caller","callee"].indexOf(o)!==-1)return!1;const l=e[o];if(xe(l)){if(n.enumerable=!1,"writable"in n){n.writable=!1;return}n.set||(n.set=()=>{throw Error("Can not rewrite read-only method '"+o+"'")})}})},jd=(e,n)=>{const o={},l=d=>{d.forEach(y=>{o[y]=!0})};return mn(e)?l(e):l(String(e).split(n)),o},Md=()=>{},Nd=(e,n)=>(e=+e,Number.isFinite(e)?e:n),Wt="abcdefghijklmnopqrstuvwxyz",Ca="0123456789",fo={DIGIT:Ca,ALPHA:Wt,ALPHA_DIGIT:Wt+Wt.toUpperCase()+Ca},Fd=(e=16,n=fo.ALPHA_DIGIT)=>{let o="";const{length:l}=n;for(;e--;)o+=n[Math.random()*l|0];return o};function Ud(e){return!!(e&&xe(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const Hd=e=>{const n=new Array(10),o=(l,d)=>{if(xt(l)){if(n.indexOf(l)>=0)return;if(!("toJSON"in l)){n[d]=l;const y=mn(l)?[]:{};return et(l,(A,m)=>{const g=o(A,d+1);!Zn(g)&&(y[m]=g)}),n[d]=void 0,y}}return l};return o(e,0)},Wd=Re("AsyncFunction"),Yd=e=>e&&(xt(e)||xe(e))&&xe(e.then)&&xe(e.catch),O={isArray:mn,isArrayBuffer:so,isBuffer:Ad,isFormData:xd,isArrayBufferView:yd,isString:fd,isNumber:po,isBoolean:hd,isObject:xt,isPlainObject:ut,isUndefined:Zn,isDate:md,isFile:bd,isBlob:gd,isRegExp:Dd,isFunction:xe,isStream:Ed,isURLSearchParams:wd,isTypedArray:Rd,isFileList:vd,forEach:et,merge:er,extend:kd,trim:Cd,stripBOM:Bd,inherits:Sd,toFlatObject:Id,kindOf:vt,kindOfTest:Re,endsWith:Ld,toArray:Od,forEachEntry:Td,matchAll:zd,isHTMLForm:_d,hasOwnProperty:wa,hasOwnProp:wa,reduceDescriptors:yo,freezeMethods:qd,toObjectSet:jd,toCamelCase:Pd,noop:Md,toFiniteNumber:Nd,findKey:co,global:uo,isContextDefined:Ao,ALPHABET:fo,generateString:Fd,isSpecCompliantForm:Ud,toJSONObject:Hd,isAsyncFn:Wd,isThenable:Yd};function Z(e,n,o,l,d){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",n&&(this.code=n),o&&(this.config=o),l&&(this.request=l),d&&(this.response=d)}O.inherits(Z,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:O.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const ho=Z.prototype,mo={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{mo[e]={value:e}});Object.defineProperties(Z,mo);Object.defineProperty(ho,"isAxiosError",{value:!0});Z.from=(e,n,o,l,d,y)=>{const A=Object.create(ho);return O.toFlatObject(e,A,function(g){return g!==Error.prototype},m=>m!=="isAxiosError"),Z.call(A,e.message,n,o,l,d),A.cause=e,A.name=e.name,y&&Object.assign(A,y),A};const Qd=null;function nr(e){return O.isPlainObject(e)||O.isArray(e)}function bo(e){return O.endsWith(e,"[]")?e.slice(0,-2):e}function ka(e,n,o){return e?e.concat(n).map(function(d,y){return d=bo(d),!o&&y?"["+d+"]":d}).join(o?".":""):n}function Kd(e){return O.isArray(e)&&!e.some(nr)}const Vd=O.toFlatObject(O,{},null,function(n){return/^is[A-Z]/.test(n)});function wt(e,n,o){if(!O.isObject(e))throw new TypeError("target must be an object");n=n||new FormData,o=O.toFlatObject(o,{metaTokens:!0,dots:!1,indexes:!1},!1,function(w,R){return!O.isUndefined(R[w])});const l=o.metaTokens,d=o.visitor||v,y=o.dots,A=o.indexes,g=(o.Blob||typeof Blob<"u"&&Blob)&&O.isSpecCompliantForm(n);if(!O.isFunction(d))throw new TypeError("visitor must be a function");function E(x){if(x===null)return"";if(O.isDate(x))return x.toISOString();if(!g&&O.isBlob(x))throw new Z("Blob is not supported. Use a Buffer instead.");return O.isArrayBuffer(x)||O.isTypedArray(x)?g&&typeof Blob=="function"?new Blob([x]):Buffer.from(x):x}function v(x,w,R){let z=x;if(x&&!R&&typeof x=="object"){if(O.endsWith(w,"{}"))w=l?w:w.slice(0,-2),x=JSON.stringify(x);else if(O.isArray(x)&&Kd(x)||(O.isFileList(x)||O.endsWith(w,"[]"))&&(z=O.toArray(x)))return w=bo(w),z.forEach(function(F,N){!(O.isUndefined(F)||F===null)&&n.append(A===!0?ka([w],N,y):A===null?w:w+"[]",E(F))}),!1}return nr(x)?!0:(n.append(ka(R,w,y),E(x)),!1)}const b=[],u=Object.assign(Vd,{defaultVisitor:v,convertValue:E,isVisitable:nr});function k(x,w){if(!O.isUndefined(x)){if(b.indexOf(x)!==-1)throw Error("Circular reference detected in "+w.join("."));b.push(x),O.forEach(x,function(z,S){(!(O.isUndefined(z)||z===null)&&d.call(n,z,O.isString(S)?S.trim():S,w,u))===!0&&k(z,w?w.concat(S):[S])}),b.pop()}}if(!O.isObject(e))throw new TypeError("data must be an object");return k(e),n}function Ba(e){const n={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(l){return n[l]})}function cr(e,n){this._pairs=[],e&&wt(e,this,n)}const go=cr.prototype;go.append=function(n,o){this._pairs.push([n,o])};go.toString=function(n){const o=n?function(l){return n.call(this,l,Ba)}:Ba;return this._pairs.map(function(d){return o(d[0])+"="+o(d[1])},"").join("&")};function Jd(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function vo(e,n,o){if(!n)return e;const l=o&&o.encode||Jd,d=o&&o.serialize;let y;if(d?y=d(n,o):y=O.isURLSearchParams(n)?n.toString():new cr(n,o).toString(l),y){const A=e.indexOf("#");A!==-1&&(e=e.slice(0,A)),e+=(e.indexOf("?")===-1?"?":"&")+y}return e}class $d{constructor(){this.handlers=[]}use(n,o,l){return this.handlers.push({fulfilled:n,rejected:o,synchronous:l?l.synchronous:!1,runWhen:l?l.runWhen:null}),this.handlers.length-1}eject(n){this.handlers[n]&&(this.handlers[n]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(n){O.forEach(this.handlers,function(l){l!==null&&n(l)})}}const Sa=$d,Eo={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Zd=typeof URLSearchParams<"u"?URLSearchParams:cr,Xd=typeof FormData<"u"?FormData:null,Gd=typeof Blob<"u"?Blob:null,ep={isBrowser:!0,classes:{URLSearchParams:Zd,FormData:Xd,Blob:Gd},protocols:["http","https","file","blob","url","data"]},xo=typeof window<"u"&&typeof document<"u",np=(e=>xo&&["ReactNative","NativeScript","NS"].indexOf(e)<0)(typeof navigator<"u"&&navigator.product),tp=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),rp=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:xo,hasStandardBrowserEnv:np,hasStandardBrowserWebWorkerEnv:tp},Symbol.toStringTag,{value:"Module"})),Oe={...rp,...ep};function ap(e,n){return wt(e,new Oe.classes.URLSearchParams,Object.assign({visitor:function(o,l,d,y){return Oe.isNode&&O.isBuffer(o)?(this.append(l,o.toString("base64")),!1):y.defaultVisitor.apply(this,arguments)}},n))}function op(e){return O.matchAll(/\w+|\[(\w*)]/g,e).map(n=>n[0]==="[]"?"":n[1]||n[0])}function ip(e){const n={},o=Object.keys(e);let l;const d=o.length;let y;for(l=0;l<d;l++)y=o[l],n[y]=e[y];return n}function wo(e){function n(o,l,d,y){let A=o[y++];if(A==="__proto__")return!0;const m=Number.isFinite(+A),g=y>=o.length;return A=!A&&O.isArray(d)?d.length:A,g?(O.hasOwnProp(d,A)?d[A]=[d[A],l]:d[A]=l,!m):((!d[A]||!O.isObject(d[A]))&&(d[A]=[]),n(o,l,d[A],y)&&O.isArray(d[A])&&(d[A]=ip(d[A])),!m)}if(O.isFormData(e)&&O.isFunction(e.entries)){const o={};return O.forEachEntry(e,(l,d)=>{n(op(l),d,o,0)}),o}return null}function lp(e,n,o){if(O.isString(e))try{return(n||JSON.parse)(e),O.trim(e)}catch(l){if(l.name!=="SyntaxError")throw l}return(o||JSON.stringify)(e)}const ur={transitional:Eo,adapter:["xhr","http"],transformRequest:[function(n,o){const l=o.getContentType()||"",d=l.indexOf("application/json")>-1,y=O.isObject(n);if(y&&O.isHTMLForm(n)&&(n=new FormData(n)),O.isFormData(n))return d?JSON.stringify(wo(n)):n;if(O.isArrayBuffer(n)||O.isBuffer(n)||O.isStream(n)||O.isFile(n)||O.isBlob(n))return n;if(O.isArrayBufferView(n))return n.buffer;if(O.isURLSearchParams(n))return o.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),n.toString();let m;if(y){if(l.indexOf("application/x-www-form-urlencoded")>-1)return ap(n,this.formSerializer).toString();if((m=O.isFileList(n))||l.indexOf("multipart/form-data")>-1){const g=this.env&&this.env.FormData;return wt(m?{"files[]":n}:n,g&&new g,this.formSerializer)}}return y||d?(o.setContentType("application/json",!1),lp(n)):n}],transformResponse:[function(n){const o=this.transitional||ur.transitional,l=o&&o.forcedJSONParsing,d=this.responseType==="json";if(n&&O.isString(n)&&(l&&!this.responseType||d)){const A=!(o&&o.silentJSONParsing)&&d;try{return JSON.parse(n)}catch(m){if(A)throw m.name==="SyntaxError"?Z.from(m,Z.ERR_BAD_RESPONSE,this,null,this.response):m}}return n}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Oe.classes.FormData,Blob:Oe.classes.Blob},validateStatus:function(n){return n>=200&&n<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};O.forEach(["delete","get","head","post","put","patch"],e=>{ur.headers[e]={}});const Ar=ur,sp=O.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),dp=e=>{const n={};let o,l,d;return e&&e.split(`
`).forEach(function(A){d=A.indexOf(":"),o=A.substring(0,d).trim().toLowerCase(),l=A.substring(d+1).trim(),!(!o||n[o]&&sp[o])&&(o==="set-cookie"?n[o]?n[o].push(l):n[o]=[l]:n[o]=n[o]?n[o]+", "+l:l)}),n},Ia=Symbol("internals");function Hn(e){return e&&String(e).trim().toLowerCase()}function At(e){return e===!1||e==null?e:O.isArray(e)?e.map(At):String(e)}function pp(e){const n=Object.create(null),o=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let l;for(;l=o.exec(e);)n[l[1]]=l[2];return n}const cp=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Yt(e,n,o,l,d){if(O.isFunction(l))return l.call(this,n,o);if(d&&(n=o),!!O.isString(n)){if(O.isString(l))return n.indexOf(l)!==-1;if(O.isRegExp(l))return l.test(n)}}function up(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(n,o,l)=>o.toUpperCase()+l)}function Ap(e,n){const o=O.toCamelCase(" "+n);["get","set","has"].forEach(l=>{Object.defineProperty(e,l+o,{value:function(d,y,A){return this[l].call(this,n,d,y,A)},configurable:!0})})}class Ct{constructor(n){n&&this.set(n)}set(n,o,l){const d=this;function y(m,g,E){const v=Hn(g);if(!v)throw new Error("header name must be a non-empty string");const b=O.findKey(d,v);(!b||d[b]===void 0||E===!0||E===void 0&&d[b]!==!1)&&(d[b||g]=At(m))}const A=(m,g)=>O.forEach(m,(E,v)=>y(E,v,g));return O.isPlainObject(n)||n instanceof this.constructor?A(n,o):O.isString(n)&&(n=n.trim())&&!cp(n)?A(dp(n),o):n!=null&&y(o,n,l),this}get(n,o){if(n=Hn(n),n){const l=O.findKey(this,n);if(l){const d=this[l];if(!o)return d;if(o===!0)return pp(d);if(O.isFunction(o))return o.call(this,d,l);if(O.isRegExp(o))return o.exec(d);throw new TypeError("parser must be boolean|regexp|function")}}}has(n,o){if(n=Hn(n),n){const l=O.findKey(this,n);return!!(l&&this[l]!==void 0&&(!o||Yt(this,this[l],l,o)))}return!1}delete(n,o){const l=this;let d=!1;function y(A){if(A=Hn(A),A){const m=O.findKey(l,A);m&&(!o||Yt(l,l[m],m,o))&&(delete l[m],d=!0)}}return O.isArray(n)?n.forEach(y):y(n),d}clear(n){const o=Object.keys(this);let l=o.length,d=!1;for(;l--;){const y=o[l];(!n||Yt(this,this[y],y,n,!0))&&(delete this[y],d=!0)}return d}normalize(n){const o=this,l={};return O.forEach(this,(d,y)=>{const A=O.findKey(l,y);if(A){o[A]=At(d),delete o[y];return}const m=n?up(y):String(y).trim();m!==y&&delete o[y],o[m]=At(d),l[m]=!0}),this}concat(...n){return this.constructor.concat(this,...n)}toJSON(n){const o=Object.create(null);return O.forEach(this,(l,d)=>{l!=null&&l!==!1&&(o[d]=n&&O.isArray(l)?l.join(", "):l)}),o}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([n,o])=>n+": "+o).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(n){return n instanceof this?n:new this(n)}static concat(n,...o){const l=new this(n);return o.forEach(d=>l.set(d)),l}static accessor(n){const l=(this[Ia]=this[Ia]={accessors:{}}).accessors,d=this.prototype;function y(A){const m=Hn(A);l[m]||(Ap(d,A),l[m]=!0)}return O.isArray(n)?n.forEach(y):y(n),this}}Ct.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);O.reduceDescriptors(Ct.prototype,({value:e},n)=>{let o=n[0].toUpperCase()+n.slice(1);return{get:()=>e,set(l){this[o]=l}}});O.freezeMethods(Ct);const qe=Ct;function Qt(e,n){const o=this||Ar,l=n||o,d=qe.from(l.headers);let y=l.data;return O.forEach(e,function(m){y=m.call(o,y,d.normalize(),n?n.status:void 0)}),d.normalize(),y}function Co(e){return!!(e&&e.__CANCEL__)}function nt(e,n,o){Z.call(this,e??"canceled",Z.ERR_CANCELED,n,o),this.name="CanceledError"}O.inherits(nt,Z,{__CANCEL__:!0});function yp(e,n,o){const l=o.config.validateStatus;!o.status||!l||l(o.status)?e(o):n(new Z("Request failed with status code "+o.status,[Z.ERR_BAD_REQUEST,Z.ERR_BAD_RESPONSE][Math.floor(o.status/100)-4],o.config,o.request,o))}const fp=Oe.hasStandardBrowserEnv?{write(e,n,o,l,d,y){const A=[e+"="+encodeURIComponent(n)];O.isNumber(o)&&A.push("expires="+new Date(o).toGMTString()),O.isString(l)&&A.push("path="+l),O.isString(d)&&A.push("domain="+d),y===!0&&A.push("secure"),document.cookie=A.join("; ")},read(e){const n=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function hp(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function mp(e,n){return n?e.replace(/\/?\/$/,"")+"/"+n.replace(/^\/+/,""):e}function ko(e,n){return e&&!hp(n)?mp(e,n):n}const bp=Oe.hasStandardBrowserEnv?function(){const n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");let l;function d(y){let A=y;return n&&(o.setAttribute("href",A),A=o.href),o.setAttribute("href",A),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:o.pathname.charAt(0)==="/"?o.pathname:"/"+o.pathname}}return l=d(window.location.href),function(A){const m=O.isString(A)?d(A):A;return m.protocol===l.protocol&&m.host===l.host}}():function(){return function(){return!0}}();function gp(e){const n=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return n&&n[1]||""}function vp(e,n){e=e||10;const o=new Array(e),l=new Array(e);let d=0,y=0,A;return n=n!==void 0?n:1e3,function(g){const E=Date.now(),v=l[y];A||(A=E),o[d]=g,l[d]=E;let b=y,u=0;for(;b!==d;)u+=o[b++],b=b%e;if(d=(d+1)%e,d===y&&(y=(y+1)%e),E-A<n)return;const k=v&&E-v;return k?Math.round(u*1e3/k):void 0}}function La(e,n){let o=0;const l=vp(50,250);return d=>{const y=d.loaded,A=d.lengthComputable?d.total:void 0,m=y-o,g=l(m),E=y<=A;o=y;const v={loaded:y,total:A,progress:A?y/A:void 0,bytes:m,rate:g||void 0,estimated:g&&A&&E?(A-y)/g:void 0,event:d};v[n?"download":"upload"]=!0,e(v)}}const Ep=typeof XMLHttpRequest<"u",xp=Ep&&function(e){return new Promise(function(o,l){let d=e.data;const y=qe.from(e.headers).normalize();let{responseType:A,withXSRFToken:m}=e,g;function E(){e.cancelToken&&e.cancelToken.unsubscribe(g),e.signal&&e.signal.removeEventListener("abort",g)}let v;if(O.isFormData(d)){if(Oe.hasStandardBrowserEnv||Oe.hasStandardBrowserWebWorkerEnv)y.setContentType(!1);else if((v=y.getContentType())!==!1){const[w,...R]=v?v.split(";").map(z=>z.trim()).filter(Boolean):[];y.setContentType([w||"multipart/form-data",...R].join("; "))}}let b=new XMLHttpRequest;if(e.auth){const w=e.auth.username||"",R=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";y.set("Authorization","Basic "+btoa(w+":"+R))}const u=ko(e.baseURL,e.url);b.open(e.method.toUpperCase(),vo(u,e.params,e.paramsSerializer),!0),b.timeout=e.timeout;function k(){if(!b)return;const w=qe.from("getAllResponseHeaders"in b&&b.getAllResponseHeaders()),z={data:!A||A==="text"||A==="json"?b.responseText:b.response,status:b.status,statusText:b.statusText,headers:w,config:e,request:b};yp(function(F){o(F),E()},function(F){l(F),E()},z),b=null}if("onloadend"in b?b.onloadend=k:b.onreadystatechange=function(){!b||b.readyState!==4||b.status===0&&!(b.responseURL&&b.responseURL.indexOf("file:")===0)||setTimeout(k)},b.onabort=function(){b&&(l(new Z("Request aborted",Z.ECONNABORTED,e,b)),b=null)},b.onerror=function(){l(new Z("Network Error",Z.ERR_NETWORK,e,b)),b=null},b.ontimeout=function(){let R=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const z=e.transitional||Eo;e.timeoutErrorMessage&&(R=e.timeoutErrorMessage),l(new Z(R,z.clarifyTimeoutError?Z.ETIMEDOUT:Z.ECONNABORTED,e,b)),b=null},Oe.hasStandardBrowserEnv&&(m&&O.isFunction(m)&&(m=m(e)),m||m!==!1&&bp(u))){const w=e.xsrfHeaderName&&e.xsrfCookieName&&fp.read(e.xsrfCookieName);w&&y.set(e.xsrfHeaderName,w)}d===void 0&&y.setContentType(null),"setRequestHeader"in b&&O.forEach(y.toJSON(),function(R,z){b.setRequestHeader(z,R)}),O.isUndefined(e.withCredentials)||(b.withCredentials=!!e.withCredentials),A&&A!=="json"&&(b.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&b.addEventListener("progress",La(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&b.upload&&b.upload.addEventListener("progress",La(e.onUploadProgress)),(e.cancelToken||e.signal)&&(g=w=>{b&&(l(!w||w.type?new nt(null,e,b):w),b.abort(),b=null)},e.cancelToken&&e.cancelToken.subscribe(g),e.signal&&(e.signal.aborted?g():e.signal.addEventListener("abort",g)));const x=gp(u);if(x&&Oe.protocols.indexOf(x)===-1){l(new Z("Unsupported protocol "+x+":",Z.ERR_BAD_REQUEST,e));return}b.send(d||null)})},tr={http:Qd,xhr:xp};O.forEach(tr,(e,n)=>{if(e){try{Object.defineProperty(e,"name",{value:n})}catch{}Object.defineProperty(e,"adapterName",{value:n})}});const Oa=e=>`- ${e}`,wp=e=>O.isFunction(e)||e===null||e===!1,Bo={getAdapter:e=>{e=O.isArray(e)?e:[e];const{length:n}=e;let o,l;const d={};for(let y=0;y<n;y++){o=e[y];let A;if(l=o,!wp(o)&&(l=tr[(A=String(o)).toLowerCase()],l===void 0))throw new Z(`Unknown adapter '${A}'`);if(l)break;d[A||"#"+y]=l}if(!l){const y=Object.entries(d).map(([m,g])=>`adapter ${m} `+(g===!1?"is not supported by the environment":"is not available in the build"));let A=n?y.length>1?`since :
`+y.map(Oa).join(`
`):" "+Oa(y[0]):"as no adapter specified";throw new Z("There is no suitable adapter to dispatch the request "+A,"ERR_NOT_SUPPORT")}return l},adapters:tr};function Kt(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new nt(null,e)}function Ra(e){return Kt(e),e.headers=qe.from(e.headers),e.data=Qt.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Bo.getAdapter(e.adapter||Ar.adapter)(e).then(function(l){return Kt(e),l.data=Qt.call(e,e.transformResponse,l),l.headers=qe.from(l.headers),l},function(l){return Co(l)||(Kt(e),l&&l.response&&(l.response.data=Qt.call(e,e.transformResponse,l.response),l.response.headers=qe.from(l.response.headers))),Promise.reject(l)})}const Ta=e=>e instanceof qe?{...e}:e;function hn(e,n){n=n||{};const o={};function l(E,v,b){return O.isPlainObject(E)&&O.isPlainObject(v)?O.merge.call({caseless:b},E,v):O.isPlainObject(v)?O.merge({},v):O.isArray(v)?v.slice():v}function d(E,v,b){if(O.isUndefined(v)){if(!O.isUndefined(E))return l(void 0,E,b)}else return l(E,v,b)}function y(E,v){if(!O.isUndefined(v))return l(void 0,v)}function A(E,v){if(O.isUndefined(v)){if(!O.isUndefined(E))return l(void 0,E)}else return l(void 0,v)}function m(E,v,b){if(b in n)return l(E,v);if(b in e)return l(void 0,E)}const g={url:y,method:y,data:y,baseURL:A,transformRequest:A,transformResponse:A,paramsSerializer:A,timeout:A,timeoutMessage:A,withCredentials:A,withXSRFToken:A,adapter:A,responseType:A,xsrfCookieName:A,xsrfHeaderName:A,onUploadProgress:A,onDownloadProgress:A,decompress:A,maxContentLength:A,maxBodyLength:A,beforeRedirect:A,transport:A,httpAgent:A,httpsAgent:A,cancelToken:A,socketPath:A,responseEncoding:A,validateStatus:m,headers:(E,v)=>d(Ta(E),Ta(v),!0)};return O.forEach(Object.keys(Object.assign({},e,n)),function(v){const b=g[v]||d,u=b(e[v],n[v],v);O.isUndefined(u)&&b!==m||(o[v]=u)}),o}const So="1.6.8",yr={};["object","boolean","number","function","string","symbol"].forEach((e,n)=>{yr[e]=function(l){return typeof l===e||"a"+(n<1?"n ":" ")+e}});const za={};yr.transitional=function(n,o,l){function d(y,A){return"[Axios v"+So+"] Transitional option '"+y+"'"+A+(l?". "+l:"")}return(y,A,m)=>{if(n===!1)throw new Z(d(A," has been removed"+(o?" in "+o:"")),Z.ERR_DEPRECATED);return o&&!za[A]&&(za[A]=!0,console.warn(d(A," has been deprecated since v"+o+" and will be removed in the near future"))),n?n(y,A,m):!0}};function Cp(e,n,o){if(typeof e!="object")throw new Z("options must be an object",Z.ERR_BAD_OPTION_VALUE);const l=Object.keys(e);let d=l.length;for(;d-- >0;){const y=l[d],A=n[y];if(A){const m=e[y],g=m===void 0||A(m,y,e);if(g!==!0)throw new Z("option "+y+" must be "+g,Z.ERR_BAD_OPTION_VALUE);continue}if(o!==!0)throw new Z("Unknown option "+y,Z.ERR_BAD_OPTION)}}const rr={assertOptions:Cp,validators:yr},We=rr.validators;class ft{constructor(n){this.defaults=n,this.interceptors={request:new Sa,response:new Sa}}async request(n,o){try{return await this._request(n,o)}catch(l){if(l instanceof Error){let d;Error.captureStackTrace?Error.captureStackTrace(d={}):d=new Error;const y=d.stack?d.stack.replace(/^.+\n/,""):"";l.stack?y&&!String(l.stack).endsWith(y.replace(/^.+\n.+\n/,""))&&(l.stack+=`
`+y):l.stack=y}throw l}}_request(n,o){typeof n=="string"?(o=o||{},o.url=n):o=n||{},o=hn(this.defaults,o);const{transitional:l,paramsSerializer:d,headers:y}=o;l!==void 0&&rr.assertOptions(l,{silentJSONParsing:We.transitional(We.boolean),forcedJSONParsing:We.transitional(We.boolean),clarifyTimeoutError:We.transitional(We.boolean)},!1),d!=null&&(O.isFunction(d)?o.paramsSerializer={serialize:d}:rr.assertOptions(d,{encode:We.function,serialize:We.function},!0)),o.method=(o.method||this.defaults.method||"get").toLowerCase();let A=y&&O.merge(y.common,y[o.method]);y&&O.forEach(["delete","get","head","post","put","patch","common"],x=>{delete y[x]}),o.headers=qe.concat(A,y);const m=[];let g=!0;this.interceptors.request.forEach(function(w){typeof w.runWhen=="function"&&w.runWhen(o)===!1||(g=g&&w.synchronous,m.unshift(w.fulfilled,w.rejected))});const E=[];this.interceptors.response.forEach(function(w){E.push(w.fulfilled,w.rejected)});let v,b=0,u;if(!g){const x=[Ra.bind(this),void 0];for(x.unshift.apply(x,m),x.push.apply(x,E),u=x.length,v=Promise.resolve(o);b<u;)v=v.then(x[b++],x[b++]);return v}u=m.length;let k=o;for(b=0;b<u;){const x=m[b++],w=m[b++];try{k=x(k)}catch(R){w.call(this,R);break}}try{v=Ra.call(this,k)}catch(x){return Promise.reject(x)}for(b=0,u=E.length;b<u;)v=v.then(E[b++],E[b++]);return v}getUri(n){n=hn(this.defaults,n);const o=ko(n.baseURL,n.url);return vo(o,n.params,n.paramsSerializer)}}O.forEach(["delete","get","head","options"],function(n){ft.prototype[n]=function(o,l){return this.request(hn(l||{},{method:n,url:o,data:(l||{}).data}))}});O.forEach(["post","put","patch"],function(n){function o(l){return function(y,A,m){return this.request(hn(m||{},{method:n,headers:l?{"Content-Type":"multipart/form-data"}:{},url:y,data:A}))}}ft.prototype[n]=o(),ft.prototype[n+"Form"]=o(!0)});const yt=ft;class fr{constructor(n){if(typeof n!="function")throw new TypeError("executor must be a function.");let o;this.promise=new Promise(function(y){o=y});const l=this;this.promise.then(d=>{if(!l._listeners)return;let y=l._listeners.length;for(;y-- >0;)l._listeners[y](d);l._listeners=null}),this.promise.then=d=>{let y;const A=new Promise(m=>{l.subscribe(m),y=m}).then(d);return A.cancel=function(){l.unsubscribe(y)},A},n(function(y,A,m){l.reason||(l.reason=new nt(y,A,m),o(l.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(n){if(this.reason){n(this.reason);return}this._listeners?this._listeners.push(n):this._listeners=[n]}unsubscribe(n){if(!this._listeners)return;const o=this._listeners.indexOf(n);o!==-1&&this._listeners.splice(o,1)}static source(){let n;return{token:new fr(function(d){n=d}),cancel:n}}}const kp=fr;function Bp(e){return function(o){return e.apply(null,o)}}function Sp(e){return O.isObject(e)&&e.isAxiosError===!0}const ar={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(ar).forEach(([e,n])=>{ar[n]=e});const Ip=ar;function Io(e){const n=new yt(e),o=lo(yt.prototype.request,n);return O.extend(o,yt.prototype,n,{allOwnKeys:!0}),O.extend(o,n,null,{allOwnKeys:!0}),o.create=function(d){return Io(hn(e,d))},o}const ce=Io(Ar);ce.Axios=yt;ce.CanceledError=nt;ce.CancelToken=kp;ce.isCancel=Co;ce.VERSION=So;ce.toFormData=wt;ce.AxiosError=Z;ce.Cancel=ce.CanceledError;ce.all=function(n){return Promise.all(n)};ce.spread=Bp;ce.isAxiosError=Sp;ce.mergeConfig=hn;ce.AxiosHeaders=qe;ce.formToJSON=e=>wo(O.isHTMLForm(e)?new FormData(e):e);ce.getAdapter=Bo.getAdapter;ce.HttpStatusCode=Ip;ce.default=ce;const _a=ce;const Lp={class:"box"},Op={class:"main"},Rp={class:"title"},Tp={class:"body"},zp={class:"footer"},_p={__name:"Dialog",props:{title:{type:String,default:"标题"},btnNum:{type:Number,default:1},okBtnText:{type:String,default:"确定"}},emits:["okBtn","closeBtn"],setup(e,{emit:n}){const o=e,l=n,d=()=>{l("okBtn")},y=()=>{l("closeBtn")};return(A,m)=>(Y(),se("div",Lp,[K("div",Op,[K("div",Rp,[K("span",null,an(o.title),1)]),K("div",Tp,[Hl(A.$slots,"body",{},void 0,!0)]),K("div",zp,[o.btnNum>1?(Y(),se("div",{key:0,class:"close-btn",onClick:y},"关闭")):Qe("",!0),K("div",{class:"ok-btn",onClick:d},an(o.okBtnText),1)])])]))}},Vt=Gn(_p,[["__scopeId","data-v-21945e4a"]]);const Pp={class:"box"},Dp=["onClick"],qp={class:"icon"},jp={key:2,class:"icon-svg",style:{"object-fit":"cover",width:"100%",height:"100%","aspect-ratio":"1/1"},alt:"data.name",src:""},Mp={class:"file-name"},Np={key:0,style:{height:"6rem","text-align":"center","line-height":"6rem"}},Fp={__name:"ImageTable",props:{tableData:{type:Array,default:[]},showMax:{type:Number,default:99999},imgSize:{type:Number,default:500},columns:{type:Number,default:3},themeColor:{type:String,default:""}},emits:["clickFile","copyUrl","delFile"],setup(e,{emit:n}){const o=oe(!1),l=oe([]),d=n,y=[".MP4",".AVI",".MOV",".FLV",".MKV"],A=[".JPG",".JPEG",".PNG",".WEBP"],m=[".PSD"],g=[".RAR",".ZIP",".7Z"],E=[".WAV",".MP3",".OGG"],v=[".DOC",".DOCX"],b=[".XLS",".XLSX"],u=oe("100%"),k=e;Ve(()=>{l.value=k.tableData.slice(0,k.showMax)});const x=w=>{d("clickFile",w)};return Xn(()=>k.tableData,()=>{o.value=!1,k.tableData.length>k.showMax?l.value=k.tableData.slice(0,k.showMax):l.value=k.tableData}),(w,R)=>{const z=Wl("lazy");return Y(),se("div",Pp,[(Y(!0),se(Wn,null,ct(l.value,(S,F)=>(Y(),se("div",{key:F,class:"item",style:Ua({width:`calc(100%/${e.columns})`}),onClick:N=>x(F)},[K("div",qp,[S.isDirectory?(Y(),ie(G(Ha),{key:0,class:"icon-svg",theme:"outline",size:u.value,fill:e.themeColor,strokeWidth:2},null,8,["size","fill"])):y.includes(S.suffix.toUpperCase())?(Y(),ie(G(Wa),{key:1,class:"icon-svg",theme:"outline",size:u.value,fill:e.themeColor,strokeWidth:2},null,8,["size","fill"])):A.includes(S.suffix.toUpperCase())?$t((Y(),se("img",jp,null,512)),[[z,S.url+`!${e.imgSize}x${e.imgSize}`]]):g.includes(S.suffix.toUpperCase())?(Y(),ie(G(Ya),{key:3,class:"icon-svg",theme:"outline",size:u.value,fill:e.themeColor,strokeWidth:2},null,8,["size","fill"])):E.includes(S.suffix.toUpperCase())?(Y(),ie(G(Qa),{key:4,class:"icon-svg",theme:"outline",size:u.value,fill:e.themeColor,strokeWidth:2},null,8,["size","fill"])):v.includes(S.suffix.toUpperCase())?(Y(),ie(G(Ka),{key:5,class:"icon-svg",theme:"outline",size:u.value,fill:e.themeColor,strokeWidth:2},null,8,["size","fill"])):b.includes(S.suffix.toUpperCase())?(Y(),ie(G(Va),{key:6,class:"icon-svg",theme:"outline",size:u.value,fill:e.themeColor,strokeWidth:2},null,8,["size","fill"])):m.includes(S.suffix.toUpperCase())?(Y(),ie(G(Ja),{key:7,class:"icon-svg",theme:"outline",size:u.value,fill:e.themeColor,strokeWidth:2},null,8,["size","fill"])):(Y(),ie(G($a),{key:8,theme:"outline",size:u.value,fill:e.themeColor,strokeWidth:2},null,8,["size","fill"]))]),K("div",Mp,an(S.name),1)],12,Dp))),128)),e.tableData.length===0?(Y(),se("div",Np," 当前数据为空 ")):Qe("",!0)])}}},Up=Gn(Fp,[["__scopeId","data-v-b1d13767"]]);const Hp={class:"box"},Wp={style:{"background-color":"#f6f6f6"}},Yp=["onClick"],Qp={class:"file-logo"},Kp={class:"file-text"},Vp={key:0,class:"file-name",style:{display:"flex","text-align":"center"}},Jp={style:{flex:"1"}},$p=["onClick"],Zp={style:{flex:"1"}},Xp=["onClick"],Gp={key:2,class:"file-name"},ec={key:0,style:{height:"6rem","text-align":"center","line-height":"6rem"}},nc={__name:"InfoTable",props:{tableData:{type:Array,default:[]},tableHead:{type:Array,default:[]},showMax:{type:Number,default:99999},themeColor:{type:String,default:""}},emits:["clickFile","copyUrl","delFile"],setup(e,{emit:n}){const o=oe(!1),l=oe([]),d=n,y=[".MP4",".AVI",".MOV",".FLV",".MKV"],A=[".JPG",".JPEG",".PNG",".WEBP"],m=[".PSD"],g=[".RAR",".ZIP",".7Z"],E=[".WAV",".MP3",".OGG"],v=[".DOC",".DOCX"],b=[".XLS",".XLSX"],u=e;Ve(()=>{l.value=u.tableData.slice(0,u.showMax)});const k=R=>{d("clickFile",R)},x=R=>{d("copyUrl",R)},w=R=>{d("delFile",R)};return Xn(()=>u.tableData,()=>{o.value=!1,u.tableData.length>u.showMax?l.value=u.tableData.slice(0,u.showMax):l.value=u.tableData}),(R,z)=>(Y(),se("div",Hp,[K("table",null,[K("tr",Wp,[(Y(!0),se(Wn,null,ct(e.tableHead,S=>(Y(),se("th",{class:aa({bgRed:S.bgColor==="red",bgGreen:S.bgColor==="green",textRed:S.textColor==="red",textGreen:S.textColor==="green"}),style:Ua({width:S.width})},an(S.span),7))),256))]),(Y(!0),se(Wn,null,ct(l.value,(S,F)=>(Y(),se("tr",null,[(Y(!0),se(Wn,null,ct(e.tableHead,N=>(Y(),se("td",{class:aa({textRed:N.textColor==="red",textGreen:N.textColor==="green"})},[N.prop==="name"?(Y(),se("div",{key:0,class:"file-name",onClick:ee=>k(F)},[K("div",Qp,[S.isDirectory?(Y(),ie(G(Ha),{key:0,class:"icon-svg",theme:"outline",size:"24",fill:e.themeColor,strokeWidth:2},null,8,["fill"])):y.includes(S.suffix.toUpperCase())?(Y(),ie(G(Wa),{key:1,class:"icon-svg",theme:"outline",size:"24",fill:e.themeColor,strokeWidth:2},null,8,["fill"])):A.includes(S.suffix.toUpperCase())?(Y(),ie(G(Yl),{key:2,class:"icon-svg",theme:"outline",size:"24",fill:e.themeColor,strokeWidth:2},null,8,["fill"])):g.includes(S.suffix.toUpperCase())?(Y(),ie(G(Ya),{key:3,class:"icon-svg",theme:"outline",size:"24",fill:e.themeColor,strokeWidth:2},null,8,["fill"])):E.includes(S.suffix.toUpperCase())?(Y(),ie(G(Qa),{key:4,class:"icon-svg",theme:"outline",size:"24",fill:e.themeColor,strokeWidth:2},null,8,["fill"])):v.includes(S.suffix.toUpperCase())?(Y(),ie(G(Ka),{key:5,class:"icon-svg",theme:"outline",size:"24",fill:e.themeColor,strokeWidth:2},null,8,["fill"])):b.includes(S.suffix.toUpperCase())?(Y(),ie(G(Va),{key:6,class:"icon-svg",theme:"outline",size:"24",fill:e.themeColor,strokeWidth:2},null,8,["fill"])):m.includes(S.suffix.toUpperCase())?(Y(),ie(G(Ja),{key:7,class:"icon-svg",theme:"outline",size:"24",fill:e.themeColor,strokeWidth:2},null,8,["fill"])):(Y(),ie(G($a),{key:8,theme:"outline",size:"24",fill:e.themeColor,strokeWidth:2},null,8,["fill"]))]),K("div",Kp,an(S[N.prop]),1)],8,Yp)):N.prop==="cz"?(Y(),se(Wn,{key:1},[S.isFile?(Y(),se("div",Vp,[K("div",Jp,[K("button",{onClick:ee=>x(F)},"分享",8,$p)]),K("div",Zp,[K("button",{onClick:ee=>w(F)},"删除",8,Xp)])])):Qe("",!0)],64)):(Y(),se("div",Gp,an(S[N.prop]),1))],2))),256))]))),256))]),e.tableData.length===0?(Y(),se("div",ec," 当前数据为空 ")):Qe("",!0)]))}},tc=Gn(nc,[["__scopeId","data-v-2c974cfd"]]);const kt=e=>(Gl("data-v-de0deb5f"),e=e(),es(),e),rc={class:"top-box"},ac={class:"top-title"},oc={class:"mode"},ic={style:{height:"100%","padding-top":"40px"}},lc={key:0,class:"imgBox"},sc={class:"img"},dc=["src"],pc={class:"play-list"},cc=kt(()=>K("div",{style:{"padding-top":"20px","padding-bottom":"20px"}}," 是否删除文件 ",-1)),uc={class:"set-item"},Ac=kt(()=>K("span",null,"预览图像素：",-1)),yc={class:"set-item"},fc=kt(()=>K("span",null,"图片模式列数：",-1)),hc={class:"set-item"},mc=kt(()=>K("span",null,"主题色：",-1)),bc={__name:"main",setup(e){const n=oe(!1),o=oe(!1),l=cd();gt();const d=oe(500),y=oe(3);let A;A=`${window.location.protocol}//${window.location.hostname}:${window.location.port}`;const m=oe("$"),g=oe([]),E=oe([{span:"文件名",prop:"name",textColor:"",bgColor:""},{span:"大小",prop:"size",textColor:"red",bgColor:"red"},{span:"操作",prop:"cz",width:"80px",textColor:"green",bgColor:"green"}]),v=oe("#f6823b"),b=()=>{R.value||n.value||o.value||ge.value?(R.value=!1,n.value=!1,o.value=!1,ge.value=!1):(m.value=m.value.slice(0,m.value.lastIndexOf("__")===-1?m.value.length:m.value.lastIndexOf("__")),be())},u=oe([]),k=oe(""),x=oe(0),w=oe(0),R=oe(!1),z=()=>{x.value++,x.value=x.value%u.value.length,k.value=u.value[x.value],console.log(x.value)},S=()=>{x.value--,x.value<0&&(x.value=u.value.length-1),x.value=x.value%u.value.length,k.value=u.value[x.value]},F=()=>{R.value=!0,k.value=u.value[x.value],console.log(u.value)},N=()=>{R.value=!1},ee=(B,T)=>(B==="$"?B="":B=B.replace(/\$/g,""),B=B.replace(/__/g,"/"),console.log(`获取文件：${A}/getFile${B}/${T}`),`${A}/getFile${B}/${T}`),pe=(B,T)=>(B==="$"?B="":B=B.replace(/\$/g,""),B=B.replace(/__/g,"/"),`${B}/${T}`),ke=B=>{let T=g.value[B];try{navigator.share({title:T.name,url:ee(m.value,T.name)})}catch{alert(ee(m.value,T.name))}},Je=B=>{o.value=!0,w.value=B},$e=[".MP4",".AVI",".MOV",".FLV",".MKV"],ne=[".JPG",".JPEG",".PNG",".WEBP"],Ze=[".WAV",".MP3",".OGG"],je=()=>{n.value=!1},me=()=>{o.value=!1},Xe=()=>{o.value=!1,rn(()=>{let B=g.value[w.value];_a.post(`${A}/delFile`,{filePath:pe(m.value,B.name)}).then((T,_)=>{T.status===200&&be()})})},Te=B=>{n.value=!1,rn(()=>{B==="web"?l.push({path:"/VideoPlay",query:{url:Be.value}}):B==="vlc"?window.open("vlc://"+Be.value):l.push({path:"/HtmlVideoPlay",query:{url:Be.value}})})},Be=oe(""),ze=B=>{let T=g.value[B];if(T.isDirectory&&!T.isFile)m.value+=`__${T.name}`,be(),_e();else{let _=T.suffix;if($e.includes(_.toUpperCase()))Be.value=ee(m.value,T.name),n.value=!0;else if(ne.includes(_.toUpperCase())){u.value=[];let U=0;for(let $=0;$<g.value.length;$++){let X=g.value[$].suffix;ne.includes(X.toUpperCase())&&(g.value[$].name===g.value[B].name&&(x.value=U),U++,u.value.push(ee(m.value,g.value[$].name)))}F()}else if(Ze.includes(_.toUpperCase()))l.push({path:"/AudioPlay",query:{url:ee(m.value,T.name)}});else{let U=document.createElement("a");U.href=ee(m.value,T.name),U.download=T.name,U.target="_blank",U.click()}}},be=()=>{_a.get(`${A}/list/${m.value}`).then((B,T)=>{B.status===200&&(g.value=B.data.map(_=>(_.size=(Number(_.size)/1024/1024).toFixed(2)+"MB",_.isDirectory?_.size="":_.url=ee(m.value,_.name),_)))})},W=()=>{b()},_e=()=>{window.history&&window.history.pushState&&(history.pushState(null,null,document.URL),window.addEventListener("popstate",W,!1))},he=oe("list"),Se=()=>{he.value=he.value==="list"?"img":"list",localStorage.setItem("model",he.value)},ge=oe(!1),Ie=()=>{ge.value=!0},Me=()=>{ge.value=!1,localStorage.setItem("imgSize",String(d.value)),localStorage.setItem("columns",String(y.value)),localStorage.setItem("themeColor",String(v.value))},ye=()=>{localStorage.clear(),location.reload()};return Ve(()=>{d.value=Number(localStorage.getItem("imgSize")||500),y.value=Number(localStorage.getItem("columns")||3),v.value=localStorage.getItem("themeColor")||"#f6823b",he.value=localStorage.getItem("model")||"list";let B=localStorage.getItem("path");B&&(m.value=B),_e(),be()}),lr(()=>{window.removeEventListener("popstate",W,!1)}),Xn(m,(B,T)=>{localStorage.setItem("path",B)}),(B,T)=>(Y(),se("div",null,[K("div",rc,[K("div",{class:"ret",onClick:b},[ve(G(Jl),{strokeWidth:2,class:"icon-svg",fill:v.value,size:"24",theme:"outline"},null,8,["fill"])]),K("div",ac,an(pe(m.value,"")),1),K("div",oc,[he.value==="list"?(Y(),ie(G($l),{key:0,onClick:Se,theme:"outline",size:"28",fill:v.value,strokeWidth:3},null,8,["fill"])):(Y(),ie(G(Zl),{key:1,onClick:Se,theme:"outline",size:"28",fill:v.value,strokeWidth:3},null,8,["fill"])),ve(G(Xl),{onClick:Ie,style:{float:"right"},theme:"outline",size:"28",fill:v.value,strokeWidth:3},null,8,["fill"])])]),K("div",ic,[he.value==="list"?(Y(),ie(tc,{key:0,"theme-color":v.value,"table-data":g.value,"table-head":E.value,onClickFile:ze,onDelFile:Je,onCopyUrl:ke},null,8,["theme-color","table-data","table-head"])):(Y(),ie(Up,{key:1,"theme-color":v.value,columns:y.value,"img-size":d.value,"table-data":g.value,"table-head":E.value,onClickFile:ze,onDelFile:Je,onCopyUrl:ke},null,8,["theme-color","columns","img-size","table-data","table-head"]))]),ve(pt,null,{default:nn(()=>[R.value?(Y(),se("div",lc,[K("div",{class:"close-icon",onClick:N},[ve(G(Ql),{strokeWidth:5,fill:"#ffffff",size:"30",theme:"outline"})]),K("div",sc,[K("div",{class:"left-btn",onClick:S},[ve(G(Kl),{strokeWidth:5,fill:"#ffffff",size:"30",theme:"outline"})]),K("div",{class:"right-btn",onClick:z},[ve(G(Vl),{strokeWidth:5,fill:"#ffffff",size:"30",theme:"outline"})]),K("img",{src:k.value,alt:""},null,8,dc)]),K("div",{class:"blackScreen",onClick:N})])):Qe("",!0)]),_:1}),ve(pt,null,{default:nn(()=>[n.value?(Y(),ie(Vt,{key:0,"ok-btn-text":"返回",title:"预览方式",onOkBtn:je},{body:nn(()=>[K("ul",pc,[K("li",{onClick:T[0]||(T[0]=_=>Te("web"))},"网页播放"),K("li",{onClick:T[1]||(T[1]=_=>Te("vlc"))},"Vlc播放"),K("li",{onClick:T[2]||(T[2]=_=>Te("html"))},"原生播放器")])]),_:1})):Qe("",!0)]),_:1}),ve(pt,null,{default:nn(()=>[o.value?(Y(),ie(Vt,{key:0,btnNum:2,title:"提示",onOkBtn:Xe,onCloseBtn:me},{body:nn(()=>[cc]),_:1})):Qe("",!0)]),_:1}),ve(pt,null,{default:nn(()=>[ge.value?(Y(),ie(Vt,{key:0,btnNum:1,title:"设置",onOkBtn:Me},{body:nn(()=>[K("div",uc,[Ac,$t(K("input",{type:"number",class:"PxInput","onUpdate:modelValue":T[3]||(T[3]=_=>d.value=_)},null,512),[[oa,d.value]]),ia(" px ")]),K("div",yc,[fc,$t(K("input",{type:"number",class:"PxInput","onUpdate:modelValue":T[4]||(T[4]=_=>y.value=_)},null,512),[[oa,y.value]]),ia(" 列 ")]),K("div",hc,[mc,ve(G(rs),{"z-index":"99999",width:"50",value:v.value,"onUpdate:value":T[5]||(T[5]=_=>v.value=_)},null,8,["value"])]),K("div",{class:"set-item"},[K("div",{class:"close-btn",onClick:ye},"清空缓存")])]),_:1})):Qe("",!0)]),_:1})]))}},gc=Gn(bc,[["__scopeId","data-v-de0deb5f"]]);var vc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ec(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Lo={exports:{}};(function(e,n){(function(o,l){e.exports=l()})(self,()=>(()=>{var o={916:(A,m,g)=>{var E=g(471);A.exports=function(v){var b,u="",k=(v=v||{}).video,x=v.options,w=E.$escape,R=v.tran,z=v.icons,S=v.index,F=E.$each;return v.$value,v.$index,u+=`<div class="dplayer-mask"></div>
<div class="dplayer-video-wrap">
    `,b=g(568)(k),u+=b,u+=`
    `,x.logo&&(u+=`
    <div class="dplayer-logo">
        <img src="`,u+=w(x.logo),u+=`">
    </div>
    `),u+=`
    <div class="dplayer-danmaku"`,x.danmaku&&x.danmaku.bottom&&(u+=' style="margin-bottom:',u+=w(x.danmaku.bottom),u+='"'),u+=`>
        <div class="dplayer-danmaku-item dplayer-danmaku-item--demo"></div>
    </div>
    <div class="dplayer-subtitle"></div>
    <div class="dplayer-bezel">
        <span class="dplayer-bezel-icon"></span>
        `,x.danmaku&&(u+=`
        <span class="dplayer-danloading">`,u+=w(R("danmaku-loading")),u+=`</span>
        `),u+=`
        <span class="diplayer-loading-icon">`,u+=z.loading,u+=`</span>
    </div>
</div>
<div class="dplayer-controller-mask"></div>
<div class="dplayer-controller">
    <div class="dplayer-icons dplayer-comment-box">
        <button class="dplayer-icon dplayer-comment-setting-icon" data-balloon="`,u+=w(R("setting")),u+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,u+=z.pallette,u+=`</span>
        </button>
        <div class="dplayer-comment-setting-box">
            <div class="dplayer-comment-setting-color">
                <div class="dplayer-comment-setting-title">`,u+=w(R("set-danmaku-color")),u+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,u+=w(S),u+=`" value="#fff" checked>
                    <span style="background: #fff;"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,u+=w(S),u+=`" value="#e54256">
                    <span style="background: #e54256"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,u+=w(S),u+=`" value="#ffe133">
                    <span style="background: #ffe133"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,u+=w(S),u+=`" value="#64DD17">
                    <span style="background: #64DD17"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,u+=w(S),u+=`" value="#39ccff">
                    <span style="background: #39ccff"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,u+=w(S),u+=`" value="#D500F9">
                    <span style="background: #D500F9"></span>
                </label>
            </div>
            <div class="dplayer-comment-setting-type">
                <div class="dplayer-comment-setting-title">`,u+=w(R("set-danmaku-type")),u+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,u+=w(S),u+=`" value="1">
                    <span>`,u+=w(R("top")),u+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,u+=w(S),u+=`" value="0" checked>
                    <span>`,u+=w(R("rolling")),u+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,u+=w(S),u+=`" value="2">
                    <span>`,u+=w(R("bottom")),u+=`</span>
                </label>
            </div>
        </div>
        <input class="dplayer-comment-input" type="text" placeholder="`,u+=w(R("input-danmaku-enter")),u+=`" maxlength="30">
        <button class="dplayer-icon dplayer-send-icon" data-balloon="`,u+=w(R("send")),u+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,u+=z.send,u+=`</span>
        </button>
    </div>
    <div class="dplayer-icons dplayer-icons-left">
        <button class="dplayer-icon dplayer-play-icon">
            <span class="dplayer-icon-content">`,u+=z.play,u+=`</span>
        </button>
        <div class="dplayer-volume">
            <button class="dplayer-icon dplayer-volume-icon">
                <span class="dplayer-icon-content">`,u+=z.volumeDown,u+=`</span>
            </button>
            <div class="dplayer-volume-bar-wrap" data-balloon-pos="up">
                <div class="dplayer-volume-bar">
                    <div class="dplayer-volume-bar-inner" style="background: `,u+=w(x.theme),u+=`;">
                        <span class="dplayer-thumb" style="background: `,u+=w(x.theme),u+=`"></span>
                    </div>
                </div>
            </div>
        </div>
        <span class="dplayer-time">
            <span class="dplayer-ptime">0:00</span> /
            <span class="dplayer-dtime">0:00</span>
        </span>
        `,x.live&&(u+=`
        <span class="dplayer-live-badge"><span class="dplayer-live-dot" style="background: `,u+=w(x.theme),u+=';"></span>',u+=w(R("live")),u+=`</span>
        `),u+=`
    </div>
    <div class="dplayer-icons dplayer-icons-right">
        `,x.video.quality&&(u+=`
        <div class="dplayer-quality">
            <button class="dplayer-icon dplayer-quality-icon">`,u+=w(x.video.quality[x.video.defaultQuality].name),u+=`</button>
            <div class="dplayer-quality-mask">
                <div class="dplayer-quality-list">
                `,F(x.video.quality,function(N,ee){u+=`
                    <div class="dplayer-quality-item" data-index="`,u+=w(ee),u+='">',u+=w(N.name),u+=`</div>
                `}),u+=`
                </div>
            </div>
        </div>
        `),u+=`
        `,x.screenshot&&(u+=`
        <div class="dplayer-icon dplayer-camera-icon" data-balloon="`,u+=w(R("screenshot")),u+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,u+=z.camera,u+=`</span>
        </div>
        `),u+=`
        `,x.airplay&&(u+=`
        <div class="dplayer-icon dplayer-airplay-icon" data-balloon="`,u+=w(R("airplay")),u+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,u+=z.airplay,u+=`</span>
        </div>
        `),u+=`
        `,x.chromecast&&(u+=`
        <div class="dplayer-icon dplayer-chromecast-icon" data-balloon="`,u+=w(R("chromecast")),u+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,u+=z.chromecast,u+=`</span>
        </div>
        `),u+=`
        <div class="dplayer-comment">
            <button class="dplayer-icon dplayer-comment-icon" data-balloon="`,u+=w(R("send-danmaku")),u+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,u+=z.comment,u+=`</span>
            </button>
        </div>
        `,x.subtitle&&(u+=`
        `,typeof x.subtitle.url=="string"?(u+=`
        <div class="dplayer-subtitle-btn">
            <button class="dplayer-icon dplayer-subtitle-icon" data-balloon="`,u+=w(R("hide-subs")),u+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,u+=z.subtitle,u+=`</span>
            </button>
        </div>
        `):(u+=`
        <div class="dplayer-subtitles">
            <button class="dplayer-icon dplayer-subtitles-icon" data-balloon="`,u+=w(R("subtitle")),u+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,u+=z.subtitle,u+=`</span>
            </button>
            <div class="dplayer-subtitles-box">
                <div class="dplayer-subtitles-panel">
                    `,F(x.subtitle.url,function(N,ee){u+=`
                        <div class="dplayer-subtitles-item" data-subtitle="`,u+=w(N.url),u+=`">
                            <!-- if lang, show tran(lang). if lang and name, show name + (tran(lang)). if name, show name. off option use lang for translation. -->
                            <span class="dplayer-label">`,u+=w(N.lang?N.name?N.name+" ("+R(N.lang)+")":R(N.lang):N.name),u+=`</span>
                        </div>
                    `}),u+=`
                </div>
            </div>
        </div>
        `),u+=`
        `),u+=`
        <div class="dplayer-setting">
            <button class="dplayer-icon dplayer-setting-icon" data-balloon="`,u+=w(R("setting")),u+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,u+=z.setting,u+=`</span>
            </button>
            <div class="dplayer-setting-box">
                <div class="dplayer-setting-origin-panel">
                    <div class="dplayer-setting-item dplayer-setting-speed">
                        <span class="dplayer-label">`,u+=w(R("speed")),u+=`</span>
                        <div class="dplayer-toggle">`,u+=z.right,u+=`</div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-loop">
                        <span class="dplayer-label">`,u+=w(R("loop")),u+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-toggle-setting-input" type="checkbox" name="dplayer-toggle">
                            <label for="dplayer-toggle"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-showdan">
                        <span class="dplayer-label">`,u+=w(R("show-danmaku")),u+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-showdan-setting-input" type="checkbox" name="dplayer-toggle-dan">
                            <label for="dplayer-toggle-dan"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danunlimit">
                        <span class="dplayer-label">`,u+=w(R("unlimited-danmaku")),u+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-danunlimit-setting-input" type="checkbox" name="dplayer-toggle-danunlimit">
                            <label for="dplayer-toggle-danunlimit"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danmaku">
                        <span class="dplayer-label">`,u+=w(R("opacity-danmaku")),u+=`</span>
                        <div class="dplayer-danmaku-bar-wrap">
                            <div class="dplayer-danmaku-bar">
                                <div class="dplayer-danmaku-bar-inner">
                                    <span class="dplayer-thumb"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dplayer-setting-speed-panel">
                    `,F(x.playbackSpeed,function(N,ee){u+=`
                        <div class="dplayer-setting-speed-item" data-speed="`,u+=w(N),u+=`">
                            <span class="dplayer-label">`,u+=w(N===1?R("normal"):N),u+=`</span>
                        </div>
                    `}),u+=`
                </div>
            </div>
        </div>
        <div class="dplayer-full">
            <button class="dplayer-icon dplayer-full-in-icon" data-balloon="`,u+=w(R("web-fullscreen")),u+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,u+=z.fullWeb,u+=`</span>
            </button>
            <button class="dplayer-icon dplayer-full-icon" data-balloon="`,u+=w(R("fullscreen")),u+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,u+=z.full,u+=`</span>
            </button>
        </div>
    </div>
    <div class="dplayer-bar-wrap">
        <div class="dplayer-bar-time hidden">00:00</div>
        <div class="dplayer-bar-preview"></div>
        <div class="dplayer-bar">
            <div class="dplayer-loaded" style="width: 0;"></div>
            <div class="dplayer-played" style="width: 0; background: `,u+=w(x.theme),u+=`">
                <span class="dplayer-thumb" style="background: `,u+=w(x.theme),u+=`"></span>
            </div>
        </div>
    </div>
</div>
<div class="dplayer-info-panel dplayer-info-panel-hide">
    <div class="dplayer-info-panel-close">[x]</div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-version">
        <span class="dplayer-info-panel-item-title">Player version</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-fps">
        <span class="dplayer-info-panel-item-title">Player FPS</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-type">
        <span class="dplayer-info-panel-item-title">Video type</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-url">
        <span class="dplayer-info-panel-item-title">Video url</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-resolution">
        <span class="dplayer-info-panel-item-title">Video resolution</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-duration">
        <span class="dplayer-info-panel-item-title">Video duration</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    `,x.danmaku&&(u+=`
    <div class="dplayer-info-panel-item dplayer-info-panel-item-danmaku-id">
        <span class="dplayer-info-panel-item-title">Danmaku id</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-danmaku-api">
        <span class="dplayer-info-panel-item-title">Danmaku api</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-danmaku-amount">
        <span class="dplayer-info-panel-item-title">Danmaku amount</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    `),u+=`
</div>
<div class="dplayer-menu">
    `,F(x.contextmenu,function(N,ee){u+=`
        <div class="dplayer-menu-item">
            <a`,N.link&&(u+=' target="_blank"'),u+=' href="',u+=w(N.link||"javascript:void(0);"),u+='">',N.key&&(u+=" ",u+=w(R(N.key))),N.text&&(u+=" ",u+=w(N.text)),u+=`</a>
        </div>
    `}),u+=`
</div>
<div class="dplayer-notice-list"></div>
<button class="dplayer-mobile-play">
    `,u+=z.play,u+=`
</button>`}},568:(A,m,g)=>{var E=g(471);A.exports=function(v){var b="",u=(v=v||{}).enableSubtitle,k=v.subtitle,x=v.current,w=v.airplay,R=v.pic,z=E.$escape,S=v.screenshot,F=v.preload,N=v.url;return u=k&&k.type==="webvtt",b+=`
<video
    class="dplayer-video `,x&&(b+="dplayer-video-current"),b+=`"
    webkit-playsinline
    `,w&&(b+=' x-webkit-airplay="allow" '),b+=`
    playsinline
    `,R&&(b+='poster="',b+=z(R),b+='"'),b+=`
    `,(S||u)&&(b+='crossorigin="anonymous"'),b+=`
    `,F&&(b+='preload="',b+=z(F),b+='"'),b+=`
    `,w?b+=`
    nosrc
    `:N&&(b+=`
    src="`,b+=z(N),b+=`"
    `),b+=`
    >
    `,w&&(b+=`
    <source src="`,b+=z(N),b+=`">
    `),b+=`
    `,u&&(b+=`
    <track class="dplayer-subtrack" kind="metadata" default src="`,b+=z(typeof k.url=="string"?k.url:k.url[k.index].url),b+=`"></track>
    `),b+`
</video>`}},49:(A,m,g)=>{g.d(m,{Z:()=>k});var E=g(415),v=g.n(E),b=g(352),u=g.n(b)()(v());u.push([A.id,`:root {
  --balloon-border-radius: 2px;
  --balloon-color: rgba(16, 16, 16, 0.95);
  --balloon-text-color: #fff;
  --balloon-font-size: 12px;
  --balloon-move: 4px; }

button[aria-label][data-balloon-pos] {
  overflow: visible; }

[aria-label][data-balloon-pos] {
  position: relative;
  cursor: pointer; }
  [aria-label][data-balloon-pos]:after {
    opacity: 0;
    pointer-events: none;
    transition: all 0.18s ease-out 0.18s;
    text-indent: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: normal;
    font-style: normal;
    text-shadow: none;
    font-size: 12px;
    font-size: var(--balloon-font-size);
    background: rgba(16, 16, 16, 0.95);
    background: var(--balloon-color);
    border-radius: 2px;
    color: #fff;
    color: var(--balloon-text-color);
    border-radius: var(--balloon-border-radius);
    content: attr(aria-label);
    padding: .5em 1em;
    position: absolute;
    white-space: nowrap;
    z-index: 10; }
  [aria-label][data-balloon-pos]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: rgba(16, 16, 16, 0.95);
    border-top-color: var(--balloon-color);
    opacity: 0;
    pointer-events: none;
    transition: all 0.18s ease-out 0.18s;
    content: "";
    position: absolute;
    z-index: 10; }
  [aria-label][data-balloon-pos]:hover:before, [aria-label][data-balloon-pos]:hover:after, [aria-label][data-balloon-pos][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-visible]:after, [aria-label][data-balloon-pos]:not([data-balloon-nofocus]):focus:before, [aria-label][data-balloon-pos]:not([data-balloon-nofocus]):focus:after {
    opacity: 1;
    pointer-events: none; }
  [aria-label][data-balloon-pos].font-awesome:after {
    font-family: FontAwesome, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }
  [aria-label][data-balloon-pos][data-balloon-break]:after {
    white-space: pre; }
  [aria-label][data-balloon-pos][data-balloon-break][data-balloon-length]:after {
    white-space: pre-line;
    word-break: break-word; }
  [aria-label][data-balloon-pos][data-balloon-blunt]:before, [aria-label][data-balloon-pos][data-balloon-blunt]:after {
    transition: none; }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="up"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos="down"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="down"][data-balloon-visible]:after {
    transform: translate(-50%, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="up"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos="down"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="down"][data-balloon-visible]:before {
    transform: translate(-50%, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:after {
    left: 0; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:before {
    left: 5px; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:after {
    right: 0; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:before {
    right: 5px; }
  [aria-label][data-balloon-pos][data-balloon-po*="-left"]:hover:after, [aria-label][data-balloon-pos][data-balloon-po*="-left"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos*="-right"][data-balloon-visible]:after {
    transform: translate(0, 0); }
  [aria-label][data-balloon-pos][data-balloon-po*="-left"]:hover:before, [aria-label][data-balloon-pos][data-balloon-po*="-left"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos*="-right"][data-balloon-visible]:before {
    transform: translate(0, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos^="up"]:before, [aria-label][data-balloon-pos][data-balloon-pos^="up"]:after {
    bottom: 100%;
    transform-origin: top;
    transform: translate(0, 4px);
    transform: translate(0, var(--balloon-move)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="up"]:after {
    margin-bottom: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:before, [aria-label][data-balloon-pos][data-balloon-pos="up"]:after {
    left: 50%;
    transform: translate(-50%, 4px);
    transform: translate(-50%, var(--balloon-move)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:before, [aria-label][data-balloon-pos][data-balloon-pos^="down"]:after {
    top: 100%;
    transform: translate(0, calc(4px * -1));
    transform: translate(0, calc(var(--balloon-move) * -1)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:after {
    margin-top: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-bottom-color: rgba(16, 16, 16, 0.95);
    border-bottom-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-pos="down"]:after, [aria-label][data-balloon-pos][data-balloon-pos="down"]:before {
    left: 50%;
    transform: translate(-50%, calc(4px * -1));
    transform: translate(-50%, calc(var(--balloon-move) * -1)); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="left"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos="right"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="right"][data-balloon-visible]:after {
    transform: translate(0, -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="left"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos="right"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="right"][data-balloon-visible]:before {
    transform: translate(0, -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:after, [aria-label][data-balloon-pos][data-balloon-pos="left"]:before {
    right: 100%;
    top: 50%;
    transform: translate(4px, -50%);
    transform: translate(var(--balloon-move), -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:after {
    margin-right: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-left-color: rgba(16, 16, 16, 0.95);
    border-left-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:after, [aria-label][data-balloon-pos][data-balloon-pos="right"]:before {
    left: 100%;
    top: 50%;
    transform: translate(calc(4px * -1), -50%);
    transform: translate(calc(var(--balloon-move) * -1), -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:after {
    margin-left: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-right-color: rgba(16, 16, 16, 0.95);
    border-right-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-length]:after {
    white-space: normal; }
  [aria-label][data-balloon-pos][data-balloon-length="small"]:after {
    width: 80px; }
  [aria-label][data-balloon-pos][data-balloon-length="medium"]:after {
    width: 150px; }
  [aria-label][data-balloon-pos][data-balloon-length="large"]:after {
    width: 260px; }
  [aria-label][data-balloon-pos][data-balloon-length="xlarge"]:after {
    width: 380px; }
    @media screen and (max-width: 768px) {
      [aria-label][data-balloon-pos][data-balloon-length="xlarge"]:after {
        width: 90vw; } }
  [aria-label][data-balloon-pos][data-balloon-length="fit"]:after {
    width: 100%; }
`,"",{version:3,sources:["webpack://./node_modules/.pnpm/balloon-css@1.2.0/node_modules/balloon-css/balloon.css"],names:[],mappings:"AAAA;EACE,4BAA4B;EAC5B,uCAAuC;EACvC,0BAA0B;EAC1B,yBAAyB;EACzB,mBAAmB,EAAE;;AAEvB;EACE,iBAAiB,EAAE;;AAErB;EACE,kBAAkB;EAClB,eAAe,EAAE;EACjB;IACE,UAAU;IACV,oBAAoB;IACpB,oCAAoC;IACpC,cAAc;IACd,wIAAwI;IACxI,mBAAmB;IACnB,kBAAkB;IAClB,iBAAiB;IACjB,eAAmC;IAAnC,mCAAmC;IACnC,kCAAgC;IAAhC,gCAAgC;IAChC,kBAAkB;IAClB,WAAgC;IAAhC,gCAAgC;IAChC,2CAA2C;IAC3C,yBAAyB;IACzB,iBAAiB;IACjB,kBAAkB;IAClB,mBAAmB;IACnB,WAAW,EAAE;EACf;IACE,QAAQ;IACR,SAAS;IACT,6BAA6B;IAC7B,wCAAsC;IAAtC,sCAAsC;IACtC,UAAU;IACV,oBAAoB;IACpB,oCAAoC;IACpC,WAAW;IACX,kBAAkB;IAClB,WAAW,EAAE;EACf;IACE,UAAU;IACV,oBAAoB,EAAE;EACxB;IACE,qJAAqJ,EAAE;EACzJ;IACE,gBAAgB,EAAE;EACpB;IACE,qBAAqB;IACrB,sBAAsB,EAAE;EAC1B;IACE,gBAAgB,EAAE;EACpB;IACE,6BAA6B,EAAE;EACjC;IACE,6BAA6B,EAAE;EACjC;IACE,OAAO,EAAE;EACX;IACE,SAAS,EAAE;EACb;IACE,QAAQ,EAAE;EACZ;IACE,UAAU,EAAE;EACd;IACE,0BAA0B,EAAE;EAC9B;IACE,0BAA0B,EAAE;EAC9B;IACE,YAAY;IACZ,qBAAqB;IACrB,4BAA4C;IAA5C,4CAA4C,EAAE;EAChD;IACE,mBAAmB,EAAE;EACvB;IACE,SAAS;IACT,+BAA+C;IAA/C,+CAA+C,EAAE;EACnD;IACE,SAAS;IACT,uCAAuD;IAAvD,uDAAuD,EAAE;EAC3D;IACE,gBAAgB,EAAE;EACpB;IACE,QAAQ;IACR,SAAS;IACT,6BAA6B;IAC7B,2CAAyC;IAAzC,yCAAyC,EAAE;EAC7C;IACE,SAAS;IACT,0CAA0D;IAA1D,0DAA0D,EAAE;EAC9D;IACE,6BAA6B,EAAE;EACjC;IACE,6BAA6B,EAAE;EACjC;IACE,WAAW;IACX,QAAQ;IACR,+BAA+C;IAA/C,+CAA+C,EAAE;EACnD;IACE,kBAAkB,EAAE;EACtB;IACE,QAAQ;IACR,SAAS;IACT,6BAA6B;IAC7B,yCAAuC;IAAvC,uCAAuC,EAAE;EAC3C;IACE,UAAU;IACV,QAAQ;IACR,0CAA0D;IAA1D,0DAA0D,EAAE;EAC9D;IACE,iBAAiB,EAAE;EACrB;IACE,QAAQ;IACR,SAAS;IACT,6BAA6B;IAC7B,0CAAwC;IAAxC,wCAAwC,EAAE;EAC5C;IACE,mBAAmB,EAAE;EACvB;IACE,WAAW,EAAE;EACf;IACE,YAAY,EAAE;EAChB;IACE,YAAY,EAAE;EAChB;IACE,YAAY,EAAE;IACd;MACE;QACE,WAAW,EAAE,EAAE;EACrB;IACE,WAAW,EAAE",sourcesContent:[`:root {
  --balloon-border-radius: 2px;
  --balloon-color: rgba(16, 16, 16, 0.95);
  --balloon-text-color: #fff;
  --balloon-font-size: 12px;
  --balloon-move: 4px; }

button[aria-label][data-balloon-pos] {
  overflow: visible; }

[aria-label][data-balloon-pos] {
  position: relative;
  cursor: pointer; }
  [aria-label][data-balloon-pos]:after {
    opacity: 0;
    pointer-events: none;
    transition: all 0.18s ease-out 0.18s;
    text-indent: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: normal;
    font-style: normal;
    text-shadow: none;
    font-size: var(--balloon-font-size);
    background: var(--balloon-color);
    border-radius: 2px;
    color: var(--balloon-text-color);
    border-radius: var(--balloon-border-radius);
    content: attr(aria-label);
    padding: .5em 1em;
    position: absolute;
    white-space: nowrap;
    z-index: 10; }
  [aria-label][data-balloon-pos]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: var(--balloon-color);
    opacity: 0;
    pointer-events: none;
    transition: all 0.18s ease-out 0.18s;
    content: "";
    position: absolute;
    z-index: 10; }
  [aria-label][data-balloon-pos]:hover:before, [aria-label][data-balloon-pos]:hover:after, [aria-label][data-balloon-pos][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-visible]:after, [aria-label][data-balloon-pos]:not([data-balloon-nofocus]):focus:before, [aria-label][data-balloon-pos]:not([data-balloon-nofocus]):focus:after {
    opacity: 1;
    pointer-events: none; }
  [aria-label][data-balloon-pos].font-awesome:after {
    font-family: FontAwesome, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }
  [aria-label][data-balloon-pos][data-balloon-break]:after {
    white-space: pre; }
  [aria-label][data-balloon-pos][data-balloon-break][data-balloon-length]:after {
    white-space: pre-line;
    word-break: break-word; }
  [aria-label][data-balloon-pos][data-balloon-blunt]:before, [aria-label][data-balloon-pos][data-balloon-blunt]:after {
    transition: none; }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="up"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos="down"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="down"][data-balloon-visible]:after {
    transform: translate(-50%, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="up"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos="down"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="down"][data-balloon-visible]:before {
    transform: translate(-50%, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:after {
    left: 0; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:before {
    left: 5px; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:after {
    right: 0; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:before {
    right: 5px; }
  [aria-label][data-balloon-pos][data-balloon-po*="-left"]:hover:after, [aria-label][data-balloon-pos][data-balloon-po*="-left"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos*="-right"][data-balloon-visible]:after {
    transform: translate(0, 0); }
  [aria-label][data-balloon-pos][data-balloon-po*="-left"]:hover:before, [aria-label][data-balloon-pos][data-balloon-po*="-left"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos*="-right"][data-balloon-visible]:before {
    transform: translate(0, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos^="up"]:before, [aria-label][data-balloon-pos][data-balloon-pos^="up"]:after {
    bottom: 100%;
    transform-origin: top;
    transform: translate(0, var(--balloon-move)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="up"]:after {
    margin-bottom: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:before, [aria-label][data-balloon-pos][data-balloon-pos="up"]:after {
    left: 50%;
    transform: translate(-50%, var(--balloon-move)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:before, [aria-label][data-balloon-pos][data-balloon-pos^="down"]:after {
    top: 100%;
    transform: translate(0, calc(var(--balloon-move) * -1)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:after {
    margin-top: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-bottom-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-pos="down"]:after, [aria-label][data-balloon-pos][data-balloon-pos="down"]:before {
    left: 50%;
    transform: translate(-50%, calc(var(--balloon-move) * -1)); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="left"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos="right"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="right"][data-balloon-visible]:after {
    transform: translate(0, -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="left"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos="right"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="right"][data-balloon-visible]:before {
    transform: translate(0, -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:after, [aria-label][data-balloon-pos][data-balloon-pos="left"]:before {
    right: 100%;
    top: 50%;
    transform: translate(var(--balloon-move), -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:after {
    margin-right: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-left-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:after, [aria-label][data-balloon-pos][data-balloon-pos="right"]:before {
    left: 100%;
    top: 50%;
    transform: translate(calc(var(--balloon-move) * -1), -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:after {
    margin-left: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-right-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-length]:after {
    white-space: normal; }
  [aria-label][data-balloon-pos][data-balloon-length="small"]:after {
    width: 80px; }
  [aria-label][data-balloon-pos][data-balloon-length="medium"]:after {
    width: 150px; }
  [aria-label][data-balloon-pos][data-balloon-length="large"]:after {
    width: 260px; }
  [aria-label][data-balloon-pos][data-balloon-length="xlarge"]:after {
    width: 380px; }
    @media screen and (max-width: 768px) {
      [aria-label][data-balloon-pos][data-balloon-length="xlarge"]:after {
        width: 90vw; } }
  [aria-label][data-balloon-pos][data-balloon-length="fit"]:after {
    width: 100%; }
`],sourceRoot:""}]);const k=u},685:(A,m,g)=>{g.d(m,{Z:()=>F});var E=g(415),v=g.n(E),b=g(352),u=g.n(b),k=g(49),x=g(80),w=g.n(x),R=new URL(g(831),g.b),z=u()(v());z.i(k.Z);var S=w()(R);z.push([A.id,`@keyframes my-face {
  2% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  4% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  6% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  8% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  10% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  12% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  14% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  16% {
    transform: translate(0, -0.5px) rotate(-1.5deg);
  }
  18% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  20% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  22% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  24% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  26% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  28% {
    transform: translate(0, 0.5px) rotate(1.5deg);
  }
  30% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  32% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  34% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  36% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  38% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  40% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  42% {
    transform: translate(0, 2.5px) rotate(-1.5deg);
  }
  44% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  46% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  48% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  50% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  52% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  54% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  56% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  58% {
    transform: translate(0, 0.5px) rotate(2.5deg);
  }
  60% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  62% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  64% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  66% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  68% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  70% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  72% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  74% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  76% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  78% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  80% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  82% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  84% {
    transform: translate(0, 1.5px) rotate(2.5deg);
  }
  86% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  88% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  90% {
    transform: translate(0, 2.5px) rotate(-0.5deg);
  }
  92% {
    transform: translate(0, 0.5px) rotate(-0.5deg);
  }
  94% {
    transform: translate(0, 2.5px) rotate(0.5deg);
  }
  96% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  98% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}
.dplayer {
  position: relative;
  overflow: hidden;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  line-height: 1;
}
.dplayer * {
  box-sizing: content-box;
}
.dplayer svg {
  width: 100%;
  height: 100%;
}
.dplayer svg path,
.dplayer svg circle {
  fill: #fff;
}
.dplayer:-webkit-full-screen {
  width: 100%;
  height: 100%;
  background: #000;
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  transform: translate(0, 0);
}
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-showdan,
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-danmaku,
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-danunlimit {
  display: none;
}
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-comment {
  display: none;
}
.dplayer.dplayer-no-danmaku .dplayer-danmaku {
  display: none;
}
.dplayer.dplayer-live .dplayer-time {
  display: none;
}
.dplayer.dplayer-live .dplayer-bar-wrap {
  display: none;
}
.dplayer.dplayer-live .dplayer-setting-speed {
  display: none;
}
.dplayer.dplayer-live .dplayer-setting-loop {
  display: none;
}
.dplayer.dplayer-live.dplayer-no-danmaku .dplayer-setting {
  display: none;
}
.dplayer.dplayer-arrow .dplayer-danmaku {
  font-size: 18px;
}
.dplayer.dplayer-arrow .dplayer-icon {
  margin: 0 -3px;
}
.dplayer.dplayer-playing .dplayer-danmaku .dplayer-danmaku-move {
  animation-play-state: running;
}
@media (min-width: 900px) {
  .dplayer.dplayer-playing .dplayer-controller-mask {
    opacity: 0;
  }
  .dplayer.dplayer-playing .dplayer-controller {
    opacity: 0;
  }
  .dplayer.dplayer-playing:hover .dplayer-controller-mask {
    opacity: 1;
  }
  .dplayer.dplayer-playing:hover .dplayer-controller {
    opacity: 1;
  }
}
.dplayer.dplayer-loading .dplayer-bezel .diplayer-loading-icon {
  display: block;
}
.dplayer.dplayer-loading .dplayer-danmaku,
.dplayer.dplayer-paused .dplayer-danmaku,
.dplayer.dplayer-loading .dplayer-danmaku-move,
.dplayer.dplayer-paused .dplayer-danmaku-move {
  animation-play-state: paused;
}
.dplayer.dplayer-hide-controller {
  cursor: none;
}
.dplayer.dplayer-hide-controller .dplayer-controller-mask {
  opacity: 0;
  transform: translateY(100%);
}
.dplayer.dplayer-hide-controller .dplayer-controller {
  opacity: 0;
  transform: translateY(100%);
}
.dplayer.dplayer-show-controller .dplayer-controller-mask {
  opacity: 1;
}
.dplayer.dplayer-show-controller .dplayer-controller {
  opacity: 1;
}
.dplayer.dplayer-fulled {
  width: 100% !important;
  height: 100% !important;
}
.dplayer.dplayer-fulled {
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
}
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-volume,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-camera-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-airplay-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-chromecast-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-play-icon {
  display: none;
}
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon {
  position: static;
  display: inline-block;
}
.dplayer.dplayer-mobile .dplayer-bar-time {
  display: none;
}
.dplayer.dplayer-mobile.dplayer-hide-controller .dplayer-mobile-play {
  display: none;
}
.dplayer.dplayer-mobile .dplayer-mobile-play {
  display: block;
}
.dplayer-web-fullscreen-fix {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
}
[data-balloon]:before {
  display: none;
}
[data-balloon]:after {
  padding: 0.3em 0.7em;
  background: rgba(17, 17, 17, 0.7);
}
[data-balloon][data-balloon-pos="up"]:after {
  margin-bottom: 0;
}
.dplayer-bezel {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 22px;
  color: #fff;
  pointer-events: none;
}
.dplayer-bezel .dplayer-bezel-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -26px 0 0 -26px;
  height: 52px;
  width: 52px;
  padding: 12px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}
.dplayer-bezel .dplayer-bezel-icon.dplayer-bezel-transition {
  animation: bezel-hide 0.5s linear;
}
@keyframes bezel-hide {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
}
.dplayer-bezel .dplayer-danloading {
  position: absolute;
  top: 50%;
  margin-top: -7px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  animation: my-face 5s infinite ease-in-out;
}
.dplayer-bezel .diplayer-loading-icon {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -18px 0 0 -18px;
  height: 36px;
  width: 36px;
  pointer-events: none;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-hide {
  display: none;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot {
  animation: diplayer-loading-dot-fade 0.8s ease infinite;
  opacity: 0;
  transform-origin: 4px 4px;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-1 {
  animation-delay: 0.1s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-2 {
  animation-delay: 0.2s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-3 {
  animation-delay: 0.3s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-4 {
  animation-delay: 0.4s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-5 {
  animation-delay: 0.5s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-6 {
  animation-delay: 0.6s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-7 {
  animation-delay: 0.7s;
}
@keyframes diplayer-loading-dot-fade {
  0% {
    opacity: 0.7;
    transform: scale(1.2, 1.2);
  }
  50% {
    opacity: 0.25;
    transform: scale(0.9, 0.9);
  }
  to {
    opacity: 0.25;
    transform: scale(0.85, 0.85);
  }
}
.dplayer-controller-mask {
  background: url(`+S+`) repeat-x bottom;
  height: 98px;
  width: 100%;
  position: absolute;
  bottom: 0;
  transition: all 0.3s ease;
}
.dplayer-controller {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 41px;
  padding: 0 20px;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  transition: all 0.3s ease;
}
.dplayer-controller.dplayer-controller-comment .dplayer-icons {
  display: none;
}
.dplayer-controller.dplayer-controller-comment .dplayer-icons.dplayer-comment-box {
  display: block;
}
.dplayer-controller .dplayer-bar-wrap {
  padding: 5px 0;
  cursor: pointer;
  position: absolute;
  bottom: 33px;
  width: calc(100% - 40px);
  height: 3px;
}
.dplayer-controller .dplayer-bar-wrap:hover .dplayer-bar .dplayer-played .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-bar-wrap:hover .dplayer-highlight {
  display: block;
  width: 8px;
  transform: translateX(-4px);
  top: 4px;
  height: 40%;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight {
  z-index: 12;
  position: absolute;
  top: 5px;
  width: 6px;
  height: 20%;
  border-radius: 6px;
  background-color: #fff;
  text-align: center;
  transform: translateX(-3px);
  transition: all 0.2s ease-in-out;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover .dplayer-highlight-text {
  display: block;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover ~ .dplayer-bar-preview {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover ~ .dplayer-bar-time {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight .dplayer-highlight-text {
  display: none;
  position: absolute;
  left: 50%;
  top: -24px;
  padding: 5px 8px;
  background-color: rgba(0, 0, 0, 0.62);
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  transform: translateX(-50%);
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-preview {
  position: absolute;
  background: #fff;
  pointer-events: none;
  display: none;
  background-size: 16000px 100%;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-preview-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-time {
  position: absolute;
  left: 0px;
  top: -20px;
  border-radius: 4px;
  padding: 5px 7px;
  background-color: rgba(0, 0, 0, 0.62);
  color: #fff;
  font-size: 12px;
  text-align: center;
  opacity: 1;
  transition: opacity 0.1s ease-in-out;
  word-wrap: normal;
  word-break: normal;
  z-index: 2;
  pointer-events: none;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-time.hidden {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar {
  position: relative;
  height: 3px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-loaded {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.4);
  height: 3px;
  transition: all 0.5s ease;
  will-change: width;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-played {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  height: 3px;
  will-change: width;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-played .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons {
  height: 38px;
  position: absolute;
  bottom: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box {
  display: none;
  position: absolute;
  transition: all 0.3s ease-in-out;
  z-index: 2;
  height: 38px;
  bottom: 0;
  left: 20px;
  right: 20px;
  color: #fff;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-icon {
  padding: 7px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-icon {
  position: absolute;
  left: 0;
  top: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-send-icon {
  position: absolute;
  right: 0;
  top: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box {
  position: absolute;
  background: rgba(28, 28, 28, 0.9);
  bottom: 41px;
  left: 0;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 10px 10px 16px;
  font-size: 14px;
  width: 204px;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box.dplayer-comment-setting-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box input[type=radio] {
  display: none;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box label {
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-title {
  font-size: 13px;
  color: #fff;
  line-height: 30px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type {
  font-size: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type .dplayer-comment-setting-title {
  margin-bottom: 6px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type label:nth-child(2) span {
  border-radius: 4px 0 0 4px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type label:nth-child(4) span {
  border-radius: 0 4px 4px 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type span {
  width: 33%;
  padding: 4px 6px;
  line-height: 16px;
  display: inline-block;
  font-size: 12px;
  color: #fff;
  border: 1px solid #fff;
  margin-right: -1px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type input:checked + span {
  background: #E4E4E6;
  color: #1c1c1c;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color {
  font-size: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color label {
  font-size: 0;
  padding: 6px;
  display: inline-block;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color span {
  width: 22px;
  height: 22px;
  display: inline-block;
  border-radius: 50%;
  box-sizing: border-box;
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color span:hover {
  animation: my-face 5s infinite ease-in-out;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input {
  outline: none;
  border: none;
  padding: 8px 31px;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  border-radius: 4px;
  background: none;
  margin: 0;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  color: #fff;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::-moz-placeholder {
  color: #fff;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::placeholder {
  color: #fff;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::-ms-clear {
  display: none;
}
.dplayer-controller .dplayer-icons.dplayer-icons-left .dplayer-icon {
  padding: 7px;
}
.dplayer-controller .dplayer-icons.dplayer-icons-right {
  right: 20px;
}
.dplayer-controller .dplayer-icons.dplayer-icons-right .dplayer-icon {
  padding: 8px;
}
.dplayer-controller .dplayer-icons .dplayer-time,
.dplayer-controller .dplayer-icons .dplayer-live-badge {
  line-height: 38px;
  color: #eee;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  vertical-align: middle;
  font-size: 13px;
  cursor: default;
}
.dplayer-controller .dplayer-icons .dplayer-live-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  vertical-align: 4%;
  margin-right: 5px;
  content: '';
  border-radius: 6px;
}
.dplayer-controller .dplayer-icons .dplayer-icon {
  width: 40px;
  height: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  vertical-align: middle;
  box-sizing: border-box;
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-icon .dplayer-icon-content {
  transition: all 0.2s ease-in-out;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons .dplayer-icon:hover .dplayer-icon-content {
  opacity: 1;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-quality-icon {
  color: #fff;
  width: auto;
  line-height: 22px;
  font-size: 14px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-comment-icon {
  padding: 10px 9px 9px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-setting-icon {
  padding-top: 8.5px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-volume-icon {
  width: 43px;
}
.dplayer-controller .dplayer-icons .dplayer-volume {
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-volume:hover .dplayer-volume-bar-wrap .dplayer-volume-bar {
  width: 45px;
}
.dplayer-controller .dplayer-icons .dplayer-volume:hover .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-volume.dplayer-volume-active .dplayer-volume-bar-wrap .dplayer-volume-bar {
  width: 45px;
}
.dplayer-controller .dplayer-icons .dplayer-volume.dplayer-volume-active .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap {
  display: inline-block;
  margin: 0 10px 0 -5px;
  vertical-align: middle;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar {
  position: relative;
  top: 17px;
  width: 0;
  height: 3px;
  background: #aaa;
  transition: all 0.3s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  transition: all 0.1s ease;
  will-change: width;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons .dplayer-subtitle-btn {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box {
  position: absolute;
  right: 0;
  bottom: 50px;
  transform: scale(0);
  width: -moz-fit-content;
  width: fit-content;
  max-width: 240px;
  min-width: 120px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 7px 0;
  transition: all 0.3s ease-in-out;
  overflow: auto;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box.dplayer-subtitles-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box.dplayer-subtitles-box-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-item {
  height: 30px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-setting {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box {
  position: absolute;
  right: 0;
  bottom: 50px;
  transform: scale(0);
  width: 150px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 7px 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box > div {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box > div.dplayer-setting-origin-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-narrow {
  width: 70px;
  text-align: center;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-speed .dplayer-setting-origin-panel {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-speed .dplayer-setting-speed-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-item,
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-speed-item {
  height: 30px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-item:hover,
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-speed-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku {
  padding: 5px 0;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-label {
  padding: 0 10px;
  display: inline;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku:hover .dplayer-label {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku:hover .dplayer-danmaku-bar-wrap {
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku.dplayer-setting-danmaku-active .dplayer-label {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku.dplayer-setting-danmaku-active .dplayer-danmaku-bar-wrap {
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap {
  padding: 0 10px;
  box-sizing: border-box;
  display: none;
  vertical-align: middle;
  height: 100%;
  width: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar {
  position: relative;
  top: 8.5px;
  width: 100%;
  height: 3px;
  background: #fff;
  transition: all 0.3s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar .dplayer-danmaku-bar-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  transition: all 0.1s ease;
  background: #aaa;
  will-change: width;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar .dplayer-danmaku-bar-inner .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background: #aaa;
}
.dplayer-controller .dplayer-icons .dplayer-full {
  display: inline-block;
  height: 100%;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-full:hover .dplayer-full-in-icon {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon {
  position: absolute;
  top: -30px;
  z-index: 1;
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-quality {
  position: relative;
  display: inline-block;
  height: 100%;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-quality:hover .dplayer-quality-list {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-quality:hover .dplayer-quality-mask {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-mask {
  display: none;
  position: absolute;
  bottom: 38px;
  left: -18px;
  width: 80px;
  padding-bottom: 12px;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-list {
  display: none;
  font-size: 12px;
  width: 80px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 5px 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  color: #fff;
  text-align: center;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-item {
  height: 25px;
  box-sizing: border-box;
  cursor: pointer;
  line-height: 25px;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-comment {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-label {
  color: #eee;
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
}
.dplayer-controller .dplayer-icons .dplayer-toggle {
  width: 32px;
  height: 20px;
  text-align: center;
  font-size: 0;
  vertical-align: middle;
  position: absolute;
  top: 5px;
  right: 10px;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input {
  max-height: 0;
  max-width: 0;
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label {
  display: inline-block;
  position: relative;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  border: 1px solid #dfdfdf;
  height: 20px;
  width: 32px;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label:before {
  content: "";
  position: absolute;
  display: block;
  height: 18px;
  width: 18px;
  top: 0;
  left: 0;
  border-radius: 15px;
  transition: 0.2s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label:after {
  content: "";
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  border-radius: 15px;
  background: #fff;
  transition: 0.2s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  height: 18px;
  width: 18px;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label {
  border-color: rgba(255, 255, 255, 0.5);
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label:before {
  width: 30px;
  background: rgba(255, 255, 255, 0.5);
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label:after {
  left: 12px;
}
.dplayer-mobile-play {
  display: none;
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  bottom: 0;
  opacity: 0.8;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.dplayer-danmaku {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 22px;
  color: #fff;
}
.dplayer-danmaku .dplayer-danmaku-item {
  display: inline-block;
  pointer-events: none;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  cursor: default;
  white-space: nowrap;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
}
.dplayer-danmaku .dplayer-danmaku-item--demo {
  position: absolute;
  visibility: hidden;
}
.dplayer-danmaku .dplayer-danmaku-right {
  position: absolute;
  right: 0;
  transform: translateX(100%);
}
.dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
  will-change: transform;
  animation-name: 'danmaku';
  animation-timing-function: linear;
  animation-play-state: paused;
}
@keyframes danmaku {
  from {
    transform: translateX(100%);
  }
}
.dplayer-danmaku .dplayer-danmaku-top,
.dplayer-danmaku .dplayer-danmaku-bottom {
  position: absolute;
  width: 100%;
  text-align: center;
  visibility: hidden;
}
.dplayer-danmaku .dplayer-danmaku-top.dplayer-danmaku-move,
.dplayer-danmaku .dplayer-danmaku-bottom.dplayer-danmaku-move {
  will-change: visibility;
  animation-name: 'danmaku-center';
  animation-timing-function: linear;
  animation-play-state: paused;
}
@keyframes danmaku-center {
  from {
    visibility: visible;
  }
  to {
    visibility: visible;
  }
}
.dplayer-logo {
  pointer-events: none;
  position: absolute;
  left: 20px;
  top: 20px;
  max-width: 50px;
  max-height: 50px;
}
.dplayer-logo img {
  max-width: 100%;
  max-height: 100%;
  background: none;
}
.dplayer-menu {
  position: absolute;
  width: 170px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.85);
  padding: 5px 0;
  overflow: hidden;
  z-index: 3;
  display: none;
}
.dplayer-menu.dplayer-menu-show {
  display: block;
}
.dplayer-menu .dplayer-menu-item {
  height: 30px;
  box-sizing: border-box;
  cursor: pointer;
}
.dplayer-menu .dplayer-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-menu .dplayer-menu-item a {
  padding: 0 10px;
  line-height: 30px;
  color: #eee;
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.dplayer-menu .dplayer-menu-item a:hover {
  text-decoration: none;
}
.dplayer-notice-list {
  position: absolute;
  bottom: 60px;
  left: 20px;
}
.dplayer-notice-list .dplayer-notice {
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  color: #fff;
  display: table;
  pointer-events: none;
  animation: showNotice 0.3s ease 1 forwards;
}
.dplayer-notice-list .remove-notice {
  animation: removeNotice 0.3s ease 1 forwards;
}
@keyframes showNotice {
  from {
    padding: 0;
    font-size: 0;
    margin-top: 0;
  }
  to {
    padding: 7px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
}
@keyframes removeNotice {
  0% {
    padding: 7px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
  20% {
    font-size: 12px;
  }
  21% {
    font-size: 0;
    padding: 7px 10px;
  }
  100% {
    padding: 0;
    margin-top: 0;
    font-size: 0;
  }
}
.dplayer-subtitle {
  position: absolute;
  bottom: 40px;
  width: 90%;
  left: 5%;
  text-align: center;
  color: #fff;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
  font-size: 20px;
}
.dplayer-subtitle.dplayer-subtitle-hide {
  display: none;
}
.dplayer-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: none;
}
.dplayer-mask.dplayer-mask-show {
  display: block;
}
.dplayer-video-wrap {
  position: relative;
  background: #000;
  font-size: 0;
  width: 100%;
  height: 100%;
}
.dplayer-video-wrap .dplayer-video {
  width: 100%;
  height: 100%;
  display: none;
}
.dplayer-video-wrap .dplayer-video-current {
  display: block;
}
.dplayer-video-wrap .dplayer-video-prepare {
  display: none;
}
.dplayer-info-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 400px;
  background: rgba(28, 28, 28, 0.8);
  padding: 10px;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
.dplayer-info-panel-hide {
  display: none;
}
.dplayer-info-panel .dplayer-info-panel-close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
}
.dplayer-info-panel .dplayer-info-panel-item > span {
  display: inline-block;
  vertical-align: middle;
  line-height: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.dplayer-info-panel .dplayer-info-panel-item-title {
  width: 100px;
  text-align: right;
  margin-right: 10px;
}
.dplayer-info-panel .dplayer-info-panel-item-data {
  width: 260px;
}
`,"",{version:3,sources:["webpack://./src/css/global.less","webpack://./src/css/index.less","webpack://./src/css/player.less","webpack://./src/css/balloon.less","webpack://./src/css/bezel.less","webpack://./src/css/notice.less","webpack://./src/css/controller.less","webpack://./src/css/danmaku.less","webpack://./src/css/logo.less","webpack://./src/css/menu.less","webpack://./src/css/subtitle.less","webpack://./src/css/video.less","webpack://./src/css/info-panel.less"],names:[],mappings:"AAAA;EACI;IACI,6CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;;IAEI,uCAAA;ECEN;AACF;ACzJA;EACI,kBAAA;EACA,gBAAA;EACA,yBAAA;KAAA,sBAAA;UAAA,iBAAA;EACA,cAAA;AD2JJ;AC/JA;EAOQ,uBAAA;AD2JR;AClKA;EAWQ,WAAA;EACA,YAAA;AD0JR;ACtKA;;EAgBY,UAAA;AD0JZ;ACtJI;EACI,WAAA;EACA,YAAA;EACA,gBAAA;EACA,eAAA;EACA,eAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,UAAA;EACA,0BAAA;ADwJR;ACpJI;;;EAKY,aAAA;ADoJhB;ACzJI;EAUQ,aAAA;ADkJZ;AC5JI;EAcQ,aAAA;ADiJZ;AC7II;EAEQ,aAAA;AD8IZ;AChJI;EAKQ,aAAA;AD8IZ;ACnJI;EAQQ,aAAA;AD8IZ;ACtJI;EAWQ,aAAA;AD8IZ;AC3IQ;EAEQ,aAAA;AD4IhB;ACvII;EAEQ,eAAA;ADwIZ;AC1II;EAKQ,cAAA;ADwIZ;ACpII;EAEQ,6BAAA;ADqIZ;AClIQ;EAAA;IAEQ,UAAA;EDoId;ECtIM;IAKQ,UAAA;EDoId;ECjIU;IAEQ,UAAA;EDkIlB;ECpIU;IAKQ,UAAA;EDkIlB;AACF;AC7HI;EAEQ,cAAA;AD8HZ;AC1HI;;;;EAIQ,4BAAA;AD4HZ;ACxHI;EACI,YAAA;AD0HR;AC3HI;EAIQ,UAAA;EACA,2BAAA;AD0HZ;AC/HI;EAQQ,UAAA;EACA,2BAAA;AD0HZ;ACvHI;EAEQ,UAAA;ADwHZ;AC1HI;EAKQ,UAAA;ADwHZ;ACrHI;EAKI,sBAAA;EACA,uBAAA;ADuHR;AC7HI;EACI,eAAA;EACA,eAAA;EACA,OAAA;EACA,MAAA;ADyHR;ACrHI;;;;;EAOY,aAAA;ADqHhB;AC5HI;EAUY,gBAAA;EACA,qBAAA;ADqHhB;AChII;EAgBQ,aAAA;ADmHZ;AChHQ;EAEQ,aAAA;ADiHhB;ACtII;EA0BQ,cAAA;AD+GZ;ACzGA;EACI,eAAA;EACA,MAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;AD2GJ;AElSA;EACI,aAAA;AFoSJ;AEjSA;EACI,oBAAA;EACA,iCAAA;AFmSJ;AEhSA;EACI,gBAAA;AFkSJ;AG9SA;EACI,kBAAA;EACA,OAAA;EACA,QAAA;EACA,MAAA;EACA,SAAA;EACA,eAAA;EACA,WAAA;EACA,oBAAA;AHgTJ;AGxTA;EAUQ,kBAAA;EACA,QAAA;EACA,SAAA;EACA,uBAAA;EACA,YAAA;EACA,WAAA;EACA,aAAA;EACA,sBAAA;EACA,8BAAA;EACA,kBAAA;EACA,UAAA;EACA,oBAAA;AHiTR;AGhTQ;EACI,iCAAA;AHkTZ;AGhTQ;EACI;IACI,UAAA;IACA,mBAAA;EHkTd;EGhTU;IACI,UAAA;IACA,mBAAA;EHkTd;AACF;AGnVA;EAqCQ,kBAAA;EACA,QAAA;EACA,gBAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,iBAAA;EACA,0CAAA;AHiTR;AG7VA;EA+CQ,aAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,uBAAA;EACA,YAAA;EACA,WAAA;EACA,oBAAA;AHiTR;AGvWA;EAwDY,aAAA;AHkTZ;AG1WA;EA2DY,uDAAA;EACA,UAAA;EACA,yBAAA;AHkTZ;AI/WC;EDgEmB,qBAAA;AHkTpB;AIlXC;EDgEmB,qBAAA;AHqTpB;AIrXC;EDgEmB,qBAAA;AHwTpB;AIxXC;EDgEmB,qBAAA;AH2TpB;AI3XC;EDgEmB,qBAAA;AH8TpB;AI9XC;EDgEmB,qBAAA;AHiUpB;AIjYC;EDgEmB,qBAAA;AHoUpB;AGhUQ;EACI;IACI,YAAA;IACA,0BAAA;EHkUd;EGhUU;IACI,aAAA;IACA,0BAAA;EHkUd;EGhUU;IACI,aAAA;IACA,4BAAA;EHkUd;AACF;AKlZA;EACI,mEAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,SAAA;EACA,yBAAA;ALoZJ;AKjZA;EACI,kBAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,YAAA;EACA,eAAA;EACA,yBAAA;KAAA,sBAAA;UAAA,iBAAA;EACA,yBAAA;ALmZJ;AKlZI;EAEQ,aAAA;ALmZZ;AKrZI;EAKQ,cAAA;ALmZZ;AKjaA;EAkBQ,cAAA;EACA,eAAA;EACA,kBAAA;EACA,YAAA;EACA,wBAAA;EACA,WAAA;ALkZR;AKjZQ;EAEQ,mBAAA;ALkZhB;AKpZQ;EAKQ,cAAA;EACA,UAAA;EACA,2BAAA;EACA,QAAA;EACA,WAAA;ALkZhB;AKnbA;EAqCY,WAAA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;EACA,sBAAA;EACA,kBAAA;EACA,2BAAA;EACA,gCAAA;ALiZZ;AKhZY;EAEQ,cAAA;ALiZpB;AK/YgB;EACI,UAAA;ALiZpB;AK/YgB;EACI,UAAA;ALiZpB;AKxcA;EA2DgB,aAAA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;EACA,gBAAA;EACA,qCAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,mBAAA;EACA,2BAAA;ALgZhB;AKrdA;EAyEY,kBAAA;EACA,gBAAA;EACA,oBAAA;EACA,aAAA;EACA,6BAAA;AL+YZ;AK5dA;EAgFY,kBAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;EACA,oBAAA;AL+YZ;AKneA;EA0FY,kBAAA;EACA,SAAA;EACA,UAAA;EACA,kBAAA;EACA,gBAAA;EACA,qCAAA;EACA,WAAA;EACA,eAAA;EACA,kBAAA;EACA,UAAA;EACA,oCAAA;EACA,iBAAA;EACA,kBAAA;EACA,UAAA;EACA,oBAAA;AL4YZ;AK7ZY;EACI,UAAA;AL+ZhB;AKvfA;EA2GY,kBAAA;EACA,WAAA;EACA,WAAA;EACA,oCAAA;EACA,eAAA;AL+YZ;AK9fA;EAiHgB,kBAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,oCAAA;EACA,WAAA;EACA,yBAAA;EACA,kBAAA;ALgZhB;AKxgBA;EA2HgB,kBAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,WAAA;EACA,kBAAA;ALgZhB;AKhhBA;EAkIoB,kBAAA;EACA,MAAA;EACA,UAAA;EACA,gBAAA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,gCAAA;EACA,mBAAA;ALiZpB;AK7hBA;EAkJQ,YAAA;EACA,kBAAA;EACA,SAAA;AL8YR;AK7YQ;EACI,aAAA;EACA,kBAAA;EACA,gCAAA;EACA,UAAA;EACA,YAAA;EACA,SAAA;EACA,UAAA;EACA,WAAA;EACA,WAAA;AL+YZ;AKxZQ;EAWQ,YAAA;ALgZhB;AK3ZQ;EAcQ,kBAAA;EACA,OAAA;EACA,MAAA;ALgZhB;AKhaQ;EAmBQ,kBAAA;EACA,QAAA;EACA,MAAA;ALgZhB;AKraQ;EAwBQ,kBAAA;EACA,iCAAA;EACA,YAAA;EACA,OAAA;EACA,uCAAA;EACA,kBAAA;EACA,uBAAA;EACA,eAAA;EACA,YAAA;EACA,gCAAA;EACA,mBAAA;ALgZhB;AK/YgB;EACI,mBAAA;ALiZpB;AKrbQ;EAuCY,aAAA;ALiZpB;AKxbQ;EA0CY,eAAA;ALiZpB;AK3bQ;EA6CY,eAAA;EACA,WAAA;EACA,iBAAA;ALiZpB;AKhcQ;EAkDY,YAAA;ALiZpB;AKncQ;EAoDgB,kBAAA;ALkZxB;AK/YwB;EAEQ,0BAAA;ALgZhC;AK7YwB;EAEQ,0BAAA;AL8YhC;AK5cQ;EAmEgB,UAAA;EACA,gBAAA;EACA,iBAAA;EACA,qBAAA;EACA,eAAA;EACA,WAAA;EACA,sBAAA;EACA,kBAAA;EACA,sBAAA;EACA,kBAAA;EACA,eAAA;AL4YxB;AKzdQ;EAgFgB,mBAAA;EACA,cAAA;AL4YxB;AK7dQ;EAqFY,YAAA;AL2YpB;AKheQ;EAuFgB,YAAA;EACA,YAAA;EACA,qBAAA;AL4YxB;AKreQ;EA4FgB,WAAA;EACA,YAAA;EACA,qBAAA;EACA,kBAAA;EACA,sBAAA;EACA,eAAA;AL4YxB;AK3YwB;EACI,0CAAA;AL6Y5B;AKhfQ;EAyGQ,aAAA;EACA,YAAA;EACA,iBAAA;EACA,eAAA;EACA,iBAAA;EACA,kBAAA;EACA,kBAAA;EACA,gBAAA;EACA,SAAA;EACA,YAAA;EACA,sBAAA;EACA,WAAA;EACA,WAAA;AL0YhB;AKzYgB;EACI,WAAA;EACA,YAAA;AL2YpB;AK7YgB;EACI,WAAA;EACA,YAAA;AL2YpB;AKzYgB;EACI,aAAA;AL2YpB;AKvYQ;EAEQ,YAAA;ALwYhB;AKrYQ;EACI,WAAA;ALuYZ;AKxYQ;EAGQ,YAAA;ALwYhB;AKpqBA;;EAiSY,iBAAA;EACA,WAAA;EACA,uCAAA;EACA,sBAAA;EACA,eAAA;EACA,eAAA;ALuYZ;AK7qBA;EAySY,qBAAA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;EACA,iBAAA;EACA,WAAA;EACA,kBAAA;ALuYZ;AKtrBA;EAkTY,WAAA;EACA,YAAA;EACA,YAAA;EACA,6BAAA;EACA,aAAA;EACA,eAAA;EACA,sBAAA;EACA,sBAAA;EACA,qBAAA;ALuYZ;AKjsBA;EA4TgB,gCAAA;EACA,YAAA;ALwYhB;AKtYY;EAEQ,UAAA;ALuYpB;AKpYY;EACI,WAAA;EACA,WAAA;EACA,iBAAA;EACA,eAAA;ALsYhB;AKpYY;EACI,qBAAA;ALsYhB;AKpYY;EACI,kBAAA;ALsYhB;AKpYY;EACI,WAAA;ALsYhB;AKvtBA;EAqVY,kBAAA;EACA,qBAAA;EACA,eAAA;EACA,YAAA;ALqYZ;AKpYY;EAEQ,WAAA;ALqYpB;AKvYY;EAKQ,mBAAA;ALqYpB;AKlYY;EAEQ,WAAA;ALmYpB;AKrYY;EAKQ,mBAAA;ALmYpB;AKzuBA;EA0WgB,qBAAA;EACA,qBAAA;EACA,sBAAA;EACA,YAAA;ALkYhB;AK/uBA;EA+WoB,kBAAA;EACA,SAAA;EACA,QAAA;EACA,WAAA;EACA,gBAAA;EACA,gCAAA;ALmYpB;AKvvBA;EAsXwB,kBAAA;EACA,SAAA;EACA,OAAA;EACA,YAAA;EACA,yBAAA;EACA,kBAAA;ALoYxB;AK/vBA;EA6X4B,kBAAA;EACA,MAAA;EACA,UAAA;EACA,gBAAA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,gCAAA;EACA,mBAAA;ALqY5B;AK5wBA;EA8YY,qBAAA;EACA,YAAA;ALiYZ;AKhxBA;EAkZY,qBAAA;EACA,YAAA;ALiYZ;AKpxBA;EAqZgB,kBAAA;EACA,QAAA;EACA,YAAA;EACA,mBAAA;EACA,uBAAA;EAAA,kBAAA;EACA,gBAAA;EACA,gBAAA;EACA,kBAAA;EACA,iCAAA;EACA,cAAA;EACA,gCAAA;EACA,cAAA;EACA,UAAA;ALkYhB;AKjYgB;EACI,cAAA;ALmYpB;AKjYgB;EACI,mBAAA;ALmYpB;AKzyBA;EA0agB,YAAA;EACA,iBAAA;EACA,sBAAA;EACA,eAAA;EACA,kBAAA;ALkYhB;AKjYgB;EACI,0CAAA;ALmYpB;AKnzBA;EAqbY,qBAAA;EACA,YAAA;ALiYZ;AKvzBA;EAwbgB,kBAAA;EACA,QAAA;EACA,YAAA;EACA,mBAAA;EACA,YAAA;EACA,kBAAA;EACA,iCAAA;EACA,cAAA;EACA,gCAAA;EACA,gBAAA;EACA,UAAA;ALkYhB;AKjYgB;EACI,aAAA;ALmYpB;AKlYoB;EACI,cAAA;ALoYxB;AKjYgB;EACI,mBAAA;ALmYpB;AKjYgB;EACI,WAAA;EACA,kBAAA;ALmYpB;AKjYgB;EAEQ,aAAA;ALkYxB;AKpYgB;EAKQ,cAAA;ALkYxB;AKv1BA;;EA2dgB,YAAA;EACA,iBAAA;EACA,sBAAA;EACA,eAAA;EACA,kBAAA;ALgYhB;AK/XgB;;EACI,0CAAA;ALkYpB;AKn2BA;EAqegB,cAAA;ALiYhB;AKt2BA;EAueoB,eAAA;EACA,eAAA;ALkYpB;AKhYgB;EAEQ,aAAA;ALiYxB;AKnYgB;EAKQ,qBAAA;ALiYxB;AK9XgB;EAEQ,aAAA;AL+XxB;AKjYgB;EAKQ,qBAAA;AL+XxB;AKt3BA;EA2foB,eAAA;EACA,sBAAA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;EACA,WAAA;AL8XpB;AK93BA;EAkgBwB,kBAAA;EACA,UAAA;EACA,WAAA;EACA,WAAA;EACA,gBAAA;EACA,gCAAA;AL+XxB;AKt4BA;EAygB4B,kBAAA;EACA,SAAA;EACA,OAAA;EACA,YAAA;EACA,yBAAA;EACA,gBAAA;EACA,kBAAA;ALgY5B;AK/4BA;EAihBgC,kBAAA;EACA,MAAA;EACA,UAAA;EACA,gBAAA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,gCAAA;EACA,gBAAA;ALiYhC;AK55BA;EAmiBY,qBAAA;EACA,YAAA;EACA,kBAAA;AL4XZ;AK3XY;EAEQ,cAAA;AL4XpB;AKp6BA;EA4iBgB,kBAAA;EACA,UAAA;EACA,UAAA;EACA,aAAA;AL2XhB;AK16BA;EAmjBY,kBAAA;EACA,qBAAA;EACA,YAAA;EACA,UAAA;AL0XZ;AKzXY;EAEQ,cAAA;AL0XpB;AK5XY;EAKQ,cAAA;AL0XpB;AKt7BA;EAgkBgB,aAAA;EACA,kBAAA;EACA,YAAA;EACA,WAAA;EACA,WAAA;EACA,oBAAA;ALyXhB;AK97BA;EAwkBgB,aAAA;EACA,eAAA;EACA,WAAA;EACA,kBAAA;EACA,iCAAA;EACA,cAAA;EACA,gCAAA;EACA,gBAAA;EACA,WAAA;EACA,kBAAA;ALyXhB;AK18BA;EAolBgB,YAAA;EACA,sBAAA;EACA,eAAA;EACA,iBAAA;ALyXhB;AKxXgB;EACI,0CAAA;AL0XpB;AKn9BA;EA8lBY,qBAAA;EACA,YAAA;ALwXZ;AKv9BA;EAkmBY,WAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;EACA,mBAAA;ALwXZ;AK99BA;EAymBY,WAAA;EACA,YAAA;EACA,kBAAA;EACA,YAAA;EACA,sBAAA;EACA,kBAAA;EACA,QAAA;EACA,WAAA;ALwXZ;AKx+BA;EAknBgB,aAAA;EACA,YAAA;EACA,aAAA;ALyXhB;AK7+BA;EAunBgB,qBAAA;EACA,kBAAA;EACA,iCAAA;EACA,yBAAA;EACA,YAAA;EACA,WAAA;EACA,mBAAA;EACA,sBAAA;EACA,eAAA;EACA,4BAAA;ALyXhB;AKz/BA;EAmoBgB,WAAA;EACA,kBAAA;EACA,cAAA;EACA,YAAA;EACA,WAAA;EACA,MAAA;EACA,OAAA;EACA,mBAAA;EACA,4BAAA;ALyXhB;AKpgCA;EA8oBgB,WAAA;EACA,kBAAA;EACA,cAAA;EACA,OAAA;EACA,MAAA;EACA,mBAAA;EACA,gBAAA;EACA,4BAAA;EACA,wCAAA;EACA,YAAA;EACA,WAAA;ALyXhB;AKjhCA;EA2pBgB,sCAAA;ALyXhB;AKphCA;EA8pBgB,WAAA;EACA,oCAAA;ALyXhB;AKxhCA;EAkqBgB,UAAA;ALyXhB;AKnXA;EACI,aAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,6BAAA;EACA,aAAA;EACA,eAAA;EACA,sBAAA;EAEA,SAAA;EACA,YAAA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;EACA,gCAAA;ALoXJ;AMpjCA;EACI,kBAAA;EACA,OAAA;EACA,QAAA;EACA,MAAA;EACA,SAAA;EACA,eAAA;EACA,WAAA;ANsjCJ;AM7jCA;EASQ,qBAAA;EACA,oBAAA;EACA,yBAAA;KAAA,sBAAA;UAAA,iBAAA;EACA,eAAA;EACA,mBAAA;EACA,iDAAA;ANujCR;AMtjCQ;EACI,kBAAA;EACA,kBAAA;ANwjCZ;AMzkCA;EAqBQ,kBAAA;EACA,QAAA;EACA,2BAAA;ANujCR;AMtjCQ;EACI,sBAAA;EACA,yBAAA;EACA,iCAAA;EACA,4BAAA;ANwjCZ;AMrjCI;EACI;IACI,2BAAA;ENujCV;AACF;AMzlCA;;EAsCQ,kBAAA;EACA,WAAA;EACA,kBAAA;EACA,kBAAA;ANujCR;AMtjCQ;;EACI,uBAAA;EACA,gCAAA;EACA,iCAAA;EACA,4BAAA;ANyjCZ;AMtjCI;EACI;IACI,mBAAA;ENwjCV;EMtjCM;IACI,mBAAA;ENwjCV;AACF;AO/mCA;EACI,oBAAA;EACA,kBAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,gBAAA;APinCJ;AOvnCA;EAQQ,eAAA;EACA,gBAAA;EACA,gBAAA;APknCR;AQ5nCA;EACI,kBAAA;EACA,YAAA;EACA,kBAAA;EACA,kCAAA;EACA,cAAA;EACA,gBAAA;EACA,UAAA;EACA,aAAA;AR8nCJ;AQ7nCI;EACI,cAAA;AR+nCR;AQzoCA;EAaQ,YAAA;EACA,sBAAA;EACA,eAAA;AR+nCR;AQ9nCQ;EACI,0CAAA;ARgoCZ;AQjpCA;EAqBY,eAAA;EACA,iBAAA;EACA,WAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;EACA,WAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,gBAAA;AR+nCZ;AQ9nCY;EACI,qBAAA;ARgoChB;AIjqCA;EACI,kBAAA;EACA,YAAA;EACA,UAAA;AJmqCJ;AItqCA;EAMQ,kBAAA;EACA,iCAAA;EACA,gCAAA;EACA,gBAAA;EACA,WAAA;EACA,cAAA;EACA,oBAAA;EACA,0CAAA;AJmqCR;AIhrCA;EAiBQ,4CAAA;AJkqCR;AI9pCA;EACI;IACI,UAAA;IACA,YAAA;IACA,aAAA;EJgqCN;EI9pCE;IACI,iBAAA;IACA,eAAA;IACA,eAAA;EJgqCN;AACF;AI7pCA;EACI;IACI,iBAAA;IACA,eAAA;IACA,eAAA;EJ+pCN;EI7pCE;IACI,eAAA;EJ+pCN;EI7pCE;IACI,YAAA;IACA,iBAAA;EJ+pCN;EI7pCE;IACI,UAAA;IACA,aAAA;IACA,YAAA;EJ+pCN;AACF;ASltCA;EACI,kBAAA;EACA,YAAA;EACA,UAAA;EACA,QAAA;EACA,kBAAA;EACA,WAAA;EACA,iDAAA;EACA,eAAA;ATotCJ;ASntCI;EACI,aAAA;ATqtCR;AU/tCA;EACI,kBAAA;EACA,MAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,UAAA;EACA,aAAA;AViuCJ;AUhuCI;EACI,cAAA;AVkuCR;AU9tCA;EACI,kBAAA;EACA,gBAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;AVguCJ;AUruCA;EAOQ,WAAA;EACA,YAAA;EACA,aAAA;AViuCR;AU1uCA;EAYQ,cAAA;AViuCR;AU7uCA;EAeQ,aAAA;AViuCR;AW7vCA;EACI,kBAAA;EACA,SAAA;EACA,UAAA;EACA,YAAA;EACA,iCAAA;EACA,aAAA;EACA,WAAA;EACA,eAAA;EACA,kBAAA;AX+vCJ;AW7vCI;EACI,aAAA;AX+vCR;AW3wCA;EAgBQ,eAAA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;AX8vCR;AW1vCQ;EACI,qBAAA;EACA,sBAAA;EACA,iBAAA;EACA,mBAAA;EACA,uBAAA;EACA,gBAAA;AX4vCZ;AWzxCA;EAkCQ,YAAA;EACA,iBAAA;EACA,kBAAA;AX0vCR;AW9xCA;EAwCQ,YAAA;AXyvCR",sourcesContent:[`@keyframes my-face {
    2% {
        transform: translate(0, 1.5px) rotate(1.5deg);
    }
    4% {
        transform: translate(0, -1.5px) rotate(-0.5deg);
    }
    6% {
        transform: translate(0, 1.5px) rotate(-1.5deg);
    }
    8% {
        transform: translate(0, -1.5px) rotate(-1.5deg);
    }
    10% {
        transform: translate(0, 2.5px) rotate(1.5deg);
    }
    12% {
        transform: translate(0, -0.5px) rotate(1.5deg);
    }
    14% {
        transform: translate(0, -1.5px) rotate(1.5deg);
    }
    16% {
        transform: translate(0, -0.5px) rotate(-1.5deg);
    }
    18% {
        transform: translate(0, 0.5px) rotate(-1.5deg);
    }
    20% {
        transform: translate(0, -1.5px) rotate(2.5deg);
    }
    22% {
        transform: translate(0, 0.5px) rotate(-1.5deg);
    }
    24% {
        transform: translate(0, 1.5px) rotate(1.5deg);
    }
    26% {
        transform: translate(0, 0.5px) rotate(0.5deg);
    }
    28% {
        transform: translate(0, 0.5px) rotate(1.5deg);
    }
    30% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    32% {
        transform: translate(0, 1.5px) rotate(-0.5deg);
    }
    34% {
        transform: translate(0, 1.5px) rotate(-0.5deg);
    }
    36% {
        transform: translate(0, -1.5px) rotate(2.5deg);
    }
    38% {
        transform: translate(0, 1.5px) rotate(-1.5deg);
    }
    40% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    42% {
        transform: translate(0, 2.5px) rotate(-1.5deg);
    }
    44% {
        transform: translate(0, 1.5px) rotate(0.5deg);
    }
    46% {
        transform: translate(0, -1.5px) rotate(2.5deg);
    }
    48% {
        transform: translate(0, -0.5px) rotate(0.5deg);
    }
    50% {
        transform: translate(0, 0.5px) rotate(0.5deg);
    }
    52% {
        transform: translate(0, 2.5px) rotate(2.5deg);
    }
    54% {
        transform: translate(0, -1.5px) rotate(1.5deg);
    }
    56% {
        transform: translate(0, 2.5px) rotate(2.5deg);
    }
    58% {
        transform: translate(0, 0.5px) rotate(2.5deg);
    }
    60% {
        transform: translate(0, 2.5px) rotate(2.5deg);
    }
    62% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    64% {
        transform: translate(0, -0.5px) rotate(1.5deg);
    }
    66% {
        transform: translate(0, 1.5px) rotate(-0.5deg);
    }
    68% {
        transform: translate(0, -1.5px) rotate(-0.5deg);
    }
    70% {
        transform: translate(0, 1.5px) rotate(0.5deg);
    }
    72% {
        transform: translate(0, 2.5px) rotate(1.5deg);
    }
    74% {
        transform: translate(0, -0.5px) rotate(0.5deg);
    }
    76% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    78% {
        transform: translate(0, -0.5px) rotate(1.5deg);
    }
    80% {
        transform: translate(0, 1.5px) rotate(1.5deg);
    }
    82% {
        transform: translate(0, -0.5px) rotate(0.5deg);
    }
    84% {
        transform: translate(0, 1.5px) rotate(2.5deg);
    }
    86% {
        transform: translate(0, -1.5px) rotate(-1.5deg);
    }
    88% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    90% {
        transform: translate(0, 2.5px) rotate(-0.5deg);
    }
    92% {
        transform: translate(0, 0.5px) rotate(-0.5deg);
    }
    94% {
        transform: translate(0, 2.5px) rotate(0.5deg);
    }
    96% {
        transform: translate(0, -0.5px) rotate(1.5deg);
    }
    98% {
        transform: translate(0, -1.5px) rotate(-0.5deg);
    }
    0%,
    100% {
        transform: translate(0, 0) rotate(0deg);
    }
}`,`@import '../../node_modules/balloon-css/balloon.css';
@keyframes my-face {
  2% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  4% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  6% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  8% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  10% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  12% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  14% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  16% {
    transform: translate(0, -0.5px) rotate(-1.5deg);
  }
  18% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  20% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  22% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  24% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  26% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  28% {
    transform: translate(0, 0.5px) rotate(1.5deg);
  }
  30% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  32% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  34% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  36% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  38% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  40% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  42% {
    transform: translate(0, 2.5px) rotate(-1.5deg);
  }
  44% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  46% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  48% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  50% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  52% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  54% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  56% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  58% {
    transform: translate(0, 0.5px) rotate(2.5deg);
  }
  60% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  62% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  64% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  66% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  68% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  70% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  72% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  74% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  76% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  78% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  80% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  82% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  84% {
    transform: translate(0, 1.5px) rotate(2.5deg);
  }
  86% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  88% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  90% {
    transform: translate(0, 2.5px) rotate(-0.5deg);
  }
  92% {
    transform: translate(0, 0.5px) rotate(-0.5deg);
  }
  94% {
    transform: translate(0, 2.5px) rotate(0.5deg);
  }
  96% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  98% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}
.dplayer {
  position: relative;
  overflow: hidden;
  user-select: none;
  line-height: 1;
}
.dplayer * {
  box-sizing: content-box;
}
.dplayer svg {
  width: 100%;
  height: 100%;
}
.dplayer svg path,
.dplayer svg circle {
  fill: #fff;
}
.dplayer:-webkit-full-screen {
  width: 100%;
  height: 100%;
  background: #000;
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  transform: translate(0, 0);
}
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-showdan,
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-danmaku,
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-danunlimit {
  display: none;
}
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-comment {
  display: none;
}
.dplayer.dplayer-no-danmaku .dplayer-danmaku {
  display: none;
}
.dplayer.dplayer-live .dplayer-time {
  display: none;
}
.dplayer.dplayer-live .dplayer-bar-wrap {
  display: none;
}
.dplayer.dplayer-live .dplayer-setting-speed {
  display: none;
}
.dplayer.dplayer-live .dplayer-setting-loop {
  display: none;
}
.dplayer.dplayer-live.dplayer-no-danmaku .dplayer-setting {
  display: none;
}
.dplayer.dplayer-arrow .dplayer-danmaku {
  font-size: 18px;
}
.dplayer.dplayer-arrow .dplayer-icon {
  margin: 0 -3px;
}
.dplayer.dplayer-playing .dplayer-danmaku .dplayer-danmaku-move {
  animation-play-state: running;
}
@media (min-width: 900px) {
  .dplayer.dplayer-playing .dplayer-controller-mask {
    opacity: 0;
  }
  .dplayer.dplayer-playing .dplayer-controller {
    opacity: 0;
  }
  .dplayer.dplayer-playing:hover .dplayer-controller-mask {
    opacity: 1;
  }
  .dplayer.dplayer-playing:hover .dplayer-controller {
    opacity: 1;
  }
}
.dplayer.dplayer-loading .dplayer-bezel .diplayer-loading-icon {
  display: block;
}
.dplayer.dplayer-loading .dplayer-danmaku,
.dplayer.dplayer-paused .dplayer-danmaku,
.dplayer.dplayer-loading .dplayer-danmaku-move,
.dplayer.dplayer-paused .dplayer-danmaku-move {
  animation-play-state: paused;
}
.dplayer.dplayer-hide-controller {
  cursor: none;
}
.dplayer.dplayer-hide-controller .dplayer-controller-mask {
  opacity: 0;
  transform: translateY(100%);
}
.dplayer.dplayer-hide-controller .dplayer-controller {
  opacity: 0;
  transform: translateY(100%);
}
.dplayer.dplayer-show-controller .dplayer-controller-mask {
  opacity: 1;
}
.dplayer.dplayer-show-controller .dplayer-controller {
  opacity: 1;
}
.dplayer.dplayer-fulled {
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
  width: 100% !important;
  height: 100% !important;
}
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-volume,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-camera-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-airplay-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-chromecast-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-play-icon {
  display: none;
}
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon {
  position: static;
  display: inline-block;
}
.dplayer.dplayer-mobile .dplayer-bar-time {
  display: none;
}
.dplayer.dplayer-mobile.dplayer-hide-controller .dplayer-mobile-play {
  display: none;
}
.dplayer.dplayer-mobile .dplayer-mobile-play {
  display: block;
}
.dplayer-web-fullscreen-fix {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
}
[data-balloon]:before {
  display: none;
}
[data-balloon]:after {
  padding: 0.3em 0.7em;
  background: rgba(17, 17, 17, 0.7);
}
[data-balloon][data-balloon-pos="up"]:after {
  margin-bottom: 0;
}
.dplayer-bezel {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 22px;
  color: #fff;
  pointer-events: none;
}
.dplayer-bezel .dplayer-bezel-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -26px 0 0 -26px;
  height: 52px;
  width: 52px;
  padding: 12px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}
.dplayer-bezel .dplayer-bezel-icon.dplayer-bezel-transition {
  animation: bezel-hide 0.5s linear;
}
@keyframes bezel-hide {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
}
.dplayer-bezel .dplayer-danloading {
  position: absolute;
  top: 50%;
  margin-top: -7px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  animation: my-face 5s infinite ease-in-out;
}
.dplayer-bezel .diplayer-loading-icon {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -18px 0 0 -18px;
  height: 36px;
  width: 36px;
  pointer-events: none;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-hide {
  display: none;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot {
  animation: diplayer-loading-dot-fade 0.8s ease infinite;
  opacity: 0;
  transform-origin: 4px 4px;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-1 {
  animation-delay: 0.1s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-2 {
  animation-delay: 0.2s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-3 {
  animation-delay: 0.3s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-4 {
  animation-delay: 0.4s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-5 {
  animation-delay: 0.5s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-6 {
  animation-delay: 0.6s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-7 {
  animation-delay: 0.7s;
}
@keyframes diplayer-loading-dot-fade {
  0% {
    opacity: 0.7;
    transform: scale(1.2, 1.2);
  }
  50% {
    opacity: 0.25;
    transform: scale(0.9, 0.9);
  }
  to {
    opacity: 0.25;
    transform: scale(0.85, 0.85);
  }
}
.dplayer-controller-mask {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x bottom;
  height: 98px;
  width: 100%;
  position: absolute;
  bottom: 0;
  transition: all 0.3s ease;
}
.dplayer-controller {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 41px;
  padding: 0 20px;
  user-select: none;
  transition: all 0.3s ease;
}
.dplayer-controller.dplayer-controller-comment .dplayer-icons {
  display: none;
}
.dplayer-controller.dplayer-controller-comment .dplayer-icons.dplayer-comment-box {
  display: block;
}
.dplayer-controller .dplayer-bar-wrap {
  padding: 5px 0;
  cursor: pointer;
  position: absolute;
  bottom: 33px;
  width: calc(100% - 40px);
  height: 3px;
}
.dplayer-controller .dplayer-bar-wrap:hover .dplayer-bar .dplayer-played .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-bar-wrap:hover .dplayer-highlight {
  display: block;
  width: 8px;
  transform: translateX(-4px);
  top: 4px;
  height: 40%;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight {
  z-index: 12;
  position: absolute;
  top: 5px;
  width: 6px;
  height: 20%;
  border-radius: 6px;
  background-color: #fff;
  text-align: center;
  transform: translateX(-3px);
  transition: all 0.2s ease-in-out;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover .dplayer-highlight-text {
  display: block;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover ~ .dplayer-bar-preview {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover ~ .dplayer-bar-time {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight .dplayer-highlight-text {
  display: none;
  position: absolute;
  left: 50%;
  top: -24px;
  padding: 5px 8px;
  background-color: rgba(0, 0, 0, 0.62);
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  transform: translateX(-50%);
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-preview {
  position: absolute;
  background: #fff;
  pointer-events: none;
  display: none;
  background-size: 16000px 100%;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-preview-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-time {
  position: absolute;
  left: 0px;
  top: -20px;
  border-radius: 4px;
  padding: 5px 7px;
  background-color: rgba(0, 0, 0, 0.62);
  color: #fff;
  font-size: 12px;
  text-align: center;
  opacity: 1;
  transition: opacity 0.1s ease-in-out;
  word-wrap: normal;
  word-break: normal;
  z-index: 2;
  pointer-events: none;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-time.hidden {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar {
  position: relative;
  height: 3px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-loaded {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.4);
  height: 3px;
  transition: all 0.5s ease;
  will-change: width;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-played {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  height: 3px;
  will-change: width;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-played .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons {
  height: 38px;
  position: absolute;
  bottom: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box {
  display: none;
  position: absolute;
  transition: all 0.3s ease-in-out;
  z-index: 2;
  height: 38px;
  bottom: 0;
  left: 20px;
  right: 20px;
  color: #fff;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-icon {
  padding: 7px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-icon {
  position: absolute;
  left: 0;
  top: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-send-icon {
  position: absolute;
  right: 0;
  top: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box {
  position: absolute;
  background: rgba(28, 28, 28, 0.9);
  bottom: 41px;
  left: 0;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 10px 10px 16px;
  font-size: 14px;
  width: 204px;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box.dplayer-comment-setting-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box input[type=radio] {
  display: none;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box label {
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-title {
  font-size: 13px;
  color: #fff;
  line-height: 30px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type {
  font-size: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type .dplayer-comment-setting-title {
  margin-bottom: 6px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type label:nth-child(2) span {
  border-radius: 4px 0 0 4px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type label:nth-child(4) span {
  border-radius: 0 4px 4px 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type span {
  width: 33%;
  padding: 4px 6px;
  line-height: 16px;
  display: inline-block;
  font-size: 12px;
  color: #fff;
  border: 1px solid #fff;
  margin-right: -1px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type input:checked + span {
  background: #E4E4E6;
  color: #1c1c1c;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color {
  font-size: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color label {
  font-size: 0;
  padding: 6px;
  display: inline-block;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color span {
  width: 22px;
  height: 22px;
  display: inline-block;
  border-radius: 50%;
  box-sizing: border-box;
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color span:hover {
  animation: my-face 5s infinite ease-in-out;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input {
  outline: none;
  border: none;
  padding: 8px 31px;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  border-radius: 4px;
  background: none;
  margin: 0;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  color: #fff;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::placeholder {
  color: #fff;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::-ms-clear {
  display: none;
}
.dplayer-controller .dplayer-icons.dplayer-icons-left .dplayer-icon {
  padding: 7px;
}
.dplayer-controller .dplayer-icons.dplayer-icons-right {
  right: 20px;
}
.dplayer-controller .dplayer-icons.dplayer-icons-right .dplayer-icon {
  padding: 8px;
}
.dplayer-controller .dplayer-icons .dplayer-time,
.dplayer-controller .dplayer-icons .dplayer-live-badge {
  line-height: 38px;
  color: #eee;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  vertical-align: middle;
  font-size: 13px;
  cursor: default;
}
.dplayer-controller .dplayer-icons .dplayer-live-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  vertical-align: 4%;
  margin-right: 5px;
  content: '';
  border-radius: 6px;
}
.dplayer-controller .dplayer-icons .dplayer-icon {
  width: 40px;
  height: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  vertical-align: middle;
  box-sizing: border-box;
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-icon .dplayer-icon-content {
  transition: all 0.2s ease-in-out;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons .dplayer-icon:hover .dplayer-icon-content {
  opacity: 1;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-quality-icon {
  color: #fff;
  width: auto;
  line-height: 22px;
  font-size: 14px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-comment-icon {
  padding: 10px 9px 9px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-setting-icon {
  padding-top: 8.5px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-volume-icon {
  width: 43px;
}
.dplayer-controller .dplayer-icons .dplayer-volume {
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-volume:hover .dplayer-volume-bar-wrap .dplayer-volume-bar {
  width: 45px;
}
.dplayer-controller .dplayer-icons .dplayer-volume:hover .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-volume.dplayer-volume-active .dplayer-volume-bar-wrap .dplayer-volume-bar {
  width: 45px;
}
.dplayer-controller .dplayer-icons .dplayer-volume.dplayer-volume-active .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap {
  display: inline-block;
  margin: 0 10px 0 -5px;
  vertical-align: middle;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar {
  position: relative;
  top: 17px;
  width: 0;
  height: 3px;
  background: #aaa;
  transition: all 0.3s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  transition: all 0.1s ease;
  will-change: width;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons .dplayer-subtitle-btn {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box {
  position: absolute;
  right: 0;
  bottom: 50px;
  transform: scale(0);
  width: fit-content;
  max-width: 240px;
  min-width: 120px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 7px 0;
  transition: all 0.3s ease-in-out;
  overflow: auto;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box.dplayer-subtitles-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box.dplayer-subtitles-box-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-item {
  height: 30px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-setting {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box {
  position: absolute;
  right: 0;
  bottom: 50px;
  transform: scale(0);
  width: 150px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 7px 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box > div {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box > div.dplayer-setting-origin-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-narrow {
  width: 70px;
  text-align: center;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-speed .dplayer-setting-origin-panel {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-speed .dplayer-setting-speed-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-item,
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-speed-item {
  height: 30px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-item:hover,
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-speed-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku {
  padding: 5px 0;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-label {
  padding: 0 10px;
  display: inline;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku:hover .dplayer-label {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku:hover .dplayer-danmaku-bar-wrap {
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku.dplayer-setting-danmaku-active .dplayer-label {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku.dplayer-setting-danmaku-active .dplayer-danmaku-bar-wrap {
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap {
  padding: 0 10px;
  box-sizing: border-box;
  display: none;
  vertical-align: middle;
  height: 100%;
  width: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar {
  position: relative;
  top: 8.5px;
  width: 100%;
  height: 3px;
  background: #fff;
  transition: all 0.3s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar .dplayer-danmaku-bar-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  transition: all 0.1s ease;
  background: #aaa;
  will-change: width;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar .dplayer-danmaku-bar-inner .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background: #aaa;
}
.dplayer-controller .dplayer-icons .dplayer-full {
  display: inline-block;
  height: 100%;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-full:hover .dplayer-full-in-icon {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon {
  position: absolute;
  top: -30px;
  z-index: 1;
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-quality {
  position: relative;
  display: inline-block;
  height: 100%;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-quality:hover .dplayer-quality-list {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-quality:hover .dplayer-quality-mask {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-mask {
  display: none;
  position: absolute;
  bottom: 38px;
  left: -18px;
  width: 80px;
  padding-bottom: 12px;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-list {
  display: none;
  font-size: 12px;
  width: 80px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 5px 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  color: #fff;
  text-align: center;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-item {
  height: 25px;
  box-sizing: border-box;
  cursor: pointer;
  line-height: 25px;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-comment {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-label {
  color: #eee;
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
}
.dplayer-controller .dplayer-icons .dplayer-toggle {
  width: 32px;
  height: 20px;
  text-align: center;
  font-size: 0;
  vertical-align: middle;
  position: absolute;
  top: 5px;
  right: 10px;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input {
  max-height: 0;
  max-width: 0;
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label {
  display: inline-block;
  position: relative;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  border: 1px solid #dfdfdf;
  height: 20px;
  width: 32px;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label:before {
  content: "";
  position: absolute;
  display: block;
  height: 18px;
  width: 18px;
  top: 0;
  left: 0;
  border-radius: 15px;
  transition: 0.2s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label:after {
  content: "";
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  border-radius: 15px;
  background: #fff;
  transition: 0.2s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  height: 18px;
  width: 18px;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label {
  border-color: rgba(255, 255, 255, 0.5);
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label:before {
  width: 30px;
  background: rgba(255, 255, 255, 0.5);
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label:after {
  left: 12px;
}
.dplayer-mobile-play {
  display: none;
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  bottom: 0;
  opacity: 0.8;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.dplayer-danmaku {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 22px;
  color: #fff;
}
.dplayer-danmaku .dplayer-danmaku-item {
  display: inline-block;
  pointer-events: none;
  user-select: none;
  cursor: default;
  white-space: nowrap;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
}
.dplayer-danmaku .dplayer-danmaku-item--demo {
  position: absolute;
  visibility: hidden;
}
.dplayer-danmaku .dplayer-danmaku-right {
  position: absolute;
  right: 0;
  transform: translateX(100%);
}
.dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
  will-change: transform;
  animation-name: 'danmaku';
  animation-timing-function: linear;
  animation-play-state: paused;
}
@keyframes danmaku {
  from {
    transform: translateX(100%);
  }
}
.dplayer-danmaku .dplayer-danmaku-top,
.dplayer-danmaku .dplayer-danmaku-bottom {
  position: absolute;
  width: 100%;
  text-align: center;
  visibility: hidden;
}
.dplayer-danmaku .dplayer-danmaku-top.dplayer-danmaku-move,
.dplayer-danmaku .dplayer-danmaku-bottom.dplayer-danmaku-move {
  will-change: visibility;
  animation-name: 'danmaku-center';
  animation-timing-function: linear;
  animation-play-state: paused;
}
@keyframes danmaku-center {
  from {
    visibility: visible;
  }
  to {
    visibility: visible;
  }
}
.dplayer-logo {
  pointer-events: none;
  position: absolute;
  left: 20px;
  top: 20px;
  max-width: 50px;
  max-height: 50px;
}
.dplayer-logo img {
  max-width: 100%;
  max-height: 100%;
  background: none;
}
.dplayer-menu {
  position: absolute;
  width: 170px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.85);
  padding: 5px 0;
  overflow: hidden;
  z-index: 3;
  display: none;
}
.dplayer-menu.dplayer-menu-show {
  display: block;
}
.dplayer-menu .dplayer-menu-item {
  height: 30px;
  box-sizing: border-box;
  cursor: pointer;
}
.dplayer-menu .dplayer-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-menu .dplayer-menu-item a {
  padding: 0 10px;
  line-height: 30px;
  color: #eee;
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.dplayer-menu .dplayer-menu-item a:hover {
  text-decoration: none;
}
.dplayer-notice-list {
  position: absolute;
  bottom: 60px;
  left: 20px;
}
.dplayer-notice-list .dplayer-notice {
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  color: #fff;
  display: table;
  pointer-events: none;
  animation: showNotice 0.3s ease 1 forwards;
}
.dplayer-notice-list .remove-notice {
  animation: removeNotice 0.3s ease 1 forwards;
}
@keyframes showNotice {
  from {
    padding: 0;
    font-size: 0;
    margin-top: 0;
  }
  to {
    padding: 7px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
}
@keyframes removeNotice {
  0% {
    padding: 7px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
  20% {
    font-size: 12px;
  }
  21% {
    font-size: 0;
    padding: 7px 10px;
  }
  100% {
    padding: 0;
    margin-top: 0;
    font-size: 0;
  }
}
.dplayer-subtitle {
  position: absolute;
  bottom: 40px;
  width: 90%;
  left: 5%;
  text-align: center;
  color: #fff;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
  font-size: 20px;
}
.dplayer-subtitle.dplayer-subtitle-hide {
  display: none;
}
.dplayer-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: none;
}
.dplayer-mask.dplayer-mask-show {
  display: block;
}
.dplayer-video-wrap {
  position: relative;
  background: #000;
  font-size: 0;
  width: 100%;
  height: 100%;
}
.dplayer-video-wrap .dplayer-video {
  width: 100%;
  height: 100%;
  display: none;
}
.dplayer-video-wrap .dplayer-video-current {
  display: block;
}
.dplayer-video-wrap .dplayer-video-prepare {
  display: none;
}
.dplayer-info-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 400px;
  background: rgba(28, 28, 28, 0.8);
  padding: 10px;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
.dplayer-info-panel-hide {
  display: none;
}
.dplayer-info-panel .dplayer-info-panel-close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
}
.dplayer-info-panel .dplayer-info-panel-item > span {
  display: inline-block;
  vertical-align: middle;
  line-height: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.dplayer-info-panel .dplayer-info-panel-item-title {
  width: 100px;
  text-align: right;
  margin-right: 10px;
}
.dplayer-info-panel .dplayer-info-panel-item-data {
  width: 260px;
}
`,`.dplayer {
    position: relative;
    overflow: hidden;
    user-select: none;
    line-height: 1;

    * {
        box-sizing: content-box;
    }

    svg {
        width: 100%;
        height: 100%;

        path,
        circle {
            fill: #fff;
        }
    }

    &:-webkit-full-screen {
        width: 100%;
        height: 100%;
        background: #000;
        position: fixed;
        z-index: 100000;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        transform: translate(0, 0);
        
    }

    &.dplayer-no-danmaku {
        .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box {
            .dplayer-setting-showdan,
            .dplayer-setting-danmaku,
            .dplayer-setting-danunlimit {
                display: none;
            }
        }

        .dplayer-controller .dplayer-icons .dplayer-comment {
            display: none;
        }

        .dplayer-danmaku {
            display: none;
        }
    }

    &.dplayer-live {
        .dplayer-time {
            display: none;
        }
        .dplayer-bar-wrap {
            display: none;
        }
        .dplayer-setting-speed {
            display: none;
        }
        .dplayer-setting-loop {
            display: none;
        }

        &.dplayer-no-danmaku {
            .dplayer-setting {
                display: none;
            }
        }
    }

    &.dplayer-arrow {
        .dplayer-danmaku {
            font-size: 18px;
        }
        .dplayer-icon {
            margin: 0 -3px;
        }
    }

    &.dplayer-playing {
        .dplayer-danmaku .dplayer-danmaku-move {
            animation-play-state: running;
        }

        @media (min-width: 900px) {
            .dplayer-controller-mask {
                opacity: 0;
            }
            .dplayer-controller {
                opacity: 0;
            }

            &:hover {
                .dplayer-controller-mask {
                    opacity: 1;
                }
                .dplayer-controller {
                    opacity: 1;
                }
            }
        }
    }

    &.dplayer-loading {
        .dplayer-bezel .diplayer-loading-icon {
            display: block;
        }
    }

    &.dplayer-loading,
    &.dplayer-paused {
        .dplayer-danmaku,
        .dplayer-danmaku-move {
            animation-play-state: paused;
        }
    }

    &.dplayer-hide-controller {
        cursor: none;

        .dplayer-controller-mask {
            opacity: 0;
            transform: translateY(100%);
        }
        .dplayer-controller {
            opacity: 0;
            transform: translateY(100%);
        }
    }
    &.dplayer-show-controller {
        .dplayer-controller-mask {
            opacity: 1;
        }
        .dplayer-controller {
            opacity: 1;
        }
    }
    &.dplayer-fulled {
        position: fixed;
        z-index: 100000;
        left: 0;
        top: 0;
        width: 100% !important;
        height: 100% !important;
    }
    &.dplayer-mobile {
        .dplayer-controller .dplayer-icons {
            .dplayer-volume,
            .dplayer-camera-icon,
            .dplayer-airplay-icon,
            .dplayer-chromecast-icon,
            .dplayer-play-icon {
                display: none;
            }
            .dplayer-full .dplayer-full-in-icon {
                position: static;
                display: inline-block;
            }
        }

        .dplayer-bar-time {
            display: none;
        }

        &.dplayer-hide-controller {
            .dplayer-mobile-play {
                display: none;
            }
        }

        .dplayer-mobile-play {
            display: block;
        }
    }
}

// To hide scroll bar, apply this class to <body>
.dplayer-web-fullscreen-fix {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
}
`,`@import '../../node_modules/balloon-css/balloon.css';

[data-balloon]:before {
    display: none;
}

[data-balloon]:after {
    padding: 0.3em 0.7em;
    background: rgba(17, 17, 17, 0.7);
}

[data-balloon][data-balloon-pos="up"]:after {
    margin-bottom: 0;
}`,`.dplayer-bezel {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 22px;
    color: #fff;
    pointer-events: none;
    .dplayer-bezel-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -26px 0 0 -26px;
        height: 52px;
        width: 52px;
        padding: 12px;
        box-sizing: border-box;
        background: rgba(0, 0, 0, .5);
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        &.dplayer-bezel-transition {
            animation: bezel-hide .5s linear;
        }
        @keyframes bezel-hide {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(2);
            }
        }
    }
    .dplayer-danloading {
        position: absolute;
        top: 50%;
        margin-top: -7px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        line-height: 14px;
        animation: my-face 5s infinite ease-in-out;
    }
    .diplayer-loading-icon {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -18px 0 0 -18px;
        height: 36px;
        width: 36px;
        pointer-events: none;
        .diplayer-loading-hide {
            display: none;
        }
        .diplayer-loading-dot {
            animation: diplayer-loading-dot-fade .8s ease infinite;
            opacity: 0;
            transform-origin: 4px 4px;
            each(range(7), {
                &.diplayer-loading-dot-@{value} {
                    animation-delay: (@value * 0.1s);
                }
            });
        }
        @keyframes diplayer-loading-dot-fade {
            0% {
                opacity: .7;
                transform: scale(1.2, 1.2)
            }
            50% {
                opacity: .25;
                transform: scale(.9, .9)
            }
            to {
                opacity: .25;
                transform: scale(.85, .85)
            }
        }
    }
}`,`.dplayer-notice-list{
    position: absolute;
    bottom: 60px;
    left: 20px;

    .dplayer-notice {
        border-radius: 2px;
        background: rgba(28, 28, 28, 0.9);
        transition: all .3s ease-in-out;
        overflow: hidden;
        color: #fff;
        display: table;
        pointer-events: none;
        animation: showNotice .3s ease 1 forwards;
    }

    .remove-notice{
        animation: removeNotice .3s ease 1 forwards;
    }
}

@keyframes showNotice {
    from {
        padding: 0;
        font-size: 0;
        margin-top: 0;
    }
    to {
        padding: 7px 20px;
        font-size: 14px;
        margin-top: 5px;
    }
}

@keyframes removeNotice {
    0%{
        padding: 7px 20px;
        font-size: 14px;
        margin-top: 5px;
    }
    20%{
        font-size: 12px;
    }
    21%{
        font-size: 0;
        padding: 7px 10px;
    }
    100%{
        padding: 0;
        margin-top: 0;
        font-size: 0;
    }
}
`,`.dplayer-controller-mask {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x bottom;
    height: 98px;
    width: 100%;
    position: absolute;
    bottom: 0;
    transition: all 0.3s ease;
}

.dplayer-controller {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 41px;
    padding: 0 20px;
    user-select: none;
    transition: all 0.3s ease;
    &.dplayer-controller-comment {
        .dplayer-icons {
            display: none;
        }
        .dplayer-icons.dplayer-comment-box {
            display: block;
        }
    }
    .dplayer-bar-wrap {
        padding: 5px 0;
        cursor: pointer;
        position: absolute;
        bottom: 33px;
        width: calc(100% - 40px);
        height: 3px;
        &:hover {
            .dplayer-bar .dplayer-played .dplayer-thumb {
                transform: scale(1);
            }
            .dplayer-highlight {
                display: block;
                width: 8px;
                transform: translateX(-4px);
                top: 4px;
                height: 40%;
            }
        }
        .dplayer-highlight {
            z-index: 12;
            position: absolute;
            top: 5px;
            width: 6px;
            height: 20%;
            border-radius: 6px;
            background-color: #fff;
            text-align: center;
            transform: translateX(-3px);
            transition: all .2s ease-in-out;
            &:hover {
                .dplayer-highlight-text {
                    display: block;
                }
                &~.dplayer-bar-preview {
                    opacity: 0;
                }
                &~.dplayer-bar-time {
                    opacity: 0;
                }
            }
            .dplayer-highlight-text {
                display: none;
                position: absolute;
                left: 50%;
                top: -24px;
                padding: 5px 8px;
                background-color: rgba(0, 0, 0, .62);
                color: #fff;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                transform: translateX(-50%);
            }
        }
        .dplayer-bar-preview {
            position: absolute;
            background: #fff;
            pointer-events: none;
            display: none;
            background-size: 16000px 100%;
        }
        .dplayer-bar-preview-canvas {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        }
        .dplayer-bar-time {
            &.hidden {
                opacity: 0;
            }
            position: absolute;
            left: 0px;
            top: -20px;
            border-radius: 4px;
            padding: 5px 7px;
            background-color: rgba(0, 0, 0, 0.62);
            color: #fff;
            font-size: 12px;
            text-align: center;
            opacity: 1;
            transition: opacity .1s ease-in-out;
            word-wrap: normal;
            word-break: normal;
            z-index: 2;
            pointer-events: none;
        }
        .dplayer-bar {
            position: relative;
            height: 3px;
            width: 100%;
            background: rgba(255, 255, 255, .2);
            cursor: pointer;
            .dplayer-loaded {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                background: rgba(255, 255, 255, .4);
                height: 3px;
                transition: all 0.5s ease;
                will-change: width;
            }
            .dplayer-played {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                height: 3px;
                will-change: width;
                .dplayer-thumb {
                    position: absolute;
                    top: 0;
                    right: 5px;
                    margin-top: -4px;
                    margin-right: -10px;
                    height: 11px;
                    width: 11px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                    transform: scale(0);
                }
            }
        }
    }
    .dplayer-icons {
        height: 38px;
        position: absolute;
        bottom: 0;
        &.dplayer-comment-box {
            display: none;
            position: absolute;
            transition: all .3s ease-in-out;
            z-index: 2;
            height: 38px;
            bottom: 0;
            left: 20px;
            right: 20px;
            color: #fff;
            .dplayer-icon {
                padding: 7px;
            }
            .dplayer-comment-setting-icon {
                position: absolute;
                left: 0;
                top: 0;
            }
            .dplayer-send-icon {
                position: absolute;
                right: 0;
                top: 0;
            }
            .dplayer-comment-setting-box {
                position: absolute;
                background: rgba(28, 28, 28, 0.9);
                bottom: 41px;
                left: 0;
                box-shadow: 0 0 25px rgba(0, 0, 0, .3);
                border-radius: 4px;
                padding: 10px 10px 16px;
                font-size: 14px;
                width: 204px;
                transition: all .3s ease-in-out;
                transform: scale(0);
                &.dplayer-comment-setting-open {
                    transform: scale(1);
                }
                input[type=radio] {
                    display: none;
                }
                label {
                    cursor: pointer;
                }
                .dplayer-comment-setting-title {
                    font-size: 13px;
                    color: #fff;
                    line-height: 30px;
                }
                .dplayer-comment-setting-type {
                    font-size: 0;
                    .dplayer-comment-setting-title {
                        margin-bottom: 6px;
                    }
                    label {
                        &:nth-child(2) {
                            span {
                                border-radius: 4px 0 0 4px;
                            }
                        }
                        &:nth-child(4) {
                            span {
                                border-radius: 0 4px 4px 0;
                            }
                        }
                    }
                    span {
                        width: 33%;
                        padding: 4px 6px;
                        line-height: 16px;
                        display: inline-block;
                        font-size: 12px;
                        color: #fff;
                        border: 1px solid #fff;
                        margin-right: -1px;
                        box-sizing: border-box;
                        text-align: center;
                        cursor: pointer;
                    }
                    input:checked+span {
                        background: #E4E4E6;
                        color: #1c1c1c;
                    }
                }
                .dplayer-comment-setting-color {
                    font-size: 0;
                    label {
                        font-size: 0;
                        padding: 6px;
                        display: inline-block;
                    }
                    span {
                        width: 22px;
                        height: 22px;
                        display: inline-block;
                        border-radius: 50%;
                        box-sizing: border-box;
                        cursor: pointer;
                        &:hover {
                            animation: my-face 5s infinite ease-in-out;
                        }
                    }
                }
            }
            .dplayer-comment-input {
                outline: none;
                border: none;
                padding: 8px 31px;
                font-size: 14px;
                line-height: 18px;
                text-align: center;
                border-radius: 4px;
                background: none;
                margin: 0;
                height: 100%;
                box-sizing: border-box;
                width: 100%;
                color: #fff;
                &::placeholder {
                    color: #fff;
                    opacity: 0.8;
                }
                &::-ms-clear {
                    display: none;
                }
            }
        }
        &.dplayer-icons-left {
            .dplayer-icon {
                padding: 7px;
            }
        }
        &.dplayer-icons-right {
            right: 20px;
            .dplayer-icon {
                padding: 8px;
            }
        }
        .dplayer-time,
        .dplayer-live-badge {
            line-height: 38px;
            color: #eee;
            text-shadow: 0 0 2px rgba(0, 0, 0, .5);
            vertical-align: middle;
            font-size: 13px;
            cursor: default;
        }
        .dplayer-live-dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            vertical-align: 4%;
            margin-right: 5px;
            content: '';
            border-radius: 6px;
        }
        .dplayer-icon {
            width: 40px;
            height: 100%;
            border: none;
            background-color: transparent;
            outline: none;
            cursor: pointer;
            vertical-align: middle;
            box-sizing: border-box;
            display: inline-block;
            .dplayer-icon-content {
                transition: all .2s ease-in-out;
                opacity: .8;
            }
            &:hover {
                .dplayer-icon-content {
                    opacity: 1;
                }
            }
            &.dplayer-quality-icon {
                color: #fff;
                width: auto;
                line-height: 22px;
                font-size: 14px;
            }
            &.dplayer-comment-icon {
                padding: 10px 9px 9px;
            }
            &.dplayer-setting-icon {
                padding-top: 8.5px;
            }
            &.dplayer-volume-icon {
                width: 43px;
            }
        }
        .dplayer-volume {
            position: relative;
            display: inline-block;
            cursor: pointer;
            height: 100%;
            &:hover {
                .dplayer-volume-bar-wrap .dplayer-volume-bar {
                    width: 45px;
                }
                .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
                    transform: scale(1);
                }
            }
            &.dplayer-volume-active {
                .dplayer-volume-bar-wrap .dplayer-volume-bar {
                    width: 45px;
                }
                .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
                    transform: scale(1);
                }
            }
            .dplayer-volume-bar-wrap {
                display: inline-block;
                margin: 0 10px 0 -5px;
                vertical-align: middle;
                height: 100%;
                .dplayer-volume-bar {
                    position: relative;
                    top: 17px;
                    width: 0;
                    height: 3px;
                    background: #aaa;
                    transition: all 0.3s ease-in-out;
                    .dplayer-volume-bar-inner {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        height: 100%;
                        transition: all 0.1s ease;
                        will-change: width;
                        .dplayer-thumb {
                            position: absolute;
                            top: 0;
                            right: 5px;
                            margin-top: -4px;
                            margin-right: -10px;
                            height: 11px;
                            width: 11px;
                            border-radius: 50%;
                            cursor: pointer;
                            transition: all .3s ease-in-out;
                            transform: scale(0);
                        }
                    }
                }
            }
        }
        .dplayer-subtitle-btn {
            display: inline-block;
            height: 100%;
        }
        .dplayer-subtitles {
            display: inline-block;
            height: 100%;
            .dplayer-subtitles-box {
                position: absolute;
                right: 0;
                bottom: 50px;
                transform: scale(0);
                width: fit-content;
                max-width: 240px;
                min-width: 120px;
                border-radius: 2px;
                background: rgba(28, 28, 28, 0.9);
                padding: 7px 0;
                transition: all .3s ease-in-out;
                overflow: auto;
                z-index: 2;
                &.dplayer-subtitles-panel {
                    display: block;
                }
                &.dplayer-subtitles-box-open {
                    transform: scale(1);
                }
            }
            .dplayer-subtitles-item {
                height: 30px;
                padding: 5px 10px;
                box-sizing: border-box;
                cursor: pointer;
                position: relative;
                &:hover {
                    background-color: rgba(255, 255, 255, .1);
                }
            }
        }
        .dplayer-setting {
            display: inline-block;
            height: 100%;
            .dplayer-setting-box {
                position: absolute;
                right: 0;
                bottom: 50px;
                transform: scale(0);
                width: 150px;
                border-radius: 2px;
                background: rgba(28, 28, 28, 0.9);
                padding: 7px 0;
                transition: all .3s ease-in-out;
                overflow: hidden;
                z-index: 2;
                &>div {
                    display: none;
                    &.dplayer-setting-origin-panel {
                        display: block;
                    }
                }
                &.dplayer-setting-box-open {
                    transform: scale(1);
                }
                &.dplayer-setting-box-narrow {
                    width: 70px;
                    text-align: center;
                }
                &.dplayer-setting-box-speed {
                    .dplayer-setting-origin-panel {
                        display: none;
                    }
                    .dplayer-setting-speed-panel {
                        display: block;
                    }
                }
            }
            .dplayer-setting-item,
            .dplayer-setting-speed-item {
                height: 30px;
                padding: 5px 10px;
                box-sizing: border-box;
                cursor: pointer;
                position: relative;
                &:hover {
                    background-color: rgba(255, 255, 255, .1);
                }
            }
            .dplayer-setting-danmaku {
                padding: 5px 0;
                .dplayer-label {
                    padding: 0 10px;
                    display: inline;
                }
                &:hover {
                    .dplayer-label {
                        display: none;
                    }
                    .dplayer-danmaku-bar-wrap {
                        display: inline-block;
                    }
                }
                &.dplayer-setting-danmaku-active {
                    .dplayer-label {
                        display: none;
                    }
                    .dplayer-danmaku-bar-wrap {
                        display: inline-block;
                    }
                }
                .dplayer-danmaku-bar-wrap {
                    padding: 0 10px;
                    box-sizing: border-box;
                    display: none;
                    vertical-align: middle;
                    height: 100%;
                    width: 100%;
                    .dplayer-danmaku-bar {
                        position: relative;
                        top: 8.5px;
                        width: 100%;
                        height: 3px;
                        background: #fff;
                        transition: all 0.3s ease-in-out;
                        .dplayer-danmaku-bar-inner {
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            height: 100%;
                            transition: all 0.1s ease;
                            background: #aaa;
                            will-change: width;
                            .dplayer-thumb {
                                position: absolute;
                                top: 0;
                                right: 5px;
                                margin-top: -4px;
                                margin-right: -10px;
                                height: 11px;
                                width: 11px;
                                border-radius: 50%;
                                cursor: pointer;
                                transition: all .3s ease-in-out;
                                background: #aaa;
                            }
                        }
                    }
                }
            }
        }
        .dplayer-full {
            display: inline-block;
            height: 100%;
            position: relative;
            &:hover {
                .dplayer-full-in-icon {
                    display: block;
                }
            }
            .dplayer-full-in-icon {
                position: absolute;
                top: -30px;
                z-index: 1;
                display: none;
            }
        }
        .dplayer-quality {
            position: relative;
            display: inline-block;
            height: 100%;
            z-index: 2;
            &:hover {
                .dplayer-quality-list {
                    display: block;
                }
                .dplayer-quality-mask {
                    display: block;
                }
            }
            .dplayer-quality-mask {
                display: none;
                position: absolute;
                bottom: 38px;
                left: -18px;
                width: 80px;
                padding-bottom: 12px;
            }
            .dplayer-quality-list {
                display: none;
                font-size: 12px;
                width: 80px;
                border-radius: 2px;
                background: rgba(28, 28, 28, 0.9);
                padding: 5px 0;
                transition: all .3s ease-in-out;
                overflow: hidden;
                color: #fff;
                text-align: center;
            }
            .dplayer-quality-item {
                height: 25px;
                box-sizing: border-box;
                cursor: pointer;
                line-height: 25px;
                &:hover {
                    background-color: rgba(255, 255, 255, .1);
                }
            }
        }
        .dplayer-comment {
            display: inline-block;
            height: 100%;
        }
        .dplayer-label {
            color: #eee;
            font-size: 13px;
            display: inline-block;
            vertical-align: middle;
            white-space: nowrap;
        }
        .dplayer-toggle {
            width: 32px;
            height: 20px;
            text-align: center;
            font-size: 0;
            vertical-align: middle;
            position: absolute;
            top: 5px;
            right: 10px;
            input {
                max-height: 0;
                max-width: 0;
                display: none;
            }
            input+label {
                display: inline-block;
                position: relative;
                box-shadow: rgb(223, 223, 223) 0 0 0 0 inset;
                border: 1px solid rgb(223, 223, 223);
                height: 20px;
                width: 32px;
                border-radius: 10px;
                box-sizing: border-box;
                cursor: pointer;
                transition: .2s ease-in-out;
            }
            input+label:before {
                content: "";
                position: absolute;
                display: block;
                height: 18px;
                width: 18px;
                top: 0;
                left: 0;
                border-radius: 15px;
                transition: .2s ease-in-out;
            }
            input+label:after {
                content: "";
                position: absolute;
                display: block;
                left: 0;
                top: 0;
                border-radius: 15px;
                background: #fff;
                transition: .2s ease-in-out;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
                height: 18px;
                width: 18px;
            }
            input:checked+label {
                border-color: rgba(255, 255, 255, 0.5);
            }
            input:checked+label:before {
                width: 30px;
                background: rgba(255, 255, 255, 0.5);
            }
            input:checked+label:after {
                left: 12px;
            }
        }
    }
}

.dplayer-mobile-play {
    display: none;
    width: 50px;
    height: 50px;
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    opacity: 0.8;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}`,`.dplayer-danmaku {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 22px;
    color: #fff;
    .dplayer-danmaku-item {
        display: inline-block;
        pointer-events: none;
        user-select: none;
        cursor: default;
        white-space: nowrap;
        text-shadow: .5px .5px .5px rgba(0, 0, 0, .5);
        &--demo {
            position: absolute;
            visibility: hidden;
        }
    }
    .dplayer-danmaku-right {
        position: absolute;
        right: 0;
        transform: translateX(100%);
        &.dplayer-danmaku-move {
            will-change: transform;
            animation-name: 'danmaku';
            animation-timing-function: linear;
            animation-play-state: paused;
        }
    }
    @keyframes danmaku {
        from {
            transform: translateX(100%);
        }
    }
    .dplayer-danmaku-top,
    .dplayer-danmaku-bottom {
        position: absolute;
        width: 100%;
        text-align: center;
        visibility: hidden;
        &.dplayer-danmaku-move {
            will-change: visibility;
            animation-name: 'danmaku-center';
            animation-timing-function: linear;
            animation-play-state: paused;
        }
    }
    @keyframes danmaku-center {
        from {
            visibility: visible;
        }
        to {
            visibility: visible;
        }
    }
}`,`.dplayer-logo {
    pointer-events: none;
    position: absolute;
    left: 20px;
    top: 20px;
    max-width: 50px;
    max-height: 50px;
    img {
        max-width: 100%;
        max-height: 100%;
        background: none;
    }
}`,`.dplayer-menu {
    position: absolute;
    width: 170px;
    border-radius: 2px;
    background: rgba(28, 28, 28, 0.85);
    padding: 5px 0;
    overflow: hidden;
    z-index: 3;
    display: none;
    &.dplayer-menu-show {
        display: block;
    }
    .dplayer-menu-item {
        height: 30px;
        box-sizing: border-box;
        cursor: pointer;
        &:hover {
            background-color: rgba(255, 255, 255, .1);
        }
        a {
            display: inline-block;
            padding: 0 10px;
            line-height: 30px;
            color: #eee;
            font-size: 13px;
            display: inline-block;
            vertical-align: middle;
            width: 100%;
            box-sizing: border-box;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            &:hover {
                text-decoration: none;
            }
        }
    }
}`,`.dplayer-subtitle {
    position: absolute;
    bottom: 40px;
    width: 90%;
    left: 5%;
    text-align: center;
    color: #fff;
    text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
    font-size: 20px;
    &.dplayer-subtitle-hide {
        display: none;
    }
}`,`.dplayer-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: none;
    &.dplayer-mask-show {
        display: block;
    }
}

.dplayer-video-wrap {
    position: relative;
    background: #000;
    font-size: 0;
    width: 100%;
    height: 100%;
    .dplayer-video {
        width: 100%;
        height: 100%;
        display: none;
    }
    .dplayer-video-current {
        display: block;
    }
    .dplayer-video-prepare {
        display: none;
    }
}`,`.dplayer-info-panel {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 400px;
    background: rgba(28, 28, 28, 0.8);
    padding: 10px;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;

    &-hide {
        display: none;
    }

    .dplayer-info-panel-close {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .dplayer-info-panel-item {
        & > span {
            display: inline-block;
            vertical-align: middle;
            line-height: 15px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }

    .dplayer-info-panel-item-title {
        width: 100px;
        text-align: right;
        margin-right: 10px;
    }
    
    .dplayer-info-panel-item-data {
        width: 260px;
    }
}`],sourceRoot:""}]);const F=z},856:A=>{var m=[];function g(b){for(var u=-1,k=0;k<m.length;k++)if(m[k].identifier===b){u=k;break}return u}function E(b,u){for(var k={},x=[],w=0;w<b.length;w++){var R=b[w],z=u.base?R[0]+u.base:R[0],S=k[z]||0,F="".concat(z," ").concat(S);k[z]=S+1;var N=g(F),ee={css:R[1],media:R[2],sourceMap:R[3],supports:R[4],layer:R[5]};if(N!==-1)m[N].references++,m[N].updater(ee);else{var pe=v(ee,u);u.byIndex=w,m.splice(w,0,{identifier:F,updater:pe,references:1})}x.push(F)}return x}function v(b,u){var k=u.domAPI(u);return k.update(b),function(x){if(x){if(x.css===b.css&&x.media===b.media&&x.sourceMap===b.sourceMap&&x.supports===b.supports&&x.layer===b.layer)return;k.update(b=x)}else k.remove()}}A.exports=function(b,u){var k=E(b=b||[],u=u||{});return function(x){x=x||[];for(var w=0;w<k.length;w++){var R=g(k[w]);m[R].references--}for(var z=E(x,u),S=0;S<k.length;S++){var F=g(k[S]);m[F].references===0&&(m[F].updater(),m.splice(F,1))}k=z}}},370:A=>{var m={};A.exports=function(g,E){var v=function(b){if(m[b]===void 0){var u=document.querySelector(b);if(window.HTMLIFrameElement&&u instanceof window.HTMLIFrameElement)try{u=u.contentDocument.head}catch{u=null}m[b]=u}return m[b]}(g);if(!v)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");v.appendChild(E)}},278:A=>{A.exports=function(m){var g=document.createElement("style");return m.setAttributes(g,m.attributes),m.insert(g,m.options),g}},458:(A,m,g)=>{A.exports=function(E){var v=g.nc;v&&E.setAttribute("nonce",v)}},470:A=>{A.exports=function(m){var g=m.insertStyleElement(m);return{update:function(E){(function(v,b,u){var k="";u.supports&&(k+="@supports (".concat(u.supports,") {")),u.media&&(k+="@media ".concat(u.media," {"));var x=u.layer!==void 0;x&&(k+="@layer".concat(u.layer.length>0?" ".concat(u.layer):""," {")),k+=u.css,x&&(k+="}"),u.media&&(k+="}"),u.supports&&(k+="}");var w=u.sourceMap;w&&typeof btoa<"u"&&(k+=`
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(w))))," */")),b.styleTagTransform(k,v,b.options)})(g,m,E)},remove:function(){(function(E){if(E.parentNode===null)return!1;E.parentNode.removeChild(E)})(g)}}}},488:A=>{A.exports=function(m,g){if(g.styleSheet)g.styleSheet.cssText=m;else{for(;g.firstChild;)g.removeChild(g.firstChild);g.appendChild(document.createTextNode(m))}}},251:A=>{A.exports='<svg viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg"><path d="M288 90v96c0 20-16 36-36 36h-10c-16 0-16-24 0-24h10c7 0 12-5 12-12V90c0-7-5-12-12-12H36c-7 0-12 5-12 12v96c0 7 5 12 12 12h10c16 0 16 24 0 24H36c-20 0-36-16-36-36V90c0-20 16-36 36-36h216c20 0 36 16 36 36zm-120 62l48 68c14 20 1 38-20 38H92c-21 0-34-18-20-38l48-68c13-18 35-18 48 0z"></path></svg>'},113:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M16 23c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zM16 13c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zM27 28h-22c-1.654 0-3-1.346-3-3v-16c0-1.654 1.346-3 3-3h3c0.552 0 1 0.448 1 1s-0.448 1-1 1h-3c-0.551 0-1 0.449-1 1v16c0 0.552 0.449 1 1 1h22c0.552 0 1-0.448 1-1v-16c0-0.551-0.448-1-1-1h-11c-0.552 0-1-0.448-1-1s0.448-1 1-1h11c1.654 0 3 1.346 3 3v16c0 1.654-1.346 3-3 3zM24 10.5c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5zM15 4c0 0.552-0.448 1-1 1h-4c-0.552 0-1-0.448-1-1v0c0-0.552 0.448-1 1-1h4c0.552 0 1 0.448 1 1v0z"></path></svg>'},193:A=>{A.exports='<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="chromecast" class="svg-inline--fa fa-chromecast fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M447.8,64H64c-23.6,0-42.7,19.1-42.7,42.7v63.9H64v-63.9h383.8v298.6H298.6V448H448c23.6,0,42.7-19.1,42.7-42.7V106.7 C490.7,83.1,471.4,64,447.8,64z M21.3,383.6L21.3,383.6l0,63.9h63.9C85.2,412.2,56.6,383.6,21.3,383.6L21.3,383.6z M21.3,298.6V341 c58.9,0,106.6,48.1,106.6,107h42.7C170.7,365.6,103.7,298.7,21.3,298.6z M213.4,448h42.7c-0.5-129.5-105.3-234.3-234.8-234.6l0,42.4 C127.3,255.6,213.3,342,213.4,448z"></path></svg>'},338:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.090 0.131h-22.731c-2.354 0-4.262 1.839-4.262 4.109v16.401c0 2.269 1.908 4.109 4.262 4.109h4.262v-2.706h8.469l-8.853 8.135 1.579 1.451 7.487-6.88h9.787c2.353 0 4.262-1.84 4.262-4.109v-16.401c0-2.27-1.909-4.109-4.262-4.109v0zM28.511 19.304c0 1.512-1.272 2.738-2.841 2.738h-8.425l-0.076-0.070-0.076 0.070h-11.311c-1.569 0-2.841-1.226-2.841-2.738v-13.696c0-1.513 1.272-2.739 2.841-2.739h19.889c1.569 0 2.841-0.142 2.841 1.37v15.064z"></path></svg>'},807:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.128 0.38h-22.553c-2.336 0-4.229 1.825-4.229 4.076v16.273c0 2.251 1.893 4.076 4.229 4.076h4.229v-2.685h8.403l-8.784 8.072 1.566 1.44 7.429-6.827h9.71c2.335 0 4.229-1.825 4.229-4.076v-16.273c0-2.252-1.894-4.076-4.229-4.076zM28.538 19.403c0 1.5-1.262 2.717-2.819 2.717h-8.36l-0.076-0.070-0.076 0.070h-11.223c-1.557 0-2.819-1.217-2.819-2.717v-13.589c0-1.501 1.262-2.718 2.819-2.718h19.734c1.557 0 2.819-0.141 2.819 1.359v14.947zM9.206 10.557c-1.222 0-2.215 0.911-2.215 2.036s0.992 2.035 2.215 2.035c1.224 0 2.216-0.911 2.216-2.035s-0.992-2.036-2.216-2.036zM22.496 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.224 0 2.215-0.911 2.215-2.035s-0.991-2.036-2.215-2.036zM15.852 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.222 0 2.215-0.911 2.215-2.035s-0.992-2.036-2.215-2.036z"></path></svg>'},300:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M24.965 24.38h-18.132c-1.366 0-2.478-1.113-2.478-2.478v-11.806c0-1.364 1.111-2.478 2.478-2.478h18.132c1.366 0 2.478 1.113 2.478 2.478v11.806c0 1.364-1.11 2.478-2.478 2.478zM6.833 10.097v11.806h18.134l-0.002-11.806h-18.132zM2.478 28.928h5.952c0.684 0 1.238-0.554 1.238-1.239 0-0.684-0.554-1.238-1.238-1.238h-5.952v-5.802c0-0.684-0.554-1.239-1.238-1.239s-1.239 0.556-1.239 1.239v5.802c0 1.365 1.111 2.478 2.478 2.478zM30.761 19.412c-0.684 0-1.238 0.554-1.238 1.238v5.801h-5.951c-0.686 0-1.239 0.554-1.239 1.238 0 0.686 0.554 1.239 1.239 1.239h5.951c1.366 0 2.478-1.111 2.478-2.478v-5.801c0-0.683-0.554-1.238-1.239-1.238zM0 5.55v5.802c0 0.683 0.554 1.238 1.238 1.238s1.238-0.555 1.238-1.238v-5.802h5.952c0.684 0 1.238-0.554 1.238-1.238s-0.554-1.238-1.238-1.238h-5.951c-1.366-0.001-2.478 1.111-2.478 2.476zM32 11.35v-5.801c0-1.365-1.11-2.478-2.478-2.478h-5.951c-0.686 0-1.239 0.554-1.239 1.238s0.554 1.238 1.239 1.238h5.951v5.801c0 0.683 0.554 1.237 1.238 1.237 0.686 0.002 1.239-0.553 1.239-1.236z"></path></svg>'},574:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M6.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v4h4c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333zM30.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h4v-4c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM30.667 12c-0.8 0-1.333-0.533-1.333-1.333v-4h-4c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM1.333 12c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333h-4v4c0 0.8-0.533 1.333-1.333 1.333z"></path></svg>'},182:A=>{A.exports='<svg version="1.1" viewBox="0 0 22 22"><svg x="7" y="1"><circle class="diplayer-loading-dot diplayer-loading-dot-0" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-1" cx="4" cy="4" r="2"></circle></svg><svg x="13" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-2" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-3" cx="4" cy="4" r="2"></circle></svg><svg x="7" y="13"><circle class="diplayer-loading-dot diplayer-loading-dot-4" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-5" cx="4" cy="4" r="2"></circle></svg><svg x="1" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-6" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-7" cx="4" cy="4" r="2"></circle></svg></svg>'},965:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M19.357 2.88c1.749 0 3.366 0.316 4.851 0.946 1.485 0.632 2.768 1.474 3.845 2.533s1.922 2.279 2.532 3.661c0.611 1.383 0.915 2.829 0.915 4.334 0 1.425-0.304 2.847-0.915 4.271-0.611 1.425-1.587 2.767-2.928 4.028-0.855 0.813-1.811 1.607-2.869 2.38s-2.136 1.465-3.233 2.075c-1.099 0.61-2.198 1.098-3.296 1.465-1.098 0.366-2.115 0.549-3.051 0.549-1.343 0-2.441-0.438-3.296-1.311-0.854-0.876-1.281-2.41-1.281-4.608 0-0.366 0.020-0.773 0.060-1.221s0.062-0.895 0.062-1.343c0-0.773-0.183-1.353-0.55-1.738-0.366-0.387-0.793-0.58-1.281-0.58-0.652 0-1.21 0.295-1.678 0.886s-0.926 1.23-1.373 1.921c-0.447 0.693-0.905 1.334-1.372 1.923s-1.028 0.886-1.679 0.886c-0.529 0-1.048-0.427-1.556-1.282s-0.763-2.259-0.763-4.212c0-2.197 0.529-4.241 1.587-6.133s2.462-3.529 4.21-4.912c1.75-1.383 3.762-2.471 6.041-3.264 2.277-0.796 4.617-1.212 7.018-1.253zM7.334 15.817c0.569 0 1.047-0.204 1.434-0.611s0.579-0.875 0.579-1.404c0-0.569-0.193-1.047-0.579-1.434s-0.864-0.579-1.434-0.579c-0.529 0-0.987 0.193-1.373 0.579s-0.58 0.864-0.58 1.434c0 0.53 0.194 0.998 0.58 1.404 0.388 0.407 0.845 0.611 1.373 0.611zM12.216 11.79c0.691 0 1.292-0.254 1.8-0.763s0.762-1.107 0.762-1.8c0-0.732-0.255-1.343-0.762-1.831-0.509-0.489-1.109-0.732-1.8-0.732-0.732 0-1.342 0.244-1.831 0.732-0.488 0.488-0.732 1.098-0.732 1.831 0 0.693 0.244 1.292 0.732 1.8s1.099 0.763 1.831 0.763zM16.366 25.947c0.692 0 1.282-0.214 1.77-0.64s0.732-0.987 0.732-1.678-0.244-1.261-0.732-1.709c-0.489-0.448-1.078-0.671-1.77-0.671-0.65 0-1.21 0.223-1.678 0.671s-0.702 1.018-0.702 1.709c0 0.692 0.234 1.25 0.702 1.678s1.027 0.64 1.678 0.64zM19.113 9.592c0.651 0 1.129-0.203 1.433-0.611 0.305-0.406 0.459-0.874 0.459-1.404 0-0.488-0.154-0.947-0.459-1.373-0.304-0.427-0.782-0.641-1.433-0.641-0.529 0-1.008 0.193-1.434 0.58s-0.64 0.865-0.64 1.434c0 0.571 0.213 1.049 0.64 1.434 0.427 0.389 0.905 0.581 1.434 0.581zM24.848 12.826c0.57 0 1.067-0.213 1.495-0.64 0.427-0.427 0.64-0.947 0.64-1.556 0-0.57-0.214-1.068-0.64-1.495-0.428-0.427-0.927-0.64-1.495-0.64-0.611 0-1.129 0.213-1.555 0.64-0.428 0.427-0.642 0.926-0.642 1.495 0 0.611 0.213 1.129 0.642 1.556s0.947 0.64 1.555 0.64z"></path></svg>'},74:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 17 32"><path d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path></svg>'},730:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 32"><path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path></svg>'},428:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path></svg>'},254:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M13.725 30l3.9-5.325-3.9-1.125v6.45zM0 17.5l11.050 3.35 13.6-11.55-10.55 12.425 11.8 3.65 6.1-23.375-32 15.5z"></path></svg>'},934:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 28"><path d="M28.633 17.104c0.035 0.21 0.026 0.463-0.026 0.76s-0.14 0.598-0.262 0.904c-0.122 0.306-0.271 0.581-0.445 0.825s-0.367 0.419-0.576 0.524c-0.209 0.105-0.393 0.157-0.55 0.157s-0.332-0.035-0.524-0.105c-0.175-0.052-0.393-0.1-0.655-0.144s-0.528-0.052-0.799-0.026c-0.271 0.026-0.541 0.083-0.812 0.17s-0.502 0.236-0.694 0.445c-0.419 0.437-0.664 0.934-0.734 1.493s0.009 1.092 0.236 1.598c0.175 0.349 0.148 0.699-0.079 1.048-0.105 0.14-0.271 0.284-0.498 0.432s-0.476 0.284-0.747 0.406-0.555 0.218-0.851 0.288c-0.297 0.070-0.559 0.105-0.786 0.105-0.157 0-0.306-0.061-0.445-0.183s-0.236-0.253-0.288-0.393h-0.026c-0.192-0.541-0.52-1.009-0.982-1.402s-1-0.589-1.611-0.589c-0.594 0-1.131 0.197-1.611 0.589s-0.816 0.851-1.009 1.375c-0.087 0.21-0.218 0.362-0.393 0.458s-0.367 0.144-0.576 0.144c-0.244 0-0.52-0.044-0.825-0.131s-0.611-0.197-0.917-0.327c-0.306-0.131-0.581-0.284-0.825-0.458s-0.428-0.349-0.55-0.524c-0.087-0.122-0.135-0.266-0.144-0.432s0.057-0.397 0.197-0.694c0.192-0.402 0.266-0.86 0.223-1.375s-0.266-0.991-0.668-1.428c-0.244-0.262-0.541-0.432-0.891-0.511s-0.681-0.109-0.995-0.092c-0.367 0.017-0.742 0.087-1.127 0.21-0.244 0.070-0.489 0.052-0.734-0.052-0.192-0.070-0.371-0.231-0.537-0.485s-0.314-0.533-0.445-0.838c-0.131-0.306-0.231-0.62-0.301-0.943s-0.087-0.59-0.052-0.799c0.052-0.384 0.227-0.629 0.524-0.734 0.524-0.21 0.995-0.555 1.415-1.035s0.629-1.017 0.629-1.611c0-0.611-0.21-1.144-0.629-1.598s-0.891-0.786-1.415-0.996c-0.157-0.052-0.288-0.179-0.393-0.38s-0.157-0.406-0.157-0.616c0-0.227 0.035-0.48 0.105-0.76s0.162-0.55 0.275-0.812 0.244-0.502 0.393-0.72c0.148-0.218 0.31-0.38 0.485-0.485 0.14-0.087 0.275-0.122 0.406-0.105s0.275 0.052 0.432 0.105c0.524 0.21 1.070 0.275 1.637 0.197s1.070-0.327 1.506-0.747c0.21-0.209 0.362-0.467 0.458-0.773s0.157-0.607 0.183-0.904c0.026-0.297 0.026-0.568 0-0.812s-0.048-0.419-0.065-0.524c-0.035-0.105-0.066-0.227-0.092-0.367s-0.013-0.262 0.039-0.367c0.105-0.244 0.293-0.458 0.563-0.642s0.563-0.336 0.878-0.458c0.314-0.122 0.62-0.214 0.917-0.275s0.533-0.092 0.707-0.092c0.227 0 0.406 0.074 0.537 0.223s0.223 0.301 0.275 0.458c0.192 0.471 0.507 0.886 0.943 1.244s0.952 0.537 1.546 0.537c0.611 0 1.153-0.17 1.624-0.511s0.803-0.773 0.996-1.297c0.070-0.14 0.179-0.284 0.327-0.432s0.301-0.223 0.458-0.223c0.244 0 0.511 0.035 0.799 0.105s0.572 0.166 0.851 0.288c0.279 0.122 0.537 0.279 0.773 0.472s0.423 0.402 0.563 0.629c0.087 0.14 0.113 0.293 0.079 0.458s-0.070 0.284-0.105 0.354c-0.227 0.506-0.297 1.039-0.21 1.598s0.341 1.048 0.76 1.467c0.419 0.419 0.934 0.651 1.546 0.694s1.179-0.057 1.703-0.301c0.14-0.087 0.31-0.122 0.511-0.105s0.371 0.096 0.511 0.236c0.262 0.244 0.493 0.616 0.694 1.113s0.336 1 0.406 1.506c0.035 0.297-0.013 0.528-0.144 0.694s-0.266 0.275-0.406 0.327c-0.542 0.192-1.004 0.528-1.388 1.009s-0.576 1.026-0.576 1.637c0 0.594 0.162 1.113 0.485 1.559s0.747 0.764 1.27 0.956c0.122 0.070 0.227 0.14 0.314 0.21 0.192 0.157 0.323 0.358 0.393 0.602v0zM16.451 19.462c0.786 0 1.528-0.149 2.227-0.445s1.305-0.707 1.821-1.231c0.515-0.524 0.921-1.131 1.218-1.821s0.445-1.428 0.445-2.214c0-0.786-0.148-1.524-0.445-2.214s-0.703-1.292-1.218-1.808c-0.515-0.515-1.122-0.921-1.821-1.218s-1.441-0.445-2.227-0.445c-0.786 0-1.524 0.148-2.214 0.445s-1.292 0.703-1.808 1.218c-0.515 0.515-0.921 1.118-1.218 1.808s-0.445 1.428-0.445 2.214c0 0.786 0.149 1.524 0.445 2.214s0.703 1.297 1.218 1.821c0.515 0.524 1.118 0.934 1.808 1.231s1.428 0.445 2.214 0.445v0z"></path></svg>'},410:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path></svg>'},644:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"></path></svg>'},324:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"></path></svg>'},437:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056z"></path></svg>'},897:(A,m,g)=>{var E=typeof self<"u"?self:typeof window<"u"?window:g.g!==void 0?g.g:{},v=Object.create(E),b=/["&'<>]/;function u(k){return typeof k!="string"&&(k=k==null?"":typeof k=="function"?u(k.call(k)):JSON.stringify(k)),k}v.$escape=function(k){return function(x){var w=""+x,R=b.exec(w);if(!R)return x;var z="",S=void 0,F=void 0,N=void 0;for(S=R.index,F=0;S<w.length;S++){switch(w.charCodeAt(S)){case 34:N="&#34;";break;case 38:N="&#38;";break;case 39:N="&#39;";break;case 60:N="&#60;";break;case 62:N="&#62;";break;default:continue}F!==S&&(z+=w.substring(F,S)),F=S+1,z+=N}return F!==S?z+w.substring(F,S):z}(u(k))},v.$each=function(k,x){if(Array.isArray(k))for(var w=0,R=k.length;w<R;w++)x(k[w],w);else for(var z in k)x(k[z],z)},A.exports=v},471:(A,m,g)=>{A.exports=g(897)},352:A=>{A.exports=function(m){var g=[];return g.toString=function(){return this.map(function(E){var v="",b=E[5]!==void 0;return E[4]&&(v+="@supports (".concat(E[4],") {")),E[2]&&(v+="@media ".concat(E[2]," {")),b&&(v+="@layer".concat(E[5].length>0?" ".concat(E[5]):""," {")),v+=m(E),b&&(v+="}"),E[2]&&(v+="}"),E[4]&&(v+="}"),v}).join("")},g.i=function(E,v,b,u,k){typeof E=="string"&&(E=[[null,E,void 0]]);var x={};if(b)for(var w=0;w<this.length;w++){var R=this[w][0];R!=null&&(x[R]=!0)}for(var z=0;z<E.length;z++){var S=[].concat(E[z]);b&&x[S[0]]||(k!==void 0&&(S[5]===void 0||(S[1]="@layer".concat(S[5].length>0?" ".concat(S[5]):""," {").concat(S[1],"}")),S[5]=k),v&&(S[2]&&(S[1]="@media ".concat(S[2]," {").concat(S[1],"}")),S[2]=v),u&&(S[4]?(S[1]="@supports (".concat(S[4],") {").concat(S[1],"}"),S[4]=u):S[4]="".concat(u)),g.push(S))}},g}},80:A=>{A.exports=function(m,g){return g||(g={}),m&&(m=String(m.__esModule?m.default:m),/^['"].*['"]$/.test(m)&&(m=m.slice(1,-1)),g.hash&&(m+=g.hash),/["'() \t\n]|(%20)/.test(m)||g.needQuotes?'"'.concat(m.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):m)}},415:A=>{A.exports=function(m){var g=m[1],E=m[3];if(!E)return g;if(typeof btoa=="function"){var v=btoa(unescape(encodeURIComponent(JSON.stringify(E)))),b="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(v),u="/*# ".concat(b," */");return[g].concat([u]).join(`
`)}return[g].join(`
`)}},937:A=>{function m(g){return m=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(E){return typeof E}:function(E){return E&&typeof Symbol=="function"&&E.constructor===Symbol&&E!==Symbol.prototype?"symbol":typeof E},m(g)}A.exports=(typeof self>"u"?"undefined":m(self))=="object"?self.FormData:window.FormData},831:A=>{A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg=="}},l={};function d(A){var m=l[A];if(m!==void 0)return m.exports;var g=l[A]={id:A,exports:{}};return o[A](g,g.exports,d),g.exports}d.m=o,d.n=A=>{var m=A&&A.__esModule?()=>A.default:()=>A;return d.d(m,{a:m}),m},d.d=(A,m)=>{for(var g in m)d.o(m,g)&&!d.o(A,g)&&Object.defineProperty(A,g,{enumerable:!0,get:m[g]})},d.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}(),d.o=(A,m)=>Object.prototype.hasOwnProperty.call(A,m),d.b=document.baseURI||self.location.href,d.nc=void 0;var y={};return(()=>{d.d(y,{default:()=>Ml});var A=d(856),m=d.n(A),g=d(470),E=d.n(g),v=d(370),b=d.n(v),u=d(458),k=d.n(u),x=d(278),w=d.n(x),R=d(488),z=d.n(R),S=d(685),F={};F.styleTagTransform=z(),F.setAttributes=k(),F.insert=b().bind(null,"head"),F.domAPI=E(),F.insertStyleElement=w(),m()(S.Z,F),S.Z&&S.Z.locals&&S.Z.locals;function N(r){return N=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},N(r)}function ee(r,a){this.name="AggregateError",this.errors=r,this.message=a||""}ee.prototype=Error.prototype;function pe(r){return pe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},pe(r)}var ke=setTimeout;function Je(r){return!!(r&&r.length!==void 0)}function $e(){}function ne(r){if(!(this instanceof ne))throw new TypeError("Promises must be constructed via new");if(typeof r!="function")throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],Be(r,this)}function Ze(r,a){for(;r._state===3;)r=r._value;r._state!==0?(r._handled=!0,ne._immediateFn(function(){var p=r._state===1?a.onFulfilled:a.onRejected;if(p!==null){var t;try{t=p(r._value)}catch(i){return void me(a.promise,i)}je(a.promise,t)}else(r._state===1?je:me)(a.promise,r._value)})):r._deferreds.push(a)}function je(r,a){try{if(a===r)throw new TypeError("A promise cannot be resolved with itself.");if(a&&(pe(a)==="object"||typeof a=="function")){var p=a.then;if(a instanceof ne)return r._state=3,r._value=a,void Xe(r);if(typeof p=="function")return void Be((t=p,i=a,function(){t.apply(i,arguments)}),r)}r._state=1,r._value=a,Xe(r)}catch(s){me(r,s)}var t,i}function me(r,a){r._state=2,r._value=a,Xe(r)}function Xe(r){r._state===2&&r._deferreds.length===0&&ne._immediateFn(function(){r._handled||ne._unhandledRejectionFn(r._value)});for(var a=0,p=r._deferreds.length;a<p;a++)Ze(r,r._deferreds[a]);r._deferreds=null}function Te(r,a,p){this.onFulfilled=typeof r=="function"?r:null,this.onRejected=typeof a=="function"?a:null,this.promise=p}function Be(r,a){var p=!1;try{r(function(t){p||(p=!0,je(a,t))},function(t){p||(p=!0,me(a,t))})}catch(t){if(p)return;p=!0,me(a,t)}}ne.prototype.catch=function(r){return this.then(null,r)},ne.prototype.then=function(r,a){var p=new this.constructor($e);return Ze(this,new Te(r,a,p)),p},ne.prototype.finally=function(r){var a=this.constructor;return this.then(function(p){return a.resolve(r()).then(function(){return p})},function(p){return a.resolve(r()).then(function(){return a.reject(p)})})},ne.all=function(r){return new ne(function(a,p){if(!Je(r))return p(new TypeError("Promise.all accepts an array"));var t=Array.prototype.slice.call(r);if(t.length===0)return a([]);var i=t.length;function s(f,h){try{if(h&&(pe(h)==="object"||typeof h=="function")){var C=h.then;if(typeof C=="function")return void C.call(h,function(I){s(f,I)},p)}t[f]=h,--i==0&&a(t)}catch(I){p(I)}}for(var c=0;c<t.length;c++)s(c,t[c])})},ne.any=function(r){var a=this;return new a(function(p,t){if(!r||r.length===void 0)return t(new TypeError("Promise.any accepts an array"));var i=Array.prototype.slice.call(r);if(i.length===0)return t();for(var s=[],c=0;c<i.length;c++)try{a.resolve(i[c]).then(p).catch(function(f){s.push(f),s.length===i.length&&t(new ee(s,"All promises were rejected"))})}catch(f){t(f)}})},ne.allSettled=function(r){return new this(function(a,p){if(!r||r.length===void 0)return p(new TypeError(N(r)+" "+r+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var t=Array.prototype.slice.call(r);if(t.length===0)return a([]);var i=t.length;function s(f,h){if(h&&(N(h)==="object"||typeof h=="function")){var C=h.then;if(typeof C=="function")return void C.call(h,function(I){s(f,I)},function(I){t[f]={status:"rejected",reason:I},--i==0&&a(t)})}t[f]={status:"fulfilled",value:h},--i==0&&a(t)}for(var c=0;c<t.length;c++)s(c,t[c])})},ne.resolve=function(r){return r&&pe(r)==="object"&&r.constructor===ne?r:new ne(function(a){a(r)})},ne.reject=function(r){return new ne(function(a,p){p(r)})},ne.race=function(r){return new ne(function(a,p){if(!Je(r))return p(new TypeError("Promise.race accepts an array"));for(var t=0,i=r.length;t<i;t++)ne.resolve(r[t]).then(a,p)})},ne._immediateFn=typeof setImmediate=="function"&&function(r){setImmediate(r)}||function(r){ke(r,0)},ne._unhandledRejectionFn=function(r){typeof console<"u"&&console&&console.warn("Possible Unhandled Promise Rejection:",r)};const ze=ne;var be=/mobile/i.test(window.navigator.userAgent);const W={secondToTime:function(r){if((r=r||0)===0||r===1/0||r.toString()==="NaN")return"00:00";var a=Math.floor(r/3600),p=Math.floor((r-3600*a)/60),t=Math.floor(r-3600*a-60*p);return(a>0?[a,p,t]:[p,t]).map(function(i){return i<10?"0"+i:""+i}).join(":")},getElementViewLeft:function(r){var a=r.offsetLeft,p=r.offsetParent,t=document.body.scrollLeft+document.documentElement.scrollLeft;if(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement)for(;p!==null&&p!==r;)a+=p.offsetLeft,p=p.offsetParent;else for(;p!==null;)a+=p.offsetLeft,p=p.offsetParent;return a-t},getBoundingClientRectViewLeft:function(r){var a=window.scrollY||window.pageYOffset||document.body.scrollTop+(document.documentElement&&document.documentElement.scrollTop||0);if(r.getBoundingClientRect){if(typeof this.getBoundingClientRectViewLeft.offset!="number"){var p=document.createElement("div");p.style.cssText="position:absolute;top:0;left:0;",document.body.appendChild(p),this.getBoundingClientRectViewLeft.offset=-p.getBoundingClientRect().top-a,document.body.removeChild(p),p=null}var t=r.getBoundingClientRect(),i=this.getBoundingClientRectViewLeft.offset;return t.left+i}return this.getElementViewLeft(r)},getScrollPosition:function(){return{left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0}},setScrollPosition:function(r){var a=r.left,p=a===void 0?0:a,t=r.top,i=t===void 0?0:t;this.isFirefox?(document.documentElement.scrollLeft=p,document.documentElement.scrollTop=i):window.scrollTo(p,i)},isMobile:be,isFirefox:/firefox/i.test(window.navigator.userAgent),isChrome:/chrome/i.test(window.navigator.userAgent),isSafari:/safari/i.test(window.navigator.userAgent),storage:{set:function(r,a){localStorage.setItem(r,a)},get:function(r){return localStorage.getItem(r)}},nameMap:{dragStart:be?"touchstart":"mousedown",dragMove:be?"touchmove":"mousemove",dragEnd:be?"touchend":"mouseup"},color2Number:function(r){return r[0]==="#"&&(r=r.substr(1)),r.length===3&&(r="".concat(r[0]).concat(r[0]).concat(r[1]).concat(r[1]).concat(r[2]).concat(r[2])),parseInt(r,16)+0&16777215},number2Color:function(r){return"#"+("00000"+r.toString(16)).slice(-6)},number2Type:function(r){switch(r){case 0:default:return"right";case 1:return"top";case 2:return"bottom"}}};function _e(r,a){return function(){return r.apply(a,arguments)}}function he(r){return he=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},he(r)}var Se,ge=Object.prototype.toString,Ie=Object.getPrototypeOf,Me=(Se=Object.create(null),function(r){var a=ge.call(r);return Se[a]||(Se[a]=a.slice(8,-1).toLowerCase())}),ye=function(r){return r=r.toLowerCase(),function(a){return Me(a)===r}},B=function(r){return function(a){return he(a)===r}},T=Array.isArray,_=B("undefined"),U=ye("ArrayBuffer"),$=B("string"),X=B("function"),J=B("number"),V=function(r){return r!==null&&he(r)==="object"},le=function(r){if(Me(r)!=="object")return!1;var a=Ie(r);return!(a!==null&&a!==Object.prototype&&Object.getPrototypeOf(a)!==null||Symbol.toStringTag in r||Symbol.iterator in r)},Ge=ye("Date"),fe=ye("File"),To=ye("Blob"),zo=ye("FileList"),_o=ye("URLSearchParams");function bn(r,a){var p,t,i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s=i.allOwnKeys,c=s!==void 0&&s;if(r!=null)if(he(r)!=="object"&&(r=[r]),T(r))for(p=0,t=r.length;p<t;p++)a.call(null,r[p],p,r);else{var f,h=c?Object.getOwnPropertyNames(r):Object.keys(r),C=h.length;for(p=0;p<C;p++)f=h[p],a.call(null,r[f],f,r)}}function br(r,a){a=a.toLowerCase();for(var p,t=Object.keys(r),i=t.length;i-- >0;)if(a===(p=t[i]).toLowerCase())return p;return null}var Bt,gr,vr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:vc,Er=function(r){return!_(r)&&r!==vr},Po=(Bt=typeof Uint8Array<"u"&&Ie(Uint8Array),function(r){return Bt&&r instanceof Bt}),Do=ye("HTMLFormElement"),xr=(gr=Object.prototype.hasOwnProperty,function(r,a){return gr.call(r,a)}),qo=ye("RegExp"),wr=function(r,a){var p=Object.getOwnPropertyDescriptors(r),t={};bn(p,function(i,s){a(i,s,r)!==!1&&(t[s]=i)}),Object.defineProperties(r,t)};const L={isArray:T,isArrayBuffer:U,isBuffer:function(r){return r!==null&&!_(r)&&r.constructor!==null&&!_(r.constructor)&&X(r.constructor.isBuffer)&&r.constructor.isBuffer(r)},isFormData:function(r){var a="[object FormData]";return r&&(typeof FormData=="function"&&r instanceof FormData||ge.call(r)===a||X(r.toString)&&r.toString()===a)},isArrayBufferView:function(r){return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?ArrayBuffer.isView(r):r&&r.buffer&&U(r.buffer)},isString:$,isNumber:J,isBoolean:function(r){return r===!0||r===!1},isObject:V,isPlainObject:le,isUndefined:_,isDate:Ge,isFile:fe,isBlob:To,isRegExp:qo,isFunction:X,isStream:function(r){return V(r)&&X(r.pipe)},isURLSearchParams:_o,isTypedArray:Po,isFileList:zo,forEach:bn,merge:function r(){for(var a=Er(this)&&this||{},p=a.caseless,t={},i=function(f,h){var C=p&&br(t,h)||h;le(t[C])&&le(f)?t[C]=r(t[C],f):le(f)?t[C]=r({},f):T(f)?t[C]=f.slice():t[C]=f},s=0,c=arguments.length;s<c;s++)arguments[s]&&bn(arguments[s],i);return t},extend:function(r,a,p){var t=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},i=t.allOwnKeys;return bn(a,function(s,c){p&&X(s)?r[c]=_e(s,p):r[c]=s},{allOwnKeys:i}),r},trim:function(r){return r.trim?r.trim():r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},stripBOM:function(r){return r.charCodeAt(0)===65279&&(r=r.slice(1)),r},inherits:function(r,a,p,t){r.prototype=Object.create(a.prototype,t),r.prototype.constructor=r,Object.defineProperty(r,"super",{value:a.prototype}),p&&Object.assign(r.prototype,p)},toFlatObject:function(r,a,p,t){var i,s,c,f={};if(a=a||{},r==null)return a;do{for(s=(i=Object.getOwnPropertyNames(r)).length;s-- >0;)c=i[s],t&&!t(c,r,a)||f[c]||(a[c]=r[c],f[c]=!0);r=p!==!1&&Ie(r)}while(r&&(!p||p(r,a))&&r!==Object.prototype);return a},kindOf:Me,kindOfTest:ye,endsWith:function(r,a,p){r=String(r),(p===void 0||p>r.length)&&(p=r.length),p-=a.length;var t=r.indexOf(a,p);return t!==-1&&t===p},toArray:function(r){if(!r)return null;if(T(r))return r;var a=r.length;if(!J(a))return null;for(var p=new Array(a);a-- >0;)p[a]=r[a];return p},forEachEntry:function(r,a){for(var p,t=(r&&r[Symbol.iterator]).call(r);(p=t.next())&&!p.done;){var i=p.value;a.call(r,i[0],i[1])}},matchAll:function(r,a){for(var p,t=[];(p=r.exec(a))!==null;)t.push(p);return t},isHTMLForm:Do,hasOwnProperty:xr,hasOwnProp:xr,reduceDescriptors:wr,freezeMethods:function(r){wr(r,function(a,p){if(X(r)&&["arguments","caller","callee"].indexOf(p)!==-1)return!1;var t=r[p];X(t)&&(a.enumerable=!1,"writable"in a?a.writable=!1:a.set||(a.set=function(){throw Error("Can not rewrite read-only method '"+p+"'")}))})},toObjectSet:function(r,a){var p={},t=function(i){i.forEach(function(s){p[s]=!0})};return T(r)?t(r):t(String(r).split(a)),p},toCamelCase:function(r){return r.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,function(a,p,t){return p.toUpperCase()+t})},noop:function(){},toFiniteNumber:function(r,a){return r=+r,Number.isFinite(r)?r:a},findKey:br,global:vr,isContextDefined:Er,toJSONObject:function(r){var a=new Array(10);return function p(t,i){if(V(t)){if(a.indexOf(t)>=0)return;if(!("toJSON"in t)){a[i]=t;var s=T(t)?[]:{};return bn(t,function(c,f){var h=p(c,i+1);!_(h)&&(s[f]=h)}),a[i]=void 0,s}}return t}(r,0)}};function ln(r,a,p,t,i){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=r,this.name="AxiosError",a&&(this.code=a),p&&(this.config=p),t&&(this.request=t),i&&(this.response=i)}L.inherits(ln,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:L.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var Cr=ln.prototype,kr={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(function(r){kr[r]={value:r}}),Object.defineProperties(ln,kr),Object.defineProperty(Cr,"isAxiosError",{value:!0}),ln.from=function(r,a,p,t,i,s){var c=Object.create(Cr);return L.toFlatObject(r,c,function(f){return f!==Error.prototype},function(f){return f!=="isAxiosError"}),ln.call(c,r.message,a,p,t,i),c.cause=r,c.name=r.name,s&&Object.assign(c,s),c};const re=ln,jo=d(937);function St(r){return St=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},St(r)}function It(r){return L.isPlainObject(r)||L.isArray(r)}function Br(r){return L.endsWith(r,"[]")?r.slice(0,-2):r}function Sr(r,a,p){return r?r.concat(a).map(function(t,i){return t=Br(t),!p&&i?"["+t+"]":t}).join(p?".":""):a}var Mo=L.toFlatObject(L,{},null,function(r){return/^is[A-Z]/.test(r)});const tt=function(r,a,p){if(!L.isObject(r))throw new TypeError("target must be an object");a=a||new(jo||FormData);var t,i=(p=L.toFlatObject(p,{metaTokens:!0,dots:!1,indexes:!1},!1,function(M,j){return!L.isUndefined(j[M])})).metaTokens,s=p.visitor||I,c=p.dots,f=p.indexes,h=(p.Blob||typeof Blob<"u"&&Blob)&&(t=a)&&L.isFunction(t.append)&&t[Symbol.toStringTag]==="FormData"&&t[Symbol.iterator];if(!L.isFunction(s))throw new TypeError("visitor must be a function");function C(M){if(M===null)return"";if(L.isDate(M))return M.toISOString();if(!h&&L.isBlob(M))throw new re("Blob is not supported. Use a Buffer instead.");return L.isArrayBuffer(M)||L.isTypedArray(M)?h&&typeof Blob=="function"?new Blob([M]):Buffer.from(M):M}function I(M,j,D){var H=M;if(M&&!D&&St(M)==="object"){if(L.endsWith(j,"{}"))j=i?j:j.slice(0,-2),M=JSON.stringify(M);else if(L.isArray(M)&&function(Q){return L.isArray(Q)&&!Q.some(It)}(M)||L.isFileList(M)||L.endsWith(j,"[]")&&(H=L.toArray(M)))return j=Br(j),H.forEach(function(Q,Ae){!L.isUndefined(Q)&&Q!==null&&a.append(f===!0?Sr([j],Ae,c):f===null?j:j+"[]",C(Q))}),!1}return!!It(M)||(a.append(Sr(D,j,c),C(M)),!1)}var P=[],q=Object.assign(Mo,{defaultVisitor:I,convertValue:C,isVisitable:It});if(!L.isObject(r))throw new TypeError("data must be an object");return function M(j,D){if(!L.isUndefined(j)){if(P.indexOf(j)!==-1)throw Error("Circular reference detected in "+D.join("."));P.push(j),L.forEach(j,function(H,Q){(!(L.isUndefined(H)||H===null)&&s.call(a,H,L.isString(Q)?Q.trim():Q,D,q))===!0&&M(H,D?D.concat(Q):[Q])}),P.pop()}}(r),a};function Ir(r){var a={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(r).replace(/[!'()~]|%20|%00/g,function(p){return a[p]})}function Lr(r,a){this._pairs=[],r&&tt(r,this,a)}var Or=Lr.prototype;Or.append=function(r,a){this._pairs.push([r,a])},Or.toString=function(r){var a=r?function(p){return r.call(this,p,Ir)}:Ir;return this._pairs.map(function(p){return a(p[0])+"="+a(p[1])},"").join("&")};const Rr=Lr;function No(r){return encodeURIComponent(r).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Tr(r,a,p){if(!a)return r;var t,i=p&&p.encode||No,s=p&&p.serialize;if(t=s?s(a,p):L.isURLSearchParams(a)?a.toString():new Rr(a,p).toString(i)){var c=r.indexOf("#");c!==-1&&(r=r.slice(0,c)),r+=(r.indexOf("?")===-1?"?":"&")+t}return r}function gn(r){return gn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},gn(r)}function Fo(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(gn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(gn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),gn(i)==="symbol"?i:String(i)),t)}var i}var Uo=function(){function r(){(function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")})(this,r),this.handlers=[]}var a,p;return a=r,p=[{key:"use",value:function(t,i,s){return this.handlers.push({fulfilled:t,rejected:i,synchronous:!!s&&s.synchronous,runWhen:s?s.runWhen:null}),this.handlers.length-1}},{key:"eject",value:function(t){this.handlers[t]&&(this.handlers[t]=null)}},{key:"clear",value:function(){this.handlers&&(this.handlers=[])}},{key:"forEach",value:function(t){L.forEach(this.handlers,function(i){i!==null&&t(i)})}}],p&&Fo(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const zr=Uo,_r={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Ho=typeof URLSearchParams<"u"?URLSearchParams:Rr,Wo=FormData;var Lt,Yo=(typeof navigator>"u"||(Lt=navigator.product)!=="ReactNative"&&Lt!=="NativeScript"&&Lt!=="NS")&&typeof window<"u"&&typeof document<"u",Qo=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function";const Le={isBrowser:!0,classes:{URLSearchParams:Ho,FormData:Wo,Blob},isStandardBrowserEnv:Yo,isStandardBrowserWebWorkerEnv:Qo,protocols:["http","https","file","blob","url","data"]},Pr=function(r){function a(t,i,s,c){var f=t[c++],h=Number.isFinite(+f),C=c>=t.length;return f=!f&&L.isArray(s)?s.length:f,C?(L.hasOwnProp(s,f)?s[f]=[s[f],i]:s[f]=i,!h):(s[f]&&L.isObject(s[f])||(s[f]=[]),a(t,i,s[f],c)&&L.isArray(s[f])&&(s[f]=function(I){var P,q,M={},j=Object.keys(I),D=j.length;for(P=0;P<D;P++)M[q=j[P]]=I[q];return M}(s[f])),!h)}if(L.isFormData(r)&&L.isFunction(r.entries)){var p={};return L.forEachEntry(r,function(t,i){a(function(s){return L.matchAll(/\w+|\[(\w*)]/g,s).map(function(c){return c[0]==="[]"?"":c[1]||c[0]})}(t),i,p,0)}),p}return null};var Ko={"Content-Type":void 0},rt={transitional:_r,adapter:["xhr","http"],transformRequest:[function(r,a){var p,t=a.getContentType()||"",i=t.indexOf("application/json")>-1,s=L.isObject(r);if(s&&L.isHTMLForm(r)&&(r=new FormData(r)),L.isFormData(r))return i&&i?JSON.stringify(Pr(r)):r;if(L.isArrayBuffer(r)||L.isBuffer(r)||L.isStream(r)||L.isFile(r)||L.isBlob(r))return r;if(L.isArrayBufferView(r))return r.buffer;if(L.isURLSearchParams(r))return a.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),r.toString();if(s){if(t.indexOf("application/x-www-form-urlencoded")>-1)return function(f,h){return tt(f,new Le.classes.URLSearchParams,Object.assign({visitor:function(C,I,P,q){return Le.isNode&&L.isBuffer(C)?(this.append(I,C.toString("base64")),!1):q.defaultVisitor.apply(this,arguments)}},h))}(r,this.formSerializer).toString();if((p=L.isFileList(r))||t.indexOf("multipart/form-data")>-1){var c=this.env&&this.env.FormData;return tt(p?{"files[]":r}:r,c&&new c,this.formSerializer)}}return s||i?(a.setContentType("application/json",!1),function(f,h,C){if(L.isString(f))try{return(0,JSON.parse)(f),L.trim(f)}catch(I){if(I.name!=="SyntaxError")throw I}return(0,JSON.stringify)(f)}(r)):r}],transformResponse:[function(r){var a=this.transitional||rt.transitional,p=a&&a.forcedJSONParsing,t=this.responseType==="json";if(r&&L.isString(r)&&(p&&!this.responseType||t)){var i=!(a&&a.silentJSONParsing)&&t;try{return JSON.parse(r)}catch(s){if(i)throw s.name==="SyntaxError"?re.from(s,re.ERR_BAD_RESPONSE,this,null,this.response):s}}return r}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Le.classes.FormData,Blob:Le.classes.Blob},validateStatus:function(r){return r>=200&&r<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};L.forEach(["delete","get","head"],function(r){rt.headers[r]={}}),L.forEach(["post","put","patch"],function(r){rt.headers[r]=L.merge(Ko)});const Ot=rt;var Vo=L.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]);function vn(r){return vn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},vn(r)}function Dr(r,a){(a==null||a>r.length)&&(a=r.length);for(var p=0,t=new Array(a);p<a;p++)t[p]=r[p];return t}function qr(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(vn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(vn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),vn(i)==="symbol"?i:String(i)),t)}var i}var jr=Symbol("internals");function En(r){return r&&String(r).trim().toLowerCase()}function at(r){return r===!1||r==null?r:L.isArray(r)?r.map(at):String(r)}function Mr(r,a,p,t){return L.isFunction(t)?t.call(this,a,p):L.isString(a)?L.isString(t)?a.indexOf(t)!==-1:L.isRegExp(t)?t.test(a):void 0:void 0}var ot=function(r,a){function p(c){(function(f,h){if(!(f instanceof h))throw new TypeError("Cannot call a class as a function")})(this,p),c&&this.set(c)}var t,i,s;return t=p,i=[{key:"set",value:function(c,f,h){var C=this;function I(Q,Ae,de){var ae=En(Ae);if(!ae)throw new Error("header name must be a non-empty string");var Ue=L.findKey(C,ae);(!Ue||C[Ue]===void 0||de===!0||de===void 0&&C[Ue]!==!1)&&(C[Ue||Ae]=at(Q))}var P,q,M,j,D,H=function(Q,Ae){return L.forEach(Q,function(de,ae){return I(de,ae,Ae)})};return L.isPlainObject(c)||c instanceof this.constructor?H(c,f):L.isString(c)&&(c=c.trim())&&!/^[-_a-zA-Z]+$/.test(c.trim())?H((D={},(P=c)&&P.split(`
`).forEach(function(Q){j=Q.indexOf(":"),q=Q.substring(0,j).trim().toLowerCase(),M=Q.substring(j+1).trim(),!q||D[q]&&Vo[q]||(q==="set-cookie"?D[q]?D[q].push(M):D[q]=[M]:D[q]=D[q]?D[q]+", "+M:M)}),D),f):c!=null&&I(f,c,h),this}},{key:"get",value:function(c,f){if(c=En(c)){var h=L.findKey(this,c);if(h){var C=this[h];if(!f)return C;if(f===!0)return function(I){for(var P,q=Object.create(null),M=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;P=M.exec(I);)q[P[1]]=P[2];return q}(C);if(L.isFunction(f))return f.call(this,C,h);if(L.isRegExp(f))return f.exec(C);throw new TypeError("parser must be boolean|regexp|function")}}}},{key:"has",value:function(c,f){if(c=En(c)){var h=L.findKey(this,c);return!(!h||f&&!Mr(0,this[h],h,f))}return!1}},{key:"delete",value:function(c,f){var h=this,C=!1;function I(P){if(P=En(P)){var q=L.findKey(h,P);!q||f&&!Mr(0,h[q],q,f)||(delete h[q],C=!0)}}return L.isArray(c)?c.forEach(I):I(c),C}},{key:"clear",value:function(){return Object.keys(this).forEach(this.delete.bind(this))}},{key:"normalize",value:function(c){var f=this,h={};return L.forEach(this,function(C,I){var P=L.findKey(h,I);if(P)return f[P]=at(C),void delete f[I];var q=c?function(M){return M.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,function(j,D,H){return D.toUpperCase()+H})}(I):String(I).trim();q!==I&&delete f[I],f[q]=at(C),h[q]=!0}),this}},{key:"concat",value:function(){for(var c,f=arguments.length,h=new Array(f),C=0;C<f;C++)h[C]=arguments[C];return(c=this.constructor).concat.apply(c,[this].concat(h))}},{key:"toJSON",value:function(c){var f=Object.create(null);return L.forEach(this,function(h,C){h!=null&&h!==!1&&(f[C]=c&&L.isArray(h)?h.join(", "):h)}),f}},{key:Symbol.iterator,value:function(){return Object.entries(this.toJSON())[Symbol.iterator]()}},{key:"toString",value:function(){return Object.entries(this.toJSON()).map(function(c){var f,h,C=(h=2,function(I){if(Array.isArray(I))return I}(f=c)||function(I,P){var q=I==null?null:typeof Symbol<"u"&&I[Symbol.iterator]||I["@@iterator"];if(q!=null){var M,j,D,H,Q=[],Ae=!0,de=!1;try{if(D=(q=q.call(I)).next,P===0){if(Object(q)!==q)return;Ae=!1}else for(;!(Ae=(M=D.call(q)).done)&&(Q.push(M.value),Q.length!==P);Ae=!0);}catch(ae){de=!0,j=ae}finally{try{if(!Ae&&q.return!=null&&(H=q.return(),Object(H)!==H))return}finally{if(de)throw j}}return Q}}(f,h)||function(I,P){if(I){if(typeof I=="string")return Dr(I,P);var q=Object.prototype.toString.call(I).slice(8,-1);return q==="Object"&&I.constructor&&(q=I.constructor.name),q==="Map"||q==="Set"?Array.from(I):q==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(q)?Dr(I,P):void 0}}(f,h)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}());return C[0]+": "+C[1]}).join(`
`)}},{key:Symbol.toStringTag,get:function(){return"AxiosHeaders"}}],s=[{key:"from",value:function(c){return c instanceof this?c:new this(c)}},{key:"concat",value:function(c){for(var f=new this(c),h=arguments.length,C=new Array(h>1?h-1:0),I=1;I<h;I++)C[I-1]=arguments[I];return C.forEach(function(P){return f.set(P)}),f}},{key:"accessor",value:function(c){var f=(this[jr]=this[jr]={accessors:{}}).accessors,h=this.prototype;function C(I){var P=En(I);f[P]||(function(q,M){var j=L.toCamelCase(" "+M);["get","set","has"].forEach(function(D){Object.defineProperty(q,D+j,{value:function(H,Q,Ae){return this[D].call(this,M,H,Q,Ae)},configurable:!0})})}(h,I),f[P]=!0)}return L.isArray(c)?c.forEach(C):C(c),this}}],i&&qr(t.prototype,i),s&&qr(t,s),Object.defineProperty(t,"prototype",{writable:!1}),p}();ot.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent"]),L.freezeMethods(ot.prototype),L.freezeMethods(ot);const Pe=ot;function Rt(r,a){var p=this||Ot,t=a||p,i=Pe.from(t.headers),s=t.data;return L.forEach(r,function(c){s=c.call(p,s,i.normalize(),a?a.status:void 0)}),i.normalize(),s}function Nr(r){return!(!r||!r.__CANCEL__)}function Fr(r,a,p){re.call(this,r??"canceled",re.ERR_CANCELED,a,p),this.name="CanceledError"}L.inherits(Fr,re,{__CANCEL__:!0});const it=Fr,Jo=Le.isStandardBrowserEnv?{write:function(r,a,p,t,i,s){var c=[];c.push(r+"="+encodeURIComponent(a)),L.isNumber(p)&&c.push("expires="+new Date(p).toGMTString()),L.isString(t)&&c.push("path="+t),L.isString(i)&&c.push("domain="+i),s===!0&&c.push("secure"),document.cookie=c.join("; ")},read:function(r){var a=document.cookie.match(new RegExp("(^|;\\s*)("+r+")=([^;]*)"));return a?decodeURIComponent(a[3]):null},remove:function(r){this.write(r,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};function Ur(r,a){return r&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(a)?function(p,t){return t?p.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):p}(r,a):a}const $o=Le.isStandardBrowserEnv?function(){var r,a=/(msie|trident)/i.test(navigator.userAgent),p=document.createElement("a");function t(i){var s=i;return a&&(p.setAttribute("href",s),s=p.href),p.setAttribute("href",s),{href:p.href,protocol:p.protocol?p.protocol.replace(/:$/,""):"",host:p.host,search:p.search?p.search.replace(/^\?/,""):"",hash:p.hash?p.hash.replace(/^#/,""):"",hostname:p.hostname,port:p.port,pathname:p.pathname.charAt(0)==="/"?p.pathname:"/"+p.pathname}}return r=t(window.location.href),function(i){var s=L.isString(i)?t(i):i;return s.protocol===r.protocol&&s.host===r.host}}():function(){return!0};function Hr(r,a){var p=0,t=function(i,s){i=i||10;var c,f=new Array(i),h=new Array(i),C=0,I=0;return s=s!==void 0?s:1e3,function(P){var q=Date.now(),M=h[I];c||(c=q),f[C]=P,h[C]=q;for(var j=I,D=0;j!==C;)D+=f[j++],j%=i;if((C=(C+1)%i)===I&&(I=(I+1)%i),!(q-c<s)){var H=M&&q-M;return H?Math.round(1e3*D/H):void 0}}}(50,250);return function(i){var s=i.loaded,c=i.lengthComputable?i.total:void 0,f=s-p,h=t(f);p=s;var C={loaded:s,total:c,progress:c?s/c:void 0,bytes:f,rate:h||void 0,estimated:h&&c&&s<=c?(c-s)/h:void 0,event:i};C[a?"download":"upload"]=!0,r(C)}}var Tt={http:null,xhr:typeof XMLHttpRequest<"u"&&function(r){return new Promise(function(a,p){var t,i=r.data,s=Pe.from(r.headers).normalize(),c=r.responseType;function f(){r.cancelToken&&r.cancelToken.unsubscribe(t),r.signal&&r.signal.removeEventListener("abort",t)}L.isFormData(i)&&(Le.isStandardBrowserEnv||Le.isStandardBrowserWebWorkerEnv)&&s.setContentType(!1);var h=new XMLHttpRequest;if(r.auth){var C=r.auth.username||"",I=r.auth.password?unescape(encodeURIComponent(r.auth.password)):"";s.set("Authorization","Basic "+btoa(C+":"+I))}var P=Ur(r.baseURL,r.url);function q(){if(h){var H=Pe.from("getAllResponseHeaders"in h&&h.getAllResponseHeaders());(function(Q,Ae,de){var ae=de.config.validateStatus;de.status&&ae&&!ae(de.status)?Ae(new re("Request failed with status code "+de.status,[re.ERR_BAD_REQUEST,re.ERR_BAD_RESPONSE][Math.floor(de.status/100)-4],de.config,de.request,de)):Q(de)})(function(Q){a(Q),f()},function(Q){p(Q),f()},{data:c&&c!=="text"&&c!=="json"?h.response:h.responseText,status:h.status,statusText:h.statusText,headers:H,config:r,request:h}),h=null}}if(h.open(r.method.toUpperCase(),Tr(P,r.params,r.paramsSerializer),!0),h.timeout=r.timeout,"onloadend"in h?h.onloadend=q:h.onreadystatechange=function(){h&&h.readyState===4&&(h.status!==0||h.responseURL&&h.responseURL.indexOf("file:")===0)&&setTimeout(q)},h.onabort=function(){h&&(p(new re("Request aborted",re.ECONNABORTED,r,h)),h=null)},h.onerror=function(){p(new re("Network Error",re.ERR_NETWORK,r,h)),h=null},h.ontimeout=function(){var H=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded",Q=r.transitional||_r;r.timeoutErrorMessage&&(H=r.timeoutErrorMessage),p(new re(H,Q.clarifyTimeoutError?re.ETIMEDOUT:re.ECONNABORTED,r,h)),h=null},Le.isStandardBrowserEnv){var M=(r.withCredentials||$o(P))&&r.xsrfCookieName&&Jo.read(r.xsrfCookieName);M&&s.set(r.xsrfHeaderName,M)}i===void 0&&s.setContentType(null),"setRequestHeader"in h&&L.forEach(s.toJSON(),function(H,Q){h.setRequestHeader(Q,H)}),L.isUndefined(r.withCredentials)||(h.withCredentials=!!r.withCredentials),c&&c!=="json"&&(h.responseType=r.responseType),typeof r.onDownloadProgress=="function"&&h.addEventListener("progress",Hr(r.onDownloadProgress,!0)),typeof r.onUploadProgress=="function"&&h.upload&&h.upload.addEventListener("progress",Hr(r.onUploadProgress)),(r.cancelToken||r.signal)&&(t=function(H){h&&(p(!H||H.type?new it(null,r,h):H),h.abort(),h=null)},r.cancelToken&&r.cancelToken.subscribe(t),r.signal&&(r.signal.aborted?t():r.signal.addEventListener("abort",t)));var j,D=(j=/^([-+\w]{1,25})(:?\/\/|:)/.exec(P))&&j[1]||"";D&&Le.protocols.indexOf(D)===-1?p(new re("Unsupported protocol "+D+":",re.ERR_BAD_REQUEST,r)):h.send(i||null)})}};L.forEach(Tt,function(r,a){if(r){try{Object.defineProperty(r,"name",{value:a})}catch{}Object.defineProperty(r,"adapterName",{value:a})}});function zt(r){if(r.cancelToken&&r.cancelToken.throwIfRequested(),r.signal&&r.signal.aborted)throw new it(null,r)}function Wr(r){return zt(r),r.headers=Pe.from(r.headers),r.data=Rt.call(r,r.transformRequest),["post","put","patch"].indexOf(r.method)!==-1&&r.headers.setContentType("application/x-www-form-urlencoded",!1),function(a){for(var p,t,i=(a=L.isArray(a)?a:[a]).length,s=0;s<i&&(p=a[s],!(t=L.isString(p)?Tt[p.toLowerCase()]:p));s++);if(!t)throw t===!1?new re("Adapter ".concat(p," is not supported by the environment"),"ERR_NOT_SUPPORT"):new Error(L.hasOwnProp(Tt,p)?"Adapter '".concat(p,"' is not available in the build"):"Unknown adapter '".concat(p,"'"));if(!L.isFunction(t))throw new TypeError("adapter is not a function");return t}(r.adapter||Ot.adapter)(r).then(function(a){return zt(r),a.data=Rt.call(r,r.transformResponse,a),a.headers=Pe.from(a.headers),a},function(a){return Nr(a)||(zt(r),a&&a.response&&(a.response.data=Rt.call(r,r.transformResponse,a.response),a.response.headers=Pe.from(a.response.headers))),Promise.reject(a)})}var Yr=function(r){return r instanceof Pe?r.toJSON():r};function sn(r,a){a=a||{};var p={};function t(C,I,P){return L.isPlainObject(C)&&L.isPlainObject(I)?L.merge.call({caseless:P},C,I):L.isPlainObject(I)?L.merge({},I):L.isArray(I)?I.slice():I}function i(C,I,P){return L.isUndefined(I)?L.isUndefined(C)?void 0:t(void 0,C,P):t(C,I,P)}function s(C,I){if(!L.isUndefined(I))return t(void 0,I)}function c(C,I){return L.isUndefined(I)?L.isUndefined(C)?void 0:t(void 0,C):t(void 0,I)}function f(C,I,P){return P in a?t(C,I):P in r?t(void 0,C):void 0}var h={url:s,method:s,data:s,baseURL:c,transformRequest:c,transformResponse:c,paramsSerializer:c,timeout:c,timeoutMessage:c,withCredentials:c,adapter:c,responseType:c,xsrfCookieName:c,xsrfHeaderName:c,onUploadProgress:c,onDownloadProgress:c,decompress:c,maxContentLength:c,maxBodyLength:c,beforeRedirect:c,transport:c,httpAgent:c,httpsAgent:c,cancelToken:c,socketPath:c,responseEncoding:c,validateStatus:f,headers:function(C,I){return i(Yr(C),Yr(I),!0)}};return L.forEach(Object.keys(r).concat(Object.keys(a)),function(C){var I=h[C]||i,P=I(r[C],a[C],C);L.isUndefined(P)&&I!==f||(p[C]=P)}),p}function lt(r){return lt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},lt(r)}var _t={};["object","boolean","number","function","string","symbol"].forEach(function(r,a){_t[r]=function(p){return lt(p)===r||"a"+(a<1?"n ":" ")+r}});var Qr={};_t.transitional=function(r,a,p){function t(i,s){return"[Axios v1.2.3] Transitional option '"+i+"'"+s+(p?". "+p:"")}return function(i,s,c){if(r===!1)throw new re(t(s," has been removed"+(a?" in "+a:"")),re.ERR_DEPRECATED);return a&&!Qr[s]&&(Qr[s]=!0,console.warn(t(s," has been deprecated since v"+a+" and will be removed in the near future"))),!r||r(i,s,c)}};const Pt={assertOptions:function(r,a,p){if(lt(r)!=="object")throw new re("options must be an object",re.ERR_BAD_OPTION_VALUE);for(var t=Object.keys(r),i=t.length;i-- >0;){var s=t[i],c=a[s];if(c){var f=r[s],h=f===void 0||c(f,s,r);if(h!==!0)throw new re("option "+s+" must be "+h,re.ERR_BAD_OPTION_VALUE)}else if(p!==!0)throw new re("Unknown option "+s,re.ERR_BAD_OPTION)}},validators:_t};function xn(r){return xn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},xn(r)}function Zo(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(xn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(xn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),xn(i)==="symbol"?i:String(i)),t)}var i}var Ne=Pt.validators,st=function(){function r(t){(function(i,s){if(!(i instanceof s))throw new TypeError("Cannot call a class as a function")})(this,r),this.defaults=t,this.interceptors={request:new zr,response:new zr}}var a,p;return a=r,(p=[{key:"request",value:function(t,i){typeof t=="string"?(i=i||{}).url=t:i=t||{};var s,c=i=sn(this.defaults,i),f=c.transitional,h=c.paramsSerializer,C=c.headers;f!==void 0&&Pt.assertOptions(f,{silentJSONParsing:Ne.transitional(Ne.boolean),forcedJSONParsing:Ne.transitional(Ne.boolean),clarifyTimeoutError:Ne.transitional(Ne.boolean)},!1),h!==void 0&&Pt.assertOptions(h,{encode:Ne.function,serialize:Ne.function},!0),i.method=(i.method||this.defaults.method||"get").toLowerCase(),(s=C&&L.merge(C.common,C[i.method]))&&L.forEach(["delete","get","head","post","put","patch","common"],function(ae){delete C[ae]}),i.headers=Pe.concat(s,C);var I=[],P=!0;this.interceptors.request.forEach(function(ae){typeof ae.runWhen=="function"&&ae.runWhen(i)===!1||(P=P&&ae.synchronous,I.unshift(ae.fulfilled,ae.rejected))});var q,M=[];this.interceptors.response.forEach(function(ae){M.push(ae.fulfilled,ae.rejected)});var j,D=0;if(!P){var H=[Wr.bind(this),void 0];for(H.unshift.apply(H,I),H.push.apply(H,M),j=H.length,q=Promise.resolve(i);D<j;)q=q.then(H[D++],H[D++]);return q}j=I.length;var Q=i;for(D=0;D<j;){var Ae=I[D++],de=I[D++];try{Q=Ae(Q)}catch(ae){de.call(this,ae);break}}try{q=Wr.call(this,Q)}catch(ae){return Promise.reject(ae)}for(D=0,j=M.length;D<j;)q=q.then(M[D++],M[D++]);return q}},{key:"getUri",value:function(t){return Tr(Ur((t=sn(this.defaults,t)).baseURL,t.url),t.params,t.paramsSerializer)}}])&&Zo(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();L.forEach(["delete","get","head","options"],function(r){st.prototype[r]=function(a,p){return this.request(sn(p||{},{method:r,url:a,data:(p||{}).data}))}}),L.forEach(["post","put","patch"],function(r){function a(p){return function(t,i,s){return this.request(sn(s||{},{method:r,headers:p?{"Content-Type":"multipart/form-data"}:{},url:t,data:i}))}}st.prototype[r]=a(),st.prototype[r+"Form"]=a(!0)});const dt=st;function wn(r){return wn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},wn(r)}function Kr(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(wn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(wn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),wn(i)==="symbol"?i:String(i)),t)}var i}var Xo=function(){function r(i){if(function(f,h){if(!(f instanceof h))throw new TypeError("Cannot call a class as a function")}(this,r),typeof i!="function")throw new TypeError("executor must be a function.");var s;this.promise=new Promise(function(f){s=f});var c=this;this.promise.then(function(f){if(c._listeners){for(var h=c._listeners.length;h-- >0;)c._listeners[h](f);c._listeners=null}}),this.promise.then=function(f){var h,C=new Promise(function(I){c.subscribe(I),h=I}).then(f);return C.cancel=function(){c.unsubscribe(h)},C},i(function(f,h,C){c.reason||(c.reason=new it(f,h,C),s(c.reason))})}var a,p,t;return a=r,p=[{key:"throwIfRequested",value:function(){if(this.reason)throw this.reason}},{key:"subscribe",value:function(i){this.reason?i(this.reason):this._listeners?this._listeners.push(i):this._listeners=[i]}},{key:"unsubscribe",value:function(i){if(this._listeners){var s=this._listeners.indexOf(i);s!==-1&&this._listeners.splice(s,1)}}}],t=[{key:"source",value:function(){var i;return{token:new r(function(s){i=s}),cancel:i}}}],p&&Kr(a.prototype,p),t&&Kr(a,t),Object.defineProperty(a,"prototype",{writable:!1}),r}();const Go=Xo;function Vr(r,a){(a==null||a>r.length)&&(a=r.length);for(var p=0,t=new Array(a);p<a;p++)t[p]=r[p];return t}var Dt={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Dt).forEach(function(r){var a,p,t=(p=2,function(c){if(Array.isArray(c))return c}(a=r)||function(c,f){var h=c==null?null:typeof Symbol<"u"&&c[Symbol.iterator]||c["@@iterator"];if(h!=null){var C,I,P,q,M=[],j=!0,D=!1;try{if(P=(h=h.call(c)).next,f===0){if(Object(h)!==h)return;j=!1}else for(;!(j=(C=P.call(h)).done)&&(M.push(C.value),M.length!==f);j=!0);}catch(H){D=!0,I=H}finally{try{if(!j&&h.return!=null&&(q=h.return(),Object(q)!==q))return}finally{if(D)throw I}}return M}}(a,p)||function(c,f){if(c){if(typeof c=="string")return Vr(c,f);var h=Object.prototype.toString.call(c).slice(8,-1);return h==="Object"&&c.constructor&&(h=c.constructor.name),h==="Map"||h==="Set"?Array.from(c):h==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(h)?Vr(c,f):void 0}}(a,p)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()),i=t[0],s=t[1];Dt[s]=i});const ei=Dt;var ue=function r(a){var p=new dt(a),t=_e(dt.prototype.request,p);return L.extend(t,dt.prototype,p,{allOwnKeys:!0}),L.extend(t,p,null,{allOwnKeys:!0}),t.create=function(i){return r(sn(a,i))},t}(Ot);ue.Axios=dt,ue.CanceledError=it,ue.CancelToken=Go,ue.isCancel=Nr,ue.VERSION="1.2.3",ue.toFormData=tt,ue.AxiosError=re,ue.Cancel=ue.CanceledError,ue.all=function(r){return Promise.all(r)},ue.spread=function(r){return function(a){return r.apply(null,a)}},ue.isAxiosError=function(r){return L.isObject(r)&&r.isAxiosError===!0},ue.mergeConfig=sn,ue.AxiosHeaders=Pe,ue.formToJSON=function(r){return Pr(L.isHTMLForm(r)?new FormData(r):r)},ue.HttpStatusCode=ei,ue.default=ue;const Jr=ue,ni={send:function(r){Jr.post(r.url,r.data).then(function(a){var p=a.data;p&&p.code===0?r.success&&r.success(p):r.error&&r.error(p&&p.msg)}).catch(function(a){console.error(a),r.error&&r.error()})},read:function(r){Jr.get(r.url).then(function(a){var p=a.data;p&&p.code===0?r.success&&r.success(p.data.map(function(t){return{time:t[0],type:t[1],color:t[2],author:t[3],text:t[4]}})):r.error&&r.error(p&&p.msg)}).catch(function(a){console.error(a),r.error&&r.error()})}};function qt(r){return qt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},qt(r)}function ti(r){var a=this;this.lang=r,this.fallbackLang=this.lang.includes("-")?this.lang.split("-")[0]:this.lang,this.tran=function(p){return p=p.toLowerCase(),dn[a.lang]&&dn[a.lang][p]?dn[a.lang][p]:dn[a.fallbackLang]&&dn[a.fallbackLang][p]?dn[a.fallbackLang][p]:jt[p]?jt[p]:p}}var jt={"danmaku-loading":"Danmaku is loading",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Input danmaku, hit Enter","about-author":"About author","dplayer-feedback":"DPlayer feedback","about-dplayer":"About DPlayer",loop:"Loop",speed:"Speed","opacity-danmaku":"Opacity for danmaku",normal:"Normal","please-input-danmaku":"Please input danmaku content!","set-danmaku-color":"Set danmaku color","set-danmaku-type":"Set danmaku type","show-danmaku":"Show danmaku","video-failed":"Video load failed","danmaku-failed":"Danmaku load failed","danmaku-send-failed":"Danmaku send failed","switching-quality":"Switching to %q quality","switched-quality":"Switched to %q quality",ff:"FF %s s",rew:"REW %s s","unlimited-danmaku":"Unlimited danmaku","send-danmaku":"Send danmaku",setting:"Setting",fullscreen:"Full screen","web-fullscreen":"Web full screen",send:"Send",screenshot:"Screenshot",airplay:"AirPlay",chromecast:"ChromeCast",subtitle:"Subtitle",off:"Off","show-subs":"Show subtitle","hide-subs":"Hide subtitle",volume:"Volume",live:"Live","video-info":"Video info"},dn={en:jt,"zh-cn":{"danmaku-loading":"弹幕加载中",top:"顶部",bottom:"底部",rolling:"滚动","input-danmaku-enter":"输入弹幕，回车发送","about-author":"关于作者","dplayer-feedback":"播放器意见反馈","about-dplayer":"关于 DPlayer 播放器",loop:"洗脑循环",speed:"速度","opacity-danmaku":"弹幕透明度",normal:"正常","please-input-danmaku":"要输入弹幕内容啊喂！","set-danmaku-color":"设置弹幕颜色","set-danmaku-type":"设置弹幕类型","show-danmaku":"显示弹幕","video-failed":"视频加载失败","danmaku-failed":"弹幕加载失败","danmaku-send-failed":"弹幕发送失败","switching-quality":"正在切换至 %q 画质","switched-quality":"已经切换至 %q 画质",ff:"快进 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"海量弹幕","send-danmaku":"发送弹幕",setting:"设置",fullscreen:"全屏","web-fullscreen":"页面全屏",send:"发送",screenshot:"截图",airplay:"无线投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"关闭","show-subs":"显示字幕","hide-subs":"隐藏字幕",volume:"音量",live:"直播","video-info":"视频统计信息"},"zh-tw":{"danmaku-loading":"彈幕載入中",top:"頂部",bottom:"底部",rolling:"滾動","input-danmaku-enter":"輸入彈幕，Enter 發送","about-author":"關於作者","dplayer-feedback":"播放器意見回饋","about-dplayer":"關於 DPlayer 播放器",loop:"循環播放",speed:"速度","opacity-danmaku":"彈幕透明度",normal:"正常","please-input-danmaku":"請輸入彈幕內容啊！","set-danmaku-color":"設定彈幕顏色","set-danmaku-type":"設定彈幕類型","show-danmaku":"顯示彈幕","video-failed":"影片載入失敗","danmaku-failed":"彈幕載入失敗","danmaku-send-failed":"彈幕發送失敗","switching-quality":"正在切換至 %q 畫質","switched-quality":"已經切換至 %q 畫質",ff:"快進 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"巨量彈幕","send-danmaku":"發送彈幕",setting:"設定",fullscreen:"全螢幕","web-fullscreen":"頁面全螢幕",send:"發送",screenshot:"截圖",airplay:"無線投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"關閉","show-subs":"顯示字幕","hide-subs":"隱藏字幕",volume:"音量",live:"直播","video-info":"影片統計訊息"},"ko-kr":{"danmaku-loading":"Danmaku를 불러오는 중입니다.",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Danmaku를 입력하고 Enter를 누르세요.","about-author":"만든이","dplayer-feedback":"피드백 보내기","about-dplayer":"DPlayer 정보",loop:"반복",speed:"배속","opacity-danmaku":"Danmaku 불투명도",normal:"표준","please-input-danmaku":"Danmaku를 입력하세요!","set-danmaku-color":"Danmaku 색상","set-danmaku-type":"Danmaku 설정","show-danmaku":"Danmaku 표시","video-failed":"비디오를 불러오지 못했습니다.","danmaku-failed":"Danmaku를 불러오지 못했습니다.","danmaku-send-failed":"Danmaku 전송에 실패했습니다.","Switching to":"","Switched to":"","switching-quality":"전환 %q 화질","switched-quality":"전환 됨 %q 화질",ff:"앞으로 %s 초",rew:"뒤로 %s 초","unlimited-danmaku":"끝없는 Danmaku","send-danmaku":"Danmaku 보내기",setting:"설정",fullscreen:"전체 화면","web-fullscreen":"웹 내 전체화면",send:"보내기",screenshot:"화면 캡쳐",airplay:"에어플레이",chromecast:"ChromeCast",subtitle:"부제",off:"끄다","show-subs":"자막 보이기","hide-subs":"자막 숨기기",Volume:"볼륨",live:"생방송","video-info":"비디오 정보"},de:{"danmaku-loading":"Danmaku lädt...",top:"Oben",bottom:"Unten",rolling:"Rollend","input-danmaku-enter":"Drücke Enter nach dem Einfügen vom Danmaku","about-author":"Über den Autor","dplayer-feedback":"DPlayer Feedback","about-dplayer":"Über DPlayer",loop:"Wiederholen",speed:"Geschwindigkeit","opacity-danmaku":"Transparenz für Danmaku",normal:"Normal","please-input-danmaku":"Bitte Danmaku Inhalt eingeben!","set-danmaku-color":"Danmaku Farbe festlegen","set-danmaku-type":"Danmaku Typ festlegen","show-danmaku":"Zeige Danmaku","video-failed":"Das Video konnte nicht geladen werden","danmaku-failed":"Danmaku konnte nicht geladen werden","danmaku-send-failed":"Das senden von Danmaku ist fehgeschlagen","switching-quality":"Wechsle zur %q Qualität","switched-quality":"Zur %q Qualität gewechselt",ff:"%s s Vorwärts",rew:"%s s Zurück","unlimited-danmaku":"Unlimitiertes Danmaku","send-danmaku":"Sende Danmaku",setting:"Einstellungen",fullscreen:"Vollbild","web-fullscreen":"Browser Vollbild",send:"Senden",screenshot:"Screenshot",airplay:"AirPlay","show-subs":"Zeige Untertitel",chromecast:"ChromeCast",subtitle:"Untertitel",off:"Schließung","hide-subs":"Verstecke Untertitel",volume:"Lautstärke",live:"Live","video-info":"Video Info"}},ri=d(730),ai=d.n(ri),oi=d(74),ii=d.n(oi),li=d(437),si=d.n(li),di=d(644),pi=d.n(di),ci=d(324),ui=d.n(ci),Ai=d(574),yi=d.n(Ai),fi=d(300),hi=d.n(fi),mi=d(934),bi=d.n(mi),gi=d(428),vi=d.n(gi),Ei=d(807),xi=d.n(Ei),wi=d(338),Ci=d.n(wi),ki=d(254),Bi=d.n(ki),Si=d(965),Ii=d.n(Si),Li=d(113),Oi=d.n(Li),Ri=d(251),Ti=d.n(Ri),zi=d(410),_i=d.n(zi),Pi=d(182),Di=d.n(Pi),qi=d(193),ji=d.n(qi);const we={play:ai(),pause:ii(),volumeUp:si(),volumeDown:pi(),volumeOff:ui(),full:yi(),fullWeb:hi(),setting:bi(),right:vi(),comment:xi(),commentOff:Ci(),send:Bi(),pallette:Ii(),camera:Oi(),subtitle:_i(),loading:Di(),airplay:Ti(),chromecast:ji()};var Mi=d(916),Ni=d.n(Mi);function Cn(r){return Cn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},Cn(r)}function $r(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(Cn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(Cn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),Cn(i)==="symbol"?i:String(i)),t)}var i}var Fi=function(){function r(i){(function(s,c){if(!(s instanceof c))throw new TypeError("Cannot call a class as a function")})(this,r),this.container=i.container,this.options=i.options,this.index=i.index,this.tran=i.tran,this.init()}var a,p,t;return a=r,t=[{key:"NewNotice",value:function(i,s,c){var f=document.createElement("div");return f.classList.add("dplayer-notice"),f.style.opacity=s,f.innerText=i,c&&(f.id="dplayer-notice-".concat(c)),f}}],(p=[{key:"init",value:function(){this.container.innerHTML=Ni()({options:this.options,index:this.index,tran:this.tran,icons:we,mobile:W.isMobile,video:{current:!0,pic:this.options.video.pic,screenshot:this.options.screenshot,airplay:!(!W.isSafari||W.isChrome)&&this.options.airplay,chromecast:this.options.chromecast,preload:this.options.preload,url:this.options.video.url,subtitle:this.options.subtitle}}),this.volumeBar=this.container.querySelector(".dplayer-volume-bar-inner"),this.volumeBarWrap=this.container.querySelector(".dplayer-volume-bar"),this.volumeBarWrapWrap=this.container.querySelector(".dplayer-volume-bar-wrap"),this.volumeButton=this.container.querySelector(".dplayer-volume"),this.volumeButtonIcon=this.container.querySelector(".dplayer-volume-icon"),this.volumeIcon=this.container.querySelector(".dplayer-volume-icon .dplayer-icon-content"),this.playedBar=this.container.querySelector(".dplayer-played"),this.loadedBar=this.container.querySelector(".dplayer-loaded"),this.playedBarWrap=this.container.querySelector(".dplayer-bar-wrap"),this.playedBarTime=this.container.querySelector(".dplayer-bar-time"),this.danmaku=this.container.querySelector(".dplayer-danmaku"),this.danmakuLoading=this.container.querySelector(".dplayer-danloading"),this.video=this.container.querySelector(".dplayer-video-current"),this.bezel=this.container.querySelector(".dplayer-bezel-icon"),this.playButton=this.container.querySelector(".dplayer-play-icon"),this.mobilePlayButton=this.container.querySelector(".dplayer-mobile-play"),this.videoWrap=this.container.querySelector(".dplayer-video-wrap"),this.controllerMask=this.container.querySelector(".dplayer-controller-mask"),this.ptime=this.container.querySelector(".dplayer-ptime"),this.settingButton=this.container.querySelector(".dplayer-setting-icon"),this.settingBox=this.container.querySelector(".dplayer-setting-box"),this.mask=this.container.querySelector(".dplayer-mask"),this.loop=this.container.querySelector(".dplayer-setting-loop"),this.loopToggle=this.container.querySelector(".dplayer-setting-loop .dplayer-toggle-setting-input"),this.showDanmaku=this.container.querySelector(".dplayer-setting-showdan"),this.showDanmakuToggle=this.container.querySelector(".dplayer-showdan-setting-input"),this.unlimitDanmaku=this.container.querySelector(".dplayer-setting-danunlimit"),this.unlimitDanmakuToggle=this.container.querySelector(".dplayer-danunlimit-setting-input"),this.speed=this.container.querySelector(".dplayer-setting-speed"),this.speedItem=this.container.querySelectorAll(".dplayer-setting-speed-item"),this.danmakuOpacityBar=this.container.querySelector(".dplayer-danmaku-bar-inner"),this.danmakuOpacityBarWrap=this.container.querySelector(".dplayer-danmaku-bar"),this.danmakuOpacityBarWrapWrap=this.container.querySelector(".dplayer-danmaku-bar-wrap"),this.danmakuOpacityBox=this.container.querySelector(".dplayer-setting-danmaku"),this.dtime=this.container.querySelector(".dplayer-dtime"),this.controller=this.container.querySelector(".dplayer-controller"),this.commentInput=this.container.querySelector(".dplayer-comment-input"),this.commentButton=this.container.querySelector(".dplayer-comment-icon"),this.commentSettingBox=this.container.querySelector(".dplayer-comment-setting-box"),this.commentSettingButton=this.container.querySelector(".dplayer-comment-setting-icon"),this.commentSettingFill=this.container.querySelector(".dplayer-comment-setting-icon path"),this.commentSendButton=this.container.querySelector(".dplayer-send-icon"),this.commentSendFill=this.container.querySelector(".dplayer-send-icon path"),this.commentColorSettingBox=this.container.querySelector(".dplayer-comment-setting-color"),this.browserFullButton=this.container.querySelector(".dplayer-full-icon"),this.webFullButton=this.container.querySelector(".dplayer-full-in-icon"),this.menu=this.container.querySelector(".dplayer-menu"),this.menuItem=this.container.querySelectorAll(".dplayer-menu-item"),this.qualityList=this.container.querySelector(".dplayer-quality-list"),this.camareButton=this.container.querySelector(".dplayer-camera-icon"),this.airplayButton=this.container.querySelector(".dplayer-airplay-icon"),this.chromecastButton=this.container.querySelector(".dplayer-chromecast-icon"),this.subtitleButton=this.container.querySelector(".dplayer-subtitle-icon"),this.subtitleButtonInner=this.container.querySelector(".dplayer-subtitle-icon .dplayer-icon-content"),this.subtitlesButton=this.container.querySelector(".dplayer-subtitles-icon"),this.subtitlesBox=this.container.querySelector(".dplayer-subtitles-box"),this.subtitlesItem=this.container.querySelectorAll(".dplayer-subtitles-item"),this.subtitle=this.container.querySelector(".dplayer-subtitle"),this.subtrack=this.container.querySelector(".dplayer-subtrack"),this.qualityButton=this.container.querySelector(".dplayer-quality-icon"),this.barPreview=this.container.querySelector(".dplayer-bar-preview"),this.barWrap=this.container.querySelector(".dplayer-bar-wrap"),this.noticeList=this.container.querySelector(".dplayer-notice-list"),this.infoPanel=this.container.querySelector(".dplayer-info-panel"),this.infoPanelClose=this.container.querySelector(".dplayer-info-panel-close"),this.infoVersion=this.container.querySelector(".dplayer-info-panel-item-version .dplayer-info-panel-item-data"),this.infoFPS=this.container.querySelector(".dplayer-info-panel-item-fps .dplayer-info-panel-item-data"),this.infoType=this.container.querySelector(".dplayer-info-panel-item-type .dplayer-info-panel-item-data"),this.infoUrl=this.container.querySelector(".dplayer-info-panel-item-url .dplayer-info-panel-item-data"),this.infoResolution=this.container.querySelector(".dplayer-info-panel-item-resolution .dplayer-info-panel-item-data"),this.infoDuration=this.container.querySelector(".dplayer-info-panel-item-duration .dplayer-info-panel-item-data"),this.infoDanmakuId=this.container.querySelector(".dplayer-info-panel-item-danmaku-id .dplayer-info-panel-item-data"),this.infoDanmakuApi=this.container.querySelector(".dplayer-info-panel-item-danmaku-api .dplayer-info-panel-item-data"),this.infoDanmakuAmount=this.container.querySelector(".dplayer-info-panel-item-danmaku-amount .dplayer-info-panel-item-data")}}])&&$r(a.prototype,p),t&&$r(a,t),Object.defineProperty(a,"prototype",{writable:!1}),r}();const Zr=Fi;function pn(r){return pn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},pn(r)}function Ui(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(pn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(pn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),pn(i)==="symbol"?i:String(i)),t)}var i}var Hi=function(){function r(t){(function(i,s){if(!(i instanceof s))throw new TypeError("Cannot call a class as a function")})(this,r),this.options=t,this.player=this.options.player,this.container=this.options.container,this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.dan=[],this.showing=!0,this._opacity=this.options.opacity,this.events=this.options.events,this.unlimited=this.options.unlimited,this._measure(""),this.load()}var a,p;return a=r,p=[{key:"load",value:function(){var t,i=this;t=this.options.api.maximum?"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id,"&max=").concat(this.options.api.maximum):"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id);var s=(this.options.api.addition||[]).slice(0);s.push(t),this.events&&this.events.trigger("danmaku_load_start",s),this._readAllEndpoints(s,function(c){i.dan=[].concat.apply([],c).sort(function(f,h){return f.time-h.time}),window.requestAnimationFrame(function(){i.frame()}),i.options.callback(),i.events&&i.events.trigger("danmaku_load_end")})}},{key:"reload",value:function(t){this.options.api=t,this.dan=[],this.clear(),this.load()}},{key:"_readAllEndpoints",value:function(t,i){for(var s=this,c=[],f=0,h=function(I){s.options.apiBackend.read({url:t[I],success:function(P){c[I]=P,++f===t.length&&i(c)},error:function(P){s.options.error(P||s.options.tran("danmaku-failed")),c[I]=[],++f===t.length&&i(c)}})},C=0;C<t.length;++C)h(C)}},{key:"send",value:function(t,i){var s=this,c={token:this.options.api.token,id:this.options.api.id,author:this.options.api.user,time:this.options.time(),text:t.text,color:t.color,type:t.type};this.options.apiBackend.send({url:this.options.api.address+"v3/",data:c,success:i,error:function(h){s.options.error(h||s.options.tran("danmaku-failed"))}}),this.dan.splice(this.danIndex,0,c),this.danIndex++;var f={text:this.htmlEncode(c.text),color:c.color,type:c.type,border:"2px solid ".concat(this.options.borderColor)};this.draw(f),this.events&&this.events.trigger("danmaku_send",c)}},{key:"frame",value:function(){var t=this;if(this.dan.length&&!this.paused&&this.showing){for(var i=this.dan[this.danIndex],s=[];i&&this.options.time()>parseFloat(i.time);)s.push(i),i=this.dan[++this.danIndex];this.draw(s)}window.requestAnimationFrame(function(){t.frame()})}},{key:"opacity",value:function(t){if(t!==void 0){for(var i=this.container.getElementsByClassName("dplayer-danmaku-item"),s=0;s<i.length;s++)i[s].style.opacity=t;this._opacity=t,this.events&&this.events.trigger("danmaku_opacity",this._opacity)}return this._opacity}},{key:"draw",value:function(t){var i=this;if(this.showing){var s=this.options.height,c=this.container.offsetWidth,f=this.container.offsetHeight,h=parseInt(f/s),C=function(D){var H=D.offsetWidth||parseInt(D.style.width),Q=D.getBoundingClientRect().right||i.container.getBoundingClientRect().right+H;return i.container.getBoundingClientRect().right-Q},I=function(D){return(c+D)/5},P=function(D,H,Q){for(var Ae=c/I(Q),de=function(en){var un=i.danTunnel[H][en+""];if(!un||!un.length)return i.danTunnel[H][en+""]=[D],D.addEventListener("animationend",function(){i.danTunnel[H][en+""].splice(0,1)}),{v:en%h};if(H!=="right")return"continue";for(var Fn=0;Fn<un.length;Fn++){var ra=C(un[Fn])-10;if(ra<=c-Ae*I(parseInt(un[Fn].style.width))||ra<=0)break;if(Fn===un.length-1)return i.danTunnel[H][en+""].push(D),D.addEventListener("animationend",function(){i.danTunnel[H][en+""].splice(0,1)}),{v:en%h}}},ae=0;i.unlimited||ae<h;ae++){var Ue=de(ae);if(Ue!=="continue"&&pn(Ue)==="object")return Ue.v}return-1};Object.prototype.toString.call(t)!=="[object Array]"&&(t=[t]);for(var q=document.createDocumentFragment(),M=function(){t[j].type=W.number2Type(t[j].type),t[j].color||(t[j].color=16777215);var D=document.createElement("div");D.classList.add("dplayer-danmaku-item"),D.classList.add("dplayer-danmaku-".concat(t[j].type)),t[j].border?D.innerHTML='<span style="border:'.concat(t[j].border,'">').concat(t[j].text,"</span>"):D.innerHTML=t[j].text,D.style.opacity=i._opacity,D.style.color=W.number2Color(t[j].color),D.addEventListener("animationend",function(){i.container.removeChild(D)});var H,Q=i._measure(t[j].text);switch(t[j].type){case"right":(H=P(D,t[j].type,Q))>=0&&(D.style.width=Q+1+"px",D.style.top=s*H+"px",D.style.transform="translateX(-".concat(c,"px)"));break;case"top":(H=P(D,t[j].type))>=0&&(D.style.top=s*H+"px");break;case"bottom":(H=P(D,t[j].type))>=0&&(D.style.bottom=s*H+"px");break;default:console.error("Can't handled danmaku type: ".concat(t[j].type))}H>=0&&(D.classList.add("dplayer-danmaku-move"),D.style.animationDuration=i._danAnimation(t[j].type),q.appendChild(D))},j=0;j<t.length;j++)M();return this.container.appendChild(q),q}}},{key:"play",value:function(){this.paused=!1}},{key:"pause",value:function(){this.paused=!0}},{key:"_measure",value:function(t){if(!this.context){var i=getComputedStyle(this.container.getElementsByClassName("dplayer-danmaku-item")[0],null);this.context=document.createElement("canvas").getContext("2d"),this.context.font=i.getPropertyValue("font")}return this.context.measureText(t).width}},{key:"seek",value:function(){this.clear();for(var t=0;t<this.dan.length;t++){if(this.dan[t].time>=this.options.time()){this.danIndex=t;break}this.danIndex=this.dan.length}}},{key:"clear",value:function(){this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.options.container.innerHTML="",this.events&&this.events.trigger("danmaku_clear")}},{key:"htmlEncode",value:function(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2f;")}},{key:"resize",value:function(){for(var t=this.container.offsetWidth,i=this.container.getElementsByClassName("dplayer-danmaku-item"),s=0;s<i.length;s++)i[s].style.transform="translateX(-".concat(t,"px)")}},{key:"hide",value:function(){this.showing=!1,this.pause(),this.clear(),this.events&&this.events.trigger("danmaku_hide")}},{key:"show",value:function(){this.seek(),this.showing=!0,this.play(),this.events&&this.events.trigger("danmaku_show")}},{key:"unlimit",value:function(t){this.unlimited=t}},{key:"speed",value:function(t){this.options.api.speedRate=t}},{key:"_danAnimation",value:function(t){var i=this.options.api.speedRate||1,s=!!this.player.fullScreen.isFullScreen();return{top:"".concat((s?6:4)/i,"s"),right:"".concat((s?8:5)/i,"s"),bottom:"".concat((s?6:4)/i,"s")}[t]}}],p&&Ui(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const Wi=Hi;function kn(r){return kn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},kn(r)}function Yi(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(kn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(kn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),kn(i)==="symbol"?i:String(i)),t)}var i}const Qi=function(){function r(){(function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")})(this,r),this.events={},this.videoEvents=["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","mozaudioavailable","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],this.playerEvents=["screenshot","thumbnails_show","thumbnails_hide","danmaku_show","danmaku_hide","danmaku_clear","danmaku_loaded","danmaku_send","danmaku_opacity","contextmenu_show","contextmenu_hide","notice_show","notice_hide","quality_start","quality_end","destroy","resize","fullscreen","fullscreen_cancel","webfullscreen","webfullscreen_cancel","subtitle_show","subtitle_hide","subtitle_change"]}var a,p;return a=r,(p=[{key:"on",value:function(t,i){this.type(t)&&typeof i=="function"&&(this.events[t]||(this.events[t]=[]),this.events[t].push(i))}},{key:"trigger",value:function(t,i){if(this.events[t]&&this.events[t].length)for(var s=0;s<this.events[t].length;s++)this.events[t][s](i)}},{key:"type",value:function(t){return this.playerEvents.indexOf(t)!==-1?"player":this.videoEvents.indexOf(t)!==-1?"video":(console.error("Unknown event name: ".concat(t)),null)}}])&&Yi(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();function Bn(r){return Bn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},Bn(r)}function Ki(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(Bn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(Bn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),Bn(i)==="symbol"?i:String(i)),t)}var i}var Vi=function(){function r(t){var i=this;(function(s,c){if(!(s instanceof c))throw new TypeError("Cannot call a class as a function")})(this,r),this.player=t,this.lastScrollPosition={left:0,top:0},this.player.events.on("webfullscreen",function(){i.player.resize()}),this.player.events.on("webfullscreen_cancel",function(){i.player.resize(),W.setScrollPosition(i.lastScrollPosition)}),this.fullscreenchange=function(){i.player.resize(),i.isFullScreen("browser")?i.player.events.trigger("fullscreen"):(W.setScrollPosition(i.lastScrollPosition),i.player.events.trigger("fullscreen_cancel"))},this.docfullscreenchange=function(){var s=document.fullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;s&&s!==i.player.container||(i.player.resize(),s?i.player.events.trigger("fullscreen"):(W.setScrollPosition(i.lastScrollPosition),i.player.events.trigger("fullscreen_cancel")))},/Firefox/.test(navigator.userAgent)?(document.addEventListener("mozfullscreenchange",this.docfullscreenchange),document.addEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.addEventListener("fullscreenchange",this.fullscreenchange),this.player.container.addEventListener("webkitfullscreenchange",this.fullscreenchange),document.addEventListener("msfullscreenchange",this.docfullscreenchange),document.addEventListener("MSFullscreenChange",this.docfullscreenchange))}var a,p;return a=r,p=[{key:"isFullScreen",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(t){case"browser":return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;case"web":return this.player.container.classList.contains("dplayer-fulled")}}},{key:"request",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser",i=t==="browser"?"web":"browser",s=this.isFullScreen(i);switch(s||(this.lastScrollPosition=W.getScrollPosition()),t){case"browser":this.player.container.requestFullscreen?this.player.container.requestFullscreen():this.player.container.mozRequestFullScreen?this.player.container.mozRequestFullScreen():this.player.container.webkitRequestFullscreen?this.player.container.webkitRequestFullscreen():this.player.video.webkitEnterFullscreen?this.player.video.webkitEnterFullscreen():this.player.video.webkitEnterFullScreen?this.player.video.webkitEnterFullScreen():this.player.container.msRequestFullscreen&&this.player.container.msRequestFullscreen();break;case"web":this.player.container.classList.add("dplayer-fulled"),document.body.classList.add("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen")}s&&this.cancel(i)}},{key:"cancel",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(t){case"browser":document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.webkitCancelFullscreen?document.webkitCancelFullscreen():document.msCancelFullScreen?document.msCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen();break;case"web":this.player.container.classList.remove("dplayer-fulled"),document.body.classList.remove("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen_cancel")}}},{key:"toggle",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";this.isFullScreen(t)?this.cancel(t):this.request(t)}},{key:"destroy",value:function(){/Firefox/.test(navigator.userAgent)?(document.removeEventListener("mozfullscreenchange",this.docfullscreenchange),document.removeEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.removeEventListener("fullscreenchange",this.fullscreenchange),this.player.container.removeEventListener("webkitfullscreenchange",this.fullscreenchange),document.removeEventListener("msfullscreenchange",this.docfullscreenchange),document.removeEventListener("MSFullscreenChange",this.docfullscreenchange))}}],p&&Ki(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const Ji=Vi;function Sn(r){return Sn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},Sn(r)}function $i(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(Sn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(Sn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),Sn(i)==="symbol"?i:String(i)),t)}var i}var Zi=function(){function r(t){(function(i,s){if(!(i instanceof s))throw new TypeError("Cannot call a class as a function")})(this,r),this.storageName={opacity:"dplayer-danmaku-opacity",volume:"dplayer-volume",unlimited:"dplayer-danmaku-unlimited",danmaku:"dplayer-danmaku-show",subtitle:"dplayer-subtitle-show"},this.default={opacity:.7,volume:t.options.hasOwnProperty("volume")?t.options.volume:.7,unlimited:(t.options.danmaku&&t.options.danmaku.unlimited?1:0)||0,danmaku:1,subtitle:1},this.data={},this.init()}var a,p;return a=r,(p=[{key:"init",value:function(){for(var t in this.storageName){var i=this.storageName[t];this.data[t]=parseFloat(W.storage.get(i)||this.default[t])}}},{key:"get",value:function(t){return this.data[t]}},{key:"set",value:function(t,i){this.data[t]=i,W.storage.set(this.storageName[t],i)}}])&&$i(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const Xi=Zi;function In(r){return In=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},In(r)}function Gi(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(In(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(In(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),In(i)==="symbol"?i:String(i)),t)}var i}var el=function(){function r(t,i,s,c){(function(f,h){if(!(f instanceof h))throw new TypeError("Cannot call a class as a function")})(this,r),this.container=t,this.video=i,this.options=s,this.events=c,this.init()}var a,p;return a=r,p=[{key:"init",value:function(){var t=this;if(this.container.style.fontSize=this.options.fontSize,this.container.style.bottom=this.options.bottom,this.container.style.color=this.options.color,this.video.textTracks&&this.video.textTracks[0]){var i=this.video.textTracks[0];i.oncuechange=function(){var s=i.activeCues[i.activeCues.length-1];if(t.container.innerHTML="",s){var c=document.createElement("div");c.appendChild(s.getCueAsHTML());var f=c.innerHTML.split(/\r?\n/).map(function(h){return"<p>".concat(h,"</p>")}).join("");t.container.innerHTML=f}t.events.trigger("subtitle_change")}}}},{key:"show",value:function(){this.container.classList.remove("dplayer-subtitle-hide"),this.events.trigger("subtitle_show")}},{key:"hide",value:function(){this.container.classList.add("dplayer-subtitle-hide"),this.events.trigger("subtitle_hide")}},{key:"toggle",value:function(){this.container.classList.contains("dplayer-subtitle-hide")?this.show():this.hide()}}],p&&Gi(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const nl=el;function Ln(r){return Ln=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},Ln(r)}function tl(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(Ln(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(Ln(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),Ln(i)==="symbol"?i:String(i)),t)}var i}var rl=function(){function r(t){var i=this;(function(h,C){if(!(h instanceof C))throw new TypeError("Cannot call a class as a function")})(this,r),this.player=t,this.player.template.mask.addEventListener("click",function(){i.hide()}),this.player.template.subtitlesButton.addEventListener("click",function(){i.adaptiveHeight(),i.show()});for(var s=this.player.template.subtitlesItem.length-1,c=function(h){i.player.template.subtitlesItem[h].addEventListener("click",function(){i.hide(),i.player.options.subtitle.index!==h&&(i.player.template.subtitle.innerHTML="<p></p>",i.player.template.subtrack.src=i.player.template.subtitlesItem[h].dataset.subtitle,i.player.options.subtitle.index=h,i.player.template.subtitle.classList.contains("dplayer-subtitle-hide")&&i.subContainerShow())})},f=0;f<s;f++)c(f);this.player.template.subtitlesItem[s].addEventListener("click",function(){i.hide(),i.player.options.subtitle.index!==s&&(i.player.template.subtitle.innerHTML="<p></p>",i.player.template.subtrack.src="",i.player.options.subtitle.index=s,i.subContainerHide())})}var a,p;return a=r,(p=[{key:"subContainerShow",value:function(){this.player.template.subtitle.classList.remove("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_show")}},{key:"subContainerHide",value:function(){this.player.template.subtitle.classList.add("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_hide")}},{key:"hide",value:function(){this.player.template.subtitlesBox.classList.remove("dplayer-subtitles-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.subtitlesBox.classList.add("dplayer-subtitles-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}},{key:"adaptiveHeight",value:function(){var t=30*this.player.template.subtitlesItem.length+14,i=.8*this.player.template.videoWrap.offsetHeight;t>=i-50?(this.player.template.subtitlesBox.style.bottom="8px",this.player.template.subtitlesBox.style["max-height"]=i-8+"px"):(this.player.template.subtitlesBox.style.bottom="50px",this.player.template.subtitlesBox.style["max-height"]=i-50+"px")}}])&&tl(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const al=rl;function On(r){return On=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},On(r)}function ol(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(On(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(On(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),On(i)==="symbol"?i:String(i)),t)}var i}var il=function(){function r(t){(function(i,s){if(!(i instanceof s))throw new TypeError("Cannot call a class as a function")})(this,r),this.elements={},this.elements.volume=t.volumeBar,this.elements.played=t.playedBar,this.elements.loaded=t.loadedBar,this.elements.danmaku=t.danmakuOpacityBar}var a,p;return a=r,(p=[{key:"set",value:function(t,i,s){i=Math.max(i,0),i=Math.min(i,1),this.elements[t].style[s]=100*i+"%"}},{key:"get",value:function(t){return parseFloat(this.elements[t].style.width)/100}}])&&ol(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const ll=il;function Rn(r){return Rn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},Rn(r)}function sl(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(Rn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(Rn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),Rn(i)==="symbol"?i:String(i)),t)}var i}var dl=function(){function r(t){(function(i,s){if(!(i instanceof s))throw new TypeError("Cannot call a class as a function")})(this,r),this.player=t,window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(i){window.setTimeout(i,1e3/60)},this.types=["loading","info","fps"],this.init()}var a,p;return a=r,(p=[{key:"init",value:function(){var t=this;this.types.map(function(i){return i!=="fps"&&t["init".concat(i,"Checker")](),i})}},{key:"initloadingChecker",value:function(){var t=this,i=0,s=0,c=!1;this.loadingChecker=setInterval(function(){t.enableloadingChecker&&(s=t.player.video.currentTime,c||s!==i||t.player.video.paused||(t.player.container.classList.add("dplayer-loading"),c=!0),c&&s>i&&!t.player.video.paused&&(t.player.container.classList.remove("dplayer-loading"),c=!1),i=s)},100)}},{key:"initfpsChecker",value:function(){var t=this;window.requestAnimationFrame(function(){if(t.enablefpsChecker)if(t.initfpsChecker(),t.fpsStart){t.fpsIndex++;var i=new Date;i-t.fpsStart>1e3&&(t.player.infoPanel.fps(t.fpsIndex/(i-t.fpsStart)*1e3),t.fpsStart=new Date,t.fpsIndex=0)}else t.fpsStart=new Date,t.fpsIndex=0;else t.fpsStart=0,t.fpsIndex=0})}},{key:"initinfoChecker",value:function(){var t=this;this.infoChecker=setInterval(function(){t.enableinfoChecker&&t.player.infoPanel.update()},1e3)}},{key:"enable",value:function(t){this["enable".concat(t,"Checker")]=!0,t==="fps"&&this.initfpsChecker()}},{key:"disable",value:function(t){this["enable".concat(t,"Checker")]=!1}},{key:"destroy",value:function(){var t=this;this.types.map(function(i){return t["enable".concat(i,"Checker")]=!1,t["".concat(i,"Checker")]&&clearInterval(t["".concat(i,"Checker")]),i})}}])&&sl(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const pl=dl;function Tn(r){return Tn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},Tn(r)}function cl(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(Tn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(Tn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),Tn(i)==="symbol"?i:String(i)),t)}var i}const ul=function(){function r(t){var i=this;(function(s,c){if(!(s instanceof c))throw new TypeError("Cannot call a class as a function")})(this,r),this.container=t,this.container.addEventListener("animationend",function(){i.container.classList.remove("dplayer-bezel-transition")})}var a,p;return a=r,(p=[{key:"switch",value:function(t){this.container.innerHTML=t,this.container.classList.add("dplayer-bezel-transition")}}])&&cl(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();function zn(r){return zn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},zn(r)}function Al(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(zn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(zn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),zn(i)==="symbol"?i:String(i)),t)}var i}var yl=function(){function r(t){(function(i,s){if(!(i instanceof s))throw new TypeError("Cannot call a class as a function")})(this,r),this.container=t.container,this.barWidth=t.barWidth,this.container.style.backgroundImage="url('".concat(t.url,"')"),this.events=t.events}var a,p;return a=r,(p=[{key:"resize",value:function(t,i,s){this.container.style.width="".concat(t,"px"),this.container.style.height="".concat(i,"px"),this.container.style.top="".concat(2-i,"px"),this.barWidth=s}},{key:"show",value:function(){this.container.style.display="block",this.events&&this.events.trigger("thumbnails_show")}},{key:"move",value:function(t){this.container.style.backgroundPosition="-".concat(160*(Math.ceil(t/this.barWidth*100)-1),"px 0"),this.container.style.left="".concat(Math.min(Math.max(t-this.container.offsetWidth/2,-10),this.barWidth-150),"px")}},{key:"hide",value:function(){this.container.style.display="none",this.events&&this.events.trigger("thumbnails_hide")}}])&&Al(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const fl=yl;function _n(r){return _n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_n(r)}function hl(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(_n(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(_n(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),_n(i)==="symbol"?i:String(i)),t)}var i}var Fe,Xr=!0,Mt=!1,ml=function(){function r(t){(function(i,s){if(!(i instanceof s))throw new TypeError("Cannot call a class as a function")})(this,r),this.player=t,this.autoHideTimer=0,W.isMobile||(this.setAutoHideHandler=this.setAutoHide.bind(this),this.player.container.addEventListener("mousemove",this.setAutoHideHandler),this.player.container.addEventListener("click",this.setAutoHideHandler),this.player.on("play",this.setAutoHideHandler),this.player.on("pause",this.setAutoHideHandler)),this.initPlayButton(),this.initThumbnails(),this.initPlayedBar(),this.initFullButton(),this.initQualityButton(),this.initScreenshotButton(),this.player.options.subtitle&&typeof this.player.options.subtitle.url=="string"&&this.initSubtitleButton(),this.initHighlights(),this.initAirplayButton(),this.initChromecastButton(),W.isMobile||this.initVolumeButton()}var a,p;return a=r,(p=[{key:"initPlayButton",value:function(){var t=this;this.player.template.playButton.addEventListener("click",function(){t.player.toggle()}),this.player.template.mobilePlayButton.addEventListener("click",function(){t.player.toggle()}),W.isMobile?(this.player.template.videoWrap.addEventListener("click",function(){t.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){t.toggle()})):this.player.options.preventClickToggle||(this.player.template.videoWrap.addEventListener("click",function(){t.player.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){t.player.toggle()}))}},{key:"initHighlights",value:function(){var t=this;this.player.on("durationchange",function(){if(t.player.video.duration!==1&&t.player.video.duration!==1/0&&t.player.options.highlight){var i=t.player.template.playedBarWrap.querySelectorAll(".dplayer-highlight");[].slice.call(i,0).forEach(function(f){t.player.template.playedBarWrap.removeChild(f)});for(var s=0;s<t.player.options.highlight.length;s++)if(t.player.options.highlight[s].text&&t.player.options.highlight[s].time){var c=document.createElement("div");c.classList.add("dplayer-highlight"),c.style.left=t.player.options.highlight[s].time/t.player.video.duration*100+"%",c.innerHTML='<span class="dplayer-highlight-text">'+t.player.options.highlight[s].text+"</span>",t.player.template.playedBarWrap.insertBefore(c,t.player.template.playedBarTime)}}})}},{key:"initThumbnails",value:function(){var t=this;this.player.options.video.thumbnails&&(this.thumbnails=new fl({container:this.player.template.barPreview,barWidth:this.player.template.barWrap.offsetWidth,url:this.player.options.video.thumbnails,events:this.player.events}),this.player.on("loadedmetadata",function(){t.thumbnails.resize(160,t.player.video.videoHeight/t.player.video.videoWidth*160,t.player.template.barWrap.offsetWidth)}))}},{key:"initPlayedBar",value:function(){var t=this,i=function(c){var f=((c.clientX||c.changedTouches[0].clientX)-W.getBoundingClientRectViewLeft(t.player.template.playedBarWrap))/t.player.template.playedBarWrap.clientWidth;f=Math.max(f,0),f=Math.min(f,1),t.player.bar.set("played",f,"width"),t.player.template.ptime.innerHTML=W.secondToTime(f*t.player.video.duration)},s=function c(f){document.removeEventListener(W.nameMap.dragEnd,c),document.removeEventListener(W.nameMap.dragMove,i);var h=((f.clientX||f.changedTouches[0].clientX)-W.getBoundingClientRectViewLeft(t.player.template.playedBarWrap))/t.player.template.playedBarWrap.clientWidth;h=Math.max(h,0),h=Math.min(h,1),t.player.bar.set("played",h,"width"),t.player.seek(t.player.bar.get("played")*t.player.video.duration),t.player.timer.enable("progress")};this.player.template.playedBarWrap.addEventListener(W.nameMap.dragStart,function(){t.player.timer.disable("progress"),document.addEventListener(W.nameMap.dragMove,i),document.addEventListener(W.nameMap.dragEnd,s)}),this.player.template.playedBarWrap.addEventListener(W.nameMap.dragMove,function(c){if(t.player.video.duration){var f=t.player.template.playedBarWrap.getBoundingClientRect().left,h=(c.clientX||c.changedTouches[0].clientX)-f;if(h<0||h>t.player.template.playedBarWrap.offsetWidth)return;var C=t.player.video.duration*(h/t.player.template.playedBarWrap.offsetWidth);W.isMobile&&t.thumbnails&&t.thumbnails.show(),t.thumbnails&&t.thumbnails.move(h),t.player.template.playedBarTime.style.left="".concat(h-(C>=3600?25:20),"px"),t.player.template.playedBarTime.innerText=W.secondToTime(C),t.player.template.playedBarTime.classList.remove("hidden")}}),this.player.template.playedBarWrap.addEventListener(W.nameMap.dragEnd,function(){W.isMobile&&t.thumbnails&&t.thumbnails.hide()}),W.isMobile||(this.player.template.playedBarWrap.addEventListener("mouseenter",function(){t.player.video.duration&&(t.thumbnails&&t.thumbnails.show(),t.player.template.playedBarTime.classList.remove("hidden"))}),this.player.template.playedBarWrap.addEventListener("mouseleave",function(){t.player.video.duration&&(t.thumbnails&&t.thumbnails.hide(),t.player.template.playedBarTime.classList.add("hidden"))}))}},{key:"initFullButton",value:function(){var t=this;this.player.template.browserFullButton.addEventListener("click",function(){t.player.fullScreen.toggle("browser")}),this.player.template.webFullButton.addEventListener("click",function(){t.player.fullScreen.toggle("web")})}},{key:"initVolumeButton",value:function(){var t=this,i=function(c){var f=c||window.event,h=((f.clientX||f.changedTouches[0].clientX)-W.getBoundingClientRectViewLeft(t.player.template.volumeBarWrap)-5.5)/35;t.player.volume(h)},s=function c(){document.removeEventListener(W.nameMap.dragEnd,c),document.removeEventListener(W.nameMap.dragMove,i),t.player.template.volumeButton.classList.remove("dplayer-volume-active")};this.player.template.volumeBarWrapWrap.addEventListener("click",function(c){var f=c||window.event,h=((f.clientX||f.changedTouches[0].clientX)-W.getBoundingClientRectViewLeft(t.player.template.volumeBarWrap)-5.5)/35;t.player.volume(h)}),this.player.template.volumeBarWrapWrap.addEventListener(W.nameMap.dragStart,function(){document.addEventListener(W.nameMap.dragMove,i),document.addEventListener(W.nameMap.dragEnd,s),t.player.template.volumeButton.classList.add("dplayer-volume-active")}),this.player.template.volumeButtonIcon.addEventListener("click",function(){t.player.video.muted?(t.player.video.muted=!1,t.player.switchVolumeIcon(),t.player.bar.set("volume",t.player.volume(),"width")):(t.player.video.muted=!0,t.player.template.volumeIcon.innerHTML=we.volumeOff,t.player.bar.set("volume",0,"width"))})}},{key:"initQualityButton",value:function(){var t=this;this.player.options.video.quality&&this.player.template.qualityList.addEventListener("click",function(i){i.target.classList.contains("dplayer-quality-item")&&t.player.switchQuality(i.target.dataset.index)})}},{key:"initScreenshotButton",value:function(){var t=this;this.player.options.screenshot&&this.player.template.camareButton.addEventListener("click",function(){var i,s=document.createElement("canvas");s.width=t.player.video.videoWidth,s.height=t.player.video.videoHeight,s.getContext("2d").drawImage(t.player.video,0,0,s.width,s.height),s.toBlob(function(c){i=URL.createObjectURL(c);var f=document.createElement("a");f.href=i,f.download="DPlayer.png",f.style.display="none",document.body.appendChild(f),f.click(),document.body.removeChild(f),URL.revokeObjectURL(i),t.player.events.trigger("screenshot",i)})})}},{key:"initAirplayButton",value:function(){this.player.options.airplay&&(window.WebKitPlaybackTargetAvailabilityEvent?this.player.video.addEventListener("webkitplaybacktargetavailabilitychanged",(function(t){t.availability==="available"?this.template.airplayButton.disable=!1:this.template.airplayButton.disable=!0,this.template.airplayButton.addEventListener("click",(function(){this.video.webkitShowPlaybackTargetPicker()}).bind(this))}).bind(this.player)):this.player.template.airplayButton.style.display="none")}},{key:"initChromecast",value:function(){var t=window.document.createElement("script");t.setAttribute("type","text/javascript"),t.setAttribute("src","https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"),window.document.body.appendChild(t),window.__onGCastApiAvailable=function(i){if(i){var s=new(Fe=window.chrome.cast).SessionRequest(Fe.media.DEFAULT_MEDIA_RECEIVER_APP_ID),c=new Fe.ApiConfig(s,function(){},function(f){f===Fe.ReceiverAvailability.AVAILABLE&&console.log("chromecast: ",f)});Fe.initialize(c,function(){})}}}},{key:"initChromecastButton",value:function(){var t=this;if(this.player.options.chromecast){Xr&&(Xr=!1,this.initChromecast());var i=function(c,f){t.currentMedia=f},s=function(c){console.error("Error launching media",c)};this.player.template.chromecastButton.addEventListener("click",function(){Mt?(Mt=!1,t.currentMedia.stop(),t.session.stop(),t.initChromecast()):(Mt=!0,Fe.requestSession(function(c){var f,h,C;t.session=c,f=t.player.options.video.url,h=new Fe.media.MediaInfo(f),C=new Fe.media.LoadRequest(h),t.session?t.session.loadMedia(C,i.bind(t,"loadMedia"),s).play():window.open(f)},function(c){c.code==="cancel"?t.session=void 0:console.error("Error selecting a cast device",c)}))})}}},{key:"initSubtitleButton",value:function(){var t=this;this.player.events.on("subtitle_show",function(){t.player.template.subtitleButton.dataset.balloon=t.player.tran("hide-subs"),t.player.template.subtitleButtonInner.style.opacity="",t.player.user.set("subtitle",1)}),this.player.events.on("subtitle_hide",function(){t.player.template.subtitleButton.dataset.balloon=t.player.tran("show-subs"),t.player.template.subtitleButtonInner.style.opacity="0.4",t.player.user.set("subtitle",0)}),this.player.template.subtitleButton.addEventListener("click",function(){t.player.subtitle.toggle()})}},{key:"setAutoHide",value:function(){var t=this;this.show(),clearTimeout(this.autoHideTimer),this.autoHideTimer=setTimeout(function(){!t.player.video.played.length||t.player.paused||t.disableAutoHide||t.hide()},3e3)}},{key:"show",value:function(){this.player.container.classList.remove("dplayer-hide-controller")}},{key:"hide",value:function(){this.player.container.classList.add("dplayer-hide-controller"),this.player.setting.hide(),this.player.comment&&this.player.comment.hide()}},{key:"isShow",value:function(){return!this.player.container.classList.contains("dplayer-hide-controller")}},{key:"toggle",value:function(){this.isShow()?this.hide():this.show()}},{key:"destroy",value:function(){W.isMobile||(this.player.container.removeEventListener("mousemove",this.setAutoHideHandler),this.player.container.removeEventListener("click",this.setAutoHideHandler)),clearTimeout(this.autoHideTimer)}}])&&hl(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const bl=ml;function Pn(r){return Pn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},Pn(r)}function gl(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(Pn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(Pn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),Pn(i)==="symbol"?i:String(i)),t)}var i}var vl=function(){function r(t){var i=this;(function(C,I){if(!(C instanceof I))throw new TypeError("Cannot call a class as a function")})(this,r),this.player=t,this.player.template.mask.addEventListener("click",function(){i.hide()}),this.player.template.settingButton.addEventListener("click",function(){i.show()}),this.loop=this.player.options.loop,this.player.template.loopToggle.checked=this.loop,this.player.template.loop.addEventListener("click",function(){i.player.template.loopToggle.checked=!i.player.template.loopToggle.checked,i.player.template.loopToggle.checked?i.loop=!0:i.loop=!1,i.hide()}),this.showDanmaku=this.player.user.get("danmaku"),this.showDanmaku||this.player.danmaku&&this.player.danmaku.hide(),this.player.template.showDanmakuToggle.checked=this.showDanmaku,this.player.template.showDanmaku.addEventListener("click",function(){i.player.template.showDanmakuToggle.checked=!i.player.template.showDanmakuToggle.checked,i.player.template.showDanmakuToggle.checked?(i.showDanmaku=!0,i.player.danmaku.show()):(i.showDanmaku=!1,i.player.danmaku.hide()),i.player.user.set("danmaku",i.showDanmaku?1:0),i.hide()}),this.unlimitDanmaku=this.player.user.get("unlimited"),this.player.template.unlimitDanmakuToggle.checked=this.unlimitDanmaku,this.player.template.unlimitDanmaku.addEventListener("click",function(){i.player.template.unlimitDanmakuToggle.checked=!i.player.template.unlimitDanmakuToggle.checked,i.player.template.unlimitDanmakuToggle.checked?(i.unlimitDanmaku=!0,i.player.danmaku.unlimit(!0)):(i.unlimitDanmaku=!1,i.player.danmaku.unlimit(!1)),i.player.user.set("unlimited",i.unlimitDanmaku?1:0),i.hide()}),this.player.template.speed.addEventListener("click",function(){i.player.template.settingBox.classList.add("dplayer-setting-box-narrow"),i.player.template.settingBox.classList.add("dplayer-setting-box-speed")});for(var s=function(C){i.player.template.speedItem[C].addEventListener("click",function(){i.player.speed(i.player.template.speedItem[C].dataset.speed),i.hide()})},c=0;c<this.player.template.speedItem.length;c++)s(c);if(this.player.danmaku){this.player.on("danmaku_opacity",function(C){i.player.bar.set("danmaku",C,"width"),i.player.user.set("opacity",C)}),this.player.danmaku.opacity(this.player.user.get("opacity"));var f=function(C){var I=C||window.event,P=((I.clientX||I.changedTouches[0].clientX)-W.getBoundingClientRectViewLeft(i.player.template.danmakuOpacityBarWrap))/130;P=Math.max(P,0),P=Math.min(P,1),i.player.danmaku.opacity(P)},h=function C(){document.removeEventListener(W.nameMap.dragEnd,C),document.removeEventListener(W.nameMap.dragMove,f),i.player.template.danmakuOpacityBox.classList.remove("dplayer-setting-danmaku-active")};this.player.template.danmakuOpacityBarWrapWrap.addEventListener("click",function(C){var I=C||window.event,P=((I.clientX||I.changedTouches[0].clientX)-W.getBoundingClientRectViewLeft(i.player.template.danmakuOpacityBarWrap))/130;P=Math.max(P,0),P=Math.min(P,1),i.player.danmaku.opacity(P)}),this.player.template.danmakuOpacityBarWrapWrap.addEventListener(W.nameMap.dragStart,function(){document.addEventListener(W.nameMap.dragMove,f),document.addEventListener(W.nameMap.dragEnd,h),i.player.template.danmakuOpacityBox.classList.add("dplayer-setting-danmaku-active")})}}var a,p;return a=r,(p=[{key:"hide",value:function(){var t=this;this.player.template.settingBox.classList.remove("dplayer-setting-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),setTimeout(function(){t.player.template.settingBox.classList.remove("dplayer-setting-box-narrow"),t.player.template.settingBox.classList.remove("dplayer-setting-box-speed")},300),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.settingBox.classList.add("dplayer-setting-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}}])&&gl(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const El=vl;function Dn(r){return Dn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},Dn(r)}function xl(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(Dn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(Dn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),Dn(i)==="symbol"?i:String(i)),t)}var i}var wl=function(){function r(t){var i=this;(function(s,c){if(!(s instanceof c))throw new TypeError("Cannot call a class as a function")})(this,r),this.player=t,this.player.template.mask.addEventListener("click",function(){i.hide()}),this.player.template.commentButton.addEventListener("click",function(){i.show()}),this.player.template.commentSettingButton.addEventListener("click",function(){i.toggleSetting()}),this.player.template.commentColorSettingBox.addEventListener("click",function(){if(i.player.template.commentColorSettingBox.querySelector("input:checked+span")){var s=i.player.template.commentColorSettingBox.querySelector("input:checked").value;i.player.template.commentSettingFill.style.fill=s,i.player.template.commentInput.style.color=s,i.player.template.commentSendFill.style.fill=s}}),this.player.template.commentInput.addEventListener("click",function(){i.hideSetting()}),this.player.template.commentInput.addEventListener("keydown",function(s){(s||window.event).keyCode===13&&i.send()}),this.player.template.commentSendButton.addEventListener("click",function(){i.send()})}var a,p;return a=r,(p=[{key:"show",value:function(){this.player.controller.disableAutoHide=!0,this.player.template.controller.classList.add("dplayer-controller-comment"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.container.classList.add("dplayer-show-controller"),this.player.template.commentInput.focus()}},{key:"hide",value:function(){this.player.template.controller.classList.remove("dplayer-controller-comment"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.container.classList.remove("dplayer-show-controller"),this.player.controller.disableAutoHide=!1,this.hideSetting()}},{key:"showSetting",value:function(){this.player.template.commentSettingBox.classList.add("dplayer-comment-setting-open")}},{key:"hideSetting",value:function(){this.player.template.commentSettingBox.classList.remove("dplayer-comment-setting-open")}},{key:"toggleSetting",value:function(){this.player.template.commentSettingBox.classList.contains("dplayer-comment-setting-open")?this.hideSetting():this.showSetting()}},{key:"send",value:function(){var t=this;this.player.template.commentInput.blur(),this.player.template.commentInput.value.replace(/^\s+|\s+$/g,"")?this.player.danmaku.send({text:this.player.template.commentInput.value,color:W.color2Number(this.player.container.querySelector(".dplayer-comment-setting-color input:checked").value),type:parseInt(this.player.container.querySelector(".dplayer-comment-setting-type input:checked").value)},function(){t.player.template.commentInput.value="",t.hide()}):this.player.notice(this.player.tran("please-input-danmaku"))}}])&&xl(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const Cl=wl;function qn(r){return qn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},qn(r)}function kl(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(qn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(qn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),qn(i)==="symbol"?i:String(i)),t)}var i}var Bl=function(){function r(t){(function(i,s){if(!(i instanceof s))throw new TypeError("Cannot call a class as a function")})(this,r),this.player=t,this.doHotKeyHandler=this.doHotKey.bind(this),this.cancelFullScreenHandler=this.cancelFullScreen.bind(this),this.player.options.hotkey&&document.addEventListener("keydown",this.doHotKeyHandler),document.addEventListener("keydown",this.cancelFullScreenHandler)}var a,p;return a=r,(p=[{key:"doHotKey",value:function(t){if(this.player.focus){var i=document.activeElement.tagName.toUpperCase(),s=document.activeElement.getAttribute("contenteditable");if(i!=="INPUT"&&i!=="TEXTAREA"&&s!==""&&s!=="true"){var c,f=t||window.event;switch(f.keyCode){case 32:f.preventDefault(),this.player.toggle();break;case 37:if(f.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime-5),this.player.controller.setAutoHide();break;case 39:if(f.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime+5),this.player.controller.setAutoHide();break;case 38:f.preventDefault(),c=this.player.volume()+.1,this.player.volume(c);break;case 40:f.preventDefault(),c=this.player.volume()-.1,this.player.volume(c)}}}}},{key:"cancelFullScreen",value:function(t){(t||window.event).keyCode===27&&this.player.fullScreen.isFullScreen("web")&&this.player.fullScreen.cancel("web")}},{key:"destroy",value:function(){this.player.options.hotkey&&document.removeEventListener("keydown",this.doHotKeyHandler),document.removeEventListener("keydown",this.cancelFullScreenHandler)}}])&&kl(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const Sl=Bl;function jn(r){return jn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},jn(r)}function Il(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(jn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(jn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),jn(i)==="symbol"?i:String(i)),t)}var i}var Ll=function(){function r(t){var i=this;(function(s,c){if(!(s instanceof c))throw new TypeError("Cannot call a class as a function")})(this,r),this.player=t,this.shown=!1,Array.prototype.slice.call(this.player.template.menuItem).forEach(function(s,c){i.player.options.contextmenu[c].click&&s.addEventListener("click",function(){i.player.options.contextmenu[c].click(i.player),i.hide()})}),this.contextmenuHandler=function(s){if(i.shown)i.hide();else{var c=s||window.event;c.preventDefault();var f=i.player.container.getBoundingClientRect();i.show(c.clientX-f.left,c.clientY-f.top),i.player.template.mask.addEventListener("click",function(){i.hide()})}},this.player.container.addEventListener("contextmenu",this.contextmenuHandler)}var a,p;return a=r,(p=[{key:"show",value:function(t,i){this.player.template.menu.classList.add("dplayer-menu-show");var s=this.player.container.getBoundingClientRect();t+this.player.template.menu.offsetWidth>=s.width?(this.player.template.menu.style.right=s.width-t+"px",this.player.template.menu.style.left="initial"):(this.player.template.menu.style.left=t+"px",this.player.template.menu.style.right="initial"),i+this.player.template.menu.offsetHeight>=s.height?(this.player.template.menu.style.bottom=s.height-i+"px",this.player.template.menu.style.top="initial"):(this.player.template.menu.style.top=i+"px",this.player.template.menu.style.bottom="initial"),this.player.template.mask.classList.add("dplayer-mask-show"),this.shown=!0,this.player.events.trigger("contextmenu_show")}},{key:"hide",value:function(){this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.template.menu.classList.remove("dplayer-menu-show"),this.shown=!1,this.player.events.trigger("contextmenu_hide")}},{key:"destroy",value:function(){this.player.container.removeEventListener("contextmenu",this.contextmenuHandler)}}])&&Il(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const Ol=Ll;function Mn(r){return Mn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},Mn(r)}function Rl(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,(i=function(s,c){if(Mn(s)!=="object"||s===null)return s;var f=s[Symbol.toPrimitive];if(f!==void 0){var h=f.call(s,"string");if(Mn(h)!=="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(s)}(t.key),Mn(i)==="symbol"?i:String(i)),t)}var i}var Tl=function(){function r(t){var i=this;(function(s,c){if(!(s instanceof c))throw new TypeError("Cannot call a class as a function")})(this,r),this.container=t.template.infoPanel,this.template=t.template,this.video=t.video,this.player=t,this.template.infoPanelClose.addEventListener("click",function(){i.hide()})}var a,p;return a=r,(p=[{key:"show",value:function(){this.beginTime=Date.now(),this.update(),this.player.timer.enable("info"),this.player.timer.enable("fps"),this.container.classList.remove("dplayer-info-panel-hide")}},{key:"hide",value:function(){this.player.timer.disable("info"),this.player.timer.disable("fps"),this.container.classList.add("dplayer-info-panel-hide")}},{key:"triggle",value:function(){this.container.classList.contains("dplayer-info-panel-hide")?this.show():this.hide()}},{key:"update",value:function(){this.template.infoVersion.innerHTML="v".concat("1.27.1"," ").concat("v1.27.0-12-g4f61091"),this.template.infoType.innerHTML=this.player.type,this.template.infoUrl.innerHTML=this.player.options.video.url,this.template.infoResolution.innerHTML="".concat(this.player.video.videoWidth," x ").concat(this.player.video.videoHeight),this.template.infoDuration.innerHTML=this.player.video.duration,this.player.options.danmaku&&(this.template.infoDanmakuId.innerHTML=this.player.options.danmaku.id,this.template.infoDanmakuApi.innerHTML=this.player.options.danmaku.api,this.template.infoDanmakuAmount.innerHTML=this.player.danmaku.dan.length)}},{key:"fps",value:function(t){this.template.infoFPS.innerHTML="".concat(t.toFixed(1))}}])&&Rl(a.prototype,p),Object.defineProperty(a,"prototype",{writable:!1}),r}();const zl=Tl;var _l=d(568),Pl=d.n(_l);function Nn(r){return Nn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},Nn(r)}function Gr(r,a){var p=Object.keys(r);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(r);a&&(t=t.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),p.push.apply(p,t)}return p}function Dl(r,a,p){return(a=na(a))in r?Object.defineProperty(r,a,{value:p,enumerable:!0,configurable:!0,writable:!0}):r[a]=p,r}function ea(r,a){for(var p=0;p<a.length;p++){var t=a[p];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,na(t.key),t)}}function na(r){var a=function(p,t){if(Nn(p)!=="object"||p===null)return p;var i=p[Symbol.toPrimitive];if(i!==void 0){var s=i.call(p,"string");if(Nn(s)!=="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(r);return Nn(a)==="symbol"?a:String(a)}var ta=0,cn=[],ql=function(){function r(i){var s=this;(function(c,f){if(!(c instanceof f))throw new TypeError("Cannot call a class as a function")})(this,r),this.options=function(c){var f={container:c.element||document.getElementsByClassName("dplayer")[0],live:!1,autoplay:!1,theme:"#b7daff",loop:!1,lang:(navigator.language||navigator.browserLanguage).toLowerCase(),screenshot:!1,airplay:!0,chromecast:!1,hotkey:!0,preload:"metadata",volume:.7,playbackSpeed:[.5,.75,1,1.25,1.5,2],apiBackend:ni,video:{},contextmenu:[],mutex:!0,pluginOptions:{hls:{},flv:{},dash:{},webtorrent:{}},preventClickToggle:!1};for(var h in f)f.hasOwnProperty(h)&&!c.hasOwnProperty(h)&&(c[h]=f[h]);return c.video&&!c.video.type&&(c.video.type="auto"),qt(c.danmaku)==="object"&&c.danmaku&&!c.danmaku.user&&(c.danmaku.user="DIYgod"),c.subtitle&&(!c.subtitle.type&&(c.subtitle.type="webvtt"),!c.subtitle.fontSize&&(c.subtitle.fontSize="20px"),!c.subtitle.bottom&&(c.subtitle.bottom="40px"),!c.subtitle.color&&(c.subtitle.color="#fff")),c.video.quality&&(c.video.url=c.video.quality[c.video.defaultQuality].url),c.lang&&(c.lang=c.lang.toLowerCase()),c.contextmenu=c.contextmenu.concat([{key:"video-info",click:function(C){C.infoPanel.triggle()}},{key:"about-author",link:"https://diygod.me"},{text:"DPlayer v".concat("1.27.1"),link:"https://github.com/MoePlayer/DPlayer"}]),c}(function(c){for(var f=1;f<arguments.length;f++){var h=arguments[f]!=null?arguments[f]:{};f%2?Gr(Object(h),!0).forEach(function(C){Dl(c,C,h[C])}):Object.getOwnPropertyDescriptors?Object.defineProperties(c,Object.getOwnPropertyDescriptors(h)):Gr(Object(h)).forEach(function(C){Object.defineProperty(c,C,Object.getOwnPropertyDescriptor(h,C))})}return c}({preload:i.video.type==="webtorrent"?"none":"metadata"},i)),this.options.video.quality&&(this.qualityIndex=this.options.video.defaultQuality,this.quality=this.options.video.quality[this.options.video.defaultQuality]),this.tran=new ti(this.options.lang).tran,this.events=new Qi,this.user=new Xi(this),this.container=this.options.container,this.noticeList={},this.container.classList.add("dplayer"),this.options.danmaku||this.container.classList.add("dplayer-no-danmaku"),this.options.live?this.container.classList.add("dplayer-live"):this.container.classList.remove("dplayer-live"),W.isMobile&&this.container.classList.add("dplayer-mobile"),this.arrow=this.container.offsetWidth<=500,this.arrow&&this.container.classList.add("dplayer-arrow"),this.options.subtitle&&Array.isArray(this.options.subtitle.url)&&(this.options.subtitle.url.push({subtitle:"",lang:"off"}),this.options.subtitle.defaultSubtitle&&(typeof this.options.subtitle.defaultSubtitle=="string"?this.options.subtitle.index=this.options.subtitle.url.findIndex(function(c){return c.lang===s.options.subtitle.defaultSubtitle||c.name===s.options.subtitle.defaultSubtitle}):typeof this.options.subtitle.defaultSubtitle=="number"&&(this.options.subtitle.index=this.options.subtitle.defaultSubtitle)),(this.options.subtitle.index===-1||!this.options.subtitle.index||this.options.subtitle.index>this.options.subtitle.url.length-1)&&(this.options.subtitle.index=this.options.subtitle.url.findIndex(function(c){return c.lang===s.options.lang})),this.options.subtitle.index===-1&&(this.options.subtitle.index=this.options.subtitle.url.length-1)),this.template=new Zr({container:this.container,options:this.options,index:ta,tran:this.tran}),this.video=this.template.video,this.bar=new ll(this.template),this.bezel=new ul(this.template.bezel),this.fullScreen=new Ji(this),this.controller=new bl(this),this.options.danmaku&&(this.danmaku=new Wi({player:this,container:this.template.danmaku,opacity:this.user.get("opacity"),callback:function(){setTimeout(function(){s.template.danmakuLoading.style.display="none",s.options.autoplay&&s.play()},0)},error:function(c){s.notice(c)},apiBackend:this.options.apiBackend,borderColor:this.options.theme,height:this.arrow?24:30,time:function(){return s.video.currentTime},unlimited:this.user.get("unlimited"),api:{id:this.options.danmaku.id,address:this.options.danmaku.api,token:this.options.danmaku.token,maximum:this.options.danmaku.maximum,addition:this.options.danmaku.addition,user:this.options.danmaku.user,speedRate:this.options.danmaku.speedRate},events:this.events,tran:function(c){return s.tran(c)}}),this.comment=new Cl(this)),this.setting=new El(this),this.plugins={},this.docClickFun=function(){s.focus=!1},this.containerClickFun=function(){s.focus=!0},document.addEventListener("click",this.docClickFun,!0),this.container.addEventListener("click",this.containerClickFun,!0),this.paused=!0,this.timer=new pl(this),this.hotkey=new Sl(this),this.contextmenu=new Ol(this),this.initVideo(this.video,this.quality&&this.quality.type||this.options.video.type),this.infoPanel=new zl(this),!this.danmaku&&this.options.autoplay&&this.play(),ta++,cn.push(this)}var a,p,t;return a=r,p=[{key:"seek",value:function(i){i=Math.max(i,0),this.video.duration&&(i=Math.min(i,this.video.duration)),this.video.currentTime<i?this.notice("".concat(this.tran("ff").replace("%s",(i-this.video.currentTime).toFixed(0)))):this.video.currentTime>i&&this.notice("".concat(this.tran("rew").replace("%s",(this.video.currentTime-i).toFixed(0)))),this.video.currentTime=i,this.danmaku&&this.danmaku.seek(),this.bar.set("played",i/this.video.duration,"width"),this.template.ptime.innerHTML=W.secondToTime(i)}},{key:"play",value:function(i){var s=this;if(this.paused=!1,this.video.paused&&!W.isMobile&&this.bezel.switch(we.play),this.template.playButton.innerHTML=we.pause,this.template.mobilePlayButton.innerHTML=we.pause,i||ze.resolve(this.video.play()).catch(function(){s.pause()}).then(function(){}),this.timer.enable("loading"),this.container.classList.remove("dplayer-paused"),this.container.classList.add("dplayer-playing"),this.danmaku&&this.danmaku.play(),this.options.mutex)for(var c=0;c<cn.length;c++)this!==cn[c]&&cn[c].pause()}},{key:"pause",value:function(i){this.paused=!0,this.container.classList.remove("dplayer-loading"),this.video.paused||W.isMobile||this.bezel.switch(we.pause),this.template.playButton.innerHTML=we.play,this.template.mobilePlayButton.innerHTML=we.play,i||this.video.pause(),this.timer.disable("loading"),this.container.classList.remove("dplayer-playing"),this.container.classList.add("dplayer-paused"),this.danmaku&&this.danmaku.pause()}},{key:"switchVolumeIcon",value:function(){this.volume()>=.95?this.template.volumeIcon.innerHTML=we.volumeUp:this.volume()>0?this.template.volumeIcon.innerHTML=we.volumeDown:this.template.volumeIcon.innerHTML=we.volumeOff}},{key:"volume",value:function(i,s,c){if(i=parseFloat(i),!isNaN(i)){i=Math.max(i,0),i=Math.min(i,1),this.bar.set("volume",i,"width");var f="".concat((100*i).toFixed(0),"%");this.template.volumeBarWrapWrap.dataset.balloon=f,s||this.user.set("volume",i),c||this.notice("".concat(this.tran("volume")," ").concat((100*i).toFixed(0),"%"),void 0,void 0,"volume"),this.video.volume=i,this.video.muted&&(this.video.muted=!1),this.switchVolumeIcon()}return this.video.volume}},{key:"toggle",value:function(){this.video.paused?this.play():this.pause()}},{key:"on",value:function(i,s){this.events.on(i,s)}},{key:"switchVideo",value:function(i,s){this.pause(),this.video.poster=i.pic?i.pic:"",this.video.src=i.url,this.initMSE(this.video,i.type||"auto"),s&&(this.template.danmakuLoading.style.display="block",this.bar.set("played",0,"width"),this.bar.set("loaded",0,"width"),this.template.ptime.innerHTML="00:00",this.template.danmaku.innerHTML="",this.danmaku&&this.danmaku.reload({id:s.id,address:s.api,token:s.token,maximum:s.maximum,addition:s.addition,user:s.user}))}},{key:"initMSE",value:function(i,s){var c=this;if(this.type=s,this.options.video.customType&&this.options.video.customType[s])Object.prototype.toString.call(this.options.video.customType[s])==="[object Function]"?this.options.video.customType[s](this.video,this):console.error("Illegal customType: ".concat(s));else switch(this.type==="auto"&&(/m3u8(#|\?|$)/i.exec(i.src)?this.type="hls":/.flv(#|\?|$)/i.exec(i.src)?this.type="flv":/.mpd(#|\?|$)/i.exec(i.src)?this.type="dash":this.type="normal"),this.type==="hls"&&(i.canPlayType("application/x-mpegURL")||i.canPlayType("application/vnd.apple.mpegURL"))&&(this.type="normal"),this.type){case"hls":if(window.Hls)if(window.Hls.isSupported()){var f=this.options.pluginOptions.hls,h=new window.Hls(f);this.plugins.hls=h,h.loadSource(i.src),h.attachMedia(i),this.events.on("destroy",function(){h.destroy(),delete c.plugins.hls})}else this.notice("Error: Hls is not supported.");else this.notice("Error: Can't find Hls.");break;case"flv":if(window.flvjs)if(window.flvjs.isSupported()){var C=window.flvjs.createPlayer(Object.assign(this.options.pluginOptions.flv.mediaDataSource||{},{type:"flv",url:i.src}),this.options.pluginOptions.flv.config);this.plugins.flvjs=C,C.attachMediaElement(i),C.load(),this.events.on("destroy",function(){C.unload(),C.detachMediaElement(),C.destroy(),delete c.plugins.flvjs})}else this.notice("Error: flvjs is not supported.");else this.notice("Error: Can't find flvjs.");break;case"dash":if(window.dashjs){var I=window.dashjs.MediaPlayer().create().initialize(i,i.src,!1),P=this.options.pluginOptions.dash;I.updateSettings(P),this.plugins.dash=I,this.events.on("destroy",function(){window.dashjs.MediaPlayer().reset(),delete c.plugins.dash})}else this.notice("Error: Can't find dashjs.");break;case"webtorrent":if(window.WebTorrent)if(window.WebTorrent.WEBRTC_SUPPORT){this.container.classList.add("dplayer-loading");var q=this.options.pluginOptions.webtorrent,M=new window.WebTorrent(q);this.plugins.webtorrent=M;var j=i.src;i.src="",i.preload="metadata",i.addEventListener("durationchange",function(){return c.container.classList.remove("dplayer-loading")},{once:!0}),M.add(j,function(D){D.files.find(function(H){return H.name.endsWith(".mp4")}).renderTo(c.video,{autoplay:c.options.autoplay,controls:!1})}),this.events.on("destroy",function(){M.remove(j),M.destroy(),delete c.plugins.webtorrent})}else this.notice("Error: Webtorrent is not supported.");else this.notice("Error: Can't find Webtorrent.")}}},{key:"initVideo",value:function(i,s){var c=this;this.initMSE(i,s),this.on("durationchange",function(){i.duration!==1&&i.duration!==1/0&&(c.template.dtime.innerHTML=W.secondToTime(i.duration))}),this.on("progress",function(){var C=i.buffered.length?i.buffered.end(i.buffered.length-1)/i.duration:0;c.bar.set("loaded",C,"width")}),this.on("error",function(){c.video.error&&c.tran&&c.notice&&c.type!=="webtorrent"&&c.notice(c.tran("video-failed"))}),this.on("ended",function(){c.bar.set("played",1,"width"),c.setting.loop?(c.seek(0),c.play()):c.pause(),c.danmaku&&(c.danmaku.danIndex=0)}),this.on("play",function(){c.paused&&c.play(!0)}),this.on("pause",function(){c.paused||c.pause(!0)}),this.on("timeupdate",function(){c.bar.set("played",c.video.currentTime/c.video.duration,"width");var C=W.secondToTime(c.video.currentTime);c.template.ptime.innerHTML!==C&&(c.template.ptime.innerHTML=C)});for(var f=function(C){i.addEventListener(c.events.videoEvents[C],function(I){c.events.trigger(c.events.videoEvents[C],I)})},h=0;h<this.events.videoEvents.length;h++)f(h);this.volume(this.user.get("volume"),!0,!0),this.options.subtitle&&(this.subtitle=new nl(this.template.subtitle,this.video,this.options.subtitle,this.events),Array.isArray(this.options.subtitle.url)&&(this.subtitles=new al(this)),this.user.get("subtitle")||this.subtitle.hide())}},{key:"switchQuality",value:function(i){var s=this;if(i=typeof i=="string"?parseInt(i):i,this.qualityIndex!==i&&!this.switchingQuality){this.prevIndex=this.qualityIndex,this.qualityIndex=i,this.switchingQuality=!0,this.quality=this.options.video.quality[i],this.template.qualityButton.innerHTML=this.quality.name;var c=this.video.paused;this.video.pause();var f=Pl()({current:!1,pic:null,screenshot:this.options.screenshot,preload:"auto",url:this.quality.url,subtitle:this.options.subtitle}),h=new DOMParser().parseFromString(f,"text/html").body.firstChild;this.template.videoWrap.insertBefore(h,this.template.videoWrap.getElementsByTagName("div")[0]),this.prevVideo=this.video,this.video=h,this.initVideo(this.video,this.quality.type||this.options.video.type),this.seek(this.prevVideo.currentTime),this.notice("".concat(this.tran("switching-quality").replace("%q",this.quality.name)),-1,void 0,"switch-quality"),this.events.trigger("quality_start",this.quality),this.on("canplay",function(){if(s.prevVideo){if(s.video.currentTime!==s.prevVideo.currentTime)return void s.seek(s.prevVideo.currentTime);s.template.videoWrap.removeChild(s.prevVideo),s.video.classList.add("dplayer-video-current"),c||s.video.play(),s.prevVideo=null,s.notice("".concat(s.tran("switched-quality").replace("%q",s.quality.name)),void 0,void 0,"switch-quality"),s.switchingQuality=!1,s.events.trigger("quality_end")}}),this.on("error",function(){s.video.error&&s.prevVideo&&(s.template.videoWrap.removeChild(s.video),s.video=s.prevVideo,c||s.video.play(),s.qualityIndex=s.prevIndex,s.quality=s.options.video.quality[s.qualityIndex],s.noticeTime=setTimeout(function(){s.template.notice.style.opacity=0,s.events.trigger("notice_hide")},3e3),s.prevVideo=null,s.switchingQuality=!1)})}}},{key:"notice",value:function(i){var s,c,f,h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2e3,C=arguments.length>2&&arguments[2]!==void 0?arguments[2]:.8,I=arguments.length>3?arguments[3]:void 0;if(I&&((s=document.getElementById("dplayer-notice-".concat(I)))&&(s.innerHTML=i),this.noticeList[I]&&(clearTimeout(this.noticeList[I]),this.noticeList[I]=null)),!s){var P=Zr.NewNotice(i,C,I);this.template.noticeList.appendChild(P),s=P}this.events.trigger("notice_show",s),h>0&&(this.noticeList[I]=setTimeout((c=s,f=this,function(){c.addEventListener("animationend",function(){f.template.noticeList.removeChild(c)}),c.classList.add("remove-notice"),f.events.trigger("notice_hide"),f.noticeList[I]=null}),h))}},{key:"resize",value:function(){this.danmaku&&this.danmaku.resize(),this.controller.thumbnails&&this.controller.thumbnails.resize(160,this.video.videoHeight/this.video.videoWidth*160,this.template.barWrap.offsetWidth),this.events.trigger("resize")}},{key:"speed",value:function(i){this.video.playbackRate=i}},{key:"destroy",value:function(){cn.splice(cn.indexOf(this),1),this.pause(),document.removeEventListener("click",this.docClickFun,!0),this.container.removeEventListener("click",this.containerClickFun,!0),this.fullScreen.destroy(),this.hotkey.destroy(),this.contextmenu.destroy(),this.controller.destroy(),this.timer.destroy(),this.video.src="",this.container.innerHTML="",this.events.trigger("destroy")}}],t=[{key:"version",get:function(){return"1.27.1"}}],p&&ea(a.prototype,p),t&&ea(a,t),Object.defineProperty(a,"prototype",{writable:!1}),r}();const jl=ql;console.log(`
`.concat(" %c DPlayer v","1.27.1"," ").concat("v1.27.0-12-g4f61091"," %c https://dplayer.diygod.dev ",`
`,`
`),"color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;");const Ml=jl})(),y.default})())})(Lo);var xc=Lo.exports;const wc=Ec(xc),Cc={id:"dplayer",style:{width:"100%",height:"100vh"}},kc={__name:"VideoPlay",setup(e){const n=gt();let o;return Ve(()=>{let l=n.query.url;o=new wc({container:document.getElementById("dplayer"),video:{url:l,type:"auto"}})}),ns(()=>{o.destroy()}),(l,d)=>(Y(),se("div",Cc))}},Bc=["src"],Sc={__name:"AudioPlay",setup(e){const n=gt(),o=oe();return Ve(()=>{o.value=n.query.url}),(l,d)=>(Y(),se("div",null,[K("audio",{src:o.value,controls:""},null,8,Bc)]))}},Ic=["src"],Lc={__name:"HtmlVideoPlay",setup(e){const n=gt(),o=oe("");return Ve(()=>{o.value=n.query.url}),(l,d)=>(Y(),se("div",null,[K("video",{style:{width:"100%",height:"100%"},src:o.value,controls:""},null,8,Ic)]))}},Oc=[{path:"/",component:gc},{path:"/VideoPlay",component:kc},{path:"/HtmlVideoPlay",component:Lc},{path:"/AudioPlay",component:Sc}],Rc=dd({history:js(),routes:Oc});const Pa="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAABUCAYAAADplZtxAAAHFUlEQVR4nO2deYwURRSHv10WcRdQAaPhCOABCoRDFFSI4oWCojGIxGMFo1hgMAYIgcglKt5BiBCTbQ5FUQRvwHAYwqEGNGIEbwFFhICCKMsqgqD+8WbcYbaru6t7umd2pr9ks5O697fV3a9eva4pqqiooJbTAeic+LwZ+CLKzpVSrmVKIhiHGycDpwI7gcMG9eoDo4EhQItE2i5gLvAE8GcGxxiI4iz23QtYD+wFtiZ+vwA081C3GbAJmEy1wADNgYnA10DLzA01GNkSeSSwBrgIqJtIawgMBr4BOrnUfws4yyG/JfBasCFmjmyIfBnwjEN+Q2ABUKTJvwvo7qGf7sAwo5GFRDZEHuqhTHtETDv6GvTV26BsaEQtcilwlcey3TTpbreSVLrg/jfWRR6ioRG1yCVAPY9lyzTpVQb9HQT+0eT1A5YBPwG/IM+CmcCZBu17ImqRDyJ/jBd+1qSvNejvA5u0EmApsAToA5yO/EPPAYYD2xCzMGNkSuQyxHzyMksXemzzVU26idXwsk3am8B1LvVmAQMM+nEkqMjNgJeQy20nsA+YDTRyqDMV+Mil3ceAjZq89Yh97MaURNlUBgPXe6gLMB2xdAITROS2yDK2nOoHRwPgbuBT4DSHun2BlZq8icB4l74fQmxtHaMT7aQz2KXdVJoDdxiU1xJkWV0BNNHktQaeQ3/J/QZcA1yCXLplwA7kUv7eY//TkVtPOdUWx2ZgPrDbpnwjvNnXqXQxLG+LX5HPQxYVTtyIiL3docz7iR+/7Aae9li2MWJCmtDYsLwtfm8XXT2UqUOGZkKG2Iu500hn4RjhV2Svne/x2X4YVGJm/kGwq+x//Iq8BrEonNgCbPDZfliYOM83oTcjjfArchXwiEuZyT7bDpMleBf6vkx1GsSEmwmM0+QNBV4J0HaYDEPscB37gJ7YrxZLESvFq2sACL4z8jhiRg0AmiJ+gIXIDkUuMx5ZRCngfESHA8A7yMZB6g5NHeBe4HZkq6s+YoKuQ8zIdW6dFeXBHl+YnAEsRxZeOmYrpe5xaiSb20+5TlPgQ5wFBhhiWdY8pwKxyHpmIEJ7YZBlWbfpMp1EbgOMQB5uPbyPLS/oBNxkWOd+XYZO5AeB74BpwKPIZfMu5svS2oqbK9SObpZlnWGXYSfyUOxt3GuBRT46r420cC9Sg2LgXF1GOqMcGuqHbOPnO0d81jtml5gucnvcn6aFIPI2H3WOAJ/bZaSLXAUcdWms0scAahtL0cxKB5Yrpez82DVE3gG859DQX+h3NPKJ7YjbwIRndRl29+SJ6GfzGGQvrxAYiVhVXpiolFqly7QTeSPibF9NdczCt8DNiIFeKPyLBEXOdyhzDBiilJri1JDOQfQlcAVwCnAiueV8j5JjyGbqVMR71xmZmPuRWW4ppdz86q5euN8DDjJf+IwAwYu5EAReW6kHXGpZ1tnIrWUHsE4pVSOMLBbZnBMQA2AUNYN4DluWNQOYpJQ6lEyMvXBmNAE+Qbbe7KKk6iGBNV9ZltU6mRiLbMYyoKOHcq2BFZZlnQSxyCZMQh8zbUdb5AWhePvJI6XAD0iYrQmHgIGpM7krsom4EnjSR4P5TC/86VEKXJ20Lu4Enk/J7I1EZ/ZAnPeFjtObVm60K0YCA+2cIU2QLe8YCQvwTVJk3YsplxPfNsA5MtW1bmxdeGMt8r6LKX8DK4qBxYif2I7VZCh8tJZzADEKTFkAvF2MRLePsSnwBzDW/7jyjgmYGQF7gHFKqaPJ28UMJHL+DWTZOAtoh2bPqkCpRHbsbbeYbMr2VUrtguMdRGsxD5IuNLYh2/7T0L+WvAgYrpTal0yIvXDmVCJriAnIeqINYuJtBVYppX5MrxCL7J/dwIteTm6JTbgIiEWOgFjkCIhFjoBY5AiIRY4AnchlyGFM25GIov5RDSgf0dnJy5E3+AFaIcvtQchrWTGG2M3k/lQLnIqdEynGA3Yi6w46akWGTjIpNOxEtnvdNZnux3Fd8NiJvAF4Ki2tCngg/OHkJ7oH31jkuIU+wK/AHHL/fekomIIc3zPXpJKTF25Z4iemmo+RE2CMiF2dZiz2Uyle8UVALHIExCJHQCxyBGRK5AZImH+MDUFFrotEyRxEDkgyOQuzYAgq8lTglsTnhkgo04UB28w7gohcAtxgk25y5nxBEETko8ibq+lE+o01ASlCNihCNQCCNj6C46M+5wGvB2wzSm5FAisfDrOToMvqLchBJFcipwekn7yd6yTPVAp1JmfCd7GfHPp2GkPmIN++E6qfPHYQySQJlWyv+MqRo2jKszyOUMnmTC6nevc7eQ6b0wEeOjoix6LnbGx1Nmdy+qLFzyKmJ/JlAWvQHzOcdbIpcvpR5n6ONr845fMFAcYSKtm8XSxCDuMYmPjsx0KxkBVmB2pu/uYM/wGLGkDtW01H/QAAAABJRU5ErkJggg==";/*!
 * Vue-Lazyload.js v3.0.0
 * (c) 2023 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */function Oo(e,n){return n={exports:{}},e(n,n.exports),n.exports}var or=Oo(function(e){const n=Object.prototype.toString,o=Object.prototype.propertyIsEnumerable,l=Object.getOwnPropertySymbols;e.exports=(y,...A)=>{if(!d(y))throw new TypeError("expected the first argument to be an object");if(A.length===0||typeof Symbol!="function"||typeof l!="function")return y;for(let m of A){let g=l(m);for(let E of g)o.call(m,E)&&(y[E]=m[E])}return y};function d(y){return typeof y=="function"||n.call(y)==="[object Object]"||Array.isArray(y)}}),Da=Object.freeze({__proto__:null,default:or,__moduleExports:or}),Tc=Da&&or||Da,qa=Oo(function(e){const n=Object.prototype.toString,o=A=>A!=="__proto__"&&A!=="constructor"&&A!=="prototype",l=e.exports=(A,...m)=>{let g=0;for(y(A)&&(A=m[g++]),A||(A={});g<m.length;g++)if(d(m[g])){for(const E of Object.keys(m[g]))o(E)&&(d(A[E])&&d(m[g][E])?l(A[E],m[g][E]):A[E]=m[g][E]);Tc(A,m[g])}return A};function d(A){return typeof A=="function"||n.call(A)==="[object Object]"}function y(A){return typeof A=="object"?A===null:typeof A!="function"}});const Ke=typeof window<"u"&&window!==null,ja=zc();function zc(){return Ke&&"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype?("isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}}),!0):!1}const tn={event:"event",observer:"observer"};function Yn(e,n){if(!e.length)return;const o=e.indexOf(n);if(o>-1)return e.splice(o,1)}function Ma(e,n){if(e.tagName!=="IMG"||!e.getAttribute("data-srcset"))return"";let o=e.getAttribute("data-srcset").trim().split(",");const l=[],y=e.parentNode.offsetWidth*n;let A,m,g;o.forEach(b=>{b=b.trim(),A=b.lastIndexOf(" "),A===-1?(m=b,g=99999):(m=b.substr(0,A),g=parseInt(b.substr(A+1,b.length-A-2),10)),l.push([g,m])}),l.sort((b,u)=>{if(b[0]<u[0])return 1;if(b[0]>u[0])return-1;if(b[0]===u[0]){if(u[1].indexOf(".webp",u[1].length-5)!==-1)return 1;if(b[1].indexOf(".webp",b[1].length-5)!==-1)return-1}return 0});let E="",v;for(let b=0;b<l.length;b++){v=l[b],E=v[1];const u=l[b+1];if(u&&u[0]<y){E=v[1];break}else if(!u){E=v[1];break}}return E}const _c=(e=1)=>Ke&&window.devicePixelRatio||e;function Pc(){if(!Ke)return!1;let e=!0;function n(o,l){const d={lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"},y=new Image;y.onload=function(){const A=y.width>0&&y.height>0;l(A)},y.onerror=function(){l(!1)},y.src="data:image/webp;base64,"+d[o]}return n("lossy",o=>{e=o}),n("lossless",o=>{e=o}),n("alpha",o=>{e=o}),n("animation",o=>{e=o}),e}function Dc(e,n){let o=null,l=0;return function(){if(o)return;const d=Date.now()-l,y=this,A=arguments,m=function(){l=Date.now(),o=!1,e.apply(y,A)};d>=n?m():o=setTimeout(m,n)}}function qc(){if(!Ke)return!1;let e=!1;try{const n=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("test",hr,n)}catch{}return e}const jc=qc(),Mc={on(e,n,o,l=!1){jc?e.addEventListener(n,o,{capture:l,passive:!0}):e.addEventListener(n,o,l)},off(e,n,o,l=!1){e.removeEventListener(n,o,l)}},ir=(e,n,o)=>{let l=new Image;if(!e||!e.src){const d=new Error("image src is required");return o(d)}e.cors&&(l.crossOrigin=e.cors),l.src=e.src,l.onload=function(){n({naturalHeight:l.naturalHeight,naturalWidth:l.naturalWidth,src:l.src}),l=null},l.onerror=function(d){o(d)}},Jt=(e,n)=>typeof getComputedStyle<"u"?getComputedStyle(e,null).getPropertyValue(n):e.style[n],Nc=e=>Jt(e,"overflow")+Jt(e,"overflowY")+Jt(e,"overflowX"),Fc=e=>{if(!Ke)return;if(!(e instanceof Element))return window;let n=e;for(;n&&!(n===document.body||n===document.documentElement||!n.parentNode);){if(/(scroll|auto)/.test(Nc(n)))return n;n=n.parentNode}return window};function Uc(e){return e!==null&&typeof e=="object"}function hr(){}class Hc{constructor(n){this.max=n||100,this._caches=[]}has(n){return this._caches.indexOf(n)>-1}add(n){this.has(n)||(this._caches.push(n),this._caches.length>this.max&&this.free())}free(){this._caches.shift()}}class Wc{constructor(n,o,l,d,y,A,m,g,E,v){this.el=n,this.src=o,this.error=l,this.loading=d,this.bindType=y,this.attempt=0,this.cors=g,this.naturalHeight=0,this.naturalWidth=0,this.options=m,this.rect={},this.$parent=A,this.elRenderer=E,this._imageCache=v,this.performanceData={init:Date.now(),loadStart:0,loadEnd:0},this.filter(),this.initState(),this.render("loading",!1)}initState(){"dataset"in this.el?this.el.dataset.src=this.src:this.el.setAttribute("data-src",this.src),this.state={loading:!1,error:!1,loaded:!1,rendered:!1}}record(n){this.performanceData[n]=Date.now()}update(n){const o=this.src;this.src=n.src,this.loading=n.loading,this.error=n.error,this.filter(),o!==this.src&&(this.attempt=0,this.initState())}getRect(){this.rect=this.el.getBoundingClientRect()}checkInView(){return this.getRect(),this.rect.top<window.innerHeight*this.options.preLoad&&this.rect.bottom>this.options.preLoadTop&&this.rect.left<window.innerWidth*this.options.preLoad&&this.rect.right>0}filter(){for(const n in this.options.filter)this.options.filter[n](this,this.options)}renderLoading(n){this.state.loading=!0,ir({src:this.loading,cors:this.cors},()=>{this.render("loading",!1),this.state.loading=!1,n()},()=>{n(),this.state.loading=!1,this.options.silent||console.warn(`VueLazyload log: load failed with loading image(${this.loading})`)})}load(n=hr){if(this.attempt>this.options.attempt-1&&this.state.error){this.options.silent||console.log(`VueLazyload log: ${this.src} tried too more than ${this.options.attempt} times`),n();return}if(!(this.state.rendered&&this.state.loaded)){if(this._imageCache.has(this.src))return this.state.loaded=!0,this.render("loaded",!0),this.state.rendered=!0,n();this.renderLoading(()=>{this.attempt++,this.options.adapter.beforeLoad&&this.options.adapter.beforeLoad(this,this.options),this.record("loadStart"),ir({src:this.src,cors:this.cors},o=>{this.naturalHeight=o.naturalHeight,this.naturalWidth=o.naturalWidth,this.state.loaded=!0,this.state.error=!1,this.record("loadEnd"),this.render("loaded",!1),this.state.rendered=!0,this._imageCache.add(this.src),n()},o=>{!this.options.silent&&console.error(o),this.state.error=!0,this.state.loaded=!1,this.render("error",!1)})})}}render(n,o){this.elRenderer(this,n,o)}performance(){let n="loading",o=0;return this.state.loaded&&(n="loaded",o=(this.performanceData.loadEnd-this.performanceData.loadStart)/1e3),this.state.error&&(n="error"),{src:this.src,state:n,time:o}}$destroy(){this.el=null,this.src="",this.error=null,this.loading="",this.bindType=null,this.attempt=0}}const Na="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",Yc=["scroll","wheel","mousewheel","resize","animationend","transitionend","touchmove"],Qc={rootMargin:"0px",threshold:0};class Kc{constructor({preLoad:n,error:o,throttleWait:l,preLoadTop:d,dispatchEvent:y,loading:A,attempt:m,silent:g=!0,scale:E,listenEvents:v,filter:b,adapter:u,observer:k,observerOptions:x}){this.version='"3.0.0"',this.lazyContainerMananger=null,this.mode=tn.event,this.ListenerQueue=[],this.TargetIndex=0,this.TargetQueue=[],this.options={silent:g,dispatchEvent:!!y,throttleWait:l||200,preLoad:n||1.3,preLoadTop:d||0,error:o||Na,loading:A||Na,attempt:m||3,scale:E||_c(E),listenEvents:v||Yc,supportWebp:Pc(),filter:b||{},adapter:u||{},observer:!!k,observerOptions:x||Qc},this._initEvent(),this._imageCache=new Hc(200),this.lazyLoadHandler=Dc(this._lazyLoadHandler.bind(this),this.options.throttleWait),this.setMode(this.options.observer?tn.observer:tn.event)}performance(){const n=[];return this.ListenerQueue.map(o=>n.push(o.performance())),n}addLazyBox(n){this.ListenerQueue.push(n),Ke&&(this._addListenerTarget(window),this._observer&&this._observer.observe(n.el),n.$el&&n.$el.parentNode&&this._addListenerTarget(n.$el.parentNode))}add(n,o,l){if(this.ListenerQueue.some(g=>g.el===n))return this.update(n,o),rn(this.lazyLoadHandler);let{src:d,loading:y,error:A,cors:m}=this._valueFormatter(o.value);rn(()=>{d=Ma(n,this.options.scale)||d,this._observer&&this._observer.observe(n);const g=Object.keys(o.modifiers)[0];let E;g&&(E=o.instance.$refs[g],E=E?E.el||E:document.getElementById(g)),E||(E=Fc(n));const v=new Wc(n,d,A,y,o.arg,E,this.options,m,this._elRenderer.bind(this),this._imageCache);this.ListenerQueue.push(v),Ke&&(this._addListenerTarget(window),this._addListenerTarget(E)),rn(this.lazyLoadHandler)})}update(n,o,l){let{src:d,loading:y,error:A}=this._valueFormatter(o.value);d=Ma(n,this.options.scale)||d;const m=this.ListenerQueue.find(g=>g.el===n);m?m.update({src:d,loading:y,error:A}):(n.getAttribute("lazy")!=="loaded"||n.dataset.src!==d)&&this.add(n,o,l),this._observer&&(this._observer.unobserve(n),this._observer.observe(n)),rn(this.lazyLoadHandler)}remove(n){if(!n)return;this._observer&&this._observer.unobserve(n);const o=this.ListenerQueue.find(l=>l.el===n);o&&(this._removeListenerTarget(o.$parent),this._removeListenerTarget(window),Yn(this.ListenerQueue,o),o.$destroy&&o.$destroy())}removeComponent(n){n&&(Yn(this.ListenerQueue,n),this._observer&&this._observer.unobserve(n.el),n.$parent&&n.$el.parentNode&&this._removeListenerTarget(n.$el.parentNode),this._removeListenerTarget(window))}setMode(n){!ja&&n===tn.observer&&(n=tn.event),this.mode=n,n===tn.event?(this._observer&&(this.ListenerQueue.forEach(o=>{this._observer.unobserve(o.el)}),this._observer=null),this.TargetQueue.forEach(o=>{this._initListen(o.el,!0)})):(this.TargetQueue.forEach(o=>{this._initListen(o.el,!1)}),this._initIntersectionObserver())}_addListenerTarget(n){if(!n)return;let o=this.TargetQueue.find(l=>l.el===n);return o?o.childrenCount++:(o={el:n,id:++this.TargetIndex,childrenCount:1,listened:!0},this.mode===tn.event&&this._initListen(o.el,!0),this.TargetQueue.push(o)),this.TargetIndex}_removeListenerTarget(n){this.TargetQueue.forEach((o,l)=>{o.el===n&&(o.childrenCount--,o.childrenCount||(this._initListen(o.el,!1),this.TargetQueue.splice(l,1),o=null))})}_initListen(n,o){this.options.listenEvents.forEach(l=>Mc[o?"on":"off"](n,l,this.lazyLoadHandler))}_initEvent(){this.Event={listeners:{loading:[],loaded:[],error:[]}},this.$on=(n,o)=>{this.Event.listeners[n]||(this.Event.listeners[n]=[]),this.Event.listeners[n].push(o)},this.$once=(n,o)=>{const l=this;function d(){l.$off(n,d),o.apply(l,arguments)}this.$on(n,d)},this.$off=(n,o)=>{if(!o){if(!this.Event.listeners[n])return;this.Event.listeners[n].length=0;return}Yn(this.Event.listeners[n],o)},this.$emit=(n,o,l)=>{this.Event.listeners[n]&&this.Event.listeners[n].forEach(d=>d(o,l))}}_lazyLoadHandler(){const n=[];this.ListenerQueue.forEach((o,l)=>{(!o.el||!o.el.parentNode||o.state.loaded)&&n.push(o),o.checkInView()&&(o.state.loaded||o.load())}),n.forEach(o=>{Yn(this.ListenerQueue,o),o.$destroy&&o.$destroy()})}_initIntersectionObserver(){ja&&(this._observer=new IntersectionObserver(this._observerHandler.bind(this),this.options.observerOptions),this.ListenerQueue.length&&this.ListenerQueue.forEach(n=>{this._observer.observe(n.el)}))}_observerHandler(n){n.forEach(o=>{o.isIntersecting&&this.ListenerQueue.forEach(l=>{if(l.el===o.target){if(l.state.loaded)return this._observer.unobserve(l.el);l.load()}})})}_elRenderer(n,o,l){if(!n.el)return;const{el:d,bindType:y}=n;let A;switch(o){case"loading":A=n.loading;break;case"error":A=n.error;break;default:A=n.src;break}if(y?d.style[y]='url("'+A+'")':d.getAttribute("src")!==A&&d.setAttribute("src",A),d.setAttribute("lazy",o),this.$emit(o,n,l),this.options.adapter[o]&&this.options.adapter[o](n,this.options),this.options.dispatchEvent){const m=new CustomEvent(o,{detail:n});d.dispatchEvent(m)}}_valueFormatter(n){return Uc(n)?(!n.src&&!this.options.silent&&console.error("Vue Lazyload warning: miss src with "+n),{src:n.src,loading:n.loading||this.options.loading,error:n.error||this.options.error,cors:this.options.cors}):{src:n,loading:this.options.loading,error:this.options.error,cors:this.options.cors}}}const Ro=(e,n)=>{let o=Vn({});const l=()=>{o=e.value.getBoundingClientRect()};return{rect:o,checkInView:()=>(l(),Ke&&o.top<window.innerHeight*n&&o.bottom>0&&o.left<window.innerWidth*n&&o.right>0)}};var Vc=e=>ht({props:{tag:{type:String,default:"div"}},emits:["show"],setup(n,{emit:o,slots:l}){const d=oe(),y=Vn({loaded:!1,error:!1,attempt:0}),A=oe(!1),{rect:m,checkInView:g}=Ro(d,e.options.preLoad),E=()=>{A.value=!0,y.loaded=!0,o("show",A.value)},v=Ee(()=>({el:d.value,rect:m,checkInView:g,load:E,state:y}));return Ve(()=>{e.addLazyBox(v.value),e.lazyLoadHandler()}),lr(()=>{e.removeComponent(v.value)}),()=>{var b;return ve(n.tag,{ref:d},[A.value&&((b=l.default)===null||b===void 0?void 0:b.call(l))])}}});class Jc{constructor(n){this.lazy=n,n.lazyContainerMananger=this,this._queue=[]}bind(n,o,l){const d=new Zc(n,o,l,this.lazy);this._queue.push(d)}update(n,o,l){const d=this._queue.find(y=>y.el===n);d&&d.update(n,o)}unbind(n,o,l){const d=this._queue.find(y=>y.el===n);d&&(d.clear(),Yn(this._queue,d))}}const $c={selector:"img",error:"",loading:""};class Zc{constructor(n,o,l,d){this.el=n,this.vnode=l,this.binding=o,this.options={},this.lazy=d,this._queue=[],this.update(n,o)}update(n,o){this.el=n,this.options=qa({},$c,o.value),this.getImgs().forEach(d=>{this.lazy.add(d,qa({},this.binding,{value:{src:d.getAttribute("data-src")||d.dataset.src,error:d.getAttribute("data-error")||d.dataset.error||this.options.error,loading:d.getAttribute("data-loading")||d.dataset.loading||this.options.loading}}),this.vnode)})}getImgs(){return Array.from(this.el.querySelectorAll(this.options.selector))}clear(){this.getImgs().forEach(o=>this.lazy.remove(o)),this.vnode=null,this.binding=null,this.lazy=null}}var Xc=e=>ht({setup(n,{slots:o}){const l=oe(),d=Vn({src:"",error:"",loading:"",attempt:e.options.attempt}),y=Vn({loaded:!1,error:!1,attempt:0}),{rect:A,checkInView:m}=Ro(l,e.options.preLoad),g=oe(""),E=(u=hr)=>{if(y.attempt>d.attempt-1&&y.error)return e.options.silent||console.log(`VueLazyload log: ${d.src} tried too more than ${d.attempt} times`),u();const k=d.src;ir({src:k},({src:x})=>{g.value=x,y.loaded=!0},()=>{y.attempt++,g.value=d.error,y.error=!0})},v=Ee(()=>({el:l.value,rect:A,checkInView:m,load:E,state:y}));Ve(()=>{e.addLazyBox(v.value),e.lazyLoadHandler()}),lr(()=>{e.removeComponent(v.value)});const b=()=>{const{src:u,loading:k,error:x}=e._valueFormatter(n.src);y.loaded=!1,d.src=u,d.error=x,d.loading=k,g.value=d.loading};return Xn(()=>n.src,()=>{b(),e.addLazyBox(v.value),e.lazyLoadHandler()},{immediate:!0}),()=>{var u;return ve(n.tag||"img",{src:g.value,ref:l},[(u=o.default)===null||u===void 0?void 0:u.call(o)])}}}),Gc={install(e,n={}){const o=new Kc(n),l=new Jc(o);if(Number(e.version.split(".")[0])<3)return new Error("Vue version at least 3.0");e.config.globalProperties.$Lazyload=o,e.provide("Lazyload",o),n.lazyComponent&&e.component("lazy-component",Vc(o)),n.lazyImage&&e.component("lazy-image",Xc(o)),e.directive("lazy",{beforeMount:o.add.bind(o),beforeUpdate:o.update.bind(o),updated:o.lazyLoadHandler.bind(o),unmounted:o.remove.bind(o)}),e.directive("lazy-container",{beforeMount:l.bind.bind(l),updated:l.update.bind(l),unmounted:l.unbind.bind(l)})}};const mr=ts(is);mr.use(Rc);mr.use(Gc,{preLoad:1,error:Pa,loading:Pa,attempt:2});mr.mount("#app");
