(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();function da(e,t){const n=Object.create(null),r=e.split(",");for(let o=0;o<r.length;o++)n[r[o]]=!0;return t?o=>!!n[o.toLowerCase()]:o=>!!n[o]}const Ie={},un=[],ft=()=>{},$d=()=>!1,Zd=/^on[^a-z]/,Vr=e=>Zd.test(e),pa=e=>e.startsWith("onUpdate:"),Fe=Object.assign,ua=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Jd=Object.prototype.hasOwnProperty,fe=(e,t)=>Jd.call(e,t),se=Array.isArray,fn=e=>$r(e)==="[object Map]",gl=e=>$r(e)==="[object Set]",ce=e=>typeof e=="function",ze=e=>typeof e=="string",fa=e=>typeof e=="symbol",Le=e=>e!==null&&typeof e=="object",vl=e=>Le(e)&&ce(e.then)&&ce(e.catch),xl=Object.prototype.toString,$r=e=>xl.call(e),Xd=e=>$r(e).slice(8,-1),El=e=>$r(e)==="[object Object]",Aa=e=>ze(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Rr=da(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Zr=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},Gd=/-(\w)/g,Ct=Zr(e=>e.replace(Gd,(t,n)=>n?n.toUpperCase():"")),ep=/\B([A-Z])/g,En=Zr(e=>e.replace(ep,"-$1").toLowerCase()),Jr=Zr(e=>e.charAt(0).toUpperCase()+e.slice(1)),Io=Zr(e=>e?`on${Jr(e)}`:""),ir=(e,t)=>!Object.is(e,t),Lo=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},Nr=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},tp=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let mi;const Wo=()=>mi||(mi=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Xr(e){if(se(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],o=ze(r)?ap(r):Xr(r);if(o)for(const c in o)t[c]=o[c]}return t}else{if(ze(e))return e;if(Le(e))return e}}const np=/;(?![^(]*\))/g,rp=/:([^]+)/,op=/\/\*[^]*?\*\//g;function ap(e){const t={};return e.replace(op,"").split(np).forEach(n=>{if(n){const r=n.split(rp);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function lr(e){let t="";if(ze(e))t=e;else if(se(e))for(let n=0;n<e.length;n++){const r=lr(e[n]);r&&(t+=r+" ")}else if(Le(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const ip="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",lp=da(ip);function wl(e){return!!e||e===""}const _o=e=>ze(e)?e:e==null?"":se(e)||Le(e)&&(e.toString===xl||!ce(e.toString))?JSON.stringify(e,kl,2):String(e),kl=(e,t)=>t&&t.__v_isRef?kl(e,t.value):fn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,o])=>(n[`${r} =>`]=o,n),{})}:gl(t)?{[`Set(${t.size})`]:[...t.values()]}:Le(t)&&!se(t)&&!El(t)?String(t):t;let st;class sp{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=st,!t&&st&&(this.index=(st.scopes||(st.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=st;try{return st=this,t()}finally{st=n}}}on(){st=this}off(){st=this.parent}stop(t){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0,this._active=!1}}}function cp(e,t=st){t&&t.active&&t.effects.push(e)}function dp(){return st}const ya=e=>{const t=new Set(e);return t.w=0,t.n=0,t},Cl=e=>(e.w&Vt)>0,Bl=e=>(e.n&Vt)>0,pp=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=Vt},up=e=>{const{deps:t}=e;if(t.length){let n=0;for(let r=0;r<t.length;r++){const o=t[r];Cl(o)&&!Bl(o)?o.delete(e):t[n++]=o,o.w&=~Vt,o.n&=~Vt}t.length=n}},Yo=new WeakMap;let Gn=0,Vt=1;const Ko=30;let ct;const en=Symbol(""),Qo=Symbol("");class ha{constructor(t,n=null,r){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,cp(this,r)}run(){if(!this.active)return this.fn();let t=ct,n=Kt;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=ct,ct=this,Kt=!0,Vt=1<<++Gn,Gn<=Ko?pp(this):bi(this),this.fn()}finally{Gn<=Ko&&up(this),Vt=1<<--Gn,ct=this.parent,Kt=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){ct===this?this.deferStop=!0:this.active&&(bi(this),this.onStop&&this.onStop(),this.active=!1)}}function bi(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let Kt=!0;const Sl=[];function wn(){Sl.push(Kt),Kt=!1}function kn(){const e=Sl.pop();Kt=e===void 0?!0:e}function Xe(e,t,n){if(Kt&&ct){let r=Yo.get(e);r||Yo.set(e,r=new Map);let o=r.get(n);o||r.set(n,o=ya()),Il(o)}}function Il(e,t){let n=!1;Gn<=Ko?Bl(e)||(e.n|=Vt,n=!Cl(e)):n=!e.has(ct),n&&(e.add(ct),ct.deps.push(e))}function Pt(e,t,n,r,o,c){const d=Yo.get(e);if(!d)return;let f=[];if(t==="clear")f=[...d.values()];else if(n==="length"&&se(e)){const h=Number(r);d.forEach((m,b)=>{(b==="length"||b>=h)&&f.push(m)})}else switch(n!==void 0&&f.push(d.get(n)),t){case"add":se(e)?Aa(n)&&f.push(d.get("length")):(f.push(d.get(en)),fn(e)&&f.push(d.get(Qo)));break;case"delete":se(e)||(f.push(d.get(en)),fn(e)&&f.push(d.get(Qo)));break;case"set":fn(e)&&f.push(d.get(en));break}if(f.length===1)f[0]&&Vo(f[0]);else{const h=[];for(const m of f)m&&h.push(...m);Vo(ya(h))}}function Vo(e,t){const n=se(e)?e:[...e];for(const r of n)r.computed&&gi(r);for(const r of n)r.computed||gi(r)}function gi(e,t){(e!==ct||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const fp=da("__proto__,__v_isRef,__isVue"),Ll=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(fa)),Ap=ma(),yp=ma(!1,!0),hp=ma(!0),vi=mp();function mp(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=me(this);for(let c=0,d=this.length;c<d;c++)Xe(r,"get",c+"");const o=r[t](...n);return o===-1||o===!1?r[t](...n.map(me)):o}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){wn();const r=me(this)[t].apply(this,n);return kn(),r}}),e}function bp(e){const t=me(this);return Xe(t,"has",e),t.hasOwnProperty(e)}function ma(e=!1,t=!1){return function(r,o,c){if(o==="__v_isReactive")return!e;if(o==="__v_isReadonly")return e;if(o==="__v_isShallow")return t;if(o==="__v_raw"&&c===(e?t?Pp:Pl:t?Rl:Tl).get(r))return r;const d=se(r);if(!e){if(d&&fe(vi,o))return Reflect.get(vi,o,c);if(o==="hasOwnProperty")return bp}const f=Reflect.get(r,o,c);return(fa(o)?Ll.has(o):fp(o))||(e||Xe(r,"get",o),t)?f:Qe(f)?d&&Aa(o)?f:f.value:Le(f)?e?zl(f):eo(f):f}}const gp=_l(),vp=_l(!0);function _l(e=!1){return function(n,r,o,c){let d=n[r];if(hn(d)&&Qe(d)&&!Qe(o))return!1;if(!e&&(!Ur(o)&&!hn(o)&&(d=me(d),o=me(o)),!se(n)&&Qe(d)&&!Qe(o)))return d.value=o,!0;const f=se(n)&&Aa(r)?Number(r)<n.length:fe(n,r),h=Reflect.set(n,r,o,c);return n===me(c)&&(f?ir(o,d)&&Pt(n,"set",r,o):Pt(n,"add",r,o)),h}}function xp(e,t){const n=fe(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&Pt(e,"delete",t,void 0),r}function Ep(e,t){const n=Reflect.has(e,t);return(!fa(t)||!Ll.has(t))&&Xe(e,"has",t),n}function wp(e){return Xe(e,"iterate",se(e)?"length":en),Reflect.ownKeys(e)}const Ol={get:Ap,set:gp,deleteProperty:xp,has:Ep,ownKeys:wp},kp={get:hp,set(e,t){return!0},deleteProperty(e,t){return!0}},Cp=Fe({},Ol,{get:yp,set:vp}),ba=e=>e,Gr=e=>Reflect.getPrototypeOf(e);function Sr(e,t,n=!1,r=!1){e=e.__v_raw;const o=me(e),c=me(t);n||(t!==c&&Xe(o,"get",t),Xe(o,"get",c));const{has:d}=Gr(o),f=r?ba:n?xa:sr;if(d.call(o,t))return f(e.get(t));if(d.call(o,c))return f(e.get(c));e!==o&&e.get(t)}function Ir(e,t=!1){const n=this.__v_raw,r=me(n),o=me(e);return t||(e!==o&&Xe(r,"has",e),Xe(r,"has",o)),e===o?n.has(e):n.has(e)||n.has(o)}function Lr(e,t=!1){return e=e.__v_raw,!t&&Xe(me(e),"iterate",en),Reflect.get(e,"size",e)}function xi(e){e=me(e);const t=me(this);return Gr(t).has.call(t,e)||(t.add(e),Pt(t,"add",e,e)),this}function Ei(e,t){t=me(t);const n=me(this),{has:r,get:o}=Gr(n);let c=r.call(n,e);c||(e=me(e),c=r.call(n,e));const d=o.call(n,e);return n.set(e,t),c?ir(t,d)&&Pt(n,"set",e,t):Pt(n,"add",e,t),this}function wi(e){const t=me(this),{has:n,get:r}=Gr(t);let o=n.call(t,e);o||(e=me(e),o=n.call(t,e)),r&&r.call(t,e);const c=t.delete(e);return o&&Pt(t,"delete",e,void 0),c}function ki(){const e=me(this),t=e.size!==0,n=e.clear();return t&&Pt(e,"clear",void 0,void 0),n}function _r(e,t){return function(r,o){const c=this,d=c.__v_raw,f=me(d),h=t?ba:e?xa:sr;return!e&&Xe(f,"iterate",en),d.forEach((m,b)=>r.call(o,h(m),h(b),c))}}function Or(e,t,n){return function(...r){const o=this.__v_raw,c=me(o),d=fn(c),f=e==="entries"||e===Symbol.iterator&&d,h=e==="keys"&&d,m=o[e](...r),b=n?ba:t?xa:sr;return!t&&Xe(c,"iterate",h?Qo:en),{next(){const{value:x,done:y}=m.next();return y?{value:x,done:y}:{value:f?[b(x[0]),b(x[1])]:b(x),done:y}},[Symbol.iterator](){return this}}}}function Nt(e){return function(...t){return e==="delete"?!1:this}}function Bp(){const e={get(c){return Sr(this,c)},get size(){return Lr(this)},has:Ir,add:xi,set:Ei,delete:wi,clear:ki,forEach:_r(!1,!1)},t={get(c){return Sr(this,c,!1,!0)},get size(){return Lr(this)},has:Ir,add:xi,set:Ei,delete:wi,clear:ki,forEach:_r(!1,!0)},n={get(c){return Sr(this,c,!0)},get size(){return Lr(this,!0)},has(c){return Ir.call(this,c,!0)},add:Nt("add"),set:Nt("set"),delete:Nt("delete"),clear:Nt("clear"),forEach:_r(!0,!1)},r={get(c){return Sr(this,c,!0,!0)},get size(){return Lr(this,!0)},has(c){return Ir.call(this,c,!0)},add:Nt("add"),set:Nt("set"),delete:Nt("delete"),clear:Nt("clear"),forEach:_r(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(c=>{e[c]=Or(c,!1,!1),n[c]=Or(c,!0,!1),t[c]=Or(c,!1,!0),r[c]=Or(c,!0,!0)}),[e,n,t,r]}const[Sp,Ip,Lp,_p]=Bp();function ga(e,t){const n=t?e?_p:Lp:e?Ip:Sp;return(r,o,c)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?r:Reflect.get(fe(n,o)&&o in r?n:r,o,c)}const Op={get:ga(!1,!1)},Tp={get:ga(!1,!0)},Rp={get:ga(!0,!1)},Tl=new WeakMap,Rl=new WeakMap,Pl=new WeakMap,Pp=new WeakMap;function jp(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function zp(e){return e.__v_skip||!Object.isExtensible(e)?0:jp(Xd(e))}function eo(e){return hn(e)?e:va(e,!1,Ol,Op,Tl)}function jl(e){return va(e,!1,Cp,Tp,Rl)}function zl(e){return va(e,!0,kp,Rp,Pl)}function va(e,t,n,r,o){if(!Le(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const c=o.get(e);if(c)return c;const d=zp(e);if(d===0)return e;const f=new Proxy(e,d===2?r:n);return o.set(e,f),f}function An(e){return hn(e)?An(e.__v_raw):!!(e&&e.__v_isReactive)}function hn(e){return!!(e&&e.__v_isReadonly)}function Ur(e){return!!(e&&e.__v_isShallow)}function Ml(e){return An(e)||hn(e)}function me(e){const t=e&&e.__v_raw;return t?me(t):e}function Dl(e){return Nr(e,"__v_skip",!0),e}const sr=e=>Le(e)?eo(e):e,xa=e=>Le(e)?zl(e):e;function ql(e){Kt&&ct&&(e=me(e),Il(e.dep||(e.dep=ya())))}function Fl(e,t){e=me(e);const n=e.dep;n&&Vo(n)}function Qe(e){return!!(e&&e.__v_isRef===!0)}function nt(e){return Nl(e,!1)}function Mp(e){return Nl(e,!0)}function Nl(e,t){return Qe(e)?e:new Dp(e,t)}class Dp{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:me(t),this._value=n?t:sr(t)}get value(){return ql(this),this._value}set value(t){const n=this.__v_isShallow||Ur(t)||hn(t);t=n?t:me(t),ir(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:sr(t),Fl(this))}}function Ue(e){return Qe(e)?e.value:e}const qp={get:(e,t,n)=>Ue(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const o=e[t];return Qe(o)&&!Qe(n)?(o.value=n,!0):Reflect.set(e,t,n,r)}};function Ul(e){return An(e)?e:new Proxy(e,qp)}class Fp{constructor(t,n,r,o){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new ha(t,()=>{this._dirty||(this._dirty=!0,Fl(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!o,this.__v_isReadonly=r}get value(){const t=me(this);return ql(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}function Np(e,t,n=!1){let r,o;const c=ce(e);return c?(r=e,o=ft):(r=e.get,o=e.set),new Fp(r,o,c||!o,n)}function Qt(e,t,n,r){let o;try{o=r?e(...r):e()}catch(c){to(c,t,n)}return o}function At(e,t,n,r){if(ce(e)){const c=Qt(e,t,n,r);return c&&vl(c)&&c.catch(d=>{to(d,t,n)}),c}const o=[];for(let c=0;c<e.length;c++)o.push(At(e[c],t,n,r));return o}function to(e,t,n,r=!0){const o=t?t.vnode:null;if(t){let c=t.parent;const d=t.proxy,f=n;for(;c;){const m=c.ec;if(m){for(let b=0;b<m.length;b++)if(m[b](e,d,f)===!1)return}c=c.parent}const h=t.appContext.config.errorHandler;if(h){Qt(h,null,10,[e,d,f]);return}}Up(e,n,o,r)}function Up(e,t,n,r=!0){console.error(e)}let cr=!1,$o=!1;const Ke=[];let wt=0;const yn=[];let Tt=null,Xt=0;const Hl=Promise.resolve();let Ea=null;function Wl(e){const t=Ea||Hl;return e?t.then(this?e.bind(this):e):t}function Hp(e){let t=wt+1,n=Ke.length;for(;t<n;){const r=t+n>>>1;dr(Ke[r])<e?t=r+1:n=r}return t}function wa(e){(!Ke.length||!Ke.includes(e,cr&&e.allowRecurse?wt+1:wt))&&(e.id==null?Ke.push(e):Ke.splice(Hp(e.id),0,e),Yl())}function Yl(){!cr&&!$o&&($o=!0,Ea=Hl.then(Ql))}function Wp(e){const t=Ke.indexOf(e);t>wt&&Ke.splice(t,1)}function Yp(e){se(e)?yn.push(...e):(!Tt||!Tt.includes(e,e.allowRecurse?Xt+1:Xt))&&yn.push(e),Yl()}function Ci(e,t=cr?wt+1:0){for(;t<Ke.length;t++){const n=Ke[t];n&&n.pre&&(Ke.splice(t,1),t--,n())}}function Kl(e){if(yn.length){const t=[...new Set(yn)];if(yn.length=0,Tt){Tt.push(...t);return}for(Tt=t,Tt.sort((n,r)=>dr(n)-dr(r)),Xt=0;Xt<Tt.length;Xt++)Tt[Xt]();Tt=null,Xt=0}}const dr=e=>e.id==null?1/0:e.id,Kp=(e,t)=>{const n=dr(e)-dr(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function Ql(e){$o=!1,cr=!0,Ke.sort(Kp);const t=ft;try{for(wt=0;wt<Ke.length;wt++){const n=Ke[wt];n&&n.active!==!1&&Qt(n,null,14)}}finally{wt=0,Ke.length=0,Kl(),cr=!1,Ea=null,(Ke.length||yn.length)&&Ql()}}function Qp(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||Ie;let o=n;const c=t.startsWith("update:"),d=c&&t.slice(7);if(d&&d in r){const b=`${d==="modelValue"?"model":d}Modifiers`,{number:x,trim:y}=r[b]||Ie;y&&(o=n.map(k=>ze(k)?k.trim():k)),x&&(o=n.map(tp))}let f,h=r[f=Io(t)]||r[f=Io(Ct(t))];!h&&c&&(h=r[f=Io(En(t))]),h&&At(h,e,6,o);const m=r[f+"Once"];if(m){if(!e.emitted)e.emitted={};else if(e.emitted[f])return;e.emitted[f]=!0,At(m,e,6,o)}}function Vl(e,t,n=!1){const r=t.emitsCache,o=r.get(e);if(o!==void 0)return o;const c=e.emits;let d={},f=!1;if(!ce(e)){const h=m=>{const b=Vl(m,t,!0);b&&(f=!0,Fe(d,b))};!n&&t.mixins.length&&t.mixins.forEach(h),e.extends&&h(e.extends),e.mixins&&e.mixins.forEach(h)}return!c&&!f?(Le(e)&&r.set(e,null),null):(se(c)?c.forEach(h=>d[h]=null):Fe(d,c),Le(e)&&r.set(e,d),d)}function no(e,t){return!e||!Vr(t)?!1:(t=t.slice(2).replace(/Once$/,""),fe(e,t[0].toLowerCase()+t.slice(1))||fe(e,En(t))||fe(e,t))}let pt=null,$l=null;function Hr(e){const t=pt;return pt=e,$l=e&&e.type.__scopeId||null,t}function Vp(e,t=pt,n){if(!t||e._n)return e;const r=(...o)=>{r._d&&zi(-1);const c=Hr(t);let d;try{d=e(...o)}finally{Hr(c),r._d&&zi(1)}return d};return r._n=!0,r._c=!0,r._d=!0,r}function Oo(e){const{type:t,vnode:n,proxy:r,withProxy:o,props:c,propsOptions:[d],slots:f,attrs:h,emit:m,render:b,renderCache:x,data:y,setupState:k,ctx:B,inheritAttrs:C}=e;let L,z;const T=Hr(e);try{if(n.shapeFlag&4){const F=o||r;L=Et(b.call(F,F,x,c,k,y,B)),z=h}else{const F=t;L=Et(F.length>1?F(c,{attrs:h,slots:f,emit:m}):F(c,null)),z=t.props?h:$p(h)}}catch(F){rr.length=0,to(F,e,1),L=K(nn)}let $=L;if(z&&C!==!1){const F=Object.keys(z),{shapeFlag:he}=$;F.length&&he&7&&(d&&F.some(pa)&&(z=Zp(z,d)),$=mn($,z))}return n.dirs&&($=mn($),$.dirs=$.dirs?$.dirs.concat(n.dirs):n.dirs),n.transition&&($.transition=n.transition),L=$,Hr(T),L}const $p=e=>{let t;for(const n in e)(n==="class"||n==="style"||Vr(n))&&((t||(t={}))[n]=e[n]);return t},Zp=(e,t)=>{const n={};for(const r in e)(!pa(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Jp(e,t,n){const{props:r,children:o,component:c}=e,{props:d,children:f,patchFlag:h}=t,m=c.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&h>=0){if(h&1024)return!0;if(h&16)return r?Bi(r,d,m):!!d;if(h&8){const b=t.dynamicProps;for(let x=0;x<b.length;x++){const y=b[x];if(d[y]!==r[y]&&!no(m,y))return!0}}}else return(o||f)&&(!f||!f.$stable)?!0:r===d?!1:r?d?Bi(r,d,m):!0:!!d;return!1}function Bi(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let o=0;o<r.length;o++){const c=r[o];if(t[c]!==e[c]&&!no(n,c))return!0}return!1}function Xp({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent}const Gp=e=>e.__isSuspense;function eu(e,t){t&&t.pendingBranch?se(e)?t.effects.push(...e):t.effects.push(e):Yp(e)}const Tr={};function tr(e,t,n){return Zl(e,t,n)}function Zl(e,t,{immediate:n,deep:r,flush:o,onTrack:c,onTrigger:d}=Ie){var f;const h=dp()===((f=He)==null?void 0:f.scope)?He:null;let m,b=!1,x=!1;if(Qe(e)?(m=()=>e.value,b=Ur(e)):An(e)?(m=()=>e,r=!0):se(e)?(x=!0,b=e.some(F=>An(F)||Ur(F)),m=()=>e.map(F=>{if(Qe(F))return F.value;if(An(F))return pn(F);if(ce(F))return Qt(F,h,2)})):ce(e)?t?m=()=>Qt(e,h,2):m=()=>{if(!(h&&h.isUnmounted))return y&&y(),At(e,h,3,[k])}:m=ft,t&&r){const F=m;m=()=>pn(F())}let y,k=F=>{y=T.onStop=()=>{Qt(F,h,4)}},B;if(ur)if(k=ft,t?n&&At(t,h,3,[m(),x?[]:void 0,k]):m(),o==="sync"){const F=Ku();B=F.__watcherHandles||(F.__watcherHandles=[])}else return ft;let C=x?new Array(e.length).fill(Tr):Tr;const L=()=>{if(T.active)if(t){const F=T.run();(r||b||(x?F.some((he,ke)=>ir(he,C[ke])):ir(F,C)))&&(y&&y(),At(t,h,3,[F,C===Tr?void 0:x&&C[0]===Tr?[]:C,k]),C=F)}else T.run()};L.allowRecurse=!!t;let z;o==="sync"?z=L:o==="post"?z=()=>Je(L,h&&h.suspense):(L.pre=!0,h&&(L.id=h.uid),z=()=>wa(L));const T=new ha(m,z);t?n?L():C=T.run():o==="post"?Je(T.run.bind(T),h&&h.suspense):T.run();const $=()=>{T.stop(),h&&h.scope&&ua(h.scope.effects,T)};return B&&B.push($),$}function tu(e,t,n){const r=this.proxy,o=ze(e)?e.includes(".")?Jl(r,e):()=>r[e]:e.bind(r,r);let c;ce(t)?c=t:(c=t.handler,n=t);const d=He;bn(this);const f=Zl(o,c.bind(r),n);return d?bn(d):tn(),f}function Jl(e,t){const n=t.split(".");return()=>{let r=e;for(let o=0;o<n.length&&r;o++)r=r[n[o]];return r}}function pn(e,t){if(!Le(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),Qe(e))pn(e.value,t);else if(se(e))for(let n=0;n<e.length;n++)pn(e[n],t);else if(gl(e)||fn(e))e.forEach(n=>{pn(n,t)});else if(El(e))for(const n in e)pn(e[n],t);return e}function Zt(e,t,n,r){const o=e.dirs,c=t&&t.dirs;for(let d=0;d<o.length;d++){const f=o[d];c&&(f.oldValue=c[d].value);let h=f.dir[r];h&&(wn(),At(h,n,8,[e.el,f,e,t]),kn())}}function Xl(e,t){return ce(e)?(()=>Fe({name:e.name},t,{setup:e}))():e}const Pr=e=>!!e.type.__asyncLoader,Gl=e=>e.type.__isKeepAlive;function nu(e,t){es(e,"a",t)}function ru(e,t){es(e,"da",t)}function es(e,t,n=He){const r=e.__wdc||(e.__wdc=()=>{let o=n;for(;o;){if(o.isDeactivated)return;o=o.parent}return e()});if(ro(t,r,n),n){let o=n.parent;for(;o&&o.parent;)Gl(o.parent.vnode)&&ou(r,t,n,o),o=o.parent}}function ou(e,t,n,r){const o=ro(t,e,r,!0);ka(()=>{ua(r[t],o)},n)}function ro(e,t,n=He,r=!1){if(n){const o=n[e]||(n[e]=[]),c=t.__weh||(t.__weh=(...d)=>{if(n.isUnmounted)return;wn(),bn(n);const f=At(t,n,e,d);return tn(),kn(),f});return r?o.unshift(c):o.push(c),c}}const jt=e=>(t,n=He)=>(!ur||e==="sp")&&ro(e,(...r)=>t(...r),n),au=jt("bm"),yr=jt("m"),iu=jt("bu"),lu=jt("u"),ts=jt("bum"),ka=jt("um"),su=jt("sp"),cu=jt("rtg"),du=jt("rtc");function pu(e,t=He){ro("ec",e,t)}const ns="components";function uu(e,t){return Au(ns,e,!0,t)||e}const fu=Symbol.for("v-ndc");function Au(e,t,n=!0,r=!1){const o=pt||He;if(o){const c=o.type;if(e===ns){const f=Hu(c,!1);if(f&&(f===t||f===Ct(t)||f===Jr(Ct(t))))return c}const d=Si(o[e]||c[e],t)||Si(o.appContext[e],t);return!d&&r?c:d}}function Si(e,t){return e&&(e[t]||e[Ct(t)]||e[Jr(Ct(t))])}function To(e,t,n,r){let o;const c=n&&n[r];if(se(e)||ze(e)){o=new Array(e.length);for(let d=0,f=e.length;d<f;d++)o[d]=t(e[d],d,void 0,c&&c[d])}else if(typeof e=="number"){o=new Array(e);for(let d=0;d<e;d++)o[d]=t(d+1,d,void 0,c&&c[d])}else if(Le(e))if(e[Symbol.iterator])o=Array.from(e,(d,f)=>t(d,f,void 0,c&&c[f]));else{const d=Object.keys(e);o=new Array(d.length);for(let f=0,h=d.length;f<h;f++){const m=d[f];o[f]=t(e[m],m,f,c&&c[f])}}else o=[];return n&&(n[r]=o),o}const Zo=e=>e?As(e)?La(e)||e.proxy:Zo(e.parent):null,nr=Fe(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Zo(e.parent),$root:e=>Zo(e.root),$emit:e=>e.emit,$options:e=>Ca(e),$forceUpdate:e=>e.f||(e.f=()=>wa(e.update)),$nextTick:e=>e.n||(e.n=Wl.bind(e.proxy)),$watch:e=>tu.bind(e)}),Ro=(e,t)=>e!==Ie&&!e.__isScriptSetup&&fe(e,t),yu={get({_:e},t){const{ctx:n,setupState:r,data:o,props:c,accessCache:d,type:f,appContext:h}=e;let m;if(t[0]!=="$"){const k=d[t];if(k!==void 0)switch(k){case 1:return r[t];case 2:return o[t];case 4:return n[t];case 3:return c[t]}else{if(Ro(r,t))return d[t]=1,r[t];if(o!==Ie&&fe(o,t))return d[t]=2,o[t];if((m=e.propsOptions[0])&&fe(m,t))return d[t]=3,c[t];if(n!==Ie&&fe(n,t))return d[t]=4,n[t];Jo&&(d[t]=0)}}const b=nr[t];let x,y;if(b)return t==="$attrs"&&Xe(e,"get",t),b(e);if((x=f.__cssModules)&&(x=x[t]))return x;if(n!==Ie&&fe(n,t))return d[t]=4,n[t];if(y=h.config.globalProperties,fe(y,t))return y[t]},set({_:e},t,n){const{data:r,setupState:o,ctx:c}=e;return Ro(o,t)?(o[t]=n,!0):r!==Ie&&fe(r,t)?(r[t]=n,!0):fe(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(c[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:o,propsOptions:c}},d){let f;return!!n[d]||e!==Ie&&fe(e,d)||Ro(t,d)||(f=c[0])&&fe(f,d)||fe(r,d)||fe(nr,d)||fe(o.config.globalProperties,d)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:fe(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function Ii(e){return se(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let Jo=!0;function hu(e){const t=Ca(e),n=e.proxy,r=e.ctx;Jo=!1,t.beforeCreate&&Li(t.beforeCreate,e,"bc");const{data:o,computed:c,methods:d,watch:f,provide:h,inject:m,created:b,beforeMount:x,mounted:y,beforeUpdate:k,updated:B,activated:C,deactivated:L,beforeDestroy:z,beforeUnmount:T,destroyed:$,unmounted:F,render:he,renderTracked:ke,renderTriggered:Ve,errorCaptured:be,serverPrefetch:Ce,expose:le,inheritAttrs:Re,components:Ne,directives:De,filters:St}=t;if(m&&mu(m,r,null),d)for(const ve in d){const ue=d[ve];ce(ue)&&(r[ve]=ue.bind(n))}if(o){const ve=o.call(n,n);Le(ve)&&(e.data=eo(ve))}if(Jo=!0,c)for(const ve in c){const ue=c[ve],te=ce(ue)?ue.bind(n,n):ce(ue.get)?ue.get.bind(n,n):ft,it=!ce(ue)&&ce(ue.set)?ue.set.bind(n):ft,We=dt({get:te,set:it});Object.defineProperty(r,ve,{enumerable:!0,configurable:!0,get:()=>We.value,set:qe=>We.value=qe})}if(f)for(const ve in f)rs(f[ve],r,n,ve);if(h){const ve=ce(h)?h.call(n):h;Reflect.ownKeys(ve).forEach(ue=>{jr(ue,ve[ue])})}b&&Li(b,e,"c");function Oe(ve,ue){se(ue)?ue.forEach(te=>ve(te.bind(n))):ue&&ve(ue.bind(n))}if(Oe(au,x),Oe(yr,y),Oe(iu,k),Oe(lu,B),Oe(nu,C),Oe(ru,L),Oe(pu,be),Oe(du,ke),Oe(cu,Ve),Oe(ts,T),Oe(ka,F),Oe(su,Ce),se(le))if(le.length){const ve=e.exposed||(e.exposed={});le.forEach(ue=>{Object.defineProperty(ve,ue,{get:()=>n[ue],set:te=>n[ue]=te})})}else e.exposed||(e.exposed={});he&&e.render===ft&&(e.render=he),Re!=null&&(e.inheritAttrs=Re),Ne&&(e.components=Ne),De&&(e.directives=De)}function mu(e,t,n=ft){se(e)&&(e=Xo(e));for(const r in e){const o=e[r];let c;Le(o)?"default"in o?c=ot(o.from||r,o.default,!0):c=ot(o.from||r):c=ot(o),Qe(c)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>c.value,set:d=>c.value=d}):t[r]=c}}function Li(e,t,n){At(se(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function rs(e,t,n,r){const o=r.includes(".")?Jl(n,r):()=>n[r];if(ze(e)){const c=t[e];ce(c)&&tr(o,c)}else if(ce(e))tr(o,e.bind(n));else if(Le(e))if(se(e))e.forEach(c=>rs(c,t,n,r));else{const c=ce(e.handler)?e.handler.bind(n):t[e.handler];ce(c)&&tr(o,c,e)}}function Ca(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:o,optionsCache:c,config:{optionMergeStrategies:d}}=e.appContext,f=c.get(t);let h;return f?h=f:!o.length&&!n&&!r?h=t:(h={},o.length&&o.forEach(m=>Wr(h,m,d,!0)),Wr(h,t,d)),Le(t)&&c.set(t,h),h}function Wr(e,t,n,r=!1){const{mixins:o,extends:c}=t;c&&Wr(e,c,n,!0),o&&o.forEach(d=>Wr(e,d,n,!0));for(const d in t)if(!(r&&d==="expose")){const f=bu[d]||n&&n[d];e[d]=f?f(e[d],t[d]):t[d]}return e}const bu={data:_i,props:Oi,emits:Oi,methods:er,computed:er,beforeCreate:$e,created:$e,beforeMount:$e,mounted:$e,beforeUpdate:$e,updated:$e,beforeDestroy:$e,beforeUnmount:$e,destroyed:$e,unmounted:$e,activated:$e,deactivated:$e,errorCaptured:$e,serverPrefetch:$e,components:er,directives:er,watch:vu,provide:_i,inject:gu};function _i(e,t){return t?e?function(){return Fe(ce(e)?e.call(this,this):e,ce(t)?t.call(this,this):t)}:t:e}function gu(e,t){return er(Xo(e),Xo(t))}function Xo(e){if(se(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function $e(e,t){return e?[...new Set([].concat(e,t))]:t}function er(e,t){return e?Fe(Object.create(null),e,t):t}function Oi(e,t){return e?se(e)&&se(t)?[...new Set([...e,...t])]:Fe(Object.create(null),Ii(e),Ii(t??{})):t}function vu(e,t){if(!e)return t;if(!t)return e;const n=Fe(Object.create(null),e);for(const r in t)n[r]=$e(e[r],t[r]);return n}function os(){return{app:null,config:{isNativeTag:$d,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let xu=0;function Eu(e,t){return function(r,o=null){ce(r)||(r=Fe({},r)),o!=null&&!Le(o)&&(o=null);const c=os(),d=new Set;let f=!1;const h=c.app={_uid:xu++,_component:r,_props:o,_container:null,_context:c,_instance:null,version:Qu,get config(){return c.config},set config(m){},use(m,...b){return d.has(m)||(m&&ce(m.install)?(d.add(m),m.install(h,...b)):ce(m)&&(d.add(m),m(h,...b))),h},mixin(m){return c.mixins.includes(m)||c.mixins.push(m),h},component(m,b){return b?(c.components[m]=b,h):c.components[m]},directive(m,b){return b?(c.directives[m]=b,h):c.directives[m]},mount(m,b,x){if(!f){const y=K(r,o);return y.appContext=c,b&&t?t(y,m):e(y,m,x),f=!0,h._container=m,m.__vue_app__=h,La(y.component)||y.component.proxy}},unmount(){f&&(e(null,h._container),delete h._container.__vue_app__)},provide(m,b){return c.provides[m]=b,h},runWithContext(m){Yr=h;try{return m()}finally{Yr=null}}};return h}}let Yr=null;function jr(e,t){if(He){let n=He.provides;const r=He.parent&&He.parent.provides;r===n&&(n=He.provides=Object.create(r)),n[e]=t}}function ot(e,t,n=!1){const r=He||pt;if(r||Yr){const o=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:Yr._context.provides;if(o&&e in o)return o[e];if(arguments.length>1)return n&&ce(t)?t.call(r&&r.proxy):t}}function wu(e,t,n,r=!1){const o={},c={};Nr(c,ao,1),e.propsDefaults=Object.create(null),as(e,t,o,c);for(const d in e.propsOptions[0])d in o||(o[d]=void 0);n?e.props=r?o:jl(o):e.type.props?e.props=o:e.props=c,e.attrs=c}function ku(e,t,n,r){const{props:o,attrs:c,vnode:{patchFlag:d}}=e,f=me(o),[h]=e.propsOptions;let m=!1;if((r||d>0)&&!(d&16)){if(d&8){const b=e.vnode.dynamicProps;for(let x=0;x<b.length;x++){let y=b[x];if(no(e.emitsOptions,y))continue;const k=t[y];if(h)if(fe(c,y))k!==c[y]&&(c[y]=k,m=!0);else{const B=Ct(y);o[B]=Go(h,f,B,k,e,!1)}else k!==c[y]&&(c[y]=k,m=!0)}}}else{as(e,t,o,c)&&(m=!0);let b;for(const x in f)(!t||!fe(t,x)&&((b=En(x))===x||!fe(t,b)))&&(h?n&&(n[x]!==void 0||n[b]!==void 0)&&(o[x]=Go(h,f,x,void 0,e,!0)):delete o[x]);if(c!==f)for(const x in c)(!t||!fe(t,x))&&(delete c[x],m=!0)}m&&Pt(e,"set","$attrs")}function as(e,t,n,r){const[o,c]=e.propsOptions;let d=!1,f;if(t)for(let h in t){if(Rr(h))continue;const m=t[h];let b;o&&fe(o,b=Ct(h))?!c||!c.includes(b)?n[b]=m:(f||(f={}))[b]=m:no(e.emitsOptions,h)||(!(h in r)||m!==r[h])&&(r[h]=m,d=!0)}if(c){const h=me(n),m=f||Ie;for(let b=0;b<c.length;b++){const x=c[b];n[x]=Go(o,h,x,m[x],e,!fe(m,x))}}return d}function Go(e,t,n,r,o,c){const d=e[n];if(d!=null){const f=fe(d,"default");if(f&&r===void 0){const h=d.default;if(d.type!==Function&&!d.skipFactory&&ce(h)){const{propsDefaults:m}=o;n in m?r=m[n]:(bn(o),r=m[n]=h.call(null,t),tn())}else r=h}d[0]&&(c&&!f?r=!1:d[1]&&(r===""||r===En(n))&&(r=!0))}return r}function is(e,t,n=!1){const r=t.propsCache,o=r.get(e);if(o)return o;const c=e.props,d={},f=[];let h=!1;if(!ce(e)){const b=x=>{h=!0;const[y,k]=is(x,t,!0);Fe(d,y),k&&f.push(...k)};!n&&t.mixins.length&&t.mixins.forEach(b),e.extends&&b(e.extends),e.mixins&&e.mixins.forEach(b)}if(!c&&!h)return Le(e)&&r.set(e,un),un;if(se(c))for(let b=0;b<c.length;b++){const x=Ct(c[b]);Ti(x)&&(d[x]=Ie)}else if(c)for(const b in c){const x=Ct(b);if(Ti(x)){const y=c[b],k=d[x]=se(y)||ce(y)?{type:y}:Fe({},y);if(k){const B=ji(Boolean,k.type),C=ji(String,k.type);k[0]=B>-1,k[1]=C<0||B<C,(B>-1||fe(k,"default"))&&f.push(x)}}}const m=[d,f];return Le(e)&&r.set(e,m),m}function Ti(e){return e[0]!=="$"}function Ri(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function Pi(e,t){return Ri(e)===Ri(t)}function ji(e,t){return se(t)?t.findIndex(n=>Pi(n,e)):ce(t)&&Pi(t,e)?0:-1}const ls=e=>e[0]==="_"||e==="$stable",Ba=e=>se(e)?e.map(Et):[Et(e)],Cu=(e,t,n)=>{if(t._n)return t;const r=Vp((...o)=>Ba(t(...o)),n);return r._c=!1,r},ss=(e,t,n)=>{const r=e._ctx;for(const o in e){if(ls(o))continue;const c=e[o];if(ce(c))t[o]=Cu(o,c,r);else if(c!=null){const d=Ba(c);t[o]=()=>d}}},cs=(e,t)=>{const n=Ba(t);e.slots.default=()=>n},Bu=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=me(t),Nr(t,"_",n)):ss(t,e.slots={})}else e.slots={},t&&cs(e,t);Nr(e.slots,ao,1)},Su=(e,t,n)=>{const{vnode:r,slots:o}=e;let c=!0,d=Ie;if(r.shapeFlag&32){const f=t._;f?n&&f===1?c=!1:(Fe(o,t),!n&&f===1&&delete o._):(c=!t.$stable,ss(t,o)),d=t}else t&&(cs(e,t),d={default:1});if(c)for(const f in o)!ls(f)&&!(f in d)&&delete o[f]};function ea(e,t,n,r,o=!1){if(se(e)){e.forEach((y,k)=>ea(y,t&&(se(t)?t[k]:t),n,r,o));return}if(Pr(r)&&!o)return;const c=r.shapeFlag&4?La(r.component)||r.component.proxy:r.el,d=o?null:c,{i:f,r:h}=e,m=t&&t.r,b=f.refs===Ie?f.refs={}:f.refs,x=f.setupState;if(m!=null&&m!==h&&(ze(m)?(b[m]=null,fe(x,m)&&(x[m]=null)):Qe(m)&&(m.value=null)),ce(h))Qt(h,f,12,[d,b]);else{const y=ze(h),k=Qe(h);if(y||k){const B=()=>{if(e.f){const C=y?fe(x,h)?x[h]:b[h]:h.value;o?se(C)&&ua(C,c):se(C)?C.includes(c)||C.push(c):y?(b[h]=[c],fe(x,h)&&(x[h]=b[h])):(h.value=[c],e.k&&(b[e.k]=h.value))}else y?(b[h]=d,fe(x,h)&&(x[h]=d)):k&&(h.value=d,e.k&&(b[e.k]=d))};d?(B.id=-1,Je(B,n)):B()}}}const Je=eu;function Iu(e){return Lu(e)}function Lu(e,t){const n=Wo();n.__VUE__=!0;const{insert:r,remove:o,patchProp:c,createElement:d,createText:f,createComment:h,setText:m,setElementText:b,parentNode:x,nextSibling:y,setScopeId:k=ft,insertStaticContent:B}=e,C=(E,w,S,O=null,M=null,q=null,J=!1,N=null,Y=!!w.dynamicChildren)=>{if(E===w)return;E&&!Zn(E,w)&&(O=j(E),qe(E,M,q,!0),E=null),w.patchFlag===-2&&(Y=!1,w.dynamicChildren=null);const{type:D,ref:re,shapeFlag:G}=w;switch(D){case oo:L(E,w,S,O);break;case nn:z(E,w,S,O);break;case Po:E==null&&T(w,S,O,J);break;case rt:Ne(E,w,S,O,M,q,J,N,Y);break;default:G&1?he(E,w,S,O,M,q,J,N,Y):G&6?De(E,w,S,O,M,q,J,N,Y):(G&64||G&128)&&D.process(E,w,S,O,M,q,J,N,Y,H)}re!=null&&M&&ea(re,E&&E.ref,q,w||E,!w)},L=(E,w,S,O)=>{if(E==null)r(w.el=f(w.children),S,O);else{const M=w.el=E.el;w.children!==E.children&&m(M,w.children)}},z=(E,w,S,O)=>{E==null?r(w.el=h(w.children||""),S,O):w.el=E.el},T=(E,w,S,O)=>{[E.el,E.anchor]=B(E.children,w,S,O,E.el,E.anchor)},$=({el:E,anchor:w},S,O)=>{let M;for(;E&&E!==w;)M=y(E),r(E,S,O),E=M;r(w,S,O)},F=({el:E,anchor:w})=>{let S;for(;E&&E!==w;)S=y(E),o(E),E=S;o(w)},he=(E,w,S,O,M,q,J,N,Y)=>{J=J||w.type==="svg",E==null?ke(w,S,O,M,q,J,N,Y):Ce(E,w,M,q,J,N,Y)},ke=(E,w,S,O,M,q,J,N)=>{let Y,D;const{type:re,props:G,shapeFlag:oe,transition:ae,dirs:de}=E;if(Y=E.el=d(E.type,q,G&&G.is,G),oe&8?b(Y,E.children):oe&16&&be(E.children,Y,null,O,M,q&&re!=="foreignObject",J,N),de&&Zt(E,null,O,"created"),Ve(Y,E,E.scopeId,J,O),G){for(const ge in G)ge!=="value"&&!Rr(ge)&&c(Y,ge,null,G[ge],q,E.children,O,M,Be);"value"in G&&c(Y,"value",null,G.value),(D=G.onVnodeBeforeMount)&&gt(D,O,E)}de&&Zt(E,null,O,"beforeMount");const Ee=(!M||M&&!M.pendingBranch)&&ae&&!ae.persisted;Ee&&ae.beforeEnter(Y),r(Y,w,S),((D=G&&G.onVnodeMounted)||Ee||de)&&Je(()=>{D&&gt(D,O,E),Ee&&ae.enter(Y),de&&Zt(E,null,O,"mounted")},M)},Ve=(E,w,S,O,M)=>{if(S&&k(E,S),O)for(let q=0;q<O.length;q++)k(E,O[q]);if(M){let q=M.subTree;if(w===q){const J=M.vnode;Ve(E,J,J.scopeId,J.slotScopeIds,M.parent)}}},be=(E,w,S,O,M,q,J,N,Y=0)=>{for(let D=Y;D<E.length;D++){const re=E[D]=N?Wt(E[D]):Et(E[D]);C(null,re,w,S,O,M,q,J,N)}},Ce=(E,w,S,O,M,q,J)=>{const N=w.el=E.el;let{patchFlag:Y,dynamicChildren:D,dirs:re}=w;Y|=E.patchFlag&16;const G=E.props||Ie,oe=w.props||Ie;let ae;S&&Jt(S,!1),(ae=oe.onVnodeBeforeUpdate)&&gt(ae,S,w,E),re&&Zt(w,E,S,"beforeUpdate"),S&&Jt(S,!0);const de=M&&w.type!=="foreignObject";if(D?le(E.dynamicChildren,D,N,S,O,de,q):J||ue(E,w,N,null,S,O,de,q,!1),Y>0){if(Y&16)Re(N,w,G,oe,S,O,M);else if(Y&2&&G.class!==oe.class&&c(N,"class",null,oe.class,M),Y&4&&c(N,"style",G.style,oe.style,M),Y&8){const Ee=w.dynamicProps;for(let ge=0;ge<Ee.length;ge++){const _e=Ee[ge],Ge=G[_e],Lt=oe[_e];(Lt!==Ge||_e==="value")&&c(N,_e,Ge,Lt,M,E.children,S,O,Be)}}Y&1&&E.children!==w.children&&b(N,w.children)}else!J&&D==null&&Re(N,w,G,oe,S,O,M);((ae=oe.onVnodeUpdated)||re)&&Je(()=>{ae&&gt(ae,S,w,E),re&&Zt(w,E,S,"updated")},O)},le=(E,w,S,O,M,q,J)=>{for(let N=0;N<w.length;N++){const Y=E[N],D=w[N],re=Y.el&&(Y.type===rt||!Zn(Y,D)||Y.shapeFlag&70)?x(Y.el):S;C(Y,D,re,null,O,M,q,J,!0)}},Re=(E,w,S,O,M,q,J)=>{if(S!==O){if(S!==Ie)for(const N in S)!Rr(N)&&!(N in O)&&c(E,N,S[N],null,J,w.children,M,q,Be);for(const N in O){if(Rr(N))continue;const Y=O[N],D=S[N];Y!==D&&N!=="value"&&c(E,N,D,Y,J,w.children,M,q,Be)}"value"in O&&c(E,"value",S.value,O.value)}},Ne=(E,w,S,O,M,q,J,N,Y)=>{const D=w.el=E?E.el:f(""),re=w.anchor=E?E.anchor:f("");let{patchFlag:G,dynamicChildren:oe,slotScopeIds:ae}=w;ae&&(N=N?N.concat(ae):ae),E==null?(r(D,S,O),r(re,S,O),be(w.children,S,re,M,q,J,N,Y)):G>0&&G&64&&oe&&E.dynamicChildren?(le(E.dynamicChildren,oe,S,M,q,J,N),(w.key!=null||M&&w===M.subTree)&&ds(E,w,!0)):ue(E,w,S,re,M,q,J,N,Y)},De=(E,w,S,O,M,q,J,N,Y)=>{w.slotScopeIds=N,E==null?w.shapeFlag&512?M.ctx.activate(w,S,O,J,Y):St(w,S,O,M,q,J,Y):zt(E,w,Y)},St=(E,w,S,O,M,q,J)=>{const N=E.component=Du(E,O,M);if(Gl(E)&&(N.ctx.renderer=H),qu(N),N.asyncDep){if(M&&M.registerDep(N,Oe),!E.el){const Y=N.subTree=K(nn);z(null,Y,w,S)}return}Oe(N,E,w,S,M,q,J)},zt=(E,w,S)=>{const O=w.component=E.component;if(Jp(E,w,S))if(O.asyncDep&&!O.asyncResolved){ve(O,w,S);return}else O.next=w,Wp(O.update),O.update();else w.el=E.el,O.vnode=w},Oe=(E,w,S,O,M,q,J)=>{const N=()=>{if(E.isMounted){let{next:re,bu:G,u:oe,parent:ae,vnode:de}=E,Ee=re,ge;Jt(E,!1),re?(re.el=de.el,ve(E,re,J)):re=de,G&&Lo(G),(ge=re.props&&re.props.onVnodeBeforeUpdate)&&gt(ge,ae,re,de),Jt(E,!0);const _e=Oo(E),Ge=E.subTree;E.subTree=_e,C(Ge,_e,x(Ge.el),j(Ge),E,M,q),re.el=_e.el,Ee===null&&Xp(E,_e.el),oe&&Je(oe,M),(ge=re.props&&re.props.onVnodeUpdated)&&Je(()=>gt(ge,ae,re,de),M)}else{let re;const{el:G,props:oe}=w,{bm:ae,m:de,parent:Ee}=E,ge=Pr(w);if(Jt(E,!1),ae&&Lo(ae),!ge&&(re=oe&&oe.onVnodeBeforeMount)&&gt(re,Ee,w),Jt(E,!0),G&&ye){const _e=()=>{E.subTree=Oo(E),ye(G,E.subTree,E,M,null)};ge?w.type.__asyncLoader().then(()=>!E.isUnmounted&&_e()):_e()}else{const _e=E.subTree=Oo(E);C(null,_e,S,O,E,M,q),w.el=_e.el}if(de&&Je(de,M),!ge&&(re=oe&&oe.onVnodeMounted)){const _e=w;Je(()=>gt(re,Ee,_e),M)}(w.shapeFlag&256||Ee&&Pr(Ee.vnode)&&Ee.vnode.shapeFlag&256)&&E.a&&Je(E.a,M),E.isMounted=!0,w=S=O=null}},Y=E.effect=new ha(N,()=>wa(D),E.scope),D=E.update=()=>Y.run();D.id=E.uid,Jt(E,!0),D()},ve=(E,w,S)=>{w.component=E;const O=E.vnode.props;E.vnode=w,E.next=null,ku(E,w.props,O,S),Su(E,w.children,S),wn(),Ci(),kn()},ue=(E,w,S,O,M,q,J,N,Y=!1)=>{const D=E&&E.children,re=E?E.shapeFlag:0,G=w.children,{patchFlag:oe,shapeFlag:ae}=w;if(oe>0){if(oe&128){it(D,G,S,O,M,q,J,N,Y);return}else if(oe&256){te(D,G,S,O,M,q,J,N,Y);return}}ae&8?(re&16&&Be(D,M,q),G!==D&&b(S,G)):re&16?ae&16?it(D,G,S,O,M,q,J,N,Y):Be(D,M,q,!0):(re&8&&b(S,""),ae&16&&be(G,S,O,M,q,J,N,Y))},te=(E,w,S,O,M,q,J,N,Y)=>{E=E||un,w=w||un;const D=E.length,re=w.length,G=Math.min(D,re);let oe;for(oe=0;oe<G;oe++){const ae=w[oe]=Y?Wt(w[oe]):Et(w[oe]);C(E[oe],ae,S,null,M,q,J,N,Y)}D>re?Be(E,M,q,!0,!1,G):be(w,S,O,M,q,J,N,Y,G)},it=(E,w,S,O,M,q,J,N,Y)=>{let D=0;const re=w.length;let G=E.length-1,oe=re-1;for(;D<=G&&D<=oe;){const ae=E[D],de=w[D]=Y?Wt(w[D]):Et(w[D]);if(Zn(ae,de))C(ae,de,S,null,M,q,J,N,Y);else break;D++}for(;D<=G&&D<=oe;){const ae=E[G],de=w[oe]=Y?Wt(w[oe]):Et(w[oe]);if(Zn(ae,de))C(ae,de,S,null,M,q,J,N,Y);else break;G--,oe--}if(D>G){if(D<=oe){const ae=oe+1,de=ae<re?w[ae].el:O;for(;D<=oe;)C(null,w[D]=Y?Wt(w[D]):Et(w[D]),S,de,M,q,J,N,Y),D++}}else if(D>oe)for(;D<=G;)qe(E[D],M,q,!0),D++;else{const ae=D,de=D,Ee=new Map;for(D=de;D<=oe;D++){const Ye=w[D]=Y?Wt(w[D]):Et(w[D]);Ye.key!=null&&Ee.set(Ye.key,D)}let ge,_e=0;const Ge=oe-de+1;let Lt=!1,R=0;const tt=new Array(Ge);for(D=0;D<Ge;D++)tt[D]=0;for(D=ae;D<=G;D++){const Ye=E[D];if(_e>=Ge){qe(Ye,M,q,!0);continue}let pe;if(Ye.key!=null)pe=Ee.get(Ye.key);else for(ge=de;ge<=oe;ge++)if(tt[ge-de]===0&&Zn(Ye,w[ge])){pe=ge;break}pe===void 0?qe(Ye,M,q,!0):(tt[pe-de]=D+1,pe>=R?R=pe:Lt=!0,C(Ye,w[pe],S,null,M,q,J,N,Y),_e++)}const Bn=Lt?_u(tt):un;for(ge=Bn.length-1,D=Ge-1;D>=0;D--){const Ye=de+D,pe=w[Ye],br=Ye+1<re?w[Ye+1].el:O;tt[D]===0?C(null,pe,S,br,M,q,J,N,Y):Lt&&(ge<0||D!==Bn[ge]?We(pe,S,br,2):ge--)}}},We=(E,w,S,O,M=null)=>{const{el:q,type:J,transition:N,children:Y,shapeFlag:D}=E;if(D&6){We(E.component.subTree,w,S,O);return}if(D&128){E.suspense.move(w,S,O);return}if(D&64){J.move(E,w,S,H);return}if(J===rt){r(q,w,S);for(let G=0;G<Y.length;G++)We(Y[G],w,S,O);r(E.anchor,w,S);return}if(J===Po){$(E,w,S);return}if(O!==2&&D&1&&N)if(O===0)N.beforeEnter(q),r(q,w,S),Je(()=>N.enter(q),M);else{const{leave:G,delayLeave:oe,afterLeave:ae}=N,de=()=>r(q,w,S),Ee=()=>{G(q,()=>{de(),ae&&ae()})};oe?oe(q,de,Ee):Ee()}else r(q,w,S)},qe=(E,w,S,O=!1,M=!1)=>{const{type:q,props:J,ref:N,children:Y,dynamicChildren:D,shapeFlag:re,patchFlag:G,dirs:oe}=E;if(N!=null&&ea(N,null,S,E,!0),re&256){w.ctx.deactivate(E);return}const ae=re&1&&oe,de=!Pr(E);let Ee;if(de&&(Ee=J&&J.onVnodeBeforeUnmount)&&gt(Ee,w,E),re&6)Mt(E.component,S,O);else{if(re&128){E.suspense.unmount(S,O);return}ae&&Zt(E,null,w,"beforeUnmount"),re&64?E.type.remove(E,w,S,M,H,O):D&&(q!==rt||G>0&&G&64)?Be(D,w,S,!1,!0):(q===rt&&G&384||!M&&re&16)&&Be(Y,w,S),O&&It(E)}(de&&(Ee=J&&J.onVnodeUnmounted)||ae)&&Je(()=>{Ee&&gt(Ee,w,E),ae&&Zt(E,null,w,"unmounted")},S)},It=E=>{const{type:w,el:S,anchor:O,transition:M}=E;if(w===rt){mt(S,O);return}if(w===Po){F(E);return}const q=()=>{o(S),M&&!M.persisted&&M.afterLeave&&M.afterLeave()};if(E.shapeFlag&1&&M&&!M.persisted){const{leave:J,delayLeave:N}=M,Y=()=>J(S,q);N?N(E.el,q,Y):Y()}else q()},mt=(E,w)=>{let S;for(;E!==w;)S=y(E),o(E),E=S;o(w)},Mt=(E,w,S)=>{const{bum:O,scope:M,update:q,subTree:J,um:N}=E;O&&Lo(O),M.stop(),q&&(q.active=!1,qe(J,E,w,S)),N&&Je(N,w),Je(()=>{E.isUnmounted=!0},w),w&&w.pendingBranch&&!w.isUnmounted&&E.asyncDep&&!E.asyncResolved&&E.suspenseId===w.pendingId&&(w.deps--,w.deps===0&&w.resolve())},Be=(E,w,S,O=!1,M=!1,q=0)=>{for(let J=q;J<E.length;J++)qe(E[J],w,S,O,M)},j=E=>E.shapeFlag&6?j(E.component.subTree):E.shapeFlag&128?E.suspense.next():y(E.anchor||E.el),Z=(E,w,S)=>{E==null?w._vnode&&qe(w._vnode,null,null,!0):C(w._vnode||null,E,w,null,null,null,S),Ci(),Kl(),w._vnode=E},H={p:C,um:qe,m:We,r:It,mt:St,mc:be,pc:ue,pbc:le,n:j,o:e};let ne,ye;return t&&([ne,ye]=t(H)),{render:Z,hydrate:ne,createApp:Eu(Z,ne)}}function Jt({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function ds(e,t,n=!1){const r=e.children,o=t.children;if(se(r)&&se(o))for(let c=0;c<r.length;c++){const d=r[c];let f=o[c];f.shapeFlag&1&&!f.dynamicChildren&&((f.patchFlag<=0||f.patchFlag===32)&&(f=o[c]=Wt(o[c]),f.el=d.el),n||ds(d,f)),f.type===oo&&(f.el=d.el)}}function _u(e){const t=e.slice(),n=[0];let r,o,c,d,f;const h=e.length;for(r=0;r<h;r++){const m=e[r];if(m!==0){if(o=n[n.length-1],e[o]<m){t[r]=o,n.push(r);continue}for(c=0,d=n.length-1;c<d;)f=c+d>>1,e[n[f]]<m?c=f+1:d=f;m<e[n[c]]&&(c>0&&(t[r]=n[c-1]),n[c]=r)}}for(c=n.length,d=n[c-1];c-- >0;)n[c]=d,d=t[d];return n}const Ou=e=>e.__isTeleport,rt=Symbol.for("v-fgt"),oo=Symbol.for("v-txt"),nn=Symbol.for("v-cmt"),Po=Symbol.for("v-stc"),rr=[];let ut=null;function Se(e=!1){rr.push(ut=e?null:[])}function Tu(){rr.pop(),ut=rr[rr.length-1]||null}let pr=1;function zi(e){pr+=e}function ps(e){return e.dynamicChildren=pr>0?ut||un:null,Tu(),pr>0&&ut&&ut.push(e),e}function Ze(e,t,n,r,o,c){return ps(et(e,t,n,r,o,c,!0))}function xt(e,t,n,r,o){return ps(K(e,t,n,r,o,!0))}function ta(e){return e?e.__v_isVNode===!0:!1}function Zn(e,t){return e.type===t.type&&e.key===t.key}const ao="__vInternal",us=({key:e})=>e??null,zr=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?ze(e)||Qe(e)||ce(e)?{i:pt,r:e,k:t,f:!!n}:e:null);function et(e,t=null,n=null,r=0,o=null,c=e===rt?0:1,d=!1,f=!1){const h={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&us(t),ref:t&&zr(t),scopeId:$l,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:c,patchFlag:r,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:pt};return f?(Sa(h,n),c&128&&e.normalize(h)):n&&(h.shapeFlag|=ze(n)?8:16),pr>0&&!d&&ut&&(h.patchFlag>0||c&6)&&h.patchFlag!==32&&ut.push(h),h}const K=Ru;function Ru(e,t=null,n=null,r=0,o=null,c=!1){if((!e||e===fu)&&(e=nn),ta(e)){const f=mn(e,t,!0);return n&&Sa(f,n),pr>0&&!c&&ut&&(f.shapeFlag&6?ut[ut.indexOf(e)]=f:ut.push(f)),f.patchFlag|=-2,f}if(Wu(e)&&(e=e.__vccOpts),t){t=Pu(t);let{class:f,style:h}=t;f&&!ze(f)&&(t.class=lr(f)),Le(h)&&(Ml(h)&&!se(h)&&(h=Fe({},h)),t.style=Xr(h))}const d=ze(e)?1:Gp(e)?128:Ou(e)?64:Le(e)?4:ce(e)?2:0;return et(e,t,n,r,o,d,c,!0)}function Pu(e){return e?Ml(e)||ao in e?Fe({},e):e:null}function mn(e,t,n=!1){const{props:r,ref:o,patchFlag:c,children:d}=e,f=t?ju(r||{},t):r;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:f,key:f&&us(f),ref:t&&t.ref?n&&o?se(o)?o.concat(zr(t)):[o,zr(t)]:zr(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:d,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==rt?c===-1?16:c|16:c,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&mn(e.ssContent),ssFallback:e.ssFallback&&mn(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function fs(e=" ",t=0){return K(oo,null,e,t)}function vt(e="",t=!1){return t?(Se(),xt(nn,null,e)):K(nn,null,e)}function Et(e){return e==null||typeof e=="boolean"?K(nn):se(e)?K(rt,null,e.slice()):typeof e=="object"?Wt(e):K(oo,null,String(e))}function Wt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:mn(e)}function Sa(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(se(t))n=16;else if(typeof t=="object")if(r&65){const o=t.default;o&&(o._c&&(o._d=!1),Sa(e,o()),o._c&&(o._d=!0));return}else{n=32;const o=t._;!o&&!(ao in t)?t._ctx=pt:o===3&&pt&&(pt.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else ce(t)?(t={default:t,_ctx:pt},n=32):(t=String(t),r&64?(n=16,t=[fs(t)]):n=8);e.children=t,e.shapeFlag|=n}function ju(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const o in r)if(o==="class")t.class!==r.class&&(t.class=lr([t.class,r.class]));else if(o==="style")t.style=Xr([t.style,r.style]);else if(Vr(o)){const c=t[o],d=r[o];d&&c!==d&&!(se(c)&&c.includes(d))&&(t[o]=c?[].concat(c,d):d)}else o!==""&&(t[o]=r[o])}return t}function gt(e,t,n,r=null){At(e,t,7,[n,r])}const zu=os();let Mu=0;function Du(e,t,n){const r=e.type,o=(t?t.appContext:e.appContext)||zu,c={uid:Mu++,vnode:e,type:r,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,scope:new sp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:is(r,o),emitsOptions:Vl(r,o),emit:null,emitted:null,propsDefaults:Ie,inheritAttrs:r.inheritAttrs,ctx:Ie,data:Ie,props:Ie,attrs:Ie,slots:Ie,refs:Ie,setupState:Ie,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return c.ctx={_:c},c.root=t?t.root:c,c.emit=Qp.bind(null,c),e.ce&&e.ce(c),c}let He=null,Ia,cn,Mi="__VUE_INSTANCE_SETTERS__";(cn=Wo()[Mi])||(cn=Wo()[Mi]=[]),cn.push(e=>He=e),Ia=e=>{cn.length>1?cn.forEach(t=>t(e)):cn[0](e)};const bn=e=>{Ia(e),e.scope.on()},tn=()=>{He&&He.scope.off(),Ia(null)};function As(e){return e.vnode.shapeFlag&4}let ur=!1;function qu(e,t=!1){ur=t;const{props:n,children:r}=e.vnode,o=As(e);wu(e,n,o,t),Bu(e,r);const c=o?Fu(e,t):void 0;return ur=!1,c}function Fu(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=Dl(new Proxy(e.ctx,yu));const{setup:r}=n;if(r){const o=e.setupContext=r.length>1?Uu(e):null;bn(e),wn();const c=Qt(r,e,0,[e.props,o]);if(kn(),tn(),vl(c)){if(c.then(tn,tn),t)return c.then(d=>{Di(e,d,t)}).catch(d=>{to(d,e,0)});e.asyncDep=c}else Di(e,c,t)}else ys(e,t)}function Di(e,t,n){ce(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Le(t)&&(e.setupState=Ul(t)),ys(e,n)}let qi;function ys(e,t,n){const r=e.type;if(!e.render){if(!t&&qi&&!r.render){const o=r.template||Ca(e).template;if(o){const{isCustomElement:c,compilerOptions:d}=e.appContext.config,{delimiters:f,compilerOptions:h}=r,m=Fe(Fe({isCustomElement:c,delimiters:f},d),h);r.render=qi(o,m)}}e.render=r.render||ft}bn(e),wn(),hu(e),kn(),tn()}function Nu(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,n){return Xe(e,"get","$attrs"),t[n]}}))}function Uu(e){const t=n=>{e.exposed=n||{}};return{get attrs(){return Nu(e)},slots:e.slots,emit:e.emit,expose:t}}function La(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Ul(Dl(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in nr)return nr[n](e)},has(t,n){return n in t||n in nr}}))}function Hu(e,t=!0){return ce(e)?e.displayName||e.name:e.name||t&&e.__name}function Wu(e){return ce(e)&&"__vccOpts"in e}const dt=(e,t)=>Np(e,t,ur);function hs(e,t,n){const r=arguments.length;return r===2?Le(t)&&!se(t)?ta(t)?K(e,null,[t]):K(e,t):K(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&ta(n)&&(n=[n]),K(e,t,n))}const Yu=Symbol.for("v-scx"),Ku=()=>ot(Yu),Qu="3.3.4",Vu="http://www.w3.org/2000/svg",Gt=typeof document<"u"?document:null,Fi=Gt&&Gt.createElement("template"),$u={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const o=t?Gt.createElementNS(Vu,e):Gt.createElement(e,n?{is:n}:void 0);return e==="select"&&r&&r.multiple!=null&&o.setAttribute("multiple",r.multiple),o},createText:e=>Gt.createTextNode(e),createComment:e=>Gt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Gt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,o,c){const d=n?n.previousSibling:t.lastChild;if(o&&(o===c||o.nextSibling))for(;t.insertBefore(o.cloneNode(!0),n),!(o===c||!(o=o.nextSibling)););else{Fi.innerHTML=r?`<svg>${e}</svg>`:e;const f=Fi.content;if(r){const h=f.firstChild;for(;h.firstChild;)f.appendChild(h.firstChild);f.removeChild(h)}t.insertBefore(f,n)}return[d?d.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function Zu(e,t,n){const r=e._vtc;r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function Ju(e,t,n){const r=e.style,o=ze(n);if(n&&!o){if(t&&!ze(t))for(const c in t)n[c]==null&&na(r,c,"");for(const c in n)na(r,c,n[c])}else{const c=r.display;o?t!==n&&(r.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(r.display=c)}}const Ni=/\s*!important$/;function na(e,t,n){if(se(n))n.forEach(r=>na(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=Xu(e,t);Ni.test(n)?e.setProperty(En(r),n.replace(Ni,""),"important"):e[r]=n}}const Ui=["Webkit","Moz","ms"],jo={};function Xu(e,t){const n=jo[t];if(n)return n;let r=Ct(t);if(r!=="filter"&&r in e)return jo[t]=r;r=Jr(r);for(let o=0;o<Ui.length;o++){const c=Ui[o]+r;if(c in e)return jo[t]=c}return t}const Hi="http://www.w3.org/1999/xlink";function Gu(e,t,n,r,o){if(r&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(Hi,t.slice(6,t.length)):e.setAttributeNS(Hi,t,n);else{const c=lp(t);n==null||c&&!wl(n)?e.removeAttribute(t):e.setAttribute(t,c?"":n)}}function ef(e,t,n,r,o,c,d){if(t==="innerHTML"||t==="textContent"){r&&d(r,o,c),e[t]=n??"";return}const f=e.tagName;if(t==="value"&&f!=="PROGRESS"&&!f.includes("-")){e._value=n;const m=f==="OPTION"?e.getAttribute("value"):e.value,b=n??"";m!==b&&(e.value=b),n==null&&e.removeAttribute(t);return}let h=!1;if(n===""||n==null){const m=typeof e[t];m==="boolean"?n=wl(n):n==null&&m==="string"?(n="",h=!0):m==="number"&&(n=0,h=!0)}try{e[t]=n}catch{}h&&e.removeAttribute(t)}function tf(e,t,n,r){e.addEventListener(t,n,r)}function nf(e,t,n,r){e.removeEventListener(t,n,r)}function rf(e,t,n,r,o=null){const c=e._vei||(e._vei={}),d=c[t];if(r&&d)d.value=r;else{const[f,h]=of(t);if(r){const m=c[t]=sf(r,o);tf(e,f,m,h)}else d&&(nf(e,f,d,h),c[t]=void 0)}}const Wi=/(?:Once|Passive|Capture)$/;function of(e){let t;if(Wi.test(e)){t={};let r;for(;r=e.match(Wi);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):En(e.slice(2)),t]}let zo=0;const af=Promise.resolve(),lf=()=>zo||(af.then(()=>zo=0),zo=Date.now());function sf(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;At(cf(r,n.value),t,5,[r])};return n.value=e,n.attached=lf(),n}function cf(e,t){if(se(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>o=>!o._stopped&&r&&r(o))}else return t}const Yi=/^on[a-z]/,df=(e,t,n,r,o=!1,c,d,f,h)=>{t==="class"?Zu(e,r,o):t==="style"?Ju(e,n,r):Vr(t)?pa(t)||rf(e,t,n,r,d):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):pf(e,t,r,o))?ef(e,t,r,c,d,f,h):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),Gu(e,t,r,o))};function pf(e,t,n,r){return r?!!(t==="innerHTML"||t==="textContent"||t in e&&Yi.test(t)&&ce(n)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||Yi.test(t)&&ze(n)?!1:t in e}const uf=Fe({patchProp:df},$u);let Ki;function ff(){return Ki||(Ki=Iu(uf))}const Af=(...e)=>{const t=ff().createApp(...e),{mount:n}=t;return t.mount=r=>{const o=yf(r);if(!o)return;const c=t._component;!ce(c)&&!c.render&&!c.template&&(c.template=o.innerHTML),o.innerHTML="";const d=n(o,!1,o instanceof SVGElement);return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),d},t};function yf(e){return ze(e)?document.querySelector(e):e}const _a=(e,t)=>{const n=e.__vccOpts||e;for(const[r,o]of t)n[r]=o;return n},hf={};function mf(e,t){const n=uu("router-view");return Se(),xt(n)}const bf=_a(hf,[["render",mf]]);/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const dn=typeof window<"u";function gf(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const xe=Object.assign;function Mo(e,t){const n={};for(const r in t){const o=t[r];n[r]=yt(o)?o.map(e):e(o)}return n}const or=()=>{},yt=Array.isArray,vf=/\/$/,xf=e=>e.replace(vf,"");function Do(e,t,n="/"){let r,o={},c="",d="";const f=t.indexOf("#");let h=t.indexOf("?");return f<h&&f>=0&&(h=-1),h>-1&&(r=t.slice(0,h),c=t.slice(h+1,f>-1?f:t.length),o=e(c)),f>-1&&(r=r||t.slice(0,f),d=t.slice(f,t.length)),r=Cf(r??t,n),{fullPath:r+(c&&"?")+c+d,path:r,query:o,hash:d}}function Ef(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function Qi(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function wf(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&gn(t.matched[r],n.matched[o])&&ms(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function gn(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function ms(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!kf(e[n],t[n]))return!1;return!0}function kf(e,t){return yt(e)?Vi(e,t):yt(t)?Vi(t,e):e===t}function Vi(e,t){return yt(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function Cf(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];(o===".."||o===".")&&r.push("");let c=n.length-1,d,f;for(d=0;d<r.length;d++)if(f=r[d],f!==".")if(f==="..")c>1&&c--;else break;return n.slice(0,c).join("/")+"/"+r.slice(d-(d===r.length?1:0)).join("/")}var fr;(function(e){e.pop="pop",e.push="push"})(fr||(fr={}));var ar;(function(e){e.back="back",e.forward="forward",e.unknown=""})(ar||(ar={}));function Bf(e){if(!e)if(dn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),xf(e)}const Sf=/^[^#]+#/;function If(e,t){return e.replace(Sf,"#")+t}function Lf(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const io=()=>({left:window.pageXOffset,top:window.pageYOffset});function _f(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=Lf(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function $i(e,t){return(history.state?history.state.position-t:-1)+e}const ra=new Map;function Of(e,t){ra.set(e,t)}function Tf(e){const t=ra.get(e);return ra.delete(e),t}let Rf=()=>location.protocol+"//"+location.host;function bs(e,t){const{pathname:n,search:r,hash:o}=t,c=e.indexOf("#");if(c>-1){let f=o.includes(e.slice(c))?e.slice(c).length:1,h=o.slice(f);return h[0]!=="/"&&(h="/"+h),Qi(h,"")}return Qi(n,e)+r+o}function Pf(e,t,n,r){let o=[],c=[],d=null;const f=({state:y})=>{const k=bs(e,location),B=n.value,C=t.value;let L=0;if(y){if(n.value=k,t.value=y,d&&d===B){d=null;return}L=C?y.position-C.position:0}else r(k);o.forEach(z=>{z(n.value,B,{delta:L,type:fr.pop,direction:L?L>0?ar.forward:ar.back:ar.unknown})})};function h(){d=n.value}function m(y){o.push(y);const k=()=>{const B=o.indexOf(y);B>-1&&o.splice(B,1)};return c.push(k),k}function b(){const{history:y}=window;y.state&&y.replaceState(xe({},y.state,{scroll:io()}),"")}function x(){for(const y of c)y();c=[],window.removeEventListener("popstate",f),window.removeEventListener("beforeunload",b)}return window.addEventListener("popstate",f),window.addEventListener("beforeunload",b,{passive:!0}),{pauseListeners:h,listen:m,destroy:x}}function Zi(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?io():null}}function jf(e){const{history:t,location:n}=window,r={value:bs(e,n)},o={value:t.state};o.value||c(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function c(h,m,b){const x=e.indexOf("#"),y=x>-1?(n.host&&document.querySelector("base")?e:e.slice(x))+h:Rf()+e+h;try{t[b?"replaceState":"pushState"](m,"",y),o.value=m}catch(k){console.error(k),n[b?"replace":"assign"](y)}}function d(h,m){const b=xe({},t.state,Zi(o.value.back,h,o.value.forward,!0),m,{position:o.value.position});c(h,b,!0),r.value=h}function f(h,m){const b=xe({},o.value,t.state,{forward:h,scroll:io()});c(b.current,b,!0);const x=xe({},Zi(r.value,h,null),{position:b.position+1},m);c(h,x,!1),r.value=h}return{location:r,state:o,push:f,replace:d}}function zf(e){e=Bf(e);const t=jf(e),n=Pf(e,t.state,t.location,t.replace);function r(c,d=!0){d||n.pauseListeners(),history.go(c)}const o=xe({location:"",base:e,go:r,createHref:If.bind(null,e)},t,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>t.state.value}),o}function Mf(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),zf(e)}function Df(e){return typeof e=="string"||e&&typeof e=="object"}function gs(e){return typeof e=="string"||typeof e=="symbol"}const Ut={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},vs=Symbol("");var Ji;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(Ji||(Ji={}));function vn(e,t){return xe(new Error,{type:e,[vs]:!0},t)}function Ot(e,t){return e instanceof Error&&vs in e&&(t==null||!!(e.type&t))}const Xi="[^/]+?",qf={sensitive:!1,strict:!1,start:!0,end:!0},Ff=/[.+*?^${}()[\]/\\]/g;function Nf(e,t){const n=xe({},qf,t),r=[];let o=n.start?"^":"";const c=[];for(const m of e){const b=m.length?[]:[90];n.strict&&!m.length&&(o+="/");for(let x=0;x<m.length;x++){const y=m[x];let k=40+(n.sensitive?.25:0);if(y.type===0)x||(o+="/"),o+=y.value.replace(Ff,"\\$&"),k+=40;else if(y.type===1){const{value:B,repeatable:C,optional:L,regexp:z}=y;c.push({name:B,repeatable:C,optional:L});const T=z||Xi;if(T!==Xi){k+=10;try{new RegExp(`(${T})`)}catch(F){throw new Error(`Invalid custom RegExp for param "${B}" (${T}): `+F.message)}}let $=C?`((?:${T})(?:/(?:${T}))*)`:`(${T})`;x||($=L&&m.length<2?`(?:/${$})`:"/"+$),L&&($+="?"),o+=$,k+=20,L&&(k+=-8),C&&(k+=-20),T===".*"&&(k+=-50)}b.push(k)}r.push(b)}if(n.strict&&n.end){const m=r.length-1;r[m][r[m].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const d=new RegExp(o,n.sensitive?"":"i");function f(m){const b=m.match(d),x={};if(!b)return null;for(let y=1;y<b.length;y++){const k=b[y]||"",B=c[y-1];x[B.name]=k&&B.repeatable?k.split("/"):k}return x}function h(m){let b="",x=!1;for(const y of e){(!x||!b.endsWith("/"))&&(b+="/"),x=!1;for(const k of y)if(k.type===0)b+=k.value;else if(k.type===1){const{value:B,repeatable:C,optional:L}=k,z=B in m?m[B]:"";if(yt(z)&&!C)throw new Error(`Provided param "${B}" is an array but it is not repeatable (* or + modifiers)`);const T=yt(z)?z.join("/"):z;if(!T)if(L)y.length<2&&(b.endsWith("/")?b=b.slice(0,-1):x=!0);else throw new Error(`Missing required param "${B}"`);b+=T}}return b||"/"}return{re:d,score:r,keys:c,parse:f,stringify:h}}function Uf(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===40+40?-1:1:e.length>t.length?t.length===1&&t[0]===40+40?1:-1:0}function Hf(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const c=Uf(r[n],o[n]);if(c)return c;n++}if(Math.abs(o.length-r.length)===1){if(Gi(r))return 1;if(Gi(o))return-1}return o.length-r.length}function Gi(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Wf={type:0,value:""},Yf=/[a-zA-Z0-9_]/;function Kf(e){if(!e)return[[]];if(e==="/")return[[Wf]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(k){throw new Error(`ERR (${n})/"${m}": ${k}`)}let n=0,r=n;const o=[];let c;function d(){c&&o.push(c),c=[]}let f=0,h,m="",b="";function x(){m&&(n===0?c.push({type:0,value:m}):n===1||n===2||n===3?(c.length>1&&(h==="*"||h==="+")&&t(`A repeatable param (${m}) must be alone in its segment. eg: '/:ids+.`),c.push({type:1,value:m,regexp:b,repeatable:h==="*"||h==="+",optional:h==="*"||h==="?"})):t("Invalid state to consume buffer"),m="")}function y(){m+=h}for(;f<e.length;){if(h=e[f++],h==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:h==="/"?(m&&x(),d()):h===":"?(x(),n=1):y();break;case 4:y(),n=r;break;case 1:h==="("?n=2:Yf.test(h)?y():(x(),n=0,h!=="*"&&h!=="?"&&h!=="+"&&f--);break;case 2:h===")"?b[b.length-1]=="\\"?b=b.slice(0,-1)+h:n=3:b+=h;break;case 3:x(),n=0,h!=="*"&&h!=="?"&&h!=="+"&&f--,b="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${m}"`),x(),d(),o}function Qf(e,t,n){const r=Nf(Kf(e.path),n),o=xe(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function Vf(e,t){const n=[],r=new Map;t=nl({strict:!1,end:!0,sensitive:!1},t);function o(b){return r.get(b)}function c(b,x,y){const k=!y,B=$f(b);B.aliasOf=y&&y.record;const C=nl(t,b),L=[B];if("alias"in b){const $=typeof b.alias=="string"?[b.alias]:b.alias;for(const F of $)L.push(xe({},B,{components:y?y.record.components:B.components,path:F,aliasOf:y?y.record:B}))}let z,T;for(const $ of L){const{path:F}=$;if(x&&F[0]!=="/"){const he=x.record.path,ke=he[he.length-1]==="/"?"":"/";$.path=x.record.path+(F&&ke+F)}if(z=Qf($,x,C),y?y.alias.push(z):(T=T||z,T!==z&&T.alias.push(z),k&&b.name&&!tl(z)&&d(b.name)),B.children){const he=B.children;for(let ke=0;ke<he.length;ke++)c(he[ke],z,y&&y.children[ke])}y=y||z,(z.record.components&&Object.keys(z.record.components).length||z.record.name||z.record.redirect)&&h(z)}return T?()=>{d(T)}:or}function d(b){if(gs(b)){const x=r.get(b);x&&(r.delete(b),n.splice(n.indexOf(x),1),x.children.forEach(d),x.alias.forEach(d))}else{const x=n.indexOf(b);x>-1&&(n.splice(x,1),b.record.name&&r.delete(b.record.name),b.children.forEach(d),b.alias.forEach(d))}}function f(){return n}function h(b){let x=0;for(;x<n.length&&Hf(b,n[x])>=0&&(b.record.path!==n[x].record.path||!xs(b,n[x]));)x++;n.splice(x,0,b),b.record.name&&!tl(b)&&r.set(b.record.name,b)}function m(b,x){let y,k={},B,C;if("name"in b&&b.name){if(y=r.get(b.name),!y)throw vn(1,{location:b});C=y.record.name,k=xe(el(x.params,y.keys.filter(T=>!T.optional).map(T=>T.name)),b.params&&el(b.params,y.keys.map(T=>T.name))),B=y.stringify(k)}else if("path"in b)B=b.path,y=n.find(T=>T.re.test(B)),y&&(k=y.parse(B),C=y.record.name);else{if(y=x.name?r.get(x.name):n.find(T=>T.re.test(x.path)),!y)throw vn(1,{location:b,currentLocation:x});C=y.record.name,k=xe({},x.params,b.params),B=y.stringify(k)}const L=[];let z=y;for(;z;)L.unshift(z.record),z=z.parent;return{name:C,path:B,params:k,matched:L,meta:Jf(L)}}return e.forEach(b=>c(b)),{addRoute:c,resolve:m,removeRoute:d,getRoutes:f,getRecordMatcher:o}}function el(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function $f(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:Zf(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function Zf(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function tl(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Jf(e){return e.reduce((t,n)=>xe(t,n.meta),{})}function nl(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function xs(e,t){return t.children.some(n=>n===e||xs(e,n))}const Es=/#/g,Xf=/&/g,Gf=/\//g,eA=/=/g,tA=/\?/g,ws=/\+/g,nA=/%5B/g,rA=/%5D/g,ks=/%5E/g,oA=/%60/g,Cs=/%7B/g,aA=/%7C/g,Bs=/%7D/g,iA=/%20/g;function Oa(e){return encodeURI(""+e).replace(aA,"|").replace(nA,"[").replace(rA,"]")}function lA(e){return Oa(e).replace(Cs,"{").replace(Bs,"}").replace(ks,"^")}function oa(e){return Oa(e).replace(ws,"%2B").replace(iA,"+").replace(Es,"%23").replace(Xf,"%26").replace(oA,"`").replace(Cs,"{").replace(Bs,"}").replace(ks,"^")}function sA(e){return oa(e).replace(eA,"%3D")}function cA(e){return Oa(e).replace(Es,"%23").replace(tA,"%3F")}function dA(e){return e==null?"":cA(e).replace(Gf,"%2F")}function Kr(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function pA(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<r.length;++o){const c=r[o].replace(ws," "),d=c.indexOf("="),f=Kr(d<0?c:c.slice(0,d)),h=d<0?null:Kr(c.slice(d+1));if(f in t){let m=t[f];yt(m)||(m=t[f]=[m]),m.push(h)}else t[f]=h}return t}function rl(e){let t="";for(let n in e){const r=e[n];if(n=sA(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(yt(r)?r.map(c=>c&&oa(c)):[r&&oa(r)]).forEach(c=>{c!==void 0&&(t+=(t.length?"&":"")+n,c!=null&&(t+="="+c))})}return t}function uA(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=yt(r)?r.map(o=>o==null?null:""+o):r==null?r:""+r)}return t}const fA=Symbol(""),ol=Symbol(""),lo=Symbol(""),Ta=Symbol(""),aa=Symbol("");function Jn(){let e=[];function t(r){return e.push(r),()=>{const o=e.indexOf(r);o>-1&&e.splice(o,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function Yt(e,t,n,r,o){const c=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise((d,f)=>{const h=x=>{x===!1?f(vn(4,{from:n,to:t})):x instanceof Error?f(x):Df(x)?f(vn(2,{from:t,to:x})):(c&&r.enterCallbacks[o]===c&&typeof x=="function"&&c.push(x),d())},m=e.call(r&&r.instances[o],t,n,h);let b=Promise.resolve(m);e.length<3&&(b=b.then(h)),b.catch(x=>f(x))})}function qo(e,t,n,r){const o=[];for(const c of e)for(const d in c.components){let f=c.components[d];if(!(t!=="beforeRouteEnter"&&!c.instances[d]))if(AA(f)){const m=(f.__vccOpts||f)[t];m&&o.push(Yt(m,n,r,c,d))}else{let h=f();o.push(()=>h.then(m=>{if(!m)return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${c.path}"`));const b=gf(m)?m.default:m;c.components[d]=b;const y=(b.__vccOpts||b)[t];return y&&Yt(y,n,r,c,d)()}))}}return o}function AA(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function al(e){const t=ot(lo),n=ot(Ta),r=dt(()=>t.resolve(Ue(e.to))),o=dt(()=>{const{matched:h}=r.value,{length:m}=h,b=h[m-1],x=n.matched;if(!b||!x.length)return-1;const y=x.findIndex(gn.bind(null,b));if(y>-1)return y;const k=il(h[m-2]);return m>1&&il(b)===k&&x[x.length-1].path!==k?x.findIndex(gn.bind(null,h[m-2])):y}),c=dt(()=>o.value>-1&&bA(n.params,r.value.params)),d=dt(()=>o.value>-1&&o.value===n.matched.length-1&&ms(n.params,r.value.params));function f(h={}){return mA(h)?t[Ue(e.replace)?"replace":"push"](Ue(e.to)).catch(or):Promise.resolve()}return{route:r,href:dt(()=>r.value.href),isActive:c,isExactActive:d,navigate:f}}const yA=Xl({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:al,setup(e,{slots:t}){const n=eo(al(e)),{options:r}=ot(lo),o=dt(()=>({[ll(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[ll(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const c=t.default&&t.default(n);return e.custom?c:hs("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},c)}}}),hA=yA;function mA(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function bA(e,t){for(const n in t){const r=t[n],o=e[n];if(typeof r=="string"){if(r!==o)return!1}else if(!yt(o)||o.length!==r.length||r.some((c,d)=>c!==o[d]))return!1}return!0}function il(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const ll=(e,t,n)=>e??t??n,gA=Xl({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=ot(aa),o=dt(()=>e.route||r.value),c=ot(ol,0),d=dt(()=>{let m=Ue(c);const{matched:b}=o.value;let x;for(;(x=b[m])&&!x.components;)m++;return m}),f=dt(()=>o.value.matched[d.value]);jr(ol,dt(()=>d.value+1)),jr(fA,f),jr(aa,o);const h=nt();return tr(()=>[h.value,f.value,e.name],([m,b,x],[y,k,B])=>{b&&(b.instances[x]=m,k&&k!==b&&m&&m===y&&(b.leaveGuards.size||(b.leaveGuards=k.leaveGuards),b.updateGuards.size||(b.updateGuards=k.updateGuards))),m&&b&&(!k||!gn(b,k)||!y)&&(b.enterCallbacks[x]||[]).forEach(C=>C(m))},{flush:"post"}),()=>{const m=o.value,b=e.name,x=f.value,y=x&&x.components[b];if(!y)return sl(n.default,{Component:y,route:m});const k=x.props[b],B=k?k===!0?m.params:typeof k=="function"?k(m):k:null,L=hs(y,xe({},B,t,{onVnodeUnmounted:z=>{z.component.isUnmounted&&(x.instances[b]=null)},ref:h}));return sl(n.default,{Component:L,route:m})||L}}});function sl(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const vA=gA;function xA(e){const t=Vf(e.routes,e),n=e.parseQuery||pA,r=e.stringifyQuery||rl,o=e.history,c=Jn(),d=Jn(),f=Jn(),h=Mp(Ut);let m=Ut;dn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const b=Mo.bind(null,j=>""+j),x=Mo.bind(null,dA),y=Mo.bind(null,Kr);function k(j,Z){let H,ne;return gs(j)?(H=t.getRecordMatcher(j),ne=Z):ne=j,t.addRoute(ne,H)}function B(j){const Z=t.getRecordMatcher(j);Z&&t.removeRoute(Z)}function C(){return t.getRoutes().map(j=>j.record)}function L(j){return!!t.getRecordMatcher(j)}function z(j,Z){if(Z=xe({},Z||h.value),typeof j=="string"){const S=Do(n,j,Z.path),O=t.resolve({path:S.path},Z),M=o.createHref(S.fullPath);return xe(S,O,{params:y(O.params),hash:Kr(S.hash),redirectedFrom:void 0,href:M})}let H;if("path"in j)H=xe({},j,{path:Do(n,j.path,Z.path).path});else{const S=xe({},j.params);for(const O in S)S[O]==null&&delete S[O];H=xe({},j,{params:x(S)}),Z.params=x(Z.params)}const ne=t.resolve(H,Z),ye=j.hash||"";ne.params=b(y(ne.params));const E=Ef(r,xe({},j,{hash:lA(ye),path:ne.path})),w=o.createHref(E);return xe({fullPath:E,hash:ye,query:r===rl?uA(j.query):j.query||{}},ne,{redirectedFrom:void 0,href:w})}function T(j){return typeof j=="string"?Do(n,j,h.value.path):xe({},j)}function $(j,Z){if(m!==j)return vn(8,{from:Z,to:j})}function F(j){return Ve(j)}function he(j){return F(xe(T(j),{replace:!0}))}function ke(j){const Z=j.matched[j.matched.length-1];if(Z&&Z.redirect){const{redirect:H}=Z;let ne=typeof H=="function"?H(j):H;return typeof ne=="string"&&(ne=ne.includes("?")||ne.includes("#")?ne=T(ne):{path:ne},ne.params={}),xe({query:j.query,hash:j.hash,params:"path"in ne?{}:j.params},ne)}}function Ve(j,Z){const H=m=z(j),ne=h.value,ye=j.state,E=j.force,w=j.replace===!0,S=ke(H);if(S)return Ve(xe(T(S),{state:typeof S=="object"?xe({},ye,S.state):ye,force:E,replace:w}),Z||H);const O=H;O.redirectedFrom=Z;let M;return!E&&wf(r,ne,H)&&(M=vn(16,{to:O,from:ne}),We(ne,ne,!0,!1)),(M?Promise.resolve(M):le(O,ne)).catch(q=>Ot(q)?Ot(q,2)?q:it(q):ue(q,O,ne)).then(q=>{if(q){if(Ot(q,2))return Ve(xe({replace:w},T(q.to),{state:typeof q.to=="object"?xe({},ye,q.to.state):ye,force:E}),Z||O)}else q=Ne(O,ne,!0,w,ye);return Re(O,ne,q),q})}function be(j,Z){const H=$(j,Z);return H?Promise.reject(H):Promise.resolve()}function Ce(j){const Z=mt.values().next().value;return Z&&typeof Z.runWithContext=="function"?Z.runWithContext(j):j()}function le(j,Z){let H;const[ne,ye,E]=EA(j,Z);H=qo(ne.reverse(),"beforeRouteLeave",j,Z);for(const S of ne)S.leaveGuards.forEach(O=>{H.push(Yt(O,j,Z))});const w=be.bind(null,j,Z);return H.push(w),Be(H).then(()=>{H=[];for(const S of c.list())H.push(Yt(S,j,Z));return H.push(w),Be(H)}).then(()=>{H=qo(ye,"beforeRouteUpdate",j,Z);for(const S of ye)S.updateGuards.forEach(O=>{H.push(Yt(O,j,Z))});return H.push(w),Be(H)}).then(()=>{H=[];for(const S of E)if(S.beforeEnter)if(yt(S.beforeEnter))for(const O of S.beforeEnter)H.push(Yt(O,j,Z));else H.push(Yt(S.beforeEnter,j,Z));return H.push(w),Be(H)}).then(()=>(j.matched.forEach(S=>S.enterCallbacks={}),H=qo(E,"beforeRouteEnter",j,Z),H.push(w),Be(H))).then(()=>{H=[];for(const S of d.list())H.push(Yt(S,j,Z));return H.push(w),Be(H)}).catch(S=>Ot(S,8)?S:Promise.reject(S))}function Re(j,Z,H){f.list().forEach(ne=>Ce(()=>ne(j,Z,H)))}function Ne(j,Z,H,ne,ye){const E=$(j,Z);if(E)return E;const w=Z===Ut,S=dn?history.state:{};H&&(ne||w?o.replace(j.fullPath,xe({scroll:w&&S&&S.scroll},ye)):o.push(j.fullPath,ye)),h.value=j,We(j,Z,H,w),it()}let De;function St(){De||(De=o.listen((j,Z,H)=>{if(!Mt.listening)return;const ne=z(j),ye=ke(ne);if(ye){Ve(xe(ye,{replace:!0}),ne).catch(or);return}m=ne;const E=h.value;dn&&Of($i(E.fullPath,H.delta),io()),le(ne,E).catch(w=>Ot(w,12)?w:Ot(w,2)?(Ve(w.to,ne).then(S=>{Ot(S,20)&&!H.delta&&H.type===fr.pop&&o.go(-1,!1)}).catch(or),Promise.reject()):(H.delta&&o.go(-H.delta,!1),ue(w,ne,E))).then(w=>{w=w||Ne(ne,E,!1),w&&(H.delta&&!Ot(w,8)?o.go(-H.delta,!1):H.type===fr.pop&&Ot(w,20)&&o.go(-1,!1)),Re(ne,E,w)}).catch(or)}))}let zt=Jn(),Oe=Jn(),ve;function ue(j,Z,H){it(j);const ne=Oe.list();return ne.length?ne.forEach(ye=>ye(j,Z,H)):console.error(j),Promise.reject(j)}function te(){return ve&&h.value!==Ut?Promise.resolve():new Promise((j,Z)=>{zt.add([j,Z])})}function it(j){return ve||(ve=!j,St(),zt.list().forEach(([Z,H])=>j?H(j):Z()),zt.reset()),j}function We(j,Z,H,ne){const{scrollBehavior:ye}=e;if(!dn||!ye)return Promise.resolve();const E=!H&&Tf($i(j.fullPath,0))||(ne||!H)&&history.state&&history.state.scroll||null;return Wl().then(()=>ye(j,Z,E)).then(w=>w&&_f(w)).catch(w=>ue(w,j,Z))}const qe=j=>o.go(j);let It;const mt=new Set,Mt={currentRoute:h,listening:!0,addRoute:k,removeRoute:B,hasRoute:L,getRoutes:C,resolve:z,options:e,push:F,replace:he,go:qe,back:()=>qe(-1),forward:()=>qe(1),beforeEach:c.add,beforeResolve:d.add,afterEach:f.add,onError:Oe.add,isReady:te,install(j){const Z=this;j.component("RouterLink",hA),j.component("RouterView",vA),j.config.globalProperties.$router=Z,Object.defineProperty(j.config.globalProperties,"$route",{enumerable:!0,get:()=>Ue(h)}),dn&&!It&&h.value===Ut&&(It=!0,F(o.location).catch(ye=>{}));const H={};for(const ye in Ut)Object.defineProperty(H,ye,{get:()=>h.value[ye],enumerable:!0});j.provide(lo,Z),j.provide(Ta,jl(H)),j.provide(aa,h);const ne=j.unmount;mt.add(j),j.unmount=function(){mt.delete(j),mt.size<1&&(m=Ut,De&&De(),De=null,h.value=Ut,It=!1,ve=!1),ne()}}};function Be(j){return j.reduce((Z,H)=>Z.then(()=>Ce(H)),Promise.resolve())}return Mt}function EA(e,t){const n=[],r=[],o=[],c=Math.max(t.matched.length,e.matched.length);for(let d=0;d<c;d++){const f=t.matched[d];f&&(e.matched.find(m=>gn(m,f))?r.push(f):n.push(f));const h=e.matched[d];h&&(t.matched.find(m=>gn(m,h))||o.push(h))}return[n,r,o]}function wA(){return ot(lo)}function Ra(){return ot(Ta)}var kA={size:"1em",strokeWidth:4,strokeLinecap:"round",strokeLinejoin:"round",rtl:!1,theme:"outline",colors:{outline:{fill:"#333",background:"transparent"},filled:{fill:"#333",background:"#FFF"},twoTone:{fill:"#333",twoTone:"#2F88FF"},multiColor:{outStrokeColor:"#333",outFillColor:"#2F88FF",innerStrokeColor:"#FFF",innerFillColor:"#43CCF8"}},prefix:"i"};function CA(){return"icon-"+((1+Math.random())*4294967296|0).toString(16).substring(1)}function BA(e,t,n){var r=typeof t.fill=="string"?[t.fill]:t.fill||[],o=[],c=t.theme||n.theme;switch(c){case"outline":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("none"),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("none");break;case"filled":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("#FFF"),o.push("#FFF");break;case"two-tone":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.twoTone.twoTone),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.twoTone.twoTone);break;case"multi-color":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.multiColor.outFillColor),o.push(typeof r[2]=="string"?r[2]:n.colors.multiColor.innerStrokeColor),o.push(typeof r[3]=="string"?r[3]:n.colors.multiColor.innerFillColor);break}return{size:t.size||n.size,strokeWidth:t.strokeWidth||n.strokeWidth,strokeLinecap:t.strokeLinecap||n.strokeLinecap,strokeLinejoin:t.strokeLinejoin||n.strokeLinejoin,colors:o,id:e}}var SA=Symbol("icon-context");function ht(e,t,n){var r={name:"icon-"+e,props:["size","strokeWidth","strokeLinecap","strokeLinejoin","theme","fill","spin"],setup:function(c){var d=CA(),f=ot(SA,kA);return function(){var h=c.size,m=c.strokeWidth,b=c.strokeLinecap,x=c.strokeLinejoin,y=c.theme,k=c.fill,B=c.spin,C=BA(d,{size:h,strokeWidth:m,strokeLinecap:b,strokeLinejoin:x,theme:y,fill:k},f),L=[f.prefix+"-icon"];return L.push(f.prefix+"-icon-"+e),t&&f.rtl&&L.push(f.prefix+"-icon-rtl"),B&&L.push(f.prefix+"-icon-spin"),K("span",{class:L.join(" ")},[n(C)])}}};return r}const IA=ht("adobe-photoshop",!0,function(e){return K("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[K("path",{d:"M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth},null),K("path",{d:"M14 15V33",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M16 25C19 25 23 24.2 23 20C23 15.8 19 15 16 15H14V25H16Z",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M34 21.0246C33 21.0246 28 20.5266 28 24.0123C28 27.4979 34 26.5021 34 29.9877C34 33.4734 28 32.9754 28 32.9754",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),LA=ht("arrow-circle-left",!0,function(e){return K("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[K("path",{d:"M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M32.4917 24.5H14.4917",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M23.4917 15.5L14.4917 24.5L23.4917 33.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),_A=ht("arrow-circle-right",!0,function(e){return K("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[K("path",{d:"M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M14.4917 24.5H32.4917",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M23.4917 15.5L32.4917 24.5L23.4917 33.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),OA=ht("audio-file",!0,function(e){return K("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[K("path",{d:"M8 44V4H31L40 14.5V44H8Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M32 14L26 16.9688V31.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("circle",{cx:"20.5",cy:"31.5",r:"5.5",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),TA=ht("close",!1,function(e){return K("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[K("path",{d:"M8 8L40 40",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M8 40L40 8",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),RA=ht("file-doc",!0,function(e){return K("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[K("path",{d:"M10 38V44H38V38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M38 20V14L30 4H10V20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M28 4V14H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M16 12H20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),K("rect",{x:"4",y:"20",width:"40",height:"18",rx:"2",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M10 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),K("path",{d:"M10 25H12C14.2091 25 16 26.7909 16 29V29C16 31.2091 14.2091 33 12 33H10",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("ellipse",{cx:"24",cy:"29",rx:"3",ry:"4",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M38 25H36C33.7909 25 32 26.7909 32 29V29C32 31.2091 33.7909 33 36 33H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),PA=ht("file-excel",!0,function(e){return K("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[K("path",{d:"M10 4H30L40 14V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M29 18H19V34H29",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M29 26H19",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),jA=ht("file-zip",!0,function(e){return K("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[K("path",{d:"M10 38V44H38V38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M38 20V14L30 4H10V20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M28 4V14H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M16 12H20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),K("rect",{x:"4",y:"20",width:"40",height:"18",rx:"2",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M11 25H17L11 33H17",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M24 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),K("path",{d:"M31 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),K("path",{d:"M31 25H34.5C35.8807 25 37 26.1193 37 27.5V27.5C37 28.8807 35.8807 30 34.5 30H31",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),zA=ht("image-files",!0,function(e){return K("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[K("path",{d:"M10 44H38C39.1046 44 40 43.1046 40 42V14H30V4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M30 4L40 14",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("circle",{cx:"18",cy:"17",r:"4",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M15 28V37H33V21L23.4894 31.5L15 28Z",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),MA=ht("seo-folder",!0,function(e){return K("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[K("path",{d:"M5 8C5 6.89543 5.89543 6 7 6H19L24 12H41C42.1046 12 43 12.8954 43 14V40C43 41.1046 42.1046 42 41 42H7C5.89543 42 5 41.1046 5 40V8Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M14 22L19 27L14 32",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M26 32H34",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null)])}),DA=ht("video-two",!0,function(e){return K("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[K("path",{d:"M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M20.5 28V21.9378L25.75 24.9689L31 28L25.75 31.0311L20.5 34.0622V28Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M6 15H42",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M33 6L27 15",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),K("path",{d:"M21 6L15 15",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])});const qA={class:"box"},FA={style:{"background-color":"#f6f6f6"}},NA=["onClick"],UA={key:1,class:"file-name",style:{"text-align":"center"}},HA=["onClick"],WA={key:2,class:"file-name"},YA={key:0,style:{height:"6rem","text-align":"center","line-height":"6rem"}},KA={__name:"InfoTable",props:{tableData:{type:Array,default:[]},tableHead:{type:Array,default:[]},showMax:{type:Number,default:9999999999}},emits:["clickFile","copyUrl"],setup(e,{emit:t}){const n=e,r=nt(!1),o=nt([]),c=[".MP4",".AVI",".MOV",".FLV",".MKV"],d=[".JPG",".JPEG",".PNG",".WEBP"],f=[".PSD"],h=[".RAR",".ZIP",".7Z"],m=[".WAV",".MP3",".OGG"],b=[".DOC",".DOCX"],x=[".XLS",".XLSX"];yr(()=>{o.value=n.tableData.slice(0,n.showMax)});const y=B=>{t("clickFile",B)},k=B=>{t("copyUrl",B)};return tr(()=>n.tableData,()=>{r.value=!1,n.tableData.length>n.showMax?o.value=n.tableData.slice(0,n.showMax):o.value=n.tableData}),(B,C)=>(Se(),Ze("div",qA,[et("table",null,[et("tr",FA,[(Se(!0),Ze(rt,null,To(e.tableHead,L=>(Se(),Ze("th",{class:lr({bgRed:L.bgColor==="red",bgGreen:L.bgColor==="green",textRed:L.textColor==="red",textGreen:L.textColor==="green"}),style:Xr({width:L.width})},_o(L.span),7))),256))]),(Se(!0),Ze(rt,null,To(o.value,(L,z)=>(Se(),Ze("tr",null,[(Se(!0),Ze(rt,null,To(e.tableHead,T=>(Se(),Ze("td",{class:lr({textRed:T.textColor==="red",textGreen:T.textColor==="green"})},[T.prop==="name"?(Se(),Ze("div",{key:0,class:"file-name",onClick:$=>y(z)},[c.includes(L.suffix.toUpperCase())?(Se(),xt(Ue(DA),{key:0,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):vt("",!0),d.includes(L.suffix.toUpperCase())?(Se(),xt(Ue(zA),{key:1,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):vt("",!0),h.includes(L.suffix.toUpperCase())?(Se(),xt(Ue(jA),{key:2,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):vt("",!0),m.includes(L.suffix.toUpperCase())?(Se(),xt(Ue(OA),{key:3,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):vt("",!0),b.includes(L.suffix.toUpperCase())?(Se(),xt(Ue(RA),{key:4,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):vt("",!0),x.includes(L.suffix.toUpperCase())?(Se(),xt(Ue(PA),{key:5,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):vt("",!0),f.includes(L.suffix.toUpperCase())?(Se(),xt(Ue(IA),{key:6,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):vt("",!0),L.suffix===""?(Se(),xt(Ue(MA),{key:7,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):vt("",!0),fs(" "+_o(L[T.prop]),1)],8,NA)):T.prop==="cz"?(Se(),Ze("div",UA,[et("button",{onClick:$=>k(z)},"复制链接",8,HA)])):(Se(),Ze("div",WA,_o(L[T.prop]),1))],2))),256))]))),256))]),e.tableData.length===0?(Se(),Ze("div",YA," 当前数据为空 ")):vt("",!0)]))}},QA=_a(KA,[["__scopeId","data-v-646b49fb"]]);function Ss(e,t){return function(){return e.apply(t,arguments)}}const{toString:VA}=Object.prototype,{getPrototypeOf:Pa}=Object,so=(e=>t=>{const n=VA.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),Bt=e=>(e=e.toLowerCase(),t=>so(t)===e),co=e=>t=>typeof t===e,{isArray:Cn}=Array,Ar=co("undefined");function $A(e){return e!==null&&!Ar(e)&&e.constructor!==null&&!Ar(e.constructor)&&at(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Is=Bt("ArrayBuffer");function ZA(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Is(e.buffer),t}const JA=co("string"),at=co("function"),Ls=co("number"),po=e=>e!==null&&typeof e=="object",XA=e=>e===!0||e===!1,Mr=e=>{if(so(e)!=="object")return!1;const t=Pa(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},GA=Bt("Date"),ey=Bt("File"),ty=Bt("Blob"),ny=Bt("FileList"),ry=e=>po(e)&&at(e.pipe),oy=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||at(e.append)&&((t=so(e))==="formdata"||t==="object"&&at(e.toString)&&e.toString()==="[object FormData]"))},ay=Bt("URLSearchParams"),iy=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function hr(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,o;if(typeof e!="object"&&(e=[e]),Cn(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{const c=n?Object.getOwnPropertyNames(e):Object.keys(e),d=c.length;let f;for(r=0;r<d;r++)f=c[r],t.call(null,e[f],f,e)}}function _s(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,o;for(;r-- >0;)if(o=n[r],t===o.toLowerCase())return o;return null}const Os=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),Ts=e=>!Ar(e)&&e!==Os;function ia(){const{caseless:e}=Ts(this)&&this||{},t={},n=(r,o)=>{const c=e&&_s(t,o)||o;Mr(t[c])&&Mr(r)?t[c]=ia(t[c],r):Mr(r)?t[c]=ia({},r):Cn(r)?t[c]=r.slice():t[c]=r};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&hr(arguments[r],n);return t}const ly=(e,t,n,{allOwnKeys:r}={})=>(hr(t,(o,c)=>{n&&at(o)?e[c]=Ss(o,n):e[c]=o},{allOwnKeys:r}),e),sy=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),cy=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},dy=(e,t,n,r)=>{let o,c,d;const f={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),c=o.length;c-- >0;)d=o[c],(!r||r(d,e,t))&&!f[d]&&(t[d]=e[d],f[d]=!0);e=n!==!1&&Pa(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},py=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},uy=e=>{if(!e)return null;if(Cn(e))return e;let t=e.length;if(!Ls(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},fy=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Pa(Uint8Array)),Ay=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let o;for(;(o=r.next())&&!o.done;){const c=o.value;t.call(e,c[0],c[1])}},yy=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},hy=Bt("HTMLFormElement"),my=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,o){return r.toUpperCase()+o}),cl=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),by=Bt("RegExp"),Rs=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};hr(n,(o,c)=>{t(o,c,e)!==!1&&(r[c]=o)}),Object.defineProperties(e,r)},gy=e=>{Rs(e,(t,n)=>{if(at(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(at(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},vy=(e,t)=>{const n={},r=o=>{o.forEach(c=>{n[c]=!0})};return Cn(e)?r(e):r(String(e).split(t)),n},xy=()=>{},Ey=(e,t)=>(e=+e,Number.isFinite(e)?e:t),Fo="abcdefghijklmnopqrstuvwxyz",dl="0123456789",Ps={DIGIT:dl,ALPHA:Fo,ALPHA_DIGIT:Fo+Fo.toUpperCase()+dl},wy=(e=16,t=Ps.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n};function ky(e){return!!(e&&at(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const Cy=e=>{const t=new Array(10),n=(r,o)=>{if(po(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[o]=r;const c=Cn(r)?[]:{};return hr(r,(d,f)=>{const h=n(d,o+1);!Ar(h)&&(c[f]=h)}),t[o]=void 0,c}}return r};return n(e,0)},By=Bt("AsyncFunction"),Sy=e=>e&&(po(e)||at(e))&&at(e.then)&&at(e.catch),P={isArray:Cn,isArrayBuffer:Is,isBuffer:$A,isFormData:oy,isArrayBufferView:ZA,isString:JA,isNumber:Ls,isBoolean:XA,isObject:po,isPlainObject:Mr,isUndefined:Ar,isDate:GA,isFile:ey,isBlob:ty,isRegExp:by,isFunction:at,isStream:ry,isURLSearchParams:ay,isTypedArray:fy,isFileList:ny,forEach:hr,merge:ia,extend:ly,trim:iy,stripBOM:sy,inherits:cy,toFlatObject:dy,kindOf:so,kindOfTest:Bt,endsWith:py,toArray:uy,forEachEntry:Ay,matchAll:yy,isHTMLForm:hy,hasOwnProperty:cl,hasOwnProp:cl,reduceDescriptors:Rs,freezeMethods:gy,toObjectSet:vy,toCamelCase:my,noop:xy,toFiniteNumber:Ey,findKey:_s,global:Os,isContextDefined:Ts,ALPHABET:Ps,generateString:wy,isSpecCompliantForm:ky,toJSONObject:Cy,isAsyncFn:By,isThenable:Sy};function Ae(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o)}P.inherits(Ae,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:P.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const js=Ae.prototype,zs={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{zs[e]={value:e}});Object.defineProperties(Ae,zs);Object.defineProperty(js,"isAxiosError",{value:!0});Ae.from=(e,t,n,r,o,c)=>{const d=Object.create(js);return P.toFlatObject(e,d,function(h){return h!==Error.prototype},f=>f!=="isAxiosError"),Ae.call(d,e.message,t,n,r,o),d.cause=e,d.name=e.name,c&&Object.assign(d,c),d};const Iy=null;function la(e){return P.isPlainObject(e)||P.isArray(e)}function Ms(e){return P.endsWith(e,"[]")?e.slice(0,-2):e}function pl(e,t,n){return e?e.concat(t).map(function(o,c){return o=Ms(o),!n&&c?"["+o+"]":o}).join(n?".":""):t}function Ly(e){return P.isArray(e)&&!e.some(la)}const _y=P.toFlatObject(P,{},null,function(t){return/^is[A-Z]/.test(t)});function uo(e,t,n){if(!P.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=P.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(C,L){return!P.isUndefined(L[C])});const r=n.metaTokens,o=n.visitor||b,c=n.dots,d=n.indexes,h=(n.Blob||typeof Blob<"u"&&Blob)&&P.isSpecCompliantForm(t);if(!P.isFunction(o))throw new TypeError("visitor must be a function");function m(B){if(B===null)return"";if(P.isDate(B))return B.toISOString();if(!h&&P.isBlob(B))throw new Ae("Blob is not supported. Use a Buffer instead.");return P.isArrayBuffer(B)||P.isTypedArray(B)?h&&typeof Blob=="function"?new Blob([B]):Buffer.from(B):B}function b(B,C,L){let z=B;if(B&&!L&&typeof B=="object"){if(P.endsWith(C,"{}"))C=r?C:C.slice(0,-2),B=JSON.stringify(B);else if(P.isArray(B)&&Ly(B)||(P.isFileList(B)||P.endsWith(C,"[]"))&&(z=P.toArray(B)))return C=Ms(C),z.forEach(function($,F){!(P.isUndefined($)||$===null)&&t.append(d===!0?pl([C],F,c):d===null?C:C+"[]",m($))}),!1}return la(B)?!0:(t.append(pl(L,C,c),m(B)),!1)}const x=[],y=Object.assign(_y,{defaultVisitor:b,convertValue:m,isVisitable:la});function k(B,C){if(!P.isUndefined(B)){if(x.indexOf(B)!==-1)throw Error("Circular reference detected in "+C.join("."));x.push(B),P.forEach(B,function(z,T){(!(P.isUndefined(z)||z===null)&&o.call(t,z,P.isString(T)?T.trim():T,C,y))===!0&&k(z,C?C.concat(T):[T])}),x.pop()}}if(!P.isObject(e))throw new TypeError("data must be an object");return k(e),t}function ul(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function ja(e,t){this._pairs=[],e&&uo(e,this,t)}const Ds=ja.prototype;Ds.append=function(t,n){this._pairs.push([t,n])};Ds.toString=function(t){const n=t?function(r){return t.call(this,r,ul)}:ul;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};function Oy(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function qs(e,t,n){if(!t)return e;const r=n&&n.encode||Oy,o=n&&n.serialize;let c;if(o?c=o(t,n):c=P.isURLSearchParams(t)?t.toString():new ja(t,n).toString(r),c){const d=e.indexOf("#");d!==-1&&(e=e.slice(0,d)),e+=(e.indexOf("?")===-1?"?":"&")+c}return e}class Ty{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){P.forEach(this.handlers,function(r){r!==null&&t(r)})}}const fl=Ty,Fs={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Ry=typeof URLSearchParams<"u"?URLSearchParams:ja,Py=typeof FormData<"u"?FormData:null,jy=typeof Blob<"u"?Blob:null,zy=(()=>{let e;return typeof navigator<"u"&&((e=navigator.product)==="ReactNative"||e==="NativeScript"||e==="NS")?!1:typeof window<"u"&&typeof document<"u"})(),My=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),kt={isBrowser:!0,classes:{URLSearchParams:Ry,FormData:Py,Blob:jy},isStandardBrowserEnv:zy,isStandardBrowserWebWorkerEnv:My,protocols:["http","https","file","blob","url","data"]};function Dy(e,t){return uo(e,new kt.classes.URLSearchParams,Object.assign({visitor:function(n,r,o,c){return kt.isNode&&P.isBuffer(n)?(this.append(r,n.toString("base64")),!1):c.defaultVisitor.apply(this,arguments)}},t))}function qy(e){return P.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Fy(e){const t={},n=Object.keys(e);let r;const o=n.length;let c;for(r=0;r<o;r++)c=n[r],t[c]=e[c];return t}function Ns(e){function t(n,r,o,c){let d=n[c++];const f=Number.isFinite(+d),h=c>=n.length;return d=!d&&P.isArray(o)?o.length:d,h?(P.hasOwnProp(o,d)?o[d]=[o[d],r]:o[d]=r,!f):((!o[d]||!P.isObject(o[d]))&&(o[d]=[]),t(n,r,o[d],c)&&P.isArray(o[d])&&(o[d]=Fy(o[d])),!f)}if(P.isFormData(e)&&P.isFunction(e.entries)){const n={};return P.forEachEntry(e,(r,o)=>{t(qy(r),o,n,0)}),n}return null}const Ny={"Content-Type":void 0};function Uy(e,t,n){if(P.isString(e))try{return(t||JSON.parse)(e),P.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const fo={transitional:Fs,adapter:["xhr","http"],transformRequest:[function(t,n){const r=n.getContentType()||"",o=r.indexOf("application/json")>-1,c=P.isObject(t);if(c&&P.isHTMLForm(t)&&(t=new FormData(t)),P.isFormData(t))return o&&o?JSON.stringify(Ns(t)):t;if(P.isArrayBuffer(t)||P.isBuffer(t)||P.isStream(t)||P.isFile(t)||P.isBlob(t))return t;if(P.isArrayBufferView(t))return t.buffer;if(P.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let f;if(c){if(r.indexOf("application/x-www-form-urlencoded")>-1)return Dy(t,this.formSerializer).toString();if((f=P.isFileList(t))||r.indexOf("multipart/form-data")>-1){const h=this.env&&this.env.FormData;return uo(f?{"files[]":t}:t,h&&new h,this.formSerializer)}}return c||o?(n.setContentType("application/json",!1),Uy(t)):t}],transformResponse:[function(t){const n=this.transitional||fo.transitional,r=n&&n.forcedJSONParsing,o=this.responseType==="json";if(t&&P.isString(t)&&(r&&!this.responseType||o)){const d=!(n&&n.silentJSONParsing)&&o;try{return JSON.parse(t)}catch(f){if(d)throw f.name==="SyntaxError"?Ae.from(f,Ae.ERR_BAD_RESPONSE,this,null,this.response):f}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:kt.classes.FormData,Blob:kt.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};P.forEach(["delete","get","head"],function(t){fo.headers[t]={}});P.forEach(["post","put","patch"],function(t){fo.headers[t]=P.merge(Ny)});const za=fo,Hy=P.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Wy=e=>{const t={};let n,r,o;return e&&e.split(`
`).forEach(function(d){o=d.indexOf(":"),n=d.substring(0,o).trim().toLowerCase(),r=d.substring(o+1).trim(),!(!n||t[n]&&Hy[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},Al=Symbol("internals");function Xn(e){return e&&String(e).trim().toLowerCase()}function Dr(e){return e===!1||e==null?e:P.isArray(e)?e.map(Dr):String(e)}function Yy(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Ky=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function No(e,t,n,r,o){if(P.isFunction(r))return r.call(this,t,n);if(o&&(t=n),!!P.isString(t)){if(P.isString(r))return t.indexOf(r)!==-1;if(P.isRegExp(r))return r.test(t)}}function Qy(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function Vy(e,t){const n=P.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(o,c,d){return this[r].call(this,t,o,c,d)},configurable:!0})})}class Ao{constructor(t){t&&this.set(t)}set(t,n,r){const o=this;function c(f,h,m){const b=Xn(h);if(!b)throw new Error("header name must be a non-empty string");const x=P.findKey(o,b);(!x||o[x]===void 0||m===!0||m===void 0&&o[x]!==!1)&&(o[x||h]=Dr(f))}const d=(f,h)=>P.forEach(f,(m,b)=>c(m,b,h));return P.isPlainObject(t)||t instanceof this.constructor?d(t,n):P.isString(t)&&(t=t.trim())&&!Ky(t)?d(Wy(t),n):t!=null&&c(n,t,r),this}get(t,n){if(t=Xn(t),t){const r=P.findKey(this,t);if(r){const o=this[r];if(!n)return o;if(n===!0)return Yy(o);if(P.isFunction(n))return n.call(this,o,r);if(P.isRegExp(n))return n.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Xn(t),t){const r=P.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||No(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let o=!1;function c(d){if(d=Xn(d),d){const f=P.findKey(r,d);f&&(!n||No(r,r[f],f,n))&&(delete r[f],o=!0)}}return P.isArray(t)?t.forEach(c):c(t),o}clear(t){const n=Object.keys(this);let r=n.length,o=!1;for(;r--;){const c=n[r];(!t||No(this,this[c],c,t,!0))&&(delete this[c],o=!0)}return o}normalize(t){const n=this,r={};return P.forEach(this,(o,c)=>{const d=P.findKey(r,c);if(d){n[d]=Dr(o),delete n[c];return}const f=t?Qy(c):String(c).trim();f!==c&&delete n[c],n[f]=Dr(o),r[f]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return P.forEach(this,(r,o)=>{r!=null&&r!==!1&&(n[o]=t&&P.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(o=>r.set(o)),r}static accessor(t){const r=(this[Al]=this[Al]={accessors:{}}).accessors,o=this.prototype;function c(d){const f=Xn(d);r[f]||(Vy(o,d),r[f]=!0)}return P.isArray(t)?t.forEach(c):c(t),this}}Ao.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);P.freezeMethods(Ao.prototype);P.freezeMethods(Ao);const Rt=Ao;function Uo(e,t){const n=this||za,r=t||n,o=Rt.from(r.headers);let c=r.data;return P.forEach(e,function(f){c=f.call(n,c,o.normalize(),t?t.status:void 0)}),o.normalize(),c}function Us(e){return!!(e&&e.__CANCEL__)}function mr(e,t,n){Ae.call(this,e??"canceled",Ae.ERR_CANCELED,t,n),this.name="CanceledError"}P.inherits(mr,Ae,{__CANCEL__:!0});function $y(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new Ae("Request failed with status code "+n.status,[Ae.ERR_BAD_REQUEST,Ae.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const Zy=kt.isStandardBrowserEnv?function(){return{write:function(n,r,o,c,d,f){const h=[];h.push(n+"="+encodeURIComponent(r)),P.isNumber(o)&&h.push("expires="+new Date(o).toGMTString()),P.isString(c)&&h.push("path="+c),P.isString(d)&&h.push("domain="+d),f===!0&&h.push("secure"),document.cookie=h.join("; ")},read:function(n){const r=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return r?decodeURIComponent(r[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}();function Jy(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Xy(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function Hs(e,t){return e&&!Jy(t)?Xy(e,t):t}const Gy=kt.isStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function o(c){let d=c;return t&&(n.setAttribute("href",d),d=n.href),n.setAttribute("href",d),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=o(window.location.href),function(d){const f=P.isString(d)?o(d):d;return f.protocol===r.protocol&&f.host===r.host}}():function(){return function(){return!0}}();function eh(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function th(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o=0,c=0,d;return t=t!==void 0?t:1e3,function(h){const m=Date.now(),b=r[c];d||(d=m),n[o]=h,r[o]=m;let x=c,y=0;for(;x!==o;)y+=n[x++],x=x%e;if(o=(o+1)%e,o===c&&(c=(c+1)%e),m-d<t)return;const k=b&&m-b;return k?Math.round(y*1e3/k):void 0}}function yl(e,t){let n=0;const r=th(50,250);return o=>{const c=o.loaded,d=o.lengthComputable?o.total:void 0,f=c-n,h=r(f),m=c<=d;n=c;const b={loaded:c,total:d,progress:d?c/d:void 0,bytes:f,rate:h||void 0,estimated:h&&d&&m?(d-c)/h:void 0,event:o};b[t?"download":"upload"]=!0,e(b)}}const nh=typeof XMLHttpRequest<"u",rh=nh&&function(e){return new Promise(function(n,r){let o=e.data;const c=Rt.from(e.headers).normalize(),d=e.responseType;let f;function h(){e.cancelToken&&e.cancelToken.unsubscribe(f),e.signal&&e.signal.removeEventListener("abort",f)}P.isFormData(o)&&(kt.isStandardBrowserEnv||kt.isStandardBrowserWebWorkerEnv?c.setContentType(!1):c.setContentType("multipart/form-data;",!1));let m=new XMLHttpRequest;if(e.auth){const k=e.auth.username||"",B=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";c.set("Authorization","Basic "+btoa(k+":"+B))}const b=Hs(e.baseURL,e.url);m.open(e.method.toUpperCase(),qs(b,e.params,e.paramsSerializer),!0),m.timeout=e.timeout;function x(){if(!m)return;const k=Rt.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders()),C={data:!d||d==="text"||d==="json"?m.responseText:m.response,status:m.status,statusText:m.statusText,headers:k,config:e,request:m};$y(function(z){n(z),h()},function(z){r(z),h()},C),m=null}if("onloadend"in m?m.onloadend=x:m.onreadystatechange=function(){!m||m.readyState!==4||m.status===0&&!(m.responseURL&&m.responseURL.indexOf("file:")===0)||setTimeout(x)},m.onabort=function(){m&&(r(new Ae("Request aborted",Ae.ECONNABORTED,e,m)),m=null)},m.onerror=function(){r(new Ae("Network Error",Ae.ERR_NETWORK,e,m)),m=null},m.ontimeout=function(){let B=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const C=e.transitional||Fs;e.timeoutErrorMessage&&(B=e.timeoutErrorMessage),r(new Ae(B,C.clarifyTimeoutError?Ae.ETIMEDOUT:Ae.ECONNABORTED,e,m)),m=null},kt.isStandardBrowserEnv){const k=(e.withCredentials||Gy(b))&&e.xsrfCookieName&&Zy.read(e.xsrfCookieName);k&&c.set(e.xsrfHeaderName,k)}o===void 0&&c.setContentType(null),"setRequestHeader"in m&&P.forEach(c.toJSON(),function(B,C){m.setRequestHeader(C,B)}),P.isUndefined(e.withCredentials)||(m.withCredentials=!!e.withCredentials),d&&d!=="json"&&(m.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&m.addEventListener("progress",yl(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&m.upload&&m.upload.addEventListener("progress",yl(e.onUploadProgress)),(e.cancelToken||e.signal)&&(f=k=>{m&&(r(!k||k.type?new mr(null,e,m):k),m.abort(),m=null)},e.cancelToken&&e.cancelToken.subscribe(f),e.signal&&(e.signal.aborted?f():e.signal.addEventListener("abort",f)));const y=eh(b);if(y&&kt.protocols.indexOf(y)===-1){r(new Ae("Unsupported protocol "+y+":",Ae.ERR_BAD_REQUEST,e));return}m.send(o||null)})},qr={http:Iy,xhr:rh};P.forEach(qr,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const oh={getAdapter:e=>{e=P.isArray(e)?e:[e];const{length:t}=e;let n,r;for(let o=0;o<t&&(n=e[o],!(r=P.isString(n)?qr[n.toLowerCase()]:n));o++);if(!r)throw r===!1?new Ae(`Adapter ${n} is not supported by the environment`,"ERR_NOT_SUPPORT"):new Error(P.hasOwnProp(qr,n)?`Adapter '${n}' is not available in the build`:`Unknown adapter '${n}'`);if(!P.isFunction(r))throw new TypeError("adapter is not a function");return r},adapters:qr};function Ho(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new mr(null,e)}function hl(e){return Ho(e),e.headers=Rt.from(e.headers),e.data=Uo.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),oh.getAdapter(e.adapter||za.adapter)(e).then(function(r){return Ho(e),r.data=Uo.call(e,e.transformResponse,r),r.headers=Rt.from(r.headers),r},function(r){return Us(r)||(Ho(e),r&&r.response&&(r.response.data=Uo.call(e,e.transformResponse,r.response),r.response.headers=Rt.from(r.response.headers))),Promise.reject(r)})}const ml=e=>e instanceof Rt?e.toJSON():e;function xn(e,t){t=t||{};const n={};function r(m,b,x){return P.isPlainObject(m)&&P.isPlainObject(b)?P.merge.call({caseless:x},m,b):P.isPlainObject(b)?P.merge({},b):P.isArray(b)?b.slice():b}function o(m,b,x){if(P.isUndefined(b)){if(!P.isUndefined(m))return r(void 0,m,x)}else return r(m,b,x)}function c(m,b){if(!P.isUndefined(b))return r(void 0,b)}function d(m,b){if(P.isUndefined(b)){if(!P.isUndefined(m))return r(void 0,m)}else return r(void 0,b)}function f(m,b,x){if(x in t)return r(m,b);if(x in e)return r(void 0,m)}const h={url:c,method:c,data:c,baseURL:d,transformRequest:d,transformResponse:d,paramsSerializer:d,timeout:d,timeoutMessage:d,withCredentials:d,adapter:d,responseType:d,xsrfCookieName:d,xsrfHeaderName:d,onUploadProgress:d,onDownloadProgress:d,decompress:d,maxContentLength:d,maxBodyLength:d,beforeRedirect:d,transport:d,httpAgent:d,httpsAgent:d,cancelToken:d,socketPath:d,responseEncoding:d,validateStatus:f,headers:(m,b)=>o(ml(m),ml(b),!0)};return P.forEach(Object.keys(Object.assign({},e,t)),function(b){const x=h[b]||o,y=x(e[b],t[b],b);P.isUndefined(y)&&x!==f||(n[b]=y)}),n}const Ws="1.4.0",Ma={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Ma[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const bl={};Ma.transitional=function(t,n,r){function o(c,d){return"[Axios v"+Ws+"] Transitional option '"+c+"'"+d+(r?". "+r:"")}return(c,d,f)=>{if(t===!1)throw new Ae(o(d," has been removed"+(n?" in "+n:"")),Ae.ERR_DEPRECATED);return n&&!bl[d]&&(bl[d]=!0,console.warn(o(d," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(c,d,f):!0}};function ah(e,t,n){if(typeof e!="object")throw new Ae("options must be an object",Ae.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const c=r[o],d=t[c];if(d){const f=e[c],h=f===void 0||d(f,c,e);if(h!==!0)throw new Ae("option "+c+" must be "+h,Ae.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new Ae("Unknown option "+c,Ae.ERR_BAD_OPTION)}}const sa={assertOptions:ah,validators:Ma},Ht=sa.validators;class Qr{constructor(t){this.defaults=t,this.interceptors={request:new fl,response:new fl}}request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=xn(this.defaults,n);const{transitional:r,paramsSerializer:o,headers:c}=n;r!==void 0&&sa.assertOptions(r,{silentJSONParsing:Ht.transitional(Ht.boolean),forcedJSONParsing:Ht.transitional(Ht.boolean),clarifyTimeoutError:Ht.transitional(Ht.boolean)},!1),o!=null&&(P.isFunction(o)?n.paramsSerializer={serialize:o}:sa.assertOptions(o,{encode:Ht.function,serialize:Ht.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let d;d=c&&P.merge(c.common,c[n.method]),d&&P.forEach(["delete","get","head","post","put","patch","common"],B=>{delete c[B]}),n.headers=Rt.concat(d,c);const f=[];let h=!0;this.interceptors.request.forEach(function(C){typeof C.runWhen=="function"&&C.runWhen(n)===!1||(h=h&&C.synchronous,f.unshift(C.fulfilled,C.rejected))});const m=[];this.interceptors.response.forEach(function(C){m.push(C.fulfilled,C.rejected)});let b,x=0,y;if(!h){const B=[hl.bind(this),void 0];for(B.unshift.apply(B,f),B.push.apply(B,m),y=B.length,b=Promise.resolve(n);x<y;)b=b.then(B[x++],B[x++]);return b}y=f.length;let k=n;for(x=0;x<y;){const B=f[x++],C=f[x++];try{k=B(k)}catch(L){C.call(this,L);break}}try{b=hl.call(this,k)}catch(B){return Promise.reject(B)}for(x=0,y=m.length;x<y;)b=b.then(m[x++],m[x++]);return b}getUri(t){t=xn(this.defaults,t);const n=Hs(t.baseURL,t.url);return qs(n,t.params,t.paramsSerializer)}}P.forEach(["delete","get","head","options"],function(t){Qr.prototype[t]=function(n,r){return this.request(xn(r||{},{method:t,url:n,data:(r||{}).data}))}});P.forEach(["post","put","patch"],function(t){function n(r){return function(c,d,f){return this.request(xn(f||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:c,data:d}))}}Qr.prototype[t]=n(),Qr.prototype[t+"Form"]=n(!0)});const Fr=Qr;class Da{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(c){n=c});const r=this;this.promise.then(o=>{if(!r._listeners)return;let c=r._listeners.length;for(;c-- >0;)r._listeners[c](o);r._listeners=null}),this.promise.then=o=>{let c;const d=new Promise(f=>{r.subscribe(f),c=f}).then(o);return d.cancel=function(){r.unsubscribe(c)},d},t(function(c,d,f){r.reason||(r.reason=new mr(c,d,f),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}static source(){let t;return{token:new Da(function(o){t=o}),cancel:t}}}const ih=Da;function lh(e){return function(n){return e.apply(null,n)}}function sh(e){return P.isObject(e)&&e.isAxiosError===!0}const ca={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(ca).forEach(([e,t])=>{ca[t]=e});const ch=ca;function Ys(e){const t=new Fr(e),n=Ss(Fr.prototype.request,t);return P.extend(n,Fr.prototype,t,{allOwnKeys:!0}),P.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return Ys(xn(e,o))},n}const Me=Ys(za);Me.Axios=Fr;Me.CanceledError=mr;Me.CancelToken=ih;Me.isCancel=Us;Me.VERSION=Ws;Me.toFormData=uo;Me.AxiosError=Ae;Me.Cancel=Me.CanceledError;Me.all=function(t){return Promise.all(t)};Me.spread=lh;Me.isAxiosError=sh;Me.mergeConfig=xn;Me.AxiosHeaders=Rt;Me.formToJSON=e=>Ns(P.isHTMLForm(e)?new FormData(e):e);Me.HttpStatusCode=ch;Me.default=Me;const dh=Me;const ph={key:0,class:"imgBox"},uh={class:"img"},fh=["src"],Ah={__name:"main",setup(e){const t=wA();Ra();const n=`${window.location.protocol}//${window.location.hostname}:${window.location.port}`,r=nt("$"),o=nt([]),c=nt([{span:"文件名",prop:"name",textColor:"",bgColor:""},{span:"大小",prop:"size",textColor:"red",bgColor:"red"},{span:"操作",prop:"cz",width:"80px",textColor:"green",bgColor:"green"}]),d=()=>{r.value=r.value.slice(0,r.value.lastIndexOf("__")===-1?r.value.length:r.value.lastIndexOf("__")),he()},f=nt([]),h=nt(""),m=nt(0),b=nt(!1),x=()=>{m.value++,m.value=m.value%f.value.length,h.value=f.value[m.value],console.log(m.value)},y=()=>{m.value--,m.value<0&&(m.value=f.value.length-1),m.value=m.value%f.value.length,h.value=f.value[m.value]},k=()=>{b.value=!0,h.value=f.value[m.value],console.log(f.value)},B=()=>{b.value=!1},C=(be,Ce)=>(be==="$"?be="":be=be.replace(/\$/g,""),be=be.replace(/__/g,"/"),console.log(`获取文件：${n}/getFile${be}/${Ce}`),`${n}/getFile${be}/${Ce}`),L=be=>{let Ce=o.value[be];try{navigator.share({title:Ce.name,url:C(r.value,Ce.name)})}catch{alert(C(r.value,Ce.name))}},z=[".MP4",".AVI",".MOV",".FLV",".MKV"],T=[".JPG",".JPEG",".PNG",".WEBP"],$=[".WAV",".MP3",".OGG"],F=be=>{let Ce=o.value[be];if(Ce.isDirectory&&!Ce.isFile)r.value+=`__${Ce.name}`,he(),Ve();else{let le=Ce.suffix;if(z.includes(le.toUpperCase()))t.push({path:"/VideoPlay",query:{url:C(r.value,Ce.name)}});else if(T.includes(le.toUpperCase())){f.value=[];let Re=0;for(let Ne=0;Ne<o.value.length;Ne++){let De=o.value[Ne].suffix;T.includes(De.toUpperCase())&&(o.value[Ne].name===o.value[be].name&&(m.value=Re,console.log(m.value,123456789)),Re++,f.value.push(C(r.value,o.value[Ne].name)))}k()}else if($.includes(le.toUpperCase()))t.push({path:"/AudioPlay",query:{url:C(r.value,Ce.name)}});else{let Re=document.createElement("a");Re.href=C(r.value,Ce.name),Re.download=Ce.name,Re.target="_blank",Re.click()}}},he=()=>{dh.get(`${n}/list/${r.value}`).then((be,Ce)=>{be.status===200&&(o.value=be.data.map(le=>(le.size=(Number(le.size)/1024/1024).toFixed(2)+"MB",le.isDirectory&&(le.size=""),le)))})},ke=()=>{d()},Ve=()=>{window.history&&window.history.pushState&&(history.pushState(null,null,document.URL),window.addEventListener("popstate",ke,!1))};return yr(()=>{Ve(),he()}),ka(()=>{window.removeEventListener("popstate",ke,!1)}),(be,Ce)=>(Se(),Ze("div",null,[b.value?(Se(),Ze("div",ph,[et("div",uh,[et("div",{class:"close-btn",onClick:B},[K(Ue(TA),{theme:"outline",size:"20",fill:"#ffffff",strokeWidth:5})]),et("div",{class:"left-btn",onClick:y},[K(Ue(LA),{theme:"outline",size:"30",fill:"#ffffff",strokeWidth:5})]),et("div",{class:"right-btn",onClick:x},[K(Ue(_A),{theme:"outline",size:"30",fill:"#ffffff",strokeWidth:5})]),et("img",{src:h.value,alt:""},null,8,fh)]),et("div",{class:"blackScreen",onClick:B})])):vt("",!0),K(QA,{"table-data":o.value,"table-head":c.value,onClickFile:F,onCopyUrl:L},null,8,["table-data","table-head"]),et("div",{class:"ret",onClick:d},"返回")]))}},yh=_a(Ah,[["__scopeId","data-v-7a2995db"]]);var hh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function mh(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ks={exports:{}};(function(e,t){(function(n,r){e.exports=r()})(self,()=>(()=>{var n={916:(d,f,h)=>{var m=h(471);d.exports=function(b){var x,y="",k=(b=b||{}).video,B=b.options,C=m.$escape,L=b.tran,z=b.icons,T=b.index,$=m.$each;return b.$value,b.$index,y+=`<div class="dplayer-mask"></div>
<div class="dplayer-video-wrap">
    `,x=h(568)(k),y+=x,y+=`
    `,B.logo&&(y+=`
    <div class="dplayer-logo">
        <img src="`,y+=C(B.logo),y+=`">
    </div>
    `),y+=`
    <div class="dplayer-danmaku"`,B.danmaku&&B.danmaku.bottom&&(y+=' style="margin-bottom:',y+=C(B.danmaku.bottom),y+='"'),y+=`>
        <div class="dplayer-danmaku-item dplayer-danmaku-item--demo"></div>
    </div>
    <div class="dplayer-subtitle"></div>
    <div class="dplayer-bezel">
        <span class="dplayer-bezel-icon"></span>
        `,B.danmaku&&(y+=`
        <span class="dplayer-danloading">`,y+=C(L("danmaku-loading")),y+=`</span>
        `),y+=`
        <span class="diplayer-loading-icon">`,y+=z.loading,y+=`</span>
    </div>
</div>
<div class="dplayer-controller-mask"></div>
<div class="dplayer-controller">
    <div class="dplayer-icons dplayer-comment-box">
        <button class="dplayer-icon dplayer-comment-setting-icon" data-balloon="`,y+=C(L("setting")),y+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,y+=z.pallette,y+=`</span>
        </button>
        <div class="dplayer-comment-setting-box">
            <div class="dplayer-comment-setting-color">
                <div class="dplayer-comment-setting-title">`,y+=C(L("set-danmaku-color")),y+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,y+=C(T),y+=`" value="#fff" checked>
                    <span style="background: #fff;"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,y+=C(T),y+=`" value="#e54256">
                    <span style="background: #e54256"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,y+=C(T),y+=`" value="#ffe133">
                    <span style="background: #ffe133"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,y+=C(T),y+=`" value="#64DD17">
                    <span style="background: #64DD17"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,y+=C(T),y+=`" value="#39ccff">
                    <span style="background: #39ccff"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,y+=C(T),y+=`" value="#D500F9">
                    <span style="background: #D500F9"></span>
                </label>
            </div>
            <div class="dplayer-comment-setting-type">
                <div class="dplayer-comment-setting-title">`,y+=C(L("set-danmaku-type")),y+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,y+=C(T),y+=`" value="1">
                    <span>`,y+=C(L("top")),y+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,y+=C(T),y+=`" value="0" checked>
                    <span>`,y+=C(L("rolling")),y+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,y+=C(T),y+=`" value="2">
                    <span>`,y+=C(L("bottom")),y+=`</span>
                </label>
            </div>
        </div>
        <input class="dplayer-comment-input" type="text" placeholder="`,y+=C(L("input-danmaku-enter")),y+=`" maxlength="30">
        <button class="dplayer-icon dplayer-send-icon" data-balloon="`,y+=C(L("send")),y+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,y+=z.send,y+=`</span>
        </button>
    </div>
    <div class="dplayer-icons dplayer-icons-left">
        <button class="dplayer-icon dplayer-play-icon">
            <span class="dplayer-icon-content">`,y+=z.play,y+=`</span>
        </button>
        <div class="dplayer-volume">
            <button class="dplayer-icon dplayer-volume-icon">
                <span class="dplayer-icon-content">`,y+=z.volumeDown,y+=`</span>
            </button>
            <div class="dplayer-volume-bar-wrap" data-balloon-pos="up">
                <div class="dplayer-volume-bar">
                    <div class="dplayer-volume-bar-inner" style="background: `,y+=C(B.theme),y+=`;">
                        <span class="dplayer-thumb" style="background: `,y+=C(B.theme),y+=`"></span>
                    </div>
                </div>
            </div>
        </div>
        <span class="dplayer-time">
            <span class="dplayer-ptime">0:00</span> /
            <span class="dplayer-dtime">0:00</span>
        </span>
        `,B.live&&(y+=`
        <span class="dplayer-live-badge"><span class="dplayer-live-dot" style="background: `,y+=C(B.theme),y+=';"></span>',y+=C(L("live")),y+=`</span>
        `),y+=`
    </div>
    <div class="dplayer-icons dplayer-icons-right">
        `,B.video.quality&&(y+=`
        <div class="dplayer-quality">
            <button class="dplayer-icon dplayer-quality-icon">`,y+=C(B.video.quality[B.video.defaultQuality].name),y+=`</button>
            <div class="dplayer-quality-mask">
                <div class="dplayer-quality-list">
                `,$(B.video.quality,function(F,he){y+=`
                    <div class="dplayer-quality-item" data-index="`,y+=C(he),y+='">',y+=C(F.name),y+=`</div>
                `}),y+=`
                </div>
            </div>
        </div>
        `),y+=`
        `,B.screenshot&&(y+=`
        <div class="dplayer-icon dplayer-camera-icon" data-balloon="`,y+=C(L("screenshot")),y+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,y+=z.camera,y+=`</span>
        </div>
        `),y+=`
        `,B.airplay&&(y+=`
        <div class="dplayer-icon dplayer-airplay-icon" data-balloon="`,y+=C(L("airplay")),y+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,y+=z.airplay,y+=`</span>
        </div>
        `),y+=`
        `,B.chromecast&&(y+=`
        <div class="dplayer-icon dplayer-chromecast-icon" data-balloon="`,y+=C(L("chromecast")),y+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,y+=z.chromecast,y+=`</span>
        </div>
        `),y+=`
        <div class="dplayer-comment">
            <button class="dplayer-icon dplayer-comment-icon" data-balloon="`,y+=C(L("send-danmaku")),y+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,y+=z.comment,y+=`</span>
            </button>
        </div>
        `,B.subtitle&&(y+=`
        `,typeof B.subtitle.url=="string"?(y+=`
        <div class="dplayer-subtitle-btn">
            <button class="dplayer-icon dplayer-subtitle-icon" data-balloon="`,y+=C(L("hide-subs")),y+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,y+=z.subtitle,y+=`</span>
            </button>
        </div>
        `):(y+=`
        <div class="dplayer-subtitles">
            <button class="dplayer-icon dplayer-subtitles-icon" data-balloon="`,y+=C(L("subtitle")),y+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,y+=z.subtitle,y+=`</span>
            </button>
            <div class="dplayer-subtitles-box">
                <div class="dplayer-subtitles-panel">
                    `,$(B.subtitle.url,function(F,he){y+=`
                        <div class="dplayer-subtitles-item" data-subtitle="`,y+=C(F.url),y+=`">
                            <!-- if lang, show tran(lang). if lang and name, show name + (tran(lang)). if name, show name. off option use lang for translation. -->
                            <span class="dplayer-label">`,y+=C(F.lang?F.name?F.name+" ("+L(F.lang)+")":L(F.lang):F.name),y+=`</span>
                        </div>
                    `}),y+=`
                </div>
            </div>
        </div>
        `),y+=`
        `),y+=`
        <div class="dplayer-setting">
            <button class="dplayer-icon dplayer-setting-icon" data-balloon="`,y+=C(L("setting")),y+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,y+=z.setting,y+=`</span>
            </button>
            <div class="dplayer-setting-box">
                <div class="dplayer-setting-origin-panel">
                    <div class="dplayer-setting-item dplayer-setting-speed">
                        <span class="dplayer-label">`,y+=C(L("speed")),y+=`</span>
                        <div class="dplayer-toggle">`,y+=z.right,y+=`</div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-loop">
                        <span class="dplayer-label">`,y+=C(L("loop")),y+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-toggle-setting-input" type="checkbox" name="dplayer-toggle">
                            <label for="dplayer-toggle"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-showdan">
                        <span class="dplayer-label">`,y+=C(L("show-danmaku")),y+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-showdan-setting-input" type="checkbox" name="dplayer-toggle-dan">
                            <label for="dplayer-toggle-dan"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danunlimit">
                        <span class="dplayer-label">`,y+=C(L("unlimited-danmaku")),y+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-danunlimit-setting-input" type="checkbox" name="dplayer-toggle-danunlimit">
                            <label for="dplayer-toggle-danunlimit"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danmaku">
                        <span class="dplayer-label">`,y+=C(L("opacity-danmaku")),y+=`</span>
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
                    `,$(B.playbackSpeed,function(F,he){y+=`
                        <div class="dplayer-setting-speed-item" data-speed="`,y+=C(F),y+=`">
                            <span class="dplayer-label">`,y+=C(F===1?L("normal"):F),y+=`</span>
                        </div>
                    `}),y+=`
                </div>
            </div>
        </div>
        <div class="dplayer-full">
            <button class="dplayer-icon dplayer-full-in-icon" data-balloon="`,y+=C(L("web-fullscreen")),y+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,y+=z.fullWeb,y+=`</span>
            </button>
            <button class="dplayer-icon dplayer-full-icon" data-balloon="`,y+=C(L("fullscreen")),y+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,y+=z.full,y+=`</span>
            </button>
        </div>
    </div>
    <div class="dplayer-bar-wrap">
        <div class="dplayer-bar-time hidden">00:00</div>
        <div class="dplayer-bar-preview"></div>
        <div class="dplayer-bar">
            <div class="dplayer-loaded" style="width: 0;"></div>
            <div class="dplayer-played" style="width: 0; background: `,y+=C(B.theme),y+=`">
                <span class="dplayer-thumb" style="background: `,y+=C(B.theme),y+=`"></span>
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
    `,B.danmaku&&(y+=`
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
    `),y+=`
</div>
<div class="dplayer-menu">
    `,$(B.contextmenu,function(F,he){y+=`
        <div class="dplayer-menu-item">
            <a`,F.link&&(y+=' target="_blank"'),y+=' href="',y+=C(F.link||"javascript:void(0);"),y+='">',F.key&&(y+=" ",y+=C(L(F.key))),F.text&&(y+=" ",y+=C(F.text)),y+=`</a>
        </div>
    `}),y+=`
</div>
<div class="dplayer-notice-list"></div>
<button class="dplayer-mobile-play">
    `,y+=z.play,y+=`
</button>`}},568:(d,f,h)=>{var m=h(471);d.exports=function(b){var x="",y=(b=b||{}).enableSubtitle,k=b.subtitle,B=b.current,C=b.airplay,L=b.pic,z=m.$escape,T=b.screenshot,$=b.preload,F=b.url;return y=k&&k.type==="webvtt",x+=`
<video
    class="dplayer-video `,B&&(x+="dplayer-video-current"),x+=`"
    webkit-playsinline
    `,C&&(x+=' x-webkit-airplay="allow" '),x+=`
    playsinline
    `,L&&(x+='poster="',x+=z(L),x+='"'),x+=`
    `,(T||y)&&(x+='crossorigin="anonymous"'),x+=`
    `,$&&(x+='preload="',x+=z($),x+='"'),x+=`
    `,C?x+=`
    nosrc
    `:F&&(x+=`
    src="`,x+=z(F),x+=`"
    `),x+=`
    >
    `,C&&(x+=`
    <source src="`,x+=z(F),x+=`">
    `),x+=`
    `,y&&(x+=`
    <track class="dplayer-subtrack" kind="metadata" default src="`,x+=z(typeof k.url=="string"?k.url:k.url[k.index].url),x+=`"></track>
    `),x+`
</video>`}},49:(d,f,h)=>{h.d(f,{Z:()=>k});var m=h(415),b=h.n(m),x=h(352),y=h.n(x)()(b());y.push([d.id,`:root {
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
`],sourceRoot:""}]);const k=y},685:(d,f,h)=>{h.d(f,{Z:()=>$});var m=h(415),b=h.n(m),x=h(352),y=h.n(x),k=h(49),B=h(80),C=h.n(B),L=new URL(h(831),h.b),z=y()(b());z.i(k.Z);var T=C()(L);z.push([d.id,`@keyframes my-face {
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
}`],sourceRoot:""}]);const $=z},856:d=>{var f=[];function h(x){for(var y=-1,k=0;k<f.length;k++)if(f[k].identifier===x){y=k;break}return y}function m(x,y){for(var k={},B=[],C=0;C<x.length;C++){var L=x[C],z=y.base?L[0]+y.base:L[0],T=k[z]||0,$="".concat(z," ").concat(T);k[z]=T+1;var F=h($),he={css:L[1],media:L[2],sourceMap:L[3],supports:L[4],layer:L[5]};if(F!==-1)f[F].references++,f[F].updater(he);else{var ke=b(he,y);y.byIndex=C,f.splice(C,0,{identifier:$,updater:ke,references:1})}B.push($)}return B}function b(x,y){var k=y.domAPI(y);return k.update(x),function(B){if(B){if(B.css===x.css&&B.media===x.media&&B.sourceMap===x.sourceMap&&B.supports===x.supports&&B.layer===x.layer)return;k.update(x=B)}else k.remove()}}d.exports=function(x,y){var k=m(x=x||[],y=y||{});return function(B){B=B||[];for(var C=0;C<k.length;C++){var L=h(k[C]);f[L].references--}for(var z=m(B,y),T=0;T<k.length;T++){var $=h(k[T]);f[$].references===0&&(f[$].updater(),f.splice($,1))}k=z}}},370:d=>{var f={};d.exports=function(h,m){var b=function(x){if(f[x]===void 0){var y=document.querySelector(x);if(window.HTMLIFrameElement&&y instanceof window.HTMLIFrameElement)try{y=y.contentDocument.head}catch{y=null}f[x]=y}return f[x]}(h);if(!b)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");b.appendChild(m)}},278:d=>{d.exports=function(f){var h=document.createElement("style");return f.setAttributes(h,f.attributes),f.insert(h,f.options),h}},458:(d,f,h)=>{d.exports=function(m){var b=h.nc;b&&m.setAttribute("nonce",b)}},470:d=>{d.exports=function(f){var h=f.insertStyleElement(f);return{update:function(m){(function(b,x,y){var k="";y.supports&&(k+="@supports (".concat(y.supports,") {")),y.media&&(k+="@media ".concat(y.media," {"));var B=y.layer!==void 0;B&&(k+="@layer".concat(y.layer.length>0?" ".concat(y.layer):""," {")),k+=y.css,B&&(k+="}"),y.media&&(k+="}"),y.supports&&(k+="}");var C=y.sourceMap;C&&typeof btoa<"u"&&(k+=`
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(C))))," */")),x.styleTagTransform(k,b,x.options)})(h,f,m)},remove:function(){(function(m){if(m.parentNode===null)return!1;m.parentNode.removeChild(m)})(h)}}}},488:d=>{d.exports=function(f,h){if(h.styleSheet)h.styleSheet.cssText=f;else{for(;h.firstChild;)h.removeChild(h.firstChild);h.appendChild(document.createTextNode(f))}}},251:d=>{d.exports='<svg viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg"><path d="M288 90v96c0 20-16 36-36 36h-10c-16 0-16-24 0-24h10c7 0 12-5 12-12V90c0-7-5-12-12-12H36c-7 0-12 5-12 12v96c0 7 5 12 12 12h10c16 0 16 24 0 24H36c-20 0-36-16-36-36V90c0-20 16-36 36-36h216c20 0 36 16 36 36zm-120 62l48 68c14 20 1 38-20 38H92c-21 0-34-18-20-38l48-68c13-18 35-18 48 0z"></path></svg>'},113:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M16 23c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zM16 13c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zM27 28h-22c-1.654 0-3-1.346-3-3v-16c0-1.654 1.346-3 3-3h3c0.552 0 1 0.448 1 1s-0.448 1-1 1h-3c-0.551 0-1 0.449-1 1v16c0 0.552 0.449 1 1 1h22c0.552 0 1-0.448 1-1v-16c0-0.551-0.448-1-1-1h-11c-0.552 0-1-0.448-1-1s0.448-1 1-1h11c1.654 0 3 1.346 3 3v16c0 1.654-1.346 3-3 3zM24 10.5c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5zM15 4c0 0.552-0.448 1-1 1h-4c-0.552 0-1-0.448-1-1v0c0-0.552 0.448-1 1-1h4c0.552 0 1 0.448 1 1v0z"></path></svg>'},193:d=>{d.exports='<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="chromecast" class="svg-inline--fa fa-chromecast fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M447.8,64H64c-23.6,0-42.7,19.1-42.7,42.7v63.9H64v-63.9h383.8v298.6H298.6V448H448c23.6,0,42.7-19.1,42.7-42.7V106.7 C490.7,83.1,471.4,64,447.8,64z M21.3,383.6L21.3,383.6l0,63.9h63.9C85.2,412.2,56.6,383.6,21.3,383.6L21.3,383.6z M21.3,298.6V341 c58.9,0,106.6,48.1,106.6,107h42.7C170.7,365.6,103.7,298.7,21.3,298.6z M213.4,448h42.7c-0.5-129.5-105.3-234.3-234.8-234.6l0,42.4 C127.3,255.6,213.3,342,213.4,448z"></path></svg>'},338:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.090 0.131h-22.731c-2.354 0-4.262 1.839-4.262 4.109v16.401c0 2.269 1.908 4.109 4.262 4.109h4.262v-2.706h8.469l-8.853 8.135 1.579 1.451 7.487-6.88h9.787c2.353 0 4.262-1.84 4.262-4.109v-16.401c0-2.27-1.909-4.109-4.262-4.109v0zM28.511 19.304c0 1.512-1.272 2.738-2.841 2.738h-8.425l-0.076-0.070-0.076 0.070h-11.311c-1.569 0-2.841-1.226-2.841-2.738v-13.696c0-1.513 1.272-2.739 2.841-2.739h19.889c1.569 0 2.841-0.142 2.841 1.37v15.064z"></path></svg>'},807:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.128 0.38h-22.553c-2.336 0-4.229 1.825-4.229 4.076v16.273c0 2.251 1.893 4.076 4.229 4.076h4.229v-2.685h8.403l-8.784 8.072 1.566 1.44 7.429-6.827h9.71c2.335 0 4.229-1.825 4.229-4.076v-16.273c0-2.252-1.894-4.076-4.229-4.076zM28.538 19.403c0 1.5-1.262 2.717-2.819 2.717h-8.36l-0.076-0.070-0.076 0.070h-11.223c-1.557 0-2.819-1.217-2.819-2.717v-13.589c0-1.501 1.262-2.718 2.819-2.718h19.734c1.557 0 2.819-0.141 2.819 1.359v14.947zM9.206 10.557c-1.222 0-2.215 0.911-2.215 2.036s0.992 2.035 2.215 2.035c1.224 0 2.216-0.911 2.216-2.035s-0.992-2.036-2.216-2.036zM22.496 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.224 0 2.215-0.911 2.215-2.035s-0.991-2.036-2.215-2.036zM15.852 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.222 0 2.215-0.911 2.215-2.035s-0.992-2.036-2.215-2.036z"></path></svg>'},300:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M24.965 24.38h-18.132c-1.366 0-2.478-1.113-2.478-2.478v-11.806c0-1.364 1.111-2.478 2.478-2.478h18.132c1.366 0 2.478 1.113 2.478 2.478v11.806c0 1.364-1.11 2.478-2.478 2.478zM6.833 10.097v11.806h18.134l-0.002-11.806h-18.132zM2.478 28.928h5.952c0.684 0 1.238-0.554 1.238-1.239 0-0.684-0.554-1.238-1.238-1.238h-5.952v-5.802c0-0.684-0.554-1.239-1.238-1.239s-1.239 0.556-1.239 1.239v5.802c0 1.365 1.111 2.478 2.478 2.478zM30.761 19.412c-0.684 0-1.238 0.554-1.238 1.238v5.801h-5.951c-0.686 0-1.239 0.554-1.239 1.238 0 0.686 0.554 1.239 1.239 1.239h5.951c1.366 0 2.478-1.111 2.478-2.478v-5.801c0-0.683-0.554-1.238-1.239-1.238zM0 5.55v5.802c0 0.683 0.554 1.238 1.238 1.238s1.238-0.555 1.238-1.238v-5.802h5.952c0.684 0 1.238-0.554 1.238-1.238s-0.554-1.238-1.238-1.238h-5.951c-1.366-0.001-2.478 1.111-2.478 2.476zM32 11.35v-5.801c0-1.365-1.11-2.478-2.478-2.478h-5.951c-0.686 0-1.239 0.554-1.239 1.238s0.554 1.238 1.239 1.238h5.951v5.801c0 0.683 0.554 1.237 1.238 1.237 0.686 0.002 1.239-0.553 1.239-1.236z"></path></svg>'},574:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M6.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v4h4c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333zM30.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h4v-4c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM30.667 12c-0.8 0-1.333-0.533-1.333-1.333v-4h-4c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM1.333 12c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333h-4v4c0 0.8-0.533 1.333-1.333 1.333z"></path></svg>'},182:d=>{d.exports='<svg version="1.1" viewBox="0 0 22 22"><svg x="7" y="1"><circle class="diplayer-loading-dot diplayer-loading-dot-0" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-1" cx="4" cy="4" r="2"></circle></svg><svg x="13" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-2" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-3" cx="4" cy="4" r="2"></circle></svg><svg x="7" y="13"><circle class="diplayer-loading-dot diplayer-loading-dot-4" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-5" cx="4" cy="4" r="2"></circle></svg><svg x="1" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-6" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-7" cx="4" cy="4" r="2"></circle></svg></svg>'},965:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M19.357 2.88c1.749 0 3.366 0.316 4.851 0.946 1.485 0.632 2.768 1.474 3.845 2.533s1.922 2.279 2.532 3.661c0.611 1.383 0.915 2.829 0.915 4.334 0 1.425-0.304 2.847-0.915 4.271-0.611 1.425-1.587 2.767-2.928 4.028-0.855 0.813-1.811 1.607-2.869 2.38s-2.136 1.465-3.233 2.075c-1.099 0.61-2.198 1.098-3.296 1.465-1.098 0.366-2.115 0.549-3.051 0.549-1.343 0-2.441-0.438-3.296-1.311-0.854-0.876-1.281-2.41-1.281-4.608 0-0.366 0.020-0.773 0.060-1.221s0.062-0.895 0.062-1.343c0-0.773-0.183-1.353-0.55-1.738-0.366-0.387-0.793-0.58-1.281-0.58-0.652 0-1.21 0.295-1.678 0.886s-0.926 1.23-1.373 1.921c-0.447 0.693-0.905 1.334-1.372 1.923s-1.028 0.886-1.679 0.886c-0.529 0-1.048-0.427-1.556-1.282s-0.763-2.259-0.763-4.212c0-2.197 0.529-4.241 1.587-6.133s2.462-3.529 4.21-4.912c1.75-1.383 3.762-2.471 6.041-3.264 2.277-0.796 4.617-1.212 7.018-1.253zM7.334 15.817c0.569 0 1.047-0.204 1.434-0.611s0.579-0.875 0.579-1.404c0-0.569-0.193-1.047-0.579-1.434s-0.864-0.579-1.434-0.579c-0.529 0-0.987 0.193-1.373 0.579s-0.58 0.864-0.58 1.434c0 0.53 0.194 0.998 0.58 1.404 0.388 0.407 0.845 0.611 1.373 0.611zM12.216 11.79c0.691 0 1.292-0.254 1.8-0.763s0.762-1.107 0.762-1.8c0-0.732-0.255-1.343-0.762-1.831-0.509-0.489-1.109-0.732-1.8-0.732-0.732 0-1.342 0.244-1.831 0.732-0.488 0.488-0.732 1.098-0.732 1.831 0 0.693 0.244 1.292 0.732 1.8s1.099 0.763 1.831 0.763zM16.366 25.947c0.692 0 1.282-0.214 1.77-0.64s0.732-0.987 0.732-1.678-0.244-1.261-0.732-1.709c-0.489-0.448-1.078-0.671-1.77-0.671-0.65 0-1.21 0.223-1.678 0.671s-0.702 1.018-0.702 1.709c0 0.692 0.234 1.25 0.702 1.678s1.027 0.64 1.678 0.64zM19.113 9.592c0.651 0 1.129-0.203 1.433-0.611 0.305-0.406 0.459-0.874 0.459-1.404 0-0.488-0.154-0.947-0.459-1.373-0.304-0.427-0.782-0.641-1.433-0.641-0.529 0-1.008 0.193-1.434 0.58s-0.64 0.865-0.64 1.434c0 0.571 0.213 1.049 0.64 1.434 0.427 0.389 0.905 0.581 1.434 0.581zM24.848 12.826c0.57 0 1.067-0.213 1.495-0.64 0.427-0.427 0.64-0.947 0.64-1.556 0-0.57-0.214-1.068-0.64-1.495-0.428-0.427-0.927-0.64-1.495-0.64-0.611 0-1.129 0.213-1.555 0.64-0.428 0.427-0.642 0.926-0.642 1.495 0 0.611 0.213 1.129 0.642 1.556s0.947 0.64 1.555 0.64z"></path></svg>'},74:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 17 32"><path d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path></svg>'},730:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 32"><path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path></svg>'},428:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path></svg>'},254:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M13.725 30l3.9-5.325-3.9-1.125v6.45zM0 17.5l11.050 3.35 13.6-11.55-10.55 12.425 11.8 3.65 6.1-23.375-32 15.5z"></path></svg>'},934:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 28"><path d="M28.633 17.104c0.035 0.21 0.026 0.463-0.026 0.76s-0.14 0.598-0.262 0.904c-0.122 0.306-0.271 0.581-0.445 0.825s-0.367 0.419-0.576 0.524c-0.209 0.105-0.393 0.157-0.55 0.157s-0.332-0.035-0.524-0.105c-0.175-0.052-0.393-0.1-0.655-0.144s-0.528-0.052-0.799-0.026c-0.271 0.026-0.541 0.083-0.812 0.17s-0.502 0.236-0.694 0.445c-0.419 0.437-0.664 0.934-0.734 1.493s0.009 1.092 0.236 1.598c0.175 0.349 0.148 0.699-0.079 1.048-0.105 0.14-0.271 0.284-0.498 0.432s-0.476 0.284-0.747 0.406-0.555 0.218-0.851 0.288c-0.297 0.070-0.559 0.105-0.786 0.105-0.157 0-0.306-0.061-0.445-0.183s-0.236-0.253-0.288-0.393h-0.026c-0.192-0.541-0.52-1.009-0.982-1.402s-1-0.589-1.611-0.589c-0.594 0-1.131 0.197-1.611 0.589s-0.816 0.851-1.009 1.375c-0.087 0.21-0.218 0.362-0.393 0.458s-0.367 0.144-0.576 0.144c-0.244 0-0.52-0.044-0.825-0.131s-0.611-0.197-0.917-0.327c-0.306-0.131-0.581-0.284-0.825-0.458s-0.428-0.349-0.55-0.524c-0.087-0.122-0.135-0.266-0.144-0.432s0.057-0.397 0.197-0.694c0.192-0.402 0.266-0.86 0.223-1.375s-0.266-0.991-0.668-1.428c-0.244-0.262-0.541-0.432-0.891-0.511s-0.681-0.109-0.995-0.092c-0.367 0.017-0.742 0.087-1.127 0.21-0.244 0.070-0.489 0.052-0.734-0.052-0.192-0.070-0.371-0.231-0.537-0.485s-0.314-0.533-0.445-0.838c-0.131-0.306-0.231-0.62-0.301-0.943s-0.087-0.59-0.052-0.799c0.052-0.384 0.227-0.629 0.524-0.734 0.524-0.21 0.995-0.555 1.415-1.035s0.629-1.017 0.629-1.611c0-0.611-0.21-1.144-0.629-1.598s-0.891-0.786-1.415-0.996c-0.157-0.052-0.288-0.179-0.393-0.38s-0.157-0.406-0.157-0.616c0-0.227 0.035-0.48 0.105-0.76s0.162-0.55 0.275-0.812 0.244-0.502 0.393-0.72c0.148-0.218 0.31-0.38 0.485-0.485 0.14-0.087 0.275-0.122 0.406-0.105s0.275 0.052 0.432 0.105c0.524 0.21 1.070 0.275 1.637 0.197s1.070-0.327 1.506-0.747c0.21-0.209 0.362-0.467 0.458-0.773s0.157-0.607 0.183-0.904c0.026-0.297 0.026-0.568 0-0.812s-0.048-0.419-0.065-0.524c-0.035-0.105-0.066-0.227-0.092-0.367s-0.013-0.262 0.039-0.367c0.105-0.244 0.293-0.458 0.563-0.642s0.563-0.336 0.878-0.458c0.314-0.122 0.62-0.214 0.917-0.275s0.533-0.092 0.707-0.092c0.227 0 0.406 0.074 0.537 0.223s0.223 0.301 0.275 0.458c0.192 0.471 0.507 0.886 0.943 1.244s0.952 0.537 1.546 0.537c0.611 0 1.153-0.17 1.624-0.511s0.803-0.773 0.996-1.297c0.070-0.14 0.179-0.284 0.327-0.432s0.301-0.223 0.458-0.223c0.244 0 0.511 0.035 0.799 0.105s0.572 0.166 0.851 0.288c0.279 0.122 0.537 0.279 0.773 0.472s0.423 0.402 0.563 0.629c0.087 0.14 0.113 0.293 0.079 0.458s-0.070 0.284-0.105 0.354c-0.227 0.506-0.297 1.039-0.21 1.598s0.341 1.048 0.76 1.467c0.419 0.419 0.934 0.651 1.546 0.694s1.179-0.057 1.703-0.301c0.14-0.087 0.31-0.122 0.511-0.105s0.371 0.096 0.511 0.236c0.262 0.244 0.493 0.616 0.694 1.113s0.336 1 0.406 1.506c0.035 0.297-0.013 0.528-0.144 0.694s-0.266 0.275-0.406 0.327c-0.542 0.192-1.004 0.528-1.388 1.009s-0.576 1.026-0.576 1.637c0 0.594 0.162 1.113 0.485 1.559s0.747 0.764 1.27 0.956c0.122 0.070 0.227 0.14 0.314 0.21 0.192 0.157 0.323 0.358 0.393 0.602v0zM16.451 19.462c0.786 0 1.528-0.149 2.227-0.445s1.305-0.707 1.821-1.231c0.515-0.524 0.921-1.131 1.218-1.821s0.445-1.428 0.445-2.214c0-0.786-0.148-1.524-0.445-2.214s-0.703-1.292-1.218-1.808c-0.515-0.515-1.122-0.921-1.821-1.218s-1.441-0.445-2.227-0.445c-0.786 0-1.524 0.148-2.214 0.445s-1.292 0.703-1.808 1.218c-0.515 0.515-0.921 1.118-1.218 1.808s-0.445 1.428-0.445 2.214c0 0.786 0.149 1.524 0.445 2.214s0.703 1.297 1.218 1.821c0.515 0.524 1.118 0.934 1.808 1.231s1.428 0.445 2.214 0.445v0z"></path></svg>'},410:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path></svg>'},644:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"></path></svg>'},324:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"></path></svg>'},437:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056z"></path></svg>'},897:(d,f,h)=>{var m=typeof self<"u"?self:typeof window<"u"?window:h.g!==void 0?h.g:{},b=Object.create(m),x=/["&'<>]/;function y(k){return typeof k!="string"&&(k=k==null?"":typeof k=="function"?y(k.call(k)):JSON.stringify(k)),k}b.$escape=function(k){return function(B){var C=""+B,L=x.exec(C);if(!L)return B;var z="",T=void 0,$=void 0,F=void 0;for(T=L.index,$=0;T<C.length;T++){switch(C.charCodeAt(T)){case 34:F="&#34;";break;case 38:F="&#38;";break;case 39:F="&#39;";break;case 60:F="&#60;";break;case 62:F="&#62;";break;default:continue}$!==T&&(z+=C.substring($,T)),$=T+1,z+=F}return $!==T?z+C.substring($,T):z}(y(k))},b.$each=function(k,B){if(Array.isArray(k))for(var C=0,L=k.length;C<L;C++)B(k[C],C);else for(var z in k)B(k[z],z)},d.exports=b},471:(d,f,h)=>{d.exports=h(897)},352:d=>{d.exports=function(f){var h=[];return h.toString=function(){return this.map(function(m){var b="",x=m[5]!==void 0;return m[4]&&(b+="@supports (".concat(m[4],") {")),m[2]&&(b+="@media ".concat(m[2]," {")),x&&(b+="@layer".concat(m[5].length>0?" ".concat(m[5]):""," {")),b+=f(m),x&&(b+="}"),m[2]&&(b+="}"),m[4]&&(b+="}"),b}).join("")},h.i=function(m,b,x,y,k){typeof m=="string"&&(m=[[null,m,void 0]]);var B={};if(x)for(var C=0;C<this.length;C++){var L=this[C][0];L!=null&&(B[L]=!0)}for(var z=0;z<m.length;z++){var T=[].concat(m[z]);x&&B[T[0]]||(k!==void 0&&(T[5]===void 0||(T[1]="@layer".concat(T[5].length>0?" ".concat(T[5]):""," {").concat(T[1],"}")),T[5]=k),b&&(T[2]&&(T[1]="@media ".concat(T[2]," {").concat(T[1],"}")),T[2]=b),y&&(T[4]?(T[1]="@supports (".concat(T[4],") {").concat(T[1],"}"),T[4]=y):T[4]="".concat(y)),h.push(T))}},h}},80:d=>{d.exports=function(f,h){return h||(h={}),f&&(f=String(f.__esModule?f.default:f),/^['"].*['"]$/.test(f)&&(f=f.slice(1,-1)),h.hash&&(f+=h.hash),/["'() \t\n]|(%20)/.test(f)||h.needQuotes?'"'.concat(f.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):f)}},415:d=>{d.exports=function(f){var h=f[1],m=f[3];if(!m)return h;if(typeof btoa=="function"){var b=btoa(unescape(encodeURIComponent(JSON.stringify(m)))),x="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(b),y="/*# ".concat(x," */");return[h].concat([y]).join(`
`)}return[h].join(`
`)}},937:d=>{function f(h){return f=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(m){return typeof m}:function(m){return m&&typeof Symbol=="function"&&m.constructor===Symbol&&m!==Symbol.prototype?"symbol":typeof m},f(h)}d.exports=(typeof self>"u"?"undefined":f(self))=="object"?self.FormData:window.FormData},831:d=>{d.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg=="}},r={};function o(d){var f=r[d];if(f!==void 0)return f.exports;var h=r[d]={id:d,exports:{}};return n[d](h,h.exports,o),h.exports}o.m=n,o.n=d=>{var f=d&&d.__esModule?()=>d.default:()=>d;return o.d(f,{a:f}),f},o.d=(d,f)=>{for(var h in f)o.o(f,h)&&!o.o(d,h)&&Object.defineProperty(d,h,{enumerable:!0,get:f[h]})},o.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}(),o.o=(d,f)=>Object.prototype.hasOwnProperty.call(d,f),o.b=document.baseURI||self.location.href,o.nc=void 0;var c={};return(()=>{o.d(c,{default:()=>Vd});var d=o(856),f=o.n(d),h=o(470),m=o.n(h),b=o(370),x=o.n(b),y=o(458),k=o.n(y),B=o(278),C=o.n(B),L=o(488),z=o.n(L),T=o(685),$={};$.styleTagTransform=z(),$.setAttributes=k(),$.insert=x().bind(null,"head"),$.domAPI=m(),$.insertStyleElement=C(),f()(T.Z,$),T.Z&&T.Z.locals&&T.Z.locals;function F(i){return F=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},F(i)}function he(i,l){this.name="AggregateError",this.errors=i,this.message=l||""}he.prototype=Error.prototype;function ke(i){return ke=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},ke(i)}var Ve=setTimeout;function be(i){return!!(i&&i.length!==void 0)}function Ce(){}function le(i){if(!(this instanceof le))throw new TypeError("Promises must be constructed via new");if(typeof i!="function")throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],Oe(i,this)}function Re(i,l){for(;i._state===3;)i=i._value;i._state!==0?(i._handled=!0,le._immediateFn(function(){var u=i._state===1?l.onFulfilled:l.onRejected;if(u!==null){var a;try{a=u(i._value)}catch(s){return void De(l.promise,s)}Ne(l.promise,a)}else(i._state===1?Ne:De)(l.promise,i._value)})):i._deferreds.push(l)}function Ne(i,l){try{if(l===i)throw new TypeError("A promise cannot be resolved with itself.");if(l&&(ke(l)==="object"||typeof l=="function")){var u=l.then;if(l instanceof le)return i._state=3,i._value=l,void St(i);if(typeof u=="function")return void Oe((a=u,s=l,function(){a.apply(s,arguments)}),i)}i._state=1,i._value=l,St(i)}catch(p){De(i,p)}var a,s}function De(i,l){i._state=2,i._value=l,St(i)}function St(i){i._state===2&&i._deferreds.length===0&&le._immediateFn(function(){i._handled||le._unhandledRejectionFn(i._value)});for(var l=0,u=i._deferreds.length;l<u;l++)Re(i,i._deferreds[l]);i._deferreds=null}function zt(i,l,u){this.onFulfilled=typeof i=="function"?i:null,this.onRejected=typeof l=="function"?l:null,this.promise=u}function Oe(i,l){var u=!1;try{i(function(a){u||(u=!0,Ne(l,a))},function(a){u||(u=!0,De(l,a))})}catch(a){if(u)return;u=!0,De(l,a)}}le.prototype.catch=function(i){return this.then(null,i)},le.prototype.then=function(i,l){var u=new this.constructor(Ce);return Re(this,new zt(i,l,u)),u},le.prototype.finally=function(i){var l=this.constructor;return this.then(function(u){return l.resolve(i()).then(function(){return u})},function(u){return l.resolve(i()).then(function(){return l.reject(u)})})},le.all=function(i){return new le(function(l,u){if(!be(i))return u(new TypeError("Promise.all accepts an array"));var a=Array.prototype.slice.call(i);if(a.length===0)return l([]);var s=a.length;function p(g,v){try{if(v&&(ke(v)==="object"||typeof v=="function")){var I=v.then;if(typeof I=="function")return void I.call(v,function(_){p(g,_)},u)}a[g]=v,--s==0&&l(a)}catch(_){u(_)}}for(var A=0;A<a.length;A++)p(A,a[A])})},le.any=function(i){var l=this;return new l(function(u,a){if(!i||i.length===void 0)return a(new TypeError("Promise.any accepts an array"));var s=Array.prototype.slice.call(i);if(s.length===0)return a();for(var p=[],A=0;A<s.length;A++)try{l.resolve(s[A]).then(u).catch(function(g){p.push(g),p.length===s.length&&a(new he(p,"All promises were rejected"))})}catch(g){a(g)}})},le.allSettled=function(i){return new this(function(l,u){if(!i||i.length===void 0)return u(new TypeError(F(i)+" "+i+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var a=Array.prototype.slice.call(i);if(a.length===0)return l([]);var s=a.length;function p(g,v){if(v&&(F(v)==="object"||typeof v=="function")){var I=v.then;if(typeof I=="function")return void I.call(v,function(_){p(g,_)},function(_){a[g]={status:"rejected",reason:_},--s==0&&l(a)})}a[g]={status:"fulfilled",value:v},--s==0&&l(a)}for(var A=0;A<a.length;A++)p(A,a[A])})},le.resolve=function(i){return i&&ke(i)==="object"&&i.constructor===le?i:new le(function(l){l(i)})},le.reject=function(i){return new le(function(l,u){u(i)})},le.race=function(i){return new le(function(l,u){if(!be(i))return u(new TypeError("Promise.race accepts an array"));for(var a=0,s=i.length;a<s;a++)le.resolve(i[a]).then(l,u)})},le._immediateFn=typeof setImmediate=="function"&&function(i){setImmediate(i)}||function(i){Ve(i,0)},le._unhandledRejectionFn=function(i){typeof console<"u"&&console&&console.warn("Possible Unhandled Promise Rejection:",i)};const ve=le;var ue=/mobile/i.test(window.navigator.userAgent);const te={secondToTime:function(i){if((i=i||0)===0||i===1/0||i.toString()==="NaN")return"00:00";var l=Math.floor(i/3600),u=Math.floor((i-3600*l)/60),a=Math.floor(i-3600*l-60*u);return(l>0?[l,u,a]:[u,a]).map(function(s){return s<10?"0"+s:""+s}).join(":")},getElementViewLeft:function(i){var l=i.offsetLeft,u=i.offsetParent,a=document.body.scrollLeft+document.documentElement.scrollLeft;if(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement)for(;u!==null&&u!==i;)l+=u.offsetLeft,u=u.offsetParent;else for(;u!==null;)l+=u.offsetLeft,u=u.offsetParent;return l-a},getBoundingClientRectViewLeft:function(i){var l=window.scrollY||window.pageYOffset||document.body.scrollTop+(document.documentElement&&document.documentElement.scrollTop||0);if(i.getBoundingClientRect){if(typeof this.getBoundingClientRectViewLeft.offset!="number"){var u=document.createElement("div");u.style.cssText="position:absolute;top:0;left:0;",document.body.appendChild(u),this.getBoundingClientRectViewLeft.offset=-u.getBoundingClientRect().top-l,document.body.removeChild(u),u=null}var a=i.getBoundingClientRect(),s=this.getBoundingClientRectViewLeft.offset;return a.left+s}return this.getElementViewLeft(i)},getScrollPosition:function(){return{left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0}},setScrollPosition:function(i){var l=i.left,u=l===void 0?0:l,a=i.top,s=a===void 0?0:a;this.isFirefox?(document.documentElement.scrollLeft=u,document.documentElement.scrollTop=s):window.scrollTo(u,s)},isMobile:ue,isFirefox:/firefox/i.test(window.navigator.userAgent),isChrome:/chrome/i.test(window.navigator.userAgent),isSafari:/safari/i.test(window.navigator.userAgent),storage:{set:function(i,l){localStorage.setItem(i,l)},get:function(i){return localStorage.getItem(i)}},nameMap:{dragStart:ue?"touchstart":"mousedown",dragMove:ue?"touchmove":"mousemove",dragEnd:ue?"touchend":"mouseup"},color2Number:function(i){return i[0]==="#"&&(i=i.substr(1)),i.length===3&&(i="".concat(i[0]).concat(i[0]).concat(i[1]).concat(i[1]).concat(i[2]).concat(i[2])),parseInt(i,16)+0&16777215},number2Color:function(i){return"#"+("00000"+i.toString(16)).slice(-6)},number2Type:function(i){switch(i){case 0:default:return"right";case 1:return"top";case 2:return"bottom"}}};function it(i,l){return function(){return i.apply(l,arguments)}}function We(i){return We=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},We(i)}var qe,It=Object.prototype.toString,mt=Object.getPrototypeOf,Mt=(qe=Object.create(null),function(i){var l=It.call(i);return qe[l]||(qe[l]=l.slice(8,-1).toLowerCase())}),Be=function(i){return i=i.toLowerCase(),function(l){return Mt(l)===i}},j=function(i){return function(l){return We(l)===i}},Z=Array.isArray,H=j("undefined"),ne=Be("ArrayBuffer"),ye=j("string"),E=j("function"),w=j("number"),S=function(i){return i!==null&&We(i)==="object"},O=function(i){if(Mt(i)!=="object")return!1;var l=mt(i);return!(l!==null&&l!==Object.prototype&&Object.getPrototypeOf(l)!==null||Symbol.toStringTag in i||Symbol.iterator in i)},M=Be("Date"),q=Be("File"),J=Be("Blob"),N=Be("FileList"),Y=Be("URLSearchParams");function D(i,l){var u,a,s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},p=s.allOwnKeys,A=p!==void 0&&p;if(i!=null)if(We(i)!=="object"&&(i=[i]),Z(i))for(u=0,a=i.length;u<a;u++)l.call(null,i[u],u,i);else{var g,v=A?Object.getOwnPropertyNames(i):Object.keys(i),I=v.length;for(u=0;u<I;u++)g=v[u],l.call(null,i[g],g,i)}}function re(i,l){l=l.toLowerCase();for(var u,a=Object.keys(i),s=a.length;s-- >0;)if(l===(u=a[s]).toLowerCase())return u;return null}var G,oe,ae=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:hh,de=function(i){return!H(i)&&i!==ae},Ee=(G=typeof Uint8Array<"u"&&mt(Uint8Array),function(i){return G&&i instanceof G}),ge=Be("HTMLFormElement"),_e=(oe=Object.prototype.hasOwnProperty,function(i,l){return oe.call(i,l)}),Ge=Be("RegExp"),Lt=function(i,l){var u=Object.getOwnPropertyDescriptors(i),a={};D(u,function(s,p){l(s,p,i)!==!1&&(a[p]=s)}),Object.defineProperties(i,a)};const R={isArray:Z,isArrayBuffer:ne,isBuffer:function(i){return i!==null&&!H(i)&&i.constructor!==null&&!H(i.constructor)&&E(i.constructor.isBuffer)&&i.constructor.isBuffer(i)},isFormData:function(i){var l="[object FormData]";return i&&(typeof FormData=="function"&&i instanceof FormData||It.call(i)===l||E(i.toString)&&i.toString()===l)},isArrayBufferView:function(i){return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?ArrayBuffer.isView(i):i&&i.buffer&&ne(i.buffer)},isString:ye,isNumber:w,isBoolean:function(i){return i===!0||i===!1},isObject:S,isPlainObject:O,isUndefined:H,isDate:M,isFile:q,isBlob:J,isRegExp:Ge,isFunction:E,isStream:function(i){return S(i)&&E(i.pipe)},isURLSearchParams:Y,isTypedArray:Ee,isFileList:N,forEach:D,merge:function i(){for(var l=de(this)&&this||{},u=l.caseless,a={},s=function(g,v){var I=u&&re(a,v)||v;O(a[I])&&O(g)?a[I]=i(a[I],g):O(g)?a[I]=i({},g):Z(g)?a[I]=g.slice():a[I]=g},p=0,A=arguments.length;p<A;p++)arguments[p]&&D(arguments[p],s);return a},extend:function(i,l,u){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},s=a.allOwnKeys;return D(l,function(p,A){u&&E(p)?i[A]=it(p,u):i[A]=p},{allOwnKeys:s}),i},trim:function(i){return i.trim?i.trim():i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},stripBOM:function(i){return i.charCodeAt(0)===65279&&(i=i.slice(1)),i},inherits:function(i,l,u,a){i.prototype=Object.create(l.prototype,a),i.prototype.constructor=i,Object.defineProperty(i,"super",{value:l.prototype}),u&&Object.assign(i.prototype,u)},toFlatObject:function(i,l,u,a){var s,p,A,g={};if(l=l||{},i==null)return l;do{for(p=(s=Object.getOwnPropertyNames(i)).length;p-- >0;)A=s[p],a&&!a(A,i,l)||g[A]||(l[A]=i[A],g[A]=!0);i=u!==!1&&mt(i)}while(i&&(!u||u(i,l))&&i!==Object.prototype);return l},kindOf:Mt,kindOfTest:Be,endsWith:function(i,l,u){i=String(i),(u===void 0||u>i.length)&&(u=i.length),u-=l.length;var a=i.indexOf(l,u);return a!==-1&&a===u},toArray:function(i){if(!i)return null;if(Z(i))return i;var l=i.length;if(!w(l))return null;for(var u=new Array(l);l-- >0;)u[l]=i[l];return u},forEachEntry:function(i,l){for(var u,a=(i&&i[Symbol.iterator]).call(i);(u=a.next())&&!u.done;){var s=u.value;l.call(i,s[0],s[1])}},matchAll:function(i,l){for(var u,a=[];(u=i.exec(l))!==null;)a.push(u);return a},isHTMLForm:ge,hasOwnProperty:_e,hasOwnProp:_e,reduceDescriptors:Lt,freezeMethods:function(i){Lt(i,function(l,u){if(E(i)&&["arguments","caller","callee"].indexOf(u)!==-1)return!1;var a=i[u];E(a)&&(l.enumerable=!1,"writable"in l?l.writable=!1:l.set||(l.set=function(){throw Error("Can not rewrite read-only method '"+u+"'")}))})},toObjectSet:function(i,l){var u={},a=function(s){s.forEach(function(p){u[p]=!0})};return Z(i)?a(i):a(String(i).split(l)),u},toCamelCase:function(i){return i.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,function(l,u,a){return u.toUpperCase()+a})},noop:function(){},toFiniteNumber:function(i,l){return i=+i,Number.isFinite(i)?i:l},findKey:re,global:ae,isContextDefined:de,toJSONObject:function(i){var l=new Array(10);return function u(a,s){if(S(a)){if(l.indexOf(a)>=0)return;if(!("toJSON"in a)){l[s]=a;var p=Z(a)?[]:{};return D(a,function(A,g){var v=u(A,s+1);!H(v)&&(p[g]=v)}),l[s]=void 0,p}}return a}(i,0)}};function tt(i,l,u,a,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=i,this.name="AxiosError",l&&(this.code=l),u&&(this.config=u),a&&(this.request=a),s&&(this.response=s)}R.inherits(tt,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:R.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var Bn=tt.prototype,Ye={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(function(i){Ye[i]={value:i}}),Object.defineProperties(tt,Ye),Object.defineProperty(Bn,"isAxiosError",{value:!0}),tt.from=function(i,l,u,a,s,p){var A=Object.create(Bn);return R.toFlatObject(i,A,function(g){return g!==Error.prototype},function(g){return g!=="isAxiosError"}),tt.call(A,i.message,l,u,a,s),A.cause=i,A.name=i.name,p&&Object.assign(A,p),A};const pe=tt,br=o(937);function yo(i){return yo=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},yo(i)}function ho(i){return R.isPlainObject(i)||R.isArray(i)}function qa(i){return R.endsWith(i,"[]")?i.slice(0,-2):i}function Fa(i,l,u){return i?i.concat(l).map(function(a,s){return a=qa(a),!u&&s?"["+a+"]":a}).join(u?".":""):l}var Vs=R.toFlatObject(R,{},null,function(i){return/^is[A-Z]/.test(i)});const gr=function(i,l,u){if(!R.isObject(i))throw new TypeError("target must be an object");l=l||new(br||FormData);var a,s=(u=R.toFlatObject(u,{metaTokens:!0,dots:!1,indexes:!1},!1,function(X,V){return!R.isUndefined(V[X])})).metaTokens,p=u.visitor||_,A=u.dots,g=u.indexes,v=(u.Blob||typeof Blob<"u"&&Blob)&&(a=l)&&R.isFunction(a.append)&&a[Symbol.toStringTag]==="FormData"&&a[Symbol.iterator];if(!R.isFunction(p))throw new TypeError("visitor must be a function");function I(X){if(X===null)return"";if(R.isDate(X))return X.toISOString();if(!v&&R.isBlob(X))throw new pe("Blob is not supported. Use a Buffer instead.");return R.isArrayBuffer(X)||R.isTypedArray(X)?v&&typeof Blob=="function"?new Blob([X]):Buffer.from(X):X}function _(X,V,W){var ee=X;if(X&&!W&&yo(X)==="object"){if(R.endsWith(V,"{}"))V=s?V:V.slice(0,-2),X=JSON.stringify(X);else if(R.isArray(X)&&function(ie){return R.isArray(ie)&&!ie.some(ho)}(X)||R.isFileList(X)||R.endsWith(V,"[]")&&(ee=R.toArray(X)))return V=qa(V),ee.forEach(function(ie,je){!R.isUndefined(ie)&&ie!==null&&l.append(g===!0?Fa([V],je,A):g===null?V:V+"[]",I(ie))}),!1}return!!ho(X)||(l.append(Fa(W,V,A),I(X)),!1)}var U=[],Q=Object.assign(Vs,{defaultVisitor:_,convertValue:I,isVisitable:ho});if(!R.isObject(i))throw new TypeError("data must be an object");return function X(V,W){if(!R.isUndefined(V)){if(U.indexOf(V)!==-1)throw Error("Circular reference detected in "+W.join("."));U.push(V),R.forEach(V,function(ee,ie){(!(R.isUndefined(ee)||ee===null)&&p.call(l,ee,R.isString(ie)?ie.trim():ie,W,Q))===!0&&X(ee,W?W.concat(ie):[ie])}),U.pop()}}(i),l};function Na(i){var l={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(i).replace(/[!'()~]|%20|%00/g,function(u){return l[u]})}function Ua(i,l){this._pairs=[],i&&gr(i,this,l)}var Ha=Ua.prototype;Ha.append=function(i,l){this._pairs.push([i,l])},Ha.toString=function(i){var l=i?function(u){return i.call(this,u,Na)}:Na;return this._pairs.map(function(u){return l(u[0])+"="+l(u[1])},"").join("&")};const Wa=Ua;function $s(i){return encodeURIComponent(i).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Ya(i,l,u){if(!l)return i;var a,s=u&&u.encode||$s,p=u&&u.serialize;if(a=p?p(l,u):R.isURLSearchParams(l)?l.toString():new Wa(l,u).toString(s)){var A=i.indexOf("#");A!==-1&&(i=i.slice(0,A)),i+=(i.indexOf("?")===-1?"?":"&")+a}return i}function Sn(i){return Sn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Sn(i)}function Zs(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Sn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Sn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Sn(s)==="symbol"?s:String(s)),a)}var s}var Js=function(){function i(){(function(a,s){if(!(a instanceof s))throw new TypeError("Cannot call a class as a function")})(this,i),this.handlers=[]}var l,u;return l=i,u=[{key:"use",value:function(a,s,p){return this.handlers.push({fulfilled:a,rejected:s,synchronous:!!p&&p.synchronous,runWhen:p?p.runWhen:null}),this.handlers.length-1}},{key:"eject",value:function(a){this.handlers[a]&&(this.handlers[a]=null)}},{key:"clear",value:function(){this.handlers&&(this.handlers=[])}},{key:"forEach",value:function(a){R.forEach(this.handlers,function(s){s!==null&&a(s)})}}],u&&Zs(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Ka=Js,Qa={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Xs=typeof URLSearchParams<"u"?URLSearchParams:Wa,Gs=FormData;var mo,ec=(typeof navigator>"u"||(mo=navigator.product)!=="ReactNative"&&mo!=="NativeScript"&&mo!=="NS")&&typeof window<"u"&&typeof document<"u",tc=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function";const bt={isBrowser:!0,classes:{URLSearchParams:Xs,FormData:Gs,Blob},isStandardBrowserEnv:ec,isStandardBrowserWebWorkerEnv:tc,protocols:["http","https","file","blob","url","data"]},Va=function(i){function l(a,s,p,A){var g=a[A++],v=Number.isFinite(+g),I=A>=a.length;return g=!g&&R.isArray(p)?p.length:g,I?(R.hasOwnProp(p,g)?p[g]=[p[g],s]:p[g]=s,!v):(p[g]&&R.isObject(p[g])||(p[g]=[]),l(a,s,p[g],A)&&R.isArray(p[g])&&(p[g]=function(_){var U,Q,X={},V=Object.keys(_),W=V.length;for(U=0;U<W;U++)X[Q=V[U]]=_[Q];return X}(p[g])),!v)}if(R.isFormData(i)&&R.isFunction(i.entries)){var u={};return R.forEachEntry(i,function(a,s){l(function(p){return R.matchAll(/\w+|\[(\w*)]/g,p).map(function(A){return A[0]==="[]"?"":A[1]||A[0]})}(a),s,u,0)}),u}return null};var nc={"Content-Type":void 0},vr={transitional:Qa,adapter:["xhr","http"],transformRequest:[function(i,l){var u,a=l.getContentType()||"",s=a.indexOf("application/json")>-1,p=R.isObject(i);if(p&&R.isHTMLForm(i)&&(i=new FormData(i)),R.isFormData(i))return s&&s?JSON.stringify(Va(i)):i;if(R.isArrayBuffer(i)||R.isBuffer(i)||R.isStream(i)||R.isFile(i)||R.isBlob(i))return i;if(R.isArrayBufferView(i))return i.buffer;if(R.isURLSearchParams(i))return l.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),i.toString();if(p){if(a.indexOf("application/x-www-form-urlencoded")>-1)return function(g,v){return gr(g,new bt.classes.URLSearchParams,Object.assign({visitor:function(I,_,U,Q){return bt.isNode&&R.isBuffer(I)?(this.append(_,I.toString("base64")),!1):Q.defaultVisitor.apply(this,arguments)}},v))}(i,this.formSerializer).toString();if((u=R.isFileList(i))||a.indexOf("multipart/form-data")>-1){var A=this.env&&this.env.FormData;return gr(u?{"files[]":i}:i,A&&new A,this.formSerializer)}}return p||s?(l.setContentType("application/json",!1),function(g,v,I){if(R.isString(g))try{return(0,JSON.parse)(g),R.trim(g)}catch(_){if(_.name!=="SyntaxError")throw _}return(0,JSON.stringify)(g)}(i)):i}],transformResponse:[function(i){var l=this.transitional||vr.transitional,u=l&&l.forcedJSONParsing,a=this.responseType==="json";if(i&&R.isString(i)&&(u&&!this.responseType||a)){var s=!(l&&l.silentJSONParsing)&&a;try{return JSON.parse(i)}catch(p){if(s)throw p.name==="SyntaxError"?pe.from(p,pe.ERR_BAD_RESPONSE,this,null,this.response):p}}return i}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:bt.classes.FormData,Blob:bt.classes.Blob},validateStatus:function(i){return i>=200&&i<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};R.forEach(["delete","get","head"],function(i){vr.headers[i]={}}),R.forEach(["post","put","patch"],function(i){vr.headers[i]=R.merge(nc)});const bo=vr;var rc=R.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]);function In(i){return In=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},In(i)}function $a(i,l){(l==null||l>i.length)&&(l=i.length);for(var u=0,a=new Array(l);u<l;u++)a[u]=i[u];return a}function Za(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(In(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(In(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),In(s)==="symbol"?s:String(s)),a)}var s}var Ja=Symbol("internals");function Ln(i){return i&&String(i).trim().toLowerCase()}function xr(i){return i===!1||i==null?i:R.isArray(i)?i.map(xr):String(i)}function Xa(i,l,u,a){return R.isFunction(a)?a.call(this,l,u):R.isString(l)?R.isString(a)?l.indexOf(a)!==-1:R.isRegExp(a)?a.test(l):void 0:void 0}var Er=function(i,l){function u(A){(function(g,v){if(!(g instanceof v))throw new TypeError("Cannot call a class as a function")})(this,u),A&&this.set(A)}var a,s,p;return a=u,s=[{key:"set",value:function(A,g,v){var I=this;function _(ie,je,Te){var we=Ln(je);if(!we)throw new Error("header name must be a non-empty string");var Ft=R.findKey(I,we);(!Ft||I[Ft]===void 0||Te===!0||Te===void 0&&I[Ft]!==!1)&&(I[Ft||je]=xr(ie))}var U,Q,X,V,W,ee=function(ie,je){return R.forEach(ie,function(Te,we){return _(Te,we,je)})};return R.isPlainObject(A)||A instanceof this.constructor?ee(A,g):R.isString(A)&&(A=A.trim())&&!/^[-_a-zA-Z]+$/.test(A.trim())?ee((W={},(U=A)&&U.split(`
`).forEach(function(ie){V=ie.indexOf(":"),Q=ie.substring(0,V).trim().toLowerCase(),X=ie.substring(V+1).trim(),!Q||W[Q]&&rc[Q]||(Q==="set-cookie"?W[Q]?W[Q].push(X):W[Q]=[X]:W[Q]=W[Q]?W[Q]+", "+X:X)}),W),g):A!=null&&_(g,A,v),this}},{key:"get",value:function(A,g){if(A=Ln(A)){var v=R.findKey(this,A);if(v){var I=this[v];if(!g)return I;if(g===!0)return function(_){for(var U,Q=Object.create(null),X=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;U=X.exec(_);)Q[U[1]]=U[2];return Q}(I);if(R.isFunction(g))return g.call(this,I,v);if(R.isRegExp(g))return g.exec(I);throw new TypeError("parser must be boolean|regexp|function")}}}},{key:"has",value:function(A,g){if(A=Ln(A)){var v=R.findKey(this,A);return!(!v||g&&!Xa(0,this[v],v,g))}return!1}},{key:"delete",value:function(A,g){var v=this,I=!1;function _(U){if(U=Ln(U)){var Q=R.findKey(v,U);!Q||g&&!Xa(0,v[Q],Q,g)||(delete v[Q],I=!0)}}return R.isArray(A)?A.forEach(_):_(A),I}},{key:"clear",value:function(){return Object.keys(this).forEach(this.delete.bind(this))}},{key:"normalize",value:function(A){var g=this,v={};return R.forEach(this,function(I,_){var U=R.findKey(v,_);if(U)return g[U]=xr(I),void delete g[_];var Q=A?function(X){return X.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,function(V,W,ee){return W.toUpperCase()+ee})}(_):String(_).trim();Q!==_&&delete g[_],g[Q]=xr(I),v[Q]=!0}),this}},{key:"concat",value:function(){for(var A,g=arguments.length,v=new Array(g),I=0;I<g;I++)v[I]=arguments[I];return(A=this.constructor).concat.apply(A,[this].concat(v))}},{key:"toJSON",value:function(A){var g=Object.create(null);return R.forEach(this,function(v,I){v!=null&&v!==!1&&(g[I]=A&&R.isArray(v)?v.join(", "):v)}),g}},{key:Symbol.iterator,value:function(){return Object.entries(this.toJSON())[Symbol.iterator]()}},{key:"toString",value:function(){return Object.entries(this.toJSON()).map(function(A){var g,v,I=(v=2,function(_){if(Array.isArray(_))return _}(g=A)||function(_,U){var Q=_==null?null:typeof Symbol<"u"&&_[Symbol.iterator]||_["@@iterator"];if(Q!=null){var X,V,W,ee,ie=[],je=!0,Te=!1;try{if(W=(Q=Q.call(_)).next,U===0){if(Object(Q)!==Q)return;je=!1}else for(;!(je=(X=W.call(Q)).done)&&(ie.push(X.value),ie.length!==U);je=!0);}catch(we){Te=!0,V=we}finally{try{if(!je&&Q.return!=null&&(ee=Q.return(),Object(ee)!==ee))return}finally{if(Te)throw V}}return ie}}(g,v)||function(_,U){if(_){if(typeof _=="string")return $a(_,U);var Q=Object.prototype.toString.call(_).slice(8,-1);return Q==="Object"&&_.constructor&&(Q=_.constructor.name),Q==="Map"||Q==="Set"?Array.from(_):Q==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(Q)?$a(_,U):void 0}}(g,v)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}());return I[0]+": "+I[1]}).join(`
`)}},{key:Symbol.toStringTag,get:function(){return"AxiosHeaders"}}],p=[{key:"from",value:function(A){return A instanceof this?A:new this(A)}},{key:"concat",value:function(A){for(var g=new this(A),v=arguments.length,I=new Array(v>1?v-1:0),_=1;_<v;_++)I[_-1]=arguments[_];return I.forEach(function(U){return g.set(U)}),g}},{key:"accessor",value:function(A){var g=(this[Ja]=this[Ja]={accessors:{}}).accessors,v=this.prototype;function I(_){var U=Ln(_);g[U]||(function(Q,X){var V=R.toCamelCase(" "+X);["get","set","has"].forEach(function(W){Object.defineProperty(Q,W+V,{value:function(ee,ie,je){return this[W].call(this,X,ee,ie,je)},configurable:!0})})}(v,_),g[U]=!0)}return R.isArray(A)?A.forEach(I):I(A),this}}],s&&Za(a.prototype,s),p&&Za(a,p),Object.defineProperty(a,"prototype",{writable:!1}),u}();Er.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent"]),R.freezeMethods(Er.prototype),R.freezeMethods(Er);const _t=Er;function go(i,l){var u=this||bo,a=l||u,s=_t.from(a.headers),p=a.data;return R.forEach(i,function(A){p=A.call(u,p,s.normalize(),l?l.status:void 0)}),s.normalize(),p}function Ga(i){return!(!i||!i.__CANCEL__)}function ei(i,l,u){pe.call(this,i??"canceled",pe.ERR_CANCELED,l,u),this.name="CanceledError"}R.inherits(ei,pe,{__CANCEL__:!0});const wr=ei,oc=bt.isStandardBrowserEnv?{write:function(i,l,u,a,s,p){var A=[];A.push(i+"="+encodeURIComponent(l)),R.isNumber(u)&&A.push("expires="+new Date(u).toGMTString()),R.isString(a)&&A.push("path="+a),R.isString(s)&&A.push("domain="+s),p===!0&&A.push("secure"),document.cookie=A.join("; ")},read:function(i){var l=document.cookie.match(new RegExp("(^|;\\s*)("+i+")=([^;]*)"));return l?decodeURIComponent(l[3]):null},remove:function(i){this.write(i,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};function ti(i,l){return i&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(l)?function(u,a){return a?u.replace(/\/+$/,"")+"/"+a.replace(/^\/+/,""):u}(i,l):l}const ac=bt.isStandardBrowserEnv?function(){var i,l=/(msie|trident)/i.test(navigator.userAgent),u=document.createElement("a");function a(s){var p=s;return l&&(u.setAttribute("href",p),p=u.href),u.setAttribute("href",p),{href:u.href,protocol:u.protocol?u.protocol.replace(/:$/,""):"",host:u.host,search:u.search?u.search.replace(/^\?/,""):"",hash:u.hash?u.hash.replace(/^#/,""):"",hostname:u.hostname,port:u.port,pathname:u.pathname.charAt(0)==="/"?u.pathname:"/"+u.pathname}}return i=a(window.location.href),function(s){var p=R.isString(s)?a(s):s;return p.protocol===i.protocol&&p.host===i.host}}():function(){return!0};function ni(i,l){var u=0,a=function(s,p){s=s||10;var A,g=new Array(s),v=new Array(s),I=0,_=0;return p=p!==void 0?p:1e3,function(U){var Q=Date.now(),X=v[_];A||(A=Q),g[I]=U,v[I]=Q;for(var V=_,W=0;V!==I;)W+=g[V++],V%=s;if((I=(I+1)%s)===_&&(_=(_+1)%s),!(Q-A<p)){var ee=X&&Q-X;return ee?Math.round(1e3*W/ee):void 0}}}(50,250);return function(s){var p=s.loaded,A=s.lengthComputable?s.total:void 0,g=p-u,v=a(g);u=p;var I={loaded:p,total:A,progress:A?p/A:void 0,bytes:g,rate:v||void 0,estimated:v&&A&&p<=A?(A-p)/v:void 0,event:s};I[l?"download":"upload"]=!0,i(I)}}var vo={http:null,xhr:typeof XMLHttpRequest<"u"&&function(i){return new Promise(function(l,u){var a,s=i.data,p=_t.from(i.headers).normalize(),A=i.responseType;function g(){i.cancelToken&&i.cancelToken.unsubscribe(a),i.signal&&i.signal.removeEventListener("abort",a)}R.isFormData(s)&&(bt.isStandardBrowserEnv||bt.isStandardBrowserWebWorkerEnv)&&p.setContentType(!1);var v=new XMLHttpRequest;if(i.auth){var I=i.auth.username||"",_=i.auth.password?unescape(encodeURIComponent(i.auth.password)):"";p.set("Authorization","Basic "+btoa(I+":"+_))}var U=ti(i.baseURL,i.url);function Q(){if(v){var ee=_t.from("getAllResponseHeaders"in v&&v.getAllResponseHeaders());(function(ie,je,Te){var we=Te.config.validateStatus;Te.status&&we&&!we(Te.status)?je(new pe("Request failed with status code "+Te.status,[pe.ERR_BAD_REQUEST,pe.ERR_BAD_RESPONSE][Math.floor(Te.status/100)-4],Te.config,Te.request,Te)):ie(Te)})(function(ie){l(ie),g()},function(ie){u(ie),g()},{data:A&&A!=="text"&&A!=="json"?v.response:v.responseText,status:v.status,statusText:v.statusText,headers:ee,config:i,request:v}),v=null}}if(v.open(i.method.toUpperCase(),Ya(U,i.params,i.paramsSerializer),!0),v.timeout=i.timeout,"onloadend"in v?v.onloadend=Q:v.onreadystatechange=function(){v&&v.readyState===4&&(v.status!==0||v.responseURL&&v.responseURL.indexOf("file:")===0)&&setTimeout(Q)},v.onabort=function(){v&&(u(new pe("Request aborted",pe.ECONNABORTED,i,v)),v=null)},v.onerror=function(){u(new pe("Network Error",pe.ERR_NETWORK,i,v)),v=null},v.ontimeout=function(){var ee=i.timeout?"timeout of "+i.timeout+"ms exceeded":"timeout exceeded",ie=i.transitional||Qa;i.timeoutErrorMessage&&(ee=i.timeoutErrorMessage),u(new pe(ee,ie.clarifyTimeoutError?pe.ETIMEDOUT:pe.ECONNABORTED,i,v)),v=null},bt.isStandardBrowserEnv){var X=(i.withCredentials||ac(U))&&i.xsrfCookieName&&oc.read(i.xsrfCookieName);X&&p.set(i.xsrfHeaderName,X)}s===void 0&&p.setContentType(null),"setRequestHeader"in v&&R.forEach(p.toJSON(),function(ee,ie){v.setRequestHeader(ie,ee)}),R.isUndefined(i.withCredentials)||(v.withCredentials=!!i.withCredentials),A&&A!=="json"&&(v.responseType=i.responseType),typeof i.onDownloadProgress=="function"&&v.addEventListener("progress",ni(i.onDownloadProgress,!0)),typeof i.onUploadProgress=="function"&&v.upload&&v.upload.addEventListener("progress",ni(i.onUploadProgress)),(i.cancelToken||i.signal)&&(a=function(ee){v&&(u(!ee||ee.type?new wr(null,i,v):ee),v.abort(),v=null)},i.cancelToken&&i.cancelToken.subscribe(a),i.signal&&(i.signal.aborted?a():i.signal.addEventListener("abort",a)));var V,W=(V=/^([-+\w]{1,25})(:?\/\/|:)/.exec(U))&&V[1]||"";W&&bt.protocols.indexOf(W)===-1?u(new pe("Unsupported protocol "+W+":",pe.ERR_BAD_REQUEST,i)):v.send(s||null)})}};R.forEach(vo,function(i,l){if(i){try{Object.defineProperty(i,"name",{value:l})}catch{}Object.defineProperty(i,"adapterName",{value:l})}});function xo(i){if(i.cancelToken&&i.cancelToken.throwIfRequested(),i.signal&&i.signal.aborted)throw new wr(null,i)}function ri(i){return xo(i),i.headers=_t.from(i.headers),i.data=go.call(i,i.transformRequest),["post","put","patch"].indexOf(i.method)!==-1&&i.headers.setContentType("application/x-www-form-urlencoded",!1),function(l){for(var u,a,s=(l=R.isArray(l)?l:[l]).length,p=0;p<s&&(u=l[p],!(a=R.isString(u)?vo[u.toLowerCase()]:u));p++);if(!a)throw a===!1?new pe("Adapter ".concat(u," is not supported by the environment"),"ERR_NOT_SUPPORT"):new Error(R.hasOwnProp(vo,u)?"Adapter '".concat(u,"' is not available in the build"):"Unknown adapter '".concat(u,"'"));if(!R.isFunction(a))throw new TypeError("adapter is not a function");return a}(i.adapter||bo.adapter)(i).then(function(l){return xo(i),l.data=go.call(i,i.transformResponse,l),l.headers=_t.from(l.headers),l},function(l){return Ga(l)||(xo(i),l&&l.response&&(l.response.data=go.call(i,i.transformResponse,l.response),l.response.headers=_t.from(l.response.headers))),Promise.reject(l)})}var oi=function(i){return i instanceof _t?i.toJSON():i};function rn(i,l){l=l||{};var u={};function a(I,_,U){return R.isPlainObject(I)&&R.isPlainObject(_)?R.merge.call({caseless:U},I,_):R.isPlainObject(_)?R.merge({},_):R.isArray(_)?_.slice():_}function s(I,_,U){return R.isUndefined(_)?R.isUndefined(I)?void 0:a(void 0,I,U):a(I,_,U)}function p(I,_){if(!R.isUndefined(_))return a(void 0,_)}function A(I,_){return R.isUndefined(_)?R.isUndefined(I)?void 0:a(void 0,I):a(void 0,_)}function g(I,_,U){return U in l?a(I,_):U in i?a(void 0,I):void 0}var v={url:p,method:p,data:p,baseURL:A,transformRequest:A,transformResponse:A,paramsSerializer:A,timeout:A,timeoutMessage:A,withCredentials:A,adapter:A,responseType:A,xsrfCookieName:A,xsrfHeaderName:A,onUploadProgress:A,onDownloadProgress:A,decompress:A,maxContentLength:A,maxBodyLength:A,beforeRedirect:A,transport:A,httpAgent:A,httpsAgent:A,cancelToken:A,socketPath:A,responseEncoding:A,validateStatus:g,headers:function(I,_){return s(oi(I),oi(_),!0)}};return R.forEach(Object.keys(i).concat(Object.keys(l)),function(I){var _=v[I]||s,U=_(i[I],l[I],I);R.isUndefined(U)&&_!==g||(u[I]=U)}),u}function kr(i){return kr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},kr(i)}var Eo={};["object","boolean","number","function","string","symbol"].forEach(function(i,l){Eo[i]=function(u){return kr(u)===i||"a"+(l<1?"n ":" ")+i}});var ai={};Eo.transitional=function(i,l,u){function a(s,p){return"[Axios v1.2.3] Transitional option '"+s+"'"+p+(u?". "+u:"")}return function(s,p,A){if(i===!1)throw new pe(a(p," has been removed"+(l?" in "+l:"")),pe.ERR_DEPRECATED);return l&&!ai[p]&&(ai[p]=!0,console.warn(a(p," has been deprecated since v"+l+" and will be removed in the near future"))),!i||i(s,p,A)}};const wo={assertOptions:function(i,l,u){if(kr(i)!=="object")throw new pe("options must be an object",pe.ERR_BAD_OPTION_VALUE);for(var a=Object.keys(i),s=a.length;s-- >0;){var p=a[s],A=l[p];if(A){var g=i[p],v=g===void 0||A(g,p,i);if(v!==!0)throw new pe("option "+p+" must be "+v,pe.ERR_BAD_OPTION_VALUE)}else if(u!==!0)throw new pe("Unknown option "+p,pe.ERR_BAD_OPTION)}},validators:Eo};function _n(i){return _n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},_n(i)}function ic(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(_n(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(_n(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),_n(s)==="symbol"?s:String(s)),a)}var s}var Dt=wo.validators,Cr=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.defaults=a,this.interceptors={request:new Ka,response:new Ka}}var l,u;return l=i,(u=[{key:"request",value:function(a,s){typeof a=="string"?(s=s||{}).url=a:s=a||{};var p,A=s=rn(this.defaults,s),g=A.transitional,v=A.paramsSerializer,I=A.headers;g!==void 0&&wo.assertOptions(g,{silentJSONParsing:Dt.transitional(Dt.boolean),forcedJSONParsing:Dt.transitional(Dt.boolean),clarifyTimeoutError:Dt.transitional(Dt.boolean)},!1),v!==void 0&&wo.assertOptions(v,{encode:Dt.function,serialize:Dt.function},!0),s.method=(s.method||this.defaults.method||"get").toLowerCase(),(p=I&&R.merge(I.common,I[s.method]))&&R.forEach(["delete","get","head","post","put","patch","common"],function(we){delete I[we]}),s.headers=_t.concat(p,I);var _=[],U=!0;this.interceptors.request.forEach(function(we){typeof we.runWhen=="function"&&we.runWhen(s)===!1||(U=U&&we.synchronous,_.unshift(we.fulfilled,we.rejected))});var Q,X=[];this.interceptors.response.forEach(function(we){X.push(we.fulfilled,we.rejected)});var V,W=0;if(!U){var ee=[ri.bind(this),void 0];for(ee.unshift.apply(ee,_),ee.push.apply(ee,X),V=ee.length,Q=Promise.resolve(s);W<V;)Q=Q.then(ee[W++],ee[W++]);return Q}V=_.length;var ie=s;for(W=0;W<V;){var je=_[W++],Te=_[W++];try{ie=je(ie)}catch(we){Te.call(this,we);break}}try{Q=ri.call(this,ie)}catch(we){return Promise.reject(we)}for(W=0,V=X.length;W<V;)Q=Q.then(X[W++],X[W++]);return Q}},{key:"getUri",value:function(a){return Ya(ti((a=rn(this.defaults,a)).baseURL,a.url),a.params,a.paramsSerializer)}}])&&ic(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();R.forEach(["delete","get","head","options"],function(i){Cr.prototype[i]=function(l,u){return this.request(rn(u||{},{method:i,url:l,data:(u||{}).data}))}}),R.forEach(["post","put","patch"],function(i){function l(u){return function(a,s,p){return this.request(rn(p||{},{method:i,headers:u?{"Content-Type":"multipart/form-data"}:{},url:a,data:s}))}}Cr.prototype[i]=l(),Cr.prototype[i+"Form"]=l(!0)});const Br=Cr;function On(i){return On=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},On(i)}function ii(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(On(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(On(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),On(s)==="symbol"?s:String(s)),a)}var s}var lc=function(){function i(s){if(function(g,v){if(!(g instanceof v))throw new TypeError("Cannot call a class as a function")}(this,i),typeof s!="function")throw new TypeError("executor must be a function.");var p;this.promise=new Promise(function(g){p=g});var A=this;this.promise.then(function(g){if(A._listeners){for(var v=A._listeners.length;v-- >0;)A._listeners[v](g);A._listeners=null}}),this.promise.then=function(g){var v,I=new Promise(function(_){A.subscribe(_),v=_}).then(g);return I.cancel=function(){A.unsubscribe(v)},I},s(function(g,v,I){A.reason||(A.reason=new wr(g,v,I),p(A.reason))})}var l,u,a;return l=i,u=[{key:"throwIfRequested",value:function(){if(this.reason)throw this.reason}},{key:"subscribe",value:function(s){this.reason?s(this.reason):this._listeners?this._listeners.push(s):this._listeners=[s]}},{key:"unsubscribe",value:function(s){if(this._listeners){var p=this._listeners.indexOf(s);p!==-1&&this._listeners.splice(p,1)}}}],a=[{key:"source",value:function(){var s;return{token:new i(function(p){s=p}),cancel:s}}}],u&&ii(l.prototype,u),a&&ii(l,a),Object.defineProperty(l,"prototype",{writable:!1}),i}();const sc=lc;function li(i,l){(l==null||l>i.length)&&(l=i.length);for(var u=0,a=new Array(l);u<l;u++)a[u]=i[u];return a}var ko={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(ko).forEach(function(i){var l,u,a=(u=2,function(A){if(Array.isArray(A))return A}(l=i)||function(A,g){var v=A==null?null:typeof Symbol<"u"&&A[Symbol.iterator]||A["@@iterator"];if(v!=null){var I,_,U,Q,X=[],V=!0,W=!1;try{if(U=(v=v.call(A)).next,g===0){if(Object(v)!==v)return;V=!1}else for(;!(V=(I=U.call(v)).done)&&(X.push(I.value),X.length!==g);V=!0);}catch(ee){W=!0,_=ee}finally{try{if(!V&&v.return!=null&&(Q=v.return(),Object(Q)!==Q))return}finally{if(W)throw _}}return X}}(l,u)||function(A,g){if(A){if(typeof A=="string")return li(A,g);var v=Object.prototype.toString.call(A).slice(8,-1);return v==="Object"&&A.constructor&&(v=A.constructor.name),v==="Map"||v==="Set"?Array.from(A):v==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(v)?li(A,g):void 0}}(l,u)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()),s=a[0],p=a[1];ko[p]=s});const cc=ko;var Pe=function i(l){var u=new Br(l),a=it(Br.prototype.request,u);return R.extend(a,Br.prototype,u,{allOwnKeys:!0}),R.extend(a,u,null,{allOwnKeys:!0}),a.create=function(s){return i(rn(l,s))},a}(bo);Pe.Axios=Br,Pe.CanceledError=wr,Pe.CancelToken=sc,Pe.isCancel=Ga,Pe.VERSION="1.2.3",Pe.toFormData=gr,Pe.AxiosError=pe,Pe.Cancel=Pe.CanceledError,Pe.all=function(i){return Promise.all(i)},Pe.spread=function(i){return function(l){return i.apply(null,l)}},Pe.isAxiosError=function(i){return R.isObject(i)&&i.isAxiosError===!0},Pe.mergeConfig=rn,Pe.AxiosHeaders=_t,Pe.formToJSON=function(i){return Va(R.isHTMLForm(i)?new FormData(i):i)},Pe.HttpStatusCode=cc,Pe.default=Pe;const si=Pe,dc={send:function(i){si.post(i.url,i.data).then(function(l){var u=l.data;u&&u.code===0?i.success&&i.success(u):i.error&&i.error(u&&u.msg)}).catch(function(l){console.error(l),i.error&&i.error()})},read:function(i){si.get(i.url).then(function(l){var u=l.data;u&&u.code===0?i.success&&i.success(u.data.map(function(a){return{time:a[0],type:a[1],color:a[2],author:a[3],text:a[4]}})):i.error&&i.error(u&&u.msg)}).catch(function(l){console.error(l),i.error&&i.error()})}};function Co(i){return Co=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Co(i)}function pc(i){var l=this;this.lang=i,this.fallbackLang=this.lang.includes("-")?this.lang.split("-")[0]:this.lang,this.tran=function(u){return u=u.toLowerCase(),on[l.lang]&&on[l.lang][u]?on[l.lang][u]:on[l.fallbackLang]&&on[l.fallbackLang][u]?on[l.fallbackLang][u]:Bo[u]?Bo[u]:u}}var Bo={"danmaku-loading":"Danmaku is loading",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Input danmaku, hit Enter","about-author":"About author","dplayer-feedback":"DPlayer feedback","about-dplayer":"About DPlayer",loop:"Loop",speed:"Speed","opacity-danmaku":"Opacity for danmaku",normal:"Normal","please-input-danmaku":"Please input danmaku content!","set-danmaku-color":"Set danmaku color","set-danmaku-type":"Set danmaku type","show-danmaku":"Show danmaku","video-failed":"Video load failed","danmaku-failed":"Danmaku load failed","danmaku-send-failed":"Danmaku send failed","switching-quality":"Switching to %q quality","switched-quality":"Switched to %q quality",ff:"FF %s s",rew:"REW %s s","unlimited-danmaku":"Unlimited danmaku","send-danmaku":"Send danmaku",setting:"Setting",fullscreen:"Full screen","web-fullscreen":"Web full screen",send:"Send",screenshot:"Screenshot",airplay:"AirPlay",chromecast:"ChromeCast",subtitle:"Subtitle",off:"Off","show-subs":"Show subtitle","hide-subs":"Hide subtitle",volume:"Volume",live:"Live","video-info":"Video info"},on={en:Bo,"zh-cn":{"danmaku-loading":"弹幕加载中",top:"顶部",bottom:"底部",rolling:"滚动","input-danmaku-enter":"输入弹幕，回车发送","about-author":"关于作者","dplayer-feedback":"播放器意见反馈","about-dplayer":"关于 DPlayer 播放器",loop:"洗脑循环",speed:"速度","opacity-danmaku":"弹幕透明度",normal:"正常","please-input-danmaku":"要输入弹幕内容啊喂！","set-danmaku-color":"设置弹幕颜色","set-danmaku-type":"设置弹幕类型","show-danmaku":"显示弹幕","video-failed":"视频加载失败","danmaku-failed":"弹幕加载失败","danmaku-send-failed":"弹幕发送失败","switching-quality":"正在切换至 %q 画质","switched-quality":"已经切换至 %q 画质",ff:"快进 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"海量弹幕","send-danmaku":"发送弹幕",setting:"设置",fullscreen:"全屏","web-fullscreen":"页面全屏",send:"发送",screenshot:"截图",airplay:"无线投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"关闭","show-subs":"显示字幕","hide-subs":"隐藏字幕",volume:"音量",live:"直播","video-info":"视频统计信息"},"zh-tw":{"danmaku-loading":"彈幕載入中",top:"頂部",bottom:"底部",rolling:"滾動","input-danmaku-enter":"輸入彈幕，Enter 發送","about-author":"關於作者","dplayer-feedback":"播放器意見回饋","about-dplayer":"關於 DPlayer 播放器",loop:"循環播放",speed:"速度","opacity-danmaku":"彈幕透明度",normal:"正常","please-input-danmaku":"請輸入彈幕內容啊！","set-danmaku-color":"設定彈幕顏色","set-danmaku-type":"設定彈幕類型","show-danmaku":"顯示彈幕","video-failed":"影片載入失敗","danmaku-failed":"彈幕載入失敗","danmaku-send-failed":"彈幕發送失敗","switching-quality":"正在切換至 %q 畫質","switched-quality":"已經切換至 %q 畫質",ff:"快進 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"巨量彈幕","send-danmaku":"發送彈幕",setting:"設定",fullscreen:"全螢幕","web-fullscreen":"頁面全螢幕",send:"發送",screenshot:"截圖",airplay:"無線投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"關閉","show-subs":"顯示字幕","hide-subs":"隱藏字幕",volume:"音量",live:"直播","video-info":"影片統計訊息"},"ko-kr":{"danmaku-loading":"Danmaku를 불러오는 중입니다.",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Danmaku를 입력하고 Enter를 누르세요.","about-author":"만든이","dplayer-feedback":"피드백 보내기","about-dplayer":"DPlayer 정보",loop:"반복",speed:"배속","opacity-danmaku":"Danmaku 불투명도",normal:"표준","please-input-danmaku":"Danmaku를 입력하세요!","set-danmaku-color":"Danmaku 색상","set-danmaku-type":"Danmaku 설정","show-danmaku":"Danmaku 표시","video-failed":"비디오를 불러오지 못했습니다.","danmaku-failed":"Danmaku를 불러오지 못했습니다.","danmaku-send-failed":"Danmaku 전송에 실패했습니다.","Switching to":"","Switched to":"","switching-quality":"전환 %q 화질","switched-quality":"전환 됨 %q 화질",ff:"앞으로 %s 초",rew:"뒤로 %s 초","unlimited-danmaku":"끝없는 Danmaku","send-danmaku":"Danmaku 보내기",setting:"설정",fullscreen:"전체 화면","web-fullscreen":"웹 내 전체화면",send:"보내기",screenshot:"화면 캡쳐",airplay:"에어플레이",chromecast:"ChromeCast",subtitle:"부제",off:"끄다","show-subs":"자막 보이기","hide-subs":"자막 숨기기",Volume:"볼륨",live:"생방송","video-info":"비디오 정보"},de:{"danmaku-loading":"Danmaku lädt...",top:"Oben",bottom:"Unten",rolling:"Rollend","input-danmaku-enter":"Drücke Enter nach dem Einfügen vom Danmaku","about-author":"Über den Autor","dplayer-feedback":"DPlayer Feedback","about-dplayer":"Über DPlayer",loop:"Wiederholen",speed:"Geschwindigkeit","opacity-danmaku":"Transparenz für Danmaku",normal:"Normal","please-input-danmaku":"Bitte Danmaku Inhalt eingeben!","set-danmaku-color":"Danmaku Farbe festlegen","set-danmaku-type":"Danmaku Typ festlegen","show-danmaku":"Zeige Danmaku","video-failed":"Das Video konnte nicht geladen werden","danmaku-failed":"Danmaku konnte nicht geladen werden","danmaku-send-failed":"Das senden von Danmaku ist fehgeschlagen","switching-quality":"Wechsle zur %q Qualität","switched-quality":"Zur %q Qualität gewechselt",ff:"%s s Vorwärts",rew:"%s s Zurück","unlimited-danmaku":"Unlimitiertes Danmaku","send-danmaku":"Sende Danmaku",setting:"Einstellungen",fullscreen:"Vollbild","web-fullscreen":"Browser Vollbild",send:"Senden",screenshot:"Screenshot",airplay:"AirPlay","show-subs":"Zeige Untertitel",chromecast:"ChromeCast",subtitle:"Untertitel",off:"Schließung","hide-subs":"Verstecke Untertitel",volume:"Lautstärke",live:"Live","video-info":"Video Info"}},uc=o(730),fc=o.n(uc),Ac=o(74),yc=o.n(Ac),hc=o(437),mc=o.n(hc),bc=o(644),gc=o.n(bc),vc=o(324),xc=o.n(vc),Ec=o(574),wc=o.n(Ec),kc=o(300),Cc=o.n(kc),Bc=o(934),Sc=o.n(Bc),Ic=o(428),Lc=o.n(Ic),_c=o(807),Oc=o.n(_c),Tc=o(338),Rc=o.n(Tc),Pc=o(254),jc=o.n(Pc),zc=o(965),Mc=o.n(zc),Dc=o(113),qc=o.n(Dc),Fc=o(251),Nc=o.n(Fc),Uc=o(410),Hc=o.n(Uc),Wc=o(182),Yc=o.n(Wc),Kc=o(193),Qc=o.n(Kc);const lt={play:fc(),pause:yc(),volumeUp:mc(),volumeDown:gc(),volumeOff:xc(),full:wc(),fullWeb:Cc(),setting:Sc(),right:Lc(),comment:Oc(),commentOff:Rc(),send:jc(),pallette:Mc(),camera:qc(),subtitle:Hc(),loading:Yc(),airplay:Nc(),chromecast:Qc()};var Vc=o(916),$c=o.n(Vc);function Tn(i){return Tn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Tn(i)}function ci(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Tn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Tn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Tn(s)==="symbol"?s:String(s)),a)}var s}var Zc=function(){function i(s){(function(p,A){if(!(p instanceof A))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=s.container,this.options=s.options,this.index=s.index,this.tran=s.tran,this.init()}var l,u,a;return l=i,a=[{key:"NewNotice",value:function(s,p,A){var g=document.createElement("div");return g.classList.add("dplayer-notice"),g.style.opacity=p,g.innerText=s,A&&(g.id="dplayer-notice-".concat(A)),g}}],(u=[{key:"init",value:function(){this.container.innerHTML=$c()({options:this.options,index:this.index,tran:this.tran,icons:lt,mobile:te.isMobile,video:{current:!0,pic:this.options.video.pic,screenshot:this.options.screenshot,airplay:!(!te.isSafari||te.isChrome)&&this.options.airplay,chromecast:this.options.chromecast,preload:this.options.preload,url:this.options.video.url,subtitle:this.options.subtitle}}),this.volumeBar=this.container.querySelector(".dplayer-volume-bar-inner"),this.volumeBarWrap=this.container.querySelector(".dplayer-volume-bar"),this.volumeBarWrapWrap=this.container.querySelector(".dplayer-volume-bar-wrap"),this.volumeButton=this.container.querySelector(".dplayer-volume"),this.volumeButtonIcon=this.container.querySelector(".dplayer-volume-icon"),this.volumeIcon=this.container.querySelector(".dplayer-volume-icon .dplayer-icon-content"),this.playedBar=this.container.querySelector(".dplayer-played"),this.loadedBar=this.container.querySelector(".dplayer-loaded"),this.playedBarWrap=this.container.querySelector(".dplayer-bar-wrap"),this.playedBarTime=this.container.querySelector(".dplayer-bar-time"),this.danmaku=this.container.querySelector(".dplayer-danmaku"),this.danmakuLoading=this.container.querySelector(".dplayer-danloading"),this.video=this.container.querySelector(".dplayer-video-current"),this.bezel=this.container.querySelector(".dplayer-bezel-icon"),this.playButton=this.container.querySelector(".dplayer-play-icon"),this.mobilePlayButton=this.container.querySelector(".dplayer-mobile-play"),this.videoWrap=this.container.querySelector(".dplayer-video-wrap"),this.controllerMask=this.container.querySelector(".dplayer-controller-mask"),this.ptime=this.container.querySelector(".dplayer-ptime"),this.settingButton=this.container.querySelector(".dplayer-setting-icon"),this.settingBox=this.container.querySelector(".dplayer-setting-box"),this.mask=this.container.querySelector(".dplayer-mask"),this.loop=this.container.querySelector(".dplayer-setting-loop"),this.loopToggle=this.container.querySelector(".dplayer-setting-loop .dplayer-toggle-setting-input"),this.showDanmaku=this.container.querySelector(".dplayer-setting-showdan"),this.showDanmakuToggle=this.container.querySelector(".dplayer-showdan-setting-input"),this.unlimitDanmaku=this.container.querySelector(".dplayer-setting-danunlimit"),this.unlimitDanmakuToggle=this.container.querySelector(".dplayer-danunlimit-setting-input"),this.speed=this.container.querySelector(".dplayer-setting-speed"),this.speedItem=this.container.querySelectorAll(".dplayer-setting-speed-item"),this.danmakuOpacityBar=this.container.querySelector(".dplayer-danmaku-bar-inner"),this.danmakuOpacityBarWrap=this.container.querySelector(".dplayer-danmaku-bar"),this.danmakuOpacityBarWrapWrap=this.container.querySelector(".dplayer-danmaku-bar-wrap"),this.danmakuOpacityBox=this.container.querySelector(".dplayer-setting-danmaku"),this.dtime=this.container.querySelector(".dplayer-dtime"),this.controller=this.container.querySelector(".dplayer-controller"),this.commentInput=this.container.querySelector(".dplayer-comment-input"),this.commentButton=this.container.querySelector(".dplayer-comment-icon"),this.commentSettingBox=this.container.querySelector(".dplayer-comment-setting-box"),this.commentSettingButton=this.container.querySelector(".dplayer-comment-setting-icon"),this.commentSettingFill=this.container.querySelector(".dplayer-comment-setting-icon path"),this.commentSendButton=this.container.querySelector(".dplayer-send-icon"),this.commentSendFill=this.container.querySelector(".dplayer-send-icon path"),this.commentColorSettingBox=this.container.querySelector(".dplayer-comment-setting-color"),this.browserFullButton=this.container.querySelector(".dplayer-full-icon"),this.webFullButton=this.container.querySelector(".dplayer-full-in-icon"),this.menu=this.container.querySelector(".dplayer-menu"),this.menuItem=this.container.querySelectorAll(".dplayer-menu-item"),this.qualityList=this.container.querySelector(".dplayer-quality-list"),this.camareButton=this.container.querySelector(".dplayer-camera-icon"),this.airplayButton=this.container.querySelector(".dplayer-airplay-icon"),this.chromecastButton=this.container.querySelector(".dplayer-chromecast-icon"),this.subtitleButton=this.container.querySelector(".dplayer-subtitle-icon"),this.subtitleButtonInner=this.container.querySelector(".dplayer-subtitle-icon .dplayer-icon-content"),this.subtitlesButton=this.container.querySelector(".dplayer-subtitles-icon"),this.subtitlesBox=this.container.querySelector(".dplayer-subtitles-box"),this.subtitlesItem=this.container.querySelectorAll(".dplayer-subtitles-item"),this.subtitle=this.container.querySelector(".dplayer-subtitle"),this.subtrack=this.container.querySelector(".dplayer-subtrack"),this.qualityButton=this.container.querySelector(".dplayer-quality-icon"),this.barPreview=this.container.querySelector(".dplayer-bar-preview"),this.barWrap=this.container.querySelector(".dplayer-bar-wrap"),this.noticeList=this.container.querySelector(".dplayer-notice-list"),this.infoPanel=this.container.querySelector(".dplayer-info-panel"),this.infoPanelClose=this.container.querySelector(".dplayer-info-panel-close"),this.infoVersion=this.container.querySelector(".dplayer-info-panel-item-version .dplayer-info-panel-item-data"),this.infoFPS=this.container.querySelector(".dplayer-info-panel-item-fps .dplayer-info-panel-item-data"),this.infoType=this.container.querySelector(".dplayer-info-panel-item-type .dplayer-info-panel-item-data"),this.infoUrl=this.container.querySelector(".dplayer-info-panel-item-url .dplayer-info-panel-item-data"),this.infoResolution=this.container.querySelector(".dplayer-info-panel-item-resolution .dplayer-info-panel-item-data"),this.infoDuration=this.container.querySelector(".dplayer-info-panel-item-duration .dplayer-info-panel-item-data"),this.infoDanmakuId=this.container.querySelector(".dplayer-info-panel-item-danmaku-id .dplayer-info-panel-item-data"),this.infoDanmakuApi=this.container.querySelector(".dplayer-info-panel-item-danmaku-api .dplayer-info-panel-item-data"),this.infoDanmakuAmount=this.container.querySelector(".dplayer-info-panel-item-danmaku-amount .dplayer-info-panel-item-data")}}])&&ci(l.prototype,u),a&&ci(l,a),Object.defineProperty(l,"prototype",{writable:!1}),i}();const di=Zc;function an(i){return an=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},an(i)}function Jc(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(an(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(an(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),an(s)==="symbol"?s:String(s)),a)}var s}var Xc=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.options=a,this.player=this.options.player,this.container=this.options.container,this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.dan=[],this.showing=!0,this._opacity=this.options.opacity,this.events=this.options.events,this.unlimited=this.options.unlimited,this._measure(""),this.load()}var l,u;return l=i,u=[{key:"load",value:function(){var a,s=this;a=this.options.api.maximum?"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id,"&max=").concat(this.options.api.maximum):"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id);var p=(this.options.api.addition||[]).slice(0);p.push(a),this.events&&this.events.trigger("danmaku_load_start",p),this._readAllEndpoints(p,function(A){s.dan=[].concat.apply([],A).sort(function(g,v){return g.time-v.time}),window.requestAnimationFrame(function(){s.frame()}),s.options.callback(),s.events&&s.events.trigger("danmaku_load_end")})}},{key:"reload",value:function(a){this.options.api=a,this.dan=[],this.clear(),this.load()}},{key:"_readAllEndpoints",value:function(a,s){for(var p=this,A=[],g=0,v=function(_){p.options.apiBackend.read({url:a[_],success:function(U){A[_]=U,++g===a.length&&s(A)},error:function(U){p.options.error(U||p.options.tran("danmaku-failed")),A[_]=[],++g===a.length&&s(A)}})},I=0;I<a.length;++I)v(I)}},{key:"send",value:function(a,s){var p=this,A={token:this.options.api.token,id:this.options.api.id,author:this.options.api.user,time:this.options.time(),text:a.text,color:a.color,type:a.type};this.options.apiBackend.send({url:this.options.api.address+"v3/",data:A,success:s,error:function(v){p.options.error(v||p.options.tran("danmaku-failed"))}}),this.dan.splice(this.danIndex,0,A),this.danIndex++;var g={text:this.htmlEncode(A.text),color:A.color,type:A.type,border:"2px solid ".concat(this.options.borderColor)};this.draw(g),this.events&&this.events.trigger("danmaku_send",A)}},{key:"frame",value:function(){var a=this;if(this.dan.length&&!this.paused&&this.showing){for(var s=this.dan[this.danIndex],p=[];s&&this.options.time()>parseFloat(s.time);)p.push(s),s=this.dan[++this.danIndex];this.draw(p)}window.requestAnimationFrame(function(){a.frame()})}},{key:"opacity",value:function(a){if(a!==void 0){for(var s=this.container.getElementsByClassName("dplayer-danmaku-item"),p=0;p<s.length;p++)s[p].style.opacity=a;this._opacity=a,this.events&&this.events.trigger("danmaku_opacity",this._opacity)}return this._opacity}},{key:"draw",value:function(a){var s=this;if(this.showing){var p=this.options.height,A=this.container.offsetWidth,g=this.container.offsetHeight,v=parseInt(g/p),I=function(W){var ee=W.offsetWidth||parseInt(W.style.width),ie=W.getBoundingClientRect().right||s.container.getBoundingClientRect().right+ee;return s.container.getBoundingClientRect().right-ie},_=function(W){return(A+W)/5},U=function(W,ee,ie){for(var je=A/_(ie),Te=function($t){var sn=s.danTunnel[ee][$t+""];if(!sn||!sn.length)return s.danTunnel[ee][$t+""]=[W],W.addEventListener("animationend",function(){s.danTunnel[ee][$t+""].splice(0,1)}),{v:$t%v};if(ee!=="right")return"continue";for(var $n=0;$n<sn.length;$n++){var hi=I(sn[$n])-10;if(hi<=A-je*_(parseInt(sn[$n].style.width))||hi<=0)break;if($n===sn.length-1)return s.danTunnel[ee][$t+""].push(W),W.addEventListener("animationend",function(){s.danTunnel[ee][$t+""].splice(0,1)}),{v:$t%v}}},we=0;s.unlimited||we<v;we++){var Ft=Te(we);if(Ft!=="continue"&&an(Ft)==="object")return Ft.v}return-1};Object.prototype.toString.call(a)!=="[object Array]"&&(a=[a]);for(var Q=document.createDocumentFragment(),X=function(){a[V].type=te.number2Type(a[V].type),a[V].color||(a[V].color=16777215);var W=document.createElement("div");W.classList.add("dplayer-danmaku-item"),W.classList.add("dplayer-danmaku-".concat(a[V].type)),a[V].border?W.innerHTML='<span style="border:'.concat(a[V].border,'">').concat(a[V].text,"</span>"):W.innerHTML=a[V].text,W.style.opacity=s._opacity,W.style.color=te.number2Color(a[V].color),W.addEventListener("animationend",function(){s.container.removeChild(W)});var ee,ie=s._measure(a[V].text);switch(a[V].type){case"right":(ee=U(W,a[V].type,ie))>=0&&(W.style.width=ie+1+"px",W.style.top=p*ee+"px",W.style.transform="translateX(-".concat(A,"px)"));break;case"top":(ee=U(W,a[V].type))>=0&&(W.style.top=p*ee+"px");break;case"bottom":(ee=U(W,a[V].type))>=0&&(W.style.bottom=p*ee+"px");break;default:console.error("Can't handled danmaku type: ".concat(a[V].type))}ee>=0&&(W.classList.add("dplayer-danmaku-move"),W.style.animationDuration=s._danAnimation(a[V].type),Q.appendChild(W))},V=0;V<a.length;V++)X();return this.container.appendChild(Q),Q}}},{key:"play",value:function(){this.paused=!1}},{key:"pause",value:function(){this.paused=!0}},{key:"_measure",value:function(a){if(!this.context){var s=getComputedStyle(this.container.getElementsByClassName("dplayer-danmaku-item")[0],null);this.context=document.createElement("canvas").getContext("2d"),this.context.font=s.getPropertyValue("font")}return this.context.measureText(a).width}},{key:"seek",value:function(){this.clear();for(var a=0;a<this.dan.length;a++){if(this.dan[a].time>=this.options.time()){this.danIndex=a;break}this.danIndex=this.dan.length}}},{key:"clear",value:function(){this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.options.container.innerHTML="",this.events&&this.events.trigger("danmaku_clear")}},{key:"htmlEncode",value:function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2f;")}},{key:"resize",value:function(){for(var a=this.container.offsetWidth,s=this.container.getElementsByClassName("dplayer-danmaku-item"),p=0;p<s.length;p++)s[p].style.transform="translateX(-".concat(a,"px)")}},{key:"hide",value:function(){this.showing=!1,this.pause(),this.clear(),this.events&&this.events.trigger("danmaku_hide")}},{key:"show",value:function(){this.seek(),this.showing=!0,this.play(),this.events&&this.events.trigger("danmaku_show")}},{key:"unlimit",value:function(a){this.unlimited=a}},{key:"speed",value:function(a){this.options.api.speedRate=a}},{key:"_danAnimation",value:function(a){var s=this.options.api.speedRate||1,p=!!this.player.fullScreen.isFullScreen();return{top:"".concat((p?6:4)/s,"s"),right:"".concat((p?8:5)/s,"s"),bottom:"".concat((p?6:4)/s,"s")}[a]}}],u&&Jc(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Gc=Xc;function Rn(i){return Rn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Rn(i)}function ed(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Rn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Rn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Rn(s)==="symbol"?s:String(s)),a)}var s}const td=function(){function i(){(function(a,s){if(!(a instanceof s))throw new TypeError("Cannot call a class as a function")})(this,i),this.events={},this.videoEvents=["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","mozaudioavailable","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],this.playerEvents=["screenshot","thumbnails_show","thumbnails_hide","danmaku_show","danmaku_hide","danmaku_clear","danmaku_loaded","danmaku_send","danmaku_opacity","contextmenu_show","contextmenu_hide","notice_show","notice_hide","quality_start","quality_end","destroy","resize","fullscreen","fullscreen_cancel","webfullscreen","webfullscreen_cancel","subtitle_show","subtitle_hide","subtitle_change"]}var l,u;return l=i,(u=[{key:"on",value:function(a,s){this.type(a)&&typeof s=="function"&&(this.events[a]||(this.events[a]=[]),this.events[a].push(s))}},{key:"trigger",value:function(a,s){if(this.events[a]&&this.events[a].length)for(var p=0;p<this.events[a].length;p++)this.events[a][p](s)}},{key:"type",value:function(a){return this.playerEvents.indexOf(a)!==-1?"player":this.videoEvents.indexOf(a)!==-1?"video":(console.error("Unknown event name: ".concat(a)),null)}}])&&ed(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();function Pn(i){return Pn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Pn(i)}function nd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Pn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Pn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Pn(s)==="symbol"?s:String(s)),a)}var s}var rd=function(){function i(a){var s=this;(function(p,A){if(!(p instanceof A))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.lastScrollPosition={left:0,top:0},this.player.events.on("webfullscreen",function(){s.player.resize()}),this.player.events.on("webfullscreen_cancel",function(){s.player.resize(),te.setScrollPosition(s.lastScrollPosition)}),this.fullscreenchange=function(){s.player.resize(),s.isFullScreen("browser")?s.player.events.trigger("fullscreen"):(te.setScrollPosition(s.lastScrollPosition),s.player.events.trigger("fullscreen_cancel"))},this.docfullscreenchange=function(){var p=document.fullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;p&&p!==s.player.container||(s.player.resize(),p?s.player.events.trigger("fullscreen"):(te.setScrollPosition(s.lastScrollPosition),s.player.events.trigger("fullscreen_cancel")))},/Firefox/.test(navigator.userAgent)?(document.addEventListener("mozfullscreenchange",this.docfullscreenchange),document.addEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.addEventListener("fullscreenchange",this.fullscreenchange),this.player.container.addEventListener("webkitfullscreenchange",this.fullscreenchange),document.addEventListener("msfullscreenchange",this.docfullscreenchange),document.addEventListener("MSFullscreenChange",this.docfullscreenchange))}var l,u;return l=i,u=[{key:"isFullScreen",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(a){case"browser":return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;case"web":return this.player.container.classList.contains("dplayer-fulled")}}},{key:"request",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser",s=a==="browser"?"web":"browser",p=this.isFullScreen(s);switch(p||(this.lastScrollPosition=te.getScrollPosition()),a){case"browser":this.player.container.requestFullscreen?this.player.container.requestFullscreen():this.player.container.mozRequestFullScreen?this.player.container.mozRequestFullScreen():this.player.container.webkitRequestFullscreen?this.player.container.webkitRequestFullscreen():this.player.video.webkitEnterFullscreen?this.player.video.webkitEnterFullscreen():this.player.video.webkitEnterFullScreen?this.player.video.webkitEnterFullScreen():this.player.container.msRequestFullscreen&&this.player.container.msRequestFullscreen();break;case"web":this.player.container.classList.add("dplayer-fulled"),document.body.classList.add("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen")}p&&this.cancel(s)}},{key:"cancel",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(a){case"browser":document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.webkitCancelFullscreen?document.webkitCancelFullscreen():document.msCancelFullScreen?document.msCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen();break;case"web":this.player.container.classList.remove("dplayer-fulled"),document.body.classList.remove("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen_cancel")}}},{key:"toggle",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";this.isFullScreen(a)?this.cancel(a):this.request(a)}},{key:"destroy",value:function(){/Firefox/.test(navigator.userAgent)?(document.removeEventListener("mozfullscreenchange",this.docfullscreenchange),document.removeEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.removeEventListener("fullscreenchange",this.fullscreenchange),this.player.container.removeEventListener("webkitfullscreenchange",this.fullscreenchange),document.removeEventListener("msfullscreenchange",this.docfullscreenchange),document.removeEventListener("MSFullscreenChange",this.docfullscreenchange))}}],u&&nd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const od=rd;function jn(i){return jn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},jn(i)}function ad(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(jn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(jn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),jn(s)==="symbol"?s:String(s)),a)}var s}var id=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.storageName={opacity:"dplayer-danmaku-opacity",volume:"dplayer-volume",unlimited:"dplayer-danmaku-unlimited",danmaku:"dplayer-danmaku-show",subtitle:"dplayer-subtitle-show"},this.default={opacity:.7,volume:a.options.hasOwnProperty("volume")?a.options.volume:.7,unlimited:(a.options.danmaku&&a.options.danmaku.unlimited?1:0)||0,danmaku:1,subtitle:1},this.data={},this.init()}var l,u;return l=i,(u=[{key:"init",value:function(){for(var a in this.storageName){var s=this.storageName[a];this.data[a]=parseFloat(te.storage.get(s)||this.default[a])}}},{key:"get",value:function(a){return this.data[a]}},{key:"set",value:function(a,s){this.data[a]=s,te.storage.set(this.storageName[a],s)}}])&&ad(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const ld=id;function zn(i){return zn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},zn(i)}function sd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(zn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(zn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),zn(s)==="symbol"?s:String(s)),a)}var s}var cd=function(){function i(a,s,p,A){(function(g,v){if(!(g instanceof v))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a,this.video=s,this.options=p,this.events=A,this.init()}var l,u;return l=i,u=[{key:"init",value:function(){var a=this;if(this.container.style.fontSize=this.options.fontSize,this.container.style.bottom=this.options.bottom,this.container.style.color=this.options.color,this.video.textTracks&&this.video.textTracks[0]){var s=this.video.textTracks[0];s.oncuechange=function(){var p=s.activeCues[s.activeCues.length-1];if(a.container.innerHTML="",p){var A=document.createElement("div");A.appendChild(p.getCueAsHTML());var g=A.innerHTML.split(/\r?\n/).map(function(v){return"<p>".concat(v,"</p>")}).join("");a.container.innerHTML=g}a.events.trigger("subtitle_change")}}}},{key:"show",value:function(){this.container.classList.remove("dplayer-subtitle-hide"),this.events.trigger("subtitle_show")}},{key:"hide",value:function(){this.container.classList.add("dplayer-subtitle-hide"),this.events.trigger("subtitle_hide")}},{key:"toggle",value:function(){this.container.classList.contains("dplayer-subtitle-hide")?this.show():this.hide()}}],u&&sd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const dd=cd;function Mn(i){return Mn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Mn(i)}function pd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Mn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Mn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Mn(s)==="symbol"?s:String(s)),a)}var s}var ud=function(){function i(a){var s=this;(function(v,I){if(!(v instanceof I))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.player.template.mask.addEventListener("click",function(){s.hide()}),this.player.template.subtitlesButton.addEventListener("click",function(){s.adaptiveHeight(),s.show()});for(var p=this.player.template.subtitlesItem.length-1,A=function(v){s.player.template.subtitlesItem[v].addEventListener("click",function(){s.hide(),s.player.options.subtitle.index!==v&&(s.player.template.subtitle.innerHTML="<p></p>",s.player.template.subtrack.src=s.player.template.subtitlesItem[v].dataset.subtitle,s.player.options.subtitle.index=v,s.player.template.subtitle.classList.contains("dplayer-subtitle-hide")&&s.subContainerShow())})},g=0;g<p;g++)A(g);this.player.template.subtitlesItem[p].addEventListener("click",function(){s.hide(),s.player.options.subtitle.index!==p&&(s.player.template.subtitle.innerHTML="<p></p>",s.player.template.subtrack.src="",s.player.options.subtitle.index=p,s.subContainerHide())})}var l,u;return l=i,(u=[{key:"subContainerShow",value:function(){this.player.template.subtitle.classList.remove("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_show")}},{key:"subContainerHide",value:function(){this.player.template.subtitle.classList.add("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_hide")}},{key:"hide",value:function(){this.player.template.subtitlesBox.classList.remove("dplayer-subtitles-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.subtitlesBox.classList.add("dplayer-subtitles-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}},{key:"adaptiveHeight",value:function(){var a=30*this.player.template.subtitlesItem.length+14,s=.8*this.player.template.videoWrap.offsetHeight;a>=s-50?(this.player.template.subtitlesBox.style.bottom="8px",this.player.template.subtitlesBox.style["max-height"]=s-8+"px"):(this.player.template.subtitlesBox.style.bottom="50px",this.player.template.subtitlesBox.style["max-height"]=s-50+"px")}}])&&pd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const fd=ud;function Dn(i){return Dn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Dn(i)}function Ad(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Dn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Dn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Dn(s)==="symbol"?s:String(s)),a)}var s}var yd=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.elements={},this.elements.volume=a.volumeBar,this.elements.played=a.playedBar,this.elements.loaded=a.loadedBar,this.elements.danmaku=a.danmakuOpacityBar}var l,u;return l=i,(u=[{key:"set",value:function(a,s,p){s=Math.max(s,0),s=Math.min(s,1),this.elements[a].style[p]=100*s+"%"}},{key:"get",value:function(a){return parseFloat(this.elements[a].style.width)/100}}])&&Ad(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const hd=yd;function qn(i){return qn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},qn(i)}function md(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(qn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(qn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),qn(s)==="symbol"?s:String(s)),a)}var s}var bd=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(s){window.setTimeout(s,1e3/60)},this.types=["loading","info","fps"],this.init()}var l,u;return l=i,(u=[{key:"init",value:function(){var a=this;this.types.map(function(s){return s!=="fps"&&a["init".concat(s,"Checker")](),s})}},{key:"initloadingChecker",value:function(){var a=this,s=0,p=0,A=!1;this.loadingChecker=setInterval(function(){a.enableloadingChecker&&(p=a.player.video.currentTime,A||p!==s||a.player.video.paused||(a.player.container.classList.add("dplayer-loading"),A=!0),A&&p>s&&!a.player.video.paused&&(a.player.container.classList.remove("dplayer-loading"),A=!1),s=p)},100)}},{key:"initfpsChecker",value:function(){var a=this;window.requestAnimationFrame(function(){if(a.enablefpsChecker)if(a.initfpsChecker(),a.fpsStart){a.fpsIndex++;var s=new Date;s-a.fpsStart>1e3&&(a.player.infoPanel.fps(a.fpsIndex/(s-a.fpsStart)*1e3),a.fpsStart=new Date,a.fpsIndex=0)}else a.fpsStart=new Date,a.fpsIndex=0;else a.fpsStart=0,a.fpsIndex=0})}},{key:"initinfoChecker",value:function(){var a=this;this.infoChecker=setInterval(function(){a.enableinfoChecker&&a.player.infoPanel.update()},1e3)}},{key:"enable",value:function(a){this["enable".concat(a,"Checker")]=!0,a==="fps"&&this.initfpsChecker()}},{key:"disable",value:function(a){this["enable".concat(a,"Checker")]=!1}},{key:"destroy",value:function(){var a=this;this.types.map(function(s){return a["enable".concat(s,"Checker")]=!1,a["".concat(s,"Checker")]&&clearInterval(a["".concat(s,"Checker")]),s})}}])&&md(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const gd=bd;function Fn(i){return Fn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Fn(i)}function vd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Fn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Fn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Fn(s)==="symbol"?s:String(s)),a)}var s}const xd=function(){function i(a){var s=this;(function(p,A){if(!(p instanceof A))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a,this.container.addEventListener("animationend",function(){s.container.classList.remove("dplayer-bezel-transition")})}var l,u;return l=i,(u=[{key:"switch",value:function(a){this.container.innerHTML=a,this.container.classList.add("dplayer-bezel-transition")}}])&&vd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();function Nn(i){return Nn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Nn(i)}function Ed(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Nn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Nn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Nn(s)==="symbol"?s:String(s)),a)}var s}var wd=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a.container,this.barWidth=a.barWidth,this.container.style.backgroundImage="url('".concat(a.url,"')"),this.events=a.events}var l,u;return l=i,(u=[{key:"resize",value:function(a,s,p){this.container.style.width="".concat(a,"px"),this.container.style.height="".concat(s,"px"),this.container.style.top="".concat(2-s,"px"),this.barWidth=p}},{key:"show",value:function(){this.container.style.display="block",this.events&&this.events.trigger("thumbnails_show")}},{key:"move",value:function(a){this.container.style.backgroundPosition="-".concat(160*(Math.ceil(a/this.barWidth*100)-1),"px 0"),this.container.style.left="".concat(Math.min(Math.max(a-this.container.offsetWidth/2,-10),this.barWidth-150),"px")}},{key:"hide",value:function(){this.container.style.display="none",this.events&&this.events.trigger("thumbnails_hide")}}])&&Ed(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const kd=wd;function Un(i){return Un=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Un(i)}function Cd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Un(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Un(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Un(s)==="symbol"?s:String(s)),a)}var s}var qt,pi=!0,So=!1,Bd=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.autoHideTimer=0,te.isMobile||(this.setAutoHideHandler=this.setAutoHide.bind(this),this.player.container.addEventListener("mousemove",this.setAutoHideHandler),this.player.container.addEventListener("click",this.setAutoHideHandler),this.player.on("play",this.setAutoHideHandler),this.player.on("pause",this.setAutoHideHandler)),this.initPlayButton(),this.initThumbnails(),this.initPlayedBar(),this.initFullButton(),this.initQualityButton(),this.initScreenshotButton(),this.player.options.subtitle&&typeof this.player.options.subtitle.url=="string"&&this.initSubtitleButton(),this.initHighlights(),this.initAirplayButton(),this.initChromecastButton(),te.isMobile||this.initVolumeButton()}var l,u;return l=i,(u=[{key:"initPlayButton",value:function(){var a=this;this.player.template.playButton.addEventListener("click",function(){a.player.toggle()}),this.player.template.mobilePlayButton.addEventListener("click",function(){a.player.toggle()}),te.isMobile?(this.player.template.videoWrap.addEventListener("click",function(){a.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){a.toggle()})):this.player.options.preventClickToggle||(this.player.template.videoWrap.addEventListener("click",function(){a.player.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){a.player.toggle()}))}},{key:"initHighlights",value:function(){var a=this;this.player.on("durationchange",function(){if(a.player.video.duration!==1&&a.player.video.duration!==1/0&&a.player.options.highlight){var s=a.player.template.playedBarWrap.querySelectorAll(".dplayer-highlight");[].slice.call(s,0).forEach(function(g){a.player.template.playedBarWrap.removeChild(g)});for(var p=0;p<a.player.options.highlight.length;p++)if(a.player.options.highlight[p].text&&a.player.options.highlight[p].time){var A=document.createElement("div");A.classList.add("dplayer-highlight"),A.style.left=a.player.options.highlight[p].time/a.player.video.duration*100+"%",A.innerHTML='<span class="dplayer-highlight-text">'+a.player.options.highlight[p].text+"</span>",a.player.template.playedBarWrap.insertBefore(A,a.player.template.playedBarTime)}}})}},{key:"initThumbnails",value:function(){var a=this;this.player.options.video.thumbnails&&(this.thumbnails=new kd({container:this.player.template.barPreview,barWidth:this.player.template.barWrap.offsetWidth,url:this.player.options.video.thumbnails,events:this.player.events}),this.player.on("loadedmetadata",function(){a.thumbnails.resize(160,a.player.video.videoHeight/a.player.video.videoWidth*160,a.player.template.barWrap.offsetWidth)}))}},{key:"initPlayedBar",value:function(){var a=this,s=function(A){var g=((A.clientX||A.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(a.player.template.playedBarWrap))/a.player.template.playedBarWrap.clientWidth;g=Math.max(g,0),g=Math.min(g,1),a.player.bar.set("played",g,"width"),a.player.template.ptime.innerHTML=te.secondToTime(g*a.player.video.duration)},p=function A(g){document.removeEventListener(te.nameMap.dragEnd,A),document.removeEventListener(te.nameMap.dragMove,s);var v=((g.clientX||g.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(a.player.template.playedBarWrap))/a.player.template.playedBarWrap.clientWidth;v=Math.max(v,0),v=Math.min(v,1),a.player.bar.set("played",v,"width"),a.player.seek(a.player.bar.get("played")*a.player.video.duration),a.player.timer.enable("progress")};this.player.template.playedBarWrap.addEventListener(te.nameMap.dragStart,function(){a.player.timer.disable("progress"),document.addEventListener(te.nameMap.dragMove,s),document.addEventListener(te.nameMap.dragEnd,p)}),this.player.template.playedBarWrap.addEventListener(te.nameMap.dragMove,function(A){if(a.player.video.duration){var g=a.player.template.playedBarWrap.getBoundingClientRect().left,v=(A.clientX||A.changedTouches[0].clientX)-g;if(v<0||v>a.player.template.playedBarWrap.offsetWidth)return;var I=a.player.video.duration*(v/a.player.template.playedBarWrap.offsetWidth);te.isMobile&&a.thumbnails&&a.thumbnails.show(),a.thumbnails&&a.thumbnails.move(v),a.player.template.playedBarTime.style.left="".concat(v-(I>=3600?25:20),"px"),a.player.template.playedBarTime.innerText=te.secondToTime(I),a.player.template.playedBarTime.classList.remove("hidden")}}),this.player.template.playedBarWrap.addEventListener(te.nameMap.dragEnd,function(){te.isMobile&&a.thumbnails&&a.thumbnails.hide()}),te.isMobile||(this.player.template.playedBarWrap.addEventListener("mouseenter",function(){a.player.video.duration&&(a.thumbnails&&a.thumbnails.show(),a.player.template.playedBarTime.classList.remove("hidden"))}),this.player.template.playedBarWrap.addEventListener("mouseleave",function(){a.player.video.duration&&(a.thumbnails&&a.thumbnails.hide(),a.player.template.playedBarTime.classList.add("hidden"))}))}},{key:"initFullButton",value:function(){var a=this;this.player.template.browserFullButton.addEventListener("click",function(){a.player.fullScreen.toggle("browser")}),this.player.template.webFullButton.addEventListener("click",function(){a.player.fullScreen.toggle("web")})}},{key:"initVolumeButton",value:function(){var a=this,s=function(A){var g=A||window.event,v=((g.clientX||g.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(a.player.template.volumeBarWrap)-5.5)/35;a.player.volume(v)},p=function A(){document.removeEventListener(te.nameMap.dragEnd,A),document.removeEventListener(te.nameMap.dragMove,s),a.player.template.volumeButton.classList.remove("dplayer-volume-active")};this.player.template.volumeBarWrapWrap.addEventListener("click",function(A){var g=A||window.event,v=((g.clientX||g.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(a.player.template.volumeBarWrap)-5.5)/35;a.player.volume(v)}),this.player.template.volumeBarWrapWrap.addEventListener(te.nameMap.dragStart,function(){document.addEventListener(te.nameMap.dragMove,s),document.addEventListener(te.nameMap.dragEnd,p),a.player.template.volumeButton.classList.add("dplayer-volume-active")}),this.player.template.volumeButtonIcon.addEventListener("click",function(){a.player.video.muted?(a.player.video.muted=!1,a.player.switchVolumeIcon(),a.player.bar.set("volume",a.player.volume(),"width")):(a.player.video.muted=!0,a.player.template.volumeIcon.innerHTML=lt.volumeOff,a.player.bar.set("volume",0,"width"))})}},{key:"initQualityButton",value:function(){var a=this;this.player.options.video.quality&&this.player.template.qualityList.addEventListener("click",function(s){s.target.classList.contains("dplayer-quality-item")&&a.player.switchQuality(s.target.dataset.index)})}},{key:"initScreenshotButton",value:function(){var a=this;this.player.options.screenshot&&this.player.template.camareButton.addEventListener("click",function(){var s,p=document.createElement("canvas");p.width=a.player.video.videoWidth,p.height=a.player.video.videoHeight,p.getContext("2d").drawImage(a.player.video,0,0,p.width,p.height),p.toBlob(function(A){s=URL.createObjectURL(A);var g=document.createElement("a");g.href=s,g.download="DPlayer.png",g.style.display="none",document.body.appendChild(g),g.click(),document.body.removeChild(g),URL.revokeObjectURL(s),a.player.events.trigger("screenshot",s)})})}},{key:"initAirplayButton",value:function(){this.player.options.airplay&&(window.WebKitPlaybackTargetAvailabilityEvent?this.player.video.addEventListener("webkitplaybacktargetavailabilitychanged",function(a){a.availability==="available"?this.template.airplayButton.disable=!1:this.template.airplayButton.disable=!0,this.template.airplayButton.addEventListener("click",function(){this.video.webkitShowPlaybackTargetPicker()}.bind(this))}.bind(this.player)):this.player.template.airplayButton.style.display="none")}},{key:"initChromecast",value:function(){var a=window.document.createElement("script");a.setAttribute("type","text/javascript"),a.setAttribute("src","https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"),window.document.body.appendChild(a),window.__onGCastApiAvailable=function(s){if(s){var p=new(qt=window.chrome.cast).SessionRequest(qt.media.DEFAULT_MEDIA_RECEIVER_APP_ID),A=new qt.ApiConfig(p,function(){},function(g){g===qt.ReceiverAvailability.AVAILABLE&&console.log("chromecast: ",g)});qt.initialize(A,function(){})}}}},{key:"initChromecastButton",value:function(){var a=this;if(this.player.options.chromecast){pi&&(pi=!1,this.initChromecast());var s=function(A,g){a.currentMedia=g},p=function(A){console.error("Error launching media",A)};this.player.template.chromecastButton.addEventListener("click",function(){So?(So=!1,a.currentMedia.stop(),a.session.stop(),a.initChromecast()):(So=!0,qt.requestSession(function(A){var g,v,I;a.session=A,g=a.player.options.video.url,v=new qt.media.MediaInfo(g),I=new qt.media.LoadRequest(v),a.session?a.session.loadMedia(I,s.bind(a,"loadMedia"),p).play():window.open(g)},function(A){A.code==="cancel"?a.session=void 0:console.error("Error selecting a cast device",A)}))})}}},{key:"initSubtitleButton",value:function(){var a=this;this.player.events.on("subtitle_show",function(){a.player.template.subtitleButton.dataset.balloon=a.player.tran("hide-subs"),a.player.template.subtitleButtonInner.style.opacity="",a.player.user.set("subtitle",1)}),this.player.events.on("subtitle_hide",function(){a.player.template.subtitleButton.dataset.balloon=a.player.tran("show-subs"),a.player.template.subtitleButtonInner.style.opacity="0.4",a.player.user.set("subtitle",0)}),this.player.template.subtitleButton.addEventListener("click",function(){a.player.subtitle.toggle()})}},{key:"setAutoHide",value:function(){var a=this;this.show(),clearTimeout(this.autoHideTimer),this.autoHideTimer=setTimeout(function(){!a.player.video.played.length||a.player.paused||a.disableAutoHide||a.hide()},3e3)}},{key:"show",value:function(){this.player.container.classList.remove("dplayer-hide-controller")}},{key:"hide",value:function(){this.player.container.classList.add("dplayer-hide-controller"),this.player.setting.hide(),this.player.comment&&this.player.comment.hide()}},{key:"isShow",value:function(){return!this.player.container.classList.contains("dplayer-hide-controller")}},{key:"toggle",value:function(){this.isShow()?this.hide():this.show()}},{key:"destroy",value:function(){te.isMobile||(this.player.container.removeEventListener("mousemove",this.setAutoHideHandler),this.player.container.removeEventListener("click",this.setAutoHideHandler)),clearTimeout(this.autoHideTimer)}}])&&Cd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Sd=Bd;function Hn(i){return Hn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Hn(i)}function Id(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Hn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Hn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Hn(s)==="symbol"?s:String(s)),a)}var s}var Ld=function(){function i(a){var s=this;(function(I,_){if(!(I instanceof _))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.player.template.mask.addEventListener("click",function(){s.hide()}),this.player.template.settingButton.addEventListener("click",function(){s.show()}),this.loop=this.player.options.loop,this.player.template.loopToggle.checked=this.loop,this.player.template.loop.addEventListener("click",function(){s.player.template.loopToggle.checked=!s.player.template.loopToggle.checked,s.player.template.loopToggle.checked?s.loop=!0:s.loop=!1,s.hide()}),this.showDanmaku=this.player.user.get("danmaku"),this.showDanmaku||this.player.danmaku&&this.player.danmaku.hide(),this.player.template.showDanmakuToggle.checked=this.showDanmaku,this.player.template.showDanmaku.addEventListener("click",function(){s.player.template.showDanmakuToggle.checked=!s.player.template.showDanmakuToggle.checked,s.player.template.showDanmakuToggle.checked?(s.showDanmaku=!0,s.player.danmaku.show()):(s.showDanmaku=!1,s.player.danmaku.hide()),s.player.user.set("danmaku",s.showDanmaku?1:0),s.hide()}),this.unlimitDanmaku=this.player.user.get("unlimited"),this.player.template.unlimitDanmakuToggle.checked=this.unlimitDanmaku,this.player.template.unlimitDanmaku.addEventListener("click",function(){s.player.template.unlimitDanmakuToggle.checked=!s.player.template.unlimitDanmakuToggle.checked,s.player.template.unlimitDanmakuToggle.checked?(s.unlimitDanmaku=!0,s.player.danmaku.unlimit(!0)):(s.unlimitDanmaku=!1,s.player.danmaku.unlimit(!1)),s.player.user.set("unlimited",s.unlimitDanmaku?1:0),s.hide()}),this.player.template.speed.addEventListener("click",function(){s.player.template.settingBox.classList.add("dplayer-setting-box-narrow"),s.player.template.settingBox.classList.add("dplayer-setting-box-speed")});for(var p=function(I){s.player.template.speedItem[I].addEventListener("click",function(){s.player.speed(s.player.template.speedItem[I].dataset.speed),s.hide()})},A=0;A<this.player.template.speedItem.length;A++)p(A);if(this.player.danmaku){this.player.on("danmaku_opacity",function(I){s.player.bar.set("danmaku",I,"width"),s.player.user.set("opacity",I)}),this.player.danmaku.opacity(this.player.user.get("opacity"));var g=function(I){var _=I||window.event,U=((_.clientX||_.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(s.player.template.danmakuOpacityBarWrap))/130;U=Math.max(U,0),U=Math.min(U,1),s.player.danmaku.opacity(U)},v=function I(){document.removeEventListener(te.nameMap.dragEnd,I),document.removeEventListener(te.nameMap.dragMove,g),s.player.template.danmakuOpacityBox.classList.remove("dplayer-setting-danmaku-active")};this.player.template.danmakuOpacityBarWrapWrap.addEventListener("click",function(I){var _=I||window.event,U=((_.clientX||_.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(s.player.template.danmakuOpacityBarWrap))/130;U=Math.max(U,0),U=Math.min(U,1),s.player.danmaku.opacity(U)}),this.player.template.danmakuOpacityBarWrapWrap.addEventListener(te.nameMap.dragStart,function(){document.addEventListener(te.nameMap.dragMove,g),document.addEventListener(te.nameMap.dragEnd,v),s.player.template.danmakuOpacityBox.classList.add("dplayer-setting-danmaku-active")})}}var l,u;return l=i,(u=[{key:"hide",value:function(){var a=this;this.player.template.settingBox.classList.remove("dplayer-setting-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),setTimeout(function(){a.player.template.settingBox.classList.remove("dplayer-setting-box-narrow"),a.player.template.settingBox.classList.remove("dplayer-setting-box-speed")},300),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.settingBox.classList.add("dplayer-setting-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}}])&&Id(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const _d=Ld;function Wn(i){return Wn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Wn(i)}function Od(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Wn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Wn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Wn(s)==="symbol"?s:String(s)),a)}var s}var Td=function(){function i(a){var s=this;(function(p,A){if(!(p instanceof A))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.player.template.mask.addEventListener("click",function(){s.hide()}),this.player.template.commentButton.addEventListener("click",function(){s.show()}),this.player.template.commentSettingButton.addEventListener("click",function(){s.toggleSetting()}),this.player.template.commentColorSettingBox.addEventListener("click",function(){if(s.player.template.commentColorSettingBox.querySelector("input:checked+span")){var p=s.player.template.commentColorSettingBox.querySelector("input:checked").value;s.player.template.commentSettingFill.style.fill=p,s.player.template.commentInput.style.color=p,s.player.template.commentSendFill.style.fill=p}}),this.player.template.commentInput.addEventListener("click",function(){s.hideSetting()}),this.player.template.commentInput.addEventListener("keydown",function(p){(p||window.event).keyCode===13&&s.send()}),this.player.template.commentSendButton.addEventListener("click",function(){s.send()})}var l,u;return l=i,(u=[{key:"show",value:function(){this.player.controller.disableAutoHide=!0,this.player.template.controller.classList.add("dplayer-controller-comment"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.container.classList.add("dplayer-show-controller"),this.player.template.commentInput.focus()}},{key:"hide",value:function(){this.player.template.controller.classList.remove("dplayer-controller-comment"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.container.classList.remove("dplayer-show-controller"),this.player.controller.disableAutoHide=!1,this.hideSetting()}},{key:"showSetting",value:function(){this.player.template.commentSettingBox.classList.add("dplayer-comment-setting-open")}},{key:"hideSetting",value:function(){this.player.template.commentSettingBox.classList.remove("dplayer-comment-setting-open")}},{key:"toggleSetting",value:function(){this.player.template.commentSettingBox.classList.contains("dplayer-comment-setting-open")?this.hideSetting():this.showSetting()}},{key:"send",value:function(){var a=this;this.player.template.commentInput.blur(),this.player.template.commentInput.value.replace(/^\s+|\s+$/g,"")?this.player.danmaku.send({text:this.player.template.commentInput.value,color:te.color2Number(this.player.container.querySelector(".dplayer-comment-setting-color input:checked").value),type:parseInt(this.player.container.querySelector(".dplayer-comment-setting-type input:checked").value)},function(){a.player.template.commentInput.value="",a.hide()}):this.player.notice(this.player.tran("please-input-danmaku"))}}])&&Od(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Rd=Td;function Yn(i){return Yn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Yn(i)}function Pd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Yn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Yn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Yn(s)==="symbol"?s:String(s)),a)}var s}var jd=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.doHotKeyHandler=this.doHotKey.bind(this),this.cancelFullScreenHandler=this.cancelFullScreen.bind(this),this.player.options.hotkey&&document.addEventListener("keydown",this.doHotKeyHandler),document.addEventListener("keydown",this.cancelFullScreenHandler)}var l,u;return l=i,(u=[{key:"doHotKey",value:function(a){if(this.player.focus){var s=document.activeElement.tagName.toUpperCase(),p=document.activeElement.getAttribute("contenteditable");if(s!=="INPUT"&&s!=="TEXTAREA"&&p!==""&&p!=="true"){var A,g=a||window.event;switch(g.keyCode){case 32:g.preventDefault(),this.player.toggle();break;case 37:if(g.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime-5),this.player.controller.setAutoHide();break;case 39:if(g.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime+5),this.player.controller.setAutoHide();break;case 38:g.preventDefault(),A=this.player.volume()+.1,this.player.volume(A);break;case 40:g.preventDefault(),A=this.player.volume()-.1,this.player.volume(A)}}}}},{key:"cancelFullScreen",value:function(a){(a||window.event).keyCode===27&&this.player.fullScreen.isFullScreen("web")&&this.player.fullScreen.cancel("web")}},{key:"destroy",value:function(){this.player.options.hotkey&&document.removeEventListener("keydown",this.doHotKeyHandler),document.removeEventListener("keydown",this.cancelFullScreenHandler)}}])&&Pd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const zd=jd;function Kn(i){return Kn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Kn(i)}function Md(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Kn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Kn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Kn(s)==="symbol"?s:String(s)),a)}var s}var Dd=function(){function i(a){var s=this;(function(p,A){if(!(p instanceof A))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.shown=!1,Array.prototype.slice.call(this.player.template.menuItem).forEach(function(p,A){s.player.options.contextmenu[A].click&&p.addEventListener("click",function(){s.player.options.contextmenu[A].click(s.player),s.hide()})}),this.contextmenuHandler=function(p){if(s.shown)s.hide();else{var A=p||window.event;A.preventDefault();var g=s.player.container.getBoundingClientRect();s.show(A.clientX-g.left,A.clientY-g.top),s.player.template.mask.addEventListener("click",function(){s.hide()})}},this.player.container.addEventListener("contextmenu",this.contextmenuHandler)}var l,u;return l=i,(u=[{key:"show",value:function(a,s){this.player.template.menu.classList.add("dplayer-menu-show");var p=this.player.container.getBoundingClientRect();a+this.player.template.menu.offsetWidth>=p.width?(this.player.template.menu.style.right=p.width-a+"px",this.player.template.menu.style.left="initial"):(this.player.template.menu.style.left=a+"px",this.player.template.menu.style.right="initial"),s+this.player.template.menu.offsetHeight>=p.height?(this.player.template.menu.style.bottom=p.height-s+"px",this.player.template.menu.style.top="initial"):(this.player.template.menu.style.top=s+"px",this.player.template.menu.style.bottom="initial"),this.player.template.mask.classList.add("dplayer-mask-show"),this.shown=!0,this.player.events.trigger("contextmenu_show")}},{key:"hide",value:function(){this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.template.menu.classList.remove("dplayer-menu-show"),this.shown=!1,this.player.events.trigger("contextmenu_hide")}},{key:"destroy",value:function(){this.player.container.removeEventListener("contextmenu",this.contextmenuHandler)}}])&&Md(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const qd=Dd;function Qn(i){return Qn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Qn(i)}function Fd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Qn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Qn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Qn(s)==="symbol"?s:String(s)),a)}var s}var Nd=function(){function i(a){var s=this;(function(p,A){if(!(p instanceof A))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a.template.infoPanel,this.template=a.template,this.video=a.video,this.player=a,this.template.infoPanelClose.addEventListener("click",function(){s.hide()})}var l,u;return l=i,(u=[{key:"show",value:function(){this.beginTime=Date.now(),this.update(),this.player.timer.enable("info"),this.player.timer.enable("fps"),this.container.classList.remove("dplayer-info-panel-hide")}},{key:"hide",value:function(){this.player.timer.disable("info"),this.player.timer.disable("fps"),this.container.classList.add("dplayer-info-panel-hide")}},{key:"triggle",value:function(){this.container.classList.contains("dplayer-info-panel-hide")?this.show():this.hide()}},{key:"update",value:function(){this.template.infoVersion.innerHTML="v".concat("1.27.1"," ").concat("v1.27.0-12-g4f61091"),this.template.infoType.innerHTML=this.player.type,this.template.infoUrl.innerHTML=this.player.options.video.url,this.template.infoResolution.innerHTML="".concat(this.player.video.videoWidth," x ").concat(this.player.video.videoHeight),this.template.infoDuration.innerHTML=this.player.video.duration,this.player.options.danmaku&&(this.template.infoDanmakuId.innerHTML=this.player.options.danmaku.id,this.template.infoDanmakuApi.innerHTML=this.player.options.danmaku.api,this.template.infoDanmakuAmount.innerHTML=this.player.danmaku.dan.length)}},{key:"fps",value:function(a){this.template.infoFPS.innerHTML="".concat(a.toFixed(1))}}])&&Fd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Ud=Nd;var Hd=o(568),Wd=o.n(Hd);function Vn(i){return Vn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Vn(i)}function ui(i,l){var u=Object.keys(i);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(i);l&&(a=a.filter(function(s){return Object.getOwnPropertyDescriptor(i,s).enumerable})),u.push.apply(u,a)}return u}function Yd(i,l,u){return(l=Ai(l))in i?Object.defineProperty(i,l,{value:u,enumerable:!0,configurable:!0,writable:!0}):i[l]=u,i}function fi(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,Ai(a.key),a)}}function Ai(i){var l=function(u,a){if(Vn(u)!=="object"||u===null)return u;var s=u[Symbol.toPrimitive];if(s!==void 0){var p=s.call(u,"string");if(Vn(p)!=="object")return p;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i);return Vn(l)==="symbol"?l:String(l)}var yi=0,ln=[],Kd=function(){function i(s){var p=this;(function(A,g){if(!(A instanceof g))throw new TypeError("Cannot call a class as a function")})(this,i),this.options=function(A){var g={container:A.element||document.getElementsByClassName("dplayer")[0],live:!1,autoplay:!1,theme:"#b7daff",loop:!1,lang:(navigator.language||navigator.browserLanguage).toLowerCase(),screenshot:!1,airplay:!0,chromecast:!1,hotkey:!0,preload:"metadata",volume:.7,playbackSpeed:[.5,.75,1,1.25,1.5,2],apiBackend:dc,video:{},contextmenu:[],mutex:!0,pluginOptions:{hls:{},flv:{},dash:{},webtorrent:{}},preventClickToggle:!1};for(var v in g)g.hasOwnProperty(v)&&!A.hasOwnProperty(v)&&(A[v]=g[v]);return A.video&&!A.video.type&&(A.video.type="auto"),Co(A.danmaku)==="object"&&A.danmaku&&!A.danmaku.user&&(A.danmaku.user="DIYgod"),A.subtitle&&(!A.subtitle.type&&(A.subtitle.type="webvtt"),!A.subtitle.fontSize&&(A.subtitle.fontSize="20px"),!A.subtitle.bottom&&(A.subtitle.bottom="40px"),!A.subtitle.color&&(A.subtitle.color="#fff")),A.video.quality&&(A.video.url=A.video.quality[A.video.defaultQuality].url),A.lang&&(A.lang=A.lang.toLowerCase()),A.contextmenu=A.contextmenu.concat([{key:"video-info",click:function(I){I.infoPanel.triggle()}},{key:"about-author",link:"https://diygod.me"},{text:"DPlayer v".concat("1.27.1"),link:"https://github.com/MoePlayer/DPlayer"}]),A}(function(A){for(var g=1;g<arguments.length;g++){var v=arguments[g]!=null?arguments[g]:{};g%2?ui(Object(v),!0).forEach(function(I){Yd(A,I,v[I])}):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(v)):ui(Object(v)).forEach(function(I){Object.defineProperty(A,I,Object.getOwnPropertyDescriptor(v,I))})}return A}({preload:s.video.type==="webtorrent"?"none":"metadata"},s)),this.options.video.quality&&(this.qualityIndex=this.options.video.defaultQuality,this.quality=this.options.video.quality[this.options.video.defaultQuality]),this.tran=new pc(this.options.lang).tran,this.events=new td,this.user=new ld(this),this.container=this.options.container,this.noticeList={},this.container.classList.add("dplayer"),this.options.danmaku||this.container.classList.add("dplayer-no-danmaku"),this.options.live?this.container.classList.add("dplayer-live"):this.container.classList.remove("dplayer-live"),te.isMobile&&this.container.classList.add("dplayer-mobile"),this.arrow=this.container.offsetWidth<=500,this.arrow&&this.container.classList.add("dplayer-arrow"),this.options.subtitle&&Array.isArray(this.options.subtitle.url)&&(this.options.subtitle.url.push({subtitle:"",lang:"off"}),this.options.subtitle.defaultSubtitle&&(typeof this.options.subtitle.defaultSubtitle=="string"?this.options.subtitle.index=this.options.subtitle.url.findIndex(function(A){return A.lang===p.options.subtitle.defaultSubtitle||A.name===p.options.subtitle.defaultSubtitle}):typeof this.options.subtitle.defaultSubtitle=="number"&&(this.options.subtitle.index=this.options.subtitle.defaultSubtitle)),(this.options.subtitle.index===-1||!this.options.subtitle.index||this.options.subtitle.index>this.options.subtitle.url.length-1)&&(this.options.subtitle.index=this.options.subtitle.url.findIndex(function(A){return A.lang===p.options.lang})),this.options.subtitle.index===-1&&(this.options.subtitle.index=this.options.subtitle.url.length-1)),this.template=new di({container:this.container,options:this.options,index:yi,tran:this.tran}),this.video=this.template.video,this.bar=new hd(this.template),this.bezel=new xd(this.template.bezel),this.fullScreen=new od(this),this.controller=new Sd(this),this.options.danmaku&&(this.danmaku=new Gc({player:this,container:this.template.danmaku,opacity:this.user.get("opacity"),callback:function(){setTimeout(function(){p.template.danmakuLoading.style.display="none",p.options.autoplay&&p.play()},0)},error:function(A){p.notice(A)},apiBackend:this.options.apiBackend,borderColor:this.options.theme,height:this.arrow?24:30,time:function(){return p.video.currentTime},unlimited:this.user.get("unlimited"),api:{id:this.options.danmaku.id,address:this.options.danmaku.api,token:this.options.danmaku.token,maximum:this.options.danmaku.maximum,addition:this.options.danmaku.addition,user:this.options.danmaku.user,speedRate:this.options.danmaku.speedRate},events:this.events,tran:function(A){return p.tran(A)}}),this.comment=new Rd(this)),this.setting=new _d(this),this.plugins={},this.docClickFun=function(){p.focus=!1},this.containerClickFun=function(){p.focus=!0},document.addEventListener("click",this.docClickFun,!0),this.container.addEventListener("click",this.containerClickFun,!0),this.paused=!0,this.timer=new gd(this),this.hotkey=new zd(this),this.contextmenu=new qd(this),this.initVideo(this.video,this.quality&&this.quality.type||this.options.video.type),this.infoPanel=new Ud(this),!this.danmaku&&this.options.autoplay&&this.play(),yi++,ln.push(this)}var l,u,a;return l=i,u=[{key:"seek",value:function(s){s=Math.max(s,0),this.video.duration&&(s=Math.min(s,this.video.duration)),this.video.currentTime<s?this.notice("".concat(this.tran("ff").replace("%s",(s-this.video.currentTime).toFixed(0)))):this.video.currentTime>s&&this.notice("".concat(this.tran("rew").replace("%s",(this.video.currentTime-s).toFixed(0)))),this.video.currentTime=s,this.danmaku&&this.danmaku.seek(),this.bar.set("played",s/this.video.duration,"width"),this.template.ptime.innerHTML=te.secondToTime(s)}},{key:"play",value:function(s){var p=this;if(this.paused=!1,this.video.paused&&!te.isMobile&&this.bezel.switch(lt.play),this.template.playButton.innerHTML=lt.pause,this.template.mobilePlayButton.innerHTML=lt.pause,s||ve.resolve(this.video.play()).catch(function(){p.pause()}).then(function(){}),this.timer.enable("loading"),this.container.classList.remove("dplayer-paused"),this.container.classList.add("dplayer-playing"),this.danmaku&&this.danmaku.play(),this.options.mutex)for(var A=0;A<ln.length;A++)this!==ln[A]&&ln[A].pause()}},{key:"pause",value:function(s){this.paused=!0,this.container.classList.remove("dplayer-loading"),this.video.paused||te.isMobile||this.bezel.switch(lt.pause),this.template.playButton.innerHTML=lt.play,this.template.mobilePlayButton.innerHTML=lt.play,s||this.video.pause(),this.timer.disable("loading"),this.container.classList.remove("dplayer-playing"),this.container.classList.add("dplayer-paused"),this.danmaku&&this.danmaku.pause()}},{key:"switchVolumeIcon",value:function(){this.volume()>=.95?this.template.volumeIcon.innerHTML=lt.volumeUp:this.volume()>0?this.template.volumeIcon.innerHTML=lt.volumeDown:this.template.volumeIcon.innerHTML=lt.volumeOff}},{key:"volume",value:function(s,p,A){if(s=parseFloat(s),!isNaN(s)){s=Math.max(s,0),s=Math.min(s,1),this.bar.set("volume",s,"width");var g="".concat((100*s).toFixed(0),"%");this.template.volumeBarWrapWrap.dataset.balloon=g,p||this.user.set("volume",s),A||this.notice("".concat(this.tran("volume")," ").concat((100*s).toFixed(0),"%"),void 0,void 0,"volume"),this.video.volume=s,this.video.muted&&(this.video.muted=!1),this.switchVolumeIcon()}return this.video.volume}},{key:"toggle",value:function(){this.video.paused?this.play():this.pause()}},{key:"on",value:function(s,p){this.events.on(s,p)}},{key:"switchVideo",value:function(s,p){this.pause(),this.video.poster=s.pic?s.pic:"",this.video.src=s.url,this.initMSE(this.video,s.type||"auto"),p&&(this.template.danmakuLoading.style.display="block",this.bar.set("played",0,"width"),this.bar.set("loaded",0,"width"),this.template.ptime.innerHTML="00:00",this.template.danmaku.innerHTML="",this.danmaku&&this.danmaku.reload({id:p.id,address:p.api,token:p.token,maximum:p.maximum,addition:p.addition,user:p.user}))}},{key:"initMSE",value:function(s,p){var A=this;if(this.type=p,this.options.video.customType&&this.options.video.customType[p])Object.prototype.toString.call(this.options.video.customType[p])==="[object Function]"?this.options.video.customType[p](this.video,this):console.error("Illegal customType: ".concat(p));else switch(this.type==="auto"&&(/m3u8(#|\?|$)/i.exec(s.src)?this.type="hls":/.flv(#|\?|$)/i.exec(s.src)?this.type="flv":/.mpd(#|\?|$)/i.exec(s.src)?this.type="dash":this.type="normal"),this.type==="hls"&&(s.canPlayType("application/x-mpegURL")||s.canPlayType("application/vnd.apple.mpegURL"))&&(this.type="normal"),this.type){case"hls":if(window.Hls)if(window.Hls.isSupported()){var g=this.options.pluginOptions.hls,v=new window.Hls(g);this.plugins.hls=v,v.loadSource(s.src),v.attachMedia(s),this.events.on("destroy",function(){v.destroy(),delete A.plugins.hls})}else this.notice("Error: Hls is not supported.");else this.notice("Error: Can't find Hls.");break;case"flv":if(window.flvjs)if(window.flvjs.isSupported()){var I=window.flvjs.createPlayer(Object.assign(this.options.pluginOptions.flv.mediaDataSource||{},{type:"flv",url:s.src}),this.options.pluginOptions.flv.config);this.plugins.flvjs=I,I.attachMediaElement(s),I.load(),this.events.on("destroy",function(){I.unload(),I.detachMediaElement(),I.destroy(),delete A.plugins.flvjs})}else this.notice("Error: flvjs is not supported.");else this.notice("Error: Can't find flvjs.");break;case"dash":if(window.dashjs){var _=window.dashjs.MediaPlayer().create().initialize(s,s.src,!1),U=this.options.pluginOptions.dash;_.updateSettings(U),this.plugins.dash=_,this.events.on("destroy",function(){window.dashjs.MediaPlayer().reset(),delete A.plugins.dash})}else this.notice("Error: Can't find dashjs.");break;case"webtorrent":if(window.WebTorrent)if(window.WebTorrent.WEBRTC_SUPPORT){this.container.classList.add("dplayer-loading");var Q=this.options.pluginOptions.webtorrent,X=new window.WebTorrent(Q);this.plugins.webtorrent=X;var V=s.src;s.src="",s.preload="metadata",s.addEventListener("durationchange",function(){return A.container.classList.remove("dplayer-loading")},{once:!0}),X.add(V,function(W){W.files.find(function(ee){return ee.name.endsWith(".mp4")}).renderTo(A.video,{autoplay:A.options.autoplay,controls:!1})}),this.events.on("destroy",function(){X.remove(V),X.destroy(),delete A.plugins.webtorrent})}else this.notice("Error: Webtorrent is not supported.");else this.notice("Error: Can't find Webtorrent.")}}},{key:"initVideo",value:function(s,p){var A=this;this.initMSE(s,p),this.on("durationchange",function(){s.duration!==1&&s.duration!==1/0&&(A.template.dtime.innerHTML=te.secondToTime(s.duration))}),this.on("progress",function(){var I=s.buffered.length?s.buffered.end(s.buffered.length-1)/s.duration:0;A.bar.set("loaded",I,"width")}),this.on("error",function(){A.video.error&&A.tran&&A.notice&&A.type!=="webtorrent"&&A.notice(A.tran("video-failed"))}),this.on("ended",function(){A.bar.set("played",1,"width"),A.setting.loop?(A.seek(0),A.play()):A.pause(),A.danmaku&&(A.danmaku.danIndex=0)}),this.on("play",function(){A.paused&&A.play(!0)}),this.on("pause",function(){A.paused||A.pause(!0)}),this.on("timeupdate",function(){A.bar.set("played",A.video.currentTime/A.video.duration,"width");var I=te.secondToTime(A.video.currentTime);A.template.ptime.innerHTML!==I&&(A.template.ptime.innerHTML=I)});for(var g=function(I){s.addEventListener(A.events.videoEvents[I],function(_){A.events.trigger(A.events.videoEvents[I],_)})},v=0;v<this.events.videoEvents.length;v++)g(v);this.volume(this.user.get("volume"),!0,!0),this.options.subtitle&&(this.subtitle=new dd(this.template.subtitle,this.video,this.options.subtitle,this.events),Array.isArray(this.options.subtitle.url)&&(this.subtitles=new fd(this)),this.user.get("subtitle")||this.subtitle.hide())}},{key:"switchQuality",value:function(s){var p=this;if(s=typeof s=="string"?parseInt(s):s,this.qualityIndex!==s&&!this.switchingQuality){this.prevIndex=this.qualityIndex,this.qualityIndex=s,this.switchingQuality=!0,this.quality=this.options.video.quality[s],this.template.qualityButton.innerHTML=this.quality.name;var A=this.video.paused;this.video.pause();var g=Wd()({current:!1,pic:null,screenshot:this.options.screenshot,preload:"auto",url:this.quality.url,subtitle:this.options.subtitle}),v=new DOMParser().parseFromString(g,"text/html").body.firstChild;this.template.videoWrap.insertBefore(v,this.template.videoWrap.getElementsByTagName("div")[0]),this.prevVideo=this.video,this.video=v,this.initVideo(this.video,this.quality.type||this.options.video.type),this.seek(this.prevVideo.currentTime),this.notice("".concat(this.tran("switching-quality").replace("%q",this.quality.name)),-1,void 0,"switch-quality"),this.events.trigger("quality_start",this.quality),this.on("canplay",function(){if(p.prevVideo){if(p.video.currentTime!==p.prevVideo.currentTime)return void p.seek(p.prevVideo.currentTime);p.template.videoWrap.removeChild(p.prevVideo),p.video.classList.add("dplayer-video-current"),A||p.video.play(),p.prevVideo=null,p.notice("".concat(p.tran("switched-quality").replace("%q",p.quality.name)),void 0,void 0,"switch-quality"),p.switchingQuality=!1,p.events.trigger("quality_end")}}),this.on("error",function(){p.video.error&&p.prevVideo&&(p.template.videoWrap.removeChild(p.video),p.video=p.prevVideo,A||p.video.play(),p.qualityIndex=p.prevIndex,p.quality=p.options.video.quality[p.qualityIndex],p.noticeTime=setTimeout(function(){p.template.notice.style.opacity=0,p.events.trigger("notice_hide")},3e3),p.prevVideo=null,p.switchingQuality=!1)})}}},{key:"notice",value:function(s){var p,A,g,v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2e3,I=arguments.length>2&&arguments[2]!==void 0?arguments[2]:.8,_=arguments.length>3?arguments[3]:void 0;if(_&&((p=document.getElementById("dplayer-notice-".concat(_)))&&(p.innerHTML=s),this.noticeList[_]&&(clearTimeout(this.noticeList[_]),this.noticeList[_]=null)),!p){var U=di.NewNotice(s,I,_);this.template.noticeList.appendChild(U),p=U}this.events.trigger("notice_show",p),v>0&&(this.noticeList[_]=setTimeout((A=p,g=this,function(){A.addEventListener("animationend",function(){g.template.noticeList.removeChild(A)}),A.classList.add("remove-notice"),g.events.trigger("notice_hide"),g.noticeList[_]=null}),v))}},{key:"resize",value:function(){this.danmaku&&this.danmaku.resize(),this.controller.thumbnails&&this.controller.thumbnails.resize(160,this.video.videoHeight/this.video.videoWidth*160,this.template.barWrap.offsetWidth),this.events.trigger("resize")}},{key:"speed",value:function(s){this.video.playbackRate=s}},{key:"destroy",value:function(){ln.splice(ln.indexOf(this),1),this.pause(),document.removeEventListener("click",this.docClickFun,!0),this.container.removeEventListener("click",this.containerClickFun,!0),this.fullScreen.destroy(),this.hotkey.destroy(),this.contextmenu.destroy(),this.controller.destroy(),this.timer.destroy(),this.video.src="",this.container.innerHTML="",this.events.trigger("destroy")}}],a=[{key:"version",get:function(){return"1.27.1"}}],u&&fi(l.prototype,u),a&&fi(l,a),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Qd=Kd;console.log(`
`.concat(" %c DPlayer v","1.27.1"," ").concat("v1.27.0-12-g4f61091"," %c https://dplayer.diygod.dev ",`
`,`
`),"color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;");const Vd=Qd})(),c.default})())})(Ks);var bh=Ks.exports;const gh=mh(bh),vh={id:"dplayer",style:{width:"100%",height:"100%"}},xh={__name:"VideoPlay",setup(e){const t=Ra(),n=nt(null);return yr(()=>{let r=t.query.url;n.value=new gh({container:document.getElementById("dplayer"),video:{url:r}})}),ts(()=>{n.value.destroy()}),(r,o)=>(Se(),Ze("div",vh))}},Eh=["src"],wh={__name:"AudioPlay",setup(e){const t=Ra(),n=nt();return yr(()=>{n.value=t.query.url}),(r,o)=>(Se(),Ze("div",null,[et("audio",{src:n.value,controls:""},null,8,Eh)]))}},kh=[{path:"/",component:yh},{path:"/VideoPlay",component:xh},{path:"/AudioPlay",component:wh}],Ch=xA({history:Mf(),routes:kh});const Qs=Af(bf);Qs.use(Ch);Qs.mount("#app");
