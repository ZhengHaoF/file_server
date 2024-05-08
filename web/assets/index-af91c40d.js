(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=n(o);fetch(o.href,l)}})();function ji(e,t){const n=Object.create(null),r=e.split(",");for(let o=0;o<r.length;o++)n[r[o]]=!0;return t?o=>!!n[o.toLowerCase()]:o=>!!n[o]}const De={},Bn=[],xt=()=>{},Wp=()=>!1,Up=/^on[^a-z]/,fo=e=>Up.test(e),zi=e=>e.startsWith("onUpdate:"),Qe=Object.assign,Mi=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Yp=Object.prototype.hasOwnProperty,xe=(e,t)=>Yp.call(e,t),ce=Array.isArray,Sn=e=>ho(e)==="[object Map]",is=e=>ho(e)==="[object Set]",he=e=>typeof e=="function",Ke=e=>typeof e=="string",Di=e=>typeof e=="symbol",Fe=e=>e!==null&&typeof e=="object",as=e=>Fe(e)&&he(e.then)&&he(e.catch),ls=Object.prototype.toString,ho=e=>ls.call(e),Qp=e=>ho(e).slice(8,-1),ss=e=>ho(e)==="[object Object]",Fi=e=>Ke(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,$r=ji(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ao=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},Kp=/-(\w)/g,_t=Ao(e=>e.replace(Kp,(t,n)=>n?n.toUpperCase():"")),Vp=/\B([A-Z])/g,jn=Ao(e=>e.replace(Vp,"-$1").toLowerCase()),yo=Ao(e=>e.charAt(0).toUpperCase()+e.slice(1)),$o=Ao(e=>e?`on${yo(e)}`:""),Er=(e,t)=>!Object.is(e,t),Jo=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},ro=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},$p=e=>{const t=parseFloat(e);return isNaN(t)?e:t},Jp=e=>{const t=Ke(e)?Number(e):NaN;return isNaN(t)?e:t};let Wa;const ui=()=>Wa||(Wa=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function mo(e){if(ce(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],o=Ke(r)?eu(r):mo(r);if(o)for(const l in o)t[l]=o[l]}return t}else{if(Ke(e))return e;if(Fe(e))return e}}const Zp=/;(?![^(]*\))/g,Xp=/:([^]+)/,Gp=/\/\*[^]*?\*\//g;function eu(e){const t={};return e.replace(Gp,"").split(Zp).forEach(n=>{if(n){const r=n.split(Xp);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function xr(e){let t="";if(Ke(e))t=e;else if(ce(e))for(let n=0;n<e.length;n++){const r=xr(e[n]);r&&(t+=r+" ")}else if(Fe(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const tu="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",nu=ji(tu);function cs(e){return!!e||e===""}const An=e=>Ke(e)?e:e==null?"":ce(e)||Fe(e)&&(e.toString===ls||!he(e.toString))?JSON.stringify(e,ds,2):String(e),ds=(e,t)=>t&&t.__v_isRef?ds(e,t.value):Sn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,o])=>(n[`${r} =>`]=o,n),{})}:is(t)?{[`Set(${t.size})`]:[...t.values()]}:Fe(t)&&!ce(t)&&!ss(t)?String(t):t;let gt;class ru{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=gt,!t&&gt&&(this.index=(gt.scopes||(gt.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=gt;try{return gt=this,t()}finally{gt=n}}}on(){gt=this}off(){gt=this.parent}stop(t){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0,this._active=!1}}}function ou(e,t=gt){t&&t.active&&t.effects.push(e)}function iu(){return gt}const Ni=e=>{const t=new Set(e);return t.w=0,t.n=0,t},ps=e=>(e.w&en)>0,us=e=>(e.n&en)>0,au=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=en},lu=e=>{const{deps:t}=e;if(t.length){let n=0;for(let r=0;r<t.length;r++){const o=t[r];ps(o)&&!us(o)?o.delete(e):t[n++]=o,o.w&=~en,o.n&=~en}t.length=n}},fi=new WeakMap;let ur=0,en=1;const hi=30;let vt;const yn=Symbol(""),Ai=Symbol("");class qi{constructor(t,n=null,r){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,ou(this,r)}run(){if(!this.active)return this.fn();let t=vt,n=Zt;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=vt,vt=this,Zt=!0,en=1<<++ur,ur<=hi?au(this):Ua(this),this.fn()}finally{ur<=hi&&lu(this),en=1<<--ur,vt=this.parent,Zt=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){vt===this?this.deferStop=!0:this.active&&(Ua(this),this.onStop&&this.onStop(),this.active=!1)}}function Ua(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let Zt=!0;const fs=[];function zn(){fs.push(Zt),Zt=!1}function Mn(){const e=fs.pop();Zt=e===void 0?!0:e}function ct(e,t,n){if(Zt&&vt){let r=fi.get(e);r||fi.set(e,r=new Map);let o=r.get(n);o||r.set(n,o=Ni()),hs(o)}}function hs(e,t){let n=!1;ur<=hi?us(e)||(e.n|=en,n=!ps(e)):n=!e.has(vt),n&&(e.add(vt),vt.deps.push(e))}function Mt(e,t,n,r,o,l){const c=fi.get(e);if(!c)return;let u=[];if(t==="clear")u=[...c.values()];else if(n==="length"&&ce(e)){const h=Number(r);c.forEach((y,b)=>{(b==="length"||b>=h)&&u.push(y)})}else switch(n!==void 0&&u.push(c.get(n)),t){case"add":ce(e)?Fi(n)&&u.push(c.get("length")):(u.push(c.get(yn)),Sn(e)&&u.push(c.get(Ai)));break;case"delete":ce(e)||(u.push(c.get(yn)),Sn(e)&&u.push(c.get(Ai)));break;case"set":Sn(e)&&u.push(c.get(yn));break}if(u.length===1)u[0]&&yi(u[0]);else{const h=[];for(const y of u)y&&h.push(...y);yi(Ni(h))}}function yi(e,t){const n=ce(e)?e:[...e];for(const r of n)r.computed&&Ya(r);for(const r of n)r.computed||Ya(r)}function Ya(e,t){(e!==vt||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const su=ji("__proto__,__v_isRef,__isVue"),As=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Di)),cu=Hi(),du=Hi(!1,!0),pu=Hi(!0),Qa=uu();function uu(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=Be(this);for(let l=0,c=this.length;l<c;l++)ct(r,"get",l+"");const o=r[t](...n);return o===-1||o===!1?r[t](...n.map(Be)):o}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){zn();const r=Be(this)[t].apply(this,n);return Mn(),r}}),e}function fu(e){const t=Be(this);return ct(t,"has",e),t.hasOwnProperty(e)}function Hi(e=!1,t=!1){return function(r,o,l){if(o==="__v_isReactive")return!e;if(o==="__v_isReadonly")return e;if(o==="__v_isShallow")return t;if(o==="__v_raw"&&l===(e?t?Iu:vs:t?gs:bs).get(r))return r;const c=ce(r);if(!e){if(c&&xe(Qa,o))return Reflect.get(Qa,o,l);if(o==="hasOwnProperty")return fu}const u=Reflect.get(r,o,l);return(Di(o)?As.has(o):su(o))||(e||ct(r,"get",o),t)?u:it(u)?c&&Fi(o)?u:u.value:Fe(u)?e?xs(u):tn(u):u}}const hu=ys(),Au=ys(!0);function ys(e=!1){return function(n,r,o,l){let c=n[r];if(_n(c)&&it(c)&&!it(o))return!1;if(!e&&(!oo(o)&&!_n(o)&&(c=Be(c),o=Be(o)),!ce(n)&&it(c)&&!it(o)))return c.value=o,!0;const u=ce(n)&&Fi(r)?Number(r)<n.length:xe(n,r),h=Reflect.set(n,r,o,l);return n===Be(l)&&(u?Er(o,c)&&Mt(n,"set",r,o):Mt(n,"add",r,o)),h}}function yu(e,t){const n=xe(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&Mt(e,"delete",t,void 0),r}function mu(e,t){const n=Reflect.has(e,t);return(!Di(t)||!As.has(t))&&ct(e,"has",t),n}function bu(e){return ct(e,"iterate",ce(e)?"length":yn),Reflect.ownKeys(e)}const ms={get:cu,set:hu,deleteProperty:yu,has:mu,ownKeys:bu},gu={get:pu,set(e,t){return!0},deleteProperty(e,t){return!0}},vu=Qe({},ms,{get:du,set:Au}),Wi=e=>e,bo=e=>Reflect.getPrototypeOf(e);function Wr(e,t,n=!1,r=!1){e=e.__v_raw;const o=Be(e),l=Be(t);n||(t!==l&&ct(o,"get",t),ct(o,"get",l));const{has:c}=bo(o),u=r?Wi:n?Qi:kr;if(c.call(o,t))return u(e.get(t));if(c.call(o,l))return u(e.get(l));e!==o&&e.get(t)}function Ur(e,t=!1){const n=this.__v_raw,r=Be(n),o=Be(e);return t||(e!==o&&ct(r,"has",e),ct(r,"has",o)),e===o?n.has(e):n.has(e)||n.has(o)}function Yr(e,t=!1){return e=e.__v_raw,!t&&ct(Be(e),"iterate",yn),Reflect.get(e,"size",e)}function Ka(e){e=Be(e);const t=Be(this);return bo(t).has.call(t,e)||(t.add(e),Mt(t,"add",e,e)),this}function Va(e,t){t=Be(t);const n=Be(this),{has:r,get:o}=bo(n);let l=r.call(n,e);l||(e=Be(e),l=r.call(n,e));const c=o.call(n,e);return n.set(e,t),l?Er(t,c)&&Mt(n,"set",e,t):Mt(n,"add",e,t),this}function $a(e){const t=Be(this),{has:n,get:r}=bo(t);let o=n.call(t,e);o||(e=Be(e),o=n.call(t,e)),r&&r.call(t,e);const l=t.delete(e);return o&&Mt(t,"delete",e,void 0),l}function Ja(){const e=Be(this),t=e.size!==0,n=e.clear();return t&&Mt(e,"clear",void 0,void 0),n}function Qr(e,t){return function(r,o){const l=this,c=l.__v_raw,u=Be(c),h=t?Wi:e?Qi:kr;return!e&&ct(u,"iterate",yn),c.forEach((y,b)=>r.call(o,h(y),h(b),l))}}function Kr(e,t,n){return function(...r){const o=this.__v_raw,l=Be(o),c=Sn(l),u=e==="entries"||e===Symbol.iterator&&c,h=e==="keys"&&c,y=o[e](...r),b=n?Wi:t?Qi:kr;return!t&&ct(l,"iterate",h?Ai:yn),{next(){const{value:g,done:f}=y.next();return f?{value:g,done:f}:{value:u?[b(g[0]),b(g[1])]:b(g),done:f}},[Symbol.iterator](){return this}}}}function Wt(e){return function(...t){return e==="delete"?!1:this}}function Eu(){const e={get(l){return Wr(this,l)},get size(){return Yr(this)},has:Ur,add:Ka,set:Va,delete:$a,clear:Ja,forEach:Qr(!1,!1)},t={get(l){return Wr(this,l,!1,!0)},get size(){return Yr(this)},has:Ur,add:Ka,set:Va,delete:$a,clear:Ja,forEach:Qr(!1,!0)},n={get(l){return Wr(this,l,!0)},get size(){return Yr(this,!0)},has(l){return Ur.call(this,l,!0)},add:Wt("add"),set:Wt("set"),delete:Wt("delete"),clear:Wt("clear"),forEach:Qr(!0,!1)},r={get(l){return Wr(this,l,!0,!0)},get size(){return Yr(this,!0)},has(l){return Ur.call(this,l,!0)},add:Wt("add"),set:Wt("set"),delete:Wt("delete"),clear:Wt("clear"),forEach:Qr(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(l=>{e[l]=Kr(l,!1,!1),n[l]=Kr(l,!0,!1),t[l]=Kr(l,!1,!0),r[l]=Kr(l,!0,!0)}),[e,n,t,r]}const[xu,ku,wu,Cu]=Eu();function Ui(e,t){const n=t?e?Cu:wu:e?ku:xu;return(r,o,l)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?r:Reflect.get(xe(n,o)&&o in r?n:r,o,l)}const Bu={get:Ui(!1,!1)},Su={get:Ui(!1,!0)},Lu={get:Ui(!0,!1)},bs=new WeakMap,gs=new WeakMap,vs=new WeakMap,Iu=new WeakMap;function _u(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Tu(e){return e.__v_skip||!Object.isExtensible(e)?0:_u(Qp(e))}function tn(e){return _n(e)?e:Yi(e,!1,ms,Bu,bs)}function Es(e){return Yi(e,!1,vu,Su,gs)}function xs(e){return Yi(e,!0,gu,Lu,vs)}function Yi(e,t,n,r,o){if(!Fe(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const l=o.get(e);if(l)return l;const c=Tu(e);if(c===0)return e;const u=new Proxy(e,c===2?r:n);return o.set(e,u),u}function Ln(e){return _n(e)?Ln(e.__v_raw):!!(e&&e.__v_isReactive)}function _n(e){return!!(e&&e.__v_isReadonly)}function oo(e){return!!(e&&e.__v_isShallow)}function ks(e){return Ln(e)||_n(e)}function Be(e){const t=e&&e.__v_raw;return t?Be(t):e}function ws(e){return ro(e,"__v_skip",!0),e}const kr=e=>Fe(e)?tn(e):e,Qi=e=>Fe(e)?xs(e):e;function Cs(e){Zt&&vt&&(e=Be(e),hs(e.dep||(e.dep=Ni())))}function Bs(e,t){e=Be(e);const n=e.dep;n&&yi(n)}function it(e){return!!(e&&e.__v_isRef===!0)}function Me(e){return Ss(e,!1)}function Ou(e){return Ss(e,!0)}function Ss(e,t){return it(e)?e:new Ru(e,t)}class Ru{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:Be(t),this._value=n?t:kr(t)}get value(){return Cs(this),this._value}set value(t){const n=this.__v_isShallow||oo(t)||_n(t);t=n?t:Be(t),Er(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:kr(t),Bs(this))}}function Te(e){return it(e)?e.value:e}const Pu={get:(e,t,n)=>Te(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const o=e[t];return it(o)&&!it(n)?(o.value=n,!0):Reflect.set(e,t,n,r)}};function Ls(e){return Ln(e)?e:new Proxy(e,Pu)}class ju{constructor(t,n,r,o){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new qi(t,()=>{this._dirty||(this._dirty=!0,Bs(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!o,this.__v_isReadonly=r}get value(){const t=Be(this);return Cs(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}function zu(e,t,n=!1){let r,o;const l=he(e);return l?(r=e,o=xt):(r=e.get,o=e.set),new ju(r,o,l||!o,n)}function Xt(e,t,n,r){let o;try{o=r?e(...r):e()}catch(l){go(l,t,n)}return o}function ht(e,t,n,r){if(he(e)){const l=Xt(e,t,n,r);return l&&as(l)&&l.catch(c=>{go(c,t,n)}),l}const o=[];for(let l=0;l<e.length;l++)o.push(ht(e[l],t,n,r));return o}function go(e,t,n,r=!0){const o=t?t.vnode:null;if(t){let l=t.parent;const c=t.proxy,u=n;for(;l;){const y=l.ec;if(y){for(let b=0;b<y.length;b++)if(y[b](e,c,u)===!1)return}l=l.parent}const h=t.appContext.config.errorHandler;if(h){Xt(h,null,10,[e,c,u]);return}}Mu(e,n,o,r)}function Mu(e,t,n,r=!0){console.error(e)}let wr=!1,mi=!1;const ot=[];let Lt=0;const In=[];let jt=null,pn=0;const Is=Promise.resolve();let Ki=null;function Jt(e){const t=Ki||Is;return e?t.then(this?e.bind(this):e):t}function Du(e){let t=Lt+1,n=ot.length;for(;t<n;){const r=t+n>>>1;Cr(ot[r])<e?t=r+1:n=r}return t}function Vi(e){(!ot.length||!ot.includes(e,wr&&e.allowRecurse?Lt+1:Lt))&&(e.id==null?ot.push(e):ot.splice(Du(e.id),0,e),_s())}function _s(){!wr&&!mi&&(mi=!0,Ki=Is.then(Os))}function Fu(e){const t=ot.indexOf(e);t>Lt&&ot.splice(t,1)}function Nu(e){ce(e)?In.push(...e):(!jt||!jt.includes(e,e.allowRecurse?pn+1:pn))&&In.push(e),_s()}function Za(e,t=wr?Lt+1:0){for(;t<ot.length;t++){const n=ot[t];n&&n.pre&&(ot.splice(t,1),t--,n())}}function Ts(e){if(In.length){const t=[...new Set(In)];if(In.length=0,jt){jt.push(...t);return}for(jt=t,jt.sort((n,r)=>Cr(n)-Cr(r)),pn=0;pn<jt.length;pn++)jt[pn]();jt=null,pn=0}}const Cr=e=>e.id==null?1/0:e.id,qu=(e,t)=>{const n=Cr(e)-Cr(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function Os(e){mi=!1,wr=!0,ot.sort(qu);const t=xt;try{for(Lt=0;Lt<ot.length;Lt++){const n=ot[Lt];n&&n.active!==!1&&Xt(n,null,14)}}finally{Lt=0,ot.length=0,Ts(),wr=!1,Ki=null,(ot.length||In.length)&&Os()}}function Hu(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||De;let o=n;const l=t.startsWith("update:"),c=l&&t.slice(7);if(c&&c in r){const b=`${c==="modelValue"?"model":c}Modifiers`,{number:g,trim:f}=r[b]||De;f&&(o=n.map(w=>Ke(w)?w.trim():w)),g&&(o=n.map($p))}let u,h=r[u=$o(t)]||r[u=$o(_t(t))];!h&&l&&(h=r[u=$o(jn(t))]),h&&ht(h,e,6,o);const y=r[u+"Once"];if(y){if(!e.emitted)e.emitted={};else if(e.emitted[u])return;e.emitted[u]=!0,ht(y,e,6,o)}}function Rs(e,t,n=!1){const r=t.emitsCache,o=r.get(e);if(o!==void 0)return o;const l=e.emits;let c={},u=!1;if(!he(e)){const h=y=>{const b=Rs(y,t,!0);b&&(u=!0,Qe(c,b))};!n&&t.mixins.length&&t.mixins.forEach(h),e.extends&&h(e.extends),e.mixins&&e.mixins.forEach(h)}return!l&&!u?(Fe(e)&&r.set(e,null),null):(ce(l)?l.forEach(h=>c[h]=null):Qe(c,l),Fe(e)&&r.set(e,c),c)}function vo(e,t){return!e||!fo(t)?!1:(t=t.slice(2).replace(/Once$/,""),xe(e,t[0].toLowerCase()+t.slice(1))||xe(e,jn(t))||xe(e,t))}let et=null,Eo=null;function io(e){const t=et;return et=e,Eo=e&&e.type.__scopeId||null,t}function Wu(e){Eo=e}function Uu(){Eo=null}function fr(e,t=et,n){if(!t||e._n)return e;const r=(...o)=>{r._d&&cl(-1);const l=io(t);let c;try{c=e(...o)}finally{io(l),r._d&&cl(1)}return c};return r._n=!0,r._c=!0,r._d=!0,r}function Zo(e){const{type:t,vnode:n,proxy:r,withProxy:o,props:l,propsOptions:[c],slots:u,attrs:h,emit:y,render:b,renderCache:g,data:f,setupState:w,ctx:B,inheritAttrs:C}=e;let R,_;const I=io(e);try{if(n.shapeFlag&4){const D=o||r;R=St(b.call(D,D,g,l,w,f,B)),_=h}else{const D=t;R=St(D.length>1?D(l,{attrs:h,slots:u,emit:y}):D(l,null)),_=t.props?h:Yu(h)}}catch(D){br.length=0,go(D,e,1),R=F(yt)}let H=R;if(_&&C!==!1){const D=Object.keys(_),{shapeFlag:Ae}=H;D.length&&Ae&7&&(c&&D.some(zi)&&(_=Qu(_,c)),H=nn(H,_))}return n.dirs&&(H=nn(H),H.dirs=H.dirs?H.dirs.concat(n.dirs):n.dirs),n.transition&&(H.transition=n.transition),R=H,io(I),R}const Yu=e=>{let t;for(const n in e)(n==="class"||n==="style"||fo(n))&&((t||(t={}))[n]=e[n]);return t},Qu=(e,t)=>{const n={};for(const r in e)(!zi(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Ku(e,t,n){const{props:r,children:o,component:l}=e,{props:c,children:u,patchFlag:h}=t,y=l.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&h>=0){if(h&1024)return!0;if(h&16)return r?Xa(r,c,y):!!c;if(h&8){const b=t.dynamicProps;for(let g=0;g<b.length;g++){const f=b[g];if(c[f]!==r[f]&&!vo(y,f))return!0}}}else return(o||u)&&(!u||!u.$stable)?!0:r===c?!1:r?c?Xa(r,c,y):!0:!!c;return!1}function Xa(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let o=0;o<r.length;o++){const l=r[o];if(t[l]!==e[l]&&!vo(n,l))return!0}return!1}function Vu({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent}const $u=e=>e.__isSuspense;function Ju(e,t){t&&t.pendingBranch?ce(e)?t.effects.push(...e):t.effects.push(e):Nu(e)}const Vr={};function Gt(e,t,n){return Ps(e,t,n)}function Ps(e,t,{immediate:n,deep:r,flush:o,onTrack:l,onTrigger:c}=De){var u;const h=iu()===((u=Ze)==null?void 0:u.scope)?Ze:null;let y,b=!1,g=!1;if(it(e)?(y=()=>e.value,b=oo(e)):Ln(e)?(y=()=>e,r=!0):ce(e)?(g=!0,b=e.some(D=>Ln(D)||oo(D)),y=()=>e.map(D=>{if(it(D))return D.value;if(Ln(D))return hn(D);if(he(D))return Xt(D,h,2)})):he(e)?t?y=()=>Xt(e,h,2):y=()=>{if(!(h&&h.isUnmounted))return f&&f(),ht(e,h,3,[w])}:y=xt,t&&r){const D=y;y=()=>hn(D())}let f,w=D=>{f=I.onStop=()=>{Xt(D,h,4)}},B;if(Sr)if(w=xt,t?n&&ht(t,h,3,[y(),g?[]:void 0,w]):y(),o==="sync"){const D=Zf();B=D.__watcherHandles||(D.__watcherHandles=[])}else return xt;let C=g?new Array(e.length).fill(Vr):Vr;const R=()=>{if(I.active)if(t){const D=I.run();(r||b||(g?D.some((Ae,Se)=>Er(Ae,C[Se])):Er(D,C)))&&(f&&f(),ht(t,h,3,[D,C===Vr?void 0:g&&C[0]===Vr?[]:C,w]),C=D)}else I.run()};R.allowRecurse=!!t;let _;o==="sync"?_=R:o==="post"?_=()=>st(R,h&&h.suspense):(R.pre=!0,h&&(R.id=h.uid),_=()=>Vi(R));const I=new qi(y,_);t?n?R():C=I.run():o==="post"?st(I.run.bind(I),h&&h.suspense):I.run();const H=()=>{I.stop(),h&&h.scope&&Mi(h.scope.effects,I)};return B&&B.push(H),H}function Zu(e,t,n){const r=this.proxy,o=Ke(e)?e.includes(".")?js(r,e):()=>r[e]:e.bind(r,r);let l;he(t)?l=t:(l=t.handler,n=t);const c=Ze;Tn(this);const u=Ps(o,l.bind(r),n);return c?Tn(c):bn(),u}function js(e,t){const n=t.split(".");return()=>{let r=e;for(let o=0;o<n.length&&r;o++)r=r[n[o]];return r}}function hn(e,t){if(!Fe(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),it(e))hn(e.value,t);else if(ce(e))for(let n=0;n<e.length;n++)hn(e[n],t);else if(is(e)||Sn(e))e.forEach(n=>{hn(n,t)});else if(ss(e))for(const n in e)hn(e[n],t);return e}function Xu(e,t){const n=et;if(n===null)return e;const r=So(n)||n.proxy,o=e.dirs||(e.dirs=[]);for(let l=0;l<t.length;l++){let[c,u,h,y=De]=t[l];c&&(he(c)&&(c={mounted:c,updated:c}),c.deep&&hn(u),o.push({dir:c,instance:r,value:u,oldValue:void 0,arg:h,modifiers:y}))}return e}function an(e,t,n,r){const o=e.dirs,l=t&&t.dirs;for(let c=0;c<o.length;c++){const u=o[c];l&&(u.oldValue=l[c].value);let h=u.dir[r];h&&(zn(),ht(h,n,8,[e.el,u,e,t]),Mn())}}function Gu(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Ft(()=>{e.isMounted=!0}),$i(()=>{e.isUnmounting=!0}),e}const ft=[Function,Array],zs={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:ft,onEnter:ft,onAfterEnter:ft,onEnterCancelled:ft,onBeforeLeave:ft,onLeave:ft,onAfterLeave:ft,onLeaveCancelled:ft,onBeforeAppear:ft,onAppear:ft,onAfterAppear:ft,onAppearCancelled:ft},ef={name:"BaseTransition",props:zs,setup(e,{slots:t}){const n=Wf(),r=Gu();let o;return()=>{const l=t.default&&Ds(t.default(),!0);if(!l||!l.length)return;let c=l[0];if(l.length>1){for(const C of l)if(C.type!==yt){c=C;break}}const u=Be(e),{mode:h}=u;if(r.isLeaving)return Xo(c);const y=Ga(c);if(!y)return Xo(c);const b=bi(y,u,r,n);gi(y,b);const g=n.subTree,f=g&&Ga(g);let w=!1;const{getTransitionKey:B}=y.type;if(B){const C=B();o===void 0?o=C:C!==o&&(o=C,w=!0)}if(f&&f.type!==yt&&(!un(y,f)||w)){const C=bi(f,u,r,n);if(gi(f,C),h==="out-in")return r.isLeaving=!0,C.afterLeave=()=>{r.isLeaving=!1,n.update.active!==!1&&n.update()},Xo(c);h==="in-out"&&y.type!==yt&&(C.delayLeave=(R,_,I)=>{const H=Ms(r,f);H[String(f.key)]=f,R._leaveCb=()=>{_(),R._leaveCb=void 0,delete b.delayedLeave},b.delayedLeave=I})}return c}}},tf=ef;function Ms(e,t){const{leavingVNodes:n}=e;let r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function bi(e,t,n,r){const{appear:o,mode:l,persisted:c=!1,onBeforeEnter:u,onEnter:h,onAfterEnter:y,onEnterCancelled:b,onBeforeLeave:g,onLeave:f,onAfterLeave:w,onLeaveCancelled:B,onBeforeAppear:C,onAppear:R,onAfterAppear:_,onAppearCancelled:I}=t,H=String(e.key),D=Ms(n,e),Ae=(ue,Ie)=>{ue&&ht(ue,r,9,Ie)},Se=(ue,Ie)=>{const ae=Ie[1];Ae(ue,Ie),ce(ue)?ue.every(Ne=>Ne.length<=1)&&ae():ue.length<=1&&ae()},Ue={mode:l,persisted:c,beforeEnter(ue){let Ie=u;if(!n.isMounted)if(o)Ie=C||u;else return;ue._leaveCb&&ue._leaveCb(!0);const ae=D[H];ae&&un(e,ae)&&ae.el._leaveCb&&ae.el._leaveCb(),Ae(Ie,[ue])},enter(ue){let Ie=h,ae=y,Ne=b;if(!n.isMounted)if(o)Ie=R||h,ae=_||y,Ne=I||b;else return;let G=!1;const me=ue._enterCb=We=>{G||(G=!0,We?Ae(Ne,[ue]):Ae(ae,[ue]),Ue.delayedLeave&&Ue.delayedLeave(),ue._enterCb=void 0)};Ie?Se(Ie,[ue,me]):me()},leave(ue,Ie){const ae=String(e.key);if(ue._enterCb&&ue._enterCb(!0),n.isUnmounting)return Ie();Ae(g,[ue]);let Ne=!1;const G=ue._leaveCb=me=>{Ne||(Ne=!0,Ie(),me?Ae(B,[ue]):Ae(w,[ue]),ue._leaveCb=void 0,D[ae]===e&&delete D[ae])};D[ae]=e,f?Se(f,[ue,G]):G()},clone(ue){return bi(ue,t,n,r)}};return Ue}function Xo(e){if(ko(e))return e=nn(e),e.children=null,e}function Ga(e){return ko(e)?e.children?e.children[0]:void 0:e}function gi(e,t){e.shapeFlag&6&&e.component?gi(e.component.subTree,t):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Ds(e,t=!1,n){let r=[],o=0;for(let l=0;l<e.length;l++){let c=e[l];const u=n==null?c.key:String(n)+String(c.key!=null?c.key:l);c.type===Ge?(c.patchFlag&128&&o++,r=r.concat(Ds(c.children,t,u))):(t||c.type!==yt)&&r.push(u!=null?nn(c,{key:u}):c)}if(o>1)for(let l=0;l<r.length;l++)r[l].patchFlag=-2;return r}function xo(e,t){return he(e)?(()=>Qe({name:e.name},t,{setup:e}))():e}const yr=e=>!!e.type.__asyncLoader,ko=e=>e.type.__isKeepAlive;function nf(e,t){Fs(e,"a",t)}function rf(e,t){Fs(e,"da",t)}function Fs(e,t,n=Ze){const r=e.__wdc||(e.__wdc=()=>{let o=n;for(;o;){if(o.isDeactivated)return;o=o.parent}return e()});if(wo(t,r,n),n){let o=n.parent;for(;o&&o.parent;)ko(o.parent.vnode)&&of(r,t,n,o),o=o.parent}}function of(e,t,n,r){const o=wo(t,e,r,!0);_r(()=>{Mi(r[t],o)},n)}function wo(e,t,n=Ze,r=!1){if(n){const o=n[e]||(n[e]=[]),l=t.__weh||(t.__weh=(...c)=>{if(n.isUnmounted)return;zn(),Tn(n);const u=ht(t,n,e,c);return bn(),Mn(),u});return r?o.unshift(l):o.push(l),l}}const Dt=e=>(t,n=Ze)=>(!Sr||e==="sp")&&wo(e,(...r)=>t(...r),n),af=Dt("bm"),Ft=Dt("m"),lf=Dt("bu"),sf=Dt("u"),$i=Dt("bum"),_r=Dt("um"),cf=Dt("sp"),df=Dt("rtg"),pf=Dt("rtc");function uf(e,t=Ze){wo("ec",e,t)}const Ns="components",ff="directives";function hf(e,t){return qs(Ns,e,!0,t)||e}const Af=Symbol.for("v-ndc");function yf(e){return qs(ff,e)}function qs(e,t,n=!0,r=!1){const o=et||Ze;if(o){const l=o.type;if(e===Ns){const u=Vf(l,!1);if(u&&(u===t||u===_t(t)||u===yo(_t(t))))return l}const c=el(o[e]||l[e],t)||el(o.appContext[e],t);return!c&&r?l:c}}function el(e,t){return e&&(e[t]||e[_t(t)]||e[yo(_t(t))])}function Jr(e,t,n,r){let o;const l=n&&n[r];if(ce(e)||Ke(e)){o=new Array(e.length);for(let c=0,u=e.length;c<u;c++)o[c]=t(e[c],c,void 0,l&&l[c])}else if(typeof e=="number"){o=new Array(e);for(let c=0;c<e;c++)o[c]=t(c+1,c,void 0,l&&l[c])}else if(Fe(e))if(e[Symbol.iterator])o=Array.from(e,(c,u)=>t(c,u,void 0,l&&l[u]));else{const c=Object.keys(e);o=new Array(c.length);for(let u=0,h=c.length;u<h;u++){const y=c[u];o[u]=t(e[y],y,u,l&&l[u])}}else o=[];return n&&(n[r]=o),o}function mf(e,t,n={},r,o){if(et.isCE||et.parent&&yr(et.parent)&&et.parent.isCE)return t!=="default"&&(n.name=t),F("slot",n,r&&r());let l=e[t];l&&l._c&&(l._d=!1),le();const c=l&&Hs(l(n)),u=ze(Ge,{key:n.key||c&&c.key||`_${t}`},c||(r?r():[]),c&&e._===1?64:-2);return!o&&u.scopeId&&(u.slotScopeIds=[u.scopeId+"-s"]),l&&l._c&&(l._d=!0),u}function Hs(e){return e.some(t=>so(t)?!(t.type===yt||t.type===Ge&&!Hs(t.children)):!0)?e:null}const vi=e=>e?Gs(e)?So(e)||e.proxy:vi(e.parent):null,mr=Qe(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>vi(e.parent),$root:e=>vi(e.root),$emit:e=>e.emit,$options:e=>Ji(e),$forceUpdate:e=>e.f||(e.f=()=>Vi(e.update)),$nextTick:e=>e.n||(e.n=Jt.bind(e.proxy)),$watch:e=>Zu.bind(e)}),Go=(e,t)=>e!==De&&!e.__isScriptSetup&&xe(e,t),bf={get({_:e},t){const{ctx:n,setupState:r,data:o,props:l,accessCache:c,type:u,appContext:h}=e;let y;if(t[0]!=="$"){const w=c[t];if(w!==void 0)switch(w){case 1:return r[t];case 2:return o[t];case 4:return n[t];case 3:return l[t]}else{if(Go(r,t))return c[t]=1,r[t];if(o!==De&&xe(o,t))return c[t]=2,o[t];if((y=e.propsOptions[0])&&xe(y,t))return c[t]=3,l[t];if(n!==De&&xe(n,t))return c[t]=4,n[t];Ei&&(c[t]=0)}}const b=mr[t];let g,f;if(b)return t==="$attrs"&&ct(e,"get",t),b(e);if((g=u.__cssModules)&&(g=g[t]))return g;if(n!==De&&xe(n,t))return c[t]=4,n[t];if(f=h.config.globalProperties,xe(f,t))return f[t]},set({_:e},t,n){const{data:r,setupState:o,ctx:l}=e;return Go(o,t)?(o[t]=n,!0):r!==De&&xe(r,t)?(r[t]=n,!0):xe(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(l[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:o,propsOptions:l}},c){let u;return!!n[c]||e!==De&&xe(e,c)||Go(t,c)||(u=l[0])&&xe(u,c)||xe(r,c)||xe(mr,c)||xe(o.config.globalProperties,c)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:xe(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function tl(e){return ce(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let Ei=!0;function gf(e){const t=Ji(e),n=e.proxy,r=e.ctx;Ei=!1,t.beforeCreate&&nl(t.beforeCreate,e,"bc");const{data:o,computed:l,methods:c,watch:u,provide:h,inject:y,created:b,beforeMount:g,mounted:f,beforeUpdate:w,updated:B,activated:C,deactivated:R,beforeDestroy:_,beforeUnmount:I,destroyed:H,unmounted:D,render:Ae,renderTracked:Se,renderTriggered:Ue,errorCaptured:ue,serverPrefetch:Ie,expose:ae,inheritAttrs:Ne,components:G,directives:me,filters:We}=t;if(y&&vf(y,r,null),c)for(const we in c){const ye=c[we];he(ye)&&(r[we]=ye.bind(n))}if(o){const we=o.call(n,n);Fe(we)&&(e.data=tn(we))}if(Ei=!0,l)for(const we in l){const ye=l[we],te=he(ye)?ye.bind(n,n):he(ye.get)?ye.get.bind(n,n):xt,se=!he(ye)&&he(ye.set)?ye.set.bind(n):xt,fe=pt({get:te,set:se});Object.defineProperty(r,we,{enumerable:!0,configurable:!0,get:()=>fe.value,set:ve=>fe.value=ve})}if(u)for(const we in u)Ws(u[we],r,n,we);if(h){const we=he(h)?h.call(n):h;Reflect.ownKeys(we).forEach(ye=>{Zr(ye,we[ye])})}b&&nl(b,e,"c");function Pe(we,ye){ce(ye)?ye.forEach(te=>we(te.bind(n))):ye&&we(ye.bind(n))}if(Pe(af,g),Pe(Ft,f),Pe(lf,w),Pe(sf,B),Pe(nf,C),Pe(rf,R),Pe(uf,ue),Pe(pf,Se),Pe(df,Ue),Pe($i,I),Pe(_r,D),Pe(cf,Ie),ce(ae))if(ae.length){const we=e.exposed||(e.exposed={});ae.forEach(ye=>{Object.defineProperty(we,ye,{get:()=>n[ye],set:te=>n[ye]=te})})}else e.exposed||(e.exposed={});Ae&&e.render===xt&&(e.render=Ae),Ne!=null&&(e.inheritAttrs=Ne),G&&(e.components=G),me&&(e.directives=me)}function vf(e,t,n=xt){ce(e)&&(e=xi(e));for(const r in e){const o=e[r];let l;Fe(o)?"default"in o?l=At(o.from||r,o.default,!0):l=At(o.from||r):l=At(o),it(l)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>l.value,set:c=>l.value=c}):t[r]=l}}function nl(e,t,n){ht(ce(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function Ws(e,t,n,r){const o=r.includes(".")?js(n,r):()=>n[r];if(Ke(e)){const l=t[e];he(l)&&Gt(o,l)}else if(he(e))Gt(o,e.bind(n));else if(Fe(e))if(ce(e))e.forEach(l=>Ws(l,t,n,r));else{const l=he(e.handler)?e.handler.bind(n):t[e.handler];he(l)&&Gt(o,l,e)}}function Ji(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:o,optionsCache:l,config:{optionMergeStrategies:c}}=e.appContext,u=l.get(t);let h;return u?h=u:!o.length&&!n&&!r?h=t:(h={},o.length&&o.forEach(y=>ao(h,y,c,!0)),ao(h,t,c)),Fe(t)&&l.set(t,h),h}function ao(e,t,n,r=!1){const{mixins:o,extends:l}=t;l&&ao(e,l,n,!0),o&&o.forEach(c=>ao(e,c,n,!0));for(const c in t)if(!(r&&c==="expose")){const u=Ef[c]||n&&n[c];e[c]=u?u(e[c],t[c]):t[c]}return e}const Ef={data:rl,props:ol,emits:ol,methods:hr,computed:hr,beforeCreate:at,created:at,beforeMount:at,mounted:at,beforeUpdate:at,updated:at,beforeDestroy:at,beforeUnmount:at,destroyed:at,unmounted:at,activated:at,deactivated:at,errorCaptured:at,serverPrefetch:at,components:hr,directives:hr,watch:kf,provide:rl,inject:xf};function rl(e,t){return t?e?function(){return Qe(he(e)?e.call(this,this):e,he(t)?t.call(this,this):t)}:t:e}function xf(e,t){return hr(xi(e),xi(t))}function xi(e){if(ce(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function at(e,t){return e?[...new Set([].concat(e,t))]:t}function hr(e,t){return e?Qe(Object.create(null),e,t):t}function ol(e,t){return e?ce(e)&&ce(t)?[...new Set([...e,...t])]:Qe(Object.create(null),tl(e),tl(t??{})):t}function kf(e,t){if(!e)return t;if(!t)return e;const n=Qe(Object.create(null),e);for(const r in t)n[r]=at(e[r],t[r]);return n}function Us(){return{app:null,config:{isNativeTag:Wp,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let wf=0;function Cf(e,t){return function(r,o=null){he(r)||(r=Qe({},r)),o!=null&&!Fe(o)&&(o=null);const l=Us(),c=new Set;let u=!1;const h=l.app={_uid:wf++,_component:r,_props:o,_container:null,_context:l,_instance:null,version:Xf,get config(){return l.config},set config(y){},use(y,...b){return c.has(y)||(y&&he(y.install)?(c.add(y),y.install(h,...b)):he(y)&&(c.add(y),y(h,...b))),h},mixin(y){return l.mixins.includes(y)||l.mixins.push(y),h},component(y,b){return b?(l.components[y]=b,h):l.components[y]},directive(y,b){return b?(l.directives[y]=b,h):l.directives[y]},mount(y,b,g){if(!u){const f=F(r,o);return f.appContext=l,b&&t?t(f,y):e(f,y,g),u=!0,h._container=y,y.__vue_app__=h,So(f.component)||f.component.proxy}},unmount(){u&&(e(null,h._container),delete h._container.__vue_app__)},provide(y,b){return l.provides[y]=b,h},runWithContext(y){lo=h;try{return y()}finally{lo=null}}};return h}}let lo=null;function Zr(e,t){if(Ze){let n=Ze.provides;const r=Ze.parent&&Ze.parent.provides;r===n&&(n=Ze.provides=Object.create(r)),n[e]=t}}function At(e,t,n=!1){const r=Ze||et;if(r||lo){const o=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:lo._context.provides;if(o&&e in o)return o[e];if(arguments.length>1)return n&&he(t)?t.call(r&&r.proxy):t}}function Bf(e,t,n,r=!1){const o={},l={};ro(l,Bo,1),e.propsDefaults=Object.create(null),Ys(e,t,o,l);for(const c in e.propsOptions[0])c in o||(o[c]=void 0);n?e.props=r?o:Es(o):e.type.props?e.props=o:e.props=l,e.attrs=l}function Sf(e,t,n,r){const{props:o,attrs:l,vnode:{patchFlag:c}}=e,u=Be(o),[h]=e.propsOptions;let y=!1;if((r||c>0)&&!(c&16)){if(c&8){const b=e.vnode.dynamicProps;for(let g=0;g<b.length;g++){let f=b[g];if(vo(e.emitsOptions,f))continue;const w=t[f];if(h)if(xe(l,f))w!==l[f]&&(l[f]=w,y=!0);else{const B=_t(f);o[B]=ki(h,u,B,w,e,!1)}else w!==l[f]&&(l[f]=w,y=!0)}}}else{Ys(e,t,o,l)&&(y=!0);let b;for(const g in u)(!t||!xe(t,g)&&((b=jn(g))===g||!xe(t,b)))&&(h?n&&(n[g]!==void 0||n[b]!==void 0)&&(o[g]=ki(h,u,g,void 0,e,!0)):delete o[g]);if(l!==u)for(const g in l)(!t||!xe(t,g))&&(delete l[g],y=!0)}y&&Mt(e,"set","$attrs")}function Ys(e,t,n,r){const[o,l]=e.propsOptions;let c=!1,u;if(t)for(let h in t){if($r(h))continue;const y=t[h];let b;o&&xe(o,b=_t(h))?!l||!l.includes(b)?n[b]=y:(u||(u={}))[b]=y:vo(e.emitsOptions,h)||(!(h in r)||y!==r[h])&&(r[h]=y,c=!0)}if(l){const h=Be(n),y=u||De;for(let b=0;b<l.length;b++){const g=l[b];n[g]=ki(o,h,g,y[g],e,!xe(y,g))}}return c}function ki(e,t,n,r,o,l){const c=e[n];if(c!=null){const u=xe(c,"default");if(u&&r===void 0){const h=c.default;if(c.type!==Function&&!c.skipFactory&&he(h)){const{propsDefaults:y}=o;n in y?r=y[n]:(Tn(o),r=y[n]=h.call(null,t),bn())}else r=h}c[0]&&(l&&!u?r=!1:c[1]&&(r===""||r===jn(n))&&(r=!0))}return r}function Qs(e,t,n=!1){const r=t.propsCache,o=r.get(e);if(o)return o;const l=e.props,c={},u=[];let h=!1;if(!he(e)){const b=g=>{h=!0;const[f,w]=Qs(g,t,!0);Qe(c,f),w&&u.push(...w)};!n&&t.mixins.length&&t.mixins.forEach(b),e.extends&&b(e.extends),e.mixins&&e.mixins.forEach(b)}if(!l&&!h)return Fe(e)&&r.set(e,Bn),Bn;if(ce(l))for(let b=0;b<l.length;b++){const g=_t(l[b]);il(g)&&(c[g]=De)}else if(l)for(const b in l){const g=_t(b);if(il(g)){const f=l[b],w=c[g]=ce(f)||he(f)?{type:f}:Qe({},f);if(w){const B=sl(Boolean,w.type),C=sl(String,w.type);w[0]=B>-1,w[1]=C<0||B<C,(B>-1||xe(w,"default"))&&u.push(g)}}}const y=[c,u];return Fe(e)&&r.set(e,y),y}function il(e){return e[0]!=="$"}function al(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function ll(e,t){return al(e)===al(t)}function sl(e,t){return ce(t)?t.findIndex(n=>ll(n,e)):he(t)&&ll(t,e)?0:-1}const Ks=e=>e[0]==="_"||e==="$stable",Zi=e=>ce(e)?e.map(St):[St(e)],Lf=(e,t,n)=>{if(t._n)return t;const r=fr((...o)=>Zi(t(...o)),n);return r._c=!1,r},Vs=(e,t,n)=>{const r=e._ctx;for(const o in e){if(Ks(o))continue;const l=e[o];if(he(l))t[o]=Lf(o,l,r);else if(l!=null){const c=Zi(l);t[o]=()=>c}}},$s=(e,t)=>{const n=Zi(t);e.slots.default=()=>n},If=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=Be(t),ro(t,"_",n)):Vs(t,e.slots={})}else e.slots={},t&&$s(e,t);ro(e.slots,Bo,1)},_f=(e,t,n)=>{const{vnode:r,slots:o}=e;let l=!0,c=De;if(r.shapeFlag&32){const u=t._;u?n&&u===1?l=!1:(Qe(o,t),!n&&u===1&&delete o._):(l=!t.$stable,Vs(t,o)),c=t}else t&&($s(e,t),c={default:1});if(l)for(const u in o)!Ks(u)&&!(u in c)&&delete o[u]};function wi(e,t,n,r,o=!1){if(ce(e)){e.forEach((f,w)=>wi(f,t&&(ce(t)?t[w]:t),n,r,o));return}if(yr(r)&&!o)return;const l=r.shapeFlag&4?So(r.component)||r.component.proxy:r.el,c=o?null:l,{i:u,r:h}=e,y=t&&t.r,b=u.refs===De?u.refs={}:u.refs,g=u.setupState;if(y!=null&&y!==h&&(Ke(y)?(b[y]=null,xe(g,y)&&(g[y]=null)):it(y)&&(y.value=null)),he(h))Xt(h,u,12,[c,b]);else{const f=Ke(h),w=it(h);if(f||w){const B=()=>{if(e.f){const C=f?xe(g,h)?g[h]:b[h]:h.value;o?ce(C)&&Mi(C,l):ce(C)?C.includes(l)||C.push(l):f?(b[h]=[l],xe(g,h)&&(g[h]=b[h])):(h.value=[l],e.k&&(b[e.k]=h.value))}else f?(b[h]=c,xe(g,h)&&(g[h]=c)):w&&(h.value=c,e.k&&(b[e.k]=c))};c?(B.id=-1,st(B,n)):B()}}}const st=Ju;function Tf(e){return Of(e)}function Of(e,t){const n=ui();n.__VUE__=!0;const{insert:r,remove:o,patchProp:l,createElement:c,createText:u,createComment:h,setText:y,setElementText:b,parentNode:g,nextSibling:f,setScopeId:w=xt,insertStaticContent:B}=e,C=(x,k,S,O=null,M=null,q=null,Z=!1,W=null,K=!!k.dynamicChildren)=>{if(x===k)return;x&&!un(x,k)&&(O=z(x),ve(x,M,q,!0),x=null),k.patchFlag===-2&&(K=!1,k.dynamicChildren=null);const{type:N,ref:oe,shapeFlag:ee}=k;switch(N){case Co:R(x,k,S,O);break;case yt:_(x,k,S,O);break;case ei:x==null&&I(k,S,O,Z);break;case Ge:G(x,k,S,O,M,q,Z,W,K);break;default:ee&1?Ae(x,k,S,O,M,q,Z,W,K):ee&6?me(x,k,S,O,M,q,Z,W,K):(ee&64||ee&128)&&N.process(x,k,S,O,M,q,Z,W,K,Y)}oe!=null&&M&&wi(oe,x&&x.ref,q,k||x,!k)},R=(x,k,S,O)=>{if(x==null)r(k.el=u(k.children),S,O);else{const M=k.el=x.el;k.children!==x.children&&y(M,k.children)}},_=(x,k,S,O)=>{x==null?r(k.el=h(k.children||""),S,O):k.el=x.el},I=(x,k,S,O)=>{[x.el,x.anchor]=B(x.children,k,S,O,x.el,x.anchor)},H=({el:x,anchor:k},S,O)=>{let M;for(;x&&x!==k;)M=f(x),r(x,S,O),x=M;r(k,S,O)},D=({el:x,anchor:k})=>{let S;for(;x&&x!==k;)S=f(x),o(x),x=S;o(k)},Ae=(x,k,S,O,M,q,Z,W,K)=>{Z=Z||k.type==="svg",x==null?Se(k,S,O,M,q,Z,W,K):Ie(x,k,M,q,Z,W,K)},Se=(x,k,S,O,M,q,Z,W)=>{let K,N;const{type:oe,props:ee,shapeFlag:ie,transition:de,dirs:be}=x;if(K=x.el=c(x.type,q,ee&&ee.is,ee),ie&8?b(K,x.children):ie&16&&ue(x.children,K,null,O,M,q&&oe!=="foreignObject",Z,W),be&&an(x,null,O,"created"),Ue(K,x,x.scopeId,Z,O),ee){for(const Le in ee)Le!=="value"&&!$r(Le)&&l(K,Le,null,ee[Le],q,x.children,O,M,je);"value"in ee&&l(K,"value",null,ee.value),(N=ee.onVnodeBeforeMount)&&Bt(N,O,x)}be&&an(x,null,O,"beforeMount");const Oe=(!M||M&&!M.pendingBranch)&&de&&!de.persisted;Oe&&de.beforeEnter(K),r(K,k,S),((N=ee&&ee.onVnodeMounted)||Oe||be)&&st(()=>{N&&Bt(N,O,x),Oe&&de.enter(K),be&&an(x,null,O,"mounted")},M)},Ue=(x,k,S,O,M)=>{if(S&&w(x,S),O)for(let q=0;q<O.length;q++)w(x,O[q]);if(M){let q=M.subTree;if(k===q){const Z=M.vnode;Ue(x,Z,Z.scopeId,Z.slotScopeIds,M.parent)}}},ue=(x,k,S,O,M,q,Z,W,K=0)=>{for(let N=K;N<x.length;N++){const oe=x[N]=W?Vt(x[N]):St(x[N]);C(null,oe,k,S,O,M,q,Z,W)}},Ie=(x,k,S,O,M,q,Z)=>{const W=k.el=x.el;let{patchFlag:K,dynamicChildren:N,dirs:oe}=k;K|=x.patchFlag&16;const ee=x.props||De,ie=k.props||De;let de;S&&ln(S,!1),(de=ie.onVnodeBeforeUpdate)&&Bt(de,S,k,x),oe&&an(k,x,S,"beforeUpdate"),S&&ln(S,!0);const be=M&&k.type!=="foreignObject";if(N?ae(x.dynamicChildren,N,W,S,O,be,q):Z||ye(x,k,W,null,S,O,be,q,!1),K>0){if(K&16)Ne(W,k,ee,ie,S,O,M);else if(K&2&&ee.class!==ie.class&&l(W,"class",null,ie.class,M),K&4&&l(W,"style",ee.style,ie.style,M),K&8){const Oe=k.dynamicProps;for(let Le=0;Le<Oe.length;Le++){const qe=Oe[Le],dt=ee[qe],Ot=ie[qe];(Ot!==dt||qe==="value")&&l(W,qe,dt,Ot,M,x.children,S,O,je)}}K&1&&x.children!==k.children&&b(W,k.children)}else!Z&&N==null&&Ne(W,k,ee,ie,S,O,M);((de=ie.onVnodeUpdated)||oe)&&st(()=>{de&&Bt(de,S,k,x),oe&&an(k,x,S,"updated")},O)},ae=(x,k,S,O,M,q,Z)=>{for(let W=0;W<k.length;W++){const K=x[W],N=k[W],oe=K.el&&(K.type===Ge||!un(K,N)||K.shapeFlag&70)?g(K.el):S;C(K,N,oe,null,O,M,q,Z,!0)}},Ne=(x,k,S,O,M,q,Z)=>{if(S!==O){if(S!==De)for(const W in S)!$r(W)&&!(W in O)&&l(x,W,S[W],null,Z,k.children,M,q,je);for(const W in O){if($r(W))continue;const K=O[W],N=S[W];K!==N&&W!=="value"&&l(x,W,N,K,Z,k.children,M,q,je)}"value"in O&&l(x,"value",S.value,O.value)}},G=(x,k,S,O,M,q,Z,W,K)=>{const N=k.el=x?x.el:u(""),oe=k.anchor=x?x.anchor:u("");let{patchFlag:ee,dynamicChildren:ie,slotScopeIds:de}=k;de&&(W=W?W.concat(de):de),x==null?(r(N,S,O),r(oe,S,O),ue(k.children,S,oe,M,q,Z,W,K)):ee>0&&ee&64&&ie&&x.dynamicChildren?(ae(x.dynamicChildren,ie,S,M,q,Z,W),(k.key!=null||M&&k===M.subTree)&&Js(x,k,!0)):ye(x,k,S,oe,M,q,Z,W,K)},me=(x,k,S,O,M,q,Z,W,K)=>{k.slotScopeIds=W,x==null?k.shapeFlag&512?M.ctx.activate(k,S,O,Z,K):We(k,S,O,M,q,Z,K):tt(x,k,K)},We=(x,k,S,O,M,q,Z)=>{const W=x.component=Hf(x,O,M);if(ko(x)&&(W.ctx.renderer=Y),Uf(W),W.asyncDep){if(M&&M.registerDep(W,Pe),!x.el){const K=W.subTree=F(yt);_(null,K,k,S)}return}Pe(W,x,k,S,M,q,Z)},tt=(x,k,S)=>{const O=k.component=x.component;if(Ku(x,k,S))if(O.asyncDep&&!O.asyncResolved){we(O,k,S);return}else O.next=k,Fu(O.update),O.update();else k.el=x.el,O.vnode=k},Pe=(x,k,S,O,M,q,Z)=>{const W=()=>{if(x.isMounted){let{next:oe,bu:ee,u:ie,parent:de,vnode:be}=x,Oe=oe,Le;ln(x,!1),oe?(oe.el=be.el,we(x,oe,Z)):oe=be,ee&&Jo(ee),(Le=oe.props&&oe.props.onVnodeBeforeUpdate)&&Bt(Le,de,oe,be),ln(x,!0);const qe=Zo(x),dt=x.subTree;x.subTree=qe,C(dt,qe,g(dt.el),z(dt),x,M,q),oe.el=qe.el,Oe===null&&Vu(x,qe.el),ie&&st(ie,M),(Le=oe.props&&oe.props.onVnodeUpdated)&&st(()=>Bt(Le,de,oe,be),M)}else{let oe;const{el:ee,props:ie}=k,{bm:de,m:be,parent:Oe}=x,Le=yr(k);if(ln(x,!1),de&&Jo(de),!Le&&(oe=ie&&ie.onVnodeBeforeMount)&&Bt(oe,Oe,k),ln(x,!0),ee&&Ce){const qe=()=>{x.subTree=Zo(x),Ce(ee,x.subTree,x,M,null)};Le?k.type.__asyncLoader().then(()=>!x.isUnmounted&&qe()):qe()}else{const qe=x.subTree=Zo(x);C(null,qe,S,O,x,M,q),k.el=qe.el}if(be&&st(be,M),!Le&&(oe=ie&&ie.onVnodeMounted)){const qe=k;st(()=>Bt(oe,Oe,qe),M)}(k.shapeFlag&256||Oe&&yr(Oe.vnode)&&Oe.vnode.shapeFlag&256)&&x.a&&st(x.a,M),x.isMounted=!0,k=S=O=null}},K=x.effect=new qi(W,()=>Vi(N),x.scope),N=x.update=()=>K.run();N.id=x.uid,ln(x,!0),N()},we=(x,k,S)=>{k.component=x;const O=x.vnode.props;x.vnode=k,x.next=null,Sf(x,k.props,O,S),_f(x,k.children,S),zn(),Za(),Mn()},ye=(x,k,S,O,M,q,Z,W,K=!1)=>{const N=x&&x.children,oe=x?x.shapeFlag:0,ee=k.children,{patchFlag:ie,shapeFlag:de}=k;if(ie>0){if(ie&128){se(N,ee,S,O,M,q,Z,W,K);return}else if(ie&256){te(N,ee,S,O,M,q,Z,W,K);return}}de&8?(oe&16&&je(N,M,q),ee!==N&&b(S,ee)):oe&16?de&16?se(N,ee,S,O,M,q,Z,W,K):je(N,M,q,!0):(oe&8&&b(S,""),de&16&&ue(ee,S,O,M,q,Z,W,K))},te=(x,k,S,O,M,q,Z,W,K)=>{x=x||Bn,k=k||Bn;const N=x.length,oe=k.length,ee=Math.min(N,oe);let ie;for(ie=0;ie<ee;ie++){const de=k[ie]=K?Vt(k[ie]):St(k[ie]);C(x[ie],de,S,null,M,q,Z,W,K)}N>oe?je(x,M,q,!0,!1,ee):ue(k,S,O,M,q,Z,W,K,ee)},se=(x,k,S,O,M,q,Z,W,K)=>{let N=0;const oe=k.length;let ee=x.length-1,ie=oe-1;for(;N<=ee&&N<=ie;){const de=x[N],be=k[N]=K?Vt(k[N]):St(k[N]);if(un(de,be))C(de,be,S,null,M,q,Z,W,K);else break;N++}for(;N<=ee&&N<=ie;){const de=x[ee],be=k[ie]=K?Vt(k[ie]):St(k[ie]);if(un(de,be))C(de,be,S,null,M,q,Z,W,K);else break;ee--,ie--}if(N>ee){if(N<=ie){const de=ie+1,be=de<oe?k[de].el:O;for(;N<=ie;)C(null,k[N]=K?Vt(k[N]):St(k[N]),S,be,M,q,Z,W,K),N++}}else if(N>ie)for(;N<=ee;)ve(x[N],M,q,!0),N++;else{const de=N,be=N,Oe=new Map;for(N=be;N<=ie;N++){const rt=k[N]=K?Vt(k[N]):St(k[N]);rt.key!=null&&Oe.set(rt.key,N)}let Le,qe=0;const dt=ie-be+1;let Ot=!1,P=0;const ut=new Array(dt);for(N=0;N<dt;N++)ut[N]=0;for(N=de;N<=ee;N++){const rt=x[N];if(qe>=dt){ve(rt,M,q,!0);continue}let ge;if(rt.key!=null)ge=Oe.get(rt.key);else for(Le=be;Le<=ie;Le++)if(ut[Le-be]===0&&un(rt,k[Le])){ge=Le;break}ge===void 0?ve(rt,M,q,!0):(ut[ge-be]=N+1,ge>=P?P=ge:Ot=!0,C(rt,k[ge],S,null,M,q,Z,W,K),qe++)}const Fn=Ot?Rf(ut):Bn;for(Le=Fn.length-1,N=dt-1;N>=0;N--){const rt=be+N,ge=k[rt],Pr=rt+1<oe?k[rt+1].el:O;ut[N]===0?C(null,ge,S,Pr,M,q,Z,W,K):Ot&&(Le<0||N!==Fn[Le]?fe(ge,S,Pr,2):Le--)}}},fe=(x,k,S,O,M=null)=>{const{el:q,type:Z,transition:W,children:K,shapeFlag:N}=x;if(N&6){fe(x.component.subTree,k,S,O);return}if(N&128){x.suspense.move(k,S,O);return}if(N&64){Z.move(x,k,S,Y);return}if(Z===Ge){r(q,k,S);for(let ee=0;ee<K.length;ee++)fe(K[ee],k,S,O);r(x.anchor,k,S);return}if(Z===ei){H(x,k,S);return}if(O!==2&&N&1&&W)if(O===0)W.beforeEnter(q),r(q,k,S),st(()=>W.enter(q),M);else{const{leave:ee,delayLeave:ie,afterLeave:de}=W,be=()=>r(q,k,S),Oe=()=>{ee(q,()=>{be(),de&&de()})};ie?ie(q,be,Oe):Oe()}else r(q,k,S)},ve=(x,k,S,O=!1,M=!1)=>{const{type:q,props:Z,ref:W,children:K,dynamicChildren:N,shapeFlag:oe,patchFlag:ee,dirs:ie}=x;if(W!=null&&wi(W,null,S,x,!0),oe&256){k.ctx.deactivate(x);return}const de=oe&1&&ie,be=!yr(x);let Oe;if(be&&(Oe=Z&&Z.onVnodeBeforeUnmount)&&Bt(Oe,k,x),oe&6)wt(x.component,S,O);else{if(oe&128){x.suspense.unmount(S,O);return}de&&an(x,null,k,"beforeUnmount"),oe&64?x.type.remove(x,k,S,M,Y,O):N&&(q!==Ge||ee>0&&ee&64)?je(N,k,S,!1,!0):(q===Ge&&ee&384||!M&&oe&16)&&je(K,k,S),O&&Xe(x)}(be&&(Oe=Z&&Z.onVnodeUnmounted)||de)&&st(()=>{Oe&&Bt(Oe,k,x),de&&an(x,null,k,"unmounted")},S)},Xe=x=>{const{type:k,el:S,anchor:O,transition:M}=x;if(k===Ge){nt(S,O);return}if(k===ei){D(x);return}const q=()=>{o(S),M&&!M.persisted&&M.afterLeave&&M.afterLeave()};if(x.shapeFlag&1&&M&&!M.persisted){const{leave:Z,delayLeave:W}=M,K=()=>Z(S,q);W?W(x.el,q,K):K()}else q()},nt=(x,k)=>{let S;for(;x!==k;)S=f(x),o(x),x=S;o(k)},wt=(x,k,S)=>{const{bum:O,scope:M,update:q,subTree:Z,um:W}=x;O&&Jo(O),M.stop(),q&&(q.active=!1,ve(Z,x,k,S)),W&&st(W,k),st(()=>{x.isUnmounted=!0},k),k&&k.pendingBranch&&!k.isUnmounted&&x.asyncDep&&!x.asyncResolved&&x.suspenseId===k.pendingId&&(k.deps--,k.deps===0&&k.resolve())},je=(x,k,S,O=!1,M=!1,q=0)=>{for(let Z=q;Z<x.length;Z++)ve(x[Z],k,S,O,M)},z=x=>x.shapeFlag&6?z(x.component.subTree):x.shapeFlag&128?x.suspense.next():f(x.anchor||x.el),J=(x,k,S)=>{x==null?k._vnode&&ve(k._vnode,null,null,!0):C(k._vnode||null,x,k,null,null,null,S),Za(),Ts(),k._vnode=x},Y={p:C,um:ve,m:fe,r:Xe,mt:We,mc:ue,pc:ye,pbc:ae,n:z,o:e};let re,Ce;return t&&([re,Ce]=t(Y)),{render:J,hydrate:re,createApp:Cf(J,re)}}function ln({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function Js(e,t,n=!1){const r=e.children,o=t.children;if(ce(r)&&ce(o))for(let l=0;l<r.length;l++){const c=r[l];let u=o[l];u.shapeFlag&1&&!u.dynamicChildren&&((u.patchFlag<=0||u.patchFlag===32)&&(u=o[l]=Vt(o[l]),u.el=c.el),n||Js(c,u)),u.type===Co&&(u.el=c.el)}}function Rf(e){const t=e.slice(),n=[0];let r,o,l,c,u;const h=e.length;for(r=0;r<h;r++){const y=e[r];if(y!==0){if(o=n[n.length-1],e[o]<y){t[r]=o,n.push(r);continue}for(l=0,c=n.length-1;l<c;)u=l+c>>1,e[n[u]]<y?l=u+1:c=u;y<e[n[l]]&&(l>0&&(t[r]=n[l-1]),n[l]=r)}}for(l=n.length,c=n[l-1];l-- >0;)n[l]=c,c=t[c];return n}const Pf=e=>e.__isTeleport,Ge=Symbol.for("v-fgt"),Co=Symbol.for("v-txt"),yt=Symbol.for("v-cmt"),ei=Symbol.for("v-stc"),br=[];let Et=null;function le(e=!1){br.push(Et=e?null:[])}function jf(){br.pop(),Et=br[br.length-1]||null}let Br=1;function cl(e){Br+=e}function Zs(e){return e.dynamicChildren=Br>0?Et||Bn:null,jf(),Br>0&&Et&&Et.push(e),e}function He(e,t,n,r,o,l){return Zs(Ee(e,t,n,r,o,l,!0))}function ze(e,t,n,r,o){return Zs(F(e,t,n,r,o,!0))}function so(e){return e?e.__v_isVNode===!0:!1}function un(e,t){return e.type===t.type&&e.key===t.key}const Bo="__vInternal",Xs=({key:e})=>e??null,Xr=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?Ke(e)||it(e)||he(e)?{i:et,r:e,k:t,f:!!n}:e:null);function Ee(e,t=null,n=null,r=0,o=null,l=e===Ge?0:1,c=!1,u=!1){const h={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Xs(t),ref:t&&Xr(t),scopeId:Eo,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:l,patchFlag:r,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:et};return u?(Xi(h,n),l&128&&e.normalize(h)):n&&(h.shapeFlag|=Ke(n)?8:16),Br>0&&!c&&Et&&(h.patchFlag>0||l&6)&&h.patchFlag!==32&&Et.push(h),h}const F=zf;function zf(e,t=null,n=null,r=0,o=null,l=!1){if((!e||e===Af)&&(e=yt),so(e)){const u=nn(e,t,!0);return n&&Xi(u,n),Br>0&&!l&&Et&&(u.shapeFlag&6?Et[Et.indexOf(e)]=u:Et.push(u)),u.patchFlag|=-2,u}if($f(e)&&(e=e.__vccOpts),t){t=Mf(t);let{class:u,style:h}=t;u&&!Ke(u)&&(t.class=xr(u)),Fe(h)&&(ks(h)&&!ce(h)&&(h=Qe({},h)),t.style=mo(h))}const c=Ke(e)?1:$u(e)?128:Pf(e)?64:Fe(e)?4:he(e)?2:0;return Ee(e,t,n,r,o,c,l,!0)}function Mf(e){return e?ks(e)||Bo in e?Qe({},e):e:null}function nn(e,t,n=!1){const{props:r,ref:o,patchFlag:l,children:c}=e,u=t?Ff(r||{},t):r;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:u,key:u&&Xs(u),ref:t&&t.ref?n&&o?ce(o)?o.concat(Xr(t)):[o,Xr(t)]:Xr(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:c,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Ge?l===-1?16:l|16:l,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&nn(e.ssContent),ssFallback:e.ssFallback&&nn(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function Df(e=" ",t=0){return F(Co,null,e,t)}function mn(e="",t=!1){return t?(le(),ze(yt,null,e)):F(yt,null,e)}function St(e){return e==null||typeof e=="boolean"?F(yt):ce(e)?F(Ge,null,e.slice()):typeof e=="object"?Vt(e):F(Co,null,String(e))}function Vt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:nn(e)}function Xi(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(ce(t))n=16;else if(typeof t=="object")if(r&65){const o=t.default;o&&(o._c&&(o._d=!1),Xi(e,o()),o._c&&(o._d=!0));return}else{n=32;const o=t._;!o&&!(Bo in t)?t._ctx=et:o===3&&et&&(et.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else he(t)?(t={default:t,_ctx:et},n=32):(t=String(t),r&64?(n=16,t=[Df(t)]):n=8);e.children=t,e.shapeFlag|=n}function Ff(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const o in r)if(o==="class")t.class!==r.class&&(t.class=xr([t.class,r.class]));else if(o==="style")t.style=mo([t.style,r.style]);else if(fo(o)){const l=t[o],c=r[o];c&&l!==c&&!(ce(l)&&l.includes(c))&&(t[o]=l?[].concat(l,c):c)}else o!==""&&(t[o]=r[o])}return t}function Bt(e,t,n,r=null){ht(e,t,7,[n,r])}const Nf=Us();let qf=0;function Hf(e,t,n){const r=e.type,o=(t?t.appContext:e.appContext)||Nf,l={uid:qf++,vnode:e,type:r,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,scope:new ru(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Qs(r,o),emitsOptions:Rs(r,o),emit:null,emitted:null,propsDefaults:De,inheritAttrs:r.inheritAttrs,ctx:De,data:De,props:De,attrs:De,slots:De,refs:De,setupState:De,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return l.ctx={_:l},l.root=t?t.root:l,l.emit=Hu.bind(null,l),e.ce&&e.ce(l),l}let Ze=null;const Wf=()=>Ze||et;let Gi,wn,dl="__VUE_INSTANCE_SETTERS__";(wn=ui()[dl])||(wn=ui()[dl]=[]),wn.push(e=>Ze=e),Gi=e=>{wn.length>1?wn.forEach(t=>t(e)):wn[0](e)};const Tn=e=>{Gi(e),e.scope.on()},bn=()=>{Ze&&Ze.scope.off(),Gi(null)};function Gs(e){return e.vnode.shapeFlag&4}let Sr=!1;function Uf(e,t=!1){Sr=t;const{props:n,children:r}=e.vnode,o=Gs(e);Bf(e,n,o,t),If(e,r);const l=o?Yf(e,t):void 0;return Sr=!1,l}function Yf(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=ws(new Proxy(e.ctx,bf));const{setup:r}=n;if(r){const o=e.setupContext=r.length>1?Kf(e):null;Tn(e),zn();const l=Xt(r,e,0,[e.props,o]);if(Mn(),bn(),as(l)){if(l.then(bn,bn),t)return l.then(c=>{pl(e,c,t)}).catch(c=>{go(c,e,0)});e.asyncDep=l}else pl(e,l,t)}else ec(e,t)}function pl(e,t,n){he(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Fe(t)&&(e.setupState=Ls(t)),ec(e,n)}let ul;function ec(e,t,n){const r=e.type;if(!e.render){if(!t&&ul&&!r.render){const o=r.template||Ji(e).template;if(o){const{isCustomElement:l,compilerOptions:c}=e.appContext.config,{delimiters:u,compilerOptions:h}=r,y=Qe(Qe({isCustomElement:l,delimiters:u},c),h);r.render=ul(o,y)}}e.render=r.render||xt}Tn(e),zn(),gf(e),Mn(),bn()}function Qf(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,n){return ct(e,"get","$attrs"),t[n]}}))}function Kf(e){const t=n=>{e.exposed=n||{}};return{get attrs(){return Qf(e)},slots:e.slots,emit:e.emit,expose:t}}function So(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Ls(ws(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in mr)return mr[n](e)},has(t,n){return n in t||n in mr}}))}function Vf(e,t=!0){return he(e)?e.displayName||e.name:e.name||t&&e.__name}function $f(e){return he(e)&&"__vccOpts"in e}const pt=(e,t)=>zu(e,t,Sr);function ea(e,t,n){const r=arguments.length;return r===2?Fe(t)&&!ce(t)?so(t)?F(e,null,[t]):F(e,t):F(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&so(n)&&(n=[n]),F(e,t,n))}const Jf=Symbol.for("v-scx"),Zf=()=>At(Jf),Xf="3.3.4",Gf="http://www.w3.org/2000/svg",fn=typeof document<"u"?document:null,fl=fn&&fn.createElement("template"),eh={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const o=t?fn.createElementNS(Gf,e):fn.createElement(e,n?{is:n}:void 0);return e==="select"&&r&&r.multiple!=null&&o.setAttribute("multiple",r.multiple),o},createText:e=>fn.createTextNode(e),createComment:e=>fn.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>fn.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,o,l){const c=n?n.previousSibling:t.lastChild;if(o&&(o===l||o.nextSibling))for(;t.insertBefore(o.cloneNode(!0),n),!(o===l||!(o=o.nextSibling)););else{fl.innerHTML=r?`<svg>${e}</svg>`:e;const u=fl.content;if(r){const h=u.firstChild;for(;h.firstChild;)u.appendChild(h.firstChild);u.removeChild(h)}t.insertBefore(u,n)}return[c?c.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function th(e,t,n){const r=e._vtc;r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function nh(e,t,n){const r=e.style,o=Ke(n);if(n&&!o){if(t&&!Ke(t))for(const l in t)n[l]==null&&Ci(r,l,"");for(const l in n)Ci(r,l,n[l])}else{const l=r.display;o?t!==n&&(r.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(r.display=l)}}const hl=/\s*!important$/;function Ci(e,t,n){if(ce(n))n.forEach(r=>Ci(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=rh(e,t);hl.test(n)?e.setProperty(jn(r),n.replace(hl,""),"important"):e[r]=n}}const Al=["Webkit","Moz","ms"],ti={};function rh(e,t){const n=ti[t];if(n)return n;let r=_t(t);if(r!=="filter"&&r in e)return ti[t]=r;r=yo(r);for(let o=0;o<Al.length;o++){const l=Al[o]+r;if(l in e)return ti[t]=l}return t}const yl="http://www.w3.org/1999/xlink";function oh(e,t,n,r,o){if(r&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(yl,t.slice(6,t.length)):e.setAttributeNS(yl,t,n);else{const l=nu(t);n==null||l&&!cs(n)?e.removeAttribute(t):e.setAttribute(t,l?"":n)}}function ih(e,t,n,r,o,l,c){if(t==="innerHTML"||t==="textContent"){r&&c(r,o,l),e[t]=n??"";return}const u=e.tagName;if(t==="value"&&u!=="PROGRESS"&&!u.includes("-")){e._value=n;const y=u==="OPTION"?e.getAttribute("value"):e.value,b=n??"";y!==b&&(e.value=b),n==null&&e.removeAttribute(t);return}let h=!1;if(n===""||n==null){const y=typeof e[t];y==="boolean"?n=cs(n):n==null&&y==="string"?(n="",h=!0):y==="number"&&(n=0,h=!0)}try{e[t]=n}catch{}h&&e.removeAttribute(t)}function ah(e,t,n,r){e.addEventListener(t,n,r)}function lh(e,t,n,r){e.removeEventListener(t,n,r)}function sh(e,t,n,r,o=null){const l=e._vei||(e._vei={}),c=l[t];if(r&&c)c.value=r;else{const[u,h]=ch(t);if(r){const y=l[t]=uh(r,o);ah(e,u,y,h)}else c&&(lh(e,u,c,h),l[t]=void 0)}}const ml=/(?:Once|Passive|Capture)$/;function ch(e){let t;if(ml.test(e)){t={};let r;for(;r=e.match(ml);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):jn(e.slice(2)),t]}let ni=0;const dh=Promise.resolve(),ph=()=>ni||(dh.then(()=>ni=0),ni=Date.now());function uh(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;ht(fh(r,n.value),t,5,[r])};return n.value=e,n.attached=ph(),n}function fh(e,t){if(ce(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>o=>!o._stopped&&r&&r(o))}else return t}const bl=/^on[a-z]/,hh=(e,t,n,r,o=!1,l,c,u,h)=>{t==="class"?th(e,r,o):t==="style"?nh(e,n,r):fo(t)?zi(t)||sh(e,t,n,r,c):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Ah(e,t,r,o))?ih(e,t,r,l,c,u,h):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),oh(e,t,r,o))};function Ah(e,t,n,r){return r?!!(t==="innerHTML"||t==="textContent"||t in e&&bl.test(t)&&he(n)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||bl.test(t)&&Ke(n)?!1:t in e}const Ut="transition",cr="animation",co=(e,{slots:t})=>ea(tf,yh(e),t);co.displayName="Transition";const tc={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String};co.props=Qe({},zs,tc);const sn=(e,t=[])=>{ce(e)?e.forEach(n=>n(...t)):e&&e(...t)},gl=e=>e?ce(e)?e.some(t=>t.length>1):e.length>1:!1;function yh(e){const t={};for(const G in e)G in tc||(t[G]=e[G]);if(e.css===!1)return t;const{name:n="v",type:r,duration:o,enterFromClass:l=`${n}-enter-from`,enterActiveClass:c=`${n}-enter-active`,enterToClass:u=`${n}-enter-to`,appearFromClass:h=l,appearActiveClass:y=c,appearToClass:b=u,leaveFromClass:g=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:w=`${n}-leave-to`}=e,B=mh(o),C=B&&B[0],R=B&&B[1],{onBeforeEnter:_,onEnter:I,onEnterCancelled:H,onLeave:D,onLeaveCancelled:Ae,onBeforeAppear:Se=_,onAppear:Ue=I,onAppearCancelled:ue=H}=t,Ie=(G,me,We)=>{cn(G,me?b:u),cn(G,me?y:c),We&&We()},ae=(G,me)=>{G._isLeaving=!1,cn(G,g),cn(G,w),cn(G,f),me&&me()},Ne=G=>(me,We)=>{const tt=G?Ue:I,Pe=()=>Ie(me,G,We);sn(tt,[me,Pe]),vl(()=>{cn(me,G?h:l),Yt(me,G?b:u),gl(tt)||El(me,r,C,Pe)})};return Qe(t,{onBeforeEnter(G){sn(_,[G]),Yt(G,l),Yt(G,c)},onBeforeAppear(G){sn(Se,[G]),Yt(G,h),Yt(G,y)},onEnter:Ne(!1),onAppear:Ne(!0),onLeave(G,me){G._isLeaving=!0;const We=()=>ae(G,me);Yt(G,g),vh(),Yt(G,f),vl(()=>{G._isLeaving&&(cn(G,g),Yt(G,w),gl(D)||El(G,r,R,We))}),sn(D,[G,We])},onEnterCancelled(G){Ie(G,!1),sn(H,[G])},onAppearCancelled(G){Ie(G,!0),sn(ue,[G])},onLeaveCancelled(G){ae(G),sn(Ae,[G])}})}function mh(e){if(e==null)return null;if(Fe(e))return[ri(e.enter),ri(e.leave)];{const t=ri(e);return[t,t]}}function ri(e){return Jp(e)}function Yt(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e._vtc||(e._vtc=new Set)).add(t)}function cn(e,t){t.split(/\s+/).forEach(r=>r&&e.classList.remove(r));const{_vtc:n}=e;n&&(n.delete(t),n.size||(e._vtc=void 0))}function vl(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let bh=0;function El(e,t,n,r){const o=e._endId=++bh,l=()=>{o===e._endId&&r()};if(n)return setTimeout(l,n);const{type:c,timeout:u,propCount:h}=gh(e,t);if(!c)return r();const y=c+"end";let b=0;const g=()=>{e.removeEventListener(y,f),l()},f=w=>{w.target===e&&++b>=h&&g()};setTimeout(()=>{b<h&&g()},u+1),e.addEventListener(y,f)}function gh(e,t){const n=window.getComputedStyle(e),r=B=>(n[B]||"").split(", "),o=r(`${Ut}Delay`),l=r(`${Ut}Duration`),c=xl(o,l),u=r(`${cr}Delay`),h=r(`${cr}Duration`),y=xl(u,h);let b=null,g=0,f=0;t===Ut?c>0&&(b=Ut,g=c,f=l.length):t===cr?y>0&&(b=cr,g=y,f=h.length):(g=Math.max(c,y),b=g>0?c>y?Ut:cr:null,f=b?b===Ut?l.length:h.length:0);const w=b===Ut&&/\b(transform|all)(,|$)/.test(r(`${Ut}Property`).toString());return{type:b,timeout:g,propCount:f,hasTransform:w}}function xl(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,r)=>kl(n)+kl(e[r])))}function kl(e){return Number(e.slice(0,-1).replace(",","."))*1e3}function vh(){return document.body.offsetHeight}const Eh=Qe({patchProp:hh},eh);let wl;function xh(){return wl||(wl=Tf(Eh))}const kh=(...e)=>{const t=xh().createApp(...e),{mount:n}=t;return t.mount=r=>{const o=wh(r);if(!o)return;const l=t._component;!he(l)&&!l.render&&!l.template&&(l.template=o.innerHTML),o.innerHTML="";const c=n(o,!1,o instanceof SVGElement);return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),c},t};function wh(e){return Ke(e)?document.querySelector(e):e}const Tr=(e,t)=>{const n=e.__vccOpts||e;for(const[r,o]of t)n[r]=o;return n},Ch={};function Bh(e,t){const n=hf("router-view");return le(),ze(n)}const Sh=Tr(Ch,[["render",Bh]]);/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const Cn=typeof window<"u";function Lh(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const _e=Object.assign;function oi(e,t){const n={};for(const r in t){const o=t[r];n[r]=kt(o)?o.map(e):e(o)}return n}const gr=()=>{},kt=Array.isArray,Ih=/\/$/,_h=e=>e.replace(Ih,"");function ii(e,t,n="/"){let r,o={},l="",c="";const u=t.indexOf("#");let h=t.indexOf("?");return u<h&&u>=0&&(h=-1),h>-1&&(r=t.slice(0,h),l=t.slice(h+1,u>-1?u:t.length),o=e(l)),u>-1&&(r=r||t.slice(0,u),c=t.slice(u,t.length)),r=Ph(r??t,n),{fullPath:r+(l&&"?")+l+c,path:r,query:o,hash:c}}function Th(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function Cl(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function Oh(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&On(t.matched[r],n.matched[o])&&nc(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function On(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function nc(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!Rh(e[n],t[n]))return!1;return!0}function Rh(e,t){return kt(e)?Bl(e,t):kt(t)?Bl(t,e):e===t}function Bl(e,t){return kt(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function Ph(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];(o===".."||o===".")&&r.push("");let l=n.length-1,c,u;for(c=0;c<r.length;c++)if(u=r[c],u!==".")if(u==="..")l>1&&l--;else break;return n.slice(0,l).join("/")+"/"+r.slice(c-(c===r.length?1:0)).join("/")}var Lr;(function(e){e.pop="pop",e.push="push"})(Lr||(Lr={}));var vr;(function(e){e.back="back",e.forward="forward",e.unknown=""})(vr||(vr={}));function jh(e){if(!e)if(Cn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),_h(e)}const zh=/^[^#]+#/;function Mh(e,t){return e.replace(zh,"#")+t}function Dh(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const Lo=()=>({left:window.pageXOffset,top:window.pageYOffset});function Fh(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=Dh(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function Sl(e,t){return(history.state?history.state.position-t:-1)+e}const Bi=new Map;function Nh(e,t){Bi.set(e,t)}function qh(e){const t=Bi.get(e);return Bi.delete(e),t}let Hh=()=>location.protocol+"//"+location.host;function rc(e,t){const{pathname:n,search:r,hash:o}=t,l=e.indexOf("#");if(l>-1){let u=o.includes(e.slice(l))?e.slice(l).length:1,h=o.slice(u);return h[0]!=="/"&&(h="/"+h),Cl(h,"")}return Cl(n,e)+r+o}function Wh(e,t,n,r){let o=[],l=[],c=null;const u=({state:f})=>{const w=rc(e,location),B=n.value,C=t.value;let R=0;if(f){if(n.value=w,t.value=f,c&&c===B){c=null;return}R=C?f.position-C.position:0}else r(w);o.forEach(_=>{_(n.value,B,{delta:R,type:Lr.pop,direction:R?R>0?vr.forward:vr.back:vr.unknown})})};function h(){c=n.value}function y(f){o.push(f);const w=()=>{const B=o.indexOf(f);B>-1&&o.splice(B,1)};return l.push(w),w}function b(){const{history:f}=window;f.state&&f.replaceState(_e({},f.state,{scroll:Lo()}),"")}function g(){for(const f of l)f();l=[],window.removeEventListener("popstate",u),window.removeEventListener("beforeunload",b)}return window.addEventListener("popstate",u),window.addEventListener("beforeunload",b,{passive:!0}),{pauseListeners:h,listen:y,destroy:g}}function Ll(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?Lo():null}}function Uh(e){const{history:t,location:n}=window,r={value:rc(e,n)},o={value:t.state};o.value||l(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function l(h,y,b){const g=e.indexOf("#"),f=g>-1?(n.host&&document.querySelector("base")?e:e.slice(g))+h:Hh()+e+h;try{t[b?"replaceState":"pushState"](y,"",f),o.value=y}catch(w){console.error(w),n[b?"replace":"assign"](f)}}function c(h,y){const b=_e({},t.state,Ll(o.value.back,h,o.value.forward,!0),y,{position:o.value.position});l(h,b,!0),r.value=h}function u(h,y){const b=_e({},o.value,t.state,{forward:h,scroll:Lo()});l(b.current,b,!0);const g=_e({},Ll(r.value,h,null),{position:b.position+1},y);l(h,g,!1),r.value=h}return{location:r,state:o,push:u,replace:c}}function Yh(e){e=jh(e);const t=Uh(e),n=Wh(e,t.state,t.location,t.replace);function r(l,c=!0){c||n.pauseListeners(),history.go(l)}const o=_e({location:"",base:e,go:r,createHref:Mh.bind(null,e)},t,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>t.state.value}),o}function Qh(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),Yh(e)}function Kh(e){return typeof e=="string"||e&&typeof e=="object"}function oc(e){return typeof e=="string"||typeof e=="symbol"}const Qt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},ic=Symbol("");var Il;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(Il||(Il={}));function Rn(e,t){return _e(new Error,{type:e,[ic]:!0},t)}function Pt(e,t){return e instanceof Error&&ic in e&&(t==null||!!(e.type&t))}const _l="[^/]+?",Vh={sensitive:!1,strict:!1,start:!0,end:!0},$h=/[.+*?^${}()[\]/\\]/g;function Jh(e,t){const n=_e({},Vh,t),r=[];let o=n.start?"^":"";const l=[];for(const y of e){const b=y.length?[]:[90];n.strict&&!y.length&&(o+="/");for(let g=0;g<y.length;g++){const f=y[g];let w=40+(n.sensitive?.25:0);if(f.type===0)g||(o+="/"),o+=f.value.replace($h,"\\$&"),w+=40;else if(f.type===1){const{value:B,repeatable:C,optional:R,regexp:_}=f;l.push({name:B,repeatable:C,optional:R});const I=_||_l;if(I!==_l){w+=10;try{new RegExp(`(${I})`)}catch(D){throw new Error(`Invalid custom RegExp for param "${B}" (${I}): `+D.message)}}let H=C?`((?:${I})(?:/(?:${I}))*)`:`(${I})`;g||(H=R&&y.length<2?`(?:/${H})`:"/"+H),R&&(H+="?"),o+=H,w+=20,R&&(w+=-8),C&&(w+=-20),I===".*"&&(w+=-50)}b.push(w)}r.push(b)}if(n.strict&&n.end){const y=r.length-1;r[y][r[y].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const c=new RegExp(o,n.sensitive?"":"i");function u(y){const b=y.match(c),g={};if(!b)return null;for(let f=1;f<b.length;f++){const w=b[f]||"",B=l[f-1];g[B.name]=w&&B.repeatable?w.split("/"):w}return g}function h(y){let b="",g=!1;for(const f of e){(!g||!b.endsWith("/"))&&(b+="/"),g=!1;for(const w of f)if(w.type===0)b+=w.value;else if(w.type===1){const{value:B,repeatable:C,optional:R}=w,_=B in y?y[B]:"";if(kt(_)&&!C)throw new Error(`Provided param "${B}" is an array but it is not repeatable (* or + modifiers)`);const I=kt(_)?_.join("/"):_;if(!I)if(R)f.length<2&&(b.endsWith("/")?b=b.slice(0,-1):g=!0);else throw new Error(`Missing required param "${B}"`);b+=I}}return b||"/"}return{re:c,score:r,keys:l,parse:u,stringify:h}}function Zh(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===40+40?-1:1:e.length>t.length?t.length===1&&t[0]===40+40?1:-1:0}function Xh(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const l=Zh(r[n],o[n]);if(l)return l;n++}if(Math.abs(o.length-r.length)===1){if(Tl(r))return 1;if(Tl(o))return-1}return o.length-r.length}function Tl(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Gh={type:0,value:""},eA=/[a-zA-Z0-9_]/;function tA(e){if(!e)return[[]];if(e==="/")return[[Gh]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(w){throw new Error(`ERR (${n})/"${y}": ${w}`)}let n=0,r=n;const o=[];let l;function c(){l&&o.push(l),l=[]}let u=0,h,y="",b="";function g(){y&&(n===0?l.push({type:0,value:y}):n===1||n===2||n===3?(l.length>1&&(h==="*"||h==="+")&&t(`A repeatable param (${y}) must be alone in its segment. eg: '/:ids+.`),l.push({type:1,value:y,regexp:b,repeatable:h==="*"||h==="+",optional:h==="*"||h==="?"})):t("Invalid state to consume buffer"),y="")}function f(){y+=h}for(;u<e.length;){if(h=e[u++],h==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:h==="/"?(y&&g(),c()):h===":"?(g(),n=1):f();break;case 4:f(),n=r;break;case 1:h==="("?n=2:eA.test(h)?f():(g(),n=0,h!=="*"&&h!=="?"&&h!=="+"&&u--);break;case 2:h===")"?b[b.length-1]=="\\"?b=b.slice(0,-1)+h:n=3:b+=h;break;case 3:g(),n=0,h!=="*"&&h!=="?"&&h!=="+"&&u--,b="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${y}"`),g(),c(),o}function nA(e,t,n){const r=Jh(tA(e.path),n),o=_e(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function rA(e,t){const n=[],r=new Map;t=Pl({strict:!1,end:!0,sensitive:!1},t);function o(b){return r.get(b)}function l(b,g,f){const w=!f,B=oA(b);B.aliasOf=f&&f.record;const C=Pl(t,b),R=[B];if("alias"in b){const H=typeof b.alias=="string"?[b.alias]:b.alias;for(const D of H)R.push(_e({},B,{components:f?f.record.components:B.components,path:D,aliasOf:f?f.record:B}))}let _,I;for(const H of R){const{path:D}=H;if(g&&D[0]!=="/"){const Ae=g.record.path,Se=Ae[Ae.length-1]==="/"?"":"/";H.path=g.record.path+(D&&Se+D)}if(_=nA(H,g,C),f?f.alias.push(_):(I=I||_,I!==_&&I.alias.push(_),w&&b.name&&!Rl(_)&&c(b.name)),B.children){const Ae=B.children;for(let Se=0;Se<Ae.length;Se++)l(Ae[Se],_,f&&f.children[Se])}f=f||_,(_.record.components&&Object.keys(_.record.components).length||_.record.name||_.record.redirect)&&h(_)}return I?()=>{c(I)}:gr}function c(b){if(oc(b)){const g=r.get(b);g&&(r.delete(b),n.splice(n.indexOf(g),1),g.children.forEach(c),g.alias.forEach(c))}else{const g=n.indexOf(b);g>-1&&(n.splice(g,1),b.record.name&&r.delete(b.record.name),b.children.forEach(c),b.alias.forEach(c))}}function u(){return n}function h(b){let g=0;for(;g<n.length&&Xh(b,n[g])>=0&&(b.record.path!==n[g].record.path||!ac(b,n[g]));)g++;n.splice(g,0,b),b.record.name&&!Rl(b)&&r.set(b.record.name,b)}function y(b,g){let f,w={},B,C;if("name"in b&&b.name){if(f=r.get(b.name),!f)throw Rn(1,{location:b});C=f.record.name,w=_e(Ol(g.params,f.keys.filter(I=>!I.optional).map(I=>I.name)),b.params&&Ol(b.params,f.keys.map(I=>I.name))),B=f.stringify(w)}else if("path"in b)B=b.path,f=n.find(I=>I.re.test(B)),f&&(w=f.parse(B),C=f.record.name);else{if(f=g.name?r.get(g.name):n.find(I=>I.re.test(g.path)),!f)throw Rn(1,{location:b,currentLocation:g});C=f.record.name,w=_e({},g.params,b.params),B=f.stringify(w)}const R=[];let _=f;for(;_;)R.unshift(_.record),_=_.parent;return{name:C,path:B,params:w,matched:R,meta:aA(R)}}return e.forEach(b=>l(b)),{addRoute:l,resolve:y,removeRoute:c,getRoutes:u,getRecordMatcher:o}}function Ol(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function oA(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:iA(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function iA(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function Rl(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function aA(e){return e.reduce((t,n)=>_e(t,n.meta),{})}function Pl(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function ac(e,t){return t.children.some(n=>n===e||ac(e,n))}const lc=/#/g,lA=/&/g,sA=/\//g,cA=/=/g,dA=/\?/g,sc=/\+/g,pA=/%5B/g,uA=/%5D/g,cc=/%5E/g,fA=/%60/g,dc=/%7B/g,hA=/%7C/g,pc=/%7D/g,AA=/%20/g;function ta(e){return encodeURI(""+e).replace(hA,"|").replace(pA,"[").replace(uA,"]")}function yA(e){return ta(e).replace(dc,"{").replace(pc,"}").replace(cc,"^")}function Si(e){return ta(e).replace(sc,"%2B").replace(AA,"+").replace(lc,"%23").replace(lA,"%26").replace(fA,"`").replace(dc,"{").replace(pc,"}").replace(cc,"^")}function mA(e){return Si(e).replace(cA,"%3D")}function bA(e){return ta(e).replace(lc,"%23").replace(dA,"%3F")}function gA(e){return e==null?"":bA(e).replace(sA,"%2F")}function po(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function vA(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<r.length;++o){const l=r[o].replace(sc," "),c=l.indexOf("="),u=po(c<0?l:l.slice(0,c)),h=c<0?null:po(l.slice(c+1));if(u in t){let y=t[u];kt(y)||(y=t[u]=[y]),y.push(h)}else t[u]=h}return t}function jl(e){let t="";for(let n in e){const r=e[n];if(n=mA(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(kt(r)?r.map(l=>l&&Si(l)):[r&&Si(r)]).forEach(l=>{l!==void 0&&(t+=(t.length?"&":"")+n,l!=null&&(t+="="+l))})}return t}function EA(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=kt(r)?r.map(o=>o==null?null:""+o):r==null?r:""+r)}return t}const xA=Symbol(""),zl=Symbol(""),Io=Symbol(""),na=Symbol(""),Li=Symbol("");function dr(){let e=[];function t(r){return e.push(r),()=>{const o=e.indexOf(r);o>-1&&e.splice(o,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function $t(e,t,n,r,o){const l=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise((c,u)=>{const h=g=>{g===!1?u(Rn(4,{from:n,to:t})):g instanceof Error?u(g):Kh(g)?u(Rn(2,{from:t,to:g})):(l&&r.enterCallbacks[o]===l&&typeof g=="function"&&l.push(g),c())},y=e.call(r&&r.instances[o],t,n,h);let b=Promise.resolve(y);e.length<3&&(b=b.then(h)),b.catch(g=>u(g))})}function ai(e,t,n,r){const o=[];for(const l of e)for(const c in l.components){let u=l.components[c];if(!(t!=="beforeRouteEnter"&&!l.instances[c]))if(kA(u)){const y=(u.__vccOpts||u)[t];y&&o.push($t(y,n,r,l,c))}else{let h=u();o.push(()=>h.then(y=>{if(!y)return Promise.reject(new Error(`Couldn't resolve component "${c}" at "${l.path}"`));const b=Lh(y)?y.default:y;l.components[c]=b;const f=(b.__vccOpts||b)[t];return f&&$t(f,n,r,l,c)()}))}}return o}function kA(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function Ml(e){const t=At(Io),n=At(na),r=pt(()=>t.resolve(Te(e.to))),o=pt(()=>{const{matched:h}=r.value,{length:y}=h,b=h[y-1],g=n.matched;if(!b||!g.length)return-1;const f=g.findIndex(On.bind(null,b));if(f>-1)return f;const w=Dl(h[y-2]);return y>1&&Dl(b)===w&&g[g.length-1].path!==w?g.findIndex(On.bind(null,h[y-2])):f}),l=pt(()=>o.value>-1&&SA(n.params,r.value.params)),c=pt(()=>o.value>-1&&o.value===n.matched.length-1&&nc(n.params,r.value.params));function u(h={}){return BA(h)?t[Te(e.replace)?"replace":"push"](Te(e.to)).catch(gr):Promise.resolve()}return{route:r,href:pt(()=>r.value.href),isActive:l,isExactActive:c,navigate:u}}const wA=xo({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Ml,setup(e,{slots:t}){const n=tn(Ml(e)),{options:r}=At(Io),o=pt(()=>({[Fl(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Fl(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const l=t.default&&t.default(n);return e.custom?l:ea("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},l)}}}),CA=wA;function BA(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function SA(e,t){for(const n in t){const r=t[n],o=e[n];if(typeof r=="string"){if(r!==o)return!1}else if(!kt(o)||o.length!==r.length||r.some((l,c)=>l!==o[c]))return!1}return!0}function Dl(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Fl=(e,t,n)=>e??t??n,LA=xo({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=At(Li),o=pt(()=>e.route||r.value),l=At(zl,0),c=pt(()=>{let y=Te(l);const{matched:b}=o.value;let g;for(;(g=b[y])&&!g.components;)y++;return y}),u=pt(()=>o.value.matched[c.value]);Zr(zl,pt(()=>c.value+1)),Zr(xA,u),Zr(Li,o);const h=Me();return Gt(()=>[h.value,u.value,e.name],([y,b,g],[f,w,B])=>{b&&(b.instances[g]=y,w&&w!==b&&y&&y===f&&(b.leaveGuards.size||(b.leaveGuards=w.leaveGuards),b.updateGuards.size||(b.updateGuards=w.updateGuards))),y&&b&&(!w||!On(b,w)||!f)&&(b.enterCallbacks[g]||[]).forEach(C=>C(y))},{flush:"post"}),()=>{const y=o.value,b=e.name,g=u.value,f=g&&g.components[b];if(!f)return Nl(n.default,{Component:f,route:y});const w=g.props[b],B=w?w===!0?y.params:typeof w=="function"?w(y):w:null,R=ea(f,_e({},B,t,{onVnodeUnmounted:_=>{_.component.isUnmounted&&(g.instances[b]=null)},ref:h}));return Nl(n.default,{Component:R,route:y})||R}}});function Nl(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const IA=LA;function _A(e){const t=rA(e.routes,e),n=e.parseQuery||vA,r=e.stringifyQuery||jl,o=e.history,l=dr(),c=dr(),u=dr(),h=Ou(Qt);let y=Qt;Cn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const b=oi.bind(null,z=>""+z),g=oi.bind(null,gA),f=oi.bind(null,po);function w(z,J){let Y,re;return oc(z)?(Y=t.getRecordMatcher(z),re=J):re=z,t.addRoute(re,Y)}function B(z){const J=t.getRecordMatcher(z);J&&t.removeRoute(J)}function C(){return t.getRoutes().map(z=>z.record)}function R(z){return!!t.getRecordMatcher(z)}function _(z,J){if(J=_e({},J||h.value),typeof z=="string"){const S=ii(n,z,J.path),O=t.resolve({path:S.path},J),M=o.createHref(S.fullPath);return _e(S,O,{params:f(O.params),hash:po(S.hash),redirectedFrom:void 0,href:M})}let Y;if("path"in z)Y=_e({},z,{path:ii(n,z.path,J.path).path});else{const S=_e({},z.params);for(const O in S)S[O]==null&&delete S[O];Y=_e({},z,{params:g(S)}),J.params=g(J.params)}const re=t.resolve(Y,J),Ce=z.hash||"";re.params=b(f(re.params));const x=Th(r,_e({},z,{hash:yA(Ce),path:re.path})),k=o.createHref(x);return _e({fullPath:x,hash:Ce,query:r===jl?EA(z.query):z.query||{}},re,{redirectedFrom:void 0,href:k})}function I(z){return typeof z=="string"?ii(n,z,h.value.path):_e({},z)}function H(z,J){if(y!==z)return Rn(8,{from:J,to:z})}function D(z){return Ue(z)}function Ae(z){return D(_e(I(z),{replace:!0}))}function Se(z){const J=z.matched[z.matched.length-1];if(J&&J.redirect){const{redirect:Y}=J;let re=typeof Y=="function"?Y(z):Y;return typeof re=="string"&&(re=re.includes("?")||re.includes("#")?re=I(re):{path:re},re.params={}),_e({query:z.query,hash:z.hash,params:"path"in re?{}:z.params},re)}}function Ue(z,J){const Y=y=_(z),re=h.value,Ce=z.state,x=z.force,k=z.replace===!0,S=Se(Y);if(S)return Ue(_e(I(S),{state:typeof S=="object"?_e({},Ce,S.state):Ce,force:x,replace:k}),J||Y);const O=Y;O.redirectedFrom=J;let M;return!x&&Oh(r,re,Y)&&(M=Rn(16,{to:O,from:re}),fe(re,re,!0,!1)),(M?Promise.resolve(M):ae(O,re)).catch(q=>Pt(q)?Pt(q,2)?q:se(q):ye(q,O,re)).then(q=>{if(q){if(Pt(q,2))return Ue(_e({replace:k},I(q.to),{state:typeof q.to=="object"?_e({},Ce,q.to.state):Ce,force:x}),J||O)}else q=G(O,re,!0,k,Ce);return Ne(O,re,q),q})}function ue(z,J){const Y=H(z,J);return Y?Promise.reject(Y):Promise.resolve()}function Ie(z){const J=nt.values().next().value;return J&&typeof J.runWithContext=="function"?J.runWithContext(z):z()}function ae(z,J){let Y;const[re,Ce,x]=TA(z,J);Y=ai(re.reverse(),"beforeRouteLeave",z,J);for(const S of re)S.leaveGuards.forEach(O=>{Y.push($t(O,z,J))});const k=ue.bind(null,z,J);return Y.push(k),je(Y).then(()=>{Y=[];for(const S of l.list())Y.push($t(S,z,J));return Y.push(k),je(Y)}).then(()=>{Y=ai(Ce,"beforeRouteUpdate",z,J);for(const S of Ce)S.updateGuards.forEach(O=>{Y.push($t(O,z,J))});return Y.push(k),je(Y)}).then(()=>{Y=[];for(const S of x)if(S.beforeEnter)if(kt(S.beforeEnter))for(const O of S.beforeEnter)Y.push($t(O,z,J));else Y.push($t(S.beforeEnter,z,J));return Y.push(k),je(Y)}).then(()=>(z.matched.forEach(S=>S.enterCallbacks={}),Y=ai(x,"beforeRouteEnter",z,J),Y.push(k),je(Y))).then(()=>{Y=[];for(const S of c.list())Y.push($t(S,z,J));return Y.push(k),je(Y)}).catch(S=>Pt(S,8)?S:Promise.reject(S))}function Ne(z,J,Y){u.list().forEach(re=>Ie(()=>re(z,J,Y)))}function G(z,J,Y,re,Ce){const x=H(z,J);if(x)return x;const k=J===Qt,S=Cn?history.state:{};Y&&(re||k?o.replace(z.fullPath,_e({scroll:k&&S&&S.scroll},Ce)):o.push(z.fullPath,Ce)),h.value=z,fe(z,J,Y,k),se()}let me;function We(){me||(me=o.listen((z,J,Y)=>{if(!wt.listening)return;const re=_(z),Ce=Se(re);if(Ce){Ue(_e(Ce,{replace:!0}),re).catch(gr);return}y=re;const x=h.value;Cn&&Nh(Sl(x.fullPath,Y.delta),Lo()),ae(re,x).catch(k=>Pt(k,12)?k:Pt(k,2)?(Ue(k.to,re).then(S=>{Pt(S,20)&&!Y.delta&&Y.type===Lr.pop&&o.go(-1,!1)}).catch(gr),Promise.reject()):(Y.delta&&o.go(-Y.delta,!1),ye(k,re,x))).then(k=>{k=k||G(re,x,!1),k&&(Y.delta&&!Pt(k,8)?o.go(-Y.delta,!1):Y.type===Lr.pop&&Pt(k,20)&&o.go(-1,!1)),Ne(re,x,k)}).catch(gr)}))}let tt=dr(),Pe=dr(),we;function ye(z,J,Y){se(z);const re=Pe.list();return re.length?re.forEach(Ce=>Ce(z,J,Y)):console.error(z),Promise.reject(z)}function te(){return we&&h.value!==Qt?Promise.resolve():new Promise((z,J)=>{tt.add([z,J])})}function se(z){return we||(we=!z,We(),tt.list().forEach(([J,Y])=>z?Y(z):J()),tt.reset()),z}function fe(z,J,Y,re){const{scrollBehavior:Ce}=e;if(!Cn||!Ce)return Promise.resolve();const x=!Y&&qh(Sl(z.fullPath,0))||(re||!Y)&&history.state&&history.state.scroll||null;return Jt().then(()=>Ce(z,J,x)).then(k=>k&&Fh(k)).catch(k=>ye(k,z,J))}const ve=z=>o.go(z);let Xe;const nt=new Set,wt={currentRoute:h,listening:!0,addRoute:w,removeRoute:B,hasRoute:R,getRoutes:C,resolve:_,options:e,push:D,replace:Ae,go:ve,back:()=>ve(-1),forward:()=>ve(1),beforeEach:l.add,beforeResolve:c.add,afterEach:u.add,onError:Pe.add,isReady:te,install(z){const J=this;z.component("RouterLink",CA),z.component("RouterView",IA),z.config.globalProperties.$router=J,Object.defineProperty(z.config.globalProperties,"$route",{enumerable:!0,get:()=>Te(h)}),Cn&&!Xe&&h.value===Qt&&(Xe=!0,D(o.location).catch(Ce=>{}));const Y={};for(const Ce in Qt)Object.defineProperty(Y,Ce,{get:()=>h.value[Ce],enumerable:!0});z.provide(Io,J),z.provide(na,Es(Y)),z.provide(Li,h);const re=z.unmount;nt.add(z),z.unmount=function(){nt.delete(z),nt.size<1&&(y=Qt,me&&me(),me=null,h.value=Qt,Xe=!1,we=!1),re()}}};function je(z){return z.reduce((J,Y)=>J.then(()=>Ie(Y)),Promise.resolve())}return wt}function TA(e,t){const n=[],r=[],o=[],l=Math.max(t.matched.length,e.matched.length);for(let c=0;c<l;c++){const u=t.matched[c];u&&(e.matched.find(y=>On(y,u))?r.push(u):n.push(u));const h=e.matched[c];h&&(t.matched.find(y=>On(y,h))||o.push(h))}return[n,r,o]}function OA(){return At(Io)}function ra(){return At(na)}var RA={size:"1em",strokeWidth:4,strokeLinecap:"round",strokeLinejoin:"round",rtl:!1,theme:"outline",colors:{outline:{fill:"#333",background:"transparent"},filled:{fill:"#333",background:"#FFF"},twoTone:{fill:"#333",twoTone:"#2F88FF"},multiColor:{outStrokeColor:"#333",outFillColor:"#2F88FF",innerStrokeColor:"#FFF",innerFillColor:"#43CCF8"}},prefix:"i"};function PA(){return"icon-"+((1+Math.random())*4294967296|0).toString(16).substring(1)}function jA(e,t,n){var r=typeof t.fill=="string"?[t.fill]:t.fill||[],o=[],l=t.theme||n.theme;switch(l){case"outline":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("none"),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("none");break;case"filled":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("#FFF"),o.push("#FFF");break;case"two-tone":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.twoTone.twoTone),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.twoTone.twoTone);break;case"multi-color":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.multiColor.outFillColor),o.push(typeof r[2]=="string"?r[2]:n.colors.multiColor.innerStrokeColor),o.push(typeof r[3]=="string"?r[3]:n.colors.multiColor.innerFillColor);break}return{size:t.size||n.size,strokeWidth:t.strokeWidth||n.strokeWidth,strokeLinecap:t.strokeLinecap||n.strokeLinecap,strokeLinejoin:t.strokeLinejoin||n.strokeLinejoin,colors:o,id:e}}var zA=Symbol("icon-context");function lt(e,t,n){var r={name:"icon-"+e,props:["size","strokeWidth","strokeLinecap","strokeLinejoin","theme","fill","spin"],setup:function(l){var c=PA(),u=At(zA,RA);return function(){var h=l.size,y=l.strokeWidth,b=l.strokeLinecap,g=l.strokeLinejoin,f=l.theme,w=l.fill,B=l.spin,C=jA(c,{size:h,strokeWidth:y,strokeLinecap:b,strokeLinejoin:g,theme:f,fill:w},u),R=[u.prefix+"-icon"];return R.push(u.prefix+"-icon-"+e),t&&u.rtl&&R.push(u.prefix+"-icon-rtl"),B&&R.push(u.prefix+"-icon-spin"),F("span",{class:R.join(" ")},[n(C)])}}};return r}const uc=lt("adobe-photoshop",!0,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth},null),F("path",{d:"M14 15V33",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M16 25C19 25 23 24.2 23 20C23 15.8 19 15 16 15H14V25H16Z",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M34 21.0246C33 21.0246 28 20.5266 28 24.0123C28 27.4979 34 26.5021 34 29.9877C34 33.4734 28 32.9754 28 32.9754",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),MA=lt("all-application",!1,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M18 6H8C6.89543 6 6 6.89543 6 8V18C6 19.1046 6.89543 20 8 20H18C19.1046 20 20 19.1046 20 18V8C20 6.89543 19.1046 6 18 6Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M18 28H8C6.89543 28 6 28.8954 6 30V40C6 41.1046 6.89543 42 8 42H18C19.1046 42 20 41.1046 20 40V30C20 28.8954 19.1046 28 18 28Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M40 6H30C28.8954 6 28 6.89543 28 8V18C28 19.1046 28.8954 20 30 20H40C41.1046 20 42 19.1046 42 18V8C42 6.89543 41.1046 6 40 6Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M40 28H30C28.8954 28 28 28.8954 28 30V40C28 41.1046 28.8954 42 30 42H40C41.1046 42 42 41.1046 42 40V30C42 28.8954 41.1046 28 40 28Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null)])}),DA=lt("arrow-circle-left",!0,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M32.4917 24.5H14.4917",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M23.4917 15.5L14.4917 24.5L23.4917 33.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),FA=lt("arrow-circle-right",!0,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M14.4917 24.5H32.4917",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M23.4917 15.5L32.4917 24.5L23.4917 33.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),fc=lt("audio-file",!0,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M8 44V4H31L40 14.5V44H8Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M32 14L26 16.9688V31.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("circle",{cx:"20.5",cy:"31.5",r:"5.5",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),NA=lt("close",!1,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M8 8L40 40",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M8 40L40 8",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),hc=lt("file-code-one",!0,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M40 23V14L31 4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44H22",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M37 31L42 36L37 41",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M31 31L26 36L31 41",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M30 4V14H40",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),Ac=lt("file-doc",!0,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M10 38V44H38V38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M38 20V14L30 4H10V20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M28 4V14H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M16 12H20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),F("rect",{x:"4",y:"20",width:"40",height:"18",rx:"2",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M10 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),F("path",{d:"M10 25H12C14.2091 25 16 26.7909 16 29V29C16 31.2091 14.2091 33 12 33H10",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("ellipse",{cx:"24",cy:"29",rx:"3",ry:"4",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M38 25H36C33.7909 25 32 26.7909 32 29V29C32 31.2091 33.7909 33 36 33H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),yc=lt("file-excel",!0,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M10 4H30L40 14V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M29 18H19V34H29",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M29 26H19",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),mc=lt("file-zip",!0,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M10 38V44H38V38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M38 20V14L30 4H10V20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M28 4V14H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M16 12H20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),F("rect",{x:"4",y:"20",width:"40",height:"18",rx:"2",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M11 25H17L11 33H17",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M24 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),F("path",{d:"M31 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),F("path",{d:"M31 25H34.5C35.8807 25 37 26.1193 37 27.5V27.5C37 28.8807 35.8807 30 34.5 30H31",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),qA=lt("image-files",!0,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M10 44H38C39.1046 44 40 43.1046 40 42V14H30V4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M30 4L40 14",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("circle",{cx:"18",cy:"17",r:"4",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M15 28V37H33V21L23.4894 31.5L15 28Z",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),HA=lt("list-bottom",!0,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M8 42C10.2091 42 12 40.2091 12 38C12 35.7909 10.2091 34 8 34C5.79086 34 4 35.7909 4 38C4 40.2091 5.79086 42 8 42Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M8 12C9.10457 12 10 11.1046 10 10C10 8.89543 9.10457 8 8 8C6.89543 8 6 8.89543 6 10C6 11.1046 6.89543 12 8 12Z",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M8 26C9.10457 26 10 25.1046 10 24C10 22.8954 9.10457 22 8 22C6.89543 22 6 22.8954 6 24C6 25.1046 6.89543 26 8 26Z",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M20 24H44",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M20 38H44",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M20 10H44",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),WA=lt("return",!0,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M12.9998 8L6 14L12.9998 21",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),bc=lt("seo-folder",!0,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M5 8C5 6.89543 5.89543 6 7 6H19L24 12H41C42.1046 12 43 12.8954 43 14V40C43 41.1046 42.1046 42 41 42H7C5.89543 42 5 41.1046 5 40V8Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M14 22L19 27L14 32",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M26 32H34",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null)])}),gc=lt("video-two",!0,function(e){return F("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[F("path",{d:"M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M20.5 28V21.9378L25.75 24.9689L31 28L25.75 31.0311L20.5 34.0622V28Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M6 15H42",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M33 6L27 15",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),F("path",{d:"M21 6L15 15",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])});function vc(e,t){return function(){return e.apply(t,arguments)}}const{toString:UA}=Object.prototype,{getPrototypeOf:oa}=Object,_o=(e=>t=>{const n=UA.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),Tt=e=>(e=e.toLowerCase(),t=>_o(t)===e),To=e=>t=>typeof t===e,{isArray:Dn}=Array,Ir=To("undefined");function YA(e){return e!==null&&!Ir(e)&&e.constructor!==null&&!Ir(e.constructor)&&mt(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Ec=Tt("ArrayBuffer");function QA(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Ec(e.buffer),t}const KA=To("string"),mt=To("function"),xc=To("number"),Oo=e=>e!==null&&typeof e=="object",VA=e=>e===!0||e===!1,Gr=e=>{if(_o(e)!=="object")return!1;const t=oa(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},$A=Tt("Date"),JA=Tt("File"),ZA=Tt("Blob"),XA=Tt("FileList"),GA=e=>Oo(e)&&mt(e.pipe),ey=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||mt(e.append)&&((t=_o(e))==="formdata"||t==="object"&&mt(e.toString)&&e.toString()==="[object FormData]"))},ty=Tt("URLSearchParams"),ny=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Or(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,o;if(typeof e!="object"&&(e=[e]),Dn(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{const l=n?Object.getOwnPropertyNames(e):Object.keys(e),c=l.length;let u;for(r=0;r<c;r++)u=l[r],t.call(null,e[u],u,e)}}function kc(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,o;for(;r-- >0;)if(o=n[r],t===o.toLowerCase())return o;return null}const wc=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),Cc=e=>!Ir(e)&&e!==wc;function Ii(){const{caseless:e}=Cc(this)&&this||{},t={},n=(r,o)=>{const l=e&&kc(t,o)||o;Gr(t[l])&&Gr(r)?t[l]=Ii(t[l],r):Gr(r)?t[l]=Ii({},r):Dn(r)?t[l]=r.slice():t[l]=r};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&Or(arguments[r],n);return t}const ry=(e,t,n,{allOwnKeys:r}={})=>(Or(t,(o,l)=>{n&&mt(o)?e[l]=vc(o,n):e[l]=o},{allOwnKeys:r}),e),oy=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),iy=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},ay=(e,t,n,r)=>{let o,l,c;const u={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),l=o.length;l-- >0;)c=o[l],(!r||r(c,e,t))&&!u[c]&&(t[c]=e[c],u[c]=!0);e=n!==!1&&oa(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},ly=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},sy=e=>{if(!e)return null;if(Dn(e))return e;let t=e.length;if(!xc(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},cy=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&oa(Uint8Array)),dy=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let o;for(;(o=r.next())&&!o.done;){const l=o.value;t.call(e,l[0],l[1])}},py=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},uy=Tt("HTMLFormElement"),fy=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,o){return r.toUpperCase()+o}),ql=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),hy=Tt("RegExp"),Bc=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};Or(n,(o,l)=>{t(o,l,e)!==!1&&(r[l]=o)}),Object.defineProperties(e,r)},Ay=e=>{Bc(e,(t,n)=>{if(mt(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(mt(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},yy=(e,t)=>{const n={},r=o=>{o.forEach(l=>{n[l]=!0})};return Dn(e)?r(e):r(String(e).split(t)),n},my=()=>{},by=(e,t)=>(e=+e,Number.isFinite(e)?e:t),li="abcdefghijklmnopqrstuvwxyz",Hl="0123456789",Sc={DIGIT:Hl,ALPHA:li,ALPHA_DIGIT:li+li.toUpperCase()+Hl},gy=(e=16,t=Sc.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n};function vy(e){return!!(e&&mt(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const Ey=e=>{const t=new Array(10),n=(r,o)=>{if(Oo(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[o]=r;const l=Dn(r)?[]:{};return Or(r,(c,u)=>{const h=n(c,o+1);!Ir(h)&&(l[u]=h)}),t[o]=void 0,l}}return r};return n(e,0)},xy=Tt("AsyncFunction"),ky=e=>e&&(Oo(e)||mt(e))&&mt(e.then)&&mt(e.catch),j={isArray:Dn,isArrayBuffer:Ec,isBuffer:YA,isFormData:ey,isArrayBufferView:QA,isString:KA,isNumber:xc,isBoolean:VA,isObject:Oo,isPlainObject:Gr,isUndefined:Ir,isDate:$A,isFile:JA,isBlob:ZA,isRegExp:hy,isFunction:mt,isStream:GA,isURLSearchParams:ty,isTypedArray:cy,isFileList:XA,forEach:Or,merge:Ii,extend:ry,trim:ny,stripBOM:oy,inherits:iy,toFlatObject:ay,kindOf:_o,kindOfTest:Tt,endsWith:ly,toArray:sy,forEachEntry:dy,matchAll:py,isHTMLForm:uy,hasOwnProperty:ql,hasOwnProp:ql,reduceDescriptors:Bc,freezeMethods:Ay,toObjectSet:yy,toCamelCase:fy,noop:my,toFiniteNumber:by,findKey:kc,global:wc,isContextDefined:Cc,ALPHABET:Sc,generateString:gy,isSpecCompliantForm:vy,toJSONObject:Ey,isAsyncFn:xy,isThenable:ky};function ke(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o)}j.inherits(ke,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:j.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const Lc=ke.prototype,Ic={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Ic[e]={value:e}});Object.defineProperties(ke,Ic);Object.defineProperty(Lc,"isAxiosError",{value:!0});ke.from=(e,t,n,r,o,l)=>{const c=Object.create(Lc);return j.toFlatObject(e,c,function(h){return h!==Error.prototype},u=>u!=="isAxiosError"),ke.call(c,e.message,t,n,r,o),c.cause=e,c.name=e.name,l&&Object.assign(c,l),c};const wy=null;function _i(e){return j.isPlainObject(e)||j.isArray(e)}function _c(e){return j.endsWith(e,"[]")?e.slice(0,-2):e}function Wl(e,t,n){return e?e.concat(t).map(function(o,l){return o=_c(o),!n&&l?"["+o+"]":o}).join(n?".":""):t}function Cy(e){return j.isArray(e)&&!e.some(_i)}const By=j.toFlatObject(j,{},null,function(t){return/^is[A-Z]/.test(t)});function Ro(e,t,n){if(!j.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=j.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(C,R){return!j.isUndefined(R[C])});const r=n.metaTokens,o=n.visitor||b,l=n.dots,c=n.indexes,h=(n.Blob||typeof Blob<"u"&&Blob)&&j.isSpecCompliantForm(t);if(!j.isFunction(o))throw new TypeError("visitor must be a function");function y(B){if(B===null)return"";if(j.isDate(B))return B.toISOString();if(!h&&j.isBlob(B))throw new ke("Blob is not supported. Use a Buffer instead.");return j.isArrayBuffer(B)||j.isTypedArray(B)?h&&typeof Blob=="function"?new Blob([B]):Buffer.from(B):B}function b(B,C,R){let _=B;if(B&&!R&&typeof B=="object"){if(j.endsWith(C,"{}"))C=r?C:C.slice(0,-2),B=JSON.stringify(B);else if(j.isArray(B)&&Cy(B)||(j.isFileList(B)||j.endsWith(C,"[]"))&&(_=j.toArray(B)))return C=_c(C),_.forEach(function(H,D){!(j.isUndefined(H)||H===null)&&t.append(c===!0?Wl([C],D,l):c===null?C:C+"[]",y(H))}),!1}return _i(B)?!0:(t.append(Wl(R,C,l),y(B)),!1)}const g=[],f=Object.assign(By,{defaultVisitor:b,convertValue:y,isVisitable:_i});function w(B,C){if(!j.isUndefined(B)){if(g.indexOf(B)!==-1)throw Error("Circular reference detected in "+C.join("."));g.push(B),j.forEach(B,function(_,I){(!(j.isUndefined(_)||_===null)&&o.call(t,_,j.isString(I)?I.trim():I,C,f))===!0&&w(_,C?C.concat(I):[I])}),g.pop()}}if(!j.isObject(e))throw new TypeError("data must be an object");return w(e),t}function Ul(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function ia(e,t){this._pairs=[],e&&Ro(e,this,t)}const Tc=ia.prototype;Tc.append=function(t,n){this._pairs.push([t,n])};Tc.toString=function(t){const n=t?function(r){return t.call(this,r,Ul)}:Ul;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};function Sy(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Oc(e,t,n){if(!t)return e;const r=n&&n.encode||Sy,o=n&&n.serialize;let l;if(o?l=o(t,n):l=j.isURLSearchParams(t)?t.toString():new ia(t,n).toString(r),l){const c=e.indexOf("#");c!==-1&&(e=e.slice(0,c)),e+=(e.indexOf("?")===-1?"?":"&")+l}return e}class Ly{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){j.forEach(this.handlers,function(r){r!==null&&t(r)})}}const Yl=Ly,Rc={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Iy=typeof URLSearchParams<"u"?URLSearchParams:ia,_y=typeof FormData<"u"?FormData:null,Ty=typeof Blob<"u"?Blob:null,Oy=(()=>{let e;return typeof navigator<"u"&&((e=navigator.product)==="ReactNative"||e==="NativeScript"||e==="NS")?!1:typeof window<"u"&&typeof document<"u"})(),Ry=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),It={isBrowser:!0,classes:{URLSearchParams:Iy,FormData:_y,Blob:Ty},isStandardBrowserEnv:Oy,isStandardBrowserWebWorkerEnv:Ry,protocols:["http","https","file","blob","url","data"]};function Py(e,t){return Ro(e,new It.classes.URLSearchParams,Object.assign({visitor:function(n,r,o,l){return It.isNode&&j.isBuffer(n)?(this.append(r,n.toString("base64")),!1):l.defaultVisitor.apply(this,arguments)}},t))}function jy(e){return j.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function zy(e){const t={},n=Object.keys(e);let r;const o=n.length;let l;for(r=0;r<o;r++)l=n[r],t[l]=e[l];return t}function Pc(e){function t(n,r,o,l){let c=n[l++];const u=Number.isFinite(+c),h=l>=n.length;return c=!c&&j.isArray(o)?o.length:c,h?(j.hasOwnProp(o,c)?o[c]=[o[c],r]:o[c]=r,!u):((!o[c]||!j.isObject(o[c]))&&(o[c]=[]),t(n,r,o[c],l)&&j.isArray(o[c])&&(o[c]=zy(o[c])),!u)}if(j.isFormData(e)&&j.isFunction(e.entries)){const n={};return j.forEachEntry(e,(r,o)=>{t(jy(r),o,n,0)}),n}return null}const My={"Content-Type":void 0};function Dy(e,t,n){if(j.isString(e))try{return(t||JSON.parse)(e),j.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const Po={transitional:Rc,adapter:["xhr","http"],transformRequest:[function(t,n){const r=n.getContentType()||"",o=r.indexOf("application/json")>-1,l=j.isObject(t);if(l&&j.isHTMLForm(t)&&(t=new FormData(t)),j.isFormData(t))return o&&o?JSON.stringify(Pc(t)):t;if(j.isArrayBuffer(t)||j.isBuffer(t)||j.isStream(t)||j.isFile(t)||j.isBlob(t))return t;if(j.isArrayBufferView(t))return t.buffer;if(j.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let u;if(l){if(r.indexOf("application/x-www-form-urlencoded")>-1)return Py(t,this.formSerializer).toString();if((u=j.isFileList(t))||r.indexOf("multipart/form-data")>-1){const h=this.env&&this.env.FormData;return Ro(u?{"files[]":t}:t,h&&new h,this.formSerializer)}}return l||o?(n.setContentType("application/json",!1),Dy(t)):t}],transformResponse:[function(t){const n=this.transitional||Po.transitional,r=n&&n.forcedJSONParsing,o=this.responseType==="json";if(t&&j.isString(t)&&(r&&!this.responseType||o)){const c=!(n&&n.silentJSONParsing)&&o;try{return JSON.parse(t)}catch(u){if(c)throw u.name==="SyntaxError"?ke.from(u,ke.ERR_BAD_RESPONSE,this,null,this.response):u}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:It.classes.FormData,Blob:It.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};j.forEach(["delete","get","head"],function(t){Po.headers[t]={}});j.forEach(["post","put","patch"],function(t){Po.headers[t]=j.merge(My)});const aa=Po,Fy=j.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Ny=e=>{const t={};let n,r,o;return e&&e.split(`
`).forEach(function(c){o=c.indexOf(":"),n=c.substring(0,o).trim().toLowerCase(),r=c.substring(o+1).trim(),!(!n||t[n]&&Fy[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},Ql=Symbol("internals");function pr(e){return e&&String(e).trim().toLowerCase()}function eo(e){return e===!1||e==null?e:j.isArray(e)?e.map(eo):String(e)}function qy(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Hy=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function si(e,t,n,r,o){if(j.isFunction(r))return r.call(this,t,n);if(o&&(t=n),!!j.isString(t)){if(j.isString(r))return t.indexOf(r)!==-1;if(j.isRegExp(r))return r.test(t)}}function Wy(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function Uy(e,t){const n=j.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(o,l,c){return this[r].call(this,t,o,l,c)},configurable:!0})})}class jo{constructor(t){t&&this.set(t)}set(t,n,r){const o=this;function l(u,h,y){const b=pr(h);if(!b)throw new Error("header name must be a non-empty string");const g=j.findKey(o,b);(!g||o[g]===void 0||y===!0||y===void 0&&o[g]!==!1)&&(o[g||h]=eo(u))}const c=(u,h)=>j.forEach(u,(y,b)=>l(y,b,h));return j.isPlainObject(t)||t instanceof this.constructor?c(t,n):j.isString(t)&&(t=t.trim())&&!Hy(t)?c(Ny(t),n):t!=null&&l(n,t,r),this}get(t,n){if(t=pr(t),t){const r=j.findKey(this,t);if(r){const o=this[r];if(!n)return o;if(n===!0)return qy(o);if(j.isFunction(n))return n.call(this,o,r);if(j.isRegExp(n))return n.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=pr(t),t){const r=j.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||si(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let o=!1;function l(c){if(c=pr(c),c){const u=j.findKey(r,c);u&&(!n||si(r,r[u],u,n))&&(delete r[u],o=!0)}}return j.isArray(t)?t.forEach(l):l(t),o}clear(t){const n=Object.keys(this);let r=n.length,o=!1;for(;r--;){const l=n[r];(!t||si(this,this[l],l,t,!0))&&(delete this[l],o=!0)}return o}normalize(t){const n=this,r={};return j.forEach(this,(o,l)=>{const c=j.findKey(r,l);if(c){n[c]=eo(o),delete n[l];return}const u=t?Wy(l):String(l).trim();u!==l&&delete n[l],n[u]=eo(o),r[u]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return j.forEach(this,(r,o)=>{r!=null&&r!==!1&&(n[o]=t&&j.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(o=>r.set(o)),r}static accessor(t){const r=(this[Ql]=this[Ql]={accessors:{}}).accessors,o=this.prototype;function l(c){const u=pr(c);r[u]||(Uy(o,c),r[u]=!0)}return j.isArray(t)?t.forEach(l):l(t),this}}jo.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);j.freezeMethods(jo.prototype);j.freezeMethods(jo);const zt=jo;function ci(e,t){const n=this||aa,r=t||n,o=zt.from(r.headers);let l=r.data;return j.forEach(e,function(u){l=u.call(n,l,o.normalize(),t?t.status:void 0)}),o.normalize(),l}function jc(e){return!!(e&&e.__CANCEL__)}function Rr(e,t,n){ke.call(this,e??"canceled",ke.ERR_CANCELED,t,n),this.name="CanceledError"}j.inherits(Rr,ke,{__CANCEL__:!0});function Yy(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new ke("Request failed with status code "+n.status,[ke.ERR_BAD_REQUEST,ke.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const Qy=It.isStandardBrowserEnv?function(){return{write:function(n,r,o,l,c,u){const h=[];h.push(n+"="+encodeURIComponent(r)),j.isNumber(o)&&h.push("expires="+new Date(o).toGMTString()),j.isString(l)&&h.push("path="+l),j.isString(c)&&h.push("domain="+c),u===!0&&h.push("secure"),document.cookie=h.join("; ")},read:function(n){const r=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return r?decodeURIComponent(r[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}();function Ky(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Vy(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function zc(e,t){return e&&!Ky(t)?Vy(e,t):t}const $y=It.isStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function o(l){let c=l;return t&&(n.setAttribute("href",c),c=n.href),n.setAttribute("href",c),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=o(window.location.href),function(c){const u=j.isString(c)?o(c):c;return u.protocol===r.protocol&&u.host===r.host}}():function(){return function(){return!0}}();function Jy(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Zy(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o=0,l=0,c;return t=t!==void 0?t:1e3,function(h){const y=Date.now(),b=r[l];c||(c=y),n[o]=h,r[o]=y;let g=l,f=0;for(;g!==o;)f+=n[g++],g=g%e;if(o=(o+1)%e,o===l&&(l=(l+1)%e),y-c<t)return;const w=b&&y-b;return w?Math.round(f*1e3/w):void 0}}function Kl(e,t){let n=0;const r=Zy(50,250);return o=>{const l=o.loaded,c=o.lengthComputable?o.total:void 0,u=l-n,h=r(u),y=l<=c;n=l;const b={loaded:l,total:c,progress:c?l/c:void 0,bytes:u,rate:h||void 0,estimated:h&&c&&y?(c-l)/h:void 0,event:o};b[t?"download":"upload"]=!0,e(b)}}const Xy=typeof XMLHttpRequest<"u",Gy=Xy&&function(e){return new Promise(function(n,r){let o=e.data;const l=zt.from(e.headers).normalize(),c=e.responseType;let u;function h(){e.cancelToken&&e.cancelToken.unsubscribe(u),e.signal&&e.signal.removeEventListener("abort",u)}j.isFormData(o)&&(It.isStandardBrowserEnv||It.isStandardBrowserWebWorkerEnv?l.setContentType(!1):l.setContentType("multipart/form-data;",!1));let y=new XMLHttpRequest;if(e.auth){const w=e.auth.username||"",B=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";l.set("Authorization","Basic "+btoa(w+":"+B))}const b=zc(e.baseURL,e.url);y.open(e.method.toUpperCase(),Oc(b,e.params,e.paramsSerializer),!0),y.timeout=e.timeout;function g(){if(!y)return;const w=zt.from("getAllResponseHeaders"in y&&y.getAllResponseHeaders()),C={data:!c||c==="text"||c==="json"?y.responseText:y.response,status:y.status,statusText:y.statusText,headers:w,config:e,request:y};Yy(function(_){n(_),h()},function(_){r(_),h()},C),y=null}if("onloadend"in y?y.onloadend=g:y.onreadystatechange=function(){!y||y.readyState!==4||y.status===0&&!(y.responseURL&&y.responseURL.indexOf("file:")===0)||setTimeout(g)},y.onabort=function(){y&&(r(new ke("Request aborted",ke.ECONNABORTED,e,y)),y=null)},y.onerror=function(){r(new ke("Network Error",ke.ERR_NETWORK,e,y)),y=null},y.ontimeout=function(){let B=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const C=e.transitional||Rc;e.timeoutErrorMessage&&(B=e.timeoutErrorMessage),r(new ke(B,C.clarifyTimeoutError?ke.ETIMEDOUT:ke.ECONNABORTED,e,y)),y=null},It.isStandardBrowserEnv){const w=(e.withCredentials||$y(b))&&e.xsrfCookieName&&Qy.read(e.xsrfCookieName);w&&l.set(e.xsrfHeaderName,w)}o===void 0&&l.setContentType(null),"setRequestHeader"in y&&j.forEach(l.toJSON(),function(B,C){y.setRequestHeader(C,B)}),j.isUndefined(e.withCredentials)||(y.withCredentials=!!e.withCredentials),c&&c!=="json"&&(y.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&y.addEventListener("progress",Kl(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&y.upload&&y.upload.addEventListener("progress",Kl(e.onUploadProgress)),(e.cancelToken||e.signal)&&(u=w=>{y&&(r(!w||w.type?new Rr(null,e,y):w),y.abort(),y=null)},e.cancelToken&&e.cancelToken.subscribe(u),e.signal&&(e.signal.aborted?u():e.signal.addEventListener("abort",u)));const f=Jy(b);if(f&&It.protocols.indexOf(f)===-1){r(new ke("Unsupported protocol "+f+":",ke.ERR_BAD_REQUEST,e));return}y.send(o||null)})},to={http:wy,xhr:Gy};j.forEach(to,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const em={getAdapter:e=>{e=j.isArray(e)?e:[e];const{length:t}=e;let n,r;for(let o=0;o<t&&(n=e[o],!(r=j.isString(n)?to[n.toLowerCase()]:n));o++);if(!r)throw r===!1?new ke(`Adapter ${n} is not supported by the environment`,"ERR_NOT_SUPPORT"):new Error(j.hasOwnProp(to,n)?`Adapter '${n}' is not available in the build`:`Unknown adapter '${n}'`);if(!j.isFunction(r))throw new TypeError("adapter is not a function");return r},adapters:to};function di(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Rr(null,e)}function Vl(e){return di(e),e.headers=zt.from(e.headers),e.data=ci.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),em.getAdapter(e.adapter||aa.adapter)(e).then(function(r){return di(e),r.data=ci.call(e,e.transformResponse,r),r.headers=zt.from(r.headers),r},function(r){return jc(r)||(di(e),r&&r.response&&(r.response.data=ci.call(e,e.transformResponse,r.response),r.response.headers=zt.from(r.response.headers))),Promise.reject(r)})}const $l=e=>e instanceof zt?e.toJSON():e;function Pn(e,t){t=t||{};const n={};function r(y,b,g){return j.isPlainObject(y)&&j.isPlainObject(b)?j.merge.call({caseless:g},y,b):j.isPlainObject(b)?j.merge({},b):j.isArray(b)?b.slice():b}function o(y,b,g){if(j.isUndefined(b)){if(!j.isUndefined(y))return r(void 0,y,g)}else return r(y,b,g)}function l(y,b){if(!j.isUndefined(b))return r(void 0,b)}function c(y,b){if(j.isUndefined(b)){if(!j.isUndefined(y))return r(void 0,y)}else return r(void 0,b)}function u(y,b,g){if(g in t)return r(y,b);if(g in e)return r(void 0,y)}const h={url:l,method:l,data:l,baseURL:c,transformRequest:c,transformResponse:c,paramsSerializer:c,timeout:c,timeoutMessage:c,withCredentials:c,adapter:c,responseType:c,xsrfCookieName:c,xsrfHeaderName:c,onUploadProgress:c,onDownloadProgress:c,decompress:c,maxContentLength:c,maxBodyLength:c,beforeRedirect:c,transport:c,httpAgent:c,httpsAgent:c,cancelToken:c,socketPath:c,responseEncoding:c,validateStatus:u,headers:(y,b)=>o($l(y),$l(b),!0)};return j.forEach(Object.keys(Object.assign({},e,t)),function(b){const g=h[b]||o,f=g(e[b],t[b],b);j.isUndefined(f)&&g!==u||(n[b]=f)}),n}const Mc="1.4.0",la={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{la[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const Jl={};la.transitional=function(t,n,r){function o(l,c){return"[Axios v"+Mc+"] Transitional option '"+l+"'"+c+(r?". "+r:"")}return(l,c,u)=>{if(t===!1)throw new ke(o(c," has been removed"+(n?" in "+n:"")),ke.ERR_DEPRECATED);return n&&!Jl[c]&&(Jl[c]=!0,console.warn(o(c," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(l,c,u):!0}};function tm(e,t,n){if(typeof e!="object")throw new ke("options must be an object",ke.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const l=r[o],c=t[l];if(c){const u=e[l],h=u===void 0||c(u,l,e);if(h!==!0)throw new ke("option "+l+" must be "+h,ke.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new ke("Unknown option "+l,ke.ERR_BAD_OPTION)}}const Ti={assertOptions:tm,validators:la},Kt=Ti.validators;class uo{constructor(t){this.defaults=t,this.interceptors={request:new Yl,response:new Yl}}request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=Pn(this.defaults,n);const{transitional:r,paramsSerializer:o,headers:l}=n;r!==void 0&&Ti.assertOptions(r,{silentJSONParsing:Kt.transitional(Kt.boolean),forcedJSONParsing:Kt.transitional(Kt.boolean),clarifyTimeoutError:Kt.transitional(Kt.boolean)},!1),o!=null&&(j.isFunction(o)?n.paramsSerializer={serialize:o}:Ti.assertOptions(o,{encode:Kt.function,serialize:Kt.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let c;c=l&&j.merge(l.common,l[n.method]),c&&j.forEach(["delete","get","head","post","put","patch","common"],B=>{delete l[B]}),n.headers=zt.concat(c,l);const u=[];let h=!0;this.interceptors.request.forEach(function(C){typeof C.runWhen=="function"&&C.runWhen(n)===!1||(h=h&&C.synchronous,u.unshift(C.fulfilled,C.rejected))});const y=[];this.interceptors.response.forEach(function(C){y.push(C.fulfilled,C.rejected)});let b,g=0,f;if(!h){const B=[Vl.bind(this),void 0];for(B.unshift.apply(B,u),B.push.apply(B,y),f=B.length,b=Promise.resolve(n);g<f;)b=b.then(B[g++],B[g++]);return b}f=u.length;let w=n;for(g=0;g<f;){const B=u[g++],C=u[g++];try{w=B(w)}catch(R){C.call(this,R);break}}try{b=Vl.call(this,w)}catch(B){return Promise.reject(B)}for(g=0,f=y.length;g<f;)b=b.then(y[g++],y[g++]);return b}getUri(t){t=Pn(this.defaults,t);const n=zc(t.baseURL,t.url);return Oc(n,t.params,t.paramsSerializer)}}j.forEach(["delete","get","head","options"],function(t){uo.prototype[t]=function(n,r){return this.request(Pn(r||{},{method:t,url:n,data:(r||{}).data}))}});j.forEach(["post","put","patch"],function(t){function n(r){return function(l,c,u){return this.request(Pn(u||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:l,data:c}))}}uo.prototype[t]=n(),uo.prototype[t+"Form"]=n(!0)});const no=uo;class sa{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(l){n=l});const r=this;this.promise.then(o=>{if(!r._listeners)return;let l=r._listeners.length;for(;l-- >0;)r._listeners[l](o);r._listeners=null}),this.promise.then=o=>{let l;const c=new Promise(u=>{r.subscribe(u),l=u}).then(o);return c.cancel=function(){r.unsubscribe(l)},c},t(function(l,c,u){r.reason||(r.reason=new Rr(l,c,u),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}static source(){let t;return{token:new sa(function(o){t=o}),cancel:t}}}const nm=sa;function rm(e){return function(n){return e.apply(null,n)}}function om(e){return j.isObject(e)&&e.isAxiosError===!0}const Oi={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Oi).forEach(([e,t])=>{Oi[t]=e});const im=Oi;function Dc(e){const t=new no(e),n=vc(no.prototype.request,t);return j.extend(n,no.prototype,t,{allOwnKeys:!0}),j.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return Dc(Pn(e,o))},n}const Je=Dc(aa);Je.Axios=no;Je.CanceledError=Rr;Je.CancelToken=nm;Je.isCancel=jc;Je.VERSION=Mc;Je.toFormData=Ro;Je.AxiosError=ke;Je.Cancel=Je.CanceledError;Je.all=function(t){return Promise.all(t)};Je.spread=rm;Je.isAxiosError=om;Je.mergeConfig=Pn;Je.AxiosHeaders=zt;Je.formToJSON=e=>Pc(j.isHTMLForm(e)?new FormData(e):e);Je.HttpStatusCode=im;Je.default=Je;const Zl=Je;const am={class:"box"},lm={class:"main"},sm={class:"title"},cm={class:"body"},dm={class:"footer"},pm={__name:"Dialog",props:{title:{type:String,default:"标题"},btnNum:{type:Number,default:1},okBtnText:{type:String,default:"确定"}},emits:["okBtn","closeBtn"],setup(e,{emit:t}){const n=e,r=()=>{t("okBtn")},o=()=>{t("closeBtn")};return(l,c)=>(le(),He("div",am,[Ee("div",lm,[Ee("div",sm,[Ee("span",null,An(n.title),1)]),Ee("div",cm,[mf(l.$slots,"body",{},void 0,!0)]),Ee("div",dm,[n.btnNum>1?(le(),He("div",{key:0,class:"close-btn",onClick:o},"关闭")):mn("",!0),Ee("div",{class:"ok-btn",onClick:r},An(n.okBtnText),1)])])]))}},Xl=Tr(pm,[["__scopeId","data-v-ee082e04"]]);const um={class:"box"},fm=["onClick"],hm={class:"icon"},Am={key:2,class:"icon-svg",style:{"object-fit":"cover",width:"100%",height:"100%"},alt:"data.name",src:""},ym={class:"file-name"},mm={key:0,style:{height:"6rem","text-align":"center","line-height":"6rem"}},bm={__name:"ImageTable",props:{tableData:{type:Array,default:[]},showMax:{type:Number,default:99999}},emits:["clickFile","copyUrl","delFile"],setup(e,{emit:t}){const n=e,r=Me(!1),o=Me([]),l=[".MP4",".AVI",".MOV",".FLV",".MKV"],c=[".JPG",".JPEG",".PNG",".WEBP"],u=[".PSD"],h=[".RAR",".ZIP",".7Z"],y=[".WAV",".MP3",".OGG"],b=[".DOC",".DOCX"],g=[".XLS",".XLSX"],f=Me("100%"),w=Me("200");Ft(()=>{o.value=n.tableData.slice(0,n.showMax)});const B=C=>{t("clickFile",C)};return Gt(()=>n.tableData,()=>{r.value=!1,n.tableData.length>n.showMax?o.value=n.tableData.slice(0,n.showMax):o.value=n.tableData}),(C,R)=>{const _=yf("lazy");return le(),He("div",um,[(le(!0),He(Ge,null,Jr(o.value,(I,H)=>(le(),He("div",{key:H,class:"item",onClick:D=>B(H)},[Ee("div",hm,[I.isDirectory?(le(),ze(Te(bc),{key:0,class:"icon-svg",theme:"outline",size:f.value,fill:"#f6823b",strokeWidth:2},null,8,["size"])):l.includes(I.suffix.toUpperCase())?(le(),ze(Te(gc),{key:1,class:"icon-svg",theme:"outline",size:f.value,fill:"#f6823b",strokeWidth:2},null,8,["size"])):c.includes(I.suffix.toUpperCase())?Xu((le(),He("img",Am,null,512)),[[_,I.url+`!${w.value}x${w.value}`]]):h.includes(I.suffix.toUpperCase())?(le(),ze(Te(mc),{key:3,class:"icon-svg",theme:"outline",size:f.value,fill:"#f6823b",strokeWidth:2},null,8,["size"])):y.includes(I.suffix.toUpperCase())?(le(),ze(Te(fc),{key:4,class:"icon-svg",theme:"outline",size:f.value,fill:"#f6823b",strokeWidth:2},null,8,["size"])):b.includes(I.suffix.toUpperCase())?(le(),ze(Te(Ac),{key:5,class:"icon-svg",theme:"outline",size:f.value,fill:"#f6823b",strokeWidth:2},null,8,["size"])):g.includes(I.suffix.toUpperCase())?(le(),ze(Te(yc),{key:6,class:"icon-svg",theme:"outline",size:f.value,fill:"#f6823b",strokeWidth:2},null,8,["size"])):u.includes(I.suffix.toUpperCase())?(le(),ze(Te(uc),{key:7,class:"icon-svg",theme:"outline",size:f.value,fill:"#f6823b",strokeWidth:2},null,8,["size"])):(le(),ze(Te(hc),{key:8,theme:"outline",size:f.value,fill:"#f6823b",strokeWidth:2},null,8,["size"]))]),Ee("div",ym,An(I.name),1)],8,fm))),128)),e.tableData.length===0?(le(),He("div",mm," 当前数据为空 ")):mn("",!0)])}}},gm=Tr(bm,[["__scopeId","data-v-5f03fd8f"]]);const vm={class:"box"},Em={style:{"background-color":"#f6f6f6"}},xm=["onClick"],km={class:"file-logo"},wm={class:"file-text"},Cm={key:0,class:"file-name",style:{display:"flex","text-align":"center"}},Bm={style:{flex:"1"}},Sm=["onClick"],Lm={style:{flex:"1"}},Im=["onClick"],_m={key:2,class:"file-name"},Tm={key:0,style:{height:"6rem","text-align":"center","line-height":"6rem"}},Om={__name:"InfoTable",props:{tableData:{type:Array,default:[]},tableHead:{type:Array,default:[]},showMax:{type:Number,default:99999}},emits:["clickFile","copyUrl","delFile"],setup(e,{emit:t}){const n=e,r=Me(!1),o=Me([]),l=[".MP4",".AVI",".MOV",".FLV",".MKV"],c=[".JPG",".JPEG",".PNG",".WEBP"],u=[".PSD"],h=[".RAR",".ZIP",".7Z"],y=[".WAV",".MP3",".OGG"],b=[".DOC",".DOCX"],g=[".XLS",".XLSX"];Ft(()=>{o.value=n.tableData.slice(0,n.showMax)});const f=C=>{t("clickFile",C)},w=C=>{t("copyUrl",C)},B=C=>{t("delFile",C)};return Gt(()=>n.tableData,()=>{r.value=!1,n.tableData.length>n.showMax?o.value=n.tableData.slice(0,n.showMax):o.value=n.tableData}),(C,R)=>(le(),He("div",vm,[Ee("table",null,[Ee("tr",Em,[(le(!0),He(Ge,null,Jr(e.tableHead,_=>(le(),He("th",{class:xr({bgRed:_.bgColor==="red",bgGreen:_.bgColor==="green",textRed:_.textColor==="red",textGreen:_.textColor==="green"}),style:mo({width:_.width})},An(_.span),7))),256))]),(le(!0),He(Ge,null,Jr(o.value,(_,I)=>(le(),He("tr",null,[(le(!0),He(Ge,null,Jr(e.tableHead,H=>(le(),He("td",{class:xr({textRed:H.textColor==="red",textGreen:H.textColor==="green"})},[H.prop==="name"?(le(),He("div",{key:0,class:"file-name",onClick:D=>f(I)},[Ee("div",km,[_.isDirectory?(le(),ze(Te(bc),{key:0,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):l.includes(_.suffix.toUpperCase())?(le(),ze(Te(gc),{key:1,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):c.includes(_.suffix.toUpperCase())?(le(),ze(Te(qA),{key:2,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):h.includes(_.suffix.toUpperCase())?(le(),ze(Te(mc),{key:3,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):y.includes(_.suffix.toUpperCase())?(le(),ze(Te(fc),{key:4,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):b.includes(_.suffix.toUpperCase())?(le(),ze(Te(Ac),{key:5,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):g.includes(_.suffix.toUpperCase())?(le(),ze(Te(yc),{key:6,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):u.includes(_.suffix.toUpperCase())?(le(),ze(Te(uc),{key:7,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):(le(),ze(Te(hc),{key:8,theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2}))]),Ee("div",wm,An(_[H.prop]),1)],8,xm)):H.prop==="cz"?(le(),He(Ge,{key:1},[_.isFile?(le(),He("div",Cm,[Ee("div",Bm,[Ee("button",{onClick:D=>w(I)},"分享",8,Sm)]),Ee("div",Lm,[Ee("button",{onClick:D=>B(I)},"删除",8,Im)])])):mn("",!0)],64)):(le(),He("div",_m,An(_[H.prop]),1))],2))),256))]))),256))]),e.tableData.length===0?(le(),He("div",Tm," 当前数据为空 ")):mn("",!0)]))}},Rm=Tr(Om,[["__scopeId","data-v-5e22e18c"]]);const Pm=e=>(Wu("data-v-2219c233"),e=e(),Uu(),e),jm={class:"top-box"},zm={class:"top-title"},Mm={style:{height:"100%","padding-top":"30px"}},Dm={key:0,class:"imgBox"},Fm={class:"img"},Nm=["src"],qm={class:"play-list"},Hm=Pm(()=>Ee("div",{style:{"padding-top":"20px","padding-bottom":"20px"}}," 是否删除文件 ",-1)),Wm={__name:"main",setup(e){const t=Me(!1),n=Me(!1),r=OA();ra();let o;o=`${window.location.protocol}//${window.location.hostname}:${window.location.port}`;const l=Me("$"),c=Me([]),u=Me([{span:"文件名",prop:"name",textColor:"",bgColor:""},{span:"大小",prop:"size",textColor:"red",bgColor:"red"},{span:"操作",prop:"cz",width:"80px",textColor:"green",bgColor:"green"}]),h=()=>{l.value=l.value.slice(0,l.value.lastIndexOf("__")===-1?l.value.length:l.value.lastIndexOf("__")),tt()},y=Me([]),b=Me(""),g=Me(0),f=Me(0),w=Me(!1),B=()=>{g.value++,g.value=g.value%y.value.length,b.value=y.value[g.value],console.log(g.value)},C=()=>{g.value--,g.value<0&&(g.value=y.value.length-1),g.value=g.value%y.value.length,b.value=y.value[g.value]},R=()=>{w.value=!0,b.value=y.value[g.value],console.log(y.value)},_=()=>{w.value=!1},I=(se,fe)=>(se==="$"?se="":se=se.replace(/\$/g,""),se=se.replace(/__/g,"/"),console.log(`获取文件：${o}/getFile${se}/${fe}`),`${o}/getFile${se}/${fe}`),H=(se,fe)=>(se==="$"?se="":se=se.replace(/\$/g,""),se=se.replace(/__/g,"/"),`${se}/${fe}`),D=se=>{let fe=c.value[se];try{navigator.share({title:fe.name,url:I(l.value,fe.name)})}catch{alert(I(l.value,fe.name))}},Ae=se=>{n.value=!0,f.value=se},Se=[".MP4",".AVI",".MOV",".FLV",".MKV"],Ue=[".JPG",".JPEG",".PNG",".WEBP"],ue=[".WAV",".MP3",".OGG"],Ie=()=>{t.value=!1},ae=()=>{n.value=!1},Ne=()=>{n.value=!1,Jt(()=>{let se=c.value[f.value];Zl.post(`${o}/delFile`,{filePath:H(l.value,se.name)}).then((fe,ve)=>{fe.status===200&&tt()})})},G=se=>{t.value=!1,Jt(()=>{se==="web"?r.push({path:"/VideoPlay",query:{url:me.value}}):window.open("vlc://"+me.value)})},me=Me(""),We=se=>{let fe=c.value[se];if(fe.isDirectory&&!fe.isFile)l.value+=`__${fe.name}`,tt(),we();else{let ve=fe.suffix;if(Se.includes(ve.toUpperCase()))me.value=I(l.value,fe.name),t.value=!0;else if(Ue.includes(ve.toUpperCase())){y.value=[];let Xe=0;for(let nt=0;nt<c.value.length;nt++){let wt=c.value[nt].suffix;Ue.includes(wt.toUpperCase())&&(c.value[nt].name===c.value[se].name&&(g.value=Xe,console.log(g.value,123456789)),Xe++,y.value.push(I(l.value,c.value[nt].name)))}R()}else if(ue.includes(ve.toUpperCase()))r.push({path:"/AudioPlay",query:{url:I(l.value,fe.name)}});else{let Xe=document.createElement("a");Xe.href=I(l.value,fe.name),Xe.download=fe.name,Xe.target="_blank",Xe.click()}}},tt=()=>{Zl.get(`${o}/list/${l.value}`).then((se,fe)=>{se.status===200&&(c.value=se.data.map(ve=>(ve.size=(Number(ve.size)/1024/1024).toFixed(2)+"MB",ve.isDirectory?ve.size="":ve.url=I(l.value,ve.name),ve)))})},Pe=()=>{h()},we=()=>{window.history&&window.history.pushState&&(history.pushState(null,null,document.URL),window.addEventListener("popstate",Pe,!1))},ye=Me("list"),te=()=>{ye.value=ye.value==="list"?"":"list"};return Ft(()=>{let se=localStorage.getItem("path");se&&(l.value=se),we(),tt()}),_r(()=>{window.removeEventListener("popstate",Pe,!1)}),Gt(l,(se,fe)=>{localStorage.setItem("path",se)}),(se,fe)=>(le(),He("div",null,[Ee("div",jm,[Ee("div",{class:"ret",onClick:h},[F(Te(WA),{strokeWidth:2,class:"icon-svg",fill:"#f6823b",size:"24",theme:"outline"})]),Ee("div",zm,An(H(l.value,"")),1),Ee("div",{class:"mode",onClick:te},[ye.value==="list"?(le(),ze(Te(HA),{key:0,theme:"outline",size:"28",fill:"#f6823b",strokeWidth:3})):(le(),ze(Te(MA),{key:1,theme:"outline",size:"28",fill:"#f6823b",strokeWidth:3}))])]),Ee("div",Mm,[ye.value==="list"?(le(),ze(Rm,{key:0,"table-data":c.value,"table-head":u.value,onClickFile:We,onDelFile:Ae,onCopyUrl:D},null,8,["table-data","table-head"])):(le(),ze(gm,{key:1,"table-data":c.value,"table-head":u.value,onClickFile:We,onDelFile:Ae,onCopyUrl:D},null,8,["table-data","table-head"]))]),w.value?(le(),He("div",Dm,[Ee("div",{class:"close-btn",onClick:_},[F(Te(NA),{strokeWidth:5,fill:"#ffffff",size:"30",theme:"outline"})]),Ee("div",Fm,[Ee("div",{class:"left-btn",onClick:C},[F(Te(DA),{strokeWidth:5,fill:"#ffffff",size:"30",theme:"outline"})]),Ee("div",{class:"right-btn",onClick:B},[F(Te(FA),{strokeWidth:5,fill:"#ffffff",size:"30",theme:"outline"})]),Ee("img",{src:b.value,alt:""},null,8,Nm)]),Ee("div",{class:"blackScreen",onClick:_})])):mn("",!0),F(co,null,{default:fr(()=>[t.value?(le(),ze(Xl,{key:0,"ok-btn-text":"返回",title:"预览方式",onOkBtn:Ie},{body:fr(()=>[Ee("ul",qm,[Ee("li",{onClick:fe[0]||(fe[0]=ve=>G("web"))},"网页播放"),Ee("li",{onClick:fe[1]||(fe[1]=ve=>G("vlc"))},"Vlc播放")])]),_:1})):mn("",!0)]),_:1}),F(co,null,{default:fr(()=>[n.value?(le(),ze(Xl,{key:0,btnNum:2,title:"提示",onOkBtn:Ne,onCloseBtn:ae},{body:fr(()=>[Hm]),_:1})):mn("",!0)]),_:1})]))}},Um=Tr(Wm,[["__scopeId","data-v-2219c233"]]);var Ym=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Qm(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Fc={exports:{}};(function(e,t){(function(n,r){e.exports=r()})(self,()=>(()=>{var n={916:(c,u,h)=>{var y=h(471);c.exports=function(b){var g,f="",w=(b=b||{}).video,B=b.options,C=y.$escape,R=b.tran,_=b.icons,I=b.index,H=y.$each;return b.$value,b.$index,f+=`<div class="dplayer-mask"></div>
<div class="dplayer-video-wrap">
    `,g=h(568)(w),f+=g,f+=`
    `,B.logo&&(f+=`
    <div class="dplayer-logo">
        <img src="`,f+=C(B.logo),f+=`">
    </div>
    `),f+=`
    <div class="dplayer-danmaku"`,B.danmaku&&B.danmaku.bottom&&(f+=' style="margin-bottom:',f+=C(B.danmaku.bottom),f+='"'),f+=`>
        <div class="dplayer-danmaku-item dplayer-danmaku-item--demo"></div>
    </div>
    <div class="dplayer-subtitle"></div>
    <div class="dplayer-bezel">
        <span class="dplayer-bezel-icon"></span>
        `,B.danmaku&&(f+=`
        <span class="dplayer-danloading">`,f+=C(R("danmaku-loading")),f+=`</span>
        `),f+=`
        <span class="diplayer-loading-icon">`,f+=_.loading,f+=`</span>
    </div>
</div>
<div class="dplayer-controller-mask"></div>
<div class="dplayer-controller">
    <div class="dplayer-icons dplayer-comment-box">
        <button class="dplayer-icon dplayer-comment-setting-icon" data-balloon="`,f+=C(R("setting")),f+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,f+=_.pallette,f+=`</span>
        </button>
        <div class="dplayer-comment-setting-box">
            <div class="dplayer-comment-setting-color">
                <div class="dplayer-comment-setting-title">`,f+=C(R("set-danmaku-color")),f+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,f+=C(I),f+=`" value="#fff" checked>
                    <span style="background: #fff;"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,f+=C(I),f+=`" value="#e54256">
                    <span style="background: #e54256"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,f+=C(I),f+=`" value="#ffe133">
                    <span style="background: #ffe133"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,f+=C(I),f+=`" value="#64DD17">
                    <span style="background: #64DD17"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,f+=C(I),f+=`" value="#39ccff">
                    <span style="background: #39ccff"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,f+=C(I),f+=`" value="#D500F9">
                    <span style="background: #D500F9"></span>
                </label>
            </div>
            <div class="dplayer-comment-setting-type">
                <div class="dplayer-comment-setting-title">`,f+=C(R("set-danmaku-type")),f+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,f+=C(I),f+=`" value="1">
                    <span>`,f+=C(R("top")),f+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,f+=C(I),f+=`" value="0" checked>
                    <span>`,f+=C(R("rolling")),f+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,f+=C(I),f+=`" value="2">
                    <span>`,f+=C(R("bottom")),f+=`</span>
                </label>
            </div>
        </div>
        <input class="dplayer-comment-input" type="text" placeholder="`,f+=C(R("input-danmaku-enter")),f+=`" maxlength="30">
        <button class="dplayer-icon dplayer-send-icon" data-balloon="`,f+=C(R("send")),f+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,f+=_.send,f+=`</span>
        </button>
    </div>
    <div class="dplayer-icons dplayer-icons-left">
        <button class="dplayer-icon dplayer-play-icon">
            <span class="dplayer-icon-content">`,f+=_.play,f+=`</span>
        </button>
        <div class="dplayer-volume">
            <button class="dplayer-icon dplayer-volume-icon">
                <span class="dplayer-icon-content">`,f+=_.volumeDown,f+=`</span>
            </button>
            <div class="dplayer-volume-bar-wrap" data-balloon-pos="up">
                <div class="dplayer-volume-bar">
                    <div class="dplayer-volume-bar-inner" style="background: `,f+=C(B.theme),f+=`;">
                        <span class="dplayer-thumb" style="background: `,f+=C(B.theme),f+=`"></span>
                    </div>
                </div>
            </div>
        </div>
        <span class="dplayer-time">
            <span class="dplayer-ptime">0:00</span> /
            <span class="dplayer-dtime">0:00</span>
        </span>
        `,B.live&&(f+=`
        <span class="dplayer-live-badge"><span class="dplayer-live-dot" style="background: `,f+=C(B.theme),f+=';"></span>',f+=C(R("live")),f+=`</span>
        `),f+=`
    </div>
    <div class="dplayer-icons dplayer-icons-right">
        `,B.video.quality&&(f+=`
        <div class="dplayer-quality">
            <button class="dplayer-icon dplayer-quality-icon">`,f+=C(B.video.quality[B.video.defaultQuality].name),f+=`</button>
            <div class="dplayer-quality-mask">
                <div class="dplayer-quality-list">
                `,H(B.video.quality,function(D,Ae){f+=`
                    <div class="dplayer-quality-item" data-index="`,f+=C(Ae),f+='">',f+=C(D.name),f+=`</div>
                `}),f+=`
                </div>
            </div>
        </div>
        `),f+=`
        `,B.screenshot&&(f+=`
        <div class="dplayer-icon dplayer-camera-icon" data-balloon="`,f+=C(R("screenshot")),f+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,f+=_.camera,f+=`</span>
        </div>
        `),f+=`
        `,B.airplay&&(f+=`
        <div class="dplayer-icon dplayer-airplay-icon" data-balloon="`,f+=C(R("airplay")),f+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,f+=_.airplay,f+=`</span>
        </div>
        `),f+=`
        `,B.chromecast&&(f+=`
        <div class="dplayer-icon dplayer-chromecast-icon" data-balloon="`,f+=C(R("chromecast")),f+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,f+=_.chromecast,f+=`</span>
        </div>
        `),f+=`
        <div class="dplayer-comment">
            <button class="dplayer-icon dplayer-comment-icon" data-balloon="`,f+=C(R("send-danmaku")),f+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,f+=_.comment,f+=`</span>
            </button>
        </div>
        `,B.subtitle&&(f+=`
        `,typeof B.subtitle.url=="string"?(f+=`
        <div class="dplayer-subtitle-btn">
            <button class="dplayer-icon dplayer-subtitle-icon" data-balloon="`,f+=C(R("hide-subs")),f+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,f+=_.subtitle,f+=`</span>
            </button>
        </div>
        `):(f+=`
        <div class="dplayer-subtitles">
            <button class="dplayer-icon dplayer-subtitles-icon" data-balloon="`,f+=C(R("subtitle")),f+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,f+=_.subtitle,f+=`</span>
            </button>
            <div class="dplayer-subtitles-box">
                <div class="dplayer-subtitles-panel">
                    `,H(B.subtitle.url,function(D,Ae){f+=`
                        <div class="dplayer-subtitles-item" data-subtitle="`,f+=C(D.url),f+=`">
                            <!-- if lang, show tran(lang). if lang and name, show name + (tran(lang)). if name, show name. off option use lang for translation. -->
                            <span class="dplayer-label">`,f+=C(D.lang?D.name?D.name+" ("+R(D.lang)+")":R(D.lang):D.name),f+=`</span>
                        </div>
                    `}),f+=`
                </div>
            </div>
        </div>
        `),f+=`
        `),f+=`
        <div class="dplayer-setting">
            <button class="dplayer-icon dplayer-setting-icon" data-balloon="`,f+=C(R("setting")),f+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,f+=_.setting,f+=`</span>
            </button>
            <div class="dplayer-setting-box">
                <div class="dplayer-setting-origin-panel">
                    <div class="dplayer-setting-item dplayer-setting-speed">
                        <span class="dplayer-label">`,f+=C(R("speed")),f+=`</span>
                        <div class="dplayer-toggle">`,f+=_.right,f+=`</div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-loop">
                        <span class="dplayer-label">`,f+=C(R("loop")),f+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-toggle-setting-input" type="checkbox" name="dplayer-toggle">
                            <label for="dplayer-toggle"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-showdan">
                        <span class="dplayer-label">`,f+=C(R("show-danmaku")),f+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-showdan-setting-input" type="checkbox" name="dplayer-toggle-dan">
                            <label for="dplayer-toggle-dan"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danunlimit">
                        <span class="dplayer-label">`,f+=C(R("unlimited-danmaku")),f+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-danunlimit-setting-input" type="checkbox" name="dplayer-toggle-danunlimit">
                            <label for="dplayer-toggle-danunlimit"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danmaku">
                        <span class="dplayer-label">`,f+=C(R("opacity-danmaku")),f+=`</span>
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
                    `,H(B.playbackSpeed,function(D,Ae){f+=`
                        <div class="dplayer-setting-speed-item" data-speed="`,f+=C(D),f+=`">
                            <span class="dplayer-label">`,f+=C(D===1?R("normal"):D),f+=`</span>
                        </div>
                    `}),f+=`
                </div>
            </div>
        </div>
        <div class="dplayer-full">
            <button class="dplayer-icon dplayer-full-in-icon" data-balloon="`,f+=C(R("web-fullscreen")),f+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,f+=_.fullWeb,f+=`</span>
            </button>
            <button class="dplayer-icon dplayer-full-icon" data-balloon="`,f+=C(R("fullscreen")),f+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,f+=_.full,f+=`</span>
            </button>
        </div>
    </div>
    <div class="dplayer-bar-wrap">
        <div class="dplayer-bar-time hidden">00:00</div>
        <div class="dplayer-bar-preview"></div>
        <div class="dplayer-bar">
            <div class="dplayer-loaded" style="width: 0;"></div>
            <div class="dplayer-played" style="width: 0; background: `,f+=C(B.theme),f+=`">
                <span class="dplayer-thumb" style="background: `,f+=C(B.theme),f+=`"></span>
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
    `,B.danmaku&&(f+=`
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
    `),f+=`
</div>
<div class="dplayer-menu">
    `,H(B.contextmenu,function(D,Ae){f+=`
        <div class="dplayer-menu-item">
            <a`,D.link&&(f+=' target="_blank"'),f+=' href="',f+=C(D.link||"javascript:void(0);"),f+='">',D.key&&(f+=" ",f+=C(R(D.key))),D.text&&(f+=" ",f+=C(D.text)),f+=`</a>
        </div>
    `}),f+=`
</div>
<div class="dplayer-notice-list"></div>
<button class="dplayer-mobile-play">
    `,f+=_.play,f+=`
</button>`}},568:(c,u,h)=>{var y=h(471);c.exports=function(b){var g="",f=(b=b||{}).enableSubtitle,w=b.subtitle,B=b.current,C=b.airplay,R=b.pic,_=y.$escape,I=b.screenshot,H=b.preload,D=b.url;return f=w&&w.type==="webvtt",g+=`
<video
    class="dplayer-video `,B&&(g+="dplayer-video-current"),g+=`"
    webkit-playsinline
    `,C&&(g+=' x-webkit-airplay="allow" '),g+=`
    playsinline
    `,R&&(g+='poster="',g+=_(R),g+='"'),g+=`
    `,(I||f)&&(g+='crossorigin="anonymous"'),g+=`
    `,H&&(g+='preload="',g+=_(H),g+='"'),g+=`
    `,C?g+=`
    nosrc
    `:D&&(g+=`
    src="`,g+=_(D),g+=`"
    `),g+=`
    >
    `,C&&(g+=`
    <source src="`,g+=_(D),g+=`">
    `),g+=`
    `,f&&(g+=`
    <track class="dplayer-subtrack" kind="metadata" default src="`,g+=_(typeof w.url=="string"?w.url:w.url[w.index].url),g+=`"></track>
    `),g+`
</video>`}},49:(c,u,h)=>{h.d(u,{Z:()=>w});var y=h(415),b=h.n(y),g=h(352),f=h.n(g)()(b());f.push([c.id,`:root {
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
`],sourceRoot:""}]);const w=f},685:(c,u,h)=>{h.d(u,{Z:()=>H});var y=h(415),b=h.n(y),g=h(352),f=h.n(g),w=h(49),B=h(80),C=h.n(B),R=new URL(h(831),h.b),_=f()(b());_.i(w.Z);var I=C()(R);_.push([c.id,`@keyframes my-face {
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
  background: url(`+I+`) repeat-x bottom;
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
}`],sourceRoot:""}]);const H=_},856:c=>{var u=[];function h(g){for(var f=-1,w=0;w<u.length;w++)if(u[w].identifier===g){f=w;break}return f}function y(g,f){for(var w={},B=[],C=0;C<g.length;C++){var R=g[C],_=f.base?R[0]+f.base:R[0],I=w[_]||0,H="".concat(_," ").concat(I);w[_]=I+1;var D=h(H),Ae={css:R[1],media:R[2],sourceMap:R[3],supports:R[4],layer:R[5]};if(D!==-1)u[D].references++,u[D].updater(Ae);else{var Se=b(Ae,f);f.byIndex=C,u.splice(C,0,{identifier:H,updater:Se,references:1})}B.push(H)}return B}function b(g,f){var w=f.domAPI(f);return w.update(g),function(B){if(B){if(B.css===g.css&&B.media===g.media&&B.sourceMap===g.sourceMap&&B.supports===g.supports&&B.layer===g.layer)return;w.update(g=B)}else w.remove()}}c.exports=function(g,f){var w=y(g=g||[],f=f||{});return function(B){B=B||[];for(var C=0;C<w.length;C++){var R=h(w[C]);u[R].references--}for(var _=y(B,f),I=0;I<w.length;I++){var H=h(w[I]);u[H].references===0&&(u[H].updater(),u.splice(H,1))}w=_}}},370:c=>{var u={};c.exports=function(h,y){var b=function(g){if(u[g]===void 0){var f=document.querySelector(g);if(window.HTMLIFrameElement&&f instanceof window.HTMLIFrameElement)try{f=f.contentDocument.head}catch{f=null}u[g]=f}return u[g]}(h);if(!b)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");b.appendChild(y)}},278:c=>{c.exports=function(u){var h=document.createElement("style");return u.setAttributes(h,u.attributes),u.insert(h,u.options),h}},458:(c,u,h)=>{c.exports=function(y){var b=h.nc;b&&y.setAttribute("nonce",b)}},470:c=>{c.exports=function(u){var h=u.insertStyleElement(u);return{update:function(y){(function(b,g,f){var w="";f.supports&&(w+="@supports (".concat(f.supports,") {")),f.media&&(w+="@media ".concat(f.media," {"));var B=f.layer!==void 0;B&&(w+="@layer".concat(f.layer.length>0?" ".concat(f.layer):""," {")),w+=f.css,B&&(w+="}"),f.media&&(w+="}"),f.supports&&(w+="}");var C=f.sourceMap;C&&typeof btoa<"u"&&(w+=`
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(C))))," */")),g.styleTagTransform(w,b,g.options)})(h,u,y)},remove:function(){(function(y){if(y.parentNode===null)return!1;y.parentNode.removeChild(y)})(h)}}}},488:c=>{c.exports=function(u,h){if(h.styleSheet)h.styleSheet.cssText=u;else{for(;h.firstChild;)h.removeChild(h.firstChild);h.appendChild(document.createTextNode(u))}}},251:c=>{c.exports='<svg viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg"><path d="M288 90v96c0 20-16 36-36 36h-10c-16 0-16-24 0-24h10c7 0 12-5 12-12V90c0-7-5-12-12-12H36c-7 0-12 5-12 12v96c0 7 5 12 12 12h10c16 0 16 24 0 24H36c-20 0-36-16-36-36V90c0-20 16-36 36-36h216c20 0 36 16 36 36zm-120 62l48 68c14 20 1 38-20 38H92c-21 0-34-18-20-38l48-68c13-18 35-18 48 0z"></path></svg>'},113:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M16 23c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zM16 13c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zM27 28h-22c-1.654 0-3-1.346-3-3v-16c0-1.654 1.346-3 3-3h3c0.552 0 1 0.448 1 1s-0.448 1-1 1h-3c-0.551 0-1 0.449-1 1v16c0 0.552 0.449 1 1 1h22c0.552 0 1-0.448 1-1v-16c0-0.551-0.448-1-1-1h-11c-0.552 0-1-0.448-1-1s0.448-1 1-1h11c1.654 0 3 1.346 3 3v16c0 1.654-1.346 3-3 3zM24 10.5c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5zM15 4c0 0.552-0.448 1-1 1h-4c-0.552 0-1-0.448-1-1v0c0-0.552 0.448-1 1-1h4c0.552 0 1 0.448 1 1v0z"></path></svg>'},193:c=>{c.exports='<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="chromecast" class="svg-inline--fa fa-chromecast fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M447.8,64H64c-23.6,0-42.7,19.1-42.7,42.7v63.9H64v-63.9h383.8v298.6H298.6V448H448c23.6,0,42.7-19.1,42.7-42.7V106.7 C490.7,83.1,471.4,64,447.8,64z M21.3,383.6L21.3,383.6l0,63.9h63.9C85.2,412.2,56.6,383.6,21.3,383.6L21.3,383.6z M21.3,298.6V341 c58.9,0,106.6,48.1,106.6,107h42.7C170.7,365.6,103.7,298.7,21.3,298.6z M213.4,448h42.7c-0.5-129.5-105.3-234.3-234.8-234.6l0,42.4 C127.3,255.6,213.3,342,213.4,448z"></path></svg>'},338:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.090 0.131h-22.731c-2.354 0-4.262 1.839-4.262 4.109v16.401c0 2.269 1.908 4.109 4.262 4.109h4.262v-2.706h8.469l-8.853 8.135 1.579 1.451 7.487-6.88h9.787c2.353 0 4.262-1.84 4.262-4.109v-16.401c0-2.27-1.909-4.109-4.262-4.109v0zM28.511 19.304c0 1.512-1.272 2.738-2.841 2.738h-8.425l-0.076-0.070-0.076 0.070h-11.311c-1.569 0-2.841-1.226-2.841-2.738v-13.696c0-1.513 1.272-2.739 2.841-2.739h19.889c1.569 0 2.841-0.142 2.841 1.37v15.064z"></path></svg>'},807:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.128 0.38h-22.553c-2.336 0-4.229 1.825-4.229 4.076v16.273c0 2.251 1.893 4.076 4.229 4.076h4.229v-2.685h8.403l-8.784 8.072 1.566 1.44 7.429-6.827h9.71c2.335 0 4.229-1.825 4.229-4.076v-16.273c0-2.252-1.894-4.076-4.229-4.076zM28.538 19.403c0 1.5-1.262 2.717-2.819 2.717h-8.36l-0.076-0.070-0.076 0.070h-11.223c-1.557 0-2.819-1.217-2.819-2.717v-13.589c0-1.501 1.262-2.718 2.819-2.718h19.734c1.557 0 2.819-0.141 2.819 1.359v14.947zM9.206 10.557c-1.222 0-2.215 0.911-2.215 2.036s0.992 2.035 2.215 2.035c1.224 0 2.216-0.911 2.216-2.035s-0.992-2.036-2.216-2.036zM22.496 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.224 0 2.215-0.911 2.215-2.035s-0.991-2.036-2.215-2.036zM15.852 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.222 0 2.215-0.911 2.215-2.035s-0.992-2.036-2.215-2.036z"></path></svg>'},300:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M24.965 24.38h-18.132c-1.366 0-2.478-1.113-2.478-2.478v-11.806c0-1.364 1.111-2.478 2.478-2.478h18.132c1.366 0 2.478 1.113 2.478 2.478v11.806c0 1.364-1.11 2.478-2.478 2.478zM6.833 10.097v11.806h18.134l-0.002-11.806h-18.132zM2.478 28.928h5.952c0.684 0 1.238-0.554 1.238-1.239 0-0.684-0.554-1.238-1.238-1.238h-5.952v-5.802c0-0.684-0.554-1.239-1.238-1.239s-1.239 0.556-1.239 1.239v5.802c0 1.365 1.111 2.478 2.478 2.478zM30.761 19.412c-0.684 0-1.238 0.554-1.238 1.238v5.801h-5.951c-0.686 0-1.239 0.554-1.239 1.238 0 0.686 0.554 1.239 1.239 1.239h5.951c1.366 0 2.478-1.111 2.478-2.478v-5.801c0-0.683-0.554-1.238-1.239-1.238zM0 5.55v5.802c0 0.683 0.554 1.238 1.238 1.238s1.238-0.555 1.238-1.238v-5.802h5.952c0.684 0 1.238-0.554 1.238-1.238s-0.554-1.238-1.238-1.238h-5.951c-1.366-0.001-2.478 1.111-2.478 2.476zM32 11.35v-5.801c0-1.365-1.11-2.478-2.478-2.478h-5.951c-0.686 0-1.239 0.554-1.239 1.238s0.554 1.238 1.239 1.238h5.951v5.801c0 0.683 0.554 1.237 1.238 1.237 0.686 0.002 1.239-0.553 1.239-1.236z"></path></svg>'},574:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M6.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v4h4c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333zM30.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h4v-4c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM30.667 12c-0.8 0-1.333-0.533-1.333-1.333v-4h-4c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM1.333 12c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333h-4v4c0 0.8-0.533 1.333-1.333 1.333z"></path></svg>'},182:c=>{c.exports='<svg version="1.1" viewBox="0 0 22 22"><svg x="7" y="1"><circle class="diplayer-loading-dot diplayer-loading-dot-0" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-1" cx="4" cy="4" r="2"></circle></svg><svg x="13" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-2" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-3" cx="4" cy="4" r="2"></circle></svg><svg x="7" y="13"><circle class="diplayer-loading-dot diplayer-loading-dot-4" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-5" cx="4" cy="4" r="2"></circle></svg><svg x="1" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-6" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-7" cx="4" cy="4" r="2"></circle></svg></svg>'},965:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M19.357 2.88c1.749 0 3.366 0.316 4.851 0.946 1.485 0.632 2.768 1.474 3.845 2.533s1.922 2.279 2.532 3.661c0.611 1.383 0.915 2.829 0.915 4.334 0 1.425-0.304 2.847-0.915 4.271-0.611 1.425-1.587 2.767-2.928 4.028-0.855 0.813-1.811 1.607-2.869 2.38s-2.136 1.465-3.233 2.075c-1.099 0.61-2.198 1.098-3.296 1.465-1.098 0.366-2.115 0.549-3.051 0.549-1.343 0-2.441-0.438-3.296-1.311-0.854-0.876-1.281-2.41-1.281-4.608 0-0.366 0.020-0.773 0.060-1.221s0.062-0.895 0.062-1.343c0-0.773-0.183-1.353-0.55-1.738-0.366-0.387-0.793-0.58-1.281-0.58-0.652 0-1.21 0.295-1.678 0.886s-0.926 1.23-1.373 1.921c-0.447 0.693-0.905 1.334-1.372 1.923s-1.028 0.886-1.679 0.886c-0.529 0-1.048-0.427-1.556-1.282s-0.763-2.259-0.763-4.212c0-2.197 0.529-4.241 1.587-6.133s2.462-3.529 4.21-4.912c1.75-1.383 3.762-2.471 6.041-3.264 2.277-0.796 4.617-1.212 7.018-1.253zM7.334 15.817c0.569 0 1.047-0.204 1.434-0.611s0.579-0.875 0.579-1.404c0-0.569-0.193-1.047-0.579-1.434s-0.864-0.579-1.434-0.579c-0.529 0-0.987 0.193-1.373 0.579s-0.58 0.864-0.58 1.434c0 0.53 0.194 0.998 0.58 1.404 0.388 0.407 0.845 0.611 1.373 0.611zM12.216 11.79c0.691 0 1.292-0.254 1.8-0.763s0.762-1.107 0.762-1.8c0-0.732-0.255-1.343-0.762-1.831-0.509-0.489-1.109-0.732-1.8-0.732-0.732 0-1.342 0.244-1.831 0.732-0.488 0.488-0.732 1.098-0.732 1.831 0 0.693 0.244 1.292 0.732 1.8s1.099 0.763 1.831 0.763zM16.366 25.947c0.692 0 1.282-0.214 1.77-0.64s0.732-0.987 0.732-1.678-0.244-1.261-0.732-1.709c-0.489-0.448-1.078-0.671-1.77-0.671-0.65 0-1.21 0.223-1.678 0.671s-0.702 1.018-0.702 1.709c0 0.692 0.234 1.25 0.702 1.678s1.027 0.64 1.678 0.64zM19.113 9.592c0.651 0 1.129-0.203 1.433-0.611 0.305-0.406 0.459-0.874 0.459-1.404 0-0.488-0.154-0.947-0.459-1.373-0.304-0.427-0.782-0.641-1.433-0.641-0.529 0-1.008 0.193-1.434 0.58s-0.64 0.865-0.64 1.434c0 0.571 0.213 1.049 0.64 1.434 0.427 0.389 0.905 0.581 1.434 0.581zM24.848 12.826c0.57 0 1.067-0.213 1.495-0.64 0.427-0.427 0.64-0.947 0.64-1.556 0-0.57-0.214-1.068-0.64-1.495-0.428-0.427-0.927-0.64-1.495-0.64-0.611 0-1.129 0.213-1.555 0.64-0.428 0.427-0.642 0.926-0.642 1.495 0 0.611 0.213 1.129 0.642 1.556s0.947 0.64 1.555 0.64z"></path></svg>'},74:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 17 32"><path d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path></svg>'},730:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 32"><path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path></svg>'},428:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path></svg>'},254:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M13.725 30l3.9-5.325-3.9-1.125v6.45zM0 17.5l11.050 3.35 13.6-11.55-10.55 12.425 11.8 3.65 6.1-23.375-32 15.5z"></path></svg>'},934:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 28"><path d="M28.633 17.104c0.035 0.21 0.026 0.463-0.026 0.76s-0.14 0.598-0.262 0.904c-0.122 0.306-0.271 0.581-0.445 0.825s-0.367 0.419-0.576 0.524c-0.209 0.105-0.393 0.157-0.55 0.157s-0.332-0.035-0.524-0.105c-0.175-0.052-0.393-0.1-0.655-0.144s-0.528-0.052-0.799-0.026c-0.271 0.026-0.541 0.083-0.812 0.17s-0.502 0.236-0.694 0.445c-0.419 0.437-0.664 0.934-0.734 1.493s0.009 1.092 0.236 1.598c0.175 0.349 0.148 0.699-0.079 1.048-0.105 0.14-0.271 0.284-0.498 0.432s-0.476 0.284-0.747 0.406-0.555 0.218-0.851 0.288c-0.297 0.070-0.559 0.105-0.786 0.105-0.157 0-0.306-0.061-0.445-0.183s-0.236-0.253-0.288-0.393h-0.026c-0.192-0.541-0.52-1.009-0.982-1.402s-1-0.589-1.611-0.589c-0.594 0-1.131 0.197-1.611 0.589s-0.816 0.851-1.009 1.375c-0.087 0.21-0.218 0.362-0.393 0.458s-0.367 0.144-0.576 0.144c-0.244 0-0.52-0.044-0.825-0.131s-0.611-0.197-0.917-0.327c-0.306-0.131-0.581-0.284-0.825-0.458s-0.428-0.349-0.55-0.524c-0.087-0.122-0.135-0.266-0.144-0.432s0.057-0.397 0.197-0.694c0.192-0.402 0.266-0.86 0.223-1.375s-0.266-0.991-0.668-1.428c-0.244-0.262-0.541-0.432-0.891-0.511s-0.681-0.109-0.995-0.092c-0.367 0.017-0.742 0.087-1.127 0.21-0.244 0.070-0.489 0.052-0.734-0.052-0.192-0.070-0.371-0.231-0.537-0.485s-0.314-0.533-0.445-0.838c-0.131-0.306-0.231-0.62-0.301-0.943s-0.087-0.59-0.052-0.799c0.052-0.384 0.227-0.629 0.524-0.734 0.524-0.21 0.995-0.555 1.415-1.035s0.629-1.017 0.629-1.611c0-0.611-0.21-1.144-0.629-1.598s-0.891-0.786-1.415-0.996c-0.157-0.052-0.288-0.179-0.393-0.38s-0.157-0.406-0.157-0.616c0-0.227 0.035-0.48 0.105-0.76s0.162-0.55 0.275-0.812 0.244-0.502 0.393-0.72c0.148-0.218 0.31-0.38 0.485-0.485 0.14-0.087 0.275-0.122 0.406-0.105s0.275 0.052 0.432 0.105c0.524 0.21 1.070 0.275 1.637 0.197s1.070-0.327 1.506-0.747c0.21-0.209 0.362-0.467 0.458-0.773s0.157-0.607 0.183-0.904c0.026-0.297 0.026-0.568 0-0.812s-0.048-0.419-0.065-0.524c-0.035-0.105-0.066-0.227-0.092-0.367s-0.013-0.262 0.039-0.367c0.105-0.244 0.293-0.458 0.563-0.642s0.563-0.336 0.878-0.458c0.314-0.122 0.62-0.214 0.917-0.275s0.533-0.092 0.707-0.092c0.227 0 0.406 0.074 0.537 0.223s0.223 0.301 0.275 0.458c0.192 0.471 0.507 0.886 0.943 1.244s0.952 0.537 1.546 0.537c0.611 0 1.153-0.17 1.624-0.511s0.803-0.773 0.996-1.297c0.070-0.14 0.179-0.284 0.327-0.432s0.301-0.223 0.458-0.223c0.244 0 0.511 0.035 0.799 0.105s0.572 0.166 0.851 0.288c0.279 0.122 0.537 0.279 0.773 0.472s0.423 0.402 0.563 0.629c0.087 0.14 0.113 0.293 0.079 0.458s-0.070 0.284-0.105 0.354c-0.227 0.506-0.297 1.039-0.21 1.598s0.341 1.048 0.76 1.467c0.419 0.419 0.934 0.651 1.546 0.694s1.179-0.057 1.703-0.301c0.14-0.087 0.31-0.122 0.511-0.105s0.371 0.096 0.511 0.236c0.262 0.244 0.493 0.616 0.694 1.113s0.336 1 0.406 1.506c0.035 0.297-0.013 0.528-0.144 0.694s-0.266 0.275-0.406 0.327c-0.542 0.192-1.004 0.528-1.388 1.009s-0.576 1.026-0.576 1.637c0 0.594 0.162 1.113 0.485 1.559s0.747 0.764 1.27 0.956c0.122 0.070 0.227 0.14 0.314 0.21 0.192 0.157 0.323 0.358 0.393 0.602v0zM16.451 19.462c0.786 0 1.528-0.149 2.227-0.445s1.305-0.707 1.821-1.231c0.515-0.524 0.921-1.131 1.218-1.821s0.445-1.428 0.445-2.214c0-0.786-0.148-1.524-0.445-2.214s-0.703-1.292-1.218-1.808c-0.515-0.515-1.122-0.921-1.821-1.218s-1.441-0.445-2.227-0.445c-0.786 0-1.524 0.148-2.214 0.445s-1.292 0.703-1.808 1.218c-0.515 0.515-0.921 1.118-1.218 1.808s-0.445 1.428-0.445 2.214c0 0.786 0.149 1.524 0.445 2.214s0.703 1.297 1.218 1.821c0.515 0.524 1.118 0.934 1.808 1.231s1.428 0.445 2.214 0.445v0z"></path></svg>'},410:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path></svg>'},644:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"></path></svg>'},324:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"></path></svg>'},437:c=>{c.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056z"></path></svg>'},897:(c,u,h)=>{var y=typeof self<"u"?self:typeof window<"u"?window:h.g!==void 0?h.g:{},b=Object.create(y),g=/["&'<>]/;function f(w){return typeof w!="string"&&(w=w==null?"":typeof w=="function"?f(w.call(w)):JSON.stringify(w)),w}b.$escape=function(w){return function(B){var C=""+B,R=g.exec(C);if(!R)return B;var _="",I=void 0,H=void 0,D=void 0;for(I=R.index,H=0;I<C.length;I++){switch(C.charCodeAt(I)){case 34:D="&#34;";break;case 38:D="&#38;";break;case 39:D="&#39;";break;case 60:D="&#60;";break;case 62:D="&#62;";break;default:continue}H!==I&&(_+=C.substring(H,I)),H=I+1,_+=D}return H!==I?_+C.substring(H,I):_}(f(w))},b.$each=function(w,B){if(Array.isArray(w))for(var C=0,R=w.length;C<R;C++)B(w[C],C);else for(var _ in w)B(w[_],_)},c.exports=b},471:(c,u,h)=>{c.exports=h(897)},352:c=>{c.exports=function(u){var h=[];return h.toString=function(){return this.map(function(y){var b="",g=y[5]!==void 0;return y[4]&&(b+="@supports (".concat(y[4],") {")),y[2]&&(b+="@media ".concat(y[2]," {")),g&&(b+="@layer".concat(y[5].length>0?" ".concat(y[5]):""," {")),b+=u(y),g&&(b+="}"),y[2]&&(b+="}"),y[4]&&(b+="}"),b}).join("")},h.i=function(y,b,g,f,w){typeof y=="string"&&(y=[[null,y,void 0]]);var B={};if(g)for(var C=0;C<this.length;C++){var R=this[C][0];R!=null&&(B[R]=!0)}for(var _=0;_<y.length;_++){var I=[].concat(y[_]);g&&B[I[0]]||(w!==void 0&&(I[5]===void 0||(I[1]="@layer".concat(I[5].length>0?" ".concat(I[5]):""," {").concat(I[1],"}")),I[5]=w),b&&(I[2]&&(I[1]="@media ".concat(I[2]," {").concat(I[1],"}")),I[2]=b),f&&(I[4]?(I[1]="@supports (".concat(I[4],") {").concat(I[1],"}"),I[4]=f):I[4]="".concat(f)),h.push(I))}},h}},80:c=>{c.exports=function(u,h){return h||(h={}),u&&(u=String(u.__esModule?u.default:u),/^['"].*['"]$/.test(u)&&(u=u.slice(1,-1)),h.hash&&(u+=h.hash),/["'() \t\n]|(%20)/.test(u)||h.needQuotes?'"'.concat(u.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):u)}},415:c=>{c.exports=function(u){var h=u[1],y=u[3];if(!y)return h;if(typeof btoa=="function"){var b=btoa(unescape(encodeURIComponent(JSON.stringify(y)))),g="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(b),f="/*# ".concat(g," */");return[h].concat([f]).join(`
`)}return[h].join(`
`)}},937:c=>{function u(h){return u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(y){return typeof y}:function(y){return y&&typeof Symbol=="function"&&y.constructor===Symbol&&y!==Symbol.prototype?"symbol":typeof y},u(h)}c.exports=(typeof self>"u"?"undefined":u(self))=="object"?self.FormData:window.FormData},831:c=>{c.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg=="}},r={};function o(c){var u=r[c];if(u!==void 0)return u.exports;var h=r[c]={id:c,exports:{}};return n[c](h,h.exports,o),h.exports}o.m=n,o.n=c=>{var u=c&&c.__esModule?()=>c.default:()=>c;return o.d(u,{a:u}),u},o.d=(c,u)=>{for(var h in u)o.o(u,h)&&!o.o(c,h)&&Object.defineProperty(c,h,{enumerable:!0,get:u[h]})},o.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}(),o.o=(c,u)=>Object.prototype.hasOwnProperty.call(c,u),o.b=document.baseURI||self.location.href,o.nc=void 0;var l={};return(()=>{o.d(l,{default:()=>Hp});var c=o(856),u=o.n(c),h=o(470),y=o.n(h),b=o(370),g=o.n(b),f=o(458),w=o.n(f),B=o(278),C=o.n(B),R=o(488),_=o.n(R),I=o(685),H={};H.styleTagTransform=_(),H.setAttributes=w(),H.insert=g().bind(null,"head"),H.domAPI=y(),H.insertStyleElement=C(),u()(I.Z,H),I.Z&&I.Z.locals&&I.Z.locals;function D(a){return D=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},D(a)}function Ae(a,s){this.name="AggregateError",this.errors=a,this.message=s||""}Ae.prototype=Error.prototype;function Se(a){return Se=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},Se(a)}var Ue=setTimeout;function ue(a){return!!(a&&a.length!==void 0)}function Ie(){}function ae(a){if(!(this instanceof ae))throw new TypeError("Promises must be constructed via new");if(typeof a!="function")throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],Pe(a,this)}function Ne(a,s){for(;a._state===3;)a=a._value;a._state!==0?(a._handled=!0,ae._immediateFn(function(){var A=a._state===1?s.onFulfilled:s.onRejected;if(A!==null){var i;try{i=A(a._value)}catch(d){return void me(s.promise,d)}G(s.promise,i)}else(a._state===1?G:me)(s.promise,a._value)})):a._deferreds.push(s)}function G(a,s){try{if(s===a)throw new TypeError("A promise cannot be resolved with itself.");if(s&&(Se(s)==="object"||typeof s=="function")){var A=s.then;if(s instanceof ae)return a._state=3,a._value=s,void We(a);if(typeof A=="function")return void Pe((i=A,d=s,function(){i.apply(d,arguments)}),a)}a._state=1,a._value=s,We(a)}catch(p){me(a,p)}var i,d}function me(a,s){a._state=2,a._value=s,We(a)}function We(a){a._state===2&&a._deferreds.length===0&&ae._immediateFn(function(){a._handled||ae._unhandledRejectionFn(a._value)});for(var s=0,A=a._deferreds.length;s<A;s++)Ne(a,a._deferreds[s]);a._deferreds=null}function tt(a,s,A){this.onFulfilled=typeof a=="function"?a:null,this.onRejected=typeof s=="function"?s:null,this.promise=A}function Pe(a,s){var A=!1;try{a(function(i){A||(A=!0,G(s,i))},function(i){A||(A=!0,me(s,i))})}catch(i){if(A)return;A=!0,me(s,i)}}ae.prototype.catch=function(a){return this.then(null,a)},ae.prototype.then=function(a,s){var A=new this.constructor(Ie);return Ne(this,new tt(a,s,A)),A},ae.prototype.finally=function(a){var s=this.constructor;return this.then(function(A){return s.resolve(a()).then(function(){return A})},function(A){return s.resolve(a()).then(function(){return s.reject(A)})})},ae.all=function(a){return new ae(function(s,A){if(!ue(a))return A(new TypeError("Promise.all accepts an array"));var i=Array.prototype.slice.call(a);if(i.length===0)return s([]);var d=i.length;function p(v,E){try{if(E&&(Se(E)==="object"||typeof E=="function")){var L=E.then;if(typeof L=="function")return void L.call(E,function(T){p(v,T)},A)}i[v]=E,--d==0&&s(i)}catch(T){A(T)}}for(var m=0;m<i.length;m++)p(m,i[m])})},ae.any=function(a){var s=this;return new s(function(A,i){if(!a||a.length===void 0)return i(new TypeError("Promise.any accepts an array"));var d=Array.prototype.slice.call(a);if(d.length===0)return i();for(var p=[],m=0;m<d.length;m++)try{s.resolve(d[m]).then(A).catch(function(v){p.push(v),p.length===d.length&&i(new Ae(p,"All promises were rejected"))})}catch(v){i(v)}})},ae.allSettled=function(a){return new this(function(s,A){if(!a||a.length===void 0)return A(new TypeError(D(a)+" "+a+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var i=Array.prototype.slice.call(a);if(i.length===0)return s([]);var d=i.length;function p(v,E){if(E&&(D(E)==="object"||typeof E=="function")){var L=E.then;if(typeof L=="function")return void L.call(E,function(T){p(v,T)},function(T){i[v]={status:"rejected",reason:T},--d==0&&s(i)})}i[v]={status:"fulfilled",value:E},--d==0&&s(i)}for(var m=0;m<i.length;m++)p(m,i[m])})},ae.resolve=function(a){return a&&Se(a)==="object"&&a.constructor===ae?a:new ae(function(s){s(a)})},ae.reject=function(a){return new ae(function(s,A){A(a)})},ae.race=function(a){return new ae(function(s,A){if(!ue(a))return A(new TypeError("Promise.race accepts an array"));for(var i=0,d=a.length;i<d;i++)ae.resolve(a[i]).then(s,A)})},ae._immediateFn=typeof setImmediate=="function"&&function(a){setImmediate(a)}||function(a){Ue(a,0)},ae._unhandledRejectionFn=function(a){typeof console<"u"&&console&&console.warn("Possible Unhandled Promise Rejection:",a)};const we=ae;var ye=/mobile/i.test(window.navigator.userAgent);const te={secondToTime:function(a){if((a=a||0)===0||a===1/0||a.toString()==="NaN")return"00:00";var s=Math.floor(a/3600),A=Math.floor((a-3600*s)/60),i=Math.floor(a-3600*s-60*A);return(s>0?[s,A,i]:[A,i]).map(function(d){return d<10?"0"+d:""+d}).join(":")},getElementViewLeft:function(a){var s=a.offsetLeft,A=a.offsetParent,i=document.body.scrollLeft+document.documentElement.scrollLeft;if(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement)for(;A!==null&&A!==a;)s+=A.offsetLeft,A=A.offsetParent;else for(;A!==null;)s+=A.offsetLeft,A=A.offsetParent;return s-i},getBoundingClientRectViewLeft:function(a){var s=window.scrollY||window.pageYOffset||document.body.scrollTop+(document.documentElement&&document.documentElement.scrollTop||0);if(a.getBoundingClientRect){if(typeof this.getBoundingClientRectViewLeft.offset!="number"){var A=document.createElement("div");A.style.cssText="position:absolute;top:0;left:0;",document.body.appendChild(A),this.getBoundingClientRectViewLeft.offset=-A.getBoundingClientRect().top-s,document.body.removeChild(A),A=null}var i=a.getBoundingClientRect(),d=this.getBoundingClientRectViewLeft.offset;return i.left+d}return this.getElementViewLeft(a)},getScrollPosition:function(){return{left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0}},setScrollPosition:function(a){var s=a.left,A=s===void 0?0:s,i=a.top,d=i===void 0?0:i;this.isFirefox?(document.documentElement.scrollLeft=A,document.documentElement.scrollTop=d):window.scrollTo(A,d)},isMobile:ye,isFirefox:/firefox/i.test(window.navigator.userAgent),isChrome:/chrome/i.test(window.navigator.userAgent),isSafari:/safari/i.test(window.navigator.userAgent),storage:{set:function(a,s){localStorage.setItem(a,s)},get:function(a){return localStorage.getItem(a)}},nameMap:{dragStart:ye?"touchstart":"mousedown",dragMove:ye?"touchmove":"mousemove",dragEnd:ye?"touchend":"mouseup"},color2Number:function(a){return a[0]==="#"&&(a=a.substr(1)),a.length===3&&(a="".concat(a[0]).concat(a[0]).concat(a[1]).concat(a[1]).concat(a[2]).concat(a[2])),parseInt(a,16)+0&16777215},number2Color:function(a){return"#"+("00000"+a.toString(16)).slice(-6)},number2Type:function(a){switch(a){case 0:default:return"right";case 1:return"top";case 2:return"bottom"}}};function se(a,s){return function(){return a.apply(s,arguments)}}function fe(a){return fe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},fe(a)}var ve,Xe=Object.prototype.toString,nt=Object.getPrototypeOf,wt=(ve=Object.create(null),function(a){var s=Xe.call(a);return ve[s]||(ve[s]=s.slice(8,-1).toLowerCase())}),je=function(a){return a=a.toLowerCase(),function(s){return wt(s)===a}},z=function(a){return function(s){return fe(s)===a}},J=Array.isArray,Y=z("undefined"),re=je("ArrayBuffer"),Ce=z("string"),x=z("function"),k=z("number"),S=function(a){return a!==null&&fe(a)==="object"},O=function(a){if(wt(a)!=="object")return!1;var s=nt(a);return!(s!==null&&s!==Object.prototype&&Object.getPrototypeOf(s)!==null||Symbol.toStringTag in a||Symbol.iterator in a)},M=je("Date"),q=je("File"),Z=je("Blob"),W=je("FileList"),K=je("URLSearchParams");function N(a,s){var A,i,d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},p=d.allOwnKeys,m=p!==void 0&&p;if(a!=null)if(fe(a)!=="object"&&(a=[a]),J(a))for(A=0,i=a.length;A<i;A++)s.call(null,a[A],A,a);else{var v,E=m?Object.getOwnPropertyNames(a):Object.keys(a),L=E.length;for(A=0;A<L;A++)v=E[A],s.call(null,a[v],v,a)}}function oe(a,s){s=s.toLowerCase();for(var A,i=Object.keys(a),d=i.length;d-- >0;)if(s===(A=i[d]).toLowerCase())return A;return null}var ee,ie,de=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:Ym,be=function(a){return!Y(a)&&a!==de},Oe=(ee=typeof Uint8Array<"u"&&nt(Uint8Array),function(a){return ee&&a instanceof ee}),Le=je("HTMLFormElement"),qe=(ie=Object.prototype.hasOwnProperty,function(a,s){return ie.call(a,s)}),dt=je("RegExp"),Ot=function(a,s){var A=Object.getOwnPropertyDescriptors(a),i={};N(A,function(d,p){s(d,p,a)!==!1&&(i[p]=d)}),Object.defineProperties(a,i)};const P={isArray:J,isArrayBuffer:re,isBuffer:function(a){return a!==null&&!Y(a)&&a.constructor!==null&&!Y(a.constructor)&&x(a.constructor.isBuffer)&&a.constructor.isBuffer(a)},isFormData:function(a){var s="[object FormData]";return a&&(typeof FormData=="function"&&a instanceof FormData||Xe.call(a)===s||x(a.toString)&&a.toString()===s)},isArrayBufferView:function(a){return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?ArrayBuffer.isView(a):a&&a.buffer&&re(a.buffer)},isString:Ce,isNumber:k,isBoolean:function(a){return a===!0||a===!1},isObject:S,isPlainObject:O,isUndefined:Y,isDate:M,isFile:q,isBlob:Z,isRegExp:dt,isFunction:x,isStream:function(a){return S(a)&&x(a.pipe)},isURLSearchParams:K,isTypedArray:Oe,isFileList:W,forEach:N,merge:function a(){for(var s=be(this)&&this||{},A=s.caseless,i={},d=function(v,E){var L=A&&oe(i,E)||E;O(i[L])&&O(v)?i[L]=a(i[L],v):O(v)?i[L]=a({},v):J(v)?i[L]=v.slice():i[L]=v},p=0,m=arguments.length;p<m;p++)arguments[p]&&N(arguments[p],d);return i},extend:function(a,s,A){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},d=i.allOwnKeys;return N(s,function(p,m){A&&x(p)?a[m]=se(p,A):a[m]=p},{allOwnKeys:d}),a},trim:function(a){return a.trim?a.trim():a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},stripBOM:function(a){return a.charCodeAt(0)===65279&&(a=a.slice(1)),a},inherits:function(a,s,A,i){a.prototype=Object.create(s.prototype,i),a.prototype.constructor=a,Object.defineProperty(a,"super",{value:s.prototype}),A&&Object.assign(a.prototype,A)},toFlatObject:function(a,s,A,i){var d,p,m,v={};if(s=s||{},a==null)return s;do{for(p=(d=Object.getOwnPropertyNames(a)).length;p-- >0;)m=d[p],i&&!i(m,a,s)||v[m]||(s[m]=a[m],v[m]=!0);a=A!==!1&&nt(a)}while(a&&(!A||A(a,s))&&a!==Object.prototype);return s},kindOf:wt,kindOfTest:je,endsWith:function(a,s,A){a=String(a),(A===void 0||A>a.length)&&(A=a.length),A-=s.length;var i=a.indexOf(s,A);return i!==-1&&i===A},toArray:function(a){if(!a)return null;if(J(a))return a;var s=a.length;if(!k(s))return null;for(var A=new Array(s);s-- >0;)A[s]=a[s];return A},forEachEntry:function(a,s){for(var A,i=(a&&a[Symbol.iterator]).call(a);(A=i.next())&&!A.done;){var d=A.value;s.call(a,d[0],d[1])}},matchAll:function(a,s){for(var A,i=[];(A=a.exec(s))!==null;)i.push(A);return i},isHTMLForm:Le,hasOwnProperty:qe,hasOwnProp:qe,reduceDescriptors:Ot,freezeMethods:function(a){Ot(a,function(s,A){if(x(a)&&["arguments","caller","callee"].indexOf(A)!==-1)return!1;var i=a[A];x(i)&&(s.enumerable=!1,"writable"in s?s.writable=!1:s.set||(s.set=function(){throw Error("Can not rewrite read-only method '"+A+"'")}))})},toObjectSet:function(a,s){var A={},i=function(d){d.forEach(function(p){A[p]=!0})};return J(a)?i(a):i(String(a).split(s)),A},toCamelCase:function(a){return a.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,function(s,A,i){return A.toUpperCase()+i})},noop:function(){},toFiniteNumber:function(a,s){return a=+a,Number.isFinite(a)?a:s},findKey:oe,global:de,isContextDefined:be,toJSONObject:function(a){var s=new Array(10);return function A(i,d){if(S(i)){if(s.indexOf(i)>=0)return;if(!("toJSON"in i)){s[d]=i;var p=J(i)?[]:{};return N(i,function(m,v){var E=A(m,d+1);!Y(E)&&(p[v]=E)}),s[d]=void 0,p}}return i}(a,0)}};function ut(a,s,A,i,d){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=a,this.name="AxiosError",s&&(this.code=s),A&&(this.config=A),i&&(this.request=i),d&&(this.response=d)}P.inherits(ut,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:P.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var Fn=ut.prototype,rt={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(function(a){rt[a]={value:a}}),Object.defineProperties(ut,rt),Object.defineProperty(Fn,"isAxiosError",{value:!0}),ut.from=function(a,s,A,i,d,p){var m=Object.create(Fn);return P.toFlatObject(a,m,function(v){return v!==Error.prototype},function(v){return v!=="isAxiosError"}),ut.call(m,a.message,s,A,i,d),m.cause=a,m.name=a.name,p&&Object.assign(m,p),m};const ge=ut,Pr=o(937);function zo(a){return zo=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},zo(a)}function Mo(a){return P.isPlainObject(a)||P.isArray(a)}function pa(a){return P.endsWith(a,"[]")?a.slice(0,-2):a}function ua(a,s,A){return a?a.concat(s).map(function(i,d){return i=pa(i),!A&&d?"["+i+"]":i}).join(A?".":""):s}var Hc=P.toFlatObject(P,{},null,function(a){return/^is[A-Z]/.test(a)});const jr=function(a,s,A){if(!P.isObject(a))throw new TypeError("target must be an object");s=s||new(Pr||FormData);var i,d=(A=P.toFlatObject(A,{metaTokens:!0,dots:!1,indexes:!1},!1,function(X,$){return!P.isUndefined($[X])})).metaTokens,p=A.visitor||T,m=A.dots,v=A.indexes,E=(A.Blob||typeof Blob<"u"&&Blob)&&(i=s)&&P.isFunction(i.append)&&i[Symbol.toStringTag]==="FormData"&&i[Symbol.iterator];if(!P.isFunction(p))throw new TypeError("visitor must be a function");function L(X){if(X===null)return"";if(P.isDate(X))return X.toISOString();if(!E&&P.isBlob(X))throw new ge("Blob is not supported. Use a Buffer instead.");return P.isArrayBuffer(X)||P.isTypedArray(X)?E&&typeof Blob=="function"?new Blob([X]):Buffer.from(X):X}function T(X,$,Q){var ne=X;if(X&&!Q&&zo(X)==="object"){if(P.endsWith($,"{}"))$=d?$:$.slice(0,-2),X=JSON.stringify(X);else if(P.isArray(X)&&function(pe){return P.isArray(pe)&&!pe.some(Mo)}(X)||P.isFileList(X)||P.endsWith($,"[]")&&(ne=P.toArray(X)))return $=pa($),ne.forEach(function(pe,$e){!P.isUndefined(pe)&&pe!==null&&s.append(v===!0?ua([$],$e,m):v===null?$:$+"[]",L(pe))}),!1}return!!Mo(X)||(s.append(ua(Q,$,m),L(X)),!1)}var U=[],V=Object.assign(Hc,{defaultVisitor:T,convertValue:L,isVisitable:Mo});if(!P.isObject(a))throw new TypeError("data must be an object");return function X($,Q){if(!P.isUndefined($)){if(U.indexOf($)!==-1)throw Error("Circular reference detected in "+Q.join("."));U.push($),P.forEach($,function(ne,pe){(!(P.isUndefined(ne)||ne===null)&&p.call(s,ne,P.isString(pe)?pe.trim():pe,Q,V))===!0&&X(ne,Q?Q.concat(pe):[pe])}),U.pop()}}(a),s};function fa(a){var s={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(a).replace(/[!'()~]|%20|%00/g,function(A){return s[A]})}function ha(a,s){this._pairs=[],a&&jr(a,this,s)}var Aa=ha.prototype;Aa.append=function(a,s){this._pairs.push([a,s])},Aa.toString=function(a){var s=a?function(A){return a.call(this,A,fa)}:fa;return this._pairs.map(function(A){return s(A[0])+"="+s(A[1])},"").join("&")};const ya=ha;function Wc(a){return encodeURIComponent(a).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function ma(a,s,A){if(!s)return a;var i,d=A&&A.encode||Wc,p=A&&A.serialize;if(i=p?p(s,A):P.isURLSearchParams(s)?s.toString():new ya(s,A).toString(d)){var m=a.indexOf("#");m!==-1&&(a=a.slice(0,m)),a+=(a.indexOf("?")===-1?"?":"&")+i}return a}function Nn(a){return Nn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},Nn(a)}function Uc(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(Nn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(Nn(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),Nn(d)==="symbol"?d:String(d)),i)}var d}var Yc=function(){function a(){(function(i,d){if(!(i instanceof d))throw new TypeError("Cannot call a class as a function")})(this,a),this.handlers=[]}var s,A;return s=a,A=[{key:"use",value:function(i,d,p){return this.handlers.push({fulfilled:i,rejected:d,synchronous:!!p&&p.synchronous,runWhen:p?p.runWhen:null}),this.handlers.length-1}},{key:"eject",value:function(i){this.handlers[i]&&(this.handlers[i]=null)}},{key:"clear",value:function(){this.handlers&&(this.handlers=[])}},{key:"forEach",value:function(i){P.forEach(this.handlers,function(d){d!==null&&i(d)})}}],A&&Uc(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const ba=Yc,ga={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Qc=typeof URLSearchParams<"u"?URLSearchParams:ya,Kc=FormData;var Do,Vc=(typeof navigator>"u"||(Do=navigator.product)!=="ReactNative"&&Do!=="NativeScript"&&Do!=="NS")&&typeof window<"u"&&typeof document<"u",$c=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function";const Ct={isBrowser:!0,classes:{URLSearchParams:Qc,FormData:Kc,Blob},isStandardBrowserEnv:Vc,isStandardBrowserWebWorkerEnv:$c,protocols:["http","https","file","blob","url","data"]},va=function(a){function s(i,d,p,m){var v=i[m++],E=Number.isFinite(+v),L=m>=i.length;return v=!v&&P.isArray(p)?p.length:v,L?(P.hasOwnProp(p,v)?p[v]=[p[v],d]:p[v]=d,!E):(p[v]&&P.isObject(p[v])||(p[v]=[]),s(i,d,p[v],m)&&P.isArray(p[v])&&(p[v]=function(T){var U,V,X={},$=Object.keys(T),Q=$.length;for(U=0;U<Q;U++)X[V=$[U]]=T[V];return X}(p[v])),!E)}if(P.isFormData(a)&&P.isFunction(a.entries)){var A={};return P.forEachEntry(a,function(i,d){s(function(p){return P.matchAll(/\w+|\[(\w*)]/g,p).map(function(m){return m[0]==="[]"?"":m[1]||m[0]})}(i),d,A,0)}),A}return null};var Jc={"Content-Type":void 0},zr={transitional:ga,adapter:["xhr","http"],transformRequest:[function(a,s){var A,i=s.getContentType()||"",d=i.indexOf("application/json")>-1,p=P.isObject(a);if(p&&P.isHTMLForm(a)&&(a=new FormData(a)),P.isFormData(a))return d&&d?JSON.stringify(va(a)):a;if(P.isArrayBuffer(a)||P.isBuffer(a)||P.isStream(a)||P.isFile(a)||P.isBlob(a))return a;if(P.isArrayBufferView(a))return a.buffer;if(P.isURLSearchParams(a))return s.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),a.toString();if(p){if(i.indexOf("application/x-www-form-urlencoded")>-1)return function(v,E){return jr(v,new Ct.classes.URLSearchParams,Object.assign({visitor:function(L,T,U,V){return Ct.isNode&&P.isBuffer(L)?(this.append(T,L.toString("base64")),!1):V.defaultVisitor.apply(this,arguments)}},E))}(a,this.formSerializer).toString();if((A=P.isFileList(a))||i.indexOf("multipart/form-data")>-1){var m=this.env&&this.env.FormData;return jr(A?{"files[]":a}:a,m&&new m,this.formSerializer)}}return p||d?(s.setContentType("application/json",!1),function(v,E,L){if(P.isString(v))try{return(0,JSON.parse)(v),P.trim(v)}catch(T){if(T.name!=="SyntaxError")throw T}return(0,JSON.stringify)(v)}(a)):a}],transformResponse:[function(a){var s=this.transitional||zr.transitional,A=s&&s.forcedJSONParsing,i=this.responseType==="json";if(a&&P.isString(a)&&(A&&!this.responseType||i)){var d=!(s&&s.silentJSONParsing)&&i;try{return JSON.parse(a)}catch(p){if(d)throw p.name==="SyntaxError"?ge.from(p,ge.ERR_BAD_RESPONSE,this,null,this.response):p}}return a}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Ct.classes.FormData,Blob:Ct.classes.Blob},validateStatus:function(a){return a>=200&&a<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};P.forEach(["delete","get","head"],function(a){zr.headers[a]={}}),P.forEach(["post","put","patch"],function(a){zr.headers[a]=P.merge(Jc)});const Fo=zr;var Zc=P.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]);function qn(a){return qn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},qn(a)}function Ea(a,s){(s==null||s>a.length)&&(s=a.length);for(var A=0,i=new Array(s);A<s;A++)i[A]=a[A];return i}function xa(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(qn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(qn(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),qn(d)==="symbol"?d:String(d)),i)}var d}var ka=Symbol("internals");function Hn(a){return a&&String(a).trim().toLowerCase()}function Mr(a){return a===!1||a==null?a:P.isArray(a)?a.map(Mr):String(a)}function wa(a,s,A,i){return P.isFunction(i)?i.call(this,s,A):P.isString(s)?P.isString(i)?s.indexOf(i)!==-1:P.isRegExp(i)?i.test(s):void 0:void 0}var Dr=function(a,s){function A(m){(function(v,E){if(!(v instanceof E))throw new TypeError("Cannot call a class as a function")})(this,A),m&&this.set(m)}var i,d,p;return i=A,d=[{key:"set",value:function(m,v,E){var L=this;function T(pe,$e,Ye){var Re=Hn($e);if(!Re)throw new Error("header name must be a non-empty string");var Ht=P.findKey(L,Re);(!Ht||L[Ht]===void 0||Ye===!0||Ye===void 0&&L[Ht]!==!1)&&(L[Ht||$e]=Mr(pe))}var U,V,X,$,Q,ne=function(pe,$e){return P.forEach(pe,function(Ye,Re){return T(Ye,Re,$e)})};return P.isPlainObject(m)||m instanceof this.constructor?ne(m,v):P.isString(m)&&(m=m.trim())&&!/^[-_a-zA-Z]+$/.test(m.trim())?ne((Q={},(U=m)&&U.split(`
`).forEach(function(pe){$=pe.indexOf(":"),V=pe.substring(0,$).trim().toLowerCase(),X=pe.substring($+1).trim(),!V||Q[V]&&Zc[V]||(V==="set-cookie"?Q[V]?Q[V].push(X):Q[V]=[X]:Q[V]=Q[V]?Q[V]+", "+X:X)}),Q),v):m!=null&&T(v,m,E),this}},{key:"get",value:function(m,v){if(m=Hn(m)){var E=P.findKey(this,m);if(E){var L=this[E];if(!v)return L;if(v===!0)return function(T){for(var U,V=Object.create(null),X=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;U=X.exec(T);)V[U[1]]=U[2];return V}(L);if(P.isFunction(v))return v.call(this,L,E);if(P.isRegExp(v))return v.exec(L);throw new TypeError("parser must be boolean|regexp|function")}}}},{key:"has",value:function(m,v){if(m=Hn(m)){var E=P.findKey(this,m);return!(!E||v&&!wa(0,this[E],E,v))}return!1}},{key:"delete",value:function(m,v){var E=this,L=!1;function T(U){if(U=Hn(U)){var V=P.findKey(E,U);!V||v&&!wa(0,E[V],V,v)||(delete E[V],L=!0)}}return P.isArray(m)?m.forEach(T):T(m),L}},{key:"clear",value:function(){return Object.keys(this).forEach(this.delete.bind(this))}},{key:"normalize",value:function(m){var v=this,E={};return P.forEach(this,function(L,T){var U=P.findKey(E,T);if(U)return v[U]=Mr(L),void delete v[T];var V=m?function(X){return X.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,function($,Q,ne){return Q.toUpperCase()+ne})}(T):String(T).trim();V!==T&&delete v[T],v[V]=Mr(L),E[V]=!0}),this}},{key:"concat",value:function(){for(var m,v=arguments.length,E=new Array(v),L=0;L<v;L++)E[L]=arguments[L];return(m=this.constructor).concat.apply(m,[this].concat(E))}},{key:"toJSON",value:function(m){var v=Object.create(null);return P.forEach(this,function(E,L){E!=null&&E!==!1&&(v[L]=m&&P.isArray(E)?E.join(", "):E)}),v}},{key:Symbol.iterator,value:function(){return Object.entries(this.toJSON())[Symbol.iterator]()}},{key:"toString",value:function(){return Object.entries(this.toJSON()).map(function(m){var v,E,L=(E=2,function(T){if(Array.isArray(T))return T}(v=m)||function(T,U){var V=T==null?null:typeof Symbol<"u"&&T[Symbol.iterator]||T["@@iterator"];if(V!=null){var X,$,Q,ne,pe=[],$e=!0,Ye=!1;try{if(Q=(V=V.call(T)).next,U===0){if(Object(V)!==V)return;$e=!1}else for(;!($e=(X=Q.call(V)).done)&&(pe.push(X.value),pe.length!==U);$e=!0);}catch(Re){Ye=!0,$=Re}finally{try{if(!$e&&V.return!=null&&(ne=V.return(),Object(ne)!==ne))return}finally{if(Ye)throw $}}return pe}}(v,E)||function(T,U){if(T){if(typeof T=="string")return Ea(T,U);var V=Object.prototype.toString.call(T).slice(8,-1);return V==="Object"&&T.constructor&&(V=T.constructor.name),V==="Map"||V==="Set"?Array.from(T):V==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(V)?Ea(T,U):void 0}}(v,E)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}());return L[0]+": "+L[1]}).join(`
`)}},{key:Symbol.toStringTag,get:function(){return"AxiosHeaders"}}],p=[{key:"from",value:function(m){return m instanceof this?m:new this(m)}},{key:"concat",value:function(m){for(var v=new this(m),E=arguments.length,L=new Array(E>1?E-1:0),T=1;T<E;T++)L[T-1]=arguments[T];return L.forEach(function(U){return v.set(U)}),v}},{key:"accessor",value:function(m){var v=(this[ka]=this[ka]={accessors:{}}).accessors,E=this.prototype;function L(T){var U=Hn(T);v[U]||(function(V,X){var $=P.toCamelCase(" "+X);["get","set","has"].forEach(function(Q){Object.defineProperty(V,Q+$,{value:function(ne,pe,$e){return this[Q].call(this,X,ne,pe,$e)},configurable:!0})})}(E,T),v[U]=!0)}return P.isArray(m)?m.forEach(L):L(m),this}}],d&&xa(i.prototype,d),p&&xa(i,p),Object.defineProperty(i,"prototype",{writable:!1}),A}();Dr.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent"]),P.freezeMethods(Dr.prototype),P.freezeMethods(Dr);const Rt=Dr;function No(a,s){var A=this||Fo,i=s||A,d=Rt.from(i.headers),p=i.data;return P.forEach(a,function(m){p=m.call(A,p,d.normalize(),s?s.status:void 0)}),d.normalize(),p}function Ca(a){return!(!a||!a.__CANCEL__)}function Ba(a,s,A){ge.call(this,a??"canceled",ge.ERR_CANCELED,s,A),this.name="CanceledError"}P.inherits(Ba,ge,{__CANCEL__:!0});const Fr=Ba,Xc=Ct.isStandardBrowserEnv?{write:function(a,s,A,i,d,p){var m=[];m.push(a+"="+encodeURIComponent(s)),P.isNumber(A)&&m.push("expires="+new Date(A).toGMTString()),P.isString(i)&&m.push("path="+i),P.isString(d)&&m.push("domain="+d),p===!0&&m.push("secure"),document.cookie=m.join("; ")},read:function(a){var s=document.cookie.match(new RegExp("(^|;\\s*)("+a+")=([^;]*)"));return s?decodeURIComponent(s[3]):null},remove:function(a){this.write(a,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};function Sa(a,s){return a&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(s)?function(A,i){return i?A.replace(/\/+$/,"")+"/"+i.replace(/^\/+/,""):A}(a,s):s}const Gc=Ct.isStandardBrowserEnv?function(){var a,s=/(msie|trident)/i.test(navigator.userAgent),A=document.createElement("a");function i(d){var p=d;return s&&(A.setAttribute("href",p),p=A.href),A.setAttribute("href",p),{href:A.href,protocol:A.protocol?A.protocol.replace(/:$/,""):"",host:A.host,search:A.search?A.search.replace(/^\?/,""):"",hash:A.hash?A.hash.replace(/^#/,""):"",hostname:A.hostname,port:A.port,pathname:A.pathname.charAt(0)==="/"?A.pathname:"/"+A.pathname}}return a=i(window.location.href),function(d){var p=P.isString(d)?i(d):d;return p.protocol===a.protocol&&p.host===a.host}}():function(){return!0};function La(a,s){var A=0,i=function(d,p){d=d||10;var m,v=new Array(d),E=new Array(d),L=0,T=0;return p=p!==void 0?p:1e3,function(U){var V=Date.now(),X=E[T];m||(m=V),v[L]=U,E[L]=V;for(var $=T,Q=0;$!==L;)Q+=v[$++],$%=d;if((L=(L+1)%d)===T&&(T=(T+1)%d),!(V-m<p)){var ne=X&&V-X;return ne?Math.round(1e3*Q/ne):void 0}}}(50,250);return function(d){var p=d.loaded,m=d.lengthComputable?d.total:void 0,v=p-A,E=i(v);A=p;var L={loaded:p,total:m,progress:m?p/m:void 0,bytes:v,rate:E||void 0,estimated:E&&m&&p<=m?(m-p)/E:void 0,event:d};L[s?"download":"upload"]=!0,a(L)}}var qo={http:null,xhr:typeof XMLHttpRequest<"u"&&function(a){return new Promise(function(s,A){var i,d=a.data,p=Rt.from(a.headers).normalize(),m=a.responseType;function v(){a.cancelToken&&a.cancelToken.unsubscribe(i),a.signal&&a.signal.removeEventListener("abort",i)}P.isFormData(d)&&(Ct.isStandardBrowserEnv||Ct.isStandardBrowserWebWorkerEnv)&&p.setContentType(!1);var E=new XMLHttpRequest;if(a.auth){var L=a.auth.username||"",T=a.auth.password?unescape(encodeURIComponent(a.auth.password)):"";p.set("Authorization","Basic "+btoa(L+":"+T))}var U=Sa(a.baseURL,a.url);function V(){if(E){var ne=Rt.from("getAllResponseHeaders"in E&&E.getAllResponseHeaders());(function(pe,$e,Ye){var Re=Ye.config.validateStatus;Ye.status&&Re&&!Re(Ye.status)?$e(new ge("Request failed with status code "+Ye.status,[ge.ERR_BAD_REQUEST,ge.ERR_BAD_RESPONSE][Math.floor(Ye.status/100)-4],Ye.config,Ye.request,Ye)):pe(Ye)})(function(pe){s(pe),v()},function(pe){A(pe),v()},{data:m&&m!=="text"&&m!=="json"?E.response:E.responseText,status:E.status,statusText:E.statusText,headers:ne,config:a,request:E}),E=null}}if(E.open(a.method.toUpperCase(),ma(U,a.params,a.paramsSerializer),!0),E.timeout=a.timeout,"onloadend"in E?E.onloadend=V:E.onreadystatechange=function(){E&&E.readyState===4&&(E.status!==0||E.responseURL&&E.responseURL.indexOf("file:")===0)&&setTimeout(V)},E.onabort=function(){E&&(A(new ge("Request aborted",ge.ECONNABORTED,a,E)),E=null)},E.onerror=function(){A(new ge("Network Error",ge.ERR_NETWORK,a,E)),E=null},E.ontimeout=function(){var ne=a.timeout?"timeout of "+a.timeout+"ms exceeded":"timeout exceeded",pe=a.transitional||ga;a.timeoutErrorMessage&&(ne=a.timeoutErrorMessage),A(new ge(ne,pe.clarifyTimeoutError?ge.ETIMEDOUT:ge.ECONNABORTED,a,E)),E=null},Ct.isStandardBrowserEnv){var X=(a.withCredentials||Gc(U))&&a.xsrfCookieName&&Xc.read(a.xsrfCookieName);X&&p.set(a.xsrfHeaderName,X)}d===void 0&&p.setContentType(null),"setRequestHeader"in E&&P.forEach(p.toJSON(),function(ne,pe){E.setRequestHeader(pe,ne)}),P.isUndefined(a.withCredentials)||(E.withCredentials=!!a.withCredentials),m&&m!=="json"&&(E.responseType=a.responseType),typeof a.onDownloadProgress=="function"&&E.addEventListener("progress",La(a.onDownloadProgress,!0)),typeof a.onUploadProgress=="function"&&E.upload&&E.upload.addEventListener("progress",La(a.onUploadProgress)),(a.cancelToken||a.signal)&&(i=function(ne){E&&(A(!ne||ne.type?new Fr(null,a,E):ne),E.abort(),E=null)},a.cancelToken&&a.cancelToken.subscribe(i),a.signal&&(a.signal.aborted?i():a.signal.addEventListener("abort",i)));var $,Q=($=/^([-+\w]{1,25})(:?\/\/|:)/.exec(U))&&$[1]||"";Q&&Ct.protocols.indexOf(Q)===-1?A(new ge("Unsupported protocol "+Q+":",ge.ERR_BAD_REQUEST,a)):E.send(d||null)})}};P.forEach(qo,function(a,s){if(a){try{Object.defineProperty(a,"name",{value:s})}catch{}Object.defineProperty(a,"adapterName",{value:s})}});function Ho(a){if(a.cancelToken&&a.cancelToken.throwIfRequested(),a.signal&&a.signal.aborted)throw new Fr(null,a)}function Ia(a){return Ho(a),a.headers=Rt.from(a.headers),a.data=No.call(a,a.transformRequest),["post","put","patch"].indexOf(a.method)!==-1&&a.headers.setContentType("application/x-www-form-urlencoded",!1),function(s){for(var A,i,d=(s=P.isArray(s)?s:[s]).length,p=0;p<d&&(A=s[p],!(i=P.isString(A)?qo[A.toLowerCase()]:A));p++);if(!i)throw i===!1?new ge("Adapter ".concat(A," is not supported by the environment"),"ERR_NOT_SUPPORT"):new Error(P.hasOwnProp(qo,A)?"Adapter '".concat(A,"' is not available in the build"):"Unknown adapter '".concat(A,"'"));if(!P.isFunction(i))throw new TypeError("adapter is not a function");return i}(a.adapter||Fo.adapter)(a).then(function(s){return Ho(a),s.data=No.call(a,a.transformResponse,s),s.headers=Rt.from(s.headers),s},function(s){return Ca(s)||(Ho(a),s&&s.response&&(s.response.data=No.call(a,a.transformResponse,s.response),s.response.headers=Rt.from(s.response.headers))),Promise.reject(s)})}var _a=function(a){return a instanceof Rt?a.toJSON():a};function gn(a,s){s=s||{};var A={};function i(L,T,U){return P.isPlainObject(L)&&P.isPlainObject(T)?P.merge.call({caseless:U},L,T):P.isPlainObject(T)?P.merge({},T):P.isArray(T)?T.slice():T}function d(L,T,U){return P.isUndefined(T)?P.isUndefined(L)?void 0:i(void 0,L,U):i(L,T,U)}function p(L,T){if(!P.isUndefined(T))return i(void 0,T)}function m(L,T){return P.isUndefined(T)?P.isUndefined(L)?void 0:i(void 0,L):i(void 0,T)}function v(L,T,U){return U in s?i(L,T):U in a?i(void 0,L):void 0}var E={url:p,method:p,data:p,baseURL:m,transformRequest:m,transformResponse:m,paramsSerializer:m,timeout:m,timeoutMessage:m,withCredentials:m,adapter:m,responseType:m,xsrfCookieName:m,xsrfHeaderName:m,onUploadProgress:m,onDownloadProgress:m,decompress:m,maxContentLength:m,maxBodyLength:m,beforeRedirect:m,transport:m,httpAgent:m,httpsAgent:m,cancelToken:m,socketPath:m,responseEncoding:m,validateStatus:v,headers:function(L,T){return d(_a(L),_a(T),!0)}};return P.forEach(Object.keys(a).concat(Object.keys(s)),function(L){var T=E[L]||d,U=T(a[L],s[L],L);P.isUndefined(U)&&T!==v||(A[L]=U)}),A}function Nr(a){return Nr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},Nr(a)}var Wo={};["object","boolean","number","function","string","symbol"].forEach(function(a,s){Wo[a]=function(A){return Nr(A)===a||"a"+(s<1?"n ":" ")+a}});var Ta={};Wo.transitional=function(a,s,A){function i(d,p){return"[Axios v1.2.3] Transitional option '"+d+"'"+p+(A?". "+A:"")}return function(d,p,m){if(a===!1)throw new ge(i(p," has been removed"+(s?" in "+s:"")),ge.ERR_DEPRECATED);return s&&!Ta[p]&&(Ta[p]=!0,console.warn(i(p," has been deprecated since v"+s+" and will be removed in the near future"))),!a||a(d,p,m)}};const Uo={assertOptions:function(a,s,A){if(Nr(a)!=="object")throw new ge("options must be an object",ge.ERR_BAD_OPTION_VALUE);for(var i=Object.keys(a),d=i.length;d-- >0;){var p=i[d],m=s[p];if(m){var v=a[p],E=v===void 0||m(v,p,a);if(E!==!0)throw new ge("option "+p+" must be "+E,ge.ERR_BAD_OPTION_VALUE)}else if(A!==!0)throw new ge("Unknown option "+p,ge.ERR_BAD_OPTION)}},validators:Wo};function Wn(a){return Wn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},Wn(a)}function ed(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(Wn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(Wn(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),Wn(d)==="symbol"?d:String(d)),i)}var d}var Nt=Uo.validators,qr=function(){function a(i){(function(d,p){if(!(d instanceof p))throw new TypeError("Cannot call a class as a function")})(this,a),this.defaults=i,this.interceptors={request:new ba,response:new ba}}var s,A;return s=a,(A=[{key:"request",value:function(i,d){typeof i=="string"?(d=d||{}).url=i:d=i||{};var p,m=d=gn(this.defaults,d),v=m.transitional,E=m.paramsSerializer,L=m.headers;v!==void 0&&Uo.assertOptions(v,{silentJSONParsing:Nt.transitional(Nt.boolean),forcedJSONParsing:Nt.transitional(Nt.boolean),clarifyTimeoutError:Nt.transitional(Nt.boolean)},!1),E!==void 0&&Uo.assertOptions(E,{encode:Nt.function,serialize:Nt.function},!0),d.method=(d.method||this.defaults.method||"get").toLowerCase(),(p=L&&P.merge(L.common,L[d.method]))&&P.forEach(["delete","get","head","post","put","patch","common"],function(Re){delete L[Re]}),d.headers=Rt.concat(p,L);var T=[],U=!0;this.interceptors.request.forEach(function(Re){typeof Re.runWhen=="function"&&Re.runWhen(d)===!1||(U=U&&Re.synchronous,T.unshift(Re.fulfilled,Re.rejected))});var V,X=[];this.interceptors.response.forEach(function(Re){X.push(Re.fulfilled,Re.rejected)});var $,Q=0;if(!U){var ne=[Ia.bind(this),void 0];for(ne.unshift.apply(ne,T),ne.push.apply(ne,X),$=ne.length,V=Promise.resolve(d);Q<$;)V=V.then(ne[Q++],ne[Q++]);return V}$=T.length;var pe=d;for(Q=0;Q<$;){var $e=T[Q++],Ye=T[Q++];try{pe=$e(pe)}catch(Re){Ye.call(this,Re);break}}try{V=Ia.call(this,pe)}catch(Re){return Promise.reject(Re)}for(Q=0,$=X.length;Q<$;)V=V.then(X[Q++],X[Q++]);return V}},{key:"getUri",value:function(i){return ma(Sa((i=gn(this.defaults,i)).baseURL,i.url),i.params,i.paramsSerializer)}}])&&ed(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();P.forEach(["delete","get","head","options"],function(a){qr.prototype[a]=function(s,A){return this.request(gn(A||{},{method:a,url:s,data:(A||{}).data}))}}),P.forEach(["post","put","patch"],function(a){function s(A){return function(i,d,p){return this.request(gn(p||{},{method:a,headers:A?{"Content-Type":"multipart/form-data"}:{},url:i,data:d}))}}qr.prototype[a]=s(),qr.prototype[a+"Form"]=s(!0)});const Hr=qr;function Un(a){return Un=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},Un(a)}function Oa(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(Un(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(Un(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),Un(d)==="symbol"?d:String(d)),i)}var d}var td=function(){function a(d){if(function(v,E){if(!(v instanceof E))throw new TypeError("Cannot call a class as a function")}(this,a),typeof d!="function")throw new TypeError("executor must be a function.");var p;this.promise=new Promise(function(v){p=v});var m=this;this.promise.then(function(v){if(m._listeners){for(var E=m._listeners.length;E-- >0;)m._listeners[E](v);m._listeners=null}}),this.promise.then=function(v){var E,L=new Promise(function(T){m.subscribe(T),E=T}).then(v);return L.cancel=function(){m.unsubscribe(E)},L},d(function(v,E,L){m.reason||(m.reason=new Fr(v,E,L),p(m.reason))})}var s,A,i;return s=a,A=[{key:"throwIfRequested",value:function(){if(this.reason)throw this.reason}},{key:"subscribe",value:function(d){this.reason?d(this.reason):this._listeners?this._listeners.push(d):this._listeners=[d]}},{key:"unsubscribe",value:function(d){if(this._listeners){var p=this._listeners.indexOf(d);p!==-1&&this._listeners.splice(p,1)}}}],i=[{key:"source",value:function(){var d;return{token:new a(function(p){d=p}),cancel:d}}}],A&&Oa(s.prototype,A),i&&Oa(s,i),Object.defineProperty(s,"prototype",{writable:!1}),a}();const nd=td;function Ra(a,s){(s==null||s>a.length)&&(s=a.length);for(var A=0,i=new Array(s);A<s;A++)i[A]=a[A];return i}var Yo={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Yo).forEach(function(a){var s,A,i=(A=2,function(m){if(Array.isArray(m))return m}(s=a)||function(m,v){var E=m==null?null:typeof Symbol<"u"&&m[Symbol.iterator]||m["@@iterator"];if(E!=null){var L,T,U,V,X=[],$=!0,Q=!1;try{if(U=(E=E.call(m)).next,v===0){if(Object(E)!==E)return;$=!1}else for(;!($=(L=U.call(E)).done)&&(X.push(L.value),X.length!==v);$=!0);}catch(ne){Q=!0,T=ne}finally{try{if(!$&&E.return!=null&&(V=E.return(),Object(V)!==V))return}finally{if(Q)throw T}}return X}}(s,A)||function(m,v){if(m){if(typeof m=="string")return Ra(m,v);var E=Object.prototype.toString.call(m).slice(8,-1);return E==="Object"&&m.constructor&&(E=m.constructor.name),E==="Map"||E==="Set"?Array.from(m):E==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(E)?Ra(m,v):void 0}}(s,A)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()),d=i[0],p=i[1];Yo[p]=d});const rd=Yo;var Ve=function a(s){var A=new Hr(s),i=se(Hr.prototype.request,A);return P.extend(i,Hr.prototype,A,{allOwnKeys:!0}),P.extend(i,A,null,{allOwnKeys:!0}),i.create=function(d){return a(gn(s,d))},i}(Fo);Ve.Axios=Hr,Ve.CanceledError=Fr,Ve.CancelToken=nd,Ve.isCancel=Ca,Ve.VERSION="1.2.3",Ve.toFormData=jr,Ve.AxiosError=ge,Ve.Cancel=Ve.CanceledError,Ve.all=function(a){return Promise.all(a)},Ve.spread=function(a){return function(s){return a.apply(null,s)}},Ve.isAxiosError=function(a){return P.isObject(a)&&a.isAxiosError===!0},Ve.mergeConfig=gn,Ve.AxiosHeaders=Rt,Ve.formToJSON=function(a){return va(P.isHTMLForm(a)?new FormData(a):a)},Ve.HttpStatusCode=rd,Ve.default=Ve;const Pa=Ve,od={send:function(a){Pa.post(a.url,a.data).then(function(s){var A=s.data;A&&A.code===0?a.success&&a.success(A):a.error&&a.error(A&&A.msg)}).catch(function(s){console.error(s),a.error&&a.error()})},read:function(a){Pa.get(a.url).then(function(s){var A=s.data;A&&A.code===0?a.success&&a.success(A.data.map(function(i){return{time:i[0],type:i[1],color:i[2],author:i[3],text:i[4]}})):a.error&&a.error(A&&A.msg)}).catch(function(s){console.error(s),a.error&&a.error()})}};function Qo(a){return Qo=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},Qo(a)}function id(a){var s=this;this.lang=a,this.fallbackLang=this.lang.includes("-")?this.lang.split("-")[0]:this.lang,this.tran=function(A){return A=A.toLowerCase(),vn[s.lang]&&vn[s.lang][A]?vn[s.lang][A]:vn[s.fallbackLang]&&vn[s.fallbackLang][A]?vn[s.fallbackLang][A]:Ko[A]?Ko[A]:A}}var Ko={"danmaku-loading":"Danmaku is loading",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Input danmaku, hit Enter","about-author":"About author","dplayer-feedback":"DPlayer feedback","about-dplayer":"About DPlayer",loop:"Loop",speed:"Speed","opacity-danmaku":"Opacity for danmaku",normal:"Normal","please-input-danmaku":"Please input danmaku content!","set-danmaku-color":"Set danmaku color","set-danmaku-type":"Set danmaku type","show-danmaku":"Show danmaku","video-failed":"Video load failed","danmaku-failed":"Danmaku load failed","danmaku-send-failed":"Danmaku send failed","switching-quality":"Switching to %q quality","switched-quality":"Switched to %q quality",ff:"FF %s s",rew:"REW %s s","unlimited-danmaku":"Unlimited danmaku","send-danmaku":"Send danmaku",setting:"Setting",fullscreen:"Full screen","web-fullscreen":"Web full screen",send:"Send",screenshot:"Screenshot",airplay:"AirPlay",chromecast:"ChromeCast",subtitle:"Subtitle",off:"Off","show-subs":"Show subtitle","hide-subs":"Hide subtitle",volume:"Volume",live:"Live","video-info":"Video info"},vn={en:Ko,"zh-cn":{"danmaku-loading":"弹幕加载中",top:"顶部",bottom:"底部",rolling:"滚动","input-danmaku-enter":"输入弹幕，回车发送","about-author":"关于作者","dplayer-feedback":"播放器意见反馈","about-dplayer":"关于 DPlayer 播放器",loop:"洗脑循环",speed:"速度","opacity-danmaku":"弹幕透明度",normal:"正常","please-input-danmaku":"要输入弹幕内容啊喂！","set-danmaku-color":"设置弹幕颜色","set-danmaku-type":"设置弹幕类型","show-danmaku":"显示弹幕","video-failed":"视频加载失败","danmaku-failed":"弹幕加载失败","danmaku-send-failed":"弹幕发送失败","switching-quality":"正在切换至 %q 画质","switched-quality":"已经切换至 %q 画质",ff:"快进 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"海量弹幕","send-danmaku":"发送弹幕",setting:"设置",fullscreen:"全屏","web-fullscreen":"页面全屏",send:"发送",screenshot:"截图",airplay:"无线投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"关闭","show-subs":"显示字幕","hide-subs":"隐藏字幕",volume:"音量",live:"直播","video-info":"视频统计信息"},"zh-tw":{"danmaku-loading":"彈幕載入中",top:"頂部",bottom:"底部",rolling:"滾動","input-danmaku-enter":"輸入彈幕，Enter 發送","about-author":"關於作者","dplayer-feedback":"播放器意見回饋","about-dplayer":"關於 DPlayer 播放器",loop:"循環播放",speed:"速度","opacity-danmaku":"彈幕透明度",normal:"正常","please-input-danmaku":"請輸入彈幕內容啊！","set-danmaku-color":"設定彈幕顏色","set-danmaku-type":"設定彈幕類型","show-danmaku":"顯示彈幕","video-failed":"影片載入失敗","danmaku-failed":"彈幕載入失敗","danmaku-send-failed":"彈幕發送失敗","switching-quality":"正在切換至 %q 畫質","switched-quality":"已經切換至 %q 畫質",ff:"快進 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"巨量彈幕","send-danmaku":"發送彈幕",setting:"設定",fullscreen:"全螢幕","web-fullscreen":"頁面全螢幕",send:"發送",screenshot:"截圖",airplay:"無線投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"關閉","show-subs":"顯示字幕","hide-subs":"隱藏字幕",volume:"音量",live:"直播","video-info":"影片統計訊息"},"ko-kr":{"danmaku-loading":"Danmaku를 불러오는 중입니다.",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Danmaku를 입력하고 Enter를 누르세요.","about-author":"만든이","dplayer-feedback":"피드백 보내기","about-dplayer":"DPlayer 정보",loop:"반복",speed:"배속","opacity-danmaku":"Danmaku 불투명도",normal:"표준","please-input-danmaku":"Danmaku를 입력하세요!","set-danmaku-color":"Danmaku 색상","set-danmaku-type":"Danmaku 설정","show-danmaku":"Danmaku 표시","video-failed":"비디오를 불러오지 못했습니다.","danmaku-failed":"Danmaku를 불러오지 못했습니다.","danmaku-send-failed":"Danmaku 전송에 실패했습니다.","Switching to":"","Switched to":"","switching-quality":"전환 %q 화질","switched-quality":"전환 됨 %q 화질",ff:"앞으로 %s 초",rew:"뒤로 %s 초","unlimited-danmaku":"끝없는 Danmaku","send-danmaku":"Danmaku 보내기",setting:"설정",fullscreen:"전체 화면","web-fullscreen":"웹 내 전체화면",send:"보내기",screenshot:"화면 캡쳐",airplay:"에어플레이",chromecast:"ChromeCast",subtitle:"부제",off:"끄다","show-subs":"자막 보이기","hide-subs":"자막 숨기기",Volume:"볼륨",live:"생방송","video-info":"비디오 정보"},de:{"danmaku-loading":"Danmaku lädt...",top:"Oben",bottom:"Unten",rolling:"Rollend","input-danmaku-enter":"Drücke Enter nach dem Einfügen vom Danmaku","about-author":"Über den Autor","dplayer-feedback":"DPlayer Feedback","about-dplayer":"Über DPlayer",loop:"Wiederholen",speed:"Geschwindigkeit","opacity-danmaku":"Transparenz für Danmaku",normal:"Normal","please-input-danmaku":"Bitte Danmaku Inhalt eingeben!","set-danmaku-color":"Danmaku Farbe festlegen","set-danmaku-type":"Danmaku Typ festlegen","show-danmaku":"Zeige Danmaku","video-failed":"Das Video konnte nicht geladen werden","danmaku-failed":"Danmaku konnte nicht geladen werden","danmaku-send-failed":"Das senden von Danmaku ist fehgeschlagen","switching-quality":"Wechsle zur %q Qualität","switched-quality":"Zur %q Qualität gewechselt",ff:"%s s Vorwärts",rew:"%s s Zurück","unlimited-danmaku":"Unlimitiertes Danmaku","send-danmaku":"Sende Danmaku",setting:"Einstellungen",fullscreen:"Vollbild","web-fullscreen":"Browser Vollbild",send:"Senden",screenshot:"Screenshot",airplay:"AirPlay","show-subs":"Zeige Untertitel",chromecast:"ChromeCast",subtitle:"Untertitel",off:"Schließung","hide-subs":"Verstecke Untertitel",volume:"Lautstärke",live:"Live","video-info":"Video Info"}},ad=o(730),ld=o.n(ad),sd=o(74),cd=o.n(sd),dd=o(437),pd=o.n(dd),ud=o(644),fd=o.n(ud),hd=o(324),Ad=o.n(hd),yd=o(574),md=o.n(yd),bd=o(300),gd=o.n(bd),vd=o(934),Ed=o.n(vd),xd=o(428),kd=o.n(xd),wd=o(807),Cd=o.n(wd),Bd=o(338),Sd=o.n(Bd),Ld=o(254),Id=o.n(Ld),_d=o(965),Td=o.n(_d),Od=o(113),Rd=o.n(Od),Pd=o(251),jd=o.n(Pd),zd=o(410),Md=o.n(zd),Dd=o(182),Fd=o.n(Dd),Nd=o(193),qd=o.n(Nd);const bt={play:ld(),pause:cd(),volumeUp:pd(),volumeDown:fd(),volumeOff:Ad(),full:md(),fullWeb:gd(),setting:Ed(),right:kd(),comment:Cd(),commentOff:Sd(),send:Id(),pallette:Td(),camera:Rd(),subtitle:Md(),loading:Fd(),airplay:jd(),chromecast:qd()};var Hd=o(916),Wd=o.n(Hd);function Yn(a){return Yn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},Yn(a)}function ja(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(Yn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(Yn(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),Yn(d)==="symbol"?d:String(d)),i)}var d}var Ud=function(){function a(d){(function(p,m){if(!(p instanceof m))throw new TypeError("Cannot call a class as a function")})(this,a),this.container=d.container,this.options=d.options,this.index=d.index,this.tran=d.tran,this.init()}var s,A,i;return s=a,i=[{key:"NewNotice",value:function(d,p,m){var v=document.createElement("div");return v.classList.add("dplayer-notice"),v.style.opacity=p,v.innerText=d,m&&(v.id="dplayer-notice-".concat(m)),v}}],(A=[{key:"init",value:function(){this.container.innerHTML=Wd()({options:this.options,index:this.index,tran:this.tran,icons:bt,mobile:te.isMobile,video:{current:!0,pic:this.options.video.pic,screenshot:this.options.screenshot,airplay:!(!te.isSafari||te.isChrome)&&this.options.airplay,chromecast:this.options.chromecast,preload:this.options.preload,url:this.options.video.url,subtitle:this.options.subtitle}}),this.volumeBar=this.container.querySelector(".dplayer-volume-bar-inner"),this.volumeBarWrap=this.container.querySelector(".dplayer-volume-bar"),this.volumeBarWrapWrap=this.container.querySelector(".dplayer-volume-bar-wrap"),this.volumeButton=this.container.querySelector(".dplayer-volume"),this.volumeButtonIcon=this.container.querySelector(".dplayer-volume-icon"),this.volumeIcon=this.container.querySelector(".dplayer-volume-icon .dplayer-icon-content"),this.playedBar=this.container.querySelector(".dplayer-played"),this.loadedBar=this.container.querySelector(".dplayer-loaded"),this.playedBarWrap=this.container.querySelector(".dplayer-bar-wrap"),this.playedBarTime=this.container.querySelector(".dplayer-bar-time"),this.danmaku=this.container.querySelector(".dplayer-danmaku"),this.danmakuLoading=this.container.querySelector(".dplayer-danloading"),this.video=this.container.querySelector(".dplayer-video-current"),this.bezel=this.container.querySelector(".dplayer-bezel-icon"),this.playButton=this.container.querySelector(".dplayer-play-icon"),this.mobilePlayButton=this.container.querySelector(".dplayer-mobile-play"),this.videoWrap=this.container.querySelector(".dplayer-video-wrap"),this.controllerMask=this.container.querySelector(".dplayer-controller-mask"),this.ptime=this.container.querySelector(".dplayer-ptime"),this.settingButton=this.container.querySelector(".dplayer-setting-icon"),this.settingBox=this.container.querySelector(".dplayer-setting-box"),this.mask=this.container.querySelector(".dplayer-mask"),this.loop=this.container.querySelector(".dplayer-setting-loop"),this.loopToggle=this.container.querySelector(".dplayer-setting-loop .dplayer-toggle-setting-input"),this.showDanmaku=this.container.querySelector(".dplayer-setting-showdan"),this.showDanmakuToggle=this.container.querySelector(".dplayer-showdan-setting-input"),this.unlimitDanmaku=this.container.querySelector(".dplayer-setting-danunlimit"),this.unlimitDanmakuToggle=this.container.querySelector(".dplayer-danunlimit-setting-input"),this.speed=this.container.querySelector(".dplayer-setting-speed"),this.speedItem=this.container.querySelectorAll(".dplayer-setting-speed-item"),this.danmakuOpacityBar=this.container.querySelector(".dplayer-danmaku-bar-inner"),this.danmakuOpacityBarWrap=this.container.querySelector(".dplayer-danmaku-bar"),this.danmakuOpacityBarWrapWrap=this.container.querySelector(".dplayer-danmaku-bar-wrap"),this.danmakuOpacityBox=this.container.querySelector(".dplayer-setting-danmaku"),this.dtime=this.container.querySelector(".dplayer-dtime"),this.controller=this.container.querySelector(".dplayer-controller"),this.commentInput=this.container.querySelector(".dplayer-comment-input"),this.commentButton=this.container.querySelector(".dplayer-comment-icon"),this.commentSettingBox=this.container.querySelector(".dplayer-comment-setting-box"),this.commentSettingButton=this.container.querySelector(".dplayer-comment-setting-icon"),this.commentSettingFill=this.container.querySelector(".dplayer-comment-setting-icon path"),this.commentSendButton=this.container.querySelector(".dplayer-send-icon"),this.commentSendFill=this.container.querySelector(".dplayer-send-icon path"),this.commentColorSettingBox=this.container.querySelector(".dplayer-comment-setting-color"),this.browserFullButton=this.container.querySelector(".dplayer-full-icon"),this.webFullButton=this.container.querySelector(".dplayer-full-in-icon"),this.menu=this.container.querySelector(".dplayer-menu"),this.menuItem=this.container.querySelectorAll(".dplayer-menu-item"),this.qualityList=this.container.querySelector(".dplayer-quality-list"),this.camareButton=this.container.querySelector(".dplayer-camera-icon"),this.airplayButton=this.container.querySelector(".dplayer-airplay-icon"),this.chromecastButton=this.container.querySelector(".dplayer-chromecast-icon"),this.subtitleButton=this.container.querySelector(".dplayer-subtitle-icon"),this.subtitleButtonInner=this.container.querySelector(".dplayer-subtitle-icon .dplayer-icon-content"),this.subtitlesButton=this.container.querySelector(".dplayer-subtitles-icon"),this.subtitlesBox=this.container.querySelector(".dplayer-subtitles-box"),this.subtitlesItem=this.container.querySelectorAll(".dplayer-subtitles-item"),this.subtitle=this.container.querySelector(".dplayer-subtitle"),this.subtrack=this.container.querySelector(".dplayer-subtrack"),this.qualityButton=this.container.querySelector(".dplayer-quality-icon"),this.barPreview=this.container.querySelector(".dplayer-bar-preview"),this.barWrap=this.container.querySelector(".dplayer-bar-wrap"),this.noticeList=this.container.querySelector(".dplayer-notice-list"),this.infoPanel=this.container.querySelector(".dplayer-info-panel"),this.infoPanelClose=this.container.querySelector(".dplayer-info-panel-close"),this.infoVersion=this.container.querySelector(".dplayer-info-panel-item-version .dplayer-info-panel-item-data"),this.infoFPS=this.container.querySelector(".dplayer-info-panel-item-fps .dplayer-info-panel-item-data"),this.infoType=this.container.querySelector(".dplayer-info-panel-item-type .dplayer-info-panel-item-data"),this.infoUrl=this.container.querySelector(".dplayer-info-panel-item-url .dplayer-info-panel-item-data"),this.infoResolution=this.container.querySelector(".dplayer-info-panel-item-resolution .dplayer-info-panel-item-data"),this.infoDuration=this.container.querySelector(".dplayer-info-panel-item-duration .dplayer-info-panel-item-data"),this.infoDanmakuId=this.container.querySelector(".dplayer-info-panel-item-danmaku-id .dplayer-info-panel-item-data"),this.infoDanmakuApi=this.container.querySelector(".dplayer-info-panel-item-danmaku-api .dplayer-info-panel-item-data"),this.infoDanmakuAmount=this.container.querySelector(".dplayer-info-panel-item-danmaku-amount .dplayer-info-panel-item-data")}}])&&ja(s.prototype,A),i&&ja(s,i),Object.defineProperty(s,"prototype",{writable:!1}),a}();const za=Ud;function En(a){return En=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},En(a)}function Yd(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(En(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(En(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),En(d)==="symbol"?d:String(d)),i)}var d}var Qd=function(){function a(i){(function(d,p){if(!(d instanceof p))throw new TypeError("Cannot call a class as a function")})(this,a),this.options=i,this.player=this.options.player,this.container=this.options.container,this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.dan=[],this.showing=!0,this._opacity=this.options.opacity,this.events=this.options.events,this.unlimited=this.options.unlimited,this._measure(""),this.load()}var s,A;return s=a,A=[{key:"load",value:function(){var i,d=this;i=this.options.api.maximum?"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id,"&max=").concat(this.options.api.maximum):"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id);var p=(this.options.api.addition||[]).slice(0);p.push(i),this.events&&this.events.trigger("danmaku_load_start",p),this._readAllEndpoints(p,function(m){d.dan=[].concat.apply([],m).sort(function(v,E){return v.time-E.time}),window.requestAnimationFrame(function(){d.frame()}),d.options.callback(),d.events&&d.events.trigger("danmaku_load_end")})}},{key:"reload",value:function(i){this.options.api=i,this.dan=[],this.clear(),this.load()}},{key:"_readAllEndpoints",value:function(i,d){for(var p=this,m=[],v=0,E=function(T){p.options.apiBackend.read({url:i[T],success:function(U){m[T]=U,++v===i.length&&d(m)},error:function(U){p.options.error(U||p.options.tran("danmaku-failed")),m[T]=[],++v===i.length&&d(m)}})},L=0;L<i.length;++L)E(L)}},{key:"send",value:function(i,d){var p=this,m={token:this.options.api.token,id:this.options.api.id,author:this.options.api.user,time:this.options.time(),text:i.text,color:i.color,type:i.type};this.options.apiBackend.send({url:this.options.api.address+"v3/",data:m,success:d,error:function(E){p.options.error(E||p.options.tran("danmaku-failed"))}}),this.dan.splice(this.danIndex,0,m),this.danIndex++;var v={text:this.htmlEncode(m.text),color:m.color,type:m.type,border:"2px solid ".concat(this.options.borderColor)};this.draw(v),this.events&&this.events.trigger("danmaku_send",m)}},{key:"frame",value:function(){var i=this;if(this.dan.length&&!this.paused&&this.showing){for(var d=this.dan[this.danIndex],p=[];d&&this.options.time()>parseFloat(d.time);)p.push(d),d=this.dan[++this.danIndex];this.draw(p)}window.requestAnimationFrame(function(){i.frame()})}},{key:"opacity",value:function(i){if(i!==void 0){for(var d=this.container.getElementsByClassName("dplayer-danmaku-item"),p=0;p<d.length;p++)d[p].style.opacity=i;this._opacity=i,this.events&&this.events.trigger("danmaku_opacity",this._opacity)}return this._opacity}},{key:"draw",value:function(i){var d=this;if(this.showing){var p=this.options.height,m=this.container.offsetWidth,v=this.container.offsetHeight,E=parseInt(v/p),L=function(Q){var ne=Q.offsetWidth||parseInt(Q.style.width),pe=Q.getBoundingClientRect().right||d.container.getBoundingClientRect().right+ne;return d.container.getBoundingClientRect().right-pe},T=function(Q){return(m+Q)/5},U=function(Q,ne,pe){for(var $e=m/T(pe),Ye=function(on){var kn=d.danTunnel[ne][on+""];if(!kn||!kn.length)return d.danTunnel[ne][on+""]=[Q],Q.addEventListener("animationend",function(){d.danTunnel[ne][on+""].splice(0,1)}),{v:on%E};if(ne!=="right")return"continue";for(var sr=0;sr<kn.length;sr++){var Ha=L(kn[sr])-10;if(Ha<=m-$e*T(parseInt(kn[sr].style.width))||Ha<=0)break;if(sr===kn.length-1)return d.danTunnel[ne][on+""].push(Q),Q.addEventListener("animationend",function(){d.danTunnel[ne][on+""].splice(0,1)}),{v:on%E}}},Re=0;d.unlimited||Re<E;Re++){var Ht=Ye(Re);if(Ht!=="continue"&&En(Ht)==="object")return Ht.v}return-1};Object.prototype.toString.call(i)!=="[object Array]"&&(i=[i]);for(var V=document.createDocumentFragment(),X=function(){i[$].type=te.number2Type(i[$].type),i[$].color||(i[$].color=16777215);var Q=document.createElement("div");Q.classList.add("dplayer-danmaku-item"),Q.classList.add("dplayer-danmaku-".concat(i[$].type)),i[$].border?Q.innerHTML='<span style="border:'.concat(i[$].border,'">').concat(i[$].text,"</span>"):Q.innerHTML=i[$].text,Q.style.opacity=d._opacity,Q.style.color=te.number2Color(i[$].color),Q.addEventListener("animationend",function(){d.container.removeChild(Q)});var ne,pe=d._measure(i[$].text);switch(i[$].type){case"right":(ne=U(Q,i[$].type,pe))>=0&&(Q.style.width=pe+1+"px",Q.style.top=p*ne+"px",Q.style.transform="translateX(-".concat(m,"px)"));break;case"top":(ne=U(Q,i[$].type))>=0&&(Q.style.top=p*ne+"px");break;case"bottom":(ne=U(Q,i[$].type))>=0&&(Q.style.bottom=p*ne+"px");break;default:console.error("Can't handled danmaku type: ".concat(i[$].type))}ne>=0&&(Q.classList.add("dplayer-danmaku-move"),Q.style.animationDuration=d._danAnimation(i[$].type),V.appendChild(Q))},$=0;$<i.length;$++)X();return this.container.appendChild(V),V}}},{key:"play",value:function(){this.paused=!1}},{key:"pause",value:function(){this.paused=!0}},{key:"_measure",value:function(i){if(!this.context){var d=getComputedStyle(this.container.getElementsByClassName("dplayer-danmaku-item")[0],null);this.context=document.createElement("canvas").getContext("2d"),this.context.font=d.getPropertyValue("font")}return this.context.measureText(i).width}},{key:"seek",value:function(){this.clear();for(var i=0;i<this.dan.length;i++){if(this.dan[i].time>=this.options.time()){this.danIndex=i;break}this.danIndex=this.dan.length}}},{key:"clear",value:function(){this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.options.container.innerHTML="",this.events&&this.events.trigger("danmaku_clear")}},{key:"htmlEncode",value:function(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2f;")}},{key:"resize",value:function(){for(var i=this.container.offsetWidth,d=this.container.getElementsByClassName("dplayer-danmaku-item"),p=0;p<d.length;p++)d[p].style.transform="translateX(-".concat(i,"px)")}},{key:"hide",value:function(){this.showing=!1,this.pause(),this.clear(),this.events&&this.events.trigger("danmaku_hide")}},{key:"show",value:function(){this.seek(),this.showing=!0,this.play(),this.events&&this.events.trigger("danmaku_show")}},{key:"unlimit",value:function(i){this.unlimited=i}},{key:"speed",value:function(i){this.options.api.speedRate=i}},{key:"_danAnimation",value:function(i){var d=this.options.api.speedRate||1,p=!!this.player.fullScreen.isFullScreen();return{top:"".concat((p?6:4)/d,"s"),right:"".concat((p?8:5)/d,"s"),bottom:"".concat((p?6:4)/d,"s")}[i]}}],A&&Yd(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const Kd=Qd;function Qn(a){return Qn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},Qn(a)}function Vd(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(Qn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(Qn(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),Qn(d)==="symbol"?d:String(d)),i)}var d}const $d=function(){function a(){(function(i,d){if(!(i instanceof d))throw new TypeError("Cannot call a class as a function")})(this,a),this.events={},this.videoEvents=["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","mozaudioavailable","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],this.playerEvents=["screenshot","thumbnails_show","thumbnails_hide","danmaku_show","danmaku_hide","danmaku_clear","danmaku_loaded","danmaku_send","danmaku_opacity","contextmenu_show","contextmenu_hide","notice_show","notice_hide","quality_start","quality_end","destroy","resize","fullscreen","fullscreen_cancel","webfullscreen","webfullscreen_cancel","subtitle_show","subtitle_hide","subtitle_change"]}var s,A;return s=a,(A=[{key:"on",value:function(i,d){this.type(i)&&typeof d=="function"&&(this.events[i]||(this.events[i]=[]),this.events[i].push(d))}},{key:"trigger",value:function(i,d){if(this.events[i]&&this.events[i].length)for(var p=0;p<this.events[i].length;p++)this.events[i][p](d)}},{key:"type",value:function(i){return this.playerEvents.indexOf(i)!==-1?"player":this.videoEvents.indexOf(i)!==-1?"video":(console.error("Unknown event name: ".concat(i)),null)}}])&&Vd(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();function Kn(a){return Kn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},Kn(a)}function Jd(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(Kn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(Kn(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),Kn(d)==="symbol"?d:String(d)),i)}var d}var Zd=function(){function a(i){var d=this;(function(p,m){if(!(p instanceof m))throw new TypeError("Cannot call a class as a function")})(this,a),this.player=i,this.lastScrollPosition={left:0,top:0},this.player.events.on("webfullscreen",function(){d.player.resize()}),this.player.events.on("webfullscreen_cancel",function(){d.player.resize(),te.setScrollPosition(d.lastScrollPosition)}),this.fullscreenchange=function(){d.player.resize(),d.isFullScreen("browser")?d.player.events.trigger("fullscreen"):(te.setScrollPosition(d.lastScrollPosition),d.player.events.trigger("fullscreen_cancel"))},this.docfullscreenchange=function(){var p=document.fullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;p&&p!==d.player.container||(d.player.resize(),p?d.player.events.trigger("fullscreen"):(te.setScrollPosition(d.lastScrollPosition),d.player.events.trigger("fullscreen_cancel")))},/Firefox/.test(navigator.userAgent)?(document.addEventListener("mozfullscreenchange",this.docfullscreenchange),document.addEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.addEventListener("fullscreenchange",this.fullscreenchange),this.player.container.addEventListener("webkitfullscreenchange",this.fullscreenchange),document.addEventListener("msfullscreenchange",this.docfullscreenchange),document.addEventListener("MSFullscreenChange",this.docfullscreenchange))}var s,A;return s=a,A=[{key:"isFullScreen",value:function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(i){case"browser":return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;case"web":return this.player.container.classList.contains("dplayer-fulled")}}},{key:"request",value:function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser",d=i==="browser"?"web":"browser",p=this.isFullScreen(d);switch(p||(this.lastScrollPosition=te.getScrollPosition()),i){case"browser":this.player.container.requestFullscreen?this.player.container.requestFullscreen():this.player.container.mozRequestFullScreen?this.player.container.mozRequestFullScreen():this.player.container.webkitRequestFullscreen?this.player.container.webkitRequestFullscreen():this.player.video.webkitEnterFullscreen?this.player.video.webkitEnterFullscreen():this.player.video.webkitEnterFullScreen?this.player.video.webkitEnterFullScreen():this.player.container.msRequestFullscreen&&this.player.container.msRequestFullscreen();break;case"web":this.player.container.classList.add("dplayer-fulled"),document.body.classList.add("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen")}p&&this.cancel(d)}},{key:"cancel",value:function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(i){case"browser":document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.webkitCancelFullscreen?document.webkitCancelFullscreen():document.msCancelFullScreen?document.msCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen();break;case"web":this.player.container.classList.remove("dplayer-fulled"),document.body.classList.remove("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen_cancel")}}},{key:"toggle",value:function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";this.isFullScreen(i)?this.cancel(i):this.request(i)}},{key:"destroy",value:function(){/Firefox/.test(navigator.userAgent)?(document.removeEventListener("mozfullscreenchange",this.docfullscreenchange),document.removeEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.removeEventListener("fullscreenchange",this.fullscreenchange),this.player.container.removeEventListener("webkitfullscreenchange",this.fullscreenchange),document.removeEventListener("msfullscreenchange",this.docfullscreenchange),document.removeEventListener("MSFullscreenChange",this.docfullscreenchange))}}],A&&Jd(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const Xd=Zd;function Vn(a){return Vn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},Vn(a)}function Gd(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(Vn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(Vn(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),Vn(d)==="symbol"?d:String(d)),i)}var d}var ep=function(){function a(i){(function(d,p){if(!(d instanceof p))throw new TypeError("Cannot call a class as a function")})(this,a),this.storageName={opacity:"dplayer-danmaku-opacity",volume:"dplayer-volume",unlimited:"dplayer-danmaku-unlimited",danmaku:"dplayer-danmaku-show",subtitle:"dplayer-subtitle-show"},this.default={opacity:.7,volume:i.options.hasOwnProperty("volume")?i.options.volume:.7,unlimited:(i.options.danmaku&&i.options.danmaku.unlimited?1:0)||0,danmaku:1,subtitle:1},this.data={},this.init()}var s,A;return s=a,(A=[{key:"init",value:function(){for(var i in this.storageName){var d=this.storageName[i];this.data[i]=parseFloat(te.storage.get(d)||this.default[i])}}},{key:"get",value:function(i){return this.data[i]}},{key:"set",value:function(i,d){this.data[i]=d,te.storage.set(this.storageName[i],d)}}])&&Gd(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const tp=ep;function $n(a){return $n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},$n(a)}function np(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if($n(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if($n(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),$n(d)==="symbol"?d:String(d)),i)}var d}var rp=function(){function a(i,d,p,m){(function(v,E){if(!(v instanceof E))throw new TypeError("Cannot call a class as a function")})(this,a),this.container=i,this.video=d,this.options=p,this.events=m,this.init()}var s,A;return s=a,A=[{key:"init",value:function(){var i=this;if(this.container.style.fontSize=this.options.fontSize,this.container.style.bottom=this.options.bottom,this.container.style.color=this.options.color,this.video.textTracks&&this.video.textTracks[0]){var d=this.video.textTracks[0];d.oncuechange=function(){var p=d.activeCues[d.activeCues.length-1];if(i.container.innerHTML="",p){var m=document.createElement("div");m.appendChild(p.getCueAsHTML());var v=m.innerHTML.split(/\r?\n/).map(function(E){return"<p>".concat(E,"</p>")}).join("");i.container.innerHTML=v}i.events.trigger("subtitle_change")}}}},{key:"show",value:function(){this.container.classList.remove("dplayer-subtitle-hide"),this.events.trigger("subtitle_show")}},{key:"hide",value:function(){this.container.classList.add("dplayer-subtitle-hide"),this.events.trigger("subtitle_hide")}},{key:"toggle",value:function(){this.container.classList.contains("dplayer-subtitle-hide")?this.show():this.hide()}}],A&&np(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const op=rp;function Jn(a){return Jn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},Jn(a)}function ip(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(Jn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(Jn(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),Jn(d)==="symbol"?d:String(d)),i)}var d}var ap=function(){function a(i){var d=this;(function(E,L){if(!(E instanceof L))throw new TypeError("Cannot call a class as a function")})(this,a),this.player=i,this.player.template.mask.addEventListener("click",function(){d.hide()}),this.player.template.subtitlesButton.addEventListener("click",function(){d.adaptiveHeight(),d.show()});for(var p=this.player.template.subtitlesItem.length-1,m=function(E){d.player.template.subtitlesItem[E].addEventListener("click",function(){d.hide(),d.player.options.subtitle.index!==E&&(d.player.template.subtitle.innerHTML="<p></p>",d.player.template.subtrack.src=d.player.template.subtitlesItem[E].dataset.subtitle,d.player.options.subtitle.index=E,d.player.template.subtitle.classList.contains("dplayer-subtitle-hide")&&d.subContainerShow())})},v=0;v<p;v++)m(v);this.player.template.subtitlesItem[p].addEventListener("click",function(){d.hide(),d.player.options.subtitle.index!==p&&(d.player.template.subtitle.innerHTML="<p></p>",d.player.template.subtrack.src="",d.player.options.subtitle.index=p,d.subContainerHide())})}var s,A;return s=a,(A=[{key:"subContainerShow",value:function(){this.player.template.subtitle.classList.remove("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_show")}},{key:"subContainerHide",value:function(){this.player.template.subtitle.classList.add("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_hide")}},{key:"hide",value:function(){this.player.template.subtitlesBox.classList.remove("dplayer-subtitles-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.subtitlesBox.classList.add("dplayer-subtitles-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}},{key:"adaptiveHeight",value:function(){var i=30*this.player.template.subtitlesItem.length+14,d=.8*this.player.template.videoWrap.offsetHeight;i>=d-50?(this.player.template.subtitlesBox.style.bottom="8px",this.player.template.subtitlesBox.style["max-height"]=d-8+"px"):(this.player.template.subtitlesBox.style.bottom="50px",this.player.template.subtitlesBox.style["max-height"]=d-50+"px")}}])&&ip(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const lp=ap;function Zn(a){return Zn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},Zn(a)}function sp(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(Zn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(Zn(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),Zn(d)==="symbol"?d:String(d)),i)}var d}var cp=function(){function a(i){(function(d,p){if(!(d instanceof p))throw new TypeError("Cannot call a class as a function")})(this,a),this.elements={},this.elements.volume=i.volumeBar,this.elements.played=i.playedBar,this.elements.loaded=i.loadedBar,this.elements.danmaku=i.danmakuOpacityBar}var s,A;return s=a,(A=[{key:"set",value:function(i,d,p){d=Math.max(d,0),d=Math.min(d,1),this.elements[i].style[p]=100*d+"%"}},{key:"get",value:function(i){return parseFloat(this.elements[i].style.width)/100}}])&&sp(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const dp=cp;function Xn(a){return Xn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},Xn(a)}function pp(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(Xn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(Xn(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),Xn(d)==="symbol"?d:String(d)),i)}var d}var up=function(){function a(i){(function(d,p){if(!(d instanceof p))throw new TypeError("Cannot call a class as a function")})(this,a),this.player=i,window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(d){window.setTimeout(d,1e3/60)},this.types=["loading","info","fps"],this.init()}var s,A;return s=a,(A=[{key:"init",value:function(){var i=this;this.types.map(function(d){return d!=="fps"&&i["init".concat(d,"Checker")](),d})}},{key:"initloadingChecker",value:function(){var i=this,d=0,p=0,m=!1;this.loadingChecker=setInterval(function(){i.enableloadingChecker&&(p=i.player.video.currentTime,m||p!==d||i.player.video.paused||(i.player.container.classList.add("dplayer-loading"),m=!0),m&&p>d&&!i.player.video.paused&&(i.player.container.classList.remove("dplayer-loading"),m=!1),d=p)},100)}},{key:"initfpsChecker",value:function(){var i=this;window.requestAnimationFrame(function(){if(i.enablefpsChecker)if(i.initfpsChecker(),i.fpsStart){i.fpsIndex++;var d=new Date;d-i.fpsStart>1e3&&(i.player.infoPanel.fps(i.fpsIndex/(d-i.fpsStart)*1e3),i.fpsStart=new Date,i.fpsIndex=0)}else i.fpsStart=new Date,i.fpsIndex=0;else i.fpsStart=0,i.fpsIndex=0})}},{key:"initinfoChecker",value:function(){var i=this;this.infoChecker=setInterval(function(){i.enableinfoChecker&&i.player.infoPanel.update()},1e3)}},{key:"enable",value:function(i){this["enable".concat(i,"Checker")]=!0,i==="fps"&&this.initfpsChecker()}},{key:"disable",value:function(i){this["enable".concat(i,"Checker")]=!1}},{key:"destroy",value:function(){var i=this;this.types.map(function(d){return i["enable".concat(d,"Checker")]=!1,i["".concat(d,"Checker")]&&clearInterval(i["".concat(d,"Checker")]),d})}}])&&pp(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const fp=up;function Gn(a){return Gn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},Gn(a)}function hp(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(Gn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(Gn(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),Gn(d)==="symbol"?d:String(d)),i)}var d}const Ap=function(){function a(i){var d=this;(function(p,m){if(!(p instanceof m))throw new TypeError("Cannot call a class as a function")})(this,a),this.container=i,this.container.addEventListener("animationend",function(){d.container.classList.remove("dplayer-bezel-transition")})}var s,A;return s=a,(A=[{key:"switch",value:function(i){this.container.innerHTML=i,this.container.classList.add("dplayer-bezel-transition")}}])&&hp(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();function er(a){return er=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},er(a)}function yp(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(er(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(er(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),er(d)==="symbol"?d:String(d)),i)}var d}var mp=function(){function a(i){(function(d,p){if(!(d instanceof p))throw new TypeError("Cannot call a class as a function")})(this,a),this.container=i.container,this.barWidth=i.barWidth,this.container.style.backgroundImage="url('".concat(i.url,"')"),this.events=i.events}var s,A;return s=a,(A=[{key:"resize",value:function(i,d,p){this.container.style.width="".concat(i,"px"),this.container.style.height="".concat(d,"px"),this.container.style.top="".concat(2-d,"px"),this.barWidth=p}},{key:"show",value:function(){this.container.style.display="block",this.events&&this.events.trigger("thumbnails_show")}},{key:"move",value:function(i){this.container.style.backgroundPosition="-".concat(160*(Math.ceil(i/this.barWidth*100)-1),"px 0"),this.container.style.left="".concat(Math.min(Math.max(i-this.container.offsetWidth/2,-10),this.barWidth-150),"px")}},{key:"hide",value:function(){this.container.style.display="none",this.events&&this.events.trigger("thumbnails_hide")}}])&&yp(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const bp=mp;function tr(a){return tr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},tr(a)}function gp(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(tr(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(tr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),tr(d)==="symbol"?d:String(d)),i)}var d}var qt,Ma=!0,Vo=!1,vp=function(){function a(i){(function(d,p){if(!(d instanceof p))throw new TypeError("Cannot call a class as a function")})(this,a),this.player=i,this.autoHideTimer=0,te.isMobile||(this.setAutoHideHandler=this.setAutoHide.bind(this),this.player.container.addEventListener("mousemove",this.setAutoHideHandler),this.player.container.addEventListener("click",this.setAutoHideHandler),this.player.on("play",this.setAutoHideHandler),this.player.on("pause",this.setAutoHideHandler)),this.initPlayButton(),this.initThumbnails(),this.initPlayedBar(),this.initFullButton(),this.initQualityButton(),this.initScreenshotButton(),this.player.options.subtitle&&typeof this.player.options.subtitle.url=="string"&&this.initSubtitleButton(),this.initHighlights(),this.initAirplayButton(),this.initChromecastButton(),te.isMobile||this.initVolumeButton()}var s,A;return s=a,(A=[{key:"initPlayButton",value:function(){var i=this;this.player.template.playButton.addEventListener("click",function(){i.player.toggle()}),this.player.template.mobilePlayButton.addEventListener("click",function(){i.player.toggle()}),te.isMobile?(this.player.template.videoWrap.addEventListener("click",function(){i.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){i.toggle()})):this.player.options.preventClickToggle||(this.player.template.videoWrap.addEventListener("click",function(){i.player.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){i.player.toggle()}))}},{key:"initHighlights",value:function(){var i=this;this.player.on("durationchange",function(){if(i.player.video.duration!==1&&i.player.video.duration!==1/0&&i.player.options.highlight){var d=i.player.template.playedBarWrap.querySelectorAll(".dplayer-highlight");[].slice.call(d,0).forEach(function(v){i.player.template.playedBarWrap.removeChild(v)});for(var p=0;p<i.player.options.highlight.length;p++)if(i.player.options.highlight[p].text&&i.player.options.highlight[p].time){var m=document.createElement("div");m.classList.add("dplayer-highlight"),m.style.left=i.player.options.highlight[p].time/i.player.video.duration*100+"%",m.innerHTML='<span class="dplayer-highlight-text">'+i.player.options.highlight[p].text+"</span>",i.player.template.playedBarWrap.insertBefore(m,i.player.template.playedBarTime)}}})}},{key:"initThumbnails",value:function(){var i=this;this.player.options.video.thumbnails&&(this.thumbnails=new bp({container:this.player.template.barPreview,barWidth:this.player.template.barWrap.offsetWidth,url:this.player.options.video.thumbnails,events:this.player.events}),this.player.on("loadedmetadata",function(){i.thumbnails.resize(160,i.player.video.videoHeight/i.player.video.videoWidth*160,i.player.template.barWrap.offsetWidth)}))}},{key:"initPlayedBar",value:function(){var i=this,d=function(m){var v=((m.clientX||m.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(i.player.template.playedBarWrap))/i.player.template.playedBarWrap.clientWidth;v=Math.max(v,0),v=Math.min(v,1),i.player.bar.set("played",v,"width"),i.player.template.ptime.innerHTML=te.secondToTime(v*i.player.video.duration)},p=function m(v){document.removeEventListener(te.nameMap.dragEnd,m),document.removeEventListener(te.nameMap.dragMove,d);var E=((v.clientX||v.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(i.player.template.playedBarWrap))/i.player.template.playedBarWrap.clientWidth;E=Math.max(E,0),E=Math.min(E,1),i.player.bar.set("played",E,"width"),i.player.seek(i.player.bar.get("played")*i.player.video.duration),i.player.timer.enable("progress")};this.player.template.playedBarWrap.addEventListener(te.nameMap.dragStart,function(){i.player.timer.disable("progress"),document.addEventListener(te.nameMap.dragMove,d),document.addEventListener(te.nameMap.dragEnd,p)}),this.player.template.playedBarWrap.addEventListener(te.nameMap.dragMove,function(m){if(i.player.video.duration){var v=i.player.template.playedBarWrap.getBoundingClientRect().left,E=(m.clientX||m.changedTouches[0].clientX)-v;if(E<0||E>i.player.template.playedBarWrap.offsetWidth)return;var L=i.player.video.duration*(E/i.player.template.playedBarWrap.offsetWidth);te.isMobile&&i.thumbnails&&i.thumbnails.show(),i.thumbnails&&i.thumbnails.move(E),i.player.template.playedBarTime.style.left="".concat(E-(L>=3600?25:20),"px"),i.player.template.playedBarTime.innerText=te.secondToTime(L),i.player.template.playedBarTime.classList.remove("hidden")}}),this.player.template.playedBarWrap.addEventListener(te.nameMap.dragEnd,function(){te.isMobile&&i.thumbnails&&i.thumbnails.hide()}),te.isMobile||(this.player.template.playedBarWrap.addEventListener("mouseenter",function(){i.player.video.duration&&(i.thumbnails&&i.thumbnails.show(),i.player.template.playedBarTime.classList.remove("hidden"))}),this.player.template.playedBarWrap.addEventListener("mouseleave",function(){i.player.video.duration&&(i.thumbnails&&i.thumbnails.hide(),i.player.template.playedBarTime.classList.add("hidden"))}))}},{key:"initFullButton",value:function(){var i=this;this.player.template.browserFullButton.addEventListener("click",function(){i.player.fullScreen.toggle("browser")}),this.player.template.webFullButton.addEventListener("click",function(){i.player.fullScreen.toggle("web")})}},{key:"initVolumeButton",value:function(){var i=this,d=function(m){var v=m||window.event,E=((v.clientX||v.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(i.player.template.volumeBarWrap)-5.5)/35;i.player.volume(E)},p=function m(){document.removeEventListener(te.nameMap.dragEnd,m),document.removeEventListener(te.nameMap.dragMove,d),i.player.template.volumeButton.classList.remove("dplayer-volume-active")};this.player.template.volumeBarWrapWrap.addEventListener("click",function(m){var v=m||window.event,E=((v.clientX||v.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(i.player.template.volumeBarWrap)-5.5)/35;i.player.volume(E)}),this.player.template.volumeBarWrapWrap.addEventListener(te.nameMap.dragStart,function(){document.addEventListener(te.nameMap.dragMove,d),document.addEventListener(te.nameMap.dragEnd,p),i.player.template.volumeButton.classList.add("dplayer-volume-active")}),this.player.template.volumeButtonIcon.addEventListener("click",function(){i.player.video.muted?(i.player.video.muted=!1,i.player.switchVolumeIcon(),i.player.bar.set("volume",i.player.volume(),"width")):(i.player.video.muted=!0,i.player.template.volumeIcon.innerHTML=bt.volumeOff,i.player.bar.set("volume",0,"width"))})}},{key:"initQualityButton",value:function(){var i=this;this.player.options.video.quality&&this.player.template.qualityList.addEventListener("click",function(d){d.target.classList.contains("dplayer-quality-item")&&i.player.switchQuality(d.target.dataset.index)})}},{key:"initScreenshotButton",value:function(){var i=this;this.player.options.screenshot&&this.player.template.camareButton.addEventListener("click",function(){var d,p=document.createElement("canvas");p.width=i.player.video.videoWidth,p.height=i.player.video.videoHeight,p.getContext("2d").drawImage(i.player.video,0,0,p.width,p.height),p.toBlob(function(m){d=URL.createObjectURL(m);var v=document.createElement("a");v.href=d,v.download="DPlayer.png",v.style.display="none",document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(d),i.player.events.trigger("screenshot",d)})})}},{key:"initAirplayButton",value:function(){this.player.options.airplay&&(window.WebKitPlaybackTargetAvailabilityEvent?this.player.video.addEventListener("webkitplaybacktargetavailabilitychanged",function(i){i.availability==="available"?this.template.airplayButton.disable=!1:this.template.airplayButton.disable=!0,this.template.airplayButton.addEventListener("click",function(){this.video.webkitShowPlaybackTargetPicker()}.bind(this))}.bind(this.player)):this.player.template.airplayButton.style.display="none")}},{key:"initChromecast",value:function(){var i=window.document.createElement("script");i.setAttribute("type","text/javascript"),i.setAttribute("src","https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"),window.document.body.appendChild(i),window.__onGCastApiAvailable=function(d){if(d){var p=new(qt=window.chrome.cast).SessionRequest(qt.media.DEFAULT_MEDIA_RECEIVER_APP_ID),m=new qt.ApiConfig(p,function(){},function(v){v===qt.ReceiverAvailability.AVAILABLE&&console.log("chromecast: ",v)});qt.initialize(m,function(){})}}}},{key:"initChromecastButton",value:function(){var i=this;if(this.player.options.chromecast){Ma&&(Ma=!1,this.initChromecast());var d=function(m,v){i.currentMedia=v},p=function(m){console.error("Error launching media",m)};this.player.template.chromecastButton.addEventListener("click",function(){Vo?(Vo=!1,i.currentMedia.stop(),i.session.stop(),i.initChromecast()):(Vo=!0,qt.requestSession(function(m){var v,E,L;i.session=m,v=i.player.options.video.url,E=new qt.media.MediaInfo(v),L=new qt.media.LoadRequest(E),i.session?i.session.loadMedia(L,d.bind(i,"loadMedia"),p).play():window.open(v)},function(m){m.code==="cancel"?i.session=void 0:console.error("Error selecting a cast device",m)}))})}}},{key:"initSubtitleButton",value:function(){var i=this;this.player.events.on("subtitle_show",function(){i.player.template.subtitleButton.dataset.balloon=i.player.tran("hide-subs"),i.player.template.subtitleButtonInner.style.opacity="",i.player.user.set("subtitle",1)}),this.player.events.on("subtitle_hide",function(){i.player.template.subtitleButton.dataset.balloon=i.player.tran("show-subs"),i.player.template.subtitleButtonInner.style.opacity="0.4",i.player.user.set("subtitle",0)}),this.player.template.subtitleButton.addEventListener("click",function(){i.player.subtitle.toggle()})}},{key:"setAutoHide",value:function(){var i=this;this.show(),clearTimeout(this.autoHideTimer),this.autoHideTimer=setTimeout(function(){!i.player.video.played.length||i.player.paused||i.disableAutoHide||i.hide()},3e3)}},{key:"show",value:function(){this.player.container.classList.remove("dplayer-hide-controller")}},{key:"hide",value:function(){this.player.container.classList.add("dplayer-hide-controller"),this.player.setting.hide(),this.player.comment&&this.player.comment.hide()}},{key:"isShow",value:function(){return!this.player.container.classList.contains("dplayer-hide-controller")}},{key:"toggle",value:function(){this.isShow()?this.hide():this.show()}},{key:"destroy",value:function(){te.isMobile||(this.player.container.removeEventListener("mousemove",this.setAutoHideHandler),this.player.container.removeEventListener("click",this.setAutoHideHandler)),clearTimeout(this.autoHideTimer)}}])&&gp(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const Ep=vp;function nr(a){return nr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},nr(a)}function xp(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(nr(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(nr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),nr(d)==="symbol"?d:String(d)),i)}var d}var kp=function(){function a(i){var d=this;(function(L,T){if(!(L instanceof T))throw new TypeError("Cannot call a class as a function")})(this,a),this.player=i,this.player.template.mask.addEventListener("click",function(){d.hide()}),this.player.template.settingButton.addEventListener("click",function(){d.show()}),this.loop=this.player.options.loop,this.player.template.loopToggle.checked=this.loop,this.player.template.loop.addEventListener("click",function(){d.player.template.loopToggle.checked=!d.player.template.loopToggle.checked,d.player.template.loopToggle.checked?d.loop=!0:d.loop=!1,d.hide()}),this.showDanmaku=this.player.user.get("danmaku"),this.showDanmaku||this.player.danmaku&&this.player.danmaku.hide(),this.player.template.showDanmakuToggle.checked=this.showDanmaku,this.player.template.showDanmaku.addEventListener("click",function(){d.player.template.showDanmakuToggle.checked=!d.player.template.showDanmakuToggle.checked,d.player.template.showDanmakuToggle.checked?(d.showDanmaku=!0,d.player.danmaku.show()):(d.showDanmaku=!1,d.player.danmaku.hide()),d.player.user.set("danmaku",d.showDanmaku?1:0),d.hide()}),this.unlimitDanmaku=this.player.user.get("unlimited"),this.player.template.unlimitDanmakuToggle.checked=this.unlimitDanmaku,this.player.template.unlimitDanmaku.addEventListener("click",function(){d.player.template.unlimitDanmakuToggle.checked=!d.player.template.unlimitDanmakuToggle.checked,d.player.template.unlimitDanmakuToggle.checked?(d.unlimitDanmaku=!0,d.player.danmaku.unlimit(!0)):(d.unlimitDanmaku=!1,d.player.danmaku.unlimit(!1)),d.player.user.set("unlimited",d.unlimitDanmaku?1:0),d.hide()}),this.player.template.speed.addEventListener("click",function(){d.player.template.settingBox.classList.add("dplayer-setting-box-narrow"),d.player.template.settingBox.classList.add("dplayer-setting-box-speed")});for(var p=function(L){d.player.template.speedItem[L].addEventListener("click",function(){d.player.speed(d.player.template.speedItem[L].dataset.speed),d.hide()})},m=0;m<this.player.template.speedItem.length;m++)p(m);if(this.player.danmaku){this.player.on("danmaku_opacity",function(L){d.player.bar.set("danmaku",L,"width"),d.player.user.set("opacity",L)}),this.player.danmaku.opacity(this.player.user.get("opacity"));var v=function(L){var T=L||window.event,U=((T.clientX||T.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(d.player.template.danmakuOpacityBarWrap))/130;U=Math.max(U,0),U=Math.min(U,1),d.player.danmaku.opacity(U)},E=function L(){document.removeEventListener(te.nameMap.dragEnd,L),document.removeEventListener(te.nameMap.dragMove,v),d.player.template.danmakuOpacityBox.classList.remove("dplayer-setting-danmaku-active")};this.player.template.danmakuOpacityBarWrapWrap.addEventListener("click",function(L){var T=L||window.event,U=((T.clientX||T.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(d.player.template.danmakuOpacityBarWrap))/130;U=Math.max(U,0),U=Math.min(U,1),d.player.danmaku.opacity(U)}),this.player.template.danmakuOpacityBarWrapWrap.addEventListener(te.nameMap.dragStart,function(){document.addEventListener(te.nameMap.dragMove,v),document.addEventListener(te.nameMap.dragEnd,E),d.player.template.danmakuOpacityBox.classList.add("dplayer-setting-danmaku-active")})}}var s,A;return s=a,(A=[{key:"hide",value:function(){var i=this;this.player.template.settingBox.classList.remove("dplayer-setting-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),setTimeout(function(){i.player.template.settingBox.classList.remove("dplayer-setting-box-narrow"),i.player.template.settingBox.classList.remove("dplayer-setting-box-speed")},300),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.settingBox.classList.add("dplayer-setting-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}}])&&xp(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const wp=kp;function rr(a){return rr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},rr(a)}function Cp(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(rr(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(rr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),rr(d)==="symbol"?d:String(d)),i)}var d}var Bp=function(){function a(i){var d=this;(function(p,m){if(!(p instanceof m))throw new TypeError("Cannot call a class as a function")})(this,a),this.player=i,this.player.template.mask.addEventListener("click",function(){d.hide()}),this.player.template.commentButton.addEventListener("click",function(){d.show()}),this.player.template.commentSettingButton.addEventListener("click",function(){d.toggleSetting()}),this.player.template.commentColorSettingBox.addEventListener("click",function(){if(d.player.template.commentColorSettingBox.querySelector("input:checked+span")){var p=d.player.template.commentColorSettingBox.querySelector("input:checked").value;d.player.template.commentSettingFill.style.fill=p,d.player.template.commentInput.style.color=p,d.player.template.commentSendFill.style.fill=p}}),this.player.template.commentInput.addEventListener("click",function(){d.hideSetting()}),this.player.template.commentInput.addEventListener("keydown",function(p){(p||window.event).keyCode===13&&d.send()}),this.player.template.commentSendButton.addEventListener("click",function(){d.send()})}var s,A;return s=a,(A=[{key:"show",value:function(){this.player.controller.disableAutoHide=!0,this.player.template.controller.classList.add("dplayer-controller-comment"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.container.classList.add("dplayer-show-controller"),this.player.template.commentInput.focus()}},{key:"hide",value:function(){this.player.template.controller.classList.remove("dplayer-controller-comment"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.container.classList.remove("dplayer-show-controller"),this.player.controller.disableAutoHide=!1,this.hideSetting()}},{key:"showSetting",value:function(){this.player.template.commentSettingBox.classList.add("dplayer-comment-setting-open")}},{key:"hideSetting",value:function(){this.player.template.commentSettingBox.classList.remove("dplayer-comment-setting-open")}},{key:"toggleSetting",value:function(){this.player.template.commentSettingBox.classList.contains("dplayer-comment-setting-open")?this.hideSetting():this.showSetting()}},{key:"send",value:function(){var i=this;this.player.template.commentInput.blur(),this.player.template.commentInput.value.replace(/^\s+|\s+$/g,"")?this.player.danmaku.send({text:this.player.template.commentInput.value,color:te.color2Number(this.player.container.querySelector(".dplayer-comment-setting-color input:checked").value),type:parseInt(this.player.container.querySelector(".dplayer-comment-setting-type input:checked").value)},function(){i.player.template.commentInput.value="",i.hide()}):this.player.notice(this.player.tran("please-input-danmaku"))}}])&&Cp(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const Sp=Bp;function or(a){return or=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},or(a)}function Lp(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(or(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(or(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),or(d)==="symbol"?d:String(d)),i)}var d}var Ip=function(){function a(i){(function(d,p){if(!(d instanceof p))throw new TypeError("Cannot call a class as a function")})(this,a),this.player=i,this.doHotKeyHandler=this.doHotKey.bind(this),this.cancelFullScreenHandler=this.cancelFullScreen.bind(this),this.player.options.hotkey&&document.addEventListener("keydown",this.doHotKeyHandler),document.addEventListener("keydown",this.cancelFullScreenHandler)}var s,A;return s=a,(A=[{key:"doHotKey",value:function(i){if(this.player.focus){var d=document.activeElement.tagName.toUpperCase(),p=document.activeElement.getAttribute("contenteditable");if(d!=="INPUT"&&d!=="TEXTAREA"&&p!==""&&p!=="true"){var m,v=i||window.event;switch(v.keyCode){case 32:v.preventDefault(),this.player.toggle();break;case 37:if(v.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime-5),this.player.controller.setAutoHide();break;case 39:if(v.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime+5),this.player.controller.setAutoHide();break;case 38:v.preventDefault(),m=this.player.volume()+.1,this.player.volume(m);break;case 40:v.preventDefault(),m=this.player.volume()-.1,this.player.volume(m)}}}}},{key:"cancelFullScreen",value:function(i){(i||window.event).keyCode===27&&this.player.fullScreen.isFullScreen("web")&&this.player.fullScreen.cancel("web")}},{key:"destroy",value:function(){this.player.options.hotkey&&document.removeEventListener("keydown",this.doHotKeyHandler),document.removeEventListener("keydown",this.cancelFullScreenHandler)}}])&&Lp(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const _p=Ip;function ir(a){return ir=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},ir(a)}function Tp(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(ir(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(ir(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),ir(d)==="symbol"?d:String(d)),i)}var d}var Op=function(){function a(i){var d=this;(function(p,m){if(!(p instanceof m))throw new TypeError("Cannot call a class as a function")})(this,a),this.player=i,this.shown=!1,Array.prototype.slice.call(this.player.template.menuItem).forEach(function(p,m){d.player.options.contextmenu[m].click&&p.addEventListener("click",function(){d.player.options.contextmenu[m].click(d.player),d.hide()})}),this.contextmenuHandler=function(p){if(d.shown)d.hide();else{var m=p||window.event;m.preventDefault();var v=d.player.container.getBoundingClientRect();d.show(m.clientX-v.left,m.clientY-v.top),d.player.template.mask.addEventListener("click",function(){d.hide()})}},this.player.container.addEventListener("contextmenu",this.contextmenuHandler)}var s,A;return s=a,(A=[{key:"show",value:function(i,d){this.player.template.menu.classList.add("dplayer-menu-show");var p=this.player.container.getBoundingClientRect();i+this.player.template.menu.offsetWidth>=p.width?(this.player.template.menu.style.right=p.width-i+"px",this.player.template.menu.style.left="initial"):(this.player.template.menu.style.left=i+"px",this.player.template.menu.style.right="initial"),d+this.player.template.menu.offsetHeight>=p.height?(this.player.template.menu.style.bottom=p.height-d+"px",this.player.template.menu.style.top="initial"):(this.player.template.menu.style.top=d+"px",this.player.template.menu.style.bottom="initial"),this.player.template.mask.classList.add("dplayer-mask-show"),this.shown=!0,this.player.events.trigger("contextmenu_show")}},{key:"hide",value:function(){this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.template.menu.classList.remove("dplayer-menu-show"),this.shown=!1,this.player.events.trigger("contextmenu_hide")}},{key:"destroy",value:function(){this.player.container.removeEventListener("contextmenu",this.contextmenuHandler)}}])&&Tp(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const Rp=Op;function ar(a){return ar=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},ar(a)}function Pp(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,(d=function(p,m){if(ar(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var E=v.call(p,"string");if(ar(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(i.key),ar(d)==="symbol"?d:String(d)),i)}var d}var jp=function(){function a(i){var d=this;(function(p,m){if(!(p instanceof m))throw new TypeError("Cannot call a class as a function")})(this,a),this.container=i.template.infoPanel,this.template=i.template,this.video=i.video,this.player=i,this.template.infoPanelClose.addEventListener("click",function(){d.hide()})}var s,A;return s=a,(A=[{key:"show",value:function(){this.beginTime=Date.now(),this.update(),this.player.timer.enable("info"),this.player.timer.enable("fps"),this.container.classList.remove("dplayer-info-panel-hide")}},{key:"hide",value:function(){this.player.timer.disable("info"),this.player.timer.disable("fps"),this.container.classList.add("dplayer-info-panel-hide")}},{key:"triggle",value:function(){this.container.classList.contains("dplayer-info-panel-hide")?this.show():this.hide()}},{key:"update",value:function(){this.template.infoVersion.innerHTML="v".concat("1.27.1"," ").concat("v1.27.0-12-g4f61091"),this.template.infoType.innerHTML=this.player.type,this.template.infoUrl.innerHTML=this.player.options.video.url,this.template.infoResolution.innerHTML="".concat(this.player.video.videoWidth," x ").concat(this.player.video.videoHeight),this.template.infoDuration.innerHTML=this.player.video.duration,this.player.options.danmaku&&(this.template.infoDanmakuId.innerHTML=this.player.options.danmaku.id,this.template.infoDanmakuApi.innerHTML=this.player.options.danmaku.api,this.template.infoDanmakuAmount.innerHTML=this.player.danmaku.dan.length)}},{key:"fps",value:function(i){this.template.infoFPS.innerHTML="".concat(i.toFixed(1))}}])&&Pp(s.prototype,A),Object.defineProperty(s,"prototype",{writable:!1}),a}();const zp=jp;var Mp=o(568),Dp=o.n(Mp);function lr(a){return lr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(s){return typeof s}:function(s){return s&&typeof Symbol=="function"&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s},lr(a)}function Da(a,s){var A=Object.keys(a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(a);s&&(i=i.filter(function(d){return Object.getOwnPropertyDescriptor(a,d).enumerable})),A.push.apply(A,i)}return A}function Fp(a,s,A){return(s=Na(s))in a?Object.defineProperty(a,s,{value:A,enumerable:!0,configurable:!0,writable:!0}):a[s]=A,a}function Fa(a,s){for(var A=0;A<s.length;A++){var i=s[A];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(a,Na(i.key),i)}}function Na(a){var s=function(A,i){if(lr(A)!=="object"||A===null)return A;var d=A[Symbol.toPrimitive];if(d!==void 0){var p=d.call(A,"string");if(lr(p)!=="object")return p;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(A)}(a);return lr(s)==="symbol"?s:String(s)}var qa=0,xn=[],Np=function(){function a(d){var p=this;(function(m,v){if(!(m instanceof v))throw new TypeError("Cannot call a class as a function")})(this,a),this.options=function(m){var v={container:m.element||document.getElementsByClassName("dplayer")[0],live:!1,autoplay:!1,theme:"#b7daff",loop:!1,lang:(navigator.language||navigator.browserLanguage).toLowerCase(),screenshot:!1,airplay:!0,chromecast:!1,hotkey:!0,preload:"metadata",volume:.7,playbackSpeed:[.5,.75,1,1.25,1.5,2],apiBackend:od,video:{},contextmenu:[],mutex:!0,pluginOptions:{hls:{},flv:{},dash:{},webtorrent:{}},preventClickToggle:!1};for(var E in v)v.hasOwnProperty(E)&&!m.hasOwnProperty(E)&&(m[E]=v[E]);return m.video&&!m.video.type&&(m.video.type="auto"),Qo(m.danmaku)==="object"&&m.danmaku&&!m.danmaku.user&&(m.danmaku.user="DIYgod"),m.subtitle&&(!m.subtitle.type&&(m.subtitle.type="webvtt"),!m.subtitle.fontSize&&(m.subtitle.fontSize="20px"),!m.subtitle.bottom&&(m.subtitle.bottom="40px"),!m.subtitle.color&&(m.subtitle.color="#fff")),m.video.quality&&(m.video.url=m.video.quality[m.video.defaultQuality].url),m.lang&&(m.lang=m.lang.toLowerCase()),m.contextmenu=m.contextmenu.concat([{key:"video-info",click:function(L){L.infoPanel.triggle()}},{key:"about-author",link:"https://diygod.me"},{text:"DPlayer v".concat("1.27.1"),link:"https://github.com/MoePlayer/DPlayer"}]),m}(function(m){for(var v=1;v<arguments.length;v++){var E=arguments[v]!=null?arguments[v]:{};v%2?Da(Object(E),!0).forEach(function(L){Fp(m,L,E[L])}):Object.getOwnPropertyDescriptors?Object.defineProperties(m,Object.getOwnPropertyDescriptors(E)):Da(Object(E)).forEach(function(L){Object.defineProperty(m,L,Object.getOwnPropertyDescriptor(E,L))})}return m}({preload:d.video.type==="webtorrent"?"none":"metadata"},d)),this.options.video.quality&&(this.qualityIndex=this.options.video.defaultQuality,this.quality=this.options.video.quality[this.options.video.defaultQuality]),this.tran=new id(this.options.lang).tran,this.events=new $d,this.user=new tp(this),this.container=this.options.container,this.noticeList={},this.container.classList.add("dplayer"),this.options.danmaku||this.container.classList.add("dplayer-no-danmaku"),this.options.live?this.container.classList.add("dplayer-live"):this.container.classList.remove("dplayer-live"),te.isMobile&&this.container.classList.add("dplayer-mobile"),this.arrow=this.container.offsetWidth<=500,this.arrow&&this.container.classList.add("dplayer-arrow"),this.options.subtitle&&Array.isArray(this.options.subtitle.url)&&(this.options.subtitle.url.push({subtitle:"",lang:"off"}),this.options.subtitle.defaultSubtitle&&(typeof this.options.subtitle.defaultSubtitle=="string"?this.options.subtitle.index=this.options.subtitle.url.findIndex(function(m){return m.lang===p.options.subtitle.defaultSubtitle||m.name===p.options.subtitle.defaultSubtitle}):typeof this.options.subtitle.defaultSubtitle=="number"&&(this.options.subtitle.index=this.options.subtitle.defaultSubtitle)),(this.options.subtitle.index===-1||!this.options.subtitle.index||this.options.subtitle.index>this.options.subtitle.url.length-1)&&(this.options.subtitle.index=this.options.subtitle.url.findIndex(function(m){return m.lang===p.options.lang})),this.options.subtitle.index===-1&&(this.options.subtitle.index=this.options.subtitle.url.length-1)),this.template=new za({container:this.container,options:this.options,index:qa,tran:this.tran}),this.video=this.template.video,this.bar=new dp(this.template),this.bezel=new Ap(this.template.bezel),this.fullScreen=new Xd(this),this.controller=new Ep(this),this.options.danmaku&&(this.danmaku=new Kd({player:this,container:this.template.danmaku,opacity:this.user.get("opacity"),callback:function(){setTimeout(function(){p.template.danmakuLoading.style.display="none",p.options.autoplay&&p.play()},0)},error:function(m){p.notice(m)},apiBackend:this.options.apiBackend,borderColor:this.options.theme,height:this.arrow?24:30,time:function(){return p.video.currentTime},unlimited:this.user.get("unlimited"),api:{id:this.options.danmaku.id,address:this.options.danmaku.api,token:this.options.danmaku.token,maximum:this.options.danmaku.maximum,addition:this.options.danmaku.addition,user:this.options.danmaku.user,speedRate:this.options.danmaku.speedRate},events:this.events,tran:function(m){return p.tran(m)}}),this.comment=new Sp(this)),this.setting=new wp(this),this.plugins={},this.docClickFun=function(){p.focus=!1},this.containerClickFun=function(){p.focus=!0},document.addEventListener("click",this.docClickFun,!0),this.container.addEventListener("click",this.containerClickFun,!0),this.paused=!0,this.timer=new fp(this),this.hotkey=new _p(this),this.contextmenu=new Rp(this),this.initVideo(this.video,this.quality&&this.quality.type||this.options.video.type),this.infoPanel=new zp(this),!this.danmaku&&this.options.autoplay&&this.play(),qa++,xn.push(this)}var s,A,i;return s=a,A=[{key:"seek",value:function(d){d=Math.max(d,0),this.video.duration&&(d=Math.min(d,this.video.duration)),this.video.currentTime<d?this.notice("".concat(this.tran("ff").replace("%s",(d-this.video.currentTime).toFixed(0)))):this.video.currentTime>d&&this.notice("".concat(this.tran("rew").replace("%s",(this.video.currentTime-d).toFixed(0)))),this.video.currentTime=d,this.danmaku&&this.danmaku.seek(),this.bar.set("played",d/this.video.duration,"width"),this.template.ptime.innerHTML=te.secondToTime(d)}},{key:"play",value:function(d){var p=this;if(this.paused=!1,this.video.paused&&!te.isMobile&&this.bezel.switch(bt.play),this.template.playButton.innerHTML=bt.pause,this.template.mobilePlayButton.innerHTML=bt.pause,d||we.resolve(this.video.play()).catch(function(){p.pause()}).then(function(){}),this.timer.enable("loading"),this.container.classList.remove("dplayer-paused"),this.container.classList.add("dplayer-playing"),this.danmaku&&this.danmaku.play(),this.options.mutex)for(var m=0;m<xn.length;m++)this!==xn[m]&&xn[m].pause()}},{key:"pause",value:function(d){this.paused=!0,this.container.classList.remove("dplayer-loading"),this.video.paused||te.isMobile||this.bezel.switch(bt.pause),this.template.playButton.innerHTML=bt.play,this.template.mobilePlayButton.innerHTML=bt.play,d||this.video.pause(),this.timer.disable("loading"),this.container.classList.remove("dplayer-playing"),this.container.classList.add("dplayer-paused"),this.danmaku&&this.danmaku.pause()}},{key:"switchVolumeIcon",value:function(){this.volume()>=.95?this.template.volumeIcon.innerHTML=bt.volumeUp:this.volume()>0?this.template.volumeIcon.innerHTML=bt.volumeDown:this.template.volumeIcon.innerHTML=bt.volumeOff}},{key:"volume",value:function(d,p,m){if(d=parseFloat(d),!isNaN(d)){d=Math.max(d,0),d=Math.min(d,1),this.bar.set("volume",d,"width");var v="".concat((100*d).toFixed(0),"%");this.template.volumeBarWrapWrap.dataset.balloon=v,p||this.user.set("volume",d),m||this.notice("".concat(this.tran("volume")," ").concat((100*d).toFixed(0),"%"),void 0,void 0,"volume"),this.video.volume=d,this.video.muted&&(this.video.muted=!1),this.switchVolumeIcon()}return this.video.volume}},{key:"toggle",value:function(){this.video.paused?this.play():this.pause()}},{key:"on",value:function(d,p){this.events.on(d,p)}},{key:"switchVideo",value:function(d,p){this.pause(),this.video.poster=d.pic?d.pic:"",this.video.src=d.url,this.initMSE(this.video,d.type||"auto"),p&&(this.template.danmakuLoading.style.display="block",this.bar.set("played",0,"width"),this.bar.set("loaded",0,"width"),this.template.ptime.innerHTML="00:00",this.template.danmaku.innerHTML="",this.danmaku&&this.danmaku.reload({id:p.id,address:p.api,token:p.token,maximum:p.maximum,addition:p.addition,user:p.user}))}},{key:"initMSE",value:function(d,p){var m=this;if(this.type=p,this.options.video.customType&&this.options.video.customType[p])Object.prototype.toString.call(this.options.video.customType[p])==="[object Function]"?this.options.video.customType[p](this.video,this):console.error("Illegal customType: ".concat(p));else switch(this.type==="auto"&&(/m3u8(#|\?|$)/i.exec(d.src)?this.type="hls":/.flv(#|\?|$)/i.exec(d.src)?this.type="flv":/.mpd(#|\?|$)/i.exec(d.src)?this.type="dash":this.type="normal"),this.type==="hls"&&(d.canPlayType("application/x-mpegURL")||d.canPlayType("application/vnd.apple.mpegURL"))&&(this.type="normal"),this.type){case"hls":if(window.Hls)if(window.Hls.isSupported()){var v=this.options.pluginOptions.hls,E=new window.Hls(v);this.plugins.hls=E,E.loadSource(d.src),E.attachMedia(d),this.events.on("destroy",function(){E.destroy(),delete m.plugins.hls})}else this.notice("Error: Hls is not supported.");else this.notice("Error: Can't find Hls.");break;case"flv":if(window.flvjs)if(window.flvjs.isSupported()){var L=window.flvjs.createPlayer(Object.assign(this.options.pluginOptions.flv.mediaDataSource||{},{type:"flv",url:d.src}),this.options.pluginOptions.flv.config);this.plugins.flvjs=L,L.attachMediaElement(d),L.load(),this.events.on("destroy",function(){L.unload(),L.detachMediaElement(),L.destroy(),delete m.plugins.flvjs})}else this.notice("Error: flvjs is not supported.");else this.notice("Error: Can't find flvjs.");break;case"dash":if(window.dashjs){var T=window.dashjs.MediaPlayer().create().initialize(d,d.src,!1),U=this.options.pluginOptions.dash;T.updateSettings(U),this.plugins.dash=T,this.events.on("destroy",function(){window.dashjs.MediaPlayer().reset(),delete m.plugins.dash})}else this.notice("Error: Can't find dashjs.");break;case"webtorrent":if(window.WebTorrent)if(window.WebTorrent.WEBRTC_SUPPORT){this.container.classList.add("dplayer-loading");var V=this.options.pluginOptions.webtorrent,X=new window.WebTorrent(V);this.plugins.webtorrent=X;var $=d.src;d.src="",d.preload="metadata",d.addEventListener("durationchange",function(){return m.container.classList.remove("dplayer-loading")},{once:!0}),X.add($,function(Q){Q.files.find(function(ne){return ne.name.endsWith(".mp4")}).renderTo(m.video,{autoplay:m.options.autoplay,controls:!1})}),this.events.on("destroy",function(){X.remove($),X.destroy(),delete m.plugins.webtorrent})}else this.notice("Error: Webtorrent is not supported.");else this.notice("Error: Can't find Webtorrent.")}}},{key:"initVideo",value:function(d,p){var m=this;this.initMSE(d,p),this.on("durationchange",function(){d.duration!==1&&d.duration!==1/0&&(m.template.dtime.innerHTML=te.secondToTime(d.duration))}),this.on("progress",function(){var L=d.buffered.length?d.buffered.end(d.buffered.length-1)/d.duration:0;m.bar.set("loaded",L,"width")}),this.on("error",function(){m.video.error&&m.tran&&m.notice&&m.type!=="webtorrent"&&m.notice(m.tran("video-failed"))}),this.on("ended",function(){m.bar.set("played",1,"width"),m.setting.loop?(m.seek(0),m.play()):m.pause(),m.danmaku&&(m.danmaku.danIndex=0)}),this.on("play",function(){m.paused&&m.play(!0)}),this.on("pause",function(){m.paused||m.pause(!0)}),this.on("timeupdate",function(){m.bar.set("played",m.video.currentTime/m.video.duration,"width");var L=te.secondToTime(m.video.currentTime);m.template.ptime.innerHTML!==L&&(m.template.ptime.innerHTML=L)});for(var v=function(L){d.addEventListener(m.events.videoEvents[L],function(T){m.events.trigger(m.events.videoEvents[L],T)})},E=0;E<this.events.videoEvents.length;E++)v(E);this.volume(this.user.get("volume"),!0,!0),this.options.subtitle&&(this.subtitle=new op(this.template.subtitle,this.video,this.options.subtitle,this.events),Array.isArray(this.options.subtitle.url)&&(this.subtitles=new lp(this)),this.user.get("subtitle")||this.subtitle.hide())}},{key:"switchQuality",value:function(d){var p=this;if(d=typeof d=="string"?parseInt(d):d,this.qualityIndex!==d&&!this.switchingQuality){this.prevIndex=this.qualityIndex,this.qualityIndex=d,this.switchingQuality=!0,this.quality=this.options.video.quality[d],this.template.qualityButton.innerHTML=this.quality.name;var m=this.video.paused;this.video.pause();var v=Dp()({current:!1,pic:null,screenshot:this.options.screenshot,preload:"auto",url:this.quality.url,subtitle:this.options.subtitle}),E=new DOMParser().parseFromString(v,"text/html").body.firstChild;this.template.videoWrap.insertBefore(E,this.template.videoWrap.getElementsByTagName("div")[0]),this.prevVideo=this.video,this.video=E,this.initVideo(this.video,this.quality.type||this.options.video.type),this.seek(this.prevVideo.currentTime),this.notice("".concat(this.tran("switching-quality").replace("%q",this.quality.name)),-1,void 0,"switch-quality"),this.events.trigger("quality_start",this.quality),this.on("canplay",function(){if(p.prevVideo){if(p.video.currentTime!==p.prevVideo.currentTime)return void p.seek(p.prevVideo.currentTime);p.template.videoWrap.removeChild(p.prevVideo),p.video.classList.add("dplayer-video-current"),m||p.video.play(),p.prevVideo=null,p.notice("".concat(p.tran("switched-quality").replace("%q",p.quality.name)),void 0,void 0,"switch-quality"),p.switchingQuality=!1,p.events.trigger("quality_end")}}),this.on("error",function(){p.video.error&&p.prevVideo&&(p.template.videoWrap.removeChild(p.video),p.video=p.prevVideo,m||p.video.play(),p.qualityIndex=p.prevIndex,p.quality=p.options.video.quality[p.qualityIndex],p.noticeTime=setTimeout(function(){p.template.notice.style.opacity=0,p.events.trigger("notice_hide")},3e3),p.prevVideo=null,p.switchingQuality=!1)})}}},{key:"notice",value:function(d){var p,m,v,E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2e3,L=arguments.length>2&&arguments[2]!==void 0?arguments[2]:.8,T=arguments.length>3?arguments[3]:void 0;if(T&&((p=document.getElementById("dplayer-notice-".concat(T)))&&(p.innerHTML=d),this.noticeList[T]&&(clearTimeout(this.noticeList[T]),this.noticeList[T]=null)),!p){var U=za.NewNotice(d,L,T);this.template.noticeList.appendChild(U),p=U}this.events.trigger("notice_show",p),E>0&&(this.noticeList[T]=setTimeout((m=p,v=this,function(){m.addEventListener("animationend",function(){v.template.noticeList.removeChild(m)}),m.classList.add("remove-notice"),v.events.trigger("notice_hide"),v.noticeList[T]=null}),E))}},{key:"resize",value:function(){this.danmaku&&this.danmaku.resize(),this.controller.thumbnails&&this.controller.thumbnails.resize(160,this.video.videoHeight/this.video.videoWidth*160,this.template.barWrap.offsetWidth),this.events.trigger("resize")}},{key:"speed",value:function(d){this.video.playbackRate=d}},{key:"destroy",value:function(){xn.splice(xn.indexOf(this),1),this.pause(),document.removeEventListener("click",this.docClickFun,!0),this.container.removeEventListener("click",this.containerClickFun,!0),this.fullScreen.destroy(),this.hotkey.destroy(),this.contextmenu.destroy(),this.controller.destroy(),this.timer.destroy(),this.video.src="",this.container.innerHTML="",this.events.trigger("destroy")}}],i=[{key:"version",get:function(){return"1.27.1"}}],A&&Fa(s.prototype,A),i&&Fa(s,i),Object.defineProperty(s,"prototype",{writable:!1}),a}();const qp=Np;console.log(`
`.concat(" %c DPlayer v","1.27.1"," ").concat("v1.27.0-12-g4f61091"," %c https://dplayer.diygod.dev ",`
`,`
`),"color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;");const Hp=qp})(),l.default})())})(Fc);var Km=Fc.exports;const Vm=Qm(Km),$m={id:"dplayer",style:{width:"100%",height:"100vh"}},Jm={__name:"VideoPlay",setup(e){const t=ra(),n=Me(null);return Ft(()=>{let r=t.query.url;n.value=new Vm({container:document.getElementById("dplayer"),video:{url:r}})}),$i(()=>{n.value.destroy()}),(r,o)=>(le(),He("div",$m))}},Zm=["src"],Xm={__name:"AudioPlay",setup(e){const t=ra(),n=Me();return Ft(()=>{n.value=t.query.url}),(r,o)=>(le(),He("div",null,[Ee("audio",{src:n.value,controls:""},null,8,Zm)]))}},Gm=[{path:"/",component:Um},{path:"/VideoPlay",component:Jm},{path:"/AudioPlay",component:Xm}],e0=_A({history:Qh(),routes:Gm});const Gl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAABUCAYAAADplZtxAAAHFUlEQVR4nO2deYwURRSHv10WcRdQAaPhCOABCoRDFFSI4oWCojGIxGMFo1hgMAYIgcglKt5BiBCTbQ5FUQRvwHAYwqEGNGIEbwFFhICCKMsqgqD+8WbcYbaru6t7umd2pr9ks5O697fV3a9eva4pqqiooJbTAeic+LwZ+CLKzpVSrmVKIhiHGycDpwI7gcMG9eoDo4EhQItE2i5gLvAE8GcGxxiI4iz23QtYD+wFtiZ+vwA081C3GbAJmEy1wADNgYnA10DLzA01GNkSeSSwBrgIqJtIawgMBr4BOrnUfws4yyG/JfBasCFmjmyIfBnwjEN+Q2ABUKTJvwvo7qGf7sAwo5GFRDZEHuqhTHtETDv6GvTV26BsaEQtcilwlcey3TTpbreSVLrg/jfWRR6ioRG1yCVAPY9lyzTpVQb9HQT+0eT1A5YBPwG/IM+CmcCZBu17ImqRDyJ/jBd+1qSvNejvA5u0EmApsAToA5yO/EPPAYYD2xCzMGNkSuQyxHzyMksXemzzVU26idXwsk3am8B1LvVmAQMM+nEkqMjNgJeQy20nsA+YDTRyqDMV+Mil3ceAjZq89Yh97MaURNlUBgPXe6gLMB2xdAITROS2yDK2nOoHRwPgbuBT4DSHun2BlZq8icB4l74fQmxtHaMT7aQz2KXdVJoDdxiU1xJkWV0BNNHktQaeQ3/J/QZcA1yCXLplwA7kUv7eY//TkVtPOdUWx2ZgPrDbpnwjvNnXqXQxLG+LX5HPQxYVTtyIiL3docz7iR+/7Aae9li2MWJCmtDYsLwtfm8XXT2UqUOGZkKG2Iu500hn4RjhV2Svne/x2X4YVGJm/kGwq+x//Iq8BrEonNgCbPDZfliYOM83oTcjjfArchXwiEuZyT7bDpMleBf6vkx1GsSEmwmM0+QNBV4J0HaYDEPscB37gJ7YrxZLESvFq2sACL4z8jhiRg0AmiJ+gIXIDkUuMx5ZRCngfESHA8A7yMZB6g5NHeBe4HZkq6s+YoKuQ8zIdW6dFeXBHl+YnAEsRxZeOmYrpe5xaiSb20+5TlPgQ5wFBhhiWdY8pwKxyHpmIEJ7YZBlWbfpMp1EbgOMQB5uPbyPLS/oBNxkWOd+XYZO5AeB74BpwKPIZfMu5svS2oqbK9SObpZlnWGXYSfyUOxt3GuBRT46r420cC9Sg2LgXF1GOqMcGuqHbOPnO0d81jtml5gucnvcn6aFIPI2H3WOAJ/bZaSLXAUcdWms0scAahtL0cxKB5Yrpez82DVE3gG859DQX+h3NPKJ7YjbwIRndRl29+SJ6GfzGGQvrxAYiVhVXpiolFqly7QTeSPibF9NdczCt8DNiIFeKPyLBEXOdyhzDBiilJri1JDOQfQlcAVwCnAiueV8j5JjyGbqVMR71xmZmPuRWW4ppdz86q5euN8DDjJf+IwAwYu5EAReW6kHXGpZ1tnIrWUHsE4pVSOMLBbZnBMQA2AUNYN4DluWNQOYpJQ6lEyMvXBmNAE+Qbbe7KKk6iGBNV9ZltU6mRiLbMYyoKOHcq2BFZZlnQSxyCZMQh8zbUdb5AWhePvJI6XAD0iYrQmHgIGpM7krsom4EnjSR4P5TC/86VEKXJ20Lu4Enk/J7I1EZ/ZAnPeFjtObVm60K0YCA+2cIU2QLe8YCQvwTVJk3YsplxPfNsA5MtW1bmxdeGMt8r6LKX8DK4qBxYif2I7VZCh8tJZzADEKTFkAvF2MRLePsSnwBzDW/7jyjgmYGQF7gHFKqaPJ28UMJHL+DWTZOAtoh2bPqkCpRHbsbbeYbMr2VUrtguMdRGsxD5IuNLYh2/7T0L+WvAgYrpTal0yIvXDmVCJriAnIeqINYuJtBVYppX5MrxCL7J/dwIteTm6JTbgIiEWOgFjkCIhFjoBY5AiIRY4AnchlyGFM25GIov5RDSgf0dnJy5E3+AFaIcvtQchrWTGG2M3k/lQLnIqdEynGA3Yi6w46akWGTjIpNOxEtnvdNZnux3Fd8NiJvAF4Ki2tCngg/OHkJ7oH31jkuIU+wK/AHHL/fekomIIc3zPXpJKTF25Z4iemmo+RE2CMiF2dZiz2Uyle8UVALHIExCJHQCxyBGRK5AZImH+MDUFFrotEyRxEDkgyOQuzYAgq8lTglsTnhkgo04UB28w7gohcAtxgk25y5nxBEETko8ibq+lE+o01ASlCNihCNQCCNj6C46M+5wGvB2wzSm5FAisfDrOToMvqLchBJFcipwekn7yd6yTPVAp1JmfCd7GfHPp2GkPmIN++E6qfPHYQySQJlWyv+MqRo2jKszyOUMnmTC6nevc7eQ6b0wEeOjoix6LnbGx1Nmdy+qLFzyKmJ/JlAWvQHzOcdbIpcvpR5n6ONr845fMFAcYSKtm8XSxCDuMYmPjsx0KxkBVmB2pu/uYM/wGLGkDtW01H/QAAAABJRU5ErkJggg==";/*!
 * Vue-Lazyload.js v3.0.0
 * (c) 2023 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */function Nc(e,t){return t={exports:{}},e(t,t.exports),t.exports}var Ri=Nc(function(e){const t=Object.prototype.toString,n=Object.prototype.propertyIsEnumerable,r=Object.getOwnPropertySymbols;e.exports=(l,...c)=>{if(!o(l))throw new TypeError("expected the first argument to be an object");if(c.length===0||typeof Symbol!="function"||typeof r!="function")return l;for(let u of c){let h=r(u);for(let y of h)n.call(u,y)&&(l[y]=u[y])}return l};function o(l){return typeof l=="function"||t.call(l)==="[object Object]"||Array.isArray(l)}}),es=Object.freeze({__proto__:null,default:Ri,__moduleExports:Ri}),t0=es&&Ri||es,ts=Nc(function(e){const t=Object.prototype.toString,n=c=>c!=="__proto__"&&c!=="constructor"&&c!=="prototype",r=e.exports=(c,...u)=>{let h=0;for(l(c)&&(c=u[h++]),c||(c={});h<u.length;h++)if(o(u[h])){for(const y of Object.keys(u[h]))n(y)&&(o(c[y])&&o(u[h][y])?r(c[y],u[h][y]):c[y]=u[h][y]);t0(c,u[h])}return c};function o(c){return typeof c=="function"||t.call(c)==="[object Object]"}function l(c){return typeof c=="object"?c===null:typeof c!="function"}});const rn=typeof window<"u"&&window!==null,ns=n0();function n0(){return rn&&"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype?("isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}}),!0):!1}const dn={event:"event",observer:"observer"};function Ar(e,t){if(!e.length)return;const n=e.indexOf(t);if(n>-1)return e.splice(n,1)}function rs(e,t){if(e.tagName!=="IMG"||!e.getAttribute("data-srcset"))return"";let n=e.getAttribute("data-srcset").trim().split(",");const r=[],l=e.parentNode.offsetWidth*t;let c,u,h;n.forEach(g=>{g=g.trim(),c=g.lastIndexOf(" "),c===-1?(u=g,h=99999):(u=g.substr(0,c),h=parseInt(g.substr(c+1,g.length-c-2),10)),r.push([h,u])}),r.sort((g,f)=>{if(g[0]<f[0])return 1;if(g[0]>f[0])return-1;if(g[0]===f[0]){if(f[1].indexOf(".webp",f[1].length-5)!==-1)return 1;if(g[1].indexOf(".webp",g[1].length-5)!==-1)return-1}return 0});let y="",b;for(let g=0;g<r.length;g++){b=r[g],y=b[1];const f=r[g+1];if(f&&f[0]<l){y=b[1];break}else if(!f){y=b[1];break}}return y}const r0=(e=1)=>rn&&window.devicePixelRatio||e;function o0(){if(!rn)return!1;let e=!0;function t(n,r){const o={lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"},l=new Image;l.onload=function(){const c=l.width>0&&l.height>0;r(c)},l.onerror=function(){r(!1)},l.src="data:image/webp;base64,"+o[n]}return t("lossy",n=>{e=n}),t("lossless",n=>{e=n}),t("alpha",n=>{e=n}),t("animation",n=>{e=n}),e}function i0(e,t){let n=null,r=0;return function(){if(n)return;const o=Date.now()-r,l=this,c=arguments,u=function(){r=Date.now(),n=!1,e.apply(l,c)};o>=t?u():n=setTimeout(u,t)}}function a0(){if(!rn)return!1;let e=!1;try{const t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("test",ca,t)}catch{}return e}const l0=a0(),s0={on(e,t,n,r=!1){l0?e.addEventListener(t,n,{capture:r,passive:!0}):e.addEventListener(t,n,r)},off(e,t,n,r=!1){e.removeEventListener(t,n,r)}},Pi=(e,t,n)=>{let r=new Image;if(!e||!e.src){const o=new Error("image src is required");return n(o)}e.cors&&(r.crossOrigin=e.cors),r.src=e.src,r.onload=function(){t({naturalHeight:r.naturalHeight,naturalWidth:r.naturalWidth,src:r.src}),r=null},r.onerror=function(o){n(o)}},pi=(e,t)=>typeof getComputedStyle<"u"?getComputedStyle(e,null).getPropertyValue(t):e.style[t],c0=e=>pi(e,"overflow")+pi(e,"overflowY")+pi(e,"overflowX"),d0=e=>{if(!rn)return;if(!(e instanceof Element))return window;let t=e;for(;t&&!(t===document.body||t===document.documentElement||!t.parentNode);){if(/(scroll|auto)/.test(c0(t)))return t;t=t.parentNode}return window};function p0(e){return e!==null&&typeof e=="object"}function ca(){}class u0{constructor(t){this.max=t||100,this._caches=[]}has(t){return this._caches.indexOf(t)>-1}add(t){this.has(t)||(this._caches.push(t),this._caches.length>this.max&&this.free())}free(){this._caches.shift()}}class f0{constructor(t,n,r,o,l,c,u,h,y,b){this.el=t,this.src=n,this.error=r,this.loading=o,this.bindType=l,this.attempt=0,this.cors=h,this.naturalHeight=0,this.naturalWidth=0,this.options=u,this.rect={},this.$parent=c,this.elRenderer=y,this._imageCache=b,this.performanceData={init:Date.now(),loadStart:0,loadEnd:0},this.filter(),this.initState(),this.render("loading",!1)}initState(){"dataset"in this.el?this.el.dataset.src=this.src:this.el.setAttribute("data-src",this.src),this.state={loading:!1,error:!1,loaded:!1,rendered:!1}}record(t){this.performanceData[t]=Date.now()}update(t){const n=this.src;this.src=t.src,this.loading=t.loading,this.error=t.error,this.filter(),n!==this.src&&(this.attempt=0,this.initState())}getRect(){this.rect=this.el.getBoundingClientRect()}checkInView(){return this.getRect(),this.rect.top<window.innerHeight*this.options.preLoad&&this.rect.bottom>this.options.preLoadTop&&this.rect.left<window.innerWidth*this.options.preLoad&&this.rect.right>0}filter(){for(const t in this.options.filter)this.options.filter[t](this,this.options)}renderLoading(t){this.state.loading=!0,Pi({src:this.loading,cors:this.cors},()=>{this.render("loading",!1),this.state.loading=!1,t()},()=>{t(),this.state.loading=!1,this.options.silent||console.warn(`VueLazyload log: load failed with loading image(${this.loading})`)})}load(t=ca){if(this.attempt>this.options.attempt-1&&this.state.error){this.options.silent||console.log(`VueLazyload log: ${this.src} tried too more than ${this.options.attempt} times`),t();return}if(!(this.state.rendered&&this.state.loaded)){if(this._imageCache.has(this.src))return this.state.loaded=!0,this.render("loaded",!0),this.state.rendered=!0,t();this.renderLoading(()=>{this.attempt++,this.options.adapter.beforeLoad&&this.options.adapter.beforeLoad(this,this.options),this.record("loadStart"),Pi({src:this.src,cors:this.cors},n=>{this.naturalHeight=n.naturalHeight,this.naturalWidth=n.naturalWidth,this.state.loaded=!0,this.state.error=!1,this.record("loadEnd"),this.render("loaded",!1),this.state.rendered=!0,this._imageCache.add(this.src),t()},n=>{!this.options.silent&&console.error(n),this.state.error=!0,this.state.loaded=!1,this.render("error",!1)})})}}render(t,n){this.elRenderer(this,t,n)}performance(){let t="loading",n=0;return this.state.loaded&&(t="loaded",n=(this.performanceData.loadEnd-this.performanceData.loadStart)/1e3),this.state.error&&(t="error"),{src:this.src,state:t,time:n}}$destroy(){this.el=null,this.src="",this.error=null,this.loading="",this.bindType=null,this.attempt=0}}const os="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",h0=["scroll","wheel","mousewheel","resize","animationend","transitionend","touchmove"],A0={rootMargin:"0px",threshold:0};class y0{constructor({preLoad:t,error:n,throttleWait:r,preLoadTop:o,dispatchEvent:l,loading:c,attempt:u,silent:h=!0,scale:y,listenEvents:b,filter:g,adapter:f,observer:w,observerOptions:B}){this.version='"3.0.0"',this.lazyContainerMananger=null,this.mode=dn.event,this.ListenerQueue=[],this.TargetIndex=0,this.TargetQueue=[],this.options={silent:h,dispatchEvent:!!l,throttleWait:r||200,preLoad:t||1.3,preLoadTop:o||0,error:n||os,loading:c||os,attempt:u||3,scale:y||r0(y),listenEvents:b||h0,supportWebp:o0(),filter:g||{},adapter:f||{},observer:!!w,observerOptions:B||A0},this._initEvent(),this._imageCache=new u0(200),this.lazyLoadHandler=i0(this._lazyLoadHandler.bind(this),this.options.throttleWait),this.setMode(this.options.observer?dn.observer:dn.event)}performance(){const t=[];return this.ListenerQueue.map(n=>t.push(n.performance())),t}addLazyBox(t){this.ListenerQueue.push(t),rn&&(this._addListenerTarget(window),this._observer&&this._observer.observe(t.el),t.$el&&t.$el.parentNode&&this._addListenerTarget(t.$el.parentNode))}add(t,n,r){if(this.ListenerQueue.some(h=>h.el===t))return this.update(t,n),Jt(this.lazyLoadHandler);let{src:o,loading:l,error:c,cors:u}=this._valueFormatter(n.value);Jt(()=>{o=rs(t,this.options.scale)||o,this._observer&&this._observer.observe(t);const h=Object.keys(n.modifiers)[0];let y;h&&(y=n.instance.$refs[h],y=y?y.el||y:document.getElementById(h)),y||(y=d0(t));const b=new f0(t,o,c,l,n.arg,y,this.options,u,this._elRenderer.bind(this),this._imageCache);this.ListenerQueue.push(b),rn&&(this._addListenerTarget(window),this._addListenerTarget(y)),Jt(this.lazyLoadHandler)})}update(t,n,r){let{src:o,loading:l,error:c}=this._valueFormatter(n.value);o=rs(t,this.options.scale)||o;const u=this.ListenerQueue.find(h=>h.el===t);u?u.update({src:o,loading:l,error:c}):(t.getAttribute("lazy")!=="loaded"||t.dataset.src!==o)&&this.add(t,n,r),this._observer&&(this._observer.unobserve(t),this._observer.observe(t)),Jt(this.lazyLoadHandler)}remove(t){if(!t)return;this._observer&&this._observer.unobserve(t);const n=this.ListenerQueue.find(r=>r.el===t);n&&(this._removeListenerTarget(n.$parent),this._removeListenerTarget(window),Ar(this.ListenerQueue,n),n.$destroy&&n.$destroy())}removeComponent(t){t&&(Ar(this.ListenerQueue,t),this._observer&&this._observer.unobserve(t.el),t.$parent&&t.$el.parentNode&&this._removeListenerTarget(t.$el.parentNode),this._removeListenerTarget(window))}setMode(t){!ns&&t===dn.observer&&(t=dn.event),this.mode=t,t===dn.event?(this._observer&&(this.ListenerQueue.forEach(n=>{this._observer.unobserve(n.el)}),this._observer=null),this.TargetQueue.forEach(n=>{this._initListen(n.el,!0)})):(this.TargetQueue.forEach(n=>{this._initListen(n.el,!1)}),this._initIntersectionObserver())}_addListenerTarget(t){if(!t)return;let n=this.TargetQueue.find(r=>r.el===t);return n?n.childrenCount++:(n={el:t,id:++this.TargetIndex,childrenCount:1,listened:!0},this.mode===dn.event&&this._initListen(n.el,!0),this.TargetQueue.push(n)),this.TargetIndex}_removeListenerTarget(t){this.TargetQueue.forEach((n,r)=>{n.el===t&&(n.childrenCount--,n.childrenCount||(this._initListen(n.el,!1),this.TargetQueue.splice(r,1),n=null))})}_initListen(t,n){this.options.listenEvents.forEach(r=>s0[n?"on":"off"](t,r,this.lazyLoadHandler))}_initEvent(){this.Event={listeners:{loading:[],loaded:[],error:[]}},this.$on=(t,n)=>{this.Event.listeners[t]||(this.Event.listeners[t]=[]),this.Event.listeners[t].push(n)},this.$once=(t,n)=>{const r=this;function o(){r.$off(t,o),n.apply(r,arguments)}this.$on(t,o)},this.$off=(t,n)=>{if(!n){if(!this.Event.listeners[t])return;this.Event.listeners[t].length=0;return}Ar(this.Event.listeners[t],n)},this.$emit=(t,n,r)=>{this.Event.listeners[t]&&this.Event.listeners[t].forEach(o=>o(n,r))}}_lazyLoadHandler(){const t=[];this.ListenerQueue.forEach((n,r)=>{(!n.el||!n.el.parentNode||n.state.loaded)&&t.push(n),n.checkInView()&&(n.state.loaded||n.load())}),t.forEach(n=>{Ar(this.ListenerQueue,n),n.$destroy&&n.$destroy()})}_initIntersectionObserver(){ns&&(this._observer=new IntersectionObserver(this._observerHandler.bind(this),this.options.observerOptions),this.ListenerQueue.length&&this.ListenerQueue.forEach(t=>{this._observer.observe(t.el)}))}_observerHandler(t){t.forEach(n=>{n.isIntersecting&&this.ListenerQueue.forEach(r=>{if(r.el===n.target){if(r.state.loaded)return this._observer.unobserve(r.el);r.load()}})})}_elRenderer(t,n,r){if(!t.el)return;const{el:o,bindType:l}=t;let c;switch(n){case"loading":c=t.loading;break;case"error":c=t.error;break;default:c=t.src;break}if(l?o.style[l]='url("'+c+'")':o.getAttribute("src")!==c&&o.setAttribute("src",c),o.setAttribute("lazy",n),this.$emit(n,t,r),this.options.adapter[n]&&this.options.adapter[n](t,this.options),this.options.dispatchEvent){const u=new CustomEvent(n,{detail:t});o.dispatchEvent(u)}}_valueFormatter(t){return p0(t)?(!t.src&&!this.options.silent&&console.error("Vue Lazyload warning: miss src with "+t),{src:t.src,loading:t.loading||this.options.loading,error:t.error||this.options.error,cors:this.options.cors}):{src:t,loading:this.options.loading,error:this.options.error,cors:this.options.cors}}}const qc=(e,t)=>{let n=tn({});const r=()=>{n=e.value.getBoundingClientRect()};return{rect:n,checkInView:()=>(r(),rn&&n.top<window.innerHeight*t&&n.bottom>0&&n.left<window.innerWidth*t&&n.right>0)}};var m0=e=>xo({props:{tag:{type:String,default:"div"}},emits:["show"],setup(t,{emit:n,slots:r}){const o=Me(),l=tn({loaded:!1,error:!1,attempt:0}),c=Me(!1),{rect:u,checkInView:h}=qc(o,e.options.preLoad),y=()=>{c.value=!0,l.loaded=!0,n("show",c.value)},b=pt(()=>({el:o.value,rect:u,checkInView:h,load:y,state:l}));return Ft(()=>{e.addLazyBox(b.value),e.lazyLoadHandler()}),_r(()=>{e.removeComponent(b.value)}),()=>{var g;return F(t.tag,{ref:o},[c.value&&((g=r.default)===null||g===void 0?void 0:g.call(r))])}}});class b0{constructor(t){this.lazy=t,t.lazyContainerMananger=this,this._queue=[]}bind(t,n,r){const o=new v0(t,n,r,this.lazy);this._queue.push(o)}update(t,n,r){const o=this._queue.find(l=>l.el===t);o&&o.update(t,n)}unbind(t,n,r){const o=this._queue.find(l=>l.el===t);o&&(o.clear(),Ar(this._queue,o))}}const g0={selector:"img",error:"",loading:""};class v0{constructor(t,n,r,o){this.el=t,this.vnode=r,this.binding=n,this.options={},this.lazy=o,this._queue=[],this.update(t,n)}update(t,n){this.el=t,this.options=ts({},g0,n.value),this.getImgs().forEach(o=>{this.lazy.add(o,ts({},this.binding,{value:{src:o.getAttribute("data-src")||o.dataset.src,error:o.getAttribute("data-error")||o.dataset.error||this.options.error,loading:o.getAttribute("data-loading")||o.dataset.loading||this.options.loading}}),this.vnode)})}getImgs(){return Array.from(this.el.querySelectorAll(this.options.selector))}clear(){this.getImgs().forEach(n=>this.lazy.remove(n)),this.vnode=null,this.binding=null,this.lazy=null}}var E0=e=>xo({setup(t,{slots:n}){const r=Me(),o=tn({src:"",error:"",loading:"",attempt:e.options.attempt}),l=tn({loaded:!1,error:!1,attempt:0}),{rect:c,checkInView:u}=qc(r,e.options.preLoad),h=Me(""),y=(f=ca)=>{if(l.attempt>o.attempt-1&&l.error)return e.options.silent||console.log(`VueLazyload log: ${o.src} tried too more than ${o.attempt} times`),f();const w=o.src;Pi({src:w},({src:B})=>{h.value=B,l.loaded=!0},()=>{l.attempt++,h.value=o.error,l.error=!0})},b=pt(()=>({el:r.value,rect:c,checkInView:u,load:y,state:l}));Ft(()=>{e.addLazyBox(b.value),e.lazyLoadHandler()}),_r(()=>{e.removeComponent(b.value)});const g=()=>{const{src:f,loading:w,error:B}=e._valueFormatter(t.src);l.loaded=!1,o.src=f,o.error=B,o.loading=w,h.value=o.loading};return Gt(()=>t.src,()=>{g(),e.addLazyBox(b.value),e.lazyLoadHandler()},{immediate:!0}),()=>{var f;return F(t.tag||"img",{src:h.value,ref:r},[(f=n.default)===null||f===void 0?void 0:f.call(n)])}}}),x0={install(e,t={}){const n=new y0(t),r=new b0(n);if(Number(e.version.split(".")[0])<3)return new Error("Vue version at least 3.0");e.config.globalProperties.$Lazyload=n,e.provide("Lazyload",n),t.lazyComponent&&e.component("lazy-component",m0(n)),t.lazyImage&&e.component("lazy-image",E0(n)),e.directive("lazy",{beforeMount:n.add.bind(n),beforeUpdate:n.update.bind(n),updated:n.lazyLoadHandler.bind(n),unmounted:n.remove.bind(n)}),e.directive("lazy-container",{beforeMount:r.bind.bind(r),updated:r.update.bind(r),unmounted:r.unbind.bind(r)})}};const da=kh(Sh);da.use(e0);da.use(x0,{preLoad:1,error:Gl,loading:Gl,attempt:2});da.mount("#app");
