(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();function pa(e,t){const n=Object.create(null),r=e.split(",");for(let o=0;o<r.length;o++)n[r[o]]=!0;return t?o=>!!n[o.toLowerCase()]:o=>!!n[o]}const Pe={},zn=[],Bt=()=>{},lf=()=>!1,sf=/^on[^a-z]/,Fo=e=>sf.test(e),ua=e=>e.startsWith("onUpdate:"),Qe=Object.assign,fa=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},cf=Object.prototype.hasOwnProperty,be=(e,t)=>cf.call(e,t),se=Array.isArray,Dn=e=>qo(e)==="[object Map]",uc=e=>qo(e)==="[object Set]",pe=e=>typeof e=="function",Ye=e=>typeof e=="string",ha=e=>typeof e=="symbol",je=e=>e!==null&&typeof e=="object",fc=e=>je(e)&&pe(e.then)&&pe(e.catch),hc=Object.prototype.toString,qo=e=>hc.call(e),df=e=>qo(e).slice(8,-1),yc=e=>qo(e)==="[object Object]",ya=e=>Ye(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,go=pa(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Uo=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},pf=/-(\w)/g,Dt=Uo(e=>e.replace(pf,(t,n)=>n?n.toUpperCase():"")),uf=/\B([A-Z])/g,Xn=Uo(e=>e.replace(uf,"-$1").toLowerCase()),Ho=Uo(e=>e.charAt(0).toUpperCase()+e.slice(1)),Ei=Uo(e=>e?`on${Ho(e)}`:""),Dr=(e,t)=>!Object.is(e,t),wi=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},Oo=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},ff=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let kl;const Mi=()=>kl||(kl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Wo(e){if(se(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],o=Ye(r)?mf(r):Wo(r);if(o)for(const a in o)t[a]=o[a]}return t}else{if(Ye(e))return e;if(je(e))return e}}const hf=/;(?![^(]*\))/g,yf=/:([^]+)/,Af=/\/\*[^]*?\*\//g;function mf(e){const t={};return e.replace(Af,"").split(hf).forEach(n=>{if(n){const r=n.split(yf);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function Nr(e){let t="";if(Ye(e))t=e;else if(se(e))for(let n=0;n<e.length;n++){const r=Nr(e[n]);r&&(t+=r+" ")}else if(je(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const bf="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",gf=pa(bf);function Ac(e){return!!e||e===""}const xi=e=>Ye(e)?e:e==null?"":se(e)||je(e)&&(e.toString===hc||!pe(e.toString))?JSON.stringify(e,mc,2):String(e),mc=(e,t)=>t&&t.__v_isRef?mc(e,t.value):Dn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,o])=>(n[`${r} =>`]=o,n),{})}:uc(t)?{[`Set(${t.size})`]:[...t.values()]}:je(t)&&!se(t)&&!yc(t)?String(t):t;let vt;class vf{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=vt,!t&&vt&&(this.index=(vt.scopes||(vt.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=vt;try{return vt=this,t()}finally{vt=n}}}on(){vt=this}off(){vt=this.parent}stop(t){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0,this._active=!1}}}function Ef(e,t=vt){t&&t.active&&t.effects.push(e)}function wf(){return vt}const Aa=e=>{const t=new Set(e);return t.w=0,t.n=0,t},bc=e=>(e.w&dn)>0,gc=e=>(e.n&dn)>0,xf=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=dn},kf=e=>{const{deps:t}=e;if(t.length){let n=0;for(let r=0;r<t.length;r++){const o=t[r];bc(o)&&!gc(o)?o.delete(e):t[n++]=o,o.w&=~dn,o.n&=~dn}t.length=n}},Fi=new WeakMap;let Ir=0,dn=1;const qi=30;let wt;const bn=Symbol(""),Ui=Symbol("");class ma{constructor(t,n=null,r){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,Ef(this,r)}run(){if(!this.active)return this.fn();let t=wt,n=sn;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=wt,wt=this,sn=!0,dn=1<<++Ir,Ir<=qi?xf(this):Cl(this),this.fn()}finally{Ir<=qi&&kf(this),dn=1<<--Ir,wt=this.parent,sn=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){wt===this?this.deferStop=!0:this.active&&(Cl(this),this.onStop&&this.onStop(),this.active=!1)}}function Cl(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let sn=!0;const vc=[];function Zn(){vc.push(sn),sn=!1}function Jn(){const e=vc.pop();sn=e===void 0?!0:e}function lt(e,t,n){if(sn&&wt){let r=Fi.get(e);r||Fi.set(e,r=new Map);let o=r.get(n);o||r.set(n,o=Aa()),Ec(o)}}function Ec(e,t){let n=!1;Ir<=qi?gc(e)||(e.n|=dn,n=!bc(e)):n=!e.has(wt),n&&(e.add(wt),wt.deps.push(e))}function Vt(e,t,n,r,o,a){const s=Fi.get(e);if(!s)return;let p=[];if(t==="clear")p=[...s.values()];else if(n==="length"&&se(e)){const f=Number(r);s.forEach((h,b)=>{(b==="length"||b>=f)&&p.push(h)})}else switch(n!==void 0&&p.push(s.get(n)),t){case"add":se(e)?ya(n)&&p.push(s.get("length")):(p.push(s.get(bn)),Dn(e)&&p.push(s.get(Ui)));break;case"delete":se(e)||(p.push(s.get(bn)),Dn(e)&&p.push(s.get(Ui)));break;case"set":Dn(e)&&p.push(s.get(bn));break}if(p.length===1)p[0]&&Hi(p[0]);else{const f=[];for(const h of p)h&&f.push(...h);Hi(Aa(f))}}function Hi(e,t){const n=se(e)?e:[...e];for(const r of n)r.computed&&Sl(r);for(const r of n)r.computed||Sl(r)}function Sl(e,t){(e!==wt||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const Cf=pa("__proto__,__v_isRef,__isVue"),wc=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(ha)),Sf=ba(),Bf=ba(!1,!0),If=ba(!0),Bl=Tf();function Tf(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=we(this);for(let a=0,s=this.length;a<s;a++)lt(r,"get",a+"");const o=r[t](...n);return o===-1||o===!1?r[t](...n.map(we)):o}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){Zn();const r=we(this)[t].apply(this,n);return Jn(),r}}),e}function _f(e){const t=we(this);return lt(t,"has",e),t.hasOwnProperty(e)}function ba(e=!1,t=!1){return function(r,o,a){if(o==="__v_isReactive")return!e;if(o==="__v_isReadonly")return e;if(o==="__v_isShallow")return t;if(o==="__v_raw"&&a===(e?t?$f:Bc:t?Sc:Cc).get(r))return r;const s=se(r);if(!e){if(s&&be(Bl,o))return Reflect.get(Bl,o,a);if(o==="hasOwnProperty")return _f}const p=Reflect.get(r,o,a);return(ha(o)?wc.has(o):Cf(o))||(e||lt(r,"get",o),t)?p:tt(p)?s&&ya(o)?p:p.value:je(p)?e?Tc(p):$o(p):p}}const Of=xc(),Lf=xc(!0);function xc(e=!1){return function(n,r,o,a){let s=n[r];if(Un(s)&&tt(s)&&!tt(o))return!1;if(!e&&(!Lo(o)&&!Un(o)&&(s=we(s),o=we(o)),!se(n)&&tt(s)&&!tt(o)))return s.value=o,!0;const p=se(n)&&ya(r)?Number(r)<n.length:be(n,r),f=Reflect.set(n,r,o,a);return n===we(a)&&(p?Dr(o,s)&&Vt(n,"set",r,o):Vt(n,"add",r,o)),f}}function Rf(e,t){const n=be(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&Vt(e,"delete",t,void 0),r}function Pf(e,t){const n=Reflect.has(e,t);return(!ha(t)||!wc.has(t))&&lt(e,"has",t),n}function jf(e){return lt(e,"iterate",se(e)?"length":bn),Reflect.ownKeys(e)}const kc={get:Sf,set:Of,deleteProperty:Rf,has:Pf,ownKeys:jf},zf={get:If,set(e,t){return!0},deleteProperty(e,t){return!0}},Df=Qe({},kc,{get:Bf,set:Lf}),ga=e=>e,Yo=e=>Reflect.getPrototypeOf(e);function lo(e,t,n=!1,r=!1){e=e.__v_raw;const o=we(e),a=we(t);n||(t!==a&&lt(o,"get",t),lt(o,"get",a));const{has:s}=Yo(o),p=r?ga:n?wa:Mr;if(s.call(o,t))return p(e.get(t));if(s.call(o,a))return p(e.get(a));e!==o&&e.get(t)}function so(e,t=!1){const n=this.__v_raw,r=we(n),o=we(e);return t||(e!==o&&lt(r,"has",e),lt(r,"has",o)),e===o?n.has(e):n.has(e)||n.has(o)}function co(e,t=!1){return e=e.__v_raw,!t&&lt(we(e),"iterate",bn),Reflect.get(e,"size",e)}function Il(e){e=we(e);const t=we(this);return Yo(t).has.call(t,e)||(t.add(e),Vt(t,"add",e,e)),this}function Tl(e,t){t=we(t);const n=we(this),{has:r,get:o}=Yo(n);let a=r.call(n,e);a||(e=we(e),a=r.call(n,e));const s=o.call(n,e);return n.set(e,t),a?Dr(t,s)&&Vt(n,"set",e,t):Vt(n,"add",e,t),this}function _l(e){const t=we(this),{has:n,get:r}=Yo(t);let o=n.call(t,e);o||(e=we(e),o=n.call(t,e)),r&&r.call(t,e);const a=t.delete(e);return o&&Vt(t,"delete",e,void 0),a}function Ol(){const e=we(this),t=e.size!==0,n=e.clear();return t&&Vt(e,"clear",void 0,void 0),n}function po(e,t){return function(r,o){const a=this,s=a.__v_raw,p=we(s),f=t?ga:e?wa:Mr;return!e&&lt(p,"iterate",bn),s.forEach((h,b)=>r.call(o,f(h),f(b),a))}}function uo(e,t,n){return function(...r){const o=this.__v_raw,a=we(o),s=Dn(a),p=e==="entries"||e===Symbol.iterator&&s,f=e==="keys"&&s,h=o[e](...r),b=n?ga:t?wa:Mr;return!t&&lt(a,"iterate",f?Ui:bn),{next(){const{value:g,done:A}=h.next();return A?{value:g,done:A}:{value:p?[b(g[0]),b(g[1])]:b(g),done:A}},[Symbol.iterator](){return this}}}}function nn(e){return function(...t){return e==="delete"?!1:this}}function Nf(){const e={get(a){return lo(this,a)},get size(){return co(this)},has:so,add:Il,set:Tl,delete:_l,clear:Ol,forEach:po(!1,!1)},t={get(a){return lo(this,a,!1,!0)},get size(){return co(this)},has:so,add:Il,set:Tl,delete:_l,clear:Ol,forEach:po(!1,!0)},n={get(a){return lo(this,a,!0)},get size(){return co(this,!0)},has(a){return so.call(this,a,!0)},add:nn("add"),set:nn("set"),delete:nn("delete"),clear:nn("clear"),forEach:po(!0,!1)},r={get(a){return lo(this,a,!0,!0)},get size(){return co(this,!0)},has(a){return so.call(this,a,!0)},add:nn("add"),set:nn("set"),delete:nn("delete"),clear:nn("clear"),forEach:po(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(a=>{e[a]=uo(a,!1,!1),n[a]=uo(a,!0,!1),t[a]=uo(a,!1,!0),r[a]=uo(a,!0,!0)}),[e,n,t,r]}const[Mf,Ff,qf,Uf]=Nf();function va(e,t){const n=t?e?Uf:qf:e?Ff:Mf;return(r,o,a)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?r:Reflect.get(be(n,o)&&o in r?n:r,o,a)}const Hf={get:va(!1,!1)},Wf={get:va(!1,!0)},Yf={get:va(!0,!1)},Cc=new WeakMap,Sc=new WeakMap,Bc=new WeakMap,$f=new WeakMap;function Kf(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Vf(e){return e.__v_skip||!Object.isExtensible(e)?0:Kf(df(e))}function $o(e){return Un(e)?e:Ea(e,!1,kc,Hf,Cc)}function Ic(e){return Ea(e,!1,Df,Wf,Sc)}function Tc(e){return Ea(e,!0,zf,Yf,Bc)}function Ea(e,t,n,r,o){if(!je(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const a=o.get(e);if(a)return a;const s=Vf(e);if(s===0)return e;const p=new Proxy(e,s===2?r:n);return o.set(e,p),p}function Nn(e){return Un(e)?Nn(e.__v_raw):!!(e&&e.__v_isReactive)}function Un(e){return!!(e&&e.__v_isReadonly)}function Lo(e){return!!(e&&e.__v_isShallow)}function _c(e){return Nn(e)||Un(e)}function we(e){const t=e&&e.__v_raw;return t?we(t):e}function Oc(e){return Oo(e,"__v_skip",!0),e}const Mr=e=>je(e)?$o(e):e,wa=e=>je(e)?Tc(e):e;function Lc(e){sn&&wt&&(e=we(e),Ec(e.dep||(e.dep=Aa())))}function Rc(e,t){e=we(e);const n=e.dep;n&&Hi(n)}function tt(e){return!!(e&&e.__v_isRef===!0)}function $t(e){return Pc(e,!1)}function Qf(e){return Pc(e,!0)}function Pc(e,t){return tt(e)?e:new Xf(e,t)}class Xf{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:we(t),this._value=n?t:Mr(t)}get value(){return Lc(this),this._value}set value(t){const n=this.__v_isShallow||Lo(t)||Un(t);t=n?t:we(t),Dr(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:Mr(t),Rc(this))}}function at(e){return tt(e)?e.value:e}const Zf={get:(e,t,n)=>at(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const o=e[t];return tt(o)&&!tt(n)?(o.value=n,!0):Reflect.set(e,t,n,r)}};function jc(e){return Nn(e)?e:new Proxy(e,Zf)}class Jf{constructor(t,n,r,o){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new ma(t,()=>{this._dirty||(this._dirty=!0,Rc(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!o,this.__v_isReadonly=r}get value(){const t=we(this);return Lc(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}function Gf(e,t,n=!1){let r,o;const a=pe(e);return a?(r=e,o=Bt):(r=e.get,o=e.set),new Jf(r,o,a||!o,n)}function cn(e,t,n,r){let o;try{o=r?e(...r):e()}catch(a){Ko(a,t,n)}return o}function It(e,t,n,r){if(pe(e)){const a=cn(e,t,n,r);return a&&fc(a)&&a.catch(s=>{Ko(s,t,n)}),a}const o=[];for(let a=0;a<e.length;a++)o.push(It(e[a],t,n,r));return o}function Ko(e,t,n,r=!0){const o=t?t.vnode:null;if(t){let a=t.parent;const s=t.proxy,p=n;for(;a;){const h=a.ec;if(h){for(let b=0;b<h.length;b++)if(h[b](e,s,p)===!1)return}a=a.parent}const f=t.appContext.config.errorHandler;if(f){cn(f,null,10,[e,s,p]);return}}eh(e,n,o,r)}function eh(e,t,n,r=!0){console.error(e)}let Fr=!1,Wi=!1;const et=[];let jt=0;const Mn=[];let Yt=null,yn=0;const zc=Promise.resolve();let xa=null;function Dc(e){const t=xa||zc;return e?t.then(this?e.bind(this):e):t}function th(e){let t=jt+1,n=et.length;for(;t<n;){const r=t+n>>>1;qr(et[r])<e?t=r+1:n=r}return t}function ka(e){(!et.length||!et.includes(e,Fr&&e.allowRecurse?jt+1:jt))&&(e.id==null?et.push(e):et.splice(th(e.id),0,e),Nc())}function Nc(){!Fr&&!Wi&&(Wi=!0,xa=zc.then(Fc))}function nh(e){const t=et.indexOf(e);t>jt&&et.splice(t,1)}function rh(e){se(e)?Mn.push(...e):(!Yt||!Yt.includes(e,e.allowRecurse?yn+1:yn))&&Mn.push(e),Nc()}function Ll(e,t=Fr?jt+1:0){for(;t<et.length;t++){const n=et[t];n&&n.pre&&(et.splice(t,1),t--,n())}}function Mc(e){if(Mn.length){const t=[...new Set(Mn)];if(Mn.length=0,Yt){Yt.push(...t);return}for(Yt=t,Yt.sort((n,r)=>qr(n)-qr(r)),yn=0;yn<Yt.length;yn++)Yt[yn]();Yt=null,yn=0}}const qr=e=>e.id==null?1/0:e.id,oh=(e,t)=>{const n=qr(e)-qr(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function Fc(e){Wi=!1,Fr=!0,et.sort(oh);const t=Bt;try{for(jt=0;jt<et.length;jt++){const n=et[jt];n&&n.active!==!1&&cn(n,null,14)}}finally{jt=0,et.length=0,Mc(),Fr=!1,xa=null,(et.length||Mn.length)&&Fc()}}function ih(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||Pe;let o=n;const a=t.startsWith("update:"),s=a&&t.slice(7);if(s&&s in r){const b=`${s==="modelValue"?"model":s}Modifiers`,{number:g,trim:A}=r[b]||Pe;A&&(o=n.map(k=>Ye(k)?k.trim():k)),g&&(o=n.map(ff))}let p,f=r[p=Ei(t)]||r[p=Ei(Dt(t))];!f&&a&&(f=r[p=Ei(Xn(t))]),f&&It(f,e,6,o);const h=r[p+"Once"];if(h){if(!e.emitted)e.emitted={};else if(e.emitted[p])return;e.emitted[p]=!0,It(h,e,6,o)}}function qc(e,t,n=!1){const r=t.emitsCache,o=r.get(e);if(o!==void 0)return o;const a=e.emits;let s={},p=!1;if(!pe(e)){const f=h=>{const b=qc(h,t,!0);b&&(p=!0,Qe(s,b))};!n&&t.mixins.length&&t.mixins.forEach(f),e.extends&&f(e.extends),e.mixins&&e.mixins.forEach(f)}return!a&&!p?(je(e)&&r.set(e,null),null):(se(a)?a.forEach(f=>s[f]=null):Qe(s,a),je(e)&&r.set(e,s),s)}function Vo(e,t){return!e||!Fo(t)?!1:(t=t.slice(2).replace(/Once$/,""),be(e,t[0].toLowerCase()+t.slice(1))||be(e,Xn(t))||be(e,t))}let kt=null,Uc=null;function Ro(e){const t=kt;return kt=e,Uc=e&&e.type.__scopeId||null,t}function ah(e,t=kt,n){if(!t||e._n)return e;const r=(...o)=>{r._d&&Hl(-1);const a=Ro(t);let s;try{s=e(...o)}finally{Ro(a),r._d&&Hl(1)}return s};return r._n=!0,r._c=!0,r._d=!0,r}function ki(e){const{type:t,vnode:n,proxy:r,withProxy:o,props:a,propsOptions:[s],slots:p,attrs:f,emit:h,render:b,renderCache:g,data:A,setupState:k,ctx:S,inheritAttrs:C}=e;let I,O;const _=Ro(e);try{if(n.shapeFlag&4){const M=o||r;I=Pt(b.call(M,M,g,a,k,A,S)),O=f}else{const M=t;I=Pt(M.length>1?M(a,{attrs:f,slots:p,emit:h}):M(a,null)),O=t.props?f:lh(f)}}catch(M){Rr.length=0,Ko(M,e,1),I=G(wn)}let N=I;if(O&&C!==!1){const M=Object.keys(O),{shapeFlag:ye}=N;M.length&&ye&7&&(s&&M.some(ua)&&(O=sh(O,s)),N=Hn(N,O))}return n.dirs&&(N=Hn(N),N.dirs=N.dirs?N.dirs.concat(n.dirs):n.dirs),n.transition&&(N.transition=n.transition),I=N,Ro(_),I}const lh=e=>{let t;for(const n in e)(n==="class"||n==="style"||Fo(n))&&((t||(t={}))[n]=e[n]);return t},sh=(e,t)=>{const n={};for(const r in e)(!ua(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function ch(e,t,n){const{props:r,children:o,component:a}=e,{props:s,children:p,patchFlag:f}=t,h=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&f>=0){if(f&1024)return!0;if(f&16)return r?Rl(r,s,h):!!s;if(f&8){const b=t.dynamicProps;for(let g=0;g<b.length;g++){const A=b[g];if(s[A]!==r[A]&&!Vo(h,A))return!0}}}else return(o||p)&&(!p||!p.$stable)?!0:r===s?!1:r?s?Rl(r,s,h):!0:!!s;return!1}function Rl(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let o=0;o<r.length;o++){const a=r[o];if(t[a]!==e[a]&&!Vo(n,a))return!0}return!1}function dh({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent}const ph=e=>e.__isSuspense;function uh(e,t){t&&t.pendingBranch?se(e)?t.effects.push(...e):t.effects.push(e):rh(e)}const fo={};function Or(e,t,n){return Hc(e,t,n)}function Hc(e,t,{immediate:n,deep:r,flush:o,onTrack:a,onTrigger:s}=Pe){var p;const f=wf()===((p=Xe)==null?void 0:p.scope)?Xe:null;let h,b=!1,g=!1;if(tt(e)?(h=()=>e.value,b=Lo(e)):Nn(e)?(h=()=>e,r=!0):se(e)?(g=!0,b=e.some(M=>Nn(M)||Lo(M)),h=()=>e.map(M=>{if(tt(M))return M.value;if(Nn(M))return Ln(M);if(pe(M))return cn(M,f,2)})):pe(e)?t?h=()=>cn(e,f,2):h=()=>{if(!(f&&f.isUnmounted))return A&&A(),It(e,f,3,[k])}:h=Bt,t&&r){const M=h;h=()=>Ln(M())}let A,k=M=>{A=_.onStop=()=>{cn(M,f,4)}},S;if(Hr)if(k=Bt,t?n&&It(t,f,3,[h(),g?[]:void 0,k]):h(),o==="sync"){const M=oy();S=M.__watcherHandles||(M.__watcherHandles=[])}else return Bt;let C=g?new Array(e.length).fill(fo):fo;const I=()=>{if(_.active)if(t){const M=_.run();(r||b||(g?M.some((ye,me)=>Dr(ye,C[me])):Dr(M,C)))&&(A&&A(),It(t,f,3,[M,C===fo?void 0:g&&C[0]===fo?[]:C,k]),C=M)}else _.run()};I.allowRecurse=!!t;let O;o==="sync"?O=I:o==="post"?O=()=>ot(I,f&&f.suspense):(I.pre=!0,f&&(I.id=f.uid),O=()=>ka(I));const _=new ma(h,O);t?n?I():C=_.run():o==="post"?ot(_.run.bind(_),f&&f.suspense):_.run();const N=()=>{_.stop(),f&&f.scope&&fa(f.scope.effects,_)};return S&&S.push(N),N}function fh(e,t,n){const r=this.proxy,o=Ye(e)?e.includes(".")?Wc(r,e):()=>r[e]:e.bind(r,r);let a;pe(t)?a=t:(a=t.handler,n=t);const s=Xe;Wn(this);const p=Hc(o,a.bind(r),n);return s?Wn(s):vn(),p}function Wc(e,t){const n=t.split(".");return()=>{let r=e;for(let o=0;o<n.length&&r;o++)r=r[n[o]];return r}}function Ln(e,t){if(!je(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),tt(e))Ln(e.value,t);else if(se(e))for(let n=0;n<e.length;n++)Ln(e[n],t);else if(uc(e)||Dn(e))e.forEach(n=>{Ln(n,t)});else if(yc(e))for(const n in e)Ln(e[n],t);return e}function fn(e,t,n,r){const o=e.dirs,a=t&&t.dirs;for(let s=0;s<o.length;s++){const p=o[s];a&&(p.oldValue=a[s].value);let f=p.dir[r];f&&(Zn(),It(f,n,8,[e.el,p,e,t]),Jn())}}function Yc(e,t){return pe(e)?(()=>Qe({name:e.name},t,{setup:e}))():e}const vo=e=>!!e.type.__asyncLoader,$c=e=>e.type.__isKeepAlive;function hh(e,t){Kc(e,"a",t)}function yh(e,t){Kc(e,"da",t)}function Kc(e,t,n=Xe){const r=e.__wdc||(e.__wdc=()=>{let o=n;for(;o;){if(o.isDeactivated)return;o=o.parent}return e()});if(Qo(t,r,n),n){let o=n.parent;for(;o&&o.parent;)$c(o.parent.vnode)&&Ah(r,t,n,o),o=o.parent}}function Ah(e,t,n,r){const o=Qo(t,e,r,!0);Qc(()=>{fa(r[t],o)},n)}function Qo(e,t,n=Xe,r=!1){if(n){const o=n[e]||(n[e]=[]),a=t.__weh||(t.__weh=(...s)=>{if(n.isUnmounted)return;Zn(),Wn(n);const p=It(t,n,e,s);return vn(),Jn(),p});return r?o.unshift(a):o.push(a),a}}const Xt=e=>(t,n=Xe)=>(!Hr||e==="sp")&&Qo(e,(...r)=>t(...r),n),mh=Xt("bm"),Qr=Xt("m"),bh=Xt("bu"),gh=Xt("u"),Vc=Xt("bum"),Qc=Xt("um"),vh=Xt("sp"),Eh=Xt("rtg"),wh=Xt("rtc");function xh(e,t=Xe){Qo("ec",e,t)}const Xc="components";function kh(e,t){return Sh(Xc,e,!0,t)||e}const Ch=Symbol.for("v-ndc");function Sh(e,t,n=!0,r=!1){const o=kt||Xe;if(o){const a=o.type;if(e===Xc){const p=ty(a,!1);if(p&&(p===t||p===Dt(t)||p===Ho(Dt(t))))return a}const s=Pl(o[e]||a[e],t)||Pl(o.appContext[e],t);return!s&&r?a:s}}function Pl(e,t){return e&&(e[t]||e[Dt(t)]||e[Ho(Dt(t))])}function Ci(e,t,n,r){let o;const a=n&&n[r];if(se(e)||Ye(e)){o=new Array(e.length);for(let s=0,p=e.length;s<p;s++)o[s]=t(e[s],s,void 0,a&&a[s])}else if(typeof e=="number"){o=new Array(e);for(let s=0;s<e;s++)o[s]=t(s+1,s,void 0,a&&a[s])}else if(je(e))if(e[Symbol.iterator])o=Array.from(e,(s,p)=>t(s,p,void 0,a&&a[p]));else{const s=Object.keys(e);o=new Array(s.length);for(let p=0,f=s.length;p<f;p++){const h=s[p];o[p]=t(e[h],h,p,a&&a[p])}}else o=[];return n&&(n[r]=o),o}const Yi=e=>e?sd(e)?Ta(e)||e.proxy:Yi(e.parent):null,Lr=Qe(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Yi(e.parent),$root:e=>Yi(e.root),$emit:e=>e.emit,$options:e=>Ca(e),$forceUpdate:e=>e.f||(e.f=()=>ka(e.update)),$nextTick:e=>e.n||(e.n=Dc.bind(e.proxy)),$watch:e=>fh.bind(e)}),Si=(e,t)=>e!==Pe&&!e.__isScriptSetup&&be(e,t),Bh={get({_:e},t){const{ctx:n,setupState:r,data:o,props:a,accessCache:s,type:p,appContext:f}=e;let h;if(t[0]!=="$"){const k=s[t];if(k!==void 0)switch(k){case 1:return r[t];case 2:return o[t];case 4:return n[t];case 3:return a[t]}else{if(Si(r,t))return s[t]=1,r[t];if(o!==Pe&&be(o,t))return s[t]=2,o[t];if((h=e.propsOptions[0])&&be(h,t))return s[t]=3,a[t];if(n!==Pe&&be(n,t))return s[t]=4,n[t];$i&&(s[t]=0)}}const b=Lr[t];let g,A;if(b)return t==="$attrs"&&lt(e,"get",t),b(e);if((g=p.__cssModules)&&(g=g[t]))return g;if(n!==Pe&&be(n,t))return s[t]=4,n[t];if(A=f.config.globalProperties,be(A,t))return A[t]},set({_:e},t,n){const{data:r,setupState:o,ctx:a}=e;return Si(o,t)?(o[t]=n,!0):r!==Pe&&be(r,t)?(r[t]=n,!0):be(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(a[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:o,propsOptions:a}},s){let p;return!!n[s]||e!==Pe&&be(e,s)||Si(t,s)||(p=a[0])&&be(p,s)||be(r,s)||be(Lr,s)||be(o.config.globalProperties,s)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:be(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function jl(e){return se(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let $i=!0;function Ih(e){const t=Ca(e),n=e.proxy,r=e.ctx;$i=!1,t.beforeCreate&&zl(t.beforeCreate,e,"bc");const{data:o,computed:a,methods:s,watch:p,provide:f,inject:h,created:b,beforeMount:g,mounted:A,beforeUpdate:k,updated:S,activated:C,deactivated:I,beforeDestroy:O,beforeUnmount:_,destroyed:N,unmounted:M,render:ye,renderTracked:me,renderTriggered:Ue,errorCaptured:Ke,serverPrefetch:nt,expose:ce,inheritAttrs:At,components:mt,directives:Ze,filters:Mt}=t;if(h&&Th(h,r,null),s)for(const ke in s){const Ae=s[ke];pe(Ae)&&(r[ke]=Ae.bind(n))}if(o){const ke=o.call(n,n);je(ke)&&(e.data=$o(ke))}if($i=!0,a)for(const ke in a){const Ae=a[ke],te=pe(Ae)?Ae.bind(n,n):pe(Ae.get)?Ae.get.bind(n,n):Bt,bt=!pe(Ae)&&pe(Ae.set)?Ae.set.bind(n):Bt,Je=xt({get:te,set:bt});Object.defineProperty(r,ke,{enumerable:!0,configurable:!0,get:()=>Je.value,set:Ve=>Je.value=Ve})}if(p)for(const ke in p)Zc(p[ke],r,n,ke);if(f){const ke=pe(f)?f.call(n):f;Reflect.ownKeys(ke).forEach(Ae=>{Eo(Ae,ke[Ae])})}b&&zl(b,e,"c");function Me(ke,Ae){se(Ae)?Ae.forEach(te=>ke(te.bind(n))):Ae&&ke(Ae.bind(n))}if(Me(mh,g),Me(Qr,A),Me(bh,k),Me(gh,S),Me(hh,C),Me(yh,I),Me(xh,Ke),Me(wh,me),Me(Eh,Ue),Me(Vc,_),Me(Qc,M),Me(vh,nt),se(ce))if(ce.length){const ke=e.exposed||(e.exposed={});ce.forEach(Ae=>{Object.defineProperty(ke,Ae,{get:()=>n[Ae],set:te=>n[Ae]=te})})}else e.exposed||(e.exposed={});ye&&e.render===Bt&&(e.render=ye),At!=null&&(e.inheritAttrs=At),mt&&(e.components=mt),Ze&&(e.directives=Ze)}function Th(e,t,n=Bt){se(e)&&(e=Ki(e));for(const r in e){const o=e[r];let a;je(o)?"default"in o?a=ht(o.from||r,o.default,!0):a=ht(o.from||r):a=ht(o),tt(a)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>a.value,set:s=>a.value=s}):t[r]=a}}function zl(e,t,n){It(se(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function Zc(e,t,n,r){const o=r.includes(".")?Wc(n,r):()=>n[r];if(Ye(e)){const a=t[e];pe(a)&&Or(o,a)}else if(pe(e))Or(o,e.bind(n));else if(je(e))if(se(e))e.forEach(a=>Zc(a,t,n,r));else{const a=pe(e.handler)?e.handler.bind(n):t[e.handler];pe(a)&&Or(o,a,e)}}function Ca(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:o,optionsCache:a,config:{optionMergeStrategies:s}}=e.appContext,p=a.get(t);let f;return p?f=p:!o.length&&!n&&!r?f=t:(f={},o.length&&o.forEach(h=>Po(f,h,s,!0)),Po(f,t,s)),je(t)&&a.set(t,f),f}function Po(e,t,n,r=!1){const{mixins:o,extends:a}=t;a&&Po(e,a,n,!0),o&&o.forEach(s=>Po(e,s,n,!0));for(const s in t)if(!(r&&s==="expose")){const p=_h[s]||n&&n[s];e[s]=p?p(e[s],t[s]):t[s]}return e}const _h={data:Dl,props:Nl,emits:Nl,methods:Tr,computed:Tr,beforeCreate:rt,created:rt,beforeMount:rt,mounted:rt,beforeUpdate:rt,updated:rt,beforeDestroy:rt,beforeUnmount:rt,destroyed:rt,unmounted:rt,activated:rt,deactivated:rt,errorCaptured:rt,serverPrefetch:rt,components:Tr,directives:Tr,watch:Lh,provide:Dl,inject:Oh};function Dl(e,t){return t?e?function(){return Qe(pe(e)?e.call(this,this):e,pe(t)?t.call(this,this):t)}:t:e}function Oh(e,t){return Tr(Ki(e),Ki(t))}function Ki(e){if(se(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function rt(e,t){return e?[...new Set([].concat(e,t))]:t}function Tr(e,t){return e?Qe(Object.create(null),e,t):t}function Nl(e,t){return e?se(e)&&se(t)?[...new Set([...e,...t])]:Qe(Object.create(null),jl(e),jl(t??{})):t}function Lh(e,t){if(!e)return t;if(!t)return e;const n=Qe(Object.create(null),e);for(const r in t)n[r]=rt(e[r],t[r]);return n}function Jc(){return{app:null,config:{isNativeTag:lf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Rh=0;function Ph(e,t){return function(r,o=null){pe(r)||(r=Qe({},r)),o!=null&&!je(o)&&(o=null);const a=Jc(),s=new Set;let p=!1;const f=a.app={_uid:Rh++,_component:r,_props:o,_container:null,_context:a,_instance:null,version:iy,get config(){return a.config},set config(h){},use(h,...b){return s.has(h)||(h&&pe(h.install)?(s.add(h),h.install(f,...b)):pe(h)&&(s.add(h),h(f,...b))),f},mixin(h){return a.mixins.includes(h)||a.mixins.push(h),f},component(h,b){return b?(a.components[h]=b,f):a.components[h]},directive(h,b){return b?(a.directives[h]=b,f):a.directives[h]},mount(h,b,g){if(!p){const A=G(r,o);return A.appContext=a,b&&t?t(A,h):e(A,h,g),p=!0,f._container=h,h.__vue_app__=f,Ta(A.component)||A.component.proxy}},unmount(){p&&(e(null,f._container),delete f._container.__vue_app__)},provide(h,b){return a.provides[h]=b,f},runWithContext(h){jo=f;try{return h()}finally{jo=null}}};return f}}let jo=null;function Eo(e,t){if(Xe){let n=Xe.provides;const r=Xe.parent&&Xe.parent.provides;r===n&&(n=Xe.provides=Object.create(r)),n[e]=t}}function ht(e,t,n=!1){const r=Xe||kt;if(r||jo){const o=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:jo._context.provides;if(o&&e in o)return o[e];if(arguments.length>1)return n&&pe(t)?t.call(r&&r.proxy):t}}function jh(e,t,n,r=!1){const o={},a={};Oo(a,Zo,1),e.propsDefaults=Object.create(null),Gc(e,t,o,a);for(const s in e.propsOptions[0])s in o||(o[s]=void 0);n?e.props=r?o:Ic(o):e.type.props?e.props=o:e.props=a,e.attrs=a}function zh(e,t,n,r){const{props:o,attrs:a,vnode:{patchFlag:s}}=e,p=we(o),[f]=e.propsOptions;let h=!1;if((r||s>0)&&!(s&16)){if(s&8){const b=e.vnode.dynamicProps;for(let g=0;g<b.length;g++){let A=b[g];if(Vo(e.emitsOptions,A))continue;const k=t[A];if(f)if(be(a,A))k!==a[A]&&(a[A]=k,h=!0);else{const S=Dt(A);o[S]=Vi(f,p,S,k,e,!1)}else k!==a[A]&&(a[A]=k,h=!0)}}}else{Gc(e,t,o,a)&&(h=!0);let b;for(const g in p)(!t||!be(t,g)&&((b=Xn(g))===g||!be(t,b)))&&(f?n&&(n[g]!==void 0||n[b]!==void 0)&&(o[g]=Vi(f,p,g,void 0,e,!0)):delete o[g]);if(a!==p)for(const g in a)(!t||!be(t,g))&&(delete a[g],h=!0)}h&&Vt(e,"set","$attrs")}function Gc(e,t,n,r){const[o,a]=e.propsOptions;let s=!1,p;if(t)for(let f in t){if(go(f))continue;const h=t[f];let b;o&&be(o,b=Dt(f))?!a||!a.includes(b)?n[b]=h:(p||(p={}))[b]=h:Vo(e.emitsOptions,f)||(!(f in r)||h!==r[f])&&(r[f]=h,s=!0)}if(a){const f=we(n),h=p||Pe;for(let b=0;b<a.length;b++){const g=a[b];n[g]=Vi(o,f,g,h[g],e,!be(h,g))}}return s}function Vi(e,t,n,r,o,a){const s=e[n];if(s!=null){const p=be(s,"default");if(p&&r===void 0){const f=s.default;if(s.type!==Function&&!s.skipFactory&&pe(f)){const{propsDefaults:h}=o;n in h?r=h[n]:(Wn(o),r=h[n]=f.call(null,t),vn())}else r=f}s[0]&&(a&&!p?r=!1:s[1]&&(r===""||r===Xn(n))&&(r=!0))}return r}function ed(e,t,n=!1){const r=t.propsCache,o=r.get(e);if(o)return o;const a=e.props,s={},p=[];let f=!1;if(!pe(e)){const b=g=>{f=!0;const[A,k]=ed(g,t,!0);Qe(s,A),k&&p.push(...k)};!n&&t.mixins.length&&t.mixins.forEach(b),e.extends&&b(e.extends),e.mixins&&e.mixins.forEach(b)}if(!a&&!f)return je(e)&&r.set(e,zn),zn;if(se(a))for(let b=0;b<a.length;b++){const g=Dt(a[b]);Ml(g)&&(s[g]=Pe)}else if(a)for(const b in a){const g=Dt(b);if(Ml(g)){const A=a[b],k=s[g]=se(A)||pe(A)?{type:A}:Qe({},A);if(k){const S=Ul(Boolean,k.type),C=Ul(String,k.type);k[0]=S>-1,k[1]=C<0||S<C,(S>-1||be(k,"default"))&&p.push(g)}}}const h=[s,p];return je(e)&&r.set(e,h),h}function Ml(e){return e[0]!=="$"}function Fl(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function ql(e,t){return Fl(e)===Fl(t)}function Ul(e,t){return se(t)?t.findIndex(n=>ql(n,e)):pe(t)&&ql(t,e)?0:-1}const td=e=>e[0]==="_"||e==="$stable",Sa=e=>se(e)?e.map(Pt):[Pt(e)],Dh=(e,t,n)=>{if(t._n)return t;const r=ah((...o)=>Sa(t(...o)),n);return r._c=!1,r},nd=(e,t,n)=>{const r=e._ctx;for(const o in e){if(td(o))continue;const a=e[o];if(pe(a))t[o]=Dh(o,a,r);else if(a!=null){const s=Sa(a);t[o]=()=>s}}},rd=(e,t)=>{const n=Sa(t);e.slots.default=()=>n},Nh=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=we(t),Oo(t,"_",n)):nd(t,e.slots={})}else e.slots={},t&&rd(e,t);Oo(e.slots,Zo,1)},Mh=(e,t,n)=>{const{vnode:r,slots:o}=e;let a=!0,s=Pe;if(r.shapeFlag&32){const p=t._;p?n&&p===1?a=!1:(Qe(o,t),!n&&p===1&&delete o._):(a=!t.$stable,nd(t,o)),s=t}else t&&(rd(e,t),s={default:1});if(a)for(const p in o)!td(p)&&!(p in s)&&delete o[p]};function Qi(e,t,n,r,o=!1){if(se(e)){e.forEach((A,k)=>Qi(A,t&&(se(t)?t[k]:t),n,r,o));return}if(vo(r)&&!o)return;const a=r.shapeFlag&4?Ta(r.component)||r.component.proxy:r.el,s=o?null:a,{i:p,r:f}=e,h=t&&t.r,b=p.refs===Pe?p.refs={}:p.refs,g=p.setupState;if(h!=null&&h!==f&&(Ye(h)?(b[h]=null,be(g,h)&&(g[h]=null)):tt(h)&&(h.value=null)),pe(f))cn(f,p,12,[s,b]);else{const A=Ye(f),k=tt(f);if(A||k){const S=()=>{if(e.f){const C=A?be(g,f)?g[f]:b[f]:f.value;o?se(C)&&fa(C,a):se(C)?C.includes(a)||C.push(a):A?(b[f]=[a],be(g,f)&&(g[f]=b[f])):(f.value=[a],e.k&&(b[e.k]=f.value))}else A?(b[f]=s,be(g,f)&&(g[f]=s)):k&&(f.value=s,e.k&&(b[e.k]=s))};s?(S.id=-1,ot(S,n)):S()}}}const ot=uh;function Fh(e){return qh(e)}function qh(e,t){const n=Mi();n.__VUE__=!0;const{insert:r,remove:o,patchProp:a,createElement:s,createText:p,createComment:f,setText:h,setElementText:b,parentNode:g,nextSibling:A,setScopeId:k=Bt,insertStaticContent:S}=e,C=(w,x,B,R=null,D=null,q=null,X=!1,U=null,$=!!x.dynamicChildren)=>{if(w===x)return;w&&!kr(w,x)&&(R=z(w),Ve(w,D,q,!0),w=null),x.patchFlag===-2&&($=!1,x.dynamicChildren=null);const{type:F,ref:re,shapeFlag:J}=x;switch(F){case Xo:I(w,x,B,R);break;case wn:O(w,x,B,R);break;case Bi:w==null&&_(x,B,R,X);break;case ut:mt(w,x,B,R,D,q,X,U,$);break;default:J&1?ye(w,x,B,R,D,q,X,U,$):J&6?Ze(w,x,B,R,D,q,X,U,$):(J&64||J&128)&&F.process(w,x,B,R,D,q,X,U,$,W)}re!=null&&D&&Qi(re,w&&w.ref,q,x||w,!x)},I=(w,x,B,R)=>{if(w==null)r(x.el=p(x.children),B,R);else{const D=x.el=w.el;x.children!==w.children&&h(D,x.children)}},O=(w,x,B,R)=>{w==null?r(x.el=f(x.children||""),B,R):x.el=w.el},_=(w,x,B,R)=>{[w.el,w.anchor]=S(w.children,x,B,R,w.el,w.anchor)},N=({el:w,anchor:x},B,R)=>{let D;for(;w&&w!==x;)D=A(w),r(w,B,R),w=D;r(x,B,R)},M=({el:w,anchor:x})=>{let B;for(;w&&w!==x;)B=A(w),o(w),w=B;o(x)},ye=(w,x,B,R,D,q,X,U,$)=>{X=X||x.type==="svg",w==null?me(x,B,R,D,q,X,U,$):nt(w,x,D,q,X,U,$)},me=(w,x,B,R,D,q,X,U)=>{let $,F;const{type:re,props:J,shapeFlag:oe,transition:ie,dirs:ue}=w;if($=w.el=s(w.type,q,J&&J.is,J),oe&8?b($,w.children):oe&16&&Ke(w.children,$,null,R,D,q&&re!=="foreignObject",X,U),ue&&fn(w,null,R,"created"),Ue($,w,w.scopeId,X,R),J){for(const xe in J)xe!=="value"&&!go(xe)&&a($,xe,null,J[xe],q,w.children,R,D,_e);"value"in J&&a($,"value",null,J.value),(F=J.onVnodeBeforeMount)&&Lt(F,R,w)}ue&&fn(w,null,R,"beforeMount");const Se=(!D||D&&!D.pendingBranch)&&ie&&!ie.persisted;Se&&ie.beforeEnter($),r($,x,B),((F=J&&J.onVnodeMounted)||Se||ue)&&ot(()=>{F&&Lt(F,R,w),Se&&ie.enter($),ue&&fn(w,null,R,"mounted")},D)},Ue=(w,x,B,R,D)=>{if(B&&k(w,B),R)for(let q=0;q<R.length;q++)k(w,R[q]);if(D){let q=D.subTree;if(x===q){const X=D.vnode;Ue(w,X,X.scopeId,X.slotScopeIds,D.parent)}}},Ke=(w,x,B,R,D,q,X,U,$=0)=>{for(let F=$;F<w.length;F++){const re=w[F]=U?an(w[F]):Pt(w[F]);C(null,re,x,B,R,D,q,X,U)}},nt=(w,x,B,R,D,q,X)=>{const U=x.el=w.el;let{patchFlag:$,dynamicChildren:F,dirs:re}=x;$|=w.patchFlag&16;const J=w.props||Pe,oe=x.props||Pe;let ie;B&&hn(B,!1),(ie=oe.onVnodeBeforeUpdate)&&Lt(ie,B,x,w),re&&fn(x,w,B,"beforeUpdate"),B&&hn(B,!0);const ue=D&&x.type!=="foreignObject";if(F?ce(w.dynamicChildren,F,U,B,R,ue,q):X||Ae(w,x,U,null,B,R,ue,q,!1),$>0){if($&16)At(U,x,J,oe,B,R,D);else if($&2&&J.class!==oe.class&&a(U,"class",null,oe.class,D),$&4&&a(U,"style",J.style,oe.style,D),$&8){const Se=x.dynamicProps;for(let xe=0;xe<Se.length;xe++){const ze=Se[xe],st=J[ze],qt=oe[ze];(qt!==st||ze==="value")&&a(U,ze,st,qt,D,w.children,B,R,_e)}}$&1&&w.children!==x.children&&b(U,x.children)}else!X&&F==null&&At(U,x,J,oe,B,R,D);((ie=oe.onVnodeUpdated)||re)&&ot(()=>{ie&&Lt(ie,B,x,w),re&&fn(x,w,B,"updated")},R)},ce=(w,x,B,R,D,q,X)=>{for(let U=0;U<x.length;U++){const $=w[U],F=x[U],re=$.el&&($.type===ut||!kr($,F)||$.shapeFlag&70)?g($.el):B;C($,F,re,null,R,D,q,X,!0)}},At=(w,x,B,R,D,q,X)=>{if(B!==R){if(B!==Pe)for(const U in B)!go(U)&&!(U in R)&&a(w,U,B[U],null,X,x.children,D,q,_e);for(const U in R){if(go(U))continue;const $=R[U],F=B[U];$!==F&&U!=="value"&&a(w,U,F,$,X,x.children,D,q,_e)}"value"in R&&a(w,"value",B.value,R.value)}},mt=(w,x,B,R,D,q,X,U,$)=>{const F=x.el=w?w.el:p(""),re=x.anchor=w?w.anchor:p("");let{patchFlag:J,dynamicChildren:oe,slotScopeIds:ie}=x;ie&&(U=U?U.concat(ie):ie),w==null?(r(F,B,R),r(re,B,R),Ke(x.children,B,re,D,q,X,U,$)):J>0&&J&64&&oe&&w.dynamicChildren?(ce(w.dynamicChildren,oe,B,D,q,X,U),(x.key!=null||D&&x===D.subTree)&&od(w,x,!0)):Ae(w,x,B,re,D,q,X,U,$)},Ze=(w,x,B,R,D,q,X,U,$)=>{x.slotScopeIds=U,w==null?x.shapeFlag&512?D.ctx.activate(x,B,R,X,$):Mt(x,B,R,D,q,X,$):Zt(w,x,$)},Mt=(w,x,B,R,D,q,X)=>{const U=w.component=Xh(w,R,D);if($c(w)&&(U.ctx.renderer=W),Zh(U),U.asyncDep){if(D&&D.registerDep(U,Me),!w.el){const $=U.subTree=G(wn);O(null,$,x,B)}return}Me(U,w,x,B,D,q,X)},Zt=(w,x,B)=>{const R=x.component=w.component;if(ch(w,x,B))if(R.asyncDep&&!R.asyncResolved){ke(R,x,B);return}else R.next=x,nh(R.update),R.update();else x.el=w.el,R.vnode=x},Me=(w,x,B,R,D,q,X)=>{const U=()=>{if(w.isMounted){let{next:re,bu:J,u:oe,parent:ie,vnode:ue}=w,Se=re,xe;hn(w,!1),re?(re.el=ue.el,ke(w,re,X)):re=ue,J&&wi(J),(xe=re.props&&re.props.onVnodeBeforeUpdate)&&Lt(xe,ie,re,ue),hn(w,!0);const ze=ki(w),st=w.subTree;w.subTree=ze,C(st,ze,g(st.el),z(st),w,D,q),re.el=ze.el,Se===null&&dh(w,ze.el),oe&&ot(oe,D),(xe=re.props&&re.props.onVnodeUpdated)&&ot(()=>Lt(xe,ie,re,ue),D)}else{let re;const{el:J,props:oe}=x,{bm:ie,m:ue,parent:Se}=w,xe=vo(x);if(hn(w,!1),ie&&wi(ie),!xe&&(re=oe&&oe.onVnodeBeforeMount)&&Lt(re,Se,x),hn(w,!0),J&&ve){const ze=()=>{w.subTree=ki(w),ve(J,w.subTree,w,D,null)};xe?x.type.__asyncLoader().then(()=>!w.isUnmounted&&ze()):ze()}else{const ze=w.subTree=ki(w);C(null,ze,B,R,w,D,q),x.el=ze.el}if(ue&&ot(ue,D),!xe&&(re=oe&&oe.onVnodeMounted)){const ze=x;ot(()=>Lt(re,Se,ze),D)}(x.shapeFlag&256||Se&&vo(Se.vnode)&&Se.vnode.shapeFlag&256)&&w.a&&ot(w.a,D),w.isMounted=!0,x=B=R=null}},$=w.effect=new ma(U,()=>ka(F),w.scope),F=w.update=()=>$.run();F.id=w.uid,hn(w,!0),F()},ke=(w,x,B)=>{x.component=w;const R=w.vnode.props;w.vnode=x,w.next=null,zh(w,x.props,R,B),Mh(w,x.children,B),Zn(),Ll(),Jn()},Ae=(w,x,B,R,D,q,X,U,$=!1)=>{const F=w&&w.children,re=w?w.shapeFlag:0,J=x.children,{patchFlag:oe,shapeFlag:ie}=x;if(oe>0){if(oe&128){bt(F,J,B,R,D,q,X,U,$);return}else if(oe&256){te(F,J,B,R,D,q,X,U,$);return}}ie&8?(re&16&&_e(F,D,q),J!==F&&b(B,J)):re&16?ie&16?bt(F,J,B,R,D,q,X,U,$):_e(F,D,q,!0):(re&8&&b(B,""),ie&16&&Ke(J,B,R,D,q,X,U,$))},te=(w,x,B,R,D,q,X,U,$)=>{w=w||zn,x=x||zn;const F=w.length,re=x.length,J=Math.min(F,re);let oe;for(oe=0;oe<J;oe++){const ie=x[oe]=$?an(x[oe]):Pt(x[oe]);C(w[oe],ie,B,null,D,q,X,U,$)}F>re?_e(w,D,q,!0,!1,J):Ke(x,B,R,D,q,X,U,$,J)},bt=(w,x,B,R,D,q,X,U,$)=>{let F=0;const re=x.length;let J=w.length-1,oe=re-1;for(;F<=J&&F<=oe;){const ie=w[F],ue=x[F]=$?an(x[F]):Pt(x[F]);if(kr(ie,ue))C(ie,ue,B,null,D,q,X,U,$);else break;F++}for(;F<=J&&F<=oe;){const ie=w[J],ue=x[oe]=$?an(x[oe]):Pt(x[oe]);if(kr(ie,ue))C(ie,ue,B,null,D,q,X,U,$);else break;J--,oe--}if(F>J){if(F<=oe){const ie=oe+1,ue=ie<re?x[ie].el:R;for(;F<=oe;)C(null,x[F]=$?an(x[F]):Pt(x[F]),B,ue,D,q,X,U,$),F++}}else if(F>oe)for(;F<=J;)Ve(w[F],D,q,!0),F++;else{const ie=F,ue=F,Se=new Map;for(F=ue;F<=oe;F++){const Ge=x[F]=$?an(x[F]):Pt(x[F]);Ge.key!=null&&Se.set(Ge.key,F)}let xe,ze=0;const st=oe-ue+1;let qt=!1,P=0;const dt=new Array(st);for(F=0;F<st;F++)dt[F]=0;for(F=ie;F<=J;F++){const Ge=w[F];if(ze>=st){Ve(Ge,D,q,!0);continue}let fe;if(Ge.key!=null)fe=Se.get(Ge.key);else for(xe=ue;xe<=oe;xe++)if(dt[xe-ue]===0&&kr(Ge,x[xe])){fe=xe;break}fe===void 0?Ve(Ge,D,q,!0):(dt[fe-ue]=F+1,fe>=P?P=fe:qt=!0,C(Ge,x[fe],B,null,D,q,X,U,$),ze++)}const er=qt?Uh(dt):zn;for(xe=er.length-1,F=st-1;F>=0;F--){const Ge=ue+F,fe=x[Ge],Jr=Ge+1<re?x[Ge+1].el:R;dt[F]===0?C(null,fe,B,Jr,D,q,X,U,$):qt&&(xe<0||F!==er[xe]?Je(fe,B,Jr,2):xe--)}}},Je=(w,x,B,R,D=null)=>{const{el:q,type:X,transition:U,children:$,shapeFlag:F}=w;if(F&6){Je(w.component.subTree,x,B,R);return}if(F&128){w.suspense.move(x,B,R);return}if(F&64){X.move(w,x,B,W);return}if(X===ut){r(q,x,B);for(let J=0;J<$.length;J++)Je($[J],x,B,R);r(w.anchor,x,B);return}if(X===Bi){N(w,x,B);return}if(R!==2&&F&1&&U)if(R===0)U.beforeEnter(q),r(q,x,B),ot(()=>U.enter(q),D);else{const{leave:J,delayLeave:oe,afterLeave:ie}=U,ue=()=>r(q,x,B),Se=()=>{J(q,()=>{ue(),ie&&ie()})};oe?oe(q,ue,Se):Se()}else r(q,x,B)},Ve=(w,x,B,R=!1,D=!1)=>{const{type:q,props:X,ref:U,children:$,dynamicChildren:F,shapeFlag:re,patchFlag:J,dirs:oe}=w;if(U!=null&&Qi(U,null,B,w,!0),re&256){x.ctx.deactivate(w);return}const ie=re&1&&oe,ue=!vo(w);let Se;if(ue&&(Se=X&&X.onVnodeBeforeUnmount)&&Lt(Se,x,w),re&6)Jt(w.component,B,R);else{if(re&128){w.suspense.unmount(B,R);return}ie&&fn(w,null,x,"beforeUnmount"),re&64?w.type.remove(w,x,B,D,W,R):F&&(q!==ut||J>0&&J&64)?_e(F,x,B,!1,!0):(q===ut&&J&384||!D&&re&16)&&_e($,x,B),R&&Ft(w)}(ue&&(Se=X&&X.onVnodeUnmounted)||ie)&&ot(()=>{Se&&Lt(Se,x,w),ie&&fn(w,null,x,"unmounted")},B)},Ft=w=>{const{type:x,el:B,anchor:R,transition:D}=w;if(x===ut){_t(B,R);return}if(x===Bi){M(w);return}const q=()=>{o(B),D&&!D.persisted&&D.afterLeave&&D.afterLeave()};if(w.shapeFlag&1&&D&&!D.persisted){const{leave:X,delayLeave:U}=D,$=()=>X(B,q);U?U(w.el,q,$):$()}else q()},_t=(w,x)=>{let B;for(;w!==x;)B=A(w),o(w),w=B;o(x)},Jt=(w,x,B)=>{const{bum:R,scope:D,update:q,subTree:X,um:U}=w;R&&wi(R),D.stop(),q&&(q.active=!1,Ve(X,w,x,B)),U&&ot(U,x),ot(()=>{w.isUnmounted=!0},x),x&&x.pendingBranch&&!x.isUnmounted&&w.asyncDep&&!w.asyncResolved&&w.suspenseId===x.pendingId&&(x.deps--,x.deps===0&&x.resolve())},_e=(w,x,B,R=!1,D=!1,q=0)=>{for(let X=q;X<w.length;X++)Ve(w[X],x,B,R,D)},z=w=>w.shapeFlag&6?z(w.component.subTree):w.shapeFlag&128?w.suspense.next():A(w.anchor||w.el),Q=(w,x,B)=>{w==null?x._vnode&&Ve(x._vnode,null,null,!0):C(x._vnode||null,w,x,null,null,null,B),Ll(),Mc(),x._vnode=w},W={p:C,um:Ve,m:Je,r:Ft,mt:Mt,mc:Ke,pc:Ae,pbc:ce,n:z,o:e};let ne,ve;return t&&([ne,ve]=t(W)),{render:Q,hydrate:ne,createApp:Ph(Q,ne)}}function hn({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function od(e,t,n=!1){const r=e.children,o=t.children;if(se(r)&&se(o))for(let a=0;a<r.length;a++){const s=r[a];let p=o[a];p.shapeFlag&1&&!p.dynamicChildren&&((p.patchFlag<=0||p.patchFlag===32)&&(p=o[a]=an(o[a]),p.el=s.el),n||od(s,p)),p.type===Xo&&(p.el=s.el)}}function Uh(e){const t=e.slice(),n=[0];let r,o,a,s,p;const f=e.length;for(r=0;r<f;r++){const h=e[r];if(h!==0){if(o=n[n.length-1],e[o]<h){t[r]=o,n.push(r);continue}for(a=0,s=n.length-1;a<s;)p=a+s>>1,e[n[p]]<h?a=p+1:s=p;h<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,s=n[a-1];a-- >0;)n[a]=s,s=t[s];return n}const Hh=e=>e.__isTeleport,ut=Symbol.for("v-fgt"),Xo=Symbol.for("v-txt"),wn=Symbol.for("v-cmt"),Bi=Symbol.for("v-stc"),Rr=[];let Ct=null;function Re(e=!1){Rr.push(Ct=e?null:[])}function Wh(){Rr.pop(),Ct=Rr[Rr.length-1]||null}let Ur=1;function Hl(e){Ur+=e}function id(e){return e.dynamicChildren=Ur>0?Ct||zn:null,Wh(),Ur>0&&Ct&&Ct.push(e),e}function it(e,t,n,r,o,a){return id(gn(e,t,n,r,o,a,!0))}function Rt(e,t,n,r,o){return id(G(e,t,n,r,o,!0))}function Xi(e){return e?e.__v_isVNode===!0:!1}function kr(e,t){return e.type===t.type&&e.key===t.key}const Zo="__vInternal",ad=({key:e})=>e??null,wo=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?Ye(e)||tt(e)||pe(e)?{i:kt,r:e,k:t,f:!!n}:e:null);function gn(e,t=null,n=null,r=0,o=null,a=e===ut?0:1,s=!1,p=!1){const f={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&ad(t),ref:t&&wo(t),scopeId:Uc,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:kt};return p?(Ba(f,n),a&128&&e.normalize(f)):n&&(f.shapeFlag|=Ye(n)?8:16),Ur>0&&!s&&Ct&&(f.patchFlag>0||a&6)&&f.patchFlag!==32&&Ct.push(f),f}const G=Yh;function Yh(e,t=null,n=null,r=0,o=null,a=!1){if((!e||e===Ch)&&(e=wn),Xi(e)){const p=Hn(e,t,!0);return n&&Ba(p,n),Ur>0&&!a&&Ct&&(p.shapeFlag&6?Ct[Ct.indexOf(e)]=p:Ct.push(p)),p.patchFlag|=-2,p}if(ny(e)&&(e=e.__vccOpts),t){t=$h(t);let{class:p,style:f}=t;p&&!Ye(p)&&(t.class=Nr(p)),je(f)&&(_c(f)&&!se(f)&&(f=Qe({},f)),t.style=Wo(f))}const s=Ye(e)?1:ph(e)?128:Hh(e)?64:je(e)?4:pe(e)?2:0;return gn(e,t,n,r,o,s,a,!0)}function $h(e){return e?_c(e)||Zo in e?Qe({},e):e:null}function Hn(e,t,n=!1){const{props:r,ref:o,patchFlag:a,children:s}=e,p=t?Kh(r||{},t):r;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:p,key:p&&ad(p),ref:t&&t.ref?n&&o?se(o)?o.concat(wo(t)):[o,wo(t)]:wo(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==ut?a===-1?16:a|16:a,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Hn(e.ssContent),ssFallback:e.ssFallback&&Hn(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function ld(e=" ",t=0){return G(Xo,null,e,t)}function Ht(e="",t=!1){return t?(Re(),Rt(wn,null,e)):G(wn,null,e)}function Pt(e){return e==null||typeof e=="boolean"?G(wn):se(e)?G(ut,null,e.slice()):typeof e=="object"?an(e):G(Xo,null,String(e))}function an(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Hn(e)}function Ba(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(se(t))n=16;else if(typeof t=="object")if(r&65){const o=t.default;o&&(o._c&&(o._d=!1),Ba(e,o()),o._c&&(o._d=!0));return}else{n=32;const o=t._;!o&&!(Zo in t)?t._ctx=kt:o===3&&kt&&(kt.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else pe(t)?(t={default:t,_ctx:kt},n=32):(t=String(t),r&64?(n=16,t=[ld(t)]):n=8);e.children=t,e.shapeFlag|=n}function Kh(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const o in r)if(o==="class")t.class!==r.class&&(t.class=Nr([t.class,r.class]));else if(o==="style")t.style=Wo([t.style,r.style]);else if(Fo(o)){const a=t[o],s=r[o];s&&a!==s&&!(se(a)&&a.includes(s))&&(t[o]=a?[].concat(a,s):s)}else o!==""&&(t[o]=r[o])}return t}function Lt(e,t,n,r=null){It(e,t,7,[n,r])}const Vh=Jc();let Qh=0;function Xh(e,t,n){const r=e.type,o=(t?t.appContext:e.appContext)||Vh,a={uid:Qh++,vnode:e,type:r,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,scope:new vf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:ed(r,o),emitsOptions:qc(r,o),emit:null,emitted:null,propsDefaults:Pe,inheritAttrs:r.inheritAttrs,ctx:Pe,data:Pe,props:Pe,attrs:Pe,slots:Pe,refs:Pe,setupState:Pe,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=t?t.root:a,a.emit=ih.bind(null,a),e.ce&&e.ce(a),a}let Xe=null,Ia,In,Wl="__VUE_INSTANCE_SETTERS__";(In=Mi()[Wl])||(In=Mi()[Wl]=[]),In.push(e=>Xe=e),Ia=e=>{In.length>1?In.forEach(t=>t(e)):In[0](e)};const Wn=e=>{Ia(e),e.scope.on()},vn=()=>{Xe&&Xe.scope.off(),Ia(null)};function sd(e){return e.vnode.shapeFlag&4}let Hr=!1;function Zh(e,t=!1){Hr=t;const{props:n,children:r}=e.vnode,o=sd(e);jh(e,n,o,t),Nh(e,r);const a=o?Jh(e,t):void 0;return Hr=!1,a}function Jh(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=Oc(new Proxy(e.ctx,Bh));const{setup:r}=n;if(r){const o=e.setupContext=r.length>1?ey(e):null;Wn(e),Zn();const a=cn(r,e,0,[e.props,o]);if(Jn(),vn(),fc(a)){if(a.then(vn,vn),t)return a.then(s=>{Yl(e,s,t)}).catch(s=>{Ko(s,e,0)});e.asyncDep=a}else Yl(e,a,t)}else cd(e,t)}function Yl(e,t,n){pe(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:je(t)&&(e.setupState=jc(t)),cd(e,n)}let $l;function cd(e,t,n){const r=e.type;if(!e.render){if(!t&&$l&&!r.render){const o=r.template||Ca(e).template;if(o){const{isCustomElement:a,compilerOptions:s}=e.appContext.config,{delimiters:p,compilerOptions:f}=r,h=Qe(Qe({isCustomElement:a,delimiters:p},s),f);r.render=$l(o,h)}}e.render=r.render||Bt}Wn(e),Zn(),Ih(e),Jn(),vn()}function Gh(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,n){return lt(e,"get","$attrs"),t[n]}}))}function ey(e){const t=n=>{e.exposed=n||{}};return{get attrs(){return Gh(e)},slots:e.slots,emit:e.emit,expose:t}}function Ta(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(jc(Oc(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Lr)return Lr[n](e)},has(t,n){return n in t||n in Lr}}))}function ty(e,t=!0){return pe(e)?e.displayName||e.name:e.name||t&&e.__name}function ny(e){return pe(e)&&"__vccOpts"in e}const xt=(e,t)=>Gf(e,t,Hr);function zo(e,t,n){const r=arguments.length;return r===2?je(t)&&!se(t)?Xi(t)?G(e,null,[t]):G(e,t):G(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Xi(n)&&(n=[n]),G(e,t,n))}const ry=Symbol.for("v-scx"),oy=()=>ht(ry),iy="3.3.4",ay="http://www.w3.org/2000/svg",An=typeof document<"u"?document:null,Kl=An&&An.createElement("template"),ly={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const o=t?An.createElementNS(ay,e):An.createElement(e,n?{is:n}:void 0);return e==="select"&&r&&r.multiple!=null&&o.setAttribute("multiple",r.multiple),o},createText:e=>An.createTextNode(e),createComment:e=>An.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>An.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,o,a){const s=n?n.previousSibling:t.lastChild;if(o&&(o===a||o.nextSibling))for(;t.insertBefore(o.cloneNode(!0),n),!(o===a||!(o=o.nextSibling)););else{Kl.innerHTML=r?`<svg>${e}</svg>`:e;const p=Kl.content;if(r){const f=p.firstChild;for(;f.firstChild;)p.appendChild(f.firstChild);p.removeChild(f)}t.insertBefore(p,n)}return[s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function sy(e,t,n){const r=e._vtc;r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function cy(e,t,n){const r=e.style,o=Ye(n);if(n&&!o){if(t&&!Ye(t))for(const a in t)n[a]==null&&Zi(r,a,"");for(const a in n)Zi(r,a,n[a])}else{const a=r.display;o?t!==n&&(r.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(r.display=a)}}const Vl=/\s*!important$/;function Zi(e,t,n){if(se(n))n.forEach(r=>Zi(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=dy(e,t);Vl.test(n)?e.setProperty(Xn(r),n.replace(Vl,""),"important"):e[r]=n}}const Ql=["Webkit","Moz","ms"],Ii={};function dy(e,t){const n=Ii[t];if(n)return n;let r=Dt(t);if(r!=="filter"&&r in e)return Ii[t]=r;r=Ho(r);for(let o=0;o<Ql.length;o++){const a=Ql[o]+r;if(a in e)return Ii[t]=a}return t}const Xl="http://www.w3.org/1999/xlink";function py(e,t,n,r,o){if(r&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(Xl,t.slice(6,t.length)):e.setAttributeNS(Xl,t,n);else{const a=gf(t);n==null||a&&!Ac(n)?e.removeAttribute(t):e.setAttribute(t,a?"":n)}}function uy(e,t,n,r,o,a,s){if(t==="innerHTML"||t==="textContent"){r&&s(r,o,a),e[t]=n??"";return}const p=e.tagName;if(t==="value"&&p!=="PROGRESS"&&!p.includes("-")){e._value=n;const h=p==="OPTION"?e.getAttribute("value"):e.value,b=n??"";h!==b&&(e.value=b),n==null&&e.removeAttribute(t);return}let f=!1;if(n===""||n==null){const h=typeof e[t];h==="boolean"?n=Ac(n):n==null&&h==="string"?(n="",f=!0):h==="number"&&(n=0,f=!0)}try{e[t]=n}catch{}f&&e.removeAttribute(t)}function fy(e,t,n,r){e.addEventListener(t,n,r)}function hy(e,t,n,r){e.removeEventListener(t,n,r)}function yy(e,t,n,r,o=null){const a=e._vei||(e._vei={}),s=a[t];if(r&&s)s.value=r;else{const[p,f]=Ay(t);if(r){const h=a[t]=gy(r,o);fy(e,p,h,f)}else s&&(hy(e,p,s,f),a[t]=void 0)}}const Zl=/(?:Once|Passive|Capture)$/;function Ay(e){let t;if(Zl.test(e)){t={};let r;for(;r=e.match(Zl);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Xn(e.slice(2)),t]}let Ti=0;const my=Promise.resolve(),by=()=>Ti||(my.then(()=>Ti=0),Ti=Date.now());function gy(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;It(vy(r,n.value),t,5,[r])};return n.value=e,n.attached=by(),n}function vy(e,t){if(se(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>o=>!o._stopped&&r&&r(o))}else return t}const Jl=/^on[a-z]/,Ey=(e,t,n,r,o=!1,a,s,p,f)=>{t==="class"?sy(e,r,o):t==="style"?cy(e,n,r):Fo(t)?ua(t)||yy(e,t,n,r,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):wy(e,t,r,o))?uy(e,t,r,a,s,p,f):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),py(e,t,r,o))};function wy(e,t,n,r){return r?!!(t==="innerHTML"||t==="textContent"||t in e&&Jl.test(t)&&pe(n)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||Jl.test(t)&&Ye(n)?!1:t in e}const xy=Qe({patchProp:Ey},ly);let Gl;function dd(){return Gl||(Gl=Fh(xy))}const es=(...e)=>{dd().render(...e)},ky=(...e)=>{const t=dd().createApp(...e),{mount:n}=t;return t.mount=r=>{const o=Cy(r);if(!o)return;const a=t._component;!pe(a)&&!a.render&&!a.template&&(a.template=o.innerHTML),o.innerHTML="";const s=n(o,!1,o instanceof SVGElement);return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),s},t};function Cy(e){return Ye(e)?document.querySelector(e):e}const _a=(e,t)=>{const n=e.__vccOpts||e;for(const[r,o]of t)n[r]=o;return n},Sy={};function By(e,t){const n=kh("router-view");return Re(),Rt(n)}const Iy=_a(Sy,[["render",By]]);/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const _n=typeof window<"u";function Ty(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const Ce=Object.assign;function _i(e,t){const n={};for(const r in t){const o=t[r];n[r]=Tt(o)?o.map(e):e(o)}return n}const Pr=()=>{},Tt=Array.isArray,_y=/\/$/,Oy=e=>e.replace(_y,"");function Oi(e,t,n="/"){let r,o={},a="",s="";const p=t.indexOf("#");let f=t.indexOf("?");return p<f&&p>=0&&(f=-1),f>-1&&(r=t.slice(0,f),a=t.slice(f+1,p>-1?p:t.length),o=e(a)),p>-1&&(r=r||t.slice(0,p),s=t.slice(p,t.length)),r=jy(r??t,n),{fullPath:r+(a&&"?")+a+s,path:r,query:o,hash:s}}function Ly(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function ts(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function Ry(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&Yn(t.matched[r],n.matched[o])&&pd(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function Yn(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function pd(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!Py(e[n],t[n]))return!1;return!0}function Py(e,t){return Tt(e)?ns(e,t):Tt(t)?ns(t,e):e===t}function ns(e,t){return Tt(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function jy(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];(o===".."||o===".")&&r.push("");let a=n.length-1,s,p;for(s=0;s<r.length;s++)if(p=r[s],p!==".")if(p==="..")a>1&&a--;else break;return n.slice(0,a).join("/")+"/"+r.slice(s-(s===r.length?1:0)).join("/")}var Wr;(function(e){e.pop="pop",e.push="push"})(Wr||(Wr={}));var jr;(function(e){e.back="back",e.forward="forward",e.unknown=""})(jr||(jr={}));function zy(e){if(!e)if(_n){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),Oy(e)}const Dy=/^[^#]+#/;function Ny(e,t){return e.replace(Dy,"#")+t}function My(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const Jo=()=>({left:window.pageXOffset,top:window.pageYOffset});function Fy(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=My(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function rs(e,t){return(history.state?history.state.position-t:-1)+e}const Ji=new Map;function qy(e,t){Ji.set(e,t)}function Uy(e){const t=Ji.get(e);return Ji.delete(e),t}let Hy=()=>location.protocol+"//"+location.host;function ud(e,t){const{pathname:n,search:r,hash:o}=t,a=e.indexOf("#");if(a>-1){let p=o.includes(e.slice(a))?e.slice(a).length:1,f=o.slice(p);return f[0]!=="/"&&(f="/"+f),ts(f,"")}return ts(n,e)+r+o}function Wy(e,t,n,r){let o=[],a=[],s=null;const p=({state:A})=>{const k=ud(e,location),S=n.value,C=t.value;let I=0;if(A){if(n.value=k,t.value=A,s&&s===S){s=null;return}I=C?A.position-C.position:0}else r(k);o.forEach(O=>{O(n.value,S,{delta:I,type:Wr.pop,direction:I?I>0?jr.forward:jr.back:jr.unknown})})};function f(){s=n.value}function h(A){o.push(A);const k=()=>{const S=o.indexOf(A);S>-1&&o.splice(S,1)};return a.push(k),k}function b(){const{history:A}=window;A.state&&A.replaceState(Ce({},A.state,{scroll:Jo()}),"")}function g(){for(const A of a)A();a=[],window.removeEventListener("popstate",p),window.removeEventListener("beforeunload",b)}return window.addEventListener("popstate",p),window.addEventListener("beforeunload",b,{passive:!0}),{pauseListeners:f,listen:h,destroy:g}}function os(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?Jo():null}}function Yy(e){const{history:t,location:n}=window,r={value:ud(e,n)},o={value:t.state};o.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function a(f,h,b){const g=e.indexOf("#"),A=g>-1?(n.host&&document.querySelector("base")?e:e.slice(g))+f:Hy()+e+f;try{t[b?"replaceState":"pushState"](h,"",A),o.value=h}catch(k){console.error(k),n[b?"replace":"assign"](A)}}function s(f,h){const b=Ce({},t.state,os(o.value.back,f,o.value.forward,!0),h,{position:o.value.position});a(f,b,!0),r.value=f}function p(f,h){const b=Ce({},o.value,t.state,{forward:f,scroll:Jo()});a(b.current,b,!0);const g=Ce({},os(r.value,f,null),{position:b.position+1},h);a(f,g,!1),r.value=f}return{location:r,state:o,push:p,replace:s}}function $y(e){e=zy(e);const t=Yy(e),n=Wy(e,t.state,t.location,t.replace);function r(a,s=!0){s||n.pauseListeners(),history.go(a)}const o=Ce({location:"",base:e,go:r,createHref:Ny.bind(null,e)},t,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>t.state.value}),o}function Ky(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),$y(e)}function Vy(e){return typeof e=="string"||e&&typeof e=="object"}function fd(e){return typeof e=="string"||typeof e=="symbol"}const rn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},hd=Symbol("");var is;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(is||(is={}));function $n(e,t){return Ce(new Error,{type:e,[hd]:!0},t)}function Wt(e,t){return e instanceof Error&&hd in e&&(t==null||!!(e.type&t))}const as="[^/]+?",Qy={sensitive:!1,strict:!1,start:!0,end:!0},Xy=/[.+*?^${}()[\]/\\]/g;function Zy(e,t){const n=Ce({},Qy,t),r=[];let o=n.start?"^":"";const a=[];for(const h of e){const b=h.length?[]:[90];n.strict&&!h.length&&(o+="/");for(let g=0;g<h.length;g++){const A=h[g];let k=40+(n.sensitive?.25:0);if(A.type===0)g||(o+="/"),o+=A.value.replace(Xy,"\\$&"),k+=40;else if(A.type===1){const{value:S,repeatable:C,optional:I,regexp:O}=A;a.push({name:S,repeatable:C,optional:I});const _=O||as;if(_!==as){k+=10;try{new RegExp(`(${_})`)}catch(M){throw new Error(`Invalid custom RegExp for param "${S}" (${_}): `+M.message)}}let N=C?`((?:${_})(?:/(?:${_}))*)`:`(${_})`;g||(N=I&&h.length<2?`(?:/${N})`:"/"+N),I&&(N+="?"),o+=N,k+=20,I&&(k+=-8),C&&(k+=-20),_===".*"&&(k+=-50)}b.push(k)}r.push(b)}if(n.strict&&n.end){const h=r.length-1;r[h][r[h].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const s=new RegExp(o,n.sensitive?"":"i");function p(h){const b=h.match(s),g={};if(!b)return null;for(let A=1;A<b.length;A++){const k=b[A]||"",S=a[A-1];g[S.name]=k&&S.repeatable?k.split("/"):k}return g}function f(h){let b="",g=!1;for(const A of e){(!g||!b.endsWith("/"))&&(b+="/"),g=!1;for(const k of A)if(k.type===0)b+=k.value;else if(k.type===1){const{value:S,repeatable:C,optional:I}=k,O=S in h?h[S]:"";if(Tt(O)&&!C)throw new Error(`Provided param "${S}" is an array but it is not repeatable (* or + modifiers)`);const _=Tt(O)?O.join("/"):O;if(!_)if(I)A.length<2&&(b.endsWith("/")?b=b.slice(0,-1):g=!0);else throw new Error(`Missing required param "${S}"`);b+=_}}return b||"/"}return{re:s,score:r,keys:a,parse:p,stringify:f}}function Jy(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===40+40?-1:1:e.length>t.length?t.length===1&&t[0]===40+40?1:-1:0}function Gy(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const a=Jy(r[n],o[n]);if(a)return a;n++}if(Math.abs(o.length-r.length)===1){if(ls(r))return 1;if(ls(o))return-1}return o.length-r.length}function ls(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const eA={type:0,value:""},tA=/[a-zA-Z0-9_]/;function nA(e){if(!e)return[[]];if(e==="/")return[[eA]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(k){throw new Error(`ERR (${n})/"${h}": ${k}`)}let n=0,r=n;const o=[];let a;function s(){a&&o.push(a),a=[]}let p=0,f,h="",b="";function g(){h&&(n===0?a.push({type:0,value:h}):n===1||n===2||n===3?(a.length>1&&(f==="*"||f==="+")&&t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1,value:h,regexp:b,repeatable:f==="*"||f==="+",optional:f==="*"||f==="?"})):t("Invalid state to consume buffer"),h="")}function A(){h+=f}for(;p<e.length;){if(f=e[p++],f==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:f==="/"?(h&&g(),s()):f===":"?(g(),n=1):A();break;case 4:A(),n=r;break;case 1:f==="("?n=2:tA.test(f)?A():(g(),n=0,f!=="*"&&f!=="?"&&f!=="+"&&p--);break;case 2:f===")"?b[b.length-1]=="\\"?b=b.slice(0,-1)+f:n=3:b+=f;break;case 3:g(),n=0,f!=="*"&&f!=="?"&&f!=="+"&&p--,b="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${h}"`),g(),s(),o}function rA(e,t,n){const r=Zy(nA(e.path),n),o=Ce(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function oA(e,t){const n=[],r=new Map;t=ds({strict:!1,end:!0,sensitive:!1},t);function o(b){return r.get(b)}function a(b,g,A){const k=!A,S=iA(b);S.aliasOf=A&&A.record;const C=ds(t,b),I=[S];if("alias"in b){const N=typeof b.alias=="string"?[b.alias]:b.alias;for(const M of N)I.push(Ce({},S,{components:A?A.record.components:S.components,path:M,aliasOf:A?A.record:S}))}let O,_;for(const N of I){const{path:M}=N;if(g&&M[0]!=="/"){const ye=g.record.path,me=ye[ye.length-1]==="/"?"":"/";N.path=g.record.path+(M&&me+M)}if(O=rA(N,g,C),A?A.alias.push(O):(_=_||O,_!==O&&_.alias.push(O),k&&b.name&&!cs(O)&&s(b.name)),S.children){const ye=S.children;for(let me=0;me<ye.length;me++)a(ye[me],O,A&&A.children[me])}A=A||O,(O.record.components&&Object.keys(O.record.components).length||O.record.name||O.record.redirect)&&f(O)}return _?()=>{s(_)}:Pr}function s(b){if(fd(b)){const g=r.get(b);g&&(r.delete(b),n.splice(n.indexOf(g),1),g.children.forEach(s),g.alias.forEach(s))}else{const g=n.indexOf(b);g>-1&&(n.splice(g,1),b.record.name&&r.delete(b.record.name),b.children.forEach(s),b.alias.forEach(s))}}function p(){return n}function f(b){let g=0;for(;g<n.length&&Gy(b,n[g])>=0&&(b.record.path!==n[g].record.path||!yd(b,n[g]));)g++;n.splice(g,0,b),b.record.name&&!cs(b)&&r.set(b.record.name,b)}function h(b,g){let A,k={},S,C;if("name"in b&&b.name){if(A=r.get(b.name),!A)throw $n(1,{location:b});C=A.record.name,k=Ce(ss(g.params,A.keys.filter(_=>!_.optional).map(_=>_.name)),b.params&&ss(b.params,A.keys.map(_=>_.name))),S=A.stringify(k)}else if("path"in b)S=b.path,A=n.find(_=>_.re.test(S)),A&&(k=A.parse(S),C=A.record.name);else{if(A=g.name?r.get(g.name):n.find(_=>_.re.test(g.path)),!A)throw $n(1,{location:b,currentLocation:g});C=A.record.name,k=Ce({},g.params,b.params),S=A.stringify(k)}const I=[];let O=A;for(;O;)I.unshift(O.record),O=O.parent;return{name:C,path:S,params:k,matched:I,meta:lA(I)}}return e.forEach(b=>a(b)),{addRoute:a,resolve:h,removeRoute:s,getRoutes:p,getRecordMatcher:o}}function ss(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function iA(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:aA(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function aA(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function cs(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function lA(e){return e.reduce((t,n)=>Ce(t,n.meta),{})}function ds(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function yd(e,t){return t.children.some(n=>n===e||yd(e,n))}const Ad=/#/g,sA=/&/g,cA=/\//g,dA=/=/g,pA=/\?/g,md=/\+/g,uA=/%5B/g,fA=/%5D/g,bd=/%5E/g,hA=/%60/g,gd=/%7B/g,yA=/%7C/g,vd=/%7D/g,AA=/%20/g;function Oa(e){return encodeURI(""+e).replace(yA,"|").replace(uA,"[").replace(fA,"]")}function mA(e){return Oa(e).replace(gd,"{").replace(vd,"}").replace(bd,"^")}function Gi(e){return Oa(e).replace(md,"%2B").replace(AA,"+").replace(Ad,"%23").replace(sA,"%26").replace(hA,"`").replace(gd,"{").replace(vd,"}").replace(bd,"^")}function bA(e){return Gi(e).replace(dA,"%3D")}function gA(e){return Oa(e).replace(Ad,"%23").replace(pA,"%3F")}function vA(e){return e==null?"":gA(e).replace(cA,"%2F")}function Do(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function EA(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<r.length;++o){const a=r[o].replace(md," "),s=a.indexOf("="),p=Do(s<0?a:a.slice(0,s)),f=s<0?null:Do(a.slice(s+1));if(p in t){let h=t[p];Tt(h)||(h=t[p]=[h]),h.push(f)}else t[p]=f}return t}function ps(e){let t="";for(let n in e){const r=e[n];if(n=bA(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(Tt(r)?r.map(a=>a&&Gi(a)):[r&&Gi(r)]).forEach(a=>{a!==void 0&&(t+=(t.length?"&":"")+n,a!=null&&(t+="="+a))})}return t}function wA(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=Tt(r)?r.map(o=>o==null?null:""+o):r==null?r:""+r)}return t}const xA=Symbol(""),us=Symbol(""),Go=Symbol(""),La=Symbol(""),ea=Symbol("");function Cr(){let e=[];function t(r){return e.push(r),()=>{const o=e.indexOf(r);o>-1&&e.splice(o,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function ln(e,t,n,r,o){const a=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise((s,p)=>{const f=g=>{g===!1?p($n(4,{from:n,to:t})):g instanceof Error?p(g):Vy(g)?p($n(2,{from:t,to:g})):(a&&r.enterCallbacks[o]===a&&typeof g=="function"&&a.push(g),s())},h=e.call(r&&r.instances[o],t,n,f);let b=Promise.resolve(h);e.length<3&&(b=b.then(f)),b.catch(g=>p(g))})}function Li(e,t,n,r){const o=[];for(const a of e)for(const s in a.components){let p=a.components[s];if(!(t!=="beforeRouteEnter"&&!a.instances[s]))if(kA(p)){const h=(p.__vccOpts||p)[t];h&&o.push(ln(h,n,r,a,s))}else{let f=p();o.push(()=>f.then(h=>{if(!h)return Promise.reject(new Error(`Couldn't resolve component "${s}" at "${a.path}"`));const b=Ty(h)?h.default:h;a.components[s]=b;const A=(b.__vccOpts||b)[t];return A&&ln(A,n,r,a,s)()}))}}return o}function kA(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function fs(e){const t=ht(Go),n=ht(La),r=xt(()=>t.resolve(at(e.to))),o=xt(()=>{const{matched:f}=r.value,{length:h}=f,b=f[h-1],g=n.matched;if(!b||!g.length)return-1;const A=g.findIndex(Yn.bind(null,b));if(A>-1)return A;const k=hs(f[h-2]);return h>1&&hs(b)===k&&g[g.length-1].path!==k?g.findIndex(Yn.bind(null,f[h-2])):A}),a=xt(()=>o.value>-1&&IA(n.params,r.value.params)),s=xt(()=>o.value>-1&&o.value===n.matched.length-1&&pd(n.params,r.value.params));function p(f={}){return BA(f)?t[at(e.replace)?"replace":"push"](at(e.to)).catch(Pr):Promise.resolve()}return{route:r,href:xt(()=>r.value.href),isActive:a,isExactActive:s,navigate:p}}const CA=Yc({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:fs,setup(e,{slots:t}){const n=$o(fs(e)),{options:r}=ht(Go),o=xt(()=>({[ys(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[ys(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const a=t.default&&t.default(n);return e.custom?a:zo("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},a)}}}),SA=CA;function BA(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function IA(e,t){for(const n in t){const r=t[n],o=e[n];if(typeof r=="string"){if(r!==o)return!1}else if(!Tt(o)||o.length!==r.length||r.some((a,s)=>a!==o[s]))return!1}return!0}function hs(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const ys=(e,t,n)=>e??t??n,TA=Yc({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=ht(ea),o=xt(()=>e.route||r.value),a=ht(us,0),s=xt(()=>{let h=at(a);const{matched:b}=o.value;let g;for(;(g=b[h])&&!g.components;)h++;return h}),p=xt(()=>o.value.matched[s.value]);Eo(us,xt(()=>s.value+1)),Eo(xA,p),Eo(ea,o);const f=$t();return Or(()=>[f.value,p.value,e.name],([h,b,g],[A,k,S])=>{b&&(b.instances[g]=h,k&&k!==b&&h&&h===A&&(b.leaveGuards.size||(b.leaveGuards=k.leaveGuards),b.updateGuards.size||(b.updateGuards=k.updateGuards))),h&&b&&(!k||!Yn(b,k)||!A)&&(b.enterCallbacks[g]||[]).forEach(C=>C(h))},{flush:"post"}),()=>{const h=o.value,b=e.name,g=p.value,A=g&&g.components[b];if(!A)return As(n.default,{Component:A,route:h});const k=g.props[b],S=k?k===!0?h.params:typeof k=="function"?k(h):k:null,I=zo(A,Ce({},S,t,{onVnodeUnmounted:O=>{O.component.isUnmounted&&(g.instances[b]=null)},ref:f}));return As(n.default,{Component:I,route:h})||I}}});function As(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const _A=TA;function OA(e){const t=oA(e.routes,e),n=e.parseQuery||EA,r=e.stringifyQuery||ps,o=e.history,a=Cr(),s=Cr(),p=Cr(),f=Qf(rn);let h=rn;_n&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const b=_i.bind(null,z=>""+z),g=_i.bind(null,vA),A=_i.bind(null,Do);function k(z,Q){let W,ne;return fd(z)?(W=t.getRecordMatcher(z),ne=Q):ne=z,t.addRoute(ne,W)}function S(z){const Q=t.getRecordMatcher(z);Q&&t.removeRoute(Q)}function C(){return t.getRoutes().map(z=>z.record)}function I(z){return!!t.getRecordMatcher(z)}function O(z,Q){if(Q=Ce({},Q||f.value),typeof z=="string"){const B=Oi(n,z,Q.path),R=t.resolve({path:B.path},Q),D=o.createHref(B.fullPath);return Ce(B,R,{params:A(R.params),hash:Do(B.hash),redirectedFrom:void 0,href:D})}let W;if("path"in z)W=Ce({},z,{path:Oi(n,z.path,Q.path).path});else{const B=Ce({},z.params);for(const R in B)B[R]==null&&delete B[R];W=Ce({},z,{params:g(B)}),Q.params=g(Q.params)}const ne=t.resolve(W,Q),ve=z.hash||"";ne.params=b(A(ne.params));const w=Ly(r,Ce({},z,{hash:mA(ve),path:ne.path})),x=o.createHref(w);return Ce({fullPath:w,hash:ve,query:r===ps?wA(z.query):z.query||{}},ne,{redirectedFrom:void 0,href:x})}function _(z){return typeof z=="string"?Oi(n,z,f.value.path):Ce({},z)}function N(z,Q){if(h!==z)return $n(8,{from:Q,to:z})}function M(z){return Ue(z)}function ye(z){return M(Ce(_(z),{replace:!0}))}function me(z){const Q=z.matched[z.matched.length-1];if(Q&&Q.redirect){const{redirect:W}=Q;let ne=typeof W=="function"?W(z):W;return typeof ne=="string"&&(ne=ne.includes("?")||ne.includes("#")?ne=_(ne):{path:ne},ne.params={}),Ce({query:z.query,hash:z.hash,params:"path"in ne?{}:z.params},ne)}}function Ue(z,Q){const W=h=O(z),ne=f.value,ve=z.state,w=z.force,x=z.replace===!0,B=me(W);if(B)return Ue(Ce(_(B),{state:typeof B=="object"?Ce({},ve,B.state):ve,force:w,replace:x}),Q||W);const R=W;R.redirectedFrom=Q;let D;return!w&&Ry(r,ne,W)&&(D=$n(16,{to:R,from:ne}),Je(ne,ne,!0,!1)),(D?Promise.resolve(D):ce(R,ne)).catch(q=>Wt(q)?Wt(q,2)?q:bt(q):Ae(q,R,ne)).then(q=>{if(q){if(Wt(q,2))return Ue(Ce({replace:x},_(q.to),{state:typeof q.to=="object"?Ce({},ve,q.to.state):ve,force:w}),Q||R)}else q=mt(R,ne,!0,x,ve);return At(R,ne,q),q})}function Ke(z,Q){const W=N(z,Q);return W?Promise.reject(W):Promise.resolve()}function nt(z){const Q=_t.values().next().value;return Q&&typeof Q.runWithContext=="function"?Q.runWithContext(z):z()}function ce(z,Q){let W;const[ne,ve,w]=LA(z,Q);W=Li(ne.reverse(),"beforeRouteLeave",z,Q);for(const B of ne)B.leaveGuards.forEach(R=>{W.push(ln(R,z,Q))});const x=Ke.bind(null,z,Q);return W.push(x),_e(W).then(()=>{W=[];for(const B of a.list())W.push(ln(B,z,Q));return W.push(x),_e(W)}).then(()=>{W=Li(ve,"beforeRouteUpdate",z,Q);for(const B of ve)B.updateGuards.forEach(R=>{W.push(ln(R,z,Q))});return W.push(x),_e(W)}).then(()=>{W=[];for(const B of w)if(B.beforeEnter)if(Tt(B.beforeEnter))for(const R of B.beforeEnter)W.push(ln(R,z,Q));else W.push(ln(B.beforeEnter,z,Q));return W.push(x),_e(W)}).then(()=>(z.matched.forEach(B=>B.enterCallbacks={}),W=Li(w,"beforeRouteEnter",z,Q),W.push(x),_e(W))).then(()=>{W=[];for(const B of s.list())W.push(ln(B,z,Q));return W.push(x),_e(W)}).catch(B=>Wt(B,8)?B:Promise.reject(B))}function At(z,Q,W){p.list().forEach(ne=>nt(()=>ne(z,Q,W)))}function mt(z,Q,W,ne,ve){const w=N(z,Q);if(w)return w;const x=Q===rn,B=_n?history.state:{};W&&(ne||x?o.replace(z.fullPath,Ce({scroll:x&&B&&B.scroll},ve)):o.push(z.fullPath,ve)),f.value=z,Je(z,Q,W,x),bt()}let Ze;function Mt(){Ze||(Ze=o.listen((z,Q,W)=>{if(!Jt.listening)return;const ne=O(z),ve=me(ne);if(ve){Ue(Ce(ve,{replace:!0}),ne).catch(Pr);return}h=ne;const w=f.value;_n&&qy(rs(w.fullPath,W.delta),Jo()),ce(ne,w).catch(x=>Wt(x,12)?x:Wt(x,2)?(Ue(x.to,ne).then(B=>{Wt(B,20)&&!W.delta&&W.type===Wr.pop&&o.go(-1,!1)}).catch(Pr),Promise.reject()):(W.delta&&o.go(-W.delta,!1),Ae(x,ne,w))).then(x=>{x=x||mt(ne,w,!1),x&&(W.delta&&!Wt(x,8)?o.go(-W.delta,!1):W.type===Wr.pop&&Wt(x,20)&&o.go(-1,!1)),At(ne,w,x)}).catch(Pr)}))}let Zt=Cr(),Me=Cr(),ke;function Ae(z,Q,W){bt(z);const ne=Me.list();return ne.length?ne.forEach(ve=>ve(z,Q,W)):console.error(z),Promise.reject(z)}function te(){return ke&&f.value!==rn?Promise.resolve():new Promise((z,Q)=>{Zt.add([z,Q])})}function bt(z){return ke||(ke=!z,Mt(),Zt.list().forEach(([Q,W])=>z?W(z):Q()),Zt.reset()),z}function Je(z,Q,W,ne){const{scrollBehavior:ve}=e;if(!_n||!ve)return Promise.resolve();const w=!W&&Uy(rs(z.fullPath,0))||(ne||!W)&&history.state&&history.state.scroll||null;return Dc().then(()=>ve(z,Q,w)).then(x=>x&&Fy(x)).catch(x=>Ae(x,z,Q))}const Ve=z=>o.go(z);let Ft;const _t=new Set,Jt={currentRoute:f,listening:!0,addRoute:k,removeRoute:S,hasRoute:I,getRoutes:C,resolve:O,options:e,push:M,replace:ye,go:Ve,back:()=>Ve(-1),forward:()=>Ve(1),beforeEach:a.add,beforeResolve:s.add,afterEach:p.add,onError:Me.add,isReady:te,install(z){const Q=this;z.component("RouterLink",SA),z.component("RouterView",_A),z.config.globalProperties.$router=Q,Object.defineProperty(z.config.globalProperties,"$route",{enumerable:!0,get:()=>at(f)}),_n&&!Ft&&f.value===rn&&(Ft=!0,M(o.location).catch(ve=>{}));const W={};for(const ve in rn)Object.defineProperty(W,ve,{get:()=>f.value[ve],enumerable:!0});z.provide(Go,Q),z.provide(La,Ic(W)),z.provide(ea,f);const ne=z.unmount;_t.add(z),z.unmount=function(){_t.delete(z),_t.size<1&&(h=rn,Ze&&Ze(),Ze=null,f.value=rn,Ft=!1,ke=!1),ne()}}};function _e(z){return z.reduce((Q,W)=>Q.then(()=>nt(W)),Promise.resolve())}return Jt}function LA(e,t){const n=[],r=[],o=[],a=Math.max(t.matched.length,e.matched.length);for(let s=0;s<a;s++){const p=t.matched[s];p&&(e.matched.find(h=>Yn(h,p))?r.push(p):n.push(p));const f=e.matched[s];f&&(t.matched.find(h=>Yn(h,f))||o.push(f))}return[n,r,o]}function RA(){return ht(Go)}function Ra(){return ht(La)}var PA={size:"1em",strokeWidth:4,strokeLinecap:"round",strokeLinejoin:"round",rtl:!1,theme:"outline",colors:{outline:{fill:"#333",background:"transparent"},filled:{fill:"#333",background:"#FFF"},twoTone:{fill:"#333",twoTone:"#2F88FF"},multiColor:{outStrokeColor:"#333",outFillColor:"#2F88FF",innerStrokeColor:"#FFF",innerFillColor:"#43CCF8"}},prefix:"i"};function jA(){return"icon-"+((1+Math.random())*4294967296|0).toString(16).substring(1)}function zA(e,t,n){var r=typeof t.fill=="string"?[t.fill]:t.fill||[],o=[],a=t.theme||n.theme;switch(a){case"outline":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("none"),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("none");break;case"filled":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("#FFF"),o.push("#FFF");break;case"two-tone":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.twoTone.twoTone),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.twoTone.twoTone);break;case"multi-color":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.multiColor.outFillColor),o.push(typeof r[2]=="string"?r[2]:n.colors.multiColor.innerStrokeColor),o.push(typeof r[3]=="string"?r[3]:n.colors.multiColor.innerFillColor);break}return{size:t.size||n.size,strokeWidth:t.strokeWidth||n.strokeWidth,strokeLinecap:t.strokeLinecap||n.strokeLinecap,strokeLinejoin:t.strokeLinejoin||n.strokeLinejoin,colors:o,id:e}}var DA=Symbol("icon-context");function pn(e,t,n){var r={name:"icon-"+e,props:["size","strokeWidth","strokeLinecap","strokeLinejoin","theme","fill","spin"],setup:function(a){var s=jA(),p=ht(DA,PA);return function(){var f=a.size,h=a.strokeWidth,b=a.strokeLinecap,g=a.strokeLinejoin,A=a.theme,k=a.fill,S=a.spin,C=zA(s,{size:f,strokeWidth:h,strokeLinecap:b,strokeLinejoin:g,theme:A,fill:k},p),I=[p.prefix+"-icon"];return I.push(p.prefix+"-icon-"+e),t&&p.rtl&&I.push(p.prefix+"-icon-rtl"),S&&I.push(p.prefix+"-icon-spin"),G("span",{class:I.join(" ")},[n(C)])}}};return r}const NA=pn("adobe-photoshop",!0,function(e){return G("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[G("path",{d:"M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth},null),G("path",{d:"M14 15V33",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M16 25C19 25 23 24.2 23 20C23 15.8 19 15 16 15H14V25H16Z",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M34 21.0246C33 21.0246 28 20.5266 28 24.0123C28 27.4979 34 26.5021 34 29.9877C34 33.4734 28 32.9754 28 32.9754",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),MA=pn("audio-file",!0,function(e){return G("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[G("path",{d:"M8 44V4H31L40 14.5V44H8Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M32 14L26 16.9688V31.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("circle",{cx:"20.5",cy:"31.5",r:"5.5",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),FA=pn("file-doc",!0,function(e){return G("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[G("path",{d:"M10 38V44H38V38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M38 20V14L30 4H10V20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M28 4V14H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M16 12H20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),G("rect",{x:"4",y:"20",width:"40",height:"18",rx:"2",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M10 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),G("path",{d:"M10 25H12C14.2091 25 16 26.7909 16 29V29C16 31.2091 14.2091 33 12 33H10",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("ellipse",{cx:"24",cy:"29",rx:"3",ry:"4",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M38 25H36C33.7909 25 32 26.7909 32 29V29C32 31.2091 33.7909 33 36 33H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),qA=pn("file-excel",!0,function(e){return G("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[G("path",{d:"M10 4H30L40 14V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M29 18H19V34H29",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M29 26H19",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),UA=pn("file-zip",!0,function(e){return G("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[G("path",{d:"M10 38V44H38V38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M38 20V14L30 4H10V20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M28 4V14H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M16 12H20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),G("rect",{x:"4",y:"20",width:"40",height:"18",rx:"2",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M11 25H17L11 33H17",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M24 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),G("path",{d:"M31 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),G("path",{d:"M31 25H34.5C35.8807 25 37 26.1193 37 27.5V27.5C37 28.8807 35.8807 30 34.5 30H31",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),HA=pn("image-files",!0,function(e){return G("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[G("path",{d:"M10 44H38C39.1046 44 40 43.1046 40 42V14H30V4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M30 4L40 14",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("circle",{cx:"18",cy:"17",r:"4",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M15 28V37H33V21L23.4894 31.5L15 28Z",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),WA=pn("seo-folder",!0,function(e){return G("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[G("path",{d:"M5 8C5 6.89543 5.89543 6 7 6H19L24 12H41C42.1046 12 43 12.8954 43 14V40C43 41.1046 42.1046 42 41 42H7C5.89543 42 5 41.1046 5 40V8Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M14 22L19 27L14 32",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M26 32H34",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null)])}),YA=pn("video-two",!0,function(e){return G("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[G("path",{d:"M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M20.5 28V21.9378L25.75 24.9689L31 28L25.75 31.0311L20.5 34.0622V28Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M6 15H42",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M33 6L27 15",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),G("path",{d:"M21 6L15 15",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])});const $A={class:"box"},KA={style:{"background-color":"#f6f6f6"}},VA=["onClick"],QA={key:1,class:"file-name",style:{"text-align":"center"}},XA=["onClick"],ZA={key:2,class:"file-name"},JA={key:0,style:{height:"6rem","text-align":"center","line-height":"6rem"}},GA={__name:"InfoTable",props:{tableData:{type:Array,default:[]},tableHead:{type:Array,default:[]},showMax:{type:Number,default:9999999999}},emits:["clickFile","copyUrl"],setup(e,{emit:t}){const n=e,r=$t(!1),o=$t([]),a=[".MP4",".AVI",".MOV",".FLV",".MKV"],s=[".JPG",".JPEG",".PNG",".WEBP"],p=[".PSD"],f=[".RAR",".ZIP",".7Z"],h=[".WAV",".MP3",".OGG"],b=[".DOC",".DOCX"],g=[".XLS",".XLSX"];Qr(()=>{o.value=n.tableData.slice(0,n.showMax)});const A=S=>{t("clickFile",S)},k=S=>{t("copyUrl",S)};return Or(()=>n.tableData,()=>{r.value=!1,n.tableData.length>n.showMax?o.value=n.tableData.slice(0,n.showMax):o.value=n.tableData}),(S,C)=>(Re(),it("div",$A,[gn("table",null,[gn("tr",KA,[(Re(!0),it(ut,null,Ci(e.tableHead,I=>(Re(),it("th",{class:Nr({bgRed:I.bgColor==="red",bgGreen:I.bgColor==="green",textRed:I.textColor==="red",textGreen:I.textColor==="green"}),style:Wo({width:I.width})},xi(I.span),7))),256))]),(Re(!0),it(ut,null,Ci(o.value,(I,O)=>(Re(),it("tr",null,[(Re(!0),it(ut,null,Ci(e.tableHead,_=>(Re(),it("td",{class:Nr({textRed:_.textColor==="red",textGreen:_.textColor==="green"})},[_.prop==="name"?(Re(),it("div",{key:0,class:"file-name",onClick:N=>A(O)},[a.includes(I.suffix.toUpperCase())?(Re(),Rt(at(YA),{key:0,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):Ht("",!0),s.includes(I.suffix.toUpperCase())?(Re(),Rt(at(HA),{key:1,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):Ht("",!0),f.includes(I.suffix.toUpperCase())?(Re(),Rt(at(UA),{key:2,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):Ht("",!0),h.includes(I.suffix.toUpperCase())?(Re(),Rt(at(MA),{key:3,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):Ht("",!0),b.includes(I.suffix.toUpperCase())?(Re(),Rt(at(FA),{key:4,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):Ht("",!0),g.includes(I.suffix.toUpperCase())?(Re(),Rt(at(qA),{key:5,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):Ht("",!0),p.includes(I.suffix.toUpperCase())?(Re(),Rt(at(NA),{key:6,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):Ht("",!0),I.suffix===""?(Re(),Rt(at(WA),{key:7,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):Ht("",!0),ld(" "+xi(I[_.prop]),1)],8,VA)):_.prop==="cz"?(Re(),it("div",QA,[gn("button",{onClick:N=>k(O)},"复制链接",8,XA)])):(Re(),it("div",ZA,xi(I[_.prop]),1))],2))),256))]))),256))]),e.tableData.length===0?(Re(),it("div",JA," 当前数据为空 ")):Ht("",!0)]))}},em=_a(GA,[["__scopeId","data-v-646b49fb"]]);function Ed(e,t){return function(){return e.apply(t,arguments)}}const{toString:tm}=Object.prototype,{getPrototypeOf:Pa}=Object,ei=(e=>t=>{const n=tm.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),Nt=e=>(e=e.toLowerCase(),t=>ei(t)===e),ti=e=>t=>typeof t===e,{isArray:Gn}=Array,Yr=ti("undefined");function nm(e){return e!==null&&!Yr(e)&&e.constructor!==null&&!Yr(e.constructor)&&yt(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const wd=Nt("ArrayBuffer");function rm(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&wd(e.buffer),t}const om=ti("string"),yt=ti("function"),xd=ti("number"),ni=e=>e!==null&&typeof e=="object",im=e=>e===!0||e===!1,xo=e=>{if(ei(e)!=="object")return!1;const t=Pa(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},am=Nt("Date"),lm=Nt("File"),sm=Nt("Blob"),cm=Nt("FileList"),dm=e=>ni(e)&&yt(e.pipe),pm=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||yt(e.append)&&((t=ei(e))==="formdata"||t==="object"&&yt(e.toString)&&e.toString()==="[object FormData]"))},um=Nt("URLSearchParams"),fm=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Xr(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,o;if(typeof e!="object"&&(e=[e]),Gn(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{const a=n?Object.getOwnPropertyNames(e):Object.keys(e),s=a.length;let p;for(r=0;r<s;r++)p=a[r],t.call(null,e[p],p,e)}}function kd(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,o;for(;r-- >0;)if(o=n[r],t===o.toLowerCase())return o;return null}const Cd=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),Sd=e=>!Yr(e)&&e!==Cd;function ta(){const{caseless:e}=Sd(this)&&this||{},t={},n=(r,o)=>{const a=e&&kd(t,o)||o;xo(t[a])&&xo(r)?t[a]=ta(t[a],r):xo(r)?t[a]=ta({},r):Gn(r)?t[a]=r.slice():t[a]=r};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&Xr(arguments[r],n);return t}const hm=(e,t,n,{allOwnKeys:r}={})=>(Xr(t,(o,a)=>{n&&yt(o)?e[a]=Ed(o,n):e[a]=o},{allOwnKeys:r}),e),ym=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Am=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},mm=(e,t,n,r)=>{let o,a,s;const p={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),a=o.length;a-- >0;)s=o[a],(!r||r(s,e,t))&&!p[s]&&(t[s]=e[s],p[s]=!0);e=n!==!1&&Pa(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},bm=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},gm=e=>{if(!e)return null;if(Gn(e))return e;let t=e.length;if(!xd(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},vm=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Pa(Uint8Array)),Em=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let o;for(;(o=r.next())&&!o.done;){const a=o.value;t.call(e,a[0],a[1])}},wm=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},xm=Nt("HTMLFormElement"),km=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,o){return r.toUpperCase()+o}),ms=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Cm=Nt("RegExp"),Bd=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};Xr(n,(o,a)=>{t(o,a,e)!==!1&&(r[a]=o)}),Object.defineProperties(e,r)},Sm=e=>{Bd(e,(t,n)=>{if(yt(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(yt(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Bm=(e,t)=>{const n={},r=o=>{o.forEach(a=>{n[a]=!0})};return Gn(e)?r(e):r(String(e).split(t)),n},Im=()=>{},Tm=(e,t)=>(e=+e,Number.isFinite(e)?e:t),Ri="abcdefghijklmnopqrstuvwxyz",bs="0123456789",Id={DIGIT:bs,ALPHA:Ri,ALPHA_DIGIT:Ri+Ri.toUpperCase()+bs},_m=(e=16,t=Id.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n};function Om(e){return!!(e&&yt(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const Lm=e=>{const t=new Array(10),n=(r,o)=>{if(ni(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[o]=r;const a=Gn(r)?[]:{};return Xr(r,(s,p)=>{const f=n(s,o+1);!Yr(f)&&(a[p]=f)}),t[o]=void 0,a}}return r};return n(e,0)},Rm=Nt("AsyncFunction"),Pm=e=>e&&(ni(e)||yt(e))&&yt(e.then)&&yt(e.catch),j={isArray:Gn,isArrayBuffer:wd,isBuffer:nm,isFormData:pm,isArrayBufferView:rm,isString:om,isNumber:xd,isBoolean:im,isObject:ni,isPlainObject:xo,isUndefined:Yr,isDate:am,isFile:lm,isBlob:sm,isRegExp:Cm,isFunction:yt,isStream:dm,isURLSearchParams:um,isTypedArray:vm,isFileList:cm,forEach:Xr,merge:ta,extend:hm,trim:fm,stripBOM:ym,inherits:Am,toFlatObject:mm,kindOf:ei,kindOfTest:Nt,endsWith:bm,toArray:gm,forEachEntry:Em,matchAll:wm,isHTMLForm:xm,hasOwnProperty:ms,hasOwnProp:ms,reduceDescriptors:Bd,freezeMethods:Sm,toObjectSet:Bm,toCamelCase:km,noop:Im,toFiniteNumber:Tm,findKey:kd,global:Cd,isContextDefined:Sd,ALPHABET:Id,generateString:_m,isSpecCompliantForm:Om,toJSONObject:Lm,isAsyncFn:Rm,isThenable:Pm};function ge(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o)}j.inherits(ge,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:j.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const Td=ge.prototype,_d={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{_d[e]={value:e}});Object.defineProperties(ge,_d);Object.defineProperty(Td,"isAxiosError",{value:!0});ge.from=(e,t,n,r,o,a)=>{const s=Object.create(Td);return j.toFlatObject(e,s,function(f){return f!==Error.prototype},p=>p!=="isAxiosError"),ge.call(s,e.message,t,n,r,o),s.cause=e,s.name=e.name,a&&Object.assign(s,a),s};const jm=null;function na(e){return j.isPlainObject(e)||j.isArray(e)}function Od(e){return j.endsWith(e,"[]")?e.slice(0,-2):e}function gs(e,t,n){return e?e.concat(t).map(function(o,a){return o=Od(o),!n&&a?"["+o+"]":o}).join(n?".":""):t}function zm(e){return j.isArray(e)&&!e.some(na)}const Dm=j.toFlatObject(j,{},null,function(t){return/^is[A-Z]/.test(t)});function ri(e,t,n){if(!j.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=j.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(C,I){return!j.isUndefined(I[C])});const r=n.metaTokens,o=n.visitor||b,a=n.dots,s=n.indexes,f=(n.Blob||typeof Blob<"u"&&Blob)&&j.isSpecCompliantForm(t);if(!j.isFunction(o))throw new TypeError("visitor must be a function");function h(S){if(S===null)return"";if(j.isDate(S))return S.toISOString();if(!f&&j.isBlob(S))throw new ge("Blob is not supported. Use a Buffer instead.");return j.isArrayBuffer(S)||j.isTypedArray(S)?f&&typeof Blob=="function"?new Blob([S]):Buffer.from(S):S}function b(S,C,I){let O=S;if(S&&!I&&typeof S=="object"){if(j.endsWith(C,"{}"))C=r?C:C.slice(0,-2),S=JSON.stringify(S);else if(j.isArray(S)&&zm(S)||(j.isFileList(S)||j.endsWith(C,"[]"))&&(O=j.toArray(S)))return C=Od(C),O.forEach(function(N,M){!(j.isUndefined(N)||N===null)&&t.append(s===!0?gs([C],M,a):s===null?C:C+"[]",h(N))}),!1}return na(S)?!0:(t.append(gs(I,C,a),h(S)),!1)}const g=[],A=Object.assign(Dm,{defaultVisitor:b,convertValue:h,isVisitable:na});function k(S,C){if(!j.isUndefined(S)){if(g.indexOf(S)!==-1)throw Error("Circular reference detected in "+C.join("."));g.push(S),j.forEach(S,function(O,_){(!(j.isUndefined(O)||O===null)&&o.call(t,O,j.isString(_)?_.trim():_,C,A))===!0&&k(O,C?C.concat(_):[_])}),g.pop()}}if(!j.isObject(e))throw new TypeError("data must be an object");return k(e),t}function vs(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function ja(e,t){this._pairs=[],e&&ri(e,this,t)}const Ld=ja.prototype;Ld.append=function(t,n){this._pairs.push([t,n])};Ld.toString=function(t){const n=t?function(r){return t.call(this,r,vs)}:vs;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};function Nm(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Rd(e,t,n){if(!t)return e;const r=n&&n.encode||Nm,o=n&&n.serialize;let a;if(o?a=o(t,n):a=j.isURLSearchParams(t)?t.toString():new ja(t,n).toString(r),a){const s=e.indexOf("#");s!==-1&&(e=e.slice(0,s)),e+=(e.indexOf("?")===-1?"?":"&")+a}return e}class Mm{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){j.forEach(this.handlers,function(r){r!==null&&t(r)})}}const Es=Mm,Pd={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Fm=typeof URLSearchParams<"u"?URLSearchParams:ja,qm=typeof FormData<"u"?FormData:null,Um=typeof Blob<"u"?Blob:null,Hm=(()=>{let e;return typeof navigator<"u"&&((e=navigator.product)==="ReactNative"||e==="NativeScript"||e==="NS")?!1:typeof window<"u"&&typeof document<"u"})(),Wm=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),zt={isBrowser:!0,classes:{URLSearchParams:Fm,FormData:qm,Blob:Um},isStandardBrowserEnv:Hm,isStandardBrowserWebWorkerEnv:Wm,protocols:["http","https","file","blob","url","data"]};function Ym(e,t){return ri(e,new zt.classes.URLSearchParams,Object.assign({visitor:function(n,r,o,a){return zt.isNode&&j.isBuffer(n)?(this.append(r,n.toString("base64")),!1):a.defaultVisitor.apply(this,arguments)}},t))}function $m(e){return j.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Km(e){const t={},n=Object.keys(e);let r;const o=n.length;let a;for(r=0;r<o;r++)a=n[r],t[a]=e[a];return t}function jd(e){function t(n,r,o,a){let s=n[a++];const p=Number.isFinite(+s),f=a>=n.length;return s=!s&&j.isArray(o)?o.length:s,f?(j.hasOwnProp(o,s)?o[s]=[o[s],r]:o[s]=r,!p):((!o[s]||!j.isObject(o[s]))&&(o[s]=[]),t(n,r,o[s],a)&&j.isArray(o[s])&&(o[s]=Km(o[s])),!p)}if(j.isFormData(e)&&j.isFunction(e.entries)){const n={};return j.forEachEntry(e,(r,o)=>{t($m(r),o,n,0)}),n}return null}const Vm={"Content-Type":void 0};function Qm(e,t,n){if(j.isString(e))try{return(t||JSON.parse)(e),j.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const oi={transitional:Pd,adapter:["xhr","http"],transformRequest:[function(t,n){const r=n.getContentType()||"",o=r.indexOf("application/json")>-1,a=j.isObject(t);if(a&&j.isHTMLForm(t)&&(t=new FormData(t)),j.isFormData(t))return o&&o?JSON.stringify(jd(t)):t;if(j.isArrayBuffer(t)||j.isBuffer(t)||j.isStream(t)||j.isFile(t)||j.isBlob(t))return t;if(j.isArrayBufferView(t))return t.buffer;if(j.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let p;if(a){if(r.indexOf("application/x-www-form-urlencoded")>-1)return Ym(t,this.formSerializer).toString();if((p=j.isFileList(t))||r.indexOf("multipart/form-data")>-1){const f=this.env&&this.env.FormData;return ri(p?{"files[]":t}:t,f&&new f,this.formSerializer)}}return a||o?(n.setContentType("application/json",!1),Qm(t)):t}],transformResponse:[function(t){const n=this.transitional||oi.transitional,r=n&&n.forcedJSONParsing,o=this.responseType==="json";if(t&&j.isString(t)&&(r&&!this.responseType||o)){const s=!(n&&n.silentJSONParsing)&&o;try{return JSON.parse(t)}catch(p){if(s)throw p.name==="SyntaxError"?ge.from(p,ge.ERR_BAD_RESPONSE,this,null,this.response):p}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:zt.classes.FormData,Blob:zt.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};j.forEach(["delete","get","head"],function(t){oi.headers[t]={}});j.forEach(["post","put","patch"],function(t){oi.headers[t]=j.merge(Vm)});const za=oi,Xm=j.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Zm=e=>{const t={};let n,r,o;return e&&e.split(`
`).forEach(function(s){o=s.indexOf(":"),n=s.substring(0,o).trim().toLowerCase(),r=s.substring(o+1).trim(),!(!n||t[n]&&Xm[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},ws=Symbol("internals");function Sr(e){return e&&String(e).trim().toLowerCase()}function ko(e){return e===!1||e==null?e:j.isArray(e)?e.map(ko):String(e)}function Jm(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Gm=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Pi(e,t,n,r,o){if(j.isFunction(r))return r.call(this,t,n);if(o&&(t=n),!!j.isString(t)){if(j.isString(r))return t.indexOf(r)!==-1;if(j.isRegExp(r))return r.test(t)}}function e0(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function t0(e,t){const n=j.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(o,a,s){return this[r].call(this,t,o,a,s)},configurable:!0})})}class ii{constructor(t){t&&this.set(t)}set(t,n,r){const o=this;function a(p,f,h){const b=Sr(f);if(!b)throw new Error("header name must be a non-empty string");const g=j.findKey(o,b);(!g||o[g]===void 0||h===!0||h===void 0&&o[g]!==!1)&&(o[g||f]=ko(p))}const s=(p,f)=>j.forEach(p,(h,b)=>a(h,b,f));return j.isPlainObject(t)||t instanceof this.constructor?s(t,n):j.isString(t)&&(t=t.trim())&&!Gm(t)?s(Zm(t),n):t!=null&&a(n,t,r),this}get(t,n){if(t=Sr(t),t){const r=j.findKey(this,t);if(r){const o=this[r];if(!n)return o;if(n===!0)return Jm(o);if(j.isFunction(n))return n.call(this,o,r);if(j.isRegExp(n))return n.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Sr(t),t){const r=j.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||Pi(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let o=!1;function a(s){if(s=Sr(s),s){const p=j.findKey(r,s);p&&(!n||Pi(r,r[p],p,n))&&(delete r[p],o=!0)}}return j.isArray(t)?t.forEach(a):a(t),o}clear(t){const n=Object.keys(this);let r=n.length,o=!1;for(;r--;){const a=n[r];(!t||Pi(this,this[a],a,t,!0))&&(delete this[a],o=!0)}return o}normalize(t){const n=this,r={};return j.forEach(this,(o,a)=>{const s=j.findKey(r,a);if(s){n[s]=ko(o),delete n[a];return}const p=t?e0(a):String(a).trim();p!==a&&delete n[a],n[p]=ko(o),r[p]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return j.forEach(this,(r,o)=>{r!=null&&r!==!1&&(n[o]=t&&j.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(o=>r.set(o)),r}static accessor(t){const r=(this[ws]=this[ws]={accessors:{}}).accessors,o=this.prototype;function a(s){const p=Sr(s);r[p]||(t0(o,s),r[p]=!0)}return j.isArray(t)?t.forEach(a):a(t),this}}ii.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);j.freezeMethods(ii.prototype);j.freezeMethods(ii);const Kt=ii;function ji(e,t){const n=this||za,r=t||n,o=Kt.from(r.headers);let a=r.data;return j.forEach(e,function(p){a=p.call(n,a,o.normalize(),t?t.status:void 0)}),o.normalize(),a}function zd(e){return!!(e&&e.__CANCEL__)}function Zr(e,t,n){ge.call(this,e??"canceled",ge.ERR_CANCELED,t,n),this.name="CanceledError"}j.inherits(Zr,ge,{__CANCEL__:!0});function n0(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new ge("Request failed with status code "+n.status,[ge.ERR_BAD_REQUEST,ge.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const r0=zt.isStandardBrowserEnv?function(){return{write:function(n,r,o,a,s,p){const f=[];f.push(n+"="+encodeURIComponent(r)),j.isNumber(o)&&f.push("expires="+new Date(o).toGMTString()),j.isString(a)&&f.push("path="+a),j.isString(s)&&f.push("domain="+s),p===!0&&f.push("secure"),document.cookie=f.join("; ")},read:function(n){const r=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return r?decodeURIComponent(r[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}();function o0(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function i0(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function Dd(e,t){return e&&!o0(t)?i0(e,t):t}const a0=zt.isStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function o(a){let s=a;return t&&(n.setAttribute("href",s),s=n.href),n.setAttribute("href",s),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=o(window.location.href),function(s){const p=j.isString(s)?o(s):s;return p.protocol===r.protocol&&p.host===r.host}}():function(){return function(){return!0}}();function l0(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function s0(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o=0,a=0,s;return t=t!==void 0?t:1e3,function(f){const h=Date.now(),b=r[a];s||(s=h),n[o]=f,r[o]=h;let g=a,A=0;for(;g!==o;)A+=n[g++],g=g%e;if(o=(o+1)%e,o===a&&(a=(a+1)%e),h-s<t)return;const k=b&&h-b;return k?Math.round(A*1e3/k):void 0}}function xs(e,t){let n=0;const r=s0(50,250);return o=>{const a=o.loaded,s=o.lengthComputable?o.total:void 0,p=a-n,f=r(p),h=a<=s;n=a;const b={loaded:a,total:s,progress:s?a/s:void 0,bytes:p,rate:f||void 0,estimated:f&&s&&h?(s-a)/f:void 0,event:o};b[t?"download":"upload"]=!0,e(b)}}const c0=typeof XMLHttpRequest<"u",d0=c0&&function(e){return new Promise(function(n,r){let o=e.data;const a=Kt.from(e.headers).normalize(),s=e.responseType;let p;function f(){e.cancelToken&&e.cancelToken.unsubscribe(p),e.signal&&e.signal.removeEventListener("abort",p)}j.isFormData(o)&&(zt.isStandardBrowserEnv||zt.isStandardBrowserWebWorkerEnv?a.setContentType(!1):a.setContentType("multipart/form-data;",!1));let h=new XMLHttpRequest;if(e.auth){const k=e.auth.username||"",S=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";a.set("Authorization","Basic "+btoa(k+":"+S))}const b=Dd(e.baseURL,e.url);h.open(e.method.toUpperCase(),Rd(b,e.params,e.paramsSerializer),!0),h.timeout=e.timeout;function g(){if(!h)return;const k=Kt.from("getAllResponseHeaders"in h&&h.getAllResponseHeaders()),C={data:!s||s==="text"||s==="json"?h.responseText:h.response,status:h.status,statusText:h.statusText,headers:k,config:e,request:h};n0(function(O){n(O),f()},function(O){r(O),f()},C),h=null}if("onloadend"in h?h.onloadend=g:h.onreadystatechange=function(){!h||h.readyState!==4||h.status===0&&!(h.responseURL&&h.responseURL.indexOf("file:")===0)||setTimeout(g)},h.onabort=function(){h&&(r(new ge("Request aborted",ge.ECONNABORTED,e,h)),h=null)},h.onerror=function(){r(new ge("Network Error",ge.ERR_NETWORK,e,h)),h=null},h.ontimeout=function(){let S=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const C=e.transitional||Pd;e.timeoutErrorMessage&&(S=e.timeoutErrorMessage),r(new ge(S,C.clarifyTimeoutError?ge.ETIMEDOUT:ge.ECONNABORTED,e,h)),h=null},zt.isStandardBrowserEnv){const k=(e.withCredentials||a0(b))&&e.xsrfCookieName&&r0.read(e.xsrfCookieName);k&&a.set(e.xsrfHeaderName,k)}o===void 0&&a.setContentType(null),"setRequestHeader"in h&&j.forEach(a.toJSON(),function(S,C){h.setRequestHeader(C,S)}),j.isUndefined(e.withCredentials)||(h.withCredentials=!!e.withCredentials),s&&s!=="json"&&(h.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&h.addEventListener("progress",xs(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&h.upload&&h.upload.addEventListener("progress",xs(e.onUploadProgress)),(e.cancelToken||e.signal)&&(p=k=>{h&&(r(!k||k.type?new Zr(null,e,h):k),h.abort(),h=null)},e.cancelToken&&e.cancelToken.subscribe(p),e.signal&&(e.signal.aborted?p():e.signal.addEventListener("abort",p)));const A=l0(b);if(A&&zt.protocols.indexOf(A)===-1){r(new ge("Unsupported protocol "+A+":",ge.ERR_BAD_REQUEST,e));return}h.send(o||null)})},Co={http:jm,xhr:d0};j.forEach(Co,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const p0={getAdapter:e=>{e=j.isArray(e)?e:[e];const{length:t}=e;let n,r;for(let o=0;o<t&&(n=e[o],!(r=j.isString(n)?Co[n.toLowerCase()]:n));o++);if(!r)throw r===!1?new ge(`Adapter ${n} is not supported by the environment`,"ERR_NOT_SUPPORT"):new Error(j.hasOwnProp(Co,n)?`Adapter '${n}' is not available in the build`:`Unknown adapter '${n}'`);if(!j.isFunction(r))throw new TypeError("adapter is not a function");return r},adapters:Co};function zi(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Zr(null,e)}function ks(e){return zi(e),e.headers=Kt.from(e.headers),e.data=ji.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),p0.getAdapter(e.adapter||za.adapter)(e).then(function(r){return zi(e),r.data=ji.call(e,e.transformResponse,r),r.headers=Kt.from(r.headers),r},function(r){return zd(r)||(zi(e),r&&r.response&&(r.response.data=ji.call(e,e.transformResponse,r.response),r.response.headers=Kt.from(r.response.headers))),Promise.reject(r)})}const Cs=e=>e instanceof Kt?e.toJSON():e;function Kn(e,t){t=t||{};const n={};function r(h,b,g){return j.isPlainObject(h)&&j.isPlainObject(b)?j.merge.call({caseless:g},h,b):j.isPlainObject(b)?j.merge({},b):j.isArray(b)?b.slice():b}function o(h,b,g){if(j.isUndefined(b)){if(!j.isUndefined(h))return r(void 0,h,g)}else return r(h,b,g)}function a(h,b){if(!j.isUndefined(b))return r(void 0,b)}function s(h,b){if(j.isUndefined(b)){if(!j.isUndefined(h))return r(void 0,h)}else return r(void 0,b)}function p(h,b,g){if(g in t)return r(h,b);if(g in e)return r(void 0,h)}const f={url:a,method:a,data:a,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:p,headers:(h,b)=>o(Cs(h),Cs(b),!0)};return j.forEach(Object.keys(Object.assign({},e,t)),function(b){const g=f[b]||o,A=g(e[b],t[b],b);j.isUndefined(A)&&g!==p||(n[b]=A)}),n}const Nd="1.4.0",Da={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Da[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const Ss={};Da.transitional=function(t,n,r){function o(a,s){return"[Axios v"+Nd+"] Transitional option '"+a+"'"+s+(r?". "+r:"")}return(a,s,p)=>{if(t===!1)throw new ge(o(s," has been removed"+(n?" in "+n:"")),ge.ERR_DEPRECATED);return n&&!Ss[s]&&(Ss[s]=!0,console.warn(o(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(a,s,p):!0}};function u0(e,t,n){if(typeof e!="object")throw new ge("options must be an object",ge.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const a=r[o],s=t[a];if(s){const p=e[a],f=p===void 0||s(p,a,e);if(f!==!0)throw new ge("option "+a+" must be "+f,ge.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new ge("Unknown option "+a,ge.ERR_BAD_OPTION)}}const ra={assertOptions:u0,validators:Da},on=ra.validators;class No{constructor(t){this.defaults=t,this.interceptors={request:new Es,response:new Es}}request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=Kn(this.defaults,n);const{transitional:r,paramsSerializer:o,headers:a}=n;r!==void 0&&ra.assertOptions(r,{silentJSONParsing:on.transitional(on.boolean),forcedJSONParsing:on.transitional(on.boolean),clarifyTimeoutError:on.transitional(on.boolean)},!1),o!=null&&(j.isFunction(o)?n.paramsSerializer={serialize:o}:ra.assertOptions(o,{encode:on.function,serialize:on.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s;s=a&&j.merge(a.common,a[n.method]),s&&j.forEach(["delete","get","head","post","put","patch","common"],S=>{delete a[S]}),n.headers=Kt.concat(s,a);const p=[];let f=!0;this.interceptors.request.forEach(function(C){typeof C.runWhen=="function"&&C.runWhen(n)===!1||(f=f&&C.synchronous,p.unshift(C.fulfilled,C.rejected))});const h=[];this.interceptors.response.forEach(function(C){h.push(C.fulfilled,C.rejected)});let b,g=0,A;if(!f){const S=[ks.bind(this),void 0];for(S.unshift.apply(S,p),S.push.apply(S,h),A=S.length,b=Promise.resolve(n);g<A;)b=b.then(S[g++],S[g++]);return b}A=p.length;let k=n;for(g=0;g<A;){const S=p[g++],C=p[g++];try{k=S(k)}catch(I){C.call(this,I);break}}try{b=ks.call(this,k)}catch(S){return Promise.reject(S)}for(g=0,A=h.length;g<A;)b=b.then(h[g++],h[g++]);return b}getUri(t){t=Kn(this.defaults,t);const n=Dd(t.baseURL,t.url);return Rd(n,t.params,t.paramsSerializer)}}j.forEach(["delete","get","head","options"],function(t){No.prototype[t]=function(n,r){return this.request(Kn(r||{},{method:t,url:n,data:(r||{}).data}))}});j.forEach(["post","put","patch"],function(t){function n(r){return function(a,s,p){return this.request(Kn(p||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:a,data:s}))}}No.prototype[t]=n(),No.prototype[t+"Form"]=n(!0)});const So=No;class Na{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(a){n=a});const r=this;this.promise.then(o=>{if(!r._listeners)return;let a=r._listeners.length;for(;a-- >0;)r._listeners[a](o);r._listeners=null}),this.promise.then=o=>{let a;const s=new Promise(p=>{r.subscribe(p),a=p}).then(o);return s.cancel=function(){r.unsubscribe(a)},s},t(function(a,s,p){r.reason||(r.reason=new Zr(a,s,p),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}static source(){let t;return{token:new Na(function(o){t=o}),cancel:t}}}const f0=Na;function h0(e){return function(n){return e.apply(null,n)}}function y0(e){return j.isObject(e)&&e.isAxiosError===!0}const oa={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(oa).forEach(([e,t])=>{oa[t]=e});const A0=oa;function Md(e){const t=new So(e),n=Ed(So.prototype.request,t);return j.extend(n,So.prototype,t,{allOwnKeys:!0}),j.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return Md(Kn(e,o))},n}const $e=Md(za);$e.Axios=So;$e.CanceledError=Zr;$e.CancelToken=f0;$e.isCancel=zd;$e.VERSION=Nd;$e.toFormData=ri;$e.AxiosError=ge;$e.Cancel=$e.CanceledError;$e.all=function(t){return Promise.all(t)};$e.spread=h0;$e.isAxiosError=y0;$e.mergeConfig=Kn;$e.AxiosHeaders=Kt;$e.formToJSON=e=>jd(j.isHTMLForm(e)?new FormData(e):e);$e.HttpStatusCode=A0;$e.default=$e;const m0=$e;/*!
 * Viewer.js v1.11.3
 * https://fengyuanchen.github.io/viewerjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2023-03-05T07:01:17.741Z
 */function Bs(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function Ma(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Bs(Object(n),!0).forEach(function(r){v0(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Bs(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function ia(e){"@babel/helpers - typeof";return ia=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ia(e)}function b0(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Is(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,Fd(r.key),r)}}function g0(e,t,n){return t&&Is(e.prototype,t),n&&Is(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function v0(e,t,n){return t=Fd(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function E0(e,t){if(typeof e!="object"||e===null)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||"default");if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Fd(e){var t=E0(e,"string");return typeof t=="symbol"?t:String(t)}var Ts={backdrop:!0,button:!0,navbar:!0,title:!0,toolbar:!0,className:"",container:"body",filter:null,fullscreen:!0,inheritedAttributes:["crossOrigin","decoding","isMap","loading","referrerPolicy","sizes","srcset","useMap"],initialCoverage:.9,initialViewIndex:0,inline:!1,interval:5e3,keyboard:!0,focus:!0,loading:!0,loop:!0,minWidth:200,minHeight:100,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,slideOnTouch:!0,toggleOnDblclick:!0,tooltip:!0,transition:!0,zIndex:2015,zIndexInline:0,zoomRatio:.1,minZoomRatio:.01,maxZoomRatio:100,url:"src",ready:null,show:null,shown:null,hide:null,hidden:null,view:null,viewed:null,move:null,moved:null,rotate:null,rotated:null,scale:null,scaled:null,zoom:null,zoomed:null,play:null,stop:null},w0='<div class="viewer-container" tabindex="-1" touch-action="none"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><div class="viewer-toolbar"></div><div class="viewer-navbar"><ul class="viewer-list" role="navigation"></ul></div></div><div class="viewer-tooltip" role="alert" aria-hidden="true"></div><div class="viewer-button" data-viewer-action="mix" role="button"></div><div class="viewer-player"></div></div>',ai=typeof window<"u"&&typeof window.document<"u",Qt=ai?window:{},Fn=ai&&Qt.document.documentElement?"ontouchstart"in Qt.document.documentElement:!1,Fa=ai?"PointerEvent"in Qt:!1,he="viewer",Bo="move",qd="switch",_r="zoom",ho="".concat(he,"-active"),x0="".concat(he,"-close"),Io="".concat(he,"-fade"),aa="".concat(he,"-fixed"),k0="".concat(he,"-fullscreen"),_s="".concat(he,"-fullscreen-exit"),mn="".concat(he,"-hide"),C0="".concat(he,"-hide-md-down"),S0="".concat(he,"-hide-sm-down"),B0="".concat(he,"-hide-xs-down"),pt="".concat(he,"-in"),zr="".concat(he,"-invisible"),qn="".concat(he,"-loading"),I0="".concat(he,"-move"),Os="".concat(he,"-open"),Tn="".concat(he,"-show"),Ne="".concat(he,"-transition"),Vn="click",la="dblclick",Ls="dragstart",Rs="focusin",Ps="keydown",ft="load",En="error",T0=Fn?"touchend touchcancel":"mouseup",_0=Fn?"touchmove":"mousemove",O0=Fn?"touchstart":"mousedown",js=Fa?"pointerdown":O0,zs=Fa?"pointermove":_0,Ds=Fa?"pointerup pointercancel":T0,Ns="resize",Et="transitionend",Ms="wheel",Fs="ready",qs="show",Us="shown",Hs="hide",Ws="hidden",Ys="view",$r="viewed",$s="move",Ks="moved",Vs="rotate",Qs="rotated",Xs="scale",Zs="scaled",Js="zoom",Gs="zoomed",ec="play",tc="stop",Mo="".concat(he,"Action"),qa=/\s\s*/,yo=["zoom-in","zoom-out","one-to-one","reset","prev","play","next","rotate-left","rotate-right","flip-horizontal","flip-vertical"];function Kr(e){return typeof e=="string"}var L0=Number.isNaN||Qt.isNaN;function De(e){return typeof e=="number"&&!L0(e)}function Rn(e){return typeof e>"u"}function Qn(e){return ia(e)==="object"&&e!==null}var R0=Object.prototype.hasOwnProperty;function Pn(e){if(!Qn(e))return!1;try{var t=e.constructor,n=t.prototype;return t&&n&&R0.call(n,"isPrototypeOf")}catch{return!1}}function Ie(e){return typeof e=="function"}function Oe(e,t){if(e&&Ie(t))if(Array.isArray(e)||De(e.length)){var n=e.length,r;for(r=0;r<n&&t.call(e,e[r],r,e)!==!1;r+=1);}else Qn(e)&&Object.keys(e).forEach(function(o){t.call(e,e[o],o,e)});return e}var ct=Object.assign||function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Qn(t)&&r.length>0&&r.forEach(function(a){Qn(a)&&Object.keys(a).forEach(function(s){t[s]=a[s]})}),t},P0=/^(?:width|height|left|top|marginLeft|marginTop)$/;function St(e,t){var n=e.style;Oe(t,function(r,o){P0.test(o)&&De(r)&&(r+="px"),n[o]=r})}function j0(e){return Kr(e)?e.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):e}function On(e,t){return!e||!t?!1:e.classList?e.classList.contains(t):e.className.indexOf(t)>-1}function le(e,t){if(!(!e||!t)){if(De(e.length)){Oe(e,function(r){le(r,t)});return}if(e.classList){e.classList.add(t);return}var n=e.className.trim();n?n.indexOf(t)<0&&(e.className="".concat(n," ").concat(t)):e.className=t}}function Ee(e,t){if(!(!e||!t)){if(De(e.length)){Oe(e,function(n){Ee(n,t)});return}if(e.classList){e.classList.remove(t);return}e.className.indexOf(t)>=0&&(e.className=e.className.replace(t,""))}}function Vr(e,t,n){if(t){if(De(e.length)){Oe(e,function(r){Vr(r,t,n)});return}n?le(e,t):Ee(e,t)}}var z0=/([a-z\d])([A-Z])/g;function Ua(e){return e.replace(z0,"$1-$2").toLowerCase()}function jn(e,t){return Qn(e[t])?e[t]:e.dataset?e.dataset[t]:e.getAttribute("data-".concat(Ua(t)))}function sa(e,t,n){Qn(n)?e[t]=n:e.dataset?e.dataset[t]=n:e.setAttribute("data-".concat(Ua(t)),n)}var Ud=function(){var e=!1;if(ai){var t=!1,n=function(){},r=Object.defineProperty({},"once",{get:function(){return e=!0,t},set:function(a){t=a}});Qt.addEventListener("test",n,r),Qt.removeEventListener("test",n,r)}return e}();function Te(e,t,n){var r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},o=n;t.trim().split(qa).forEach(function(a){if(!Ud){var s=e.listeners;s&&s[a]&&s[a][n]&&(o=s[a][n],delete s[a][n],Object.keys(s[a]).length===0&&delete s[a],Object.keys(s).length===0&&delete e.listeners)}e.removeEventListener(a,o,r)})}function de(e,t,n){var r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},o=n;t.trim().split(qa).forEach(function(a){if(r.once&&!Ud){var s=e.listeners,p=s===void 0?{}:s;o=function(){delete p[a][n],e.removeEventListener(a,o,r);for(var h=arguments.length,b=new Array(h),g=0;g<h;g++)b[g]=arguments[g];n.apply(e,b)},p[a]||(p[a]={}),p[a][n]&&e.removeEventListener(a,p[a][n],r),p[a][n]=o,e.listeners=p}e.addEventListener(a,o,r)})}function qe(e,t,n,r){var o;return Ie(Event)&&Ie(CustomEvent)?o=new CustomEvent(t,Ma({bubbles:!0,cancelable:!0,detail:n},r)):(o=document.createEvent("CustomEvent"),o.initCustomEvent(t,!0,!0,n)),e.dispatchEvent(o)}function D0(e){var t=e.getBoundingClientRect();return{left:t.left+(window.pageXOffset-document.documentElement.clientLeft),top:t.top+(window.pageYOffset-document.documentElement.clientTop)}}function To(e){var t=e.rotate,n=e.scaleX,r=e.scaleY,o=e.translateX,a=e.translateY,s=[];De(o)&&o!==0&&s.push("translateX(".concat(o,"px)")),De(a)&&a!==0&&s.push("translateY(".concat(a,"px)")),De(t)&&t!==0&&s.push("rotate(".concat(t,"deg)")),De(n)&&n!==1&&s.push("scaleX(".concat(n,")")),De(r)&&r!==1&&s.push("scaleY(".concat(r,")"));var p=s.length?s.join(" "):"none";return{WebkitTransform:p,msTransform:p,transform:p}}function N0(e){return Kr(e)?decodeURIComponent(e.replace(/^.*\//,"").replace(/[?&#].*$/,"")):""}var Di=Qt.navigator&&/(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(Qt.navigator.userAgent);function Hd(e,t,n){var r=document.createElement("img");if(e.naturalWidth&&!Di)return n(e.naturalWidth,e.naturalHeight),r;var o=document.body||document.documentElement;return r.onload=function(){n(r.width,r.height),Di||o.removeChild(r)},Oe(t.inheritedAttributes,function(a){var s=e.getAttribute(a);s!==null&&r.setAttribute(a,s)}),r.src=e.src,Di||(r.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",o.appendChild(r)),r}function Ao(e){switch(e){case 2:return B0;case 3:return S0;case 4:return C0;default:return""}}function M0(e){var t=Ma({},e),n=[];return Oe(e,function(r,o){delete t[o],Oe(t,function(a){var s=Math.abs(r.startX-a.startX),p=Math.abs(r.startY-a.startY),f=Math.abs(r.endX-a.endX),h=Math.abs(r.endY-a.endY),b=Math.sqrt(s*s+p*p),g=Math.sqrt(f*f+h*h),A=(g-b)/b;n.push(A)})}),n.sort(function(r,o){return Math.abs(r)<Math.abs(o)}),n[0]}function mo(e,t){var n=e.pageX,r=e.pageY,o={endX:n,endY:r};return t?o:Ma({timeStamp:Date.now(),startX:n,startY:r},o)}function F0(e){var t=0,n=0,r=0;return Oe(e,function(o){var a=o.startX,s=o.startY;t+=a,n+=s,r+=1}),t/=r,n/=r,{pageX:t,pageY:n}}var q0={render:function(){this.initContainer(),this.initViewer(),this.initList(),this.renderViewer()},initBody:function(){var t=this.element.ownerDocument,n=t.body||t.documentElement;this.body=n,this.scrollbarWidth=window.innerWidth-t.documentElement.clientWidth,this.initialBodyPaddingRight=n.style.paddingRight,this.initialBodyComputedPaddingRight=window.getComputedStyle(n).paddingRight},initContainer:function(){this.containerData={width:window.innerWidth,height:window.innerHeight}},initViewer:function(){var t=this.options,n=this.parent,r;t.inline&&(r={width:Math.max(n.offsetWidth,t.minWidth),height:Math.max(n.offsetHeight,t.minHeight)},this.parentData=r),(this.fulled||!r)&&(r=this.containerData),this.viewerData=ct({},r)},renderViewer:function(){this.options.inline&&!this.fulled&&St(this.viewer,this.viewerData)},initList:function(){var t=this,n=this.element,r=this.options,o=this.list,a=[];o.innerHTML="",Oe(this.images,function(s,p){var f=s.src,h=s.alt||N0(f),b=t.getImageURL(s);if(f||b){var g=document.createElement("li"),A=document.createElement("img");Oe(r.inheritedAttributes,function(k){var S=s.getAttribute(k);S!==null&&A.setAttribute(k,S)}),r.navbar&&(A.src=f||b),A.alt=h,A.setAttribute("data-original-url",b||f),g.setAttribute("data-index",p),g.setAttribute("data-viewer-action","view"),g.setAttribute("role","button"),r.keyboard&&g.setAttribute("tabindex",0),g.appendChild(A),o.appendChild(g),a.push(g)}}),this.items=a,Oe(a,function(s){var p=s.firstElementChild,f,h;sa(p,"filled",!0),r.loading&&le(s,qn),de(p,ft,f=function(g){Te(p,En,h),r.loading&&Ee(s,qn),t.loadImage(g)},{once:!0}),de(p,En,h=function(){Te(p,ft,f),r.loading&&Ee(s,qn)},{once:!0})}),r.transition&&de(n,$r,function(){le(o,Ne)},{once:!0})},renderList:function(){var t=this.index,n=this.items[t];if(n){var r=n.nextElementSibling,o=parseInt(window.getComputedStyle(r||n).marginLeft,10),a=n.offsetWidth,s=a+o;St(this.list,ct({width:s*this.length-o},To({translateX:(this.viewerData.width-a)/2-s*t})))}},resetList:function(){var t=this.list;t.innerHTML="",Ee(t,Ne),St(t,To({translateX:0}))},initImage:function(t){var n=this,r=this.options,o=this.image,a=this.viewerData,s=this.footer.offsetHeight,p=a.width,f=Math.max(a.height-s,s),h=this.imageData||{},b;this.imageInitializing={abort:function(){b.onload=null}},b=Hd(o,r,function(g,A){var k=g/A,S=Math.max(0,Math.min(1,r.initialCoverage)),C=p,I=f;n.imageInitializing=!1,f*k>p?I=p/k:C=f*k,S=De(S)?S:.9,C=Math.min(C*S,g),I=Math.min(I*S,A);var O=(p-C)/2,_=(f-I)/2,N={left:O,top:_,x:O,y:_,width:C,height:I,oldRatio:1,ratio:C/g,aspectRatio:k,naturalWidth:g,naturalHeight:A},M=ct({},N);r.rotatable&&(N.rotate=h.rotate||0,M.rotate=0),r.scalable&&(N.scaleX=h.scaleX||1,N.scaleY=h.scaleY||1,M.scaleX=1,M.scaleY=1),n.imageData=N,n.initialImageData=M,t&&t()})},renderImage:function(t){var n=this,r=this.image,o=this.imageData;if(St(r,ct({width:o.width,height:o.height,marginLeft:o.x,marginTop:o.y},To(o))),t)if((this.viewing||this.moving||this.rotating||this.scaling||this.zooming)&&this.options.transition&&On(r,Ne)){var a=function(){n.imageRendering=!1,t()};this.imageRendering={abort:function(){Te(r,Et,a)}},de(r,Et,a,{once:!0})}else t()},resetImage:function(){if(this.viewing||this.viewed){var t=this.image;this.viewing&&this.viewing.abort(),t.parentNode.removeChild(t),this.image=null}}},U0={bind:function(){var t=this.options,n=this.viewer,r=this.canvas,o=this.element.ownerDocument;de(n,Vn,this.onClick=this.click.bind(this)),de(n,Ls,this.onDragStart=this.dragstart.bind(this)),de(r,js,this.onPointerDown=this.pointerdown.bind(this)),de(o,zs,this.onPointerMove=this.pointermove.bind(this)),de(o,Ds,this.onPointerUp=this.pointerup.bind(this)),de(o,Ps,this.onKeyDown=this.keydown.bind(this)),de(window,Ns,this.onResize=this.resize.bind(this)),t.zoomable&&t.zoomOnWheel&&de(n,Ms,this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),t.toggleOnDblclick&&de(r,la,this.onDblclick=this.dblclick.bind(this))},unbind:function(){var t=this.options,n=this.viewer,r=this.canvas,o=this.element.ownerDocument;Te(n,Vn,this.onClick),Te(n,Ls,this.onDragStart),Te(r,js,this.onPointerDown),Te(o,zs,this.onPointerMove),Te(o,Ds,this.onPointerUp),Te(o,Ps,this.onKeyDown),Te(window,Ns,this.onResize),t.zoomable&&t.zoomOnWheel&&Te(n,Ms,this.onWheel,{passive:!1,capture:!0}),t.toggleOnDblclick&&Te(r,la,this.onDblclick)}},H0={click:function(t){var n=this.options,r=this.imageData,o=t.target,a=jn(o,Mo);switch(!a&&o.localName==="img"&&o.parentElement.localName==="li"&&(o=o.parentElement,a=jn(o,Mo)),Fn&&t.isTrusted&&o===this.canvas&&clearTimeout(this.clickCanvasTimeout),a){case"mix":this.played?this.stop():n.inline?this.fulled?this.exit():this.full():this.hide();break;case"hide":this.pointerMoved||this.hide();break;case"view":this.view(jn(o,"index"));break;case"zoom-in":this.zoom(.1,!0);break;case"zoom-out":this.zoom(-.1,!0);break;case"one-to-one":this.toggle();break;case"reset":this.reset();break;case"prev":this.prev(n.loop);break;case"play":this.play(n.fullscreen);break;case"next":this.next(n.loop);break;case"rotate-left":this.rotate(-90);break;case"rotate-right":this.rotate(90);break;case"flip-horizontal":this.scaleX(-r.scaleX||-1);break;case"flip-vertical":this.scaleY(-r.scaleY||-1);break;default:this.played&&this.stop()}},dblclick:function(t){t.preventDefault(),this.viewed&&t.target===this.image&&(Fn&&t.isTrusted&&clearTimeout(this.doubleClickImageTimeout),this.toggle(t.isTrusted?t:t.detail&&t.detail.originalEvent))},load:function(){var t=this;this.timeout&&(clearTimeout(this.timeout),this.timeout=!1);var n=this.element,r=this.options,o=this.image,a=this.index,s=this.viewerData;Ee(o,zr),r.loading&&Ee(this.canvas,qn),o.style.cssText="height:0;"+"margin-left:".concat(s.width/2,"px;")+"margin-top:".concat(s.height/2,"px;")+"max-width:none!important;position:relative;width:0;",this.initImage(function(){Vr(o,I0,r.movable),Vr(o,Ne,r.transition),t.renderImage(function(){t.viewed=!0,t.viewing=!1,Ie(r.viewed)&&de(n,$r,r.viewed,{once:!0}),qe(n,$r,{originalImage:t.images[a],index:a,image:o},{cancelable:!1})})})},loadImage:function(t){var n=t.target,r=n.parentNode,o=r.offsetWidth||30,a=r.offsetHeight||50,s=!!jn(n,"filled");Hd(n,this.options,function(p,f){var h=p/f,b=o,g=a;a*h>o?s?b=a*h:g=o/h:s?g=o/h:b=a*h,St(n,ct({width:b,height:g},To({translateX:(o-b)/2,translateY:(a-g)/2})))})},keydown:function(t){var n=this.options;if(n.keyboard){var r=t.keyCode||t.which||t.charCode;switch(r){case 13:this.viewer.contains(t.target)&&this.click(t);break}if(this.fulled)switch(r){case 27:this.played?this.stop():n.inline?this.fulled&&this.exit():this.hide();break;case 32:this.played&&this.stop();break;case 37:this.played&&this.playing?this.playing.prev():this.prev(n.loop);break;case 38:t.preventDefault(),this.zoom(n.zoomRatio,!0);break;case 39:this.played&&this.playing?this.playing.next():this.next(n.loop);break;case 40:t.preventDefault(),this.zoom(-n.zoomRatio,!0);break;case 48:case 49:t.ctrlKey&&(t.preventDefault(),this.toggle());break}}},dragstart:function(t){t.target.localName==="img"&&t.preventDefault()},pointerdown:function(t){var n=this.options,r=this.pointers,o=t.buttons,a=t.button;if(this.pointerMoved=!1,!(!this.viewed||this.showing||this.viewing||this.hiding||(t.type==="mousedown"||t.type==="pointerdown"&&t.pointerType==="mouse")&&(De(o)&&o!==1||De(a)&&a!==0||t.ctrlKey))){t.preventDefault(),t.changedTouches?Oe(t.changedTouches,function(p){r[p.identifier]=mo(p)}):r[t.pointerId||0]=mo(t);var s=n.movable?Bo:!1;n.zoomOnTouch&&n.zoomable&&Object.keys(r).length>1?s=_r:n.slideOnTouch&&(t.pointerType==="touch"||t.type==="touchstart")&&this.isSwitchable()&&(s=qd),n.transition&&(s===Bo||s===_r)&&Ee(this.image,Ne),this.action=s}},pointermove:function(t){var n=this.pointers,r=this.action;!this.viewed||!r||(t.preventDefault(),t.changedTouches?Oe(t.changedTouches,function(o){ct(n[o.identifier]||{},mo(o,!0))}):ct(n[t.pointerId||0]||{},mo(t,!0)),this.change(t))},pointerup:function(t){var n=this,r=this.options,o=this.action,a=this.pointers,s;t.changedTouches?Oe(t.changedTouches,function(p){s=a[p.identifier],delete a[p.identifier]}):(s=a[t.pointerId||0],delete a[t.pointerId||0]),o&&(t.preventDefault(),r.transition&&(o===Bo||o===_r)&&le(this.image,Ne),this.action=!1,Fn&&o!==_r&&s&&Date.now()-s.timeStamp<500&&(clearTimeout(this.clickCanvasTimeout),clearTimeout(this.doubleClickImageTimeout),r.toggleOnDblclick&&this.viewed&&t.target===this.image?this.imageClicked?(this.imageClicked=!1,this.doubleClickImageTimeout=setTimeout(function(){qe(n.image,la,{originalEvent:t})},50)):(this.imageClicked=!0,this.doubleClickImageTimeout=setTimeout(function(){n.imageClicked=!1},500)):(this.imageClicked=!1,r.backdrop&&r.backdrop!=="static"&&t.target===this.canvas&&(this.clickCanvasTimeout=setTimeout(function(){qe(n.canvas,Vn,{originalEvent:t})},50)))))},resize:function(){var t=this;if(!(!this.isShown||this.hiding)&&(this.fulled&&(this.close(),this.initBody(),this.open()),this.initContainer(),this.initViewer(),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){t.renderImage()}),this.played)){if(this.options.fullscreen&&this.fulled&&!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement)){this.stop();return}Oe(this.player.getElementsByTagName("img"),function(n){de(n,ft,t.loadImage.bind(t),{once:!0}),qe(n,ft)})}},wheel:function(t){var n=this;if(this.viewed&&(t.preventDefault(),!this.wheeling)){this.wheeling=!0,setTimeout(function(){n.wheeling=!1},50);var r=Number(this.options.zoomRatio)||.1,o=1;t.deltaY?o=t.deltaY>0?1:-1:t.wheelDelta?o=-t.wheelDelta/120:t.detail&&(o=t.detail>0?1:-1),this.zoom(-o*r,!0,null,t)}}},W0={show:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,n=this.element,r=this.options;if(r.inline||this.showing||this.isShown||this.showing)return this;if(!this.ready)return this.build(),this.ready&&this.show(t),this;if(Ie(r.show)&&de(n,qs,r.show,{once:!0}),qe(n,qs)===!1||!this.ready)return this;this.hiding&&this.transitioning.abort(),this.showing=!0,this.open();var o=this.viewer;if(Ee(o,mn),o.setAttribute("role","dialog"),o.setAttribute("aria-labelledby",this.title.id),o.setAttribute("aria-modal",!0),o.removeAttribute("aria-hidden"),r.transition&&!t){var a=this.shown.bind(this);this.transitioning={abort:function(){Te(o,Et,a),Ee(o,pt)}},le(o,Ne),o.initialOffsetWidth=o.offsetWidth,de(o,Et,a,{once:!0}),le(o,pt)}else le(o,pt),this.shown();return this},hide:function(){var t=this,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,r=this.element,o=this.options;if(o.inline||this.hiding||!(this.isShown||this.showing))return this;if(Ie(o.hide)&&de(r,Hs,o.hide,{once:!0}),qe(r,Hs)===!1)return this;this.showing&&this.transitioning.abort(),this.hiding=!0,this.played?this.stop():this.viewing&&this.viewing.abort();var a=this.viewer,s=this.image,p=function(){Ee(a,pt),t.hidden()};if(o.transition&&!n){var f=function b(g){g&&g.target===a&&(Te(a,Et,b),t.hidden())},h=function(){On(a,Ne)?(de(a,Et,f),Ee(a,pt)):p()};this.transitioning={abort:function(){t.viewed&&On(s,Ne)?Te(s,Et,h):On(a,Ne)&&Te(a,Et,f)}},this.viewed&&On(s,Ne)?(de(s,Et,h,{once:!0}),this.zoomTo(0,!1,null,null,!0)):h()}else p();return this},view:function(){var t=this,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:this.options.initialViewIndex;if(n=Number(n)||0,this.hiding||this.played||n<0||n>=this.length||this.viewed&&n===this.index)return this;if(!this.isShown)return this.index=n,this.show();this.viewing&&this.viewing.abort();var r=this.element,o=this.options,a=this.title,s=this.canvas,p=this.items[n],f=p.querySelector("img"),h=jn(f,"originalUrl"),b=f.getAttribute("alt"),g=document.createElement("img");if(Oe(o.inheritedAttributes,function(I){var O=f.getAttribute(I);O!==null&&g.setAttribute(I,O)}),g.src=h,g.alt=b,Ie(o.view)&&de(r,Ys,o.view,{once:!0}),qe(r,Ys,{originalImage:this.images[n],index:n,image:g})===!1||!this.isShown||this.hiding||this.played)return this;var A=this.items[this.index];A&&(Ee(A,ho),A.removeAttribute("aria-selected")),le(p,ho),p.setAttribute("aria-selected",!0),o.focus&&p.focus(),this.image=g,this.viewed=!1,this.index=n,this.imageData={},le(g,zr),o.loading&&le(s,qn),s.innerHTML="",s.appendChild(g),this.renderList(),a.innerHTML="";var k=function(){var O=t.imageData,_=Array.isArray(o.title)?o.title[1]:o.title;a.innerHTML=j0(Ie(_)?_.call(t,g,O):"".concat(b," (").concat(O.naturalWidth," × ").concat(O.naturalHeight,")"))},S,C;return de(r,$r,k,{once:!0}),this.viewing={abort:function(){Te(r,$r,k),g.complete?t.imageRendering?t.imageRendering.abort():t.imageInitializing&&t.imageInitializing.abort():(g.src="",Te(g,ft,S),t.timeout&&clearTimeout(t.timeout))}},g.complete?this.load():(de(g,ft,S=function(){Te(g,En,C),t.load()},{once:!0}),de(g,En,C=function(){Te(g,ft,S),t.timeout&&(clearTimeout(t.timeout),t.timeout=!1),Ee(g,zr),o.loading&&Ee(t.canvas,qn)},{once:!0}),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){Ee(g,zr),t.timeout=!1},1e3)),this},prev:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,n=this.index-1;return n<0&&(n=t?this.length-1:0),this.view(n),this},next:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,n=this.length-1,r=this.index+1;return r>n&&(r=t?0:n),this.view(r),this},move:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:t,r=this.imageData;return this.moveTo(Rn(t)?t:r.x+Number(t),Rn(n)?n:r.y+Number(n)),this},moveTo:function(t){var n=this,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:t,o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null,a=this.element,s=this.options,p=this.imageData;if(t=Number(t),r=Number(r),this.viewed&&!this.played&&s.movable){var f=p.x,h=p.y,b=!1;if(De(t)?b=!0:t=f,De(r)?b=!0:r=h,b){if(Ie(s.move)&&de(a,$s,s.move,{once:!0}),qe(a,$s,{x:t,y:r,oldX:f,oldY:h,originalEvent:o})===!1)return this;p.x=t,p.y=r,p.left=t,p.top=r,this.moving=!0,this.renderImage(function(){n.moving=!1,Ie(s.moved)&&de(a,Ks,s.moved,{once:!0}),qe(a,Ks,{x:t,y:r,oldX:f,oldY:h,originalEvent:o},{cancelable:!1})})}}return this},rotate:function(t){return this.rotateTo((this.imageData.rotate||0)+Number(t)),this},rotateTo:function(t){var n=this,r=this.element,o=this.options,a=this.imageData;if(t=Number(t),De(t)&&this.viewed&&!this.played&&o.rotatable){var s=a.rotate;if(Ie(o.rotate)&&de(r,Vs,o.rotate,{once:!0}),qe(r,Vs,{degree:t,oldDegree:s})===!1)return this;a.rotate=t,this.rotating=!0,this.renderImage(function(){n.rotating=!1,Ie(o.rotated)&&de(r,Qs,o.rotated,{once:!0}),qe(r,Qs,{degree:t,oldDegree:s},{cancelable:!1})})}return this},scaleX:function(t){return this.scale(t,this.imageData.scaleY),this},scaleY:function(t){return this.scale(this.imageData.scaleX,t),this},scale:function(t){var n=this,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:t,o=this.element,a=this.options,s=this.imageData;if(t=Number(t),r=Number(r),this.viewed&&!this.played&&a.scalable){var p=s.scaleX,f=s.scaleY,h=!1;if(De(t)?h=!0:t=p,De(r)?h=!0:r=f,h){if(Ie(a.scale)&&de(o,Xs,a.scale,{once:!0}),qe(o,Xs,{scaleX:t,scaleY:r,oldScaleX:p,oldScaleY:f})===!1)return this;s.scaleX=t,s.scaleY=r,this.scaling=!0,this.renderImage(function(){n.scaling=!1,Ie(a.scaled)&&de(o,Zs,a.scaled,{once:!0}),qe(o,Zs,{scaleX:t,scaleY:r,oldScaleX:p,oldScaleY:f},{cancelable:!1})})}}return this},zoom:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null,o=arguments.length>3&&arguments[3]!==void 0?arguments[3]:null,a=this.imageData;return t=Number(t),t<0?t=1/(1-t):t=1+t,this.zoomTo(a.width*t/a.naturalWidth,n,r,o),this},zoomTo:function(t){var n=this,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null,a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:null,s=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!1,p=this.element,f=this.options,h=this.pointers,b=this.imageData,g=b.x,A=b.y,k=b.width,S=b.height,C=b.naturalWidth,I=b.naturalHeight;if(t=Math.max(0,t),De(t)&&this.viewed&&!this.played&&(s||f.zoomable)){if(!s){var O=Math.max(.01,f.minZoomRatio),_=Math.min(100,f.maxZoomRatio);t=Math.min(Math.max(t,O),_)}if(a)switch(a.type){case"wheel":f.zoomRatio>=.055&&t>.95&&t<1.05&&(t=1);break;case"pointermove":case"touchmove":case"mousemove":t>.99&&t<1.01&&(t=1);break}var N=C*t,M=I*t,ye=N-k,me=M-S,Ue=b.ratio;if(Ie(f.zoom)&&de(p,Js,f.zoom,{once:!0}),qe(p,Js,{ratio:t,oldRatio:Ue,originalEvent:a})===!1)return this;if(this.zooming=!0,a){var Ke=D0(this.viewer),nt=h&&Object.keys(h).length>0?F0(h):{pageX:a.pageX,pageY:a.pageY};b.x-=ye*((nt.pageX-Ke.left-g)/k),b.y-=me*((nt.pageY-Ke.top-A)/S)}else Pn(o)&&De(o.x)&&De(o.y)?(b.x-=ye*((o.x-g)/k),b.y-=me*((o.y-A)/S)):(b.x-=ye/2,b.y-=me/2);b.left=b.x,b.top=b.y,b.width=N,b.height=M,b.oldRatio=Ue,b.ratio=t,this.renderImage(function(){n.zooming=!1,Ie(f.zoomed)&&de(p,Gs,f.zoomed,{once:!0}),qe(p,Gs,{ratio:t,oldRatio:Ue,originalEvent:a},{cancelable:!1})}),r&&this.tooltip()}return this},play:function(){var t=this,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;if(!this.isShown||this.played)return this;var r=this.element,o=this.options;if(Ie(o.play)&&de(r,ec,o.play,{once:!0}),qe(r,ec)===!1)return this;var a=this.player,s=this.loadImage.bind(this),p=[],f=0,h=0;if(this.played=!0,this.onLoadWhenPlay=s,n&&this.requestFullscreen(n),le(a,Tn),Oe(this.items,function(A,k){var S=A.querySelector("img"),C=document.createElement("img");C.src=jn(S,"originalUrl"),C.alt=S.getAttribute("alt"),C.referrerPolicy=S.referrerPolicy,f+=1,le(C,Io),Vr(C,Ne,o.transition),On(A,ho)&&(le(C,pt),h=k),p.push(C),de(C,ft,s,{once:!0}),a.appendChild(C)}),De(o.interval)&&o.interval>0){var b=function A(){clearTimeout(t.playing.timeout),Ee(p[h],pt),h-=1,h=h>=0?h:f-1,le(p[h],pt),t.playing.timeout=setTimeout(A,o.interval)},g=function A(){clearTimeout(t.playing.timeout),Ee(p[h],pt),h+=1,h=h<f?h:0,le(p[h],pt),t.playing.timeout=setTimeout(A,o.interval)};f>1&&(this.playing={prev:b,next:g,timeout:setTimeout(g,o.interval)})}return this},stop:function(){var t=this;if(!this.played)return this;var n=this.element,r=this.options;if(Ie(r.stop)&&de(n,tc,r.stop,{once:!0}),qe(n,tc)===!1)return this;var o=this.player;return clearTimeout(this.playing.timeout),this.playing=!1,this.played=!1,Oe(o.getElementsByTagName("img"),function(a){Te(a,ft,t.onLoadWhenPlay)}),Ee(o,Tn),o.innerHTML="",this.exitFullscreen(),this},full:function(){var t=this,n=this.options,r=this.viewer,o=this.image,a=this.list;return!this.isShown||this.played||this.fulled||!n.inline?this:(this.fulled=!0,this.open(),le(this.button,_s),n.transition&&(Ee(a,Ne),this.viewed&&Ee(o,Ne)),le(r,aa),r.setAttribute("role","dialog"),r.setAttribute("aria-labelledby",this.title.id),r.setAttribute("aria-modal",!0),r.removeAttribute("style"),St(r,{zIndex:n.zIndex}),n.focus&&this.enforceFocus(),this.initContainer(),this.viewerData=ct({},this.containerData),this.renderList(),this.viewed&&this.initImage(function(){t.renderImage(function(){n.transition&&setTimeout(function(){le(o,Ne),le(a,Ne)},0)})}),this)},exit:function(){var t=this,n=this.options,r=this.viewer,o=this.image,a=this.list;return!this.isShown||this.played||!this.fulled||!n.inline?this:(this.fulled=!1,this.close(),Ee(this.button,_s),n.transition&&(Ee(a,Ne),this.viewed&&Ee(o,Ne)),n.focus&&this.clearEnforceFocus(),r.removeAttribute("role"),r.removeAttribute("aria-labelledby"),r.removeAttribute("aria-modal"),Ee(r,aa),St(r,{zIndex:n.zIndexInline}),this.viewerData=ct({},this.parentData),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){t.renderImage(function(){n.transition&&setTimeout(function(){le(o,Ne),le(a,Ne)},0)})}),this)},tooltip:function(){var t=this,n=this.options,r=this.tooltipBox,o=this.imageData;return!this.viewed||this.played||!n.tooltip?this:(r.textContent="".concat(Math.round(o.ratio*100),"%"),this.tooltipping?clearTimeout(this.tooltipping):n.transition?(this.fading&&qe(r,Et),le(r,Tn),le(r,Io),le(r,Ne),r.removeAttribute("aria-hidden"),r.initialOffsetWidth=r.offsetWidth,le(r,pt)):(le(r,Tn),r.removeAttribute("aria-hidden")),this.tooltipping=setTimeout(function(){n.transition?(de(r,Et,function(){Ee(r,Tn),Ee(r,Io),Ee(r,Ne),r.setAttribute("aria-hidden",!0),t.fading=!1},{once:!0}),Ee(r,pt),t.fading=!0):(Ee(r,Tn),r.setAttribute("aria-hidden",!0)),t.tooltipping=!1},1e3),this)},toggle:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:null;return this.imageData.ratio===1?this.zoomTo(this.imageData.oldRatio,!0,null,t):this.zoomTo(1,!0,null,t),this},reset:function(){return this.viewed&&!this.played&&(this.imageData=ct({},this.initialImageData),this.renderImage()),this},update:function(){var t=this,n=this.element,r=this.options,o=this.isImg;if(o&&!n.parentNode)return this.destroy();var a=[];if(Oe(o?[n]:n.querySelectorAll("img"),function(h){Ie(r.filter)?r.filter.call(t,h)&&a.push(h):t.getImageURL(h)&&a.push(h)}),!a.length)return this;if(this.images=a,this.length=a.length,this.ready){var s=[];if(Oe(this.items,function(h,b){var g=h.querySelector("img"),A=a[b];A&&g?(A.src!==g.src||A.alt!==g.alt)&&s.push(b):s.push(b)}),St(this.list,{width:"auto"}),this.initList(),this.isShown)if(this.length){if(this.viewed){var p=s.indexOf(this.index);if(p>=0)this.viewed=!1,this.view(Math.max(Math.min(this.index-p,this.length-1),0));else{var f=this.items[this.index];le(f,ho),f.setAttribute("aria-selected",!0)}}}else this.image=null,this.viewed=!1,this.index=0,this.imageData={},this.canvas.innerHTML="",this.title.innerHTML=""}else this.build();return this},destroy:function(){var t=this.element,n=this.options;return t[he]?(this.destroyed=!0,this.ready?(this.played&&this.stop(),n.inline?(this.fulled&&this.exit(),this.unbind()):this.isShown?(this.viewing&&(this.imageRendering?this.imageRendering.abort():this.imageInitializing&&this.imageInitializing.abort()),this.hiding&&this.transitioning.abort(),this.hidden()):this.showing&&(this.transitioning.abort(),this.hidden()),this.ready=!1,this.viewer.parentNode.removeChild(this.viewer)):n.inline&&(this.delaying?this.delaying.abort():this.initializing&&this.initializing.abort()),n.inline||Te(t,Vn,this.onStart),t[he]=void 0,this):this}},Y0={getImageURL:function(t){var n=this.options.url;return Kr(n)?n=t.getAttribute(n):Ie(n)?n=n.call(this,t):n="",n},enforceFocus:function(){var t=this;this.clearEnforceFocus(),de(document,Rs,this.onFocusin=function(n){var r=t.viewer,o=n.target;if(!(o===document||o===r||r.contains(o))){for(;o;){if(o.getAttribute("tabindex")!==null||o.getAttribute("aria-modal")==="true")return;o=o.parentElement}r.focus()}})},clearEnforceFocus:function(){this.onFocusin&&(Te(document,Rs,this.onFocusin),this.onFocusin=null)},open:function(){var t=this.body;le(t,Os),this.scrollbarWidth>0&&(t.style.paddingRight="".concat(this.scrollbarWidth+(parseFloat(this.initialBodyComputedPaddingRight)||0),"px"))},close:function(){var t=this.body;Ee(t,Os),this.scrollbarWidth>0&&(t.style.paddingRight=this.initialBodyPaddingRight)},shown:function(){var t=this.element,n=this.options,r=this.viewer;this.fulled=!0,this.isShown=!0,this.render(),this.bind(),this.showing=!1,n.focus&&(r.focus(),this.enforceFocus()),Ie(n.shown)&&de(t,Us,n.shown,{once:!0}),qe(t,Us)!==!1&&this.ready&&this.isShown&&!this.hiding&&this.view(this.index)},hidden:function(){var t=this.element,n=this.options,r=this.viewer;n.fucus&&this.clearEnforceFocus(),this.fulled=!1,this.viewed=!1,this.isShown=!1,this.close(),this.unbind(),le(r,mn),r.removeAttribute("role"),r.removeAttribute("aria-labelledby"),r.removeAttribute("aria-modal"),r.setAttribute("aria-hidden",!0),this.resetList(),this.resetImage(),this.hiding=!1,this.destroyed||(Ie(n.hidden)&&de(t,Ws,n.hidden,{once:!0}),qe(t,Ws,null,{cancelable:!1}))},requestFullscreen:function(t){var n=this.element.ownerDocument;if(this.fulled&&!(n.fullscreenElement||n.webkitFullscreenElement||n.mozFullScreenElement||n.msFullscreenElement)){var r=n.documentElement;r.requestFullscreen?Pn(t)?r.requestFullscreen(t):r.requestFullscreen():r.webkitRequestFullscreen?r.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):r.mozRequestFullScreen?r.mozRequestFullScreen():r.msRequestFullscreen&&r.msRequestFullscreen()}},exitFullscreen:function(){var t=this.element.ownerDocument;this.fulled&&(t.fullscreenElement||t.webkitFullscreenElement||t.mozFullScreenElement||t.msFullscreenElement)&&(t.exitFullscreen?t.exitFullscreen():t.webkitExitFullscreen?t.webkitExitFullscreen():t.mozCancelFullScreen?t.mozCancelFullScreen():t.msExitFullscreen&&t.msExitFullscreen())},change:function(t){var n=this.options,r=this.pointers,o=r[Object.keys(r)[0]];if(o){var a=o.endX-o.startX,s=o.endY-o.startY;switch(this.action){case Bo:(a!==0||s!==0)&&(this.pointerMoved=!0,this.move(a,s,t));break;case _r:this.zoom(M0(r),!1,null,t);break;case qd:{this.action="switched";var p=Math.abs(a);p>1&&p>Math.abs(s)&&(this.pointers={},a>1?this.prev(n.loop):a<-1&&this.next(n.loop));break}}Oe(r,function(f){f.startX=f.endX,f.startY=f.endY})}},isSwitchable:function(){var t=this.imageData,n=this.viewerData;return this.length>1&&t.x>=0&&t.y>=0&&t.width<=n.width&&t.height<=n.height}},$0=Qt.Viewer,K0=function(e){return function(){return e+=1,e}}(-1),Wd=function(){function e(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(b0(this,e),!t||t.nodeType!==1)throw new Error("The first argument is required and must be an element.");this.element=t,this.options=ct({},Ts,Pn(n)&&n),this.action=!1,this.fading=!1,this.fulled=!1,this.hiding=!1,this.imageClicked=!1,this.imageData={},this.index=this.options.initialViewIndex,this.isImg=!1,this.isShown=!1,this.length=0,this.moving=!1,this.played=!1,this.playing=!1,this.pointers={},this.ready=!1,this.rotating=!1,this.scaling=!1,this.showing=!1,this.timeout=!1,this.tooltipping=!1,this.viewed=!1,this.viewing=!1,this.wheeling=!1,this.zooming=!1,this.pointerMoved=!1,this.id=K0(),this.init()}return g0(e,[{key:"init",value:function(){var n=this,r=this.element,o=this.options;if(!r[he]){r[he]=this,o.focus&&!o.keyboard&&(o.focus=!1);var a=r.localName==="img",s=[];if(Oe(a?[r]:r.querySelectorAll("img"),function(h){Ie(o.filter)?o.filter.call(n,h)&&s.push(h):n.getImageURL(h)&&s.push(h)}),this.isImg=a,this.length=s.length,this.images=s,this.initBody(),Rn(document.createElement(he).style.transition)&&(o.transition=!1),o.inline){var p=0,f=function(){if(p+=1,p===n.length){var b;n.initializing=!1,n.delaying={abort:function(){clearTimeout(b)}},b=setTimeout(function(){n.delaying=!1,n.build()},0)}};this.initializing={abort:function(){Oe(s,function(b){b.complete||(Te(b,ft,f),Te(b,En,f))})}},Oe(s,function(h){if(h.complete)f();else{var b,g;de(h,ft,b=function(){Te(h,En,g),f()},{once:!0}),de(h,En,g=function(){Te(h,ft,b),f()},{once:!0})}})}else de(r,Vn,this.onStart=function(h){var b=h.target;b.localName==="img"&&(!Ie(o.filter)||o.filter.call(n,b))&&n.view(n.images.indexOf(b))})}}},{key:"build",value:function(){if(!this.ready){var n=this.element,r=this.options,o=n.parentNode,a=document.createElement("div");a.innerHTML=w0;var s=a.querySelector(".".concat(he,"-container")),p=s.querySelector(".".concat(he,"-title")),f=s.querySelector(".".concat(he,"-toolbar")),h=s.querySelector(".".concat(he,"-navbar")),b=s.querySelector(".".concat(he,"-button")),g=s.querySelector(".".concat(he,"-canvas"));if(this.parent=o,this.viewer=s,this.title=p,this.toolbar=f,this.navbar=h,this.button=b,this.canvas=g,this.footer=s.querySelector(".".concat(he,"-footer")),this.tooltipBox=s.querySelector(".".concat(he,"-tooltip")),this.player=s.querySelector(".".concat(he,"-player")),this.list=s.querySelector(".".concat(he,"-list")),s.id="".concat(he).concat(this.id),p.id="".concat(he,"Title").concat(this.id),le(p,r.title?Ao(Array.isArray(r.title)?r.title[0]:r.title):mn),le(h,r.navbar?Ao(r.navbar):mn),Vr(b,mn,!r.button),r.keyboard&&b.setAttribute("tabindex",0),r.backdrop&&(le(s,"".concat(he,"-backdrop")),!r.inline&&r.backdrop!=="static"&&sa(g,Mo,"hide")),Kr(r.className)&&r.className&&r.className.split(qa).forEach(function(N){le(s,N)}),r.toolbar){var A=document.createElement("ul"),k=Pn(r.toolbar),S=yo.slice(0,3),C=yo.slice(7,9),I=yo.slice(9);k||le(f,Ao(r.toolbar)),Oe(k?r.toolbar:yo,function(N,M){var ye=k&&Pn(N),me=k?Ua(M):N,Ue=ye&&!Rn(N.show)?N.show:N;if(!(!Ue||!r.zoomable&&S.indexOf(me)!==-1||!r.rotatable&&C.indexOf(me)!==-1||!r.scalable&&I.indexOf(me)!==-1)){var Ke=ye&&!Rn(N.size)?N.size:N,nt=ye&&!Rn(N.click)?N.click:N,ce=document.createElement("li");r.keyboard&&ce.setAttribute("tabindex",0),ce.setAttribute("role","button"),le(ce,"".concat(he,"-").concat(me)),Ie(nt)||sa(ce,Mo,me),De(Ue)&&le(ce,Ao(Ue)),["small","large"].indexOf(Ke)!==-1?le(ce,"".concat(he,"-").concat(Ke)):me==="play"&&le(ce,"".concat(he,"-large")),Ie(nt)&&de(ce,Vn,nt),A.appendChild(ce)}}),f.appendChild(A)}else le(f,mn);if(!r.rotatable){var O=f.querySelectorAll('li[class*="rotate"]');le(O,zr),Oe(O,function(N){f.appendChild(N)})}if(r.inline)le(b,k0),St(s,{zIndex:r.zIndexInline}),window.getComputedStyle(o).position==="static"&&St(o,{position:"relative"}),o.insertBefore(s,n.nextSibling);else{le(b,x0),le(s,aa),le(s,Io),le(s,mn),St(s,{zIndex:r.zIndex});var _=r.container;Kr(_)&&(_=n.ownerDocument.querySelector(_)),_||(_=this.body),_.appendChild(s)}if(r.inline&&(this.render(),this.bind(),this.isShown=!0),this.ready=!0,Ie(r.ready)&&de(n,Fs,r.ready,{once:!0}),qe(n,Fs)===!1){this.ready=!1;return}this.ready&&r.inline&&this.view(this.index)}}}],[{key:"noConflict",value:function(){return window.Viewer=$0,e}},{key:"setDefaults",value:function(n){ct(Ts,Pn(n)&&n)}}]),e}();ct(Wd.prototype,q0,U0,H0,W0,Y0);/*!
 * v-viewer v3.0.11
 * https://github.com/mirari/v-viewer#readme
 *
 * Copyright 2022 mirari
 * Released under the MIT license
 *
 * Date: 2022-10-25T08:49:33.301Z
 */var bo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function V0(e){return e}var Yd=V0;function Q0(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}var X0=Q0,Z0=X0,nc=Math.max;function J0(e,t,n){return t=nc(t===void 0?e.length-1:t,0),function(){for(var r=arguments,o=-1,a=nc(r.length-t,0),s=Array(a);++o<a;)s[o]=r[t+o];o=-1;for(var p=Array(t+1);++o<t;)p[o]=r[o];return p[t]=n(s),Z0(e,this,p)}}var G0=J0;function eb(e){return function(){return e}}var tb=eb,nb=typeof bo=="object"&&bo&&bo.Object===Object&&bo,$d=nb,rb=$d,ob=typeof self=="object"&&self&&self.Object===Object&&self,ib=rb||ob||Function("return this")(),Ha=ib,ab=Ha,lb=ab.Symbol,Kd=lb,rc=Kd,Vd=Object.prototype,sb=Vd.hasOwnProperty,cb=Vd.toString,Br=rc?rc.toStringTag:void 0;function db(e){var t=sb.call(e,Br),n=e[Br];try{e[Br]=void 0;var r=!0}catch{}var o=cb.call(e);return r&&(t?e[Br]=n:delete e[Br]),o}var pb=db,ub=Object.prototype,fb=ub.toString;function hb(e){return fb.call(e)}var yb=hb,oc=Kd,Ab=pb,mb=yb,bb="[object Null]",gb="[object Undefined]",ic=oc?oc.toStringTag:void 0;function vb(e){return e==null?e===void 0?gb:bb:ic&&ic in Object(e)?Ab(e):mb(e)}var Wa=vb;function Eb(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var li=Eb,wb=Wa,xb=li,kb="[object AsyncFunction]",Cb="[object Function]",Sb="[object GeneratorFunction]",Bb="[object Proxy]";function Ib(e){if(!xb(e))return!1;var t=wb(e);return t==Cb||t==Sb||t==kb||t==Bb}var Qd=Ib,Tb=Ha,_b=Tb["__core-js_shared__"],Ob=_b,Ni=Ob,ac=function(){var e=/[^.]+$/.exec(Ni&&Ni.keys&&Ni.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function Lb(e){return!!ac&&ac in e}var Rb=Lb,Pb=Function.prototype,jb=Pb.toString;function zb(e){if(e!=null){try{return jb.call(e)}catch{}try{return e+""}catch{}}return""}var Db=zb,Nb=Qd,Mb=Rb,Fb=li,qb=Db,Ub=/[\\^$.*+?()[\]{}|]/g,Hb=/^\[object .+?Constructor\]$/,Wb=Function.prototype,Yb=Object.prototype,$b=Wb.toString,Kb=Yb.hasOwnProperty,Vb=RegExp("^"+$b.call(Kb).replace(Ub,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Qb(e){if(!Fb(e)||Mb(e))return!1;var t=Nb(e)?Vb:Hb;return t.test(qb(e))}var Xb=Qb;function Zb(e,t){return e==null?void 0:e[t]}var Jb=Zb,Gb=Xb,eg=Jb;function tg(e,t){var n=eg(e,t);return Gb(n)?n:void 0}var ng=tg,rg=ng,og=function(){try{var e=rg(Object,"defineProperty");return e({},"",{}),e}catch{}}(),ig=og,ag=tb,lc=ig,lg=Yd,sg=lc?function(e,t){return lc(e,"toString",{configurable:!0,enumerable:!1,value:ag(t),writable:!0})}:lg,cg=sg,dg=800,pg=16,ug=Date.now;function fg(e){var t=0,n=0;return function(){var r=ug(),o=pg-(r-n);if(n=r,o>0){if(++t>=dg)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}var hg=fg,yg=cg,Ag=hg,mg=Ag(yg),bg=mg,gg=Yd,vg=G0,Eg=bg;function wg(e,t){return Eg(vg(e,t,gg),e+"")}var xg=wg;function kg(e,t){return e===t||e!==e&&t!==t}var Xd=kg,Cg=9007199254740991;function Sg(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=Cg}var Zd=Sg,Bg=Qd,Ig=Zd;function Tg(e){return e!=null&&Ig(e.length)&&!Bg(e)}var Jd=Tg,_g=9007199254740991,Og=/^(?:0|[1-9]\d*)$/;function Lg(e,t){var n=typeof e;return t=t??_g,!!t&&(n=="number"||n!="symbol"&&Og.test(e))&&e>-1&&e%1==0&&e<t}var Gd=Lg,Rg=Xd,Pg=Jd,jg=Gd,zg=li;function Dg(e,t,n){if(!zg(n))return!1;var r=typeof t;return(r=="number"?Pg(n)&&jg(t,n.length):r=="string"&&t in n)?Rg(n[t],e):!1}var Ng=Dg;function Mg(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}var Fg=Mg;function qg(e){return e!=null&&typeof e=="object"}var Ya=qg,Ug=Wa,Hg=Ya,Wg="[object Arguments]";function Yg(e){return Hg(e)&&Ug(e)==Wg}var $g=Yg,sc=$g,Kg=Ya,ep=Object.prototype,Vg=ep.hasOwnProperty,Qg=ep.propertyIsEnumerable,Xg=sc(function(){return arguments}())?sc:function(e){return Kg(e)&&Vg.call(e,"callee")&&!Qg.call(e,"callee")},Zg=Xg,Jg=Array.isArray,Gg=Jg,ca={exports:{}};function ev(){return!1}var tv=ev;(function(e,t){var n=Ha,r=tv,o=t&&!t.nodeType&&t,a=o&&!0&&e&&!e.nodeType&&e,s=a&&a.exports===o,p=s?n.Buffer:void 0,f=p?p.isBuffer:void 0,h=f||r;e.exports=h})(ca,ca.exports);var nv=Wa,rv=Zd,ov=Ya,iv="[object Arguments]",av="[object Array]",lv="[object Boolean]",sv="[object Date]",cv="[object Error]",dv="[object Function]",pv="[object Map]",uv="[object Number]",fv="[object Object]",hv="[object RegExp]",yv="[object Set]",Av="[object String]",mv="[object WeakMap]",bv="[object ArrayBuffer]",gv="[object DataView]",vv="[object Float32Array]",Ev="[object Float64Array]",wv="[object Int8Array]",xv="[object Int16Array]",kv="[object Int32Array]",Cv="[object Uint8Array]",Sv="[object Uint8ClampedArray]",Bv="[object Uint16Array]",Iv="[object Uint32Array]",Le={};Le[vv]=Le[Ev]=Le[wv]=Le[xv]=Le[kv]=Le[Cv]=Le[Sv]=Le[Bv]=Le[Iv]=!0;Le[iv]=Le[av]=Le[bv]=Le[lv]=Le[gv]=Le[sv]=Le[cv]=Le[dv]=Le[pv]=Le[uv]=Le[fv]=Le[hv]=Le[yv]=Le[Av]=Le[mv]=!1;function Tv(e){return ov(e)&&rv(e.length)&&!!Le[nv(e)]}var _v=Tv;function Ov(e){return function(t){return e(t)}}var Lv=Ov,da={exports:{}};(function(e,t){var n=$d,r=t&&!t.nodeType&&t,o=r&&!0&&e&&!e.nodeType&&e,a=o&&o.exports===r,s=a&&n.process,p=function(){try{var f=o&&o.require&&o.require("util").types;return f||s&&s.binding&&s.binding("util")}catch{}}();e.exports=p})(da,da.exports);var Rv=_v,Pv=Lv,cc=da.exports,dc=cc&&cc.isTypedArray,jv=dc?Pv(dc):Rv,zv=jv,Dv=Fg,Nv=Zg,Mv=Gg,Fv=ca.exports,qv=Gd,Uv=zv,Hv=Object.prototype,Wv=Hv.hasOwnProperty;function Yv(e,t){var n=Mv(e),r=!n&&Nv(e),o=!n&&!r&&Fv(e),a=!n&&!r&&!o&&Uv(e),s=n||r||o||a,p=s?Dv(e.length,String):[],f=p.length;for(var h in e)(t||Wv.call(e,h))&&!(s&&(h=="length"||o&&(h=="offset"||h=="parent")||a&&(h=="buffer"||h=="byteLength"||h=="byteOffset")||qv(h,f)))&&p.push(h);return p}var $v=Yv,Kv=Object.prototype;function Vv(e){var t=e&&e.constructor,n=typeof t=="function"&&t.prototype||Kv;return e===n}var Qv=Vv;function Xv(e){var t=[];if(e!=null)for(var n in Object(e))t.push(n);return t}var Zv=Xv,Jv=li,Gv=Qv,e1=Zv,t1=Object.prototype,n1=t1.hasOwnProperty;function r1(e){if(!Jv(e))return e1(e);var t=Gv(e),n=[];for(var r in e)r=="constructor"&&(t||!n1.call(e,r))||n.push(r);return n}var o1=r1,i1=$v,a1=o1,l1=Jd;function s1(e){return l1(e)?i1(e,!0):a1(e)}var c1=s1,d1=xg,p1=Xd,u1=Ng,f1=c1,tp=Object.prototype,h1=tp.hasOwnProperty;d1(function(e,t){e=Object(e);var n=-1,r=t.length,o=r>2?t[2]:void 0;for(o&&u1(t[0],t[1],o)&&(r=1);++n<r;)for(var a=t[n],s=f1(a),p=-1,f=s.length;++p<f;){var h=s[p],b=e[h];(b===void 0||p1(b,tp[h])&&!h1.call(e,h))&&(e[h]=a[h])}return e});const y1=typeof window<"u"&&window!==null;g1();const A1=Object.prototype.propertyIsEnumerable,pc=Object.getOwnPropertySymbols;function _o(e){return typeof e=="function"||toString.call(e)==="[object Object]"}function m1(e){return typeof e=="object"?e===null:typeof e!="function"}function b1(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"}function g1(){return y1&&"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype?("isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get(){return this.intersectionRatio>0}}),!0):!1}function v1(e,...t){if(!_o(e))throw new TypeError("expected the first argument to be an object");if(t.length===0||typeof Symbol!="function"||typeof pc!="function")return e;for(const n of t){const r=pc(n);for(const o of r)A1.call(n,o)&&(e[o]=n[o])}return e}function np(e,...t){let n=0;for(m1(e)&&(e=t[n++]),e||(e={});n<t.length;n++)if(_o(t[n])){for(const r of Object.keys(t[n]))b1(r)&&(_o(e[r])&&_o(t[n][r])?np(e[r],t[n][r]):e[r]=t[n][r]);v1(e,t[n])}return e}const E1=({images:e=[],options:t})=>{t=np(t,{inline:!1});const n=document.createElement("div"),r=zo("div",{style:{display:"none"},class:["__viewer-token"]},e.map(p=>zo("img",typeof p=="string"?{src:p}:p)));es(r,n);const o=n.firstElementChild;document.body.appendChild(o);const a=new Wd(o,t),s=a.destroy.bind(a);return a.destroy=function(){return s(),es(null,n),a},a.show(),o.addEventListener("hidden",function(){this.viewer===a&&a.destroy()}),a};const w1={__name:"main",setup(e){const t=RA();Ra();const n=`${window.location.protocol}//${window.location.hostname}:3000`,r=$t("$"),o=$t([]),a=$t([{span:"文件名",prop:"name",textColor:"",bgColor:""},{span:"大小",prop:"size",textColor:"red",bgColor:"red"},{span:"操作",prop:"cz",width:"80px",textColor:"green",bgColor:"green"}]),s=()=>{r.value=r.value.slice(0,r.value.lastIndexOf("__")===-1?r.value.length:r.value.lastIndexOf("__")),C()},p=$t([]),f=()=>{E1({images:p.value})},h=(I,O)=>(I==="$"?I="":I=I.replace(/\$/g,""),I=I.replace(/__/g,"/"),console.log(`${n}/getFile${I}/${O}`),`${n}/getFile${I}/${O}`),b=I=>{let O=o.value[I];alert(h(r.value,O.name))},g=[".MP4",".AVI",".MOV",".FLV",".MKV"],A=[".JPG",".JPEG",".PNG",".WEBP"],k=[".WAV",".MP3",".OGG"],S=I=>{let O=o.value[I];if(O.isDirectory&&!O.isFile)r.value+=`__${O.name}`,C();else{let _=O.suffix;if(g.includes(_.toUpperCase()))t.push({path:"/VideoPlay",query:{url:h(r.value,O.name)}});else if(A.includes(_.toUpperCase())){p.value=[];for(let N=I;N<o.value.length&&N<N+10;N++){let M=o.value[N].suffix;A.includes(M.toUpperCase())&&p.value.push(h(r.value,o.value[N].name))}f()}else if(k.includes(_.toUpperCase()))t.push({path:"/AudioPlay",query:{url:h(r.value,O.name)}});else{let N=document.createElement("a");N.href=h(r.value,O.name),N.download=O.name,N.target="_blank",N.click()}}},C=()=>{m0.get(`${n}/list/${r.value}`).then((I,O)=>{I.status===200&&(o.value=I.data.map(_=>(_.size=(Number(_.size)/1024/1024).toFixed(2)+"MB",_.isDirectory&&(_.size=""),_)))})};return Qr(()=>{C()}),(I,O)=>(Re(),it("div",null,[G(em,{"table-data":o.value,"table-head":a.value,onClickFile:S,onCopyUrl:b},null,8,["table-data","table-head"]),gn("div",{class:"ret",onClick:s},"返回")]))}},x1=_a(w1,[["__scopeId","data-v-e19dcd53"]]);var k1=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function C1(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var rp={exports:{}};(function(e,t){(function(n,r){e.exports=r()})(self,()=>(()=>{var n={916:(s,p,f)=>{var h=f(471);s.exports=function(b){var g,A="",k=(b=b||{}).video,S=b.options,C=h.$escape,I=b.tran,O=b.icons,_=b.index,N=h.$each;return b.$value,b.$index,A+=`<div class="dplayer-mask"></div>
<div class="dplayer-video-wrap">
    `,g=f(568)(k),A+=g,A+=`
    `,S.logo&&(A+=`
    <div class="dplayer-logo">
        <img src="`,A+=C(S.logo),A+=`">
    </div>
    `),A+=`
    <div class="dplayer-danmaku"`,S.danmaku&&S.danmaku.bottom&&(A+=' style="margin-bottom:',A+=C(S.danmaku.bottom),A+='"'),A+=`>
        <div class="dplayer-danmaku-item dplayer-danmaku-item--demo"></div>
    </div>
    <div class="dplayer-subtitle"></div>
    <div class="dplayer-bezel">
        <span class="dplayer-bezel-icon"></span>
        `,S.danmaku&&(A+=`
        <span class="dplayer-danloading">`,A+=C(I("danmaku-loading")),A+=`</span>
        `),A+=`
        <span class="diplayer-loading-icon">`,A+=O.loading,A+=`</span>
    </div>
</div>
<div class="dplayer-controller-mask"></div>
<div class="dplayer-controller">
    <div class="dplayer-icons dplayer-comment-box">
        <button class="dplayer-icon dplayer-comment-setting-icon" data-balloon="`,A+=C(I("setting")),A+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,A+=O.pallette,A+=`</span>
        </button>
        <div class="dplayer-comment-setting-box">
            <div class="dplayer-comment-setting-color">
                <div class="dplayer-comment-setting-title">`,A+=C(I("set-danmaku-color")),A+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,A+=C(_),A+=`" value="#fff" checked>
                    <span style="background: #fff;"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,A+=C(_),A+=`" value="#e54256">
                    <span style="background: #e54256"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,A+=C(_),A+=`" value="#ffe133">
                    <span style="background: #ffe133"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,A+=C(_),A+=`" value="#64DD17">
                    <span style="background: #64DD17"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,A+=C(_),A+=`" value="#39ccff">
                    <span style="background: #39ccff"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,A+=C(_),A+=`" value="#D500F9">
                    <span style="background: #D500F9"></span>
                </label>
            </div>
            <div class="dplayer-comment-setting-type">
                <div class="dplayer-comment-setting-title">`,A+=C(I("set-danmaku-type")),A+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,A+=C(_),A+=`" value="1">
                    <span>`,A+=C(I("top")),A+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,A+=C(_),A+=`" value="0" checked>
                    <span>`,A+=C(I("rolling")),A+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,A+=C(_),A+=`" value="2">
                    <span>`,A+=C(I("bottom")),A+=`</span>
                </label>
            </div>
        </div>
        <input class="dplayer-comment-input" type="text" placeholder="`,A+=C(I("input-danmaku-enter")),A+=`" maxlength="30">
        <button class="dplayer-icon dplayer-send-icon" data-balloon="`,A+=C(I("send")),A+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,A+=O.send,A+=`</span>
        </button>
    </div>
    <div class="dplayer-icons dplayer-icons-left">
        <button class="dplayer-icon dplayer-play-icon">
            <span class="dplayer-icon-content">`,A+=O.play,A+=`</span>
        </button>
        <div class="dplayer-volume">
            <button class="dplayer-icon dplayer-volume-icon">
                <span class="dplayer-icon-content">`,A+=O.volumeDown,A+=`</span>
            </button>
            <div class="dplayer-volume-bar-wrap" data-balloon-pos="up">
                <div class="dplayer-volume-bar">
                    <div class="dplayer-volume-bar-inner" style="background: `,A+=C(S.theme),A+=`;">
                        <span class="dplayer-thumb" style="background: `,A+=C(S.theme),A+=`"></span>
                    </div>
                </div>
            </div>
        </div>
        <span class="dplayer-time">
            <span class="dplayer-ptime">0:00</span> /
            <span class="dplayer-dtime">0:00</span>
        </span>
        `,S.live&&(A+=`
        <span class="dplayer-live-badge"><span class="dplayer-live-dot" style="background: `,A+=C(S.theme),A+=';"></span>',A+=C(I("live")),A+=`</span>
        `),A+=`
    </div>
    <div class="dplayer-icons dplayer-icons-right">
        `,S.video.quality&&(A+=`
        <div class="dplayer-quality">
            <button class="dplayer-icon dplayer-quality-icon">`,A+=C(S.video.quality[S.video.defaultQuality].name),A+=`</button>
            <div class="dplayer-quality-mask">
                <div class="dplayer-quality-list">
                `,N(S.video.quality,function(M,ye){A+=`
                    <div class="dplayer-quality-item" data-index="`,A+=C(ye),A+='">',A+=C(M.name),A+=`</div>
                `}),A+=`
                </div>
            </div>
        </div>
        `),A+=`
        `,S.screenshot&&(A+=`
        <div class="dplayer-icon dplayer-camera-icon" data-balloon="`,A+=C(I("screenshot")),A+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,A+=O.camera,A+=`</span>
        </div>
        `),A+=`
        `,S.airplay&&(A+=`
        <div class="dplayer-icon dplayer-airplay-icon" data-balloon="`,A+=C(I("airplay")),A+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,A+=O.airplay,A+=`</span>
        </div>
        `),A+=`
        `,S.chromecast&&(A+=`
        <div class="dplayer-icon dplayer-chromecast-icon" data-balloon="`,A+=C(I("chromecast")),A+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,A+=O.chromecast,A+=`</span>
        </div>
        `),A+=`
        <div class="dplayer-comment">
            <button class="dplayer-icon dplayer-comment-icon" data-balloon="`,A+=C(I("send-danmaku")),A+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,A+=O.comment,A+=`</span>
            </button>
        </div>
        `,S.subtitle&&(A+=`
        `,typeof S.subtitle.url=="string"?(A+=`
        <div class="dplayer-subtitle-btn">
            <button class="dplayer-icon dplayer-subtitle-icon" data-balloon="`,A+=C(I("hide-subs")),A+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,A+=O.subtitle,A+=`</span>
            </button>
        </div>
        `):(A+=`
        <div class="dplayer-subtitles">
            <button class="dplayer-icon dplayer-subtitles-icon" data-balloon="`,A+=C(I("subtitle")),A+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,A+=O.subtitle,A+=`</span>
            </button>
            <div class="dplayer-subtitles-box">
                <div class="dplayer-subtitles-panel">
                    `,N(S.subtitle.url,function(M,ye){A+=`
                        <div class="dplayer-subtitles-item" data-subtitle="`,A+=C(M.url),A+=`">
                            <!-- if lang, show tran(lang). if lang and name, show name + (tran(lang)). if name, show name. off option use lang for translation. -->
                            <span class="dplayer-label">`,A+=C(M.lang?M.name?M.name+" ("+I(M.lang)+")":I(M.lang):M.name),A+=`</span>
                        </div>
                    `}),A+=`
                </div>
            </div>
        </div>
        `),A+=`
        `),A+=`
        <div class="dplayer-setting">
            <button class="dplayer-icon dplayer-setting-icon" data-balloon="`,A+=C(I("setting")),A+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,A+=O.setting,A+=`</span>
            </button>
            <div class="dplayer-setting-box">
                <div class="dplayer-setting-origin-panel">
                    <div class="dplayer-setting-item dplayer-setting-speed">
                        <span class="dplayer-label">`,A+=C(I("speed")),A+=`</span>
                        <div class="dplayer-toggle">`,A+=O.right,A+=`</div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-loop">
                        <span class="dplayer-label">`,A+=C(I("loop")),A+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-toggle-setting-input" type="checkbox" name="dplayer-toggle">
                            <label for="dplayer-toggle"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-showdan">
                        <span class="dplayer-label">`,A+=C(I("show-danmaku")),A+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-showdan-setting-input" type="checkbox" name="dplayer-toggle-dan">
                            <label for="dplayer-toggle-dan"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danunlimit">
                        <span class="dplayer-label">`,A+=C(I("unlimited-danmaku")),A+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-danunlimit-setting-input" type="checkbox" name="dplayer-toggle-danunlimit">
                            <label for="dplayer-toggle-danunlimit"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danmaku">
                        <span class="dplayer-label">`,A+=C(I("opacity-danmaku")),A+=`</span>
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
                    `,N(S.playbackSpeed,function(M,ye){A+=`
                        <div class="dplayer-setting-speed-item" data-speed="`,A+=C(M),A+=`">
                            <span class="dplayer-label">`,A+=C(M===1?I("normal"):M),A+=`</span>
                        </div>
                    `}),A+=`
                </div>
            </div>
        </div>
        <div class="dplayer-full">
            <button class="dplayer-icon dplayer-full-in-icon" data-balloon="`,A+=C(I("web-fullscreen")),A+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,A+=O.fullWeb,A+=`</span>
            </button>
            <button class="dplayer-icon dplayer-full-icon" data-balloon="`,A+=C(I("fullscreen")),A+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,A+=O.full,A+=`</span>
            </button>
        </div>
    </div>
    <div class="dplayer-bar-wrap">
        <div class="dplayer-bar-time hidden">00:00</div>
        <div class="dplayer-bar-preview"></div>
        <div class="dplayer-bar">
            <div class="dplayer-loaded" style="width: 0;"></div>
            <div class="dplayer-played" style="width: 0; background: `,A+=C(S.theme),A+=`">
                <span class="dplayer-thumb" style="background: `,A+=C(S.theme),A+=`"></span>
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
    `,S.danmaku&&(A+=`
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
    `),A+=`
</div>
<div class="dplayer-menu">
    `,N(S.contextmenu,function(M,ye){A+=`
        <div class="dplayer-menu-item">
            <a`,M.link&&(A+=' target="_blank"'),A+=' href="',A+=C(M.link||"javascript:void(0);"),A+='">',M.key&&(A+=" ",A+=C(I(M.key))),M.text&&(A+=" ",A+=C(M.text)),A+=`</a>
        </div>
    `}),A+=`
</div>
<div class="dplayer-notice-list"></div>
<button class="dplayer-mobile-play">
    `,A+=O.play,A+=`
</button>`}},568:(s,p,f)=>{var h=f(471);s.exports=function(b){var g="",A=(b=b||{}).enableSubtitle,k=b.subtitle,S=b.current,C=b.airplay,I=b.pic,O=h.$escape,_=b.screenshot,N=b.preload,M=b.url;return A=k&&k.type==="webvtt",g+=`
<video
    class="dplayer-video `,S&&(g+="dplayer-video-current"),g+=`"
    webkit-playsinline
    `,C&&(g+=' x-webkit-airplay="allow" '),g+=`
    playsinline
    `,I&&(g+='poster="',g+=O(I),g+='"'),g+=`
    `,(_||A)&&(g+='crossorigin="anonymous"'),g+=`
    `,N&&(g+='preload="',g+=O(N),g+='"'),g+=`
    `,C?g+=`
    nosrc
    `:M&&(g+=`
    src="`,g+=O(M),g+=`"
    `),g+=`
    >
    `,C&&(g+=`
    <source src="`,g+=O(M),g+=`">
    `),g+=`
    `,A&&(g+=`
    <track class="dplayer-subtrack" kind="metadata" default src="`,g+=O(typeof k.url=="string"?k.url:k.url[k.index].url),g+=`"></track>
    `),g+`
</video>`}},49:(s,p,f)=>{f.d(p,{Z:()=>k});var h=f(415),b=f.n(h),g=f(352),A=f.n(g)()(b());A.push([s.id,`:root {
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
`],sourceRoot:""}]);const k=A},685:(s,p,f)=>{f.d(p,{Z:()=>N});var h=f(415),b=f.n(h),g=f(352),A=f.n(g),k=f(49),S=f(80),C=f.n(S),I=new URL(f(831),f.b),O=A()(b());O.i(k.Z);var _=C()(I);O.push([s.id,`@keyframes my-face {
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
  background: url(`+_+`) repeat-x bottom;
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
}`],sourceRoot:""}]);const N=O},856:s=>{var p=[];function f(g){for(var A=-1,k=0;k<p.length;k++)if(p[k].identifier===g){A=k;break}return A}function h(g,A){for(var k={},S=[],C=0;C<g.length;C++){var I=g[C],O=A.base?I[0]+A.base:I[0],_=k[O]||0,N="".concat(O," ").concat(_);k[O]=_+1;var M=f(N),ye={css:I[1],media:I[2],sourceMap:I[3],supports:I[4],layer:I[5]};if(M!==-1)p[M].references++,p[M].updater(ye);else{var me=b(ye,A);A.byIndex=C,p.splice(C,0,{identifier:N,updater:me,references:1})}S.push(N)}return S}function b(g,A){var k=A.domAPI(A);return k.update(g),function(S){if(S){if(S.css===g.css&&S.media===g.media&&S.sourceMap===g.sourceMap&&S.supports===g.supports&&S.layer===g.layer)return;k.update(g=S)}else k.remove()}}s.exports=function(g,A){var k=h(g=g||[],A=A||{});return function(S){S=S||[];for(var C=0;C<k.length;C++){var I=f(k[C]);p[I].references--}for(var O=h(S,A),_=0;_<k.length;_++){var N=f(k[_]);p[N].references===0&&(p[N].updater(),p.splice(N,1))}k=O}}},370:s=>{var p={};s.exports=function(f,h){var b=function(g){if(p[g]===void 0){var A=document.querySelector(g);if(window.HTMLIFrameElement&&A instanceof window.HTMLIFrameElement)try{A=A.contentDocument.head}catch{A=null}p[g]=A}return p[g]}(f);if(!b)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");b.appendChild(h)}},278:s=>{s.exports=function(p){var f=document.createElement("style");return p.setAttributes(f,p.attributes),p.insert(f,p.options),f}},458:(s,p,f)=>{s.exports=function(h){var b=f.nc;b&&h.setAttribute("nonce",b)}},470:s=>{s.exports=function(p){var f=p.insertStyleElement(p);return{update:function(h){(function(b,g,A){var k="";A.supports&&(k+="@supports (".concat(A.supports,") {")),A.media&&(k+="@media ".concat(A.media," {"));var S=A.layer!==void 0;S&&(k+="@layer".concat(A.layer.length>0?" ".concat(A.layer):""," {")),k+=A.css,S&&(k+="}"),A.media&&(k+="}"),A.supports&&(k+="}");var C=A.sourceMap;C&&typeof btoa<"u"&&(k+=`
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(C))))," */")),g.styleTagTransform(k,b,g.options)})(f,p,h)},remove:function(){(function(h){if(h.parentNode===null)return!1;h.parentNode.removeChild(h)})(f)}}}},488:s=>{s.exports=function(p,f){if(f.styleSheet)f.styleSheet.cssText=p;else{for(;f.firstChild;)f.removeChild(f.firstChild);f.appendChild(document.createTextNode(p))}}},251:s=>{s.exports='<svg viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg"><path d="M288 90v96c0 20-16 36-36 36h-10c-16 0-16-24 0-24h10c7 0 12-5 12-12V90c0-7-5-12-12-12H36c-7 0-12 5-12 12v96c0 7 5 12 12 12h10c16 0 16 24 0 24H36c-20 0-36-16-36-36V90c0-20 16-36 36-36h216c20 0 36 16 36 36zm-120 62l48 68c14 20 1 38-20 38H92c-21 0-34-18-20-38l48-68c13-18 35-18 48 0z"></path></svg>'},113:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M16 23c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zM16 13c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zM27 28h-22c-1.654 0-3-1.346-3-3v-16c0-1.654 1.346-3 3-3h3c0.552 0 1 0.448 1 1s-0.448 1-1 1h-3c-0.551 0-1 0.449-1 1v16c0 0.552 0.449 1 1 1h22c0.552 0 1-0.448 1-1v-16c0-0.551-0.448-1-1-1h-11c-0.552 0-1-0.448-1-1s0.448-1 1-1h11c1.654 0 3 1.346 3 3v16c0 1.654-1.346 3-3 3zM24 10.5c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5zM15 4c0 0.552-0.448 1-1 1h-4c-0.552 0-1-0.448-1-1v0c0-0.552 0.448-1 1-1h4c0.552 0 1 0.448 1 1v0z"></path></svg>'},193:s=>{s.exports='<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="chromecast" class="svg-inline--fa fa-chromecast fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M447.8,64H64c-23.6,0-42.7,19.1-42.7,42.7v63.9H64v-63.9h383.8v298.6H298.6V448H448c23.6,0,42.7-19.1,42.7-42.7V106.7 C490.7,83.1,471.4,64,447.8,64z M21.3,383.6L21.3,383.6l0,63.9h63.9C85.2,412.2,56.6,383.6,21.3,383.6L21.3,383.6z M21.3,298.6V341 c58.9,0,106.6,48.1,106.6,107h42.7C170.7,365.6,103.7,298.7,21.3,298.6z M213.4,448h42.7c-0.5-129.5-105.3-234.3-234.8-234.6l0,42.4 C127.3,255.6,213.3,342,213.4,448z"></path></svg>'},338:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.090 0.131h-22.731c-2.354 0-4.262 1.839-4.262 4.109v16.401c0 2.269 1.908 4.109 4.262 4.109h4.262v-2.706h8.469l-8.853 8.135 1.579 1.451 7.487-6.88h9.787c2.353 0 4.262-1.84 4.262-4.109v-16.401c0-2.27-1.909-4.109-4.262-4.109v0zM28.511 19.304c0 1.512-1.272 2.738-2.841 2.738h-8.425l-0.076-0.070-0.076 0.070h-11.311c-1.569 0-2.841-1.226-2.841-2.738v-13.696c0-1.513 1.272-2.739 2.841-2.739h19.889c1.569 0 2.841-0.142 2.841 1.37v15.064z"></path></svg>'},807:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.128 0.38h-22.553c-2.336 0-4.229 1.825-4.229 4.076v16.273c0 2.251 1.893 4.076 4.229 4.076h4.229v-2.685h8.403l-8.784 8.072 1.566 1.44 7.429-6.827h9.71c2.335 0 4.229-1.825 4.229-4.076v-16.273c0-2.252-1.894-4.076-4.229-4.076zM28.538 19.403c0 1.5-1.262 2.717-2.819 2.717h-8.36l-0.076-0.070-0.076 0.070h-11.223c-1.557 0-2.819-1.217-2.819-2.717v-13.589c0-1.501 1.262-2.718 2.819-2.718h19.734c1.557 0 2.819-0.141 2.819 1.359v14.947zM9.206 10.557c-1.222 0-2.215 0.911-2.215 2.036s0.992 2.035 2.215 2.035c1.224 0 2.216-0.911 2.216-2.035s-0.992-2.036-2.216-2.036zM22.496 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.224 0 2.215-0.911 2.215-2.035s-0.991-2.036-2.215-2.036zM15.852 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.222 0 2.215-0.911 2.215-2.035s-0.992-2.036-2.215-2.036z"></path></svg>'},300:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M24.965 24.38h-18.132c-1.366 0-2.478-1.113-2.478-2.478v-11.806c0-1.364 1.111-2.478 2.478-2.478h18.132c1.366 0 2.478 1.113 2.478 2.478v11.806c0 1.364-1.11 2.478-2.478 2.478zM6.833 10.097v11.806h18.134l-0.002-11.806h-18.132zM2.478 28.928h5.952c0.684 0 1.238-0.554 1.238-1.239 0-0.684-0.554-1.238-1.238-1.238h-5.952v-5.802c0-0.684-0.554-1.239-1.238-1.239s-1.239 0.556-1.239 1.239v5.802c0 1.365 1.111 2.478 2.478 2.478zM30.761 19.412c-0.684 0-1.238 0.554-1.238 1.238v5.801h-5.951c-0.686 0-1.239 0.554-1.239 1.238 0 0.686 0.554 1.239 1.239 1.239h5.951c1.366 0 2.478-1.111 2.478-2.478v-5.801c0-0.683-0.554-1.238-1.239-1.238zM0 5.55v5.802c0 0.683 0.554 1.238 1.238 1.238s1.238-0.555 1.238-1.238v-5.802h5.952c0.684 0 1.238-0.554 1.238-1.238s-0.554-1.238-1.238-1.238h-5.951c-1.366-0.001-2.478 1.111-2.478 2.476zM32 11.35v-5.801c0-1.365-1.11-2.478-2.478-2.478h-5.951c-0.686 0-1.239 0.554-1.239 1.238s0.554 1.238 1.239 1.238h5.951v5.801c0 0.683 0.554 1.237 1.238 1.237 0.686 0.002 1.239-0.553 1.239-1.236z"></path></svg>'},574:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M6.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v4h4c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333zM30.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h4v-4c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM30.667 12c-0.8 0-1.333-0.533-1.333-1.333v-4h-4c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM1.333 12c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333h-4v4c0 0.8-0.533 1.333-1.333 1.333z"></path></svg>'},182:s=>{s.exports='<svg version="1.1" viewBox="0 0 22 22"><svg x="7" y="1"><circle class="diplayer-loading-dot diplayer-loading-dot-0" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-1" cx="4" cy="4" r="2"></circle></svg><svg x="13" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-2" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-3" cx="4" cy="4" r="2"></circle></svg><svg x="7" y="13"><circle class="diplayer-loading-dot diplayer-loading-dot-4" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-5" cx="4" cy="4" r="2"></circle></svg><svg x="1" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-6" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-7" cx="4" cy="4" r="2"></circle></svg></svg>'},965:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M19.357 2.88c1.749 0 3.366 0.316 4.851 0.946 1.485 0.632 2.768 1.474 3.845 2.533s1.922 2.279 2.532 3.661c0.611 1.383 0.915 2.829 0.915 4.334 0 1.425-0.304 2.847-0.915 4.271-0.611 1.425-1.587 2.767-2.928 4.028-0.855 0.813-1.811 1.607-2.869 2.38s-2.136 1.465-3.233 2.075c-1.099 0.61-2.198 1.098-3.296 1.465-1.098 0.366-2.115 0.549-3.051 0.549-1.343 0-2.441-0.438-3.296-1.311-0.854-0.876-1.281-2.41-1.281-4.608 0-0.366 0.020-0.773 0.060-1.221s0.062-0.895 0.062-1.343c0-0.773-0.183-1.353-0.55-1.738-0.366-0.387-0.793-0.58-1.281-0.58-0.652 0-1.21 0.295-1.678 0.886s-0.926 1.23-1.373 1.921c-0.447 0.693-0.905 1.334-1.372 1.923s-1.028 0.886-1.679 0.886c-0.529 0-1.048-0.427-1.556-1.282s-0.763-2.259-0.763-4.212c0-2.197 0.529-4.241 1.587-6.133s2.462-3.529 4.21-4.912c1.75-1.383 3.762-2.471 6.041-3.264 2.277-0.796 4.617-1.212 7.018-1.253zM7.334 15.817c0.569 0 1.047-0.204 1.434-0.611s0.579-0.875 0.579-1.404c0-0.569-0.193-1.047-0.579-1.434s-0.864-0.579-1.434-0.579c-0.529 0-0.987 0.193-1.373 0.579s-0.58 0.864-0.58 1.434c0 0.53 0.194 0.998 0.58 1.404 0.388 0.407 0.845 0.611 1.373 0.611zM12.216 11.79c0.691 0 1.292-0.254 1.8-0.763s0.762-1.107 0.762-1.8c0-0.732-0.255-1.343-0.762-1.831-0.509-0.489-1.109-0.732-1.8-0.732-0.732 0-1.342 0.244-1.831 0.732-0.488 0.488-0.732 1.098-0.732 1.831 0 0.693 0.244 1.292 0.732 1.8s1.099 0.763 1.831 0.763zM16.366 25.947c0.692 0 1.282-0.214 1.77-0.64s0.732-0.987 0.732-1.678-0.244-1.261-0.732-1.709c-0.489-0.448-1.078-0.671-1.77-0.671-0.65 0-1.21 0.223-1.678 0.671s-0.702 1.018-0.702 1.709c0 0.692 0.234 1.25 0.702 1.678s1.027 0.64 1.678 0.64zM19.113 9.592c0.651 0 1.129-0.203 1.433-0.611 0.305-0.406 0.459-0.874 0.459-1.404 0-0.488-0.154-0.947-0.459-1.373-0.304-0.427-0.782-0.641-1.433-0.641-0.529 0-1.008 0.193-1.434 0.58s-0.64 0.865-0.64 1.434c0 0.571 0.213 1.049 0.64 1.434 0.427 0.389 0.905 0.581 1.434 0.581zM24.848 12.826c0.57 0 1.067-0.213 1.495-0.64 0.427-0.427 0.64-0.947 0.64-1.556 0-0.57-0.214-1.068-0.64-1.495-0.428-0.427-0.927-0.64-1.495-0.64-0.611 0-1.129 0.213-1.555 0.64-0.428 0.427-0.642 0.926-0.642 1.495 0 0.611 0.213 1.129 0.642 1.556s0.947 0.64 1.555 0.64z"></path></svg>'},74:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 17 32"><path d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path></svg>'},730:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 32"><path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path></svg>'},428:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path></svg>'},254:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M13.725 30l3.9-5.325-3.9-1.125v6.45zM0 17.5l11.050 3.35 13.6-11.55-10.55 12.425 11.8 3.65 6.1-23.375-32 15.5z"></path></svg>'},934:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 28"><path d="M28.633 17.104c0.035 0.21 0.026 0.463-0.026 0.76s-0.14 0.598-0.262 0.904c-0.122 0.306-0.271 0.581-0.445 0.825s-0.367 0.419-0.576 0.524c-0.209 0.105-0.393 0.157-0.55 0.157s-0.332-0.035-0.524-0.105c-0.175-0.052-0.393-0.1-0.655-0.144s-0.528-0.052-0.799-0.026c-0.271 0.026-0.541 0.083-0.812 0.17s-0.502 0.236-0.694 0.445c-0.419 0.437-0.664 0.934-0.734 1.493s0.009 1.092 0.236 1.598c0.175 0.349 0.148 0.699-0.079 1.048-0.105 0.14-0.271 0.284-0.498 0.432s-0.476 0.284-0.747 0.406-0.555 0.218-0.851 0.288c-0.297 0.070-0.559 0.105-0.786 0.105-0.157 0-0.306-0.061-0.445-0.183s-0.236-0.253-0.288-0.393h-0.026c-0.192-0.541-0.52-1.009-0.982-1.402s-1-0.589-1.611-0.589c-0.594 0-1.131 0.197-1.611 0.589s-0.816 0.851-1.009 1.375c-0.087 0.21-0.218 0.362-0.393 0.458s-0.367 0.144-0.576 0.144c-0.244 0-0.52-0.044-0.825-0.131s-0.611-0.197-0.917-0.327c-0.306-0.131-0.581-0.284-0.825-0.458s-0.428-0.349-0.55-0.524c-0.087-0.122-0.135-0.266-0.144-0.432s0.057-0.397 0.197-0.694c0.192-0.402 0.266-0.86 0.223-1.375s-0.266-0.991-0.668-1.428c-0.244-0.262-0.541-0.432-0.891-0.511s-0.681-0.109-0.995-0.092c-0.367 0.017-0.742 0.087-1.127 0.21-0.244 0.070-0.489 0.052-0.734-0.052-0.192-0.070-0.371-0.231-0.537-0.485s-0.314-0.533-0.445-0.838c-0.131-0.306-0.231-0.62-0.301-0.943s-0.087-0.59-0.052-0.799c0.052-0.384 0.227-0.629 0.524-0.734 0.524-0.21 0.995-0.555 1.415-1.035s0.629-1.017 0.629-1.611c0-0.611-0.21-1.144-0.629-1.598s-0.891-0.786-1.415-0.996c-0.157-0.052-0.288-0.179-0.393-0.38s-0.157-0.406-0.157-0.616c0-0.227 0.035-0.48 0.105-0.76s0.162-0.55 0.275-0.812 0.244-0.502 0.393-0.72c0.148-0.218 0.31-0.38 0.485-0.485 0.14-0.087 0.275-0.122 0.406-0.105s0.275 0.052 0.432 0.105c0.524 0.21 1.070 0.275 1.637 0.197s1.070-0.327 1.506-0.747c0.21-0.209 0.362-0.467 0.458-0.773s0.157-0.607 0.183-0.904c0.026-0.297 0.026-0.568 0-0.812s-0.048-0.419-0.065-0.524c-0.035-0.105-0.066-0.227-0.092-0.367s-0.013-0.262 0.039-0.367c0.105-0.244 0.293-0.458 0.563-0.642s0.563-0.336 0.878-0.458c0.314-0.122 0.62-0.214 0.917-0.275s0.533-0.092 0.707-0.092c0.227 0 0.406 0.074 0.537 0.223s0.223 0.301 0.275 0.458c0.192 0.471 0.507 0.886 0.943 1.244s0.952 0.537 1.546 0.537c0.611 0 1.153-0.17 1.624-0.511s0.803-0.773 0.996-1.297c0.070-0.14 0.179-0.284 0.327-0.432s0.301-0.223 0.458-0.223c0.244 0 0.511 0.035 0.799 0.105s0.572 0.166 0.851 0.288c0.279 0.122 0.537 0.279 0.773 0.472s0.423 0.402 0.563 0.629c0.087 0.14 0.113 0.293 0.079 0.458s-0.070 0.284-0.105 0.354c-0.227 0.506-0.297 1.039-0.21 1.598s0.341 1.048 0.76 1.467c0.419 0.419 0.934 0.651 1.546 0.694s1.179-0.057 1.703-0.301c0.14-0.087 0.31-0.122 0.511-0.105s0.371 0.096 0.511 0.236c0.262 0.244 0.493 0.616 0.694 1.113s0.336 1 0.406 1.506c0.035 0.297-0.013 0.528-0.144 0.694s-0.266 0.275-0.406 0.327c-0.542 0.192-1.004 0.528-1.388 1.009s-0.576 1.026-0.576 1.637c0 0.594 0.162 1.113 0.485 1.559s0.747 0.764 1.27 0.956c0.122 0.070 0.227 0.14 0.314 0.21 0.192 0.157 0.323 0.358 0.393 0.602v0zM16.451 19.462c0.786 0 1.528-0.149 2.227-0.445s1.305-0.707 1.821-1.231c0.515-0.524 0.921-1.131 1.218-1.821s0.445-1.428 0.445-2.214c0-0.786-0.148-1.524-0.445-2.214s-0.703-1.292-1.218-1.808c-0.515-0.515-1.122-0.921-1.821-1.218s-1.441-0.445-2.227-0.445c-0.786 0-1.524 0.148-2.214 0.445s-1.292 0.703-1.808 1.218c-0.515 0.515-0.921 1.118-1.218 1.808s-0.445 1.428-0.445 2.214c0 0.786 0.149 1.524 0.445 2.214s0.703 1.297 1.218 1.821c0.515 0.524 1.118 0.934 1.808 1.231s1.428 0.445 2.214 0.445v0z"></path></svg>'},410:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path></svg>'},644:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"></path></svg>'},324:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"></path></svg>'},437:s=>{s.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056z"></path></svg>'},897:(s,p,f)=>{var h=typeof self<"u"?self:typeof window<"u"?window:f.g!==void 0?f.g:{},b=Object.create(h),g=/["&'<>]/;function A(k){return typeof k!="string"&&(k=k==null?"":typeof k=="function"?A(k.call(k)):JSON.stringify(k)),k}b.$escape=function(k){return function(S){var C=""+S,I=g.exec(C);if(!I)return S;var O="",_=void 0,N=void 0,M=void 0;for(_=I.index,N=0;_<C.length;_++){switch(C.charCodeAt(_)){case 34:M="&#34;";break;case 38:M="&#38;";break;case 39:M="&#39;";break;case 60:M="&#60;";break;case 62:M="&#62;";break;default:continue}N!==_&&(O+=C.substring(N,_)),N=_+1,O+=M}return N!==_?O+C.substring(N,_):O}(A(k))},b.$each=function(k,S){if(Array.isArray(k))for(var C=0,I=k.length;C<I;C++)S(k[C],C);else for(var O in k)S(k[O],O)},s.exports=b},471:(s,p,f)=>{s.exports=f(897)},352:s=>{s.exports=function(p){var f=[];return f.toString=function(){return this.map(function(h){var b="",g=h[5]!==void 0;return h[4]&&(b+="@supports (".concat(h[4],") {")),h[2]&&(b+="@media ".concat(h[2]," {")),g&&(b+="@layer".concat(h[5].length>0?" ".concat(h[5]):""," {")),b+=p(h),g&&(b+="}"),h[2]&&(b+="}"),h[4]&&(b+="}"),b}).join("")},f.i=function(h,b,g,A,k){typeof h=="string"&&(h=[[null,h,void 0]]);var S={};if(g)for(var C=0;C<this.length;C++){var I=this[C][0];I!=null&&(S[I]=!0)}for(var O=0;O<h.length;O++){var _=[].concat(h[O]);g&&S[_[0]]||(k!==void 0&&(_[5]===void 0||(_[1]="@layer".concat(_[5].length>0?" ".concat(_[5]):""," {").concat(_[1],"}")),_[5]=k),b&&(_[2]&&(_[1]="@media ".concat(_[2]," {").concat(_[1],"}")),_[2]=b),A&&(_[4]?(_[1]="@supports (".concat(_[4],") {").concat(_[1],"}"),_[4]=A):_[4]="".concat(A)),f.push(_))}},f}},80:s=>{s.exports=function(p,f){return f||(f={}),p&&(p=String(p.__esModule?p.default:p),/^['"].*['"]$/.test(p)&&(p=p.slice(1,-1)),f.hash&&(p+=f.hash),/["'() \t\n]|(%20)/.test(p)||f.needQuotes?'"'.concat(p.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):p)}},415:s=>{s.exports=function(p){var f=p[1],h=p[3];if(!h)return f;if(typeof btoa=="function"){var b=btoa(unescape(encodeURIComponent(JSON.stringify(h)))),g="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(b),A="/*# ".concat(g," */");return[f].concat([A]).join(`
`)}return[f].join(`
`)}},937:s=>{function p(f){return p=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(h){return typeof h}:function(h){return h&&typeof Symbol=="function"&&h.constructor===Symbol&&h!==Symbol.prototype?"symbol":typeof h},p(f)}s.exports=(typeof self>"u"?"undefined":p(self))=="object"?self.FormData:window.FormData},831:s=>{s.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg=="}},r={};function o(s){var p=r[s];if(p!==void 0)return p.exports;var f=r[s]={id:s,exports:{}};return n[s](f,f.exports,o),f.exports}o.m=n,o.n=s=>{var p=s&&s.__esModule?()=>s.default:()=>s;return o.d(p,{a:p}),p},o.d=(s,p)=>{for(var f in p)o.o(p,f)&&!o.o(s,f)&&Object.defineProperty(s,f,{enumerable:!0,get:p[f]})},o.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}(),o.o=(s,p)=>Object.prototype.hasOwnProperty.call(s,p),o.b=document.baseURI||self.location.href,o.nc=void 0;var a={};return(()=>{o.d(a,{default:()=>af});var s=o(856),p=o.n(s),f=o(470),h=o.n(f),b=o(370),g=o.n(b),A=o(458),k=o.n(A),S=o(278),C=o.n(S),I=o(488),O=o.n(I),_=o(685),N={};N.styleTagTransform=O(),N.setAttributes=k(),N.insert=g().bind(null,"head"),N.domAPI=h(),N.insertStyleElement=C(),p()(_.Z,N),_.Z&&_.Z.locals&&_.Z.locals;function M(l){return M=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},M(l)}function ye(l,c){this.name="AggregateError",this.errors=l,this.message=c||""}ye.prototype=Error.prototype;function me(l){return me=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},me(l)}var Ue=setTimeout;function Ke(l){return!!(l&&l.length!==void 0)}function nt(){}function ce(l){if(!(this instanceof ce))throw new TypeError("Promises must be constructed via new");if(typeof l!="function")throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],Me(l,this)}function At(l,c){for(;l._state===3;)l=l._value;l._state!==0?(l._handled=!0,ce._immediateFn(function(){var y=l._state===1?c.onFulfilled:c.onRejected;if(y!==null){var i;try{i=y(l._value)}catch(d){return void Ze(c.promise,d)}mt(c.promise,i)}else(l._state===1?mt:Ze)(c.promise,l._value)})):l._deferreds.push(c)}function mt(l,c){try{if(c===l)throw new TypeError("A promise cannot be resolved with itself.");if(c&&(me(c)==="object"||typeof c=="function")){var y=c.then;if(c instanceof ce)return l._state=3,l._value=c,void Mt(l);if(typeof y=="function")return void Me((i=y,d=c,function(){i.apply(d,arguments)}),l)}l._state=1,l._value=c,Mt(l)}catch(u){Ze(l,u)}var i,d}function Ze(l,c){l._state=2,l._value=c,Mt(l)}function Mt(l){l._state===2&&l._deferreds.length===0&&ce._immediateFn(function(){l._handled||ce._unhandledRejectionFn(l._value)});for(var c=0,y=l._deferreds.length;c<y;c++)At(l,l._deferreds[c]);l._deferreds=null}function Zt(l,c,y){this.onFulfilled=typeof l=="function"?l:null,this.onRejected=typeof c=="function"?c:null,this.promise=y}function Me(l,c){var y=!1;try{l(function(i){y||(y=!0,mt(c,i))},function(i){y||(y=!0,Ze(c,i))})}catch(i){if(y)return;y=!0,Ze(c,i)}}ce.prototype.catch=function(l){return this.then(null,l)},ce.prototype.then=function(l,c){var y=new this.constructor(nt);return At(this,new Zt(l,c,y)),y},ce.prototype.finally=function(l){var c=this.constructor;return this.then(function(y){return c.resolve(l()).then(function(){return y})},function(y){return c.resolve(l()).then(function(){return c.reject(y)})})},ce.all=function(l){return new ce(function(c,y){if(!Ke(l))return y(new TypeError("Promise.all accepts an array"));var i=Array.prototype.slice.call(l);if(i.length===0)return c([]);var d=i.length;function u(v,E){try{if(E&&(me(E)==="object"||typeof E=="function")){var T=E.then;if(typeof T=="function")return void T.call(E,function(L){u(v,L)},y)}i[v]=E,--d==0&&c(i)}catch(L){y(L)}}for(var m=0;m<i.length;m++)u(m,i[m])})},ce.any=function(l){var c=this;return new c(function(y,i){if(!l||l.length===void 0)return i(new TypeError("Promise.any accepts an array"));var d=Array.prototype.slice.call(l);if(d.length===0)return i();for(var u=[],m=0;m<d.length;m++)try{c.resolve(d[m]).then(y).catch(function(v){u.push(v),u.length===d.length&&i(new ye(u,"All promises were rejected"))})}catch(v){i(v)}})},ce.allSettled=function(l){return new this(function(c,y){if(!l||l.length===void 0)return y(new TypeError(M(l)+" "+l+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var i=Array.prototype.slice.call(l);if(i.length===0)return c([]);var d=i.length;function u(v,E){if(E&&(M(E)==="object"||typeof E=="function")){var T=E.then;if(typeof T=="function")return void T.call(E,function(L){u(v,L)},function(L){i[v]={status:"rejected",reason:L},--d==0&&c(i)})}i[v]={status:"fulfilled",value:E},--d==0&&c(i)}for(var m=0;m<i.length;m++)u(m,i[m])})},ce.resolve=function(l){return l&&me(l)==="object"&&l.constructor===ce?l:new ce(function(c){c(l)})},ce.reject=function(l){return new ce(function(c,y){y(l)})},ce.race=function(l){return new ce(function(c,y){if(!Ke(l))return y(new TypeError("Promise.race accepts an array"));for(var i=0,d=l.length;i<d;i++)ce.resolve(l[i]).then(c,y)})},ce._immediateFn=typeof setImmediate=="function"&&function(l){setImmediate(l)}||function(l){Ue(l,0)},ce._unhandledRejectionFn=function(l){typeof console<"u"&&console&&console.warn("Possible Unhandled Promise Rejection:",l)};const ke=ce;var Ae=/mobile/i.test(window.navigator.userAgent);const te={secondToTime:function(l){if((l=l||0)===0||l===1/0||l.toString()==="NaN")return"00:00";var c=Math.floor(l/3600),y=Math.floor((l-3600*c)/60),i=Math.floor(l-3600*c-60*y);return(c>0?[c,y,i]:[y,i]).map(function(d){return d<10?"0"+d:""+d}).join(":")},getElementViewLeft:function(l){var c=l.offsetLeft,y=l.offsetParent,i=document.body.scrollLeft+document.documentElement.scrollLeft;if(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement)for(;y!==null&&y!==l;)c+=y.offsetLeft,y=y.offsetParent;else for(;y!==null;)c+=y.offsetLeft,y=y.offsetParent;return c-i},getBoundingClientRectViewLeft:function(l){var c=window.scrollY||window.pageYOffset||document.body.scrollTop+(document.documentElement&&document.documentElement.scrollTop||0);if(l.getBoundingClientRect){if(typeof this.getBoundingClientRectViewLeft.offset!="number"){var y=document.createElement("div");y.style.cssText="position:absolute;top:0;left:0;",document.body.appendChild(y),this.getBoundingClientRectViewLeft.offset=-y.getBoundingClientRect().top-c,document.body.removeChild(y),y=null}var i=l.getBoundingClientRect(),d=this.getBoundingClientRectViewLeft.offset;return i.left+d}return this.getElementViewLeft(l)},getScrollPosition:function(){return{left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0}},setScrollPosition:function(l){var c=l.left,y=c===void 0?0:c,i=l.top,d=i===void 0?0:i;this.isFirefox?(document.documentElement.scrollLeft=y,document.documentElement.scrollTop=d):window.scrollTo(y,d)},isMobile:Ae,isFirefox:/firefox/i.test(window.navigator.userAgent),isChrome:/chrome/i.test(window.navigator.userAgent),isSafari:/safari/i.test(window.navigator.userAgent),storage:{set:function(l,c){localStorage.setItem(l,c)},get:function(l){return localStorage.getItem(l)}},nameMap:{dragStart:Ae?"touchstart":"mousedown",dragMove:Ae?"touchmove":"mousemove",dragEnd:Ae?"touchend":"mouseup"},color2Number:function(l){return l[0]==="#"&&(l=l.substr(1)),l.length===3&&(l="".concat(l[0]).concat(l[0]).concat(l[1]).concat(l[1]).concat(l[2]).concat(l[2])),parseInt(l,16)+0&16777215},number2Color:function(l){return"#"+("00000"+l.toString(16)).slice(-6)},number2Type:function(l){switch(l){case 0:default:return"right";case 1:return"top";case 2:return"bottom"}}};function bt(l,c){return function(){return l.apply(c,arguments)}}function Je(l){return Je=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},Je(l)}var Ve,Ft=Object.prototype.toString,_t=Object.getPrototypeOf,Jt=(Ve=Object.create(null),function(l){var c=Ft.call(l);return Ve[c]||(Ve[c]=c.slice(8,-1).toLowerCase())}),_e=function(l){return l=l.toLowerCase(),function(c){return Jt(c)===l}},z=function(l){return function(c){return Je(c)===l}},Q=Array.isArray,W=z("undefined"),ne=_e("ArrayBuffer"),ve=z("string"),w=z("function"),x=z("number"),B=function(l){return l!==null&&Je(l)==="object"},R=function(l){if(Jt(l)!=="object")return!1;var c=_t(l);return!(c!==null&&c!==Object.prototype&&Object.getPrototypeOf(c)!==null||Symbol.toStringTag in l||Symbol.iterator in l)},D=_e("Date"),q=_e("File"),X=_e("Blob"),U=_e("FileList"),$=_e("URLSearchParams");function F(l,c){var y,i,d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},u=d.allOwnKeys,m=u!==void 0&&u;if(l!=null)if(Je(l)!=="object"&&(l=[l]),Q(l))for(y=0,i=l.length;y<i;y++)c.call(null,l[y],y,l);else{var v,E=m?Object.getOwnPropertyNames(l):Object.keys(l),T=E.length;for(y=0;y<T;y++)v=E[y],c.call(null,l[v],v,l)}}function re(l,c){c=c.toLowerCase();for(var y,i=Object.keys(l),d=i.length;d-- >0;)if(c===(y=i[d]).toLowerCase())return y;return null}var J,oe,ie=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:k1,ue=function(l){return!W(l)&&l!==ie},Se=(J=typeof Uint8Array<"u"&&_t(Uint8Array),function(l){return J&&l instanceof J}),xe=_e("HTMLFormElement"),ze=(oe=Object.prototype.hasOwnProperty,function(l,c){return oe.call(l,c)}),st=_e("RegExp"),qt=function(l,c){var y=Object.getOwnPropertyDescriptors(l),i={};F(y,function(d,u){c(d,u,l)!==!1&&(i[u]=d)}),Object.defineProperties(l,i)};const P={isArray:Q,isArrayBuffer:ne,isBuffer:function(l){return l!==null&&!W(l)&&l.constructor!==null&&!W(l.constructor)&&w(l.constructor.isBuffer)&&l.constructor.isBuffer(l)},isFormData:function(l){var c="[object FormData]";return l&&(typeof FormData=="function"&&l instanceof FormData||Ft.call(l)===c||w(l.toString)&&l.toString()===c)},isArrayBufferView:function(l){return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?ArrayBuffer.isView(l):l&&l.buffer&&ne(l.buffer)},isString:ve,isNumber:x,isBoolean:function(l){return l===!0||l===!1},isObject:B,isPlainObject:R,isUndefined:W,isDate:D,isFile:q,isBlob:X,isRegExp:st,isFunction:w,isStream:function(l){return B(l)&&w(l.pipe)},isURLSearchParams:$,isTypedArray:Se,isFileList:U,forEach:F,merge:function l(){for(var c=ue(this)&&this||{},y=c.caseless,i={},d=function(v,E){var T=y&&re(i,E)||E;R(i[T])&&R(v)?i[T]=l(i[T],v):R(v)?i[T]=l({},v):Q(v)?i[T]=v.slice():i[T]=v},u=0,m=arguments.length;u<m;u++)arguments[u]&&F(arguments[u],d);return i},extend:function(l,c,y){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},d=i.allOwnKeys;return F(c,function(u,m){y&&w(u)?l[m]=bt(u,y):l[m]=u},{allOwnKeys:d}),l},trim:function(l){return l.trim?l.trim():l.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},stripBOM:function(l){return l.charCodeAt(0)===65279&&(l=l.slice(1)),l},inherits:function(l,c,y,i){l.prototype=Object.create(c.prototype,i),l.prototype.constructor=l,Object.defineProperty(l,"super",{value:c.prototype}),y&&Object.assign(l.prototype,y)},toFlatObject:function(l,c,y,i){var d,u,m,v={};if(c=c||{},l==null)return c;do{for(u=(d=Object.getOwnPropertyNames(l)).length;u-- >0;)m=d[u],i&&!i(m,l,c)||v[m]||(c[m]=l[m],v[m]=!0);l=y!==!1&&_t(l)}while(l&&(!y||y(l,c))&&l!==Object.prototype);return c},kindOf:Jt,kindOfTest:_e,endsWith:function(l,c,y){l=String(l),(y===void 0||y>l.length)&&(y=l.length),y-=c.length;var i=l.indexOf(c,y);return i!==-1&&i===y},toArray:function(l){if(!l)return null;if(Q(l))return l;var c=l.length;if(!x(c))return null;for(var y=new Array(c);c-- >0;)y[c]=l[c];return y},forEachEntry:function(l,c){for(var y,i=(l&&l[Symbol.iterator]).call(l);(y=i.next())&&!y.done;){var d=y.value;c.call(l,d[0],d[1])}},matchAll:function(l,c){for(var y,i=[];(y=l.exec(c))!==null;)i.push(y);return i},isHTMLForm:xe,hasOwnProperty:ze,hasOwnProp:ze,reduceDescriptors:qt,freezeMethods:function(l){qt(l,function(c,y){if(w(l)&&["arguments","caller","callee"].indexOf(y)!==-1)return!1;var i=l[y];w(i)&&(c.enumerable=!1,"writable"in c?c.writable=!1:c.set||(c.set=function(){throw Error("Can not rewrite read-only method '"+y+"'")}))})},toObjectSet:function(l,c){var y={},i=function(d){d.forEach(function(u){y[u]=!0})};return Q(l)?i(l):i(String(l).split(c)),y},toCamelCase:function(l){return l.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,function(c,y,i){return y.toUpperCase()+i})},noop:function(){},toFiniteNumber:function(l,c){return l=+l,Number.isFinite(l)?l:c},findKey:re,global:ie,isContextDefined:ue,toJSONObject:function(l){var c=new Array(10);return function y(i,d){if(B(i)){if(c.indexOf(i)>=0)return;if(!("toJSON"in i)){c[d]=i;var u=Q(i)?[]:{};return F(i,function(m,v){var E=y(m,d+1);!W(E)&&(u[v]=E)}),c[d]=void 0,u}}return i}(l,0)}};function dt(l,c,y,i,d){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=l,this.name="AxiosError",c&&(this.code=c),y&&(this.config=y),i&&(this.request=i),d&&(this.response=d)}P.inherits(dt,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:P.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var er=dt.prototype,Ge={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(function(l){Ge[l]={value:l}}),Object.defineProperties(dt,Ge),Object.defineProperty(er,"isAxiosError",{value:!0}),dt.from=function(l,c,y,i,d,u){var m=Object.create(er);return P.toFlatObject(l,m,function(v){return v!==Error.prototype},function(v){return v!=="isAxiosError"}),dt.call(m,l.message,c,y,i,d),m.cause=l,m.name=l.name,u&&Object.assign(m,u),m};const fe=dt,Jr=o(937);function si(l){return si=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},si(l)}function ci(l){return P.isPlainObject(l)||P.isArray(l)}function $a(l){return P.endsWith(l,"[]")?l.slice(0,-2):l}function Ka(l,c,y){return l?l.concat(c).map(function(i,d){return i=$a(i),!y&&d?"["+i+"]":i}).join(y?".":""):c}var ip=P.toFlatObject(P,{},null,function(l){return/^is[A-Z]/.test(l)});const Gr=function(l,c,y){if(!P.isObject(l))throw new TypeError("target must be an object");c=c||new(Jr||FormData);var i,d=(y=P.toFlatObject(y,{metaTokens:!0,dots:!1,indexes:!1},!1,function(Z,V){return!P.isUndefined(V[Z])})).metaTokens,u=y.visitor||L,m=y.dots,v=y.indexes,E=(y.Blob||typeof Blob<"u"&&Blob)&&(i=c)&&P.isFunction(i.append)&&i[Symbol.toStringTag]==="FormData"&&i[Symbol.iterator];if(!P.isFunction(u))throw new TypeError("visitor must be a function");function T(Z){if(Z===null)return"";if(P.isDate(Z))return Z.toISOString();if(!E&&P.isBlob(Z))throw new fe("Blob is not supported. Use a Buffer instead.");return P.isArrayBuffer(Z)||P.isTypedArray(Z)?E&&typeof Blob=="function"?new Blob([Z]):Buffer.from(Z):Z}function L(Z,V,Y){var ee=Z;if(Z&&!Y&&si(Z)==="object"){if(P.endsWith(V,"{}"))V=d?V:V.slice(0,-2),Z=JSON.stringify(Z);else if(P.isArray(Z)&&function(ae){return P.isArray(ae)&&!ae.some(ci)}(Z)||P.isFileList(Z)||P.endsWith(V,"[]")&&(ee=P.toArray(Z)))return V=$a(V),ee.forEach(function(ae,We){!P.isUndefined(ae)&&ae!==null&&c.append(v===!0?Ka([V],We,m):v===null?V:V+"[]",T(ae))}),!1}return!!ci(Z)||(c.append(Ka(Y,V,m),T(Z)),!1)}var H=[],K=Object.assign(ip,{defaultVisitor:L,convertValue:T,isVisitable:ci});if(!P.isObject(l))throw new TypeError("data must be an object");return function Z(V,Y){if(!P.isUndefined(V)){if(H.indexOf(V)!==-1)throw Error("Circular reference detected in "+Y.join("."));H.push(V),P.forEach(V,function(ee,ae){(!(P.isUndefined(ee)||ee===null)&&u.call(c,ee,P.isString(ae)?ae.trim():ae,Y,K))===!0&&Z(ee,Y?Y.concat(ae):[ae])}),H.pop()}}(l),c};function Va(l){var c={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(l).replace(/[!'()~]|%20|%00/g,function(y){return c[y]})}function Qa(l,c){this._pairs=[],l&&Gr(l,this,c)}var Xa=Qa.prototype;Xa.append=function(l,c){this._pairs.push([l,c])},Xa.toString=function(l){var c=l?function(y){return l.call(this,y,Va)}:Va;return this._pairs.map(function(y){return c(y[0])+"="+c(y[1])},"").join("&")};const Za=Qa;function ap(l){return encodeURIComponent(l).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Ja(l,c,y){if(!c)return l;var i,d=y&&y.encode||ap,u=y&&y.serialize;if(i=u?u(c,y):P.isURLSearchParams(c)?c.toString():new Za(c,y).toString(d)){var m=l.indexOf("#");m!==-1&&(l=l.slice(0,m)),l+=(l.indexOf("?")===-1?"?":"&")+i}return l}function tr(l){return tr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},tr(l)}function lp(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(tr(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(tr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),tr(d)==="symbol"?d:String(d)),i)}var d}var sp=function(){function l(){(function(i,d){if(!(i instanceof d))throw new TypeError("Cannot call a class as a function")})(this,l),this.handlers=[]}var c,y;return c=l,y=[{key:"use",value:function(i,d,u){return this.handlers.push({fulfilled:i,rejected:d,synchronous:!!u&&u.synchronous,runWhen:u?u.runWhen:null}),this.handlers.length-1}},{key:"eject",value:function(i){this.handlers[i]&&(this.handlers[i]=null)}},{key:"clear",value:function(){this.handlers&&(this.handlers=[])}},{key:"forEach",value:function(i){P.forEach(this.handlers,function(d){d!==null&&i(d)})}}],y&&lp(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const Ga=sp,el={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},cp=typeof URLSearchParams<"u"?URLSearchParams:Za,dp=FormData;var di,pp=(typeof navigator>"u"||(di=navigator.product)!=="ReactNative"&&di!=="NativeScript"&&di!=="NS")&&typeof window<"u"&&typeof document<"u",up=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function";const Ot={isBrowser:!0,classes:{URLSearchParams:cp,FormData:dp,Blob},isStandardBrowserEnv:pp,isStandardBrowserWebWorkerEnv:up,protocols:["http","https","file","blob","url","data"]},tl=function(l){function c(i,d,u,m){var v=i[m++],E=Number.isFinite(+v),T=m>=i.length;return v=!v&&P.isArray(u)?u.length:v,T?(P.hasOwnProp(u,v)?u[v]=[u[v],d]:u[v]=d,!E):(u[v]&&P.isObject(u[v])||(u[v]=[]),c(i,d,u[v],m)&&P.isArray(u[v])&&(u[v]=function(L){var H,K,Z={},V=Object.keys(L),Y=V.length;for(H=0;H<Y;H++)Z[K=V[H]]=L[K];return Z}(u[v])),!E)}if(P.isFormData(l)&&P.isFunction(l.entries)){var y={};return P.forEachEntry(l,function(i,d){c(function(u){return P.matchAll(/\w+|\[(\w*)]/g,u).map(function(m){return m[0]==="[]"?"":m[1]||m[0]})}(i),d,y,0)}),y}return null};var fp={"Content-Type":void 0},eo={transitional:el,adapter:["xhr","http"],transformRequest:[function(l,c){var y,i=c.getContentType()||"",d=i.indexOf("application/json")>-1,u=P.isObject(l);if(u&&P.isHTMLForm(l)&&(l=new FormData(l)),P.isFormData(l))return d&&d?JSON.stringify(tl(l)):l;if(P.isArrayBuffer(l)||P.isBuffer(l)||P.isStream(l)||P.isFile(l)||P.isBlob(l))return l;if(P.isArrayBufferView(l))return l.buffer;if(P.isURLSearchParams(l))return c.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),l.toString();if(u){if(i.indexOf("application/x-www-form-urlencoded")>-1)return function(v,E){return Gr(v,new Ot.classes.URLSearchParams,Object.assign({visitor:function(T,L,H,K){return Ot.isNode&&P.isBuffer(T)?(this.append(L,T.toString("base64")),!1):K.defaultVisitor.apply(this,arguments)}},E))}(l,this.formSerializer).toString();if((y=P.isFileList(l))||i.indexOf("multipart/form-data")>-1){var m=this.env&&this.env.FormData;return Gr(y?{"files[]":l}:l,m&&new m,this.formSerializer)}}return u||d?(c.setContentType("application/json",!1),function(v,E,T){if(P.isString(v))try{return(0,JSON.parse)(v),P.trim(v)}catch(L){if(L.name!=="SyntaxError")throw L}return(0,JSON.stringify)(v)}(l)):l}],transformResponse:[function(l){var c=this.transitional||eo.transitional,y=c&&c.forcedJSONParsing,i=this.responseType==="json";if(l&&P.isString(l)&&(y&&!this.responseType||i)){var d=!(c&&c.silentJSONParsing)&&i;try{return JSON.parse(l)}catch(u){if(d)throw u.name==="SyntaxError"?fe.from(u,fe.ERR_BAD_RESPONSE,this,null,this.response):u}}return l}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Ot.classes.FormData,Blob:Ot.classes.Blob},validateStatus:function(l){return l>=200&&l<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};P.forEach(["delete","get","head"],function(l){eo.headers[l]={}}),P.forEach(["post","put","patch"],function(l){eo.headers[l]=P.merge(fp)});const pi=eo;var hp=P.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]);function nr(l){return nr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},nr(l)}function nl(l,c){(c==null||c>l.length)&&(c=l.length);for(var y=0,i=new Array(c);y<c;y++)i[y]=l[y];return i}function rl(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(nr(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(nr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),nr(d)==="symbol"?d:String(d)),i)}var d}var ol=Symbol("internals");function rr(l){return l&&String(l).trim().toLowerCase()}function to(l){return l===!1||l==null?l:P.isArray(l)?l.map(to):String(l)}function il(l,c,y,i){return P.isFunction(i)?i.call(this,c,y):P.isString(c)?P.isString(i)?c.indexOf(i)!==-1:P.isRegExp(i)?i.test(c):void 0:void 0}var no=function(l,c){function y(m){(function(v,E){if(!(v instanceof E))throw new TypeError("Cannot call a class as a function")})(this,y),m&&this.set(m)}var i,d,u;return i=y,d=[{key:"set",value:function(m,v,E){var T=this;function L(ae,We,Fe){var Be=rr(We);if(!Be)throw new Error("header name must be a non-empty string");var tn=P.findKey(T,Be);(!tn||T[tn]===void 0||Fe===!0||Fe===void 0&&T[tn]!==!1)&&(T[tn||We]=to(ae))}var H,K,Z,V,Y,ee=function(ae,We){return P.forEach(ae,function(Fe,Be){return L(Fe,Be,We)})};return P.isPlainObject(m)||m instanceof this.constructor?ee(m,v):P.isString(m)&&(m=m.trim())&&!/^[-_a-zA-Z]+$/.test(m.trim())?ee((Y={},(H=m)&&H.split(`
`).forEach(function(ae){V=ae.indexOf(":"),K=ae.substring(0,V).trim().toLowerCase(),Z=ae.substring(V+1).trim(),!K||Y[K]&&hp[K]||(K==="set-cookie"?Y[K]?Y[K].push(Z):Y[K]=[Z]:Y[K]=Y[K]?Y[K]+", "+Z:Z)}),Y),v):m!=null&&L(v,m,E),this}},{key:"get",value:function(m,v){if(m=rr(m)){var E=P.findKey(this,m);if(E){var T=this[E];if(!v)return T;if(v===!0)return function(L){for(var H,K=Object.create(null),Z=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;H=Z.exec(L);)K[H[1]]=H[2];return K}(T);if(P.isFunction(v))return v.call(this,T,E);if(P.isRegExp(v))return v.exec(T);throw new TypeError("parser must be boolean|regexp|function")}}}},{key:"has",value:function(m,v){if(m=rr(m)){var E=P.findKey(this,m);return!(!E||v&&!il(0,this[E],E,v))}return!1}},{key:"delete",value:function(m,v){var E=this,T=!1;function L(H){if(H=rr(H)){var K=P.findKey(E,H);!K||v&&!il(0,E[K],K,v)||(delete E[K],T=!0)}}return P.isArray(m)?m.forEach(L):L(m),T}},{key:"clear",value:function(){return Object.keys(this).forEach(this.delete.bind(this))}},{key:"normalize",value:function(m){var v=this,E={};return P.forEach(this,function(T,L){var H=P.findKey(E,L);if(H)return v[H]=to(T),void delete v[L];var K=m?function(Z){return Z.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,function(V,Y,ee){return Y.toUpperCase()+ee})}(L):String(L).trim();K!==L&&delete v[L],v[K]=to(T),E[K]=!0}),this}},{key:"concat",value:function(){for(var m,v=arguments.length,E=new Array(v),T=0;T<v;T++)E[T]=arguments[T];return(m=this.constructor).concat.apply(m,[this].concat(E))}},{key:"toJSON",value:function(m){var v=Object.create(null);return P.forEach(this,function(E,T){E!=null&&E!==!1&&(v[T]=m&&P.isArray(E)?E.join(", "):E)}),v}},{key:Symbol.iterator,value:function(){return Object.entries(this.toJSON())[Symbol.iterator]()}},{key:"toString",value:function(){return Object.entries(this.toJSON()).map(function(m){var v,E,T=(E=2,function(L){if(Array.isArray(L))return L}(v=m)||function(L,H){var K=L==null?null:typeof Symbol<"u"&&L[Symbol.iterator]||L["@@iterator"];if(K!=null){var Z,V,Y,ee,ae=[],We=!0,Fe=!1;try{if(Y=(K=K.call(L)).next,H===0){if(Object(K)!==K)return;We=!1}else for(;!(We=(Z=Y.call(K)).done)&&(ae.push(Z.value),ae.length!==H);We=!0);}catch(Be){Fe=!0,V=Be}finally{try{if(!We&&K.return!=null&&(ee=K.return(),Object(ee)!==ee))return}finally{if(Fe)throw V}}return ae}}(v,E)||function(L,H){if(L){if(typeof L=="string")return nl(L,H);var K=Object.prototype.toString.call(L).slice(8,-1);return K==="Object"&&L.constructor&&(K=L.constructor.name),K==="Map"||K==="Set"?Array.from(L):K==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)?nl(L,H):void 0}}(v,E)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}());return T[0]+": "+T[1]}).join(`
`)}},{key:Symbol.toStringTag,get:function(){return"AxiosHeaders"}}],u=[{key:"from",value:function(m){return m instanceof this?m:new this(m)}},{key:"concat",value:function(m){for(var v=new this(m),E=arguments.length,T=new Array(E>1?E-1:0),L=1;L<E;L++)T[L-1]=arguments[L];return T.forEach(function(H){return v.set(H)}),v}},{key:"accessor",value:function(m){var v=(this[ol]=this[ol]={accessors:{}}).accessors,E=this.prototype;function T(L){var H=rr(L);v[H]||(function(K,Z){var V=P.toCamelCase(" "+Z);["get","set","has"].forEach(function(Y){Object.defineProperty(K,Y+V,{value:function(ee,ae,We){return this[Y].call(this,Z,ee,ae,We)},configurable:!0})})}(E,L),v[H]=!0)}return P.isArray(m)?m.forEach(T):T(m),this}}],d&&rl(i.prototype,d),u&&rl(i,u),Object.defineProperty(i,"prototype",{writable:!1}),y}();no.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent"]),P.freezeMethods(no.prototype),P.freezeMethods(no);const Ut=no;function ui(l,c){var y=this||pi,i=c||y,d=Ut.from(i.headers),u=i.data;return P.forEach(l,function(m){u=m.call(y,u,d.normalize(),c?c.status:void 0)}),d.normalize(),u}function al(l){return!(!l||!l.__CANCEL__)}function ll(l,c,y){fe.call(this,l??"canceled",fe.ERR_CANCELED,c,y),this.name="CanceledError"}P.inherits(ll,fe,{__CANCEL__:!0});const ro=ll,yp=Ot.isStandardBrowserEnv?{write:function(l,c,y,i,d,u){var m=[];m.push(l+"="+encodeURIComponent(c)),P.isNumber(y)&&m.push("expires="+new Date(y).toGMTString()),P.isString(i)&&m.push("path="+i),P.isString(d)&&m.push("domain="+d),u===!0&&m.push("secure"),document.cookie=m.join("; ")},read:function(l){var c=document.cookie.match(new RegExp("(^|;\\s*)("+l+")=([^;]*)"));return c?decodeURIComponent(c[3]):null},remove:function(l){this.write(l,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};function sl(l,c){return l&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(c)?function(y,i){return i?y.replace(/\/+$/,"")+"/"+i.replace(/^\/+/,""):y}(l,c):c}const Ap=Ot.isStandardBrowserEnv?function(){var l,c=/(msie|trident)/i.test(navigator.userAgent),y=document.createElement("a");function i(d){var u=d;return c&&(y.setAttribute("href",u),u=y.href),y.setAttribute("href",u),{href:y.href,protocol:y.protocol?y.protocol.replace(/:$/,""):"",host:y.host,search:y.search?y.search.replace(/^\?/,""):"",hash:y.hash?y.hash.replace(/^#/,""):"",hostname:y.hostname,port:y.port,pathname:y.pathname.charAt(0)==="/"?y.pathname:"/"+y.pathname}}return l=i(window.location.href),function(d){var u=P.isString(d)?i(d):d;return u.protocol===l.protocol&&u.host===l.host}}():function(){return!0};function cl(l,c){var y=0,i=function(d,u){d=d||10;var m,v=new Array(d),E=new Array(d),T=0,L=0;return u=u!==void 0?u:1e3,function(H){var K=Date.now(),Z=E[L];m||(m=K),v[T]=H,E[T]=K;for(var V=L,Y=0;V!==T;)Y+=v[V++],V%=d;if((T=(T+1)%d)===L&&(L=(L+1)%d),!(K-m<u)){var ee=Z&&K-Z;return ee?Math.round(1e3*Y/ee):void 0}}}(50,250);return function(d){var u=d.loaded,m=d.lengthComputable?d.total:void 0,v=u-y,E=i(v);y=u;var T={loaded:u,total:m,progress:m?u/m:void 0,bytes:v,rate:E||void 0,estimated:E&&m&&u<=m?(m-u)/E:void 0,event:d};T[c?"download":"upload"]=!0,l(T)}}var fi={http:null,xhr:typeof XMLHttpRequest<"u"&&function(l){return new Promise(function(c,y){var i,d=l.data,u=Ut.from(l.headers).normalize(),m=l.responseType;function v(){l.cancelToken&&l.cancelToken.unsubscribe(i),l.signal&&l.signal.removeEventListener("abort",i)}P.isFormData(d)&&(Ot.isStandardBrowserEnv||Ot.isStandardBrowserWebWorkerEnv)&&u.setContentType(!1);var E=new XMLHttpRequest;if(l.auth){var T=l.auth.username||"",L=l.auth.password?unescape(encodeURIComponent(l.auth.password)):"";u.set("Authorization","Basic "+btoa(T+":"+L))}var H=sl(l.baseURL,l.url);function K(){if(E){var ee=Ut.from("getAllResponseHeaders"in E&&E.getAllResponseHeaders());(function(ae,We,Fe){var Be=Fe.config.validateStatus;Fe.status&&Be&&!Be(Fe.status)?We(new fe("Request failed with status code "+Fe.status,[fe.ERR_BAD_REQUEST,fe.ERR_BAD_RESPONSE][Math.floor(Fe.status/100)-4],Fe.config,Fe.request,Fe)):ae(Fe)})(function(ae){c(ae),v()},function(ae){y(ae),v()},{data:m&&m!=="text"&&m!=="json"?E.response:E.responseText,status:E.status,statusText:E.statusText,headers:ee,config:l,request:E}),E=null}}if(E.open(l.method.toUpperCase(),Ja(H,l.params,l.paramsSerializer),!0),E.timeout=l.timeout,"onloadend"in E?E.onloadend=K:E.onreadystatechange=function(){E&&E.readyState===4&&(E.status!==0||E.responseURL&&E.responseURL.indexOf("file:")===0)&&setTimeout(K)},E.onabort=function(){E&&(y(new fe("Request aborted",fe.ECONNABORTED,l,E)),E=null)},E.onerror=function(){y(new fe("Network Error",fe.ERR_NETWORK,l,E)),E=null},E.ontimeout=function(){var ee=l.timeout?"timeout of "+l.timeout+"ms exceeded":"timeout exceeded",ae=l.transitional||el;l.timeoutErrorMessage&&(ee=l.timeoutErrorMessage),y(new fe(ee,ae.clarifyTimeoutError?fe.ETIMEDOUT:fe.ECONNABORTED,l,E)),E=null},Ot.isStandardBrowserEnv){var Z=(l.withCredentials||Ap(H))&&l.xsrfCookieName&&yp.read(l.xsrfCookieName);Z&&u.set(l.xsrfHeaderName,Z)}d===void 0&&u.setContentType(null),"setRequestHeader"in E&&P.forEach(u.toJSON(),function(ee,ae){E.setRequestHeader(ae,ee)}),P.isUndefined(l.withCredentials)||(E.withCredentials=!!l.withCredentials),m&&m!=="json"&&(E.responseType=l.responseType),typeof l.onDownloadProgress=="function"&&E.addEventListener("progress",cl(l.onDownloadProgress,!0)),typeof l.onUploadProgress=="function"&&E.upload&&E.upload.addEventListener("progress",cl(l.onUploadProgress)),(l.cancelToken||l.signal)&&(i=function(ee){E&&(y(!ee||ee.type?new ro(null,l,E):ee),E.abort(),E=null)},l.cancelToken&&l.cancelToken.subscribe(i),l.signal&&(l.signal.aborted?i():l.signal.addEventListener("abort",i)));var V,Y=(V=/^([-+\w]{1,25})(:?\/\/|:)/.exec(H))&&V[1]||"";Y&&Ot.protocols.indexOf(Y)===-1?y(new fe("Unsupported protocol "+Y+":",fe.ERR_BAD_REQUEST,l)):E.send(d||null)})}};P.forEach(fi,function(l,c){if(l){try{Object.defineProperty(l,"name",{value:c})}catch{}Object.defineProperty(l,"adapterName",{value:c})}});function hi(l){if(l.cancelToken&&l.cancelToken.throwIfRequested(),l.signal&&l.signal.aborted)throw new ro(null,l)}function dl(l){return hi(l),l.headers=Ut.from(l.headers),l.data=ui.call(l,l.transformRequest),["post","put","patch"].indexOf(l.method)!==-1&&l.headers.setContentType("application/x-www-form-urlencoded",!1),function(c){for(var y,i,d=(c=P.isArray(c)?c:[c]).length,u=0;u<d&&(y=c[u],!(i=P.isString(y)?fi[y.toLowerCase()]:y));u++);if(!i)throw i===!1?new fe("Adapter ".concat(y," is not supported by the environment"),"ERR_NOT_SUPPORT"):new Error(P.hasOwnProp(fi,y)?"Adapter '".concat(y,"' is not available in the build"):"Unknown adapter '".concat(y,"'"));if(!P.isFunction(i))throw new TypeError("adapter is not a function");return i}(l.adapter||pi.adapter)(l).then(function(c){return hi(l),c.data=ui.call(l,l.transformResponse,c),c.headers=Ut.from(c.headers),c},function(c){return al(c)||(hi(l),c&&c.response&&(c.response.data=ui.call(l,l.transformResponse,c.response),c.response.headers=Ut.from(c.response.headers))),Promise.reject(c)})}var pl=function(l){return l instanceof Ut?l.toJSON():l};function xn(l,c){c=c||{};var y={};function i(T,L,H){return P.isPlainObject(T)&&P.isPlainObject(L)?P.merge.call({caseless:H},T,L):P.isPlainObject(L)?P.merge({},L):P.isArray(L)?L.slice():L}function d(T,L,H){return P.isUndefined(L)?P.isUndefined(T)?void 0:i(void 0,T,H):i(T,L,H)}function u(T,L){if(!P.isUndefined(L))return i(void 0,L)}function m(T,L){return P.isUndefined(L)?P.isUndefined(T)?void 0:i(void 0,T):i(void 0,L)}function v(T,L,H){return H in c?i(T,L):H in l?i(void 0,T):void 0}var E={url:u,method:u,data:u,baseURL:m,transformRequest:m,transformResponse:m,paramsSerializer:m,timeout:m,timeoutMessage:m,withCredentials:m,adapter:m,responseType:m,xsrfCookieName:m,xsrfHeaderName:m,onUploadProgress:m,onDownloadProgress:m,decompress:m,maxContentLength:m,maxBodyLength:m,beforeRedirect:m,transport:m,httpAgent:m,httpsAgent:m,cancelToken:m,socketPath:m,responseEncoding:m,validateStatus:v,headers:function(T,L){return d(pl(T),pl(L),!0)}};return P.forEach(Object.keys(l).concat(Object.keys(c)),function(T){var L=E[T]||d,H=L(l[T],c[T],T);P.isUndefined(H)&&L!==v||(y[T]=H)}),y}function oo(l){return oo=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},oo(l)}var yi={};["object","boolean","number","function","string","symbol"].forEach(function(l,c){yi[l]=function(y){return oo(y)===l||"a"+(c<1?"n ":" ")+l}});var ul={};yi.transitional=function(l,c,y){function i(d,u){return"[Axios v1.2.3] Transitional option '"+d+"'"+u+(y?". "+y:"")}return function(d,u,m){if(l===!1)throw new fe(i(u," has been removed"+(c?" in "+c:"")),fe.ERR_DEPRECATED);return c&&!ul[u]&&(ul[u]=!0,console.warn(i(u," has been deprecated since v"+c+" and will be removed in the near future"))),!l||l(d,u,m)}};const Ai={assertOptions:function(l,c,y){if(oo(l)!=="object")throw new fe("options must be an object",fe.ERR_BAD_OPTION_VALUE);for(var i=Object.keys(l),d=i.length;d-- >0;){var u=i[d],m=c[u];if(m){var v=l[u],E=v===void 0||m(v,u,l);if(E!==!0)throw new fe("option "+u+" must be "+E,fe.ERR_BAD_OPTION_VALUE)}else if(y!==!0)throw new fe("Unknown option "+u,fe.ERR_BAD_OPTION)}},validators:yi};function or(l){return or=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},or(l)}function mp(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(or(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(or(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),or(d)==="symbol"?d:String(d)),i)}var d}var Gt=Ai.validators,io=function(){function l(i){(function(d,u){if(!(d instanceof u))throw new TypeError("Cannot call a class as a function")})(this,l),this.defaults=i,this.interceptors={request:new Ga,response:new Ga}}var c,y;return c=l,(y=[{key:"request",value:function(i,d){typeof i=="string"?(d=d||{}).url=i:d=i||{};var u,m=d=xn(this.defaults,d),v=m.transitional,E=m.paramsSerializer,T=m.headers;v!==void 0&&Ai.assertOptions(v,{silentJSONParsing:Gt.transitional(Gt.boolean),forcedJSONParsing:Gt.transitional(Gt.boolean),clarifyTimeoutError:Gt.transitional(Gt.boolean)},!1),E!==void 0&&Ai.assertOptions(E,{encode:Gt.function,serialize:Gt.function},!0),d.method=(d.method||this.defaults.method||"get").toLowerCase(),(u=T&&P.merge(T.common,T[d.method]))&&P.forEach(["delete","get","head","post","put","patch","common"],function(Be){delete T[Be]}),d.headers=Ut.concat(u,T);var L=[],H=!0;this.interceptors.request.forEach(function(Be){typeof Be.runWhen=="function"&&Be.runWhen(d)===!1||(H=H&&Be.synchronous,L.unshift(Be.fulfilled,Be.rejected))});var K,Z=[];this.interceptors.response.forEach(function(Be){Z.push(Be.fulfilled,Be.rejected)});var V,Y=0;if(!H){var ee=[dl.bind(this),void 0];for(ee.unshift.apply(ee,L),ee.push.apply(ee,Z),V=ee.length,K=Promise.resolve(d);Y<V;)K=K.then(ee[Y++],ee[Y++]);return K}V=L.length;var ae=d;for(Y=0;Y<V;){var We=L[Y++],Fe=L[Y++];try{ae=We(ae)}catch(Be){Fe.call(this,Be);break}}try{K=dl.call(this,ae)}catch(Be){return Promise.reject(Be)}for(Y=0,V=Z.length;Y<V;)K=K.then(Z[Y++],Z[Y++]);return K}},{key:"getUri",value:function(i){return Ja(sl((i=xn(this.defaults,i)).baseURL,i.url),i.params,i.paramsSerializer)}}])&&mp(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();P.forEach(["delete","get","head","options"],function(l){io.prototype[l]=function(c,y){return this.request(xn(y||{},{method:l,url:c,data:(y||{}).data}))}}),P.forEach(["post","put","patch"],function(l){function c(y){return function(i,d,u){return this.request(xn(u||{},{method:l,headers:y?{"Content-Type":"multipart/form-data"}:{},url:i,data:d}))}}io.prototype[l]=c(),io.prototype[l+"Form"]=c(!0)});const ao=io;function ir(l){return ir=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},ir(l)}function fl(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(ir(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(ir(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),ir(d)==="symbol"?d:String(d)),i)}var d}var bp=function(){function l(d){if(function(v,E){if(!(v instanceof E))throw new TypeError("Cannot call a class as a function")}(this,l),typeof d!="function")throw new TypeError("executor must be a function.");var u;this.promise=new Promise(function(v){u=v});var m=this;this.promise.then(function(v){if(m._listeners){for(var E=m._listeners.length;E-- >0;)m._listeners[E](v);m._listeners=null}}),this.promise.then=function(v){var E,T=new Promise(function(L){m.subscribe(L),E=L}).then(v);return T.cancel=function(){m.unsubscribe(E)},T},d(function(v,E,T){m.reason||(m.reason=new ro(v,E,T),u(m.reason))})}var c,y,i;return c=l,y=[{key:"throwIfRequested",value:function(){if(this.reason)throw this.reason}},{key:"subscribe",value:function(d){this.reason?d(this.reason):this._listeners?this._listeners.push(d):this._listeners=[d]}},{key:"unsubscribe",value:function(d){if(this._listeners){var u=this._listeners.indexOf(d);u!==-1&&this._listeners.splice(u,1)}}}],i=[{key:"source",value:function(){var d;return{token:new l(function(u){d=u}),cancel:d}}}],y&&fl(c.prototype,y),i&&fl(c,i),Object.defineProperty(c,"prototype",{writable:!1}),l}();const gp=bp;function hl(l,c){(c==null||c>l.length)&&(c=l.length);for(var y=0,i=new Array(c);y<c;y++)i[y]=l[y];return i}var mi={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(mi).forEach(function(l){var c,y,i=(y=2,function(m){if(Array.isArray(m))return m}(c=l)||function(m,v){var E=m==null?null:typeof Symbol<"u"&&m[Symbol.iterator]||m["@@iterator"];if(E!=null){var T,L,H,K,Z=[],V=!0,Y=!1;try{if(H=(E=E.call(m)).next,v===0){if(Object(E)!==E)return;V=!1}else for(;!(V=(T=H.call(E)).done)&&(Z.push(T.value),Z.length!==v);V=!0);}catch(ee){Y=!0,L=ee}finally{try{if(!V&&E.return!=null&&(K=E.return(),Object(K)!==K))return}finally{if(Y)throw L}}return Z}}(c,y)||function(m,v){if(m){if(typeof m=="string")return hl(m,v);var E=Object.prototype.toString.call(m).slice(8,-1);return E==="Object"&&m.constructor&&(E=m.constructor.name),E==="Map"||E==="Set"?Array.from(m):E==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(E)?hl(m,v):void 0}}(c,y)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()),d=i[0],u=i[1];mi[u]=d});const vp=mi;var He=function l(c){var y=new ao(c),i=bt(ao.prototype.request,y);return P.extend(i,ao.prototype,y,{allOwnKeys:!0}),P.extend(i,y,null,{allOwnKeys:!0}),i.create=function(d){return l(xn(c,d))},i}(pi);He.Axios=ao,He.CanceledError=ro,He.CancelToken=gp,He.isCancel=al,He.VERSION="1.2.3",He.toFormData=Gr,He.AxiosError=fe,He.Cancel=He.CanceledError,He.all=function(l){return Promise.all(l)},He.spread=function(l){return function(c){return l.apply(null,c)}},He.isAxiosError=function(l){return P.isObject(l)&&l.isAxiosError===!0},He.mergeConfig=xn,He.AxiosHeaders=Ut,He.formToJSON=function(l){return tl(P.isHTMLForm(l)?new FormData(l):l)},He.HttpStatusCode=vp,He.default=He;const yl=He,Ep={send:function(l){yl.post(l.url,l.data).then(function(c){var y=c.data;y&&y.code===0?l.success&&l.success(y):l.error&&l.error(y&&y.msg)}).catch(function(c){console.error(c),l.error&&l.error()})},read:function(l){yl.get(l.url).then(function(c){var y=c.data;y&&y.code===0?l.success&&l.success(y.data.map(function(i){return{time:i[0],type:i[1],color:i[2],author:i[3],text:i[4]}})):l.error&&l.error(y&&y.msg)}).catch(function(c){console.error(c),l.error&&l.error()})}};function bi(l){return bi=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},bi(l)}function wp(l){var c=this;this.lang=l,this.fallbackLang=this.lang.includes("-")?this.lang.split("-")[0]:this.lang,this.tran=function(y){return y=y.toLowerCase(),kn[c.lang]&&kn[c.lang][y]?kn[c.lang][y]:kn[c.fallbackLang]&&kn[c.fallbackLang][y]?kn[c.fallbackLang][y]:gi[y]?gi[y]:y}}var gi={"danmaku-loading":"Danmaku is loading",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Input danmaku, hit Enter","about-author":"About author","dplayer-feedback":"DPlayer feedback","about-dplayer":"About DPlayer",loop:"Loop",speed:"Speed","opacity-danmaku":"Opacity for danmaku",normal:"Normal","please-input-danmaku":"Please input danmaku content!","set-danmaku-color":"Set danmaku color","set-danmaku-type":"Set danmaku type","show-danmaku":"Show danmaku","video-failed":"Video load failed","danmaku-failed":"Danmaku load failed","danmaku-send-failed":"Danmaku send failed","switching-quality":"Switching to %q quality","switched-quality":"Switched to %q quality",ff:"FF %s s",rew:"REW %s s","unlimited-danmaku":"Unlimited danmaku","send-danmaku":"Send danmaku",setting:"Setting",fullscreen:"Full screen","web-fullscreen":"Web full screen",send:"Send",screenshot:"Screenshot",airplay:"AirPlay",chromecast:"ChromeCast",subtitle:"Subtitle",off:"Off","show-subs":"Show subtitle","hide-subs":"Hide subtitle",volume:"Volume",live:"Live","video-info":"Video info"},kn={en:gi,"zh-cn":{"danmaku-loading":"弹幕加载中",top:"顶部",bottom:"底部",rolling:"滚动","input-danmaku-enter":"输入弹幕，回车发送","about-author":"关于作者","dplayer-feedback":"播放器意见反馈","about-dplayer":"关于 DPlayer 播放器",loop:"洗脑循环",speed:"速度","opacity-danmaku":"弹幕透明度",normal:"正常","please-input-danmaku":"要输入弹幕内容啊喂！","set-danmaku-color":"设置弹幕颜色","set-danmaku-type":"设置弹幕类型","show-danmaku":"显示弹幕","video-failed":"视频加载失败","danmaku-failed":"弹幕加载失败","danmaku-send-failed":"弹幕发送失败","switching-quality":"正在切换至 %q 画质","switched-quality":"已经切换至 %q 画质",ff:"快进 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"海量弹幕","send-danmaku":"发送弹幕",setting:"设置",fullscreen:"全屏","web-fullscreen":"页面全屏",send:"发送",screenshot:"截图",airplay:"无线投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"关闭","show-subs":"显示字幕","hide-subs":"隐藏字幕",volume:"音量",live:"直播","video-info":"视频统计信息"},"zh-tw":{"danmaku-loading":"彈幕載入中",top:"頂部",bottom:"底部",rolling:"滾動","input-danmaku-enter":"輸入彈幕，Enter 發送","about-author":"關於作者","dplayer-feedback":"播放器意見回饋","about-dplayer":"關於 DPlayer 播放器",loop:"循環播放",speed:"速度","opacity-danmaku":"彈幕透明度",normal:"正常","please-input-danmaku":"請輸入彈幕內容啊！","set-danmaku-color":"設定彈幕顏色","set-danmaku-type":"設定彈幕類型","show-danmaku":"顯示彈幕","video-failed":"影片載入失敗","danmaku-failed":"彈幕載入失敗","danmaku-send-failed":"彈幕發送失敗","switching-quality":"正在切換至 %q 畫質","switched-quality":"已經切換至 %q 畫質",ff:"快進 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"巨量彈幕","send-danmaku":"發送彈幕",setting:"設定",fullscreen:"全螢幕","web-fullscreen":"頁面全螢幕",send:"發送",screenshot:"截圖",airplay:"無線投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"關閉","show-subs":"顯示字幕","hide-subs":"隱藏字幕",volume:"音量",live:"直播","video-info":"影片統計訊息"},"ko-kr":{"danmaku-loading":"Danmaku를 불러오는 중입니다.",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Danmaku를 입력하고 Enter를 누르세요.","about-author":"만든이","dplayer-feedback":"피드백 보내기","about-dplayer":"DPlayer 정보",loop:"반복",speed:"배속","opacity-danmaku":"Danmaku 불투명도",normal:"표준","please-input-danmaku":"Danmaku를 입력하세요!","set-danmaku-color":"Danmaku 색상","set-danmaku-type":"Danmaku 설정","show-danmaku":"Danmaku 표시","video-failed":"비디오를 불러오지 못했습니다.","danmaku-failed":"Danmaku를 불러오지 못했습니다.","danmaku-send-failed":"Danmaku 전송에 실패했습니다.","Switching to":"","Switched to":"","switching-quality":"전환 %q 화질","switched-quality":"전환 됨 %q 화질",ff:"앞으로 %s 초",rew:"뒤로 %s 초","unlimited-danmaku":"끝없는 Danmaku","send-danmaku":"Danmaku 보내기",setting:"설정",fullscreen:"전체 화면","web-fullscreen":"웹 내 전체화면",send:"보내기",screenshot:"화면 캡쳐",airplay:"에어플레이",chromecast:"ChromeCast",subtitle:"부제",off:"끄다","show-subs":"자막 보이기","hide-subs":"자막 숨기기",Volume:"볼륨",live:"생방송","video-info":"비디오 정보"},de:{"danmaku-loading":"Danmaku lädt...",top:"Oben",bottom:"Unten",rolling:"Rollend","input-danmaku-enter":"Drücke Enter nach dem Einfügen vom Danmaku","about-author":"Über den Autor","dplayer-feedback":"DPlayer Feedback","about-dplayer":"Über DPlayer",loop:"Wiederholen",speed:"Geschwindigkeit","opacity-danmaku":"Transparenz für Danmaku",normal:"Normal","please-input-danmaku":"Bitte Danmaku Inhalt eingeben!","set-danmaku-color":"Danmaku Farbe festlegen","set-danmaku-type":"Danmaku Typ festlegen","show-danmaku":"Zeige Danmaku","video-failed":"Das Video konnte nicht geladen werden","danmaku-failed":"Danmaku konnte nicht geladen werden","danmaku-send-failed":"Das senden von Danmaku ist fehgeschlagen","switching-quality":"Wechsle zur %q Qualität","switched-quality":"Zur %q Qualität gewechselt",ff:"%s s Vorwärts",rew:"%s s Zurück","unlimited-danmaku":"Unlimitiertes Danmaku","send-danmaku":"Sende Danmaku",setting:"Einstellungen",fullscreen:"Vollbild","web-fullscreen":"Browser Vollbild",send:"Senden",screenshot:"Screenshot",airplay:"AirPlay","show-subs":"Zeige Untertitel",chromecast:"ChromeCast",subtitle:"Untertitel",off:"Schließung","hide-subs":"Verstecke Untertitel",volume:"Lautstärke",live:"Live","video-info":"Video Info"}},xp=o(730),kp=o.n(xp),Cp=o(74),Sp=o.n(Cp),Bp=o(437),Ip=o.n(Bp),Tp=o(644),_p=o.n(Tp),Op=o(324),Lp=o.n(Op),Rp=o(574),Pp=o.n(Rp),jp=o(300),zp=o.n(jp),Dp=o(934),Np=o.n(Dp),Mp=o(428),Fp=o.n(Mp),qp=o(807),Up=o.n(qp),Hp=o(338),Wp=o.n(Hp),Yp=o(254),$p=o.n(Yp),Kp=o(965),Vp=o.n(Kp),Qp=o(113),Xp=o.n(Qp),Zp=o(251),Jp=o.n(Zp),Gp=o(410),eu=o.n(Gp),tu=o(182),nu=o.n(tu),ru=o(193),ou=o.n(ru);const gt={play:kp(),pause:Sp(),volumeUp:Ip(),volumeDown:_p(),volumeOff:Lp(),full:Pp(),fullWeb:zp(),setting:Np(),right:Fp(),comment:Up(),commentOff:Wp(),send:$p(),pallette:Vp(),camera:Xp(),subtitle:eu(),loading:nu(),airplay:Jp(),chromecast:ou()};var iu=o(916),au=o.n(iu);function ar(l){return ar=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},ar(l)}function Al(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(ar(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(ar(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),ar(d)==="symbol"?d:String(d)),i)}var d}var lu=function(){function l(d){(function(u,m){if(!(u instanceof m))throw new TypeError("Cannot call a class as a function")})(this,l),this.container=d.container,this.options=d.options,this.index=d.index,this.tran=d.tran,this.init()}var c,y,i;return c=l,i=[{key:"NewNotice",value:function(d,u,m){var v=document.createElement("div");return v.classList.add("dplayer-notice"),v.style.opacity=u,v.innerText=d,m&&(v.id="dplayer-notice-".concat(m)),v}}],(y=[{key:"init",value:function(){this.container.innerHTML=au()({options:this.options,index:this.index,tran:this.tran,icons:gt,mobile:te.isMobile,video:{current:!0,pic:this.options.video.pic,screenshot:this.options.screenshot,airplay:!(!te.isSafari||te.isChrome)&&this.options.airplay,chromecast:this.options.chromecast,preload:this.options.preload,url:this.options.video.url,subtitle:this.options.subtitle}}),this.volumeBar=this.container.querySelector(".dplayer-volume-bar-inner"),this.volumeBarWrap=this.container.querySelector(".dplayer-volume-bar"),this.volumeBarWrapWrap=this.container.querySelector(".dplayer-volume-bar-wrap"),this.volumeButton=this.container.querySelector(".dplayer-volume"),this.volumeButtonIcon=this.container.querySelector(".dplayer-volume-icon"),this.volumeIcon=this.container.querySelector(".dplayer-volume-icon .dplayer-icon-content"),this.playedBar=this.container.querySelector(".dplayer-played"),this.loadedBar=this.container.querySelector(".dplayer-loaded"),this.playedBarWrap=this.container.querySelector(".dplayer-bar-wrap"),this.playedBarTime=this.container.querySelector(".dplayer-bar-time"),this.danmaku=this.container.querySelector(".dplayer-danmaku"),this.danmakuLoading=this.container.querySelector(".dplayer-danloading"),this.video=this.container.querySelector(".dplayer-video-current"),this.bezel=this.container.querySelector(".dplayer-bezel-icon"),this.playButton=this.container.querySelector(".dplayer-play-icon"),this.mobilePlayButton=this.container.querySelector(".dplayer-mobile-play"),this.videoWrap=this.container.querySelector(".dplayer-video-wrap"),this.controllerMask=this.container.querySelector(".dplayer-controller-mask"),this.ptime=this.container.querySelector(".dplayer-ptime"),this.settingButton=this.container.querySelector(".dplayer-setting-icon"),this.settingBox=this.container.querySelector(".dplayer-setting-box"),this.mask=this.container.querySelector(".dplayer-mask"),this.loop=this.container.querySelector(".dplayer-setting-loop"),this.loopToggle=this.container.querySelector(".dplayer-setting-loop .dplayer-toggle-setting-input"),this.showDanmaku=this.container.querySelector(".dplayer-setting-showdan"),this.showDanmakuToggle=this.container.querySelector(".dplayer-showdan-setting-input"),this.unlimitDanmaku=this.container.querySelector(".dplayer-setting-danunlimit"),this.unlimitDanmakuToggle=this.container.querySelector(".dplayer-danunlimit-setting-input"),this.speed=this.container.querySelector(".dplayer-setting-speed"),this.speedItem=this.container.querySelectorAll(".dplayer-setting-speed-item"),this.danmakuOpacityBar=this.container.querySelector(".dplayer-danmaku-bar-inner"),this.danmakuOpacityBarWrap=this.container.querySelector(".dplayer-danmaku-bar"),this.danmakuOpacityBarWrapWrap=this.container.querySelector(".dplayer-danmaku-bar-wrap"),this.danmakuOpacityBox=this.container.querySelector(".dplayer-setting-danmaku"),this.dtime=this.container.querySelector(".dplayer-dtime"),this.controller=this.container.querySelector(".dplayer-controller"),this.commentInput=this.container.querySelector(".dplayer-comment-input"),this.commentButton=this.container.querySelector(".dplayer-comment-icon"),this.commentSettingBox=this.container.querySelector(".dplayer-comment-setting-box"),this.commentSettingButton=this.container.querySelector(".dplayer-comment-setting-icon"),this.commentSettingFill=this.container.querySelector(".dplayer-comment-setting-icon path"),this.commentSendButton=this.container.querySelector(".dplayer-send-icon"),this.commentSendFill=this.container.querySelector(".dplayer-send-icon path"),this.commentColorSettingBox=this.container.querySelector(".dplayer-comment-setting-color"),this.browserFullButton=this.container.querySelector(".dplayer-full-icon"),this.webFullButton=this.container.querySelector(".dplayer-full-in-icon"),this.menu=this.container.querySelector(".dplayer-menu"),this.menuItem=this.container.querySelectorAll(".dplayer-menu-item"),this.qualityList=this.container.querySelector(".dplayer-quality-list"),this.camareButton=this.container.querySelector(".dplayer-camera-icon"),this.airplayButton=this.container.querySelector(".dplayer-airplay-icon"),this.chromecastButton=this.container.querySelector(".dplayer-chromecast-icon"),this.subtitleButton=this.container.querySelector(".dplayer-subtitle-icon"),this.subtitleButtonInner=this.container.querySelector(".dplayer-subtitle-icon .dplayer-icon-content"),this.subtitlesButton=this.container.querySelector(".dplayer-subtitles-icon"),this.subtitlesBox=this.container.querySelector(".dplayer-subtitles-box"),this.subtitlesItem=this.container.querySelectorAll(".dplayer-subtitles-item"),this.subtitle=this.container.querySelector(".dplayer-subtitle"),this.subtrack=this.container.querySelector(".dplayer-subtrack"),this.qualityButton=this.container.querySelector(".dplayer-quality-icon"),this.barPreview=this.container.querySelector(".dplayer-bar-preview"),this.barWrap=this.container.querySelector(".dplayer-bar-wrap"),this.noticeList=this.container.querySelector(".dplayer-notice-list"),this.infoPanel=this.container.querySelector(".dplayer-info-panel"),this.infoPanelClose=this.container.querySelector(".dplayer-info-panel-close"),this.infoVersion=this.container.querySelector(".dplayer-info-panel-item-version .dplayer-info-panel-item-data"),this.infoFPS=this.container.querySelector(".dplayer-info-panel-item-fps .dplayer-info-panel-item-data"),this.infoType=this.container.querySelector(".dplayer-info-panel-item-type .dplayer-info-panel-item-data"),this.infoUrl=this.container.querySelector(".dplayer-info-panel-item-url .dplayer-info-panel-item-data"),this.infoResolution=this.container.querySelector(".dplayer-info-panel-item-resolution .dplayer-info-panel-item-data"),this.infoDuration=this.container.querySelector(".dplayer-info-panel-item-duration .dplayer-info-panel-item-data"),this.infoDanmakuId=this.container.querySelector(".dplayer-info-panel-item-danmaku-id .dplayer-info-panel-item-data"),this.infoDanmakuApi=this.container.querySelector(".dplayer-info-panel-item-danmaku-api .dplayer-info-panel-item-data"),this.infoDanmakuAmount=this.container.querySelector(".dplayer-info-panel-item-danmaku-amount .dplayer-info-panel-item-data")}}])&&Al(c.prototype,y),i&&Al(c,i),Object.defineProperty(c,"prototype",{writable:!1}),l}();const ml=lu;function Cn(l){return Cn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},Cn(l)}function su(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(Cn(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(Cn(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),Cn(d)==="symbol"?d:String(d)),i)}var d}var cu=function(){function l(i){(function(d,u){if(!(d instanceof u))throw new TypeError("Cannot call a class as a function")})(this,l),this.options=i,this.player=this.options.player,this.container=this.options.container,this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.dan=[],this.showing=!0,this._opacity=this.options.opacity,this.events=this.options.events,this.unlimited=this.options.unlimited,this._measure(""),this.load()}var c,y;return c=l,y=[{key:"load",value:function(){var i,d=this;i=this.options.api.maximum?"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id,"&max=").concat(this.options.api.maximum):"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id);var u=(this.options.api.addition||[]).slice(0);u.push(i),this.events&&this.events.trigger("danmaku_load_start",u),this._readAllEndpoints(u,function(m){d.dan=[].concat.apply([],m).sort(function(v,E){return v.time-E.time}),window.requestAnimationFrame(function(){d.frame()}),d.options.callback(),d.events&&d.events.trigger("danmaku_load_end")})}},{key:"reload",value:function(i){this.options.api=i,this.dan=[],this.clear(),this.load()}},{key:"_readAllEndpoints",value:function(i,d){for(var u=this,m=[],v=0,E=function(L){u.options.apiBackend.read({url:i[L],success:function(H){m[L]=H,++v===i.length&&d(m)},error:function(H){u.options.error(H||u.options.tran("danmaku-failed")),m[L]=[],++v===i.length&&d(m)}})},T=0;T<i.length;++T)E(T)}},{key:"send",value:function(i,d){var u=this,m={token:this.options.api.token,id:this.options.api.id,author:this.options.api.user,time:this.options.time(),text:i.text,color:i.color,type:i.type};this.options.apiBackend.send({url:this.options.api.address+"v3/",data:m,success:d,error:function(E){u.options.error(E||u.options.tran("danmaku-failed"))}}),this.dan.splice(this.danIndex,0,m),this.danIndex++;var v={text:this.htmlEncode(m.text),color:m.color,type:m.type,border:"2px solid ".concat(this.options.borderColor)};this.draw(v),this.events&&this.events.trigger("danmaku_send",m)}},{key:"frame",value:function(){var i=this;if(this.dan.length&&!this.paused&&this.showing){for(var d=this.dan[this.danIndex],u=[];d&&this.options.time()>parseFloat(d.time);)u.push(d),d=this.dan[++this.danIndex];this.draw(u)}window.requestAnimationFrame(function(){i.frame()})}},{key:"opacity",value:function(i){if(i!==void 0){for(var d=this.container.getElementsByClassName("dplayer-danmaku-item"),u=0;u<d.length;u++)d[u].style.opacity=i;this._opacity=i,this.events&&this.events.trigger("danmaku_opacity",this._opacity)}return this._opacity}},{key:"draw",value:function(i){var d=this;if(this.showing){var u=this.options.height,m=this.container.offsetWidth,v=this.container.offsetHeight,E=parseInt(v/u),T=function(Y){var ee=Y.offsetWidth||parseInt(Y.style.width),ae=Y.getBoundingClientRect().right||d.container.getBoundingClientRect().right+ee;return d.container.getBoundingClientRect().right-ae},L=function(Y){return(m+Y)/5},H=function(Y,ee,ae){for(var We=m/L(ae),Fe=function(un){var Bn=d.danTunnel[ee][un+""];if(!Bn||!Bn.length)return d.danTunnel[ee][un+""]=[Y],Y.addEventListener("animationend",function(){d.danTunnel[ee][un+""].splice(0,1)}),{v:un%E};if(ee!=="right")return"continue";for(var xr=0;xr<Bn.length;xr++){var xl=T(Bn[xr])-10;if(xl<=m-We*L(parseInt(Bn[xr].style.width))||xl<=0)break;if(xr===Bn.length-1)return d.danTunnel[ee][un+""].push(Y),Y.addEventListener("animationend",function(){d.danTunnel[ee][un+""].splice(0,1)}),{v:un%E}}},Be=0;d.unlimited||Be<E;Be++){var tn=Fe(Be);if(tn!=="continue"&&Cn(tn)==="object")return tn.v}return-1};Object.prototype.toString.call(i)!=="[object Array]"&&(i=[i]);for(var K=document.createDocumentFragment(),Z=function(){i[V].type=te.number2Type(i[V].type),i[V].color||(i[V].color=16777215);var Y=document.createElement("div");Y.classList.add("dplayer-danmaku-item"),Y.classList.add("dplayer-danmaku-".concat(i[V].type)),i[V].border?Y.innerHTML='<span style="border:'.concat(i[V].border,'">').concat(i[V].text,"</span>"):Y.innerHTML=i[V].text,Y.style.opacity=d._opacity,Y.style.color=te.number2Color(i[V].color),Y.addEventListener("animationend",function(){d.container.removeChild(Y)});var ee,ae=d._measure(i[V].text);switch(i[V].type){case"right":(ee=H(Y,i[V].type,ae))>=0&&(Y.style.width=ae+1+"px",Y.style.top=u*ee+"px",Y.style.transform="translateX(-".concat(m,"px)"));break;case"top":(ee=H(Y,i[V].type))>=0&&(Y.style.top=u*ee+"px");break;case"bottom":(ee=H(Y,i[V].type))>=0&&(Y.style.bottom=u*ee+"px");break;default:console.error("Can't handled danmaku type: ".concat(i[V].type))}ee>=0&&(Y.classList.add("dplayer-danmaku-move"),Y.style.animationDuration=d._danAnimation(i[V].type),K.appendChild(Y))},V=0;V<i.length;V++)Z();return this.container.appendChild(K),K}}},{key:"play",value:function(){this.paused=!1}},{key:"pause",value:function(){this.paused=!0}},{key:"_measure",value:function(i){if(!this.context){var d=getComputedStyle(this.container.getElementsByClassName("dplayer-danmaku-item")[0],null);this.context=document.createElement("canvas").getContext("2d"),this.context.font=d.getPropertyValue("font")}return this.context.measureText(i).width}},{key:"seek",value:function(){this.clear();for(var i=0;i<this.dan.length;i++){if(this.dan[i].time>=this.options.time()){this.danIndex=i;break}this.danIndex=this.dan.length}}},{key:"clear",value:function(){this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.options.container.innerHTML="",this.events&&this.events.trigger("danmaku_clear")}},{key:"htmlEncode",value:function(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2f;")}},{key:"resize",value:function(){for(var i=this.container.offsetWidth,d=this.container.getElementsByClassName("dplayer-danmaku-item"),u=0;u<d.length;u++)d[u].style.transform="translateX(-".concat(i,"px)")}},{key:"hide",value:function(){this.showing=!1,this.pause(),this.clear(),this.events&&this.events.trigger("danmaku_hide")}},{key:"show",value:function(){this.seek(),this.showing=!0,this.play(),this.events&&this.events.trigger("danmaku_show")}},{key:"unlimit",value:function(i){this.unlimited=i}},{key:"speed",value:function(i){this.options.api.speedRate=i}},{key:"_danAnimation",value:function(i){var d=this.options.api.speedRate||1,u=!!this.player.fullScreen.isFullScreen();return{top:"".concat((u?6:4)/d,"s"),right:"".concat((u?8:5)/d,"s"),bottom:"".concat((u?6:4)/d,"s")}[i]}}],y&&su(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const du=cu;function lr(l){return lr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},lr(l)}function pu(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(lr(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(lr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),lr(d)==="symbol"?d:String(d)),i)}var d}const uu=function(){function l(){(function(i,d){if(!(i instanceof d))throw new TypeError("Cannot call a class as a function")})(this,l),this.events={},this.videoEvents=["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","mozaudioavailable","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],this.playerEvents=["screenshot","thumbnails_show","thumbnails_hide","danmaku_show","danmaku_hide","danmaku_clear","danmaku_loaded","danmaku_send","danmaku_opacity","contextmenu_show","contextmenu_hide","notice_show","notice_hide","quality_start","quality_end","destroy","resize","fullscreen","fullscreen_cancel","webfullscreen","webfullscreen_cancel","subtitle_show","subtitle_hide","subtitle_change"]}var c,y;return c=l,(y=[{key:"on",value:function(i,d){this.type(i)&&typeof d=="function"&&(this.events[i]||(this.events[i]=[]),this.events[i].push(d))}},{key:"trigger",value:function(i,d){if(this.events[i]&&this.events[i].length)for(var u=0;u<this.events[i].length;u++)this.events[i][u](d)}},{key:"type",value:function(i){return this.playerEvents.indexOf(i)!==-1?"player":this.videoEvents.indexOf(i)!==-1?"video":(console.error("Unknown event name: ".concat(i)),null)}}])&&pu(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();function sr(l){return sr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},sr(l)}function fu(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(sr(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(sr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),sr(d)==="symbol"?d:String(d)),i)}var d}var hu=function(){function l(i){var d=this;(function(u,m){if(!(u instanceof m))throw new TypeError("Cannot call a class as a function")})(this,l),this.player=i,this.lastScrollPosition={left:0,top:0},this.player.events.on("webfullscreen",function(){d.player.resize()}),this.player.events.on("webfullscreen_cancel",function(){d.player.resize(),te.setScrollPosition(d.lastScrollPosition)}),this.fullscreenchange=function(){d.player.resize(),d.isFullScreen("browser")?d.player.events.trigger("fullscreen"):(te.setScrollPosition(d.lastScrollPosition),d.player.events.trigger("fullscreen_cancel"))},this.docfullscreenchange=function(){var u=document.fullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;u&&u!==d.player.container||(d.player.resize(),u?d.player.events.trigger("fullscreen"):(te.setScrollPosition(d.lastScrollPosition),d.player.events.trigger("fullscreen_cancel")))},/Firefox/.test(navigator.userAgent)?(document.addEventListener("mozfullscreenchange",this.docfullscreenchange),document.addEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.addEventListener("fullscreenchange",this.fullscreenchange),this.player.container.addEventListener("webkitfullscreenchange",this.fullscreenchange),document.addEventListener("msfullscreenchange",this.docfullscreenchange),document.addEventListener("MSFullscreenChange",this.docfullscreenchange))}var c,y;return c=l,y=[{key:"isFullScreen",value:function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(i){case"browser":return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;case"web":return this.player.container.classList.contains("dplayer-fulled")}}},{key:"request",value:function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser",d=i==="browser"?"web":"browser",u=this.isFullScreen(d);switch(u||(this.lastScrollPosition=te.getScrollPosition()),i){case"browser":this.player.container.requestFullscreen?this.player.container.requestFullscreen():this.player.container.mozRequestFullScreen?this.player.container.mozRequestFullScreen():this.player.container.webkitRequestFullscreen?this.player.container.webkitRequestFullscreen():this.player.video.webkitEnterFullscreen?this.player.video.webkitEnterFullscreen():this.player.video.webkitEnterFullScreen?this.player.video.webkitEnterFullScreen():this.player.container.msRequestFullscreen&&this.player.container.msRequestFullscreen();break;case"web":this.player.container.classList.add("dplayer-fulled"),document.body.classList.add("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen")}u&&this.cancel(d)}},{key:"cancel",value:function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(i){case"browser":document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.webkitCancelFullscreen?document.webkitCancelFullscreen():document.msCancelFullScreen?document.msCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen();break;case"web":this.player.container.classList.remove("dplayer-fulled"),document.body.classList.remove("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen_cancel")}}},{key:"toggle",value:function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";this.isFullScreen(i)?this.cancel(i):this.request(i)}},{key:"destroy",value:function(){/Firefox/.test(navigator.userAgent)?(document.removeEventListener("mozfullscreenchange",this.docfullscreenchange),document.removeEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.removeEventListener("fullscreenchange",this.fullscreenchange),this.player.container.removeEventListener("webkitfullscreenchange",this.fullscreenchange),document.removeEventListener("msfullscreenchange",this.docfullscreenchange),document.removeEventListener("MSFullscreenChange",this.docfullscreenchange))}}],y&&fu(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const yu=hu;function cr(l){return cr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},cr(l)}function Au(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(cr(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(cr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),cr(d)==="symbol"?d:String(d)),i)}var d}var mu=function(){function l(i){(function(d,u){if(!(d instanceof u))throw new TypeError("Cannot call a class as a function")})(this,l),this.storageName={opacity:"dplayer-danmaku-opacity",volume:"dplayer-volume",unlimited:"dplayer-danmaku-unlimited",danmaku:"dplayer-danmaku-show",subtitle:"dplayer-subtitle-show"},this.default={opacity:.7,volume:i.options.hasOwnProperty("volume")?i.options.volume:.7,unlimited:(i.options.danmaku&&i.options.danmaku.unlimited?1:0)||0,danmaku:1,subtitle:1},this.data={},this.init()}var c,y;return c=l,(y=[{key:"init",value:function(){for(var i in this.storageName){var d=this.storageName[i];this.data[i]=parseFloat(te.storage.get(d)||this.default[i])}}},{key:"get",value:function(i){return this.data[i]}},{key:"set",value:function(i,d){this.data[i]=d,te.storage.set(this.storageName[i],d)}}])&&Au(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const bu=mu;function dr(l){return dr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},dr(l)}function gu(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(dr(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(dr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),dr(d)==="symbol"?d:String(d)),i)}var d}var vu=function(){function l(i,d,u,m){(function(v,E){if(!(v instanceof E))throw new TypeError("Cannot call a class as a function")})(this,l),this.container=i,this.video=d,this.options=u,this.events=m,this.init()}var c,y;return c=l,y=[{key:"init",value:function(){var i=this;if(this.container.style.fontSize=this.options.fontSize,this.container.style.bottom=this.options.bottom,this.container.style.color=this.options.color,this.video.textTracks&&this.video.textTracks[0]){var d=this.video.textTracks[0];d.oncuechange=function(){var u=d.activeCues[d.activeCues.length-1];if(i.container.innerHTML="",u){var m=document.createElement("div");m.appendChild(u.getCueAsHTML());var v=m.innerHTML.split(/\r?\n/).map(function(E){return"<p>".concat(E,"</p>")}).join("");i.container.innerHTML=v}i.events.trigger("subtitle_change")}}}},{key:"show",value:function(){this.container.classList.remove("dplayer-subtitle-hide"),this.events.trigger("subtitle_show")}},{key:"hide",value:function(){this.container.classList.add("dplayer-subtitle-hide"),this.events.trigger("subtitle_hide")}},{key:"toggle",value:function(){this.container.classList.contains("dplayer-subtitle-hide")?this.show():this.hide()}}],y&&gu(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const Eu=vu;function pr(l){return pr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},pr(l)}function wu(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(pr(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(pr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),pr(d)==="symbol"?d:String(d)),i)}var d}var xu=function(){function l(i){var d=this;(function(E,T){if(!(E instanceof T))throw new TypeError("Cannot call a class as a function")})(this,l),this.player=i,this.player.template.mask.addEventListener("click",function(){d.hide()}),this.player.template.subtitlesButton.addEventListener("click",function(){d.adaptiveHeight(),d.show()});for(var u=this.player.template.subtitlesItem.length-1,m=function(E){d.player.template.subtitlesItem[E].addEventListener("click",function(){d.hide(),d.player.options.subtitle.index!==E&&(d.player.template.subtitle.innerHTML="<p></p>",d.player.template.subtrack.src=d.player.template.subtitlesItem[E].dataset.subtitle,d.player.options.subtitle.index=E,d.player.template.subtitle.classList.contains("dplayer-subtitle-hide")&&d.subContainerShow())})},v=0;v<u;v++)m(v);this.player.template.subtitlesItem[u].addEventListener("click",function(){d.hide(),d.player.options.subtitle.index!==u&&(d.player.template.subtitle.innerHTML="<p></p>",d.player.template.subtrack.src="",d.player.options.subtitle.index=u,d.subContainerHide())})}var c,y;return c=l,(y=[{key:"subContainerShow",value:function(){this.player.template.subtitle.classList.remove("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_show")}},{key:"subContainerHide",value:function(){this.player.template.subtitle.classList.add("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_hide")}},{key:"hide",value:function(){this.player.template.subtitlesBox.classList.remove("dplayer-subtitles-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.subtitlesBox.classList.add("dplayer-subtitles-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}},{key:"adaptiveHeight",value:function(){var i=30*this.player.template.subtitlesItem.length+14,d=.8*this.player.template.videoWrap.offsetHeight;i>=d-50?(this.player.template.subtitlesBox.style.bottom="8px",this.player.template.subtitlesBox.style["max-height"]=d-8+"px"):(this.player.template.subtitlesBox.style.bottom="50px",this.player.template.subtitlesBox.style["max-height"]=d-50+"px")}}])&&wu(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const ku=xu;function ur(l){return ur=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},ur(l)}function Cu(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(ur(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(ur(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),ur(d)==="symbol"?d:String(d)),i)}var d}var Su=function(){function l(i){(function(d,u){if(!(d instanceof u))throw new TypeError("Cannot call a class as a function")})(this,l),this.elements={},this.elements.volume=i.volumeBar,this.elements.played=i.playedBar,this.elements.loaded=i.loadedBar,this.elements.danmaku=i.danmakuOpacityBar}var c,y;return c=l,(y=[{key:"set",value:function(i,d,u){d=Math.max(d,0),d=Math.min(d,1),this.elements[i].style[u]=100*d+"%"}},{key:"get",value:function(i){return parseFloat(this.elements[i].style.width)/100}}])&&Cu(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const Bu=Su;function fr(l){return fr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},fr(l)}function Iu(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(fr(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(fr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),fr(d)==="symbol"?d:String(d)),i)}var d}var Tu=function(){function l(i){(function(d,u){if(!(d instanceof u))throw new TypeError("Cannot call a class as a function")})(this,l),this.player=i,window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(d){window.setTimeout(d,1e3/60)},this.types=["loading","info","fps"],this.init()}var c,y;return c=l,(y=[{key:"init",value:function(){var i=this;this.types.map(function(d){return d!=="fps"&&i["init".concat(d,"Checker")](),d})}},{key:"initloadingChecker",value:function(){var i=this,d=0,u=0,m=!1;this.loadingChecker=setInterval(function(){i.enableloadingChecker&&(u=i.player.video.currentTime,m||u!==d||i.player.video.paused||(i.player.container.classList.add("dplayer-loading"),m=!0),m&&u>d&&!i.player.video.paused&&(i.player.container.classList.remove("dplayer-loading"),m=!1),d=u)},100)}},{key:"initfpsChecker",value:function(){var i=this;window.requestAnimationFrame(function(){if(i.enablefpsChecker)if(i.initfpsChecker(),i.fpsStart){i.fpsIndex++;var d=new Date;d-i.fpsStart>1e3&&(i.player.infoPanel.fps(i.fpsIndex/(d-i.fpsStart)*1e3),i.fpsStart=new Date,i.fpsIndex=0)}else i.fpsStart=new Date,i.fpsIndex=0;else i.fpsStart=0,i.fpsIndex=0})}},{key:"initinfoChecker",value:function(){var i=this;this.infoChecker=setInterval(function(){i.enableinfoChecker&&i.player.infoPanel.update()},1e3)}},{key:"enable",value:function(i){this["enable".concat(i,"Checker")]=!0,i==="fps"&&this.initfpsChecker()}},{key:"disable",value:function(i){this["enable".concat(i,"Checker")]=!1}},{key:"destroy",value:function(){var i=this;this.types.map(function(d){return i["enable".concat(d,"Checker")]=!1,i["".concat(d,"Checker")]&&clearInterval(i["".concat(d,"Checker")]),d})}}])&&Iu(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const _u=Tu;function hr(l){return hr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},hr(l)}function Ou(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(hr(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(hr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),hr(d)==="symbol"?d:String(d)),i)}var d}const Lu=function(){function l(i){var d=this;(function(u,m){if(!(u instanceof m))throw new TypeError("Cannot call a class as a function")})(this,l),this.container=i,this.container.addEventListener("animationend",function(){d.container.classList.remove("dplayer-bezel-transition")})}var c,y;return c=l,(y=[{key:"switch",value:function(i){this.container.innerHTML=i,this.container.classList.add("dplayer-bezel-transition")}}])&&Ou(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();function yr(l){return yr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},yr(l)}function Ru(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(yr(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(yr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),yr(d)==="symbol"?d:String(d)),i)}var d}var Pu=function(){function l(i){(function(d,u){if(!(d instanceof u))throw new TypeError("Cannot call a class as a function")})(this,l),this.container=i.container,this.barWidth=i.barWidth,this.container.style.backgroundImage="url('".concat(i.url,"')"),this.events=i.events}var c,y;return c=l,(y=[{key:"resize",value:function(i,d,u){this.container.style.width="".concat(i,"px"),this.container.style.height="".concat(d,"px"),this.container.style.top="".concat(2-d,"px"),this.barWidth=u}},{key:"show",value:function(){this.container.style.display="block",this.events&&this.events.trigger("thumbnails_show")}},{key:"move",value:function(i){this.container.style.backgroundPosition="-".concat(160*(Math.ceil(i/this.barWidth*100)-1),"px 0"),this.container.style.left="".concat(Math.min(Math.max(i-this.container.offsetWidth/2,-10),this.barWidth-150),"px")}},{key:"hide",value:function(){this.container.style.display="none",this.events&&this.events.trigger("thumbnails_hide")}}])&&Ru(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const ju=Pu;function Ar(l){return Ar=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},Ar(l)}function zu(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(Ar(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(Ar(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),Ar(d)==="symbol"?d:String(d)),i)}var d}var en,bl=!0,vi=!1,Du=function(){function l(i){(function(d,u){if(!(d instanceof u))throw new TypeError("Cannot call a class as a function")})(this,l),this.player=i,this.autoHideTimer=0,te.isMobile||(this.setAutoHideHandler=this.setAutoHide.bind(this),this.player.container.addEventListener("mousemove",this.setAutoHideHandler),this.player.container.addEventListener("click",this.setAutoHideHandler),this.player.on("play",this.setAutoHideHandler),this.player.on("pause",this.setAutoHideHandler)),this.initPlayButton(),this.initThumbnails(),this.initPlayedBar(),this.initFullButton(),this.initQualityButton(),this.initScreenshotButton(),this.player.options.subtitle&&typeof this.player.options.subtitle.url=="string"&&this.initSubtitleButton(),this.initHighlights(),this.initAirplayButton(),this.initChromecastButton(),te.isMobile||this.initVolumeButton()}var c,y;return c=l,(y=[{key:"initPlayButton",value:function(){var i=this;this.player.template.playButton.addEventListener("click",function(){i.player.toggle()}),this.player.template.mobilePlayButton.addEventListener("click",function(){i.player.toggle()}),te.isMobile?(this.player.template.videoWrap.addEventListener("click",function(){i.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){i.toggle()})):this.player.options.preventClickToggle||(this.player.template.videoWrap.addEventListener("click",function(){i.player.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){i.player.toggle()}))}},{key:"initHighlights",value:function(){var i=this;this.player.on("durationchange",function(){if(i.player.video.duration!==1&&i.player.video.duration!==1/0&&i.player.options.highlight){var d=i.player.template.playedBarWrap.querySelectorAll(".dplayer-highlight");[].slice.call(d,0).forEach(function(v){i.player.template.playedBarWrap.removeChild(v)});for(var u=0;u<i.player.options.highlight.length;u++)if(i.player.options.highlight[u].text&&i.player.options.highlight[u].time){var m=document.createElement("div");m.classList.add("dplayer-highlight"),m.style.left=i.player.options.highlight[u].time/i.player.video.duration*100+"%",m.innerHTML='<span class="dplayer-highlight-text">'+i.player.options.highlight[u].text+"</span>",i.player.template.playedBarWrap.insertBefore(m,i.player.template.playedBarTime)}}})}},{key:"initThumbnails",value:function(){var i=this;this.player.options.video.thumbnails&&(this.thumbnails=new ju({container:this.player.template.barPreview,barWidth:this.player.template.barWrap.offsetWidth,url:this.player.options.video.thumbnails,events:this.player.events}),this.player.on("loadedmetadata",function(){i.thumbnails.resize(160,i.player.video.videoHeight/i.player.video.videoWidth*160,i.player.template.barWrap.offsetWidth)}))}},{key:"initPlayedBar",value:function(){var i=this,d=function(m){var v=((m.clientX||m.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(i.player.template.playedBarWrap))/i.player.template.playedBarWrap.clientWidth;v=Math.max(v,0),v=Math.min(v,1),i.player.bar.set("played",v,"width"),i.player.template.ptime.innerHTML=te.secondToTime(v*i.player.video.duration)},u=function m(v){document.removeEventListener(te.nameMap.dragEnd,m),document.removeEventListener(te.nameMap.dragMove,d);var E=((v.clientX||v.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(i.player.template.playedBarWrap))/i.player.template.playedBarWrap.clientWidth;E=Math.max(E,0),E=Math.min(E,1),i.player.bar.set("played",E,"width"),i.player.seek(i.player.bar.get("played")*i.player.video.duration),i.player.timer.enable("progress")};this.player.template.playedBarWrap.addEventListener(te.nameMap.dragStart,function(){i.player.timer.disable("progress"),document.addEventListener(te.nameMap.dragMove,d),document.addEventListener(te.nameMap.dragEnd,u)}),this.player.template.playedBarWrap.addEventListener(te.nameMap.dragMove,function(m){if(i.player.video.duration){var v=i.player.template.playedBarWrap.getBoundingClientRect().left,E=(m.clientX||m.changedTouches[0].clientX)-v;if(E<0||E>i.player.template.playedBarWrap.offsetWidth)return;var T=i.player.video.duration*(E/i.player.template.playedBarWrap.offsetWidth);te.isMobile&&i.thumbnails&&i.thumbnails.show(),i.thumbnails&&i.thumbnails.move(E),i.player.template.playedBarTime.style.left="".concat(E-(T>=3600?25:20),"px"),i.player.template.playedBarTime.innerText=te.secondToTime(T),i.player.template.playedBarTime.classList.remove("hidden")}}),this.player.template.playedBarWrap.addEventListener(te.nameMap.dragEnd,function(){te.isMobile&&i.thumbnails&&i.thumbnails.hide()}),te.isMobile||(this.player.template.playedBarWrap.addEventListener("mouseenter",function(){i.player.video.duration&&(i.thumbnails&&i.thumbnails.show(),i.player.template.playedBarTime.classList.remove("hidden"))}),this.player.template.playedBarWrap.addEventListener("mouseleave",function(){i.player.video.duration&&(i.thumbnails&&i.thumbnails.hide(),i.player.template.playedBarTime.classList.add("hidden"))}))}},{key:"initFullButton",value:function(){var i=this;this.player.template.browserFullButton.addEventListener("click",function(){i.player.fullScreen.toggle("browser")}),this.player.template.webFullButton.addEventListener("click",function(){i.player.fullScreen.toggle("web")})}},{key:"initVolumeButton",value:function(){var i=this,d=function(m){var v=m||window.event,E=((v.clientX||v.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(i.player.template.volumeBarWrap)-5.5)/35;i.player.volume(E)},u=function m(){document.removeEventListener(te.nameMap.dragEnd,m),document.removeEventListener(te.nameMap.dragMove,d),i.player.template.volumeButton.classList.remove("dplayer-volume-active")};this.player.template.volumeBarWrapWrap.addEventListener("click",function(m){var v=m||window.event,E=((v.clientX||v.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(i.player.template.volumeBarWrap)-5.5)/35;i.player.volume(E)}),this.player.template.volumeBarWrapWrap.addEventListener(te.nameMap.dragStart,function(){document.addEventListener(te.nameMap.dragMove,d),document.addEventListener(te.nameMap.dragEnd,u),i.player.template.volumeButton.classList.add("dplayer-volume-active")}),this.player.template.volumeButtonIcon.addEventListener("click",function(){i.player.video.muted?(i.player.video.muted=!1,i.player.switchVolumeIcon(),i.player.bar.set("volume",i.player.volume(),"width")):(i.player.video.muted=!0,i.player.template.volumeIcon.innerHTML=gt.volumeOff,i.player.bar.set("volume",0,"width"))})}},{key:"initQualityButton",value:function(){var i=this;this.player.options.video.quality&&this.player.template.qualityList.addEventListener("click",function(d){d.target.classList.contains("dplayer-quality-item")&&i.player.switchQuality(d.target.dataset.index)})}},{key:"initScreenshotButton",value:function(){var i=this;this.player.options.screenshot&&this.player.template.camareButton.addEventListener("click",function(){var d,u=document.createElement("canvas");u.width=i.player.video.videoWidth,u.height=i.player.video.videoHeight,u.getContext("2d").drawImage(i.player.video,0,0,u.width,u.height),u.toBlob(function(m){d=URL.createObjectURL(m);var v=document.createElement("a");v.href=d,v.download="DPlayer.png",v.style.display="none",document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(d),i.player.events.trigger("screenshot",d)})})}},{key:"initAirplayButton",value:function(){this.player.options.airplay&&(window.WebKitPlaybackTargetAvailabilityEvent?this.player.video.addEventListener("webkitplaybacktargetavailabilitychanged",(function(i){i.availability==="available"?this.template.airplayButton.disable=!1:this.template.airplayButton.disable=!0,this.template.airplayButton.addEventListener("click",(function(){this.video.webkitShowPlaybackTargetPicker()}).bind(this))}).bind(this.player)):this.player.template.airplayButton.style.display="none")}},{key:"initChromecast",value:function(){var i=window.document.createElement("script");i.setAttribute("type","text/javascript"),i.setAttribute("src","https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"),window.document.body.appendChild(i),window.__onGCastApiAvailable=function(d){if(d){var u=new(en=window.chrome.cast).SessionRequest(en.media.DEFAULT_MEDIA_RECEIVER_APP_ID),m=new en.ApiConfig(u,function(){},function(v){v===en.ReceiverAvailability.AVAILABLE&&console.log("chromecast: ",v)});en.initialize(m,function(){})}}}},{key:"initChromecastButton",value:function(){var i=this;if(this.player.options.chromecast){bl&&(bl=!1,this.initChromecast());var d=function(m,v){i.currentMedia=v},u=function(m){console.error("Error launching media",m)};this.player.template.chromecastButton.addEventListener("click",function(){vi?(vi=!1,i.currentMedia.stop(),i.session.stop(),i.initChromecast()):(vi=!0,en.requestSession(function(m){var v,E,T;i.session=m,v=i.player.options.video.url,E=new en.media.MediaInfo(v),T=new en.media.LoadRequest(E),i.session?i.session.loadMedia(T,d.bind(i,"loadMedia"),u).play():window.open(v)},function(m){m.code==="cancel"?i.session=void 0:console.error("Error selecting a cast device",m)}))})}}},{key:"initSubtitleButton",value:function(){var i=this;this.player.events.on("subtitle_show",function(){i.player.template.subtitleButton.dataset.balloon=i.player.tran("hide-subs"),i.player.template.subtitleButtonInner.style.opacity="",i.player.user.set("subtitle",1)}),this.player.events.on("subtitle_hide",function(){i.player.template.subtitleButton.dataset.balloon=i.player.tran("show-subs"),i.player.template.subtitleButtonInner.style.opacity="0.4",i.player.user.set("subtitle",0)}),this.player.template.subtitleButton.addEventListener("click",function(){i.player.subtitle.toggle()})}},{key:"setAutoHide",value:function(){var i=this;this.show(),clearTimeout(this.autoHideTimer),this.autoHideTimer=setTimeout(function(){!i.player.video.played.length||i.player.paused||i.disableAutoHide||i.hide()},3e3)}},{key:"show",value:function(){this.player.container.classList.remove("dplayer-hide-controller")}},{key:"hide",value:function(){this.player.container.classList.add("dplayer-hide-controller"),this.player.setting.hide(),this.player.comment&&this.player.comment.hide()}},{key:"isShow",value:function(){return!this.player.container.classList.contains("dplayer-hide-controller")}},{key:"toggle",value:function(){this.isShow()?this.hide():this.show()}},{key:"destroy",value:function(){te.isMobile||(this.player.container.removeEventListener("mousemove",this.setAutoHideHandler),this.player.container.removeEventListener("click",this.setAutoHideHandler)),clearTimeout(this.autoHideTimer)}}])&&zu(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const Nu=Du;function mr(l){return mr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},mr(l)}function Mu(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(mr(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(mr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),mr(d)==="symbol"?d:String(d)),i)}var d}var Fu=function(){function l(i){var d=this;(function(T,L){if(!(T instanceof L))throw new TypeError("Cannot call a class as a function")})(this,l),this.player=i,this.player.template.mask.addEventListener("click",function(){d.hide()}),this.player.template.settingButton.addEventListener("click",function(){d.show()}),this.loop=this.player.options.loop,this.player.template.loopToggle.checked=this.loop,this.player.template.loop.addEventListener("click",function(){d.player.template.loopToggle.checked=!d.player.template.loopToggle.checked,d.player.template.loopToggle.checked?d.loop=!0:d.loop=!1,d.hide()}),this.showDanmaku=this.player.user.get("danmaku"),this.showDanmaku||this.player.danmaku&&this.player.danmaku.hide(),this.player.template.showDanmakuToggle.checked=this.showDanmaku,this.player.template.showDanmaku.addEventListener("click",function(){d.player.template.showDanmakuToggle.checked=!d.player.template.showDanmakuToggle.checked,d.player.template.showDanmakuToggle.checked?(d.showDanmaku=!0,d.player.danmaku.show()):(d.showDanmaku=!1,d.player.danmaku.hide()),d.player.user.set("danmaku",d.showDanmaku?1:0),d.hide()}),this.unlimitDanmaku=this.player.user.get("unlimited"),this.player.template.unlimitDanmakuToggle.checked=this.unlimitDanmaku,this.player.template.unlimitDanmaku.addEventListener("click",function(){d.player.template.unlimitDanmakuToggle.checked=!d.player.template.unlimitDanmakuToggle.checked,d.player.template.unlimitDanmakuToggle.checked?(d.unlimitDanmaku=!0,d.player.danmaku.unlimit(!0)):(d.unlimitDanmaku=!1,d.player.danmaku.unlimit(!1)),d.player.user.set("unlimited",d.unlimitDanmaku?1:0),d.hide()}),this.player.template.speed.addEventListener("click",function(){d.player.template.settingBox.classList.add("dplayer-setting-box-narrow"),d.player.template.settingBox.classList.add("dplayer-setting-box-speed")});for(var u=function(T){d.player.template.speedItem[T].addEventListener("click",function(){d.player.speed(d.player.template.speedItem[T].dataset.speed),d.hide()})},m=0;m<this.player.template.speedItem.length;m++)u(m);if(this.player.danmaku){this.player.on("danmaku_opacity",function(T){d.player.bar.set("danmaku",T,"width"),d.player.user.set("opacity",T)}),this.player.danmaku.opacity(this.player.user.get("opacity"));var v=function(T){var L=T||window.event,H=((L.clientX||L.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(d.player.template.danmakuOpacityBarWrap))/130;H=Math.max(H,0),H=Math.min(H,1),d.player.danmaku.opacity(H)},E=function T(){document.removeEventListener(te.nameMap.dragEnd,T),document.removeEventListener(te.nameMap.dragMove,v),d.player.template.danmakuOpacityBox.classList.remove("dplayer-setting-danmaku-active")};this.player.template.danmakuOpacityBarWrapWrap.addEventListener("click",function(T){var L=T||window.event,H=((L.clientX||L.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(d.player.template.danmakuOpacityBarWrap))/130;H=Math.max(H,0),H=Math.min(H,1),d.player.danmaku.opacity(H)}),this.player.template.danmakuOpacityBarWrapWrap.addEventListener(te.nameMap.dragStart,function(){document.addEventListener(te.nameMap.dragMove,v),document.addEventListener(te.nameMap.dragEnd,E),d.player.template.danmakuOpacityBox.classList.add("dplayer-setting-danmaku-active")})}}var c,y;return c=l,(y=[{key:"hide",value:function(){var i=this;this.player.template.settingBox.classList.remove("dplayer-setting-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),setTimeout(function(){i.player.template.settingBox.classList.remove("dplayer-setting-box-narrow"),i.player.template.settingBox.classList.remove("dplayer-setting-box-speed")},300),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.settingBox.classList.add("dplayer-setting-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}}])&&Mu(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const qu=Fu;function br(l){return br=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},br(l)}function Uu(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(br(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(br(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),br(d)==="symbol"?d:String(d)),i)}var d}var Hu=function(){function l(i){var d=this;(function(u,m){if(!(u instanceof m))throw new TypeError("Cannot call a class as a function")})(this,l),this.player=i,this.player.template.mask.addEventListener("click",function(){d.hide()}),this.player.template.commentButton.addEventListener("click",function(){d.show()}),this.player.template.commentSettingButton.addEventListener("click",function(){d.toggleSetting()}),this.player.template.commentColorSettingBox.addEventListener("click",function(){if(d.player.template.commentColorSettingBox.querySelector("input:checked+span")){var u=d.player.template.commentColorSettingBox.querySelector("input:checked").value;d.player.template.commentSettingFill.style.fill=u,d.player.template.commentInput.style.color=u,d.player.template.commentSendFill.style.fill=u}}),this.player.template.commentInput.addEventListener("click",function(){d.hideSetting()}),this.player.template.commentInput.addEventListener("keydown",function(u){(u||window.event).keyCode===13&&d.send()}),this.player.template.commentSendButton.addEventListener("click",function(){d.send()})}var c,y;return c=l,(y=[{key:"show",value:function(){this.player.controller.disableAutoHide=!0,this.player.template.controller.classList.add("dplayer-controller-comment"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.container.classList.add("dplayer-show-controller"),this.player.template.commentInput.focus()}},{key:"hide",value:function(){this.player.template.controller.classList.remove("dplayer-controller-comment"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.container.classList.remove("dplayer-show-controller"),this.player.controller.disableAutoHide=!1,this.hideSetting()}},{key:"showSetting",value:function(){this.player.template.commentSettingBox.classList.add("dplayer-comment-setting-open")}},{key:"hideSetting",value:function(){this.player.template.commentSettingBox.classList.remove("dplayer-comment-setting-open")}},{key:"toggleSetting",value:function(){this.player.template.commentSettingBox.classList.contains("dplayer-comment-setting-open")?this.hideSetting():this.showSetting()}},{key:"send",value:function(){var i=this;this.player.template.commentInput.blur(),this.player.template.commentInput.value.replace(/^\s+|\s+$/g,"")?this.player.danmaku.send({text:this.player.template.commentInput.value,color:te.color2Number(this.player.container.querySelector(".dplayer-comment-setting-color input:checked").value),type:parseInt(this.player.container.querySelector(".dplayer-comment-setting-type input:checked").value)},function(){i.player.template.commentInput.value="",i.hide()}):this.player.notice(this.player.tran("please-input-danmaku"))}}])&&Uu(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const Wu=Hu;function gr(l){return gr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},gr(l)}function Yu(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(gr(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(gr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),gr(d)==="symbol"?d:String(d)),i)}var d}var $u=function(){function l(i){(function(d,u){if(!(d instanceof u))throw new TypeError("Cannot call a class as a function")})(this,l),this.player=i,this.doHotKeyHandler=this.doHotKey.bind(this),this.cancelFullScreenHandler=this.cancelFullScreen.bind(this),this.player.options.hotkey&&document.addEventListener("keydown",this.doHotKeyHandler),document.addEventListener("keydown",this.cancelFullScreenHandler)}var c,y;return c=l,(y=[{key:"doHotKey",value:function(i){if(this.player.focus){var d=document.activeElement.tagName.toUpperCase(),u=document.activeElement.getAttribute("contenteditable");if(d!=="INPUT"&&d!=="TEXTAREA"&&u!==""&&u!=="true"){var m,v=i||window.event;switch(v.keyCode){case 32:v.preventDefault(),this.player.toggle();break;case 37:if(v.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime-5),this.player.controller.setAutoHide();break;case 39:if(v.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime+5),this.player.controller.setAutoHide();break;case 38:v.preventDefault(),m=this.player.volume()+.1,this.player.volume(m);break;case 40:v.preventDefault(),m=this.player.volume()-.1,this.player.volume(m)}}}}},{key:"cancelFullScreen",value:function(i){(i||window.event).keyCode===27&&this.player.fullScreen.isFullScreen("web")&&this.player.fullScreen.cancel("web")}},{key:"destroy",value:function(){this.player.options.hotkey&&document.removeEventListener("keydown",this.doHotKeyHandler),document.removeEventListener("keydown",this.cancelFullScreenHandler)}}])&&Yu(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const Ku=$u;function vr(l){return vr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},vr(l)}function Vu(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(vr(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(vr(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),vr(d)==="symbol"?d:String(d)),i)}var d}var Qu=function(){function l(i){var d=this;(function(u,m){if(!(u instanceof m))throw new TypeError("Cannot call a class as a function")})(this,l),this.player=i,this.shown=!1,Array.prototype.slice.call(this.player.template.menuItem).forEach(function(u,m){d.player.options.contextmenu[m].click&&u.addEventListener("click",function(){d.player.options.contextmenu[m].click(d.player),d.hide()})}),this.contextmenuHandler=function(u){if(d.shown)d.hide();else{var m=u||window.event;m.preventDefault();var v=d.player.container.getBoundingClientRect();d.show(m.clientX-v.left,m.clientY-v.top),d.player.template.mask.addEventListener("click",function(){d.hide()})}},this.player.container.addEventListener("contextmenu",this.contextmenuHandler)}var c,y;return c=l,(y=[{key:"show",value:function(i,d){this.player.template.menu.classList.add("dplayer-menu-show");var u=this.player.container.getBoundingClientRect();i+this.player.template.menu.offsetWidth>=u.width?(this.player.template.menu.style.right=u.width-i+"px",this.player.template.menu.style.left="initial"):(this.player.template.menu.style.left=i+"px",this.player.template.menu.style.right="initial"),d+this.player.template.menu.offsetHeight>=u.height?(this.player.template.menu.style.bottom=u.height-d+"px",this.player.template.menu.style.top="initial"):(this.player.template.menu.style.top=d+"px",this.player.template.menu.style.bottom="initial"),this.player.template.mask.classList.add("dplayer-mask-show"),this.shown=!0,this.player.events.trigger("contextmenu_show")}},{key:"hide",value:function(){this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.template.menu.classList.remove("dplayer-menu-show"),this.shown=!1,this.player.events.trigger("contextmenu_hide")}},{key:"destroy",value:function(){this.player.container.removeEventListener("contextmenu",this.contextmenuHandler)}}])&&Vu(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const Xu=Qu;function Er(l){return Er=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},Er(l)}function Zu(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,(d=function(u,m){if(Er(u)!=="object"||u===null)return u;var v=u[Symbol.toPrimitive];if(v!==void 0){var E=v.call(u,"string");if(Er(E)!=="object")return E;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i.key),Er(d)==="symbol"?d:String(d)),i)}var d}var Ju=function(){function l(i){var d=this;(function(u,m){if(!(u instanceof m))throw new TypeError("Cannot call a class as a function")})(this,l),this.container=i.template.infoPanel,this.template=i.template,this.video=i.video,this.player=i,this.template.infoPanelClose.addEventListener("click",function(){d.hide()})}var c,y;return c=l,(y=[{key:"show",value:function(){this.beginTime=Date.now(),this.update(),this.player.timer.enable("info"),this.player.timer.enable("fps"),this.container.classList.remove("dplayer-info-panel-hide")}},{key:"hide",value:function(){this.player.timer.disable("info"),this.player.timer.disable("fps"),this.container.classList.add("dplayer-info-panel-hide")}},{key:"triggle",value:function(){this.container.classList.contains("dplayer-info-panel-hide")?this.show():this.hide()}},{key:"update",value:function(){this.template.infoVersion.innerHTML="v".concat("1.27.1"," ").concat("v1.27.0-12-g4f61091"),this.template.infoType.innerHTML=this.player.type,this.template.infoUrl.innerHTML=this.player.options.video.url,this.template.infoResolution.innerHTML="".concat(this.player.video.videoWidth," x ").concat(this.player.video.videoHeight),this.template.infoDuration.innerHTML=this.player.video.duration,this.player.options.danmaku&&(this.template.infoDanmakuId.innerHTML=this.player.options.danmaku.id,this.template.infoDanmakuApi.innerHTML=this.player.options.danmaku.api,this.template.infoDanmakuAmount.innerHTML=this.player.danmaku.dan.length)}},{key:"fps",value:function(i){this.template.infoFPS.innerHTML="".concat(i.toFixed(1))}}])&&Zu(c.prototype,y),Object.defineProperty(c,"prototype",{writable:!1}),l}();const Gu=Ju;var ef=o(568),tf=o.n(ef);function wr(l){return wr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(c){return typeof c}:function(c){return c&&typeof Symbol=="function"&&c.constructor===Symbol&&c!==Symbol.prototype?"symbol":typeof c},wr(l)}function gl(l,c){var y=Object.keys(l);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(l);c&&(i=i.filter(function(d){return Object.getOwnPropertyDescriptor(l,d).enumerable})),y.push.apply(y,i)}return y}function nf(l,c,y){return(c=El(c))in l?Object.defineProperty(l,c,{value:y,enumerable:!0,configurable:!0,writable:!0}):l[c]=y,l}function vl(l,c){for(var y=0;y<c.length;y++){var i=c[y];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(l,El(i.key),i)}}function El(l){var c=function(y,i){if(wr(y)!=="object"||y===null)return y;var d=y[Symbol.toPrimitive];if(d!==void 0){var u=d.call(y,"string");if(wr(u)!=="object")return u;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(y)}(l);return wr(c)==="symbol"?c:String(c)}var wl=0,Sn=[],rf=function(){function l(d){var u=this;(function(m,v){if(!(m instanceof v))throw new TypeError("Cannot call a class as a function")})(this,l),this.options=function(m){var v={container:m.element||document.getElementsByClassName("dplayer")[0],live:!1,autoplay:!1,theme:"#b7daff",loop:!1,lang:(navigator.language||navigator.browserLanguage).toLowerCase(),screenshot:!1,airplay:!0,chromecast:!1,hotkey:!0,preload:"metadata",volume:.7,playbackSpeed:[.5,.75,1,1.25,1.5,2],apiBackend:Ep,video:{},contextmenu:[],mutex:!0,pluginOptions:{hls:{},flv:{},dash:{},webtorrent:{}},preventClickToggle:!1};for(var E in v)v.hasOwnProperty(E)&&!m.hasOwnProperty(E)&&(m[E]=v[E]);return m.video&&!m.video.type&&(m.video.type="auto"),bi(m.danmaku)==="object"&&m.danmaku&&!m.danmaku.user&&(m.danmaku.user="DIYgod"),m.subtitle&&(!m.subtitle.type&&(m.subtitle.type="webvtt"),!m.subtitle.fontSize&&(m.subtitle.fontSize="20px"),!m.subtitle.bottom&&(m.subtitle.bottom="40px"),!m.subtitle.color&&(m.subtitle.color="#fff")),m.video.quality&&(m.video.url=m.video.quality[m.video.defaultQuality].url),m.lang&&(m.lang=m.lang.toLowerCase()),m.contextmenu=m.contextmenu.concat([{key:"video-info",click:function(T){T.infoPanel.triggle()}},{key:"about-author",link:"https://diygod.me"},{text:"DPlayer v".concat("1.27.1"),link:"https://github.com/MoePlayer/DPlayer"}]),m}(function(m){for(var v=1;v<arguments.length;v++){var E=arguments[v]!=null?arguments[v]:{};v%2?gl(Object(E),!0).forEach(function(T){nf(m,T,E[T])}):Object.getOwnPropertyDescriptors?Object.defineProperties(m,Object.getOwnPropertyDescriptors(E)):gl(Object(E)).forEach(function(T){Object.defineProperty(m,T,Object.getOwnPropertyDescriptor(E,T))})}return m}({preload:d.video.type==="webtorrent"?"none":"metadata"},d)),this.options.video.quality&&(this.qualityIndex=this.options.video.defaultQuality,this.quality=this.options.video.quality[this.options.video.defaultQuality]),this.tran=new wp(this.options.lang).tran,this.events=new uu,this.user=new bu(this),this.container=this.options.container,this.noticeList={},this.container.classList.add("dplayer"),this.options.danmaku||this.container.classList.add("dplayer-no-danmaku"),this.options.live?this.container.classList.add("dplayer-live"):this.container.classList.remove("dplayer-live"),te.isMobile&&this.container.classList.add("dplayer-mobile"),this.arrow=this.container.offsetWidth<=500,this.arrow&&this.container.classList.add("dplayer-arrow"),this.options.subtitle&&Array.isArray(this.options.subtitle.url)&&(this.options.subtitle.url.push({subtitle:"",lang:"off"}),this.options.subtitle.defaultSubtitle&&(typeof this.options.subtitle.defaultSubtitle=="string"?this.options.subtitle.index=this.options.subtitle.url.findIndex(function(m){return m.lang===u.options.subtitle.defaultSubtitle||m.name===u.options.subtitle.defaultSubtitle}):typeof this.options.subtitle.defaultSubtitle=="number"&&(this.options.subtitle.index=this.options.subtitle.defaultSubtitle)),(this.options.subtitle.index===-1||!this.options.subtitle.index||this.options.subtitle.index>this.options.subtitle.url.length-1)&&(this.options.subtitle.index=this.options.subtitle.url.findIndex(function(m){return m.lang===u.options.lang})),this.options.subtitle.index===-1&&(this.options.subtitle.index=this.options.subtitle.url.length-1)),this.template=new ml({container:this.container,options:this.options,index:wl,tran:this.tran}),this.video=this.template.video,this.bar=new Bu(this.template),this.bezel=new Lu(this.template.bezel),this.fullScreen=new yu(this),this.controller=new Nu(this),this.options.danmaku&&(this.danmaku=new du({player:this,container:this.template.danmaku,opacity:this.user.get("opacity"),callback:function(){setTimeout(function(){u.template.danmakuLoading.style.display="none",u.options.autoplay&&u.play()},0)},error:function(m){u.notice(m)},apiBackend:this.options.apiBackend,borderColor:this.options.theme,height:this.arrow?24:30,time:function(){return u.video.currentTime},unlimited:this.user.get("unlimited"),api:{id:this.options.danmaku.id,address:this.options.danmaku.api,token:this.options.danmaku.token,maximum:this.options.danmaku.maximum,addition:this.options.danmaku.addition,user:this.options.danmaku.user,speedRate:this.options.danmaku.speedRate},events:this.events,tran:function(m){return u.tran(m)}}),this.comment=new Wu(this)),this.setting=new qu(this),this.plugins={},this.docClickFun=function(){u.focus=!1},this.containerClickFun=function(){u.focus=!0},document.addEventListener("click",this.docClickFun,!0),this.container.addEventListener("click",this.containerClickFun,!0),this.paused=!0,this.timer=new _u(this),this.hotkey=new Ku(this),this.contextmenu=new Xu(this),this.initVideo(this.video,this.quality&&this.quality.type||this.options.video.type),this.infoPanel=new Gu(this),!this.danmaku&&this.options.autoplay&&this.play(),wl++,Sn.push(this)}var c,y,i;return c=l,y=[{key:"seek",value:function(d){d=Math.max(d,0),this.video.duration&&(d=Math.min(d,this.video.duration)),this.video.currentTime<d?this.notice("".concat(this.tran("ff").replace("%s",(d-this.video.currentTime).toFixed(0)))):this.video.currentTime>d&&this.notice("".concat(this.tran("rew").replace("%s",(this.video.currentTime-d).toFixed(0)))),this.video.currentTime=d,this.danmaku&&this.danmaku.seek(),this.bar.set("played",d/this.video.duration,"width"),this.template.ptime.innerHTML=te.secondToTime(d)}},{key:"play",value:function(d){var u=this;if(this.paused=!1,this.video.paused&&!te.isMobile&&this.bezel.switch(gt.play),this.template.playButton.innerHTML=gt.pause,this.template.mobilePlayButton.innerHTML=gt.pause,d||ke.resolve(this.video.play()).catch(function(){u.pause()}).then(function(){}),this.timer.enable("loading"),this.container.classList.remove("dplayer-paused"),this.container.classList.add("dplayer-playing"),this.danmaku&&this.danmaku.play(),this.options.mutex)for(var m=0;m<Sn.length;m++)this!==Sn[m]&&Sn[m].pause()}},{key:"pause",value:function(d){this.paused=!0,this.container.classList.remove("dplayer-loading"),this.video.paused||te.isMobile||this.bezel.switch(gt.pause),this.template.playButton.innerHTML=gt.play,this.template.mobilePlayButton.innerHTML=gt.play,d||this.video.pause(),this.timer.disable("loading"),this.container.classList.remove("dplayer-playing"),this.container.classList.add("dplayer-paused"),this.danmaku&&this.danmaku.pause()}},{key:"switchVolumeIcon",value:function(){this.volume()>=.95?this.template.volumeIcon.innerHTML=gt.volumeUp:this.volume()>0?this.template.volumeIcon.innerHTML=gt.volumeDown:this.template.volumeIcon.innerHTML=gt.volumeOff}},{key:"volume",value:function(d,u,m){if(d=parseFloat(d),!isNaN(d)){d=Math.max(d,0),d=Math.min(d,1),this.bar.set("volume",d,"width");var v="".concat((100*d).toFixed(0),"%");this.template.volumeBarWrapWrap.dataset.balloon=v,u||this.user.set("volume",d),m||this.notice("".concat(this.tran("volume")," ").concat((100*d).toFixed(0),"%"),void 0,void 0,"volume"),this.video.volume=d,this.video.muted&&(this.video.muted=!1),this.switchVolumeIcon()}return this.video.volume}},{key:"toggle",value:function(){this.video.paused?this.play():this.pause()}},{key:"on",value:function(d,u){this.events.on(d,u)}},{key:"switchVideo",value:function(d,u){this.pause(),this.video.poster=d.pic?d.pic:"",this.video.src=d.url,this.initMSE(this.video,d.type||"auto"),u&&(this.template.danmakuLoading.style.display="block",this.bar.set("played",0,"width"),this.bar.set("loaded",0,"width"),this.template.ptime.innerHTML="00:00",this.template.danmaku.innerHTML="",this.danmaku&&this.danmaku.reload({id:u.id,address:u.api,token:u.token,maximum:u.maximum,addition:u.addition,user:u.user}))}},{key:"initMSE",value:function(d,u){var m=this;if(this.type=u,this.options.video.customType&&this.options.video.customType[u])Object.prototype.toString.call(this.options.video.customType[u])==="[object Function]"?this.options.video.customType[u](this.video,this):console.error("Illegal customType: ".concat(u));else switch(this.type==="auto"&&(/m3u8(#|\?|$)/i.exec(d.src)?this.type="hls":/.flv(#|\?|$)/i.exec(d.src)?this.type="flv":/.mpd(#|\?|$)/i.exec(d.src)?this.type="dash":this.type="normal"),this.type==="hls"&&(d.canPlayType("application/x-mpegURL")||d.canPlayType("application/vnd.apple.mpegURL"))&&(this.type="normal"),this.type){case"hls":if(window.Hls)if(window.Hls.isSupported()){var v=this.options.pluginOptions.hls,E=new window.Hls(v);this.plugins.hls=E,E.loadSource(d.src),E.attachMedia(d),this.events.on("destroy",function(){E.destroy(),delete m.plugins.hls})}else this.notice("Error: Hls is not supported.");else this.notice("Error: Can't find Hls.");break;case"flv":if(window.flvjs)if(window.flvjs.isSupported()){var T=window.flvjs.createPlayer(Object.assign(this.options.pluginOptions.flv.mediaDataSource||{},{type:"flv",url:d.src}),this.options.pluginOptions.flv.config);this.plugins.flvjs=T,T.attachMediaElement(d),T.load(),this.events.on("destroy",function(){T.unload(),T.detachMediaElement(),T.destroy(),delete m.plugins.flvjs})}else this.notice("Error: flvjs is not supported.");else this.notice("Error: Can't find flvjs.");break;case"dash":if(window.dashjs){var L=window.dashjs.MediaPlayer().create().initialize(d,d.src,!1),H=this.options.pluginOptions.dash;L.updateSettings(H),this.plugins.dash=L,this.events.on("destroy",function(){window.dashjs.MediaPlayer().reset(),delete m.plugins.dash})}else this.notice("Error: Can't find dashjs.");break;case"webtorrent":if(window.WebTorrent)if(window.WebTorrent.WEBRTC_SUPPORT){this.container.classList.add("dplayer-loading");var K=this.options.pluginOptions.webtorrent,Z=new window.WebTorrent(K);this.plugins.webtorrent=Z;var V=d.src;d.src="",d.preload="metadata",d.addEventListener("durationchange",function(){return m.container.classList.remove("dplayer-loading")},{once:!0}),Z.add(V,function(Y){Y.files.find(function(ee){return ee.name.endsWith(".mp4")}).renderTo(m.video,{autoplay:m.options.autoplay,controls:!1})}),this.events.on("destroy",function(){Z.remove(V),Z.destroy(),delete m.plugins.webtorrent})}else this.notice("Error: Webtorrent is not supported.");else this.notice("Error: Can't find Webtorrent.")}}},{key:"initVideo",value:function(d,u){var m=this;this.initMSE(d,u),this.on("durationchange",function(){d.duration!==1&&d.duration!==1/0&&(m.template.dtime.innerHTML=te.secondToTime(d.duration))}),this.on("progress",function(){var T=d.buffered.length?d.buffered.end(d.buffered.length-1)/d.duration:0;m.bar.set("loaded",T,"width")}),this.on("error",function(){m.video.error&&m.tran&&m.notice&&m.type!=="webtorrent"&&m.notice(m.tran("video-failed"))}),this.on("ended",function(){m.bar.set("played",1,"width"),m.setting.loop?(m.seek(0),m.play()):m.pause(),m.danmaku&&(m.danmaku.danIndex=0)}),this.on("play",function(){m.paused&&m.play(!0)}),this.on("pause",function(){m.paused||m.pause(!0)}),this.on("timeupdate",function(){m.bar.set("played",m.video.currentTime/m.video.duration,"width");var T=te.secondToTime(m.video.currentTime);m.template.ptime.innerHTML!==T&&(m.template.ptime.innerHTML=T)});for(var v=function(T){d.addEventListener(m.events.videoEvents[T],function(L){m.events.trigger(m.events.videoEvents[T],L)})},E=0;E<this.events.videoEvents.length;E++)v(E);this.volume(this.user.get("volume"),!0,!0),this.options.subtitle&&(this.subtitle=new Eu(this.template.subtitle,this.video,this.options.subtitle,this.events),Array.isArray(this.options.subtitle.url)&&(this.subtitles=new ku(this)),this.user.get("subtitle")||this.subtitle.hide())}},{key:"switchQuality",value:function(d){var u=this;if(d=typeof d=="string"?parseInt(d):d,this.qualityIndex!==d&&!this.switchingQuality){this.prevIndex=this.qualityIndex,this.qualityIndex=d,this.switchingQuality=!0,this.quality=this.options.video.quality[d],this.template.qualityButton.innerHTML=this.quality.name;var m=this.video.paused;this.video.pause();var v=tf()({current:!1,pic:null,screenshot:this.options.screenshot,preload:"auto",url:this.quality.url,subtitle:this.options.subtitle}),E=new DOMParser().parseFromString(v,"text/html").body.firstChild;this.template.videoWrap.insertBefore(E,this.template.videoWrap.getElementsByTagName("div")[0]),this.prevVideo=this.video,this.video=E,this.initVideo(this.video,this.quality.type||this.options.video.type),this.seek(this.prevVideo.currentTime),this.notice("".concat(this.tran("switching-quality").replace("%q",this.quality.name)),-1,void 0,"switch-quality"),this.events.trigger("quality_start",this.quality),this.on("canplay",function(){if(u.prevVideo){if(u.video.currentTime!==u.prevVideo.currentTime)return void u.seek(u.prevVideo.currentTime);u.template.videoWrap.removeChild(u.prevVideo),u.video.classList.add("dplayer-video-current"),m||u.video.play(),u.prevVideo=null,u.notice("".concat(u.tran("switched-quality").replace("%q",u.quality.name)),void 0,void 0,"switch-quality"),u.switchingQuality=!1,u.events.trigger("quality_end")}}),this.on("error",function(){u.video.error&&u.prevVideo&&(u.template.videoWrap.removeChild(u.video),u.video=u.prevVideo,m||u.video.play(),u.qualityIndex=u.prevIndex,u.quality=u.options.video.quality[u.qualityIndex],u.noticeTime=setTimeout(function(){u.template.notice.style.opacity=0,u.events.trigger("notice_hide")},3e3),u.prevVideo=null,u.switchingQuality=!1)})}}},{key:"notice",value:function(d){var u,m,v,E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2e3,T=arguments.length>2&&arguments[2]!==void 0?arguments[2]:.8,L=arguments.length>3?arguments[3]:void 0;if(L&&((u=document.getElementById("dplayer-notice-".concat(L)))&&(u.innerHTML=d),this.noticeList[L]&&(clearTimeout(this.noticeList[L]),this.noticeList[L]=null)),!u){var H=ml.NewNotice(d,T,L);this.template.noticeList.appendChild(H),u=H}this.events.trigger("notice_show",u),E>0&&(this.noticeList[L]=setTimeout((m=u,v=this,function(){m.addEventListener("animationend",function(){v.template.noticeList.removeChild(m)}),m.classList.add("remove-notice"),v.events.trigger("notice_hide"),v.noticeList[L]=null}),E))}},{key:"resize",value:function(){this.danmaku&&this.danmaku.resize(),this.controller.thumbnails&&this.controller.thumbnails.resize(160,this.video.videoHeight/this.video.videoWidth*160,this.template.barWrap.offsetWidth),this.events.trigger("resize")}},{key:"speed",value:function(d){this.video.playbackRate=d}},{key:"destroy",value:function(){Sn.splice(Sn.indexOf(this),1),this.pause(),document.removeEventListener("click",this.docClickFun,!0),this.container.removeEventListener("click",this.containerClickFun,!0),this.fullScreen.destroy(),this.hotkey.destroy(),this.contextmenu.destroy(),this.controller.destroy(),this.timer.destroy(),this.video.src="",this.container.innerHTML="",this.events.trigger("destroy")}}],i=[{key:"version",get:function(){return"1.27.1"}}],y&&vl(c.prototype,y),i&&vl(c,i),Object.defineProperty(c,"prototype",{writable:!1}),l}();const of=rf;console.log(`
`.concat(" %c DPlayer v","1.27.1"," ").concat("v1.27.0-12-g4f61091"," %c https://dplayer.diygod.dev ",`
`,`
`),"color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;");const af=of})(),a.default})())})(rp);var S1=rp.exports;const B1=C1(S1),I1={id:"dplayer",style:{width:"100%",height:"100%"}},T1={__name:"VideoPlay",setup(e){const t=Ra(),n=$t(null);return Qr(()=>{let r=t.query.url;n.value=new B1({container:document.getElementById("dplayer"),video:{url:r}})}),Vc(()=>{n.value.destroy()}),(r,o)=>(Re(),it("div",I1))}},_1=["src"],O1={__name:"AudioPlay",setup(e){const t=Ra(),n=$t();return Qr(()=>{n.value=t.query.url}),(r,o)=>(Re(),it("div",null,[gn("audio",{src:n.value,controls:""},null,8,_1)]))}},L1=[{path:"/",component:x1},{path:"/VideoPlay",component:T1},{path:"/AudioPlay",component:O1}],R1=OA({history:Ky(),routes:L1}),op=ky(Iy);op.use(R1);op.mount("#app");
