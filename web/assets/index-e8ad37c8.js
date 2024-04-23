(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function Sa(e,t){const n=Object.create(null),o=e.split(",");for(let r=0;r<o.length;r++)n[o[r]]=!0;return t?r=>!!n[r.toLowerCase()]:r=>!!n[r]}const qe={},En=[],Et=()=>{},Lp=()=>!1,_p=/^on[^a-z]/,dr=e=>_p.test(e),La=e=>e.startsWith("onUpdate:"),Ke=Object.assign,_a=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Ip=Object.prototype.hasOwnProperty,xe=(e,t)=>Ip.call(e,t),se=Array.isArray,kn=e=>pr(e)==="[object Map]",Yl=e=>pr(e)==="[object Set]",ue=e=>typeof e=="function",Ve=e=>typeof e=="string",Ia=e=>typeof e=="symbol",De=e=>e!==null&&typeof e=="object",Kl=e=>De(e)&&ue(e.then)&&ue(e.catch),Vl=Object.prototype.toString,pr=e=>Vl.call(e),Tp=e=>pr(e).slice(8,-1),Ql=e=>pr(e)==="[object Object]",Ta=e=>Ve(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Ko=Sa(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ur=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},Op=/-(\w)/g,_t=ur(e=>e.replace(Op,(t,n)=>n?n.toUpperCase():"")),Rp=/\B([A-Z])/g,Tn=ur(e=>e.replace(Rp,"-$1").toLowerCase()),fr=ur(e=>e.charAt(0).toUpperCase()+e.slice(1)),Ur=ur(e=>e?`on${fr(e)}`:""),mo=(e,t)=>!Object.is(e,t),Yr=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},er=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},Pp=e=>{const t=parseFloat(e);return isNaN(t)?e:t},jp=e=>{const t=Ve(e)?Number(e):NaN;return isNaN(t)?e:t};let ji;const ia=()=>ji||(ji=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Bo(e){if(se(e)){const t={};for(let n=0;n<e.length;n++){const o=e[n],r=Ve(o)?Fp(o):Bo(o);if(r)for(const s in r)t[s]=r[s]}return t}else{if(Ve(e))return e;if(De(e))return e}}const zp=/;(?![^(]*\))/g,Mp=/:([^]+)/,Dp=/\/\*[^]*?\*\//g;function Fp(e){const t={};return e.replace(Dp,"").split(zp).forEach(n=>{if(n){const o=n.split(Mp);o.length>1&&(t[o[0].trim()]=o[1].trim())}}),t}function bo(e){let t="";if(Ve(e))t=e;else if(se(e))for(let n=0;n<e.length;n++){const o=bo(e[n]);o&&(t+=o+" ")}else if(De(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const qp="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Np=Sa(qp);function $l(e){return!!e||e===""}const sn=e=>Ve(e)?e:e==null?"":se(e)||De(e)&&(e.toString===Vl||!ue(e.toString))?JSON.stringify(e,Zl,2):String(e),Zl=(e,t)=>t&&t.__v_isRef?Zl(e,t.value):kn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[o,r])=>(n[`${o} =>`]=r,n),{})}:Yl(t)?{[`Set(${t.size})`]:[...t.values()]}:De(t)&&!se(t)&&!Ql(t)?String(t):t;let bt;class Hp{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=bt,!t&&bt&&(this.index=(bt.scopes||(bt.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=bt;try{return bt=this,t()}finally{bt=n}}}on(){bt=this}off(){bt=this.parent}stop(t){if(this._active){let n,o;for(n=0,o=this.effects.length;n<o;n++)this.effects[n].stop();for(n=0,o=this.cleanups.length;n<o;n++)this.cleanups[n]();if(this.scopes)for(n=0,o=this.scopes.length;n<o;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0,this._active=!1}}}function Wp(e,t=bt){t&&t.active&&t.effects.push(e)}function Up(){return bt}const Oa=e=>{const t=new Set(e);return t.w=0,t.n=0,t},Jl=e=>(e.w&Jt)>0,Xl=e=>(e.n&Jt)>0,Yp=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=Jt},Kp=e=>{const{deps:t}=e;if(t.length){let n=0;for(let o=0;o<t.length;o++){const r=t[o];Jl(r)&&!Xl(r)?r.delete(e):t[n++]=r,r.w&=~Jt,r.n&=~Jt}t.length=n}},la=new WeakMap;let so=0,Jt=1;const sa=30;let gt;const cn=Symbol(""),ca=Symbol("");class Ra{constructor(t,n=null,o){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,Wp(this,o)}run(){if(!this.active)return this.fn();let t=gt,n=$t;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=gt,gt=this,$t=!0,Jt=1<<++so,so<=sa?Yp(this):zi(this),this.fn()}finally{so<=sa&&Kp(this),Jt=1<<--so,gt=this.parent,$t=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){gt===this?this.deferStop=!0:this.active&&(zi(this),this.onStop&&this.onStop(),this.active=!1)}}function zi(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let $t=!0;const Gl=[];function On(){Gl.push($t),$t=!1}function Rn(){const e=Gl.pop();$t=e===void 0?!0:e}function st(e,t,n){if($t&&gt){let o=la.get(e);o||la.set(e,o=new Map);let r=o.get(n);r||o.set(n,r=Oa()),es(r)}}function es(e,t){let n=!1;so<=sa?Xl(e)||(e.n|=Jt,n=!Jl(e)):n=!e.has(gt),n&&(e.add(gt),gt.deps.push(e))}function zt(e,t,n,o,r,s){const d=la.get(e);if(!d)return;let f=[];if(t==="clear")f=[...d.values()];else if(n==="length"&&se(e)){const A=Number(o);d.forEach((m,b)=>{(b==="length"||b>=A)&&f.push(m)})}else switch(n!==void 0&&f.push(d.get(n)),t){case"add":se(e)?Ta(n)&&f.push(d.get("length")):(f.push(d.get(cn)),kn(e)&&f.push(d.get(ca)));break;case"delete":se(e)||(f.push(d.get(cn)),kn(e)&&f.push(d.get(ca)));break;case"set":kn(e)&&f.push(d.get(cn));break}if(f.length===1)f[0]&&da(f[0]);else{const A=[];for(const m of f)m&&A.push(...m);da(Oa(A))}}function da(e,t){const n=se(e)?e:[...e];for(const o of n)o.computed&&Mi(o);for(const o of n)o.computed||Mi(o)}function Mi(e,t){(e!==gt||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const Vp=Sa("__proto__,__v_isRef,__isVue"),ts=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Ia)),Qp=Pa(),$p=Pa(!1,!0),Zp=Pa(!0),Di=Jp();function Jp(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const o=Ce(this);for(let s=0,d=this.length;s<d;s++)st(o,"get",s+"");const r=o[t](...n);return r===-1||r===!1?o[t](...n.map(Ce)):r}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){On();const o=Ce(this)[t].apply(this,n);return Rn(),o}}),e}function Xp(e){const t=Ce(this);return st(t,"has",e),t.hasOwnProperty(e)}function Pa(e=!1,t=!1){return function(o,r,s){if(r==="__v_isReactive")return!e;if(r==="__v_isReadonly")return e;if(r==="__v_isShallow")return t;if(r==="__v_raw"&&s===(e?t?hu:is:t?as:rs).get(o))return o;const d=se(o);if(!e){if(d&&xe(Di,r))return Reflect.get(Di,r,s);if(r==="hasOwnProperty")return Xp}const f=Reflect.get(o,r,s);return(Ia(r)?ts.has(r):Vp(r))||(e||st(o,"get",r),t)?f:tt(f)?d&&Ta(r)?f:f.value:De(f)?e?ss(f):Ar(f):f}}const Gp=ns(),eu=ns(!0);function ns(e=!1){return function(n,o,r,s){let d=n[o];if(Bn(d)&&tt(d)&&!tt(r))return!1;if(!e&&(!tr(r)&&!Bn(r)&&(d=Ce(d),r=Ce(r)),!se(n)&&tt(d)&&!tt(r)))return d.value=r,!0;const f=se(n)&&Ta(o)?Number(o)<n.length:xe(n,o),A=Reflect.set(n,o,r,s);return n===Ce(s)&&(f?mo(r,d)&&zt(n,"set",o,r):zt(n,"add",o,r)),A}}function tu(e,t){const n=xe(e,t);e[t];const o=Reflect.deleteProperty(e,t);return o&&n&&zt(e,"delete",t,void 0),o}function nu(e,t){const n=Reflect.has(e,t);return(!Ia(t)||!ts.has(t))&&st(e,"has",t),n}function ou(e){return st(e,"iterate",se(e)?"length":cn),Reflect.ownKeys(e)}const os={get:Qp,set:Gp,deleteProperty:tu,has:nu,ownKeys:ou},ru={get:Zp,set(e,t){return!0},deleteProperty(e,t){return!0}},au=Ke({},os,{get:$p,set:eu}),ja=e=>e,hr=e=>Reflect.getPrototypeOf(e);function Fo(e,t,n=!1,o=!1){e=e.__v_raw;const r=Ce(e),s=Ce(t);n||(t!==s&&st(r,"get",t),st(r,"get",s));const{has:d}=hr(r),f=o?ja:n?Da:go;if(d.call(r,t))return f(e.get(t));if(d.call(r,s))return f(e.get(s));e!==r&&e.get(t)}function qo(e,t=!1){const n=this.__v_raw,o=Ce(n),r=Ce(e);return t||(e!==r&&st(o,"has",e),st(o,"has",r)),e===r?n.has(e):n.has(e)||n.has(r)}function No(e,t=!1){return e=e.__v_raw,!t&&st(Ce(e),"iterate",cn),Reflect.get(e,"size",e)}function Fi(e){e=Ce(e);const t=Ce(this);return hr(t).has.call(t,e)||(t.add(e),zt(t,"add",e,e)),this}function qi(e,t){t=Ce(t);const n=Ce(this),{has:o,get:r}=hr(n);let s=o.call(n,e);s||(e=Ce(e),s=o.call(n,e));const d=r.call(n,e);return n.set(e,t),s?mo(t,d)&&zt(n,"set",e,t):zt(n,"add",e,t),this}function Ni(e){const t=Ce(this),{has:n,get:o}=hr(t);let r=n.call(t,e);r||(e=Ce(e),r=n.call(t,e)),o&&o.call(t,e);const s=t.delete(e);return r&&zt(t,"delete",e,void 0),s}function Hi(){const e=Ce(this),t=e.size!==0,n=e.clear();return t&&zt(e,"clear",void 0,void 0),n}function Ho(e,t){return function(o,r){const s=this,d=s.__v_raw,f=Ce(d),A=t?ja:e?Da:go;return!e&&st(f,"iterate",cn),d.forEach((m,b)=>o.call(r,A(m),A(b),s))}}function Wo(e,t,n){return function(...o){const r=this.__v_raw,s=Ce(r),d=kn(s),f=e==="entries"||e===Symbol.iterator&&d,A=e==="keys"&&d,m=r[e](...o),b=n?ja:t?Da:go;return!t&&st(s,"iterate",A?ca:cn),{next(){const{value:g,done:h}=m.next();return h?{value:g,done:h}:{value:f?[b(g[0]),b(g[1])]:b(g),done:h}},[Symbol.iterator](){return this}}}}function Ht(e){return function(...t){return e==="delete"?!1:this}}function iu(){const e={get(s){return Fo(this,s)},get size(){return No(this)},has:qo,add:Fi,set:qi,delete:Ni,clear:Hi,forEach:Ho(!1,!1)},t={get(s){return Fo(this,s,!1,!0)},get size(){return No(this)},has:qo,add:Fi,set:qi,delete:Ni,clear:Hi,forEach:Ho(!1,!0)},n={get(s){return Fo(this,s,!0)},get size(){return No(this,!0)},has(s){return qo.call(this,s,!0)},add:Ht("add"),set:Ht("set"),delete:Ht("delete"),clear:Ht("clear"),forEach:Ho(!0,!1)},o={get(s){return Fo(this,s,!0,!0)},get size(){return No(this,!0)},has(s){return qo.call(this,s,!0)},add:Ht("add"),set:Ht("set"),delete:Ht("delete"),clear:Ht("clear"),forEach:Ho(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=Wo(s,!1,!1),n[s]=Wo(s,!0,!1),t[s]=Wo(s,!1,!0),o[s]=Wo(s,!0,!0)}),[e,n,t,o]}const[lu,su,cu,du]=iu();function za(e,t){const n=t?e?du:cu:e?su:lu;return(o,r,s)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_raw"?o:Reflect.get(xe(n,r)&&r in o?n:o,r,s)}const pu={get:za(!1,!1)},uu={get:za(!1,!0)},fu={get:za(!0,!1)},rs=new WeakMap,as=new WeakMap,is=new WeakMap,hu=new WeakMap;function Au(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function yu(e){return e.__v_skip||!Object.isExtensible(e)?0:Au(Tp(e))}function Ar(e){return Bn(e)?e:Ma(e,!1,os,pu,rs)}function ls(e){return Ma(e,!1,au,uu,as)}function ss(e){return Ma(e,!0,ru,fu,is)}function Ma(e,t,n,o,r){if(!De(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const s=r.get(e);if(s)return s;const d=yu(e);if(d===0)return e;const f=new Proxy(e,d===2?o:n);return r.set(e,f),f}function wn(e){return Bn(e)?wn(e.__v_raw):!!(e&&e.__v_isReactive)}function Bn(e){return!!(e&&e.__v_isReadonly)}function tr(e){return!!(e&&e.__v_isShallow)}function cs(e){return wn(e)||Bn(e)}function Ce(e){const t=e&&e.__v_raw;return t?Ce(t):e}function ds(e){return er(e,"__v_skip",!0),e}const go=e=>De(e)?Ar(e):e,Da=e=>De(e)?ss(e):e;function ps(e){$t&&gt&&(e=Ce(e),es(e.dep||(e.dep=Oa())))}function us(e,t){e=Ce(e);const n=e.dep;n&&da(n)}function tt(e){return!!(e&&e.__v_isRef===!0)}function Ye(e){return fs(e,!1)}function mu(e){return fs(e,!0)}function fs(e,t){return tt(e)?e:new bu(e,t)}class bu{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:Ce(t),this._value=n?t:go(t)}get value(){return ps(this),this._value}set value(t){const n=this.__v_isShallow||tr(t)||Bn(t);t=n?t:Ce(t),mo(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:go(t),us(this))}}function Ie(e){return tt(e)?e.value:e}const gu={get:(e,t,n)=>Ie(Reflect.get(e,t,n)),set:(e,t,n,o)=>{const r=e[t];return tt(r)&&!tt(n)?(r.value=n,!0):Reflect.set(e,t,n,o)}};function hs(e){return wn(e)?e:new Proxy(e,gu)}class vu{constructor(t,n,o,r){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new Ra(t,()=>{this._dirty||(this._dirty=!0,us(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!r,this.__v_isReadonly=o}get value(){const t=Ce(this);return ps(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}function xu(e,t,n=!1){let o,r;const s=ue(e);return s?(o=e,r=Et):(o=e.get,r=e.set),new vu(o,r,s||!r,n)}function Zt(e,t,n,o){let r;try{r=o?e(...o):e()}catch(s){yr(s,t,n)}return r}function ft(e,t,n,o){if(ue(e)){const s=Zt(e,t,n,o);return s&&Kl(s)&&s.catch(d=>{yr(d,t,n)}),s}const r=[];for(let s=0;s<e.length;s++)r.push(ft(e[s],t,n,o));return r}function yr(e,t,n,o=!0){const r=t?t.vnode:null;if(t){let s=t.parent;const d=t.proxy,f=n;for(;s;){const m=s.ec;if(m){for(let b=0;b<m.length;b++)if(m[b](e,d,f)===!1)return}s=s.parent}const A=t.appContext.config.errorHandler;if(A){Zt(A,null,10,[e,d,f]);return}}Eu(e,n,r,o)}function Eu(e,t,n,o=!0){console.error(e)}let vo=!1,pa=!1;const et=[];let St=0;const Cn=[];let Pt=null,rn=0;const As=Promise.resolve();let Fa=null;function nr(e){const t=Fa||As;return e?t.then(this?e.bind(this):e):t}function ku(e){let t=St+1,n=et.length;for(;t<n;){const o=t+n>>>1;xo(et[o])<e?t=o+1:n=o}return t}function qa(e){(!et.length||!et.includes(e,vo&&e.allowRecurse?St+1:St))&&(e.id==null?et.push(e):et.splice(ku(e.id),0,e),ys())}function ys(){!vo&&!pa&&(pa=!0,Fa=As.then(bs))}function wu(e){const t=et.indexOf(e);t>St&&et.splice(t,1)}function Cu(e){se(e)?Cn.push(...e):(!Pt||!Pt.includes(e,e.allowRecurse?rn+1:rn))&&Cn.push(e),ys()}function Wi(e,t=vo?St+1:0){for(;t<et.length;t++){const n=et[t];n&&n.pre&&(et.splice(t,1),t--,n())}}function ms(e){if(Cn.length){const t=[...new Set(Cn)];if(Cn.length=0,Pt){Pt.push(...t);return}for(Pt=t,Pt.sort((n,o)=>xo(n)-xo(o)),rn=0;rn<Pt.length;rn++)Pt[rn]();Pt=null,rn=0}}const xo=e=>e.id==null?1/0:e.id,Bu=(e,t)=>{const n=xo(e)-xo(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function bs(e){pa=!1,vo=!0,et.sort(Bu);const t=Et;try{for(St=0;St<et.length;St++){const n=et[St];n&&n.active!==!1&&Zt(n,null,14)}}finally{St=0,et.length=0,ms(),vo=!1,Fa=null,(et.length||Cn.length)&&bs()}}function Su(e,t,...n){if(e.isUnmounted)return;const o=e.vnode.props||qe;let r=n;const s=t.startsWith("update:"),d=s&&t.slice(7);if(d&&d in o){const b=`${d==="modelValue"?"model":d}Modifiers`,{number:g,trim:h}=o[b]||qe;h&&(r=n.map(C=>Ve(C)?C.trim():C)),g&&(r=n.map(Pp))}let f,A=o[f=Ur(t)]||o[f=Ur(_t(t))];!A&&s&&(A=o[f=Ur(Tn(t))]),A&&ft(A,e,6,r);const m=o[f+"Once"];if(m){if(!e.emitted)e.emitted={};else if(e.emitted[f])return;e.emitted[f]=!0,ft(m,e,6,r)}}function gs(e,t,n=!1){const o=t.emitsCache,r=o.get(e);if(r!==void 0)return r;const s=e.emits;let d={},f=!1;if(!ue(e)){const A=m=>{const b=gs(m,t,!0);b&&(f=!0,Ke(d,b))};!n&&t.mixins.length&&t.mixins.forEach(A),e.extends&&A(e.extends),e.mixins&&e.mixins.forEach(A)}return!s&&!f?(De(e)&&o.set(e,null),null):(se(s)?s.forEach(A=>d[A]=null):Ke(d,s),De(e)&&o.set(e,d),d)}function mr(e,t){return!e||!dr(t)?!1:(t=t.slice(2).replace(/Once$/,""),xe(e,t[0].toLowerCase()+t.slice(1))||xe(e,Tn(t))||xe(e,t))}let nt=null,br=null;function or(e){const t=nt;return nt=e,br=e&&e.type.__scopeId||null,t}function Lu(e){br=e}function _u(){br=null}function co(e,t=nt,n){if(!t||e._n)return e;const o=(...r)=>{o._d&&tl(-1);const s=or(t);let d;try{d=e(...r)}finally{or(s),o._d&&tl(1)}return d};return o._n=!0,o._c=!0,o._d=!0,o}function Kr(e){const{type:t,vnode:n,proxy:o,withProxy:r,props:s,propsOptions:[d],slots:f,attrs:A,emit:m,render:b,renderCache:g,data:h,setupState:C,ctx:B,inheritAttrs:w}=e;let I,_;const O=or(e);try{if(n.shapeFlag&4){const D=r||o;I=Bt(b.call(D,D,g,s,C,h,B)),_=A}else{const D=t;I=Bt(D.length>1?D(s,{attrs:A,slots:f,emit:m}):D(s,null)),_=t.props?A:Iu(A)}}catch(D){ho.length=0,yr(D,e,1),I=q(At)}let U=I;if(_&&w!==!1){const D=Object.keys(_),{shapeFlag:fe}=U;D.length&&fe&7&&(d&&D.some(La)&&(_=Tu(_,d)),U=Xt(U,_))}return n.dirs&&(U=Xt(U),U.dirs=U.dirs?U.dirs.concat(n.dirs):n.dirs),n.transition&&(U.transition=n.transition),I=U,or(O),I}const Iu=e=>{let t;for(const n in e)(n==="class"||n==="style"||dr(n))&&((t||(t={}))[n]=e[n]);return t},Tu=(e,t)=>{const n={};for(const o in e)(!La(o)||!(o.slice(9)in t))&&(n[o]=e[o]);return n};function Ou(e,t,n){const{props:o,children:r,component:s}=e,{props:d,children:f,patchFlag:A}=t,m=s.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&A>=0){if(A&1024)return!0;if(A&16)return o?Ui(o,d,m):!!d;if(A&8){const b=t.dynamicProps;for(let g=0;g<b.length;g++){const h=b[g];if(d[h]!==o[h]&&!mr(m,h))return!0}}}else return(r||f)&&(!f||!f.$stable)?!0:o===d?!1:o?d?Ui(o,d,m):!0:!!d;return!1}function Ui(e,t,n){const o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let r=0;r<o.length;r++){const s=o[r];if(t[s]!==e[s]&&!mr(n,s))return!0}return!1}function Ru({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent}const Pu=e=>e.__isSuspense;function ju(e,t){t&&t.pendingBranch?se(e)?t.effects.push(...e):t.effects.push(e):Cu(e)}const Uo={};function dn(e,t,n){return vs(e,t,n)}function vs(e,t,{immediate:n,deep:o,flush:r,onTrack:s,onTrigger:d}=qe){var f;const A=Up()===((f=Je)==null?void 0:f.scope)?Je:null;let m,b=!1,g=!1;if(tt(e)?(m=()=>e.value,b=tr(e)):wn(e)?(m=()=>e,o=!0):se(e)?(g=!0,b=e.some(D=>wn(D)||tr(D)),m=()=>e.map(D=>{if(tt(D))return D.value;if(wn(D))return xn(D);if(ue(D))return Zt(D,A,2)})):ue(e)?t?m=()=>Zt(e,A,2):m=()=>{if(!(A&&A.isUnmounted))return h&&h(),ft(e,A,3,[C])}:m=Et,t&&o){const D=m;m=()=>xn(D())}let h,C=D=>{h=O.onStop=()=>{Zt(D,A,4)}},B;if(ko)if(C=Et,t?n&&ft(t,A,3,[m(),g?[]:void 0,C]):m(),r==="sync"){const D=Pf();B=D.__watcherHandles||(D.__watcherHandles=[])}else return Et;let w=g?new Array(e.length).fill(Uo):Uo;const I=()=>{if(O.active)if(t){const D=O.run();(o||b||(g?D.some((fe,Be)=>mo(fe,w[Be])):mo(D,w)))&&(h&&h(),ft(t,A,3,[D,w===Uo?void 0:g&&w[0]===Uo?[]:w,C]),w=D)}else O.run()};I.allowRecurse=!!t;let _;r==="sync"?_=I:r==="post"?_=()=>lt(I,A&&A.suspense):(I.pre=!0,A&&(I.id=A.uid),_=()=>qa(I));const O=new Ra(m,_);t?n?I():w=O.run():r==="post"?lt(O.run.bind(O),A&&A.suspense):O.run();const U=()=>{O.stop(),A&&A.scope&&_a(A.scope.effects,O)};return B&&B.push(U),U}function zu(e,t,n){const o=this.proxy,r=Ve(e)?e.includes(".")?xs(o,e):()=>o[e]:e.bind(o,o);let s;ue(t)?s=t:(s=t.handler,n=t);const d=Je;Sn(this);const f=vs(r,s.bind(o),n);return d?Sn(d):un(),f}function xs(e,t){const n=t.split(".");return()=>{let o=e;for(let r=0;r<n.length&&o;r++)o=o[n[r]];return o}}function xn(e,t){if(!De(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),tt(e))xn(e.value,t);else if(se(e))for(let n=0;n<e.length;n++)xn(e[n],t);else if(Yl(e)||kn(e))e.forEach(n=>{xn(n,t)});else if(Ql(e))for(const n in e)xn(e[n],t);return e}function en(e,t,n,o){const r=e.dirs,s=t&&t.dirs;for(let d=0;d<r.length;d++){const f=r[d];s&&(f.oldValue=s[d].value);let A=f.dir[o];A&&(On(),ft(A,n,8,[e.el,f,e,t]),Rn())}}function Mu(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return fn(()=>{e.isMounted=!0}),Na(()=>{e.isUnmounting=!0}),e}const ut=[Function,Array],Es={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:ut,onEnter:ut,onAfterEnter:ut,onEnterCancelled:ut,onBeforeLeave:ut,onLeave:ut,onAfterLeave:ut,onLeaveCancelled:ut,onBeforeAppear:ut,onAppear:ut,onAfterAppear:ut,onAppearCancelled:ut},Du={name:"BaseTransition",props:Es,setup(e,{slots:t}){const n=Bf(),o=Mu();let r;return()=>{const s=t.default&&ws(t.default(),!0);if(!s||!s.length)return;let d=s[0];if(s.length>1){for(const w of s)if(w.type!==At){d=w;break}}const f=Ce(e),{mode:A}=f;if(o.isLeaving)return Vr(d);const m=Yi(d);if(!m)return Vr(d);const b=ua(m,f,o,n);fa(m,b);const g=n.subTree,h=g&&Yi(g);let C=!1;const{getTransitionKey:B}=m.type;if(B){const w=B();r===void 0?r=w:w!==r&&(r=w,C=!0)}if(h&&h.type!==At&&(!an(m,h)||C)){const w=ua(h,f,o,n);if(fa(h,w),A==="out-in")return o.isLeaving=!0,w.afterLeave=()=>{o.isLeaving=!1,n.update.active!==!1&&n.update()},Vr(d);A==="in-out"&&m.type!==At&&(w.delayLeave=(I,_,O)=>{const U=ks(o,h);U[String(h.key)]=h,I._leaveCb=()=>{_(),I._leaveCb=void 0,delete b.delayedLeave},b.delayedLeave=O})}return d}}},Fu=Du;function ks(e,t){const{leavingVNodes:n}=e;let o=n.get(t.type);return o||(o=Object.create(null),n.set(t.type,o)),o}function ua(e,t,n,o){const{appear:r,mode:s,persisted:d=!1,onBeforeEnter:f,onEnter:A,onAfterEnter:m,onEnterCancelled:b,onBeforeLeave:g,onLeave:h,onAfterLeave:C,onLeaveCancelled:B,onBeforeAppear:w,onAppear:I,onAfterAppear:_,onAppearCancelled:O}=t,U=String(e.key),D=ks(n,e),fe=(pe,Le)=>{pe&&ft(pe,o,9,Le)},Be=(pe,Le)=>{const ie=Le[1];fe(pe,Le),se(pe)?pe.every(Me=>Me.length<=1)&&ie():pe.length<=1&&ie()},Ue={mode:s,persisted:d,beforeEnter(pe){let Le=f;if(!n.isMounted)if(r)Le=w||f;else return;pe._leaveCb&&pe._leaveCb(!0);const ie=D[U];ie&&an(e,ie)&&ie.el._leaveCb&&ie.el._leaveCb(),fe(Le,[pe])},enter(pe){let Le=A,ie=m,Me=b;if(!n.isMounted)if(r)Le=I||A,ie=_||m,Me=O||b;else return;let ee=!1;const ye=pe._enterCb=Fe=>{ee||(ee=!0,Fe?fe(Me,[pe]):fe(ie,[pe]),Ue.delayedLeave&&Ue.delayedLeave(),pe._enterCb=void 0)};Le?Be(Le,[pe,ye]):ye()},leave(pe,Le){const ie=String(e.key);if(pe._enterCb&&pe._enterCb(!0),n.isUnmounting)return Le();fe(g,[pe]);let Me=!1;const ee=pe._leaveCb=ye=>{Me||(Me=!0,Le(),ye?fe(B,[pe]):fe(C,[pe]),pe._leaveCb=void 0,D[ie]===e&&delete D[ie])};D[ie]=e,h?Be(h,[pe,ee]):ee()},clone(pe){return ua(pe,t,n,o)}};return Ue}function Vr(e){if(gr(e))return e=Xt(e),e.children=null,e}function Yi(e){return gr(e)?e.children?e.children[0]:void 0:e}function fa(e,t){e.shapeFlag&6&&e.component?fa(e.component.subTree,t):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function ws(e,t=!1,n){let o=[],r=0;for(let s=0;s<e.length;s++){let d=e[s];const f=n==null?d.key:String(n)+String(d.key!=null?d.key:s);d.type===Xe?(d.patchFlag&128&&r++,o=o.concat(ws(d.children,t,f))):(t||d.type!==At)&&o.push(f!=null?Xt(d,{key:f}):d)}if(r>1)for(let s=0;s<o.length;s++)o[s].patchFlag=-2;return o}function Cs(e,t){return ue(e)?(()=>Ke({name:e.name},t,{setup:e}))():e}const uo=e=>!!e.type.__asyncLoader,gr=e=>e.type.__isKeepAlive;function qu(e,t){Bs(e,"a",t)}function Nu(e,t){Bs(e,"da",t)}function Bs(e,t,n=Je){const o=e.__wdc||(e.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return e()});if(vr(t,o,n),n){let r=n.parent;for(;r&&r.parent;)gr(r.parent.vnode)&&Hu(o,t,n,r),r=r.parent}}function Hu(e,t,n,o){const r=vr(t,e,o,!0);Ha(()=>{_a(o[t],r)},n)}function vr(e,t,n=Je,o=!1){if(n){const r=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...d)=>{if(n.isUnmounted)return;On(),Sn(n);const f=ft(t,n,e,d);return un(),Rn(),f});return o?r.unshift(s):r.push(s),s}}const Mt=e=>(t,n=Je)=>(!ko||e==="sp")&&vr(e,(...o)=>t(...o),n),Wu=Mt("bm"),fn=Mt("m"),Uu=Mt("bu"),Yu=Mt("u"),Na=Mt("bum"),Ha=Mt("um"),Ku=Mt("sp"),Vu=Mt("rtg"),Qu=Mt("rtc");function $u(e,t=Je){vr("ec",e,t)}const Ss="components";function Zu(e,t){return Xu(Ss,e,!0,t)||e}const Ju=Symbol.for("v-ndc");function Xu(e,t,n=!0,o=!1){const r=nt||Je;if(r){const s=r.type;if(e===Ss){const f=Tf(s,!1);if(f&&(f===t||f===_t(t)||f===fr(_t(t))))return s}const d=Ki(r[e]||s[e],t)||Ki(r.appContext[e],t);return!d&&o?s:d}}function Ki(e,t){return e&&(e[t]||e[_t(t)]||e[fr(_t(t))])}function Vo(e,t,n,o){let r;const s=n&&n[o];if(se(e)||Ve(e)){r=new Array(e.length);for(let d=0,f=e.length;d<f;d++)r[d]=t(e[d],d,void 0,s&&s[d])}else if(typeof e=="number"){r=new Array(e);for(let d=0;d<e;d++)r[d]=t(d+1,d,void 0,s&&s[d])}else if(De(e))if(e[Symbol.iterator])r=Array.from(e,(d,f)=>t(d,f,void 0,s&&s[f]));else{const d=Object.keys(e);r=new Array(d.length);for(let f=0,A=d.length;f<A;f++){const m=d[f];r[f]=t(e[m],m,f,s&&s[f])}}else r=[];return n&&(n[o]=r),r}function Gu(e,t,n={},o,r){if(nt.isCE||nt.parent&&uo(nt.parent)&&nt.parent.isCE)return t!=="default"&&(n.name=t),q("slot",n,o&&o());let s=e[t];s&&s._c&&(s._d=!1),le();const d=s&&Ls(s(n)),f=ze(Xe,{key:n.key||d&&d.key||`_${t}`},d||(o?o():[]),d&&e._===1?64:-2);return!r&&f.scopeId&&(f.slotScopeIds=[f.scopeId+"-s"]),s&&s._c&&(s._d=!0),f}function Ls(e){return e.some(t=>ir(t)?!(t.type===At||t.type===Xe&&!Ls(t.children)):!0)?e:null}const ha=e=>e?Fs(e)?Va(e)||e.proxy:ha(e.parent):null,fo=Ke(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>ha(e.parent),$root:e=>ha(e.root),$emit:e=>e.emit,$options:e=>Wa(e),$forceUpdate:e=>e.f||(e.f=()=>qa(e.update)),$nextTick:e=>e.n||(e.n=nr.bind(e.proxy)),$watch:e=>zu.bind(e)}),Qr=(e,t)=>e!==qe&&!e.__isScriptSetup&&xe(e,t),ef={get({_:e},t){const{ctx:n,setupState:o,data:r,props:s,accessCache:d,type:f,appContext:A}=e;let m;if(t[0]!=="$"){const C=d[t];if(C!==void 0)switch(C){case 1:return o[t];case 2:return r[t];case 4:return n[t];case 3:return s[t]}else{if(Qr(o,t))return d[t]=1,o[t];if(r!==qe&&xe(r,t))return d[t]=2,r[t];if((m=e.propsOptions[0])&&xe(m,t))return d[t]=3,s[t];if(n!==qe&&xe(n,t))return d[t]=4,n[t];Aa&&(d[t]=0)}}const b=fo[t];let g,h;if(b)return t==="$attrs"&&st(e,"get",t),b(e);if((g=f.__cssModules)&&(g=g[t]))return g;if(n!==qe&&xe(n,t))return d[t]=4,n[t];if(h=A.config.globalProperties,xe(h,t))return h[t]},set({_:e},t,n){const{data:o,setupState:r,ctx:s}=e;return Qr(r,t)?(r[t]=n,!0):o!==qe&&xe(o,t)?(o[t]=n,!0):xe(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(s[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:o,appContext:r,propsOptions:s}},d){let f;return!!n[d]||e!==qe&&xe(e,d)||Qr(t,d)||(f=s[0])&&xe(f,d)||xe(o,d)||xe(fo,d)||xe(r.config.globalProperties,d)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:xe(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function Vi(e){return se(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let Aa=!0;function tf(e){const t=Wa(e),n=e.proxy,o=e.ctx;Aa=!1,t.beforeCreate&&Qi(t.beforeCreate,e,"bc");const{data:r,computed:s,methods:d,watch:f,provide:A,inject:m,created:b,beforeMount:g,mounted:h,beforeUpdate:C,updated:B,activated:w,deactivated:I,beforeDestroy:_,beforeUnmount:O,destroyed:U,unmounted:D,render:fe,renderTracked:Be,renderTriggered:Ue,errorCaptured:pe,serverPrefetch:Le,expose:ie,inheritAttrs:Me,components:ee,directives:ye,filters:Fe}=t;if(m&&nf(m,o,null),d)for(const ge in d){const be=d[ge];ue(be)&&(o[ge]=be.bind(n))}if(r){const ge=r.call(n,n);De(ge)&&(e.data=Ar(ge))}if(Aa=!0,s)for(const ge in s){const be=s[ge],H=ue(be)?be.bind(n,n):ue(be.get)?be.get.bind(n,n):Et,me=!ue(be)&&ue(be.set)?be.set.bind(n):Et,ke=vt({get:H,set:me});Object.defineProperty(o,ge,{enumerable:!0,configurable:!0,get:()=>ke.value,set:Pe=>ke.value=Pe})}if(f)for(const ge in f)_s(f[ge],o,n,ge);if(A){const ge=ue(A)?A.call(n):A;Reflect.ownKeys(ge).forEach(be=>{Qo(be,ge[be])})}b&&Qi(b,e,"c");function Re(ge,be){se(be)?be.forEach(H=>ge(H.bind(n))):be&&ge(be.bind(n))}if(Re(Wu,g),Re(fn,h),Re(Uu,C),Re(Yu,B),Re(qu,w),Re(Nu,I),Re($u,pe),Re(Qu,Be),Re(Vu,Ue),Re(Na,O),Re(Ha,D),Re(Ku,Le),se(ie))if(ie.length){const ge=e.exposed||(e.exposed={});ie.forEach(be=>{Object.defineProperty(ge,be,{get:()=>n[be],set:H=>n[be]=H})})}else e.exposed||(e.exposed={});fe&&e.render===Et&&(e.render=fe),Me!=null&&(e.inheritAttrs=Me),ee&&(e.components=ee),ye&&(e.directives=ye)}function nf(e,t,n=Et){se(e)&&(e=ya(e));for(const o in e){const r=e[o];let s;De(r)?"default"in r?s=ht(r.from||o,r.default,!0):s=ht(r.from||o):s=ht(r),tt(s)?Object.defineProperty(t,o,{enumerable:!0,configurable:!0,get:()=>s.value,set:d=>s.value=d}):t[o]=s}}function Qi(e,t,n){ft(se(e)?e.map(o=>o.bind(t.proxy)):e.bind(t.proxy),t,n)}function _s(e,t,n,o){const r=o.includes(".")?xs(n,o):()=>n[o];if(Ve(e)){const s=t[e];ue(s)&&dn(r,s)}else if(ue(e))dn(r,e.bind(n));else if(De(e))if(se(e))e.forEach(s=>_s(s,t,n,o));else{const s=ue(e.handler)?e.handler.bind(n):t[e.handler];ue(s)&&dn(r,s,e)}}function Wa(e){const t=e.type,{mixins:n,extends:o}=t,{mixins:r,optionsCache:s,config:{optionMergeStrategies:d}}=e.appContext,f=s.get(t);let A;return f?A=f:!r.length&&!n&&!o?A=t:(A={},r.length&&r.forEach(m=>rr(A,m,d,!0)),rr(A,t,d)),De(t)&&s.set(t,A),A}function rr(e,t,n,o=!1){const{mixins:r,extends:s}=t;s&&rr(e,s,n,!0),r&&r.forEach(d=>rr(e,d,n,!0));for(const d in t)if(!(o&&d==="expose")){const f=of[d]||n&&n[d];e[d]=f?f(e[d],t[d]):t[d]}return e}const of={data:$i,props:Zi,emits:Zi,methods:po,computed:po,beforeCreate:rt,created:rt,beforeMount:rt,mounted:rt,beforeUpdate:rt,updated:rt,beforeDestroy:rt,beforeUnmount:rt,destroyed:rt,unmounted:rt,activated:rt,deactivated:rt,errorCaptured:rt,serverPrefetch:rt,components:po,directives:po,watch:af,provide:$i,inject:rf};function $i(e,t){return t?e?function(){return Ke(ue(e)?e.call(this,this):e,ue(t)?t.call(this,this):t)}:t:e}function rf(e,t){return po(ya(e),ya(t))}function ya(e){if(se(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function rt(e,t){return e?[...new Set([].concat(e,t))]:t}function po(e,t){return e?Ke(Object.create(null),e,t):t}function Zi(e,t){return e?se(e)&&se(t)?[...new Set([...e,...t])]:Ke(Object.create(null),Vi(e),Vi(t??{})):t}function af(e,t){if(!e)return t;if(!t)return e;const n=Ke(Object.create(null),e);for(const o in t)n[o]=rt(e[o],t[o]);return n}function Is(){return{app:null,config:{isNativeTag:Lp,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let lf=0;function sf(e,t){return function(o,r=null){ue(o)||(o=Ke({},o)),r!=null&&!De(r)&&(r=null);const s=Is(),d=new Set;let f=!1;const A=s.app={_uid:lf++,_component:o,_props:r,_container:null,_context:s,_instance:null,version:jf,get config(){return s.config},set config(m){},use(m,...b){return d.has(m)||(m&&ue(m.install)?(d.add(m),m.install(A,...b)):ue(m)&&(d.add(m),m(A,...b))),A},mixin(m){return s.mixins.includes(m)||s.mixins.push(m),A},component(m,b){return b?(s.components[m]=b,A):s.components[m]},directive(m,b){return b?(s.directives[m]=b,A):s.directives[m]},mount(m,b,g){if(!f){const h=q(o,r);return h.appContext=s,b&&t?t(h,m):e(h,m,g),f=!0,A._container=m,m.__vue_app__=A,Va(h.component)||h.component.proxy}},unmount(){f&&(e(null,A._container),delete A._container.__vue_app__)},provide(m,b){return s.provides[m]=b,A},runWithContext(m){ar=A;try{return m()}finally{ar=null}}};return A}}let ar=null;function Qo(e,t){if(Je){let n=Je.provides;const o=Je.parent&&Je.parent.provides;o===n&&(n=Je.provides=Object.create(o)),n[e]=t}}function ht(e,t,n=!1){const o=Je||nt;if(o||ar){const r=o?o.parent==null?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides:ar._context.provides;if(r&&e in r)return r[e];if(arguments.length>1)return n&&ue(t)?t.call(o&&o.proxy):t}}function cf(e,t,n,o=!1){const r={},s={};er(s,Er,1),e.propsDefaults=Object.create(null),Ts(e,t,r,s);for(const d in e.propsOptions[0])d in r||(r[d]=void 0);n?e.props=o?r:ls(r):e.type.props?e.props=r:e.props=s,e.attrs=s}function df(e,t,n,o){const{props:r,attrs:s,vnode:{patchFlag:d}}=e,f=Ce(r),[A]=e.propsOptions;let m=!1;if((o||d>0)&&!(d&16)){if(d&8){const b=e.vnode.dynamicProps;for(let g=0;g<b.length;g++){let h=b[g];if(mr(e.emitsOptions,h))continue;const C=t[h];if(A)if(xe(s,h))C!==s[h]&&(s[h]=C,m=!0);else{const B=_t(h);r[B]=ma(A,f,B,C,e,!1)}else C!==s[h]&&(s[h]=C,m=!0)}}}else{Ts(e,t,r,s)&&(m=!0);let b;for(const g in f)(!t||!xe(t,g)&&((b=Tn(g))===g||!xe(t,b)))&&(A?n&&(n[g]!==void 0||n[b]!==void 0)&&(r[g]=ma(A,f,g,void 0,e,!0)):delete r[g]);if(s!==f)for(const g in s)(!t||!xe(t,g))&&(delete s[g],m=!0)}m&&zt(e,"set","$attrs")}function Ts(e,t,n,o){const[r,s]=e.propsOptions;let d=!1,f;if(t)for(let A in t){if(Ko(A))continue;const m=t[A];let b;r&&xe(r,b=_t(A))?!s||!s.includes(b)?n[b]=m:(f||(f={}))[b]=m:mr(e.emitsOptions,A)||(!(A in o)||m!==o[A])&&(o[A]=m,d=!0)}if(s){const A=Ce(n),m=f||qe;for(let b=0;b<s.length;b++){const g=s[b];n[g]=ma(r,A,g,m[g],e,!xe(m,g))}}return d}function ma(e,t,n,o,r,s){const d=e[n];if(d!=null){const f=xe(d,"default");if(f&&o===void 0){const A=d.default;if(d.type!==Function&&!d.skipFactory&&ue(A)){const{propsDefaults:m}=r;n in m?o=m[n]:(Sn(r),o=m[n]=A.call(null,t),un())}else o=A}d[0]&&(s&&!f?o=!1:d[1]&&(o===""||o===Tn(n))&&(o=!0))}return o}function Os(e,t,n=!1){const o=t.propsCache,r=o.get(e);if(r)return r;const s=e.props,d={},f=[];let A=!1;if(!ue(e)){const b=g=>{A=!0;const[h,C]=Os(g,t,!0);Ke(d,h),C&&f.push(...C)};!n&&t.mixins.length&&t.mixins.forEach(b),e.extends&&b(e.extends),e.mixins&&e.mixins.forEach(b)}if(!s&&!A)return De(e)&&o.set(e,En),En;if(se(s))for(let b=0;b<s.length;b++){const g=_t(s[b]);Ji(g)&&(d[g]=qe)}else if(s)for(const b in s){const g=_t(b);if(Ji(g)){const h=s[b],C=d[g]=se(h)||ue(h)?{type:h}:Ke({},h);if(C){const B=el(Boolean,C.type),w=el(String,C.type);C[0]=B>-1,C[1]=w<0||B<w,(B>-1||xe(C,"default"))&&f.push(g)}}}const m=[d,f];return De(e)&&o.set(e,m),m}function Ji(e){return e[0]!=="$"}function Xi(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function Gi(e,t){return Xi(e)===Xi(t)}function el(e,t){return se(t)?t.findIndex(n=>Gi(n,e)):ue(t)&&Gi(t,e)?0:-1}const Rs=e=>e[0]==="_"||e==="$stable",Ua=e=>se(e)?e.map(Bt):[Bt(e)],pf=(e,t,n)=>{if(t._n)return t;const o=co((...r)=>Ua(t(...r)),n);return o._c=!1,o},Ps=(e,t,n)=>{const o=e._ctx;for(const r in e){if(Rs(r))continue;const s=e[r];if(ue(s))t[r]=pf(r,s,o);else if(s!=null){const d=Ua(s);t[r]=()=>d}}},js=(e,t)=>{const n=Ua(t);e.slots.default=()=>n},uf=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=Ce(t),er(t,"_",n)):Ps(t,e.slots={})}else e.slots={},t&&js(e,t);er(e.slots,Er,1)},ff=(e,t,n)=>{const{vnode:o,slots:r}=e;let s=!0,d=qe;if(o.shapeFlag&32){const f=t._;f?n&&f===1?s=!1:(Ke(r,t),!n&&f===1&&delete r._):(s=!t.$stable,Ps(t,r)),d=t}else t&&(js(e,t),d={default:1});if(s)for(const f in r)!Rs(f)&&!(f in d)&&delete r[f]};function ba(e,t,n,o,r=!1){if(se(e)){e.forEach((h,C)=>ba(h,t&&(se(t)?t[C]:t),n,o,r));return}if(uo(o)&&!r)return;const s=o.shapeFlag&4?Va(o.component)||o.component.proxy:o.el,d=r?null:s,{i:f,r:A}=e,m=t&&t.r,b=f.refs===qe?f.refs={}:f.refs,g=f.setupState;if(m!=null&&m!==A&&(Ve(m)?(b[m]=null,xe(g,m)&&(g[m]=null)):tt(m)&&(m.value=null)),ue(A))Zt(A,f,12,[d,b]);else{const h=Ve(A),C=tt(A);if(h||C){const B=()=>{if(e.f){const w=h?xe(g,A)?g[A]:b[A]:A.value;r?se(w)&&_a(w,s):se(w)?w.includes(s)||w.push(s):h?(b[A]=[s],xe(g,A)&&(g[A]=b[A])):(A.value=[s],e.k&&(b[e.k]=A.value))}else h?(b[A]=d,xe(g,A)&&(g[A]=d)):C&&(A.value=d,e.k&&(b[e.k]=d))};d?(B.id=-1,lt(B,n)):B()}}}const lt=ju;function hf(e){return Af(e)}function Af(e,t){const n=ia();n.__VUE__=!0;const{insert:o,remove:r,patchProp:s,createElement:d,createText:f,createComment:A,setText:m,setElementText:b,parentNode:g,nextSibling:h,setScopeId:C=Et,insertStaticContent:B}=e,w=(E,k,S,R=null,M=null,N=null,X=!1,W=null,Q=!!k.dynamicChildren)=>{if(E===k)return;E&&!an(E,k)&&(R=z(E),Pe(E,M,N,!0),E=null),k.patchFlag===-2&&(Q=!1,k.dynamicChildren=null);const{type:F,ref:re,shapeFlag:te}=k;switch(F){case xr:I(E,k,S,R);break;case At:_(E,k,S,R);break;case $r:E==null&&O(k,S,R,X);break;case Xe:ee(E,k,S,R,M,N,X,W,Q);break;default:te&1?fe(E,k,S,R,M,N,X,W,Q):te&6?ye(E,k,S,R,M,N,X,W,Q):(te&64||te&128)&&F.process(E,k,S,R,M,N,X,W,Q,K)}re!=null&&M&&ba(re,E&&E.ref,N,k||E,!k)},I=(E,k,S,R)=>{if(E==null)o(k.el=f(k.children),S,R);else{const M=k.el=E.el;k.children!==E.children&&m(M,k.children)}},_=(E,k,S,R)=>{E==null?o(k.el=A(k.children||""),S,R):k.el=E.el},O=(E,k,S,R)=>{[E.el,E.anchor]=B(E.children,k,S,R,E.el,E.anchor)},U=({el:E,anchor:k},S,R)=>{let M;for(;E&&E!==k;)M=h(E),o(E,S,R),E=M;o(k,S,R)},D=({el:E,anchor:k})=>{let S;for(;E&&E!==k;)S=h(E),r(E),E=S;r(k)},fe=(E,k,S,R,M,N,X,W,Q)=>{X=X||k.type==="svg",E==null?Be(k,S,R,M,N,X,W,Q):Le(E,k,M,N,X,W,Q)},Be=(E,k,S,R,M,N,X,W)=>{let Q,F;const{type:re,props:te,shapeFlag:ae,transition:ce,dirs:he}=E;if(Q=E.el=d(E.type,N,te&&te.is,te),ae&8?b(Q,E.children):ae&16&&pe(E.children,Q,null,R,M,N&&re!=="foreignObject",X,W),he&&en(E,null,R,"created"),Ue(Q,E,E.scopeId,X,R),te){for(const Se in te)Se!=="value"&&!Ko(Se)&&s(Q,Se,null,te[Se],N,E.children,R,M,je);"value"in te&&s(Q,"value",null,te.value),(F=te.onVnodeBeforeMount)&&Ct(F,R,E)}he&&en(E,null,R,"beforeMount");const Te=(!M||M&&!M.pendingBranch)&&ce&&!ce.persisted;Te&&ce.beforeEnter(Q),o(Q,k,S),((F=te&&te.onVnodeMounted)||Te||he)&&lt(()=>{F&&Ct(F,R,E),Te&&ce.enter(Q),he&&en(E,null,R,"mounted")},M)},Ue=(E,k,S,R,M)=>{if(S&&C(E,S),R)for(let N=0;N<R.length;N++)C(E,R[N]);if(M){let N=M.subTree;if(k===N){const X=M.vnode;Ue(E,X,X.scopeId,X.slotScopeIds,M.parent)}}},pe=(E,k,S,R,M,N,X,W,Q=0)=>{for(let F=Q;F<E.length;F++){const re=E[F]=W?Vt(E[F]):Bt(E[F]);w(null,re,k,S,R,M,N,X,W)}},Le=(E,k,S,R,M,N,X)=>{const W=k.el=E.el;let{patchFlag:Q,dynamicChildren:F,dirs:re}=k;Q|=E.patchFlag&16;const te=E.props||qe,ae=k.props||qe;let ce;S&&tn(S,!1),(ce=ae.onVnodeBeforeUpdate)&&Ct(ce,S,k,E),re&&en(k,E,S,"beforeUpdate"),S&&tn(S,!0);const he=M&&k.type!=="foreignObject";if(F?ie(E.dynamicChildren,F,W,S,R,he,N):X||be(E,k,W,null,S,R,he,N,!1),Q>0){if(Q&16)Me(W,k,te,ae,S,R,M);else if(Q&2&&te.class!==ae.class&&s(W,"class",null,ae.class,M),Q&4&&s(W,"style",te.style,ae.style,M),Q&8){const Te=k.dynamicProps;for(let Se=0;Se<Te.length;Se++){const Ne=Te[Se],ct=te[Ne],Tt=ae[Ne];(Tt!==ct||Ne==="value")&&s(W,Ne,ct,Tt,M,E.children,S,R,je)}}Q&1&&E.children!==k.children&&b(W,k.children)}else!X&&F==null&&Me(W,k,te,ae,S,R,M);((ce=ae.onVnodeUpdated)||re)&&lt(()=>{ce&&Ct(ce,S,k,E),re&&en(k,E,S,"updated")},R)},ie=(E,k,S,R,M,N,X)=>{for(let W=0;W<k.length;W++){const Q=E[W],F=k[W],re=Q.el&&(Q.type===Xe||!an(Q,F)||Q.shapeFlag&70)?g(Q.el):S;w(Q,F,re,null,R,M,N,X,!0)}},Me=(E,k,S,R,M,N,X)=>{if(S!==R){if(S!==qe)for(const W in S)!Ko(W)&&!(W in R)&&s(E,W,S[W],null,X,k.children,M,N,je);for(const W in R){if(Ko(W))continue;const Q=R[W],F=S[W];Q!==F&&W!=="value"&&s(E,W,F,Q,X,k.children,M,N,je)}"value"in R&&s(E,"value",S.value,R.value)}},ee=(E,k,S,R,M,N,X,W,Q)=>{const F=k.el=E?E.el:f(""),re=k.anchor=E?E.anchor:f("");let{patchFlag:te,dynamicChildren:ae,slotScopeIds:ce}=k;ce&&(W=W?W.concat(ce):ce),E==null?(o(F,S,R),o(re,S,R),pe(k.children,S,re,M,N,X,W,Q)):te>0&&te&64&&ae&&E.dynamicChildren?(ie(E.dynamicChildren,ae,S,M,N,X,W),(k.key!=null||M&&k===M.subTree)&&zs(E,k,!0)):be(E,k,S,re,M,N,X,W,Q)},ye=(E,k,S,R,M,N,X,W,Q)=>{k.slotScopeIds=W,E==null?k.shapeFlag&512?M.ctx.activate(k,S,R,X,Q):Fe(k,S,R,M,N,X,Q):it(E,k,Q)},Fe=(E,k,S,R,M,N,X)=>{const W=E.component=Cf(E,R,M);if(gr(E)&&(W.ctx.renderer=K),Sf(W),W.asyncDep){if(M&&M.registerDep(W,Re),!E.el){const Q=W.subTree=q(At);_(null,Q,k,S)}return}Re(W,E,k,S,M,N,X)},it=(E,k,S)=>{const R=k.component=E.component;if(Ou(E,k,S))if(R.asyncDep&&!R.asyncResolved){ge(R,k,S);return}else R.next=k,wu(R.update),R.update();else k.el=E.el,R.vnode=k},Re=(E,k,S,R,M,N,X)=>{const W=()=>{if(E.isMounted){let{next:re,bu:te,u:ae,parent:ce,vnode:he}=E,Te=re,Se;tn(E,!1),re?(re.el=he.el,ge(E,re,X)):re=he,te&&Yr(te),(Se=re.props&&re.props.onVnodeBeforeUpdate)&&Ct(Se,ce,re,he),tn(E,!0);const Ne=Kr(E),ct=E.subTree;E.subTree=Ne,w(ct,Ne,g(ct.el),z(ct),E,M,N),re.el=Ne.el,Te===null&&Ru(E,Ne.el),ae&&lt(ae,M),(Se=re.props&&re.props.onVnodeUpdated)&&lt(()=>Ct(Se,ce,re,he),M)}else{let re;const{el:te,props:ae}=k,{bm:ce,m:he,parent:Te}=E,Se=uo(k);if(tn(E,!1),ce&&Yr(ce),!Se&&(re=ae&&ae.onVnodeBeforeMount)&&Ct(re,Te,k),tn(E,!0),te&&we){const Ne=()=>{E.subTree=Kr(E),we(te,E.subTree,E,M,null)};Se?k.type.__asyncLoader().then(()=>!E.isUnmounted&&Ne()):Ne()}else{const Ne=E.subTree=Kr(E);w(null,Ne,S,R,E,M,N),k.el=Ne.el}if(he&&lt(he,M),!Se&&(re=ae&&ae.onVnodeMounted)){const Ne=k;lt(()=>Ct(re,Te,Ne),M)}(k.shapeFlag&256||Te&&uo(Te.vnode)&&Te.vnode.shapeFlag&256)&&E.a&&lt(E.a,M),E.isMounted=!0,k=S=R=null}},Q=E.effect=new Ra(W,()=>qa(F),E.scope),F=E.update=()=>Q.run();F.id=E.uid,tn(E,!0),F()},ge=(E,k,S)=>{k.component=E;const R=E.vnode.props;E.vnode=k,E.next=null,df(E,k.props,R,S),ff(E,k.children,S),On(),Wi(),Rn()},be=(E,k,S,R,M,N,X,W,Q=!1)=>{const F=E&&E.children,re=E?E.shapeFlag:0,te=k.children,{patchFlag:ae,shapeFlag:ce}=k;if(ae>0){if(ae&128){me(F,te,S,R,M,N,X,W,Q);return}else if(ae&256){H(F,te,S,R,M,N,X,W,Q);return}}ce&8?(re&16&&je(F,M,N),te!==F&&b(S,te)):re&16?ce&16?me(F,te,S,R,M,N,X,W,Q):je(F,M,N,!0):(re&8&&b(S,""),ce&16&&pe(te,S,R,M,N,X,W,Q))},H=(E,k,S,R,M,N,X,W,Q)=>{E=E||En,k=k||En;const F=E.length,re=k.length,te=Math.min(F,re);let ae;for(ae=0;ae<te;ae++){const ce=k[ae]=Q?Vt(k[ae]):Bt(k[ae]);w(E[ae],ce,S,null,M,N,X,W,Q)}F>re?je(E,M,N,!0,!1,te):pe(k,S,R,M,N,X,W,Q,te)},me=(E,k,S,R,M,N,X,W,Q)=>{let F=0;const re=k.length;let te=E.length-1,ae=re-1;for(;F<=te&&F<=ae;){const ce=E[F],he=k[F]=Q?Vt(k[F]):Bt(k[F]);if(an(ce,he))w(ce,he,S,null,M,N,X,W,Q);else break;F++}for(;F<=te&&F<=ae;){const ce=E[te],he=k[ae]=Q?Vt(k[ae]):Bt(k[ae]);if(an(ce,he))w(ce,he,S,null,M,N,X,W,Q);else break;te--,ae--}if(F>te){if(F<=ae){const ce=ae+1,he=ce<re?k[ce].el:R;for(;F<=ae;)w(null,k[F]=Q?Vt(k[F]):Bt(k[F]),S,he,M,N,X,W,Q),F++}}else if(F>ae)for(;F<=te;)Pe(E[F],M,N,!0),F++;else{const ce=F,he=F,Te=new Map;for(F=he;F<=ae;F++){const Ge=k[F]=Q?Vt(k[F]):Bt(k[F]);Ge.key!=null&&Te.set(Ge.key,F)}let Se,Ne=0;const ct=ae-he+1;let Tt=!1,P=0;const pt=new Array(ct);for(F=0;F<ct;F++)pt[F]=0;for(F=ce;F<=te;F++){const Ge=E[F];if(Ne>=ct){Pe(Ge,M,N,!0);continue}let Ae;if(Ge.key!=null)Ae=Te.get(Ge.key);else for(Se=he;Se<=ae;Se++)if(pt[Se-he]===0&&an(Ge,k[Se])){Ae=Se;break}Ae===void 0?Pe(Ge,M,N,!0):(pt[Ae-he]=F+1,Ae>=P?P=Ae:Tt=!0,w(Ge,k[Ae],S,null,M,N,X,W,Q),Ne++)}const jn=Tt?yf(pt):En;for(Se=jn.length-1,F=ct-1;F>=0;F--){const Ge=he+F,Ae=k[Ge],Io=Ge+1<re?k[Ge+1].el:R;pt[F]===0?w(null,Ae,S,Io,M,N,X,W,Q):Tt&&(Se<0||F!==jn[Se]?ke(Ae,S,Io,2):Se--)}}},ke=(E,k,S,R,M=null)=>{const{el:N,type:X,transition:W,children:Q,shapeFlag:F}=E;if(F&6){ke(E.component.subTree,k,S,R);return}if(F&128){E.suspense.move(k,S,R);return}if(F&64){X.move(E,k,S,K);return}if(X===Xe){o(N,k,S);for(let te=0;te<Q.length;te++)ke(Q[te],k,S,R);o(E.anchor,k,S);return}if(X===$r){U(E,k,S);return}if(R!==2&&F&1&&W)if(R===0)W.beforeEnter(N),o(N,k,S),lt(()=>W.enter(N),M);else{const{leave:te,delayLeave:ae,afterLeave:ce}=W,he=()=>o(N,k,S),Te=()=>{te(N,()=>{he(),ce&&ce()})};ae?ae(N,he,Te):Te()}else o(N,k,S)},Pe=(E,k,S,R=!1,M=!1)=>{const{type:N,props:X,ref:W,children:Q,dynamicChildren:F,shapeFlag:re,patchFlag:te,dirs:ae}=E;if(W!=null&&ba(W,null,S,E,!0),re&256){k.ctx.deactivate(E);return}const ce=re&1&&ae,he=!uo(E);let Te;if(he&&(Te=X&&X.onVnodeBeforeUnmount)&&Ct(Te,k,E),re&6)Dt(E.component,S,R);else{if(re&128){E.suspense.unmount(S,R);return}ce&&en(E,null,k,"beforeUnmount"),re&64?E.type.remove(E,k,S,M,K,R):F&&(N!==Xe||te>0&&te&64)?je(F,k,S,!1,!0):(N===Xe&&te&384||!M&&re&16)&&je(Q,k,S),R&&ot(E)}(he&&(Te=X&&X.onVnodeUnmounted)||ce)&&lt(()=>{Te&&Ct(Te,k,E),ce&&en(E,null,k,"unmounted")},S)},ot=E=>{const{type:k,el:S,anchor:R,transition:M}=E;if(k===Xe){dt(S,R);return}if(k===$r){D(E);return}const N=()=>{r(S),M&&!M.persisted&&M.afterLeave&&M.afterLeave()};if(E.shapeFlag&1&&M&&!M.persisted){const{leave:X,delayLeave:W}=M,Q=()=>X(S,N);W?W(E.el,N,Q):Q()}else N()},dt=(E,k)=>{let S;for(;E!==k;)S=h(E),r(E),E=S;r(k)},Dt=(E,k,S)=>{const{bum:R,scope:M,update:N,subTree:X,um:W}=E;R&&Yr(R),M.stop(),N&&(N.active=!1,Pe(X,E,k,S)),W&&lt(W,k),lt(()=>{E.isUnmounted=!0},k),k&&k.pendingBranch&&!k.isUnmounted&&E.asyncDep&&!E.asyncResolved&&E.suspenseId===k.pendingId&&(k.deps--,k.deps===0&&k.resolve())},je=(E,k,S,R=!1,M=!1,N=0)=>{for(let X=N;X<E.length;X++)Pe(E[X],k,S,R,M)},z=E=>E.shapeFlag&6?z(E.component.subTree):E.shapeFlag&128?E.suspense.next():h(E.anchor||E.el),J=(E,k,S)=>{E==null?k._vnode&&Pe(k._vnode,null,null,!0):w(k._vnode||null,E,k,null,null,null,S),Wi(),ms(),k._vnode=E},K={p:w,um:Pe,m:ke,r:ot,mt:Fe,mc:pe,pc:be,pbc:ie,n:z,o:e};let oe,we;return t&&([oe,we]=t(K)),{render:J,hydrate:oe,createApp:sf(J,oe)}}function tn({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function zs(e,t,n=!1){const o=e.children,r=t.children;if(se(o)&&se(r))for(let s=0;s<o.length;s++){const d=o[s];let f=r[s];f.shapeFlag&1&&!f.dynamicChildren&&((f.patchFlag<=0||f.patchFlag===32)&&(f=r[s]=Vt(r[s]),f.el=d.el),n||zs(d,f)),f.type===xr&&(f.el=d.el)}}function yf(e){const t=e.slice(),n=[0];let o,r,s,d,f;const A=e.length;for(o=0;o<A;o++){const m=e[o];if(m!==0){if(r=n[n.length-1],e[r]<m){t[o]=r,n.push(o);continue}for(s=0,d=n.length-1;s<d;)f=s+d>>1,e[n[f]]<m?s=f+1:d=f;m<e[n[s]]&&(s>0&&(t[o]=n[s-1]),n[s]=o)}}for(s=n.length,d=n[s-1];s-- >0;)n[s]=d,d=t[d];return n}const mf=e=>e.__isTeleport,Xe=Symbol.for("v-fgt"),xr=Symbol.for("v-txt"),At=Symbol.for("v-cmt"),$r=Symbol.for("v-stc"),ho=[];let xt=null;function le(e=!1){ho.push(xt=e?null:[])}function bf(){ho.pop(),xt=ho[ho.length-1]||null}let Eo=1;function tl(e){Eo+=e}function Ms(e){return e.dynamicChildren=Eo>0?xt||En:null,bf(),Eo>0&&xt&&xt.push(e),e}function He(e,t,n,o,r,s){return Ms(ve(e,t,n,o,r,s,!0))}function ze(e,t,n,o,r){return Ms(q(e,t,n,o,r,!0))}function ir(e){return e?e.__v_isVNode===!0:!1}function an(e,t){return e.type===t.type&&e.key===t.key}const Er="__vInternal",Ds=({key:e})=>e??null,$o=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?Ve(e)||tt(e)||ue(e)?{i:nt,r:e,k:t,f:!!n}:e:null);function ve(e,t=null,n=null,o=0,r=null,s=e===Xe?0:1,d=!1,f=!1){const A={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Ds(t),ref:t&&$o(t),scopeId:br,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:o,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:nt};return f?(Ya(A,n),s&128&&e.normalize(A)):n&&(A.shapeFlag|=Ve(n)?8:16),Eo>0&&!d&&xt&&(A.patchFlag>0||s&6)&&A.patchFlag!==32&&xt.push(A),A}const q=gf;function gf(e,t=null,n=null,o=0,r=null,s=!1){if((!e||e===Ju)&&(e=At),ir(e)){const f=Xt(e,t,!0);return n&&Ya(f,n),Eo>0&&!s&&xt&&(f.shapeFlag&6?xt[xt.indexOf(e)]=f:xt.push(f)),f.patchFlag|=-2,f}if(Of(e)&&(e=e.__vccOpts),t){t=vf(t);let{class:f,style:A}=t;f&&!Ve(f)&&(t.class=bo(f)),De(A)&&(cs(A)&&!se(A)&&(A=Ke({},A)),t.style=Bo(A))}const d=Ve(e)?1:Pu(e)?128:mf(e)?64:De(e)?4:ue(e)?2:0;return ve(e,t,n,o,r,d,s,!0)}function vf(e){return e?cs(e)||Er in e?Ke({},e):e:null}function Xt(e,t,n=!1){const{props:o,ref:r,patchFlag:s,children:d}=e,f=t?Ef(o||{},t):o;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:f,key:f&&Ds(f),ref:t&&t.ref?n&&r?se(r)?r.concat($o(t)):[r,$o(t)]:$o(t):r,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:d,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Xe?s===-1?16:s|16:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Xt(e.ssContent),ssFallback:e.ssFallback&&Xt(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function xf(e=" ",t=0){return q(xr,null,e,t)}function pn(e="",t=!1){return t?(le(),ze(At,null,e)):q(At,null,e)}function Bt(e){return e==null||typeof e=="boolean"?q(At):se(e)?q(Xe,null,e.slice()):typeof e=="object"?Vt(e):q(xr,null,String(e))}function Vt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Xt(e)}function Ya(e,t){let n=0;const{shapeFlag:o}=e;if(t==null)t=null;else if(se(t))n=16;else if(typeof t=="object")if(o&65){const r=t.default;r&&(r._c&&(r._d=!1),Ya(e,r()),r._c&&(r._d=!0));return}else{n=32;const r=t._;!r&&!(Er in t)?t._ctx=nt:r===3&&nt&&(nt.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else ue(t)?(t={default:t,_ctx:nt},n=32):(t=String(t),o&64?(n=16,t=[xf(t)]):n=8);e.children=t,e.shapeFlag|=n}function Ef(...e){const t={};for(let n=0;n<e.length;n++){const o=e[n];for(const r in o)if(r==="class")t.class!==o.class&&(t.class=bo([t.class,o.class]));else if(r==="style")t.style=Bo([t.style,o.style]);else if(dr(r)){const s=t[r],d=o[r];d&&s!==d&&!(se(s)&&s.includes(d))&&(t[r]=s?[].concat(s,d):d)}else r!==""&&(t[r]=o[r])}return t}function Ct(e,t,n,o=null){ft(e,t,7,[n,o])}const kf=Is();let wf=0;function Cf(e,t,n){const o=e.type,r=(t?t.appContext:e.appContext)||kf,s={uid:wf++,vnode:e,type:o,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new Hp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Os(o,r),emitsOptions:gs(o,r),emit:null,emitted:null,propsDefaults:qe,inheritAttrs:o.inheritAttrs,ctx:qe,data:qe,props:qe,attrs:qe,slots:qe,refs:qe,setupState:qe,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=Su.bind(null,s),e.ce&&e.ce(s),s}let Je=null;const Bf=()=>Je||nt;let Ka,gn,nl="__VUE_INSTANCE_SETTERS__";(gn=ia()[nl])||(gn=ia()[nl]=[]),gn.push(e=>Je=e),Ka=e=>{gn.length>1?gn.forEach(t=>t(e)):gn[0](e)};const Sn=e=>{Ka(e),e.scope.on()},un=()=>{Je&&Je.scope.off(),Ka(null)};function Fs(e){return e.vnode.shapeFlag&4}let ko=!1;function Sf(e,t=!1){ko=t;const{props:n,children:o}=e.vnode,r=Fs(e);cf(e,n,r,t),uf(e,o);const s=r?Lf(e,t):void 0;return ko=!1,s}function Lf(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=ds(new Proxy(e.ctx,ef));const{setup:o}=n;if(o){const r=e.setupContext=o.length>1?If(e):null;Sn(e),On();const s=Zt(o,e,0,[e.props,r]);if(Rn(),un(),Kl(s)){if(s.then(un,un),t)return s.then(d=>{ol(e,d,t)}).catch(d=>{yr(d,e,0)});e.asyncDep=s}else ol(e,s,t)}else qs(e,t)}function ol(e,t,n){ue(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:De(t)&&(e.setupState=hs(t)),qs(e,n)}let rl;function qs(e,t,n){const o=e.type;if(!e.render){if(!t&&rl&&!o.render){const r=o.template||Wa(e).template;if(r){const{isCustomElement:s,compilerOptions:d}=e.appContext.config,{delimiters:f,compilerOptions:A}=o,m=Ke(Ke({isCustomElement:s,delimiters:f},d),A);o.render=rl(r,m)}}e.render=o.render||Et}Sn(e),On(),tf(e),Rn(),un()}function _f(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,n){return st(e,"get","$attrs"),t[n]}}))}function If(e){const t=n=>{e.exposed=n||{}};return{get attrs(){return _f(e)},slots:e.slots,emit:e.emit,expose:t}}function Va(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(hs(ds(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in fo)return fo[n](e)},has(t,n){return n in t||n in fo}}))}function Tf(e,t=!0){return ue(e)?e.displayName||e.name:e.name||t&&e.__name}function Of(e){return ue(e)&&"__vccOpts"in e}const vt=(e,t)=>xu(e,t,ko);function Qa(e,t,n){const o=arguments.length;return o===2?De(t)&&!se(t)?ir(t)?q(e,null,[t]):q(e,t):q(e,null,t):(o>3?n=Array.prototype.slice.call(arguments,2):o===3&&ir(n)&&(n=[n]),q(e,t,n))}const Rf=Symbol.for("v-scx"),Pf=()=>ht(Rf),jf="3.3.4",zf="http://www.w3.org/2000/svg",ln=typeof document<"u"?document:null,al=ln&&ln.createElement("template"),Mf={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,o)=>{const r=t?ln.createElementNS(zf,e):ln.createElement(e,n?{is:n}:void 0);return e==="select"&&o&&o.multiple!=null&&r.setAttribute("multiple",o.multiple),r},createText:e=>ln.createTextNode(e),createComment:e=>ln.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>ln.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,o,r,s){const d=n?n.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{al.innerHTML=o?`<svg>${e}</svg>`:e;const f=al.content;if(o){const A=f.firstChild;for(;A.firstChild;)f.appendChild(A.firstChild);f.removeChild(A)}t.insertBefore(f,n)}return[d?d.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function Df(e,t,n){const o=e._vtc;o&&(t=(t?[t,...o]:[...o]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function Ff(e,t,n){const o=e.style,r=Ve(n);if(n&&!r){if(t&&!Ve(t))for(const s in t)n[s]==null&&ga(o,s,"");for(const s in n)ga(o,s,n[s])}else{const s=o.display;r?t!==n&&(o.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(o.display=s)}}const il=/\s*!important$/;function ga(e,t,n){if(se(n))n.forEach(o=>ga(e,t,o));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const o=qf(e,t);il.test(n)?e.setProperty(Tn(o),n.replace(il,""),"important"):e[o]=n}}const ll=["Webkit","Moz","ms"],Zr={};function qf(e,t){const n=Zr[t];if(n)return n;let o=_t(t);if(o!=="filter"&&o in e)return Zr[t]=o;o=fr(o);for(let r=0;r<ll.length;r++){const s=ll[r]+o;if(s in e)return Zr[t]=s}return t}const sl="http://www.w3.org/1999/xlink";function Nf(e,t,n,o,r){if(o&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(sl,t.slice(6,t.length)):e.setAttributeNS(sl,t,n);else{const s=Np(t);n==null||s&&!$l(n)?e.removeAttribute(t):e.setAttribute(t,s?"":n)}}function Hf(e,t,n,o,r,s,d){if(t==="innerHTML"||t==="textContent"){o&&d(o,r,s),e[t]=n??"";return}const f=e.tagName;if(t==="value"&&f!=="PROGRESS"&&!f.includes("-")){e._value=n;const m=f==="OPTION"?e.getAttribute("value"):e.value,b=n??"";m!==b&&(e.value=b),n==null&&e.removeAttribute(t);return}let A=!1;if(n===""||n==null){const m=typeof e[t];m==="boolean"?n=$l(n):n==null&&m==="string"?(n="",A=!0):m==="number"&&(n=0,A=!0)}try{e[t]=n}catch{}A&&e.removeAttribute(t)}function Wf(e,t,n,o){e.addEventListener(t,n,o)}function Uf(e,t,n,o){e.removeEventListener(t,n,o)}function Yf(e,t,n,o,r=null){const s=e._vei||(e._vei={}),d=s[t];if(o&&d)d.value=o;else{const[f,A]=Kf(t);if(o){const m=s[t]=$f(o,r);Wf(e,f,m,A)}else d&&(Uf(e,f,d,A),s[t]=void 0)}}const cl=/(?:Once|Passive|Capture)$/;function Kf(e){let t;if(cl.test(e)){t={};let o;for(;o=e.match(cl);)e=e.slice(0,e.length-o[0].length),t[o[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Tn(e.slice(2)),t]}let Jr=0;const Vf=Promise.resolve(),Qf=()=>Jr||(Vf.then(()=>Jr=0),Jr=Date.now());function $f(e,t){const n=o=>{if(!o._vts)o._vts=Date.now();else if(o._vts<=n.attached)return;ft(Zf(o,n.value),t,5,[o])};return n.value=e,n.attached=Qf(),n}function Zf(e,t){if(se(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(o=>r=>!r._stopped&&o&&o(r))}else return t}const dl=/^on[a-z]/,Jf=(e,t,n,o,r=!1,s,d,f,A)=>{t==="class"?Df(e,o,r):t==="style"?Ff(e,n,o):dr(t)?La(t)||Yf(e,t,n,o,d):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Xf(e,t,o,r))?Hf(e,t,o,s,d,f,A):(t==="true-value"?e._trueValue=o:t==="false-value"&&(e._falseValue=o),Nf(e,t,o,r))};function Xf(e,t,n,o){return o?!!(t==="innerHTML"||t==="textContent"||t in e&&dl.test(t)&&ue(n)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||dl.test(t)&&Ve(n)?!1:t in e}const Wt="transition",ao="animation",lr=(e,{slots:t})=>Qa(Fu,Gf(e),t);lr.displayName="Transition";const Ns={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String};lr.props=Ke({},Es,Ns);const nn=(e,t=[])=>{se(e)?e.forEach(n=>n(...t)):e&&e(...t)},pl=e=>e?se(e)?e.some(t=>t.length>1):e.length>1:!1;function Gf(e){const t={};for(const ee in e)ee in Ns||(t[ee]=e[ee]);if(e.css===!1)return t;const{name:n="v",type:o,duration:r,enterFromClass:s=`${n}-enter-from`,enterActiveClass:d=`${n}-enter-active`,enterToClass:f=`${n}-enter-to`,appearFromClass:A=s,appearActiveClass:m=d,appearToClass:b=f,leaveFromClass:g=`${n}-leave-from`,leaveActiveClass:h=`${n}-leave-active`,leaveToClass:C=`${n}-leave-to`}=e,B=eh(r),w=B&&B[0],I=B&&B[1],{onBeforeEnter:_,onEnter:O,onEnterCancelled:U,onLeave:D,onLeaveCancelled:fe,onBeforeAppear:Be=_,onAppear:Ue=O,onAppearCancelled:pe=U}=t,Le=(ee,ye,Fe)=>{on(ee,ye?b:f),on(ee,ye?m:d),Fe&&Fe()},ie=(ee,ye)=>{ee._isLeaving=!1,on(ee,g),on(ee,C),on(ee,h),ye&&ye()},Me=ee=>(ye,Fe)=>{const it=ee?Ue:O,Re=()=>Le(ye,ee,Fe);nn(it,[ye,Re]),ul(()=>{on(ye,ee?A:s),Ut(ye,ee?b:f),pl(it)||fl(ye,o,w,Re)})};return Ke(t,{onBeforeEnter(ee){nn(_,[ee]),Ut(ee,s),Ut(ee,d)},onBeforeAppear(ee){nn(Be,[ee]),Ut(ee,A),Ut(ee,m)},onEnter:Me(!1),onAppear:Me(!0),onLeave(ee,ye){ee._isLeaving=!0;const Fe=()=>ie(ee,ye);Ut(ee,g),oh(),Ut(ee,h),ul(()=>{ee._isLeaving&&(on(ee,g),Ut(ee,C),pl(D)||fl(ee,o,I,Fe))}),nn(D,[ee,Fe])},onEnterCancelled(ee){Le(ee,!1),nn(U,[ee])},onAppearCancelled(ee){Le(ee,!0),nn(pe,[ee])},onLeaveCancelled(ee){ie(ee),nn(fe,[ee])}})}function eh(e){if(e==null)return null;if(De(e))return[Xr(e.enter),Xr(e.leave)];{const t=Xr(e);return[t,t]}}function Xr(e){return jp(e)}function Ut(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e._vtc||(e._vtc=new Set)).add(t)}function on(e,t){t.split(/\s+/).forEach(o=>o&&e.classList.remove(o));const{_vtc:n}=e;n&&(n.delete(t),n.size||(e._vtc=void 0))}function ul(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let th=0;function fl(e,t,n,o){const r=e._endId=++th,s=()=>{r===e._endId&&o()};if(n)return setTimeout(s,n);const{type:d,timeout:f,propCount:A}=nh(e,t);if(!d)return o();const m=d+"end";let b=0;const g=()=>{e.removeEventListener(m,h),s()},h=C=>{C.target===e&&++b>=A&&g()};setTimeout(()=>{b<A&&g()},f+1),e.addEventListener(m,h)}function nh(e,t){const n=window.getComputedStyle(e),o=B=>(n[B]||"").split(", "),r=o(`${Wt}Delay`),s=o(`${Wt}Duration`),d=hl(r,s),f=o(`${ao}Delay`),A=o(`${ao}Duration`),m=hl(f,A);let b=null,g=0,h=0;t===Wt?d>0&&(b=Wt,g=d,h=s.length):t===ao?m>0&&(b=ao,g=m,h=A.length):(g=Math.max(d,m),b=g>0?d>m?Wt:ao:null,h=b?b===Wt?s.length:A.length:0);const C=b===Wt&&/\b(transform|all)(,|$)/.test(o(`${Wt}Property`).toString());return{type:b,timeout:g,propCount:h,hasTransform:C}}function hl(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,o)=>Al(n)+Al(e[o])))}function Al(e){return Number(e.slice(0,-1).replace(",","."))*1e3}function oh(){return document.body.offsetHeight}const rh=Ke({patchProp:Jf},Mf);let yl;function ah(){return yl||(yl=hf(rh))}const ih=(...e)=>{const t=ah().createApp(...e),{mount:n}=t;return t.mount=o=>{const r=lh(o);if(!r)return;const s=t._component;!ue(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.innerHTML="";const d=n(r,!1,r instanceof SVGElement);return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),d},t};function lh(e){return Ve(e)?document.querySelector(e):e}const So=(e,t)=>{const n=e.__vccOpts||e;for(const[o,r]of t)n[o]=r;return n},sh={};function ch(e,t){const n=Zu("router-view");return le(),ze(n)}const dh=So(sh,[["render",ch]]);/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const vn=typeof window<"u";function ph(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const _e=Object.assign;function Gr(e,t){const n={};for(const o in t){const r=t[o];n[o]=kt(r)?r.map(e):e(r)}return n}const Ao=()=>{},kt=Array.isArray,uh=/\/$/,fh=e=>e.replace(uh,"");function ea(e,t,n="/"){let o,r={},s="",d="";const f=t.indexOf("#");let A=t.indexOf("?");return f<A&&f>=0&&(A=-1),A>-1&&(o=t.slice(0,A),s=t.slice(A+1,f>-1?f:t.length),r=e(s)),f>-1&&(o=o||t.slice(0,f),d=t.slice(f,t.length)),o=mh(o??t,n),{fullPath:o+(s&&"?")+s+d,path:o,query:r,hash:d}}function hh(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function ml(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function Ah(e,t,n){const o=t.matched.length-1,r=n.matched.length-1;return o>-1&&o===r&&Ln(t.matched[o],n.matched[r])&&Hs(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function Ln(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Hs(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!yh(e[n],t[n]))return!1;return!0}function yh(e,t){return kt(e)?bl(e,t):kt(t)?bl(t,e):e===t}function bl(e,t){return kt(t)?e.length===t.length&&e.every((n,o)=>n===t[o]):e.length===1&&e[0]===t}function mh(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),o=e.split("/"),r=o[o.length-1];(r===".."||r===".")&&o.push("");let s=n.length-1,d,f;for(d=0;d<o.length;d++)if(f=o[d],f!==".")if(f==="..")s>1&&s--;else break;return n.slice(0,s).join("/")+"/"+o.slice(d-(d===o.length?1:0)).join("/")}var wo;(function(e){e.pop="pop",e.push="push"})(wo||(wo={}));var yo;(function(e){e.back="back",e.forward="forward",e.unknown=""})(yo||(yo={}));function bh(e){if(!e)if(vn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),fh(e)}const gh=/^[^#]+#/;function vh(e,t){return e.replace(gh,"#")+t}function xh(e,t){const n=document.documentElement.getBoundingClientRect(),o=e.getBoundingClientRect();return{behavior:t.behavior,left:o.left-n.left-(t.left||0),top:o.top-n.top-(t.top||0)}}const kr=()=>({left:window.pageXOffset,top:window.pageYOffset});function Eh(e){let t;if("el"in e){const n=e.el,o=typeof n=="string"&&n.startsWith("#"),r=typeof n=="string"?o?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!r)return;t=xh(r,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function gl(e,t){return(history.state?history.state.position-t:-1)+e}const va=new Map;function kh(e,t){va.set(e,t)}function wh(e){const t=va.get(e);return va.delete(e),t}let Ch=()=>location.protocol+"//"+location.host;function Ws(e,t){const{pathname:n,search:o,hash:r}=t,s=e.indexOf("#");if(s>-1){let f=r.includes(e.slice(s))?e.slice(s).length:1,A=r.slice(f);return A[0]!=="/"&&(A="/"+A),ml(A,"")}return ml(n,e)+o+r}function Bh(e,t,n,o){let r=[],s=[],d=null;const f=({state:h})=>{const C=Ws(e,location),B=n.value,w=t.value;let I=0;if(h){if(n.value=C,t.value=h,d&&d===B){d=null;return}I=w?h.position-w.position:0}else o(C);r.forEach(_=>{_(n.value,B,{delta:I,type:wo.pop,direction:I?I>0?yo.forward:yo.back:yo.unknown})})};function A(){d=n.value}function m(h){r.push(h);const C=()=>{const B=r.indexOf(h);B>-1&&r.splice(B,1)};return s.push(C),C}function b(){const{history:h}=window;h.state&&h.replaceState(_e({},h.state,{scroll:kr()}),"")}function g(){for(const h of s)h();s=[],window.removeEventListener("popstate",f),window.removeEventListener("beforeunload",b)}return window.addEventListener("popstate",f),window.addEventListener("beforeunload",b,{passive:!0}),{pauseListeners:A,listen:m,destroy:g}}function vl(e,t,n,o=!1,r=!1){return{back:e,current:t,forward:n,replaced:o,position:window.history.length,scroll:r?kr():null}}function Sh(e){const{history:t,location:n}=window,o={value:Ws(e,n)},r={value:t.state};r.value||s(o.value,{back:null,current:o.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function s(A,m,b){const g=e.indexOf("#"),h=g>-1?(n.host&&document.querySelector("base")?e:e.slice(g))+A:Ch()+e+A;try{t[b?"replaceState":"pushState"](m,"",h),r.value=m}catch(C){console.error(C),n[b?"replace":"assign"](h)}}function d(A,m){const b=_e({},t.state,vl(r.value.back,A,r.value.forward,!0),m,{position:r.value.position});s(A,b,!0),o.value=A}function f(A,m){const b=_e({},r.value,t.state,{forward:A,scroll:kr()});s(b.current,b,!0);const g=_e({},vl(o.value,A,null),{position:b.position+1},m);s(A,g,!1),o.value=A}return{location:o,state:r,push:f,replace:d}}function Lh(e){e=bh(e);const t=Sh(e),n=Bh(e,t.state,t.location,t.replace);function o(s,d=!0){d||n.pauseListeners(),history.go(s)}const r=_e({location:"",base:e,go:o,createHref:vh.bind(null,e)},t,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>t.state.value}),r}function _h(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),Lh(e)}function Ih(e){return typeof e=="string"||e&&typeof e=="object"}function Us(e){return typeof e=="string"||typeof e=="symbol"}const Yt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Ys=Symbol("");var xl;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(xl||(xl={}));function _n(e,t){return _e(new Error,{type:e,[Ys]:!0},t)}function Rt(e,t){return e instanceof Error&&Ys in e&&(t==null||!!(e.type&t))}const El="[^/]+?",Th={sensitive:!1,strict:!1,start:!0,end:!0},Oh=/[.+*?^${}()[\]/\\]/g;function Rh(e,t){const n=_e({},Th,t),o=[];let r=n.start?"^":"";const s=[];for(const m of e){const b=m.length?[]:[90];n.strict&&!m.length&&(r+="/");for(let g=0;g<m.length;g++){const h=m[g];let C=40+(n.sensitive?.25:0);if(h.type===0)g||(r+="/"),r+=h.value.replace(Oh,"\\$&"),C+=40;else if(h.type===1){const{value:B,repeatable:w,optional:I,regexp:_}=h;s.push({name:B,repeatable:w,optional:I});const O=_||El;if(O!==El){C+=10;try{new RegExp(`(${O})`)}catch(D){throw new Error(`Invalid custom RegExp for param "${B}" (${O}): `+D.message)}}let U=w?`((?:${O})(?:/(?:${O}))*)`:`(${O})`;g||(U=I&&m.length<2?`(?:/${U})`:"/"+U),I&&(U+="?"),r+=U,C+=20,I&&(C+=-8),w&&(C+=-20),O===".*"&&(C+=-50)}b.push(C)}o.push(b)}if(n.strict&&n.end){const m=o.length-1;o[m][o[m].length-1]+=.7000000000000001}n.strict||(r+="/?"),n.end?r+="$":n.strict&&(r+="(?:/|$)");const d=new RegExp(r,n.sensitive?"":"i");function f(m){const b=m.match(d),g={};if(!b)return null;for(let h=1;h<b.length;h++){const C=b[h]||"",B=s[h-1];g[B.name]=C&&B.repeatable?C.split("/"):C}return g}function A(m){let b="",g=!1;for(const h of e){(!g||!b.endsWith("/"))&&(b+="/"),g=!1;for(const C of h)if(C.type===0)b+=C.value;else if(C.type===1){const{value:B,repeatable:w,optional:I}=C,_=B in m?m[B]:"";if(kt(_)&&!w)throw new Error(`Provided param "${B}" is an array but it is not repeatable (* or + modifiers)`);const O=kt(_)?_.join("/"):_;if(!O)if(I)h.length<2&&(b.endsWith("/")?b=b.slice(0,-1):g=!0);else throw new Error(`Missing required param "${B}"`);b+=O}}return b||"/"}return{re:d,score:o,keys:s,parse:f,stringify:A}}function Ph(e,t){let n=0;for(;n<e.length&&n<t.length;){const o=t[n]-e[n];if(o)return o;n++}return e.length<t.length?e.length===1&&e[0]===40+40?-1:1:e.length>t.length?t.length===1&&t[0]===40+40?1:-1:0}function jh(e,t){let n=0;const o=e.score,r=t.score;for(;n<o.length&&n<r.length;){const s=Ph(o[n],r[n]);if(s)return s;n++}if(Math.abs(r.length-o.length)===1){if(kl(o))return 1;if(kl(r))return-1}return r.length-o.length}function kl(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const zh={type:0,value:""},Mh=/[a-zA-Z0-9_]/;function Dh(e){if(!e)return[[]];if(e==="/")return[[zh]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(C){throw new Error(`ERR (${n})/"${m}": ${C}`)}let n=0,o=n;const r=[];let s;function d(){s&&r.push(s),s=[]}let f=0,A,m="",b="";function g(){m&&(n===0?s.push({type:0,value:m}):n===1||n===2||n===3?(s.length>1&&(A==="*"||A==="+")&&t(`A repeatable param (${m}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:m,regexp:b,repeatable:A==="*"||A==="+",optional:A==="*"||A==="?"})):t("Invalid state to consume buffer"),m="")}function h(){m+=A}for(;f<e.length;){if(A=e[f++],A==="\\"&&n!==2){o=n,n=4;continue}switch(n){case 0:A==="/"?(m&&g(),d()):A===":"?(g(),n=1):h();break;case 4:h(),n=o;break;case 1:A==="("?n=2:Mh.test(A)?h():(g(),n=0,A!=="*"&&A!=="?"&&A!=="+"&&f--);break;case 2:A===")"?b[b.length-1]=="\\"?b=b.slice(0,-1)+A:n=3:b+=A;break;case 3:g(),n=0,A!=="*"&&A!=="?"&&A!=="+"&&f--,b="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${m}"`),g(),d(),r}function Fh(e,t,n){const o=Rh(Dh(e.path),n),r=_e(o,{record:e,parent:t,children:[],alias:[]});return t&&!r.record.aliasOf==!t.record.aliasOf&&t.children.push(r),r}function qh(e,t){const n=[],o=new Map;t=Bl({strict:!1,end:!0,sensitive:!1},t);function r(b){return o.get(b)}function s(b,g,h){const C=!h,B=Nh(b);B.aliasOf=h&&h.record;const w=Bl(t,b),I=[B];if("alias"in b){const U=typeof b.alias=="string"?[b.alias]:b.alias;for(const D of U)I.push(_e({},B,{components:h?h.record.components:B.components,path:D,aliasOf:h?h.record:B}))}let _,O;for(const U of I){const{path:D}=U;if(g&&D[0]!=="/"){const fe=g.record.path,Be=fe[fe.length-1]==="/"?"":"/";U.path=g.record.path+(D&&Be+D)}if(_=Fh(U,g,w),h?h.alias.push(_):(O=O||_,O!==_&&O.alias.push(_),C&&b.name&&!Cl(_)&&d(b.name)),B.children){const fe=B.children;for(let Be=0;Be<fe.length;Be++)s(fe[Be],_,h&&h.children[Be])}h=h||_,(_.record.components&&Object.keys(_.record.components).length||_.record.name||_.record.redirect)&&A(_)}return O?()=>{d(O)}:Ao}function d(b){if(Us(b)){const g=o.get(b);g&&(o.delete(b),n.splice(n.indexOf(g),1),g.children.forEach(d),g.alias.forEach(d))}else{const g=n.indexOf(b);g>-1&&(n.splice(g,1),b.record.name&&o.delete(b.record.name),b.children.forEach(d),b.alias.forEach(d))}}function f(){return n}function A(b){let g=0;for(;g<n.length&&jh(b,n[g])>=0&&(b.record.path!==n[g].record.path||!Ks(b,n[g]));)g++;n.splice(g,0,b),b.record.name&&!Cl(b)&&o.set(b.record.name,b)}function m(b,g){let h,C={},B,w;if("name"in b&&b.name){if(h=o.get(b.name),!h)throw _n(1,{location:b});w=h.record.name,C=_e(wl(g.params,h.keys.filter(O=>!O.optional).map(O=>O.name)),b.params&&wl(b.params,h.keys.map(O=>O.name))),B=h.stringify(C)}else if("path"in b)B=b.path,h=n.find(O=>O.re.test(B)),h&&(C=h.parse(B),w=h.record.name);else{if(h=g.name?o.get(g.name):n.find(O=>O.re.test(g.path)),!h)throw _n(1,{location:b,currentLocation:g});w=h.record.name,C=_e({},g.params,b.params),B=h.stringify(C)}const I=[];let _=h;for(;_;)I.unshift(_.record),_=_.parent;return{name:w,path:B,params:C,matched:I,meta:Wh(I)}}return e.forEach(b=>s(b)),{addRoute:s,resolve:m,removeRoute:d,getRoutes:f,getRecordMatcher:r}}function wl(e,t){const n={};for(const o of t)o in e&&(n[o]=e[o]);return n}function Nh(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:Hh(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function Hh(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const o in e.components)t[o]=typeof n=="object"?n[o]:n;return t}function Cl(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Wh(e){return e.reduce((t,n)=>_e(t,n.meta),{})}function Bl(e,t){const n={};for(const o in e)n[o]=o in t?t[o]:e[o];return n}function Ks(e,t){return t.children.some(n=>n===e||Ks(e,n))}const Vs=/#/g,Uh=/&/g,Yh=/\//g,Kh=/=/g,Vh=/\?/g,Qs=/\+/g,Qh=/%5B/g,$h=/%5D/g,$s=/%5E/g,Zh=/%60/g,Zs=/%7B/g,Jh=/%7C/g,Js=/%7D/g,Xh=/%20/g;function $a(e){return encodeURI(""+e).replace(Jh,"|").replace(Qh,"[").replace($h,"]")}function Gh(e){return $a(e).replace(Zs,"{").replace(Js,"}").replace($s,"^")}function xa(e){return $a(e).replace(Qs,"%2B").replace(Xh,"+").replace(Vs,"%23").replace(Uh,"%26").replace(Zh,"`").replace(Zs,"{").replace(Js,"}").replace($s,"^")}function eA(e){return xa(e).replace(Kh,"%3D")}function tA(e){return $a(e).replace(Vs,"%23").replace(Vh,"%3F")}function nA(e){return e==null?"":tA(e).replace(Yh,"%2F")}function sr(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function oA(e){const t={};if(e===""||e==="?")return t;const o=(e[0]==="?"?e.slice(1):e).split("&");for(let r=0;r<o.length;++r){const s=o[r].replace(Qs," "),d=s.indexOf("="),f=sr(d<0?s:s.slice(0,d)),A=d<0?null:sr(s.slice(d+1));if(f in t){let m=t[f];kt(m)||(m=t[f]=[m]),m.push(A)}else t[f]=A}return t}function Sl(e){let t="";for(let n in e){const o=e[n];if(n=eA(n),o==null){o!==void 0&&(t+=(t.length?"&":"")+n);continue}(kt(o)?o.map(s=>s&&xa(s)):[o&&xa(o)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+n,s!=null&&(t+="="+s))})}return t}function rA(e){const t={};for(const n in e){const o=e[n];o!==void 0&&(t[n]=kt(o)?o.map(r=>r==null?null:""+r):o==null?o:""+o)}return t}const aA=Symbol(""),Ll=Symbol(""),wr=Symbol(""),Za=Symbol(""),Ea=Symbol("");function io(){let e=[];function t(o){return e.push(o),()=>{const r=e.indexOf(o);r>-1&&e.splice(r,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function Qt(e,t,n,o,r){const s=o&&(o.enterCallbacks[r]=o.enterCallbacks[r]||[]);return()=>new Promise((d,f)=>{const A=g=>{g===!1?f(_n(4,{from:n,to:t})):g instanceof Error?f(g):Ih(g)?f(_n(2,{from:t,to:g})):(s&&o.enterCallbacks[r]===s&&typeof g=="function"&&s.push(g),d())},m=e.call(o&&o.instances[r],t,n,A);let b=Promise.resolve(m);e.length<3&&(b=b.then(A)),b.catch(g=>f(g))})}function ta(e,t,n,o){const r=[];for(const s of e)for(const d in s.components){let f=s.components[d];if(!(t!=="beforeRouteEnter"&&!s.instances[d]))if(iA(f)){const m=(f.__vccOpts||f)[t];m&&r.push(Qt(m,n,o,s,d))}else{let A=f();r.push(()=>A.then(m=>{if(!m)return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${s.path}"`));const b=ph(m)?m.default:m;s.components[d]=b;const h=(b.__vccOpts||b)[t];return h&&Qt(h,n,o,s,d)()}))}}return r}function iA(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function _l(e){const t=ht(wr),n=ht(Za),o=vt(()=>t.resolve(Ie(e.to))),r=vt(()=>{const{matched:A}=o.value,{length:m}=A,b=A[m-1],g=n.matched;if(!b||!g.length)return-1;const h=g.findIndex(Ln.bind(null,b));if(h>-1)return h;const C=Il(A[m-2]);return m>1&&Il(b)===C&&g[g.length-1].path!==C?g.findIndex(Ln.bind(null,A[m-2])):h}),s=vt(()=>r.value>-1&&dA(n.params,o.value.params)),d=vt(()=>r.value>-1&&r.value===n.matched.length-1&&Hs(n.params,o.value.params));function f(A={}){return cA(A)?t[Ie(e.replace)?"replace":"push"](Ie(e.to)).catch(Ao):Promise.resolve()}return{route:o,href:vt(()=>o.value.href),isActive:s,isExactActive:d,navigate:f}}const lA=Cs({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:_l,setup(e,{slots:t}){const n=Ar(_l(e)),{options:o}=ht(wr),r=vt(()=>({[Tl(e.activeClass,o.linkActiveClass,"router-link-active")]:n.isActive,[Tl(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const s=t.default&&t.default(n);return e.custom?s:Qa("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:r.value},s)}}}),sA=lA;function cA(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function dA(e,t){for(const n in t){const o=t[n],r=e[n];if(typeof o=="string"){if(o!==r)return!1}else if(!kt(r)||r.length!==o.length||o.some((s,d)=>s!==r[d]))return!1}return!0}function Il(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Tl=(e,t,n)=>e??t??n,pA=Cs({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const o=ht(Ea),r=vt(()=>e.route||o.value),s=ht(Ll,0),d=vt(()=>{let m=Ie(s);const{matched:b}=r.value;let g;for(;(g=b[m])&&!g.components;)m++;return m}),f=vt(()=>r.value.matched[d.value]);Qo(Ll,vt(()=>d.value+1)),Qo(aA,f),Qo(Ea,r);const A=Ye();return dn(()=>[A.value,f.value,e.name],([m,b,g],[h,C,B])=>{b&&(b.instances[g]=m,C&&C!==b&&m&&m===h&&(b.leaveGuards.size||(b.leaveGuards=C.leaveGuards),b.updateGuards.size||(b.updateGuards=C.updateGuards))),m&&b&&(!C||!Ln(b,C)||!h)&&(b.enterCallbacks[g]||[]).forEach(w=>w(m))},{flush:"post"}),()=>{const m=r.value,b=e.name,g=f.value,h=g&&g.components[b];if(!h)return Ol(n.default,{Component:h,route:m});const C=g.props[b],B=C?C===!0?m.params:typeof C=="function"?C(m):C:null,I=Qa(h,_e({},B,t,{onVnodeUnmounted:_=>{_.component.isUnmounted&&(g.instances[b]=null)},ref:A}));return Ol(n.default,{Component:I,route:m})||I}}});function Ol(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const uA=pA;function fA(e){const t=qh(e.routes,e),n=e.parseQuery||oA,o=e.stringifyQuery||Sl,r=e.history,s=io(),d=io(),f=io(),A=mu(Yt);let m=Yt;vn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const b=Gr.bind(null,z=>""+z),g=Gr.bind(null,nA),h=Gr.bind(null,sr);function C(z,J){let K,oe;return Us(z)?(K=t.getRecordMatcher(z),oe=J):oe=z,t.addRoute(oe,K)}function B(z){const J=t.getRecordMatcher(z);J&&t.removeRoute(J)}function w(){return t.getRoutes().map(z=>z.record)}function I(z){return!!t.getRecordMatcher(z)}function _(z,J){if(J=_e({},J||A.value),typeof z=="string"){const S=ea(n,z,J.path),R=t.resolve({path:S.path},J),M=r.createHref(S.fullPath);return _e(S,R,{params:h(R.params),hash:sr(S.hash),redirectedFrom:void 0,href:M})}let K;if("path"in z)K=_e({},z,{path:ea(n,z.path,J.path).path});else{const S=_e({},z.params);for(const R in S)S[R]==null&&delete S[R];K=_e({},z,{params:g(S)}),J.params=g(J.params)}const oe=t.resolve(K,J),we=z.hash||"";oe.params=b(h(oe.params));const E=hh(o,_e({},z,{hash:Gh(we),path:oe.path})),k=r.createHref(E);return _e({fullPath:E,hash:we,query:o===Sl?rA(z.query):z.query||{}},oe,{redirectedFrom:void 0,href:k})}function O(z){return typeof z=="string"?ea(n,z,A.value.path):_e({},z)}function U(z,J){if(m!==z)return _n(8,{from:J,to:z})}function D(z){return Ue(z)}function fe(z){return D(_e(O(z),{replace:!0}))}function Be(z){const J=z.matched[z.matched.length-1];if(J&&J.redirect){const{redirect:K}=J;let oe=typeof K=="function"?K(z):K;return typeof oe=="string"&&(oe=oe.includes("?")||oe.includes("#")?oe=O(oe):{path:oe},oe.params={}),_e({query:z.query,hash:z.hash,params:"path"in oe?{}:z.params},oe)}}function Ue(z,J){const K=m=_(z),oe=A.value,we=z.state,E=z.force,k=z.replace===!0,S=Be(K);if(S)return Ue(_e(O(S),{state:typeof S=="object"?_e({},we,S.state):we,force:E,replace:k}),J||K);const R=K;R.redirectedFrom=J;let M;return!E&&Ah(o,oe,K)&&(M=_n(16,{to:R,from:oe}),ke(oe,oe,!0,!1)),(M?Promise.resolve(M):ie(R,oe)).catch(N=>Rt(N)?Rt(N,2)?N:me(N):be(N,R,oe)).then(N=>{if(N){if(Rt(N,2))return Ue(_e({replace:k},O(N.to),{state:typeof N.to=="object"?_e({},we,N.to.state):we,force:E}),J||R)}else N=ee(R,oe,!0,k,we);return Me(R,oe,N),N})}function pe(z,J){const K=U(z,J);return K?Promise.reject(K):Promise.resolve()}function Le(z){const J=dt.values().next().value;return J&&typeof J.runWithContext=="function"?J.runWithContext(z):z()}function ie(z,J){let K;const[oe,we,E]=hA(z,J);K=ta(oe.reverse(),"beforeRouteLeave",z,J);for(const S of oe)S.leaveGuards.forEach(R=>{K.push(Qt(R,z,J))});const k=pe.bind(null,z,J);return K.push(k),je(K).then(()=>{K=[];for(const S of s.list())K.push(Qt(S,z,J));return K.push(k),je(K)}).then(()=>{K=ta(we,"beforeRouteUpdate",z,J);for(const S of we)S.updateGuards.forEach(R=>{K.push(Qt(R,z,J))});return K.push(k),je(K)}).then(()=>{K=[];for(const S of E)if(S.beforeEnter)if(kt(S.beforeEnter))for(const R of S.beforeEnter)K.push(Qt(R,z,J));else K.push(Qt(S.beforeEnter,z,J));return K.push(k),je(K)}).then(()=>(z.matched.forEach(S=>S.enterCallbacks={}),K=ta(E,"beforeRouteEnter",z,J),K.push(k),je(K))).then(()=>{K=[];for(const S of d.list())K.push(Qt(S,z,J));return K.push(k),je(K)}).catch(S=>Rt(S,8)?S:Promise.reject(S))}function Me(z,J,K){f.list().forEach(oe=>Le(()=>oe(z,J,K)))}function ee(z,J,K,oe,we){const E=U(z,J);if(E)return E;const k=J===Yt,S=vn?history.state:{};K&&(oe||k?r.replace(z.fullPath,_e({scroll:k&&S&&S.scroll},we)):r.push(z.fullPath,we)),A.value=z,ke(z,J,K,k),me()}let ye;function Fe(){ye||(ye=r.listen((z,J,K)=>{if(!Dt.listening)return;const oe=_(z),we=Be(oe);if(we){Ue(_e(we,{replace:!0}),oe).catch(Ao);return}m=oe;const E=A.value;vn&&kh(gl(E.fullPath,K.delta),kr()),ie(oe,E).catch(k=>Rt(k,12)?k:Rt(k,2)?(Ue(k.to,oe).then(S=>{Rt(S,20)&&!K.delta&&K.type===wo.pop&&r.go(-1,!1)}).catch(Ao),Promise.reject()):(K.delta&&r.go(-K.delta,!1),be(k,oe,E))).then(k=>{k=k||ee(oe,E,!1),k&&(K.delta&&!Rt(k,8)?r.go(-K.delta,!1):K.type===wo.pop&&Rt(k,20)&&r.go(-1,!1)),Me(oe,E,k)}).catch(Ao)}))}let it=io(),Re=io(),ge;function be(z,J,K){me(z);const oe=Re.list();return oe.length?oe.forEach(we=>we(z,J,K)):console.error(z),Promise.reject(z)}function H(){return ge&&A.value!==Yt?Promise.resolve():new Promise((z,J)=>{it.add([z,J])})}function me(z){return ge||(ge=!z,Fe(),it.list().forEach(([J,K])=>z?K(z):J()),it.reset()),z}function ke(z,J,K,oe){const{scrollBehavior:we}=e;if(!vn||!we)return Promise.resolve();const E=!K&&wh(gl(z.fullPath,0))||(oe||!K)&&history.state&&history.state.scroll||null;return nr().then(()=>we(z,J,E)).then(k=>k&&Eh(k)).catch(k=>be(k,z,J))}const Pe=z=>r.go(z);let ot;const dt=new Set,Dt={currentRoute:A,listening:!0,addRoute:C,removeRoute:B,hasRoute:I,getRoutes:w,resolve:_,options:e,push:D,replace:fe,go:Pe,back:()=>Pe(-1),forward:()=>Pe(1),beforeEach:s.add,beforeResolve:d.add,afterEach:f.add,onError:Re.add,isReady:H,install(z){const J=this;z.component("RouterLink",sA),z.component("RouterView",uA),z.config.globalProperties.$router=J,Object.defineProperty(z.config.globalProperties,"$route",{enumerable:!0,get:()=>Ie(A)}),vn&&!ot&&A.value===Yt&&(ot=!0,D(r.location).catch(we=>{}));const K={};for(const we in Yt)Object.defineProperty(K,we,{get:()=>A.value[we],enumerable:!0});z.provide(wr,J),z.provide(Za,ls(K)),z.provide(Ea,A);const oe=z.unmount;dt.add(z),z.unmount=function(){dt.delete(z),dt.size<1&&(m=Yt,ye&&ye(),ye=null,A.value=Yt,ot=!1,ge=!1),oe()}}};function je(z){return z.reduce((J,K)=>J.then(()=>Le(K)),Promise.resolve())}return Dt}function hA(e,t){const n=[],o=[],r=[],s=Math.max(t.matched.length,e.matched.length);for(let d=0;d<s;d++){const f=t.matched[d];f&&(e.matched.find(m=>Ln(m,f))?o.push(f):n.push(f));const A=e.matched[d];A&&(t.matched.find(m=>Ln(m,A))||r.push(A))}return[n,o,r]}function AA(){return ht(wr)}function Ja(){return ht(Za)}var yA={size:"1em",strokeWidth:4,strokeLinecap:"round",strokeLinejoin:"round",rtl:!1,theme:"outline",colors:{outline:{fill:"#333",background:"transparent"},filled:{fill:"#333",background:"#FFF"},twoTone:{fill:"#333",twoTone:"#2F88FF"},multiColor:{outStrokeColor:"#333",outFillColor:"#2F88FF",innerStrokeColor:"#FFF",innerFillColor:"#43CCF8"}},prefix:"i"};function mA(){return"icon-"+((1+Math.random())*4294967296|0).toString(16).substring(1)}function bA(e,t,n){var o=typeof t.fill=="string"?[t.fill]:t.fill||[],r=[],s=t.theme||n.theme;switch(s){case"outline":r.push(typeof o[0]=="string"?o[0]:"currentColor"),r.push("none"),r.push(typeof o[0]=="string"?o[0]:"currentColor"),r.push("none");break;case"filled":r.push(typeof o[0]=="string"?o[0]:"currentColor"),r.push(typeof o[0]=="string"?o[0]:"currentColor"),r.push("#FFF"),r.push("#FFF");break;case"two-tone":r.push(typeof o[0]=="string"?o[0]:"currentColor"),r.push(typeof o[1]=="string"?o[1]:n.colors.twoTone.twoTone),r.push(typeof o[0]=="string"?o[0]:"currentColor"),r.push(typeof o[1]=="string"?o[1]:n.colors.twoTone.twoTone);break;case"multi-color":r.push(typeof o[0]=="string"?o[0]:"currentColor"),r.push(typeof o[1]=="string"?o[1]:n.colors.multiColor.outFillColor),r.push(typeof o[2]=="string"?o[2]:n.colors.multiColor.innerStrokeColor),r.push(typeof o[3]=="string"?o[3]:n.colors.multiColor.innerFillColor);break}return{size:t.size||n.size,strokeWidth:t.strokeWidth||n.strokeWidth,strokeLinecap:t.strokeLinecap||n.strokeLinecap,strokeLinejoin:t.strokeLinejoin||n.strokeLinejoin,colors:r,id:e}}var gA=Symbol("icon-context");function at(e,t,n){var o={name:"icon-"+e,props:["size","strokeWidth","strokeLinecap","strokeLinejoin","theme","fill","spin"],setup:function(s){var d=mA(),f=ht(gA,yA);return function(){var A=s.size,m=s.strokeWidth,b=s.strokeLinecap,g=s.strokeLinejoin,h=s.theme,C=s.fill,B=s.spin,w=bA(d,{size:A,strokeWidth:m,strokeLinecap:b,strokeLinejoin:g,theme:h,fill:C},f),I=[f.prefix+"-icon"];return I.push(f.prefix+"-icon-"+e),t&&f.rtl&&I.push(f.prefix+"-icon-rtl"),B&&I.push(f.prefix+"-icon-spin"),q("span",{class:I.join(" ")},[n(w)])}}};return o}const Xs=at("adobe-photoshop",!0,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth},null),q("path",{d:"M14 15V33",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M16 25C19 25 23 24.2 23 20C23 15.8 19 15 16 15H14V25H16Z",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M34 21.0246C33 21.0246 28 20.5266 28 24.0123C28 27.4979 34 26.5021 34 29.9877C34 33.4734 28 32.9754 28 32.9754",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),vA=at("all-application",!1,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M18 6H8C6.89543 6 6 6.89543 6 8V18C6 19.1046 6.89543 20 8 20H18C19.1046 20 20 19.1046 20 18V8C20 6.89543 19.1046 6 18 6Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M18 28H8C6.89543 28 6 28.8954 6 30V40C6 41.1046 6.89543 42 8 42H18C19.1046 42 20 41.1046 20 40V30C20 28.8954 19.1046 28 18 28Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M40 6H30C28.8954 6 28 6.89543 28 8V18C28 19.1046 28.8954 20 30 20H40C41.1046 20 42 19.1046 42 18V8C42 6.89543 41.1046 6 40 6Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M40 28H30C28.8954 28 28 28.8954 28 30V40C28 41.1046 28.8954 42 30 42H40C41.1046 42 42 41.1046 42 40V30C42 28.8954 41.1046 28 40 28Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null)])}),xA=at("arrow-circle-left",!0,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M32.4917 24.5H14.4917",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M23.4917 15.5L14.4917 24.5L23.4917 33.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),EA=at("arrow-circle-right",!0,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M14.4917 24.5H32.4917",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M23.4917 15.5L32.4917 24.5L23.4917 33.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),Gs=at("audio-file",!0,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M8 44V4H31L40 14.5V44H8Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M32 14L26 16.9688V31.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("circle",{cx:"20.5",cy:"31.5",r:"5.5",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),kA=at("close",!1,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M8 8L40 40",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M8 40L40 8",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),ec=at("file-code-one",!0,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M40 23V14L31 4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44H22",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M37 31L42 36L37 41",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M31 31L26 36L31 41",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M30 4V14H40",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),tc=at("file-doc",!0,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M10 38V44H38V38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M38 20V14L30 4H10V20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M28 4V14H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M16 12H20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),q("rect",{x:"4",y:"20",width:"40",height:"18",rx:"2",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M10 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),q("path",{d:"M10 25H12C14.2091 25 16 26.7909 16 29V29C16 31.2091 14.2091 33 12 33H10",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("ellipse",{cx:"24",cy:"29",rx:"3",ry:"4",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M38 25H36C33.7909 25 32 26.7909 32 29V29C32 31.2091 33.7909 33 36 33H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),nc=at("file-excel",!0,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M10 4H30L40 14V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M29 18H19V34H29",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M29 26H19",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),oc=at("file-zip",!0,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M10 38V44H38V38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M38 20V14L30 4H10V20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M28 4V14H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M16 12H20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),q("rect",{x:"4",y:"20",width:"40",height:"18",rx:"2",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M11 25H17L11 33H17",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M24 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),q("path",{d:"M31 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),q("path",{d:"M31 25H34.5C35.8807 25 37 26.1193 37 27.5V27.5C37 28.8807 35.8807 30 34.5 30H31",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),wA=at("image-files",!0,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M10 44H38C39.1046 44 40 43.1046 40 42V14H30V4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M30 4L40 14",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("circle",{cx:"18",cy:"17",r:"4",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M15 28V37H33V21L23.4894 31.5L15 28Z",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),CA=at("list-bottom",!0,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M8 42C10.2091 42 12 40.2091 12 38C12 35.7909 10.2091 34 8 34C5.79086 34 4 35.7909 4 38C4 40.2091 5.79086 42 8 42Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M8 12C9.10457 12 10 11.1046 10 10C10 8.89543 9.10457 8 8 8C6.89543 8 6 8.89543 6 10C6 11.1046 6.89543 12 8 12Z",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M8 26C9.10457 26 10 25.1046 10 24C10 22.8954 9.10457 22 8 22C6.89543 22 6 22.8954 6 24C6 25.1046 6.89543 26 8 26Z",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M20 24H44",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M20 38H44",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M20 10H44",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),BA=at("return",!0,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M12.9998 8L6 14L12.9998 21",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),rc=at("seo-folder",!0,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M5 8C5 6.89543 5.89543 6 7 6H19L24 12H41C42.1046 12 43 12.8954 43 14V40C43 41.1046 42.1046 42 41 42H7C5.89543 42 5 41.1046 5 40V8Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M14 22L19 27L14 32",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M26 32H34",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null)])}),ac=at("video-two",!0,function(e){return q("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[q("path",{d:"M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M20.5 28V21.9378L25.75 24.9689L31 28L25.75 31.0311L20.5 34.0622V28Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M6 15H42",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M33 6L27 15",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),q("path",{d:"M21 6L15 15",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])});function ic(e,t){return function(){return e.apply(t,arguments)}}const{toString:SA}=Object.prototype,{getPrototypeOf:Xa}=Object,Cr=(e=>t=>{const n=SA.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),It=e=>(e=e.toLowerCase(),t=>Cr(t)===e),Br=e=>t=>typeof t===e,{isArray:Pn}=Array,Co=Br("undefined");function LA(e){return e!==null&&!Co(e)&&e.constructor!==null&&!Co(e.constructor)&&yt(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const lc=It("ArrayBuffer");function _A(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&lc(e.buffer),t}const IA=Br("string"),yt=Br("function"),sc=Br("number"),Sr=e=>e!==null&&typeof e=="object",TA=e=>e===!0||e===!1,Zo=e=>{if(Cr(e)!=="object")return!1;const t=Xa(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},OA=It("Date"),RA=It("File"),PA=It("Blob"),jA=It("FileList"),zA=e=>Sr(e)&&yt(e.pipe),MA=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||yt(e.append)&&((t=Cr(e))==="formdata"||t==="object"&&yt(e.toString)&&e.toString()==="[object FormData]"))},DA=It("URLSearchParams"),FA=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Lo(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let o,r;if(typeof e!="object"&&(e=[e]),Pn(e))for(o=0,r=e.length;o<r;o++)t.call(null,e[o],o,e);else{const s=n?Object.getOwnPropertyNames(e):Object.keys(e),d=s.length;let f;for(o=0;o<d;o++)f=s[o],t.call(null,e[f],f,e)}}function cc(e,t){t=t.toLowerCase();const n=Object.keys(e);let o=n.length,r;for(;o-- >0;)if(r=n[o],t===r.toLowerCase())return r;return null}const dc=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),pc=e=>!Co(e)&&e!==dc;function ka(){const{caseless:e}=pc(this)&&this||{},t={},n=(o,r)=>{const s=e&&cc(t,r)||r;Zo(t[s])&&Zo(o)?t[s]=ka(t[s],o):Zo(o)?t[s]=ka({},o):Pn(o)?t[s]=o.slice():t[s]=o};for(let o=0,r=arguments.length;o<r;o++)arguments[o]&&Lo(arguments[o],n);return t}const qA=(e,t,n,{allOwnKeys:o}={})=>(Lo(t,(r,s)=>{n&&yt(r)?e[s]=ic(r,n):e[s]=r},{allOwnKeys:o}),e),NA=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),HA=(e,t,n,o)=>{e.prototype=Object.create(t.prototype,o),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},WA=(e,t,n,o)=>{let r,s,d;const f={};if(t=t||{},e==null)return t;do{for(r=Object.getOwnPropertyNames(e),s=r.length;s-- >0;)d=r[s],(!o||o(d,e,t))&&!f[d]&&(t[d]=e[d],f[d]=!0);e=n!==!1&&Xa(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},UA=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const o=e.indexOf(t,n);return o!==-1&&o===n},YA=e=>{if(!e)return null;if(Pn(e))return e;let t=e.length;if(!sc(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},KA=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Xa(Uint8Array)),VA=(e,t)=>{const o=(e&&e[Symbol.iterator]).call(e);let r;for(;(r=o.next())&&!r.done;){const s=r.value;t.call(e,s[0],s[1])}},QA=(e,t)=>{let n;const o=[];for(;(n=e.exec(t))!==null;)o.push(n);return o},$A=It("HTMLFormElement"),ZA=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,o,r){return o.toUpperCase()+r}),Rl=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),JA=It("RegExp"),uc=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),o={};Lo(n,(r,s)=>{t(r,s,e)!==!1&&(o[s]=r)}),Object.defineProperties(e,o)},XA=e=>{uc(e,(t,n)=>{if(yt(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const o=e[n];if(yt(o)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},GA=(e,t)=>{const n={},o=r=>{r.forEach(s=>{n[s]=!0})};return Pn(e)?o(e):o(String(e).split(t)),n},ey=()=>{},ty=(e,t)=>(e=+e,Number.isFinite(e)?e:t),na="abcdefghijklmnopqrstuvwxyz",Pl="0123456789",fc={DIGIT:Pl,ALPHA:na,ALPHA_DIGIT:na+na.toUpperCase()+Pl},ny=(e=16,t=fc.ALPHA_DIGIT)=>{let n="";const{length:o}=t;for(;e--;)n+=t[Math.random()*o|0];return n};function oy(e){return!!(e&&yt(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const ry=e=>{const t=new Array(10),n=(o,r)=>{if(Sr(o)){if(t.indexOf(o)>=0)return;if(!("toJSON"in o)){t[r]=o;const s=Pn(o)?[]:{};return Lo(o,(d,f)=>{const A=n(d,r+1);!Co(A)&&(s[f]=A)}),t[r]=void 0,s}}return o};return n(e,0)},ay=It("AsyncFunction"),iy=e=>e&&(Sr(e)||yt(e))&&yt(e.then)&&yt(e.catch),j={isArray:Pn,isArrayBuffer:lc,isBuffer:LA,isFormData:MA,isArrayBufferView:_A,isString:IA,isNumber:sc,isBoolean:TA,isObject:Sr,isPlainObject:Zo,isUndefined:Co,isDate:OA,isFile:RA,isBlob:PA,isRegExp:JA,isFunction:yt,isStream:zA,isURLSearchParams:DA,isTypedArray:KA,isFileList:jA,forEach:Lo,merge:ka,extend:qA,trim:FA,stripBOM:NA,inherits:HA,toFlatObject:WA,kindOf:Cr,kindOfTest:It,endsWith:UA,toArray:YA,forEachEntry:VA,matchAll:QA,isHTMLForm:$A,hasOwnProperty:Rl,hasOwnProp:Rl,reduceDescriptors:uc,freezeMethods:XA,toObjectSet:GA,toCamelCase:ZA,noop:ey,toFiniteNumber:ty,findKey:cc,global:dc,isContextDefined:pc,ALPHABET:fc,generateString:ny,isSpecCompliantForm:oy,toJSONObject:ry,isAsyncFn:ay,isThenable:iy};function Ee(e,t,n,o,r){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),o&&(this.request=o),r&&(this.response=r)}j.inherits(Ee,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:j.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const hc=Ee.prototype,Ac={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Ac[e]={value:e}});Object.defineProperties(Ee,Ac);Object.defineProperty(hc,"isAxiosError",{value:!0});Ee.from=(e,t,n,o,r,s)=>{const d=Object.create(hc);return j.toFlatObject(e,d,function(A){return A!==Error.prototype},f=>f!=="isAxiosError"),Ee.call(d,e.message,t,n,o,r),d.cause=e,d.name=e.name,s&&Object.assign(d,s),d};const ly=null;function wa(e){return j.isPlainObject(e)||j.isArray(e)}function yc(e){return j.endsWith(e,"[]")?e.slice(0,-2):e}function jl(e,t,n){return e?e.concat(t).map(function(r,s){return r=yc(r),!n&&s?"["+r+"]":r}).join(n?".":""):t}function sy(e){return j.isArray(e)&&!e.some(wa)}const cy=j.toFlatObject(j,{},null,function(t){return/^is[A-Z]/.test(t)});function Lr(e,t,n){if(!j.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=j.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(w,I){return!j.isUndefined(I[w])});const o=n.metaTokens,r=n.visitor||b,s=n.dots,d=n.indexes,A=(n.Blob||typeof Blob<"u"&&Blob)&&j.isSpecCompliantForm(t);if(!j.isFunction(r))throw new TypeError("visitor must be a function");function m(B){if(B===null)return"";if(j.isDate(B))return B.toISOString();if(!A&&j.isBlob(B))throw new Ee("Blob is not supported. Use a Buffer instead.");return j.isArrayBuffer(B)||j.isTypedArray(B)?A&&typeof Blob=="function"?new Blob([B]):Buffer.from(B):B}function b(B,w,I){let _=B;if(B&&!I&&typeof B=="object"){if(j.endsWith(w,"{}"))w=o?w:w.slice(0,-2),B=JSON.stringify(B);else if(j.isArray(B)&&sy(B)||(j.isFileList(B)||j.endsWith(w,"[]"))&&(_=j.toArray(B)))return w=yc(w),_.forEach(function(U,D){!(j.isUndefined(U)||U===null)&&t.append(d===!0?jl([w],D,s):d===null?w:w+"[]",m(U))}),!1}return wa(B)?!0:(t.append(jl(I,w,s),m(B)),!1)}const g=[],h=Object.assign(cy,{defaultVisitor:b,convertValue:m,isVisitable:wa});function C(B,w){if(!j.isUndefined(B)){if(g.indexOf(B)!==-1)throw Error("Circular reference detected in "+w.join("."));g.push(B),j.forEach(B,function(_,O){(!(j.isUndefined(_)||_===null)&&r.call(t,_,j.isString(O)?O.trim():O,w,h))===!0&&C(_,w?w.concat(O):[O])}),g.pop()}}if(!j.isObject(e))throw new TypeError("data must be an object");return C(e),t}function zl(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(o){return t[o]})}function Ga(e,t){this._pairs=[],e&&Lr(e,this,t)}const mc=Ga.prototype;mc.append=function(t,n){this._pairs.push([t,n])};mc.toString=function(t){const n=t?function(o){return t.call(this,o,zl)}:zl;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function dy(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function bc(e,t,n){if(!t)return e;const o=n&&n.encode||dy,r=n&&n.serialize;let s;if(r?s=r(t,n):s=j.isURLSearchParams(t)?t.toString():new Ga(t,n).toString(o),s){const d=e.indexOf("#");d!==-1&&(e=e.slice(0,d)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class py{constructor(){this.handlers=[]}use(t,n,o){return this.handlers.push({fulfilled:t,rejected:n,synchronous:o?o.synchronous:!1,runWhen:o?o.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){j.forEach(this.handlers,function(o){o!==null&&t(o)})}}const Ml=py,gc={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},uy=typeof URLSearchParams<"u"?URLSearchParams:Ga,fy=typeof FormData<"u"?FormData:null,hy=typeof Blob<"u"?Blob:null,Ay=(()=>{let e;return typeof navigator<"u"&&((e=navigator.product)==="ReactNative"||e==="NativeScript"||e==="NS")?!1:typeof window<"u"&&typeof document<"u"})(),yy=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),Lt={isBrowser:!0,classes:{URLSearchParams:uy,FormData:fy,Blob:hy},isStandardBrowserEnv:Ay,isStandardBrowserWebWorkerEnv:yy,protocols:["http","https","file","blob","url","data"]};function my(e,t){return Lr(e,new Lt.classes.URLSearchParams,Object.assign({visitor:function(n,o,r,s){return Lt.isNode&&j.isBuffer(n)?(this.append(o,n.toString("base64")),!1):s.defaultVisitor.apply(this,arguments)}},t))}function by(e){return j.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function gy(e){const t={},n=Object.keys(e);let o;const r=n.length;let s;for(o=0;o<r;o++)s=n[o],t[s]=e[s];return t}function vc(e){function t(n,o,r,s){let d=n[s++];const f=Number.isFinite(+d),A=s>=n.length;return d=!d&&j.isArray(r)?r.length:d,A?(j.hasOwnProp(r,d)?r[d]=[r[d],o]:r[d]=o,!f):((!r[d]||!j.isObject(r[d]))&&(r[d]=[]),t(n,o,r[d],s)&&j.isArray(r[d])&&(r[d]=gy(r[d])),!f)}if(j.isFormData(e)&&j.isFunction(e.entries)){const n={};return j.forEachEntry(e,(o,r)=>{t(by(o),r,n,0)}),n}return null}const vy={"Content-Type":void 0};function xy(e,t,n){if(j.isString(e))try{return(t||JSON.parse)(e),j.trim(e)}catch(o){if(o.name!=="SyntaxError")throw o}return(n||JSON.stringify)(e)}const _r={transitional:gc,adapter:["xhr","http"],transformRequest:[function(t,n){const o=n.getContentType()||"",r=o.indexOf("application/json")>-1,s=j.isObject(t);if(s&&j.isHTMLForm(t)&&(t=new FormData(t)),j.isFormData(t))return r&&r?JSON.stringify(vc(t)):t;if(j.isArrayBuffer(t)||j.isBuffer(t)||j.isStream(t)||j.isFile(t)||j.isBlob(t))return t;if(j.isArrayBufferView(t))return t.buffer;if(j.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let f;if(s){if(o.indexOf("application/x-www-form-urlencoded")>-1)return my(t,this.formSerializer).toString();if((f=j.isFileList(t))||o.indexOf("multipart/form-data")>-1){const A=this.env&&this.env.FormData;return Lr(f?{"files[]":t}:t,A&&new A,this.formSerializer)}}return s||r?(n.setContentType("application/json",!1),xy(t)):t}],transformResponse:[function(t){const n=this.transitional||_r.transitional,o=n&&n.forcedJSONParsing,r=this.responseType==="json";if(t&&j.isString(t)&&(o&&!this.responseType||r)){const d=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(t)}catch(f){if(d)throw f.name==="SyntaxError"?Ee.from(f,Ee.ERR_BAD_RESPONSE,this,null,this.response):f}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Lt.classes.FormData,Blob:Lt.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};j.forEach(["delete","get","head"],function(t){_r.headers[t]={}});j.forEach(["post","put","patch"],function(t){_r.headers[t]=j.merge(vy)});const ei=_r,Ey=j.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),ky=e=>{const t={};let n,o,r;return e&&e.split(`
`).forEach(function(d){r=d.indexOf(":"),n=d.substring(0,r).trim().toLowerCase(),o=d.substring(r+1).trim(),!(!n||t[n]&&Ey[n])&&(n==="set-cookie"?t[n]?t[n].push(o):t[n]=[o]:t[n]=t[n]?t[n]+", "+o:o)}),t},Dl=Symbol("internals");function lo(e){return e&&String(e).trim().toLowerCase()}function Jo(e){return e===!1||e==null?e:j.isArray(e)?e.map(Jo):String(e)}function wy(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let o;for(;o=n.exec(e);)t[o[1]]=o[2];return t}const Cy=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function oa(e,t,n,o,r){if(j.isFunction(o))return o.call(this,t,n);if(r&&(t=n),!!j.isString(t)){if(j.isString(o))return t.indexOf(o)!==-1;if(j.isRegExp(o))return o.test(t)}}function By(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,o)=>n.toUpperCase()+o)}function Sy(e,t){const n=j.toCamelCase(" "+t);["get","set","has"].forEach(o=>{Object.defineProperty(e,o+n,{value:function(r,s,d){return this[o].call(this,t,r,s,d)},configurable:!0})})}class Ir{constructor(t){t&&this.set(t)}set(t,n,o){const r=this;function s(f,A,m){const b=lo(A);if(!b)throw new Error("header name must be a non-empty string");const g=j.findKey(r,b);(!g||r[g]===void 0||m===!0||m===void 0&&r[g]!==!1)&&(r[g||A]=Jo(f))}const d=(f,A)=>j.forEach(f,(m,b)=>s(m,b,A));return j.isPlainObject(t)||t instanceof this.constructor?d(t,n):j.isString(t)&&(t=t.trim())&&!Cy(t)?d(ky(t),n):t!=null&&s(n,t,o),this}get(t,n){if(t=lo(t),t){const o=j.findKey(this,t);if(o){const r=this[o];if(!n)return r;if(n===!0)return wy(r);if(j.isFunction(n))return n.call(this,r,o);if(j.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=lo(t),t){const o=j.findKey(this,t);return!!(o&&this[o]!==void 0&&(!n||oa(this,this[o],o,n)))}return!1}delete(t,n){const o=this;let r=!1;function s(d){if(d=lo(d),d){const f=j.findKey(o,d);f&&(!n||oa(o,o[f],f,n))&&(delete o[f],r=!0)}}return j.isArray(t)?t.forEach(s):s(t),r}clear(t){const n=Object.keys(this);let o=n.length,r=!1;for(;o--;){const s=n[o];(!t||oa(this,this[s],s,t,!0))&&(delete this[s],r=!0)}return r}normalize(t){const n=this,o={};return j.forEach(this,(r,s)=>{const d=j.findKey(o,s);if(d){n[d]=Jo(r),delete n[s];return}const f=t?By(s):String(s).trim();f!==s&&delete n[s],n[f]=Jo(r),o[f]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return j.forEach(this,(o,r)=>{o!=null&&o!==!1&&(n[r]=t&&j.isArray(o)?o.join(", "):o)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const o=new this(t);return n.forEach(r=>o.set(r)),o}static accessor(t){const o=(this[Dl]=this[Dl]={accessors:{}}).accessors,r=this.prototype;function s(d){const f=lo(d);o[f]||(Sy(r,d),o[f]=!0)}return j.isArray(t)?t.forEach(s):s(t),this}}Ir.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);j.freezeMethods(Ir.prototype);j.freezeMethods(Ir);const jt=Ir;function ra(e,t){const n=this||ei,o=t||n,r=jt.from(o.headers);let s=o.data;return j.forEach(e,function(f){s=f.call(n,s,r.normalize(),t?t.status:void 0)}),r.normalize(),s}function xc(e){return!!(e&&e.__CANCEL__)}function _o(e,t,n){Ee.call(this,e??"canceled",Ee.ERR_CANCELED,t,n),this.name="CanceledError"}j.inherits(_o,Ee,{__CANCEL__:!0});function Ly(e,t,n){const o=n.config.validateStatus;!n.status||!o||o(n.status)?e(n):t(new Ee("Request failed with status code "+n.status,[Ee.ERR_BAD_REQUEST,Ee.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const _y=Lt.isStandardBrowserEnv?function(){return{write:function(n,o,r,s,d,f){const A=[];A.push(n+"="+encodeURIComponent(o)),j.isNumber(r)&&A.push("expires="+new Date(r).toGMTString()),j.isString(s)&&A.push("path="+s),j.isString(d)&&A.push("domain="+d),f===!0&&A.push("secure"),document.cookie=A.join("; ")},read:function(n){const o=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return o?decodeURIComponent(o[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}();function Iy(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Ty(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function Ec(e,t){return e&&!Iy(t)?Ty(e,t):t}const Oy=Lt.isStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let o;function r(s){let d=s;return t&&(n.setAttribute("href",d),d=n.href),n.setAttribute("href",d),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return o=r(window.location.href),function(d){const f=j.isString(d)?r(d):d;return f.protocol===o.protocol&&f.host===o.host}}():function(){return function(){return!0}}();function Ry(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Py(e,t){e=e||10;const n=new Array(e),o=new Array(e);let r=0,s=0,d;return t=t!==void 0?t:1e3,function(A){const m=Date.now(),b=o[s];d||(d=m),n[r]=A,o[r]=m;let g=s,h=0;for(;g!==r;)h+=n[g++],g=g%e;if(r=(r+1)%e,r===s&&(s=(s+1)%e),m-d<t)return;const C=b&&m-b;return C?Math.round(h*1e3/C):void 0}}function Fl(e,t){let n=0;const o=Py(50,250);return r=>{const s=r.loaded,d=r.lengthComputable?r.total:void 0,f=s-n,A=o(f),m=s<=d;n=s;const b={loaded:s,total:d,progress:d?s/d:void 0,bytes:f,rate:A||void 0,estimated:A&&d&&m?(d-s)/A:void 0,event:r};b[t?"download":"upload"]=!0,e(b)}}const jy=typeof XMLHttpRequest<"u",zy=jy&&function(e){return new Promise(function(n,o){let r=e.data;const s=jt.from(e.headers).normalize(),d=e.responseType;let f;function A(){e.cancelToken&&e.cancelToken.unsubscribe(f),e.signal&&e.signal.removeEventListener("abort",f)}j.isFormData(r)&&(Lt.isStandardBrowserEnv||Lt.isStandardBrowserWebWorkerEnv?s.setContentType(!1):s.setContentType("multipart/form-data;",!1));let m=new XMLHttpRequest;if(e.auth){const C=e.auth.username||"",B=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";s.set("Authorization","Basic "+btoa(C+":"+B))}const b=Ec(e.baseURL,e.url);m.open(e.method.toUpperCase(),bc(b,e.params,e.paramsSerializer),!0),m.timeout=e.timeout;function g(){if(!m)return;const C=jt.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders()),w={data:!d||d==="text"||d==="json"?m.responseText:m.response,status:m.status,statusText:m.statusText,headers:C,config:e,request:m};Ly(function(_){n(_),A()},function(_){o(_),A()},w),m=null}if("onloadend"in m?m.onloadend=g:m.onreadystatechange=function(){!m||m.readyState!==4||m.status===0&&!(m.responseURL&&m.responseURL.indexOf("file:")===0)||setTimeout(g)},m.onabort=function(){m&&(o(new Ee("Request aborted",Ee.ECONNABORTED,e,m)),m=null)},m.onerror=function(){o(new Ee("Network Error",Ee.ERR_NETWORK,e,m)),m=null},m.ontimeout=function(){let B=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const w=e.transitional||gc;e.timeoutErrorMessage&&(B=e.timeoutErrorMessage),o(new Ee(B,w.clarifyTimeoutError?Ee.ETIMEDOUT:Ee.ECONNABORTED,e,m)),m=null},Lt.isStandardBrowserEnv){const C=(e.withCredentials||Oy(b))&&e.xsrfCookieName&&_y.read(e.xsrfCookieName);C&&s.set(e.xsrfHeaderName,C)}r===void 0&&s.setContentType(null),"setRequestHeader"in m&&j.forEach(s.toJSON(),function(B,w){m.setRequestHeader(w,B)}),j.isUndefined(e.withCredentials)||(m.withCredentials=!!e.withCredentials),d&&d!=="json"&&(m.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&m.addEventListener("progress",Fl(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&m.upload&&m.upload.addEventListener("progress",Fl(e.onUploadProgress)),(e.cancelToken||e.signal)&&(f=C=>{m&&(o(!C||C.type?new _o(null,e,m):C),m.abort(),m=null)},e.cancelToken&&e.cancelToken.subscribe(f),e.signal&&(e.signal.aborted?f():e.signal.addEventListener("abort",f)));const h=Ry(b);if(h&&Lt.protocols.indexOf(h)===-1){o(new Ee("Unsupported protocol "+h+":",Ee.ERR_BAD_REQUEST,e));return}m.send(r||null)})},Xo={http:ly,xhr:zy};j.forEach(Xo,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const My={getAdapter:e=>{e=j.isArray(e)?e:[e];const{length:t}=e;let n,o;for(let r=0;r<t&&(n=e[r],!(o=j.isString(n)?Xo[n.toLowerCase()]:n));r++);if(!o)throw o===!1?new Ee(`Adapter ${n} is not supported by the environment`,"ERR_NOT_SUPPORT"):new Error(j.hasOwnProp(Xo,n)?`Adapter '${n}' is not available in the build`:`Unknown adapter '${n}'`);if(!j.isFunction(o))throw new TypeError("adapter is not a function");return o},adapters:Xo};function aa(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new _o(null,e)}function ql(e){return aa(e),e.headers=jt.from(e.headers),e.data=ra.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),My.getAdapter(e.adapter||ei.adapter)(e).then(function(o){return aa(e),o.data=ra.call(e,e.transformResponse,o),o.headers=jt.from(o.headers),o},function(o){return xc(o)||(aa(e),o&&o.response&&(o.response.data=ra.call(e,e.transformResponse,o.response),o.response.headers=jt.from(o.response.headers))),Promise.reject(o)})}const Nl=e=>e instanceof jt?e.toJSON():e;function In(e,t){t=t||{};const n={};function o(m,b,g){return j.isPlainObject(m)&&j.isPlainObject(b)?j.merge.call({caseless:g},m,b):j.isPlainObject(b)?j.merge({},b):j.isArray(b)?b.slice():b}function r(m,b,g){if(j.isUndefined(b)){if(!j.isUndefined(m))return o(void 0,m,g)}else return o(m,b,g)}function s(m,b){if(!j.isUndefined(b))return o(void 0,b)}function d(m,b){if(j.isUndefined(b)){if(!j.isUndefined(m))return o(void 0,m)}else return o(void 0,b)}function f(m,b,g){if(g in t)return o(m,b);if(g in e)return o(void 0,m)}const A={url:s,method:s,data:s,baseURL:d,transformRequest:d,transformResponse:d,paramsSerializer:d,timeout:d,timeoutMessage:d,withCredentials:d,adapter:d,responseType:d,xsrfCookieName:d,xsrfHeaderName:d,onUploadProgress:d,onDownloadProgress:d,decompress:d,maxContentLength:d,maxBodyLength:d,beforeRedirect:d,transport:d,httpAgent:d,httpsAgent:d,cancelToken:d,socketPath:d,responseEncoding:d,validateStatus:f,headers:(m,b)=>r(Nl(m),Nl(b),!0)};return j.forEach(Object.keys(Object.assign({},e,t)),function(b){const g=A[b]||r,h=g(e[b],t[b],b);j.isUndefined(h)&&g!==f||(n[b]=h)}),n}const kc="1.4.0",ti={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{ti[e]=function(o){return typeof o===e||"a"+(t<1?"n ":" ")+e}});const Hl={};ti.transitional=function(t,n,o){function r(s,d){return"[Axios v"+kc+"] Transitional option '"+s+"'"+d+(o?". "+o:"")}return(s,d,f)=>{if(t===!1)throw new Ee(r(d," has been removed"+(n?" in "+n:"")),Ee.ERR_DEPRECATED);return n&&!Hl[d]&&(Hl[d]=!0,console.warn(r(d," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(s,d,f):!0}};function Dy(e,t,n){if(typeof e!="object")throw new Ee("options must be an object",Ee.ERR_BAD_OPTION_VALUE);const o=Object.keys(e);let r=o.length;for(;r-- >0;){const s=o[r],d=t[s];if(d){const f=e[s],A=f===void 0||d(f,s,e);if(A!==!0)throw new Ee("option "+s+" must be "+A,Ee.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new Ee("Unknown option "+s,Ee.ERR_BAD_OPTION)}}const Ca={assertOptions:Dy,validators:ti},Kt=Ca.validators;class cr{constructor(t){this.defaults=t,this.interceptors={request:new Ml,response:new Ml}}request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=In(this.defaults,n);const{transitional:o,paramsSerializer:r,headers:s}=n;o!==void 0&&Ca.assertOptions(o,{silentJSONParsing:Kt.transitional(Kt.boolean),forcedJSONParsing:Kt.transitional(Kt.boolean),clarifyTimeoutError:Kt.transitional(Kt.boolean)},!1),r!=null&&(j.isFunction(r)?n.paramsSerializer={serialize:r}:Ca.assertOptions(r,{encode:Kt.function,serialize:Kt.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let d;d=s&&j.merge(s.common,s[n.method]),d&&j.forEach(["delete","get","head","post","put","patch","common"],B=>{delete s[B]}),n.headers=jt.concat(d,s);const f=[];let A=!0;this.interceptors.request.forEach(function(w){typeof w.runWhen=="function"&&w.runWhen(n)===!1||(A=A&&w.synchronous,f.unshift(w.fulfilled,w.rejected))});const m=[];this.interceptors.response.forEach(function(w){m.push(w.fulfilled,w.rejected)});let b,g=0,h;if(!A){const B=[ql.bind(this),void 0];for(B.unshift.apply(B,f),B.push.apply(B,m),h=B.length,b=Promise.resolve(n);g<h;)b=b.then(B[g++],B[g++]);return b}h=f.length;let C=n;for(g=0;g<h;){const B=f[g++],w=f[g++];try{C=B(C)}catch(I){w.call(this,I);break}}try{b=ql.call(this,C)}catch(B){return Promise.reject(B)}for(g=0,h=m.length;g<h;)b=b.then(m[g++],m[g++]);return b}getUri(t){t=In(this.defaults,t);const n=Ec(t.baseURL,t.url);return bc(n,t.params,t.paramsSerializer)}}j.forEach(["delete","get","head","options"],function(t){cr.prototype[t]=function(n,o){return this.request(In(o||{},{method:t,url:n,data:(o||{}).data}))}});j.forEach(["post","put","patch"],function(t){function n(o){return function(s,d,f){return this.request(In(f||{},{method:t,headers:o?{"Content-Type":"multipart/form-data"}:{},url:s,data:d}))}}cr.prototype[t]=n(),cr.prototype[t+"Form"]=n(!0)});const Go=cr;class ni{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(s){n=s});const o=this;this.promise.then(r=>{if(!o._listeners)return;let s=o._listeners.length;for(;s-- >0;)o._listeners[s](r);o._listeners=null}),this.promise.then=r=>{let s;const d=new Promise(f=>{o.subscribe(f),s=f}).then(r);return d.cancel=function(){o.unsubscribe(s)},d},t(function(s,d,f){o.reason||(o.reason=new _o(s,d,f),n(o.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}static source(){let t;return{token:new ni(function(r){t=r}),cancel:t}}}const Fy=ni;function qy(e){return function(n){return e.apply(null,n)}}function Ny(e){return j.isObject(e)&&e.isAxiosError===!0}const Ba={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Ba).forEach(([e,t])=>{Ba[t]=e});const Hy=Ba;function wc(e){const t=new Go(e),n=ic(Go.prototype.request,t);return j.extend(n,Go.prototype,t,{allOwnKeys:!0}),j.extend(n,t,null,{allOwnKeys:!0}),n.create=function(r){return wc(In(e,r))},n}const Ze=wc(ei);Ze.Axios=Go;Ze.CanceledError=_o;Ze.CancelToken=Fy;Ze.isCancel=xc;Ze.VERSION=kc;Ze.toFormData=Lr;Ze.AxiosError=Ee;Ze.Cancel=Ze.CanceledError;Ze.all=function(t){return Promise.all(t)};Ze.spread=qy;Ze.isAxiosError=Ny;Ze.mergeConfig=In;Ze.AxiosHeaders=jt;Ze.formToJSON=e=>vc(j.isHTMLForm(e)?new FormData(e):e);Ze.HttpStatusCode=Hy;Ze.default=Ze;const Wl=Ze;const Wy={class:"box"},Uy={class:"main"},Yy={class:"title"},Ky={class:"body"},Vy={class:"footer"},Qy={__name:"Dialog",props:{title:{type:String,default:"标题"},btnNum:{type:Number,default:1},okBtnText:{type:String,default:"确定"}},emits:["okBtn","closeBtn"],setup(e,{emit:t}){const n=e,o=()=>{t("okBtn")},r=()=>{t("closeBtn")};return(s,d)=>(le(),He("div",Wy,[ve("div",Uy,[ve("div",Yy,[ve("span",null,sn(n.title),1)]),ve("div",Ky,[Gu(s.$slots,"body",{},void 0,!0)]),ve("div",Vy,[n.btnNum>1?(le(),He("div",{key:0,class:"close-btn",onClick:r},"关闭")):pn("",!0),ve("div",{class:"ok-btn",onClick:o},sn(n.okBtnText),1)])])]))}},Ul=So(Qy,[["__scopeId","data-v-ee082e04"]]);const $y={class:"box"},Zy=["onClick"],Jy=["src"],Xy={class:"file-name"},Gy={key:0,style:{height:"6rem","text-align":"center","line-height":"6rem"}},em={__name:"ImageTable",props:{tableData:{type:Array,default:[]},showMax:{type:Number,default:99999}},emits:["clickFile","copyUrl","delFile"],setup(e,{emit:t}){const n=e,o=Ye(!1),r=Ye([]),s=[".MP4",".AVI",".MOV",".FLV",".MKV"],d=[".JPG",".JPEG",".PNG",".WEBP"],f=[".PSD"],A=[".RAR",".ZIP",".7Z"],m=[".WAV",".MP3",".OGG"],b=[".DOC",".DOCX"],g=[".XLS",".XLSX"],h=Ye("80");fn(()=>{r.value=n.tableData.slice(0,n.showMax)});const C=B=>{t("clickFile",B)};return dn(()=>n.tableData,()=>{o.value=!1,n.tableData.length>n.showMax?r.value=n.tableData.slice(0,n.showMax):r.value=n.tableData}),(B,w)=>(le(),He("div",$y,[(le(!0),He(Xe,null,Vo(r.value,(I,_)=>(le(),He("div",{class:"item",onClick:O=>C(_)},[ve("div",{class:"icon",style:Bo({width:`${h.value}px`,height:`${h.value}px`})},[s.includes(I.suffix.toUpperCase())?(le(),ze(Ie(ac),{key:0,class:"icon-svg",theme:"outline",size:h.value,fill:"#f6823b",strokeWidth:2},null,8,["size"])):d.includes(I.suffix.toUpperCase())?(le(),He("img",{key:1,class:"icon-svg",src:I.url+`!${h.value}x${h.value}`,style:{"object-fit":"cover",width:"100%",height:"100%"},alt:"data.name"},null,8,Jy)):A.includes(I.suffix.toUpperCase())?(le(),ze(Ie(oc),{key:2,class:"icon-svg",theme:"outline",size:h.value,fill:"#f6823b",strokeWidth:2},null,8,["size"])):m.includes(I.suffix.toUpperCase())?(le(),ze(Ie(Gs),{key:3,class:"icon-svg",theme:"outline",size:h.value,fill:"#f6823b",strokeWidth:2},null,8,["size"])):b.includes(I.suffix.toUpperCase())?(le(),ze(Ie(tc),{key:4,class:"icon-svg",theme:"outline",size:h.value,fill:"#f6823b",strokeWidth:2},null,8,["size"])):g.includes(I.suffix.toUpperCase())?(le(),ze(Ie(nc),{key:5,class:"icon-svg",theme:"outline",size:h.value,fill:"#f6823b",strokeWidth:2},null,8,["size"])):f.includes(I.suffix.toUpperCase())?(le(),ze(Ie(Xs),{key:6,class:"icon-svg",theme:"outline",size:h.value,fill:"#f6823b",strokeWidth:2},null,8,["size"])):I.suffix===""?(le(),ze(Ie(rc),{key:7,class:"icon-svg",theme:"outline",size:h.value,fill:"#f6823b",strokeWidth:2},null,8,["size"])):(le(),ze(Ie(ec),{key:8,theme:"outline",size:h.value,fill:"#f6823b",strokeWidth:2},null,8,["size"]))],4),ve("div",Xy,sn(I.name),1)],8,Zy))),256)),e.tableData.length===0?(le(),He("div",Gy," 当前数据为空 ")):pn("",!0)]))}},tm=So(em,[["__scopeId","data-v-34114f7a"]]);const nm={class:"box"},om={style:{"background-color":"#f6f6f6"}},rm=["onClick"],am={class:"file-logo"},im={class:"file-text"},lm={key:0,class:"file-name",style:{display:"flex","text-align":"center"}},sm={style:{flex:"1"}},cm=["onClick"],dm={style:{flex:"1"}},pm=["onClick"],um={key:2,class:"file-name"},fm={key:0,style:{height:"6rem","text-align":"center","line-height":"6rem"}},hm={__name:"InfoTable",props:{tableData:{type:Array,default:[]},tableHead:{type:Array,default:[]},showMax:{type:Number,default:99999}},emits:["clickFile","copyUrl","delFile"],setup(e,{emit:t}){const n=e,o=Ye(!1),r=Ye([]),s=[".MP4",".AVI",".MOV",".FLV",".MKV"],d=[".JPG",".JPEG",".PNG",".WEBP"],f=[".PSD"],A=[".RAR",".ZIP",".7Z"],m=[".WAV",".MP3",".OGG"],b=[".DOC",".DOCX"],g=[".XLS",".XLSX"];fn(()=>{r.value=n.tableData.slice(0,n.showMax)});const h=w=>{t("clickFile",w)},C=w=>{t("copyUrl",w)},B=w=>{t("delFile",w)};return dn(()=>n.tableData,()=>{o.value=!1,n.tableData.length>n.showMax?r.value=n.tableData.slice(0,n.showMax):r.value=n.tableData}),(w,I)=>(le(),He("div",nm,[ve("table",null,[ve("tr",om,[(le(!0),He(Xe,null,Vo(e.tableHead,_=>(le(),He("th",{class:bo({bgRed:_.bgColor==="red",bgGreen:_.bgColor==="green",textRed:_.textColor==="red",textGreen:_.textColor==="green"}),style:Bo({width:_.width})},sn(_.span),7))),256))]),(le(!0),He(Xe,null,Vo(r.value,(_,O)=>(le(),He("tr",null,[(le(!0),He(Xe,null,Vo(e.tableHead,U=>(le(),He("td",{class:bo({textRed:U.textColor==="red",textGreen:U.textColor==="green"})},[U.prop==="name"?(le(),He("div",{key:0,class:"file-name",onClick:D=>h(O)},[ve("div",am,[s.includes(_.suffix.toUpperCase())?(le(),ze(Ie(ac),{key:0,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):d.includes(_.suffix.toUpperCase())?(le(),ze(Ie(wA),{key:1,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):A.includes(_.suffix.toUpperCase())?(le(),ze(Ie(oc),{key:2,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):m.includes(_.suffix.toUpperCase())?(le(),ze(Ie(Gs),{key:3,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):b.includes(_.suffix.toUpperCase())?(le(),ze(Ie(tc),{key:4,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):g.includes(_.suffix.toUpperCase())?(le(),ze(Ie(nc),{key:5,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):f.includes(_.suffix.toUpperCase())?(le(),ze(Ie(Xs),{key:6,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):_.suffix===""?(le(),ze(Ie(rc),{key:7,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):(le(),ze(Ie(ec),{key:8,theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2}))]),ve("div",im,sn(_[U.prop]),1)],8,rm)):U.prop==="cz"?(le(),He(Xe,{key:1},[_.isFile?(le(),He("div",lm,[ve("div",sm,[ve("button",{onClick:D=>C(O)},"分享",8,cm)]),ve("div",dm,[ve("button",{onClick:D=>B(O)},"删除",8,pm)])])):pn("",!0)],64)):(le(),He("div",um,sn(_[U.prop]),1))],2))),256))]))),256))]),e.tableData.length===0?(le(),He("div",fm," 当前数据为空 ")):pn("",!0)]))}},Am=So(hm,[["__scopeId","data-v-d21baaa9"]]);const ym=e=>(Lu("data-v-71584b37"),e=e(),_u(),e),mm={class:"top-box"},bm={class:"top-title"},gm={style:{height:"100%","padding-top":"30px"}},vm={key:0,class:"imgBox"},xm={class:"img"},Em=["src"],km={class:"play-list"},wm=ym(()=>ve("div",{style:{"padding-top":"20px","padding-bottom":"20px"}}," 是否删除文件 ",-1)),Yo="http://localhost:3000",Cm={__name:"main",setup(e){const t=Ye(!1),n=Ye(!1),o=AA();Ja();const r=Ye("$"),s=Ye([]),d=Ye([{span:"文件名",prop:"name",textColor:"",bgColor:""},{span:"大小",prop:"size",textColor:"red",bgColor:"red"},{span:"操作",prop:"cz",width:"80px",textColor:"green",bgColor:"green"}]),f=()=>{r.value=r.value.slice(0,r.value.lastIndexOf("__")===-1?r.value.length:r.value.lastIndexOf("__")),Fe()},A=Ye([]),m=Ye(""),b=Ye(0),g=Ye(0),h=Ye(!1),C=()=>{b.value++,b.value=b.value%A.value.length,m.value=A.value[b.value],console.log(b.value)},B=()=>{b.value--,b.value<0&&(b.value=A.value.length-1),b.value=b.value%A.value.length,m.value=A.value[b.value]},w=()=>{h.value=!0,m.value=A.value[b.value],console.log(A.value)},I=()=>{h.value=!1},_=(H,me)=>(H==="$"?H="":H=H.replace(/\$/g,""),H=H.replace(/__/g,"/"),console.log(`获取文件：${Yo}/getFile${H}/${me}`),`${Yo}/getFile${H}/${me}`),O=(H,me)=>(H==="$"?H="":H=H.replace(/\$/g,""),H=H.replace(/__/g,"/"),`${H}/${me}`),U=H=>{let me=s.value[H];try{navigator.share({title:me.name,url:_(r.value,me.name)})}catch{alert(_(r.value,me.name))}},D=H=>{n.value=!0,g.value=H},fe=[".MP4",".AVI",".MOV",".FLV",".MKV"],Be=[".JPG",".JPEG",".PNG",".WEBP"],Ue=[".WAV",".MP3",".OGG"],pe=()=>{t.value=!1},Le=()=>{n.value=!1},ie=()=>{n.value=!1,nr(()=>{let H=s.value[g.value];Wl.post(`${Yo}/delFile`,{filePath:O(r.value,H.name)}).then((me,ke)=>{me.status===200&&Fe()})})},Me=H=>{t.value=!1,nr(()=>{H==="web"?o.push({path:"/VideoPlay",query:{url:ee.value}}):window.open("vlc://"+ee.value)})},ee=Ye(""),ye=H=>{let me=s.value[H];if(me.isDirectory&&!me.isFile)r.value+=`__${me.name}`,Fe(),Re();else{let ke=me.suffix;if(fe.includes(ke.toUpperCase()))ee.value=_(r.value,me.name),t.value=!0;else if(Be.includes(ke.toUpperCase())){A.value=[];let Pe=0;for(let ot=0;ot<s.value.length;ot++){let dt=s.value[ot].suffix;Be.includes(dt.toUpperCase())&&(s.value[ot].name===s.value[H].name&&(b.value=Pe,console.log(b.value,123456789)),Pe++,A.value.push(_(r.value,s.value[ot].name)))}w()}else if(Ue.includes(ke.toUpperCase()))o.push({path:"/AudioPlay",query:{url:_(r.value,me.name)}});else{let Pe=document.createElement("a");Pe.href=_(r.value,me.name),Pe.download=me.name,Pe.target="_blank",Pe.click()}}},Fe=()=>{Wl.get(`${Yo}/list/${r.value}`).then((H,me)=>{H.status===200&&(s.value=H.data.map(ke=>(ke.size=(Number(ke.size)/1024/1024).toFixed(2)+"MB",ke.isDirectory?ke.size="":ke.url=_(r.value,ke.name),ke)))})},it=()=>{f()},Re=()=>{window.history&&window.history.pushState&&(history.pushState(null,null,document.URL),window.addEventListener("popstate",it,!1))},ge=Ye("list"),be=()=>{ge.value=ge.value==="list"?"":"list"};return fn(()=>{let H=localStorage.getItem("path");H&&(r.value=H),Re(),Fe()}),Ha(()=>{window.removeEventListener("popstate",it,!1)}),dn(r,(H,me)=>{localStorage.setItem("path",H)}),(H,me)=>(le(),He("div",null,[ve("div",mm,[ve("div",{class:"ret",onClick:f},[q(Ie(BA),{strokeWidth:2,class:"icon-svg",fill:"#f6823b",size:"24",theme:"outline"})]),ve("div",bm,sn(O(r.value,"")),1),ve("div",{class:"mode",onClick:be},[ge.value==="list"?(le(),ze(Ie(CA),{key:0,theme:"outline",size:"28",fill:"#f6823b",strokeWidth:3})):(le(),ze(Ie(vA),{key:1,theme:"outline",size:"28",fill:"#f6823b",strokeWidth:3}))])]),ve("div",gm,[ge.value==="list"?(le(),ze(Am,{key:0,"table-data":s.value,"table-head":d.value,onClickFile:ye,onDelFile:D,onCopyUrl:U},null,8,["table-data","table-head"])):(le(),ze(tm,{key:1,"table-data":s.value,"table-head":d.value,onClickFile:ye,onDelFile:D,onCopyUrl:U},null,8,["table-data","table-head"]))]),h.value?(le(),He("div",vm,[ve("div",xm,[ve("div",{class:"close-btn",onClick:I},[q(Ie(kA),{strokeWidth:5,fill:"#ffffff",size:"20",theme:"outline"})]),ve("div",{class:"left-btn",onClick:B},[q(Ie(xA),{strokeWidth:5,fill:"#ffffff",size:"30",theme:"outline"})]),ve("div",{class:"right-btn",onClick:C},[q(Ie(EA),{strokeWidth:5,fill:"#ffffff",size:"30",theme:"outline"})]),ve("img",{src:m.value,alt:""},null,8,Em)]),ve("div",{class:"blackScreen",onClick:I})])):pn("",!0),q(lr,null,{default:co(()=>[t.value?(le(),ze(Ul,{key:0,"ok-btn-text":"返回",title:"预览方式",onOkBtn:pe},{body:co(()=>[ve("ul",km,[ve("li",{onClick:me[0]||(me[0]=ke=>Me("web"))},"网页播放"),ve("li",{onClick:me[1]||(me[1]=ke=>Me("vlc"))},"Vlc播放")])]),_:1})):pn("",!0)]),_:1}),q(lr,null,{default:co(()=>[n.value?(le(),ze(Ul,{key:0,btnNum:2,title:"提示",onOkBtn:ie,onCloseBtn:Le},{body:co(()=>[wm]),_:1})):pn("",!0)]),_:1})]))}},Bm=So(Cm,[["__scopeId","data-v-71584b37"]]);var Sm=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Lm(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Cc={exports:{}};(function(e,t){(function(n,o){e.exports=o()})(self,()=>(()=>{var n={916:(d,f,A)=>{var m=A(471);d.exports=function(b){var g,h="",C=(b=b||{}).video,B=b.options,w=m.$escape,I=b.tran,_=b.icons,O=b.index,U=m.$each;return b.$value,b.$index,h+=`<div class="dplayer-mask"></div>
<div class="dplayer-video-wrap">
    `,g=A(568)(C),h+=g,h+=`
    `,B.logo&&(h+=`
    <div class="dplayer-logo">
        <img src="`,h+=w(B.logo),h+=`">
    </div>
    `),h+=`
    <div class="dplayer-danmaku"`,B.danmaku&&B.danmaku.bottom&&(h+=' style="margin-bottom:',h+=w(B.danmaku.bottom),h+='"'),h+=`>
        <div class="dplayer-danmaku-item dplayer-danmaku-item--demo"></div>
    </div>
    <div class="dplayer-subtitle"></div>
    <div class="dplayer-bezel">
        <span class="dplayer-bezel-icon"></span>
        `,B.danmaku&&(h+=`
        <span class="dplayer-danloading">`,h+=w(I("danmaku-loading")),h+=`</span>
        `),h+=`
        <span class="diplayer-loading-icon">`,h+=_.loading,h+=`</span>
    </div>
</div>
<div class="dplayer-controller-mask"></div>
<div class="dplayer-controller">
    <div class="dplayer-icons dplayer-comment-box">
        <button class="dplayer-icon dplayer-comment-setting-icon" data-balloon="`,h+=w(I("setting")),h+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,h+=_.pallette,h+=`</span>
        </button>
        <div class="dplayer-comment-setting-box">
            <div class="dplayer-comment-setting-color">
                <div class="dplayer-comment-setting-title">`,h+=w(I("set-danmaku-color")),h+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,h+=w(O),h+=`" value="#fff" checked>
                    <span style="background: #fff;"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,h+=w(O),h+=`" value="#e54256">
                    <span style="background: #e54256"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,h+=w(O),h+=`" value="#ffe133">
                    <span style="background: #ffe133"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,h+=w(O),h+=`" value="#64DD17">
                    <span style="background: #64DD17"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,h+=w(O),h+=`" value="#39ccff">
                    <span style="background: #39ccff"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,h+=w(O),h+=`" value="#D500F9">
                    <span style="background: #D500F9"></span>
                </label>
            </div>
            <div class="dplayer-comment-setting-type">
                <div class="dplayer-comment-setting-title">`,h+=w(I("set-danmaku-type")),h+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,h+=w(O),h+=`" value="1">
                    <span>`,h+=w(I("top")),h+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,h+=w(O),h+=`" value="0" checked>
                    <span>`,h+=w(I("rolling")),h+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,h+=w(O),h+=`" value="2">
                    <span>`,h+=w(I("bottom")),h+=`</span>
                </label>
            </div>
        </div>
        <input class="dplayer-comment-input" type="text" placeholder="`,h+=w(I("input-danmaku-enter")),h+=`" maxlength="30">
        <button class="dplayer-icon dplayer-send-icon" data-balloon="`,h+=w(I("send")),h+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,h+=_.send,h+=`</span>
        </button>
    </div>
    <div class="dplayer-icons dplayer-icons-left">
        <button class="dplayer-icon dplayer-play-icon">
            <span class="dplayer-icon-content">`,h+=_.play,h+=`</span>
        </button>
        <div class="dplayer-volume">
            <button class="dplayer-icon dplayer-volume-icon">
                <span class="dplayer-icon-content">`,h+=_.volumeDown,h+=`</span>
            </button>
            <div class="dplayer-volume-bar-wrap" data-balloon-pos="up">
                <div class="dplayer-volume-bar">
                    <div class="dplayer-volume-bar-inner" style="background: `,h+=w(B.theme),h+=`;">
                        <span class="dplayer-thumb" style="background: `,h+=w(B.theme),h+=`"></span>
                    </div>
                </div>
            </div>
        </div>
        <span class="dplayer-time">
            <span class="dplayer-ptime">0:00</span> /
            <span class="dplayer-dtime">0:00</span>
        </span>
        `,B.live&&(h+=`
        <span class="dplayer-live-badge"><span class="dplayer-live-dot" style="background: `,h+=w(B.theme),h+=';"></span>',h+=w(I("live")),h+=`</span>
        `),h+=`
    </div>
    <div class="dplayer-icons dplayer-icons-right">
        `,B.video.quality&&(h+=`
        <div class="dplayer-quality">
            <button class="dplayer-icon dplayer-quality-icon">`,h+=w(B.video.quality[B.video.defaultQuality].name),h+=`</button>
            <div class="dplayer-quality-mask">
                <div class="dplayer-quality-list">
                `,U(B.video.quality,function(D,fe){h+=`
                    <div class="dplayer-quality-item" data-index="`,h+=w(fe),h+='">',h+=w(D.name),h+=`</div>
                `}),h+=`
                </div>
            </div>
        </div>
        `),h+=`
        `,B.screenshot&&(h+=`
        <div class="dplayer-icon dplayer-camera-icon" data-balloon="`,h+=w(I("screenshot")),h+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,h+=_.camera,h+=`</span>
        </div>
        `),h+=`
        `,B.airplay&&(h+=`
        <div class="dplayer-icon dplayer-airplay-icon" data-balloon="`,h+=w(I("airplay")),h+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,h+=_.airplay,h+=`</span>
        </div>
        `),h+=`
        `,B.chromecast&&(h+=`
        <div class="dplayer-icon dplayer-chromecast-icon" data-balloon="`,h+=w(I("chromecast")),h+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,h+=_.chromecast,h+=`</span>
        </div>
        `),h+=`
        <div class="dplayer-comment">
            <button class="dplayer-icon dplayer-comment-icon" data-balloon="`,h+=w(I("send-danmaku")),h+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,h+=_.comment,h+=`</span>
            </button>
        </div>
        `,B.subtitle&&(h+=`
        `,typeof B.subtitle.url=="string"?(h+=`
        <div class="dplayer-subtitle-btn">
            <button class="dplayer-icon dplayer-subtitle-icon" data-balloon="`,h+=w(I("hide-subs")),h+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,h+=_.subtitle,h+=`</span>
            </button>
        </div>
        `):(h+=`
        <div class="dplayer-subtitles">
            <button class="dplayer-icon dplayer-subtitles-icon" data-balloon="`,h+=w(I("subtitle")),h+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,h+=_.subtitle,h+=`</span>
            </button>
            <div class="dplayer-subtitles-box">
                <div class="dplayer-subtitles-panel">
                    `,U(B.subtitle.url,function(D,fe){h+=`
                        <div class="dplayer-subtitles-item" data-subtitle="`,h+=w(D.url),h+=`">
                            <!-- if lang, show tran(lang). if lang and name, show name + (tran(lang)). if name, show name. off option use lang for translation. -->
                            <span class="dplayer-label">`,h+=w(D.lang?D.name?D.name+" ("+I(D.lang)+")":I(D.lang):D.name),h+=`</span>
                        </div>
                    `}),h+=`
                </div>
            </div>
        </div>
        `),h+=`
        `),h+=`
        <div class="dplayer-setting">
            <button class="dplayer-icon dplayer-setting-icon" data-balloon="`,h+=w(I("setting")),h+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,h+=_.setting,h+=`</span>
            </button>
            <div class="dplayer-setting-box">
                <div class="dplayer-setting-origin-panel">
                    <div class="dplayer-setting-item dplayer-setting-speed">
                        <span class="dplayer-label">`,h+=w(I("speed")),h+=`</span>
                        <div class="dplayer-toggle">`,h+=_.right,h+=`</div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-loop">
                        <span class="dplayer-label">`,h+=w(I("loop")),h+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-toggle-setting-input" type="checkbox" name="dplayer-toggle">
                            <label for="dplayer-toggle"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-showdan">
                        <span class="dplayer-label">`,h+=w(I("show-danmaku")),h+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-showdan-setting-input" type="checkbox" name="dplayer-toggle-dan">
                            <label for="dplayer-toggle-dan"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danunlimit">
                        <span class="dplayer-label">`,h+=w(I("unlimited-danmaku")),h+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-danunlimit-setting-input" type="checkbox" name="dplayer-toggle-danunlimit">
                            <label for="dplayer-toggle-danunlimit"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danmaku">
                        <span class="dplayer-label">`,h+=w(I("opacity-danmaku")),h+=`</span>
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
                    `,U(B.playbackSpeed,function(D,fe){h+=`
                        <div class="dplayer-setting-speed-item" data-speed="`,h+=w(D),h+=`">
                            <span class="dplayer-label">`,h+=w(D===1?I("normal"):D),h+=`</span>
                        </div>
                    `}),h+=`
                </div>
            </div>
        </div>
        <div class="dplayer-full">
            <button class="dplayer-icon dplayer-full-in-icon" data-balloon="`,h+=w(I("web-fullscreen")),h+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,h+=_.fullWeb,h+=`</span>
            </button>
            <button class="dplayer-icon dplayer-full-icon" data-balloon="`,h+=w(I("fullscreen")),h+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,h+=_.full,h+=`</span>
            </button>
        </div>
    </div>
    <div class="dplayer-bar-wrap">
        <div class="dplayer-bar-time hidden">00:00</div>
        <div class="dplayer-bar-preview"></div>
        <div class="dplayer-bar">
            <div class="dplayer-loaded" style="width: 0;"></div>
            <div class="dplayer-played" style="width: 0; background: `,h+=w(B.theme),h+=`">
                <span class="dplayer-thumb" style="background: `,h+=w(B.theme),h+=`"></span>
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
    `,B.danmaku&&(h+=`
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
    `),h+=`
</div>
<div class="dplayer-menu">
    `,U(B.contextmenu,function(D,fe){h+=`
        <div class="dplayer-menu-item">
            <a`,D.link&&(h+=' target="_blank"'),h+=' href="',h+=w(D.link||"javascript:void(0);"),h+='">',D.key&&(h+=" ",h+=w(I(D.key))),D.text&&(h+=" ",h+=w(D.text)),h+=`</a>
        </div>
    `}),h+=`
</div>
<div class="dplayer-notice-list"></div>
<button class="dplayer-mobile-play">
    `,h+=_.play,h+=`
</button>`}},568:(d,f,A)=>{var m=A(471);d.exports=function(b){var g="",h=(b=b||{}).enableSubtitle,C=b.subtitle,B=b.current,w=b.airplay,I=b.pic,_=m.$escape,O=b.screenshot,U=b.preload,D=b.url;return h=C&&C.type==="webvtt",g+=`
<video
    class="dplayer-video `,B&&(g+="dplayer-video-current"),g+=`"
    webkit-playsinline
    `,w&&(g+=' x-webkit-airplay="allow" '),g+=`
    playsinline
    `,I&&(g+='poster="',g+=_(I),g+='"'),g+=`
    `,(O||h)&&(g+='crossorigin="anonymous"'),g+=`
    `,U&&(g+='preload="',g+=_(U),g+='"'),g+=`
    `,w?g+=`
    nosrc
    `:D&&(g+=`
    src="`,g+=_(D),g+=`"
    `),g+=`
    >
    `,w&&(g+=`
    <source src="`,g+=_(D),g+=`">
    `),g+=`
    `,h&&(g+=`
    <track class="dplayer-subtrack" kind="metadata" default src="`,g+=_(typeof C.url=="string"?C.url:C.url[C.index].url),g+=`"></track>
    `),g+`
</video>`}},49:(d,f,A)=>{A.d(f,{Z:()=>C});var m=A(415),b=A.n(m),g=A(352),h=A.n(g)()(b());h.push([d.id,`:root {
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
`],sourceRoot:""}]);const C=h},685:(d,f,A)=>{A.d(f,{Z:()=>U});var m=A(415),b=A.n(m),g=A(352),h=A.n(g),C=A(49),B=A(80),w=A.n(B),I=new URL(A(831),A.b),_=h()(b());_.i(C.Z);var O=w()(I);_.push([d.id,`@keyframes my-face {
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
  background: url(`+O+`) repeat-x bottom;
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
}`],sourceRoot:""}]);const U=_},856:d=>{var f=[];function A(g){for(var h=-1,C=0;C<f.length;C++)if(f[C].identifier===g){h=C;break}return h}function m(g,h){for(var C={},B=[],w=0;w<g.length;w++){var I=g[w],_=h.base?I[0]+h.base:I[0],O=C[_]||0,U="".concat(_," ").concat(O);C[_]=O+1;var D=A(U),fe={css:I[1],media:I[2],sourceMap:I[3],supports:I[4],layer:I[5]};if(D!==-1)f[D].references++,f[D].updater(fe);else{var Be=b(fe,h);h.byIndex=w,f.splice(w,0,{identifier:U,updater:Be,references:1})}B.push(U)}return B}function b(g,h){var C=h.domAPI(h);return C.update(g),function(B){if(B){if(B.css===g.css&&B.media===g.media&&B.sourceMap===g.sourceMap&&B.supports===g.supports&&B.layer===g.layer)return;C.update(g=B)}else C.remove()}}d.exports=function(g,h){var C=m(g=g||[],h=h||{});return function(B){B=B||[];for(var w=0;w<C.length;w++){var I=A(C[w]);f[I].references--}for(var _=m(B,h),O=0;O<C.length;O++){var U=A(C[O]);f[U].references===0&&(f[U].updater(),f.splice(U,1))}C=_}}},370:d=>{var f={};d.exports=function(A,m){var b=function(g){if(f[g]===void 0){var h=document.querySelector(g);if(window.HTMLIFrameElement&&h instanceof window.HTMLIFrameElement)try{h=h.contentDocument.head}catch{h=null}f[g]=h}return f[g]}(A);if(!b)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");b.appendChild(m)}},278:d=>{d.exports=function(f){var A=document.createElement("style");return f.setAttributes(A,f.attributes),f.insert(A,f.options),A}},458:(d,f,A)=>{d.exports=function(m){var b=A.nc;b&&m.setAttribute("nonce",b)}},470:d=>{d.exports=function(f){var A=f.insertStyleElement(f);return{update:function(m){(function(b,g,h){var C="";h.supports&&(C+="@supports (".concat(h.supports,") {")),h.media&&(C+="@media ".concat(h.media," {"));var B=h.layer!==void 0;B&&(C+="@layer".concat(h.layer.length>0?" ".concat(h.layer):""," {")),C+=h.css,B&&(C+="}"),h.media&&(C+="}"),h.supports&&(C+="}");var w=h.sourceMap;w&&typeof btoa<"u"&&(C+=`
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(w))))," */")),g.styleTagTransform(C,b,g.options)})(A,f,m)},remove:function(){(function(m){if(m.parentNode===null)return!1;m.parentNode.removeChild(m)})(A)}}}},488:d=>{d.exports=function(f,A){if(A.styleSheet)A.styleSheet.cssText=f;else{for(;A.firstChild;)A.removeChild(A.firstChild);A.appendChild(document.createTextNode(f))}}},251:d=>{d.exports='<svg viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg"><path d="M288 90v96c0 20-16 36-36 36h-10c-16 0-16-24 0-24h10c7 0 12-5 12-12V90c0-7-5-12-12-12H36c-7 0-12 5-12 12v96c0 7 5 12 12 12h10c16 0 16 24 0 24H36c-20 0-36-16-36-36V90c0-20 16-36 36-36h216c20 0 36 16 36 36zm-120 62l48 68c14 20 1 38-20 38H92c-21 0-34-18-20-38l48-68c13-18 35-18 48 0z"></path></svg>'},113:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M16 23c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zM16 13c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zM27 28h-22c-1.654 0-3-1.346-3-3v-16c0-1.654 1.346-3 3-3h3c0.552 0 1 0.448 1 1s-0.448 1-1 1h-3c-0.551 0-1 0.449-1 1v16c0 0.552 0.449 1 1 1h22c0.552 0 1-0.448 1-1v-16c0-0.551-0.448-1-1-1h-11c-0.552 0-1-0.448-1-1s0.448-1 1-1h11c1.654 0 3 1.346 3 3v16c0 1.654-1.346 3-3 3zM24 10.5c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5zM15 4c0 0.552-0.448 1-1 1h-4c-0.552 0-1-0.448-1-1v0c0-0.552 0.448-1 1-1h4c0.552 0 1 0.448 1 1v0z"></path></svg>'},193:d=>{d.exports='<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="chromecast" class="svg-inline--fa fa-chromecast fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M447.8,64H64c-23.6,0-42.7,19.1-42.7,42.7v63.9H64v-63.9h383.8v298.6H298.6V448H448c23.6,0,42.7-19.1,42.7-42.7V106.7 C490.7,83.1,471.4,64,447.8,64z M21.3,383.6L21.3,383.6l0,63.9h63.9C85.2,412.2,56.6,383.6,21.3,383.6L21.3,383.6z M21.3,298.6V341 c58.9,0,106.6,48.1,106.6,107h42.7C170.7,365.6,103.7,298.7,21.3,298.6z M213.4,448h42.7c-0.5-129.5-105.3-234.3-234.8-234.6l0,42.4 C127.3,255.6,213.3,342,213.4,448z"></path></svg>'},338:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.090 0.131h-22.731c-2.354 0-4.262 1.839-4.262 4.109v16.401c0 2.269 1.908 4.109 4.262 4.109h4.262v-2.706h8.469l-8.853 8.135 1.579 1.451 7.487-6.88h9.787c2.353 0 4.262-1.84 4.262-4.109v-16.401c0-2.27-1.909-4.109-4.262-4.109v0zM28.511 19.304c0 1.512-1.272 2.738-2.841 2.738h-8.425l-0.076-0.070-0.076 0.070h-11.311c-1.569 0-2.841-1.226-2.841-2.738v-13.696c0-1.513 1.272-2.739 2.841-2.739h19.889c1.569 0 2.841-0.142 2.841 1.37v15.064z"></path></svg>'},807:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.128 0.38h-22.553c-2.336 0-4.229 1.825-4.229 4.076v16.273c0 2.251 1.893 4.076 4.229 4.076h4.229v-2.685h8.403l-8.784 8.072 1.566 1.44 7.429-6.827h9.71c2.335 0 4.229-1.825 4.229-4.076v-16.273c0-2.252-1.894-4.076-4.229-4.076zM28.538 19.403c0 1.5-1.262 2.717-2.819 2.717h-8.36l-0.076-0.070-0.076 0.070h-11.223c-1.557 0-2.819-1.217-2.819-2.717v-13.589c0-1.501 1.262-2.718 2.819-2.718h19.734c1.557 0 2.819-0.141 2.819 1.359v14.947zM9.206 10.557c-1.222 0-2.215 0.911-2.215 2.036s0.992 2.035 2.215 2.035c1.224 0 2.216-0.911 2.216-2.035s-0.992-2.036-2.216-2.036zM22.496 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.224 0 2.215-0.911 2.215-2.035s-0.991-2.036-2.215-2.036zM15.852 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.222 0 2.215-0.911 2.215-2.035s-0.992-2.036-2.215-2.036z"></path></svg>'},300:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M24.965 24.38h-18.132c-1.366 0-2.478-1.113-2.478-2.478v-11.806c0-1.364 1.111-2.478 2.478-2.478h18.132c1.366 0 2.478 1.113 2.478 2.478v11.806c0 1.364-1.11 2.478-2.478 2.478zM6.833 10.097v11.806h18.134l-0.002-11.806h-18.132zM2.478 28.928h5.952c0.684 0 1.238-0.554 1.238-1.239 0-0.684-0.554-1.238-1.238-1.238h-5.952v-5.802c0-0.684-0.554-1.239-1.238-1.239s-1.239 0.556-1.239 1.239v5.802c0 1.365 1.111 2.478 2.478 2.478zM30.761 19.412c-0.684 0-1.238 0.554-1.238 1.238v5.801h-5.951c-0.686 0-1.239 0.554-1.239 1.238 0 0.686 0.554 1.239 1.239 1.239h5.951c1.366 0 2.478-1.111 2.478-2.478v-5.801c0-0.683-0.554-1.238-1.239-1.238zM0 5.55v5.802c0 0.683 0.554 1.238 1.238 1.238s1.238-0.555 1.238-1.238v-5.802h5.952c0.684 0 1.238-0.554 1.238-1.238s-0.554-1.238-1.238-1.238h-5.951c-1.366-0.001-2.478 1.111-2.478 2.476zM32 11.35v-5.801c0-1.365-1.11-2.478-2.478-2.478h-5.951c-0.686 0-1.239 0.554-1.239 1.238s0.554 1.238 1.239 1.238h5.951v5.801c0 0.683 0.554 1.237 1.238 1.237 0.686 0.002 1.239-0.553 1.239-1.236z"></path></svg>'},574:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M6.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v4h4c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333zM30.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h4v-4c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM30.667 12c-0.8 0-1.333-0.533-1.333-1.333v-4h-4c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM1.333 12c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333h-4v4c0 0.8-0.533 1.333-1.333 1.333z"></path></svg>'},182:d=>{d.exports='<svg version="1.1" viewBox="0 0 22 22"><svg x="7" y="1"><circle class="diplayer-loading-dot diplayer-loading-dot-0" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-1" cx="4" cy="4" r="2"></circle></svg><svg x="13" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-2" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-3" cx="4" cy="4" r="2"></circle></svg><svg x="7" y="13"><circle class="diplayer-loading-dot diplayer-loading-dot-4" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-5" cx="4" cy="4" r="2"></circle></svg><svg x="1" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-6" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-7" cx="4" cy="4" r="2"></circle></svg></svg>'},965:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M19.357 2.88c1.749 0 3.366 0.316 4.851 0.946 1.485 0.632 2.768 1.474 3.845 2.533s1.922 2.279 2.532 3.661c0.611 1.383 0.915 2.829 0.915 4.334 0 1.425-0.304 2.847-0.915 4.271-0.611 1.425-1.587 2.767-2.928 4.028-0.855 0.813-1.811 1.607-2.869 2.38s-2.136 1.465-3.233 2.075c-1.099 0.61-2.198 1.098-3.296 1.465-1.098 0.366-2.115 0.549-3.051 0.549-1.343 0-2.441-0.438-3.296-1.311-0.854-0.876-1.281-2.41-1.281-4.608 0-0.366 0.020-0.773 0.060-1.221s0.062-0.895 0.062-1.343c0-0.773-0.183-1.353-0.55-1.738-0.366-0.387-0.793-0.58-1.281-0.58-0.652 0-1.21 0.295-1.678 0.886s-0.926 1.23-1.373 1.921c-0.447 0.693-0.905 1.334-1.372 1.923s-1.028 0.886-1.679 0.886c-0.529 0-1.048-0.427-1.556-1.282s-0.763-2.259-0.763-4.212c0-2.197 0.529-4.241 1.587-6.133s2.462-3.529 4.21-4.912c1.75-1.383 3.762-2.471 6.041-3.264 2.277-0.796 4.617-1.212 7.018-1.253zM7.334 15.817c0.569 0 1.047-0.204 1.434-0.611s0.579-0.875 0.579-1.404c0-0.569-0.193-1.047-0.579-1.434s-0.864-0.579-1.434-0.579c-0.529 0-0.987 0.193-1.373 0.579s-0.58 0.864-0.58 1.434c0 0.53 0.194 0.998 0.58 1.404 0.388 0.407 0.845 0.611 1.373 0.611zM12.216 11.79c0.691 0 1.292-0.254 1.8-0.763s0.762-1.107 0.762-1.8c0-0.732-0.255-1.343-0.762-1.831-0.509-0.489-1.109-0.732-1.8-0.732-0.732 0-1.342 0.244-1.831 0.732-0.488 0.488-0.732 1.098-0.732 1.831 0 0.693 0.244 1.292 0.732 1.8s1.099 0.763 1.831 0.763zM16.366 25.947c0.692 0 1.282-0.214 1.77-0.64s0.732-0.987 0.732-1.678-0.244-1.261-0.732-1.709c-0.489-0.448-1.078-0.671-1.77-0.671-0.65 0-1.21 0.223-1.678 0.671s-0.702 1.018-0.702 1.709c0 0.692 0.234 1.25 0.702 1.678s1.027 0.64 1.678 0.64zM19.113 9.592c0.651 0 1.129-0.203 1.433-0.611 0.305-0.406 0.459-0.874 0.459-1.404 0-0.488-0.154-0.947-0.459-1.373-0.304-0.427-0.782-0.641-1.433-0.641-0.529 0-1.008 0.193-1.434 0.58s-0.64 0.865-0.64 1.434c0 0.571 0.213 1.049 0.64 1.434 0.427 0.389 0.905 0.581 1.434 0.581zM24.848 12.826c0.57 0 1.067-0.213 1.495-0.64 0.427-0.427 0.64-0.947 0.64-1.556 0-0.57-0.214-1.068-0.64-1.495-0.428-0.427-0.927-0.64-1.495-0.64-0.611 0-1.129 0.213-1.555 0.64-0.428 0.427-0.642 0.926-0.642 1.495 0 0.611 0.213 1.129 0.642 1.556s0.947 0.64 1.555 0.64z"></path></svg>'},74:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 17 32"><path d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path></svg>'},730:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 32"><path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path></svg>'},428:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path></svg>'},254:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M13.725 30l3.9-5.325-3.9-1.125v6.45zM0 17.5l11.050 3.35 13.6-11.55-10.55 12.425 11.8 3.65 6.1-23.375-32 15.5z"></path></svg>'},934:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 28"><path d="M28.633 17.104c0.035 0.21 0.026 0.463-0.026 0.76s-0.14 0.598-0.262 0.904c-0.122 0.306-0.271 0.581-0.445 0.825s-0.367 0.419-0.576 0.524c-0.209 0.105-0.393 0.157-0.55 0.157s-0.332-0.035-0.524-0.105c-0.175-0.052-0.393-0.1-0.655-0.144s-0.528-0.052-0.799-0.026c-0.271 0.026-0.541 0.083-0.812 0.17s-0.502 0.236-0.694 0.445c-0.419 0.437-0.664 0.934-0.734 1.493s0.009 1.092 0.236 1.598c0.175 0.349 0.148 0.699-0.079 1.048-0.105 0.14-0.271 0.284-0.498 0.432s-0.476 0.284-0.747 0.406-0.555 0.218-0.851 0.288c-0.297 0.070-0.559 0.105-0.786 0.105-0.157 0-0.306-0.061-0.445-0.183s-0.236-0.253-0.288-0.393h-0.026c-0.192-0.541-0.52-1.009-0.982-1.402s-1-0.589-1.611-0.589c-0.594 0-1.131 0.197-1.611 0.589s-0.816 0.851-1.009 1.375c-0.087 0.21-0.218 0.362-0.393 0.458s-0.367 0.144-0.576 0.144c-0.244 0-0.52-0.044-0.825-0.131s-0.611-0.197-0.917-0.327c-0.306-0.131-0.581-0.284-0.825-0.458s-0.428-0.349-0.55-0.524c-0.087-0.122-0.135-0.266-0.144-0.432s0.057-0.397 0.197-0.694c0.192-0.402 0.266-0.86 0.223-1.375s-0.266-0.991-0.668-1.428c-0.244-0.262-0.541-0.432-0.891-0.511s-0.681-0.109-0.995-0.092c-0.367 0.017-0.742 0.087-1.127 0.21-0.244 0.070-0.489 0.052-0.734-0.052-0.192-0.070-0.371-0.231-0.537-0.485s-0.314-0.533-0.445-0.838c-0.131-0.306-0.231-0.62-0.301-0.943s-0.087-0.59-0.052-0.799c0.052-0.384 0.227-0.629 0.524-0.734 0.524-0.21 0.995-0.555 1.415-1.035s0.629-1.017 0.629-1.611c0-0.611-0.21-1.144-0.629-1.598s-0.891-0.786-1.415-0.996c-0.157-0.052-0.288-0.179-0.393-0.38s-0.157-0.406-0.157-0.616c0-0.227 0.035-0.48 0.105-0.76s0.162-0.55 0.275-0.812 0.244-0.502 0.393-0.72c0.148-0.218 0.31-0.38 0.485-0.485 0.14-0.087 0.275-0.122 0.406-0.105s0.275 0.052 0.432 0.105c0.524 0.21 1.070 0.275 1.637 0.197s1.070-0.327 1.506-0.747c0.21-0.209 0.362-0.467 0.458-0.773s0.157-0.607 0.183-0.904c0.026-0.297 0.026-0.568 0-0.812s-0.048-0.419-0.065-0.524c-0.035-0.105-0.066-0.227-0.092-0.367s-0.013-0.262 0.039-0.367c0.105-0.244 0.293-0.458 0.563-0.642s0.563-0.336 0.878-0.458c0.314-0.122 0.62-0.214 0.917-0.275s0.533-0.092 0.707-0.092c0.227 0 0.406 0.074 0.537 0.223s0.223 0.301 0.275 0.458c0.192 0.471 0.507 0.886 0.943 1.244s0.952 0.537 1.546 0.537c0.611 0 1.153-0.17 1.624-0.511s0.803-0.773 0.996-1.297c0.070-0.14 0.179-0.284 0.327-0.432s0.301-0.223 0.458-0.223c0.244 0 0.511 0.035 0.799 0.105s0.572 0.166 0.851 0.288c0.279 0.122 0.537 0.279 0.773 0.472s0.423 0.402 0.563 0.629c0.087 0.14 0.113 0.293 0.079 0.458s-0.070 0.284-0.105 0.354c-0.227 0.506-0.297 1.039-0.21 1.598s0.341 1.048 0.76 1.467c0.419 0.419 0.934 0.651 1.546 0.694s1.179-0.057 1.703-0.301c0.14-0.087 0.31-0.122 0.511-0.105s0.371 0.096 0.511 0.236c0.262 0.244 0.493 0.616 0.694 1.113s0.336 1 0.406 1.506c0.035 0.297-0.013 0.528-0.144 0.694s-0.266 0.275-0.406 0.327c-0.542 0.192-1.004 0.528-1.388 1.009s-0.576 1.026-0.576 1.637c0 0.594 0.162 1.113 0.485 1.559s0.747 0.764 1.27 0.956c0.122 0.070 0.227 0.14 0.314 0.21 0.192 0.157 0.323 0.358 0.393 0.602v0zM16.451 19.462c0.786 0 1.528-0.149 2.227-0.445s1.305-0.707 1.821-1.231c0.515-0.524 0.921-1.131 1.218-1.821s0.445-1.428 0.445-2.214c0-0.786-0.148-1.524-0.445-2.214s-0.703-1.292-1.218-1.808c-0.515-0.515-1.122-0.921-1.821-1.218s-1.441-0.445-2.227-0.445c-0.786 0-1.524 0.148-2.214 0.445s-1.292 0.703-1.808 1.218c-0.515 0.515-0.921 1.118-1.218 1.808s-0.445 1.428-0.445 2.214c0 0.786 0.149 1.524 0.445 2.214s0.703 1.297 1.218 1.821c0.515 0.524 1.118 0.934 1.808 1.231s1.428 0.445 2.214 0.445v0z"></path></svg>'},410:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path></svg>'},644:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"></path></svg>'},324:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"></path></svg>'},437:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056z"></path></svg>'},897:(d,f,A)=>{var m=typeof self<"u"?self:typeof window<"u"?window:A.g!==void 0?A.g:{},b=Object.create(m),g=/["&'<>]/;function h(C){return typeof C!="string"&&(C=C==null?"":typeof C=="function"?h(C.call(C)):JSON.stringify(C)),C}b.$escape=function(C){return function(B){var w=""+B,I=g.exec(w);if(!I)return B;var _="",O=void 0,U=void 0,D=void 0;for(O=I.index,U=0;O<w.length;O++){switch(w.charCodeAt(O)){case 34:D="&#34;";break;case 38:D="&#38;";break;case 39:D="&#39;";break;case 60:D="&#60;";break;case 62:D="&#62;";break;default:continue}U!==O&&(_+=w.substring(U,O)),U=O+1,_+=D}return U!==O?_+w.substring(U,O):_}(h(C))},b.$each=function(C,B){if(Array.isArray(C))for(var w=0,I=C.length;w<I;w++)B(C[w],w);else for(var _ in C)B(C[_],_)},d.exports=b},471:(d,f,A)=>{d.exports=A(897)},352:d=>{d.exports=function(f){var A=[];return A.toString=function(){return this.map(function(m){var b="",g=m[5]!==void 0;return m[4]&&(b+="@supports (".concat(m[4],") {")),m[2]&&(b+="@media ".concat(m[2]," {")),g&&(b+="@layer".concat(m[5].length>0?" ".concat(m[5]):""," {")),b+=f(m),g&&(b+="}"),m[2]&&(b+="}"),m[4]&&(b+="}"),b}).join("")},A.i=function(m,b,g,h,C){typeof m=="string"&&(m=[[null,m,void 0]]);var B={};if(g)for(var w=0;w<this.length;w++){var I=this[w][0];I!=null&&(B[I]=!0)}for(var _=0;_<m.length;_++){var O=[].concat(m[_]);g&&B[O[0]]||(C!==void 0&&(O[5]===void 0||(O[1]="@layer".concat(O[5].length>0?" ".concat(O[5]):""," {").concat(O[1],"}")),O[5]=C),b&&(O[2]&&(O[1]="@media ".concat(O[2]," {").concat(O[1],"}")),O[2]=b),h&&(O[4]?(O[1]="@supports (".concat(O[4],") {").concat(O[1],"}"),O[4]=h):O[4]="".concat(h)),A.push(O))}},A}},80:d=>{d.exports=function(f,A){return A||(A={}),f&&(f=String(f.__esModule?f.default:f),/^['"].*['"]$/.test(f)&&(f=f.slice(1,-1)),A.hash&&(f+=A.hash),/["'() \t\n]|(%20)/.test(f)||A.needQuotes?'"'.concat(f.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):f)}},415:d=>{d.exports=function(f){var A=f[1],m=f[3];if(!m)return A;if(typeof btoa=="function"){var b=btoa(unescape(encodeURIComponent(JSON.stringify(m)))),g="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(b),h="/*# ".concat(g," */");return[A].concat([h]).join(`
`)}return[A].join(`
`)}},937:d=>{function f(A){return f=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(m){return typeof m}:function(m){return m&&typeof Symbol=="function"&&m.constructor===Symbol&&m!==Symbol.prototype?"symbol":typeof m},f(A)}d.exports=(typeof self>"u"?"undefined":f(self))=="object"?self.FormData:window.FormData},831:d=>{d.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg=="}},o={};function r(d){var f=o[d];if(f!==void 0)return f.exports;var A=o[d]={id:d,exports:{}};return n[d](A,A.exports,r),A.exports}r.m=n,r.n=d=>{var f=d&&d.__esModule?()=>d.default:()=>d;return r.d(f,{a:f}),f},r.d=(d,f)=>{for(var A in f)r.o(f,A)&&!r.o(d,A)&&Object.defineProperty(d,A,{enumerable:!0,get:f[A]})},r.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}(),r.o=(d,f)=>Object.prototype.hasOwnProperty.call(d,f),r.b=document.baseURI||self.location.href,r.nc=void 0;var s={};return(()=>{r.d(s,{default:()=>Sp});var d=r(856),f=r.n(d),A=r(470),m=r.n(A),b=r(370),g=r.n(b),h=r(458),C=r.n(h),B=r(278),w=r.n(B),I=r(488),_=r.n(I),O=r(685),U={};U.styleTagTransform=_(),U.setAttributes=C(),U.insert=g().bind(null,"head"),U.domAPI=m(),U.insertStyleElement=w(),f()(O.Z,U),O.Z&&O.Z.locals&&O.Z.locals;function D(i){return D=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},D(i)}function fe(i,l){this.name="AggregateError",this.errors=i,this.message=l||""}fe.prototype=Error.prototype;function Be(i){return Be=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Be(i)}var Ue=setTimeout;function pe(i){return!!(i&&i.length!==void 0)}function Le(){}function ie(i){if(!(this instanceof ie))throw new TypeError("Promises must be constructed via new");if(typeof i!="function")throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],Re(i,this)}function Me(i,l){for(;i._state===3;)i=i._value;i._state!==0?(i._handled=!0,ie._immediateFn(function(){var u=i._state===1?l.onFulfilled:l.onRejected;if(u!==null){var a;try{a=u(i._value)}catch(c){return void ye(l.promise,c)}ee(l.promise,a)}else(i._state===1?ee:ye)(l.promise,i._value)})):i._deferreds.push(l)}function ee(i,l){try{if(l===i)throw new TypeError("A promise cannot be resolved with itself.");if(l&&(Be(l)==="object"||typeof l=="function")){var u=l.then;if(l instanceof ie)return i._state=3,i._value=l,void Fe(i);if(typeof u=="function")return void Re((a=u,c=l,function(){a.apply(c,arguments)}),i)}i._state=1,i._value=l,Fe(i)}catch(p){ye(i,p)}var a,c}function ye(i,l){i._state=2,i._value=l,Fe(i)}function Fe(i){i._state===2&&i._deferreds.length===0&&ie._immediateFn(function(){i._handled||ie._unhandledRejectionFn(i._value)});for(var l=0,u=i._deferreds.length;l<u;l++)Me(i,i._deferreds[l]);i._deferreds=null}function it(i,l,u){this.onFulfilled=typeof i=="function"?i:null,this.onRejected=typeof l=="function"?l:null,this.promise=u}function Re(i,l){var u=!1;try{i(function(a){u||(u=!0,ee(l,a))},function(a){u||(u=!0,ye(l,a))})}catch(a){if(u)return;u=!0,ye(l,a)}}ie.prototype.catch=function(i){return this.then(null,i)},ie.prototype.then=function(i,l){var u=new this.constructor(Le);return Me(this,new it(i,l,u)),u},ie.prototype.finally=function(i){var l=this.constructor;return this.then(function(u){return l.resolve(i()).then(function(){return u})},function(u){return l.resolve(i()).then(function(){return l.reject(u)})})},ie.all=function(i){return new ie(function(l,u){if(!pe(i))return u(new TypeError("Promise.all accepts an array"));var a=Array.prototype.slice.call(i);if(a.length===0)return l([]);var c=a.length;function p(v,x){try{if(x&&(Be(x)==="object"||typeof x=="function")){var L=x.then;if(typeof L=="function")return void L.call(x,function(T){p(v,T)},u)}a[v]=x,--c==0&&l(a)}catch(T){u(T)}}for(var y=0;y<a.length;y++)p(y,a[y])})},ie.any=function(i){var l=this;return new l(function(u,a){if(!i||i.length===void 0)return a(new TypeError("Promise.any accepts an array"));var c=Array.prototype.slice.call(i);if(c.length===0)return a();for(var p=[],y=0;y<c.length;y++)try{l.resolve(c[y]).then(u).catch(function(v){p.push(v),p.length===c.length&&a(new fe(p,"All promises were rejected"))})}catch(v){a(v)}})},ie.allSettled=function(i){return new this(function(l,u){if(!i||i.length===void 0)return u(new TypeError(D(i)+" "+i+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var a=Array.prototype.slice.call(i);if(a.length===0)return l([]);var c=a.length;function p(v,x){if(x&&(D(x)==="object"||typeof x=="function")){var L=x.then;if(typeof L=="function")return void L.call(x,function(T){p(v,T)},function(T){a[v]={status:"rejected",reason:T},--c==0&&l(a)})}a[v]={status:"fulfilled",value:x},--c==0&&l(a)}for(var y=0;y<a.length;y++)p(y,a[y])})},ie.resolve=function(i){return i&&Be(i)==="object"&&i.constructor===ie?i:new ie(function(l){l(i)})},ie.reject=function(i){return new ie(function(l,u){u(i)})},ie.race=function(i){return new ie(function(l,u){if(!pe(i))return u(new TypeError("Promise.race accepts an array"));for(var a=0,c=i.length;a<c;a++)ie.resolve(i[a]).then(l,u)})},ie._immediateFn=typeof setImmediate=="function"&&function(i){setImmediate(i)}||function(i){Ue(i,0)},ie._unhandledRejectionFn=function(i){typeof console<"u"&&console&&console.warn("Possible Unhandled Promise Rejection:",i)};const ge=ie;var be=/mobile/i.test(window.navigator.userAgent);const H={secondToTime:function(i){if((i=i||0)===0||i===1/0||i.toString()==="NaN")return"00:00";var l=Math.floor(i/3600),u=Math.floor((i-3600*l)/60),a=Math.floor(i-3600*l-60*u);return(l>0?[l,u,a]:[u,a]).map(function(c){return c<10?"0"+c:""+c}).join(":")},getElementViewLeft:function(i){var l=i.offsetLeft,u=i.offsetParent,a=document.body.scrollLeft+document.documentElement.scrollLeft;if(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement)for(;u!==null&&u!==i;)l+=u.offsetLeft,u=u.offsetParent;else for(;u!==null;)l+=u.offsetLeft,u=u.offsetParent;return l-a},getBoundingClientRectViewLeft:function(i){var l=window.scrollY||window.pageYOffset||document.body.scrollTop+(document.documentElement&&document.documentElement.scrollTop||0);if(i.getBoundingClientRect){if(typeof this.getBoundingClientRectViewLeft.offset!="number"){var u=document.createElement("div");u.style.cssText="position:absolute;top:0;left:0;",document.body.appendChild(u),this.getBoundingClientRectViewLeft.offset=-u.getBoundingClientRect().top-l,document.body.removeChild(u),u=null}var a=i.getBoundingClientRect(),c=this.getBoundingClientRectViewLeft.offset;return a.left+c}return this.getElementViewLeft(i)},getScrollPosition:function(){return{left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0}},setScrollPosition:function(i){var l=i.left,u=l===void 0?0:l,a=i.top,c=a===void 0?0:a;this.isFirefox?(document.documentElement.scrollLeft=u,document.documentElement.scrollTop=c):window.scrollTo(u,c)},isMobile:be,isFirefox:/firefox/i.test(window.navigator.userAgent),isChrome:/chrome/i.test(window.navigator.userAgent),isSafari:/safari/i.test(window.navigator.userAgent),storage:{set:function(i,l){localStorage.setItem(i,l)},get:function(i){return localStorage.getItem(i)}},nameMap:{dragStart:be?"touchstart":"mousedown",dragMove:be?"touchmove":"mousemove",dragEnd:be?"touchend":"mouseup"},color2Number:function(i){return i[0]==="#"&&(i=i.substr(1)),i.length===3&&(i="".concat(i[0]).concat(i[0]).concat(i[1]).concat(i[1]).concat(i[2]).concat(i[2])),parseInt(i,16)+0&16777215},number2Color:function(i){return"#"+("00000"+i.toString(16)).slice(-6)},number2Type:function(i){switch(i){case 0:default:return"right";case 1:return"top";case 2:return"bottom"}}};function me(i,l){return function(){return i.apply(l,arguments)}}function ke(i){return ke=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},ke(i)}var Pe,ot=Object.prototype.toString,dt=Object.getPrototypeOf,Dt=(Pe=Object.create(null),function(i){var l=ot.call(i);return Pe[l]||(Pe[l]=l.slice(8,-1).toLowerCase())}),je=function(i){return i=i.toLowerCase(),function(l){return Dt(l)===i}},z=function(i){return function(l){return ke(l)===i}},J=Array.isArray,K=z("undefined"),oe=je("ArrayBuffer"),we=z("string"),E=z("function"),k=z("number"),S=function(i){return i!==null&&ke(i)==="object"},R=function(i){if(Dt(i)!=="object")return!1;var l=dt(i);return!(l!==null&&l!==Object.prototype&&Object.getPrototypeOf(l)!==null||Symbol.toStringTag in i||Symbol.iterator in i)},M=je("Date"),N=je("File"),X=je("Blob"),W=je("FileList"),Q=je("URLSearchParams");function F(i,l){var u,a,c=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},p=c.allOwnKeys,y=p!==void 0&&p;if(i!=null)if(ke(i)!=="object"&&(i=[i]),J(i))for(u=0,a=i.length;u<a;u++)l.call(null,i[u],u,i);else{var v,x=y?Object.getOwnPropertyNames(i):Object.keys(i),L=x.length;for(u=0;u<L;u++)v=x[u],l.call(null,i[v],v,i)}}function re(i,l){l=l.toLowerCase();for(var u,a=Object.keys(i),c=a.length;c-- >0;)if(l===(u=a[c]).toLowerCase())return u;return null}var te,ae,ce=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:Sm,he=function(i){return!K(i)&&i!==ce},Te=(te=typeof Uint8Array<"u"&&dt(Uint8Array),function(i){return te&&i instanceof te}),Se=je("HTMLFormElement"),Ne=(ae=Object.prototype.hasOwnProperty,function(i,l){return ae.call(i,l)}),ct=je("RegExp"),Tt=function(i,l){var u=Object.getOwnPropertyDescriptors(i),a={};F(u,function(c,p){l(c,p,i)!==!1&&(a[p]=c)}),Object.defineProperties(i,a)};const P={isArray:J,isArrayBuffer:oe,isBuffer:function(i){return i!==null&&!K(i)&&i.constructor!==null&&!K(i.constructor)&&E(i.constructor.isBuffer)&&i.constructor.isBuffer(i)},isFormData:function(i){var l="[object FormData]";return i&&(typeof FormData=="function"&&i instanceof FormData||ot.call(i)===l||E(i.toString)&&i.toString()===l)},isArrayBufferView:function(i){return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?ArrayBuffer.isView(i):i&&i.buffer&&oe(i.buffer)},isString:we,isNumber:k,isBoolean:function(i){return i===!0||i===!1},isObject:S,isPlainObject:R,isUndefined:K,isDate:M,isFile:N,isBlob:X,isRegExp:ct,isFunction:E,isStream:function(i){return S(i)&&E(i.pipe)},isURLSearchParams:Q,isTypedArray:Te,isFileList:W,forEach:F,merge:function i(){for(var l=he(this)&&this||{},u=l.caseless,a={},c=function(v,x){var L=u&&re(a,x)||x;R(a[L])&&R(v)?a[L]=i(a[L],v):R(v)?a[L]=i({},v):J(v)?a[L]=v.slice():a[L]=v},p=0,y=arguments.length;p<y;p++)arguments[p]&&F(arguments[p],c);return a},extend:function(i,l,u){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},c=a.allOwnKeys;return F(l,function(p,y){u&&E(p)?i[y]=me(p,u):i[y]=p},{allOwnKeys:c}),i},trim:function(i){return i.trim?i.trim():i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},stripBOM:function(i){return i.charCodeAt(0)===65279&&(i=i.slice(1)),i},inherits:function(i,l,u,a){i.prototype=Object.create(l.prototype,a),i.prototype.constructor=i,Object.defineProperty(i,"super",{value:l.prototype}),u&&Object.assign(i.prototype,u)},toFlatObject:function(i,l,u,a){var c,p,y,v={};if(l=l||{},i==null)return l;do{for(p=(c=Object.getOwnPropertyNames(i)).length;p-- >0;)y=c[p],a&&!a(y,i,l)||v[y]||(l[y]=i[y],v[y]=!0);i=u!==!1&&dt(i)}while(i&&(!u||u(i,l))&&i!==Object.prototype);return l},kindOf:Dt,kindOfTest:je,endsWith:function(i,l,u){i=String(i),(u===void 0||u>i.length)&&(u=i.length),u-=l.length;var a=i.indexOf(l,u);return a!==-1&&a===u},toArray:function(i){if(!i)return null;if(J(i))return i;var l=i.length;if(!k(l))return null;for(var u=new Array(l);l-- >0;)u[l]=i[l];return u},forEachEntry:function(i,l){for(var u,a=(i&&i[Symbol.iterator]).call(i);(u=a.next())&&!u.done;){var c=u.value;l.call(i,c[0],c[1])}},matchAll:function(i,l){for(var u,a=[];(u=i.exec(l))!==null;)a.push(u);return a},isHTMLForm:Se,hasOwnProperty:Ne,hasOwnProp:Ne,reduceDescriptors:Tt,freezeMethods:function(i){Tt(i,function(l,u){if(E(i)&&["arguments","caller","callee"].indexOf(u)!==-1)return!1;var a=i[u];E(a)&&(l.enumerable=!1,"writable"in l?l.writable=!1:l.set||(l.set=function(){throw Error("Can not rewrite read-only method '"+u+"'")}))})},toObjectSet:function(i,l){var u={},a=function(c){c.forEach(function(p){u[p]=!0})};return J(i)?a(i):a(String(i).split(l)),u},toCamelCase:function(i){return i.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,function(l,u,a){return u.toUpperCase()+a})},noop:function(){},toFiniteNumber:function(i,l){return i=+i,Number.isFinite(i)?i:l},findKey:re,global:ce,isContextDefined:he,toJSONObject:function(i){var l=new Array(10);return function u(a,c){if(S(a)){if(l.indexOf(a)>=0)return;if(!("toJSON"in a)){l[c]=a;var p=J(a)?[]:{};return F(a,function(y,v){var x=u(y,c+1);!K(x)&&(p[v]=x)}),l[c]=void 0,p}}return a}(i,0)}};function pt(i,l,u,a,c){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=i,this.name="AxiosError",l&&(this.code=l),u&&(this.config=u),a&&(this.request=a),c&&(this.response=c)}P.inherits(pt,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:P.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var jn=pt.prototype,Ge={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(function(i){Ge[i]={value:i}}),Object.defineProperties(pt,Ge),Object.defineProperty(jn,"isAxiosError",{value:!0}),pt.from=function(i,l,u,a,c,p){var y=Object.create(jn);return P.toFlatObject(i,y,function(v){return v!==Error.prototype},function(v){return v!=="isAxiosError"}),pt.call(y,i.message,l,u,a,c),y.cause=i,y.name=i.name,p&&Object.assign(y,p),y};const Ae=pt,Io=r(937);function Tr(i){return Tr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Tr(i)}function Or(i){return P.isPlainObject(i)||P.isArray(i)}function oi(i){return P.endsWith(i,"[]")?i.slice(0,-2):i}function ri(i,l,u){return i?i.concat(l).map(function(a,c){return a=oi(a),!u&&c?"["+a+"]":a}).join(u?".":""):l}var Sc=P.toFlatObject(P,{},null,function(i){return/^is[A-Z]/.test(i)});const To=function(i,l,u){if(!P.isObject(i))throw new TypeError("target must be an object");l=l||new(Io||FormData);var a,c=(u=P.toFlatObject(u,{metaTokens:!0,dots:!1,indexes:!1},!1,function(G,Z){return!P.isUndefined(Z[G])})).metaTokens,p=u.visitor||T,y=u.dots,v=u.indexes,x=(u.Blob||typeof Blob<"u"&&Blob)&&(a=l)&&P.isFunction(a.append)&&a[Symbol.toStringTag]==="FormData"&&a[Symbol.iterator];if(!P.isFunction(p))throw new TypeError("visitor must be a function");function L(G){if(G===null)return"";if(P.isDate(G))return G.toISOString();if(!x&&P.isBlob(G))throw new Ae("Blob is not supported. Use a Buffer instead.");return P.isArrayBuffer(G)||P.isTypedArray(G)?x&&typeof Blob=="function"?new Blob([G]):Buffer.from(G):G}function T(G,Z,V){var ne=G;if(G&&!V&&Tr(G)==="object"){if(P.endsWith(Z,"{}"))Z=c?Z:Z.slice(0,-2),G=JSON.stringify(G);else if(P.isArray(G)&&function(de){return P.isArray(de)&&!de.some(Or)}(G)||P.isFileList(G)||P.endsWith(Z,"[]")&&(ne=P.toArray(G)))return Z=oi(Z),ne.forEach(function(de,$e){!P.isUndefined(de)&&de!==null&&l.append(v===!0?ri([Z],$e,y):v===null?Z:Z+"[]",L(de))}),!1}return!!Or(G)||(l.append(ri(V,Z,y),L(G)),!1)}var Y=[],$=Object.assign(Sc,{defaultVisitor:T,convertValue:L,isVisitable:Or});if(!P.isObject(i))throw new TypeError("data must be an object");return function G(Z,V){if(!P.isUndefined(Z)){if(Y.indexOf(Z)!==-1)throw Error("Circular reference detected in "+V.join("."));Y.push(Z),P.forEach(Z,function(ne,de){(!(P.isUndefined(ne)||ne===null)&&p.call(l,ne,P.isString(de)?de.trim():de,V,$))===!0&&G(ne,V?V.concat(de):[de])}),Y.pop()}}(i),l};function ai(i){var l={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(i).replace(/[!'()~]|%20|%00/g,function(u){return l[u]})}function ii(i,l){this._pairs=[],i&&To(i,this,l)}var li=ii.prototype;li.append=function(i,l){this._pairs.push([i,l])},li.toString=function(i){var l=i?function(u){return i.call(this,u,ai)}:ai;return this._pairs.map(function(u){return l(u[0])+"="+l(u[1])},"").join("&")};const si=ii;function Lc(i){return encodeURIComponent(i).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function ci(i,l,u){if(!l)return i;var a,c=u&&u.encode||Lc,p=u&&u.serialize;if(a=p?p(l,u):P.isURLSearchParams(l)?l.toString():new si(l,u).toString(c)){var y=i.indexOf("#");y!==-1&&(i=i.slice(0,y)),i+=(i.indexOf("?")===-1?"?":"&")+a}return i}function zn(i){return zn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},zn(i)}function _c(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(zn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(zn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),zn(c)==="symbol"?c:String(c)),a)}var c}var Ic=function(){function i(){(function(a,c){if(!(a instanceof c))throw new TypeError("Cannot call a class as a function")})(this,i),this.handlers=[]}var l,u;return l=i,u=[{key:"use",value:function(a,c,p){return this.handlers.push({fulfilled:a,rejected:c,synchronous:!!p&&p.synchronous,runWhen:p?p.runWhen:null}),this.handlers.length-1}},{key:"eject",value:function(a){this.handlers[a]&&(this.handlers[a]=null)}},{key:"clear",value:function(){this.handlers&&(this.handlers=[])}},{key:"forEach",value:function(a){P.forEach(this.handlers,function(c){c!==null&&a(c)})}}],u&&_c(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const di=Ic,pi={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Tc=typeof URLSearchParams<"u"?URLSearchParams:si,Oc=FormData;var Rr,Rc=(typeof navigator>"u"||(Rr=navigator.product)!=="ReactNative"&&Rr!=="NativeScript"&&Rr!=="NS")&&typeof window<"u"&&typeof document<"u",Pc=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function";const wt={isBrowser:!0,classes:{URLSearchParams:Tc,FormData:Oc,Blob},isStandardBrowserEnv:Rc,isStandardBrowserWebWorkerEnv:Pc,protocols:["http","https","file","blob","url","data"]},ui=function(i){function l(a,c,p,y){var v=a[y++],x=Number.isFinite(+v),L=y>=a.length;return v=!v&&P.isArray(p)?p.length:v,L?(P.hasOwnProp(p,v)?p[v]=[p[v],c]:p[v]=c,!x):(p[v]&&P.isObject(p[v])||(p[v]=[]),l(a,c,p[v],y)&&P.isArray(p[v])&&(p[v]=function(T){var Y,$,G={},Z=Object.keys(T),V=Z.length;for(Y=0;Y<V;Y++)G[$=Z[Y]]=T[$];return G}(p[v])),!x)}if(P.isFormData(i)&&P.isFunction(i.entries)){var u={};return P.forEachEntry(i,function(a,c){l(function(p){return P.matchAll(/\w+|\[(\w*)]/g,p).map(function(y){return y[0]==="[]"?"":y[1]||y[0]})}(a),c,u,0)}),u}return null};var jc={"Content-Type":void 0},Oo={transitional:pi,adapter:["xhr","http"],transformRequest:[function(i,l){var u,a=l.getContentType()||"",c=a.indexOf("application/json")>-1,p=P.isObject(i);if(p&&P.isHTMLForm(i)&&(i=new FormData(i)),P.isFormData(i))return c&&c?JSON.stringify(ui(i)):i;if(P.isArrayBuffer(i)||P.isBuffer(i)||P.isStream(i)||P.isFile(i)||P.isBlob(i))return i;if(P.isArrayBufferView(i))return i.buffer;if(P.isURLSearchParams(i))return l.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),i.toString();if(p){if(a.indexOf("application/x-www-form-urlencoded")>-1)return function(v,x){return To(v,new wt.classes.URLSearchParams,Object.assign({visitor:function(L,T,Y,$){return wt.isNode&&P.isBuffer(L)?(this.append(T,L.toString("base64")),!1):$.defaultVisitor.apply(this,arguments)}},x))}(i,this.formSerializer).toString();if((u=P.isFileList(i))||a.indexOf("multipart/form-data")>-1){var y=this.env&&this.env.FormData;return To(u?{"files[]":i}:i,y&&new y,this.formSerializer)}}return p||c?(l.setContentType("application/json",!1),function(v,x,L){if(P.isString(v))try{return(0,JSON.parse)(v),P.trim(v)}catch(T){if(T.name!=="SyntaxError")throw T}return(0,JSON.stringify)(v)}(i)):i}],transformResponse:[function(i){var l=this.transitional||Oo.transitional,u=l&&l.forcedJSONParsing,a=this.responseType==="json";if(i&&P.isString(i)&&(u&&!this.responseType||a)){var c=!(l&&l.silentJSONParsing)&&a;try{return JSON.parse(i)}catch(p){if(c)throw p.name==="SyntaxError"?Ae.from(p,Ae.ERR_BAD_RESPONSE,this,null,this.response):p}}return i}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:wt.classes.FormData,Blob:wt.classes.Blob},validateStatus:function(i){return i>=200&&i<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};P.forEach(["delete","get","head"],function(i){Oo.headers[i]={}}),P.forEach(["post","put","patch"],function(i){Oo.headers[i]=P.merge(jc)});const Pr=Oo;var zc=P.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]);function Mn(i){return Mn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Mn(i)}function fi(i,l){(l==null||l>i.length)&&(l=i.length);for(var u=0,a=new Array(l);u<l;u++)a[u]=i[u];return a}function hi(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(Mn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(Mn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Mn(c)==="symbol"?c:String(c)),a)}var c}var Ai=Symbol("internals");function Dn(i){return i&&String(i).trim().toLowerCase()}function Ro(i){return i===!1||i==null?i:P.isArray(i)?i.map(Ro):String(i)}function yi(i,l,u,a){return P.isFunction(a)?a.call(this,l,u):P.isString(l)?P.isString(a)?l.indexOf(a)!==-1:P.isRegExp(a)?a.test(l):void 0:void 0}var Po=function(i,l){function u(y){(function(v,x){if(!(v instanceof x))throw new TypeError("Cannot call a class as a function")})(this,u),y&&this.set(y)}var a,c,p;return a=u,c=[{key:"set",value:function(y,v,x){var L=this;function T(de,$e,We){var Oe=Dn($e);if(!Oe)throw new Error("header name must be a non-empty string");var Nt=P.findKey(L,Oe);(!Nt||L[Nt]===void 0||We===!0||We===void 0&&L[Nt]!==!1)&&(L[Nt||$e]=Ro(de))}var Y,$,G,Z,V,ne=function(de,$e){return P.forEach(de,function(We,Oe){return T(We,Oe,$e)})};return P.isPlainObject(y)||y instanceof this.constructor?ne(y,v):P.isString(y)&&(y=y.trim())&&!/^[-_a-zA-Z]+$/.test(y.trim())?ne((V={},(Y=y)&&Y.split(`
`).forEach(function(de){Z=de.indexOf(":"),$=de.substring(0,Z).trim().toLowerCase(),G=de.substring(Z+1).trim(),!$||V[$]&&zc[$]||($==="set-cookie"?V[$]?V[$].push(G):V[$]=[G]:V[$]=V[$]?V[$]+", "+G:G)}),V),v):y!=null&&T(v,y,x),this}},{key:"get",value:function(y,v){if(y=Dn(y)){var x=P.findKey(this,y);if(x){var L=this[x];if(!v)return L;if(v===!0)return function(T){for(var Y,$=Object.create(null),G=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;Y=G.exec(T);)$[Y[1]]=Y[2];return $}(L);if(P.isFunction(v))return v.call(this,L,x);if(P.isRegExp(v))return v.exec(L);throw new TypeError("parser must be boolean|regexp|function")}}}},{key:"has",value:function(y,v){if(y=Dn(y)){var x=P.findKey(this,y);return!(!x||v&&!yi(0,this[x],x,v))}return!1}},{key:"delete",value:function(y,v){var x=this,L=!1;function T(Y){if(Y=Dn(Y)){var $=P.findKey(x,Y);!$||v&&!yi(0,x[$],$,v)||(delete x[$],L=!0)}}return P.isArray(y)?y.forEach(T):T(y),L}},{key:"clear",value:function(){return Object.keys(this).forEach(this.delete.bind(this))}},{key:"normalize",value:function(y){var v=this,x={};return P.forEach(this,function(L,T){var Y=P.findKey(x,T);if(Y)return v[Y]=Ro(L),void delete v[T];var $=y?function(G){return G.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,function(Z,V,ne){return V.toUpperCase()+ne})}(T):String(T).trim();$!==T&&delete v[T],v[$]=Ro(L),x[$]=!0}),this}},{key:"concat",value:function(){for(var y,v=arguments.length,x=new Array(v),L=0;L<v;L++)x[L]=arguments[L];return(y=this.constructor).concat.apply(y,[this].concat(x))}},{key:"toJSON",value:function(y){var v=Object.create(null);return P.forEach(this,function(x,L){x!=null&&x!==!1&&(v[L]=y&&P.isArray(x)?x.join(", "):x)}),v}},{key:Symbol.iterator,value:function(){return Object.entries(this.toJSON())[Symbol.iterator]()}},{key:"toString",value:function(){return Object.entries(this.toJSON()).map(function(y){var v,x,L=(x=2,function(T){if(Array.isArray(T))return T}(v=y)||function(T,Y){var $=T==null?null:typeof Symbol<"u"&&T[Symbol.iterator]||T["@@iterator"];if($!=null){var G,Z,V,ne,de=[],$e=!0,We=!1;try{if(V=($=$.call(T)).next,Y===0){if(Object($)!==$)return;$e=!1}else for(;!($e=(G=V.call($)).done)&&(de.push(G.value),de.length!==Y);$e=!0);}catch(Oe){We=!0,Z=Oe}finally{try{if(!$e&&$.return!=null&&(ne=$.return(),Object(ne)!==ne))return}finally{if(We)throw Z}}return de}}(v,x)||function(T,Y){if(T){if(typeof T=="string")return fi(T,Y);var $=Object.prototype.toString.call(T).slice(8,-1);return $==="Object"&&T.constructor&&($=T.constructor.name),$==="Map"||$==="Set"?Array.from(T):$==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test($)?fi(T,Y):void 0}}(v,x)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}());return L[0]+": "+L[1]}).join(`
`)}},{key:Symbol.toStringTag,get:function(){return"AxiosHeaders"}}],p=[{key:"from",value:function(y){return y instanceof this?y:new this(y)}},{key:"concat",value:function(y){for(var v=new this(y),x=arguments.length,L=new Array(x>1?x-1:0),T=1;T<x;T++)L[T-1]=arguments[T];return L.forEach(function(Y){return v.set(Y)}),v}},{key:"accessor",value:function(y){var v=(this[Ai]=this[Ai]={accessors:{}}).accessors,x=this.prototype;function L(T){var Y=Dn(T);v[Y]||(function($,G){var Z=P.toCamelCase(" "+G);["get","set","has"].forEach(function(V){Object.defineProperty($,V+Z,{value:function(ne,de,$e){return this[V].call(this,G,ne,de,$e)},configurable:!0})})}(x,T),v[Y]=!0)}return P.isArray(y)?y.forEach(L):L(y),this}}],c&&hi(a.prototype,c),p&&hi(a,p),Object.defineProperty(a,"prototype",{writable:!1}),u}();Po.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent"]),P.freezeMethods(Po.prototype),P.freezeMethods(Po);const Ot=Po;function jr(i,l){var u=this||Pr,a=l||u,c=Ot.from(a.headers),p=a.data;return P.forEach(i,function(y){p=y.call(u,p,c.normalize(),l?l.status:void 0)}),c.normalize(),p}function mi(i){return!(!i||!i.__CANCEL__)}function bi(i,l,u){Ae.call(this,i??"canceled",Ae.ERR_CANCELED,l,u),this.name="CanceledError"}P.inherits(bi,Ae,{__CANCEL__:!0});const jo=bi,Mc=wt.isStandardBrowserEnv?{write:function(i,l,u,a,c,p){var y=[];y.push(i+"="+encodeURIComponent(l)),P.isNumber(u)&&y.push("expires="+new Date(u).toGMTString()),P.isString(a)&&y.push("path="+a),P.isString(c)&&y.push("domain="+c),p===!0&&y.push("secure"),document.cookie=y.join("; ")},read:function(i){var l=document.cookie.match(new RegExp("(^|;\\s*)("+i+")=([^;]*)"));return l?decodeURIComponent(l[3]):null},remove:function(i){this.write(i,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};function gi(i,l){return i&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(l)?function(u,a){return a?u.replace(/\/+$/,"")+"/"+a.replace(/^\/+/,""):u}(i,l):l}const Dc=wt.isStandardBrowserEnv?function(){var i,l=/(msie|trident)/i.test(navigator.userAgent),u=document.createElement("a");function a(c){var p=c;return l&&(u.setAttribute("href",p),p=u.href),u.setAttribute("href",p),{href:u.href,protocol:u.protocol?u.protocol.replace(/:$/,""):"",host:u.host,search:u.search?u.search.replace(/^\?/,""):"",hash:u.hash?u.hash.replace(/^#/,""):"",hostname:u.hostname,port:u.port,pathname:u.pathname.charAt(0)==="/"?u.pathname:"/"+u.pathname}}return i=a(window.location.href),function(c){var p=P.isString(c)?a(c):c;return p.protocol===i.protocol&&p.host===i.host}}():function(){return!0};function vi(i,l){var u=0,a=function(c,p){c=c||10;var y,v=new Array(c),x=new Array(c),L=0,T=0;return p=p!==void 0?p:1e3,function(Y){var $=Date.now(),G=x[T];y||(y=$),v[L]=Y,x[L]=$;for(var Z=T,V=0;Z!==L;)V+=v[Z++],Z%=c;if((L=(L+1)%c)===T&&(T=(T+1)%c),!($-y<p)){var ne=G&&$-G;return ne?Math.round(1e3*V/ne):void 0}}}(50,250);return function(c){var p=c.loaded,y=c.lengthComputable?c.total:void 0,v=p-u,x=a(v);u=p;var L={loaded:p,total:y,progress:y?p/y:void 0,bytes:v,rate:x||void 0,estimated:x&&y&&p<=y?(y-p)/x:void 0,event:c};L[l?"download":"upload"]=!0,i(L)}}var zr={http:null,xhr:typeof XMLHttpRequest<"u"&&function(i){return new Promise(function(l,u){var a,c=i.data,p=Ot.from(i.headers).normalize(),y=i.responseType;function v(){i.cancelToken&&i.cancelToken.unsubscribe(a),i.signal&&i.signal.removeEventListener("abort",a)}P.isFormData(c)&&(wt.isStandardBrowserEnv||wt.isStandardBrowserWebWorkerEnv)&&p.setContentType(!1);var x=new XMLHttpRequest;if(i.auth){var L=i.auth.username||"",T=i.auth.password?unescape(encodeURIComponent(i.auth.password)):"";p.set("Authorization","Basic "+btoa(L+":"+T))}var Y=gi(i.baseURL,i.url);function $(){if(x){var ne=Ot.from("getAllResponseHeaders"in x&&x.getAllResponseHeaders());(function(de,$e,We){var Oe=We.config.validateStatus;We.status&&Oe&&!Oe(We.status)?$e(new Ae("Request failed with status code "+We.status,[Ae.ERR_BAD_REQUEST,Ae.ERR_BAD_RESPONSE][Math.floor(We.status/100)-4],We.config,We.request,We)):de(We)})(function(de){l(de),v()},function(de){u(de),v()},{data:y&&y!=="text"&&y!=="json"?x.response:x.responseText,status:x.status,statusText:x.statusText,headers:ne,config:i,request:x}),x=null}}if(x.open(i.method.toUpperCase(),ci(Y,i.params,i.paramsSerializer),!0),x.timeout=i.timeout,"onloadend"in x?x.onloadend=$:x.onreadystatechange=function(){x&&x.readyState===4&&(x.status!==0||x.responseURL&&x.responseURL.indexOf("file:")===0)&&setTimeout($)},x.onabort=function(){x&&(u(new Ae("Request aborted",Ae.ECONNABORTED,i,x)),x=null)},x.onerror=function(){u(new Ae("Network Error",Ae.ERR_NETWORK,i,x)),x=null},x.ontimeout=function(){var ne=i.timeout?"timeout of "+i.timeout+"ms exceeded":"timeout exceeded",de=i.transitional||pi;i.timeoutErrorMessage&&(ne=i.timeoutErrorMessage),u(new Ae(ne,de.clarifyTimeoutError?Ae.ETIMEDOUT:Ae.ECONNABORTED,i,x)),x=null},wt.isStandardBrowserEnv){var G=(i.withCredentials||Dc(Y))&&i.xsrfCookieName&&Mc.read(i.xsrfCookieName);G&&p.set(i.xsrfHeaderName,G)}c===void 0&&p.setContentType(null),"setRequestHeader"in x&&P.forEach(p.toJSON(),function(ne,de){x.setRequestHeader(de,ne)}),P.isUndefined(i.withCredentials)||(x.withCredentials=!!i.withCredentials),y&&y!=="json"&&(x.responseType=i.responseType),typeof i.onDownloadProgress=="function"&&x.addEventListener("progress",vi(i.onDownloadProgress,!0)),typeof i.onUploadProgress=="function"&&x.upload&&x.upload.addEventListener("progress",vi(i.onUploadProgress)),(i.cancelToken||i.signal)&&(a=function(ne){x&&(u(!ne||ne.type?new jo(null,i,x):ne),x.abort(),x=null)},i.cancelToken&&i.cancelToken.subscribe(a),i.signal&&(i.signal.aborted?a():i.signal.addEventListener("abort",a)));var Z,V=(Z=/^([-+\w]{1,25})(:?\/\/|:)/.exec(Y))&&Z[1]||"";V&&wt.protocols.indexOf(V)===-1?u(new Ae("Unsupported protocol "+V+":",Ae.ERR_BAD_REQUEST,i)):x.send(c||null)})}};P.forEach(zr,function(i,l){if(i){try{Object.defineProperty(i,"name",{value:l})}catch{}Object.defineProperty(i,"adapterName",{value:l})}});function Mr(i){if(i.cancelToken&&i.cancelToken.throwIfRequested(),i.signal&&i.signal.aborted)throw new jo(null,i)}function xi(i){return Mr(i),i.headers=Ot.from(i.headers),i.data=jr.call(i,i.transformRequest),["post","put","patch"].indexOf(i.method)!==-1&&i.headers.setContentType("application/x-www-form-urlencoded",!1),function(l){for(var u,a,c=(l=P.isArray(l)?l:[l]).length,p=0;p<c&&(u=l[p],!(a=P.isString(u)?zr[u.toLowerCase()]:u));p++);if(!a)throw a===!1?new Ae("Adapter ".concat(u," is not supported by the environment"),"ERR_NOT_SUPPORT"):new Error(P.hasOwnProp(zr,u)?"Adapter '".concat(u,"' is not available in the build"):"Unknown adapter '".concat(u,"'"));if(!P.isFunction(a))throw new TypeError("adapter is not a function");return a}(i.adapter||Pr.adapter)(i).then(function(l){return Mr(i),l.data=jr.call(i,i.transformResponse,l),l.headers=Ot.from(l.headers),l},function(l){return mi(l)||(Mr(i),l&&l.response&&(l.response.data=jr.call(i,i.transformResponse,l.response),l.response.headers=Ot.from(l.response.headers))),Promise.reject(l)})}var Ei=function(i){return i instanceof Ot?i.toJSON():i};function hn(i,l){l=l||{};var u={};function a(L,T,Y){return P.isPlainObject(L)&&P.isPlainObject(T)?P.merge.call({caseless:Y},L,T):P.isPlainObject(T)?P.merge({},T):P.isArray(T)?T.slice():T}function c(L,T,Y){return P.isUndefined(T)?P.isUndefined(L)?void 0:a(void 0,L,Y):a(L,T,Y)}function p(L,T){if(!P.isUndefined(T))return a(void 0,T)}function y(L,T){return P.isUndefined(T)?P.isUndefined(L)?void 0:a(void 0,L):a(void 0,T)}function v(L,T,Y){return Y in l?a(L,T):Y in i?a(void 0,L):void 0}var x={url:p,method:p,data:p,baseURL:y,transformRequest:y,transformResponse:y,paramsSerializer:y,timeout:y,timeoutMessage:y,withCredentials:y,adapter:y,responseType:y,xsrfCookieName:y,xsrfHeaderName:y,onUploadProgress:y,onDownloadProgress:y,decompress:y,maxContentLength:y,maxBodyLength:y,beforeRedirect:y,transport:y,httpAgent:y,httpsAgent:y,cancelToken:y,socketPath:y,responseEncoding:y,validateStatus:v,headers:function(L,T){return c(Ei(L),Ei(T),!0)}};return P.forEach(Object.keys(i).concat(Object.keys(l)),function(L){var T=x[L]||c,Y=T(i[L],l[L],L);P.isUndefined(Y)&&T!==v||(u[L]=Y)}),u}function zo(i){return zo=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},zo(i)}var Dr={};["object","boolean","number","function","string","symbol"].forEach(function(i,l){Dr[i]=function(u){return zo(u)===i||"a"+(l<1?"n ":" ")+i}});var ki={};Dr.transitional=function(i,l,u){function a(c,p){return"[Axios v1.2.3] Transitional option '"+c+"'"+p+(u?". "+u:"")}return function(c,p,y){if(i===!1)throw new Ae(a(p," has been removed"+(l?" in "+l:"")),Ae.ERR_DEPRECATED);return l&&!ki[p]&&(ki[p]=!0,console.warn(a(p," has been deprecated since v"+l+" and will be removed in the near future"))),!i||i(c,p,y)}};const Fr={assertOptions:function(i,l,u){if(zo(i)!=="object")throw new Ae("options must be an object",Ae.ERR_BAD_OPTION_VALUE);for(var a=Object.keys(i),c=a.length;c-- >0;){var p=a[c],y=l[p];if(y){var v=i[p],x=v===void 0||y(v,p,i);if(x!==!0)throw new Ae("option "+p+" must be "+x,Ae.ERR_BAD_OPTION_VALUE)}else if(u!==!0)throw new Ae("Unknown option "+p,Ae.ERR_BAD_OPTION)}},validators:Dr};function Fn(i){return Fn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Fn(i)}function Fc(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(Fn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(Fn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Fn(c)==="symbol"?c:String(c)),a)}var c}var Ft=Fr.validators,Mo=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.defaults=a,this.interceptors={request:new di,response:new di}}var l,u;return l=i,(u=[{key:"request",value:function(a,c){typeof a=="string"?(c=c||{}).url=a:c=a||{};var p,y=c=hn(this.defaults,c),v=y.transitional,x=y.paramsSerializer,L=y.headers;v!==void 0&&Fr.assertOptions(v,{silentJSONParsing:Ft.transitional(Ft.boolean),forcedJSONParsing:Ft.transitional(Ft.boolean),clarifyTimeoutError:Ft.transitional(Ft.boolean)},!1),x!==void 0&&Fr.assertOptions(x,{encode:Ft.function,serialize:Ft.function},!0),c.method=(c.method||this.defaults.method||"get").toLowerCase(),(p=L&&P.merge(L.common,L[c.method]))&&P.forEach(["delete","get","head","post","put","patch","common"],function(Oe){delete L[Oe]}),c.headers=Ot.concat(p,L);var T=[],Y=!0;this.interceptors.request.forEach(function(Oe){typeof Oe.runWhen=="function"&&Oe.runWhen(c)===!1||(Y=Y&&Oe.synchronous,T.unshift(Oe.fulfilled,Oe.rejected))});var $,G=[];this.interceptors.response.forEach(function(Oe){G.push(Oe.fulfilled,Oe.rejected)});var Z,V=0;if(!Y){var ne=[xi.bind(this),void 0];for(ne.unshift.apply(ne,T),ne.push.apply(ne,G),Z=ne.length,$=Promise.resolve(c);V<Z;)$=$.then(ne[V++],ne[V++]);return $}Z=T.length;var de=c;for(V=0;V<Z;){var $e=T[V++],We=T[V++];try{de=$e(de)}catch(Oe){We.call(this,Oe);break}}try{$=xi.call(this,de)}catch(Oe){return Promise.reject(Oe)}for(V=0,Z=G.length;V<Z;)$=$.then(G[V++],G[V++]);return $}},{key:"getUri",value:function(a){return ci(gi((a=hn(this.defaults,a)).baseURL,a.url),a.params,a.paramsSerializer)}}])&&Fc(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();P.forEach(["delete","get","head","options"],function(i){Mo.prototype[i]=function(l,u){return this.request(hn(u||{},{method:i,url:l,data:(u||{}).data}))}}),P.forEach(["post","put","patch"],function(i){function l(u){return function(a,c,p){return this.request(hn(p||{},{method:i,headers:u?{"Content-Type":"multipart/form-data"}:{},url:a,data:c}))}}Mo.prototype[i]=l(),Mo.prototype[i+"Form"]=l(!0)});const Do=Mo;function qn(i){return qn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},qn(i)}function wi(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(qn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(qn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),qn(c)==="symbol"?c:String(c)),a)}var c}var qc=function(){function i(c){if(function(v,x){if(!(v instanceof x))throw new TypeError("Cannot call a class as a function")}(this,i),typeof c!="function")throw new TypeError("executor must be a function.");var p;this.promise=new Promise(function(v){p=v});var y=this;this.promise.then(function(v){if(y._listeners){for(var x=y._listeners.length;x-- >0;)y._listeners[x](v);y._listeners=null}}),this.promise.then=function(v){var x,L=new Promise(function(T){y.subscribe(T),x=T}).then(v);return L.cancel=function(){y.unsubscribe(x)},L},c(function(v,x,L){y.reason||(y.reason=new jo(v,x,L),p(y.reason))})}var l,u,a;return l=i,u=[{key:"throwIfRequested",value:function(){if(this.reason)throw this.reason}},{key:"subscribe",value:function(c){this.reason?c(this.reason):this._listeners?this._listeners.push(c):this._listeners=[c]}},{key:"unsubscribe",value:function(c){if(this._listeners){var p=this._listeners.indexOf(c);p!==-1&&this._listeners.splice(p,1)}}}],a=[{key:"source",value:function(){var c;return{token:new i(function(p){c=p}),cancel:c}}}],u&&wi(l.prototype,u),a&&wi(l,a),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Nc=qc;function Ci(i,l){(l==null||l>i.length)&&(l=i.length);for(var u=0,a=new Array(l);u<l;u++)a[u]=i[u];return a}var qr={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(qr).forEach(function(i){var l,u,a=(u=2,function(y){if(Array.isArray(y))return y}(l=i)||function(y,v){var x=y==null?null:typeof Symbol<"u"&&y[Symbol.iterator]||y["@@iterator"];if(x!=null){var L,T,Y,$,G=[],Z=!0,V=!1;try{if(Y=(x=x.call(y)).next,v===0){if(Object(x)!==x)return;Z=!1}else for(;!(Z=(L=Y.call(x)).done)&&(G.push(L.value),G.length!==v);Z=!0);}catch(ne){V=!0,T=ne}finally{try{if(!Z&&x.return!=null&&($=x.return(),Object($)!==$))return}finally{if(V)throw T}}return G}}(l,u)||function(y,v){if(y){if(typeof y=="string")return Ci(y,v);var x=Object.prototype.toString.call(y).slice(8,-1);return x==="Object"&&y.constructor&&(x=y.constructor.name),x==="Map"||x==="Set"?Array.from(y):x==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(x)?Ci(y,v):void 0}}(l,u)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()),c=a[0],p=a[1];qr[p]=c});const Hc=qr;var Qe=function i(l){var u=new Do(l),a=me(Do.prototype.request,u);return P.extend(a,Do.prototype,u,{allOwnKeys:!0}),P.extend(a,u,null,{allOwnKeys:!0}),a.create=function(c){return i(hn(l,c))},a}(Pr);Qe.Axios=Do,Qe.CanceledError=jo,Qe.CancelToken=Nc,Qe.isCancel=mi,Qe.VERSION="1.2.3",Qe.toFormData=To,Qe.AxiosError=Ae,Qe.Cancel=Qe.CanceledError,Qe.all=function(i){return Promise.all(i)},Qe.spread=function(i){return function(l){return i.apply(null,l)}},Qe.isAxiosError=function(i){return P.isObject(i)&&i.isAxiosError===!0},Qe.mergeConfig=hn,Qe.AxiosHeaders=Ot,Qe.formToJSON=function(i){return ui(P.isHTMLForm(i)?new FormData(i):i)},Qe.HttpStatusCode=Hc,Qe.default=Qe;const Bi=Qe,Wc={send:function(i){Bi.post(i.url,i.data).then(function(l){var u=l.data;u&&u.code===0?i.success&&i.success(u):i.error&&i.error(u&&u.msg)}).catch(function(l){console.error(l),i.error&&i.error()})},read:function(i){Bi.get(i.url).then(function(l){var u=l.data;u&&u.code===0?i.success&&i.success(u.data.map(function(a){return{time:a[0],type:a[1],color:a[2],author:a[3],text:a[4]}})):i.error&&i.error(u&&u.msg)}).catch(function(l){console.error(l),i.error&&i.error()})}};function Nr(i){return Nr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Nr(i)}function Uc(i){var l=this;this.lang=i,this.fallbackLang=this.lang.includes("-")?this.lang.split("-")[0]:this.lang,this.tran=function(u){return u=u.toLowerCase(),An[l.lang]&&An[l.lang][u]?An[l.lang][u]:An[l.fallbackLang]&&An[l.fallbackLang][u]?An[l.fallbackLang][u]:Hr[u]?Hr[u]:u}}var Hr={"danmaku-loading":"Danmaku is loading",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Input danmaku, hit Enter","about-author":"About author","dplayer-feedback":"DPlayer feedback","about-dplayer":"About DPlayer",loop:"Loop",speed:"Speed","opacity-danmaku":"Opacity for danmaku",normal:"Normal","please-input-danmaku":"Please input danmaku content!","set-danmaku-color":"Set danmaku color","set-danmaku-type":"Set danmaku type","show-danmaku":"Show danmaku","video-failed":"Video load failed","danmaku-failed":"Danmaku load failed","danmaku-send-failed":"Danmaku send failed","switching-quality":"Switching to %q quality","switched-quality":"Switched to %q quality",ff:"FF %s s",rew:"REW %s s","unlimited-danmaku":"Unlimited danmaku","send-danmaku":"Send danmaku",setting:"Setting",fullscreen:"Full screen","web-fullscreen":"Web full screen",send:"Send",screenshot:"Screenshot",airplay:"AirPlay",chromecast:"ChromeCast",subtitle:"Subtitle",off:"Off","show-subs":"Show subtitle","hide-subs":"Hide subtitle",volume:"Volume",live:"Live","video-info":"Video info"},An={en:Hr,"zh-cn":{"danmaku-loading":"弹幕加载中",top:"顶部",bottom:"底部",rolling:"滚动","input-danmaku-enter":"输入弹幕，回车发送","about-author":"关于作者","dplayer-feedback":"播放器意见反馈","about-dplayer":"关于 DPlayer 播放器",loop:"洗脑循环",speed:"速度","opacity-danmaku":"弹幕透明度",normal:"正常","please-input-danmaku":"要输入弹幕内容啊喂！","set-danmaku-color":"设置弹幕颜色","set-danmaku-type":"设置弹幕类型","show-danmaku":"显示弹幕","video-failed":"视频加载失败","danmaku-failed":"弹幕加载失败","danmaku-send-failed":"弹幕发送失败","switching-quality":"正在切换至 %q 画质","switched-quality":"已经切换至 %q 画质",ff:"快进 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"海量弹幕","send-danmaku":"发送弹幕",setting:"设置",fullscreen:"全屏","web-fullscreen":"页面全屏",send:"发送",screenshot:"截图",airplay:"无线投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"关闭","show-subs":"显示字幕","hide-subs":"隐藏字幕",volume:"音量",live:"直播","video-info":"视频统计信息"},"zh-tw":{"danmaku-loading":"彈幕載入中",top:"頂部",bottom:"底部",rolling:"滾動","input-danmaku-enter":"輸入彈幕，Enter 發送","about-author":"關於作者","dplayer-feedback":"播放器意見回饋","about-dplayer":"關於 DPlayer 播放器",loop:"循環播放",speed:"速度","opacity-danmaku":"彈幕透明度",normal:"正常","please-input-danmaku":"請輸入彈幕內容啊！","set-danmaku-color":"設定彈幕顏色","set-danmaku-type":"設定彈幕類型","show-danmaku":"顯示彈幕","video-failed":"影片載入失敗","danmaku-failed":"彈幕載入失敗","danmaku-send-failed":"彈幕發送失敗","switching-quality":"正在切換至 %q 畫質","switched-quality":"已經切換至 %q 畫質",ff:"快進 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"巨量彈幕","send-danmaku":"發送彈幕",setting:"設定",fullscreen:"全螢幕","web-fullscreen":"頁面全螢幕",send:"發送",screenshot:"截圖",airplay:"無線投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"關閉","show-subs":"顯示字幕","hide-subs":"隱藏字幕",volume:"音量",live:"直播","video-info":"影片統計訊息"},"ko-kr":{"danmaku-loading":"Danmaku를 불러오는 중입니다.",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Danmaku를 입력하고 Enter를 누르세요.","about-author":"만든이","dplayer-feedback":"피드백 보내기","about-dplayer":"DPlayer 정보",loop:"반복",speed:"배속","opacity-danmaku":"Danmaku 불투명도",normal:"표준","please-input-danmaku":"Danmaku를 입력하세요!","set-danmaku-color":"Danmaku 색상","set-danmaku-type":"Danmaku 설정","show-danmaku":"Danmaku 표시","video-failed":"비디오를 불러오지 못했습니다.","danmaku-failed":"Danmaku를 불러오지 못했습니다.","danmaku-send-failed":"Danmaku 전송에 실패했습니다.","Switching to":"","Switched to":"","switching-quality":"전환 %q 화질","switched-quality":"전환 됨 %q 화질",ff:"앞으로 %s 초",rew:"뒤로 %s 초","unlimited-danmaku":"끝없는 Danmaku","send-danmaku":"Danmaku 보내기",setting:"설정",fullscreen:"전체 화면","web-fullscreen":"웹 내 전체화면",send:"보내기",screenshot:"화면 캡쳐",airplay:"에어플레이",chromecast:"ChromeCast",subtitle:"부제",off:"끄다","show-subs":"자막 보이기","hide-subs":"자막 숨기기",Volume:"볼륨",live:"생방송","video-info":"비디오 정보"},de:{"danmaku-loading":"Danmaku lädt...",top:"Oben",bottom:"Unten",rolling:"Rollend","input-danmaku-enter":"Drücke Enter nach dem Einfügen vom Danmaku","about-author":"Über den Autor","dplayer-feedback":"DPlayer Feedback","about-dplayer":"Über DPlayer",loop:"Wiederholen",speed:"Geschwindigkeit","opacity-danmaku":"Transparenz für Danmaku",normal:"Normal","please-input-danmaku":"Bitte Danmaku Inhalt eingeben!","set-danmaku-color":"Danmaku Farbe festlegen","set-danmaku-type":"Danmaku Typ festlegen","show-danmaku":"Zeige Danmaku","video-failed":"Das Video konnte nicht geladen werden","danmaku-failed":"Danmaku konnte nicht geladen werden","danmaku-send-failed":"Das senden von Danmaku ist fehgeschlagen","switching-quality":"Wechsle zur %q Qualität","switched-quality":"Zur %q Qualität gewechselt",ff:"%s s Vorwärts",rew:"%s s Zurück","unlimited-danmaku":"Unlimitiertes Danmaku","send-danmaku":"Sende Danmaku",setting:"Einstellungen",fullscreen:"Vollbild","web-fullscreen":"Browser Vollbild",send:"Senden",screenshot:"Screenshot",airplay:"AirPlay","show-subs":"Zeige Untertitel",chromecast:"ChromeCast",subtitle:"Untertitel",off:"Schließung","hide-subs":"Verstecke Untertitel",volume:"Lautstärke",live:"Live","video-info":"Video Info"}},Yc=r(730),Kc=r.n(Yc),Vc=r(74),Qc=r.n(Vc),$c=r(437),Zc=r.n($c),Jc=r(644),Xc=r.n(Jc),Gc=r(324),ed=r.n(Gc),td=r(574),nd=r.n(td),od=r(300),rd=r.n(od),ad=r(934),id=r.n(ad),ld=r(428),sd=r.n(ld),cd=r(807),dd=r.n(cd),pd=r(338),ud=r.n(pd),fd=r(254),hd=r.n(fd),Ad=r(965),yd=r.n(Ad),md=r(113),bd=r.n(md),gd=r(251),vd=r.n(gd),xd=r(410),Ed=r.n(xd),kd=r(182),wd=r.n(kd),Cd=r(193),Bd=r.n(Cd);const mt={play:Kc(),pause:Qc(),volumeUp:Zc(),volumeDown:Xc(),volumeOff:ed(),full:nd(),fullWeb:rd(),setting:id(),right:sd(),comment:dd(),commentOff:ud(),send:hd(),pallette:yd(),camera:bd(),subtitle:Ed(),loading:wd(),airplay:vd(),chromecast:Bd()};var Sd=r(916),Ld=r.n(Sd);function Nn(i){return Nn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Nn(i)}function Si(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(Nn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(Nn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Nn(c)==="symbol"?c:String(c)),a)}var c}var _d=function(){function i(c){(function(p,y){if(!(p instanceof y))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=c.container,this.options=c.options,this.index=c.index,this.tran=c.tran,this.init()}var l,u,a;return l=i,a=[{key:"NewNotice",value:function(c,p,y){var v=document.createElement("div");return v.classList.add("dplayer-notice"),v.style.opacity=p,v.innerText=c,y&&(v.id="dplayer-notice-".concat(y)),v}}],(u=[{key:"init",value:function(){this.container.innerHTML=Ld()({options:this.options,index:this.index,tran:this.tran,icons:mt,mobile:H.isMobile,video:{current:!0,pic:this.options.video.pic,screenshot:this.options.screenshot,airplay:!(!H.isSafari||H.isChrome)&&this.options.airplay,chromecast:this.options.chromecast,preload:this.options.preload,url:this.options.video.url,subtitle:this.options.subtitle}}),this.volumeBar=this.container.querySelector(".dplayer-volume-bar-inner"),this.volumeBarWrap=this.container.querySelector(".dplayer-volume-bar"),this.volumeBarWrapWrap=this.container.querySelector(".dplayer-volume-bar-wrap"),this.volumeButton=this.container.querySelector(".dplayer-volume"),this.volumeButtonIcon=this.container.querySelector(".dplayer-volume-icon"),this.volumeIcon=this.container.querySelector(".dplayer-volume-icon .dplayer-icon-content"),this.playedBar=this.container.querySelector(".dplayer-played"),this.loadedBar=this.container.querySelector(".dplayer-loaded"),this.playedBarWrap=this.container.querySelector(".dplayer-bar-wrap"),this.playedBarTime=this.container.querySelector(".dplayer-bar-time"),this.danmaku=this.container.querySelector(".dplayer-danmaku"),this.danmakuLoading=this.container.querySelector(".dplayer-danloading"),this.video=this.container.querySelector(".dplayer-video-current"),this.bezel=this.container.querySelector(".dplayer-bezel-icon"),this.playButton=this.container.querySelector(".dplayer-play-icon"),this.mobilePlayButton=this.container.querySelector(".dplayer-mobile-play"),this.videoWrap=this.container.querySelector(".dplayer-video-wrap"),this.controllerMask=this.container.querySelector(".dplayer-controller-mask"),this.ptime=this.container.querySelector(".dplayer-ptime"),this.settingButton=this.container.querySelector(".dplayer-setting-icon"),this.settingBox=this.container.querySelector(".dplayer-setting-box"),this.mask=this.container.querySelector(".dplayer-mask"),this.loop=this.container.querySelector(".dplayer-setting-loop"),this.loopToggle=this.container.querySelector(".dplayer-setting-loop .dplayer-toggle-setting-input"),this.showDanmaku=this.container.querySelector(".dplayer-setting-showdan"),this.showDanmakuToggle=this.container.querySelector(".dplayer-showdan-setting-input"),this.unlimitDanmaku=this.container.querySelector(".dplayer-setting-danunlimit"),this.unlimitDanmakuToggle=this.container.querySelector(".dplayer-danunlimit-setting-input"),this.speed=this.container.querySelector(".dplayer-setting-speed"),this.speedItem=this.container.querySelectorAll(".dplayer-setting-speed-item"),this.danmakuOpacityBar=this.container.querySelector(".dplayer-danmaku-bar-inner"),this.danmakuOpacityBarWrap=this.container.querySelector(".dplayer-danmaku-bar"),this.danmakuOpacityBarWrapWrap=this.container.querySelector(".dplayer-danmaku-bar-wrap"),this.danmakuOpacityBox=this.container.querySelector(".dplayer-setting-danmaku"),this.dtime=this.container.querySelector(".dplayer-dtime"),this.controller=this.container.querySelector(".dplayer-controller"),this.commentInput=this.container.querySelector(".dplayer-comment-input"),this.commentButton=this.container.querySelector(".dplayer-comment-icon"),this.commentSettingBox=this.container.querySelector(".dplayer-comment-setting-box"),this.commentSettingButton=this.container.querySelector(".dplayer-comment-setting-icon"),this.commentSettingFill=this.container.querySelector(".dplayer-comment-setting-icon path"),this.commentSendButton=this.container.querySelector(".dplayer-send-icon"),this.commentSendFill=this.container.querySelector(".dplayer-send-icon path"),this.commentColorSettingBox=this.container.querySelector(".dplayer-comment-setting-color"),this.browserFullButton=this.container.querySelector(".dplayer-full-icon"),this.webFullButton=this.container.querySelector(".dplayer-full-in-icon"),this.menu=this.container.querySelector(".dplayer-menu"),this.menuItem=this.container.querySelectorAll(".dplayer-menu-item"),this.qualityList=this.container.querySelector(".dplayer-quality-list"),this.camareButton=this.container.querySelector(".dplayer-camera-icon"),this.airplayButton=this.container.querySelector(".dplayer-airplay-icon"),this.chromecastButton=this.container.querySelector(".dplayer-chromecast-icon"),this.subtitleButton=this.container.querySelector(".dplayer-subtitle-icon"),this.subtitleButtonInner=this.container.querySelector(".dplayer-subtitle-icon .dplayer-icon-content"),this.subtitlesButton=this.container.querySelector(".dplayer-subtitles-icon"),this.subtitlesBox=this.container.querySelector(".dplayer-subtitles-box"),this.subtitlesItem=this.container.querySelectorAll(".dplayer-subtitles-item"),this.subtitle=this.container.querySelector(".dplayer-subtitle"),this.subtrack=this.container.querySelector(".dplayer-subtrack"),this.qualityButton=this.container.querySelector(".dplayer-quality-icon"),this.barPreview=this.container.querySelector(".dplayer-bar-preview"),this.barWrap=this.container.querySelector(".dplayer-bar-wrap"),this.noticeList=this.container.querySelector(".dplayer-notice-list"),this.infoPanel=this.container.querySelector(".dplayer-info-panel"),this.infoPanelClose=this.container.querySelector(".dplayer-info-panel-close"),this.infoVersion=this.container.querySelector(".dplayer-info-panel-item-version .dplayer-info-panel-item-data"),this.infoFPS=this.container.querySelector(".dplayer-info-panel-item-fps .dplayer-info-panel-item-data"),this.infoType=this.container.querySelector(".dplayer-info-panel-item-type .dplayer-info-panel-item-data"),this.infoUrl=this.container.querySelector(".dplayer-info-panel-item-url .dplayer-info-panel-item-data"),this.infoResolution=this.container.querySelector(".dplayer-info-panel-item-resolution .dplayer-info-panel-item-data"),this.infoDuration=this.container.querySelector(".dplayer-info-panel-item-duration .dplayer-info-panel-item-data"),this.infoDanmakuId=this.container.querySelector(".dplayer-info-panel-item-danmaku-id .dplayer-info-panel-item-data"),this.infoDanmakuApi=this.container.querySelector(".dplayer-info-panel-item-danmaku-api .dplayer-info-panel-item-data"),this.infoDanmakuAmount=this.container.querySelector(".dplayer-info-panel-item-danmaku-amount .dplayer-info-panel-item-data")}}])&&Si(l.prototype,u),a&&Si(l,a),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Li=_d;function yn(i){return yn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},yn(i)}function Id(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(yn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(yn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),yn(c)==="symbol"?c:String(c)),a)}var c}var Td=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.options=a,this.player=this.options.player,this.container=this.options.container,this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.dan=[],this.showing=!0,this._opacity=this.options.opacity,this.events=this.options.events,this.unlimited=this.options.unlimited,this._measure(""),this.load()}var l,u;return l=i,u=[{key:"load",value:function(){var a,c=this;a=this.options.api.maximum?"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id,"&max=").concat(this.options.api.maximum):"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id);var p=(this.options.api.addition||[]).slice(0);p.push(a),this.events&&this.events.trigger("danmaku_load_start",p),this._readAllEndpoints(p,function(y){c.dan=[].concat.apply([],y).sort(function(v,x){return v.time-x.time}),window.requestAnimationFrame(function(){c.frame()}),c.options.callback(),c.events&&c.events.trigger("danmaku_load_end")})}},{key:"reload",value:function(a){this.options.api=a,this.dan=[],this.clear(),this.load()}},{key:"_readAllEndpoints",value:function(a,c){for(var p=this,y=[],v=0,x=function(T){p.options.apiBackend.read({url:a[T],success:function(Y){y[T]=Y,++v===a.length&&c(y)},error:function(Y){p.options.error(Y||p.options.tran("danmaku-failed")),y[T]=[],++v===a.length&&c(y)}})},L=0;L<a.length;++L)x(L)}},{key:"send",value:function(a,c){var p=this,y={token:this.options.api.token,id:this.options.api.id,author:this.options.api.user,time:this.options.time(),text:a.text,color:a.color,type:a.type};this.options.apiBackend.send({url:this.options.api.address+"v3/",data:y,success:c,error:function(x){p.options.error(x||p.options.tran("danmaku-failed"))}}),this.dan.splice(this.danIndex,0,y),this.danIndex++;var v={text:this.htmlEncode(y.text),color:y.color,type:y.type,border:"2px solid ".concat(this.options.borderColor)};this.draw(v),this.events&&this.events.trigger("danmaku_send",y)}},{key:"frame",value:function(){var a=this;if(this.dan.length&&!this.paused&&this.showing){for(var c=this.dan[this.danIndex],p=[];c&&this.options.time()>parseFloat(c.time);)p.push(c),c=this.dan[++this.danIndex];this.draw(p)}window.requestAnimationFrame(function(){a.frame()})}},{key:"opacity",value:function(a){if(a!==void 0){for(var c=this.container.getElementsByClassName("dplayer-danmaku-item"),p=0;p<c.length;p++)c[p].style.opacity=a;this._opacity=a,this.events&&this.events.trigger("danmaku_opacity",this._opacity)}return this._opacity}},{key:"draw",value:function(a){var c=this;if(this.showing){var p=this.options.height,y=this.container.offsetWidth,v=this.container.offsetHeight,x=parseInt(v/p),L=function(V){var ne=V.offsetWidth||parseInt(V.style.width),de=V.getBoundingClientRect().right||c.container.getBoundingClientRect().right+ne;return c.container.getBoundingClientRect().right-de},T=function(V){return(y+V)/5},Y=function(V,ne,de){for(var $e=y/T(de),We=function(Gt){var bn=c.danTunnel[ne][Gt+""];if(!bn||!bn.length)return c.danTunnel[ne][Gt+""]=[V],V.addEventListener("animationend",function(){c.danTunnel[ne][Gt+""].splice(0,1)}),{v:Gt%x};if(ne!=="right")return"continue";for(var ro=0;ro<bn.length;ro++){var Pi=L(bn[ro])-10;if(Pi<=y-$e*T(parseInt(bn[ro].style.width))||Pi<=0)break;if(ro===bn.length-1)return c.danTunnel[ne][Gt+""].push(V),V.addEventListener("animationend",function(){c.danTunnel[ne][Gt+""].splice(0,1)}),{v:Gt%x}}},Oe=0;c.unlimited||Oe<x;Oe++){var Nt=We(Oe);if(Nt!=="continue"&&yn(Nt)==="object")return Nt.v}return-1};Object.prototype.toString.call(a)!=="[object Array]"&&(a=[a]);for(var $=document.createDocumentFragment(),G=function(){a[Z].type=H.number2Type(a[Z].type),a[Z].color||(a[Z].color=16777215);var V=document.createElement("div");V.classList.add("dplayer-danmaku-item"),V.classList.add("dplayer-danmaku-".concat(a[Z].type)),a[Z].border?V.innerHTML='<span style="border:'.concat(a[Z].border,'">').concat(a[Z].text,"</span>"):V.innerHTML=a[Z].text,V.style.opacity=c._opacity,V.style.color=H.number2Color(a[Z].color),V.addEventListener("animationend",function(){c.container.removeChild(V)});var ne,de=c._measure(a[Z].text);switch(a[Z].type){case"right":(ne=Y(V,a[Z].type,de))>=0&&(V.style.width=de+1+"px",V.style.top=p*ne+"px",V.style.transform="translateX(-".concat(y,"px)"));break;case"top":(ne=Y(V,a[Z].type))>=0&&(V.style.top=p*ne+"px");break;case"bottom":(ne=Y(V,a[Z].type))>=0&&(V.style.bottom=p*ne+"px");break;default:console.error("Can't handled danmaku type: ".concat(a[Z].type))}ne>=0&&(V.classList.add("dplayer-danmaku-move"),V.style.animationDuration=c._danAnimation(a[Z].type),$.appendChild(V))},Z=0;Z<a.length;Z++)G();return this.container.appendChild($),$}}},{key:"play",value:function(){this.paused=!1}},{key:"pause",value:function(){this.paused=!0}},{key:"_measure",value:function(a){if(!this.context){var c=getComputedStyle(this.container.getElementsByClassName("dplayer-danmaku-item")[0],null);this.context=document.createElement("canvas").getContext("2d"),this.context.font=c.getPropertyValue("font")}return this.context.measureText(a).width}},{key:"seek",value:function(){this.clear();for(var a=0;a<this.dan.length;a++){if(this.dan[a].time>=this.options.time()){this.danIndex=a;break}this.danIndex=this.dan.length}}},{key:"clear",value:function(){this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.options.container.innerHTML="",this.events&&this.events.trigger("danmaku_clear")}},{key:"htmlEncode",value:function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2f;")}},{key:"resize",value:function(){for(var a=this.container.offsetWidth,c=this.container.getElementsByClassName("dplayer-danmaku-item"),p=0;p<c.length;p++)c[p].style.transform="translateX(-".concat(a,"px)")}},{key:"hide",value:function(){this.showing=!1,this.pause(),this.clear(),this.events&&this.events.trigger("danmaku_hide")}},{key:"show",value:function(){this.seek(),this.showing=!0,this.play(),this.events&&this.events.trigger("danmaku_show")}},{key:"unlimit",value:function(a){this.unlimited=a}},{key:"speed",value:function(a){this.options.api.speedRate=a}},{key:"_danAnimation",value:function(a){var c=this.options.api.speedRate||1,p=!!this.player.fullScreen.isFullScreen();return{top:"".concat((p?6:4)/c,"s"),right:"".concat((p?8:5)/c,"s"),bottom:"".concat((p?6:4)/c,"s")}[a]}}],u&&Id(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Od=Td;function Hn(i){return Hn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Hn(i)}function Rd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(Hn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(Hn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Hn(c)==="symbol"?c:String(c)),a)}var c}const Pd=function(){function i(){(function(a,c){if(!(a instanceof c))throw new TypeError("Cannot call a class as a function")})(this,i),this.events={},this.videoEvents=["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","mozaudioavailable","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],this.playerEvents=["screenshot","thumbnails_show","thumbnails_hide","danmaku_show","danmaku_hide","danmaku_clear","danmaku_loaded","danmaku_send","danmaku_opacity","contextmenu_show","contextmenu_hide","notice_show","notice_hide","quality_start","quality_end","destroy","resize","fullscreen","fullscreen_cancel","webfullscreen","webfullscreen_cancel","subtitle_show","subtitle_hide","subtitle_change"]}var l,u;return l=i,(u=[{key:"on",value:function(a,c){this.type(a)&&typeof c=="function"&&(this.events[a]||(this.events[a]=[]),this.events[a].push(c))}},{key:"trigger",value:function(a,c){if(this.events[a]&&this.events[a].length)for(var p=0;p<this.events[a].length;p++)this.events[a][p](c)}},{key:"type",value:function(a){return this.playerEvents.indexOf(a)!==-1?"player":this.videoEvents.indexOf(a)!==-1?"video":(console.error("Unknown event name: ".concat(a)),null)}}])&&Rd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();function Wn(i){return Wn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Wn(i)}function jd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(Wn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(Wn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Wn(c)==="symbol"?c:String(c)),a)}var c}var zd=function(){function i(a){var c=this;(function(p,y){if(!(p instanceof y))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.lastScrollPosition={left:0,top:0},this.player.events.on("webfullscreen",function(){c.player.resize()}),this.player.events.on("webfullscreen_cancel",function(){c.player.resize(),H.setScrollPosition(c.lastScrollPosition)}),this.fullscreenchange=function(){c.player.resize(),c.isFullScreen("browser")?c.player.events.trigger("fullscreen"):(H.setScrollPosition(c.lastScrollPosition),c.player.events.trigger("fullscreen_cancel"))},this.docfullscreenchange=function(){var p=document.fullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;p&&p!==c.player.container||(c.player.resize(),p?c.player.events.trigger("fullscreen"):(H.setScrollPosition(c.lastScrollPosition),c.player.events.trigger("fullscreen_cancel")))},/Firefox/.test(navigator.userAgent)?(document.addEventListener("mozfullscreenchange",this.docfullscreenchange),document.addEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.addEventListener("fullscreenchange",this.fullscreenchange),this.player.container.addEventListener("webkitfullscreenchange",this.fullscreenchange),document.addEventListener("msfullscreenchange",this.docfullscreenchange),document.addEventListener("MSFullscreenChange",this.docfullscreenchange))}var l,u;return l=i,u=[{key:"isFullScreen",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(a){case"browser":return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;case"web":return this.player.container.classList.contains("dplayer-fulled")}}},{key:"request",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser",c=a==="browser"?"web":"browser",p=this.isFullScreen(c);switch(p||(this.lastScrollPosition=H.getScrollPosition()),a){case"browser":this.player.container.requestFullscreen?this.player.container.requestFullscreen():this.player.container.mozRequestFullScreen?this.player.container.mozRequestFullScreen():this.player.container.webkitRequestFullscreen?this.player.container.webkitRequestFullscreen():this.player.video.webkitEnterFullscreen?this.player.video.webkitEnterFullscreen():this.player.video.webkitEnterFullScreen?this.player.video.webkitEnterFullScreen():this.player.container.msRequestFullscreen&&this.player.container.msRequestFullscreen();break;case"web":this.player.container.classList.add("dplayer-fulled"),document.body.classList.add("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen")}p&&this.cancel(c)}},{key:"cancel",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(a){case"browser":document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.webkitCancelFullscreen?document.webkitCancelFullscreen():document.msCancelFullScreen?document.msCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen();break;case"web":this.player.container.classList.remove("dplayer-fulled"),document.body.classList.remove("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen_cancel")}}},{key:"toggle",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";this.isFullScreen(a)?this.cancel(a):this.request(a)}},{key:"destroy",value:function(){/Firefox/.test(navigator.userAgent)?(document.removeEventListener("mozfullscreenchange",this.docfullscreenchange),document.removeEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.removeEventListener("fullscreenchange",this.fullscreenchange),this.player.container.removeEventListener("webkitfullscreenchange",this.fullscreenchange),document.removeEventListener("msfullscreenchange",this.docfullscreenchange),document.removeEventListener("MSFullscreenChange",this.docfullscreenchange))}}],u&&jd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Md=zd;function Un(i){return Un=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Un(i)}function Dd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(Un(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(Un(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Un(c)==="symbol"?c:String(c)),a)}var c}var Fd=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.storageName={opacity:"dplayer-danmaku-opacity",volume:"dplayer-volume",unlimited:"dplayer-danmaku-unlimited",danmaku:"dplayer-danmaku-show",subtitle:"dplayer-subtitle-show"},this.default={opacity:.7,volume:a.options.hasOwnProperty("volume")?a.options.volume:.7,unlimited:(a.options.danmaku&&a.options.danmaku.unlimited?1:0)||0,danmaku:1,subtitle:1},this.data={},this.init()}var l,u;return l=i,(u=[{key:"init",value:function(){for(var a in this.storageName){var c=this.storageName[a];this.data[a]=parseFloat(H.storage.get(c)||this.default[a])}}},{key:"get",value:function(a){return this.data[a]}},{key:"set",value:function(a,c){this.data[a]=c,H.storage.set(this.storageName[a],c)}}])&&Dd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const qd=Fd;function Yn(i){return Yn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Yn(i)}function Nd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(Yn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(Yn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Yn(c)==="symbol"?c:String(c)),a)}var c}var Hd=function(){function i(a,c,p,y){(function(v,x){if(!(v instanceof x))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a,this.video=c,this.options=p,this.events=y,this.init()}var l,u;return l=i,u=[{key:"init",value:function(){var a=this;if(this.container.style.fontSize=this.options.fontSize,this.container.style.bottom=this.options.bottom,this.container.style.color=this.options.color,this.video.textTracks&&this.video.textTracks[0]){var c=this.video.textTracks[0];c.oncuechange=function(){var p=c.activeCues[c.activeCues.length-1];if(a.container.innerHTML="",p){var y=document.createElement("div");y.appendChild(p.getCueAsHTML());var v=y.innerHTML.split(/\r?\n/).map(function(x){return"<p>".concat(x,"</p>")}).join("");a.container.innerHTML=v}a.events.trigger("subtitle_change")}}}},{key:"show",value:function(){this.container.classList.remove("dplayer-subtitle-hide"),this.events.trigger("subtitle_show")}},{key:"hide",value:function(){this.container.classList.add("dplayer-subtitle-hide"),this.events.trigger("subtitle_hide")}},{key:"toggle",value:function(){this.container.classList.contains("dplayer-subtitle-hide")?this.show():this.hide()}}],u&&Nd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Wd=Hd;function Kn(i){return Kn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Kn(i)}function Ud(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(Kn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(Kn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Kn(c)==="symbol"?c:String(c)),a)}var c}var Yd=function(){function i(a){var c=this;(function(x,L){if(!(x instanceof L))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.player.template.mask.addEventListener("click",function(){c.hide()}),this.player.template.subtitlesButton.addEventListener("click",function(){c.adaptiveHeight(),c.show()});for(var p=this.player.template.subtitlesItem.length-1,y=function(x){c.player.template.subtitlesItem[x].addEventListener("click",function(){c.hide(),c.player.options.subtitle.index!==x&&(c.player.template.subtitle.innerHTML="<p></p>",c.player.template.subtrack.src=c.player.template.subtitlesItem[x].dataset.subtitle,c.player.options.subtitle.index=x,c.player.template.subtitle.classList.contains("dplayer-subtitle-hide")&&c.subContainerShow())})},v=0;v<p;v++)y(v);this.player.template.subtitlesItem[p].addEventListener("click",function(){c.hide(),c.player.options.subtitle.index!==p&&(c.player.template.subtitle.innerHTML="<p></p>",c.player.template.subtrack.src="",c.player.options.subtitle.index=p,c.subContainerHide())})}var l,u;return l=i,(u=[{key:"subContainerShow",value:function(){this.player.template.subtitle.classList.remove("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_show")}},{key:"subContainerHide",value:function(){this.player.template.subtitle.classList.add("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_hide")}},{key:"hide",value:function(){this.player.template.subtitlesBox.classList.remove("dplayer-subtitles-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.subtitlesBox.classList.add("dplayer-subtitles-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}},{key:"adaptiveHeight",value:function(){var a=30*this.player.template.subtitlesItem.length+14,c=.8*this.player.template.videoWrap.offsetHeight;a>=c-50?(this.player.template.subtitlesBox.style.bottom="8px",this.player.template.subtitlesBox.style["max-height"]=c-8+"px"):(this.player.template.subtitlesBox.style.bottom="50px",this.player.template.subtitlesBox.style["max-height"]=c-50+"px")}}])&&Ud(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Kd=Yd;function Vn(i){return Vn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Vn(i)}function Vd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(Vn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(Vn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Vn(c)==="symbol"?c:String(c)),a)}var c}var Qd=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.elements={},this.elements.volume=a.volumeBar,this.elements.played=a.playedBar,this.elements.loaded=a.loadedBar,this.elements.danmaku=a.danmakuOpacityBar}var l,u;return l=i,(u=[{key:"set",value:function(a,c,p){c=Math.max(c,0),c=Math.min(c,1),this.elements[a].style[p]=100*c+"%"}},{key:"get",value:function(a){return parseFloat(this.elements[a].style.width)/100}}])&&Vd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const $d=Qd;function Qn(i){return Qn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Qn(i)}function Zd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(Qn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(Qn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Qn(c)==="symbol"?c:String(c)),a)}var c}var Jd=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(c){window.setTimeout(c,1e3/60)},this.types=["loading","info","fps"],this.init()}var l,u;return l=i,(u=[{key:"init",value:function(){var a=this;this.types.map(function(c){return c!=="fps"&&a["init".concat(c,"Checker")](),c})}},{key:"initloadingChecker",value:function(){var a=this,c=0,p=0,y=!1;this.loadingChecker=setInterval(function(){a.enableloadingChecker&&(p=a.player.video.currentTime,y||p!==c||a.player.video.paused||(a.player.container.classList.add("dplayer-loading"),y=!0),y&&p>c&&!a.player.video.paused&&(a.player.container.classList.remove("dplayer-loading"),y=!1),c=p)},100)}},{key:"initfpsChecker",value:function(){var a=this;window.requestAnimationFrame(function(){if(a.enablefpsChecker)if(a.initfpsChecker(),a.fpsStart){a.fpsIndex++;var c=new Date;c-a.fpsStart>1e3&&(a.player.infoPanel.fps(a.fpsIndex/(c-a.fpsStart)*1e3),a.fpsStart=new Date,a.fpsIndex=0)}else a.fpsStart=new Date,a.fpsIndex=0;else a.fpsStart=0,a.fpsIndex=0})}},{key:"initinfoChecker",value:function(){var a=this;this.infoChecker=setInterval(function(){a.enableinfoChecker&&a.player.infoPanel.update()},1e3)}},{key:"enable",value:function(a){this["enable".concat(a,"Checker")]=!0,a==="fps"&&this.initfpsChecker()}},{key:"disable",value:function(a){this["enable".concat(a,"Checker")]=!1}},{key:"destroy",value:function(){var a=this;this.types.map(function(c){return a["enable".concat(c,"Checker")]=!1,a["".concat(c,"Checker")]&&clearInterval(a["".concat(c,"Checker")]),c})}}])&&Zd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Xd=Jd;function $n(i){return $n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},$n(i)}function Gd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if($n(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if($n(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),$n(c)==="symbol"?c:String(c)),a)}var c}const ep=function(){function i(a){var c=this;(function(p,y){if(!(p instanceof y))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a,this.container.addEventListener("animationend",function(){c.container.classList.remove("dplayer-bezel-transition")})}var l,u;return l=i,(u=[{key:"switch",value:function(a){this.container.innerHTML=a,this.container.classList.add("dplayer-bezel-transition")}}])&&Gd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();function Zn(i){return Zn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Zn(i)}function tp(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(Zn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(Zn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Zn(c)==="symbol"?c:String(c)),a)}var c}var np=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a.container,this.barWidth=a.barWidth,this.container.style.backgroundImage="url('".concat(a.url,"')"),this.events=a.events}var l,u;return l=i,(u=[{key:"resize",value:function(a,c,p){this.container.style.width="".concat(a,"px"),this.container.style.height="".concat(c,"px"),this.container.style.top="".concat(2-c,"px"),this.barWidth=p}},{key:"show",value:function(){this.container.style.display="block",this.events&&this.events.trigger("thumbnails_show")}},{key:"move",value:function(a){this.container.style.backgroundPosition="-".concat(160*(Math.ceil(a/this.barWidth*100)-1),"px 0"),this.container.style.left="".concat(Math.min(Math.max(a-this.container.offsetWidth/2,-10),this.barWidth-150),"px")}},{key:"hide",value:function(){this.container.style.display="none",this.events&&this.events.trigger("thumbnails_hide")}}])&&tp(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const op=np;function Jn(i){return Jn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Jn(i)}function rp(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(Jn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(Jn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Jn(c)==="symbol"?c:String(c)),a)}var c}var qt,_i=!0,Wr=!1,ap=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.autoHideTimer=0,H.isMobile||(this.setAutoHideHandler=this.setAutoHide.bind(this),this.player.container.addEventListener("mousemove",this.setAutoHideHandler),this.player.container.addEventListener("click",this.setAutoHideHandler),this.player.on("play",this.setAutoHideHandler),this.player.on("pause",this.setAutoHideHandler)),this.initPlayButton(),this.initThumbnails(),this.initPlayedBar(),this.initFullButton(),this.initQualityButton(),this.initScreenshotButton(),this.player.options.subtitle&&typeof this.player.options.subtitle.url=="string"&&this.initSubtitleButton(),this.initHighlights(),this.initAirplayButton(),this.initChromecastButton(),H.isMobile||this.initVolumeButton()}var l,u;return l=i,(u=[{key:"initPlayButton",value:function(){var a=this;this.player.template.playButton.addEventListener("click",function(){a.player.toggle()}),this.player.template.mobilePlayButton.addEventListener("click",function(){a.player.toggle()}),H.isMobile?(this.player.template.videoWrap.addEventListener("click",function(){a.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){a.toggle()})):this.player.options.preventClickToggle||(this.player.template.videoWrap.addEventListener("click",function(){a.player.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){a.player.toggle()}))}},{key:"initHighlights",value:function(){var a=this;this.player.on("durationchange",function(){if(a.player.video.duration!==1&&a.player.video.duration!==1/0&&a.player.options.highlight){var c=a.player.template.playedBarWrap.querySelectorAll(".dplayer-highlight");[].slice.call(c,0).forEach(function(v){a.player.template.playedBarWrap.removeChild(v)});for(var p=0;p<a.player.options.highlight.length;p++)if(a.player.options.highlight[p].text&&a.player.options.highlight[p].time){var y=document.createElement("div");y.classList.add("dplayer-highlight"),y.style.left=a.player.options.highlight[p].time/a.player.video.duration*100+"%",y.innerHTML='<span class="dplayer-highlight-text">'+a.player.options.highlight[p].text+"</span>",a.player.template.playedBarWrap.insertBefore(y,a.player.template.playedBarTime)}}})}},{key:"initThumbnails",value:function(){var a=this;this.player.options.video.thumbnails&&(this.thumbnails=new op({container:this.player.template.barPreview,barWidth:this.player.template.barWrap.offsetWidth,url:this.player.options.video.thumbnails,events:this.player.events}),this.player.on("loadedmetadata",function(){a.thumbnails.resize(160,a.player.video.videoHeight/a.player.video.videoWidth*160,a.player.template.barWrap.offsetWidth)}))}},{key:"initPlayedBar",value:function(){var a=this,c=function(y){var v=((y.clientX||y.changedTouches[0].clientX)-H.getBoundingClientRectViewLeft(a.player.template.playedBarWrap))/a.player.template.playedBarWrap.clientWidth;v=Math.max(v,0),v=Math.min(v,1),a.player.bar.set("played",v,"width"),a.player.template.ptime.innerHTML=H.secondToTime(v*a.player.video.duration)},p=function y(v){document.removeEventListener(H.nameMap.dragEnd,y),document.removeEventListener(H.nameMap.dragMove,c);var x=((v.clientX||v.changedTouches[0].clientX)-H.getBoundingClientRectViewLeft(a.player.template.playedBarWrap))/a.player.template.playedBarWrap.clientWidth;x=Math.max(x,0),x=Math.min(x,1),a.player.bar.set("played",x,"width"),a.player.seek(a.player.bar.get("played")*a.player.video.duration),a.player.timer.enable("progress")};this.player.template.playedBarWrap.addEventListener(H.nameMap.dragStart,function(){a.player.timer.disable("progress"),document.addEventListener(H.nameMap.dragMove,c),document.addEventListener(H.nameMap.dragEnd,p)}),this.player.template.playedBarWrap.addEventListener(H.nameMap.dragMove,function(y){if(a.player.video.duration){var v=a.player.template.playedBarWrap.getBoundingClientRect().left,x=(y.clientX||y.changedTouches[0].clientX)-v;if(x<0||x>a.player.template.playedBarWrap.offsetWidth)return;var L=a.player.video.duration*(x/a.player.template.playedBarWrap.offsetWidth);H.isMobile&&a.thumbnails&&a.thumbnails.show(),a.thumbnails&&a.thumbnails.move(x),a.player.template.playedBarTime.style.left="".concat(x-(L>=3600?25:20),"px"),a.player.template.playedBarTime.innerText=H.secondToTime(L),a.player.template.playedBarTime.classList.remove("hidden")}}),this.player.template.playedBarWrap.addEventListener(H.nameMap.dragEnd,function(){H.isMobile&&a.thumbnails&&a.thumbnails.hide()}),H.isMobile||(this.player.template.playedBarWrap.addEventListener("mouseenter",function(){a.player.video.duration&&(a.thumbnails&&a.thumbnails.show(),a.player.template.playedBarTime.classList.remove("hidden"))}),this.player.template.playedBarWrap.addEventListener("mouseleave",function(){a.player.video.duration&&(a.thumbnails&&a.thumbnails.hide(),a.player.template.playedBarTime.classList.add("hidden"))}))}},{key:"initFullButton",value:function(){var a=this;this.player.template.browserFullButton.addEventListener("click",function(){a.player.fullScreen.toggle("browser")}),this.player.template.webFullButton.addEventListener("click",function(){a.player.fullScreen.toggle("web")})}},{key:"initVolumeButton",value:function(){var a=this,c=function(y){var v=y||window.event,x=((v.clientX||v.changedTouches[0].clientX)-H.getBoundingClientRectViewLeft(a.player.template.volumeBarWrap)-5.5)/35;a.player.volume(x)},p=function y(){document.removeEventListener(H.nameMap.dragEnd,y),document.removeEventListener(H.nameMap.dragMove,c),a.player.template.volumeButton.classList.remove("dplayer-volume-active")};this.player.template.volumeBarWrapWrap.addEventListener("click",function(y){var v=y||window.event,x=((v.clientX||v.changedTouches[0].clientX)-H.getBoundingClientRectViewLeft(a.player.template.volumeBarWrap)-5.5)/35;a.player.volume(x)}),this.player.template.volumeBarWrapWrap.addEventListener(H.nameMap.dragStart,function(){document.addEventListener(H.nameMap.dragMove,c),document.addEventListener(H.nameMap.dragEnd,p),a.player.template.volumeButton.classList.add("dplayer-volume-active")}),this.player.template.volumeButtonIcon.addEventListener("click",function(){a.player.video.muted?(a.player.video.muted=!1,a.player.switchVolumeIcon(),a.player.bar.set("volume",a.player.volume(),"width")):(a.player.video.muted=!0,a.player.template.volumeIcon.innerHTML=mt.volumeOff,a.player.bar.set("volume",0,"width"))})}},{key:"initQualityButton",value:function(){var a=this;this.player.options.video.quality&&this.player.template.qualityList.addEventListener("click",function(c){c.target.classList.contains("dplayer-quality-item")&&a.player.switchQuality(c.target.dataset.index)})}},{key:"initScreenshotButton",value:function(){var a=this;this.player.options.screenshot&&this.player.template.camareButton.addEventListener("click",function(){var c,p=document.createElement("canvas");p.width=a.player.video.videoWidth,p.height=a.player.video.videoHeight,p.getContext("2d").drawImage(a.player.video,0,0,p.width,p.height),p.toBlob(function(y){c=URL.createObjectURL(y);var v=document.createElement("a");v.href=c,v.download="DPlayer.png",v.style.display="none",document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(c),a.player.events.trigger("screenshot",c)})})}},{key:"initAirplayButton",value:function(){this.player.options.airplay&&(window.WebKitPlaybackTargetAvailabilityEvent?this.player.video.addEventListener("webkitplaybacktargetavailabilitychanged",function(a){a.availability==="available"?this.template.airplayButton.disable=!1:this.template.airplayButton.disable=!0,this.template.airplayButton.addEventListener("click",function(){this.video.webkitShowPlaybackTargetPicker()}.bind(this))}.bind(this.player)):this.player.template.airplayButton.style.display="none")}},{key:"initChromecast",value:function(){var a=window.document.createElement("script");a.setAttribute("type","text/javascript"),a.setAttribute("src","https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"),window.document.body.appendChild(a),window.__onGCastApiAvailable=function(c){if(c){var p=new(qt=window.chrome.cast).SessionRequest(qt.media.DEFAULT_MEDIA_RECEIVER_APP_ID),y=new qt.ApiConfig(p,function(){},function(v){v===qt.ReceiverAvailability.AVAILABLE&&console.log("chromecast: ",v)});qt.initialize(y,function(){})}}}},{key:"initChromecastButton",value:function(){var a=this;if(this.player.options.chromecast){_i&&(_i=!1,this.initChromecast());var c=function(y,v){a.currentMedia=v},p=function(y){console.error("Error launching media",y)};this.player.template.chromecastButton.addEventListener("click",function(){Wr?(Wr=!1,a.currentMedia.stop(),a.session.stop(),a.initChromecast()):(Wr=!0,qt.requestSession(function(y){var v,x,L;a.session=y,v=a.player.options.video.url,x=new qt.media.MediaInfo(v),L=new qt.media.LoadRequest(x),a.session?a.session.loadMedia(L,c.bind(a,"loadMedia"),p).play():window.open(v)},function(y){y.code==="cancel"?a.session=void 0:console.error("Error selecting a cast device",y)}))})}}},{key:"initSubtitleButton",value:function(){var a=this;this.player.events.on("subtitle_show",function(){a.player.template.subtitleButton.dataset.balloon=a.player.tran("hide-subs"),a.player.template.subtitleButtonInner.style.opacity="",a.player.user.set("subtitle",1)}),this.player.events.on("subtitle_hide",function(){a.player.template.subtitleButton.dataset.balloon=a.player.tran("show-subs"),a.player.template.subtitleButtonInner.style.opacity="0.4",a.player.user.set("subtitle",0)}),this.player.template.subtitleButton.addEventListener("click",function(){a.player.subtitle.toggle()})}},{key:"setAutoHide",value:function(){var a=this;this.show(),clearTimeout(this.autoHideTimer),this.autoHideTimer=setTimeout(function(){!a.player.video.played.length||a.player.paused||a.disableAutoHide||a.hide()},3e3)}},{key:"show",value:function(){this.player.container.classList.remove("dplayer-hide-controller")}},{key:"hide",value:function(){this.player.container.classList.add("dplayer-hide-controller"),this.player.setting.hide(),this.player.comment&&this.player.comment.hide()}},{key:"isShow",value:function(){return!this.player.container.classList.contains("dplayer-hide-controller")}},{key:"toggle",value:function(){this.isShow()?this.hide():this.show()}},{key:"destroy",value:function(){H.isMobile||(this.player.container.removeEventListener("mousemove",this.setAutoHideHandler),this.player.container.removeEventListener("click",this.setAutoHideHandler)),clearTimeout(this.autoHideTimer)}}])&&rp(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const ip=ap;function Xn(i){return Xn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Xn(i)}function lp(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(Xn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(Xn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Xn(c)==="symbol"?c:String(c)),a)}var c}var sp=function(){function i(a){var c=this;(function(L,T){if(!(L instanceof T))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.player.template.mask.addEventListener("click",function(){c.hide()}),this.player.template.settingButton.addEventListener("click",function(){c.show()}),this.loop=this.player.options.loop,this.player.template.loopToggle.checked=this.loop,this.player.template.loop.addEventListener("click",function(){c.player.template.loopToggle.checked=!c.player.template.loopToggle.checked,c.player.template.loopToggle.checked?c.loop=!0:c.loop=!1,c.hide()}),this.showDanmaku=this.player.user.get("danmaku"),this.showDanmaku||this.player.danmaku&&this.player.danmaku.hide(),this.player.template.showDanmakuToggle.checked=this.showDanmaku,this.player.template.showDanmaku.addEventListener("click",function(){c.player.template.showDanmakuToggle.checked=!c.player.template.showDanmakuToggle.checked,c.player.template.showDanmakuToggle.checked?(c.showDanmaku=!0,c.player.danmaku.show()):(c.showDanmaku=!1,c.player.danmaku.hide()),c.player.user.set("danmaku",c.showDanmaku?1:0),c.hide()}),this.unlimitDanmaku=this.player.user.get("unlimited"),this.player.template.unlimitDanmakuToggle.checked=this.unlimitDanmaku,this.player.template.unlimitDanmaku.addEventListener("click",function(){c.player.template.unlimitDanmakuToggle.checked=!c.player.template.unlimitDanmakuToggle.checked,c.player.template.unlimitDanmakuToggle.checked?(c.unlimitDanmaku=!0,c.player.danmaku.unlimit(!0)):(c.unlimitDanmaku=!1,c.player.danmaku.unlimit(!1)),c.player.user.set("unlimited",c.unlimitDanmaku?1:0),c.hide()}),this.player.template.speed.addEventListener("click",function(){c.player.template.settingBox.classList.add("dplayer-setting-box-narrow"),c.player.template.settingBox.classList.add("dplayer-setting-box-speed")});for(var p=function(L){c.player.template.speedItem[L].addEventListener("click",function(){c.player.speed(c.player.template.speedItem[L].dataset.speed),c.hide()})},y=0;y<this.player.template.speedItem.length;y++)p(y);if(this.player.danmaku){this.player.on("danmaku_opacity",function(L){c.player.bar.set("danmaku",L,"width"),c.player.user.set("opacity",L)}),this.player.danmaku.opacity(this.player.user.get("opacity"));var v=function(L){var T=L||window.event,Y=((T.clientX||T.changedTouches[0].clientX)-H.getBoundingClientRectViewLeft(c.player.template.danmakuOpacityBarWrap))/130;Y=Math.max(Y,0),Y=Math.min(Y,1),c.player.danmaku.opacity(Y)},x=function L(){document.removeEventListener(H.nameMap.dragEnd,L),document.removeEventListener(H.nameMap.dragMove,v),c.player.template.danmakuOpacityBox.classList.remove("dplayer-setting-danmaku-active")};this.player.template.danmakuOpacityBarWrapWrap.addEventListener("click",function(L){var T=L||window.event,Y=((T.clientX||T.changedTouches[0].clientX)-H.getBoundingClientRectViewLeft(c.player.template.danmakuOpacityBarWrap))/130;Y=Math.max(Y,0),Y=Math.min(Y,1),c.player.danmaku.opacity(Y)}),this.player.template.danmakuOpacityBarWrapWrap.addEventListener(H.nameMap.dragStart,function(){document.addEventListener(H.nameMap.dragMove,v),document.addEventListener(H.nameMap.dragEnd,x),c.player.template.danmakuOpacityBox.classList.add("dplayer-setting-danmaku-active")})}}var l,u;return l=i,(u=[{key:"hide",value:function(){var a=this;this.player.template.settingBox.classList.remove("dplayer-setting-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),setTimeout(function(){a.player.template.settingBox.classList.remove("dplayer-setting-box-narrow"),a.player.template.settingBox.classList.remove("dplayer-setting-box-speed")},300),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.settingBox.classList.add("dplayer-setting-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}}])&&lp(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const cp=sp;function Gn(i){return Gn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Gn(i)}function dp(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(Gn(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(Gn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Gn(c)==="symbol"?c:String(c)),a)}var c}var pp=function(){function i(a){var c=this;(function(p,y){if(!(p instanceof y))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.player.template.mask.addEventListener("click",function(){c.hide()}),this.player.template.commentButton.addEventListener("click",function(){c.show()}),this.player.template.commentSettingButton.addEventListener("click",function(){c.toggleSetting()}),this.player.template.commentColorSettingBox.addEventListener("click",function(){if(c.player.template.commentColorSettingBox.querySelector("input:checked+span")){var p=c.player.template.commentColorSettingBox.querySelector("input:checked").value;c.player.template.commentSettingFill.style.fill=p,c.player.template.commentInput.style.color=p,c.player.template.commentSendFill.style.fill=p}}),this.player.template.commentInput.addEventListener("click",function(){c.hideSetting()}),this.player.template.commentInput.addEventListener("keydown",function(p){(p||window.event).keyCode===13&&c.send()}),this.player.template.commentSendButton.addEventListener("click",function(){c.send()})}var l,u;return l=i,(u=[{key:"show",value:function(){this.player.controller.disableAutoHide=!0,this.player.template.controller.classList.add("dplayer-controller-comment"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.container.classList.add("dplayer-show-controller"),this.player.template.commentInput.focus()}},{key:"hide",value:function(){this.player.template.controller.classList.remove("dplayer-controller-comment"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.container.classList.remove("dplayer-show-controller"),this.player.controller.disableAutoHide=!1,this.hideSetting()}},{key:"showSetting",value:function(){this.player.template.commentSettingBox.classList.add("dplayer-comment-setting-open")}},{key:"hideSetting",value:function(){this.player.template.commentSettingBox.classList.remove("dplayer-comment-setting-open")}},{key:"toggleSetting",value:function(){this.player.template.commentSettingBox.classList.contains("dplayer-comment-setting-open")?this.hideSetting():this.showSetting()}},{key:"send",value:function(){var a=this;this.player.template.commentInput.blur(),this.player.template.commentInput.value.replace(/^\s+|\s+$/g,"")?this.player.danmaku.send({text:this.player.template.commentInput.value,color:H.color2Number(this.player.container.querySelector(".dplayer-comment-setting-color input:checked").value),type:parseInt(this.player.container.querySelector(".dplayer-comment-setting-type input:checked").value)},function(){a.player.template.commentInput.value="",a.hide()}):this.player.notice(this.player.tran("please-input-danmaku"))}}])&&dp(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const up=pp;function eo(i){return eo=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},eo(i)}function fp(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(eo(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(eo(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),eo(c)==="symbol"?c:String(c)),a)}var c}var hp=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.doHotKeyHandler=this.doHotKey.bind(this),this.cancelFullScreenHandler=this.cancelFullScreen.bind(this),this.player.options.hotkey&&document.addEventListener("keydown",this.doHotKeyHandler),document.addEventListener("keydown",this.cancelFullScreenHandler)}var l,u;return l=i,(u=[{key:"doHotKey",value:function(a){if(this.player.focus){var c=document.activeElement.tagName.toUpperCase(),p=document.activeElement.getAttribute("contenteditable");if(c!=="INPUT"&&c!=="TEXTAREA"&&p!==""&&p!=="true"){var y,v=a||window.event;switch(v.keyCode){case 32:v.preventDefault(),this.player.toggle();break;case 37:if(v.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime-5),this.player.controller.setAutoHide();break;case 39:if(v.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime+5),this.player.controller.setAutoHide();break;case 38:v.preventDefault(),y=this.player.volume()+.1,this.player.volume(y);break;case 40:v.preventDefault(),y=this.player.volume()-.1,this.player.volume(y)}}}}},{key:"cancelFullScreen",value:function(a){(a||window.event).keyCode===27&&this.player.fullScreen.isFullScreen("web")&&this.player.fullScreen.cancel("web")}},{key:"destroy",value:function(){this.player.options.hotkey&&document.removeEventListener("keydown",this.doHotKeyHandler),document.removeEventListener("keydown",this.cancelFullScreenHandler)}}])&&fp(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Ap=hp;function to(i){return to=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},to(i)}function yp(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(to(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(to(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),to(c)==="symbol"?c:String(c)),a)}var c}var mp=function(){function i(a){var c=this;(function(p,y){if(!(p instanceof y))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.shown=!1,Array.prototype.slice.call(this.player.template.menuItem).forEach(function(p,y){c.player.options.contextmenu[y].click&&p.addEventListener("click",function(){c.player.options.contextmenu[y].click(c.player),c.hide()})}),this.contextmenuHandler=function(p){if(c.shown)c.hide();else{var y=p||window.event;y.preventDefault();var v=c.player.container.getBoundingClientRect();c.show(y.clientX-v.left,y.clientY-v.top),c.player.template.mask.addEventListener("click",function(){c.hide()})}},this.player.container.addEventListener("contextmenu",this.contextmenuHandler)}var l,u;return l=i,(u=[{key:"show",value:function(a,c){this.player.template.menu.classList.add("dplayer-menu-show");var p=this.player.container.getBoundingClientRect();a+this.player.template.menu.offsetWidth>=p.width?(this.player.template.menu.style.right=p.width-a+"px",this.player.template.menu.style.left="initial"):(this.player.template.menu.style.left=a+"px",this.player.template.menu.style.right="initial"),c+this.player.template.menu.offsetHeight>=p.height?(this.player.template.menu.style.bottom=p.height-c+"px",this.player.template.menu.style.top="initial"):(this.player.template.menu.style.top=c+"px",this.player.template.menu.style.bottom="initial"),this.player.template.mask.classList.add("dplayer-mask-show"),this.shown=!0,this.player.events.trigger("contextmenu_show")}},{key:"hide",value:function(){this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.template.menu.classList.remove("dplayer-menu-show"),this.shown=!1,this.player.events.trigger("contextmenu_hide")}},{key:"destroy",value:function(){this.player.container.removeEventListener("contextmenu",this.contextmenuHandler)}}])&&yp(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const bp=mp;function no(i){return no=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},no(i)}function gp(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,y){if(no(p)!=="object"||p===null)return p;var v=p[Symbol.toPrimitive];if(v!==void 0){var x=v.call(p,"string");if(no(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),no(c)==="symbol"?c:String(c)),a)}var c}var vp=function(){function i(a){var c=this;(function(p,y){if(!(p instanceof y))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a.template.infoPanel,this.template=a.template,this.video=a.video,this.player=a,this.template.infoPanelClose.addEventListener("click",function(){c.hide()})}var l,u;return l=i,(u=[{key:"show",value:function(){this.beginTime=Date.now(),this.update(),this.player.timer.enable("info"),this.player.timer.enable("fps"),this.container.classList.remove("dplayer-info-panel-hide")}},{key:"hide",value:function(){this.player.timer.disable("info"),this.player.timer.disable("fps"),this.container.classList.add("dplayer-info-panel-hide")}},{key:"triggle",value:function(){this.container.classList.contains("dplayer-info-panel-hide")?this.show():this.hide()}},{key:"update",value:function(){this.template.infoVersion.innerHTML="v".concat("1.27.1"," ").concat("v1.27.0-12-g4f61091"),this.template.infoType.innerHTML=this.player.type,this.template.infoUrl.innerHTML=this.player.options.video.url,this.template.infoResolution.innerHTML="".concat(this.player.video.videoWidth," x ").concat(this.player.video.videoHeight),this.template.infoDuration.innerHTML=this.player.video.duration,this.player.options.danmaku&&(this.template.infoDanmakuId.innerHTML=this.player.options.danmaku.id,this.template.infoDanmakuApi.innerHTML=this.player.options.danmaku.api,this.template.infoDanmakuAmount.innerHTML=this.player.danmaku.dan.length)}},{key:"fps",value:function(a){this.template.infoFPS.innerHTML="".concat(a.toFixed(1))}}])&&gp(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const xp=vp;var Ep=r(568),kp=r.n(Ep);function oo(i){return oo=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},oo(i)}function Ii(i,l){var u=Object.keys(i);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(i);l&&(a=a.filter(function(c){return Object.getOwnPropertyDescriptor(i,c).enumerable})),u.push.apply(u,a)}return u}function wp(i,l,u){return(l=Oi(l))in i?Object.defineProperty(i,l,{value:u,enumerable:!0,configurable:!0,writable:!0}):i[l]=u,i}function Ti(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,Oi(a.key),a)}}function Oi(i){var l=function(u,a){if(oo(u)!=="object"||u===null)return u;var c=u[Symbol.toPrimitive];if(c!==void 0){var p=c.call(u,"string");if(oo(p)!=="object")return p;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i);return oo(l)==="symbol"?l:String(l)}var Ri=0,mn=[],Cp=function(){function i(c){var p=this;(function(y,v){if(!(y instanceof v))throw new TypeError("Cannot call a class as a function")})(this,i),this.options=function(y){var v={container:y.element||document.getElementsByClassName("dplayer")[0],live:!1,autoplay:!1,theme:"#b7daff",loop:!1,lang:(navigator.language||navigator.browserLanguage).toLowerCase(),screenshot:!1,airplay:!0,chromecast:!1,hotkey:!0,preload:"metadata",volume:.7,playbackSpeed:[.5,.75,1,1.25,1.5,2],apiBackend:Wc,video:{},contextmenu:[],mutex:!0,pluginOptions:{hls:{},flv:{},dash:{},webtorrent:{}},preventClickToggle:!1};for(var x in v)v.hasOwnProperty(x)&&!y.hasOwnProperty(x)&&(y[x]=v[x]);return y.video&&!y.video.type&&(y.video.type="auto"),Nr(y.danmaku)==="object"&&y.danmaku&&!y.danmaku.user&&(y.danmaku.user="DIYgod"),y.subtitle&&(!y.subtitle.type&&(y.subtitle.type="webvtt"),!y.subtitle.fontSize&&(y.subtitle.fontSize="20px"),!y.subtitle.bottom&&(y.subtitle.bottom="40px"),!y.subtitle.color&&(y.subtitle.color="#fff")),y.video.quality&&(y.video.url=y.video.quality[y.video.defaultQuality].url),y.lang&&(y.lang=y.lang.toLowerCase()),y.contextmenu=y.contextmenu.concat([{key:"video-info",click:function(L){L.infoPanel.triggle()}},{key:"about-author",link:"https://diygod.me"},{text:"DPlayer v".concat("1.27.1"),link:"https://github.com/MoePlayer/DPlayer"}]),y}(function(y){for(var v=1;v<arguments.length;v++){var x=arguments[v]!=null?arguments[v]:{};v%2?Ii(Object(x),!0).forEach(function(L){wp(y,L,x[L])}):Object.getOwnPropertyDescriptors?Object.defineProperties(y,Object.getOwnPropertyDescriptors(x)):Ii(Object(x)).forEach(function(L){Object.defineProperty(y,L,Object.getOwnPropertyDescriptor(x,L))})}return y}({preload:c.video.type==="webtorrent"?"none":"metadata"},c)),this.options.video.quality&&(this.qualityIndex=this.options.video.defaultQuality,this.quality=this.options.video.quality[this.options.video.defaultQuality]),this.tran=new Uc(this.options.lang).tran,this.events=new Pd,this.user=new qd(this),this.container=this.options.container,this.noticeList={},this.container.classList.add("dplayer"),this.options.danmaku||this.container.classList.add("dplayer-no-danmaku"),this.options.live?this.container.classList.add("dplayer-live"):this.container.classList.remove("dplayer-live"),H.isMobile&&this.container.classList.add("dplayer-mobile"),this.arrow=this.container.offsetWidth<=500,this.arrow&&this.container.classList.add("dplayer-arrow"),this.options.subtitle&&Array.isArray(this.options.subtitle.url)&&(this.options.subtitle.url.push({subtitle:"",lang:"off"}),this.options.subtitle.defaultSubtitle&&(typeof this.options.subtitle.defaultSubtitle=="string"?this.options.subtitle.index=this.options.subtitle.url.findIndex(function(y){return y.lang===p.options.subtitle.defaultSubtitle||y.name===p.options.subtitle.defaultSubtitle}):typeof this.options.subtitle.defaultSubtitle=="number"&&(this.options.subtitle.index=this.options.subtitle.defaultSubtitle)),(this.options.subtitle.index===-1||!this.options.subtitle.index||this.options.subtitle.index>this.options.subtitle.url.length-1)&&(this.options.subtitle.index=this.options.subtitle.url.findIndex(function(y){return y.lang===p.options.lang})),this.options.subtitle.index===-1&&(this.options.subtitle.index=this.options.subtitle.url.length-1)),this.template=new Li({container:this.container,options:this.options,index:Ri,tran:this.tran}),this.video=this.template.video,this.bar=new $d(this.template),this.bezel=new ep(this.template.bezel),this.fullScreen=new Md(this),this.controller=new ip(this),this.options.danmaku&&(this.danmaku=new Od({player:this,container:this.template.danmaku,opacity:this.user.get("opacity"),callback:function(){setTimeout(function(){p.template.danmakuLoading.style.display="none",p.options.autoplay&&p.play()},0)},error:function(y){p.notice(y)},apiBackend:this.options.apiBackend,borderColor:this.options.theme,height:this.arrow?24:30,time:function(){return p.video.currentTime},unlimited:this.user.get("unlimited"),api:{id:this.options.danmaku.id,address:this.options.danmaku.api,token:this.options.danmaku.token,maximum:this.options.danmaku.maximum,addition:this.options.danmaku.addition,user:this.options.danmaku.user,speedRate:this.options.danmaku.speedRate},events:this.events,tran:function(y){return p.tran(y)}}),this.comment=new up(this)),this.setting=new cp(this),this.plugins={},this.docClickFun=function(){p.focus=!1},this.containerClickFun=function(){p.focus=!0},document.addEventListener("click",this.docClickFun,!0),this.container.addEventListener("click",this.containerClickFun,!0),this.paused=!0,this.timer=new Xd(this),this.hotkey=new Ap(this),this.contextmenu=new bp(this),this.initVideo(this.video,this.quality&&this.quality.type||this.options.video.type),this.infoPanel=new xp(this),!this.danmaku&&this.options.autoplay&&this.play(),Ri++,mn.push(this)}var l,u,a;return l=i,u=[{key:"seek",value:function(c){c=Math.max(c,0),this.video.duration&&(c=Math.min(c,this.video.duration)),this.video.currentTime<c?this.notice("".concat(this.tran("ff").replace("%s",(c-this.video.currentTime).toFixed(0)))):this.video.currentTime>c&&this.notice("".concat(this.tran("rew").replace("%s",(this.video.currentTime-c).toFixed(0)))),this.video.currentTime=c,this.danmaku&&this.danmaku.seek(),this.bar.set("played",c/this.video.duration,"width"),this.template.ptime.innerHTML=H.secondToTime(c)}},{key:"play",value:function(c){var p=this;if(this.paused=!1,this.video.paused&&!H.isMobile&&this.bezel.switch(mt.play),this.template.playButton.innerHTML=mt.pause,this.template.mobilePlayButton.innerHTML=mt.pause,c||ge.resolve(this.video.play()).catch(function(){p.pause()}).then(function(){}),this.timer.enable("loading"),this.container.classList.remove("dplayer-paused"),this.container.classList.add("dplayer-playing"),this.danmaku&&this.danmaku.play(),this.options.mutex)for(var y=0;y<mn.length;y++)this!==mn[y]&&mn[y].pause()}},{key:"pause",value:function(c){this.paused=!0,this.container.classList.remove("dplayer-loading"),this.video.paused||H.isMobile||this.bezel.switch(mt.pause),this.template.playButton.innerHTML=mt.play,this.template.mobilePlayButton.innerHTML=mt.play,c||this.video.pause(),this.timer.disable("loading"),this.container.classList.remove("dplayer-playing"),this.container.classList.add("dplayer-paused"),this.danmaku&&this.danmaku.pause()}},{key:"switchVolumeIcon",value:function(){this.volume()>=.95?this.template.volumeIcon.innerHTML=mt.volumeUp:this.volume()>0?this.template.volumeIcon.innerHTML=mt.volumeDown:this.template.volumeIcon.innerHTML=mt.volumeOff}},{key:"volume",value:function(c,p,y){if(c=parseFloat(c),!isNaN(c)){c=Math.max(c,0),c=Math.min(c,1),this.bar.set("volume",c,"width");var v="".concat((100*c).toFixed(0),"%");this.template.volumeBarWrapWrap.dataset.balloon=v,p||this.user.set("volume",c),y||this.notice("".concat(this.tran("volume")," ").concat((100*c).toFixed(0),"%"),void 0,void 0,"volume"),this.video.volume=c,this.video.muted&&(this.video.muted=!1),this.switchVolumeIcon()}return this.video.volume}},{key:"toggle",value:function(){this.video.paused?this.play():this.pause()}},{key:"on",value:function(c,p){this.events.on(c,p)}},{key:"switchVideo",value:function(c,p){this.pause(),this.video.poster=c.pic?c.pic:"",this.video.src=c.url,this.initMSE(this.video,c.type||"auto"),p&&(this.template.danmakuLoading.style.display="block",this.bar.set("played",0,"width"),this.bar.set("loaded",0,"width"),this.template.ptime.innerHTML="00:00",this.template.danmaku.innerHTML="",this.danmaku&&this.danmaku.reload({id:p.id,address:p.api,token:p.token,maximum:p.maximum,addition:p.addition,user:p.user}))}},{key:"initMSE",value:function(c,p){var y=this;if(this.type=p,this.options.video.customType&&this.options.video.customType[p])Object.prototype.toString.call(this.options.video.customType[p])==="[object Function]"?this.options.video.customType[p](this.video,this):console.error("Illegal customType: ".concat(p));else switch(this.type==="auto"&&(/m3u8(#|\?|$)/i.exec(c.src)?this.type="hls":/.flv(#|\?|$)/i.exec(c.src)?this.type="flv":/.mpd(#|\?|$)/i.exec(c.src)?this.type="dash":this.type="normal"),this.type==="hls"&&(c.canPlayType("application/x-mpegURL")||c.canPlayType("application/vnd.apple.mpegURL"))&&(this.type="normal"),this.type){case"hls":if(window.Hls)if(window.Hls.isSupported()){var v=this.options.pluginOptions.hls,x=new window.Hls(v);this.plugins.hls=x,x.loadSource(c.src),x.attachMedia(c),this.events.on("destroy",function(){x.destroy(),delete y.plugins.hls})}else this.notice("Error: Hls is not supported.");else this.notice("Error: Can't find Hls.");break;case"flv":if(window.flvjs)if(window.flvjs.isSupported()){var L=window.flvjs.createPlayer(Object.assign(this.options.pluginOptions.flv.mediaDataSource||{},{type:"flv",url:c.src}),this.options.pluginOptions.flv.config);this.plugins.flvjs=L,L.attachMediaElement(c),L.load(),this.events.on("destroy",function(){L.unload(),L.detachMediaElement(),L.destroy(),delete y.plugins.flvjs})}else this.notice("Error: flvjs is not supported.");else this.notice("Error: Can't find flvjs.");break;case"dash":if(window.dashjs){var T=window.dashjs.MediaPlayer().create().initialize(c,c.src,!1),Y=this.options.pluginOptions.dash;T.updateSettings(Y),this.plugins.dash=T,this.events.on("destroy",function(){window.dashjs.MediaPlayer().reset(),delete y.plugins.dash})}else this.notice("Error: Can't find dashjs.");break;case"webtorrent":if(window.WebTorrent)if(window.WebTorrent.WEBRTC_SUPPORT){this.container.classList.add("dplayer-loading");var $=this.options.pluginOptions.webtorrent,G=new window.WebTorrent($);this.plugins.webtorrent=G;var Z=c.src;c.src="",c.preload="metadata",c.addEventListener("durationchange",function(){return y.container.classList.remove("dplayer-loading")},{once:!0}),G.add(Z,function(V){V.files.find(function(ne){return ne.name.endsWith(".mp4")}).renderTo(y.video,{autoplay:y.options.autoplay,controls:!1})}),this.events.on("destroy",function(){G.remove(Z),G.destroy(),delete y.plugins.webtorrent})}else this.notice("Error: Webtorrent is not supported.");else this.notice("Error: Can't find Webtorrent.")}}},{key:"initVideo",value:function(c,p){var y=this;this.initMSE(c,p),this.on("durationchange",function(){c.duration!==1&&c.duration!==1/0&&(y.template.dtime.innerHTML=H.secondToTime(c.duration))}),this.on("progress",function(){var L=c.buffered.length?c.buffered.end(c.buffered.length-1)/c.duration:0;y.bar.set("loaded",L,"width")}),this.on("error",function(){y.video.error&&y.tran&&y.notice&&y.type!=="webtorrent"&&y.notice(y.tran("video-failed"))}),this.on("ended",function(){y.bar.set("played",1,"width"),y.setting.loop?(y.seek(0),y.play()):y.pause(),y.danmaku&&(y.danmaku.danIndex=0)}),this.on("play",function(){y.paused&&y.play(!0)}),this.on("pause",function(){y.paused||y.pause(!0)}),this.on("timeupdate",function(){y.bar.set("played",y.video.currentTime/y.video.duration,"width");var L=H.secondToTime(y.video.currentTime);y.template.ptime.innerHTML!==L&&(y.template.ptime.innerHTML=L)});for(var v=function(L){c.addEventListener(y.events.videoEvents[L],function(T){y.events.trigger(y.events.videoEvents[L],T)})},x=0;x<this.events.videoEvents.length;x++)v(x);this.volume(this.user.get("volume"),!0,!0),this.options.subtitle&&(this.subtitle=new Wd(this.template.subtitle,this.video,this.options.subtitle,this.events),Array.isArray(this.options.subtitle.url)&&(this.subtitles=new Kd(this)),this.user.get("subtitle")||this.subtitle.hide())}},{key:"switchQuality",value:function(c){var p=this;if(c=typeof c=="string"?parseInt(c):c,this.qualityIndex!==c&&!this.switchingQuality){this.prevIndex=this.qualityIndex,this.qualityIndex=c,this.switchingQuality=!0,this.quality=this.options.video.quality[c],this.template.qualityButton.innerHTML=this.quality.name;var y=this.video.paused;this.video.pause();var v=kp()({current:!1,pic:null,screenshot:this.options.screenshot,preload:"auto",url:this.quality.url,subtitle:this.options.subtitle}),x=new DOMParser().parseFromString(v,"text/html").body.firstChild;this.template.videoWrap.insertBefore(x,this.template.videoWrap.getElementsByTagName("div")[0]),this.prevVideo=this.video,this.video=x,this.initVideo(this.video,this.quality.type||this.options.video.type),this.seek(this.prevVideo.currentTime),this.notice("".concat(this.tran("switching-quality").replace("%q",this.quality.name)),-1,void 0,"switch-quality"),this.events.trigger("quality_start",this.quality),this.on("canplay",function(){if(p.prevVideo){if(p.video.currentTime!==p.prevVideo.currentTime)return void p.seek(p.prevVideo.currentTime);p.template.videoWrap.removeChild(p.prevVideo),p.video.classList.add("dplayer-video-current"),y||p.video.play(),p.prevVideo=null,p.notice("".concat(p.tran("switched-quality").replace("%q",p.quality.name)),void 0,void 0,"switch-quality"),p.switchingQuality=!1,p.events.trigger("quality_end")}}),this.on("error",function(){p.video.error&&p.prevVideo&&(p.template.videoWrap.removeChild(p.video),p.video=p.prevVideo,y||p.video.play(),p.qualityIndex=p.prevIndex,p.quality=p.options.video.quality[p.qualityIndex],p.noticeTime=setTimeout(function(){p.template.notice.style.opacity=0,p.events.trigger("notice_hide")},3e3),p.prevVideo=null,p.switchingQuality=!1)})}}},{key:"notice",value:function(c){var p,y,v,x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2e3,L=arguments.length>2&&arguments[2]!==void 0?arguments[2]:.8,T=arguments.length>3?arguments[3]:void 0;if(T&&((p=document.getElementById("dplayer-notice-".concat(T)))&&(p.innerHTML=c),this.noticeList[T]&&(clearTimeout(this.noticeList[T]),this.noticeList[T]=null)),!p){var Y=Li.NewNotice(c,L,T);this.template.noticeList.appendChild(Y),p=Y}this.events.trigger("notice_show",p),x>0&&(this.noticeList[T]=setTimeout((y=p,v=this,function(){y.addEventListener("animationend",function(){v.template.noticeList.removeChild(y)}),y.classList.add("remove-notice"),v.events.trigger("notice_hide"),v.noticeList[T]=null}),x))}},{key:"resize",value:function(){this.danmaku&&this.danmaku.resize(),this.controller.thumbnails&&this.controller.thumbnails.resize(160,this.video.videoHeight/this.video.videoWidth*160,this.template.barWrap.offsetWidth),this.events.trigger("resize")}},{key:"speed",value:function(c){this.video.playbackRate=c}},{key:"destroy",value:function(){mn.splice(mn.indexOf(this),1),this.pause(),document.removeEventListener("click",this.docClickFun,!0),this.container.removeEventListener("click",this.containerClickFun,!0),this.fullScreen.destroy(),this.hotkey.destroy(),this.contextmenu.destroy(),this.controller.destroy(),this.timer.destroy(),this.video.src="",this.container.innerHTML="",this.events.trigger("destroy")}}],a=[{key:"version",get:function(){return"1.27.1"}}],u&&Ti(l.prototype,u),a&&Ti(l,a),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Bp=Cp;console.log(`
`.concat(" %c DPlayer v","1.27.1"," ").concat("v1.27.0-12-g4f61091"," %c https://dplayer.diygod.dev ",`
`,`
`),"color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;");const Sp=Bp})(),s.default})())})(Cc);var _m=Cc.exports;const Im=Lm(_m),Tm={id:"dplayer",style:{width:"100%",height:"100vh"}},Om={__name:"VideoPlay",setup(e){const t=Ja(),n=Ye(null);return fn(()=>{let o=t.query.url;n.value=new Im({container:document.getElementById("dplayer"),video:{url:o}})}),Na(()=>{n.value.destroy()}),(o,r)=>(le(),He("div",Tm))}},Rm=["src"],Pm={__name:"AudioPlay",setup(e){const t=Ja(),n=Ye();return fn(()=>{n.value=t.query.url}),(o,r)=>(le(),He("div",null,[ve("audio",{src:n.value,controls:""},null,8,Rm)]))}},jm=[{path:"/",component:Bm},{path:"/VideoPlay",component:Om},{path:"/AudioPlay",component:Pm}],zm=fA({history:_h(),routes:jm});const Bc=ih(dh);Bc.use(zm);Bc.mount("#app");
