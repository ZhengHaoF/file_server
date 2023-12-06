(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();function pa(e,t){const n=Object.create(null),r=e.split(",");for(let o=0;o<r.length;o++)n[r[o]]=!0;return t?o=>!!n[o.toLowerCase()]:o=>!!n[o]}const Ie={},pn=[],mt=()=>{},Jd=()=>!1,Xd=/^on[^a-z]/,Zr=e=>Xd.test(e),ua=e=>e.startsWith("onUpdate:"),Ne=Object.assign,fa=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Gd=Object.prototype.hasOwnProperty,Ae=(e,t)=>Gd.call(e,t),le=Array.isArray,un=e=>Jr(e)==="[object Map]",gl=e=>Jr(e)==="[object Set]",se=e=>typeof e=="function",Me=e=>typeof e=="string",Aa=e=>typeof e=="symbol",_e=e=>e!==null&&typeof e=="object",vl=e=>_e(e)&&se(e.then)&&se(e.catch),xl=Object.prototype.toString,Jr=e=>xl.call(e),ep=e=>Jr(e).slice(8,-1),El=e=>Jr(e)==="[object Object]",ya=e=>Me(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Pr=pa(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Xr=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},tp=/-(\w)/g,Bt=Xr(e=>e.replace(tp,(t,n)=>n?n.toUpperCase():"")),np=/\B([A-Z])/g,xn=Xr(e=>e.replace(np,"-$1").toLowerCase()),Gr=Xr(e=>e.charAt(0).toUpperCase()+e.slice(1)),Oo=Xr(e=>e?`on${Gr(e)}`:""),lr=(e,t)=>!Object.is(e,t),To=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},Nr=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},rp=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let mi;const Ko=()=>mi||(mi=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function eo(e){if(le(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],o=Me(r)?lp(r):eo(r);if(o)for(const c in o)t[c]=o[c]}return t}else{if(Me(e))return e;if(_e(e))return e}}const op=/;(?![^(]*\))/g,ap=/:([^]+)/,ip=/\/\*[^]*?\*\//g;function lp(e){const t={};return e.replace(ip,"").split(op).forEach(n=>{if(n){const r=n.split(ap);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function sr(e){let t="";if(Me(e))t=e;else if(le(e))for(let n=0;n<e.length;n++){const r=sr(e[n]);r&&(t+=r+" ")}else if(_e(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const sp="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",cp=pa(sp);function wl(e){return!!e||e===""}const er=e=>Me(e)?e:e==null?"":le(e)||_e(e)&&(e.toString===xl||!se(e.toString))?JSON.stringify(e,kl,2):String(e),kl=(e,t)=>t&&t.__v_isRef?kl(e,t.value):un(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,o])=>(n[`${r} =>`]=o,n),{})}:gl(t)?{[`Set(${t.size})`]:[...t.values()]}:_e(t)&&!le(t)&&!El(t)?String(t):t;let ft;class dp{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=ft,!t&&ft&&(this.index=(ft.scopes||(ft.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=ft;try{return ft=this,t()}finally{ft=n}}}on(){ft=this}off(){ft=this.parent}stop(t){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0,this._active=!1}}}function pp(e,t=ft){t&&t.active&&t.effects.push(e)}function up(){return ft}const ha=e=>{const t=new Set(e);return t.w=0,t.n=0,t},Cl=e=>(e.w&Qt)>0,Bl=e=>(e.n&Qt)>0,fp=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=Qt},Ap=e=>{const{deps:t}=e;if(t.length){let n=0;for(let r=0;r<t.length;r++){const o=t[r];Cl(o)&&!Bl(o)?o.delete(e):t[n++]=o,o.w&=~Qt,o.n&=~Qt}t.length=n}},Qo=new WeakMap;let Xn=0,Qt=1;const Vo=30;let At;const en=Symbol(""),$o=Symbol("");class ma{constructor(t,n=null,r){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,pp(this,r)}run(){if(!this.active)return this.fn();let t=At,n=Yt;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=At,At=this,Yt=!0,Qt=1<<++Xn,Xn<=Vo?fp(this):bi(this),this.fn()}finally{Xn<=Vo&&Ap(this),Qt=1<<--Xn,At=this.parent,Yt=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){At===this?this.deferStop=!0:this.active&&(bi(this),this.onStop&&this.onStop(),this.active=!1)}}function bi(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let Yt=!0;const Sl=[];function En(){Sl.push(Yt),Yt=!1}function wn(){const e=Sl.pop();Yt=e===void 0?!0:e}function rt(e,t,n){if(Yt&&At){let r=Qo.get(e);r||Qo.set(e,r=new Map);let o=r.get(n);o||r.set(n,o=ha()),Ll(o)}}function Ll(e,t){let n=!1;Xn<=Vo?Bl(e)||(e.n|=Qt,n=!Cl(e)):n=!e.has(At),n&&(e.add(At),At.deps.push(e))}function Pt(e,t,n,r,o,c){const d=Qo.get(e);if(!d)return;let f=[];if(t==="clear")f=[...d.values()];else if(n==="length"&&le(e)){const y=Number(r);d.forEach((m,b)=>{(b==="length"||b>=y)&&f.push(m)})}else switch(n!==void 0&&f.push(d.get(n)),t){case"add":le(e)?ya(n)&&f.push(d.get("length")):(f.push(d.get(en)),un(e)&&f.push(d.get($o)));break;case"delete":le(e)||(f.push(d.get(en)),un(e)&&f.push(d.get($o)));break;case"set":un(e)&&f.push(d.get(en));break}if(f.length===1)f[0]&&Zo(f[0]);else{const y=[];for(const m of f)m&&y.push(...m);Zo(ha(y))}}function Zo(e,t){const n=le(e)?e:[...e];for(const r of n)r.computed&&gi(r);for(const r of n)r.computed||gi(r)}function gi(e,t){(e!==At||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const yp=pa("__proto__,__v_isRef,__isVue"),Il=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Aa)),hp=ba(),mp=ba(!1,!0),bp=ba(!0),vi=gp();function gp(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const r=ge(this);for(let c=0,d=this.length;c<d;c++)rt(r,"get",c+"");const o=r[t](...n);return o===-1||o===!1?r[t](...n.map(ge)):o}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){En();const r=ge(this)[t].apply(this,n);return wn(),r}}),e}function vp(e){const t=ge(this);return rt(t,"has",e),t.hasOwnProperty(e)}function ba(e=!1,t=!1){return function(r,o,c){if(o==="__v_isReactive")return!e;if(o==="__v_isReadonly")return e;if(o==="__v_isShallow")return t;if(o==="__v_raw"&&c===(e?t?zp:Pl:t?Rl:Tl).get(r))return r;const d=le(r);if(!e){if(d&&Ae(vi,o))return Reflect.get(vi,o,c);if(o==="hasOwnProperty")return vp}const f=Reflect.get(r,o,c);return(Aa(o)?Il.has(o):yp(o))||(e||rt(r,"get",o),t)?f:$e(f)?d&&ya(o)?f:f.value:_e(f)?e?zl(f):no(f):f}}const xp=_l(),Ep=_l(!0);function _l(e=!1){return function(n,r,o,c){let d=n[r];if(yn(d)&&$e(d)&&!$e(o))return!1;if(!e&&(!Ur(o)&&!yn(o)&&(d=ge(d),o=ge(o)),!le(n)&&$e(d)&&!$e(o)))return d.value=o,!0;const f=le(n)&&ya(r)?Number(r)<n.length:Ae(n,r),y=Reflect.set(n,r,o,c);return n===ge(c)&&(f?lr(o,d)&&Pt(n,"set",r,o):Pt(n,"add",r,o)),y}}function wp(e,t){const n=Ae(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&n&&Pt(e,"delete",t,void 0),r}function kp(e,t){const n=Reflect.has(e,t);return(!Aa(t)||!Il.has(t))&&rt(e,"has",t),n}function Cp(e){return rt(e,"iterate",le(e)?"length":en),Reflect.ownKeys(e)}const Ol={get:hp,set:xp,deleteProperty:wp,has:kp,ownKeys:Cp},Bp={get:bp,set(e,t){return!0},deleteProperty(e,t){return!0}},Sp=Ne({},Ol,{get:mp,set:Ep}),ga=e=>e,to=e=>Reflect.getPrototypeOf(e);function Lr(e,t,n=!1,r=!1){e=e.__v_raw;const o=ge(e),c=ge(t);n||(t!==c&&rt(o,"get",t),rt(o,"get",c));const{has:d}=to(o),f=r?ga:n?Ea:cr;if(d.call(o,t))return f(e.get(t));if(d.call(o,c))return f(e.get(c));e!==o&&e.get(t)}function Ir(e,t=!1){const n=this.__v_raw,r=ge(n),o=ge(e);return t||(e!==o&&rt(r,"has",e),rt(r,"has",o)),e===o?n.has(e):n.has(e)||n.has(o)}function _r(e,t=!1){return e=e.__v_raw,!t&&rt(ge(e),"iterate",en),Reflect.get(e,"size",e)}function xi(e){e=ge(e);const t=ge(this);return to(t).has.call(t,e)||(t.add(e),Pt(t,"add",e,e)),this}function Ei(e,t){t=ge(t);const n=ge(this),{has:r,get:o}=to(n);let c=r.call(n,e);c||(e=ge(e),c=r.call(n,e));const d=o.call(n,e);return n.set(e,t),c?lr(t,d)&&Pt(n,"set",e,t):Pt(n,"add",e,t),this}function wi(e){const t=ge(this),{has:n,get:r}=to(t);let o=n.call(t,e);o||(e=ge(e),o=n.call(t,e)),r&&r.call(t,e);const c=t.delete(e);return o&&Pt(t,"delete",e,void 0),c}function ki(){const e=ge(this),t=e.size!==0,n=e.clear();return t&&Pt(e,"clear",void 0,void 0),n}function Or(e,t){return function(r,o){const c=this,d=c.__v_raw,f=ge(d),y=t?ga:e?Ea:cr;return!e&&rt(f,"iterate",en),d.forEach((m,b)=>r.call(o,y(m),y(b),c))}}function Tr(e,t,n){return function(...r){const o=this.__v_raw,c=ge(o),d=un(c),f=e==="entries"||e===Symbol.iterator&&d,y=e==="keys"&&d,m=o[e](...r),b=n?ga:t?Ea:cr;return!t&&rt(c,"iterate",y?$o:en),{next(){const{value:x,done:h}=m.next();return h?{value:x,done:h}:{value:f?[b(x[0]),b(x[1])]:b(x),done:h}},[Symbol.iterator](){return this}}}}function Ft(e){return function(...t){return e==="delete"?!1:this}}function Lp(){const e={get(c){return Lr(this,c)},get size(){return _r(this)},has:Ir,add:xi,set:Ei,delete:wi,clear:ki,forEach:Or(!1,!1)},t={get(c){return Lr(this,c,!1,!0)},get size(){return _r(this)},has:Ir,add:xi,set:Ei,delete:wi,clear:ki,forEach:Or(!1,!0)},n={get(c){return Lr(this,c,!0)},get size(){return _r(this,!0)},has(c){return Ir.call(this,c,!0)},add:Ft("add"),set:Ft("set"),delete:Ft("delete"),clear:Ft("clear"),forEach:Or(!0,!1)},r={get(c){return Lr(this,c,!0,!0)},get size(){return _r(this,!0)},has(c){return Ir.call(this,c,!0)},add:Ft("add"),set:Ft("set"),delete:Ft("delete"),clear:Ft("clear"),forEach:Or(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(c=>{e[c]=Tr(c,!1,!1),n[c]=Tr(c,!0,!1),t[c]=Tr(c,!1,!0),r[c]=Tr(c,!0,!0)}),[e,n,t,r]}const[Ip,_p,Op,Tp]=Lp();function va(e,t){const n=t?e?Tp:Op:e?_p:Ip;return(r,o,c)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?r:Reflect.get(Ae(n,o)&&o in r?n:r,o,c)}const Rp={get:va(!1,!1)},Pp={get:va(!1,!0)},jp={get:va(!0,!1)},Tl=new WeakMap,Rl=new WeakMap,Pl=new WeakMap,zp=new WeakMap;function Mp(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Dp(e){return e.__v_skip||!Object.isExtensible(e)?0:Mp(ep(e))}function no(e){return yn(e)?e:xa(e,!1,Ol,Rp,Tl)}function jl(e){return xa(e,!1,Sp,Pp,Rl)}function zl(e){return xa(e,!0,Bp,jp,Pl)}function xa(e,t,n,r,o){if(!_e(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const c=o.get(e);if(c)return c;const d=Dp(e);if(d===0)return e;const f=new Proxy(e,d===2?r:n);return o.set(e,f),f}function fn(e){return yn(e)?fn(e.__v_raw):!!(e&&e.__v_isReactive)}function yn(e){return!!(e&&e.__v_isReadonly)}function Ur(e){return!!(e&&e.__v_isShallow)}function Ml(e){return fn(e)||yn(e)}function ge(e){const t=e&&e.__v_raw;return t?ge(t):e}function Dl(e){return Nr(e,"__v_skip",!0),e}const cr=e=>_e(e)?no(e):e,Ea=e=>_e(e)?zl(e):e;function ql(e){Yt&&At&&(e=ge(e),Ll(e.dep||(e.dep=ha())))}function Fl(e,t){e=ge(e);const n=e.dep;n&&Zo(n)}function $e(e){return!!(e&&e.__v_isRef===!0)}function tt(e){return Nl(e,!1)}function qp(e){return Nl(e,!0)}function Nl(e,t){return $e(e)?e:new Fp(e,t)}class Fp{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:ge(t),this._value=n?t:cr(t)}get value(){return ql(this),this._value}set value(t){const n=this.__v_isShallow||Ur(t)||yn(t);t=n?t:ge(t),lr(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:cr(t),Fl(this))}}function Fe(e){return $e(e)?e.value:e}const Np={get:(e,t,n)=>Fe(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const o=e[t];return $e(o)&&!$e(n)?(o.value=n,!0):Reflect.set(e,t,n,r)}};function Ul(e){return fn(e)?e:new Proxy(e,Np)}class Up{constructor(t,n,r,o){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new ma(t,()=>{this._dirty||(this._dirty=!0,Fl(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!o,this.__v_isReadonly=r}get value(){const t=ge(this);return ql(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}function Hp(e,t,n=!1){let r,o;const c=se(e);return c?(r=e,o=mt):(r=e.get,o=e.set),new Up(r,o,c||!o,n)}function Kt(e,t,n,r){let o;try{o=r?e(...r):e()}catch(c){ro(c,t,n)}return o}function bt(e,t,n,r){if(se(e)){const c=Kt(e,t,n,r);return c&&vl(c)&&c.catch(d=>{ro(d,t,n)}),c}const o=[];for(let c=0;c<e.length;c++)o.push(bt(e[c],t,n,r));return o}function ro(e,t,n,r=!0){const o=t?t.vnode:null;if(t){let c=t.parent;const d=t.proxy,f=n;for(;c;){const m=c.ec;if(m){for(let b=0;b<m.length;b++)if(m[b](e,d,f)===!1)return}c=c.parent}const y=t.appContext.config.errorHandler;if(y){Kt(y,null,10,[e,d,f]);return}}Wp(e,n,o,r)}function Wp(e,t,n,r=!0){console.error(e)}let dr=!1,Jo=!1;const Ve=[];let kt=0;const An=[];let Tt=null,Xt=0;const Hl=Promise.resolve();let wa=null;function Wl(e){const t=wa||Hl;return e?t.then(this?e.bind(this):e):t}function Yp(e){let t=kt+1,n=Ve.length;for(;t<n;){const r=t+n>>>1;pr(Ve[r])<e?t=r+1:n=r}return t}function ka(e){(!Ve.length||!Ve.includes(e,dr&&e.allowRecurse?kt+1:kt))&&(e.id==null?Ve.push(e):Ve.splice(Yp(e.id),0,e),Yl())}function Yl(){!dr&&!Jo&&(Jo=!0,wa=Hl.then(Ql))}function Kp(e){const t=Ve.indexOf(e);t>kt&&Ve.splice(t,1)}function Qp(e){le(e)?An.push(...e):(!Tt||!Tt.includes(e,e.allowRecurse?Xt+1:Xt))&&An.push(e),Yl()}function Ci(e,t=dr?kt+1:0){for(;t<Ve.length;t++){const n=Ve[t];n&&n.pre&&(Ve.splice(t,1),t--,n())}}function Kl(e){if(An.length){const t=[...new Set(An)];if(An.length=0,Tt){Tt.push(...t);return}for(Tt=t,Tt.sort((n,r)=>pr(n)-pr(r)),Xt=0;Xt<Tt.length;Xt++)Tt[Xt]();Tt=null,Xt=0}}const pr=e=>e.id==null?1/0:e.id,Vp=(e,t)=>{const n=pr(e)-pr(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function Ql(e){Jo=!1,dr=!0,Ve.sort(Vp);const t=mt;try{for(kt=0;kt<Ve.length;kt++){const n=Ve[kt];n&&n.active!==!1&&Kt(n,null,14)}}finally{kt=0,Ve.length=0,Kl(),dr=!1,wa=null,(Ve.length||An.length)&&Ql()}}function $p(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||Ie;let o=n;const c=t.startsWith("update:"),d=c&&t.slice(7);if(d&&d in r){const b=`${d==="modelValue"?"model":d}Modifiers`,{number:x,trim:h}=r[b]||Ie;h&&(o=n.map(k=>Me(k)?k.trim():k)),x&&(o=n.map(rp))}let f,y=r[f=Oo(t)]||r[f=Oo(Bt(t))];!y&&c&&(y=r[f=Oo(xn(t))]),y&&bt(y,e,6,o);const m=r[f+"Once"];if(m){if(!e.emitted)e.emitted={};else if(e.emitted[f])return;e.emitted[f]=!0,bt(m,e,6,o)}}function Vl(e,t,n=!1){const r=t.emitsCache,o=r.get(e);if(o!==void 0)return o;const c=e.emits;let d={},f=!1;if(!se(e)){const y=m=>{const b=Vl(m,t,!0);b&&(f=!0,Ne(d,b))};!n&&t.mixins.length&&t.mixins.forEach(y),e.extends&&y(e.extends),e.mixins&&e.mixins.forEach(y)}return!c&&!f?(_e(e)&&r.set(e,null),null):(le(c)?c.forEach(y=>d[y]=null):Ne(d,c),_e(e)&&r.set(e,d),d)}function oo(e,t){return!e||!Zr(t)?!1:(t=t.slice(2).replace(/Once$/,""),Ae(e,t[0].toLowerCase()+t.slice(1))||Ae(e,xn(t))||Ae(e,t))}let Je=null,$l=null;function Hr(e){const t=Je;return Je=e,$l=e&&e.type.__scopeId||null,t}function Zl(e,t=Je,n){if(!t||e._n)return e;const r=(...o)=>{r._d&&zi(-1);const c=Hr(t);let d;try{d=e(...o)}finally{Hr(c),r._d&&zi(1)}return d};return r._n=!0,r._c=!0,r._d=!0,r}function Ro(e){const{type:t,vnode:n,proxy:r,withProxy:o,props:c,propsOptions:[d],slots:f,attrs:y,emit:m,render:b,renderCache:x,data:h,setupState:k,ctx:B,inheritAttrs:C}=e;let I,z;const T=Hr(e);try{if(n.shapeFlag&4){const F=o||r;I=wt(b.call(F,F,x,c,k,h,B)),z=y}else{const F=t;I=wt(F.length>1?F(c,{attrs:y,slots:f,emit:m}):F(c,null)),z=t.props?y:Zp(y)}}catch(F){or.length=0,ro(F,e,1),I=H(Vt)}let V=I;if(z&&C!==!1){const F=Object.keys(z),{shapeFlag:Ee}=V;F.length&&Ee&7&&(d&&F.some(ua)&&(z=Jp(z,d)),V=hn(V,z))}return n.dirs&&(V=hn(V),V.dirs=V.dirs?V.dirs.concat(n.dirs):n.dirs),n.transition&&(V.transition=n.transition),I=V,Hr(T),I}const Zp=e=>{let t;for(const n in e)(n==="class"||n==="style"||Zr(n))&&((t||(t={}))[n]=e[n]);return t},Jp=(e,t)=>{const n={};for(const r in e)(!ua(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Xp(e,t,n){const{props:r,children:o,component:c}=e,{props:d,children:f,patchFlag:y}=t,m=c.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&y>=0){if(y&1024)return!0;if(y&16)return r?Bi(r,d,m):!!d;if(y&8){const b=t.dynamicProps;for(let x=0;x<b.length;x++){const h=b[x];if(d[h]!==r[h]&&!oo(m,h))return!0}}}else return(o||f)&&(!f||!f.$stable)?!0:r===d?!1:r?d?Bi(r,d,m):!0:!!d;return!1}function Bi(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let o=0;o<r.length;o++){const c=r[o];if(t[c]!==e[c]&&!oo(n,c))return!0}return!1}function Gp({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent}const eu=e=>e.__isSuspense;function tu(e,t){t&&t.pendingBranch?le(e)?t.effects.push(...e):t.effects.push(e):Qp(e)}const Rr={};function tr(e,t,n){return Jl(e,t,n)}function Jl(e,t,{immediate:n,deep:r,flush:o,onTrack:c,onTrigger:d}=Ie){var f;const y=up()===((f=He)==null?void 0:f.scope)?He:null;let m,b=!1,x=!1;if($e(e)?(m=()=>e.value,b=Ur(e)):fn(e)?(m=()=>e,r=!0):le(e)?(x=!0,b=e.some(F=>fn(F)||Ur(F)),m=()=>e.map(F=>{if($e(F))return F.value;if(fn(F))return dn(F);if(se(F))return Kt(F,y,2)})):se(e)?t?m=()=>Kt(e,y,2):m=()=>{if(!(y&&y.isUnmounted))return h&&h(),bt(e,y,3,[k])}:m=mt,t&&r){const F=m;m=()=>dn(F())}let h,k=F=>{h=T.onStop=()=>{Kt(F,y,4)}},B;if(fr)if(k=mt,t?n&&bt(t,y,3,[m(),x?[]:void 0,k]):m(),o==="sync"){const F=Vu();B=F.__watcherHandles||(F.__watcherHandles=[])}else return mt;let C=x?new Array(e.length).fill(Rr):Rr;const I=()=>{if(T.active)if(t){const F=T.run();(r||b||(x?F.some((Ee,Se)=>lr(Ee,C[Se])):lr(F,C)))&&(h&&h(),bt(t,y,3,[F,C===Rr?void 0:x&&C[0]===Rr?[]:C,k]),C=F)}else T.run()};I.allowRecurse=!!t;let z;o==="sync"?z=I:o==="post"?z=()=>et(I,y&&y.suspense):(I.pre=!0,y&&(I.id=y.uid),z=()=>ka(I));const T=new ma(m,z);t?n?I():C=T.run():o==="post"?et(T.run.bind(T),y&&y.suspense):T.run();const V=()=>{T.stop(),y&&y.scope&&fa(y.scope.effects,T)};return B&&B.push(V),V}function nu(e,t,n){const r=this.proxy,o=Me(e)?e.includes(".")?Xl(r,e):()=>r[e]:e.bind(r,r);let c;se(t)?c=t:(c=t.handler,n=t);const d=He;mn(this);const f=Jl(o,c.bind(r),n);return d?mn(d):tn(),f}function Xl(e,t){const n=t.split(".");return()=>{let r=e;for(let o=0;o<n.length&&r;o++)r=r[n[o]];return r}}function dn(e,t){if(!_e(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),$e(e))dn(e.value,t);else if(le(e))for(let n=0;n<e.length;n++)dn(e[n],t);else if(gl(e)||un(e))e.forEach(n=>{dn(n,t)});else if(El(e))for(const n in e)dn(e[n],t);return e}function Zt(e,t,n,r){const o=e.dirs,c=t&&t.dirs;for(let d=0;d<o.length;d++){const f=o[d];c&&(f.oldValue=c[d].value);let y=f.dir[r];y&&(En(),bt(y,n,8,[e.el,f,e,t]),wn())}}function Gl(e,t){return se(e)?(()=>Ne({name:e.name},t,{setup:e}))():e}const nr=e=>!!e.type.__asyncLoader,es=e=>e.type.__isKeepAlive;function ru(e,t){ts(e,"a",t)}function ou(e,t){ts(e,"da",t)}function ts(e,t,n=He){const r=e.__wdc||(e.__wdc=()=>{let o=n;for(;o;){if(o.isDeactivated)return;o=o.parent}return e()});if(ao(t,r,n),n){let o=n.parent;for(;o&&o.parent;)es(o.parent.vnode)&&au(r,t,n,o),o=o.parent}}function au(e,t,n,r){const o=ao(t,e,r,!0);Ca(()=>{fa(r[t],o)},n)}function ao(e,t,n=He,r=!1){if(n){const o=n[e]||(n[e]=[]),c=t.__weh||(t.__weh=(...d)=>{if(n.isUnmounted)return;En(),mn(n);const f=bt(t,n,e,d);return tn(),wn(),f});return r?o.unshift(c):o.push(c),c}}const jt=e=>(t,n=He)=>(!fr||e==="sp")&&ao(e,(...r)=>t(...r),n),iu=jt("bm"),hr=jt("m"),lu=jt("bu"),su=jt("u"),ns=jt("bum"),Ca=jt("um"),cu=jt("sp"),du=jt("rtg"),pu=jt("rtc");function uu(e,t=He){ao("ec",e,t)}const rs="components";function fu(e,t){return yu(rs,e,!0,t)||e}const Au=Symbol.for("v-ndc");function yu(e,t,n=!0,r=!1){const o=Je||He;if(o){const c=o.type;if(e===rs){const f=Yu(c,!1);if(f&&(f===t||f===Bt(t)||f===Gr(Bt(t))))return c}const d=Si(o[e]||c[e],t)||Si(o.appContext[e],t);return!d&&r?c:d}}function Si(e,t){return e&&(e[t]||e[Bt(t)]||e[Gr(Bt(t))])}function Po(e,t,n,r){let o;const c=n&&n[r];if(le(e)||Me(e)){o=new Array(e.length);for(let d=0,f=e.length;d<f;d++)o[d]=t(e[d],d,void 0,c&&c[d])}else if(typeof e=="number"){o=new Array(e);for(let d=0;d<e;d++)o[d]=t(d+1,d,void 0,c&&c[d])}else if(_e(e))if(e[Symbol.iterator])o=Array.from(e,(d,f)=>t(d,f,void 0,c&&c[f]));else{const d=Object.keys(e);o=new Array(d.length);for(let f=0,y=d.length;f<y;f++){const m=d[f];o[f]=t(e[m],m,f,c&&c[f])}}else o=[];return n&&(n[r]=o),o}function hu(e,t,n={},r,o){if(Je.isCE||Je.parent&&nr(Je.parent)&&Je.parent.isCE)return t!=="default"&&(n.name=t),H("slot",n,r&&r());let c=e[t];c&&c._c&&(c._d=!1),xe();const d=c&&os(c(n)),f=at(nt,{key:n.key||d&&d.key||`_${t}`},d||(r?r():[]),d&&e._===1?64:-2);return!o&&f.scopeId&&(f.slotScopeIds=[f.scopeId+"-s"]),c&&c._c&&(c._d=!0),f}function os(e){return e.some(t=>Kr(t)?!(t.type===Vt||t.type===nt&&!os(t.children)):!0)?e:null}const Xo=e=>e?hs(e)?_a(e)||e.proxy:Xo(e.parent):null,rr=Ne(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Xo(e.parent),$root:e=>Xo(e.root),$emit:e=>e.emit,$options:e=>Ba(e),$forceUpdate:e=>e.f||(e.f=()=>ka(e.update)),$nextTick:e=>e.n||(e.n=Wl.bind(e.proxy)),$watch:e=>nu.bind(e)}),jo=(e,t)=>e!==Ie&&!e.__isScriptSetup&&Ae(e,t),mu={get({_:e},t){const{ctx:n,setupState:r,data:o,props:c,accessCache:d,type:f,appContext:y}=e;let m;if(t[0]!=="$"){const k=d[t];if(k!==void 0)switch(k){case 1:return r[t];case 2:return o[t];case 4:return n[t];case 3:return c[t]}else{if(jo(r,t))return d[t]=1,r[t];if(o!==Ie&&Ae(o,t))return d[t]=2,o[t];if((m=e.propsOptions[0])&&Ae(m,t))return d[t]=3,c[t];if(n!==Ie&&Ae(n,t))return d[t]=4,n[t];Go&&(d[t]=0)}}const b=rr[t];let x,h;if(b)return t==="$attrs"&&rt(e,"get",t),b(e);if((x=f.__cssModules)&&(x=x[t]))return x;if(n!==Ie&&Ae(n,t))return d[t]=4,n[t];if(h=y.config.globalProperties,Ae(h,t))return h[t]},set({_:e},t,n){const{data:r,setupState:o,ctx:c}=e;return jo(o,t)?(o[t]=n,!0):r!==Ie&&Ae(r,t)?(r[t]=n,!0):Ae(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(c[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:o,propsOptions:c}},d){let f;return!!n[d]||e!==Ie&&Ae(e,d)||jo(t,d)||(f=c[0])&&Ae(f,d)||Ae(r,d)||Ae(rr,d)||Ae(o.config.globalProperties,d)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:Ae(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function Li(e){return le(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let Go=!0;function bu(e){const t=Ba(e),n=e.proxy,r=e.ctx;Go=!1,t.beforeCreate&&Ii(t.beforeCreate,e,"bc");const{data:o,computed:c,methods:d,watch:f,provide:y,inject:m,created:b,beforeMount:x,mounted:h,beforeUpdate:k,updated:B,activated:C,deactivated:I,beforeDestroy:z,beforeUnmount:T,destroyed:V,unmounted:F,render:Ee,renderTracked:Se,renderTriggered:We,errorCaptured:Xe,serverPrefetch:it,expose:ue,inheritAttrs:Ge,components:me,directives:pe,filters:Re}=t;if(m&&gu(m,r,null),d)for(const be in d){const fe=d[be];se(fe)&&(r[be]=fe.bind(n))}if(o){const be=o.call(n,n);_e(be)&&(e.data=no(be))}if(Go=!0,c)for(const be in c){const fe=c[be],te=se(fe)?fe.bind(n,n):se(fe.get)?fe.get.bind(n,n):mt,pt=!se(fe)&&se(fe.set)?fe.set.bind(n):mt,Ke=yt({get:te,set:pt});Object.defineProperty(r,be,{enumerable:!0,configurable:!0,get:()=>Ke.value,set:qe=>Ke.value=qe})}if(f)for(const be in f)as(f[be],r,n,be);if(y){const be=se(y)?y.call(n):y;Reflect.ownKeys(be).forEach(fe=>{jr(fe,be[fe])})}b&&Ii(b,e,"c");function Be(be,fe){le(fe)?fe.forEach(te=>be(te.bind(n))):fe&&be(fe.bind(n))}if(Be(iu,x),Be(hr,h),Be(lu,k),Be(su,B),Be(ru,C),Be(ou,I),Be(uu,Xe),Be(pu,Se),Be(du,We),Be(ns,T),Be(Ca,F),Be(cu,it),le(ue))if(ue.length){const be=e.exposed||(e.exposed={});ue.forEach(fe=>{Object.defineProperty(be,fe,{get:()=>n[fe],set:te=>n[fe]=te})})}else e.exposed||(e.exposed={});Ee&&e.render===mt&&(e.render=Ee),Ge!=null&&(e.inheritAttrs=Ge),me&&(e.components=me),pe&&(e.directives=pe)}function gu(e,t,n=mt){le(e)&&(e=ea(e));for(const r in e){const o=e[r];let c;_e(o)?"default"in o?c=st(o.from||r,o.default,!0):c=st(o.from||r):c=st(o),$e(c)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>c.value,set:d=>c.value=d}):t[r]=c}}function Ii(e,t,n){bt(le(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function as(e,t,n,r){const o=r.includes(".")?Xl(n,r):()=>n[r];if(Me(e)){const c=t[e];se(c)&&tr(o,c)}else if(se(e))tr(o,e.bind(n));else if(_e(e))if(le(e))e.forEach(c=>as(c,t,n,r));else{const c=se(e.handler)?e.handler.bind(n):t[e.handler];se(c)&&tr(o,c,e)}}function Ba(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:o,optionsCache:c,config:{optionMergeStrategies:d}}=e.appContext,f=c.get(t);let y;return f?y=f:!o.length&&!n&&!r?y=t:(y={},o.length&&o.forEach(m=>Wr(y,m,d,!0)),Wr(y,t,d)),_e(t)&&c.set(t,y),y}function Wr(e,t,n,r=!1){const{mixins:o,extends:c}=t;c&&Wr(e,c,n,!0),o&&o.forEach(d=>Wr(e,d,n,!0));for(const d in t)if(!(r&&d==="expose")){const f=vu[d]||n&&n[d];e[d]=f?f(e[d],t[d]):t[d]}return e}const vu={data:_i,props:Oi,emits:Oi,methods:Gn,computed:Gn,beforeCreate:Ze,created:Ze,beforeMount:Ze,mounted:Ze,beforeUpdate:Ze,updated:Ze,beforeDestroy:Ze,beforeUnmount:Ze,destroyed:Ze,unmounted:Ze,activated:Ze,deactivated:Ze,errorCaptured:Ze,serverPrefetch:Ze,components:Gn,directives:Gn,watch:Eu,provide:_i,inject:xu};function _i(e,t){return t?e?function(){return Ne(se(e)?e.call(this,this):e,se(t)?t.call(this,this):t)}:t:e}function xu(e,t){return Gn(ea(e),ea(t))}function ea(e){if(le(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Ze(e,t){return e?[...new Set([].concat(e,t))]:t}function Gn(e,t){return e?Ne(Object.create(null),e,t):t}function Oi(e,t){return e?le(e)&&le(t)?[...new Set([...e,...t])]:Ne(Object.create(null),Li(e),Li(t??{})):t}function Eu(e,t){if(!e)return t;if(!t)return e;const n=Ne(Object.create(null),e);for(const r in t)n[r]=Ze(e[r],t[r]);return n}function is(){return{app:null,config:{isNativeTag:Jd,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let wu=0;function ku(e,t){return function(r,o=null){se(r)||(r=Ne({},r)),o!=null&&!_e(o)&&(o=null);const c=is(),d=new Set;let f=!1;const y=c.app={_uid:wu++,_component:r,_props:o,_container:null,_context:c,_instance:null,version:$u,get config(){return c.config},set config(m){},use(m,...b){return d.has(m)||(m&&se(m.install)?(d.add(m),m.install(y,...b)):se(m)&&(d.add(m),m(y,...b))),y},mixin(m){return c.mixins.includes(m)||c.mixins.push(m),y},component(m,b){return b?(c.components[m]=b,y):c.components[m]},directive(m,b){return b?(c.directives[m]=b,y):c.directives[m]},mount(m,b,x){if(!f){const h=H(r,o);return h.appContext=c,b&&t?t(h,m):e(h,m,x),f=!0,y._container=m,m.__vue_app__=y,_a(h.component)||h.component.proxy}},unmount(){f&&(e(null,y._container),delete y._container.__vue_app__)},provide(m,b){return c.provides[m]=b,y},runWithContext(m){Yr=y;try{return m()}finally{Yr=null}}};return y}}let Yr=null;function jr(e,t){if(He){let n=He.provides;const r=He.parent&&He.parent.provides;r===n&&(n=He.provides=Object.create(r)),n[e]=t}}function st(e,t,n=!1){const r=He||Je;if(r||Yr){const o=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:Yr._context.provides;if(o&&e in o)return o[e];if(arguments.length>1)return n&&se(t)?t.call(r&&r.proxy):t}}function Cu(e,t,n,r=!1){const o={},c={};Nr(c,lo,1),e.propsDefaults=Object.create(null),ls(e,t,o,c);for(const d in e.propsOptions[0])d in o||(o[d]=void 0);n?e.props=r?o:jl(o):e.type.props?e.props=o:e.props=c,e.attrs=c}function Bu(e,t,n,r){const{props:o,attrs:c,vnode:{patchFlag:d}}=e,f=ge(o),[y]=e.propsOptions;let m=!1;if((r||d>0)&&!(d&16)){if(d&8){const b=e.vnode.dynamicProps;for(let x=0;x<b.length;x++){let h=b[x];if(oo(e.emitsOptions,h))continue;const k=t[h];if(y)if(Ae(c,h))k!==c[h]&&(c[h]=k,m=!0);else{const B=Bt(h);o[B]=ta(y,f,B,k,e,!1)}else k!==c[h]&&(c[h]=k,m=!0)}}}else{ls(e,t,o,c)&&(m=!0);let b;for(const x in f)(!t||!Ae(t,x)&&((b=xn(x))===x||!Ae(t,b)))&&(y?n&&(n[x]!==void 0||n[b]!==void 0)&&(o[x]=ta(y,f,x,void 0,e,!0)):delete o[x]);if(c!==f)for(const x in c)(!t||!Ae(t,x))&&(delete c[x],m=!0)}m&&Pt(e,"set","$attrs")}function ls(e,t,n,r){const[o,c]=e.propsOptions;let d=!1,f;if(t)for(let y in t){if(Pr(y))continue;const m=t[y];let b;o&&Ae(o,b=Bt(y))?!c||!c.includes(b)?n[b]=m:(f||(f={}))[b]=m:oo(e.emitsOptions,y)||(!(y in r)||m!==r[y])&&(r[y]=m,d=!0)}if(c){const y=ge(n),m=f||Ie;for(let b=0;b<c.length;b++){const x=c[b];n[x]=ta(o,y,x,m[x],e,!Ae(m,x))}}return d}function ta(e,t,n,r,o,c){const d=e[n];if(d!=null){const f=Ae(d,"default");if(f&&r===void 0){const y=d.default;if(d.type!==Function&&!d.skipFactory&&se(y)){const{propsDefaults:m}=o;n in m?r=m[n]:(mn(o),r=m[n]=y.call(null,t),tn())}else r=y}d[0]&&(c&&!f?r=!1:d[1]&&(r===""||r===xn(n))&&(r=!0))}return r}function ss(e,t,n=!1){const r=t.propsCache,o=r.get(e);if(o)return o;const c=e.props,d={},f=[];let y=!1;if(!se(e)){const b=x=>{y=!0;const[h,k]=ss(x,t,!0);Ne(d,h),k&&f.push(...k)};!n&&t.mixins.length&&t.mixins.forEach(b),e.extends&&b(e.extends),e.mixins&&e.mixins.forEach(b)}if(!c&&!y)return _e(e)&&r.set(e,pn),pn;if(le(c))for(let b=0;b<c.length;b++){const x=Bt(c[b]);Ti(x)&&(d[x]=Ie)}else if(c)for(const b in c){const x=Bt(b);if(Ti(x)){const h=c[b],k=d[x]=le(h)||se(h)?{type:h}:Ne({},h);if(k){const B=ji(Boolean,k.type),C=ji(String,k.type);k[0]=B>-1,k[1]=C<0||B<C,(B>-1||Ae(k,"default"))&&f.push(x)}}}const m=[d,f];return _e(e)&&r.set(e,m),m}function Ti(e){return e[0]!=="$"}function Ri(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function Pi(e,t){return Ri(e)===Ri(t)}function ji(e,t){return le(t)?t.findIndex(n=>Pi(n,e)):se(t)&&Pi(t,e)?0:-1}const cs=e=>e[0]==="_"||e==="$stable",Sa=e=>le(e)?e.map(wt):[wt(e)],Su=(e,t,n)=>{if(t._n)return t;const r=Zl((...o)=>Sa(t(...o)),n);return r._c=!1,r},ds=(e,t,n)=>{const r=e._ctx;for(const o in e){if(cs(o))continue;const c=e[o];if(se(c))t[o]=Su(o,c,r);else if(c!=null){const d=Sa(c);t[o]=()=>d}}},ps=(e,t)=>{const n=Sa(t);e.slots.default=()=>n},Lu=(e,t)=>{if(e.vnode.shapeFlag&32){const n=t._;n?(e.slots=ge(t),Nr(t,"_",n)):ds(t,e.slots={})}else e.slots={},t&&ps(e,t);Nr(e.slots,lo,1)},Iu=(e,t,n)=>{const{vnode:r,slots:o}=e;let c=!0,d=Ie;if(r.shapeFlag&32){const f=t._;f?n&&f===1?c=!1:(Ne(o,t),!n&&f===1&&delete o._):(c=!t.$stable,ds(t,o)),d=t}else t&&(ps(e,t),d={default:1});if(c)for(const f in o)!cs(f)&&!(f in d)&&delete o[f]};function na(e,t,n,r,o=!1){if(le(e)){e.forEach((h,k)=>na(h,t&&(le(t)?t[k]:t),n,r,o));return}if(nr(r)&&!o)return;const c=r.shapeFlag&4?_a(r.component)||r.component.proxy:r.el,d=o?null:c,{i:f,r:y}=e,m=t&&t.r,b=f.refs===Ie?f.refs={}:f.refs,x=f.setupState;if(m!=null&&m!==y&&(Me(m)?(b[m]=null,Ae(x,m)&&(x[m]=null)):$e(m)&&(m.value=null)),se(y))Kt(y,f,12,[d,b]);else{const h=Me(y),k=$e(y);if(h||k){const B=()=>{if(e.f){const C=h?Ae(x,y)?x[y]:b[y]:y.value;o?le(C)&&fa(C,c):le(C)?C.includes(c)||C.push(c):h?(b[y]=[c],Ae(x,y)&&(x[y]=b[y])):(y.value=[c],e.k&&(b[e.k]=y.value))}else h?(b[y]=d,Ae(x,y)&&(x[y]=d)):k&&(y.value=d,e.k&&(b[e.k]=d))};d?(B.id=-1,et(B,n)):B()}}}const et=tu;function _u(e){return Ou(e)}function Ou(e,t){const n=Ko();n.__VUE__=!0;const{insert:r,remove:o,patchProp:c,createElement:d,createText:f,createComment:y,setText:m,setElementText:b,parentNode:x,nextSibling:h,setScopeId:k=mt,insertStaticContent:B}=e,C=(E,w,S,O=null,M=null,q=null,J=!1,N=null,K=!!w.dynamicChildren)=>{if(E===w)return;E&&!$n(E,w)&&(O=j(E),qe(E,M,q,!0),E=null),w.patchFlag===-2&&(K=!1,w.dynamicChildren=null);const{type:D,ref:re,shapeFlag:G}=w;switch(D){case io:I(E,w,S,O);break;case Vt:z(E,w,S,O);break;case zo:E==null&&T(w,S,O,J);break;case nt:me(E,w,S,O,M,q,J,N,K);break;default:G&1?Ee(E,w,S,O,M,q,J,N,K):G&6?pe(E,w,S,O,M,q,J,N,K):(G&64||G&128)&&D.process(E,w,S,O,M,q,J,N,K,W)}re!=null&&M&&na(re,E&&E.ref,q,w||E,!w)},I=(E,w,S,O)=>{if(E==null)r(w.el=f(w.children),S,O);else{const M=w.el=E.el;w.children!==E.children&&m(M,w.children)}},z=(E,w,S,O)=>{E==null?r(w.el=y(w.children||""),S,O):w.el=E.el},T=(E,w,S,O)=>{[E.el,E.anchor]=B(E.children,w,S,O,E.el,E.anchor)},V=({el:E,anchor:w},S,O)=>{let M;for(;E&&E!==w;)M=h(E),r(E,S,O),E=M;r(w,S,O)},F=({el:E,anchor:w})=>{let S;for(;E&&E!==w;)S=h(E),o(E),E=S;o(w)},Ee=(E,w,S,O,M,q,J,N,K)=>{J=J||w.type==="svg",E==null?Se(w,S,O,M,q,J,N,K):it(E,w,M,q,J,N,K)},Se=(E,w,S,O,M,q,J,N)=>{let K,D;const{type:re,props:G,shapeFlag:oe,transition:ae,dirs:ce}=E;if(K=E.el=d(E.type,q,G&&G.is,G),oe&8?b(K,E.children):oe&16&&Xe(E.children,K,null,O,M,q&&re!=="foreignObject",J,N),ce&&Zt(E,null,O,"created"),We(K,E,E.scopeId,J,O),G){for(const ve in G)ve!=="value"&&!Pr(ve)&&c(K,ve,null,G[ve],q,E.children,O,M,Le);"value"in G&&c(K,"value",null,G.value),(D=G.onVnodeBeforeMount)&&Et(D,O,E)}ce&&Zt(E,null,O,"beforeMount");const ke=(!M||M&&!M.pendingBranch)&&ae&&!ae.persisted;ke&&ae.beforeEnter(K),r(K,w,S),((D=G&&G.onVnodeMounted)||ke||ce)&&et(()=>{D&&Et(D,O,E),ke&&ae.enter(K),ce&&Zt(E,null,O,"mounted")},M)},We=(E,w,S,O,M)=>{if(S&&k(E,S),O)for(let q=0;q<O.length;q++)k(E,O[q]);if(M){let q=M.subTree;if(w===q){const J=M.vnode;We(E,J,J.scopeId,J.slotScopeIds,M.parent)}}},Xe=(E,w,S,O,M,q,J,N,K=0)=>{for(let D=K;D<E.length;D++){const re=E[D]=N?Ht(E[D]):wt(E[D]);C(null,re,w,S,O,M,q,J,N)}},it=(E,w,S,O,M,q,J)=>{const N=w.el=E.el;let{patchFlag:K,dynamicChildren:D,dirs:re}=w;K|=E.patchFlag&16;const G=E.props||Ie,oe=w.props||Ie;let ae;S&&Jt(S,!1),(ae=oe.onVnodeBeforeUpdate)&&Et(ae,S,w,E),re&&Zt(w,E,S,"beforeUpdate"),S&&Jt(S,!0);const ce=M&&w.type!=="foreignObject";if(D?ue(E.dynamicChildren,D,N,S,O,ce,q):J||fe(E,w,N,null,S,O,ce,q,!1),K>0){if(K&16)Ge(N,w,G,oe,S,O,M);else if(K&2&&G.class!==oe.class&&c(N,"class",null,oe.class,M),K&4&&c(N,"style",G.style,oe.style,M),K&8){const ke=w.dynamicProps;for(let ve=0;ve<ke.length;ve++){const Oe=ke[ve],ot=G[Oe],It=oe[Oe];(It!==ot||Oe==="value")&&c(N,Oe,ot,It,M,E.children,S,O,Le)}}K&1&&E.children!==w.children&&b(N,w.children)}else!J&&D==null&&Ge(N,w,G,oe,S,O,M);((ae=oe.onVnodeUpdated)||re)&&et(()=>{ae&&Et(ae,S,w,E),re&&Zt(w,E,S,"updated")},O)},ue=(E,w,S,O,M,q,J)=>{for(let N=0;N<w.length;N++){const K=E[N],D=w[N],re=K.el&&(K.type===nt||!$n(K,D)||K.shapeFlag&70)?x(K.el):S;C(K,D,re,null,O,M,q,J,!0)}},Ge=(E,w,S,O,M,q,J)=>{if(S!==O){if(S!==Ie)for(const N in S)!Pr(N)&&!(N in O)&&c(E,N,S[N],null,J,w.children,M,q,Le);for(const N in O){if(Pr(N))continue;const K=O[N],D=S[N];K!==D&&N!=="value"&&c(E,N,D,K,J,w.children,M,q,Le)}"value"in O&&c(E,"value",S.value,O.value)}},me=(E,w,S,O,M,q,J,N,K)=>{const D=w.el=E?E.el:f(""),re=w.anchor=E?E.anchor:f("");let{patchFlag:G,dynamicChildren:oe,slotScopeIds:ae}=w;ae&&(N=N?N.concat(ae):ae),E==null?(r(D,S,O),r(re,S,O),Xe(w.children,S,re,M,q,J,N,K)):G>0&&G&64&&oe&&E.dynamicChildren?(ue(E.dynamicChildren,oe,S,M,q,J,N),(w.key!=null||M&&w===M.subTree)&&us(E,w,!0)):fe(E,w,S,re,M,q,J,N,K)},pe=(E,w,S,O,M,q,J,N,K)=>{w.slotScopeIds=N,E==null?w.shapeFlag&512?M.ctx.activate(w,S,O,J,K):Re(w,S,O,M,q,J,K):Ye(E,w,K)},Re=(E,w,S,O,M,q,J)=>{const N=E.component=Fu(E,O,M);if(es(E)&&(N.ctx.renderer=W),Nu(N),N.asyncDep){if(M&&M.registerDep(N,Be),!E.el){const K=N.subTree=H(Vt);z(null,K,w,S)}return}Be(N,E,w,S,M,q,J)},Ye=(E,w,S)=>{const O=w.component=E.component;if(Xp(E,w,S))if(O.asyncDep&&!O.asyncResolved){be(O,w,S);return}else O.next=w,Kp(O.update),O.update();else w.el=E.el,O.vnode=w},Be=(E,w,S,O,M,q,J)=>{const N=()=>{if(E.isMounted){let{next:re,bu:G,u:oe,parent:ae,vnode:ce}=E,ke=re,ve;Jt(E,!1),re?(re.el=ce.el,be(E,re,J)):re=ce,G&&To(G),(ve=re.props&&re.props.onVnodeBeforeUpdate)&&Et(ve,ae,re,ce),Jt(E,!0);const Oe=Ro(E),ot=E.subTree;E.subTree=Oe,C(ot,Oe,x(ot.el),j(ot),E,M,q),re.el=Oe.el,ke===null&&Gp(E,Oe.el),oe&&et(oe,M),(ve=re.props&&re.props.onVnodeUpdated)&&et(()=>Et(ve,ae,re,ce),M)}else{let re;const{el:G,props:oe}=w,{bm:ae,m:ce,parent:ke}=E,ve=nr(w);if(Jt(E,!1),ae&&To(ae),!ve&&(re=oe&&oe.onVnodeBeforeMount)&&Et(re,ke,w),Jt(E,!0),G&&he){const Oe=()=>{E.subTree=Ro(E),he(G,E.subTree,E,M,null)};ve?w.type.__asyncLoader().then(()=>!E.isUnmounted&&Oe()):Oe()}else{const Oe=E.subTree=Ro(E);C(null,Oe,S,O,E,M,q),w.el=Oe.el}if(ce&&et(ce,M),!ve&&(re=oe&&oe.onVnodeMounted)){const Oe=w;et(()=>Et(re,ke,Oe),M)}(w.shapeFlag&256||ke&&nr(ke.vnode)&&ke.vnode.shapeFlag&256)&&E.a&&et(E.a,M),E.isMounted=!0,w=S=O=null}},K=E.effect=new ma(N,()=>ka(D),E.scope),D=E.update=()=>K.run();D.id=E.uid,Jt(E,!0),D()},be=(E,w,S)=>{w.component=E;const O=E.vnode.props;E.vnode=w,E.next=null,Bu(E,w.props,O,S),Iu(E,w.children,S),En(),Ci(),wn()},fe=(E,w,S,O,M,q,J,N,K=!1)=>{const D=E&&E.children,re=E?E.shapeFlag:0,G=w.children,{patchFlag:oe,shapeFlag:ae}=w;if(oe>0){if(oe&128){pt(D,G,S,O,M,q,J,N,K);return}else if(oe&256){te(D,G,S,O,M,q,J,N,K);return}}ae&8?(re&16&&Le(D,M,q),G!==D&&b(S,G)):re&16?ae&16?pt(D,G,S,O,M,q,J,N,K):Le(D,M,q,!0):(re&8&&b(S,""),ae&16&&Xe(G,S,O,M,q,J,N,K))},te=(E,w,S,O,M,q,J,N,K)=>{E=E||pn,w=w||pn;const D=E.length,re=w.length,G=Math.min(D,re);let oe;for(oe=0;oe<G;oe++){const ae=w[oe]=K?Ht(w[oe]):wt(w[oe]);C(E[oe],ae,S,null,M,q,J,N,K)}D>re?Le(E,M,q,!0,!1,G):Xe(w,S,O,M,q,J,N,K,G)},pt=(E,w,S,O,M,q,J,N,K)=>{let D=0;const re=w.length;let G=E.length-1,oe=re-1;for(;D<=G&&D<=oe;){const ae=E[D],ce=w[D]=K?Ht(w[D]):wt(w[D]);if($n(ae,ce))C(ae,ce,S,null,M,q,J,N,K);else break;D++}for(;D<=G&&D<=oe;){const ae=E[G],ce=w[oe]=K?Ht(w[oe]):wt(w[oe]);if($n(ae,ce))C(ae,ce,S,null,M,q,J,N,K);else break;G--,oe--}if(D>G){if(D<=oe){const ae=oe+1,ce=ae<re?w[ae].el:O;for(;D<=oe;)C(null,w[D]=K?Ht(w[D]):wt(w[D]),S,ce,M,q,J,N,K),D++}}else if(D>oe)for(;D<=G;)qe(E[D],M,q,!0),D++;else{const ae=D,ce=D,ke=new Map;for(D=ce;D<=oe;D++){const Qe=w[D]=K?Ht(w[D]):wt(w[D]);Qe.key!=null&&ke.set(Qe.key,D)}let ve,Oe=0;const ot=oe-ce+1;let It=!1,R=0;const lt=new Array(ot);for(D=0;D<ot;D++)lt[D]=0;for(D=ae;D<=G;D++){const Qe=E[D];if(Oe>=ot){qe(Qe,M,q,!0);continue}let de;if(Qe.key!=null)de=ke.get(Qe.key);else for(ve=ce;ve<=oe;ve++)if(lt[ve-ce]===0&&$n(Qe,w[ve])){de=ve;break}de===void 0?qe(Qe,M,q,!0):(lt[de-ce]=D+1,de>=R?R=de:It=!0,C(Qe,w[de],S,null,M,q,J,N,K),Oe++)}const Cn=It?Tu(lt):pn;for(ve=Cn.length-1,D=ot-1;D>=0;D--){const Qe=ce+D,de=w[Qe],gr=Qe+1<re?w[Qe+1].el:O;lt[D]===0?C(null,de,S,gr,M,q,J,N,K):It&&(ve<0||D!==Cn[ve]?Ke(de,S,gr,2):ve--)}}},Ke=(E,w,S,O,M=null)=>{const{el:q,type:J,transition:N,children:K,shapeFlag:D}=E;if(D&6){Ke(E.component.subTree,w,S,O);return}if(D&128){E.suspense.move(w,S,O);return}if(D&64){J.move(E,w,S,W);return}if(J===nt){r(q,w,S);for(let G=0;G<K.length;G++)Ke(K[G],w,S,O);r(E.anchor,w,S);return}if(J===zo){V(E,w,S);return}if(O!==2&&D&1&&N)if(O===0)N.beforeEnter(q),r(q,w,S),et(()=>N.enter(q),M);else{const{leave:G,delayLeave:oe,afterLeave:ae}=N,ce=()=>r(q,w,S),ke=()=>{G(q,()=>{ce(),ae&&ae()})};oe?oe(q,ce,ke):ke()}else r(q,w,S)},qe=(E,w,S,O=!1,M=!1)=>{const{type:q,props:J,ref:N,children:K,dynamicChildren:D,shapeFlag:re,patchFlag:G,dirs:oe}=E;if(N!=null&&na(N,null,S,E,!0),re&256){w.ctx.deactivate(E);return}const ae=re&1&&oe,ce=!nr(E);let ke;if(ce&&(ke=J&&J.onVnodeBeforeUnmount)&&Et(ke,w,E),re&6)zt(E.component,S,O);else{if(re&128){E.suspense.unmount(S,O);return}ae&&Zt(E,null,w,"beforeUnmount"),re&64?E.type.remove(E,w,S,M,W,O):D&&(q!==nt||G>0&&G&64)?Le(D,w,S,!1,!0):(q===nt&&G&384||!M&&re&16)&&Le(K,w,S),O&&Lt(E)}(ce&&(ke=J&&J.onVnodeUnmounted)||ae)&&et(()=>{ke&&Et(ke,w,E),ae&&Zt(E,null,w,"unmounted")},S)},Lt=E=>{const{type:w,el:S,anchor:O,transition:M}=E;if(w===nt){vt(S,O);return}if(w===zo){F(E);return}const q=()=>{o(S),M&&!M.persisted&&M.afterLeave&&M.afterLeave()};if(E.shapeFlag&1&&M&&!M.persisted){const{leave:J,delayLeave:N}=M,K=()=>J(S,q);N?N(E.el,q,K):K()}else q()},vt=(E,w)=>{let S;for(;E!==w;)S=h(E),o(E),E=S;o(w)},zt=(E,w,S)=>{const{bum:O,scope:M,update:q,subTree:J,um:N}=E;O&&To(O),M.stop(),q&&(q.active=!1,qe(J,E,w,S)),N&&et(N,w),et(()=>{E.isUnmounted=!0},w),w&&w.pendingBranch&&!w.isUnmounted&&E.asyncDep&&!E.asyncResolved&&E.suspenseId===w.pendingId&&(w.deps--,w.deps===0&&w.resolve())},Le=(E,w,S,O=!1,M=!1,q=0)=>{for(let J=q;J<E.length;J++)qe(E[J],w,S,O,M)},j=E=>E.shapeFlag&6?j(E.component.subTree):E.shapeFlag&128?E.suspense.next():h(E.anchor||E.el),Z=(E,w,S)=>{E==null?w._vnode&&qe(w._vnode,null,null,!0):C(w._vnode||null,E,w,null,null,null,S),Ci(),Kl(),w._vnode=E},W={p:C,um:qe,m:Ke,r:Lt,mt:Re,mc:Xe,pc:fe,pbc:ue,n:j,o:e};let ne,he;return t&&([ne,he]=t(W)),{render:Z,hydrate:ne,createApp:ku(Z,ne)}}function Jt({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function us(e,t,n=!1){const r=e.children,o=t.children;if(le(r)&&le(o))for(let c=0;c<r.length;c++){const d=r[c];let f=o[c];f.shapeFlag&1&&!f.dynamicChildren&&((f.patchFlag<=0||f.patchFlag===32)&&(f=o[c]=Ht(o[c]),f.el=d.el),n||us(d,f)),f.type===io&&(f.el=d.el)}}function Tu(e){const t=e.slice(),n=[0];let r,o,c,d,f;const y=e.length;for(r=0;r<y;r++){const m=e[r];if(m!==0){if(o=n[n.length-1],e[o]<m){t[r]=o,n.push(r);continue}for(c=0,d=n.length-1;c<d;)f=c+d>>1,e[n[f]]<m?c=f+1:d=f;m<e[n[c]]&&(c>0&&(t[r]=n[c-1]),n[c]=r)}}for(c=n.length,d=n[c-1];c-- >0;)n[c]=d,d=t[d];return n}const Ru=e=>e.__isTeleport,nt=Symbol.for("v-fgt"),io=Symbol.for("v-txt"),Vt=Symbol.for("v-cmt"),zo=Symbol.for("v-stc"),or=[];let ht=null;function xe(e=!1){or.push(ht=e?null:[])}function Pu(){or.pop(),ht=or[or.length-1]||null}let ur=1;function zi(e){ur+=e}function fs(e){return e.dynamicChildren=ur>0?ht||pn:null,Pu(),ur>0&&ht&&ht.push(e),e}function Ue(e,t,n,r,o,c){return fs(Te(e,t,n,r,o,c,!0))}function at(e,t,n,r,o){return fs(H(e,t,n,r,o,!0))}function Kr(e){return e?e.__v_isVNode===!0:!1}function $n(e,t){return e.type===t.type&&e.key===t.key}const lo="__vInternal",As=({key:e})=>e??null,zr=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?Me(e)||$e(e)||se(e)?{i:Je,r:e,k:t,f:!!n}:e:null);function Te(e,t=null,n=null,r=0,o=null,c=e===nt?0:1,d=!1,f=!1){const y={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&As(t),ref:t&&zr(t),scopeId:$l,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:c,patchFlag:r,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:Je};return f?(La(y,n),c&128&&e.normalize(y)):n&&(y.shapeFlag|=Me(n)?8:16),ur>0&&!d&&ht&&(y.patchFlag>0||c&6)&&y.patchFlag!==32&&ht.push(y),y}const H=ju;function ju(e,t=null,n=null,r=0,o=null,c=!1){if((!e||e===Au)&&(e=Vt),Kr(e)){const f=hn(e,t,!0);return n&&La(f,n),ur>0&&!c&&ht&&(f.shapeFlag&6?ht[ht.indexOf(e)]=f:ht.push(f)),f.patchFlag|=-2,f}if(Ku(e)&&(e=e.__vccOpts),t){t=zu(t);let{class:f,style:y}=t;f&&!Me(f)&&(t.class=sr(f)),_e(y)&&(Ml(y)&&!le(y)&&(y=Ne({},y)),t.style=eo(y))}const d=Me(e)?1:eu(e)?128:Ru(e)?64:_e(e)?4:se(e)?2:0;return Te(e,t,n,r,o,d,c,!0)}function zu(e){return e?Ml(e)||lo in e?Ne({},e):e:null}function hn(e,t,n=!1){const{props:r,ref:o,patchFlag:c,children:d}=e,f=t?Mu(r||{},t):r;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:f,key:f&&As(f),ref:t&&t.ref?n&&o?le(o)?o.concat(zr(t)):[o,zr(t)]:zr(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:d,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==nt?c===-1?16:c|16:c,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&hn(e.ssContent),ssFallback:e.ssFallback&&hn(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function ys(e=" ",t=0){return H(io,null,e,t)}function Qr(e="",t=!1){return t?(xe(),at(Vt,null,e)):H(Vt,null,e)}function wt(e){return e==null||typeof e=="boolean"?H(Vt):le(e)?H(nt,null,e.slice()):typeof e=="object"?Ht(e):H(io,null,String(e))}function Ht(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:hn(e)}function La(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(le(t))n=16;else if(typeof t=="object")if(r&65){const o=t.default;o&&(o._c&&(o._d=!1),La(e,o()),o._c&&(o._d=!0));return}else{n=32;const o=t._;!o&&!(lo in t)?t._ctx=Je:o===3&&Je&&(Je.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else se(t)?(t={default:t,_ctx:Je},n=32):(t=String(t),r&64?(n=16,t=[ys(t)]):n=8);e.children=t,e.shapeFlag|=n}function Mu(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const o in r)if(o==="class")t.class!==r.class&&(t.class=sr([t.class,r.class]));else if(o==="style")t.style=eo([t.style,r.style]);else if(Zr(o)){const c=t[o],d=r[o];d&&c!==d&&!(le(c)&&c.includes(d))&&(t[o]=c?[].concat(c,d):d)}else o!==""&&(t[o]=r[o])}return t}function Et(e,t,n,r=null){bt(e,t,7,[n,r])}const Du=is();let qu=0;function Fu(e,t,n){const r=e.type,o=(t?t.appContext:e.appContext)||Du,c={uid:qu++,vnode:e,type:r,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,scope:new dp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:ss(r,o),emitsOptions:Vl(r,o),emit:null,emitted:null,propsDefaults:Ie,inheritAttrs:r.inheritAttrs,ctx:Ie,data:Ie,props:Ie,attrs:Ie,slots:Ie,refs:Ie,setupState:Ie,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return c.ctx={_:c},c.root=t?t.root:c,c.emit=$p.bind(null,c),e.ce&&e.ce(c),c}let He=null,Ia,sn,Mi="__VUE_INSTANCE_SETTERS__";(sn=Ko()[Mi])||(sn=Ko()[Mi]=[]),sn.push(e=>He=e),Ia=e=>{sn.length>1?sn.forEach(t=>t(e)):sn[0](e)};const mn=e=>{Ia(e),e.scope.on()},tn=()=>{He&&He.scope.off(),Ia(null)};function hs(e){return e.vnode.shapeFlag&4}let fr=!1;function Nu(e,t=!1){fr=t;const{props:n,children:r}=e.vnode,o=hs(e);Cu(e,n,o,t),Lu(e,r);const c=o?Uu(e,t):void 0;return fr=!1,c}function Uu(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=Dl(new Proxy(e.ctx,mu));const{setup:r}=n;if(r){const o=e.setupContext=r.length>1?Wu(e):null;mn(e),En();const c=Kt(r,e,0,[e.props,o]);if(wn(),tn(),vl(c)){if(c.then(tn,tn),t)return c.then(d=>{Di(e,d,t)}).catch(d=>{ro(d,e,0)});e.asyncDep=c}else Di(e,c,t)}else ms(e,t)}function Di(e,t,n){se(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:_e(t)&&(e.setupState=Ul(t)),ms(e,n)}let qi;function ms(e,t,n){const r=e.type;if(!e.render){if(!t&&qi&&!r.render){const o=r.template||Ba(e).template;if(o){const{isCustomElement:c,compilerOptions:d}=e.appContext.config,{delimiters:f,compilerOptions:y}=r,m=Ne(Ne({isCustomElement:c,delimiters:f},d),y);r.render=qi(o,m)}}e.render=r.render||mt}mn(e),En(),bu(e),wn(),tn()}function Hu(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,n){return rt(e,"get","$attrs"),t[n]}}))}function Wu(e){const t=n=>{e.exposed=n||{}};return{get attrs(){return Hu(e)},slots:e.slots,emit:e.emit,expose:t}}function _a(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Ul(Dl(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in rr)return rr[n](e)},has(t,n){return n in t||n in rr}}))}function Yu(e,t=!0){return se(e)?e.displayName||e.name:e.name||t&&e.__name}function Ku(e){return se(e)&&"__vccOpts"in e}const yt=(e,t)=>Hp(e,t,fr);function bs(e,t,n){const r=arguments.length;return r===2?_e(t)&&!le(t)?Kr(t)?H(e,null,[t]):H(e,t):H(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Kr(n)&&(n=[n]),H(e,t,n))}const Qu=Symbol.for("v-scx"),Vu=()=>st(Qu),$u="3.3.4",Zu="http://www.w3.org/2000/svg",Gt=typeof document<"u"?document:null,Fi=Gt&&Gt.createElement("template"),Ju={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const o=t?Gt.createElementNS(Zu,e):Gt.createElement(e,n?{is:n}:void 0);return e==="select"&&r&&r.multiple!=null&&o.setAttribute("multiple",r.multiple),o},createText:e=>Gt.createTextNode(e),createComment:e=>Gt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Gt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,o,c){const d=n?n.previousSibling:t.lastChild;if(o&&(o===c||o.nextSibling))for(;t.insertBefore(o.cloneNode(!0),n),!(o===c||!(o=o.nextSibling)););else{Fi.innerHTML=r?`<svg>${e}</svg>`:e;const f=Fi.content;if(r){const y=f.firstChild;for(;y.firstChild;)f.appendChild(y.firstChild);f.removeChild(y)}t.insertBefore(f,n)}return[d?d.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function Xu(e,t,n){const r=e._vtc;r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function Gu(e,t,n){const r=e.style,o=Me(n);if(n&&!o){if(t&&!Me(t))for(const c in t)n[c]==null&&ra(r,c,"");for(const c in n)ra(r,c,n[c])}else{const c=r.display;o?t!==n&&(r.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(r.display=c)}}const Ni=/\s*!important$/;function ra(e,t,n){if(le(n))n.forEach(r=>ra(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=ef(e,t);Ni.test(n)?e.setProperty(xn(r),n.replace(Ni,""),"important"):e[r]=n}}const Ui=["Webkit","Moz","ms"],Mo={};function ef(e,t){const n=Mo[t];if(n)return n;let r=Bt(t);if(r!=="filter"&&r in e)return Mo[t]=r;r=Gr(r);for(let o=0;o<Ui.length;o++){const c=Ui[o]+r;if(c in e)return Mo[t]=c}return t}const Hi="http://www.w3.org/1999/xlink";function tf(e,t,n,r,o){if(r&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(Hi,t.slice(6,t.length)):e.setAttributeNS(Hi,t,n);else{const c=cp(t);n==null||c&&!wl(n)?e.removeAttribute(t):e.setAttribute(t,c?"":n)}}function nf(e,t,n,r,o,c,d){if(t==="innerHTML"||t==="textContent"){r&&d(r,o,c),e[t]=n??"";return}const f=e.tagName;if(t==="value"&&f!=="PROGRESS"&&!f.includes("-")){e._value=n;const m=f==="OPTION"?e.getAttribute("value"):e.value,b=n??"";m!==b&&(e.value=b),n==null&&e.removeAttribute(t);return}let y=!1;if(n===""||n==null){const m=typeof e[t];m==="boolean"?n=wl(n):n==null&&m==="string"?(n="",y=!0):m==="number"&&(n=0,y=!0)}try{e[t]=n}catch{}y&&e.removeAttribute(t)}function rf(e,t,n,r){e.addEventListener(t,n,r)}function of(e,t,n,r){e.removeEventListener(t,n,r)}function af(e,t,n,r,o=null){const c=e._vei||(e._vei={}),d=c[t];if(r&&d)d.value=r;else{const[f,y]=lf(t);if(r){const m=c[t]=df(r,o);rf(e,f,m,y)}else d&&(of(e,f,d,y),c[t]=void 0)}}const Wi=/(?:Once|Passive|Capture)$/;function lf(e){let t;if(Wi.test(e)){t={};let r;for(;r=e.match(Wi);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):xn(e.slice(2)),t]}let Do=0;const sf=Promise.resolve(),cf=()=>Do||(sf.then(()=>Do=0),Do=Date.now());function df(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;bt(pf(r,n.value),t,5,[r])};return n.value=e,n.attached=cf(),n}function pf(e,t){if(le(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>o=>!o._stopped&&r&&r(o))}else return t}const Yi=/^on[a-z]/,uf=(e,t,n,r,o=!1,c,d,f,y)=>{t==="class"?Xu(e,r,o):t==="style"?Gu(e,n,r):Zr(t)?ua(t)||af(e,t,n,r,d):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):ff(e,t,r,o))?nf(e,t,r,c,d,f,y):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),tf(e,t,r,o))};function ff(e,t,n,r){return r?!!(t==="innerHTML"||t==="textContent"||t in e&&Yi.test(t)&&se(n)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||Yi.test(t)&&Me(n)?!1:t in e}const Af=Ne({patchProp:uf},Ju);let Ki;function yf(){return Ki||(Ki=_u(Af))}const hf=(...e)=>{const t=yf().createApp(...e),{mount:n}=t;return t.mount=r=>{const o=mf(r);if(!o)return;const c=t._component;!se(c)&&!c.render&&!c.template&&(c.template=o.innerHTML),o.innerHTML="";const d=n(o,!1,o instanceof SVGElement);return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),d},t};function mf(e){return Me(e)?document.querySelector(e):e}const so=(e,t)=>{const n=e.__vccOpts||e;for(const[r,o]of t)n[r]=o;return n},bf={};function gf(e,t){const n=fu("router-view");return xe(),at(n)}const vf=so(bf,[["render",gf]]);/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const cn=typeof window<"u";function xf(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const we=Object.assign;function qo(e,t){const n={};for(const r in t){const o=t[r];n[r]=gt(o)?o.map(e):e(o)}return n}const ar=()=>{},gt=Array.isArray,Ef=/\/$/,wf=e=>e.replace(Ef,"");function Fo(e,t,n="/"){let r,o={},c="",d="";const f=t.indexOf("#");let y=t.indexOf("?");return f<y&&f>=0&&(y=-1),y>-1&&(r=t.slice(0,y),c=t.slice(y+1,f>-1?f:t.length),o=e(c)),f>-1&&(r=r||t.slice(0,f),d=t.slice(f,t.length)),r=Sf(r??t,n),{fullPath:r+(c&&"?")+c+d,path:r,query:o,hash:d}}function kf(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function Qi(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function Cf(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&bn(t.matched[r],n.matched[o])&&gs(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function bn(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function gs(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!Bf(e[n],t[n]))return!1;return!0}function Bf(e,t){return gt(e)?Vi(e,t):gt(t)?Vi(t,e):e===t}function Vi(e,t){return gt(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function Sf(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];(o===".."||o===".")&&r.push("");let c=n.length-1,d,f;for(d=0;d<r.length;d++)if(f=r[d],f!==".")if(f==="..")c>1&&c--;else break;return n.slice(0,c).join("/")+"/"+r.slice(d-(d===r.length?1:0)).join("/")}var Ar;(function(e){e.pop="pop",e.push="push"})(Ar||(Ar={}));var ir;(function(e){e.back="back",e.forward="forward",e.unknown=""})(ir||(ir={}));function Lf(e){if(!e)if(cn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),wf(e)}const If=/^[^#]+#/;function _f(e,t){return e.replace(If,"#")+t}function Of(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const co=()=>({left:window.pageXOffset,top:window.pageYOffset});function Tf(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=Of(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function $i(e,t){return(history.state?history.state.position-t:-1)+e}const oa=new Map;function Rf(e,t){oa.set(e,t)}function Pf(e){const t=oa.get(e);return oa.delete(e),t}let jf=()=>location.protocol+"//"+location.host;function vs(e,t){const{pathname:n,search:r,hash:o}=t,c=e.indexOf("#");if(c>-1){let f=o.includes(e.slice(c))?e.slice(c).length:1,y=o.slice(f);return y[0]!=="/"&&(y="/"+y),Qi(y,"")}return Qi(n,e)+r+o}function zf(e,t,n,r){let o=[],c=[],d=null;const f=({state:h})=>{const k=vs(e,location),B=n.value,C=t.value;let I=0;if(h){if(n.value=k,t.value=h,d&&d===B){d=null;return}I=C?h.position-C.position:0}else r(k);o.forEach(z=>{z(n.value,B,{delta:I,type:Ar.pop,direction:I?I>0?ir.forward:ir.back:ir.unknown})})};function y(){d=n.value}function m(h){o.push(h);const k=()=>{const B=o.indexOf(h);B>-1&&o.splice(B,1)};return c.push(k),k}function b(){const{history:h}=window;h.state&&h.replaceState(we({},h.state,{scroll:co()}),"")}function x(){for(const h of c)h();c=[],window.removeEventListener("popstate",f),window.removeEventListener("beforeunload",b)}return window.addEventListener("popstate",f),window.addEventListener("beforeunload",b,{passive:!0}),{pauseListeners:y,listen:m,destroy:x}}function Zi(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?co():null}}function Mf(e){const{history:t,location:n}=window,r={value:vs(e,n)},o={value:t.state};o.value||c(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function c(y,m,b){const x=e.indexOf("#"),h=x>-1?(n.host&&document.querySelector("base")?e:e.slice(x))+y:jf()+e+y;try{t[b?"replaceState":"pushState"](m,"",h),o.value=m}catch(k){console.error(k),n[b?"replace":"assign"](h)}}function d(y,m){const b=we({},t.state,Zi(o.value.back,y,o.value.forward,!0),m,{position:o.value.position});c(y,b,!0),r.value=y}function f(y,m){const b=we({},o.value,t.state,{forward:y,scroll:co()});c(b.current,b,!0);const x=we({},Zi(r.value,y,null),{position:b.position+1},m);c(y,x,!1),r.value=y}return{location:r,state:o,push:f,replace:d}}function Df(e){e=Lf(e);const t=Mf(e),n=zf(e,t.state,t.location,t.replace);function r(c,d=!0){d||n.pauseListeners(),history.go(c)}const o=we({location:"",base:e,go:r,createHref:_f.bind(null,e)},t,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>t.state.value}),o}function qf(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),Df(e)}function Ff(e){return typeof e=="string"||e&&typeof e=="object"}function xs(e){return typeof e=="string"||typeof e=="symbol"}const Nt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Es=Symbol("");var Ji;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(Ji||(Ji={}));function gn(e,t){return we(new Error,{type:e,[Es]:!0},t)}function Ot(e,t){return e instanceof Error&&Es in e&&(t==null||!!(e.type&t))}const Xi="[^/]+?",Nf={sensitive:!1,strict:!1,start:!0,end:!0},Uf=/[.+*?^${}()[\]/\\]/g;function Hf(e,t){const n=we({},Nf,t),r=[];let o=n.start?"^":"";const c=[];for(const m of e){const b=m.length?[]:[90];n.strict&&!m.length&&(o+="/");for(let x=0;x<m.length;x++){const h=m[x];let k=40+(n.sensitive?.25:0);if(h.type===0)x||(o+="/"),o+=h.value.replace(Uf,"\\$&"),k+=40;else if(h.type===1){const{value:B,repeatable:C,optional:I,regexp:z}=h;c.push({name:B,repeatable:C,optional:I});const T=z||Xi;if(T!==Xi){k+=10;try{new RegExp(`(${T})`)}catch(F){throw new Error(`Invalid custom RegExp for param "${B}" (${T}): `+F.message)}}let V=C?`((?:${T})(?:/(?:${T}))*)`:`(${T})`;x||(V=I&&m.length<2?`(?:/${V})`:"/"+V),I&&(V+="?"),o+=V,k+=20,I&&(k+=-8),C&&(k+=-20),T===".*"&&(k+=-50)}b.push(k)}r.push(b)}if(n.strict&&n.end){const m=r.length-1;r[m][r[m].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const d=new RegExp(o,n.sensitive?"":"i");function f(m){const b=m.match(d),x={};if(!b)return null;for(let h=1;h<b.length;h++){const k=b[h]||"",B=c[h-1];x[B.name]=k&&B.repeatable?k.split("/"):k}return x}function y(m){let b="",x=!1;for(const h of e){(!x||!b.endsWith("/"))&&(b+="/"),x=!1;for(const k of h)if(k.type===0)b+=k.value;else if(k.type===1){const{value:B,repeatable:C,optional:I}=k,z=B in m?m[B]:"";if(gt(z)&&!C)throw new Error(`Provided param "${B}" is an array but it is not repeatable (* or + modifiers)`);const T=gt(z)?z.join("/"):z;if(!T)if(I)h.length<2&&(b.endsWith("/")?b=b.slice(0,-1):x=!0);else throw new Error(`Missing required param "${B}"`);b+=T}}return b||"/"}return{re:d,score:r,keys:c,parse:f,stringify:y}}function Wf(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===40+40?-1:1:e.length>t.length?t.length===1&&t[0]===40+40?1:-1:0}function Yf(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const c=Wf(r[n],o[n]);if(c)return c;n++}if(Math.abs(o.length-r.length)===1){if(Gi(r))return 1;if(Gi(o))return-1}return o.length-r.length}function Gi(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Kf={type:0,value:""},Qf=/[a-zA-Z0-9_]/;function Vf(e){if(!e)return[[]];if(e==="/")return[[Kf]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(k){throw new Error(`ERR (${n})/"${m}": ${k}`)}let n=0,r=n;const o=[];let c;function d(){c&&o.push(c),c=[]}let f=0,y,m="",b="";function x(){m&&(n===0?c.push({type:0,value:m}):n===1||n===2||n===3?(c.length>1&&(y==="*"||y==="+")&&t(`A repeatable param (${m}) must be alone in its segment. eg: '/:ids+.`),c.push({type:1,value:m,regexp:b,repeatable:y==="*"||y==="+",optional:y==="*"||y==="?"})):t("Invalid state to consume buffer"),m="")}function h(){m+=y}for(;f<e.length;){if(y=e[f++],y==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:y==="/"?(m&&x(),d()):y===":"?(x(),n=1):h();break;case 4:h(),n=r;break;case 1:y==="("?n=2:Qf.test(y)?h():(x(),n=0,y!=="*"&&y!=="?"&&y!=="+"&&f--);break;case 2:y===")"?b[b.length-1]=="\\"?b=b.slice(0,-1)+y:n=3:b+=y;break;case 3:x(),n=0,y!=="*"&&y!=="?"&&y!=="+"&&f--,b="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${m}"`),x(),d(),o}function $f(e,t,n){const r=Hf(Vf(e.path),n),o=we(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function Zf(e,t){const n=[],r=new Map;t=nl({strict:!1,end:!0,sensitive:!1},t);function o(b){return r.get(b)}function c(b,x,h){const k=!h,B=Jf(b);B.aliasOf=h&&h.record;const C=nl(t,b),I=[B];if("alias"in b){const V=typeof b.alias=="string"?[b.alias]:b.alias;for(const F of V)I.push(we({},B,{components:h?h.record.components:B.components,path:F,aliasOf:h?h.record:B}))}let z,T;for(const V of I){const{path:F}=V;if(x&&F[0]!=="/"){const Ee=x.record.path,Se=Ee[Ee.length-1]==="/"?"":"/";V.path=x.record.path+(F&&Se+F)}if(z=$f(V,x,C),h?h.alias.push(z):(T=T||z,T!==z&&T.alias.push(z),k&&b.name&&!tl(z)&&d(b.name)),B.children){const Ee=B.children;for(let Se=0;Se<Ee.length;Se++)c(Ee[Se],z,h&&h.children[Se])}h=h||z,(z.record.components&&Object.keys(z.record.components).length||z.record.name||z.record.redirect)&&y(z)}return T?()=>{d(T)}:ar}function d(b){if(xs(b)){const x=r.get(b);x&&(r.delete(b),n.splice(n.indexOf(x),1),x.children.forEach(d),x.alias.forEach(d))}else{const x=n.indexOf(b);x>-1&&(n.splice(x,1),b.record.name&&r.delete(b.record.name),b.children.forEach(d),b.alias.forEach(d))}}function f(){return n}function y(b){let x=0;for(;x<n.length&&Yf(b,n[x])>=0&&(b.record.path!==n[x].record.path||!ws(b,n[x]));)x++;n.splice(x,0,b),b.record.name&&!tl(b)&&r.set(b.record.name,b)}function m(b,x){let h,k={},B,C;if("name"in b&&b.name){if(h=r.get(b.name),!h)throw gn(1,{location:b});C=h.record.name,k=we(el(x.params,h.keys.filter(T=>!T.optional).map(T=>T.name)),b.params&&el(b.params,h.keys.map(T=>T.name))),B=h.stringify(k)}else if("path"in b)B=b.path,h=n.find(T=>T.re.test(B)),h&&(k=h.parse(B),C=h.record.name);else{if(h=x.name?r.get(x.name):n.find(T=>T.re.test(x.path)),!h)throw gn(1,{location:b,currentLocation:x});C=h.record.name,k=we({},x.params,b.params),B=h.stringify(k)}const I=[];let z=h;for(;z;)I.unshift(z.record),z=z.parent;return{name:C,path:B,params:k,matched:I,meta:Gf(I)}}return e.forEach(b=>c(b)),{addRoute:c,resolve:m,removeRoute:d,getRoutes:f,getRecordMatcher:o}}function el(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function Jf(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:Xf(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function Xf(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function tl(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Gf(e){return e.reduce((t,n)=>we(t,n.meta),{})}function nl(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function ws(e,t){return t.children.some(n=>n===e||ws(e,n))}const ks=/#/g,eA=/&/g,tA=/\//g,nA=/=/g,rA=/\?/g,Cs=/\+/g,oA=/%5B/g,aA=/%5D/g,Bs=/%5E/g,iA=/%60/g,Ss=/%7B/g,lA=/%7C/g,Ls=/%7D/g,sA=/%20/g;function Oa(e){return encodeURI(""+e).replace(lA,"|").replace(oA,"[").replace(aA,"]")}function cA(e){return Oa(e).replace(Ss,"{").replace(Ls,"}").replace(Bs,"^")}function aa(e){return Oa(e).replace(Cs,"%2B").replace(sA,"+").replace(ks,"%23").replace(eA,"%26").replace(iA,"`").replace(Ss,"{").replace(Ls,"}").replace(Bs,"^")}function dA(e){return aa(e).replace(nA,"%3D")}function pA(e){return Oa(e).replace(ks,"%23").replace(rA,"%3F")}function uA(e){return e==null?"":pA(e).replace(tA,"%2F")}function Vr(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function fA(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<r.length;++o){const c=r[o].replace(Cs," "),d=c.indexOf("="),f=Vr(d<0?c:c.slice(0,d)),y=d<0?null:Vr(c.slice(d+1));if(f in t){let m=t[f];gt(m)||(m=t[f]=[m]),m.push(y)}else t[f]=y}return t}function rl(e){let t="";for(let n in e){const r=e[n];if(n=dA(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(gt(r)?r.map(c=>c&&aa(c)):[r&&aa(r)]).forEach(c=>{c!==void 0&&(t+=(t.length?"&":"")+n,c!=null&&(t+="="+c))})}return t}function AA(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=gt(r)?r.map(o=>o==null?null:""+o):r==null?r:""+r)}return t}const yA=Symbol(""),ol=Symbol(""),po=Symbol(""),Ta=Symbol(""),ia=Symbol("");function Zn(){let e=[];function t(r){return e.push(r),()=>{const o=e.indexOf(r);o>-1&&e.splice(o,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function Wt(e,t,n,r,o){const c=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise((d,f)=>{const y=x=>{x===!1?f(gn(4,{from:n,to:t})):x instanceof Error?f(x):Ff(x)?f(gn(2,{from:t,to:x})):(c&&r.enterCallbacks[o]===c&&typeof x=="function"&&c.push(x),d())},m=e.call(r&&r.instances[o],t,n,y);let b=Promise.resolve(m);e.length<3&&(b=b.then(y)),b.catch(x=>f(x))})}function No(e,t,n,r){const o=[];for(const c of e)for(const d in c.components){let f=c.components[d];if(!(t!=="beforeRouteEnter"&&!c.instances[d]))if(hA(f)){const m=(f.__vccOpts||f)[t];m&&o.push(Wt(m,n,r,c,d))}else{let y=f();o.push(()=>y.then(m=>{if(!m)return Promise.reject(new Error(`Couldn't resolve component "${d}" at "${c.path}"`));const b=xf(m)?m.default:m;c.components[d]=b;const h=(b.__vccOpts||b)[t];return h&&Wt(h,n,r,c,d)()}))}}return o}function hA(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function al(e){const t=st(po),n=st(Ta),r=yt(()=>t.resolve(Fe(e.to))),o=yt(()=>{const{matched:y}=r.value,{length:m}=y,b=y[m-1],x=n.matched;if(!b||!x.length)return-1;const h=x.findIndex(bn.bind(null,b));if(h>-1)return h;const k=il(y[m-2]);return m>1&&il(b)===k&&x[x.length-1].path!==k?x.findIndex(bn.bind(null,y[m-2])):h}),c=yt(()=>o.value>-1&&vA(n.params,r.value.params)),d=yt(()=>o.value>-1&&o.value===n.matched.length-1&&gs(n.params,r.value.params));function f(y={}){return gA(y)?t[Fe(e.replace)?"replace":"push"](Fe(e.to)).catch(ar):Promise.resolve()}return{route:r,href:yt(()=>r.value.href),isActive:c,isExactActive:d,navigate:f}}const mA=Gl({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:al,setup(e,{slots:t}){const n=no(al(e)),{options:r}=st(po),o=yt(()=>({[ll(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[ll(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const c=t.default&&t.default(n);return e.custom?c:bs("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},c)}}}),bA=mA;function gA(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function vA(e,t){for(const n in t){const r=t[n],o=e[n];if(typeof r=="string"){if(r!==o)return!1}else if(!gt(o)||o.length!==r.length||r.some((c,d)=>c!==o[d]))return!1}return!0}function il(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const ll=(e,t,n)=>e??t??n,xA=Gl({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=st(ia),o=yt(()=>e.route||r.value),c=st(ol,0),d=yt(()=>{let m=Fe(c);const{matched:b}=o.value;let x;for(;(x=b[m])&&!x.components;)m++;return m}),f=yt(()=>o.value.matched[d.value]);jr(ol,yt(()=>d.value+1)),jr(yA,f),jr(ia,o);const y=tt();return tr(()=>[y.value,f.value,e.name],([m,b,x],[h,k,B])=>{b&&(b.instances[x]=m,k&&k!==b&&m&&m===h&&(b.leaveGuards.size||(b.leaveGuards=k.leaveGuards),b.updateGuards.size||(b.updateGuards=k.updateGuards))),m&&b&&(!k||!bn(b,k)||!h)&&(b.enterCallbacks[x]||[]).forEach(C=>C(m))},{flush:"post"}),()=>{const m=o.value,b=e.name,x=f.value,h=x&&x.components[b];if(!h)return sl(n.default,{Component:h,route:m});const k=x.props[b],B=k?k===!0?m.params:typeof k=="function"?k(m):k:null,I=bs(h,we({},B,t,{onVnodeUnmounted:z=>{z.component.isUnmounted&&(x.instances[b]=null)},ref:y}));return sl(n.default,{Component:I,route:m})||I}}});function sl(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const EA=xA;function wA(e){const t=Zf(e.routes,e),n=e.parseQuery||fA,r=e.stringifyQuery||rl,o=e.history,c=Zn(),d=Zn(),f=Zn(),y=qp(Nt);let m=Nt;cn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const b=qo.bind(null,j=>""+j),x=qo.bind(null,uA),h=qo.bind(null,Vr);function k(j,Z){let W,ne;return xs(j)?(W=t.getRecordMatcher(j),ne=Z):ne=j,t.addRoute(ne,W)}function B(j){const Z=t.getRecordMatcher(j);Z&&t.removeRoute(Z)}function C(){return t.getRoutes().map(j=>j.record)}function I(j){return!!t.getRecordMatcher(j)}function z(j,Z){if(Z=we({},Z||y.value),typeof j=="string"){const S=Fo(n,j,Z.path),O=t.resolve({path:S.path},Z),M=o.createHref(S.fullPath);return we(S,O,{params:h(O.params),hash:Vr(S.hash),redirectedFrom:void 0,href:M})}let W;if("path"in j)W=we({},j,{path:Fo(n,j.path,Z.path).path});else{const S=we({},j.params);for(const O in S)S[O]==null&&delete S[O];W=we({},j,{params:x(S)}),Z.params=x(Z.params)}const ne=t.resolve(W,Z),he=j.hash||"";ne.params=b(h(ne.params));const E=kf(r,we({},j,{hash:cA(he),path:ne.path})),w=o.createHref(E);return we({fullPath:E,hash:he,query:r===rl?AA(j.query):j.query||{}},ne,{redirectedFrom:void 0,href:w})}function T(j){return typeof j=="string"?Fo(n,j,y.value.path):we({},j)}function V(j,Z){if(m!==j)return gn(8,{from:Z,to:j})}function F(j){return We(j)}function Ee(j){return F(we(T(j),{replace:!0}))}function Se(j){const Z=j.matched[j.matched.length-1];if(Z&&Z.redirect){const{redirect:W}=Z;let ne=typeof W=="function"?W(j):W;return typeof ne=="string"&&(ne=ne.includes("?")||ne.includes("#")?ne=T(ne):{path:ne},ne.params={}),we({query:j.query,hash:j.hash,params:"path"in ne?{}:j.params},ne)}}function We(j,Z){const W=m=z(j),ne=y.value,he=j.state,E=j.force,w=j.replace===!0,S=Se(W);if(S)return We(we(T(S),{state:typeof S=="object"?we({},he,S.state):he,force:E,replace:w}),Z||W);const O=W;O.redirectedFrom=Z;let M;return!E&&Cf(r,ne,W)&&(M=gn(16,{to:O,from:ne}),Ke(ne,ne,!0,!1)),(M?Promise.resolve(M):ue(O,ne)).catch(q=>Ot(q)?Ot(q,2)?q:pt(q):fe(q,O,ne)).then(q=>{if(q){if(Ot(q,2))return We(we({replace:w},T(q.to),{state:typeof q.to=="object"?we({},he,q.to.state):he,force:E}),Z||O)}else q=me(O,ne,!0,w,he);return Ge(O,ne,q),q})}function Xe(j,Z){const W=V(j,Z);return W?Promise.reject(W):Promise.resolve()}function it(j){const Z=vt.values().next().value;return Z&&typeof Z.runWithContext=="function"?Z.runWithContext(j):j()}function ue(j,Z){let W;const[ne,he,E]=kA(j,Z);W=No(ne.reverse(),"beforeRouteLeave",j,Z);for(const S of ne)S.leaveGuards.forEach(O=>{W.push(Wt(O,j,Z))});const w=Xe.bind(null,j,Z);return W.push(w),Le(W).then(()=>{W=[];for(const S of c.list())W.push(Wt(S,j,Z));return W.push(w),Le(W)}).then(()=>{W=No(he,"beforeRouteUpdate",j,Z);for(const S of he)S.updateGuards.forEach(O=>{W.push(Wt(O,j,Z))});return W.push(w),Le(W)}).then(()=>{W=[];for(const S of E)if(S.beforeEnter)if(gt(S.beforeEnter))for(const O of S.beforeEnter)W.push(Wt(O,j,Z));else W.push(Wt(S.beforeEnter,j,Z));return W.push(w),Le(W)}).then(()=>(j.matched.forEach(S=>S.enterCallbacks={}),W=No(E,"beforeRouteEnter",j,Z),W.push(w),Le(W))).then(()=>{W=[];for(const S of d.list())W.push(Wt(S,j,Z));return W.push(w),Le(W)}).catch(S=>Ot(S,8)?S:Promise.reject(S))}function Ge(j,Z,W){f.list().forEach(ne=>it(()=>ne(j,Z,W)))}function me(j,Z,W,ne,he){const E=V(j,Z);if(E)return E;const w=Z===Nt,S=cn?history.state:{};W&&(ne||w?o.replace(j.fullPath,we({scroll:w&&S&&S.scroll},he)):o.push(j.fullPath,he)),y.value=j,Ke(j,Z,W,w),pt()}let pe;function Re(){pe||(pe=o.listen((j,Z,W)=>{if(!zt.listening)return;const ne=z(j),he=Se(ne);if(he){We(we(he,{replace:!0}),ne).catch(ar);return}m=ne;const E=y.value;cn&&Rf($i(E.fullPath,W.delta),co()),ue(ne,E).catch(w=>Ot(w,12)?w:Ot(w,2)?(We(w.to,ne).then(S=>{Ot(S,20)&&!W.delta&&W.type===Ar.pop&&o.go(-1,!1)}).catch(ar),Promise.reject()):(W.delta&&o.go(-W.delta,!1),fe(w,ne,E))).then(w=>{w=w||me(ne,E,!1),w&&(W.delta&&!Ot(w,8)?o.go(-W.delta,!1):W.type===Ar.pop&&Ot(w,20)&&o.go(-1,!1)),Ge(ne,E,w)}).catch(ar)}))}let Ye=Zn(),Be=Zn(),be;function fe(j,Z,W){pt(j);const ne=Be.list();return ne.length?ne.forEach(he=>he(j,Z,W)):console.error(j),Promise.reject(j)}function te(){return be&&y.value!==Nt?Promise.resolve():new Promise((j,Z)=>{Ye.add([j,Z])})}function pt(j){return be||(be=!j,Re(),Ye.list().forEach(([Z,W])=>j?W(j):Z()),Ye.reset()),j}function Ke(j,Z,W,ne){const{scrollBehavior:he}=e;if(!cn||!he)return Promise.resolve();const E=!W&&Pf($i(j.fullPath,0))||(ne||!W)&&history.state&&history.state.scroll||null;return Wl().then(()=>he(j,Z,E)).then(w=>w&&Tf(w)).catch(w=>fe(w,j,Z))}const qe=j=>o.go(j);let Lt;const vt=new Set,zt={currentRoute:y,listening:!0,addRoute:k,removeRoute:B,hasRoute:I,getRoutes:C,resolve:z,options:e,push:F,replace:Ee,go:qe,back:()=>qe(-1),forward:()=>qe(1),beforeEach:c.add,beforeResolve:d.add,afterEach:f.add,onError:Be.add,isReady:te,install(j){const Z=this;j.component("RouterLink",bA),j.component("RouterView",EA),j.config.globalProperties.$router=Z,Object.defineProperty(j.config.globalProperties,"$route",{enumerable:!0,get:()=>Fe(y)}),cn&&!Lt&&y.value===Nt&&(Lt=!0,F(o.location).catch(he=>{}));const W={};for(const he in Nt)Object.defineProperty(W,he,{get:()=>y.value[he],enumerable:!0});j.provide(po,Z),j.provide(Ta,jl(W)),j.provide(ia,y);const ne=j.unmount;vt.add(j),j.unmount=function(){vt.delete(j),vt.size<1&&(m=Nt,pe&&pe(),pe=null,y.value=Nt,Lt=!1,be=!1),ne()}}};function Le(j){return j.reduce((Z,W)=>Z.then(()=>it(W)),Promise.resolve())}return zt}function kA(e,t){const n=[],r=[],o=[],c=Math.max(t.matched.length,e.matched.length);for(let d=0;d<c;d++){const f=t.matched[d];f&&(e.matched.find(m=>bn(m,f))?r.push(f):n.push(f));const y=e.matched[d];y&&(t.matched.find(m=>bn(m,y))||o.push(y))}return[n,r,o]}function CA(){return st(po)}function Ra(){return st(Ta)}var BA={size:"1em",strokeWidth:4,strokeLinecap:"round",strokeLinejoin:"round",rtl:!1,theme:"outline",colors:{outline:{fill:"#333",background:"transparent"},filled:{fill:"#333",background:"#FFF"},twoTone:{fill:"#333",twoTone:"#2F88FF"},multiColor:{outStrokeColor:"#333",outFillColor:"#2F88FF",innerStrokeColor:"#FFF",innerFillColor:"#43CCF8"}},prefix:"i"};function SA(){return"icon-"+((1+Math.random())*4294967296|0).toString(16).substring(1)}function LA(e,t,n){var r=typeof t.fill=="string"?[t.fill]:t.fill||[],o=[],c=t.theme||n.theme;switch(c){case"outline":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("none"),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("none");break;case"filled":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push("#FFF"),o.push("#FFF");break;case"two-tone":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.twoTone.twoTone),o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.twoTone.twoTone);break;case"multi-color":o.push(typeof r[0]=="string"?r[0]:"currentColor"),o.push(typeof r[1]=="string"?r[1]:n.colors.multiColor.outFillColor),o.push(typeof r[2]=="string"?r[2]:n.colors.multiColor.innerStrokeColor),o.push(typeof r[3]=="string"?r[3]:n.colors.multiColor.innerFillColor);break}return{size:t.size||n.size,strokeWidth:t.strokeWidth||n.strokeWidth,strokeLinecap:t.strokeLinecap||n.strokeLinecap,strokeLinejoin:t.strokeLinejoin||n.strokeLinejoin,colors:o,id:e}}var IA=Symbol("icon-context");function dt(e,t,n){var r={name:"icon-"+e,props:["size","strokeWidth","strokeLinecap","strokeLinejoin","theme","fill","spin"],setup:function(c){var d=SA(),f=st(IA,BA);return function(){var y=c.size,m=c.strokeWidth,b=c.strokeLinecap,x=c.strokeLinejoin,h=c.theme,k=c.fill,B=c.spin,C=LA(d,{size:y,strokeWidth:m,strokeLinecap:b,strokeLinejoin:x,theme:h,fill:k},f),I=[f.prefix+"-icon"];return I.push(f.prefix+"-icon-"+e),t&&f.rtl&&I.push(f.prefix+"-icon-rtl"),B&&I.push(f.prefix+"-icon-spin"),H("span",{class:I.join(" ")},[n(C)])}}};return r}const _A=dt("adobe-photoshop",!0,function(e){return H("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[H("path",{d:"M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth},null),H("path",{d:"M14 15V33",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M16 25C19 25 23 24.2 23 20C23 15.8 19 15 16 15H14V25H16Z",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M34 21.0246C33 21.0246 28 20.5266 28 24.0123C28 27.4979 34 26.5021 34 29.9877C34 33.4734 28 32.9754 28 32.9754",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),OA=dt("arrow-circle-left",!0,function(e){return H("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[H("path",{d:"M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M32.4917 24.5H14.4917",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M23.4917 15.5L14.4917 24.5L23.4917 33.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),TA=dt("arrow-circle-right",!0,function(e){return H("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[H("path",{d:"M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M14.4917 24.5H32.4917",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M23.4917 15.5L32.4917 24.5L23.4917 33.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),RA=dt("audio-file",!0,function(e){return H("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[H("path",{d:"M8 44V4H31L40 14.5V44H8Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M32 14L26 16.9688V31.5",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("circle",{cx:"20.5",cy:"31.5",r:"5.5",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),PA=dt("close",!1,function(e){return H("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[H("path",{d:"M8 8L40 40",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M8 40L40 8",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),jA=dt("file-code-one",!0,function(e){return H("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[H("path",{d:"M40 23V14L31 4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44H22",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M37 31L42 36L37 41",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M31 31L26 36L31 41",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M30 4V14H40",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),zA=dt("file-doc",!0,function(e){return H("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[H("path",{d:"M10 38V44H38V38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M38 20V14L30 4H10V20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M28 4V14H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M16 12H20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),H("rect",{x:"4",y:"20",width:"40",height:"18",rx:"2",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M10 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),H("path",{d:"M10 25H12C14.2091 25 16 26.7909 16 29V29C16 31.2091 14.2091 33 12 33H10",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("ellipse",{cx:"24",cy:"29",rx:"3",ry:"4",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M38 25H36C33.7909 25 32 26.7909 32 29V29C32 31.2091 33.7909 33 36 33H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),MA=dt("file-excel",!0,function(e){return H("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[H("path",{d:"M10 4H30L40 14V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M29 18H19V34H29",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M29 26H19",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),DA=dt("file-zip",!0,function(e){return H("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[H("path",{d:"M10 38V44H38V38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M38 20V14L30 4H10V20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M28 4V14H38",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M16 12H20",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),H("rect",{x:"4",y:"20",width:"40",height:"18",rx:"2",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M11 25H17L11 33H17",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M24 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),H("path",{d:"M31 25V33",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),H("path",{d:"M31 25H34.5C35.8807 25 37 26.1193 37 27.5V27.5C37 28.8807 35.8807 30 34.5 30H31",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),qA=dt("image-files",!0,function(e){return H("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[H("path",{d:"M10 44H38C39.1046 44 40 43.1046 40 42V14H30V4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M30 4L40 14",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("circle",{cx:"18",cy:"17",r:"4",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M15 28V37H33V21L23.4894 31.5L15 28Z",fill:e.colors[3],stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])}),FA=dt("seo-folder",!0,function(e){return H("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[H("path",{d:"M5 8C5 6.89543 5.89543 6 7 6H19L24 12H41C42.1046 12 43 12.8954 43 14V40C43 41.1046 42.1046 42 41 42H7C5.89543 42 5 41.1046 5 40V8Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M14 22L19 27L14 32",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M26 32H34",stroke:e.colors[2],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null)])}),NA=dt("video-two",!0,function(e){return H("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[H("path",{d:"M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M20.5 28V21.9378L25.75 24.9689L31 28L25.75 31.0311L20.5 34.0622V28Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M6 15H42",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M33 6L27 15",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),H("path",{d:"M21 6L15 15",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])});const UA={class:"box"},HA={style:{"background-color":"#f6f6f6"}},WA=["onClick"],YA={key:1,class:"file-name",style:{"text-align":"center"}},KA=["onClick"],QA={key:2,class:"file-name"},VA={key:0,style:{height:"6rem","text-align":"center","line-height":"6rem"}},$A={__name:"InfoTable",props:{tableData:{type:Array,default:[]},tableHead:{type:Array,default:[]},showMax:{type:Number,default:99999}},emits:["clickFile","copyUrl"],setup(e,{emit:t}){const n=e,r=tt(!1),o=tt([]),c=[".MP4",".AVI",".MOV",".FLV",".MKV"],d=[".JPG",".JPEG",".PNG",".WEBP"],f=[".PSD"],y=[".RAR",".ZIP",".7Z"],m=[".WAV",".MP3",".OGG"],b=[".DOC",".DOCX"],x=[".XLS",".XLSX"];hr(()=>{o.value=n.tableData.slice(0,n.showMax)});const h=B=>{t("clickFile",B)},k=B=>{t("copyUrl",B)};return tr(()=>n.tableData,()=>{r.value=!1,n.tableData.length>n.showMax?o.value=n.tableData.slice(0,n.showMax):o.value=n.tableData}),(B,C)=>(xe(),Ue("div",UA,[Te("table",null,[Te("tr",HA,[(xe(!0),Ue(nt,null,Po(e.tableHead,I=>(xe(),Ue("th",{class:sr({bgRed:I.bgColor==="red",bgGreen:I.bgColor==="green",textRed:I.textColor==="red",textGreen:I.textColor==="green"}),style:eo({width:I.width})},er(I.span),7))),256))]),(xe(!0),Ue(nt,null,Po(o.value,(I,z)=>(xe(),Ue("tr",null,[(xe(!0),Ue(nt,null,Po(e.tableHead,T=>(xe(),Ue("td",{class:sr({textRed:T.textColor==="red",textGreen:T.textColor==="green"})},[T.prop==="name"?(xe(),Ue("div",{key:0,class:"file-name",onClick:V=>h(z)},[c.includes(I.suffix.toUpperCase())?(xe(),at(Fe(NA),{key:0,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):d.includes(I.suffix.toUpperCase())?(xe(),at(Fe(qA),{key:1,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):y.includes(I.suffix.toUpperCase())?(xe(),at(Fe(DA),{key:2,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):m.includes(I.suffix.toUpperCase())?(xe(),at(Fe(RA),{key:3,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):b.includes(I.suffix.toUpperCase())?(xe(),at(Fe(zA),{key:4,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):x.includes(I.suffix.toUpperCase())?(xe(),at(Fe(MA),{key:5,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):f.includes(I.suffix.toUpperCase())?(xe(),at(Fe(_A),{key:6,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):I.suffix===""?(xe(),at(Fe(FA),{key:7,class:"icon-svg",theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})):(xe(),at(Fe(jA),{key:8,theme:"outline",size:"24",fill:"#f6823b",strokeWidth:2})),ys(" "+er(I[T.prop]),1)],8,WA)):T.prop==="cz"?(xe(),Ue("div",YA,[Te("button",{onClick:V=>k(z)},"分享",8,KA)])):(xe(),Ue("div",QA,er(I[T.prop]),1))],2))),256))]))),256))]),e.tableData.length===0?(xe(),Ue("div",VA," 当前数据为空 ")):Qr("",!0)]))}},ZA=so($A,[["__scopeId","data-v-3699873e"]]);function Is(e,t){return function(){return e.apply(t,arguments)}}const{toString:JA}=Object.prototype,{getPrototypeOf:Pa}=Object,uo=(e=>t=>{const n=JA.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),St=e=>(e=e.toLowerCase(),t=>uo(t)===e),fo=e=>t=>typeof t===e,{isArray:kn}=Array,yr=fo("undefined");function XA(e){return e!==null&&!yr(e)&&e.constructor!==null&&!yr(e.constructor)&&ct(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const _s=St("ArrayBuffer");function GA(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&_s(e.buffer),t}const ey=fo("string"),ct=fo("function"),Os=fo("number"),Ao=e=>e!==null&&typeof e=="object",ty=e=>e===!0||e===!1,Mr=e=>{if(uo(e)!=="object")return!1;const t=Pa(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},ny=St("Date"),ry=St("File"),oy=St("Blob"),ay=St("FileList"),iy=e=>Ao(e)&&ct(e.pipe),ly=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||ct(e.append)&&((t=uo(e))==="formdata"||t==="object"&&ct(e.toString)&&e.toString()==="[object FormData]"))},sy=St("URLSearchParams"),cy=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function mr(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,o;if(typeof e!="object"&&(e=[e]),kn(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{const c=n?Object.getOwnPropertyNames(e):Object.keys(e),d=c.length;let f;for(r=0;r<d;r++)f=c[r],t.call(null,e[f],f,e)}}function Ts(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,o;for(;r-- >0;)if(o=n[r],t===o.toLowerCase())return o;return null}const Rs=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),Ps=e=>!yr(e)&&e!==Rs;function la(){const{caseless:e}=Ps(this)&&this||{},t={},n=(r,o)=>{const c=e&&Ts(t,o)||o;Mr(t[c])&&Mr(r)?t[c]=la(t[c],r):Mr(r)?t[c]=la({},r):kn(r)?t[c]=r.slice():t[c]=r};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&mr(arguments[r],n);return t}const dy=(e,t,n,{allOwnKeys:r}={})=>(mr(t,(o,c)=>{n&&ct(o)?e[c]=Is(o,n):e[c]=o},{allOwnKeys:r}),e),py=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),uy=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},fy=(e,t,n,r)=>{let o,c,d;const f={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),c=o.length;c-- >0;)d=o[c],(!r||r(d,e,t))&&!f[d]&&(t[d]=e[d],f[d]=!0);e=n!==!1&&Pa(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Ay=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},yy=e=>{if(!e)return null;if(kn(e))return e;let t=e.length;if(!Os(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},hy=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Pa(Uint8Array)),my=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let o;for(;(o=r.next())&&!o.done;){const c=o.value;t.call(e,c[0],c[1])}},by=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},gy=St("HTMLFormElement"),vy=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,o){return r.toUpperCase()+o}),cl=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),xy=St("RegExp"),js=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};mr(n,(o,c)=>{t(o,c,e)!==!1&&(r[c]=o)}),Object.defineProperties(e,r)},Ey=e=>{js(e,(t,n)=>{if(ct(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(ct(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},wy=(e,t)=>{const n={},r=o=>{o.forEach(c=>{n[c]=!0})};return kn(e)?r(e):r(String(e).split(t)),n},ky=()=>{},Cy=(e,t)=>(e=+e,Number.isFinite(e)?e:t),Uo="abcdefghijklmnopqrstuvwxyz",dl="0123456789",zs={DIGIT:dl,ALPHA:Uo,ALPHA_DIGIT:Uo+Uo.toUpperCase()+dl},By=(e=16,t=zs.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n};function Sy(e){return!!(e&&ct(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const Ly=e=>{const t=new Array(10),n=(r,o)=>{if(Ao(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[o]=r;const c=kn(r)?[]:{};return mr(r,(d,f)=>{const y=n(d,o+1);!yr(y)&&(c[f]=y)}),t[o]=void 0,c}}return r};return n(e,0)},Iy=St("AsyncFunction"),_y=e=>e&&(Ao(e)||ct(e))&&ct(e.then)&&ct(e.catch),P={isArray:kn,isArrayBuffer:_s,isBuffer:XA,isFormData:ly,isArrayBufferView:GA,isString:ey,isNumber:Os,isBoolean:ty,isObject:Ao,isPlainObject:Mr,isUndefined:yr,isDate:ny,isFile:ry,isBlob:oy,isRegExp:xy,isFunction:ct,isStream:iy,isURLSearchParams:sy,isTypedArray:hy,isFileList:ay,forEach:mr,merge:la,extend:dy,trim:cy,stripBOM:py,inherits:uy,toFlatObject:fy,kindOf:uo,kindOfTest:St,endsWith:Ay,toArray:yy,forEachEntry:my,matchAll:by,isHTMLForm:gy,hasOwnProperty:cl,hasOwnProp:cl,reduceDescriptors:js,freezeMethods:Ey,toObjectSet:wy,toCamelCase:vy,noop:ky,toFiniteNumber:Cy,findKey:Ts,global:Rs,isContextDefined:Ps,ALPHABET:zs,generateString:By,isSpecCompliantForm:Sy,toJSONObject:Ly,isAsyncFn:Iy,isThenable:_y};function ye(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o)}P.inherits(ye,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:P.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const Ms=ye.prototype,Ds={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Ds[e]={value:e}});Object.defineProperties(ye,Ds);Object.defineProperty(Ms,"isAxiosError",{value:!0});ye.from=(e,t,n,r,o,c)=>{const d=Object.create(Ms);return P.toFlatObject(e,d,function(y){return y!==Error.prototype},f=>f!=="isAxiosError"),ye.call(d,e.message,t,n,r,o),d.cause=e,d.name=e.name,c&&Object.assign(d,c),d};const Oy=null;function sa(e){return P.isPlainObject(e)||P.isArray(e)}function qs(e){return P.endsWith(e,"[]")?e.slice(0,-2):e}function pl(e,t,n){return e?e.concat(t).map(function(o,c){return o=qs(o),!n&&c?"["+o+"]":o}).join(n?".":""):t}function Ty(e){return P.isArray(e)&&!e.some(sa)}const Ry=P.toFlatObject(P,{},null,function(t){return/^is[A-Z]/.test(t)});function yo(e,t,n){if(!P.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=P.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(C,I){return!P.isUndefined(I[C])});const r=n.metaTokens,o=n.visitor||b,c=n.dots,d=n.indexes,y=(n.Blob||typeof Blob<"u"&&Blob)&&P.isSpecCompliantForm(t);if(!P.isFunction(o))throw new TypeError("visitor must be a function");function m(B){if(B===null)return"";if(P.isDate(B))return B.toISOString();if(!y&&P.isBlob(B))throw new ye("Blob is not supported. Use a Buffer instead.");return P.isArrayBuffer(B)||P.isTypedArray(B)?y&&typeof Blob=="function"?new Blob([B]):Buffer.from(B):B}function b(B,C,I){let z=B;if(B&&!I&&typeof B=="object"){if(P.endsWith(C,"{}"))C=r?C:C.slice(0,-2),B=JSON.stringify(B);else if(P.isArray(B)&&Ty(B)||(P.isFileList(B)||P.endsWith(C,"[]"))&&(z=P.toArray(B)))return C=qs(C),z.forEach(function(V,F){!(P.isUndefined(V)||V===null)&&t.append(d===!0?pl([C],F,c):d===null?C:C+"[]",m(V))}),!1}return sa(B)?!0:(t.append(pl(I,C,c),m(B)),!1)}const x=[],h=Object.assign(Ry,{defaultVisitor:b,convertValue:m,isVisitable:sa});function k(B,C){if(!P.isUndefined(B)){if(x.indexOf(B)!==-1)throw Error("Circular reference detected in "+C.join("."));x.push(B),P.forEach(B,function(z,T){(!(P.isUndefined(z)||z===null)&&o.call(t,z,P.isString(T)?T.trim():T,C,h))===!0&&k(z,C?C.concat(T):[T])}),x.pop()}}if(!P.isObject(e))throw new TypeError("data must be an object");return k(e),t}function ul(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function ja(e,t){this._pairs=[],e&&yo(e,this,t)}const Fs=ja.prototype;Fs.append=function(t,n){this._pairs.push([t,n])};Fs.toString=function(t){const n=t?function(r){return t.call(this,r,ul)}:ul;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};function Py(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Ns(e,t,n){if(!t)return e;const r=n&&n.encode||Py,o=n&&n.serialize;let c;if(o?c=o(t,n):c=P.isURLSearchParams(t)?t.toString():new ja(t,n).toString(r),c){const d=e.indexOf("#");d!==-1&&(e=e.slice(0,d)),e+=(e.indexOf("?")===-1?"?":"&")+c}return e}class jy{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){P.forEach(this.handlers,function(r){r!==null&&t(r)})}}const fl=jy,Us={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},zy=typeof URLSearchParams<"u"?URLSearchParams:ja,My=typeof FormData<"u"?FormData:null,Dy=typeof Blob<"u"?Blob:null,qy=(()=>{let e;return typeof navigator<"u"&&((e=navigator.product)==="ReactNative"||e==="NativeScript"||e==="NS")?!1:typeof window<"u"&&typeof document<"u"})(),Fy=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),Ct={isBrowser:!0,classes:{URLSearchParams:zy,FormData:My,Blob:Dy},isStandardBrowserEnv:qy,isStandardBrowserWebWorkerEnv:Fy,protocols:["http","https","file","blob","url","data"]};function Ny(e,t){return yo(e,new Ct.classes.URLSearchParams,Object.assign({visitor:function(n,r,o,c){return Ct.isNode&&P.isBuffer(n)?(this.append(r,n.toString("base64")),!1):c.defaultVisitor.apply(this,arguments)}},t))}function Uy(e){return P.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Hy(e){const t={},n=Object.keys(e);let r;const o=n.length;let c;for(r=0;r<o;r++)c=n[r],t[c]=e[c];return t}function Hs(e){function t(n,r,o,c){let d=n[c++];const f=Number.isFinite(+d),y=c>=n.length;return d=!d&&P.isArray(o)?o.length:d,y?(P.hasOwnProp(o,d)?o[d]=[o[d],r]:o[d]=r,!f):((!o[d]||!P.isObject(o[d]))&&(o[d]=[]),t(n,r,o[d],c)&&P.isArray(o[d])&&(o[d]=Hy(o[d])),!f)}if(P.isFormData(e)&&P.isFunction(e.entries)){const n={};return P.forEachEntry(e,(r,o)=>{t(Uy(r),o,n,0)}),n}return null}const Wy={"Content-Type":void 0};function Yy(e,t,n){if(P.isString(e))try{return(t||JSON.parse)(e),P.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const ho={transitional:Us,adapter:["xhr","http"],transformRequest:[function(t,n){const r=n.getContentType()||"",o=r.indexOf("application/json")>-1,c=P.isObject(t);if(c&&P.isHTMLForm(t)&&(t=new FormData(t)),P.isFormData(t))return o&&o?JSON.stringify(Hs(t)):t;if(P.isArrayBuffer(t)||P.isBuffer(t)||P.isStream(t)||P.isFile(t)||P.isBlob(t))return t;if(P.isArrayBufferView(t))return t.buffer;if(P.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let f;if(c){if(r.indexOf("application/x-www-form-urlencoded")>-1)return Ny(t,this.formSerializer).toString();if((f=P.isFileList(t))||r.indexOf("multipart/form-data")>-1){const y=this.env&&this.env.FormData;return yo(f?{"files[]":t}:t,y&&new y,this.formSerializer)}}return c||o?(n.setContentType("application/json",!1),Yy(t)):t}],transformResponse:[function(t){const n=this.transitional||ho.transitional,r=n&&n.forcedJSONParsing,o=this.responseType==="json";if(t&&P.isString(t)&&(r&&!this.responseType||o)){const d=!(n&&n.silentJSONParsing)&&o;try{return JSON.parse(t)}catch(f){if(d)throw f.name==="SyntaxError"?ye.from(f,ye.ERR_BAD_RESPONSE,this,null,this.response):f}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Ct.classes.FormData,Blob:Ct.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};P.forEach(["delete","get","head"],function(t){ho.headers[t]={}});P.forEach(["post","put","patch"],function(t){ho.headers[t]=P.merge(Wy)});const za=ho,Ky=P.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Qy=e=>{const t={};let n,r,o;return e&&e.split(`
`).forEach(function(d){o=d.indexOf(":"),n=d.substring(0,o).trim().toLowerCase(),r=d.substring(o+1).trim(),!(!n||t[n]&&Ky[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},Al=Symbol("internals");function Jn(e){return e&&String(e).trim().toLowerCase()}function Dr(e){return e===!1||e==null?e:P.isArray(e)?e.map(Dr):String(e)}function Vy(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const $y=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Ho(e,t,n,r,o){if(P.isFunction(r))return r.call(this,t,n);if(o&&(t=n),!!P.isString(t)){if(P.isString(r))return t.indexOf(r)!==-1;if(P.isRegExp(r))return r.test(t)}}function Zy(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function Jy(e,t){const n=P.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(o,c,d){return this[r].call(this,t,o,c,d)},configurable:!0})})}class mo{constructor(t){t&&this.set(t)}set(t,n,r){const o=this;function c(f,y,m){const b=Jn(y);if(!b)throw new Error("header name must be a non-empty string");const x=P.findKey(o,b);(!x||o[x]===void 0||m===!0||m===void 0&&o[x]!==!1)&&(o[x||y]=Dr(f))}const d=(f,y)=>P.forEach(f,(m,b)=>c(m,b,y));return P.isPlainObject(t)||t instanceof this.constructor?d(t,n):P.isString(t)&&(t=t.trim())&&!$y(t)?d(Qy(t),n):t!=null&&c(n,t,r),this}get(t,n){if(t=Jn(t),t){const r=P.findKey(this,t);if(r){const o=this[r];if(!n)return o;if(n===!0)return Vy(o);if(P.isFunction(n))return n.call(this,o,r);if(P.isRegExp(n))return n.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Jn(t),t){const r=P.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||Ho(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let o=!1;function c(d){if(d=Jn(d),d){const f=P.findKey(r,d);f&&(!n||Ho(r,r[f],f,n))&&(delete r[f],o=!0)}}return P.isArray(t)?t.forEach(c):c(t),o}clear(t){const n=Object.keys(this);let r=n.length,o=!1;for(;r--;){const c=n[r];(!t||Ho(this,this[c],c,t,!0))&&(delete this[c],o=!0)}return o}normalize(t){const n=this,r={};return P.forEach(this,(o,c)=>{const d=P.findKey(r,c);if(d){n[d]=Dr(o),delete n[c];return}const f=t?Zy(c):String(c).trim();f!==c&&delete n[c],n[f]=Dr(o),r[f]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return P.forEach(this,(r,o)=>{r!=null&&r!==!1&&(n[o]=t&&P.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(o=>r.set(o)),r}static accessor(t){const r=(this[Al]=this[Al]={accessors:{}}).accessors,o=this.prototype;function c(d){const f=Jn(d);r[f]||(Jy(o,d),r[f]=!0)}return P.isArray(t)?t.forEach(c):c(t),this}}mo.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);P.freezeMethods(mo.prototype);P.freezeMethods(mo);const Rt=mo;function Wo(e,t){const n=this||za,r=t||n,o=Rt.from(r.headers);let c=r.data;return P.forEach(e,function(f){c=f.call(n,c,o.normalize(),t?t.status:void 0)}),o.normalize(),c}function Ws(e){return!!(e&&e.__CANCEL__)}function br(e,t,n){ye.call(this,e??"canceled",ye.ERR_CANCELED,t,n),this.name="CanceledError"}P.inherits(br,ye,{__CANCEL__:!0});function Xy(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new ye("Request failed with status code "+n.status,[ye.ERR_BAD_REQUEST,ye.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const Gy=Ct.isStandardBrowserEnv?function(){return{write:function(n,r,o,c,d,f){const y=[];y.push(n+"="+encodeURIComponent(r)),P.isNumber(o)&&y.push("expires="+new Date(o).toGMTString()),P.isString(c)&&y.push("path="+c),P.isString(d)&&y.push("domain="+d),f===!0&&y.push("secure"),document.cookie=y.join("; ")},read:function(n){const r=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return r?decodeURIComponent(r[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}();function eh(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function th(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function Ys(e,t){return e&&!eh(t)?th(e,t):t}const nh=Ct.isStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function o(c){let d=c;return t&&(n.setAttribute("href",d),d=n.href),n.setAttribute("href",d),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=o(window.location.href),function(d){const f=P.isString(d)?o(d):d;return f.protocol===r.protocol&&f.host===r.host}}():function(){return function(){return!0}}();function rh(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function oh(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o=0,c=0,d;return t=t!==void 0?t:1e3,function(y){const m=Date.now(),b=r[c];d||(d=m),n[o]=y,r[o]=m;let x=c,h=0;for(;x!==o;)h+=n[x++],x=x%e;if(o=(o+1)%e,o===c&&(c=(c+1)%e),m-d<t)return;const k=b&&m-b;return k?Math.round(h*1e3/k):void 0}}function yl(e,t){let n=0;const r=oh(50,250);return o=>{const c=o.loaded,d=o.lengthComputable?o.total:void 0,f=c-n,y=r(f),m=c<=d;n=c;const b={loaded:c,total:d,progress:d?c/d:void 0,bytes:f,rate:y||void 0,estimated:y&&d&&m?(d-c)/y:void 0,event:o};b[t?"download":"upload"]=!0,e(b)}}const ah=typeof XMLHttpRequest<"u",ih=ah&&function(e){return new Promise(function(n,r){let o=e.data;const c=Rt.from(e.headers).normalize(),d=e.responseType;let f;function y(){e.cancelToken&&e.cancelToken.unsubscribe(f),e.signal&&e.signal.removeEventListener("abort",f)}P.isFormData(o)&&(Ct.isStandardBrowserEnv||Ct.isStandardBrowserWebWorkerEnv?c.setContentType(!1):c.setContentType("multipart/form-data;",!1));let m=new XMLHttpRequest;if(e.auth){const k=e.auth.username||"",B=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";c.set("Authorization","Basic "+btoa(k+":"+B))}const b=Ys(e.baseURL,e.url);m.open(e.method.toUpperCase(),Ns(b,e.params,e.paramsSerializer),!0),m.timeout=e.timeout;function x(){if(!m)return;const k=Rt.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders()),C={data:!d||d==="text"||d==="json"?m.responseText:m.response,status:m.status,statusText:m.statusText,headers:k,config:e,request:m};Xy(function(z){n(z),y()},function(z){r(z),y()},C),m=null}if("onloadend"in m?m.onloadend=x:m.onreadystatechange=function(){!m||m.readyState!==4||m.status===0&&!(m.responseURL&&m.responseURL.indexOf("file:")===0)||setTimeout(x)},m.onabort=function(){m&&(r(new ye("Request aborted",ye.ECONNABORTED,e,m)),m=null)},m.onerror=function(){r(new ye("Network Error",ye.ERR_NETWORK,e,m)),m=null},m.ontimeout=function(){let B=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const C=e.transitional||Us;e.timeoutErrorMessage&&(B=e.timeoutErrorMessage),r(new ye(B,C.clarifyTimeoutError?ye.ETIMEDOUT:ye.ECONNABORTED,e,m)),m=null},Ct.isStandardBrowserEnv){const k=(e.withCredentials||nh(b))&&e.xsrfCookieName&&Gy.read(e.xsrfCookieName);k&&c.set(e.xsrfHeaderName,k)}o===void 0&&c.setContentType(null),"setRequestHeader"in m&&P.forEach(c.toJSON(),function(B,C){m.setRequestHeader(C,B)}),P.isUndefined(e.withCredentials)||(m.withCredentials=!!e.withCredentials),d&&d!=="json"&&(m.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&m.addEventListener("progress",yl(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&m.upload&&m.upload.addEventListener("progress",yl(e.onUploadProgress)),(e.cancelToken||e.signal)&&(f=k=>{m&&(r(!k||k.type?new br(null,e,m):k),m.abort(),m=null)},e.cancelToken&&e.cancelToken.subscribe(f),e.signal&&(e.signal.aborted?f():e.signal.addEventListener("abort",f)));const h=rh(b);if(h&&Ct.protocols.indexOf(h)===-1){r(new ye("Unsupported protocol "+h+":",ye.ERR_BAD_REQUEST,e));return}m.send(o||null)})},qr={http:Oy,xhr:ih};P.forEach(qr,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const lh={getAdapter:e=>{e=P.isArray(e)?e:[e];const{length:t}=e;let n,r;for(let o=0;o<t&&(n=e[o],!(r=P.isString(n)?qr[n.toLowerCase()]:n));o++);if(!r)throw r===!1?new ye(`Adapter ${n} is not supported by the environment`,"ERR_NOT_SUPPORT"):new Error(P.hasOwnProp(qr,n)?`Adapter '${n}' is not available in the build`:`Unknown adapter '${n}'`);if(!P.isFunction(r))throw new TypeError("adapter is not a function");return r},adapters:qr};function Yo(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new br(null,e)}function hl(e){return Yo(e),e.headers=Rt.from(e.headers),e.data=Wo.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),lh.getAdapter(e.adapter||za.adapter)(e).then(function(r){return Yo(e),r.data=Wo.call(e,e.transformResponse,r),r.headers=Rt.from(r.headers),r},function(r){return Ws(r)||(Yo(e),r&&r.response&&(r.response.data=Wo.call(e,e.transformResponse,r.response),r.response.headers=Rt.from(r.response.headers))),Promise.reject(r)})}const ml=e=>e instanceof Rt?e.toJSON():e;function vn(e,t){t=t||{};const n={};function r(m,b,x){return P.isPlainObject(m)&&P.isPlainObject(b)?P.merge.call({caseless:x},m,b):P.isPlainObject(b)?P.merge({},b):P.isArray(b)?b.slice():b}function o(m,b,x){if(P.isUndefined(b)){if(!P.isUndefined(m))return r(void 0,m,x)}else return r(m,b,x)}function c(m,b){if(!P.isUndefined(b))return r(void 0,b)}function d(m,b){if(P.isUndefined(b)){if(!P.isUndefined(m))return r(void 0,m)}else return r(void 0,b)}function f(m,b,x){if(x in t)return r(m,b);if(x in e)return r(void 0,m)}const y={url:c,method:c,data:c,baseURL:d,transformRequest:d,transformResponse:d,paramsSerializer:d,timeout:d,timeoutMessage:d,withCredentials:d,adapter:d,responseType:d,xsrfCookieName:d,xsrfHeaderName:d,onUploadProgress:d,onDownloadProgress:d,decompress:d,maxContentLength:d,maxBodyLength:d,beforeRedirect:d,transport:d,httpAgent:d,httpsAgent:d,cancelToken:d,socketPath:d,responseEncoding:d,validateStatus:f,headers:(m,b)=>o(ml(m),ml(b),!0)};return P.forEach(Object.keys(Object.assign({},e,t)),function(b){const x=y[b]||o,h=x(e[b],t[b],b);P.isUndefined(h)&&x!==f||(n[b]=h)}),n}const Ks="1.4.0",Ma={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Ma[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const bl={};Ma.transitional=function(t,n,r){function o(c,d){return"[Axios v"+Ks+"] Transitional option '"+c+"'"+d+(r?". "+r:"")}return(c,d,f)=>{if(t===!1)throw new ye(o(d," has been removed"+(n?" in "+n:"")),ye.ERR_DEPRECATED);return n&&!bl[d]&&(bl[d]=!0,console.warn(o(d," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(c,d,f):!0}};function sh(e,t,n){if(typeof e!="object")throw new ye("options must be an object",ye.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const c=r[o],d=t[c];if(d){const f=e[c],y=f===void 0||d(f,c,e);if(y!==!0)throw new ye("option "+c+" must be "+y,ye.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new ye("Unknown option "+c,ye.ERR_BAD_OPTION)}}const ca={assertOptions:sh,validators:Ma},Ut=ca.validators;class $r{constructor(t){this.defaults=t,this.interceptors={request:new fl,response:new fl}}request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=vn(this.defaults,n);const{transitional:r,paramsSerializer:o,headers:c}=n;r!==void 0&&ca.assertOptions(r,{silentJSONParsing:Ut.transitional(Ut.boolean),forcedJSONParsing:Ut.transitional(Ut.boolean),clarifyTimeoutError:Ut.transitional(Ut.boolean)},!1),o!=null&&(P.isFunction(o)?n.paramsSerializer={serialize:o}:ca.assertOptions(o,{encode:Ut.function,serialize:Ut.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let d;d=c&&P.merge(c.common,c[n.method]),d&&P.forEach(["delete","get","head","post","put","patch","common"],B=>{delete c[B]}),n.headers=Rt.concat(d,c);const f=[];let y=!0;this.interceptors.request.forEach(function(C){typeof C.runWhen=="function"&&C.runWhen(n)===!1||(y=y&&C.synchronous,f.unshift(C.fulfilled,C.rejected))});const m=[];this.interceptors.response.forEach(function(C){m.push(C.fulfilled,C.rejected)});let b,x=0,h;if(!y){const B=[hl.bind(this),void 0];for(B.unshift.apply(B,f),B.push.apply(B,m),h=B.length,b=Promise.resolve(n);x<h;)b=b.then(B[x++],B[x++]);return b}h=f.length;let k=n;for(x=0;x<h;){const B=f[x++],C=f[x++];try{k=B(k)}catch(I){C.call(this,I);break}}try{b=hl.call(this,k)}catch(B){return Promise.reject(B)}for(x=0,h=m.length;x<h;)b=b.then(m[x++],m[x++]);return b}getUri(t){t=vn(this.defaults,t);const n=Ys(t.baseURL,t.url);return Ns(n,t.params,t.paramsSerializer)}}P.forEach(["delete","get","head","options"],function(t){$r.prototype[t]=function(n,r){return this.request(vn(r||{},{method:t,url:n,data:(r||{}).data}))}});P.forEach(["post","put","patch"],function(t){function n(r){return function(c,d,f){return this.request(vn(f||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:c,data:d}))}}$r.prototype[t]=n(),$r.prototype[t+"Form"]=n(!0)});const Fr=$r;class Da{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(c){n=c});const r=this;this.promise.then(o=>{if(!r._listeners)return;let c=r._listeners.length;for(;c-- >0;)r._listeners[c](o);r._listeners=null}),this.promise.then=o=>{let c;const d=new Promise(f=>{r.subscribe(f),c=f}).then(o);return d.cancel=function(){r.unsubscribe(c)},d},t(function(c,d,f){r.reason||(r.reason=new br(c,d,f),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}static source(){let t;return{token:new Da(function(o){t=o}),cancel:t}}}const ch=Da;function dh(e){return function(n){return e.apply(null,n)}}function ph(e){return P.isObject(e)&&e.isAxiosError===!0}const da={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(da).forEach(([e,t])=>{da[t]=e});const uh=da;function Qs(e){const t=new Fr(e),n=Is(Fr.prototype.request,t);return P.extend(n,Fr.prototype,t,{allOwnKeys:!0}),P.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return Qs(vn(e,o))},n}const De=Qs(za);De.Axios=Fr;De.CanceledError=br;De.CancelToken=ch;De.isCancel=Ws;De.VERSION=Ks;De.toFormData=yo;De.AxiosError=ye;De.Cancel=De.CanceledError;De.all=function(t){return Promise.all(t)};De.spread=dh;De.isAxiosError=ph;De.mergeConfig=vn;De.AxiosHeaders=Rt;De.formToJSON=e=>Hs(P.isHTMLForm(e)?new FormData(e):e);De.HttpStatusCode=uh;De.default=De;const fh=De;const Ah={class:"box"},yh={class:"main"},hh={class:"title"},mh={class:"body"},bh={class:"footer"},gh={__name:"Dialog",props:{title:{type:String,default:"标题"},btnNum:{type:Number,default:1},okBtnText:{type:String,default:"确定"}},emits:["okBtn","closeBtn"],setup(e,{emit:t}){const n=e,r=()=>{t("okBtn")},o=()=>{t("closeBtn")};return(c,d)=>(xe(),Ue("div",Ah,[Te("div",yh,[Te("div",hh,[Te("span",null,er(n.title),1)]),Te("div",mh,[hu(c.$slots,"body",{},void 0,!0)]),Te("div",bh,[n.btnNum>1?(xe(),Ue("div",{key:0,class:"close-btn",onClose:o},"关闭",32)):Qr("",!0),Te("div",{class:"ok-btn",onClick:r},er(n.okBtnText),1)])])]))}},vh=so(gh,[["__scopeId","data-v-181f61e3"]]);const xh={style:{height:"calc(100vh - 90px)"}},Eh={key:0,class:"imgBox"},wh={class:"img"},kh=["src"],Ch={class:"play-list"},Bh={__name:"main",setup(e){const t=tt(!1),n=CA();Ra();const r=`${window.location.protocol}//${window.location.hostname}:${window.location.port}`,o=tt("$"),c=tt([]),d=tt([{span:"文件名",prop:"name",textColor:"",bgColor:""},{span:"大小",prop:"size",textColor:"red",bgColor:"red"},{span:"操作",prop:"cz",width:"80px",textColor:"green",bgColor:"green"}]),f=()=>{o.value=o.value.slice(0,o.value.lastIndexOf("__")===-1?o.value.length:o.value.lastIndexOf("__")),it()},y=tt([]),m=tt(""),b=tt(0),x=tt(!1),h=()=>{b.value++,b.value=b.value%y.value.length,m.value=y.value[b.value],console.log(b.value)},k=()=>{b.value--,b.value<0&&(b.value=y.value.length-1),b.value=b.value%y.value.length,m.value=y.value[b.value]},B=()=>{x.value=!0,m.value=y.value[b.value],console.log(y.value)},C=()=>{x.value=!1},I=(me,pe)=>(me==="$"?me="":me=me.replace(/\$/g,""),me=me.replace(/__/g,"/"),console.log(`获取文件：${r}/getFile${me}/${pe}`),`${r}/getFile${me}/${pe}`),z=me=>{let pe=c.value[me];try{navigator.share({title:pe.name,url:I(o.value,pe.name)})}catch{alert(I(o.value,pe.name))}},T=[".MP4",".AVI",".MOV",".FLV",".MKV"],V=[".JPG",".JPEG",".PNG",".WEBP"],F=[".WAV",".MP3",".OGG"],Ee=()=>{t.value=!1},Se=me=>{me==="web"?n.push({path:"/VideoPlay",query:{url:We.value}}):window.open("vlc://"+We.value),t.value=!1},We=tt(""),Xe=me=>{let pe=c.value[me];if(pe.isDirectory&&!pe.isFile)o.value+=`__${pe.name}`,it(),Ge();else{let Re=pe.suffix;if(T.includes(Re.toUpperCase()))We.value=I(o.value,pe.name),t.value=!0;else if(V.includes(Re.toUpperCase())){y.value=[];let Ye=0;for(let Be=0;Be<c.value.length;Be++){let be=c.value[Be].suffix;V.includes(be.toUpperCase())&&(c.value[Be].name===c.value[me].name&&(b.value=Ye,console.log(b.value,123456789)),Ye++,y.value.push(I(o.value,c.value[Be].name)))}B()}else if(F.includes(Re.toUpperCase()))n.push({path:"/AudioPlay",query:{url:I(o.value,pe.name)}});else{let Ye=document.createElement("a");Ye.href=I(o.value,pe.name),Ye.download=pe.name,Ye.target="_blank",Ye.click()}}},it=()=>{fh.get(`${r}/list/${o.value}`).then((me,pe)=>{me.status===200&&(c.value=me.data.map(Re=>(Re.size=(Number(Re.size)/1024/1024).toFixed(2)+"MB",Re.isDirectory&&(Re.size=""),Re)))})},ue=()=>{f()},Ge=()=>{window.history&&window.history.pushState&&(history.pushState(null,null,document.URL),window.addEventListener("popstate",ue,!1))};return hr(()=>{Ge(),it()}),Ca(()=>{window.removeEventListener("popstate",ue,!1)}),(me,pe)=>(xe(),Ue("div",null,[Te("div",xh,[H(ZA,{"table-data":c.value,"table-head":d.value,onClickFile:Xe,onCopyUrl:z},null,8,["table-data","table-head"])]),Te("div",{class:"ret",onClick:f},"返回"),x.value?(xe(),Ue("div",Eh,[Te("div",wh,[Te("div",{class:"close-btn",onClick:C},[H(Fe(PA),{strokeWidth:5,fill:"#ffffff",size:"20",theme:"outline"})]),Te("div",{class:"left-btn",onClick:k},[H(Fe(OA),{strokeWidth:5,fill:"#ffffff",size:"30",theme:"outline"})]),Te("div",{class:"right-btn",onClick:h},[H(Fe(TA),{strokeWidth:5,fill:"#ffffff",size:"30",theme:"outline"})]),Te("img",{src:m.value,alt:""},null,8,kh)]),Te("div",{class:"blackScreen",onClick:C})])):Qr("",!0),t.value?(xe(),at(vh,{key:1,"ok-btn-text":"返回",title:"预览方式",onOkBtn:Ee},{body:Zl(()=>[Te("ul",Ch,[Te("li",{onClick:pe[0]||(pe[0]=Re=>Se("web"))},"网页播放"),Te("li",{onClick:pe[1]||(pe[1]=Re=>Se("vlc"))},"Vlc播放")])]),_:1})):Qr("",!0)]))}},Sh=so(Bh,[["__scopeId","data-v-99c262df"]]);var Lh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ih(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Vs={exports:{}};(function(e,t){(function(n,r){e.exports=r()})(self,()=>(()=>{var n={916:(d,f,y)=>{var m=y(471);d.exports=function(b){var x,h="",k=(b=b||{}).video,B=b.options,C=m.$escape,I=b.tran,z=b.icons,T=b.index,V=m.$each;return b.$value,b.$index,h+=`<div class="dplayer-mask"></div>
<div class="dplayer-video-wrap">
    `,x=y(568)(k),h+=x,h+=`
    `,B.logo&&(h+=`
    <div class="dplayer-logo">
        <img src="`,h+=C(B.logo),h+=`">
    </div>
    `),h+=`
    <div class="dplayer-danmaku"`,B.danmaku&&B.danmaku.bottom&&(h+=' style="margin-bottom:',h+=C(B.danmaku.bottom),h+='"'),h+=`>
        <div class="dplayer-danmaku-item dplayer-danmaku-item--demo"></div>
    </div>
    <div class="dplayer-subtitle"></div>
    <div class="dplayer-bezel">
        <span class="dplayer-bezel-icon"></span>
        `,B.danmaku&&(h+=`
        <span class="dplayer-danloading">`,h+=C(I("danmaku-loading")),h+=`</span>
        `),h+=`
        <span class="diplayer-loading-icon">`,h+=z.loading,h+=`</span>
    </div>
</div>
<div class="dplayer-controller-mask"></div>
<div class="dplayer-controller">
    <div class="dplayer-icons dplayer-comment-box">
        <button class="dplayer-icon dplayer-comment-setting-icon" data-balloon="`,h+=C(I("setting")),h+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,h+=z.pallette,h+=`</span>
        </button>
        <div class="dplayer-comment-setting-box">
            <div class="dplayer-comment-setting-color">
                <div class="dplayer-comment-setting-title">`,h+=C(I("set-danmaku-color")),h+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,h+=C(T),h+=`" value="#fff" checked>
                    <span style="background: #fff;"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,h+=C(T),h+=`" value="#e54256">
                    <span style="background: #e54256"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,h+=C(T),h+=`" value="#ffe133">
                    <span style="background: #ffe133"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,h+=C(T),h+=`" value="#64DD17">
                    <span style="background: #64DD17"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,h+=C(T),h+=`" value="#39ccff">
                    <span style="background: #39ccff"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,h+=C(T),h+=`" value="#D500F9">
                    <span style="background: #D500F9"></span>
                </label>
            </div>
            <div class="dplayer-comment-setting-type">
                <div class="dplayer-comment-setting-title">`,h+=C(I("set-danmaku-type")),h+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,h+=C(T),h+=`" value="1">
                    <span>`,h+=C(I("top")),h+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,h+=C(T),h+=`" value="0" checked>
                    <span>`,h+=C(I("rolling")),h+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,h+=C(T),h+=`" value="2">
                    <span>`,h+=C(I("bottom")),h+=`</span>
                </label>
            </div>
        </div>
        <input class="dplayer-comment-input" type="text" placeholder="`,h+=C(I("input-danmaku-enter")),h+=`" maxlength="30">
        <button class="dplayer-icon dplayer-send-icon" data-balloon="`,h+=C(I("send")),h+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,h+=z.send,h+=`</span>
        </button>
    </div>
    <div class="dplayer-icons dplayer-icons-left">
        <button class="dplayer-icon dplayer-play-icon">
            <span class="dplayer-icon-content">`,h+=z.play,h+=`</span>
        </button>
        <div class="dplayer-volume">
            <button class="dplayer-icon dplayer-volume-icon">
                <span class="dplayer-icon-content">`,h+=z.volumeDown,h+=`</span>
            </button>
            <div class="dplayer-volume-bar-wrap" data-balloon-pos="up">
                <div class="dplayer-volume-bar">
                    <div class="dplayer-volume-bar-inner" style="background: `,h+=C(B.theme),h+=`;">
                        <span class="dplayer-thumb" style="background: `,h+=C(B.theme),h+=`"></span>
                    </div>
                </div>
            </div>
        </div>
        <span class="dplayer-time">
            <span class="dplayer-ptime">0:00</span> /
            <span class="dplayer-dtime">0:00</span>
        </span>
        `,B.live&&(h+=`
        <span class="dplayer-live-badge"><span class="dplayer-live-dot" style="background: `,h+=C(B.theme),h+=';"></span>',h+=C(I("live")),h+=`</span>
        `),h+=`
    </div>
    <div class="dplayer-icons dplayer-icons-right">
        `,B.video.quality&&(h+=`
        <div class="dplayer-quality">
            <button class="dplayer-icon dplayer-quality-icon">`,h+=C(B.video.quality[B.video.defaultQuality].name),h+=`</button>
            <div class="dplayer-quality-mask">
                <div class="dplayer-quality-list">
                `,V(B.video.quality,function(F,Ee){h+=`
                    <div class="dplayer-quality-item" data-index="`,h+=C(Ee),h+='">',h+=C(F.name),h+=`</div>
                `}),h+=`
                </div>
            </div>
        </div>
        `),h+=`
        `,B.screenshot&&(h+=`
        <div class="dplayer-icon dplayer-camera-icon" data-balloon="`,h+=C(I("screenshot")),h+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,h+=z.camera,h+=`</span>
        </div>
        `),h+=`
        `,B.airplay&&(h+=`
        <div class="dplayer-icon dplayer-airplay-icon" data-balloon="`,h+=C(I("airplay")),h+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,h+=z.airplay,h+=`</span>
        </div>
        `),h+=`
        `,B.chromecast&&(h+=`
        <div class="dplayer-icon dplayer-chromecast-icon" data-balloon="`,h+=C(I("chromecast")),h+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,h+=z.chromecast,h+=`</span>
        </div>
        `),h+=`
        <div class="dplayer-comment">
            <button class="dplayer-icon dplayer-comment-icon" data-balloon="`,h+=C(I("send-danmaku")),h+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,h+=z.comment,h+=`</span>
            </button>
        </div>
        `,B.subtitle&&(h+=`
        `,typeof B.subtitle.url=="string"?(h+=`
        <div class="dplayer-subtitle-btn">
            <button class="dplayer-icon dplayer-subtitle-icon" data-balloon="`,h+=C(I("hide-subs")),h+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,h+=z.subtitle,h+=`</span>
            </button>
        </div>
        `):(h+=`
        <div class="dplayer-subtitles">
            <button class="dplayer-icon dplayer-subtitles-icon" data-balloon="`,h+=C(I("subtitle")),h+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,h+=z.subtitle,h+=`</span>
            </button>
            <div class="dplayer-subtitles-box">
                <div class="dplayer-subtitles-panel">
                    `,V(B.subtitle.url,function(F,Ee){h+=`
                        <div class="dplayer-subtitles-item" data-subtitle="`,h+=C(F.url),h+=`">
                            <!-- if lang, show tran(lang). if lang and name, show name + (tran(lang)). if name, show name. off option use lang for translation. -->
                            <span class="dplayer-label">`,h+=C(F.lang?F.name?F.name+" ("+I(F.lang)+")":I(F.lang):F.name),h+=`</span>
                        </div>
                    `}),h+=`
                </div>
            </div>
        </div>
        `),h+=`
        `),h+=`
        <div class="dplayer-setting">
            <button class="dplayer-icon dplayer-setting-icon" data-balloon="`,h+=C(I("setting")),h+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,h+=z.setting,h+=`</span>
            </button>
            <div class="dplayer-setting-box">
                <div class="dplayer-setting-origin-panel">
                    <div class="dplayer-setting-item dplayer-setting-speed">
                        <span class="dplayer-label">`,h+=C(I("speed")),h+=`</span>
                        <div class="dplayer-toggle">`,h+=z.right,h+=`</div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-loop">
                        <span class="dplayer-label">`,h+=C(I("loop")),h+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-toggle-setting-input" type="checkbox" name="dplayer-toggle">
                            <label for="dplayer-toggle"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-showdan">
                        <span class="dplayer-label">`,h+=C(I("show-danmaku")),h+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-showdan-setting-input" type="checkbox" name="dplayer-toggle-dan">
                            <label for="dplayer-toggle-dan"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danunlimit">
                        <span class="dplayer-label">`,h+=C(I("unlimited-danmaku")),h+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-danunlimit-setting-input" type="checkbox" name="dplayer-toggle-danunlimit">
                            <label for="dplayer-toggle-danunlimit"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danmaku">
                        <span class="dplayer-label">`,h+=C(I("opacity-danmaku")),h+=`</span>
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
                    `,V(B.playbackSpeed,function(F,Ee){h+=`
                        <div class="dplayer-setting-speed-item" data-speed="`,h+=C(F),h+=`">
                            <span class="dplayer-label">`,h+=C(F===1?I("normal"):F),h+=`</span>
                        </div>
                    `}),h+=`
                </div>
            </div>
        </div>
        <div class="dplayer-full">
            <button class="dplayer-icon dplayer-full-in-icon" data-balloon="`,h+=C(I("web-fullscreen")),h+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,h+=z.fullWeb,h+=`</span>
            </button>
            <button class="dplayer-icon dplayer-full-icon" data-balloon="`,h+=C(I("fullscreen")),h+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,h+=z.full,h+=`</span>
            </button>
        </div>
    </div>
    <div class="dplayer-bar-wrap">
        <div class="dplayer-bar-time hidden">00:00</div>
        <div class="dplayer-bar-preview"></div>
        <div class="dplayer-bar">
            <div class="dplayer-loaded" style="width: 0;"></div>
            <div class="dplayer-played" style="width: 0; background: `,h+=C(B.theme),h+=`">
                <span class="dplayer-thumb" style="background: `,h+=C(B.theme),h+=`"></span>
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
    `,V(B.contextmenu,function(F,Ee){h+=`
        <div class="dplayer-menu-item">
            <a`,F.link&&(h+=' target="_blank"'),h+=' href="',h+=C(F.link||"javascript:void(0);"),h+='">',F.key&&(h+=" ",h+=C(I(F.key))),F.text&&(h+=" ",h+=C(F.text)),h+=`</a>
        </div>
    `}),h+=`
</div>
<div class="dplayer-notice-list"></div>
<button class="dplayer-mobile-play">
    `,h+=z.play,h+=`
</button>`}},568:(d,f,y)=>{var m=y(471);d.exports=function(b){var x="",h=(b=b||{}).enableSubtitle,k=b.subtitle,B=b.current,C=b.airplay,I=b.pic,z=m.$escape,T=b.screenshot,V=b.preload,F=b.url;return h=k&&k.type==="webvtt",x+=`
<video
    class="dplayer-video `,B&&(x+="dplayer-video-current"),x+=`"
    webkit-playsinline
    `,C&&(x+=' x-webkit-airplay="allow" '),x+=`
    playsinline
    `,I&&(x+='poster="',x+=z(I),x+='"'),x+=`
    `,(T||h)&&(x+='crossorigin="anonymous"'),x+=`
    `,V&&(x+='preload="',x+=z(V),x+='"'),x+=`
    `,C?x+=`
    nosrc
    `:F&&(x+=`
    src="`,x+=z(F),x+=`"
    `),x+=`
    >
    `,C&&(x+=`
    <source src="`,x+=z(F),x+=`">
    `),x+=`
    `,h&&(x+=`
    <track class="dplayer-subtrack" kind="metadata" default src="`,x+=z(typeof k.url=="string"?k.url:k.url[k.index].url),x+=`"></track>
    `),x+`
</video>`}},49:(d,f,y)=>{y.d(f,{Z:()=>k});var m=y(415),b=y.n(m),x=y(352),h=y.n(x)()(b());h.push([d.id,`:root {
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
`],sourceRoot:""}]);const k=h},685:(d,f,y)=>{y.d(f,{Z:()=>V});var m=y(415),b=y.n(m),x=y(352),h=y.n(x),k=y(49),B=y(80),C=y.n(B),I=new URL(y(831),y.b),z=h()(b());z.i(k.Z);var T=C()(I);z.push([d.id,`@keyframes my-face {
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
}`],sourceRoot:""}]);const V=z},856:d=>{var f=[];function y(x){for(var h=-1,k=0;k<f.length;k++)if(f[k].identifier===x){h=k;break}return h}function m(x,h){for(var k={},B=[],C=0;C<x.length;C++){var I=x[C],z=h.base?I[0]+h.base:I[0],T=k[z]||0,V="".concat(z," ").concat(T);k[z]=T+1;var F=y(V),Ee={css:I[1],media:I[2],sourceMap:I[3],supports:I[4],layer:I[5]};if(F!==-1)f[F].references++,f[F].updater(Ee);else{var Se=b(Ee,h);h.byIndex=C,f.splice(C,0,{identifier:V,updater:Se,references:1})}B.push(V)}return B}function b(x,h){var k=h.domAPI(h);return k.update(x),function(B){if(B){if(B.css===x.css&&B.media===x.media&&B.sourceMap===x.sourceMap&&B.supports===x.supports&&B.layer===x.layer)return;k.update(x=B)}else k.remove()}}d.exports=function(x,h){var k=m(x=x||[],h=h||{});return function(B){B=B||[];for(var C=0;C<k.length;C++){var I=y(k[C]);f[I].references--}for(var z=m(B,h),T=0;T<k.length;T++){var V=y(k[T]);f[V].references===0&&(f[V].updater(),f.splice(V,1))}k=z}}},370:d=>{var f={};d.exports=function(y,m){var b=function(x){if(f[x]===void 0){var h=document.querySelector(x);if(window.HTMLIFrameElement&&h instanceof window.HTMLIFrameElement)try{h=h.contentDocument.head}catch{h=null}f[x]=h}return f[x]}(y);if(!b)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");b.appendChild(m)}},278:d=>{d.exports=function(f){var y=document.createElement("style");return f.setAttributes(y,f.attributes),f.insert(y,f.options),y}},458:(d,f,y)=>{d.exports=function(m){var b=y.nc;b&&m.setAttribute("nonce",b)}},470:d=>{d.exports=function(f){var y=f.insertStyleElement(f);return{update:function(m){(function(b,x,h){var k="";h.supports&&(k+="@supports (".concat(h.supports,") {")),h.media&&(k+="@media ".concat(h.media," {"));var B=h.layer!==void 0;B&&(k+="@layer".concat(h.layer.length>0?" ".concat(h.layer):""," {")),k+=h.css,B&&(k+="}"),h.media&&(k+="}"),h.supports&&(k+="}");var C=h.sourceMap;C&&typeof btoa<"u"&&(k+=`
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(C))))," */")),x.styleTagTransform(k,b,x.options)})(y,f,m)},remove:function(){(function(m){if(m.parentNode===null)return!1;m.parentNode.removeChild(m)})(y)}}}},488:d=>{d.exports=function(f,y){if(y.styleSheet)y.styleSheet.cssText=f;else{for(;y.firstChild;)y.removeChild(y.firstChild);y.appendChild(document.createTextNode(f))}}},251:d=>{d.exports='<svg viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg"><path d="M288 90v96c0 20-16 36-36 36h-10c-16 0-16-24 0-24h10c7 0 12-5 12-12V90c0-7-5-12-12-12H36c-7 0-12 5-12 12v96c0 7 5 12 12 12h10c16 0 16 24 0 24H36c-20 0-36-16-36-36V90c0-20 16-36 36-36h216c20 0 36 16 36 36zm-120 62l48 68c14 20 1 38-20 38H92c-21 0-34-18-20-38l48-68c13-18 35-18 48 0z"></path></svg>'},113:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M16 23c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zM16 13c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zM27 28h-22c-1.654 0-3-1.346-3-3v-16c0-1.654 1.346-3 3-3h3c0.552 0 1 0.448 1 1s-0.448 1-1 1h-3c-0.551 0-1 0.449-1 1v16c0 0.552 0.449 1 1 1h22c0.552 0 1-0.448 1-1v-16c0-0.551-0.448-1-1-1h-11c-0.552 0-1-0.448-1-1s0.448-1 1-1h11c1.654 0 3 1.346 3 3v16c0 1.654-1.346 3-3 3zM24 10.5c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5zM15 4c0 0.552-0.448 1-1 1h-4c-0.552 0-1-0.448-1-1v0c0-0.552 0.448-1 1-1h4c0.552 0 1 0.448 1 1v0z"></path></svg>'},193:d=>{d.exports='<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="chromecast" class="svg-inline--fa fa-chromecast fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M447.8,64H64c-23.6,0-42.7,19.1-42.7,42.7v63.9H64v-63.9h383.8v298.6H298.6V448H448c23.6,0,42.7-19.1,42.7-42.7V106.7 C490.7,83.1,471.4,64,447.8,64z M21.3,383.6L21.3,383.6l0,63.9h63.9C85.2,412.2,56.6,383.6,21.3,383.6L21.3,383.6z M21.3,298.6V341 c58.9,0,106.6,48.1,106.6,107h42.7C170.7,365.6,103.7,298.7,21.3,298.6z M213.4,448h42.7c-0.5-129.5-105.3-234.3-234.8-234.6l0,42.4 C127.3,255.6,213.3,342,213.4,448z"></path></svg>'},338:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.090 0.131h-22.731c-2.354 0-4.262 1.839-4.262 4.109v16.401c0 2.269 1.908 4.109 4.262 4.109h4.262v-2.706h8.469l-8.853 8.135 1.579 1.451 7.487-6.88h9.787c2.353 0 4.262-1.84 4.262-4.109v-16.401c0-2.27-1.909-4.109-4.262-4.109v0zM28.511 19.304c0 1.512-1.272 2.738-2.841 2.738h-8.425l-0.076-0.070-0.076 0.070h-11.311c-1.569 0-2.841-1.226-2.841-2.738v-13.696c0-1.513 1.272-2.739 2.841-2.739h19.889c1.569 0 2.841-0.142 2.841 1.37v15.064z"></path></svg>'},807:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.128 0.38h-22.553c-2.336 0-4.229 1.825-4.229 4.076v16.273c0 2.251 1.893 4.076 4.229 4.076h4.229v-2.685h8.403l-8.784 8.072 1.566 1.44 7.429-6.827h9.71c2.335 0 4.229-1.825 4.229-4.076v-16.273c0-2.252-1.894-4.076-4.229-4.076zM28.538 19.403c0 1.5-1.262 2.717-2.819 2.717h-8.36l-0.076-0.070-0.076 0.070h-11.223c-1.557 0-2.819-1.217-2.819-2.717v-13.589c0-1.501 1.262-2.718 2.819-2.718h19.734c1.557 0 2.819-0.141 2.819 1.359v14.947zM9.206 10.557c-1.222 0-2.215 0.911-2.215 2.036s0.992 2.035 2.215 2.035c1.224 0 2.216-0.911 2.216-2.035s-0.992-2.036-2.216-2.036zM22.496 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.224 0 2.215-0.911 2.215-2.035s-0.991-2.036-2.215-2.036zM15.852 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.222 0 2.215-0.911 2.215-2.035s-0.992-2.036-2.215-2.036z"></path></svg>'},300:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M24.965 24.38h-18.132c-1.366 0-2.478-1.113-2.478-2.478v-11.806c0-1.364 1.111-2.478 2.478-2.478h18.132c1.366 0 2.478 1.113 2.478 2.478v11.806c0 1.364-1.11 2.478-2.478 2.478zM6.833 10.097v11.806h18.134l-0.002-11.806h-18.132zM2.478 28.928h5.952c0.684 0 1.238-0.554 1.238-1.239 0-0.684-0.554-1.238-1.238-1.238h-5.952v-5.802c0-0.684-0.554-1.239-1.238-1.239s-1.239 0.556-1.239 1.239v5.802c0 1.365 1.111 2.478 2.478 2.478zM30.761 19.412c-0.684 0-1.238 0.554-1.238 1.238v5.801h-5.951c-0.686 0-1.239 0.554-1.239 1.238 0 0.686 0.554 1.239 1.239 1.239h5.951c1.366 0 2.478-1.111 2.478-2.478v-5.801c0-0.683-0.554-1.238-1.239-1.238zM0 5.55v5.802c0 0.683 0.554 1.238 1.238 1.238s1.238-0.555 1.238-1.238v-5.802h5.952c0.684 0 1.238-0.554 1.238-1.238s-0.554-1.238-1.238-1.238h-5.951c-1.366-0.001-2.478 1.111-2.478 2.476zM32 11.35v-5.801c0-1.365-1.11-2.478-2.478-2.478h-5.951c-0.686 0-1.239 0.554-1.239 1.238s0.554 1.238 1.239 1.238h5.951v5.801c0 0.683 0.554 1.237 1.238 1.237 0.686 0.002 1.239-0.553 1.239-1.236z"></path></svg>'},574:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M6.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v4h4c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333zM30.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h4v-4c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM30.667 12c-0.8 0-1.333-0.533-1.333-1.333v-4h-4c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM1.333 12c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333h-4v4c0 0.8-0.533 1.333-1.333 1.333z"></path></svg>'},182:d=>{d.exports='<svg version="1.1" viewBox="0 0 22 22"><svg x="7" y="1"><circle class="diplayer-loading-dot diplayer-loading-dot-0" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-1" cx="4" cy="4" r="2"></circle></svg><svg x="13" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-2" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-3" cx="4" cy="4" r="2"></circle></svg><svg x="7" y="13"><circle class="diplayer-loading-dot diplayer-loading-dot-4" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-5" cx="4" cy="4" r="2"></circle></svg><svg x="1" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-6" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-7" cx="4" cy="4" r="2"></circle></svg></svg>'},965:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M19.357 2.88c1.749 0 3.366 0.316 4.851 0.946 1.485 0.632 2.768 1.474 3.845 2.533s1.922 2.279 2.532 3.661c0.611 1.383 0.915 2.829 0.915 4.334 0 1.425-0.304 2.847-0.915 4.271-0.611 1.425-1.587 2.767-2.928 4.028-0.855 0.813-1.811 1.607-2.869 2.38s-2.136 1.465-3.233 2.075c-1.099 0.61-2.198 1.098-3.296 1.465-1.098 0.366-2.115 0.549-3.051 0.549-1.343 0-2.441-0.438-3.296-1.311-0.854-0.876-1.281-2.41-1.281-4.608 0-0.366 0.020-0.773 0.060-1.221s0.062-0.895 0.062-1.343c0-0.773-0.183-1.353-0.55-1.738-0.366-0.387-0.793-0.58-1.281-0.58-0.652 0-1.21 0.295-1.678 0.886s-0.926 1.23-1.373 1.921c-0.447 0.693-0.905 1.334-1.372 1.923s-1.028 0.886-1.679 0.886c-0.529 0-1.048-0.427-1.556-1.282s-0.763-2.259-0.763-4.212c0-2.197 0.529-4.241 1.587-6.133s2.462-3.529 4.21-4.912c1.75-1.383 3.762-2.471 6.041-3.264 2.277-0.796 4.617-1.212 7.018-1.253zM7.334 15.817c0.569 0 1.047-0.204 1.434-0.611s0.579-0.875 0.579-1.404c0-0.569-0.193-1.047-0.579-1.434s-0.864-0.579-1.434-0.579c-0.529 0-0.987 0.193-1.373 0.579s-0.58 0.864-0.58 1.434c0 0.53 0.194 0.998 0.58 1.404 0.388 0.407 0.845 0.611 1.373 0.611zM12.216 11.79c0.691 0 1.292-0.254 1.8-0.763s0.762-1.107 0.762-1.8c0-0.732-0.255-1.343-0.762-1.831-0.509-0.489-1.109-0.732-1.8-0.732-0.732 0-1.342 0.244-1.831 0.732-0.488 0.488-0.732 1.098-0.732 1.831 0 0.693 0.244 1.292 0.732 1.8s1.099 0.763 1.831 0.763zM16.366 25.947c0.692 0 1.282-0.214 1.77-0.64s0.732-0.987 0.732-1.678-0.244-1.261-0.732-1.709c-0.489-0.448-1.078-0.671-1.77-0.671-0.65 0-1.21 0.223-1.678 0.671s-0.702 1.018-0.702 1.709c0 0.692 0.234 1.25 0.702 1.678s1.027 0.64 1.678 0.64zM19.113 9.592c0.651 0 1.129-0.203 1.433-0.611 0.305-0.406 0.459-0.874 0.459-1.404 0-0.488-0.154-0.947-0.459-1.373-0.304-0.427-0.782-0.641-1.433-0.641-0.529 0-1.008 0.193-1.434 0.58s-0.64 0.865-0.64 1.434c0 0.571 0.213 1.049 0.64 1.434 0.427 0.389 0.905 0.581 1.434 0.581zM24.848 12.826c0.57 0 1.067-0.213 1.495-0.64 0.427-0.427 0.64-0.947 0.64-1.556 0-0.57-0.214-1.068-0.64-1.495-0.428-0.427-0.927-0.64-1.495-0.64-0.611 0-1.129 0.213-1.555 0.64-0.428 0.427-0.642 0.926-0.642 1.495 0 0.611 0.213 1.129 0.642 1.556s0.947 0.64 1.555 0.64z"></path></svg>'},74:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 17 32"><path d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path></svg>'},730:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 32"><path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path></svg>'},428:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path></svg>'},254:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M13.725 30l3.9-5.325-3.9-1.125v6.45zM0 17.5l11.050 3.35 13.6-11.55-10.55 12.425 11.8 3.65 6.1-23.375-32 15.5z"></path></svg>'},934:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 28"><path d="M28.633 17.104c0.035 0.21 0.026 0.463-0.026 0.76s-0.14 0.598-0.262 0.904c-0.122 0.306-0.271 0.581-0.445 0.825s-0.367 0.419-0.576 0.524c-0.209 0.105-0.393 0.157-0.55 0.157s-0.332-0.035-0.524-0.105c-0.175-0.052-0.393-0.1-0.655-0.144s-0.528-0.052-0.799-0.026c-0.271 0.026-0.541 0.083-0.812 0.17s-0.502 0.236-0.694 0.445c-0.419 0.437-0.664 0.934-0.734 1.493s0.009 1.092 0.236 1.598c0.175 0.349 0.148 0.699-0.079 1.048-0.105 0.14-0.271 0.284-0.498 0.432s-0.476 0.284-0.747 0.406-0.555 0.218-0.851 0.288c-0.297 0.070-0.559 0.105-0.786 0.105-0.157 0-0.306-0.061-0.445-0.183s-0.236-0.253-0.288-0.393h-0.026c-0.192-0.541-0.52-1.009-0.982-1.402s-1-0.589-1.611-0.589c-0.594 0-1.131 0.197-1.611 0.589s-0.816 0.851-1.009 1.375c-0.087 0.21-0.218 0.362-0.393 0.458s-0.367 0.144-0.576 0.144c-0.244 0-0.52-0.044-0.825-0.131s-0.611-0.197-0.917-0.327c-0.306-0.131-0.581-0.284-0.825-0.458s-0.428-0.349-0.55-0.524c-0.087-0.122-0.135-0.266-0.144-0.432s0.057-0.397 0.197-0.694c0.192-0.402 0.266-0.86 0.223-1.375s-0.266-0.991-0.668-1.428c-0.244-0.262-0.541-0.432-0.891-0.511s-0.681-0.109-0.995-0.092c-0.367 0.017-0.742 0.087-1.127 0.21-0.244 0.070-0.489 0.052-0.734-0.052-0.192-0.070-0.371-0.231-0.537-0.485s-0.314-0.533-0.445-0.838c-0.131-0.306-0.231-0.62-0.301-0.943s-0.087-0.59-0.052-0.799c0.052-0.384 0.227-0.629 0.524-0.734 0.524-0.21 0.995-0.555 1.415-1.035s0.629-1.017 0.629-1.611c0-0.611-0.21-1.144-0.629-1.598s-0.891-0.786-1.415-0.996c-0.157-0.052-0.288-0.179-0.393-0.38s-0.157-0.406-0.157-0.616c0-0.227 0.035-0.48 0.105-0.76s0.162-0.55 0.275-0.812 0.244-0.502 0.393-0.72c0.148-0.218 0.31-0.38 0.485-0.485 0.14-0.087 0.275-0.122 0.406-0.105s0.275 0.052 0.432 0.105c0.524 0.21 1.070 0.275 1.637 0.197s1.070-0.327 1.506-0.747c0.21-0.209 0.362-0.467 0.458-0.773s0.157-0.607 0.183-0.904c0.026-0.297 0.026-0.568 0-0.812s-0.048-0.419-0.065-0.524c-0.035-0.105-0.066-0.227-0.092-0.367s-0.013-0.262 0.039-0.367c0.105-0.244 0.293-0.458 0.563-0.642s0.563-0.336 0.878-0.458c0.314-0.122 0.62-0.214 0.917-0.275s0.533-0.092 0.707-0.092c0.227 0 0.406 0.074 0.537 0.223s0.223 0.301 0.275 0.458c0.192 0.471 0.507 0.886 0.943 1.244s0.952 0.537 1.546 0.537c0.611 0 1.153-0.17 1.624-0.511s0.803-0.773 0.996-1.297c0.070-0.14 0.179-0.284 0.327-0.432s0.301-0.223 0.458-0.223c0.244 0 0.511 0.035 0.799 0.105s0.572 0.166 0.851 0.288c0.279 0.122 0.537 0.279 0.773 0.472s0.423 0.402 0.563 0.629c0.087 0.14 0.113 0.293 0.079 0.458s-0.070 0.284-0.105 0.354c-0.227 0.506-0.297 1.039-0.21 1.598s0.341 1.048 0.76 1.467c0.419 0.419 0.934 0.651 1.546 0.694s1.179-0.057 1.703-0.301c0.14-0.087 0.31-0.122 0.511-0.105s0.371 0.096 0.511 0.236c0.262 0.244 0.493 0.616 0.694 1.113s0.336 1 0.406 1.506c0.035 0.297-0.013 0.528-0.144 0.694s-0.266 0.275-0.406 0.327c-0.542 0.192-1.004 0.528-1.388 1.009s-0.576 1.026-0.576 1.637c0 0.594 0.162 1.113 0.485 1.559s0.747 0.764 1.27 0.956c0.122 0.070 0.227 0.14 0.314 0.21 0.192 0.157 0.323 0.358 0.393 0.602v0zM16.451 19.462c0.786 0 1.528-0.149 2.227-0.445s1.305-0.707 1.821-1.231c0.515-0.524 0.921-1.131 1.218-1.821s0.445-1.428 0.445-2.214c0-0.786-0.148-1.524-0.445-2.214s-0.703-1.292-1.218-1.808c-0.515-0.515-1.122-0.921-1.821-1.218s-1.441-0.445-2.227-0.445c-0.786 0-1.524 0.148-2.214 0.445s-1.292 0.703-1.808 1.218c-0.515 0.515-0.921 1.118-1.218 1.808s-0.445 1.428-0.445 2.214c0 0.786 0.149 1.524 0.445 2.214s0.703 1.297 1.218 1.821c0.515 0.524 1.118 0.934 1.808 1.231s1.428 0.445 2.214 0.445v0z"></path></svg>'},410:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path></svg>'},644:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"></path></svg>'},324:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"></path></svg>'},437:d=>{d.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056z"></path></svg>'},897:(d,f,y)=>{var m=typeof self<"u"?self:typeof window<"u"?window:y.g!==void 0?y.g:{},b=Object.create(m),x=/["&'<>]/;function h(k){return typeof k!="string"&&(k=k==null?"":typeof k=="function"?h(k.call(k)):JSON.stringify(k)),k}b.$escape=function(k){return function(B){var C=""+B,I=x.exec(C);if(!I)return B;var z="",T=void 0,V=void 0,F=void 0;for(T=I.index,V=0;T<C.length;T++){switch(C.charCodeAt(T)){case 34:F="&#34;";break;case 38:F="&#38;";break;case 39:F="&#39;";break;case 60:F="&#60;";break;case 62:F="&#62;";break;default:continue}V!==T&&(z+=C.substring(V,T)),V=T+1,z+=F}return V!==T?z+C.substring(V,T):z}(h(k))},b.$each=function(k,B){if(Array.isArray(k))for(var C=0,I=k.length;C<I;C++)B(k[C],C);else for(var z in k)B(k[z],z)},d.exports=b},471:(d,f,y)=>{d.exports=y(897)},352:d=>{d.exports=function(f){var y=[];return y.toString=function(){return this.map(function(m){var b="",x=m[5]!==void 0;return m[4]&&(b+="@supports (".concat(m[4],") {")),m[2]&&(b+="@media ".concat(m[2]," {")),x&&(b+="@layer".concat(m[5].length>0?" ".concat(m[5]):""," {")),b+=f(m),x&&(b+="}"),m[2]&&(b+="}"),m[4]&&(b+="}"),b}).join("")},y.i=function(m,b,x,h,k){typeof m=="string"&&(m=[[null,m,void 0]]);var B={};if(x)for(var C=0;C<this.length;C++){var I=this[C][0];I!=null&&(B[I]=!0)}for(var z=0;z<m.length;z++){var T=[].concat(m[z]);x&&B[T[0]]||(k!==void 0&&(T[5]===void 0||(T[1]="@layer".concat(T[5].length>0?" ".concat(T[5]):""," {").concat(T[1],"}")),T[5]=k),b&&(T[2]&&(T[1]="@media ".concat(T[2]," {").concat(T[1],"}")),T[2]=b),h&&(T[4]?(T[1]="@supports (".concat(T[4],") {").concat(T[1],"}"),T[4]=h):T[4]="".concat(h)),y.push(T))}},y}},80:d=>{d.exports=function(f,y){return y||(y={}),f&&(f=String(f.__esModule?f.default:f),/^['"].*['"]$/.test(f)&&(f=f.slice(1,-1)),y.hash&&(f+=y.hash),/["'() \t\n]|(%20)/.test(f)||y.needQuotes?'"'.concat(f.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):f)}},415:d=>{d.exports=function(f){var y=f[1],m=f[3];if(!m)return y;if(typeof btoa=="function"){var b=btoa(unescape(encodeURIComponent(JSON.stringify(m)))),x="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(b),h="/*# ".concat(x," */");return[y].concat([h]).join(`
`)}return[y].join(`
`)}},937:d=>{function f(y){return f=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(m){return typeof m}:function(m){return m&&typeof Symbol=="function"&&m.constructor===Symbol&&m!==Symbol.prototype?"symbol":typeof m},f(y)}d.exports=(typeof self>"u"?"undefined":f(self))=="object"?self.FormData:window.FormData},831:d=>{d.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg=="}},r={};function o(d){var f=r[d];if(f!==void 0)return f.exports;var y=r[d]={id:d,exports:{}};return n[d](y,y.exports,o),y.exports}o.m=n,o.n=d=>{var f=d&&d.__esModule?()=>d.default:()=>d;return o.d(f,{a:f}),f},o.d=(d,f)=>{for(var y in f)o.o(f,y)&&!o.o(d,y)&&Object.defineProperty(d,y,{enumerable:!0,get:f[y]})},o.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}(),o.o=(d,f)=>Object.prototype.hasOwnProperty.call(d,f),o.b=document.baseURI||self.location.href,o.nc=void 0;var c={};return(()=>{o.d(c,{default:()=>Zd});var d=o(856),f=o.n(d),y=o(470),m=o.n(y),b=o(370),x=o.n(b),h=o(458),k=o.n(h),B=o(278),C=o.n(B),I=o(488),z=o.n(I),T=o(685),V={};V.styleTagTransform=z(),V.setAttributes=k(),V.insert=x().bind(null,"head"),V.domAPI=m(),V.insertStyleElement=C(),f()(T.Z,V),T.Z&&T.Z.locals&&T.Z.locals;function F(i){return F=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},F(i)}function Ee(i,l){this.name="AggregateError",this.errors=i,this.message=l||""}Ee.prototype=Error.prototype;function Se(i){return Se=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Se(i)}var We=setTimeout;function Xe(i){return!!(i&&i.length!==void 0)}function it(){}function ue(i){if(!(this instanceof ue))throw new TypeError("Promises must be constructed via new");if(typeof i!="function")throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],Be(i,this)}function Ge(i,l){for(;i._state===3;)i=i._value;i._state!==0?(i._handled=!0,ue._immediateFn(function(){var u=i._state===1?l.onFulfilled:l.onRejected;if(u!==null){var a;try{a=u(i._value)}catch(s){return void pe(l.promise,s)}me(l.promise,a)}else(i._state===1?me:pe)(l.promise,i._value)})):i._deferreds.push(l)}function me(i,l){try{if(l===i)throw new TypeError("A promise cannot be resolved with itself.");if(l&&(Se(l)==="object"||typeof l=="function")){var u=l.then;if(l instanceof ue)return i._state=3,i._value=l,void Re(i);if(typeof u=="function")return void Be((a=u,s=l,function(){a.apply(s,arguments)}),i)}i._state=1,i._value=l,Re(i)}catch(p){pe(i,p)}var a,s}function pe(i,l){i._state=2,i._value=l,Re(i)}function Re(i){i._state===2&&i._deferreds.length===0&&ue._immediateFn(function(){i._handled||ue._unhandledRejectionFn(i._value)});for(var l=0,u=i._deferreds.length;l<u;l++)Ge(i,i._deferreds[l]);i._deferreds=null}function Ye(i,l,u){this.onFulfilled=typeof i=="function"?i:null,this.onRejected=typeof l=="function"?l:null,this.promise=u}function Be(i,l){var u=!1;try{i(function(a){u||(u=!0,me(l,a))},function(a){u||(u=!0,pe(l,a))})}catch(a){if(u)return;u=!0,pe(l,a)}}ue.prototype.catch=function(i){return this.then(null,i)},ue.prototype.then=function(i,l){var u=new this.constructor(it);return Ge(this,new Ye(i,l,u)),u},ue.prototype.finally=function(i){var l=this.constructor;return this.then(function(u){return l.resolve(i()).then(function(){return u})},function(u){return l.resolve(i()).then(function(){return l.reject(u)})})},ue.all=function(i){return new ue(function(l,u){if(!Xe(i))return u(new TypeError("Promise.all accepts an array"));var a=Array.prototype.slice.call(i);if(a.length===0)return l([]);var s=a.length;function p(g,v){try{if(v&&(Se(v)==="object"||typeof v=="function")){var L=v.then;if(typeof L=="function")return void L.call(v,function(_){p(g,_)},u)}a[g]=v,--s==0&&l(a)}catch(_){u(_)}}for(var A=0;A<a.length;A++)p(A,a[A])})},ue.any=function(i){var l=this;return new l(function(u,a){if(!i||i.length===void 0)return a(new TypeError("Promise.any accepts an array"));var s=Array.prototype.slice.call(i);if(s.length===0)return a();for(var p=[],A=0;A<s.length;A++)try{l.resolve(s[A]).then(u).catch(function(g){p.push(g),p.length===s.length&&a(new Ee(p,"All promises were rejected"))})}catch(g){a(g)}})},ue.allSettled=function(i){return new this(function(l,u){if(!i||i.length===void 0)return u(new TypeError(F(i)+" "+i+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var a=Array.prototype.slice.call(i);if(a.length===0)return l([]);var s=a.length;function p(g,v){if(v&&(F(v)==="object"||typeof v=="function")){var L=v.then;if(typeof L=="function")return void L.call(v,function(_){p(g,_)},function(_){a[g]={status:"rejected",reason:_},--s==0&&l(a)})}a[g]={status:"fulfilled",value:v},--s==0&&l(a)}for(var A=0;A<a.length;A++)p(A,a[A])})},ue.resolve=function(i){return i&&Se(i)==="object"&&i.constructor===ue?i:new ue(function(l){l(i)})},ue.reject=function(i){return new ue(function(l,u){u(i)})},ue.race=function(i){return new ue(function(l,u){if(!Xe(i))return u(new TypeError("Promise.race accepts an array"));for(var a=0,s=i.length;a<s;a++)ue.resolve(i[a]).then(l,u)})},ue._immediateFn=typeof setImmediate=="function"&&function(i){setImmediate(i)}||function(i){We(i,0)},ue._unhandledRejectionFn=function(i){typeof console<"u"&&console&&console.warn("Possible Unhandled Promise Rejection:",i)};const be=ue;var fe=/mobile/i.test(window.navigator.userAgent);const te={secondToTime:function(i){if((i=i||0)===0||i===1/0||i.toString()==="NaN")return"00:00";var l=Math.floor(i/3600),u=Math.floor((i-3600*l)/60),a=Math.floor(i-3600*l-60*u);return(l>0?[l,u,a]:[u,a]).map(function(s){return s<10?"0"+s:""+s}).join(":")},getElementViewLeft:function(i){var l=i.offsetLeft,u=i.offsetParent,a=document.body.scrollLeft+document.documentElement.scrollLeft;if(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement)for(;u!==null&&u!==i;)l+=u.offsetLeft,u=u.offsetParent;else for(;u!==null;)l+=u.offsetLeft,u=u.offsetParent;return l-a},getBoundingClientRectViewLeft:function(i){var l=window.scrollY||window.pageYOffset||document.body.scrollTop+(document.documentElement&&document.documentElement.scrollTop||0);if(i.getBoundingClientRect){if(typeof this.getBoundingClientRectViewLeft.offset!="number"){var u=document.createElement("div");u.style.cssText="position:absolute;top:0;left:0;",document.body.appendChild(u),this.getBoundingClientRectViewLeft.offset=-u.getBoundingClientRect().top-l,document.body.removeChild(u),u=null}var a=i.getBoundingClientRect(),s=this.getBoundingClientRectViewLeft.offset;return a.left+s}return this.getElementViewLeft(i)},getScrollPosition:function(){return{left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0}},setScrollPosition:function(i){var l=i.left,u=l===void 0?0:l,a=i.top,s=a===void 0?0:a;this.isFirefox?(document.documentElement.scrollLeft=u,document.documentElement.scrollTop=s):window.scrollTo(u,s)},isMobile:fe,isFirefox:/firefox/i.test(window.navigator.userAgent),isChrome:/chrome/i.test(window.navigator.userAgent),isSafari:/safari/i.test(window.navigator.userAgent),storage:{set:function(i,l){localStorage.setItem(i,l)},get:function(i){return localStorage.getItem(i)}},nameMap:{dragStart:fe?"touchstart":"mousedown",dragMove:fe?"touchmove":"mousemove",dragEnd:fe?"touchend":"mouseup"},color2Number:function(i){return i[0]==="#"&&(i=i.substr(1)),i.length===3&&(i="".concat(i[0]).concat(i[0]).concat(i[1]).concat(i[1]).concat(i[2]).concat(i[2])),parseInt(i,16)+0&16777215},number2Color:function(i){return"#"+("00000"+i.toString(16)).slice(-6)},number2Type:function(i){switch(i){case 0:default:return"right";case 1:return"top";case 2:return"bottom"}}};function pt(i,l){return function(){return i.apply(l,arguments)}}function Ke(i){return Ke=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Ke(i)}var qe,Lt=Object.prototype.toString,vt=Object.getPrototypeOf,zt=(qe=Object.create(null),function(i){var l=Lt.call(i);return qe[l]||(qe[l]=l.slice(8,-1).toLowerCase())}),Le=function(i){return i=i.toLowerCase(),function(l){return zt(l)===i}},j=function(i){return function(l){return Ke(l)===i}},Z=Array.isArray,W=j("undefined"),ne=Le("ArrayBuffer"),he=j("string"),E=j("function"),w=j("number"),S=function(i){return i!==null&&Ke(i)==="object"},O=function(i){if(zt(i)!=="object")return!1;var l=vt(i);return!(l!==null&&l!==Object.prototype&&Object.getPrototypeOf(l)!==null||Symbol.toStringTag in i||Symbol.iterator in i)},M=Le("Date"),q=Le("File"),J=Le("Blob"),N=Le("FileList"),K=Le("URLSearchParams");function D(i,l){var u,a,s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},p=s.allOwnKeys,A=p!==void 0&&p;if(i!=null)if(Ke(i)!=="object"&&(i=[i]),Z(i))for(u=0,a=i.length;u<a;u++)l.call(null,i[u],u,i);else{var g,v=A?Object.getOwnPropertyNames(i):Object.keys(i),L=v.length;for(u=0;u<L;u++)g=v[u],l.call(null,i[g],g,i)}}function re(i,l){l=l.toLowerCase();for(var u,a=Object.keys(i),s=a.length;s-- >0;)if(l===(u=a[s]).toLowerCase())return u;return null}var G,oe,ae=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:Lh,ce=function(i){return!W(i)&&i!==ae},ke=(G=typeof Uint8Array<"u"&&vt(Uint8Array),function(i){return G&&i instanceof G}),ve=Le("HTMLFormElement"),Oe=(oe=Object.prototype.hasOwnProperty,function(i,l){return oe.call(i,l)}),ot=Le("RegExp"),It=function(i,l){var u=Object.getOwnPropertyDescriptors(i),a={};D(u,function(s,p){l(s,p,i)!==!1&&(a[p]=s)}),Object.defineProperties(i,a)};const R={isArray:Z,isArrayBuffer:ne,isBuffer:function(i){return i!==null&&!W(i)&&i.constructor!==null&&!W(i.constructor)&&E(i.constructor.isBuffer)&&i.constructor.isBuffer(i)},isFormData:function(i){var l="[object FormData]";return i&&(typeof FormData=="function"&&i instanceof FormData||Lt.call(i)===l||E(i.toString)&&i.toString()===l)},isArrayBufferView:function(i){return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?ArrayBuffer.isView(i):i&&i.buffer&&ne(i.buffer)},isString:he,isNumber:w,isBoolean:function(i){return i===!0||i===!1},isObject:S,isPlainObject:O,isUndefined:W,isDate:M,isFile:q,isBlob:J,isRegExp:ot,isFunction:E,isStream:function(i){return S(i)&&E(i.pipe)},isURLSearchParams:K,isTypedArray:ke,isFileList:N,forEach:D,merge:function i(){for(var l=ce(this)&&this||{},u=l.caseless,a={},s=function(g,v){var L=u&&re(a,v)||v;O(a[L])&&O(g)?a[L]=i(a[L],g):O(g)?a[L]=i({},g):Z(g)?a[L]=g.slice():a[L]=g},p=0,A=arguments.length;p<A;p++)arguments[p]&&D(arguments[p],s);return a},extend:function(i,l,u){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},s=a.allOwnKeys;return D(l,function(p,A){u&&E(p)?i[A]=pt(p,u):i[A]=p},{allOwnKeys:s}),i},trim:function(i){return i.trim?i.trim():i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},stripBOM:function(i){return i.charCodeAt(0)===65279&&(i=i.slice(1)),i},inherits:function(i,l,u,a){i.prototype=Object.create(l.prototype,a),i.prototype.constructor=i,Object.defineProperty(i,"super",{value:l.prototype}),u&&Object.assign(i.prototype,u)},toFlatObject:function(i,l,u,a){var s,p,A,g={};if(l=l||{},i==null)return l;do{for(p=(s=Object.getOwnPropertyNames(i)).length;p-- >0;)A=s[p],a&&!a(A,i,l)||g[A]||(l[A]=i[A],g[A]=!0);i=u!==!1&&vt(i)}while(i&&(!u||u(i,l))&&i!==Object.prototype);return l},kindOf:zt,kindOfTest:Le,endsWith:function(i,l,u){i=String(i),(u===void 0||u>i.length)&&(u=i.length),u-=l.length;var a=i.indexOf(l,u);return a!==-1&&a===u},toArray:function(i){if(!i)return null;if(Z(i))return i;var l=i.length;if(!w(l))return null;for(var u=new Array(l);l-- >0;)u[l]=i[l];return u},forEachEntry:function(i,l){for(var u,a=(i&&i[Symbol.iterator]).call(i);(u=a.next())&&!u.done;){var s=u.value;l.call(i,s[0],s[1])}},matchAll:function(i,l){for(var u,a=[];(u=i.exec(l))!==null;)a.push(u);return a},isHTMLForm:ve,hasOwnProperty:Oe,hasOwnProp:Oe,reduceDescriptors:It,freezeMethods:function(i){It(i,function(l,u){if(E(i)&&["arguments","caller","callee"].indexOf(u)!==-1)return!1;var a=i[u];E(a)&&(l.enumerable=!1,"writable"in l?l.writable=!1:l.set||(l.set=function(){throw Error("Can not rewrite read-only method '"+u+"'")}))})},toObjectSet:function(i,l){var u={},a=function(s){s.forEach(function(p){u[p]=!0})};return Z(i)?a(i):a(String(i).split(l)),u},toCamelCase:function(i){return i.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,function(l,u,a){return u.toUpperCase()+a})},noop:function(){},toFiniteNumber:function(i,l){return i=+i,Number.isFinite(i)?i:l},findKey:re,global:ae,isContextDefined:ce,toJSONObject:function(i){var l=new Array(10);return function u(a,s){if(S(a)){if(l.indexOf(a)>=0)return;if(!("toJSON"in a)){l[s]=a;var p=Z(a)?[]:{};return D(a,function(A,g){var v=u(A,s+1);!W(v)&&(p[g]=v)}),l[s]=void 0,p}}return a}(i,0)}};function lt(i,l,u,a,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=i,this.name="AxiosError",l&&(this.code=l),u&&(this.config=u),a&&(this.request=a),s&&(this.response=s)}R.inherits(lt,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:R.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var Cn=lt.prototype,Qe={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(function(i){Qe[i]={value:i}}),Object.defineProperties(lt,Qe),Object.defineProperty(Cn,"isAxiosError",{value:!0}),lt.from=function(i,l,u,a,s,p){var A=Object.create(Cn);return R.toFlatObject(i,A,function(g){return g!==Error.prototype},function(g){return g!=="isAxiosError"}),lt.call(A,i.message,l,u,a,s),A.cause=i,A.name=i.name,p&&Object.assign(A,p),A};const de=lt,gr=o(937);function bo(i){return bo=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},bo(i)}function go(i){return R.isPlainObject(i)||R.isArray(i)}function qa(i){return R.endsWith(i,"[]")?i.slice(0,-2):i}function Fa(i,l,u){return i?i.concat(l).map(function(a,s){return a=qa(a),!u&&s?"["+a+"]":a}).join(u?".":""):l}var Zs=R.toFlatObject(R,{},null,function(i){return/^is[A-Z]/.test(i)});const vr=function(i,l,u){if(!R.isObject(i))throw new TypeError("target must be an object");l=l||new(gr||FormData);var a,s=(u=R.toFlatObject(u,{metaTokens:!0,dots:!1,indexes:!1},!1,function(X,$){return!R.isUndefined($[X])})).metaTokens,p=u.visitor||_,A=u.dots,g=u.indexes,v=(u.Blob||typeof Blob<"u"&&Blob)&&(a=l)&&R.isFunction(a.append)&&a[Symbol.toStringTag]==="FormData"&&a[Symbol.iterator];if(!R.isFunction(p))throw new TypeError("visitor must be a function");function L(X){if(X===null)return"";if(R.isDate(X))return X.toISOString();if(!v&&R.isBlob(X))throw new de("Blob is not supported. Use a Buffer instead.");return R.isArrayBuffer(X)||R.isTypedArray(X)?v&&typeof Blob=="function"?new Blob([X]):Buffer.from(X):X}function _(X,$,Y){var ee=X;if(X&&!Y&&bo(X)==="object"){if(R.endsWith($,"{}"))$=s?$:$.slice(0,-2),X=JSON.stringify(X);else if(R.isArray(X)&&function(ie){return R.isArray(ie)&&!ie.some(go)}(X)||R.isFileList(X)||R.endsWith($,"[]")&&(ee=R.toArray(X)))return $=qa($),ee.forEach(function(ie,ze){!R.isUndefined(ie)&&ie!==null&&l.append(g===!0?Fa([$],ze,A):g===null?$:$+"[]",L(ie))}),!1}return!!go(X)||(l.append(Fa(Y,$,A),L(X)),!1)}var U=[],Q=Object.assign(Zs,{defaultVisitor:_,convertValue:L,isVisitable:go});if(!R.isObject(i))throw new TypeError("data must be an object");return function X($,Y){if(!R.isUndefined($)){if(U.indexOf($)!==-1)throw Error("Circular reference detected in "+Y.join("."));U.push($),R.forEach($,function(ee,ie){(!(R.isUndefined(ee)||ee===null)&&p.call(l,ee,R.isString(ie)?ie.trim():ie,Y,Q))===!0&&X(ee,Y?Y.concat(ie):[ie])}),U.pop()}}(i),l};function Na(i){var l={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(i).replace(/[!'()~]|%20|%00/g,function(u){return l[u]})}function Ua(i,l){this._pairs=[],i&&vr(i,this,l)}var Ha=Ua.prototype;Ha.append=function(i,l){this._pairs.push([i,l])},Ha.toString=function(i){var l=i?function(u){return i.call(this,u,Na)}:Na;return this._pairs.map(function(u){return l(u[0])+"="+l(u[1])},"").join("&")};const Wa=Ua;function Js(i){return encodeURIComponent(i).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Ya(i,l,u){if(!l)return i;var a,s=u&&u.encode||Js,p=u&&u.serialize;if(a=p?p(l,u):R.isURLSearchParams(l)?l.toString():new Wa(l,u).toString(s)){var A=i.indexOf("#");A!==-1&&(i=i.slice(0,A)),i+=(i.indexOf("?")===-1?"?":"&")+a}return i}function Bn(i){return Bn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Bn(i)}function Xs(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Bn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Bn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Bn(s)==="symbol"?s:String(s)),a)}var s}var Gs=function(){function i(){(function(a,s){if(!(a instanceof s))throw new TypeError("Cannot call a class as a function")})(this,i),this.handlers=[]}var l,u;return l=i,u=[{key:"use",value:function(a,s,p){return this.handlers.push({fulfilled:a,rejected:s,synchronous:!!p&&p.synchronous,runWhen:p?p.runWhen:null}),this.handlers.length-1}},{key:"eject",value:function(a){this.handlers[a]&&(this.handlers[a]=null)}},{key:"clear",value:function(){this.handlers&&(this.handlers=[])}},{key:"forEach",value:function(a){R.forEach(this.handlers,function(s){s!==null&&a(s)})}}],u&&Xs(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Ka=Gs,Qa={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},ec=typeof URLSearchParams<"u"?URLSearchParams:Wa,tc=FormData;var vo,nc=(typeof navigator>"u"||(vo=navigator.product)!=="ReactNative"&&vo!=="NativeScript"&&vo!=="NS")&&typeof window<"u"&&typeof document<"u",rc=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function";const xt={isBrowser:!0,classes:{URLSearchParams:ec,FormData:tc,Blob},isStandardBrowserEnv:nc,isStandardBrowserWebWorkerEnv:rc,protocols:["http","https","file","blob","url","data"]},Va=function(i){function l(a,s,p,A){var g=a[A++],v=Number.isFinite(+g),L=A>=a.length;return g=!g&&R.isArray(p)?p.length:g,L?(R.hasOwnProp(p,g)?p[g]=[p[g],s]:p[g]=s,!v):(p[g]&&R.isObject(p[g])||(p[g]=[]),l(a,s,p[g],A)&&R.isArray(p[g])&&(p[g]=function(_){var U,Q,X={},$=Object.keys(_),Y=$.length;for(U=0;U<Y;U++)X[Q=$[U]]=_[Q];return X}(p[g])),!v)}if(R.isFormData(i)&&R.isFunction(i.entries)){var u={};return R.forEachEntry(i,function(a,s){l(function(p){return R.matchAll(/\w+|\[(\w*)]/g,p).map(function(A){return A[0]==="[]"?"":A[1]||A[0]})}(a),s,u,0)}),u}return null};var oc={"Content-Type":void 0},xr={transitional:Qa,adapter:["xhr","http"],transformRequest:[function(i,l){var u,a=l.getContentType()||"",s=a.indexOf("application/json")>-1,p=R.isObject(i);if(p&&R.isHTMLForm(i)&&(i=new FormData(i)),R.isFormData(i))return s&&s?JSON.stringify(Va(i)):i;if(R.isArrayBuffer(i)||R.isBuffer(i)||R.isStream(i)||R.isFile(i)||R.isBlob(i))return i;if(R.isArrayBufferView(i))return i.buffer;if(R.isURLSearchParams(i))return l.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),i.toString();if(p){if(a.indexOf("application/x-www-form-urlencoded")>-1)return function(g,v){return vr(g,new xt.classes.URLSearchParams,Object.assign({visitor:function(L,_,U,Q){return xt.isNode&&R.isBuffer(L)?(this.append(_,L.toString("base64")),!1):Q.defaultVisitor.apply(this,arguments)}},v))}(i,this.formSerializer).toString();if((u=R.isFileList(i))||a.indexOf("multipart/form-data")>-1){var A=this.env&&this.env.FormData;return vr(u?{"files[]":i}:i,A&&new A,this.formSerializer)}}return p||s?(l.setContentType("application/json",!1),function(g,v,L){if(R.isString(g))try{return(0,JSON.parse)(g),R.trim(g)}catch(_){if(_.name!=="SyntaxError")throw _}return(0,JSON.stringify)(g)}(i)):i}],transformResponse:[function(i){var l=this.transitional||xr.transitional,u=l&&l.forcedJSONParsing,a=this.responseType==="json";if(i&&R.isString(i)&&(u&&!this.responseType||a)){var s=!(l&&l.silentJSONParsing)&&a;try{return JSON.parse(i)}catch(p){if(s)throw p.name==="SyntaxError"?de.from(p,de.ERR_BAD_RESPONSE,this,null,this.response):p}}return i}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:xt.classes.FormData,Blob:xt.classes.Blob},validateStatus:function(i){return i>=200&&i<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};R.forEach(["delete","get","head"],function(i){xr.headers[i]={}}),R.forEach(["post","put","patch"],function(i){xr.headers[i]=R.merge(oc)});const xo=xr;var ac=R.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]);function Sn(i){return Sn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Sn(i)}function $a(i,l){(l==null||l>i.length)&&(l=i.length);for(var u=0,a=new Array(l);u<l;u++)a[u]=i[u];return a}function Za(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Sn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Sn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Sn(s)==="symbol"?s:String(s)),a)}var s}var Ja=Symbol("internals");function Ln(i){return i&&String(i).trim().toLowerCase()}function Er(i){return i===!1||i==null?i:R.isArray(i)?i.map(Er):String(i)}function Xa(i,l,u,a){return R.isFunction(a)?a.call(this,l,u):R.isString(l)?R.isString(a)?l.indexOf(a)!==-1:R.isRegExp(a)?a.test(l):void 0:void 0}var wr=function(i,l){function u(A){(function(g,v){if(!(g instanceof v))throw new TypeError("Cannot call a class as a function")})(this,u),A&&this.set(A)}var a,s,p;return a=u,s=[{key:"set",value:function(A,g,v){var L=this;function _(ie,ze,Pe){var Ce=Ln(ze);if(!Ce)throw new Error("header name must be a non-empty string");var qt=R.findKey(L,Ce);(!qt||L[qt]===void 0||Pe===!0||Pe===void 0&&L[qt]!==!1)&&(L[qt||ze]=Er(ie))}var U,Q,X,$,Y,ee=function(ie,ze){return R.forEach(ie,function(Pe,Ce){return _(Pe,Ce,ze)})};return R.isPlainObject(A)||A instanceof this.constructor?ee(A,g):R.isString(A)&&(A=A.trim())&&!/^[-_a-zA-Z]+$/.test(A.trim())?ee((Y={},(U=A)&&U.split(`
`).forEach(function(ie){$=ie.indexOf(":"),Q=ie.substring(0,$).trim().toLowerCase(),X=ie.substring($+1).trim(),!Q||Y[Q]&&ac[Q]||(Q==="set-cookie"?Y[Q]?Y[Q].push(X):Y[Q]=[X]:Y[Q]=Y[Q]?Y[Q]+", "+X:X)}),Y),g):A!=null&&_(g,A,v),this}},{key:"get",value:function(A,g){if(A=Ln(A)){var v=R.findKey(this,A);if(v){var L=this[v];if(!g)return L;if(g===!0)return function(_){for(var U,Q=Object.create(null),X=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;U=X.exec(_);)Q[U[1]]=U[2];return Q}(L);if(R.isFunction(g))return g.call(this,L,v);if(R.isRegExp(g))return g.exec(L);throw new TypeError("parser must be boolean|regexp|function")}}}},{key:"has",value:function(A,g){if(A=Ln(A)){var v=R.findKey(this,A);return!(!v||g&&!Xa(0,this[v],v,g))}return!1}},{key:"delete",value:function(A,g){var v=this,L=!1;function _(U){if(U=Ln(U)){var Q=R.findKey(v,U);!Q||g&&!Xa(0,v[Q],Q,g)||(delete v[Q],L=!0)}}return R.isArray(A)?A.forEach(_):_(A),L}},{key:"clear",value:function(){return Object.keys(this).forEach(this.delete.bind(this))}},{key:"normalize",value:function(A){var g=this,v={};return R.forEach(this,function(L,_){var U=R.findKey(v,_);if(U)return g[U]=Er(L),void delete g[_];var Q=A?function(X){return X.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,function($,Y,ee){return Y.toUpperCase()+ee})}(_):String(_).trim();Q!==_&&delete g[_],g[Q]=Er(L),v[Q]=!0}),this}},{key:"concat",value:function(){for(var A,g=arguments.length,v=new Array(g),L=0;L<g;L++)v[L]=arguments[L];return(A=this.constructor).concat.apply(A,[this].concat(v))}},{key:"toJSON",value:function(A){var g=Object.create(null);return R.forEach(this,function(v,L){v!=null&&v!==!1&&(g[L]=A&&R.isArray(v)?v.join(", "):v)}),g}},{key:Symbol.iterator,value:function(){return Object.entries(this.toJSON())[Symbol.iterator]()}},{key:"toString",value:function(){return Object.entries(this.toJSON()).map(function(A){var g,v,L=(v=2,function(_){if(Array.isArray(_))return _}(g=A)||function(_,U){var Q=_==null?null:typeof Symbol<"u"&&_[Symbol.iterator]||_["@@iterator"];if(Q!=null){var X,$,Y,ee,ie=[],ze=!0,Pe=!1;try{if(Y=(Q=Q.call(_)).next,U===0){if(Object(Q)!==Q)return;ze=!1}else for(;!(ze=(X=Y.call(Q)).done)&&(ie.push(X.value),ie.length!==U);ze=!0);}catch(Ce){Pe=!0,$=Ce}finally{try{if(!ze&&Q.return!=null&&(ee=Q.return(),Object(ee)!==ee))return}finally{if(Pe)throw $}}return ie}}(g,v)||function(_,U){if(_){if(typeof _=="string")return $a(_,U);var Q=Object.prototype.toString.call(_).slice(8,-1);return Q==="Object"&&_.constructor&&(Q=_.constructor.name),Q==="Map"||Q==="Set"?Array.from(_):Q==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(Q)?$a(_,U):void 0}}(g,v)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}());return L[0]+": "+L[1]}).join(`
`)}},{key:Symbol.toStringTag,get:function(){return"AxiosHeaders"}}],p=[{key:"from",value:function(A){return A instanceof this?A:new this(A)}},{key:"concat",value:function(A){for(var g=new this(A),v=arguments.length,L=new Array(v>1?v-1:0),_=1;_<v;_++)L[_-1]=arguments[_];return L.forEach(function(U){return g.set(U)}),g}},{key:"accessor",value:function(A){var g=(this[Ja]=this[Ja]={accessors:{}}).accessors,v=this.prototype;function L(_){var U=Ln(_);g[U]||(function(Q,X){var $=R.toCamelCase(" "+X);["get","set","has"].forEach(function(Y){Object.defineProperty(Q,Y+$,{value:function(ee,ie,ze){return this[Y].call(this,X,ee,ie,ze)},configurable:!0})})}(v,_),g[U]=!0)}return R.isArray(A)?A.forEach(L):L(A),this}}],s&&Za(a.prototype,s),p&&Za(a,p),Object.defineProperty(a,"prototype",{writable:!1}),u}();wr.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent"]),R.freezeMethods(wr.prototype),R.freezeMethods(wr);const _t=wr;function Eo(i,l){var u=this||xo,a=l||u,s=_t.from(a.headers),p=a.data;return R.forEach(i,function(A){p=A.call(u,p,s.normalize(),l?l.status:void 0)}),s.normalize(),p}function Ga(i){return!(!i||!i.__CANCEL__)}function ei(i,l,u){de.call(this,i??"canceled",de.ERR_CANCELED,l,u),this.name="CanceledError"}R.inherits(ei,de,{__CANCEL__:!0});const kr=ei,ic=xt.isStandardBrowserEnv?{write:function(i,l,u,a,s,p){var A=[];A.push(i+"="+encodeURIComponent(l)),R.isNumber(u)&&A.push("expires="+new Date(u).toGMTString()),R.isString(a)&&A.push("path="+a),R.isString(s)&&A.push("domain="+s),p===!0&&A.push("secure"),document.cookie=A.join("; ")},read:function(i){var l=document.cookie.match(new RegExp("(^|;\\s*)("+i+")=([^;]*)"));return l?decodeURIComponent(l[3]):null},remove:function(i){this.write(i,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};function ti(i,l){return i&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(l)?function(u,a){return a?u.replace(/\/+$/,"")+"/"+a.replace(/^\/+/,""):u}(i,l):l}const lc=xt.isStandardBrowserEnv?function(){var i,l=/(msie|trident)/i.test(navigator.userAgent),u=document.createElement("a");function a(s){var p=s;return l&&(u.setAttribute("href",p),p=u.href),u.setAttribute("href",p),{href:u.href,protocol:u.protocol?u.protocol.replace(/:$/,""):"",host:u.host,search:u.search?u.search.replace(/^\?/,""):"",hash:u.hash?u.hash.replace(/^#/,""):"",hostname:u.hostname,port:u.port,pathname:u.pathname.charAt(0)==="/"?u.pathname:"/"+u.pathname}}return i=a(window.location.href),function(s){var p=R.isString(s)?a(s):s;return p.protocol===i.protocol&&p.host===i.host}}():function(){return!0};function ni(i,l){var u=0,a=function(s,p){s=s||10;var A,g=new Array(s),v=new Array(s),L=0,_=0;return p=p!==void 0?p:1e3,function(U){var Q=Date.now(),X=v[_];A||(A=Q),g[L]=U,v[L]=Q;for(var $=_,Y=0;$!==L;)Y+=g[$++],$%=s;if((L=(L+1)%s)===_&&(_=(_+1)%s),!(Q-A<p)){var ee=X&&Q-X;return ee?Math.round(1e3*Y/ee):void 0}}}(50,250);return function(s){var p=s.loaded,A=s.lengthComputable?s.total:void 0,g=p-u,v=a(g);u=p;var L={loaded:p,total:A,progress:A?p/A:void 0,bytes:g,rate:v||void 0,estimated:v&&A&&p<=A?(A-p)/v:void 0,event:s};L[l?"download":"upload"]=!0,i(L)}}var wo={http:null,xhr:typeof XMLHttpRequest<"u"&&function(i){return new Promise(function(l,u){var a,s=i.data,p=_t.from(i.headers).normalize(),A=i.responseType;function g(){i.cancelToken&&i.cancelToken.unsubscribe(a),i.signal&&i.signal.removeEventListener("abort",a)}R.isFormData(s)&&(xt.isStandardBrowserEnv||xt.isStandardBrowserWebWorkerEnv)&&p.setContentType(!1);var v=new XMLHttpRequest;if(i.auth){var L=i.auth.username||"",_=i.auth.password?unescape(encodeURIComponent(i.auth.password)):"";p.set("Authorization","Basic "+btoa(L+":"+_))}var U=ti(i.baseURL,i.url);function Q(){if(v){var ee=_t.from("getAllResponseHeaders"in v&&v.getAllResponseHeaders());(function(ie,ze,Pe){var Ce=Pe.config.validateStatus;Pe.status&&Ce&&!Ce(Pe.status)?ze(new de("Request failed with status code "+Pe.status,[de.ERR_BAD_REQUEST,de.ERR_BAD_RESPONSE][Math.floor(Pe.status/100)-4],Pe.config,Pe.request,Pe)):ie(Pe)})(function(ie){l(ie),g()},function(ie){u(ie),g()},{data:A&&A!=="text"&&A!=="json"?v.response:v.responseText,status:v.status,statusText:v.statusText,headers:ee,config:i,request:v}),v=null}}if(v.open(i.method.toUpperCase(),Ya(U,i.params,i.paramsSerializer),!0),v.timeout=i.timeout,"onloadend"in v?v.onloadend=Q:v.onreadystatechange=function(){v&&v.readyState===4&&(v.status!==0||v.responseURL&&v.responseURL.indexOf("file:")===0)&&setTimeout(Q)},v.onabort=function(){v&&(u(new de("Request aborted",de.ECONNABORTED,i,v)),v=null)},v.onerror=function(){u(new de("Network Error",de.ERR_NETWORK,i,v)),v=null},v.ontimeout=function(){var ee=i.timeout?"timeout of "+i.timeout+"ms exceeded":"timeout exceeded",ie=i.transitional||Qa;i.timeoutErrorMessage&&(ee=i.timeoutErrorMessage),u(new de(ee,ie.clarifyTimeoutError?de.ETIMEDOUT:de.ECONNABORTED,i,v)),v=null},xt.isStandardBrowserEnv){var X=(i.withCredentials||lc(U))&&i.xsrfCookieName&&ic.read(i.xsrfCookieName);X&&p.set(i.xsrfHeaderName,X)}s===void 0&&p.setContentType(null),"setRequestHeader"in v&&R.forEach(p.toJSON(),function(ee,ie){v.setRequestHeader(ie,ee)}),R.isUndefined(i.withCredentials)||(v.withCredentials=!!i.withCredentials),A&&A!=="json"&&(v.responseType=i.responseType),typeof i.onDownloadProgress=="function"&&v.addEventListener("progress",ni(i.onDownloadProgress,!0)),typeof i.onUploadProgress=="function"&&v.upload&&v.upload.addEventListener("progress",ni(i.onUploadProgress)),(i.cancelToken||i.signal)&&(a=function(ee){v&&(u(!ee||ee.type?new kr(null,i,v):ee),v.abort(),v=null)},i.cancelToken&&i.cancelToken.subscribe(a),i.signal&&(i.signal.aborted?a():i.signal.addEventListener("abort",a)));var $,Y=($=/^([-+\w]{1,25})(:?\/\/|:)/.exec(U))&&$[1]||"";Y&&xt.protocols.indexOf(Y)===-1?u(new de("Unsupported protocol "+Y+":",de.ERR_BAD_REQUEST,i)):v.send(s||null)})}};R.forEach(wo,function(i,l){if(i){try{Object.defineProperty(i,"name",{value:l})}catch{}Object.defineProperty(i,"adapterName",{value:l})}});function ko(i){if(i.cancelToken&&i.cancelToken.throwIfRequested(),i.signal&&i.signal.aborted)throw new kr(null,i)}function ri(i){return ko(i),i.headers=_t.from(i.headers),i.data=Eo.call(i,i.transformRequest),["post","put","patch"].indexOf(i.method)!==-1&&i.headers.setContentType("application/x-www-form-urlencoded",!1),function(l){for(var u,a,s=(l=R.isArray(l)?l:[l]).length,p=0;p<s&&(u=l[p],!(a=R.isString(u)?wo[u.toLowerCase()]:u));p++);if(!a)throw a===!1?new de("Adapter ".concat(u," is not supported by the environment"),"ERR_NOT_SUPPORT"):new Error(R.hasOwnProp(wo,u)?"Adapter '".concat(u,"' is not available in the build"):"Unknown adapter '".concat(u,"'"));if(!R.isFunction(a))throw new TypeError("adapter is not a function");return a}(i.adapter||xo.adapter)(i).then(function(l){return ko(i),l.data=Eo.call(i,i.transformResponse,l),l.headers=_t.from(l.headers),l},function(l){return Ga(l)||(ko(i),l&&l.response&&(l.response.data=Eo.call(i,i.transformResponse,l.response),l.response.headers=_t.from(l.response.headers))),Promise.reject(l)})}var oi=function(i){return i instanceof _t?i.toJSON():i};function nn(i,l){l=l||{};var u={};function a(L,_,U){return R.isPlainObject(L)&&R.isPlainObject(_)?R.merge.call({caseless:U},L,_):R.isPlainObject(_)?R.merge({},_):R.isArray(_)?_.slice():_}function s(L,_,U){return R.isUndefined(_)?R.isUndefined(L)?void 0:a(void 0,L,U):a(L,_,U)}function p(L,_){if(!R.isUndefined(_))return a(void 0,_)}function A(L,_){return R.isUndefined(_)?R.isUndefined(L)?void 0:a(void 0,L):a(void 0,_)}function g(L,_,U){return U in l?a(L,_):U in i?a(void 0,L):void 0}var v={url:p,method:p,data:p,baseURL:A,transformRequest:A,transformResponse:A,paramsSerializer:A,timeout:A,timeoutMessage:A,withCredentials:A,adapter:A,responseType:A,xsrfCookieName:A,xsrfHeaderName:A,onUploadProgress:A,onDownloadProgress:A,decompress:A,maxContentLength:A,maxBodyLength:A,beforeRedirect:A,transport:A,httpAgent:A,httpsAgent:A,cancelToken:A,socketPath:A,responseEncoding:A,validateStatus:g,headers:function(L,_){return s(oi(L),oi(_),!0)}};return R.forEach(Object.keys(i).concat(Object.keys(l)),function(L){var _=v[L]||s,U=_(i[L],l[L],L);R.isUndefined(U)&&_!==g||(u[L]=U)}),u}function Cr(i){return Cr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Cr(i)}var Co={};["object","boolean","number","function","string","symbol"].forEach(function(i,l){Co[i]=function(u){return Cr(u)===i||"a"+(l<1?"n ":" ")+i}});var ai={};Co.transitional=function(i,l,u){function a(s,p){return"[Axios v1.2.3] Transitional option '"+s+"'"+p+(u?". "+u:"")}return function(s,p,A){if(i===!1)throw new de(a(p," has been removed"+(l?" in "+l:"")),de.ERR_DEPRECATED);return l&&!ai[p]&&(ai[p]=!0,console.warn(a(p," has been deprecated since v"+l+" and will be removed in the near future"))),!i||i(s,p,A)}};const Bo={assertOptions:function(i,l,u){if(Cr(i)!=="object")throw new de("options must be an object",de.ERR_BAD_OPTION_VALUE);for(var a=Object.keys(i),s=a.length;s-- >0;){var p=a[s],A=l[p];if(A){var g=i[p],v=g===void 0||A(g,p,i);if(v!==!0)throw new de("option "+p+" must be "+v,de.ERR_BAD_OPTION_VALUE)}else if(u!==!0)throw new de("Unknown option "+p,de.ERR_BAD_OPTION)}},validators:Co};function In(i){return In=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},In(i)}function sc(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(In(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(In(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),In(s)==="symbol"?s:String(s)),a)}var s}var Mt=Bo.validators,Br=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.defaults=a,this.interceptors={request:new Ka,response:new Ka}}var l,u;return l=i,(u=[{key:"request",value:function(a,s){typeof a=="string"?(s=s||{}).url=a:s=a||{};var p,A=s=nn(this.defaults,s),g=A.transitional,v=A.paramsSerializer,L=A.headers;g!==void 0&&Bo.assertOptions(g,{silentJSONParsing:Mt.transitional(Mt.boolean),forcedJSONParsing:Mt.transitional(Mt.boolean),clarifyTimeoutError:Mt.transitional(Mt.boolean)},!1),v!==void 0&&Bo.assertOptions(v,{encode:Mt.function,serialize:Mt.function},!0),s.method=(s.method||this.defaults.method||"get").toLowerCase(),(p=L&&R.merge(L.common,L[s.method]))&&R.forEach(["delete","get","head","post","put","patch","common"],function(Ce){delete L[Ce]}),s.headers=_t.concat(p,L);var _=[],U=!0;this.interceptors.request.forEach(function(Ce){typeof Ce.runWhen=="function"&&Ce.runWhen(s)===!1||(U=U&&Ce.synchronous,_.unshift(Ce.fulfilled,Ce.rejected))});var Q,X=[];this.interceptors.response.forEach(function(Ce){X.push(Ce.fulfilled,Ce.rejected)});var $,Y=0;if(!U){var ee=[ri.bind(this),void 0];for(ee.unshift.apply(ee,_),ee.push.apply(ee,X),$=ee.length,Q=Promise.resolve(s);Y<$;)Q=Q.then(ee[Y++],ee[Y++]);return Q}$=_.length;var ie=s;for(Y=0;Y<$;){var ze=_[Y++],Pe=_[Y++];try{ie=ze(ie)}catch(Ce){Pe.call(this,Ce);break}}try{Q=ri.call(this,ie)}catch(Ce){return Promise.reject(Ce)}for(Y=0,$=X.length;Y<$;)Q=Q.then(X[Y++],X[Y++]);return Q}},{key:"getUri",value:function(a){return Ya(ti((a=nn(this.defaults,a)).baseURL,a.url),a.params,a.paramsSerializer)}}])&&sc(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();R.forEach(["delete","get","head","options"],function(i){Br.prototype[i]=function(l,u){return this.request(nn(u||{},{method:i,url:l,data:(u||{}).data}))}}),R.forEach(["post","put","patch"],function(i){function l(u){return function(a,s,p){return this.request(nn(p||{},{method:i,headers:u?{"Content-Type":"multipart/form-data"}:{},url:a,data:s}))}}Br.prototype[i]=l(),Br.prototype[i+"Form"]=l(!0)});const Sr=Br;function _n(i){return _n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},_n(i)}function ii(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(_n(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(_n(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),_n(s)==="symbol"?s:String(s)),a)}var s}var cc=function(){function i(s){if(function(g,v){if(!(g instanceof v))throw new TypeError("Cannot call a class as a function")}(this,i),typeof s!="function")throw new TypeError("executor must be a function.");var p;this.promise=new Promise(function(g){p=g});var A=this;this.promise.then(function(g){if(A._listeners){for(var v=A._listeners.length;v-- >0;)A._listeners[v](g);A._listeners=null}}),this.promise.then=function(g){var v,L=new Promise(function(_){A.subscribe(_),v=_}).then(g);return L.cancel=function(){A.unsubscribe(v)},L},s(function(g,v,L){A.reason||(A.reason=new kr(g,v,L),p(A.reason))})}var l,u,a;return l=i,u=[{key:"throwIfRequested",value:function(){if(this.reason)throw this.reason}},{key:"subscribe",value:function(s){this.reason?s(this.reason):this._listeners?this._listeners.push(s):this._listeners=[s]}},{key:"unsubscribe",value:function(s){if(this._listeners){var p=this._listeners.indexOf(s);p!==-1&&this._listeners.splice(p,1)}}}],a=[{key:"source",value:function(){var s;return{token:new i(function(p){s=p}),cancel:s}}}],u&&ii(l.prototype,u),a&&ii(l,a),Object.defineProperty(l,"prototype",{writable:!1}),i}();const dc=cc;function li(i,l){(l==null||l>i.length)&&(l=i.length);for(var u=0,a=new Array(l);u<l;u++)a[u]=i[u];return a}var So={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(So).forEach(function(i){var l,u,a=(u=2,function(A){if(Array.isArray(A))return A}(l=i)||function(A,g){var v=A==null?null:typeof Symbol<"u"&&A[Symbol.iterator]||A["@@iterator"];if(v!=null){var L,_,U,Q,X=[],$=!0,Y=!1;try{if(U=(v=v.call(A)).next,g===0){if(Object(v)!==v)return;$=!1}else for(;!($=(L=U.call(v)).done)&&(X.push(L.value),X.length!==g);$=!0);}catch(ee){Y=!0,_=ee}finally{try{if(!$&&v.return!=null&&(Q=v.return(),Object(Q)!==Q))return}finally{if(Y)throw _}}return X}}(l,u)||function(A,g){if(A){if(typeof A=="string")return li(A,g);var v=Object.prototype.toString.call(A).slice(8,-1);return v==="Object"&&A.constructor&&(v=A.constructor.name),v==="Map"||v==="Set"?Array.from(A):v==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(v)?li(A,g):void 0}}(l,u)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()),s=a[0],p=a[1];So[p]=s});const pc=So;var je=function i(l){var u=new Sr(l),a=pt(Sr.prototype.request,u);return R.extend(a,Sr.prototype,u,{allOwnKeys:!0}),R.extend(a,u,null,{allOwnKeys:!0}),a.create=function(s){return i(nn(l,s))},a}(xo);je.Axios=Sr,je.CanceledError=kr,je.CancelToken=dc,je.isCancel=Ga,je.VERSION="1.2.3",je.toFormData=vr,je.AxiosError=de,je.Cancel=je.CanceledError,je.all=function(i){return Promise.all(i)},je.spread=function(i){return function(l){return i.apply(null,l)}},je.isAxiosError=function(i){return R.isObject(i)&&i.isAxiosError===!0},je.mergeConfig=nn,je.AxiosHeaders=_t,je.formToJSON=function(i){return Va(R.isHTMLForm(i)?new FormData(i):i)},je.HttpStatusCode=pc,je.default=je;const si=je,uc={send:function(i){si.post(i.url,i.data).then(function(l){var u=l.data;u&&u.code===0?i.success&&i.success(u):i.error&&i.error(u&&u.msg)}).catch(function(l){console.error(l),i.error&&i.error()})},read:function(i){si.get(i.url).then(function(l){var u=l.data;u&&u.code===0?i.success&&i.success(u.data.map(function(a){return{time:a[0],type:a[1],color:a[2],author:a[3],text:a[4]}})):i.error&&i.error(u&&u.msg)}).catch(function(l){console.error(l),i.error&&i.error()})}};function Lo(i){return Lo=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Lo(i)}function fc(i){var l=this;this.lang=i,this.fallbackLang=this.lang.includes("-")?this.lang.split("-")[0]:this.lang,this.tran=function(u){return u=u.toLowerCase(),rn[l.lang]&&rn[l.lang][u]?rn[l.lang][u]:rn[l.fallbackLang]&&rn[l.fallbackLang][u]?rn[l.fallbackLang][u]:Io[u]?Io[u]:u}}var Io={"danmaku-loading":"Danmaku is loading",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Input danmaku, hit Enter","about-author":"About author","dplayer-feedback":"DPlayer feedback","about-dplayer":"About DPlayer",loop:"Loop",speed:"Speed","opacity-danmaku":"Opacity for danmaku",normal:"Normal","please-input-danmaku":"Please input danmaku content!","set-danmaku-color":"Set danmaku color","set-danmaku-type":"Set danmaku type","show-danmaku":"Show danmaku","video-failed":"Video load failed","danmaku-failed":"Danmaku load failed","danmaku-send-failed":"Danmaku send failed","switching-quality":"Switching to %q quality","switched-quality":"Switched to %q quality",ff:"FF %s s",rew:"REW %s s","unlimited-danmaku":"Unlimited danmaku","send-danmaku":"Send danmaku",setting:"Setting",fullscreen:"Full screen","web-fullscreen":"Web full screen",send:"Send",screenshot:"Screenshot",airplay:"AirPlay",chromecast:"ChromeCast",subtitle:"Subtitle",off:"Off","show-subs":"Show subtitle","hide-subs":"Hide subtitle",volume:"Volume",live:"Live","video-info":"Video info"},rn={en:Io,"zh-cn":{"danmaku-loading":"弹幕加载中",top:"顶部",bottom:"底部",rolling:"滚动","input-danmaku-enter":"输入弹幕，回车发送","about-author":"关于作者","dplayer-feedback":"播放器意见反馈","about-dplayer":"关于 DPlayer 播放器",loop:"洗脑循环",speed:"速度","opacity-danmaku":"弹幕透明度",normal:"正常","please-input-danmaku":"要输入弹幕内容啊喂！","set-danmaku-color":"设置弹幕颜色","set-danmaku-type":"设置弹幕类型","show-danmaku":"显示弹幕","video-failed":"视频加载失败","danmaku-failed":"弹幕加载失败","danmaku-send-failed":"弹幕发送失败","switching-quality":"正在切换至 %q 画质","switched-quality":"已经切换至 %q 画质",ff:"快进 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"海量弹幕","send-danmaku":"发送弹幕",setting:"设置",fullscreen:"全屏","web-fullscreen":"页面全屏",send:"发送",screenshot:"截图",airplay:"无线投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"关闭","show-subs":"显示字幕","hide-subs":"隐藏字幕",volume:"音量",live:"直播","video-info":"视频统计信息"},"zh-tw":{"danmaku-loading":"彈幕載入中",top:"頂部",bottom:"底部",rolling:"滾動","input-danmaku-enter":"輸入彈幕，Enter 發送","about-author":"關於作者","dplayer-feedback":"播放器意見回饋","about-dplayer":"關於 DPlayer 播放器",loop:"循環播放",speed:"速度","opacity-danmaku":"彈幕透明度",normal:"正常","please-input-danmaku":"請輸入彈幕內容啊！","set-danmaku-color":"設定彈幕顏色","set-danmaku-type":"設定彈幕類型","show-danmaku":"顯示彈幕","video-failed":"影片載入失敗","danmaku-failed":"彈幕載入失敗","danmaku-send-failed":"彈幕發送失敗","switching-quality":"正在切換至 %q 畫質","switched-quality":"已經切換至 %q 畫質",ff:"快進 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"巨量彈幕","send-danmaku":"發送彈幕",setting:"設定",fullscreen:"全螢幕","web-fullscreen":"頁面全螢幕",send:"發送",screenshot:"截圖",airplay:"無線投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"關閉","show-subs":"顯示字幕","hide-subs":"隱藏字幕",volume:"音量",live:"直播","video-info":"影片統計訊息"},"ko-kr":{"danmaku-loading":"Danmaku를 불러오는 중입니다.",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Danmaku를 입력하고 Enter를 누르세요.","about-author":"만든이","dplayer-feedback":"피드백 보내기","about-dplayer":"DPlayer 정보",loop:"반복",speed:"배속","opacity-danmaku":"Danmaku 불투명도",normal:"표준","please-input-danmaku":"Danmaku를 입력하세요!","set-danmaku-color":"Danmaku 색상","set-danmaku-type":"Danmaku 설정","show-danmaku":"Danmaku 표시","video-failed":"비디오를 불러오지 못했습니다.","danmaku-failed":"Danmaku를 불러오지 못했습니다.","danmaku-send-failed":"Danmaku 전송에 실패했습니다.","Switching to":"","Switched to":"","switching-quality":"전환 %q 화질","switched-quality":"전환 됨 %q 화질",ff:"앞으로 %s 초",rew:"뒤로 %s 초","unlimited-danmaku":"끝없는 Danmaku","send-danmaku":"Danmaku 보내기",setting:"설정",fullscreen:"전체 화면","web-fullscreen":"웹 내 전체화면",send:"보내기",screenshot:"화면 캡쳐",airplay:"에어플레이",chromecast:"ChromeCast",subtitle:"부제",off:"끄다","show-subs":"자막 보이기","hide-subs":"자막 숨기기",Volume:"볼륨",live:"생방송","video-info":"비디오 정보"},de:{"danmaku-loading":"Danmaku lädt...",top:"Oben",bottom:"Unten",rolling:"Rollend","input-danmaku-enter":"Drücke Enter nach dem Einfügen vom Danmaku","about-author":"Über den Autor","dplayer-feedback":"DPlayer Feedback","about-dplayer":"Über DPlayer",loop:"Wiederholen",speed:"Geschwindigkeit","opacity-danmaku":"Transparenz für Danmaku",normal:"Normal","please-input-danmaku":"Bitte Danmaku Inhalt eingeben!","set-danmaku-color":"Danmaku Farbe festlegen","set-danmaku-type":"Danmaku Typ festlegen","show-danmaku":"Zeige Danmaku","video-failed":"Das Video konnte nicht geladen werden","danmaku-failed":"Danmaku konnte nicht geladen werden","danmaku-send-failed":"Das senden von Danmaku ist fehgeschlagen","switching-quality":"Wechsle zur %q Qualität","switched-quality":"Zur %q Qualität gewechselt",ff:"%s s Vorwärts",rew:"%s s Zurück","unlimited-danmaku":"Unlimitiertes Danmaku","send-danmaku":"Sende Danmaku",setting:"Einstellungen",fullscreen:"Vollbild","web-fullscreen":"Browser Vollbild",send:"Senden",screenshot:"Screenshot",airplay:"AirPlay","show-subs":"Zeige Untertitel",chromecast:"ChromeCast",subtitle:"Untertitel",off:"Schließung","hide-subs":"Verstecke Untertitel",volume:"Lautstärke",live:"Live","video-info":"Video Info"}},Ac=o(730),yc=o.n(Ac),hc=o(74),mc=o.n(hc),bc=o(437),gc=o.n(bc),vc=o(644),xc=o.n(vc),Ec=o(324),wc=o.n(Ec),kc=o(574),Cc=o.n(kc),Bc=o(300),Sc=o.n(Bc),Lc=o(934),Ic=o.n(Lc),_c=o(428),Oc=o.n(_c),Tc=o(807),Rc=o.n(Tc),Pc=o(338),jc=o.n(Pc),zc=o(254),Mc=o.n(zc),Dc=o(965),qc=o.n(Dc),Fc=o(113),Nc=o.n(Fc),Uc=o(251),Hc=o.n(Uc),Wc=o(410),Yc=o.n(Wc),Kc=o(182),Qc=o.n(Kc),Vc=o(193),$c=o.n(Vc);const ut={play:yc(),pause:mc(),volumeUp:gc(),volumeDown:xc(),volumeOff:wc(),full:Cc(),fullWeb:Sc(),setting:Ic(),right:Oc(),comment:Rc(),commentOff:jc(),send:Mc(),pallette:qc(),camera:Nc(),subtitle:Yc(),loading:Qc(),airplay:Hc(),chromecast:$c()};var Zc=o(916),Jc=o.n(Zc);function On(i){return On=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},On(i)}function ci(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(On(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(On(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),On(s)==="symbol"?s:String(s)),a)}var s}var Xc=function(){function i(s){(function(p,A){if(!(p instanceof A))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=s.container,this.options=s.options,this.index=s.index,this.tran=s.tran,this.init()}var l,u,a;return l=i,a=[{key:"NewNotice",value:function(s,p,A){var g=document.createElement("div");return g.classList.add("dplayer-notice"),g.style.opacity=p,g.innerText=s,A&&(g.id="dplayer-notice-".concat(A)),g}}],(u=[{key:"init",value:function(){this.container.innerHTML=Jc()({options:this.options,index:this.index,tran:this.tran,icons:ut,mobile:te.isMobile,video:{current:!0,pic:this.options.video.pic,screenshot:this.options.screenshot,airplay:!(!te.isSafari||te.isChrome)&&this.options.airplay,chromecast:this.options.chromecast,preload:this.options.preload,url:this.options.video.url,subtitle:this.options.subtitle}}),this.volumeBar=this.container.querySelector(".dplayer-volume-bar-inner"),this.volumeBarWrap=this.container.querySelector(".dplayer-volume-bar"),this.volumeBarWrapWrap=this.container.querySelector(".dplayer-volume-bar-wrap"),this.volumeButton=this.container.querySelector(".dplayer-volume"),this.volumeButtonIcon=this.container.querySelector(".dplayer-volume-icon"),this.volumeIcon=this.container.querySelector(".dplayer-volume-icon .dplayer-icon-content"),this.playedBar=this.container.querySelector(".dplayer-played"),this.loadedBar=this.container.querySelector(".dplayer-loaded"),this.playedBarWrap=this.container.querySelector(".dplayer-bar-wrap"),this.playedBarTime=this.container.querySelector(".dplayer-bar-time"),this.danmaku=this.container.querySelector(".dplayer-danmaku"),this.danmakuLoading=this.container.querySelector(".dplayer-danloading"),this.video=this.container.querySelector(".dplayer-video-current"),this.bezel=this.container.querySelector(".dplayer-bezel-icon"),this.playButton=this.container.querySelector(".dplayer-play-icon"),this.mobilePlayButton=this.container.querySelector(".dplayer-mobile-play"),this.videoWrap=this.container.querySelector(".dplayer-video-wrap"),this.controllerMask=this.container.querySelector(".dplayer-controller-mask"),this.ptime=this.container.querySelector(".dplayer-ptime"),this.settingButton=this.container.querySelector(".dplayer-setting-icon"),this.settingBox=this.container.querySelector(".dplayer-setting-box"),this.mask=this.container.querySelector(".dplayer-mask"),this.loop=this.container.querySelector(".dplayer-setting-loop"),this.loopToggle=this.container.querySelector(".dplayer-setting-loop .dplayer-toggle-setting-input"),this.showDanmaku=this.container.querySelector(".dplayer-setting-showdan"),this.showDanmakuToggle=this.container.querySelector(".dplayer-showdan-setting-input"),this.unlimitDanmaku=this.container.querySelector(".dplayer-setting-danunlimit"),this.unlimitDanmakuToggle=this.container.querySelector(".dplayer-danunlimit-setting-input"),this.speed=this.container.querySelector(".dplayer-setting-speed"),this.speedItem=this.container.querySelectorAll(".dplayer-setting-speed-item"),this.danmakuOpacityBar=this.container.querySelector(".dplayer-danmaku-bar-inner"),this.danmakuOpacityBarWrap=this.container.querySelector(".dplayer-danmaku-bar"),this.danmakuOpacityBarWrapWrap=this.container.querySelector(".dplayer-danmaku-bar-wrap"),this.danmakuOpacityBox=this.container.querySelector(".dplayer-setting-danmaku"),this.dtime=this.container.querySelector(".dplayer-dtime"),this.controller=this.container.querySelector(".dplayer-controller"),this.commentInput=this.container.querySelector(".dplayer-comment-input"),this.commentButton=this.container.querySelector(".dplayer-comment-icon"),this.commentSettingBox=this.container.querySelector(".dplayer-comment-setting-box"),this.commentSettingButton=this.container.querySelector(".dplayer-comment-setting-icon"),this.commentSettingFill=this.container.querySelector(".dplayer-comment-setting-icon path"),this.commentSendButton=this.container.querySelector(".dplayer-send-icon"),this.commentSendFill=this.container.querySelector(".dplayer-send-icon path"),this.commentColorSettingBox=this.container.querySelector(".dplayer-comment-setting-color"),this.browserFullButton=this.container.querySelector(".dplayer-full-icon"),this.webFullButton=this.container.querySelector(".dplayer-full-in-icon"),this.menu=this.container.querySelector(".dplayer-menu"),this.menuItem=this.container.querySelectorAll(".dplayer-menu-item"),this.qualityList=this.container.querySelector(".dplayer-quality-list"),this.camareButton=this.container.querySelector(".dplayer-camera-icon"),this.airplayButton=this.container.querySelector(".dplayer-airplay-icon"),this.chromecastButton=this.container.querySelector(".dplayer-chromecast-icon"),this.subtitleButton=this.container.querySelector(".dplayer-subtitle-icon"),this.subtitleButtonInner=this.container.querySelector(".dplayer-subtitle-icon .dplayer-icon-content"),this.subtitlesButton=this.container.querySelector(".dplayer-subtitles-icon"),this.subtitlesBox=this.container.querySelector(".dplayer-subtitles-box"),this.subtitlesItem=this.container.querySelectorAll(".dplayer-subtitles-item"),this.subtitle=this.container.querySelector(".dplayer-subtitle"),this.subtrack=this.container.querySelector(".dplayer-subtrack"),this.qualityButton=this.container.querySelector(".dplayer-quality-icon"),this.barPreview=this.container.querySelector(".dplayer-bar-preview"),this.barWrap=this.container.querySelector(".dplayer-bar-wrap"),this.noticeList=this.container.querySelector(".dplayer-notice-list"),this.infoPanel=this.container.querySelector(".dplayer-info-panel"),this.infoPanelClose=this.container.querySelector(".dplayer-info-panel-close"),this.infoVersion=this.container.querySelector(".dplayer-info-panel-item-version .dplayer-info-panel-item-data"),this.infoFPS=this.container.querySelector(".dplayer-info-panel-item-fps .dplayer-info-panel-item-data"),this.infoType=this.container.querySelector(".dplayer-info-panel-item-type .dplayer-info-panel-item-data"),this.infoUrl=this.container.querySelector(".dplayer-info-panel-item-url .dplayer-info-panel-item-data"),this.infoResolution=this.container.querySelector(".dplayer-info-panel-item-resolution .dplayer-info-panel-item-data"),this.infoDuration=this.container.querySelector(".dplayer-info-panel-item-duration .dplayer-info-panel-item-data"),this.infoDanmakuId=this.container.querySelector(".dplayer-info-panel-item-danmaku-id .dplayer-info-panel-item-data"),this.infoDanmakuApi=this.container.querySelector(".dplayer-info-panel-item-danmaku-api .dplayer-info-panel-item-data"),this.infoDanmakuAmount=this.container.querySelector(".dplayer-info-panel-item-danmaku-amount .dplayer-info-panel-item-data")}}])&&ci(l.prototype,u),a&&ci(l,a),Object.defineProperty(l,"prototype",{writable:!1}),i}();const di=Xc;function on(i){return on=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},on(i)}function Gc(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(on(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(on(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),on(s)==="symbol"?s:String(s)),a)}var s}var ed=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.options=a,this.player=this.options.player,this.container=this.options.container,this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.dan=[],this.showing=!0,this._opacity=this.options.opacity,this.events=this.options.events,this.unlimited=this.options.unlimited,this._measure(""),this.load()}var l,u;return l=i,u=[{key:"load",value:function(){var a,s=this;a=this.options.api.maximum?"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id,"&max=").concat(this.options.api.maximum):"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id);var p=(this.options.api.addition||[]).slice(0);p.push(a),this.events&&this.events.trigger("danmaku_load_start",p),this._readAllEndpoints(p,function(A){s.dan=[].concat.apply([],A).sort(function(g,v){return g.time-v.time}),window.requestAnimationFrame(function(){s.frame()}),s.options.callback(),s.events&&s.events.trigger("danmaku_load_end")})}},{key:"reload",value:function(a){this.options.api=a,this.dan=[],this.clear(),this.load()}},{key:"_readAllEndpoints",value:function(a,s){for(var p=this,A=[],g=0,v=function(_){p.options.apiBackend.read({url:a[_],success:function(U){A[_]=U,++g===a.length&&s(A)},error:function(U){p.options.error(U||p.options.tran("danmaku-failed")),A[_]=[],++g===a.length&&s(A)}})},L=0;L<a.length;++L)v(L)}},{key:"send",value:function(a,s){var p=this,A={token:this.options.api.token,id:this.options.api.id,author:this.options.api.user,time:this.options.time(),text:a.text,color:a.color,type:a.type};this.options.apiBackend.send({url:this.options.api.address+"v3/",data:A,success:s,error:function(v){p.options.error(v||p.options.tran("danmaku-failed"))}}),this.dan.splice(this.danIndex,0,A),this.danIndex++;var g={text:this.htmlEncode(A.text),color:A.color,type:A.type,border:"2px solid ".concat(this.options.borderColor)};this.draw(g),this.events&&this.events.trigger("danmaku_send",A)}},{key:"frame",value:function(){var a=this;if(this.dan.length&&!this.paused&&this.showing){for(var s=this.dan[this.danIndex],p=[];s&&this.options.time()>parseFloat(s.time);)p.push(s),s=this.dan[++this.danIndex];this.draw(p)}window.requestAnimationFrame(function(){a.frame()})}},{key:"opacity",value:function(a){if(a!==void 0){for(var s=this.container.getElementsByClassName("dplayer-danmaku-item"),p=0;p<s.length;p++)s[p].style.opacity=a;this._opacity=a,this.events&&this.events.trigger("danmaku_opacity",this._opacity)}return this._opacity}},{key:"draw",value:function(a){var s=this;if(this.showing){var p=this.options.height,A=this.container.offsetWidth,g=this.container.offsetHeight,v=parseInt(g/p),L=function(Y){var ee=Y.offsetWidth||parseInt(Y.style.width),ie=Y.getBoundingClientRect().right||s.container.getBoundingClientRect().right+ee;return s.container.getBoundingClientRect().right-ie},_=function(Y){return(A+Y)/5},U=function(Y,ee,ie){for(var ze=A/_(ie),Pe=function($t){var ln=s.danTunnel[ee][$t+""];if(!ln||!ln.length)return s.danTunnel[ee][$t+""]=[Y],Y.addEventListener("animationend",function(){s.danTunnel[ee][$t+""].splice(0,1)}),{v:$t%v};if(ee!=="right")return"continue";for(var Vn=0;Vn<ln.length;Vn++){var hi=L(ln[Vn])-10;if(hi<=A-ze*_(parseInt(ln[Vn].style.width))||hi<=0)break;if(Vn===ln.length-1)return s.danTunnel[ee][$t+""].push(Y),Y.addEventListener("animationend",function(){s.danTunnel[ee][$t+""].splice(0,1)}),{v:$t%v}}},Ce=0;s.unlimited||Ce<v;Ce++){var qt=Pe(Ce);if(qt!=="continue"&&on(qt)==="object")return qt.v}return-1};Object.prototype.toString.call(a)!=="[object Array]"&&(a=[a]);for(var Q=document.createDocumentFragment(),X=function(){a[$].type=te.number2Type(a[$].type),a[$].color||(a[$].color=16777215);var Y=document.createElement("div");Y.classList.add("dplayer-danmaku-item"),Y.classList.add("dplayer-danmaku-".concat(a[$].type)),a[$].border?Y.innerHTML='<span style="border:'.concat(a[$].border,'">').concat(a[$].text,"</span>"):Y.innerHTML=a[$].text,Y.style.opacity=s._opacity,Y.style.color=te.number2Color(a[$].color),Y.addEventListener("animationend",function(){s.container.removeChild(Y)});var ee,ie=s._measure(a[$].text);switch(a[$].type){case"right":(ee=U(Y,a[$].type,ie))>=0&&(Y.style.width=ie+1+"px",Y.style.top=p*ee+"px",Y.style.transform="translateX(-".concat(A,"px)"));break;case"top":(ee=U(Y,a[$].type))>=0&&(Y.style.top=p*ee+"px");break;case"bottom":(ee=U(Y,a[$].type))>=0&&(Y.style.bottom=p*ee+"px");break;default:console.error("Can't handled danmaku type: ".concat(a[$].type))}ee>=0&&(Y.classList.add("dplayer-danmaku-move"),Y.style.animationDuration=s._danAnimation(a[$].type),Q.appendChild(Y))},$=0;$<a.length;$++)X();return this.container.appendChild(Q),Q}}},{key:"play",value:function(){this.paused=!1}},{key:"pause",value:function(){this.paused=!0}},{key:"_measure",value:function(a){if(!this.context){var s=getComputedStyle(this.container.getElementsByClassName("dplayer-danmaku-item")[0],null);this.context=document.createElement("canvas").getContext("2d"),this.context.font=s.getPropertyValue("font")}return this.context.measureText(a).width}},{key:"seek",value:function(){this.clear();for(var a=0;a<this.dan.length;a++){if(this.dan[a].time>=this.options.time()){this.danIndex=a;break}this.danIndex=this.dan.length}}},{key:"clear",value:function(){this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.options.container.innerHTML="",this.events&&this.events.trigger("danmaku_clear")}},{key:"htmlEncode",value:function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2f;")}},{key:"resize",value:function(){for(var a=this.container.offsetWidth,s=this.container.getElementsByClassName("dplayer-danmaku-item"),p=0;p<s.length;p++)s[p].style.transform="translateX(-".concat(a,"px)")}},{key:"hide",value:function(){this.showing=!1,this.pause(),this.clear(),this.events&&this.events.trigger("danmaku_hide")}},{key:"show",value:function(){this.seek(),this.showing=!0,this.play(),this.events&&this.events.trigger("danmaku_show")}},{key:"unlimit",value:function(a){this.unlimited=a}},{key:"speed",value:function(a){this.options.api.speedRate=a}},{key:"_danAnimation",value:function(a){var s=this.options.api.speedRate||1,p=!!this.player.fullScreen.isFullScreen();return{top:"".concat((p?6:4)/s,"s"),right:"".concat((p?8:5)/s,"s"),bottom:"".concat((p?6:4)/s,"s")}[a]}}],u&&Gc(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const td=ed;function Tn(i){return Tn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Tn(i)}function nd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Tn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Tn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Tn(s)==="symbol"?s:String(s)),a)}var s}const rd=function(){function i(){(function(a,s){if(!(a instanceof s))throw new TypeError("Cannot call a class as a function")})(this,i),this.events={},this.videoEvents=["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","mozaudioavailable","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],this.playerEvents=["screenshot","thumbnails_show","thumbnails_hide","danmaku_show","danmaku_hide","danmaku_clear","danmaku_loaded","danmaku_send","danmaku_opacity","contextmenu_show","contextmenu_hide","notice_show","notice_hide","quality_start","quality_end","destroy","resize","fullscreen","fullscreen_cancel","webfullscreen","webfullscreen_cancel","subtitle_show","subtitle_hide","subtitle_change"]}var l,u;return l=i,(u=[{key:"on",value:function(a,s){this.type(a)&&typeof s=="function"&&(this.events[a]||(this.events[a]=[]),this.events[a].push(s))}},{key:"trigger",value:function(a,s){if(this.events[a]&&this.events[a].length)for(var p=0;p<this.events[a].length;p++)this.events[a][p](s)}},{key:"type",value:function(a){return this.playerEvents.indexOf(a)!==-1?"player":this.videoEvents.indexOf(a)!==-1?"video":(console.error("Unknown event name: ".concat(a)),null)}}])&&nd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();function Rn(i){return Rn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Rn(i)}function od(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Rn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Rn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Rn(s)==="symbol"?s:String(s)),a)}var s}var ad=function(){function i(a){var s=this;(function(p,A){if(!(p instanceof A))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.lastScrollPosition={left:0,top:0},this.player.events.on("webfullscreen",function(){s.player.resize()}),this.player.events.on("webfullscreen_cancel",function(){s.player.resize(),te.setScrollPosition(s.lastScrollPosition)}),this.fullscreenchange=function(){s.player.resize(),s.isFullScreen("browser")?s.player.events.trigger("fullscreen"):(te.setScrollPosition(s.lastScrollPosition),s.player.events.trigger("fullscreen_cancel"))},this.docfullscreenchange=function(){var p=document.fullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;p&&p!==s.player.container||(s.player.resize(),p?s.player.events.trigger("fullscreen"):(te.setScrollPosition(s.lastScrollPosition),s.player.events.trigger("fullscreen_cancel")))},/Firefox/.test(navigator.userAgent)?(document.addEventListener("mozfullscreenchange",this.docfullscreenchange),document.addEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.addEventListener("fullscreenchange",this.fullscreenchange),this.player.container.addEventListener("webkitfullscreenchange",this.fullscreenchange),document.addEventListener("msfullscreenchange",this.docfullscreenchange),document.addEventListener("MSFullscreenChange",this.docfullscreenchange))}var l,u;return l=i,u=[{key:"isFullScreen",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(a){case"browser":return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;case"web":return this.player.container.classList.contains("dplayer-fulled")}}},{key:"request",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser",s=a==="browser"?"web":"browser",p=this.isFullScreen(s);switch(p||(this.lastScrollPosition=te.getScrollPosition()),a){case"browser":this.player.container.requestFullscreen?this.player.container.requestFullscreen():this.player.container.mozRequestFullScreen?this.player.container.mozRequestFullScreen():this.player.container.webkitRequestFullscreen?this.player.container.webkitRequestFullscreen():this.player.video.webkitEnterFullscreen?this.player.video.webkitEnterFullscreen():this.player.video.webkitEnterFullScreen?this.player.video.webkitEnterFullScreen():this.player.container.msRequestFullscreen&&this.player.container.msRequestFullscreen();break;case"web":this.player.container.classList.add("dplayer-fulled"),document.body.classList.add("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen")}p&&this.cancel(s)}},{key:"cancel",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(a){case"browser":document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.webkitCancelFullscreen?document.webkitCancelFullscreen():document.msCancelFullScreen?document.msCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen();break;case"web":this.player.container.classList.remove("dplayer-fulled"),document.body.classList.remove("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen_cancel")}}},{key:"toggle",value:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";this.isFullScreen(a)?this.cancel(a):this.request(a)}},{key:"destroy",value:function(){/Firefox/.test(navigator.userAgent)?(document.removeEventListener("mozfullscreenchange",this.docfullscreenchange),document.removeEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.removeEventListener("fullscreenchange",this.fullscreenchange),this.player.container.removeEventListener("webkitfullscreenchange",this.fullscreenchange),document.removeEventListener("msfullscreenchange",this.docfullscreenchange),document.removeEventListener("MSFullscreenChange",this.docfullscreenchange))}}],u&&od(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const id=ad;function Pn(i){return Pn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Pn(i)}function ld(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Pn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Pn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Pn(s)==="symbol"?s:String(s)),a)}var s}var sd=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.storageName={opacity:"dplayer-danmaku-opacity",volume:"dplayer-volume",unlimited:"dplayer-danmaku-unlimited",danmaku:"dplayer-danmaku-show",subtitle:"dplayer-subtitle-show"},this.default={opacity:.7,volume:a.options.hasOwnProperty("volume")?a.options.volume:.7,unlimited:(a.options.danmaku&&a.options.danmaku.unlimited?1:0)||0,danmaku:1,subtitle:1},this.data={},this.init()}var l,u;return l=i,(u=[{key:"init",value:function(){for(var a in this.storageName){var s=this.storageName[a];this.data[a]=parseFloat(te.storage.get(s)||this.default[a])}}},{key:"get",value:function(a){return this.data[a]}},{key:"set",value:function(a,s){this.data[a]=s,te.storage.set(this.storageName[a],s)}}])&&ld(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const cd=sd;function jn(i){return jn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},jn(i)}function dd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(jn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(jn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),jn(s)==="symbol"?s:String(s)),a)}var s}var pd=function(){function i(a,s,p,A){(function(g,v){if(!(g instanceof v))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a,this.video=s,this.options=p,this.events=A,this.init()}var l,u;return l=i,u=[{key:"init",value:function(){var a=this;if(this.container.style.fontSize=this.options.fontSize,this.container.style.bottom=this.options.bottom,this.container.style.color=this.options.color,this.video.textTracks&&this.video.textTracks[0]){var s=this.video.textTracks[0];s.oncuechange=function(){var p=s.activeCues[s.activeCues.length-1];if(a.container.innerHTML="",p){var A=document.createElement("div");A.appendChild(p.getCueAsHTML());var g=A.innerHTML.split(/\r?\n/).map(function(v){return"<p>".concat(v,"</p>")}).join("");a.container.innerHTML=g}a.events.trigger("subtitle_change")}}}},{key:"show",value:function(){this.container.classList.remove("dplayer-subtitle-hide"),this.events.trigger("subtitle_show")}},{key:"hide",value:function(){this.container.classList.add("dplayer-subtitle-hide"),this.events.trigger("subtitle_hide")}},{key:"toggle",value:function(){this.container.classList.contains("dplayer-subtitle-hide")?this.show():this.hide()}}],u&&dd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const ud=pd;function zn(i){return zn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},zn(i)}function fd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(zn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(zn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),zn(s)==="symbol"?s:String(s)),a)}var s}var Ad=function(){function i(a){var s=this;(function(v,L){if(!(v instanceof L))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.player.template.mask.addEventListener("click",function(){s.hide()}),this.player.template.subtitlesButton.addEventListener("click",function(){s.adaptiveHeight(),s.show()});for(var p=this.player.template.subtitlesItem.length-1,A=function(v){s.player.template.subtitlesItem[v].addEventListener("click",function(){s.hide(),s.player.options.subtitle.index!==v&&(s.player.template.subtitle.innerHTML="<p></p>",s.player.template.subtrack.src=s.player.template.subtitlesItem[v].dataset.subtitle,s.player.options.subtitle.index=v,s.player.template.subtitle.classList.contains("dplayer-subtitle-hide")&&s.subContainerShow())})},g=0;g<p;g++)A(g);this.player.template.subtitlesItem[p].addEventListener("click",function(){s.hide(),s.player.options.subtitle.index!==p&&(s.player.template.subtitle.innerHTML="<p></p>",s.player.template.subtrack.src="",s.player.options.subtitle.index=p,s.subContainerHide())})}var l,u;return l=i,(u=[{key:"subContainerShow",value:function(){this.player.template.subtitle.classList.remove("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_show")}},{key:"subContainerHide",value:function(){this.player.template.subtitle.classList.add("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_hide")}},{key:"hide",value:function(){this.player.template.subtitlesBox.classList.remove("dplayer-subtitles-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.subtitlesBox.classList.add("dplayer-subtitles-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}},{key:"adaptiveHeight",value:function(){var a=30*this.player.template.subtitlesItem.length+14,s=.8*this.player.template.videoWrap.offsetHeight;a>=s-50?(this.player.template.subtitlesBox.style.bottom="8px",this.player.template.subtitlesBox.style["max-height"]=s-8+"px"):(this.player.template.subtitlesBox.style.bottom="50px",this.player.template.subtitlesBox.style["max-height"]=s-50+"px")}}])&&fd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const yd=Ad;function Mn(i){return Mn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Mn(i)}function hd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Mn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Mn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Mn(s)==="symbol"?s:String(s)),a)}var s}var md=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.elements={},this.elements.volume=a.volumeBar,this.elements.played=a.playedBar,this.elements.loaded=a.loadedBar,this.elements.danmaku=a.danmakuOpacityBar}var l,u;return l=i,(u=[{key:"set",value:function(a,s,p){s=Math.max(s,0),s=Math.min(s,1),this.elements[a].style[p]=100*s+"%"}},{key:"get",value:function(a){return parseFloat(this.elements[a].style.width)/100}}])&&hd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const bd=md;function Dn(i){return Dn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Dn(i)}function gd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Dn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Dn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Dn(s)==="symbol"?s:String(s)),a)}var s}var vd=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(s){window.setTimeout(s,1e3/60)},this.types=["loading","info","fps"],this.init()}var l,u;return l=i,(u=[{key:"init",value:function(){var a=this;this.types.map(function(s){return s!=="fps"&&a["init".concat(s,"Checker")](),s})}},{key:"initloadingChecker",value:function(){var a=this,s=0,p=0,A=!1;this.loadingChecker=setInterval(function(){a.enableloadingChecker&&(p=a.player.video.currentTime,A||p!==s||a.player.video.paused||(a.player.container.classList.add("dplayer-loading"),A=!0),A&&p>s&&!a.player.video.paused&&(a.player.container.classList.remove("dplayer-loading"),A=!1),s=p)},100)}},{key:"initfpsChecker",value:function(){var a=this;window.requestAnimationFrame(function(){if(a.enablefpsChecker)if(a.initfpsChecker(),a.fpsStart){a.fpsIndex++;var s=new Date;s-a.fpsStart>1e3&&(a.player.infoPanel.fps(a.fpsIndex/(s-a.fpsStart)*1e3),a.fpsStart=new Date,a.fpsIndex=0)}else a.fpsStart=new Date,a.fpsIndex=0;else a.fpsStart=0,a.fpsIndex=0})}},{key:"initinfoChecker",value:function(){var a=this;this.infoChecker=setInterval(function(){a.enableinfoChecker&&a.player.infoPanel.update()},1e3)}},{key:"enable",value:function(a){this["enable".concat(a,"Checker")]=!0,a==="fps"&&this.initfpsChecker()}},{key:"disable",value:function(a){this["enable".concat(a,"Checker")]=!1}},{key:"destroy",value:function(){var a=this;this.types.map(function(s){return a["enable".concat(s,"Checker")]=!1,a["".concat(s,"Checker")]&&clearInterval(a["".concat(s,"Checker")]),s})}}])&&gd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const xd=vd;function qn(i){return qn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},qn(i)}function Ed(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(qn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(qn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),qn(s)==="symbol"?s:String(s)),a)}var s}const wd=function(){function i(a){var s=this;(function(p,A){if(!(p instanceof A))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a,this.container.addEventListener("animationend",function(){s.container.classList.remove("dplayer-bezel-transition")})}var l,u;return l=i,(u=[{key:"switch",value:function(a){this.container.innerHTML=a,this.container.classList.add("dplayer-bezel-transition")}}])&&Ed(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();function Fn(i){return Fn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Fn(i)}function kd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Fn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Fn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Fn(s)==="symbol"?s:String(s)),a)}var s}var Cd=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a.container,this.barWidth=a.barWidth,this.container.style.backgroundImage="url('".concat(a.url,"')"),this.events=a.events}var l,u;return l=i,(u=[{key:"resize",value:function(a,s,p){this.container.style.width="".concat(a,"px"),this.container.style.height="".concat(s,"px"),this.container.style.top="".concat(2-s,"px"),this.barWidth=p}},{key:"show",value:function(){this.container.style.display="block",this.events&&this.events.trigger("thumbnails_show")}},{key:"move",value:function(a){this.container.style.backgroundPosition="-".concat(160*(Math.ceil(a/this.barWidth*100)-1),"px 0"),this.container.style.left="".concat(Math.min(Math.max(a-this.container.offsetWidth/2,-10),this.barWidth-150),"px")}},{key:"hide",value:function(){this.container.style.display="none",this.events&&this.events.trigger("thumbnails_hide")}}])&&kd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Bd=Cd;function Nn(i){return Nn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Nn(i)}function Sd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Nn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Nn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Nn(s)==="symbol"?s:String(s)),a)}var s}var Dt,pi=!0,_o=!1,Ld=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.autoHideTimer=0,te.isMobile||(this.setAutoHideHandler=this.setAutoHide.bind(this),this.player.container.addEventListener("mousemove",this.setAutoHideHandler),this.player.container.addEventListener("click",this.setAutoHideHandler),this.player.on("play",this.setAutoHideHandler),this.player.on("pause",this.setAutoHideHandler)),this.initPlayButton(),this.initThumbnails(),this.initPlayedBar(),this.initFullButton(),this.initQualityButton(),this.initScreenshotButton(),this.player.options.subtitle&&typeof this.player.options.subtitle.url=="string"&&this.initSubtitleButton(),this.initHighlights(),this.initAirplayButton(),this.initChromecastButton(),te.isMobile||this.initVolumeButton()}var l,u;return l=i,(u=[{key:"initPlayButton",value:function(){var a=this;this.player.template.playButton.addEventListener("click",function(){a.player.toggle()}),this.player.template.mobilePlayButton.addEventListener("click",function(){a.player.toggle()}),te.isMobile?(this.player.template.videoWrap.addEventListener("click",function(){a.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){a.toggle()})):this.player.options.preventClickToggle||(this.player.template.videoWrap.addEventListener("click",function(){a.player.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){a.player.toggle()}))}},{key:"initHighlights",value:function(){var a=this;this.player.on("durationchange",function(){if(a.player.video.duration!==1&&a.player.video.duration!==1/0&&a.player.options.highlight){var s=a.player.template.playedBarWrap.querySelectorAll(".dplayer-highlight");[].slice.call(s,0).forEach(function(g){a.player.template.playedBarWrap.removeChild(g)});for(var p=0;p<a.player.options.highlight.length;p++)if(a.player.options.highlight[p].text&&a.player.options.highlight[p].time){var A=document.createElement("div");A.classList.add("dplayer-highlight"),A.style.left=a.player.options.highlight[p].time/a.player.video.duration*100+"%",A.innerHTML='<span class="dplayer-highlight-text">'+a.player.options.highlight[p].text+"</span>",a.player.template.playedBarWrap.insertBefore(A,a.player.template.playedBarTime)}}})}},{key:"initThumbnails",value:function(){var a=this;this.player.options.video.thumbnails&&(this.thumbnails=new Bd({container:this.player.template.barPreview,barWidth:this.player.template.barWrap.offsetWidth,url:this.player.options.video.thumbnails,events:this.player.events}),this.player.on("loadedmetadata",function(){a.thumbnails.resize(160,a.player.video.videoHeight/a.player.video.videoWidth*160,a.player.template.barWrap.offsetWidth)}))}},{key:"initPlayedBar",value:function(){var a=this,s=function(A){var g=((A.clientX||A.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(a.player.template.playedBarWrap))/a.player.template.playedBarWrap.clientWidth;g=Math.max(g,0),g=Math.min(g,1),a.player.bar.set("played",g,"width"),a.player.template.ptime.innerHTML=te.secondToTime(g*a.player.video.duration)},p=function A(g){document.removeEventListener(te.nameMap.dragEnd,A),document.removeEventListener(te.nameMap.dragMove,s);var v=((g.clientX||g.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(a.player.template.playedBarWrap))/a.player.template.playedBarWrap.clientWidth;v=Math.max(v,0),v=Math.min(v,1),a.player.bar.set("played",v,"width"),a.player.seek(a.player.bar.get("played")*a.player.video.duration),a.player.timer.enable("progress")};this.player.template.playedBarWrap.addEventListener(te.nameMap.dragStart,function(){a.player.timer.disable("progress"),document.addEventListener(te.nameMap.dragMove,s),document.addEventListener(te.nameMap.dragEnd,p)}),this.player.template.playedBarWrap.addEventListener(te.nameMap.dragMove,function(A){if(a.player.video.duration){var g=a.player.template.playedBarWrap.getBoundingClientRect().left,v=(A.clientX||A.changedTouches[0].clientX)-g;if(v<0||v>a.player.template.playedBarWrap.offsetWidth)return;var L=a.player.video.duration*(v/a.player.template.playedBarWrap.offsetWidth);te.isMobile&&a.thumbnails&&a.thumbnails.show(),a.thumbnails&&a.thumbnails.move(v),a.player.template.playedBarTime.style.left="".concat(v-(L>=3600?25:20),"px"),a.player.template.playedBarTime.innerText=te.secondToTime(L),a.player.template.playedBarTime.classList.remove("hidden")}}),this.player.template.playedBarWrap.addEventListener(te.nameMap.dragEnd,function(){te.isMobile&&a.thumbnails&&a.thumbnails.hide()}),te.isMobile||(this.player.template.playedBarWrap.addEventListener("mouseenter",function(){a.player.video.duration&&(a.thumbnails&&a.thumbnails.show(),a.player.template.playedBarTime.classList.remove("hidden"))}),this.player.template.playedBarWrap.addEventListener("mouseleave",function(){a.player.video.duration&&(a.thumbnails&&a.thumbnails.hide(),a.player.template.playedBarTime.classList.add("hidden"))}))}},{key:"initFullButton",value:function(){var a=this;this.player.template.browserFullButton.addEventListener("click",function(){a.player.fullScreen.toggle("browser")}),this.player.template.webFullButton.addEventListener("click",function(){a.player.fullScreen.toggle("web")})}},{key:"initVolumeButton",value:function(){var a=this,s=function(A){var g=A||window.event,v=((g.clientX||g.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(a.player.template.volumeBarWrap)-5.5)/35;a.player.volume(v)},p=function A(){document.removeEventListener(te.nameMap.dragEnd,A),document.removeEventListener(te.nameMap.dragMove,s),a.player.template.volumeButton.classList.remove("dplayer-volume-active")};this.player.template.volumeBarWrapWrap.addEventListener("click",function(A){var g=A||window.event,v=((g.clientX||g.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(a.player.template.volumeBarWrap)-5.5)/35;a.player.volume(v)}),this.player.template.volumeBarWrapWrap.addEventListener(te.nameMap.dragStart,function(){document.addEventListener(te.nameMap.dragMove,s),document.addEventListener(te.nameMap.dragEnd,p),a.player.template.volumeButton.classList.add("dplayer-volume-active")}),this.player.template.volumeButtonIcon.addEventListener("click",function(){a.player.video.muted?(a.player.video.muted=!1,a.player.switchVolumeIcon(),a.player.bar.set("volume",a.player.volume(),"width")):(a.player.video.muted=!0,a.player.template.volumeIcon.innerHTML=ut.volumeOff,a.player.bar.set("volume",0,"width"))})}},{key:"initQualityButton",value:function(){var a=this;this.player.options.video.quality&&this.player.template.qualityList.addEventListener("click",function(s){s.target.classList.contains("dplayer-quality-item")&&a.player.switchQuality(s.target.dataset.index)})}},{key:"initScreenshotButton",value:function(){var a=this;this.player.options.screenshot&&this.player.template.camareButton.addEventListener("click",function(){var s,p=document.createElement("canvas");p.width=a.player.video.videoWidth,p.height=a.player.video.videoHeight,p.getContext("2d").drawImage(a.player.video,0,0,p.width,p.height),p.toBlob(function(A){s=URL.createObjectURL(A);var g=document.createElement("a");g.href=s,g.download="DPlayer.png",g.style.display="none",document.body.appendChild(g),g.click(),document.body.removeChild(g),URL.revokeObjectURL(s),a.player.events.trigger("screenshot",s)})})}},{key:"initAirplayButton",value:function(){this.player.options.airplay&&(window.WebKitPlaybackTargetAvailabilityEvent?this.player.video.addEventListener("webkitplaybacktargetavailabilitychanged",function(a){a.availability==="available"?this.template.airplayButton.disable=!1:this.template.airplayButton.disable=!0,this.template.airplayButton.addEventListener("click",function(){this.video.webkitShowPlaybackTargetPicker()}.bind(this))}.bind(this.player)):this.player.template.airplayButton.style.display="none")}},{key:"initChromecast",value:function(){var a=window.document.createElement("script");a.setAttribute("type","text/javascript"),a.setAttribute("src","https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"),window.document.body.appendChild(a),window.__onGCastApiAvailable=function(s){if(s){var p=new(Dt=window.chrome.cast).SessionRequest(Dt.media.DEFAULT_MEDIA_RECEIVER_APP_ID),A=new Dt.ApiConfig(p,function(){},function(g){g===Dt.ReceiverAvailability.AVAILABLE&&console.log("chromecast: ",g)});Dt.initialize(A,function(){})}}}},{key:"initChromecastButton",value:function(){var a=this;if(this.player.options.chromecast){pi&&(pi=!1,this.initChromecast());var s=function(A,g){a.currentMedia=g},p=function(A){console.error("Error launching media",A)};this.player.template.chromecastButton.addEventListener("click",function(){_o?(_o=!1,a.currentMedia.stop(),a.session.stop(),a.initChromecast()):(_o=!0,Dt.requestSession(function(A){var g,v,L;a.session=A,g=a.player.options.video.url,v=new Dt.media.MediaInfo(g),L=new Dt.media.LoadRequest(v),a.session?a.session.loadMedia(L,s.bind(a,"loadMedia"),p).play():window.open(g)},function(A){A.code==="cancel"?a.session=void 0:console.error("Error selecting a cast device",A)}))})}}},{key:"initSubtitleButton",value:function(){var a=this;this.player.events.on("subtitle_show",function(){a.player.template.subtitleButton.dataset.balloon=a.player.tran("hide-subs"),a.player.template.subtitleButtonInner.style.opacity="",a.player.user.set("subtitle",1)}),this.player.events.on("subtitle_hide",function(){a.player.template.subtitleButton.dataset.balloon=a.player.tran("show-subs"),a.player.template.subtitleButtonInner.style.opacity="0.4",a.player.user.set("subtitle",0)}),this.player.template.subtitleButton.addEventListener("click",function(){a.player.subtitle.toggle()})}},{key:"setAutoHide",value:function(){var a=this;this.show(),clearTimeout(this.autoHideTimer),this.autoHideTimer=setTimeout(function(){!a.player.video.played.length||a.player.paused||a.disableAutoHide||a.hide()},3e3)}},{key:"show",value:function(){this.player.container.classList.remove("dplayer-hide-controller")}},{key:"hide",value:function(){this.player.container.classList.add("dplayer-hide-controller"),this.player.setting.hide(),this.player.comment&&this.player.comment.hide()}},{key:"isShow",value:function(){return!this.player.container.classList.contains("dplayer-hide-controller")}},{key:"toggle",value:function(){this.isShow()?this.hide():this.show()}},{key:"destroy",value:function(){te.isMobile||(this.player.container.removeEventListener("mousemove",this.setAutoHideHandler),this.player.container.removeEventListener("click",this.setAutoHideHandler)),clearTimeout(this.autoHideTimer)}}])&&Sd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Id=Ld;function Un(i){return Un=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Un(i)}function _d(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Un(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Un(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Un(s)==="symbol"?s:String(s)),a)}var s}var Od=function(){function i(a){var s=this;(function(L,_){if(!(L instanceof _))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.player.template.mask.addEventListener("click",function(){s.hide()}),this.player.template.settingButton.addEventListener("click",function(){s.show()}),this.loop=this.player.options.loop,this.player.template.loopToggle.checked=this.loop,this.player.template.loop.addEventListener("click",function(){s.player.template.loopToggle.checked=!s.player.template.loopToggle.checked,s.player.template.loopToggle.checked?s.loop=!0:s.loop=!1,s.hide()}),this.showDanmaku=this.player.user.get("danmaku"),this.showDanmaku||this.player.danmaku&&this.player.danmaku.hide(),this.player.template.showDanmakuToggle.checked=this.showDanmaku,this.player.template.showDanmaku.addEventListener("click",function(){s.player.template.showDanmakuToggle.checked=!s.player.template.showDanmakuToggle.checked,s.player.template.showDanmakuToggle.checked?(s.showDanmaku=!0,s.player.danmaku.show()):(s.showDanmaku=!1,s.player.danmaku.hide()),s.player.user.set("danmaku",s.showDanmaku?1:0),s.hide()}),this.unlimitDanmaku=this.player.user.get("unlimited"),this.player.template.unlimitDanmakuToggle.checked=this.unlimitDanmaku,this.player.template.unlimitDanmaku.addEventListener("click",function(){s.player.template.unlimitDanmakuToggle.checked=!s.player.template.unlimitDanmakuToggle.checked,s.player.template.unlimitDanmakuToggle.checked?(s.unlimitDanmaku=!0,s.player.danmaku.unlimit(!0)):(s.unlimitDanmaku=!1,s.player.danmaku.unlimit(!1)),s.player.user.set("unlimited",s.unlimitDanmaku?1:0),s.hide()}),this.player.template.speed.addEventListener("click",function(){s.player.template.settingBox.classList.add("dplayer-setting-box-narrow"),s.player.template.settingBox.classList.add("dplayer-setting-box-speed")});for(var p=function(L){s.player.template.speedItem[L].addEventListener("click",function(){s.player.speed(s.player.template.speedItem[L].dataset.speed),s.hide()})},A=0;A<this.player.template.speedItem.length;A++)p(A);if(this.player.danmaku){this.player.on("danmaku_opacity",function(L){s.player.bar.set("danmaku",L,"width"),s.player.user.set("opacity",L)}),this.player.danmaku.opacity(this.player.user.get("opacity"));var g=function(L){var _=L||window.event,U=((_.clientX||_.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(s.player.template.danmakuOpacityBarWrap))/130;U=Math.max(U,0),U=Math.min(U,1),s.player.danmaku.opacity(U)},v=function L(){document.removeEventListener(te.nameMap.dragEnd,L),document.removeEventListener(te.nameMap.dragMove,g),s.player.template.danmakuOpacityBox.classList.remove("dplayer-setting-danmaku-active")};this.player.template.danmakuOpacityBarWrapWrap.addEventListener("click",function(L){var _=L||window.event,U=((_.clientX||_.changedTouches[0].clientX)-te.getBoundingClientRectViewLeft(s.player.template.danmakuOpacityBarWrap))/130;U=Math.max(U,0),U=Math.min(U,1),s.player.danmaku.opacity(U)}),this.player.template.danmakuOpacityBarWrapWrap.addEventListener(te.nameMap.dragStart,function(){document.addEventListener(te.nameMap.dragMove,g),document.addEventListener(te.nameMap.dragEnd,v),s.player.template.danmakuOpacityBox.classList.add("dplayer-setting-danmaku-active")})}}var l,u;return l=i,(u=[{key:"hide",value:function(){var a=this;this.player.template.settingBox.classList.remove("dplayer-setting-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),setTimeout(function(){a.player.template.settingBox.classList.remove("dplayer-setting-box-narrow"),a.player.template.settingBox.classList.remove("dplayer-setting-box-speed")},300),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.settingBox.classList.add("dplayer-setting-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}}])&&_d(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Td=Od;function Hn(i){return Hn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Hn(i)}function Rd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Hn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Hn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Hn(s)==="symbol"?s:String(s)),a)}var s}var Pd=function(){function i(a){var s=this;(function(p,A){if(!(p instanceof A))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.player.template.mask.addEventListener("click",function(){s.hide()}),this.player.template.commentButton.addEventListener("click",function(){s.show()}),this.player.template.commentSettingButton.addEventListener("click",function(){s.toggleSetting()}),this.player.template.commentColorSettingBox.addEventListener("click",function(){if(s.player.template.commentColorSettingBox.querySelector("input:checked+span")){var p=s.player.template.commentColorSettingBox.querySelector("input:checked").value;s.player.template.commentSettingFill.style.fill=p,s.player.template.commentInput.style.color=p,s.player.template.commentSendFill.style.fill=p}}),this.player.template.commentInput.addEventListener("click",function(){s.hideSetting()}),this.player.template.commentInput.addEventListener("keydown",function(p){(p||window.event).keyCode===13&&s.send()}),this.player.template.commentSendButton.addEventListener("click",function(){s.send()})}var l,u;return l=i,(u=[{key:"show",value:function(){this.player.controller.disableAutoHide=!0,this.player.template.controller.classList.add("dplayer-controller-comment"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.container.classList.add("dplayer-show-controller"),this.player.template.commentInput.focus()}},{key:"hide",value:function(){this.player.template.controller.classList.remove("dplayer-controller-comment"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.container.classList.remove("dplayer-show-controller"),this.player.controller.disableAutoHide=!1,this.hideSetting()}},{key:"showSetting",value:function(){this.player.template.commentSettingBox.classList.add("dplayer-comment-setting-open")}},{key:"hideSetting",value:function(){this.player.template.commentSettingBox.classList.remove("dplayer-comment-setting-open")}},{key:"toggleSetting",value:function(){this.player.template.commentSettingBox.classList.contains("dplayer-comment-setting-open")?this.hideSetting():this.showSetting()}},{key:"send",value:function(){var a=this;this.player.template.commentInput.blur(),this.player.template.commentInput.value.replace(/^\s+|\s+$/g,"")?this.player.danmaku.send({text:this.player.template.commentInput.value,color:te.color2Number(this.player.container.querySelector(".dplayer-comment-setting-color input:checked").value),type:parseInt(this.player.container.querySelector(".dplayer-comment-setting-type input:checked").value)},function(){a.player.template.commentInput.value="",a.hide()}):this.player.notice(this.player.tran("please-input-danmaku"))}}])&&Rd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const jd=Pd;function Wn(i){return Wn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Wn(i)}function zd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Wn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Wn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Wn(s)==="symbol"?s:String(s)),a)}var s}var Md=function(){function i(a){(function(s,p){if(!(s instanceof p))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.doHotKeyHandler=this.doHotKey.bind(this),this.cancelFullScreenHandler=this.cancelFullScreen.bind(this),this.player.options.hotkey&&document.addEventListener("keydown",this.doHotKeyHandler),document.addEventListener("keydown",this.cancelFullScreenHandler)}var l,u;return l=i,(u=[{key:"doHotKey",value:function(a){if(this.player.focus){var s=document.activeElement.tagName.toUpperCase(),p=document.activeElement.getAttribute("contenteditable");if(s!=="INPUT"&&s!=="TEXTAREA"&&p!==""&&p!=="true"){var A,g=a||window.event;switch(g.keyCode){case 32:g.preventDefault(),this.player.toggle();break;case 37:if(g.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime-5),this.player.controller.setAutoHide();break;case 39:if(g.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime+5),this.player.controller.setAutoHide();break;case 38:g.preventDefault(),A=this.player.volume()+.1,this.player.volume(A);break;case 40:g.preventDefault(),A=this.player.volume()-.1,this.player.volume(A)}}}}},{key:"cancelFullScreen",value:function(a){(a||window.event).keyCode===27&&this.player.fullScreen.isFullScreen("web")&&this.player.fullScreen.cancel("web")}},{key:"destroy",value:function(){this.player.options.hotkey&&document.removeEventListener("keydown",this.doHotKeyHandler),document.removeEventListener("keydown",this.cancelFullScreenHandler)}}])&&zd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Dd=Md;function Yn(i){return Yn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Yn(i)}function qd(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Yn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Yn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Yn(s)==="symbol"?s:String(s)),a)}var s}var Fd=function(){function i(a){var s=this;(function(p,A){if(!(p instanceof A))throw new TypeError("Cannot call a class as a function")})(this,i),this.player=a,this.shown=!1,Array.prototype.slice.call(this.player.template.menuItem).forEach(function(p,A){s.player.options.contextmenu[A].click&&p.addEventListener("click",function(){s.player.options.contextmenu[A].click(s.player),s.hide()})}),this.contextmenuHandler=function(p){if(s.shown)s.hide();else{var A=p||window.event;A.preventDefault();var g=s.player.container.getBoundingClientRect();s.show(A.clientX-g.left,A.clientY-g.top),s.player.template.mask.addEventListener("click",function(){s.hide()})}},this.player.container.addEventListener("contextmenu",this.contextmenuHandler)}var l,u;return l=i,(u=[{key:"show",value:function(a,s){this.player.template.menu.classList.add("dplayer-menu-show");var p=this.player.container.getBoundingClientRect();a+this.player.template.menu.offsetWidth>=p.width?(this.player.template.menu.style.right=p.width-a+"px",this.player.template.menu.style.left="initial"):(this.player.template.menu.style.left=a+"px",this.player.template.menu.style.right="initial"),s+this.player.template.menu.offsetHeight>=p.height?(this.player.template.menu.style.bottom=p.height-s+"px",this.player.template.menu.style.top="initial"):(this.player.template.menu.style.top=s+"px",this.player.template.menu.style.bottom="initial"),this.player.template.mask.classList.add("dplayer-mask-show"),this.shown=!0,this.player.events.trigger("contextmenu_show")}},{key:"hide",value:function(){this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.template.menu.classList.remove("dplayer-menu-show"),this.shown=!1,this.player.events.trigger("contextmenu_hide")}},{key:"destroy",value:function(){this.player.container.removeEventListener("contextmenu",this.contextmenuHandler)}}])&&qd(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Nd=Fd;function Kn(i){return Kn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Kn(i)}function Ud(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,(s=function(p,A){if(Kn(p)!=="object"||p===null)return p;var g=p[Symbol.toPrimitive];if(g!==void 0){var v=g.call(p,"string");if(Kn(v)!=="object")return v;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(p)}(a.key),Kn(s)==="symbol"?s:String(s)),a)}var s}var Hd=function(){function i(a){var s=this;(function(p,A){if(!(p instanceof A))throw new TypeError("Cannot call a class as a function")})(this,i),this.container=a.template.infoPanel,this.template=a.template,this.video=a.video,this.player=a,this.template.infoPanelClose.addEventListener("click",function(){s.hide()})}var l,u;return l=i,(u=[{key:"show",value:function(){this.beginTime=Date.now(),this.update(),this.player.timer.enable("info"),this.player.timer.enable("fps"),this.container.classList.remove("dplayer-info-panel-hide")}},{key:"hide",value:function(){this.player.timer.disable("info"),this.player.timer.disable("fps"),this.container.classList.add("dplayer-info-panel-hide")}},{key:"triggle",value:function(){this.container.classList.contains("dplayer-info-panel-hide")?this.show():this.hide()}},{key:"update",value:function(){this.template.infoVersion.innerHTML="v".concat("1.27.1"," ").concat("v1.27.0-12-g4f61091"),this.template.infoType.innerHTML=this.player.type,this.template.infoUrl.innerHTML=this.player.options.video.url,this.template.infoResolution.innerHTML="".concat(this.player.video.videoWidth," x ").concat(this.player.video.videoHeight),this.template.infoDuration.innerHTML=this.player.video.duration,this.player.options.danmaku&&(this.template.infoDanmakuId.innerHTML=this.player.options.danmaku.id,this.template.infoDanmakuApi.innerHTML=this.player.options.danmaku.api,this.template.infoDanmakuAmount.innerHTML=this.player.danmaku.dan.length)}},{key:"fps",value:function(a){this.template.infoFPS.innerHTML="".concat(a.toFixed(1))}}])&&Ud(l.prototype,u),Object.defineProperty(l,"prototype",{writable:!1}),i}();const Wd=Hd;var Yd=o(568),Kd=o.n(Yd);function Qn(i){return Qn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(l){return typeof l}:function(l){return l&&typeof Symbol=="function"&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l},Qn(i)}function ui(i,l){var u=Object.keys(i);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(i);l&&(a=a.filter(function(s){return Object.getOwnPropertyDescriptor(i,s).enumerable})),u.push.apply(u,a)}return u}function Qd(i,l,u){return(l=Ai(l))in i?Object.defineProperty(i,l,{value:u,enumerable:!0,configurable:!0,writable:!0}):i[l]=u,i}function fi(i,l){for(var u=0;u<l.length;u++){var a=l[u];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(i,Ai(a.key),a)}}function Ai(i){var l=function(u,a){if(Qn(u)!=="object"||u===null)return u;var s=u[Symbol.toPrimitive];if(s!==void 0){var p=s.call(u,"string");if(Qn(p)!=="object")return p;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(u)}(i);return Qn(l)==="symbol"?l:String(l)}var yi=0,an=[],Vd=function(){function i(s){var p=this;(function(A,g){if(!(A instanceof g))throw new TypeError("Cannot call a class as a function")})(this,i),this.options=function(A){var g={container:A.element||document.getElementsByClassName("dplayer")[0],live:!1,autoplay:!1,theme:"#b7daff",loop:!1,lang:(navigator.language||navigator.browserLanguage).toLowerCase(),screenshot:!1,airplay:!0,chromecast:!1,hotkey:!0,preload:"metadata",volume:.7,playbackSpeed:[.5,.75,1,1.25,1.5,2],apiBackend:uc,video:{},contextmenu:[],mutex:!0,pluginOptions:{hls:{},flv:{},dash:{},webtorrent:{}},preventClickToggle:!1};for(var v in g)g.hasOwnProperty(v)&&!A.hasOwnProperty(v)&&(A[v]=g[v]);return A.video&&!A.video.type&&(A.video.type="auto"),Lo(A.danmaku)==="object"&&A.danmaku&&!A.danmaku.user&&(A.danmaku.user="DIYgod"),A.subtitle&&(!A.subtitle.type&&(A.subtitle.type="webvtt"),!A.subtitle.fontSize&&(A.subtitle.fontSize="20px"),!A.subtitle.bottom&&(A.subtitle.bottom="40px"),!A.subtitle.color&&(A.subtitle.color="#fff")),A.video.quality&&(A.video.url=A.video.quality[A.video.defaultQuality].url),A.lang&&(A.lang=A.lang.toLowerCase()),A.contextmenu=A.contextmenu.concat([{key:"video-info",click:function(L){L.infoPanel.triggle()}},{key:"about-author",link:"https://diygod.me"},{text:"DPlayer v".concat("1.27.1"),link:"https://github.com/MoePlayer/DPlayer"}]),A}(function(A){for(var g=1;g<arguments.length;g++){var v=arguments[g]!=null?arguments[g]:{};g%2?ui(Object(v),!0).forEach(function(L){Qd(A,L,v[L])}):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(v)):ui(Object(v)).forEach(function(L){Object.defineProperty(A,L,Object.getOwnPropertyDescriptor(v,L))})}return A}({preload:s.video.type==="webtorrent"?"none":"metadata"},s)),this.options.video.quality&&(this.qualityIndex=this.options.video.defaultQuality,this.quality=this.options.video.quality[this.options.video.defaultQuality]),this.tran=new fc(this.options.lang).tran,this.events=new rd,this.user=new cd(this),this.container=this.options.container,this.noticeList={},this.container.classList.add("dplayer"),this.options.danmaku||this.container.classList.add("dplayer-no-danmaku"),this.options.live?this.container.classList.add("dplayer-live"):this.container.classList.remove("dplayer-live"),te.isMobile&&this.container.classList.add("dplayer-mobile"),this.arrow=this.container.offsetWidth<=500,this.arrow&&this.container.classList.add("dplayer-arrow"),this.options.subtitle&&Array.isArray(this.options.subtitle.url)&&(this.options.subtitle.url.push({subtitle:"",lang:"off"}),this.options.subtitle.defaultSubtitle&&(typeof this.options.subtitle.defaultSubtitle=="string"?this.options.subtitle.index=this.options.subtitle.url.findIndex(function(A){return A.lang===p.options.subtitle.defaultSubtitle||A.name===p.options.subtitle.defaultSubtitle}):typeof this.options.subtitle.defaultSubtitle=="number"&&(this.options.subtitle.index=this.options.subtitle.defaultSubtitle)),(this.options.subtitle.index===-1||!this.options.subtitle.index||this.options.subtitle.index>this.options.subtitle.url.length-1)&&(this.options.subtitle.index=this.options.subtitle.url.findIndex(function(A){return A.lang===p.options.lang})),this.options.subtitle.index===-1&&(this.options.subtitle.index=this.options.subtitle.url.length-1)),this.template=new di({container:this.container,options:this.options,index:yi,tran:this.tran}),this.video=this.template.video,this.bar=new bd(this.template),this.bezel=new wd(this.template.bezel),this.fullScreen=new id(this),this.controller=new Id(this),this.options.danmaku&&(this.danmaku=new td({player:this,container:this.template.danmaku,opacity:this.user.get("opacity"),callback:function(){setTimeout(function(){p.template.danmakuLoading.style.display="none",p.options.autoplay&&p.play()},0)},error:function(A){p.notice(A)},apiBackend:this.options.apiBackend,borderColor:this.options.theme,height:this.arrow?24:30,time:function(){return p.video.currentTime},unlimited:this.user.get("unlimited"),api:{id:this.options.danmaku.id,address:this.options.danmaku.api,token:this.options.danmaku.token,maximum:this.options.danmaku.maximum,addition:this.options.danmaku.addition,user:this.options.danmaku.user,speedRate:this.options.danmaku.speedRate},events:this.events,tran:function(A){return p.tran(A)}}),this.comment=new jd(this)),this.setting=new Td(this),this.plugins={},this.docClickFun=function(){p.focus=!1},this.containerClickFun=function(){p.focus=!0},document.addEventListener("click",this.docClickFun,!0),this.container.addEventListener("click",this.containerClickFun,!0),this.paused=!0,this.timer=new xd(this),this.hotkey=new Dd(this),this.contextmenu=new Nd(this),this.initVideo(this.video,this.quality&&this.quality.type||this.options.video.type),this.infoPanel=new Wd(this),!this.danmaku&&this.options.autoplay&&this.play(),yi++,an.push(this)}var l,u,a;return l=i,u=[{key:"seek",value:function(s){s=Math.max(s,0),this.video.duration&&(s=Math.min(s,this.video.duration)),this.video.currentTime<s?this.notice("".concat(this.tran("ff").replace("%s",(s-this.video.currentTime).toFixed(0)))):this.video.currentTime>s&&this.notice("".concat(this.tran("rew").replace("%s",(this.video.currentTime-s).toFixed(0)))),this.video.currentTime=s,this.danmaku&&this.danmaku.seek(),this.bar.set("played",s/this.video.duration,"width"),this.template.ptime.innerHTML=te.secondToTime(s)}},{key:"play",value:function(s){var p=this;if(this.paused=!1,this.video.paused&&!te.isMobile&&this.bezel.switch(ut.play),this.template.playButton.innerHTML=ut.pause,this.template.mobilePlayButton.innerHTML=ut.pause,s||be.resolve(this.video.play()).catch(function(){p.pause()}).then(function(){}),this.timer.enable("loading"),this.container.classList.remove("dplayer-paused"),this.container.classList.add("dplayer-playing"),this.danmaku&&this.danmaku.play(),this.options.mutex)for(var A=0;A<an.length;A++)this!==an[A]&&an[A].pause()}},{key:"pause",value:function(s){this.paused=!0,this.container.classList.remove("dplayer-loading"),this.video.paused||te.isMobile||this.bezel.switch(ut.pause),this.template.playButton.innerHTML=ut.play,this.template.mobilePlayButton.innerHTML=ut.play,s||this.video.pause(),this.timer.disable("loading"),this.container.classList.remove("dplayer-playing"),this.container.classList.add("dplayer-paused"),this.danmaku&&this.danmaku.pause()}},{key:"switchVolumeIcon",value:function(){this.volume()>=.95?this.template.volumeIcon.innerHTML=ut.volumeUp:this.volume()>0?this.template.volumeIcon.innerHTML=ut.volumeDown:this.template.volumeIcon.innerHTML=ut.volumeOff}},{key:"volume",value:function(s,p,A){if(s=parseFloat(s),!isNaN(s)){s=Math.max(s,0),s=Math.min(s,1),this.bar.set("volume",s,"width");var g="".concat((100*s).toFixed(0),"%");this.template.volumeBarWrapWrap.dataset.balloon=g,p||this.user.set("volume",s),A||this.notice("".concat(this.tran("volume")," ").concat((100*s).toFixed(0),"%"),void 0,void 0,"volume"),this.video.volume=s,this.video.muted&&(this.video.muted=!1),this.switchVolumeIcon()}return this.video.volume}},{key:"toggle",value:function(){this.video.paused?this.play():this.pause()}},{key:"on",value:function(s,p){this.events.on(s,p)}},{key:"switchVideo",value:function(s,p){this.pause(),this.video.poster=s.pic?s.pic:"",this.video.src=s.url,this.initMSE(this.video,s.type||"auto"),p&&(this.template.danmakuLoading.style.display="block",this.bar.set("played",0,"width"),this.bar.set("loaded",0,"width"),this.template.ptime.innerHTML="00:00",this.template.danmaku.innerHTML="",this.danmaku&&this.danmaku.reload({id:p.id,address:p.api,token:p.token,maximum:p.maximum,addition:p.addition,user:p.user}))}},{key:"initMSE",value:function(s,p){var A=this;if(this.type=p,this.options.video.customType&&this.options.video.customType[p])Object.prototype.toString.call(this.options.video.customType[p])==="[object Function]"?this.options.video.customType[p](this.video,this):console.error("Illegal customType: ".concat(p));else switch(this.type==="auto"&&(/m3u8(#|\?|$)/i.exec(s.src)?this.type="hls":/.flv(#|\?|$)/i.exec(s.src)?this.type="flv":/.mpd(#|\?|$)/i.exec(s.src)?this.type="dash":this.type="normal"),this.type==="hls"&&(s.canPlayType("application/x-mpegURL")||s.canPlayType("application/vnd.apple.mpegURL"))&&(this.type="normal"),this.type){case"hls":if(window.Hls)if(window.Hls.isSupported()){var g=this.options.pluginOptions.hls,v=new window.Hls(g);this.plugins.hls=v,v.loadSource(s.src),v.attachMedia(s),this.events.on("destroy",function(){v.destroy(),delete A.plugins.hls})}else this.notice("Error: Hls is not supported.");else this.notice("Error: Can't find Hls.");break;case"flv":if(window.flvjs)if(window.flvjs.isSupported()){var L=window.flvjs.createPlayer(Object.assign(this.options.pluginOptions.flv.mediaDataSource||{},{type:"flv",url:s.src}),this.options.pluginOptions.flv.config);this.plugins.flvjs=L,L.attachMediaElement(s),L.load(),this.events.on("destroy",function(){L.unload(),L.detachMediaElement(),L.destroy(),delete A.plugins.flvjs})}else this.notice("Error: flvjs is not supported.");else this.notice("Error: Can't find flvjs.");break;case"dash":if(window.dashjs){var _=window.dashjs.MediaPlayer().create().initialize(s,s.src,!1),U=this.options.pluginOptions.dash;_.updateSettings(U),this.plugins.dash=_,this.events.on("destroy",function(){window.dashjs.MediaPlayer().reset(),delete A.plugins.dash})}else this.notice("Error: Can't find dashjs.");break;case"webtorrent":if(window.WebTorrent)if(window.WebTorrent.WEBRTC_SUPPORT){this.container.classList.add("dplayer-loading");var Q=this.options.pluginOptions.webtorrent,X=new window.WebTorrent(Q);this.plugins.webtorrent=X;var $=s.src;s.src="",s.preload="metadata",s.addEventListener("durationchange",function(){return A.container.classList.remove("dplayer-loading")},{once:!0}),X.add($,function(Y){Y.files.find(function(ee){return ee.name.endsWith(".mp4")}).renderTo(A.video,{autoplay:A.options.autoplay,controls:!1})}),this.events.on("destroy",function(){X.remove($),X.destroy(),delete A.plugins.webtorrent})}else this.notice("Error: Webtorrent is not supported.");else this.notice("Error: Can't find Webtorrent.")}}},{key:"initVideo",value:function(s,p){var A=this;this.initMSE(s,p),this.on("durationchange",function(){s.duration!==1&&s.duration!==1/0&&(A.template.dtime.innerHTML=te.secondToTime(s.duration))}),this.on("progress",function(){var L=s.buffered.length?s.buffered.end(s.buffered.length-1)/s.duration:0;A.bar.set("loaded",L,"width")}),this.on("error",function(){A.video.error&&A.tran&&A.notice&&A.type!=="webtorrent"&&A.notice(A.tran("video-failed"))}),this.on("ended",function(){A.bar.set("played",1,"width"),A.setting.loop?(A.seek(0),A.play()):A.pause(),A.danmaku&&(A.danmaku.danIndex=0)}),this.on("play",function(){A.paused&&A.play(!0)}),this.on("pause",function(){A.paused||A.pause(!0)}),this.on("timeupdate",function(){A.bar.set("played",A.video.currentTime/A.video.duration,"width");var L=te.secondToTime(A.video.currentTime);A.template.ptime.innerHTML!==L&&(A.template.ptime.innerHTML=L)});for(var g=function(L){s.addEventListener(A.events.videoEvents[L],function(_){A.events.trigger(A.events.videoEvents[L],_)})},v=0;v<this.events.videoEvents.length;v++)g(v);this.volume(this.user.get("volume"),!0,!0),this.options.subtitle&&(this.subtitle=new ud(this.template.subtitle,this.video,this.options.subtitle,this.events),Array.isArray(this.options.subtitle.url)&&(this.subtitles=new yd(this)),this.user.get("subtitle")||this.subtitle.hide())}},{key:"switchQuality",value:function(s){var p=this;if(s=typeof s=="string"?parseInt(s):s,this.qualityIndex!==s&&!this.switchingQuality){this.prevIndex=this.qualityIndex,this.qualityIndex=s,this.switchingQuality=!0,this.quality=this.options.video.quality[s],this.template.qualityButton.innerHTML=this.quality.name;var A=this.video.paused;this.video.pause();var g=Kd()({current:!1,pic:null,screenshot:this.options.screenshot,preload:"auto",url:this.quality.url,subtitle:this.options.subtitle}),v=new DOMParser().parseFromString(g,"text/html").body.firstChild;this.template.videoWrap.insertBefore(v,this.template.videoWrap.getElementsByTagName("div")[0]),this.prevVideo=this.video,this.video=v,this.initVideo(this.video,this.quality.type||this.options.video.type),this.seek(this.prevVideo.currentTime),this.notice("".concat(this.tran("switching-quality").replace("%q",this.quality.name)),-1,void 0,"switch-quality"),this.events.trigger("quality_start",this.quality),this.on("canplay",function(){if(p.prevVideo){if(p.video.currentTime!==p.prevVideo.currentTime)return void p.seek(p.prevVideo.currentTime);p.template.videoWrap.removeChild(p.prevVideo),p.video.classList.add("dplayer-video-current"),A||p.video.play(),p.prevVideo=null,p.notice("".concat(p.tran("switched-quality").replace("%q",p.quality.name)),void 0,void 0,"switch-quality"),p.switchingQuality=!1,p.events.trigger("quality_end")}}),this.on("error",function(){p.video.error&&p.prevVideo&&(p.template.videoWrap.removeChild(p.video),p.video=p.prevVideo,A||p.video.play(),p.qualityIndex=p.prevIndex,p.quality=p.options.video.quality[p.qualityIndex],p.noticeTime=setTimeout(function(){p.template.notice.style.opacity=0,p.events.trigger("notice_hide")},3e3),p.prevVideo=null,p.switchingQuality=!1)})}}},{key:"notice",value:function(s){var p,A,g,v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2e3,L=arguments.length>2&&arguments[2]!==void 0?arguments[2]:.8,_=arguments.length>3?arguments[3]:void 0;if(_&&((p=document.getElementById("dplayer-notice-".concat(_)))&&(p.innerHTML=s),this.noticeList[_]&&(clearTimeout(this.noticeList[_]),this.noticeList[_]=null)),!p){var U=di.NewNotice(s,L,_);this.template.noticeList.appendChild(U),p=U}this.events.trigger("notice_show",p),v>0&&(this.noticeList[_]=setTimeout((A=p,g=this,function(){A.addEventListener("animationend",function(){g.template.noticeList.removeChild(A)}),A.classList.add("remove-notice"),g.events.trigger("notice_hide"),g.noticeList[_]=null}),v))}},{key:"resize",value:function(){this.danmaku&&this.danmaku.resize(),this.controller.thumbnails&&this.controller.thumbnails.resize(160,this.video.videoHeight/this.video.videoWidth*160,this.template.barWrap.offsetWidth),this.events.trigger("resize")}},{key:"speed",value:function(s){this.video.playbackRate=s}},{key:"destroy",value:function(){an.splice(an.indexOf(this),1),this.pause(),document.removeEventListener("click",this.docClickFun,!0),this.container.removeEventListener("click",this.containerClickFun,!0),this.fullScreen.destroy(),this.hotkey.destroy(),this.contextmenu.destroy(),this.controller.destroy(),this.timer.destroy(),this.video.src="",this.container.innerHTML="",this.events.trigger("destroy")}}],a=[{key:"version",get:function(){return"1.27.1"}}],u&&fi(l.prototype,u),a&&fi(l,a),Object.defineProperty(l,"prototype",{writable:!1}),i}();const $d=Vd;console.log(`
`.concat(" %c DPlayer v","1.27.1"," ").concat("v1.27.0-12-g4f61091"," %c https://dplayer.diygod.dev ",`
`,`
`),"color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;");const Zd=$d})(),c.default})())})(Vs);var _h=Vs.exports;const Oh=Ih(_h),Th={id:"dplayer",style:{width:"100%",height:"100%"}},Rh={__name:"VideoPlay",setup(e){const t=Ra(),n=tt(null);return hr(()=>{let r=t.query.url;n.value=new Oh({container:document.getElementById("dplayer"),video:{url:r}})}),ns(()=>{n.value.destroy()}),(r,o)=>(xe(),Ue("div",Th))}},Ph=["src"],jh={__name:"AudioPlay",setup(e){const t=Ra(),n=tt();return hr(()=>{n.value=t.query.url}),(r,o)=>(xe(),Ue("div",null,[Te("audio",{src:n.value,controls:""},null,8,Ph)]))}},zh=[{path:"/",component:Sh},{path:"/VideoPlay",component:Rh},{path:"/AudioPlay",component:jh}],Mh=wA({history:qf(),routes:zh});const $s=hf(vf);$s.use(Mh);$s.mount("#app");
