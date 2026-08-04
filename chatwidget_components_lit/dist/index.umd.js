(function(s,T){typeof exports=="object"&&typeof module<"u"?T(exports):typeof define=="function"&&define.amd?define(["exports"],T):(s=typeof globalThis<"u"?globalThis:s||self,T(s.ChatWidgetLit={}))})(this,function(s){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ie;const T=globalThis,Sr=T.ShadowRoot&&(T.ShadyCSS===void 0||T.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Br=Symbol(),Xr=new WeakMap;let Jr=class{constructor(r,e,o){if(this._$cssResult$=!0,o!==Br)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o;const e=this.t;if(Sr&&r===void 0){const o=e!==void 0&&e.length===1;o&&(r=Xr.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),o&&Xr.set(e,r))}return r}toString(){return this.cssText}};const Qr=t=>new Jr(typeof t=="string"?t:t+"",void 0,Br),S=(t,...r)=>{const e=t.length===1?t[0]:r.reduce((o,n,i)=>o+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[i+1],t[0]);return new Jr(e,t,Br)},He=(t,r)=>{if(Sr)t.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of r){const o=document.createElement("style"),n=T.litNonce;n!==void 0&&o.setAttribute("nonce",n),o.textContent=e.cssText,t.appendChild(o)}},re=Sr?t=>t:t=>t instanceof CSSStyleSheet?(r=>{let e="";for(const o of r.cssRules)e+=o.cssText;return Qr(e)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Fe,defineProperty:Ge,getOwnPropertyDescriptor:qe,getOwnPropertyNames:Ve,getOwnPropertySymbols:Ye,getPrototypeOf:Ke}=Object,P=globalThis,ee=P.trustedTypes,Ze=ee?ee.emptyScript:"",Or=P.reactiveElementPolyfillSupport,er=(t,r)=>t,ur={toAttribute(t,r){switch(r){case Boolean:t=t?Ze:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,r){let e=t;switch(r){case Boolean:e=t!==null;break;case Number:e=t===null?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch{e=null}}return e}},zr=(t,r)=>!Fe(t,r),te={attribute:!0,type:String,converter:ur,reflect:!1,useDefault:!1,hasChanged:zr};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),P.litPropertyMetadata??(P.litPropertyMetadata=new WeakMap);let V=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??(this.l=[])).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=te){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){const o=Symbol(),n=this.getPropertyDescriptor(r,o,e);n!==void 0&&Ge(this.prototype,r,n)}}static getPropertyDescriptor(r,e,o){const{get:n,set:i}=qe(this.prototype,r)??{get(){return this[e]},set(a){this[e]=a}};return{get:n,set(a){const p=n==null?void 0:n.call(this);i==null||i.call(this,a),this.requestUpdate(r,p,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??te}static _$Ei(){if(this.hasOwnProperty(er("elementProperties")))return;const r=Ke(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(er("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(er("properties"))){const e=this.properties,o=[...Ve(e),...Ye(e)];for(const n of o)this.createProperty(n,e[n])}const r=this[Symbol.metadata];if(r!==null){const e=litPropertyMetadata.get(r);if(e!==void 0)for(const[o,n]of e)this.elementProperties.set(o,n)}this._$Eh=new Map;for(const[e,o]of this.elementProperties){const n=this._$Eu(e,o);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){const e=[];if(Array.isArray(r)){const o=new Set(r.flat(1/0).reverse());for(const n of o)e.unshift(re(n))}else r!==void 0&&e.push(re(r));return e}static _$Eu(r,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var r;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(r=this.constructor.l)==null||r.forEach(e=>e(this))}addController(r){var e;(this._$EO??(this._$EO=new Set)).add(r),this.renderRoot!==void 0&&this.isConnected&&((e=r.hostConnected)==null||e.call(r))}removeController(r){var e;(e=this._$EO)==null||e.delete(r)}_$E_(){const r=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(r.set(o,this[o]),delete this[o]);r.size>0&&(this._$Ep=r)}createRenderRoot(){const r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return He(r,this.constructor.elementStyles),r}connectedCallback(){var r;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(r=this._$EO)==null||r.forEach(e=>{var o;return(o=e.hostConnected)==null?void 0:o.call(e)})}enableUpdating(r){}disconnectedCallback(){var r;(r=this._$EO)==null||r.forEach(e=>{var o;return(o=e.hostDisconnected)==null?void 0:o.call(e)})}attributeChangedCallback(r,e,o){this._$AK(r,o)}_$ET(r,e){var i;const o=this.constructor.elementProperties.get(r),n=this.constructor._$Eu(r,o);if(n!==void 0&&o.reflect===!0){const a=(((i=o.converter)==null?void 0:i.toAttribute)!==void 0?o.converter:ur).toAttribute(e,o.type);this._$Em=r,a==null?this.removeAttribute(n):this.setAttribute(n,a),this._$Em=null}}_$AK(r,e){var i,a;const o=this.constructor,n=o._$Eh.get(r);if(n!==void 0&&this._$Em!==n){const p=o.getPropertyOptions(n),c=typeof p.converter=="function"?{fromAttribute:p.converter}:((i=p.converter)==null?void 0:i.fromAttribute)!==void 0?p.converter:ur;this._$Em=n;const g=c.fromAttribute(e,p.type);this[n]=g??((a=this._$Ej)==null?void 0:a.get(n))??g,this._$Em=null}}requestUpdate(r,e,o,n=!1,i){var a;if(r!==void 0){const p=this.constructor;if(n===!1&&(i=this[r]),o??(o=p.getPropertyOptions(r)),!((o.hasChanged??zr)(i,e)||o.useDefault&&o.reflect&&i===((a=this._$Ej)==null?void 0:a.get(r))&&!this.hasAttribute(p._$Eu(r,o))))return;this.C(r,e,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:o,reflect:n,wrapped:i},a){o&&!(this._$Ej??(this._$Ej=new Map)).has(r)&&(this._$Ej.set(r,a??e??this[r]),i!==!0||a!==void 0)||(this._$AL.has(r)||(this.hasUpdated||o||(e=void 0),this._$AL.set(r,e)),n===!0&&this._$Em!==r&&(this._$Eq??(this._$Eq=new Set)).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[i,a]of n){const{wrapped:p}=a,c=this[i];p!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,a,c)}}let r=!1;const e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),(o=this._$EO)==null||o.forEach(n=>{var i;return(i=n.hostUpdate)==null?void 0:i.call(n)}),this.update(e)):this._$EM()}catch(n){throw r=!1,this._$EM(),n}r&&this._$AE(e)}willUpdate(r){}_$AE(r){var e;(e=this._$EO)==null||e.forEach(o=>{var n;return(n=o.hostUpdated)==null?void 0:n.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(r){}firstUpdated(r){}};V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[er("elementProperties")]=new Map,V[er("finalized")]=new Map,Or==null||Or({ReactiveElement:V}),(P.reactiveElementVersions??(P.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tr=globalThis,ne=t=>t,br=tr.trustedTypes,oe=br?br.createPolicy("lit-html",{createHTML:t=>t}):void 0,ie="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,ae="?"+M,Xe=`<${ae}>`,N=document,nr=()=>N.createComment(""),or=t=>t===null||typeof t!="object"&&typeof t!="function",_r=Array.isArray,Je=t=>_r(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",Ar=`[ 	
\f\r]`,ir=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,se=/-->/g,le=/>/g,D=RegExp(`>|${Ar}(?:([^\\s"'>=/]+)(${Ar}*=${Ar}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ce=/'/g,de=/"/g,pe=/^(?:script|style|textarea|title)$/i,Qe=t=>(r,...e)=>({_$litType$:t,strings:r,values:e}),l=Qe(1),Y=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),he=new WeakMap,U=N.createTreeWalker(N,129);function ge(t,r){if(!_r(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return oe!==void 0?oe.createHTML(r):r}const rt=(t,r)=>{const e=t.length-1,o=[];let n,i=r===2?"<svg>":r===3?"<math>":"",a=ir;for(let p=0;p<e;p++){const c=t[p];let g,b,d=-1,u=0;for(;u<c.length&&(a.lastIndex=u,b=a.exec(c),b!==null);)u=a.lastIndex,a===ir?b[1]==="!--"?a=se:b[1]!==void 0?a=le:b[2]!==void 0?(pe.test(b[2])&&(n=RegExp("</"+b[2],"g")),a=D):b[3]!==void 0&&(a=D):a===D?b[0]===">"?(a=n??ir,d=-1):b[1]===void 0?d=-2:(d=a.lastIndex-b[2].length,g=b[1],a=b[3]===void 0?D:b[3]==='"'?de:ce):a===de||a===ce?a=D:a===se||a===le?a=ir:(a=D,n=void 0);const v=a===D&&t[p+1].startsWith("/>")?" ":"";i+=a===ir?c+Xe:d>=0?(o.push(g),c.slice(0,d)+ie+c.slice(d)+M+v):c+M+(d===-2?p:v)}return[ge(t,i+(t[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),o]};class ar{constructor({strings:r,_$litType$:e},o){let n;this.parts=[];let i=0,a=0;const p=r.length-1,c=this.parts,[g,b]=rt(r,e);if(this.el=ar.createElement(g,o),U.currentNode=this.el.content,e===2||e===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(n=U.nextNode())!==null&&c.length<p;){if(n.nodeType===1){if(n.hasAttributes())for(const d of n.getAttributeNames())if(d.endsWith(ie)){const u=b[a++],v=n.getAttribute(d).split(M),k=/([.?@])?(.*)/.exec(u);c.push({type:1,index:i,name:k[2],strings:v,ctor:k[1]==="."?tt:k[1]==="?"?nt:k[1]==="@"?ot:wr}),n.removeAttribute(d)}else d.startsWith(M)&&(c.push({type:6,index:i}),n.removeAttribute(d));if(pe.test(n.tagName)){const d=n.textContent.split(M),u=d.length-1;if(u>0){n.textContent=br?br.emptyScript:"";for(let v=0;v<u;v++)n.append(d[v],nr()),U.nextNode(),c.push({type:2,index:++i});n.append(d[u],nr())}}}else if(n.nodeType===8)if(n.data===ae)c.push({type:2,index:i});else{let d=-1;for(;(d=n.data.indexOf(M,d+1))!==-1;)c.push({type:7,index:i}),d+=M.length-1}i++}}static createElement(r,e){const o=N.createElement("template");return o.innerHTML=r,o}}function K(t,r,e=t,o){var a,p;if(r===Y)return r;let n=o!==void 0?(a=e._$Co)==null?void 0:a[o]:e._$Cl;const i=or(r)?void 0:r._$litDirective$;return(n==null?void 0:n.constructor)!==i&&((p=n==null?void 0:n._$AO)==null||p.call(n,!1),i===void 0?n=void 0:(n=new i(t),n._$AT(t,e,o)),o!==void 0?(e._$Co??(e._$Co=[]))[o]=n:e._$Cl=n),n!==void 0&&(r=K(t,n._$AS(t,r.values),n,o)),r}class et{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){const{el:{content:e},parts:o}=this._$AD,n=((r==null?void 0:r.creationScope)??N).importNode(e,!0);U.currentNode=n;let i=U.nextNode(),a=0,p=0,c=o[0];for(;c!==void 0;){if(a===c.index){let g;c.type===2?g=new sr(i,i.nextSibling,this,r):c.type===1?g=new c.ctor(i,c.name,c.strings,this,r):c.type===6&&(g=new it(i,this,r)),this._$AV.push(g),c=o[++p]}a!==(c==null?void 0:c.index)&&(i=U.nextNode(),a++)}return U.currentNode=N,n}p(r){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(r,o,e),e+=o.strings.length-2):o._$AI(r[e])),e++}}class sr{get _$AU(){var r;return((r=this._$AM)==null?void 0:r._$AU)??this._$Cv}constructor(r,e,o,n){this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=o,this.options=n,this._$Cv=(n==null?void 0:n.isConnected)??!0}get parentNode(){let r=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(r==null?void 0:r.nodeType)===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=K(this,r,e),or(r)?r===C||r==null||r===""?(this._$AH!==C&&this._$AR(),this._$AH=C):r!==this._$AH&&r!==Y&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):Je(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==C&&or(this._$AH)?this._$AA.nextSibling.data=r:this.T(N.createTextNode(r)),this._$AH=r}$(r){var i;const{values:e,_$litType$:o}=r,n=typeof o=="number"?this._$AC(r):(o.el===void 0&&(o.el=ar.createElement(ge(o.h,o.h[0]),this.options)),o);if(((i=this._$AH)==null?void 0:i._$AD)===n)this._$AH.p(e);else{const a=new et(n,this),p=a.u(this.options);a.p(e),this.T(p),this._$AH=a}}_$AC(r){let e=he.get(r.strings);return e===void 0&&he.set(r.strings,e=new ar(r)),e}k(r){_r(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,n=0;for(const i of r)n===e.length?e.push(o=new sr(this.O(nr()),this.O(nr()),this,this.options)):o=e[n],o._$AI(i),n++;n<e.length&&(this._$AR(o&&o._$AB.nextSibling,n),e.length=n)}_$AR(r=this._$AA.nextSibling,e){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,e);r!==this._$AB;){const n=ne(r).nextSibling;ne(r).remove(),r=n}}setConnected(r){var e;this._$AM===void 0&&(this._$Cv=r,(e=this._$AP)==null||e.call(this,r))}}class wr{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,o,n,i){this.type=1,this._$AH=C,this._$AN=void 0,this.element=r,this.name=e,this._$AM=n,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=C}_$AI(r,e=this,o,n){const i=this.strings;let a=!1;if(i===void 0)r=K(this,r,e,0),a=!or(r)||r!==this._$AH&&r!==Y,a&&(this._$AH=r);else{const p=r;let c,g;for(r=i[0],c=0;c<i.length-1;c++)g=K(this,p[o+c],e,c),g===Y&&(g=this._$AH[c]),a||(a=!or(g)||g!==this._$AH[c]),g===C?r=C:r!==C&&(r+=(g??"")+i[c+1]),this._$AH[c]=g}a&&!n&&this.j(r)}j(r){r===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}}class tt extends wr{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===C?void 0:r}}class nt extends wr{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==C)}}class ot extends wr{constructor(r,e,o,n,i){super(r,e,o,n,i),this.type=5}_$AI(r,e=this){if((r=K(this,r,e,0)??C)===Y)return;const o=this._$AH,n=r===C&&o!==C||r.capture!==o.capture||r.once!==o.once||r.passive!==o.passive,i=r!==C&&(o===C||n);n&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,r):this._$AH.handleEvent(r)}}class it{constructor(r,e,o){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(r){K(this,r)}}const Er=tr.litHtmlPolyfillSupport;Er==null||Er(ar,sr),(tr.litHtmlVersions??(tr.litHtmlVersions=[])).push("3.3.3");const at=(t,r,e)=>{const o=(e==null?void 0:e.renderBefore)??r;let n=o._$litPart$;if(n===void 0){const i=(e==null?void 0:e.renderBefore)??null;o._$litPart$=n=new sr(r.insertBefore(nr(),i),i,void 0,e??{})}return n._$AI(t),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=globalThis;class $ extends V{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const r=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=r.firstChild),r}update(r){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=at(e,this.renderRoot,this.renderOptions)}connectedCallback(){var r;super.connectedCallback(),(r=this._$Do)==null||r.setConnected(!0)}disconnectedCallback(){var r;super.disconnectedCallback(),(r=this._$Do)==null||r.setConnected(!1)}render(){return Y}}$._$litElement$=!0,$.finalized=!0,(Ie=L.litElementHydrateSupport)==null||Ie.call(L,{LitElement:$});const jr=L.litElementPolyfillSupport;jr==null||jr({LitElement:$}),(L.litElementVersions??(L.litElementVersions=[])).push("4.2.2");const _=Qr(`/* ==========================================================================\r
   Zotly Dashboard - Pure Vanilla CSS Stylesheet\r
   Self-contained styling for layout, components, widgets, responsive & dark mode\r
   ========================================================================== */\r
\r
\r
@layer properties {\r
  @supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))) {\r
    *,:before,:after,::backdrop {\r
      --tw-translate-x:0;\r
      --tw-translate-y:0;\r
      --tw-translate-z:0;\r
      --tw-scale-x:1;\r
      --tw-scale-y:1;\r
      --tw-scale-z:1;\r
      --tw-rotate-x:initial;\r
      --tw-rotate-y:initial;\r
      --tw-rotate-z:initial;\r
      --tw-skew-x:initial;\r
      --tw-skew-y:initial;\r
      --tw-space-y-reverse:0;\r
      --tw-border-style:solid;\r
      --tw-gradient-position:initial;\r
      --tw-gradient-from:#0000;\r
      --tw-gradient-via:#0000;\r
      --tw-gradient-to:#0000;\r
      --tw-gradient-stops:initial;\r
      --tw-gradient-via-stops:initial;\r
      --tw-gradient-from-position:0%;\r
      --tw-gradient-via-position:50%;\r
      --tw-gradient-to-position:100%;\r
      --tw-leading:initial;\r
      --tw-font-weight:initial;\r
      --tw-tracking:initial;\r
      --tw-shadow:0 0 #0000;\r
      --tw-shadow-color:initial;\r
      --tw-shadow-alpha:100%;\r
      --tw-inset-shadow:0 0 #0000;\r
      --tw-inset-shadow-color:initial;\r
      --tw-inset-shadow-alpha:100%;\r
      --tw-ring-color:initial;\r
      --tw-ring-shadow:0 0 #0000;\r
      --tw-inset-ring-color:initial;\r
      --tw-inset-ring-shadow:0 0 #0000;\r
      --tw-ring-inset:initial;\r
      --tw-ring-offset-width:0px;\r
      --tw-ring-offset-color:#fff;\r
      --tw-ring-offset-shadow:0 0 #0000;\r
      --tw-blur:initial;\r
      --tw-brightness:initial;\r
      --tw-contrast:initial;\r
      --tw-grayscale:initial;\r
      --tw-hue-rotate:initial;\r
      --tw-invert:initial;\r
      --tw-opacity:initial;\r
      --tw-saturate:initial;\r
      --tw-sepia:initial;\r
      --tw-drop-shadow:initial;\r
      --tw-drop-shadow-color:initial;\r
      --tw-drop-shadow-alpha:100%;\r
      --tw-drop-shadow-size:initial;\r
      --tw-backdrop-blur:initial;\r
      --tw-backdrop-brightness:initial;\r
      --tw-backdrop-contrast:initial;\r
      --tw-backdrop-grayscale:initial;\r
      --tw-backdrop-hue-rotate:initial;\r
      --tw-backdrop-invert:initial;\r
      --tw-backdrop-opacity:initial;\r
      --tw-backdrop-saturate:initial;\r
      --tw-backdrop-sepia:initial;\r
      --tw-duration:initial;\r
      --tw-ease:initial\r
    }\r
\r
  }\r
\r
}\r
@layer theme {\r
  :root,:host {\r
    --font-sans:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\r
    --font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;\r
    --color-red-400:oklch(70.4% .191 22.216);\r
    --color-amber-400:oklch(82.8% .189 84.429);\r
    --color-amber-500:oklch(76.9% .188 70.08);\r
    --color-green-400:oklch(79.2% .209 151.711);\r
    --color-emerald-500:oklch(69.6% .17 162.48);\r
    --color-indigo-50:oklch(96.2% .018 272.314);\r
    --color-indigo-400:oklch(67.3% .182 276.935);\r
    --color-indigo-500:oklch(58.5% .233 277.117);\r
    --color-indigo-600:oklch(51.1% .262 276.966);\r
    --color-indigo-950:oklch(25.7% .09 281.288);\r
    --color-violet-400:oklch(70.2% .183 293.541);\r
    --color-violet-500:oklch(60.6% .25 292.717);\r
    --color-violet-600:oklch(54.1% .281 293.009);\r
    --color-rose-500:oklch(64.5% .246 16.439);\r
    --color-slate-50:oklch(98.4% .003 247.858);\r
    --color-slate-100:oklch(96.8% .007 247.896);\r
    --color-slate-200:oklch(92.9% .013 255.508);\r
    --color-slate-400:oklch(70.4% .04 256.788);\r
    --color-slate-500:oklch(55.4% .046 257.417);\r
    --color-slate-600:oklch(44.6% .043 257.281);\r
    --color-slate-700:oklch(37.2% .044 257.287);\r
    --color-slate-800:oklch(27.9% .041 260.031);\r
    --color-slate-900:oklch(20.8% .042 265.755);\r
    --color-slate-950:oklch(12.9% .042 264.695);\r
    --color-neutral-800:oklch(26.9% 0 none);\r
    --color-white:#fff;\r
    --spacing:.25rem;\r
    --container-sm:24rem;\r
    --container-lg:32rem;\r
    --container-2xl:42rem;\r
    --container-5xl:64rem;\r
    --text-xs:.75rem;\r
    --text-xs--line-height:calc(1 / .75);\r
    --text-sm:.875rem;\r
    --text-sm--line-height:calc(1.25 / .875);\r
    --text-base:1rem;\r
    --text-base--line-height:calc(1.5 / 1);\r
    --text-lg:1.125rem;\r
    --text-lg--line-height:calc(1.75 / 1.125);\r
    --text-2xl:1.5rem;\r
    --text-2xl--line-height:calc(2 / 1.5);\r
    --text-3xl:1.875rem;\r
    --text-3xl--line-height:calc(2.25 / 1.875);\r
    --font-weight-medium:500;\r
    --font-weight-semibold:600;\r
    --font-weight-bold:700;\r
    --font-weight-extrabold:800;\r
    --font-weight-black:900;\r
    --tracking-wider:.05em;\r
    --tracking-widest:.1em;\r
    --leading-tight:1.25;\r
    --leading-relaxed:1.625;\r
    --radius-md:.375rem;\r
    --radius-lg:.5rem;\r
    --radius-xl:.75rem;\r
    --radius-2xl:1rem;\r
    --ease-in:cubic-bezier(.4, 0, 1, 1);\r
    --ease-out:cubic-bezier(0, 0, .2, 1);\r
    --ease-in-out:cubic-bezier(.4, 0, .2, 1);\r
    --animate-ping:ping 1s cubic-bezier(0, 0, .2, 1) infinite;\r
    --animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;\r
    --animate-bounce:bounce 1s infinite;\r
    --blur-xs:4px;\r
    --blur-md:12px;\r
    --default-transition-duration:.15s;\r
    --default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);\r
    --default-font-family:var(--font-sans);\r
    --default-mono-font-family:var(--font-mono);\r
    --font-inter:var(--font-sans)\r
  }\r
\r
}\r
@layer base {\r
  *,:after,:before,::backdrop {\r
    box-sizing:border-box;\r
    border:0 solid;\r
    margin:0;\r
    padding:0\r
  }\r
  ::file-selector-button {\r
    box-sizing:border-box;\r
    border:0 solid;\r
    margin:0;\r
    padding:0\r
  }\r
  html,:host {\r
    -webkit-text-size-adjust:100%;\r
    tab-size:4;\r
    line-height:1.5;\r
    font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");\r
    font-feature-settings:var(--default-font-feature-settings,normal);\r
    font-variation-settings:var(--default-font-variation-settings,normal);\r
    -webkit-tap-highlight-color:transparent\r
  }\r
  hr {\r
    height:0;\r
    color:inherit;\r
    border-top-width:1px\r
  }\r
  abbr:where([title]) {\r
    -webkit-text-decoration:underline dotted;\r
    text-decoration:underline dotted\r
  }\r
  h1,h2,h3,h4,h5,h6 {\r
    font-size:inherit;\r
    font-weight:inherit\r
  }\r
  a {\r
    color:inherit;\r
    -webkit-text-decoration:inherit;\r
    -webkit-text-decoration:inherit;\r
    -webkit-text-decoration:inherit;\r
    text-decoration:inherit\r
  }\r
  b,strong {\r
    font-weight:bolder\r
  }\r
  code,kbd,samp,pre {\r
    font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);\r
    font-feature-settings:var(--default-mono-font-feature-settings,normal);\r
    font-variation-settings:var(--default-mono-font-variation-settings,normal);\r
    font-size:1em\r
  }\r
  small {\r
    font-size:80%\r
  }\r
  sub,sup {\r
    vertical-align:baseline;\r
    font-size:75%;\r
    line-height:0;\r
    position:relative\r
  }\r
  sub {\r
    bottom:-.25em\r
  }\r
  sup {\r
    top:-.5em\r
  }\r
  table {\r
    text-indent:0;\r
    border-color:inherit;\r
    border-collapse:collapse\r
  }\r
  :-moz-focusring:where(:not(iframe)) {\r
    outline:auto\r
  }\r
  progress {\r
    vertical-align:baseline\r
  }\r
  summary {\r
    display:list-item\r
  }\r
  ol,ul,menu {\r
    list-style:none\r
  }\r
  img,svg,video,canvas,audio,iframe,embed,object {\r
    vertical-align:middle;\r
    display:block\r
  }\r
  img,video {\r
    max-width:100%;\r
    height:auto\r
  }\r
  button,input,select,optgroup,textarea {\r
    font:inherit;\r
    font-feature-settings:inherit;\r
    font-variation-settings:inherit;\r
    letter-spacing:inherit;\r
    color:inherit;\r
    opacity:1;\r
    background-color:#0000;\r
    border-radius:0\r
  }\r
  ::file-selector-button {\r
    font:inherit;\r
    font-feature-settings:inherit;\r
    font-variation-settings:inherit;\r
    letter-spacing:inherit;\r
    color:inherit;\r
    opacity:1;\r
    background-color:#0000;\r
    border-radius:0\r
  }\r
  :where(select:is([multiple],[size])) optgroup {\r
    font-weight:bolder\r
  }\r
  :where(select:is([multiple],[size])) optgroup option {\r
    padding-inline-start:20px\r
  }\r
  ::file-selector-button {\r
    margin-inline-end:4px\r
  }\r
  ::placeholder {\r
    opacity:1\r
  }\r
  @supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px) {\r
    ::placeholder {\r
      color:currentColor\r
    }\r
    @supports (color:color-mix(in lab, red, red)) {\r
      ::placeholder {\r
        color:color-mix(in oklab, currentcolor 50%, transparent)\r
      }\r
\r
    }\r
\r
  }\r
  textarea {\r
    resize:vertical\r
  }\r
  ::-webkit-search-decoration {\r
    -webkit-appearance:none\r
  }\r
  ::-webkit-date-and-time-value {\r
    min-height:1lh;\r
    text-align:inherit\r
  }\r
  ::-webkit-datetime-edit {\r
    display:inline-flex\r
  }\r
  ::-webkit-datetime-edit-fields-wrapper {\r
    padding:0\r
  }\r
  ::-webkit-datetime-edit {\r
    padding-block:0\r
  }\r
  ::-webkit-datetime-edit-year-field {\r
    padding-block:0\r
  }\r
  ::-webkit-datetime-edit-month-field {\r
    padding-block:0\r
  }\r
  ::-webkit-datetime-edit-day-field {\r
    padding-block:0\r
  }\r
  ::-webkit-datetime-edit-hour-field {\r
    padding-block:0\r
  }\r
  ::-webkit-datetime-edit-minute-field {\r
    padding-block:0\r
  }\r
  ::-webkit-datetime-edit-second-field {\r
    padding-block:0\r
  }\r
  ::-webkit-datetime-edit-millisecond-field {\r
    padding-block:0\r
  }\r
  ::-webkit-datetime-edit-meridiem-field {\r
    padding-block:0\r
  }\r
  ::-webkit-calendar-picker-indicator {\r
    line-height:1\r
  }\r
  :-moz-ui-invalid {\r
    box-shadow:none\r
  }\r
  button,input:where([type=button],[type=reset],[type=submit]) {\r
    appearance:button\r
  }\r
  ::file-selector-button {\r
    appearance:button\r
  }\r
  ::-webkit-inner-spin-button {\r
    height:auto\r
  }\r
  ::-webkit-outer-spin-button {\r
    height:auto\r
  }\r
  [hidden]:where(:not([hidden=until-found])) {\r
    display:none!important\r
  }\r
\r
}\r
@layer components;\r
@layer utilities {\r
  .pointer-events-none {\r
    pointer-events:none\r
  }\r
  .collapse {\r
    visibility:collapse\r
  }\r
  .absolute {\r
    position:absolute\r
  }\r
  .fixed {\r
    position:fixed\r
  }\r
  .relative {\r
    position:relative\r
  }\r
  .sticky {\r
    position:sticky\r
  }\r
  .inset-0 {\r
    inset:0\r
  }\r
  .-top-7 {\r
    top:calc(var(--spacing) * -7)\r
  }\r
  .top-0 {\r
    top:0\r
  }\r
  .top-1\\/2 {\r
    top:50%\r
  }\r
  .top-4 {\r
    top:calc(var(--spacing) * 4)\r
  }\r
  .top-16 {\r
    top:calc(var(--spacing) * 16)\r
  }\r
  .top-\\[100px\\] {\r
    top:100px\r
  }\r
  .top-full {\r
    top:100%\r
  }\r
  .right-0 {\r
    right:0\r
  }\r
  .right-1\\.5 {\r
    right:calc(var(--spacing) * 1.5)\r
  }\r
  .right-4 {\r
    right:calc(var(--spacing) * 4)\r
  }\r
  .right-6 {\r
    right:calc(var(--spacing) * 6)\r
  }\r
  .right-\\[50px\\] {\r
    right:50px\r
  }\r
  .bottom-0 {\r
    bottom:0\r
  }\r
  .bottom-6 {\r
    bottom:calc(var(--spacing) * 6)\r
  }\r
  .bottom-20 {\r
    bottom:calc(var(--spacing) * 20)\r
  }\r
  .bottom-\\[150px\\] {\r
    bottom:150px\r
  }\r
  .bottom-full {\r
    bottom:100%\r
  }\r
  .left-0 {\r
    left:0\r
  }\r
  .left-1\\/2 {\r
    left:50%\r
  }\r
  .left-\\[50px\\] {\r
    left:50px\r
  }\r
  .isolate {\r
    isolation:isolate\r
  }\r
  .z-10 {\r
    z-index:10\r
  }\r
  .z-20 {\r
    z-index:20\r
  }\r
  .z-25 {\r
    z-index:25\r
  }\r
  .z-30 {\r
    z-index:30\r
  }\r
  .z-40 {\r
    z-index:40\r
  }\r
  .z-50 {\r
    z-index:50\r
  }\r
  .container {\r
    width:100%\r
  }\r
  @media (min-width:40rem) {\r
    .container {\r
      max-width:40rem\r
    }\r
\r
  }\r
  @media (min-width:48rem) {\r
    .container {\r
      max-width:48rem\r
    }\r
\r
  }\r
  @media (min-width:64rem) {\r
    .container {\r
      max-width:64rem\r
    }\r
\r
  }\r
  @media (min-width:80rem) {\r
    .container {\r
      max-width:80rem\r
    }\r
\r
  }\r
  @media (min-width:96rem) {\r
    .container {\r
      max-width:96rem\r
    }\r
\r
  }\r
  .mx-auto {\r
    margin-inline:auto\r
  }\r
  .mt-1 {\r
    margin-top:var(--spacing)\r
  }\r
  .mt-2 {\r
    margin-top:calc(var(--spacing) * 2)\r
  }\r
  .mt-4 {\r
    margin-top:calc(var(--spacing) * 4)\r
  }\r
  .mb-1 {\r
    margin-bottom:var(--spacing)\r
  }\r
  .mb-2 {\r
    margin-bottom:calc(var(--spacing) * 2)\r
  }\r
  .mb-3 {\r
    margin-bottom:calc(var(--spacing) * 3)\r
  }\r
  .mb-4 {\r
    margin-bottom:calc(var(--spacing) * 4)\r
  }\r
  .mb-6 {\r
    margin-bottom:calc(var(--spacing) * 6)\r
  }\r
  .ml-0\\.5 {\r
    margin-left:calc(var(--spacing) * .5)\r
  }\r
  .ml-1 {\r
    margin-left:var(--spacing)\r
  }\r
  .ml-4 {\r
    margin-left:calc(var(--spacing) * 4)\r
  }\r
  .ml-auto {\r
    margin-left:auto\r
  }\r
  .block {\r
    display:block\r
  }\r
  .flex {\r
    display:flex\r
  }\r
  .grid {\r
    display:grid\r
  }\r
  .hidden {\r
    display:none\r
  }\r
  .inline-block {\r
    display:inline-block\r
  }\r
  .inline-flex {\r
    display:inline-flex\r
  }\r
  .h-1\\.5 {\r
    height:calc(var(--spacing) * 1.5)\r
  }\r
  .h-3 {\r
    height:calc(var(--spacing) * 3)\r
  }\r
  .h-3\\.5 {\r
    height:calc(var(--spacing) * 3.5)\r
  }\r
  .h-4 {\r
    height:calc(var(--spacing) * 4)\r
  }\r
  .h-5 {\r
    height:calc(var(--spacing) * 5)\r
  }\r
  .h-6 {\r
    height:calc(var(--spacing) * 6)\r
  }\r
  .h-8 {\r
    height:calc(var(--spacing) * 8)\r
  }\r
  .h-10 {\r
    height:calc(var(--spacing) * 10)\r
  }\r
  .h-14 {\r
    height:calc(var(--spacing) * 14)\r
  }\r
  .h-16 {\r
    height:calc(var(--spacing) * 16)\r
  }\r
  .h-\\[620px\\] {\r
    height:620px\r
  }\r
  .h-\\[calc\\(100vh-4rem\\)\\] {\r
    height:calc(100vh - 4rem)\r
  }\r
  .h-full {\r
    height:100%\r
  }\r
  .min-h-0 {\r
    min-height:0\r
  }\r
  .min-h-\\[400px\\] {\r
    min-height:400px\r
  }\r
  .min-h-\\[500px\\] {\r
    min-height:500px\r
  }\r
  .min-h-full {\r
    min-height:100%\r
  }\r
  .min-h-screen {\r
    min-height:100vh\r
  }\r
  .w-1\\.5 {\r
    width:calc(var(--spacing) * 1.5)\r
  }\r
  .w-3 {\r
    width:calc(var(--spacing) * 3)\r
  }\r
  .w-3\\.5 {\r
    width:calc(var(--spacing) * 3.5)\r
  }\r
  .w-4 {\r
    width:calc(var(--spacing) * 4)\r
  }\r
  .w-5 {\r
    width:calc(var(--spacing) * 5)\r
  }\r
  .w-6 {\r
    width:calc(var(--spacing) * 6)\r
  }\r
  .w-8 {\r
    width:calc(var(--spacing) * 8)\r
  }\r
  .w-36 {\r
    width:calc(var(--spacing) * 36)\r
  }\r
  .w-40 {\r
    width:calc(var(--spacing) * 40)\r
  }\r
  .w-56 {\r
    width:calc(var(--spacing) * 56)\r
  }\r
  .w-64 {\r
    width:calc(var(--spacing) * 64)\r
  }\r
  .w-full {\r
    width:100%\r
  }\r
  .max-w-2xl {\r
    max-width:var(--container-2xl)\r
  }\r
  .max-w-5xl {\r
    max-width:var(--container-5xl)\r
  }\r
  .max-w-\\[85\\%\\] {\r
    max-width:85%\r
  }\r
  .max-w-lg {\r
    max-width:var(--container-lg)\r
  }\r
  .max-w-sm {\r
    max-width:var(--container-sm)\r
  }\r
  .min-w-0 {\r
    min-width:0\r
  }\r
  .flex-1 {\r
    flex:1\r
  }\r
  .flex-shrink-0,.shrink-0 {\r
    flex-shrink:0\r
  }\r
  .-translate-x-1\\/2 {\r
    --tw-translate-x:calc(calc(1 / 2 * 100%) * -1);\r
    translate:var(--tw-translate-x) var(--tw-translate-y)\r
  }\r
  .-translate-x-full {\r
    --tw-translate-x:-100%;\r
    translate:var(--tw-translate-x) var(--tw-translate-y)\r
  }\r
  .translate-x-0 {\r
    --tw-translate-x:0px;\r
    translate:var(--tw-translate-x) var(--tw-translate-y)\r
  }\r
  .-translate-y-1\\/2 {\r
    --tw-translate-y:calc(calc(1 / 2 * 100%) * -1);\r
    translate:var(--tw-translate-x) var(--tw-translate-y)\r
  }\r
  .translate-y-0 {\r
    --tw-translate-y:0px;\r
    translate:var(--tw-translate-x) var(--tw-translate-y)\r
  }\r
  .translate-y-2 {\r
    --tw-translate-y:calc(var(--spacing) * 2);\r
    translate:var(--tw-translate-x) var(--tw-translate-y)\r
  }\r
  .translate-y-3 {\r
    --tw-translate-y:calc(var(--spacing) * 3);\r
    translate:var(--tw-translate-x) var(--tw-translate-y)\r
  }\r
  .translate-y-4 {\r
    --tw-translate-y:calc(var(--spacing) * 4);\r
    translate:var(--tw-translate-x) var(--tw-translate-y)\r
  }\r
  .scale-95 {\r
    --tw-scale-x:95%;\r
    --tw-scale-y:95%;\r
    --tw-scale-z:95%;\r
    scale:var(--tw-scale-x) var(--tw-scale-y)\r
  }\r
  .scale-100 {\r
    --tw-scale-x:100%;\r
    --tw-scale-y:100%;\r
    --tw-scale-z:100%;\r
    scale:var(--tw-scale-x) var(--tw-scale-y)\r
  }\r
  .transform {\r
    transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)\r
  }\r
  .animate-bounce {\r
    animation:var(--animate-bounce)\r
  }\r
  .animate-ping {\r
    animation:var(--animate-ping)\r
  }\r
  .animate-pulse {\r
    animation:var(--animate-pulse)\r
  }\r
  .cursor-pointer {\r
    cursor:pointer\r
  }\r
  .resize-none {\r
    resize:none\r
  }\r
  .grid-cols-5 {\r
    grid-template-columns:repeat(5,minmax(0,1fr))\r
  }\r
  .flex-col {\r
    flex-direction:column\r
  }\r
  .flex-row {\r
    flex-direction:row\r
  }\r
  .flex-row-reverse {\r
    flex-direction:row-reverse\r
  }\r
  .items-center {\r
    align-items:center\r
  }\r
  .items-end {\r
    align-items:flex-end\r
  }\r
  .items-start {\r
    align-items:flex-start\r
  }\r
  .justify-between {\r
    justify-content:space-between\r
  }\r
  .justify-center {\r
    justify-content:center\r
  }\r
  .justify-end {\r
    justify-content:flex-end\r
  }\r
  .justify-start {\r
    justify-content:flex-start\r
  }\r
  .gap-1 {\r
    gap:var(--spacing)\r
  }\r
  .gap-1\\.5 {\r
    gap:calc(var(--spacing) * 1.5)\r
  }\r
  .gap-2 {\r
    gap:calc(var(--spacing) * 2)\r
  }\r
  .gap-3 {\r
    gap:calc(var(--spacing) * 3)\r
  }\r
  .gap-6 {\r
    gap:calc(var(--spacing) * 6)\r
  }\r
  :where(.space-y-1>:not(:last-child)) {\r
    --tw-space-y-reverse:0;\r
    margin-block-start:calc(var(--spacing) * var(--tw-space-y-reverse));\r
    margin-block-end:calc(var(--spacing) * calc(1 - var(--tw-space-y-reverse)))\r
  }\r
  :where(.space-y-3>:not(:last-child)) {\r
    --tw-space-y-reverse:0;\r
    margin-block-start:calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));\r
    margin-block-end:calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)))\r
  }\r
  :where(.space-y-4>:not(:last-child)) {\r
    --tw-space-y-reverse:0;\r
    margin-block-start:calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));\r
    margin-block-end:calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)))\r
  }\r
  :where(.space-y-6>:not(:last-child)) {\r
    --tw-space-y-reverse:0;\r
    margin-block-start:calc(calc(var(--spacing) * 6) * var(--tw-space-y-reverse));\r
    margin-block-end:calc(calc(var(--spacing) * 6) * calc(1 - var(--tw-space-y-reverse)))\r
  }\r
  .truncate {\r
    text-overflow:ellipsis;\r
    white-space:nowrap;\r
    overflow:hidden\r
  }\r
  .overflow-hidden {\r
    overflow:hidden\r
  }\r
  .overflow-y-auto {\r
    overflow-y:auto\r
  }\r
  .rounded {\r
    border-radius:.25rem\r
  }\r
  .rounded-2xl {\r
    border-radius:var(--radius-2xl)\r
  }\r
  .rounded-full {\r
    border-radius:3.40282e38px\r
  }\r
  .rounded-lg {\r
    border-radius:var(--radius-lg)\r
  }\r
  .rounded-md {\r
    border-radius:var(--radius-md)\r
  }\r
  .rounded-xl {\r
    border-radius:var(--radius-xl)\r
  }\r
  .rounded-r-xl {\r
    border-top-right-radius:var(--radius-xl);\r
    border-bottom-right-radius:var(--radius-xl)\r
  }\r
  .rounded-br-none {\r
    border-bottom-right-radius:0\r
  }\r
  .rounded-bl-none {\r
    border-bottom-left-radius:0\r
  }\r
  .border {\r
    border-style:var(--tw-border-style);\r
    border-width:1px\r
  }\r
  .border-t {\r
    border-top-style:var(--tw-border-style);\r
    border-top-width:1px\r
  }\r
  .border-r {\r
    border-right-style:var(--tw-border-style);\r
    border-right-width:1px\r
  }\r
  .border-b {\r
    border-bottom-style:var(--tw-border-style);\r
    border-bottom-width:1px\r
  }\r
  .border-l-2 {\r
    border-left-style:var(--tw-border-style);\r
    border-left-width:2px\r
  }\r
  .border-none {\r
    --tw-border-style:none;\r
    border-style:none\r
  }\r
  .border-indigo-500 {\r
    border-color:var(--color-indigo-500)\r
  }\r
  .border-slate-100 {\r
    border-color:var(--color-slate-100)\r
  }\r
  .border-slate-200 {\r
    border-color:var(--color-slate-200)\r
  }\r
  .border-slate-200\\/50 {\r
    border-color:#e2e8f080\r
  }\r
  @supports (color:color-mix(in lab, red, red)) {\r
    .border-slate-200\\/50 {\r
      border-color:color-mix(in oklab, var(--color-slate-200) 50%, transparent)\r
    }\r
\r
  }\r
  .border-slate-200\\/60 {\r
    border-color:#e2e8f099\r
  }\r
  @supports (color:color-mix(in lab, red, red)) {\r
    .border-slate-200\\/60 {\r
      border-color:color-mix(in oklab, var(--color-slate-200) 60%, transparent)\r
    }\r
\r
  }\r
  .border-transparent {\r
    border-color:#0000\r
  }\r
  .bg-amber-400 {\r
    background-color:var(--color-amber-400)\r
  }\r
  .bg-emerald-500 {\r
    background-color:var(--color-emerald-500)\r
  }\r
  .bg-green-400 {\r
    background-color:var(--color-green-400)\r
  }\r
  .bg-indigo-50 {\r
    background-color:var(--color-indigo-50)\r
  }\r
  .bg-indigo-400 {\r
    background-color:var(--color-indigo-400)\r
  }\r
  .bg-indigo-500 {\r
    background-color:var(--color-indigo-500)\r
  }\r
  .bg-indigo-500\\/10 {\r
    background-color:#625fff1a\r
  }\r
  @supports (color:color-mix(in lab, red, red)) {\r
    .bg-indigo-500\\/10 {\r
      background-color:color-mix(in oklab, var(--color-indigo-500) 10%, transparent)\r
    }\r
\r
  }\r
  .bg-red-400 {\r
    background-color:var(--color-red-400)\r
  }\r
  .bg-rose-500 {\r
    background-color:var(--color-rose-500)\r
  }\r
  .bg-slate-50 {\r
    background-color:var(--color-slate-50)\r
  }\r
  .bg-slate-100 {\r
    background-color:var(--color-slate-100)\r
  }\r
  .bg-slate-950\\/40 {\r
    background-color:#02061866\r
  }\r
  @supports (color:color-mix(in lab, red, red)) {\r
    .bg-slate-950\\/40 {\r
      background-color:color-mix(in oklab, var(--color-slate-950) 40%, transparent)\r
    }\r
\r
  }\r
  .bg-transparent {\r
    background-color:#0000\r
  }\r
  .bg-white {\r
    background-color:var(--color-white)\r
  }\r
  .bg-white\\/80 {\r
    background-color:#fffc\r
  }\r
  @supports (color:color-mix(in lab, red, red)) {\r
    .bg-white\\/80 {\r
      background-color:color-mix(in oklab, var(--color-white) 80%, transparent)\r
    }\r
\r
  }\r
  .bg-gradient-to-r {\r
    --tw-gradient-position:to right in oklab;\r
    background-image:linear-gradient(var(--tw-gradient-stops))\r
  }\r
  .bg-gradient-to-tr {\r
    --tw-gradient-position:to top right in oklab;\r
    background-image:linear-gradient(var(--tw-gradient-stops))\r
  }\r
  .from-indigo-500 {\r
    --tw-gradient-from:var(--color-indigo-500);\r
    --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))\r
  }\r
  .from-indigo-500\\/5 {\r
    --tw-gradient-from:#625fff0d\r
  }\r
  @supports (color:color-mix(in lab, red, red)) {\r
    .from-indigo-500\\/5 {\r
      --tw-gradient-from:color-mix(in oklab, var(--color-indigo-500) 5%, transparent)\r
    }\r
\r
  }\r
  .from-indigo-500\\/5 {\r
    --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))\r
  }\r
  .from-indigo-600 {\r
    --tw-gradient-from:var(--color-indigo-600);\r
    --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))\r
  }\r
  .via-transparent {\r
    --tw-gradient-via:transparent;\r
    --tw-gradient-via-stops:var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\r
    --tw-gradient-stops:var(--tw-gradient-via-stops)\r
  }\r
  .to-transparent {\r
    --tw-gradient-to:transparent;\r
    --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))\r
  }\r
  .to-violet-500 {\r
    --tw-gradient-to:var(--color-violet-500);\r
    --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))\r
  }\r
  .to-violet-600 {\r
    --tw-gradient-to:var(--color-violet-600);\r
    --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))\r
  }\r
  .bg-clip-text {\r
    -webkit-background-clip:text;\r
    background-clip:text\r
  }\r
  .object-cover {\r
    object-fit:cover\r
  }\r
  .p-0\\.5 {\r
    padding:calc(var(--spacing) * .5)\r
  }\r
  .p-1 {\r
    padding:var(--spacing)\r
  }\r
  .p-1\\.5 {\r
    padding:calc(var(--spacing) * 1.5)\r
  }\r
  .p-2 {\r
    padding:calc(var(--spacing) * 2)\r
  }\r
  .p-3 {\r
    padding:calc(var(--spacing) * 3)\r
  }\r
  .p-4 {\r
    padding:calc(var(--spacing) * 4)\r
  }\r
  .p-6 {\r
    padding:calc(var(--spacing) * 6)\r
  }\r
  .p-8 {\r
    padding:calc(var(--spacing) * 8)\r
  }\r
  .p-16 {\r
    padding:calc(var(--spacing) * 16)\r
  }\r
  .p-24 {\r
    padding:calc(var(--spacing) * 24)\r
  }\r
  .px-2 {\r
    padding-inline:calc(var(--spacing) * 2)\r
  }\r
  .px-2\\.5 {\r
    padding-inline:calc(var(--spacing) * 2.5)\r
  }\r
  .px-3 {\r
    padding-inline:calc(var(--spacing) * 3)\r
  }\r
  .px-4 {\r
    padding-inline:calc(var(--spacing) * 4)\r
  }\r
  .px-6 {\r
    padding-inline:calc(var(--spacing) * 6)\r
  }\r
  .py-1 {\r
    padding-block:var(--spacing)\r
  }\r
  .py-2 {\r
    padding-block:calc(var(--spacing) * 2)\r
  }\r
  .py-2\\.5 {\r
    padding-block:calc(var(--spacing) * 2.5)\r
  }\r
  .py-3 {\r
    padding-block:calc(var(--spacing) * 3)\r
  }\r
  .pr-\\[80px\\] {\r
    padding-right:80px\r
  }\r
  .pr-\\[100px\\] {\r
    padding-right:100px\r
  }\r
  .pb-1 {\r
    padding-bottom:var(--spacing)\r
  }\r
  .pb-2 {\r
    padding-bottom:calc(var(--spacing) * 2)\r
  }\r
  .pb-4 {\r
    padding-bottom:calc(var(--spacing) * 4)\r
  }\r
  .text-center {\r
    text-align:center\r
  }\r
  .text-left {\r
    text-align:left\r
  }\r
  .text-right {\r
    text-align:right\r
  }\r
  .font-inter {\r
    font-family:var(--font-inter)\r
  }\r
  .font-mono {\r
    font-family:var(--font-mono)\r
  }\r
  .text-2xl {\r
    font-size:var(--text-2xl);\r
    line-height:var(--tw-leading,var(--text-2xl--line-height))\r
  }\r
  .text-3xl {\r
    font-size:var(--text-3xl);\r
    line-height:var(--tw-leading,var(--text-3xl--line-height))\r
  }\r
  .text-base {\r
    font-size:var(--text-base);\r
    line-height:var(--tw-leading,var(--text-base--line-height))\r
  }\r
  .text-lg {\r
    font-size:var(--text-lg);\r
    line-height:var(--tw-leading,var(--text-lg--line-height))\r
  }\r
  .text-sm {\r
    font-size:var(--text-sm);\r
    line-height:var(--tw-leading,var(--text-sm--line-height))\r
  }\r
  .text-xs {\r
    font-size:var(--text-xs);\r
    line-height:var(--tw-leading,var(--text-xs--line-height))\r
  }\r
  .text-\\[10px\\] {\r
    font-size:10px\r
  }\r
  .text-\\[11px\\] {\r
    font-size:11px\r
  }\r
  .leading-none {\r
    --tw-leading:1;\r
    line-height:1\r
  }\r
  .leading-relaxed {\r
    --tw-leading:var(--leading-relaxed);\r
    line-height:var(--leading-relaxed)\r
  }\r
  .leading-tight {\r
    --tw-leading:var(--leading-tight);\r
    line-height:var(--leading-tight)\r
  }\r
  .font-black {\r
    --tw-font-weight:var(--font-weight-black);\r
    font-weight:var(--font-weight-black)\r
  }\r
  .font-bold {\r
    --tw-font-weight:var(--font-weight-bold);\r
    font-weight:var(--font-weight-bold)\r
  }\r
  .font-extrabold {\r
    --tw-font-weight:var(--font-weight-extrabold);\r
    font-weight:var(--font-weight-extrabold)\r
  }\r
  .font-medium {\r
    --tw-font-weight:var(--font-weight-medium);\r
    font-weight:var(--font-weight-medium)\r
  }\r
  .font-semibold {\r
    --tw-font-weight:var(--font-weight-semibold);\r
    font-weight:var(--font-weight-semibold)\r
  }\r
  .tracking-wider {\r
    --tw-tracking:var(--tracking-wider);\r
    letter-spacing:var(--tracking-wider)\r
  }\r
  .tracking-widest {\r
    --tw-tracking:var(--tracking-widest);\r
    letter-spacing:var(--tracking-widest)\r
  }\r
  .break-words {\r
    overflow-wrap:break-word\r
  }\r
  .whitespace-normal {\r
    white-space:normal\r
  }\r
  .text-amber-500 {\r
    color:var(--color-amber-500)\r
  }\r
  .text-emerald-500 {\r
    color:var(--color-emerald-500)\r
  }\r
  .text-indigo-400 {\r
    color:var(--color-indigo-400)\r
  }\r
  .text-indigo-500 {\r
    color:var(--color-indigo-500)\r
  }\r
  .text-indigo-600 {\r
    color:var(--color-indigo-600)\r
  }\r
  .text-rose-500 {\r
    color:var(--color-rose-500)\r
  }\r
  .text-slate-400 {\r
    color:var(--color-slate-400)\r
  }\r
  .text-slate-500 {\r
    color:var(--color-slate-500)\r
  }\r
  .text-slate-600 {\r
    color:var(--color-slate-600)\r
  }\r
  .text-slate-800 {\r
    color:var(--color-slate-800)\r
  }\r
  .text-transparent {\r
    color:#0000\r
  }\r
  .text-white {\r
    color:var(--color-white)\r
  }\r
  .uppercase {\r
    text-transform:uppercase\r
  }\r
  .antialiased {\r
    -webkit-font-smoothing:antialiased;\r
    -moz-osx-font-smoothing:grayscale\r
  }\r
  .opacity-0 {\r
    opacity:0\r
  }\r
  .opacity-60 {\r
    opacity:.6\r
  }\r
  .opacity-75 {\r
    opacity:.75\r
  }\r
  .opacity-100 {\r
    opacity:1\r
  }\r
  .shadow {\r
    --tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);\r
    box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)\r
  }\r
  .shadow-2xl {\r
    --tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);\r
    box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)\r
  }\r
  .shadow-lg {\r
    --tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);\r
    box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)\r
  }\r
  .shadow-md {\r
    --tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);\r
    box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)\r
  }\r
  .shadow-sm {\r
    --tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);\r
    box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)\r
  }\r
  .shadow-xl {\r
    --tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);\r
    box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)\r
  }\r
  .shadow-xs {\r
    --tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);\r
    box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)\r
  }\r
  .shadow-indigo-500\\/20 {\r
    --tw-shadow-color:#625fff33\r
  }\r
  @supports (color:color-mix(in lab, red, red)) {\r
    .shadow-indigo-500\\/20 {\r
      --tw-shadow-color:color-mix(in oklab, color-mix(in oklab, var(--color-indigo-500) 20%, transparent) var(--tw-shadow-alpha), transparent)\r
    }\r
\r
  }\r
  .blur {\r
    --tw-blur:blur(8px);\r
    filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)\r
  }\r
  .filter {\r
    filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)\r
  }\r
  .backdrop-blur-md {\r
    --tw-backdrop-blur:blur(var(--blur-md));\r
    -webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\r
    backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)\r
  }\r
  .backdrop-blur-xs {\r
    --tw-backdrop-blur:blur(var(--blur-xs));\r
    -webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\r
    backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)\r
  }\r
  .transition {\r
    transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;\r
    transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));\r
    transition-duration:var(--tw-duration,var(--default-transition-duration))\r
  }\r
  .transition-all {\r
    transition-property:all;\r
    transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));\r
    transition-duration:var(--tw-duration,var(--default-transition-duration))\r
  }\r
  .transition-colors {\r
    transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;\r
    transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));\r
    transition-duration:var(--tw-duration,var(--default-transition-duration))\r
  }\r
  .transition-opacity {\r
    transition-property:opacity;\r
    transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));\r
    transition-duration:var(--tw-duration,var(--default-transition-duration))\r
  }\r
  .delay-100 {\r
    transition-delay:.1s\r
  }\r
  .delay-300 {\r
    transition-delay:.3s\r
  }\r
  .duration-150 {\r
    --tw-duration:.15s;\r
    transition-duration:.15s\r
  }\r
  .duration-200 {\r
    --tw-duration:.2s;\r
    transition-duration:.2s\r
  }\r
  .duration-250 {\r
    --tw-duration:.25s;\r
    transition-duration:.25s\r
  }\r
  .duration-300 {\r
    --tw-duration:.3s;\r
    transition-duration:.3s\r
  }\r
  .duration-500 {\r
    --tw-duration:.5s;\r
    transition-duration:.5s\r
  }\r
  .ease-in {\r
    --tw-ease:var(--ease-in);\r
    transition-timing-function:var(--ease-in)\r
  }\r
  .ease-in-out {\r
    --tw-ease:var(--ease-in-out);\r
    transition-timing-function:var(--ease-in-out)\r
  }\r
  .ease-out {\r
    --tw-ease:var(--ease-out);\r
    transition-timing-function:var(--ease-out)\r
  }\r
  .outline-none {\r
    --tw-outline-style:none;\r
    outline-style:none\r
  }\r
  .select-none {\r
    -webkit-user-select:none;\r
    user-select:none\r
  }\r
  @media (hover:hover) {\r
    .hover\\:scale-105:hover {\r
      --tw-scale-x:105%;\r
      --tw-scale-y:105%;\r
      --tw-scale-z:105%;\r
      scale:var(--tw-scale-x) var(--tw-scale-y)\r
    }\r
    .hover\\:bg-slate-50:hover {\r
      background-color:var(--color-slate-50)\r
    }\r
    .hover\\:bg-slate-100:hover {\r
      background-color:var(--color-slate-100)\r
    }\r
    .hover\\:text-indigo-600:hover {\r
      color:var(--color-indigo-600)\r
    }\r
    .hover\\:opacity-70:hover {\r
      opacity:.7\r
    }\r
    .hover\\:opacity-80:hover {\r
      opacity:.8\r
    }\r
    .hover\\:opacity-90:hover {\r
      opacity:.9\r
    }\r
\r
  }\r
  .focus\\:outline-none:focus {\r
    --tw-outline-style:none;\r
    outline-style:none\r
  }\r
  .active\\:scale-95:active {\r
    --tw-scale-x:95%;\r
    --tw-scale-y:95%;\r
    --tw-scale-z:95%;\r
    scale:var(--tw-scale-x) var(--tw-scale-y)\r
  }\r
  @media (min-width:40rem) {\r
    .sm\\:flex {\r
      display:flex\r
    }\r
\r
  }\r
  @media (min-width:48rem) {\r
    .md\\:sticky {\r
      position:sticky\r
    }\r
    .md\\:z-20 {\r
      z-index:20\r
    }\r
    .md\\:flex {\r
      display:flex\r
    }\r
    .md\\:hidden {\r
      display:none\r
    }\r
    .md\\:w-20 {\r
      width:calc(var(--spacing) * 20)\r
    }\r
    .md\\:w-64 {\r
      width:calc(var(--spacing) * 64)\r
    }\r
    .md\\:translate-x-0 {\r
      --tw-translate-x:0px;\r
      translate:var(--tw-translate-x) var(--tw-translate-y)\r
    }\r
    .md\\:justify-center {\r
      justify-content:center\r
    }\r
    .md\\:gap-5 {\r
      gap:calc(var(--spacing) * 5)\r
    }\r
    .md\\:p-8 {\r
      padding:calc(var(--spacing) * 8)\r
    }\r
    .md\\:p-10 {\r
      padding:calc(var(--spacing) * 10)\r
    }\r
    .md\\:px-6 {\r
      padding-inline:calc(var(--spacing) * 6)\r
    }\r
    .md\\:shadow-none {\r
      --tw-shadow:0 0 #0000;\r
      box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)\r
    }\r
\r
  }\r
  .dark\\:border-slate-700:where(.dark,.dark *) {\r
    border-color:var(--color-slate-700)\r
  }\r
  .dark\\:border-slate-800:where(.dark,.dark *) {\r
    border-color:var(--color-slate-800)\r
  }\r
  .dark\\:border-slate-800\\/40:where(.dark,.dark *) {\r
    border-color:#1d293d66\r
  }\r
  @supports (color:color-mix(in lab, red, red)) {\r
    .dark\\:border-slate-800\\/40:where(.dark,.dark *) {\r
      border-color:color-mix(in oklab, var(--color-slate-800) 40%, transparent)\r
    }\r
\r
  }\r
  .dark\\:border-slate-800\\/60:where(.dark,.dark *) {\r
    border-color:#1d293d99\r
  }\r
  @supports (color:color-mix(in lab, red, red)) {\r
    .dark\\:border-slate-800\\/60:where(.dark,.dark *) {\r
      border-color:color-mix(in oklab, var(--color-slate-800) 60%, transparent)\r
    }\r
\r
  }\r
  .dark\\:border-slate-800\\/80:where(.dark,.dark *) {\r
    border-color:#1d293dcc\r
  }\r
  @supports (color:color-mix(in lab, red, red)) {\r
    .dark\\:border-slate-800\\/80:where(.dark,.dark *) {\r
      border-color:color-mix(in oklab, var(--color-slate-800) 80%, transparent)\r
    }\r
\r
  }\r
  .dark\\:border-slate-900:where(.dark,.dark *) {\r
    border-color:var(--color-slate-900)\r
  }\r
  .dark\\:border-slate-900\\/60:where(.dark,.dark *) {\r
    border-color:#0f172b99\r
  }\r
  @supports (color:color-mix(in lab, red, red)) {\r
    .dark\\:border-slate-900\\/60:where(.dark,.dark *) {\r
      border-color:color-mix(in oklab, var(--color-slate-900) 60%, transparent)\r
    }\r
\r
  }\r
  .dark\\:bg-indigo-950\\/40:where(.dark,.dark *) {\r
    background-color:#1e1a4d66\r
  }\r
  @supports (color:color-mix(in lab, red, red)) {\r
    .dark\\:bg-indigo-950\\/40:where(.dark,.dark *) {\r
      background-color:color-mix(in oklab, var(--color-indigo-950) 40%, transparent)\r
    }\r
\r
  }\r
  .dark\\:bg-neutral-800:where(.dark,.dark *) {\r
    background-color:var(--color-neutral-800)\r
  }\r
  .dark\\:bg-slate-800:where(.dark,.dark *) {\r
    background-color:var(--color-slate-800)\r
  }\r
  .dark\\:bg-slate-900:where(.dark,.dark *) {\r
    background-color:var(--color-slate-900)\r
  }\r
  .dark\\:bg-slate-900\\/60:where(.dark,.dark *) {\r
    background-color:#0f172b99\r
  }\r
  @supports (color:color-mix(in lab, red, red)) {\r
    .dark\\:bg-slate-900\\/60:where(.dark,.dark *) {\r
      background-color:color-mix(in oklab, var(--color-slate-900) 60%, transparent)\r
    }\r
\r
  }\r
  .dark\\:bg-slate-950:where(.dark,.dark *) {\r
    background-color:var(--color-slate-950)\r
  }\r
  .dark\\:bg-slate-950\\/80:where(.dark,.dark *) {\r
    background-color:#020618cc\r
  }\r
  @supports (color:color-mix(in lab, red, red)) {\r
    .dark\\:bg-slate-950\\/80:where(.dark,.dark *) {\r
      background-color:color-mix(in oklab, var(--color-slate-950) 80%, transparent)\r
    }\r
\r
  }\r
  .dark\\:from-indigo-400:where(.dark,.dark *) {\r
    --tw-gradient-from:var(--color-indigo-400);\r
    --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))\r
  }\r
  .dark\\:to-violet-400:where(.dark,.dark *) {\r
    --tw-gradient-to:var(--color-violet-400);\r
    --tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))\r
  }\r
  .dark\\:text-indigo-400:where(.dark,.dark *) {\r
    color:var(--color-indigo-400)\r
  }\r
  .dark\\:text-slate-100:where(.dark,.dark *) {\r
    color:var(--color-slate-100)\r
  }\r
  .dark\\:text-slate-200:where(.dark,.dark *) {\r
    color:var(--color-slate-200)\r
  }\r
  .dark\\:text-slate-400:where(.dark,.dark *) {\r
    color:var(--color-slate-400)\r
  }\r
  .dark\\:text-slate-500:where(.dark,.dark *) {\r
    color:var(--color-slate-500)\r
  }\r
  @media (hover:hover) {\r
    .dark\\:hover\\:bg-slate-700:where(.dark,.dark *):hover {\r
      background-color:var(--color-slate-700)\r
    }\r
    .dark\\:hover\\:bg-slate-900:where(.dark,.dark *):hover {\r
      background-color:var(--color-slate-900)\r
    }\r
    .dark\\:hover\\:bg-slate-900\\/40:where(.dark,.dark *):hover {\r
      background-color:#0f172b66\r
    }\r
    @supports (color:color-mix(in lab, red, red)) {\r
      .dark\\:hover\\:bg-slate-900\\/40:where(.dark,.dark *):hover {\r
        background-color:color-mix(in oklab, var(--color-slate-900) 40%, transparent)\r
      }\r
\r
    }\r
    .dark\\:hover\\:text-indigo-400:where(.dark,.dark *):hover {\r
      color:var(--color-indigo-400)\r
    }\r
\r
  }\r
\r
}\r
:root {\r
  --font-inter:var(--font-sans);\r
  --font-outfit:var(--font-sans)\r
}\r
.htmx-indicator {\r
  opacity:0;\r
  transition:opacity .2s ease-in-out;\r
  display:none\r
}\r
.htmx-request .htmx-indicator,.htmx-request.htmx-indicator {\r
  opacity:1;\r
  display:inline-block\r
}\r
.fade-me-in.htmx-added {\r
  opacity:0\r
}\r
.fade-me-in {\r
  opacity:1;\r
  transition:opacity .3s ease-out\r
}\r
html {\r
  background-color:#fff\r
}\r
html.dark {\r
  background-color:#030712\r
}\r
::-webkit-scrollbar {\r
  width:5px;\r
  height:5px\r
}\r
::-webkit-scrollbar-track {\r
  background:0 0\r
}\r
::-webkit-scrollbar-thumb {\r
  background:#64748b33;\r
  border-radius:9999px\r
}\r
.dark ::-webkit-scrollbar-thumb {\r
  background:#94a3b826\r
}\r
::-webkit-scrollbar-thumb:hover {\r
  background:#64748b59\r
}\r
.sidebar-transition {\r
  transition:width .3s cubic-bezier(.4,0,.2,1),transform .3s cubic-bezier(.4,0,.2,1),padding .3s cubic-bezier(.4,0,.2,1)\r
}\r
.content-transition {\r
  transition:margin-left .3s cubic-bezier(.4,0,.2,1),padding .3s cubic-bezier(.4,0,.2,1)\r
}\r
.accent-glow {\r
  filter:blur(50px);\r
  pointer-events:none;\r
  z-index:0;\r
  background:radial-gradient(circle,#6366f114 0%,#6366f100 70%);\r
  width:400px;\r
  height:400px;\r
  position:absolute\r
}\r
.accent-glow-emerald {\r
  filter:blur(50px);\r
  pointer-events:none;\r
  z-index:0;\r
  background:radial-gradient(circle,#10b9810f 0%,#10b98100 70%);\r
  width:350px;\r
  height:350px;\r
  position:absolute\r
}\r
.tooltip {\r
  position:relative\r
}\r
.tooltip:after {\r
  content:attr(data-tooltip);\r
  color:#fff;\r
  opacity:0;\r
  pointer-events:none;\r
  white-space:nowrap;\r
  z-index:50;\r
  background-color:#1e293b;\r
  border-radius:8px;\r
  padding:6px 10px;\r
  font-size:.75rem;\r
  font-weight:500;\r
  transition:opacity .15s,transform .15s;\r
  position:absolute;\r
  top:50%;\r
  left:calc(100% + 12px);\r
  transform:translateY(-50%)scale(.95);\r
  box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -2px #0000001a\r
}\r
.tooltip:hover:after {\r
  opacity:1;\r
  transform:translateY(-50%)scale(1)\r
}\r
.dark .tooltip:after {\r
  color:#0f172a;\r
  background-color:#f8fafc\r
}\r
.chat-bar-widget {\r
  color:#fff;\r
  cursor:pointer;\r
  width:255px;\r
  height:40px;\r
  font-family:var(--font-inter);\r
  -webkit-user-select:none;\r
  user-select:none;\r
  background:#007bff;\r
  border-radius:20px;\r
  justify-content:space-between;\r
  align-items:center;\r
  padding:0 14px;\r
  font-size:14px;\r
  font-weight:600;\r
  text-decoration:none;\r
  transition:all .25s cubic-bezier(.4,0,.2,1);\r
  display:flex;\r
  box-shadow:0 4px 14px #007bff59\r
}\r
.chat-bar-widget:hover {\r
  transform:translateY(-2px);\r
  box-shadow:0 6px 18px #007bff73\r
}\r
.chat-bar-widget:active {\r
  transform:translateY(0)\r
}\r
@property --tw-translate-x {\r
  syntax:"*";\r
  inherits:false;\r
  initial-value:0\r
}\r
@property --tw-translate-y {\r
  syntax:"*";\r
  inherits:false;\r
  initial-value:0\r
}\r
@property --tw-translate-z {\r
  syntax:"*";\r
  inherits:false;\r
  initial-value:0\r
}\r
@property --tw-scale-x {\r
  syntax:"*";\r
  inherits:false;\r
  initial-value:1\r
}\r
@property --tw-scale-y {\r
  syntax:"*";\r
  inherits:false;\r
  initial-value:1\r
}\r
@property --tw-scale-z {\r
  syntax:"*";\r
  inherits:false;\r
  initial-value:1\r
}\r
@property --tw-rotate-x {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-rotate-y {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-rotate-z {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-skew-x {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-skew-y {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-space-y-reverse {\r
  syntax:"*";\r
  inherits:false;\r
  initial-value:0\r
}\r
@property --tw-border-style {\r
  syntax:"*";\r
  inherits:false;\r
  initial-value:solid\r
}\r
@property --tw-gradient-position {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-gradient-from {\r
  syntax:"<color>";\r
  inherits:false;\r
  initial-value:#0000\r
}\r
@property --tw-gradient-via {\r
  syntax:"<color>";\r
  inherits:false;\r
  initial-value:#0000\r
}\r
@property --tw-gradient-to {\r
  syntax:"<color>";\r
  inherits:false;\r
  initial-value:#0000\r
}\r
@property --tw-gradient-stops {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-gradient-via-stops {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-gradient-from-position {\r
  syntax:"<length-percentage>";\r
  inherits:false;\r
  initial-value:0%\r
}\r
@property --tw-gradient-via-position {\r
  syntax:"<length-percentage>";\r
  inherits:false;\r
  initial-value:50%\r
}\r
@property --tw-gradient-to-position {\r
  syntax:"<length-percentage>";\r
  inherits:false;\r
  initial-value:100%\r
}\r
@property --tw-leading {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-font-weight {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-tracking {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-shadow {\r
  syntax:"*";\r
  inherits:false;\r
  initial-value:0 0 #0000\r
}\r
@property --tw-shadow-color {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-shadow-alpha {\r
  syntax:"<percentage>";\r
  inherits:false;\r
  initial-value:100%\r
}\r
@property --tw-inset-shadow {\r
  syntax:"*";\r
  inherits:false;\r
  initial-value:0 0 #0000\r
}\r
@property --tw-inset-shadow-color {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-inset-shadow-alpha {\r
  syntax:"<percentage>";\r
  inherits:false;\r
  initial-value:100%\r
}\r
@property --tw-ring-color {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-ring-shadow {\r
  syntax:"*";\r
  inherits:false;\r
  initial-value:0 0 #0000\r
}\r
@property --tw-inset-ring-color {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-inset-ring-shadow {\r
  syntax:"*";\r
  inherits:false;\r
  initial-value:0 0 #0000\r
}\r
@property --tw-ring-inset {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-ring-offset-width {\r
  syntax:"<length>";\r
  inherits:false;\r
  initial-value:0\r
}\r
@property --tw-ring-offset-color {\r
  syntax:"*";\r
  inherits:false;\r
  initial-value:#fff\r
}\r
@property --tw-ring-offset-shadow {\r
  syntax:"*";\r
  inherits:false;\r
  initial-value:0 0 #0000\r
}\r
@property --tw-blur {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-brightness {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-contrast {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-grayscale {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-hue-rotate {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-invert {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-opacity {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-saturate {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-sepia {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-drop-shadow {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-drop-shadow-color {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-drop-shadow-alpha {\r
  syntax:"<percentage>";\r
  inherits:false;\r
  initial-value:100%\r
}\r
@property --tw-drop-shadow-size {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-backdrop-blur {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-backdrop-brightness {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-backdrop-contrast {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-backdrop-grayscale {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-backdrop-hue-rotate {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-backdrop-invert {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-backdrop-opacity {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-backdrop-saturate {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-backdrop-sepia {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-duration {\r
  syntax:"*";\r
  inherits:false\r
}\r
@property --tw-ease {\r
  syntax:"*";\r
  inherits:false\r
}\r
@keyframes ping {\r
  75%,to {\r
    opacity:0;\r
    transform:scale(2)\r
  }\r
\r
}\r
@keyframes pulse {\r
  50% {\r
    opacity:.5\r
  }\r
\r
}\r
@keyframes bounce {\r
  0%,to {\r
    animation-timing-function:cubic-bezier(.8,0,1,1);\r
    transform:translateY(-25%)\r
  }\r
  50% {\r
    animation-timing-function:cubic-bezier(0,0,.2,1);\r
    transform:none\r
  }\r
\r
}\r
\r
\r
/* ==========================================================================\r
   Support Chat Panel Widget Component Styles\r
   ========================================================================== */\r
:root {\r
  --cw-accent: #0b5fff;\r
  --cw-accent-deep: color-mix(in srgb, var(--cw-accent) 74%, #101828);\r
  --cw-accent-soft: color-mix(in srgb, var(--cw-accent) 8%, #ffffff);\r
  --cw-accent-tint: color-mix(in srgb, var(--cw-accent) 14%, #ffffff);\r
  --cw-surface: #ffffff;\r
  --cw-bg: #f6f7fa;\r
  --cw-ink: #101828;\r
  --cw-muted: #667085;\r
  --cw-border: #e9ecf1;\r
  --cw-grad: linear-gradient(135deg, var(--cw-accent), var(--cw-accent-deep));\r
}\r
\r
.dark {\r
  --cw-surface: #1e293b;\r
  --cw-bg: #0f172a;\r
  --cw-ink: #f8fafc;\r
  --cw-muted: #94a3b8;\r
  --cw-border: #334155;\r
}\r
\r
[x-cloak] {\r
  display: none !important;\r
}\r
\r
.sr-only {\r
  position: absolute;\r
  width: 1px;\r
  height: 1px;\r
  overflow: hidden;\r
  clip: rect(0 0 0 0);\r
  white-space: nowrap;\r
}\r
\r
.panel {\r
  position: relative;\r
  display: flex;\r
  flex-direction: column;\r
  height: 100%;\r
  max-height: 100%;\r
  width: 100%;\r
  border-radius: inherit;\r
  overflow: hidden;\r
  box-sizing: border-box;\r
  --cw-accent-deep: color-mix(in srgb, var(--cw-accent) 74%, #101828);\r
  --cw-accent-soft: color-mix(in srgb, var(--cw-accent) 8%, #ffffff);\r
  --cw-accent-tint: color-mix(in srgb, var(--cw-accent) 14%, #ffffff);\r
  --cw-grad: linear-gradient(135deg, var(--cw-accent), var(--cw-accent-deep));\r
}\r
\r
.panel-header {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 12px;\r
  padding: 14px 16px;\r
  background: var(--cw-grad);\r
  color: #fff;\r
  flex: none;\r
}\r
\r
.header-brand {\r
  display: flex;\r
  align-items: center;\r
  gap: 11px;\r
  min-width: 0;\r
}\r
\r
.avatar {\r
  width: 38px;\r
  height: 38px;\r
  border-radius: 50%;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-weight: 600;\r
  flex: none;\r
  text-transform: uppercase;\r
}\r
\r
.brand-avatar {\r
  background: rgba(255, 255, 255, 0.18);\r
  border: 1px solid rgba(255, 255, 255, 0.3);\r
  font-size: 16px;\r
}\r
\r
.header-text {\r
  min-width: 0;\r
}\r
\r
.panel-title {\r
  font-weight: 600;\r
  font-size: 15px;\r
  line-height: 1.3;\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
.panel-status {\r
  display: flex;\r
  align-items: center;\r
  gap: 6px;\r
  font-size: 12px;\r
  opacity: 0.9;\r
  white-space: nowrap;\r
}\r
\r
.panel-status span:not(.dot) {\r
  min-width: 0;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
.dot {\r
  width: 7px;\r
  height: 7px;\r
  border-radius: 999px;\r
  background: rgba(255, 255, 255, 0.55);\r
  flex: none;\r
}\r
\r
.dot-active {\r
  background: #4ade80;\r
  box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.25);\r
}\r
\r
@media (prefers-reduced-motion: no-preference) {\r
  .dot-active {\r
    animation: cw-glow 2.2s ease-in-out infinite;\r
  }\r
}\r
\r
@keyframes cw-glow {\r
  0%, 100% {\r
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.3);\r
  }\r
  50% {\r
    box-shadow: 0 0 0 7px rgba(74, 222, 128, 0.08);\r
  }\r
}\r
\r
.icon-btn {\r
  background: none;\r
  border: 0;\r
  color: inherit;\r
  cursor: pointer;\r
  padding: 6px;\r
  border-radius: 8px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  opacity: 0.85;\r
  transition: background 0.15s ease, opacity 0.15s ease;\r
}\r
\r
.icon-btn:hover {\r
  background: rgba(255, 255, 255, 0.16);\r
  opacity: 1;\r
}\r
\r
.header-actions {\r
  display: flex;\r
  align-items: center;\r
  gap: 2px;\r
}\r
\r
.menu-pop,\r
.attach-pop,\r
.emoji-row {\r
  position: absolute;\r
  z-index: 30;\r
  background: var(--cw-surface);\r
  border: 1px solid var(--cw-border);\r
  border-radius: 12px;\r
  box-shadow: 0 10px 30px rgba(16, 24, 40, 0.16);\r
  padding: 6px;\r
}\r
\r
.menu-pop {\r
  top: 70px;\r
  right: 10px;\r
  min-width: 210px;\r
}\r
\r
.attach-pop {\r
  bottom: 96px;\r
  left: 12px;\r
  min-width: 190px;\r
}\r
\r
.emoji-row {\r
  bottom: 96px;\r
  right: 12px;\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 2px;\r
  max-width: 250px;\r
}\r
\r
.menu-item {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  width: 100%;\r
  border: 0;\r
  background: none;\r
  font: inherit;\r
  font-size: 13px;\r
  color: var(--cw-ink);\r
  padding: 9px 10px;\r
  border-radius: 8px;\r
  cursor: pointer;\r
  text-align: left;\r
}\r
\r
.menu-item:hover {\r
  background: var(--cw-accent-soft);\r
}\r
\r
.menu-item svg {\r
  color: var(--cw-muted);\r
  flex: none;\r
}\r
\r
.mini-switch {\r
  margin-left: auto;\r
  width: 30px;\r
  height: 17px;\r
  border-radius: 999px;\r
  background: var(--cw-border);\r
  position: relative;\r
  transition: background 0.15s ease;\r
  flex: none;\r
}\r
\r
.mini-switch i {\r
  position: absolute;\r
  top: 2px;\r
  left: 2px;\r
  width: 13px;\r
  height: 13px;\r
  border-radius: 50%;\r
  background: #fff;\r
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.25);\r
  transition: transform 0.15s ease;\r
}\r
\r
.mini-switch.on {\r
  background: var(--cw-accent);\r
}\r
\r
.mini-switch.on i {\r
  transform: translateX(13px);\r
}\r
\r
.emoji-btn {\r
  border: 0;\r
  background: none;\r
  font-size: 18px;\r
  line-height: 1;\r
  padding: 5px;\r
  border-radius: 8px;\r
  cursor: pointer;\r
}\r
\r
.emoji-btn:hover {\r
  background: var(--cw-accent-soft);\r
}\r
\r
.consent {\r
  display: flex;\r
  align-items: flex-start;\r
  gap: 8px;\r
  margin: 0 12px 6px;\r
  padding: 9px 12px;\r
  background: var(--cw-surface);\r
  border: 1px solid var(--cw-border);\r
  border-radius: 12px;\r
  box-shadow: 0 2px 8px rgba(16, 24, 40, 0.06);\r
}\r
\r
.consent p {\r
  margin: 0;\r
  font-size: 11.5px;\r
  line-height: 1.45;\r
  color: var(--cw-muted);\r
}\r
\r
.consent-x {\r
  border: 0;\r
  background: none;\r
  color: var(--cw-muted);\r
  font-size: 12px;\r
  cursor: pointer;\r
  padding: 0 2px;\r
  flex: none;\r
}\r
\r
.panel-body {\r
  flex: 1 1 0%;\r
  display: flex;\r
  flex-direction: column;\r
  min-height: 0;\r
  max-height: 100%;\r
  position: relative;\r
  background: var(--cw-bg);\r
  overflow: hidden;\r
}\r
\r
.muted {\r
  color: var(--cw-muted);\r
  font-size: 13px;\r
  line-height: 1.5;\r
}\r
\r
.center-note {\r
  flex: 1;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  color: var(--cw-muted);\r
  font-size: 13px;\r
}\r
\r
.spinner {\r
  width: 28px;\r
  height: 28px;\r
  border-radius: 50%;\r
  border: 3px solid var(--cw-border);\r
  border-top-color: var(--cw-accent);\r
  margin-bottom: 12px;\r
}\r
\r
@media (prefers-reduced-motion: no-preference) {\r
  .spinner {\r
    animation: cw-spin 0.8s linear infinite;\r
  }\r
}\r
\r
@keyframes cw-spin {\r
  to {\r
    transform: rotate(360deg);\r
  }\r
}\r
\r
.prechat {\r
  flex: 1;\r
  display: flex;\r
  flex-direction: column;\r
  padding: 18px 22px;\r
  overflow-y: auto;\r
}\r
\r
.prechat > :first-child {\r
  margin-top: auto;\r
}\r
\r
.prechat > :last-child {\r
  margin-bottom: auto;\r
}\r
\r
.prechat-avatar {\r
  width: 40px;\r
  height: 40px;\r
  font-size: 17px;\r
  background: var(--cw-grad);\r
  color: #fff;\r
  margin-bottom: 10px;\r
  box-shadow: 0 6px 16px color-mix(in srgb, var(--cw-accent) 35%, transparent);\r
  flex: none;\r
}\r
\r
.prechat h2 {\r
  margin: 0 0 4px;\r
  font-size: 19px;\r
  letter-spacing: -0.01em;\r
}\r
\r
.prechat .muted {\r
  margin: 0 0 4px;\r
}\r
\r
.prechat label {\r
  display: block;\r
  margin: 11px 0 5px;\r
  font-size: 11px;\r
  font-weight: 600;\r
  color: var(--cw-muted);\r
  text-transform: uppercase;\r
  letter-spacing: 0.04em;\r
}\r
\r
.prechat input {\r
  width: 100%;\r
  padding: 10px 13px;\r
  border: 1px solid var(--cw-border);\r
  border-radius: 12px;\r
  font: inherit;\r
  font-size: 14px;\r
  background: var(--cw-surface);\r
  color: var(--cw-ink);\r
  transition: border-color 0.15s ease, box-shadow 0.15s ease;\r
}\r
\r
.prechat input:focus {\r
  outline: none;\r
  border-color: var(--cw-accent);\r
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--cw-accent) 15%, transparent);\r
}\r
\r
.offline-avatar {\r
  background: var(--cw-accent-tint);\r
  color: var(--cw-accent-deep);\r
  box-shadow: none;\r
  align-self: center;\r
}\r
\r
.prechat textarea.offline-msg {\r
  width: 100%;\r
  padding: 10px 13px;\r
  border: 1px solid var(--cw-border);\r
  border-radius: 12px;\r
  font: inherit;\r
  font-size: 14px;\r
  background: var(--cw-surface);\r
  color: var(--cw-ink);\r
  resize: none;\r
  transition: border-color 0.15s ease, box-shadow 0.15s ease;\r
}\r
\r
.prechat textarea.offline-msg:focus {\r
  outline: none;\r
  border-color: var(--cw-accent);\r
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--cw-accent) 15%, transparent);\r
}\r
\r
button.primary {\r
  margin-top: 14px;\r
  width: 100%;\r
  padding: 11px 16px;\r
  border: 0;\r
  border-radius: 12px;\r
  background: var(--cw-grad);\r
  color: #fff;\r
  font: inherit;\r
  font-size: 14px;\r
  font-weight: 600;\r
  cursor: pointer;\r
  transition: transform 0.15s ease, box-shadow 0.15s ease;\r
}\r
\r
button.primary:hover {\r
  transform: translateY(-1px);\r
  box-shadow: 0 6px 18px color-mix(in srgb, var(--cw-accent) 35%, transparent);\r
}\r
\r
button.primary:active {\r
  transform: translateY(0);\r
}\r
\r
.queued {\r
  flex: 1;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 24px;\r
}\r
\r
.ticket {\r
  text-align: center;\r
  padding: 36px 44px;\r
  background: var(--cw-surface);\r
  border: 1px solid var(--cw-border);\r
  border-radius: 20px;\r
  box-shadow: 0 10px 30px rgba(16, 24, 40, 0.07);\r
}\r
\r
.ticket-number {\r
  font-size: 76px;\r
  font-weight: 700;\r
  line-height: 1;\r
  font-variant-numeric: tabular-nums;\r
  background: var(--cw-grad);\r
  -webkit-background-clip: text;\r
  background-clip: text;\r
  color: transparent;\r
  transition: transform 0.25s ease;\r
}\r
\r
@media (prefers-reduced-motion: no-preference) {\r
  .ticket-number.tick {\r
    animation: cw-pop 0.4s ease;\r
  }\r
}\r
\r
@keyframes cw-pop {\r
  0% {\r
    transform: scale(1.18);\r
  }\r
  100% {\r
    transform: scale(1);\r
  }\r
}\r
\r
.ticket.offline-done {\r
  max-width: 300px;\r
  padding: 32px 28px;\r
}\r
\r
.offline-done h2 {\r
  margin: 0 0 8px;\r
  font-size: 18px;\r
  letter-spacing: -0.01em;\r
}\r
\r
.offline-done .muted {\r
  text-align: left;\r
}\r
\r
.done-check {\r
  width: 56px;\r
  height: 56px;\r
  margin: 0 auto 16px;\r
  border-radius: 50%;\r
  background: var(--cw-grad);\r
  color: #fff;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  box-shadow: 0 8px 20px color-mix(in srgb, var(--cw-accent) 35%, transparent);\r
}\r
\r
@media (prefers-reduced-motion: no-preference) {\r
  .done-check {\r
    animation: cw-pop 0.4s ease;\r
  }\r
}\r
\r
.ticket-label {\r
  margin-top: 8px;\r
  font-size: 12px;\r
  letter-spacing: 0.14em;\r
  text-transform: uppercase;\r
  color: var(--cw-muted);\r
}\r
\r
.chat {\r
  flex: 1 1 0%;\r
  display: flex;\r
  flex-direction: column;\r
  min-height: 0;\r
  max-height: 100%;\r
  overflow: hidden;\r
}\r
\r
.messages {\r
  flex: 1 1 0%;\r
  overflow-y: auto;\r
  min-height: 0;\r
  padding: 16px 14px 8px;\r
  scrollbar-width: thin;\r
  scrollbar-color: var(--cw-border) transparent;\r
}\r
\r
.day-divider {\r
  text-align: center;\r
  font-size: 11px;\r
  font-weight: 600;\r
  color: var(--cw-muted);\r
  margin: 14px 0 10px;\r
  text-transform: uppercase;\r
  letter-spacing: 0.08em;\r
}\r
\r
.bubble-row {\r
  display: flex;\r
  margin-bottom: 2px;\r
}\r
\r
.bubble-row.g-end {\r
  margin-bottom: 12px;\r
}\r
\r
@media (prefers-reduced-motion: no-preference) {\r
  .bubble-row {\r
    animation: cw-in 0.18s ease;\r
  }\r
}\r
\r
@keyframes cw-in {\r
  from {\r
    opacity: 0;\r
    transform: translateY(6px);\r
  }\r
}\r
\r
.bubble-row.from-visitor {\r
  justify-content: flex-end;\r
}\r
\r
.bubble-row.from-agent {\r
  justify-content: flex-start;\r
  position: relative;\r
  padding-left: 36px;\r
}\r
\r
.bubble-row.from-system {\r
  justify-content: center;\r
}\r
\r
.msg-avatar {\r
  position: absolute;\r
  left: 0;\r
  bottom: 2px;\r
  width: 28px;\r
  height: 28px;\r
  border-radius: 50%;\r
  background: var(--cw-accent-tint);\r
  color: var(--cw-accent-deep);\r
  font-size: 12px;\r
  font-weight: 600;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  text-transform: uppercase;\r
}\r
\r
.bubble {\r
  max-width: 80%;\r
  padding: 9px 14px;\r
  border-radius: 18px;\r
  font-size: 14px;\r
  line-height: 1.5;\r
  word-break: break-word;\r
}\r
\r
.bubble-body {\r
  white-space: pre-wrap;\r
}\r
\r
.from-visitor .bubble {\r
  background: var(--cw-grad);\r
  color: #fff;\r
  box-shadow: 0 2px 8px color-mix(in srgb, var(--cw-accent) 25%, transparent);\r
}\r
\r
.from-visitor.g-end .bubble {\r
  border-bottom-right-radius: 6px;\r
}\r
\r
.from-visitor:not(.g-start) .bubble {\r
  border-top-right-radius: 6px;\r
}\r
\r
.from-agent .bubble {\r
  background: var(--cw-surface);\r
  color: var(--cw-ink);\r
  border: 1px solid var(--cw-border);\r
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);\r
}\r
\r
.from-agent.g-end .bubble {\r
  border-bottom-left-radius: 6px;\r
}\r
\r
.from-agent:not(.g-start) .bubble {\r
  border-top-left-radius: 6px;\r
}\r
\r
.from-system .bubble {\r
  background: none;\r
  color: var(--cw-muted);\r
  font-size: 11px;\r
  letter-spacing: 0.06em;\r
  text-transform: uppercase;\r
  padding: 2px 8px;\r
  box-shadow: none;\r
}\r
\r
.bubble.pending {\r
  opacity: 0.55;\r
}\r
\r
.bubble.has-img {\r
  padding: 4px;\r
}\r
\r
.bubble.has-img .bubble-body {\r
  display: block;\r
  padding: 4px 10px 2px;\r
}\r
\r
.bubble.has-img .bubble-time {\r
  padding: 0 10px 4px;\r
}\r
\r
.bubble-img {\r
  display: block;\r
  max-width: 100%;\r
  max-height: 240px;\r
  border-radius: 14px;\r
  cursor: zoom-in;\r
}\r
\r
.bubble-time {\r
  display: block;\r
  font-size: 10px;\r
  opacity: 0.65;\r
  margin-top: 3px;\r
  text-align: right;\r
  font-variant-numeric: tabular-nums;\r
}\r
\r
.from-system .bubble-time {\r
  display: none;\r
}\r
\r
.typing-bubble {\r
  padding: 12px 16px;\r
}\r
\r
.typing-dots {\r
  display: inline-flex;\r
  align-items: center;\r
}\r
\r
.typing-dots i {\r
  display: inline-block;\r
  width: 6px;\r
  height: 6px;\r
  margin-right: 4px;\r
  border-radius: 999px;\r
  background: var(--cw-muted);\r
}\r
\r
@media (prefers-reduced-motion: no-preference) {\r
  .typing-dots i {\r
    animation: cw-bounce 1.2s infinite;\r
  }\r
  .typing-dots i:nth-child(2) {\r
    animation-delay: 0.15s;\r
  }\r
  .typing-dots i:nth-child(3) {\r
    animation-delay: 0.3s;\r
  }\r
}\r
\r
@keyframes cw-bounce {\r
  0%, 60%, 100% {\r
    transform: translateY(0);\r
  }\r
  30% {\r
    transform: translateY(-4px);\r
  }\r
}\r
\r
.composer {\r
  display: flex;\r
  align-items: flex-end;\r
  gap: 8px;\r
  padding: 10px 12px 8px;\r
  background: var(--cw-surface);\r
  border-top: 1px solid var(--cw-border);\r
  flex: none;\r
}\r
\r
.file-input {\r
  display: none;\r
}\r
\r
.attach-btn {\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 50%;\r
  border: 1px solid var(--cw-border);\r
  background: var(--cw-surface);\r
  color: var(--cw-muted);\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  cursor: pointer;\r
  flex: none;\r
  transition: color 0.15s ease, border-color 0.15s ease;\r
}\r
\r
.attach-btn:hover {\r
  color: var(--cw-accent);\r
  border-color: var(--cw-accent);\r
}\r
\r
.attach-btn:disabled {\r
  opacity: 0.4;\r
  cursor: default;\r
}\r
\r
.composer textarea {\r
  flex: 1;\r
  resize: none;\r
  border: 1px solid var(--cw-border);\r
  background: var(--cw-bg);\r
  color: var(--cw-ink);\r
  border-radius: 20px;\r
  padding: 9px 14px;\r
  font: inherit;\r
  font-size: 13px;\r
  line-height: 1.35;\r
  min-height: 38px;\r
  max-height: 120px;\r
  overflow-y: hidden;\r
  transition: border-color 0.15s ease, background 0.15s ease;\r
}\r
\r
.composer textarea::placeholder {\r
  font-size: 12px;\r
  opacity: 0.7;\r
  color: var(--cw-muted);\r
}\r
\r
.composer textarea:focus {\r
  outline: none;\r
  border-color: var(--cw-accent);\r
  background: var(--cw-surface);\r
}\r
\r
.send-btn {\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 50%;\r
  border: 0;\r
  background: var(--cw-grad);\r
  color: #fff;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  cursor: pointer;\r
  flex: none;\r
  transition: transform 0.15s ease, opacity 0.15s ease;\r
}\r
\r
.send-btn svg {\r
  margin-left: 2px;\r
}\r
\r
.send-btn:disabled {\r
  opacity: 0.35;\r
  cursor: default;\r
}\r
\r
.send-btn:not(:disabled):hover {\r
  transform: scale(1.08);\r
}\r
\r
.panel-footer {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 6px;\r
  padding: 0 12px 8px;\r
  background: var(--cw-surface);\r
  font-size: 11px;\r
  color: var(--cw-muted);\r
  flex: none;\r
}\r
\r
.emoji-toggle {\r
  width: 34px;\r
  height: 34px;\r
  border: 0;\r
  background: none;\r
  margin-bottom: 3px;\r
}\r
\r
.powered {\r
  color: var(--cw-muted);\r
}\r
\r
.powered b {\r
  font-weight: 600;\r
  color: var(--cw-accent);\r
}\r
\r
.closed-note {\r
  padding: 20px;\r
  text-align: center;\r
  background: var(--cw-surface);\r
  border-top: 1px solid var(--cw-border);\r
}\r
\r
.closed-note p {\r
  margin: 0 0 10px;\r
  color: var(--cw-muted);\r
  font-size: 13px;\r
}\r
\r
.closed-note button.primary {\r
  margin-top: 0;\r
}\r
\r
.modal-overlay {\r
  position: absolute;\r
  inset: 0;\r
  z-index: 40;\r
  background: rgba(16, 24, 40, 0.35);\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 24px;\r
}\r
\r
.modal-card {\r
  background: var(--cw-surface);\r
  border-radius: 16px;\r
  box-shadow: 0 16px 48px rgba(16, 24, 40, 0.3);\r
  padding: 20px;\r
  width: 100%;\r
  max-width: 300px;\r
}\r
\r
@media (prefers-reduced-motion: no-preference) {\r
  .modal-card {\r
    animation: cw-in 0.18s ease;\r
  }\r
}\r
\r
.modal-message {\r
  margin: 0 0 16px;\r
  font-size: 14px;\r
  line-height: 1.5;\r
  color: var(--cw-ink);\r
}\r
\r
.modal-actions {\r
  display: flex;\r
  gap: 8px;\r
  justify-content: flex-end;\r
}\r
\r
.btn-ghost,\r
.btn-confirm {\r
  border-radius: 10px;\r
  padding: 9px 14px;\r
  font: inherit;\r
  font-size: 13px;\r
  font-weight: 600;\r
  cursor: pointer;\r
}\r
\r
.btn-ghost {\r
  border: 1px solid var(--cw-border);\r
  background: var(--cw-surface);\r
  color: var(--cw-muted);\r
}\r
\r
.btn-ghost:hover {\r
  color: var(--cw-ink);\r
  border-color: var(--cw-muted);\r
}\r
\r
.btn-confirm {\r
  border: 0;\r
  background: var(--cw-grad);\r
  color: #fff;\r
}\r
\r
.btn-confirm:hover {\r
  box-shadow: 0 4px 14px color-mix(in srgb, var(--cw-accent) 35%, transparent);\r
}\r
\r
.reconnecting {\r
  position: absolute;\r
  top: 10px;\r
  left: 50%;\r
  transform: translateX(-50%);\r
  background: #fffaeb;\r
  color: #b45309;\r
  font-size: 12px;\r
  font-weight: 500;\r
  padding: 6px 14px;\r
  border: 1px solid #fedf89;\r
  border-radius: 999px;\r
  box-shadow: 0 4px 12px rgba(16, 24, 40, 0.08);\r
  white-space: nowrap;\r
}\r
\r
/* ==========================================================================\r
   Mobile Responsive Adjustments (< 480px)\r
   ========================================================================== */\r
@media (max-width: 480px) {\r
  .zotly-widget-panel-wrapper {\r
    width: calc(100vw - 24px) !important;\r
    height: calc(100vh - 24px) !important;\r
    max-width: calc(100vw - 24px) !important;\r
    max-height: calc(100vh - 24px) !important;\r
    bottom: 12px !important;\r
    right: 12px !important;\r
  }\r
\r
  .panel-header {\r
    padding: 10px 12px;\r
    gap: 6px;\r
  }\r
\r
  .header-brand {\r
    gap: 8px;\r
  }\r
\r
  .brand-avatar {\r
    width: 32px;\r
    height: 32px;\r
    font-size: 14px;\r
  }\r
\r
  .panel-title {\r
    font-size: 13.5px;\r
  }\r
\r
  .panel-status {\r
    font-size: 11px;\r
  }\r
\r
  .header-actions {\r
    gap: 1px;\r
  }\r
\r
  .icon-btn {\r
    padding: 4px;\r
  }\r
\r
  .icon-btn svg {\r
    width: 16px;\r
    height: 16px;\r
  }\r
\r
  .composer {\r
    gap: 5px;\r
    padding: 8px 8px 6px;\r
  }\r
\r
  .attach-btn,\r
  .send-btn {\r
    width: 34px;\r
    height: 34px;\r
  }\r
\r
  .attach-btn svg,\r
  .send-btn svg {\r
    width: 16px;\r
    height: 16px;\r
  }\r
\r
  .composer textarea {\r
    padding: 8px 12px;\r
    font-size: 13px;\r
  }\r
\r
  .emoji-row,\r
  .attach-pop {\r
    bottom: 76px;\r
    left: 8px;\r
    right: 8px;\r
    max-width: none;\r
  }\r
}\r
`),Tr="--cw-bg",Pr="--cw-surface",Mr="--cw-border",Wr="--cw-ink",Rr="--cw-muted",Ir="--cw-grad",Nr="--cw-accent",Dr="--cw-accent-tint",Ur="--cw-accent-deep",fe={[Tr]:"#ffffff",[Pr]:"#f8fafc",[Mr]:"#e5e7eb",[Wr]:"#0f172a",[Rr]:"#71717a",[Ir]:"linear-gradient(135deg, #0b5fff, #22d3ee)",[Nr]:"#0b5fff",[Dr]:"rgba(11,95,255,0.1)",[Ur]:"#0040cc"},ue={[Tr]:"#18181b",[Pr]:"#27272a",[Mr]:"#3f3f46",[Wr]:"#f4f4f5",[Rr]:"#a1a1aa",[Ir]:"linear-gradient(135deg, #0b5fff, #22d3ee)",[Nr]:"#0b5fff",[Dr]:"rgba(11,95,255,0.15)",[Ur]:"#3b82f6"},be=`
  #zotly-widget-embed, #zotly-widget-embed *, .panel, .panel * {
    font-family: inherit !important;
  }
  @keyframes statusPulse {
    0% { transform: scale(0.9); opacity: 0.65; }
    50% { transform: scale(1.6); opacity: 0.3; }
    100% { transform: scale(2.4); opacity: 0; }
  }
  @keyframes zotly-wiggle {
    0%, 100% { transform: rotate(0deg); }
    15% { transform: rotate(-8deg); }
    30% { transform: rotate(6deg); }
    45% { transform: rotate(-4deg); }
    60% { transform: rotate(3deg); }
    75% { transform: rotate(-1deg); }
  }
  @keyframes zotly-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
  }
  @keyframes zotly-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes zotly-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  @keyframes zotly-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    0% { transform: scale(.9); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(16px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes dotBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes dotPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.25); }
  }
  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-4px); opacity: 1; }
  }
  .anim-zotly-wiggle { animation: zotly-wiggle 2.5s infinite ease-in-out; }
  .anim-zotly-pulse { animation: zotly-pulse 2s infinite ease-in-out; }
  .anim-zotly-bounce { animation: zotly-bounce 2s infinite ease-in-out; }
  .anim-zotly-float { animation: zotly-float 3s infinite ease-in-out; }
  .anim-zotly-spin { animation: zotly-spin 4s infinite linear; }
`;function we(t){return Object.entries(t).map(([r,e])=>`${r}: ${e};`).join(`
  `)}function st(t=!1){return`:host { ${we(t?ue:fe)} }`}function Lr(){const t=getComputedStyle(document.documentElement),r=document.body?getComputedStyle(document.body):null;let e=t.getPropertyValue("--primary-color").trim()||(r?r.getPropertyValue("--primary-color").trim():""),o=t.getPropertyValue("--secondary-color").trim()||(r?r.getPropertyValue("--secondary-color").trim():"");const n=document.querySelector("script[data-client-id]")||document.querySelector('script[src*="index.es.js"]')||document.querySelector('script[src*="index.js"]')||document.querySelector('script[src*="widget.js"]'),i=n?n.getAttribute("data-accent"):null;return!e&&i&&(e=i),e||(e="#0b5fff"),o||(o=e),{primary:e,secondary:o}}function me(){const t=document.querySelector('script[src*="index.es.js"]')||document.querySelector('script[src*="index.umd.js"]')||document.querySelector('script[src*="index.js"]')||document.querySelector('script[src*="widget.js"]');if(t&&t.src)try{const r=new URL(t.src,window.location.href);return r.pathname.includes("/dist/")?new URL("../",r).href:new URL("./",r).href}catch{}return window.location.pathname.includes("/chatwidget_components_lit/")?"./":"./chatwidget_components_lit/"}function Hr(){return document.documentElement.classList.contains("dark")}function ve(t){const r=new MutationObserver(()=>t(Hr()));return r.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),()=>r.disconnect()}function xe(){if(window.ZOTLY_CLIENT_ID)return window.ZOTLY_CLIENT_ID;const t=document.querySelector("script[data-client-id]")||document.querySelector('script[src*="index.es.js"]')||document.querySelector('script[src*="index.umd.js"]')||document.querySelector('script[src*="index.js"]')||document.querySelector('script[src*="widget.js"]');if(t){const r=t.getAttribute("data-client-id");if(r)return r;try{const e=new URL(t.src,window.location.href),o=e.searchParams.get("client_id")||e.searchParams.get("clientId");if(o)return o}catch{}}return"default"}async function ye(t){if(window.location.search.includes("test=true")){const o=localStorage.getItem("zotly_temp_preview_config");if(o)try{const n=JSON.parse(o);return{bubbleConfig:n.bubble||{},chatConfig:n.chatWindow||n.chat||{},chatbarConfig:n.chatbar||{},greetWindowConfig:n.greetWindow||{}}}catch(n){console.warn("Failed to parse temporary preview configuration:",n)}}const r=me(),e=[`${r}public/clients/${t}.json`,`${r}public/clients/default.json`,`./chatwidget_components_lit/public/clients/${t}.json`,"./chatwidget_components_lit/public/clients/default.json",`./public/clients/${t}.json`,"./public/clients/default.json"];for(const o of e)try{const n=await fetch(o);if(n.ok){const i=await n.json();if(i&&typeof i=="object")return{bubbleConfig:i.bubble||{},chatConfig:i.chatWindow||i.chat||{},chatbarConfig:i.chatbar||{},greetWindowConfig:i.greetWindow||{}}}}catch{}return{bubbleConfig:{},chatConfig:{},chatbarConfig:{},greetWindowConfig:{}}}function $e(t,r=1){if(!t)return"";if(t.startsWith("#")){const e=t.replace("#",""),o=e.length===3?e.split("").map(i=>i+i).join(""):e,n=parseInt(o,16);if(!isNaN(n))return`rgba(${n>>16&255},${n>>8&255},${n&255},${r})`}return t}function Fr(t,r="50%"){if(t==null)return r;if(typeof t=="number")return`${t}px`;if(typeof t=="object"){const{tl:e=50,tr:o=50,br:n=50,bl:i=50}=t;return`${e}px ${o}px ${n}px ${i}px`}return r}function ke(t,r,e=135,o="#0b5fff"){if(!t||t==="none")return"";if(!r||r.length===0)return o;const n=r.map(i=>`${i.color} ${i.pos}%`).join(", ");return t==="radial"?`radial-gradient(circle, ${n})`:t==="conic"?`conic-gradient(from ${e}deg, ${n})`:`linear-gradient(${e}deg, ${n})`}function Ce(t){const{boxShadowOffsetX:r=0,boxShadowOffsetY:e=8,boxShadowSpread:o=0,boxShadowBlur:n=20,boxShadowOpacity:i=.25}=t;return`${r}px ${e}px ${o}px ${n}px rgba(0,0,0,${i})`}function Se(t){return!t.innerShadow||!t.innerShadow.enabled?"":`inset 0 6px ${t.innerShadow.blur??12}px rgba(0,0,0,${t.innerShadow.opacity??.25})`}function Be(t){return t.useWebsiteTheme?t.backgroundColor||"#0b5fff":t.gradientType&&t.gradientType!=="none"?ke(t.gradientType,t.gradientStops||[],t.gradientAngle??135,t.backgroundColor||"#0b5fff"):t.backgroundColor||"#0b5fff"}function Oe(t){if(t.useWebsiteTheme)return t.accentColor||"#0b5fff";if(!t.gradientEnabled)return t.bgColor||"#007bff";const r=t.gradientStops||[];if(r.length===0)return t.bgColor||"#007bff";const e=r.map(o=>`${o.color} ${o.pos}%`).join(", ");switch(t.gradientType){case"linear":return`linear-gradient(${t.gradientAngle??90}deg, ${e})`;case"radial":return`radial-gradient(circle, ${e})`;case"conic":return`conic-gradient(from ${t.gradientAngle??90}deg, ${e})`;default:return t.bgColor||"#007bff"}}function ze(t=14,r=40){return Math.min(t,Math.max(12,Math.floor(r*.35)))+"px"}function mr(t=20,r=40,e="lucide"){return Math.min(t,Math.max(16,Math.floor(r*(e==="customSvg"?.55:.5))))}function _e(t=20,r=40,e="lucide"){return Math.min(t,Math.max(16,Math.floor(r*(e==="customSvg"?.55:.5))))}function Ae(t,r){if(t!==void 0){if(typeof t=="object"){const{tl:e=20,tr:o=20,br:n=20,bl:i=20}=t;return`${e}px ${o}px ${n}px ${i}px`}return typeof t=="number"?t+"px":String(t)}return r==="left"?"20px 20px 4px 20px":r==="right"?"20px 20px 20px 4px":"20px"}function Gr(t){return!t||t==="none"?"":`anim-zotly-${t}`}function lt(t){return(t?new Date(t):new Date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}const qr=new EventTarget;function m(t){qr.dispatchEvent(new CustomEvent(t))}function Ee(t){return{useWebsiteTheme:!0,position:"bottom-right",offsetLeft:16,offsetRight:16,offsetBottom:12,width:60,height:60,borderRadius:{tl:50,tr:50,bl:50,br:50},backgroundColor:t.primary,gradientType:"none",gradientStops:[{color:t.primary,pos:0},{color:t.secondary,pos:100}],backgroundOverlayType:"image",backgroundImageUrl:"",backgroundImageSize:"contain",backgroundImageOpacity:.25,backgroundBlendMode:"normal",border:{width:0,color:t.primary,style:"solid"},outlineRing:{enabled:!0,width:3,color:t.secondary,opacity:.4},boxShadowBlur:20,boxShadowSpread:0,boxShadowOffsetX:0,boxShadowOffsetY:8,boxShadowOpacity:.25,dots:{color:"#F8FAFC",size:6,spacing:6,animation:"bounce"},hideOnOpen:!0,tooltip:{enabled:!1,text:"Chat with us",position:"",backgroundColor:"#ffffff",textColor:"#374151",fontSize:14,borderRadius:{tl:20,tr:20,br:4,bl:20},padding:"8px 16px",boxShadow:"0 4px 12px rgba(0,0,0,0.1)",arrowEnabled:!0,borderColor:"transparent",borderWidth:0},badge:{position:"top-right",offsetX:-6,offsetY:-6,size:20,backgroundColor:"#dc2626",textColor:"#ffffff",fontSize:11,borderWidth:2,borderColor:"#ffffff",borderRadius:"9999px",fontWeight:"700",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",padding:"0px",animation:"pulse 1.5s infinite"}}}function je(t){return{enabled:!1,dismissed:!1,useWebsiteTheme:!1,width:320,spacing:16,backgroundColor:"#ffffff",borderRadius:16,padding:"24px 20px",boxShadow:"0 12px 28px -6px rgba(0,0,0,0.15), 0 8px 14px -4px rgba(0,0,0,0.1)",imageUrl:"",imageHeight:70,imageWidth:"",iconAlign:"center",imagePadding:"0px",iconType:"lucide",lucideIcon:"Sparkles",iconSize:52,iconColor:t.primary,iconAnimation:"wiggle",iconAnimationDuration:"2.5s",title:"Hi there! 👋 Need help growing your business using AI?",titleColor:"#1e293b",titleFontSize:"15px",description:"Let's chat & find the right solution for you!",descriptionColor:"#475569",descriptionFontSize:"14px",inputBox:{enabled:!0,layout:"separated",placeholder:"Write your message...",backgroundColor:"#ffffff",textColor:"#1e293b",borderRadius:24,boxShadow:"0 6px 16px rgba(0,0,0,0.12)",buttonColor:t.primary,buttonIconColor:"#ffffff"}}}function Te(t){return{useWebsiteTheme:!0,offsetRight:null,offsetBottom:null,clientName:"Zotly Support",agentName:"Sarah",accentColor:t.primary,widgetWidth:400,widgetHeight:650,expandedWidth:550,widgetBorderRadius:28,widgetShadow:!0,widgetShadowBlur:20,widgetShadowColor:"rgba(0,0,0,0.15)",widgetBorderEnabled:!0,widgetBorderWidth:1,widgetBorderColor:"#e5e7eb",modernUi:!0,typingIndicator:!0,attachmentsEnabled:!0,ticksEnabled:!0,readTickColor:"#34b7f1",headerBg:t.primary,headerTextColor:"#ffffff",headerBorderColor:"rgba(0,0,0,0.08)",headerPadding:"14px 16px",headerTitleFontSize:"14px",headerSubtitleFontSize:"11px",headerAvatarBg:"rgba(255,255,255,0.2)",headerAvatarColor:"#ffffff",activeDot:{color:"#22c55e",animate:!0,borderWidth:0,borderColor:"transparent",size:8},endChatConfirmMessage:"Are you sure you want to end this chat session?",endChatConfirmLabel:"End chat",endChatCancelLabel:"Cancel",modalCardBg:"#ffffff",modalMessageColor:"#101828",modalBorderRadius:28,endChatConfirmBg:t.primary,endChatConfirmTextColor:"#ffffff",endChatCancelBg:"#ffffff",endChatCancelTextColor:"#667085",endChatCancelBorderColor:"#e9ecf1",bodyBg:"#f4f4f5",visitorBubbleBg:t.primary,visitorBubbleColor:"#ffffff",visitorBubbleFontSize:"14px",visitorBubblePadding:"10px 14px",visitorBubbleBorderRadius:"16px",agentBubbleBg:"#ffffff",agentBubbleColor:"#111827",agentBubbleBorderColor:"#d1d5db",agentBubbleFontSize:"14px",agentBubblePadding:"10px 14px",agentBubbleBorderRadius:"16px",agentAvatarBg:t.primary,agentAvatarColor:"#ffffff",inputBg:"#ffffff",inputTextColor:"#18181b",inputPlaceholderColor:"#6b7280",inputBorderColor:"#d1d5db",inputFocusBorderColor:t.primary,inputFocusShadow:`0 0 0 3px ${t.primary}26`,inputBorderRadius:"9999px",inputPadding:"6px 8px",inputMargin:"12px 16px",textareaFontSize:"14px",attachButtonBg:"#ffffff",attachButtonColor:"#6b7280",emojiButtonColor:"#6b7280",sendButtonBgActive:t.primary,sendButtonColorActive:"#ffffff",sendButtonBgInactive:"#e5e7eb",sendButtonColorInactive:"#9ca3af",sendIconType:"arrow",footerBg:"#f9fafb",footerTextColor:"#6b7280",footerFontSize:"12px",footerPaddingBottom:"16px",poweredByText:"vAInatheya.ai",poweredByLink:"#",poweredByColor:t.primary,welcome:{enabled:!1,useWebsiteTheme:!0,cardLayout:"glassy",cardAlign:"center",textAlign:"center",logoAlign:"center",avatarAlign:"center",cardBg:"rgba(255, 255, 255, 0.12)",cardBorder:"1px solid rgba(255, 255, 255, 0.22)",cardBorderRadius:24,cardPadding:"28px 24px",cardBlur:16,cardShadow:"0 12px 40px 0 rgba(0, 0, 0, 0.15)",title:"Hi there! 👋 How can we help you today?",titleFontSize:"26px",description:"Our support heroes are here to assist you.",descriptionFontSize:"15px",bgGradient:`linear-gradient(135deg, ${t.primary}, ${t.secondary})`,headerTextColor:"#ffffff",subtextColor:"rgba(255, 255, 255, 0.85)",padding:"32px 20px 10px 20px",footerPaddingBottom:"0px",avatarBorderColor:"rgba(255, 255, 255, 0.2)",avatars:[{name:"Sarah",bg:"#059669",color:"#ffffff"},{name:"Alex",bg:"#0284c7",color:"#ffffff"},{name:"Emily",bg:"#7c3aed",color:"#ffffff"}],buttonText:"Start Conversation",buttonBg:"#ffffff",buttonTextColor:"#111827",buttonIconColor:t.primary}}}function Pe(){return{voiceCallMaster:!1,voiceCallAgents:!1,voiceCallVisitors:!1,videoCallMaster:!1,videoCallAgents:!1,videoCallVisitors:!1,disableVisitorCamera:!1,closeChatVisitor:!0,averageQueueTime:1,chatAcceptanceTime:5}}function Me(t){return{enabled:!1,useWebsiteTheme:!0,position:"bottom-right",offsetLeft:16,offsetRight:16,offsetBottom:12,cardOffsetRight:null,cardOffsetBottom:null,barOffsetRight:null,barOffsetBottom:null,text:"Chat with us",cardText:"",barText:"Chat with us",bgColor:t.primary,textColor:"#ffffff",textSize:14,letterSpacing:0,gradientEnabled:!1,gradientStops:[{color:t.primary,pos:0},{color:t.secondary,pos:100}],gradientType:"linear",gradientAngle:90,iconType:"lucide",iconColor:"#ffffff",lucideIcon:"MessageCircle",iconImageUrl:"",iconFit:"contain",iconOpacity:1,iconBlend:"normal",iconWidth:20,iconHeight:20,width:255,height:40,shadow:!0,borderRadius:{tl:20,tr:20,bl:20,br:20},hideOnOpen:!0}}function We(t){var o;const r=(t==null?void 0:t.agentName)||"Sarah";return{state:((o=t==null?void 0:t.welcome)==null?void 0:o.enabled)===!0?"welcome":"active",isExpanded:!1,panelOpen:!1,unreadCount:0,isMobile:window.innerWidth<640||window.innerHeight<750,clientName:(t==null?void 0:t.clientName)||"Zotly Support",agentName:r,agentsOnline:!0,token:"visitor-token-demo",position:1,menuOpen:!1,attachOpen:!1,emojiOpen:!1,confirmBox:null,reconnecting:!1,soundsOn:!0,consentDismissed:!1,draft:"",uploading:!1,typingName:"",offlineName:"",offlineEmail:"",offlineMessage:"",offlineSending:!1,hasSentMessage:!1,flags:{},messages:[{key:"msg_welcome",senderType:"AGENT",senderName:r,body:"Welcome! How can we assist you today?",created:new Date().toISOString()}]}}let y=null;function x(){if(!y){const t=Lr();y={bubble:Ee(t),greetWindow:je(t),chatWindow:Te(t),features:Pe(),chat:We(),chatbar:Me(t)}}return y}function Z(t,r){return qr.addEventListener(t,r),()=>qr.removeEventListener(t,r)}function vr(t){const e=["store:bubble","store:greetWindow","store:chatWindow","store:chat","store:chatbar","store:features"].map(o=>Z(o,t));return()=>e.forEach(o=>o())}const lr={get(){return x().bubble}},xr={get(){return x().greetWindow}},cr={get(){return x().chatWindow}},yr={get(){return x().features}},$r={get(){return x().chatbar}},w={get(){return x().chat},flag(t,r=!0){const e=x().chat;return e.flags[t]!==void 0?e.flags[t]:r},send(){var n;const t=x().chat;if(!((n=t.draft)!=null&&n.trim()))return;const r=t.draft.trim(),e={key:"msg_"+Date.now(),senderType:"VISITOR",body:r,created:new Date().toISOString(),status:"sent"};t.messages=[...t.messages,e],t.draft="",t.emojiOpen=!1,t.attachOpen=!1,t.hasSentMessage=!0,m("store:chat");const o=x().greetWindow;o&&(o.dismissed=!0,o.visible=!1,o.inputBox&&(o.inputBox.visible=!1),m("store:greetWindow")),w.resetChatbarLayout(),setTimeout(()=>{const i=t.messages.findIndex(a=>a.key===e.key);i!==-1&&(t.messages=t.messages.map((a,p)=>p===i?{...a,status:"delivered"}:a),m("store:chat"))},2e3),setTimeout(()=>{const i=t.messages.findIndex(a=>a.key===e.key);i!==-1&&(t.messages=t.messages.map((a,p)=>p===i?{...a,status:"read"}:a),m("store:chat"))},4e3)},resetChatbarLayout(){const t=x().chatbar;t.enabled&&t.layout==="card"&&(t.layout="bar",t.height=40,t.width=255,t.offsetRight=t.barOffsetRight!==void 0&&t.barOffsetRight!==null?t.barOffsetRight:16,t.offsetBottom=t.barOffsetBottom!==void 0&&t.barOffsetBottom!==null?t.barOffsetBottom:12,m("store:chatbar"))},askEndChat(){const t=x().chat,r=x().chatWindow;t.confirmBox={message:r.endChatConfirmMessage||"Are you sure you want to end this chat session?",confirmLabel:r.endChatConfirmLabel||"End chat",cancelLabel:r.endChatCancelLabel||"Cancel"},m("store:chat")},confirmEnd(){const t=x().chat;t.state="closed",t.confirmBox=null,m("store:chat")},startNew(){const t=x().chat;t.state="active",t.messages=[{key:"m_new",senderType:"AGENT",senderName:t.agentName||"Sarah",body:"Chat restarted. How can we help you?",created:new Date().toISOString()}],m("store:chat")},startFromWelcome(){const t=x().chat;t.state="active",m("store:chat")},closePanel(){const t=x().chat;t.isExpanded=!1,t.menuOpen=!1,t.attachOpen=!1,t.emojiOpen=!1,t.panelOpen=!1,m("store:chat"),window.dispatchEvent(new CustomEvent("close-contact-widget"))},toggleExpand(){const t=x().chat;t.isExpanded=!t.isExpanded,m("store:chat")},downloadTranscript(){x().chat.menuOpen=!1,m("store:chat"),alert("Downloading transcript...")},toggleSounds(){const t=x().chat;t.soundsOn=!t.soundsOn,m("store:chat")},dismissConsent(){x().chat.consentDismissed=!0,m("store:chat")},submitOffline(){const t=x().chat;t.offlineEmail&&t.offlineMessage&&(t.offlineSending=!0,m("store:chat"),setTimeout(()=>{t.offlineSending=!1,t.state="offline-sent",m("store:chat")},1e3))},uploadImage(t){const r=x().chat;if(t.files&&t.files[0]){const e=URL.createObjectURL(t.files[0]),o={key:"img_"+Date.now(),senderType:"VISITOR",localUrl:e,attachment:!0,body:"",created:new Date().toISOString(),status:"sent"};r.messages=[...r.messages,o],r.attachOpen=!1,r.hasSentMessage=!0,m("store:chat"),w.resetChatbarLayout(),setTimeout(()=>{const n=r.messages.findIndex(i=>i.key===o.key);n!==-1&&(r.messages=r.messages.map((i,a)=>a===n?{...i,status:"delivered"}:i),m("store:chat"))},2e3),setTimeout(()=>{const n=r.messages.findIndex(i=>i.key===o.key);n!==-1&&(r.messages=r.messages.map((i,a)=>a===n?{...i,status:"read"}:i),m("store:chat"))},4e3)}},captureScreenshot(){x().chat.attachOpen=!1,m("store:chat"),alert("Screenshot captured!")},dividerBefore(t){return t===0},dayLabel(){return"Today"},timeLabel(t){return(t.created?new Date(t.created):new Date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})},groupStart(t){const r=x().chat;return t===0||r.messages[t].senderType!==r.messages[t-1].senderType},groupEnd(t){const r=x().chat;return t===r.messages.length-1||r.messages[t].senderType!==r.messages[t+1].senderType},attachmentUrl(t){return t.localUrl||t.url||""}};async function Re(){var o;const t=Lr(),r=xe();y={bubble:Ee(t),greetWindow:je(t),chatWindow:Te(t),features:Pe(),chat:We(),chatbar:Me(t)},m("store:bubble"),m("store:greetWindow"),m("store:chatWindow"),m("store:features"),m("store:chat"),m("store:chatbar");try{const{bubbleConfig:n,chatConfig:i,chatbarConfig:a,greetWindowConfig:p}=await ye(r);if(n&&Object.keys(n).length>0){const c=n;c.useWebsiteTheme&&(c.backgroundColor=t.primary,c.gradientType="none",c.outlineRing&&(c.outlineRing.color=t.secondary)),Object.assign(y.bubble,c),c.position&&(y.greetWindow.position=c.position),m("store:bubble"),m("store:greetWindow")}if(p&&Object.keys(p).length>0){const c=p;c.inputBox&&(c.inputBox={...y.greetWindow.inputBox,...c.inputBox}),c.useWebsiteTheme&&(c.iconColor=t.primary,c.inputBox&&(c.inputBox.layout==="separated"?c.inputBox.buttonIconColor=t.primary:c.inputBox.buttonColor=t.primary)),Object.assign(y.greetWindow,c),m("store:greetWindow")}if(a&&Object.keys(a).length>0){Object.assign(y.chatbar,a);const c=y.chatbar;c.layout==="card"?(c.cardOffsetRight!==void 0&&c.cardOffsetRight!==null&&(c.offsetRight=c.cardOffsetRight),c.cardOffsetBottom!==void 0&&c.cardOffsetBottom!==null&&(c.offsetBottom=c.cardOffsetBottom)):(c.barOffsetRight!==void 0&&c.barOffsetRight!==null&&(c.offsetRight=c.barOffsetRight),c.barOffsetBottom!==void 0&&c.barOffsetBottom!==null&&(c.offsetBottom=c.barOffsetBottom)),m("store:chatbar")}if(i&&Object.keys(i).length>0){let c=function(){const b=Hr(),d=JSON.parse(JSON.stringify(g));d.useWebsiteTheme&&(d.accentColor=t.primary,d.visitorBubbleBg=t.primary,d.visitorBubbleColor="#ffffff",d.headerBg=t.primary,d.headerTextColor="#ffffff",d.headerAvatarBg="rgba(255,255,255,0.2)",d.headerAvatarColor="#ffffff",d.agentAvatarBg=t.primary,d.agentAvatarColor="#ffffff",d.inputFocusBorderColor=t.primary,d.inputFocusShadow=`0 0 0 2px ${t.primary}26`,d.sendButtonBgActive=t.primary,d.poweredByColor=t.primary,d.endChatConfirmBg=t.primary,d.endChatConfirmTextColor="#ffffff",b&&(d.bodyBg="var(--cw-bg)",d.inputBg="var(--cw-surface)",d.agentBubbleBg="var(--cw-surface)",d.agentBubbleColor="var(--cw-ink)",d.agentBubbleBorderColor="var(--cw-border)",d.footerBg="var(--cw-bg)",d.footerTextColor="var(--cw-muted)",d.inputTextColor="var(--cw-ink)",d.inputBorderColor="var(--cw-border)",d.attachButtonBg="var(--cw-surface)",d.attachButtonColor="var(--cw-muted)",d.emojiButtonColor="var(--cw-muted)",d.modalCardBg="var(--cw-surface)",d.modalMessageColor="var(--cw-ink)",d.endChatCancelBg="var(--cw-surface)",d.endChatCancelTextColor="var(--cw-muted)",d.endChatCancelBorderColor="var(--cw-border)"));const u=d.welcome||y.chatWindow.welcome;if(u&&(u.useWebsiteTheme??d.useWebsiteTheme)){const k=t.secondary&&t.secondary!==t.primary?t.secondary:t.primary;u.bgGradient=`linear-gradient(135deg, ${t.primary}, ${k})`,u.buttonIconColor=t.primary,d.welcome=u}b&&g.dark&&Object.keys(g.dark).length>0&&Object.assign(d,g.dark),Object.assign(y.chatWindow,d),m("store:chatWindow")};const g=i;g.welcome&&(y.chatWindow.welcome={...y.chatWindow.welcome,...g.welcome}),c(),ve(()=>c()),g.clientName&&(y.chat.clientName=g.clientName),g.agentName&&(y.chat.agentName=g.agentName,y.chat.messages[0]&&(y.chat.messages[0].senderName=g.agentName)),!y.chat.hasSentMessage&&((o=g.welcome)!=null&&o.enabled)&&(y.chat.state="welcome"),m("store:chat")}}catch(n){console.warn("initStore fetchClientConfig warning:",n)}const e=y.greetWindow;if(e&&e.enabled){const n=parseFloat(String(e.openingTimeAfterInitialLoadSec??2));if(setTimeout(()=>{!e.dismissed&&!y.chat.hasSentMessage&&(e.visible=!0,m("store:greetWindow"))},n*1e3),e.inputBox&&e.inputBox.enabled){const i=parseFloat(String(e.inputBox.openingTimeAfterInitialLoadSec??4));setTimeout(()=>{!e.dismissed&&!y.chat.hasSentMessage&&(e.inputBox&&(e.inputBox.visible=!0),m("store:greetWindow"))},i*1e3)}}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=t=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(t,r)}):customElements.define(t,r)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ct={attribute:!0,type:String,converter:ur,reflect:!1,hasChanged:zr},dt=(t=ct,r,e)=>{const{kind:o,metadata:n}=e;let i=globalThis.litPropertyMetadata.get(n);if(i===void 0&&globalThis.litPropertyMetadata.set(n,i=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(e.name,t),o==="accessor"){const{name:a}=e;return{set(p){const c=r.get.call(this);r.set.call(this,p),this.requestUpdate(a,c,t,!0,p)},init(p){return p!==void 0&&this.C(a,void 0,t,p),p}}}if(o==="setter"){const{name:a}=e;return function(p){const c=this[a];r.call(this,p),this.requestUpdate(a,c,t,!0,p)}}throw Error("Unsupported decorator location: "+o)};function h(t){return(r,e)=>typeof e=="object"?dt(t,r,e):((o,n,i)=>{const a=n.hasOwnProperty(i);return n.constructor.createProperty(i,o),a?Object.getOwnPropertyDescriptor(n,i):void 0})(t,r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function dr(t){return h({...t,state:!0,attribute:!1})}var pt=Object.defineProperty,ht=Object.getOwnPropertyDescriptor,pr=(t,r,e,o)=>{for(var n=o>1?void 0:o?ht(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&pt(r,e,n),n};s.CwIcon=class extends ${constructor(){super(...arguments),this.name="MessageCircle",this.size=24,this.color="currentColor",this.customSvg=""}render(){if(this.customSvg)return l`<div class="custom-svg" style="width: ${this.size}px; height: ${this.size}px; color: ${this.color}" .innerHTML=${this.customSvg}></div>`;const r=this.size,e=this.color;switch(this.name){case"Star":return l`<svg viewBox="0 0 24 24" width="${r}" height="${r}" fill="${e}" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;case"Heart":return l`<svg viewBox="0 0 24 24" width="${r}" height="${r}" fill="${e}" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;case"Smile":return l`<svg viewBox="0 0 24 24" width="${r}" height="${r}" fill="none" stroke="${e}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`;case"Sparkles":return l`<svg viewBox="0 0 24 24" width="${r}" height="${r}" fill="none" stroke="${e}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"></path><path d="M5 3l.8 1.6L7.4 5l-1.6.8L5 7.4l-.8-1.6L2.6 5l1.6-.8L5 3z"></path><path d="M19 17l.8 1.6 1.6.6-1.6.8-.8 1.6-.8-1.6-1.6-.8 1.6-.6.8-1.6z"></path></svg>`;case"MessageSquare":return l`<svg viewBox="0 0 24 24" width="${r}" height="${r}" fill="none" stroke="${e}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;case"Send":return l`<svg viewBox="0 0 24 24" width="${r}" height="${r}" fill="none" stroke="${e}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;case"HelpCircle":return l`<svg viewBox="0 0 24 24" width="${r}" height="${r}" fill="none" stroke="${e}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;case"Gift":return l`<svg viewBox="0 0 24 24" width="${r}" height="${r}" fill="none" stroke="${e}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>`;case"Bell":return l`<svg viewBox="0 0 24 24" width="${r}" height="${r}" fill="none" stroke="${e}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`;case"Info":return l`<svg viewBox="0 0 24 24" width="${r}" height="${r}" fill="none" stroke="${e}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;case"MessageCircle":default:return l`<svg viewBox="0 0 24 24" width="${r}" height="${r}" fill="none" stroke="${e}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>`}}},s.CwIcon.styles=S`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
    .custom-svg {
      width: 100%;
      height: 100%;
      display: inline-flex;
    }
  `,pr([h({type:String})],s.CwIcon.prototype,"name",2),pr([h({type:Number})],s.CwIcon.prototype,"size",2),pr([h({type:String})],s.CwIcon.prototype,"color",2),pr([h({type:String})],s.CwIcon.prototype,"customSvg",2),s.CwIcon=pr([B("cw-icon")],s.CwIcon);var gt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,Vr=(t,r,e,o)=>{for(var n=o>1?void 0:o?ft(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&gt(r,e,n),n};s.CwBadge=class extends ${constructor(){super(...arguments),this.count=0,this.config={}}render(){if(!this.count||this.count<=0)return l``;const r=this.config||{},e=r.position||"top-right",o=r.offsetX!==void 0?r.offsetX:-6,n=r.offsetY!==void 0?r.offsetY:-6,i=r.size||20,a={position:"absolute",backgroundColor:r.backgroundColor||"#dc2626",color:r.textColor||"#ffffff",fontSize:`${r.fontSize||11}px`,lineHeight:"1",minWidth:`${i}px`,height:`${i}px`,border:`${r.borderWidth!==void 0?r.borderWidth:2}px solid ${r.borderColor||"#ffffff"}`,borderRadius:r.borderRadius!==void 0?r.borderRadius:"9999px",fontWeight:r.fontWeight||"700",boxShadow:r.boxShadow||"0 1px 3px rgba(0,0,0,0.15)",padding:r.padding||"0px",zIndex:"50",animation:r.animation||"none"};e==="top-left"?(a.top=`${n}px`,a.left=`${o}px`):e==="bottom-right"?(a.bottom=`${n}px`,a.right=`${o}px`):e==="bottom-left"?(a.bottom=`${n}px`,a.left=`${o}px`):(a.top=`${n}px`,a.right=`${o}px`);const p=Object.entries(a).map(([c,g])=>`${c.replace(/([A-Z])/g,"-$1").toLowerCase()}: ${g}`).join("; ");return l`<div class="badge" style="${p}">${this.count}</div>`}},s.CwBadge.styles=S`
    :host {
      display: inline-flex;
    }
    .badge {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      white-space: nowrap;
    }
  `,Vr([h({type:Number})],s.CwBadge.prototype,"count",2),Vr([h({type:Object})],s.CwBadge.prototype,"config",2),s.CwBadge=Vr([B("cw-badge")],s.CwBadge);var ut=Object.getOwnPropertyDescriptor,bt=(t,r,e,o)=>{for(var n=o>1?void 0:o?ut(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=a(n)||n);return n};s.CwTypingDots=class extends ${render(){return l`
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    `}},s.CwTypingDots.styles=S`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 8px;
    }
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
      animation: typingBounce 1.4s infinite ease-in-out;
    }
    .dot:nth-child(1) {
      animation-delay: 0s;
    }
    .dot:nth-child(2) {
      animation-delay: 0.2s;
    }
    .dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typingBounce {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.4;
      }
      30% {
        transform: translateY(-4px);
        opacity: 1;
      }
    }
  `,s.CwTypingDots=bt([B("cw-typing-dots")],s.CwTypingDots);var wt=Object.defineProperty,mt=Object.getOwnPropertyDescriptor,hr=(t,r,e,o)=>{for(var n=o>1?void 0:o?mt(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&wt(r,e,n),n};s.CwMessageTick=class extends ${constructor(){super(...arguments),this.status="sent",this.sentColor="",this.deliveredColor="",this.readColor="#34b7f1"}render(){if(!this.status||this.status==="sent"){const r=this.sentColor||"currentColor",e=this.sentColor?"1":"0.7";return l`
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke="${r}" style="opacity: ${e}">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `}if(this.status==="delivered"){const r=this.deliveredColor||"currentColor",e=this.deliveredColor?"1":"0.7";return l`
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke="${r}" style="opacity: ${e}">
          <path d="M17 6L8.5 14.5L5 11M22 6L13.5 14.5L12.5 13.5"></path>
        </svg>
      `}if(this.status==="read"){const r=this.readColor||"#34b7f1";return l`
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke="${r}">
          <path d="M17 6L8.5 14.5L5 11M22 6L13.5 14.5L12.5 13.5"></path>
        </svg>
      `}return l``}},s.CwMessageTick.styles=S`
    :host {
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
      margin-left: 4px;
    }
    svg {
      display: block;
    }
  `,hr([h({type:String})],s.CwMessageTick.prototype,"status",2),hr([h({type:String})],s.CwMessageTick.prototype,"sentColor",2),hr([h({type:String})],s.CwMessageTick.prototype,"deliveredColor",2),hr([h({type:String})],s.CwMessageTick.prototype,"readColor",2),s.CwMessageTick=hr([B("cw-message-tick")],s.CwMessageTick);var vt=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,W=(t,r,e,o)=>{for(var n=o>1?void 0:o?xt(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&vt(r,e,n),n};s.CwAvatar=class extends ${constructor(){super(...arguments),this.name="Support",this.imageUrl="",this.bg="rgba(255,255,255,0.2)",this.color="#ffffff",this.size=32,this.showOnlineDot=!0}render(){var p,c,g,b,d;const r=(this.name||"S").charAt(0).toUpperCase(),e=((p=this.activeDot)==null?void 0:p.size)!==void 0?this.activeDot.size:8,o=((c=this.activeDot)==null?void 0:c.color)||"#22c55e",n=((g=this.activeDot)==null?void 0:g.animate)!==!1,i=((b=this.activeDot)==null?void 0:b.borderWidth)!==void 0?this.activeDot.borderWidth:0,a=((d=this.activeDot)==null?void 0:d.borderColor)||"transparent";return l`
      <div class="avatar-box" style="width: ${this.size}px; height: ${this.size}px; font-size: ${Math.floor(this.size*.45)}px; background: ${this.bg}; color: ${this.color}">
        ${this.imageUrl?l`<img class="avatar-img" src="${this.imageUrl}" alt="${this.name}" />`:l`<span>${r}</span>`}
        ${this.showOnlineDot?l`
              <div class="dot-wrapper" style="width: ${e}px; height: ${e}px">
                ${n?l`<span class="dot-pulse" style="background-color: ${o}"></span>`:""}
                <span class="dot-solid" style="background-color: ${o}; border: ${i}px solid ${a}"></span>
              </div>
            `:""}
      </div>
    `}},s.CwAvatar.styles=S`
    :host {
      display: inline-flex;
      position: relative;
      flex-shrink: 0;
    }
    .avatar-box {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }
    .avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
    .dot-wrapper {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dot-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      opacity: 0.6;
      pointer-events: none;
      animation: statusPulse 1.8s cubic-bezier(0.24, 0, 0.38, 1) infinite;
    }
    .dot-solid {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    @keyframes statusPulse {
      0% { transform: scale(0.9); opacity: 0.65; }
      50% { transform: scale(1.6); opacity: 0.3; }
      100% { transform: scale(2.4); opacity: 0; }
    }
  `,W([h({type:String})],s.CwAvatar.prototype,"name",2),W([h({type:String})],s.CwAvatar.prototype,"imageUrl",2),W([h({type:String})],s.CwAvatar.prototype,"bg",2),W([h({type:String})],s.CwAvatar.prototype,"color",2),W([h({type:Number})],s.CwAvatar.prototype,"size",2),W([h({type:Object})],s.CwAvatar.prototype,"activeDot",2),W([h({type:Boolean})],s.CwAvatar.prototype,"showOnlineDot",2),s.CwAvatar=W([B("cw-avatar")],s.CwAvatar);var yt=Object.defineProperty,$t=Object.getOwnPropertyDescriptor,X=(t,r,e,o)=>{for(var n=o>1?void 0:o?$t(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&yt(r,e,n),n};s.CwMessageBubble=class extends ${constructor(){super(...arguments),this.chatWindowConfig={},this.isGroupEnd=!0,this.isGroupStart=!0,this.agentName="Sarah"}render(){if(!this.message)return l``;const r=this.message,e=this.chatWindowConfig,o=r.senderType==="VISITOR",n=r.senderType==="AGENT",i=o?e.visitorBubbleBg||"var(--cw-grad)":e.agentBubbleBg||"var(--cw-surface)",a=o?e.visitorBubbleColor||"#fff":e.agentBubbleColor||"var(--cw-ink)",p=o?"transparent":e.agentBubbleBorderColor||"var(--cw-border)",c=o?e.visitorBubbleBg?"none":"0 2px 8px color-mix(in srgb, var(--cw-accent) 25%, transparent)":"0 1px 2px rgba(16, 24, 40, 0.05)",g=o?e.visitorBubbleBorderRadius||"16px":e.agentBubbleBorderRadius||"16px",b=o?e.visitorBubblePadding||"10px 14px":e.agentBubblePadding||"10px 14px",d=o?e.visitorBubbleFontSize||"14px":e.agentBubbleFontSize||"14px",u=r.created?new Date(r.created).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),v=(r.senderName||this.agentName||"A").charAt(0).toUpperCase();return l`
      <div class="bubble-row ${o?"from-visitor":"from-agent"}">
        ${n&&this.isGroupEnd?l`
              <div class="msg-avatar" style="background: ${e.agentAvatarBg||"var(--cw-accent-tint)"}; color: ${e.agentAvatarColor||"var(--cw-accent-deep)"}">
                ${e.agentAvatarUrl?l`<img src="${e.agentAvatarUrl}" alt="avatar" />`:l`<span>${v}</span>`}
              </div>
            `:n?l`<div class="msg-avatar-placeholder"></div>`:""}

        <div
          class="bubble ${r.pending?"pending":""}"
          style="background: ${i}; color: ${a}; border-color: ${p}; border-style: solid; border-width: ${o?"0px":"1px"}; box-shadow: ${c}; border-radius: ${g}; padding: ${b}; font-size: ${d}"
        >
          ${r.attachment||r.localUrl?l`
                <img
                  class="bubble-img"
                  alt="attachment"
                  src="${r.localUrl||r.url||""}"
                  @click="${()=>!r.pending&&window.open(r.localUrl||r.url||"","_blank")}"
                />
              `:""}

          ${r.body?l`<span>${r.body}</span>`:""}

          ${this.isGroupEnd?l`
                <span class="bubble-time">
                  <span>${u}</span>
                  ${o&&e.ticksEnabled!==!1?l`
                        <cw-message-tick
                          .status="${r.status||"sent"}"
                          .sentColor="${e.sentTickColor||""}"
                          .deliveredColor="${e.deliveredTickColor||""}"
                          .readColor="${e.readTickColor||"#34b7f1"}"
                        ></cw-message-tick>
                      `:""}
                </span>
              `:""}
        </div>
      </div>
    `}},s.CwMessageBubble.styles=S`
    :host {
      display: block;
      width: 100%;
      margin-bottom: 4px;
    }
    .bubble-row {
      display: flex;
      gap: 8px;
      align-items: flex-end;
      width: 100%;
    }
    .bubble-row.from-visitor {
      justify-content: flex-end;
    }
    .bubble-row.from-agent {
      justify-content: flex-start;
    }
    .msg-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      flex-shrink: 0;
      overflow: hidden;
    }
    .msg-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .msg-avatar-placeholder {
      width: 28px;
      height: 28px;
      flex-shrink: 0;
    }
    .bubble {
      max-width: 75%;
      word-break: break-word;
      line-height: 1.4;
      position: relative;
      box-sizing: border-box;
    }
    .bubble.pending {
      opacity: 0.7;
    }
    .bubble-img {
      max-width: 100%;
      border-radius: 12px;
      cursor: pointer;
      display: block;
      margin-bottom: 4px;
    }
    .bubble-time {
      font-size: 10px;
      opacity: 0.7;
      display: inline-flex;
      align-items: center;
      float: right;
      margin-left: 8px;
      margin-top: 4px;
    }
  `,X([h({type:Object})],s.CwMessageBubble.prototype,"message",2),X([h({type:Object})],s.CwMessageBubble.prototype,"chatWindowConfig",2),X([h({type:Boolean})],s.CwMessageBubble.prototype,"isGroupEnd",2),X([h({type:Boolean})],s.CwMessageBubble.prototype,"isGroupStart",2),X([h({type:String})],s.CwMessageBubble.prototype,"agentName",2),s.CwMessageBubble=X([B("cw-message-bubble")],s.CwMessageBubble);var kt=Object.defineProperty,Ct=Object.getOwnPropertyDescriptor,H=(t,r,e,o)=>{for(var n=o>1?void 0:o?Ct(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&kt(r,e,n),n};s.CwComposer=class extends ${constructor(){super(...arguments),this.config={},this.draft="",this.attachmentsEnabled=!0,this.modernUi=!0,this.uploading=!1,this.focused=!1}handleInput(r){const e=r.target;this.draft=e.value,e.style.height="auto",e.style.height=`${Math.min(e.scrollHeight,120)}px`,this.dispatchEvent(new CustomEvent("draft-change",{detail:this.draft}))}handleKeyDown(r){r.key==="Enter"&&!r.shiftKey&&(r.preventDefault(),this.send())}send(){this.draft.trim()&&this.dispatchEvent(new CustomEvent("send-message",{detail:this.draft.trim()}))}toggleAttach(){this.dispatchEvent(new CustomEvent("toggle-attach"))}toggleEmoji(){this.dispatchEvent(new CustomEvent("toggle-emoji"))}handleFileSelect(r){const e=r.target;e&&w.uploadImage(e)}render(){const r=this.config,e=this.focused,o=!!this.draft.trim(),n=r.inputPadding||"6px 8px",i=r.inputMargin||"12px 16px",a=r.inputBg||"var(--cw-surface)",p=r.inputBorderRadius||"9999px",c=e?r.inputFocusBorderColor||r.accentColor||"#0b5fff":r.inputBorderColor||"var(--cw-border)",g=e?r.inputFocusShadow||"0 0 0 2px rgba(11, 95, 255, 0.1)":"none",b=r.inputTextColor||"var(--cw-ink)",d=r.inputPlaceholderColor||"#a1a1aa",u=r.textareaFontSize||"14px",v=r.attachButtonBg||"#ffffff",k=r.attachButtonColor||"#71717a",z=r.emojiButtonColor||"#71717a",f=o?r.sendButtonBgActive||r.accentColor||"#0b5fff":r.sendButtonBgInactive||"#e4e4e7",A=o?r.sendButtonColorActive||"#ffffff":r.sendButtonColorInactive||"#a1a1aa";return l`
      <div
        class="composer"
        style="padding: ${n}; margin: ${i}; background: ${a}; border-radius: ${p}; border: 1px solid ${c}; box-shadow: ${g}; --placeholder-color: ${d}"
      >
        <input
          type="file"
          id="cw-file-input"
          class="file-input"
          accept="image/png,image/jpeg,image/gif,image/webp"
          style="display: none"
          @change="${this.handleFileSelect}"
        />

        ${this.attachmentsEnabled?l`
              <button
                type="button"
                class="attach-btn"
                aria-label="Attach"
                title="Attach"
                ?disabled="${this.uploading}"
                style="background: ${v}; color: ${k}"
                @click="${this.toggleAttach}"
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M8 3.5v9M3.5 8h9" />
                </svg>
              </button>
            `:""}

        <textarea
          rows="1"
          maxlength="4000"
          placeholder="Write a message…"
          aria-label="Message"
          .value="${this.draft}"
          style="color: ${b}; font-size: ${u}"
          @input="${this.handleInput}"
          @keydown="${this.handleKeyDown}"
          @focus="${()=>this.focused=!0}"
          @blur="${()=>this.focused=!1}"
        ></textarea>

        ${this.modernUi?l`
              <button
                type="button"
                aria-label="Emoji"
                style="background: transparent; color: ${z}; margin-right: 2px"
                @click="${this.toggleEmoji}"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8.5 14.5a4.5 4.5 0 007 0" />
                  <circle cx="9" cy="10" r="0.5" fill="currentColor" />
                  <circle cx="15" cy="10" r="0.5" fill="currentColor" />
                </svg>
              </button>
            `:""}

        <button
          type="button"
          aria-label="Send message"
          ?disabled="${!o}"
          style="background: ${f}; color: ${A}"
          @click="${this.send}"
        >
          ${r.sendIconType==="arrow"?l`
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              `:l`
                <svg class="send-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              `}
        </button>
      </div>
    `}},s.CwComposer.styles=[_,S`
      :host {
        display: block;
        width: 100%;
      }
      .composer {
        display: flex;
        align-items: center;
        gap: 6px;
        box-sizing: border-box;
        transition: all 0.2s ease;
      }
      textarea {
        flex: 1;
        border: none;
        resize: none;
        padding: 6px 12px;
        background: transparent;
        outline: none;
        font-family: inherit;
        height: 32px;
        min-height: 24px;
        max-height: 120px;
        overflow-y: auto;
        box-sizing: border-box;
      }
      textarea::placeholder {
        color: var(--placeholder-color, #a1a1aa) !important;
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: none;
        padding: 0;
        margin: 0;
        line-height: 0;
        box-sizing: border-box;
        cursor: pointer;
        flex-shrink: 0;
      }
      button:disabled {
        cursor: default;
      }
      .send-icon {
        transform: rotate(45deg);
        margin-left: 2px;
        margin-top: -2px;
      }
    `],H([h({type:Object})],s.CwComposer.prototype,"config",2),H([h({type:String})],s.CwComposer.prototype,"draft",2),H([h({type:Boolean})],s.CwComposer.prototype,"attachmentsEnabled",2),H([h({type:Boolean})],s.CwComposer.prototype,"modernUi",2),H([h({type:Boolean})],s.CwComposer.prototype,"uploading",2),H([dr()],s.CwComposer.prototype,"focused",2),s.CwComposer=H([B("cw-composer")],s.CwComposer);var St=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,kr=(t,r,e,o)=>{for(var n=o>1?void 0:o?Bt(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&St(r,e,n),n};s.CwGreetInput=class extends ${constructor(){super(...arguments),this.accentColor="#9333EA",this.draft=""}handleKeyDown(r){r.key==="Enter"&&this.submit()}handleInput(r){this.draft=r.target.value,w.get().draft=this.draft}submit(){window.dispatchEvent(new CustomEvent("toggle-contact-widget")),w.get().state="active",this.draft&&setTimeout(()=>w.send(),200)}render(){if(!this.config||!this.config.enabled||!this.config.visible)return l``;const r=this.config;if(r.layout==="separated"){const i=r.buttonBgColor||r.buttonColor||"#ffffff",a=r.buttonIconColor||this.accentColor,p=r.buttonSize||42;return l`
        <div class="input-container" style="gap: 8px">
          <div
            style="flex: 1; background-color: ${r.backgroundColor||"#ffffff"}; border-radius: ${r.borderRadius||24}px; box-shadow: ${r.boxShadow||"0 6px 16px rgba(0,0,0,0.12)"}; padding: 10px 16px; display: flex; align-items: center"
          >
            <input
              type="text"
              .value="${this.draft}"
              placeholder="${r.placeholder||"Write your message..."}"
              style="color: ${r.textColor||"#1e293b"}"
              @input="${this.handleInput}"
              @keydown="${this.handleKeyDown}"
            />
          </div>

          <button
            type="button"
            style="background-color: ${i}; color: ${a}; border-radius: 50%; width: ${p}px; height: ${p}px; box-shadow: ${r.buttonBoxShadow||"0 6px 16px rgba(0,0,0,0.12)"}"
            @click="${this.submit}"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="margin-left: 2px; margin-top: 1px">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      `}const o=r.buttonColor||"#9333EA",n=r.buttonIconColor||"#ffffff";return l`
      <div
        class="input-container"
        style="background-color: ${r.backgroundColor||"#ffffff"}; border-radius: ${r.borderRadius||24}px; box-shadow: ${r.boxShadow||"0 6px 16px rgba(0,0,0,0.12)"}; padding: 4px 4px 4px 16px"
      >
        <input
          type="text"
          .value="${this.draft}"
          placeholder="${r.placeholder||"Write your message..."}"
          style="color: ${r.textColor||"#1e293b"}"
          @input="${this.handleInput}"
          @keydown="${this.handleKeyDown}"
        />

        <button
          type="button"
          style="width: 38px; height: 38px; border-radius: 50%; background-color: ${o}; color: ${n}"
          @click="${this.submit}"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="margin-left: 2px; margin-top: 1px">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    `}},s.CwGreetInput.styles=S`
    :host {
      display: block;
      width: 100%;
    }
    .input-container {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;
      pointer-events: auto;
      box-sizing: border-box;
    }
    input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      width: 100%;
      font-size: 14px;
      font-family: inherit;
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: none;
      cursor: pointer;
      transition: transform 0.2s;
    }
    button:hover {
      transform: scale(1.05);
    }
  `,kr([h({type:Object})],s.CwGreetInput.prototype,"config",2),kr([h({type:String})],s.CwGreetInput.prototype,"accentColor",2),kr([h({type:String})],s.CwGreetInput.prototype,"draft",2),s.CwGreetInput=kr([B("cw-greet-input")],s.CwGreetInput);var Ot=Object.defineProperty,zt=Object.getOwnPropertyDescriptor,Yr=(t,r,e,o)=>{for(var n=o>1?void 0:o?zt(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&Ot(r,e,n),n};s.CwWelcomeCard=class extends ${constructor(){super(...arguments),this.accentColor="#0b5fff"}start(){w.startFromWelcome()}close(){w.closePanel()}render(){const r=this.config||{},e=r.headerTextColor||"#ffffff",o=r.bgGradient||"linear-gradient(135deg, #0b5fff, #22d3ee)",n=r.padding||"24px 20px 12px 20px",i=r.cardLayout==="glassy";return l`
      <div class="welcome-container" style="padding: ${n}; color: ${e}; background: ${o}">
        <div class="bg-blobs">
          <div class="blob-1"></div>
          <div class="blob-2"></div>
          <div class="blob-3"></div>
        </div>

        <div class="content-wrapper">
          <button type="button" class="close-btn" style="color: ${e}" @click="${this.close}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          ${i?l`
                <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between; width: 100%">
                  <div style="display: flex; flex-direction: column; height: 100%; margin-bottom: 12px; justify-content: ${r.cardAlign==="center"||r.cardPosition==="center"?"center":"space-between"}">
                    <!-- Top Logo / Icon -->
                    <div style="display: flex; align-items: center; margin-bottom: 20px; flex-shrink: 0; justify-content: ${r.logoAlign||(r.textAlign==="center"||r.cardAlign==="center"?"center":"flex-start")}">
                      ${r.logoUrl?l`<img src="${r.logoUrl}" style="height: 36px; object-fit: contain" />`:l`
                            <div style="color: ${e}; opacity: 1">
                              <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                              </svg>
                            </div>
                          `}
                    </div>

                    <!-- Glassy Container -->
                    <div
                      style="background: ${r.cardBg||"rgba(255, 255, 255, 0.12)"}; border: ${r.cardBorder||"1px solid rgba(255, 255, 255, 0.22)"}; border-radius: ${r.cardBorderRadius||24}px; padding: ${r.cardPadding||"32px 24px"}; backdrop-filter: blur(${r.cardBlur||16}px); -webkit-backdrop-filter: blur(${r.cardBlur||16}px); box-shadow: ${r.cardShadow||"0 12px 40px 0 rgba(0, 0, 0, 0.15)"}; display: flex; flex-direction: column; gap: 24px; flex: ${r.cardFlex||"1"}; width: ${r.cardWidth||"100%"}; min-height: ${r.cardMinHeight||"auto"}; justify-content: space-between"
                    >
                      <div style="display: flex; flex-direction: column; gap: 10px; text-align: ${r.textAlign||(r.cardAlign==="center"?"center":"left")}; align-items: ${r.textAlign==="center"||r.cardAlign==="center"?"center":"flex-start"}">
                        <h2 style="font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; margin: 0; font-size: ${r.titleFontSize||"28px"}; color: ${e}">
                          ${r.title||"Hi there! 👋 How can we help you today?"}
                        </h2>
                        <p style="font-size: ${r.descriptionFontSize||"16px"}; line-height: 1.5; font-weight: 400; margin: 0; color: ${r.subtextColor||"rgba(255,255,255,0.9)"}">
                          ${r.description||"Our support heroes are here to assist you."}
                        </p>

                        <!-- Overlapping Avatars -->
                        <div class="avatars-row" style="justify-content: ${r.avatarAlign||(r.textAlign==="center"||r.cardAlign==="center"?"center":"flex-start")}">
                          ${(r.avatars||[]).map((a,p)=>l`
                              <img
                                class="avatar-img"
                                src="${a}"
                                style="margin-left: ${p===0?"0":"-12px"}; border-color: ${r.avatarBorderColor||"rgba(255,255,255,0.2)"}; z-index: ${10+p}"
                              />
                            `)}
                        </div>
                      </div>

                      <!-- Button inside Glassy Card -->
                      <button
                        type="button"
                        class="start-btn"
                        style="background: ${r.buttonBg||"#ffffff"}; color: ${r.buttonTextColor||"#111827"}; border-radius: ${r.buttonBorderRadius||24}px; padding: ${r.buttonPadding||"18px 24px"}"
                        @click="${this.start}"
                      >
                        <div style="display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: ${r.buttonIconColor||this.accentColor}">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                          </svg>
                        </div>
                        <div style="display: flex; flex-direction: column; min-width: 0">
                          <span style="font-weight: 700; font-size: 15px; letter-spacing: -0.01em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: ${r.buttonTextColor||"#111827"}">
                            ${r.buttonText||"Start Conversation"}
                          </span>
                          <span style="font-size: 12px; font-weight: 500; opacity: 0.6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: ${r.buttonTextColor||"#111827"}">
                            ${r.buttonSubtext||"Typically replies in 5 minutes"}
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div class="footer-brand" style="color: ${r.subtextColor||"rgba(255,255,255,0.9)"}; padding-bottom: ${r.footerPaddingBottom||"0px"}">
                    <span>Powered by</span>&nbsp;
                    <a href="#" target="_blank">vAInatheya.ai</a>
                  </div>
                </div>
              `:l`
                <!-- Normal Layout -->
                <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between; width: 100%">
                  <div>
                    <div style="display: flex; align-items: center; justify-content: flex-start; margin-bottom: 28px">
                      ${r.logoUrl?l`<img src="${r.logoUrl}" style="height: 36px; object-fit: contain" />`:l`
                            <div style="color: ${e}; opacity: 1">
                              <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                              </svg>
                            </div>
                          `}
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; text-align: left">
                      <h2 style="font-weight: 800; font-size: ${r.titleFontSize||"28px"}; line-height: 1.15; letter-spacing: -0.02em">
                        ${r.title||"Hi there! 👋 How can we help you today?"}
                      </h2>
                      <p style="font-size: ${r.descriptionFontSize||"16px"}; line-height: 1.5; font-weight: 400; color: ${r.subtextColor||"rgba(255,255,255,0.9)"}">
                        ${r.description||"Our support heroes are here to assist you."}
                      </p>

                      <div class="avatars-row">
                        ${(r.avatars||[]).map((a,p)=>l`
                            <img
                              class="avatar-img"
                              src="${a}"
                              style="margin-left: ${p===0?"0":"-12px"}; border-color: ${r.avatarBorderColor||"rgba(255,255,255,0.2)"}; z-index: ${10+p}"
                            />
                          `)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      class="start-btn"
                      style="background: ${r.buttonBg||"#ffffff"}; color: ${r.buttonTextColor||"#111827"}; border-radius: ${r.buttonBorderRadius||24}px; padding: ${r.buttonPadding||"18px 24px"}; margin-bottom: 20px"
                      @click="${this.start}"
                    >
                      <div style="display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: ${r.buttonIconColor||this.accentColor}">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                        </svg>
                      </div>
                      <div style="display: flex; flex-direction: column; min-width: 0">
                        <span style="font-weight: 700; font-size: 15px; letter-spacing: -0.01em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: ${r.buttonTextColor||"#111827"}">
                          ${r.buttonText||"Start Conversation"}
                        </span>
                        <span style="font-size: 12px; font-weight: 500; opacity: 0.6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: ${r.buttonTextColor||"#111827"}">
                          ${r.buttonSubtext||"Typically replies in 5 minutes"}
                        </span>
                      </div>
                    </button>

                    <div class="footer-brand" style="color: ${r.subtextColor||"rgba(255,255,255,0.9)"}; padding-bottom: ${r.footerPaddingBottom||"0px"}">
                      <span>Powered by</span>&nbsp;
                      <a href="#" target="_blank">vAInatheya.ai</a>
                    </div>
                  </div>
                </div>
              `}
        </div>
      </div>
    `}},s.CwWelcomeCard.styles=[_,S`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
      .welcome-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
      }
      .bg-blobs {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }
      .blob-1 {
        position: absolute;
        top: -50%;
        right: -20%;
        width: 140%;
        height: 120%;
        background: linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 80%);
        border-radius: 50%;
        transform: rotate(-15deg);
      }
      .blob-2 {
        position: absolute;
        top: -20%;
        right: -30%;
        width: 120%;
        height: 100%;
        background: linear-gradient(200deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%);
        border-radius: 40% 60% 50% 50%;
        transform: rotate(10deg);
      }
      .blob-3 {
        position: absolute;
        bottom: -40%;
        left: -20%;
        width: 130%;
        height: 100%;
        background: linear-gradient(35deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 70%);
        border-radius: 50%;
        transform: rotate(-10deg);
      }
      .content-wrapper {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
      }
      .close-btn {
        position: absolute;
        top: -10px;
        right: -10px;
        border: none;
        background: transparent;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s, transform 0.2s;
      }
      .close-btn:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: scale(1.05);
      }
      .start-btn {
        display: flex;
        align-items: center;
        gap: 16px;
        width: 100%;
        border: none;
        cursor: pointer;
        text-align: left;
        transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        margin: 0;
      }
      .start-btn:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
      .avatars-row {
        display: flex;
        align-items: center;
        gap: 0;
        margin-top: 16px;
        width: 100%;
      }
      .avatar-img {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 2px solid;
        object-fit: cover;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .footer-brand {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 11px;
        font-weight: 500;
        opacity: 0.8;
        margin-top: auto;
        padding-top: 10px;
        flex-shrink: 0;
      }
      .footer-brand a {
        font-weight: 700;
        color: inherit;
        text-decoration: none;
      }
    `],Yr([h({type:Object})],s.CwWelcomeCard.prototype,"config",2),Yr([h({type:String})],s.CwWelcomeCard.prototype,"accentColor",2),s.CwWelcomeCard=Yr([B("cw-welcome-card")],s.CwWelcomeCard);var _t=Object.defineProperty,At=Object.getOwnPropertyDescriptor,Cr=(t,r,e,o)=>{for(var n=o>1?void 0:o?At(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&_t(r,e,n),n};s.CwFormsPreview=class extends ${constructor(){super(...arguments),this.type="prechat",this.heading="Submit a Support Ticket",this.subheading="We will get back to you within 24 hours."}render(){return this.type==="postchat"?l`
        <div class="phone-preview-card-container">
          <div class="phone-preview-header">
            Post-chat form preview
          </div>
          <form class="phone-preview-body" @submit="${r=>{r.preventDefault(),alert("Feedback submitted!")}}">
            <div style="text-align: center; margin-bottom: 4px">
              <h4 style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 6px">How was your experience?</h4>
              <p style="font-size: 12px; color: #64748b">Rate our customer support team</p>
            </div>

            <div style="display: flex; justify-content: center; gap: 8px; font-size: 24px; cursor: pointer; margin: 8px 0">
              <span title="Poor">😠</span>
              <span title="Neutral">😐</span>
              <span title="Good">😊</span>
              <span title="Great">😄</span>
              <span title="Excellent!" style="transform: scale(1.2)">😍</span>
            </div>

            <div class="phone-field-group">
              <label class="phone-field-label">Comments / Feedback</label>
              <textarea class="phone-field-input" rows="3" placeholder="Tell us what we did well or how we can improve..."></textarea>
            </div>

            <div class="phone-field-group">
              <label class="phone-field-label">Email (Optional)</label>
              <input type="email" class="phone-field-input" placeholder="Your email for follow-up" />
            </div>

            <button type="submit" class="phone-submit-btn">Submit Feedback</button>

            <div class="phone-footer-brand">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>Powered by <strong>REVE Chat</strong></span>
            </div>
          </form>
        </div>
      `:this.type==="ticket"?l`
        <div class="phone-preview-card-container">
          <div class="phone-preview-header">
            Ticket form preview
          </div>
          <form class="phone-preview-body" @submit="${r=>{r.preventDefault(),alert("Ticket submitted!")}}">
            <div style="margin-bottom: 6px">
              <h4 style="font-size: 15px; font-weight: 700; color: #0f172a">${this.heading}</h4>
              <p style="font-size: 12px; color: #64748b; margin-top: 2px">${this.subheading}</p>
            </div>

            <div class="phone-field-group">
              <label class="phone-field-label">Subject <span class="required-star">*</span></label>
              <input type="text" class="phone-field-input" placeholder="Brief summary of issue" required />
            </div>

            <div class="phone-field-group">
              <label class="phone-field-label">Description <span class="required-star">*</span></label>
              <textarea class="phone-field-input" rows="3" placeholder="Provide details about your inquiry" required></textarea>
            </div>

            <button type="submit" class="phone-submit-btn">Submit Ticket</button>

            <div class="phone-footer-brand">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>Powered by <strong>REVE Chat</strong></span>
            </div>
          </form>
        </div>
      `:l`
      <div class="phone-preview-card-container">
        <div class="phone-preview-header">
          Pre-chat form preview
        </div>
        <form class="phone-preview-body" @submit="${r=>{r.preventDefault(),alert("Form submitted successfully!")}}">
          <div class="phone-field-group">
            <label class="phone-field-label">Name <span class="required-star">*</span></label>
            <input type="text" class="phone-field-input active-focus" placeholder="Your name" value="Your name" required />
          </div>

          <div class="phone-field-group">
            <label class="phone-field-label">Email <span class="required-star">*</span></label>
            <input type="email" class="phone-field-input" placeholder="Your email" required />
          </div>

          <div class="phone-field-group">
            <label class="phone-field-label">Phone</label>
            <div class="phone-country-input-group">
              <div class="phone-country-select-btn">
                <span>🇺🇸</span>
                <span>+1</span>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <input type="tel" placeholder="Enter phone number" />
            </div>
          </div>

          <div class="phone-field-group">
            <label class="phone-field-label">Department</label>
            <div style="position: relative">
              <select class="phone-field-select">
                <option value="" selected>Select a department</option>
                <option value="sales">Sales & Business</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing & Invoices</option>
              </select>
              <div style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #64748b">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>

          <button type="submit" class="phone-submit-btn">Submit</button>

          <div class="phone-footer-brand">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>Powered by <strong>REVE Chat</strong></span>
          </div>
        </form>
      </div>
    `}},s.CwFormsPreview.styles=[_,S`
      :host {
        display: block;
        width: 100%;
      }
    `],Cr([h({type:String})],s.CwFormsPreview.prototype,"type",2),Cr([h({type:String})],s.CwFormsPreview.prototype,"heading",2),Cr([h({type:String})],s.CwFormsPreview.prototype,"subheading",2),s.CwFormsPreview=Cr([B("cw-forms-preview")],s.CwFormsPreview);var Et=Object.defineProperty,jt=Object.getOwnPropertyDescriptor,J=(t,r,e,o)=>{for(var n=o>1?void 0:o?jt(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&Et(r,e,n),n};s.CwBubble=class extends ${constructor(){super(...arguments),this.panelOpen=!1,this.unreadCount=0,this.hasSentMessage=!1,this.hovered=!1}connectedCallback(){super.connectedCallback(),this.unsub=Z("store:bubble",()=>this.requestUpdate())}disconnectedCallback(){var r;super.disconnectedCallback(),(r=this.unsub)==null||r.call(this)}handleClick(){window.dispatchEvent(new CustomEvent("toggle-contact-widget"))}render(){var Ne;const r=this.config||lr.get();if(r.hideOnOpen&&this.panelOpen)return l``;const e=r.width||60,o=r.height||60,n=r.offsetBottom!==void 0?r.offsetBottom:12,i=r.offsetRight!==void 0?r.offsetRight:16,a=Fr(r.borderRadius),p=Be(r),c=[Ce(r),Se(r)].filter(Boolean).join(", "),g=r.hoverScale!==void 0?r.hoverScale:1.05,b=this.hovered&&!this.panelOpen?`scale(${g})`:"scale(1.0)";let d="";if(r.glass&&r.glass.enabled){const j=r.glass.blur||10,q=r.glass.bgOpacity||.3;d=`backdrop-filter: blur(${j}px); -webkit-backdrop-filter: blur(${j}px); background-color: rgba(255, 255, 255, ${q});`}let u="";if(r.neon&&r.neon.enabled){const j=r.neon.color||"#22d3ee",q=r.neon.intensity||.8;u=`box-shadow: 0 0 ${20*q}px ${j}, inset 0 0 ${10*q}px ${j};`}const v=r.border||{},k=v.width?`border: ${v.width}px ${v.style||"solid"} ${v.color||"transparent"};`:"";let z="";r.idleAnim&&r.idleAnim.enabled&&r.idleAnim.type!=="none"&&!this.hovered&&!this.panelOpen&&(z=`animation: idleFloat ${r.idleAnim.duration||3200}ms ease-in-out infinite;`);const f=r.tooltip,A=f&&f.enabled&&!this.panelOpen&&!this.hasSentMessage,R=(f==null?void 0:f.position)||"left",qt=Ae(f==null?void 0:f.borderRadius,R);let fr="",E="";const rr=8,O=(f==null?void 0:f.borderWidth)||0,I=(f==null?void 0:f.borderColor)||"transparent";R==="left"?(fr="right: calc(100% + 12px); top: 50%; transform: translateY(-50%);",E=`right: -${rr/2}px; top: 50%; transform: translateY(-50%) rotate(45deg);`,O>0&&(E+=` border-top: ${O}px solid ${I}; border-right: ${O}px solid ${I};`)):R==="right"?(fr="left: calc(100% + 12px); top: 50%; transform: translateY(-50%);",E=`left: -${rr/2}px; top: 50%; transform: translateY(-50%) rotate(45deg);`,O>0&&(E+=` border-bottom: ${O}px solid ${I}; border-left: ${O}px solid ${I};`)):R==="top"?(fr="bottom: calc(100% + 12px); left: 50%; transform: translateX(-50%);",E=`bottom: -${rr/2}px; left: 50%; transform: translateX(-50%) rotate(45deg);`,O>0&&(E+=` border-bottom: ${O}px solid ${I}; border-right: ${O}px solid ${I};`)):R==="bottom"&&(fr="top: calc(100% + 12px); left: 50%; transform: translateX(-50%);",E=`top: -${rr/2}px; left: 50%; transform: translateX(-50%) rotate(45deg);`,O>0&&(E+=` border-top: ${O}px solid ${I}; border-left: ${O}px solid ${I};`));const Vt=r.dots&&r.dots.animation&&r.dots.animation!=="none"&&this.hovered&&!this.panelOpen;return l`
      <div
        class="bubble-wrapper"
        style="width: ${e}px; height: ${o}px; max-width: calc(100% - 24px); max-height: calc(100% - 24px); bottom: ${n}px; right: ${i}px; border-radius: ${a}; background: ${p}; background-blend-mode: ${r.backgroundBlendMode||"normal"}; box-shadow: ${c}; transform: ${b}; ${k} ${d} ${u} ${z}"
        @mouseenter="${()=>this.hovered=!0}"
        @mouseleave="${()=>this.hovered=!1}"
        @click="${this.handleClick}"
      >
        ${r.backgroundOverlayType==="image"&&r.backgroundImageUrl?l`
              <div
                class="overlay-img"
                style="background-image: url(${r.backgroundImageUrl}); background-size: ${r.backgroundImageSize||"contain"}; opacity: ${r.backgroundImageOpacity||.25}; mix-blend-mode: ${r.backgroundBlendMode||"normal"}; border-radius: inherit"
              ></div>
            `:""}

        ${r.backgroundOverlayType==="lucide"&&r.backgroundLucideIcon?l`
              <div
                class="overlay-icon"
                style="color: ${r.backgroundLucideColor||"#FFFFFF"}; opacity: ${r.backgroundLucideOpacity||.2}; mix-blend-mode: ${r.backgroundBlendMode||"normal"}"
              >
                <cw-icon .name="${r.backgroundLucideIcon}" .size="${r.backgroundLucideSize||24}"></cw-icon>
              </div>
            `:""}

        ${Vt?l`
              <div class="dots-container" style="gap: ${((Ne=r.dots)==null?void 0:Ne.spacing)||6}px">
                ${[0,1,2].map(j=>{var q,De,Ue,Le;return l`
                    <span
                      class="dot-span"
                      style="width: ${((q=r.dots)==null?void 0:q.size)||6}px; height: ${((De=r.dots)==null?void 0:De.size)||6}px; background-color: ${((Ue=r.dots)==null?void 0:Ue.color)||"#FFFFFF"}; animation: ${((Le=r.dots)==null?void 0:Le.animation)==="bounce"?`dotBounce 1.2s cubic-bezier(.2,.8,.2,1) ${j*.12}s infinite`:`dotPulse 1.4s cubic-bezier(.2,.8,.2,1) ${j*.1}s infinite`}"
                    ></span>
                  `})}
              </div>
            `:l`
              <div class="icon-container">
                ${this.panelOpen?l`
                      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    `:l`
                      <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%">
                        ${r.iconType==="image"&&(r.iconImageUrl||r.backgroundImageUrl)?l`
                              <img
                                src="${r.iconImageUrl||r.backgroundImageUrl}"
                                alt="bubble icon"
                                style="width: ${r.iconWidth||26}px; height: ${r.iconHeight||26}px; object-fit: ${r.iconFit||"contain"}; opacity: ${r.iconOpacity!==void 0?r.iconOpacity:1}; mix-blend-mode: ${r.iconBlend||"normal"}; border-radius: 50%"
                              />
                            `:r.iconType==="customSvg"&&r.customSvg?l`
                              <cw-icon .customSvg="${r.customSvg}" .size="${r.iconWidth||26}" .color="${r.iconColor||"#ffffff"}"></cw-icon>
                            `:l`
                              <cw-icon
                                .name="${r.lucideIcon||r.backgroundLucideIcon||"MessageSquare"}"
                                .size="${r.iconWidth||26}"
                                .color="${r.iconColor||"#ffffff"}"
                              ></cw-icon>
                            `}
                      </div>
                    `}
              </div>
            `}

        ${r.outlineRing&&r.outlineRing.enabled?l`
              <div
                style="position: absolute; inset: 0; pointer-events: none; border-radius: inherit; box-shadow: 0 0 0 ${r.outlineRing.width||3}px ${$e(r.outlineRing.color||"#22d3ee",r.outlineRing.opacity||.4)}"
              ></div>
            `:""}

        ${this.unreadCount>0?l`<cw-badge .count="${this.unreadCount}" .config="${r.badge}"></cw-badge>`:""}

        ${A?l`
              <div
                class="tooltip-box"
                style="background-color: ${(f==null?void 0:f.backgroundColor)||"#ffffff"}; color: ${(f==null?void 0:f.textColor)||"#374151"}; font-size: ${(f==null?void 0:f.fontSize)||14}px; padding: ${(f==null?void 0:f.padding)||"8px 16px"}; border-radius: ${qt}; box-shadow: ${(f==null?void 0:f.boxShadow)||"0 4px 12px rgba(0,0,0,0.1)"}; border: ${(f==null?void 0:f.borderWidth)||0}px solid ${(f==null?void 0:f.borderColor)||"transparent"}; ${fr}"
              >
                <span>${(f==null?void 0:f.text)||"Chat with us"}</span>
                ${(f==null?void 0:f.arrowEnabled)!==!1?l`
                      <div
                        class="tooltip-arrow"
                        style="width: ${rr}px; height: ${rr}px; background-color: ${(f==null?void 0:f.backgroundColor)||"#ffffff"}; ${E}"
                      ></div>
                    `:""}
              </div>
            `:""}
      </div>
    `}},s.CwBubble.styles=[_,S`
      :host {
        display: block;
      }
      .bubble-wrapper {
        position: fixed;
        z-index: 40;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;
        transform-style: preserve-3d;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, background 0.3s ease;
        max-width: calc(100% - 24px);
        max-height: calc(100% - 24px);
      }
      .overlay-img {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-repeat: no-repeat;
        background-position: center;
      }
      .overlay-icon {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      .icon-container {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        color: #ffffff;
      }
      .dots-container {
        position: absolute;
        display: flex;
        z-index: 10;
      }
      .dot-span {
        border-radius: 50%;
      }
      .tooltip-box {
        position: absolute;
        white-space: nowrap;
        pointer-events: auto;
        z-index: 100;
        box-sizing: border-box;
      }
      .tooltip-arrow {
        position: absolute;
        box-sizing: border-box;
        pointer-events: none;
      }
    `],J([h({type:Object})],s.CwBubble.prototype,"config",2),J([h({type:Boolean})],s.CwBubble.prototype,"panelOpen",2),J([h({type:Number})],s.CwBubble.prototype,"unreadCount",2),J([h({type:Boolean})],s.CwBubble.prototype,"hasSentMessage",2),J([dr()],s.CwBubble.prototype,"hovered",2),s.CwBubble=J([B("cw-bubble")],s.CwBubble);var Tt=Object.defineProperty,Pt=Object.getOwnPropertyDescriptor,gr=(t,r,e,o)=>{for(var n=o>1?void 0:o?Pt(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&Tt(r,e,n),n};s.CwChatbar=class extends ${constructor(){super(...arguments),this.panelOpen=!1,this.unreadCount=0,this.hovered=!1}connectedCallback(){super.connectedCallback(),this.unsub=Z("store:chatbar",()=>this.requestUpdate())}disconnectedCallback(){var r;super.disconnectedCallback(),(r=this.unsub)==null||r.call(this)}handleClick(){window.dispatchEvent(new CustomEvent("toggle-contact-widget"))}render(){const r=this.config||{};if(!r.enabled||r.hideOnOpen&&this.panelOpen)return l``;const e=r.layout==="card",o=r.width||(e?240:255),n=r.height||(e?220:40),i=r.offsetBottom!==void 0?r.offsetBottom:12,a=r.offsetRight!==void 0?r.offsetRight:16,p=Oe(r),c=Fr(r.borderRadius,"20px"),g=this.hovered?"scale(1.02)":"scale(1.0)",b=r.padding!==void 0?r.padding:e?"24px 16px":"0 16px",d=r.gap!==void 0?`${r.gap}px`:e?"14px":"0";return l`
      <div
        class="chatbar-wrapper"
        style="width: ${o}px; height: ${n}px; max-width: calc(100% - 24px); max-height: calc(100% - 24px); bottom: ${i}px; right: ${a}px; background: ${p}; color: ${r.textColor||"#ffffff"}; border-radius: ${c}; box-shadow: ${r.shadow?"0 4px 16px rgba(0,0,0,0.15)":"none"}; padding: ${b}; transform: ${g}; flex-direction: ${e?"column":"row"}; gap: ${d}"
        @mouseenter="${()=>this.hovered=!0}"
        @mouseleave="${()=>this.hovered=!1}"
        @click="${this.handleClick}"
      >
        ${e?l`
              <!-- CARD LAYOUT (Vertical) -->
              <div class="card-layout" style="gap: ${r.gap!==void 0?r.gap:14}px">
                <div style="display: flex; align-items: center; justify-content: center; position: relative">
                  ${r.iconType==="image"&&r.iconImageUrl?l`
                        <img
                          src="${r.iconImageUrl}"
                          alt="icon"
                          style="object-fit: ${r.iconFit||"contain"}; opacity: ${r.iconOpacity!==void 0?r.iconOpacity:1}; width: ${r.iconWidth||24}px; height: ${r.iconHeight||24}px; mix-blend-mode: ${r.iconBlend||"normal"}"
                        />
                      `:r.iconType==="customSvg"&&r.customSvg?l`<cw-icon .customSvg="${r.customSvg}" .size="${r.iconWidth||28}" .color="${r.iconColor||"#ffffff"}"></cw-icon>`:l`<cw-icon .name="${r.lucideIcon||"MessageCircle"}" .size="${r.iconWidth||24}" .color="${r.iconColor||"#ffffff"}"></cw-icon>`}
                </div>

                <span style="font-weight: 700; line-height: 1.35; white-space: pre-line; text-align: center; font-size: ${r.textSize||16}px; letter-spacing: ${r.letterSpacing||0}px">
                  ${r.cardText||r.text||"Questions about PayPal?"}
                </span>

                <div
                  style="background-color: ${r.buttonBg||"#ffffff"}; color: ${r.buttonTextColor||r.bgColor||"#003087"}; font-weight: 700; border-radius: 9999px; display: flex; align-items: center; justify-content: center; padding: 10px 24px; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); width: 85%"
                >
                  <span>${r.buttonText||"Chat Now"}</span>
                </div>

                ${this.unreadCount>0?l`<span class="badge">${this.unreadCount}</span>`:""}
              </div>
            `:l`
              <!-- BAR LAYOUT (Horizontal) -->
              <div class="bar-layout">
                <span
                  style="font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0; text-align: left; font-size: ${ze(r.textSize,r.height)}; letter-spacing: ${r.letterSpacing||0}px; color: ${r.textColor||"#ffffff"}"
                >
                  ${(r.text||"Chat with us").replace(/\n/g," ")}
                </span>

                <div style="display: flex; align-items: center; justify-content: center; position: relative; flex-shrink: 0; margin-left: 8px">
                  ${r.iconType==="image"&&r.iconImageUrl?l`
                        <img
                          src="${r.iconImageUrl}"
                          alt="icon"
                          style="object-fit: ${r.iconFit||"contain"}; opacity: ${r.iconOpacity!==void 0?r.iconOpacity:1}; width: ${mr(r.iconWidth,r.height,"image")}px; height: ${_e(r.iconHeight,r.height,"image")}px; mix-blend-mode: ${r.iconBlend||"normal"}"
                        />
                      `:r.iconType==="customSvg"&&r.customSvg?l`
                        <cw-icon
                          .customSvg="${r.customSvg}"
                          .size="${mr(r.iconWidth,r.height,"customSvg")}"
                          .color="${r.iconColor||"#ffffff"}"
                        ></cw-icon>
                      `:l`
                        <cw-icon
                          .name="${r.lucideIcon||"MessageCircle"}"
                          .size="${mr(r.iconWidth,r.height,"lucide")}"
                          .color="${r.iconColor||"#ffffff"}"
                        ></cw-icon>
                      `}

                  ${this.unreadCount>0?l`<span class="bar-badge">${this.unreadCount}</span>`:""}
                </div>
              </div>
            `}
      </div>
    `}},s.CwChatbar.styles=[_,S`
      :host {
        display: block;
      }
      .chatbar-wrapper {
        position: fixed;
        z-index: 40;
        display: flex;
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        max-width: calc(100% - 24px);
        max-height: calc(100% - 24px);
      }
      .card-layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
      .bar-layout {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
      }
      .badge {
        position: absolute;
        top: -6px;
        right: -6px;
        background-color: #dc2626;
        color: #ffffff;
        font-weight: 700;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 20px;
        height: 20px;
        font-size: 11px;
        border: 2px solid #ffffff;
        z-index: 50;
        box-shadow: 0 2px 5px rgba(0,0,0,0.15);
      }
      .bar-badge {
        position: absolute;
        top: -10px;
        right: -10px;
        background-color: #dc2626;
        color: #ffffff;
        font-weight: 700;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        height: 18px;
        font-size: 10px;
        border: 1.5px solid #ffffff;
        z-index: 50;
        box-shadow: 0 1px 3px rgba(0,0,0,0.15);
      }
    `],gr([h({type:Object})],s.CwChatbar.prototype,"config",2),gr([h({type:Boolean})],s.CwChatbar.prototype,"panelOpen",2),gr([h({type:Number})],s.CwChatbar.prototype,"unreadCount",2),gr([dr()],s.CwChatbar.prototype,"hovered",2),s.CwChatbar=gr([B("cw-chatbar")],s.CwChatbar);var Mt=Object.defineProperty,Wt=Object.getOwnPropertyDescriptor,Q=(t,r,e,o)=>{for(var n=o>1?void 0:o?Wt(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&Mt(r,e,n),n};s.CwGreetWindow=class extends ${constructor(){super(...arguments),this.panelOpen=!1,this.hasSentMessage=!1}connectedCallback(){super.connectedCallback(),this.unsub=Z("store:greetWindow",()=>this.requestUpdate())}disconnectedCallback(){var r;super.disconnectedCallback(),(r=this.unsub)==null||r.call(this)}handleDismiss(r){r.stopPropagation(),this.config&&(this.config.dismissed=!0,xr.get().dismissed=!0,this.requestUpdate())}handleCardClick(){window.dispatchEvent(new CustomEvent("toggle-contact-widget"))}render(){const r=this.config||xr.get(),e=this.chatbarConfig||$r.get(),o=this.bubbleConfig||lr.get(),n=e.enabled;if(!(!(n?e.hideOnOpen:o.hideOnOpen)||!this.panelOpen)||this.hasSentMessage||!r||!r.enabled||r.dismissed||!r.visible)return l``;const p=n?e.offsetBottom!==void 0?e.offsetBottom:12:o.offsetBottom!==void 0?o.offsetBottom:12,c=n?e.height||(e.layout==="card"?220:40):o.height||60,g=r.spacing!==void 0?r.spacing:16,b=p+c+g,d=n?e.offsetRight!==void 0?parseInt(String(e.offsetRight)):16:o.offsetRight!==void 0?parseInt(String(o.offsetRight)):16,u=r.width||320,v=r.iconAlign==="left"?"flex-start":r.iconAlign==="right"?"flex-end":"center",k=`calc(100% - ${b+24}px)`;return l`
      <div
        class="greet-wrapper"
        style="bottom: ${b}px; right: ${d}px; width: ${u}px; max-width: calc(100% - 24px); max-height: ${k}"
      >
        <!-- Close Button -->
        <div class="close-row">
          <button type="button" class="close-btn" @click="${this.handleDismiss}">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Greet Card -->
        <div
          class="greet-card"
          style="background-color: ${r.backgroundColor||"#ffffff"}; border-radius: ${r.borderRadius||16}px; padding: ${r.padding||"24px 20px"}; box-shadow: ${r.boxShadow||"0 12px 28px -6px rgba(0,0,0,0.15), 0 8px 14px -4px rgba(0,0,0,0.1)"}"
          @click="${this.handleCardClick}"
        >
          ${r.imageUrl||r.iconType==="lucide"&&r.lucideIcon?l`
                <div style="width: 100%; display: flex; align-items: center; margin-bottom: 16px; justify-content: ${v}">
                  ${r.imageUrl?l`
                        <img
                          src="${r.imageUrl}"
                          class="${Gr(r.iconAnimation)}"
                          style="display: block; margin: ${r.iconAlign==="center"?"0 auto":"0"}; height: ${r.imageHeight||70}px; width: ${r.imageWidth?`${r.imageWidth}px`:"auto"}; object-fit: contain; padding: ${r.imagePadding||"0px"}"
                        />
                      `:l`
                        <div
                          class="${Gr(r.iconAnimation)}"
                          style="width: ${r.iconSize||48}px; height: ${r.iconSize||48}px; color: ${r.iconColor||"#9333EA"}"
                        >
                          <cw-icon .name="${r.lucideIcon}" .size="${r.iconSize||48}" .color="${r.iconColor||"#9333EA"}"></cw-icon>
                        </div>
                      `}
                </div>
              `:""}

          <h3 style="color: ${r.titleColor||"#1e293b"}; font-size: ${r.titleFontSize||"15px"}; font-weight: 700; line-height: 1.4; margin: 0 0 8px 0; letter-spacing: -0.01em">
            ${r.title}
          </h3>

          <p style="color: ${r.descriptionColor||"#475569"}; font-size: ${r.descriptionFontSize||"14px"}; line-height: 1.5; margin: 0">
            ${r.description}
          </p>
        </div>

        <!-- Quick Input Box -->
        <cw-greet-input .config="${r.inputBox}" .accentColor="${r.iconColor||"#9333EA"}"></cw-greet-input>
      </div>
    `}},s.CwGreetWindow.styles=[_,S`
      :host {
        display: block;
      }
      .greet-wrapper {
        position: fixed;
        z-index: 30;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        box-sizing: border-box;
        pointer-events: none;
        gap: 12px;
        transition: opacity 0.3s ease, transform 0.3s ease;
        max-width: calc(100% - 24px);
      }
      .close-row {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding-right: 2px;
        pointer-events: auto;
      }
      .close-btn {
        border: none;
        background: #475569;
        color: #ffffff;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        transition: transform 0.2s, background-color 0.2s;
      }
      .close-btn:hover {
        background: #1e293b;
        transform: scale(1.05);
      }
      .greet-card {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
        overflow-y: auto;
        cursor: pointer;
        pointer-events: auto;
        box-sizing: border-box;
      }
    `],Q([h({type:Object})],s.CwGreetWindow.prototype,"config",2),Q([h({type:Object})],s.CwGreetWindow.prototype,"chatbarConfig",2),Q([h({type:Object})],s.CwGreetWindow.prototype,"bubbleConfig",2),Q([h({type:Boolean})],s.CwGreetWindow.prototype,"panelOpen",2),Q([h({type:Boolean})],s.CwGreetWindow.prototype,"hasSentMessage",2),s.CwGreetWindow=Q([B("cw-greet-window")],s.CwGreetWindow);var Rt=Object.defineProperty,It=Object.getOwnPropertyDescriptor,F=(t,r,e,o)=>{for(var n=o>1?void 0:o?It(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&Rt(r,e,n),n};s.CwChatHeader=class extends ${constructor(){super(...arguments),this.isExpanded=!1,this.clientName="Support",this.agentName="Sarah",this.state="active"}connectedCallback(){super.connectedCallback(),this.unsub=vr(()=>this.requestUpdate())}disconnectedCallback(){var r;super.disconnectedCallback(),(r=this.unsub)==null||r.call(this)}toggleExpand(){w.toggleExpand()}toggleMenu(){w.get().menuOpen=!w.get().menuOpen,w.get()}closePanel(){w.closePanel(),window.dispatchEvent(new CustomEvent("close-contact-widget"))}askEndChat(){w.askEndChat()}render(){var u,v,k,z,f,A,R;const r=w.get(),e=this.state||r.state;if(e==="welcome")return l``;const o=this.config&&Object.keys(this.config).length>0?this.config:cr.get(),n=this.features&&Object.keys(this.features).length>0?this.features:yr.get(),i=o.headerTextColor||"#ffffff",a=(n.voiceCallMaster||((u=o.features)==null?void 0:u.voiceCallMaster))&&(n.voiceCallAgents||((v=o.features)==null?void 0:v.voiceCallAgents)||n.voiceCallVisitors||((k=o.features)==null?void 0:k.voiceCallVisitors)),p=(n.videoCallMaster||((z=o.features)==null?void 0:z.videoCallMaster))&&(n.videoCallAgents||((f=o.features)==null?void 0:f.videoCallAgents)||n.videoCallVisitors||((A=o.features)==null?void 0:A.videoCallVisitors)),c=n.closeChatVisitor||((R=o.features)==null?void 0:R.closeChatVisitor),g=this.agentName||o.agentName||r.agentName,b=this.clientName||o.clientName||r.clientName||"Support",d=e==="active"&&g?`${g} · Online`:"Online";return l`
      <header
        class="panel-header"
        style="background: ${o.headerBg||"var(--cw-grad)"}; color: ${i}; padding: ${o.headerPadding||"14px 16px"}; border-bottom: ${o.headerBorderColor?`1px solid ${o.headerBorderColor}`:"1px solid rgba(0,0,0,0.08)"}"
      >
        <div class="left-section">
          ${o.modernUi!==!1?l`
                <button
                  type="button"
                  class="icon-btn"
                  aria-label="${this.isExpanded?"Collapse chat":"Expand chat"}"
                  style="color: ${i}; opacity: 0.7"
                  @click="${this.toggleExpand}"
                >
                  ${this.isExpanded?l`
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
                        </svg>
                      `:l`
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      `}
                </button>
              `:""}

          <cw-avatar
            .name="${b}"
            .bg="${o.headerAvatarBg||(i==="#18181b"?"#e4e4e7":"rgba(255,255,255,0.2)")}"
            .color="${o.headerAvatarColor||i}"
            .size="${32}"
            .activeDot="${o.activeDot}"
          ></cw-avatar>

          <div class="info-col">
            <span class="title-text" style="font-size: ${o.headerTitleFontSize||"14px"}">${b}</span>
            <span class="subtitle-text" style="font-size: ${o.headerSubtitleFontSize||"11px"}">${d}</span>
          </div>
        </div>

        <div class="actions-section">
          ${a?l`
                <button
                  type="button"
                  class="icon-btn"
                  aria-label="Start voice call"
                  title="Voice call"
                  style="color: ${i}; opacity: 0.9"
                  @click="${()=>alert("Initiating voice call...")}"
                >
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </button>
              `:""}

          ${p?l`
                <button
                  type="button"
                  class="icon-btn"
                  aria-label="Start video call"
                  title="Video call"
                  style="color: ${i}; opacity: 0.9"
                  @click="${()=>alert("Initiating video call...")}"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="3" ry="3"></rect>
                  </svg>
                </button>
              `:""}

          ${c?l`
                <button
                  type="button"
                  class="icon-btn"
                  aria-label="End chat session"
                  title="End chat"
                  style="color: ${i}; opacity: 0.7"
                  @click="${this.askEndChat}"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
                  </svg>
                </button>
              `:""}

          ${o.modernUi!==!1?l`
                <button
                  type="button"
                  class="icon-btn"
                  aria-label="Chat options"
                  style="color: ${i}; opacity: 0.7"
                  @click="${this.toggleMenu}"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <circle cx="5" cy="12" r="1.8" />
                    <circle cx="12" cy="12" r="1.8" />
                    <circle cx="19" cy="12" r="1.8" />
                  </svg>
                </button>
              `:""}

          <button
            type="button"
            class="icon-btn"
            aria-label="Minimize chat panel"
            style="color: ${i}; opacity: 0.7"
            @click="${this.closePanel}"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>
    `}},s.CwChatHeader.styles=[_,S`
      :host {
        display: block;
        width: 100%;
        flex-shrink: 0;
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        box-sizing: border-box;
        flex-shrink: 0;
      }
      .left-section {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }
      .info-col {
        display: flex;
        flex-direction: column;
        text-align: left;
        min-width: 0;
      }
      .title-text {
        font-weight: 700;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .subtitle-text {
        opacity: 0.8;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .actions-section {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-shrink: 0;
      }
      .icon-btn {
        background: transparent;
        border: none;
        padding: 4px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
      }
      .icon-btn:hover {
        opacity: 1 !important;
      }
    `],F([h({type:Object})],s.CwChatHeader.prototype,"config",2),F([h({type:Object})],s.CwChatHeader.prototype,"features",2),F([h({type:Boolean})],s.CwChatHeader.prototype,"isExpanded",2),F([h({type:String})],s.CwChatHeader.prototype,"clientName",2),F([h({type:String})],s.CwChatHeader.prototype,"agentName",2),F([h({type:String})],s.CwChatHeader.prototype,"state",2),s.CwChatHeader=F([B("cw-chat-header")],s.CwChatHeader);var Nt=Object.defineProperty,Dt=Object.getOwnPropertyDescriptor,Kr=(t,r,e,o)=>{for(var n=o>1?void 0:o?Dt(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&Nt(r,e,n),n};s.CwChatBody=class extends ${connectedCallback(){super.connectedCallback(),this.unsub=Z("store:chat",()=>{this.requestUpdate(),this.scrollToBottom()})}disconnectedCallback(){var r;super.disconnectedCallback(),(r=this.unsub)==null||r.call(this)}scrollToBottom(){setTimeout(()=>{var e;const r=(e=this.shadowRoot)==null?void 0:e.querySelector(".messages-area");r&&(r.scrollTop=r.scrollHeight)},50)}handleDraftChange(r){w.get().draft=r.detail}handleSendMessage(r){w.send()}render(){var d;const r=this.chatState||w.get(),e=this.chatWindowConfig||cr.get(),o=r.state==="welcome",n=r.state==="boot",i=r.state==="prechat",a=r.state==="offline",p=r.state==="offline-sent",c=r.state==="queued",g=r.state==="active",b=r.state==="closed";return l`
      <div
        class="panel-body"
        style="background: ${o?((d=e.welcome)==null?void 0:d.bgGradient)||"linear-gradient(135deg, #0b5fff, #22d3ee)":e.bodyBg||"var(--cw-bg)"}; padding: ${o?"0px":""}"
      >
        <!-- WELCOME SCREEN -->
        ${o?l`<cw-welcome-card .config="${e.welcome}" .accentColor="${e.accentColor}"></cw-welcome-card>`:""}

        <!-- BOOT / CONNECTING -->
        ${n?l`
              <div class="center-note">
                <div class="spinner"></div>
                <p>Connecting…</p>
              </div>
            `:""}

        <!-- PRECHAT FORM -->
        ${i?l`
              <div class="prechat">
                <div class="avatar prechat-avatar">
                  <span>${(r.clientName||e.clientName||"S").charAt(0)}</span>
                </div>
                <h2>Hi there 👋</h2>
                <p class="muted">Tell us who you are and we'll connect you with an agent right away.</p>
                <form @submit="${u=>{u.preventDefault(),r.state="active",w.get().state="active",this.requestUpdate()}}">
                  <label>Name</label>
                  <input required maxlength="120" placeholder="Your name" />
                  <label>Email</label>
                  <input type="email" required maxlength="160" placeholder="you@example.com" />
                  <button type="submit" class="primary">Start chat</button>
                </form>
              </div>
            `:""}

        <!-- OFFLINE FORM -->
        ${a?l`
              <div class="prechat">
                <div class="avatar prechat-avatar offline-avatar">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 8v4M12 16h.01" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <h2>We're not around right now</h2>
                <p class="muted">Our agents are offline. Leave your details and a message — we'll pick it up the moment someone is back.</p>
                <form @submit="${u=>{u.preventDefault(),w.submitOffline()}}">
                  <label>Name</label>
                  <input
                    required
                    maxlength="120"
                    placeholder="Your name"
                    .value="${r.offlineName}"
                    @input="${u=>r.offlineName=u.target.value}"
                  />
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    maxlength="160"
                    placeholder="you@example.com"
                    .value="${r.offlineEmail}"
                    @input="${u=>r.offlineEmail=u.target.value}"
                  />
                  <label>Message</label>
                  <textarea
                    rows="3"
                    class="offline-msg"
                    required
                    maxlength="4000"
                    placeholder="How can we help?"
                    .value="${r.offlineMessage}"
                    @input="${u=>r.offlineMessage=u.target.value}"
                  ></textarea>
                  <button type="submit" class="primary" ?disabled="${r.offlineSending}">
                    ${r.offlineSending?"Sending…":"Leave message"}
                  </button>
                </form>
              </div>
            `:""}

        <!-- OFFLINE SENT CONFIRMATION -->
        ${p?l`
              <div class="queued">
                <div class="ticket offline-done">
                  <div class="done-check">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 12.5l5 5L20 6.5" />
                    </svg>
                  </div>
                  <h2>Message received</h2>
                  <p class="muted">
                    Thanks${r.offlineName?`, ${r.offlineName}`:""}! We've saved your message and will reply to <strong>${r.offlineEmail}</strong> as soon as an agent is back.
                  </p>
                </div>
              </div>
            `:""}

        <!-- QUEUED STATE -->
        ${c?l`
              <div class="queued">
                <div class="ticket">
                  <div class="ticket-number">${r.position}</div>
                  <div class="ticket-label">in line</div>
                  <p class="muted">An agent will be with you shortly.</p>
                </div>
              </div>
            `:""}

        <!-- ACTIVE CHAT / CLOSED MESSAGES -->
        ${g||b?l`
              <div class="messages-area" style="background: ${e.bodyBg||"var(--cw-bg)"}">
                ${r.messages.map((u,v)=>{const k=w.dividerBefore(v),z=w.groupEnd(v),f=w.groupStart(v);return l`
                    ${k?l`<div class="day-divider">${w.dayLabel()}</div>`:""}

                    <cw-message-bubble
                      .message="${u}"
                      .chatWindowConfig="${e}"
                      .isGroupEnd="${z}"
                      .isGroupStart="${f}"
                      .agentName="${r.agentName}"
                    ></cw-message-bubble>
                  `})}

                ${r.typingName&&w.flag("chat.typingIndicator",!0)?l`
                      <div class="bubble-row from-agent g-start g-end" style="margin-top: 4px">
                        <div class="bubble typing-bubble">
                          <span class="sr-only">${r.typingName}</span>
                          <span class="typing-dots"><cw-typing-dots></cw-typing-dots></span>
                        </div>
                      </div>
                    `:""}
              </div>

              <!-- CONSENT BANNER -->
              ${g&&!r.consentDismissed&&w.flag("widget.modernUi",!0)?l`
                    <div class="consent">
                      <p>By chatting here you agree this conversation may be processed and recorded to provide support.</p>
                      <button type="button" class="consent-x" aria-label="Dismiss" @click="${()=>w.dismissConsent()}">✕</button>
                    </div>
                  `:""}

              <!-- ATTACHMENT POPUP -->
              ${r.attachOpen?l`
                    <div class="attach-pop">
                      <button type="button" class="menu-item" @click="${()=>{var u,v;r.attachOpen=!1,(v=(u=this.shadowRoot)==null?void 0:u.querySelector("#cw-file-input"))==null||v.click()}}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <circle cx="8.5" cy="10" r="1.5" />
                          <path d="M21 15l-4.5-4.5L9 18" />
                        </svg>
                        Send an image
                      </button>
                      <button type="button" class="menu-item" @click="${()=>w.captureScreenshot()}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        Add screenshot
                      </button>
                    </div>
                  `:""}

              <!-- MENU POPUP -->
              ${r.menuOpen?l`
                    <div class="menu-pop">
                      <button type="button" class="menu-item" @click="${()=>w.downloadTranscript()}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                        </svg>
                        Download transcript
                      </button>
                      <button type="button" class="menu-item" @click="${()=>w.toggleSounds()}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M11 5L6 9H3v6h3l5 4V5zM16 9a4 4 0 010 6" />
                        </svg>
                        Sounds: ${r.soundsOn?"ON":"OFF"}
                      </button>
                    </div>
                  `:""}

              <!-- EMOJI PICKER -->
              ${r.emojiOpen?l`
                    <div class="emoji-row">
                      ${["😀","😂","😊","😍","👍","👎","🙏","🎉","❤️","😢","😮","👌"].map(u=>l`
                          <button type="button" class="emoji-btn" @click="${()=>{r.draft+=u,this.requestUpdate()}}">${u}</button>
                        `)}
                    </div>
                  `:""}

              <!-- COMPOSER BAR (ACTIVE STATE) -->
              ${g?l`
                    <cw-composer
                      .config="${e}"
                      .draft="${r.draft}"
                      .attachmentsEnabled="${w.flag("attachments.enabled",!0)}"
                      .modernUi="${w.flag("widget.modernUi",!0)}"
                      .uploading="${r.uploading}"
                      @draft-change="${this.handleDraftChange}"
                      @send-message="${this.handleSendMessage}"
                      @toggle-attach="${()=>{r.attachOpen=!r.attachOpen,r.emojiOpen=!1,this.requestUpdate()}}"
                      @toggle-emoji="${()=>{r.emojiOpen=!r.emojiOpen,r.attachOpen=!1,this.requestUpdate()}}"
                    ></cw-composer>

                    <div
                      class="panel-footer"
                      style="padding-bottom: ${e.footerPaddingBottom||"16px"}; background: ${e.footerBg||e.bodyBg||"#ffffff"}; border-bottom-left-radius: ${e.widgetBorderRadius||24}px; border-bottom-right-radius: ${e.widgetBorderRadius||24}px"
                    >
                      ${w.flag("widget.modernUi",!0)?l`
                            <div class="powered" style="font-size: ${e.footerFontSize||"11px"}; color: ${e.footerTextColor||"var(--cw-muted)"}">
                              <span>Powered by</span>
                              <a href="${e.poweredByLink||"#"}" target="_blank" style="color: ${e.poweredByColor||"#a1a1aa"}">
                                ${e.poweredByText||"vAInatheya.ai"}
                              </a>
                            </div>
                          `:""}
                    </div>
                  `:""}

              <!-- CLOSED NOTE -->
              ${b?l`
                    <div class="closed-note">
                      <p>Chat ended</p>
                      <button type="button" class="primary" @click="${()=>w.startNew()}">Start new chat</button>
                    </div>
                  `:""}
            `:""}
      </div>
    `}},s.CwChatBody.styles=[_,S`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        position: relative;
        overflow: hidden;
      }
      .panel-body {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        position: relative;
        overflow: hidden;
      }
      .messages-area {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        scroll-behavior: smooth;
      }
      .day-divider {
        text-align: center;
        font-size: 11px;
        color: var(--cw-muted, #71717a);
        margin: 12px 0 8px 0;
        position: relative;
      }
      .center-note {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 12px;
        color: var(--cw-muted);
      }
      .spinner {
        width: 24px;
        height: 24px;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: zotly-spin 1s linear infinite;
      }
      .prechat {
        padding: 24px 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow-y: auto;
      }
      .prechat h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 700;
      }
      .prechat p.muted {
        margin: 0;
        font-size: 13px;
        color: var(--cw-muted);
      }
      .prechat form {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .prechat label {
        font-size: 12px;
        font-weight: 600;
        color: var(--cw-ink);
      }
      .prechat input, .prechat textarea {
        padding: 10px 12px;
        border-radius: 8px;
        border: 1px solid var(--cw-border);
        background: var(--cw-surface);
        color: var(--cw-ink);
        font-family: inherit;
        font-size: 14px;
        outline: none;
      }
      .prechat button.primary {
        padding: 12px;
        border-radius: 9999px;
        border: none;
        background: var(--cw-accent, #0b5fff);
        color: #ffffff;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        margin-top: 6px;
      }
      .queued {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 24px;
        text-align: center;
      }
      .ticket {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .ticket-number {
        font-size: 48px;
        font-weight: 800;
        color: var(--cw-accent);
      }
      .ticket-label {
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .done-check {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .consent {
        padding: 8px 16px;
        background: var(--cw-surface);
        border-top: 1px solid var(--cw-border);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        font-size: 11px;
        color: var(--cw-muted);
      }
      .consent p {
        margin: 0;
      }
      .consent-x {
        border: none;
        background: transparent;
        cursor: pointer;
        color: var(--cw-muted);
        font-size: 12px;
      }
      .attach-pop, .menu-pop {
        position: absolute;
        bottom: 60px;
        left: 16px;
        background: var(--cw-surface, #ffffff);
        border: 1px solid var(--cw-border, #e5e7eb);
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        display: flex;
        flex-direction: column;
        padding: 4px;
        z-index: 60;
      }
      .menu-pop {
        top: 50px;
        right: 16px;
        bottom: auto;
        left: auto;
      }
      .menu-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border: none;
        background: transparent;
        color: var(--cw-ink);
        font-size: 13px;
        cursor: pointer;
        border-radius: 8px;
        text-align: left;
      }
      .menu-item:hover {
        background: rgba(0,0,0,0.05);
      }
      .emoji-row {
        position: absolute;
        bottom: 60px;
        right: 16px;
        background: var(--cw-surface, #ffffff);
        border: 1px solid var(--cw-border, #e5e7eb);
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 4px;
        padding: 8px;
        z-index: 60;
      }
      .emoji-btn {
        border: none;
        background: transparent;
        font-size: 18px;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
      }
      .emoji-btn:hover {
        background: rgba(0,0,0,0.05);
      }
      .panel-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 16px;
        background: var(--cw-bg, #ffffff);
        font-size: 11px;
        color: var(--cw-muted);
      }
      .powered {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .powered a {
        font-weight: 600;
        color: inherit;
        text-decoration: none;
      }
      .closed-note {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 24px;
        text-align: center;
      }
      .closed-note p {
        margin: 0;
        font-weight: 600;
      }
      .closed-note button.primary {
        padding: 10px 20px;
        border-radius: 9999px;
        border: none;
        background: var(--cw-accent, #0b5fff);
        color: #ffffff;
        font-weight: 700;
        cursor: pointer;
      }

      @keyframes zotly-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `],Kr([h({type:Object})],s.CwChatBody.prototype,"chatState",2),Kr([h({type:Object})],s.CwChatBody.prototype,"chatWindowConfig",2),s.CwChatBody=Kr([B("cw-chat-body")],s.CwChatBody);var Ut=Object.defineProperty,Lt=Object.getOwnPropertyDescriptor,G=(t,r,e,o)=>{for(var n=o>1?void 0:o?Lt(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&Ut(r,e,n),n};s.CwChatPanel=class extends ${constructor(){super(...arguments),this.panelOpen=!1}connectedCallback(){super.connectedCallback(),this.unsub=vr(()=>this.requestUpdate())}disconnectedCallback(){var r;super.disconnectedCallback(),(r=this.unsub)==null||r.call(this)}render(){if(!this.panelOpen)return l``;const r=this.chatWindowConfig||cr.get(),e=this.chatState||w.get(),o=this.features||yr.get(),n=this.chatbarConfig||$r.get(),i=this.bubbleConfig||lr.get(),a=e.isExpanded,p=a?r.expandedWidth||480:r.widgetWidth||350,c=r.widgetHeight||550,g=r.offsetBottom!==void 0&&r.offsetBottom!==null&&r.offsetBottom!==""?Number(r.offsetBottom):n.enabled?n.offsetBottom!==void 0?n.offsetBottom:12:i.offsetBottom!==void 0?i.offsetBottom:12;let b=g;if(n.enabled&&!n.hideOnOpen){const f=n.height||(n.layout==="card"?220:40),A=n.stackGap!==void 0?n.stackGap:12;b=g+f+A}else if(!n.enabled&&!i.hideOnOpen){const f=i.height||60,A=i.stackGap!==void 0?i.stackGap:12;b=g+f+A}const d=r.offsetRight!==void 0&&r.offsetRight!==null&&r.offsetRight!==""?Number(r.offsetRight):n.enabled?n.offsetRight!==void 0?n.offsetRight:16:i.offsetRight!==void 0?i.offsetRight:16,u=r.widgetShadow?`0 8px ${r.widgetShadowBlur||30}px ${r.widgetShadowColor||"rgba(0,0,0,0.12)"}`:"none",v=r.widgetBorderEnabled?`${r.widgetBorderWidth||1}px solid ${r.widgetBorderColor||"#e5e7eb"}`:"none",k=`${r.widgetBorderRadius||24}px`,z=`calc(100% - ${b+24}px)`;return l`
      <div
        class="panel-wrapper zotly-widget-panel-wrapper"
        style="width: ${p}px; height: ${c}px; max-width: calc(100% - 24px); max-height: ${z}; position: fixed; bottom: ${b}px; right: ${d}px"
      >
        <div
          class="panel"
          style="box-shadow: ${u}; border: ${v}; border-radius: ${k}; background: ${r.bodyBg||"var(--cw-bg)"}; --cw-accent: ${r.accentColor||"#0b5fff"}"
        >
          <!-- HEADER -->
          <cw-chat-header
            .config="${r}"
            .features="${o}"
            .isExpanded="${a}"
            .clientName="${e.clientName}"
            .agentName="${e.agentName}"
            .state="${e.state}"
          ></cw-chat-header>

          <!-- BODY -->
          <cw-chat-body .chatState="${e}" .chatWindowConfig="${r}"></cw-chat-body>

          <!-- RECONNECTING BANNER -->
          ${e.reconnecting?l`<div class="reconnecting">Reconnecting…</div>`:""}

          <!-- CONFIRM MODAL OVERLAY -->
          ${e.confirmBox?l`
                <div class="modal-overlay" @click="${f=>{f.target===f.currentTarget&&(e.confirmBox=null)}}">
                  <div class="modal-card" style="background: ${r.modalCardBg||"#ffffff"}; border-radius: ${r.modalBorderRadius||24}px">
                    <p class="modal-message" style="color: ${r.modalMessageColor||"#101828"}">${e.confirmBox.message}</p>
                    <div class="modal-actions">
                      <button
                        type="button"
                        class="btn-ghost"
                        style="background: ${r.endChatCancelBg||"var(--cw-surface)"}; color: ${r.endChatCancelTextColor||"var(--cw-muted)"}; border-color: ${r.endChatCancelBorderColor||"var(--cw-border)"}"
                        @click="${()=>{e.confirmBox=null,this.requestUpdate()}}"
                      >
                        ${e.confirmBox.cancelLabel||"Cancel"}
                      </button>

                      <button
                        type="button"
                        class="btn-confirm"
                        style="background: ${r.endChatConfirmBg||"var(--cw-grad)"}; color: ${r.endChatConfirmTextColor||"#ffffff"}"
                        @click="${()=>w.confirmEnd()}"
                      >
                        ${e.confirmBox.confirmLabel||"Confirm"}
                      </button>
                    </div>
                  </div>
                </div>
              `:""}
        </div>
      </div>
    `}},s.CwChatPanel.styles=[_,S`
      :host {
        display: block;
      }
      .panel-wrapper {
        position: fixed;
        z-index: 50;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        pointer-events: auto;
        transform-origin: bottom right;
        transition: all 0.3s ease;
        max-width: calc(100% - 24px);
      }
      .panel {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        isolation: isolate;
        transform: translateZ(0);
      }
      .modal-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(2px);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
      }
      .modal-card {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      }
      .modal-message {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.4;
      }
      .modal-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }
      .modal-actions button {
        padding: 8px 16px;
        border-radius: 9999px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid transparent;
      }
    `],G([h({type:Object})],s.CwChatPanel.prototype,"chatWindowConfig",2),G([h({type:Object})],s.CwChatPanel.prototype,"chatState",2),G([h({type:Object})],s.CwChatPanel.prototype,"features",2),G([h({type:Object})],s.CwChatPanel.prototype,"chatbarConfig",2),G([h({type:Object})],s.CwChatPanel.prototype,"bubbleConfig",2),G([h({type:Boolean})],s.CwChatPanel.prototype,"panelOpen",2),s.CwChatPanel=G([B("cw-chat-panel")],s.CwChatPanel);var Ht=Object.defineProperty,Ft=Object.getOwnPropertyDescriptor,Zr=(t,r,e,o)=>{for(var n=o>1?void 0:o?Ft(r,e):r,i=t.length-1,a;i>=0;i--)(a=t[i])&&(n=(o?a(r,e,n):a(n))||n);return o&&n&&Ht(r,e,n),n};s.CwWidgetRoot=class extends ${constructor(){super(...arguments),this.panelOpen=!1,this.initialized=!1,this.toggleListener=()=>this.handleToggleWidget(),this.closeListener=()=>this.handleCloseWidget()}async connectedCallback(){super.connectedCallback();try{await Re()}catch(r){console.warn("CwWidgetRoot initStore warning:",r)}finally{this.unsubAll=vr(()=>this.requestUpdate()),window.addEventListener("toggle-contact-widget",this.toggleListener),window.addEventListener("close-contact-widget",this.closeListener),this.initialized=!0,this.requestUpdate()}}disconnectedCallback(){var r;super.disconnectedCallback(),(r=this.unsubAll)==null||r.call(this),window.removeEventListener("toggle-contact-widget",this.toggleListener),window.removeEventListener("close-contact-widget",this.closeListener)}handleToggleWidget(){this.panelOpen=!this.panelOpen,w.get().panelOpen=this.panelOpen,this.panelOpen&&(w.get().unreadCount=0),this.requestUpdate()}handleCloseWidget(){this.panelOpen=!1,w.get().panelOpen=!1,this.requestUpdate()}render(){if(!this.initialized)return l``;const r=lr.get(),e=$r.get(),o=xr.get(),n=cr.get(),i=yr.get(),a=w.get();return l`
      <style>
        ${be}
      </style>

      <!-- FLOATING TRIGGER (BUBBLE OR CHATBAR) -->
      ${e.enabled?l`
            <cw-chatbar
              .config="${e}"
              .panelOpen="${this.panelOpen}"
              .unreadCount="${a.unreadCount}"
            ></cw-chatbar>
          `:l`
            <cw-bubble
              .config="${r}"
              .panelOpen="${this.panelOpen}"
              .unreadCount="${a.unreadCount}"
              .hasSentMessage="${a.hasSentMessage}"
            ></cw-bubble>
          `}

      <!-- FLOATING GREET WINDOW -->
      <cw-greet-window
        .config="${o}"
        .chatbarConfig="${e}"
        .bubbleConfig="${r}"
        .panelOpen="${this.panelOpen}"
        .hasSentMessage="${a.hasSentMessage}"
      ></cw-greet-window>

      <!-- MAIN CHAT PANEL -->
      <cw-chat-panel
        .chatWindowConfig="${n}"
        .chatState="${a}"
        .features="${i}"
        .chatbarConfig="${e}"
        .bubbleConfig="${r}"
        .panelOpen="${this.panelOpen}"
      ></cw-chat-panel>
    `}},s.CwWidgetRoot.styles=S`
    :host {
      display: block;
      font-family: inherit;
    }
  `,Zr([dr()],s.CwWidgetRoot.prototype,"panelOpen",2),Zr([dr()],s.CwWidgetRoot.prototype,"initialized",2),s.CwWidgetRoot=Zr([B("cw-widget-root")],s.CwWidgetRoot);function Gt(t=document.body){let r=t.querySelector("cw-widget-root");return r||(r=document.createElement("cw-widget-root"),t.appendChild(r)),r}s.CW_ACCENT=Nr,s.CW_ACCENT_DEEP=Ur,s.CW_ACCENT_TINT=Dr,s.CW_BG=Tr,s.CW_BORDER=Mr,s.CW_GRAD=Ir,s.CW_INK=Wr,s.CW_MUTED=Rr,s.CW_SURFACE=Pr,s.DARK_TOKENS=ue,s.GLOBAL_STYLES=_,s.KEYFRAMES_CSS=be,s.LIGHT_TOKENS=fe,s.bubbleStore=lr,s.chatStore=w,s.chatWindowStore=cr,s.chatbarStore=$r,s.featuresStore=yr,s.fetchClientConfig=ye,s.formatTime=lt,s.getAnimClass=Gr,s.getBorderRadius=Fr,s.getBoxShadow=Ce,s.getChatbarBackground=Oe,s.getChatbarFontSize=ze,s.getChatbarIconHeight=_e,s.getChatbarIconWidth=mr,s.getClientId=xe,s.getCompositeBackground=Be,s.getGradient=ke,s.getInnerShadow=Se,s.getParentTheme=Lr,s.getTooltipBorderRadius=Ae,s.getWidgetBaseUrl=me,s.greetWindowStore=xr,s.hexToRgba=$e,s.hostTokensCss=st,s.initStore=Re,s.isHostDark=Hr,s.mountChatWidget=Gt,s.observeDarkMode=ve,s.subscribe=Z,s.subscribeAll=vr,s.tokensToCss=we,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})});
