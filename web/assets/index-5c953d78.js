(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();function Sa(e,t){const n=Object.create(null),r=e.split(",");for(let o=0;o<r.length;o++)n[r[o]]=!0;return t?o=>!!n[o.toLowerCase()]:o=>!!n[o]}const je={},bn=[],vt=()=>{},vp=()=>!1,xp=/^on[^a-z]/,io=e=>xp.test(e),La=e=>e.startsWith("onUpdate:"),Ne=Object.assign,Ia=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Ep=Object.prototype.hasOwnProperty,be=(e,t)=>Ep.call(e,t),ce=Array.isArray,gn=e=>lo(e)==="[object Map]",Yl=e=>lo(e)==="[object Set]",fe=e=>typeof e=="function",He=e=>typeof e=="string",_a=e=>typeof e=="symbol",Re=e=>e!==null&&typeof e=="object",Kl=e=>Re(e)&&fe(e.then)&&fe(e.catch),Vl=Object.prototype.toString,lo=e=>Vl.call(e),kp=e=>lo(e).slice(8,-1),Ql=e=>lo(e)==="[object Object]",Ta=e=>He(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Ur=Sa(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),so=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},wp=/-(\w)/g,Lt=so(e=>e.replace(wp,(t,n)=>n?n.toUpperCase():"")),Cp=/\B([A-Z])/g,_n=so(e=>e.replace(Cp,"-$1").toLowerCase()),co=so(e=>e.charAt(0).toUpperCase()+e.slice(1)),Uo=so(e=>e?`on${co(e)}`:""),hr=(e,t)=>!Object.is(e,t),Wo=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},Zr=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},Bp=e=>{const t=parseFloat(e);return isNaN(t)?e:t},Sp=e=>{const t=He(e)?Number(e):NaN;return isNaN(t)?e:t};let ji;const ia=()=>ji||(ji=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function po(e){if(ce(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],o=He(r)?Tp(r):po(r);if(o)for(const s in o)t[s]=o[s]}return t}else{if(He(e))return e;if(Re(e))return e}}const Lp=/;(?![^(]*\))/g,Ip=/:([^]+)/,_p=/\/\*[^]*?\*\//g;function Tp(e){const t={};return e.replace(_p,"").split(Lp).forEach(n=>{if(n){const r=n.split(Ip);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function mr(e){let t="";if(He(e))t=e;else if(ce(e))for(let n=0;n<e.length;n++){const r=mr(e[n]);r&&(t+=r+" ")}else if(Re(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const Op="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Rp=Sa(Op);function $l(e){return!!e||e===""}const vn=e=>He(e)?e:e==null?"":ce(e)||Re(e)&&(e.toString===Vl||!fe(e.toString))?JSON.stringify(e,Zl,2):String(e),Zl=(e,t)=>t&&t.__v_isRef?Zl(e,t.value):gn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,o])=>(n[`${r} =>`]=o,n),{})}:Yl(t)?{[`Set(${t.size})`]:[...t.values()]}:Re(t)&&!ce(t)&&!Ql(t)?String(t):t;let ht;class Pp{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=ht,!t&&ht&&(this.index=(ht.scopes||(ht.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=ht;try{return ht=this,t()}finally{ht=n}}}on(){ht=this}off(){ht=this.parent}stop(t){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0,this._active=!1}}}function jp(e,t=ht){t&&t.active&&t.effects.push(e)}function zp(){return ht}const Oa=e=>{const t=new Set(e);return t.w=0,t.n=0,t},Jl=e=>(e.w&Jt)>0,Xl=e=>(e.n&Jt)>0,Mp=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=Jt},Dp=e=>{const{deps:t}=e;if(t.length){let n=0;for(let r=0;r<t.length;r++){const o=t[r];Jl(o)&&!Xl(o)?o.delete(e):t[n++]=o,o.w&=~Jt,o.n&=~Jt}t.length=n}},la=new WeakMap;let sr=0,Jt=1;const sa=30;let mt;const sn=Symbol(""),ca=Symbol("");class Ra{constructor(t,n=null,r){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,jp(this,r)}run(){if(!this.active)return this.fn();let t=mt,n=$t;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=mt,mt=this,$t=!0,Jt=1<<++sr,sr<=sa?Mp(this):zi(this),this.fn()}finally{sr<=sa&&Dp(this),Jt=1<<--sr,mt=this.parent,$t=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){mt===this?this.deferStop=!0:this.active&&(zi(this),this.onStop&&this.onStop(),this.active=!1)}}function zi(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let $t=!0;const Gl=[];function Tn(){Gl.push($t),$t=!1}function On(){const e=Gl.pop();$t=e===void 0?!0:e}function it(e,t,n){if($t&&mt){let r=la.get(e);r||la.set(e,r=new Map);let o=r.get(n);o||r.set(n,o=Oa()),es(o)}}function es(e,t){let n=!1;sr<=sa?Xl(e)||(e.n|=Jt,n=!Jl(e)):n=!e.has(mt),n&&(e.add(mt),mt.deps.push(e))}function zt(e,t,n,r,o,s){const d=la.get(e);if(!d)return;let f=[];if(t==="clear")f=[...d.values()];else if(n==="length"&&ce(e)){const y=Number(r);d.forEach((m,b)=>{(b==="length"||b>=y)&&f.push(m)})}else switch(n!==void 0&&f.push(d.get(n)),t){case"add":ce(e)?Ta(n)&&f.push(d.get("length")):(f.push(d.get(sn)),gn(e)&&f.push(d.get(ca)));break;case"delete":ce(e)||(f.push(d.get(sn)),gn(e)&&f.push(d.get(ca)));break;case"set":gn(e)&&f.push(d.get(sn));break}if(f.length===1)f[0]&&da(f[0]);else{const y=[];for(const m of f)m&&y.push(...m);da(Oa(y))}}function da(e,t){const n=ce(e)?e:[...e];for(const r of n)r.computed&&Mi(r);for(const r of n)r.computed||Mi(r)}function Mi(e,t){(e!==mt||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const Fp=Sa("__proto__,__v_isRef,__isVue"),ts=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(_a)),qp=Pa(),Np=Pa(!1,!0),Hp=Pa(!0),Di=Up();function Up(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=Ee(this);for(let s=0,d=this.length;s<d;s++)it(r,"get",s+"");const o=r[t](...n);return o===-1||o===!1?r[t](...n.map(Ee)):o}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){Tn();const r=Ee(this)[t].apply(this,n);return On(),r}}),e}function Wp(e){const t=Ee(this);return it(t,"has",e),t.hasOwnProperty(e)}function Pa(e=!1,t=!1){return function(r,o,s){if(o==="__v_isReactive")return!e;if(o==="__v_isReadonly")return e;if(o==="__v_isShallow")return t;if(o==="__v_raw"&&s===(e?t?iu:is:t?as:os).get(r))return r;const d=ce(r);if(!e){if(d&&be(Di,o))return Reflect.get(Di,o,s);if(o==="hasOwnProperty")return Wp}const f=Reflect.get(r,o,s);return(_a(o)?ts.has(o):Fp(o))||(e||it(r,"get",o),t)?f:et(f)?d&&Ta(o)?f:f.value:Re(f)?e?ss(f):fo(f):f}}const Yp=ns(),Kp=ns(!0);function ns(e=!1){return function(n,r,o,s){let d=n[r];if(Cn(d)&&et(d)&&!et(o))return!1;if(!e&&(!Jr(o)&&!Cn(o)&&(d=Ee(d),o=Ee(o)),!ce(n)&&et(d)&&!et(o)))return d.value=o,!0;const f=ce(n)&&Ta(r)?Number(r)<n.length:be(n,r),y=Reflect.set(n,r,o,s);return n===Ee(s)&&(f?hr(o,d)&&zt(n,"set",r,o):zt(n,"add",r,o)),y}}function Vp(e,t){const n=be(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&zt(e,"delete",t,void 0),r}function Qp(e,t){const n=Reflect.has(e,t);return(!_a(t)||!ts.has(t))&&it(e,"has",t),n}function $p(e){return it(e,"iterate",ce(e)?"length":sn),Reflect.ownKeys(e)}const rs={get:qp,set:Yp,deleteProperty:Vp,has:Qp,ownKeys:$p},Zp={get:Hp,set(e,t){return!0},deleteProperty(e,t){return!0}},Jp=Ne({},rs,{get:Np,set:Kp}),ja=e=>e,uo=e=>Reflect.getPrototypeOf(e);function zr(e,t,n=!1,r=!1){e=e.__v_raw;const o=Ee(e),s=Ee(t);n||(t!==s&&it(o,"get",t),it(o,"get",s));const{has:d}=uo(o),f=r?ja:n?Da:br;if(d.call(o,t))return f(e.get(t));if(d.call(o,s))return f(e.get(s));e!==o&&e.get(t)}function Mr(e,t=!1){const n=this.__v_raw,r=Ee(n),o=Ee(e);return t||(e!==o&&it(r,"has",e),it(r,"has",o)),e===o?n.has(e):n.has(e)||n.has(o)}function Dr(e,t=!1){return e=e.__v_raw,!t&&it(Ee(e),"iterate",sn),Reflect.get(e,"size",e)}function Fi(e){e=Ee(e);const t=Ee(this);return uo(t).has.call(t,e)||(t.add(e),zt(t,"add",e,e)),this}function qi(e,t){t=Ee(t);const n=Ee(this),{has:r,get:o}=uo(n);let s=r.call(n,e);s||(e=Ee(e),s=r.call(n,e));const d=o.call(n,e);return n.set(e,t),s?hr(t,d)&&zt(n,"set",e,t):zt(n,"add",e,t),this}function Ni(e){const t=Ee(this),{has:n,get:r}=uo(t);let o=n.call(t,e);o||(e=Ee(e),o=n.call(t,e)),r&&r.call(t,e);const s=t.delete(e);return o&&zt(t,"delete",e,void 0),s}function Hi(){const e=Ee(this),t=e.size!==0,n=e.clear();return t&&zt(e,"clear",void 0,void 0),n}function Fr(e,t){return function(r,o){const s=this,d=s.__v_raw,f=Ee(d),y=t?ja:e?Da:br;return!e&&it(f,"iterate",sn),d.forEach((m,b)=>r.call(o,y(m),y(b),s))}}function qr(e,t,n){return function(...r){const o=this.__v_raw,s=Ee(o),d=gn(s),f=e==="entries"||e===Symbol.iterator&&d,y=e==="keys"&&d,m=o[e](...r),b=n?ja:t?Da:br;return!t&&it(s,"iterate",y?ca:sn),{next(){const{value:v,done:A}=m.next();return A?{value:v,done:A}:{value:f?[b(v[0]),b(v[1])]:b(v),done:A}},[Symbol.iterator](){return this}}}}function Ht(e){return function(...t){return e==="delete"?!1:this}}function Xp(){const e={get(s){return zr(this,s)},get size(){return Dr(this)},has:Mr,add:Fi,set:qi,delete:Ni,clear:Hi,forEach:Fr(!1,!1)},t={get(s){return zr(this,s,!1,!0)},get size(){return Dr(this)},has:Mr,add:Fi,set:qi,delete:Ni,clear:Hi,forEach:Fr(!1,!0)},n={get(s){return zr(this,s,!0)},get size(){return Dr(this,!0)},has(s){return Mr.call(this,s,!0)},add:Ht("add"),set:Ht("set"),delete:Ht("delete"),clear:Ht("clear"),forEach:Fr(!0,!1)},r={get(s){return zr(this,s,!0,!0)},get size(){return Dr(this,!0)},has(s){return Mr.call(this,s,!0)},add:Ht("add"),set:Ht("set"),delete:Ht("delete"),clear:Ht("clear"),forEach:Fr(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=qr(s,!1,!1),n[s]=qr(s,!0,!1),t[s]=qr(s,!1,!0),r[s]=qr(s,!0,!0)}),[e,n,t,r]}const[Gp,eu,tu,nu]=Xp();function za(e,t){const n=t?e?nu:tu:e?eu:Gp;return(r,o,s)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?r:Reflect.get(be(n,o)&&o in r?n:r,o,s)}const ru={get:za(!1,!1)},ou={get:za(!1,!0)},au={get:za(!0,!1)},os=new WeakMap,as=new WeakMap,is=new WeakMap,iu=new WeakMap;function lu(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function su(e){return e.__v_skip||!Object.isExtensible(e)?0:lu(kp(e))}function fo(e){return Cn(e)?e:Ma(e,!1,rs,ru,os)}function ls(e){return Ma(e,!1,Jp,ou,as)}function ss(e){return Ma(e,!0,Zp,au,is)}function Ma(e,t,n,r,o){if(!Re(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const s=o.get(e);if(s)return s;const d=su(e);if(d===0)return e;const f=new Proxy(e,d===2?r:n);return o.set(e,f),f}function xn(e){return Cn(e)?xn(e.__v_raw):!!(e&&e.__v_isReactive)}function Cn(e){return!!(e&&e.__v_isReadonly)}function Jr(e){return!!(e&&e.__v_isShallow)}function cs(e){return xn(e)||Cn(e)}function Ee(e){const t=e&&e.__v_raw;return t?Ee(t):e}function ds(e){return Zr(e,"__v_skip",!0),e}const br=e=>Re(e)?fo(e):e,Da=e=>Re(e)?ss(e):e;function ps(e){$t&&mt&&(e=Ee(e),es(e.dep||(e.dep=Oa())))}function us(e,t){e=Ee(e);const n=e.dep;n&&da(n)}function et(e){return!!(e&&e.__v_isRef===!0)}function Je(e){return fs(e,!1)}function cu(e){return fs(e,!0)}function fs(e,t){return et(e)?e:new du(e,t)}class du{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:Ee(t),this._value=n?t:br(t)}get value(){return ps(this),this._value}set value(t){const n=this.__v_isShallow||Jr(t)||Cn(t);t=n?t:Ee(t),hr(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:br(t),us(this))}}function Ke(e){return et(e)?e.value:e}const pu={get:(e,t,n)=>Ke(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const o=e[t];return et(o)&&!et(n)?(o.value=n,!0):Reflect.set(e,t,n,r)}};function As(e){return xn(e)?e:new Proxy(e,pu)}class uu{constructor(t,n,r,o){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new Ra(t,()=>{this._dirty||(this._dirty=!0,us(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!o,this.__v_isReadonly=r}get value(){const t=Ee(this);return ps(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}function fu(e,t,n=!1){let r,o;const s=fe(e);return s?(r=e,o=vt):(r=e.get,o=e.set),new uu(r,o,s||!o,n)}function Zt(e,t,n,r){let o;try{o=r?e(...r):e()}catch(s){Ao(s,t,n)}return o}function pt(e,t,n,r){if(fe(e)){const s=Zt(e,t,n,r);return s&&Kl(s)&&s.catch(d=>{Ao(d,t,n)}),s}const o=[];for(let s=0;s<e.length;s++)o.push(pt(e[s],t,n,r));return o}function Ao(e,t,n,r=!0){const o=t?t.vnode:null;if(t){let s=t.parent;const d=t.proxy,f=n;for(;s;){const m=s.ec;if(m){for(let b=0;b<m.length;b++)if(m[b](e,d,f)===!1)return}s=s.parent}const y=t.appContext.config.errorHandler;if(y){Zt(y,null,10,[e,d,f]);return}}Au(e,n,o,r)}function Au(e,t,n,r=!0){console.error(e)}let gr=!1,pa=!1;const Ge=[];let Bt=0;const En=[];let Pt=null,on=0;const ys=Promise.resolve();let Fa=null;function Xr(e){const t=Fa||ys;return e?t.then(this?e.bind(this):e):t}function yu(e){let t=Bt+1,n=Ge.length;for(;t<n;){const r=t+n>>>1;vr(Ge[r])<e?t=r+1:n=r}return t}function qa(e){(!Ge.length||!Ge.includes(e,gr&&e.allowRecurse?Bt+1:Bt))&&(e.id==null?Ge.push(e):Ge.splice(yu(e.id),0,e),hs())}function hs(){!gr&&!pa&&(pa=!0,Fa=ys.then(bs))}function hu(e){const t=Ge.indexOf(e);t>Bt&&Ge.splice(t,1)}function mu(e){ce(e)?En.push(...e):(!Pt||!Pt.includes(e,e.allowRecurse?on+1:on))&&En.push(e),hs()}function Ui(e,t=gr?Bt+1:0){for(;t<Ge.length;t++){const n=Ge[t];n&&n.pre&&(Ge.splice(t,1),t--,n())}}function ms(e){if(En.length){const t=[...new Set(En)];if(En.length=0,Pt){Pt.push(...t);return}for(Pt=t,Pt.sort((n,r)=>vr(n)-vr(r)),on=0;on<Pt.length;on++)Pt[on]();Pt=null,on=0}}const vr=e=>e.id==null?1/0:e.id,bu=(e,t)=>{const n=vr(e)-vr(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function bs(e){pa=!1,gr=!0,Ge.sort(bu);const t=vt;try{for(Bt=0;Bt<Ge.length;Bt++){const n=Ge[Bt];n&&n.active!==!1&&Zt(n,null,14)}}finally{Bt=0,Ge.length=0,ms(),gr=!1,Fa=null,(Ge.length||En.length)&&bs()}}function gu(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||je;let o=n;const s=t.startsWith("update:"),d=s&&t.slice(7);if(d&&d in r){const b=`${d==="modelValue"?"model":d}Modifiers`,{number:v,trim:A}=r[b]||je;A&&(o=n.map(C=>He(C)?C.trim():C)),v&&(o=n.map(Bp))}let f,y=r[f=Uo(t)]||r[f=Uo(Lt(t))];!y&&s&&(y=r[f=Uo(_n(t))]),y&&pt(y,e,6,o);const m=r[f+"Once"];if(m){if(!e.emitted)e.emitted={};else if(e.emitted[f])return;e.emitted[f]=!0,pt(m,e,6,o)}}function gs(e,t,n=!1){const r=t.emitsCache,o=r.get(e);if(o!==void 0)return o;const s=e.emits;let d={},f=!1;if(!fe(e)){const y=m=>{const b=gs(m,t,!0);b&&(f=!0,Ne(d,b))};!n&&t.mixins.length&&t.mixins.forEach(y),e.extends&&y(e.extends),e.mixins&&e.mixins.forEach(y)}return!s&&!f?(Re(e)&&r.set(e,null),null):(ce(s)?s.forEach(y=>d[y]=null):Ne(d,s),Re(e)&&r.set(e,d),d)}function yo(e,t){return!e||!io(t)?!1:(t=t.slice(2).replace(/Once$/,""),be(e,t[0].toLowerCase()+t.slice(1))||be(e,_n(t))||be(e,t))}let tt=null,ho=null;function Gr(e){const t=tt;return tt=e,ho=e&&e.type.__scopeId||null,t}function vu(e){ho=e}function xu(){ho=null}function cr(e,t=tt,n){if(!t||e._n)return e;const r=(...o)=>{r._d&&tl(-1);const s=Gr(t);let d;try{d=e(...o)}finally{Gr(s),r._d&&tl(1)}return d};return r._n=!0,r._c=!0,r._d=!0,r}function Yo(e){const{type:t,vnode:n,proxy:r,withProxy:o,props:s,propsOptions:[d],slots:f,attrs:y,emit:m,render:b,renderCache:v,data:A,setupState:C,ctx:B,inheritAttrs:w}=e;let R,I;const T=Gr(e);try{if(n.shapeFlag&4){const D=o||r;R=Ct(b.call(D,D,v,s,C,A,B)),I=y}else{const D=t;R=Ct(D.length>1?D(s,{attrs:y,slots:f,emit:m}):D(s,null)),I=t.props?y:Eu(y)}}catch(D){fr.length=0,Ao(D,e,1),R=N(ft)}let U=R;if(I&&w!==!1){const D=Object.keys(I),{shapeFlag:Ae}=U;D.length&&Ae&7&&(d&&D.some(La)&&(I=ku(I,d)),U=Xt(U,I))}return n.dirs&&(U=Xt(U),U.dirs=U.dirs?U.dirs.concat(n.dirs):n.dirs),n.transition&&(U.transition=n.transition),R=U,Gr(T),R}const Eu=e=>{let t;for(const n in e)(n==="class"||n==="style"||io(n))&&((t||(t={}))[n]=e[n]);return t},ku=(e,t)=>{const n={};for(const r in e)(!La(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function wu(e,t,n){const{props:r,children:o,component:s}=e,{props:d,children:f,patchFlag:y}=t,m=s.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&y>=0){if(y&1024)return!0;if(y&16)return r?Wi(r,d,m):!!d;if(y&8){const b=t.dynamicProps;for(let v=0;v<b.length;v++){const A=b[v];if(d[A]!==r[A]&&!yo(m,A))return!0}}}else return(o||f)&&(!f||!f.$stable)?!0:r===d?!1:r?d?Wi(r,d,m):!0:!!d;return!1}function Wi(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let o=0;o<r.length;o++){const s=r[o];if(t[s]!==e[s]&&!yo(n,s))return!0}return!1}function Cu({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent}const Bu=e=>e.__isSuspense;function Su(e,t){t&&t.pendingBranch?ce(e)?t.effects.push(...e):t.effects.push(e):mu(e)}const Nr={};function kn(e,t,n){return vs(e,t,n)}function vs(e,t,{immediate:n,deep:r,flush:o,onTrack:s,onTrigger:d}=je){var f;const y=zp()===((f=$e)==null?void 0:f.scope)?$e:null;let m,b=!1,v=!1;if(et(e)?(m=()=>e.value,b=Jr(e)):xn(e)?(m=()=>e,r=!0):ce(e)?(v=!0,b=e.some(D=>xn(D)||Jr(D)),m=()=>e.map(D=>{if(et(D))return D.value;if(xn(D))return mn(D);if(fe(D))return Zt(D,y,2)})):fe(e)?t?m=()=>Zt(e,y,2):m=()=>{if(!(y&&y.isUnmounted))return A&&A(),pt(e,y,3,[C])}:m=vt,t&&r){const D=m;m=()=>mn(D())}let A,C=D=>{A=T.onStop=()=>{Zt(D,y,4)}},B;if(Er)if(C=vt,t?n&&pt(t,y,3,[m(),v?[]:void 0,C]):m(),o==="sync"){const D=Bf();B=D.__watcherHandles||(D.__watcherHandles=[])}else return vt;let w=v?new Array(e.length).fill(Nr):Nr;const R=()=>{if(T.active)if(t){const D=T.run();(r||b||(v?D.some((Ae,ke)=>hr(Ae,w[ke])):hr(D,w)))&&(A&&A(),pt(t,y,3,[D,w===Nr?void 0:v&&w[0]===Nr?[]:w,C]),w=D)}else T.run()};R.allowRecurse=!!t;let I;o==="sync"?I=R:o==="post"?I=()=>ot(R,y&&y.suspense):(R.pre=!0,y&&(R.id=y.uid),I=()=>qa(R));const T=new Ra(m,I);t?n?R():w=T.run():o==="post"?ot(T.run.bind(T),y&&y.suspense):T.run();const U=()=>{T.stop(),y&&y.scope&&Ia(y.scope.effects,T)};return B&&B.push(U),U}function Lu(e,t,n){const r=this.proxy,o=He(e)?e.includes(".")?xs(r,e):()=>r[e]:e.bind(r,r);let s;fe(t)?s=t:(s=t.handler,n=t);const d=$e;Bn(this);const f=vs(o,s.bind(r),n);return d?Bn(d):cn(),f}function xs(e,t){const n=t.split(".");return()=>{let r=e;for(let o=0;o<n.length&&r;o++)r=r[n[o]];return r}}function mn(e,t){if(!Re(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),et(e))mn(e.value,t);else if(ce(e))for(let n=0;n<e.length;n++)mn(e[n],t);else if(Yl(e)||gn(e))e.forEach(n=>{mn(n,t)});else if(Ql(e))for(const n in e)mn(e[n],t);return e}function en(e,t,n,r){const o=e.dirs,s=t&&t.dirs;for(let d=0;d<o.length;d++){const f=o[d];s&&(f.oldValue=s[d].value);let y=f.dir[r];y&&(Tn(),pt(y,n,8,[e.el,f,e,t]),On())}}function Iu(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Rn(()=>{e.isMounted=!0}),Na(()=>{e.isUnmounting=!0}),e}const dt=[Function,Array],Es={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:dt,onEnter:dt,onAfterEnter:dt,onEnterCancelled:dt,onBeforeLeave:dt,onLeave:dt,onAfterLeave:dt,onLeaveCancelled:dt,onBeforeAppear:dt,onAppear:dt,onAfterAppear:dt,onAppearCancelled:dt},_u={name:"BaseTransition",props:Es,setup(e,{slots:t}){const n=bf(),r=Iu();let o;return()=>{const s=t.default&&ws(t.default(),!0);if(!s||!s.length)return;let d=s[0];if(s.length>1){for(const w of s)if(w.type!==ft){d=w;break}}const f=Ee(e),{mode:y}=f;if(r.isLeaving)return Ko(d);const m=Yi(d);if(!m)return Ko(d);const b=ua(m,f,r,n);fa(m,b);const v=n.subTree,A=v&&Yi(v);let C=!1;const{getTransitionKey:B}=m.type;if(B){const w=B();o===void 0?o=w:w!==o&&(o=w,C=!0)}if(A&&A.type!==ft&&(!an(m,A)||C)){const w=ua(A,f,r,n);if(fa(A,w),y==="out-in")return r.isLeaving=!0,w.afterLeave=()=>{r.isLeaving=!1,n.update.active!==!1&&n.update()},Ko(d);y==="in-out"&&m.type!==ft&&(w.delayLeave=(R,I,T)=>{const U=ks(r,A);U[String(A.key)]=A,R._leaveCb=()=>{I(),R._leaveCb=void 0,delete b.delayedLeave},b.delayedLeave=T})}return d}}},Tu=_u;function ks(e,t){const{leavingVNodes:n}=e;let r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function ua(e,t,n,r){const{appear:o,mode:s,persisted:d=!1,onBeforeEnter:f,onEnter:y,onAfterEnter:m,onEnterCancelled:b,onBeforeLeave:v,onLeave:A,onAfterLeave:C,onLeaveCancelled:B,onBeforeAppear:w,onAppear:R,onAfterAppear:I,onAppearCancelled:T}=t,U=String(e.key),D=ks(n,e),Ae=(ue,Be)=>{ue&&pt(ue,r,9,Be)},ke=(ue,Be)=>{const se=Be[1];Ae(ue,Be),ce(ue)?ue.every(Oe=>Oe.length<=1)&&se():ue.length<=1&&se()},Fe={mode:s,persisted:d,beforeEnter(ue){let Be=f;if(!n.isMounted)if(o)Be=w||f;else return;ue._leaveCb&&ue._leaveCb(!0);const se=D[U];se&&an(e,se)&&se.el._leaveCb&&se.el._leaveCb(),Ae(Be,[ue])},enter(ue){let Be=y,se=m,Oe=b;if(!n.isMounted)if(o)Be=R||y,se=I||m,Oe=T||b;else return;let te=!1;const me=ue._enterCb=Pe=>{te||(te=!0,Pe?Ae(Oe,[ue]):Ae(se,[ue]),Fe.delayedLeave&&Fe.delayedLeave(),ue._enterCb=void 0)};Be?ke(Be,[ue,me]):me()},leave(ue,Be){const se=String(e.key);if(ue._enterCb&&ue._enterCb(!0),n.isUnmounting)return Be();Ae(v,[ue]);let Oe=!1;const te=ue._leaveCb=me=>{Oe||(Oe=!0,Be(),me?Ae(B,[ue]):Ae(C,[ue]),ue._leaveCb=void 0,D[se]===e&&delete D[se])};D[se]=e,A?ke(A,[ue,te]):te()},clone(ue){return ua(ue,t,n,r)}};return Fe}function Ko(e){if(mo(e))return e=Xt(e),e.children=null,e}function Yi(e){return mo(e)?e.children?e.children[0]:void 0:e}function fa(e,t){e.shapeFlag&6&&e.component?fa(e.component.subTree,t):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function ws(e,t=!1,n){let r=[],o=0;for(let s=0;s<e.length;s++){let d=e[s];const f=n==null?d.key:String(n)+String(d.key!=null?d.key:s);d.type===Xe?(d.patchFlag&128&&o++,r=r.concat(ws(d.children,t,f))):(t||d.type!==ft)&&r.push(f!=null?Xt(d,{key:f}):d)}if(o>1)for(let s=0;s<r.length;s++)r[s].patchFlag=-2;return r}function Cs(e,t){return fe(e)?(()=>Ne({name:e.name},t,{setup:e}))():e}const pr=e=>!!e.type.__asyncLoader,mo=e=>e.type.__isKeepAlive;function Ou(e,t){Bs(e,"a",t)}function Ru(e,t){Bs(e,"da",t)}function Bs(e,t,n=$e){const r=e.__wdc||(e.__wdc=()=>{let o=n;for(;o;){if(o.isDeactivated)return;o=o.parent}return e()});if(bo(t,r,n),n){let o=n.parent;for(;o&&o.parent;)mo(o.parent.vnode)&&Pu(r,t,n,o),o=o.parent}}function Pu(e,t,n,r){const o=bo(t,e,r,!0);Ha(()=>{Ia(r[t],o)},n)}function bo(e,t,n=$e,r=!1){if(n){const o=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...d)=>{if(n.isUnmounted)return;Tn(),Bn(n);const f=pt(t,n,e,d);return cn(),On(),f});return r?o.unshift(s):o.push(s),s}}const Mt=e=>(t,n=$e)=>(!Er||e==="sp")&&bo(e,(...r)=>t(...r),n),ju=Mt("bm"),Rn=Mt("m"),zu=Mt("bu"),Mu=Mt("u"),Na=Mt("bum"),Ha=Mt("um"),Du=Mt("sp"),Fu=Mt("rtg"),qu=Mt("rtc");function Nu(e,t=$e){bo("ec",e,t)}const Ss="components";function Hu(e,t){return Wu(Ss,e,!0,t)||e}const Uu=Symbol.for("v-ndc");function Wu(e,t,n=!0,r=!1){const o=tt||$e;if(o){const s=o.type;if(e===Ss){const f=kf(s,!1);if(f&&(f===t||f===Lt(t)||f===co(Lt(t))))return s}const d=Ki(o[e]||s[e],t)||Ki(o.appContext[e],t);return!d&&r?s:d}}function Ki(e,t){return e&&(e[t]||e[Lt(t)]||e[co(Lt(t))])}function Vo(e,t,n,r){let o;const s=n&&n[r];if(ce(e)||He(e)){o=new Array(e.length);for(let d=0,f=e.length;d<f;d++)o[d]=t(e[d],d,void 0,s&&s[d])}else if(typeof e=="number"){o=new Array(e);for(let d=0;d<e;d++)o[d]=t(d+1,d,void 0,s&&s[d])}else if(Re(e))if(e[Symbol.iterator])o=Array.from(e,(d,f)=>t(d,f,void 0,s&&s[f]));else{const d=Object.keys(e);o=new Array(d.length);for(let f=0,y=d.length;f<y;f++){const m=d[f];o[f]=t(e[m],m,f,s&&s[f])}}else o=[];return n&&(n[r]=o),o}function Yu(e,t,n={},r,o){if(tt.isCE||tt.parent&&pr(tt.parent)&&tt.parent.isCE)return t!=="default"&&(n.name=t),N("slot",n,r&&r());let s=e[t];s&&s._c&&(s._d=!1),xe();const d=s&&Ls(s(n)),f=at(Xe,{key:n.key||d&&d.key||`_${t}`},d||(r?r():[]),d&&e._===1?64:-2);return!o&&f.scopeId&&(f.slotScopeIds=[f.scopeId+"-s"]),s&&s._c&&(s._d=!0),f}function Ls(e){return e.some(t=>no(t)?!(t.type===ft||t.type===Xe&&!Ls(t.children)):!0)?e:null}const Aa=e=>e?Fs(e)?Va(e)||e.proxy:Aa(e.parent):null,ur=Ne(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Aa(e.parent),$root:e=>Aa(e.root),$emit:e=>e.emit,$options:e=>Ua(e),$forceUpdate:e=>e.f||(e.f=()=>qa(e.update)),$nextTick:e=>e.n||(e.n=Xr.bind(e.proxy)),$watch:e=>Lu.bind(e)}),Qo=(e,t)=>e!==je&&!e.__isScriptSetup&&be(e,t),Ku={get({_:e},t){const{ctx:n,setupState:r,data:o,props:s,accessCache:d,type:f,appContext:y}=e;let m;if(t[0]!=="$"){const C=d[t];if(C!==void 0)switch(C){case 1:return r[t];case 2:return o[t];case 4:return n[t];case 3:return s[t]}else{if(Qo(r,t))return d[t]=1,r[t];if(o!==je&&be(o,t))return d[t]=2,o[t];if((m=e.propsOptions[0])&&be(m,t))return d[t]=3,s[t];if(n!==je&&be(n,t))return d[t]=4,n[t];ya&&(d[t]=0)}}const b=ur[t];let v,A;if(b)return t==="$attrs"&&it(e,"get",t),b(e);if((v=f.__cssModules)&&(v=v[t]))return v;if(n!==je&&be(n,t))return d[t]=4,n[t];if(A=y.config.globalProperties,be(A,t))return A[t]},set({_:e},t,n){const{data:r,setupState:o,ctx:s}=e;return Qo(o,t)?(o[t]=n,!0):r!==je&&be(r,t)?(r[t]=n,!0):be(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(s[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:o,propsOptions:s}},d){let f;return!!n[d]||e!==je&&be(e,d)||Qo(t,d)||(f=s[0])&&be(f,d)||be(r,d)||be(ur,d)||be(o.config.globalProperties,d)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:be(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function Vi(e){return ce(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let ya=!0;function Vu(e){const t=Ua(e),n=e.proxy,r=e.ctx;ya=!1,t.beforeCreate&&Qi(t.beforeCreate,e,"bc");const{data:o,computed:s,methods:d,watch:f,provide:y,inject:m,created:b,beforeMount:v,mounted:A,beforeUpdate:C,updated:B,activated:w,deactivated:R,beforeDestroy:I,beforeUnmount:T,destroyed:U,unmounted:D,render:Ae,renderTracked:ke,renderTriggered:Fe,errorCaptured:ue,serverPrefetch:Be,expose:se,inheritAttrs:Oe,components:te,directives:me,filters:Pe}=t;if(m&&Qu(m,r,null),d)for(const ee in d){const re=d[ee];fe(re)&&(r[ee]=re.bind(n))}if(o){const ee=o.call(n,n);Re(ee)&&(e.data=fo(ee))}if(ya=!0,s)for(const ee in s){const re=s[ee],$=fe(re)?re.bind(n,n):fe(re.get)?re.get.bind(n,n):vt,Ue=!fe(re)&&fe(re.set)?re.set.bind(n):vt,Me=bt({get:$,set:Ue});Object.defineProperty(r,ee,{enumerable:!0,configurable:!0,get:()=>Me.value,set:qe=>Me.value=qe})}if(f)for(const ee in f)Is(f[ee],r,n,ee);if(y){const ee=fe(y)?y.call(n):y;Reflect.ownKeys(ee).forEach(re=>{Wr(re,ee[re])})}b&&Qi(b,e,"c");function _e(ee,re){ce(re)?re.forEach($=>ee($.bind(n))):re&&ee(re.bind(n))}if(_e(ju,v),_e(Rn,A),_e(zu,C),_e(Mu,B),_e(Ou,w),_e(Ru,R),_e(Nu,ue),_e(qu,ke),_e(Fu,Fe),_e(Na,T),_e(Ha,D),_e(Du,Be),ce(se))if(se.length){const ee=e.exposed||(e.exposed={});se.forEach(re=>{Object.defineProperty(ee,re,{get:()=>n[re],set:$=>n[re]=$})})}else e.exposed||(e.exposed={});Ae&&e.render===vt&&(e.render=Ae),Oe!=null&&(e.inheritAttrs=Oe),te&&(e.components=te),me&&(e.directives=me)}function Qu(e,t,n=vt){ce(e)&&(e=ha(e));for(const r in e){const o=e[r];let s;Re(o)?"default"in o?s=ut(o.from||r,o.default,!0):s=ut(o.from||r):s=ut(o),et(s)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>s.value,set:d=>s.value=d}):t[r]=s}}function Qi(e,t,n){pt(ce(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function Is(e,t,n,r){const o=r.includes(".")?xs(n,r):()=>n[r];if(He(e)){const s=t[e];fe(s)&&kn(o,s)}else if(fe(e))kn(o,e.bind(n));else if(Re(e))if(ce(e))e.forEach(s=>Is(s,t,n,r));else{const s=fe(e.handler)?e.handler.bind(n):t[e.handler];fe(s)&&kn(o,s,e)}}function Ua(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:o,optionsCache:s,config:{optionMergeStrategies:d}}=e.appContext,f=s.get(t);let y;return f?y=f:!o.length&&!n&&!r?y=t:(y={},o.length&&o.forEach(m=>eo(y,m,d,!0)),eo(y,t,d)),Re(t)&&s.set(t,y),y}function eo(e,t,n,r=!1){const{mixins:o,extends:s}=t;s&&eo(e,s,n,!0),o&&o.forEach(d=>eo(e,d,n,!0));for(const d in t)if(!(r&&d==="expose")){const f=$u[d]||n&&n[d];e[d]=f?f(e[d],t[d]):t[d]}return e}const $u={data:$i,props:Zi,emits:Zi,methods:dr,computed:dr,beforeCreate:nt,created:nt,beforeMount:nt,mounted:nt,beforeUpdate:nt,updated:nt,beforeDestroy:nt,beforeUnmount:nt,destroyed:nt,unmounted:nt,activated:nt,deactivated:nt,errorCaptured:nt,serverPrefetch:nt,components:dr,directives:dr,watch:Ju,provide:$i,inject:Zu};function $i(e,t){return t?e?function(){return Ne(fe(e)?e.call(this,this):e,fe(t)?t.call(this,this):t)}:t:e}function Zu(e,t){return dr(ha(e),ha(t))}function ha(e){if(ce(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function nt(e,t){return e?[...new Set([].concat(e,t))]:t}function dr(e,t){return e?Ne(Object.create(null),e,t):t}function Zi(e,t){return e?ce(e)&&ce(t)?[...new Set([...e,...t])]:Ne(Object.create(null),Vi(e),Vi(t??{})):t}function Ju(e,t){if(!e)return t;if(!t)return e;const n=Ne(Object.create(null),e);for(const r in t)n[r]=nt(e[r],t[r]);return n}function _s(){return{app:null,config:{isNativeTag:vp,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Xu=0;function Gu(e,t){return function(r,o=null){fe(r)||(r=Ne({},r)),o!=null&&!Re(o)&&(o=null);const s=_s(),d=new Set;let f=!1;const y=s.app={_uid:Xu++,_component:r,_props:o,_container:null,_context:s,_instance:null,version:Sf,get config(){return s.config},set config(m){},use(m,...b){return d.has(m)||(m&&fe(m.install)?(d.add(m),m.install(y,...b)):fe(m)&&(d.add(m),m(y,...b))),y},mixin(m){return s.mixins.includes(m)||s.mixins.push(m),y},component(m,b){return b?(s.components[m]=b,y):s.components[m]},directive(m,b){return b?(s.directives[m]=b,y):s.directives[m]},mount(m,b,v){if(!f){const A=N(r,o);return A.appContext=s,b&&t?t(A,m):e(A,m,v),f=!0,y._container=m,m.__vue_app__=y,Va(A.component)||A.component.proxy}},unmount(){f&&(e(null,y._container),delete y._container.__vue_app__)},provide(m,b){return s.provides[m]=b,y},runWithContext(m){to=y;try{return m()}finally{to=null}}};return y}}let to=null;function Wr(e,t){if($e){let n=$e.provides;const r=$e.parent&&$e.parent.provides;r===n&&(n=$e.provides=Object.create(r)),n[e]=t}}function ut(e,t,n=!1){const r=$e||tt;if(r||to){const o=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:to._context.provides;if(o&&e in o)return o[e];if(arguments.length>1)return n&&fe(t)?t.call(r&&r.proxy):t}}function ef(e,t,n,r=!1){const o={},s={};Zr(s,vo,1),e.propsDefaults=Object.create(null),Ts(e,t,o,s);for(const d in e.propsOptions[0])d in o||(o[d]=void 0);n?e.props=r?o:ls(o):e.type.props?e.props=o:e.props=s,e.attrs=s}function tf(e,t,n,r){const{props:o,attrs:s,vnode:{patchFlag:d}}=e,f=Ee(o),[y]=e.propsOptions;let m=!1;if((r||d>0)&&!(d&16)){if(d&8){const b=e.vnode.dynamicProps;for(let v=0;v<b.length;v++){let A=b[v];if(yo(e.emitsOptions,A))continue;const C=t[A];if(y)if(be(s,A))C!==s[A]&&(s[A]=C,m=!0);else{const B=Lt(A);o[B]=ma(y,f,B,C,e,!1)}else C!==s[A]&&(s[A]=C,m=!0)}}}else{Ts(e,t,o,s)&&(m=!0);let b;for(const v in f)(!t||!be(t,v)&&((b=_n(v))===v||!be(t,b)))&&(y?n&&(n[v]!==void 0||n[b]!==void 0)&&(o[v]=ma(y,f,v,void 0,e,!0)):delete o[v]);if(s!==f)for(const v in s)(!t||!be(t,v))&&(delete s[v],m=!0)}m&&zt(e,"set","$attrs")}function Ts(e,t,n,r){const[o,s]=e.propsOptions;let d=!1,f;if(t)for(let y in t){if(Ur(y))continue;const m=t[y];let b;o&&be(o,b=Lt(y))?!s||!s.includes(b)?n[b]=m:(f||(f={}))[b]=m:yo(e.emitsOptions,y)||(!(y in r)||m!==r[y])&&(r[y]=m,d=!0)}if(s){const y=Ee(n),m=f||je;for(let b=0;b<s.length;b++){const v=s[b];n[v]=ma(o,y,v,m[v],e,!be(m,v))}}return d}function ma(e,t,n,r,o,s){const d=e[n];if(d!=null){const f=be(d,"default");if(f&&r===void 0){const y=d.default;if(d.type!==Function&&!d.skipFactory&&fe(y)){const{propsDefaults:m}=o;n in m?r=m[n]:(Bn(o),r=m[n]=y.call(null,t),cn())}else r=y}d[0]&&(s&&!f?r=!1:d[1]&&(r===""||r===_n(n))&&(r=!0))}return r}function Os(e,t,n=!1){const r=t.propsCache,o=r.get(e);if(o)return o;const s=e.props,d={},f=[];let y=!1;if(!fe(e)){const b=v=>{y=!0;const[A,C]=Os(v,t,!0);Ne(d,A),C&&f.push(...C)};!n&&t.mixins.length&&t.mixins.forEach(b),e.extends&&b(e.extends),e.mixins&&e.mixins.forEach(b)}if(!s&&!y)return Re(e)&&r.set(e,bn),bn;if(ce(s))for(let b=0;b<s.length;b++){const v=Lt(s[b]);Ji(v)&&(d[v]=je)}else if(s)for(const b in s){const v=Lt(b);if(Ji(v)){const A=s[b],C=d[v]=ce(A)||fe(A)?{type:A}:Ne({},A);if(C){const B=el(Boolean,C.type),w=el(String,C.type);C[0]=B>-1,C[1]=w<0||B<w,(B>-1||be(C,"default"))&&f.push(v)}}}const m=[d,f];return Re(e)&&r.set(e,m),m}function Ji(e){return e[0]!=="$"}function Xi(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function Gi(e,t){return Xi(e)===Xi(t)}function el(e,t){return ce(t)?t.findIndex(n=>Gi(n,e)):fe(t)&&Gi(t,e)?0:-1}const Rs=e=>e[0]==="_"||e==="$stable",Wa=e=>ce(e)?e.map(Ct):[Ct(e)],nf=(e,t,n)=>{if(t._n)return t;const r=cr((...o)=>Wa(t(...o)),n);return r._c=!1,r},Ps=(e,t,n)=>{const r=e._ctx;for(const o in e){if(Rs(o))continue;const s=e[o];if(fe(s))t[o]=nf(o,s,r);else if(s!=null){const d=Wa(s);t[o]=()=>d}}},js=(e,t)=>{const n=Wa(t);e.slots.default=()=>n},rf=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=Ee(t),Zr(t,"_",n)):Ps(t,e.slots={})}else e.slots={},t&&js(e,t);Zr(e.slots,vo,1)},of=(e,t,n)=>{const{vnode:r,slots:o}=e;let s=!0,d=je;if(r.shapeFlag&32){const f=t._;f?n&&f===1?s=!1:(Ne(o,t),!n&&f===1&&delete o._):(s=!t.$stable,Ps(t,o)),d=t}else t&&(js(e,t),d={default:1});if(s)for(const f in o)!Rs(f)&&!(f in d)&&delete o[f]};function ba(e,t,n,r,o=!1){if(ce(e)){e.forEach((A,C)=>ba(A,t&&(ce(t)?t[C]:t),n,r,o));return}if(pr(r)&&!o)return;const s=r.shapeFlag&4?Va(r.component)||r.component.proxy:r.el,d=o?null:s,{i:f,r:y}=e,m=t&&t.r,b=f.refs===je?f.refs={}:f.refs,v=f.setupState;if(m!=null&&m!==y&&(He(m)?(b[m]=null,be(v,m)&&(v[m]=null)):et(m)&&(m.value=null)),fe(y))Zt(y,f,12,[d,b]);else{const A=He(y),C=et(y);if(A||C){const B=()=>{if(e.f){const w=A?be(v,y)?v[y]:b[y]:y.value;o?ce(w)&&Ia(w,s):ce(w)?w.includes(s)||w.push(s):A?(b[y]=[s],be(v,y)&&(v[y]=b[y])):(y.value=[s],e.k&&(b[e.k]=y.value))}else A?(b[y]=d,be(v,y)&&(v[y]=d)):C&&(y.value=d,e.k&&(b[e.k]=d))};d?(B.id=-1,ot(B,n)):B()}}}const ot=Su;function af(e){return lf(e)}function lf(e,t){const n=ia();n.__VUE__=!0;const{insert:r,remove:o,patchProp:s,createElement:d,createText:f,createComment:y,setText:m,setElementText:b,parentNode:v,nextSibling:A,setScopeId:C=vt,insertStaticContent:B}=e,w=(E,k,S,O=null,M=null,q=null,X=!1,H=null,V=!!k.dynamicChildren)=>{if(E===k)return;E&&!an(E,k)&&(O=z(E),qe(E,M,q,!0),E=null),k.patchFlag===-2&&(V=!1,k.dynamicChildren=null);const{type:F,ref:ie,shapeFlag:ne}=k;switch(F){case go:R(E,k,S,O);break;case ft:I(E,k,S,O);break;case $o:E==null&&T(k,S,O,X);break;case Xe:te(E,k,S,O,M,q,X,H,V);break;default:ne&1?Ae(E,k,S,O,M,q,X,H,V):ne&6?me(E,k,S,O,M,q,X,H,V):(ne&64||ne&128)&&F.process(E,k,S,O,M,q,X,H,V,Y)}ie!=null&&M&&ba(ie,E&&E.ref,q,k||E,!k)},R=(E,k,S,O)=>{if(E==null)r(k.el=f(k.children),S,O);else{const M=k.el=E.el;k.children!==E.children&&m(M,k.children)}},I=(E,k,S,O)=>{E==null?r(k.el=y(k.children||""),S,O):k.el=E.el},T=(E,k,S,O)=>{[E.el,E.anchor]=B(E.children,k,S,O,E.el,E.anchor)},U=({el:E,anchor:k},S,O)=>{let M;for(;E&&E!==k;)M=A(E),r(E,S,O),E=M;r(k,S,O)},D=({el:E,anchor:k})=>{let S;for(;E&&E!==k;)S=A(E),o(E),E=S;o(k)},Ae=(E,k,S,O,M,q,X,H,V)=>{X=X||k.type==="svg",E==null?ke(k,S,O,M,q,X,H,V):Be(E,k,M,q,X,H,V)},ke=(E,k,S,O,M,q,X,H)=>{let V,F;const{type:ie,props:ne,shapeFlag:le,transition:de,dirs:ye}=E;if(V=E.el=d(E.type,q,ne&&ne.is,ne),le&8?b(V,E.children):le&16&&ue(E.children,V,null,O,M,q&&ie!=="foreignObject",X,H),ye&&en(E,null,O,"created"),Fe(V,E,E.scopeId,X,O),ne){for(const Ce in ne)Ce!=="value"&&!Ur(Ce)&&s(V,Ce,null,ne[Ce],q,E.children,O,M,Te);"value"in ne&&s(V,"value",null,ne.value),(F=ne.onVnodeBeforeMount)&&wt(F,O,E)}ye&&en(E,null,O,"beforeMount");const Le=(!M||M&&!M.pendingBranch)&&de&&!de.persisted;Le&&de.beforeEnter(V),r(V,k,S),((F=ne&&ne.onVnodeMounted)||Le||ye)&&ot(()=>{F&&wt(F,O,E),Le&&de.enter(V),ye&&en(E,null,O,"mounted")},M)},Fe=(E,k,S,O,M)=>{if(S&&C(E,S),O)for(let q=0;q<O.length;q++)C(E,O[q]);if(M){let q=M.subTree;if(k===q){const X=M.vnode;Fe(E,X,X.scopeId,X.slotScopeIds,M.parent)}}},ue=(E,k,S,O,M,q,X,H,V=0)=>{for(let F=V;F<E.length;F++){const ie=E[F]=H?Vt(E[F]):Ct(E[F]);w(null,ie,k,S,O,M,q,X,H)}},Be=(E,k,S,O,M,q,X)=>{const H=k.el=E.el;let{patchFlag:V,dynamicChildren:F,dirs:ie}=k;V|=E.patchFlag&16;const ne=E.props||je,le=k.props||je;let de;S&&tn(S,!1),(de=le.onVnodeBeforeUpdate)&&wt(de,S,k,E),ie&&en(k,E,S,"beforeUpdate"),S&&tn(S,!0);const ye=M&&k.type!=="foreignObject";if(F?se(E.dynamicChildren,F,H,S,O,ye,q):X||re(E,k,H,null,S,O,ye,q,!1),V>0){if(V&16)Oe(H,k,ne,le,S,O,M);else if(V&2&&ne.class!==le.class&&s(H,"class",null,le.class,M),V&4&&s(H,"style",ne.style,le.style,M),V&8){const Le=k.dynamicProps;for(let Ce=0;Ce<Le.length;Ce++){const ze=Le[Ce],lt=ne[ze],Tt=le[ze];(Tt!==lt||ze==="value")&&s(H,ze,lt,Tt,M,E.children,S,O,Te)}}V&1&&E.children!==k.children&&b(H,k.children)}else!X&&F==null&&Oe(H,k,ne,le,S,O,M);((de=le.onVnodeUpdated)||ie)&&ot(()=>{de&&wt(de,S,k,E),ie&&en(k,E,S,"updated")},O)},se=(E,k,S,O,M,q,X)=>{for(let H=0;H<k.length;H++){const V=E[H],F=k[H],ie=V.el&&(V.type===Xe||!an(V,F)||V.shapeFlag&70)?v(V.el):S;w(V,F,ie,null,O,M,q,X,!0)}},Oe=(E,k,S,O,M,q,X)=>{if(S!==O){if(S!==je)for(const H in S)!Ur(H)&&!(H in O)&&s(E,H,S[H],null,X,k.children,M,q,Te);for(const H in O){if(Ur(H))continue;const V=O[H],F=S[H];V!==F&&H!=="value"&&s(E,H,F,V,X,k.children,M,q,Te)}"value"in O&&s(E,"value",S.value,O.value)}},te=(E,k,S,O,M,q,X,H,V)=>{const F=k.el=E?E.el:f(""),ie=k.anchor=E?E.anchor:f("");let{patchFlag:ne,dynamicChildren:le,slotScopeIds:de}=k;de&&(H=H?H.concat(de):de),E==null?(r(F,S,O),r(ie,S,O),ue(k.children,S,ie,M,q,X,H,V)):ne>0&&ne&64&&le&&E.dynamicChildren?(se(E.dynamicChildren,le,S,M,q,X,H),(k.key!=null||M&&k===M.subTree)&&zs(E,k,!0)):re(E,k,S,ie,M,q,X,H,V)},me=(E,k,S,O,M,q,X,H,V)=>{k.slotScopeIds=H,E==null?k.shapeFlag&512?M.ctx.activate(k,S,O,X,V):Pe(k,S,O,M,q,X,V):rt(E,k,V)},Pe=(E,k,S,O,M,q,X)=>{const H=E.component=mf(E,O,M);if(mo(E)&&(H.ctx.renderer=Y),gf(H),H.asyncDep){if(M&&M.registerDep(H,_e),!E.el){const V=H.subTree=N(ft);I(null,V,k,S)}return}_e(H,E,k,S,M,q,X)},rt=(E,k,S)=>{const O=k.component=E.component;if(wu(E,k,S))if(O.asyncDep&&!O.asyncResolved){ee(O,k,S);return}else O.next=k,hu(O.update),O.update();else k.el=E.el,O.vnode=k},_e=(E,k,S,O,M,q,X)=>{const H=()=>{if(E.isMounted){let{next:ie,bu:ne,u:le,parent:de,vnode:ye}=E,Le=ie,Ce;tn(E,!1),ie?(ie.el=ye.el,ee(E,ie,X)):ie=ye,ne&&Wo(ne),(Ce=ie.props&&ie.props.onVnodeBeforeUpdate)&&wt(Ce,de,ie,ye),tn(E,!0);const ze=Yo(E),lt=E.subTree;E.subTree=ze,w(lt,ze,v(lt.el),z(lt),E,M,q),ie.el=ze.el,Le===null&&Cu(E,ze.el),le&&ot(le,M),(Ce=ie.props&&ie.props.onVnodeUpdated)&&ot(()=>wt(Ce,de,ie,ye),M)}else{let ie;const{el:ne,props:le}=k,{bm:de,m:ye,parent:Le}=E,Ce=pr(k);if(tn(E,!1),de&&Wo(de),!Ce&&(ie=le&&le.onVnodeBeforeMount)&&wt(ie,Le,k),tn(E,!0),ne&&ve){const ze=()=>{E.subTree=Yo(E),ve(ne,E.subTree,E,M,null)};Ce?k.type.__asyncLoader().then(()=>!E.isUnmounted&&ze()):ze()}else{const ze=E.subTree=Yo(E);w(null,ze,S,O,E,M,q),k.el=ze.el}if(ye&&ot(ye,M),!Ce&&(ie=le&&le.onVnodeMounted)){const ze=k;ot(()=>wt(ie,Le,ze),M)}(k.shapeFlag&256||Le&&pr(Le.vnode)&&Le.vnode.shapeFlag&256)&&E.a&&ot(E.a,M),E.isMounted=!0,k=S=O=null}},V=E.effect=new Ra(H,()=>qa(F),E.scope),F=E.update=()=>V.run();F.id=E.uid,tn(E,!0),F()},ee=(E,k,S)=>{k.component=E;const O=E.vnode.props;E.vnode=k,E.next=null,tf(E,k.props,O,S),of(E,k.children,S),Tn(),Ui(),On()},re=(E,k,S,O,M,q,X,H,V=!1)=>{const F=E&&E.children,ie=E?E.shapeFlag:0,ne=k.children,{patchFlag:le,shapeFlag:de}=k;if(le>0){if(le&128){Ue(F,ne,S,O,M,q,X,H,V);return}else if(le&256){$(F,ne,S,O,M,q,X,H,V);return}}de&8?(ie&16&&Te(F,M,q),ne!==F&&b(S,ne)):ie&16?de&16?Ue(F,ne,S,O,M,q,X,H,V):Te(F,M,q,!0):(ie&8&&b(S,""),de&16&&ue(ne,S,O,M,q,X,H,V))},$=(E,k,S,O,M,q,X,H,V)=>{E=E||bn,k=k||bn;const F=E.length,ie=k.length,ne=Math.min(F,ie);let le;for(le=0;le<ne;le++){const de=k[le]=V?Vt(k[le]):Ct(k[le]);w(E[le],de,S,null,M,q,X,H,V)}F>ie?Te(E,M,q,!0,!1,ne):ue(k,S,O,M,q,X,H,V,ne)},Ue=(E,k,S,O,M,q,X,H,V)=>{let F=0;const ie=k.length;let ne=E.length-1,le=ie-1;for(;F<=ne&&F<=le;){const de=E[F],ye=k[F]=V?Vt(k[F]):Ct(k[F]);if(an(de,ye))w(de,ye,S,null,M,q,X,H,V);else break;F++}for(;F<=ne&&F<=le;){const de=E[ne],ye=k[le]=V?Vt(k[le]):Ct(k[le]);if(an(de,ye))w(de,ye,S,null,M,q,X,H,V);else break;ne--,le--}if(F>ne){if(F<=le){const de=le+1,ye=de<ie?k[de].el:O;for(;F<=le;)w(null,k[F]=V?Vt(k[F]):Ct(k[F]),S,ye,M,q,X,H,V),F++}}else if(F>le)for(;F<=ne;)qe(E[F],M,q,!0),F++;else{const de=F,ye=F,Le=new Map;for(F=ye;F<=le;F++){const Ze=k[F]=V?Vt(k[F]):Ct(k[F]);Ze.key!=null&&Le.set(Ze.key,F)}let Ce,ze=0;const lt=le-ye+1;let Tt=!1,P=0;const ct=new Array(lt);for(F=0;F<lt;F++)ct[F]=0;for(F=de;F<=ne;F++){const Ze=E[F];if(ze>=lt){qe(Ze,M,q,!0);continue}let he;if(Ze.key!=null)he=Le.get(Ze.key);else for(Ce=ye;Ce<=le;Ce++)if(ct[Ce-ye]===0&&an(Ze,k[Ce])){he=Ce;break}he===void 0?qe(Ze,M,q,!0):(ct[he-ye]=F+1,he>=P?P=he:Tt=!0,w(Ze,k[he],S,null,M,q,X,H,V),ze++)}const jn=Tt?sf(ct):bn;for(Ce=jn.length-1,F=lt-1;F>=0;F--){const Ze=ye+F,he=k[Ze],Sr=Ze+1<ie?k[Ze+1].el:O;ct[F]===0?w(null,he,S,Sr,M,q,X,H,V):Tt&&(Ce<0||F!==jn[Ce]?Me(he,S,Sr,2):Ce--)}}},Me=(E,k,S,O,M=null)=>{const{el:q,type:X,transition:H,children:V,shapeFlag:F}=E;if(F&6){Me(E.component.subTree,k,S,O);return}if(F&128){E.suspense.move(k,S,O);return}if(F&64){X.move(E,k,S,Y);return}if(X===Xe){r(q,k,S);for(let ne=0;ne<V.length;ne++)Me(V[ne],k,S,O);r(E.anchor,k,S);return}if(X===$o){U(E,k,S);return}if(O!==2&&F&1&&H)if(O===0)H.beforeEnter(q),r(q,k,S),ot(()=>H.enter(q),M);else{const{leave:ne,delayLeave:le,afterLeave:de}=H,ye=()=>r(q,k,S),Le=()=>{ne(q,()=>{ye(),de&&de()})};le?le(q,ye,Le):Le()}else r(q,k,S)},qe=(E,k,S,O=!1,M=!1)=>{const{type:q,props:X,ref:H,children:V,dynamicChildren:F,shapeFlag:ie,patchFlag:ne,dirs:le}=E;if(H!=null&&ba(H,null,S,E,!0),ie&256){k.ctx.deactivate(E);return}const de=ie&1&&le,ye=!pr(E);let Le;if(ye&&(Le=X&&X.onVnodeBeforeUnmount)&&wt(Le,k,E),ie&6)Dt(E.component,S,O);else{if(ie&128){E.suspense.unmount(S,O);return}de&&en(E,null,k,"beforeUnmount"),ie&64?E.type.remove(E,k,S,M,Y,O):F&&(q!==Xe||ne>0&&ne&64)?Te(F,k,S,!1,!0):(q===Xe&&ne&384||!M&&ie&16)&&Te(V,k,S),O&&_t(E)}(ye&&(Le=X&&X.onVnodeUnmounted)||de)&&ot(()=>{Le&&wt(Le,k,E),de&&en(E,null,k,"unmounted")},S)},_t=E=>{const{type:k,el:S,anchor:O,transition:M}=E;if(k===Xe){Et(S,O);return}if(k===$o){D(E);return}const q=()=>{o(S),M&&!M.persisted&&M.afterLeave&&M.afterLeave()};if(E.shapeFlag&1&&M&&!M.persisted){const{leave:X,delayLeave:H}=M,V=()=>X(S,q);H?H(E.el,q,V):V()}else q()},Et=(E,k)=>{let S;for(;E!==k;)S=A(E),o(E),E=S;o(k)},Dt=(E,k,S)=>{const{bum:O,scope:M,update:q,subTree:X,um:H}=E;O&&Wo(O),M.stop(),q&&(q.active=!1,qe(X,E,k,S)),H&&ot(H,k),ot(()=>{E.isUnmounted=!0},k),k&&k.pendingBranch&&!k.isUnmounted&&E.asyncDep&&!E.asyncResolved&&E.suspenseId===k.pendingId&&(k.deps--,k.deps===0&&k.resolve())},Te=(E,k,S,O=!1,M=!1,q=0)=>{for(let X=q;X<E.length;X++)qe(E[X],k,S,O,M)},z=E=>E.shapeFlag&6?z(E.component.subTree):E.shapeFlag&128?E.suspense.next():A(E.anchor||E.el),J=(E,k,S)=>{E==null?k._vnode&&qe(k._vnode,null,null,!0):w(k._vnode||null,E,k,null,null,null,S),Ui(),ms(),k._vnode=E},Y={p:w,um:qe,m:Me,r:_t,mt:Pe,mc:ue,pc:re,pbc:se,n:z,o:e};let ae,ve;return t&&([ae,ve]=t(Y)),{render:J,hydrate:ae,createApp:Gu(J,ae)}}function tn({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function zs(e,t,n=!1){const r=e.children,o=t.children;if(ce(r)&&ce(o))for(let s=0;s<r.length;s++){const d=r[s];let f=o[s];f.shapeFlag&1&&!f.dynamicChildren&&((f.patchFlag<=0||f.patchFlag===32)&&(f=o[s]=Vt(o[s]),f.el=d.el),n||zs(d,f)),f.type===go&&(f.el=d.el)}}function sf(e){const t=e.slice(),n=[0];let r,o,s,d,f;const y=e.length;for(r=0;r<y;r++){const m=e[r];if(m!==0){if(o=n[n.length-1],e[o]<m){t[r]=o,n.push(r);continue}for(s=0,d=n.length-1;s<d;)f=s+d>>1,e[n[f]]<m?s=f+1:d=f;m<e[n[s]]&&(s>0&&(t[r]=n[s-1]),n[s]=r)}}for(s=n.length,d=n[s-1];s-- >0;)n[s]=d,d=t[d];return n}const cf=e=>e.__isTeleport,Xe=Symbol.for("v-fgt"),go=Symbol.for("v-txt"),ft=Symbol.for("v-cmt"),$o=Symbol.for("v-stc"),fr=[];let gt=null;function xe(e=!1){fr.push(gt=e?null:[])}function df(){fr.pop(),gt=fr[fr.length-1]||null}let xr=1;function tl(e){xr+=e}function Ms(e){return e.dynamicChildren=xr>0?gt||bn:null,df(),xr>0&&gt&&gt.push(e),e}function Qe(e,t,n,r,o,s){return Ms(we(e,t,n,r,o,s,!0))}function at(e,t,n,r,o){return Ms(N(e,t,n,r,o,!0))}function no(e){return e?e.__v_isVNode===!0:!1}function an(e,t){return e.type===t.type&&e.key===t.key}const vo="__vInternal",Ds=({key:e})=>e??null,Yr=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?He(e)||et(e)||fe(e)?{i:tt,r:e,k:t,f:!!n}:e:null);function we(e,t=null,n=null,r=0,o=null,s=e===Xe?0:1,d=!1,f=!1){const y={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Ds(t),ref:t&&Yr(t),scopeId:ho,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:r,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:tt};return f?(Ya(y,n),s&128&&e.normalize(y)):n&&(y.shapeFlag|=He(n)?8:16),xr>0&&!d&&gt&&(y.patchFlag>0||s&6)&&y.patchFlag!==32&&gt.push(y),y}const N=pf;function pf(e,t=null,n=null,r=0,o=null,s=!1){if((!e||e===Uu)&&(e=ft),no(e)){const f=Xt(e,t,!0);return n&&Ya(f,n),xr>0&&!s&&gt&&(f.shapeFlag&6?gt[gt.indexOf(e)]=f:gt.push(f)),f.patchFlag|=-2,f}if(wf(e)&&(e=e.__vccOpts),t){t=uf(t);let{class:f,style:y}=t;f&&!He(f)&&(t.class=mr(f)),Re(y)&&(cs(y)&&!ce(y)&&(y=Ne({},y)),t.style=po(y))}const d=He(e)?1:Bu(e)?128:cf(e)?64:Re(e)?4:fe(e)?2:0;return we(e,t,n,r,o,d,s,!0)}function uf(e){return e?cs(e)||vo in e?Ne({},e):e:null}function Xt(e,t,n=!1){const{props:r,ref:o,patchFlag:s,children:d}=e,f=t?Af(r||{},t):r;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:f,key:f&&Ds(f),ref:t&&t.ref?n&&o?ce(o)?o.concat(Yr(t)):[o,Yr(t)]:Yr(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:d,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Xe?s===-1?16:s|16:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Xt(e.ssContent),ssFallback:e.ssFallback&&Xt(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function ff(e=" ",t=0){return N(go,null,e,t)}function wn(e="",t=!1){return t?(xe(),at(ft,null,e)):N(ft,null,e)}function Ct(e){return e==null||typeof e=="boolean"?N(ft):ce(e)?N(Xe,null,e.slice()):typeof e=="object"?Vt(e):N(go,null,String(e))}function Vt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Xt(e)}function Ya(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(ce(t))n=16;else if(typeof t=="object")if(r&65){const o=t.default;o&&(o._c&&(o._d=!1),Ya(e,o()),o._c&&(o._d=!0));return}else{n=32;const o=t._;!o&&!(vo in t)?t._ctx=tt:o===3&&tt&&(tt.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else fe(t)?(t={default:t,_ctx:tt},n=32):(t=String(t),r&64?(n=16,t=[ff(t)]):n=8);e.children=t,e.shapeFlag|=n}function Af(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const o in r)if(o==="class")t.class!==r.class&&(t.class=mr([t.class,r.class]));else if(o==="style")t.style=po([t.style,r.style]);else if(io(o)){const s=t[o],d=r[o];d&&s!==d&&!(ce(s)&&s.includes(d))&&(t[o]=s?[].concat(s,d):d)}else o!==""&&(t[o]=r[o])}return t}function wt(e,t,n,r=null){pt(e,t,7,[n,r])}const yf=_s();let hf=0;function mf(e,t,n){const r=e.type,o=(t?t.appContext:e.appContext)||yf,s={uid:hf++,vnode:e,type:r,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,scope:new Pp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Os(r,o),emitsOptions:gs(r,o),emit:null,emitted:null,propsDefaults:je,inheritAttrs:r.inheritAttrs,ctx:je,data:je,props:je,attrs:je,slots:je,refs:je,setupState:je,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=gu.bind(null,s),e.ce&&e.ce(s),s}let $e=null;const bf=()=>$e||tt;let Ka,yn,nl="__VUE_INSTANCE_SETTERS__";(yn=ia()[nl])||(yn=ia()[nl]=[]),yn.push(e=>$e=e),Ka=e=>{yn.length>1?yn.forEach(t=>t(e)):yn[0](e)};const Bn=e=>{Ka(e),e.scope.on()},cn=()=>{$e&&$e.scope.off(),Ka(null)};function Fs(e){return e.vnode.shapeFlag&4}let Er=!1;function gf(e,t=!1){Er=t;const{props:n,children:r}=e.vnode,o=Fs(e);ef(e,n,o,t),rf(e,r);const s=o?vf(e,t):void 0;return Er=!1,s}function vf(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=ds(new Proxy(e.ctx,Ku));const{setup:r}=n;if(r){const o=e.setupContext=r.length>1?Ef(e):null;Bn(e),Tn();const s=Zt(r,e,0,[e.props,o]);if(On(),cn(),Kl(s)){if(s.then(cn,cn),t)return s.then(d=>{rl(e,d,t)}).catch(d=>{Ao(d,e,0)});e.asyncDep=s}else rl(e,s,t)}else qs(e,t)}function rl(e,t,n){fe(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Re(t)&&(e.setupState=As(t)),qs(e,n)}let ol;function qs(e,t,n){const r=e.type;if(!e.render){if(!t&&ol&&!r.render){const o=r.template||Ua(e).template;if(o){const{isCustomElement:s,compilerOptions:d}=e.appContext.config,{delimiters:f,compilerOptions:y}=r,m=Ne(Ne({isCustomElement:s,delimiters:f},d),y);r.render=ol(o,m)}}e.render=r.render||vt}Bn(e),Tn(),Vu(e),On(),cn()}function xf(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,n){return it(e,"get","$attrs"),t[n]}}))}function Ef(e){const t=n=>{e.exposed=n||{}};return{get attrs(){return xf(e)},slots:e.slots,emit:e.emit,expose:t}}function Va(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(As(ds(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in ur)return ur[n](e)},has(t,n){return n in t||n in ur}}))}function kf(e,t=!0){return fe(e)?e.displayName||e.name:e.name||t&&e.__name}function wf(e){return fe(e)&&"__vccOpts"in e}const bt=(e,t)=>fu(e,t,Er);function Qa(e,t,n){const r=arguments.length;return r===2?Re(t)&&!ce(t)?no(t)?N(e,null,[t]):N(e,t):N(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&no(n)&&(n=[n]),N(e,t,n))}const Cf=Symbol.for("v-scx"),Bf=()=>ut(Cf),Sf="3.3.4",Lf="http://www.w3.org/2000/svg",ln=typeof document<"u"?document:null,al=ln&&ln.createElement("template"),If={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const o=t?ln.createElementNS(Lf,e):ln.createElement(e,n?{is:n}:void 0);return e==="select"&&r&&r.multiple!=null&&o.setAttribute("multiple",r.multiple),o},createText:e=>ln.createTextNode(e),createComment:e=>ln.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>ln.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,o,s){const d=n?n.previousSibling:t.lastChild;if(o&&(o===s||o.nextSibling))for(;t.insertBefore(o.cloneNode(!0),n),!(o===s||!(o=o.nextSibling)););else{al.innerHTML=r?`<svg>${e}</svg>`:e;const f=al.content;if(r){const y=f.firstChild;for(;y.firstChild;)f.appendChild(y.firstChild);f.removeChild(y)}t.insertBefore(f,n)}return[d?d.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function _f(e,t,n){const r=e._vtc;r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function Tf(e,t,n){const r=e.style,o=He(n);if(n&&!o){if(t&&!He(t))for(const s in t)n[s]==null&&ga(r,s,"");for(const s in n)ga(r,s,n[s])}else{const s=r.display;o?t!==n&&(r.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(r.display=s)}}const il=/\s*!important$/;function ga(e,t,n){if(ce(n))n.forEach(r=>ga(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=Of(e,t);il.test(n)?e.setProperty(_n(r),n.replace(il,""),"important"):e[r]=n}}const ll=["Webkit","Moz","ms"],Zo={};function Of(e,t){const n=Zo[t];if(n)return n;let r=Lt(t);if(r!=="filter"&&r in e)return Zo[t]=r;r=co(r);for(let o=0;o<ll.length;o++){const s=ll[o]+r;if(s in e)return Zo[t]=s}return t}const sl="http://www.w3.org/1999/xlink";function Rf(e,t,n,r,o){if(r&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(sl,t.slice(6,t.length)):e.setAttributeNS(sl,t,n);else{const s=Rp(t);n==null||s&&!$l(n)?e.removeAttribute(t):e.setAttribute(t,s?"":n)}}function Pf(e,t,n,r,o,s,d){if(t==="innerHTML"||t==="textContent"){r&&d(r,o,s),e[t]=n??"";return}const f=e.tagName;if(t==="value"&&f!=="PROGRESS"&&!f.includes("-")){e._value=n;const m=f==="OPTION"?e.getAttribute("value"):e.value,b=n??"";m!==b&&(e.value=b),n==null&&e.removeAttribute(t);return}let y=!1;if(n===""||n==null){const m=typeof e[t];m==="boolean"?n=$l(n):n==null&&m==="string"?(n="",y=!0):m==="number"&&(n=0,y=!0)}try{e[t]=n}catch{}y&&e.removeAttribute(t)}function jf(e,t,n,r){e.addEventListener(t,n,r)}function zf(e,t,n,r){e.removeEventListener(t,n,r)}function Mf(e,t,n,r,o=null){const s=e._vei||(e._vei={}),d=s[t];if(r&&d)d.value=r;else{const[f,y]=Df(t);if(r){const m=s[t]=Nf(r,o);jf(e,f,m,y)}else d&&(zf(e,f,d,y),s[t]=void 0)}}const cl=/(?:Once|Passive|Capture)$/;function Df(e){let t;if(cl.test(e)){t={};let r;for(;r=e.match(cl);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):_n(e.slice(2)),t]}let Jo=0;const Ff=Promise.resolve(),qf=()=>Jo||(Ff.then(()=>Jo=0),Jo=Date.now());function Nf(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;pt(Hf(r,n.value),t,5,[r])};return n.value=e,n.attached=qf(),n}function Hf(e,t){if(ce(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>o=>!o._stopped&&r&&r(o))}else return t}const dl=/^on[a-z]/,Uf=(e,t,n,r,o=!1,s,d,f,y)=>{t==="class"?_f(e,r,o):t==="style"?Tf(e,n,r):io(t)?La(t)||Mf(e,t,n,r,d):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Wf(e,t,r,o))?Pf(e,t,r,s,d,f,y):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),Rf(e,t,r,o))};function Wf(e,t,n,r){return r?!!(t==="innerHTML"||t==="textContent"||t in e&&dl.test(t)&&fe(n)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||dl.test(t)&&He(n)?!1:t in e}const Ut="transition",ar="animation",ro=(e,{slots:t})=>Qa(Tu,Yf(e),t);ro.displayName="Transition";const Ns={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String};ro.props=Ne({},Es,Ns);const nn=(e,t=[])=>{ce(e)?e.forEach(n=>n(...t)):e&&e(...t)},pl=e=>e?ce(e)?e.some(t=>t.length>1):e.length>1:!1;function Yf(e){const t={};for(const te in e)te in Ns||(t[te]=e[te]);if(e.css===!1)return t;const{name:n="v",type:r,duration:o,enterFromClass:s=`${n}-enter-from`,enterActiveClass:d=`${n}-enter-active`,enterToClass:f=`${n}-enter-to`,appearFromClass:y=s,appearActiveClass:m=d,appearToClass:b=f,leaveFromClass:v=`${n}-leave-from`,leaveActiveClass:A=`${n}-leave-active`,leaveToClass:C=`${n}-leave-to`}=e,B=Kf(o),w=B&&B[0],R=B&&B[1],{onBeforeEnter:I,onEnter:T,onEnterCancelled:U,onLeave:D,onLeaveCancelled:Ae,onBeforeAppear:ke=I,onAppear:Fe=T,onAppearCancelled:ue=U}=t,Be=(te,me,Pe)=>{rn(te,me?b:f),rn(te,me?m:d),Pe&&Pe()},se=(te,me)=>{te._isLeaving=!1,rn(te,v),rn(te,C),rn(te,A),me&&me()},Oe=te=>(me,Pe)=>{const rt=te?Fe:T,_e=()=>Be(me,te,Pe);nn(rt,[me,_e]),ul(()=>{rn(me,te?y:s),Wt(me,te?b:f),pl(rt)||fl(me,r,w,_e)})};return Ne(t,{onBeforeEnter(te){nn(I,[te]),Wt(te,s),Wt(te,d)},onBeforeAppear(te){nn(ke,[te]),Wt(te,y),Wt(te,m)},onEnter:Oe(!1),onAppear:Oe(!0),onLeave(te,me){te._isLeaving=!0;const Pe=()=>se(te,me);Wt(te,v),$f(),Wt(te,A),ul(()=>{te._isLeaving&&(rn(te,v),Wt(te,C),pl(D)||fl(te,r,R,Pe))}),nn(D,[te,Pe])},onEnterCancelled(te){Be(te,!1),nn(U,[te])},onAppearCancelled(te){Be(te,!0),nn(ue,[te])},onLeaveCancelled(te){se(te),nn(Ae,[te])}})}function Kf(e){if(e==null)return null;if(Re(e))return[Xo(e.enter),Xo(e.leave)];{const t=Xo(e);return[t,t]}}function Xo(e){return Sp(e)}function Wt(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e._vtc||(e._vtc=new Set)).add(t)}function rn(e,t){t.split(/\s+/).forEach(r=>r&&e.classList.remove(r));const{_vtc:n}=e;n&&(n.delete(t),n.size||(e._vtc=void 0))}function ul(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let Vf=0;function fl(e,t,n,r){const o=e._endId=++Vf,s=()=>{o===e._endId&&r()};if(n)return setTimeout(s,n);const{type:d,timeout:f,propCount:y}=Qf(e,t);if(!d)return r();const m=d+"end";let b=0;const v=()=>{e.removeEventListener(m,A),s()},A=C=>{C.target===e&&++b>=y&&v()};setTimeout(()=>{b<y&&v()},f+1),e.addEventListener(m,A)}function Qf(e,t){const n=window.getComputedStyle(e),r=B=>(n[B]||"").split(", "),o=r(`${Ut}Delay`),s=r(`${Ut}Duration`),d=Al(o,s),f=r(`${ar}Delay`),y=r(`${ar}Duration`),m=Al(f,y);let b=null,v=0,A=0;t===Ut?d>0&&(b=Ut,v=d,A=s.length):t===ar?m>0&&(b=ar,v=m,A=y.length):(v=Math.max(d,m),b=v>0?d>m?Ut:ar:null,A=b?b===Ut?s.length:y.length:0);const C=b===Ut&&/\b(transform|all)(,|$)/.test(r(`${Ut}Property`).toString());return{type:b,timeout:v,propCount:A,hasTransform:C}}function Al(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,r)=>yl(n)+yl(e[r])))}function yl(e){return Number(e.slice(0,-1).replace(",","."))*1e3}function $f(){return document.body.offsetHeight}const Zf=Ne({patchProp:Uf},If);let hl;function Jf(){return hl||(hl=af(Zf))}const Xf=(...e)=>{const t=Jf().createApp(...e),{mount:n}=t;return t.mount=r=>{const o=Gf(r);if(!o)return;const s=t._component;!fe(s)&&!s.render&&!s.template&&(s.template=o.innerHTML),o.innerHTML="";const d=n(o,!1,o instanceof SVGElement);return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),d},t};function Gf(e){return He(e)?document.querySelector(e):e}const xo=(e,t)=>{const n=e.__vccOpts||e;for(const[r,o]of t)n[r]=o;return n},eA={};function tA(e,t){const n=Hu("router-view");return xe(),at(n)}const nA=xo(eA,[["render",tA]]);/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const hn=typeof window<"u";function rA(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const Se=Object.assign;function Go(e,t){const n={};for(const r in t){const o=t[r];n[r]=xt(o)?o.map(e):e(o)}return n}const Ar=()=>{},xt=Array.isArray,oA=/\/$/,aA=e=>e.replace(oA,"");function ea(e,t,n="/"){let r,o={},s="",d="";const f=t.indexOf("#");let y=t.indexOf("?");return f<y&&f>=0&&(y=-1),y>-1&&(r=t.slice(0,y),s=t.slice(y+1,f>-1?f:t.length),o=e(s)),f>-1&&(r=r||t.slice(0,f),d=t.slice(f,t.length)),r=cA(r??t,n),{fullPath:r+(s&&"?")+s+d,path:r,query:o,hash:d}}function iA(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function ml(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function lA(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&Sn(t.matched[r],n.matched[o])&&Hs(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function Sn(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Hs(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!sA(e[n],t[n]))return!1;return!0}function sA(e,t){return xt(e)?bl(e,t):xt(t)?bl(t,e):e===t}function bl(e,t){return xt(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function cA(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];(o===".."||o===".")&&r.push("");let s=n.length-1,d,f;for(d=0;d<r.length;d++)if(f=r[d],f!==".")if(f==="..")s>1&&s--;else break;return n.slice(0,s).join("/")+"/"+r.slice(d-(d===r.length?1:0)).join("/")}var kr;(function(e){e.pop="pop",e.push="push"})(kr||(kr={}));var yr;(function(e){e.back="back",e.forward="forward",e.unknown=""})(yr||(yr={}));function dA(e){if(!e)if(hn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),aA(e)}const pA=/^[^#]+#/;function uA(e,t){return e.replace(pA,"#")+t}function fA(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const Eo=()=>({left:window.pageXOffset,top:window.pageYOffset});function AA(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=fA(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function gl(e,t){return(history.state?history.state.position-t:-1)+e}const va=new Map;function yA(e,t){va.set(e,t)}function hA(e){const t=va.get(e);return va.delete(e),t}let mA=()=>location.protocol+"//"+location.host;function Us(e,t){const{pathname:n,search:r,hash:o}=t,s=e.indexOf("#");if(s>-1){let f=o.includes(e.slice(s))?e.slice(s).length:1,y=o.slice(f);return y[0]!=="/"&&(y="/"+y),ml(y,"")}return ml(n,e)+r+o}function bA(e,t,n,r){let o=[],s=[],d=null;const f=({state:A})=>{const C=Us(e,location),B=n.value,w=t.value;let R=0;if(A){if(n.value=C,t.value=A,d&&d===B){d=null;return}R=w?A.position-w.position:0}else r(C);o.forEach(I=>{I(n.value,B,{delta:R,type:kr.pop,direction:R?R>0?yr.forward:yr.back:yr.unknown})})};function y(){d=n.value}function m(A){o.push(A);const C=()=>{const B=o.indexOf(A);B>-1&&o.splice(B,1)};return s.push(C),C}function b(){const{history:A}=window;A.state&&A.replaceState(Se({},A.state,{scroll:Eo()}),"")}function v(){for(const A of s)A();s=[],window.removeEventListener("popstate",f),window.removeEventListener("beforeunload",b)}return window.addEventListener("popstate",f),window.addEventListener("beforeunload",b,{passive:!0}),{pauseListeners:y,listen:m,destroy:v}}function vl(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?Eo():null}}function gA(e){const{history:t,location:n}=window,r={value:Us(e,n)},o={value:t.state};o.value||s(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function s(y,m,b){const v=e.indexOf("#"),A=v>-1?(n.host&&document.querySelector("base")?e:e.slice(v))+y:mA()+e+y;try{t[b?"replaceState":"pushState"](m,"",A),o.value=m}catch(C){console.error(C),n[b?"replace":"assign"](A)}}function d(y,m){const b=Se({},t.state,vl(o.value.back,y,o.value.forward,!0),m,{position:o.value.position});s(y,b,!0),r.value=y}function f(y,m){const b=Se({},o.value,t.state,{forward:y,scroll:Eo()});s(b.current,b,!0);const v=Se({},vl(r.value,y,null),{position:b.position+1},m);s(y,v,!1),r.value=y}return{location:r,state:o,push:f,replace:d}}function vA(e){e=dA(e);const t=gA(e),n=bA(e,t.state,t.location,t.replace);function r(s,d=!0){d||n.pauseListeners(),history.go(s)}const o=Se({location:"",base:e,go:r,createHref:uA.bind(null,e)},t,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>t.state.value}),o}function xA(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),vA(e)}function EA(e){return typeof e=="string"||e&&typeof e=="object"}function Ws(e){return typeof e=="string"||typeof e=="symbol"}const Yt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Ys=Symbol("");var xl;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(xl||(xl={}));function Ln(e,t){return Se(new Error,{type:e,[Ys]:!0},t)}function Rt(e,t){return e instanceof Error&&Ys in e&&(t==null||!!(e.type&t))}const El="[^/]+?",kA={sensitive:!1,strict:!1,start:!0,end:!0},wA=/[.+*?^${}()[\]/\\]/g;function CA(e,t){const n=Se({},kA,t),r=[];let o=n.start?"^":"";const s=[];for(const m of e){const b=m.length?[]:[90];n.strict&&!m.length&&(o+="/");for(let v=0;v<m.length;v++){const A=m[v];let C=40+(n.sensitive?.25:0);if(A.type===0)v||(o+="/"),o+=A.value.replace(wA,"\\$&"),C+=40;else if(A.type===1){const{value:B,repeatable:w,optional:R,regexp:I}=A;s.push({name:B,repeatable:w,optional:R});const T=I||El;if(T!==El){C+=10;try{new RegExp(`(${T})`)}catch(D){throw new Error(`Invalid custom RegExp for param "${B}" (${T}): `+D.message)}}let U=w?`((?:${T})(?:/(?:${T}))*)`:`(${T})`;v||(U=R&&m.length<2?`(?:/${U})`:"/"+U),R&&(U+="?"),o+=U,C+=20,R&&(C+=-8),w&&(C+=-20),T===".*"&&(C+=-50)}b.push(C)}r.push(b)}if(n.strict&&n.end){const m=r.length-1;r[m][r[m].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const d=new RegExp(o,n.sensitive?"":"i");function f(m){const b=m.match(d),v={};if(!b)return null;for(let A=1;A<b.length;A++){const C=b[A]||"",B=s[A-1];v[B.name]=C&&B.repeatable?C.split("/"):C}return v}function y(m){let b="",v=!1;for(const A of e){(!v||!b.endsWith("/"))&&(b+="/"),v=!1;for(const C of A)if(C.type===0)b+=C.value;else if(C.type===1){const{value:B,repeatable:w,optional:R}=C,I=B in m?m[B]:"";if(xt(I)&&!w)throw new Error(`Provided param "${B}" is an array but it is not repeatable (* or + modifiers)`);const T=xt(I)?I.join("/"):I;if(!T)if(R)A.length<2&&(b.endsWith("/")?b=b.slice(0,-1):v=!0);else throw new Error(`Missing required param "${B}"`);b+=T}}return b||"/"}return{re:d,score:r,keys:s,parse:f,stringify:y}}function BA(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===40+40?-1:1:e.length>t.length?t.length===1&&t[0]===40+40?1:-1:0}function SA(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const s=BA(r[n],o[n]);if(s)return s;n++}if(Math.abs(o.length-r.length)===1){if(kl(r))return 1;if(kl(o))return-1}return o.length-r.length}function kl(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const LA={type:0,value:""},IA=/[a-zA-Z0-9_]/;function _A(e){if(!e)return[[]];if(e==="/")return[[LA]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(C){throw new Error(`ERR (${n})/"${m}": ${C}`)}let n=0,r=n;const o=[];let s;function d(){s&&o.push(s),s=[]}let f=0,y,m="",b="";function v(){m&&(n===0?s.push({type:0,value:m}):n===1||n===2||n===3?(s.length>1&&(y==="*"||y==="+")&&t(`A repeatable param (${m}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:m,regexp:b,repeatable:y==="*"||y==="+",optional:y==="*"||y==="?"})):t("Invalid state to consume buffer"),m="")}function A(){m+=y}for(;f<e.length;){if(y=e[f++],y==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:y==="/"?(m&&v(),d()):y===":"?(v(),n=1):A();break;case 4:A(),n=r;break;case 1:y==="("?n=2:IA.test(y)?A():(v(),n=0,y!=="*"&&y!=="?"&&y!=="+"&&f--);break;case 2:y===")"?b[b.length-1]=="\\"?b=b.slice(0,-1)+y:n=3:b+=y;break;case 3:v(),n=0,y!=="*"&&y!=="?"&&y!=="+"&&f--,b="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${m}"`),v(),d(),o}function TA(e,t,n){const r=CA(_A(e.path),n),o=Se(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function OA(e,t){const n=[],r=new Map;t=Bl({strict:!1,end:!0,sensitive:!1},t);function o(b){return r.get(b)}function s(b,v,A){const C=!A,B=RA(b);B.aliasOf=A&&A.record;const w=Bl(t,b),R=[B];if("alias"in b){const U=typeof b.alias=="string"?[b.alias]:b.alias;for(const D of U)R.push(Se({},B,{components:A?A.record.components:B.components,path:D,aliasOf:A?A.record:B}))}let I,T;for(const U of R){const{path:D}=U;if(v&&D[0]!=="/"){const Ae=v.record.path,ke=Ae[Ae.length-1]==="/"?"":"/";U.path=v.record.path+(D&&ke+D)}if(I=TA(U,v,w),A?A.alias.push(I):(T=T||I,T!==I&&T.alias.push(I),C&&b.name&&!Cl(I)&&d(b.name)),B.children){const Ae=B.children;for(let ke=0;ke<Ae.length;ke++)s(Ae[ke],I,A&&A.children[ke])}A=A||I,(I.record.components&&Object.keys(I.record.components).length||I.record.name||I.record.redirect)&&y(I)}return T?()=>{d(T)}:Ar}function d(b){if(Ws(b)){const v=r.get(b);v&&(r.delete(b),n.splice(n.indexOf(v),1),v.children.forEach(d),v.alias.forEach(d))}else{const v=n.indexOf(b);v>-1&&(n.splice(v,1),b.record.name&&r.delete(b.record.name),b.children.forEach(d),b.alias.forEach(d))}}function f(){return n}function y(b){let v=0;for(;v<n.length&&SA(b,n[v])>=0&&(b.record.path!==n[v].record.path||!Ks(b,n[v]));)v++;n.splice(v,0,b),b.record.name&&!Cl(b)&&r.set(b.record.name,b)}function m(b,v){let A,C={},B,w;if("name"in b&&b.name){if(A=r.get(b.name),!A)throw Ln(1,{location:b});w=A.record.name,C=Se(wl(v.params,A.keys.filter(T=>!T.optional).map(T=>T.name)),b.params&&wl(b.params,A.keys.map(T=>T.name))),B=A.stringify(C)}else if("path"in b)B=b.path,A=n.find(T=>T.re.test(B)),A&&(C=A.parse(B),w=A.record.name);else{if(A=v.name?r.get(v.name):n.find(T=>T.re.test(v.path)),!A)throw Ln(1,{location:b,currentLocation:v});w=A.record.name,C=Se({},v.params,b.params),B=A.stringify(C)}const R=[];let I=A;for(;I;)R.unshift(I.record),I=I.parent;return{name:w,path:B,params:C,matched:R,meta:jA(R)}}return e.forEach(b=>s(b)),{addRoute:s,resolve:m,removeRoute:d,getRoutes:f,getRecordMatcher:o}}function wl(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function RA(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:PA(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function PA(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function Cl(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function jA(e){return e.reduce((t,n)=>Se(t,n.meta),{})}function Bl(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function Ks(e,t){return t.children.some(n=>n===e||Ks(e,n))}const Vs=/#/g,zA=/&/g,MA=/\//g,DA=/=/g,FA=/\?/g,Qs=/\+/g,qA=/%5B/g,NA=/%5D/g,$s=/%5E/g,HA=/%60/g,Zs=/%7B/g,UA=/%7C/g,Js=/%7D/g,WA=/%20/g;function $a(e){return encodeURI(""+e).replace(UA,"|").replace(qA,"[").replace(NA,"]")}function YA(e){return $a(e).replace(Zs,"{").replace(Js,"}").replace($s,"^")}function xa(e){return $a(e).replace(Qs,"%2B").replace(WA,"+").replace(Vs,"%23").replace(zA,"%26").replace(HA,"`").replace(Zs,"{").replace(Js,"}").replace($s,"^")}function KA(e){return xa(e).replace(DA,"%3D")}function VA(e){return $a(e).replace(Vs,"%23").replace(FA,"%3F")}function QA(e){return e==null?"":VA(e).replace(MA,"%2F")}function oo(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function $A(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<r.length;++o){const s=r[o].replace(Qs," "),d=s.indexOf("="),f=oo(d<0?s:s.slice(0,d)),y=d<0?null:oo(s.slice(d+1));if(f in t){let m=t[f];xt(m)||(m=t[f]=[m]),m.push(y)}else t[f]=y}return t}function Sl(e){let t="";for(let n in e){const r=e[n];if(n=KA(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(xt(r)?r.map(s=>s&&xa(s)):[r&&xa(r)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+n,s!=null&&(t+="="+s))})}return t}function ZA(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=xt(r)?r.map(o=>o==null?null:""+o):r==null?r:""+r)}return t}const JA=Symbol(""),Ll=Symbol(""),ko=Symbol(""),Za=Symbol(""),Ea=Symbol("");function ir(){let e=[];function t(r){return e.push(r),()=>{const o=e.indexOf(r);o>-1&&e.splice(o,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function Qt(e,t,n,r,o){const s=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise((d,f)=>{const y=v=>{v===!1?f(Ln(4,{from:n,to:t})):v instanceof Error?f(v):EA(v)?f(Ln(2,{from:t,to:v})):(s&&r.enterCallbacks[o]===s&&typeof v=="function"&&s.push(v),d())},m=e.call(r&&r.instances[o],t,n,y);let b=Promise.resolve(m);e.length<3&&(b=b.then(y)),b.catch(v=>f(v))})}function ta(e,t,n,r){const o=[];for(const s of e)for(const d in s.components){let f=s.components[d];if(!(t!=="beforeRouteEnter"&&!s.instances[d]))if(XA(f)){const m=(f.__vccOpts||f)[t];m&&o.push(Qt(m,n,r,s,d))}else{let y=f();o.push(()=>y.then(m=>{if(!m)return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${s.path}"`));const b=rA(m)?m.default:m;s.components[d]=b;const A=(b.__vccOpts||b)[t];return A&&Qt(A,n,r,s,d)()}))}}return o}function XA(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function Il(e){const t=ut(ko),n=ut(Za),r=bt(()=>t.resolve(Ke(e.to))),o=bt(()=>{const{matched:y}=r.value,{length:m}=y,b=y[m-1],v=n.matched;if(!b||!v.length)return-1;const A=v.findIndex(Sn.bind(null,b));if(A>-1)return A;const C=_l(y[m-2]);return m>1&&_l(b)===C&&v[v.length-1].path!==C?v.findIndex(Sn.bind(null,y[m-2])):A}),s=bt(()=>o.value>-1&&ny(n.params,r.value.params)),d=bt(()=>o.value>-1&&o.value===n.matched.length-1&&Hs(n.params,r.value.params));function f(y={}){return ty(y)?t[Ke(e.replace)?"replace":"push"](Ke(e.to)).catch(Ar):Promise.resolve()}return{route:r,href:bt(()=>r.value.href),isActive:s,isExactActive:d,navigate:f}}const GA=Cs({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Il,setup(e,{slots:t}){const n=fo(Il(e)),{options:r}=ut(ko),o=bt(()=>({[Tl(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Tl(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const s=t.default&&t.default(n);return e.custom?s:Qa("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},s)}}}),ey=GA;function ty(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function ny(e,t){for(const n in t){const r=t[n],o=e[n];if(typeof r=="string"){if(r!==o)return!1}else if(!xt(o)||o.length!==r.length||r.some((s,d)=>s!==o[d]))return!1}return!0}function _l(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Tl=(e,t,n)=>e??t??n,ry=Cs({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=ut(Ea),o=bt(()=>e.route||r.value),s=ut(Ll,0),d=bt(()=>{let m=Ke(s);const{matched:b}=o.value;let v;for(;(v=b[m])&&!v.components;)m++;return m}),f=bt(()=>o.value.matched[d.value]);Wr(Ll,bt(()=>d.value+1)),Wr(JA,f),Wr(Ea,o);const y=Je();return kn(()=>[y.value,f.value,e.name],([m,b,v],[A,C,B])=>{b&&(b.instances[v]=m,C&&C!==b&&m&&m===A&&(b.leaveGuards.size||(b.leaveGuards=C.leaveGuards),b.updateGuards.size||(b.updateGuards=C.updateGuards))),m&&b&&(!C||!Sn(b,C)||!A)&&(b.enterCallbacks[v]||[]).forEach(w=>w(m))},{flush:"post"}),()=>{const m=o.value,b=e.name,v=f.value,A=v&&v.components[b];if(!A)return Ol(n.default,{Component:A,route:m});const C=v.props[b],B=C?C===!0?m.params:typeof C=="function"?C(m):C:null,R=Qa(A,Se({},B,t,{onVnodeUnmounted:I=>{I.component.isUnmounted&&(v.instances[b]=null)},ref:y}));return Ol(n.default,{Component:R,route:m})||R}}});function Ol(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const oy=ry;function ay(e){const t=OA(e.routes,e),n=e.parseQuery||$A,r=e.stringifyQuery||Sl,o=e.history,s=ir(),d=ir(),f=ir(),y=cu(Yt);let m=Yt;hn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const b=Go.bind(null,z=>""+z),v=Go.bind(null,QA),A=Go.bind(null,oo);function C(z,J){let Y,ae;return Ws(z)?(Y=t.getRecordMatcher(z),ae=J):ae=z,t.addRoute(ae,Y)}function B(z){const J=t.getRecordMatcher(z);J&&t.removeRoute(J)}function w(){return t.getRoutes().map(z=>z.record)}function R(z){return!!t.getRecordMatcher(z)}function I(z,J){if(J=Se({},J||y.value),typeof z=="string"){const S=ea(n,z,J.path),O=t.resolve({path:S.path},J),M=o.createHref(S.fullPath);return Se(S,O,{params:A(O.params),hash:oo(S.hash),redirectedFrom:void 0,href:M})}let Y;if("path"in z)Y=Se({},z,{path:ea(n,z.path,J.path).path});else{const S=Se({},z.params);for(const O in S)S[O]==null&&delete S[O];Y=Se({},z,{params:v(S)}),J.params=v(J.params)}const ae=t.resolve(Y,J),ve=z.hash||"";ae.params=b(A(ae.params));const E=iA(r,Se({},z,{hash:YA(ve),path:ae.path})),k=o.createHref(E);return Se({fullPath:E,hash:ve,query:r===Sl?ZA(z.query):z.query||{}},ae,{redirectedFrom:void 0,href:k})}function T(z){return typeof z=="string"?ea(n,z,y.value.path):Se({},z)}function U(z,J){if(m!==z)return Ln(8,{from:J,to:z})}function D(z){return Fe(z)}function Ae(z){return D(Se(T(z),{replace:!0}))}function ke(z){const J=z.matched[z.matched.length-1];if(J&&J.redirect){const{redirect:Y}=J;let ae=typeof Y=="function"?Y(z):Y;return typeof ae=="string"&&(ae=ae.includes("?")||ae.includes("#")?ae=T(ae):{path:ae},ae.params={}),Se({query:z.query,hash:z.hash,params:"path"in ae?{}:z.params},ae)}}function Fe(z,J){const Y=m=I(z),ae=y.value,ve=z.state,E=z.force,k=z.replace===!0,S=ke(Y);if(S)return Fe(Se(T(S),{state:typeof S=="object"?Se({},ve,S.state):ve,force:E,replace:k}),J||Y);const O=Y;O.redirectedFrom=J;let M;return!E&&lA(r,ae,Y)&&(M=Ln(16,{to:O,from:ae}),Me(ae,ae,!0,!1)),(M?Promise.resolve(M):se(O,ae)).catch(q=>Rt(q)?Rt(q,2)?q:Ue(q):re(q,O,ae)).then(q=>{if(q){if(Rt(q,2))return Fe(Se({replace:k},T(q.to),{state:typeof q.to=="object"?Se({},ve,q.to.state):ve,force:E}),J||O)}else q=te(O,ae,!0,k,ve);return Oe(O,ae,q),q})}function ue(z,J){const Y=U(z,J);return Y?Promise.reject(Y):Promise.resolve()}function Be(z){const J=Et.values().next().value;return J&&typeof J.runWithContext=="function"?J.runWithContext(z):z()}function se(z,J){let Y;const[ae,ve,E]=iy(z,J);Y=ta(ae.reverse(),"beforeRouteLeave",z,J);for(const S of ae)S.leaveGuards.forEach(O=>{Y.push(Qt(O,z,J))});const k=ue.bind(null,z,J);return Y.push(k),Te(Y).then(()=>{Y=[];for(const S of s.list())Y.push(Qt(S,z,J));return Y.push(k),Te(Y)}).then(()=>{Y=ta(ve,"beforeRouteUpdate",z,J);for(const S of ve)S.updateGuards.forEach(O=>{Y.push(Qt(O,z,J))});return Y.push(k),Te(Y)}).then(()=>{Y=[];for(const S of E)if(S.beforeEnter)if(xt(S.beforeEnter))for(const O of S.beforeEnter)Y.push(Qt(O,z,J));else Y.push(Qt(S.beforeEnter,z,J));return Y.push(k),Te(Y)}).then(()=>(z.matched.forEach(S=>S.enterCallbacks={}),Y=ta(E,"beforeRouteEnter",z,J),Y.push(k),Te(Y))).then(()=>{Y=[];for(const S of d.list())Y.push(Qt(S,z,J));return Y.push(k),Te(Y)}).catch(S=>Rt(S,8)?S:Promise.reject(S))}function Oe(z,J,Y){f.list().forEach(ae=>Be(()=>ae(z,J,Y)))}function te(z,J,Y,ae,ve){const E=U(z,J);if(E)return E;const k=J===Yt,S=hn?history.state:{};Y&&(ae||k?o.replace(z.fullPath,Se({scroll:k&&S&&S.scroll},ve)):o.push(z.fullPath,ve)),y.value=z,Me(z,J,Y,k),Ue()}let me;function Pe(){me||(me=o.listen((z,J,Y)=>{if(!Dt.listening)return;const ae=I(z),ve=ke(ae);if(ve){Fe(Se(ve,{replace:!0}),ae).catch(Ar);return}m=ae;const E=y.value;hn&&yA(gl(E.fullPath,Y.delta),Eo()),se(ae,E).catch(k=>Rt(k,12)?k:Rt(k,2)?(Fe(k.to,ae).then(S=>{Rt(S,20)&&!Y.delta&&Y.type===kr.pop&&o.go(-1,!1)}).catch(Ar),Promise.reject()):(Y.delta&&o.go(-Y.delta,!1),re(k,ae,E))).then(k=>{k=k||te(ae,E,!1),k&&(Y.delta&&!Rt(k,8)?o.go(-Y.delta,!1):Y.type===kr.pop&&Rt(k,20)&&o.go(-1,!1)),Oe(ae,E,k)}).catch(Ar)}))}let rt=ir(),_e=ir(),ee;function re(z,J,Y){Ue(z);const ae=_e.list();return ae.length?ae.forEach(ve=>ve(z,J,Y)):console.error(z),Promise.reject(z)}function $(){return ee&&y.value!==Yt?Promise.resolve():new Promise((z,J)=>{rt.add([z,J])})}function Ue(z){return ee||(ee=!z,Pe(),rt.list().forEach(([J,Y])=>z?Y(z):J()),rt.reset()),z}function Me(z,J,Y,ae){const{scrollBehavior:ve}=e;if(!hn||!ve)return Promise.resolve();const E=!Y&&hA(gl(z.fullPath,0))||(ae||!Y)&&history.state&&history.state.scroll||null;return Xr().then(()=>ve(z,J,E)).then(k=>k&&AA(k)).catch(k=>re(k,z,J))}const qe=z=>o.go(z);let _t;const Et=new Set,Dt={currentRoute:y,listening:!0,addRoute:C,removeRoute:B,hasRoute:R,getRoutes:w,resolve:I,options:e,push:D,replace:Ae,go:qe,back:()=>qe(-1),forward:()=>qe(1),beforeEach:s.add,beforeResolve:d.add,afterEach:f.add,onError:_e.add,isReady:$,install(z){const J=this;z.component("RouterLink",ey),z.component("RouterView",oy),z.config.globalProperties.$router=J,Object.defineProperty(z.config.globalProperties,"$route",{enumerable:!0,get:()=>Ke(y)}),hn&&!_t&&y.value===Yt&&(_t=!0,D(o.location).catch(ve=>{}));const Y={};for(const ve in Yt)Object.defineProperty(Y,ve,{get:()=>y.value[ve],enumerable:!0});z.provide(ko,J),z.provide(Za,ls(Y)),z.provide(Ea,y);const ae=z.unmount;Et.add(z),z.unmount=function(){Et.delete(z),Et.size<1&&(m=Yt,me&&me(),me=null,y.value=Yt,_t=!1,ee=!1),ae()}}};function Te(z){return z.reduce((J,Y)=>J.then(()=>Be(Y)),Promise.resolve())}return Dt}function iy(e,t){const n=[],r=[],o=[],s=Math.max(t.matched.length,e.matched.length);for(let d=0;d<s;d++){const f=t.matched[d];f&&(e.matched.find(m=>Sn(m,f))?r.push(f):n.push(f));const y=e.matched[d];y&&(t.matched.find(m=>Sn(m,y))||o.push(y))}return[n,r,o]}function ly(){return ut(ko)}function Ja(){return ut(Za)}var sy={size:"1em",strokeWidth:4,strokeLinecap:"round",strokeLinejoin:"round",rtl:!1,theme:"outline",colors:{outline:{fill:"#333",background:"transparent"},filled:{fill:"#333",background:"#FFF"},twoTone:{fill:"#333",twoTone:"#2F88FF"},multiColor:{outStrokeColor:"#333",outFillColor:"#2F88FF",innerStrokeColor:"#FFF",innerFillColor:"#43CCF8"}},prefix:"i"};function cy(){return"icon-"+((1+Math.random())*4294967296|0).toString(16).substring(1)}function dy(e,t,n){var r=typeof t.fill=="string"?[t.fill]:t.fill||[],o=[],s=t.theme||n.theme;switch(s){case"outline":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("none"),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("none");break;case"filled":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("#FFF"),o.push("#FFF");break;case"two-tone":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.twoTone.twoTone),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.twoTone.twoTone);break;case"multi-color":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.multiColor.outFillColor),o.push(typeof r[2]=="string"?r[2]:n.colors.multiColor.innerStrokeColor),o.push(typeof r[3]=="string"?r[3]:n.colors.multiColor.innerFillColor);break}return{size:t.size||n.size,strokeWidth:t.strokeWidth||n.strokeWidth,strokeLinecap:t.strokeLinecap||n.strokeLinecap,strokeLinejoin:t.strokeLinejoin||n.strokeLinejoin,colors:o,id:e}}var py=Symbol("icon-context");function st(e,t,n){var r={name:"icon-"+e,props:["size","strokeWidth","strokeLinecap","strokeLinejoin","theme","fill","spin"],setup:function(s){var d=cy(),f=ut(py,sy);return function(){var y=s.size,m=s.strokeWidth,b=s.strokeLinecap,v=s.strokeLinejoin,A=s.theme,C=s.fill,B=s.spin,w=dy(d,{size:y,strokeWidth:m,strokeLinecap:b,strokeLinejoin:v,theme:A,fill:C},f),R=[f.prefix+"-icon"];return R.push(f.prefix+"-icon-"+e),t&&f.rtl&&R.push(f.prefix+"-icon-rtl"),B&&R.push(f.prefix+"-icon-spin"),N("span",{class:R.join(" ")},[n(w)])}}};return r}const uy=st("adobe-photoshop",!0,function(e){return N("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[N("path",{d:"M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth},null),N("path",{d:"M14 15V33",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M16 25C19 25 23 24.2 23 20C23 15.8 19 15 16 15H14V25H16Z",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M34 21.0246C33 21.0246 28 20.5266 28 24.0123C28 27.4979 34 26.5021 34 29.9877C34 33.4734 28 32.9754 28 32.9754",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),fy=st("arrow-circle-left",!0,function(e){return N("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[N("path",{d:"M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M32.4917 24.5H14.4917",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M23.4917 15.5L14.4917 24.5L23.4917 33.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),Ay=st("arrow-circle-right",!0,function(e){return N("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[N("path",{d:"M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M14.4917 24.5H32.4917",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M23.4917 15.5L32.4917 24.5L23.4917 33.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),yy=st("audio-file",!0,function(e){return N("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[N("path",{d:"M8 44V4H31L40 14.5V44H8Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M32 14L26 16.9688V31.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("circle",{cx:"20.5",cy:"31.5",r:"5.5",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),hy=st("close",!1,function(e){return N("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[N("path",{d:"M8 8L40 40",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M8 40L40 8",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),my=st("file-code-one",!0,function(e){return N("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[N("path",{d:"M40 23V14L31 4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44H22",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M37 31L42 36L37 41",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M31 31L26 36L31 41",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M30 4V14H40",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),by=st("file-doc",!0,function(e){return N("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[N("path",{d:"M10 38V44H38V38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M38 20V14L30 4H10V20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M28 4V14H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M16 12H20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),N("rect",{x:"4",y:"20",width:"40",height:"18",rx:"2",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M10 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),N("path",{d:"M10 25H12C14.2091 25 16 26.7909 16 29V29C16 31.2091 14.2091 33 12 33H10",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("ellipse",{cx:"24",cy:"29",rx:"3",ry:"4",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M38 25H36C33.7909 25 32 26.7909 32 29V29C32 31.2091 33.7909 33 36 33H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),gy=st("file-excel",!0,function(e){return N("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[N("path",{d:"M10 4H30L40 14V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M29 18H19V34H29",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M29 26H19",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),vy=st("file-zip",!0,function(e){return N("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[N("path",{d:"M10 38V44H38V38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M38 20V14L30 4H10V20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M28 4V14H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M16 12H20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),N("rect",{x:"4",y:"20",width:"40",height:"18",rx:"2",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M11 25H17L11 33H17",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M24 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),N("path",{d:"M31 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),N("path",{d:"M31 25H34.5C35.8807 25 37 26.1193 37 27.5V27.5C37 28.8807 35.8807 30 34.5 30H31",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),xy=st("image-files",!0,function(e){return N("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[N("path",{d:"M10 44H38C39.1046 44 40 43.1046 40 42V14H30V4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M30 4L40 14",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("circle",{cx:"18",cy:"17",r:"4",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M15 28V37H33V21L23.4894 31.5L15 28Z",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),Ey=st("return",!0,function(e){return N("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[N("path",{d:"M12.9998 8L6 14L12.9998 21",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),ky=st("seo-folder",!0,function(e){return N("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[N("path",{d:"M5 8C5 6.89543 5.89543 6 7 6H19L24 12H41C42.1046 12 43 12.8954 43 14V40C43 41.1046 42.1046 42 41 42H7C5.89543 42 5 41.1046 5 40V8Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M14 22L19 27L14 32",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M26 32H34",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null)])}),wy=st("video-two",!0,function(e){return N("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[N("path",{d:"M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M20.5 28V21.9378L25.75 24.9689L31 28L25.75 31.0311L20.5 34.0622V28Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M6 15H42",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M33 6L27 15",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),N("path",{d:"M21 6L15 15",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])});const Cy={class:"box"},By={style:{"background-color":"#f6f6f6"}},Sy=["onClick"],Ly={class:"file-logo"},Iy={class:"file-text"},_y={key:0,class:"file-name",style:{display:"flex","text-align":"center"}},Ty={style:{flex:"1"}},Oy=["onClick"],Ry={style:{flex:"1"}},Py=["onClick"],jy={key:2,class:"file-name"},zy={key:0,style:{height:"6rem","text-align":"center","line-height":"6rem"}},My={__name:"InfoTable",props:{tableData:{type:Array,default:[]},tableHead:{type:Array,default:[]},showMax:{type:Number,default:99999}},emits:["clickFile","copyUrl","delFile"],setup(e,{emit:t}){const n=e,r=Je(!1),o=Je([]),s=[".MP4",".AVI",".MOV",".FLV",".MKV"],d=[".JPG",".JPEG",".PNG",".WEBP"],f=[".PSD"],y=[".RAR",".ZIP",".7Z"],m=[".WAV",".MP3",".OGG"],b=[".DOC",".DOCX"],v=[".XLS",".XLSX"];Rn(()=>{o.value=n.tableData.slice(0,n.showMax)});const A=w=>{t("clickFile",w)},C=w=>{t("copyUrl",w)},B=w=>{t("delFile",w)};return kn(()=>n.tableData,()=>{r.value=!1,n.tableData.length>n.showMax?o.value=n.tableData.slice(0,n.showMax):o.value=n.tableData}),(w,R)=>(xe(),Qe("div",Cy,[we("table",null,[we("tr",By,[(xe(!0),Qe(Xe,null,Vo(e.tableHead,I=>(xe(),Qe("th",{class:mr({bgRed:I.bgColor==="red",bgGreen:I.bgColor==="green",textRed:I.textColor==="red",textGreen:I.textColor==="green"}),style:po({width:I.width})},vn(I.span),7))),256))]),(xe(!0),Qe(Xe,null,Vo(o.value,(I,T)=>(xe(),Qe("tr",null,[(xe(!0),Qe(Xe,null,Vo(e.tableHead,U=>(xe(),Qe("td",{class:mr({textRed:U.textColor==="red",textGreen:U.textColor==="green"})},[U.prop==="name"?(xe(),Qe("div",{key:0,class:"file-name",onClick:D=>A(T)},[we("div",Ly,[s.includes(I.suffix.toUpperCase())?(xe(),at(Ke(wy),{key:0,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):d.includes(I.suffix.toUpperCase())?(xe(),at(Ke(xy),{key:1,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):y.includes(I.suffix.toUpperCase())?(xe(),at(Ke(vy),{key:2,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):m.includes(I.suffix.toUpperCase())?(xe(),at(Ke(yy),{key:3,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):b.includes(I.suffix.toUpperCase())?(xe(),at(Ke(by),{key:4,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):v.includes(I.suffix.toUpperCase())?(xe(),at(Ke(gy),{key:5,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):f.includes(I.suffix.toUpperCase())?(xe(),at(Ke(uy),{key:6,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):I.suffix===""?(xe(),at(Ke(ky),{key:7,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):(xe(),at(Ke(my),{key:8,theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2}))]),we("div",Iy,vn(I[U.prop]),1)],8,Sy)):U.prop==="cz"?(xe(),Qe(Xe,{key:1},[I.isFile?(xe(),Qe("div",_y,[we("div",Ty,[we("button",{onClick:D=>C(T)},"分享",8,Oy)]),we("div",Ry,[we("button",{onClick:D=>B(T)},"删除",8,Py)])])):wn("",!0)],64)):(xe(),Qe("div",jy,vn(I[U.prop]),1))],2))),256))]))),256))]),e.tableData.length===0?(xe(),Qe("div",zy," 当前数据为空 ")):wn("",!0)]))}},Dy=xo(My,[["__scopeId","data-v-d21baaa9"]]);function Xs(e,t){return function(){return e.apply(t,arguments)}}const{toString:Fy}=Object.prototype,{getPrototypeOf:Xa}=Object,wo=(e=>t=>{const n=Fy.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),It=e=>(e=e.toLowerCase(),t=>wo(t)===e),Co=e=>t=>typeof t===e,{isArray:Pn}=Array,wr=Co("undefined");function qy(e){return e!==null&&!wr(e)&&e.constructor!==null&&!wr(e.constructor)&&At(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Gs=It("ArrayBuffer");function Ny(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Gs(e.buffer),t}const Hy=Co("string"),At=Co("function"),ec=Co("number"),Bo=e=>e!==null&&typeof e=="object",Uy=e=>e===!0||e===!1,Kr=e=>{if(wo(e)!=="object")return!1;const t=Xa(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},Wy=It("Date"),Yy=It("File"),Ky=It("Blob"),Vy=It("FileList"),Qy=e=>Bo(e)&&At(e.pipe),$y=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||At(e.append)&&((t=wo(e))==="formdata"||t==="object"&&At(e.toString)&&e.toString()==="[object FormData]"))},Zy=It("URLSearchParams"),Jy=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Cr(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,o;if(typeof e!="object"&&(e=[e]),Pn(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{const s=n?Object.getOwnPropertyNames(e):Object.keys(e),d=s.length;let f;for(r=0;r<d;r++)f=s[r],t.call(null,e[f],f,e)}}function tc(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,o;for(;r-- >0;)if(o=n[r],t===o.toLowerCase())return o;return null}const nc=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),rc=e=>!wr(e)&&e!==nc;function ka(){const{caseless:e}=rc(this)&&this||{},t={},n=(r,o)=>{const s=e&&tc(t,o)||o;Kr(t[s])&&Kr(r)?t[s]=ka(t[s],r):Kr(r)?t[s]=ka({},r):Pn(r)?t[s]=r.slice():t[s]=r};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&Cr(arguments[r],n);return t}const Xy=(e,t,n,{allOwnKeys:r}={})=>(Cr(t,(o,s)=>{n&&At(o)?e[s]=Xs(o,n):e[s]=o},{allOwnKeys:r}),e),Gy=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),eh=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},th=(e,t,n,r)=>{let o,s,d;const f={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),s=o.length;s-- >0;)d=o[s],(!r||r(d,e,t))&&!f[d]&&(t[d]=e[d],f[d]=!0);e=n!==!1&&Xa(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},nh=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},rh=e=>{if(!e)return null;if(Pn(e))return e;let t=e.length;if(!ec(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},oh=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Xa(Uint8Array)),ah=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let o;for(;(o=r.next())&&!o.done;){const s=o.value;t.call(e,s[0],s[1])}},ih=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},lh=It("HTMLFormElement"),sh=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,o){return r.toUpperCase()+o}),Rl=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),ch=It("RegExp"),oc=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};Cr(n,(o,s)=>{t(o,s,e)!==!1&&(r[s]=o)}),Object.defineProperties(e,r)},dh=e=>{oc(e,(t,n)=>{if(At(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(At(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},ph=(e,t)=>{const n={},r=o=>{o.forEach(s=>{n[s]=!0})};return Pn(e)?r(e):r(String(e).split(t)),n},uh=()=>{},fh=(e,t)=>(e=+e,Number.isFinite(e)?e:t),na="abcdefghijklmnopqrstuvwxyz",Pl="0123456789",ac={DIGIT:Pl,ALPHA:na,ALPHA_DIGIT:na+na.toUpperCase()+Pl},Ah=(e=16,t=ac.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n};function yh(e){return!!(e&&At(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const hh=e=>{const t=new Array(10),n=(r,o)=>{if(Bo(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[o]=r;const s=Pn(r)?[]:{};return Cr(r,(d,f)=>{const y=n(d,o+1);!wr(y)&&(s[f]=y)}),t[o]=void 0,s}}return r};return n(e,0)},mh=It("AsyncFunction"),bh=e=>e&&(Bo(e)||At(e))&&At(e.then)&&At(e.catch),j={isArray:Pn,isArrayBuffer:Gs,isBuffer:qy,isFormData:$y,isArrayBufferView:Ny,isString:Hy,isNumber:ec,isBoolean:Uy,isObject:Bo,isPlainObject:Kr,isUndefined:wr,isDate:Wy,isFile:Yy,isBlob:Ky,isRegExp:ch,isFunction:At,isStream:Qy,isURLSearchParams:Zy,isTypedArray:oh,isFileList:Vy,forEach:Cr,merge:ka,extend:Xy,trim:Jy,stripBOM:Gy,inherits:eh,toFlatObject:th,kindOf:wo,kindOfTest:It,endsWith:nh,toArray:rh,forEachEntry:ah,matchAll:ih,isHTMLForm:lh,hasOwnProperty:Rl,hasOwnProp:Rl,reduceDescriptors:oc,freezeMethods:dh,toObjectSet:ph,toCamelCase:sh,noop:uh,toFiniteNumber:fh,findKey:tc,global:nc,isContextDefined:rc,ALPHABET:ac,generateString:Ah,isSpecCompliantForm:yh,toJSONObject:hh,isAsyncFn:mh,isThenable:bh};function ge(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o)}j.inherits(ge,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:j.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const ic=ge.prototype,lc={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{lc[e]={value:e}});Object.defineProperties(ge,lc);Object.defineProperty(ic,"isAxiosError",{value:!0});ge.from=(e,t,n,r,o,s)=>{const d=Object.create(ic);return j.toFlatObject(e,d,function(y){return y!==Error.prototype},f=>f!=="isAxiosError"),ge.call(d,e.message,t,n,r,o),d.cause=e,d.name=e.name,s&&Object.assign(d,s),d};const gh=null;function wa(e){return j.isPlainObject(e)||j.isArray(e)}function sc(e){return j.endsWith(e,"[]")?e.slice(0,-2):e}function jl(e,t,n){return e?e.concat(t).map(function(o,s){return o=sc(o),!n&&s?"["+o+"]":o}).join(n?".":""):t}function vh(e){return j.isArray(e)&&!e.some(wa)}const xh=j.toFlatObject(j,{},null,function(t){return/^is[A-Z]/.test(t)});function So(e,t,n){if(!j.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=j.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(w,R){return!j.isUndefined(R[w])});const r=n.metaTokens,o=n.visitor||b,s=n.dots,d=n.indexes,y=(n.Blob||typeof Blob<"u"&&Blob)&&j.isSpecCompliantForm(t);if(!j.isFunction(o))throw new TypeError("visitor must be a function");function m(B){if(B===null)return"";if(j.isDate(B))return B.toISOString();if(!y&&j.isBlob(B))throw new ge("Blob is not supported. Use a Buffer instead.");return j.isArrayBuffer(B)||j.isTypedArray(B)?y&&typeof Blob=="function"?new Blob([B]):Buffer.from(B):B}function b(B,w,R){let I=B;if(B&&!R&&typeof B=="object"){if(j.endsWith(w,"{}"))w=r?w:w.slice(0,-2),B=JSON.stringify(B);else if(j.isArray(B)&&vh(B)||(j.isFileList(B)||j.endsWith(w,"[]"))&&(I=j.toArray(B)))return w=sc(w),I.forEach(function(U,D){!(j.isUndefined(U)||U===null)&&t.append(d===!0?jl([w],D,s):d===null?w:w+"[]",m(U))}),!1}return wa(B)?!0:(t.append(jl(R,w,s),m(B)),!1)}const v=[],A=Object.assign(xh,{defaultVisitor:b,convertValue:m,isVisitable:wa});function C(B,w){if(!j.isUndefined(B)){if(v.indexOf(B)!==-1)throw Error("Circular reference detected in "+w.join("."));v.push(B),j.forEach(B,function(I,T){(!(j.isUndefined(I)||I===null)&&o.call(t,I,j.isString(T)?T.trim():T,w,A))===!0&&C(I,w?w.concat(T):[T])}),v.pop()}}if(!j.isObject(e))throw new TypeError("data must be an object");return C(e),t}function zl(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function Ga(e,t){this._pairs=[],e&&So(e,this,t)}const cc=Ga.prototype;cc.append=function(t,n){this._pairs.push([t,n])};cc.toString=function(t){const n=t?function(r){return t.call(this,r,zl)}:zl;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};function Eh(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function dc(e,t,n){if(!t)return e;const r=n&&n.encode||Eh,o=n&&n.serialize;let s;if(o?s=o(t,n):s=j.isURLSearchParams(t)?t.toString():new Ga(t,n).toString(r),s){const d=e.indexOf("#");d!==-1&&(e=e.slice(0,d)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class kh{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){j.forEach(this.handlers,function(r){r!==null&&t(r)})}}const Ml=kh,pc={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},wh=typeof URLSearchParams<"u"?URLSearchParams:Ga,Ch=typeof FormData<"u"?FormData:null,Bh=typeof Blob<"u"?Blob:null,Sh=(()=>{let e;return typeof navigator<"u"&&((e=navigator.product)==="ReactNative"||e==="NativeScript"||e==="NS")?!1:typeof window<"u"&&typeof document<"u"})(),Lh=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),St={isBrowser:!0,classes:{URLSearchParams:wh,FormData:Ch,Blob:Bh},isStandardBrowserEnv:Sh,isStandardBrowserWebWorkerEnv:Lh,protocols:["http","https","file","blob","url","data"]};function Ih(e,t){return So(e,new St.classes.URLSearchParams,Object.assign({visitor:function(n,r,o,s){return St.isNode&&j.isBuffer(n)?(this.append(r,n.toString("base64")),!1):s.defaultVisitor.apply(this,arguments)}},t))}function _h(e){return j.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Th(e){const t={},n=Object.keys(e);let r;const o=n.length;let s;for(r=0;r<o;r++)s=n[r],t[s]=e[s];return t}function uc(e){function t(n,r,o,s){let d=n[s++];const f=Number.isFinite(+d),y=s>=n.length;return d=!d&&j.isArray(o)?o.length:d,y?(j.hasOwnProp(o,d)?o[d]=[o[d],r]:o[d]=r,!f):((!o[d]||!j.isObject(o[d]))&&(o[d]=[]),t(n,r,o[d],s)&&j.isArray(o[d])&&(o[d]=Th(o[d])),!f)}if(j.isFormData(e)&&j.isFunction(e.entries)){const n={};return j.forEachEntry(e,(r,o)=>{t(_h(r),o,n,0)}),n}return null}const Oh={"Content-Type":void 0};function Rh(e,t,n){if(j.isString(e))try{return(t||JSON.parse)(e),j.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const Lo={transitional:pc,adapter:["xhr","http"],transformRequest:[function(t,n){const r=n.getContentType()||"",o=r.indexOf("application/json")>-1,s=j.isObject(t);if(s&&j.isHTMLForm(t)&&(t=new FormData(t)),j.isFormData(t))return o&&o?JSON.stringify(uc(t)):t;if(j.isArrayBuffer(t)||j.isBuffer(t)||j.isStream(t)||j.isFile(t)||j.isBlob(t))return t;if(j.isArrayBufferView(t))return t.buffer;if(j.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let f;if(s){if(r.indexOf("application/x-www-form-urlencoded")>-1)return Ih(t,this.formSerializer).toString();if((f=j.isFileList(t))||r.indexOf("multipart/form-data")>-1){const y=this.env&&this.env.FormData;return So(f?{"files[]":t}:t,y&&new y,this.formSerializer)}}return s||o?(n.setContentType("application/json",!1),Rh(t)):t}],transformResponse:[function(t){const n=this.transitional||Lo.transitional,r=n&&n.forcedJSONParsing,o=this.responseType==="json";if(t&&j.isString(t)&&(r&&!this.responseType||o)){const d=!(n&&n.silentJSONParsing)&&o;try{return JSON.parse(t)}catch(f){if(d)throw f.name==="SyntaxError"?ge.from(f,ge.ERR_BAD_RESPONSE,this,null,this.response):f}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:St.classes.FormData,Blob:St.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};j.forEach(["delete","get","head"],function(t){Lo.headers[t]={}});j.forEach(["post","put","patch"],function(t){Lo.headers[t]=j.merge(Oh)});const ei=Lo,Ph=j.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),jh=e=>{const t={};let n,r,o;return e&&e.split(`
`).forEach(function(d){o=d.indexOf(":"),n=d.substring(0,o).trim().toLowerCase(),r=d.substring(o+1).trim(),!(!n||t[n]&&Ph[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},Dl=Symbol("internals");function lr(e){return e&&String(e).trim().toLowerCase()}function Vr(e){return e===!1||e==null?e:j.isArray(e)?e.map(Vr):String(e)}function zh(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Mh=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function ra(e,t,n,r,o){if(j.isFunction(r))return r.call(this,t,n);if(o&&(t=n),!!j.isString(t)){if(j.isString(r))return t.indexOf(r)!==-1;if(j.isRegExp(r))return r.test(t)}}function Dh(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function Fh(e,t){const n=j.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(o,s,d){return this[r].call(this,t,o,s,d)},configurable:!0})})}class Io{constructor(t){t&&this.set(t)}set(t,n,r){const o=this;function s(f,y,m){const b=lr(y);if(!b)throw new Error("header name must be a non-empty string");const v=j.findKey(o,b);(!v||o[v]===void 0||m===!0||m===void 0&&o[v]!==!1)&&(o[v||y]=Vr(f))}const d=(f,y)=>j.forEach(f,(m,b)=>s(m,b,y));return j.isPlainObject(t)||t instanceof this.constructor?d(t,n):j.isString(t)&&(t=t.trim())&&!Mh(t)?d(jh(t),n):t!=null&&s(n,t,r),this}get(t,n){if(t=lr(t),t){const r=j.findKey(this,t);if(r){const o=this[r];if(!n)return o;if(n===!0)return zh(o);if(j.isFunction(n))return n.call(this,o,r);if(j.isRegExp(n))return n.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=lr(t),t){const r=j.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||ra(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let o=!1;function s(d){if(d=lr(d),d){const f=j.findKey(r,d);f&&(!n||ra(r,r[f],f,n))&&(delete r[f],o=!0)}}return j.isArray(t)?t.forEach(s):s(t),o}clear(t){const n=Object.keys(this);let r=n.length,o=!1;for(;r--;){const s=n[r];(!t||ra(this,this[s],s,t,!0))&&(delete this[s],o=!0)}return o}normalize(t){const n=this,r={};return j.forEach(this,(o,s)=>{const d=j.findKey(r,s);if(d){n[d]=Vr(o),delete n[s];return}const f=t?Dh(s):String(s).trim();f!==s&&delete n[s],n[f]=Vr(o),r[f]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return j.forEach(this,(r,o)=>{r!=null&&r!==!1&&(n[o]=t&&j.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(o=>r.set(o)),r}static accessor(t){const r=(this[Dl]=this[Dl]={accessors:{}}).accessors,o=this.prototype;function s(d){const f=lr(d);r[f]||(Fh(o,d),r[f]=!0)}return j.isArray(t)?t.forEach(s):s(t),this}}Io.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);j.freezeMethods(Io.prototype);j.freezeMethods(Io);const jt=Io;function oa(e,t){const n=this||ei,r=t||n,o=jt.from(r.headers);let s=r.data;return j.forEach(e,function(f){s=f.call(n,s,o.normalize(),t?t.status:void 0)}),o.normalize(),s}function fc(e){return!!(e&&e.__CANCEL__)}function Br(e,t,n){ge.call(this,e??"canceled",ge.ERR_CANCELED,t,n),this.name="CanceledError"}j.inherits(Br,ge,{__CANCEL__:!0});function qh(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new ge("Request failed with status code "+n.status,[ge.ERR_BAD_REQUEST,ge.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const Nh=St.isStandardBrowserEnv?function(){return{write:function(n,r,o,s,d,f){const y=[];y.push(n+"="+encodeURIComponent(r)),j.isNumber(o)&&y.push("expires="+new Date(o).toGMTString()),j.isString(s)&&y.push("path="+s),j.isString(d)&&y.push("domain="+d),f===!0&&y.push("secure"),document.cookie=y.join("; ")},read:function(n){const r=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return r?decodeURIComponent(r[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}();function Hh(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Uh(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function Ac(e,t){return e&&!Hh(t)?Uh(e,t):t}const Wh=St.isStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function o(s){let d=s;return t&&(n.setAttribute("href",d),d=n.href),n.setAttribute("href",d),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=o(window.location.href),function(d){const f=j.isString(d)?o(d):d;return f.protocol===r.protocol&&f.host===r.host}}():function(){return function(){return!0}}();function Yh(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Kh(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o=0,s=0,d;return t=t!==void 0?t:1e3,function(y){const m=Date.now(),b=r[s];d||(d=m),n[o]=y,r[o]=m;let v=s,A=0;for(;v!==o;)A+=n[v++],v=v%e;if(o=(o+1)%e,o===s&&(s=(s+1)%e),m-d<t)return;const C=b&&m-b;return C?Math.round(A*1e3/C):void 0}}function Fl(e,t){let n=0;const r=Kh(50,250);return o=>{const s=o.loaded,d=o.lengthComputable?o.total:void 0,f=s-n,y=r(f),m=s<=d;n=s;const b={loaded:s,total:d,progress:d?s/d:void 0,bytes:f,rate:y||void 0,estimated:y&&d&&m?(d-s)/y:void 0,event:o};b[t?"download":"upload"]=!0,e(b)}}const Vh=typeof XMLHttpRequest<"u",Qh=Vh&&function(e){return new Promise(function(n,r){let o=e.data;const s=jt.from(e.headers).normalize(),d=e.responseType;let f;function y(){e.cancelToken&&e.cancelToken.unsubscribe(f),e.signal&&e.signal.removeEventListener("abort",f)}j.isFormData(o)&&(St.isStandardBrowserEnv||St.isStandardBrowserWebWorkerEnv?s.setContentType(!1):s.setContentType("multipart/form-data;",!1));let m=new XMLHttpRequest;if(e.auth){const C=e.auth.username||"",B=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";s.set("Authorization","Basic "+btoa(C+":"+B))}const b=Ac(e.baseURL,e.url);m.open(e.method.toUpperCase(),dc(b,e.params,e.paramsSerializer),!0),m.timeout=e.timeout;function v(){if(!m)return;const C=jt.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders()),w={data:!d||d==="text"||d==="json"?m.responseText:m.response,status:m.status,statusText:m.statusText,headers:C,config:e,request:m};qh(function(I){n(I),y()},function(I){r(I),y()},w),m=null}if("onloadend"in m?m.onloadend=v:m.onreadystatechange=function(){!m||m.readyState!==4||m.status===0&&!(m.responseURL&&m.responseURL.indexOf("file:")===0)||setTimeout(v)},m.onabort=function(){m&&(r(new ge("Request aborted",ge.ECONNABORTED,e,m)),m=null)},m.onerror=function(){r(new ge("Network Error",ge.ERR_NETWORK,e,m)),m=null},m.ontimeout=function(){let B=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const w=e.transitional||pc;e.timeoutErrorMessage&&(B=e.timeoutErrorMessage),r(new ge(B,w.clarifyTimeoutError?ge.ETIMEDOUT:ge.ECONNABORTED,e,m)),m=null},St.isStandardBrowserEnv){const C=(e.withCredentials||Wh(b))&&e.xsrfCookieName&&Nh.read(e.xsrfCookieName);C&&s.set(e.xsrfHeaderName,C)}o===void 0&&s.setContentType(null),"setRequestHeader"in m&&j.forEach(s.toJSON(),function(B,w){m.setRequestHeader(w,B)}),j.isUndefined(e.withCredentials)||(m.withCredentials=!!e.withCredentials),d&&d!=="json"&&(m.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&m.addEventListener("progress",Fl(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&m.upload&&m.upload.addEventListener("progress",Fl(e.onUploadProgress)),(e.cancelToken||e.signal)&&(f=C=>{m&&(r(!C||C.type?new Br(null,e,m):C),m.abort(),m=null)},e.cancelToken&&e.cancelToken.subscribe(f),e.signal&&(e.signal.aborted?f():e.signal.addEventListener("abort",f)));const A=Yh(b);if(A&&St.protocols.indexOf(A)===-1){r(new ge("Unsupported protocol "+A+":",ge.ERR_BAD_REQUEST,e));return}m.send(o||null)})},Qr={http:gh,xhr:Qh};j.forEach(Qr,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const $h={getAdapter:e=>{e=j.isArray(e)?e:[e];const{length:t}=e;let n,r;for(let o=0;o<t&&(n=e[o],!(r=j.isString(n)?Qr[n.toLowerCase()]:n));o++);if(!r)throw r===!1?new ge(`Adapter ${n} is not supported by the environment`,"ERR_NOT_SUPPORT"):new Error(j.hasOwnProp(Qr,n)?`Adapter '${n}' is not available in the build`:`Unknown adapter '${n}'`);if(!j.isFunction(r))throw new TypeError("adapter is not a function");return r},adapters:Qr};function aa(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Br(null,e)}function ql(e){return aa(e),e.headers=jt.from(e.headers),e.data=oa.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),$h.getAdapter(e.adapter||ei.adapter)(e).then(function(r){return aa(e),r.data=oa.call(e,e.transformResponse,r),r.headers=jt.from(r.headers),r},function(r){return fc(r)||(aa(e),r&&r.response&&(r.response.data=oa.call(e,e.transformResponse,r.response),r.response.headers=jt.from(r.response.headers))),Promise.reject(r)})}const Nl=e=>e instanceof jt?e.toJSON():e;function In(e,t){t=t||{};const n={};function r(m,b,v){return j.isPlainObject(m)&&j.isPlainObject(b)?j.merge.call({caseless:v},m,b):j.isPlainObject(b)?j.merge({},b):j.isArray(b)?b.slice():b}function o(m,b,v){if(j.isUndefined(b)){if(!j.isUndefined(m))return r(void 0,m,v)}else return r(m,b,v)}function s(m,b){if(!j.isUndefined(b))return r(void 0,b)}function d(m,b){if(j.isUndefined(b)){if(!j.isUndefined(m))return r(void 0,m)}else return r(void 0,b)}function f(m,b,v){if(v in t)return r(m,b);if(v in e)return r(void 0,m)}const y={url:s,method:s,data:s,baseURL:d,transformRequest:d,transformResponse:d,paramsSerializer:d,timeout:d,timeoutMessage:d,withCredentials:d,adapter:d,responseType:d,xsrfCookieName:d,xsrfHeaderName:d,onUploadProgress:d,onDownloadProgress:d,decompress:d,maxContentLength:d,maxBodyLength:d,beforeRedirect:d,transport:d,httpAgent:d,httpsAgent:d,cancelToken:d,socketPath:d,responseEncoding:d,validateStatus:f,headers:(m,b)=>o(Nl(m),Nl(b),!0)};return j.forEach(Object.keys(Object.assign({},e,t)),function(b){const v=y[b]||o,A=v(e[b],t[b],b);j.isUndefined(A)&&v!==f||(n[b]=A)}),n}const yc="1.4.0",ti={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{ti[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const Hl={};ti.transitional=function(t,n,r){function o(s,d){return"[Axios v"+yc+"] Transitional option '"+s+"'"+d+(r?". "+r:"")}return(s,d,f)=>{if(t===!1)throw new ge(o(d," has been removed"+(n?" in "+n:"")),ge.ERR_DEPRECATED);return n&&!Hl[d]&&(Hl[d]=!0,console.warn(o(d," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(s,d,f):!0}};function Zh(e,t,n){if(typeof e!="object")throw new ge("options must be an object",ge.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const s=r[o],d=t[s];if(d){const f=e[s],y=f===void 0||d(f,s,e);if(y!==!0)throw new ge("option "+s+" must be "+y,ge.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new ge("Unknown option "+s,ge.ERR_BAD_OPTION)}}const Ca={assertOptions:Zh,validators:ti},Kt=Ca.validators;class ao{constructor(t){this.defaults=t,this.interceptors={request:new Ml,response:new Ml}}request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=In(this.defaults,n);const{transitional:r,paramsSerializer:o,headers:s}=n;r!==void 0&&Ca.assertOptions(r,{silentJSONParsing:Kt.transitional(Kt.boolean),forcedJSONParsing:Kt.transitional(Kt.boolean),clarifyTimeoutError:Kt.transitional(Kt.boolean)},!1),o!=null&&(j.isFunction(o)?n.paramsSerializer={serialize:o}:Ca.assertOptions(o,{encode:Kt.function,serialize:Kt.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let d;d=s&&j.merge(s.common,s[n.method]),d&&j.forEach(["delete","get","head","post","put","patch","common"],B=>{delete s[B]}),n.headers=jt.concat(d,s);const f=[];let y=!0;this.interceptors.request.forEach(function(w){typeof w.runWhen=="function"&&w.runWhen(n)===!1||(y=y&&w.synchronous,f.unshift(w.fulfilled,w.rejected))});const m=[];this.interceptors.response.forEach(function(w){m.push(w.fulfilled,w.rejected)});let b,v=0,A;if(!y){const B=[ql.bind(this),void 0];for(B.unshift.apply(B,f),B.push.apply(B,m),A=B.length,b=Promise.resolve(n);v<A;)b=b.then(B[v++],B[v++]);return b}A=f.length;let C=n;for(v=0;v<A;){const B=f[v++],w=f[v++];try{C=B(C)}catch(R){w.call(this,R);break}}try{b=ql.call(this,C)}catch(B){return Promise.reject(B)}for(v=0,A=m.length;v<A;)b=b.then(m[v++],m[v++]);return b}getUri(t){t=In(this.defaults,t);const n=Ac(t.baseURL,t.url);return dc(n,t.params,t.paramsSerializer)}}j.forEach(["delete","get","head","options"],function(t){ao.prototype[t]=function(n,r){return this.request(In(r||{},{method:t,url:n,data:(r||{}).data}))}});j.forEach(["post","put","patch"],function(t){function n(r){return function(s,d,f){return this.request(In(f||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:s,data:d}))}}ao.prototype[t]=n(),ao.prototype[t+"Form"]=n(!0)});const $r=ao;class ni{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(s){n=s});const r=this;this.promise.then(o=>{if(!r._listeners)return;let s=r._listeners.length;for(;s-- >0;)r._listeners[s](o);r._listeners=null}),this.promise.then=o=>{let s;const d=new Promise(f=>{r.subscribe(f),s=f}).then(o);return d.cancel=function(){r.unsubscribe(s)},d},t(function(s,d,f){r.reason||(r.reason=new Br(s,d,f),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}static source(){let t;return{token:new ni(function(o){t=o}),cancel:t}}}const Jh=ni;function Xh(e){return function(n){return e.apply(null,n)}}function Gh(e){return j.isObject(e)&&e.isAxiosError===!0}const Ba={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Ba).forEach(([e,t])=>{Ba[t]=e});const em=Ba;function hc(e){const t=new $r(e),n=Xs($r.prototype.request,t);return j.extend(n,$r.prototype,t,{allOwnKeys:!0}),j.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return hc(In(e,o))},n}const Ve=hc(ei);Ve.Axios=$r;Ve.CanceledError=Br;Ve.CancelToken=Jh;Ve.isCancel=fc;Ve.VERSION=yc;Ve.toFormData=So;Ve.AxiosError=ge;Ve.Cancel=Ve.CanceledError;Ve.all=function(t){return Promise.all(t)};Ve.spread=Xh;Ve.isAxiosError=Gh;Ve.mergeConfig=In;Ve.AxiosHeaders=jt;Ve.formToJSON=e=>uc(j.isHTMLForm(e)?new FormData(e):e);Ve.HttpStatusCode=em;Ve.default=Ve;const Ul=Ve;const tm={class:"box"},nm={class:"main"},rm={class:"title"},om={class:"body"},am={class:"footer"},im={__name:"Dialog",props:{title:{type:String,default:"标题"},btnNum:{type:Number,default:1},okBtnText:{type:String,default:"确定"}},emits:["okBtn","closeBtn"],setup(e,{emit:t}){const n=e,r=()=>{t("okBtn")},o=()=>{t("closeBtn")};return(s,d)=>(xe(),Qe("div",tm,[we("div",nm,[we("div",rm,[we("span",null,vn(n.title),1)]),we("div",om,[Yu(s.$slots,"body",{},void 0,!0)]),we("div",am,[n.btnNum>1?(xe(),Qe("div",{key:0,class:"close-btn",onClick:o},"关闭")):wn("",!0),we("div",{class:"ok-btn",onClick:r},vn(n.okBtnText),1)])])]))}},Wl=xo(im,[["__scopeId","data-v-ee082e04"]]);const lm=e=>(vu("data-v-b9e156fd"),e=e(),xu(),e),sm={class:"ret"},cm={class:"top-title"},dm={style:{height:"100%","padding-top":"30px"}},pm={key:0,class:"imgBox"},um={class:"img"},fm=["src"],Am={class:"play-list"},ym=lm(()=>we("div",{style:{"padding-top":"20px","padding-bottom":"20px"}}," 是否删除文件 ",-1)),Hr="http://localhost:3000",hm={__name:"main",setup(e){const t=Je(!1),n=Je(!1),r=ly();Ja();const o=Je("$"),s=Je([]),d=Je([{span:"文件名",prop:"name",textColor:"",bgColor:""},{span:"大小",prop:"size",textColor:"red",bgColor:"red"},{span:"操作",prop:"cz",width:"80px",textColor:"green",bgColor:"green"}]),f=()=>{o.value=o.value.slice(0,o.value.lastIndexOf("__")===-1?o.value.length:o.value.lastIndexOf("__")),Pe()},y=Je([]),m=Je(""),b=Je(0),v=Je(0),A=Je(!1),C=()=>{b.value++,b.value=b.value%y.value.length,m.value=y.value[b.value],console.log(b.value)},B=()=>{b.value--,b.value<0&&(b.value=y.value.length-1),b.value=b.value%y.value.length,m.value=y.value[b.value]},w=()=>{A.value=!0,m.value=y.value[b.value],console.log(y.value)},R=()=>{A.value=!1},I=(ee,re)=>(ee==="$"?ee="":ee=ee.replace(/\$/g,""),ee=ee.replace(/__/g,"/"),console.log(`获取文件：${Hr}/getFile${ee}/${re}`),`${Hr}/getFile${ee}/${re}`),T=(ee,re)=>(ee==="$"?ee="":ee=ee.replace(/\$/g,""),ee=ee.replace(/__/g,"/"),`${ee}/${re}`),U=ee=>{let re=s.value[ee];try{navigator.share({title:re.name,url:I(o.value,re.name)})}catch{alert(I(o.value,re.name))}},D=ee=>{n.value=!0,v.value=ee},Ae=[".MP4",".AVI",".MOV",".FLV",".MKV"],ke=[".JPG",".JPEG",".PNG",".WEBP"],Fe=[".WAV",".MP3",".OGG"],ue=()=>{t.value=!1},Be=()=>{n.value=!1},se=()=>{n.value=!1,Xr(()=>{let ee=s.value[v.value];Ul.post(`${Hr}/delFile`,{filePath:T(o.value,ee.name)}).then((re,$)=>{re.status===200&&Pe()})})},Oe=ee=>{t.value=!1,Xr(()=>{ee==="web"?r.push({path:"/VideoPlay",query:{url:te.value}}):window.open("vlc://"+te.value)})},te=Je(""),me=ee=>{let re=s.value[ee];if(re.isDirectory&&!re.isFile)o.value+=`__${re.name}`,Pe(),_e();else{let $=re.suffix;if(Ae.includes($.toUpperCase()))te.value=I(o.value,re.name),t.value=!0;else if(ke.includes($.toUpperCase())){y.value=[];let Ue=0;for(let Me=0;Me<s.value.length;Me++){let qe=s.value[Me].suffix;ke.includes(qe.toUpperCase())&&(s.value[Me].name===s.value[ee].name&&(b.value=Ue,console.log(b.value,123456789)),Ue++,y.value.push(I(o.value,s.value[Me].name)))}w()}else if(Fe.includes($.toUpperCase()))r.push({path:"/AudioPlay",query:{url:I(o.value,re.name)}});else{let Ue=document.createElement("a");Ue.href=I(o.value,re.name),Ue.download=re.name,Ue.target="_blank",Ue.click()}}},Pe=()=>{Ul.get(`${Hr}/list/${o.value}`).then((ee,re)=>{ee.status===200&&(s.value=ee.data.map($=>($.size=(Number($.size)/1024/1024).toFixed(2)+"MB",$.isDirectory&&($.size=""),$)))})},rt=()=>{f()},_e=()=>{window.history&&window.history.pushState&&(history.pushState(null,null,document.URL),window.addEventListener("popstate",rt,!1))};return Rn(()=>{let ee=localStorage.getItem("path");ee&&(o.value=ee),_e(),Pe()}),Ha(()=>{window.removeEventListener("popstate",rt,!1)}),kn(o,(ee,re)=>{localStorage.setItem("path",ee)}),(ee,re)=>(xe(),Qe("div",null,[we("div",{class:"top-box",onClick:f},[we("div",sm,[N(Ke(Ey),{class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})]),we("div",cm,vn(T(o.value,"")),1)]),we("div",dm,[N(Dy,{"table-data":s.value,"table-head":d.value,onClickFile:me,onDelFile:D,onCopyUrl:U},null,8,["table-data","table-head"])]),A.value?(xe(),Qe("div",pm,[we("div",um,[we("div",{class:"close-btn",onClick:R},[N(Ke(hy),{strokeWidth:5,fill:"#ffffff",size:"20",theme:"outline"})]),we("div",{class:"left-btn",onClick:B},[N(Ke(fy),{strokeWidth:5,fill:"#ffffff",size:"30",theme:"outline"})]),we("div",{class:"right-btn",onClick:C},[N(Ke(Ay),{strokeWidth:5,fill:"#ffffff",size:"30",theme:"outline"})]),we("img",{src:m.value,alt:""},null,8,fm)]),we("div",{class:"blackScreen",onClick:R})])):wn("",!0),N(ro,null,{default:cr(()=>[t.value?(xe(),at(Wl,{key:0,"ok-btn-text":"返回",title:"预览方式",onOkBtn:ue},{body:cr(()=>[we("ul",Am,[we("li",{onClick:re[0]||(re[0]=$=>Oe("web"))},"网页播放"),we("li",{onClick:re[1]||(re[1]=$=>Oe("vlc"))},"Vlc播放")])]),_:1})):wn("",!0)]),_:1}),N(ro,null,{default:cr(()=>[n.value?(xe(),at(Wl,{key:0,btnNum:2,title:"提示",onOkBtn:se,onCloseBtn:Be},{body:cr(()=>[ym]),_:1})):wn("",!0)]),_:1})]))}},mm=xo(hm,[["__scopeId","data-v-b9e156fd"]]);var bm=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function gm(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var mc={exports:{}};(function(e,t){(function(n,r){e.exports=r()})(self,()=>(()=>{var n={916:(d,f,y)=>{var m=y(471);d.exports=function(b){var v,A="",C=(b=b||{}).video,B=b.options,w=m.$escape,R=b.tran,I=b.icons,T=b.index,U=m.$each;return b.$value,b.$index,A+=`<div class="dplayer-mask"></div>
<div class="dplayer-video-wrap">
    `,v=y(568)(C),A+=v,A+=`
    `,B.logo&&(A+=`
    <div class="dplayer-logo">
        <img src="`,A+=w(B.logo),A+=`">
    </div>
    `),A+=`
    <div class="dplayer-danmaku"`,B.danmaku&&B.danmaku.bottom&&(A+=' style="margin-bottom:',A+=w(B.danmaku.bottom),A+='"'),A+=`>
        <div class="dplayer-danmaku-item dplayer-danmaku-item--demo"></div>
    </div>
    <div class="dplayer-subtitle"></div>
    <div class="dplayer-bezel">
        <span class="dplayer-bezel-icon"></span>
        `,B.danmaku&&(A+=`
        <span class="dplayer-danloading">`,A+=w(R("danmaku-loading")),A+=`</span>
        `),A+=`
        <span class="diplayer-loading-icon">`,A+=I.loading,A+=`</span>
    </div>
</div>
<div class="dplayer-controller-mask"></div>
<div class="dplayer-controller">
    <div class="dplayer-icons dplayer-comment-box">
        <button class="dplayer-icon dplayer-comment-setting-icon" data-balloon="`,A+=w(R("setting")),A+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,A+=I.pallette,A+=`</span>
        </button>
        <div class="dplayer-comment-setting-box">
            <div class="dplayer-comment-setting-color">
                <div class="dplayer-comment-setting-title">`,A+=w(R("set-danmaku-color")),A+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,A+=w(T),A+=`" value="#fff" checked>
                    <span style="background: #fff;"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,A+=w(T),A+=`" value="#e54256">
                    <span style="background: #e54256"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,A+=w(T),A+=`" value="#ffe133">
                    <span style="background: #ffe133"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,A+=w(T),A+=`" value="#64DD17">
                    <span style="background: #64DD17"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,A+=w(T),A+=`" value="#39ccff">
                    <span style="background: #39ccff"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,A+=w(T),A+=`" value="#D500F9">
                    <span style="background: #D500F9"></span>
                </label>
            </div>
            <div class="dplayer-comment-setting-type">
                <div class="dplayer-comment-setting-title">`,A+=w(R("set-danmaku-type")),A+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,A+=w(T),A+=`" value="1">
                    <span>`,A+=w(R("top")),A+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,A+=w(T),A+=`" value="0" checked>
                    <span>`,A+=w(R("rolling")),A+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,A+=w(T),A+=`" value="2">
                    <span>`,A+=w(R("bottom")),A+=`</span>
                </label>
            </div>
        </div>
        <input class="dplayer-comment-input" type="text" placeholder="`,A+=w(R("input-danmaku-enter")),A+=`" maxlength="30">
        <button class="dplayer-icon dplayer-send-icon" data-balloon="`,A+=w(R("send")),A+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,A+=I.send,A+=`</span>
        </button>
    </div>
    <div class="dplayer-icons dplayer-icons-left">
        <button class="dplayer-icon dplayer-play-icon">
            <span class="dplayer-icon-content">`,A+=I.play,A+=`</span>
        </button>
        <div class="dplayer-volume">
            <button class="dplayer-icon dplayer-volume-icon">
                <span class="dplayer-icon-content">`,A+=I.volumeDown,A+=`</span>
            </button>
            <div class="dplayer-volume-bar-wrap" data-balloon-pos="up">
                <div class="dplayer-volume-bar">
                    <div class="dplayer-volume-bar-inner" style="background: `,A+=w(B.theme),A+=`;">
                        <span class="dplayer-thumb" style="background: `,A+=w(B.theme),A+=`"></span>
                    </div>
                </div>
            </div>
        </div>
        <span class="dplayer-time">
            <span class="dplayer-ptime">0:00</span> /
            <span class="dplayer-dtime">0:00</span>
        </span>
        `,B.live&&(A+=`
        <span class="dplayer-live-badge"><span class="dplayer-live-dot" style="background: `,A+=w(B.theme),A+=';"></span>',A+=w(R("live")),A+=`</span>
        `),A+=`
    </div>
    <div class="dplayer-icons dplayer-icons-right">
        `,B.video.quality&&(A+=`
        <div class="dplayer-quality">
            <button class="dplayer-icon dplayer-quality-icon">`,A+=w(B.video.quality[B.video.defaultQuality].name),A+=`</button>
            <div class="dplayer-quality-mask">
                <div class="dplayer-quality-list">
                `,U(B.video.quality,function(D,Ae){A+=`
                    <div class="dplayer-quality-item" data-index="`,A+=w(Ae),A+='">',A+=w(D.name),A+=`</div>
                `}),A+=`
                </div>
            </div>
        </div>
        `),A+=`
        `,B.screenshot&&(A+=`
        <div class="dplayer-icon dplayer-camera-icon" data-balloon="`,A+=w(R("screenshot")),A+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,A+=I.camera,A+=`</span>
        </div>
        `),A+=`
        `,B.airplay&&(A+=`
        <div class="dplayer-icon dplayer-airplay-icon" data-balloon="`,A+=w(R("airplay")),A+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,A+=I.airplay,A+=`</span>
        </div>
        `),A+=`
        `,B.chromecast&&(A+=`
        <div class="dplayer-icon dplayer-chromecast-icon" data-balloon="`,A+=w(R("chromecast")),A+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,A+=I.chromecast,A+=`</span>
        </div>
        `),A+=`
        <div class="dplayer-comment">
            <button class="dplayer-icon dplayer-comment-icon" data-balloon="`,A+=w(R("send-danmaku")),A+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,A+=I.comment,A+=`</span>
            </button>
        </div>
        `,B.subtitle&&(A+=`
        `,typeof B.subtitle.url=="string"?(A+=`
        <div class="dplayer-subtitle-btn">
            <button class="dplayer-icon dplayer-subtitle-icon" data-balloon="`,A+=w(R("hide-subs")),A+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,A+=I.subtitle,A+=`</span>
            </button>
        </div>
        `):(A+=`
        <div class="dplayer-subtitles">
            <button class="dplayer-icon dplayer-subtitles-icon" data-balloon="`,A+=w(R("subtitle")),A+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,A+=I.subtitle,A+=`</span>
            </button>
            <div class="dplayer-subtitles-box">
                <div class="dplayer-subtitles-panel">
                    `,U(B.subtitle.url,function(D,Ae){A+=`
                        <div class="dplayer-subtitles-item" data-subtitle="`,A+=w(D.url),A+=`">
                            <!-- if lang, show tran(lang). if lang and name, show name + (tran(lang)). if name, show name. off option use lang for translation. -->
                            <span class="dplayer-label">`,A+=w(D.lang?D.name?D.name+" ("+R(D.lang)+")":R(D.lang):D.name),A+=`</span>
                        </div>
                    `}),A+=`
                </div>
            </div>
        </div>
        `),A+=`
        `),A+=`
        <div class="dplayer-setting">
            <button class="dplayer-icon dplayer-setting-icon" data-balloon="`,A+=w(R("setting")),A+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,A+=I.setting,A+=`</span>
            </button>
            <div class="dplayer-setting-box">
                <div class="dplayer-setting-origin-panel">
                    <div class="dplayer-setting-item dplayer-setting-speed">
                        <span class="dplayer-label">`,A+=w(R("speed")),A+=`</span>
                        <div class="dplayer-toggle">`,A+=I.right,A+=`</div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-loop">
                        <span class="dplayer-label">`,A+=w(R("loop")),A+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-toggle-setting-input" type="checkbox" name="dplayer-toggle">
                            <label for="dplayer-toggle"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-showdan">
                        <span class="dplayer-label">`,A+=w(R("show-danmaku")),A+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-showdan-setting-input" type="checkbox" name="dplayer-toggle-dan">
                            <label for="dplayer-toggle-dan"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danunlimit">
                        <span class="dplayer-label">`,A+=w(R("unlimited-danmaku")),A+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-danunlimit-setting-input" type="checkbox" name="dplayer-toggle-danunlimit">
                            <label for="dplayer-toggle-danunlimit"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danmaku">
                        <span class="dplayer-label">`,A+=w(R("opacity-danmaku")),A+=`</span>
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
                    `,U(B.playbackSpeed,function(D,Ae){A+=`
                        <div class="dplayer-setting-speed-item" data-speed="`,A+=w(D),A+=`">
                            <span class="dplayer-label">`,A+=w(D===1?R("normal"):D),A+=`</span>
                        </div>
                    `}),A+=`
                </div>
            </div>
        </div>
        <div class="dplayer-full">
            <button class="dplayer-icon dplayer-full-in-icon" data-balloon="`,A+=w(R("web-fullscreen")),A+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,A+=I.fullWeb,A+=`</span>
            </button>
            <button class="dplayer-icon dplayer-full-icon" data-balloon="`,A+=w(R("fullscreen")),A+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,A+=I.full,A+=`</span>
            </button>
        </div>
    </div>
    <div class="dplayer-bar-wrap">
        <div class="dplayer-bar-time hidden">00:00</div>
        <div class="dplayer-bar-preview"></div>
        <div class="dplayer-bar">
            <div class="dplayer-loaded" style="width: 0;"></div>
            <div class="dplayer-played" style="width: 0; background: `,A+=w(B.theme),A+=`">
                <span class="dplayer-thumb" style="background: `,A+=w(B.theme),A+=`"></span>
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
    `,B.danmaku&&(A+=`
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
    `,U(B.contextmenu,function(D,Ae){A+=`
        <div class="dplayer-menu-item">
            <a`,D.link&&(A+=' target="_blank"'),A+=' href="',A+=w(D.link||"javascript:void(0);"),A+='">',D.key&&(A+=" ",A+=w(R(D.key))),D.text&&(A+=" ",A+=w(D.text)),A+=`</a>
        </div>
    `}),A+=`
</div>
<div class="dplayer-notice-list"></div>
<button class="dplayer-mobile-play">
    `,A+=I.play,A+=`
</button>`}},568:(d,f,y)=>{var m=y(471);d.exports=function(b){var v="",A=(b=b||{}).enableSubtitle,C=b.subtitle,B=b.current,w=b.airplay,R=b.pic,I=m.$escape,T=b.screenshot,U=b.preload,D=b.url;return A=C&&C.type==="webvtt",v+=`
<video
    class="dplayer-video `,B&&(v+="dplayer-video-current"),v+=`"
    webkit-playsinline
    `,w&&(v+=' x-webkit-airplay="allow" '),v+=`
    playsinline
    `,R&&(v+='poster="',v+=I(R),v+='"'),v+=`
    `,(T||A)&&(v+='crossorigin="anonymous"'),v+=`
    `,U&&(v+='preload="',v+=I(U),v+='"'),v+=`
    `,w?v+=`
    nosrc
    `:D&&(v+=`
    src="`,v+=I(D),v+=`"
    `),v+=`
    >
    `,w&&(v+=`
    <source src="`,v+=I(D),v+=`">
    `),v+=`
    `,A&&(v+=`
    <track class="dplayer-subtrack" kind="metadata" default src="`,v+=I(typeof C.url=="string"?C.url:C.url[C.index].url),v+=`"></track>
    `),v+`
</video>`}},49:(d,f,y)=>{y.d(f,{Z:()=>C});var m=y(415),b=y.n(m),v=y(352),A=y.n(v)()(b());A.push([d.id,`:root {
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
`],sourceRoot:""}]);const C=A},685:(d,f,y)=>{y.d(f,{Z:()=>U});var m=y(415),b=y.n(m),v=y(352),A=y.n(v),C=y(49),B=y(80),w=y.n(B),R=new URL(y(831),y.b),I=A()(b());I.i(C.Z);var T=w()(R);I.push([d.id,`@keyframes my-face {
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
  background: url(`+T+`) repeat-x bottom;
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
}`],sourceRoot:""}]);const U=I},856:d=>{var f=[];function y(v){for(var A=-1,C=0;C<f.length;C++)if(f[C].identifier===v){A=C;break}return A}function m(v,A){for(var C={},B=[],w=0;w<v.length;w++){var R=v[w],I=A.base?R[0]+A.base:R[0],T=C[I]||0,U="".concat(I," ").concat(T);C[I]=T+1;var D=y(U),Ae={css:R[1],media:R[2],sourceMap:R[3],supports:R[4],layer:R[5]};if(D!==-1)f[D].references++,f[D].updater(Ae);else{var ke=b(Ae,A);A.byIndex=w,f.splice(w,0,{identifier:U,updater:ke,references:1})}B.push(U)}return B}function b(v,A){var C=A.domAPI(A);return C.update(v),function(B){if(B){if(B.css===v.css&&B.media===v.media&&B.sourceMap===v.sourceMap&&B.supports===v.supports&&B.layer===v.layer)return;C.update(v=B)}else C.remove()}}d.exports=function(v,A){var C=m(v=v||[],A=A||{});return function(B){B=B||[];for(var w=0;w<C.length;w++){var R=y(C[w]);f[R].references--}for(var I=m(B,A),T=0;T<C.length;T++){var U=y(C[T]);f[U].references===0&&(f[U].updater(),f.splice(U,1))}C=I}}},370:d=>{var f={};d.exports=function(y,m){var b=function(v){if(f[v]===void 0){var A=document.querySelector(v);if(window.HTMLIFrameElement&&A instanceof window.HTMLIFrameElement)try{A=A.contentDocument.head}catch{A=null}f[v]=A}return f[v]}(y);if(!b)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");b.appendChild(m)}},278:d=>{d.exports=function(f){var y=document.createElement("style");return f.setAttributes(y,f.attributes),f.insert(y,f.options),y}},458:(d,f,y)=>{d.exports=function(m){var b=y.nc;b&&m.setAttribute("nonce",b)}},470:d=>{d.exports=function(f){var y=f.insertStyleElement(f);return{update:function(m){(function(b,v,A){var C="";A.supports&&(C+="@supports (".concat(A.supports,") {")),A.media&&(C+="@media ".concat(A.media," {"));var B=A.layer!==void 0;B&&(C+="@layer".concat(A.layer.length>0?" ".concat(A.layer):""," {")),C+=A.css,B&&(C+="}"),A.media&&(C+="}"),A.supports&&(C+="}");var w=A.sourceMap;w&&typeof btoa<"u"&&(C+=`
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(w))))," */")),v.styleTagTransform(C,b,v.options)})(y,f,m)},remove:function(){(function(m){if(m.parentNode===null)return!1;m.parentNode.removeChild(m)})(y)}}}},488:d=>{d.exports=function(f,y){if(y.styleSheet)y.styleSheet.cssText=f;else{for(;y.firstChild;)y.removeChild(y.firstChild);y.appendChild(document.createTextNode(f))}}},251:d=>{d.exports='<svg viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg"><path d="M288 90v96c0 20-16 36-36 36h-10c-16 0-16-24 0-24h10c7 0 12-5 12-12V90c0-7-5-12-12-12H36c-7 0-12 5-12 12v96c0 7 5 12 12 12h10c16 0 16 24 0 24H36c-20 0-36-16-36-36V90c0-20 16-36 36-36h216c20 0 36 16 36 36zm-120 62l48 68c14 20 1 38-20 38H92c-21 0-34-18-20-38l48-68c13-18 35-18 48 0z"></path></svg>'},113:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M16 23c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zM16 13c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zM27 28h-22c-1.654 0-3-1.346-3-3v-16c0-1.654 1.346-3 3-3h3c0.552 0 1 0.448 1 1s-0.448 1-1 1h-3c-0.551 0-1 0.449-1 1v16c0 0.552 0.449 1 1 1h22c0.552 0 1-0.448 1-1v-16c0-0.551-0.448-1-1-1h-11c-0.552 0-1-0.448-1-1s0.448-1 1-1h11c1.654 0 3 1.346 3 3v16c0 1.654-1.346 3-3 3zM24 10.5c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5zM15 4c0 0.552-0.448 1-1 1h-4c-0.552 0-1-0.448-1-1v0c0-0.552 0.448-1 1-1h4c0.552 0 1 0.448 1 1v0z"></path></svg>'},193:d=>{d.exports='<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="chromecast" class="svg-inline--fa fa-chromecast fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M447.8,64H64c-23.6,0-42.7,19.1-42.7,42.7v63.9H64v-63.9h383.8v298.6H298.6V448H448c23.6,0,42.7-19.1,42.7-42.7V106.7 C490.7,83.1,471.4,64,447.8,64z M21.3,383.6L21.3,383.6l0,63.9h63.9C85.2,412.2,56.6,383.6,21.3,383.6L21.3,383.6z M21.3,298.6V341 c58.9,0,106.6,48.1,106.6,107h42.7C170.7,365.6,103.7,298.7,21.3,298.6z M213.4,448h42.7c-0.5-129.5-105.3-234.3-234.8-234.6l0,42.4 C127.3,255.6,213.3,342,213.4,448z"></path></svg>'},338:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.090 0.131h-22.731c-2.354 0-4.262 1.839-4.262 4.109v16.401c0 2.269 1.908 4.109 4.262 4.109h4.262v-2.706h8.469l-8.853 8.135 1.579 1.451 7.487-6.88h9.787c2.353 0 4.262-1.84 4.262-4.109v-16.401c0-2.27-1.909-4.109-4.262-4.109v0zM28.511 19.304c0 1.512-1.272 2.738-2.841 2.738h-8.425l-0.076-0.070-0.076 0.070h-11.311c-1.569 0-2.841-1.226-2.841-2.738v-13.696c0-1.513 1.272-2.739 2.841-2.739h19.889c1.569 0 2.841-0.142 2.841 1.37v15.064z"></path></svg>'},807:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.128 0.38h-22.553c-2.336 0-4.229 1.825-4.229 4.076v16.273c0 2.251 1.893 4.076 4.229 4.076h4.229v-2.685h8.403l-8.784 8.072 1.566 1.44 7.429-6.827h9.71c2.335 0 4.229-1.825 4.229-4.076v-16.273c0-2.252-1.894-4.076-4.229-4.076zM28.538 19.403c0 1.5-1.262 2.717-2.819 2.717h-8.36l-0.076-0.070-0.076 0.070h-11.223c-1.557 0-2.819-1.217-2.819-2.717v-13.589c0-1.501 1.262-2.718 2.819-2.718h19.734c1.557 0 2.819-0.141 2.819 1.359v14.947zM9.206 10.557c-1.222 0-2.215 0.911-2.215 2.036s0.992 2.035 2.215 2.035c1.224 0 2.216-0.911 2.216-2.035s-0.992-2.036-2.216-2.036zM22.496 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.224 0 2.215-0.911 2.215-2.035s-0.991-2.036-2.215-2.036zM15.852 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.222 0 2.215-0.911 2.215-2.035s-0.992-2.036-2.215-2.036z"></path></svg>'},300:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M24.965 24.38h-18.132c-1.366 0-2.478-1.113-2.478-2.478v-11.806c0-1.364 1.111-2.478 2.478-2.478h18.132c1.366 0 2.478 1.113 2.478 2.478v11.806c0 1.364-1.11 2.478-2.478 2.478zM6.833 10.097v11.806h18.134l-0.002-11.806h-18.132zM2.478 28.928h5.952c0.684 0 1.238-0.554 1.238-1.239 0-0.684-0.554-1.238-1.238-1.238h-5.952v-5.802c0-0.684-0.554-1.239-1.238-1.239s-1.239 0.556-1.239 1.239v5.802c0 1.365 1.111 2.478 2.478 2.478zM30.761 19.412c-0.684 0-1.238 0.554-1.238 1.238v5.801h-5.951c-0.686 0-1.239 0.554-1.239 1.238 0 0.686 0.554 1.239 1.239 1.239h5.951c1.366 0 2.478-1.111 2.478-2.478v-5.801c0-0.683-0.554-1.238-1.239-1.238zM0 5.55v5.802c0 0.683 0.554 1.238 1.238 1.238s1.238-0.555 1.238-1.238v-5.802h5.952c0.684 0 1.238-0.554 1.238-1.238s-0.554-1.238-1.238-1.238h-5.951c-1.366-0.001-2.478 1.111-2.478 2.476zM32 11.35v-5.801c0-1.365-1.11-2.478-2.478-2.478h-5.951c-0.686 0-1.239 0.554-1.239 1.238s0.554 1.238 1.239 1.238h5.951v5.801c0 0.683 0.554 1.237 1.238 1.237 0.686 0.002 1.239-0.553 1.239-1.236z"></path></svg>'},574:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M6.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v4h4c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333zM30.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h4v-4c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM30.667 12c-0.8 0-1.333-0.533-1.333-1.333v-4h-4c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM1.333 12c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333h-4v4c0 0.8-0.533 1.333-1.333 1.333z"></path></svg>'},182:d=>{d.exports='<svg version="1.1" viewBox="0 0 22 22"><svg x="7" y="1"><circle class="diplayer-loading-dot diplayer-loading-dot-0" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-1" cx="4" cy="4" r="2"></circle></svg><svg x="13" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-2" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-3" cx="4" cy="4" r="2"></circle></svg><svg x="7" y="13"><circle class="diplayer-loading-dot diplayer-loading-dot-4" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-5" cx="4" cy="4" r="2"></circle></svg><svg x="1" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-6" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-7" cx="4" cy="4" r="2"></circle></svg></svg>'},965:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M19.357 2.88c1.749 0 3.366 0.316 4.851 0.946 1.485 0.632 2.768 1.474 3.845 2.533s1.922 2.279 2.532 3.661c0.611 1.383 0.915 2.829 0.915 4.334 0 1.425-0.304 2.847-0.915 4.271-0.611 1.425-1.587 2.767-2.928 4.028-0.855 0.813-1.811 1.607-2.869 2.38s-2.136 1.465-3.233 2.075c-1.099 0.61-2.198 1.098-3.296 1.465-1.098 0.366-2.115 0.549-3.051 0.549-1.343 0-2.441-0.438-3.296-1.311-0.854-0.876-1.281-2.41-1.281-4.608 0-0.366 0.020-0.773 0.060-1.221s0.062-0.895 0.062-1.343c0-0.773-0.183-1.353-0.55-1.738-0.366-0.387-0.793-0.58-1.281-0.58-0.652 0-1.21 0.295-1.678 0.886s-0.926 1.23-1.373 1.921c-0.447 0.693-0.905 1.334-1.372 1.923s-1.028 0.886-1.679 0.886c-0.529 0-1.048-0.427-1.556-1.282s-0.763-2.259-0.763-4.212c0-2.197 0.529-4.241 1.587-6.133s2.462-3.529 4.21-4.912c1.75-1.383 3.762-2.471 6.041-3.264 2.277-0.796 4.617-1.212 7.018-1.253zM7.334 15.817c0.569 0 1.047-0.204 1.434-0.611s0.579-0.875 0.579-1.404c0-0.569-0.193-1.047-0.579-1.434s-0.864-0.579-1.434-0.579c-0.529 0-0.987 0.193-1.373 0.579s-0.58 0.864-0.58 1.434c0 0.53 0.194 0.998 0.58 1.404 0.388 0.407 0.845 0.611 1.373 0.611zM12.216 11.79c0.691 0 1.292-0.254 1.8-0.763s0.762-1.107 0.762-1.8c0-0.732-0.255-1.343-0.762-1.831-0.509-0.489-1.109-0.732-1.8-0.732-0.732 0-1.342 0.244-1.831 0.732-0.488 0.488-0.732 1.098-0.732 1.831 0 0.693 0.244 1.292 0.732 1.8s1.099 0.763 1.831 0.763zM16.366 25.947c0.692 0 1.282-0.214 1.77-0.64s0.732-0.987 0.732-1.678-0.244-1.261-0.732-1.709c-0.489-0.448-1.078-0.671-1.77-0.671-0.65 0-1.21 0.223-1.678 0.671s-0.702 1.018-0.702 1.709c0 0.692 0.234 1.25 0.702 1.678s1.027 0.64 1.678 0.64zM19.113 9.592c0.651 0 1.129-0.203 1.433-0.611 0.305-0.406 0.459-0.874 0.459-1.404 0-0.488-0.154-0.947-0.459-1.373-0.304-0.427-0.782-0.641-1.433-0.641-0.529 0-1.008 0.193-1.434 0.58s-0.64 0.865-0.64 1.434c0 0.571 0.213 1.049 0.64 1.434 0.427 0.389 0.905 0.581 1.434 0.581zM24.848 12.826c0.57 0 1.067-0.213 1.495-0.64 0.427-0.427 0.64-0.947 0.64-1.556 0-0.57-0.214-1.068-0.64-1.495-0.428-0.427-0.927-0.64-1.495-0.64-0.611 0-1.129 0.213-1.555 0.64-0.428 0.427-0.642 0.926-0.642 1.495 0 0.611 0.213 1.129 0.642 1.556s0.947 0.64 1.555 0.64z"></path></svg>'},74:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 17 32"><path d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path></svg>'},730:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 32"><path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path></svg>'},428:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path></svg>'},254:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M13.725 30l3.9-5.325-3.9-1.125v6.45zM0 17.5l11.050 3.35 13.6-11.55-10.55 12.425 11.8 3.65 6.1-23.375-32 15.5z"></path></svg>'},934:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 28"><path d="M28.633 17.104c0.035 0.21 0.026 0.463-0.026 0.76s-0.14 0.598-0.262 0.904c-0.122 0.306-0.271 0.581-0.445 0.825s-0.367 0.419-0.576 0.524c-0.209 0.105-0.393 0.157-0.55 0.157s-0.332-0.035-0.524-0.105c-0.175-0.052-0.393-0.1-0.655-0.144s-0.528-0.052-0.799-0.026c-0.271 0.026-0.541 0.083-0.812 0.17s-0.502 0.236-0.694 0.445c-0.419 0.437-0.664 0.934-0.734 1.493s0.009 1.092 0.236 1.598c0.175 0.349 0.148 0.699-0.079 1.048-0.105 0.14-0.271 0.284-0.498 0.432s-0.476 0.284-0.747 0.406-0.555 0.218-0.851 0.288c-0.297 0.070-0.559 0.105-0.786 0.105-0.157 0-0.306-0.061-0.445-0.183s-0.236-0.253-0.288-0.393h-0.026c-0.192-0.541-0.52-1.009-0.982-1.402s-1-0.589-1.611-0.589c-0.594 0-1.131 0.197-1.611 0.589s-0.816 0.851-1.009 1.375c-0.087 0.21-0.218 0.362-0.393 0.458s-0.367 0.144-0.576 0.144c-0.244 0-0.52-0.044-0.825-0.131s-0.611-0.197-0.917-0.327c-0.306-0.131-0.581-0.284-0.825-0.458s-0.428-0.349-0.55-0.524c-0.087-0.122-0.135-0.266-0.144-0.432s0.057-0.397 0.197-0.694c0.192-0.402 0.266-0.86 0.223-1.375s-0.266-0.991-0.668-1.428c-0.244-0.262-0.541-0.432-0.891-0.511s-0.681-0.109-0.995-0.092c-0.367 0.017-0.742 0.087-1.127 0.21-0.244 0.070-0.489 0.052-0.734-0.052-0.192-0.070-0.371-0.231-0.537-0.485s-0.314-0.533-0.445-0.838c-0.131-0.306-0.231-0.62-0.301-0.943s-0.087-0.59-0.052-0.799c0.052-0.384 0.227-0.629 0.524-0.734 0.524-0.21 0.995-0.555 1.415-1.035s0.629-1.017 0.629-1.611c0-0.611-0.21-1.144-0.629-1.598s-0.891-0.786-1.415-0.996c-0.157-0.052-0.288-0.179-0.393-0.38s-0.157-0.406-0.157-0.616c0-0.227 0.035-0.48 0.105-0.76s0.162-0.55 0.275-0.812 0.244-0.502 0.393-0.72c0.148-0.218 0.31-0.38 0.485-0.485 0.14-0.087 0.275-0.122 0.406-0.105s0.275 0.052 0.432 0.105c0.524 0.21 1.070 0.275 1.637 0.197s1.070-0.327 1.506-0.747c0.21-0.209 0.362-0.467 0.458-0.773s0.157-0.607 0.183-0.904c0.026-0.297 0.026-0.568 0-0.812s-0.048-0.419-0.065-0.524c-0.035-0.105-0.066-0.227-0.092-0.367s-0.013-0.262 0.039-0.367c0.105-0.244 0.293-0.458 0.563-0.642s0.563-0.336 0.878-0.458c0.314-0.122 0.62-0.214 0.917-0.275s0.533-0.092 0.707-0.092c0.227 0 0.406 0.074 0.537 0.223s0.223 0.301 0.275 0.458c0.192 0.471 0.507 0.886 0.943 1.244s0.952 0.537 1.546 0.537c0.611 0 1.153-0.17 1.624-0.511s0.803-0.773 0.996-1.297c0.070-0.14 0.179-0.284 0.327-0.432s0.301-0.223 0.458-0.223c0.244 0 0.511 0.035 0.799 0.105s0.572 0.166 0.851 0.288c0.279 0.122 0.537 0.279 0.773 0.472s0.423 0.402 0.563 0.629c0.087 0.14 0.113 0.293 0.079 0.458s-0.070 0.284-0.105 0.354c-0.227 0.506-0.297 1.039-0.21 1.598s0.341 1.048 0.76 1.467c0.419 0.419 0.934 0.651 1.546 0.694s1.179-0.057 1.703-0.301c0.14-0.087 0.31-0.122 0.511-0.105s0.371 0.096 0.511 0.236c0.262 0.244 0.493 0.616 0.694 1.113s0.336 1 0.406 1.506c0.035 0.297-0.013 0.528-0.144 0.694s-0.266 0.275-0.406 0.327c-0.542 0.192-1.004 0.528-1.388 1.009s-0.576 1.026-0.576 1.637c0 0.594 0.162 1.113 0.485 1.559s0.747 0.764 1.27 0.956c0.122 0.070 0.227 0.14 0.314 0.21 0.192 0.157 0.323 0.358 0.393 0.602v0zM16.451 19.462c0.786 0 1.528-0.149 2.227-0.445s1.305-0.707 1.821-1.231c0.515-0.524 0.921-1.131 1.218-1.821s0.445-1.428 0.445-2.214c0-0.786-0.148-1.524-0.445-2.214s-0.703-1.292-1.218-1.808c-0.515-0.515-1.122-0.921-1.821-1.218s-1.441-0.445-2.227-0.445c-0.786 0-1.524 0.148-2.214 0.445s-1.292 0.703-1.808 1.218c-0.515 0.515-0.921 1.118-1.218 1.808s-0.445 1.428-0.445 2.214c0 0.786 0.149 1.524 0.445 2.214s0.703 1.297 1.218 1.821c0.515 0.524 1.118 0.934 1.808 1.231s1.428 0.445 2.214 0.445v0z"></path></svg>'},410:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path></svg>'},644:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"></path></svg>'},324:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"></path></svg>'},437:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056z"></path></svg>'},897:(d,f,y)=>{var m=typeof self<"u"?self:typeof window<"u"?window:y.g!==void 0?y.g:{},b=Object.create(m),v=/["&'<>]/;function A(C){return typeof C!="string"&&(C=C==null?"":typeof C=="function"?A(C.call(C)):JSON.stringify(C)),C}b.$escape=function(C){return function(B){var w=""+B,R=v.exec(w);if(!R)return B;var I="",T=void 0,U=void 0,D=void 0;for(T=R.index,U=0;T<w.length;T++){switch(w.charCodeAt(T)){case 34:D="&#34;";break;case 38:D="&#38;";break;case 39:D="&#39;";break;case 60:D="&#60;";break;case 62:D="&#62;";break;default:continue}U!==T&&(I+=w.substring(U,T)),U=T+1,I+=D}return U!==T?I+w.substring(U,T):I}(A(C))},b.$each=function(C,B){if(Array.isArray(C))for(var w=0,R=C.length;w<R;w++)B(C[w],w);else for(var I in C)B(C[I],I)},d.exports=b},471:(d,f,y)=>{d.exports=y(897)},352:d=>{d.exports=function(f){var y=[];return y.toString=function(){return this.map(function(m){var b="",v=m[5]!==void 0;return m[4]&&(b+="@supports (".concat(m[4],") {")),m[2]&&(b+="@media ".concat(m[2]," {")),v&&(b+="@layer".concat(m[5].length>0?" ".concat(m[5]):""," {")),b+=f(m),v&&(b+="}"),m[2]&&(b+="}"),m[4]&&(b+="}"),b}).join("")},y.i=function(m,b,v,A,C){typeof m=="string"&&(m=[[null,m,void 0]]);var B={};if(v)for(var w=0;w<this.length;w++){var R=this[w][0];R!=null&&(B[R]=!0)}for(var I=0;I<m.length;I++){var T=[].concat(m[I]);v&&B[T[0]]||(C!==void 0&&(T[5]===void 0||(T[1]="@layer".concat(T[5].length>0?" ".concat(T[5]):""," {").concat(T[1],"}")),T[5]=C),b&&(T[2]&&(T[1]="@media ".concat(T[2]," {").concat(T[1],"}")),T[2]=b),A&&(T[4]?(T[1]="@supports (".concat(T[4],") {").concat(T[1],"}"),T[4]=A):T[4]="".concat(A)),y.push(T))}},y}},80:d=>{d.exports=function(f,y){return y||(y={}),f&&(f=String(f.__esModule?f.default:f),/^['"].*['"]$/.test(f)&&(f=f.slice(1,-1)),y.hash&&(f+=y.hash),/["'() \t\n]|(%20)/.test(f)||y.needQuotes?'"'.concat(f.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):f)}},415:d=>{d.exports=function(f){var y=f[1],m=f[3];if(!m)return y;if(typeof btoa=="function"){var b=btoa(unescape(encodeURIComponent(JSON.stringify(m)))),v="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(b),A="/*# ".concat(v," */");return[y].concat([A]).join(`
`)}return[y].join(`
`)}},937:d=>{function f(y){return f=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(m){return typeof m}:function(m){return m&&typeof Symbol=="function"&&m.constructor===Symbol&&m!==Symbol.prototype?"symbol":typeof m},f(y)}d.exports=(typeof self>"u"?"undefined":f(self))=="object"?self.FormData:window.FormData},831:d=>{d.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg=="}},r={};function o(d){var f=r[d];if(f!==void 0)return f.exports;var y=r[d]={id:d,exports:{}};return n[d](y,y.exports,o),y.exports}o.m=n,o.n=d=>{var f=d&&d.__esModule?()=>d.default:()=>d;return o.d(f,{a:f}),f},o.d=(d,f)=>{for(var y in f)o.o(f,y)&&!o.o(d,y)&&Object.defineProperty(d,y,{enumerable:!0,get:f[y]})},o.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}(),o.o=(d,f)=>Object.prototype.hasOwnProperty.call(d,f),o.b=document.baseURI||self.location.href,o.nc=void 0;var s={};return(()=>{o.d(s,{default:()=>gp});var d=o(856),f=o.n(d),y=o(470),m=o.n(y),b=o(370),v=o.n(b),A=o(458),C=o.n(A),B=o(278),w=o.n(B),R=o(488),I=o.n(R),T=o(685),U={};U.styleTagTransform=I(),U.setAttributes=C(),U.insert=v().bind(null,"head"),U.domAPI=m(),U.insertStyleElement=w(),f()(T.Z,U),T.Z&&T.Z.locals&&T.Z.locals;function D(i){return D=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},D(i)}function Ae(i,l){this.name="AggregateError",this.errors=i,this.message=l||""}Ae.prototype=Error.prototype;function ke(i){return ke=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},ke(i)}var Fe=setTimeout;function ue(i){return!!(i&&i.length!==void 0)}function Be(){}function se(i){if(!(this instanceof se))throw new TypeError("Promises must be constructed via new");if(typeof i!="function")throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],_e(i,this)}function Oe(i,l){for(;i._state===3;)i=i._value;i._state!==0?(i._handled=!0,se._immediateFn(function(){var u=i._state===1?l.onFulfilled:l.onRejected;if(u!==null){var a;try{a=u(i._value)}catch(c){return void me(l.promise,c)}te(l.promise,a)}else(i._state===1?te:me)(l.promise,i._value)})):i._deferreds.push(l)}function te(i,l){try{if(l===i)throw new TypeError("A promise cannot be resolved with itself.");if(l&&(ke(l)==="object"||typeof l=="function")){var u=l.then;if(l instanceof se)return i._state=3,i._value=l,void Pe(i);if(typeof u=="function")return void _e((a=u,c=l,function(){a.apply(c,arguments)}),i)}i._state=1,i._value=l,Pe(i)}catch(p){me(i,p)}var a,c}function me(i,l){i._state=2,i._value=l,Pe(i)}function Pe(i){i._state===2&&i._deferreds.length===0&&se._immediateFn(function(){i._handled||se._unhandledRejectionFn(i._value)});for(var l=0,u=i._deferreds.length;l<u;l++)Oe(i,i._deferreds[l]);i._deferreds=null}function rt(i,l,u){this.onFulfilled=typeof i=="function"?i:null,this.onRejected=typeof l=="function"?l:null,this.promise=u}function _e(i,l){var u=!1;try{i(function(a){u||(u=!0,te(l,a))},function(a){u||(u=!0,me(l,a))})}catch(a){if(u)return;u=!0,me(l,a)}}se.prototype.catch=function(i){return this.then(null,i)},se.prototype.then=function(i,l){var u=new this.constructor(Be);return Oe(this,new rt(i,l,u)),u},se.prototype.finally=function(i){var l=this.constructor;return this.then(function(u){return l.resolve(i()).then(function(){return u})},function(u){return l.resolve(i()).then(function(){return l.reject(u)})})},se.all=function(i){return new se(function(l,u){if(!ue(i))return u(new TypeError("Promise.all accepts an array"));var a=Array.prototype.slice.call(i);if(a.length===0)return l([]);var c=a.length;function p(g,x){try{if(x&&(ke(x)==="object"||typeof x=="function")){var L=x.then;if(typeof L=="function")return void L.call(x,function(_){p(g,_)},u)}a[g]=x,--c==0&&l(a)}catch(_){u(_)}}for(var h=0;h<a.length;h++)p(h,a[h])})},se.any=function(i){var l=this;return new l(function(u,a){if(!i||i.length===void 0)return a(new TypeError("Promise.any accepts an array"));var c=Array.prototype.slice.call(i);if(c.length===0)return a();for(var p=[],h=0;h<c.length;h++)try{l.resolve(c[h]).then(u).catch(function(g){p.push(g),p.length===c.length&&a(new Ae(p,"All promises were rejected"))})}catch(g){a(g)}})},se.allSettled=function(i){return new this(function(l,u){if(!i||i.length===void 0)return u(new TypeError(D(i)+" "+i+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var a=Array.prototype.slice.call(i);if(a.length===0)return l([]);var c=a.length;function p(g,x){if(x&&(D(x)==="object"||typeof x=="function")){var L=x.then;if(typeof L=="function")return void L.call(x,function(_){p(g,_)},function(_){a[g]={status:"rejected",reason:_},--c==0&&l(a)})}a[g]={status:"fulfilled",value:x},--c==0&&l(a)}for(var h=0;h<a.length;h++)p(h,a[h])})},se.resolve=function(i){return i&&ke(i)==="object"&&i.constructor===se?i:new se(function(l){l(i)})},se.reject=function(i){return new se(function(l,u){u(i)})},se.race=function(i){return new se(function(l,u){if(!ue(i))return u(new TypeError("Promise.race accepts an array"));for(var a=0,c=i.length;a<c;a++)se.resolve(i[a]).then(l,u)})},se._immediateFn=typeof setImmediate=="function"&&function(i){setImmediate(i)}||function(i){Fe(i,0)},se._unhandledRejectionFn=function(i){typeof console<"u"&&console&&console.warn("Possible Unhandled Promise Rejection:",i)};const ee=se;var re=/mobile/i.test(window.navigator.userAgent);const $={secondToTime:function(i){if((i=i||0)===0||i===1/0||i.toString()==="NaN")return"00:00";var l=Math.floor(i/3600),u=Math.floor((i-3600*l)/60),a=Math.floor(i-3600*l-60*u);return(l>0?[l,u,a]:[u,a]).map(function(c){return c<10?"0"+c:""+c}).join(":")},getElementViewLeft:function(i){var l=i.offsetLeft,u=i.offsetParent,a=document.body.scrollLeft+document.documentElement.scrollLeft;if(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement)for(;u!==null&&u!==i;)l+=u.offsetLeft,u=u.offsetParent;else for(;u!==null;)l+=u.offsetLeft,u=u.offsetParent;return l-a},getBoundingClientRectViewLeft:function(i){var l=window.scrollY||window.pageYOffset||document.body.scrollTop+(document.documentElement&&document.documentElement.scrollTop||0);if(i.getBoundingClientRect){if(typeof this.getBoundingClientRectViewLeft.offset!="number"){var u=document.createElement("div");u.style.cssText="position:absolute;top:0;left:0;",document.body.appendChild(u),this.getBoundingClientRectViewLeft.offset=-u.getBoundingClientRect().top-l,document.body.removeChild(u),u=null}var a=i.getBoundingClientRect(),c=this.getBoundingClientRectViewLeft.offset;return a.left+c}return this.getElementViewLeft(i)},getScrollPosition:function(){return{left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0}},setScrollPosition:function(i){var l=i.left,u=l===void 0?0:l,a=i.top,c=a===void 0?0:a;this.isFirefox?(document.documentElement.scrollLeft=u,document.documentElement.scrollTop=c):window.scrollTo(u,c)},isMobile:re,isFirefox:/firefox/i.test(window.navigator.userAgent),isChrome:/chrome/i.test(window.navigator.userAgent),isSafari:/safari/i.test(window.navigator.userAgent),storage:{set:function(i,l){localStorage.setItem(i,l)},get:function(i){return localStorage.getItem(i)}},nameMap:{dragStart:re?"touchstart":"mousedown",dragMove:re?"touchmove":"mousemove",dragEnd:re?"touchend":"mouseup"},color2Number:function(i){return i[0]==="#"&&(i=i.substr(1)),i.length===3&&(i="".concat(i[0]).concat(i[0]).concat(i[1]).concat(i[1]).concat(i[2]).concat(i[2])),parseInt(i,16)+0&16777215},number2Color:function(i){return"#"+("00000"+i.toString(16)).slice(-6)},number2Type:function(i){switch(i){case 0:default:return"right";case 1:return"top";case 2:return"bottom"}}};function Ue(i,l){return function(){return i.apply(l,arguments)}}function Me(i){return Me=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Me(i)}var qe,_t=Object.prototype.toString,Et=Object.getPrototypeOf,Dt=(qe=Object.create(null),function(i){var l=_t.call(i);return qe[l]||(qe[l]=l.slice(8,-1).toLowerCase())}),Te=function(i){return i=i.toLowerCase(),function(l){return Dt(l)===i}},z=function(i){return function(l){return Me(l)===i}},J=Array.isArray,Y=z("undefined"),ae=Te("ArrayBuffer"),ve=z("string"),E=z("function"),k=z("number"),S=function(i){return i!==null&&Me(i)==="object"},O=function(i){if(Dt(i)!=="object")return!1;var l=Et(i);return!(l!==null&&l!==Object.prototype&&Object.getPrototypeOf(l)!==null||Symbol.toStringTag in i||Symbol.iterator in i)},M=Te("Date"),q=Te("File"),X=Te("Blob"),H=Te("FileList"),V=Te("URLSearchParams");function F(i,l){var u,a,c=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},p=c.allOwnKeys,h=p!==void 0&&p;if(i!=null)if(Me(i)!=="object"&&(i=[i]),J(i))for(u=0,a=i.length;u<a;u++)l.call(null,i[u],u,i);else{var g,x=h?Object.getOwnPropertyNames(i):Object.keys(i),L=x.length;for(u=0;u<L;u++)g=x[u],l.call(null,i[g],g,i)}}function ie(i,l){l=l.toLowerCase();for(var u,a=Object.keys(i),c=a.length;c-- >0;)if(l===(u=a[c]).toLowerCase())return u;return null}var ne,le,de=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:bm,ye=function(i){return!Y(i)&&i!==de},Le=(ne=typeof Uint8Array<"u"&&Et(Uint8Array),function(i){return ne&&i instanceof ne}),Ce=Te("HTMLFormElement"),ze=(le=Object.prototype.hasOwnProperty,function(i,l){return le.call(i,l)}),lt=Te("RegExp"),Tt=function(i,l){var u=Object.getOwnPropertyDescriptors(i),a={};F(u,function(c,p){l(c,p,i)!==!1&&(a[p]=c)}),Object.defineProperties(i,a)};const P={isArray:J,isArrayBuffer:ae,isBuffer:function(i){return i!==null&&!Y(i)&&i.constructor!==null&&!Y(i.constructor)&&E(i.constructor.isBuffer)&&i.constructor.isBuffer(i)},isFormData:function(i){var l="[object FormData]";return i&&(typeof FormData=="function"&&i instanceof FormData||_t.call(i)===l||E(i.toString)&&i.toString()===l)},isArrayBufferView:function(i){return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?ArrayBuffer.isView(i):i&&i.buffer&&ae(i.buffer)},isString:ve,isNumber:k,isBoolean:function(i){return i===!0||i===!1},isObject:S,isPlainObject:O,isUndefined:Y,isDate:M,isFile:q,isBlob:X,isRegExp:lt,isFunction:E,isStream:function(i){return S(i)&&E(i.pipe)},isURLSearchParams:V,isTypedArray:Le,isFileList:H,forEach:F,merge:function i(){for(var l=ye(this)&&this||{},u=l.caseless,a={},c=function(g,x){var L=u&&ie(a,x)||x;O(a[L])&&O(g)?a[L]=i(a[L],g):O(g)?a[L]=i({},g):J(g)?a[L]=g.slice():a[L]=g},p=0,h=arguments.length;p<h;p++)arguments[p]&&F(arguments[p],c);return a},extend:function(i,l,u){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},c=a.allOwnKeys;return F(l,function(p,h){u&&E(p)?i[h]=Ue(p,u):i[h]=p},{allOwnKeys:c}),i},trim:function(i){return i.trim?i.trim():i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},stripBOM:function(i){return i.charCodeAt(0)===65279&&(i=i.slice(1)),i},inherits:function(i,l,u,a){i.prototype=Object.create(l.prototype,a),i.prototype.constructor=i,Object.defineProperty(i,"super",{value:l.prototype}),u&&Object.assign(i.prototype,u)},toFlatObject:function(i,l,u,a){var c,p,h,g={};if(l=l||{},i==null)return l;do{for(p=(c=Object.getOwnPropertyNames(i)).length;p-- >0;)h=c[p],a&&!a(h,i,l)||g[h]||(l[h]=i[h],g[h]=!0);i=u!==!1&&Et(i)}while(i&&(!u||u(i,l))&&i!==Object.prototype);return l},kindOf:Dt,kindOfTest:Te,endsWith:function(i,l,u){i=String(i),(u===void 0||u>i.length)&&(u=i.length),u-=l.length;var a=i.indexOf(l,u);return a!==-1&&a===u},toArray:function(i){if(!i)return null;if(J(i))return i;var l=i.length;if(!k(l))return null;for(var u=new Array(l);l-- >0;)u[l]=i[l];return u},forEachEntry:function(i,l){for(var u,a=(i&&i[Symbol.iterator]).call(i);(u=a.next())&&!u.done;){var c=u.value;l.call(i,c[0],c[1])}},matchAll:function(i,l){for(var u,a=[];(u=i.exec(l))!==null;)a.push(u);return a},isHTMLForm:Ce,hasOwnProperty:ze,hasOwnProp:ze,reduceDescriptors:Tt,freezeMethods:function(i){Tt(i,function(l,u){if(E(i)&&["arguments","caller","callee"].indexOf(u)!==-1)return!1;var a=i[u];E(a)&&(l.enumerable=!1,"writable"in l?l.writable=!1:l.set||(l.set=function(){throw Error("Can not rewrite read-only method '"+u+"'")}))})},toObjectSet:function(i,l){var u={},a=function(c){c.forEach(function(p){u[p]=!0})};return J(i)?a(i):a(String(i).split(l)),u},toCamelCase:function(i){return i.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,function(l,u,a){return u.toUpperCase()+a})},noop:function(){},toFiniteNumber:function(i,l){return i=+i,Number.isFinite(i)?i:l},findKey:ie,global:de,isContextDefined:ye,toJSONObject:function(i){var l=new Array(10);return function u(a,c){if(S(a)){if(l.indexOf(a)>=0)return;if(!("toJSON"in a)){l[c]=a;var p=J(a)?[]:{};return F(a,function(h,g){var x=u(h,c+1);!Y(x)&&(p[g]=x)}),l[c]=void 0,p}}return a}(i,0)}};function ct(i,l,u,a,c){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=i,this.name="AxiosError",l&&(this.code=l),u&&(this.config=u),a&&(this.request=a),c&&(this.response=c)}P.inherits(ct,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:P.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var jn=ct.prototype,Ze={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(function(i){Ze[i]={value:i}}),Object.defineProperties(ct,Ze),Object.defineProperty(jn,"isAxiosError",{value:!0}),ct.from=function(i,l,u,a,c,p){var h=Object.create(jn);return P.toFlatObject(i,h,function(g){return g!==Error.prototype},function(g){return g!=="isAxiosError"}),ct.call(h,i.message,l,u,a,c),h.cause=i,h.name=i.name,p&&Object.assign(h,p),h};const he=ct,Sr=o(937);function _o(i){return _o=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},_o(i)}function To(i){return P.isPlainObject(i)||P.isArray(i)}function ri(i){return P.endsWith(i,"[]")?i.slice(0,-2):i}function oi(i,l,u){return i?i.concat(l).map(function(a,c){return a=ri(a),!u&&c?"["+a+"]":a}).join(u?".":""):l}var gc=P.toFlatObject(P,{},null,function(i){return/^is[A-Z]/.test(i)});const Lr=function(i,l,u){if(!P.isObject(i))throw new TypeError("target must be an object");l=l||new(Sr||FormData);var a,c=(u=P.toFlatObject(u,{metaTokens:!0,dots:!1,indexes:!1},!1,function(G,Z){return!P.isUndefined(Z[G])})).metaTokens,p=u.visitor||_,h=u.dots,g=u.indexes,x=(u.Blob||typeof Blob<"u"&&Blob)&&(a=l)&&P.isFunction(a.append)&&a[Symbol.toStringTag]==="FormData"&&a[Symbol.iterator];if(!P.isFunction(p))throw new TypeError("visitor must be a function");function L(G){if(G===null)return"";if(P.isDate(G))return G.toISOString();if(!x&&P.isBlob(G))throw new he("Blob is not supported. Use a Buffer instead.");return P.isArrayBuffer(G)||P.isTypedArray(G)?x&&typeof Blob=="function"?new Blob([G]):Buffer.from(G):G}function _(G,Z,K){var oe=G;if(G&&!K&&_o(G)==="object"){if(P.endsWith(Z,"{}"))Z=c?Z:Z.slice(0,-2),G=JSON.stringify(G);else if(P.isArray(G)&&function(pe){return P.isArray(pe)&&!pe.some(To)}(G)||P.isFileList(G)||P.endsWith(Z,"[]")&&(oe=P.toArray(G)))return Z=ri(Z),oe.forEach(function(pe,Ye){!P.isUndefined(pe)&&pe!==null&&l.append(g===!0?oi([Z],Ye,h):g===null?Z:Z+"[]",L(pe))}),!1}return!!To(G)||(l.append(oi(K,Z,h),L(G)),!1)}var W=[],Q=Object.assign(gc,{defaultVisitor:_,convertValue:L,isVisitable:To});if(!P.isObject(i))throw new TypeError("data must be an object");return function G(Z,K){if(!P.isUndefined(Z)){if(W.indexOf(Z)!==-1)throw Error("Circular reference detected in "+K.join("."));W.push(Z),P.forEach(Z,function(oe,pe){(!(P.isUndefined(oe)||oe===null)&&p.call(l,oe,P.isString(pe)?pe.trim():pe,K,Q))===!0&&G(oe,K?K.concat(pe):[pe])}),W.pop()}}(i),l};function ai(i){var l={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(i).replace(/[!'()~]|%20|%00/g,function(u){return l[u]})}function ii(i,l){this._pairs=[],i&&Lr(i,this,l)}var li=ii.prototype;li.append=function(i,l){this._pairs.push([i,l])},li.toString=function(i){var l=i?function(u){return i.call(this,u,ai)}:ai;return this._pairs.map(function(u){return l(u[0])+"="+l(u[1])},"").join("&")};const si=ii;function vc(i){return encodeURIComponent(i).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function ci(i,l,u){if(!l)return i;var a,c=u&&u.encode||vc,p=u&&u.serialize;if(a=p?p(l,u):P.isURLSearchParams(l)?l.toString():new si(l,u).toString(c)){var h=i.indexOf("#");h!==-1&&(i=i.slice(0,h)),i+=(i.indexOf("?")===-1?"?":"&")+a}return i}function zn(i){return zn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},zn(i)}function xc(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(zn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(zn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),zn(c)==="symbol"?c:String(c)),a)}var c}var Ec=function(){function i(){(function(a,c){if(!(a instanceof c))throw new TypeError("Cannot call a class as a function")})(this,i),this.handlers=[]}var l,u;return l=i,u=[{key:"use",value:function(a,c,p){return this.handlers.push({fulfilled:a,rejected:c,synchronous:!!p&&p.synchronous,runWhen:p?p.runWhen:null}),this.handlers.length-1}},{key:"eject",value:function(a){this.handlers[a]&&(this.handlers[a]=null)}},{key:"clear",value:function(){this.handlers&&(this.handlers=[])}},{key:"forEach",value:function(a){P.forEach(this.handlers,function(c){c!==null&&a(c)})}}],u&&xc(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const di=Ec,pi={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},kc=typeof URLSearchParams<"u"?URLSearchParams:si,wc=FormData;var Oo,Cc=(typeof navigator>"u"||(Oo=navigator.product)!=="ReactNative"&&Oo!=="NativeScript"&&Oo!=="NS")&&typeof window<"u"&&typeof document<"u",Bc=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function";const kt={isBrowser:!0,classes:{URLSearchParams:kc,FormData:wc,Blob},isStandardBrowserEnv:Cc,isStandardBrowserWebWorkerEnv:Bc,protocols:["http","https","file","blob","url","data"]},ui=function(i){function l(a,c,p,h){var g=a[h++],x=Number.isFinite(+g),L=h>=a.length;return g=!g&&P.isArray(p)?p.length:g,L?(P.hasOwnProp(p,g)?p[g]=[p[g],c]:p[g]=c,!x):(p[g]&&P.isObject(p[g])||(p[g]=[]),l(a,c,p[g],h)&&P.isArray(p[g])&&(p[g]=function(_){var W,Q,G={},Z=Object.keys(_),K=Z.length;for(W=0;W<K;W++)G[Q=Z[W]]=_[Q];return G}(p[g])),!x)}if(P.isFormData(i)&&P.isFunction(i.entries)){var u={};return P.forEachEntry(i,function(a,c){l(function(p){return P.matchAll(/\w+|\[(\w*)]/g,p).map(function(h){return h[0]==="[]"?"":h[1]||h[0]})}(a),c,u,0)}),u}return null};var Sc={"Content-Type":void 0},Ir={transitional:pi,adapter:["xhr","http"],transformRequest:[function(i,l){var u,a=l.getContentType()||"",c=a.indexOf("application/json")>-1,p=P.isObject(i);if(p&&P.isHTMLForm(i)&&(i=new FormData(i)),P.isFormData(i))return c&&c?JSON.stringify(ui(i)):i;if(P.isArrayBuffer(i)||P.isBuffer(i)||P.isStream(i)||P.isFile(i)||P.isBlob(i))return i;if(P.isArrayBufferView(i))return i.buffer;if(P.isURLSearchParams(i))return l.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),i.toString();if(p){if(a.indexOf("application/x-www-form-urlencoded")>-1)return function(g,x){return Lr(g,new kt.classes.URLSearchParams,Object.assign({visitor:function(L,_,W,Q){return kt.isNode&&P.isBuffer(L)?(this.append(_,L.toString("base64")),!1):Q.defaultVisitor.apply(this,arguments)}},x))}(i,this.formSerializer).toString();if((u=P.isFileList(i))||a.indexOf("multipart/form-data")>-1){var h=this.env&&this.env.FormData;return Lr(u?{"files[]":i}:i,h&&new h,this.formSerializer)}}return p||c?(l.setContentType("application/json",!1),function(g,x,L){if(P.isString(g))try{return(0,JSON.parse)(g),P.trim(g)}catch(_){if(_.name!=="SyntaxError")throw _}return(0,JSON.stringify)(g)}(i)):i}],transformResponse:[function(i){var l=this.transitional||Ir.transitional,u=l&&l.forcedJSONParsing,a=this.responseType==="json";if(i&&P.isString(i)&&(u&&!this.responseType||a)){var c=!(l&&l.silentJSONParsing)&&a;try{return JSON.parse(i)}catch(p){if(c)throw p.name==="SyntaxError"?he.from(p,he.ERR_BAD_RESPONSE,this,null,this.response):p}}return i}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:kt.classes.FormData,Blob:kt.classes.Blob},validateStatus:function(i){return i>=200&&i<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};P.forEach(["delete","get","head"],function(i){Ir.headers[i]={}}),P.forEach(["post","put","patch"],function(i){Ir.headers[i]=P.merge(Sc)});const Ro=Ir;var Lc=P.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]);function Mn(i){return Mn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Mn(i)}function fi(i,l){(l==null||l>i.length)&&(l=i.length);for(var u=0,a=new Array(l);u<l;u++)a[u]=i[u];return a}function Ai(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(Mn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(Mn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Mn(c)==="symbol"?c:String(c)),a)}var c}var yi=Symbol("internals");function Dn(i){return i&&String(i).trim().toLowerCase()}function _r(i){return i===!1||i==null?i:P.isArray(i)?i.map(_r):String(i)}function hi(i,l,u,a){return P.isFunction(a)?a.call(this,l,u):P.isString(l)?P.isString(a)?l.indexOf(a)!==-1:P.isRegExp(a)?a.test(l):void 0:void 0}var Tr=function(i,l){function u(h){(function(g,x){if(!(g instanceof x))throw new TypeError("Cannot call a class as a function")})(this,u),h&&this.set(h)}var a,c,p;return a=u,c=[{key:"set",value:function(h,g,x){var L=this;function _(pe,Ye,De){var Ie=Dn(Ye);if(!Ie)throw new Error("header name must be a non-empty string");var Nt=P.findKey(L,Ie);(!Nt||L[Nt]===void 0||De===!0||De===void 0&&L[Nt]!==!1)&&(L[Nt||Ye]=_r(pe))}var W,Q,G,Z,K,oe=function(pe,Ye){return P.forEach(pe,function(De,Ie){return _(De,Ie,Ye)})};return P.isPlainObject(h)||h instanceof this.constructor?oe(h,g):P.isString(h)&&(h=h.trim())&&!/^[-_a-zA-Z]+$/.test(h.trim())?oe((K={},(W=h)&&W.split(`
`).forEach(function(pe){Z=pe.indexOf(":"),Q=pe.substring(0,Z).trim().toLowerCase(),G=pe.substring(Z+1).trim(),!Q||K[Q]&&Lc[Q]||(Q==="set-cookie"?K[Q]?K[Q].push(G):K[Q]=[G]:K[Q]=K[Q]?K[Q]+", "+G:G)}),K),g):h!=null&&_(g,h,x),this}},{key:"get",value:function(h,g){if(h=Dn(h)){var x=P.findKey(this,h);if(x){var L=this[x];if(!g)return L;if(g===!0)return function(_){for(var W,Q=Object.create(null),G=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;W=G.exec(_);)Q[W[1]]=W[2];return Q}(L);if(P.isFunction(g))return g.call(this,L,x);if(P.isRegExp(g))return g.exec(L);throw new TypeError("parser must be boolean|regexp|function")}}}},{key:"has",value:function(h,g){if(h=Dn(h)){var x=P.findKey(this,h);return!(!x||g&&!hi(0,this[x],x,g))}return!1}},{key:"delete",value:function(h,g){var x=this,L=!1;function _(W){if(W=Dn(W)){var Q=P.findKey(x,W);!Q||g&&!hi(0,x[Q],Q,g)||(delete x[Q],L=!0)}}return P.isArray(h)?h.forEach(_):_(h),L}},{key:"clear",value:function(){return Object.keys(this).forEach(this.delete.bind(this))}},{key:"normalize",value:function(h){var g=this,x={};return P.forEach(this,function(L,_){var W=P.findKey(x,_);if(W)return g[W]=_r(L),void delete g[_];var Q=h?function(G){return G.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,function(Z,K,oe){return K.toUpperCase()+oe})}(_):String(_).trim();Q!==_&&delete g[_],g[Q]=_r(L),x[Q]=!0}),this}},{key:"concat",value:function(){for(var h,g=arguments.length,x=new Array(g),L=0;L<g;L++)x[L]=arguments[L];return(h=this.constructor).concat.apply(h,[this].concat(x))}},{key:"toJSON",value:function(h){var g=Object.create(null);return P.forEach(this,function(x,L){x!=null&&x!==!1&&(g[L]=h&&P.isArray(x)?x.join(", "):x)}),g}},{key:Symbol.iterator,value:function(){return Object.entries(this.toJSON())[Symbol.iterator]()}},{key:"toString",value:function(){return Object.entries(this.toJSON()).map(function(h){var g,x,L=(x=2,function(_){if(Array.isArray(_))return _}(g=h)||function(_,W){var Q=_==null?null:typeof Symbol<"u"&&_[Symbol.iterator]||_["@@iterator"];if(Q!=null){var G,Z,K,oe,pe=[],Ye=!0,De=!1;try{if(K=(Q=Q.call(_)).next,W===0){if(Object(Q)!==Q)return;Ye=!1}else for(;!(Ye=(G=K.call(Q)).done)&&(pe.push(G.value),pe.length!==W);Ye=!0);}catch(Ie){De=!0,Z=Ie}finally{try{if(!Ye&&Q.return!=null&&(oe=Q.return(),Object(oe)!==oe))return}finally{if(De)throw Z}}return pe}}(g,x)||function(_,W){if(_){if(typeof _=="string")return fi(_,W);var Q=Object.prototype.toString.call(_).slice(8,-1);return Q==="Object"&&_.constructor&&(Q=_.constructor.name),Q==="Map"||Q==="Set"?Array.from(_):Q==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(Q)?fi(_,W):void 0}}(g,x)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}());return L[0]+": "+L[1]}).join(`
`)}},{key:Symbol.toStringTag,get:function(){return"AxiosHeaders"}}],p=[{key:"from",value:function(h){return h instanceof this?h:new this(h)}},{key:"concat",value:function(h){for(var g=new this(h),x=arguments.length,L=new Array(x>1?x-1:0),_=1;_<x;_++)L[_-1]=arguments[_];return L.forEach(function(W){return g.set(W)}),g}},{key:"accessor",value:function(h){var g=(this[yi]=this[yi]={accessors:{}}).accessors,x=this.prototype;function L(_){var W=Dn(_);g[W]||(function(Q,G){var Z=P.toCamelCase(" "+G);["get","set","has"].forEach(function(K){Object.defineProperty(Q,K+Z,{value:function(oe,pe,Ye){return this[K].call(this,G,oe,pe,Ye)},configurable:!0})})}(x,_),g[W]=!0)}return P.isArray(h)?h.forEach(L):L(h),this}}],c&&Ai(a.prototype,c),p&&Ai(a,p),Object.defineProperty(a,"prototype",{writable:!1}),u}();Tr.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent"]),P.freezeMethods(Tr.prototype),P.freezeMethods(Tr);const Ot=Tr;function Po(i,l){var u=this||Ro,a=l||u,c=Ot.from(a.headers),p=a.data;return P.forEach(i,function(h){p=h.call(u,p,c.normalize(),l?l.status:void 0)}),c.normalize(),p}function mi(i){return!(!i||!i.__CANCEL__)}function bi(i,l,u){he.call(this,i??"canceled",he.ERR_CANCELED,l,u),this.name="CanceledError"}P.inherits(bi,he,{__CANCEL__:!0});const Or=bi,Ic=kt.isStandardBrowserEnv?{write:function(i,l,u,a,c,p){var h=[];h.push(i+"="+encodeURIComponent(l)),P.isNumber(u)&&h.push("expires="+new Date(u).toGMTString()),P.isString(a)&&h.push("path="+a),P.isString(c)&&h.push("domain="+c),p===!0&&h.push("secure"),document.cookie=h.join("; ")},read:function(i){var l=document.cookie.match(new RegExp("(^|;\\s*)("+i+")=([^;]*)"));return l?decodeURIComponent(l[3]):null},remove:function(i){this.write(i,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};function gi(i,l){return i&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(l)?function(u,a){return a?u.replace(/\/+$/,"")+"/"+a.replace(/^\/+/,""):u}(i,l):l}const _c=kt.isStandardBrowserEnv?function(){var i,l=/(msie|trident)/i.test(navigator.userAgent),u=document.createElement("a");function a(c){var p=c;return l&&(u.setAttribute("href",p),p=u.href),u.setAttribute("href",p),{href:u.href,protocol:u.protocol?u.protocol.replace(/:$/,""):"",host:u.host,search:u.search?u.search.replace(/^\?/,""):"",hash:u.hash?u.hash.replace(/^#/,""):"",hostname:u.hostname,port:u.port,pathname:u.pathname.charAt(0)==="/"?u.pathname:"/"+u.pathname}}return i=a(window.location.href),function(c){var p=P.isString(c)?a(c):c;return p.protocol===i.protocol&&p.host===i.host}}():function(){return!0};function vi(i,l){var u=0,a=function(c,p){c=c||10;var h,g=new Array(c),x=new Array(c),L=0,_=0;return p=p!==void 0?p:1e3,function(W){var Q=Date.now(),G=x[_];h||(h=Q),g[L]=W,x[L]=Q;for(var Z=_,K=0;Z!==L;)K+=g[Z++],Z%=c;if((L=(L+1)%c)===_&&(_=(_+1)%c),!(Q-h<p)){var oe=G&&Q-G;return oe?Math.round(1e3*K/oe):void 0}}}(50,250);return function(c){var p=c.loaded,h=c.lengthComputable?c.total:void 0,g=p-u,x=a(g);u=p;var L={loaded:p,total:h,progress:h?p/h:void 0,bytes:g,rate:x||void 0,estimated:x&&h&&p<=h?(h-p)/x:void 0,event:c};L[l?"download":"upload"]=!0,i(L)}}var jo={http:null,xhr:typeof XMLHttpRequest<"u"&&function(i){return new Promise(function(l,u){var a,c=i.data,p=Ot.from(i.headers).normalize(),h=i.responseType;function g(){i.cancelToken&&i.cancelToken.unsubscribe(a),i.signal&&i.signal.removeEventListener("abort",a)}P.isFormData(c)&&(kt.isStandardBrowserEnv||kt.isStandardBrowserWebWorkerEnv)&&p.setContentType(!1);var x=new XMLHttpRequest;if(i.auth){var L=i.auth.username||"",_=i.auth.password?unescape(encodeURIComponent(i.auth.password)):"";p.set("Authorization","Basic "+btoa(L+":"+_))}var W=gi(i.baseURL,i.url);function Q(){if(x){var oe=Ot.from("getAllResponseHeaders"in x&&x.getAllResponseHeaders());(function(pe,Ye,De){var Ie=De.config.validateStatus;De.status&&Ie&&!Ie(De.status)?Ye(new he("Request failed with status code "+De.status,[he.ERR_BAD_REQUEST,he.ERR_BAD_RESPONSE][Math.floor(De.status/100)-4],De.config,De.request,De)):pe(De)})(function(pe){l(pe),g()},function(pe){u(pe),g()},{data:h&&h!=="text"&&h!=="json"?x.response:x.responseText,status:x.status,statusText:x.statusText,headers:oe,config:i,request:x}),x=null}}if(x.open(i.method.toUpperCase(),ci(W,i.params,i.paramsSerializer),!0),x.timeout=i.timeout,"onloadend"in x?x.onloadend=Q:x.onreadystatechange=function(){x&&x.readyState===4&&(x.status!==0||x.responseURL&&x.responseURL.indexOf("file:")===0)&&setTimeout(Q)},x.onabort=function(){x&&(u(new he("Request aborted",he.ECONNABORTED,i,x)),x=null)},x.onerror=function(){u(new he("Network Error",he.ERR_NETWORK,i,x)),x=null},x.ontimeout=function(){var oe=i.timeout?"timeout of "+i.timeout+"ms exceeded":"timeout exceeded",pe=i.transitional||pi;i.timeoutErrorMessage&&(oe=i.timeoutErrorMessage),u(new he(oe,pe.clarifyTimeoutError?he.ETIMEDOUT:he.ECONNABORTED,i,x)),x=null},kt.isStandardBrowserEnv){var G=(i.withCredentials||_c(W))&&i.xsrfCookieName&&Ic.read(i.xsrfCookieName);G&&p.set(i.xsrfHeaderName,G)}c===void 0&&p.setContentType(null),"setRequestHeader"in x&&P.forEach(p.toJSON(),function(oe,pe){x.setRequestHeader(pe,oe)}),P.isUndefined(i.withCredentials)||(x.withCredentials=!!i.withCredentials),h&&h!=="json"&&(x.responseType=i.responseType),typeof i.onDownloadProgress=="function"&&x.addEventListener("progress",vi(i.onDownloadProgress,!0)),typeof i.onUploadProgress=="function"&&x.upload&&x.upload.addEventListener("progress",vi(i.onUploadProgress)),(i.cancelToken||i.signal)&&(a=function(oe){x&&(u(!oe||oe.type?new Or(null,i,x):oe),x.abort(),x=null)},i.cancelToken&&i.cancelToken.subscribe(a),i.signal&&(i.signal.aborted?a():i.signal.addEventListener("abort",a)));var Z,K=(Z=/^([-+\w]{1,25})(:?\/\/|:)/.exec(W))&&Z[1]||"";K&&kt.protocols.indexOf(K)===-1?u(new he("Unsupported protocol "+K+":",he.ERR_BAD_REQUEST,i)):x.send(c||null)})}};P.forEach(jo,function(i,l){if(i){try{Object.defineProperty(i,"name",{value:l})}catch{}Object.defineProperty(i,"adapterName",{value:l})}});function zo(i){if(i.cancelToken&&i.cancelToken.throwIfRequested(),i.signal&&i.signal.aborted)throw new Or(null,i)}function xi(i){return zo(i),i.headers=Ot.from(i.headers),i.data=Po.call(i,i.transformRequest),["post","put","patch"].indexOf(i.method)!==-1&&i.headers.setContentType("application/x-www-form-urlencoded",!1),function(l){for(var u,a,c=(l=P.isArray(l)?l:[l]).length,p=0;p<c&&(u=l[p],!(a=P.isString(u)?jo[u.toLowerCase()]:u));p++);if(!a)throw a===!1?new he("Adapter ".concat(u," is not supported by the environment"),"ERR_NOT_SUPPORT"):new Error(P.hasOwnProp(jo,u)?"Adapter '".concat(u,"' is not available in the build"):"Unknown adapter '".concat(u,"'"));if(!P.isFunction(a))throw new TypeError("adapter is not a function");return a}(i.adapter||Ro.adapter)(i).then(function(l){return zo(i),l.data=Po.call(i,i.transformResponse,l),l.headers=Ot.from(l.headers),l},function(l){return mi(l)||(zo(i),l&&l.response&&(l.response.data=Po.call(i,i.transformResponse,l.response),l.response.headers=Ot.from(l.response.headers))),Promise.reject(l)})}var Ei=function(i){return i instanceof Ot?i.toJSON():i};function dn(i,l){l=l||{};var u={};function a(L,_,W){return P.isPlainObject(L)&&P.isPlainObject(_)?P.merge.call({caseless:W},L,_):P.isPlainObject(_)?P.merge({},_):P.isArray(_)?_.slice():_}function c(L,_,W){return P.isUndefined(_)?P.isUndefined(L)?void 0:a(void 0,L,W):a(L,_,W)}function p(L,_){if(!P.isUndefined(_))return a(void 0,_)}function h(L,_){return P.isUndefined(_)?P.isUndefined(L)?void 0:a(void 0,L):a(void 0,_)}function g(L,_,W){return W in l?a(L,_):W in i?a(void 0,L):void 0}var x={url:p,method:p,data:p,baseURL:h,transformRequest:h,transformResponse:h,paramsSerializer:h,timeout:h,timeoutMessage:h,withCredentials:h,adapter:h,responseType:h,xsrfCookieName:h,xsrfHeaderName:h,onUploadProgress:h,onDownloadProgress:h,decompress:h,maxContentLength:h,maxBodyLength:h,beforeRedirect:h,transport:h,httpAgent:h,httpsAgent:h,cancelToken:h,socketPath:h,responseEncoding:h,validateStatus:g,headers:function(L,_){return c(Ei(L),Ei(_),!0)}};return P.forEach(Object.keys(i).concat(Object.keys(l)),function(L){var _=x[L]||c,W=_(i[L],l[L],L);P.isUndefined(W)&&_!==g||(u[L]=W)}),u}function Rr(i){return Rr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Rr(i)}var Mo={};["object","boolean","number","function","string","symbol"].forEach(function(i,l){Mo[i]=function(u){return Rr(u)===i||"a"+(l<1?"n ":" ")+i}});var ki={};Mo.transitional=function(i,l,u){function a(c,p){return"[Axios v1.2.3] Transitional option '"+c+"'"+p+(u?". "+u:"")}return function(c,p,h){if(i===!1)throw new he(a(p," has been removed"+(l?" in "+l:"")),he.ERR_DEPRECATED);return l&&!ki[p]&&(ki[p]=!0,console.warn(a(p," has been deprecated since v"+l+" and will be removed in the near future"))),!i||i(c,p,h)}};const Do={assertOptions:function(i,l,u){if(Rr(i)!=="object")throw new he("options must be an object",he.ERR_BAD_OPTION_VALUE);for(var a=Object.keys(i),c=a.length;c-- >0;){var p=a[c],h=l[p];if(h){var g=i[p],x=g===void 0||h(g,p,i);if(x!==!0)throw new he("option "+p+" must be "+x,he.ERR_BAD_OPTION_VALUE)}else if(u!==!0)throw new he("Unknown option "+p,he.ERR_BAD_OPTION)}},validators:Mo};function Fn(i){return Fn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Fn(i)}function Tc(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(Fn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(Fn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Fn(c)==="symbol"?c:String(c)),a)}var c}var Ft=Do.validators,Pr=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.defaults=a,this.interceptors={request:new di,response:new di}}var l,u;return l=i,(u=[{key:"request",value:function(a,c){typeof a=="string"?(c=c||{}).url=a:c=a||{};var p,h=c=dn(this.defaults,c),g=h.transitional,x=h.paramsSerializer,L=h.headers;g!==void 0&&Do.assertOptions(g,{silentJSONParsing:Ft.transitional(Ft.boolean),forcedJSONParsing:Ft.transitional(Ft.boolean),clarifyTimeoutError:Ft.transitional(Ft.boolean)},!1),x!==void 0&&Do.assertOptions(x,{encode:Ft.function,serialize:Ft.function},!0),c.method=(c.method||this.defaults.method||"get").toLowerCase(),(p=L&&P.merge(L.common,L[c.method]))&&P.forEach(["delete","get","head","post","put","patch","common"],function(Ie){delete L[Ie]}),c.headers=Ot.concat(p,L);var _=[],W=!0;this.interceptors.request.forEach(function(Ie){typeof Ie.runWhen=="function"&&Ie.runWhen(c)===!1||(W=W&&Ie.synchronous,_.unshift(Ie.fulfilled,Ie.rejected))});var Q,G=[];this.interceptors.response.forEach(function(Ie){G.push(Ie.fulfilled,Ie.rejected)});var Z,K=0;if(!W){var oe=[xi.bind(this),void 0];for(oe.unshift.apply(oe,_),oe.push.apply(oe,G),Z=oe.length,Q=Promise.resolve(c);K<Z;)Q=Q.then(oe[K++],oe[K++]);return Q}Z=_.length;var pe=c;for(K=0;K<Z;){var Ye=_[K++],De=_[K++];try{pe=Ye(pe)}catch(Ie){De.call(this,Ie);break}}try{Q=xi.call(this,pe)}catch(Ie){return Promise.reject(Ie)}for(K=0,Z=G.length;K<Z;)Q=Q.then(G[K++],G[K++]);return Q}},{key:"getUri",value:function(a){return ci(gi((a=dn(this.defaults,a)).baseURL,a.url),a.params,a.paramsSerializer)}}])&&Tc(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();P.forEach(["delete","get","head","options"],function(i){Pr.prototype[i]=function(l,u){return this.request(dn(u||{},{method:i,url:l,data:(u||{}).data}))}}),P.forEach(["post","put","patch"],function(i){function l(u){return function(a,c,p){return this.request(dn(p||{},{method:i,headers:u?{"Content-Type":"multipart/form-data"}:{},url:a,data:c}))}}Pr.prototype[i]=l(),Pr.prototype[i+"Form"]=l(!0)});const jr=Pr;function qn(i){return qn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},qn(i)}function wi(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(qn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(qn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),qn(c)==="symbol"?c:String(c)),a)}var c}var Oc=function(){function i(c){if(function(g,x){if(!(g instanceof x))throw new TypeError("Cannot call a class as a function")}(this,i),typeof c!="function")throw new TypeError("executor must be a function.");var p;this.promise=new Promise(function(g){p=g});var h=this;this.promise.then(function(g){if(h._listeners){for(var x=h._listeners.length;x-- >0;)h._listeners[x](g);h._listeners=null}}),this.promise.then=function(g){var x,L=new Promise(function(_){h.subscribe(_),x=_}).then(g);return L.cancel=function(){h.unsubscribe(x)},L},c(function(g,x,L){h.reason||(h.reason=new Or(g,x,L),p(h.reason))})}var l,u,a;return l=i,u=[{key:"throwIfRequested",value:function(){if(this.reason)throw this.reason}},{key:"subscribe",value:function(c){this.reason?c(this.reason):this._listeners?this._listeners.push(c):this._listeners=[c]}},{key:"unsubscribe",value:function(c){if(this._listeners){var p=this._listeners.indexOf(c);p!==-1&&this._listeners.splice(p,1)}}}],a=[{key:"source",value:function(){var c;return{token:new i(function(p){c=p}),cancel:c}}}],u&&wi(l.prototype,u),a&&wi(l,a),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Rc=Oc;function Ci(i,l){(l==null||l>i.length)&&(l=i.length);for(var u=0,a=new Array(l);u<l;u++)a[u]=i[u];return a}var Fo={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Fo).forEach(function(i){var l,u,a=(u=2,function(h){if(Array.isArray(h))return h}(l=i)||function(h,g){var x=h==null?null:typeof Symbol<"u"&&h[Symbol.iterator]||h["@@iterator"];if(x!=null){var L,_,W,Q,G=[],Z=!0,K=!1;try{if(W=(x=x.call(h)).next,g===0){if(Object(x)!==x)return;Z=!1}else for(;!(Z=(L=W.call(x)).done)&&(G.push(L.value),G.length!==g);Z=!0);}catch(oe){K=!0,_=oe}finally{try{if(!Z&&x.return!=null&&(Q=x.return(),Object(Q)!==Q))return}finally{if(K)throw _}}return G}}(l,u)||function(h,g){if(h){if(typeof h=="string")return Ci(h,g);var x=Object.prototype.toString.call(h).slice(8,-1);return x==="Object"&&h.constructor&&(x=h.constructor.name),x==="Map"||x==="Set"?Array.from(h):x==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(x)?Ci(h,g):void 0}}(l,u)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()),c=a[0],p=a[1];Fo[p]=c});const Pc=Fo;var We=function i(l){var u=new jr(l),a=Ue(jr.prototype.request,u);return P.extend(a,jr.prototype,u,{allOwnKeys:!0}),P.extend(a,u,null,{allOwnKeys:!0}),a.create=function(c){return i(dn(l,c))},a}(Ro);We.Axios=jr,We.CanceledError=Or,We.CancelToken=Rc,We.isCancel=mi,We.VERSION="1.2.3",We.toFormData=Lr,We.AxiosError=he,We.Cancel=We.CanceledError,We.all=function(i){return Promise.all(i)},We.spread=function(i){return function(l){return i.apply(null,l)}},We.isAxiosError=function(i){return P.isObject(i)&&i.isAxiosError===!0},We.mergeConfig=dn,We.AxiosHeaders=Ot,We.formToJSON=function(i){return ui(P.isHTMLForm(i)?new FormData(i):i)},We.HttpStatusCode=Pc,We.default=We;const Bi=We,jc={send:function(i){Bi.post(i.url,i.data).then(function(l){var u=l.data;u&&u.code===0?i.success&&i.success(u):i.error&&i.error(u&&u.msg)}).catch(function(l){console.error(l),i.error&&i.error()})},read:function(i){Bi.get(i.url).then(function(l){var u=l.data;u&&u.code===0?i.success&&i.success(u.data.map(function(a){return{time:a[0],type:a[1],color:a[2],author:a[3],text:a[4]}})):i.error&&i.error(u&&u.msg)}).catch(function(l){console.error(l),i.error&&i.error()})}};function qo(i){return qo=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},qo(i)}function zc(i){var l=this;this.lang=i,this.fallbackLang=this.lang.includes("-")?this.lang.split("-")[0]:this.lang,this.tran=function(u){return u=u.toLowerCase(),pn[l.lang]&&pn[l.lang][u]?pn[l.lang][u]:pn[l.fallbackLang]&&pn[l.fallbackLang][u]?pn[l.fallbackLang][u]:No[u]?No[u]:u}}var No={"danmaku-loading":"Danmaku is loading",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Input danmaku, hit Enter","about-author":"About author","dplayer-feedback":"DPlayer feedback","about-dplayer":"About DPlayer",loop:"Loop",speed:"Speed","opacity-danmaku":"Opacity for danmaku",normal:"Normal","please-input-danmaku":"Please input danmaku content!","set-danmaku-color":"Set danmaku color","set-danmaku-type":"Set danmaku type","show-danmaku":"Show danmaku","video-failed":"Video load failed","danmaku-failed":"Danmaku load failed","danmaku-send-failed":"Danmaku send failed","switching-quality":"Switching to %q quality","switched-quality":"Switched to %q quality",ff:"FF %s s",rew:"REW %s s","unlimited-danmaku":"Unlimited danmaku","send-danmaku":"Send danmaku",setting:"Setting",fullscreen:"Full screen","web-fullscreen":"Web full screen",send:"Send",screenshot:"Screenshot",airplay:"AirPlay",chromecast:"ChromeCast",subtitle:"Subtitle",off:"Off","show-subs":"Show subtitle","hide-subs":"Hide subtitle",volume:"Volume",live:"Live","video-info":"Video info"},pn={en:No,"zh-cn":{"danmaku-loading":"弹幕加载中",top:"顶部",bottom:"底部",rolling:"滚动","input-danmaku-enter":"输入弹幕，回车发送","about-author":"关于作者","dplayer-feedback":"播放器意见反馈","about-dplayer":"关于 DPlayer 播放器",loop:"洗脑循环",speed:"速度","opacity-danmaku":"弹幕透明度",normal:"正常","please-input-danmaku":"要输入弹幕内容啊喂！","set-danmaku-color":"设置弹幕颜色","set-danmaku-type":"设置弹幕类型","show-danmaku":"显示弹幕","video-failed":"视频加载失败","danmaku-failed":"弹幕加载失败","danmaku-send-failed":"弹幕发送失败","switching-quality":"正在切换至 %q 画质","switched-quality":"已经切换至 %q 画质",ff:"快进 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"海量弹幕","send-danmaku":"发送弹幕",setting:"设置",fullscreen:"全屏","web-fullscreen":"页面全屏",send:"发送",screenshot:"截图",airplay:"无线投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"关闭","show-subs":"显示字幕","hide-subs":"隐藏字幕",volume:"音量",live:"直播","video-info":"视频统计信息"},"zh-tw":{"danmaku-loading":"彈幕載入中",top:"頂部",bottom:"底部",rolling:"滾動","input-danmaku-enter":"輸入彈幕，Enter 發送","about-author":"關於作者","dplayer-feedback":"播放器意見回饋","about-dplayer":"關於 DPlayer 播放器",loop:"循環播放",speed:"速度","opacity-danmaku":"彈幕透明度",normal:"正常","please-input-danmaku":"請輸入彈幕內容啊！","set-danmaku-color":"設定彈幕顏色","set-danmaku-type":"設定彈幕類型","show-danmaku":"顯示彈幕","video-failed":"影片載入失敗","danmaku-failed":"彈幕載入失敗","danmaku-send-failed":"彈幕發送失敗","switching-quality":"正在切換至 %q 畫質","switched-quality":"已經切換至 %q 畫質",ff:"快進 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"巨量彈幕","send-danmaku":"發送彈幕",setting:"設定",fullscreen:"全螢幕","web-fullscreen":"頁面全螢幕",send:"發送",screenshot:"截圖",airplay:"無線投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"關閉","show-subs":"顯示字幕","hide-subs":"隱藏字幕",volume:"音量",live:"直播","video-info":"影片統計訊息"},"ko-kr":{"danmaku-loading":"Danmaku를 불러오는 중입니다.",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Danmaku를 입력하고 Enter를 누르세요.","about-author":"만든이","dplayer-feedback":"피드백 보내기","about-dplayer":"DPlayer 정보",loop:"반복",speed:"배속","opacity-danmaku":"Danmaku 불투명도",normal:"표준","please-input-danmaku":"Danmaku를 입력하세요!","set-danmaku-color":"Danmaku 색상","set-danmaku-type":"Danmaku 설정","show-danmaku":"Danmaku 표시","video-failed":"비디오를 불러오지 못했습니다.","danmaku-failed":"Danmaku를 불러오지 못했습니다.","danmaku-send-failed":"Danmaku 전송에 실패했습니다.","Switching to":"","Switched to":"","switching-quality":"전환 %q 화질","switched-quality":"전환 됨 %q 화질",ff:"앞으로 %s 초",rew:"뒤로 %s 초","unlimited-danmaku":"끝없는 Danmaku","send-danmaku":"Danmaku 보내기",setting:"설정",fullscreen:"전체 화면","web-fullscreen":"웹 내 전체화면",send:"보내기",screenshot:"화면 캡쳐",airplay:"에어플레이",chromecast:"ChromeCast",subtitle:"부제",off:"끄다","show-subs":"자막 보이기","hide-subs":"자막 숨기기",Volume:"볼륨",live:"생방송","video-info":"비디오 정보"},de:{"danmaku-loading":"Danmaku lädt...",top:"Oben",bottom:"Unten",rolling:"Rollend","input-danmaku-enter":"Drücke Enter nach dem Einfügen vom Danmaku","about-author":"Über den Autor","dplayer-feedback":"DPlayer Feedback","about-dplayer":"Über DPlayer",loop:"Wiederholen",speed:"Geschwindigkeit","opacity-danmaku":"Transparenz für Danmaku",normal:"Normal","please-input-danmaku":"Bitte Danmaku Inhalt eingeben!","set-danmaku-color":"Danmaku Farbe festlegen","set-danmaku-type":"Danmaku Typ festlegen","show-danmaku":"Zeige Danmaku","video-failed":"Das Video konnte nicht geladen werden","danmaku-failed":"Danmaku konnte nicht geladen werden","danmaku-send-failed":"Das senden von Danmaku ist fehgeschlagen","switching-quality":"Wechsle zur %q Qualität","switched-quality":"Zur %q Qualität gewechselt",ff:"%s s Vorwärts",rew:"%s s Zurück","unlimited-danmaku":"Unlimitiertes Danmaku","send-danmaku":"Sende Danmaku",setting:"Einstellungen",fullscreen:"Vollbild","web-fullscreen":"Browser Vollbild",send:"Senden",screenshot:"Screenshot",airplay:"AirPlay","show-subs":"Zeige Untertitel",chromecast:"ChromeCast",subtitle:"Untertitel",off:"Schließung","hide-subs":"Verstecke Untertitel",volume:"Lautstärke",live:"Live","video-info":"Video Info"}},Mc=o(730),Dc=o.n(Mc),Fc=o(74),qc=o.n(Fc),Nc=o(437),Hc=o.n(Nc),Uc=o(644),Wc=o.n(Uc),Yc=o(324),Kc=o.n(Yc),Vc=o(574),Qc=o.n(Vc),$c=o(300),Zc=o.n($c),Jc=o(934),Xc=o.n(Jc),Gc=o(428),ed=o.n(Gc),td=o(807),nd=o.n(td),rd=o(338),od=o.n(rd),ad=o(254),id=o.n(ad),ld=o(965),sd=o.n(ld),cd=o(113),dd=o.n(cd),pd=o(251),ud=o.n(pd),fd=o(410),Ad=o.n(fd),yd=o(182),hd=o.n(yd),md=o(193),bd=o.n(md);const yt={play:Dc(),pause:qc(),volumeUp:Hc(),volumeDown:Wc(),volumeOff:Kc(),full:Qc(),fullWeb:Zc(),setting:Xc(),right:ed(),comment:nd(),commentOff:od(),send:id(),pallette:sd(),camera:dd(),subtitle:Ad(),loading:hd(),airplay:ud(),chromecast:bd()};var gd=o(916),vd=o.n(gd);function Nn(i){return Nn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Nn(i)}function Si(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(Nn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(Nn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Nn(c)==="symbol"?c:String(c)),a)}var c}var xd=function(){function i(c){(function(p,h){if(!(p instanceof h))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=c.container,this.options=c.options,this.index=c.index,this.tran=c.tran,this.init()}var l,u,a;return l=i,a=[{key:"NewNotice",value:function(c,p,h){var g=document.createElement("div");return g.classList.add("dplayer-notice"),g.style.opacity=p,g.innerText=c,h&&(g.id="dplayer-notice-".concat(h)),g}}],(u=[{key:"init",value:function(){this.container.innerHTML=vd()({options:this.options,index:this.index,tran:this.tran,icons:yt,mobile:$.isMobile,video:{current:!0,pic:this.options.video.pic,screenshot:this.options.screenshot,airplay:!(!$.isSafari||$.isChrome)&&this.options.airplay,chromecast:this.options.chromecast,preload:this.options.preload,url:this.options.video.url,subtitle:this.options.subtitle}}),this.volumeBar=this.container.querySelector(".dplayer-volume-bar-inner"),this.volumeBarWrap=this.container.querySelector(".dplayer-volume-bar"),this.volumeBarWrapWrap=this.container.querySelector(".dplayer-volume-bar-wrap"),this.volumeButton=this.container.querySelector(".dplayer-volume"),this.volumeButtonIcon=this.container.querySelector(".dplayer-volume-icon"),this.volumeIcon=this.container.querySelector(".dplayer-volume-icon .dplayer-icon-content"),this.playedBar=this.container.querySelector(".dplayer-played"),this.loadedBar=this.container.querySelector(".dplayer-loaded"),this.playedBarWrap=this.container.querySelector(".dplayer-bar-wrap"),this.playedBarTime=this.container.querySelector(".dplayer-bar-time"),this.danmaku=this.container.querySelector(".dplayer-danmaku"),this.danmakuLoading=this.container.querySelector(".dplayer-danloading"),this.video=this.container.querySelector(".dplayer-video-current"),this.bezel=this.container.querySelector(".dplayer-bezel-icon"),this.playButton=this.container.querySelector(".dplayer-play-icon"),this.mobilePlayButton=this.container.querySelector(".dplayer-mobile-play"),this.videoWrap=this.container.querySelector(".dplayer-video-wrap"),this.controllerMask=this.container.querySelector(".dplayer-controller-mask"),this.ptime=this.container.querySelector(".dplayer-ptime"),this.settingButton=this.container.querySelector(".dplayer-setting-icon"),this.settingBox=this.container.querySelector(".dplayer-setting-box"),this.mask=this.container.querySelector(".dplayer-mask"),this.loop=this.container.querySelector(".dplayer-setting-loop"),this.loopToggle=this.container.querySelector(".dplayer-setting-loop .dplayer-toggle-setting-input"),this.showDanmaku=this.container.querySelector(".dplayer-setting-showdan"),this.showDanmakuToggle=this.container.querySelector(".dplayer-showdan-setting-input"),this.unlimitDanmaku=this.container.querySelector(".dplayer-setting-danunlimit"),this.unlimitDanmakuToggle=this.container.querySelector(".dplayer-danunlimit-setting-input"),this.speed=this.container.querySelector(".dplayer-setting-speed"),this.speedItem=this.container.querySelectorAll(".dplayer-setting-speed-item"),this.danmakuOpacityBar=this.container.querySelector(".dplayer-danmaku-bar-inner"),this.danmakuOpacityBarWrap=this.container.querySelector(".dplayer-danmaku-bar"),this.danmakuOpacityBarWrapWrap=this.container.querySelector(".dplayer-danmaku-bar-wrap"),this.danmakuOpacityBox=this.container.querySelector(".dplayer-setting-danmaku"),this.dtime=this.container.querySelector(".dplayer-dtime"),this.controller=this.container.querySelector(".dplayer-controller"),this.commentInput=this.container.querySelector(".dplayer-comment-input"),this.commentButton=this.container.querySelector(".dplayer-comment-icon"),this.commentSettingBox=this.container.querySelector(".dplayer-comment-setting-box"),this.commentSettingButton=this.container.querySelector(".dplayer-comment-setting-icon"),this.commentSettingFill=this.container.querySelector(".dplayer-comment-setting-icon path"),this.commentSendButton=this.container.querySelector(".dplayer-send-icon"),this.commentSendFill=this.container.querySelector(".dplayer-send-icon path"),this.commentColorSettingBox=this.container.querySelector(".dplayer-comment-setting-color"),this.browserFullButton=this.container.querySelector(".dplayer-full-icon"),this.webFullButton=this.container.querySelector(".dplayer-full-in-icon"),this.menu=this.container.querySelector(".dplayer-menu"),this.menuItem=this.container.querySelectorAll(".dplayer-menu-item"),this.qualityList=this.container.querySelector(".dplayer-quality-list"),this.camareButton=this.container.querySelector(".dplayer-camera-icon"),this.airplayButton=this.container.querySelector(".dplayer-airplay-icon"),this.chromecastButton=this.container.querySelector(".dplayer-chromecast-icon"),this.subtitleButton=this.container.querySelector(".dplayer-subtitle-icon"),this.subtitleButtonInner=this.container.querySelector(".dplayer-subtitle-icon .dplayer-icon-content"),this.subtitlesButton=this.container.querySelector(".dplayer-subtitles-icon"),this.subtitlesBox=this.container.querySelector(".dplayer-subtitles-box"),this.subtitlesItem=this.container.querySelectorAll(".dplayer-subtitles-item"),this.subtitle=this.container.querySelector(".dplayer-subtitle"),this.subtrack=this.container.querySelector(".dplayer-subtrack"),this.qualityButton=this.container.querySelector(".dplayer-quality-icon"),this.barPreview=this.container.querySelector(".dplayer-bar-preview"),this.barWrap=this.container.querySelector(".dplayer-bar-wrap"),this.noticeList=this.container.querySelector(".dplayer-notice-list"),this.infoPanel=this.container.querySelector(".dplayer-info-panel"),this.infoPanelClose=this.container.querySelector(".dplayer-info-panel-close"),this.infoVersion=this.container.querySelector(".dplayer-info-panel-item-version .dplayer-info-panel-item-data"),this.infoFPS=this.container.querySelector(".dplayer-info-panel-item-fps .dplayer-info-panel-item-data"),this.infoType=this.container.querySelector(".dplayer-info-panel-item-type .dplayer-info-panel-item-data"),this.infoUrl=this.container.querySelector(".dplayer-info-panel-item-url .dplayer-info-panel-item-data"),this.infoResolution=this.container.querySelector(".dplayer-info-panel-item-resolution .dplayer-info-panel-item-data"),this.infoDuration=this.container.querySelector(".dplayer-info-panel-item-duration .dplayer-info-panel-item-data"),this.infoDanmakuId=this.container.querySelector(".dplayer-info-panel-item-danmaku-id .dplayer-info-panel-item-data"),this.infoDanmakuApi=this.container.querySelector(".dplayer-info-panel-item-danmaku-api .dplayer-info-panel-item-data"),this.infoDanmakuAmount=this.container.querySelector(".dplayer-info-panel-item-danmaku-amount .dplayer-info-panel-item-data")}}])&&Si(l.prototype,u),a&&Si(l,a),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Li=xd;function un(i){return un=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},un(i)}function Ed(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(un(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(un(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),un(c)==="symbol"?c:String(c)),a)}var c}var kd=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.options=a,this.player=this.options.player,this.container=this.options.container,this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.dan=[],this.showing=!0,this._opacity=this.options.opacity,this.events=this.options.events,this.unlimited=this.options.unlimited,this._measure(""),this.load()}var l,u;return l=i,u=[{key:"load",value:function(){var a,c=this;a=this.options.api.maximum?"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id,"&max=").concat(this.options.api.maximum):"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id);var p=(this.options.api.addition||[]).slice(0);p.push(a),this.events&&this.events.trigger("danmaku_load_start",p),this._readAllEndpoints(p,function(h){c.dan=[].concat.apply([],h).sort(function(g,x){return g.time-x.time}),window.requestAnimationFrame(function(){c.frame()}),c.options.callback(),c.events&&c.events.trigger("danmaku_load_end")})}},{key:"reload",value:function(a){this.options.api=a,this.dan=[],this.clear(),this.load()}},{key:"_readAllEndpoints",value:function(a,c){for(var p=this,h=[],g=0,x=function(_){p.options.apiBackend.read({url:a[_],success:function(W){h[_]=W,++g===a.length&&c(h)},error:function(W){p.options.error(W||p.options.tran("danmaku-failed")),h[_]=[],++g===a.length&&c(h)}})},L=0;L<a.length;++L)x(L)}},{key:"send",value:function(a,c){var p=this,h={token:this.options.api.token,id:this.options.api.id,author:this.options.api.user,time:this.options.time(),text:a.text,color:a.color,type:a.type};this.options.apiBackend.send({url:this.options.api.address+"v3/",data:h,success:c,error:function(x){p.options.error(x||p.options.tran("danmaku-failed"))}}),this.dan.splice(this.danIndex,0,h),this.danIndex++;var g={text:this.htmlEncode(h.text),color:h.color,type:h.type,border:"2px solid ".concat(this.options.borderColor)};this.draw(g),this.events&&this.events.trigger("danmaku_send",h)}},{key:"frame",value:function(){var a=this;if(this.dan.length&&!this.paused&&this.showing){for(var c=this.dan[this.danIndex],p=[];c&&this.options.time()>parseFloat(c.time);)p.push(c),c=this.dan[++this.danIndex];this.draw(p)}window.requestAnimationFrame(function(){a.frame()})}},{key:"opacity",value:function(a){if(a!==void 0){for(var c=this.container.getElementsByClassName("dplayer-danmaku-item"),p=0;p<c.length;p++)c[p].style.opacity=a;this._opacity=a,this.events&&this.events.trigger("danmaku_opacity",this._opacity)}return this._opacity}},{key:"draw",value:function(a){var c=this;if(this.showing){var p=this.options.height,h=this.container.offsetWidth,g=this.container.offsetHeight,x=parseInt(g/p),L=function(K){var oe=K.offsetWidth||parseInt(K.style.width),pe=K.getBoundingClientRect().right||c.container.getBoundingClientRect().right+oe;return c.container.getBoundingClientRect().right-pe},_=function(K){return(h+K)/5},W=function(K,oe,pe){for(var Ye=h/_(pe),De=function(Gt){var An=c.danTunnel[oe][Gt+""];if(!An||!An.length)return c.danTunnel[oe][Gt+""]=[K],K.addEventListener("animationend",function(){c.danTunnel[oe][Gt+""].splice(0,1)}),{v:Gt%x};if(oe!=="right")return"continue";for(var or=0;or<An.length;or++){var Pi=L(An[or])-10;if(Pi<=h-Ye*_(parseInt(An[or].style.width))||Pi<=0)break;if(or===An.length-1)return c.danTunnel[oe][Gt+""].push(K),K.addEventListener("animationend",function(){c.danTunnel[oe][Gt+""].splice(0,1)}),{v:Gt%x}}},Ie=0;c.unlimited||Ie<x;Ie++){var Nt=De(Ie);if(Nt!=="continue"&&un(Nt)==="object")return Nt.v}return-1};Object.prototype.toString.call(a)!=="[object Array]"&&(a=[a]);for(var Q=document.createDocumentFragment(),G=function(){a[Z].type=$.number2Type(a[Z].type),a[Z].color||(a[Z].color=16777215);var K=document.createElement("div");K.classList.add("dplayer-danmaku-item"),K.classList.add("dplayer-danmaku-".concat(a[Z].type)),a[Z].border?K.innerHTML='<span style="border:'.concat(a[Z].border,'">').concat(a[Z].text,"</span>"):K.innerHTML=a[Z].text,K.style.opacity=c._opacity,K.style.color=$.number2Color(a[Z].color),K.addEventListener("animationend",function(){c.container.removeChild(K)});var oe,pe=c._measure(a[Z].text);switch(a[Z].type){case"right":(oe=W(K,a[Z].type,pe))>=0&&(K.style.width=pe+1+"px",K.style.top=p*oe+"px",K.style.transform="translateX(-".concat(h,"px)"));break;case"top":(oe=W(K,a[Z].type))>=0&&(K.style.top=p*oe+"px");break;case"bottom":(oe=W(K,a[Z].type))>=0&&(K.style.bottom=p*oe+"px");break;default:console.error("Can't handled danmaku type: ".concat(a[Z].type))}oe>=0&&(K.classList.add("dplayer-danmaku-move"),K.style.animationDuration=c._danAnimation(a[Z].type),Q.appendChild(K))},Z=0;Z<a.length;Z++)G();return this.container.appendChild(Q),Q}}},{key:"play",value:function(){this.paused=!1}},{key:"pause",value:function(){this.paused=!0}},{key:"_measure",value:function(a){if(!this.context){var c=getComputedStyle(this.container.getElementsByClassName("dplayer-danmaku-item")[0],null);this.context=document.createElement("canvas").getContext("2d"),this.context.font=c.getPropertyValue("font")}return this.context.measureText(a).width}},{key:"seek",value:function(){this.clear();for(var a=0;a<this.dan.length;a++){if(this.dan[a].time>=this.options.time()){this.danIndex=a;break}this.danIndex=this.dan.length}}},{key:"clear",value:function(){this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.options.container.innerHTML="",this.events&&this.events.trigger("danmaku_clear")}},{key:"htmlEncode",value:function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2f;")}},{key:"resize",value:function(){for(var a=this.container.offsetWidth,c=this.container.getElementsByClassName("dplayer-danmaku-item"),p=0;p<c.length;p++)c[p].style.transform="translateX(-".concat(a,"px)")}},{key:"hide",value:function(){this.showing=!1,this.pause(),this.clear(),this.events&&this.events.trigger("danmaku_hide")}},{key:"show",value:function(){this.seek(),this.showing=!0,this.play(),this.events&&this.events.trigger("danmaku_show")}},{key:"unlimit",value:function(a){this.unlimited=a}},{key:"speed",value:function(a){this.options.api.speedRate=a}},{key:"_danAnimation",value:function(a){var c=this.options.api.speedRate||1,p=!!this.player.fullScreen.isFullScreen();return{top:"".concat((p?6:4)/c,"s"),right:"".concat((p?8:5)/c,"s"),bottom:"".concat((p?6:4)/c,"s")}[a]}}],u&&Ed(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const wd=kd;function Hn(i){return Hn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Hn(i)}function Cd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(Hn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(Hn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Hn(c)==="symbol"?c:String(c)),a)}var c}const Bd=function(){function i(){(function(a,c){if(!(a instanceof c))throw new TypeError("Cannot call a class as a function")})(this,i),this.events={},this.videoEvents=["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","mozaudioavailable","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],this.playerEvents=["screenshot","thumbnails_show","thumbnails_hide","danmaku_show","danmaku_hide","danmaku_clear","danmaku_loaded","danmaku_send","danmaku_opacity","contextmenu_show","contextmenu_hide","notice_show","notice_hide","quality_start","quality_end","destroy","resize","fullscreen","fullscreen_cancel","webfullscreen","webfullscreen_cancel","subtitle_show","subtitle_hide","subtitle_change"]}var l,u;return l=i,(u=[{key:"on",value:function(a,c){this.type(a)&&typeof c=="function"&&(this.events[a]||(this.events[a]=[]),this.events[a].push(c))}},{key:"trigger",value:function(a,c){if(this.events[a]&&this.events[a].length)for(var p=0;p<this.events[a].length;p++)this.events[a][p](c)}},{key:"type",value:function(a){return this.playerEvents.indexOf(a)!==-1?"player":this.videoEvents.indexOf(a)!==-1?"video":(console.error("Unknown event name: ".concat(a)),null)}}])&&Cd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();function Un(i){return Un=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Un(i)}function Sd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(Un(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(Un(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Un(c)==="symbol"?c:String(c)),a)}var c}var Ld=function(){function i(a){var c=this;(function(p,h){if(!(p instanceof h))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.lastScrollPosition={left:0,top:0},this.player.events.on("webfullscreen",function(){c.player.resize()}),this.player.events.on("webfullscreen_cancel",function(){c.player.resize(),$.setScrollPosition(c.lastScrollPosition)}),this.fullscreenchange=function(){c.player.resize(),c.isFullScreen("browser")?c.player.events.trigger("fullscreen"):($.setScrollPosition(c.lastScrollPosition),c.player.events.trigger("fullscreen_cancel"))},this.docfullscreenchange=function(){var p=document.fullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;p&&p!==c.player.container||(c.player.resize(),p?c.player.events.trigger("fullscreen"):($.setScrollPosition(c.lastScrollPosition),c.player.events.trigger("fullscreen_cancel")))},/Firefox/.test(navigator.userAgent)?(document.addEventListener("mozfullscreenchange",this.docfullscreenchange),document.addEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.addEventListener("fullscreenchange",this.fullscreenchange),this.player.container.addEventListener("webkitfullscreenchange",this.fullscreenchange),document.addEventListener("msfullscreenchange",this.docfullscreenchange),document.addEventListener("MSFullscreenChange",this.docfullscreenchange))}var l,u;return l=i,u=[{key:"isFullScreen",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(a){case"browser":return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;case"web":return this.player.container.classList.contains("dplayer-fulled")}}},{key:"request",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser",c=a==="browser"?"web":"browser",p=this.isFullScreen(c);switch(p||(this.lastScrollPosition=$.getScrollPosition()),a){case"browser":this.player.container.requestFullscreen?this.player.container.requestFullscreen():this.player.container.mozRequestFullScreen?this.player.container.mozRequestFullScreen():this.player.container.webkitRequestFullscreen?this.player.container.webkitRequestFullscreen():this.player.video.webkitEnterFullscreen?this.player.video.webkitEnterFullscreen():this.player.video.webkitEnterFullScreen?this.player.video.webkitEnterFullScreen():this.player.container.msRequestFullscreen&&this.player.container.msRequestFullscreen();break;case"web":this.player.container.classList.add("dplayer-fulled"),document.body.classList.add("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen")}p&&this.cancel(c)}},{key:"cancel",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(a){case"browser":document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.webkitCancelFullscreen?document.webkitCancelFullscreen():document.msCancelFullScreen?document.msCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen();break;case"web":this.player.container.classList.remove("dplayer-fulled"),document.body.classList.remove("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen_cancel")}}},{key:"toggle",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";this.isFullScreen(a)?this.cancel(a):this.request(a)}},{key:"destroy",value:function(){/Firefox/.test(navigator.userAgent)?(document.removeEventListener("mozfullscreenchange",this.docfullscreenchange),document.removeEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.removeEventListener("fullscreenchange",this.fullscreenchange),this.player.container.removeEventListener("webkitfullscreenchange",this.fullscreenchange),document.removeEventListener("msfullscreenchange",this.docfullscreenchange),document.removeEventListener("MSFullscreenChange",this.docfullscreenchange))}}],u&&Sd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Id=Ld;function Wn(i){return Wn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Wn(i)}function _d(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(Wn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(Wn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Wn(c)==="symbol"?c:String(c)),a)}var c}var Td=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.storageName={opacity:"dplayer-danmaku-opacity",volume:"dplayer-volume",unlimited:"dplayer-danmaku-unlimited",danmaku:"dplayer-danmaku-show",subtitle:"dplayer-subtitle-show"},this.default={opacity:.7,volume:a.options.hasOwnProperty("volume")?a.options.volume:.7,unlimited:(a.options.danmaku&&a.options.danmaku.unlimited?1:0)||0,danmaku:1,subtitle:1},this.data={},this.init()}var l,u;return l=i,(u=[{key:"init",value:function(){for(var a in this.storageName){var c=this.storageName[a];this.data[a]=parseFloat($.storage.get(c)||this.default[a])}}},{key:"get",value:function(a){return this.data[a]}},{key:"set",value:function(a,c){this.data[a]=c,$.storage.set(this.storageName[a],c)}}])&&_d(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Od=Td;function Yn(i){return Yn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Yn(i)}function Rd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(Yn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(Yn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Yn(c)==="symbol"?c:String(c)),a)}var c}var Pd=function(){function i(a,c,p,h){(function(g,x){if(!(g instanceof x))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a,this.video=c,this.options=p,this.events=h,this.init()}var l,u;return l=i,u=[{key:"init",value:function(){var a=this;if(this.container.style.fontSize=this.options.fontSize,this.container.style.bottom=this.options.bottom,this.container.style.color=this.options.color,this.video.textTracks&&this.video.textTracks[0]){var c=this.video.textTracks[0];c.oncuechange=function(){var p=c.activeCues[c.activeCues.length-1];if(a.container.innerHTML="",p){var h=document.createElement("div");h.appendChild(p.getCueAsHTML());var g=h.innerHTML.split(/\r?\n/).map(function(x){return"<p>".concat(x,"</p>")}).join("");a.container.innerHTML=g}a.events.trigger("subtitle_change")}}}},{key:"show",value:function(){this.container.classList.remove("dplayer-subtitle-hide"),this.events.trigger("subtitle_show")}},{key:"hide",value:function(){this.container.classList.add("dplayer-subtitle-hide"),this.events.trigger("subtitle_hide")}},{key:"toggle",value:function(){this.container.classList.contains("dplayer-subtitle-hide")?this.show():this.hide()}}],u&&Rd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const jd=Pd;function Kn(i){return Kn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Kn(i)}function zd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(Kn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(Kn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Kn(c)==="symbol"?c:String(c)),a)}var c}var Md=function(){function i(a){var c=this;(function(x,L){if(!(x instanceof L))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.player.template.mask.addEventListener("click",function(){c.hide()}),this.player.template.subtitlesButton.addEventListener("click",function(){c.adaptiveHeight(),c.show()});for(var p=this.player.template.subtitlesItem.length-1,h=function(x){c.player.template.subtitlesItem[x].addEventListener("click",function(){c.hide(),c.player.options.subtitle.index!==x&&(c.player.template.subtitle.innerHTML="<p></p>",c.player.template.subtrack.src=c.player.template.subtitlesItem[x].dataset.subtitle,c.player.options.subtitle.index=x,c.player.template.subtitle.classList.contains("dplayer-subtitle-hide")&&c.subContainerShow())})},g=0;g<p;g++)h(g);this.player.template.subtitlesItem[p].addEventListener("click",function(){c.hide(),c.player.options.subtitle.index!==p&&(c.player.template.subtitle.innerHTML="<p></p>",c.player.template.subtrack.src="",c.player.options.subtitle.index=p,c.subContainerHide())})}var l,u;return l=i,(u=[{key:"subContainerShow",value:function(){this.player.template.subtitle.classList.remove("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_show")}},{key:"subContainerHide",value:function(){this.player.template.subtitle.classList.add("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_hide")}},{key:"hide",value:function(){this.player.template.subtitlesBox.classList.remove("dplayer-subtitles-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.subtitlesBox.classList.add("dplayer-subtitles-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}},{key:"adaptiveHeight",value:function(){var a=30*this.player.template.subtitlesItem.length+14,c=.8*this.player.template.videoWrap.offsetHeight;a>=c-50?(this.player.template.subtitlesBox.style.bottom="8px",this.player.template.subtitlesBox.style["max-height"]=c-8+"px"):(this.player.template.subtitlesBox.style.bottom="50px",this.player.template.subtitlesBox.style["max-height"]=c-50+"px")}}])&&zd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Dd=Md;function Vn(i){return Vn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Vn(i)}function Fd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(Vn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(Vn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Vn(c)==="symbol"?c:String(c)),a)}var c}var qd=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.elements={},this.elements.volume=a.volumeBar,this.elements.played=a.playedBar,this.elements.loaded=a.loadedBar,this.elements.danmaku=a.danmakuOpacityBar}var l,u;return l=i,(u=[{key:"set",value:function(a,c,p){c=Math.max(c,0),c=Math.min(c,1),this.elements[a].style[p]=100*c+"%"}},{key:"get",value:function(a){return parseFloat(this.elements[a].style.width)/100}}])&&Fd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Nd=qd;function Qn(i){return Qn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Qn(i)}function Hd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(Qn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(Qn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Qn(c)==="symbol"?c:String(c)),a)}var c}var Ud=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(c){window.setTimeout(c,1e3/60)},this.types=["loading","info","fps"],this.init()}var l,u;return l=i,(u=[{key:"init",value:function(){var a=this;this.types.map(function(c){return c!=="fps"&&a["init".concat(c,"Checker")](),c})}},{key:"initloadingChecker",value:function(){var a=this,c=0,p=0,h=!1;this.loadingChecker=setInterval(function(){a.enableloadingChecker&&(p=a.player.video.currentTime,h||p!==c||a.player.video.paused||(a.player.container.classList.add("dplayer-loading"),h=!0),h&&p>c&&!a.player.video.paused&&(a.player.container.classList.remove("dplayer-loading"),h=!1),c=p)},100)}},{key:"initfpsChecker",value:function(){var a=this;window.requestAnimationFrame(function(){if(a.enablefpsChecker)if(a.initfpsChecker(),a.fpsStart){a.fpsIndex++;var c=new Date;c-a.fpsStart>1e3&&(a.player.infoPanel.fps(a.fpsIndex/(c-a.fpsStart)*1e3),a.fpsStart=new Date,a.fpsIndex=0)}else a.fpsStart=new Date,a.fpsIndex=0;else a.fpsStart=0,a.fpsIndex=0})}},{key:"initinfoChecker",value:function(){var a=this;this.infoChecker=setInterval(function(){a.enableinfoChecker&&a.player.infoPanel.update()},1e3)}},{key:"enable",value:function(a){this["enable".concat(a,"Checker")]=!0,a==="fps"&&this.initfpsChecker()}},{key:"disable",value:function(a){this["enable".concat(a,"Checker")]=!1}},{key:"destroy",value:function(){var a=this;this.types.map(function(c){return a["enable".concat(c,"Checker")]=!1,a["".concat(c,"Checker")]&&clearInterval(a["".concat(c,"Checker")]),c})}}])&&Hd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Wd=Ud;function $n(i){return $n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},$n(i)}function Yd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if($n(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if($n(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),$n(c)==="symbol"?c:String(c)),a)}var c}const Kd=function(){function i(a){var c=this;(function(p,h){if(!(p instanceof h))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a,this.container.addEventListener("animationend",function(){c.container.classList.remove("dplayer-bezel-transition")})}var l,u;return l=i,(u=[{key:"switch",value:function(a){this.container.innerHTML=a,this.container.classList.add("dplayer-bezel-transition")}}])&&Yd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();function Zn(i){return Zn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Zn(i)}function Vd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(Zn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(Zn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Zn(c)==="symbol"?c:String(c)),a)}var c}var Qd=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a.container,this.barWidth=a.barWidth,this.container.style.backgroundImage="url('".concat(a.url,"')"),this.events=a.events}var l,u;return l=i,(u=[{key:"resize",value:function(a,c,p){this.container.style.width="".concat(a,"px"),this.container.style.height="".concat(c,"px"),this.container.style.top="".concat(2-c,"px"),this.barWidth=p}},{key:"show",value:function(){this.container.style.display="block",this.events&&this.events.trigger("thumbnails_show")}},{key:"move",value:function(a){this.container.style.backgroundPosition="-".concat(160*(Math.ceil(a/this.barWidth*100)-1),"px 0"),this.container.style.left="".concat(Math.min(Math.max(a-this.container.offsetWidth/2,-10),this.barWidth-150),"px")}},{key:"hide",value:function(){this.container.style.display="none",this.events&&this.events.trigger("thumbnails_hide")}}])&&Vd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const $d=Qd;function Jn(i){return Jn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Jn(i)}function Zd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(Jn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(Jn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Jn(c)==="symbol"?c:String(c)),a)}var c}var qt,Ii=!0,Ho=!1,Jd=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.autoHideTimer=0,$.isMobile||(this.setAutoHideHandler=this.setAutoHide.bind(this),this.player.container.addEventListener("mousemove",this.setAutoHideHandler),this.player.container.addEventListener("click",this.setAutoHideHandler),this.player.on("play",this.setAutoHideHandler),this.player.on("pause",this.setAutoHideHandler)),this.initPlayButton(),this.initThumbnails(),this.initPlayedBar(),this.initFullButton(),this.initQualityButton(),this.initScreenshotButton(),this.player.options.subtitle&&typeof this.player.options.subtitle.url=="string"&&this.initSubtitleButton(),this.initHighlights(),this.initAirplayButton(),this.initChromecastButton(),$.isMobile||this.initVolumeButton()}var l,u;return l=i,(u=[{key:"initPlayButton",value:function(){var a=this;this.player.template.playButton.addEventListener("click",function(){a.player.toggle()}),this.player.template.mobilePlayButton.addEventListener("click",function(){a.player.toggle()}),$.isMobile?(this.player.template.videoWrap.addEventListener("click",function(){a.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){a.toggle()})):this.player.options.preventClickToggle||(this.player.template.videoWrap.addEventListener("click",function(){a.player.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){a.player.toggle()}))}},{key:"initHighlights",value:function(){var a=this;this.player.on("durationchange",function(){if(a.player.video.duration!==1&&a.player.video.duration!==1/0&&a.player.options.highlight){var c=a.player.template.playedBarWrap.querySelectorAll(".dplayer-highlight");[].slice.call(c,0).forEach(function(g){a.player.template.playedBarWrap.removeChild(g)});for(var p=0;p<a.player.options.highlight.length;p++)if(a.player.options.highlight[p].text&&a.player.options.highlight[p].time){var h=document.createElement("div");h.classList.add("dplayer-highlight"),h.style.left=a.player.options.highlight[p].time/a.player.video.duration*100+"%",h.innerHTML='<span class="dplayer-highlight-text">'+a.player.options.highlight[p].text+"</span>",a.player.template.playedBarWrap.insertBefore(h,a.player.template.playedBarTime)}}})}},{key:"initThumbnails",value:function(){var a=this;this.player.options.video.thumbnails&&(this.thumbnails=new $d({container:this.player.template.barPreview,barWidth:this.player.template.barWrap.offsetWidth,url:this.player.options.video.thumbnails,events:this.player.events}),this.player.on("loadedmetadata",function(){a.thumbnails.resize(160,a.player.video.videoHeight/a.player.video.videoWidth*160,a.player.template.barWrap.offsetWidth)}))}},{key:"initPlayedBar",value:function(){var a=this,c=function(h){var g=((h.clientX||h.changedTouches[0].clientX)-$.getBoundingClientRectViewLeft(a.player.template.playedBarWrap))/a.player.template.playedBarWrap.clientWidth;g=Math.max(g,0),g=Math.min(g,1),a.player.bar.set("played",g,"width"),a.player.template.ptime.innerHTML=$.secondToTime(g*a.player.video.duration)},p=function h(g){document.removeEventListener($.nameMap.dragEnd,h),document.removeEventListener($.nameMap.dragMove,c);var x=((g.clientX||g.changedTouches[0].clientX)-$.getBoundingClientRectViewLeft(a.player.template.playedBarWrap))/a.player.template.playedBarWrap.clientWidth;x=Math.max(x,0),x=Math.min(x,1),a.player.bar.set("played",x,"width"),a.player.seek(a.player.bar.get("played")*a.player.video.duration),a.player.timer.enable("progress")};this.player.template.playedBarWrap.addEventListener($.nameMap.dragStart,function(){a.player.timer.disable("progress"),document.addEventListener($.nameMap.dragMove,c),document.addEventListener($.nameMap.dragEnd,p)}),this.player.template.playedBarWrap.addEventListener($.nameMap.dragMove,function(h){if(a.player.video.duration){var g=a.player.template.playedBarWrap.getBoundingClientRect().left,x=(h.clientX||h.changedTouches[0].clientX)-g;if(x<0||x>a.player.template.playedBarWrap.offsetWidth)return;var L=a.player.video.duration*(x/a.player.template.playedBarWrap.offsetWidth);$.isMobile&&a.thumbnails&&a.thumbnails.show(),a.thumbnails&&a.thumbnails.move(x),a.player.template.playedBarTime.style.left="".concat(x-(L>=3600?25:20),"px"),a.player.template.playedBarTime.innerText=$.secondToTime(L),a.player.template.playedBarTime.classList.remove("hidden")}}),this.player.template.playedBarWrap.addEventListener($.nameMap.dragEnd,function(){$.isMobile&&a.thumbnails&&a.thumbnails.hide()}),$.isMobile||(this.player.template.playedBarWrap.addEventListener("mouseenter",function(){a.player.video.duration&&(a.thumbnails&&a.thumbnails.show(),a.player.template.playedBarTime.classList.remove("hidden"))}),this.player.template.playedBarWrap.addEventListener("mouseleave",function(){a.player.video.duration&&(a.thumbnails&&a.thumbnails.hide(),a.player.template.playedBarTime.classList.add("hidden"))}))}},{key:"initFullButton",value:function(){var a=this;this.player.template.browserFullButton.addEventListener("click",function(){a.player.fullScreen.toggle("browser")}),this.player.template.webFullButton.addEventListener("click",function(){a.player.fullScreen.toggle("web")})}},{key:"initVolumeButton",value:function(){var a=this,c=function(h){var g=h||window.event,x=((g.clientX||g.changedTouches[0].clientX)-$.getBoundingClientRectViewLeft(a.player.template.volumeBarWrap)-5.5)/35;a.player.volume(x)},p=function h(){document.removeEventListener($.nameMap.dragEnd,h),document.removeEventListener($.nameMap.dragMove,c),a.player.template.volumeButton.classList.remove("dplayer-volume-active")};this.player.template.volumeBarWrapWrap.addEventListener("click",function(h){var g=h||window.event,x=((g.clientX||g.changedTouches[0].clientX)-$.getBoundingClientRectViewLeft(a.player.template.volumeBarWrap)-5.5)/35;a.player.volume(x)}),this.player.template.volumeBarWrapWrap.addEventListener($.nameMap.dragStart,function(){document.addEventListener($.nameMap.dragMove,c),document.addEventListener($.nameMap.dragEnd,p),a.player.template.volumeButton.classList.add("dplayer-volume-active")}),this.player.template.volumeButtonIcon.addEventListener("click",function(){a.player.video.muted?(a.player.video.muted=!1,a.player.switchVolumeIcon(),a.player.bar.set("volume",a.player.volume(),"width")):(a.player.video.muted=!0,a.player.template.volumeIcon.innerHTML=yt.volumeOff,a.player.bar.set("volume",0,"width"))})}},{key:"initQualityButton",value:function(){var a=this;this.player.options.video.quality&&this.player.template.qualityList.addEventListener("click",function(c){c.target.classList.contains("dplayer-quality-item")&&a.player.switchQuality(c.target.dataset.index)})}},{key:"initScreenshotButton",value:function(){var a=this;this.player.options.screenshot&&this.player.template.camareButton.addEventListener("click",function(){var c,p=document.createElement("canvas");p.width=a.player.video.videoWidth,p.height=a.player.video.videoHeight,p.getContext("2d").drawImage(a.player.video,0,0,p.width,p.height),p.toBlob(function(h){c=URL.createObjectURL(h);var g=document.createElement("a");g.href=c,g.download="DPlayer.png",g.style.display="none",document.body.appendChild(g),g.click(),document.body.removeChild(g),URL.revokeObjectURL(c),a.player.events.trigger("screenshot",c)})})}},{key:"initAirplayButton",value:function(){this.player.options.airplay&&(window.WebKitPlaybackTargetAvailabilityEvent?this.player.video.addEventListener("webkitplaybacktargetavailabilitychanged",function(a){a.availability==="available"?this.template.airplayButton.disable=!1:this.template.airplayButton.disable=!0,this.template.airplayButton.addEventListener("click",function(){this.video.webkitShowPlaybackTargetPicker()}.bind(this))}.bind(this.player)):this.player.template.airplayButton.style.display="none")}},{key:"initChromecast",value:function(){var a=window.document.createElement("script");a.setAttribute("type","text/javascript"),a.setAttribute("src","https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"),window.document.body.appendChild(a),window.__onGCastApiAvailable=function(c){if(c){var p=new(qt=window.chrome.cast).SessionRequest(qt.media.DEFAULT_MEDIA_RECEIVER_APP_ID),h=new qt.ApiConfig(p,function(){},function(g){g===qt.ReceiverAvailability.AVAILABLE&&console.log("chromecast: ",g)});qt.initialize(h,function(){})}}}},{key:"initChromecastButton",value:function(){var a=this;if(this.player.options.chromecast){Ii&&(Ii=!1,this.initChromecast());var c=function(h,g){a.currentMedia=g},p=function(h){console.error("Error launching media",h)};this.player.template.chromecastButton.addEventListener("click",function(){Ho?(Ho=!1,a.currentMedia.stop(),a.session.stop(),a.initChromecast()):(Ho=!0,qt.requestSession(function(h){var g,x,L;a.session=h,g=a.player.options.video.url,x=new qt.media.MediaInfo(g),L=new qt.media.LoadRequest(x),a.session?a.session.loadMedia(L,c.bind(a,"loadMedia"),p).play():window.open(g)},function(h){h.code==="cancel"?a.session=void 0:console.error("Error selecting a cast device",h)}))})}}},{key:"initSubtitleButton",value:function(){var a=this;this.player.events.on("subtitle_show",function(){a.player.template.subtitleButton.dataset.balloon=a.player.tran("hide-subs"),a.player.template.subtitleButtonInner.style.opacity="",a.player.user.set("subtitle",1)}),this.player.events.on("subtitle_hide",function(){a.player.template.subtitleButton.dataset.balloon=a.player.tran("show-subs"),a.player.template.subtitleButtonInner.style.opacity="0.4",a.player.user.set("subtitle",0)}),this.player.template.subtitleButton.addEventListener("click",function(){a.player.subtitle.toggle()})}},{key:"setAutoHide",value:function(){var a=this;this.show(),clearTimeout(this.autoHideTimer),this.autoHideTimer=setTimeout(function(){!a.player.video.played.length||a.player.paused||a.disableAutoHide||a.hide()},3e3)}},{key:"show",value:function(){this.player.container.classList.remove("dplayer-hide-controller")}},{key:"hide",value:function(){this.player.container.classList.add("dplayer-hide-controller"),this.player.setting.hide(),this.player.comment&&this.player.comment.hide()}},{key:"isShow",value:function(){return!this.player.container.classList.contains("dplayer-hide-controller")}},{key:"toggle",value:function(){this.isShow()?this.hide():this.show()}},{key:"destroy",value:function(){$.isMobile||(this.player.container.removeEventListener("mousemove",this.setAutoHideHandler),this.player.container.removeEventListener("click",this.setAutoHideHandler)),clearTimeout(this.autoHideTimer)}}])&&Zd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Xd=Jd;function Xn(i){return Xn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Xn(i)}function Gd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(Xn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(Xn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Xn(c)==="symbol"?c:String(c)),a)}var c}var ep=function(){function i(a){var c=this;(function(L,_){if(!(L instanceof _))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.player.template.mask.addEventListener("click",function(){c.hide()}),this.player.template.settingButton.addEventListener("click",function(){c.show()}),this.loop=this.player.options.loop,this.player.template.loopToggle.checked=this.loop,this.player.template.loop.addEventListener("click",function(){c.player.template.loopToggle.checked=!c.player.template.loopToggle.checked,c.player.template.loopToggle.checked?c.loop=!0:c.loop=!1,c.hide()}),this.showDanmaku=this.player.user.get("danmaku"),this.showDanmaku||this.player.danmaku&&this.player.danmaku.hide(),this.player.template.showDanmakuToggle.checked=this.showDanmaku,this.player.template.showDanmaku.addEventListener("click",function(){c.player.template.showDanmakuToggle.checked=!c.player.template.showDanmakuToggle.checked,c.player.template.showDanmakuToggle.checked?(c.showDanmaku=!0,c.player.danmaku.show()):(c.showDanmaku=!1,c.player.danmaku.hide()),c.player.user.set("danmaku",c.showDanmaku?1:0),c.hide()}),this.unlimitDanmaku=this.player.user.get("unlimited"),this.player.template.unlimitDanmakuToggle.checked=this.unlimitDanmaku,this.player.template.unlimitDanmaku.addEventListener("click",function(){c.player.template.unlimitDanmakuToggle.checked=!c.player.template.unlimitDanmakuToggle.checked,c.player.template.unlimitDanmakuToggle.checked?(c.unlimitDanmaku=!0,c.player.danmaku.unlimit(!0)):(c.unlimitDanmaku=!1,c.player.danmaku.unlimit(!1)),c.player.user.set("unlimited",c.unlimitDanmaku?1:0),c.hide()}),this.player.template.speed.addEventListener("click",function(){c.player.template.settingBox.classList.add("dplayer-setting-box-narrow"),c.player.template.settingBox.classList.add("dplayer-setting-box-speed")});for(var p=function(L){c.player.template.speedItem[L].addEventListener("click",function(){c.player.speed(c.player.template.speedItem[L].dataset.speed),c.hide()})},h=0;h<this.player.template.speedItem.length;h++)p(h);if(this.player.danmaku){this.player.on("danmaku_opacity",function(L){c.player.bar.set("danmaku",L,"width"),c.player.user.set("opacity",L)}),this.player.danmaku.opacity(this.player.user.get("opacity"));var g=function(L){var _=L||window.event,W=((_.clientX||_.changedTouches[0].clientX)-$.getBoundingClientRectViewLeft(c.player.template.danmakuOpacityBarWrap))/130;W=Math.max(W,0),W=Math.min(W,1),c.player.danmaku.opacity(W)},x=function L(){document.removeEventListener($.nameMap.dragEnd,L),document.removeEventListener($.nameMap.dragMove,g),c.player.template.danmakuOpacityBox.classList.remove("dplayer-setting-danmaku-active")};this.player.template.danmakuOpacityBarWrapWrap.addEventListener("click",function(L){var _=L||window.event,W=((_.clientX||_.changedTouches[0].clientX)-$.getBoundingClientRectViewLeft(c.player.template.danmakuOpacityBarWrap))/130;W=Math.max(W,0),W=Math.min(W,1),c.player.danmaku.opacity(W)}),this.player.template.danmakuOpacityBarWrapWrap.addEventListener($.nameMap.dragStart,function(){document.addEventListener($.nameMap.dragMove,g),document.addEventListener($.nameMap.dragEnd,x),c.player.template.danmakuOpacityBox.classList.add("dplayer-setting-danmaku-active")})}}var l,u;return l=i,(u=[{key:"hide",value:function(){var a=this;this.player.template.settingBox.classList.remove("dplayer-setting-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),setTimeout(function(){a.player.template.settingBox.classList.remove("dplayer-setting-box-narrow"),a.player.template.settingBox.classList.remove("dplayer-setting-box-speed")},300),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.settingBox.classList.add("dplayer-setting-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}}])&&Gd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const tp=ep;function Gn(i){return Gn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Gn(i)}function np(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(Gn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(Gn(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Gn(c)==="symbol"?c:String(c)),a)}var c}var rp=function(){function i(a){var c=this;(function(p,h){if(!(p instanceof h))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.player.template.mask.addEventListener("click",function(){c.hide()}),this.player.template.commentButton.addEventListener("click",function(){c.show()}),this.player.template.commentSettingButton.addEventListener("click",function(){c.toggleSetting()}),this.player.template.commentColorSettingBox.addEventListener("click",function(){if(c.player.template.commentColorSettingBox.querySelector("input:checked+span")){var p=c.player.template.commentColorSettingBox.querySelector("input:checked").value;c.player.template.commentSettingFill.style.fill=p,c.player.template.commentInput.style.color=p,c.player.template.commentSendFill.style.fill=p}}),this.player.template.commentInput.addEventListener("click",function(){c.hideSetting()}),this.player.template.commentInput.addEventListener("keydown",function(p){(p||window.event).keyCode===13&&c.send()}),this.player.template.commentSendButton.addEventListener("click",function(){c.send()})}var l,u;return l=i,(u=[{key:"show",value:function(){this.player.controller.disableAutoHide=!0,this.player.template.controller.classList.add("dplayer-controller-comment"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.container.classList.add("dplayer-show-controller"),this.player.template.commentInput.focus()}},{key:"hide",value:function(){this.player.template.controller.classList.remove("dplayer-controller-comment"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.container.classList.remove("dplayer-show-controller"),this.player.controller.disableAutoHide=!1,this.hideSetting()}},{key:"showSetting",value:function(){this.player.template.commentSettingBox.classList.add("dplayer-comment-setting-open")}},{key:"hideSetting",value:function(){this.player.template.commentSettingBox.classList.remove("dplayer-comment-setting-open")}},{key:"toggleSetting",value:function(){this.player.template.commentSettingBox.classList.contains("dplayer-comment-setting-open")?this.hideSetting():this.showSetting()}},{key:"send",value:function(){var a=this;this.player.template.commentInput.blur(),this.player.template.commentInput.value.replace(/^\s+|\s+$/g,"")?this.player.danmaku.send({text:this.player.template.commentInput.value,color:$.color2Number(this.player.container.querySelector(".dplayer-comment-setting-color input:checked").value),type:parseInt(this.player.container.querySelector(".dplayer-comment-setting-type input:checked").value)},function(){a.player.template.commentInput.value="",a.hide()}):this.player.notice(this.player.tran("please-input-danmaku"))}}])&&np(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const op=rp;function er(i){return er=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},er(i)}function ap(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(er(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(er(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),er(c)==="symbol"?c:String(c)),a)}var c}var ip=function(){function i(a){(function(c,p){if(!(c instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.doHotKeyHandler=this.doHotKey.bind(this),this.cancelFullScreenHandler=this.cancelFullScreen.bind(this),this.player.options.hotkey&&document.addEventListener("keydown",this.doHotKeyHandler),document.addEventListener("keydown",this.cancelFullScreenHandler)}var l,u;return l=i,(u=[{key:"doHotKey",value:function(a){if(this.player.focus){var c=document.activeElement.tagName.toUpperCase(),p=document.activeElement.getAttribute("contenteditable");if(c!=="INPUT"&&c!=="TEXTAREA"&&p!==""&&p!=="true"){var h,g=a||window.event;switch(g.keyCode){case 32:g.preventDefault(),this.player.toggle();break;case 37:if(g.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime-5),this.player.controller.setAutoHide();break;case 39:if(g.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime+5),this.player.controller.setAutoHide();break;case 38:g.preventDefault(),h=this.player.volume()+.1,this.player.volume(h);break;case 40:g.preventDefault(),h=this.player.volume()-.1,this.player.volume(h)}}}}},{key:"cancelFullScreen",value:function(a){(a||window.event).keyCode===27&&this.player.fullScreen.isFullScreen("web")&&this.player.fullScreen.cancel("web")}},{key:"destroy",value:function(){this.player.options.hotkey&&document.removeEventListener("keydown",this.doHotKeyHandler),document.removeEventListener("keydown",this.cancelFullScreenHandler)}}])&&ap(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const lp=ip;function tr(i){return tr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},tr(i)}function sp(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(tr(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(tr(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),tr(c)==="symbol"?c:String(c)),a)}var c}var cp=function(){function i(a){var c=this;(function(p,h){if(!(p instanceof h))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.shown=!1,Array.prototype.slice.call(this.player.template.menuItem).forEach(function(p,h){c.player.options.contextmenu[h].click&&p.addEventListener("click",function(){c.player.options.contextmenu[h].click(c.player),c.hide()})}),this.contextmenuHandler=function(p){if(c.shown)c.hide();else{var h=p||window.event;h.preventDefault();var g=c.player.container.getBoundingClientRect();c.show(h.clientX-g.left,h.clientY-g.top),c.player.template.mask.addEventListener("click",function(){c.hide()})}},this.player.container.addEventListener("contextmenu",this.contextmenuHandler)}var l,u;return l=i,(u=[{key:"show",value:function(a,c){this.player.template.menu.classList.add("dplayer-menu-show");var p=this.player.container.getBoundingClientRect();a+this.player.template.menu.offsetWidth>=p.width?(this.player.template.menu.style.right=p.width-a+"px",this.player.template.menu.style.left="initial"):(this.player.template.menu.style.left=a+"px",this.player.template.menu.style.right="initial"),c+this.player.template.menu.offsetHeight>=p.height?(this.player.template.menu.style.bottom=p.height-c+"px",this.player.template.menu.style.top="initial"):(this.player.template.menu.style.top=c+"px",this.player.template.menu.style.bottom="initial"),this.player.template.mask.classList.add("dplayer-mask-show"),this.shown=!0,this.player.events.trigger("contextmenu_show")}},{key:"hide",value:function(){this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.template.menu.classList.remove("dplayer-menu-show"),this.shown=!1,this.player.events.trigger("contextmenu_hide")}},{key:"destroy",value:function(){this.player.container.removeEventListener("contextmenu",this.contextmenuHandler)}}])&&sp(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const dp=cp;function nr(i){return nr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},nr(i)}function pp(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(c=function(p,h){if(nr(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var x=g.call(p,"string");if(nr(x)!=="object")return x;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),nr(c)==="symbol"?c:String(c)),a)}var c}var up=function(){function i(a){var c=this;(function(p,h){if(!(p instanceof h))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a.template.infoPanel,this.template=a.template,this.video=a.video,this.player=a,this.template.infoPanelClose.addEventListener("click",function(){c.hide()})}var l,u;return l=i,(u=[{key:"show",value:function(){this.beginTime=Date.now(),this.update(),this.player.timer.enable("info"),this.player.timer.enable("fps"),this.container.classList.remove("dplayer-info-panel-hide")}},{key:"hide",value:function(){this.player.timer.disable("info"),this.player.timer.disable("fps"),this.container.classList.add("dplayer-info-panel-hide")}},{key:"triggle",value:function(){this.container.classList.contains("dplayer-info-panel-hide")?this.show():this.hide()}},{key:"update",value:function(){this.template.infoVersion.innerHTML="v".concat("1.27.1"," ").concat("v1.27.0-12-g4f61091"),this.template.infoType.innerHTML=this.player.type,this.template.infoUrl.innerHTML=this.player.options.video.url,this.template.infoResolution.innerHTML="".concat(this.player.video.videoWidth," x ").concat(this.player.video.videoHeight),this.template.infoDuration.innerHTML=this.player.video.duration,this.player.options.danmaku&&(this.template.infoDanmakuId.innerHTML=this.player.options.danmaku.id,this.template.infoDanmakuApi.innerHTML=this.player.options.danmaku.api,this.template.infoDanmakuAmount.innerHTML=this.player.danmaku.dan.length)}},{key:"fps",value:function(a){this.template.infoFPS.innerHTML="".concat(a.toFixed(1))}}])&&pp(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const fp=up;var Ap=o(568),yp=o.n(Ap);function rr(i){return rr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},rr(i)}function _i(i,l){var u=Object.keys(i);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(i);l&&(a=a.filter(function(c){return Object.getOwnPropertyDescriptor(i,c).enumerable})),u.push.apply(u,a)}return u}function hp(i,l,u){return(l=Oi(l))in i?Object.defineProperty(i,l,{value:u,enumerable:!0,configurable:!0,writable:!0}):i[l]=u,i}function Ti(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,Oi(a.key),a)}}function Oi(i){var l=function(u,a){if(rr(u)!=="object"||u===null)return u;var c=u[Symbol.toPrimitive];if(c!==void 0){var p=c.call(u,"string");if(rr(p)!=="object")return p;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i);return rr(l)==="symbol"?l:String(l)}var Ri=0,fn=[],mp=function(){function i(c){var p=this;(function(h,g){if(!(h instanceof g))throw new TypeError("Cannot call a class as a function")})(this,i),this.options=function(h){var g={container:h.element||document.getElementsByClassName("dplayer")[0],live:!1,autoplay:!1,theme:"#b7daff",loop:!1,lang:(navigator.language||navigator.browserLanguage).toLowerCase(),screenshot:!1,airplay:!0,chromecast:!1,hotkey:!0,preload:"metadata",volume:.7,playbackSpeed:[.5,.75,1,1.25,1.5,2],apiBackend:jc,video:{},contextmenu:[],mutex:!0,pluginOptions:{hls:{},flv:{},dash:{},webtorrent:{}},preventClickToggle:!1};for(var x in g)g.hasOwnProperty(x)&&!h.hasOwnProperty(x)&&(h[x]=g[x]);return h.video&&!h.video.type&&(h.video.type="auto"),qo(h.danmaku)==="object"&&h.danmaku&&!h.danmaku.user&&(h.danmaku.user="DIYgod"),h.subtitle&&(!h.subtitle.type&&(h.subtitle.type="webvtt"),!h.subtitle.fontSize&&(h.subtitle.fontSize="20px"),!h.subtitle.bottom&&(h.subtitle.bottom="40px"),!h.subtitle.color&&(h.subtitle.color="#fff")),h.video.quality&&(h.video.url=h.video.quality[h.video.defaultQuality].url),h.lang&&(h.lang=h.lang.toLowerCase()),h.contextmenu=h.contextmenu.concat([{key:"video-info",click:function(L){L.infoPanel.triggle()}},{key:"about-author",link:"https://diygod.me"},{text:"DPlayer v".concat("1.27.1"),link:"https://github.com/MoePlayer/DPlayer"}]),h}(function(h){for(var g=1;g<arguments.length;g++){var x=arguments[g]!=null?arguments[g]:{};g%2?_i(Object(x),!0).forEach(function(L){hp(h,L,x[L])}):Object.getOwnPropertyDescriptors?Object.defineProperties(h,Object.getOwnPropertyDescriptors(x)):_i(Object(x)).forEach(function(L){Object.defineProperty(h,L,Object.getOwnPropertyDescriptor(x,L))})}return h}({preload:c.video.type==="webtorrent"?"none":"metadata"},c)),this.options.video.quality&&(this.qualityIndex=this.options.video.defaultQuality,this.quality=this.options.video.quality[this.options.video.defaultQuality]),this.tran=new zc(this.options.lang).tran,this.events=new Bd,this.user=new Od(this),this.container=this.options.container,this.noticeList={},this.container.classList.add("dplayer"),this.options.danmaku||this.container.classList.add("dplayer-no-danmaku"),this.options.live?this.container.classList.add("dplayer-live"):this.container.classList.remove("dplayer-live"),$.isMobile&&this.container.classList.add("dplayer-mobile"),this.arrow=this.container.offsetWidth<=500,this.arrow&&this.container.classList.add("dplayer-arrow"),this.options.subtitle&&Array.isArray(this.options.subtitle.url)&&(this.options.subtitle.url.push({subtitle:"",lang:"off"}),this.options.subtitle.defaultSubtitle&&(typeof this.options.subtitle.defaultSubtitle=="string"?this.options.subtitle.index=this.options.subtitle.url.findIndex(function(h){return h.lang===p.options.subtitle.defaultSubtitle||h.name===p.options.subtitle.defaultSubtitle}):typeof this.options.subtitle.defaultSubtitle=="number"&&(this.options.subtitle.index=this.options.subtitle.defaultSubtitle)),(this.options.subtitle.index===-1||!this.options.subtitle.index||this.options.subtitle.index>this.options.subtitle.url.length-1)&&(this.options.subtitle.index=this.options.subtitle.url.findIndex(function(h){return h.lang===p.options.lang})),this.options.subtitle.index===-1&&(this.options.subtitle.index=this.options.subtitle.url.length-1)),this.template=new Li({container:this.container,options:this.options,index:Ri,tran:this.tran}),this.video=this.template.video,this.bar=new Nd(this.template),this.bezel=new Kd(this.template.bezel),this.fullScreen=new Id(this),this.controller=new Xd(this),this.options.danmaku&&(this.danmaku=new wd({player:this,container:this.template.danmaku,opacity:this.user.get("opacity"),callback:function(){setTimeout(function(){p.template.danmakuLoading.style.display="none",p.options.autoplay&&p.play()},0)},error:function(h){p.notice(h)},apiBackend:this.options.apiBackend,borderColor:this.options.theme,height:this.arrow?24:30,time:function(){return p.video.currentTime},unlimited:this.user.get("unlimited"),api:{id:this.options.danmaku.id,address:this.options.danmaku.api,token:this.options.danmaku.token,maximum:this.options.danmaku.maximum,addition:this.options.danmaku.addition,user:this.options.danmaku.user,speedRate:this.options.danmaku.speedRate},events:this.events,tran:function(h){return p.tran(h)}}),this.comment=new op(this)),this.setting=new tp(this),this.plugins={},this.docClickFun=function(){p.focus=!1},this.containerClickFun=function(){p.focus=!0},document.addEventListener("click",this.docClickFun,!0),this.container.addEventListener("click",this.containerClickFun,!0),this.paused=!0,this.timer=new Wd(this),this.hotkey=new lp(this),this.contextmenu=new dp(this),this.initVideo(this.video,this.quality&&this.quality.type||this.options.video.type),this.infoPanel=new fp(this),!this.danmaku&&this.options.autoplay&&this.play(),Ri++,fn.push(this)}var l,u,a;return l=i,u=[{key:"seek",value:function(c){c=Math.max(c,0),this.video.duration&&(c=Math.min(c,this.video.duration)),this.video.currentTime<c?this.notice("".concat(this.tran("ff").replace("%s",(c-this.video.currentTime).toFixed(0)))):this.video.currentTime>c&&this.notice("".concat(this.tran("rew").replace("%s",(this.video.currentTime-c).toFixed(0)))),this.video.currentTime=c,this.danmaku&&this.danmaku.seek(),this.bar.set("played",c/this.video.duration,"width"),this.template.ptime.innerHTML=$.secondToTime(c)}},{key:"play",value:function(c){var p=this;if(this.paused=!1,this.video.paused&&!$.isMobile&&this.bezel.switch(yt.play),this.template.playButton.innerHTML=yt.pause,this.template.mobilePlayButton.innerHTML=yt.pause,c||ee.resolve(this.video.play()).catch(function(){p.pause()}).then(function(){}),this.timer.enable("loading"),this.container.classList.remove("dplayer-paused"),this.container.classList.add("dplayer-playing"),this.danmaku&&this.danmaku.play(),this.options.mutex)for(var h=0;h<fn.length;h++)this!==fn[h]&&fn[h].pause()}},{key:"pause",value:function(c){this.paused=!0,this.container.classList.remove("dplayer-loading"),this.video.paused||$.isMobile||this.bezel.switch(yt.pause),this.template.playButton.innerHTML=yt.play,this.template.mobilePlayButton.innerHTML=yt.play,c||this.video.pause(),this.timer.disable("loading"),this.container.classList.remove("dplayer-playing"),this.container.classList.add("dplayer-paused"),this.danmaku&&this.danmaku.pause()}},{key:"switchVolumeIcon",value:function(){this.volume()>=.95?this.template.volumeIcon.innerHTML=yt.volumeUp:this.volume()>0?this.template.volumeIcon.innerHTML=yt.volumeDown:this.template.volumeIcon.innerHTML=yt.volumeOff}},{key:"volume",value:function(c,p,h){if(c=parseFloat(c),!isNaN(c)){c=Math.max(c,0),c=Math.min(c,1),this.bar.set("volume",c,"width");var g="".concat((100*c).toFixed(0),"%");this.template.volumeBarWrapWrap.dataset.balloon=g,p||this.user.set("volume",c),h||this.notice("".concat(this.tran("volume")," ").concat((100*c).toFixed(0),"%"),void 0,void 0,"volume"),this.video.volume=c,this.video.muted&&(this.video.muted=!1),this.switchVolumeIcon()}return this.video.volume}},{key:"toggle",value:function(){this.video.paused?this.play():this.pause()}},{key:"on",value:function(c,p){this.events.on(c,p)}},{key:"switchVideo",value:function(c,p){this.pause(),this.video.poster=c.pic?c.pic:"",this.video.src=c.url,this.initMSE(this.video,c.type||"auto"),p&&(this.template.danmakuLoading.style.display="block",this.bar.set("played",0,"width"),this.bar.set("loaded",0,"width"),this.template.ptime.innerHTML="00:00",this.template.danmaku.innerHTML="",this.danmaku&&this.danmaku.reload({id:p.id,address:p.api,token:p.token,maximum:p.maximum,addition:p.addition,user:p.user}))}},{key:"initMSE",value:function(c,p){var h=this;if(this.type=p,this.options.video.customType&&this.options.video.customType[p])Object.prototype.toString.call(this.options.video.customType[p])==="[object Function]"?this.options.video.customType[p](this.video,this):console.error("Illegal customType: ".concat(p));else switch(this.type==="auto"&&(/m3u8(#|\?|$)/i.exec(c.src)?this.type="hls":/.flv(#|\?|$)/i.exec(c.src)?this.type="flv":/.mpd(#|\?|$)/i.exec(c.src)?this.type="dash":this.type="normal"),this.type==="hls"&&(c.canPlayType("application/x-mpegURL")||c.canPlayType("application/vnd.apple.mpegURL"))&&(this.type="normal"),this.type){case"hls":if(window.Hls)if(window.Hls.isSupported()){var g=this.options.pluginOptions.hls,x=new window.Hls(g);this.plugins.hls=x,x.loadSource(c.src),x.attachMedia(c),this.events.on("destroy",function(){x.destroy(),delete h.plugins.hls})}else this.notice("Error: Hls is not supported.");else this.notice("Error: Can't find Hls.");break;case"flv":if(window.flvjs)if(window.flvjs.isSupported()){var L=window.flvjs.createPlayer(Object.assign(this.options.pluginOptions.flv.mediaDataSource||{},{type:"flv",url:c.src}),this.options.pluginOptions.flv.config);this.plugins.flvjs=L,L.attachMediaElement(c),L.load(),this.events.on("destroy",function(){L.unload(),L.detachMediaElement(),L.destroy(),delete h.plugins.flvjs})}else this.notice("Error: flvjs is not supported.");else this.notice("Error: Can't find flvjs.");break;case"dash":if(window.dashjs){var _=window.dashjs.MediaPlayer().create().initialize(c,c.src,!1),W=this.options.pluginOptions.dash;_.updateSettings(W),this.plugins.dash=_,this.events.on("destroy",function(){window.dashjs.MediaPlayer().reset(),delete h.plugins.dash})}else this.notice("Error: Can't find dashjs.");break;case"webtorrent":if(window.WebTorrent)if(window.WebTorrent.WEBRTC_SUPPORT){this.container.classList.add("dplayer-loading");var Q=this.options.pluginOptions.webtorrent,G=new window.WebTorrent(Q);this.plugins.webtorrent=G;var Z=c.src;c.src="",c.preload="metadata",c.addEventListener("durationchange",function(){return h.container.classList.remove("dplayer-loading")},{once:!0}),G.add(Z,function(K){K.files.find(function(oe){return oe.name.endsWith(".mp4")}).renderTo(h.video,{autoplay:h.options.autoplay,controls:!1})}),this.events.on("destroy",function(){G.remove(Z),G.destroy(),delete h.plugins.webtorrent})}else this.notice("Error: Webtorrent is not supported.");else this.notice("Error: Can't find Webtorrent.")}}},{key:"initVideo",value:function(c,p){var h=this;this.initMSE(c,p),this.on("durationchange",function(){c.duration!==1&&c.duration!==1/0&&(h.template.dtime.innerHTML=$.secondToTime(c.duration))}),this.on("progress",function(){var L=c.buffered.length?c.buffered.end(c.buffered.length-1)/c.duration:0;h.bar.set("loaded",L,"width")}),this.on("error",function(){h.video.error&&h.tran&&h.notice&&h.type!=="webtorrent"&&h.notice(h.tran("video-failed"))}),this.on("ended",function(){h.bar.set("played",1,"width"),h.setting.loop?(h.seek(0),h.play()):h.pause(),h.danmaku&&(h.danmaku.danIndex=0)}),this.on("play",function(){h.paused&&h.play(!0)}),this.on("pause",function(){h.paused||h.pause(!0)}),this.on("timeupdate",function(){h.bar.set("played",h.video.currentTime/h.video.duration,"width");var L=$.secondToTime(h.video.currentTime);h.template.ptime.innerHTML!==L&&(h.template.ptime.innerHTML=L)});for(var g=function(L){c.addEventListener(h.events.videoEvents[L],function(_){h.events.trigger(h.events.videoEvents[L],_)})},x=0;x<this.events.videoEvents.length;x++)g(x);this.volume(this.user.get("volume"),!0,!0),this.options.subtitle&&(this.subtitle=new jd(this.template.subtitle,this.video,this.options.subtitle,this.events),Array.isArray(this.options.subtitle.url)&&(this.subtitles=new Dd(this)),this.user.get("subtitle")||this.subtitle.hide())}},{key:"switchQuality",value:function(c){var p=this;if(c=typeof c=="string"?parseInt(c):c,this.qualityIndex!==c&&!this.switchingQuality){this.prevIndex=this.qualityIndex,this.qualityIndex=c,this.switchingQuality=!0,this.quality=this.options.video.quality[c],this.template.qualityButton.innerHTML=this.quality.name;var h=this.video.paused;this.video.pause();var g=yp()({current:!1,pic:null,screenshot:this.options.screenshot,preload:"auto",url:this.quality.url,subtitle:this.options.subtitle}),x=new DOMParser().parseFromString(g,"text/html").body.firstChild;this.template.videoWrap.insertBefore(x,this.template.videoWrap.getElementsByTagName("div")[0]),this.prevVideo=this.video,this.video=x,this.initVideo(this.video,this.quality.type||this.options.video.type),this.seek(this.prevVideo.currentTime),this.notice("".concat(this.tran("switching-quality").replace("%q",this.quality.name)),-1,void 0,"switch-quality"),this.events.trigger("quality_start",this.quality),this.on("canplay",function(){if(p.prevVideo){if(p.video.currentTime!==p.prevVideo.currentTime)return void p.seek(p.prevVideo.currentTime);p.template.videoWrap.removeChild(p.prevVideo),p.video.classList.add("dplayer-video-current"),h||p.video.play(),p.prevVideo=null,p.notice("".concat(p.tran("switched-quality").replace("%q",p.quality.name)),void 0,void 0,"switch-quality"),p.switchingQuality=!1,p.events.trigger("quality_end")}}),this.on("error",function(){p.video.error&&p.prevVideo&&(p.template.videoWrap.removeChild(p.video),p.video=p.prevVideo,h||p.video.play(),p.qualityIndex=p.prevIndex,p.quality=p.options.video.quality[p.qualityIndex],p.noticeTime=setTimeout(function(){p.template.notice.style.opacity=0,p.events.trigger("notice_hide")},3e3),p.prevVideo=null,p.switchingQuality=!1)})}}},{key:"notice",value:function(c){var p,h,g,x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2e3,L=arguments.length>2&&arguments[2]!==void 0?arguments[2]:.8,_=arguments.length>3?arguments[3]:void 0;if(_&&((p=document.getElementById("dplayer-notice-".concat(_)))&&(p.innerHTML=c),this.noticeList[_]&&(clearTimeout(this.noticeList[_]),this.noticeList[_]=null)),!p){var W=Li.NewNotice(c,L,_);this.template.noticeList.appendChild(W),p=W}this.events.trigger("notice_show",p),x>0&&(this.noticeList[_]=setTimeout((h=p,g=this,function(){h.addEventListener("animationend",function(){g.template.noticeList.removeChild(h)}),h.classList.add("remove-notice"),g.events.trigger("notice_hide"),g.noticeList[_]=null}),x))}},{key:"resize",value:function(){this.danmaku&&this.danmaku.resize(),this.controller.thumbnails&&this.controller.thumbnails.resize(160,this.video.videoHeight/this.video.videoWidth*160,this.template.barWrap.offsetWidth),this.events.trigger("resize")}},{key:"speed",value:function(c){this.video.playbackRate=c}},{key:"destroy",value:function(){fn.splice(fn.indexOf(this),1),this.pause(),document.removeEventListener("click",this.docClickFun,!0),this.container.removeEventListener("click",this.containerClickFun,!0),this.fullScreen.destroy(),this.hotkey.destroy(),this.contextmenu.destroy(),this.controller.destroy(),this.timer.destroy(),this.video.src="",this.container.innerHTML="",this.events.trigger("destroy")}}],a=[{key:"version",get:function(){return"1.27.1"}}],u&&Ti(l.prototype,u),a&&Ti(l,a),Object.defineProperty(l,"prototype",{writable:!1}),i}();const bp=mp;console.log(`
`.concat(" %c DPlayer v","1.27.1"," ").concat("v1.27.0-12-g4f61091"," %c https://dplayer.diygod.dev ",`
`,`
`),"color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;");const gp=bp})(),s.default})())})(mc);var vm=mc.exports;const xm=gm(vm),Em={id:"dplayer",style:{width:"100%",height:"100vh"}},km={__name:"VideoPlay",setup(e){const t=Ja(),n=Je(null);return Rn(()=>{let r=t.query.url;n.value=new xm({container:document.getElementById("dplayer"),video:{url:r}})}),Na(()=>{n.value.destroy()}),(r,o)=>(xe(),Qe("div",Em))}},wm=["src"],Cm={__name:"AudioPlay",setup(e){const t=Ja(),n=Je();return Rn(()=>{n.value=t.query.url}),(r,o)=>(xe(),Qe("div",null,[we("audio",{src:n.value,controls:""},null,8,wm)]))}},Bm=[{path:"/",component:mm},{path:"/VideoPlay",component:km},{path:"/AudioPlay",component:Cm}],Sm=ay({history:xA(),routes:Bm});const bc=Xf(nA);bc.use(Sm);bc.mount("#app");
