(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function bu(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const Ct={},or=[],fi=()=>{},Lf=()=>!1,Jo=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Eu=n=>n.startsWith("onUpdate:"),Jt=Object.assign,Tu=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Nm=Object.prototype.hasOwnProperty,yt=(n,e)=>Nm.call(n,e),Ze=Array.isArray,lr=n=>ha(n)==="[object Map]",br=n=>ha(n)==="[object Set]",Ah=n=>ha(n)==="[object Date]",rt=n=>typeof n=="function",Vt=n=>typeof n=="string",gi=n=>typeof n=="symbol",Tt=n=>n!==null&&typeof n=="object",If=n=>(Tt(n)||rt(n))&&rt(n.then)&&rt(n.catch),Uf=Object.prototype.toString,ha=n=>Uf.call(n),Fm=n=>ha(n).slice(8,-1),Nf=n=>ha(n)==="[object Object]",wu=n=>Vt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Xr=bu(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),jo=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},Om=/-\w/g,Hn=jo(n=>n.replace(Om,e=>e.slice(1).toUpperCase())),km=/\B([A-Z])/g,Is=jo(n=>n.replace(km,"-$1").toLowerCase()),Qo=jo(n=>n.charAt(0).toUpperCase()+n.slice(1)),_l=jo(n=>n?`on${Qo(n)}`:""),es=(n,e)=>!Object.is(n,e),ho=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},Ff=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},el=n=>{const e=parseFloat(n);return isNaN(e)?n:e},Bm=n=>{const e=Vt(n)?Number(n):NaN;return isNaN(e)?n:e};let Ch;const tl=()=>Ch||(Ch=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Sn(n){if(Ze(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=Vt(i)?Gm(i):Sn(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(Vt(n)||Tt(n))return n}const zm=/;(?![^(]*\))/g,Vm=/:([^]+)/,Hm=/\/\*[^]*?\*\//g;function Gm(n){const e={};return n.replace(Hm,"").split(zm).forEach(t=>{if(t){const i=t.split(Vm);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function nt(n){let e="";if(Vt(n))e=n;else if(Ze(n))for(let t=0;t<n.length;t++){const i=nt(n[t]);i&&(e+=i+" ")}else if(Tt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Wm="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Xm=bu(Wm);function Of(n){return!!n||n===""}function $m(n,e){if(n.length!==e.length)return!1;let t=!0;for(let i=0;t&&i<n.length;i++)t=da(n[i],e[i]);return t}function da(n,e){if(n===e)return!0;let t=Ah(n),i=Ah(e);if(t||i)return t&&i?n.getTime()===e.getTime():!1;if(t=gi(n),i=gi(e),t||i)return n===e;if(t=Ze(n),i=Ze(e),t||i)return t&&i?$m(n,e):!1;if(t=Tt(n),i=Tt(e),t||i){if(!t||!i)return!1;const s=Object.keys(n).length,r=Object.keys(e).length;if(s!==r)return!1;for(const a in n){const o=n.hasOwnProperty(a),l=e.hasOwnProperty(a);if(o&&!l||!o&&l||!da(n[a],e[a]))return!1}}return String(n)===String(e)}function Au(n,e){return n.findIndex(t=>da(t,e))}const kf=n=>!!(n&&n.__v_isRef===!0),P=n=>Vt(n)?n:n==null?"":Ze(n)||Tt(n)&&(n.toString===Uf||!rt(n.toString))?kf(n)?P(n.value):JSON.stringify(n,Bf,2):String(n),Bf=(n,e)=>kf(e)?Bf(n,e.value):lr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[vl(i,r)+" =>"]=s,t),{})}:br(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>vl(t))}:gi(e)?vl(e):Tt(e)&&!Ze(e)&&!Nf(e)?String(e):e,vl=(n,e="")=>{var t;return gi(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};let Mn;class qm{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Mn,!e&&Mn&&(this.index=(Mn.scopes||(Mn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=Mn;try{return Mn=this,e()}finally{Mn=t}}}on(){++this._on===1&&(this.prevScope=Mn,Mn=this)}off(){this._on>0&&--this._on===0&&(Mn=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Ym(){return Mn}let Dt;const xl=new WeakSet;class zf{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Mn&&Mn.active&&Mn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,xl.has(this)&&(xl.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Hf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Rh(this),Gf(this);const e=Dt,t=Yn;Dt=this,Yn=!0;try{return this.fn()}finally{Wf(this),Dt=e,Yn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Pu(e);this.deps=this.depsTail=void 0,Rh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?xl.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){fc(this)&&this.run()}get dirty(){return fc(this)}}let Vf=0,$r,qr;function Hf(n,e=!1){if(n.flags|=8,e){n.next=qr,qr=n;return}n.next=$r,$r=n}function Cu(){Vf++}function Ru(){if(--Vf>0)return;if(qr){let e=qr;for(qr=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;$r;){let e=$r;for($r=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function Gf(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Wf(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),Pu(i),Km(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function fc(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Xf(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Xf(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===ea)||(n.globalVersion=ea,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!fc(n))))return;n.flags|=2;const e=n.dep,t=Dt,i=Yn;Dt=n,Yn=!0;try{Gf(n);const s=n.fn(n._value);(e.version===0||es(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{Dt=t,Yn=i,Wf(n),n.flags&=-3}}function Pu(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)Pu(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Km(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Yn=!0;const $f=[];function Di(){$f.push(Yn),Yn=!1}function Li(){const n=$f.pop();Yn=n===void 0?!0:n}function Rh(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Dt;Dt=void 0;try{e()}finally{Dt=t}}}let ea=0;class Zm{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Du{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Dt||!Yn||Dt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Dt)t=this.activeLink=new Zm(Dt,this),Dt.deps?(t.prevDep=Dt.depsTail,Dt.depsTail.nextDep=t,Dt.depsTail=t):Dt.deps=Dt.depsTail=t,qf(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=Dt.depsTail,t.nextDep=void 0,Dt.depsTail.nextDep=t,Dt.depsTail=t,Dt.deps===t&&(Dt.deps=i)}return t}trigger(e){this.version++,ea++,this.notify(e)}notify(e){Cu();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Ru()}}}function qf(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)qf(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const pc=new WeakMap,ws=Symbol(""),mc=Symbol(""),ta=Symbol("");function ln(n,e,t){if(Yn&&Dt){let i=pc.get(n);i||pc.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new Du),s.map=i,s.key=t),s.track()}}function wi(n,e,t,i,s,r){const a=pc.get(n);if(!a){ea++;return}const o=l=>{l&&l.trigger()};if(Cu(),e==="clear")a.forEach(o);else{const l=Ze(n),c=l&&wu(t);if(l&&t==="length"){const u=Number(i);a.forEach((f,h)=>{(h==="length"||h===ta||!gi(h)&&h>=u)&&o(f)})}else switch((t!==void 0||a.has(void 0))&&o(a.get(t)),c&&o(a.get(ta)),e){case"add":l?c&&o(a.get("length")):(o(a.get(ws)),lr(n)&&o(a.get(mc)));break;case"delete":l||(o(a.get(ws)),lr(n)&&o(a.get(mc)));break;case"set":lr(n)&&o(a.get(ws));break}}Ru()}function Fs(n){const e=vt(n);return e===n?e:(ln(e,"iterate",ta),Vn(n)?e:e.map(Kn))}function nl(n){return ln(n=vt(n),"iterate",ta),n}function qi(n,e){return Ii(n)?As(n)?mr(Kn(e)):mr(e):Kn(e)}const Jm={__proto__:null,[Symbol.iterator](){return yl(this,Symbol.iterator,n=>qi(this,n))},concat(...n){return Fs(this).concat(...n.map(e=>Ze(e)?Fs(e):e))},entries(){return yl(this,"entries",n=>(n[1]=qi(this,n[1]),n))},every(n,e){return vi(this,"every",n,e,void 0,arguments)},filter(n,e){return vi(this,"filter",n,e,t=>t.map(i=>qi(this,i)),arguments)},find(n,e){return vi(this,"find",n,e,t=>qi(this,t),arguments)},findIndex(n,e){return vi(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return vi(this,"findLast",n,e,t=>qi(this,t),arguments)},findLastIndex(n,e){return vi(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return vi(this,"forEach",n,e,void 0,arguments)},includes(...n){return Ml(this,"includes",n)},indexOf(...n){return Ml(this,"indexOf",n)},join(n){return Fs(this).join(n)},lastIndexOf(...n){return Ml(this,"lastIndexOf",n)},map(n,e){return vi(this,"map",n,e,void 0,arguments)},pop(){return wr(this,"pop")},push(...n){return wr(this,"push",n)},reduce(n,...e){return Ph(this,"reduce",n,e)},reduceRight(n,...e){return Ph(this,"reduceRight",n,e)},shift(){return wr(this,"shift")},some(n,e){return vi(this,"some",n,e,void 0,arguments)},splice(...n){return wr(this,"splice",n)},toReversed(){return Fs(this).toReversed()},toSorted(n){return Fs(this).toSorted(n)},toSpliced(...n){return Fs(this).toSpliced(...n)},unshift(...n){return wr(this,"unshift",n)},values(){return yl(this,"values",n=>qi(this,n))}};function yl(n,e,t){const i=nl(n),s=i[e]();return i!==n&&!Vn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=t(r.value)),r}),s}const jm=Array.prototype;function vi(n,e,t,i,s,r){const a=nl(n),o=a!==n&&!Vn(n),l=a[e];if(l!==jm[e]){const f=l.apply(n,r);return o?Kn(f):f}let c=t;a!==n&&(o?c=function(f,h){return t.call(this,qi(n,f),h,n)}:t.length>2&&(c=function(f,h){return t.call(this,f,h,n)}));const u=l.call(a,c,i);return o&&s?s(u):u}function Ph(n,e,t,i){const s=nl(n);let r=t;return s!==n&&(Vn(n)?t.length>3&&(r=function(a,o,l){return t.call(this,a,o,l,n)}):r=function(a,o,l){return t.call(this,a,qi(n,o),l,n)}),s[e](r,...i)}function Ml(n,e,t){const i=vt(n);ln(i,"iterate",ta);const s=i[e](...t);return(s===-1||s===!1)&&Uu(t[0])?(t[0]=vt(t[0]),i[e](...t)):s}function wr(n,e,t=[]){Di(),Cu();const i=vt(n)[e].apply(n,t);return Ru(),Li(),i}const Qm=bu("__proto__,__v_isRef,__isVue"),Yf=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(gi));function eg(n){gi(n)||(n=String(n));const e=vt(this);return ln(e,"has",n),e.hasOwnProperty(n)}class Kf{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?ug:Qf:r?jf:Jf).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const a=Ze(e);if(!s){let l;if(a&&(l=Jm[t]))return l;if(t==="hasOwnProperty")return eg}const o=Reflect.get(e,t,hn(e)?e:i);if((gi(t)?Yf.has(t):Qm(t))||(s||ln(e,"get",t),r))return o;if(hn(o)){const l=a&&wu(t)?o:o.value;return s&&Tt(l)?_c(l):l}return Tt(o)?s?_c(o):ns(o):o}}class Zf extends Kf{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];const a=Ze(e)&&wu(t);if(!this._isShallow){const c=Ii(r);if(!Vn(i)&&!Ii(i)&&(r=vt(r),i=vt(i)),!a&&hn(r)&&!hn(i))return c||(r.value=i),!0}const o=a?Number(t)<e.length:yt(e,t),l=Reflect.set(e,t,i,hn(e)?e:s);return e===vt(s)&&(o?es(i,r)&&wi(e,"set",t,i):wi(e,"add",t,i)),l}deleteProperty(e,t){const i=yt(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&wi(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!gi(t)||!Yf.has(t))&&ln(e,"has",t),i}ownKeys(e){return ln(e,"iterate",Ze(e)?"length":ws),Reflect.ownKeys(e)}}class tg extends Kf{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const ng=new Zf,ig=new tg,sg=new Zf(!0);const gc=n=>n,Sa=n=>Reflect.getPrototypeOf(n);function rg(n,e,t){return function(...i){const s=this.__v_raw,r=vt(s),a=lr(r),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,c=s[n](...i),u=t?gc:e?mr:Kn;return!e&&ln(r,"iterate",l?mc:ws),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:o?[u(f[0]),u(f[1])]:u(f),done:h}},[Symbol.iterator](){return this}}}}function ba(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function ag(n,e){const t={get(s){const r=this.__v_raw,a=vt(r),o=vt(s);n||(es(s,o)&&ln(a,"get",s),ln(a,"get",o));const{has:l}=Sa(a),c=e?gc:n?mr:Kn;if(l.call(a,s))return c(r.get(s));if(l.call(a,o))return c(r.get(o));r!==a&&r.get(s)},get size(){const s=this.__v_raw;return!n&&ln(vt(s),"iterate",ws),s.size},has(s){const r=this.__v_raw,a=vt(r),o=vt(s);return n||(es(s,o)&&ln(a,"has",s),ln(a,"has",o)),s===o?r.has(s):r.has(s)||r.has(o)},forEach(s,r){const a=this,o=a.__v_raw,l=vt(o),c=e?gc:n?mr:Kn;return!n&&ln(l,"iterate",ws),o.forEach((u,f)=>s.call(r,c(u),c(f),a))}};return Jt(t,n?{add:ba("add"),set:ba("set"),delete:ba("delete"),clear:ba("clear")}:{add(s){!e&&!Vn(s)&&!Ii(s)&&(s=vt(s));const r=vt(this);return Sa(r).has.call(r,s)||(r.add(s),wi(r,"add",s,s)),this},set(s,r){!e&&!Vn(r)&&!Ii(r)&&(r=vt(r));const a=vt(this),{has:o,get:l}=Sa(a);let c=o.call(a,s);c||(s=vt(s),c=o.call(a,s));const u=l.call(a,s);return a.set(s,r),c?es(r,u)&&wi(a,"set",s,r):wi(a,"add",s,r),this},delete(s){const r=vt(this),{has:a,get:o}=Sa(r);let l=a.call(r,s);l||(s=vt(s),l=a.call(r,s)),o&&o.call(r,s);const c=r.delete(s);return l&&wi(r,"delete",s,void 0),c},clear(){const s=vt(this),r=s.size!==0,a=s.clear();return r&&wi(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=rg(s,n,e)}),t}function Lu(n,e){const t=ag(n,e);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(yt(t,s)&&s in i?t:i,s,r)}const og={get:Lu(!1,!1)},lg={get:Lu(!1,!0)},cg={get:Lu(!0,!1)};const Jf=new WeakMap,jf=new WeakMap,Qf=new WeakMap,ug=new WeakMap;function hg(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function dg(n){return n.__v_skip||!Object.isExtensible(n)?0:hg(Fm(n))}function ns(n){return Ii(n)?n:Iu(n,!1,ng,og,Jf)}function fg(n){return Iu(n,!1,sg,lg,jf)}function _c(n){return Iu(n,!0,ig,cg,Qf)}function Iu(n,e,t,i,s){if(!Tt(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const r=dg(n);if(r===0)return n;const a=s.get(n);if(a)return a;const o=new Proxy(n,r===2?i:t);return s.set(n,o),o}function As(n){return Ii(n)?As(n.__v_raw):!!(n&&n.__v_isReactive)}function Ii(n){return!!(n&&n.__v_isReadonly)}function Vn(n){return!!(n&&n.__v_isShallow)}function Uu(n){return n?!!n.__v_raw:!1}function vt(n){const e=n&&n.__v_raw;return e?vt(e):n}function pg(n){return!yt(n,"__v_skip")&&Object.isExtensible(n)&&Ff(n,"__v_skip",!0),n}const Kn=n=>Tt(n)?ns(n):n,mr=n=>Tt(n)?_c(n):n;function hn(n){return n?n.__v_isRef===!0:!1}function Bt(n){return mg(n,!1)}function mg(n,e){return hn(n)?n:new gg(n,e)}class gg{constructor(e,t){this.dep=new Du,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:vt(e),this._value=t?e:Kn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||Vn(e)||Ii(e);e=i?e:vt(e),es(e,t)&&(this._rawValue=e,this._value=i?e:Kn(e),this.dep.trigger())}}function dt(n){return hn(n)?n.value:n}const _g={get:(n,e,t)=>e==="__v_raw"?n:dt(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return hn(s)&&!hn(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function ep(n){return As(n)?n:new Proxy(n,_g)}class vg{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Du(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ea-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Dt!==this)return Hf(this,!0),!0}get value(){const e=this.dep.track();return Xf(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function xg(n,e,t=!1){let i,s;return rt(n)?i=n:(i=n.get,s=n.set),new vg(i,s,t)}const Ea={},Po=new WeakMap;let vs;function yg(n,e=!1,t=vs){if(t){let i=Po.get(t);i||Po.set(t,i=[]),i.push(n)}}function Mg(n,e,t=Ct){const{immediate:i,deep:s,once:r,scheduler:a,augmentJob:o,call:l}=t,c=M=>s?M:Vn(M)||s===!1||s===0?Ai(M,1):Ai(M);let u,f,h,p,g=!1,_=!1;if(hn(n)?(f=()=>n.value,g=Vn(n)):As(n)?(f=()=>c(n),g=!0):Ze(n)?(_=!0,g=n.some(M=>As(M)||Vn(M)),f=()=>n.map(M=>{if(hn(M))return M.value;if(As(M))return c(M);if(rt(M))return l?l(M,2):M()})):rt(n)?e?f=l?()=>l(n,2):n:f=()=>{if(h){Di();try{h()}finally{Li()}}const M=vs;vs=u;try{return l?l(n,3,[p]):n(p)}finally{vs=M}}:f=fi,e&&s){const M=f,S=s===!0?1/0:s;f=()=>Ai(M(),S)}const d=Ym(),m=()=>{u.stop(),d&&d.active&&Tu(d.effects,u)};if(r&&e){const M=e;e=(...S)=>{M(...S),m()}}let T=_?new Array(n.length).fill(Ea):Ea;const R=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(e){const S=u.run();if(s||g||(_?S.some((b,D)=>es(b,T[D])):es(S,T))){h&&h();const b=vs;vs=u;try{const D=[S,T===Ea?void 0:_&&T[0]===Ea?[]:T,p];T=S,l?l(e,3,D):e(...D)}finally{vs=b}}}else u.run()};return o&&o(R),u=new zf(f),u.scheduler=a?()=>a(R,!1):R,p=M=>yg(M,!1,u),h=u.onStop=()=>{const M=Po.get(u);if(M){if(l)l(M,4);else for(const S of M)S();Po.delete(u)}},e?i?R(!0):T=u.run():a?a(R.bind(null,!0),!0):u.run(),m.pause=u.pause.bind(u),m.resume=u.resume.bind(u),m.stop=m,m}function Ai(n,e=1/0,t){if(e<=0||!Tt(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,hn(n))Ai(n.value,e,t);else if(Ze(n))for(let i=0;i<n.length;i++)Ai(n[i],e,t);else if(br(n)||lr(n))n.forEach(i=>{Ai(i,e,t)});else if(Nf(n)){for(const i in n)Ai(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&Ai(n[i],e,t)}return n}function fa(n,e,t,i){try{return i?n(...i):n()}catch(s){il(s,e,t)}}function Zn(n,e,t,i){if(rt(n)){const s=fa(n,e,t,i);return s&&If(s)&&s.catch(r=>{il(r,e,t)}),s}if(Ze(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Zn(n[r],e,t,i));return s}}function il(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||Ct;if(e){let o=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;o;){const u=o.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}o=o.parent}if(r){Di(),fa(r,null,10,[n,l,c]),Li();return}}Sg(n,t,s,i,a)}function Sg(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const _n=[];let ri=-1;const cr=[];let Yi=null,tr=0;const tp=Promise.resolve();let Do=null;function np(n){const e=Do||tp;return n?e.then(this?n.bind(this):n):e}function bg(n){let e=ri+1,t=_n.length;for(;e<t;){const i=e+t>>>1,s=_n[i],r=na(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function Nu(n){if(!(n.flags&1)){const e=na(n),t=_n[_n.length-1];!t||!(n.flags&2)&&e>=na(t)?_n.push(n):_n.splice(bg(e),0,n),n.flags|=1,ip()}}function ip(){Do||(Do=tp.then(rp))}function Eg(n){Ze(n)?cr.push(...n):Yi&&n.id===-1?Yi.splice(tr+1,0,n):n.flags&1||(cr.push(n),n.flags|=1),ip()}function Dh(n,e,t=ri+1){for(;t<_n.length;t++){const i=_n[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;_n.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function sp(n){if(cr.length){const e=[...new Set(cr)].sort((t,i)=>na(t)-na(i));if(cr.length=0,Yi){Yi.push(...e);return}for(Yi=e,tr=0;tr<Yi.length;tr++){const t=Yi[tr];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Yi=null,tr=0}}const na=n=>n.id==null?n.flags&2?-1:1/0:n.id;function rp(n){try{for(ri=0;ri<_n.length;ri++){const e=_n[ri];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),fa(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;ri<_n.length;ri++){const e=_n[ri];e&&(e.flags&=-2)}ri=-1,_n.length=0,sp(),Do=null,(_n.length||cr.length)&&rp()}}let In=null,ap=null;function Lo(n){const e=In;return In=n,ap=n&&n.type.__scopeId||null,e}function Fu(n,e=In,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&No(-1);const r=Lo(e);let a;try{a=n(...s)}finally{Lo(r),i._d&&No(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function Qt(n,e){if(In===null)return n;const t=cl(In),i=n.dirs||(n.dirs=[]);for(let s=0;s<e.length;s++){let[r,a,o,l=Ct]=e[s];r&&(rt(r)&&(r={mounted:r,updated:r}),r.deep&&Ai(a),i.push({dir:r,instance:t,value:a,oldValue:void 0,arg:o,modifiers:l}))}return n}function hs(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let a=0;a<s.length;a++){const o=s[a];r&&(o.oldValue=r[a].value);let l=o.dir[i];l&&(Di(),Zn(l,t,8,[n.el,o,n,e]),Li())}}const op=Symbol("_vte"),lp=n=>n.__isTeleport,Yr=n=>n&&(n.disabled||n.disabled===""),Lh=n=>n&&(n.defer||n.defer===""),Ih=n=>typeof SVGElement<"u"&&n instanceof SVGElement,Uh=n=>typeof MathMLElement=="function"&&n instanceof MathMLElement,vc=(n,e)=>{const t=n&&n.to;return Vt(t)?e?e(t):null:t},cp={name:"Teleport",__isTeleport:!0,process(n,e,t,i,s,r,a,o,l,c){const{mc:u,pc:f,pbc:h,o:{insert:p,querySelector:g,createText:_,createComment:d}}=c,m=Yr(e.props);let{shapeFlag:T,children:R,dynamicChildren:M}=e;if(n==null){const S=e.el=_(""),b=e.anchor=_("");p(S,t,i),p(b,t,i);const D=(w,F)=>{T&16&&u(R,w,F,s,r,a,o,l)},y=()=>{const w=e.target=vc(e.props,g),F=up(w,e,_,p);w&&(a!=="svg"&&Ih(w)?a="svg":a!=="mathml"&&Uh(w)&&(a="mathml"),s&&s.isCE&&(s.ce._teleportTargets||(s.ce._teleportTargets=new Set)).add(w),m||(D(w,F),fo(e,!1)))};m&&(D(t,b),fo(e,!0)),Lh(e.props)?(e.el.__isMounted=!1,gn(()=>{y(),delete e.el.__isMounted},r)):y()}else{if(Lh(e.props)&&n.el.__isMounted===!1){gn(()=>{cp.process(n,e,t,i,s,r,a,o,l,c)},r);return}e.el=n.el,e.targetStart=n.targetStart;const S=e.anchor=n.anchor,b=e.target=n.target,D=e.targetAnchor=n.targetAnchor,y=Yr(n.props),w=y?t:b,F=y?S:D;if(a==="svg"||Ih(b)?a="svg":(a==="mathml"||Uh(b))&&(a="mathml"),M?(h(n.dynamicChildren,M,w,s,r,a,o),zu(n,e,!0)):l||f(n,e,w,F,s,r,a,o,!1),m)y?e.props&&n.props&&e.props.to!==n.props.to&&(e.props.to=n.props.to):Ta(e,t,S,c,1);else if((e.props&&e.props.to)!==(n.props&&n.props.to)){const C=e.target=vc(e.props,g);C&&Ta(e,C,null,c,0)}else y&&Ta(e,b,D,c,1);fo(e,m)}},remove(n,e,t,{um:i,o:{remove:s}},r){const{shapeFlag:a,children:o,anchor:l,targetStart:c,targetAnchor:u,target:f,props:h}=n;if(f&&(s(c),s(u)),r&&s(l),a&16){const p=r||!Yr(h);for(let g=0;g<o.length;g++){const _=o[g];i(_,e,t,p,!!_.dynamicChildren)}}},move:Ta,hydrate:Tg};function Ta(n,e,t,{o:{insert:i},m:s},r=2){r===0&&i(n.targetAnchor,e,t);const{el:a,anchor:o,shapeFlag:l,children:c,props:u}=n,f=r===2;if(f&&i(a,e,t),(!f||Yr(u))&&l&16)for(let h=0;h<c.length;h++)s(c[h],e,t,2);f&&i(o,e,t)}function Tg(n,e,t,i,s,r,{o:{nextSibling:a,parentNode:o,querySelector:l,insert:c,createText:u}},f){function h(_,d,m,T){d.anchor=f(a(_),d,o(_),t,i,s,r),d.targetStart=m,d.targetAnchor=T}const p=e.target=vc(e.props,l),g=Yr(e.props);if(p){const _=p._lpa||p.firstChild;if(e.shapeFlag&16)if(g)h(n,e,_,_&&a(_));else{e.anchor=a(n);let d=_;for(;d;){if(d&&d.nodeType===8){if(d.data==="teleport start anchor")e.targetStart=d;else if(d.data==="teleport anchor"){e.targetAnchor=d,p._lpa=e.targetAnchor&&a(e.targetAnchor);break}}d=a(d)}e.targetAnchor||up(p,e,u,c),f(_&&a(_),e,p,t,i,s,r)}fo(e,g)}else g&&e.shapeFlag&16&&h(n,e,n,a(n));return e.anchor&&a(e.anchor)}const wg=cp;function fo(n,e){const t=n.ctx;if(t&&t.ut){let i,s;for(e?(i=n.el,s=n.anchor):(i=n.targetStart,s=n.targetAnchor);i&&i!==s;)i.nodeType===1&&i.setAttribute("data-v-owner",t.uid),i=i.nextSibling;t.ut()}}function up(n,e,t,i){const s=e.targetStart=t(""),r=e.targetAnchor=t("");return s[op]=r,n&&(i(s,n),i(r,n)),r}const Ti=Symbol("_leaveCb"),wa=Symbol("_enterCb");function hp(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return pa(()=>{n.isMounted=!0}),xp(()=>{n.isUnmounting=!0}),n}const Fn=[Function,Array],dp={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Fn,onEnter:Fn,onAfterEnter:Fn,onEnterCancelled:Fn,onBeforeLeave:Fn,onLeave:Fn,onAfterLeave:Fn,onLeaveCancelled:Fn,onBeforeAppear:Fn,onAppear:Fn,onAfterAppear:Fn,onAppearCancelled:Fn},fp=n=>{const e=n.subTree;return e.component?fp(e.component):e},Ag={name:"BaseTransition",props:dp,setup(n,{slots:e}){const t=Hu(),i=hp();return()=>{const s=e.default&&Ou(e.default(),!0);if(!s||!s.length)return;const r=pp(s),a=vt(n),{mode:o}=a;if(i.isLeaving)return Sl(r);const l=Nh(r);if(!l)return Sl(r);let c=ia(l,a,i,t,f=>c=f);l.type!==vn&&Ps(l,c);let u=t.subTree&&Nh(t.subTree);if(u&&u.type!==vn&&!xs(u,l)&&fp(t).type!==vn){let f=ia(u,a,i,t);if(Ps(u,f),o==="out-in"&&l.type!==vn)return i.isLeaving=!0,f.afterLeave=()=>{i.isLeaving=!1,t.job.flags&8||t.update(),delete f.afterLeave,u=void 0},Sl(r);o==="in-out"&&l.type!==vn?f.delayLeave=(h,p,g)=>{const _=mp(i,u);_[String(u.key)]=u,h[Ti]=()=>{p(),h[Ti]=void 0,delete c.delayedLeave,u=void 0},c.delayedLeave=()=>{g(),delete c.delayedLeave,u=void 0}}:u=void 0}else u&&(u=void 0);return r}}};function pp(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==vn){e=t;break}}return e}const Cg=Ag;function mp(n,e){const{leavingVNodes:t}=n;let i=t.get(e.type);return i||(i=Object.create(null),t.set(e.type,i)),i}function ia(n,e,t,i,s){const{appear:r,mode:a,persisted:o=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:h,onLeave:p,onAfterLeave:g,onLeaveCancelled:_,onBeforeAppear:d,onAppear:m,onAfterAppear:T,onAppearCancelled:R}=e,M=String(n.key),S=mp(t,n),b=(w,F)=>{w&&Zn(w,i,9,F)},D=(w,F)=>{const C=F[1];b(w,F),Ze(w)?w.every(L=>L.length<=1)&&C():w.length<=1&&C()},y={mode:a,persisted:o,beforeEnter(w){let F=l;if(!t.isMounted)if(r)F=d||l;else return;w[Ti]&&w[Ti](!0);const C=S[M];C&&xs(n,C)&&C.el[Ti]&&C.el[Ti](),b(F,[w])},enter(w){let F=c,C=u,L=f;if(!t.isMounted)if(r)F=m||c,C=T||u,L=R||f;else return;let X=!1;const q=w[wa]=H=>{X||(X=!0,H?b(L,[w]):b(C,[w]),y.delayedLeave&&y.delayedLeave(),w[wa]=void 0)};F?D(F,[w,q]):q()},leave(w,F){const C=String(n.key);if(w[wa]&&w[wa](!0),t.isUnmounting)return F();b(h,[w]);let L=!1;const X=w[Ti]=q=>{L||(L=!0,F(),q?b(_,[w]):b(g,[w]),w[Ti]=void 0,S[C]===n&&delete S[C])};S[C]=n,p?D(p,[w,X]):X()},clone(w){const F=ia(w,e,t,i,s);return s&&s(F),F}};return y}function Sl(n){if(sl(n))return n=is(n),n.children=null,n}function Nh(n){if(!sl(n))return lp(n.type)&&n.children?pp(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&rt(t.default))return t.default()}}function Ps(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Ps(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Ou(n,e=!1,t){let i=[],s=0;for(let r=0;r<n.length;r++){let a=n[r];const o=t==null?a.key:String(t)+String(a.key!=null?a.key:r);a.type===He?(a.patchFlag&128&&s++,i=i.concat(Ou(a.children,e,o))):(e||a.type!==vn)&&i.push(o!=null?is(a,{key:o}):a)}if(s>1)for(let r=0;r<i.length;r++)i[r].patchFlag=-2;return i}function gp(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}const Io=new WeakMap;function Kr(n,e,t,i,s=!1){if(Ze(n)){n.forEach((g,_)=>Kr(g,e&&(Ze(e)?e[_]:e),t,i,s));return}if(Zr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Kr(n,e,t,i.component.subTree);return}const r=i.shapeFlag&4?cl(i.component):i.el,a=s?null:r,{i:o,r:l}=n,c=e&&e.r,u=o.refs===Ct?o.refs={}:o.refs,f=o.setupState,h=vt(f),p=f===Ct?Lf:g=>yt(h,g);if(c!=null&&c!==l){if(Fh(e),Vt(c))u[c]=null,p(c)&&(f[c]=null);else if(hn(c)){c.value=null;const g=e;g.k&&(u[g.k]=null)}}if(rt(l))fa(l,o,12,[a,u]);else{const g=Vt(l),_=hn(l);if(g||_){const d=()=>{if(n.f){const m=g?p(l)?f[l]:u[l]:l.value;if(s)Ze(m)&&Tu(m,r);else if(Ze(m))m.includes(r)||m.push(r);else if(g)u[l]=[r],p(l)&&(f[l]=u[l]);else{const T=[r];l.value=T,n.k&&(u[n.k]=T)}}else g?(u[l]=a,p(l)&&(f[l]=a)):_&&(l.value=a,n.k&&(u[n.k]=a))};if(a){const m=()=>{d(),Io.delete(n)};m.id=-1,Io.set(n,m),gn(m,t)}else Fh(n),d()}}}function Fh(n){const e=Io.get(n);e&&(e.flags|=8,Io.delete(n))}tl().requestIdleCallback;tl().cancelIdleCallback;const Zr=n=>!!n.type.__asyncLoader,sl=n=>n.type.__isKeepAlive;function Rg(n,e){_p(n,"a",e)}function Pg(n,e){_p(n,"da",e)}function _p(n,e,t=cn){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(rl(e,i,t),t){let s=t.parent;for(;s&&s.parent;)sl(s.parent.vnode)&&Dg(i,e,t,s),s=s.parent}}function Dg(n,e,t,i){const s=rl(e,n,i,!0);al(()=>{Tu(i[e],s)},t)}function rl(n,e,t=cn,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...a)=>{Di();const o=ma(t),l=Zn(e,t,n,a);return o(),Li(),l});return i?s.unshift(r):s.push(r),r}}const Ni=n=>(e,t=cn)=>{(!ra||n==="sp")&&rl(n,(...i)=>e(...i),t)},Lg=Ni("bm"),pa=Ni("m"),Ig=Ni("bu"),vp=Ni("u"),xp=Ni("bum"),al=Ni("um"),Ug=Ni("sp"),Ng=Ni("rtg"),Fg=Ni("rtc");function Og(n,e=cn){rl("ec",n,e)}const kg="components";function xc(n,e){return zg(kg,n,!0,e)||n}const Bg=Symbol.for("v-ndc");function zg(n,e,t=!0,i=!1){const s=In||cn;if(s){const r=s.type;{const o=C_(r,!1);if(o&&(o===e||o===Hn(e)||o===Qo(Hn(e))))return r}const a=Oh(s[n]||r[n],e)||Oh(s.appContext[n],e);return!a&&i?r:a}}function Oh(n,e){return n&&(n[e]||n[Hn(e)]||n[Qo(Hn(e))])}function ht(n,e,t,i){let s;const r=t,a=Ze(n);if(a||Vt(n)){const o=a&&As(n);let l=!1,c=!1;o&&(l=!Vn(n),c=Ii(n),n=nl(n)),s=new Array(n.length);for(let u=0,f=n.length;u<f;u++)s[u]=e(l?c?mr(Kn(n[u])):Kn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let o=0;o<n;o++)s[o]=e(o+1,o,void 0,r)}else if(Tt(n))if(n[Symbol.iterator])s=Array.from(n,(o,l)=>e(o,l,void 0,r));else{const o=Object.keys(n);s=new Array(o.length);for(let l=0,c=o.length;l<c;l++){const u=o[l];s[l]=e(n[u],u,l,r)}}else s=[];return s}const yc=n=>n?kp(n)?cl(n):yc(n.parent):null,Jr=Jt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>yc(n.parent),$root:n=>yc(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Mp(n),$forceUpdate:n=>n.f||(n.f=()=>{Nu(n.update)}),$nextTick:n=>n.n||(n.n=np.bind(n.proxy)),$watch:n=>jg.bind(n)}),bl=(n,e)=>n!==Ct&&!n.__isScriptSetup&&yt(n,e),Vg={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:a,type:o,appContext:l}=n;if(e[0]!=="$"){const h=a[e];if(h!==void 0)switch(h){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(bl(i,e))return a[e]=1,i[e];if(s!==Ct&&yt(s,e))return a[e]=2,s[e];if(yt(r,e))return a[e]=3,r[e];if(t!==Ct&&yt(t,e))return a[e]=4,t[e];Mc&&(a[e]=0)}}const c=Jr[e];let u,f;if(c)return e==="$attrs"&&ln(n.attrs,"get",""),c(n);if((u=o.__cssModules)&&(u=u[e]))return u;if(t!==Ct&&yt(t,e))return a[e]=4,t[e];if(f=l.config.globalProperties,yt(f,e))return f[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return bl(s,e)?(s[e]=t,!0):i!==Ct&&yt(i,e)?(i[e]=t,!0):yt(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,props:r,type:a}},o){let l;return!!(t[o]||n!==Ct&&o[0]!=="$"&&yt(n,o)||bl(e,o)||yt(r,o)||yt(i,o)||yt(Jr,o)||yt(s.config.globalProperties,o)||(l=a.__cssModules)&&l[o])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:yt(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function kh(n){return Ze(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Mc=!0;function Hg(n){const e=Mp(n),t=n.proxy,i=n.ctx;Mc=!1,e.beforeCreate&&Bh(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:p,updated:g,activated:_,deactivated:d,beforeDestroy:m,beforeUnmount:T,destroyed:R,unmounted:M,render:S,renderTracked:b,renderTriggered:D,errorCaptured:y,serverPrefetch:w,expose:F,inheritAttrs:C,components:L,directives:X,filters:q}=e;if(c&&Gg(c,i,null),a)for(const V in a){const Z=a[V];rt(Z)&&(i[V]=Z.bind(t))}if(s){const V=s.call(t,t);Tt(V)&&(n.data=ns(V))}if(Mc=!0,r)for(const V in r){const Z=r[V],ne=rt(Z)?Z.bind(t,t):rt(Z.get)?Z.get.bind(t,t):fi,pe=!rt(Z)&&rt(Z.set)?Z.set.bind(t):fi,Me=lt({get:ne,set:pe});Object.defineProperty(i,V,{enumerable:!0,configurable:!0,get:()=>Me.value,set:Ee=>Me.value=Ee})}if(o)for(const V in o)yp(o[V],i,t,V);if(l){const V=rt(l)?l.call(t):l;Reflect.ownKeys(V).forEach(Z=>{Kg(Z,V[Z])})}u&&Bh(u,n,"c");function K(V,Z){Ze(Z)?Z.forEach(ne=>V(ne.bind(t))):Z&&V(Z.bind(t))}if(K(Lg,f),K(pa,h),K(Ig,p),K(vp,g),K(Rg,_),K(Pg,d),K(Og,y),K(Fg,b),K(Ng,D),K(xp,T),K(al,M),K(Ug,w),Ze(F))if(F.length){const V=n.exposed||(n.exposed={});F.forEach(Z=>{Object.defineProperty(V,Z,{get:()=>t[Z],set:ne=>t[Z]=ne,enumerable:!0})})}else n.exposed||(n.exposed={});S&&n.render===fi&&(n.render=S),C!=null&&(n.inheritAttrs=C),L&&(n.components=L),X&&(n.directives=X),w&&gp(n)}function Gg(n,e,t=fi){Ze(n)&&(n=Sc(n));for(const i in n){const s=n[i];let r;Tt(s)?"default"in s?r=po(s.from||i,s.default,!0):r=po(s.from||i):r=po(s),hn(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:a=>r.value=a}):e[i]=r}}function Bh(n,e,t){Zn(Ze(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function yp(n,e,t,i){let s=i.includes(".")?Ep(t,i):()=>t[i];if(Vt(n)){const r=e[n];rt(r)&&Cs(s,r)}else if(rt(n))Cs(s,n.bind(t));else if(Tt(n))if(Ze(n))n.forEach(r=>yp(r,e,t,i));else{const r=rt(n.handler)?n.handler.bind(t):e[n.handler];rt(r)&&Cs(s,r,n)}}function Mp(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:a}}=n.appContext,o=r.get(e);let l;return o?l=o:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>Uo(l,c,a,!0)),Uo(l,e,a)),Tt(e)&&r.set(e,l),l}function Uo(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&Uo(n,r,t,!0),s&&s.forEach(a=>Uo(n,a,t,!0));for(const a in e)if(!(i&&a==="expose")){const o=Wg[a]||t&&t[a];n[a]=o?o(n[a],e[a]):e[a]}return n}const Wg={data:zh,props:Vh,emits:Vh,methods:Vr,computed:Vr,beforeCreate:pn,created:pn,beforeMount:pn,mounted:pn,beforeUpdate:pn,updated:pn,beforeDestroy:pn,beforeUnmount:pn,destroyed:pn,unmounted:pn,activated:pn,deactivated:pn,errorCaptured:pn,serverPrefetch:pn,components:Vr,directives:Vr,watch:$g,provide:zh,inject:Xg};function zh(n,e){return e?n?function(){return Jt(rt(n)?n.call(this,this):n,rt(e)?e.call(this,this):e)}:e:n}function Xg(n,e){return Vr(Sc(n),Sc(e))}function Sc(n){if(Ze(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function pn(n,e){return n?[...new Set([].concat(n,e))]:e}function Vr(n,e){return n?Jt(Object.create(null),n,e):e}function Vh(n,e){return n?Ze(n)&&Ze(e)?[...new Set([...n,...e])]:Jt(Object.create(null),kh(n),kh(e??{})):e}function $g(n,e){if(!n)return e;if(!e)return n;const t=Jt(Object.create(null),n);for(const i in e)t[i]=pn(n[i],e[i]);return t}function Sp(){return{app:null,config:{isNativeTag:Lf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let qg=0;function Yg(n,e){return function(i,s=null){rt(i)||(i=Jt({},i)),s!=null&&!Tt(s)&&(s=null);const r=Sp(),a=new WeakSet,o=[];let l=!1;const c=r.app={_uid:qg++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:D_,get config(){return r.config},set config(u){},use(u,...f){return a.has(u)||(u&&rt(u.install)?(a.add(u),u.install(c,...f)):rt(u)&&(a.add(u),u(c,...f))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,f){return f?(r.components[u]=f,c):r.components[u]},directive(u,f){return f?(r.directives[u]=f,c):r.directives[u]},mount(u,f,h){if(!l){const p=c._ceVNode||qt(i,s);return p.appContext=r,h===!0?h="svg":h===!1&&(h=void 0),n(p,u,h),l=!0,c._container=u,u.__vue_app__=c,cl(p.component)}},onUnmount(u){o.push(u)},unmount(){l&&(Zn(o,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return r.provides[u]=f,c},runWithContext(u){const f=ur;ur=c;try{return u()}finally{ur=f}}};return c}}let ur=null;function Kg(n,e){if(cn){let t=cn.provides;const i=cn.parent&&cn.parent.provides;i===t&&(t=cn.provides=Object.create(i)),t[n]=e}}function po(n,e,t=!1){const i=Hu();if(i||ur){let s=ur?ur._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&rt(e)?e.call(i&&i.proxy):e}}const Zg=Symbol.for("v-scx"),Jg=()=>po(Zg);function Cs(n,e,t){return bp(n,e,t)}function bp(n,e,t=Ct){const{immediate:i,deep:s,flush:r,once:a}=t,o=Jt({},t),l=e&&i||!e&&r!=="post";let c;if(ra){if(r==="sync"){const p=Jg();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=fi,p.resume=fi,p.pause=fi,p}}const u=cn;o.call=(p,g,_)=>Zn(p,u,g,_);let f=!1;r==="post"?o.scheduler=p=>{gn(p,u&&u.suspense)}:r!=="sync"&&(f=!0,o.scheduler=(p,g)=>{g?p():Nu(p)}),o.augmentJob=p=>{e&&(p.flags|=4),f&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const h=Mg(n,e,o);return ra&&(c?c.push(h):l&&h()),h}function jg(n,e,t){const i=this.proxy,s=Vt(n)?n.includes(".")?Ep(i,n):()=>i[n]:n.bind(i,i);let r;rt(e)?r=e:(r=e.handler,t=e);const a=ma(this),o=bp(s,r.bind(i),t);return a(),o}function Ep(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const Qg=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Hn(e)}Modifiers`]||n[`${Is(e)}Modifiers`];function e_(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||Ct;let s=t;const r=e.startsWith("update:"),a=r&&Qg(i,e.slice(7));a&&(a.trim&&(s=t.map(u=>Vt(u)?u.trim():u)),a.number&&(s=t.map(el)));let o,l=i[o=_l(e)]||i[o=_l(Hn(e))];!l&&r&&(l=i[o=_l(Is(e))]),l&&Zn(l,n,6,s);const c=i[o+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,Zn(c,n,6,s)}}const t_=new WeakMap;function Tp(n,e,t=!1){const i=t?t_:e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let a={},o=!1;if(!rt(n)){const l=c=>{const u=Tp(c,e,!0);u&&(o=!0,Jt(a,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!o?(Tt(n)&&i.set(n,null),null):(Ze(r)?r.forEach(l=>a[l]=null):Jt(a,r),Tt(n)&&i.set(n,a),a)}function ol(n,e){return!n||!Jo(e)?!1:(e=e.slice(2).replace(/Once$/,""),yt(n,e[0].toLowerCase()+e.slice(1))||yt(n,Is(e))||yt(n,e))}function Hh(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:f,data:h,setupState:p,ctx:g,inheritAttrs:_}=n,d=Lo(n);let m,T;try{if(t.shapeFlag&4){const M=s||i,S=M;m=oi(c.call(S,M,u,f,p,h,g)),T=o}else{const M=e;m=oi(M.length>1?M(f,{attrs:o,slots:a,emit:l}):M(f,null)),T=e.props?o:n_(o)}}catch(M){jr.length=0,il(M,n,1),m=qt(vn)}let R=m;if(T&&_!==!1){const M=Object.keys(T),{shapeFlag:S}=R;M.length&&S&7&&(r&&M.some(Eu)&&(T=i_(T,r)),R=is(R,T,!1,!0))}return t.dirs&&(R=is(R,null,!1,!0),R.dirs=R.dirs?R.dirs.concat(t.dirs):t.dirs),t.transition&&Ps(R,t.transition),m=R,Lo(d),m}const n_=n=>{let e;for(const t in n)(t==="class"||t==="style"||Jo(t))&&((e||(e={}))[t]=n[t]);return e},i_=(n,e)=>{const t={};for(const i in n)(!Eu(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function s_(n,e,t){const{props:i,children:s,component:r}=n,{props:a,children:o,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?Gh(i,a,c):!!a;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(a[h]!==i[h]&&!ol(c,h))return!0}}}else return(s||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?Gh(i,a,c):!0:!!a;return!1}function Gh(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(e[r]!==n[r]&&!ol(t,r))return!0}return!1}function r_({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const wp={},Ap=()=>Object.create(wp),Cp=n=>Object.getPrototypeOf(n)===wp;function a_(n,e,t,i=!1){const s={},r=Ap();n.propsDefaults=Object.create(null),Rp(n,e,s,r);for(const a in n.propsOptions[0])a in s||(s[a]=void 0);t?n.props=i?s:fg(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function o_(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:a}}=n,o=vt(s),[l]=n.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(ol(n.emitsOptions,h))continue;const p=e[h];if(l)if(yt(r,h))p!==r[h]&&(r[h]=p,c=!0);else{const g=Hn(h);s[g]=bc(l,o,g,p,n,!1)}else p!==r[h]&&(r[h]=p,c=!0)}}}else{Rp(n,e,s,r)&&(c=!0);let u;for(const f in o)(!e||!yt(e,f)&&((u=Is(f))===f||!yt(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(s[f]=bc(l,o,f,void 0,n,!0)):delete s[f]);if(r!==o)for(const f in r)(!e||!yt(e,f))&&(delete r[f],c=!0)}c&&wi(n.attrs,"set","")}function Rp(n,e,t,i){const[s,r]=n.propsOptions;let a=!1,o;if(e)for(let l in e){if(Xr(l))continue;const c=e[l];let u;s&&yt(s,u=Hn(l))?!r||!r.includes(u)?t[u]=c:(o||(o={}))[u]=c:ol(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(r){const l=vt(t),c=o||Ct;for(let u=0;u<r.length;u++){const f=r[u];t[f]=bc(s,l,f,c[f],n,!yt(c,f))}}return a}function bc(n,e,t,i,s,r){const a=n[t];if(a!=null){const o=yt(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&rt(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const u=ma(s);i=c[t]=l.call(null,e),u()}}else i=l;s.ce&&s.ce._setProp(t,i)}a[0]&&(r&&!o?i=!1:a[1]&&(i===""||i===Is(t))&&(i=!0))}return i}const l_=new WeakMap;function Pp(n,e,t=!1){const i=t?l_:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,a={},o=[];let l=!1;if(!rt(n)){const u=f=>{l=!0;const[h,p]=Pp(f,e,!0);Jt(a,h),p&&o.push(...p)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return Tt(n)&&i.set(n,or),or;if(Ze(r))for(let u=0;u<r.length;u++){const f=Hn(r[u]);Wh(f)&&(a[f]=Ct)}else if(r)for(const u in r){const f=Hn(u);if(Wh(f)){const h=r[u],p=a[f]=Ze(h)||rt(h)?{type:h}:Jt({},h),g=p.type;let _=!1,d=!0;if(Ze(g))for(let m=0;m<g.length;++m){const T=g[m],R=rt(T)&&T.name;if(R==="Boolean"){_=!0;break}else R==="String"&&(d=!1)}else _=rt(g)&&g.name==="Boolean";p[0]=_,p[1]=d,(_||yt(p,"default"))&&o.push(f)}}const c=[a,o];return Tt(n)&&i.set(n,c),c}function Wh(n){return n[0]!=="$"&&!Xr(n)}const ku=n=>n==="_"||n==="_ctx"||n==="$stable",Bu=n=>Ze(n)?n.map(oi):[oi(n)],c_=(n,e,t)=>{if(e._n)return e;const i=Fu((...s)=>Bu(e(...s)),t);return i._c=!1,i},Dp=(n,e,t)=>{const i=n._ctx;for(const s in n){if(ku(s))continue;const r=n[s];if(rt(r))e[s]=c_(s,r,i);else if(r!=null){const a=Bu(r);e[s]=()=>a}}},Lp=(n,e)=>{const t=Bu(e);n.slots.default=()=>t},Ip=(n,e,t)=>{for(const i in e)(t||!ku(i))&&(n[i]=e[i])},u_=(n,e,t)=>{const i=n.slots=Ap();if(n.vnode.shapeFlag&32){const s=e._;s?(Ip(i,e,t),t&&Ff(i,"_",s,!0)):Dp(e,i)}else e&&Lp(n,e)},h_=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,a=Ct;if(i.shapeFlag&32){const o=e._;o?t&&o===1?r=!1:Ip(s,e,t):(r=!e.$stable,Dp(e,s)),a=e}else e&&(Lp(n,e),a={default:1});if(r)for(const o in s)!ku(o)&&a[o]==null&&delete s[o]},gn=g_;function d_(n){return f_(n)}function f_(n,e){const t=tl();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:p=fi,insertStaticContent:g}=n,_=(U,k,Q,oe=null,ie=null,ue=null,Se=void 0,_e=null,me=!!k.dynamicChildren)=>{if(U===k)return;U&&!xs(U,k)&&(oe=ve(U),Ee(U,ie,ue,!0),U=null),k.patchFlag===-2&&(me=!1,k.dynamicChildren=null);const{type:le,ref:Fe,shapeFlag:I}=k;switch(le){case ll:d(U,k,Q,oe);break;case vn:m(U,k,Q,oe);break;case mo:U==null&&T(k,Q,oe,Se);break;case He:L(U,k,Q,oe,ie,ue,Se,_e,me);break;default:I&1?S(U,k,Q,oe,ie,ue,Se,_e,me):I&6?X(U,k,Q,oe,ie,ue,Se,_e,me):(I&64||I&128)&&le.process(U,k,Q,oe,ie,ue,Se,_e,me,tt)}Fe!=null&&ie?Kr(Fe,U&&U.ref,ue,k||U,!k):Fe==null&&U&&U.ref!=null&&Kr(U.ref,null,ue,U,!0)},d=(U,k,Q,oe)=>{if(U==null)i(k.el=o(k.children),Q,oe);else{const ie=k.el=U.el;k.children!==U.children&&c(ie,k.children)}},m=(U,k,Q,oe)=>{U==null?i(k.el=l(k.children||""),Q,oe):k.el=U.el},T=(U,k,Q,oe)=>{[U.el,U.anchor]=g(U.children,k,Q,oe,U.el,U.anchor)},R=({el:U,anchor:k},Q,oe)=>{let ie;for(;U&&U!==k;)ie=h(U),i(U,Q,oe),U=ie;i(k,Q,oe)},M=({el:U,anchor:k})=>{let Q;for(;U&&U!==k;)Q=h(U),s(U),U=Q;s(k)},S=(U,k,Q,oe,ie,ue,Se,_e,me)=>{if(k.type==="svg"?Se="svg":k.type==="math"&&(Se="mathml"),U==null)b(k,Q,oe,ie,ue,Se,_e,me);else{const le=U.el&&U.el._isVueCE?U.el:null;try{le&&le._beginPatch(),w(U,k,ie,ue,Se,_e,me)}finally{le&&le._endPatch()}}},b=(U,k,Q,oe,ie,ue,Se,_e)=>{let me,le;const{props:Fe,shapeFlag:I,transition:Be,dirs:Pe}=U;if(me=U.el=a(U.type,ue,Fe&&Fe.is,Fe),I&8?u(me,U.children):I&16&&y(U.children,me,null,oe,ie,El(U,ue),Se,_e),Pe&&hs(U,null,oe,"created"),D(me,U,U.scopeId,Se,oe),Fe){for(const x in Fe)x!=="value"&&!Xr(x)&&r(me,x,null,Fe[x],ue,oe);"value"in Fe&&r(me,"value",null,Fe.value,ue),(le=Fe.onVnodeBeforeMount)&&ti(le,oe,U)}Pe&&hs(U,null,oe,"beforeMount");const A=p_(ie,Be);A&&Be.beforeEnter(me),i(me,k,Q),((le=Fe&&Fe.onVnodeMounted)||A||Pe)&&gn(()=>{le&&ti(le,oe,U),A&&Be.enter(me),Pe&&hs(U,null,oe,"mounted")},ie)},D=(U,k,Q,oe,ie)=>{if(Q&&p(U,Q),oe)for(let ue=0;ue<oe.length;ue++)p(U,oe[ue]);if(ie){let ue=ie.subTree;if(k===ue||Np(ue.type)&&(ue.ssContent===k||ue.ssFallback===k)){const Se=ie.vnode;D(U,Se,Se.scopeId,Se.slotScopeIds,ie.parent)}}},y=(U,k,Q,oe,ie,ue,Se,_e,me=0)=>{for(let le=me;le<U.length;le++){const Fe=U[le]=_e?Ki(U[le]):oi(U[le]);_(null,Fe,k,Q,oe,ie,ue,Se,_e)}},w=(U,k,Q,oe,ie,ue,Se)=>{const _e=k.el=U.el;let{patchFlag:me,dynamicChildren:le,dirs:Fe}=k;me|=U.patchFlag&16;const I=U.props||Ct,Be=k.props||Ct;let Pe;if(Q&&ds(Q,!1),(Pe=Be.onVnodeBeforeUpdate)&&ti(Pe,Q,k,U),Fe&&hs(k,U,Q,"beforeUpdate"),Q&&ds(Q,!0),(I.innerHTML&&Be.innerHTML==null||I.textContent&&Be.textContent==null)&&u(_e,""),le?F(U.dynamicChildren,le,_e,Q,oe,El(k,ie),ue):Se||Z(U,k,_e,null,Q,oe,El(k,ie),ue,!1),me>0){if(me&16)C(_e,I,Be,Q,ie);else if(me&2&&I.class!==Be.class&&r(_e,"class",null,Be.class,ie),me&4&&r(_e,"style",I.style,Be.style,ie),me&8){const A=k.dynamicProps;for(let x=0;x<A.length;x++){const z=A[x],Y=I[z],te=Be[z];(te!==Y||z==="value")&&r(_e,z,Y,te,ie,Q)}}me&1&&U.children!==k.children&&u(_e,k.children)}else!Se&&le==null&&C(_e,I,Be,Q,ie);((Pe=Be.onVnodeUpdated)||Fe)&&gn(()=>{Pe&&ti(Pe,Q,k,U),Fe&&hs(k,U,Q,"updated")},oe)},F=(U,k,Q,oe,ie,ue,Se)=>{for(let _e=0;_e<k.length;_e++){const me=U[_e],le=k[_e],Fe=me.el&&(me.type===He||!xs(me,le)||me.shapeFlag&198)?f(me.el):Q;_(me,le,Fe,null,oe,ie,ue,Se,!0)}},C=(U,k,Q,oe,ie)=>{if(k!==Q){if(k!==Ct)for(const ue in k)!Xr(ue)&&!(ue in Q)&&r(U,ue,k[ue],null,ie,oe);for(const ue in Q){if(Xr(ue))continue;const Se=Q[ue],_e=k[ue];Se!==_e&&ue!=="value"&&r(U,ue,_e,Se,ie,oe)}"value"in Q&&r(U,"value",k.value,Q.value,ie)}},L=(U,k,Q,oe,ie,ue,Se,_e,me)=>{const le=k.el=U?U.el:o(""),Fe=k.anchor=U?U.anchor:o("");let{patchFlag:I,dynamicChildren:Be,slotScopeIds:Pe}=k;Pe&&(_e=_e?_e.concat(Pe):Pe),U==null?(i(le,Q,oe),i(Fe,Q,oe),y(k.children||[],Q,Fe,ie,ue,Se,_e,me)):I>0&&I&64&&Be&&U.dynamicChildren?(F(U.dynamicChildren,Be,Q,ie,ue,Se,_e),(k.key!=null||ie&&k===ie.subTree)&&zu(U,k,!0)):Z(U,k,Q,Fe,ie,ue,Se,_e,me)},X=(U,k,Q,oe,ie,ue,Se,_e,me)=>{k.slotScopeIds=_e,U==null?k.shapeFlag&512?ie.ctx.activate(k,Q,oe,Se,me):q(k,Q,oe,ie,ue,Se,me):H(U,k,me)},q=(U,k,Q,oe,ie,ue,Se)=>{const _e=U.component=b_(U,oe,ie);if(sl(U)&&(_e.ctx.renderer=tt),E_(_e,!1,Se),_e.asyncDep){if(ie&&ie.registerDep(_e,K,Se),!U.el){const me=_e.subTree=qt(vn);m(null,me,k,Q),U.placeholder=me.el}}else K(_e,U,k,Q,ie,ue,Se)},H=(U,k,Q)=>{const oe=k.component=U.component;if(s_(U,k,Q))if(oe.asyncDep&&!oe.asyncResolved){V(oe,k,Q);return}else oe.next=k,oe.update();else k.el=U.el,oe.vnode=k},K=(U,k,Q,oe,ie,ue,Se)=>{const _e=()=>{if(U.isMounted){let{next:I,bu:Be,u:Pe,parent:A,vnode:x}=U;{const Te=Up(U);if(Te){I&&(I.el=x.el,V(U,I,Se)),Te.asyncDep.then(()=>{U.isUnmounted||_e()});return}}let z=I,Y;ds(U,!1),I?(I.el=x.el,V(U,I,Se)):I=x,Be&&ho(Be),(Y=I.props&&I.props.onVnodeBeforeUpdate)&&ti(Y,A,I,x),ds(U,!0);const te=Hh(U),xe=U.subTree;U.subTree=te,_(xe,te,f(xe.el),ve(xe),U,ie,ue),I.el=te.el,z===null&&r_(U,te.el),Pe&&gn(Pe,ie),(Y=I.props&&I.props.onVnodeUpdated)&&gn(()=>ti(Y,A,I,x),ie)}else{let I;const{el:Be,props:Pe}=k,{bm:A,m:x,parent:z,root:Y,type:te}=U,xe=Zr(k);ds(U,!1),A&&ho(A),!xe&&(I=Pe&&Pe.onVnodeBeforeMount)&&ti(I,z,k),ds(U,!0);{Y.ce&&Y.ce._def.shadowRoot!==!1&&Y.ce._injectChildStyle(te);const Te=U.subTree=Hh(U);_(null,Te,Q,oe,U,ie,ue),k.el=Te.el}if(x&&gn(x,ie),!xe&&(I=Pe&&Pe.onVnodeMounted)){const Te=k;gn(()=>ti(I,z,Te),ie)}(k.shapeFlag&256||z&&Zr(z.vnode)&&z.vnode.shapeFlag&256)&&U.a&&gn(U.a,ie),U.isMounted=!0,k=Q=oe=null}};U.scope.on();const me=U.effect=new zf(_e);U.scope.off();const le=U.update=me.run.bind(me),Fe=U.job=me.runIfDirty.bind(me);Fe.i=U,Fe.id=U.uid,me.scheduler=()=>Nu(Fe),ds(U,!0),le()},V=(U,k,Q)=>{k.component=U;const oe=U.vnode.props;U.vnode=k,U.next=null,o_(U,k.props,oe,Q),h_(U,k.children,Q),Di(),Dh(U),Li()},Z=(U,k,Q,oe,ie,ue,Se,_e,me=!1)=>{const le=U&&U.children,Fe=U?U.shapeFlag:0,I=k.children,{patchFlag:Be,shapeFlag:Pe}=k;if(Be>0){if(Be&128){pe(le,I,Q,oe,ie,ue,Se,_e,me);return}else if(Be&256){ne(le,I,Q,oe,ie,ue,Se,_e,me);return}}Pe&8?(Fe&16&&G(le,ie,ue),I!==le&&u(Q,I)):Fe&16?Pe&16?pe(le,I,Q,oe,ie,ue,Se,_e,me):G(le,ie,ue,!0):(Fe&8&&u(Q,""),Pe&16&&y(I,Q,oe,ie,ue,Se,_e,me))},ne=(U,k,Q,oe,ie,ue,Se,_e,me)=>{U=U||or,k=k||or;const le=U.length,Fe=k.length,I=Math.min(le,Fe);let Be;for(Be=0;Be<I;Be++){const Pe=k[Be]=me?Ki(k[Be]):oi(k[Be]);_(U[Be],Pe,Q,null,ie,ue,Se,_e,me)}le>Fe?G(U,ie,ue,!0,!1,I):y(k,Q,oe,ie,ue,Se,_e,me,I)},pe=(U,k,Q,oe,ie,ue,Se,_e,me)=>{let le=0;const Fe=k.length;let I=U.length-1,Be=Fe-1;for(;le<=I&&le<=Be;){const Pe=U[le],A=k[le]=me?Ki(k[le]):oi(k[le]);if(xs(Pe,A))_(Pe,A,Q,null,ie,ue,Se,_e,me);else break;le++}for(;le<=I&&le<=Be;){const Pe=U[I],A=k[Be]=me?Ki(k[Be]):oi(k[Be]);if(xs(Pe,A))_(Pe,A,Q,null,ie,ue,Se,_e,me);else break;I--,Be--}if(le>I){if(le<=Be){const Pe=Be+1,A=Pe<Fe?k[Pe].el:oe;for(;le<=Be;)_(null,k[le]=me?Ki(k[le]):oi(k[le]),Q,A,ie,ue,Se,_e,me),le++}}else if(le>Be)for(;le<=I;)Ee(U[le],ie,ue,!0),le++;else{const Pe=le,A=le,x=new Map;for(le=A;le<=Be;le++){const be=k[le]=me?Ki(k[le]):oi(k[le]);be.key!=null&&x.set(be.key,le)}let z,Y=0;const te=Be-A+1;let xe=!1,Te=0;const se=new Array(te);for(le=0;le<te;le++)se[le]=0;for(le=Pe;le<=I;le++){const be=U[le];if(Y>=te){Ee(be,ie,ue,!0);continue}let ke;if(be.key!=null)ke=x.get(be.key);else for(z=A;z<=Be;z++)if(se[z-A]===0&&xs(be,k[z])){ke=z;break}ke===void 0?Ee(be,ie,ue,!0):(se[ke-A]=le+1,ke>=Te?Te=ke:xe=!0,_(be,k[ke],Q,null,ie,ue,Se,_e,me),Y++)}const ce=xe?m_(se):or;for(z=ce.length-1,le=te-1;le>=0;le--){const be=A+le,ke=k[be],Ce=k[be+1],we=be+1<Fe?Ce.el||Ce.placeholder:oe;se[le]===0?_(null,ke,Q,we,ie,ue,Se,_e,me):xe&&(z<0||le!==ce[z]?Me(ke,Q,we,2):z--)}}},Me=(U,k,Q,oe,ie=null)=>{const{el:ue,type:Se,transition:_e,children:me,shapeFlag:le}=U;if(le&6){Me(U.component.subTree,k,Q,oe);return}if(le&128){U.suspense.move(k,Q,oe);return}if(le&64){Se.move(U,k,Q,tt);return}if(Se===He){i(ue,k,Q);for(let I=0;I<me.length;I++)Me(me[I],k,Q,oe);i(U.anchor,k,Q);return}if(Se===mo){R(U,k,Q);return}if(oe!==2&&le&1&&_e)if(oe===0)_e.beforeEnter(ue),i(ue,k,Q),gn(()=>_e.enter(ue),ie);else{const{leave:I,delayLeave:Be,afterLeave:Pe}=_e,A=()=>{U.ctx.isUnmounted?s(ue):i(ue,k,Q)},x=()=>{ue._isLeaving&&ue[Ti](!0),I(ue,()=>{A(),Pe&&Pe()})};Be?Be(ue,A,x):x()}else i(ue,k,Q)},Ee=(U,k,Q,oe=!1,ie=!1)=>{const{type:ue,props:Se,ref:_e,children:me,dynamicChildren:le,shapeFlag:Fe,patchFlag:I,dirs:Be,cacheIndex:Pe}=U;if(I===-2&&(ie=!1),_e!=null&&(Di(),Kr(_e,null,Q,U,!0),Li()),Pe!=null&&(k.renderCache[Pe]=void 0),Fe&256){k.ctx.deactivate(U);return}const A=Fe&1&&Be,x=!Zr(U);let z;if(x&&(z=Se&&Se.onVnodeBeforeUnmount)&&ti(z,k,U),Fe&6)re(U.component,Q,oe);else{if(Fe&128){U.suspense.unmount(Q,oe);return}A&&hs(U,null,k,"beforeUnmount"),Fe&64?U.type.remove(U,k,Q,tt,oe):le&&!le.hasOnce&&(ue!==He||I>0&&I&64)?G(le,k,Q,!1,!0):(ue===He&&I&384||!ie&&Fe&16)&&G(me,k,Q),oe&&it(U)}(x&&(z=Se&&Se.onVnodeUnmounted)||A)&&gn(()=>{z&&ti(z,k,U),A&&hs(U,null,k,"unmounted")},Q)},it=U=>{const{type:k,el:Q,anchor:oe,transition:ie}=U;if(k===He){ge(Q,oe);return}if(k===mo){M(U);return}const ue=()=>{s(Q),ie&&!ie.persisted&&ie.afterLeave&&ie.afterLeave()};if(U.shapeFlag&1&&ie&&!ie.persisted){const{leave:Se,delayLeave:_e}=ie,me=()=>Se(Q,ue);_e?_e(U.el,ue,me):me()}else ue()},ge=(U,k)=>{let Q;for(;U!==k;)Q=h(U),s(U),U=Q;s(k)},re=(U,k,Q)=>{const{bum:oe,scope:ie,job:ue,subTree:Se,um:_e,m:me,a:le}=U;Xh(me),Xh(le),oe&&ho(oe),ie.stop(),ue&&(ue.flags|=8,Ee(Se,U,k,Q)),_e&&gn(_e,k),gn(()=>{U.isUnmounted=!0},k)},G=(U,k,Q,oe=!1,ie=!1,ue=0)=>{for(let Se=ue;Se<U.length;Se++)Ee(U[Se],k,Q,oe,ie)},ve=U=>{if(U.shapeFlag&6)return ve(U.component.subTree);if(U.shapeFlag&128)return U.suspense.next();const k=h(U.anchor||U.el),Q=k&&k[op];return Q?h(Q):k};let ye=!1;const et=(U,k,Q)=>{U==null?k._vnode&&Ee(k._vnode,null,null,!0):_(k._vnode||null,U,k,null,null,null,Q),k._vnode=U,ye||(ye=!0,Dh(),sp(),ye=!1)},tt={p:_,um:Ee,m:Me,r:it,mt:q,mc:y,pc:Z,pbc:F,n:ve,o:n};return{render:et,hydrate:void 0,createApp:Yg(et)}}function El({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function ds({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function p_(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function zu(n,e,t=!1){const i=n.children,s=e.children;if(Ze(i)&&Ze(s))for(let r=0;r<i.length;r++){const a=i[r];let o=s[r];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=s[r]=Ki(s[r]),o.el=a.el),!t&&o.patchFlag!==-2&&zu(a,o)),o.type===ll&&o.patchFlag!==-1&&(o.el=a.el),o.type===vn&&!o.el&&(o.el=a.el)}}function m_(n){const e=n.slice(),t=[0];let i,s,r,a,o;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,a=t.length-1;r<a;)o=r+a>>1,n[t[o]]<c?r=o+1:a=o;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,a=t[r-1];r-- >0;)t[r]=a,a=e[a];return t}function Up(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Up(e)}function Xh(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const Np=n=>n.__isSuspense;function g_(n,e){e&&e.pendingBranch?Ze(n)?e.effects.push(...n):e.effects.push(n):Eg(n)}const He=Symbol.for("v-fgt"),ll=Symbol.for("v-txt"),vn=Symbol.for("v-cmt"),mo=Symbol.for("v-stc"),jr=[];let Un=null;function N(n=!1){jr.push(Un=n?null:[])}function __(){jr.pop(),Un=jr[jr.length-1]||null}let sa=1;function No(n,e=!1){sa+=n,n<0&&Un&&e&&(Un.hasOnce=!0)}function Fp(n){return n.dynamicChildren=sa>0?Un||or:null,__(),sa>0&&Un&&Un.push(n),n}function O(n,e,t,i,s,r){return Fp(v(n,e,t,i,s,r,!0))}function Rn(n,e,t,i,s){return Fp(qt(n,e,t,i,s,!0))}function Fo(n){return n?n.__v_isVNode===!0:!1}function xs(n,e){return n.type===e.type&&n.key===e.key}const Op=({key:n})=>n??null,go=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Vt(n)||hn(n)||rt(n)?{i:In,r:n,k:e,f:!!t}:n:null);function v(n,e=null,t=null,i=0,s=null,r=n===He?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&Op(e),ref:e&&go(e),scopeId:ap,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:In};return o?(Vu(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=Vt(t)?8:16),sa>0&&!a&&Un&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&Un.push(l),l}const qt=v_;function v_(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===Bg)&&(n=vn),Fo(n)){const o=is(n,e,!0);return t&&Vu(o,t),sa>0&&!r&&Un&&(o.shapeFlag&6?Un[Un.indexOf(n)]=o:Un.push(o)),o.patchFlag=-2,o}if(R_(n)&&(n=n.__vccOpts),e){e=x_(e);let{class:o,style:l}=e;o&&!Vt(o)&&(e.class=nt(o)),Tt(l)&&(Uu(l)&&!Ze(l)&&(l=Jt({},l)),e.style=Sn(l))}const a=Vt(n)?1:Np(n)?128:lp(n)?64:Tt(n)?4:rt(n)?2:0;return v(n,e,t,i,s,a,r,!0)}function x_(n){return n?Uu(n)||Cp(n)?Jt({},n):n:null}function is(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:a,children:o,transition:l}=n,c=e?y_(s||{},e):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Op(c),ref:e&&e.ref?t&&r?Ze(r)?r.concat(go(e)):[r,go(e)]:go(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==He?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&is(n.ssContent),ssFallback:n.ssFallback&&is(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&Ps(u,l.clone(u)),u}function Ne(n=" ",e=0){return qt(ll,null,n,e)}function Ec(n,e){const t=qt(mo,null,n);return t.staticCount=e,t}function de(n="",e=!1){return e?(N(),Rn(vn,null,n)):qt(vn,null,n)}function oi(n){return n==null||typeof n=="boolean"?qt(vn):Ze(n)?qt(He,null,n.slice()):Fo(n)?Ki(n):qt(ll,null,String(n))}function Ki(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:is(n)}function Vu(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Ze(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),Vu(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!Cp(e)?e._ctx=In:s===3&&In&&(In.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else rt(e)?(e={default:e,_ctx:In},t=32):(e=String(e),i&64?(t=16,e=[Ne(e)]):t=8);n.children=e,n.shapeFlag|=t}function y_(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=nt([e.class,i.class]));else if(s==="style")e.style=Sn([e.style,i.style]);else if(Jo(s)){const r=e[s],a=i[s];a&&r!==a&&!(Ze(r)&&r.includes(a))&&(e[s]=r?[].concat(r,a):a)}else s!==""&&(e[s]=i[s])}return e}function ti(n,e,t,i=null){Zn(n,e,7,[t,i])}const M_=Sp();let S_=0;function b_(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||M_,r={uid:S_++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new qm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Pp(i,s),emitsOptions:Tp(i,s),emit:null,emitted:null,propsDefaults:Ct,inheritAttrs:i.inheritAttrs,ctx:Ct,data:Ct,props:Ct,attrs:Ct,slots:Ct,refs:Ct,setupState:Ct,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=e_.bind(null,r),n.ce&&n.ce(r),r}let cn=null;const Hu=()=>cn||In;let Oo,Tc;{const n=tl(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(a=>a(r)):s[0](r)}};Oo=e("__VUE_INSTANCE_SETTERS__",t=>cn=t),Tc=e("__VUE_SSR_SETTERS__",t=>ra=t)}const ma=n=>{const e=cn;return Oo(n),n.scope.on(),()=>{n.scope.off(),Oo(e)}},$h=()=>{cn&&cn.scope.off(),Oo(null)};function kp(n){return n.vnode.shapeFlag&4}let ra=!1;function E_(n,e=!1,t=!1){e&&Tc(e);const{props:i,children:s}=n.vnode,r=kp(n);a_(n,i,r,e),u_(n,s,t||e);const a=r?T_(n,e):void 0;return e&&Tc(!1),a}function T_(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Vg);const{setup:i}=t;if(i){Di();const s=n.setupContext=i.length>1?A_(n):null,r=ma(n),a=fa(i,n,0,[n.props,s]),o=If(a);if(Li(),r(),(o||n.sp)&&!Zr(n)&&gp(n),o){if(a.then($h,$h),e)return a.then(l=>{qh(n,l)}).catch(l=>{il(l,n,0)});n.asyncDep=a}else qh(n,a)}else Bp(n)}function qh(n,e,t){rt(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:Tt(e)&&(n.setupState=ep(e)),Bp(n)}function Bp(n,e,t){const i=n.type;n.render||(n.render=i.render||fi);{const s=ma(n);Di();try{Hg(n)}finally{Li(),s()}}}const w_={get(n,e){return ln(n,"get",""),n[e]}};function A_(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,w_),slots:n.slots,emit:n.emit,expose:e}}function cl(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(ep(pg(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Jr)return Jr[t](n)},has(e,t){return t in e||t in Jr}})):n.proxy}function C_(n,e=!0){return rt(n)?n.displayName||n.name:n.name||e&&n.__name}function R_(n){return rt(n)&&"__vccOpts"in n}const lt=(n,e)=>xg(n,e,ra);function P_(n,e,t){try{No(-1);const i=arguments.length;return i===2?Tt(e)&&!Ze(e)?Fo(e)?qt(n,null,[e]):qt(n,e):qt(n,null,e):(i>3?t=Array.prototype.slice.call(arguments,2):i===3&&Fo(t)&&(t=[t]),qt(n,e,t))}finally{No(1)}}const D_="3.5.25";let wc;const Yh=typeof window<"u"&&window.trustedTypes;if(Yh)try{wc=Yh.createPolicy("vue",{createHTML:n=>n})}catch{}const zp=wc?n=>wc.createHTML(n):n=>n,L_="http://www.w3.org/2000/svg",I_="http://www.w3.org/1998/Math/MathML",Ei=typeof document<"u"?document:null,Kh=Ei&&Ei.createElement("template"),U_={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?Ei.createElementNS(L_,n):e==="mathml"?Ei.createElementNS(I_,n):t?Ei.createElement(n,{is:t}):Ei.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>Ei.createTextNode(n),createComment:n=>Ei.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Ei.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const a=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{Kh.innerHTML=zp(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const o=Kh.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Bi="transition",Ar="animation",gr=Symbol("_vtc"),Vp={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Hp=Jt({},dp,Vp),N_=n=>(n.displayName="Transition",n.props=Hp,n),F_=N_((n,{slots:e})=>P_(Cg,Gp(n),e)),fs=(n,e=[])=>{Ze(n)?n.forEach(t=>t(...e)):n&&n(...e)},Zh=n=>n?Ze(n)?n.some(e=>e.length>1):n.length>1:!1;function Gp(n){const e={};for(const L in n)L in Vp||(e[L]=n[L]);if(n.css===!1)return e;const{name:t="v",type:i,duration:s,enterFromClass:r=`${t}-enter-from`,enterActiveClass:a=`${t}-enter-active`,enterToClass:o=`${t}-enter-to`,appearFromClass:l=r,appearActiveClass:c=a,appearToClass:u=o,leaveFromClass:f=`${t}-leave-from`,leaveActiveClass:h=`${t}-leave-active`,leaveToClass:p=`${t}-leave-to`}=n,g=O_(s),_=g&&g[0],d=g&&g[1],{onBeforeEnter:m,onEnter:T,onEnterCancelled:R,onLeave:M,onLeaveCancelled:S,onBeforeAppear:b=m,onAppear:D=T,onAppearCancelled:y=R}=e,w=(L,X,q,H)=>{L._enterCancelled=H,$i(L,X?u:o),$i(L,X?c:a),q&&q()},F=(L,X)=>{L._isLeaving=!1,$i(L,f),$i(L,p),$i(L,h),X&&X()},C=L=>(X,q)=>{const H=L?D:T,K=()=>w(X,L,q);fs(H,[X,K]),Jh(()=>{$i(X,L?l:r),si(X,L?u:o),Zh(H)||jh(X,i,_,K)})};return Jt(e,{onBeforeEnter(L){fs(m,[L]),si(L,r),si(L,a)},onBeforeAppear(L){fs(b,[L]),si(L,l),si(L,c)},onEnter:C(!1),onAppear:C(!0),onLeave(L,X){L._isLeaving=!0;const q=()=>F(L,X);si(L,f),L._enterCancelled?(si(L,h),Ac(L)):(Ac(L),si(L,h)),Jh(()=>{L._isLeaving&&($i(L,f),si(L,p),Zh(M)||jh(L,i,d,q))}),fs(M,[L,q])},onEnterCancelled(L){w(L,!1,void 0,!0),fs(R,[L])},onAppearCancelled(L){w(L,!0,void 0,!0),fs(y,[L])},onLeaveCancelled(L){F(L),fs(S,[L])}})}function O_(n){if(n==null)return null;if(Tt(n))return[Tl(n.enter),Tl(n.leave)];{const e=Tl(n);return[e,e]}}function Tl(n){return Bm(n)}function si(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n[gr]||(n[gr]=new Set)).add(e)}function $i(n,e){e.split(/\s+/).forEach(i=>i&&n.classList.remove(i));const t=n[gr];t&&(t.delete(e),t.size||(n[gr]=void 0))}function Jh(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let k_=0;function jh(n,e,t,i){const s=n._endId=++k_,r=()=>{s===n._endId&&i()};if(t!=null)return setTimeout(r,t);const{type:a,timeout:o,propCount:l}=Wp(n,e);if(!a)return i();const c=a+"end";let u=0;const f=()=>{n.removeEventListener(c,h),r()},h=p=>{p.target===n&&++u>=l&&f()};setTimeout(()=>{u<l&&f()},o+1),n.addEventListener(c,h)}function Wp(n,e){const t=window.getComputedStyle(n),i=g=>(t[g]||"").split(", "),s=i(`${Bi}Delay`),r=i(`${Bi}Duration`),a=Qh(s,r),o=i(`${Ar}Delay`),l=i(`${Ar}Duration`),c=Qh(o,l);let u=null,f=0,h=0;e===Bi?a>0&&(u=Bi,f=a,h=r.length):e===Ar?c>0&&(u=Ar,f=c,h=l.length):(f=Math.max(a,c),u=f>0?a>c?Bi:Ar:null,h=u?u===Bi?r.length:l.length:0);const p=u===Bi&&/\b(?:transform|all)(?:,|$)/.test(i(`${Bi}Property`).toString());return{type:u,timeout:f,propCount:h,hasTransform:p}}function Qh(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,i)=>ed(t)+ed(n[i])))}function ed(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function Ac(n){return(n?n.ownerDocument:document).body.offsetHeight}function B_(n,e,t){const i=n[gr];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const ko=Symbol("_vod"),Xp=Symbol("_vsh"),z_={name:"show",beforeMount(n,{value:e},{transition:t}){n[ko]=n.style.display==="none"?"":n.style.display,t&&e?t.beforeEnter(n):Cr(n,e)},mounted(n,{value:e},{transition:t}){t&&e&&t.enter(n)},updated(n,{value:e,oldValue:t},{transition:i}){!e!=!t&&(i?e?(i.beforeEnter(n),Cr(n,!0),i.enter(n)):i.leave(n,()=>{Cr(n,!1)}):Cr(n,e))},beforeUnmount(n,{value:e}){Cr(n,e)}};function Cr(n,e){n.style.display=e?n[ko]:"none",n[Xp]=!e}const V_=Symbol(""),H_=/(?:^|;)\s*display\s*:/;function G_(n,e,t){const i=n.style,s=Vt(t);let r=!1;if(t&&!s){if(e)if(Vt(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();t[o]==null&&_o(i,o,"")}else for(const a in e)t[a]==null&&_o(i,a,"");for(const a in t)a==="display"&&(r=!0),_o(i,a,t[a])}else if(s){if(e!==t){const a=i[V_];a&&(t+=";"+a),i.cssText=t,r=H_.test(t)}}else e&&n.removeAttribute("style");ko in n&&(n[ko]=r?i.display:"",n[Xp]&&(i.display="none"))}const td=/\s*!important$/;function _o(n,e,t){if(Ze(t))t.forEach(i=>_o(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=W_(n,e);td.test(t)?n.setProperty(Is(i),t.replace(td,""),"important"):n[i]=t}}const nd=["Webkit","Moz","ms"],wl={};function W_(n,e){const t=wl[e];if(t)return t;let i=Hn(e);if(i!=="filter"&&i in n)return wl[e]=i;i=Qo(i);for(let s=0;s<nd.length;s++){const r=nd[s]+i;if(r in n)return wl[e]=r}return e}const id="http://www.w3.org/1999/xlink";function sd(n,e,t,i,s,r=Xm(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(id,e.slice(6,e.length)):n.setAttributeNS(id,e,t):t==null||r&&!Of(t)?n.removeAttribute(e):n.setAttribute(e,r?"":gi(t)?String(t):t)}function rd(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?zp(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const o=r==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(o!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const o=typeof n[e];o==="boolean"?t=Of(t):t==null&&o==="string"?(t="",a=!0):o==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(s||e)}function Ji(n,e,t,i){n.addEventListener(e,t,i)}function X_(n,e,t,i){n.removeEventListener(e,t,i)}const ad=Symbol("_vei");function $_(n,e,t,i,s=null){const r=n[ad]||(n[ad]={}),a=r[e];if(i&&a)a.value=i;else{const[o,l]=q_(e);if(i){const c=r[e]=Z_(i,s);Ji(n,o,c,l)}else a&&(X_(n,o,a,l),r[e]=void 0)}}const od=/(?:Once|Passive|Capture)$/;function q_(n){let e;if(od.test(n)){e={};let i;for(;i=n.match(od);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Is(n.slice(2)),e]}let Al=0;const Y_=Promise.resolve(),K_=()=>Al||(Y_.then(()=>Al=0),Al=Date.now());function Z_(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;Zn(J_(i,t.value),e,5,[i])};return t.value=n,t.attached=K_(),t}function J_(n,e){if(Ze(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>s=>!s._stopped&&i&&i(s))}else return e}const ld=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,j_=(n,e,t,i,s,r)=>{const a=s==="svg";e==="class"?B_(n,i,a):e==="style"?G_(n,t,i):Jo(e)?Eu(e)||$_(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Q_(n,e,i,a))?(rd(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&sd(n,e,i,a,r,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!Vt(i))?rd(n,Hn(e),i,r,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),sd(n,e,i,a))};function Q_(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&ld(e)&&rt(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return ld(e)&&Vt(t)?!1:e in n}const $p=new WeakMap,qp=new WeakMap,Bo=Symbol("_moveCb"),cd=Symbol("_enterCb"),e0=n=>(delete n.props.mode,n),t0=e0({name:"TransitionGroup",props:Jt({},Hp,{tag:String,moveClass:String}),setup(n,{slots:e}){const t=Hu(),i=hp();let s,r;return vp(()=>{if(!s.length)return;const a=n.moveClass||`${n.name||"v"}-move`;if(!a0(s[0].el,t.vnode.el,a)){s=[];return}s.forEach(i0),s.forEach(s0);const o=s.filter(r0);Ac(t.vnode.el),o.forEach(l=>{const c=l.el,u=c.style;si(c,a),u.transform=u.webkitTransform=u.transitionDuration="";const f=c[Bo]=h=>{h&&h.target!==c||(!h||h.propertyName.endsWith("transform"))&&(c.removeEventListener("transitionend",f),c[Bo]=null,$i(c,a))};c.addEventListener("transitionend",f)}),s=[]}),()=>{const a=vt(n),o=Gp(a);let l=a.tag||He;if(s=[],r)for(let c=0;c<r.length;c++){const u=r[c];u.el&&u.el instanceof Element&&(s.push(u),Ps(u,ia(u,o,i,t)),$p.set(u,{left:u.el.offsetLeft,top:u.el.offsetTop}))}r=e.default?Ou(e.default()):[];for(let c=0;c<r.length;c++){const u=r[c];u.key!=null&&Ps(u,ia(u,o,i,t))}return qt(l,null,r)}}}),n0=t0;function i0(n){const e=n.el;e[Bo]&&e[Bo](),e[cd]&&e[cd]()}function s0(n){qp.set(n,{left:n.el.offsetLeft,top:n.el.offsetTop})}function r0(n){const e=$p.get(n),t=qp.get(n),i=e.left-t.left,s=e.top-t.top;if(i||s){const r=n.el.style;return r.transform=r.webkitTransform=`translate(${i}px,${s}px)`,r.transitionDuration="0s",n}}function a0(n,e,t){const i=n.cloneNode(),s=n[gr];s&&s.forEach(o=>{o.split(/\s+/).forEach(l=>l&&i.classList.remove(l))}),t.split(/\s+/).forEach(o=>o&&i.classList.add(o)),i.style.display="none";const r=e.nodeType===1?e:e.parentNode;r.appendChild(i);const{hasTransform:a}=Wp(i);return r.removeChild(i),a}const _r=n=>{const e=n.props["onUpdate:modelValue"]||!1;return Ze(e)?t=>ho(e,t):e};function o0(n){n.target.composing=!0}function ud(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Ri=Symbol("_assign");function hd(n,e,t){return e&&(n=n.trim()),t&&(n=el(n)),n}const Dn={created(n,{modifiers:{lazy:e,trim:t,number:i}},s){n[Ri]=_r(s);const r=i||s.props&&s.props.type==="number";Ji(n,e?"change":"input",a=>{a.target.composing||n[Ri](hd(n.value,t,r))}),(t||r)&&Ji(n,"change",()=>{n.value=hd(n.value,t,r)}),e||(Ji(n,"compositionstart",o0),Ji(n,"compositionend",ud),Ji(n,"change",ud))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:i,trim:s,number:r}},a){if(n[Ri]=_r(a),n.composing)return;const o=(r||n.type==="number")&&!/^0\d/.test(n.value)?el(n.value):n.value,l=e??"";o!==l&&(document.activeElement===n&&n.type!=="range"&&(i&&e===t||s&&n.value.trim()===l)||(n.value=l))}},Yp={deep:!0,created(n,e,t){n[Ri]=_r(t),Ji(n,"change",()=>{const i=n._modelValue,s=aa(n),r=n.checked,a=n[Ri];if(Ze(i)){const o=Au(i,s),l=o!==-1;if(r&&!l)a(i.concat(s));else if(!r&&l){const c=[...i];c.splice(o,1),a(c)}}else if(br(i)){const o=new Set(i);r?o.add(s):o.delete(s),a(o)}else a(Kp(n,r))})},mounted:dd,beforeUpdate(n,e,t){n[Ri]=_r(t),dd(n,e,t)}};function dd(n,{value:e,oldValue:t},i){n._modelValue=e;let s;if(Ze(e))s=Au(e,i.props.value)>-1;else if(br(e))s=e.has(i.props.value);else{if(e===t)return;s=da(e,Kp(n,!0))}n.checked!==s&&(n.checked=s)}const l0={deep:!0,created(n,{value:e,modifiers:{number:t}},i){const s=br(e);Ji(n,"change",()=>{const r=Array.prototype.filter.call(n.options,a=>a.selected).map(a=>t?el(aa(a)):aa(a));n[Ri](n.multiple?s?new Set(r):r:r[0]),n._assigning=!0,np(()=>{n._assigning=!1})}),n[Ri]=_r(i)},mounted(n,{value:e}){fd(n,e)},beforeUpdate(n,e,t){n[Ri]=_r(t)},updated(n,{value:e}){n._assigning||fd(n,e)}};function fd(n,e){const t=n.multiple,i=Ze(e);if(!(t&&!i&&!br(e))){for(let s=0,r=n.options.length;s<r;s++){const a=n.options[s],o=aa(a);if(t)if(i){const l=typeof o;l==="string"||l==="number"?a.selected=e.some(c=>String(c)===String(o)):a.selected=Au(e,o)>-1}else a.selected=e.has(o);else if(da(aa(a),e)){n.selectedIndex!==s&&(n.selectedIndex=s);return}}!t&&n.selectedIndex!==-1&&(n.selectedIndex=-1)}}function aa(n){return"_value"in n?n._value:n.value}function Kp(n,e){const t=e?"_trueValue":"_falseValue";return t in n?n[t]:e}const c0=["ctrl","shift","alt","meta"],u0={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>c0.some(t=>n[`${t}Key`]&&!e.includes(t))},Bn=(n,e)=>{const t=n._withMods||(n._withMods={}),i=e.join(".");return t[i]||(t[i]=((s,...r)=>{for(let a=0;a<e.length;a++){const o=u0[e[a]];if(o&&o(s,e))return}return n(s,...r)}))},h0=Jt({patchProp:j_},U_);let pd;function d0(){return pd||(pd=d_(h0))}const f0=((...n)=>{const e=d0().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=m0(i);if(!s)return;const r=e._component;!rt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=t(s,!1,p0(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e});function p0(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function m0(n){return Vt(n)?document.querySelector(n):n}const ae=ns({D:null,auto:{},api:{profiles:[],current:"",active:!1},archives:[],step:Number(sessionStorage.getItem("qx-step")||1),drawer:null,openIntake:!1,roundMd:"",roundN:0,toast:"",viewing:null,live:null,liveStep:1});function ss(n){ae.step=n,sessionStorage.setItem("qx-step",String(n))}function pt(n,e=2600){ae.toast=n,setTimeout(()=>{ae.toast===n&&(ae.toast="")},e)}async function wn(n,e){const i=await(await fetch(n,e)).json().catch(()=>({}));return i&&i.data!==void 0?i.data:i}const Lt={data:()=>wn("/data.json?t="+Date.now(),{cache:"no-store"}).catch(()=>null),auto:()=>wn("/api/auto-status"),llm:()=>wn("/api/llm-config"),llmPost:n=>wn("/api/llm-config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),llmTest:n=>wn("/api/llm-test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n||{})}),archives:()=>wn("/api/archives"),archive:n=>wn("/api/archives/"+encodeURIComponent(n)),archiveRound:(n,e)=>wn("/api/archives/"+encodeURIComponent(n)+"/round/"+e),task:()=>wn("/api/graph/task/qx-task"),start:n=>ae.viewing?Promise.resolve({error:"历史局是已封存的另一局，不能在这里推演"}):wn("/api/simulation/start",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({max_rounds:n})}),stop:()=>wn("/api/simulation/stop",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"}),round:n=>wn("/api/round/"+n),cmd:(n,e)=>ae.viewing?Promise.resolve({error:"正在只读浏览历史局「"+ae.viewing.title+"」——先回到当前局再操作"}):wn("/cmd",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:n,payload:e})}),init:n=>fetch("/api/graph/ontology/generate",{method:"POST",body:n}).then(e=>e.json())};async function $n(){if(ae.viewing)return;const n=await Lt.data();n&&n.meta&&(ae.D=n)}function g0(n){if(!(!n||!n.id)){if(!n.exists){pt("这次归档的磁盘目录已不存在");return}window.open("/?archive="+encodeURIComponent(n.id),"_blank"),pt("已在新页签打开「"+(n.title||"历史局")+"」· 只读")}}async function _0(n){ae.viewing={id:n,title:"读取中…",archivedAt:"",rounds:0,loading:!0};const e=await Lt.archive(n).catch(()=>null);if(!e||e.error||!e.data){ae.viewing={id:n,title:"打不开",archivedAt:"",rounds:0,error:e&&e.error||"读取失败（服务可能尚未重启到新版本）"},ae.D={meta:{title:"历史局读取失败"},cast:[],units:[],feed:[],spine:[]};return}const t=e.data.meta||{};ae.viewing={id:n,title:t.title||e.record&&e.record.title||"历史局",archivedAt:t.archivedAt||e.record&&e.record.archivedAt||"",rounds:t.archiveRounds||0},ae.D=e.data,document.title="NEST-DRAMA · 历史局 "+ae.viewing.title,ss(3)}function md(){window.close(),setTimeout(()=>{location.href="/"},120)}async function v0(n){ae.roundN=n,ae.roundMd="",ae.drawer="round";const e=ae.viewing?await Lt.archiveRound(ae.viewing.id,n).catch(()=>null):await Lt.round(n).catch(()=>null);if(!e||e.error){ae.roundMd="（"+(e&&e.error||"读取失败")+"）";return}ae.roundMd=e.md||e.text||""}async function Cl(){if(!ae.viewing)try{ae.auto=await Lt.auto()||{}}catch{}}async function vo(){try{const n=await Lt.llm()||{};ae.api={profiles:n.profiles||[],current:n.current||"",active:!!(n.active||n.configured||n.env||(n.profiles||[]).length),env:!!n.env}}catch{}}let Rr=null;function x0(){const n=new URLSearchParams(location.search).get("archive");if(n){_0(n);vo();return}$n(),Cl(),vo(),Lt.archives().then(i=>{ae.archives=i&&i.archives||[]}).catch(()=>{});let e=!1;try{Rr=new EventSource("/events"),Rr.addEventListener("update",()=>{$n()});let i=0;Rr.addEventListener("progress",s=>{try{const r=JSON.parse(s.data);ae.auto=r,e=!0,r.dataVer&&i&&r.dataVer!==i&&$n(),r.dataVer&&(i=r.dataVer)}catch{}}),Rr.addEventListener("hello",()=>{e=!0,$n(),Cl()}),Rr.onerror=()=>{e=!1}}catch{}const t=()=>{Cl(),setTimeout(t,e?12e3:ae.auto&&ae.auto.running?2e3:9e3)};t()}const gd={顺:["ok","引力顺"],偏:["warn","引力偏"],警:["bad","引力警"]},Jn=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t},y0={class:"stack"},M0={key:0,class:"card pad"},S0={class:"row",style:{"margin-top":"6px"}},b0={class:"h1 grow"},E0={class:"sub",style:{"margin-top":"4px"}},T0={class:"grid2",style:{"margin-top":"18px"}},w0={class:"kicker"},A0={class:"chips"},C0={class:"persona-tag"},R0={class:"kicker"},P0={class:"spine"},D0=["title"],L0=["title"],I0={key:0,class:"mut mono"},U0={class:"row",style:{"margin-top":"16px"}},N0={key:1,class:"card pad"},F0={key:1,class:"mode-pick"},O0={class:"row",style:{"margin-top":"16px"}},k0=["disabled"],B0={key:0,class:"sub grow"},z0={key:0,class:"chips",style:{"justify-content":"center","margin-top":"10px"}},V0=["onClick"],H0={class:"row",style:{"margin-top":"16px"}},G0=["disabled"],W0={key:0,class:"sub grow"},X0={key:0,class:"bar"},$0={__name:"StepWorld",setup(n){const e=lt(()=>ae.D||{}),t=lt(()=>e.value.meta||{}),i=lt(()=>!!t.value.built),s=lt(()=>((e.value.units||[]).find(S=>S.name===t.value.unitName)||{}).est||((e.value.forecast||{}).perUnit||{})[t.value.unitName]||(e.value.forecast||{}).total||"—"),r=Bt([]),a=Bt(""),o=Bt(""),l=Bt(!1),c=Bt(""),u=Bt(0),f=Bt(!1),h=Bt("new"),p=ns({outline:"",newCast:"",rounds:8,busy:!1,msg:""});async function g(){p.busy=!0;const M=await Lt.cmd("continue-story",{outline:p.outline,newCast:p.newCast,rounds:p.rounds});if(p.busy=!1,!M||!M.unit)return pt(M&&M.error||"失败");p.msg=`新单元「${M.unit}」已建`+(M.started?"，推演已开始":"，已排入队列"),pt(M.started?"续写已开推":"续写单元已建"),await $n(),M.started&&ss(3)}const _={铁:"必达",软:"弹性",禁:"红线"};function d(M){r.value.push(...M.target.files),M.target.value=""}function m(M){f.value=!1,r.value.push(...M.dataTransfer.files)}let T=null;al(()=>{T&&clearInterval(T)});async function R(){l.value=!0,c.value="材料上传中…",u.value=4;const M=new FormData;r.value.forEach(S=>M.append("files",S,S.name)),M.append("project_name",a.value),M.append("simulation_requirement",o.value);try{const S=await Lt.init(M);if(S&&S.success===!1)throw new Error(S.error||"提交失败");c.value="已受理，引擎开始建世界…",T&&clearInterval(T),T=setInterval(async()=>{const b=await Lt.task().catch(()=>null);b&&(c.value=b.message||"…",u.value=b.progress||u.value,b.status==="completed"&&(clearInterval(T),T=null,l.value=!1,ae.openIntake=!1,pt("世界已就绪"),$n()),b.status==="failed"&&(clearInterval(T),T=null,l.value=!1,pt("建世界失败："+(b.message||""))))},2500)}catch(S){l.value=!1,pt(String(S.message||S))}}return(M,S)=>(N(),O("div",y0,[i.value?(N(),O("div",M0,[S[13]||(S[13]=v("div",{class:"kicker"},"当前局",-1)),v("div",S0,[v("h1",b0,P(t.value.title),1),S[12]||(S[12]=v("span",{class:"pill"},[v("span",{class:"dot",style:{background:"var(--st-good)"}}),Ne("世界已就绪")],-1))]),v("div",E0," 第 "+P(t.value.round||0)+" 轮 · 单元「"+P(t.value.unitName)+"」"+P(t.value.unitRound)+" · 预计 "+P(s.value)+" 轮 ",1),v("div",T0,[v("div",null,[v("div",w0,"卡司 · "+P((e.value.cast||[]).length)+" 人",1),v("div",A0,[(N(!0),O(He,null,ht(e.value.cast,b=>(N(),O("span",{key:b.name,class:"chip"},[v("b",null,P(b.name),1),v("span",C0,P(b.profile&&b.profile.base||b.role||"性格待解析"),1)]))),128))])]),v("div",null,[v("div",R0,"剧情脊椎 · "+P((e.value.spine||[]).length)+" 条",1),v("ul",P0,[(N(!0),O(He,null,ht((e.value.spine||[]).slice(0,8),(b,D)=>(N(),O("li",{key:D},[v("span",{class:nt(["sp-kind",{iron:b.kind==="铁",soft:b.kind==="软",ban:b.kind==="禁"}]),title:"原标记："+b.kind},P(_[b.kind]||b.kind),11,D0),v("span",{class:"ellip grow",title:b.label},P(b.label),9,L0),b.achieved||b.touchedRound?(N(),O("span",I0,"R"+P(b.touchedRound||"✓"),1)):de("",!0)]))),128))])])]),v("div",U0,[v("button",{class:"btn btn-ink",onClick:S[0]||(S[0]=b=>dt(ss)(2))},"去配置推演 →"),v("button",{class:"btn btn-ghost btn-sm",onClick:S[1]||(S[1]=b=>dt(ae).openIntake=!dt(ae).openIntake)},P(dt(ae).openIntake?"收起":"投放新世界…"),1)])])):de("",!0),!i.value||dt(ae).openIntake?(N(),O("div",N0,[i.value?de("",!0):(N(),O(He,{key:0},[S[14]||(S[14]=v("div",{class:"kicker"},"起局",-1)),S[15]||(S[15]=v("h1",{class:"h1",style:{"margin-top":"6px"}},[Ne("投放你的世界"),v("br"),Ne("让角色自己活")],-1)),S[16]||(S[16]=v("p",{class:"sub",style:{"max-width":"46ch"}},[Ne(" 喂给引擎三样料："),v("b",null,"世界观 · 角色设定 · 单元剧本"),Ne("（剧情脊椎可选）。 它为你建库成世界——分脑隔离的角色群按各自的人格、恐惧与信息视野真实行动， 每一轮四拍齐整：目的、冲突、转折、结果，一根接棒链把全员织成一个完整的故事。 ")],-1))],64)),i.value?(N(),O("div",F0,[v("button",{class:nt({on:h.value==="new"}),onClick:S[2]||(S[2]=b=>h.value="new")},[...S[17]||(S[17]=[v("b",null,"新世界",-1),v("span",null,"另一个项目：当前局归档封存，从空白开始建库",-1)])],2),v("button",{class:nt({on:h.value==="cont"}),onClick:S[3]||(S[3]=b=>h.value="cont")},[...S[18]||(S[18]=[v("b",null,"续写新单元",-1),v("span",null,"叠加当前世界观与角色，保留全部推演进程，只新增单元剧情",-1)])],2)])):de("",!0),i.value&&h.value==="cont"?(N(),O(He,{key:2},[S[20]||(S[20]=v("label",{class:"label",style:{"margin-top":"14px"}},"新单元细纲（必填）",-1)),Qt(v("textarea",{"onUpdate:modelValue":S[4]||(S[4]=b=>p.outline=b),class:"field",placeholder:"这一段要发生什么、到哪收束——世界观与既有角色全部保留，只可新增"},null,512),[[Dn,p.outline]]),S[21]||(S[21]=v("label",{class:"label",style:{"margin-top":"12px"}},"新增角色设定（可选）",-1)),Qt(v("textarea",{"onUpdate:modelValue":S[5]||(S[5]=b=>p.newCast=b),class:"field",placeholder:"新角色的名字与设定（可多位）；不新增可留空"},null,512),[[Dn,p.newCast]]),v("div",O0,[Qt(v("input",{"onUpdate:modelValue":S[6]||(S[6]=b=>p.rounds=b),type:"number",min:"1",max:"480",class:"field mono",style:{width:"90px"}},null,512),[[Dn,p.rounds,void 0,{number:!0}]]),S[19]||(S[19]=v("span",{class:"mut"},"运行轮数",-1)),v("button",{class:"btn btn-seal",disabled:!p.outline||p.busy,onClick:g},P(p.busy?"建立中…":"续写并开推"),9,k0),p.msg?(N(),O("span",B0,P(p.msg),1)):de("",!0)])],64)):de("",!0),!i.value||h.value==="new"?(N(),O(He,{key:3},[v("div",{class:nt(["dz",{over:f.value}]),onDragover:S[7]||(S[7]=Bn(b=>f.value=!0,["prevent"])),onDragleave:S[8]||(S[8]=b=>f.value=!1),onDrop:Bn(m,["prevent"]),onClick:S[9]||(S[9]=b=>M.$refs.file.click())},[v("input",{ref:"file",type:"file",multiple:"",accept:".txt,.md,.docx",hidden:"",onChange:d},null,544),S[22]||(S[22]=v("div",{class:"dz-ico"},"↑",-1)),S[23]||(S[23]=v("div",null,[v("b",null,"投入材料文件"),Ne("（可多选 · txt / md / docx）")],-1)),S[24]||(S[24]=v("div",{class:"mut"},"或点击浏览文件系统",-1)),r.value.length?(N(),O("div",z0,[(N(!0),O(He,null,ht(r.value,(b,D)=>(N(),O("span",{key:D,class:"chip"},[Ne(P(b.name)+" ",1),v("a",{onClick:Bn(y=>r.value.splice(D,1),["stop"]),style:{cursor:"pointer",color:"var(--seal)"}},"×",8,V0)]))),128))])):de("",!0)],34),S[26]||(S[26]=v("label",{class:"label",style:{"margin-top":"14px"}},"局名（可选）",-1)),Qt(v("input",{"onUpdate:modelValue":S[10]||(S[10]=b=>a.value=b),class:"field",placeholder:"不填则由引擎从材料里起名"},null,512),[[Dn,a.value]]),S[27]||(S[27]=v("label",{class:"label",style:{"margin-top":"12px"}},"剧情脊椎补充（可选）",-1)),Qt(v("textarea",{"onUpdate:modelValue":S[11]||(S[11]=b=>o.value=b),class:"field",placeholder:"用自然语言补硬节点（例：这是一个悬疑局，凶手第10轮前绝不能暴露；没有可留空）"},null,512),[[Dn,o.value]]),v("div",H0,[v("button",{class:"btn btn-seal",disabled:!r.value.length||l.value,onClick:R},P(l.value?"建世界中…":"建 世 界"),9,G0),S[25]||(S[25]=v("span",{class:"mut"},"建成后停在「配置」页——轮数与引力档由你定，不自动开推",-1)),c.value?(N(),O("span",W0,P(c.value),1)):de("",!0)]),l.value?(N(),O("div",X0,[v("i",{style:Sn({width:u.value+"%"})},null,4)])):de("",!0)],64)):de("",!0)])):de("",!0)]))}},q0=Jn($0,[["__scopeId","data-v-0285027c"]]),Y0={class:"card pad"},K0={class:"two"},Z0={class:"cfg card-2"},J0={class:"big mono"},j0={class:"mut"},Q0={key:0,class:"why"},ev={class:"cfg card-2"},tv={key:0,class:"cal card-2"},nv={class:"ellip grow"},iv={class:"mono mut"},sv={class:"mono"},rv={class:"row",style:{"margin-top":"20px"}},av=["disabled"],ov={__name:"StepConfig",setup(n){const e=lt(()=>ae.D||{}),t=lt(()=>(e.value.units||[]).find(c=>c.name===(e.value.meta||{}).unitName)||{}),i=lt(()=>t.value.est||((e.value.forecast||{}).perUnit||{})[(e.value.meta||{}).unitName]||""),s=lt(()=>t.value.estWhy||((e.value.forecast||{}).why||{})[(e.value.meta||{}).unitName]||""),r=lt(()=>((e.value.meta||{}).calibration||[]).slice(-6)),a=Bt(8),o=Bt(!1);Cs(i,c=>{const u=parseInt(String(c||"").split("-")[1]||"");u&&a.value===8&&(a.value=Math.min(480,u))},{immediate:!0});async function l(){const c=Math.max(1,Math.min(480,a.value||1));o.value=!0;try{const u=await Lt.start(c);if(u&&u.error)throw new Error(u.error);pt(`已启动：${c} 轮`),ss(3)}catch(u){pt(String(u.message||u))}o.value=!1}return(c,u)=>(N(),O("div",Y0,[u[8]||(u[8]=v("div",{class:"kicker"},"推演配置",-1)),u[9]||(u[9]=v("h2",{class:"h1",style:{"margin-top":"6px"}},"只有两件事要定",-1)),u[10]||(u[10]=v("p",{class:"sub"},"其余（轮次粒度、候选数、隔离等级、审校闸门）全部内置，不需要你操心。",-1)),v("div",K0,[v("div",Z0,[u[1]||(u[1]=v("div",{class:"label"},[Ne("预测轮数 "),v("span",{class:"mut"},"（按剧作结构逐项数出 · 只读）")],-1)),v("div",J0,P(i.value||(e.value.forecast||{}).total||"—"),1),v("div",j0,"单元「"+P((e.value.meta||{}).unitName)+"」当前 "+P((e.value.meta||{}).unitRound||"0/—"),1),s.value?(N(),O("div",Q0,P(s.value),1)):de("",!0)]),v("div",ev,[u[2]||(u[2]=v("div",{class:"label"},[Ne("本次运行轮数 "),v("span",{class:"mut"},"（1–480，跑完可续）")],-1)),Qt(v("input",{"onUpdate:modelValue":u[0]||(u[0]=f=>a.value=f),type:"number",min:"1",max:"480",class:"field big-in mono"},null,512),[[Dn,a.value,void 0,{number:!0}]]),u[3]||(u[3]=v("div",{class:"mut"},"默认=预估上限；剧情提前达成即自动终局，剩余轮数不消耗",-1))])]),r.value.length?(N(),O("div",tv,[u[6]||(u[6]=v("div",{class:"label"},[Ne("预测校准账 "),v("span",{class:"mut"},"（每个收束单元记一笔：预估 vs 实际）")],-1)),(N(!0),O(He,null,ht(r.value,(f,h)=>(N(),O("div",{key:h,class:"cal-row"},[v("span",nv,P(f.unit),1),v("span",iv,"预估 "+P(f.est||"—"),1),v("span",sv,[v("b",null,"实际 "+P(f.actual),1),u[4]||(u[4]=Ne(" 轮",-1))]),v("span",{class:nt(["pill",f.result==="达成"?"ok":"warn"])},[u[5]||(u[5]=v("span",{class:"dot"},null,-1)),Ne(P(f.result),1)],2)]))),128))])):de("",!0),v("div",rv,[v("button",{class:"btn btn-ink",disabled:o.value,onClick:l},P(o.value?"启动中…":"开始推演 →"),9,av),u[7]||(u[7]=v("span",{class:"sub"},"每轮四拍齐整（目的·冲突·转折·结果），接棒链自动把全员织进故事",-1))])]))}},lv=Jn(ov,[["__scopeId","data-v-b6751730"]]),_d=["#9b9891","#2a78d6","#4a3aa7","#1baf7a","#eb6834","#e87ba4"],Aa=[{k:"iq",label:"智力",max:5},{k:"eq",label:"情商",max:5},{k:"survival",label:"求生欲",max:5},{k:"startle",label:"惊讶阈值",max:5},{k:"scheme",label:"谋略层数",max:3}],cv={iq:["只看眼前","能想一步","能算两步","算三步且留话","落子已在三轮后"],eq:["常得罪人不自知","看得出冷场却硬来","会换个说法","说话先挑落点","一句安抚或一句致命"],survival:["可以豁出命","有比命更要紧的","常人怕死","形势不利先保己","刀架脖子什么都卖"],startle:["一点意外就慌","会有片刻接不上","停一下能接住","很难惊动","几乎不失态"],scheme:["一条道走到黑","明线加一条备用","明暗替三线并行","",""]},uv={iq:"智力：能算几步棋",eq:"情商：读脸色与拿捏他人的能力",survival:"求生欲：命受威胁时退让的程度",startle:"惊讶阈值：多离谱才会让他失态",scheme:"谋略层数：同时经营几条线"},hv={props:{name:{type:String,required:!0},closable:{type:Boolean,default:!0}},emits:["close","pick-pair"],computed:{cast(){const n=ae.D||{},e=(n.cast||[]).find(i=>i.name===this.name);if(e)return e;const t=(n.graph&&n.graph.nodes||[]).find(i=>i.id===this.name);return t?{name:t.id,role:t.role||""}:null},profile(){return this.cast&&this.cast.profile||{}},traits(){const n=this.cast&&this.cast.traits;return n&&Object.keys(n).length?n:null},rounds(){return ae.D&&ae.D.feed||[]},meta(){return ae.D&&ae.D.meta||{}},isBaton(){return this.meta.baton===this.name},isWriting(){return(ae.auto&&ae.auto.running&&ae.auto.agent)===this.name},traitRows(){const n=this.traits||{};return Aa.map(({k:e,label:t,max:i})=>{const s=Number(n[e]),r=Number.isFinite(s)?Math.max(0,Math.min(i,s)):0;return{k:e,label:t,max:i,v:r,desc:uv[e],say:r?cv[e][r-1]||"":"未评定"}})},traitAudit(){const n=this.traits,e=!!n&&Aa.every(({k:t,max:i})=>{const s=Number(n[t]);return Number.isFinite(s)&&s>=1&&s<=i});return{ok:e,detail:e?"复核：五轴数值全部来自角色卡 traits，均在各自定义上限内；依据来自 traitWhy。":"复核未通过：角色卡 traits 缺失或超出定义范围，雷达图不替它补值。"}},radarAxes(){return Aa.map((i,s)=>{const r=-Math.PI/2+s*Math.PI*2/5,a=82+Math.cos(r)*48,o=78+Math.sin(r)*48,l=82+Math.cos(r)*61,c=78+Math.sin(r)*61+(s===0?-1:3);return{...i,cx:82,cy:78,x:a,y:o,lx:l,ly:c,anchor:Math.cos(r)>.25?"start":Math.cos(r)<-.25?"end":"middle"}})},radarLevels(){return[1,2,3,4,5].map(i=>({level:i,points:Aa.map((s,r)=>{const a=-Math.PI/2+r*Math.PI*2/5;return`${82+Math.cos(a)*48*i/5},${78+Math.sin(a)*48*i/5}`}).join(" ")}))},radarValuePoints(){return this.traitRows.map((i,s)=>{const r=-Math.PI/2+s*Math.PI*2/5,a=48*(i.v/i.max);return`${82+Math.cos(r)*a},${78+Math.sin(r)*a}`}).join(" ")},radarValueDots(){return this.traitRows.map((i,s)=>{const r=-Math.PI/2+s*Math.PI*2/5,a=48*(i.v/i.max);return{k:i.k,x:82+Math.cos(r)*a,y:78+Math.sin(r)*a}})},profRows(){const n=this.profile;return[["desire","欲望"],["fear","恐惧"],["flaw","真缺点"],["bottom","底线"],["lie","谎言习惯"],["manner","待人"],["base","性格底盘"]].filter(([e])=>n[e]).map(([e,t])=>({k:e,label:t,v:n[e]}))},stat(){const n=this.meta.round||this.rounds.length,e=this.meta.lastLed||{},t={driven:0,targeted:0,present:0,baton:0,idle:e[this.name]?Math.max(0,n-e[this.name]):n};for(const i of this.rounds)i.driver===this.name&&t.driven++,i.target===this.name&&t.targeted++,i.baton===this.name&&t.baton++,(i.present||[]).includes(this.name)&&t.present++;return t},moves(){const n=[];for(const e of this.rounds.slice(-24).reverse()){let t="",i="";if(e.driver===this.name)t="d",i="驱动";else if(e.target===this.name)t="t",i="被指向";else if((e.present||[]).includes(this.name))t="p",i="在场";else continue;if(n.push({r:e.round,role:t,roleCn:i,txt:(e.baton===this.name?"接棒：":"")+(e.beats&&e.beats.result||e.summary||"").slice(0,34)}),n.length>=4)break}return n},allies(){const n=(ae.D&&ae.D.graph&&ae.D.graph.edges||[]).filter(i=>i.kind==="关系"),e={};for(const i of this.rounds)!i.driver||!i.target||(i.driver===this.name?e[i.target]=(e[i.target]||0)+1:i.target===this.name&&(e[i.driver]=(e[i.driver]||0)+1));const t=[];for(const i of n){const s=i.source||i.a,r=i.target||i.b;if(s!==this.name&&r!==this.name)continue;const a=s===this.name?r:s;!a||a===this.name||t.some(o=>o.id===a)||t.push({id:a,n:e[a]||0,color:_d[(i.unitIndex||0)%_d.length]})}return t.sort((i,s)=>s.n-i.n).slice(0,8)}}},dv={class:"cc"},fv={class:"cc-head"},pv={key:0,class:"chip",style:{color:"#c03a2b","border-color":"#c03a2b"}},mv={key:1,class:"chip",style:{color:"var(--seal)","border-color":"var(--seal)"}},gv={key:2,class:"chip",style:{color:"#4a3aa7","border-color":"#4a3aa7"}},_v={key:3,class:"mut"},vv={class:"cc-grid"},xv={class:"cc-col"},yv={class:"kicker cc-index-title"},Mv=["title"],Sv={class:"trait-viz"},bv={class:"radar",viewBox:"0 0 184 166",role:"img","aria-label":"角色原始指数五边形图"},Ev=["points"],Tv=["x1","y1","x2","y2"],wv=["points"],Av=["cx","cy"],Cv=["x","y","text-anchor"],Rv={key:0,class:"tr"},Pv=["title"],Dv={class:"tr-k"},Lv={class:"tr-bar"},Iv={class:"tr-v mono"},Uv={class:"tr-say ellip"},Nv={key:1,class:"mut"},Fv={key:2,class:"cc-why"},Ov={key:3,class:"cc-persona"},kv={key:4,class:"cc-persona"},Bv={class:"cc-col"},zv={key:0,class:"cc-prof"},Vv={key:1,class:"mut"},Hv={class:"cc-stats"},Gv={key:2,class:"mv"},Wv={class:"mono mut"},Xv={class:"ellip"},$v={key:3,class:"cc-rels"},qv=["onClick"],Yv={key:0,class:"mono"};function Kv(n,e,t,i,s,r){return N(),O("div",dv,[v("header",fv,[v("b",null,P(t.name),1),r.isBaton?(N(),O("span",pv,"接棒中")):de("",!0),r.isWriting?(N(),O("span",mv,"正在成稿")):de("",!0),r.profile.hasSecret?(N(),O("span",gv,"身怀秘密")):de("",!0),r.cast?(N(),O("span",_v,P(r.cast.role),1)):de("",!0),t.closable?(N(),O("button",{key:4,class:"x2",onClick:e[0]||(e[0]=a=>n.$emit("close"))},"×")):de("",!0)]),v("div",vv,[v("div",xv,[v("div",yv,[e[1]||(e[1]=Ne("角色原始指数 ",-1)),e[2]||(e[2]=v("span",{class:"mut"},"（仅据角色设定评定）",-1)),v("span",{class:nt(["trait-audit",{warn:!r.traitAudit.ok}]),title:r.traitAudit.detail},P(r.traitAudit.ok?"咬合 ✓":"待补全"),11,Mv)]),v("div",Sv,[(N(),O("svg",bv,[(N(!0),O(He,null,ht(r.radarLevels,a=>(N(),O("polygon",{key:a.level,points:a.points,fill:"none",stroke:"var(--line)","stroke-width":".8"},null,8,Ev))),128)),(N(!0),O(He,null,ht(r.radarAxes,a=>(N(),O("line",{key:a.k,x1:a.cx,y1:a.cy,x2:a.x,y2:a.y,stroke:"var(--line-2)","stroke-width":".8"},null,8,Tv))),128)),v("polygon",{points:r.radarValuePoints,fill:"rgba(192,58,43,.16)",stroke:"var(--seal)","stroke-width":"1.8"},null,8,wv),(N(!0),O(He,null,ht(r.radarValueDots,a=>(N(),O("circle",{key:a.k,cx:a.x,cy:a.y,r:"2.2",fill:"var(--seal)"},null,8,Av))),128)),(N(!0),O(He,null,ht(r.radarAxes,a=>(N(),O("text",{key:a.k+"-label",x:a.lx,y:a.ly,"text-anchor":a.anchor,class:"radar-label"},P(a.label),9,Cv))),128))])),e[3]||(e[3]=v("div",{class:"radar-note"},[v("b",null,"原始值"),v("span",null,"五轴独立归一化"),v("span",null,"谋略层数上限 3")],-1))]),r.traitRows.length?(N(),O("div",Rv,[(N(!0),O(He,null,ht(r.traitRows,a=>(N(),O("div",{key:a.k,class:"tr-row",title:a.desc},[v("span",Dv,P(a.label),1),v("span",Lv,[(N(),O(He,null,ht(5,o=>v("i",{key:o,class:nt({on:o<=a.v,cap:a.max===3&&o>3})},null,2)),64))]),v("span",Iv,P(a.v),1),v("span",Uv,P(a.say),1)],8,Pv))),128))])):(N(),O("div",Nv,"该角色未评定秉性")),r.cast&&r.cast.traitWhy?(N(),O("div",Fv,"依据："+P(r.cast.traitWhy),1)):de("",!0),r.profile.base?(N(),O("div",Ov,[e[4]||(e[4]=v("b",null,"性格底盘",-1)),Ne(P(r.profile.base),1)])):de("",!0),r.profile.habits?(N(),O("div",kv,[e[5]||(e[5]=v("b",null,"专属习惯",-1)),Ne(P(r.profile.habits),1)])):de("",!0)]),v("div",Bv,[e[12]||(e[12]=v("div",{class:"kicker"},[Ne("设定档案 "),v("span",{class:"mut"},"（内核卡原文）")],-1)),r.profRows.length?(N(),O("dl",zv,[(N(!0),O(He,null,ht(r.profRows,a=>(N(),O(He,{key:a.k},[v("dt",null,P(a.label),1),v("dd",null,P(a.v),1)],64))),128))])):(N(),O("div",Vv,P(r.cast&&r.cast.brief?r.cast.brief:"暂无内核卡档案"),1)),e[13]||(e[13]=v("div",{class:"kicker",style:{"margin-top":"9px"}},"推演指标",-1)),v("div",Hv,[v("span",null,[e[6]||(e[6]=Ne("驱动 ",-1)),v("b",null,P(r.stat.driven),1)]),v("span",null,[e[7]||(e[7]=Ne("被指向 ",-1)),v("b",null,P(r.stat.targeted),1)]),v("span",null,[e[8]||(e[8]=Ne("持棒 ",-1)),v("b",null,P(r.stat.baton),1)]),v("span",null,[e[9]||(e[9]=Ne("出场 ",-1)),v("b",null,P(r.stat.present),1),Ne("/"+P(r.rounds.length),1)]),v("span",null,[e[10]||(e[10]=Ne("闲置 ",-1)),v("b",{style:Sn({color:r.stat.idle>=5?"#c03a2b":""})},P(r.stat.idle),5),e[11]||(e[11]=Ne(" 轮",-1))])]),r.moves.length?(N(),O("div",Gv,[(N(!0),O(He,null,ht(r.moves,a=>(N(),O("div",{key:a.r,class:"mv-row"},[v("span",Wv,"R"+P(a.r),1),v("span",{class:nt("mv-"+a.role)},P(a.roleCn),3),v("span",Xv,P(a.txt),1)]))),128))])):de("",!0),r.allies.length?(N(),O("div",$v,[(N(!0),O(He,null,ht(r.allies,a=>(N(),O("button",{key:a.id,class:"rel-chip",style:Sn({borderColor:a.color}),onClick:o=>n.$emit("pick-pair",t.name,a.id)},[Ne(P(a.id),1),a.n?(N(),O("span",Yv,"·"+P(a.n),1)):de("",!0)],12,qv))),128))])):de("",!0)])])])}const Gu=Jn(hv,[["render",Kv],["__scopeId","data-v-13cce5f8"]]),Zv={class:"stack"},Jv={class:"arc-tag"},jv={class:"grow"},Qv={key:0,class:"mut"},ex={key:1,class:"mut",style:{"font-size":"11px"}},tx={key:2,class:"mut",style:{"font-size":"11px"}},nx={class:"card pad"},ix={class:"row"},sx={class:"grow"},rx={class:"kicker"},ax={class:"row",style:{gap:"8px","margin-top":"6px"}},ox={class:"h2"},lx={key:0,class:"live"},cx={class:"tiles"},ux={class:"tile"},hx={class:"tv mono"},dx={key:0,class:"live-i",title:"本轮进行中"},fx={class:"tl"},px={class:"tile"},mx={class:"tv mono"},gx={class:"tile"},_x={class:"tv mono"},vx={class:"tl"},xx={key:0,class:"mut"},yx={class:"tile"},Mx={class:"tv mono"},Sx={class:"tl"},bx={key:0,class:"mut"},Ex={class:"tile"},Tx={class:"tv",style:{display:"flex","align-items":"center",gap:"8px"}},wx={key:0,class:"gseg"},Ax=["title","onClick"],Cx={class:"tl"},Rx={key:0,class:"tile"},Px={class:"tl"},Dx={class:"mut"},Lx={key:0,class:"runbox"},Ix={class:"row",style:{gap:"8px"}},Ux={key:0,class:"mono tokr",style:{flex:"none"},title:"模型实时出字速率（思考+正文都算）"},Nx={class:"row substage"},Fx={class:"grow ellip"},Ox={key:0,class:"mut mono"},kx={key:0,class:"agents"},Bx={key:0,class:"wdot"},zx={key:1,class:"ok-tick"},Vx={key:1,class:"live-box"},Hx={class:"mono mut",style:{flex:"none"}},Gx={style:{flex:"none"}},Wx={class:"grow sub lv-txt"},Xx={key:1,class:"handoff"},$x={class:"mut grow ellip"},qx={key:0,class:"pill warn"},Yx={key:2,class:"apause"},Kx={key:3,class:"err"},Zx={key:4,class:"log mono"},Jx={class:"card pad"},jx={class:"wall"},Qx=["onClick"],ey={class:"wname ellip"},ty={class:"wpersona ellip"},ny={class:"wtraits mono"},iy={key:1,class:"mut",style:{"font-size":"11.5px"}},sy={class:"card pad"},ry={class:"row"},ay={class:"kicker grow"},oy={class:"mut",style:{cursor:"pointer"}},ly={key:0,class:"mut",style:{padding:"20px 0","text-align":"center"}},cy={class:"feed"},uy={key:0,class:"fitem fitem-live"},hy={class:"row"},dy={class:"rno mono rno-live"},fy={class:"ellip grow"},py={class:"pill ok"},my={key:0,class:"fsum",style:{"margin-top":"6px"}},gy=["onClick"],_y={class:"row"},vy={class:"rno mono"},xy={class:"ellip grow"},yy={key:1,class:"pill warn"},My={key:0,class:"chain mono"},Sy={key:0,class:"baton"},by={key:1,class:"beats"},Ey={class:"bv"},Ty={class:"fsum"},wy={__name:"StepRun",setup(n){const e=Bt(""),t=lt(()=>ae.D||{}),i=lt(()=>t.value.meta||{}),s=lt(()=>ae.viewing),r=lt(()=>ae.viewing?{}:ae.auto||{}),a=lt(()=>t.value.feed||[]),o=Bt(!0),l=Bt(!1),c=lt(()=>{const ge=o.value?[...a.value].reverse():a.value;return l.value?ge:ge.slice(0,40)});function u(ge){const re=ge&&ge.profile||{};return String(re.base||re.manner||ge.role||ge.brief||"性格待解析").replace(/^性格底盘[:：]?\s*/,"")}function f(ge){const re=ge&&ge.traits||{};return[["智",re.iq],["读人",re.eq],["求生",re.survival],["惊阈",re.startle],["谋",re.scheme]].filter(([,G])=>G!=null&&G!=="").map(([G,ve])=>`${G}${ve}`).join(" · ")||"原始指数待解析"}const h=[["goal","目的"],["conflict","冲突"],["turn","转折"],["result","结果"]];Cs(()=>(t.value.cast||[]).map(ge=>ge.name).join("|"),ge=>{e.value&&!ge.split("|").includes(e.value)&&(e.value="")});const p=lt(()=>gd[i.value.gravity]||["",""]),g=Bt(0);let _=null,d=-1;pa(()=>{_=setInterval(()=>{r.value.running&&(g.value+=1)},1e3)}),al(()=>{_&&clearInterval(_)}),Cs(()=>r.value.round_elapsed,ge=>{typeof ge=="number"?g.value=ge:r.value.running||(g.value=0)});function m(ge){if(ge=Math.max(0,Math.round(ge||0)),ge>36e4)return">99h";if(ge<60)return ge+"s";const re=Math.floor(ge/60);return re<60?`${re}m${String(ge%60).padStart(2,"0")}s`:`${(re/60).toFixed(1)}h`}const T=lt(()=>{const ge=r.value.avg_round_secs;return ge?(r.value.avg_est?"约 ":"")+m(ge):"—"}),R=lt(()=>{let ge=r.value.eta_secs;return ge?(r.value.running&&(ge=Math.max(0,ge-Math.max(0,g.value-(r.value.round_elapsed||0)))),(r.value.avg_est?"约 ":"")+m(ge)):"—"}),M=[["low","低","角色自由至上：全程不施引力，允许偏离单元目标"],["medium","中","默认节奏：开局放养，后半倾斜，末轮收束"],["high","高","贴线推进：开局即倾斜，每轮燃料直指单元目标"]];async function S(ge){const re=await Lt.cmd("gravity-mode",{mode:ge}).catch(G=>({error:String(G)}));pt(re&&re.note||re&&re.error||"已切换")}const b=lt(()=>{const ge=r.value.pct||0;if(!r.value.running)return ge;const re=r.value.avg_round_secs;if(!re||!g.value)return ge;const G=Math.round(100*g.value/re);return Math.max(ge,Math.min(G,ge+14,99))}),D=Bt(!1);Cs(()=>r.value.pct,ge=>{ge!==d&&(d=ge,D.value=!0,setTimeout(()=>{D.value=!1},620))});const y=lt(()=>new Set((r.value.live||[]).map(ge=>ge.name))),w=lt(()=>(r.value.live||[]).slice(-6)),F=lt(()=>a.value.slice(-1)[0]||{}),C=lt(()=>r.value.running&&r.value.round?r.value.round:i.value.round||0),L=lt(()=>r.value.running&&r.value.unit_round?r.value.unit_round:i.value.unitRound||"—"),X=lt(()=>a.value.slice(-10).filter(ge=>typeof ge.human=="number")),q=lt(()=>X.value.length),H=lt(()=>q.value?Math.round(X.value.reduce((ge,re)=>ge+re.human,0)/q.value):null);function K(ge){return ge>=85?"h-good":ge>=65?"h-mid":"h-low"}const V=lt(()=>{const ge=t.value.units||[];return ge.length>0&&ge.every(re=>String(re.status||"").includes("已收束"))}),Z=lt(()=>(r.value.log||[]).slice(-1)[0]||"");function ne(){const[ge,re]=String(i.value.unitRound||"").split("/").map(ve=>parseInt(ve)||0);if(re&&re>ge)return Math.min(480,re-ge);const G=parseInt(String((t.value.forecast||{}).total||"").split("-").pop()||"");return Math.min(480,G||8)}async function pe(){const ge=ne(),re=await Lt.start(ge).catch(G=>({error:String(G)}));if(re&&re.error)return pt(re.error);if(re&&re.started===!1)return pt(re.note||"推演已在进行中");pt(`推演已启动（${ge} 轮，可随时暂停）`)}async function Me(){await Lt.stop(),pt("已请求暂停（本轮收尾后停）")}async function Ee(){const ge=await Lt.cmd("export");ge&&ge.download?(window.open(ge.download,"_blank"),pt("全录已生成")):pt(ge&&ge.error||"导出失败")}const it=v0;return(ge,re)=>(N(),O("div",Zv,[s.value?(N(),O("div",{key:0,class:nt(["card arcbar",{bad:s.value.error}])},[v("span",Jv,P(s.value.error?"打不开":"只读"),1),v("div",jv,[v("b",null,"历史局「"+P(s.value.title)+"」",1),s.value.error?de("",!0):(N(),O("span",Qv," · 封存于 "+P(s.value.archivedAt||"—")+" · "+P(s.value.rounds)+" 轮记录",1)),s.value.error?(N(),O("div",ex,[Ne(P(s.value.error),1),re[4]||(re[4]=v("br",null,null,-1)),re[5]||(re[5]=Ne(" 归档读取端点是新加的，正在运行的服务如果还是旧进程就会报「未映射端点」—— 重启 ",-1)),re[6]||(re[6]=v("code",null,"python3 ui/serve.py",-1)),re[7]||(re[7]=Ne(" 后刷新本页即可。 ",-1))])):(N(),O("div",tx," 独立页签 · 与当前局完全隔离：这一页不连 SSE、不轮询、不请求当前局， 当前局那一页照常推演。可以翻推演流与角色状态，不能推演也不能改。 "))]),v("button",{class:"btn btn-ink btn-sm",onClick:re[0]||(re[0]=(...G)=>dt(md)&&dt(md)(...G))},"关闭")],2)):de("",!0),v("div",nx,[v("div",ix,[v("div",sx,[v("div",rx,"推演 · "+P(i.value.title),1),v("div",ax,[v("h2",ox,P(s.value?"已封存":r.value.running?r.value.stage||"推演中…":"待命"),1),r.value.running&&!s.value?(N(),O("span",lx)):de("",!0)])]),s.value?de("",!0):(N(),O(He,{key:0},[r.value.running?(N(),O("button",{key:1,class:"btn btn-paper",onClick:Me},P(r.value.pausing?"正在收尾…":"暂停"),1)):(N(),O("button",{key:0,class:"btn btn-ink",onClick:pe},"开始 / 继续")),v("button",{class:"btn btn-ghost btn-sm",onClick:Ee},"导出全录")],64))]),v("div",cx,[v("div",ux,[v("div",hx,[Ne(P(C.value),1),r.value.running?(N(),O("i",dx)):de("",!0)]),v("div",fx,"当前轮"+P(r.value.running?"（进行中）":""),1)]),v("div",px,[v("div",mx,P(L.value),1),re[8]||(re[8]=v("div",{class:"tl"},"单元进度",-1))]),v("div",gx,[v("div",_x,P(T.value),1),v("div",vx,[re[9]||(re[9]=Ne("均轮耗时",-1)),r.value.avg_est?(N(),O("span",xx,"（首轮估）")):de("",!0)])]),v("div",yx,[v("div",Mx,P(R.value),1),v("div",Sx,[re[10]||(re[10]=Ne("预计剩余",-1)),r.value.rounds_left?(N(),O("span",bx,"（"+P(r.value.rounds_left)+" 轮）",1)):de("",!0)])]),v("div",Ex,[v("div",Tx,[v("span",{class:nt(["pill",p.value[0]]),style:{border:"none",padding:"0",background:"none"}},[re[11]||(re[11]=v("span",{class:"dot"},null,-1)),Ne(P(i.value.gravity||"—"),1)],2),s.value?de("",!0):(N(),O("span",wx,[(N(),O(He,null,ht(M,G=>v("button",{key:G[0],class:nt({on:(r.value.gmode||"medium")===G[0]}),title:G[2],onClick:ve=>S(G[0])},P(G[1]),11,Ax)),64))]))]),v("div",Cx,"引力"+P(s.value?" · 封存时的档位":" · 档位随时可改（下轮生效，不追溯）"),1)]),H.value!==null?(N(),O("div",Rx,[v("div",{class:nt(["tv mono",K(H.value)])},P(H.value),3),v("div",Px,[re[12]||(re[12]=Ne("真人度",-1)),v("span",Dx,"（近"+P(q.value)+"轮·机检基线）",1)])])):de("",!0)]),r.value.running?(N(),O("div",Lx,[v("div",Ix,[v("span",{class:nt(["mono pctn",{bump:D.value}])},P(b.value)+"%",3),v("div",{class:nt(["bar grow",{live:r.value.running}])},[v("i",{style:Sn({width:b.value+"%"})},null,4)],2),r.value.tok_rate?(N(),O("span",Ux,"⚡"+P(r.value.tok_rate)+" tok/s",1)):de("",!0),v("span",{class:nt(["mono clock",{slow:g.value>240}]),style:{flex:"none"}},"本轮 "+P(m(g.value)),3)]),v("div",Nx,[v("span",Fx,P(r.value.stage||"推演中…"),1),r.value.step_total?(N(),O("span",Ox,"主笔 "+P(r.value.step_done)+"/"+P(r.value.step_total),1)):de("",!0)]),r.value.agents&&r.value.agents.length?(N(),O("div",kx,[(N(!0),O(He,null,ht(r.value.agents,G=>(N(),O("span",{key:G,class:nt(["ag",{writing:r.value.agent===G,done:y.value.has(G)}])},[r.value.agent===G?(N(),O("i",Bx)):y.value.has(G)?(N(),O("span",zx,"✓")):de("",!0),Ne(P(G),1)],2))),128)),re[13]||(re[13]=v("span",{class:"mut",style:{"font-size":"11px"}},"本轮主笔（各自隔离的独立 agent）",-1))])):de("",!0),(r.value.live||[]).length?(N(),O("div",Vx,[re[14]||(re[14]=v("div",{class:"kicker",style:{"font-size":"10px","margin-bottom":"5px"}},"实时产出（过审即显）",-1)),qt(n0,{name:"lv",tag:"div"},{default:Fu(()=>[(N(!0),O(He,null,ht(w.value,G=>(N(),O("div",{key:G.at+G.name,class:"live-ln"},[v("span",Hx,P(G.at),1),v("b",Gx,P(G.name),1),v("span",Wx,P(G.text),1)]))),128))]),_:1})])):de("",!0)])):F.value.round?(N(),O("div",Xx,[re[16]||(re[16]=v("span",{class:"hk"},"上轮收在",-1)),v("b",null,P(F.value.baton||F.value.target||"—"),1),re[17]||(re[17]=v("span",{class:"arr"},"→",-1)),re[18]||(re[18]=v("span",{class:"hk"},"下轮由他驱动",-1)),v("span",$x,P(F.value.beats&&F.value.beats.result||F.value.summary||""),1),V.value?(N(),O("span",qx,[...re[15]||(re[15]=[v("span",{class:"dot"},null,-1),Ne("已终局",-1)])])):de("",!0)])):de("",!0),r.value.auto_paused?(N(),O("div",Yx,"⏸ "+P(r.value.err||"已自动暂停"),1)):r.value.err?(N(),O("div",Kx,"⚠ "+P(r.value.err),1)):de("",!0),Z.value?(N(),O("div",Zx,P(Z.value),1)):de("",!0)]),v("div",Jx,[re[19]||(re[19]=v("div",{class:"kicker"},[Ne("角色性格墙 "),v("span",{class:"mut"},"（完整卡司 · 性格底盘 · 原始指数）")],-1)),v("div",jx,[(N(!0),O(He,null,ht(t.value.cast,G=>(N(),O("div",{key:G.name,class:nt(["wcell",{on:e.value===G.name}]),onClick:ve=>{e.value=e.value===G.name?"":G.name,window.dispatchEvent(new CustomEvent("wall-pick",{detail:e.value}))}},[v("div",ey,P(G.name),1),v("div",ty,P(u(G)),1),v("div",ny,P(f(G)),1)],10,Qx))),128))]),v("div",{class:nt(["wall-dock",{empty:!e.value}])},[e.value?(N(),Rn(Gu,{key:0,name:e.value,onClose:re[1]||(re[1]=G=>{e.value="",window.dispatchEvent(new CustomEvent("wall-pick",{detail:""}))})},null,8,["name"])):(N(),O("div",iy,"点任一角色看档案：角色原始指数 · 性格设定 · 推演指标"))],2)]),v("div",sy,[v("div",ry,[v("div",ay,[Ne("推演流 · "+P(a.value.length)+" 轮 ",1),re[20]||(re[20]=v("span",{class:"mut"},"（点开看全文）",-1))]),a.value.length>40?(N(),O("button",{key:0,class:"btn btn-ghost btn-sm",onClick:re[2]||(re[2]=G=>l.value=!l.value)},P(l.value?"收起":"全部 "+a.value.length+" 轮"),1)):de("",!0),v("label",oy,[Qt(v("input",{type:"checkbox","onUpdate:modelValue":re[3]||(re[3]=G=>o.value=G)},null,512),[[Yp,o.value]]),re[21]||(re[21]=Ne(" 最新在前",-1))])]),a.value.length?de("",!0):(N(),O("div",ly,"尚无轮次——回「配置」启动推演")),v("div",cy,[r.value.running&&r.value.round>(F.value.round||0)?(N(),O("article",uy,[v("header",hy,[v("span",dy,"R"+P(r.value.round),1),v("span",fy,[v("b",null,P(r.value.stage||"推演中…"),1)]),v("span",py,[re[22]||(re[22]=v("span",{class:"dot"},null,-1)),Ne("进行中 "+P(b.value)+"%",1)])]),(r.value.live||[]).length?(N(),O("div",my,P((r.value.live.slice(-1)[0]||{}).name)+"："+P((r.value.live.slice(-1)[0]||{}).text),1)):de("",!0)])):de("",!0),(N(!0),O(He,null,ht(c.value,G=>(N(),O("article",{key:G.round,class:"fitem",onClick:ve=>dt(it)(G.round)},[v("header",_y,[v("span",vy,"R"+P(G.round),1),v("span",xy,[v("b",null,P(G.place!=="点击查看"?G.place:G.unit),1)]),typeof G.human=="number"?(N(),O("span",{key:0,class:nt(["hum mono",K(G.human)]),title:"真人度（机检零token评分：病灶命中+语料基线偏差）"},"人 "+P(G.human),3)):de("",!0),G.flat?(N(),O("span",yy,[...re[23]||(re[23]=[v("span",{class:"dot"},null,-1),Ne("平轮",-1)])])):de("",!0),v("span",{class:nt(["pill",(dt(gd)[G.gravity]||[""])[0]])},[re[24]||(re[24]=v("span",{class:"dot"},null,-1)),Ne(P(G.gravity),1)],2)]),G.driver?(N(),O("div",My,[Ne(P(G.driver)+" ",1),re[26]||(re[26]=v("span",{class:"arr"},"→",-1)),Ne(" "+P(G.target)+" ",1),G.baton?(N(),O("span",Sy,[re[25]||(re[25]=Ne("接棒 ",-1)),v("b",null,P(G.baton),1)])):de("",!0)])):de("",!0),G.beats&&G.beats.goal?(N(),O("div",by,[(N(),O(He,null,ht(h,(ve,ye)=>Qt(v("div",{class:"beat",key:ve[0]},[v("span",{class:nt(["bk",{turn:ve[0]==="turn"}])},P(ve[1]),3),v("span",Ey,P(G.beats[ve[0]]),1)]),[[z_,G.beats[ve[0]]]])),64))])):de("",!0),v("p",Ty,P(G.summary),1)],8,gy))),128))])])]))}},Ay=Jn(wy,[["__scopeId","data-v-46fbf1d9"]]),Cy={class:"stack"},Ry={key:0,class:"card pad seal-edge"},Py={class:"kicker",style:{color:"var(--seal)"}},Dy={class:"sub",style:{margin:"8px 0 12px"}},Ly={key:0,class:"turing"},Iy={class:"grow"},Uy={class:"mut"},Ny={key:1,class:"mut",style:{"font-size":"11px","margin-top":"2px"}},Fy={class:"t-acts"},Oy=["disabled"],ky=["disabled"],By={key:1,class:"fixbar"},zy={class:"fx-track"},Vy={class:"mono mut"},Hy={key:2,class:"fixlog"},Gy={class:"mut"},Wy={class:"grid2"},Xy={class:"list"},$y={class:"list"},qy={key:1,class:"card pad"},Yy={class:"kicker"},Ky={key:0,class:"debt mono"},Zy={class:"grid2"},Jy={class:"list"},jy={class:"bar"},Qy={key:0,class:"mut",style:{"font-size":"11px"}},eM={key:1,class:"mut",style:{"font-size":"11px"}},tM={class:"list"},nM={class:"mut",style:{"font-size":"11px"}},iM={key:0},sM={class:"grid3"},rM={class:"card pad-s"},aM={key:0,style:{"margin-top":"12px"}},oM=["href","download"],lM={class:"mut",style:{"font-size":"10.5px"}},cM={key:0,class:"warn-t"},uM={class:"card pad-s"},hM={class:"row",style:{"margin-top":"8px"}},dM=["disabled"],fM={key:0,class:"mut",style:{"margin-top":"8px"}},pM={class:"card pad-s"},mM=["value"],gM=["disabled"],_M={key:0,class:"iv-wait"},vM={key:2,class:"card pad"},xM={class:"q"},yM={class:"a"},MM={class:"mut mono",style:{"font-size":"10.5px"}},SM={__name:"StepReport",setup(n){const e=lt(()=>ae.D||{}),t=lt(()=>ae.auto||{}),i=ns({outline:"",newCast:"",rounds:8,busy:!1,msg:""}),s=ns({who:"",q:"",busy:!1}),r=lt(()=>!!(t.value.repairing||t.value.running)),a=lt(()=>{const g=ae.D||{},_=(g.meta||{}).unitName||"",d=((g.plotLedger||{}).units||{})[_]||{};return{unit:_,mainDebt:d.mainDebt||0,main:(d.main||[]).filter(m=>m&&m.label),subs:(d.subplots||[]).filter(m=>m&&m.label)}}),o={open:"未动",active:"推进中",resolved:"已闭合",setback:"受挫",held:"停滞",deferred:"搁置"},l=g=>o[g]||"未动";async function c(){const g=await Lt.cmd("turing-repair");if(!g||g.error)return pt(g&&g.error||"修复失败");pt(g.note||"修复已开始");const _=Date.now(),d=setInterval(async()=>{if(await $n(),ae.auto&&ae.auto.repairing)Date.now()-_>9e5&&(clearInterval(d),pt("修复超时——查看日志"));else{clearInterval(d);const m=ae.D&&ae.D.outcome&&ae.D.outcome.turing||{};pt(m.prev!=null?`修复完成：${m.prev} → ${m.score}`:"修复完成")}},3e3)}async function u(){pt("复测中…");const g=await Lt.cmd("turing-retest");if(!g||g.error)return pt(g&&g.error||"复测失败");await $n(),pt(`复测完成：${(g.turing||{}).score}/10`)}async function f(){const g=await Lt.cmd("export");if(!g||!g.download)return pt(g&&g.error||"导出失败");const _=document.createElement("a");_.href=g.download,_.download=g.name||"故事全录.txt",document.body.appendChild(_),_.click(),_.remove(),pt("全录已生成并开始下载"),$n()}async function h(){i.busy=!0;const g=await Lt.cmd("continue-story",{outline:i.outline,newCast:i.newCast,rounds:i.rounds});if(i.busy=!1,!g||!g.unit)return pt(g&&g.error||"失败");i.msg=`新单元「${g.unit}」已建（预测 ${g.forecast||"—"} 轮）`+(g.started?"，推演已开始":"，推演已排入队列"),pt(g.started?"续演已开始推演":"续演单元已建"),await $n(),g.started&&ss(3)}async function p(){s.busy=!0;const g=(ae.D&&ae.D.interviews||[]).length,_=await Lt.cmd("interview",{who:s.who,q:s.q,mode:"戏内"});if(_&&_.error)return s.busy=!1,pt(_.error);pt(_&&_.note?_.note:"已排队——答案稍后出现在下方"),s.q="";const d=Date.now(),m=setInterval(async()=>{await $n(),(ae.D&&ae.D.interviews||[]).length>g?(clearInterval(m),s.busy=!1,pt("他答完了——见下方采访记录")):Date.now()-d>18e4&&(clearInterval(m),s.busy=!1,pt("回答超时——稍后手动刷新看看"))},4e3)}return(g,_)=>(N(),O("div",Cy,[e.value.outcome&&e.value.outcome.at?(N(),O("div",Ry,[v("div",Py,"终局清单 · "+P(e.value.outcome.at),1),v("p",Dy,P(e.value.outcome.summary),1),e.value.outcome.turing?(N(),O("div",Ly,[v("span",{class:nt(["t-score mono",e.value.outcome.turing.score>=7?"ok-t":e.value.outcome.turing.score>=5?"mid-t":"low-t"])},[Ne(P(e.value.outcome.turing.score),1),_[5]||(_[5]=v("i",null,"/10",-1))],2),v("div",Iy,[_[6]||(_[6]=v("b",null,"图灵盲测",-1)),v("span",Uy,"（"+P(e.value.outcome.turing.n)+" 段过审回合，鉴别官不知来源）",1),e.value.outcome.turing.prev!=null?(N(),O("span",{key:0,class:nt(["delta mono",e.value.outcome.turing.score>=e.value.outcome.turing.prev?"up":"down"])}," 修复前 "+P(e.value.outcome.turing.prev)+" → "+P(e.value.outcome.turing.score),3)):de("",!0),(e.value.outcome.turing.tells||[]).length?(N(),O("div",Ny," 破绽："+P(e.value.outcome.turing.tells.join("；")),1)):de("",!0)]),v("div",Fy,[v("button",{class:"btn btn-seal btn-s",disabled:r.value,onClick:c},P(t.value.repairing?"修复中…":"按破绽修复"),9,Oy),v("button",{class:"btn btn-s",disabled:r.value,onClick:u},"重测",8,ky)])])):de("",!0),t.value.repairing?(N(),O("div",By,[v("div",zy,[v("div",{class:"fx-fill",style:Sn({width:(t.value.pct||0)+"%"})},null,4)]),v("span",Vy,P(t.value.stage||"修复中…")+" · "+P(t.value.pct||0)+"%",1)])):de("",!0),(e.value.outcome.turingHistory||[]).length?(N(),O("div",Hy,[_[7]||(_[7]=v("div",{class:"kicker"},"修复批次",-1)),(N(!0),O(He,null,ht((e.value.outcome.turingHistory||[]).slice().reverse(),(d,m)=>(N(),O("div",{key:"H"+m,class:"fx-row mono"},[v("span",Gy,P(d.at),1),v("span",null,P(d.rounds)+" 轮 · 定点 "+P(d.fixes)+" 处",1),v("span",{class:nt((d.after||0)>=(d.before||0)?"up":"down")},P(d.before==null?"—":d.before)+" → "+P(d.after==null?"—":d.after),3)]))),128))])):de("",!0),v("div",Wy,[v("div",null,[_[8]||(_[8]=v("div",{class:"kicker"},"各人下场",-1)),v("ul",Xy,[(N(!0),O(He,null,ht(e.value.outcome.castFates||[],d=>(N(),O("li",{key:d.name},[v("b",null,P(d.name),1),Ne("："+P(d.fate),1)]))),128))])]),v("div",null,[_[9]||(_[9]=v("div",{class:"kicker"},"大事件 / 哑弹去向",-1)),v("ul",$y,[(N(!0),O(He,null,ht(e.value.outcome.major||[],(d,m)=>(N(),O("li",{key:"M"+m},"◆ "+P(d),1))),128)),(N(!0),O(He,null,ht(e.value.outcome.minor||[],(d,m)=>(N(),O("li",{key:"m"+m,class:"mut"},"◇ "+P(d),1))),128))])])])])):de("",!0),a.value.main.length||a.value.subs.length?(N(),O("div",qy,[v("div",Yy,"线索账 · 单元「"+P(a.value.unit)+"」",1),a.value.mainDebt>=3?(N(),O("div",Ky," 主线债 "+P(a.value.mainDebt)+" 轮——连续多轮没推进主线节点，下轮场记会优先主线 ",1)):de("",!0),v("div",Zy,[v("div",null,[_[10]||(_[10]=v("div",{class:"kicker"},"主线节点",-1)),v("ul",Jy,[(N(!0),O(He,null,ht(a.value.main,d=>(N(),O("li",{key:d.id},[v("span",{class:nt(["pill","st-"+(d.status||"open")])},P(l(d.status)),3),v("b",null,P(d.label),1),v("div",jy,[v("div",{class:"fill",style:Sn({width:(d.progress||0)+"%"})},null,4)]),(d.evidence||[]).length?(N(),O("div",Qy," 证据："+P(d.evidence[d.evidence.length-1]),1)):de("",!0),(d.costs||[]).length?(N(),O("div",eM," 代价："+P(d.costs[d.costs.length-1]),1)):de("",!0)]))),128))])]),v("div",null,[_[11]||(_[11]=v("div",{class:"kicker"},"支线 / 信息差",-1)),v("ul",tM,[(N(!0),O(He,null,ht(a.value.subs,d=>(N(),O("li",{key:d.id},[v("span",{class:nt(["pill","st-"+(d.status||"open")])},P(l(d.status)),3),v("b",null,P(d.label),1),v("div",nM,[Ne(" 主人："+P((d.owners||[]).join("、")||"待绑定")+" · 下次触发："+P(d.nextTrigger||"未定")+" ",1),d.lastRound?(N(),O("span",iM," · 上次动于 R"+P(d.lastRound),1)):de("",!0)])]))),128))])])])])):de("",!0),v("div",sM,[v("div",rM,[_[13]||(_[13]=v("div",{class:"h2"},"生成故事全录",-1)),_[14]||(_[14]=v("p",{class:"mut"},"全部轮次叠加为一份 .txt——逐轮行为/对话/心理＋故事讲解，直接交给任意 AI 扩写成小说。",-1)),v("button",{class:"btn btn-ink",style:{"margin-top":"8px"},onClick:f},"生成并下载"),(e.value.exports||[]).length?(N(),O("div",aM,[_[12]||(_[12]=v("div",{class:"kicker"},"已生成",-1)),(N(!0),O(He,null,ht(e.value.exports,d=>(N(),O("div",{key:d.path||d.name,class:"dlwrap"},[v("a",{class:"dl ellip",href:"/"+d.path,download:d.name},"↓ "+P(d.name),9,oM),v("div",lM,[Ne(P(d.at),1),d.missing?(N(),O("span",cM," · "+P(d.note),1)):de("",!0)])]))),128))])):de("",!0)]),v("div",uM,[_[16]||(_[16]=v("div",{class:"h2"},"继续故事推演",-1)),_[17]||(_[17]=v("p",{class:"mut"},"在原故事层开新单元：世界与既有角色锁定，只可新增。",-1)),Qt(v("textarea",{"onUpdate:modelValue":_[0]||(_[0]=d=>i.outline=d),class:"field",placeholder:"新单元细纲（必填）：这一段要发生什么、到哪收束"},null,512),[[Dn,i.outline]]),Qt(v("input",{"onUpdate:modelValue":_[1]||(_[1]=d=>i.newCast=d),class:"field",style:{"margin-top":"8px"},placeholder:"新增角色（可选，顿号分隔）"},null,512),[[Dn,i.newCast]]),v("div",hM,[Qt(v("input",{"onUpdate:modelValue":_[2]||(_[2]=d=>i.rounds=d),type:"number",min:"1",max:"480",class:"field mono",style:{width:"90px"}},null,512),[[Dn,i.rounds,void 0,{number:!0}]]),_[15]||(_[15]=v("span",{class:"mut grow"},"运行轮数",-1)),v("button",{class:"btn btn-seal btn-sm",disabled:!i.outline||i.busy,onClick:h},"开推",8,dM)]),i.msg?(N(),O("div",fM,P(i.msg),1)):de("",!0)]),v("div",pM,[_[20]||(_[20]=v("div",{class:"h2"},"采访角色",-1)),_[21]||(_[21]=v("p",{class:"mut"},"戏内问话——他会用自己的声纹回答，也会现场编谎。",-1)),Qt(v("select",{"onUpdate:modelValue":_[3]||(_[3]=d=>s.who=d),class:"field"},[_[18]||(_[18]=v("option",{value:"",disabled:""},"选一位角色…",-1)),(N(!0),O(He,null,ht(e.value.cast,d=>(N(),O("option",{key:d.name,value:d.name},P(d.name)+"（"+P(d.profile&&d.profile.base||d.role||"性格待解析")+"）",9,mM))),128))],512),[[l0,s.who]]),Qt(v("textarea",{"onUpdate:modelValue":_[4]||(_[4]=d=>s.q=d),class:"field",style:{"margin-top":"8px"},placeholder:"你想问他什么？"},null,512),[[Dn,s.q]]),v("button",{class:"btn btn-ink btn-sm",style:{"margin-top":"8px"},disabled:!s.who||!s.q||s.busy,onClick:p},P(s.busy?"回答中…":"发问"),9,gM),s.busy?(N(),O("div",_M,[_[19]||(_[19]=v("i",{class:"wdot3"},null,-1)),Ne(P(s.who)+" 正在组织回答（约 30-60 秒）…",1)])):de("",!0)])]),(e.value.interviews||[]).length?(N(),O("div",vM,[_[22]||(_[22]=v("div",{class:"kicker"},"采访记录",-1)),(N(!0),O(He,null,ht(e.value.interviews.slice(0,8),(d,m)=>(N(),O("div",{key:m,class:"qa"},[v("div",xM,[v("b",null,"问 "+P(d.who),1),Ne("："+P(d.q),1)]),v("div",yM,P(d.a),1),v("div",MM,P(d.at)+" · "+P(d.mode),1)]))),128))])):de("",!0)]))}},bM=Jn(SM,[["__scopeId","data-v-fdc0ee26"]]);const Wu="185",hr={ROTATE:0,DOLLY:1,PAN:2},sr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},EM=0,vd=1,TM=2,xo=1,Zp=2,Hr=3,rs=0,bn=1,ci=2,pi=0,dr=1,jt=2,xd=3,yd=4,wM=5,ys=100,AM=101,CM=102,RM=103,PM=104,DM=200,LM=201,IM=202,UM=203,Cc=204,Rc=205,NM=206,FM=207,OM=208,kM=209,BM=210,zM=211,VM=212,HM=213,GM=214,Pc=0,Dc=1,Lc=2,vr=3,Ic=4,Uc=5,Nc=6,Fc=7,Jp=0,WM=1,XM=2,mi=0,Xu=1,$u=2,qu=3,ul=4,Yu=5,Ku=6,Zu=7,jp=300,Ds=301,xr=302,yo=303,Rl=304,hl=306,zo=1e3,Ci=1001,Oc=1002,en=1003,$M=1004,Ca=1005,un=1006,Pl=1007,bs=1008,Ln=1009,Qp=1010,em=1011,oa=1012,Ju=1013,_i=1014,hi=1015,En=1016,ju=1017,Qu=1018,la=1020,tm=35902,nm=35899,im=1021,sm=1022,qn=1023,Ui=1026,Es=1027,rm=1028,eh=1029,Ls=1030,th=1031,nh=1033,Mo=33776,So=33777,bo=33778,Eo=33779,kc=35840,Bc=35841,zc=35842,Vc=35843,Hc=36196,Gc=37492,Wc=37496,Xc=37488,$c=37489,Vo=37490,qc=37491,Yc=37808,Kc=37809,Zc=37810,Jc=37811,jc=37812,Qc=37813,eu=37814,tu=37815,nu=37816,iu=37817,su=37818,ru=37819,au=37820,ou=37821,lu=36492,cu=36494,uu=36495,hu=36283,du=36284,Ho=36285,fu=36286,qM=3200,pu=0,YM=1,ji="",on="srgb",Go="srgb-linear",Wo="linear",xt="srgb",Os=7680,Md=519,KM=512,ZM=513,JM=514,ih=515,jM=516,QM=517,sh=518,eS=519,mu=35044,Sd="300 es",di=2e3,ca=2001;function tS(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Xo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function nS(){const n=Xo("canvas");return n.style.display="block",n}const bd={};function $o(...n){const e="THREE."+n.shift();console.log(e,...n)}function am(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Qe(...n){n=am(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function gt(...n){n=am(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function fr(...n){const e=n.join(" ");e in bd||(bd[e]=!0,Qe(...n))}function iS(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const sS={[Pc]:Dc,[Lc]:Nc,[Ic]:Fc,[vr]:Uc,[Dc]:Pc,[Nc]:Lc,[Fc]:Ic,[Uc]:vr};class ls{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],To=Math.PI/180,gu=180/Math.PI;function ts(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[t&63|128]+sn[t>>8&255]+"-"+sn[t>>16&255]+sn[t>>24&255]+sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]).toLowerCase()}function ft(n,e,t){return Math.max(e,Math.min(t,n))}function rS(n,e){return(n%e+e)%e}function Dl(n,e,t){return(1-t)*n+t*e}function ui(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const aS={DEG2RAD:To},fh=class fh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ft(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ft(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};fh.prototype.isVector2=!0;let Oe=fh;class as{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3],h=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(f!==_||l!==h||c!==p||u!==g){let d=l*h+c*p+u*g+f*_;d<0&&(h=-h,p=-p,g=-g,_=-_,d=-d);let m=1-o;if(d<.9995){const T=Math.acos(d),R=Math.sin(T);m=Math.sin(m*T)/R,o=Math.sin(o*T)/R,l=l*m+h*o,c=c*m+p*o,u=u*m+g*o,f=f*m+_*o}else{l=l*m+h*o,c=c*m+p*o,u=u*m+g*o,f=f*m+_*o;const T=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=T,c*=T,u*=T,f*=T}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[a],h=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+u*f+l*p-c*h,e[t+1]=l*g+u*h+c*f-o*p,e[t+2]=c*g+u*p+o*h-l*f,e[t+3]=u*g-o*f-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),f=o(r/2),h=l(i/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"YXZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"ZXY":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"ZYX":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"YZX":this._x=h*u*f+c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f-h*p*g;break;case"XZY":this._x=h*u*f-c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f+h*p*g;break;default:Qe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+o+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ft(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ph=class ph{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ed.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ed.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-r*f,this.z=s+l*f+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ft(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ll.copy(this).projectOnVector(e),this.sub(Ll)}reflect(e){return this.sub(Ll.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ft(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ph.prototype.isVector3=!0;let B=ph;const Ll=new B,Ed=new as,mh=class mh{constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],p=i[5],g=i[8],_=s[0],d=s[3],m=s[6],T=s[1],R=s[4],M=s[7],S=s[2],b=s[5],D=s[8];return r[0]=a*_+o*T+l*S,r[3]=a*d+o*R+l*b,r[6]=a*m+o*M+l*D,r[1]=c*_+u*T+f*S,r[4]=c*d+u*R+f*b,r[7]=c*m+u*M+f*D,r[2]=h*_+p*T+g*S,r[5]=h*d+p*R+g*b,r[8]=h*m+p*M+g*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*r,p=c*r-a*l,g=t*f+i*h+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(s*c-u*i)*_,e[2]=(o*i-s*a)*_,e[3]=h*_,e[4]=(u*t-s*l)*_,e[5]=(s*r-o*t)*_,e[6]=p*_,e[7]=(i*l-c*t)*_,e[8]=(a*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return fr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Il.makeScale(e,t)),this}rotate(e){return fr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Il.makeRotation(-e)),this}translate(e,t){return fr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Il.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};mh.prototype.isMatrix3=!0;let st=mh;const Il=new st,Td=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wd=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function oS(){const n={enabled:!0,workingColorSpace:Go,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===xt&&(s.r=Pi(s.r),s.g=Pi(s.g),s.b=Pi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===xt&&(s.r=pr(s.r),s.g=pr(s.g),s.b=pr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ji?Wo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return fr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return fr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Go]:{primaries:e,whitePoint:i,transfer:Wo,toXYZ:Td,fromXYZ:wd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:on},outputColorSpaceConfig:{drawingBufferColorSpace:on}},[on]:{primaries:e,whitePoint:i,transfer:xt,toXYZ:Td,fromXYZ:wd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:on}}}),n}const mt=oS();function Pi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function pr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ks;class lS{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ks===void 0&&(ks=Xo("canvas")),ks.width=e.width,ks.height=e.height;const s=ks.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ks}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Xo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Pi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Pi(t[i]/255)*255):t[i]=Pi(t[i]);return{data:t,width:e.width,height:e.height}}else return Qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let cS=0;class rh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cS++}),this.uuid=ts(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ul(s[a].image)):r.push(Ul(s[a]))}else r=Ul(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Ul(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?lS.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Qe("Texture: Unable to serialize Texture."),{})}let uS=0;const Nl=new B;class dn extends ls{constructor(e=dn.DEFAULT_IMAGE,t=dn.DEFAULT_MAPPING,i=Ci,s=Ci,r=un,a=bs,o=qn,l=Ln,c=dn.DEFAULT_ANISOTROPY,u=ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:uS++}),this.uuid=ts(),this.name="",this.source=new rh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Nl).x}get height(){return this.source.getSize(Nl).y}get depth(){return this.source.getSize(Nl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Qe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zo:e.x=e.x-Math.floor(e.x);break;case Ci:e.x=e.x<0?0:1;break;case Oc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zo:e.y=e.y-Math.floor(e.y);break;case Ci:e.y=e.y<0?0:1;break;case Oc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=jp;dn.DEFAULT_ANISOTROPY=1;const gh=class gh{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],g=l[9],_=l[2],d=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-d)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+d)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(c+1)/2,M=(p+1)/2,S=(m+1)/2,b=(u+h)/4,D=(f+_)/4,y=(g+d)/4;return R>M&&R>S?R<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(R),s=b/i,r=D/i):M>S?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=b/s,r=y/s):S<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),i=D/r,s=y/r),this.set(i,s,r,t),this}let T=Math.sqrt((d-g)*(d-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(T)<.001&&(T=1),this.x=(d-g)/T,this.y=(f-_)/T,this.z=(h-u)/T,this.w=Math.acos((c+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this.w=ft(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this.w=ft(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ft(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};gh.prototype.isVector4=!0;let Nt=gh;class hS extends ls{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Nt(0,0,e,t),this.scissorTest=!1,this.viewport=new Nt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new dn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:un,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new rh(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xn extends hS{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class om extends dn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=en,this.minFilter=en,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class dS extends dn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=en,this.minFilter=en,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Zo=class Zo{constructor(e,t,i,s,r,a,o,l,c,u,f,h,p,g,_,d){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,f,h,p,g,_,d)}set(e,t,i,s,r,a,o,l,c,u,f,h,p,g,_,d){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=f,m[14]=h,m[3]=p,m[7]=g,m[11]=_,m[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Zo().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/Bs.setFromMatrixColumn(e,0).length(),r=1/Bs.setFromMatrixColumn(e,1).length(),a=1/Bs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const h=a*u,p=a*f,g=o*u,_=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=p+g*c,t[5]=h-_*c,t[9]=-o*l,t[2]=_-h*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,p=l*f,g=c*u,_=c*f;t[0]=h+_*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=_+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,p=l*f,g=c*u,_=c*f;t[0]=h-_*o,t[4]=-a*f,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=_-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,p=a*f,g=o*u,_=o*f;t[0]=l*u,t[4]=g*c-p,t[8]=h*c+_,t[1]=l*f,t[5]=_*c+h,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,p=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=_-h*f,t[8]=g*f+p,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*f+g,t[10]=h-_*f}else if(e.order==="XZY"){const h=a*l,p=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+_,t[5]=a*u,t[9]=p*f-g,t[2]=g*f-p,t[6]=o*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(fS,e,pS)}lookAt(e,t,i){const s=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),zi.crossVectors(i,An),zi.lengthSq()===0&&(Math.abs(i.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),zi.crossVectors(i,An)),zi.normalize(),Ra.crossVectors(An,zi),s[0]=zi.x,s[4]=Ra.x,s[8]=An.x,s[1]=zi.y,s[5]=Ra.y,s[9]=An.y,s[2]=zi.z,s[6]=Ra.z,s[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],p=i[13],g=i[2],_=i[6],d=i[10],m=i[14],T=i[3],R=i[7],M=i[11],S=i[15],b=s[0],D=s[4],y=s[8],w=s[12],F=s[1],C=s[5],L=s[9],X=s[13],q=s[2],H=s[6],K=s[10],V=s[14],Z=s[3],ne=s[7],pe=s[11],Me=s[15];return r[0]=a*b+o*F+l*q+c*Z,r[4]=a*D+o*C+l*H+c*ne,r[8]=a*y+o*L+l*K+c*pe,r[12]=a*w+o*X+l*V+c*Me,r[1]=u*b+f*F+h*q+p*Z,r[5]=u*D+f*C+h*H+p*ne,r[9]=u*y+f*L+h*K+p*pe,r[13]=u*w+f*X+h*V+p*Me,r[2]=g*b+_*F+d*q+m*Z,r[6]=g*D+_*C+d*H+m*ne,r[10]=g*y+_*L+d*K+m*pe,r[14]=g*w+_*X+d*V+m*Me,r[3]=T*b+R*F+M*q+S*Z,r[7]=T*D+R*C+M*H+S*ne,r[11]=T*y+R*L+M*K+S*pe,r[15]=T*w+R*X+M*V+S*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],p=e[14],g=e[3],_=e[7],d=e[11],m=e[15],T=l*p-c*h,R=o*p-c*f,M=o*h-l*f,S=a*p-c*u,b=a*h-l*u,D=a*f-o*u;return t*(_*T-d*R+m*M)-i*(g*T-d*S+m*b)+s*(g*R-_*S+m*D)-r*(g*M-_*b+d*D)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],p=e[11],g=e[12],_=e[13],d=e[14],m=e[15],T=t*o-i*a,R=t*l-s*a,M=t*c-r*a,S=i*l-s*o,b=i*c-r*o,D=s*c-r*l,y=u*_-f*g,w=u*d-h*g,F=u*m-p*g,C=f*d-h*_,L=f*m-p*_,X=h*m-p*d,q=T*X-R*L+M*C+S*F-b*w+D*y;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/q;return e[0]=(o*X-l*L+c*C)*H,e[1]=(s*L-i*X-r*C)*H,e[2]=(_*D-d*b+m*S)*H,e[3]=(h*b-f*D-p*S)*H,e[4]=(l*F-a*X-c*w)*H,e[5]=(t*X-s*F+r*w)*H,e[6]=(d*M-g*D-m*R)*H,e[7]=(u*D-h*M+p*R)*H,e[8]=(a*L-o*F+c*y)*H,e[9]=(i*F-t*L-r*y)*H,e[10]=(g*b-_*M+m*T)*H,e[11]=(f*M-u*b-p*T)*H,e[12]=(o*w-a*C-l*y)*H,e[13]=(t*C-i*w+s*y)*H,e[14]=(_*R-g*S-d*T)*H,e[15]=(u*S-f*R+h*T)*H,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,f=o+o,h=r*c,p=r*u,g=r*f,_=a*u,d=a*f,m=o*f,T=l*c,R=l*u,M=l*f,S=i.x,b=i.y,D=i.z;return s[0]=(1-(_+m))*S,s[1]=(p+M)*S,s[2]=(g-R)*S,s[3]=0,s[4]=(p-M)*b,s[5]=(1-(h+m))*b,s[6]=(d+T)*b,s[7]=0,s[8]=(g+R)*D,s[9]=(d-T)*D,s[10]=(1-(h+_))*D,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Bs.set(s[0],s[1],s[2]).length();const o=Bs.set(s[4],s[5],s[6]).length(),l=Bs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Gn.copy(this);const c=1/a,u=1/o,f=1/l;return Gn.elements[0]*=c,Gn.elements[1]*=c,Gn.elements[2]*=c,Gn.elements[4]*=u,Gn.elements[5]*=u,Gn.elements[6]*=u,Gn.elements[8]*=f,Gn.elements[9]*=f,Gn.elements[10]*=f,t.setFromRotationMatrix(Gn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=di,l=!1){const c=this.elements,u=2*r/(t-e),f=2*r/(i-s),h=(t+e)/(t-e),p=(i+s)/(i-s);let g,_;if(l)g=r/(a-r),_=a*r/(a-r);else if(o===di)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===ca)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=di,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-s),h=-(t+e)/(t-e),p=-(i+s)/(i-s);let g,_;if(l)g=1/(a-r),_=a/(a-r);else if(o===di)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===ca)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Zo.prototype.isMatrix4=!0;let It=Zo;const Bs=new B,Gn=new It,fS=new B(0,0,0),pS=new B(1,1,1),zi=new B,Ra=new B,An=new B,Ad=new It,Cd=new as;class os{constructor(e=0,t=0,i=0,s=os.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ft(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ft(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ad.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ad,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cd.setFromEuler(this),this.setFromQuaternion(Cd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}os.DEFAULT_ORDER="XYZ";class ah{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let mS=0;const Rd=new B,zs=new as,xi=new It,Pa=new B,Pr=new B,gS=new B,_S=new as,Pd=new B(1,0,0),Dd=new B(0,1,0),Ld=new B(0,0,1),Id={type:"added"},vS={type:"removed"},Vs={type:"childadded",child:null},Fl={type:"childremoved",child:null};class tn extends ls{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mS++}),this.uuid=ts(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const e=new B,t=new os,i=new as,s=new B(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new It},normalMatrix:{value:new st}}),this.matrix=new It,this.matrixWorld=new It,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ah,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zs.setFromAxisAngle(e,t),this.quaternion.multiply(zs),this}rotateOnWorldAxis(e,t){return zs.setFromAxisAngle(e,t),this.quaternion.premultiply(zs),this}rotateX(e){return this.rotateOnAxis(Pd,e)}rotateY(e){return this.rotateOnAxis(Dd,e)}rotateZ(e){return this.rotateOnAxis(Ld,e)}translateOnAxis(e,t){return Rd.copy(e).applyQuaternion(this.quaternion),this.position.add(Rd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pd,e)}translateY(e){return this.translateOnAxis(Dd,e)}translateZ(e){return this.translateOnAxis(Ld,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Pa.copy(e):Pa.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xi.lookAt(Pr,Pa,this.up):xi.lookAt(Pa,Pr,this.up),this.quaternion.setFromRotationMatrix(xi),s&&(xi.extractRotation(s.matrixWorld),zs.setFromRotationMatrix(xi),this.quaternion.premultiply(zs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(gt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Id),Vs.child=e,this.dispatchEvent(Vs),Vs.child=null):gt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(vS),Fl.child=e,this.dispatchEvent(Fl),Fl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Id),Vs.child=e,this.dispatchEvent(Vs),Vs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,e,gS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,_S,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}tn.DEFAULT_UP=new B(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class kn extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const xS={type:"move"};class Ol{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const d=t.getJointPose(_,i),m=this._getHandJoint(c,_);d!==null&&(m.matrix.fromArray(d.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=d.radius),m.visible=d!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(xS)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new kn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const lm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},Da={h:0,s:0,l:0};function kl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ye{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=on){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,mt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=mt.workingColorSpace){return this.r=e,this.g=t,this.b=i,mt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=mt.workingColorSpace){if(e=rS(e,1),t=ft(t,0,1),i=ft(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=kl(a,r,e+1/3),this.g=kl(a,r,e),this.b=kl(a,r,e-1/3)}return mt.colorSpaceToWorking(this,s),this}setStyle(e,t=on){function i(r){r!==void 0&&parseFloat(r)<1&&Qe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Qe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=on){const i=lm[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}copyLinearToSRGB(e){return this.r=pr(e.r),this.g=pr(e.g),this.b=pr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=on){return mt.workingToColorSpace(rn.copy(this),e),Math.round(ft(rn.r*255,0,255))*65536+Math.round(ft(rn.g*255,0,255))*256+Math.round(ft(rn.b*255,0,255))}getHexString(e=on){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=mt.workingColorSpace){mt.workingToColorSpace(rn.copy(this),t);const i=rn.r,s=rn.g,r=rn.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=mt.workingColorSpace){return mt.workingToColorSpace(rn.copy(this),t),e.r=rn.r,e.g=rn.g,e.b=rn.b,e}getStyle(e=on){mt.workingToColorSpace(rn.copy(this),e);const t=rn.r,i=rn.g,s=rn.b;return e!==on?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Vi),this.setHSL(Vi.h+e,Vi.s+t,Vi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Vi),e.getHSL(Da);const i=Dl(Vi.h,Da.h,t),s=Dl(Vi.s,Da.s,t),r=Dl(Vi.l,Da.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const rn=new Ye;Ye.NAMES=lm;class oh{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ye(e),this.density=t}clone(){return new oh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class yS extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new os,this.environmentIntensity=1,this.environmentRotation=new os,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Wn=new B,yi=new B,Bl=new B,Mi=new B,Hs=new B,Gs=new B,Ud=new B,zl=new B,Vl=new B,Hl=new B,Gl=new Nt,Wl=new Nt,Xl=new Nt;class zn{constructor(e=new B,t=new B,i=new B){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Wn.subVectors(e,t),s.cross(Wn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Wn.subVectors(s,t),yi.subVectors(i,t),Bl.subVectors(e,t);const a=Wn.dot(Wn),o=Wn.dot(yi),l=Wn.dot(Bl),c=yi.dot(yi),u=yi.dot(Bl),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const h=1/f,p=(c*l-o*u)*h,g=(a*u-o*l)*h;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Mi)===null?!1:Mi.x>=0&&Mi.y>=0&&Mi.x+Mi.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Mi.x),l.addScaledVector(a,Mi.y),l.addScaledVector(o,Mi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Gl.setScalar(0),Wl.setScalar(0),Xl.setScalar(0),Gl.fromBufferAttribute(e,t),Wl.fromBufferAttribute(e,i),Xl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Gl,r.x),a.addScaledVector(Wl,r.y),a.addScaledVector(Xl,r.z),a}static isFrontFacing(e,t,i,s){return Wn.subVectors(i,t),yi.subVectors(e,t),Wn.cross(yi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wn.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),Wn.cross(yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return zn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return zn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return zn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return zn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return zn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Hs.subVectors(s,i),Gs.subVectors(r,i),zl.subVectors(e,i);const l=Hs.dot(zl),c=Gs.dot(zl);if(l<=0&&c<=0)return t.copy(i);Vl.subVectors(e,s);const u=Hs.dot(Vl),f=Gs.dot(Vl);if(u>=0&&f<=u)return t.copy(s);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Hs,a);Hl.subVectors(e,r);const p=Hs.dot(Hl),g=Gs.dot(Hl);if(g>=0&&p<=g)return t.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Gs,o);const d=u*g-p*f;if(d<=0&&f-u>=0&&p-g>=0)return Ud.subVectors(r,s),o=(f-u)/(f-u+(p-g)),t.copy(s).addScaledVector(Ud,o);const m=1/(d+_+h);return a=_*m,o=h*m,t.copy(i).addScaledVector(Hs,a).addScaledVector(Gs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ga{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Xn):Xn.fromBufferAttribute(r,a),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),La.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),La.copy(i.boundingBox)),La.applyMatrix4(e.matrixWorld),this.union(La)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Dr),Ia.subVectors(this.max,Dr),Ws.subVectors(e.a,Dr),Xs.subVectors(e.b,Dr),$s.subVectors(e.c,Dr),Hi.subVectors(Xs,Ws),Gi.subVectors($s,Xs),ps.subVectors(Ws,$s);let t=[0,-Hi.z,Hi.y,0,-Gi.z,Gi.y,0,-ps.z,ps.y,Hi.z,0,-Hi.x,Gi.z,0,-Gi.x,ps.z,0,-ps.x,-Hi.y,Hi.x,0,-Gi.y,Gi.x,0,-ps.y,ps.x,0];return!$l(t,Ws,Xs,$s,Ia)||(t=[1,0,0,0,1,0,0,0,1],!$l(t,Ws,Xs,$s,Ia))?!1:(Ua.crossVectors(Hi,Gi),t=[Ua.x,Ua.y,Ua.z],$l(t,Ws,Xs,$s,Ia))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Si=[new B,new B,new B,new B,new B,new B,new B,new B],Xn=new B,La=new ga,Ws=new B,Xs=new B,$s=new B,Hi=new B,Gi=new B,ps=new B,Dr=new B,Ia=new B,Ua=new B,ms=new B;function $l(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){ms.fromArray(n,r);const o=s.x*Math.abs(ms.x)+s.y*Math.abs(ms.y)+s.z*Math.abs(ms.z),l=e.dot(ms),c=t.dot(ms),u=i.dot(ms);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Xt=new B,Na=new Oe;let MS=0;class kt extends ls{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:MS++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=mu,this.updateRanges=[],this.gpuType=hi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Na.fromBufferAttribute(this,t),Na.applyMatrix3(e),this.setXY(t,Na.x,Na.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix3(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ui(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ui(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ui(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ui(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ui(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==mu&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class cm extends kt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class um extends kt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Wt extends kt{constructor(e,t,i){super(new Float32Array(e),t,i)}}const SS=new ga,Lr=new B,ql=new B;class _a{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):SS.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lr.subVectors(e,this.center);const t=Lr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Lr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ql.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lr.copy(e.center).add(ql)),this.expandByPoint(Lr.copy(e.center).sub(ql))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let bS=0;const On=new It,Yl=new tn,qs=new B,Cn=new ga,Ir=new ga,Zt=new B;class Ut extends ls{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bS++}),this.uuid=ts(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(tS(e)?um:cm)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new st().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return On.makeRotationFromQuaternion(e),this.applyMatrix4(On),this}rotateX(e){return On.makeRotationX(e),this.applyMatrix4(On),this}rotateY(e){return On.makeRotationY(e),this.applyMatrix4(On),this}rotateZ(e){return On.makeRotationZ(e),this.applyMatrix4(On),this}translate(e,t,i){return On.makeTranslation(e,t,i),this.applyMatrix4(On),this}scale(e,t,i){return On.makeScale(e,t,i),this.applyMatrix4(On),this}lookAt(e){return Yl.lookAt(e),Yl.updateMatrix(),this.applyMatrix4(Yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qs).negate(),this.translate(qs.x,qs.y,qs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Wt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ga);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){gt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&gt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _a);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){gt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Ir.setFromBufferAttribute(o),this.morphTargetsRelative?(Zt.addVectors(Cn.min,Ir.min),Cn.expandByPoint(Zt),Zt.addVectors(Cn.max,Ir.max),Cn.expandByPoint(Zt)):(Cn.expandByPoint(Ir.min),Cn.expandByPoint(Ir.max))}Cn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Zt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Zt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Zt.fromBufferAttribute(o,c),l&&(qs.fromBufferAttribute(e,c),Zt.add(qs)),s=Math.max(s,i.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&gt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){gt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new kt(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new B,l[y]=new B;const c=new B,u=new B,f=new B,h=new Oe,p=new Oe,g=new Oe,_=new B,d=new B;function m(y,w,F){c.fromBufferAttribute(i,y),u.fromBufferAttribute(i,w),f.fromBufferAttribute(i,F),h.fromBufferAttribute(r,y),p.fromBufferAttribute(r,w),g.fromBufferAttribute(r,F),u.sub(c),f.sub(c),p.sub(h),g.sub(h);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(C),d.copy(f).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(C),o[y].add(_),o[w].add(_),o[F].add(_),l[y].add(d),l[w].add(d),l[F].add(d))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let y=0,w=T.length;y<w;++y){const F=T[y],C=F.start,L=F.count;for(let X=C,q=C+L;X<q;X+=3)m(e.getX(X+0),e.getX(X+1),e.getX(X+2))}const R=new B,M=new B,S=new B,b=new B;function D(y){S.fromBufferAttribute(s,y),b.copy(S);const w=o[y];R.copy(w),R.sub(S.multiplyScalar(S.dot(w))).normalize(),M.crossVectors(b,w);const C=M.dot(l[y])<0?-1:1;a.setXYZW(y,R.x,R.y,R.z,C)}for(let y=0,w=T.length;y<w;++y){const F=T[y],C=F.start,L=F.count;for(let X=C,q=C+L;X<q;X+=3)D(e.getX(X+0)),D(e.getX(X+1)),D(e.getX(X+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new kt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const s=new B,r=new B,a=new B,o=new B,l=new B,c=new B,u=new B,f=new B;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),_=e.getX(h+1),d=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,d),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,d),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(d,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Zt.fromBufferAttribute(e,t),Zt.normalize(),e.setXYZ(t,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let p=0,g=0;for(let _=0,d=l.length;_<d;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*u;for(let m=0;m<u;m++)h[g++]=c[p++]}return new kt(h,u,f)}if(this.index===null)return Qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ut,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],p=e(h,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],f=r[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ES{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=mu,this.updateRanges=[],this.version=0,this.uuid=ts()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ts()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ts()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const fn=new B;class qo{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.applyMatrix4(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.applyNormalMatrix(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.transformDirection(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=ui(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ui(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ui(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ui(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ui(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){$o("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new kt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new qo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){$o("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let TS=0;class cs extends ls{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:TS++}),this.uuid=ts(),this.name="",this.type="Material",this.blending=dr,this.side=rs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cc,this.blendDst=Rc,this.blendEquation=ys,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Md,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Os,this.stencilZFail=Os,this.stencilZPass=Os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Qe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==dr&&(i.blending=this.blending),this.side!==rs&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Cc&&(i.blendSrc=this.blendSrc),this.blendDst!==Rc&&(i.blendDst=this.blendDst),this.blendEquation!==ys&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==vr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Md&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Os&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Os&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Os&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ye().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Oe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Oe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ms extends cs{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ys;const Ur=new B,Ks=new B,Zs=new B,Js=new Oe,Nr=new Oe,hm=new It,Fa=new B,Fr=new B,Oa=new B,Nd=new Oe,Kl=new Oe,Fd=new Oe;class nr extends tn{constructor(e=new Ms){if(super(),this.isSprite=!0,this.type="Sprite",Ys===void 0){Ys=new Ut;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new ES(t,5);Ys.setIndex([0,1,2,0,2,3]),Ys.setAttribute("position",new qo(i,3,0,!1)),Ys.setAttribute("uv",new qo(i,2,3,!1))}this.geometry=Ys,this.material=e,this.center=new Oe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&gt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ks.setFromMatrixScale(this.matrixWorld),hm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Zs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ks.multiplyScalar(-Zs.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const a=this.center;ka(Fa.set(-.5,-.5,0),Zs,a,Ks,s,r),ka(Fr.set(.5,-.5,0),Zs,a,Ks,s,r),ka(Oa.set(.5,.5,0),Zs,a,Ks,s,r),Nd.set(0,0),Kl.set(1,0),Fd.set(1,1);let o=e.ray.intersectTriangle(Fa,Fr,Oa,!1,Ur);if(o===null&&(ka(Fr.set(-.5,.5,0),Zs,a,Ks,s,r),Kl.set(0,1),o=e.ray.intersectTriangle(Fa,Oa,Fr,!1,Ur),o===null))return;const l=e.ray.origin.distanceTo(Ur);l<e.near||l>e.far||t.push({distance:l,point:Ur.clone(),uv:zn.getInterpolation(Ur,Fa,Fr,Oa,Nd,Kl,Fd,new Oe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ka(n,e,t,i,s,r){Js.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Nr.x=r*Js.x-s*Js.y,Nr.y=s*Js.x+r*Js.y):Nr.copy(Js),n.copy(e),n.x+=Nr.x,n.y+=Nr.y,n.applyMatrix4(hm)}const bi=new B,Zl=new B,Ba=new B,Wi=new B,Jl=new B,za=new B,jl=new B;class va{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bi.copy(this.origin).addScaledVector(this.direction,t),bi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Zl.copy(e).add(t).multiplyScalar(.5),Ba.copy(t).sub(e).normalize(),Wi.copy(this.origin).sub(Zl);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ba),o=Wi.dot(this.direction),l=-Wi.dot(Ba),c=Wi.lengthSq(),u=Math.abs(1-a*a);let f,h,p,g;if(u>0)if(f=a*l-o,h=a*o-l,g=r*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,p=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Zl).addScaledVector(Ba,h),p}intersectSphere(e,t){bi.subVectors(e.center,this.origin);const i=bi.dot(this.direction),s=bi.dot(bi)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,bi)!==null}intersectTriangle(e,t,i,s,r){Jl.subVectors(t,e),za.subVectors(i,e),jl.crossVectors(Jl,za);let a=this.direction.dot(jl),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wi.subVectors(this.origin,e);const l=o*this.direction.dot(za.crossVectors(Wi,za));if(l<0)return null;const c=o*this.direction.dot(Jl.cross(Wi));if(c<0||l+c>a)return null;const u=-o*Wi.dot(jl);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ts extends cs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new os,this.combine=Jp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Od=new It,gs=new va,Va=new _a,kd=new B,Ha=new B,Ga=new B,Wa=new B,Ql=new B,Xa=new B,Bd=new B,$a=new B;class Mt extends tn{constructor(e=new Ut,t=new Ts){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Xa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],f=r[l];u!==0&&(Ql.fromBufferAttribute(f,e),a?Xa.addScaledVector(Ql,u):Xa.addScaledVector(Ql.sub(t),u))}t.add(Xa)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Va.copy(i.boundingSphere),Va.applyMatrix4(r),gs.copy(e.ray).recast(e.near),!(Va.containsPoint(gs.origin)===!1&&(gs.intersectSphere(Va,kd)===null||gs.origin.distanceToSquared(kd)>(e.far-e.near)**2))&&(Od.copy(r).invert(),gs.copy(e.ray).applyMatrix4(Od),!(i.boundingBox!==null&&gs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,gs)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const d=h[g],m=a[d.materialIndex],T=Math.max(d.start,p.start),R=Math.min(o.count,Math.min(d.start+d.count,p.start+p.count));for(let M=T,S=R;M<S;M+=3){const b=o.getX(M),D=o.getX(M+1),y=o.getX(M+2);s=qa(this,m,e,i,c,u,f,b,D,y),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let d=g,m=_;d<m;d+=3){const T=o.getX(d),R=o.getX(d+1),M=o.getX(d+2);s=qa(this,a,e,i,c,u,f,T,R,M),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const d=h[g],m=a[d.materialIndex],T=Math.max(d.start,p.start),R=Math.min(l.count,Math.min(d.start+d.count,p.start+p.count));for(let M=T,S=R;M<S;M+=3){const b=M,D=M+1,y=M+2;s=qa(this,m,e,i,c,u,f,b,D,y),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let d=g,m=_;d<m;d+=3){const T=d,R=d+1,M=d+2;s=qa(this,a,e,i,c,u,f,T,R,M),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}}}function wS(n,e,t,i,s,r,a,o){let l;if(e.side===bn?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===rs,o),l===null)return null;$a.copy(o),$a.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo($a);return c<t.near||c>t.far?null:{distance:c,point:$a.clone(),object:n}}function qa(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Ha),n.getVertexPosition(l,Ga),n.getVertexPosition(c,Wa);const u=wS(n,e,t,i,Ha,Ga,Wa,Bd);if(u){const f=new B;zn.getBarycoord(Bd,Ha,Ga,Wa,f),s&&(u.uv=zn.getInterpolatedAttribute(s,o,l,c,f,new Oe)),r&&(u.uv1=zn.getInterpolatedAttribute(r,o,l,c,f,new Oe)),a&&(u.normal=zn.getInterpolatedAttribute(a,o,l,c,f,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new B,materialIndex:0};zn.getNormal(Ha,Ga,Wa,h.normal),u.face=h,u.barycoord=f}return u}class AS extends dn{constructor(e=null,t=1,i=1,s,r,a,o,l,c=en,u=en,f,h){super(null,a,o,l,c,u,s,r,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ec=new B,CS=new B,RS=new st;class Zi{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=ec.subVectors(i,t).cross(CS.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(ec),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||RS.getNormalMatrix(e),s=this.coplanarPoint(ec).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _s=new _a,PS=new Oe(.5,.5),Ya=new B;class lh{constructor(e=new Zi,t=new Zi,i=new Zi,s=new Zi,r=new Zi,a=new Zi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=di,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],f=r[5],h=r[6],p=r[7],g=r[8],_=r[9],d=r[10],m=r[11],T=r[12],R=r[13],M=r[14],S=r[15];if(s[0].setComponents(c-a,p-u,m-g,S-T).normalize(),s[1].setComponents(c+a,p+u,m+g,S+T).normalize(),s[2].setComponents(c+o,p+f,m+_,S+R).normalize(),s[3].setComponents(c-o,p-f,m-_,S-R).normalize(),i)s[4].setComponents(l,h,d,M).normalize(),s[5].setComponents(c-l,p-h,m-d,S-M).normalize();else if(s[4].setComponents(c-l,p-h,m-d,S-M).normalize(),t===di)s[5].setComponents(c+l,p+h,m+d,S+M).normalize();else if(t===ca)s[5].setComponents(l,h,d,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_s.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_s.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_s)}intersectsSprite(e){_s.center.set(0,0,0);const t=PS.distanceTo(e.center);return _s.radius=.7071067811865476+t,_s.applyMatrix4(e.matrixWorld),this.intersectsSphere(_s)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Ya.x=s.normal.x>0?e.max.x:e.min.x,Ya.y=s.normal.y>0?e.max.y:e.min.y,Ya.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ya)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Qr extends cs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Yo=new B,Ko=new B,zd=new It,Or=new va,Ka=new _a,tc=new B,Vd=new B;class wo extends tn{constructor(e=new Ut,t=new Qr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Yo.fromBufferAttribute(t,s-1),Ko.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Yo.distanceTo(Ko);e.setAttribute("lineDistance",new Wt(i,1))}else Qe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ka.copy(i.boundingSphere),Ka.applyMatrix4(s),Ka.radius+=r,e.ray.intersectsSphere(Ka)===!1)return;zd.copy(s).invert(),Or.copy(e.ray).applyMatrix4(zd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=p,d=g-1;_<d;_+=c){const m=u.getX(_),T=u.getX(_+1),R=Za(this,e,Or,l,m,T,_);R&&t.push(R)}if(this.isLineLoop){const _=u.getX(g-1),d=u.getX(p),m=Za(this,e,Or,l,_,d,g-1);m&&t.push(m)}}else{const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=p,d=g-1;_<d;_+=c){const m=Za(this,e,Or,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){const _=Za(this,e,Or,l,g-1,p,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Za(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(Yo.fromBufferAttribute(o,s),Ko.fromBufferAttribute(o,r),t.distanceSqToSegment(Yo,Ko,tc,Vd)>i)return;tc.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(tc);if(!(c<e.near||c>e.far))return{distance:c,point:Vd.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}class _u extends cs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Hd=new It,vu=new va,Ja=new _a,ja=new B;class nc extends tn{constructor(e=new Ut,t=new _u){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ja.copy(i.boundingSphere),Ja.applyMatrix4(s),Ja.radius+=r,e.ray.intersectsSphere(Ja)===!1)return;Hd.copy(s).invert(),vu.copy(e.ray).applyMatrix4(Hd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=h,_=p;g<_;g++){const d=c.getX(g);ja.fromBufferAttribute(f,d),Gd(ja,d,l,s,e,t,this)}}else{const h=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let g=h,_=p;g<_;g++)ja.fromBufferAttribute(f,g),Gd(ja,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Gd(n,e,t,i,s,r,a){const o=vu.distanceSqToPoint(n);if(o<t){const l=new B;vu.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class dm extends dn{constructor(e=[],t=Ds,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Rs extends dn{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class yr extends dn{constructor(e,t,i=_i,s,r,a,o=en,l=en,c,u=Ui,f=1){if(u!==Ui&&u!==Es)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class DS extends yr{constructor(e,t=_i,i=Ds,s,r,a=en,o=en,l,c=Ui){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class fm extends dn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class xa extends Ut{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Wt(c,3)),this.setAttribute("normal",new Wt(u,3)),this.setAttribute("uv",new Wt(f,2));function g(_,d,m,T,R,M,S,b,D,y,w){const F=M/D,C=S/y,L=M/2,X=S/2,q=b/2,H=D+1,K=y+1;let V=0,Z=0;const ne=new B;for(let pe=0;pe<K;pe++){const Me=pe*C-X;for(let Ee=0;Ee<H;Ee++){const it=Ee*F-L;ne[_]=it*T,ne[d]=Me*R,ne[m]=q,c.push(ne.x,ne.y,ne.z),ne[_]=0,ne[d]=0,ne[m]=b>0?1:-1,u.push(ne.x,ne.y,ne.z),f.push(Ee/D),f.push(1-pe/y),V+=1}}for(let pe=0;pe<y;pe++)for(let Me=0;Me<D;Me++){const Ee=h+Me+H*pe,it=h+Me+H*(pe+1),ge=h+(Me+1)+H*(pe+1),re=h+(Me+1)+H*pe;l.push(Ee,it,re),l.push(it,ge,re),Z+=6}o.addGroup(p,Z,w),p+=Z,h+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class dl extends Ut{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,f=e/o,h=t/l,p=[],g=[],_=[],d=[];for(let m=0;m<u;m++){const T=m*h-a;for(let R=0;R<c;R++){const M=R*f-r;g.push(M,-T,0),_.push(0,0,1),d.push(R/o),d.push(1-m/l)}}for(let m=0;m<l;m++)for(let T=0;T<o;T++){const R=T+c*m,M=T+c*(m+1),S=T+1+c*(m+1),b=T+1+c*m;p.push(R,M,b),p.push(M,S,b)}this.setIndex(p),this.setAttribute("position",new Wt(g,3)),this.setAttribute("normal",new Wt(_,3)),this.setAttribute("uv",new Wt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dl(e.width,e.height,e.widthSegments,e.heightSegments)}}class ch extends Ut{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let f=e;const h=(t-e)/s,p=new B,g=new Oe;for(let _=0;_<=s;_++){for(let d=0;d<=i;d++){const m=r+d/i*a;p.x=f*Math.cos(m),p.y=f*Math.sin(m),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,u.push(g.x,g.y)}f+=h}for(let _=0;_<s;_++){const d=_*(i+1);for(let m=0;m<i;m++){const T=m+d,R=T,M=T+i+1,S=T+i+2,b=T+1;o.push(R,M,b),o.push(M,S,b)}}this.setIndex(o),this.setAttribute("position",new Wt(l,3)),this.setAttribute("normal",new Wt(c,3)),this.setAttribute("uv",new Wt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ch(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class an extends Ut{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new B,h=new B,p=[],g=[],_=[],d=[];for(let m=0;m<=i;m++){const T=[],R=m/i,M=a+R*o,S=e*Math.cos(M),b=Math.sqrt(e*e-S*S);let D=0;m===0&&a===0?D=.5/t:m===i&&l===Math.PI&&(D=-.5/t);for(let y=0;y<=t;y++){const w=y/t,F=s+w*r;f.x=-b*Math.cos(F),f.y=S,f.z=b*Math.sin(F),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),d.push(w+D,1-R),T.push(c++)}u.push(T)}for(let m=0;m<i;m++)for(let T=0;T<t;T++){const R=u[m][T+1],M=u[m][T],S=u[m+1][T],b=u[m+1][T+1];(m!==0||a>0)&&p.push(R,M,b),(m!==i-1||l<Math.PI)&&p.push(M,S,b)}this.setIndex(p),this.setAttribute("position",new Wt(g,3)),this.setAttribute("normal",new Wt(_,3)),this.setAttribute("uv",new Wt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new an(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class rr extends Ut{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);const l=[],c=[],u=[],f=[],h=new B,p=new B,g=new B;for(let _=0;_<=i;_++){const d=a+_/i*o;for(let m=0;m<=s;m++){const T=m/s*r;p.x=(e+t*Math.cos(d))*Math.cos(T),p.y=(e+t*Math.cos(d))*Math.sin(T),p.z=t*Math.sin(d),c.push(p.x,p.y,p.z),h.x=e*Math.cos(T),h.y=e*Math.sin(T),g.subVectors(p,h).normalize(),u.push(g.x,g.y,g.z),f.push(m/s),f.push(_/i)}}for(let _=1;_<=i;_++)for(let d=1;d<=s;d++){const m=(s+1)*_+d-1,T=(s+1)*(_-1)+d-1,R=(s+1)*(_-1)+d,M=(s+1)*_+d;l.push(m,T,M),l.push(T,R,M)}this.setIndex(l),this.setAttribute("position",new Wt(c,3)),this.setAttribute("normal",new Wt(u,3)),this.setAttribute("uv",new Wt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Mr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(Wd(s))s.isRenderTargetTexture?(Qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Wd(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function mn(n){const e={};for(let t=0;t<n.length;t++){const i=Mr(n[t]);for(const s in i)e[s]=i[s]}return e}function Wd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function LS(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function pm(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:mt.workingColorSpace}const ua={clone:Mr,merge:mn};var IS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,US=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zt extends cs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=IS,this.fragmentShader=US,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Mr(e.uniforms),this.uniformsGroups=LS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Ye().setHex(s.value);break;case"v2":this.uniforms[i].value=new Oe().fromArray(s.value);break;case"v3":this.uniforms[i].value=new B().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Nt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new st().fromArray(s.value);break;case"m4":this.uniforms[i].value=new It().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class mm extends zt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ir extends cs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pu,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new os,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Qa extends ir{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ft(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class NS extends cs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class FS extends cs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class gm extends tn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const ic=new It,Xd=new B,$d=new B;class OS{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new It,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new lh,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new Nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Xd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Xd),$d.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($d),t.updateMatrixWorld(),ic.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ic,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ca||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ic)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const eo=new B,to=new as,ni=new B;class _m extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new It,this.projectionMatrix=new It,this.projectionMatrixInverse=new It,this.coordinateSystem=di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(eo,to,ni),ni.x===1&&ni.y===1&&ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(eo,to,ni.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(eo,to,ni),ni.x===1&&ni.y===1&&ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(eo,to,ni.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Xi=new B,qd=new Oe,Yd=new Oe;class Pn extends _m{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=gu*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(To*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gu*2*Math.atan(Math.tan(To*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z)}getViewSize(e,t){return this.getViewBounds(e,qd,Yd),t.subVectors(Yd,qd)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(To*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class kS extends OS{constructor(){super(new Pn(90,1,.5,500)),this.isPointLightShadow=!0}}class Kd extends gm{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new kS}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class uh extends _m{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class BS extends gm{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const js=-90,Qs=1;class zS extends tn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Pn(js,Qs,e,t);s.layers=this.layers,this.add(s);const r=new Pn(js,Qs,e,t);r.layers=this.layers,this.add(r);const a=new Pn(js,Qs,e,t);a.layers=this.layers,this.add(a);const o=new Pn(js,Qs,e,t);o.layers=this.layers,this.add(o);const l=new Pn(js,Qs,e,t);l.layers=this.layers,this.add(l);const c=new Pn(js,Qs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===di)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ca)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let d=!1;e.isWebGLRenderer===!0?d=e.state.buffers.depth.getReversed():d=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class VS extends Pn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class HS{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=GS.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function GS(){this._document.hidden===!1&&this.reset()}const Zd=new It;class WS{constructor(e,t,i=0,s=1/0){this.ray=new va(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new ah,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):gt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Zd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Zd),this}intersectObject(e,t=!0,i=[]){return xu(e,this,i,t),i.sort(Jd),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)xu(e[s],this,i,t);return i.sort(Jd),i}}function Jd(n,e){return n.distance-e.distance}function xu(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)xu(r[a],e,t,!0)}}class XS{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Qe("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class jd{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ft(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(ft(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const _h=class _h{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};_h.prototype.isMatrix2=!0;let Qd=_h;class $S extends ls{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Qe("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function ef(n,e,t,i){const s=qS(i);switch(t){case im:return n*e;case rm:return n*e/s.components*s.byteLength;case eh:return n*e/s.components*s.byteLength;case Ls:return n*e*2/s.components*s.byteLength;case th:return n*e*2/s.components*s.byteLength;case sm:return n*e*3/s.components*s.byteLength;case qn:return n*e*4/s.components*s.byteLength;case nh:return n*e*4/s.components*s.byteLength;case Mo:case So:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case bo:case Eo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Bc:case Vc:return Math.max(n,16)*Math.max(e,8)/4;case kc:case zc:return Math.max(n,8)*Math.max(e,8)/2;case Hc:case Gc:case Xc:case $c:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Wc:case Vo:case qc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Yc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Kc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Zc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Jc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case jc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Qc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case eu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case tu:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case nu:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case iu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case su:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ru:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case au:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ou:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case lu:case cu:case uu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case hu:case du:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ho:case fu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function qS(n){switch(n){case Ln:case Qp:return{byteLength:1,components:1};case oa:case em:case En:return{byteLength:2,components:1};case ju:case Qu:return{byteLength:2,components:4};case _i:case Ju:case hi:return{byteLength:4,components:1};case tm:case nm:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wu}}));typeof window<"u"&&(window.__THREE__?Qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wu);function vm(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function YS(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<f.length;p++){const g=f[h],_=f[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let p=0,g=f.length;p<g;p++){const _=f[p];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var KS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ZS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,JS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,QS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,eb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tb=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ib=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,sb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ab=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ob=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lb=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,cb=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ub=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,hb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,db=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,mb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,gb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,_b=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,vb=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xb=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yb=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Mb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Eb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tb="gl_FragColor = linearToOutputTexel( gl_FragColor );",wb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ab=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Cb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Rb=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Pb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Db=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Lb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ib=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ub=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fb=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ob=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bb=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zb=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Vb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Hb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gb=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xb=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$b=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,qb=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Yb=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Kb=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jb=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,jb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,e1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,t1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,n1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,i1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,s1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,r1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,a1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,o1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,l1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,c1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,u1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,h1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,d1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,f1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,p1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,m1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,g1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,v1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,x1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,y1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,M1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,S1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,b1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,E1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,T1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,w1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,A1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,C1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,R1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,P1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,D1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,L1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,I1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,U1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,N1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,F1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,O1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,k1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,B1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,z1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,V1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,H1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,G1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,W1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,X1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,q1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Y1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const K1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Z1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,J1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Q1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,nE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,iE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,sE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,rE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,aE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,uE=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hE=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dE=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fE=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,pE=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mE=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,gE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_E=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,yE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ME=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,SE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bE=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,EE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,TE=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,AE=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,CE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ct={alphahash_fragment:KS,alphahash_pars_fragment:ZS,alphamap_fragment:JS,alphamap_pars_fragment:jS,alphatest_fragment:QS,alphatest_pars_fragment:eb,aomap_fragment:tb,aomap_pars_fragment:nb,batching_pars_vertex:ib,batching_vertex:sb,begin_vertex:rb,beginnormal_vertex:ab,bsdfs:ob,iridescence_fragment:lb,bumpmap_pars_fragment:cb,clipping_planes_fragment:ub,clipping_planes_pars_fragment:hb,clipping_planes_pars_vertex:db,clipping_planes_vertex:fb,color_fragment:pb,color_pars_fragment:mb,color_pars_vertex:gb,color_vertex:_b,common:vb,cube_uv_reflection_fragment:xb,defaultnormal_vertex:yb,displacementmap_pars_vertex:Mb,displacementmap_vertex:Sb,emissivemap_fragment:bb,emissivemap_pars_fragment:Eb,colorspace_fragment:Tb,colorspace_pars_fragment:wb,envmap_fragment:Ab,envmap_common_pars_fragment:Cb,envmap_pars_fragment:Rb,envmap_pars_vertex:Pb,envmap_physical_pars_fragment:Vb,envmap_vertex:Db,fog_vertex:Lb,fog_pars_vertex:Ib,fog_fragment:Ub,fog_pars_fragment:Nb,gradientmap_pars_fragment:Fb,lightmap_pars_fragment:Ob,lights_lambert_fragment:kb,lights_lambert_pars_fragment:Bb,lights_pars_begin:zb,lights_toon_fragment:Hb,lights_toon_pars_fragment:Gb,lights_phong_fragment:Wb,lights_phong_pars_fragment:Xb,lights_physical_fragment:$b,lights_physical_pars_fragment:qb,lights_fragment_begin:Yb,lights_fragment_maps:Kb,lights_fragment_end:Zb,lightprobes_pars_fragment:Jb,logdepthbuf_fragment:jb,logdepthbuf_pars_fragment:Qb,logdepthbuf_pars_vertex:e1,logdepthbuf_vertex:t1,map_fragment:n1,map_pars_fragment:i1,map_particle_fragment:s1,map_particle_pars_fragment:r1,metalnessmap_fragment:a1,metalnessmap_pars_fragment:o1,morphinstance_vertex:l1,morphcolor_vertex:c1,morphnormal_vertex:u1,morphtarget_pars_vertex:h1,morphtarget_vertex:d1,normal_fragment_begin:f1,normal_fragment_maps:p1,normal_pars_fragment:m1,normal_pars_vertex:g1,normal_vertex:_1,normalmap_pars_fragment:v1,clearcoat_normal_fragment_begin:x1,clearcoat_normal_fragment_maps:y1,clearcoat_pars_fragment:M1,iridescence_pars_fragment:S1,opaque_fragment:b1,packing:E1,premultiplied_alpha_fragment:T1,project_vertex:w1,dithering_fragment:A1,dithering_pars_fragment:C1,roughnessmap_fragment:R1,roughnessmap_pars_fragment:P1,shadowmap_pars_fragment:D1,shadowmap_pars_vertex:L1,shadowmap_vertex:I1,shadowmask_pars_fragment:U1,skinbase_vertex:N1,skinning_pars_vertex:F1,skinning_vertex:O1,skinnormal_vertex:k1,specularmap_fragment:B1,specularmap_pars_fragment:z1,tonemapping_fragment:V1,tonemapping_pars_fragment:H1,transmission_fragment:G1,transmission_pars_fragment:W1,uv_pars_fragment:X1,uv_pars_vertex:$1,uv_vertex:q1,worldpos_vertex:Y1,background_vert:K1,background_frag:Z1,backgroundCube_vert:J1,backgroundCube_frag:j1,cube_vert:Q1,cube_frag:eE,depth_vert:tE,depth_frag:nE,distance_vert:iE,distance_frag:sE,equirect_vert:rE,equirect_frag:aE,linedashed_vert:oE,linedashed_frag:lE,meshbasic_vert:cE,meshbasic_frag:uE,meshlambert_vert:hE,meshlambert_frag:dE,meshmatcap_vert:fE,meshmatcap_frag:pE,meshnormal_vert:mE,meshnormal_frag:gE,meshphong_vert:_E,meshphong_frag:vE,meshphysical_vert:xE,meshphysical_frag:yE,meshtoon_vert:ME,meshtoon_frag:SE,points_vert:bE,points_frag:EE,shadow_vert:TE,shadow_frag:wE,sprite_vert:AE,sprite_frag:CE},De={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},li={basic:{uniforms:mn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:ct.meshbasic_vert,fragmentShader:ct.meshbasic_frag},lambert:{uniforms:mn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Ye(0)},envMapIntensity:{value:1}}]),vertexShader:ct.meshlambert_vert,fragmentShader:ct.meshlambert_frag},phong:{uniforms:mn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ct.meshphong_vert,fragmentShader:ct.meshphong_frag},standard:{uniforms:mn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag},toon:{uniforms:mn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new Ye(0)}}]),vertexShader:ct.meshtoon_vert,fragmentShader:ct.meshtoon_frag},matcap:{uniforms:mn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:ct.meshmatcap_vert,fragmentShader:ct.meshmatcap_frag},points:{uniforms:mn([De.points,De.fog]),vertexShader:ct.points_vert,fragmentShader:ct.points_frag},dashed:{uniforms:mn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ct.linedashed_vert,fragmentShader:ct.linedashed_frag},depth:{uniforms:mn([De.common,De.displacementmap]),vertexShader:ct.depth_vert,fragmentShader:ct.depth_frag},normal:{uniforms:mn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:ct.meshnormal_vert,fragmentShader:ct.meshnormal_frag},sprite:{uniforms:mn([De.sprite,De.fog]),vertexShader:ct.sprite_vert,fragmentShader:ct.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ct.background_vert,fragmentShader:ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:ct.backgroundCube_vert,fragmentShader:ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ct.cube_vert,fragmentShader:ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ct.equirect_vert,fragmentShader:ct.equirect_frag},distance:{uniforms:mn([De.common,De.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ct.distance_vert,fragmentShader:ct.distance_frag},shadow:{uniforms:mn([De.lights,De.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:ct.shadow_vert,fragmentShader:ct.shadow_frag}};li.physical={uniforms:mn([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag};const no={r:0,b:0,g:0},RE=new It,xm=new st;xm.set(-1,0,0,0,1,0,0,0,1);function PE(n,e,t,i,s,r){const a=new Ye(0);let o=s===!0?0:1,l,c,u=null,f=0,h=null;function p(T){let R=T.isScene===!0?T.background:null;if(R&&R.isTexture){const M=T.backgroundBlurriness>0;R=e.get(R,M)}return R}function g(T){let R=!1;const M=p(T);M===null?d(a,o):M&&M.isColor&&(d(M,1),R=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?t.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(T,R){const M=p(R);M&&(M.isCubeTexture||M.mapping===hl)?(c===void 0&&(c=new Mt(new xa(1,1,1),new zt({name:"BackgroundCubeMaterial",uniforms:Mr(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,b,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(RE.makeRotationFromEuler(R.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(xm),c.material.toneMapped=mt.getTransfer(M.colorSpace)!==xt,(u!==M||f!==M.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,f=M.version,h=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Mt(new dl(2,2),new zt({name:"BackgroundMaterial",uniforms:Mr(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:rs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=mt.getTransfer(M.colorSpace)!==xt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||f!==M.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=M,f=M.version,h=n.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function d(T,R){T.getRGB(no,pm(n)),t.buffers.color.setClear(no.r,no.g,no.b,R,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,R=1){a.set(T),o=R,d(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,d(a,o)},render:g,addToRenderList:_,dispose:m}}function DE(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function o(C,L,X,q,H){let K=!1;const V=f(C,q,X,L);r!==V&&(r=V,c(r.object)),K=p(C,q,X,H),K&&g(C,q,X,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,M(C,L,X,q),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function c(C){return n.bindVertexArray(C)}function u(C){return n.deleteVertexArray(C)}function f(C,L,X,q){const H=q.wireframe===!0;let K=i[L.id];K===void 0&&(K={},i[L.id]=K);const V=C.isInstancedMesh===!0?C.id:0;let Z=K[V];Z===void 0&&(Z={},K[V]=Z);let ne=Z[X.id];ne===void 0&&(ne={},Z[X.id]=ne);let pe=ne[H];return pe===void 0&&(pe=h(l()),ne[H]=pe),pe}function h(C){const L=[],X=[],q=[];for(let H=0;H<t;H++)L[H]=0,X[H]=0,q[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:X,attributeDivisors:q,object:C,attributes:{},index:null}}function p(C,L,X,q){const H=r.attributes,K=L.attributes;let V=0;const Z=X.getAttributes();for(const ne in Z)if(Z[ne].location>=0){const Me=H[ne];let Ee=K[ne];if(Ee===void 0&&(ne==="instanceMatrix"&&C.instanceMatrix&&(Ee=C.instanceMatrix),ne==="instanceColor"&&C.instanceColor&&(Ee=C.instanceColor)),Me===void 0||Me.attribute!==Ee||Ee&&Me.data!==Ee.data)return!0;V++}return r.attributesNum!==V||r.index!==q}function g(C,L,X,q){const H={},K=L.attributes;let V=0;const Z=X.getAttributes();for(const ne in Z)if(Z[ne].location>=0){let Me=K[ne];Me===void 0&&(ne==="instanceMatrix"&&C.instanceMatrix&&(Me=C.instanceMatrix),ne==="instanceColor"&&C.instanceColor&&(Me=C.instanceColor));const Ee={};Ee.attribute=Me,Me&&Me.data&&(Ee.data=Me.data),H[ne]=Ee,V++}r.attributes=H,r.attributesNum=V,r.index=q}function _(){const C=r.newAttributes;for(let L=0,X=C.length;L<X;L++)C[L]=0}function d(C){m(C,0)}function m(C,L){const X=r.newAttributes,q=r.enabledAttributes,H=r.attributeDivisors;X[C]=1,q[C]===0&&(n.enableVertexAttribArray(C),q[C]=1),H[C]!==L&&(n.vertexAttribDivisor(C,L),H[C]=L)}function T(){const C=r.newAttributes,L=r.enabledAttributes;for(let X=0,q=L.length;X<q;X++)L[X]!==C[X]&&(n.disableVertexAttribArray(X),L[X]=0)}function R(C,L,X,q,H,K,V){V===!0?n.vertexAttribIPointer(C,L,X,H,K):n.vertexAttribPointer(C,L,X,q,H,K)}function M(C,L,X,q){_();const H=q.attributes,K=X.getAttributes(),V=L.defaultAttributeValues;for(const Z in K){const ne=K[Z];if(ne.location>=0){let pe=H[Z];if(pe===void 0&&(Z==="instanceMatrix"&&C.instanceMatrix&&(pe=C.instanceMatrix),Z==="instanceColor"&&C.instanceColor&&(pe=C.instanceColor)),pe!==void 0){const Me=pe.normalized,Ee=pe.itemSize,it=e.get(pe);if(it===void 0)continue;const ge=it.buffer,re=it.type,G=it.bytesPerElement,ve=re===n.INT||re===n.UNSIGNED_INT||pe.gpuType===Ju;if(pe.isInterleavedBufferAttribute){const ye=pe.data,et=ye.stride,tt=pe.offset;if(ye.isInstancedInterleavedBuffer){for(let Je=0;Je<ne.locationSize;Je++)m(ne.location+Je,ye.meshPerAttribute);C.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let Je=0;Je<ne.locationSize;Je++)d(ne.location+Je);n.bindBuffer(n.ARRAY_BUFFER,ge);for(let Je=0;Je<ne.locationSize;Je++)R(ne.location+Je,Ee/ne.locationSize,re,Me,et*G,(tt+Ee/ne.locationSize*Je)*G,ve)}else{if(pe.isInstancedBufferAttribute){for(let ye=0;ye<ne.locationSize;ye++)m(ne.location+ye,pe.meshPerAttribute);C.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let ye=0;ye<ne.locationSize;ye++)d(ne.location+ye);n.bindBuffer(n.ARRAY_BUFFER,ge);for(let ye=0;ye<ne.locationSize;ye++)R(ne.location+ye,Ee/ne.locationSize,re,Me,Ee*G,Ee/ne.locationSize*ye*G,ve)}}else if(V!==void 0){const Me=V[Z];if(Me!==void 0)switch(Me.length){case 2:n.vertexAttrib2fv(ne.location,Me);break;case 3:n.vertexAttrib3fv(ne.location,Me);break;case 4:n.vertexAttrib4fv(ne.location,Me);break;default:n.vertexAttrib1fv(ne.location,Me)}}}}T()}function S(){w();for(const C in i){const L=i[C];for(const X in L){const q=L[X];for(const H in q){const K=q[H];for(const V in K)u(K[V].object),delete K[V];delete q[H]}}delete i[C]}}function b(C){if(i[C.id]===void 0)return;const L=i[C.id];for(const X in L){const q=L[X];for(const H in q){const K=q[H];for(const V in K)u(K[V].object),delete K[V];delete q[H]}}delete i[C.id]}function D(C){for(const L in i){const X=i[L];for(const q in X){const H=X[q];if(H[C.id]===void 0)continue;const K=H[C.id];for(const V in K)u(K[V].object),delete K[V];delete H[C.id]}}}function y(C){for(const L in i){const X=i[L],q=C.isInstancedMesh===!0?C.id:0,H=X[q];if(H!==void 0){for(const K in H){const V=H[K];for(const Z in V)u(V[Z].object),delete V[Z];delete H[K]}delete X[q],Object.keys(X).length===0&&delete i[L]}}}function w(){F(),a=!0,r!==s&&(r=s,c(r.object))}function F(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:F,dispose:S,releaseStatesOfGeometry:b,releaseStatesOfObject:y,releaseStatesOfProgram:D,initAttributes:_,enableAttribute:d,disableUnusedAttributes:T}}function LE(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let p=0;p<u;p++)h+=c[p];t.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function IE(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(D){return!(D!==qn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(D){const y=D===En&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==Ln&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==hi&&!y)}function l(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Qe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Qe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),d=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),R=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),S=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:d,maxAttributes:m,maxVertexUniforms:T,maxVaryings:R,maxFragmentUniforms:M,maxSamples:S,samples:b}}function UE(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Zi,o=new st,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||s;return s=h,i=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,p){const g=f.clippingPlanes,_=f.clipIntersection,d=f.clipShadows,m=n.get(f);if(!s||g===null||g.length===0||r&&!d)r?u(null):c();else{const T=r?0:i,R=T*4;let M=m.clippingState||null;l.value=M,M=u(g,h,R,p);for(let S=0;S!==R;++S)M[S]=t[S];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,p,g){const _=f!==null?f.length:0;let d=null;if(_!==0){if(d=l.value,g!==!0||d===null){const m=p+_*4,T=h.matrixWorldInverse;o.getNormalMatrix(T),(d===null||d.length<m)&&(d=new Float32Array(m));for(let R=0,M=p;R!==_;++R,M+=4)a.copy(f[R]).applyMatrix4(T,o),a.normal.toArray(d,M),d[M+3]=a.constant}l.value=d,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,d}}const Qi=4,tf=[.125,.215,.35,.446,.526,.582],Ss=20,NE=256,kr=new uh,nf=new Ye;let sc=null,rc=0,ac=0,oc=!1;const FE=new B;class yu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=FE}=r;sc=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),ac=this._renderer.getActiveMipmapLevel(),oc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=af(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(sc,rc,ac),this._renderer.xr.enabled=oc,e.scissorTest=!1,er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ds||e.mapping===xr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),sc=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),ac=this._renderer.getActiveMipmapLevel(),oc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:un,minFilter:un,generateMipmaps:!1,type:En,format:qn,colorSpace:Go,depthBuffer:!1},s=sf(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sf(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=OE(r)),this._blurMaterial=BE(r,e,t),this._ggxMaterial=kE(r,e,t)}return s}_compileMaterial(e){const t=new Mt(new Ut,e);this._renderer.compile(t,kr)}_sceneToCubeUV(e,t,i,s,r){const l=new Pn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(nf),f.toneMapping=mi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Mt(new xa,new Ts({name:"PMREM.Background",side:bn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,d=_.material;let m=!1;const T=e.background;T?T.isColor&&(d.color.copy(T),e.background=null,m=!0):(d.color.copy(nf),m=!0);for(let R=0;R<6;R++){const M=R%3;M===0?(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[R],r.y,r.z)):M===1?(l.up.set(0,0,c[R]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[R],r.z)):(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[R]));const S=this._cubeSize;er(s,M*S,R>2?S:0,S,S),f.setRenderTarget(s),m&&f.render(_,l),f.render(e,l)}f.toneMapping=p,f.autoClear=h,e.background=T}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Ds||e.mapping===xr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=af()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rf());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;er(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,kr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=0+c*1.25,p=f*h,{_lodMax:g}=this,_=this._sizeLods[i],d=3*_*(i>g-Qi?i-g+Qi:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-t,er(r,d,m,3*_,2*_),s.setRenderTarget(r),s.render(o,kr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,er(e,d,m,3*_,2*_),s.setRenderTarget(e),s.render(o,kr)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&gt("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=c;const h=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ss-1),_=r/g,d=isFinite(r)?1+Math.floor(u*_):Ss;d>Ss&&Qe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Ss}`);const m=[];let T=0;for(let D=0;D<Ss;++D){const y=D/_,w=Math.exp(-y*y/2);m.push(w),D===0?T+=w:D<d&&(T+=2*w)}for(let D=0;D<m.length;D++)m[D]=m[D]/T;h.envMap.value=e.texture,h.samples.value=d,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:R}=this;h.dTheta.value=g,h.mipInt.value=R-i;const M=this._sizeLods[s],S=3*M*(s>R-Qi?s-R+Qi:0),b=4*(this._cubeSize-M);er(t,S,b,3*M,2*M),l.setRenderTarget(t),l.render(f,kr)}}function OE(n){const e=[],t=[],i=[];let s=n;const r=n-Qi+1+tf.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-Qi?l=tf[a-n+Qi-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,g=6,_=3,d=2,m=1,T=new Float32Array(_*g*p),R=new Float32Array(d*g*p),M=new Float32Array(m*g*p);for(let b=0;b<p;b++){const D=b%3*2/3-1,y=b>2?0:-1,w=[D,y,0,D+2/3,y,0,D+2/3,y+1,0,D,y,0,D+2/3,y+1,0,D,y+1,0];T.set(w,_*g*b),R.set(h,d*g*b);const F=[b,b,b,b,b,b];M.set(F,m*g*b)}const S=new Ut;S.setAttribute("position",new kt(T,_)),S.setAttribute("uv",new kt(R,d)),S.setAttribute("faceIndex",new kt(M,m)),i.push(new Mt(S,null)),s>Qi&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function sf(n,e,t){const i=new xn(n,e,t);return i.texture.mapping=hl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function er(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function kE(n,e,t){return new zt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:NE,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:fl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function BE(n,e,t){const i=new Float32Array(Ss),s=new B(0,1,0);return new zt({name:"SphericalGaussianBlur",defines:{n:Ss,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function rf(){return new zt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function af(){return new zt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function fl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class ym extends xn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new dm(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new xa(5,5,5),r=new zt({name:"CubemapFromEquirect",uniforms:Mr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:bn,blending:pi});r.uniforms.tEquirect.value=t;const a=new Mt(s,r),o=t.minFilter;return t.minFilter===bs&&(t.minFilter=un),new zS(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function zE(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,p=!1){return h==null?null:p?a(h):r(h)}function r(h){if(h&&h.isTexture){const p=h.mapping;if(p===yo||p===Rl)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const _=new ym(g.height);return _.fromEquirectangularTexture(n,h),e.set(h,_),h.addEventListener("dispose",c),o(_.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const p=h.mapping,g=p===yo||p===Rl,_=p===Ds||p===xr;if(g||_){let d=t.get(h);const m=d!==void 0?d.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return i===null&&(i=new yu(n)),d=g?i.fromEquirectangular(h,d):i.fromCubemap(h,d),d.texture.pmremVersion=h.pmremVersion,t.set(h,d),d.texture;if(d!==void 0)return d.texture;{const T=h.image;return g&&T&&T.height>0||_&&T&&l(T)?(i===null&&(i=new yu(n)),d=g?i.fromEquirectangular(h):i.fromCubemap(h),d.texture.pmremVersion=h.pmremVersion,t.set(h,d),h.addEventListener("dispose",u),d.texture):null}}}return h}function o(h,p){return p===yo?h.mapping=Ds:p===Rl&&(h.mapping=xr),h}function l(h){let p=0;const g=6;for(let _=0;_<g;_++)h[_]!==void 0&&p++;return p===g}function c(h){const p=h.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(h){const p=h.target;p.removeEventListener("dispose",u);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function VE(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&fr("WebGLRenderer: "+i+" extension not supported."),s}}}function HE(n,e,t,i){const s={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const p=r.get(h);p&&(e.remove(p),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const p in h)e.update(h[p],n.ARRAY_BUFFER)}function c(f){const h=[],p=f.index,g=f.attributes.position;let _=0;if(g===void 0)return;if(p!==null){const T=p.array;_=p.version;for(let R=0,M=T.length;R<M;R+=3){const S=T[R+0],b=T[R+1],D=T[R+2];h.push(S,b,b,D,D,S)}}else{const T=g.array;_=g.version;for(let R=0,M=T.length/3-1;R<M;R+=3){const S=R+0,b=R+1,D=R+2;h.push(S,b,b,D,D,S)}}const d=new(g.count>=65535?um:cm)(h,1);d.version=_;const m=r.get(f);m&&e.remove(m),r.set(f,d)}function u(f){const h=r.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function GE(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,h){n.drawElements(i,h,r,f*a),t.update(h,i,1)}function c(f,h,p){p!==0&&(n.drawElementsInstanced(i,h,r,f*a,p),t.update(h,i,p))}function u(f,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,p);let _=0;for(let d=0;d<p;d++)_+=h[d];t.update(_,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function WE(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:gt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function XE(n,e,t){const i=new WeakMap,s=new Nt;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let F=function(){y.dispose(),i.delete(o),o.removeEventListener("dispose",F)};var p=F;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,d=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],R=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),d===!0&&(M=3);let S=o.attributes.position.count*M,b=1;S>e.maxTextureSize&&(b=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const D=new Float32Array(S*b*4*f),y=new om(D,S,b,f);y.type=hi,y.needsUpdate=!0;const w=M*4;for(let C=0;C<f;C++){const L=m[C],X=T[C],q=R[C],H=S*b*4*C;for(let K=0;K<L.count;K++){const V=K*w;g===!0&&(s.fromBufferAttribute(L,K),D[H+V+0]=s.x,D[H+V+1]=s.y,D[H+V+2]=s.z,D[H+V+3]=0),_===!0&&(s.fromBufferAttribute(X,K),D[H+V+4]=s.x,D[H+V+5]=s.y,D[H+V+6]=s.z,D[H+V+7]=0),d===!0&&(s.fromBufferAttribute(q,K),D[H+V+8]=s.x,D[H+V+9]=s.y,D[H+V+10]=s.z,D[H+V+11]=q.itemSize===4?s.w:1)}}h={count:f,texture:y,size:new Oe(S,b)},i.set(o,h),o.addEventListener("dispose",F)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let d=0;d<c.length;d++)g+=c[d];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function $E(n,e,t,i,s){let r=new WeakMap;function a(c){const u=s.render.frame,f=c.geometry,h=e.get(c,f);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const qE={[Xu]:"LINEAR_TONE_MAPPING",[$u]:"REINHARD_TONE_MAPPING",[qu]:"CINEON_TONE_MAPPING",[ul]:"ACES_FILMIC_TONE_MAPPING",[Ku]:"AGX_TONE_MAPPING",[Zu]:"NEUTRAL_TONE_MAPPING",[Yu]:"CUSTOM_TONE_MAPPING"};function YE(n,e,t,i,s,r){const a=new xn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new yr(e,t):void 0}),o=new xn(e,t,{type:En,depthBuffer:!1,stencilBuffer:!1}),l=new Ut;l.setAttribute("position",new Wt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Wt([0,2,0,0,2,0],2));const c=new mm({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Mt(l,c),f=new uh(-1,1,1,-1,0,1);let h=null,p=null,g=!1,_,d=null,m=[],T=!1;this.setSize=function(R,M){a.setSize(R,M),o.setSize(R,M);for(let S=0;S<m.length;S++){const b=m[S];b.setSize&&b.setSize(R,M)}},this.setEffects=function(R){m=R,T=m.length>0&&m[0].isRenderPass===!0;const M=a.width,S=a.height;for(let b=0;b<m.length;b++){const D=m[b];D.setSize&&D.setSize(M,S)}},this.begin=function(R,M){if(g||R.toneMapping===mi&&m.length===0)return!1;if(d=M,M!==null){const S=M.width,b=M.height;(a.width!==S||a.height!==b)&&this.setSize(S,b)}return T===!1&&R.setRenderTarget(a),_=R.toneMapping,R.toneMapping=mi,!0},this.hasRenderPass=function(){return T},this.end=function(R,M){R.toneMapping=_,g=!0;let S=a,b=o;for(let D=0;D<m.length;D++){const y=m[D];if(y.enabled!==!1&&(y.render(R,b,S,M),y.needsSwap!==!1)){const w=S;S=b,b=w}}if(h!==R.outputColorSpace||p!==R.toneMapping){h=R.outputColorSpace,p=R.toneMapping,c.defines={},mt.getTransfer(h)===xt&&(c.defines.SRGB_TRANSFER="");const D=qE[p];D&&(c.defines[D]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=S.texture,R.setRenderTarget(d),R.render(u,f),d=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Mm=new dn,Mu=new yr(1,1),Sm=new om,bm=new dS,Em=new dm,of=[],lf=[],cf=new Float32Array(16),uf=new Float32Array(9),hf=new Float32Array(4);function Er(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=of[s];if(r===void 0&&(r=new Float32Array(s),of[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Kt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function pl(n,e){let t=lf[e];t===void 0&&(t=new Int32Array(e),lf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function KE(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function ZE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2fv(this.addr,e),Kt(t,e)}}function JE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;n.uniform3fv(this.addr,e),Kt(t,e)}}function jE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4fv(this.addr,e),Kt(t,e)}}function QE(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Kt(t,e)}else{if(Yt(t,i))return;hf.set(i),n.uniformMatrix2fv(this.addr,!1,hf),Kt(t,i)}}function eT(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Kt(t,e)}else{if(Yt(t,i))return;uf.set(i),n.uniformMatrix3fv(this.addr,!1,uf),Kt(t,i)}}function tT(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Kt(t,e)}else{if(Yt(t,i))return;cf.set(i),n.uniformMatrix4fv(this.addr,!1,cf),Kt(t,i)}}function nT(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function iT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2iv(this.addr,e),Kt(t,e)}}function sT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3iv(this.addr,e),Kt(t,e)}}function rT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4iv(this.addr,e),Kt(t,e)}}function aT(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function oT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2uiv(this.addr,e),Kt(t,e)}}function lT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3uiv(this.addr,e),Kt(t,e)}}function cT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4uiv(this.addr,e),Kt(t,e)}}function uT(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Mu.compareFunction=t.isReversedDepthBuffer()?sh:ih,r=Mu):r=Mm,t.setTexture2D(e||r,s)}function hT(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||bm,s)}function dT(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Em,s)}function fT(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Sm,s)}function pT(n){switch(n){case 5126:return KE;case 35664:return ZE;case 35665:return JE;case 35666:return jE;case 35674:return QE;case 35675:return eT;case 35676:return tT;case 5124:case 35670:return nT;case 35667:case 35671:return iT;case 35668:case 35672:return sT;case 35669:case 35673:return rT;case 5125:return aT;case 36294:return oT;case 36295:return lT;case 36296:return cT;case 35678:case 36198:case 36298:case 36306:case 35682:return uT;case 35679:case 36299:case 36307:return hT;case 35680:case 36300:case 36308:case 36293:return dT;case 36289:case 36303:case 36311:case 36292:return fT}}function mT(n,e){n.uniform1fv(this.addr,e)}function gT(n,e){const t=Er(e,this.size,2);n.uniform2fv(this.addr,t)}function _T(n,e){const t=Er(e,this.size,3);n.uniform3fv(this.addr,t)}function vT(n,e){const t=Er(e,this.size,4);n.uniform4fv(this.addr,t)}function xT(n,e){const t=Er(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function yT(n,e){const t=Er(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function MT(n,e){const t=Er(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function ST(n,e){n.uniform1iv(this.addr,e)}function bT(n,e){n.uniform2iv(this.addr,e)}function ET(n,e){n.uniform3iv(this.addr,e)}function TT(n,e){n.uniform4iv(this.addr,e)}function wT(n,e){n.uniform1uiv(this.addr,e)}function AT(n,e){n.uniform2uiv(this.addr,e)}function CT(n,e){n.uniform3uiv(this.addr,e)}function RT(n,e){n.uniform4uiv(this.addr,e)}function PT(n,e,t){const i=this.cache,s=e.length,r=pl(t,s);Yt(i,r)||(n.uniform1iv(this.addr,r),Kt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Mu:a=Mm;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function DT(n,e,t){const i=this.cache,s=e.length,r=pl(t,s);Yt(i,r)||(n.uniform1iv(this.addr,r),Kt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||bm,r[a])}function LT(n,e,t){const i=this.cache,s=e.length,r=pl(t,s);Yt(i,r)||(n.uniform1iv(this.addr,r),Kt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Em,r[a])}function IT(n,e,t){const i=this.cache,s=e.length,r=pl(t,s);Yt(i,r)||(n.uniform1iv(this.addr,r),Kt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Sm,r[a])}function UT(n){switch(n){case 5126:return mT;case 35664:return gT;case 35665:return _T;case 35666:return vT;case 35674:return xT;case 35675:return yT;case 35676:return MT;case 5124:case 35670:return ST;case 35667:case 35671:return bT;case 35668:case 35672:return ET;case 35669:case 35673:return TT;case 5125:return wT;case 36294:return AT;case 36295:return CT;case 36296:return RT;case 35678:case 36198:case 36298:case 36306:case 35682:return PT;case 35679:case 36299:case 36307:return DT;case 35680:case 36300:case 36308:case 36293:return LT;case 36289:case 36303:case 36311:case 36292:return IT}}class NT{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=pT(t.type)}}class FT{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=UT(t.type)}}class OT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const lc=/(\w+)(\])?(\[|\.)?/g;function df(n,e){n.seq.push(e),n.map[e.id]=e}function kT(n,e,t){const i=n.name,s=i.length;for(lc.lastIndex=0;;){const r=lc.exec(i),a=lc.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){df(t,c===void 0?new NT(o,n,e):new FT(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new OT(o),df(t,f)),t=f}}}class Ao{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);kT(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function ff(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const BT=37297;let zT=0;function VT(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const pf=new st;function HT(n){mt._getMatrix(pf,mt.workingColorSpace,n);const e=`mat3( ${pf.elements.map(t=>t.toFixed(4))} )`;switch(mt.getTransfer(n)){case Wo:return[e,"LinearTransferOETF"];case xt:return[e,"sRGBTransferOETF"];default:return Qe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function mf(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+VT(n.getShaderSource(e),o)}else return r}function GT(n,e){const t=HT(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const WT={[Xu]:"Linear",[$u]:"Reinhard",[qu]:"Cineon",[ul]:"ACESFilmic",[Ku]:"AgX",[Zu]:"Neutral",[Yu]:"Custom"};function XT(n,e){const t=WT[e];return t===void 0?(Qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const io=new B;function $T(){mt.getLuminanceCoefficients(io);const n=io.x.toFixed(4),e=io.y.toFixed(4),t=io.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qT(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gr).join(`
`)}function YT(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function KT(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Gr(n){return n!==""}function gf(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function _f(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ZT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Su(n){return n.replace(ZT,jT)}const JT=new Map;function jT(n,e){let t=ct[e];if(t===void 0){const i=JT.get(e);if(i!==void 0)t=ct[i],Qe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Su(t)}const QT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vf(n){return n.replace(QT,ew)}function ew(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function xf(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const tw={[xo]:"SHADOWMAP_TYPE_PCF",[Hr]:"SHADOWMAP_TYPE_VSM"};function nw(n){return tw[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const iw={[Ds]:"ENVMAP_TYPE_CUBE",[xr]:"ENVMAP_TYPE_CUBE",[hl]:"ENVMAP_TYPE_CUBE_UV"};function sw(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":iw[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const rw={[xr]:"ENVMAP_MODE_REFRACTION"};function aw(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":rw[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ow={[Jp]:"ENVMAP_BLENDING_MULTIPLY",[WM]:"ENVMAP_BLENDING_MIX",[XM]:"ENVMAP_BLENDING_ADD"};function lw(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":ow[n.combine]||"ENVMAP_BLENDING_NONE"}function cw(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function uw(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=nw(t),c=sw(t),u=aw(t),f=lw(t),h=cw(t),p=qT(t),g=YT(r),_=s.createProgram();let d,m,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Gr).join(`
`),d.length>0&&(d+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Gr).join(`
`),m.length>0&&(m+=`
`)):(d=[xf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gr).join(`
`),m=[xf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==mi?"#define TONE_MAPPING":"",t.toneMapping!==mi?ct.tonemapping_pars_fragment:"",t.toneMapping!==mi?XT("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ct.colorspace_pars_fragment,GT("linearToOutputTexel",t.outputColorSpace),$T(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gr).join(`
`)),a=Su(a),a=gf(a,t),a=_f(a,t),o=Su(o),o=gf(o,t),o=_f(o,t),a=vf(a),o=vf(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,d=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,m=["#define varying in",t.glslVersion===Sd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const R=T+d+a,M=T+m+o,S=ff(s,s.VERTEX_SHADER,R),b=ff(s,s.FRAGMENT_SHADER,M);s.attachShader(_,S),s.attachShader(_,b),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function D(C){if(n.debug.checkShaderErrors){const L=s.getProgramInfoLog(_)||"",X=s.getShaderInfoLog(S)||"",q=s.getShaderInfoLog(b)||"",H=L.trim(),K=X.trim(),V=q.trim();let Z=!0,ne=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,S,b);else{const pe=mf(s,S,"vertex"),Me=mf(s,b,"fragment");gt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+H+`
`+pe+`
`+Me)}else H!==""?Qe("WebGLProgram: Program Info Log:",H):(K===""||V==="")&&(ne=!1);ne&&(C.diagnostics={runnable:Z,programLog:H,vertexShader:{log:K,prefix:d},fragmentShader:{log:V,prefix:m}})}s.deleteShader(S),s.deleteShader(b),y=new Ao(s,_),w=KT(s,_)}let y;this.getUniforms=function(){return y===void 0&&D(this),y};let w;this.getAttributes=function(){return w===void 0&&D(this),w};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(_,BT)),F},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zT++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=b,this}let hw=0;class dw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new fw(e),t.set(e,i)),i}}class fw{constructor(e){this.id=hw++,this.code=e,this.usedTimes=0}}function pw(n){return n===Ls||n===Vo||n===Ho}function mw(n,e,t,i,s,r){const a=new ah,o=new dw,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function _(y,w,F,C,L,X){const q=C.fog,H=L.geometry,K=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?C.environment:null,V=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,Z=e.get(y.envMap||K,V),ne=Z&&Z.mapping===hl?Z.image.height:null,pe=p[y.type];y.precision!==null&&(h=i.getMaxPrecision(y.precision),h!==y.precision&&Qe("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));const Me=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ee=Me!==void 0?Me.length:0;let it=0;H.morphAttributes.position!==void 0&&(it=1),H.morphAttributes.normal!==void 0&&(it=2),H.morphAttributes.color!==void 0&&(it=3);let ge,re,G,ve;if(pe){const Ge=li[pe];ge=Ge.vertexShader,re=Ge.fragmentShader}else{ge=y.vertexShader,re=y.fragmentShader;const Ge=o.getVertexShaderStage(y),Ft=o.getFragmentShaderStage(y);o.update(y,Ge,Ft),G=Ge.id,ve=Ft.id}const ye=n.getRenderTarget(),et=n.state.buffers.depth.getReversed(),tt=L.isInstancedMesh===!0,Je=L.isBatchedMesh===!0,U=!!y.map,k=!!y.matcap,Q=!!Z,oe=!!y.aoMap,ie=!!y.lightMap,ue=!!y.bumpMap&&y.wireframe===!1,Se=!!y.normalMap,_e=!!y.displacementMap,me=!!y.emissiveMap,le=!!y.metalnessMap,Fe=!!y.roughnessMap,I=y.anisotropy>0,Be=y.clearcoat>0,Pe=y.dispersion>0,A=y.iridescence>0,x=y.sheen>0,z=y.transmission>0,Y=I&&!!y.anisotropyMap,te=Be&&!!y.clearcoatMap,xe=Be&&!!y.clearcoatNormalMap,Te=Be&&!!y.clearcoatRoughnessMap,se=A&&!!y.iridescenceMap,ce=A&&!!y.iridescenceThicknessMap,be=x&&!!y.sheenColorMap,ke=x&&!!y.sheenRoughnessMap,Ce=!!y.specularMap,we=!!y.specularColorMap,Ke=!!y.specularIntensityMap,je=z&&!!y.transmissionMap,at=z&&!!y.thicknessMap,W=!!y.gradientMap,Ae=!!y.alphaMap,he=y.alphaTest>0,Re=!!y.alphaHash,Ue=!!y.extensions;let fe=mi;y.toneMapped&&(ye===null||ye.isXRRenderTarget===!0)&&(fe=n.toneMapping);const Xe={shaderID:pe,shaderType:y.type,shaderName:y.name,vertexShader:ge,fragmentShader:re,defines:y.defines,customVertexShaderID:G,customFragmentShaderID:ve,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:Je,batchingColor:Je&&L._colorsTexture!==null,instancing:tt,instancingColor:tt&&L.instanceColor!==null,instancingMorph:tt&&L.morphTexture!==null,outputColorSpace:ye===null?n.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:mt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:U,matcap:k,envMap:Q,envMapMode:Q&&Z.mapping,envMapCubeUVHeight:ne,aoMap:oe,lightMap:ie,bumpMap:ue,normalMap:Se,displacementMap:_e,emissiveMap:me,normalMapObjectSpace:Se&&y.normalMapType===YM,normalMapTangentSpace:Se&&y.normalMapType===pu,packedNormalMap:Se&&y.normalMapType===pu&&pw(y.normalMap.format),metalnessMap:le,roughnessMap:Fe,anisotropy:I,anisotropyMap:Y,clearcoat:Be,clearcoatMap:te,clearcoatNormalMap:xe,clearcoatRoughnessMap:Te,dispersion:Pe,iridescence:A,iridescenceMap:se,iridescenceThicknessMap:ce,sheen:x,sheenColorMap:be,sheenRoughnessMap:ke,specularMap:Ce,specularColorMap:we,specularIntensityMap:Ke,transmission:z,transmissionMap:je,thicknessMap:at,gradientMap:W,opaque:y.transparent===!1&&y.blending===dr&&y.alphaToCoverage===!1,alphaMap:Ae,alphaTest:he,alphaHash:Re,combine:y.combine,mapUv:U&&g(y.map.channel),aoMapUv:oe&&g(y.aoMap.channel),lightMapUv:ie&&g(y.lightMap.channel),bumpMapUv:ue&&g(y.bumpMap.channel),normalMapUv:Se&&g(y.normalMap.channel),displacementMapUv:_e&&g(y.displacementMap.channel),emissiveMapUv:me&&g(y.emissiveMap.channel),metalnessMapUv:le&&g(y.metalnessMap.channel),roughnessMapUv:Fe&&g(y.roughnessMap.channel),anisotropyMapUv:Y&&g(y.anisotropyMap.channel),clearcoatMapUv:te&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:xe&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:be&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:ke&&g(y.sheenRoughnessMap.channel),specularMapUv:Ce&&g(y.specularMap.channel),specularColorMapUv:we&&g(y.specularColorMap.channel),specularIntensityMapUv:Ke&&g(y.specularIntensityMap.channel),transmissionMapUv:je&&g(y.transmissionMap.channel),thicknessMapUv:at&&g(y.thicknessMap.channel),alphaMapUv:Ae&&g(y.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Se||I),vertexNormals:!!H.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!H.attributes.uv&&(U||Ae),fog:!!q,useFog:y.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||H.attributes.normal===void 0&&Se===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:et,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:it,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:X.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&F.length>0,shadowMapType:n.shadowMap.type,toneMapping:fe,decodeVideoTexture:U&&y.map.isVideoTexture===!0&&mt.getTransfer(y.map.colorSpace)===xt,decodeVideoTextureEmissive:me&&y.emissiveMap.isVideoTexture===!0&&mt.getTransfer(y.emissiveMap.colorSpace)===xt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===ci,flipSided:y.side===bn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ue&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ue&&y.extensions.multiDraw===!0||Je)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Xe.vertexUv1s=l.has(1),Xe.vertexUv2s=l.has(2),Xe.vertexUv3s=l.has(3),l.clear(),Xe}function d(y){const w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(const F in y.defines)w.push(F),w.push(y.defines[F]);return y.isRawShaderMaterial===!1&&(m(w,y),T(w,y),w.push(n.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function m(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function T(y,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function R(y){const w=p[y.type];let F;if(w){const C=li[w];F=ua.clone(C.uniforms)}else F=y.uniforms;return F}function M(y,w){let F=u.get(w);return F!==void 0?++F.usedTimes:(F=new uw(n,w,y,s),c.push(F),u.set(w,F)),F}function S(y){if(--y.usedTimes===0){const w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function b(y){o.remove(y)}function D(){o.dispose()}return{getParameters:_,getProgramCacheKey:d,getUniforms:R,acquireProgram:M,releaseProgram:S,releaseShaderCache:b,programs:c,dispose:D}}function gw(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function _w(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function yf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Mf(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,g,_,d,m){let T=n[e];return T===void 0?(T={id:h.id,object:h,geometry:p,material:g,materialVariant:a(h),groupOrder:_,renderOrder:h.renderOrder,z:d,group:m},n[e]=T):(T.id=h.id,T.object=h,T.geometry=p,T.material=g,T.materialVariant=a(h),T.groupOrder=_,T.renderOrder=h.renderOrder,T.z=d,T.group=m),e++,T}function l(h,p,g,_,d,m){const T=o(h,p,g,_,d,m);g.transmission>0?i.push(T):g.transparent===!0?s.push(T):t.push(T)}function c(h,p,g,_,d,m){const T=o(h,p,g,_,d,m);g.transmission>0?i.unshift(T):g.transparent===!0?s.unshift(T):t.unshift(T)}function u(h,p,g){t.length>1&&t.sort(h||_w),i.length>1&&i.sort(p||yf),s.length>1&&s.sort(p||yf),g&&(t.reverse(),i.reverse(),s.reverse())}function f(){for(let h=e,p=n.length;h<p;h++){const g=n[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:f,sort:u}}function vw(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Mf,n.set(i,[a])):s>=r.length?(a=new Mf,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function xw(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new Ye};break;case"SpotLight":t={position:new B,direction:new B,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new B,halfWidth:new B,halfHeight:new B};break}return n[e.id]=t,t}}}function yw(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Mw=0;function Sw(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function bw(n){const e=new xw,t=yw(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);const s=new B,r=new It,a=new It;function o(c){let u=0,f=0,h=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,g=0,_=0,d=0,m=0,T=0,R=0,M=0,S=0,b=0,D=0;c.sort(Sw);for(let w=0,F=c.length;w<F;w++){const C=c[w],L=C.color,X=C.intensity,q=C.distance;let H=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Ls?H=C.shadow.map.texture:H=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)u+=L.r*X,f+=L.g*X,h+=L.b*X;else if(C.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(C.sh.coefficients[K],X);D++}else if(C.isDirectionalLight){const K=e.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const V=C.shadow,Z=t.get(C);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,i.directionalShadow[p]=Z,i.directionalShadowMap[p]=H,i.directionalShadowMatrix[p]=C.shadow.matrix,T++}i.directional[p]=K,p++}else if(C.isSpotLight){const K=e.get(C);K.position.setFromMatrixPosition(C.matrixWorld),K.color.copy(L).multiplyScalar(X),K.distance=q,K.coneCos=Math.cos(C.angle),K.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),K.decay=C.decay,i.spot[_]=K;const V=C.shadow;if(C.map&&(i.spotLightMap[S]=C.map,S++,V.updateMatrices(C),C.castShadow&&b++),i.spotLightMatrix[_]=V.matrix,C.castShadow){const Z=t.get(C);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,i.spotShadow[_]=Z,i.spotShadowMap[_]=H,M++}_++}else if(C.isRectAreaLight){const K=e.get(C);K.color.copy(L).multiplyScalar(X),K.halfWidth.set(C.width*.5,0,0),K.halfHeight.set(0,C.height*.5,0),i.rectArea[d]=K,d++}else if(C.isPointLight){const K=e.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity),K.distance=C.distance,K.decay=C.decay,C.castShadow){const V=C.shadow,Z=t.get(C);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,Z.shadowCameraNear=V.camera.near,Z.shadowCameraFar=V.camera.far,i.pointShadow[g]=Z,i.pointShadowMap[g]=H,i.pointShadowMatrix[g]=C.shadow.matrix,R++}i.point[g]=K,g++}else if(C.isHemisphereLight){const K=e.get(C);K.skyColor.copy(C.color).multiplyScalar(X),K.groundColor.copy(C.groundColor).multiplyScalar(X),i.hemi[m]=K,m++}}d>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=De.LTC_FLOAT_1,i.rectAreaLTC2=De.LTC_FLOAT_2):(i.rectAreaLTC1=De.LTC_HALF_1,i.rectAreaLTC2=De.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const y=i.hash;(y.directionalLength!==p||y.pointLength!==g||y.spotLength!==_||y.rectAreaLength!==d||y.hemiLength!==m||y.numDirectionalShadows!==T||y.numPointShadows!==R||y.numSpotShadows!==M||y.numSpotMaps!==S||y.numLightProbes!==D)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=d,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=M+S-b,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=D,y.directionalLength=p,y.pointLength=g,y.spotLength=_,y.rectAreaLength=d,y.hemiLength=m,y.numDirectionalShadows=T,y.numPointShadows=R,y.numSpotShadows=M,y.numSpotMaps=S,y.numLightProbes=D,i.version=Mw++)}function l(c,u){let f=0,h=0,p=0,g=0,_=0;const d=u.matrixWorldInverse;for(let m=0,T=c.length;m<T;m++){const R=c[m];if(R.isDirectionalLight){const M=i.directional[f];M.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(d),f++}else if(R.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(R.matrixWorld),M.position.applyMatrix4(d),M.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(d),p++}else if(R.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(R.matrixWorld),M.position.applyMatrix4(d),a.identity(),r.copy(R.matrixWorld),r.premultiply(d),a.extractRotation(r),M.halfWidth.set(R.width*.5,0,0),M.halfHeight.set(0,R.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(R.isPointLight){const M=i.point[h];M.position.setFromMatrixPosition(R.matrixWorld),M.position.applyMatrix4(d),h++}else if(R.isHemisphereLight){const M=i.hemi[_];M.direction.setFromMatrixPosition(R.matrixWorld),M.direction.transformDirection(d),_++}}}return{setup:o,setupView:l,state:i}}function Sf(n){const e=new bw(n),t=[],i=[],s=[];function r(h){f.camera=h,t.length=0,i.length=0,s.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Ew(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Sf(n),e.set(s,[o])):r>=a.length?(o=new Sf(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Tw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ww=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Aw=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],Cw=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],bf=new It,Br=new B,cc=new B;function Rw(n,e,t){let i=new lh;const s=new Oe,r=new Oe,a=new Nt,o=new NS,l=new FS,c={},u=t.maxTextureSize,f={[rs]:bn,[bn]:rs,[ci]:ci},h=new zt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:Tw,fragmentShader:ww}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ut;g.setAttribute("position",new kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Mt(g,h),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xo;let m=this.type;this.render=function(b,D,y){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||b.length===0)return;this.type===Zp&&(Qe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=xo);const w=n.getRenderTarget(),F=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),L=n.state;L.setBlending(pi),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const X=m!==this.type;X&&D.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(H=>H.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,H=b.length;q<H;q++){const K=b[q],V=K.shadow;if(V===void 0){Qe("WebGLShadowMap:",K,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const Z=V.getFrameExtents();s.multiply(Z),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Z.x),s.x=r.x*Z.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Z.y),s.y=r.y*Z.y,V.mapSize.y=r.y));const ne=n.state.buffers.depth.getReversed();if(V.camera._reversedDepth=ne,V.map===null||X===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Hr){if(K.isPointLight){Qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new xn(s.x,s.y,{format:Ls,type:En,minFilter:un,magFilter:un,generateMipmaps:!1}),V.map.texture.name=K.name+".shadowMap",V.map.depthTexture=new yr(s.x,s.y,hi),V.map.depthTexture.name=K.name+".shadowMapDepth",V.map.depthTexture.format=Ui,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=en,V.map.depthTexture.magFilter=en}else K.isPointLight?(V.map=new ym(s.x),V.map.depthTexture=new DS(s.x,_i)):(V.map=new xn(s.x,s.y),V.map.depthTexture=new yr(s.x,s.y,_i)),V.map.depthTexture.name=K.name+".shadowMap",V.map.depthTexture.format=Ui,this.type===xo?(V.map.depthTexture.compareFunction=ne?sh:ih,V.map.depthTexture.minFilter=un,V.map.depthTexture.magFilter=un):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=en,V.map.depthTexture.magFilter=en);V.camera.updateProjectionMatrix()}const pe=V.map.isWebGLCubeRenderTarget?6:1;for(let Me=0;Me<pe;Me++){if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,Me),n.clear();else{Me===0&&(n.setRenderTarget(V.map),n.clear());const Ee=V.getViewport(Me);a.set(r.x*Ee.x,r.y*Ee.y,r.x*Ee.z,r.y*Ee.w),L.viewport(a)}if(K.isPointLight){const Ee=V.camera,it=V.matrix,ge=K.distance||Ee.far;ge!==Ee.far&&(Ee.far=ge,Ee.updateProjectionMatrix()),Br.setFromMatrixPosition(K.matrixWorld),Ee.position.copy(Br),cc.copy(Ee.position),cc.add(Aw[Me]),Ee.up.copy(Cw[Me]),Ee.lookAt(cc),Ee.updateMatrixWorld(),it.makeTranslation(-Br.x,-Br.y,-Br.z),bf.multiplyMatrices(Ee.projectionMatrix,Ee.matrixWorldInverse),V._frustum.setFromProjectionMatrix(bf,Ee.coordinateSystem,Ee.reversedDepth)}else V.updateMatrices(K);i=V.getFrustum(),M(D,y,V.camera,K,this.type)}V.isPointLightShadow!==!0&&this.type===Hr&&T(V,y),V.needsUpdate=!1}m=this.type,d.needsUpdate=!1,n.setRenderTarget(w,F,C)};function T(b,D){const y=e.update(_);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new xn(s.x,s.y,{format:Ls,type:En})),h.uniforms.shadow_pass.value=b.map.depthTexture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(D,null,y,h,_,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(D,null,y,p,_,null)}function R(b,D,y,w){let F=null;const C=y.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(C!==void 0)F=C;else if(F=y.isPointLight===!0?l:o,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const L=F.uuid,X=D.uuid;let q=c[L];q===void 0&&(q={},c[L]=q);let H=q[X];H===void 0&&(H=F.clone(),q[X]=H,D.addEventListener("dispose",S)),F=H}if(F.visible=D.visible,F.wireframe=D.wireframe,w===Hr?F.side=D.shadowSide!==null?D.shadowSide:D.side:F.side=D.shadowSide!==null?D.shadowSide:f[D.side],F.alphaMap=D.alphaMap,F.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,F.map=D.map,F.clipShadows=D.clipShadows,F.clippingPlanes=D.clippingPlanes,F.clipIntersection=D.clipIntersection,F.displacementMap=D.displacementMap,F.displacementScale=D.displacementScale,F.displacementBias=D.displacementBias,F.wireframeLinewidth=D.wireframeLinewidth,F.linewidth=D.linewidth,y.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const L=n.properties.get(F);L.light=y}return F}function M(b,D,y,w,F){if(b.visible===!1)return;if(b.layers.test(D.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&F===Hr)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,b.matrixWorld);const X=e.update(b),q=b.material;if(Array.isArray(q)){const H=X.groups;for(let K=0,V=H.length;K<V;K++){const Z=H[K],ne=q[Z.materialIndex];if(ne&&ne.visible){const pe=R(b,ne,w,F);b.onBeforeShadow(n,b,D,y,X,pe,Z),n.renderBufferDirect(y,null,X,pe,b,Z),b.onAfterShadow(n,b,D,y,X,pe,Z)}}}else if(q.visible){const H=R(b,q,w,F);b.onBeforeShadow(n,b,D,y,X,H,null),n.renderBufferDirect(y,null,X,H,b,null),b.onAfterShadow(n,b,D,y,X,H,null)}}const L=b.children;for(let X=0,q=L.length;X<q;X++)M(L[X],D,y,w,F)}function S(b){b.target.removeEventListener("dispose",S);for(const y in c){const w=c[y],F=b.target.uuid;F in w&&(w[F].dispose(),delete w[F])}}}function Pw(n,e){function t(){let W=!1;const Ae=new Nt;let he=null;const Re=new Nt(0,0,0,0);return{setMask:function(Ue){he!==Ue&&!W&&(n.colorMask(Ue,Ue,Ue,Ue),he=Ue)},setLocked:function(Ue){W=Ue},setClear:function(Ue,fe,Xe,Ge,Ft){Ft===!0&&(Ue*=Ge,fe*=Ge,Xe*=Ge),Ae.set(Ue,fe,Xe,Ge),Re.equals(Ae)===!1&&(n.clearColor(Ue,fe,Xe,Ge),Re.copy(Ae))},reset:function(){W=!1,he=null,Re.set(-1,0,0,0)}}}function i(){let W=!1,Ae=!1,he=null,Re=null,Ue=null;return{setReversed:function(fe){if(Ae!==fe){const Xe=e.get("EXT_clip_control");fe?Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.ZERO_TO_ONE_EXT):Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.NEGATIVE_ONE_TO_ONE_EXT),Ae=fe;const Ge=Ue;Ue=null,this.setClear(Ge)}},getReversed:function(){return Ae},setTest:function(fe){fe?ye(n.DEPTH_TEST):et(n.DEPTH_TEST)},setMask:function(fe){he!==fe&&!W&&(n.depthMask(fe),he=fe)},setFunc:function(fe){if(Ae&&(fe=sS[fe]),Re!==fe){switch(fe){case Pc:n.depthFunc(n.NEVER);break;case Dc:n.depthFunc(n.ALWAYS);break;case Lc:n.depthFunc(n.LESS);break;case vr:n.depthFunc(n.LEQUAL);break;case Ic:n.depthFunc(n.EQUAL);break;case Uc:n.depthFunc(n.GEQUAL);break;case Nc:n.depthFunc(n.GREATER);break;case Fc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Re=fe}},setLocked:function(fe){W=fe},setClear:function(fe){Ue!==fe&&(Ue=fe,Ae&&(fe=1-fe),n.clearDepth(fe))},reset:function(){W=!1,he=null,Re=null,Ue=null,Ae=!1}}}function s(){let W=!1,Ae=null,he=null,Re=null,Ue=null,fe=null,Xe=null,Ge=null,Ft=null;return{setTest:function(Rt){W||(Rt?ye(n.STENCIL_TEST):et(n.STENCIL_TEST))},setMask:function(Rt){Ae!==Rt&&!W&&(n.stencilMask(Rt),Ae=Rt)},setFunc:function(Rt,jn,Qn){(he!==Rt||Re!==jn||Ue!==Qn)&&(n.stencilFunc(Rt,jn,Qn),he=Rt,Re=jn,Ue=Qn)},setOp:function(Rt,jn,Qn){(fe!==Rt||Xe!==jn||Ge!==Qn)&&(n.stencilOp(Rt,jn,Qn),fe=Rt,Xe=jn,Ge=Qn)},setLocked:function(Rt){W=Rt},setClear:function(Rt){Ft!==Rt&&(n.clearStencil(Rt),Ft=Rt)},reset:function(){W=!1,Ae=null,he=null,Re=null,Ue=null,fe=null,Xe=null,Ge=null,Ft=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let u={},f={},h={},p=new WeakMap,g=[],_=null,d=!1,m=null,T=null,R=null,M=null,S=null,b=null,D=null,y=new Ye(0,0,0),w=0,F=!1,C=null,L=null,X=null,q=null,H=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Z=0;const ne=n.getParameter(n.VERSION);ne.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(ne)[1]),V=Z>=1):ne.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),V=Z>=2);let pe=null,Me={};const Ee=n.getParameter(n.SCISSOR_BOX),it=n.getParameter(n.VIEWPORT),ge=new Nt().fromArray(Ee),re=new Nt().fromArray(it);function G(W,Ae,he,Re){const Ue=new Uint8Array(4),fe=n.createTexture();n.bindTexture(W,fe),n.texParameteri(W,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(W,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Xe=0;Xe<he;Xe++)W===n.TEXTURE_3D||W===n.TEXTURE_2D_ARRAY?n.texImage3D(Ae,0,n.RGBA,1,1,Re,0,n.RGBA,n.UNSIGNED_BYTE,Ue):n.texImage2D(Ae+Xe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ue);return fe}const ve={};ve[n.TEXTURE_2D]=G(n.TEXTURE_2D,n.TEXTURE_2D,1),ve[n.TEXTURE_CUBE_MAP]=G(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ve[n.TEXTURE_2D_ARRAY]=G(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ve[n.TEXTURE_3D]=G(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ye(n.DEPTH_TEST),a.setFunc(vr),ue(!1),Se(vd),ye(n.CULL_FACE),oe(pi);function ye(W){u[W]!==!0&&(n.enable(W),u[W]=!0)}function et(W){u[W]!==!1&&(n.disable(W),u[W]=!1)}function tt(W,Ae){return h[W]!==Ae?(n.bindFramebuffer(W,Ae),h[W]=Ae,W===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=Ae),W===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=Ae),!0):!1}function Je(W,Ae){let he=g,Re=!1;if(W){he=p.get(Ae),he===void 0&&(he=[],p.set(Ae,he));const Ue=W.textures;if(he.length!==Ue.length||he[0]!==n.COLOR_ATTACHMENT0){for(let fe=0,Xe=Ue.length;fe<Xe;fe++)he[fe]=n.COLOR_ATTACHMENT0+fe;he.length=Ue.length,Re=!0}}else he[0]!==n.BACK&&(he[0]=n.BACK,Re=!0);Re&&n.drawBuffers(he)}function U(W){return _!==W?(n.useProgram(W),_=W,!0):!1}const k={[ys]:n.FUNC_ADD,[AM]:n.FUNC_SUBTRACT,[CM]:n.FUNC_REVERSE_SUBTRACT};k[RM]=n.MIN,k[PM]=n.MAX;const Q={[DM]:n.ZERO,[LM]:n.ONE,[IM]:n.SRC_COLOR,[Cc]:n.SRC_ALPHA,[BM]:n.SRC_ALPHA_SATURATE,[OM]:n.DST_COLOR,[NM]:n.DST_ALPHA,[UM]:n.ONE_MINUS_SRC_COLOR,[Rc]:n.ONE_MINUS_SRC_ALPHA,[kM]:n.ONE_MINUS_DST_COLOR,[FM]:n.ONE_MINUS_DST_ALPHA,[zM]:n.CONSTANT_COLOR,[VM]:n.ONE_MINUS_CONSTANT_COLOR,[HM]:n.CONSTANT_ALPHA,[GM]:n.ONE_MINUS_CONSTANT_ALPHA};function oe(W,Ae,he,Re,Ue,fe,Xe,Ge,Ft,Rt){if(W===pi){d===!0&&(et(n.BLEND),d=!1);return}if(d===!1&&(ye(n.BLEND),d=!0),W!==wM){if(W!==m||Rt!==F){if((T!==ys||S!==ys)&&(n.blendEquation(n.FUNC_ADD),T=ys,S=ys),Rt)switch(W){case dr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case jt:n.blendFunc(n.ONE,n.ONE);break;case xd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case yd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:gt("WebGLState: Invalid blending: ",W);break}else switch(W){case dr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case jt:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case xd:gt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case yd:gt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:gt("WebGLState: Invalid blending: ",W);break}R=null,M=null,b=null,D=null,y.set(0,0,0),w=0,m=W,F=Rt}return}Ue=Ue||Ae,fe=fe||he,Xe=Xe||Re,(Ae!==T||Ue!==S)&&(n.blendEquationSeparate(k[Ae],k[Ue]),T=Ae,S=Ue),(he!==R||Re!==M||fe!==b||Xe!==D)&&(n.blendFuncSeparate(Q[he],Q[Re],Q[fe],Q[Xe]),R=he,M=Re,b=fe,D=Xe),(Ge.equals(y)===!1||Ft!==w)&&(n.blendColor(Ge.r,Ge.g,Ge.b,Ft),y.copy(Ge),w=Ft),m=W,F=!1}function ie(W,Ae){W.side===ci?et(n.CULL_FACE):ye(n.CULL_FACE);let he=W.side===bn;Ae&&(he=!he),ue(he),W.blending===dr&&W.transparent===!1?oe(pi):oe(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),a.setFunc(W.depthFunc),a.setTest(W.depthTest),a.setMask(W.depthWrite),r.setMask(W.colorWrite);const Re=W.stencilWrite;o.setTest(Re),Re&&(o.setMask(W.stencilWriteMask),o.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),o.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),me(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?ye(n.SAMPLE_ALPHA_TO_COVERAGE):et(n.SAMPLE_ALPHA_TO_COVERAGE)}function ue(W){C!==W&&(W?n.frontFace(n.CW):n.frontFace(n.CCW),C=W)}function Se(W){W!==EM?(ye(n.CULL_FACE),W!==L&&(W===vd?n.cullFace(n.BACK):W===TM?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):et(n.CULL_FACE),L=W}function _e(W){W!==X&&(V&&n.lineWidth(W),X=W)}function me(W,Ae,he){W?(ye(n.POLYGON_OFFSET_FILL),(q!==Ae||H!==he)&&(q=Ae,H=he,a.getReversed()&&(Ae=-Ae),n.polygonOffset(Ae,he))):et(n.POLYGON_OFFSET_FILL)}function le(W){W?ye(n.SCISSOR_TEST):et(n.SCISSOR_TEST)}function Fe(W){W===void 0&&(W=n.TEXTURE0+K-1),pe!==W&&(n.activeTexture(W),pe=W)}function I(W,Ae,he){he===void 0&&(pe===null?he=n.TEXTURE0+K-1:he=pe);let Re=Me[he];Re===void 0&&(Re={type:void 0,texture:void 0},Me[he]=Re),(Re.type!==W||Re.texture!==Ae)&&(pe!==he&&(n.activeTexture(he),pe=he),n.bindTexture(W,Ae||ve[W]),Re.type=W,Re.texture=Ae)}function Be(){const W=Me[pe];W!==void 0&&W.type!==void 0&&(n.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function Pe(){try{n.compressedTexImage2D(...arguments)}catch(W){gt("WebGLState:",W)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(W){gt("WebGLState:",W)}}function x(){try{n.texSubImage2D(...arguments)}catch(W){gt("WebGLState:",W)}}function z(){try{n.texSubImage3D(...arguments)}catch(W){gt("WebGLState:",W)}}function Y(){try{n.compressedTexSubImage2D(...arguments)}catch(W){gt("WebGLState:",W)}}function te(){try{n.compressedTexSubImage3D(...arguments)}catch(W){gt("WebGLState:",W)}}function xe(){try{n.texStorage2D(...arguments)}catch(W){gt("WebGLState:",W)}}function Te(){try{n.texStorage3D(...arguments)}catch(W){gt("WebGLState:",W)}}function se(){try{n.texImage2D(...arguments)}catch(W){gt("WebGLState:",W)}}function ce(){try{n.texImage3D(...arguments)}catch(W){gt("WebGLState:",W)}}function be(W){return f[W]!==void 0?f[W]:n.getParameter(W)}function ke(W,Ae){f[W]!==Ae&&(n.pixelStorei(W,Ae),f[W]=Ae)}function Ce(W){ge.equals(W)===!1&&(n.scissor(W.x,W.y,W.z,W.w),ge.copy(W))}function we(W){re.equals(W)===!1&&(n.viewport(W.x,W.y,W.z,W.w),re.copy(W))}function Ke(W,Ae){let he=c.get(Ae);he===void 0&&(he=new WeakMap,c.set(Ae,he));let Re=he.get(W);Re===void 0&&(Re=n.getUniformBlockIndex(Ae,W.name),he.set(W,Re))}function je(W,Ae){const Re=c.get(Ae).get(W);l.get(Ae)!==Re&&(n.uniformBlockBinding(Ae,Re,W.__bindingPointIndex),l.set(Ae,Re))}function at(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},pe=null,Me={},h={},p=new WeakMap,g=[],_=null,d=!1,m=null,T=null,R=null,M=null,S=null,b=null,D=null,y=new Ye(0,0,0),w=0,F=!1,C=null,L=null,X=null,q=null,H=null,ge.set(0,0,n.canvas.width,n.canvas.height),re.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ye,disable:et,bindFramebuffer:tt,drawBuffers:Je,useProgram:U,setBlending:oe,setMaterial:ie,setFlipSided:ue,setCullFace:Se,setLineWidth:_e,setPolygonOffset:me,setScissorTest:le,activeTexture:Fe,bindTexture:I,unbindTexture:Be,compressedTexImage2D:Pe,compressedTexImage3D:A,texImage2D:se,texImage3D:ce,pixelStorei:ke,getParameter:be,updateUBOMapping:Ke,uniformBlockBinding:je,texStorage2D:xe,texStorage3D:Te,texSubImage2D:x,texSubImage3D:z,compressedTexSubImage2D:Y,compressedTexSubImage3D:te,scissor:Ce,viewport:we,reset:at}}function Dw(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Oe,u=new WeakMap,f=new Set;let h;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,x){return g?new OffscreenCanvas(A,x):Xo("canvas")}function d(A,x,z){let Y=1;const te=Pe(A);if((te.width>z||te.height>z)&&(Y=z/Math.max(te.width,te.height)),Y<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const xe=Math.floor(Y*te.width),Te=Math.floor(Y*te.height);h===void 0&&(h=_(xe,Te));const se=x?_(xe,Te):h;return se.width=xe,se.height=Te,se.getContext("2d").drawImage(A,0,0,xe,Te),Qe("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+xe+"x"+Te+")."),se}else return"data"in A&&Qe("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),A;return A}function m(A){return A.generateMipmaps}function T(A){n.generateMipmap(A)}function R(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(A,x,z,Y,te,xe=!1){if(A!==null){if(n[A]!==void 0)return n[A];Qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Te;Y&&(Te=e.get("EXT_texture_norm16"),Te||Qe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let se=x;if(x===n.RED&&(z===n.FLOAT&&(se=n.R32F),z===n.HALF_FLOAT&&(se=n.R16F),z===n.UNSIGNED_BYTE&&(se=n.R8),z===n.UNSIGNED_SHORT&&Te&&(se=Te.R16_EXT),z===n.SHORT&&Te&&(se=Te.R16_SNORM_EXT)),x===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(se=n.R8UI),z===n.UNSIGNED_SHORT&&(se=n.R16UI),z===n.UNSIGNED_INT&&(se=n.R32UI),z===n.BYTE&&(se=n.R8I),z===n.SHORT&&(se=n.R16I),z===n.INT&&(se=n.R32I)),x===n.RG&&(z===n.FLOAT&&(se=n.RG32F),z===n.HALF_FLOAT&&(se=n.RG16F),z===n.UNSIGNED_BYTE&&(se=n.RG8),z===n.UNSIGNED_SHORT&&Te&&(se=Te.RG16_EXT),z===n.SHORT&&Te&&(se=Te.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(se=n.RG8UI),z===n.UNSIGNED_SHORT&&(se=n.RG16UI),z===n.UNSIGNED_INT&&(se=n.RG32UI),z===n.BYTE&&(se=n.RG8I),z===n.SHORT&&(se=n.RG16I),z===n.INT&&(se=n.RG32I)),x===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(se=n.RGB8UI),z===n.UNSIGNED_SHORT&&(se=n.RGB16UI),z===n.UNSIGNED_INT&&(se=n.RGB32UI),z===n.BYTE&&(se=n.RGB8I),z===n.SHORT&&(se=n.RGB16I),z===n.INT&&(se=n.RGB32I)),x===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(se=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(se=n.RGBA16UI),z===n.UNSIGNED_INT&&(se=n.RGBA32UI),z===n.BYTE&&(se=n.RGBA8I),z===n.SHORT&&(se=n.RGBA16I),z===n.INT&&(se=n.RGBA32I)),x===n.RGB&&(z===n.UNSIGNED_SHORT&&Te&&(se=Te.RGB16_EXT),z===n.SHORT&&Te&&(se=Te.RGB16_SNORM_EXT),z===n.UNSIGNED_INT_5_9_9_9_REV&&(se=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(se=n.R11F_G11F_B10F)),x===n.RGBA){const ce=xe?Wo:mt.getTransfer(te);z===n.FLOAT&&(se=n.RGBA32F),z===n.HALF_FLOAT&&(se=n.RGBA16F),z===n.UNSIGNED_BYTE&&(se=ce===xt?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT&&Te&&(se=Te.RGBA16_EXT),z===n.SHORT&&Te&&(se=Te.RGBA16_SNORM_EXT),z===n.UNSIGNED_SHORT_4_4_4_4&&(se=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(se=n.RGB5_A1)}return(se===n.R16F||se===n.R32F||se===n.RG16F||se===n.RG32F||se===n.RGBA16F||se===n.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function S(A,x){let z;return A?x===null||x===_i||x===la?z=n.DEPTH24_STENCIL8:x===hi?z=n.DEPTH32F_STENCIL8:x===oa&&(z=n.DEPTH24_STENCIL8,Qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===_i||x===la?z=n.DEPTH_COMPONENT24:x===hi?z=n.DEPTH_COMPONENT32F:x===oa&&(z=n.DEPTH_COMPONENT16),z}function b(A,x){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==en&&A.minFilter!==un?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function D(A){const x=A.target;x.removeEventListener("dispose",D),w(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&f.delete(x)}function y(A){const x=A.target;x.removeEventListener("dispose",y),C(x)}function w(A){const x=i.get(A);if(x.__webglInit===void 0)return;const z=A.source,Y=p.get(z);if(Y){const te=Y[x.__cacheKey];te.usedTimes--,te.usedTimes===0&&F(A),Object.keys(Y).length===0&&p.delete(z)}i.remove(A)}function F(A){const x=i.get(A);n.deleteTexture(x.__webglTexture);const z=A.source,Y=p.get(z);delete Y[x.__cacheKey],a.memory.textures--}function C(A){const x=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let te=0;te<x.__webglFramebuffer[Y].length;te++)n.deleteFramebuffer(x.__webglFramebuffer[Y][te]);else n.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)n.deleteFramebuffer(x.__webglFramebuffer[Y]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const z=A.textures;for(let Y=0,te=z.length;Y<te;Y++){const xe=i.get(z[Y]);xe.__webglTexture&&(n.deleteTexture(xe.__webglTexture),a.memory.textures--),i.remove(z[Y])}i.remove(A)}let L=0;function X(){L=0}function q(){return L}function H(A){L=A}function K(){const A=L;return A>=s.maxTextures&&Qe("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),L+=1,A}function V(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function Z(A,x){const z=i.get(A);if(A.isVideoTexture&&I(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&z.__version!==A.version){const Y=A.image;if(Y===null)Qe("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Qe("WebGLRenderer: Texture marked for update but image is incomplete");else{et(z,A,x);return}}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+x)}function ne(A,x){const z=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){et(z,A,x);return}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+x)}function pe(A,x){const z=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){et(z,A,x);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+x)}function Me(A,x){const z=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&z.__version!==A.version){tt(z,A,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+x)}const Ee={[zo]:n.REPEAT,[Ci]:n.CLAMP_TO_EDGE,[Oc]:n.MIRRORED_REPEAT},it={[en]:n.NEAREST,[$M]:n.NEAREST_MIPMAP_NEAREST,[Ca]:n.NEAREST_MIPMAP_LINEAR,[un]:n.LINEAR,[Pl]:n.LINEAR_MIPMAP_NEAREST,[bs]:n.LINEAR_MIPMAP_LINEAR},ge={[KM]:n.NEVER,[eS]:n.ALWAYS,[ZM]:n.LESS,[ih]:n.LEQUAL,[JM]:n.EQUAL,[sh]:n.GEQUAL,[jM]:n.GREATER,[QM]:n.NOTEQUAL};function re(A,x){if(x.type===hi&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===un||x.magFilter===Pl||x.magFilter===Ca||x.magFilter===bs||x.minFilter===un||x.minFilter===Pl||x.minFilter===Ca||x.minFilter===bs)&&Qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,Ee[x.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,Ee[x.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,Ee[x.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,it[x.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,it[x.minFilter]),x.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,ge[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===en||x.minFilter!==Ca&&x.minFilter!==bs||x.type===hi&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function G(A,x){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",D));const Y=x.source;let te=p.get(Y);te===void 0&&(te={},p.set(Y,te));const xe=V(x);if(xe!==A.__cacheKey){te[xe]===void 0&&(te[xe]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,z=!0),te[xe].usedTimes++;const Te=te[A.__cacheKey];Te!==void 0&&(te[A.__cacheKey].usedTimes--,Te.usedTimes===0&&F(x)),A.__cacheKey=xe,A.__webglTexture=te[xe].texture}return z}function ve(A,x,z){return Math.floor(Math.floor(A/z)/x)}function ye(A,x,z,Y){const xe=A.updateRanges;if(xe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,z,Y,x.data);else{xe.sort((ke,Ce)=>ke.start-Ce.start);let Te=0;for(let ke=1;ke<xe.length;ke++){const Ce=xe[Te],we=xe[ke],Ke=Ce.start+Ce.count,je=ve(we.start,x.width,4),at=ve(Ce.start,x.width,4);we.start<=Ke+1&&je===at&&ve(we.start+we.count-1,x.width,4)===je?Ce.count=Math.max(Ce.count,we.start+we.count-Ce.start):(++Te,xe[Te]=we)}xe.length=Te+1;const se=t.getParameter(n.UNPACK_ROW_LENGTH),ce=t.getParameter(n.UNPACK_SKIP_PIXELS),be=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let ke=0,Ce=xe.length;ke<Ce;ke++){const we=xe[ke],Ke=Math.floor(we.start/4),je=Math.ceil(we.count/4),at=Ke%x.width,W=Math.floor(Ke/x.width),Ae=je,he=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,at),t.pixelStorei(n.UNPACK_SKIP_ROWS,W),t.texSubImage2D(n.TEXTURE_2D,0,at,W,Ae,he,z,Y,x.data)}A.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,se),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ce),t.pixelStorei(n.UNPACK_SKIP_ROWS,be)}}function et(A,x,z){let Y=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=n.TEXTURE_3D);const te=G(A,x),xe=x.source;t.bindTexture(Y,A.__webglTexture,n.TEXTURE0+z);const Te=i.get(xe);if(xe.version!==Te.__version||te===!0){if(t.activeTexture(n.TEXTURE0+z),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const he=mt.getPrimaries(mt.workingColorSpace),Re=x.colorSpace===ji?null:mt.getPrimaries(x.colorSpace),Ue=x.colorSpace===ji||he===Re?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue)}t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let ce=d(x.image,!1,s.maxTextureSize);ce=Be(x,ce);const be=r.convert(x.format,x.colorSpace),ke=r.convert(x.type);let Ce=M(x.internalFormat,be,ke,x.normalized,x.colorSpace,x.isVideoTexture);re(Y,x);let we;const Ke=x.mipmaps,je=x.isVideoTexture!==!0,at=Te.__version===void 0||te===!0,W=xe.dataReady,Ae=b(x,ce);if(x.isDepthTexture)Ce=S(x.format===Es,x.type),at&&(je?t.texStorage2D(n.TEXTURE_2D,1,Ce,ce.width,ce.height):t.texImage2D(n.TEXTURE_2D,0,Ce,ce.width,ce.height,0,be,ke,null));else if(x.isDataTexture)if(Ke.length>0){je&&at&&t.texStorage2D(n.TEXTURE_2D,Ae,Ce,Ke[0].width,Ke[0].height);for(let he=0,Re=Ke.length;he<Re;he++)we=Ke[he],je?W&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,we.width,we.height,be,ke,we.data):t.texImage2D(n.TEXTURE_2D,he,Ce,we.width,we.height,0,be,ke,we.data);x.generateMipmaps=!1}else je?(at&&t.texStorage2D(n.TEXTURE_2D,Ae,Ce,ce.width,ce.height),W&&ye(x,ce,be,ke)):t.texImage2D(n.TEXTURE_2D,0,Ce,ce.width,ce.height,0,be,ke,ce.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){je&&at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ae,Ce,Ke[0].width,Ke[0].height,ce.depth);for(let he=0,Re=Ke.length;he<Re;he++)if(we=Ke[he],x.format!==qn)if(be!==null)if(je){if(W)if(x.layerUpdates.size>0){const Ue=ef(we.width,we.height,x.format,x.type);for(const fe of x.layerUpdates){const Xe=we.data.subarray(fe*Ue/we.data.BYTES_PER_ELEMENT,(fe+1)*Ue/we.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,fe,we.width,we.height,1,be,Xe)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,we.width,we.height,ce.depth,be,we.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,he,Ce,we.width,we.height,ce.depth,0,we.data,0,0);else Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?W&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,we.width,we.height,ce.depth,be,ke,we.data):t.texImage3D(n.TEXTURE_2D_ARRAY,he,Ce,we.width,we.height,ce.depth,0,be,ke,we.data)}else{je&&at&&t.texStorage2D(n.TEXTURE_2D,Ae,Ce,Ke[0].width,Ke[0].height);for(let he=0,Re=Ke.length;he<Re;he++)we=Ke[he],x.format!==qn?be!==null?je?W&&t.compressedTexSubImage2D(n.TEXTURE_2D,he,0,0,we.width,we.height,be,we.data):t.compressedTexImage2D(n.TEXTURE_2D,he,Ce,we.width,we.height,0,we.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?W&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,we.width,we.height,be,ke,we.data):t.texImage2D(n.TEXTURE_2D,he,Ce,we.width,we.height,0,be,ke,we.data)}else if(x.isDataArrayTexture)if(je){if(at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ae,Ce,ce.width,ce.height,ce.depth),W)if(x.layerUpdates.size>0){const he=ef(ce.width,ce.height,x.format,x.type);for(const Re of x.layerUpdates){const Ue=ce.data.subarray(Re*he/ce.data.BYTES_PER_ELEMENT,(Re+1)*he/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Re,ce.width,ce.height,1,be,ke,Ue)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,be,ke,ce.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ce,ce.width,ce.height,ce.depth,0,be,ke,ce.data);else if(x.isData3DTexture)je?(at&&t.texStorage3D(n.TEXTURE_3D,Ae,Ce,ce.width,ce.height,ce.depth),W&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,be,ke,ce.data)):t.texImage3D(n.TEXTURE_3D,0,Ce,ce.width,ce.height,ce.depth,0,be,ke,ce.data);else if(x.isFramebufferTexture){if(at)if(je)t.texStorage2D(n.TEXTURE_2D,Ae,Ce,ce.width,ce.height);else{let he=ce.width,Re=ce.height;for(let Ue=0;Ue<Ae;Ue++)t.texImage2D(n.TEXTURE_2D,Ue,Ce,he,Re,0,be,ke,null),he>>=1,Re>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){const he=n.canvas;if(he.hasAttribute("layoutsubtree")||he.setAttribute("layoutsubtree","true"),ce.parentNode!==he){he.appendChild(ce),f.add(x),he.onpaint=Re=>{const Ue=Re.changedElements;for(const fe of f)Ue.includes(fe.image)&&(fe.needsUpdate=!0)},he.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ce);else{const Ue=n.RGBA,fe=n.RGBA,Xe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ue,fe,Xe,ce)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ke.length>0){if(je&&at){const he=Pe(Ke[0]);t.texStorage2D(n.TEXTURE_2D,Ae,Ce,he.width,he.height)}for(let he=0,Re=Ke.length;he<Re;he++)we=Ke[he],je?W&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,be,ke,we):t.texImage2D(n.TEXTURE_2D,he,Ce,be,ke,we);x.generateMipmaps=!1}else if(je){if(at){const he=Pe(ce);t.texStorage2D(n.TEXTURE_2D,Ae,Ce,he.width,he.height)}W&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,be,ke,ce)}else t.texImage2D(n.TEXTURE_2D,0,Ce,be,ke,ce);m(x)&&T(Y),Te.__version=xe.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function tt(A,x,z){if(x.image.length!==6)return;const Y=G(A,x),te=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+z);const xe=i.get(te);if(te.version!==xe.__version||Y===!0){t.activeTexture(n.TEXTURE0+z);const Te=mt.getPrimaries(mt.workingColorSpace),se=x.colorSpace===ji?null:mt.getPrimaries(x.colorSpace),ce=x.colorSpace===ji||Te===se?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const be=x.isCompressedTexture||x.image[0].isCompressedTexture,ke=x.image[0]&&x.image[0].isDataTexture,Ce=[];for(let fe=0;fe<6;fe++)!be&&!ke?Ce[fe]=d(x.image[fe],!0,s.maxCubemapSize):Ce[fe]=ke?x.image[fe].image:x.image[fe],Ce[fe]=Be(x,Ce[fe]);const we=Ce[0],Ke=r.convert(x.format,x.colorSpace),je=r.convert(x.type),at=M(x.internalFormat,Ke,je,x.normalized,x.colorSpace),W=x.isVideoTexture!==!0,Ae=xe.__version===void 0||Y===!0,he=te.dataReady;let Re=b(x,we);re(n.TEXTURE_CUBE_MAP,x);let Ue;if(be){W&&Ae&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Re,at,we.width,we.height);for(let fe=0;fe<6;fe++){Ue=Ce[fe].mipmaps;for(let Xe=0;Xe<Ue.length;Xe++){const Ge=Ue[Xe];x.format!==qn?Ke!==null?W?he&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Xe,0,0,Ge.width,Ge.height,Ke,Ge.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Xe,at,Ge.width,Ge.height,0,Ge.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):W?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Xe,0,0,Ge.width,Ge.height,Ke,je,Ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Xe,at,Ge.width,Ge.height,0,Ke,je,Ge.data)}}}else{if(Ue=x.mipmaps,W&&Ae){Ue.length>0&&Re++;const fe=Pe(Ce[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Re,at,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(ke){W?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Ce[fe].width,Ce[fe].height,Ke,je,Ce[fe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,at,Ce[fe].width,Ce[fe].height,0,Ke,je,Ce[fe].data);for(let Xe=0;Xe<Ue.length;Xe++){const Ft=Ue[Xe].image[fe].image;W?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Xe+1,0,0,Ft.width,Ft.height,Ke,je,Ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Xe+1,at,Ft.width,Ft.height,0,Ke,je,Ft.data)}}else{W?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Ke,je,Ce[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,at,Ke,je,Ce[fe]);for(let Xe=0;Xe<Ue.length;Xe++){const Ge=Ue[Xe];W?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Xe+1,0,0,Ke,je,Ge.image[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Xe+1,at,Ke,je,Ge.image[fe])}}}m(x)&&T(n.TEXTURE_CUBE_MAP),xe.__version=te.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Je(A,x,z,Y,te,xe){const Te=r.convert(z.format,z.colorSpace),se=r.convert(z.type),ce=M(z.internalFormat,Te,se,z.normalized,z.colorSpace),be=i.get(x),ke=i.get(z);if(ke.__renderTarget=x,!be.__hasExternalTextures){const Ce=Math.max(1,x.width>>xe),we=Math.max(1,x.height>>xe);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,xe,ce,Ce,we,x.depth,0,Te,se,null):t.texImage2D(te,xe,ce,Ce,we,0,Te,se,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Fe(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,te,ke.__webglTexture,0,le(x)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,te,ke.__webglTexture,xe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function U(A,x,z){if(n.bindRenderbuffer(n.RENDERBUFFER,A),x.depthBuffer){const Y=x.depthTexture,te=Y&&Y.isDepthTexture?Y.type:null,xe=S(x.stencilBuffer,te),Te=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Fe(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le(x),xe,x.width,x.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,le(x),xe,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,xe,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Te,n.RENDERBUFFER,A)}else{const Y=x.textures;for(let te=0;te<Y.length;te++){const xe=Y[te],Te=r.convert(xe.format,xe.colorSpace),se=r.convert(xe.type),ce=M(xe.internalFormat,Te,se,xe.normalized,xe.colorSpace);Fe(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le(x),ce,x.width,x.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,le(x),ce,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,ce,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function k(A,x,z){const Y=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const te=i.get(x.depthTexture);if(te.__renderTarget=x,(!te.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Y){if(te.__webglInit===void 0&&(te.__webglInit=!0,x.depthTexture.addEventListener("dispose",D)),te.__webglTexture===void 0){te.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),re(n.TEXTURE_CUBE_MAP,x.depthTexture);const be=r.convert(x.depthTexture.format),ke=r.convert(x.depthTexture.type);let Ce;x.depthTexture.format===Ui?Ce=n.DEPTH_COMPONENT24:x.depthTexture.format===Es&&(Ce=n.DEPTH24_STENCIL8);for(let we=0;we<6;we++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Ce,x.width,x.height,0,be,ke,null)}}else Z(x.depthTexture,0);const xe=te.__webglTexture,Te=le(x),se=Y?n.TEXTURE_CUBE_MAP_POSITIVE_X+z:n.TEXTURE_2D,ce=x.depthTexture.format===Es?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===Ui)Fe(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,se,xe,0,Te):n.framebufferTexture2D(n.FRAMEBUFFER,ce,se,xe,0);else if(x.depthTexture.format===Es)Fe(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,se,xe,0,Te):n.framebufferTexture2D(n.FRAMEBUFFER,ce,se,xe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Q(A){const x=i.get(A),z=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const Y=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){const te=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",te)};Y.addEventListener("dispose",te),x.__depthDisposeCallback=te}x.__boundDepthTexture=Y}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(z)for(let Y=0;Y<6;Y++)k(x.__webglFramebuffer[Y],A,Y);else{const Y=A.texture.mipmaps;Y&&Y.length>0?k(x.__webglFramebuffer[0],A,0):k(x.__webglFramebuffer,A,0)}else if(z){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=n.createRenderbuffer(),U(x.__webglDepthbuffer[Y],A,!1);else{const te=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=x.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,xe),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,xe)}}else{const Y=A.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),U(x.__webglDepthbuffer,A,!1);else{const te=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,xe),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,xe)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function oe(A,x,z){const Y=i.get(A);x!==void 0&&Je(Y.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Q(A)}function ie(A){const x=A.texture,z=i.get(A),Y=i.get(x);A.addEventListener("dispose",y);const te=A.textures,xe=A.isWebGLCubeRenderTarget===!0,Te=te.length>1;if(Te||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=x.version,a.memory.textures++),xe){z.__webglFramebuffer=[];for(let se=0;se<6;se++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[se]=[];for(let ce=0;ce<x.mipmaps.length;ce++)z.__webglFramebuffer[se][ce]=n.createFramebuffer()}else z.__webglFramebuffer[se]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let se=0;se<x.mipmaps.length;se++)z.__webglFramebuffer[se]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(Te)for(let se=0,ce=te.length;se<ce;se++){const be=i.get(te[se]);be.__webglTexture===void 0&&(be.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&Fe(A)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let se=0;se<te.length;se++){const ce=te[se];z.__webglColorRenderbuffer[se]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[se]);const be=r.convert(ce.format,ce.colorSpace),ke=r.convert(ce.type),Ce=M(ce.internalFormat,be,ke,ce.normalized,ce.colorSpace,A.isXRRenderTarget===!0),we=le(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,we,Ce,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.RENDERBUFFER,z.__webglColorRenderbuffer[se])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),U(z.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(xe){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),re(n.TEXTURE_CUBE_MAP,x);for(let se=0;se<6;se++)if(x.mipmaps&&x.mipmaps.length>0)for(let ce=0;ce<x.mipmaps.length;ce++)Je(z.__webglFramebuffer[se][ce],A,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,ce);else Je(z.__webglFramebuffer[se],A,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);m(x)&&T(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let se=0,ce=te.length;se<ce;se++){const be=te[se],ke=i.get(be);let Ce=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Ce=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ce,ke.__webglTexture),re(Ce,be),Je(z.__webglFramebuffer,A,be,n.COLOR_ATTACHMENT0+se,Ce,0),m(be)&&T(Ce)}t.unbindTexture()}else{let se=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(se=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,Y.__webglTexture),re(se,x),x.mipmaps&&x.mipmaps.length>0)for(let ce=0;ce<x.mipmaps.length;ce++)Je(z.__webglFramebuffer[ce],A,x,n.COLOR_ATTACHMENT0,se,ce);else Je(z.__webglFramebuffer,A,x,n.COLOR_ATTACHMENT0,se,0);m(x)&&T(se),t.unbindTexture()}A.depthBuffer&&Q(A)}function ue(A){const x=A.textures;for(let z=0,Y=x.length;z<Y;z++){const te=x[z];if(m(te)){const xe=R(A),Te=i.get(te).__webglTexture;t.bindTexture(xe,Te),T(xe),t.unbindTexture()}}}const Se=[],_e=[];function me(A){if(A.samples>0){if(Fe(A)===!1){const x=A.textures,z=A.width,Y=A.height;let te=n.COLOR_BUFFER_BIT;const xe=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Te=i.get(A),se=x.length>1;if(se)for(let be=0;be<x.length;be++)t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);const ce=A.texture.mipmaps;ce&&ce.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let be=0;be<x.length;be++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),se){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Te.__webglColorRenderbuffer[be]);const ke=i.get(x[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ke,0)}n.blitFramebuffer(0,0,z,Y,0,0,z,Y,te,n.NEAREST),l===!0&&(Se.length=0,_e.length=0,Se.push(n.COLOR_ATTACHMENT0+be),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Se.push(xe),_e.push(xe),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,_e)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Se))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),se)for(let be=0;be<x.length;be++){t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,Te.__webglColorRenderbuffer[be]);const ke=i.get(x[be]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const x=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function le(A){return Math.min(s.maxSamples,A.samples)}function Fe(A){const x=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function I(A){const x=a.render.frame;u.get(A)!==x&&(u.set(A,x),A.update())}function Be(A,x){const z=A.colorSpace,Y=A.format,te=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==Go&&z!==ji&&(mt.getTransfer(z)===xt?(Y!==qn||te!==Ln)&&Qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):gt("WebGLTextures: Unsupported texture color space:",z)),x}function Pe(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=X,this.getTextureUnits=q,this.setTextureUnits=H,this.setTexture2D=Z,this.setTexture2DArray=ne,this.setTexture3D=pe,this.setTextureCube=Me,this.rebindTextures=oe,this.setupRenderTarget=ie,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=Q,this.setupFrameBufferTexture=Je,this.useMultisampledRTT=Fe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Lw(n,e){function t(i,s=ji){let r;const a=mt.getTransfer(s);if(i===Ln)return n.UNSIGNED_BYTE;if(i===ju)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Qu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===tm)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===nm)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Qp)return n.BYTE;if(i===em)return n.SHORT;if(i===oa)return n.UNSIGNED_SHORT;if(i===Ju)return n.INT;if(i===_i)return n.UNSIGNED_INT;if(i===hi)return n.FLOAT;if(i===En)return n.HALF_FLOAT;if(i===im)return n.ALPHA;if(i===sm)return n.RGB;if(i===qn)return n.RGBA;if(i===Ui)return n.DEPTH_COMPONENT;if(i===Es)return n.DEPTH_STENCIL;if(i===rm)return n.RED;if(i===eh)return n.RED_INTEGER;if(i===Ls)return n.RG;if(i===th)return n.RG_INTEGER;if(i===nh)return n.RGBA_INTEGER;if(i===Mo||i===So||i===bo||i===Eo)if(a===xt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Mo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===So)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Mo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===So)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===bo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Eo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===kc||i===Bc||i===zc||i===Vc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===kc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Bc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===zc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Vc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Hc||i===Gc||i===Wc||i===Xc||i===$c||i===Vo||i===qc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Hc||i===Gc)return a===xt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Wc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Xc)return r.COMPRESSED_R11_EAC;if(i===$c)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Vo)return r.COMPRESSED_RG11_EAC;if(i===qc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Yc||i===Kc||i===Zc||i===Jc||i===jc||i===Qc||i===eu||i===tu||i===nu||i===iu||i===su||i===ru||i===au||i===ou)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Yc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Kc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Zc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Jc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===jc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Qc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===eu)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===tu)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===nu)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===iu)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===su)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ru)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===au)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ou)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===lu||i===cu||i===uu)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===lu)return a===xt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===cu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===uu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===hu||i===du||i===Ho||i===fu)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===hu)return r.COMPRESSED_RED_RGTC1_EXT;if(i===du)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ho)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===fu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===la?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Iw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Uw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Nw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new fm(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new zt({vertexShader:Iw,fragmentShader:Uw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mt(new dl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Fw extends ls{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,g=null;const _=typeof XRWebGLBinding<"u",d=new Nw,m={},T=t.getContextAttributes();let R=null,M=null;const S=[],b=[],D=new Oe;let y=null;const w=new Pn;w.viewport=new Nt;const F=new Pn;F.viewport=new Nt;const C=[w,F],L=new VS;let X=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let ve=S[G];return ve===void 0&&(ve=new Ol,S[G]=ve),ve.getTargetRaySpace()},this.getControllerGrip=function(G){let ve=S[G];return ve===void 0&&(ve=new Ol,S[G]=ve),ve.getGripSpace()},this.getHand=function(G){let ve=S[G];return ve===void 0&&(ve=new Ol,S[G]=ve),ve.getHandSpace()};function H(G){const ve=b.indexOf(G.inputSource);if(ve===-1)return;const ye=S[ve];ye!==void 0&&(ye.update(G.inputSource,G.frame,c||a),ye.dispatchEvent({type:G.type,data:G.inputSource}))}function K(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",V);for(let G=0;G<S.length;G++){const ve=b[G];ve!==null&&(b[G]=null,S[G].disconnect(ve))}X=null,q=null,d.reset();for(const G in m)delete m[G];e.setRenderTarget(R),p=null,h=null,f=null,s=null,M=null,re.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,i.isPresenting===!0&&Qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,i.isPresenting===!0&&Qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(R=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",K),s.addEventListener("inputsourceschange",V),T.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(D),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,et=null,tt=null;T.depth&&(tt=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=T.stencil?Es:Ui,et=T.stencil?la:_i);const Je={colorFormat:t.RGBA8,depthFormat:tt,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Je),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new xn(h.textureWidth,h.textureHeight,{format:qn,type:Ln,depthTexture:new yr(h.textureWidth,h.textureHeight,et,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ye={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ye),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new xn(p.framebufferWidth,p.framebufferHeight,{format:qn,type:Ln,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),re.setContext(s),re.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function V(G){for(let ve=0;ve<G.removed.length;ve++){const ye=G.removed[ve],et=b.indexOf(ye);et>=0&&(b[et]=null,S[et].disconnect(ye))}for(let ve=0;ve<G.added.length;ve++){const ye=G.added[ve];let et=b.indexOf(ye);if(et===-1){for(let Je=0;Je<S.length;Je++)if(Je>=b.length){b.push(ye),et=Je;break}else if(b[Je]===null){b[Je]=ye,et=Je;break}if(et===-1)break}const tt=S[et];tt&&tt.connect(ye)}}const Z=new B,ne=new B;function pe(G,ve,ye){Z.setFromMatrixPosition(ve.matrixWorld),ne.setFromMatrixPosition(ye.matrixWorld);const et=Z.distanceTo(ne),tt=ve.projectionMatrix.elements,Je=ye.projectionMatrix.elements,U=tt[14]/(tt[10]-1),k=tt[14]/(tt[10]+1),Q=(tt[9]+1)/tt[5],oe=(tt[9]-1)/tt[5],ie=(tt[8]-1)/tt[0],ue=(Je[8]+1)/Je[0],Se=U*ie,_e=U*ue,me=et/(-ie+ue),le=me*-ie;if(ve.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(le),G.translateZ(me),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),tt[10]===-1)G.projectionMatrix.copy(ve.projectionMatrix),G.projectionMatrixInverse.copy(ve.projectionMatrixInverse);else{const Fe=U+me,I=k+me,Be=Se-le,Pe=_e+(et-le),A=Q*k/I*Fe,x=oe*k/I*Fe;G.projectionMatrix.makePerspective(Be,Pe,A,x,Fe,I),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function Me(G,ve){ve===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(ve.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;let ve=G.near,ye=G.far;d.texture!==null&&(d.depthNear>0&&(ve=d.depthNear),d.depthFar>0&&(ye=d.depthFar)),L.near=F.near=w.near=ve,L.far=F.far=w.far=ye,(X!==L.near||q!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),X=L.near,q=L.far),L.layers.mask=G.layers.mask|6,w.layers.mask=L.layers.mask&-5,F.layers.mask=L.layers.mask&-3;const et=G.parent,tt=L.cameras;Me(L,et);for(let Je=0;Je<tt.length;Je++)Me(tt[Je],et);tt.length===2?pe(L,w,F):L.projectionMatrix.copy(w.projectionMatrix),Ee(G,L,et)};function Ee(G,ve,ye){ye===null?G.matrix.copy(ve.matrixWorld):(G.matrix.copy(ye.matrixWorld),G.matrix.invert(),G.matrix.multiply(ve.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(ve.projectionMatrix),G.projectionMatrixInverse.copy(ve.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=gu*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(G){l=G,h!==null&&(h.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(L)},this.getCameraTexture=function(G){return m[G]};let it=null;function ge(G,ve){if(u=ve.getViewerPose(c||a),g=ve,u!==null){const ye=u.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let et=!1;ye.length!==L.cameras.length&&(L.cameras.length=0,et=!0);for(let k=0;k<ye.length;k++){const Q=ye[k];let oe=null;if(p!==null)oe=p.getViewport(Q);else{const ue=f.getViewSubImage(h,Q);oe=ue.viewport,k===0&&(e.setRenderTargetTextures(M,ue.colorTexture,ue.depthStencilTexture),e.setRenderTarget(M))}let ie=C[k];ie===void 0&&(ie=new Pn,ie.layers.enable(k),ie.viewport=new Nt,C[k]=ie),ie.matrix.fromArray(Q.transform.matrix),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.projectionMatrix.fromArray(Q.projectionMatrix),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert(),ie.viewport.set(oe.x,oe.y,oe.width,oe.height),k===0&&(L.matrix.copy(ie.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),et===!0&&L.cameras.push(ie)}const tt=s.enabledFeatures;if(tt&&tt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){f=i.getBinding();const k=f.getDepthInformation(ye[0]);k&&k.isValid&&k.texture&&d.init(k,s.renderState)}if(tt&&tt.includes("camera-access")&&_){e.state.unbindTexture(),f=i.getBinding();for(let k=0;k<ye.length;k++){const Q=ye[k].camera;if(Q){let oe=m[Q];oe||(oe=new fm,m[Q]=oe);const ie=f.getCameraImage(Q);oe.sourceTexture=ie}}}}for(let ye=0;ye<S.length;ye++){const et=b[ye],tt=S[ye];et!==null&&tt!==void 0&&tt.update(et,ve,c||a)}it&&it(G,ve),ve.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ve}),g=null}const re=new vm;re.setAnimationLoop(ge),this.setAnimationLoop=function(G){it=G},this.dispose=function(){}}}const Ow=new It,Tm=new st;Tm.set(-1,0,0,0,1,0,0,0,1);function kw(n,e){function t(d,m){d.matrixAutoUpdate===!0&&d.updateMatrix(),m.value.copy(d.matrix)}function i(d,m){m.color.getRGB(d.fogColor.value,pm(n)),m.isFog?(d.fogNear.value=m.near,d.fogFar.value=m.far):m.isFogExp2&&(d.fogDensity.value=m.density)}function s(d,m,T,R,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(d,m):m.isMeshLambertMaterial?(r(d,m),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(d,m),f(d,m)):m.isMeshPhongMaterial?(r(d,m),u(d,m),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(d,m),h(d,m),m.isMeshPhysicalMaterial&&p(d,m,M)):m.isMeshMatcapMaterial?(r(d,m),g(d,m)):m.isMeshDepthMaterial?r(d,m):m.isMeshDistanceMaterial?(r(d,m),_(d,m)):m.isMeshNormalMaterial?r(d,m):m.isLineBasicMaterial?(a(d,m),m.isLineDashedMaterial&&o(d,m)):m.isPointsMaterial?l(d,m,T,R):m.isSpriteMaterial?c(d,m):m.isShadowMaterial?(d.color.value.copy(m.color),d.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(d,m){d.opacity.value=m.opacity,m.color&&d.diffuse.value.copy(m.color),m.emissive&&d.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(d.map.value=m.map,t(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,t(m.alphaMap,d.alphaMapTransform)),m.bumpMap&&(d.bumpMap.value=m.bumpMap,t(m.bumpMap,d.bumpMapTransform),d.bumpScale.value=m.bumpScale,m.side===bn&&(d.bumpScale.value*=-1)),m.normalMap&&(d.normalMap.value=m.normalMap,t(m.normalMap,d.normalMapTransform),d.normalScale.value.copy(m.normalScale),m.side===bn&&d.normalScale.value.negate()),m.displacementMap&&(d.displacementMap.value=m.displacementMap,t(m.displacementMap,d.displacementMapTransform),d.displacementScale.value=m.displacementScale,d.displacementBias.value=m.displacementBias),m.emissiveMap&&(d.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,d.emissiveMapTransform)),m.specularMap&&(d.specularMap.value=m.specularMap,t(m.specularMap,d.specularMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest);const T=e.get(m),R=T.envMap,M=T.envMapRotation;R&&(d.envMap.value=R,d.envMapRotation.value.setFromMatrix4(Ow.makeRotationFromEuler(M)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&d.envMapRotation.value.premultiply(Tm),d.reflectivity.value=m.reflectivity,d.ior.value=m.ior,d.refractionRatio.value=m.refractionRatio),m.lightMap&&(d.lightMap.value=m.lightMap,d.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,d.lightMapTransform)),m.aoMap&&(d.aoMap.value=m.aoMap,d.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,d.aoMapTransform))}function a(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,m.map&&(d.map.value=m.map,t(m.map,d.mapTransform))}function o(d,m){d.dashSize.value=m.dashSize,d.totalSize.value=m.dashSize+m.gapSize,d.scale.value=m.scale}function l(d,m,T,R){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.size.value=m.size*T,d.scale.value=R*.5,m.map&&(d.map.value=m.map,t(m.map,d.uvTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,t(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function c(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.rotation.value=m.rotation,m.map&&(d.map.value=m.map,t(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,t(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function u(d,m){d.specular.value.copy(m.specular),d.shininess.value=Math.max(m.shininess,1e-4)}function f(d,m){m.gradientMap&&(d.gradientMap.value=m.gradientMap)}function h(d,m){d.metalness.value=m.metalness,m.metalnessMap&&(d.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,d.metalnessMapTransform)),d.roughness.value=m.roughness,m.roughnessMap&&(d.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,d.roughnessMapTransform)),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)}function p(d,m,T){d.ior.value=m.ior,m.sheen>0&&(d.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),d.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(d.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,d.sheenColorMapTransform)),m.sheenRoughnessMap&&(d.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,d.sheenRoughnessMapTransform))),m.clearcoat>0&&(d.clearcoat.value=m.clearcoat,d.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(d.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,d.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(d.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===bn&&d.clearcoatNormalScale.value.negate())),m.dispersion>0&&(d.dispersion.value=m.dispersion),m.iridescence>0&&(d.iridescence.value=m.iridescence,d.iridescenceIOR.value=m.iridescenceIOR,d.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(d.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,d.iridescenceMapTransform)),m.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),m.transmission>0&&(d.transmission.value=m.transmission,d.transmissionSamplerMap.value=T.texture,d.transmissionSamplerSize.value.set(T.width,T.height),m.transmissionMap&&(d.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,d.transmissionMapTransform)),d.thickness.value=m.thickness,m.thicknessMap&&(d.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=m.attenuationDistance,d.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(d.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(d.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=m.specularIntensity,d.specularColor.value.copy(m.specularColor),m.specularColorMap&&(d.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,d.specularColorMapTransform)),m.specularIntensityMap&&(d.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,m){m.matcap&&(d.matcap.value=m.matcap)}function _(d,m){const T=e.get(m).light;d.referencePosition.value.setFromMatrixPosition(T.matrixWorld),d.nearDistance.value=T.shadow.camera.near,d.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Bw(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,S){const b=S.program;i.uniformBlockBinding(M,b)}function c(M,S){let b=s[M.id];b===void 0&&(d(M),b=u(M),s[M.id]=b,M.addEventListener("dispose",T));const D=S.program;i.updateUBOMapping(M,D);const y=e.render.frame;r[M.id]!==y&&(h(M),r[M.id]=y)}function u(M){const S=f();M.__bindingPointIndex=S;const b=n.createBuffer(),D=M.__size,y=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,D,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,b),b}function f(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return gt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const S=s[M.id],b=M.uniforms,D=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let y=0,w=b.length;y<w;y++){const F=b[y];if(Array.isArray(F))for(let C=0,L=F.length;C<L;C++)p(F[C],y,C,D);else p(F,y,0,D)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(M,S,b,D){if(_(M,S,b,D)===!0){const y=M.__offset,w=M.value;if(Array.isArray(w)){let F=0;for(let C=0;C<w.length;C++){const L=w[C],X=m(L);g(L,M.__data,F),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(F+=X.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,M.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,M.__data)}}function g(M,S,b){typeof M=="number"||typeof M=="boolean"?S[0]=M:M.isMatrix3?(S[0]=M.elements[0],S[1]=M.elements[1],S[2]=M.elements[2],S[3]=0,S[4]=M.elements[3],S[5]=M.elements[4],S[6]=M.elements[5],S[7]=0,S[8]=M.elements[6],S[9]=M.elements[7],S[10]=M.elements[8],S[11]=0):ArrayBuffer.isView(M)?S.set(new M.constructor(M.buffer,M.byteOffset,S.length)):M.toArray(S,b)}function _(M,S,b,D){const y=M.value,w=S+"_"+b;if(D[w]===void 0)return typeof y=="number"||typeof y=="boolean"?D[w]=y:ArrayBuffer.isView(y)?D[w]=y.slice():D[w]=y.clone(),!0;{const F=D[w];if(typeof y=="number"||typeof y=="boolean"){if(F!==y)return D[w]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(F.equals(y)===!1)return F.copy(y),!0}}return!1}function d(M){const S=M.uniforms;let b=0;const D=16;for(let w=0,F=S.length;w<F;w++){const C=Array.isArray(S[w])?S[w]:[S[w]];for(let L=0,X=C.length;L<X;L++){const q=C[L],H=Array.isArray(q.value)?q.value:[q.value];for(let K=0,V=H.length;K<V;K++){const Z=H[K],ne=m(Z),pe=b%D,Me=pe%ne.boundary,Ee=pe+Me;b+=Me,Ee!==0&&D-Ee<ne.storage&&(b+=D-Ee),q.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=b,b+=ne.storage}}}const y=b%D;return y>0&&(b+=D-y),M.__size=b,M.__cache={},this}function m(M){const S={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(S.boundary=4,S.storage=4):M.isVector2?(S.boundary=8,S.storage=8):M.isVector3||M.isColor?(S.boundary=16,S.storage=12):M.isVector4?(S.boundary=16,S.storage=16):M.isMatrix3?(S.boundary=48,S.storage=48):M.isMatrix4?(S.boundary=64,S.storage=64):M.isTexture?Qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(S.boundary=16,S.storage=M.byteLength):Qe("WebGLRenderer: Unsupported uniform value type.",M),S}function T(M){const S=M.target;S.removeEventListener("dispose",T);const b=a.indexOf(S.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function R(){for(const M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:R}}const zw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ii=null;function Vw(){return ii===null&&(ii=new AS(zw,16,16,Ls,En),ii.name="DFG_LUT",ii.minFilter=un,ii.magFilter=un,ii.wrapS=Ci,ii.wrapT=Ci,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}class Hw{constructor(e={}){const{canvas:t=nS(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:p=Ln}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const _=p,d=new Set([nh,th,eh]),m=new Set([Ln,_i,oa,la,ju,Qu]),T=new Uint32Array(4),R=new Int32Array(4),M=new B;let S=null,b=null;const D=[],y=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=mi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const F=this;let C=!1,L=null,X=null,q=null,H=null;this._outputColorSpace=on;let K=0,V=0,Z=null,ne=-1,pe=null;const Me=new Nt,Ee=new Nt;let it=null;const ge=new Ye(0);let re=0,G=t.width,ve=t.height,ye=1,et=null,tt=null;const Je=new Nt(0,0,G,ve),U=new Nt(0,0,G,ve);let k=!1;const Q=new lh;let oe=!1,ie=!1;const ue=new It,Se=new B,_e=new Nt,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let le=!1;function Fe(){return Z===null?ye:1}let I=i;function Be(E,$){return t.getContext(E,$)}try{const E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wu}`),t.addEventListener("webglcontextlost",Ft,!1),t.addEventListener("webglcontextrestored",Rt,!1),t.addEventListener("webglcontextcreationerror",jn,!1),I===null){const $="webgl2";if(I=Be($,E),I===null)throw Be($)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw gt("WebGLRenderer: "+E.message),E}let Pe,A,x,z,Y,te,xe,Te,se,ce,be,ke,Ce,we,Ke,je,at,W,Ae,he,Re,Ue,fe;function Xe(){Pe=new VE(I),Pe.init(),Re=new Lw(I,Pe),A=new IE(I,Pe,e,Re),x=new Pw(I,Pe),A.reversedDepthBuffer&&h&&x.buffers.depth.setReversed(!0),X=I.createFramebuffer(),q=I.createFramebuffer(),H=I.createFramebuffer(),z=new WE(I),Y=new gw,te=new Dw(I,Pe,x,Y,A,Re,z),xe=new zE(F),Te=new YS(I),Ue=new DE(I,Te),se=new HE(I,Te,z,Ue),ce=new $E(I,se,Te,Ue,z),W=new XE(I,A,te),Ke=new UE(Y),be=new mw(F,xe,Pe,A,Ue,Ke),ke=new kw(F,Y),Ce=new vw,we=new Ew(Pe),at=new PE(F,xe,x,ce,g,l),je=new Rw(F,ce,A),fe=new Bw(I,z,A,x),Ae=new LE(I,Pe,z),he=new GE(I,Pe,z),z.programs=be.programs,F.capabilities=A,F.extensions=Pe,F.properties=Y,F.renderLists=Ce,F.shadowMap=je,F.state=x,F.info=z}Xe(),_!==Ln&&(w=new YE(_,t.width,t.height,o,s,r));const Ge=new Fw(F,I);this.xr=Ge,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const E=Pe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Pe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(E){E!==void 0&&(ye=E,this.setSize(G,ve,!1))},this.getSize=function(E){return E.set(G,ve)},this.setSize=function(E,$,ee=!0){if(Ge.isPresenting){Qe("WebGLRenderer: Can't change size while VR device is presenting.");return}G=E,ve=$,t.width=Math.floor(E*ye),t.height=Math.floor($*ye),ee===!0&&(t.style.width=E+"px",t.style.height=$+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,E,$)},this.getDrawingBufferSize=function(E){return E.set(G*ye,ve*ye).floor()},this.setDrawingBufferSize=function(E,$,ee){G=E,ve=$,ye=ee,t.width=Math.floor(E*ee),t.height=Math.floor($*ee),this.setViewport(0,0,E,$)},this.setEffects=function(E){if(_===Ln){gt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let $=0;$<E.length;$++)if(E[$].isOutputPass===!0){Qe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(Me)},this.getViewport=function(E){return E.copy(Je)},this.setViewport=function(E,$,ee,J){E.isVector4?Je.set(E.x,E.y,E.z,E.w):Je.set(E,$,ee,J),x.viewport(Me.copy(Je).multiplyScalar(ye).round())},this.getScissor=function(E){return E.copy(U)},this.setScissor=function(E,$,ee,J){E.isVector4?U.set(E.x,E.y,E.z,E.w):U.set(E,$,ee,J),x.scissor(Ee.copy(U).multiplyScalar(ye).round())},this.getScissorTest=function(){return k},this.setScissorTest=function(E){x.setScissorTest(k=E)},this.setOpaqueSort=function(E){et=E},this.setTransparentSort=function(E){tt=E},this.getClearColor=function(E){return E.copy(at.getClearColor())},this.setClearColor=function(){at.setClearColor(...arguments)},this.getClearAlpha=function(){return at.getClearAlpha()},this.setClearAlpha=function(){at.setClearAlpha(...arguments)},this.clear=function(E=!0,$=!0,ee=!0){let J=0;if(E){let j=!1;if(Z!==null){const Ie=Z.texture.format;j=d.has(Ie)}if(j){const Ie=Z.texture.type,Ve=m.has(Ie),Le=at.getClearColor(),We=at.getClearAlpha(),$e=Le.r,ot=Le.g,ut=Le.b;Ve?(T[0]=$e,T[1]=ot,T[2]=ut,T[3]=We,I.clearBufferuiv(I.COLOR,0,T)):(R[0]=$e,R[1]=ot,R[2]=ut,R[3]=We,I.clearBufferiv(I.COLOR,0,R))}else J|=I.COLOR_BUFFER_BIT}$&&(J|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ee&&(J|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&I.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),L=E},this.dispose=function(){t.removeEventListener("webglcontextlost",Ft,!1),t.removeEventListener("webglcontextrestored",Rt,!1),t.removeEventListener("webglcontextcreationerror",jn,!1),at.dispose(),Ce.dispose(),we.dispose(),Y.dispose(),xe.dispose(),ce.dispose(),Ue.dispose(),fe.dispose(),be.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",xh),Ge.removeEventListener("sessionend",yh),us.stop()};function Ft(E){E.preventDefault(),$o("WebGLRenderer: Context Lost."),C=!0}function Rt(){$o("WebGLRenderer: Context Restored."),C=!1;const E=z.autoReset,$=je.enabled,ee=je.autoUpdate,J=je.needsUpdate,j=je.type;Xe(),z.autoReset=E,je.enabled=$,je.autoUpdate=ee,je.needsUpdate=J,je.type=j}function jn(E){gt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Qn(E){const $=E.target;$.removeEventListener("dispose",Qn),Cm($)}function Cm(E){Rm(E),Y.remove(E)}function Rm(E){const $=Y.get(E).programs;$!==void 0&&($.forEach(function(ee){be.releaseProgram(ee)}),E.isShaderMaterial&&be.releaseShaderCache(E))}this.renderBufferDirect=function(E,$,ee,J,j,Ie){$===null&&($=me);const Ve=j.isMesh&&j.matrixWorld.determinantAffine()<0,Le=Lm(E,$,ee,J,j);x.setMaterial(J,Ve);let We=ee.index,$e=1;if(J.wireframe===!0){if(We=se.getWireframeAttribute(ee),We===void 0)return;$e=2}const ot=ee.drawRange,ut=ee.attributes.position;let qe=ot.start*$e,St=(ot.start+ot.count)*$e;Ie!==null&&(qe=Math.max(qe,Ie.start*$e),St=Math.min(St,(Ie.start+Ie.count)*$e)),We!==null?(qe=Math.max(qe,0),St=Math.min(St,We.count)):ut!=null&&(qe=Math.max(qe,0),St=Math.min(St,ut.count));const Ht=St-qe;if(Ht<0||Ht===1/0)return;Ue.setup(j,J,Le,ee,We);let Ot,wt=Ae;if(We!==null&&(Ot=Te.get(We),wt=he,wt.setIndex(Ot)),j.isMesh)J.wireframe===!0?(x.setLineWidth(J.wireframeLinewidth*Fe()),wt.setMode(I.LINES)):wt.setMode(I.TRIANGLES);else if(j.isLine){let nn=J.linewidth;nn===void 0&&(nn=1),x.setLineWidth(nn*Fe()),j.isLineSegments?wt.setMode(I.LINES):j.isLineLoop?wt.setMode(I.LINE_LOOP):wt.setMode(I.LINE_STRIP)}else j.isPoints?wt.setMode(I.POINTS):j.isSprite&&wt.setMode(I.TRIANGLES);if(j.isBatchedMesh)if(Pe.get("WEBGL_multi_draw"))wt.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const nn=j._multiDrawStarts,ze=j._multiDrawCounts,Tn=j._multiDrawCount,_t=We?Te.get(We).bytesPerElement:1,Nn=Y.get(J).currentProgram.getUniforms();for(let ei=0;ei<Tn;ei++)Nn.setValue(I,"_gl_DrawID",ei),wt.render(nn[ei]/_t,ze[ei])}else if(j.isInstancedMesh)wt.renderInstances(qe,Ht,j.count);else if(ee.isInstancedBufferGeometry){const nn=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,ze=Math.min(ee.instanceCount,nn);wt.renderInstances(qe,Ht,ze)}else wt.render(qe,Ht)};function vh(E,$,ee){E.transparent===!0&&E.side===ci&&E.forceSinglePass===!1?(E.side=bn,E.needsUpdate=!0,Ma(E,$,ee),E.side=rs,E.needsUpdate=!0,Ma(E,$,ee),E.side=ci):Ma(E,$,ee)}this.compile=function(E,$,ee=null){ee===null&&(ee=E),b=we.get(ee),b.init($),y.push(b),ee.traverseVisible(function(j){j.isLight&&j.layers.test($.layers)&&(b.pushLight(j),j.castShadow&&b.pushShadow(j))}),E!==ee&&E.traverseVisible(function(j){j.isLight&&j.layers.test($.layers)&&(b.pushLight(j),j.castShadow&&b.pushShadow(j))}),b.setupLights();const J=new Set;return E.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const Ie=j.material;if(Ie)if(Array.isArray(Ie))for(let Ve=0;Ve<Ie.length;Ve++){const Le=Ie[Ve];vh(Le,ee,j),J.add(Le)}else vh(Ie,ee,j),J.add(Ie)}),b=y.pop(),J},this.compileAsync=function(E,$,ee=null){const J=this.compile(E,$,ee);return new Promise(j=>{function Ie(){if(J.forEach(function(Ve){Y.get(Ve).currentProgram.isReady()&&J.delete(Ve)}),J.size===0){j(E);return}setTimeout(Ie,10)}Pe.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let ml=null;function Pm(E){ml&&ml(E)}function xh(){us.stop()}function yh(){us.start()}const us=new vm;us.setAnimationLoop(Pm),typeof self<"u"&&us.setContext(self),this.setAnimationLoop=function(E){ml=E,Ge.setAnimationLoop(E),E===null?us.stop():us.start()},Ge.addEventListener("sessionstart",xh),Ge.addEventListener("sessionend",yh),this.render=function(E,$){if($!==void 0&&$.isCamera!==!0){gt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;L!==null&&L.renderStart(E,$);const ee=Ge.enabled===!0&&Ge.isPresenting===!0,J=w!==null&&(Z===null||ee)&&w.begin(F,Z);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera($),$=Ge.getCamera()),E.isScene===!0&&E.onBeforeRender(F,E,$,Z),b=we.get(E,y.length),b.init($),b.state.textureUnits=te.getTextureUnits(),y.push(b),ue.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),Q.setFromProjectionMatrix(ue,di,$.reversedDepth),ie=this.localClippingEnabled,oe=Ke.init(this.clippingPlanes,ie),S=Ce.get(E,D.length),S.init(),D.push(S),Ge.enabled===!0&&Ge.isPresenting===!0){const Ve=F.xr.getDepthSensingMesh();Ve!==null&&gl(Ve,$,-1/0,F.sortObjects)}gl(E,$,0,F.sortObjects),S.finish(),F.sortObjects===!0&&S.sort(et,tt,$.reversedDepth),le=Ge.enabled===!1||Ge.isPresenting===!1||Ge.hasDepthSensing()===!1,le&&at.addToRenderList(S,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),oe===!0&&Ke.beginShadows();const j=b.state.shadowsArray;if(je.render(j,E,$),oe===!0&&Ke.endShadows(),(J&&w.hasRenderPass())===!1){const Ve=S.opaque,Le=S.transmissive;if(b.setupLights(),$.isArrayCamera){const We=$.cameras;if(Le.length>0)for(let $e=0,ot=We.length;$e<ot;$e++){const ut=We[$e];Sh(Ve,Le,E,ut)}le&&at.render(E);for(let $e=0,ot=We.length;$e<ot;$e++){const ut=We[$e];Mh(S,E,ut,ut.viewport)}}else Le.length>0&&Sh(Ve,Le,E,$),le&&at.render(E),Mh(S,E,$)}Z!==null&&V===0&&(te.updateMultisampleRenderTarget(Z),te.updateRenderTargetMipmap(Z)),J&&w.end(F),E.isScene===!0&&E.onAfterRender(F,E,$),Ue.resetDefaultState(),ne=-1,pe=null,y.pop(),y.length>0?(b=y[y.length-1],te.setTextureUnits(b.state.textureUnits),oe===!0&&Ke.setGlobalState(F.clippingPlanes,b.state.camera)):b=null,D.pop(),D.length>0?S=D[D.length-1]:S=null,L!==null&&L.renderEnd()};function gl(E,$,ee,J){if(E.visible===!1)return;if(E.layers.test($.layers)){if(E.isGroup)ee=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update($);else if(E.isLightProbeGrid)b.pushLightProbeGrid(E);else if(E.isLight)b.pushLight(E),E.castShadow&&b.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Q.intersectsSprite(E)){J&&_e.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ue);const Ve=ce.update(E),Le=E.material;Le.visible&&S.push(E,Ve,Le,ee,_e.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Q.intersectsObject(E))){const Ve=ce.update(E),Le=E.material;if(J&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),_e.copy(E.boundingSphere.center)):(Ve.boundingSphere===null&&Ve.computeBoundingSphere(),_e.copy(Ve.boundingSphere.center)),_e.applyMatrix4(E.matrixWorld).applyMatrix4(ue)),Array.isArray(Le)){const We=Ve.groups;for(let $e=0,ot=We.length;$e<ot;$e++){const ut=We[$e],qe=Le[ut.materialIndex];qe&&qe.visible&&S.push(E,Ve,qe,ee,_e.z,ut)}}else Le.visible&&S.push(E,Ve,Le,ee,_e.z,null)}}const Ie=E.children;for(let Ve=0,Le=Ie.length;Ve<Le;Ve++)gl(Ie[Ve],$,ee,J)}function Mh(E,$,ee,J){const{opaque:j,transmissive:Ie,transparent:Ve}=E;b.setupLightsView(ee),oe===!0&&Ke.setGlobalState(F.clippingPlanes,ee),J&&x.viewport(Me.copy(J)),j.length>0&&ya(j,$,ee),Ie.length>0&&ya(Ie,$,ee),Ve.length>0&&ya(Ve,$,ee),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Sh(E,$,ee,J){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[J.id]===void 0){const qe=Pe.has("EXT_color_buffer_half_float")||Pe.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[J.id]=new xn(1,1,{generateMipmaps:!0,type:qe?En:Ln,minFilter:bs,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:mt.workingColorSpace})}const Ie=b.state.transmissionRenderTarget[J.id],Ve=J.viewport||Me;Ie.setSize(Ve.z*F.transmissionResolutionScale,Ve.w*F.transmissionResolutionScale);const Le=F.getRenderTarget(),We=F.getActiveCubeFace(),$e=F.getActiveMipmapLevel();F.setRenderTarget(Ie),F.getClearColor(ge),re=F.getClearAlpha(),re<1&&F.setClearColor(16777215,.5),F.clear(),le&&at.render(ee);const ot=F.toneMapping;F.toneMapping=mi;const ut=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),b.setupLightsView(J),oe===!0&&Ke.setGlobalState(F.clippingPlanes,J),ya(E,ee,J),te.updateMultisampleRenderTarget(Ie),te.updateRenderTargetMipmap(Ie),Pe.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let St=0,Ht=$.length;St<Ht;St++){const Ot=$[St],{object:wt,geometry:nn,material:ze,group:Tn}=Ot;if(ze.side===ci&&wt.layers.test(J.layers)){const _t=ze.side;ze.side=bn,ze.needsUpdate=!0,bh(wt,ee,J,nn,ze,Tn),ze.side=_t,ze.needsUpdate=!0,qe=!0}}qe===!0&&(te.updateMultisampleRenderTarget(Ie),te.updateRenderTargetMipmap(Ie))}F.setRenderTarget(Le,We,$e),F.setClearColor(ge,re),ut!==void 0&&(J.viewport=ut),F.toneMapping=ot}function ya(E,$,ee){const J=$.isScene===!0?$.overrideMaterial:null;for(let j=0,Ie=E.length;j<Ie;j++){const Ve=E[j],{object:Le,geometry:We,group:$e}=Ve;let ot=Ve.material;ot.allowOverride===!0&&J!==null&&(ot=J),Le.layers.test(ee.layers)&&bh(Le,$,ee,We,ot,$e)}}function bh(E,$,ee,J,j,Ie){E.onBeforeRender(F,$,ee,J,j,Ie),E.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),j.onBeforeRender(F,$,ee,J,E,Ie),j.transparent===!0&&j.side===ci&&j.forceSinglePass===!1?(j.side=bn,j.needsUpdate=!0,F.renderBufferDirect(ee,$,J,j,E,Ie),j.side=rs,j.needsUpdate=!0,F.renderBufferDirect(ee,$,J,j,E,Ie),j.side=ci):F.renderBufferDirect(ee,$,J,j,E,Ie),E.onAfterRender(F,$,ee,J,j,Ie)}function Ma(E,$,ee){$.isScene!==!0&&($=me);const J=Y.get(E),j=b.state.lights,Ie=b.state.shadowsArray,Ve=j.state.version,Le=be.getParameters(E,j.state,Ie,$,ee,b.state.lightProbeGridArray),We=be.getProgramCacheKey(Le);let $e=J.programs;J.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?$.environment:null,J.fog=$.fog;const ot=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;J.envMap=xe.get(E.envMap||J.environment,ot),J.envMapRotation=J.environment!==null&&E.envMap===null?$.environmentRotation:E.envMapRotation,$e===void 0&&(E.addEventListener("dispose",Qn),$e=new Map,J.programs=$e);let ut=$e.get(We);if(ut!==void 0){if(J.currentProgram===ut&&J.lightsStateVersion===Ve)return Th(E,Le),ut}else Le.uniforms=be.getUniforms(E),L!==null&&E.isNodeMaterial&&L.build(E,ee,Le),E.onBeforeCompile(Le,F),ut=be.acquireProgram(Le,We),$e.set(We,ut),J.uniforms=Le.uniforms;const qe=J.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(qe.clippingPlanes=Ke.uniform),Th(E,Le),J.needsLights=Um(E),J.lightsStateVersion=Ve,J.needsLights&&(qe.ambientLightColor.value=j.state.ambient,qe.lightProbe.value=j.state.probe,qe.directionalLights.value=j.state.directional,qe.directionalLightShadows.value=j.state.directionalShadow,qe.spotLights.value=j.state.spot,qe.spotLightShadows.value=j.state.spotShadow,qe.rectAreaLights.value=j.state.rectArea,qe.ltc_1.value=j.state.rectAreaLTC1,qe.ltc_2.value=j.state.rectAreaLTC2,qe.pointLights.value=j.state.point,qe.pointLightShadows.value=j.state.pointShadow,qe.hemisphereLights.value=j.state.hemi,qe.directionalShadowMatrix.value=j.state.directionalShadowMatrix,qe.spotLightMatrix.value=j.state.spotLightMatrix,qe.spotLightMap.value=j.state.spotLightMap,qe.pointShadowMatrix.value=j.state.pointShadowMatrix),J.lightProbeGrid=b.state.lightProbeGridArray.length>0,J.currentProgram=ut,J.uniformsList=null,ut}function Eh(E){if(E.uniformsList===null){const $=E.currentProgram.getUniforms();E.uniformsList=Ao.seqWithValue($.seq,E.uniforms)}return E.uniformsList}function Th(E,$){const ee=Y.get(E);ee.outputColorSpace=$.outputColorSpace,ee.batching=$.batching,ee.batchingColor=$.batchingColor,ee.instancing=$.instancing,ee.instancingColor=$.instancingColor,ee.instancingMorph=$.instancingMorph,ee.skinning=$.skinning,ee.morphTargets=$.morphTargets,ee.morphNormals=$.morphNormals,ee.morphColors=$.morphColors,ee.morphTargetsCount=$.morphTargetsCount,ee.numClippingPlanes=$.numClippingPlanes,ee.numIntersection=$.numClipIntersection,ee.vertexAlphas=$.vertexAlphas,ee.vertexTangents=$.vertexTangents,ee.toneMapping=$.toneMapping}function Dm(E,$){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;M.setFromMatrixPosition($.matrixWorld);for(let ee=0,J=E.length;ee<J;ee++){const j=E[ee];if(j.texture!==null&&j.boundingBox.containsPoint(M))return j}return null}function Lm(E,$,ee,J,j){$.isScene!==!0&&($=me),te.resetTextureUnits();const Ie=$.fog,Ve=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?$.environment:null,Le=Z===null?F.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:mt.workingColorSpace,We=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,$e=xe.get(J.envMap||Ve,We),ot=J.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,ut=!!ee.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),qe=!!ee.morphAttributes.position,St=!!ee.morphAttributes.normal,Ht=!!ee.morphAttributes.color;let Ot=mi;J.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Ot=F.toneMapping);const wt=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,nn=wt!==void 0?wt.length:0,ze=Y.get(J),Tn=b.state.lights;if(oe===!0&&(ie===!0||E!==pe)){const Pt=E===pe&&J.id===ne;Ke.setState(J,E,Pt)}let _t=!1;J.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==Tn.state.version||ze.outputColorSpace!==Le||j.isBatchedMesh&&ze.batching===!1||!j.isBatchedMesh&&ze.batching===!0||j.isBatchedMesh&&ze.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&ze.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&ze.instancing===!1||!j.isInstancedMesh&&ze.instancing===!0||j.isSkinnedMesh&&ze.skinning===!1||!j.isSkinnedMesh&&ze.skinning===!0||j.isInstancedMesh&&ze.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&ze.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&ze.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&ze.instancingMorph===!1&&j.morphTexture!==null||ze.envMap!==$e||J.fog===!0&&ze.fog!==Ie||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==Ke.numPlanes||ze.numIntersection!==Ke.numIntersection)||ze.vertexAlphas!==ot||ze.vertexTangents!==ut||ze.morphTargets!==qe||ze.morphNormals!==St||ze.morphColors!==Ht||ze.toneMapping!==Ot||ze.morphTargetsCount!==nn||!!ze.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(_t=!0):(_t=!0,ze.__version=J.version);let Nn=ze.currentProgram;_t===!0&&(Nn=Ma(J,$,j),L&&J.isNodeMaterial&&L.onUpdateProgram(J,Nn,ze));let ei=!1,Fi=!1,Us=!1;const At=Nn.getUniforms(),Gt=ze.uniforms;if(x.useProgram(Nn.program)&&(ei=!0,Fi=!0,Us=!0),J.id!==ne&&(ne=J.id,Fi=!0),ze.needsLights){const Pt=Dm(b.state.lightProbeGridArray,j);ze.lightProbeGrid!==Pt&&(ze.lightProbeGrid=Pt,Fi=!0)}if(ei||pe!==E){x.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),At.setValue(I,"projectionMatrix",E.projectionMatrix),At.setValue(I,"viewMatrix",E.matrixWorldInverse);const ki=At.map.cameraPosition;ki!==void 0&&ki.setValue(I,Se.setFromMatrixPosition(E.matrixWorld)),A.logarithmicDepthBuffer&&At.setValue(I,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&At.setValue(I,"isOrthographic",E.isOrthographicCamera===!0),pe!==E&&(pe=E,Fi=!0,Us=!0)}if(ze.needsLights&&(Tn.state.directionalShadowMap.length>0&&At.setValue(I,"directionalShadowMap",Tn.state.directionalShadowMap,te),Tn.state.spotShadowMap.length>0&&At.setValue(I,"spotShadowMap",Tn.state.spotShadowMap,te),Tn.state.pointShadowMap.length>0&&At.setValue(I,"pointShadowMap",Tn.state.pointShadowMap,te)),j.isSkinnedMesh){At.setOptional(I,j,"bindMatrix"),At.setOptional(I,j,"bindMatrixInverse");const Pt=j.skeleton;Pt&&(Pt.boneTexture===null&&Pt.computeBoneTexture(),At.setValue(I,"boneTexture",Pt.boneTexture,te))}j.isBatchedMesh&&(At.setOptional(I,j,"batchingTexture"),At.setValue(I,"batchingTexture",j._matricesTexture,te),At.setOptional(I,j,"batchingIdTexture"),At.setValue(I,"batchingIdTexture",j._indirectTexture,te),At.setOptional(I,j,"batchingColorTexture"),j._colorsTexture!==null&&At.setValue(I,"batchingColorTexture",j._colorsTexture,te));const Oi=ee.morphAttributes;if((Oi.position!==void 0||Oi.normal!==void 0||Oi.color!==void 0)&&W.update(j,ee,Nn),(Fi||ze.receiveShadow!==j.receiveShadow)&&(ze.receiveShadow=j.receiveShadow,At.setValue(I,"receiveShadow",j.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&$.environment!==null&&(Gt.envMapIntensity.value=$.environmentIntensity),Gt.dfgLUT!==void 0&&(Gt.dfgLUT.value=Vw()),Fi){if(At.setValue(I,"toneMappingExposure",F.toneMappingExposure),ze.needsLights&&Im(Gt,Us),Ie&&J.fog===!0&&ke.refreshFogUniforms(Gt,Ie),ke.refreshMaterialUniforms(Gt,J,ye,ve,b.state.transmissionRenderTarget[E.id]),ze.needsLights&&ze.lightProbeGrid){const Pt=ze.lightProbeGrid;Gt.probesSH.value=Pt.texture,Gt.probesMin.value.copy(Pt.boundingBox.min),Gt.probesMax.value.copy(Pt.boundingBox.max),Gt.probesResolution.value.copy(Pt.resolution)}Ao.upload(I,Eh(ze),Gt,te)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Ao.upload(I,Eh(ze),Gt,te),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&At.setValue(I,"center",j.center),At.setValue(I,"modelViewMatrix",j.modelViewMatrix),At.setValue(I,"normalMatrix",j.normalMatrix),At.setValue(I,"modelMatrix",j.matrixWorld),J.uniformsGroups!==void 0){const Pt=J.uniformsGroups;for(let ki=0,Ns=Pt.length;ki<Ns;ki++){const wh=Pt[ki];fe.update(wh,Nn),fe.bind(wh,Nn)}}return Nn}function Im(E,$){E.ambientLightColor.needsUpdate=$,E.lightProbe.needsUpdate=$,E.directionalLights.needsUpdate=$,E.directionalLightShadows.needsUpdate=$,E.pointLights.needsUpdate=$,E.pointLightShadows.needsUpdate=$,E.spotLights.needsUpdate=$,E.spotLightShadows.needsUpdate=$,E.rectAreaLights.needsUpdate=$,E.hemisphereLights.needsUpdate=$}function Um(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return Z},this.setRenderTargetTextures=function(E,$,ee){const J=Y.get(E);J.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),Y.get(E.texture).__webglTexture=$,Y.get(E.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:ee,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,$){const ee=Y.get(E);ee.__webglFramebuffer=$,ee.__useDefaultFramebuffer=$===void 0},this.setRenderTarget=function(E,$=0,ee=0){Z=E,K=$,V=ee;let J=null,j=!1,Ie=!1;if(E){const Le=Y.get(E);if(Le.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(I.FRAMEBUFFER,Le.__webglFramebuffer),Me.copy(E.viewport),Ee.copy(E.scissor),it=E.scissorTest,x.viewport(Me),x.scissor(Ee),x.setScissorTest(it),ne=-1;return}else if(Le.__webglFramebuffer===void 0)te.setupRenderTarget(E);else if(Le.__hasExternalTextures)te.rebindTextures(E,Y.get(E.texture).__webglTexture,Y.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const ot=E.depthTexture;if(Le.__boundDepthTexture!==ot){if(ot!==null&&Y.has(ot)&&(E.width!==ot.image.width||E.height!==ot.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");te.setupDepthRenderbuffer(E)}}const We=E.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Ie=!0);const $e=Y.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray($e[$])?J=$e[$][ee]:J=$e[$],j=!0):E.samples>0&&te.useMultisampledRTT(E)===!1?J=Y.get(E).__webglMultisampledFramebuffer:Array.isArray($e)?J=$e[ee]:J=$e,Me.copy(E.viewport),Ee.copy(E.scissor),it=E.scissorTest}else Me.copy(Je).multiplyScalar(ye).floor(),Ee.copy(U).multiplyScalar(ye).floor(),it=k;if(ee!==0&&(J=X),x.bindFramebuffer(I.FRAMEBUFFER,J)&&x.drawBuffers(E,J),x.viewport(Me),x.scissor(Ee),x.setScissorTest(it),j){const Le=Y.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+$,Le.__webglTexture,ee)}else if(Ie){const Le=$;for(let We=0;We<E.textures.length;We++){const $e=Y.get(E.textures[We]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+We,$e.__webglTexture,ee,Le)}}else if(E!==null&&ee!==0){const Le=Y.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Le.__webglTexture,ee)}ne=-1},this.readRenderTargetPixels=function(E,$,ee,J,j,Ie,Ve,Le=0){if(!(E&&E.isWebGLRenderTarget)){gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let We=Y.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ve!==void 0&&(We=We[Ve]),We){x.bindFramebuffer(I.FRAMEBUFFER,We);try{const $e=E.textures[Le],ot=$e.format,ut=$e.type;if(E.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Le),!A.textureFormatReadable(ot)){gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(ut)){gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=E.width-J&&ee>=0&&ee<=E.height-j&&I.readPixels($,ee,J,j,Re.convert(ot),Re.convert(ut),Ie)}finally{const $e=Z!==null?Y.get(Z).__webglFramebuffer:null;x.bindFramebuffer(I.FRAMEBUFFER,$e)}}},this.readRenderTargetPixelsAsync=async function(E,$,ee,J,j,Ie,Ve,Le=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let We=Y.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ve!==void 0&&(We=We[Ve]),We)if($>=0&&$<=E.width-J&&ee>=0&&ee<=E.height-j){x.bindFramebuffer(I.FRAMEBUFFER,We);const $e=E.textures[Le],ot=$e.format,ut=$e.type;if(E.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Le),!A.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qe=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,qe),I.bufferData(I.PIXEL_PACK_BUFFER,Ie.byteLength,I.STREAM_READ),I.readPixels($,ee,J,j,Re.convert(ot),Re.convert(ut),0);const St=Z!==null?Y.get(Z).__webglFramebuffer:null;x.bindFramebuffer(I.FRAMEBUFFER,St);const Ht=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await iS(I,Ht,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,qe),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,Ie),I.deleteBuffer(qe),I.deleteSync(Ht),Ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,$=null,ee=0){const J=Math.pow(2,-ee),j=Math.floor(E.image.width*J),Ie=Math.floor(E.image.height*J),Ve=$!==null?$.x:0,Le=$!==null?$.y:0;te.setTexture2D(E,0),I.copyTexSubImage2D(I.TEXTURE_2D,ee,0,0,Ve,Le,j,Ie),x.unbindTexture()},this.copyTextureToTexture=function(E,$,ee=null,J=null,j=0,Ie=0){let Ve,Le,We,$e,ot,ut,qe,St,Ht;const Ot=E.isCompressedTexture?E.mipmaps[Ie]:E.image;if(ee!==null)Ve=ee.max.x-ee.min.x,Le=ee.max.y-ee.min.y,We=ee.isBox3?ee.max.z-ee.min.z:1,$e=ee.min.x,ot=ee.min.y,ut=ee.isBox3?ee.min.z:0;else{const Gt=Math.pow(2,-j);Ve=Math.floor(Ot.width*Gt),Le=Math.floor(Ot.height*Gt),E.isDataArrayTexture?We=Ot.depth:E.isData3DTexture?We=Math.floor(Ot.depth*Gt):We=1,$e=0,ot=0,ut=0}J!==null?(qe=J.x,St=J.y,Ht=J.z):(qe=0,St=0,Ht=0);const wt=Re.convert($.format),nn=Re.convert($.type);let ze;$.isData3DTexture?(te.setTexture3D($,0),ze=I.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(te.setTexture2DArray($,0),ze=I.TEXTURE_2D_ARRAY):(te.setTexture2D($,0),ze=I.TEXTURE_2D),x.activeTexture(I.TEXTURE0),x.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,$.flipY),x.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),x.pixelStorei(I.UNPACK_ALIGNMENT,$.unpackAlignment);const Tn=x.getParameter(I.UNPACK_ROW_LENGTH),_t=x.getParameter(I.UNPACK_IMAGE_HEIGHT),Nn=x.getParameter(I.UNPACK_SKIP_PIXELS),ei=x.getParameter(I.UNPACK_SKIP_ROWS),Fi=x.getParameter(I.UNPACK_SKIP_IMAGES);x.pixelStorei(I.UNPACK_ROW_LENGTH,Ot.width),x.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ot.height),x.pixelStorei(I.UNPACK_SKIP_PIXELS,$e),x.pixelStorei(I.UNPACK_SKIP_ROWS,ot),x.pixelStorei(I.UNPACK_SKIP_IMAGES,ut);const Us=E.isDataArrayTexture||E.isData3DTexture,At=$.isDataArrayTexture||$.isData3DTexture;if(E.isDepthTexture){const Gt=Y.get(E),Oi=Y.get($),Pt=Y.get(Gt.__renderTarget),ki=Y.get(Oi.__renderTarget);x.bindFramebuffer(I.READ_FRAMEBUFFER,Pt.__webglFramebuffer),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,ki.__webglFramebuffer);for(let Ns=0;Ns<We;Ns++)Us&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Y.get(E).__webglTexture,j,ut+Ns),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Y.get($).__webglTexture,Ie,Ht+Ns)),I.blitFramebuffer($e,ot,Ve,Le,qe,St,Ve,Le,I.DEPTH_BUFFER_BIT,I.NEAREST);x.bindFramebuffer(I.READ_FRAMEBUFFER,null),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(j!==0||E.isRenderTargetTexture||Y.has(E)){const Gt=Y.get(E),Oi=Y.get($);x.bindFramebuffer(I.READ_FRAMEBUFFER,q),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,H);for(let Pt=0;Pt<We;Pt++)Us?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Gt.__webglTexture,j,ut+Pt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Gt.__webglTexture,j),At?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Oi.__webglTexture,Ie,Ht+Pt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Oi.__webglTexture,Ie),j!==0?I.blitFramebuffer($e,ot,Ve,Le,qe,St,Ve,Le,I.COLOR_BUFFER_BIT,I.NEAREST):At?I.copyTexSubImage3D(ze,Ie,qe,St,Ht+Pt,$e,ot,Ve,Le):I.copyTexSubImage2D(ze,Ie,qe,St,$e,ot,Ve,Le);x.bindFramebuffer(I.READ_FRAMEBUFFER,null),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else At?E.isDataTexture||E.isData3DTexture?I.texSubImage3D(ze,Ie,qe,St,Ht,Ve,Le,We,wt,nn,Ot.data):$.isCompressedArrayTexture?I.compressedTexSubImage3D(ze,Ie,qe,St,Ht,Ve,Le,We,wt,Ot.data):I.texSubImage3D(ze,Ie,qe,St,Ht,Ve,Le,We,wt,nn,Ot):E.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,Ie,qe,St,Ve,Le,wt,nn,Ot.data):E.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,Ie,qe,St,Ot.width,Ot.height,wt,Ot.data):I.texSubImage2D(I.TEXTURE_2D,Ie,qe,St,Ve,Le,wt,nn,Ot);x.pixelStorei(I.UNPACK_ROW_LENGTH,Tn),x.pixelStorei(I.UNPACK_IMAGE_HEIGHT,_t),x.pixelStorei(I.UNPACK_SKIP_PIXELS,Nn),x.pixelStorei(I.UNPACK_SKIP_ROWS,ei),x.pixelStorei(I.UNPACK_SKIP_IMAGES,Fi),Ie===0&&$.generateMipmaps&&I.generateMipmap(ze),x.unbindTexture()},this.initRenderTarget=function(E){Y.get(E).__webglFramebuffer===void 0&&te.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?te.setTextureCube(E,0):E.isData3DTexture?te.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?te.setTexture2DArray(E,0):te.setTexture2D(E,0),x.unbindTexture()},this.resetState=function(){K=0,V=0,Z=null,x.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=mt._getUnpackColorSpace()}}const Ef={type:"change"},hh={type:"start"},wm={type:"end"},so=new va,Tf=new Zi,Gw=Math.cos(70*aS.DEG2RAD),$t=new B,yn=2*Math.PI,Et={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},uc=1e-6;class Ww extends $S{constructor(e,t=null){super(e,t),this.state=Et.NONE,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:hr.ROTATE,MIDDLE:hr.DOLLY,RIGHT:hr.PAN},this.touches={ONE:sr.ROTATE,TWO:sr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new as,this._lastTargetPosition=new B,this._quat=new as().setFromUnitVectors(e.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new jd,this._sphericalDelta=new jd,this._scale=1,this._panOffset=new B,this._rotateStart=new Oe,this._rotateEnd=new Oe,this._rotateDelta=new Oe,this._panStart=new Oe,this._panEnd=new Oe,this._panDelta=new Oe,this._dollyStart=new Oe,this._dollyEnd=new Oe,this._dollyDelta=new Oe,this._dollyDirection=new B,this._mouse=new Oe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=$w.bind(this),this._onPointerDown=Xw.bind(this),this._onPointerUp=qw.bind(this),this._onContextMenu=eA.bind(this),this._onMouseWheel=Zw.bind(this),this._onKeyDown=Jw.bind(this),this._onTouchStart=jw.bind(this),this._onTouchMove=Qw.bind(this),this._onMouseDown=Yw.bind(this),this._onMouseMove=Kw.bind(this),this._interceptControlDown=tA.bind(this),this._interceptControlUp=nA.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ef),this.update(),this.state=Et.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;$t.copy(t).sub(this.target),$t.applyQuaternion(this._quat),this._spherical.setFromVector3($t),this.autoRotate&&this.state===Et.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=yn:i>Math.PI&&(i-=yn),s<-Math.PI?s+=yn:s>Math.PI&&(s-=yn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if($t.setFromSpherical(this._spherical),$t.applyQuaternion(this._quatInverse),t.copy(this.target).add($t),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=$t.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new B(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new B(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=$t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(so.origin.copy(this.object.position),so.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(so.direction))<Gw?this.object.lookAt(this.target):(Tf.setFromNormalAndCoplanarPoint(this.object.up,this.target),so.intersectPlane(Tf,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>uc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>uc||this._lastTargetPosition.distanceToSquared(this.target)>uc?(this.dispatchEvent(Ef),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?yn/60*this.autoRotateSpeed*e:yn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){$t.setFromMatrixColumn(t,0),$t.multiplyScalar(-e),this._panOffset.add($t)}_panUp(e,t){this.screenSpacePanning===!0?$t.setFromMatrixColumn(t,1):($t.setFromMatrixColumn(t,0),$t.crossVectors(this.object.up,$t)),$t.multiplyScalar(e),this._panOffset.add($t)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;$t.copy(s).sub(this.target);let r=$t.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(yn*this._rotateDelta.x/t.clientHeight),this._rotateUp(yn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(yn*this._rotateDelta.x/t.clientHeight),this._rotateUp(yn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Oe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Xw(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function $w(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function qw(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(wm),this.state=Et.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Yw(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case hr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Et.DOLLY;break;case hr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Et.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Et.ROTATE}break;case hr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Et.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Et.PAN}break;default:this.state=Et.NONE}this.state!==Et.NONE&&this.dispatchEvent(hh)}function Kw(n){switch(this.state){case Et.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Et.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Et.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Zw(n){this.enabled===!1||this.enableZoom===!1||this.state!==Et.NONE||(n.preventDefault(),this.dispatchEvent(hh),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(wm))}function Jw(n){this.enabled!==!1&&this._handleKeyDown(n)}function jw(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case sr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Et.TOUCH_ROTATE;break;case sr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Et.TOUCH_PAN;break;default:this.state=Et.NONE}break;case 2:switch(this.touches.TWO){case sr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Et.TOUCH_DOLLY_PAN;break;case sr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Et.TOUCH_DOLLY_ROTATE;break;default:this.state=Et.NONE}break;default:this.state=Et.NONE}this.state!==Et.NONE&&this.dispatchEvent(hh)}function Qw(n){switch(this._trackPointer(n),this.state){case Et.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Et.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Et.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Et.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Et.NONE}}function eA(n){this.enabled!==!1&&n.preventDefault()}function tA(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function nA(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Co={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Tr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const iA=new uh(-1,1,1,-1,0,1);class sA extends Ut{constructor(){super(),this.setAttribute("position",new Wt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Wt([0,2,0,0,2,0],2))}}const rA=new sA;class dh{constructor(e){this._mesh=new Mt(rA,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,iA)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Am extends Tr{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof zt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ua.clone(e.uniforms),this.material=new zt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new dh(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class wf extends Tr{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class aA extends Tr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class oA{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Oe);this._width=i.width,this._height=i.height,t=new xn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:En}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Am(Co),this.copyPass.material.blending=pi,this.timer=new HS}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}wf!==void 0&&(a instanceof wf?i=!0:a instanceof aA&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Oe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class lA extends Tr{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ye}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const cA={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ye(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Sr extends Tr{constructor(e,t=1,i,s){super(),this.strength=t,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new Oe(e.x,e.y):new Oe(256,256),this.clearColor=new Ye(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new xn(r,a,{type:En}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new xn(r,a,{type:En});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const h=new xn(r,a,{type:En});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),a=Math.round(a/2)}const o=cA;this.highPassUniforms=ua.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new zt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Oe(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new B(1,1,1),new B(1,1,1),new B(1,1,1),new B(1,1,1),new B(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ua.clone(Co.uniforms),this.blendMaterial=new zt({uniforms:this.copyUniforms,vertexShader:Co.vertexShader,fragmentShader:Co.fragmentShader,premultipliedAlpha:!0,blending:jt,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ye,this._oldClearAlpha=1,this._basic=new Ts,this._fsQuad=new dh(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Oe(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Sr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Sr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],i=e/3;for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(i*i))/i);return new zt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Oe(.5,.5)},direction:{value:new Oe(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new zt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}Sr.BlurDirectionX=new Oe(1,0);Sr.BlurDirectionY=new Oe(0,1);const ro={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class uA extends Tr{constructor(){super(),this.isOutputPass=!0,this.uniforms=ua.clone(ro.uniforms),this.material=new mm({name:ro.name,uniforms:this.uniforms,vertexShader:ro.vertexShader,fragmentShader:ro.fragmentShader}),this._fsQuad=new dh(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},mt.getTransfer(this._outputColorSpace)===xt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Xu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===$u?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===qu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ul?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ku?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Zu?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Yu&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const ai=Math.PI*2,ao=Math.PI*(1+Math.sqrt(5)),hc=60,hA=185,dA=640,fA=`
varying vec3 vP; varying vec3 vN; varying vec3 vV;
void main() {
  vP = position; vN = normalMatrix * normal;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vV = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}`,pA=`
uniform float uT;
varying vec3 vP; varying vec3 vN; varying vec3 vV;
float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
float noise(vec3 p) {
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                 mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                 mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm(vec3 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.1; a *= 0.5; }
  return v;
}
void main() {
  vec3 sp = normalize(vP);
  float n = fbm(sp * 3.2 + vec3(uT * 0.045, uT * 0.03, 0.0));
  float n2 = fbm(sp * 8.0 - vec3(0.0, uT * 0.06, uT * 0.04));
  vec3 deep = vec3(0.62, 0.14, 0.02);
  vec3 mid  = vec3(1.0, 0.45, 0.08);
  vec3 hot  = vec3(1.0, 0.93, 0.62);
  vec3 col = mix(deep, mid, smoothstep(0.25, 0.62, n));
  col = mix(col, hot, smoothstep(0.55, 0.85, n * 0.65 + n2 * 0.45));
  col = mix(col, deep * 0.5, smoothstep(0.32, 0.12, n2));
  float limb = pow(max(dot(normalize(vN), normalize(vV)), 0.0), 0.55);
  col *= 0.35 + 1.15 * limb;
  gl_FragColor = vec4(col * 1.35, 1.0);
}`,oo=`
varying vec3 vWN; varying vec3 vWP; varying vec3 vV;
void main() {
  vWN = normalize(mat3(modelMatrix) * normal);
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWP = wp.xyz;
  vV = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,lo=`
uniform vec3 uC; uniform float uA; uniform vec3 uSun;
varying vec3 vWN; varying vec3 vWP; varying vec3 vV;
void main() {
  vec3 N = normalize(vWN), V = normalize(vV), L = normalize(uSun - vWP);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.4);      // 边缘厚度（大气在切线方向路径最长）
  float lit  = max(dot(N, L), 0.0);                      // 昼夜
  float term = pow(1.0 - abs(dot(N, L)), 6.0);           // 晨昏线
  float fwd  = pow(max(dot(V, -L), 0.0), 3.0);           // 逆光前向散射（背光时一圈亮环）
  vec3 day   = uC * (0.55 + 0.85 * lit) + vec3(0.32) * fwd;
  vec3 dusk  = mix(day, vec3(1.0, 0.46, 0.24), term * 0.55);   // 晨昏线偏暖红
  vec3 night = uC * 0.25;
  vec3 col   = mix(night, dusk, smoothstep(-0.25, 0.35, dot(N, L)));
  float a    = fres * (0.35 + 0.9 * lit + 0.7 * fwd) * uA;
  gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
}`,mA={uniforms:{tDiffuse:{value:null},uT:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
uniform sampler2D tDiffuse; uniform float uT;
varying vec2 vUv;
void main() {
  vec2 d = vUv - 0.5;
  float r2 = dot(d, d);
  vec3 c;
  c.r = texture2D(tDiffuse, vUv + d * r2 * 0.007).r;
  c.g = texture2D(tDiffuse, vUv).g;
  c.b = texture2D(tDiffuse, vUv - d * r2 * 0.007).b;
  float vig = smoothstep(0.78, 0.28, length(d));
  c *= 0.55 + 0.45 * vig;
  float g = fract(sin(dot(vUv + fract(uT * 0.37), vec2(12.9898, 78.233))) * 43758.5453);
  c += (g - 0.5) * 0.013;
  gl_FragColor = vec4(c, 1.0);
}`},gA=`
attribute float aPhase; attribute float aSize;
uniform float uT;
varying float vA;
void main() {
  vA = 0.45 + 0.55 * (0.5 + 0.5 * sin(uT * 1.7 + aPhase));
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (900.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`,_A=`
varying float vA;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = smoothstep(1.0, 0.15, d) * vA;
  gl_FragColor = vec4(0.85, 0.9, 1.0, a);
}`;function dc(n){const t=document.createElement("canvas");t.width=t.height=256;const i=t.getContext("2d"),s=i.createRadialGradient(256/2,256/2,4,256/2,256/2,256/2);return s.addColorStop(0,n),s.addColorStop(.4,n.replace(/[\d.]+\)$/,"0.28)")),s.addColorStop(1,n.replace(/[\d.]+\)$/,"0)")),i.fillStyle=s,i.fillRect(0,0,256,256),new Rs(t)}function vA(n){const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d");{const s=t.createRadialGradient(64,64,0,64,64,64);s.addColorStop(0,"rgba(255,240,210,1)"),s.addColorStop(.18,"rgba(255,190,110,0.5)"),s.addColorStop(.5,"rgba(255,150,70,0.12)"),s.addColorStop(1,"rgba(255,150,70,0)"),t.fillStyle=s,t.fillRect(0,0,128,128)}const i=new Rs(e);return i.colorSpace=on,i}let Wr=null;function Ro(){if(Wr)return Wr;const n=1024,e=512;let t=1337;const i=()=>(t=t*1103515245+12345&2147483647)/2147483647,s=new Uint8Array(512);for(let C=0;C<256;C++)s[C]=C;for(let C=255;C>0;C--){const L=i()*(C+1)|0,X=s[C];s[C]=s[L],s[L]=X}for(let C=0;C<256;C++)s[256+C]=s[C];const r=C=>C*C*C*(C*(C*6-15)+10),a=(C,L,X)=>{const q=C&1?L:X,H=C&2?L:X;return(C&4?-q:q)+(C&8?-H:H)},o=(C,L)=>{const X=Math.floor(C)&255,q=Math.floor(L)&255;C-=Math.floor(C),L-=Math.floor(L);const H=r(C),K=r(L),V=s[X]+q,Z=s[X+1]+q,ne=(pe,Me,Ee)=>pe+Ee*(Me-pe);return ne(ne(a(s[V],C,L),a(s[Z],C-1,L),H),ne(a(s[V+1],C,L-1),a(s[Z+1],C-1,L-1),H),K)},l=(C,L,X)=>{let q=0,H=.5,K=1;for(let V=0;V<X;V++)q+=H*o(C*K,L*K),K*=2.07,H*=.5;return q},c=new Float32Array(n*e);for(let C=0;C<e;C++){const L=C/e*Math.PI,X=Math.sin(L);for(let q=0;q<n;q++){const H=q/n*ai,K=3.2+Math.cos(H)*2.6*X,V=3.2+Math.sin(H)*2.6*X,Z=Math.cos(L)*2.6;let ne=l(K+Z*.31,V-Z*.27,6);ne+=.35*l(K*3.1+11,V*3.1-7,4),ne+=.12*Math.sin(L*9+l(K,V,3)*2.2),c[C*n+q]=ne}}let u=1/0,f=-1/0;for(const C of c)C<u&&(u=C),C>f&&(f=C);const h=C=>(C-u)/(f-u||1),p=document.createElement("canvas");p.width=n,p.height=e;const g=document.createElement("canvas");g.width=n,g.height=e;const _=document.createElement("canvas");_.width=n,_.height=e;const d=p.getContext("2d"),m=g.getContext("2d"),T=_.getContext("2d"),R=d.createImageData(n,e),M=m.createImageData(n,e),S=T.createImageData(n,e),b=(C,L)=>h(c[(L+e)%e*n+(C+n)%n]);for(let C=0;C<e;C++){const L=Math.abs(C/e-.5)*2;for(let X=0;X<n;X++){const q=(C*n+X)*4,H=b(X,C),K=Math.max(0,(L-.74)/.26),V=H<.46?1:0;let Z=V?.16+H*.2:.3+(H-.46)*.72;Z=Z*(1-K)+(.8+H*.16)*K;const ne=V?.94:1.03;R.data[q]=Math.min(255,Z*255*ne),R.data[q+1]=Math.min(255,Z*255),R.data[q+2]=Math.min(255,Z*255*(V?1.12:.95)),R.data[q+3]=255;const pe=V?.9:3.4,Me=(b(X+1,C)-b(X-1,C))*pe,Ee=(b(X,C+1)-b(X,C-1))*pe,it=1/Math.sqrt(Me*Me+Ee*Ee+1);M.data[q]=(-Me*it*.5+.5)*255,M.data[q+1]=(-Ee*it*.5+.5)*255,M.data[q+2]=(it*.5+.5)*255,M.data[q+3]=255;const ge=V?.22:(.62+(H-.46)*.5)*(1-K)+.3*K,re=Math.min(255,ge*255);S.data[q]=S.data[q+1]=S.data[q+2]=re,S.data[q+3]=255}}d.putImageData(R,0,0),m.putImageData(M,0,0),T.putImageData(S,0,0);const D=(C,L)=>{const X=new Rs(C);return L&&(X.colorSpace=on),X.wrapS=zo,X},y=document.createElement("canvas");y.width=n,y.height=e;const w=y.getContext("2d"),F=w.createImageData(n,e);for(let C=0;C<e;C++){const L=C/e*Math.PI,X=Math.sin(L);for(let q=0;q<n;q++){const H=q/n*ai,K=9.5+Math.cos(H)*4.4*X,V=9.5+Math.sin(H)*4.4*X,Z=Math.cos(L)*4.4;let ne=l(K*.55+Z*.4,V*1.7,5);ne=(ne+.55)*.9;const pe=.5+.5*Math.sin(L*7);let Me=Math.max(0,ne*(.45+.75*pe)-.34)*2.1;Me=Math.min(1,Me)*(1-Math.pow(Math.abs(C/e-.5)*2,5));const Ee=(C*n+q)*4;F.data[Ee]=F.data[Ee+1]=F.data[Ee+2]=255,F.data[Ee+3]=Me*255}}return w.putImageData(F,0,0),Wr={map:D(p,!0),normalMap:D(g,!1),roughnessMap:D(_,!1),cloudMap:D(y,!0)},Wr}function Af(){return Ro().map}function zr(n,e,t,i,s){const a=e?190:130,o=document.createElement("canvas");o.width=760,o.height=a;const l=o.getContext("2d"),c=s?.45:1,u=_=>t.replace("rgb","rgba").replace(")",`,${_*c})`),f=40,h=l.createLinearGradient(0,0,760,0);h.addColorStop(0,`rgba(6,10,20,${.5*c})`),h.addColorStop(.72,`rgba(6,10,20,${.26*c})`),h.addColorStop(1,"rgba(6,10,20,0)"),l.fillStyle=h,l.fillRect(f-14,0,760-f+14,a),l.fillStyle=u(.95),l.fillRect(f-14,12,4,a-24),l.strokeStyle=u(.4),l.lineWidth=1.6,l.beginPath(),l.moveTo(f-10,13),l.lineTo(720,13),l.stroke(),l.beginPath(),l.moveTo(f-10,a-13),l.lineTo(760*.55,a-13),l.stroke(),l.textAlign="left",l.fillStyle=`rgba(255,255,255,${.97*c})`,l.font='600 62px "PingFang SC", "Hiragino Sans GB", system-ui, sans-serif',l.fillText(n,f,e?84:88),e&&(l.fillStyle=u(.92),l.font="400 34px ui-monospace, SFMono-Regular, Menlo, monospace",l.fillText(e,f,142));const p=new Rs(o);p.colorSpace=on,p.anisotropy=8;const g=new nr(new Ms({map:p,transparent:!0,depthTest:!1,depthWrite:!1}));return g.scale.set(i,i*a/760,1),g.center.set(.5,.5),g.renderOrder=55,g}function co(n){const e=n.isColor?n:new Ye(n);return`rgb(${Math.round(e.r*255)},${Math.round(e.g*255)},${Math.round(e.b*255)})`}const ar=72,xA=ai*.62;function Cf(n,e,t){const i=new Ut;i.setAttribute("position",new kt(new Float32Array((ar+1)*3),3));const s=new Float32Array((ar+1)*3);for(let a=0;a<=ar;a++){const o=Math.pow(1-a/ar,1.7)*t;s[a*3]=e.r*o,s[a*3+1]=e.g*o,s[a*3+2]=e.b*o}i.setAttribute("color",new kt(s,3));const r=new wo(i,new Qr({vertexColors:!0,blending:jt,transparent:!0,depthWrite:!1,opacity:.55}));return n.add(r),r}function yA(n,e,t,i,s){const r=n.geometry.attributes.position.array,a=Math.sign(i)||1,o=s||0;for(let l=0;l<=ar;l++){const c=e-a*(l/ar)*xA;r[l*3]=Math.cos(c)*t*(1+o)-t*o,r[l*3+1]=0,r[l*3+2]=Math.sin(c)*t*(1-o*.6)}n.geometry.attributes.position.needsUpdate=!0}function uo(n){const e=(n*137.508%360+216)%360/360;return new Ye().setHSL(e,.58,.62)}const MA={components:{CharCard:Gu},props:{focusName:{type:String,default:""}},emits:["pick","info"],data:()=>({drift:!0,hover:null,hoverInfo:"",full:!1,dive:null,roundCard:null,sel:null}),computed:{cast(){const n=ae.D||{},e=[],t=new Set,i=s=>{const r=typeof s=="string"?s:s&&s.name;!r||t.has(r)||(t.add(r),e.push(typeof s=="string"?{name:r}:s))};for(const s of n.cast||[])i(s);for(const s of n.graph&&n.graph.nodes||[])(s.group==="cast"||String(s.file||"").startsWith("角色/"))&&i({name:s.id,role:s.role||""});return e},relEdges(){return(ae.D&&ae.D.graph&&ae.D.graph.edges||[]).filter(n=>n.kind==="关系")},unitEdges(){return(ae.D&&ae.D.graph&&ae.D.graph.edges||[]).filter(n=>n.kind==="出场")},meta(){return ae.D&&ae.D.meta||{}},feed(){return ae.D&&ae.D.feed||[]},lastFeed(){return this.feed.slice(-1)[0]||{}},prog(){const[n,e]=String(this.meta.unitRound||"0/1").split("/").map(t=>parseInt(t)||0);return e?Math.min(1,n/e):0},roleOf(){return Object.fromEntries(this.cast.map(n=>[n.name,n.role||""]))},allUnitList(){const n=(ae.D&&ae.D.units||[]).map((e,t)=>({name:e.name,idx:e.colorIndex!=null?e.colorIndex:t,current:e.name===this.meta.unitName,used:Number(e.used)||0,status:e.status||""}));return n.length||n.push({name:this.meta.unitName||"单元",idx:0,current:!0}),!n.some(e=>e.current)&&this.meta.unitName&&n.push({name:this.meta.unitName,idx:n.length,current:!0}),n},unitList(){const n=new Set(this.feed.map(t=>t.unit||this.meta.unitName).filter(Boolean)),e=this.allUnitList.filter(t=>t.current||t.used>0||n.has(t.name)||/已收束/.test(t.status));return e.length?e:this.allUnitList.slice(0,1)},activeUnitLabel(){return this.systems&&this.systems[this._activeSystemIndex||0]?`${(this._activeSystemIndex||0)+1}/${this.systems.length}`:"—"},unitStats(){const n={};for(const i of this.unitList)n[i.name]={chars:{},minR:1/0,maxR:1};const e=this.meta.unitName;for(const i of this.feed){const s=i.unit||e,r=n[s];if(!r)continue;r.minR=Math.min(r.minR,i.round||1),r.maxR=Math.max(r.maxR,i.round||1);const a=o=>r.chars[o]||(r.chars[o]={present:0,drives:0,targeted:0,last:0});for(const o of new Set(i.present||[])){const l=a(o);l.present++,l.last=Math.max(l.last,i.round||0)}i.driver&&a(i.driver).drives++,i.target&&a(i.target).targeted++}for(const i of this.unitEdges){const s=i.source&&i.source.id||i.source,r=i.target&&i.target.id||i.target;n[r]&&this.roleOf[s]!=null&&!n[r].chars[s]&&(n[r].chars[s]={present:0,drives:0,targeted:0,last:0})}for(const i of this.cast){if(!i||!i.name||Object.values(n).some(l=>l.chars[i.name]))continue;const r=this.unitEdges.find(l=>(l.source&&l.source.id||l.source)===i.name),a=r&&(r.target&&r.target.id||r.target),o=n[a]||n[e]||Object.values(n)[0];o&&(o.chars[i.name]={present:0,drives:0,targeted:0,last:0})}const t=n[e]||Object.values(n)[0];if(t)for(const i of this.cast)i&&i.name&&!t.chars[i.name]&&(t.chars[i.name]={present:0,drives:0,targeted:0,last:0});for(const i of Object.values(n)){isFinite(i.minR)||(i.minR=1);const s=Math.max(1,...Object.values(i.chars).map(a=>a.present)),r=Math.max(1,i.maxR-i.minR);for(const a of Object.values(i.chars))a.share=a.present/s,a.recency=a.last?Math.max(0,(a.last-i.minR)/r):0,a.heat=.65*a.recency+.35*a.share}return n},homeUnit(){const n={};for(const[e,t]of Object.entries(this.unitStats))for(const[i,s]of Object.entries(t.chars))(!n[i]||s.last>n[i].last)&&(n[i]={unit:e,last:s.last});return Object.fromEntries(Object.entries(n).map(([e,t])=>[e,t.unit]))},diveStats(){if(!this.dive)return null;const n=this.dive.name;let e=0,t=0,i=0,s=0,r=1/0,a=0;for(const o of Object.values(this.unitStats)){const l=o.chars[n];!l||!l.present||(s++,e+=l.present,t+=l.drives,i+=l.targeted,a=Math.max(a,l.last))}for(const o of this.feed)(o.present||[]).includes(n)&&(r=Math.min(r,o.round||1));return{present:e,drives:t,targeted:i,units:Math.max(1,s),first:isFinite(r)?r:"—",last:a||"—"}},selInfo(){if(!this.sel)return null;const{id:n,unit:e,ghost:t,c:i}=this.sel,s=this.cast.find(a=>a.name===n)||{},r=new Set;for(const a of this.relEdges){const o=a.source&&a.source.id||a.source,l=a.target&&a.target.id||a.target;o===n?r.add(l):l===n&&r.add(o)}return r.delete(n),{name:n,unit:e,ghost:t,home:this.homeUnit[n],role:s.role||"",brief:String(s.brief||"").replace(/^身份：/,""),baton:n===this.meta.baton,present:i.present,drives:i.drives,targeted:i.targeted,last:i.last,relations:[...r]}},sig(){return[this.cast.map(n=>n.name).join("|"),this.relEdges.length,this.unitEdges.length,this.meta.baton,this.lastFeed.driver,this.lastFeed.target,this.prog,this.feed.length,this.unitList.map(n=>n.name).join("|")].join("#")}},watch:{selInfo:{handler(n){n&&!this.dive?this.$emit("info",{kind:"char",data:n}):!n&&!this.dive&&this.$emit("info",null)},deep:!0},roundCard(n){n&&this.$emit("info",{kind:"round",data:n,owner:this.dive?this.dive.name:null})},dive(n){n||this.$emit("info",null)},sig(){this.buildSystem()},focusName(){this.applyDim(),this.wallLock()},drift(n){this.controls&&(this.controls.autoRotate=n)}},mounted(){this.initScene(),this.buildSystem(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(this.$refs.holder),this.resize(),this.clock=new XS,this._esc=n=>{n.key==="Escape"&&(this.roundCard?this.closeRoundCard():this.sel?this.deselect():this.dive?this.exitDive():this.full&&this.toggleFull())},this.camera.position.set(0,340,1250),this.flyTo(new B(0,95,345),new B(0,0,0)),window.addEventListener("keydown",this._esc),this.animate()},beforeUnmount(){cancelAnimationFrame(this.raf),window.removeEventListener("keydown",this._esc),this.full&&(document.body.style.overflow=""),this.ro&&this.ro.disconnect(),this.controls&&this.controls.dispose(),this.composer&&this.composer.dispose(),this.scene&&this.scene.environment&&this.scene.environment.dispose(),this.renderer&&(this.renderer.dispose(),this.renderer.domElement.remove())},methods:{initScene(){const n=this.$refs.holder;this.scene=new yS,this.scene.background=new Ye("#05060e"),this.scene.fog=new oh("#05060e",42e-5),this.camera=new Pn(48,1,1,12e3),this.camera.position.set(0,95,345),this.renderer=new Hw({antialias:!0,powerPreference:"high-performance"}),this.baseDpr=Math.min(2.5,Math.max(1.25,(window.devicePixelRatio||1)*1.25)),this.qualityScale=1,this.renderDpr=this.baseDpr,this.renderer.setPixelRatio(this.renderDpr),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Zp,this.renderer.toneMapping=ul,this.renderer.toneMappingExposure=1.06,n.appendChild(this.renderer.domElement),Af().anisotropy=this.renderer.capabilities.getMaxAnisotropy(),this.scene.environment=this.buildEnv(),this.scene.environmentIntensity=.28,this.scene.add(new BS("#6f80a6",.16)),this.controls=new Ww(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.07,this.controls.autoRotate=!0,this.controls.autoRotateSpeed=.32,this.controls.minDistance=70,this.controls.maxDistance=4e3,n.addEventListener("pointerdown",()=>{this.controls.autoRotate=!1,this.camGoal=null}),n.addEventListener("pointerup",()=>{this.controls.autoRotate=this.drift});const e=new xn(1,1,{samples:4,type:En});this.composer=new oA(this.renderer,e),this.composer.setPixelRatio(this.renderDpr),this.composer.addPass(new lA(this.scene,this.camera)),this.composer.addPass(new Sr(new Oe(512,512),.24,.36,1)),this.composer.addPass(new uA),this.filmPass=new Am(mA),this.composer.addPass(this.filmPass),this.sunMat=new zt({uniforms:{uT:{value:0}},vertexShader:fA,fragmentShader:pA}),this.buildStars(),this.sysGroup=new kn,this.scene.add(this.sysGroup),this.raycaster=new WS,this.pointer=new Oe,this._frameVecs={a:new B,b:new B,mid:new B,point:new B,select:new B},this._perf={last:performance.now(),sum:0,frames:0};const t=this.renderer.domElement;t.addEventListener("pointermove",i=>this.onMove(i)),t.addEventListener("pointerdown",i=>{this._downXY=[i.clientX,i.clientY]}),t.addEventListener("pointerup",i=>{if(i.button!==0)return;const[s,r]=this._downXY||[0,0];if(Math.abs(i.clientX-s)+Math.abs(i.clientY-r)>=5)return;const a=this._hoverInst;if(!a){this.dive||this.deselect();return}a.kind==="round"?this.roundCard=a.f:this.select(a)}),t.addEventListener("dblclick",()=>{const i=this._hoverInst;i&&i.kind!=="round"&&!this.dive&&this.enterDive(i.id)})},buildEnv(){const n=document.createElement("canvas");n.width=512,n.height=256;const e=n.getContext("2d"),t=e.createLinearGradient(0,0,0,256);t.addColorStop(0,"#0d1424"),t.addColorStop(.55,"#080b14"),t.addColorStop(1,"#140f0c"),e.fillStyle=t,e.fillRect(0,0,512,256);const i=e.createRadialGradient(150,120,4,150,120,110);i.addColorStop(0,"rgba(255,226,180,0.95)"),i.addColorStop(.35,"rgba(255,170,90,0.22)"),i.addColorStop(1,"rgba(255,170,90,0)"),e.fillStyle=i,e.fillRect(0,0,512,256);const s=e.createRadialGradient(400,180,4,400,180,150);s.addColorStop(0,"rgba(140,180,255,0.3)"),s.addColorStop(1,"rgba(140,180,255,0)"),e.fillStyle=s,e.fillRect(0,0,512,256);const r=new Rs(n);r.mapping=yo,r.colorSpace=on;const a=new yu(this.renderer),o=a.fromEquirectangular(r).texture;return a.dispose(),r.dispose(),o},buildStars(){let n=20260828;const e=()=>(n=n*1103515245+12345&2147483647)/2147483647,t=(d,m)=>{const T=new Float32Array(d*3);for(let R=0;R<d;R++){const M=m+e()*2400,S=e()*ai,b=Math.acos(2*e()-1);T[R*3]=M*Math.sin(b)*Math.cos(S),T[R*3+1]=M*Math.cos(b),T[R*3+2]=M*Math.sin(b)*Math.sin(S)}return T},i=[[.62,.72,1],[.78,.85,1],[1,1,.98],[1,.93,.78],[1,.82,.62],[1,.68,.52]];for(const[d,m,T,R]of[[2400,1.15,.55,1800],[900,2,.7,1400]]){const M=new Ut;M.setAttribute("position",new kt(t(d,R),3));const S=new Float32Array(d*3);for(let b=0;b<d;b++){const D=i[Math.min(i.length-1,Math.pow(e(),1.7)*i.length|0)],y=.7+e()*.5;S[b*3]=D[0]*y,S[b*3+1]=D[1]*y,S[b*3+2]=D[2]*y}M.setAttribute("color",new kt(S,3)),this.scene.add(new nc(M,new _u({size:m,vertexColors:!0,transparent:!0,opacity:T,sizeAttenuation:!0,depthWrite:!1,blending:jt})))}const s=5200,r=new Float32Array(s*3),a=new Float32Array(s*3),o=[[.72,.8,1],[1,.98,.92],[1,.88,.7],[1,.74,.56]],l=.55,c=Math.cos(l),u=Math.sin(l);for(let d=0;d<s;d++){const m=2200+e()*900,T=e()*ai,M=(e()+e()+e()-1.5)*.26;let S=m*Math.cos(M)*Math.cos(T),b=m*Math.sin(M),D=m*Math.cos(M)*Math.sin(T);const y=b*c-D*u,w=b*u+D*c;r[d*3]=S,r[d*3+1]=y,r[d*3+2]=w;const F=o[Math.pow(e(),1.6)*o.length|0],C=.35+e()*.5;a[d*3]=F[0]*C,a[d*3+1]=F[1]*C,a[d*3+2]=F[2]*C}const f=new Ut;f.setAttribute("position",new kt(r,3)),f.setAttribute("color",new kt(a,3)),this.scene.add(new nc(f,new _u({size:1.5,vertexColors:!0,transparent:!0,opacity:.5,sizeAttenuation:!0,depthWrite:!1,blending:jt})));for(const[d,m,T]of[[.7,2600,.05],[2.9,2100,.035],[4.8,2400,.03]]){const R=document.createElement("canvas");R.width=R.height=256;const M=R.getContext("2d"),S=M.createRadialGradient(128,128,10,128,128,128);S.addColorStop(0,`rgba(150,165,215,${T*3})`),S.addColorStop(.5,`rgba(120,135,190,${T})`),S.addColorStop(1,"rgba(120,135,190,0)"),M.fillStyle=S,M.fillRect(0,0,256,256);const b=new nr(new Ms({map:new Rs(R),blending:jt,depthWrite:!1,transparent:!0})),D=2500,y=0,w=D*Math.sin(d);b.position.set(D*Math.cos(d),y*c-w*u,y*u+w*c),b.scale.set(m,m*.55,1),this.scene.add(b)}const h=180,p=new Ut;p.setAttribute("position",new kt(t(h,1100),3));const g=new Float32Array(h),_=new Float32Array(h);for(let d=0;d<h;d++)g[d]=e()*ai,_[d]=2.2+e()*2.6;p.setAttribute("aPhase",new kt(g,1)),p.setAttribute("aSize",new kt(_,1)),this.twinkleMat=new zt({uniforms:{uT:{value:0}},vertexShader:gA,fragmentShader:_A,transparent:!0,depthWrite:!1,blending:jt}),this.scene.add(new nc(p,this.twinkleMat))},buildSunAt(n,e){const t=new kn;t.position.copy(e.center);const i=e.current?15:10.5,s=new Mt(new an(i,48,48),this.sunMat);t.add(s),e.sunMesh=s;const r=new Kd("#ffdfae",e.current?4200:2400,0,1.72);if(e.current&&(r.castShadow=!0,r.shadow.mapSize.set(2048,2048),r.shadow.camera.near=4,r.shadow.camera.far=620,r.shadow.bias=-.0035,r.shadow.radius=2.5),t.add(r),e.current){const u=new nr(new Ms({map:vA(),blending:jt,depthWrite:!1,depthTest:!1,transparent:!0,opacity:.85}));u.material.opacity=.55,u.scale.set(92,92,1),u.renderOrder=5,t.add(u)}const a=zr(e.name,e.current?"推演中 · "+(this.meta.unitRound||""):"已收束","rgb(255,190,110)",58,!e.current);if(a.position.y=-(i+18),t.add(a),!this._hazeTex){const u=document.createElement("canvas");u.width=u.height=256;const f=u.getContext("2d"),h=f.createRadialGradient(128,128,8,128,128,128);h.addColorStop(0,"rgba(100,130,220,0.06)"),h.addColorStop(.5,"rgba(90,115,200,0.025)"),h.addColorStop(1,"rgba(90,115,200,0)"),f.fillStyle=h,f.fillRect(0,0,256,256),this._hazeTex=new Rs(u)}const o=new nr(new Ms({map:this._hazeTex,blending:jt,depthWrite:!1,transparent:!0}));o.scale.set(430,430,1),t.add(o);const l=new kn,c=(u,f,h,p)=>new Mt(new rr(i+12,p,6,72,u),new Ts({color:f,transparent:!0,opacity:h,depthWrite:!1}));if(l.add(c(ai,"#ffffff",.14,.35)),e.current&&this.prog>0){const u=c(ai*this.prog,"#ff9a5c",.9,.7);u.rotation.z=Math.PI/2,l.add(u)}t.add(l),e.ring=l,n.add(t)},clearWorld(){const n=this.sysGroup,e=new Set(Object.values(Wr||{}));this._hazeTex&&e.add(this._hazeTex);const t=new Set,i=new Set;n.traverse(s=>{s.geometry&&s.geometry.dispose();const r=Array.isArray(s.material)?s.material:[s.material];for(const a of r)if(!(!a||a===this.sunMat||!a.dispose)){i.add(a);for(const o of["map","alphaMap","normalMap","roughnessMap","metalnessMap","emissiveMap"]){const l=a[o];l&&l.isTexture&&!e.has(l)&&t.add(l)}}});for(const s of i)s.dispose();for(const s of t)s.dispose();for(;n.children.length;)n.remove(n.children[0]);for(const s of this.waves||[])this.scene.remove(s.m),s.m.geometry.dispose(),s.m.material.dispose();this.waves=[],this.planets=[],this.links=[],this.migrations=[],this.systems=[],this.diveCenter=null,this.backdrop=null,this._hoverKey=null,this._hoverInst=null,this.hover=null,this.hoverInfo="",this.selHolo=null,this.sel=null},buildSystem(){const n=this.sysGroup;if(!n)return;if(this.dive&&!this.cast.some(d=>d.name===this.dive.name)&&(this.dive=null),this.dive)return this.buildDive();this.clearWorld();const e=this.unitList,t=e.length;this.systems=e.map((d,m)=>({...d,center:new B((m-(t-1)/2)*dA,0,0)})),this._activeSystemIndex=Math.max(0,this.systems.findIndex(d=>d.current));for(const d of this.systems)this.buildSunAt(n,d);const i=this.unitStats,s=this.homeUnit,r=Af(),a=Ro();this.planets=[],this.instByKey={};for(const d of this.systems){const m=i[d.name];if(!m)continue;const T=Object.keys(m.chars),R=Math.max(1,T.length),M=uo(d.idx);T.forEach((S,b)=>{const D=m.chars[S],y=M.clone().lerp(new Ye("#ffcf9a"),Math.max(0,D.heat-.35)*.34).lerp(new Ye("#6f7f9c"),Math.max(0,.35-D.heat)*.5),w=s[S]!==d.name,F=hc+(1-D.heat)*(hA-hc)+b%5*3,C=4.6+D.share*4.6,L=b+.5,X=new B().setFromSphericalCoords(1,Math.acos(1-2*L/R),ao*L),q=new kn;q.position.copy(d.center),q.quaternion.setFromUnitVectors(new B(0,1,0),X.normalize()),n.add(q);const H=Cf(q,y,w?.28:.8),K=b*.3819%1,V=b*.2361%.22-.11,Z=re=>{const G=re.clone();return G.needsUpdate=!0,G.offset.set(K,V),G},ne=new Mt(new an(C,64,64),new Qa({map:Z(r),color:y.clone().offsetHSL(0,.2,.04),normalMap:Z(a.normalMap),normalScale:new Oe(.95,.95),roughnessMap:Z(a.roughnessMap),roughness:1,metalness:.08,clearcoat:.2,clearcoatRoughness:.72,envMapIntensity:.55,emissive:y,emissiveIntensity:w?.06:.05,transparent:!0,opacity:w?.3:.82}));ne.userData.id=S,ne.castShadow=!w,ne.receiveShadow=!w,ne.rotation.order="ZXY",ne.rotation.z=(b*37%23-11)*.028,ne.rotation.x=(b*53%17-8)*.022,q.add(ne);let pe=null;if(!w){const re=a.cloudMap.clone();re.needsUpdate=!0,re.offset.set(b*.617%1,0),pe=new Mt(new an(C*1.022,48,48),new ir({color:new Ye("#ffffff").lerp(y,.18),alphaMap:re,transparent:!0,opacity:.72,roughness:1,metalness:0,depthWrite:!1})),pe.castShadow=!1,ne.add(pe)}const Me=new zt({uniforms:{uC:{value:y},uA:{value:w?.5:1.25},uSun:{value:d.center.clone()}},vertexShader:oo,fragmentShader:lo,transparent:!0,depthWrite:!1,blending:jt});ne.add(new Mt(new an(C*1.12,40,40),Me));const Ee=w?"残影":`出场 ${D.present} · 驱动 ${D.drives}`,it=zr(S,Ee,co(y),w?30:40,w);it.position.y=-(C+10),ne.add(it);const ge={id:S,unit:d.name,ghost:w,mesh:ne,clouds:pe,trail:H,name:it,atmoMat:Me,r:F,c:D,flash:0,ecc:.04+b%6*.024,th:ao*L*1.7,spin:(.16*Math.pow(hc/F,1.5)+.004*(b%4))*(b%2?1:-1),selfSpin:.3+b%5*.12};this.planets.push(ge),this.instByKey[S+"@"+d.name]=ge})}this.migrations=[];for(const d of this.planets){if(!d.ghost)continue;const m=this.instByKey[d.id+"@"+s[d.id]];if(m){const T=new Ut;T.setAttribute("position",new kt(new Float32Array(6),3));const R=new wo(T,new Qr({color:"#8fa4cc",transparent:!0,opacity:.08,depthWrite:!1}));n.add(R),this.migrations.push({a:d,b:m,line:R})}}const o=dc("rgba(159,208,255,0.95)"),l=dc("rgba(255,110,80,0.95)"),c=(d,m,T)=>{const R=new Ut;R.setAttribute("position",new kt(new Float32Array(75),3));const M=new wo(R,new Qr({color:T?"#ff6e50":"#5f78ad",transparent:!0,opacity:T?.5:.15,depthWrite:!1}));n.add(M);const S=[];for(let b=0;b<(T?3:1);b++){const D=new nr(new Ms({map:T?l:o,blending:jt,depthWrite:!1,transparent:!0})),y=T?7:4.5;D.scale.set(y,y,1),D.visible=!1,n.add(D),S.push({sp:D,t:-b*.33-Math.random()*.4})}return{a:d,b:m,line:M,pulses:S,drive:T,speed:T?.55:.16}};this.links=[];const u=Object.fromEntries(this.systems.map(d=>[d.idx,d.name]));for(const d of this.relEdges){const m=u[d.unitIndex||0]||this.meta.unitName,T=this.instByKey[(d.source&&d.source.id||d.source||d.a)+"@"+m],R=this.instByKey[(d.target&&d.target.id||d.target||d.b)+"@"+m];T&&R&&T!==R&&this.links.push(c(T,R,!1))}const f=this.lastFeed,h=(this.systems.find(d=>d.current)||{}).name,p=this.instByKey[f.driver+"@"+h],g=this.instByKey[f.target+"@"+h];p&&g&&p!==g&&this.links.push(c(p,g,!0));const _=this.feed.length;if(this._lastFeedLen!=null&&_>this._lastFeedLen){const d=this.systems.find(T=>T.current);d&&this.spawnWave(d.center);const m=d&&this.instByKey[this.lastFeed.driver+"@"+d.name];m&&(m.flash=1)}this._lastFeedLen=_,this.applyDim()},spawnWave(n){const e=new Mt(new ch(.955,1,96),new Ts({color:"#ffb86e",transparent:!0,opacity:.55,side:ci,depthWrite:!1,blending:jt}));e.position.copy(n),this.scene.add(e),(this.waves=this.waves||[]).push({m:e,t0:this.clock?this.clock.elapsedTime:0})},roundsOf(n,e){return this.feed.filter(t=>((t.present||[]).includes(n)||t.driver===n||t.target===n)&&(!e||(t.unit||this.meta.unitName)===e)).slice().sort((t,i)=>(t.round||0)-(i.round||0))},roundOrbit(n,e){const t=e>1?n/(e-1):0,i=62+t*128,s=n+.5;return{t,r:i,k:s,nv:new B().setFromSphericalCoords(1,Math.acos(1-2*s/e),ao*s).normalize(),th:ao*s*1.7,spin:(.16*Math.pow(62/i,1.5)+.004*(n%4))*(n%2?1:-1)}},buildDive(){this.clearWorld();const n=this.sysGroup,e=this.dive.name,t=this.homeUnit[e],i=(this.unitList.find(_=>_.name===t)||{idx:0}).idx,s=uo(i),r=Ro(),a=Object.fromEntries(this.unitList.map(_=>[_.name,_.idx])),o=new kn,l=18,c=new B(170,100,210),u=new Mt(new an(l,72,72),new Qa({map:r.map,color:s.clone().offsetHSL(0,.2,.04),normalMap:r.normalMap,normalScale:new Oe(.95,.95),roughnessMap:r.roughnessMap,roughness:1,metalness:.08,clearcoat:.2,clearcoatRoughness:.72,envMapIntensity:.55,emissive:s,emissiveIntensity:.05}));u.rotation.order="ZXY",u.rotation.z=.22,u.rotation.x=-.1,u.castShadow=!0,u.receiveShadow=!0,o.add(u),this.diveCenter=u,u.add(new Mt(new an(l*1.022,56,56),new ir({color:new Ye("#ffffff").lerp(s,.18),alphaMap:r.cloudMap,transparent:!0,opacity:.72,roughness:1,metalness:0,depthWrite:!1})));const f=new zt({uniforms:{uC:{value:s},uA:{value:1.35},uSun:{value:c.clone()}},vertexShader:oo,fragmentShader:lo,transparent:!0,depthWrite:!1,blending:jt});o.add(new Mt(new an(l*1.06,48,48),f));const h=new Kd("#fff0dc",5200,0,1.68);h.position.copy(c),h.castShadow=!0,h.shadow.mapSize.set(1024,1024),h.shadow.camera.near=4,h.shadow.camera.far=1200,h.shadow.bias=-.0035,o.add(h),n.add(o);const p=this.roundsOf(e),g=Math.max(1,p.length);p.forEach((_,d)=>{const m=a[_.unit||this.meta.unitName]??0,T=uo(m),R=this.roundOrbit(d,g),M=R.r;R.k;const S=new kn;S.quaternion.setFromUnitVectors(new B(0,1,0),R.nv),n.add(S);const b=[];for(let ne=0;ne<=96;ne++){const pe=ne/96*ai;b.push(new B(Math.cos(pe)*M,0,Math.sin(pe)*M))}const D=new wo(new Ut().setFromPoints(b),new Qr({color:T,transparent:!0,opacity:.03,depthWrite:!1}));D.visible=!0,S.add(D);const y=Cf(S,T,.7),w=_.driver===e,F=_.target===e,C=3.6+(w?1.6:0),L=ne=>{const pe=ne.clone();return pe.needsUpdate=!0,pe.offset.set(d*.3819%1,d*.2361%.22-.11),pe},X=new Mt(new an(C,56,56),new Qa({map:L(r.map),color:T.clone().offsetHSL(0,.2,.04),normalMap:L(r.normalMap),normalScale:new Oe(.9,.9),roughnessMap:L(r.roughnessMap),roughness:1,metalness:.08,clearcoat:.2,clearcoatRoughness:.72,envMapIntensity:.55,emissive:F?new Ye("#ff6e50"):T,emissiveIntensity:F?.3:.06,transparent:!0}));X.rotation.order="ZXY",X.rotation.z=(d*37%23-11)*.03,X.rotation.x=(d*53%17-8)*.024,X.castShadow=!0,X.receiveShadow=!0,S.add(X);const q=new zt({uniforms:{uC:{value:F?new Ye("#ff6e50"):T},uA:{value:F?1.5:1.1},uSun:{value:c.clone()}},vertexShader:oo,fragmentShader:lo,transparent:!0,depthWrite:!1,blending:jt});X.add(new Mt(new an(C*1.1,40,40),q));const H=r.cloudMap.clone();H.needsUpdate=!0,H.offset.set(d*.617%1,0),X.add(new Mt(new an(C*1.024,48,48),new ir({color:new Ye("#ffffff").lerp(T,.2),alphaMap:H,transparent:!0,opacity:.68,roughness:1,metalness:0,depthWrite:!1})));let K=null;w&&(K=new Mt(new rr(C*1.9,.3,6,48),new ir({color:"#f0c060",emissive:"#8a6220",roughness:.4,transparent:!0})),K.rotation.x=Math.PI/2.6,X.add(K));const V=_.round!=null?_.round:d+1,Z=zr("第 "+V+" 轮",String(_.place||"").slice(0,8),co(T),30);Z.position.y=-(C+8),X.add(Z),this.planets.push({kind:"round",id:"第"+V+"轮",unit:_.unit||"",f:_,mesh:X,trail:y,gold:K,name:Z,atmoMat:q,r:M,ghost:!1,flash:0,th:R.th,spin:R.spin,selfSpin:.3+d%5*.12})}),this.buildDiveBackdrop(e,s),this.hoverInfo=""},flyTo(n,e){this.camGoal={pos:n.clone(),tgt:e.clone(),t0:this.clock?this.clock.elapsedTime:0}},select(n){this.deselect(),this._selInst=n,this.sel={id:n.id,unit:n.unit,ghost:n.ghost,c:{...n.c}};const e=n.mesh.geometry.parameters.radius,t=co(n.atmoMat.uniforms.uC.value),i=new kn,s=(c,u,f,h)=>new Mt(new rr(c,u,6,72),new Ts({color:f,transparent:!0,opacity:h,depthTest:!1}));i.add(s(e*2.1,.22,t,.85));const r=new Mt(new rr(e*2.6,.4,6,72,ai*.26),new Ts({color:"#ffffff",transparent:!0,opacity:.9,depthTest:!1}));i.add(r);const a=r.clone();a.rotation.z=Math.PI,i.add(a),i.renderOrder=50,n.mesh.add(i),this.selHolo=i;const o=new B;n.mesh.getWorldPosition(o);const l=new B(-e*4,e*5,e*16+60);this.flyTo(o.clone().add(l),o)},wallLock(){if(!this.focusName){this.deselect();return}this.dive&&this.exitDive();const n=(this.planets||[]).find(e=>e.id===this.focusName);n&&this.select(n);this.applyDim()},deselect(){if(this.selHolo&&(this.selHolo.parent&&this.selHolo.parent.remove(this.selHolo),this.selHolo.traverse(n=>{n.geometry&&n.geometry.dispose(),n.material&&n.material.dispose&&n.material.dispose()}),this.selHolo=null),this.sel){const n=(this.systems||[]).find(t=>t.name===this.sel.unit),e=n?n.center:new B;this.flyTo(e.clone().add(new B(0,95,345)),e)}this.sel=null,this._selInst=null},buildDiveBackdrop(n,e){const t=this.sysGroup,i=Ro(),s=this.cast.filter(h=>h.name!==n),r=420,a=new kn;a.position.set(-r*1.05,r*.8,-r*.9);const o=new Mt(new an(30,40,40),this.sunMat);a.add(o);a.add(new Kd("#ffdfae",60000,0,1.72));const l=new nr(new Ms({map:dc("rgba(255,170,90,0.22)"),blending:jt,depthWrite:!1,transparent:!0}));l.scale.set(380,380,1),a.add(l);const c=zr(this.meta.unitName||"母星系","母恒星","rgb(255,190,110)",88,!0);c.position.y=-62,a.add(c),t.add(a),this.backdrop={spin:[o],clouds:[]};const u=Object.fromEntries(this.unitList.map(h=>[h.name,h.idx])),f=Math.max(1,s.length),bp=[],BP=p=>{for(let k=0;k<99;k++){const A=p*2.39996+k*.37,w=[Math.cos(A)*(240+(p%3)*95+(p*47%50)),Math.sin(p*7.13)*90+Math.sin(p*3.71)*55,-Math.abs(Math.sin(A))*(210+(p*29%130))-(p%3)*45-(k*53%110)];if(bp.every(v=>{const x=v[0]-w[0],y=v[1]-w[1],z=v[2]-w[2];return x*x+y*y+z*z>4900}))return bp.push(w),w}return bp[0]};s.forEach((h,p)=>{const g=uo(u[this.homeUnit[h.name]]??0),w=BP(p),d=w[0],m=w[1],T=w[2],R=15+(p*13%9)+Math.min(10,(this.roundsOf(h.name).length||1)*.6),M=new Mt(new an(R,64,64),new Qa({map:i.map,color:g.clone().offsetHSL(0,.16,-.02),normalMap:i.normalMap,normalScale:new Oe(.95,.95),roughnessMap:i.roughnessMap,roughness:1,metalness:.08,clearcoat:.2,clearcoatRoughness:.72,emissive:g,emissiveIntensity:.42,envMapIntensity:.55,transparent:!0,opacity:.82}));M.position.set(d,m,T),M.rotation.order="ZXY",M.rotation.z=(p%7-3)*.05,M.castShadow=!0,M.receiveShadow=!0,t.add(M);const S=i.cloudMap.clone();S.needsUpdate=!0,S.offset.set(p*.617%1,0);const b=new Mt(new an(R*1.022,40,40),new ir({color:new Ye("#ffffff").lerp(g,.18),alphaMap:S,transparent:!0,opacity:.72,roughness:1,metalness:0,depthWrite:!1}));M.add(b),this.backdrop.clouds.push(b),M.add(new Mt(new an(R*1.1,40,40),new zt({uniforms:{uC:{value:g},uA:{value:.5},uSun:{value:new B(170,100,210)}},vertexShader:oo,fragmentShader:lo,transparent:!0,depthWrite:!1,blending:jt})));const D=zr(h.name,"",co(g),56,!0);D.position.copy(M.position),D.position.y-=R+20,t.add(D),this.backdrop.spin.push(M)})},enterDive(n){this.deselect(),this.dive={name:n},this.$emit("info",{kind:"char",data:{name:n},dive:!0}),this.roundCard=null,this.buildSystem(),this.camera.position.set(0,180,620),this.flyTo(new B(0,70,300),new B(0,0,0))},exitDive(){this.dive=null,this.roundCard=null,this.buildSystem();const n=(this.systems||[]).length||1;this.flyTo(new B(0,95+(n-1)*40,345+(n-1)*330),new B(0,0,0))},closeRoundCard(){this.roundCard=null,this.dive&&this.$emit("info",{kind:"char",data:{name:this.dive.name},dive:!0})},animate(){const n=Math.min(.05,this.clock.getDelta()),e=this.clock.elapsedTime,t=performance.now();if(this._perf){const a=Math.min(100,t-this._perf.last);if(this._perf.last=t,this._perf.sum+=a,this._perf.frames++,this._perf.frames>=45){const o=this._perf.sum/this._perf.frames;o>24&&this.qualityScale>.72?this.setRenderQuality(this.qualityScale-.1):o<14&&this.qualityScale<1&&this.setRenderQuality(this.qualityScale+.06),this._perf.sum=0,this._perf.frames=0}}if(document.hidden){this.raf=requestAnimationFrame(()=>this.animate());return}this.sunMat.uniforms.uT.value=e,this.twinkleMat.uniforms.uT.value=e,this.filmPass.uniforms.uT.value=e,this._pathClock=(this._pathClock||0)+n;const i=this._pathClock,s=i>=1/30;if(s&&(this._pathClock=0),this.drift)for(const a of this.planets||[])a.th+=a.spin*n;const r=this.camera.position.distanceTo(this.controls.target);for(const a of this.planets||[]){const o=a.ecc||0;a.mesh.position.set(Math.cos(a.th)*a.r*(1+o)-a.r*o,0,Math.sin(a.th)*a.r*(1-o*.6)),a.mesh.rotation.y+=a.selfSpin*n,a.clouds&&(a.clouds.rotation.y+=a.selfSpin*.22*n),a.trail&&s&&yA(a.trail,a.th,a.r,a.spin,a.ecc),a.gold&&(a.gold.rotation.z+=n*.6),a.name&&(a.name.material.opacity=r>1500?.25:r>900?.6:1),a.flash>.02&&(a.mesh.material.emissiveIntensity=(a.ghost?.1:.16)+a.flash*.95,a.flash*=Math.pow(.28,n))}for(let a=(this.waves||[]).length-1;a>=0;a--){const o=this.waves[a],l=e-o.t0,c=24+l*235;o.m.scale.set(c,c,c),o.m.quaternion.copy(this.camera.quaternion),o.m.material.opacity=Math.max(0,.55*(1-l/1.5)),l>1.5&&(this.scene.remove(o.m),o.m.geometry.dispose(),o.m.material.dispose(),this.waves.splice(a,1))}for(const a of this.systems||[]){if(a.sunMesh&&(a.sunMesh.rotation.y+=n*.02),a.prom){a.prom.quaternion.copy(this.camera.quaternion);const o=1+.06*Math.sin(e*.8);a.prom.scale.set(o,o,1)}a.ring&&a.ring.quaternion.copy(this.camera.quaternion)}if(this.diveCenter&&(this.diveCenter.rotation.y+=n*.1),this.backdrop){for(const a of this.backdrop.spin)a.rotation.y+=n*.02;for(const a of this.backdrop.clouds||[])a.rotation.y+=n*.004}if(this.camGoal){const a=1-Math.pow(.0015,n);this.camera.position.lerp(this.camGoal.pos,a),this.controls.target.lerp(this.camGoal.tgt,a),(this.camera.position.distanceTo(this.camGoal.pos)<2||e-this.camGoal.t0>2.4)&&(this.camGoal=null)}if(this.selHolo&&this._selInst&&(this.selHolo.quaternion.copy(this.camera.quaternion),this.selHolo.children[1].rotation.z+=n*1.6,this.selHolo.children[2].rotation.z+=n*1.6,this.selHolo.children[0].rotation.z-=n*.5,this.camGoal||(this._selInst.mesh.getWorldPosition(this._frameVecs.select),this.controls.target.lerp(this._frameVecs.select,1-Math.pow(.002,n)))),s){const{a,b:o,mid:l,point:c}=this._frameVecs;for(const u of this.migrations||[]){u.a.mesh.getWorldPosition(a),u.b.mesh.getWorldPosition(o);const f=u.line.geometry.attributes.position.array;f[0]=a.x,f[1]=a.y,f[2]=a.z,f[3]=o.x,f[4]=o.y,f[5]=o.z,u.line.geometry.attributes.position.needsUpdate=!0}for(const u of this.links||[]){u.a.mesh.getWorldPosition(a),u.b.mesh.getWorldPosition(o);const f=(this.systems.find(p=>p.name===u.a.unit)||{center:new B}).center;l.addVectors(a,o).multiplyScalar(.5).sub(f),l.length()<34?l.y+=62:l.multiplyScalar(1.18),l.add(f);const h=u.line.geometry.attributes.position.array;for(let p=0;p<=24;p++){const g=p/24,_=1-g;c.set(_*_*a.x+2*_*g*l.x+g*g*o.x,_*_*a.y+2*_*g*l.y+g*g*o.y,_*_*a.z+2*_*g*l.z+g*g*o.z),h[p*3]=c.x,h[p*3+1]=c.y,h[p*3+2]=c.z}u.line.geometry.attributes.position.needsUpdate=!0;for(const p of u.pulses){if(p.t+=u.speed*i,p.t>1&&(p.t=-.15-Math.random()*.5),p.t<0||p.t>1||!u.line.visible){p.sp.visible=!1;continue}const g=p.t,_=1-g;p.sp.visible=!0,p.sp.position.set(_*_*a.x+2*_*g*l.x+g*g*o.x,_*_*a.y+2*_*g*l.y+g*g*o.y,_*_*a.z+2*_*g*l.z+g*g*o.z),p.sp.material.opacity=Math.sin(g*Math.PI)}}}this.controls.update(),this.composer.render(),this.raf=requestAnimationFrame(()=>this.animate())},onMove(n){const e=this.renderer.domElement.getBoundingClientRect();this.pointer.set((n.clientX-e.left)/e.width*2-1,-(n.clientY-e.top)/e.height*2+1),this.raycaster.setFromCamera(this.pointer,this.camera);const t=this.raycaster.intersectObjects((this.planets||[]).map(a=>a.mesh),!1),i=t.length?t[0].object:null,s=i?(this.planets||[]).find(a=>a.mesh===i):null;this._hoverInst=s;const r=s?s.id+"@"+s.unit:null;if(r!==this._hoverKey){this._hoverKey=r,this.hover=s?s.id:null,this.renderer.domElement.style.cursor=s?"pointer":"grab";for(const a of this.planets||[])a.mesh.scale.setScalar(a===s?1.25:1);if(!s)this.hoverInfo="";else if(s.kind==="round"){const a=s.f;this.hoverInfo=`第 ${a.round} 轮 · ${a.unit||""} ｜ ${a.place||"—"} ｜ ${a.driver||"—"} → ${a.target||"—"} · 点击看全文`}else{const a=s.c;this.hoverInfo=`${s.id}${s.ghost?"（残影·本体在 "+this.homeUnit[s.id]+"）":""} ｜ ${s.unit}：出场 ${a.present} 轮 · 驱动 ${a.drives} 次 · 被指向 ${a.targeted} 次 · 最近第 ${a.last||"—"} 轮 · 点击进入角色星系`}}},applyDim(){if(!this.dive){for(const n of this.planets||[]){const e=!this.focusName||this.focusName===n.id;n.mesh.material.opacity=e?n.ghost?.3:.82:.1,n.atmoMat.uniforms.uA.value=e?n.ghost?.5:1.25:.12,n.trail&&(n.trail.material.opacity=e?1:.12),n.name.material.opacity=e?1:.2}for(const n of this.links||[]){const e=!this.focusName||n.a.id===this.focusName||n.b.id===this.focusName;n.line.visible=e}for(const n of this.migrations||[])n.line.visible=!this.focusName||n.a.id===this.focusName}},setRenderQuality(n){if(!this.renderer||!this.composer||!this.baseDpr)return;this.qualityScale=Math.max(.72,Math.min(1,n));const e=Math.max(1.25,this.baseDpr*this.qualityScale);Math.abs(e-this.renderDpr)<.04||(this.renderDpr=e,this.renderer.setPixelRatio(e),this.composer.setPixelRatio(e),this.resize())},resize(){const n=this.$refs.holder;if(!n||!this.renderer)return;const e=n.getBoundingClientRect();this.camera.aspect=e.width/e.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(e.width,e.height),this.composer.setSize(e.width,e.height)},reset(){this.deselect();const n=(this.systems||[]).length||1;this.flyTo(new B(0,95+(n-1)*40,345+(n-1)*330),new B(0,0,0))},toggleFull(){this.full=!this.full,document.body.style.overflow=this.full?"hidden":"",this.$nextTick(()=>this.resize())},switchUnit(){if(this.dive||!this.systems||this.systems.length<2)return;this._activeSystemIndex=((this._activeSystemIndex||0)+1)%this.systems.length;const n=this.systems[this._activeSystemIndex];this.deselect(),this.flyTo(n.center.clone().add(new B(0,95,345)),n.center)}}},SA={ref:"holder",class:"g3-canvas"},bA={class:"g3-unit-count"},EA={class:"g3-scene-sub"},TA={key:0},wA={class:"g3-hud"},AA={key:0,class:"hov"},CA={key:1,class:"mut"},RA={class:"sw-lab"},PA={class:"sub"},DA={class:"sub"},LA={class:"body"},IA={key:0,class:"sub"},UA={class:"sub"},NA={class:"sub"},FA={key:0,class:"tag"},OA={class:"body two"},kA={class:"stats"},BA={key:0,class:"brief"},zA={key:0,class:"sub"},VA={key:3,class:"hint"};function HA(n,e,t,i,s,r){const a=xc("CharCard");return N(),Rn(wg,{to:"body",disabled:!n.full},[v("div",{class:nt(["g3",{full:n.full}])},[v("div",SA,null,512),v("button",{class:"btn btn-ghost btn-sm g3-max",onClick:e[0]||(e[0]=(...o)=>r.toggleFull&&r.toggleFull(...o))},P(n.full?"✕ 退出全屏":"⛶ 放大"),1),!n.dive&&r.unitList.length>1?(N(),O("button",{key:0,class:"btn btn-ghost btn-sm g3-unit",onClick:e[1]||(e[1]=(...o)=>r.switchUnit&&r.switchUnit(...o))},[e[8]||(e[8]=Ne(" 切换单元 ",-1)),v("span",bA,P(r.activeUnitLabel),1)])):de("",!0),n.dive?(N(),O("button",{key:1,class:"btn btn-ghost btn-sm g3-back",onClick:e[2]||(e[2]=(...o)=>r.exitDive&&r.exitDive(...o))},"← 返回星丛")):de("",!0),v("div",{class:"g3-scene",style:Sn({top:n.dive?"46px":"10px"})},[n.dive?r.diveStats?(N(),O(He,{key:1},[v("b",null,P(n.dive.name),1),e[9]||(e[9]=v("span",{class:"g3-scene-sub"}," 角色星系",-1)),v("div",null,"角色 "+P(r.cast.length)+" 人 · 出场 "+P(r.diveStats.present)+" 轮 · 驱动 "+P(r.diveStats.drives)+" · 被指向 "+P(r.diveStats.targeted),1),v("div",null,"足迹跨 "+P(r.diveStats.units)+" 个单元 · 第 "+P(r.diveStats.first)+"–"+P(r.diveStats.last)+" 轮",1)],64)):de("",!0):(N(),O(He,{key:0},[v("b",null,P(r.meta.unitName||""),1),v("span",EA,P(r.meta.unitRound||""),1),v("div",null,"引力 "+P(r.meta.gravity||"—")+" ｜ 接棒 "+P(r.meta.baton||"—"),1),r.lastFeed.round?(N(),O("div",TA,"第 "+P(r.lastFeed.round)+" 轮 · "+P(r.lastFeed.place||"—")+" ｜ "+P(r.lastFeed.driver||"—")+" → "+P(r.lastFeed.target||"—"),1)):de("",!0)],64))],4),v("div",wA,[n.hoverInfo?(N(),O("span",AA,P(n.hoverInfo),1)):(N(),O("span",CA,P(n.dive?"角色星系 · 行星=推演轮次（内早外晚）· 点轮次看全文":"拖动旋转 · 滚轮推拉 · 悬停看数据 · 点星球进入角色星系"),1)),v("label",RA,[Qt(v("input",{type:"checkbox","onUpdate:modelValue":e[3]||(e[3]=o=>n.drift=o)},null,512),[[Yp,n.drift]]),e[10]||(e[10]=Ne(" 公转",-1))]),v("button",{class:"btn btn-ghost btn-sm",onClick:e[4]||(e[4]=(...o)=>r.reset&&r.reset(...o))},"复位")]),n.full?(N(),O("section",{key:2,class:nt(["g3-dock",{empty:!n.sel&&!n.roundCard&&!n.dive}])},[n.roundCard?(N(),O(He,{key:0},[v("header",null,[v("b",null,"第 "+P(n.roundCard.round)+" 轮",1),v("span",PA,P(n.roundCard.unit||""),1),v("span",DA,P(n.roundCard.place||"—")+" ｜ "+P(n.roundCard.driver||"—")+" → "+P(n.roundCard.target||"—"),1),v("button",{class:"x",onClick:e[5]||(e[5]=(...o)=>r.closeRoundCard&&r.closeRoundCard(...o))},"✕")]),v("div",LA,[v("p",null,P(n.roundCard.summary||"（本轮无摘要）"),1),(n.roundCard.present||[]).length?(N(),O("div",IA,"在场："+P(n.roundCard.present.join("、")),1)):de("",!0)])],64)):n.sel&&r.selInfo?(N(),O(He,{key:1},[v("header",null,[v("b",null,P(r.selInfo.name),1),v("span",UA,P(r.selInfo.role||"—"),1),v("span",NA,P(r.selInfo.unit)+P(r.selInfo.ghost?"（残影·本体在 "+r.selInfo.home+"）":""),1),r.selInfo.baton?(N(),O("span",FA,"接棒中")):de("",!0),v("button",{class:"x",onClick:e[6]||(e[6]=(...o)=>r.deselect&&r.deselect(...o))},"✕")]),v("div",OA,[v("div",null,[v("div",kA,[v("span",null,[e[11]||(e[11]=Ne("出场 ",-1)),v("b",null,P(r.selInfo.present),1)]),v("span",null,[e[12]||(e[12]=Ne("驱动 ",-1)),v("b",null,P(r.selInfo.drives),1)]),v("span",null,[e[13]||(e[13]=Ne("被指向 ",-1)),v("b",null,P(r.selInfo.targeted),1)]),v("span",null,[e[14]||(e[14]=Ne("最近 第",-1)),v("b",null,P(r.selInfo.last||"—"),1),e[15]||(e[15]=Ne("轮",-1))])]),r.selInfo.brief?(N(),O("p",BA,P(r.selInfo.brief),1)):de("",!0)]),v("div",null,[r.selInfo.relations.length?(N(),O("div",zA,"关系："+P(r.selInfo.relations.join("、")),1)):de("",!0),v("button",{class:"dive",onClick:e[7]||(e[7]=o=>r.enterDive(r.selInfo.name))},"进入角色星系 →")])])],64)):n.dive?(N(),Rn(a,{key:2,name:n.dive.name,closable:!1},null,8,["name"])):(N(),O("div",VA,"点星球看档案 · 点轮次看全文 · 拖动旋转 · 滚轮推拉"))],2)):de("",!0)],2)],8,["disabled"])}const GA=Jn(MA,[["render",HA],["__scopeId","data-v-dd02ed3b"]]),Rf=["#9b9891","#2a78d6","#4a3aa7","#1baf7a","#eb6834","#e87ba4"],Pf=88,Df=78;function WA(n){return n<=10?32:Math.max(20,Math.round(32-(n-10)*1.1))}const XA={components:{Graph3D:GA,CharCard:Gu},data:()=>({view:"star",focus:null,sel:null,starInfo:null,GL:Pf,GT:Df,zoom:0,fit:0}),computed:{g(){return ae.D&&ae.D.graph||{}},meta(){return ae.D&&ae.D.meta||{}},cast(){const n=ae.D||{},e=[],t=new Set,i=s=>{const r=typeof s=="string"?s:s&&s.name;!r||t.has(r)||(t.add(r),e.push(typeof s=="string"?{name:r}:s))};for(const s of n.cast||[])i(s);for(const s of n.graph&&n.graph.nodes||[])(s.group==="cast"||String(s.file||"").startsWith("角色/"))&&i({name:s.id,role:s.role||""});return e},pairInfo(){const n={fwd:0,bwd:0,co:0,lastAny:0,rounds:[],rel:null,isDrive:!1,isPlan:!1,verdict:""};if(!this.sel||this.sel.kind!=="pair")return n;const{a:e,b:t}=this.sel,i=this.pairStats[e+"|"+t]||{n:0,last:0},s=this.pairStats[t+"|"+e]||{n:0,last:0};let r=0;const a=[];for(const u of this.allRounds){const f=u.present||[];f.includes(e)&&f.includes(t)&&r++;const h=u.driver===e&&u.target===t,p=u.driver===t&&u.target===e;!h&&!p||a.push({r:u.round,role:h?"d":"t",roleCn:h?e+"→"+t:t+"→"+e,txt:(u.beats&&u.beats.result||u.summary||"").slice(0,40)})}a.reverse();const o=Math.max(i.last||0,s.last||0),c=i.n+s.n?i.n===s.n?`势均：各驱动 ${i.n} 轮`:i.n>s.n?`${e} 更常主导（${i.n} : ${s.n}）`:`${t} 更常主导（${s.n} : ${i.n}）`:r?`同场 ${r} 轮但未直接交手`:"尚无同场记录";return{fwd:i.n,bwd:s.n,co:r,lastAny:o,rounds:a.slice(0,6),rel:this.relAt(e,t),isDrive:this.drive.driver===e&&this.drive.target===t,isPlan:this.plan.driver===e&&this.plan.target===t,verdict:c}},baton(){return this.meta.baton||""},writing(){return ae.auto&&ae.auto.running&&ae.auto.agent||""},liveUnitRound(){const n=ae.auto||{};return n.running&&n.unit_round?n.unit_round:this.meta.unitRound||""},liveRound(){return(ae.auto||{}).round||this.meta.round||0},hubName(){const n=this.meta.unitName||this.meta.title||"";return[n.slice(0,2),n.slice(2,4)]},prog(){const[n,e]=String(this.meta.unitRound||"0/1").split("/").map(t=>parseInt(t)||0);return e?Math.min(1,n/e):0},gridNodes(){return this.cast.map(n=>({id:n.name}))},CELL(){return WA(this.gridNodes.length)},mgX(){return Pf+this.gridNodes.length*this.CELL+9},mgY(){return Df+this.gridNodes.length*this.CELL+9},gridW(){return this.mgX+58},gridH(){return this.mgY+24},zs(){return this.zoom||this.fit||1},zsPct(){return Math.round(100*this.zs)+"%"},pairStats(){const n={};for(const e of this.allRounds){if(!e.driver||!e.target||e.driver===e.target)continue;const t=e.driver+"|"+e.target;n[t]=n[t]||{n:0,last:0},n[t].n++,n[t].last=Math.max(n[t].last,e.round||0)}return n},rowStats(){const n=this.meta.round||this.allRounds.length,e=this.meta.lastLed||{},t={};for(const s of this.gridNodes)t[s.id]={driven:0,targeted:0,present:0,baton:0,idle:e[s.id]?Math.max(0,n-e[s.id]):n,presRate:0};for(const s of this.allRounds){t[s.driver]&&t[s.driver].driven++,t[s.target]&&t[s.target].targeted++,t[s.baton]&&t[s.baton].baton++;for(const r of s.present||[])t[r]&&t[r].present++}const i=this.allRounds.length||1;for(const s in t)t[s].presRate=Math.min(1,t[s].present/i);return t},plan(){return this.meta.nextPlan||{}},recentEdge(){return(this.meta.round||this.allRounds.length)-2},gravSeq(){return this.allRounds.slice(-60).map(n=>({round:n.round,g:n.gravity||"",flat:!!n.flat}))},scene(){const n=this.allRounds.slice(-1)[0]||{};return[n.time,n.place].filter(Boolean).join(" · ")},relMap(){const n={};for(const e of(this.g.edges||[]).filter(t=>t.kind==="关系")){const t=e.source||e.a,i=e.target||e.b;if(!t||!i)continue;const s={color:Rf[(e.unitIndex||0)%Rf.length],u:e.unitIndex||0};for(const r of[t+"|"+i,i+"|"+t])(!n[r]||n[r].u<=s.u)&&(n[r]=s)}return n},drive(){const n=(ae.D&&ae.D.feed||[]).slice(-1)[0]||{};return{driver:n.driver||"",target:n.target||""}},allRounds(){return ae.D&&ae.D.feed||[]}},watch:{"cast.length"(){this.validateSel()},"gridW"(){this.recalcFit()},view(){this.validateSel(),this.recalcFit()}},mounted(){this._esc=n=>{n.key==="Escape"&&this.sel&&(this.sel=null)},window.addEventListener("keydown",this._esc),this._wp=n=>{this.focus=n.detail||null},window.addEventListener("wall-pick",this._wp),this.recalcFit()},beforeUnmount(){window.removeEventListener("keydown",this._esc),window.removeEventListener("wall-pick",this._wp),this._ro&&this._ro.disconnect()},methods:{validateSel(){if(!this.sel)return;const n=t=>this.cast.some(i=>i.name===t);(this.sel.kind==="node"?n(this.sel.id):n(this.sel.a)&&n(this.sel.b))||(this.sel=null)},relAt(n,e){return this.relMap[n+"|"+e]||null},hist(n,e){return this.pairStats[n+"|"+e]||null},gravColor(n){return{警:"#c03a2b",偏:"#e0a03c",顺:"#8a9b7a"}[n]||"var(--ink-3)"},isTouched(n){return n===this.focus?!0:(this.g.edges||[]).some(e=>e.kind==="关系"&&(e.source===this.focus&&e.target===n||e.target===this.focus&&e.source===n))},pick(n){if(this.sel&&this.sel.kind==="node"&&this.sel.id===n.id){this.sel=null;return}this.sel={kind:"node",...n}},pickPair(n,e){if(n.id===e.id)return this.pick(n);if(this.sel&&this.sel.kind==="pair"&&this.sel.a===n.id&&this.sel.b===e.id){this.sel=null;return}this.sel={kind:"pair",a:n.id,b:e.id}},pickPairById(n,e){this.pickPair({id:n},{id:e})},onStarInfo(n){this.starInfo=n&&n.data?n:null},closeStarInfo(){this.starInfo&&this.starInfo.kind==="round"&&this.starInfo.owner&&this.$refs.starGraph?this.$refs.starGraph.closeRoundCard():(this.starInfo&&this.starInfo.dive&&this.$refs.starGraph?.exitDive?this.$refs.starGraph.exitDive():this.starInfo&&this.starInfo.kind==="char"&&this.$refs.starGraph?.deselect&&this.$refs.starGraph.deselect(),this.starInfo=null)},pick3d(n){const e=this.gridNodes.find(t=>t.id===n)||{id:n};this.pick(e)},recalcFit(){this.$nextTick(()=>{const e=this.$el&&this.$el.querySelector(".grid-scroll");if(!e)return;this._ro&&this._ro.disconnect();const t=()=>{this.fit=Math.max(.2,Math.min(1,(e.clientWidth-12)/this.gridW,(e.clientHeight-24)/this.gridH))};this._ro=new ResizeObserver(t),this._ro.observe(e),t()})},zoomStep(n){this.zoom=Math.min(3,Math.max(.25,Math.round(100*(this.zoom||this.fit||1)*n)/100))},zoomReset(){this.zoom=0,this.recalcFit()}}},$A={class:"card gp"},qA={class:"gp-head"},YA={class:"grow"},KA={class:"kicker"},ZA={class:"gp-title ellip"},JA={key:0,class:"mut"},jA={class:"seg"},QA={class:"gp-hub"},eC={width:"48",height:"48",viewBox:"0 0 48 48"},tC=["stroke-dasharray"],nC={x:"24",y:"21.5","text-anchor":"middle",fill:"#fcfcfb","font-weight":"800","font-size":"10"},iC={x:"24",y:"32.5","text-anchor":"middle",fill:"#fcfcfb","font-weight":"800","font-size":"10"},sC={class:"hub-info"},rC={class:"hub-chips"},aC={class:"gp-hub-meta mono"},oC={key:0,class:"chip chip-live"},lC={key:2,class:"chip",style:{color:"#c03a2b","border-color":"#c03a2b"}},cC={key:3,class:"chip"},uC={key:0,class:"grav-strip"},hC=["title"],dC={key:1,class:"hub-scene"},fC={class:"grid-scroll"},pC=["width","height","viewBox"],mC=["transform","onMouseenter","onClick"],gC=["fill"],_C=["onMouseenter","onClick"],vC=["x","y","font-size","fill"],xC=["transform"],yC=["transform"],MC=["transform"],SC=["onMouseenter","onClick"],bC=["width","height"],EC=["cx","cy","r"],TC={key:0,class:"drive-cell"},wC=["width","height"],AC=["d"],CC=["width","height","fill","opacity"],RC=["width","height","opacity"],PC=["cx","cy","opacity"],DC=["x","fill","opacity"],LC=["width","height"],IC=["width","height","onClick"],UC=["x","y"],NC=["onMouseenter","onClick"],FC=["x","y"],OC=["x","y"],kC=["x","y","fill"],BC=["x","y"],zC=["x","y"],VC=["onMouseenter","onClick"],HC=["x","y"],GC=["x","y","width"],WC=["x","y","width"],XC={key:1,class:"gp-body gp-space"},$C={key:0,class:"dock-empty"},qC={class:"dock-head"},YC={class:"mut"},KC={class:"dock-grid"},ZC={class:"dock-col"},JC={style:{margin:"0"}},jC={class:"dock-col"},QC={key:0,class:"mut"},eR={key:0,class:"dock-empty"},tR={class:"dock-head"},nR={key:1,class:"chip",style:{color:"#c03a2b","border-color":"#c03a2b"}},iR={key:2,class:"chip",style:{color:"#c03a2b","border-color":"#c03a2b"}},sR={class:"dock-grid"},rR={class:"dock-col"},aR={class:"dock-stats"},oR={key:0},lR={class:"mut",style:{"margin-top":"6px"}},cR={class:"dock-col"},uR={key:0,class:"mv"},hR={class:"mono mut"},dR={class:"ellip"},fR={key:1,class:"mut"},pR={class:"dock-rels",style:{"margin-top":"8px"}};function mR(n,e,t,i,s,r){const a=xc("Graph3D"),o=xc("CharCard");return N(),O("div",$A,[v("header",qA,[v("div",YA,[v("div",KA,P({grid:"关系矩阵",star:"星丛（3D）"}[n.view]),1),v("div",ZA,[Ne(P(r.g.title||"—"),1),r.g.unit?(N(),O("span",JA," · "+P(r.g.unit),1)):de("",!0)])]),n.view==="grid"?(N(),O("div",{key:"zg",class:"seg zseg"},[v("button",{class:"zbtn",title:"缩小",onClick:e[40]||(e[40]=l=>r.zoomStep(1/1.25))},"−"),v("span",{class:"zval mono"},P(r.zsPct),1),v("button",{class:"zbtn",title:"放大",onClick:e[41]||(e[41]=l=>r.zoomStep(1.25))},"＋"),v("button",{class:"zbtn",title:"整幅适配",onClick:e[42]||(e[42]=l=>r.zoomReset())},"适配")])):de("",!0)]),n.view==="grid"?(N(),O("div",{key:0,class:"gp-body",onClick:e[7]||(e[7]=Bn(l=>n.sel=null,["self"]))},[v("div",QA,[(N(),O("svg",eC,[e[14]||(e[14]=v("circle",{cx:"24",cy:"24",r:"21",fill:"none",stroke:"var(--line)","stroke-width":"4"},null,-1)),v("circle",{cx:"24",cy:"24",r:"21",fill:"none",stroke:"#c03a2b","stroke-width":"4","stroke-linecap":"round","stroke-dasharray":`${r.prog*2*Math.PI*21} 9999`,transform:"rotate(-90 24 24)",class:"prog"},null,8,tC),e[15]||(e[15]=v("rect",{x:"10",y:"10",width:"28",height:"28",rx:"9",fill:"#c03a2b"},null,-1)),v("text",nC,P(r.hubName[0]||"局"),1),v("text",iC,P(r.hubName[1]||""),1)])),v("div",sC,[v("div",rC,[v("span",aC,P(r.liveUnitRound),1),r.writing?(N(),O("span",oC,[e[16]||(e[16]=v("i",{class:"ldot"},null,-1)),Ne("R"+P(r.liveRound)+" · "+P(r.writing)+" 成稿中",1)])):de("",!0),r.meta.gravity?(N(),O("span",{key:1,class:"chip",style:Sn({color:r.gravColor(r.meta.gravity),borderColor:r.gravColor(r.meta.gravity)})},"引力·"+P(r.meta.gravity),5)):de("",!0),r.meta.flatDebt?(N(),O("span",lC,"平轮债 "+P(r.meta.flatDebt),1)):de("",!0),(r.meta.driverStreak||0)>1?(N(),O("span",cC,P(r.meta.lastDriver)+" 连驱×"+P(r.meta.driverStreak),1)):de("",!0)]),r.gravSeq.length?(N(),O("div",uC,[(N(!0),O(He,null,ht(r.gravSeq,l=>(N(),O("i",{key:l.round,class:nt({flat:l.flat}),style:Sn({background:r.gravColor(l.g)}),title:`R${l.round} 引力·${l.g}${l.flat?"（平轮）":""}`},null,14,hC))),128))])):de("",!0),r.scene?(N(),O("div",dC,P(r.scene),1)):de("",!0)])]),v("div",{class:"grid-scroll",onWheel:function(u){(u.ctrlKey||u.metaKey)&&(u.preventDefault(),r.zoomStep(u.deltaY<0?1.12:1/1.12))}},[(N(),O("svg",{width:Math.round(r.gridW*r.zs),height:Math.round(r.gridH*r.zs),viewBox:"0 0 "+r.gridW+" "+r.gridH,class:"grid-svg"},[(N(!0),O(He,null,ht(r.gridNodes,(l,c)=>(N(),O("g",{key:"c"+l.id,transform:`translate(${n.GL+c*r.CELL+r.CELL/2+3},${n.GT-8})`,class:nt(["glab",{dim:n.focus&&!r.isTouched(l.id)}]),onMouseenter:u=>n.focus=l.id,onMouseleave:e[2]||(e[2]=u=>n.focus=null),onClick:Bn(u=>r.pick(l),["stop"])},[v("text",{transform:"rotate(-52)","font-size":"11","font-weight":"700",fill:l.id===r.baton?"#c03a2b":"var(--ink)"},P(l.id),9,gC)],42,mC))),128)),(N(!0),O(He,null,ht(r.gridNodes,(l,c)=>(N(),O("g",{key:"r"+l.id,class:nt(["glab",{dim:n.focus&&!r.isTouched(l.id)}]),onMouseenter:u=>n.focus=l.id,onMouseleave:e[3]||(e[3]=u=>n.focus=null),onClick:Bn(u=>r.pick(l),["stop"])},[v("text",{x:n.GL-10,y:n.GT+c*r.CELL+r.CELL/2+3.5,"text-anchor":"end","font-size":Math.max(9,Math.min(11,r.CELL*.5)),"font-weight":"700",fill:l.id===r.baton?"#c03a2b":"var(--ink)"},P(l.id),9,vC),l.id===r.baton?(N(),O("g",{key:0,transform:`translate(11,${n.GT+c*r.CELL+r.CELL/2})`},[...e[17]||(e[17]=[v("circle",{r:"7",fill:"#c03a2b",stroke:"#fcfcfb","stroke-width":"1.5"},null,-1),v("text",{y:"3","text-anchor":"middle",fill:"#fff","font-size":"8","font-weight":"800"},"棒",-1)])],8,xC)):de("",!0),l.id===r.writing?(N(),O("g",{key:1,transform:`translate(${n.GL-3},${n.GT+c*r.CELL+9})`},[e[18]||(e[18]=v("circle",{r:"3",fill:"var(--seal)",class:"wdot2"},null,-1)),v("title",null,P(l.id)+" 正在成稿…",1)],8,yC)):de("",!0)],42,_C))),128)),(N(!0),O(He,null,ht(r.gridNodes,(l,c)=>(N(),O(He,{key:"row"+l.id},[(N(!0),O(He,null,ht(r.gridNodes,(u,f)=>(N(),O("g",{key:l.id+"×"+u.id,transform:`translate(${n.GL+f*r.CELL},${n.GT+c*r.CELL})`},[c===f?(N(),O("g",{key:0,class:nt(["glab",{dim:n.focus&&!r.isTouched(l.id)}]),onMouseenter:h=>n.focus=l.id,onMouseleave:e[4]||(e[4]=h=>n.focus=null),onClick:Bn(h=>r.pick(l),["stop"])},[v("rect",{x:"1.5",y:"1.5",width:r.CELL-3,height:r.CELL-3,rx:"6",fill:"var(--card-2)",stroke:"var(--line)","stroke-width":"1"},null,8,bC),v("circle",{cx:r.CELL/2,cy:r.CELL/2,r:Math.max(1.6,r.CELL*.07),fill:"var(--line-2)"},null,8,EC),v("title",null,P(l.id)+"（点开看档案）",1)],42,SC)):(N(),O(He,{key:1},[r.drive.driver===l.id&&r.drive.target===u.id?(N(),O("g",TC,[v("rect",{x:"2.5",y:"2.5",width:r.CELL-5,height:r.CELL-5,rx:"6",fill:"#c03a2b"},null,8,wC),v("path",{d:`M${r.CELL/2-4} ${r.CELL/2-6} L${r.CELL/2+7} ${r.CELL/2} L${r.CELL/2-4} ${r.CELL/2+6} Z`,fill:"#fcfcfb"},null,8,AC)])):r.relAt(l.id,u.id)?(N(),O("rect",{key:1,x:"2.5",y:"2.5",width:r.CELL-5,height:r.CELL-5,rx:"6",fill:r.relAt(l.id,u.id).color,class:"cell",opacity:n.focus?l.id===n.focus||u.id===n.focus?.85:.08:.45},null,8,CC)):r.hist(l.id,u.id)?(N(),O("rect",{key:2,x:"2.5",y:"2.5",width:r.CELL-5,height:r.CELL-5,rx:"6",fill:"none",stroke:"var(--line-2)","stroke-width":"1","stroke-dasharray":"3 2.5",class:"cell",opacity:n.focus?l.id===n.focus||u.id===n.focus?.9:.12:.7},null,8,RC)):(N(),O("circle",{key:3,cx:r.CELL/2,cy:r.CELL/2,r:"1.3",fill:"var(--line-2)",opacity:n.focus&&!(l.id===n.focus||u.id===n.focus)?.25:1},null,8,PC)),r.hist(l.id,u.id)?(N(),O("text",{key:4,x:r.CELL-4.5,y:"11.5","text-anchor":"end","font-size":"8.5","font-weight":"800",fill:r.drive.driver===l.id&&r.drive.target===u.id?"#fcfcfb":r.hist(l.id,u.id).last>=r.recentEdge?"#c03a2b":"var(--ink-3)",opacity:n.focus&&!(l.id===n.focus||u.id===n.focus)?.15:1},P(r.hist(l.id,u.id).n),9,DC)):de("",!0),r.plan.driver===l.id&&r.plan.target===u.id?(N(),O("rect",{key:5,x:"1.5",y:"1.5",width:r.CELL-3,height:r.CELL-3,rx:"6.5",fill:"none",stroke:"#c03a2b","stroke-width":"1.6","stroke-dasharray":"4 3"},null,8,LC)):de("",!0),v("rect",{x:"0",y:"0",width:r.CELL,height:r.CELL,fill:"transparent",class:"cellhit",onClick:Bn(h=>r.pickPair(l,u),["stop"])},null,8,IC),v("title",null,P(l.id)+" → "+P(u.id)+P(r.hist(l.id,u.id)?`：驱动 ${r.hist(l.id,u.id).n} 轮（最近 R${r.hist(l.id,u.id).last}）`:"")+P(r.relAt(l.id,u.id)?" · 有关系":"")+P(r.plan.driver===l.id&&r.plan.target===u.id?" · 下轮计划":""),1)],64))],8,MC))),128))],64))),128)),v("text",{x:r.mgX,y:n.GT-8,"font-size":"8.5","font-weight":"700",fill:"var(--ink-3)"},"驱·棒·闲",8,UC),(N(!0),O(He,null,ht(r.gridNodes,(l,c)=>(N(),O("g",{key:"m"+l.id,class:nt(["glab",{dim:n.focus&&!r.isTouched(l.id)}]),onMouseenter:u=>n.focus=l.id,onMouseleave:e[5]||(e[5]=u=>n.focus=null),onClick:Bn(u=>r.pick(l),["stop"])},[v("text",{x:r.mgX,y:n.GT+c*r.CELL+r.CELL/2+3.5,"font-size":"9.5","font-weight":"800",class:"mono",fill:"var(--ink-2)"},P(r.rowStats[l.id].driven),9,FC),r.rowStats[l.id].baton?(N(),O("text",{key:0,x:r.mgX+16,y:n.GT+c*r.CELL+r.CELL/2+3.5,"font-size":"9.5","font-weight":"800",class:"mono",fill:"var(--seal)"},P(r.rowStats[l.id].baton),9,OC)):de("",!0),r.rowStats[l.id].idle>=2?(N(),O("text",{key:1,x:r.mgX+32,y:n.GT+c*r.CELL+r.CELL/2+3.5,"font-size":"9","font-weight":"700",class:"mono",fill:r.rowStats[l.id].idle>=5?"#c03a2b":"var(--ink-3)"},"闲"+P(r.rowStats[l.id].idle),9,kC)):de("",!0),v("title",null,P(l.id)+"：驱动 "+P(r.rowStats[l.id].driven)+" 轮 · 持棒 "+P(r.rowStats[l.id].baton)+" 轮 · 距上次主导 "+P(r.rowStats[l.id].idle)+" 轮",1)],42,NC))),128)),v("text",{x:n.GL-10,y:r.mgY+4,"text-anchor":"end","font-size":"8.5","font-weight":"700",fill:"var(--ink-3)"},"被指",8,BC),v("text",{x:n.GL-10,y:r.mgY+17,"text-anchor":"end","font-size":"8.5","font-weight":"700",fill:"var(--ink-3)"},"出场",8,zC),(N(!0),O(He,null,ht(r.gridNodes,(l,c)=>(N(),O("g",{key:"b"+l.id,class:nt(["glab",{dim:n.focus&&!r.isTouched(l.id)}]),onMouseenter:u=>n.focus=l.id,onMouseleave:e[6]||(e[6]=u=>n.focus=null),onClick:Bn(u=>r.pick(l),["stop"])},[v("text",{x:n.GL+c*r.CELL+r.CELL/2,y:r.mgY+4,"text-anchor":"middle","font-size":"9.5","font-weight":"800",class:"mono",fill:"var(--ink-2)"},P(r.rowStats[l.id].targeted),9,HC),v("rect",{x:n.GL+c*r.CELL+5,y:r.mgY+10,width:r.CELL-10,height:"3.5",rx:"1.75",fill:"var(--line)"},null,8,GC),v("rect",{x:n.GL+c*r.CELL+5,y:r.mgY+10,width:(r.CELL-10)*r.rowStats[l.id].presRate,height:"3.5",rx:"1.75",fill:"var(--ink-2)"},null,8,WC),v("title",null,P(l.id)+"：被指向 "+P(r.rowStats[l.id].targeted)+" 轮 · 出场 "+P(r.rowStats[l.id].present)+"/"+P(r.allRounds.length)+" 轮",1)],42,VC))),128))],8,pC))]),e[19]||(e[19]=Ec('<footer class="gp-foot" data-v-8a420a9c><span class="lg" data-v-8a420a9c><i class="sw" style="background:#6f80a6;opacity:.55;border-radius:4px;" data-v-8a420a9c></i>格=有关系（色=单元）</span><span class="lg" data-v-8a420a9c>对角=角色特有性格（点选查看原始指数与设定）</span><span class="lg" data-v-8a420a9c><svg width="16" height="12" data-v-8a420a9c><rect width="16" height="12" rx="3.5" fill="#c03a2b" data-v-8a420a9c></rect><path d="M5.5 2.5 L12 6 L5.5 9.5 Z" fill="#fff" data-v-8a420a9c></path></svg>本轮驱动(行)→指向(列)</span><span class="lg" data-v-8a420a9c>角标数=历史交手轮数（<b style="color:#c03a2b;" data-v-8a420a9c>朱</b>=近3轮）</span><span class="lg" data-v-8a420a9c><svg width="16" height="12" data-v-8a420a9c><rect x="1" y="1" width="14" height="10" rx="3" fill="none" stroke="#c03a2b" stroke-width="1.5" stroke-dasharray="3 2.5" data-v-8a420a9c></rect></svg>下轮计划</span><span class="lg" data-v-8a420a9c><i class="sw seal-i" data-v-8a420a9c>棒</i>接棒者</span><span class="lg mut" data-v-8a420a9c>缘：驱动·持棒·闲置 · 被指/出场率</span><span class="lg mut" data-v-8a420a9c>心电图：<b style="color:#8a9b7a;" data-v-8a420a9c>顺</b><b style="color:#e0a03c;" data-v-8a420a9c>偏</b><b style="color:#c03a2b;" data-v-8a420a9c>警</b>，半格=平轮</span></footer>',1))])):n.view==="star"?(N(),O("div",XC,[qt(a,{ref:"starGraph","focus-name":n.focus||"",onPick:r.pick3d,onInfo:r.onStarInfo},null,8,["focus-name","onPick","onInfo"]),e[20]||(e[20]=Ec('<footer class="gp-foot" data-v-8a420a9c><span class="lg" data-v-8a420a9c>日心距=近期活跃（久未出场漂外圈）</span><span class="lg" data-v-8a420a9c>大小=戏份 · 色=所属单元</span><span class="lg" data-v-8a420a9c><i class="sw" style="background:none;border:2px solid #f0c060;" data-v-8a420a9c></i>接棒者</span><span class="lg" data-v-8a420a9c><svg width="20" height="8" data-v-8a420a9c><path d="M1 4 H18" stroke="#e0503c" stroke-width="2" stroke-dasharray="4 3" fill="none" data-v-8a420a9c></path></svg>本轮驱动→指向</span></footer>',1))])):de("",!0),n.view==="star"?(N(),O("section",{key:2,class:nt(["gp-dock",{empty:!n.starInfo}])},[n.starInfo?n.starInfo.kind==="round"?(N(),O(He,{key:1},[v("header",qC,[v("b",null,"第 "+P(n.starInfo.data.round)+" 轮",1),v("span",YC,P(n.starInfo.data.unit||"")+" ｜ "+P(n.starInfo.data.place||"—")+" ｜ "+P(n.starInfo.data.driver||"—")+" → "+P(n.starInfo.data.target||"—"),1),v("button",{class:"x2",onClick:e[8]||(e[8]=(...l)=>r.closeStarInfo&&r.closeStarInfo(...l))},"×")]),v("div",KC,[v("div",ZC,[v("p",JC,P(n.starInfo.data.summary||"（本轮无摘要）"),1)]),v("div",jC,[(n.starInfo.data.present||[]).length?(N(),O("div",QC,"在场："+P(n.starInfo.data.present.join("、")),1)):de("",!0)])])],64)):(N(),Rn(o,{key:2,name:n.starInfo.data.name,onClose:r.closeStarInfo},null,8,["name","onClose"])):(N(),O("div",$C,"点星球看角色档案 · 进角色星系后点轮次看该轮全文"))],2)):n.view==="grid"?(N(),O("section",{key:3,class:nt(["gp-dock",{empty:!n.sel}])},[n.sel?n.sel.kind==="node"?(N(),Rn(o,{key:1,name:n.sel.id,onClose:e[9]||(e[9]=l=>n.sel=null),onPickPair:r.pickPairById},null,8,["name","onPickPair"])):(N(),O(He,{key:2},[v("header",tR,[v("b",null,[Ne(P(n.sel.a)+" ",1),e[21]||(e[21]=v("span",{class:"arrow"},"→",-1)),Ne(" "+P(n.sel.b),1)]),r.pairInfo.rel?(N(),O("span",{key:0,class:"chip",style:Sn({color:r.pairInfo.rel.color,borderColor:r.pairInfo.rel.color})},"有关系",4)):de("",!0),r.pairInfo.isDrive?(N(),O("span",nR,"本轮驱动")):de("",!0),r.pairInfo.isPlan?(N(),O("span",iR,"下轮计划")):de("",!0),v("button",{class:"x2",onClick:e[10]||(e[10]=l=>n.sel=null)},"×")]),v("div",sR,[v("div",rR,[e[27]||(e[27]=v("div",{class:"kicker"},"交手计数",-1)),v("div",aR,[v("span",null,[Ne(P(n.sel.a)+"→"+P(n.sel.b)+" ",1),v("b",null,P(r.pairInfo.fwd),1),e[22]||(e[22]=Ne(" 轮",-1))]),v("span",null,[Ne(P(n.sel.b)+"→"+P(n.sel.a)+" ",1),v("b",null,P(r.pairInfo.bwd),1),e[23]||(e[23]=Ne(" 轮",-1))]),v("span",null,[e[24]||(e[24]=Ne("同场 ",-1)),v("b",null,P(r.pairInfo.co),1),e[25]||(e[25]=Ne(" 轮",-1))]),r.pairInfo.lastAny?(N(),O("span",oR,[e[26]||(e[26]=Ne("最近 ",-1)),v("b",null,"R"+P(r.pairInfo.lastAny),1)])):de("",!0)]),v("div",lR,P(r.pairInfo.verdict),1)]),v("div",cR,[e[28]||(e[28]=v("div",{class:"kicker"},"交手轮次",-1)),r.pairInfo.rounds.length?(N(),O("div",uR,[(N(!0),O(He,null,ht(r.pairInfo.rounds,l=>(N(),O("div",{key:l.r,class:"mv-row"},[v("span",hR,"R"+P(l.r),1),v("span",{class:nt("mv-"+l.role)},P(l.roleCn),3),v("span",dR,P(l.txt),1)]))),128))])):(N(),O("div",fR,"两人尚无直接驱动记录")),v("div",pR,[v("button",{class:"rel-chip",onClick:e[11]||(e[11]=l=>r.pickPair({id:n.sel.b},{id:n.sel.a}))},"看反向 "+P(n.sel.b)+"→"+P(n.sel.a),1),v("button",{class:"rel-chip",onClick:e[12]||(e[12]=l=>r.pick({id:n.sel.a}))},P(n.sel.a)+" 档案",1),v("button",{class:"rel-chip",onClick:e[13]||(e[13]=l=>r.pick({id:n.sel.b}))},P(n.sel.b)+" 档案",1)])])])],64)):(N(),O("div",eR,"点任一格看「谁对谁」交手全史 · 点姓名/对角/缘统计看角色档案 · Esc 清空"))],2)):de("",!0)])}const gR=Jn(XA,[["render",mR],["__scopeId","data-v-8a420a9c"]]),_R={class:"drawer"},vR={class:"drawer-head"},xR={class:"rno mono"},yR=["innerHTML"],MR={__name:"RoundDrawer",setup(n){const e=lt(()=>{let s=ae.roundMd||"",r="";s=s.replace(/^---[\s\S]*?---\n/,o=>(r='<div class="fm">'+o.replace(/---/g,"").trim().split(`
`).map(l=>`<span>${t(l)}</span>`).join("")+"</div>",""));const a=s.split(`
`).map(o=>/^### /.test(o)?`<h4>${t(o.slice(4))}</h4>`:/^## /.test(o)?`<h3>${t(o.slice(3))}</h3>`:/^# /.test(o)?`<h2>${t(o.slice(2))}</h2>`:/^- /.test(o)?`<li>${i(o.slice(2))}</li>`:o.trim()?`<p>${i(o)}</p>`:"").join(`
`);return r+a});function t(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function i(s){return t(s).replace(/【(目的|行为|对话|心理|反应)】/g,'<b class="tag">$1</b>').replace(/\*\*(.+?)\*\*/g,"<b>$1</b>")}return(s,r)=>(N(),O("div",null,[v("div",{class:"drawer-mask",onClick:r[0]||(r[0]=a=>dt(ae).drawer=null)}),v("aside",_R,[v("div",vR,[v("span",xR,"R"+P(dt(ae).roundN),1),r[2]||(r[2]=v("b",null,"轮记录全文",-1)),v("button",{class:"x",onClick:r[1]||(r[1]=a=>dt(ae).drawer=null)},"×")]),v("div",{class:"drawer-body md",innerHTML:e.value},null,8,yR)])]))}},SR=Jn(MR,[["__scopeId","data-v-c43ee056"]]),bR={class:"drawer"},ER={class:"drawer-head"},TR={class:"mut grow"},wR=["disabled"],AR=["disabled"],CR={class:"drawer-body"},RR={key:0,class:"cur card-2"},PR={class:"row",style:{"margin-top":"4px"}},DR={class:"grow"},LR={class:"mono mut"},IR=["onClick"],UR={class:"row"},NR={class:"grow ellip"},FR={class:"mono mut"},OR=["onClick"],kR={key:0,class:"enter mono"},BR={class:"mut mono",style:{"font-size":"10.5px"}},zR={key:0},VR={key:1,class:"gone"},HR=["title"],GR={key:1,class:"confirm"},WR={class:"sub",style:{"font-size":"12px"}},XR={class:"row",style:{"margin-top":"8px","flex-wrap":"wrap",gap:"7px"}},$R=["disabled","onClick"],qR=["disabled","onClick"],YR={key:1,class:"mut",style:{"text-align":"center",padding:"30px 0"}},KR={__name:"HistoryDrawer",setup(n){const e=lt(()=>{const p=ae.D&&ae.D.meta||{};return{title:p.title,round:p.round||0,units:(ae.D&&ae.D.units||[]).length}});function t(p){g0(p)}const i=Bt(0),s=Bt(0),r=Bt(null),a=Bt(!1),o=lt(()=>ae.archives.filter(p=>!p.exists).length);async function l(){const p=await Lt.archives().catch(()=>null);p&&(ae.archives=p.archives||[],i.value=p.total||(p.archives||[]).length,s.value=p.dismissed||0)}pa(l);function c(){ae.drawer=null,ae.openIntake=!0,ss(1)}async function u(){a.value=!0;const p=await fetch("/api/archives",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"restore"})}).then(_=>_.json()).catch(()=>null),g=p&&(p.data||p)||{};a.value=!1,pt(g.note||"恢复失败"),await l()}async function f(){a.value=!0;const p=await fetch("/api/archives",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"prune"})}).then(_=>_.json()).catch(()=>null),g=p&&(p.data||p)||{};pt(g.note||"清理失败"),await l(),a.value=!1}async function h(p,g){a.value=!0;try{const _=await fetch("/api/archives",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:p.title,ids:p.allIds||[p.id],purge:g})}).then(m=>m.json()),d=_&&_.data||_;d&&d.deleted?(pt(`已删除 ${d.deleted} 条${g?"（含磁盘归档）":""}`),await l()):pt(d&&d.error||"删除失败")}catch(_){pt("删除失败："+_)}r.value=null,a.value=!1}return(p,g)=>(N(),O("div",null,[v("div",{class:"drawer-mask",onClick:g[0]||(g[0]=_=>dt(ae).drawer=null)}),v("aside",bR,[v("div",ER,[g[3]||(g[3]=v("b",null,"历史局",-1)),v("span",TR,"一个项目一条"+P(i.value>dt(ae).archives.length?"（已折叠 "+i.value+" 次归档）":""),1),v("button",{class:"btn btn-seal btn-sm",onClick:c},"投放新世界"),o.value?(N(),O("button",{key:0,class:"btn btn-ghost btn-sm",disabled:a.value,onClick:f},"清理失效 "+P(o.value),9,wR)):de("",!0),s.value?(N(),O("button",{key:1,class:"btn btn-ghost btn-sm",disabled:a.value,onClick:u,title:"这些归档目录仍完好地在磁盘上，只是之前删掉了列表记录"}," 恢复已删记录 "+P(s.value),9,AR)):de("",!0),v("button",{class:"x",onClick:g[1]||(g[1]=_=>dt(ae).drawer=null)},"×")]),v("div",CR,[e.value.title?(N(),O("div",RR,[g[4]||(g[4]=v("div",{class:"kicker",style:{color:"var(--seal)"}},"当前局",-1)),v("div",PR,[v("b",DR,P(e.value.title),1),v("span",LR,P(e.value.round)+" 轮 · "+P(e.value.units)+" 单元",1)])])):de("",!0),(N(!0),O(He,null,ht(dt(ae).archives,_=>(N(),O("div",{key:_.id,class:nt(["arc",{arm:r.value===_.id,open:_.exists}]),onClick:d=>_.exists&&r.value!==_.id?t(_):null},[v("div",UR,[v("b",NR,P(_.title),1),v("span",FR,P(_.rounds)+" 轮 · "+P(_.units)+" 单元",1),r.value!==_.id?(N(),O("button",{key:0,class:"del",title:"删除这条历史记录",onClick:Bn(d=>r.value=_.id,["stop"])},"删除",8,OR)):de("",!0)]),_.exists&&r.value!==_.id?(N(),O("div",kR,"在新页签打开这一局的推演界面（只读）↗")):de("",!0),v("div",BR,[Ne(P(_.archivedAt),1),_.dupes?(N(),O("span",zR," · 同名归档另有 "+P(_.dupes)+" 次（一并删除）",1)):de("",!0),_.exists?de("",!0):(N(),O("span",VR," · 磁盘归档已不存在（失效记录）"))]),v("div",{class:"mut ellip",style:{"font-size":"10.5px"},title:_.path},P(_.path),9,HR),r.value===_.id?(N(),O("div",GR,[v("div",WR,"删除「"+P(_.title)+"」的历史记录？",1),v("div",XR,[v("button",{class:"btn btn-paper btn-sm",disabled:a.value,onClick:d=>h(_,!1)},[...g[5]||(g[5]=[Ne(" 只删记录",-1),v("span",{class:"mut"},"（归档仍在，可回滚）",-1)])],8,$R),_.exists?(N(),O("button",{key:0,class:"btn btn-seal btn-sm",disabled:a.value,onClick:d=>h(_,!0)}," 连归档一起删",8,qR)):de("",!0),v("button",{class:"btn btn-ghost btn-sm",onClick:g[2]||(g[2]=d=>r.value=null)},"取消")]),g[6]||(g[6]=v("div",{class:"mut",style:{"font-size":"10.5px","margin-top":"6px"}}," 「连归档一起删」会移除归档目录下的整份副本，不可恢复。 ",-1))])):de("",!0)],10,IR))),128)),dt(ae).archives.length?de("",!0):(N(),O("div",YR," 暂无归档——每次投放新世界时，旧局会完整移交到归档目录后才清库 "))])])]))}},ZR=Jn(KR,[["__scopeId","data-v-76644a30"]]),JR={class:"drawer"},jR={class:"drawer-head"},QR={class:"drawer-body"},e2={key:0,class:"mut",style:{"margin-bottom":"12px"}},t2=["onClick"],n2={class:"ellip",style:{"max-width":"120px"}},i2={class:"mut ellip grow"},s2={class:"mut mono"},r2=["onClick"],a2={key:1,class:"mut",style:{padding:"8px 0"}},o2={key:2,class:"usage card-2"},l2={class:"kicker"},c2={class:"urow"},u2={class:"mono ellip"},h2={class:"ugrid"},d2={class:"mono"},f2={class:"mono"},p2={class:"mono"},m2={class:"mono"},g2={key:0,class:"mut",style:{"font-size":"10.5px","margin-top":"6px"}},_2={class:"mut",style:{"font-size":"10.5px","margin-top":"6px"}},v2={class:"row",style:{"margin-top":"10px"}},x2=["disabled"],y2={class:"mut grow"},M2={__name:"ApiPanel",setup(n){const e=ns({base_url:"",model:"",api_key:""}),t=Bt(""),i=Bt(!1),s=Bt(null);pa(async()=>{try{s.value=await(await fetch("/api/usage")).json()}catch{}});const r=lt(()=>{const p=s.value||{},g=(p.usage||{})[p.current_model]||{};return{model:p.current_model,...g}}),a=lt(()=>r.value.secs?(((r.value.tok_out||0)+(r.value.tok_think||0))/r.value.secs).toFixed(1):"—"),o=lt(()=>r.value.secs?((r.value.tok_out||0)/r.value.secs).toFixed(1):"—");function l(p){return p=p||0,p>9999?(p/1e4).toFixed(1)+"万":String(Math.round(p))}async function c(p){await Lt.llmPost({action:"select",id:p}),vo(),pt("已切换")}async function u(p){await Lt.llmPost({action:"delete",id:p}),vo()}async function f(){if(!(e.base_url&&e.model&&e.api_key)){t.value="三项都要填";return}const p=await Lt.llmPost({action:"save",...e});p&&p.ok!==!1?(t.value="已保存 ✓",e.api_key="",vo()):t.value=p&&p.error||"保存失败"}async function h(){i.value=!0;const p=e.base_url&&e.model&&e.api_key?{...e}:{},g=await Lt.llmTest(p).catch(_=>({error:String(_)}));i.value=!1,t.value=g&&g.ok?`✓ 连接正常（${g.reply||""}）`:"✗ "+(g&&g.error||"失败").slice(0,70)}return(p,g)=>(N(),O("div",null,[v("div",{class:"drawer-mask",onClick:g[0]||(g[0]=_=>dt(ae).drawer=null)}),v("aside",JR,[v("div",jR,[g[5]||(g[5]=v("b",null,"模型接入",-1)),g[6]||(g[6]=v("span",{class:"mut"},"推演一律走独立 API",-1)),v("button",{class:"x",onClick:g[1]||(g[1]=_=>dt(ae).drawer=null)},"×")]),v("div",QR,[dt(ae).api.env?(N(),O("div",e2,"检测到环境变量配置（LLM_*），优先于档案生效。")):de("",!0),g[11]||(g[11]=v("div",{class:"kicker"},"已存接入",-1)),(N(!0),O(He,null,ht(dt(ae).api.profiles,_=>(N(),O("div",{key:_.id,class:nt(["prof",{on:_.id===dt(ae).api.current}]),onClick:d=>c(_.id)},[v("span",{class:"dot",style:Sn({background:_.id===dt(ae).api.current?"var(--st-good)":"var(--line-2)"})},null,4),v("b",n2,P(_.name||_.model),1),v("span",i2,P(_.model),1),v("span",s2,P(_.api_key_masked),1),v("button",{class:"del",onClick:Bn(d=>u(_.id),["stop"])},"×",8,r2)],10,t2))),128)),dt(ae).api.profiles.length?de("",!0):(N(),O("div",a2,"尚无接入档案。")),s.value?(N(),O("div",o2,[v("div",l2,"用量 · "+P(s.value.project),1),v("div",c2,[g[7]||(g[7]=v("span",{class:"ul"},"对标模型",-1)),v("b",u2,P(r.value.model||"—"),1)]),v("div",h2,[v("div",null,[v("b",d2,P(l(r.value.tok_in)),1),g[8]||(g[8]=v("span",null,"输入 token",-1))]),v("div",null,[v("b",f2,P(l(r.value.tok_out)),1),g[9]||(g[9]=v("span",null,"正文 token",-1))]),v("div",null,[v("b",p2,P(r.value.calls||0),1),g[10]||(g[10]=v("span",null,"调用次数",-1))]),v("div",null,[v("b",m2,P(a.value),1),v("span",null,"吞吐 tok/s"+P(r.value.tok_think?"（含思考）":""),1)])]),r.value.tok_think?(N(),O("div",g2," 思考 "+P(l(r.value.tok_think))+" tok · 有效产出 "+P(o.value)+" tok/s（正文/总耗时，含排队与预填充） ",1)):de("",!0),v("div",_2,P(s.value.note),1)])):de("",!0),g[12]||(g[12]=v("div",{class:"kicker",style:{"margin-top":"20px"}},"新接入 / 更新",-1)),Qt(v("input",{"onUpdate:modelValue":g[2]||(g[2]=_=>e.base_url=_),class:"field",style:{"margin-top":"8px"},placeholder:"接口链接 https://…/v1（OpenAI 兼容）"},null,512),[[Dn,e.base_url]]),Qt(v("input",{"onUpdate:modelValue":g[3]||(g[3]=_=>e.model=_),class:"field",style:{"margin-top":"8px"},placeholder:"模型名"},null,512),[[Dn,e.model]]),Qt(v("input",{"onUpdate:modelValue":g[4]||(g[4]=_=>e.api_key=_),type:"password",class:"field",style:{"margin-top":"8px"},placeholder:"API 密钥 sk-…"},null,512),[[Dn,e.api_key]]),v("div",v2,[v("button",{class:"btn btn-paper btn-sm",disabled:i.value,onClick:h},P(i.value?"测试中…":"测试连接"),9,x2),v("button",{class:"btn btn-ink btn-sm",onClick:f},"保存接入"),v("span",y2,P(t.value),1)])])])]))}},S2=Jn(M2,[["__scopeId","data-v-458c514a"]]),b2={class:"top"},E2={class:"steps","aria-label":"流程"},T2=["onClick"],w2={class:"n mono"},A2={class:"top-right"},C2={class:"wrap"},R2={class:"content"},P2={class:"rail"},D2={key:0,class:"toast card"},L2={__name:"App",setup(n){const e=["世界","配置","推演","报告"],t=lt(()=>{const r=ae.D&&ae.D.meta;return!r||!r.built?1:(r.round||0)>0?4:2}),i=lt(()=>{if(!ae.api.active)return"未接入模型";const r=ae.api.profiles.find(a=>a.id===ae.api.current);return r?r.model:"独立 API"});function s(){ae.drawer="history",Lt.archives().then(r=>{ae.archives=r&&r.archives||[]})}return(r,a)=>(N(),O(He,null,[v("header",b2,[v("div",{class:"brand",onClick:a[0]||(a[0]=o=>dt(ss)(1))},[...a[2]||(a[2]=[Ec('<svg viewBox="0 0 64 64" class="seal-mark" aria-hidden="true" data-v-e643902a><rect x="4" y="4" width="56" height="56" rx="12" fill="var(--seal)" data-v-e643902a></rect><text x="32" y="30" font-size="21" font-weight="800" fill="#fcfcfb" text-anchor="middle" font-family="inherit" data-v-e643902a>N</text><text x="32" y="52" font-size="21" font-weight="800" fill="#fcfcfb" text-anchor="middle" font-family="inherit" data-v-e643902a>D</text></svg><div data-v-e643902a><div class="brand-name" data-v-e643902a>NEST-DRAMA</div></div>',2)])]),v("nav",E2,[(N(),O(He,null,ht(e,(o,l)=>v("button",{key:o,class:nt(["step",{on:dt(ae).step===l+1,done:t.value>l+1}]),onClick:c=>dt(ss)(l+1)},[v("span",w2,P(l+1),1),Ne(P(o),1)],10,T2)),64))]),v("div",A2,[v("button",{class:nt(["pill",dt(ae).api.active?"ok":"bad"]),onClick:a[1]||(a[1]=o=>dt(ae).drawer="api")},[a[3]||(a[3]=v("span",{class:"dot"},null,-1)),Ne(P(i.value),1)],2),v("button",{class:"btn btn-ghost btn-sm",onClick:s},"历史局")])]),v("main",C2,[v("section",R2,[dt(ae).step===1?(N(),Rn(q0,{key:0})):dt(ae).step===2?(N(),Rn(lv,{key:1})):dt(ae).step===3?(N(),Rn(Ay,{key:2})):(N(),Rn(bM,{key:3}))]),v("aside",P2,[qt(gR)])]),dt(ae).drawer==="round"?(N(),Rn(SR,{key:0})):de("",!0),dt(ae).drawer==="history"?(N(),Rn(ZR,{key:1})):de("",!0),dt(ae).drawer==="api"?(N(),Rn(S2,{key:2})):de("",!0),qt(F_,{name:"fade"},{default:Fu(()=>[dt(ae).toast?(N(),O("div",D2,P(dt(ae).toast),1)):de("",!0)]),_:1})],64))}},I2=Jn(L2,[["__scopeId","data-v-e643902a"]]);f0(I2).mount("#app");x0();
