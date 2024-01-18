/*! lux-b2c-lenscrafters - v0.0.1 - 2023-06-14 *//*
 AngularJS v1.8.2
 (c) 2010-2020 Google LLC. http://angularjs.org
 License: MIT
*/
(function(z){'use strict';function ve(a){if(D(a))w(a.objectMaxDepth)&&(Xb.objectMaxDepth=Yb(a.objectMaxDepth)?a.objectMaxDepth:NaN),w(a.urlErrorParamsEnabled)&&Ga(a.urlErrorParamsEnabled)&&(Xb.urlErrorParamsEnabled=a.urlErrorParamsEnabled);else return Xb}function Yb(a){return X(a)&&0<a}function F(a,b){b=b||Error;return function(){var d=arguments[0],c;c="["+(a?a+":":"")+d+"] http://errors.angularjs.org/1.8.2/"+(a?a+"/":"")+d;for(d=1;d<arguments.length;d++){c=c+(1==d?"?":"&")+"p"+(d-1)+"=";var e=encodeURIComponent,
f;f=arguments[d];f="function"==typeof f?f.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof f?"undefined":"string"!=typeof f?JSON.stringify(f):f;c+=e(f)}return new b(c)}}function za(a){if(null==a||$a(a))return!1;if(H(a)||C(a)||x&&a instanceof x)return!0;var b="length"in Object(a)&&a.length;return X(b)&&(0<=b&&b-1 in a||"function"===typeof a.item)}function r(a,b,d){var c,e;if(a)if(B(a))for(c in a)"prototype"!==c&&"length"!==c&&"name"!==c&&a.hasOwnProperty(c)&&b.call(d,a[c],c,a);else if(H(a)||
za(a)){var f="object"!==typeof a;c=0;for(e=a.length;c<e;c++)(f||c in a)&&b.call(d,a[c],c,a)}else if(a.forEach&&a.forEach!==r)a.forEach(b,d,a);else if(Pc(a))for(c in a)b.call(d,a[c],c,a);else if("function"===typeof a.hasOwnProperty)for(c in a)a.hasOwnProperty(c)&&b.call(d,a[c],c,a);else for(c in a)ta.call(a,c)&&b.call(d,a[c],c,a);return a}function Qc(a,b,d){for(var c=Object.keys(a).sort(),e=0;e<c.length;e++)b.call(d,a[c[e]],c[e]);return c}function Zb(a){return function(b,d){a(d,b)}}function we(){return++qb}
function $b(a,b,d){for(var c=a.$$hashKey,e=0,f=b.length;e<f;++e){var g=b[e];if(D(g)||B(g))for(var k=Object.keys(g),h=0,l=k.length;h<l;h++){var m=k[h],p=g[m];d&&D(p)?ha(p)?a[m]=new Date(p.valueOf()):ab(p)?a[m]=new RegExp(p):p.nodeName?a[m]=p.cloneNode(!0):ac(p)?a[m]=p.clone():"__proto__"!==m&&(D(a[m])||(a[m]=H(p)?[]:{}),$b(a[m],[p],!0)):a[m]=p}}c?a.$$hashKey=c:delete a.$$hashKey;return a}function S(a){return $b(a,Ha.call(arguments,1),!1)}function xe(a){return $b(a,Ha.call(arguments,1),!0)}function fa(a){return parseInt(a,
10)}function bc(a,b){return S(Object.create(a),b)}function E(){}function Ta(a){return a}function ia(a){return function(){return a}}function cc(a){return B(a.toString)&&a.toString!==la}function A(a){return"undefined"===typeof a}function w(a){return"undefined"!==typeof a}function D(a){return null!==a&&"object"===typeof a}function Pc(a){return null!==a&&"object"===typeof a&&!Rc(a)}function C(a){return"string"===typeof a}function X(a){return"number"===typeof a}function ha(a){return"[object Date]"===la.call(a)}
function H(a){return Array.isArray(a)||a instanceof Array}function dc(a){switch(la.call(a)){case "[object Error]":return!0;case "[object Exception]":return!0;case "[object DOMException]":return!0;default:return a instanceof Error}}function B(a){return"function"===typeof a}function ab(a){return"[object RegExp]"===la.call(a)}function $a(a){return a&&a.window===a}function bb(a){return a&&a.$evalAsync&&a.$watch}function Ga(a){return"boolean"===typeof a}function ye(a){return a&&X(a.length)&&ze.test(la.call(a))}
function ac(a){return!(!a||!(a.nodeName||a.prop&&a.attr&&a.find))}function Ae(a){var b={};a=a.split(",");var d;for(d=0;d<a.length;d++)b[a[d]]=!0;return b}function ua(a){return K(a.nodeName||a[0]&&a[0].nodeName)}function cb(a,b){var d=a.indexOf(b);0<=d&&a.splice(d,1);return d}function Ia(a,b,d){function c(a,b,c){c--;if(0>c)return"...";var d=b.$$hashKey,f;if(H(a)){f=0;for(var g=a.length;f<g;f++)b.push(e(a[f],c))}else if(Pc(a))for(f in a)b[f]=e(a[f],c);else if(a&&"function"===typeof a.hasOwnProperty)for(f in a)a.hasOwnProperty(f)&&
(b[f]=e(a[f],c));else for(f in a)ta.call(a,f)&&(b[f]=e(a[f],c));d?b.$$hashKey=d:delete b.$$hashKey;return b}function e(a,b){if(!D(a))return a;var d=g.indexOf(a);if(-1!==d)return k[d];if($a(a)||bb(a))throw oa("cpws");var d=!1,e=f(a);void 0===e&&(e=H(a)?[]:Object.create(Rc(a)),d=!0);g.push(a);k.push(e);return d?c(a,e,b):e}function f(a){switch(la.call(a)){case "[object Int8Array]":case "[object Int16Array]":case "[object Int32Array]":case "[object Float32Array]":case "[object Float64Array]":case "[object Uint8Array]":case "[object Uint8ClampedArray]":case "[object Uint16Array]":case "[object Uint32Array]":return new a.constructor(e(a.buffer),
a.byteOffset,a.length);case "[object ArrayBuffer]":if(!a.slice){var b=new ArrayBuffer(a.byteLength);(new Uint8Array(b)).set(new Uint8Array(a));return b}return a.slice(0);case "[object Boolean]":case "[object Number]":case "[object String]":case "[object Date]":return new a.constructor(a.valueOf());case "[object RegExp]":return b=new RegExp(a.source,a.toString().match(/[^/]*$/)[0]),b.lastIndex=a.lastIndex,b;case "[object Blob]":return new a.constructor([a],{type:a.type})}if(B(a.cloneNode))return a.cloneNode(!0)}
var g=[],k=[];d=Yb(d)?d:NaN;if(b){if(ye(b)||"[object ArrayBuffer]"===la.call(b))throw oa("cpta");if(a===b)throw oa("cpi");H(b)?b.length=0:r(b,function(a,c){"$$hashKey"!==c&&delete b[c]});g.push(a);k.push(b);return c(a,b,d)}return e(a,d)}function ec(a,b){return a===b||a!==a&&b!==b}function va(a,b){if(a===b)return!0;if(null===a||null===b)return!1;if(a!==a&&b!==b)return!0;var d=typeof a,c;if(d===typeof b&&"object"===d)if(H(a)){if(!H(b))return!1;if((d=a.length)===b.length){for(c=0;c<d;c++)if(!va(a[c],
b[c]))return!1;return!0}}else{if(ha(a))return ha(b)?ec(a.getTime(),b.getTime()):!1;if(ab(a))return ab(b)?a.toString()===b.toString():!1;if(bb(a)||bb(b)||$a(a)||$a(b)||H(b)||ha(b)||ab(b))return!1;d=T();for(c in a)if("$"!==c.charAt(0)&&!B(a[c])){if(!va(a[c],b[c]))return!1;d[c]=!0}for(c in b)if(!(c in d)&&"$"!==c.charAt(0)&&w(b[c])&&!B(b[c]))return!1;return!0}return!1}function db(a,b,d){return a.concat(Ha.call(b,d))}function Va(a,b){var d=2<arguments.length?Ha.call(arguments,2):[];return!B(b)||b instanceof
RegExp?b:d.length?function(){return arguments.length?b.apply(a,db(d,arguments,0)):b.apply(a,d)}:function(){return arguments.length?b.apply(a,arguments):b.call(a)}}function Sc(a,b){var d=b;"string"===typeof a&&"$"===a.charAt(0)&&"$"===a.charAt(1)?d=void 0:$a(b)?d="$WINDOW":b&&z.document===b?d="$DOCUMENT":bb(b)&&(d="$SCOPE");return d}function eb(a,b){if(!A(a))return X(b)||(b=b?2:null),JSON.stringify(a,Sc,b)}function Tc(a){return C(a)?JSON.parse(a):a}function fc(a,b){a=a.replace(Be,"");var d=Date.parse("Jan 01, 1970 00:00:00 "+
a)/6E4;return Y(d)?b:d}function Uc(a,b){a=new Date(a.getTime());a.setMinutes(a.getMinutes()+b);return a}function gc(a,b,d){d=d?-1:1;var c=a.getTimezoneOffset();b=fc(b,c);return Uc(a,d*(b-c))}function Aa(a){a=x(a).clone().empty();var b=x("<div></div>").append(a).html();try{return a[0].nodeType===Pa?K(b):b.match(/^(<[^>]+>)/)[1].replace(/^<([\w-]+)/,function(a,b){return"<"+K(b)})}catch(d){return K(b)}}function Vc(a){try{return decodeURIComponent(a)}catch(b){}}function hc(a){var b={};r((a||"").split("&"),
function(a){var c,e,f;a&&(e=a=a.replace(/\+/g,"%20"),c=a.indexOf("="),-1!==c&&(e=a.substring(0,c),f=a.substring(c+1)),e=Vc(e),w(e)&&(f=w(f)?Vc(f):!0,ta.call(b,e)?H(b[e])?b[e].push(f):b[e]=[b[e],f]:b[e]=f))});return b}function Ce(a){var b=[];r(a,function(a,c){H(a)?r(a,function(a){b.push(ba(c,!0)+(!0===a?"":"="+ba(a,!0)))}):b.push(ba(c,!0)+(!0===a?"":"="+ba(a,!0)))});return b.length?b.join("&"):""}function ic(a){return ba(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function ba(a,
b){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,b?"%20":"+")}function De(a,b){var d,c,e=Qa.length;for(c=0;c<e;++c)if(d=Qa[c]+b,C(d=a.getAttribute(d)))return d;return null}function Ee(a,b){var d,c,e={};r(Qa,function(b){b+="app";!d&&a.hasAttribute&&a.hasAttribute(b)&&(d=a,c=a.getAttribute(b))});r(Qa,function(b){b+="app";var e;!d&&(e=a.querySelector("["+b.replace(":","\\:")+"]"))&&(d=e,c=e.getAttribute(b))});
d&&(Fe?(e.strictDi=null!==De(d,"strict-di"),b(d,c?[c]:[],e)):z.console.error("AngularJS: disabling automatic bootstrap. <script> protocol indicates an extension, document.location.href does not match."))}function Wc(a,b,d){D(d)||(d={});d=S({strictDi:!1},d);var c=function(){a=x(a);if(a.injector()){var c=a[0]===z.document?"document":Aa(a);throw oa("btstrpd",c.replace(/</,"&lt;").replace(/>/,"&gt;"));}b=b||[];b.unshift(["$provide",function(b){b.value("$rootElement",a)}]);d.debugInfoEnabled&&b.push(["$compileProvider",
function(a){a.debugInfoEnabled(!0)}]);b.unshift("ng");c=fb(b,d.strictDi);c.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;z&&e.test(z.name)&&(d.debugInfoEnabled=!0,z.name=z.name.replace(e,""));if(z&&!f.test(z.name))return c();z.name=z.name.replace(f,"");ca.resumeBootstrap=function(a){r(a,function(a){b.push(a)});return c()};B(ca.resumeDeferredBootstrap)&&
ca.resumeDeferredBootstrap()}function Ge(){z.name="NG_ENABLE_DEBUG_INFO!"+z.name;z.location.reload()}function He(a){a=ca.element(a).injector();if(!a)throw oa("test");return a.get("$$testability")}function Xc(a,b){b=b||"_";return a.replace(Ie,function(a,c){return(c?b:"")+a.toLowerCase()})}function Je(){var a;if(!Yc){var b=rb();(sb=A(b)?z.jQuery:b?z[b]:void 0)&&sb.fn.on?(x=sb,S(sb.fn,{scope:Wa.scope,isolateScope:Wa.isolateScope,controller:Wa.controller,injector:Wa.injector,inheritedData:Wa.inheritedData})):
x=U;a=x.cleanData;x.cleanData=function(b){for(var c,e=0,f;null!=(f=b[e]);e++)(c=(x._data(f)||{}).events)&&c.$destroy&&x(f).triggerHandler("$destroy");a(b)};ca.element=x;Yc=!0}}function Ke(){U.legacyXHTMLReplacement=!0}function gb(a,b,d){if(!a)throw oa("areq",b||"?",d||"required");return a}function tb(a,b,d){d&&H(a)&&(a=a[a.length-1]);gb(B(a),b,"not a function, got "+(a&&"object"===typeof a?a.constructor.name||"Object":typeof a));return a}function Ja(a,b){if("hasOwnProperty"===a)throw oa("badname",
b);}function Le(a,b,d){if(!b)return a;b=b.split(".");for(var c,e=a,f=b.length,g=0;g<f;g++)c=b[g],a&&(a=(e=a)[c]);return!d&&B(a)?Va(e,a):a}function ub(a){for(var b=a[0],d=a[a.length-1],c,e=1;b!==d&&(b=b.nextSibling);e++)if(c||a[e]!==b)c||(c=x(Ha.call(a,0,e))),c.push(b);return c||a}function T(){return Object.create(null)}function jc(a){if(null==a)return"";switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=!cc(a)||H(a)||ha(a)?eb(a):a.toString()}return a}function Me(a){function b(a,
b,c){return a[b]||(a[b]=c())}var d=F("$injector"),c=F("ng");a=b(a,"angular",Object);a.$$minErr=a.$$minErr||F;return b(a,"module",function(){var a={};return function(f,g,k){var h={};if("hasOwnProperty"===f)throw c("badname","module");g&&a.hasOwnProperty(f)&&(a[f]=null);return b(a,f,function(){function a(b,c,d,f){f||(f=e);return function(){f[d||"push"]([b,c,arguments]);return t}}function b(a,c,d){d||(d=e);return function(b,e){e&&B(e)&&(e.$$moduleName=f);d.push([a,c,arguments]);return t}}if(!g)throw d("nomod",
f);var e=[],n=[],s=[],G=a("$injector","invoke","push",n),t={_invokeQueue:e,_configBlocks:n,_runBlocks:s,info:function(a){if(w(a)){if(!D(a))throw c("aobj","value");h=a;return this}return h},requires:g,name:f,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),decorator:b("$provide","decorator",n),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider",
"register"),directive:b("$compileProvider","directive"),component:b("$compileProvider","component"),config:G,run:function(a){s.push(a);return this}};k&&G(k);return t})}})}function ja(a,b){if(H(a)){b=b||[];for(var d=0,c=a.length;d<c;d++)b[d]=a[d]}else if(D(a))for(d in b=b||{},a)if("$"!==d.charAt(0)||"$"!==d.charAt(1))b[d]=a[d];return b||a}function Ne(a,b){var d=[];Yb(b)&&(a=ca.copy(a,null,b));return JSON.stringify(a,function(a,b){b=Sc(a,b);if(D(b)){if(0<=d.indexOf(b))return"...";d.push(b)}return b})}
function Oe(a){S(a,{errorHandlingConfig:ve,bootstrap:Wc,copy:Ia,extend:S,merge:xe,equals:va,element:x,forEach:r,injector:fb,noop:E,bind:Va,toJson:eb,fromJson:Tc,identity:Ta,isUndefined:A,isDefined:w,isString:C,isFunction:B,isObject:D,isNumber:X,isElement:ac,isArray:H,version:Pe,isDate:ha,callbacks:{$$counter:0},getTestability:He,reloadWithDebugInfo:Ge,UNSAFE_restoreLegacyJqLiteXHTMLReplacement:Ke,$$minErr:F,$$csp:Ba,$$encodeUriSegment:ic,$$encodeUriQuery:ba,$$lowercase:K,$$stringify:jc,$$uppercase:vb});
lc=Me(z);lc("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:Qe});a.provider("$compile",Zc).directive({a:Re,input:$c,textarea:$c,form:Se,script:Te,select:Ue,option:Ve,ngBind:We,ngBindHtml:Xe,ngBindTemplate:Ye,ngClass:Ze,ngClassEven:$e,ngClassOdd:af,ngCloak:bf,ngController:cf,ngForm:df,ngHide:ef,ngIf:ff,ngInclude:gf,ngInit:hf,ngNonBindable:jf,ngPluralize:kf,ngRef:lf,ngRepeat:mf,ngShow:nf,ngStyle:of,ngSwitch:pf,ngSwitchWhen:qf,ngSwitchDefault:rf,ngOptions:sf,ngTransclude:tf,ngModel:uf,
ngList:vf,ngChange:wf,pattern:ad,ngPattern:ad,required:bd,ngRequired:bd,minlength:cd,ngMinlength:cd,maxlength:dd,ngMaxlength:dd,ngValue:xf,ngModelOptions:yf}).directive({ngInclude:zf,input:Af}).directive(wb).directive(ed);a.provider({$anchorScroll:Bf,$animate:Cf,$animateCss:Df,$$animateJs:Ef,$$animateQueue:Ff,$$AnimateRunner:Gf,$$animateAsyncRun:Hf,$browser:If,$cacheFactory:Jf,$controller:Kf,$document:Lf,$$isDocumentHidden:Mf,$exceptionHandler:Nf,$filter:fd,$$forceReflow:Of,$interpolate:Pf,$interval:Qf,
$$intervalFactory:Rf,$http:Sf,$httpParamSerializer:Tf,$httpParamSerializerJQLike:Uf,$httpBackend:Vf,$xhrFactory:Wf,$jsonpCallbacks:Xf,$location:Yf,$log:Zf,$parse:$f,$rootScope:ag,$q:bg,$$q:cg,$sce:dg,$sceDelegate:eg,$sniffer:fg,$$taskTrackerFactory:gg,$templateCache:hg,$templateRequest:ig,$$testability:jg,$timeout:kg,$window:lg,$$rAF:mg,$$jqLite:ng,$$Map:og,$$cookieReader:pg})}]).info({angularVersion:"1.8.2"})}function xb(a,b){return b.toUpperCase()}function yb(a){return a.replace(qg,xb)}function mc(a){a=
a.nodeType;return 1===a||!a||9===a}function gd(a,b){var d,c,e,f=b.createDocumentFragment(),g=[],k;if(nc.test(a)){d=f.appendChild(b.createElement("div"));c=(rg.exec(a)||["",""])[1].toLowerCase();e=U.legacyXHTMLReplacement?a.replace(sg,"<$1></$2>"):a;if(10>wa)for(c=hb[c]||hb._default,d.innerHTML=c[1]+e+c[2],k=c[0];k--;)d=d.firstChild;else{c=qa[c]||[];for(k=c.length;-1<--k;)d.appendChild(z.document.createElement(c[k])),d=d.firstChild;d.innerHTML=e}g=db(g,d.childNodes);d=f.firstChild;d.textContent=""}else g.push(b.createTextNode(a));
f.textContent="";f.innerHTML="";r(g,function(a){f.appendChild(a)});return f}function U(a){if(a instanceof U)return a;var b;C(a)&&(a=V(a),b=!0);if(!(this instanceof U)){if(b&&"<"!==a.charAt(0))throw oc("nosel");return new U(a)}if(b){b=z.document;var d;a=(d=tg.exec(a))?[b.createElement(d[1])]:(d=gd(a,b))?d.childNodes:[];pc(this,a)}else B(a)?hd(a):pc(this,a)}function qc(a){return a.cloneNode(!0)}function zb(a,b){!b&&mc(a)&&x.cleanData([a]);a.querySelectorAll&&x.cleanData(a.querySelectorAll("*"))}function id(a){for(var b in a)return!1;
return!0}function jd(a){var b=a.ng339,d=b&&Ka[b],c=d&&d.events,d=d&&d.data;d&&!id(d)||c&&!id(c)||(delete Ka[b],a.ng339=void 0)}function kd(a,b,d,c){if(w(c))throw oc("offargs");var e=(c=Ab(a))&&c.events,f=c&&c.handle;if(f){if(b){var g=function(b){var c=e[b];w(d)&&cb(c||[],d);w(d)&&c&&0<c.length||(a.removeEventListener(b,f),delete e[b])};r(b.split(" "),function(a){g(a);Bb[a]&&g(Bb[a])})}else for(b in e)"$destroy"!==b&&a.removeEventListener(b,f),delete e[b];jd(a)}}function rc(a,b){var d=a.ng339;if(d=
d&&Ka[d])b?delete d.data[b]:d.data={},jd(a)}function Ab(a,b){var d=a.ng339,d=d&&Ka[d];b&&!d&&(a.ng339=d=++ug,d=Ka[d]={events:{},data:{},handle:void 0});return d}function sc(a,b,d){if(mc(a)){var c,e=w(d),f=!e&&b&&!D(b),g=!b;a=(a=Ab(a,!f))&&a.data;if(e)a[yb(b)]=d;else{if(g)return a;if(f)return a&&a[yb(b)];for(c in b)a[yb(c)]=b[c]}}}function Cb(a,b){return a.getAttribute?-1<(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+b+" "):!1}function Db(a,b){if(b&&a.setAttribute){var d=
(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," "),c=d;r(b.split(" "),function(a){a=V(a);c=c.replace(" "+a+" "," ")});c!==d&&a.setAttribute("class",V(c))}}function Eb(a,b){if(b&&a.setAttribute){var d=(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," "),c=d;r(b.split(" "),function(a){a=V(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});c!==d&&a.setAttribute("class",V(c))}}function pc(a,b){if(b)if(b.nodeType)a[a.length++]=b;else{var d=b.length;if("number"===typeof d&&b.window!==b){if(d)for(var c=
0;c<d;c++)a[a.length++]=b[c]}else a[a.length++]=b}}function ld(a,b){return Fb(a,"$"+(b||"ngController")+"Controller")}function Fb(a,b,d){9===a.nodeType&&(a=a.documentElement);for(b=H(b)?b:[b];a;){for(var c=0,e=b.length;c<e;c++)if(w(d=x.data(a,b[c])))return d;a=a.parentNode||11===a.nodeType&&a.host}}function md(a){for(zb(a,!0);a.firstChild;)a.removeChild(a.firstChild)}function Gb(a,b){b||zb(a);var d=a.parentNode;d&&d.removeChild(a)}function vg(a,b){b=b||z;if("complete"===b.document.readyState)b.setTimeout(a);
else x(b).on("load",a)}function hd(a){function b(){z.document.removeEventListener("DOMContentLoaded",b);z.removeEventListener("load",b);a()}"complete"===z.document.readyState?z.setTimeout(a):(z.document.addEventListener("DOMContentLoaded",b),z.addEventListener("load",b))}function nd(a,b){var d=Hb[b.toLowerCase()];return d&&od[ua(a)]&&d}function wg(a,b){var d=function(c,d){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=b[d||c.type],g=f?f.length:0;if(g){if(A(c.immediatePropagationStopped)){var k=
c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();k&&k.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};var h=f.specialHandlerWrapper||xg;1<g&&(f=ja(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||h(a,c,f[l])}};d.elem=a;return d}function xg(a,b,d){d.call(a,b)}function yg(a,b,d){var c=b.relatedTarget;c&&(c===a||zg.call(a,c))||d.call(a,b)}function ng(){this.$get=
function(){return S(U,{hasClass:function(a,b){a.attr&&(a=a[0]);return Cb(a,b)},addClass:function(a,b){a.attr&&(a=a[0]);return Eb(a,b)},removeClass:function(a,b){a.attr&&(a=a[0]);return Db(a,b)}})}}function La(a,b){var d=a&&a.$$hashKey;if(d)return"function"===typeof d&&(d=a.$$hashKey()),d;d=typeof a;return d="function"===d||"object"===d&&null!==a?a.$$hashKey=d+":"+(b||we)():d+":"+a}function pd(){this._keys=[];this._values=[];this._lastKey=NaN;this._lastIndex=-1}function qd(a){a=Function.prototype.toString.call(a).replace(Ag,
"");return a.match(Bg)||a.match(Cg)}function Dg(a){return(a=qd(a))?"function("+(a[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function fb(a,b){function d(a){return function(b,c){if(D(b))r(b,Zb(a));else return a(b,c)}}function c(a,b){Ja(a,"service");if(B(b)||H(b))b=n.instantiate(b);if(!b.$get)throw Ca("pget",a);return p[a+"Provider"]=b}function e(a,b){return function(){var c=t.invoke(b,this);if(A(c))throw Ca("undef",a);return c}}function f(a,b,d){return c(a,{$get:!1!==d?e(a,b):b})}function g(a){gb(A(a)||
H(a),"modulesToLoad","not an array");var b=[],c;r(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=n.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.set(a,!0);try{C(a)?(c=lc(a),t.modules[a]=c,b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):B(a)?b.push(n.invoke(a)):H(a)?b.push(n.invoke(a)):tb(a,"module")}catch(e){throw H(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1===e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ca("modulerr",
a,e.stack||e.message||e);}}});return b}function k(a,c){function d(b,e){if(a.hasOwnProperty(b)){if(a[b]===h)throw Ca("cdep",b+" <- "+l.join(" <- "));return a[b]}try{return l.unshift(b),a[b]=h,a[b]=c(b,e),a[b]}catch(f){throw a[b]===h&&delete a[b],f;}finally{l.shift()}}function e(a,c,f){var g=[];a=fb.$$annotate(a,b,f);for(var h=0,k=a.length;h<k;h++){var l=a[h];if("string"!==typeof l)throw Ca("itkn",l);g.push(c&&c.hasOwnProperty(l)?c[l]:d(l,f))}return g}return{invoke:function(a,b,c,d){"string"===typeof c&&
(d=c,c=null);c=e(a,c,d);H(a)&&(a=a[a.length-1]);d=a;if(wa||"function"!==typeof d)d=!1;else{var f=d.$$ngIsClass;Ga(f)||(f=d.$$ngIsClass=/^class\b/.test(Function.prototype.toString.call(d)));d=f}return d?(c.unshift(null),new (Function.prototype.bind.apply(a,c))):a.apply(b,c)},instantiate:function(a,b,c){var d=H(a)?a[a.length-1]:a;a=e(a,b,c);a.unshift(null);return new (Function.prototype.bind.apply(d,a))},get:d,annotate:fb.$$annotate,has:function(b){return p.hasOwnProperty(b+"Provider")||a.hasOwnProperty(b)}}}
b=!0===b;var h={},l=[],m=new Ib,p={$provide:{provider:d(c),factory:d(f),service:d(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:d(function(a,b){return f(a,ia(b),!1)}),constant:d(function(a,b){Ja(a,"constant");p[a]=b;s[a]=b}),decorator:function(a,b){var c=n.get(a+"Provider"),d=c.$get;c.$get=function(){var a=t.invoke(d,c);return t.invoke(b,null,{$delegate:a})}}}},n=p.$injector=k(p,function(a,b){ca.isString(b)&&l.push(b);throw Ca("unpr",l.join(" <- "));}),s={},
G=k(s,function(a,b){var c=n.get(a+"Provider",b);return t.invoke(c.$get,c,void 0,a)}),t=G;p.$injectorProvider={$get:ia(G)};t.modules=n.modules=T();var N=g(a),t=G.get("$injector");t.strictDi=b;r(N,function(a){a&&t.invoke(a)});t.loadNewModules=function(a){r(g(a),function(a){a&&t.invoke(a)})};return t}function Bf(){var a=!0;this.disableAutoScrolling=function(){a=!1};this.$get=["$window","$location","$rootScope",function(b,d,c){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===
ua(a))return b=a,!0});return b}function f(a){if(a){a.scrollIntoView();var c;c=g.yOffset;B(c)?c=c():ac(c)?(c=c[0],c="fixed"!==b.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):X(c)||(c=0);c&&(a=a.getBoundingClientRect().top,b.scrollBy(0,a-c))}else b.scrollTo(0,0)}function g(a){a=C(a)?a:X(a)?a.toString():d.hash();var b;a?(b=k.getElementById(a))?f(b):(b=e(k.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var k=b.document;a&&c.$watch(function(){return d.hash()},function(a,b){a===
b&&""===a||vg(function(){c.$evalAsync(g)})});return g}]}function ib(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;H(a)&&(a=a.join(" "));H(b)&&(b=b.join(" "));return a+" "+b}function Eg(a){C(a)&&(a=a.split(" "));var b=T();r(a,function(a){a.length&&(b[a]=!0)});return b}function ra(a){return D(a)?a:{}}function Fg(a,b,d,c,e){function f(){pa=null;k()}function g(){t=y();t=A(t)?null:t;va(t,P)&&(t=P);N=P=t}function k(){var a=N;g();if(v!==h.url()||a!==t)v=h.url(),N=t,r(J,function(a){a(h.url(),t)})}
var h=this,l=a.location,m=a.history,p=a.setTimeout,n=a.clearTimeout,s={},G=e(d);h.isMock=!1;h.$$completeOutstandingRequest=G.completeTask;h.$$incOutstandingRequestCount=G.incTaskCount;h.notifyWhenNoOutstandingRequests=G.notifyWhenNoPendingTasks;var t,N,v=l.href,kc=b.find("base"),pa=null,y=c.history?function(){try{return m.state}catch(a){}}:E;g();h.url=function(b,d,e){A(e)&&(e=null);l!==a.location&&(l=a.location);m!==a.history&&(m=a.history);if(b){var f=N===e;b=ga(b).href;if(v===b&&(!c.history||f))return h;
var k=v&&Da(v)===Da(b);v=b;N=e;!c.history||k&&f?(k||(pa=b),d?l.replace(b):k?(d=l,e=b,f=e.indexOf("#"),e=-1===f?"":e.substr(f),d.hash=e):l.href=b,l.href!==b&&(pa=b)):(m[d?"replaceState":"pushState"](e,"",b),g());pa&&(pa=b);return h}return(pa||l.href).replace(/#$/,"")};h.state=function(){return t};var J=[],I=!1,P=null;h.onUrlChange=function(b){if(!I){if(c.history)x(a).on("popstate",f);x(a).on("hashchange",f);I=!0}J.push(b);return b};h.$$applicationDestroyed=function(){x(a).off("hashchange popstate",
f)};h.$$checkUrlChange=k;h.baseHref=function(){var a=kc.attr("href");return a?a.replace(/^(https?:)?\/\/[^/]*/,""):""};h.defer=function(a,b,c){var d;b=b||0;c=c||G.DEFAULT_TASK_TYPE;G.incTaskCount(c);d=p(function(){delete s[d];G.completeTask(a,c)},b);s[d]=c;return d};h.defer.cancel=function(a){if(s.hasOwnProperty(a)){var b=s[a];delete s[a];n(a);G.completeTask(E,b);return!0}return!1}}function If(){this.$get=["$window","$log","$sniffer","$document","$$taskTrackerFactory",function(a,b,d,c,e){return new Fg(a,
c,b,d,e)}]}function Jf(){this.$get=function(){function a(a,c){function e(a){a!==p&&(n?n===a&&(n=a.n):n=a,f(a.n,a.p),f(a,p),p=a,p.n=null)}function f(a,b){a!==b&&(a&&(a.p=b),b&&(b.n=a))}if(a in b)throw F("$cacheFactory")("iid",a);var g=0,k=S({},c,{id:a}),h=T(),l=c&&c.capacity||Number.MAX_VALUE,m=T(),p=null,n=null;return b[a]={put:function(a,b){if(!A(b)){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}a in h||g++;h[a]=b;g>l&&this.remove(n.key);return b}},get:function(a){if(l<Number.MAX_VALUE){var b=
m[a];if(!b)return;e(b)}return h[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b===p&&(p=b.p);b===n&&(n=b.n);f(b.n,b.p);delete m[a]}a in h&&(delete h[a],g--)},removeAll:function(){h=T();g=0;m=T();p=n=null},destroy:function(){m=k=h=null;delete b[a]},info:function(){return S({},k,{size:g})}}}var b={};a.info=function(){var a={};r(b,function(b,e){a[e]=b.info()});return a};a.get=function(a){return b[a]};return a}}function hg(){this.$get=["$cacheFactory",function(a){return a("templates")}]}
function Zc(a,b){function d(a,b,c){var d=/^([@&]|[=<](\*?))(\??)\s*([\w$]*)$/,e=T();r(a,function(a,f){a=a.trim();if(a in p)e[f]=p[a];else{var g=a.match(d);if(!g)throw $("iscp",b,f,a,c?"controller bindings definition":"isolate scope definition");e[f]={mode:g[1][0],collection:"*"===g[2],optional:"?"===g[3],attrName:g[4]||f};g[4]&&(p[a]=e[f])}});return e}function c(a){var b=a.charAt(0);if(!b||b!==K(b))throw $("baddir",a);if(a!==a.trim())throw $("baddir",a);}function e(a){var b=a.require||a.controller&&
a.name;!H(b)&&D(b)&&r(b,function(a,c){var d=a.match(l);a.substring(d[0].length)||(b[c]=d[0]+c)});return b}var f={},g=/^\s*directive:\s*([\w-]+)\s+(.*)$/,k=/(([\w-]+)(?::([^;]+))?;?)/,h=Ae("ngSrc,ngSrcset,src,srcset"),l=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,m=/^(on[a-z]+|formaction)$/,p=T();this.directive=function pa(b,d){gb(b,"name");Ja(b,"directive");C(b)?(c(b),gb(d,"directiveFactory"),f.hasOwnProperty(b)||(f[b]=[],a.factory(b+"Directive",["$injector","$exceptionHandler",function(a,c){var d=[];r(f[b],function(f,
g){try{var h=a.invoke(f);B(h)?h={compile:ia(h)}:!h.compile&&h.link&&(h.compile=ia(h.link));h.priority=h.priority||0;h.index=g;h.name=h.name||b;h.require=e(h);var k=h,l=h.restrict;if(l&&(!C(l)||!/[EACM]/.test(l)))throw $("badrestrict",l,b);k.restrict=l||"EA";h.$$moduleName=f.$$moduleName;d.push(h)}catch(m){c(m)}});return d}])),f[b].push(d)):r(b,Zb(pa));return this};this.component=function y(a,b){function c(a){function e(b){return B(b)||H(b)?function(c,d){return a.invoke(b,this,{$element:c,$attrs:d})}:
b}var f=b.template||b.templateUrl?b.template:"",g={controller:d,controllerAs:Gg(b.controller)||b.controllerAs||"$ctrl",template:e(f),templateUrl:e(b.templateUrl),transclude:b.transclude,scope:{},bindToController:b.bindings||{},restrict:"E",require:b.require};r(b,function(a,b){"$"===b.charAt(0)&&(g[b]=a)});return g}if(!C(a))return r(a,Zb(Va(this,y))),this;var d=b.controller||function(){};r(b,function(a,b){"$"===b.charAt(0)&&(c[b]=a,B(d)&&(d[b]=a))});c.$inject=["$injector"];return this.directive(a,
c)};this.aHrefSanitizationTrustedUrlList=function(a){return w(a)?(b.aHrefSanitizationTrustedUrlList(a),this):b.aHrefSanitizationTrustedUrlList()};Object.defineProperty(this,"aHrefSanitizationWhitelist",{get:function(){return this.aHrefSanitizationTrustedUrlList},set:function(a){this.aHrefSanitizationTrustedUrlList=a}});this.imgSrcSanitizationTrustedUrlList=function(a){return w(a)?(b.imgSrcSanitizationTrustedUrlList(a),this):b.imgSrcSanitizationTrustedUrlList()};Object.defineProperty(this,"imgSrcSanitizationWhitelist",
{get:function(){return this.imgSrcSanitizationTrustedUrlList},set:function(a){this.imgSrcSanitizationTrustedUrlList=a}});var n=!0;this.debugInfoEnabled=function(a){return w(a)?(n=a,this):n};var s=!1;this.strictComponentBindingsEnabled=function(a){return w(a)?(s=a,this):s};var G=10;this.onChangesTtl=function(a){return arguments.length?(G=a,this):G};var t=!0;this.commentDirectivesEnabled=function(a){return arguments.length?(t=a,this):t};var N=!0;this.cssClassDirectivesEnabled=function(a){return arguments.length?
(N=a,this):N};var v=T();this.addPropertySecurityContext=function(a,b,c){var d=a.toLowerCase()+"|"+b.toLowerCase();if(d in v&&v[d]!==c)throw $("ctxoverride",a,b,v[d],c);v[d]=c;return this};(function(){function a(b,c){r(c,function(a){v[a.toLowerCase()]=b})}a(W.HTML,["iframe|srcdoc","*|innerHTML","*|outerHTML"]);a(W.CSS,["*|style"]);a(W.URL,"area|href area|ping a|href a|ping blockquote|cite body|background del|cite input|src ins|cite q|cite".split(" "));a(W.MEDIA_URL,"audio|src img|src img|srcset source|src source|srcset track|src video|src video|poster".split(" "));
a(W.RESOURCE_URL,"*|formAction applet|code applet|codebase base|href embed|src frame|src form|action head|profile html|manifest iframe|src link|href media|src object|codebase object|data script|src".split(" "))})();this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$sce","$animate",function(a,b,c,e,p,M,L,u,R){function q(){try{if(!--Ja)throw Ua=void 0,$("infchng",G);L.$apply(function(){for(var a=0,b=Ua.length;a<b;++a)try{Ua[a]()}catch(d){c(d)}Ua=
void 0})}finally{Ja++}}function ma(a,b){if(!a)return a;if(!C(a))throw $("srcset",b,a.toString());for(var c="",d=V(a),e=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,e=/\s/.test(d)?e:/(,)/,d=d.split(e),e=Math.floor(d.length/2),f=0;f<e;f++)var g=2*f,c=c+u.getTrustedMediaUrl(V(d[g])),c=c+(" "+V(d[g+1]));d=V(d[2*f]).split(/\s/);c+=u.getTrustedMediaUrl(V(d[0]));2===d.length&&(c+=" "+V(d[1]));return c}function w(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr=
{};this.$$element=a}function O(a,b,c){Fa.innerHTML="<span "+b+">";b=Fa.firstChild.attributes;var d=b[0];b.removeNamedItem(d.name);d.value=c;a.attributes.setNamedItem(d)}function sa(a,b){try{a.addClass(b)}catch(c){}}function da(a,b,c,d,e){a instanceof x||(a=x(a));var f=Xa(a,b,a,c,d,e);da.$$addScopeClass(a);var g=null;return function(b,c,d){if(!a)throw $("multilink");gb(b,"scope");e&&e.needsNewScope&&(b=b.$parent.$new());d=d||{};var h=d.parentBoundTranscludeFn,k=d.transcludeControllers;d=d.futureParentElement;
h&&h.$$boundTransclude&&(h=h.$$boundTransclude);g||(g=(d=d&&d[0])?"foreignobject"!==ua(d)&&la.call(d).match(/SVG/)?"svg":"html":"html");d="html"!==g?x(ja(g,x("<div></div>").append(a).html())):c?Wa.clone.call(a):a;if(k)for(var l in k)d.data("$"+l+"Controller",k[l].instance);da.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,h);c||(a=f=null);return d}}function Xa(a,b,c,d,e,f){function g(a,c,d,e){var f,k,l,m,p,I,t;if(n)for(t=Array(c.length),m=0;m<h.length;m+=3)f=h[m],t[f]=c[f];else t=c;m=0;for(p=h.length;m<
p;)k=t[h[m++]],c=h[m++],f=h[m++],c?(c.scope?(l=a.$new(),da.$$addScopeInfo(x(k),l)):l=a,I=c.transcludeOnThisElement?ka(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?ka(a,b):null,c(f,l,k,d,I)):f&&f(a,k.childNodes,void 0,e)}for(var h=[],k=H(a)||a instanceof x,l,m,p,I,n,t=0;t<a.length;t++){l=new w;11===wa&&jb(a,t,k);m=tc(a[t],[],l,0===t?d:void 0,e);(f=m.length?aa(m,a[t],l,b,c,null,[],[],f):null)&&f.scope&&da.$$addScopeClass(l.$$element);l=f&&f.terminal||!(p=a[t].childNodes)||!p.length?null:Xa(p,
f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||l)h.push(t,f,l),I=!0,n=n||f;f=null}return I?g:null}function jb(a,b,c){var d=a[b],e=d.parentNode,f;if(d.nodeType===Pa)for(;;){f=e?d.nextSibling:a[b+1];if(!f||f.nodeType!==Pa)break;d.nodeValue+=f.nodeValue;f.parentNode&&f.parentNode.removeChild(f);c&&f===a[b+1]&&a.splice(b+1,1)}}function ka(a,b,c){function d(e,f,g,h,k){e||(e=a.$new(!1,k),e.$$transcluded=!0);return b(e,f,{parentBoundTranscludeFn:c,transcludeControllers:g,
futureParentElement:h})}var e=d.$$slots=T(),f;for(f in b.$$slots)e[f]=b.$$slots[f]?ka(a,b.$$slots[f],c):null;return d}function tc(a,b,d,e,f){var g=d.$attr,h;switch(a.nodeType){case 1:h=ua(a);Y(b,xa(h),"E",e,f);for(var l,m,n,t,J,s=a.attributes,v=0,G=s&&s.length;v<G;v++){var P=!1,N=!1,r=!1,y=!1,u=!1,M;l=s[v];m=l.name;t=l.value;n=xa(m.toLowerCase());(J=n.match(Ra))?(r="Attr"===J[1],y="Prop"===J[1],u="On"===J[1],m=m.replace(rd,"").toLowerCase().substr(4+J[1].length).replace(/_(.)/g,function(a,b){return b.toUpperCase()})):
(M=n.match(Sa))&&ca(M[1])&&(P=m,N=m.substr(0,m.length-5)+"end",m=m.substr(0,m.length-6));if(y||u)d[n]=t,g[n]=l.name,y?Ea(a,b,n,m):b.push(sd(p,L,c,n,m,!1));else{n=xa(m.toLowerCase());g[n]=m;if(r||!d.hasOwnProperty(n))d[n]=t,nd(a,n)&&(d[n]=!0);Ia(a,b,t,n,r);Y(b,n,"A",e,f,P,N)}}"input"===h&&"hidden"===a.getAttribute("type")&&a.setAttribute("autocomplete","off");if(!Qa)break;g=a.className;D(g)&&(g=g.animVal);if(C(g)&&""!==g)for(;a=k.exec(g);)n=xa(a[2]),Y(b,n,"C",e,f)&&(d[n]=V(a[3])),g=g.substr(a.index+
a[0].length);break;case Pa:na(b,a.nodeValue);break;case 8:if(!Oa)break;F(a,b,d,e,f)}b.sort(ia);return b}function F(a,b,c,d,e){try{var f=g.exec(a.nodeValue);if(f){var h=xa(f[1]);Y(b,h,"M",d,e)&&(c[h]=V(f[2]))}}catch(k){}}function U(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw $("uterdir",b,c);1===a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return x(d)}function W(a,b,c){return function(d,e,f,g,h){e=U(e[0],
b,c);return a(d,e,f,g,h)}}function Z(a,b,c,d,e,f){var g;return a?da(b,c,d,e,f):function(){g||(g=da(b,c,d,e,f),b=c=f=null);return g.apply(this,arguments)}}function aa(a,b,d,e,f,g,h,k,l){function m(a,b,c,d){if(a){c&&(a=W(a,c,d));a.require=u.require;a.directiveName=Q;if(s===u||u.$$isolateScope)a=Ba(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=W(b,c,d));b.require=u.require;b.directiveName=Q;if(s===u||u.$$isolateScope)b=Ba(b,{isolateScope:!0});k.push(b)}}function p(a,e,f,g,l){function m(a,b,c,d){var e;bb(a)||
(d=c,c=b,b=a,a=void 0);N&&(e=P);c||(c=N?Q.parent():Q);if(d){var f=l.$$slots[d];if(f)return f(a,b,e,c,R);if(A(f))throw $("noslot",d,Aa(Q));}else return l(a,b,e,c,R)}var n,u,L,y,G,P,M,Q;b===f?(g=d,Q=d.$$element):(Q=x(f),g=new w(Q,d));G=e;s?y=e.$new(!0):t&&(G=e.$parent);l&&(M=m,M.$$boundTransclude=l,M.isSlotFilled=function(a){return!!l.$$slots[a]});J&&(P=ea(Q,g,M,J,y,e,s));s&&(da.$$addScopeInfo(Q,y,!0,!(v&&(v===s||v===s.$$originalDirective))),da.$$addScopeClass(Q,!0),y.$$isolateBindings=s.$$isolateBindings,
u=Da(e,g,y,y.$$isolateBindings,s),u.removeWatches&&y.$on("$destroy",u.removeWatches));for(n in P){u=J[n];L=P[n];var Hg=u.$$bindings.bindToController;L.instance=L();Q.data("$"+u.name+"Controller",L.instance);L.bindingInfo=Da(G,g,L.instance,Hg,u)}r(J,function(a,b){var c=a.require;a.bindToController&&!H(c)&&D(c)&&S(P[b].instance,X(b,c,Q,P))});r(P,function(a){var b=a.instance;if(B(b.$onChanges))try{b.$onChanges(a.bindingInfo.initialChanges)}catch(d){c(d)}if(B(b.$onInit))try{b.$onInit()}catch(e){c(e)}B(b.$doCheck)&&
(G.$watch(function(){b.$doCheck()}),b.$doCheck());B(b.$onDestroy)&&G.$on("$destroy",function(){b.$onDestroy()})});n=0;for(u=h.length;n<u;n++)L=h[n],Ca(L,L.isolateScope?y:e,Q,g,L.require&&X(L.directiveName,L.require,Q,P),M);var R=e;s&&(s.template||null===s.templateUrl)&&(R=y);a&&a(R,f.childNodes,void 0,l);for(n=k.length-1;0<=n;n--)L=k[n],Ca(L,L.isolateScope?y:e,Q,g,L.require&&X(L.directiveName,L.require,Q,P),M);r(P,function(a){a=a.instance;B(a.$postLink)&&a.$postLink()})}l=l||{};for(var n=-Number.MAX_VALUE,
t=l.newScopeDirective,J=l.controllerDirectives,s=l.newIsolateScopeDirective,v=l.templateDirective,L=l.nonTlbTranscludeDirective,G=!1,P=!1,N=l.hasElementTranscludeDirective,y=d.$$element=x(b),u,Q,M,R=e,q,ma=!1,Jb=!1,O,sa=0,C=a.length;sa<C;sa++){u=a[sa];var E=u.$$start,jb=u.$$end;E&&(y=U(b,E,jb));M=void 0;if(n>u.priority)break;if(O=u.scope)u.templateUrl||(D(O)?(ba("new/isolated scope",s||t,u,y),s=u):ba("new/isolated scope",s,u,y)),t=t||u;Q=u.name;if(!ma&&(u.replace&&(u.templateUrl||u.template)||u.transclude&&
!u.$$tlb)){for(O=sa+1;ma=a[O++];)if(ma.transclude&&!ma.$$tlb||ma.replace&&(ma.templateUrl||ma.template)){Jb=!0;break}ma=!0}!u.templateUrl&&u.controller&&(J=J||T(),ba("'"+Q+"' controller",J[Q],u,y),J[Q]=u);if(O=u.transclude)if(G=!0,u.$$tlb||(ba("transclusion",L,u,y),L=u),"element"===O)N=!0,n=u.priority,M=y,y=d.$$element=x(da.$$createComment(Q,d[Q])),b=y[0],oa(f,Ha.call(M,0),b),R=Z(Jb,M,e,n,g&&g.name,{nonTlbTranscludeDirective:L});else{var ka=T();if(D(O)){M=z.document.createDocumentFragment();var Xa=
T(),F=T();r(O,function(a,b){var c="?"===a.charAt(0);a=c?a.substring(1):a;Xa[a]=b;ka[b]=null;F[b]=c});r(y.contents(),function(a){var b=Xa[xa(ua(a))];b?(F[b]=!0,ka[b]=ka[b]||z.document.createDocumentFragment(),ka[b].appendChild(a)):M.appendChild(a)});r(F,function(a,b){if(!a)throw $("reqslot",b);});for(var K in ka)ka[K]&&(R=x(ka[K].childNodes),ka[K]=Z(Jb,R,e));M=x(M.childNodes)}else M=x(qc(b)).contents();y.empty();R=Z(Jb,M,e,void 0,void 0,{needsNewScope:u.$$isolateScope||u.$$newScope});R.$$slots=ka}if(u.template)if(P=
!0,ba("template",v,u,y),v=u,O=B(u.template)?u.template(y,d):u.template,O=Na(O),u.replace){g=u;M=nc.test(O)?td(ja(u.templateNamespace,V(O))):[];b=M[0];if(1!==M.length||1!==b.nodeType)throw $("tplrt",Q,"");oa(f,y,b);C={$attr:{}};O=tc(b,[],C);var Ig=a.splice(sa+1,a.length-(sa+1));(s||t)&&fa(O,s,t);a=a.concat(O).concat(Ig);ga(d,C);C=a.length}else y.html(O);if(u.templateUrl)P=!0,ba("template",v,u,y),v=u,u.replace&&(g=u),p=ha(a.splice(sa,a.length-sa),y,d,f,G&&R,h,k,{controllerDirectives:J,newScopeDirective:t!==
u&&t,newIsolateScopeDirective:s,templateDirective:v,nonTlbTranscludeDirective:L}),C=a.length;else if(u.compile)try{q=u.compile(y,d,R);var Y=u.$$originalDirective||u;B(q)?m(null,Va(Y,q),E,jb):q&&m(Va(Y,q.pre),Va(Y,q.post),E,jb)}catch(ca){c(ca,Aa(y))}u.terminal&&(p.terminal=!0,n=Math.max(n,u.priority))}p.scope=t&&!0===t.scope;p.transcludeOnThisElement=G;p.templateOnThisElement=P;p.transclude=R;l.hasElementTranscludeDirective=N;return p}function X(a,b,c,d){var e;if(C(b)){var f=b.match(l);b=b.substring(f[0].length);
var g=f[1]||f[3],f="?"===f[2];"^^"===g?c=c.parent():e=(e=d&&d[b])&&e.instance;if(!e){var h="$"+b+"Controller";e="^^"===g&&c[0]&&9===c[0].nodeType?null:g?c.inheritedData(h):c.data(h)}if(!e&&!f)throw $("ctreq",b,a);}else if(H(b))for(e=[],g=0,f=b.length;g<f;g++)e[g]=X(a,b[g],c,d);else D(b)&&(e={},r(b,function(b,f){e[f]=X(a,b,c,d)}));return e||null}function ea(a,b,c,d,e,f,g){var h=T(),k;for(k in d){var l=d[k],m={$scope:l===g||l.$$isolateScope?e:f,$element:a,$attrs:b,$transclude:c},p=l.controller;"@"===
p&&(p=b[l.name]);m=M(p,m,!0,l.controllerAs);h[l.name]=m;a.data("$"+l.name+"Controller",m.instance)}return h}function fa(a,b,c){for(var d=0,e=a.length;d<e;d++)a[d]=bc(a[d],{$$isolateScope:b,$$newScope:c})}function Y(b,c,e,g,h,k,l){if(c===h)return null;var m=null;if(f.hasOwnProperty(c)){h=a.get(c+"Directive");for(var p=0,n=h.length;p<n;p++)if(c=h[p],(A(g)||g>c.priority)&&-1!==c.restrict.indexOf(e)){k&&(c=bc(c,{$$start:k,$$end:l}));if(!c.$$bindings){var I=m=c,t=c.name,u={isolateScope:null,bindToController:null};
D(I.scope)&&(!0===I.bindToController?(u.bindToController=d(I.scope,t,!0),u.isolateScope={}):u.isolateScope=d(I.scope,t,!1));D(I.bindToController)&&(u.bindToController=d(I.bindToController,t,!0));if(u.bindToController&&!I.controller)throw $("noctrl",t);m=m.$$bindings=u;D(m.isolateScope)&&(c.$$isolateBindings=m.isolateScope)}b.push(c);m=c}}return m}function ca(b){if(f.hasOwnProperty(b))for(var c=a.get(b+"Directive"),d=0,e=c.length;d<e;d++)if(b=c[d],b.multiElement)return!0;return!1}function ga(a,b){var c=
b.$attr,d=a.$attr;r(a,function(d,e){"$"!==e.charAt(0)&&(b[e]&&b[e]!==d&&(d=d.length?d+(("style"===e?";":" ")+b[e]):b[e]),a.$set(e,d,!0,c[e]))});r(b,function(b,e){a.hasOwnProperty(e)||"$"===e.charAt(0)||(a[e]=b,"class"!==e&&"style"!==e&&(d[e]=c[e]))})}function ha(a,b,d,f,g,h,k,l){var m=[],p,n,t=b[0],u=a.shift(),J=bc(u,{templateUrl:null,transclude:null,replace:null,$$originalDirective:u}),s=B(u.templateUrl)?u.templateUrl(b,d):u.templateUrl,L=u.templateNamespace;b.empty();e(s).then(function(c){var e,
I;c=Na(c);if(u.replace){c=nc.test(c)?td(ja(L,V(c))):[];e=c[0];if(1!==c.length||1!==e.nodeType)throw $("tplrt",u.name,s);c={$attr:{}};oa(f,b,e);var v=tc(e,[],c);D(u.scope)&&fa(v,!0);a=v.concat(a);ga(d,c)}else e=t,b.html(c);a.unshift(J);p=aa(a,e,d,g,b,u,h,k,l);r(f,function(a,c){a===e&&(f[c]=b[0])});for(n=Xa(b[0].childNodes,g);m.length;){c=m.shift();I=m.shift();var y=m.shift(),P=m.shift(),v=b[0];if(!c.$$destroyed){if(I!==t){var G=I.className;l.hasElementTranscludeDirective&&u.replace||(v=qc(e));oa(y,
x(I),v);sa(x(v),G)}I=p.transcludeOnThisElement?ka(c,p.transclude,P):P;p(n,c,v,f,I)}}m=null}).catch(function(a){dc(a)&&c(a)});return function(a,b,c,d,e){a=e;b.$$destroyed||(m?m.push(b,c,d,a):(p.transcludeOnThisElement&&(a=ka(b,p.transclude,e)),p(n,b,c,d,a)))}}function ia(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function ba(a,b,c,d){function e(a){return a?" (module: "+a+")":""}if(b)throw $("multidir",b.name,e(b.$$moduleName),c.name,e(c.$$moduleName),
a,Aa(d));}function na(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&da.$$addBindingClass(a);return function(a,c){var e=c.parent();b||da.$$addBindingClass(e);da.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function ja(a,b){a=K(a||"html");switch(a){case "svg":case "math":var c=z.document.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function qa(a,b){if("srcdoc"===
b)return u.HTML;if("src"===b||"ngSrc"===b)return-1===["img","video","audio","source","track"].indexOf(a)?u.RESOURCE_URL:u.MEDIA_URL;if("xlinkHref"===b)return"image"===a?u.MEDIA_URL:"a"===a?u.URL:u.RESOURCE_URL;if("form"===a&&"action"===b||"base"===a&&"href"===b||"link"===a&&"href"===b)return u.RESOURCE_URL;if("a"===a&&("href"===b||"ngHref"===b))return u.URL}function ya(a,b){var c=b.toLowerCase();return v[a+"|"+c]||v["*|"+c]}function za(a){return ma(u.valueOf(a),"ng-prop-srcset")}function Ea(a,b,c,
d){if(m.test(d))throw $("nodomevents");a=ua(a);var e=ya(a,d),f=Ta;"srcset"!==d||"img"!==a&&"source"!==a?e&&(f=u.getTrusted.bind(u,e)):f=za;b.push({priority:100,compile:function(a,b){var e=p(b[c]),g=p(b[c],function(a){return u.valueOf(a)});return{pre:function(a,b){function c(){var g=e(a);b[0][d]=f(g)}c();a.$watch(g,c)}}}})}function Ia(a,c,d,e,f){var g=ua(a),k=qa(g,e),l=h[e]||f,p=b(d,!f,k,l);if(p){if("multiple"===e&&"select"===g)throw $("selmulti",Aa(a));if(m.test(e))throw $("nodomevents");c.push({priority:100,
compile:function(){return{pre:function(a,c,f){c=f.$$observers||(f.$$observers=T());var g=f[e];g!==d&&(p=g&&b(g,!0,k,l),d=g);p&&(f[e]=p(a),(c[e]||(c[e]=[])).$$inter=!0,(f.$$observers&&f.$$observers[e].$$scope||a).$watch(p,function(a,b){"class"===e&&a!==b?f.$updateClass(a,b):f.$set(e,a)}))}}}})}}function oa(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]===d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&
(a.context=c);break}f&&f.replaceChild(c,d);a=z.document.createDocumentFragment();for(g=0;g<e;g++)a.appendChild(b[g]);x.hasData(d)&&(x.data(c,x.data(d)),x(d).off("$destroy"));x.cleanData(a.querySelectorAll("*"));for(g=1;g<e;g++)delete b[g];b[0]=c;b.length=1}function Ba(a,b){return S(function(){return a.apply(null,arguments)},a,b)}function Ca(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,Aa(d))}}function ra(a,b){if(s)throw $("missingattr",a,b);}function Da(a,c,d,e,f){function g(b,c,e){B(d.$onChanges)&&
!ec(c,e)&&(Ua||(a.$$postDigest(q),Ua=[]),m||(m={},Ua.push(h)),m[b]&&(e=m[b].previousValue),m[b]=new Kb(e,c))}function h(){d.$onChanges(m);m=void 0}var k=[],l={},m;r(e,function(e,h){var m=e.attrName,n=e.optional,I,t,u,s;switch(e.mode){case "@":n||ta.call(c,m)||(ra(m,f.name),d[h]=c[m]=void 0);n=c.$observe(m,function(a){if(C(a)||Ga(a))g(h,a,d[h]),d[h]=a});c.$$observers[m].$$scope=a;I=c[m];C(I)?d[h]=b(I)(a):Ga(I)&&(d[h]=I);l[h]=new Kb(uc,d[h]);k.push(n);break;case "=":if(!ta.call(c,m)){if(n)break;ra(m,
f.name);c[m]=void 0}if(n&&!c[m])break;t=p(c[m]);s=t.literal?va:ec;u=t.assign||function(){I=d[h]=t(a);throw $("nonassign",c[m],m,f.name);};I=d[h]=t(a);n=function(b){s(b,d[h])||(s(b,I)?u(a,b=d[h]):d[h]=b);return I=b};n.$stateful=!0;n=e.collection?a.$watchCollection(c[m],n):a.$watch(p(c[m],n),null,t.literal);k.push(n);break;case "<":if(!ta.call(c,m)){if(n)break;ra(m,f.name);c[m]=void 0}if(n&&!c[m])break;t=p(c[m]);var v=t.literal,L=d[h]=t(a);l[h]=new Kb(uc,d[h]);n=a[e.collection?"$watchCollection":"$watch"](t,
function(a,b){if(b===a){if(b===L||v&&va(b,L))return;b=L}g(h,a,b);d[h]=a});k.push(n);break;case "&":n||ta.call(c,m)||ra(m,f.name);t=c.hasOwnProperty(m)?p(c[m]):E;if(t===E&&n)break;d[h]=function(b){return t(a,b)}}});return{initialChanges:l,removeWatches:k.length&&function(){for(var a=0,b=k.length;a<b;++a)k[a]()}}}var Ma=/^\w/,Fa=z.document.createElement("div"),Oa=t,Qa=N,Ja=G,Ua;w.prototype={$normalize:xa,$addClass:function(a){a&&0<a.length&&R.addClass(this.$$element,a)},$removeClass:function(a){a&&
0<a.length&&R.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=ud(a,b);c&&c.length&&R.addClass(this.$$element,c);(c=ud(b,a))&&c.length&&R.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=nd(this.$$element[0],a),g=vd[a],h=a;f?(this.$$element.prop(a,b),e=f):g&&(this[g]=b,h=g);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=Xc(a,"-"));"img"===ua(this.$$element)&&"srcset"===a&&(this[a]=b=ma(b,"$set('srcset', value)"));!1!==d&&(null===b||A(b)?this.$$element.removeAttr(e):
Ma.test(e)?f&&!1===b?this.$$element.removeAttr(e):this.$$element.attr(e,b):O(this.$$element[0],e,b));(a=this.$$observers)&&r(a[h],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=T()),e=d[a]||(d[a]=[]);e.push(b);L.$evalAsync(function(){e.$$inter||!c.hasOwnProperty(a)||A(c[a])||b(c[a])});return function(){cb(e,b)}}};var Ka=b.startSymbol(),La=b.endSymbol(),Na="{{"===Ka&&"}}"===La?Ta:function(a){return a.replace(/\{\{/g,Ka).replace(/}}/g,La)},Ra=
/^ng(Attr|Prop|On)([A-Z].*)$/,Sa=/^(.+)Start$/;da.$$addBindingInfo=n?function(a,b){var c=a.data("$binding")||[];H(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:E;da.$$addBindingClass=n?function(a){sa(a,"ng-binding")}:E;da.$$addScopeInfo=n?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:E;da.$$addScopeClass=n?function(a,b){sa(a,b?"ng-isolate-scope":"ng-scope")}:E;da.$$createComment=function(a,b){var c="";n&&(c=" "+(a||"")+": ",b&&(c+=b+" "));return z.document.createComment(c)};
return da}]}function Kb(a,b){this.previousValue=a;this.currentValue=b}function xa(a){return a.replace(rd,"").replace(Jg,function(a,d,c){return c?d.toUpperCase():d})}function ud(a,b){var d="",c=a.split(/\s+/),e=b.split(/\s+/),f=0;a:for(;f<c.length;f++){for(var g=c[f],k=0;k<e.length;k++)if(g===e[k])continue a;d+=(0<d.length?" ":"")+g}return d}function td(a){a=x(a);var b=a.length;if(1>=b)return a;for(;b--;){var d=a[b];(8===d.nodeType||d.nodeType===Pa&&""===d.nodeValue.trim())&&Kg.call(a,b,1)}return a}
function Gg(a,b){if(b&&C(b))return b;if(C(a)){var d=wd.exec(a);if(d)return d[3]}}function Kf(){var a={};this.has=function(b){return a.hasOwnProperty(b)};this.register=function(b,d){Ja(b,"controller");D(b)?S(a,b):a[b]=d};this.$get=["$injector",function(b){function d(a,b,d,g){if(!a||!D(a.$scope))throw F("$controller")("noscp",g,b);a.$scope[b]=d}return function(c,e,f,g){var k,h,l;f=!0===f;g&&C(g)&&(l=g);if(C(c)){g=c.match(wd);if(!g)throw xd("ctrlfmt",c);h=g[1];l=l||g[3];c=a.hasOwnProperty(h)?a[h]:Le(e.$scope,
h,!0);if(!c)throw xd("ctrlreg",h);tb(c,h,!0)}if(f)return f=(H(c)?c[c.length-1]:c).prototype,k=Object.create(f||null),l&&d(e,l,k,h||c.name),S(function(){var a=b.invoke(c,k,e,h);a!==k&&(D(a)||B(a))&&(k=a,l&&d(e,l,k,h||c.name));return k},{instance:k,identifier:l});k=b.instantiate(c,e,h);l&&d(e,l,k,h||c.name);return k}}]}function Lf(){this.$get=["$window",function(a){return x(a.document)}]}function Mf(){this.$get=["$document","$rootScope",function(a,b){function d(){e=c.hidden}var c=a[0],e=c&&c.hidden;
a.on("visibilitychange",d);b.$on("$destroy",function(){a.off("visibilitychange",d)});return function(){return e}}]}function Nf(){this.$get=["$log",function(a){return function(b,d){a.error.apply(a,arguments)}}]}function vc(a){return D(a)?ha(a)?a.toISOString():eb(a):a}function Tf(){this.$get=function(){return function(a){if(!a)return"";var b=[];Qc(a,function(a,c){null===a||A(a)||B(a)||(H(a)?r(a,function(a){b.push(ba(c)+"="+ba(vc(a)))}):b.push(ba(c)+"="+ba(vc(a))))});return b.join("&")}}}function Uf(){this.$get=
function(){return function(a){function b(a,e,f){H(a)?r(a,function(a,c){b(a,e+"["+(D(a)?c:"")+"]")}):D(a)&&!ha(a)?Qc(a,function(a,c){b(a,e+(f?"":"[")+c+(f?"":"]"))}):(B(a)&&(a=a()),d.push(ba(e)+"="+(null==a?"":ba(vc(a)))))}if(!a)return"";var d=[];b(a,"",!0);return d.join("&")}}}function wc(a,b){if(C(a)){var d=a.replace(Lg,"").trim();if(d){var c=b("Content-Type"),c=c&&0===c.indexOf(yd),e;(e=c)||(e=(e=d.match(Mg))&&Ng[e[0]].test(d));if(e)try{a=Tc(d)}catch(f){if(!c)return a;throw Lb("baddata",a,f);}}}return a}
function zd(a){var b=T(),d;C(a)?r(a.split("\n"),function(a){d=a.indexOf(":");var e=K(V(a.substr(0,d)));a=V(a.substr(d+1));e&&(b[e]=b[e]?b[e]+", "+a:a)}):D(a)&&r(a,function(a,d){var f=K(d),g=V(a);f&&(b[f]=b[f]?b[f]+", "+g:g)});return b}function Ad(a){var b;return function(d){b||(b=zd(a));return d?(d=b[K(d)],void 0===d&&(d=null),d):b}}function Bd(a,b,d,c){if(B(c))return c(a,b,d);r(c,function(c){a=c(a,b,d)});return a}function Sf(){var a=this.defaults={transformResponse:[wc],transformRequest:[function(a){return D(a)&&
"[object File]"!==la.call(a)&&"[object Blob]"!==la.call(a)&&"[object FormData]"!==la.call(a)?eb(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ja(xc),put:ja(xc),patch:ja(xc)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",paramSerializer:"$httpParamSerializer",jsonpCallbackParam:"callback"},b=!1;this.useApplyAsync=function(a){return w(a)?(b=!!a,this):b};var d=this.interceptors=[],c=this.xsrfTrustedOrigins=[];Object.defineProperty(this,"xsrfWhitelistedOrigins",
{get:function(){return this.xsrfTrustedOrigins},set:function(a){this.xsrfTrustedOrigins=a}});this.$get=["$browser","$httpBackend","$$cookieReader","$cacheFactory","$rootScope","$q","$injector","$sce",function(e,f,g,k,h,l,m,p){function n(b){function c(a,b){for(var d=0,e=b.length;d<e;){var f=b[d++],g=b[d++];a=a.then(f,g)}b.length=0;return a}function d(a,b){var c,e={};r(a,function(a,d){B(a)?(c=a(b),null!=c&&(e[d]=c)):e[d]=a});return e}function f(a){var b=S({},a);b.data=Bd(a.data,a.headers,a.status,g.transformResponse);
a=a.status;return 200<=a&&300>a?b:l.reject(b)}if(!D(b))throw F("$http")("badreq",b);if(!C(p.valueOf(b.url)))throw F("$http")("badreq",b.url);var g=S({method:"get",transformRequest:a.transformRequest,transformResponse:a.transformResponse,paramSerializer:a.paramSerializer,jsonpCallbackParam:a.jsonpCallbackParam},b);g.headers=function(b){var c=a.headers,e=S({},b.headers),f,g,h,c=S({},c.common,c[K(b.method)]);a:for(f in c){g=K(f);for(h in e)if(K(h)===g)continue a;e[f]=c[f]}return d(e,ja(b))}(b);g.method=
vb(g.method);g.paramSerializer=C(g.paramSerializer)?m.get(g.paramSerializer):g.paramSerializer;e.$$incOutstandingRequestCount("$http");var h=[],k=[];b=l.resolve(g);r(v,function(a){(a.request||a.requestError)&&h.unshift(a.request,a.requestError);(a.response||a.responseError)&&k.push(a.response,a.responseError)});b=c(b,h);b=b.then(function(b){var c=b.headers,d=Bd(b.data,Ad(c),void 0,b.transformRequest);A(d)&&r(c,function(a,b){"content-type"===K(b)&&delete c[b]});A(b.withCredentials)&&!A(a.withCredentials)&&
(b.withCredentials=a.withCredentials);return s(b,d).then(f,f)});b=c(b,k);return b=b.finally(function(){e.$$completeOutstandingRequest(E,"$http")})}function s(c,d){function e(a){if(a){var c={};r(a,function(a,d){c[d]=function(c){function d(){a(c)}b?h.$applyAsync(d):h.$$phase?d():h.$apply(d)}});return c}}function k(a,c,d,e,f){function g(){m(c,a,d,e,f)}R&&(200<=a&&300>a?R.put(O,[a,c,zd(d),e,f]):R.remove(O));b?h.$applyAsync(g):(g(),h.$$phase||h.$apply())}function m(a,b,d,e,f){b=-1<=b?b:0;(200<=b&&300>
b?L.resolve:L.reject)({data:a,status:b,headers:Ad(d),config:c,statusText:e,xhrStatus:f})}function s(a){m(a.data,a.status,ja(a.headers()),a.statusText,a.xhrStatus)}function v(){var a=n.pendingRequests.indexOf(c);-1!==a&&n.pendingRequests.splice(a,1)}var L=l.defer(),u=L.promise,R,q,ma=c.headers,x="jsonp"===K(c.method),O=c.url;x?O=p.getTrustedResourceUrl(O):C(O)||(O=p.valueOf(O));O=G(O,c.paramSerializer(c.params));x&&(O=t(O,c.jsonpCallbackParam));n.pendingRequests.push(c);u.then(v,v);!c.cache&&!a.cache||
!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(R=D(c.cache)?c.cache:D(a.cache)?a.cache:N);R&&(q=R.get(O),w(q)?q&&B(q.then)?q.then(s,s):H(q)?m(q[1],q[0],ja(q[2]),q[3],q[4]):m(q,200,{},"OK","complete"):R.put(O,u));A(q)&&((q=kc(c.url)?g()[c.xsrfCookieName||a.xsrfCookieName]:void 0)&&(ma[c.xsrfHeaderName||a.xsrfHeaderName]=q),f(c.method,O,d,k,ma,c.timeout,c.withCredentials,c.responseType,e(c.eventHandlers),e(c.uploadEventHandlers)));return u}function G(a,b){0<b.length&&(a+=(-1===a.indexOf("?")?
"?":"&")+b);return a}function t(a,b){var c=a.split("?");if(2<c.length)throw Lb("badjsonp",a);c=hc(c[1]);r(c,function(c,d){if("JSON_CALLBACK"===c)throw Lb("badjsonp",a);if(d===b)throw Lb("badjsonp",b,a);});return a+=(-1===a.indexOf("?")?"?":"&")+b+"=JSON_CALLBACK"}var N=k("$http");a.paramSerializer=C(a.paramSerializer)?m.get(a.paramSerializer):a.paramSerializer;var v=[];r(d,function(a){v.unshift(C(a)?m.get(a):m.invoke(a))});var kc=Og(c);n.pendingRequests=[];(function(a){r(arguments,function(a){n[a]=
function(b,c){return n(S({},c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){r(arguments,function(a){n[a]=function(b,c,d){return n(S({},d||{},{method:a,url:b,data:c}))}})})("post","put","patch");n.defaults=a;return n}]}function Wf(){this.$get=function(){return function(){return new z.XMLHttpRequest}}}function Vf(){this.$get=["$browser","$jsonpCallbacks","$document","$xhrFactory",function(a,b,d,c){return Pg(a,c,a.defer,b,d[0])}]}function Pg(a,b,d,c,e){function f(a,b,d){a=a.replace("JSON_CALLBACK",
b);var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m);f.removeEventListener("error",m);e.body.removeChild(f);f=null;var g=-1,s="unknown";a&&("load"!==a.type||c.wasCalled(b)||(a={type:"error"}),s=a.type,g="error"===a.type?404:200);d&&d(g,s)};f.addEventListener("load",m);f.addEventListener("error",m);e.body.appendChild(f);return m}return function(e,k,h,l,m,p,n,s,G,t){function N(a){J="timeout"===a;pa&&pa();y&&y.abort()}function v(a,
b,c,e,f,g){w(P)&&d.cancel(P);pa=y=null;a(b,c,e,f,g)}k=k||a.url();if("jsonp"===K(e))var q=c.createCallback(k),pa=f(k,q,function(a,b){var d=200===a&&c.getResponse(q);v(l,a,d,"",b,"complete");c.removeCallback(q)});else{var y=b(e,k),J=!1;y.open(e,k,!0);r(m,function(a,b){w(a)&&y.setRequestHeader(b,a)});y.onload=function(){var a=y.statusText||"",b="response"in y?y.response:y.responseText,c=1223===y.status?204:y.status;0===c&&(c=b?200:"file"===ga(k).protocol?404:0);v(l,c,b,y.getAllResponseHeaders(),a,"complete")};
y.onerror=function(){v(l,-1,null,null,"","error")};y.ontimeout=function(){v(l,-1,null,null,"","timeout")};y.onabort=function(){v(l,-1,null,null,"",J?"timeout":"abort")};r(G,function(a,b){y.addEventListener(b,a)});r(t,function(a,b){y.upload.addEventListener(b,a)});n&&(y.withCredentials=!0);if(s)try{y.responseType=s}catch(I){if("json"!==s)throw I;}y.send(A(h)?null:h)}if(0<p)var P=d(function(){N("timeout")},p);else p&&B(p.then)&&p.then(function(){N(w(p.$$timeoutId)?"timeout":"abort")})}}function Pf(){var a=
"{{",b="}}";this.startSymbol=function(b){return b?(a=b,this):a};this.endSymbol=function(a){return a?(b=a,this):b};this.$get=["$parse","$exceptionHandler","$sce",function(d,c,e){function f(a){return"\\\\\\"+a}function g(c){return c.replace(p,a).replace(n,b)}function k(a,b,c,d){var e=a.$watch(function(a){e();return d(a)},b,c);return e}function h(f,h,n,p){function v(a){try{return a=n&&!r?e.getTrusted(n,a):e.valueOf(a),p&&!w(a)?a:jc(a)}catch(b){c(Ma.interr(f,b))}}var r=n===e.URL||n===e.MEDIA_URL;if(!f.length||
-1===f.indexOf(a)){if(h)return;h=g(f);r&&(h=e.getTrusted(n,h));h=ia(h);h.exp=f;h.expressions=[];h.$$watchDelegate=k;return h}p=!!p;for(var q,y,J=0,I=[],P,Q=f.length,M=[],L=[],u;J<Q;)if(-1!==(q=f.indexOf(a,J))&&-1!==(y=f.indexOf(b,q+l)))J!==q&&M.push(g(f.substring(J,q))),J=f.substring(q+l,y),I.push(J),J=y+m,L.push(M.length),M.push("");else{J!==Q&&M.push(g(f.substring(J)));break}u=1===M.length&&1===L.length;var R=r&&u?void 0:v;P=I.map(function(a){return d(a,R)});if(!h||I.length){var x=function(a){for(var b=
0,c=I.length;b<c;b++){if(p&&A(a[b]))return;M[L[b]]=a[b]}if(r)return e.getTrusted(n,u?M[0]:M.join(""));n&&1<M.length&&Ma.throwNoconcat(f);return M.join("")};return S(function(a){var b=0,d=I.length,e=Array(d);try{for(;b<d;b++)e[b]=P[b](a);return x(e)}catch(g){c(Ma.interr(f,g))}},{exp:f,expressions:I,$$watchDelegate:function(a,b){var c;return a.$watchGroup(P,function(d,e){var f=x(d);b.call(this,f,d!==e?c:f,a);c=f})}})}}var l=a.length,m=b.length,p=new RegExp(a.replace(/./g,f),"g"),n=new RegExp(b.replace(/./g,
f),"g");h.startSymbol=function(){return a};h.endSymbol=function(){return b};return h}]}function Qf(){this.$get=["$$intervalFactory","$window",function(a,b){var d={},c=function(a){b.clearInterval(a);delete d[a]},e=a(function(a,c,e){a=b.setInterval(a,c);d[a]=e;return a},c);e.cancel=function(a){if(!a)return!1;if(!a.hasOwnProperty("$$intervalId"))throw Qg("badprom");if(!d.hasOwnProperty(a.$$intervalId))return!1;a=a.$$intervalId;var b=d[a],e=b.promise;e.$$state&&(e.$$state.pur=!0);b.reject("canceled");
c(a);return!0};return e}]}function Rf(){this.$get=["$browser","$q","$$q","$rootScope",function(a,b,d,c){return function(e,f){return function(g,k,h,l){function m(){p?g.apply(null,n):g(s)}var p=4<arguments.length,n=p?Ha.call(arguments,4):[],s=0,G=w(l)&&!l,t=(G?d:b).defer(),r=t.promise;h=w(h)?h:0;r.$$intervalId=e(function(){G?a.defer(m):c.$evalAsync(m);t.notify(s++);0<h&&s>=h&&(t.resolve(s),f(r.$$intervalId));G||c.$apply()},k,t,G);return r}}}]}function Cd(a,b){var d=ga(a);b.$$protocol=d.protocol;b.$$host=
d.hostname;b.$$port=fa(d.port)||Rg[d.protocol]||null}function Dd(a,b,d){if(Sg.test(a))throw kb("badpath",a);var c="/"!==a.charAt(0);c&&(a="/"+a);a=ga(a);for(var c=(c&&"/"===a.pathname.charAt(0)?a.pathname.substring(1):a.pathname).split("/"),e=c.length;e--;)c[e]=decodeURIComponent(c[e]),d&&(c[e]=c[e].replace(/\//g,"%2F"));d=c.join("/");b.$$path=d;b.$$search=hc(a.search);b.$$hash=decodeURIComponent(a.hash);b.$$path&&"/"!==b.$$path.charAt(0)&&(b.$$path="/"+b.$$path)}function yc(a,b){return a.slice(0,
b.length)===b}function ya(a,b){if(yc(b,a))return b.substr(a.length)}function Da(a){var b=a.indexOf("#");return-1===b?a:a.substr(0,b)}function zc(a,b,d){this.$$html5=!0;d=d||"";Cd(a,this);this.$$parse=function(a){var d=ya(b,a);if(!C(d))throw kb("ipthprfx",a,b);Dd(d,this,!0);this.$$path||(this.$$path="/");this.$$compose()};this.$$normalizeUrl=function(a){return b+a.substr(1)};this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;w(f=ya(a,c))?(g=f,g=d&&w(f=ya(d,f))?
b+(ya("/",f)||f):a+g):w(f=ya(b,c))?g=b+f:b===c+"/"&&(g=b);g&&this.$$parse(g);return!!g}}function Ac(a,b,d){Cd(a,this);this.$$parse=function(c){var e=ya(a,c)||ya(b,c),f;A(e)||"#"!==e.charAt(0)?this.$$html5?f=e:(f="",A(e)&&(a=c,this.replace())):(f=ya(d,e),A(f)&&(f=e));Dd(f,this,!1);c=this.$$path;var e=a,g=/^\/[A-Z]:(\/.*)/;yc(f,e)&&(f=f.replace(e,""));g.exec(f)||(c=(f=g.exec(c))?f[1]:c);this.$$path=c;this.$$compose()};this.$$normalizeUrl=function(b){return a+(b?d+b:"")};this.$$parseLinkUrl=function(b,
d){return Da(a)===Da(b)?(this.$$parse(b),!0):!1}}function Ed(a,b,d){this.$$html5=!0;Ac.apply(this,arguments);this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;a===Da(c)?f=c:(g=ya(b,c))?f=a+d+g:b===c+"/"&&(f=b);f&&this.$$parse(f);return!!f};this.$$normalizeUrl=function(b){return a+d+b}}function Mb(a){return function(){return this[a]}}function Fd(a,b){return function(d){if(A(d))return this[a];this[a]=b(d);this.$$compose();return this}}function Yf(){var a="!",
b={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(b){return w(b)?(a=b,this):a};this.html5Mode=function(a){if(Ga(a))return b.enabled=a,this;if(D(a)){Ga(a.enabled)&&(b.enabled=a.enabled);Ga(a.requireBase)&&(b.requireBase=a.requireBase);if(Ga(a.rewriteLinks)||C(a.rewriteLinks))b.rewriteLinks=a.rewriteLinks;return this}return b};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(d,c,e,f,g){function k(a,b){return a===b||ga(a).href===ga(b).href}function h(a,
b,d){var e=m.url(),f=m.$$state;try{c.url(a,b,d),m.$$state=c.state()}catch(g){throw m.url(e),m.$$state=f,g;}}function l(a,b){d.$broadcast("$locationChangeSuccess",m.absUrl(),a,m.$$state,b)}var m,p;p=c.baseHref();var n=c.url(),s;if(b.enabled){if(!p&&b.requireBase)throw kb("nobase");s=n.substring(0,n.indexOf("/",n.indexOf("//")+2))+(p||"/");p=e.history?zc:Ed}else s=Da(n),p=Ac;var r=s.substr(0,Da(s).lastIndexOf("/")+1);m=new p(s,r,"#"+a);m.$$parseLinkUrl(n,n);m.$$state=c.state();var t=/^\s*(javascript|mailto):/i;
f.on("click",function(a){var e=b.rewriteLinks;if(e&&!a.ctrlKey&&!a.metaKey&&!a.shiftKey&&2!==a.which&&2!==a.button){for(var g=x(a.target);"a"!==ua(g[0]);)if(g[0]===f[0]||!(g=g.parent())[0])return;if(!C(e)||!A(g.attr(e))){var e=g.prop("href"),h=g.attr("href")||g.attr("xlink:href");D(e)&&"[object SVGAnimatedString]"===e.toString()&&(e=ga(e.animVal).href);t.test(e)||!e||g.attr("target")||a.isDefaultPrevented()||!m.$$parseLinkUrl(e,h)||(a.preventDefault(),m.absUrl()!==c.url()&&d.$apply())}}});m.absUrl()!==
n&&c.url(m.absUrl(),!0);var N=!0;c.onUrlChange(function(a,b){yc(a,r)?(d.$evalAsync(function(){var c=m.absUrl(),e=m.$$state,f;m.$$parse(a);m.$$state=b;f=d.$broadcast("$locationChangeStart",a,c,b,e).defaultPrevented;m.absUrl()===a&&(f?(m.$$parse(c),m.$$state=e,h(c,!1,e)):(N=!1,l(c,e)))}),d.$$phase||d.$digest()):g.location.href=a});d.$watch(function(){if(N||m.$$urlUpdatedByLocation){m.$$urlUpdatedByLocation=!1;var a=c.url(),b=m.absUrl(),f=c.state(),g=m.$$replace,n=!k(a,b)||m.$$html5&&e.history&&f!==
m.$$state;if(N||n)N=!1,d.$evalAsync(function(){var b=m.absUrl(),c=d.$broadcast("$locationChangeStart",b,a,m.$$state,f).defaultPrevented;m.absUrl()===b&&(c?(m.$$parse(a),m.$$state=f):(n&&h(b,g,f===m.$$state?null:m.$$state),l(a,f)))})}m.$$replace=!1});return m}]}function Zf(){var a=!0,b=this;this.debugEnabled=function(b){return w(b)?(a=b,this):a};this.$get=["$window",function(d){function c(a){dc(a)&&(a.stack&&f?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&
(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=d.console||{},e=b[a]||b.log||E;return function(){var a=[];r(arguments,function(b){a.push(c(b))});return Function.prototype.apply.call(e,b,a)}}var f=wa||/\bEdge\//.test(d.navigator&&d.navigator.userAgent);return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){a&&c.apply(b,arguments)}}()}}]}function Tg(a){return a+""}function Ug(a,b){return"undefined"!==typeof a?a:
b}function Gd(a,b){return"undefined"===typeof a?b:"undefined"===typeof b?a:a+b}function Vg(a,b){switch(a.type){case q.MemberExpression:if(a.computed)return!1;break;case q.UnaryExpression:return 1;case q.BinaryExpression:return"+"!==a.operator?1:!1;case q.CallExpression:return!1}return void 0===b?Hd:b}function Z(a,b,d){var c,e,f=a.isPure=Vg(a,d);switch(a.type){case q.Program:c=!0;r(a.body,function(a){Z(a.expression,b,f);c=c&&a.expression.constant});a.constant=c;break;case q.Literal:a.constant=!0;a.toWatch=
[];break;case q.UnaryExpression:Z(a.argument,b,f);a.constant=a.argument.constant;a.toWatch=a.argument.toWatch;break;case q.BinaryExpression:Z(a.left,b,f);Z(a.right,b,f);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.left.toWatch.concat(a.right.toWatch);break;case q.LogicalExpression:Z(a.left,b,f);Z(a.right,b,f);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.constant?[]:[a];break;case q.ConditionalExpression:Z(a.test,b,f);Z(a.alternate,b,f);Z(a.consequent,b,f);a.constant=a.test.constant&&
a.alternate.constant&&a.consequent.constant;a.toWatch=a.constant?[]:[a];break;case q.Identifier:a.constant=!1;a.toWatch=[a];break;case q.MemberExpression:Z(a.object,b,f);a.computed&&Z(a.property,b,f);a.constant=a.object.constant&&(!a.computed||a.property.constant);a.toWatch=a.constant?[]:[a];break;case q.CallExpression:c=d=a.filter?!b(a.callee.name).$stateful:!1;e=[];r(a.arguments,function(a){Z(a,b,f);c=c&&a.constant;e.push.apply(e,a.toWatch)});a.constant=c;a.toWatch=d?e:[a];break;case q.AssignmentExpression:Z(a.left,
b,f);Z(a.right,b,f);a.constant=a.left.constant&&a.right.constant;a.toWatch=[a];break;case q.ArrayExpression:c=!0;e=[];r(a.elements,function(a){Z(a,b,f);c=c&&a.constant;e.push.apply(e,a.toWatch)});a.constant=c;a.toWatch=e;break;case q.ObjectExpression:c=!0;e=[];r(a.properties,function(a){Z(a.value,b,f);c=c&&a.value.constant;e.push.apply(e,a.value.toWatch);a.computed&&(Z(a.key,b,!1),c=c&&a.key.constant,e.push.apply(e,a.key.toWatch))});a.constant=c;a.toWatch=e;break;case q.ThisExpression:a.constant=
!1;a.toWatch=[];break;case q.LocalsExpression:a.constant=!1,a.toWatch=[]}}function Id(a){if(1===a.length){a=a[0].expression;var b=a.toWatch;return 1!==b.length?b:b[0]!==a?b:void 0}}function Jd(a){return a.type===q.Identifier||a.type===q.MemberExpression}function Kd(a){if(1===a.body.length&&Jd(a.body[0].expression))return{type:q.AssignmentExpression,left:a.body[0].expression,right:{type:q.NGValueParameter},operator:"="}}function Ld(a){this.$filter=a}function Md(a){this.$filter=a}function Nb(a,b,d){this.ast=
new q(a,d);this.astCompiler=d.csp?new Md(b):new Ld(b)}function Bc(a){return B(a.valueOf)?a.valueOf():Wg.call(a)}function $f(){var a=T(),b={"true":!0,"false":!1,"null":null,undefined:void 0},d,c;this.addLiteral=function(a,c){b[a]=c};this.setIdentifierFns=function(a,b){d=a;c=b;return this};this.$get=["$filter",function(e){function f(b,c){var d,f;switch(typeof b){case "string":return f=b=b.trim(),d=a[f],d||(d=new Ob(G),d=(new Nb(d,e,G)).parse(b),a[f]=p(d)),s(d,c);case "function":return s(b,c);default:return s(E,
c)}}function g(a,b,c){return null==a||null==b?a===b:"object"!==typeof a||(a=Bc(a),"object"!==typeof a||c)?a===b||a!==a&&b!==b:!1}function k(a,b,c,d,e){var f=d.inputs,h;if(1===f.length){var k=g,f=f[0];return a.$watch(function(a){var b=f(a);g(b,k,f.isPure)||(h=d(a,void 0,void 0,[b]),k=b&&Bc(b));return h},b,c,e)}for(var l=[],m=[],n=0,p=f.length;n<p;n++)l[n]=g,m[n]=null;return a.$watch(function(a){for(var b=!1,c=0,e=f.length;c<e;c++){var k=f[c](a);if(b||(b=!g(k,l[c],f[c].isPure)))m[c]=k,l[c]=k&&Bc(k)}b&&
(h=d(a,void 0,void 0,m));return h},b,c,e)}function h(a,b,c,d,e){function f(){h(m)&&k()}function g(a,b,c,d){m=u&&d?d[0]:n(a,b,c,d);h(m)&&a.$$postDigest(f);return s(m)}var h=d.literal?l:w,k,m,n=d.$$intercepted||d,s=d.$$interceptor||Ta,u=d.inputs&&!n.inputs;g.literal=d.literal;g.constant=d.constant;g.inputs=d.inputs;p(g);return k=a.$watch(g,b,c,e)}function l(a){var b=!0;r(a,function(a){w(a)||(b=!1)});return b}function m(a,b,c,d){var e=a.$watch(function(a){e();return d(a)},b,c);return e}function p(a){a.constant?
a.$$watchDelegate=m:a.oneTime?a.$$watchDelegate=h:a.inputs&&(a.$$watchDelegate=k);return a}function n(a,b){function c(d){return b(a(d))}c.$stateful=a.$stateful||b.$stateful;c.$$pure=a.$$pure&&b.$$pure;return c}function s(a,b){if(!b)return a;a.$$interceptor&&(b=n(a.$$interceptor,b),a=a.$$intercepted);var c=!1,d=function(d,e,f,g){d=c&&g?g[0]:a(d,e,f,g);return b(d)};d.$$intercepted=a;d.$$interceptor=b;d.literal=a.literal;d.oneTime=a.oneTime;d.constant=a.constant;b.$stateful||(c=!a.inputs,d.inputs=a.inputs?
a.inputs:[a],b.$$pure||(d.inputs=d.inputs.map(function(a){return a.isPure===Hd?function(b){return a(b)}:a})));return p(d)}var G={csp:Ba().noUnsafeEval,literals:Ia(b),isIdentifierStart:B(d)&&d,isIdentifierContinue:B(c)&&c};f.$$getAst=function(a){var b=new Ob(G);return(new Nb(b,e,G)).getAst(a).ast};return f}]}function bg(){var a=!0;this.$get=["$rootScope","$exceptionHandler",function(b,d){return Nd(function(a){b.$evalAsync(a)},d,a)}];this.errorOnUnhandledRejections=function(b){return w(b)?(a=b,this):
a}}function cg(){var a=!0;this.$get=["$browser","$exceptionHandler",function(b,d){return Nd(function(a){b.defer(a)},d,a)}];this.errorOnUnhandledRejections=function(b){return w(b)?(a=b,this):a}}function Nd(a,b,d){function c(){return new e}function e(){var a=this.promise=new f;this.resolve=function(b){h(a,b)};this.reject=function(b){m(a,b)};this.notify=function(b){n(a,b)}}function f(){this.$$state={status:0}}function g(){for(;!w&&x.length;){var a=x.shift();if(!a.pur){a.pur=!0;var c=a.value,c="Possibly unhandled rejection: "+
("function"===typeof c?c.toString().replace(/ \{[\s\S]*$/,""):A(c)?"undefined":"string"!==typeof c?Ne(c,void 0):c);dc(a.value)?b(a.value,c):b(c)}}}function k(c){!d||c.pending||2!==c.status||c.pur||(0===w&&0===x.length&&a(g),x.push(c));!c.processScheduled&&c.pending&&(c.processScheduled=!0,++w,a(function(){var e,f,k;k=c.pending;c.processScheduled=!1;c.pending=void 0;try{for(var l=0,n=k.length;l<n;++l){c.pur=!0;f=k[l][0];e=k[l][c.status];try{B(e)?h(f,e(c.value)):1===c.status?h(f,c.value):m(f,c.value)}catch(p){m(f,
p),p&&!0===p.$$passToExceptionHandler&&b(p)}}}finally{--w,d&&0===w&&a(g)}}))}function h(a,b){a.$$state.status||(b===a?p(a,v("qcycle",b)):l(a,b))}function l(a,b){function c(b){g||(g=!0,l(a,b))}function d(b){g||(g=!0,p(a,b))}function e(b){n(a,b)}var f,g=!1;try{if(D(b)||B(b))f=b.then;B(f)?(a.$$state.status=-1,f.call(b,c,d,e)):(a.$$state.value=b,a.$$state.status=1,k(a.$$state))}catch(h){d(h)}}function m(a,b){a.$$state.status||p(a,b)}function p(a,b){a.$$state.value=b;a.$$state.status=2;k(a.$$state)}function n(c,
d){var e=c.$$state.pending;0>=c.$$state.status&&e&&e.length&&a(function(){for(var a,c,f=0,g=e.length;f<g;f++){c=e[f][0];a=e[f][3];try{n(c,B(a)?a(d):d)}catch(h){b(h)}}})}function s(a){var b=new f;m(b,a);return b}function G(a,b,c){var d=null;try{B(c)&&(d=c())}catch(e){return s(e)}return d&&B(d.then)?d.then(function(){return b(a)},s):b(a)}function t(a,b,c,d){var e=new f;h(e,a);return e.then(b,c,d)}function q(a){if(!B(a))throw v("norslvr",a);var b=new f;a(function(a){h(b,a)},function(a){m(b,a)});return b}
var v=F("$q",TypeError),w=0,x=[];S(f.prototype,{then:function(a,b,c){if(A(a)&&A(b)&&A(c))return this;var d=new f;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&k(this.$$state);return d},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return G(b,y,a)},function(b){return G(b,s,a)},b)}});var y=t;q.prototype=f.prototype;q.defer=c;q.reject=s;q.when=t;q.resolve=y;q.all=function(a){var b=new f,c=
0,d=H(a)?[]:{};r(a,function(a,e){c++;t(a).then(function(a){d[e]=a;--c||h(b,d)},function(a){m(b,a)})});0===c&&h(b,d);return b};q.race=function(a){var b=c();r(a,function(a){t(a).then(b.resolve,b.reject)});return b.promise};return q}function mg(){this.$get=["$window","$timeout",function(a,b){var d=a.requestAnimationFrame||a.webkitRequestAnimationFrame,c=a.cancelAnimationFrame||a.webkitCancelAnimationFrame||a.webkitCancelRequestAnimationFrame,e=!!d,f=e?function(a){var b=d(a);return function(){c(b)}}:
function(a){var c=b(a,16.66,!1);return function(){b.cancel(c)}};f.supported=e;return f}]}function ag(){function a(a){function b(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$id=++qb;this.$$ChildScope=null;this.$$suspended=!1}b.prototype=a;return b}var b=10,d=F("$rootScope"),c=null,e=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$exceptionHandler","$parse","$browser",
function(f,g,k){function h(a){a.currentScope.$$destroyed=!0}function l(a){9===wa&&(a.$$childHead&&l(a.$$childHead),a.$$nextSibling&&l(a.$$nextSibling));a.$parent=a.$$nextSibling=a.$$prevSibling=a.$$childHead=a.$$childTail=a.$root=a.$$watchers=null}function m(){this.$id=++qb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$suspended=this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=
0;this.$$isolateBindings=null}function p(a){if(v.$$phase)throw d("inprog",v.$$phase);v.$$phase=a}function n(a,b){do a.$$watchersCount+=b;while(a=a.$parent)}function s(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function G(){}function t(){for(;y.length;)try{y.shift()()}catch(a){f(a)}e=null}function q(){null===e&&(e=k.defer(function(){v.$apply(t)},null,"$applyAsync"))}m.prototype={constructor:m,$new:function(b,c){var d;c=c||this;b?(d=new m,
d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=a(this)),d=new this.$$ChildScope);d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d;(b||c!==this)&&d.$on("$destroy",h);return d},$watch:function(a,b,d,e){var f=g(a);b=B(b)?b:E;if(f.$$watchDelegate)return f.$$watchDelegate(this,b,d,f,a);var h=this,k=h.$$watchers,l={fn:b,last:G,get:f,exp:e||a,eq:!!d};c=null;k||(k=h.$$watchers=[],k.$$digestWatchIndex=-1);k.unshift(l);
k.$$digestWatchIndex++;n(this,1);return function(){var a=cb(k,l);0<=a&&(n(h,-1),a<k.$$digestWatchIndex&&k.$$digestWatchIndex--);c=null}},$watchGroup:function(a,b){function c(){h=!1;try{k?(k=!1,b(e,e,g)):b(e,d,g)}finally{for(var f=0;f<a.length;f++)d[f]=e[f]}}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});r(a,function(a,
b){var d=g.$watch(a,function(a){e[b]=a;h||(h=!0,g.$evalAsync(c))});f.push(d)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!A(e)){if(D(e))if(za(e))for(f!==n&&(f=n,t=f.length=0,l++),a=e.length,t!==a&&(l++,f.length=t=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==p&&(f=p={},t=0,l++);a=0;for(b in e)ta.call(e,b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(t++,f[b]=g,l++));if(t>a)for(b in l++,
f)ta.call(e,b)||(t--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$$pure=g(a).literal;c.$stateful=!c.$$pure;var d=this,e,f,h,k=1<b.length,l=0,m=g(a,c),n=[],p={},s=!0,t=0;return this.$watch(m,function(){s?(s=!1,b(e,e,d)):b(e,h,d);if(k)if(D(e))if(za(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)ta.call(e,a)&&(h[a]=e[a]);else h=e})},$digest:function(){var a,g,h,l,m,n,s,r=b,q,y=w.length?v:this,N=[],A,z;p("$digest");k.$$checkUrlChange();this===v&&null!==e&&(k.defer.cancel(e),
t());c=null;do{s=!1;q=y;for(n=0;n<w.length;n++){try{z=w[n],l=z.fn,l(z.scope,z.locals)}catch(C){f(C)}c=null}w.length=0;a:do{if(n=!q.$$suspended&&q.$$watchers)for(n.$$digestWatchIndex=n.length;n.$$digestWatchIndex--;)try{if(a=n[n.$$digestWatchIndex])if(m=a.get,(g=m(q))!==(h=a.last)&&!(a.eq?va(g,h):Y(g)&&Y(h)))s=!0,c=a,a.last=a.eq?Ia(g,null):g,l=a.fn,l(g,h===G?g:h,q),5>r&&(A=4-r,N[A]||(N[A]=[]),N[A].push({msg:B(a.exp)?"fn: "+(a.exp.name||a.exp.toString()):a.exp,newVal:g,oldVal:h}));else if(a===c){s=
!1;break a}}catch(E){f(E)}if(!(n=!q.$$suspended&&q.$$watchersCount&&q.$$childHead||q!==y&&q.$$nextSibling))for(;q!==y&&!(n=q.$$nextSibling);)q=q.$parent}while(q=n);if((s||w.length)&&!r--)throw v.$$phase=null,d("infdig",b,N);}while(s||w.length);for(v.$$phase=null;J<x.length;)try{x[J++]()}catch(D){f(D)}x.length=J=0;k.$$checkUrlChange()},$suspend:function(){this.$$suspended=!0},$isSuspended:function(){return this.$$suspended},$resume:function(){this.$$suspended=!1},$destroy:function(){if(!this.$$destroyed){var a=
this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this===v&&k.$$applicationDestroyed();n(this,-this.$$watchersCount);for(var b in this.$$listenerCount)s(this,this.$$listenerCount[b],b);a&&a.$$childHead===this&&(a.$$childHead=this.$$nextSibling);a&&a.$$childTail===this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=
this.$evalAsync=this.$applyAsync=E;this.$on=this.$watch=this.$watchGroup=function(){return E};this.$$listeners={};this.$$nextSibling=null;l(this)}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a,b){v.$$phase||w.length||k.defer(function(){w.length&&v.$digest()},null,"$evalAsync");w.push({scope:this,fn:g(a),locals:b})},$$postDigest:function(a){x.push(a)},$apply:function(a){try{p("$apply");try{return this.$eval(a)}finally{v.$$phase=null}}catch(b){f(b)}finally{try{v.$digest()}catch(c){throw f(c),
c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&y.push(b);a=g(a);q()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(delete c[d],s(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,g=!1,h={name:a,targetScope:e,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=
!0},defaultPrevented:!1},k=db([h],arguments,1),l,m;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,k)}catch(n){f(n)}else d.splice(l,1),l--,m--;if(g)break;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var g=db([e],arguments,1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||
[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,g)}catch(l){f(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var v=new m,w=v.$$asyncQueue=[],x=v.$$postDigestQueue=[],y=v.$$applyAsyncQueue=[],J=0;return v}]}function Qe(){var a=/^\s*(https?|s?ftp|mailto|tel|file):/,b=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationTrustedUrlList=function(b){return w(b)?
(a=b,this):a};this.imgSrcSanitizationTrustedUrlList=function(a){return w(a)?(b=a,this):b};this.$get=function(){return function(d,c){var e=c?b:a,f=ga(d&&d.trim()).href;return""===f||f.match(e)?d:"unsafe:"+f}}}function Xg(a){if("self"===a)return a;if(C(a)){if(-1<a.indexOf("***"))throw Ea("iwcard",a);a=Od(a).replace(/\\\*\\\*/g,".*").replace(/\\\*/g,"[^:/.?&;]*");return new RegExp("^"+a+"$")}if(ab(a))return new RegExp("^"+a.source+"$");throw Ea("imatcher");}function Pd(a){var b=[];w(a)&&r(a,function(a){b.push(Xg(a))});
return b}function eg(){this.SCE_CONTEXTS=W;var a=["self"],b=[];this.trustedResourceUrlList=function(b){arguments.length&&(a=Pd(b));return a};Object.defineProperty(this,"resourceUrlWhitelist",{get:function(){return this.trustedResourceUrlList},set:function(a){this.trustedResourceUrlList=a}});this.bannedResourceUrlList=function(a){arguments.length&&(b=Pd(a));return b};Object.defineProperty(this,"resourceUrlBlacklist",{get:function(){return this.bannedResourceUrlList},set:function(a){this.bannedResourceUrlList=
a}});this.$get=["$injector","$$sanitizeUri",function(d,c){function e(a,b){var c;"self"===a?(c=Cc(b,Qd))||(z.document.baseURI?c=z.document.baseURI:(Na||(Na=z.document.createElement("a"),Na.href=".",Na=Na.cloneNode(!1)),c=Na.href),c=Cc(b,c)):c=!!a.exec(b.href);return c}function f(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};
return b}var g=function(a){throw Ea("unsafe");};d.has("$sanitize")&&(g=d.get("$sanitize"));var k=f(),h={};h[W.HTML]=f(k);h[W.CSS]=f(k);h[W.MEDIA_URL]=f(k);h[W.URL]=f(h[W.MEDIA_URL]);h[W.JS]=f(k);h[W.RESOURCE_URL]=f(h[W.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Ea("icontext",a,b);if(null===b||A(b)||""===b)return b;if("string"!==typeof b)throw Ea("itype",a);return new c(b)},getTrusted:function(d,f){if(null===f||A(f)||""===f)return f;var k=h.hasOwnProperty(d)?
h[d]:null;if(k&&f instanceof k)return f.$$unwrapTrustedValue();B(f.$$unwrapTrustedValue)&&(f=f.$$unwrapTrustedValue());if(d===W.MEDIA_URL||d===W.URL)return c(f.toString(),d===W.MEDIA_URL);if(d===W.RESOURCE_URL){var k=ga(f.toString()),n,s,r=!1;n=0;for(s=a.length;n<s;n++)if(e(a[n],k)){r=!0;break}if(r)for(n=0,s=b.length;n<s;n++)if(e(b[n],k)){r=!1;break}if(r)return f;throw Ea("insecurl",f.toString());}if(d===W.HTML)return g(f);throw Ea("unsafe");},valueOf:function(a){return a instanceof k?a.$$unwrapTrustedValue():
a}}}]}function dg(){var a=!0;this.enabled=function(b){arguments.length&&(a=!!b);return a};this.$get=["$parse","$sceDelegate",function(b,d){if(a&&8>wa)throw Ea("iequirks");var c=ja(W);c.isEnabled=function(){return a};c.trustAs=d.trustAs;c.getTrusted=d.getTrusted;c.valueOf=d.valueOf;a||(c.trustAs=c.getTrusted=function(a,b){return b},c.valueOf=Ta);c.parseAs=function(a,d){var e=b(d);return e.literal&&e.constant?e:b(d,function(b){return c.getTrusted(a,b)})};var e=c.parseAs,f=c.getTrusted,g=c.trustAs;r(W,
function(a,b){var d=K(b);c[("parse_as_"+d).replace(Dc,xb)]=function(b){return e(a,b)};c[("get_trusted_"+d).replace(Dc,xb)]=function(b){return f(a,b)};c[("trust_as_"+d).replace(Dc,xb)]=function(b){return g(a,b)}});return c}]}function fg(){this.$get=["$window","$document",function(a,b){var d={},c=!((!a.nw||!a.nw.process)&&a.chrome&&(a.chrome.app&&a.chrome.app.runtime||!a.chrome.app&&a.chrome.runtime&&a.chrome.runtime.id))&&a.history&&a.history.pushState,e=fa((/android (\d+)/.exec(K((a.navigator||{}).userAgent))||
[])[1]),f=/Boxee/i.test((a.navigator||{}).userAgent),g=b[0]||{},k=g.body&&g.body.style,h=!1,l=!1;k&&(h=!!("transition"in k||"webkitTransition"in k),l=!!("animation"in k||"webkitAnimation"in k));return{history:!(!c||4>e||f),hasEvent:function(a){if("input"===a&&wa)return!1;if(A(d[a])){var b=g.createElement("div");d[a]="on"+a in b}return d[a]},csp:Ba(),transitions:h,animations:l,android:e}}]}function gg(){this.$get=ia(function(a){return new Yg(a)})}function Yg(a){function b(){var a=e.pop();return a&&
a.cb}function d(a){for(var b=e.length-1;0<=b;--b){var c=e[b];if(c.type===a)return e.splice(b,1),c.cb}}var c={},e=[],f=this.ALL_TASKS_TYPE="$$all$$",g=this.DEFAULT_TASK_TYPE="$$default$$";this.completeTask=function(e,h){h=h||g;try{e()}finally{var l;l=h||g;c[l]&&(c[l]--,c[f]--);l=c[h];var m=c[f];if(!m||!l)for(l=m?d:b;m=l(h);)try{m()}catch(p){a.error(p)}}};this.incTaskCount=function(a){a=a||g;c[a]=(c[a]||0)+1;c[f]=(c[f]||0)+1};this.notifyWhenNoPendingTasks=function(a,b){b=b||f;c[b]?e.push({type:b,cb:a}):
a()}}function ig(){var a;this.httpOptions=function(b){return b?(a=b,this):a};this.$get=["$exceptionHandler","$templateCache","$http","$q","$sce",function(b,d,c,e,f){function g(k,h){g.totalPendingRequests++;if(!C(k)||A(d.get(k)))k=f.getTrustedResourceUrl(k);var l=c.defaults&&c.defaults.transformResponse;H(l)?l=l.filter(function(a){return a!==wc}):l===wc&&(l=null);return c.get(k,S({cache:d,transformResponse:l},a)).finally(function(){g.totalPendingRequests--}).then(function(a){return d.put(k,a.data)},
function(a){h||(a=Zg("tpload",k,a.status,a.statusText),b(a));return e.reject(a)})}g.totalPendingRequests=0;return g}]}function jg(){this.$get=["$rootScope","$browser","$location",function(a,b,d){return{findBindings:function(a,b,d){a=a.getElementsByClassName("ng-binding");var g=[];r(a,function(a){var c=ca.element(a).data("$binding");c&&r(c,function(c){d?(new RegExp("(^|\\s)"+Od(b)+"(\\s|\\||$)")).test(c)&&g.push(a):-1!==c.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,d){for(var g=["ng-",
"data-ng-","ng\\:"],k=0;k<g.length;++k){var h=a.querySelectorAll("["+g[k]+"model"+(d?"=":"*=")+'"'+b+'"]');if(h.length)return h}},getLocation:function(){return d.url()},setLocation:function(b){b!==d.url()&&(d.url(b),a.$digest())},whenStable:function(a){b.notifyWhenNoOutstandingRequests(a)}}}]}function kg(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(a,b,d,c,e){function f(f,h,l){B(f)||(l=h,h=f,f=E);var m=Ha.call(arguments,3),p=w(l)&&!l,n=(p?c:d).defer(),s=n.promise,r;
r=b.defer(function(){try{n.resolve(f.apply(null,m))}catch(b){n.reject(b),e(b)}finally{delete g[s.$$timeoutId]}p||a.$apply()},h,"$timeout");s.$$timeoutId=r;g[r]=n;return s}var g={};f.cancel=function(a){if(!a)return!1;if(!a.hasOwnProperty("$$timeoutId"))throw $g("badprom");if(!g.hasOwnProperty(a.$$timeoutId))return!1;a=a.$$timeoutId;var c=g[a],d=c.promise;d.$$state&&(d.$$state.pur=!0);c.reject("canceled");delete g[a];return b.defer.cancel(a)};return f}]}function ga(a){if(!C(a))return a;wa&&(aa.setAttribute("href",
a),a=aa.href);aa.setAttribute("href",a);a=aa.hostname;!ah&&-1<a.indexOf(":")&&(a="["+a+"]");return{href:aa.href,protocol:aa.protocol?aa.protocol.replace(/:$/,""):"",host:aa.host,search:aa.search?aa.search.replace(/^\?/,""):"",hash:aa.hash?aa.hash.replace(/^#/,""):"",hostname:a,port:aa.port,pathname:"/"===aa.pathname.charAt(0)?aa.pathname:"/"+aa.pathname}}function Og(a){var b=[Qd].concat(a.map(ga));return function(a){a=ga(a);return b.some(Cc.bind(null,a))}}function Cc(a,b){a=ga(a);b=ga(b);return a.protocol===
b.protocol&&a.host===b.host}function lg(){this.$get=ia(z)}function Rd(a){function b(a){try{return decodeURIComponent(a)}catch(b){return a}}var d=a[0]||{},c={},e="";return function(){var a,g,k,h,l;try{a=d.cookie||""}catch(m){a=""}if(a!==e)for(e=a,a=e.split("; "),c={},k=0;k<a.length;k++)g=a[k],h=g.indexOf("="),0<h&&(l=b(g.substring(0,h)),A(c[l])&&(c[l]=b(g.substring(h+1))));return c}}function pg(){this.$get=Rd}function fd(a){function b(d,c){if(D(d)){var e={};r(d,function(a,c){e[c]=b(c,a)});return e}return a.factory(d+
"Filter",c)}this.register=b;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];b("currency",Sd);b("date",Td);b("filter",bh);b("json",ch);b("limitTo",dh);b("lowercase",eh);b("number",Ud);b("orderBy",Vd);b("uppercase",fh)}function bh(){return function(a,b,d,c){if(!za(a)){if(null==a)return a;throw F("filter")("notarray",a);}c=c||"$";var e;switch(Ec(b)){case "function":break;case "boolean":case "null":case "number":case "string":e=!0;case "object":b=gh(b,d,c,e);break;default:return a}return Array.prototype.filter.call(a,
b)}}function gh(a,b,d,c){var e=D(a)&&d in a;!0===b?b=va:B(b)||(b=function(a,b){if(A(a))return!1;if(null===a||null===b)return a===b;if(D(b)||D(a)&&!cc(a))return!1;a=K(""+a);b=K(""+b);return-1!==a.indexOf(b)});return function(f){return e&&!D(f)?Fa(f,a[d],b,d,!1):Fa(f,a,b,d,c)}}function Fa(a,b,d,c,e,f){var g=Ec(a),k=Ec(b);if("string"===k&&"!"===b.charAt(0))return!Fa(a,b.substring(1),d,c,e);if(H(a))return a.some(function(a){return Fa(a,b,d,c,e)});switch(g){case "object":var h;if(e){for(h in a)if(h.charAt&&
"$"!==h.charAt(0)&&Fa(a[h],b,d,c,!0))return!0;return f?!1:Fa(a,b,d,c,!1)}if("object"===k){for(h in b)if(f=b[h],!B(f)&&!A(f)&&(g=h===c,!Fa(g?a:a[h],f,d,c,g,g)))return!1;return!0}return d(a,b);case "function":return!1;default:return d(a,b)}}function Ec(a){return null===a?"null":typeof a}function Sd(a){var b=a.NUMBER_FORMATS;return function(a,c,e){A(c)&&(c=b.CURRENCY_SYM);A(e)&&(e=b.PATTERNS[1].maxFrac);var f=c?/\u00A4/g:/\s*\u00A4\s*/g;return null==a?a:Wd(a,b.PATTERNS[1],b.GROUP_SEP,b.DECIMAL_SEP,e).replace(f,
c)}}function Ud(a){var b=a.NUMBER_FORMATS;return function(a,c){return null==a?a:Wd(a,b.PATTERNS[0],b.GROUP_SEP,b.DECIMAL_SEP,c)}}function hh(a){var b=0,d,c,e,f,g;-1<(c=a.indexOf(Xd))&&(a=a.replace(Xd,""));0<(e=a.search(/e/i))?(0>c&&(c=e),c+=+a.slice(e+1),a=a.substring(0,e)):0>c&&(c=a.length);for(e=0;a.charAt(e)===Fc;e++);if(e===(g=a.length))d=[0],c=1;else{for(g--;a.charAt(g)===Fc;)g--;c-=e;d=[];for(f=0;e<=g;e++,f++)d[f]=+a.charAt(e)}c>Yd&&(d=d.splice(0,Yd-1),b=c-1,c=1);return{d:d,e:b,i:c}}function ih(a,
b,d,c){var e=a.d,f=e.length-a.i;b=A(b)?Math.min(Math.max(d,f),c):+b;d=b+a.i;c=e[d];if(0<d){e.splice(Math.max(a.i,d));for(var g=d;g<e.length;g++)e[g]=0}else for(f=Math.max(0,f),a.i=1,e.length=Math.max(1,d=b+1),e[0]=0,g=1;g<d;g++)e[g]=0;if(5<=c)if(0>d-1){for(c=0;c>d;c--)e.unshift(0),a.i++;e.unshift(1);a.i++}else e[d-1]++;for(;f<Math.max(0,b);f++)e.push(0);if(b=e.reduceRight(function(a,b,c,d){b+=a;d[c]=b%10;return Math.floor(b/10)},0))e.unshift(b),a.i++}function Wd(a,b,d,c,e){if(!C(a)&&!X(a)||isNaN(a))return"";
var f=!isFinite(a),g=!1,k=Math.abs(a)+"",h="";if(f)h="\u221e";else{g=hh(k);ih(g,e,b.minFrac,b.maxFrac);h=g.d;k=g.i;e=g.e;f=[];for(g=h.reduce(function(a,b){return a&&!b},!0);0>k;)h.unshift(0),k++;0<k?f=h.splice(k,h.length):(f=h,h=[0]);k=[];for(h.length>=b.lgSize&&k.unshift(h.splice(-b.lgSize,h.length).join(""));h.length>b.gSize;)k.unshift(h.splice(-b.gSize,h.length).join(""));h.length&&k.unshift(h.join(""));h=k.join(d);f.length&&(h+=c+f.join(""));e&&(h+="e+"+e)}return 0>a&&!g?b.negPre+h+b.negSuf:b.posPre+
h+b.posSuf}function Pb(a,b,d,c){var e="";if(0>a||c&&0>=a)c?a=-a+1:(a=-a,e="-");for(a=""+a;a.length<b;)a=Fc+a;d&&(a=a.substr(a.length-b));return e+a}function ea(a,b,d,c,e){d=d||0;return function(f){f=f["get"+a]();if(0<d||f>-d)f+=d;0===f&&-12===d&&(f=12);return Pb(f,b,c,e)}}function lb(a,b,d){return function(c,e){var f=c["get"+a](),g=vb((d?"STANDALONE":"")+(b?"SHORT":"")+a);return e[g][f]}}function Zd(a){var b=(new Date(a,0,1)).getDay();return new Date(a,0,(4>=b?5:12)-b)}function $d(a){return function(b){var d=
Zd(b.getFullYear());b=+new Date(b.getFullYear(),b.getMonth(),b.getDate()+(4-b.getDay()))-+d;b=1+Math.round(b/6048E5);return Pb(b,a)}}function Gc(a,b){return 0>=a.getFullYear()?b.ERAS[0]:b.ERAS[1]}function Td(a){function b(a){var b;if(b=a.match(d)){a=new Date(0);var f=0,g=0,k=b[8]?a.setUTCFullYear:a.setFullYear,h=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=fa(b[9]+b[10]),g=fa(b[9]+b[11]));k.call(a,fa(b[1]),fa(b[2])-1,fa(b[3]));f=fa(b[4]||0)-f;g=fa(b[5]||0)-g;k=fa(b[6]||0);b=Math.round(1E3*parseFloat("0."+
(b[7]||0)));h.call(a,f,g,k,b)}return a}var d=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,d,f){var g="",k=[],h,l;d=d||"mediumDate";d=a.DATETIME_FORMATS[d]||d;C(c)&&(c=jh.test(c)?fa(c):b(c));X(c)&&(c=new Date(c));if(!ha(c)||!isFinite(c.getTime()))return c;for(;d;)(l=kh.exec(d))?(k=db(k,l,1),d=k.pop()):(k.push(d),d=null);var m=c.getTimezoneOffset();f&&(m=fc(f,m),c=gc(c,f,!0));r(k,function(b){h=lh[b];g+=h?h(c,a.DATETIME_FORMATS,
m):"''"===b?"'":b.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function ch(){return function(a,b){A(b)&&(b=2);return eb(a,b)}}function dh(){return function(a,b,d){b=Infinity===Math.abs(Number(b))?Number(b):fa(b);if(Y(b))return a;X(a)&&(a=a.toString());if(!za(a))return a;d=!d||isNaN(d)?0:fa(d);d=0>d?Math.max(0,a.length+d):d;return 0<=b?Hc(a,d,d+b):0===d?Hc(a,b,a.length):Hc(a,Math.max(0,d+b),d)}}function Hc(a,b,d){return C(a)?a.slice(b,d):Ha.call(a,b,d)}function Vd(a){function b(b){return b.map(function(b){var c=
1,d=Ta;if(B(b))d=b;else if(C(b)){if("+"===b.charAt(0)||"-"===b.charAt(0))c="-"===b.charAt(0)?-1:1,b=b.substring(1);if(""!==b&&(d=a(b),d.constant))var e=d(),d=function(a){return a[e]}}return{get:d,descending:c}})}function d(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}function c(a,b){var c=0,d=a.type,h=b.type;if(d===h){var h=a.value,l=b.value;"string"===d?(h=h.toLowerCase(),l=l.toLowerCase()):"object"===d&&(D(h)&&(h=a.index),D(l)&&(l=b.index));h!==l&&(c=
h<l?-1:1)}else c="undefined"===d?1:"undefined"===h?-1:"null"===d?1:"null"===h?-1:d<h?-1:1;return c}return function(a,f,g,k){if(null==a)return a;if(!za(a))throw F("orderBy")("notarray",a);H(f)||(f=[f]);0===f.length&&(f=["+"]);var h=b(f),l=g?-1:1,m=B(k)?k:c;a=Array.prototype.map.call(a,function(a,b){return{value:a,tieBreaker:{value:b,type:"number",index:b},predicateValues:h.map(function(c){var e=c.get(a);c=typeof e;if(null===e)c="null";else if("object"===c)a:{if(B(e.valueOf)&&(e=e.valueOf(),d(e)))break a;
cc(e)&&(e=e.toString(),d(e))}return{value:e,type:c,index:b}})}});a.sort(function(a,b){for(var d=0,e=h.length;d<e;d++){var f=m(a.predicateValues[d],b.predicateValues[d]);if(f)return f*h[d].descending*l}return(m(a.tieBreaker,b.tieBreaker)||c(a.tieBreaker,b.tieBreaker))*l});return a=a.map(function(a){return a.value})}}function Ra(a){B(a)&&(a={link:a});a.restrict=a.restrict||"AC";return ia(a)}function Qb(a,b,d,c,e){this.$$controls=[];this.$error={};this.$$success={};this.$pending=void 0;this.$name=e(b.name||
b.ngForm||"")(d);this.$dirty=!1;this.$valid=this.$pristine=!0;this.$submitted=this.$invalid=!1;this.$$parentForm=mb;this.$$element=a;this.$$animate=c;ae(this)}function ae(a){a.$$classCache={};a.$$classCache[be]=!(a.$$classCache[nb]=a.$$element.hasClass(nb))}function ce(a){function b(a,b,c){c&&!a.$$classCache[b]?(a.$$animate.addClass(a.$$element,b),a.$$classCache[b]=!0):!c&&a.$$classCache[b]&&(a.$$animate.removeClass(a.$$element,b),a.$$classCache[b]=!1)}function d(a,c,d){c=c?"-"+Xc(c,"-"):"";b(a,nb+
c,!0===d);b(a,be+c,!1===d)}var c=a.set,e=a.unset;a.clazz.prototype.$setValidity=function(a,g,k){A(g)?(this.$pending||(this.$pending={}),c(this.$pending,a,k)):(this.$pending&&e(this.$pending,a,k),de(this.$pending)&&(this.$pending=void 0));Ga(g)?g?(e(this.$error,a,k),c(this.$$success,a,k)):(c(this.$error,a,k),e(this.$$success,a,k)):(e(this.$error,a,k),e(this.$$success,a,k));this.$pending?(b(this,"ng-pending",!0),this.$valid=this.$invalid=void 0,d(this,"",null)):(b(this,"ng-pending",!1),this.$valid=
de(this.$error),this.$invalid=!this.$valid,d(this,"",this.$valid));g=this.$pending&&this.$pending[a]?void 0:this.$error[a]?!1:this.$$success[a]?!0:null;d(this,a,g);this.$$parentForm.$setValidity(a,g,this)}}function de(a){if(a)for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}function Ic(a){a.$formatters.push(function(b){return a.$isEmpty(b)?b:b.toString()})}function Sa(a,b,d,c,e,f){var g=K(b[0].type);if(!e.android){var k=!1;b.on("compositionstart",function(){k=!0});b.on("compositionupdate",
function(a){if(A(a.data)||""===a.data)k=!1});b.on("compositionend",function(){k=!1;l()})}var h,l=function(a){h&&(f.defer.cancel(h),h=null);if(!k){var e=b.val();a=a&&a.type;"password"===g||d.ngTrim&&"false"===d.ngTrim||(e=V(e));(c.$viewValue!==e||""===e&&c.$$hasNativeValidators)&&c.$setViewValue(e,a)}};if(e.hasEvent("input"))b.on("input",l);else{var m=function(a,b,c){h||(h=f.defer(function(){h=null;b&&b.value===c||l(a)}))};b.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||
m(a,this,this.value)});if(e.hasEvent("paste"))b.on("paste cut drop",m)}b.on("change",l);if(ee[g]&&c.$$hasNativeValidators&&g===d.type)b.on("keydown wheel mousedown",function(a){if(!h){var b=this.validity,c=b.badInput,d=b.typeMismatch;h=f.defer(function(){h=null;b.badInput===c&&b.typeMismatch===d||l(a)})}});c.$render=function(){var a=c.$isEmpty(c.$viewValue)?"":c.$viewValue;b.val()!==a&&b.val(a)}}function Rb(a,b){return function(d,c){var e,f;if(ha(d))return d;if(C(d)){'"'===d.charAt(0)&&'"'===d.charAt(d.length-
1)&&(d=d.substring(1,d.length-1));if(mh.test(d))return new Date(d);a.lastIndex=0;if(e=a.exec(d))return e.shift(),f=c?{yyyy:c.getFullYear(),MM:c.getMonth()+1,dd:c.getDate(),HH:c.getHours(),mm:c.getMinutes(),ss:c.getSeconds(),sss:c.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},r(e,function(a,c){c<b.length&&(f[b[c]]=+a)}),e=new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0),100>f.yyyy&&e.setFullYear(f.yyyy),e}return NaN}}function ob(a,b,d,c){return function(e,f,g,k,h,l,m,
p){function n(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function s(a){return w(a)&&!ha(a)?r(a)||void 0:a}function r(a,b){var c=k.$options.getOption("timezone");v&&v!==c&&(b=Uc(b,fc(v)));var e=d(a,b);!isNaN(e)&&c&&(e=gc(e,c));return e}Jc(e,f,g,k,a);Sa(e,f,g,k,h,l);var t="time"===a||"datetimelocal"===a,q,v;k.$parsers.push(function(c){if(k.$isEmpty(c))return null;if(b.test(c))return r(c,q);k.$$parserName=a});k.$formatters.push(function(a){if(a&&!ha(a))throw pb("datefmt",a);if(n(a)){q=a;var b=
k.$options.getOption("timezone");b&&(v=b,q=gc(q,b,!0));var d=c;t&&C(k.$options.getOption("timeSecondsFormat"))&&(d=c.replace("ss.sss",k.$options.getOption("timeSecondsFormat")).replace(/:$/,""));a=m("date")(a,d,b);t&&k.$options.getOption("timeStripZeroSeconds")&&(a=a.replace(/(?::00)?(?:\.000)?$/,""));return a}v=q=null;return""});if(w(g.min)||g.ngMin){var x=g.min||p(g.ngMin)(e),z=s(x);k.$validators.min=function(a){return!n(a)||A(z)||d(a)>=z};g.$observe("min",function(a){a!==x&&(z=s(a),x=a,k.$validate())})}if(w(g.max)||
g.ngMax){var y=g.max||p(g.ngMax)(e),J=s(y);k.$validators.max=function(a){return!n(a)||A(J)||d(a)<=J};g.$observe("max",function(a){a!==y&&(J=s(a),y=a,k.$validate())})}}}function Jc(a,b,d,c,e){(c.$$hasNativeValidators=D(b[0].validity))&&c.$parsers.push(function(a){var d=b.prop("validity")||{};if(d.badInput||d.typeMismatch)c.$$parserName=e;else return a})}function fe(a){a.$parsers.push(function(b){if(a.$isEmpty(b))return null;if(nh.test(b))return parseFloat(b);a.$$parserName="number"});a.$formatters.push(function(b){if(!a.$isEmpty(b)){if(!X(b))throw pb("numfmt",
b);b=b.toString()}return b})}function na(a){w(a)&&!X(a)&&(a=parseFloat(a));return Y(a)?void 0:a}function Kc(a){var b=a.toString(),d=b.indexOf(".");return-1===d?-1<a&&1>a&&(a=/e-(\d+)$/.exec(b))?Number(a[1]):0:b.length-d-1}function ge(a,b,d){a=Number(a);var c=(a|0)!==a,e=(b|0)!==b,f=(d|0)!==d;if(c||e||f){var g=c?Kc(a):0,k=e?Kc(b):0,h=f?Kc(d):0,g=Math.max(g,k,h),g=Math.pow(10,g);a*=g;b*=g;d*=g;c&&(a=Math.round(a));e&&(b=Math.round(b));f&&(d=Math.round(d))}return 0===(a-b)%d}function he(a,b,d,c,e){if(w(c)){a=
a(c);if(!a.constant)throw pb("constexpr",d,c);return a(b)}return e}function Lc(a,b){function d(a,b){if(!a||!a.length)return[];if(!b||!b.length)return a;var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e===b[m])continue a;c.push(e)}return c}function c(a){if(!a)return a;var b=a;H(a)?b=a.map(c).join(" "):D(a)?b=Object.keys(a).filter(function(b){return a[b]}).join(" "):C(a)||(b=a+"");return b}a="ngClass"+a;var e;return["$parse",function(f){return{restrict:"AC",link:function(g,
k,h){function l(a,b){var c=[];r(a,function(a){if(0<b||p[a])p[a]=(p[a]||0)+b,p[a]===+(0<b)&&c.push(a)});return c.join(" ")}function m(a){if(a===b){var c=s,c=l(c&&c.split(" "),1);h.$addClass(c)}else c=s,c=l(c&&c.split(" "),-1),h.$removeClass(c);n=a}var p=k.data("$classCounts"),n=!0,s;p||(p=T(),k.data("$classCounts",p));"ngClass"!==a&&(e||(e=f("$index",function(a){return a&1})),g.$watch(e,m));g.$watch(f(h[a],c),function(a){if(n===b){var c=s&&s.split(" "),e=a&&a.split(" "),f=d(c,e),c=d(e,c),f=l(f,-1),
c=l(c,1);h.$addClass(c);h.$removeClass(f)}s=a})}}}]}function sd(a,b,d,c,e,f){return{restrict:"A",compile:function(g,k){var h=a(k[c]);return function(a,c){c.on(e,function(c){var e=function(){h(a,{$event:c})};if(b.$$phase)if(f)a.$evalAsync(e);else try{e()}catch(g){d(g)}else a.$apply(e)})}}}}function Sb(a,b,d,c,e,f,g,k,h){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=void 0;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=
[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=void 0;this.$name=h(d.name||"",!1)(a);this.$$parentForm=mb;this.$options=Tb;this.$$updateEvents="";this.$$updateEventHandler=this.$$updateEventHandler.bind(this);this.$$parsedNgModel=e(d.ngModel);this.$$parsedNgModelAssign=this.$$parsedNgModel.assign;this.$$ngModelGet=this.$$parsedNgModel;this.$$ngModelSet=this.$$parsedNgModelAssign;this.$$pendingDebounce=
null;this.$$parserValid=void 0;this.$$parserName="parse";this.$$currentValidationRunId=0;this.$$scope=a;this.$$rootScope=a.$root;this.$$attr=d;this.$$element=c;this.$$animate=f;this.$$timeout=g;this.$$parse=e;this.$$q=k;this.$$exceptionHandler=b;ae(this);oh(this)}function oh(a){a.$$scope.$watch(function(b){b=a.$$ngModelGet(b);b===a.$modelValue||a.$modelValue!==a.$modelValue&&b!==b||a.$$setModelValue(b);return b})}function Mc(a){this.$$options=a}function ie(a,b){r(b,function(b,c){w(a[c])||(a[c]=b)})}
function Oa(a,b){a.prop("selected",b);a.attr("selected",b)}function je(a,b,d){if(a){C(a)&&(a=new RegExp("^"+a+"$"));if(!a.test)throw F("ngPattern")("noregexp",b,a,Aa(d));return a}}function Ub(a){a=fa(a);return Y(a)?-1:a}var Xb={objectMaxDepth:5,urlErrorParamsEnabled:!0},ke=/^\/(.+)\/([a-z]*)$/,ta=Object.prototype.hasOwnProperty,K=function(a){return C(a)?a.toLowerCase():a},vb=function(a){return C(a)?a.toUpperCase():a},wa,x,sb,Ha=[].slice,Kg=[].splice,ph=[].push,la=Object.prototype.toString,Rc=Object.getPrototypeOf,
oa=F("ng"),ca=z.angular||(z.angular={}),lc,qb=0;wa=z.document.documentMode;var Y=Number.isNaN||function(a){return a!==a};E.$inject=[];Ta.$inject=[];var ze=/^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/,V=function(a){return C(a)?a.trim():a},Od=function(a){return a.replace(/([-()[\]{}+?*.$^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},Ba=function(){if(!w(Ba.rules)){var a=z.document.querySelector("[ng-csp]")||z.document.querySelector("[data-ng-csp]");if(a){var b=
a.getAttribute("ng-csp")||a.getAttribute("data-ng-csp");Ba.rules={noUnsafeEval:!b||-1!==b.indexOf("no-unsafe-eval"),noInlineStyle:!b||-1!==b.indexOf("no-inline-style")}}else{a=Ba;try{new Function(""),b=!1}catch(d){b=!0}a.rules={noUnsafeEval:b,noInlineStyle:!1}}}return Ba.rules},rb=function(){if(w(rb.name_))return rb.name_;var a,b,d=Qa.length,c,e;for(b=0;b<d;++b)if(c=Qa[b],a=z.document.querySelector("["+c.replace(":","\\:")+"jq]")){e=a.getAttribute(c+"jq");break}return rb.name_=e},Be=/:/g,Qa=["ng-",
"data-ng-","ng:","x-ng-"],Fe=function(a){var b=a.currentScript;if(!b)return!0;if(!(b instanceof z.HTMLScriptElement||b instanceof z.SVGScriptElement))return!1;b=b.attributes;return[b.getNamedItem("src"),b.getNamedItem("href"),b.getNamedItem("xlink:href")].every(function(b){if(!b)return!0;if(!b.value)return!1;var c=a.createElement("a");c.href=b.value;if(a.location.origin===c.origin)return!0;switch(c.protocol){case "http:":case "https:":case "ftp:":case "blob:":case "file:":case "data:":return!0;default:return!1}})}(z.document),
Ie=/[A-Z]/g,Yc=!1,Pa=3,Pe={full:"1.8.2",major:1,minor:8,dot:2,codeName:"meteoric-mining"};U.expando="ng339";var Ka=U.cache={},ug=1;U._data=function(a){return this.cache[a[this.expando]]||{}};var qg=/-([a-z])/g,qh=/^-ms-/,Bb={mouseleave:"mouseout",mouseenter:"mouseover"},oc=F("jqLite"),tg=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,nc=/<|&#?\w+;/,rg=/<([\w:-]+)/,sg=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,qa={thead:["table"],col:["colgroup","table"],tr:["tbody","table"],td:["tr",
"tbody","table"]};qa.tbody=qa.tfoot=qa.colgroup=qa.caption=qa.thead;qa.th=qa.td;var hb={option:[1,'<select multiple="multiple">',"</select>"],_default:[0,"",""]},Nc;for(Nc in qa){var le=qa[Nc],me=le.slice().reverse();hb[Nc]=[me.length,"<"+me.join("><")+">","</"+le.join("></")+">"]}hb.optgroup=hb.option;var zg=z.Node.prototype.contains||function(a){return!!(this.compareDocumentPosition(a)&16)},Wa=U.prototype={ready:hd,toString:function(){var a=[];r(this,function(b){a.push(""+b)});return"["+a.join(", ")+
"]"},eq:function(a){return 0<=a?x(this[a]):x(this[this.length+a])},length:0,push:ph,sort:[].sort,splice:[].splice},Hb={};r("multiple selected checked disabled readOnly required open".split(" "),function(a){Hb[K(a)]=a});var od={};r("input select option textarea button form details".split(" "),function(a){od[a]=!0});var vd={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern",ngStep:"step"};r({data:sc,removeData:rc,hasData:function(a){for(var b in Ka[a.ng339])return!0;
return!1},cleanData:function(a){for(var b=0,d=a.length;b<d;b++)rc(a[b]),kd(a[b])}},function(a,b){U[b]=a});r({data:sc,inheritedData:Fb,scope:function(a){return x.data(a,"$scope")||Fb(a.parentNode||a,["$isolateScope","$scope"])},isolateScope:function(a){return x.data(a,"$isolateScope")||x.data(a,"$isolateScopeNoTemplate")},controller:ld,injector:function(a){return Fb(a,"$injector")},removeAttr:function(a,b){a.removeAttribute(b)},hasClass:Cb,css:function(a,b,d){b=yb(b.replace(qh,"ms-"));if(w(d))a.style[b]=
d;else return a.style[b]},attr:function(a,b,d){var c=a.nodeType;if(c!==Pa&&2!==c&&8!==c&&a.getAttribute){var c=K(b),e=Hb[c];if(w(d))null===d||!1===d&&e?a.removeAttribute(b):a.setAttribute(b,e?c:d);else return a=a.getAttribute(b),e&&null!==a&&(a=c),null===a?void 0:a}},prop:function(a,b,d){if(w(d))a[b]=d;else return a[b]},text:function(){function a(a,d){if(A(d)){var c=a.nodeType;return 1===c||c===Pa?a.textContent:""}a.textContent=d}a.$dv="";return a}(),val:function(a,b){if(A(b)){if(a.multiple&&"select"===
ua(a)){var d=[];r(a.options,function(a){a.selected&&d.push(a.value||a.text)});return d}return a.value}a.value=b},html:function(a,b){if(A(b))return a.innerHTML;zb(a,!0);a.innerHTML=b},empty:md},function(a,b){U.prototype[b]=function(b,c){var e,f,g=this.length;if(a!==md&&A(2===a.length&&a!==Cb&&a!==ld?b:c)){if(D(b)){for(e=0;e<g;e++)if(a===sc)a(this[e],b);else for(f in b)a(this[e],f,b[f]);return this}e=a.$dv;g=A(e)?Math.min(g,1):g;for(f=0;f<g;f++){var k=a(this[f],b,c);e=e?e+k:k}return e}for(e=0;e<g;e++)a(this[e],
b,c);return this}});r({removeData:rc,on:function(a,b,d,c){if(w(c))throw oc("onargs");if(mc(a)){c=Ab(a,!0);var e=c.events,f=c.handle;f||(f=c.handle=wg(a,e));c=0<=b.indexOf(" ")?b.split(" "):[b];for(var g=c.length,k=function(b,c,g){var k=e[b];k||(k=e[b]=[],k.specialHandlerWrapper=c,"$destroy"===b||g||a.addEventListener(b,f));k.push(d)};g--;)b=c[g],Bb[b]?(k(Bb[b],yg),k(b,void 0,!0)):k(b)}},off:kd,one:function(a,b,d){a=x(a);a.on(b,function e(){a.off(b,d);a.off(b,e)});a.on(b,d)},replaceWith:function(a,
b){var d,c=a.parentNode;zb(a);r(new U(b),function(b){d?c.insertBefore(b,d.nextSibling):c.replaceChild(b,a);d=b})},children:function(a){var b=[];r(a.childNodes,function(a){1===a.nodeType&&b.push(a)});return b},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,b){var d=a.nodeType;if(1===d||11===d){b=new U(b);for(var d=0,c=b.length;d<c;d++)a.appendChild(b[d])}},prepend:function(a,b){if(1===a.nodeType){var d=a.firstChild;r(new U(b),function(b){a.insertBefore(b,d)})}},
wrap:function(a,b){var d=x(b).eq(0).clone()[0],c=a.parentNode;c&&c.replaceChild(d,a);d.appendChild(a)},remove:Gb,detach:function(a){Gb(a,!0)},after:function(a,b){var d=a,c=a.parentNode;if(c){b=new U(b);for(var e=0,f=b.length;e<f;e++){var g=b[e];c.insertBefore(g,d.nextSibling);d=g}}},addClass:Eb,removeClass:Db,toggleClass:function(a,b,d){b&&r(b.split(" "),function(b){var e=d;A(e)&&(e=!Cb(a,b));(e?Eb:Db)(a,b)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},
find:function(a,b){return a.getElementsByTagName?a.getElementsByTagName(b):[]},clone:qc,triggerHandler:function(a,b,d){var c,e,f=b.type||b,g=Ab(a);if(g=(g=g&&g.events)&&g[f])c={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:E,type:f,target:a},b.type&&(c=S(c,
b)),b=ja(g),e=d?[c].concat(d):[c],r(b,function(b){c.isImmediatePropagationStopped()||b.apply(a,e)})}},function(a,b){U.prototype[b]=function(b,c,e){for(var f,g=0,k=this.length;g<k;g++)A(f)?(f=a(this[g],b,c,e),w(f)&&(f=x(f))):pc(f,a(this[g],b,c,e));return w(f)?f:this}});U.prototype.bind=U.prototype.on;U.prototype.unbind=U.prototype.off;var rh=Object.create(null);pd.prototype={_idx:function(a){a!==this._lastKey&&(this._lastKey=a,this._lastIndex=this._keys.indexOf(a));return this._lastIndex},_transformKey:function(a){return Y(a)?
rh:a},get:function(a){a=this._transformKey(a);a=this._idx(a);if(-1!==a)return this._values[a]},has:function(a){a=this._transformKey(a);return-1!==this._idx(a)},set:function(a,b){a=this._transformKey(a);var d=this._idx(a);-1===d&&(d=this._lastIndex=this._keys.length);this._keys[d]=a;this._values[d]=b},delete:function(a){a=this._transformKey(a);a=this._idx(a);if(-1===a)return!1;this._keys.splice(a,1);this._values.splice(a,1);this._lastKey=NaN;this._lastIndex=-1;return!0}};var Ib=pd,og=[function(){this.$get=
[function(){return Ib}]}],Bg=/^([^(]+?)=>/,Cg=/^[^(]*\(\s*([^)]*)\)/m,sh=/,/,th=/^\s*(_?)(\S+?)\1\s*$/,Ag=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ca=F("$injector");fb.$$annotate=function(a,b,d){var c;if("function"===typeof a){if(!(c=a.$inject)){c=[];if(a.length){if(b)throw C(d)&&d||(d=a.name||Dg(a)),Ca("strictdi",d);b=qd(a);r(b[1].split(sh),function(a){a.replace(th,function(a,b,d){c.push(d)})})}a.$inject=c}}else H(a)?(b=a.length-1,tb(a[b],"fn"),c=a.slice(0,b)):tb(a,"fn",!0);return c};var ne=F("$animate"),
Ef=function(){this.$get=E},Ff=function(){var a=new Ib,b=[];this.$get=["$$AnimateRunner","$rootScope",function(d,c){function e(a,b,c){var d=!1;b&&(b=C(b)?b.split(" "):H(b)?b:[],r(b,function(b){b&&(d=!0,a[b]=c)}));return d}function f(){r(b,function(b){var c=a.get(b);if(c){var d=Eg(b.attr("class")),e="",f="";r(c,function(a,b){a!==!!d[b]&&(a?e+=(e.length?" ":"")+b:f+=(f.length?" ":"")+b)});r(b,function(a){e&&Eb(a,e);f&&Db(a,f)});a.delete(b)}});b.length=0}return{enabled:E,on:E,off:E,pin:E,push:function(g,
k,h,l){l&&l();h=h||{};h.from&&g.css(h.from);h.to&&g.css(h.to);if(h.addClass||h.removeClass)if(k=h.addClass,l=h.removeClass,h=a.get(g)||{},k=e(h,k,!0),l=e(h,l,!1),k||l)a.set(g,h),b.push(g),1===b.length&&c.$$postDigest(f);g=new d;g.complete();return g}}}]},Cf=["$provide",function(a){var b=this,d=null,c=null;this.$$registeredAnimations=Object.create(null);this.register=function(c,d){if(c&&"."!==c.charAt(0))throw ne("notcsel",c);var g=c+"-animation";b.$$registeredAnimations[c.substr(1)]=g;a.factory(g,
d)};this.customFilter=function(a){1===arguments.length&&(c=B(a)?a:null);return c};this.classNameFilter=function(a){if(1===arguments.length&&(d=a instanceof RegExp?a:null)&&/[(\s|\/)]ng-animate[(\s|\/)]/.test(d.toString()))throw d=null,ne("nongcls","ng-animate");return d};this.$get=["$$animateQueue",function(a){function b(a,c,d){if(d){var e;a:{for(e=0;e<d.length;e++){var f=d[e];if(1===f.nodeType){e=f;break a}}e=void 0}!e||e.parentNode||e.previousElementSibling||(d=null)}d?d.after(a):c.prepend(a)}return{on:a.on,
off:a.off,pin:a.pin,enabled:a.enabled,cancel:function(a){a.cancel&&a.cancel()},enter:function(c,d,h,l){d=d&&x(d);h=h&&x(h);d=d||h.parent();b(c,d,h);return a.push(c,"enter",ra(l))},move:function(c,d,h,l){d=d&&x(d);h=h&&x(h);d=d||h.parent();b(c,d,h);return a.push(c,"move",ra(l))},leave:function(b,c){return a.push(b,"leave",ra(c),function(){b.remove()})},addClass:function(b,c,d){d=ra(d);d.addClass=ib(d.addclass,c);return a.push(b,"addClass",d)},removeClass:function(b,c,d){d=ra(d);d.removeClass=ib(d.removeClass,
c);return a.push(b,"removeClass",d)},setClass:function(b,c,d,f){f=ra(f);f.addClass=ib(f.addClass,c);f.removeClass=ib(f.removeClass,d);return a.push(b,"setClass",f)},animate:function(b,c,d,f,m){m=ra(m);m.from=m.from?S(m.from,c):c;m.to=m.to?S(m.to,d):d;m.tempClasses=ib(m.tempClasses,f||"ng-inline-animate");return a.push(b,"animate",m)}}}]}],Hf=function(){this.$get=["$$rAF",function(a){function b(b){d.push(b);1<d.length||a(function(){for(var a=0;a<d.length;a++)d[a]();d=[]})}var d=[];return function(){var a=
!1;b(function(){a=!0});return function(d){a?d():b(d)}}}]},Gf=function(){this.$get=["$q","$sniffer","$$animateAsyncRun","$$isDocumentHidden","$timeout",function(a,b,d,c,e){function f(a){this.setHost(a);var b=d();this._doneCallbacks=[];this._tick=function(a){c()?e(a,0,!1):b(a)};this._state=0}f.chain=function(a,b){function c(){if(d===a.length)b(!0);else a[d](function(a){!1===a?b(!1):(d++,c())})}var d=0;c()};f.all=function(a,b){function c(f){e=e&&f;++d===a.length&&b(e)}var d=0,e=!0;r(a,function(a){a.done(c)})};
f.prototype={setHost:function(a){this.host=a||{}},done:function(a){2===this._state?a():this._doneCallbacks.push(a)},progress:E,getPromise:function(){if(!this.promise){var b=this;this.promise=a(function(a,c){b.done(function(b){!1===b?c():a()})})}return this.promise},then:function(a,b){return this.getPromise().then(a,b)},"catch":function(a){return this.getPromise()["catch"](a)},"finally":function(a){return this.getPromise()["finally"](a)},pause:function(){this.host.pause&&this.host.pause()},resume:function(){this.host.resume&&
this.host.resume()},end:function(){this.host.end&&this.host.end();this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel();this._resolve(!1)},complete:function(a){var b=this;0===b._state&&(b._state=1,b._tick(function(){b._resolve(a)}))},_resolve:function(a){2!==this._state&&(r(this._doneCallbacks,function(b){b(a)}),this._doneCallbacks.length=0,this._state=2)}};return f}]},Df=function(){this.$get=["$$rAF","$q","$$AnimateRunner",function(a,b,d){return function(b,e){function f(){a(function(){g.addClass&&
(b.addClass(g.addClass),g.addClass=null);g.removeClass&&(b.removeClass(g.removeClass),g.removeClass=null);g.to&&(b.css(g.to),g.to=null);k||h.complete();k=!0});return h}var g=e||{};g.$$prepared||(g=Ia(g));g.cleanupStyles&&(g.from=g.to=null);g.from&&(b.css(g.from),g.from=null);var k,h=new d;return{start:f,end:f}}}]},$=F("$compile"),uc=new function(){};Zc.$inject=["$provide","$$sanitizeUriProvider"];Kb.prototype.isFirstChange=function(){return this.previousValue===uc};var rd=/^((?:x|data)[:\-_])/i,Jg=
/[:\-_]+(.)/g,xd=F("$controller"),wd=/^(\S+)(\s+as\s+([\w$]+))?$/,Of=function(){this.$get=["$document",function(a){return function(b){b?!b.nodeType&&b instanceof x&&(b=b[0]):b=a[0].body;return b.offsetWidth+1}}]},yd="application/json",xc={"Content-Type":yd+";charset=utf-8"},Mg=/^\[|^\{(?!\{)/,Ng={"[":/]$/,"{":/}$/},Lg=/^\)]\}',?\n/,Lb=F("$http"),Ma=ca.$interpolateMinErr=F("$interpolate");Ma.throwNoconcat=function(a){throw Ma("noconcat",a);};Ma.interr=function(a,b){return Ma("interr",a,b.toString())};
var Qg=F("$interval"),Xf=function(){this.$get=function(){function a(a){var b=function(a){b.data=a;b.called=!0};b.id=a;return b}var b=ca.callbacks,d={};return{createCallback:function(c){c="_"+(b.$$counter++).toString(36);var e="angular.callbacks."+c,f=a(c);d[e]=b[c]=f;return e},wasCalled:function(a){return d[a].called},getResponse:function(a){return d[a].data},removeCallback:function(a){delete b[d[a].id];delete d[a]}}}},uh=/^([^?#]*)(\?([^#]*))?(#(.*))?$/,Rg={http:80,https:443,ftp:21},kb=F("$location"),
Sg=/^\s*[\\/]{2,}/,vh={$$absUrl:"",$$html5:!1,$$replace:!1,$$compose:function(){for(var a=this.$$path,b=this.$$hash,d=Ce(this.$$search),b=b?"#"+ic(b):"",a=a.split("/"),c=a.length;c--;)a[c]=ic(a[c].replace(/%2F/g,"/"));this.$$url=a.join("/")+(d?"?"+d:"")+b;this.$$absUrl=this.$$normalizeUrl(this.$$url);this.$$urlUpdatedByLocation=!0},absUrl:Mb("$$absUrl"),url:function(a){if(A(a))return this.$$url;var b=uh.exec(a);(b[1]||""===a)&&this.path(decodeURIComponent(b[1]));(b[2]||b[1]||""===a)&&this.search(b[3]||
"");this.hash(b[5]||"");return this},protocol:Mb("$$protocol"),host:Mb("$$host"),port:Mb("$$port"),path:Fd("$$path",function(a){a=null!==a?a.toString():"";return"/"===a.charAt(0)?a:"/"+a}),search:function(a,b){switch(arguments.length){case 0:return this.$$search;case 1:if(C(a)||X(a))a=a.toString(),this.$$search=hc(a);else if(D(a))a=Ia(a,{}),r(a,function(b,c){null==b&&delete a[c]}),this.$$search=a;else throw kb("isrcharg");break;default:A(b)||null===b?delete this.$$search[a]:this.$$search[a]=b}this.$$compose();
return this},hash:Fd("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};r([Ed,Ac,zc],function(a){a.prototype=Object.create(vh);a.prototype.state=function(b){if(!arguments.length)return this.$$state;if(a!==zc||!this.$$html5)throw kb("nostate");this.$$state=A(b)?null:b;this.$$urlUpdatedByLocation=!0;return this}});var Ya=F("$parse"),Wg={}.constructor.prototype.valueOf,Vb=T();r("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),function(a){Vb[a]=
!0});var wh={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},Ob=function(a){this.options=a};Ob.prototype={constructor:Ob,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdentifierStart(this.peekMultichar()))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,
text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var b=a+this.peek(),d=b+this.peek(2),c=Vb[b],e=Vb[d];Vb[a]||c||e?(a=e?d:c?b:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,b){return-1!==b.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===
typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdentifierStart:function(a){return this.options.isIdentifierStart?this.options.isIdentifierStart(a,this.codePointAt(a)):this.isValidIdentifierStart(a)},isValidIdentifierStart:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isIdentifierContinue:function(a){return this.options.isIdentifierContinue?this.options.isIdentifierContinue(a,this.codePointAt(a)):this.isValidIdentifierContinue(a)},
isValidIdentifierContinue:function(a,b){return this.isValidIdentifierStart(a,b)||this.isNumber(a)},codePointAt:function(a){return 1===a.length?a.charCodeAt(0):(a.charCodeAt(0)<<10)+a.charCodeAt(1)-56613888},peekMultichar:function(){var a=this.text.charAt(this.index),b=this.peek();if(!b)return a;var d=a.charCodeAt(0),c=b.charCodeAt(0);return 55296<=d&&56319>=d&&56320<=c&&57343>=c?a+b:a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,b,d){d=d||this.index;b=
w(b)?"s "+b+"-"+this.index+" ["+this.text.substring(b,d)+"]":" "+d;throw Ya("lexerr",a,b,this.text);},readNumber:function(){for(var a="",b=this.index;this.index<this.text.length;){var d=K(this.text.charAt(this.index));if("."===d||this.isNumber(d))a+=d;else{var c=this.peek();if("e"===d&&this.isExpOperator(c))a+=d;else if(this.isExpOperator(d)&&c&&this.isNumber(c)&&"e"===a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||c&&this.isNumber(c)||"e"!==a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:b,
text:a,constant:!0,value:Number(a)})},readIdent:function(){var a=this.index;for(this.index+=this.peekMultichar().length;this.index<this.text.length;){var b=this.peekMultichar();if(!this.isIdentifierContinue(b))break;this.index+=b.length}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var b=this.index;this.index++;for(var d="",c=a,e=!1;this.index<this.text.length;){var f=this.text.charAt(this.index),c=c+f;if(e)"u"===f?(e=this.text.substring(this.index+
1,this.index+5),e.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+e+"]"),this.index+=4,d+=String.fromCharCode(parseInt(e,16))):d+=wh[f]||f,e=!1;else if("\\"===f)e=!0;else{if(f===a){this.index++;this.tokens.push({index:b,text:c,constant:!0,value:d});return}d+=f}this.index++}this.throwError("Unterminated quote",b)}};var q=function(a,b){this.lexer=a;this.options=b};q.Program="Program";q.ExpressionStatement="ExpressionStatement";q.AssignmentExpression="AssignmentExpression";q.ConditionalExpression=
"ConditionalExpression";q.LogicalExpression="LogicalExpression";q.BinaryExpression="BinaryExpression";q.UnaryExpression="UnaryExpression";q.CallExpression="CallExpression";q.MemberExpression="MemberExpression";q.Identifier="Identifier";q.Literal="Literal";q.ArrayExpression="ArrayExpression";q.Property="Property";q.ObjectExpression="ObjectExpression";q.ThisExpression="ThisExpression";q.LocalsExpression="LocalsExpression";q.NGValueParameter="NGValueParameter";q.prototype={ast:function(a){this.text=
a;this.tokens=this.lexer.lex(a);a=this.program();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);return a},program:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.expressionStatement()),!this.expect(";"))return{type:q.Program,body:a}},expressionStatement:function(){return{type:q.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},
expression:function(){return this.assignment()},assignment:function(){var a=this.ternary();if(this.expect("=")){if(!Jd(a))throw Ya("lval");a={type:q.AssignmentExpression,left:a,right:this.assignment(),operator:"="}}return a},ternary:function(){var a=this.logicalOR(),b,d;return this.expect("?")&&(b=this.expression(),this.consume(":"))?(d=this.expression(),{type:q.ConditionalExpression,test:a,alternate:b,consequent:d}):a},logicalOR:function(){for(var a=this.logicalAND();this.expect("||");)a={type:q.LogicalExpression,
operator:"||",left:a,right:this.logicalAND()};return a},logicalAND:function(){for(var a=this.equality();this.expect("&&");)a={type:q.LogicalExpression,operator:"&&",left:a,right:this.equality()};return a},equality:function(){for(var a=this.relational(),b;b=this.expect("==","!=","===","!==");)a={type:q.BinaryExpression,operator:b.text,left:a,right:this.relational()};return a},relational:function(){for(var a=this.additive(),b;b=this.expect("<",">","<=",">=");)a={type:q.BinaryExpression,operator:b.text,
left:a,right:this.additive()};return a},additive:function(){for(var a=this.multiplicative(),b;b=this.expect("+","-");)a={type:q.BinaryExpression,operator:b.text,left:a,right:this.multiplicative()};return a},multiplicative:function(){for(var a=this.unary(),b;b=this.expect("*","/","%");)a={type:q.BinaryExpression,operator:b.text,left:a,right:this.unary()};return a},unary:function(){var a;return(a=this.expect("+","-","!"))?{type:q.UnaryExpression,operator:a.text,prefix:!0,argument:this.unary()}:this.primary()},
primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.selfReferential.hasOwnProperty(this.peek().text)?a=Ia(this.selfReferential[this.consume().text]):this.options.literals.hasOwnProperty(this.peek().text)?a={type:q.Literal,value:this.options.literals[this.consume().text]}:this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",
this.peek());for(var b;b=this.expect("(","[",".");)"("===b.text?(a={type:q.CallExpression,callee:a,arguments:this.parseArguments()},this.consume(")")):"["===b.text?(a={type:q.MemberExpression,object:a,property:this.expression(),computed:!0},this.consume("]")):"."===b.text?a={type:q.MemberExpression,object:a,property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return a},filter:function(a){a=[a];for(var b={type:q.CallExpression,callee:this.identifier(),arguments:a,filter:!0};this.expect(":");)a.push(this.expression());
return b},parseArguments:function(){var a=[];if(")"!==this.peekToken().text){do a.push(this.filterChain());while(this.expect(","))}return a},identifier:function(){var a=this.consume();a.identifier||this.throwError("is not a valid identifier",a);return{type:q.Identifier,name:a.text}},constant:function(){return{type:q.Literal,value:this.consume().value}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))}this.consume("]");
return{type:q.ArrayExpression,elements:a}},object:function(){var a=[],b;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;b={type:q.Property,kind:"init"};this.peek().constant?(b.key=this.constant(),b.computed=!1,this.consume(":"),b.value=this.expression()):this.peek().identifier?(b.key=this.identifier(),b.computed=!1,this.peek(":")?(this.consume(":"),b.value=this.expression()):b.value=b.key):this.peek("[")?(this.consume("["),b.key=this.expression(),this.consume("]"),b.computed=!0,this.consume(":"),
b.value=this.expression()):this.throwError("invalid key",this.peek());a.push(b)}while(this.expect(","))}this.consume("}");return{type:q.ObjectExpression,properties:a}},throwError:function(a,b){throw Ya("syntax",b.text,a,b.index+1,this.text,this.text.substring(b.index));},consume:function(a){if(0===this.tokens.length)throw Ya("ueoe",this.text);var b=this.expect(a);b||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return b},peekToken:function(){if(0===this.tokens.length)throw Ya("ueoe",
this.text);return this.tokens[0]},peek:function(a,b,d,c){return this.peekAhead(0,a,b,d,c)},peekAhead:function(a,b,d,c,e){if(this.tokens.length>a){a=this.tokens[a];var f=a.text;if(f===b||f===d||f===c||f===e||!(b||d||c||e))return a}return!1},expect:function(a,b,d,c){return(a=this.peek(a,b,d,c))?(this.tokens.shift(),a):!1},selfReferential:{"this":{type:q.ThisExpression},$locals:{type:q.LocalsExpression}}};var Hd=2;Ld.prototype={compile:function(a){var b=this;this.state={nextId:0,filters:{},fn:{vars:[],
body:[],own:{}},assign:{vars:[],body:[],own:{}},inputs:[]};Z(a,b.$filter);var d="",c;this.stage="assign";if(c=Kd(a))this.state.computing="assign",d=this.nextId(),this.recurse(c,d),this.return_(d),d="fn.assign="+this.generateFunction("assign","s,v,l");c=Id(a.body);b.stage="inputs";r(c,function(a,c){var d="fn"+c;b.state[d]={vars:[],body:[],own:{}};b.state.computing=d;var k=b.nextId();b.recurse(a,k);b.return_(k);b.state.inputs.push({name:d,isPure:a.isPure});a.watchId=c});this.state.computing="fn";this.stage=
"main";this.recurse(a);a='"'+this.USE+" "+this.STRICT+'";\n'+this.filterPrefix()+"var fn="+this.generateFunction("fn","s,l,a,i")+d+this.watchFns()+"return fn;";a=(new Function("$filter","getStringValue","ifDefined","plus",a))(this.$filter,Tg,Ug,Gd);this.state=this.stage=void 0;return a},USE:"use",STRICT:"strict",watchFns:function(){var a=[],b=this.state.inputs,d=this;r(b,function(b){a.push("var "+b.name+"="+d.generateFunction(b.name,"s"));b.isPure&&a.push(b.name,".isPure="+JSON.stringify(b.isPure)+
";")});b.length&&a.push("fn.inputs=["+b.map(function(a){return a.name}).join(",")+"];");return a.join("")},generateFunction:function(a,b){return"function("+b+"){"+this.varsPrefix(a)+this.body(a)+"};"},filterPrefix:function(){var a=[],b=this;r(this.state.filters,function(d,c){a.push(d+"=$filter("+b.escape(c)+")")});return a.length?"var "+a.join(",")+";":""},varsPrefix:function(a){return this.state[a].vars.length?"var "+this.state[a].vars.join(",")+";":""},body:function(a){return this.state[a].body.join("")},
recurse:function(a,b,d,c,e,f){var g,k,h=this,l,m,p;c=c||E;if(!f&&w(a.watchId))b=b||this.nextId(),this.if_("i",this.lazyAssign(b,this.computedMember("i",a.watchId)),this.lazyRecurse(a,b,d,c,e,!0));else switch(a.type){case q.Program:r(a.body,function(b,c){h.recurse(b.expression,void 0,void 0,function(a){k=a});c!==a.body.length-1?h.current().body.push(k,";"):h.return_(k)});break;case q.Literal:m=this.escape(a.value);this.assign(b,m);c(b||m);break;case q.UnaryExpression:this.recurse(a.argument,void 0,
void 0,function(a){k=a});m=a.operator+"("+this.ifDefined(k,0)+")";this.assign(b,m);c(m);break;case q.BinaryExpression:this.recurse(a.left,void 0,void 0,function(a){g=a});this.recurse(a.right,void 0,void 0,function(a){k=a});m="+"===a.operator?this.plus(g,k):"-"===a.operator?this.ifDefined(g,0)+a.operator+this.ifDefined(k,0):"("+g+")"+a.operator+"("+k+")";this.assign(b,m);c(m);break;case q.LogicalExpression:b=b||this.nextId();h.recurse(a.left,b);h.if_("&&"===a.operator?b:h.not(b),h.lazyRecurse(a.right,
b));c(b);break;case q.ConditionalExpression:b=b||this.nextId();h.recurse(a.test,b);h.if_(b,h.lazyRecurse(a.alternate,b),h.lazyRecurse(a.consequent,b));c(b);break;case q.Identifier:b=b||this.nextId();d&&(d.context="inputs"===h.stage?"s":this.assign(this.nextId(),this.getHasOwnProperty("l",a.name)+"?l:s"),d.computed=!1,d.name=a.name);h.if_("inputs"===h.stage||h.not(h.getHasOwnProperty("l",a.name)),function(){h.if_("inputs"===h.stage||"s",function(){e&&1!==e&&h.if_(h.isNull(h.nonComputedMember("s",a.name)),
h.lazyAssign(h.nonComputedMember("s",a.name),"{}"));h.assign(b,h.nonComputedMember("s",a.name))})},b&&h.lazyAssign(b,h.nonComputedMember("l",a.name)));c(b);break;case q.MemberExpression:g=d&&(d.context=this.nextId())||this.nextId();b=b||this.nextId();h.recurse(a.object,g,void 0,function(){h.if_(h.notNull(g),function(){a.computed?(k=h.nextId(),h.recurse(a.property,k),h.getStringValue(k),e&&1!==e&&h.if_(h.not(h.computedMember(g,k)),h.lazyAssign(h.computedMember(g,k),"{}")),m=h.computedMember(g,k),h.assign(b,
m),d&&(d.computed=!0,d.name=k)):(e&&1!==e&&h.if_(h.isNull(h.nonComputedMember(g,a.property.name)),h.lazyAssign(h.nonComputedMember(g,a.property.name),"{}")),m=h.nonComputedMember(g,a.property.name),h.assign(b,m),d&&(d.computed=!1,d.name=a.property.name))},function(){h.assign(b,"undefined")});c(b)},!!e);break;case q.CallExpression:b=b||this.nextId();a.filter?(k=h.filter(a.callee.name),l=[],r(a.arguments,function(a){var b=h.nextId();h.recurse(a,b);l.push(b)}),m=k+"("+l.join(",")+")",h.assign(b,m),c(b)):
(k=h.nextId(),g={},l=[],h.recurse(a.callee,k,g,function(){h.if_(h.notNull(k),function(){r(a.arguments,function(b){h.recurse(b,a.constant?void 0:h.nextId(),void 0,function(a){l.push(a)})});m=g.name?h.member(g.context,g.name,g.computed)+"("+l.join(",")+")":k+"("+l.join(",")+")";h.assign(b,m)},function(){h.assign(b,"undefined")});c(b)}));break;case q.AssignmentExpression:k=this.nextId();g={};this.recurse(a.left,void 0,g,function(){h.if_(h.notNull(g.context),function(){h.recurse(a.right,k);m=h.member(g.context,
g.name,g.computed)+a.operator+k;h.assign(b,m);c(b||m)})},1);break;case q.ArrayExpression:l=[];r(a.elements,function(b){h.recurse(b,a.constant?void 0:h.nextId(),void 0,function(a){l.push(a)})});m="["+l.join(",")+"]";this.assign(b,m);c(b||m);break;case q.ObjectExpression:l=[];p=!1;r(a.properties,function(a){a.computed&&(p=!0)});p?(b=b||this.nextId(),this.assign(b,"{}"),r(a.properties,function(a){a.computed?(g=h.nextId(),h.recurse(a.key,g)):g=a.key.type===q.Identifier?a.key.name:""+a.key.value;k=h.nextId();
h.recurse(a.value,k);h.assign(h.member(b,g,a.computed),k)})):(r(a.properties,function(b){h.recurse(b.value,a.constant?void 0:h.nextId(),void 0,function(a){l.push(h.escape(b.key.type===q.Identifier?b.key.name:""+b.key.value)+":"+a)})}),m="{"+l.join(",")+"}",this.assign(b,m));c(b||m);break;case q.ThisExpression:this.assign(b,"s");c(b||"s");break;case q.LocalsExpression:this.assign(b,"l");c(b||"l");break;case q.NGValueParameter:this.assign(b,"v"),c(b||"v")}},getHasOwnProperty:function(a,b){var d=a+"."+
b,c=this.current().own;c.hasOwnProperty(d)||(c[d]=this.nextId(!1,a+"&&("+this.escape(b)+" in "+a+")"));return c[d]},assign:function(a,b){if(a)return this.current().body.push(a,"=",b,";"),a},filter:function(a){this.state.filters.hasOwnProperty(a)||(this.state.filters[a]=this.nextId(!0));return this.state.filters[a]},ifDefined:function(a,b){return"ifDefined("+a+","+this.escape(b)+")"},plus:function(a,b){return"plus("+a+","+b+")"},return_:function(a){this.current().body.push("return ",a,";")},if_:function(a,
b,d){if(!0===a)b();else{var c=this.current().body;c.push("if(",a,"){");b();c.push("}");d&&(c.push("else{"),d(),c.push("}"))}},not:function(a){return"!("+a+")"},isNull:function(a){return a+"==null"},notNull:function(a){return a+"!=null"},nonComputedMember:function(a,b){var d=/[^$_a-zA-Z0-9]/g;return/^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(b)?a+"."+b:a+'["'+b.replace(d,this.stringEscapeFn)+'"]'},computedMember:function(a,b){return a+"["+b+"]"},member:function(a,b,d){return d?this.computedMember(a,b):this.nonComputedMember(a,
b)},getStringValue:function(a){this.assign(a,"getStringValue("+a+")")},lazyRecurse:function(a,b,d,c,e,f){var g=this;return function(){g.recurse(a,b,d,c,e,f)}},lazyAssign:function(a,b){var d=this;return function(){d.assign(a,b)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,stringEscapeFn:function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)},escape:function(a){if(C(a))return"'"+a.replace(this.stringEscapeRegex,this.stringEscapeFn)+"'";if(X(a))return a.toString();if(!0===a)return"true";if(!1===
a)return"false";if(null===a)return"null";if("undefined"===typeof a)return"undefined";throw Ya("esc");},nextId:function(a,b){var d="v"+this.state.nextId++;a||this.current().vars.push(d+(b?"="+b:""));return d},current:function(){return this.state[this.state.computing]}};Md.prototype={compile:function(a){var b=this;Z(a,b.$filter);var d,c;if(d=Kd(a))c=this.recurse(d);d=Id(a.body);var e;d&&(e=[],r(d,function(a,c){var d=b.recurse(a);d.isPure=a.isPure;a.input=d;e.push(d);a.watchId=c}));var f=[];r(a.body,
function(a){f.push(b.recurse(a.expression))});a=0===a.body.length?E:1===a.body.length?f[0]:function(a,b){var c;r(f,function(d){c=d(a,b)});return c};c&&(a.assign=function(a,b,d){return c(a,d,b)});e&&(a.inputs=e);return a},recurse:function(a,b,d){var c,e,f=this,g;if(a.input)return this.inputs(a.input,a.watchId);switch(a.type){case q.Literal:return this.value(a.value,b);case q.UnaryExpression:return e=this.recurse(a.argument),this["unary"+a.operator](e,b);case q.BinaryExpression:return c=this.recurse(a.left),
e=this.recurse(a.right),this["binary"+a.operator](c,e,b);case q.LogicalExpression:return c=this.recurse(a.left),e=this.recurse(a.right),this["binary"+a.operator](c,e,b);case q.ConditionalExpression:return this["ternary?:"](this.recurse(a.test),this.recurse(a.alternate),this.recurse(a.consequent),b);case q.Identifier:return f.identifier(a.name,b,d);case q.MemberExpression:return c=this.recurse(a.object,!1,!!d),a.computed||(e=a.property.name),a.computed&&(e=this.recurse(a.property)),a.computed?this.computedMember(c,
e,b,d):this.nonComputedMember(c,e,b,d);case q.CallExpression:return g=[],r(a.arguments,function(a){g.push(f.recurse(a))}),a.filter&&(e=this.$filter(a.callee.name)),a.filter||(e=this.recurse(a.callee,!0)),a.filter?function(a,c,d,f){for(var p=[],n=0;n<g.length;++n)p.push(g[n](a,c,d,f));a=e.apply(void 0,p,f);return b?{context:void 0,name:void 0,value:a}:a}:function(a,c,d,f){var p=e(a,c,d,f),n;if(null!=p.value){n=[];for(var s=0;s<g.length;++s)n.push(g[s](a,c,d,f));n=p.value.apply(p.context,n)}return b?
{value:n}:n};case q.AssignmentExpression:return c=this.recurse(a.left,!0,1),e=this.recurse(a.right),function(a,d,f,g){var p=c(a,d,f,g);a=e(a,d,f,g);p.context[p.name]=a;return b?{value:a}:a};case q.ArrayExpression:return g=[],r(a.elements,function(a){g.push(f.recurse(a))}),function(a,c,d,e){for(var f=[],n=0;n<g.length;++n)f.push(g[n](a,c,d,e));return b?{value:f}:f};case q.ObjectExpression:return g=[],r(a.properties,function(a){a.computed?g.push({key:f.recurse(a.key),computed:!0,value:f.recurse(a.value)}):
g.push({key:a.key.type===q.Identifier?a.key.name:""+a.key.value,computed:!1,value:f.recurse(a.value)})}),function(a,c,d,e){for(var f={},n=0;n<g.length;++n)g[n].computed?f[g[n].key(a,c,d,e)]=g[n].value(a,c,d,e):f[g[n].key]=g[n].value(a,c,d,e);return b?{value:f}:f};case q.ThisExpression:return function(a){return b?{value:a}:a};case q.LocalsExpression:return function(a,c){return b?{value:c}:c};case q.NGValueParameter:return function(a,c,d){return b?{value:d}:d}}},"unary+":function(a,b){return function(d,
c,e,f){d=a(d,c,e,f);d=w(d)?+d:0;return b?{value:d}:d}},"unary-":function(a,b){return function(d,c,e,f){d=a(d,c,e,f);d=w(d)?-d:-0;return b?{value:d}:d}},"unary!":function(a,b){return function(d,c,e,f){d=!a(d,c,e,f);return b?{value:d}:d}},"binary+":function(a,b,d){return function(c,e,f,g){var k=a(c,e,f,g);c=b(c,e,f,g);k=Gd(k,c);return d?{value:k}:k}},"binary-":function(a,b,d){return function(c,e,f,g){var k=a(c,e,f,g);c=b(c,e,f,g);k=(w(k)?k:0)-(w(c)?c:0);return d?{value:k}:k}},"binary*":function(a,b,
d){return function(c,e,f,g){c=a(c,e,f,g)*b(c,e,f,g);return d?{value:c}:c}},"binary/":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)/b(c,e,f,g);return d?{value:c}:c}},"binary%":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)%b(c,e,f,g);return d?{value:c}:c}},"binary===":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)===b(c,e,f,g);return d?{value:c}:c}},"binary!==":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!==b(c,e,f,g);return d?{value:c}:c}},"binary==":function(a,b,d){return function(c,
e,f,g){c=a(c,e,f,g)==b(c,e,f,g);return d?{value:c}:c}},"binary!=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!=b(c,e,f,g);return d?{value:c}:c}},"binary<":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<b(c,e,f,g);return d?{value:c}:c}},"binary>":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)>b(c,e,f,g);return d?{value:c}:c}},"binary<=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<=b(c,e,f,g);return d?{value:c}:c}},"binary>=":function(a,b,d){return function(c,e,f,g){c=
a(c,e,f,g)>=b(c,e,f,g);return d?{value:c}:c}},"binary&&":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)&&b(c,e,f,g);return d?{value:c}:c}},"binary||":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)||b(c,e,f,g);return d?{value:c}:c}},"ternary?:":function(a,b,d,c){return function(e,f,g,k){e=a(e,f,g,k)?b(e,f,g,k):d(e,f,g,k);return c?{value:e}:e}},value:function(a,b){return function(){return b?{context:void 0,name:void 0,value:a}:a}},identifier:function(a,b,d){return function(c,e,f,g){c=
e&&a in e?e:c;d&&1!==d&&c&&null==c[a]&&(c[a]={});e=c?c[a]:void 0;return b?{context:c,name:a,value:e}:e}},computedMember:function(a,b,d,c){return function(e,f,g,k){var h=a(e,f,g,k),l,m;null!=h&&(l=b(e,f,g,k),l+="",c&&1!==c&&h&&!h[l]&&(h[l]={}),m=h[l]);return d?{context:h,name:l,value:m}:m}},nonComputedMember:function(a,b,d,c){return function(e,f,g,k){e=a(e,f,g,k);c&&1!==c&&e&&null==e[b]&&(e[b]={});f=null!=e?e[b]:void 0;return d?{context:e,name:b,value:f}:f}},inputs:function(a,b){return function(d,
c,e,f){return f?f[b]:a(d,c,e)}}};Nb.prototype={constructor:Nb,parse:function(a){a=this.getAst(a);var b=this.astCompiler.compile(a.ast),d=a.ast;b.literal=0===d.body.length||1===d.body.length&&(d.body[0].expression.type===q.Literal||d.body[0].expression.type===q.ArrayExpression||d.body[0].expression.type===q.ObjectExpression);b.constant=a.ast.constant;b.oneTime=a.oneTime;return b},getAst:function(a){var b=!1;a=a.trim();":"===a.charAt(0)&&":"===a.charAt(1)&&(b=!0,a=a.substring(2));return{ast:this.ast.ast(a),
oneTime:b}}};var Ea=F("$sce"),W={HTML:"html",CSS:"css",MEDIA_URL:"mediaUrl",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},Dc=/_([a-z])/g,Zg=F("$templateRequest"),$g=F("$timeout"),aa=z.document.createElement("a"),Qd=ga(z.location.href),Na;aa.href="http://[::1]";var ah="[::1]"===aa.hostname;Rd.$inject=["$document"];fd.$inject=["$provide"];var Yd=22,Xd=".",Fc="0";Sd.$inject=["$locale"];Ud.$inject=["$locale"];var lh={yyyy:ea("FullYear",4,0,!1,!0),yy:ea("FullYear",2,0,!0,!0),y:ea("FullYear",1,0,!1,!0),
MMMM:lb("Month"),MMM:lb("Month",!0),MM:ea("Month",2,1),M:ea("Month",1,1),LLLL:lb("Month",!1,!0),dd:ea("Date",2),d:ea("Date",1),HH:ea("Hours",2),H:ea("Hours",1),hh:ea("Hours",2,-12),h:ea("Hours",1,-12),mm:ea("Minutes",2),m:ea("Minutes",1),ss:ea("Seconds",2),s:ea("Seconds",1),sss:ea("Milliseconds",3),EEEE:lb("Day"),EEE:lb("Day",!0),a:function(a,b){return 12>a.getHours()?b.AMPMS[0]:b.AMPMS[1]},Z:function(a,b,d){a=-1*d;return a=(0<=a?"+":"")+(Pb(Math[0<a?"floor":"ceil"](a/60),2)+Pb(Math.abs(a%60),2))},
ww:$d(2),w:$d(1),G:Gc,GG:Gc,GGG:Gc,GGGG:function(a,b){return 0>=a.getFullYear()?b.ERANAMES[0]:b.ERANAMES[1]}},kh=/((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))([\s\S]*)/,jh=/^-?\d+$/;Td.$inject=["$locale"];var eh=ia(K),fh=ia(vb);Vd.$inject=["$parse"];var Re=ia({restrict:"E",compile:function(a,b){if(!b.href&&!b.xlinkHref)return function(a,b){if("a"===b[0].nodeName.toLowerCase()){var e="[object SVGAnimatedString]"===la.call(b.prop("href"))?"xlink:href":"href";
b.on("click",function(a){b.attr(e)||a.preventDefault()})}}}}),wb={};r(Hb,function(a,b){function d(a,d,e){a.$watch(e[c],function(a){e.$set(b,!!a)})}if("multiple"!==a){var c=xa("ng-"+b),e=d;"checked"===a&&(e=function(a,b,e){e.ngModel!==e[c]&&d(a,b,e)});wb[c]=function(){return{restrict:"A",priority:100,link:e}}}});r(vd,function(a,b){wb[b]=function(){return{priority:100,link:function(a,c,e){if("ngPattern"===b&&"/"===e.ngPattern.charAt(0)&&(c=e.ngPattern.match(ke))){e.$set("ngPattern",new RegExp(c[1],
c[2]));return}a.$watch(e[b],function(a){e.$set(b,a)})}}}});r(["src","srcset","href"],function(a){var b=xa("ng-"+a);wb[b]=["$sce",function(d){return{priority:99,link:function(c,e,f){var g=a,k=a;"href"===a&&"[object SVGAnimatedString]"===la.call(e.prop("href"))&&(k="xlinkHref",f.$attr[k]="xlink:href",g=null);f.$set(b,d.getTrustedMediaUrl(f[b]));f.$observe(b,function(b){b?(f.$set(k,b),wa&&g&&e.prop(g,f[k])):"href"===a&&f.$set(k,null)})}}}]});var mb={$addControl:E,$getControls:ia([]),$$renameControl:function(a,
b){a.$name=b},$removeControl:E,$setValidity:E,$setDirty:E,$setPristine:E,$setSubmitted:E,$$setSubmitted:E};Qb.$inject=["$element","$attrs","$scope","$animate","$interpolate"];Qb.prototype={$rollbackViewValue:function(){r(this.$$controls,function(a){a.$rollbackViewValue()})},$commitViewValue:function(){r(this.$$controls,function(a){a.$commitViewValue()})},$addControl:function(a){Ja(a.$name,"input");this.$$controls.push(a);a.$name&&(this[a.$name]=a);a.$$parentForm=this},$getControls:function(){return ja(this.$$controls)},
$$renameControl:function(a,b){var d=a.$name;this[d]===a&&delete this[d];this[b]=a;a.$name=b},$removeControl:function(a){a.$name&&this[a.$name]===a&&delete this[a.$name];r(this.$pending,function(b,d){this.$setValidity(d,null,a)},this);r(this.$error,function(b,d){this.$setValidity(d,null,a)},this);r(this.$$success,function(b,d){this.$setValidity(d,null,a)},this);cb(this.$$controls,a);a.$$parentForm=mb},$setDirty:function(){this.$$animate.removeClass(this.$$element,Za);this.$$animate.addClass(this.$$element,
Wb);this.$dirty=!0;this.$pristine=!1;this.$$parentForm.$setDirty()},$setPristine:function(){this.$$animate.setClass(this.$$element,Za,Wb+" ng-submitted");this.$dirty=!1;this.$pristine=!0;this.$submitted=!1;r(this.$$controls,function(a){a.$setPristine()})},$setUntouched:function(){r(this.$$controls,function(a){a.$setUntouched()})},$setSubmitted:function(){for(var a=this;a.$$parentForm&&a.$$parentForm!==mb;)a=a.$$parentForm;a.$$setSubmitted()},$$setSubmitted:function(){this.$$animate.addClass(this.$$element,
"ng-submitted");this.$submitted=!0;r(this.$$controls,function(a){a.$$setSubmitted&&a.$$setSubmitted()})}};ce({clazz:Qb,set:function(a,b,d){var c=a[b];c?-1===c.indexOf(d)&&c.push(d):a[b]=[d]},unset:function(a,b,d){var c=a[b];c&&(cb(c,d),0===c.length&&delete a[b])}});var oe=function(a){return["$timeout","$parse",function(b,d){function c(a){return""===a?d('this[""]').assign:d(a).assign||E}return{name:"form",restrict:a?"EAC":"E",require:["form","^^?form"],controller:Qb,compile:function(d,f){d.addClass(Za).addClass(nb);
var g=f.name?"name":a&&f.ngForm?"ngForm":!1;return{pre:function(a,d,e,f){var p=f[0];if(!("action"in e)){var n=function(b){a.$apply(function(){p.$commitViewValue();p.$setSubmitted()});b.preventDefault()};d[0].addEventListener("submit",n);d.on("$destroy",function(){b(function(){d[0].removeEventListener("submit",n)},0,!1)})}(f[1]||p.$$parentForm).$addControl(p);var s=g?c(p.$name):E;g&&(s(a,p),e.$observe(g,function(b){p.$name!==b&&(s(a,void 0),p.$$parentForm.$$renameControl(p,b),s=c(p.$name),s(a,p))}));
d.on("$destroy",function(){p.$$parentForm.$removeControl(p);s(a,void 0);S(p,mb)})}}}}}]},Se=oe(),df=oe(!0),mh=/^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/,xh=/^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,yh=/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,
nh=/^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,pe=/^(\d{4,})-(\d{2})-(\d{2})$/,qe=/^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Oc=/^(\d{4,})-W(\d\d)$/,re=/^(\d{4,})-(\d\d)$/,se=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,ee=T();r(["date","datetime-local","month","time","week"],function(a){ee[a]=!0});var te={text:function(a,b,d,c,e,f){Sa(a,b,d,c,e,f);Ic(c)},date:ob("date",pe,Rb(pe,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":ob("datetimelocal",qe,Rb(qe,"yyyy MM dd HH mm ss sss".split(" ")),
"yyyy-MM-ddTHH:mm:ss.sss"),time:ob("time",se,Rb(se,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:ob("week",Oc,function(a,b){if(ha(a))return a;if(C(a)){Oc.lastIndex=0;var d=Oc.exec(a);if(d){var c=+d[1],e=+d[2],f=d=0,g=0,k=0,h=Zd(c),e=7*(e-1);b&&(d=b.getHours(),f=b.getMinutes(),g=b.getSeconds(),k=b.getMilliseconds());return new Date(c,0,h.getDate()+e,d,f,g,k)}}return NaN},"yyyy-Www"),month:ob("month",re,Rb(re,["yyyy","MM"]),"yyyy-MM"),number:function(a,b,d,c,e,f,g,k){Jc(a,b,d,c,"number");fe(c);Sa(a,
b,d,c,e,f);var h;if(w(d.min)||d.ngMin){var l=d.min||k(d.ngMin)(a);h=na(l);c.$validators.min=function(a,b){return c.$isEmpty(b)||A(h)||b>=h};d.$observe("min",function(a){a!==l&&(h=na(a),l=a,c.$validate())})}if(w(d.max)||d.ngMax){var m=d.max||k(d.ngMax)(a),p=na(m);c.$validators.max=function(a,b){return c.$isEmpty(b)||A(p)||b<=p};d.$observe("max",function(a){a!==m&&(p=na(a),m=a,c.$validate())})}if(w(d.step)||d.ngStep){var n=d.step||k(d.ngStep)(a),s=na(n);c.$validators.step=function(a,b){return c.$isEmpty(b)||
A(s)||ge(b,h||0,s)};d.$observe("step",function(a){a!==n&&(s=na(a),n=a,c.$validate())})}},url:function(a,b,d,c,e,f){Sa(a,b,d,c,e,f);Ic(c);c.$validators.url=function(a,b){var d=a||b;return c.$isEmpty(d)||xh.test(d)}},email:function(a,b,d,c,e,f){Sa(a,b,d,c,e,f);Ic(c);c.$validators.email=function(a,b){var d=a||b;return c.$isEmpty(d)||yh.test(d)}},radio:function(a,b,d,c){var e=!d.ngTrim||"false"!==V(d.ngTrim);A(d.name)&&b.attr("name",++qb);b.on("change",function(a){var g;b[0].checked&&(g=d.value,e&&(g=
V(g)),c.$setViewValue(g,a&&a.type))});c.$render=function(){var a=d.value;e&&(a=V(a));b[0].checked=a===c.$viewValue};d.$observe("value",c.$render)},range:function(a,b,d,c,e,f){function g(a,c){b.attr(a,d[a]);var e=d[a];d.$observe(a,function(a){a!==e&&(e=a,c(a))})}function k(a){p=na(a);Y(c.$modelValue)||(m?(a=b.val(),p>a&&(a=p,b.val(a)),c.$setViewValue(a)):c.$validate())}function h(a){n=na(a);Y(c.$modelValue)||(m?(a=b.val(),n<a&&(b.val(n),a=n<p?p:n),c.$setViewValue(a)):c.$validate())}function l(a){s=
na(a);Y(c.$modelValue)||(m?c.$viewValue!==b.val()&&c.$setViewValue(b.val()):c.$validate())}Jc(a,b,d,c,"range");fe(c);Sa(a,b,d,c,e,f);var m=c.$$hasNativeValidators&&"range"===b[0].type,p=m?0:void 0,n=m?100:void 0,s=m?1:void 0,r=b[0].validity;a=w(d.min);e=w(d.max);f=w(d.step);var q=c.$render;c.$render=m&&w(r.rangeUnderflow)&&w(r.rangeOverflow)?function(){q();c.$setViewValue(b.val())}:q;a&&(p=na(d.min),c.$validators.min=m?function(){return!0}:function(a,b){return c.$isEmpty(b)||A(p)||b>=p},g("min",k));
e&&(n=na(d.max),c.$validators.max=m?function(){return!0}:function(a,b){return c.$isEmpty(b)||A(n)||b<=n},g("max",h));f&&(s=na(d.step),c.$validators.step=m?function(){return!r.stepMismatch}:function(a,b){return c.$isEmpty(b)||A(s)||ge(b,p||0,s)},g("step",l))},checkbox:function(a,b,d,c,e,f,g,k){var h=he(k,a,"ngTrueValue",d.ngTrueValue,!0),l=he(k,a,"ngFalseValue",d.ngFalseValue,!1);b.on("change",function(a){c.$setViewValue(b[0].checked,a&&a.type)});c.$render=function(){b[0].checked=c.$viewValue};c.$isEmpty=
function(a){return!1===a};c.$formatters.push(function(a){return va(a,h)});c.$parsers.push(function(a){return a?h:l})},hidden:E,button:E,submit:E,reset:E,file:E},$c=["$browser","$sniffer","$filter","$parse",function(a,b,d,c){return{restrict:"E",require:["?ngModel"],link:{pre:function(e,f,g,k){k[0]&&(te[K(g.type)]||te.text)(e,f,g,k[0],b,a,d,c)}}}}],Af=function(){var a={configurable:!0,enumerable:!1,get:function(){return this.getAttribute("value")||""},set:function(a){this.setAttribute("value",a)}};
return{restrict:"E",priority:200,compile:function(b,d){if("hidden"===K(d.type))return{pre:function(b,d,f,g){b=d[0];b.parentNode&&b.parentNode.insertBefore(b,b.nextSibling);Object.defineProperty&&Object.defineProperty(b,"value",a)}}}}},zh=/^(true|false|\d+)$/,xf=function(){function a(a,d,c){var e=w(c)?c:9===wa?"":null;a.prop("value",e);d.$set("value",c)}return{restrict:"A",priority:100,compile:function(b,d){return zh.test(d.ngValue)?function(b,d,f){b=b.$eval(f.ngValue);a(d,f,b)}:function(b,d,f){b.$watch(f.ngValue,
function(b){a(d,f,b)})}}}},We=["$compile",function(a){return{restrict:"AC",compile:function(b){a.$$addBindingClass(b);return function(b,c,e){a.$$addBindingInfo(c,e.ngBind);c=c[0];b.$watch(e.ngBind,function(a){c.textContent=jc(a)})}}}}],Ye=["$interpolate","$compile",function(a,b){return{compile:function(d){b.$$addBindingClass(d);return function(c,d,f){c=a(d.attr(f.$attr.ngBindTemplate));b.$$addBindingInfo(d,c.expressions);d=d[0];f.$observe("ngBindTemplate",function(a){d.textContent=A(a)?"":a})}}}}],
Xe=["$sce","$parse","$compile",function(a,b,d){return{restrict:"A",compile:function(c,e){var f=b(e.ngBindHtml),g=b(e.ngBindHtml,function(b){return a.valueOf(b)});d.$$addBindingClass(c);return function(b,c,e){d.$$addBindingInfo(c,e.ngBindHtml);b.$watch(g,function(){var d=f(b);c.html(a.getTrustedHtml(d)||"")})}}}}],wf=ia({restrict:"A",require:"ngModel",link:function(a,b,d,c){c.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),Ze=Lc("",!0),af=Lc("Odd",0),$e=Lc("Even",1),bf=Ra({compile:function(a,
b){b.$set("ngCloak",void 0);a.removeClass("ng-cloak")}}),cf=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],ed={},Ah={blur:!0,focus:!0};r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var b=xa("ng-"+a);ed[b]=["$parse","$rootScope","$exceptionHandler",function(d,c,e){return sd(d,c,e,b,a,Ah[a])}]});var ff=["$animate","$compile",function(a,b){return{multiElement:!0,
transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(d,c,e,f,g){var k,h,l;d.$watch(e.ngIf,function(d){d?h||g(function(d,f){h=f;d[d.length++]=b.$$createComment("end ngIf",e.ngIf);k={clone:d};a.enter(d,c.parent(),c)}):(l&&(l.remove(),l=null),h&&(h.$destroy(),h=null),k&&(l=ub(k.clone),a.leave(l).done(function(a){!1!==a&&(l=null)}),k=null))})}}}],gf=["$templateRequest","$anchorScroll","$animate",function(a,b,d){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",
controller:ca.noop,compile:function(c,e){var f=e.ngInclude||e.src,g=e.onload||"",k=e.autoscroll;return function(c,e,m,p,n){var r=0,q,t,x,v=function(){t&&(t.remove(),t=null);q&&(q.$destroy(),q=null);x&&(d.leave(x).done(function(a){!1!==a&&(t=null)}),t=x,x=null)};c.$watch(f,function(f){var m=function(a){!1===a||!w(k)||k&&!c.$eval(k)||b()},t=++r;f?(a(f,!0).then(function(a){if(!c.$$destroyed&&t===r){var b=c.$new();p.template=a;a=n(b,function(a){v();d.enter(a,null,e).done(m)});q=b;x=a;q.$emit("$includeContentLoaded",
f);c.$eval(g)}},function(){c.$$destroyed||t!==r||(v(),c.$emit("$includeContentError",f))}),c.$emit("$includeContentRequested",f)):(v(),p.template=null)})}}}}],zf=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(b,d,c,e){la.call(d[0]).match(/SVG/)?(d.empty(),a(gd(e.template,z.document).childNodes)(b,function(a){d.append(a)},{futureParentElement:d})):(d.html(e.template),a(d.contents())(b))}}}],hf=Ra({priority:450,compile:function(){return{pre:function(a,
b,d){a.$eval(d.ngInit)}}}}),vf=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,b,d,c){var e=d.ngList||", ",f="false"!==d.ngTrim,g=f?V(e):e;c.$parsers.push(function(a){if(!A(a)){var b=[];a&&r(a.split(g),function(a){a&&b.push(f?V(a):a)});return b}});c.$formatters.push(function(a){if(H(a))return a.join(e)});c.$isEmpty=function(a){return!a||!a.length}}}},nb="ng-valid",be="ng-invalid",Za="ng-pristine",Wb="ng-dirty",pb=F("ngModel");Sb.$inject="$scope $exceptionHandler $attrs $element $parse $animate $timeout $q $interpolate".split(" ");
Sb.prototype={$$initGetterSetters:function(){if(this.$options.getOption("getterSetter")){var a=this.$$parse(this.$$attr.ngModel+"()"),b=this.$$parse(this.$$attr.ngModel+"($$$p)");this.$$ngModelGet=function(b){var c=this.$$parsedNgModel(b);B(c)&&(c=a(b));return c};this.$$ngModelSet=function(a,c){B(this.$$parsedNgModel(a))?b(a,{$$$p:c}):this.$$parsedNgModelAssign(a,c)}}else if(!this.$$parsedNgModel.assign)throw pb("nonassign",this.$$attr.ngModel,Aa(this.$$element));},$render:E,$isEmpty:function(a){return A(a)||
""===a||null===a||a!==a},$$updateEmptyClasses:function(a){this.$isEmpty(a)?(this.$$animate.removeClass(this.$$element,"ng-not-empty"),this.$$animate.addClass(this.$$element,"ng-empty")):(this.$$animate.removeClass(this.$$element,"ng-empty"),this.$$animate.addClass(this.$$element,"ng-not-empty"))},$setPristine:function(){this.$dirty=!1;this.$pristine=!0;this.$$animate.removeClass(this.$$element,Wb);this.$$animate.addClass(this.$$element,Za)},$setDirty:function(){this.$dirty=!0;this.$pristine=!1;this.$$animate.removeClass(this.$$element,
Za);this.$$animate.addClass(this.$$element,Wb);this.$$parentForm.$setDirty()},$setUntouched:function(){this.$touched=!1;this.$untouched=!0;this.$$animate.setClass(this.$$element,"ng-untouched","ng-touched")},$setTouched:function(){this.$touched=!0;this.$untouched=!1;this.$$animate.setClass(this.$$element,"ng-touched","ng-untouched")},$rollbackViewValue:function(){this.$$timeout.cancel(this.$$pendingDebounce);this.$viewValue=this.$$lastCommittedViewValue;this.$render()},$validate:function(){if(!Y(this.$modelValue)){var a=
this.$$lastCommittedViewValue,b=this.$$rawModelValue,d=this.$valid,c=this.$modelValue,e=this.$options.getOption("allowInvalid"),f=this;this.$$runValidators(b,a,function(a){e||d===a||(f.$modelValue=a?b:void 0,f.$modelValue!==c&&f.$$writeModelToScope())})}},$$runValidators:function(a,b,d){function c(){var c=!0;r(h.$validators,function(d,e){var g=Boolean(d(a,b));c=c&&g;f(e,g)});return c?!0:(r(h.$asyncValidators,function(a,b){f(b,null)}),!1)}function e(){var c=[],d=!0;r(h.$asyncValidators,function(e,
g){var h=e(a,b);if(!h||!B(h.then))throw pb("nopromise",h);f(g,void 0);c.push(h.then(function(){f(g,!0)},function(){d=!1;f(g,!1)}))});c.length?h.$$q.all(c).then(function(){g(d)},E):g(!0)}function f(a,b){k===h.$$currentValidationRunId&&h.$setValidity(a,b)}function g(a){k===h.$$currentValidationRunId&&d(a)}this.$$currentValidationRunId++;var k=this.$$currentValidationRunId,h=this;(function(){var a=h.$$parserName;if(A(h.$$parserValid))f(a,null);else return h.$$parserValid||(r(h.$validators,function(a,
b){f(b,null)}),r(h.$asyncValidators,function(a,b){f(b,null)})),f(a,h.$$parserValid),h.$$parserValid;return!0})()?c()?e():g(!1):g(!1)},$commitViewValue:function(){var a=this.$viewValue;this.$$timeout.cancel(this.$$pendingDebounce);if(this.$$lastCommittedViewValue!==a||""===a&&this.$$hasNativeValidators)this.$$updateEmptyClasses(a),this.$$lastCommittedViewValue=a,this.$pristine&&this.$setDirty(),this.$$parseAndValidate()},$$parseAndValidate:function(){var a=this.$$lastCommittedViewValue,b=this;this.$$parserValid=
A(a)?void 0:!0;this.$setValidity(this.$$parserName,null);this.$$parserName="parse";if(this.$$parserValid)for(var d=0;d<this.$parsers.length;d++)if(a=this.$parsers[d](a),A(a)){this.$$parserValid=!1;break}Y(this.$modelValue)&&(this.$modelValue=this.$$ngModelGet(this.$$scope));var c=this.$modelValue,e=this.$options.getOption("allowInvalid");this.$$rawModelValue=a;e&&(this.$modelValue=a,b.$modelValue!==c&&b.$$writeModelToScope());this.$$runValidators(a,this.$$lastCommittedViewValue,function(d){e||(b.$modelValue=
d?a:void 0,b.$modelValue!==c&&b.$$writeModelToScope())})},$$writeModelToScope:function(){this.$$ngModelSet(this.$$scope,this.$modelValue);r(this.$viewChangeListeners,function(a){try{a()}catch(b){this.$$exceptionHandler(b)}},this)},$setViewValue:function(a,b){this.$viewValue=a;this.$options.getOption("updateOnDefault")&&this.$$debounceViewValueCommit(b)},$$debounceViewValueCommit:function(a){var b=this.$options.getOption("debounce");X(b[a])?b=b[a]:X(b["default"])&&-1===this.$options.getOption("updateOn").indexOf(a)?
b=b["default"]:X(b["*"])&&(b=b["*"]);this.$$timeout.cancel(this.$$pendingDebounce);var d=this;0<b?this.$$pendingDebounce=this.$$timeout(function(){d.$commitViewValue()},b):this.$$rootScope.$$phase?this.$commitViewValue():this.$$scope.$apply(function(){d.$commitViewValue()})},$overrideModelOptions:function(a){this.$options=this.$options.createChild(a);this.$$setUpdateOnEvents()},$processModelValue:function(){var a=this.$$format();this.$viewValue!==a&&(this.$$updateEmptyClasses(a),this.$viewValue=this.$$lastCommittedViewValue=
a,this.$render(),this.$$runValidators(this.$modelValue,this.$viewValue,E))},$$format:function(){for(var a=this.$formatters,b=a.length,d=this.$modelValue;b--;)d=a[b](d);return d},$$setModelValue:function(a){this.$modelValue=this.$$rawModelValue=a;this.$$parserValid=void 0;this.$processModelValue()},$$setUpdateOnEvents:function(){this.$$updateEvents&&this.$$element.off(this.$$updateEvents,this.$$updateEventHandler);if(this.$$updateEvents=this.$options.getOption("updateOn"))this.$$element.on(this.$$updateEvents,
this.$$updateEventHandler)},$$updateEventHandler:function(a){this.$$debounceViewValueCommit(a&&a.type)}};ce({clazz:Sb,set:function(a,b){a[b]=!0},unset:function(a,b){delete a[b]}});var uf=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:Sb,priority:1,compile:function(b){b.addClass(Za).addClass("ng-untouched").addClass(nb);return{pre:function(a,b,e,f){var g=f[0];b=f[1]||g.$$parentForm;if(f=f[2])g.$options=f.$options;g.$$initGetterSetters();b.$addControl(g);
e.$observe("name",function(a){g.$name!==a&&g.$$parentForm.$$renameControl(g,a)});a.$on("$destroy",function(){g.$$parentForm.$removeControl(g)})},post:function(b,c,e,f){function g(){k.$setTouched()}var k=f[0];k.$$setUpdateOnEvents();c.on("blur",function(){k.$touched||(a.$$phase?b.$evalAsync(g):b.$apply(g))})}}}}}],Tb,Bh=/(\s+|^)default(\s+|$)/;Mc.prototype={getOption:function(a){return this.$$options[a]},createChild:function(a){var b=!1;a=S({},a);r(a,function(d,c){"$inherit"===d?"*"===c?b=!0:(a[c]=
this.$$options[c],"updateOn"===c&&(a.updateOnDefault=this.$$options.updateOnDefault)):"updateOn"===c&&(a.updateOnDefault=!1,a[c]=V(d.replace(Bh,function(){a.updateOnDefault=!0;return" "})))},this);b&&(delete a["*"],ie(a,this.$$options));ie(a,Tb.$$options);return new Mc(a)}};Tb=new Mc({updateOn:"",updateOnDefault:!0,debounce:0,getterSetter:!1,allowInvalid:!1,timezone:null});var yf=function(){function a(a,d){this.$$attrs=a;this.$$scope=d}a.$inject=["$attrs","$scope"];a.prototype={$onInit:function(){var a=
this.parentCtrl?this.parentCtrl.$options:Tb,d=this.$$scope.$eval(this.$$attrs.ngModelOptions);this.$options=a.createChild(d)}};return{restrict:"A",priority:10,require:{parentCtrl:"?^^ngModelOptions"},bindToController:!0,controller:a}},jf=Ra({terminal:!0,priority:1E3}),Ch=F("ngOptions"),Dh=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([$\w][$\w]*)|(?:\(\s*([$\w][$\w]*)\s*,\s*([$\w][$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
sf=["$compile","$document","$parse",function(a,b,d){function c(a,b,c){function e(a,b,c,d,f){this.selectValue=a;this.viewValue=b;this.label=c;this.group=d;this.disabled=f}function f(a){var b;if(!r&&za(a))b=a;else{b=[];for(var c in a)a.hasOwnProperty(c)&&"$"!==c.charAt(0)&&b.push(c)}return b}var p=a.match(Dh);if(!p)throw Ch("iexp",a,Aa(b));var n=p[5]||p[7],r=p[6];a=/ as /.test(p[0])&&p[1];var q=p[9];b=d(p[2]?p[1]:n);var t=a&&d(a)||b,w=q&&d(q),v=q?function(a,b){return w(c,b)}:function(a){return La(a)},
x=function(a,b){return v(a,B(a,b))},A=d(p[2]||p[1]),y=d(p[3]||""),J=d(p[4]||""),I=d(p[8]),z={},B=r?function(a,b){z[r]=b;z[n]=a;return z}:function(a){z[n]=a;return z};return{trackBy:q,getTrackByValue:x,getWatchables:d(I,function(a){var b=[];a=a||[];for(var d=f(a),e=d.length,g=0;g<e;g++){var k=a===d?g:d[g],l=a[k],k=B(l,k),l=v(l,k);b.push(l);if(p[2]||p[1])l=A(c,k),b.push(l);p[4]&&(k=J(c,k),b.push(k))}return b}),getOptions:function(){for(var a=[],b={},d=I(c)||[],g=f(d),k=g.length,n=0;n<k;n++){var p=d===
g?n:g[n],r=B(d[p],p),s=t(c,r),p=v(s,r),w=A(c,r),z=y(c,r),r=J(c,r),s=new e(p,s,w,z,r);a.push(s);b[p]=s}return{items:a,selectValueMap:b,getOptionFromViewValue:function(a){return b[x(a)]},getViewValueFromOption:function(a){return q?Ia(a.viewValue):a.viewValue}}}}}var e=z.document.createElement("option"),f=z.document.createElement("optgroup");return{restrict:"A",terminal:!0,require:["select","ngModel"],link:{pre:function(a,b,c,d){d[0].registerOption=E},post:function(d,k,h,l){function m(a){var b=(a=v.getOptionFromViewValue(a))&&
a.element;b&&!b.selected&&(b.selected=!0);return a}function p(a,b){a.element=b;b.disabled=a.disabled;a.label!==b.label&&(b.label=a.label,b.textContent=a.label);b.value=a.selectValue}var n=l[0],q=l[1],A=h.multiple;l=0;for(var t=k.children(),z=t.length;l<z;l++)if(""===t[l].value){n.hasEmptyOption=!0;n.emptyOption=t.eq(l);break}k.empty();l=!!n.emptyOption;x(e.cloneNode(!1)).val("?");var v,B=c(h.ngOptions,k,d),C=b[0].createDocumentFragment();n.generateUnknownOptionValue=function(a){return"?"};A?(n.writeValue=
function(a){if(v){var b=a&&a.map(m)||[];v.items.forEach(function(a){a.element.selected&&-1===Array.prototype.indexOf.call(b,a)&&(a.element.selected=!1)})}},n.readValue=function(){var a=k.val()||[],b=[];r(a,function(a){(a=v.selectValueMap[a])&&!a.disabled&&b.push(v.getViewValueFromOption(a))});return b},B.trackBy&&d.$watchCollection(function(){if(H(q.$viewValue))return q.$viewValue.map(function(a){return B.getTrackByValue(a)})},function(){q.$render()})):(n.writeValue=function(a){if(v){var b=k[0].options[k[0].selectedIndex],
c=v.getOptionFromViewValue(a);b&&b.removeAttribute("selected");c?(k[0].value!==c.selectValue&&(n.removeUnknownOption(),k[0].value=c.selectValue,c.element.selected=!0),c.element.setAttribute("selected","selected")):n.selectUnknownOrEmptyOption(a)}},n.readValue=function(){var a=v.selectValueMap[k.val()];return a&&!a.disabled?(n.unselectEmptyOption(),n.removeUnknownOption(),v.getViewValueFromOption(a)):null},B.trackBy&&d.$watch(function(){return B.getTrackByValue(q.$viewValue)},function(){q.$render()}));
l&&(a(n.emptyOption)(d),k.prepend(n.emptyOption),8===n.emptyOption[0].nodeType?(n.hasEmptyOption=!1,n.registerOption=function(a,b){""===b.val()&&(n.hasEmptyOption=!0,n.emptyOption=b,n.emptyOption.removeClass("ng-scope"),q.$render(),b.on("$destroy",function(){var a=n.$isEmptyOptionSelected();n.hasEmptyOption=!1;n.emptyOption=void 0;a&&q.$render()}))}):n.emptyOption.removeClass("ng-scope"));d.$watchCollection(B.getWatchables,function(){var a=v&&n.readValue();if(v)for(var b=v.items.length-1;0<=b;b--){var c=
v.items[b];w(c.group)?Gb(c.element.parentNode):Gb(c.element)}v=B.getOptions();var d={};v.items.forEach(function(a){var b;if(w(a.group)){b=d[a.group];b||(b=f.cloneNode(!1),C.appendChild(b),b.label=null===a.group?"null":a.group,d[a.group]=b);var c=e.cloneNode(!1);b.appendChild(c);p(a,c)}else b=e.cloneNode(!1),C.appendChild(b),p(a,b)});k[0].appendChild(C);q.$render();q.$isEmpty(a)||(b=n.readValue(),(B.trackBy||A?va(a,b):a===b)||(q.$setViewValue(b),q.$render()))})}}}}],kf=["$locale","$interpolate","$log",
function(a,b,d){var c=/{}/g,e=/^when(Minus)?(.+)$/;return{link:function(f,g,k){function h(a){g.text(a||"")}var l=k.count,m=k.$attr.when&&g.attr(k.$attr.when),p=k.offset||0,n=f.$eval(m)||{},q={},w=b.startSymbol(),t=b.endSymbol(),x=w+l+"-"+p+t,v=ca.noop,z;r(k,function(a,b){var c=e.exec(b);c&&(c=(c[1]?"-":"")+K(c[2]),n[c]=g.attr(k.$attr[b]))});r(n,function(a,d){q[d]=b(a.replace(c,x))});f.$watch(l,function(b){var c=parseFloat(b),e=Y(c);e||c in n||(c=a.pluralCat(c-p));c===z||e&&Y(z)||(v(),e=q[c],A(e)?
(null!=b&&d.debug("ngPluralize: no rule defined for '"+c+"' in "+m),v=E,h()):v=f.$watch(e,h),z=c)})}}}],ue=F("ngRef"),lf=["$parse",function(a){return{priority:-1,restrict:"A",compile:function(b,d){var c=xa(ua(b)),e=a(d.ngRef),f=e.assign||function(){throw ue("nonassign",d.ngRef);};return function(a,b,h){var l;if(h.hasOwnProperty("ngRefRead"))if("$element"===h.ngRefRead)l=b;else{if(l=b.data("$"+h.ngRefRead+"Controller"),!l)throw ue("noctrl",h.ngRefRead,d.ngRef);}else l=b.data("$"+c+"Controller");l=
l||b;f(a,l);b.on("$destroy",function(){e(a)===l&&f(a,null)})}}}}],mf=["$parse","$animate","$compile",function(a,b,d){var c=F("ngRepeat"),e=function(a,b,c,d,e,f,g){a[c]=d;e&&(a[e]=f);a.$index=b;a.$first=0===b;a.$last=b===g-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(b&1))},f=function(a,b,c){return La(c)},g=function(a,b){return b};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(k,h){var l=h.ngRepeat,m=d.$$createComment("end ngRepeat",
l),p=l.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!p)throw c("iexp",l);var n=p[1],q=p[2],w=p[3],t=p[4],p=n.match(/^(?:(\s*[$\w]+)|\(\s*([$\w]+)\s*,\s*([$\w]+)\s*\))$/);if(!p)throw c("iidexp",n);var x=p[3]||p[1],v=p[2];if(w&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(w)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(w)))throw c("badident",w);var A;if(t){var z={$id:La},y=a(t);A=function(a,b,c,d){v&&
(z[v]=b);z[x]=c;z.$index=d;return y(a,z)}}return function(a,d,h,k,n){var p=T();a.$watchCollection(q,function(h){var k,q,t=d[0],s,y=T(),B,C,E,D,H,F,K;w&&(a[w]=h);if(za(h))H=h,q=A||f;else for(K in q=A||g,H=[],h)ta.call(h,K)&&"$"!==K.charAt(0)&&H.push(K);B=H.length;K=Array(B);for(k=0;k<B;k++)if(C=h===H?k:H[k],E=h[C],D=q(a,C,E,k),p[D])F=p[D],delete p[D],y[D]=F,K[k]=F;else{if(y[D])throw r(K,function(a){a&&a.scope&&(p[a.id]=a)}),c("dupes",l,D,E);K[k]={id:D,scope:void 0,clone:void 0};y[D]=!0}z&&(z[x]=void 0);
for(s in p){F=p[s];D=ub(F.clone);b.leave(D);if(D[0].parentNode)for(k=0,q=D.length;k<q;k++)D[k].$$NG_REMOVED=!0;F.scope.$destroy()}for(k=0;k<B;k++)if(C=h===H?k:H[k],E=h[C],F=K[k],F.scope){s=t;do s=s.nextSibling;while(s&&s.$$NG_REMOVED);F.clone[0]!==s&&b.move(ub(F.clone),null,t);t=F.clone[F.clone.length-1];e(F.scope,k,x,E,v,C,B)}else n(function(a,c){F.scope=c;var d=m.cloneNode(!1);a[a.length++]=d;b.enter(a,null,t);t=d;F.clone=a;y[F.id]=F;e(F.scope,k,x,E,v,C,B)});p=y})}}}}],nf=["$animate",function(a){return{restrict:"A",
multiElement:!0,link:function(b,d,c){b.$watch(c.ngShow,function(b){a[b?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],ef=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngHide,function(b){a[b?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],of=Ra(function(a,b,d){a.$watchCollection(d.ngStyle,function(a,d){d&&a!==d&&r(d,function(a,c){b.css(c,"")});a&&b.css(a)})}),pf=["$animate","$compile",function(a,
b){return{require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(d,c,e,f){var g=[],k=[],h=[],l=[],m=function(a,b){return function(c){!1!==c&&a.splice(b,1)}};d.$watch(e.ngSwitch||e.on,function(c){for(var d,e;h.length;)a.cancel(h.pop());d=0;for(e=l.length;d<e;++d){var q=ub(k[d].clone);l[d].$destroy();(h[d]=a.leave(q)).done(m(h,d))}k.length=0;l.length=0;(g=f.cases["!"+c]||f.cases["?"])&&r(g,function(c){c.transclude(function(d,e){l.push(e);var f=c.element;d[d.length++]=b.$$createComment("end ngSwitchWhen");
k.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],qf=Ra({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){a=d.ngSwitchWhen.split(d.ngSwitchWhenSeparator).sort().filter(function(a,b,c){return c[b-1]!==a});r(a,function(a){c.cases["!"+a]=c.cases["!"+a]||[];c.cases["!"+a].push({transclude:e,element:b})})}}),rf=Ra({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){c.cases["?"]=c.cases["?"]||[];c.cases["?"].push({transclude:e,
element:b})}}),Eh=F("ngTransclude"),tf=["$compile",function(a){return{restrict:"EAC",compile:function(b){var d=a(b.contents());b.empty();return function(a,b,f,g,k){function h(){d(a,function(a){b.append(a)})}if(!k)throw Eh("orphan",Aa(b));f.ngTransclude===f.$attr.ngTransclude&&(f.ngTransclude="");f=f.ngTransclude||f.ngTranscludeSlot;k(function(a,c){var d;if(d=a.length)a:{d=0;for(var f=a.length;d<f;d++){var g=a[d];if(g.nodeType!==Pa||g.nodeValue.trim()){d=!0;break a}}d=void 0}d?b.append(a):(h(),c.$destroy())},
null,f);f&&!k.isSlotFilled(f)&&h()}}}}],Te=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(b,d){"text/ng-template"===d.type&&a.put(d.id,b[0].text)}}}],Fh={$setViewValue:E,$render:E},Gh=["$element","$scope",function(a,b){function d(){g||(g=!0,b.$$postDigest(function(){g=!1;e.ngModelCtrl.$render()}))}function c(a){k||(k=!0,b.$$postDigest(function(){b.$$destroyed||(k=!1,e.ngModelCtrl.$setViewValue(e.readValue()),a&&e.ngModelCtrl.$render())}))}var e=this,f=new Ib;e.selectValueMap=
{};e.ngModelCtrl=Fh;e.multiple=!1;e.unknownOption=x(z.document.createElement("option"));e.hasEmptyOption=!1;e.emptyOption=void 0;e.renderUnknownOption=function(b){b=e.generateUnknownOptionValue(b);e.unknownOption.val(b);a.prepend(e.unknownOption);Oa(e.unknownOption,!0);a.val(b)};e.updateUnknownOption=function(b){b=e.generateUnknownOptionValue(b);e.unknownOption.val(b);Oa(e.unknownOption,!0);a.val(b)};e.generateUnknownOptionValue=function(a){return"? "+La(a)+" ?"};e.removeUnknownOption=function(){e.unknownOption.parent()&&
e.unknownOption.remove()};e.selectEmptyOption=function(){e.emptyOption&&(a.val(""),Oa(e.emptyOption,!0))};e.unselectEmptyOption=function(){e.hasEmptyOption&&Oa(e.emptyOption,!1)};b.$on("$destroy",function(){e.renderUnknownOption=E});e.readValue=function(){var b=a.val(),b=b in e.selectValueMap?e.selectValueMap[b]:b;return e.hasOption(b)?b:null};e.writeValue=function(b){var c=a[0].options[a[0].selectedIndex];c&&Oa(x(c),!1);e.hasOption(b)?(e.removeUnknownOption(),c=La(b),a.val(c in e.selectValueMap?
c:b),Oa(x(a[0].options[a[0].selectedIndex]),!0)):e.selectUnknownOrEmptyOption(b)};e.addOption=function(a,b){if(8!==b[0].nodeType){Ja(a,'"option value"');""===a&&(e.hasEmptyOption=!0,e.emptyOption=b);var c=f.get(a)||0;f.set(a,c+1);d()}};e.removeOption=function(a){var b=f.get(a);b&&(1===b?(f.delete(a),""===a&&(e.hasEmptyOption=!1,e.emptyOption=void 0)):f.set(a,b-1))};e.hasOption=function(a){return!!f.get(a)};e.$hasEmptyOption=function(){return e.hasEmptyOption};e.$isUnknownOptionSelected=function(){return a[0].options[0]===
e.unknownOption[0]};e.$isEmptyOptionSelected=function(){return e.hasEmptyOption&&a[0].options[a[0].selectedIndex]===e.emptyOption[0]};e.selectUnknownOrEmptyOption=function(a){null==a&&e.emptyOption?(e.removeUnknownOption(),e.selectEmptyOption()):e.unknownOption.parent().length?e.updateUnknownOption(a):e.renderUnknownOption(a)};var g=!1,k=!1;e.registerOption=function(a,b,f,g,k){if(f.$attr.ngValue){var q,r;f.$observe("value",function(a){var d,f=b.prop("selected");w(r)&&(e.removeOption(q),delete e.selectValueMap[r],
d=!0);r=La(a);q=a;e.selectValueMap[r]=a;e.addOption(a,b);b.attr("value",r);d&&f&&c()})}else g?f.$observe("value",function(a){e.readValue();var d,f=b.prop("selected");w(q)&&(e.removeOption(q),d=!0);q=a;e.addOption(a,b);d&&f&&c()}):k?a.$watch(k,function(a,d){f.$set("value",a);var g=b.prop("selected");d!==a&&e.removeOption(d);e.addOption(a,b);d&&g&&c()}):e.addOption(f.value,b);f.$observe("disabled",function(a){if("true"===a||a&&b.prop("selected"))e.multiple?c(!0):(e.ngModelCtrl.$setViewValue(null),e.ngModelCtrl.$render())});
b.on("$destroy",function(){var a=e.readValue(),b=f.value;e.removeOption(b);d();(e.multiple&&a&&-1!==a.indexOf(b)||a===b)&&c(!0)})}}],Ue=function(){return{restrict:"E",require:["select","?ngModel"],controller:Gh,priority:1,link:{pre:function(a,b,d,c){var e=c[0],f=c[1];if(f){if(e.ngModelCtrl=f,b.on("change",function(){e.removeUnknownOption();a.$apply(function(){f.$setViewValue(e.readValue())})}),d.multiple){e.multiple=!0;e.readValue=function(){var a=[];r(b.find("option"),function(b){b.selected&&!b.disabled&&
(b=b.value,a.push(b in e.selectValueMap?e.selectValueMap[b]:b))});return a};e.writeValue=function(a){r(b.find("option"),function(b){var c=!!a&&(-1!==Array.prototype.indexOf.call(a,b.value)||-1!==Array.prototype.indexOf.call(a,e.selectValueMap[b.value]));c!==b.selected&&Oa(x(b),c)})};var g,k=NaN;a.$watch(function(){k!==f.$viewValue||va(g,f.$viewValue)||(g=ja(f.$viewValue),f.$render());k=f.$viewValue});f.$isEmpty=function(a){return!a||0===a.length}}}else e.registerOption=E},post:function(a,b,d,c){var e=
c[1];if(e){var f=c[0];e.$render=function(){f.writeValue(e.$viewValue)}}}}}},Ve=["$interpolate",function(a){return{restrict:"E",priority:100,compile:function(b,d){var c,e;w(d.ngValue)||(w(d.value)?c=a(d.value,!0):(e=a(b.text(),!0))||d.$set("value",b.text()));return function(a,b,d){var h=b.parent();(h=h.data("$selectController")||h.parent().data("$selectController"))&&h.registerOption(a,b,d,c,e)}}}}],bd=["$parse",function(a){return{restrict:"A",require:"?ngModel",link:function(b,d,c,e){if(e){var f=
c.hasOwnProperty("required")||a(c.ngRequired)(b);c.ngRequired||(c.required=!0);e.$validators.required=function(a,b){return!f||!e.$isEmpty(b)};c.$observe("required",function(a){f!==a&&(f=a,e.$validate())})}}}}],ad=["$parse",function(a){return{restrict:"A",require:"?ngModel",compile:function(b,d){var c,e;d.ngPattern&&(c=d.ngPattern,e="/"===d.ngPattern.charAt(0)&&ke.test(d.ngPattern)?function(){return d.ngPattern}:a(d.ngPattern));return function(a,b,d,h){if(h){var l=d.pattern;d.ngPattern?l=e(a):c=d.pattern;
var m=je(l,c,b);d.$observe("pattern",function(a){var d=m;m=je(a,c,b);(d&&d.toString())!==(m&&m.toString())&&h.$validate()});h.$validators.pattern=function(a,b){return h.$isEmpty(b)||A(m)||m.test(b)}}}}}}],dd=["$parse",function(a){return{restrict:"A",require:"?ngModel",link:function(b,d,c,e){if(e){var f=c.maxlength||a(c.ngMaxlength)(b),g=Ub(f);c.$observe("maxlength",function(a){f!==a&&(g=Ub(a),f=a,e.$validate())});e.$validators.maxlength=function(a,b){return 0>g||e.$isEmpty(b)||b.length<=g}}}}}],cd=
["$parse",function(a){return{restrict:"A",require:"?ngModel",link:function(b,d,c,e){if(e){var f=c.minlength||a(c.ngMinlength)(b),g=Ub(f)||-1;c.$observe("minlength",function(a){f!==a&&(g=Ub(a)||-1,f=a,e.$validate())});e.$validators.minlength=function(a,b){return e.$isEmpty(b)||b.length>=g}}}}}];z.angular.bootstrap?z.console&&console.log("WARNING: Tried to load AngularJS more than once."):(Je(),Oe(ca),ca.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==
b?0:a.length-b-1}a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"],FIRSTDAYOFWEEK:6,MONTH:"January February March April May June July August September October November December".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),STANDALONEMONTH:"January February March April May June July August September October November December".split(" "),
WEEKENDRANGE:[5,6],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",medium:"MMM d, y h:mm:ss a",mediumDate:"MMM d, y",mediumTime:"h:mm:ss a","short":"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-\u00a4",negSuf:"",posPre:"\u00a4",posSuf:""}]},id:"en-us",localeID:"en_US",pluralCat:function(a,
c){var e=a|0,f=c;void 0===f&&(f=Math.min(b(a),3));Math.pow(10,f);return 1==e&&0==f?"one":"other"}})}]),x(function(){Ee(z.document,Wc)}))})(window);!window.angular.$$csp().noInlineStyle&&window.angular.element(document.head).prepend(window.angular.element("<style>").text('@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}'));
//# sourceMappingURL=angular.min.js.map
;
"use strict";
angular.module("angularMask", []).directive("angularMask", function() {
    return {
        restrict: "A",
        require: "ngModel",
        scope: false,
        link: function(e, r, a, l) {
            function n(e) {
                var r = a.angularMask,
                    l = r.split("|");
                if (l.length > 1 && l.sort(function(e, r) {
                        return e.length - r.length
                    }), null === e || "" == e) return "";
                var n = String(e).replace(/\D/g, "");
                if (l.length > 1)
                    for (var u in l)
                        if (n.replace(/\D/g, "").length <= l[u].replace(/\D/g, "").length) {
                            r = l[u];
                            break
                        } for (var t = "", i = 0, g = 0; g < r.length && n[i];) r[g].match(/\D/) ? t += r[g] : (t += n[i], i++), g++;
                return t
            }
            e.$watch(function() {
                return a.angularMask
            }, function(e) {
                null != l.$viewValue && (l.$viewValue = n(String(l.$viewValue).replace(/\D/g, "")), r.val(l.$viewValue))
            }), l.$formatters.push(function(e) {
                return null === e ? "" : n(String(e).replace(/\D/g, ""))
            }), l.$parsers.push(function(a) {
                l.$viewValue = n(a);
                var u = a.isModelValueEqualViewValues ? l.$viewValue : String(a).replace(/\D/g, "");
                return r.val(l.$viewValue), u
            })
        }
    }
});;
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint import/no-unresolved: 0 */


var _sidebarjs = __webpack_require__(1);

__webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SidebarJSCtrl = function () {
  /* @ngInject */
  SidebarJSCtrl.$inject = ['$scope', '$element', 'SidebarJS'];
  function SidebarJSCtrl($scope, $element, SidebarJS) {
    _classCallCheck(this, SidebarJSCtrl);

    this.$scope = $scope;
    this.SidebarJS = SidebarJS;
    this.elem = $element[0];
  }

  _createClass(SidebarJSCtrl, [{
    key: '$onInit',
    value: function $onInit() {
      this.sidebarjsName = this.sidebarjsName || '';
      this.elem.setAttribute('sidebarjs', this.sidebarjsName);
    }
  }, {
    key: '$postLink',
    value: function $postLink() {
      var _this = this;

      var userConfig = this.sidebarjsConfig || {};
      var _onChangeVisibility = this.onChangeVisibility || userConfig.onChangeVisibility;
      var config = _extends({}, userConfig, {
        component: this.elem,
        container: this.elem.children[0],
        backdrop: this.elem.children[1],
        onOpen: this.onOpen || userConfig.onOpen,
        onClose: this.onClose || userConfig.onClose,
        onChangeVisibility: function onChangeVisibility(changes) {
          if (_onChangeVisibility) {
            _onChangeVisibility({ $event: changes });
          }
          _this.$scope.$applyAsync();
        }
      });
      this.SidebarJS.create(config);
    }
  }, {
    key: '$onDestroy',
    value: function $onDestroy() {
      this.SidebarJS.destroy(this.sidebarjsName);
    }
  }]);

  return SidebarJSCtrl;
}();

function SidebarJSDirective(action) {
  return {
    /* @ngInject */
    controller: ['SidebarJS', function controller(SidebarJS) {
      this.SidebarJS = SidebarJS;
    }],
    link: function link(scope, elem, attrs, ctrl) {
      var inst = ctrl.SidebarJS.instances[sidebarName || ""];
      if (inst && attrs.checkcookie) {
    	  inst.checkCookie = attrs.checkcookie == 'true';
      }
 
      if (!ctrl.SidebarJS.elemHasListener(elem[0])) {
        var sidebarName = attrs['sidebarjs' + (action.charAt(0).toUpperCase() + action.slice(1))];
        elem[0].addEventListener('click', function () {
        	var inst = ctrl.SidebarJS.instances[sidebarName || ""];
        	if (inst && attrs.checkcookie) {
        	  inst.checkCookie = attrs.checkcookie == 'true';
          }
          return ctrl.SidebarJS[action](sidebarName);
        });
        ctrl.SidebarJS.elemHasListener(elem[0], true);
      }
    }
  };
}

angular.module('ngSidebarJS', []).service('SidebarJS', _sidebarjs.SidebarService).component('sidebarjs', {
  template: '<div sidebarjs-container ng-transclude></div><div sidebarjs-backdrop></div>',
  transclude: true,
  controller: SidebarJSCtrl,
  bindings: {
    onOpen: '&?',
    onClose: '&?',
    onChangeVisibility: '&?',
    sidebarjsConfig: '<?',
    sidebarjsName: '@?'
  }
}).directive('sidebarjsOpen', SidebarJSDirective.bind(null, 'open')).directive('sidebarjsClose', SidebarJSDirective.bind(null, 'close')).directive('sidebarjsToggle', SidebarJSDirective.bind(null, 'toggle'));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * SidebarJS
 * Version 5.1.0
 * https://github.com/SidebarJS/sidebarjs#readme
 */

(function (global, factory) {
	 true ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.SidebarJS = {})));
}(this, (function (exports) { 'use strict';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var sidebarElement = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var SIDEBARJS = 'sidebarjs';
var IS_VISIBLE = SIDEBARJS + "--is-visible";
var IS_MOVING = SIDEBARJS + "--is-moving";
var LEFT_POSITION = 'left';
var RIGHT_POSITION = 'right';
var POSITIONS = [LEFT_POSITION, RIGHT_POSITION];
var SidebarElement = /** @class */ (function () {
    function SidebarElement(config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        this.toggle = function () {
            _this.isVisible() ? _this.close() : _this.open();
        };
        this.open = function () {
        	if (_this.checkCookie){
        		var cookies = document.cookie.split("; ");
        		var riaCookie = false;
        		
        		for (var i=0; i < cookies.length; i++) {
        			if(cookies[i].indexOf('ria_') !== -1){
        				riaCookie = true;
        			}
        		}
        		
        		if (riaCookie == true){
        			_this.checkCookie = true;
            		return;
        		} else {
            		_this.component.classList.add(IS_VISIBLE);
                    _this.setBackdropOpacity(_this.backdropOpacity);
        		}
        	
        	}else{
                _this.component.classList.add(IS_VISIBLE);
                _this.setBackdropOpacity(_this.backdropOpacity);
        	}
        	_this.checkCookie = true;
        	
        	_this.container.getElementsByTagName('a')[0].focus();
        };
        this.close = function () {
            _this.component.classList.remove(IS_VISIBLE);
            _this.backdrop.removeAttribute('style');
        };
        this.__onTouchStart = function (e) {
            _this.initialTouch = e.touches[0].pageX;
        };
        this.__onTouchMove = function (e) {
            var documentSwiped = Math.abs(_this.initialTouch - e.touches[0].clientX);
            var sidebarMovement = _this.container.clientWidth - documentSwiped;
            if (sidebarMovement <= _this.container.clientWidth) {
                _this.touchMoveSidebar = documentSwiped;
                _this.moveSidebar(_this.hasLeftPosition() ? -documentSwiped : documentSwiped);
            }
        };
        this.__onTouchEnd = function () {
            _this.component.classList.remove(IS_MOVING);
            _this.container.removeAttribute('style');
            _this.backdrop.removeAttribute('style');
            _this.touchMoveSidebar > (_this.container.clientWidth / 3.5) ? _this.close() : _this.open();
            _this.initialTouch = null;
            _this.touchMoveSidebar = null;
        };
        this.__onSwipeOpenStart = function (e) {
            if (_this.targetElementIsBackdrop(e)) {
                return;
            }
            var touchPositionX = e.touches[0].clientX;
            var documentTouch = _this.hasLeftPosition() ? touchPositionX : document.body.clientWidth - touchPositionX;
            if (documentTouch < _this.documentSwipeRange) {
                _this.__onTouchStart(e);
            }
        };
        this.__onSwipeOpenMove = function (e) {
            if (!_this.targetElementIsBackdrop(e) && _this.initialTouch && !_this.isVisible()) {
                var documentSwiped = e.touches[0].clientX - _this.initialTouch;
                var hasLeftPosition = _this.hasLeftPosition();
                var swipeX = hasLeftPosition ? documentSwiped : -documentSwiped;
                var sidebarMovement = _this.container.clientWidth - swipeX;
                if (sidebarMovement > 0 && swipeX >= _this.documentMinSwipeX) {
                    _this.openMovement = hasLeftPosition ? -sidebarMovement : sidebarMovement;
                    _this.moveSidebar(_this.openMovement);
                }
            }
        };
        this.__onSwipeOpenEnd = function () {
            if (_this.openMovement) {
                _this.openMovement = null;
                _this.__onTouchEnd();
            }
        };
        this.__onTransitionEnd = function () {
            var isVisible = _this.isVisible();
            if (isVisible && !_this.__wasVisible) {
                _this.__wasVisible = true;
                if (_this.__emitOnOpen) {
                    _this.__emitOnOpen();
                }
            }
            else if (!isVisible && _this.__wasVisible) {
                _this.__wasVisible = false;
                if (_this.__emitOnClose) {
                    _this.__emitOnClose();
                }
            }
            if (_this.__emitOnChangeVisibility) {
                _this.__emitOnChangeVisibility({ isVisible: isVisible });
            }
        };
        var component = config.component, container = config.container, backdrop = config.backdrop, _a = config.documentMinSwipeX, documentMinSwipeX = _a === void 0 ? 10 : _a, _b = config.documentSwipeRange, documentSwipeRange = _b === void 0 ? 40 : _b, nativeSwipe = config.nativeSwipe, nativeSwipeOpen = config.nativeSwipeOpen, _c = config.position, position = _c === void 0 ? 'left' : _c, _d = config.backdropOpacity, backdropOpacity = _d === void 0 ? 0.3 : _d, onOpen = config.onOpen, onClose = config.onClose, onChangeVisibility = config.onChangeVisibility;
        var hasCustomTransclude = container && backdrop;
        this.component = component || document.querySelector("[" + SIDEBARJS + "]");
        this.container = hasCustomTransclude ? container : SidebarElement.create(SIDEBARJS + "-container");
        this.backdrop = hasCustomTransclude ? backdrop : SidebarElement.create(SIDEBARJS + "-backdrop");
        this.documentMinSwipeX = documentMinSwipeX;
        this.documentSwipeRange = documentSwipeRange;
        this.nativeSwipe = nativeSwipe !== false;
        this.nativeSwipeOpen = nativeSwipeOpen !== false;
        this.backdropOpacity = backdropOpacity;
        this.backdropOpacityRatio = 1 / backdropOpacity;
        this.__emitOnOpen = onOpen;
        this.__emitOnClose = onClose;
        this.__emitOnChangeVisibility = onChangeVisibility;
        if (!hasCustomTransclude) {
            try {
                this.transcludeContent();
            }
            catch (e) {
                throw new Error('You must define an element with [sidebarjs] attribute');
            }
        }
        if (this.nativeSwipe) {
            this.addNativeGestures();
            if (this.nativeSwipeOpen) {
                this.addNativeOpenGestures();
            }
        }
        this.setPosition(position);
        this.addAttrsEventsListeners(this.component.getAttribute(SIDEBARJS));
        this.addTransitionListener();
        this.backdrop.addEventListener('click', this.close, { passive: true });
    }
    SidebarElement.prototype.isVisible = function () {
        return this.component.classList.contains(IS_VISIBLE);
    };
    SidebarElement.prototype.destroy = function () {
        var _this = this;
        this.component.removeEventListener('touchstart', this.__onTouchStart, { passive: true });
        this.component.removeEventListener('touchmove', this.__onTouchMove, { passive: true });
        this.component.removeEventListener('touchend', this.__onTouchEnd, { passive: true });
        this.container.removeEventListener('transitionend', this.__onTransitionEnd, { passive: true });
        this.backdrop.removeEventListener('click', this.close, { passive: true });
        document.removeEventListener('touchstart', this.__onSwipeOpenStart, { passive: true });
        document.removeEventListener('touchmove', this.__onSwipeOpenMove, { passive: true });
        document.removeEventListener('touchend', this.__onSwipeOpenEnd, { passive: true });
        this.removeAttrsEventsListeners(this.component.getAttribute(SIDEBARJS));
        this.removeComponentClassPosition();
        while (this.container.firstElementChild) {
            this.component.appendChild(this.container.firstElementChild);
        }
        this.component.removeChild(this.container);
        this.component.removeChild(this.backdrop);
        Object.keys(this).forEach(function (key) { return _this[key] = null; });
    };
    SidebarElement.prototype.setPosition = function (position) {
        var _this = this;
        this.component.classList.add(IS_MOVING);
        this.position = POSITIONS.indexOf(position) >= 0 ? position : LEFT_POSITION;
        this.removeComponentClassPosition();
        this.component.classList.add(SIDEBARJS + "--" + (this.hasRightPosition() ? RIGHT_POSITION : LEFT_POSITION));
        setTimeout(function () { return _this.component && _this.component.classList.remove(IS_MOVING); }, 200);
    };
    SidebarElement.prototype.addAttrsEventsListeners = function (sidebarName) {
        var _this = this;
        this.forEachActionElement(sidebarName, function (element, action) {
            if (!SidebarElement.elemHasListener(element)) {
                element.addEventListener('click', _this[action], { passive: true });
                SidebarElement.elemHasListener(element, true);
            }
        });
    };
    SidebarElement.prototype.removeAttrsEventsListeners = function (sidebarName) {
        var _this = this;
        this.forEachActionElement(sidebarName, function (element, action) {
            if (SidebarElement.elemHasListener(element)) {
                element.removeEventListener('click', _this[action]);
                SidebarElement.elemHasListener(element, false);
            }
        });
    };
    SidebarElement.prototype.addTransitionListener = function () {
        this.__wasVisible = this.isVisible();
        this.container.addEventListener('transitionend', this.__onTransitionEnd, { passive: true });
    };
    SidebarElement.prototype.forEachActionElement = function (sidebarName, func) {
        var actions = ['toggle', 'open', 'close'];
        for (var i = 0; i < actions.length; i++) {
            var elements = document.querySelectorAll("[" + SIDEBARJS + "-" + actions[i] + "=\"" + sidebarName + "\"]");
            for (var j = 0; j < elements.length; j++) {
                func(elements[j], actions[i]);
            }
        }
    };
    SidebarElement.prototype.removeComponentClassPosition = function () {
        for (var i = 0; i < POSITIONS.length; i++) {
            this.component.classList.remove(SIDEBARJS + "--" + POSITIONS[i]);
        }
    };
    SidebarElement.prototype.hasLeftPosition = function () {
        return this.position === LEFT_POSITION;
    };
    SidebarElement.prototype.hasRightPosition = function () {
        return this.position === RIGHT_POSITION;
    };
    SidebarElement.prototype.transcludeContent = function () {
        while (this.component.firstChild) {
            this.container.appendChild(this.component.firstChild);
        }
        while (this.component.firstChild) {
            this.component.removeChild(this.component.firstChild);
        }
        this.component.appendChild(this.container);
        this.component.appendChild(this.backdrop);
    };
    SidebarElement.prototype.addNativeGestures = function () {
        this.component.addEventListener('touchstart', this.__onTouchStart, { passive: true });
        this.component.addEventListener('touchmove', this.__onTouchMove, { passive: true });
        this.component.addEventListener('touchend', this.__onTouchEnd, { passive: true });
    };
    SidebarElement.prototype.addNativeOpenGestures = function () {
        document.addEventListener('touchstart', this.__onSwipeOpenStart, { passive: true });
        document.addEventListener('touchmove', this.__onSwipeOpenMove, { passive: true });
        document.addEventListener('touchend', this.__onSwipeOpenEnd, { passive: true });
    };
    SidebarElement.prototype.moveSidebar = function (movement) {
        this.component.classList.add(IS_MOVING);
        SidebarElement.vendorify(this.container, 'transform', "translate(" + movement + "px, 0)");
        this.updateBackdropOpacity(movement);
    };
    SidebarElement.prototype.updateBackdropOpacity = function (movement) {
        var swipeProgress = 1 - (Math.abs(movement) / this.container.clientWidth);
        var opacity = swipeProgress / this.backdropOpacityRatio;
        this.setBackdropOpacity(opacity);
    };
    SidebarElement.prototype.setBackdropOpacity = function (opacity) {
        this.backdrop.style.opacity = opacity.toString();
    };
    SidebarElement.prototype.targetElementIsBackdrop = function (e) {
        return e.target.hasAttribute(SIDEBARJS + "-backdrop");
    };
    SidebarElement.create = function (element) {
        var el = document.createElement('div');
        el.setAttribute(element, '');
        return el;
    };
    SidebarElement.vendorify = function (el, prop, val) {
        el.style['Webkit' + prop.charAt(0).toUpperCase() + prop.slice(1)] = val;
        el.style[prop] = val;
    };
    SidebarElement.elemHasListener = function (elem, value) {
        return elem && typeof value === 'boolean' ? elem.sidebarjsListener = value : !!elem.sidebarjsListener;
    };
    return SidebarElement;
}());
exports.SidebarElement = SidebarElement;

});

unwrapExports(sidebarElement);
var sidebarElement_1 = sidebarElement.SidebarElement;

var sidebarService = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var SidebarService = /** @class */ (function () {
    function SidebarService() {
        this.instances = {};
    }
    SidebarService.prototype.create = function (options) {
        if (options === void 0) { options = {}; }
        var name = options.component && options.component.getAttribute('sidebarjs') || '';
        this.instances[name] = new sidebarElement.SidebarElement(options);
        return this.instances[name];
    };
    SidebarService.prototype.open = function (sidebarName) {
        if (sidebarName === void 0) { sidebarName = ''; }
        if (this.instances[sidebarName]) {
            this.instances[sidebarName].open();
        }
    };
    SidebarService.prototype.close = function (sidebarName) {
        if (sidebarName === void 0) { sidebarName = ''; }
        if (this.instances[sidebarName]) {
            this.instances[sidebarName].close();
        }
    };
    SidebarService.prototype.toggle = function (sidebarName) {
//        if($('#insurance-switch').length > 0){
//            $('#insurance-switch').click();
//        }else{    

            if (sidebarName === void 0) { sidebarName = ''; }
            if (this.instances[sidebarName]) {
                this.instances[sidebarName].toggle();
            }
//        }
    };
    SidebarService.prototype.isVisible = function (sidebarName) {
        if (sidebarName === void 0) { sidebarName = ''; }
        return !!this.instances[sidebarName] && this.instances[sidebarName].isVisible();
    };
    SidebarService.prototype.setPosition = function (position, sidebarName) {
        if (sidebarName === void 0) { sidebarName = ''; }
        if (this.instances[sidebarName]) {
            this.instances[sidebarName].setPosition(position);
        }
    };
    SidebarService.prototype.elemHasListener = function (elem, value) {
        return sidebarElement.SidebarElement.elemHasListener(elem, value);
    };
    SidebarService.prototype.destroy = function (sidebarName) {
        if (sidebarName === void 0) { sidebarName = ''; }
        if (this.instances[sidebarName]) {
            this.instances[sidebarName].destroy();
            this.instances[sidebarName] = null;
            delete this.instances[sidebarName];
        }
    };
    return SidebarService;
}());
exports.SidebarService = SidebarService;

});

unwrapExports(sidebarService);
var sidebarService_1 = sidebarService.SidebarService;

var src = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.SidebarElement = sidebarElement.SidebarElement;

exports.SidebarService = sidebarService.SidebarService;

});

var index = unwrapExports(src);
var src_1 = src.SidebarElement;
var src_2 = src.SidebarService;

exports.default = index;
exports.SidebarElement = src_1;
exports.SidebarService = src_2;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);;
/*
 AngularJS v1.7.9
 (c) 2010-2018 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(n,e){'use strict';function m(d,k,l){var a=l.baseHref(),h=d[0];return function(f,b,c){var d,g;c=c||{};g=c.expires;d=e.isDefined(c.path)?c.path:a;e.isUndefined(b)&&(g="Thu, 01 Jan 1970 00:00:00 GMT",b="");e.isString(g)&&(g=new Date(g));b=encodeURIComponent(f)+"="+encodeURIComponent(b);b=b+(d?";path="+d:"")+(c.domain?";domain="+c.domain:"");b+=g?";expires="+g.toUTCString():"";b+=c.secure?";secure":"";b+=c.samesite?";samesite="+c.samesite:"";c=b.length+1;4096<c&&k.warn("Cookie '"+f+"' possibly not set or overflowed because it was too large ("+
c+" > 4096 bytes)!");h.cookie=b}}e.module("ngCookies",["ng"]).info({angularVersion:"1.7.9"}).provider("$cookies",[function(){var d=this.defaults={};this.$get=["$$cookieReader","$$cookieWriter",function(k,l){return{get:function(a){return k()[a]},getObject:function(a){return(a=this.get(a))?e.fromJson(a):a},getAll:function(){return k()},put:function(a,h,f){l(a,h,f?e.extend({},d,f):d)},putObject:function(a,d,f){this.put(a,e.toJson(d),f)},remove:function(a,h){l(a,void 0,h?e.extend({},d,h):d)}}}]}]);m.$inject=
["$document","$log","$browser"];e.module("ngCookies").provider("$$cookieWriter",function(){this.$get=m})})(window,window.angular);
//# sourceMappingURL=angular-cookies.min.js.map
;
/*
 AngularJS v1.7.9
 (c) 2010-2018 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(s,c){'use strict';function P(c){var h=[];C(h,E).chars(c);return h.join("")}var D=c.$$minErr("$sanitize"),F,h,G,H,I,q,E,J,K,C;c.module("ngSanitize",[]).provider("$sanitize",function(){function f(a,e){return B(a.split(","),e)}function B(a,e){var d={},b;for(b=0;b<a.length;b++)d[e?q(a[b]):a[b]]=!0;return d}function t(a,e){e&&e.length&&h(a,B(e))}function Q(a){for(var e={},d=0,b=a.length;d<b;d++){var k=a[d];e[k.name]=k.value}return e}function L(a){return a.replace(/&/g,"&amp;").replace(z,function(a){var d=
a.charCodeAt(0);a=a.charCodeAt(1);return"&#"+(1024*(d-55296)+(a-56320)+65536)+";"}).replace(u,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function A(a){for(;a;){if(a.nodeType===s.Node.ELEMENT_NODE)for(var e=a.attributes,d=0,b=e.length;d<b;d++){var k=e[d],g=k.name.toLowerCase();if("xmlns:ns1"===g||0===g.lastIndexOf("ns1:",0))a.removeAttributeNode(k),d--,b--}(e=a.firstChild)&&A(e);a=v("nextSibling",a)}}function v(a,e){var d=e[a];if(d&&J.call(e,d))throw D("elclob",
e.outerHTML||e.outerText);return d}var y=!1,g=!1;this.$get=["$$sanitizeUri",function(a){y=!0;g&&h(m,l);return function(e){var d=[];K(e,C(d,function(b,d){return!/^unsafe:/.test(a(b,d))}));return d.join("")}}];this.enableSvg=function(a){return I(a)?(g=a,this):g};this.addValidElements=function(a){y||(H(a)&&(a={htmlElements:a}),t(l,a.svgElements),t(r,a.htmlVoidElements),t(m,a.htmlVoidElements),t(m,a.htmlElements));return this};this.addValidAttrs=function(a){y||h(M,B(a,!0));return this};F=c.bind;h=c.extend;
G=c.forEach;H=c.isArray;I=c.isDefined;q=c.$$lowercase;E=c.noop;K=function(a,e){null===a||void 0===a?a="":"string"!==typeof a&&(a=""+a);var d=N(a);if(!d)return"";var b=5;do{if(0===b)throw D("uinput");b--;a=d.innerHTML;d=N(a)}while(a!==d.innerHTML);for(b=d.firstChild;b;){switch(b.nodeType){case 1:e.start(b.nodeName.toLowerCase(),Q(b.attributes));break;case 3:e.chars(b.textContent)}var k;if(!(k=b.firstChild)&&(1===b.nodeType&&e.end(b.nodeName.toLowerCase()),k=v("nextSibling",b),!k))for(;null==k;){b=
v("parentNode",b);if(b===d)break;k=v("nextSibling",b);1===b.nodeType&&e.end(b.nodeName.toLowerCase())}b=k}for(;b=d.firstChild;)d.removeChild(b)};C=function(a,e){var d=!1,b=F(a,a.push);return{start:function(a,g){a=q(a);!d&&w[a]&&(d=a);d||!0!==m[a]||(b("<"),b(a),G(g,function(d,g){var c=q(g),f="img"===a&&"src"===c||"background"===c;!0!==M[c]||!0===O[c]&&!e(d,f)||(b(" "),b(g),b('="'),b(L(d)),b('"'))}),b(">"))},end:function(a){a=q(a);d||!0!==m[a]||!0===r[a]||(b("</"),b(a),b(">"));a==d&&(d=!1)},chars:function(a){d||
b(L(a))}}};J=s.Node.prototype.contains||function(a){return!!(this.compareDocumentPosition(a)&16)};var z=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,u=/([^#-~ |!])/g,r=f("area,br,col,hr,img,wbr"),x=f("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),p=f("rp,rt"),n=h({},p,x),x=h({},x,f("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")),p=h({},p,f("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
l=f("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"),w=f("script,style"),m=h({},r,x,p,n),O=f("background,cite,href,longdesc,src,xlink:href,xml:base"),n=f("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),
p=f("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",
!0),M=h({},O,p,n),N=function(a,e){function d(b){b="<remove></remove>"+b;try{var d=(new a.DOMParser).parseFromString(b,"text/html").body;d.firstChild.remove();return d}catch(e){}}function b(a){c.innerHTML=a;e.documentMode&&A(c);return c}var g;if(e&&e.implementation)g=e.implementation.createHTMLDocument("inert");else throw D("noinert");var c=(g.documentElement||g.getDocumentElement()).querySelector("body");c.innerHTML='<svg><g onload="this.parentNode.remove()"></g></svg>';return c.querySelector("svg")?
(c.innerHTML='<svg><p><style><img src="</style><img src=x onerror=alert(1)//">',c.querySelector("svg img")?d:b):function(b){b="<remove></remove>"+b;try{b=encodeURI(b)}catch(d){return}var e=new a.XMLHttpRequest;e.responseType="document";e.open("GET","data:text/html;charset=utf-8,"+b,!1);e.send(null);b=e.response.body;b.firstChild.remove();return b}}(s,s.document)}).info({angularVersion:"1.7.9"});c.module("ngSanitize").filter("linky",["$sanitize",function(f){var h=/((s?ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
t=/^mailto:/i,q=c.$$minErr("linky"),s=c.isDefined,A=c.isFunction,v=c.isObject,y=c.isString;return function(c,z,u){function r(c){c&&l.push(P(c))}function x(c,g){var f,a=p(c);l.push("<a ");for(f in a)l.push(f+'="'+a[f]+'" ');!s(z)||"target"in a||l.push('target="',z,'" ');l.push('href="',c.replace(/"/g,"&quot;"),'">');r(g);l.push("</a>")}if(null==c||""===c)return c;if(!y(c))throw q("notstring",c);for(var p=A(u)?u:v(u)?function(){return u}:function(){return{}},n=c,l=[],w,m;c=n.match(h);)w=c[0],c[2]||
c[4]||(w=(c[3]?"http://":"mailto:")+w),m=c.index,r(n.substr(0,m)),x(w,c[0].replace(t,"")),n=n.substring(m+c[0].length);r(n);return f(l.join(""))}}])})(window,window.angular);
//# sourceMappingURL=angular-sanitize.min.js.map
;
var duScrollDefaultEasing=function(e){"use strict";return e<.5?Math.pow(2*e,2)/2:1-Math.pow(2*(1-e),2)/2},duScroll=angular.module("duScroll",["duScroll.scrollspy","duScroll.smoothScroll","duScroll.scrollContainer","duScroll.spyContext","duScroll.scrollHelpers"]).value("duScrollDuration",350).value("duScrollSpyWait",100).value("duScrollSpyRefreshInterval",0).value("duScrollGreedy",!1).value("duScrollOffset",0).value("duScrollEasing",duScrollDefaultEasing).value("duScrollCancelOnEvents","scroll mousedown mousewheel touchmove keydown").value("duScrollBottomSpy",!1).value("duScrollActiveClass","active");"undefined"!=typeof module&&module&&module.exports&&(module.exports=duScroll),angular.module("duScroll.scrollHelpers",["duScroll.requestAnimation"]).run(["$window","$q","cancelAnimation","requestAnimation","duScrollEasing","duScrollDuration","duScrollOffset","duScrollCancelOnEvents",function(e,t,n,r,o,l,u,i){"use strict";var c={},a=function(e){return"undefined"!=typeof HTMLDocument&&e instanceof HTMLDocument||e.nodeType&&e.nodeType===e.DOCUMENT_NODE},s=function(e){return"undefined"!=typeof HTMLElement&&e instanceof HTMLElement||e.nodeType&&e.nodeType===e.ELEMENT_NODE},d=function(e){return s(e)||a(e)?e:e[0]};c.duScrollTo=function(t,n,r,o){var l;if(angular.isElement(t)?l=this.duScrollToElement:angular.isDefined(r)&&(l=this.duScrollToAnimated),l)return l.apply(this,arguments);var u=d(this);return a(u)?e.scrollTo(t,n):(u.scrollLeft=t,void(u.scrollTop=n))};var f,m;c.duScrollToAnimated=function(e,l,u,c){u&&!c&&(c=o);var a=this.duScrollLeft(),s=this.duScrollTop(),d=Math.round(e-a),p=Math.round(l-s),S=null,g=0,v=this,h=function(e){(!e||g&&e.which>0)&&(i&&v.unbind(i,h),n(f),m.reject(),f=null)};if(f&&h(),m=t.defer(),0===u||!d&&!p)return 0===u&&v.duScrollTo(e,l),m.resolve(),m.promise;var y=function(e){null===S&&(S=e),g=e-S;var t=g>=u?1:c(g/u);v.scrollTo(a+Math.ceil(d*t),s+Math.ceil(p*t)),t<1?f=r(y):(i&&v.unbind(i,h),f=null,m.resolve())};return v.duScrollTo(a,s),i&&v.bind(i,h),f=r(y),m.promise},c.duScrollToElement=function(e,t,n,r){var o=d(this);angular.isNumber(t)&&!isNaN(t)||(t=u);var l=this.duScrollTop()+d(e).getBoundingClientRect().top-t;return s(o)&&(l-=o.getBoundingClientRect().top),this.duScrollTo(0,l,n,r)},c.duScrollLeft=function(t,n,r){if(angular.isNumber(t))return this.duScrollTo(t,this.duScrollTop(),n,r);var o=d(this);return a(o)?e.scrollX||document.documentElement.scrollLeft||document.body.scrollLeft:o.scrollLeft},c.duScrollTop=function(t,n,r){if(angular.isNumber(t))return this.duScrollTo(this.duScrollLeft(),t,n,r);var o=d(this);return a(o)?e.scrollY||document.documentElement.scrollTop||document.body.scrollTop:o.scrollTop},c.duScrollToElementAnimated=function(e,t,n,r){return this.duScrollToElement(e,t,n||l,r)},c.duScrollTopAnimated=function(e,t,n){return this.duScrollTop(e,t||l,n)},c.duScrollLeftAnimated=function(e,t,n){return this.duScrollLeft(e,t||l,n)},angular.forEach(c,function(e,t){angular.element.prototype[t]=e;var n=t.replace(/^duScroll/,"scroll");angular.isUndefined(angular.element.prototype[n])&&(angular.element.prototype[n]=e)})}]),angular.module("duScroll.polyfill",[]).factory("polyfill",["$window",function(e){"use strict";var t=["webkit","moz","o","ms"];return function(n,r){if(e[n])return e[n];for(var o,l=n.substr(0,1).toUpperCase()+n.substr(1),u=0;u<t.length;u++)if(o=t[u]+l,e[o])return e[o];return r}}]),angular.module("duScroll.requestAnimation",["duScroll.polyfill"]).factory("requestAnimation",["polyfill","$timeout",function(e,t){"use strict";var n=0,r=function(e,r){var o=(new Date).getTime(),l=Math.max(0,16-(o-n)),u=t(function(){e(o+l)},l);return n=o+l,u};return e("requestAnimationFrame",r)}]).factory("cancelAnimation",["polyfill","$timeout",function(e,t){"use strict";var n=function(e){t.cancel(e)};return e("cancelAnimationFrame",n)}]),angular.module("duScroll.spyAPI",["duScroll.scrollContainerAPI"]).factory("spyAPI",["$rootScope","$timeout","$interval","$window","$document","scrollContainerAPI","duScrollGreedy","duScrollSpyWait","duScrollSpyRefreshInterval","duScrollBottomSpy","duScrollActiveClass",function(e,t,n,r,o,l,u,i,c,a,s){"use strict";var d=function(n){var l=!1,c=!1,d=function(){c=!1;var t,l=n.container,i=l[0],d=0;if("undefined"!=typeof HTMLElement&&i instanceof HTMLElement||i.nodeType&&i.nodeType===i.ELEMENT_NODE)d=i.getBoundingClientRect().top,t=Math.round(i.scrollTop+i.clientHeight)>=i.scrollHeight;else{var f=o[0].body.scrollHeight||o[0].documentElement.scrollHeight;t=Math.round(r.pageYOffset+r.innerHeight)>=f}var m,p,S,g,v,h,y=a&&t?"bottom":"top";for(g=n.spies,p=n.currentlyActive,S=void 0,m=0;m<g.length;m++)v=g[m],h=v.getTargetPosition(),h&&v.$element&&(a&&t||h.top+v.offset-d<20&&(u||h.top*-1+d)<h.height)&&(!S||S[y]<h[y])&&(S={spy:v},S[y]=h[y]);S&&(S=S.spy),p===S||u&&!S||(p&&p.$element&&(p.$element.removeClass(s),e.$broadcast("duScrollspy:becameInactive",p.$element,angular.element(p.getTargetElement()))),S&&(S.$element.addClass(s),e.$broadcast("duScrollspy:becameActive",S.$element,angular.element(S.getTargetElement()))),n.currentlyActive=S)};return i?function(){l?c=!0:(d(),l=t(function(){l=!1,c&&d()},i,!1))}:d},f={},m=function(e){var t=e.$id,n={spies:[]};return n.handler=d(n),f[t]=n,e.$on("$destroy",function(){p(e)}),t},p=function(e){var t=e.$id,r=f[t],o=r.container;r.intervalPromise&&n.cancel(r.intervalPromise),o&&o.off("scroll",r.handler),delete f[t]},S=m(e),g=function(e){return f[e.$id]?f[e.$id]:e.$parent?g(e.$parent):f[S]},v=function(e){var t,n,r=e.$scope;if(r)return g(r);for(n in f)if(t=f[n],t.spies.indexOf(e)!==-1)return t},h=function(e){for(;e.parentNode;)if(e=e.parentNode,e===document)return!0;return!1},y=function(e){var t=v(e);t&&(t.spies.push(e),t.container&&h(t.container)||(t.container&&t.container.off("scroll",t.handler),t.container=l.getContainer(e.$scope),c&&!t.intervalPromise&&(t.intervalPromise=n(t.handler,c,0,!1)),t.container.on("scroll",t.handler).triggerHandler("scroll")))},$=function(t){var n=v(t);t===n.currentlyActive&&(e.$broadcast("duScrollspy:becameInactive",n.currentlyActive.$element),n.currentlyActive=null);var r=n.spies.indexOf(t);r!==-1&&n.spies.splice(r,1),t.$element=null};return{addSpy:y,removeSpy:$,createContext:m,destroyContext:p,getContextForScope:g}}]),angular.module("duScroll.scrollContainerAPI",[]).factory("scrollContainerAPI",["$document",function(e){"use strict";var t={},n=function(e,n){var r=e.$id;return t[r]=n,r},r=function(e){return t[e.$id]?e.$id:e.$parent?r(e.$parent):void 0},o=function(n){var o=r(n);return o?t[o]:e},l=function(e){var n=r(e);n&&delete t[n]};return{getContainerId:r,getContainer:o,setContainer:n,removeContainer:l}}]),angular.module("duScroll.smoothScroll",["duScroll.scrollHelpers","duScroll.scrollContainerAPI"]).directive("duSmoothScroll",["duScrollDuration","duScrollOffset","scrollContainerAPI",function(e,t,n){"use strict";return{link:function(r,o,l){o.on("click",function(o){if(l.href&&l.href.indexOf("#")!==-1||""!==l.duSmoothScroll){var u=l.href?l.href.replace(/.*(?=#[^\s]+$)/,"").substring(1):l.duSmoothScroll,i=document.getElementById(u)||document.getElementsByName(u)[0];if(i&&i.getBoundingClientRect){o.stopPropagation&&o.stopPropagation(),o.preventDefault&&o.preventDefault();var c=l.offset?parseInt(l.offset,10):t,a=l.duration?parseInt(l.duration,10):e,s=n.getContainer(r);s.duScrollToElement(angular.element(i),isNaN(c)?0:c,isNaN(a)?0:a)}}})}}}]),angular.module("duScroll.spyContext",["duScroll.spyAPI"]).directive("duSpyContext",["spyAPI",function(e){"use strict";return{restrict:"A",scope:!0,compile:function(t,n,r){return{pre:function(t,n,r,o){e.createContext(t)}}}}}]),angular.module("duScroll.scrollContainer",["duScroll.scrollContainerAPI"]).directive("duScrollContainer",["scrollContainerAPI",function(e){"use strict";return{restrict:"A",scope:!0,compile:function(t,n,r){return{pre:function(t,n,r,o){r.$observe("duScrollContainer",function(r){angular.isString(r)&&(r=document.getElementById(r)),r=angular.isElement(r)?angular.element(r):n,e.setContainer(t,r),t.$on("$destroy",function(){e.removeContainer(t)})})}}}}}]),angular.module("duScroll.scrollspy",["duScroll.spyAPI"]).directive("duScrollspy",["spyAPI","duScrollOffset","$timeout","$rootScope",function(e,t,n,r){"use strict";var o=function(e,t,n,r){angular.isElement(e)?this.target=e:angular.isString(e)&&(this.targetId=e),this.$scope=t,this.$element=n,this.offset=r};return o.prototype.getTargetElement=function(){return!this.target&&this.targetId&&(this.target=document.getElementById(this.targetId)||document.getElementsByName(this.targetId)[0]),this.target},o.prototype.getTargetPosition=function(){var e=this.getTargetElement();if(e)return e.getBoundingClientRect()},o.prototype.flushTargetCache=function(){this.targetId&&(this.target=void 0)},{link:function(l,u,i){var c,a=i.ngHref||i.href;if(a&&a.indexOf("#")!==-1?c=a.replace(/.*(?=#[^\s]+$)/,"").substring(1):i.duScrollspy?c=i.duScrollspy:i.duSmoothScroll&&(c=i.duSmoothScroll),c){var s=n(function(){var n=new o(c,l,u,(-(i.offset?parseInt(i.offset,10):t)));e.addSpy(n),l.$on("$locationChangeSuccess",n.flushTargetCache.bind(n));var a=r.$on("$stateChangeSuccess",n.flushTargetCache.bind(n));l.$on("$destroy",function(){e.removeSpy(n),a()})},0,!1);l.$on("$destroy",function(){n.cancel(s)})}}}}]);
//# sourceMappingURL=angular-scroll.min.js.map
;
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.moment=t()}(this,function(){"use strict";var e,i;function c(){return e.apply(null,arguments)}function o(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function u(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)}function l(e){return void 0===e}function h(e){return"number"==typeof e||"[object Number]"===Object.prototype.toString.call(e)}function d(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function f(e,t){var n,s=[];for(n=0;n<e.length;++n)s.push(t(e[n],n));return s}function m(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function _(e,t){for(var n in t)m(t,n)&&(e[n]=t[n]);return m(t,"toString")&&(e.toString=t.toString),m(t,"valueOf")&&(e.valueOf=t.valueOf),e}function y(e,t,n,s){return Tt(e,t,n,s,!0).utc()}function g(e){return null==e._pf&&(e._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null,rfc2822:!1,weekdayMismatch:!1}),e._pf}function v(e){if(null==e._isValid){var t=g(e),n=i.call(t.parsedDateParts,function(e){return null!=e}),s=!isNaN(e._d.getTime())&&t.overflow<0&&!t.empty&&!t.invalidMonth&&!t.invalidWeekday&&!t.weekdayMismatch&&!t.nullInput&&!t.invalidFormat&&!t.userInvalidated&&(!t.meridiem||t.meridiem&&n);if(e._strict&&(s=s&&0===t.charsLeftOver&&0===t.unusedTokens.length&&void 0===t.bigHour),null!=Object.isFrozen&&Object.isFrozen(e))return s;e._isValid=s}return e._isValid}function p(e){var t=y(NaN);return null!=e?_(g(t),e):g(t).userInvalidated=!0,t}i=Array.prototype.some?Array.prototype.some:function(e){for(var t=Object(this),n=t.length>>>0,s=0;s<n;s++)if(s in t&&e.call(this,t[s],s,t))return!0;return!1};var r=c.momentProperties=[];function w(e,t){var n,s,i;if(l(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),l(t._i)||(e._i=t._i),l(t._f)||(e._f=t._f),l(t._l)||(e._l=t._l),l(t._strict)||(e._strict=t._strict),l(t._tzm)||(e._tzm=t._tzm),l(t._isUTC)||(e._isUTC=t._isUTC),l(t._offset)||(e._offset=t._offset),l(t._pf)||(e._pf=g(t)),l(t._locale)||(e._locale=t._locale),0<r.length)for(n=0;n<r.length;n++)l(i=t[s=r[n]])||(e[s]=i);return e}var t=!1;function M(e){w(this,e),this._d=new Date(null!=e._d?e._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),!1===t&&(t=!0,c.updateOffset(this),t=!1)}function k(e){return e instanceof M||null!=e&&null!=e._isAMomentObject}function S(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function D(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=S(t)),n}function a(e,t,n){var s,i=Math.min(e.length,t.length),r=Math.abs(e.length-t.length),a=0;for(s=0;s<i;s++)(n&&e[s]!==t[s]||!n&&D(e[s])!==D(t[s]))&&a++;return a+r}function Y(e){!1===c.suppressDeprecationWarnings&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+e)}function n(i,r){var a=!0;return _(function(){if(null!=c.deprecationHandler&&c.deprecationHandler(null,i),a){for(var e,t=[],n=0;n<arguments.length;n++){if(e="","object"==typeof arguments[n]){for(var s in e+="\n["+n+"] ",arguments[0])e+=s+": "+arguments[0][s]+", ";e=e.slice(0,-2)}else e=arguments[n];t.push(e)}Y(i+"\nArguments: "+Array.prototype.slice.call(t).join("")+"\n"+(new Error).stack),a=!1}return r.apply(this,arguments)},r)}var s,O={};function T(e,t){null!=c.deprecationHandler&&c.deprecationHandler(e,t),O[e]||(Y(t),O[e]=!0)}function b(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function x(e,t){var n,s=_({},e);for(n in t)m(t,n)&&(u(e[n])&&u(t[n])?(s[n]={},_(s[n],e[n]),_(s[n],t[n])):null!=t[n]?s[n]=t[n]:delete s[n]);for(n in e)m(e,n)&&!m(t,n)&&u(e[n])&&(s[n]=_({},s[n]));return s}function P(e){null!=e&&this.set(e)}c.suppressDeprecationWarnings=!1,c.deprecationHandler=null,s=Object.keys?Object.keys:function(e){var t,n=[];for(t in e)m(e,t)&&n.push(t);return n};var W={};function C(e,t){var n=e.toLowerCase();W[n]=W[n+"s"]=W[t]=e}function H(e){return"string"==typeof e?W[e]||W[e.toLowerCase()]:void 0}function R(e){var t,n,s={};for(n in e)m(e,n)&&(t=H(n))&&(s[t]=e[n]);return s}var U={};function F(e,t){U[e]=t}function L(e,t,n){var s=""+Math.abs(e),i=t-s.length;return(0<=e?n?"+":"":"-")+Math.pow(10,Math.max(0,i)).toString().substr(1)+s}var N=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,G=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,V={},E={};function I(e,t,n,s){var i=s;"string"==typeof s&&(i=function(){return this[s]()}),e&&(E[e]=i),t&&(E[t[0]]=function(){return L(i.apply(this,arguments),t[1],t[2])}),n&&(E[n]=function(){return this.localeData().ordinal(i.apply(this,arguments),e)})}function A(e,t){return e.isValid()?(t=j(t,e.localeData()),V[t]=V[t]||function(s){var e,i,t,r=s.match(N);for(e=0,i=r.length;e<i;e++)E[r[e]]?r[e]=E[r[e]]:r[e]=(t=r[e]).match(/\[[\s\S]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"");return function(e){var t,n="";for(t=0;t<i;t++)n+=b(r[t])?r[t].call(e,s):r[t];return n}}(t),V[t](e)):e.localeData().invalidDate()}function j(e,t){var n=5;function s(e){return t.longDateFormat(e)||e}for(G.lastIndex=0;0<=n&&G.test(e);)e=e.replace(G,s),G.lastIndex=0,n-=1;return e}var Z=/\d/,z=/\d\d/,$=/\d{3}/,q=/\d{4}/,J=/[+-]?\d{6}/,B=/\d\d?/,Q=/\d\d\d\d?/,X=/\d\d\d\d\d\d?/,K=/\d{1,3}/,ee=/\d{1,4}/,te=/[+-]?\d{1,6}/,ne=/\d+/,se=/[+-]?\d+/,ie=/Z|[+-]\d\d:?\d\d/gi,re=/Z|[+-]\d\d(?::?\d\d)?/gi,ae=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,oe={};function ue(e,n,s){oe[e]=b(n)?n:function(e,t){return e&&s?s:n}}function le(e,t){return m(oe,e)?oe[e](t._strict,t._locale):new RegExp(he(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,s,i){return t||n||s||i})))}function he(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var de={};function ce(e,n){var t,s=n;for("string"==typeof e&&(e=[e]),h(n)&&(s=function(e,t){t[n]=D(e)}),t=0;t<e.length;t++)de[e[t]]=s}function fe(e,i){ce(e,function(e,t,n,s){n._w=n._w||{},i(e,n._w,n,s)})}var me=0,_e=1,ye=2,ge=3,ve=4,pe=5,we=6,Me=7,ke=8;function Se(e){return De(e)?366:365}function De(e){return e%4==0&&e%100!=0||e%400==0}I("Y",0,0,function(){var e=this.year();return e<=9999?""+e:"+"+e}),I(0,["YY",2],0,function(){return this.year()%100}),I(0,["YYYY",4],0,"year"),I(0,["YYYYY",5],0,"year"),I(0,["YYYYYY",6,!0],0,"year"),C("year","y"),F("year",1),ue("Y",se),ue("YY",B,z),ue("YYYY",ee,q),ue("YYYYY",te,J),ue("YYYYYY",te,J),ce(["YYYYY","YYYYYY"],me),ce("YYYY",function(e,t){t[me]=2===e.length?c.parseTwoDigitYear(e):D(e)}),ce("YY",function(e,t){t[me]=c.parseTwoDigitYear(e)}),ce("Y",function(e,t){t[me]=parseInt(e,10)}),c.parseTwoDigitYear=function(e){return D(e)+(68<D(e)?1900:2e3)};var Ye,Oe=Te("FullYear",!0);function Te(t,n){return function(e){return null!=e?(xe(this,t,e),c.updateOffset(this,n),this):be(this,t)}}function be(e,t){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+t]():NaN}function xe(e,t,n){e.isValid()&&!isNaN(n)&&("FullYear"===t&&De(e.year())&&1===e.month()&&29===e.date()?e._d["set"+(e._isUTC?"UTC":"")+t](n,e.month(),Pe(n,e.month())):e._d["set"+(e._isUTC?"UTC":"")+t](n))}function Pe(e,t){if(isNaN(e)||isNaN(t))return NaN;var n,s=(t%(n=12)+n)%n;return e+=(t-s)/12,1===s?De(e)?29:28:31-s%7%2}Ye=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var t;for(t=0;t<this.length;++t)if(this[t]===e)return t;return-1},I("M",["MM",2],"Mo",function(){return this.month()+1}),I("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),I("MMMM",0,0,function(e){return this.localeData().months(this,e)}),C("month","M"),F("month",8),ue("M",B),ue("MM",B,z),ue("MMM",function(e,t){return t.monthsShortRegex(e)}),ue("MMMM",function(e,t){return t.monthsRegex(e)}),ce(["M","MM"],function(e,t){t[_e]=D(e)-1}),ce(["MMM","MMMM"],function(e,t,n,s){var i=n._locale.monthsParse(e,s,n._strict);null!=i?t[_e]=i:g(n).invalidMonth=e});var We=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,Ce="January_February_March_April_May_June_July_August_September_October_November_December".split("_");var He="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");function Re(e,t){var n;if(!e.isValid())return e;if("string"==typeof t)if(/^\d+$/.test(t))t=D(t);else if(!h(t=e.localeData().monthsParse(t)))return e;return n=Math.min(e.date(),Pe(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e}function Ue(e){return null!=e?(Re(this,e),c.updateOffset(this,!0),this):be(this,"Month")}var Fe=ae;var Le=ae;function Ne(){function e(e,t){return t.length-e.length}var t,n,s=[],i=[],r=[];for(t=0;t<12;t++)n=y([2e3,t]),s.push(this.monthsShort(n,"")),i.push(this.months(n,"")),r.push(this.months(n,"")),r.push(this.monthsShort(n,""));for(s.sort(e),i.sort(e),r.sort(e),t=0;t<12;t++)s[t]=he(s[t]),i[t]=he(i[t]);for(t=0;t<24;t++)r[t]=he(r[t]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+s.join("|")+")","i")}function Ge(e){var t;if(e<100&&0<=e){var n=Array.prototype.slice.call(arguments);n[0]=e+400,t=new Date(Date.UTC.apply(null,n)),isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e)}else t=new Date(Date.UTC.apply(null,arguments));return t}function Ve(e,t,n){var s=7+t-n;return-((7+Ge(e,0,s).getUTCDay()-t)%7)+s-1}function Ee(e,t,n,s,i){var r,a,o=1+7*(t-1)+(7+n-s)%7+Ve(e,s,i);return a=o<=0?Se(r=e-1)+o:o>Se(e)?(r=e+1,o-Se(e)):(r=e,o),{year:r,dayOfYear:a}}function Ie(e,t,n){var s,i,r=Ve(e.year(),t,n),a=Math.floor((e.dayOfYear()-r-1)/7)+1;return a<1?s=a+Ae(i=e.year()-1,t,n):a>Ae(e.year(),t,n)?(s=a-Ae(e.year(),t,n),i=e.year()+1):(i=e.year(),s=a),{week:s,year:i}}function Ae(e,t,n){var s=Ve(e,t,n),i=Ve(e+1,t,n);return(Se(e)-s+i)/7}I("w",["ww",2],"wo","week"),I("W",["WW",2],"Wo","isoWeek"),C("week","w"),C("isoWeek","W"),F("week",5),F("isoWeek",5),ue("w",B),ue("ww",B,z),ue("W",B),ue("WW",B,z),fe(["w","ww","W","WW"],function(e,t,n,s){t[s.substr(0,1)]=D(e)});function je(e,t){return e.slice(t,7).concat(e.slice(0,t))}I("d",0,"do","day"),I("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),I("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),I("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),I("e",0,0,"weekday"),I("E",0,0,"isoWeekday"),C("day","d"),C("weekday","e"),C("isoWeekday","E"),F("day",11),F("weekday",11),F("isoWeekday",11),ue("d",B),ue("e",B),ue("E",B),ue("dd",function(e,t){return t.weekdaysMinRegex(e)}),ue("ddd",function(e,t){return t.weekdaysShortRegex(e)}),ue("dddd",function(e,t){return t.weekdaysRegex(e)}),fe(["dd","ddd","dddd"],function(e,t,n,s){var i=n._locale.weekdaysParse(e,s,n._strict);null!=i?t.d=i:g(n).invalidWeekday=e}),fe(["d","e","E"],function(e,t,n,s){t[s]=D(e)});var Ze="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");var ze="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");var $e="Su_Mo_Tu_We_Th_Fr_Sa".split("_");var qe=ae;var Je=ae;var Be=ae;function Qe(){function e(e,t){return t.length-e.length}var t,n,s,i,r,a=[],o=[],u=[],l=[];for(t=0;t<7;t++)n=y([2e3,1]).day(t),s=this.weekdaysMin(n,""),i=this.weekdaysShort(n,""),r=this.weekdays(n,""),a.push(s),o.push(i),u.push(r),l.push(s),l.push(i),l.push(r);for(a.sort(e),o.sort(e),u.sort(e),l.sort(e),t=0;t<7;t++)o[t]=he(o[t]),u[t]=he(u[t]),l[t]=he(l[t]);this._weekdaysRegex=new RegExp("^("+l.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+u.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+o.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+a.join("|")+")","i")}function Xe(){return this.hours()%12||12}function Ke(e,t){I(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function et(e,t){return t._meridiemParse}I("H",["HH",2],0,"hour"),I("h",["hh",2],0,Xe),I("k",["kk",2],0,function(){return this.hours()||24}),I("hmm",0,0,function(){return""+Xe.apply(this)+L(this.minutes(),2)}),I("hmmss",0,0,function(){return""+Xe.apply(this)+L(this.minutes(),2)+L(this.seconds(),2)}),I("Hmm",0,0,function(){return""+this.hours()+L(this.minutes(),2)}),I("Hmmss",0,0,function(){return""+this.hours()+L(this.minutes(),2)+L(this.seconds(),2)}),Ke("a",!0),Ke("A",!1),C("hour","h"),F("hour",13),ue("a",et),ue("A",et),ue("H",B),ue("h",B),ue("k",B),ue("HH",B,z),ue("hh",B,z),ue("kk",B,z),ue("hmm",Q),ue("hmmss",X),ue("Hmm",Q),ue("Hmmss",X),ce(["H","HH"],ge),ce(["k","kk"],function(e,t,n){var s=D(e);t[ge]=24===s?0:s}),ce(["a","A"],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e}),ce(["h","hh"],function(e,t,n){t[ge]=D(e),g(n).bigHour=!0}),ce("hmm",function(e,t,n){var s=e.length-2;t[ge]=D(e.substr(0,s)),t[ve]=D(e.substr(s)),g(n).bigHour=!0}),ce("hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[ge]=D(e.substr(0,s)),t[ve]=D(e.substr(s,2)),t[pe]=D(e.substr(i)),g(n).bigHour=!0}),ce("Hmm",function(e,t,n){var s=e.length-2;t[ge]=D(e.substr(0,s)),t[ve]=D(e.substr(s))}),ce("Hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[ge]=D(e.substr(0,s)),t[ve]=D(e.substr(s,2)),t[pe]=D(e.substr(i))});var tt,nt=Te("Hours",!0),st={calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},invalidDate:"Invalid date",ordinal:"%d",dayOfMonthOrdinalParse:/\d{1,2}/,relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},months:Ce,monthsShort:He,week:{dow:0,doy:6},weekdays:Ze,weekdaysMin:$e,weekdaysShort:ze,meridiemParse:/[ap]\.?m?\.?/i},it={},rt={};function at(e){return e?e.toLowerCase().replace("_","-"):e}function ot(e){var t=null;if(!it[e]&&"undefined"!=typeof module&&module&&module.exports)try{t=tt._abbr,require("./locale/"+e),ut(t)}catch(e){}return it[e]}function ut(e,t){var n;return e&&((n=l(t)?ht(e):lt(e,t))?tt=n:"undefined"!=typeof console&&console.warn&&console.warn("Locale "+e+" not found. Did you forget to load it?")),tt._abbr}function lt(e,t){if(null===t)return delete it[e],null;var n,s=st;if(t.abbr=e,null!=it[e])T("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),s=it[e]._config;else if(null!=t.parentLocale)if(null!=it[t.parentLocale])s=it[t.parentLocale]._config;else{if(null==(n=ot(t.parentLocale)))return rt[t.parentLocale]||(rt[t.parentLocale]=[]),rt[t.parentLocale].push({name:e,config:t}),null;s=n._config}return it[e]=new P(x(s,t)),rt[e]&&rt[e].forEach(function(e){lt(e.name,e.config)}),ut(e),it[e]}function ht(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return tt;if(!o(e)){if(t=ot(e))return t;e=[e]}return function(e){for(var t,n,s,i,r=0;r<e.length;){for(t=(i=at(e[r]).split("-")).length,n=(n=at(e[r+1]))?n.split("-"):null;0<t;){if(s=ot(i.slice(0,t).join("-")))return s;if(n&&n.length>=t&&a(i,n,!0)>=t-1)break;t--}r++}return tt}(e)}function dt(e){var t,n=e._a;return n&&-2===g(e).overflow&&(t=n[_e]<0||11<n[_e]?_e:n[ye]<1||n[ye]>Pe(n[me],n[_e])?ye:n[ge]<0||24<n[ge]||24===n[ge]&&(0!==n[ve]||0!==n[pe]||0!==n[we])?ge:n[ve]<0||59<n[ve]?ve:n[pe]<0||59<n[pe]?pe:n[we]<0||999<n[we]?we:-1,g(e)._overflowDayOfYear&&(t<me||ye<t)&&(t=ye),g(e)._overflowWeeks&&-1===t&&(t=Me),g(e)._overflowWeekday&&-1===t&&(t=ke),g(e).overflow=t),e}function ct(e,t,n){return null!=e?e:null!=t?t:n}function ft(e){var t,n,s,i,r,a=[];if(!e._d){var o,u;for(o=e,u=new Date(c.now()),s=o._useUTC?[u.getUTCFullYear(),u.getUTCMonth(),u.getUTCDate()]:[u.getFullYear(),u.getMonth(),u.getDate()],e._w&&null==e._a[ye]&&null==e._a[_e]&&function(e){var t,n,s,i,r,a,o,u;if(null!=(t=e._w).GG||null!=t.W||null!=t.E)r=1,a=4,n=ct(t.GG,e._a[me],Ie(bt(),1,4).year),s=ct(t.W,1),((i=ct(t.E,1))<1||7<i)&&(u=!0);else{r=e._locale._week.dow,a=e._locale._week.doy;var l=Ie(bt(),r,a);n=ct(t.gg,e._a[me],l.year),s=ct(t.w,l.week),null!=t.d?((i=t.d)<0||6<i)&&(u=!0):null!=t.e?(i=t.e+r,(t.e<0||6<t.e)&&(u=!0)):i=r}s<1||s>Ae(n,r,a)?g(e)._overflowWeeks=!0:null!=u?g(e)._overflowWeekday=!0:(o=Ee(n,s,i,r,a),e._a[me]=o.year,e._dayOfYear=o.dayOfYear)}(e),null!=e._dayOfYear&&(r=ct(e._a[me],s[me]),(e._dayOfYear>Se(r)||0===e._dayOfYear)&&(g(e)._overflowDayOfYear=!0),n=Ge(r,0,e._dayOfYear),e._a[_e]=n.getUTCMonth(),e._a[ye]=n.getUTCDate()),t=0;t<3&&null==e._a[t];++t)e._a[t]=a[t]=s[t];for(;t<7;t++)e._a[t]=a[t]=null==e._a[t]?2===t?1:0:e._a[t];24===e._a[ge]&&0===e._a[ve]&&0===e._a[pe]&&0===e._a[we]&&(e._nextDay=!0,e._a[ge]=0),e._d=(e._useUTC?Ge:function(e,t,n,s,i,r,a){var o;return e<100&&0<=e?(o=new Date(e+400,t,n,s,i,r,a),isFinite(o.getFullYear())&&o.setFullYear(e)):o=new Date(e,t,n,s,i,r,a),o}).apply(null,a),i=e._useUTC?e._d.getUTCDay():e._d.getDay(),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[ge]=24),e._w&&void 0!==e._w.d&&e._w.d!==i&&(g(e).weekdayMismatch=!0)}}var mt=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,_t=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,yt=/Z|[+-]\d\d(?::?\d\d)?/,gt=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],vt=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],pt=/^\/?Date\((\-?\d+)/i;function wt(e){var t,n,s,i,r,a,o=e._i,u=mt.exec(o)||_t.exec(o);if(u){for(g(e).iso=!0,t=0,n=gt.length;t<n;t++)if(gt[t][1].exec(u[1])){i=gt[t][0],s=!1!==gt[t][2];break}if(null==i)return void(e._isValid=!1);if(u[3]){for(t=0,n=vt.length;t<n;t++)if(vt[t][1].exec(u[3])){r=(u[2]||" ")+vt[t][0];break}if(null==r)return void(e._isValid=!1)}if(!s&&null!=r)return void(e._isValid=!1);if(u[4]){if(!yt.exec(u[4]))return void(e._isValid=!1);a="Z"}e._f=i+(r||"")+(a||""),Yt(e)}else e._isValid=!1}var Mt=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;function kt(e,t,n,s,i,r){var a=[function(e){var t=parseInt(e,10);{if(t<=49)return 2e3+t;if(t<=999)return 1900+t}return t}(e),He.indexOf(t),parseInt(n,10),parseInt(s,10),parseInt(i,10)];return r&&a.push(parseInt(r,10)),a}var St={UT:0,GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function Dt(e){var t,n,s,i=Mt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").replace(/^\s\s*/,"").replace(/\s\s*$/,""));if(i){var r=kt(i[4],i[3],i[2],i[5],i[6],i[7]);if(t=i[1],n=r,s=e,t&&ze.indexOf(t)!==new Date(n[0],n[1],n[2]).getDay()&&(g(s).weekdayMismatch=!0,!(s._isValid=!1)))return;e._a=r,e._tzm=function(e,t,n){if(e)return St[e];if(t)return 0;var s=parseInt(n,10),i=s%100;return(s-i)/100*60+i}(i[8],i[9],i[10]),e._d=Ge.apply(null,e._a),e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),g(e).rfc2822=!0}else e._isValid=!1}function Yt(e){if(e._f!==c.ISO_8601)if(e._f!==c.RFC_2822){e._a=[],g(e).empty=!0;var t,n,s,i,r,a,o,u,l=""+e._i,h=l.length,d=0;for(s=j(e._f,e._locale).match(N)||[],t=0;t<s.length;t++)i=s[t],(n=(l.match(le(i,e))||[])[0])&&(0<(r=l.substr(0,l.indexOf(n))).length&&g(e).unusedInput.push(r),l=l.slice(l.indexOf(n)+n.length),d+=n.length),E[i]?(n?g(e).empty=!1:g(e).unusedTokens.push(i),a=i,u=e,null!=(o=n)&&m(de,a)&&de[a](o,u._a,u,a)):e._strict&&!n&&g(e).unusedTokens.push(i);g(e).charsLeftOver=h-d,0<l.length&&g(e).unusedInput.push(l),e._a[ge]<=12&&!0===g(e).bigHour&&0<e._a[ge]&&(g(e).bigHour=void 0),g(e).parsedDateParts=e._a.slice(0),g(e).meridiem=e._meridiem,e._a[ge]=function(e,t,n){var s;if(null==n)return t;return null!=e.meridiemHour?e.meridiemHour(t,n):(null!=e.isPM&&((s=e.isPM(n))&&t<12&&(t+=12),s||12!==t||(t=0)),t)}(e._locale,e._a[ge],e._meridiem),ft(e),dt(e)}else Dt(e);else wt(e)}function Ot(e){var t,n,s,i,r=e._i,a=e._f;return e._locale=e._locale||ht(e._l),null===r||void 0===a&&""===r?p({nullInput:!0}):("string"==typeof r&&(e._i=r=e._locale.preparse(r)),k(r)?new M(dt(r)):(d(r)?e._d=r:o(a)?function(e){var t,n,s,i,r;if(0===e._f.length)return g(e).invalidFormat=!0,e._d=new Date(NaN);for(i=0;i<e._f.length;i++)r=0,t=w({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[i],Yt(t),v(t)&&(r+=g(t).charsLeftOver,r+=10*g(t).unusedTokens.length,g(t).score=r,(null==s||r<s)&&(s=r,n=t));_(e,n||t)}(e):a?Yt(e):l(n=(t=e)._i)?t._d=new Date(c.now()):d(n)?t._d=new Date(n.valueOf()):"string"==typeof n?(s=t,null===(i=pt.exec(s._i))?(wt(s),!1===s._isValid&&(delete s._isValid,Dt(s),!1===s._isValid&&(delete s._isValid,c.createFromInputFallback(s)))):s._d=new Date(+i[1])):o(n)?(t._a=f(n.slice(0),function(e){return parseInt(e,10)}),ft(t)):u(n)?function(e){if(!e._d){var t=R(e._i);e._a=f([t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],function(e){return e&&parseInt(e,10)}),ft(e)}}(t):h(n)?t._d=new Date(n):c.createFromInputFallback(t),v(e)||(e._d=null),e))}function Tt(e,t,n,s,i){var r,a={};return!0!==n&&!1!==n||(s=n,n=void 0),(u(e)&&function(e){if(Object.getOwnPropertyNames)return 0===Object.getOwnPropertyNames(e).length;var t;for(t in e)if(e.hasOwnProperty(t))return!1;return!0}(e)||o(e)&&0===e.length)&&(e=void 0),a._isAMomentObject=!0,a._useUTC=a._isUTC=i,a._l=n,a._i=e,a._f=t,a._strict=s,(r=new M(dt(Ot(a))))._nextDay&&(r.add(1,"d"),r._nextDay=void 0),r}function bt(e,t,n,s){return Tt(e,t,n,s,!1)}c.createFromInputFallback=n("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),c.ISO_8601=function(){},c.RFC_2822=function(){};var xt=n("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=bt.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:p()}),Pt=n("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=bt.apply(null,arguments);return this.isValid()&&e.isValid()?this<e?this:e:p()});function Wt(e,t){var n,s;if(1===t.length&&o(t[0])&&(t=t[0]),!t.length)return bt();for(n=t[0],s=1;s<t.length;++s)t[s].isValid()&&!t[s][e](n)||(n=t[s]);return n}var Ct=["year","quarter","month","week","day","hour","minute","second","millisecond"];function Ht(e){var t=R(e),n=t.year||0,s=t.quarter||0,i=t.month||0,r=t.week||t.isoWeek||0,a=t.day||0,o=t.hour||0,u=t.minute||0,l=t.second||0,h=t.millisecond||0;this._isValid=function(e){for(var t in e)if(-1===Ye.call(Ct,t)||null!=e[t]&&isNaN(e[t]))return!1;for(var n=!1,s=0;s<Ct.length;++s)if(e[Ct[s]]){if(n)return!1;parseFloat(e[Ct[s]])!==D(e[Ct[s]])&&(n=!0)}return!0}(t),this._milliseconds=+h+1e3*l+6e4*u+1e3*o*60*60,this._days=+a+7*r,this._months=+i+3*s+12*n,this._data={},this._locale=ht(),this._bubble()}function Rt(e){return e instanceof Ht}function Ut(e){return e<0?-1*Math.round(-1*e):Math.round(e)}function Ft(e,n){I(e,0,0,function(){var e=this.utcOffset(),t="+";return e<0&&(e=-e,t="-"),t+L(~~(e/60),2)+n+L(~~e%60,2)})}Ft("Z",":"),Ft("ZZ",""),ue("Z",re),ue("ZZ",re),ce(["Z","ZZ"],function(e,t,n){n._useUTC=!0,n._tzm=Nt(re,e)});var Lt=/([\+\-]|\d\d)/gi;function Nt(e,t){var n=(t||"").match(e);if(null===n)return null;var s=((n[n.length-1]||[])+"").match(Lt)||["-",0,0],i=60*s[1]+D(s[2]);return 0===i?0:"+"===s[0]?i:-i}function Gt(e,t){var n,s;return t._isUTC?(n=t.clone(),s=(k(e)||d(e)?e.valueOf():bt(e).valueOf())-n.valueOf(),n._d.setTime(n._d.valueOf()+s),c.updateOffset(n,!1),n):bt(e).local()}function Vt(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function Et(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}c.updateOffset=function(){};var It=/^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,At=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function jt(e,t){var n,s,i,r=e,a=null;return Rt(e)?r={ms:e._milliseconds,d:e._days,M:e._months}:h(e)?(r={},t?r[t]=e:r.milliseconds=e):(a=It.exec(e))?(n="-"===a[1]?-1:1,r={y:0,d:D(a[ye])*n,h:D(a[ge])*n,m:D(a[ve])*n,s:D(a[pe])*n,ms:D(Ut(1e3*a[we]))*n}):(a=At.exec(e))?(n="-"===a[1]?-1:1,r={y:Zt(a[2],n),M:Zt(a[3],n),w:Zt(a[4],n),d:Zt(a[5],n),h:Zt(a[6],n),m:Zt(a[7],n),s:Zt(a[8],n)}):null==r?r={}:"object"==typeof r&&("from"in r||"to"in r)&&(i=function(e,t){var n;if(!e.isValid()||!t.isValid())return{milliseconds:0,months:0};t=Gt(t,e),e.isBefore(t)?n=zt(e,t):((n=zt(t,e)).milliseconds=-n.milliseconds,n.months=-n.months);return n}(bt(r.from),bt(r.to)),(r={}).ms=i.milliseconds,r.M=i.months),s=new Ht(r),Rt(e)&&m(e,"_locale")&&(s._locale=e._locale),s}function Zt(e,t){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t}function zt(e,t){var n={};return n.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=+t-+e.clone().add(n.months,"M"),n}function $t(s,i){return function(e,t){var n;return null===t||isNaN(+t)||(T(i,"moment()."+i+"(period, number) is deprecated. Please use moment()."+i+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),n=e,e=t,t=n),qt(this,jt(e="string"==typeof e?+e:e,t),s),this}}function qt(e,t,n,s){var i=t._milliseconds,r=Ut(t._days),a=Ut(t._months);e.isValid()&&(s=null==s||s,a&&Re(e,be(e,"Month")+a*n),r&&xe(e,"Date",be(e,"Date")+r*n),i&&e._d.setTime(e._d.valueOf()+i*n),s&&c.updateOffset(e,r||a))}jt.fn=Ht.prototype,jt.invalid=function(){return jt(NaN)};var Jt=$t(1,"add"),Bt=$t(-1,"subtract");function Qt(e,t){var n=12*(t.year()-e.year())+(t.month()-e.month()),s=e.clone().add(n,"months");return-(n+(t-s<0?(t-s)/(s-e.clone().add(n-1,"months")):(t-s)/(e.clone().add(n+1,"months")-s)))||0}function Xt(e){var t;return void 0===e?this._locale._abbr:(null!=(t=ht(e))&&(this._locale=t),this)}c.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",c.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Kt=n("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});function en(){return this._locale}var tn=126227808e5;function nn(e,t){return(e%t+t)%t}function sn(e,t,n){return e<100&&0<=e?new Date(e+400,t,n)-tn:new Date(e,t,n).valueOf()}function rn(e,t,n){return e<100&&0<=e?Date.UTC(e+400,t,n)-tn:Date.UTC(e,t,n)}function an(e,t){I(0,[e,e.length],0,t)}function on(e,t,n,s,i){var r;return null==e?Ie(this,s,i).year:((r=Ae(e,s,i))<t&&(t=r),function(e,t,n,s,i){var r=Ee(e,t,n,s,i),a=Ge(r.year,0,r.dayOfYear);return this.year(a.getUTCFullYear()),this.month(a.getUTCMonth()),this.date(a.getUTCDate()),this}.call(this,e,t,n,s,i))}I(0,["gg",2],0,function(){return this.weekYear()%100}),I(0,["GG",2],0,function(){return this.isoWeekYear()%100}),an("gggg","weekYear"),an("ggggg","weekYear"),an("GGGG","isoWeekYear"),an("GGGGG","isoWeekYear"),C("weekYear","gg"),C("isoWeekYear","GG"),F("weekYear",1),F("isoWeekYear",1),ue("G",se),ue("g",se),ue("GG",B,z),ue("gg",B,z),ue("GGGG",ee,q),ue("gggg",ee,q),ue("GGGGG",te,J),ue("ggggg",te,J),fe(["gggg","ggggg","GGGG","GGGGG"],function(e,t,n,s){t[s.substr(0,2)]=D(e)}),fe(["gg","GG"],function(e,t,n,s){t[s]=c.parseTwoDigitYear(e)}),I("Q",0,"Qo","quarter"),C("quarter","Q"),F("quarter",7),ue("Q",Z),ce("Q",function(e,t){t[_e]=3*(D(e)-1)}),I("D",["DD",2],"Do","date"),C("date","D"),F("date",9),ue("D",B),ue("DD",B,z),ue("Do",function(e,t){return e?t._dayOfMonthOrdinalParse||t._ordinalParse:t._dayOfMonthOrdinalParseLenient}),ce(["D","DD"],ye),ce("Do",function(e,t){t[ye]=D(e.match(B)[0])});var un=Te("Date",!0);I("DDD",["DDDD",3],"DDDo","dayOfYear"),C("dayOfYear","DDD"),F("dayOfYear",4),ue("DDD",K),ue("DDDD",$),ce(["DDD","DDDD"],function(e,t,n){n._dayOfYear=D(e)}),I("m",["mm",2],0,"minute"),C("minute","m"),F("minute",14),ue("m",B),ue("mm",B,z),ce(["m","mm"],ve);var ln=Te("Minutes",!1);I("s",["ss",2],0,"second"),C("second","s"),F("second",15),ue("s",B),ue("ss",B,z),ce(["s","ss"],pe);var hn,dn=Te("Seconds",!1);for(I("S",0,0,function(){return~~(this.millisecond()/100)}),I(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),I(0,["SSS",3],0,"millisecond"),I(0,["SSSS",4],0,function(){return 10*this.millisecond()}),I(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),I(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),I(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),I(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),I(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),C("millisecond","ms"),F("millisecond",16),ue("S",K,Z),ue("SS",K,z),ue("SSS",K,$),hn="SSSS";hn.length<=9;hn+="S")ue(hn,ne);function cn(e,t){t[we]=D(1e3*("0."+e))}for(hn="S";hn.length<=9;hn+="S")ce(hn,cn);var fn=Te("Milliseconds",!1);I("z",0,0,"zoneAbbr"),I("zz",0,0,"zoneName");var mn=M.prototype;function _n(e){return e}mn.add=Jt,mn.calendar=function(e,t){var n=e||bt(),s=Gt(n,this).startOf("day"),i=c.calendarFormat(this,s)||"sameElse",r=t&&(b(t[i])?t[i].call(this,n):t[i]);return this.format(r||this.localeData().calendar(i,this,bt(n)))},mn.clone=function(){return new M(this)},mn.diff=function(e,t,n){var s,i,r;if(!this.isValid())return NaN;if(!(s=Gt(e,this)).isValid())return NaN;switch(i=6e4*(s.utcOffset()-this.utcOffset()),t=H(t)){case"year":r=Qt(this,s)/12;break;case"month":r=Qt(this,s);break;case"quarter":r=Qt(this,s)/3;break;case"second":r=(this-s)/1e3;break;case"minute":r=(this-s)/6e4;break;case"hour":r=(this-s)/36e5;break;case"day":r=(this-s-i)/864e5;break;case"week":r=(this-s-i)/6048e5;break;default:r=this-s}return n?r:S(r)},mn.endOf=function(e){var t;if(void 0===(e=H(e))||"millisecond"===e||!this.isValid())return this;var n=this._isUTC?rn:sn;switch(e){case"year":t=n(this.year()+1,0,1)-1;break;case"quarter":t=n(this.year(),this.month()-this.month()%3+3,1)-1;break;case"month":t=n(this.year(),this.month()+1,1)-1;break;case"week":t=n(this.year(),this.month(),this.date()-this.weekday()+7)-1;break;case"isoWeek":t=n(this.year(),this.month(),this.date()-(this.isoWeekday()-1)+7)-1;break;case"day":case"date":t=n(this.year(),this.month(),this.date()+1)-1;break;case"hour":t=this._d.valueOf(),t+=36e5-nn(t+(this._isUTC?0:6e4*this.utcOffset()),36e5)-1;break;case"minute":t=this._d.valueOf(),t+=6e4-nn(t,6e4)-1;break;case"second":t=this._d.valueOf(),t+=1e3-nn(t,1e3)-1;break}return this._d.setTime(t),c.updateOffset(this,!0),this},mn.format=function(e){e||(e=this.isUtc()?c.defaultFormatUtc:c.defaultFormat);var t=A(this,e);return this.localeData().postformat(t)},mn.from=function(e,t){return this.isValid()&&(k(e)&&e.isValid()||bt(e).isValid())?jt({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},mn.fromNow=function(e){return this.from(bt(),e)},mn.to=function(e,t){return this.isValid()&&(k(e)&&e.isValid()||bt(e).isValid())?jt({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},mn.toNow=function(e){return this.to(bt(),e)},mn.get=function(e){return b(this[e=H(e)])?this[e]():this},mn.invalidAt=function(){return g(this).overflow},mn.isAfter=function(e,t){var n=k(e)?e:bt(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=H(t)||"millisecond")?this.valueOf()>n.valueOf():n.valueOf()<this.clone().startOf(t).valueOf())},mn.isBefore=function(e,t){var n=k(e)?e:bt(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=H(t)||"millisecond")?this.valueOf()<n.valueOf():this.clone().endOf(t).valueOf()<n.valueOf())},mn.isBetween=function(e,t,n,s){var i=k(e)?e:bt(e),r=k(t)?t:bt(t);return!!(this.isValid()&&i.isValid()&&r.isValid())&&("("===(s=s||"()")[0]?this.isAfter(i,n):!this.isBefore(i,n))&&(")"===s[1]?this.isBefore(r,n):!this.isAfter(r,n))},mn.isSame=function(e,t){var n,s=k(e)?e:bt(e);return!(!this.isValid()||!s.isValid())&&("millisecond"===(t=H(t)||"millisecond")?this.valueOf()===s.valueOf():(n=s.valueOf(),this.clone().startOf(t).valueOf()<=n&&n<=this.clone().endOf(t).valueOf()))},mn.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)},mn.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)},mn.isValid=function(){return v(this)},mn.lang=Kt,mn.locale=Xt,mn.localeData=en,mn.max=Pt,mn.min=xt,mn.parsingFlags=function(){return _({},g(this))},mn.set=function(e,t){if("object"==typeof e)for(var n=function(e){var t=[];for(var n in e)t.push({unit:n,priority:U[n]});return t.sort(function(e,t){return e.priority-t.priority}),t}(e=R(e)),s=0;s<n.length;s++)this[n[s].unit](e[n[s].unit]);else if(b(this[e=H(e)]))return this[e](t);return this},mn.startOf=function(e){var t;if(void 0===(e=H(e))||"millisecond"===e||!this.isValid())return this;var n=this._isUTC?rn:sn;switch(e){case"year":t=n(this.year(),0,1);break;case"quarter":t=n(this.year(),this.month()-this.month()%3,1);break;case"month":t=n(this.year(),this.month(),1);break;case"week":t=n(this.year(),this.month(),this.date()-this.weekday());break;case"isoWeek":t=n(this.year(),this.month(),this.date()-(this.isoWeekday()-1));break;case"day":case"date":t=n(this.year(),this.month(),this.date());break;case"hour":t=this._d.valueOf(),t-=nn(t+(this._isUTC?0:6e4*this.utcOffset()),36e5);break;case"minute":t=this._d.valueOf(),t-=nn(t,6e4);break;case"second":t=this._d.valueOf(),t-=nn(t,1e3);break}return this._d.setTime(t),c.updateOffset(this,!0),this},mn.subtract=Bt,mn.toArray=function(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]},mn.toObject=function(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}},mn.toDate=function(){return new Date(this.valueOf())},mn.toISOString=function(e){if(!this.isValid())return null;var t=!0!==e,n=t?this.clone().utc():this;return n.year()<0||9999<n.year()?A(n,t?"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"):b(Date.prototype.toISOString)?t?this.toDate().toISOString():new Date(this.valueOf()+60*this.utcOffset()*1e3).toISOString().replace("Z",A(n,"Z")):A(n,t?"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYY-MM-DD[T]HH:mm:ss.SSSZ")},mn.inspect=function(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var e="moment",t="";this.isLocal()||(e=0===this.utcOffset()?"moment.utc":"moment.parseZone",t="Z");var n="["+e+'("]',s=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",i=t+'[")]';return this.format(n+s+"-MM-DD[T]HH:mm:ss.SSS"+i)},mn.toJSON=function(){return this.isValid()?this.toISOString():null},mn.toString=function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},mn.unix=function(){return Math.floor(this.valueOf()/1e3)},mn.valueOf=function(){return this._d.valueOf()-6e4*(this._offset||0)},mn.creationData=function(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}},mn.year=Oe,mn.isLeapYear=function(){return De(this.year())},mn.weekYear=function(e){return on.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)},mn.isoWeekYear=function(e){return on.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)},mn.quarter=mn.quarters=function(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)},mn.month=Ue,mn.daysInMonth=function(){return Pe(this.year(),this.month())},mn.week=mn.weeks=function(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")},mn.isoWeek=mn.isoWeeks=function(e){var t=Ie(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")},mn.weeksInYear=function(){var e=this.localeData()._week;return Ae(this.year(),e.dow,e.doy)},mn.isoWeeksInYear=function(){return Ae(this.year(),1,4)},mn.date=un,mn.day=mn.days=function(e){if(!this.isValid())return null!=e?this:NaN;var t,n,s=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(t=e,n=this.localeData(),e="string"!=typeof t?t:isNaN(t)?"number"==typeof(t=n.weekdaysParse(t))?t:null:parseInt(t,10),this.add(e-s,"d")):s},mn.weekday=function(e){if(!this.isValid())return null!=e?this:NaN;var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")},mn.isoWeekday=function(e){if(!this.isValid())return null!=e?this:NaN;if(null==e)return this.day()||7;var t,n,s=(t=e,n=this.localeData(),"string"==typeof t?n.weekdaysParse(t)%7||7:isNaN(t)?null:t);return this.day(this.day()%7?s:s-7)},mn.dayOfYear=function(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")},mn.hour=mn.hours=nt,mn.minute=mn.minutes=ln,mn.second=mn.seconds=dn,mn.millisecond=mn.milliseconds=fn,mn.utcOffset=function(e,t,n){var s,i=this._offset||0;if(!this.isValid())return null!=e?this:NaN;if(null==e)return this._isUTC?i:Vt(this);if("string"==typeof e){if(null===(e=Nt(re,e)))return this}else Math.abs(e)<16&&!n&&(e*=60);return!this._isUTC&&t&&(s=Vt(this)),this._offset=e,this._isUTC=!0,null!=s&&this.add(s,"m"),i!==e&&(!t||this._changeInProgress?qt(this,jt(e-i,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,c.updateOffset(this,!0),this._changeInProgress=null)),this},mn.utc=function(e){return this.utcOffset(0,e)},mn.local=function(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Vt(this),"m")),this},mn.parseZone=function(){if(null!=this._tzm)this.utcOffset(this._tzm,!1,!0);else if("string"==typeof this._i){var e=Nt(ie,this._i);null!=e?this.utcOffset(e):this.utcOffset(0,!0)}return this},mn.hasAlignedHourOffset=function(e){return!!this.isValid()&&(e=e?bt(e).utcOffset():0,(this.utcOffset()-e)%60==0)},mn.isDST=function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},mn.isLocal=function(){return!!this.isValid()&&!this._isUTC},mn.isUtcOffset=function(){return!!this.isValid()&&this._isUTC},mn.isUtc=Et,mn.isUTC=Et,mn.zoneAbbr=function(){return this._isUTC?"UTC":""},mn.zoneName=function(){return this._isUTC?"Coordinated Universal Time":""},mn.dates=n("dates accessor is deprecated. Use date instead.",un),mn.months=n("months accessor is deprecated. Use month instead",Ue),mn.years=n("years accessor is deprecated. Use year instead",Oe),mn.zone=n("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",function(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}),mn.isDSTShifted=n("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",function(){if(!l(this._isDSTShifted))return this._isDSTShifted;var e={};if(w(e,this),(e=Ot(e))._a){var t=e._isUTC?y(e._a):bt(e._a);this._isDSTShifted=this.isValid()&&0<a(e._a,t.toArray())}else this._isDSTShifted=!1;return this._isDSTShifted});var yn=P.prototype;function gn(e,t,n,s){var i=ht(),r=y().set(s,t);return i[n](r,e)}function vn(e,t,n){if(h(e)&&(t=e,e=void 0),e=e||"",null!=t)return gn(e,t,n,"month");var s,i=[];for(s=0;s<12;s++)i[s]=gn(e,s,n,"month");return i}function pn(e,t,n,s){t=("boolean"==typeof e?h(t)&&(n=t,t=void 0):(t=e,e=!1,h(n=t)&&(n=t,t=void 0)),t||"");var i,r=ht(),a=e?r._week.dow:0;if(null!=n)return gn(t,(n+a)%7,s,"day");var o=[];for(i=0;i<7;i++)o[i]=gn(t,(i+a)%7,s,"day");return o}yn.calendar=function(e,t,n){var s=this._calendar[e]||this._calendar.sameElse;return b(s)?s.call(t,n):s},yn.longDateFormat=function(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])},yn.invalidDate=function(){return this._invalidDate},yn.ordinal=function(e){return this._ordinal.replace("%d",e)},yn.preparse=_n,yn.postformat=_n,yn.relativeTime=function(e,t,n,s){var i=this._relativeTime[n];return b(i)?i(e,t,n,s):i.replace(/%d/i,e)},yn.pastFuture=function(e,t){var n=this._relativeTime[0<e?"future":"past"];return b(n)?n(t):n.replace(/%s/i,t)},yn.set=function(e){var t,n;for(n in e)b(t=e[n])?this[n]=t:this["_"+n]=t;this._config=e,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)},yn.months=function(e,t){return e?o(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||We).test(t)?"format":"standalone"][e.month()]:o(this._months)?this._months:this._months.standalone},yn.monthsShort=function(e,t){return e?o(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[We.test(t)?"format":"standalone"][e.month()]:o(this._monthsShort)?this._monthsShort:this._monthsShort.standalone},yn.monthsParse=function(e,t,n){var s,i,r;if(this._monthsParseExact)return function(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],s=0;s<12;++s)r=y([2e3,s]),this._shortMonthsParse[s]=this.monthsShort(r,"").toLocaleLowerCase(),this._longMonthsParse[s]=this.months(r,"").toLocaleLowerCase();return n?"MMM"===t?-1!==(i=Ye.call(this._shortMonthsParse,a))?i:null:-1!==(i=Ye.call(this._longMonthsParse,a))?i:null:"MMM"===t?-1!==(i=Ye.call(this._shortMonthsParse,a))?i:-1!==(i=Ye.call(this._longMonthsParse,a))?i:null:-1!==(i=Ye.call(this._longMonthsParse,a))?i:-1!==(i=Ye.call(this._shortMonthsParse,a))?i:null}.call(this,e,t,n);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),s=0;s<12;s++){if(i=y([2e3,s]),n&&!this._longMonthsParse[s]&&(this._longMonthsParse[s]=new RegExp("^"+this.months(i,"").replace(".","")+"$","i"),this._shortMonthsParse[s]=new RegExp("^"+this.monthsShort(i,"").replace(".","")+"$","i")),n||this._monthsParse[s]||(r="^"+this.months(i,"")+"|^"+this.monthsShort(i,""),this._monthsParse[s]=new RegExp(r.replace(".",""),"i")),n&&"MMMM"===t&&this._longMonthsParse[s].test(e))return s;if(n&&"MMM"===t&&this._shortMonthsParse[s].test(e))return s;if(!n&&this._monthsParse[s].test(e))return s}},yn.monthsRegex=function(e){return this._monthsParseExact?(m(this,"_monthsRegex")||Ne.call(this),e?this._monthsStrictRegex:this._monthsRegex):(m(this,"_monthsRegex")||(this._monthsRegex=Le),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)},yn.monthsShortRegex=function(e){return this._monthsParseExact?(m(this,"_monthsRegex")||Ne.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(m(this,"_monthsShortRegex")||(this._monthsShortRegex=Fe),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)},yn.week=function(e){return Ie(e,this._week.dow,this._week.doy).week},yn.firstDayOfYear=function(){return this._week.doy},yn.firstDayOfWeek=function(){return this._week.dow},yn.weekdays=function(e,t){var n=o(this._weekdays)?this._weekdays:this._weekdays[e&&!0!==e&&this._weekdays.isFormat.test(t)?"format":"standalone"];return!0===e?je(n,this._week.dow):e?n[e.day()]:n},yn.weekdaysMin=function(e){return!0===e?je(this._weekdaysMin,this._week.dow):e?this._weekdaysMin[e.day()]:this._weekdaysMin},yn.weekdaysShort=function(e){return!0===e?je(this._weekdaysShort,this._week.dow):e?this._weekdaysShort[e.day()]:this._weekdaysShort},yn.weekdaysParse=function(e,t,n){var s,i,r;if(this._weekdaysParseExact)return function(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],s=0;s<7;++s)r=y([2e3,1]).day(s),this._minWeekdaysParse[s]=this.weekdaysMin(r,"").toLocaleLowerCase(),this._shortWeekdaysParse[s]=this.weekdaysShort(r,"").toLocaleLowerCase(),this._weekdaysParse[s]=this.weekdays(r,"").toLocaleLowerCase();return n?"dddd"===t?-1!==(i=Ye.call(this._weekdaysParse,a))?i:null:"ddd"===t?-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:null:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:null:"dddd"===t?-1!==(i=Ye.call(this._weekdaysParse,a))?i:-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:null:"ddd"===t?-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:-1!==(i=Ye.call(this._weekdaysParse,a))?i:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:null:-1!==(i=Ye.call(this._minWeekdaysParse,a))?i:-1!==(i=Ye.call(this._weekdaysParse,a))?i:-1!==(i=Ye.call(this._shortWeekdaysParse,a))?i:null}.call(this,e,t,n);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),s=0;s<7;s++){if(i=y([2e3,1]).day(s),n&&!this._fullWeekdaysParse[s]&&(this._fullWeekdaysParse[s]=new RegExp("^"+this.weekdays(i,"").replace(".","\\.?")+"$","i"),this._shortWeekdaysParse[s]=new RegExp("^"+this.weekdaysShort(i,"").replace(".","\\.?")+"$","i"),this._minWeekdaysParse[s]=new RegExp("^"+this.weekdaysMin(i,"").replace(".","\\.?")+"$","i")),this._weekdaysParse[s]||(r="^"+this.weekdays(i,"")+"|^"+this.weekdaysShort(i,"")+"|^"+this.weekdaysMin(i,""),this._weekdaysParse[s]=new RegExp(r.replace(".",""),"i")),n&&"dddd"===t&&this._fullWeekdaysParse[s].test(e))return s;if(n&&"ddd"===t&&this._shortWeekdaysParse[s].test(e))return s;if(n&&"dd"===t&&this._minWeekdaysParse[s].test(e))return s;if(!n&&this._weekdaysParse[s].test(e))return s}},yn.weekdaysRegex=function(e){return this._weekdaysParseExact?(m(this,"_weekdaysRegex")||Qe.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(m(this,"_weekdaysRegex")||(this._weekdaysRegex=qe),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)},yn.weekdaysShortRegex=function(e){return this._weekdaysParseExact?(m(this,"_weekdaysRegex")||Qe.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(m(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=Je),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)},yn.weekdaysMinRegex=function(e){return this._weekdaysParseExact?(m(this,"_weekdaysRegex")||Qe.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(m(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Be),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)},yn.isPM=function(e){return"p"===(e+"").toLowerCase().charAt(0)},yn.meridiem=function(e,t,n){return 11<e?n?"pm":"PM":n?"am":"AM"},ut("en",{dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10;return e+(1===D(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th")}}),c.lang=n("moment.lang is deprecated. Use moment.locale instead.",ut),c.langData=n("moment.langData is deprecated. Use moment.localeData instead.",ht);var wn=Math.abs;function Mn(e,t,n,s){var i=jt(t,n);return e._milliseconds+=s*i._milliseconds,e._days+=s*i._days,e._months+=s*i._months,e._bubble()}function kn(e){return e<0?Math.floor(e):Math.ceil(e)}function Sn(e){return 4800*e/146097}function Dn(e){return 146097*e/4800}function Yn(e){return function(){return this.as(e)}}var On=Yn("ms"),Tn=Yn("s"),bn=Yn("m"),xn=Yn("h"),Pn=Yn("d"),Wn=Yn("w"),Cn=Yn("M"),Hn=Yn("Q"),Rn=Yn("y");function Un(e){return function(){return this.isValid()?this._data[e]:NaN}}var Fn=Un("milliseconds"),Ln=Un("seconds"),Nn=Un("minutes"),Gn=Un("hours"),Vn=Un("days"),En=Un("months"),In=Un("years");var An=Math.round,jn={ss:44,s:45,m:45,h:22,d:26,M:11};var Zn=Math.abs;function zn(e){return(0<e)-(e<0)||+e}function $n(){if(!this.isValid())return this.localeData().invalidDate();var e,t,n=Zn(this._milliseconds)/1e3,s=Zn(this._days),i=Zn(this._months);t=S((e=S(n/60))/60),n%=60,e%=60;var r=S(i/12),a=i%=12,o=s,u=t,l=e,h=n?n.toFixed(3).replace(/\.?0+$/,""):"",d=this.asSeconds();if(!d)return"P0D";var c=d<0?"-":"",f=zn(this._months)!==zn(d)?"-":"",m=zn(this._days)!==zn(d)?"-":"",_=zn(this._milliseconds)!==zn(d)?"-":"";return c+"P"+(r?f+r+"Y":"")+(a?f+a+"M":"")+(o?m+o+"D":"")+(u||l||h?"T":"")+(u?_+u+"H":"")+(l?_+l+"M":"")+(h?_+h+"S":"")}var qn=Ht.prototype;return qn.isValid=function(){return this._isValid},qn.abs=function(){var e=this._data;return this._milliseconds=wn(this._milliseconds),this._days=wn(this._days),this._months=wn(this._months),e.milliseconds=wn(e.milliseconds),e.seconds=wn(e.seconds),e.minutes=wn(e.minutes),e.hours=wn(e.hours),e.months=wn(e.months),e.years=wn(e.years),this},qn.add=function(e,t){return Mn(this,e,t,1)},qn.subtract=function(e,t){return Mn(this,e,t,-1)},qn.as=function(e){if(!this.isValid())return NaN;var t,n,s=this._milliseconds;if("month"===(e=H(e))||"quarter"===e||"year"===e)switch(t=this._days+s/864e5,n=this._months+Sn(t),e){case"month":return n;case"quarter":return n/3;case"year":return n/12}else switch(t=this._days+Math.round(Dn(this._months)),e){case"week":return t/7+s/6048e5;case"day":return t+s/864e5;case"hour":return 24*t+s/36e5;case"minute":return 1440*t+s/6e4;case"second":return 86400*t+s/1e3;case"millisecond":return Math.floor(864e5*t)+s;default:throw new Error("Unknown unit "+e)}},qn.asMilliseconds=On,qn.asSeconds=Tn,qn.asMinutes=bn,qn.asHours=xn,qn.asDays=Pn,qn.asWeeks=Wn,qn.asMonths=Cn,qn.asQuarters=Hn,qn.asYears=Rn,qn.valueOf=function(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*D(this._months/12):NaN},qn._bubble=function(){var e,t,n,s,i,r=this._milliseconds,a=this._days,o=this._months,u=this._data;return 0<=r&&0<=a&&0<=o||r<=0&&a<=0&&o<=0||(r+=864e5*kn(Dn(o)+a),o=a=0),u.milliseconds=r%1e3,e=S(r/1e3),u.seconds=e%60,t=S(e/60),u.minutes=t%60,n=S(t/60),u.hours=n%24,o+=i=S(Sn(a+=S(n/24))),a-=kn(Dn(i)),s=S(o/12),o%=12,u.days=a,u.months=o,u.years=s,this},qn.clone=function(){return jt(this)},qn.get=function(e){return e=H(e),this.isValid()?this[e+"s"]():NaN},qn.milliseconds=Fn,qn.seconds=Ln,qn.minutes=Nn,qn.hours=Gn,qn.days=Vn,qn.weeks=function(){return S(this.days()/7)},qn.months=En,qn.years=In,qn.humanize=function(e){if(!this.isValid())return this.localeData().invalidDate();var t,n,s,i,r,a,o,u,l,h,d,c=this.localeData(),f=(n=!e,s=c,i=jt(t=this).abs(),r=An(i.as("s")),a=An(i.as("m")),o=An(i.as("h")),u=An(i.as("d")),l=An(i.as("M")),h=An(i.as("y")),(d=r<=jn.ss&&["s",r]||r<jn.s&&["ss",r]||a<=1&&["m"]||a<jn.m&&["mm",a]||o<=1&&["h"]||o<jn.h&&["hh",o]||u<=1&&["d"]||u<jn.d&&["dd",u]||l<=1&&["M"]||l<jn.M&&["MM",l]||h<=1&&["y"]||["yy",h])[2]=n,d[3]=0<+t,d[4]=s,function(e,t,n,s,i){return i.relativeTime(t||1,!!n,e,s)}.apply(null,d));return e&&(f=c.pastFuture(+this,f)),c.postformat(f)},qn.toISOString=$n,qn.toString=$n,qn.toJSON=$n,qn.locale=Xt,qn.localeData=en,qn.toIsoString=n("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",$n),qn.lang=Kt,I("X",0,0,"unix"),I("x",0,0,"valueOf"),ue("x",se),ue("X",/[+-]?\d+(\.\d{1,3})?/),ce("X",function(e,t,n){n._d=new Date(1e3*parseFloat(e,10))}),ce("x",function(e,t,n){n._d=new Date(D(e))}),c.version="2.24.0",e=bt,c.fn=mn,c.min=function(){return Wt("isBefore",[].slice.call(arguments,0))},c.max=function(){return Wt("isAfter",[].slice.call(arguments,0))},c.now=function(){return Date.now?Date.now():+new Date},c.utc=y,c.unix=function(e){return bt(1e3*e)},c.months=function(e,t){return vn(e,t,"months")},c.isDate=d,c.locale=ut,c.invalid=p,c.duration=jt,c.isMoment=k,c.weekdays=function(e,t,n){return pn(e,t,n,"weekdays")},c.parseZone=function(){return bt.apply(null,arguments).parseZone()},c.localeData=ht,c.isDuration=Rt,c.monthsShort=function(e,t){return vn(e,t,"monthsShort")},c.weekdaysMin=function(e,t,n){return pn(e,t,n,"weekdaysMin")},c.defineLocale=lt,c.updateLocale=function(e,t){if(null!=t){var n,s,i=st;null!=(s=ot(e))&&(i=s._config),(n=new P(t=x(i,t))).parentLocale=it[e],it[e]=n,ut(e)}else null!=it[e]&&(null!=it[e].parentLocale?it[e]=it[e].parentLocale:null!=it[e]&&delete it[e]);return it[e]},c.locales=function(){return s(it)},c.weekdaysShort=function(e,t,n){return pn(e,t,n,"weekdaysShort")},c.normalizeUnits=H,c.relativeTimeRounding=function(e){return void 0===e?An:"function"==typeof e&&(An=e,!0)},c.relativeTimeThreshold=function(e,t){return void 0!==jn[e]&&(void 0===t?jn[e]:(jn[e]=t,"s"===e&&(jn.ss=t-1),!0))},c.calendarFormat=function(e,t){var n=e.diff(t,"days",!0);return n<-6?"sameElse":n<-1?"lastWeek":n<0?"lastDay":n<1?"sameDay":n<2?"nextDay":n<7?"nextWeek":"sameElse"},c.prototype=mn,c.HTML5_FMT={DATETIME_LOCAL:"YYYY-MM-DDTHH:mm",DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss",DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS",DATE:"YYYY-MM-DD",TIME:"HH:mm",TIME_SECONDS:"HH:mm:ss",TIME_MS:"HH:mm:ss.SSS",WEEK:"GGGG-[W]WW",MONTH:"YYYY-MM"},c});;
"format amd";!function(){"use strict";function a(a){return angular.isUndefined(a)||null===a}function b(){try{return require("moment")}catch(a){throw new Error("Please install moment via npm. Please reference to: https://github.com/urish/angular-moment")}}function c(c,d){if("undefined"==typeof d){if("function"!=typeof require)throw new Error("Moment cannot be found by angular-moment! Please reference to: https://github.com/urish/angular-moment");d=b()}return c.module("angularMoment",[]).constant("angularMomentConfig",{preprocess:null,timezone:null,format:null,statefulFilters:!0}).constant("moment",d).constant("amTimeAgoConfig",{withoutSuffix:!1,serverTime:null,titleFormat:null,fullDateThreshold:null,fullDateFormat:null,fullDateThresholdUnit:"day"}).directive("amTimeAgo",["$window","moment","amMoment","amTimeAgoConfig",function(b,d,e,f){return function(g,h,i){function j(){var a;if(p)a=p;else if(f.serverTime){var b=(new Date).getTime(),c=b-w+f.serverTime;a=d(c)}else a=d();return a}function k(){q&&(b.clearTimeout(q),q=null)}function l(a){var c=j().diff(a,v),d=t&&c>=t;if(d?h.text(a.format(u)):h.text(a.from(j(),r)),s&&z&&h.attr("title",a.format(s)),!d){var e=Math.abs(j().diff(a,"minute")),f=3600;e<1?f=1:e<60?f=30:e<180&&(f=300),q=b.setTimeout(function(){l(a)},1e3*f)}}function m(a){y&&h.attr("datetime",a)}function n(){if(k(),o){var a=e.preprocessDate(o);l(a),m(a.toISOString())}}var o,p,q=null,r=f.withoutSuffix,s=f.titleFormat,t=f.fullDateThreshold,u=f.fullDateFormat,v=f.fullDateThresholdUnit,w=(new Date).getTime(),x=i.amTimeAgo,y="TIME"===h[0].nodeName.toUpperCase(),z=!h.attr("title");g.$watch(x,function(b){return a(b)||""===b?(k(),void(o&&(h.text(""),m(""),o=null))):(o=b,void n())}),c.isDefined(i.amFrom)&&g.$watch(i.amFrom,function(b){p=a(b)||""===b?null:d(b),n()}),c.isDefined(i.amWithoutSuffix)&&g.$watch(i.amWithoutSuffix,function(a){"boolean"==typeof a?(r=a,n()):r=f.withoutSuffix}),i.$observe("amFullDateThreshold",function(a){t=a,n()}),i.$observe("amFullDateFormat",function(a){u=a,n()}),i.$observe("amFullDateThresholdUnit",function(a){v=a,n()}),g.$on("$destroy",function(){k()}),g.$on("amMoment:localeChanged",function(){n()})}}]).service("amMoment",["moment","$rootScope","$log","angularMomentConfig",function(a,b,d,e){var f=null;this.changeLocale=function(d,e){var f=a.locale(d,e);return c.isDefined(d)&&b.$broadcast("amMoment:localeChanged"),f},this.changeTimezone=function(c){a.tz&&a.tz.setDefault?(a.tz.setDefault(c),b.$broadcast("amMoment:timezoneChanged")):d.warn("angular-moment: changeTimezone() works only with moment-timezone.js v0.3.0 or greater."),e.timezone=c,f=c},this.preprocessDate=function(b){return f!==e.timezone&&this.changeTimezone(e.timezone),e.preprocess?e.preprocess(b):a(!isNaN(parseFloat(b))&&isFinite(b)?parseInt(b,10):b)}}]).filter("amParse",["moment",function(a){return function(b,c){return a(b,c)}}]).filter("amFromUnix",["moment",function(a){return function(b){return a.unix(b)}}]).filter("amUtc",["moment",function(a){return function(b){return a.utc(b)}}]).filter("amUtcOffset",["amMoment",function(a){function b(b,c){return a.preprocessDate(b).utcOffset(c)}return b}]).filter("amLocal",["moment",function(a){return function(b){return a.isMoment(b)?b.local():null}}]).filter("amTimezone",["amMoment","angularMomentConfig","$log",function(a,b,c){function d(b,d){var e=a.preprocessDate(b);return d?e.tz?e.tz(d):(c.warn("angular-moment: named timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js ?"),e):e}return d}]).filter("amCalendar",["moment","amMoment","angularMomentConfig",function(b,c,d){function e(b,d,e){if(a(b))return"";var f=c.preprocessDate(b);return f.isValid()?f.calendar(d,e):""}return e.$stateful=d.statefulFilters,e}]).filter("amDifference",["moment","amMoment","angularMomentConfig",function(b,c,d){function e(d,e,f,g){if(a(d))return"";var h=c.preprocessDate(d),i=a(e)?b():c.preprocessDate(e);return h.isValid()&&i.isValid()?h.diff(i,f,g):""}return e.$stateful=d.statefulFilters,e}]).filter("amDateFormat",["moment","amMoment","angularMomentConfig",function(b,c,d){function e(b,d){if(a(b))return"";var e=c.preprocessDate(b);return e.isValid()?e.format(d):""}return e.$stateful=d.statefulFilters,e}]).filter("amDurationFormat",["moment","angularMomentConfig",function(b,c){function d(c,d,e){return a(c)?"":b.duration(c,d).humanize(e)}return d.$stateful=c.statefulFilters,d}]).filter("amTimeAgo",["moment","amMoment","angularMomentConfig",function(b,c,d){function e(d,e,f){var g,h;return a(d)?"":(d=c.preprocessDate(d),g=b(d),g.isValid()?(h=b(f),!a(f)&&h.isValid()?g.from(h,e):g.fromNow(e)):"")}return e.$stateful=d.statefulFilters,e}]).filter("amSubtract",["moment","angularMomentConfig",function(b,c){function d(c,d,e){return a(c)?"":b(c).subtract(parseInt(d,10),e)}return d.$stateful=c.statefulFilters,d}]).filter("amAdd",["moment","angularMomentConfig",function(b,c){function d(c,d,e){return a(c)?"":b(c).add(parseInt(d,10),e)}return d.$stateful=c.statefulFilters,d}]).filter("amStartOf",["moment","angularMomentConfig",function(b,c){function d(c,d){return a(c)?"":b(c).startOf(d)}return d.$stateful=c.statefulFilters,d}]).filter("amEndOf",["moment","angularMomentConfig",function(b,c){function d(c,d){return a(c)?"":b(c).endOf(d)}return d.$stateful=c.statefulFilters,d}]),"angularMoment"}var d=window&&window.process&&window.process.type;"function"==typeof define&&define.amd?define(["angular","moment"],c):"undefined"!=typeof module&&module&&module.exports&&"function"==typeof require&&!d?module.exports=c(require("angular"),require("moment")):c(angular,("undefined"!=typeof global&&"undefined"!=typeof global.moment?global:window).moment)}();
//# sourceMappingURL=angular-moment.min.js.map;
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});
;
/*!
 * angular-slick-carousel
 * DevMark <hc.devmark@gmail.com>
 * https://github.com/devmark/angular-slick-carousel
 * Version: 3.1.7 - 2016-08-04T06:17:55.528Z
 * License: MIT
 */
"use strict";angular.module("slickCarousel",[]).constant("slickCarouselConfig",{method:{},event:{}}).directive("slick",["$timeout","slickCarouselConfig",function(e,n){var i,t;return i=["slickGoTo","slickNext","slickPrev","slickPause","slickPlay","slickAdd","slickRemove","slickFilter","slickUnfilter","unslick"],t=["afterChange","beforeChange","breakpoint","destroy","edge","init","reInit","setPosition","swipe","lazyLoaded","lazyLoadError"],{scope:{settings:"=",enabled:"@",accessibility:"@",adaptiveHeight:"@",autoplay:"@",autoplaySpeed:"@",arrows:"@",asNavFor:"@",appendArrows:"@",prevArrow:"@",nextArrow:"@",centerMode:"@",centerPadding:"@",cssEase:"@",customPaging:"&",dots:"@",draggable:"@",fade:"@",focusOnSelect:"@",easing:"@",edgeFriction:"@",infinite:"@",initialSlide:"@",lazyLoad:"@",mobileFirst:"@",pauseOnHover:"@",pauseOnDotsHover:"@",respondTo:"@",responsive:"=?",rows:"@",slide:"@",slidesPerRow:"@",slidesToShow:"@",slidesToScroll:"@",speed:"@",swipe:"@",swipeToSlide:"@",touchMove:"@",touchThreshold:"@",useCSS:"@",variableWidth:"@",vertical:"@",verticalSwiping:"@",rtl:"@"},restrict:"AE",link:function(t,o,a){angular.element(o).css("display","none");var r,s,l,d,u,c;return s=function(){r=angular.extend(angular.copy(n),{enabled:"false"!==t.enabled,accessibility:"false"!==t.accessibility,adaptiveHeight:"true"===t.adaptiveHeight,autoplay:"true"===t.autoplay,autoplaySpeed:null!=t.autoplaySpeed?parseInt(t.autoplaySpeed,10):3e3,arrows:"false"!==t.arrows,asNavFor:t.asNavFor?t.asNavFor:void 0,appendArrows:angular.element(t.appendArrows?t.appendArrows:o),prevArrow:t.prevArrow?angular.element(t.prevArrow):void 0,nextArrow:t.nextArrow?angular.element(t.nextArrow):void 0,centerMode:"true"===t.centerMode,centerPadding:t.centerPadding||"50px",cssEase:t.cssEase||"ease",customPaging:a.customPaging?function(e,n){return t.customPaging({slick:e,index:n})}:void 0,dots:"true"===t.dots,draggable:"false"!==t.draggable,fade:"true"===t.fade,focusOnSelect:"true"===t.focusOnSelect,easing:t.easing||"linear",edgeFriction:t.edgeFriction||.15,infinite:"false"!==t.infinite,initialSlide:parseInt(t.initialSlide)||0,lazyLoad:t.lazyLoad||"ondemand",mobileFirst:"true"===t.mobileFirst,pauseOnHover:"false"!==t.pauseOnHover,pauseOnDotsHover:"true"===t.pauseOnDotsHover,respondTo:null!=t.respondTo?t.respondTo:"window",responsive:t.responsive||void 0,rows:null!=t.rows?parseInt(t.rows,10):1,slide:t.slide||"",slidesPerRow:null!=t.slidesPerRow?parseInt(t.slidesPerRow,10):1,slidesToShow:null!=t.slidesToShow?parseInt(t.slidesToShow,10):1,slidesToScroll:null!=t.slidesToScroll?parseInt(t.slidesToScroll,10):1,speed:null!=t.speed?parseInt(t.speed,10):300,swipe:"false"!==t.swipe,swipeToSlide:"true"===t.swipeToSlide,touchMove:"false"!==t.touchMove,touchThreshold:t.touchThreshold?parseInt(t.touchThreshold,10):5,useCSS:"false"!==t.useCSS,variableWidth:"true"===t.variableWidth,vertical:"true"===t.vertical,verticalSwiping:"true"===t.verticalSwiping,rtl:"true"===t.rtl},t.settings)},l=function(){var e=angular.element(o);return e.hasClass("slick-initialized")&&(e.remove("slick-list"),e.slick("unslick")),e},d=function(){s();var n=angular.element(o);if(angular.element(o).hasClass("slick-initialized")){if(r.enabled)return n.slick("getSlick");l()}else{if(!r.enabled)return;n.on("init",function(e,n){return"undefined"!=typeof r.event.init&&r.event.init(e,n),"undefined"!=typeof c?n.slideHandler(c):void 0}),e(function(){angular.element(o).css("display","block"),n.not(".slick-initialized").slick(r)})}t.internalControl=r.method||{},i.forEach(function(e){t.internalControl[e]=function(){var i;i=Array.prototype.slice.call(arguments),i.unshift(e),n.slick.apply(o,i)}}),n.on("afterChange",function(n,i,o){c=o,"undefined"!=typeof r.event.afterChange&&e(function(){t.$apply(function(){r.event.afterChange(n,i,o)})})}),n.on("beforeChange",function(n,i,o,a){"undefined"!=typeof r.event.beforeChange&&e(function(){e(function(){t.$apply(function(){r.event.beforeChange(n,i,o,a)})})})}),n.on("reInit",function(n,i){"undefined"!=typeof r.event.reInit&&e(function(){t.$apply(function(){r.event.reInit(n,i)})})}),"undefined"!=typeof r.event.breakpoint&&n.on("breakpoint",function(n,i,o){e(function(){t.$apply(function(){r.event.breakpoint(n,i,o)})})}),"undefined"!=typeof r.event.destroy&&n.on("destroy",function(n,i){e(function(){t.$apply(function(){r.event.destroy(n,i)})})}),"undefined"!=typeof r.event.edge&&n.on("edge",function(n,i,o){e(function(){t.$apply(function(){r.event.edge(n,i,o)})})}),"undefined"!=typeof r.event.setPosition&&n.on("setPosition",function(n,i){e(function(){t.$apply(function(){r.event.setPosition(n,i)})})}),"undefined"!=typeof r.event.swipe&&n.on("swipe",function(n,i,o){e(function(){t.$apply(function(){r.event.swipe(n,i,o)})})}),"undefined"!=typeof r.event.lazyLoaded&&n.on("lazyLoaded",function(n,i,o,a){e(function(){t.$apply(function(){r.event.lazyLoaded(n,i,o,a)})})}),"undefined"!=typeof r.event.lazyLoadError&&n.on("lazyLoadError",function(n,i,o,a){e(function(){t.$apply(function(){r.event.lazyLoadError(n,i,o,a)})})})},u=function(){l(),d()},o.one("$destroy",function(){l()}),t.$watch("settings",function(e,n){return null!==e?u():void 0},!0)}}}]);;
/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 2.5.0 - 2017-01-28
 * License: MIT
 */angular.module("ui.bootstrap",["ui.bootstrap.modal","ui.bootstrap.multiMap","ui.bootstrap.stackedMap","ui.bootstrap.position"]),angular.module("ui.bootstrap.modal",["ui.bootstrap.multiMap","ui.bootstrap.stackedMap","ui.bootstrap.position"]).provider("$uibResolve",function(){var t=this;this.resolver=null,this.setResolver=function(t){this.resolver=t},this.$get=["$injector","$q",function(e,o){var n=t.resolver?e.get(t.resolver):null;return{resolve:function(t,r,i,a){if(n)return n.resolve(t,r,i,a);var l=[];return angular.forEach(t,function(t){l.push(angular.isFunction(t)||angular.isArray(t)?o.resolve(e.invoke(t)):angular.isString(t)?o.resolve(e.get(t)):o.resolve(t))}),o.all(l).then(function(e){var o={},n=0;return angular.forEach(t,function(t,r){o[r]=e[n++]}),o})}}}]}).directive("uibModalBackdrop",["$animate","$injector","$uibModalStack",function(t,e,o){function n(e,n,r){r.modalInClass&&(t.addClass(n,r.modalInClass),e.$on(o.NOW_CLOSING_EVENT,function(o,i){var a=i();e.modalOptions.animation?t.removeClass(n,r.modalInClass).then(a):a()}))}return{restrict:"A",compile:function(t,e){return t.addClass(e.backdropClass),n}}}]).directive("uibModalWindow",["$uibModalStack","$q","$animateCss","$document",function(t,e,o,n){return{scope:{index:"@"},restrict:"A",transclude:!0,templateUrl:function(t,e){return e.templateUrl||"uib/template/modal/window.html"},link:function(r,i,a){i.addClass(a.windowTopClass||""),r.size=a.size,r.close=function(e){var o=t.getTop();o&&o.value.backdrop&&"static"!==o.value.backdrop&&e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),t.dismiss(o.key,"backdrop click"))},i.on("click",r.close),r.$isRendered=!0;var l=e.defer();r.$$postDigest(function(){l.resolve()}),l.promise.then(function(){var l=null;a.modalInClass&&(l=o(i,{addClass:a.modalInClass}).start(),r.$on(t.NOW_CLOSING_EVENT,function(t,e){var n=e();o(i,{removeClass:a.modalInClass}).start().then(n)})),e.when(l).then(function(){var e=t.getTop();if(e&&t.modalRendered(e.key),!n[0].activeElement||!i[0].contains(n[0].activeElement)){var o=i[0].querySelector("[autofocus]");o?o.focus():i[0].focus()}})})}}}]).directive("uibModalAnimationClass",function(){return{compile:function(t,e){e.modalAnimation&&t.addClass(e.uibModalAnimationClass)}}}).directive("uibModalTransclude",["$animate",function(t){return{link:function(e,o,n,r,i){i(e.$parent,function(e){o.empty(),t.enter(e,o)})}}}]).factory("$uibModalStack",["$animate","$animateCss","$document","$compile","$rootScope","$q","$$multiMap","$$stackedMap","$uibPosition",function(t,e,o,n,r,i,a,l,s){function d(t){var e="-";return t.replace(D,function(t,o){return(o?e:"")+t.toLowerCase()})}function u(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function c(){for(var t=-1,e=C.keys(),o=0;o<e.length;o++)C.get(e[o]).value.backdrop&&(t=o);return t>-1&&M>t&&(t=M),t}function p(t,e){var o=C.get(t).value,n=o.appendTo;C.remove(t),T=C.top(),T&&(M=parseInt(T.value.modalDomEl.attr("index"),10)),h(o.modalDomEl,o.modalScope,function(){var e=o.openedClass||k;S.remove(e,t);var r=S.hasKey(e);n.toggleClass(e,r),!r&&y&&y.heightOverflow&&y.scrollbarWidth&&(n.css(y.originalRight?{paddingRight:y.originalRight+"px"}:{paddingRight:""}),y=null),f(!0)},o.closedDeferred),m(),e&&e.focus?e.focus():n.focus&&n.focus()}function f(t){var e;C.length()>0&&(e=C.top().value,e.modalDomEl.toggleClass(e.windowTopClass||"",t))}function m(){if(w&&-1===c()){var t=$;h(w,$,function(){t=null}),w=void 0,$=void 0}}function h(e,o,n,r){function a(){a.done||(a.done=!0,t.leave(e).then(function(){n&&n(),e.remove(),r&&r.resolve()}),o.$destroy())}var l,s=null,d=function(){return l||(l=i.defer(),s=l.promise),function(){l.resolve()}};return o.$broadcast(E.NOW_CLOSING_EVENT,d),i.when(s).then(a)}function g(t){if(t.isDefaultPrevented())return t;var e=C.top();if(e)switch(t.which){case 27:e.value.keyboard&&(t.preventDefault(),r.$apply(function(){E.dismiss(e.key,"escape key press")}));break;case 9:var o=E.loadFocusElementList(e),n=!1;t.shiftKey?(E.isFocusInFirstItem(t,o)||E.isModalFocused(t,e))&&(n=E.focusLastFocusableElement(o)):E.isFocusInLastItem(t,o)&&(n=E.focusFirstFocusableElement(o)),n&&(t.preventDefault(),t.stopPropagation())}}function v(t,e,o){return!t.value.modalScope.$broadcast("modal.closing",e,o).defaultPrevented}function b(){Array.prototype.forEach.call(document.querySelectorAll("["+x+"]"),function(t){var e=parseInt(t.getAttribute(x),10),o=e-1;t.setAttribute(x,o),o||(t.removeAttribute(x),t.removeAttribute("aria-hidden"))})}var w,$,y,k="modal-open",C=l.createNew(),S=a.createNew(),E={NOW_CLOSING_EVENT:"modal.stack.now-closing"},M=0,T=null,x="data-bootstrap-modal-aria-hidden-count",N="a[href], area[href], input:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]",D=/[A-Z]/g;return r.$watch(c,function(t){$&&($.index=t)}),o.on("keydown",g),r.$on("$destroy",function(){o.off("keydown",g)}),E.open=function(e,i){function a(t){function e(t){var e=t.parent()?t.parent().children():[];return Array.prototype.filter.call(e,function(e){return e!==t[0]})}if(t&&"BODY"!==t[0].tagName)return e(t).forEach(function(t){var e="true"===t.getAttribute("aria-hidden"),o=parseInt(t.getAttribute(x),10);o||(o=e?1:0),t.setAttribute(x,o+1),t.setAttribute("aria-hidden","true")}),a(t.parent())}var l=o[0].activeElement,u=i.openedClass||k;f(!1),T=C.top(),C.add(e,{deferred:i.deferred,renderDeferred:i.renderDeferred,closedDeferred:i.closedDeferred,modalScope:i.scope,backdrop:i.backdrop,keyboard:i.keyboard,openedClass:i.openedClass,windowTopClass:i.windowTopClass,animation:i.animation,appendTo:i.appendTo}),S.put(u,e);var p=i.appendTo,m=c();m>=0&&!w&&($=r.$new(!0),$.modalOptions=i,$.index=m,w=angular.element('<div uib-modal-backdrop="modal-backdrop"></div>'),w.attr({"class":"modal-backdrop","ng-style":"{'z-index': 1040 + (index && 1 || 0) + index*10}","uib-modal-animation-class":"fade","modal-in-class":"in"}),i.backdropClass&&w.addClass(i.backdropClass),i.animation&&w.attr("modal-animation","true"),n(w)($),t.enter(w,p),s.isScrollable(p)&&(y=s.scrollbarPadding(p),y.heightOverflow&&y.scrollbarWidth&&p.css({paddingRight:y.right+"px"})));var h;i.component?(h=document.createElement(d(i.component.name)),h=angular.element(h),h.attr({resolve:"$resolve","modal-instance":"$uibModalInstance",close:"$close($value)",dismiss:"$dismiss($value)"})):h=i.content,M=T?parseInt(T.value.modalDomEl.attr("index"),10)+1:0;var g=angular.element('<div uib-modal-window="modal-window"></div>');g.attr({"class":"modal","template-url":i.windowTemplateUrl,"window-top-class":i.windowTopClass,role:"dialog","aria-labelledby":i.ariaLabelledBy,"aria-describedby":i.ariaDescribedBy,size:i.size,index:M,animate:"animate","ng-style":"{'z-index': 1050 + $$topModalIndex*10, display: 'block'}",tabindex:-1,"uib-modal-animation-class":"fade","modal-in-class":"in"}).append(h),i.windowClass&&g.addClass(i.windowClass),i.animation&&g.attr("modal-animation","true"),p.addClass(u),i.scope&&(i.scope.$$topModalIndex=M),t.enter(n(g)(i.scope),p),C.top().value.modalDomEl=g,C.top().value.modalOpener=l,a(g)},E.close=function(t,e){var o=C.get(t);return b(),o&&v(o,e,!0)?(o.value.modalScope.$$uibDestructionScheduled=!0,o.value.deferred.resolve(e),p(t,o.value.modalOpener),!0):!o},E.dismiss=function(t,e){var o=C.get(t);return b(),o&&v(o,e,!1)?(o.value.modalScope.$$uibDestructionScheduled=!0,o.value.deferred.reject(e),p(t,o.value.modalOpener),!0):!o},E.dismissAll=function(t){for(var e=this.getTop();e&&this.dismiss(e.key,t);)e=this.getTop()},E.getTop=function(){return C.top()},E.modalRendered=function(t){var e=C.get(t);e&&e.value.renderDeferred.resolve()},E.focusFirstFocusableElement=function(t){return t.length>0?(t[0].focus(),!0):!1},E.focusLastFocusableElement=function(t){return t.length>0?(t[t.length-1].focus(),!0):!1},E.isModalFocused=function(t,e){if(t&&e){var o=e.value.modalDomEl;if(o&&o.length)return(t.target||t.srcElement)===o[0]}return!1},E.isFocusInFirstItem=function(t,e){return e.length>0?(t.target||t.srcElement)===e[0]:!1},E.isFocusInLastItem=function(t,e){return e.length>0?(t.target||t.srcElement)===e[e.length-1]:!1},E.loadFocusElementList=function(t){if(t){var e=t.value.modalDomEl;if(e&&e.length){var o=e[0].querySelectorAll(N);return o?Array.prototype.filter.call(o,function(t){return u(t)}):o}}},E}]).provider("$uibModal",function(){var t={options:{animation:!0,backdrop:!0,keyboard:!0},$get:["$rootScope","$q","$document","$templateRequest","$controller","$uibResolve","$uibModalStack",function(e,o,n,r,i,a,l){function s(t){return t.template?o.when(t.template):r(angular.isFunction(t.templateUrl)?t.templateUrl():t.templateUrl)}var d={},u=null;return d.getPromiseChain=function(){return u},d.open=function(r){function d(){return g}var c=o.defer(),p=o.defer(),f=o.defer(),m=o.defer(),h={result:c.promise,opened:p.promise,closed:f.promise,rendered:m.promise,close:function(t){return l.close(h,t)},dismiss:function(t){return l.dismiss(h,t)}};if(r=angular.extend({},t.options,r),r.resolve=r.resolve||{},r.appendTo=r.appendTo||n.find("body").eq(0),!r.appendTo.length)throw new Error("appendTo element not found. Make sure that the element passed is in DOM.");if(!r.component&&!r.template&&!r.templateUrl)throw new Error("One of component or template or templateUrl options is required.");var g;g=r.component?o.when(a.resolve(r.resolve,{},null,null)):o.all([s(r),a.resolve(r.resolve,{},null,null)]);var v;return v=u=o.all([u]).then(d,d).then(function(t){function o(e,o,n,r){e.$scope=a,e.$scope.$resolve={},n?e.$scope.$uibModalInstance=h:e.$uibModalInstance=h;var i=o?t[1]:t;angular.forEach(i,function(t,o){r&&(e[o]=t),e.$scope.$resolve[o]=t})}var n=r.scope||e,a=n.$new();a.$close=h.close,a.$dismiss=h.dismiss,a.$on("$destroy",function(){a.$$uibDestructionScheduled||a.$dismiss("$uibUnscheduledDestruction")});var s,d,u={scope:a,deferred:c,renderDeferred:m,closedDeferred:f,animation:r.animation,backdrop:r.backdrop,keyboard:r.keyboard,backdropClass:r.backdropClass,windowTopClass:r.windowTopClass,windowClass:r.windowClass,windowTemplateUrl:r.windowTemplateUrl,ariaLabelledBy:r.ariaLabelledBy,ariaDescribedBy:r.ariaDescribedBy,size:r.size,openedClass:r.openedClass,appendTo:r.appendTo},g={},v={};r.component?(o(g,!1,!0,!1),g.name=r.component,u.component=g):r.controller&&(o(v,!0,!1,!0),d=i(r.controller,v,!0,r.controllerAs),r.controllerAs&&r.bindToController&&(s=d.instance,s.$close=a.$close,s.$dismiss=a.$dismiss,angular.extend(s,{$resolve:v.$scope.$resolve},n)),s=d(),angular.isFunction(s.$onInit)&&s.$onInit()),r.component||(u.content=t[0]),l.open(h,u),p.resolve(!0)},function(t){p.reject(t),c.reject(t)})["finally"](function(){u===v&&(u=null)}),h},d}]};return t}),angular.module("ui.bootstrap.multiMap",[]).factory("$$multiMap",function(){return{createNew:function(){var t={};return{entries:function(){return Object.keys(t).map(function(e){return{key:e,value:t[e]}})},get:function(e){return t[e]},hasKey:function(e){return!!t[e]},keys:function(){return Object.keys(t)},put:function(e,o){t[e]||(t[e]=[]),t[e].push(o)},remove:function(e,o){var n=t[e];if(n){var r=n.indexOf(o);-1!==r&&n.splice(r,1),n.length||delete t[e]}}}}}}),angular.module("ui.bootstrap.stackedMap",[]).factory("$$stackedMap",function(){return{createNew:function(){var t=[];return{add:function(e,o){t.push({key:e,value:o})},get:function(e){for(var o=0;o<t.length;o++)if(e===t[o].key)return t[o]},keys:function(){for(var e=[],o=0;o<t.length;o++)e.push(t[o].key);return e},top:function(){return t[t.length-1]},remove:function(e){for(var o=-1,n=0;n<t.length;n++)if(e===t[n].key){o=n;break}return t.splice(o,1)[0]},removeTop:function(){return t.pop()},length:function(){return t.length}}}}}),angular.module("ui.bootstrap.position",[]).factory("$uibPosition",["$document","$window",function(t,e){var o,n,r={normal:/(auto|scroll)/,hidden:/(auto|scroll|hidden)/},i={auto:/\s?auto?\s?/i,primary:/^(top|bottom|left|right)$/,secondary:/^(top|bottom|left|right|center)$/,vertical:/^(top|bottom)$/},a=/(HTML|BODY)/;return{getRawNode:function(t){return t.nodeName?t:t[0]||t},parseStyle:function(t){return t=parseFloat(t),isFinite(t)?t:0},offsetParent:function(o){function n(t){return"static"===(e.getComputedStyle(t).position||"static")}o=this.getRawNode(o);for(var r=o.offsetParent||t[0].documentElement;r&&r!==t[0].documentElement&&n(r);)r=r.offsetParent;return r||t[0].documentElement},scrollbarWidth:function(r){if(r){if(angular.isUndefined(n)){var i=t.find("body");i.addClass("uib-position-body-scrollbar-measure"),n=e.innerWidth-i[0].clientWidth,n=isFinite(n)?n:0,i.removeClass("uib-position-body-scrollbar-measure")}return n}if(angular.isUndefined(o)){var a=angular.element('<div class="uib-position-scrollbar-measure"></div>');t.find("body").append(a),o=a[0].offsetWidth-a[0].clientWidth,o=isFinite(o)?o:0,a.remove()}return o},scrollbarPadding:function(t){t=this.getRawNode(t);var o=e.getComputedStyle(t),n=this.parseStyle(o.paddingRight),r=this.parseStyle(o.paddingBottom),i=this.scrollParent(t,!1,!0),l=this.scrollbarWidth(a.test(i.tagName));return{scrollbarWidth:l,widthOverflow:i.scrollWidth>i.clientWidth,right:n+l,originalRight:n,heightOverflow:i.scrollHeight>i.clientHeight,bottom:r+l,originalBottom:r}},isScrollable:function(t,o){t=this.getRawNode(t);var n=o?r.hidden:r.normal,i=e.getComputedStyle(t);return n.test(i.overflow+i.overflowY+i.overflowX)},scrollParent:function(o,n,i){o=this.getRawNode(o);var a=n?r.hidden:r.normal,l=t[0].documentElement,s=e.getComputedStyle(o);if(i&&a.test(s.overflow+s.overflowY+s.overflowX))return o;var d="absolute"===s.position,u=o.parentElement||l;if(u===l||"fixed"===s.position)return l;for(;u.parentElement&&u!==l;){var c=e.getComputedStyle(u);if(d&&"static"!==c.position&&(d=!1),!d&&a.test(c.overflow+c.overflowY+c.overflowX))break;u=u.parentElement}return u},position:function(o,n){o=this.getRawNode(o);var r=this.offset(o);if(n){var i=e.getComputedStyle(o);r.top-=this.parseStyle(i.marginTop),r.left-=this.parseStyle(i.marginLeft)}var a=this.offsetParent(o),l={top:0,left:0};return a!==t[0].documentElement&&(l=this.offset(a),l.top+=a.clientTop-a.scrollTop,l.left+=a.clientLeft-a.scrollLeft),{width:Math.round(angular.isNumber(r.width)?r.width:o.offsetWidth),height:Math.round(angular.isNumber(r.height)?r.height:o.offsetHeight),top:Math.round(r.top-l.top),left:Math.round(r.left-l.left)}},offset:function(o){o=this.getRawNode(o);var n=o.getBoundingClientRect();return{width:Math.round(angular.isNumber(n.width)?n.width:o.offsetWidth),height:Math.round(angular.isNumber(n.height)?n.height:o.offsetHeight),top:Math.round(n.top+(e.pageYOffset||t[0].documentElement.scrollTop)),left:Math.round(n.left+(e.pageXOffset||t[0].documentElement.scrollLeft))}},viewportOffset:function(o,n,r){o=this.getRawNode(o),r=r!==!1?!0:!1;var i=o.getBoundingClientRect(),a={top:0,left:0,bottom:0,right:0},l=n?t[0].documentElement:this.scrollParent(o),s=l.getBoundingClientRect();if(a.top=s.top+l.clientTop,a.left=s.left+l.clientLeft,l===t[0].documentElement&&(a.top+=e.pageYOffset,a.left+=e.pageXOffset),a.bottom=a.top+l.clientHeight,a.right=a.left+l.clientWidth,r){var d=e.getComputedStyle(l);a.top+=this.parseStyle(d.paddingTop),a.bottom-=this.parseStyle(d.paddingBottom),a.left+=this.parseStyle(d.paddingLeft),a.right-=this.parseStyle(d.paddingRight)}return{top:Math.round(i.top-a.top),bottom:Math.round(a.bottom-i.bottom),left:Math.round(i.left-a.left),right:Math.round(a.right-i.right)}},parsePlacement:function(t){var e=i.auto.test(t);return e&&(t=t.replace(i.auto,"")),t=t.split("-"),t[0]=t[0]||"top",i.primary.test(t[0])||(t[0]="top"),t[1]=t[1]||"center",i.secondary.test(t[1])||(t[1]="center"),t[2]=e?!0:!1,t},positionElements:function(t,o,n,r){t=this.getRawNode(t),o=this.getRawNode(o);var a=angular.isDefined(o.offsetWidth)?o.offsetWidth:o.prop("offsetWidth"),l=angular.isDefined(o.offsetHeight)?o.offsetHeight:o.prop("offsetHeight");n=this.parsePlacement(n);var s=r?this.offset(t):this.position(t),d={top:0,left:0,placement:""};if(n[2]){var u=this.viewportOffset(t,r),c=e.getComputedStyle(o),p={width:a+Math.round(Math.abs(this.parseStyle(c.marginLeft)+this.parseStyle(c.marginRight))),height:l+Math.round(Math.abs(this.parseStyle(c.marginTop)+this.parseStyle(c.marginBottom)))};if(n[0]="top"===n[0]&&p.height>u.top&&p.height<=u.bottom?"bottom":"bottom"===n[0]&&p.height>u.bottom&&p.height<=u.top?"top":"left"===n[0]&&p.width>u.left&&p.width<=u.right?"right":"right"===n[0]&&p.width>u.right&&p.width<=u.left?"left":n[0],n[1]="top"===n[1]&&p.height-s.height>u.bottom&&p.height-s.height<=u.top?"bottom":"bottom"===n[1]&&p.height-s.height>u.top&&p.height-s.height<=u.bottom?"top":"left"===n[1]&&p.width-s.width>u.right&&p.width-s.width<=u.left?"right":"right"===n[1]&&p.width-s.width>u.left&&p.width-s.width<=u.right?"left":n[1],"center"===n[1])if(i.vertical.test(n[0])){var f=s.width/2-a/2;u.left+f<0&&p.width-s.width<=u.right?n[1]="left":u.right+f<0&&p.width-s.width<=u.left&&(n[1]="right")}else{var m=s.height/2-p.height/2;u.top+m<0&&p.height-s.height<=u.bottom?n[1]="top":u.bottom+m<0&&p.height-s.height<=u.top&&(n[1]="bottom")}}switch(n[0]){case"top":d.top=s.top-l;break;case"bottom":d.top=s.top+s.height;break;case"left":d.left=s.left-a;break;case"right":d.left=s.left+s.width}switch(n[1]){case"top":d.top=s.top;break;case"bottom":d.top=s.top+s.height-l;break;case"left":d.left=s.left;break;case"right":d.left=s.left+s.width-a;break;case"center":i.vertical.test(n[0])?d.left=s.left+s.width/2-a/2:d.top=s.top+s.height/2-l/2}return d.top=Math.round(d.top),d.left=Math.round(d.left),d.placement="center"===n[1]?n[0]:n[0]+"-"+n[1],d},adjustTop:function(t,e,o,n){return-1!==t.indexOf("top")&&o!==n?{top:e.top-n+"px"}:void 0},positionArrow:function(t,o){t=this.getRawNode(t);var n=t.querySelector(".tooltip-inner, .popover-inner");if(n){var r=angular.element(n).hasClass("tooltip-inner"),a=t.querySelector(r?".tooltip-arrow":".arrow");if(a){var l={top:"",bottom:"",left:"",right:""};if(o=this.parsePlacement(o),"center"===o[1])return void angular.element(a).css(l);var s="border-"+o[0]+"-width",d=e.getComputedStyle(a)[s],u="border-";u+=i.vertical.test(o[0])?o[0]+"-"+o[1]:o[1]+"-"+o[0],u+="-radius";var c=e.getComputedStyle(r?n:t)[u];switch(o[0]){case"top":l.bottom=r?"0":"-"+d;break;case"bottom":l.top=r?"0":"-"+d;break;case"left":l.right=r?"0":"-"+d;break;case"right":l.left=r?"0":"-"+d}l[o[1]]=c,angular.element(a).css(l)}}}}}]),angular.module("ui.bootstrap.position").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibPositionCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute !important;top:-9999px !important;width:50px !important;height:50px !important;overflow:scroll !important;}.uib-position-body-scrollbar-measure{overflow:scroll !important;}</style>'),angular.$$uibPositionCss=!0});;
/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 2.5.0 - 2017-01-28
 * License: MIT
 */angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.modal","ui.bootstrap.multiMap","ui.bootstrap.stackedMap","ui.bootstrap.position"]),angular.module("ui.bootstrap.tpls",["uib/template/modal/window.html"]),angular.module("ui.bootstrap.modal",["ui.bootstrap.multiMap","ui.bootstrap.stackedMap","ui.bootstrap.position"]).provider("$uibResolve",function(){var t=this;this.resolver=null,this.setResolver=function(t){this.resolver=t},this.$get=["$injector","$q",function(e,o){var n=t.resolver?e.get(t.resolver):null;return{resolve:function(t,r,i,a){if(n)return n.resolve(t,r,i,a);var l=[];return angular.forEach(t,function(t){l.push(angular.isFunction(t)||angular.isArray(t)?o.resolve(e.invoke(t)):angular.isString(t)?o.resolve(e.get(t)):o.resolve(t))}),o.all(l).then(function(e){var o={},n=0;return angular.forEach(t,function(t,r){o[r]=e[n++]}),o})}}}]}).directive("uibModalBackdrop",["$animate","$injector","$uibModalStack",function(t,e,o){function n(e,n,r){r.modalInClass&&(t.addClass(n,r.modalInClass),e.$on(o.NOW_CLOSING_EVENT,function(o,i){var a=i();e.modalOptions.animation?t.removeClass(n,r.modalInClass).then(a):a()}))}return{restrict:"A",compile:function(t,e){return t.addClass(e.backdropClass),n}}}]).directive("uibModalWindow",["$uibModalStack","$q","$animateCss","$document",function(t,e,o,n){return{scope:{index:"@"},restrict:"A",transclude:!0,templateUrl:function(t,e){return e.templateUrl||"uib/template/modal/window.html"},link:function(r,i,a){i.addClass(a.windowTopClass||""),r.size=a.size,r.close=function(e){var o=t.getTop();o&&o.value.backdrop&&"static"!==o.value.backdrop&&e.target===e.currentTarget&&(e.preventDefault(),e.stopPropagation(),t.dismiss(o.key,"backdrop click"))},i.on("click",r.close),r.$isRendered=!0;var l=e.defer();r.$$postDigest(function(){l.resolve()}),l.promise.then(function(){var l=null;a.modalInClass&&(l=o(i,{addClass:a.modalInClass}).start(),r.$on(t.NOW_CLOSING_EVENT,function(t,e){var n=e();o(i,{removeClass:a.modalInClass}).start().then(n)})),e.when(l).then(function(){var e=t.getTop();if(e&&t.modalRendered(e.key),!n[0].activeElement||!i[0].contains(n[0].activeElement)){var o=i[0].querySelector("[autofocus]");o?o.focus():i[0].focus()}})})}}}]).directive("uibModalAnimationClass",function(){return{compile:function(t,e){e.modalAnimation&&t.addClass(e.uibModalAnimationClass)}}}).directive("uibModalTransclude",["$animate",function(t){return{link:function(e,o,n,r,i){i(e.$parent,function(e){o.empty(),t.enter(e,o)})}}}]).factory("$uibModalStack",["$animate","$animateCss","$document","$compile","$rootScope","$q","$$multiMap","$$stackedMap","$uibPosition",function(t,e,o,n,r,i,a,l,s){function d(t){var e="-";return t.replace(D,function(t,o){return(o?e:"")+t.toLowerCase()})}function u(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function c(){for(var t=-1,e=C.keys(),o=0;o<e.length;o++)C.get(e[o]).value.backdrop&&(t=o);return t>-1&&M>t&&(t=M),t}function p(t,e){var o=C.get(t).value,n=o.appendTo;C.remove(t),T=C.top(),T&&(M=parseInt(T.value.modalDomEl.attr("index"),10)),h(o.modalDomEl,o.modalScope,function(){var e=o.openedClass||k;S.remove(e,t);var r=S.hasKey(e);n.toggleClass(e,r),!r&&y&&y.heightOverflow&&y.scrollbarWidth&&(n.css(y.originalRight?{paddingRight:y.originalRight+"px"}:{paddingRight:""}),y=null),f(!0)},o.closedDeferred),m(),e&&e.focus?e.focus():n.focus&&n.focus()}function f(t){var e;C.length()>0&&(e=C.top().value,e.modalDomEl.toggleClass(e.windowTopClass||"",t))}function m(){if(w&&-1===c()){var t=$;h(w,$,function(){t=null}),w=void 0,$=void 0}}function h(e,o,n,r){function a(){a.done||(a.done=!0,t.leave(e).then(function(){n&&n(),e.remove(),r&&r.resolve()}),o.$destroy())}var l,s=null,d=function(){return l||(l=i.defer(),s=l.promise),function(){l.resolve()}};return o.$broadcast(E.NOW_CLOSING_EVENT,d),i.when(s).then(a)}function g(t){if(t.isDefaultPrevented())return t;var e=C.top();if(e)switch(t.which){case 27:e.value.keyboard&&(t.preventDefault(),r.$apply(function(){E.dismiss(e.key,"escape key press")}));break;case 9:var o=E.loadFocusElementList(e),n=!1;t.shiftKey?(E.isFocusInFirstItem(t,o)||E.isModalFocused(t,e))&&(n=E.focusLastFocusableElement(o)):E.isFocusInLastItem(t,o)&&(n=E.focusFirstFocusableElement(o)),n&&(t.preventDefault(),t.stopPropagation())}}function v(t,e,o){return!t.value.modalScope.$broadcast("modal.closing",e,o).defaultPrevented}function b(){Array.prototype.forEach.call(document.querySelectorAll("["+x+"]"),function(t){var e=parseInt(t.getAttribute(x),10),o=e-1;t.setAttribute(x,o),o||(t.removeAttribute(x),t.removeAttribute("aria-hidden"))})}var w,$,y,k="modal-open",C=l.createNew(),S=a.createNew(),E={NOW_CLOSING_EVENT:"modal.stack.now-closing"},M=0,T=null,x="data-bootstrap-modal-aria-hidden-count",N="a[href], area[href], input:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]",D=/[A-Z]/g;return r.$watch(c,function(t){$&&($.index=t)}),o.on("keydown",g),r.$on("$destroy",function(){o.off("keydown",g)}),E.open=function(e,i){function a(t){function e(t){var e=t.parent()?t.parent().children():[];return Array.prototype.filter.call(e,function(e){return e!==t[0]})}if(t&&"BODY"!==t[0].tagName)return e(t).forEach(function(t){var e="true"===t.getAttribute("aria-hidden"),o=parseInt(t.getAttribute(x),10);o||(o=e?1:0),t.setAttribute(x,o+1),t.setAttribute("aria-hidden","true")}),a(t.parent())}var l=o[0].activeElement,u=i.openedClass||k;f(!1),T=C.top(),C.add(e,{deferred:i.deferred,renderDeferred:i.renderDeferred,closedDeferred:i.closedDeferred,modalScope:i.scope,backdrop:i.backdrop,keyboard:i.keyboard,openedClass:i.openedClass,windowTopClass:i.windowTopClass,animation:i.animation,appendTo:i.appendTo}),S.put(u,e);var p=i.appendTo,m=c();m>=0&&!w&&($=r.$new(!0),$.modalOptions=i,$.index=m,w=angular.element('<div uib-modal-backdrop="modal-backdrop"></div>'),w.attr({"class":"modal-backdrop","ng-style":"{'z-index': 1040 + (index && 1 || 0) + index*10}","uib-modal-animation-class":"fade","modal-in-class":"in"}),i.backdropClass&&w.addClass(i.backdropClass),i.animation&&w.attr("modal-animation","true"),n(w)($),t.enter(w,p),s.isScrollable(p)&&(y=s.scrollbarPadding(p),y.heightOverflow&&y.scrollbarWidth&&p.css({paddingRight:y.right+"px"})));var h;i.component?(h=document.createElement(d(i.component.name)),h=angular.element(h),h.attr({resolve:"$resolve","modal-instance":"$uibModalInstance",close:"$close($value)",dismiss:"$dismiss($value)"})):h=i.content,M=T?parseInt(T.value.modalDomEl.attr("index"),10)+1:0;var g=angular.element('<div uib-modal-window="modal-window"></div>');g.attr({"class":"modal","template-url":i.windowTemplateUrl,"window-top-class":i.windowTopClass,role:"dialog","aria-labelledby":i.ariaLabelledBy,"aria-describedby":i.ariaDescribedBy,size:i.size,index:M,animate:"animate","ng-style":"{'z-index': 1050 + $$topModalIndex*10, display: 'block'}",tabindex:-1,"uib-modal-animation-class":"fade","modal-in-class":"in"}).append(h),i.windowClass&&g.addClass(i.windowClass),i.animation&&g.attr("modal-animation","true"),p.addClass(u),i.scope&&(i.scope.$$topModalIndex=M),t.enter(n(g)(i.scope),p),C.top().value.modalDomEl=g,C.top().value.modalOpener=l,a(g)},E.close=function(t,e){var o=C.get(t);return b(),o&&v(o,e,!0)?(o.value.modalScope.$$uibDestructionScheduled=!0,o.value.deferred.resolve(e),p(t,o.value.modalOpener),!0):!o},E.dismiss=function(t,e){var o=C.get(t);return b(),o&&v(o,e,!1)?(o.value.modalScope.$$uibDestructionScheduled=!0,o.value.deferred.reject(e),p(t,o.value.modalOpener),!0):!o},E.dismissAll=function(t){for(var e=this.getTop();e&&this.dismiss(e.key,t);)e=this.getTop()},E.getTop=function(){return C.top()},E.modalRendered=function(t){var e=C.get(t);e&&e.value.renderDeferred.resolve()},E.focusFirstFocusableElement=function(t){return t.length>0?(t[0].focus(),!0):!1},E.focusLastFocusableElement=function(t){return t.length>0?(t[t.length-1].focus(),!0):!1},E.isModalFocused=function(t,e){if(t&&e){var o=e.value.modalDomEl;if(o&&o.length)return(t.target||t.srcElement)===o[0]}return!1},E.isFocusInFirstItem=function(t,e){return e.length>0?(t.target||t.srcElement)===e[0]:!1},E.isFocusInLastItem=function(t,e){return e.length>0?(t.target||t.srcElement)===e[e.length-1]:!1},E.loadFocusElementList=function(t){if(t){var e=t.value.modalDomEl;if(e&&e.length){var o=e[0].querySelectorAll(N);return o?Array.prototype.filter.call(o,function(t){return u(t)}):o}}},E}]).provider("$uibModal",function(){var t={options:{animation:!0,backdrop:!0,keyboard:!0},$get:["$rootScope","$q","$document","$templateRequest","$controller","$uibResolve","$uibModalStack",function(e,o,n,r,i,a,l){function s(t){return t.template?o.when(t.template):r(angular.isFunction(t.templateUrl)?t.templateUrl():t.templateUrl)}var d={},u=null;return d.getPromiseChain=function(){return u},d.open=function(r){function d(){return g}var c=o.defer(),p=o.defer(),f=o.defer(),m=o.defer(),h={result:c.promise,opened:p.promise,closed:f.promise,rendered:m.promise,close:function(t){return l.close(h,t)},dismiss:function(t){return l.dismiss(h,t)}};if(r=angular.extend({},t.options,r),r.resolve=r.resolve||{},r.appendTo=r.appendTo||n.find("body").eq(0),!r.appendTo.length)throw new Error("appendTo element not found. Make sure that the element passed is in DOM.");if(!r.component&&!r.template&&!r.templateUrl)throw new Error("One of component or template or templateUrl options is required.");var g;g=r.component?o.when(a.resolve(r.resolve,{},null,null)):o.all([s(r),a.resolve(r.resolve,{},null,null)]);var v;return v=u=o.all([u]).then(d,d).then(function(t){function o(e,o,n,r){e.$scope=a,e.$scope.$resolve={},n?e.$scope.$uibModalInstance=h:e.$uibModalInstance=h;var i=o?t[1]:t;angular.forEach(i,function(t,o){r&&(e[o]=t),e.$scope.$resolve[o]=t})}var n=r.scope||e,a=n.$new();a.$close=h.close,a.$dismiss=h.dismiss,a.$on("$destroy",function(){a.$$uibDestructionScheduled||a.$dismiss("$uibUnscheduledDestruction")});var s,d,u={scope:a,deferred:c,renderDeferred:m,closedDeferred:f,animation:r.animation,backdrop:r.backdrop,keyboard:r.keyboard,backdropClass:r.backdropClass,windowTopClass:r.windowTopClass,windowClass:r.windowClass,windowTemplateUrl:r.windowTemplateUrl,ariaLabelledBy:r.ariaLabelledBy,ariaDescribedBy:r.ariaDescribedBy,size:r.size,openedClass:r.openedClass,appendTo:r.appendTo},g={},v={};r.component?(o(g,!1,!0,!1),g.name=r.component,u.component=g):r.controller&&(o(v,!0,!1,!0),d=i(r.controller,v,!0,r.controllerAs),r.controllerAs&&r.bindToController&&(s=d.instance,s.$close=a.$close,s.$dismiss=a.$dismiss,angular.extend(s,{$resolve:v.$scope.$resolve},n)),s=d(),angular.isFunction(s.$onInit)&&s.$onInit()),r.component||(u.content=t[0]),l.open(h,u),p.resolve(!0)},function(t){p.reject(t),c.reject(t)})["finally"](function(){u===v&&(u=null)}),h},d}]};return t}),angular.module("ui.bootstrap.multiMap",[]).factory("$$multiMap",function(){return{createNew:function(){var t={};return{entries:function(){return Object.keys(t).map(function(e){return{key:e,value:t[e]}})},get:function(e){return t[e]},hasKey:function(e){return!!t[e]},keys:function(){return Object.keys(t)},put:function(e,o){t[e]||(t[e]=[]),t[e].push(o)},remove:function(e,o){var n=t[e];if(n){var r=n.indexOf(o);-1!==r&&n.splice(r,1),n.length||delete t[e]}}}}}}),angular.module("ui.bootstrap.stackedMap",[]).factory("$$stackedMap",function(){return{createNew:function(){var t=[];return{add:function(e,o){t.push({key:e,value:o})},get:function(e){for(var o=0;o<t.length;o++)if(e===t[o].key)return t[o]},keys:function(){for(var e=[],o=0;o<t.length;o++)e.push(t[o].key);return e},top:function(){return t[t.length-1]},remove:function(e){for(var o=-1,n=0;n<t.length;n++)if(e===t[n].key){o=n;break}return t.splice(o,1)[0]},removeTop:function(){return t.pop()},length:function(){return t.length}}}}}),angular.module("ui.bootstrap.position",[]).factory("$uibPosition",["$document","$window",function(t,e){var o,n,r={normal:/(auto|scroll)/,hidden:/(auto|scroll|hidden)/},i={auto:/\s?auto?\s?/i,primary:/^(top|bottom|left|right)$/,secondary:/^(top|bottom|left|right|center)$/,vertical:/^(top|bottom)$/},a=/(HTML|BODY)/;return{getRawNode:function(t){return t.nodeName?t:t[0]||t},parseStyle:function(t){return t=parseFloat(t),isFinite(t)?t:0},offsetParent:function(o){function n(t){return"static"===(e.getComputedStyle(t).position||"static")}o=this.getRawNode(o);for(var r=o.offsetParent||t[0].documentElement;r&&r!==t[0].documentElement&&n(r);)r=r.offsetParent;return r||t[0].documentElement},scrollbarWidth:function(r){if(r){if(angular.isUndefined(n)){var i=t.find("body");i.addClass("uib-position-body-scrollbar-measure"),n=e.innerWidth-i[0].clientWidth,n=isFinite(n)?n:0,i.removeClass("uib-position-body-scrollbar-measure")}return n}if(angular.isUndefined(o)){var a=angular.element('<div class="uib-position-scrollbar-measure"></div>');t.find("body").append(a),o=a[0].offsetWidth-a[0].clientWidth,o=isFinite(o)?o:0,a.remove()}return o},scrollbarPadding:function(t){t=this.getRawNode(t);var o=e.getComputedStyle(t),n=this.parseStyle(o.paddingRight),r=this.parseStyle(o.paddingBottom),i=this.scrollParent(t,!1,!0),l=this.scrollbarWidth(a.test(i.tagName));return{scrollbarWidth:l,widthOverflow:i.scrollWidth>i.clientWidth,right:n+l,originalRight:n,heightOverflow:i.scrollHeight>i.clientHeight,bottom:r+l,originalBottom:r}},isScrollable:function(t,o){t=this.getRawNode(t);var n=o?r.hidden:r.normal,i=e.getComputedStyle(t);return n.test(i.overflow+i.overflowY+i.overflowX)},scrollParent:function(o,n,i){o=this.getRawNode(o);var a=n?r.hidden:r.normal,l=t[0].documentElement,s=e.getComputedStyle(o);if(i&&a.test(s.overflow+s.overflowY+s.overflowX))return o;var d="absolute"===s.position,u=o.parentElement||l;if(u===l||"fixed"===s.position)return l;for(;u.parentElement&&u!==l;){var c=e.getComputedStyle(u);if(d&&"static"!==c.position&&(d=!1),!d&&a.test(c.overflow+c.overflowY+c.overflowX))break;u=u.parentElement}return u},position:function(o,n){o=this.getRawNode(o);var r=this.offset(o);if(n){var i=e.getComputedStyle(o);r.top-=this.parseStyle(i.marginTop),r.left-=this.parseStyle(i.marginLeft)}var a=this.offsetParent(o),l={top:0,left:0};return a!==t[0].documentElement&&(l=this.offset(a),l.top+=a.clientTop-a.scrollTop,l.left+=a.clientLeft-a.scrollLeft),{width:Math.round(angular.isNumber(r.width)?r.width:o.offsetWidth),height:Math.round(angular.isNumber(r.height)?r.height:o.offsetHeight),top:Math.round(r.top-l.top),left:Math.round(r.left-l.left)}},offset:function(o){o=this.getRawNode(o);var n=o.getBoundingClientRect();return{width:Math.round(angular.isNumber(n.width)?n.width:o.offsetWidth),height:Math.round(angular.isNumber(n.height)?n.height:o.offsetHeight),top:Math.round(n.top+(e.pageYOffset||t[0].documentElement.scrollTop)),left:Math.round(n.left+(e.pageXOffset||t[0].documentElement.scrollLeft))}},viewportOffset:function(o,n,r){o=this.getRawNode(o),r=r!==!1?!0:!1;var i=o.getBoundingClientRect(),a={top:0,left:0,bottom:0,right:0},l=n?t[0].documentElement:this.scrollParent(o),s=l.getBoundingClientRect();if(a.top=s.top+l.clientTop,a.left=s.left+l.clientLeft,l===t[0].documentElement&&(a.top+=e.pageYOffset,a.left+=e.pageXOffset),a.bottom=a.top+l.clientHeight,a.right=a.left+l.clientWidth,r){var d=e.getComputedStyle(l);a.top+=this.parseStyle(d.paddingTop),a.bottom-=this.parseStyle(d.paddingBottom),a.left+=this.parseStyle(d.paddingLeft),a.right-=this.parseStyle(d.paddingRight)}return{top:Math.round(i.top-a.top),bottom:Math.round(a.bottom-i.bottom),left:Math.round(i.left-a.left),right:Math.round(a.right-i.right)}},parsePlacement:function(t){var e=i.auto.test(t);return e&&(t=t.replace(i.auto,"")),t=t.split("-"),t[0]=t[0]||"top",i.primary.test(t[0])||(t[0]="top"),t[1]=t[1]||"center",i.secondary.test(t[1])||(t[1]="center"),t[2]=e?!0:!1,t},positionElements:function(t,o,n,r){t=this.getRawNode(t),o=this.getRawNode(o);var a=angular.isDefined(o.offsetWidth)?o.offsetWidth:o.prop("offsetWidth"),l=angular.isDefined(o.offsetHeight)?o.offsetHeight:o.prop("offsetHeight");n=this.parsePlacement(n);var s=r?this.offset(t):this.position(t),d={top:0,left:0,placement:""};if(n[2]){var u=this.viewportOffset(t,r),c=e.getComputedStyle(o),p={width:a+Math.round(Math.abs(this.parseStyle(c.marginLeft)+this.parseStyle(c.marginRight))),height:l+Math.round(Math.abs(this.parseStyle(c.marginTop)+this.parseStyle(c.marginBottom)))};if(n[0]="top"===n[0]&&p.height>u.top&&p.height<=u.bottom?"bottom":"bottom"===n[0]&&p.height>u.bottom&&p.height<=u.top?"top":"left"===n[0]&&p.width>u.left&&p.width<=u.right?"right":"right"===n[0]&&p.width>u.right&&p.width<=u.left?"left":n[0],n[1]="top"===n[1]&&p.height-s.height>u.bottom&&p.height-s.height<=u.top?"bottom":"bottom"===n[1]&&p.height-s.height>u.top&&p.height-s.height<=u.bottom?"top":"left"===n[1]&&p.width-s.width>u.right&&p.width-s.width<=u.left?"right":"right"===n[1]&&p.width-s.width>u.left&&p.width-s.width<=u.right?"left":n[1],"center"===n[1])if(i.vertical.test(n[0])){var f=s.width/2-a/2;u.left+f<0&&p.width-s.width<=u.right?n[1]="left":u.right+f<0&&p.width-s.width<=u.left&&(n[1]="right")}else{var m=s.height/2-p.height/2;u.top+m<0&&p.height-s.height<=u.bottom?n[1]="top":u.bottom+m<0&&p.height-s.height<=u.top&&(n[1]="bottom")}}switch(n[0]){case"top":d.top=s.top-l;break;case"bottom":d.top=s.top+s.height;break;case"left":d.left=s.left-a;break;case"right":d.left=s.left+s.width}switch(n[1]){case"top":d.top=s.top;break;case"bottom":d.top=s.top+s.height-l;break;case"left":d.left=s.left;break;case"right":d.left=s.left+s.width-a;break;case"center":i.vertical.test(n[0])?d.left=s.left+s.width/2-a/2:d.top=s.top+s.height/2-l/2}return d.top=Math.round(d.top),d.left=Math.round(d.left),d.placement="center"===n[1]?n[0]:n[0]+"-"+n[1],d},adjustTop:function(t,e,o,n){return-1!==t.indexOf("top")&&o!==n?{top:e.top-n+"px"}:void 0},positionArrow:function(t,o){t=this.getRawNode(t);var n=t.querySelector(".tooltip-inner, .popover-inner");if(n){var r=angular.element(n).hasClass("tooltip-inner"),a=t.querySelector(r?".tooltip-arrow":".arrow");if(a){var l={top:"",bottom:"",left:"",right:""};if(o=this.parsePlacement(o),"center"===o[1])return void angular.element(a).css(l);var s="border-"+o[0]+"-width",d=e.getComputedStyle(a)[s],u="border-";u+=i.vertical.test(o[0])?o[0]+"-"+o[1]:o[1]+"-"+o[0],u+="-radius";var c=e.getComputedStyle(r?n:t)[u];switch(o[0]){case"top":l.bottom=r?"0":"-"+d;break;case"bottom":l.top=r?"0":"-"+d;break;case"left":l.right=r?"0":"-"+d;break;case"right":l.left=r?"0":"-"+d}l[o[1]]=c,angular.element(a).css(l)}}}}}]),angular.module("uib/template/modal/window.html",[]).run(["$templateCache",function(t){t.put("uib/template/modal/window.html","<div class=\"modal-dialog {{size ? 'modal-' + size : ''}}\"><div class=\"modal-content\" uib-modal-transclude></div></div>\n")}]),angular.module("ui.bootstrap.position").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibPositionCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute !important;top:-9999px !important;width:50px !important;height:50px !important;overflow:scroll !important;}.uib-position-body-scrollbar-measure{overflow:scroll !important;}</style>'),angular.$$uibPositionCss=!0});;
/**
 * @license angular-recaptcha build:2018-07-30
 * https://github.com/vividcortex/angular-recaptcha
 * Copyright (c) 2018 VividCortex
**/


!function(a){"use strict";a.module("vcRecaptcha",[])}(angular),function(a){"use strict";function b(){throw new Error('You need to set the "key" attribute to your public reCaptcha key. If you don\'t have a key, please get one from https://www.google.com/recaptcha/admin/create')}a.module("vcRecaptcha").provider("vcRecaptchaService",function(){var c=this,d={};c.onLoadFunctionName="vcRecaptchaApiLoaded",c.setDefaults=function(b){a.copy(b,d)},c.setSiteKey=function(a){d.key=a},c.setTheme=function(a){d.theme=a},c.setStoken=function(a){d.stoken=a},c.setSize=function(a){d.size=a},c.setType=function(a){d.type=a},c.setLang=function(a){d.lang=a},c.setBadge=function(a){d.badge=a},c.setOnLoadFunctionName=function(a){c.onLoadFunctionName=a},c.$get=["$rootScope","$window","$q","$document","$interval",function(e,f,g,h,i){function j(){return m?g.when(m):o}function k(){if(!m)throw new Error("reCaptcha has not been loaded yet.")}function l(){return a.isFunction((f.grecaptcha||{}).render)}var m,n=g.defer(),o=n.promise,p={};f.vcRecaptchaApiLoadedCallback=f.vcRecaptchaApiLoadedCallback||[];var q=function(){m=f.grecaptcha,n.resolve(m)};if(f.vcRecaptchaApiLoadedCallback.push(q),f[c.onLoadFunctionName]=function(){f.vcRecaptchaApiLoadedCallback.forEach(function(a){a()})},l())q();else if(f.document.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]'))var r=i(function(){l()&&(i.cancel(r),q())},25);else{var s=f.document.createElement("script");s.async=!0,s.defer=!0,s.src="https://www.google.com/recaptcha/api.js?onload="+c.onLoadFunctionName+"&render=explicit",h.find("body")[0].appendChild(s)}return{create:function(a,c){return c.sitekey=c.key||d.key,c.theme=c.theme||d.theme,c.stoken=c.stoken||d.stoken,c.size=c.size||d.size,c.type=c.type||d.type,c.hl=c.lang||d.lang,c.badge=c.badge||d.badge,c.sitekey||b(),j().then(function(b){var d=b.render(a,c);return p[d]=a,d})},reload:function(a){k(),m.reset(a),e.$broadcast("reCaptchaReset",a)},execute:function(a){k(),m.execute(a)},useLang:function(a,b){var c=p[a];if(!c)throw new Error("reCaptcha Widget ID not exists",a);var d=c.querySelector("iframe");if(!b)return d&&d.src&&/[?&]hl=\w+/.test(d.src)?d.src.replace(/.+[?&]hl=(\w+)([^\w].+)?/,"$1"):null;if(d&&d.src){var e=d.src;/[?&]hl=/.test(e)?e=e.replace(/([?&]hl=)\w+/,"$1"+b):e+=(-1===e.indexOf("?")?"?":"&")+"hl="+b,d.src=e}},getResponse:function(a){return k(),m.getResponse(a)},getInstance:function(a){return p[a]},destroy:function(a){delete p[a]}}}]})}(angular),function(a){"use strict";a.module("vcRecaptcha").directive("vcRecaptcha",["$document","$timeout","vcRecaptchaService",function(b,c,d){return{restrict:"A",require:"?^^form",scope:{response:"=?ngModel",key:"=?",stoken:"=?",theme:"=?",size:"=?",type:"=?",lang:"=?",badge:"=?",tabindex:"=?",required:"=?",onCreate:"&",onSuccess:"&",onExpire:"&",onError:"&"},link:function(e,f,g,h){function i(){h&&h.$setValidity("recaptcha",null),m()}function j(){c(function(){e.response="",l(),e.onExpire({widgetId:e.widgetId})})}function k(){var a=arguments;c(function(){e.response="",l(),e.onError({widgetId:e.widgetId,arguments:a})})}function l(){h&&h.$setValidity("recaptcha",!1===e.required?null:Boolean(e.response))}function m(){d.destroy(e.widgetId),a.element(b[0].querySelectorAll(".pls-container")).parent().remove()}e.widgetId=null,h&&a.isDefined(g.required)&&e.$watch("required",l);var n=e.$watch("key",function(b){var h=function(a){c(function(){e.response=a,l(),e.onSuccess({response:a,widgetId:e.widgetId})})};d.create(f[0],{callback:h,key:b,stoken:e.stoken||g.stoken||null,theme:e.theme||g.theme||null,type:e.type||g.type||null,lang:e.lang||g.lang||null,tabindex:e.tabindex||g.tabindex||null,size:e.size||g.size||null,badge:e.badge||g.badge||null,"expired-callback":j,"error-callback":g.onError?k:void 0}).then(function(b){l(),e.widgetId=b,e.onCreate({widgetId:b}),e.$on("$destroy",i),e.$on("reCaptchaReset",function(c,d){(a.isUndefined(d)||b===d)&&(e.response="",l())})}),n()})}}}])}(angular);;
/*global angular, DocumentTouch*/

(function () {
  'use strict';

  var magnify = angular.module('ngMagnify', []);

  magnify.directive('ngMagnify', function () {
    return {
      restrict: 'EA',
      replace: true,
      template: '<div class="magnify-container" data-ng-style="getContainerStyle()">' +
                  '<div class="magnify-glass" data-ng-style="getGlassStyle()"></div>' +
                  '<img class="magnify-image" data-ng-src="{{ imageSrc }}"/>' +
                '</div>',
      scope: {
        imageSrc: '@',
        imageWidth: '=',
        imageHeight: '=',
        glassWidth: '=',
        glassHeight: '='
      },
      link: function (scope, element) {
        var glass = element.find('div'),
          image = element.find('img'),
          el, nWidth, nHeight, magnifyCSS;

        // if touch devices, do something
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          return;
        }
        element.on('mousemove', function (evt) {
          el = angular.extend(scope.getOffset(element[0]), {
            width: element[0].offsetWidth,
            height: element[0].offsetHeight,
            imageWidth: image[0].offsetWidth,
            imageHeight: image[0].offsetHeight,
            glassWidth: glass[0].offsetWidth,
            glassHeight: glass[0].offsetHeight
          });
          magnifyCSS = scope.magnify(evt);

          if (magnifyCSS) {
            glass.css( magnifyCSS );
          }
        })
        .on('mouseout', function () {
          glass.on('mouseleave', function () {
            glass.css({
              opacity: 0,
              filter: 'alpha(opacity=0)'
            });
          });
        });

        scope.magnify = function (evt) {
          var mx, my, rx, ry, px, py, bgp, img;

          if (!nWidth && !nHeight) {
            img = new Image();
            img.onload = function () {
              nWidth = img.width;
              nHeight = img.height;
            };
            img.src = scope.imageSrc;
          } else {
            // IE8 uses evt.x and evt.y
            mx = (evt.pageX) ? (evt.pageX - el.left) : evt.x;
            my = (evt.pageY) ? (evt.pageY - el.top) : evt.y;

            if (mx < el.width && my < el.height && mx > 0 && my > 0) {
              glass.css({
                opacity: 1,
                'z-index': 1,
                filter: 'alpha(opacity=100)'
              });
            } else {
              glass.css({
                opacity: 0,
                'z-index': -1,
                filter: 'alpha(opacity=0)'
              });
              return;
            }

            rx = Math.round(mx/el.imageWidth*nWidth - el.glassWidth/2)*-1;
            ry = Math.round(my/el.imageHeight*nHeight - el.glassHeight/2)*-1;
            bgp = rx + 'px ' + ry + 'px';

            px = mx - el.glassWidth/2;
            py = my - el.glassHeight/2;

            return { left: px+'px', top: py+'px', backgroundPosition: bgp };
          }
          return;
        };

        scope.getOffset = function (_el) {
          var de = document.documentElement;
          var box = _el.getBoundingClientRect();
          var top = box.top + window.pageYOffset - de.clientTop;
          var left = box.left + window.pageXOffset - de.clientLeft;
          return { top: top, left: left };
        };

        scope.getContainerStyle = function () {
          return {
            width: (scope.imageWidth) ? scope.imageWidth + 'px' : '',
            height: (scope.imageHeight) ? scope.imageHeight + 'px' : ''
          };
        };

        scope.getGlassStyle = function () {
          return {
            background: 'url("' + scope.imageSrc + '") no-repeat',
            width: (scope.glassWidth) ? scope.glassWidth + 'px' : '',
            height: (scope.glassHeight) ? scope.glassHeight + 'px' : ''
          };
        };
      }
    };
  });
})();
;
/**
 * sifter.js
 * Copyright (c) 2013 Brian Reavis & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@thirdroute.com>
 */

(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define('sifter', factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.Sifter = factory();
	}
}(this, function() {

	/**
	 * Textually searches arrays and hashes of objects
	 * by property (or multiple properties). Designed
	 * specifically for autocomplete.
	 *
	 * @constructor
	 * @param {array|object} items
	 * @param {object} items
	 */
	var Sifter = function(items, settings) {
		this.items = items;
		this.settings = settings || {diacritics: true};
	};

	/**
	 * Splits a search string into an array of individual
	 * regexps to be used to match results.
	 *
	 * @param {string} query
	 * @returns {array}
	 */
	Sifter.prototype.tokenize = function(query) {
		query = trim(String(query || '').toLowerCase());
		if (!query || !query.length) return [];

		var i, n, regex, letter;
		var tokens = [];
		var words = query.split(/ +/);

		for (i = 0, n = words.length; i < n; i++) {
			regex = escape_regex(words[i]);
			if (this.settings.diacritics) {
				for (letter in DIACRITICS) {
					if (DIACRITICS.hasOwnProperty(letter)) {
						regex = regex.replace(new RegExp(letter, 'g'), DIACRITICS[letter]);
					}
				}
			}
			tokens.push({
				string : words[i],
				regex  : new RegExp(regex, 'i')
			});
		}

		return tokens;
	};

	/**
	 * Iterates over arrays and hashes.
	 *
	 * ```
	 * this.iterator(this.items, function(item, id) {
	 *    // invoked for each item
	 * });
	 * ```
	 *
	 * @param {array|object} object
	 */
	Sifter.prototype.iterator = function(object, callback) {
		var iterator;
		if (is_array(object)) {
			iterator = Array.prototype.forEach || function(callback) {
				for (var i = 0, n = this.length; i < n; i++) {
					callback(this[i], i, this);
				}
			};
		} else {
			iterator = function(callback) {
				for (var key in this) {
					if (this.hasOwnProperty(key)) {
						callback(this[key], key, this);
					}
				}
			};
		}

		iterator.apply(object, [callback]);
	};

	/**
	 * Returns a function to be used to score individual results.
	 *
	 * Good matches will have a higher score than poor matches.
	 * If an item is not a match, 0 will be returned by the function.
	 *
	 * @param {object|string} search
	 * @param {object} options (optional)
	 * @returns {function}
	 */
	Sifter.prototype.getScoreFunction = function(search, options) {
		var self, fields, tokens, token_count;

		self        = this;
		search      = self.prepareSearch(search, options);
		tokens      = search.tokens;
		fields      = search.options.fields;
		token_count = tokens.length;

		/**
		 * Calculates how close of a match the
		 * given value is against a search token.
		 *
		 * @param {mixed} value
		 * @param {object} token
		 * @return {number}
		 */
		var scoreValue = function(value, token) {
			var score, pos;

			if (!value) return 0;
			value = String(value || '');
			pos = value.search(token.regex);
			if (pos === -1) return 0;
			score = token.string.length / value.length;
			if (pos === 0) score += 0.5;
			return score;
		};

		/**
		 * Calculates the score of an object
		 * against the search query.
		 *
		 * @param {object} token
		 * @param {object} data
		 * @return {number}
		 */
		var scoreObject = (function() {
			var field_count = fields.length;
			if (!field_count) {
				return function() { return 0; };
			}
			if (field_count === 1) {
				return function(token, data) {
					return scoreValue(data[fields[0]], token);
				};
			}
			return function(token, data) {
				for (var i = 0, sum = 0; i < field_count; i++) {
					sum += scoreValue(data[fields[i]], token);
				}
				return sum / field_count;
			};
		})();

		if (!token_count) {
			return function() { return 0; };
		}
		if (token_count === 1) {
			return function(data) {
				return scoreObject(tokens[0], data);
			};
		}

		if (search.options.conjunction === 'and') {
			return function(data) {
				var score;
				for (var i = 0, sum = 0; i < token_count; i++) {
					score = scoreObject(tokens[i], data);
					if (score <= 0) return 0;
					sum += score;
				}
				return sum / token_count;
			};
		} else {
			return function(data) {
				for (var i = 0, sum = 0; i < token_count; i++) {
					sum += scoreObject(tokens[i], data);
				}
				return sum / token_count;
			};
		}
	};

	/**
	 * Returns a function that can be used to compare two
	 * results, for sorting purposes. If no sorting should
	 * be performed, `null` will be returned.
	 *
	 * @param {string|object} search
	 * @param {object} options
	 * @return function(a,b)
	 */
	Sifter.prototype.getSortFunction = function(search, options) {
		var i, n, self, field, fields, fields_count, multiplier, multipliers, get_field, implicit_score, sort;

		self   = this;
		search = self.prepareSearch(search, options);
		sort   = (!search.query && options.sort_empty) || options.sort;

		/**
		 * Fetches the specified sort field value
		 * from a search result item.
		 *
		 * @param  {string} name
		 * @param  {object} result
		 * @return {mixed}
		 */
		get_field = function(name, result) {
			if (name === '$score') return result.score;
			return self.items[result.id][name];
		};

		// parse options
		fields = [];
		if (sort) {
			for (i = 0, n = sort.length; i < n; i++) {
				if (search.query || sort[i].field !== '$score') {
					fields.push(sort[i]);
				}
			}
		}

		// the "$score" field is implied to be the primary
		// sort field, unless it's manually specified
		if (search.query) {
			implicit_score = true;
			for (i = 0, n = fields.length; i < n; i++) {
				if (fields[i].field === '$score') {
					implicit_score = false;
					break;
				}
			}
			if (implicit_score) {
				fields.unshift({field: '$score', direction: 'desc'});
			}
		} else {
			for (i = 0, n = fields.length; i < n; i++) {
				if (fields[i].field === '$score') {
					fields.splice(i, 1);
					break;
				}
			}
		}

		multipliers = [];
		for (i = 0, n = fields.length; i < n; i++) {
			multipliers.push(fields[i].direction === 'desc' ? -1 : 1);
		}

		// build function
		fields_count = fields.length;
		if (!fields_count) {
			return null;
		} else if (fields_count === 1) {
			field = fields[0].field;
			multiplier = multipliers[0];
			return function(a, b) {
				return multiplier * cmp(
					get_field(field, a),
					get_field(field, b)
				);
			};
		} else {
			return function(a, b) {
				var i, result, a_value, b_value, field;
				for (i = 0; i < fields_count; i++) {
					field = fields[i].field;
					result = multipliers[i] * cmp(
						get_field(field, a),
						get_field(field, b)
					);
					if (result) return result;
				}
				return 0;
			};
		}
	};

	/**
	 * Parses a search query and returns an object
	 * with tokens and fields ready to be populated
	 * with results.
	 *
	 * @param {string} query
	 * @param {object} options
	 * @returns {object}
	 */
	Sifter.prototype.prepareSearch = function(query, options) {
		if (typeof query === 'object') return query;

		options = extend({}, options);

		var option_fields     = options.fields;
		var option_sort       = options.sort;
		var option_sort_empty = options.sort_empty;

		if (option_fields && !is_array(option_fields)) options.fields = [option_fields];
		if (option_sort && !is_array(option_sort)) options.sort = [option_sort];
		if (option_sort_empty && !is_array(option_sort_empty)) options.sort_empty = [option_sort_empty];

		return {
			options : options,
			query   : String(query || '').toLowerCase(),
			tokens  : this.tokenize(query),
			total   : 0,
			items   : []
		};
	};

	/**
	 * Searches through all items and returns a sorted array of matches.
	 *
	 * The `options` parameter can contain:
	 *
	 *   - fields {string|array}
	 *   - sort {array}
	 *   - score {function}
	 *   - filter {bool}
	 *   - limit {integer}
	 *
	 * Returns an object containing:
	 *
	 *   - options {object}
	 *   - query {string}
	 *   - tokens {array}
	 *   - total {int}
	 *   - items {array}
	 *
	 * @param {string} query
	 * @param {object} options
	 * @returns {object}
	 */
	Sifter.prototype.search = function(query, options) {
		var self = this, value, score, search, calculateScore;
		var fn_sort;
		var fn_score;

		search  = this.prepareSearch(query, options);
		options = search.options;
		query   = search.query;

		// generate result scoring function
		fn_score = options.score || self.getScoreFunction(search);

		// perform search and sort
		if (query.length) {
			self.iterator(self.items, function(item, id) {
				score = fn_score(item);
				if (options.filter === false || score > 0) {
					search.items.push({'score': score, 'id': id});
				}
			});
		} else {
			self.iterator(self.items, function(item, id) {
				search.items.push({'score': 1, 'id': id});
			});
		}

		fn_sort = self.getSortFunction(search, options);
		if (fn_sort) search.items.sort(fn_sort);

		// apply limits
		search.total = search.items.length;
		if (typeof options.limit === 'number') {
			search.items = search.items.slice(0, options.limit);
		}

		return search;
	};

	// utilities
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	var cmp = function(a, b) {
		if (typeof a === 'number' && typeof b === 'number') {
			return a > b ? 1 : (a < b ? -1 : 0);
		}
		a = asciifold(String(a || ''));
		b = asciifold(String(b || ''));
		if (a > b) return 1;
		if (b > a) return -1;
		return 0;
	};

	var extend = function(a, b) {
		var i, n, k, object;
		for (i = 1, n = arguments.length; i < n; i++) {
			object = arguments[i];
			if (!object) continue;
			for (k in object) {
				if (object.hasOwnProperty(k)) {
					a[k] = object[k];
				}
			}
		}
		return a;
	};

	var trim = function(str) {
		return (str + '').replace(/^\s+|\s+$|/g, '');
	};

	var escape_regex = function(str) {
		return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
	};

	var is_array = Array.isArray || ($ && $.isArray) || function(object) {
		return Object.prototype.toString.call(object) === '[object Array]';
	};

	var DIACRITICS = {
		'a': '[aÀÁÂÃÄÅàáâãäåĀāąĄ]',
		'c': '[cÇçćĆčČ]',
		'd': '[dđĐďĎ]',
		'e': '[eÈÉÊËèéêëěĚĒēęĘ]',
		'i': '[iÌÍÎÏìíîïĪī]',
		'l': '[lłŁ]',
		'n': '[nÑñňŇńŃ]',
		'o': '[oÒÓÔÕÕÖØòóôõöøŌō]',
		'r': '[rřŘ]',
		's': '[sŠšśŚ]',
		't': '[tťŤ]',
		'u': '[uÙÚÛÜùúûüůŮŪū]',
		'y': '[yŸÿýÝ]',
		'z': '[zŽžżŻźŹ]'
	};

	var asciifold = (function() {
		var i, n, k, chunk;
		var foreignletters = '';
		var lookup = {};
		for (k in DIACRITICS) {
			if (DIACRITICS.hasOwnProperty(k)) {
				chunk = DIACRITICS[k].substring(2, DIACRITICS[k].length - 1);
				foreignletters += chunk;
				for (i = 0, n = chunk.length; i < n; i++) {
					lookup[chunk.charAt(i)] = k;
				}
			}
		}
		var regexp = new RegExp('[' +  foreignletters + ']', 'g');
		return function(str) {
			return str.replace(regexp, function(foreignletter) {
				return lookup[foreignletter];
			}).toLowerCase();
		};
	})();


	// export
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	return Sifter;
}));



/**
 * microplugin.js
 * Copyright (c) 2013 Brian Reavis & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@thirdroute.com>
 */

(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define('microplugin', factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.MicroPlugin = factory();
	}
}(this, function() {
	var MicroPlugin = {};

	MicroPlugin.mixin = function(Interface) {
		Interface.plugins = {};

		/**
		 * Initializes the listed plugins (with options).
		 * Acceptable formats:
		 *
		 * List (without options):
		 *   ['a', 'b', 'c']
		 *
		 * List (with options):
		 *   [{'name': 'a', options: {}}, {'name': 'b', options: {}}]
		 *
		 * Hash (with options):
		 *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
		 *
		 * @param {mixed} plugins
		 */
		Interface.prototype.initializePlugins = function(plugins) {
			var i, n, key;
			var self  = this;
			var queue = [];

			self.plugins = {
				names     : [],
				settings  : {},
				requested : {},
				loaded    : {}
			};

			if (utils.isArray(plugins)) {
				for (i = 0, n = plugins.length; i < n; i++) {
					if (typeof plugins[i] === 'string') {
						queue.push(plugins[i]);
					} else {
						self.plugins.settings[plugins[i].name] = plugins[i].options;
						queue.push(plugins[i].name);
					}
				}
			} else if (plugins) {
				for (key in plugins) {
					if (plugins.hasOwnProperty(key)) {
						self.plugins.settings[key] = plugins[key];
						queue.push(key);
					}
				}
			}

			while (queue.length) {
				self.require(queue.shift());
			}
		};

		Interface.prototype.loadPlugin = function(name) {
			var self    = this;
			var plugins = self.plugins;
			var plugin  = Interface.plugins[name];

			if (!Interface.plugins.hasOwnProperty(name)) {
				throw new Error('Unable to find "' +  name + '" plugin');
			}

			plugins.requested[name] = true;
			plugins.loaded[name] = plugin.fn.apply(self, [self.plugins.settings[name] || {}]);
			plugins.names.push(name);
		};

		/**
		 * Initializes a plugin.
		 *
		 * @param {string} name
		 */
		Interface.prototype.require = function(name) {
			var self = this;
			var plugins = self.plugins;

			if (!self.plugins.loaded.hasOwnProperty(name)) {
				if (plugins.requested[name]) {
					throw new Error('Plugin has circular dependency ("' + name + '")');
				}
				self.loadPlugin(name);
			}

			return plugins.loaded[name];
		};

		/**
		 * Registers a plugin.
		 *
		 * @param {string} name
		 * @param {function} fn
		 */
		Interface.define = function(name, fn) {
			Interface.plugins[name] = {
				'name' : name,
				'fn'   : fn
			};
		};
	};

	var utils = {
		isArray: Array.isArray || function(vArg) {
			return Object.prototype.toString.call(vArg) === '[object Array]';
		}
	};

	return MicroPlugin;
}));

/**
 * selectize.js (v0.12.1)
 * Copyright (c) 2013–2015 Brian Reavis & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@thirdroute.com>
 */

/*jshint curly:false */
/*jshint browser:true */

(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define('selectize', ['jquery','sifter','microplugin'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'), require('sifter'), require('microplugin'));
	} else {
		root.Selectize = factory(root.jQuery, root.Sifter, root.MicroPlugin);
	}
}(this, function($, Sifter, MicroPlugin) {
	'use strict';

	var highlight = function($element, pattern) {
		if (typeof pattern === 'string' && !pattern.length) return;
		var regex = (typeof pattern === 'string') ? new RegExp(pattern, 'i') : pattern;
	
		var highlight = function(node) {
			var skip = 0;
			if (node.nodeType === 3) {
				var pos = node.data.search(regex);
				if (pos >= 0 && node.data.length > 0) {
					var match = node.data.match(regex);
					var spannode = document.createElement('span');
					spannode.className = 'highlight';
					var middlebit = node.splitText(pos);
					var endbit = middlebit.splitText(match[0].length);
					var middleclone = middlebit.cloneNode(true);
					spannode.appendChild(middleclone);
					middlebit.parentNode.replaceChild(spannode, middlebit);
					skip = 1;
				}
			} else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
				for (var i = 0; i < node.childNodes.length; ++i) {
					i += highlight(node.childNodes[i]);
				}
			}
			return skip;
		};
	
		return $element.each(function() {
			highlight(this);
		});
	};
	
	var MicroEvent = function() {};
	MicroEvent.prototype = {
		on: function(event, fct){
			this._events = this._events || {};
			this._events[event] = this._events[event] || [];
			this._events[event].push(fct);
		},
		off: function(event, fct){
			var n = arguments.length;
			if (n === 0) return delete this._events;
			if (n === 1) return delete this._events[event];
	
			this._events = this._events || {};
			if (event in this._events === false) return;
			this._events[event].splice(this._events[event].indexOf(fct), 1);
		},
		trigger: function(event /* , args... */){
			this._events = this._events || {};
			if (event in this._events === false) return;
			for (var i = 0; i < this._events[event].length; i++){
				this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
			}
		}
	};
	
	/**
	 * Mixin will delegate all MicroEvent.js function in the destination object.
	 *
	 * - MicroEvent.mixin(Foobar) will make Foobar able to use MicroEvent
	 *
	 * @param {object} the object which will support MicroEvent
	 */
	MicroEvent.mixin = function(destObject){
		var props = ['on', 'off', 'trigger'];
		for (var i = 0; i < props.length; i++){
			destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
		}
	};
	
	var IS_MAC        = /Mac/.test(navigator.userAgent);
	
	var KEY_A         = 65;
	var KEY_COMMA     = 188;
	var KEY_RETURN    = 13;
	var KEY_ESC       = 27;
	var KEY_LEFT      = 37;
	var KEY_UP        = 38;
	var KEY_P         = 80;
	var KEY_RIGHT     = 39;
	var KEY_DOWN      = 40;
	var KEY_N         = 78;
	var KEY_BACKSPACE = 8;
	var KEY_DELETE    = 46;
	var KEY_SHIFT     = 16;
	var KEY_CMD       = IS_MAC ? 91 : 17;
	var KEY_CTRL      = IS_MAC ? 18 : 17;
	var KEY_TAB       = 9;
	
	var TAG_SELECT    = 1;
	var TAG_INPUT     = 2;
	
	// for now, android support in general is too spotty to support validity
	var SUPPORTS_VALIDITY_API = !/android/i.test(window.navigator.userAgent) && !!document.createElement('form').validity;
	
	var isset = function(object) {
		return typeof object !== 'undefined';
	};
	
	/**
	 * Converts a scalar to its best string representation
	 * for hash keys and HTML attribute values.
	 *
	 * Transformations:
	 *   'str'     -> 'str'
	 *   null      -> ''
	 *   undefined -> ''
	 *   true      -> '1'
	 *   false     -> '0'
	 *   0         -> '0'
	 *   1         -> '1'
	 *
	 * @param {string} value
	 * @returns {string|null}
	 */
	var hash_key = function(value) {
		if (typeof value === 'undefined' || value === null) return null;
		if (typeof value === 'boolean') return value ? '1' : '0';
		return value + '';
	};
	
	/**
	 * Escapes a string for use within HTML.
	 *
	 * @param {string} str
	 * @returns {string}
	 */
	var escape_html = function(str) {
		return (str + '')
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	};
	
	/**
	 * Escapes "$" characters in replacement strings.
	 *
	 * @param {string} str
	 * @returns {string}
	 */
	var escape_replace = function(str) {
		return (str + '').replace(/\$/g, '$$$$');
	};
	
	var hook = {};
	
	/**
	 * Wraps `method` on `self` so that `fn`
	 * is invoked before the original method.
	 *
	 * @param {object} self
	 * @param {string} method
	 * @param {function} fn
	 */
	hook.before = function(self, method, fn) {
		var original = self[method];
		self[method] = function() {
			fn.apply(self, arguments);
			return original.apply(self, arguments);
		};
	};
	
	/**
	 * Wraps `method` on `self` so that `fn`
	 * is invoked after the original method.
	 *
	 * @param {object} self
	 * @param {string} method
	 * @param {function} fn
	 */
	hook.after = function(self, method, fn) {
		var original = self[method];
		self[method] = function() {
			var result = original.apply(self, arguments);
			fn.apply(self, arguments);
			return result;
		};
	};
	
	/**
	 * Wraps `fn` so that it can only be invoked once.
	 *
	 * @param {function} fn
	 * @returns {function}
	 */
	var once = function(fn) {
		var called = false;
		return function() {
			if (called) return;
			called = true;
			fn.apply(this, arguments);
		};
	};
	
	/**
	 * Wraps `fn` so that it can only be called once
	 * every `delay` milliseconds (invoked on the falling edge).
	 *
	 * @param {function} fn
	 * @param {int} delay
	 * @returns {function}
	 */
	var debounce = function(fn, delay) {
		var timeout;
		return function() {
			var self = this;
			var args = arguments;
			window.clearTimeout(timeout);
			timeout = window.setTimeout(function() {
				fn.apply(self, args);
			}, delay);
		};
	};
	
	/**
	 * Debounce all fired events types listed in `types`
	 * while executing the provided `fn`.
	 *
	 * @param {object} self
	 * @param {array} types
	 * @param {function} fn
	 */
	var debounce_events = function(self, types, fn) {
		var type;
		var trigger = self.trigger;
		var event_args = {};
	
		// override trigger method
		self.trigger = function() {
			var type = arguments[0];
			if (types.indexOf(type) !== -1) {
				event_args[type] = arguments;
			} else {
				return trigger.apply(self, arguments);
			}
		};
	
		// invoke provided function
		fn.apply(self, []);
		self.trigger = trigger;
	
		// trigger queued events
		for (type in event_args) {
			if (event_args.hasOwnProperty(type)) {
				trigger.apply(self, event_args[type]);
			}
		}
	};
	
	/**
	 * A workaround for http://bugs.jquery.com/ticket/6696
	 *
	 * @param {object} $parent - Parent element to listen on.
	 * @param {string} event - Event name.
	 * @param {string} selector - Descendant selector to filter by.
	 * @param {function} fn - Event handler.
	 */
	var watchChildEvent = function($parent, event, selector, fn) {
		$parent.on(event, selector, function(e) {
			var child = e.target;
			while (child && child.parentNode !== $parent[0]) {
				child = child.parentNode;
			}
			e.currentTarget = child;
			return fn.apply(this, [e]);
		});
	};
	
	/**
	 * Determines the current selection within a text input control.
	 * Returns an object containing:
	 *   - start
	 *   - length
	 *
	 * @param {object} input
	 * @returns {object}
	 */
	var getSelection = function(input) {
		var result = {};
		if ('selectionStart' in input) {
			result.start = input.selectionStart;
			result.length = input.selectionEnd - result.start;
		} else if (document.selection) {
			input.focus();
			var sel = document.selection.createRange();
			var selLen = document.selection.createRange().text.length;
			sel.moveStart('character', -input.value.length);
			result.start = sel.text.length - selLen;
			result.length = selLen;
		}
		return result;
	};
	
	/**
	 * Copies CSS properties from one element to another.
	 *
	 * @param {object} $from
	 * @param {object} $to
	 * @param {array} properties
	 */
	var transferStyles = function($from, $to, properties) {
		var i, n, styles = {};
		if (properties) {
			for (i = 0, n = properties.length; i < n; i++) {
				styles[properties[i]] = $from.css(properties[i]);
			}
		} else {
			styles = $from.css();
		}
		$to.css(styles);
	};
	
	/**
	 * Measures the width of a string within a
	 * parent element (in pixels).
	 *
	 * @param {string} str
	 * @param {object} $parent
	 * @returns {int}
	 */
	var measureString = function(str, $parent) {
		if (!str) {
			return 0;
		}
	
		var $test = $('<test>').css({
			position: 'absolute',
			top: -99999,
			left: -99999,
			width: 'auto',
			padding: 0,
			whiteSpace: 'pre'
		}).text(str).appendTo('body');
	
		transferStyles($parent, $test, [
			'letterSpacing',
			'fontSize',
			'fontFamily',
			'fontWeight',
			'textTransform'
		]);
	
		var width = $test.width();
		$test.remove();
	
		return width;
	};
	
	/**
	 * Sets up an input to grow horizontally as the user
	 * types. If the value is changed manually, you can
	 * trigger the "update" handler to resize:
	 *
	 * $input.trigger('update');
	 *
	 * @param {object} $input
	 */
	var autoGrow = function($input) {
		var currentWidth = null;
	
		var update = function(e, options) {
			var value, keyCode, printable, placeholder, width;
			var shift, character, selection;
			e = e || window.event || {};
			options = options || {};
	
			if (e.metaKey || e.altKey) return;
			if (!options.force && $input.data('grow') === false) return;
	
			value = $input.val();
			if (e.type && e.type.toLowerCase() === 'keydown') {
				keyCode = e.keyCode;
				printable = (
					(keyCode >= 97 && keyCode <= 122) || // a-z
					(keyCode >= 65 && keyCode <= 90)  || // A-Z
					(keyCode >= 48 && keyCode <= 57)  || // 0-9
					keyCode === 32 // space
				);
	
				if (keyCode === KEY_DELETE || keyCode === KEY_BACKSPACE) {
					selection = getSelection($input[0]);
					if (selection.length) {
						value = value.substring(0, selection.start) + value.substring(selection.start + selection.length);
					} else if (keyCode === KEY_BACKSPACE && selection.start) {
						value = value.substring(0, selection.start - 1) + value.substring(selection.start + 1);
					} else if (keyCode === KEY_DELETE && typeof selection.start !== 'undefined') {
						value = value.substring(0, selection.start) + value.substring(selection.start + 1);
					}
				} else if (printable) {
					shift = e.shiftKey;
					character = String.fromCharCode(e.keyCode);
					if (shift) character = character.toUpperCase();
					else character = character.toLowerCase();
					value += character;
				}
			}
	
			placeholder = $input.attr('placeholder');
			if (!value && placeholder) {
				value = placeholder;
			}
	
			width = measureString(value, $input) + 4;
			if (width !== currentWidth) {
				currentWidth = width;
				$input.width(width);
				$input.triggerHandler('resize');
			}
		};
	
		$input.on('keydown keyup update blur', update);
		update();
	};
	
	var Selectize = function($input, settings) {
		var key, i, n, dir, input, self = this;
		input = $input[0];
		input.selectize = self;
	
		// detect rtl environment
		var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
		dir = computedStyle ? computedStyle.getPropertyValue('direction') : input.currentStyle && input.currentStyle.direction;
		dir = dir || $input.parents('[dir]:first').attr('dir') || '';
	
		// setup default state
		$.extend(self, {
			order            : 0,
			settings         : settings,
			$input           : $input,
			tabIndex         : $input.attr('tabindex') || '',
			tagType          : input.tagName.toLowerCase() === 'select' ? TAG_SELECT : TAG_INPUT,
			rtl              : /rtl/i.test(dir),
	
			eventNS          : '.selectize' + (++Selectize.count),
			highlightedValue : null,
			isOpen           : false,
			isDisabled       : false,
			isRequired       : $input.is('[required]'),
			isInvalid        : false,
			isLocked         : false,
			isFocused        : false,
			isInputHidden    : false,
			isSetup          : false,
			isShiftDown      : false,
			isCmdDown        : false,
			isCtrlDown       : false,
			ignoreFocus      : false,
			ignoreBlur       : false,
			ignoreHover      : false,
			hasOptions       : false,
			currentResults   : null,
			lastValue        : '',
			caretPos         : 0,
			loading          : 0,
			loadedSearches   : {},
	
			$activeOption    : null,
			$activeItems     : [],
	
			optgroups        : {},
			options          : {},
			userOptions      : {},
			items            : [],
			renderCache      : {},
			onSearchChange   : settings.loadThrottle === null ? self.onSearchChange : debounce(self.onSearchChange, settings.loadThrottle)
		});
	
		// search system
		self.sifter = new Sifter(this.options, {diacritics: settings.diacritics});
	
		// build options table
		if (self.settings.options) {
			for (i = 0, n = self.settings.options.length; i < n; i++) {
				self.registerOption(self.settings.options[i]);
			}
			delete self.settings.options;
		}
	
		// build optgroup table
		if (self.settings.optgroups) {
			for (i = 0, n = self.settings.optgroups.length; i < n; i++) {
				self.registerOptionGroup(self.settings.optgroups[i]);
			}
			delete self.settings.optgroups;
		}
	
		// option-dependent defaults
		self.settings.mode = self.settings.mode || (self.settings.maxItems === 1 ? 'single' : 'multi');
		if (typeof self.settings.hideSelected !== 'boolean') {
			self.settings.hideSelected = self.settings.mode === 'multi';
		}
	
		self.initializePlugins(self.settings.plugins);
		self.setupCallbacks();
		self.setupTemplates();
		self.setup();
	};
	
	// mixins
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	MicroEvent.mixin(Selectize);
	MicroPlugin.mixin(Selectize);
	
	// methods
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	$.extend(Selectize.prototype, {
	
		/**
		 * Creates all elements and sets up event bindings.
		 */
		setup: function() {
			var self      = this;
			var settings  = self.settings;
			var eventNS   = self.eventNS;
			var $window   = $(window);
			var $document = $(document);
			var $input    = self.$input;
	
			var $wrapper;
			var $control;
			var $control_input;
			var $dropdown;
			var $dropdown_content;
			var $dropdown_parent;
			var inputMode;
			var timeout_blur;
			var timeout_focus;
			var classes;
			var classes_plugins;
	
			inputMode         = self.settings.mode;
			classes           = $input.attr('class') || '';
	
			$wrapper          = $('<div>').addClass(settings.wrapperClass).addClass(classes).addClass(inputMode);
			$control          = $('<div>').addClass(settings.inputClass).addClass('items').appendTo($wrapper);
			$control_input    = $('<input type="text" autocomplete="off" />').appendTo($control).attr('tabindex', $input.is(':disabled') ? '-1' : self.tabIndex);
			$dropdown_parent  = $(settings.dropdownParent || $wrapper);
			$dropdown         = $('<div>').addClass(settings.dropdownClass).addClass(inputMode).hide().appendTo($dropdown_parent);
			$dropdown_content = $('<div>').addClass(settings.dropdownContentClass).appendTo($dropdown);
	
			if(self.settings.copyClassesToDropdown) {
				$dropdown.addClass(classes);
			}
	
			$wrapper.css({
				width: $input[0].style.width
			});
	
			if (self.plugins.names.length) {
				classes_plugins = 'plugin-' + self.plugins.names.join(' plugin-');
				$wrapper.addClass(classes_plugins);
				$dropdown.addClass(classes_plugins);
			}
	
			if ((settings.maxItems === null || settings.maxItems > 1) && self.tagType === TAG_SELECT) {
				$input.attr('multiple', 'multiple');
			}
	
			if (self.settings.placeholder) {
				$control_input.attr('placeholder', settings.placeholder);
			}
	
			// if splitOn was not passed in, construct it from the delimiter to allow pasting universally
			if (!self.settings.splitOn && self.settings.delimiter) {
				var delimiterEscaped = self.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
				self.settings.splitOn = new RegExp('\\s*' + delimiterEscaped + '+\\s*');
			}
	
			if ($input.attr('autocorrect')) {
				$control_input.attr('autocorrect', $input.attr('autocorrect'));
			}
	
			if ($input.attr('autocapitalize')) {
				$control_input.attr('autocapitalize', $input.attr('autocapitalize'));
			}
	
			self.$wrapper          = $wrapper;
			self.$control          = $control;
			self.$control_input    = $control_input;
			self.$dropdown         = $dropdown;
			self.$dropdown_content = $dropdown_content;
	
			$dropdown.on('mouseenter', '[data-selectable]', function() { return self.onOptionHover.apply(self, arguments); });
			$dropdown.on('mousedown click', '[data-selectable]', function() { return self.onOptionSelect.apply(self, arguments); });
			watchChildEvent($control, 'mousedown', '*:not(input)', function() { return self.onItemSelect.apply(self, arguments); });
			autoGrow($control_input);
	
			$control.on({
				mousedown : function() { return self.onMouseDown.apply(self, arguments); },
				click     : function() { return self.onClick.apply(self, arguments); }
			});
	
			$control_input.on({
				mousedown : function(e) { e.stopPropagation(); },
				keydown   : function() { return self.onKeyDown.apply(self, arguments); },
				keyup     : function() { return self.onKeyUp.apply(self, arguments); },
				keypress  : function() { return self.onKeyPress.apply(self, arguments); },
				resize    : function() { self.positionDropdown.apply(self, []); },
				blur      : function() { return self.onBlur.apply(self, arguments); },
				focus     : function() { self.ignoreBlur = false; return self.onFocus.apply(self, arguments); },
				paste     : function() { return self.onPaste.apply(self, arguments); }
			});
	
			$document.on('keydown' + eventNS, function(e) {
				self.isCmdDown = e[IS_MAC ? 'metaKey' : 'ctrlKey'];
				self.isCtrlDown = e[IS_MAC ? 'altKey' : 'ctrlKey'];
				self.isShiftDown = e.shiftKey;
			});
	
			$document.on('keyup' + eventNS, function(e) {
				if (e.keyCode === KEY_CTRL) self.isCtrlDown = false;
				if (e.keyCode === KEY_SHIFT) self.isShiftDown = false;
				if (e.keyCode === KEY_CMD) self.isCmdDown = false;
			});
	
			$document.on('mousedown' + eventNS, function(e) {
				if (self.isFocused) {
					// prevent events on the dropdown scrollbar from causing the control to blur
					if (e.target === self.$dropdown[0] || e.target.parentNode === self.$dropdown[0]) {
						return false;
					}
					// blur on click outside
					if (!self.$control.has(e.target).length && e.target !== self.$control[0]) {
						self.blur(e.target);
					}
				}
			});
	
			$window.on(['scroll' + eventNS, 'resize' + eventNS].join(' '), function() {
				if (self.isOpen) {
					self.positionDropdown.apply(self, arguments);
				}
			});
			$window.on('mousemove' + eventNS, function() {
				self.ignoreHover = false;
			});
	
			// store original children and tab index so that they can be
			// restored when the destroy() method is called.
			this.revertSettings = {
				$children : $input.children().detach(),
				tabindex  : $input.attr('tabindex')
			};
	
			$input.attr('tabindex', -1).hide().after(self.$wrapper);
	
			if ($.isArray(settings.items)) {
				self.setValue(settings.items);
				delete settings.items;
			}
	
			// feature detect for the validation API
			if (SUPPORTS_VALIDITY_API) {
				$input.on('invalid' + eventNS, function(e) {
					e.preventDefault();
					self.isInvalid = true;
					self.refreshState();
				});
			}
	
			self.updateOriginalInput();
			self.refreshItems();
			self.refreshState();
			self.updatePlaceholder();
			self.isSetup = true;
	
			if ($input.is(':disabled')) {
				self.disable();
			}
	
			self.on('change', this.onChange);
	
			$input.data('selectize', self);
			$input.addClass('selectized');
			self.trigger('initialize');
	
			// preload options
			if (settings.preload === true) {
				self.onSearchChange('');
			}
	
		},
	
		/**
		 * Sets up default rendering functions.
		 */
		setupTemplates: function() {
			var self = this;
			var field_label = self.settings.labelField;
			var field_optgroup = self.settings.optgroupLabelField;
	
			var templates = {
				'optgroup': function(data) {
					return '<div class="optgroup">' + data.html + '</div>';
				},
				'optgroup_header': function(data, escape) {
					return '<div class="optgroup-header">' + escape(data[field_optgroup]) + '</div>';
				},
				'option': function(data, escape) {
					return '<div class="option">' + escape(data[field_label]) + '</div>';
				},
				'item': function(data, escape) {
					return '<div class="item">' + escape(data[field_label]) + '</div>';
				},
				'option_create': function(data, escape) {
					return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&hellip;</div>';
				}
			};
	
			self.settings.render = $.extend({}, templates, self.settings.render);
		},
	
		/**
		 * Maps fired events to callbacks provided
		 * in the settings used when creating the control.
		 */
		setupCallbacks: function() {
			var key, fn, callbacks = {
				'initialize'      : 'onInitialize',
				'change'          : 'onChange',
				'item_add'        : 'onItemAdd',
				'item_remove'     : 'onItemRemove',
				'clear'           : 'onClear',
				'option_add'      : 'onOptionAdd',
				'option_remove'   : 'onOptionRemove',
				'option_clear'    : 'onOptionClear',
				'optgroup_add'    : 'onOptionGroupAdd',
				'optgroup_remove' : 'onOptionGroupRemove',
				'optgroup_clear'  : 'onOptionGroupClear',
				'dropdown_open'   : 'onDropdownOpen',
				'dropdown_close'  : 'onDropdownClose',
				'type'            : 'onType',
				'load'            : 'onLoad',
				'focus'           : 'onFocus',
				'blur'            : 'onBlur'
			};
	
			for (key in callbacks) {
				if (callbacks.hasOwnProperty(key)) {
					fn = this.settings[callbacks[key]];
					if (fn) this.on(key, fn);
				}
			}
		},
	
		/**
		 * Triggered when the main control element
		 * has a click event.
		 *
		 * @param {object} e
		 * @return {boolean}
		 */
		onClick: function(e) {
			var self = this;
	
			// necessary for mobile webkit devices (manual focus triggering
			// is ignored unless invoked within a click event)
			if (!self.isFocused) {
				self.focus();
				e.preventDefault();
			}
		},
	
		/**
		 * Triggered when the main control element
		 * has a mouse down event.
		 *
		 * @param {object} e
		 * @return {boolean}
		 */
		onMouseDown: function(e) {
			var self = this;
			var defaultPrevented = e.isDefaultPrevented();
			var $target = $(e.target);
	
			if (self.isFocused) {
				// retain focus by preventing native handling. if the
				// event target is the input it should not be modified.
				// otherwise, text selection within the input won't work.
				if (e.target !== self.$control_input[0]) {
					if (self.settings.mode === 'single') {
						// toggle dropdown
						self.isOpen ? self.close() : self.open();
					} else if (!defaultPrevented) {
						self.setActiveItem(null);
					}
					return false;
				}
			} else {
				// give control focus
				if (!defaultPrevented) {
					window.setTimeout(function() {
						self.focus();
					}, 0);
				}
			}
		},
	
		/**
		 * Triggered when the value of the control has been changed.
		 * This should propagate the event to the original DOM
		 * input / select element.
		 */
		onChange: function() {
			this.$input.trigger('change');
		},
	
		/**
		 * Triggered on <input> paste.
		 *
		 * @param {object} e
		 * @returns {boolean}
		 */
		onPaste: function(e) {
			var self = this;
			if (self.isFull() || self.isInputHidden || self.isLocked) {
				e.preventDefault();
			} else {
				// If a regex or string is included, this will split the pasted
				// input and create Items for each separate value
				if (self.settings.splitOn) {
					setTimeout(function() {
						var splitInput = $.trim(self.$control_input.val() || '').split(self.settings.splitOn);
						for (var i = 0, n = splitInput.length; i < n; i++) {
							self.createItem(splitInput[i]);
						}
					}, 0);
				}
			}
		},
	
		/**
		 * Triggered on <input> keypress.
		 *
		 * @param {object} e
		 * @returns {boolean}
		 */
		onKeyPress: function(e) {
			if (this.isLocked) return e && e.preventDefault();
			var character = String.fromCharCode(e.keyCode || e.which);
			if (this.settings.create && this.settings.mode === 'multi' && character === this.settings.delimiter) {
				this.createItem();
				e.preventDefault();
				return false;
			}
		},
	
		/**
		 * Triggered on <input> keydown.
		 *
		 * @param {object} e
		 * @returns {boolean}
		 */
		onKeyDown: function(e) {
			var isInput = e.target === this.$control_input[0];
			var self = this;
	
			if (self.isLocked) {
				if (e.keyCode !== KEY_TAB) {
					e.preventDefault();
				}
				return;
			}
	
			switch (e.keyCode) {
				case KEY_A:
					if (self.isCmdDown) {
						self.selectAll();
						return;
					}
					break;
				case KEY_ESC:
					if (self.isOpen) {
						e.preventDefault();
						e.stopPropagation();
						self.close();
					}
					return;
				case KEY_N:
					if (!e.ctrlKey || e.altKey) break;
				case KEY_DOWN:
					if (!self.isOpen && self.hasOptions) {
						self.open();
					} else if (self.$activeOption) {
						self.ignoreHover = true;
						var $next = self.getAdjacentOption(self.$activeOption, 1);
						if ($next.length) self.setActiveOption($next, true, true);
					}
					e.preventDefault();
					return;
				case KEY_P:
					if (!e.ctrlKey || e.altKey) break;
				case KEY_UP:
					if (self.$activeOption) {
						self.ignoreHover = true;
						var $prev = self.getAdjacentOption(self.$activeOption, -1);
						if ($prev.length) self.setActiveOption($prev, true, true);
					}
					e.preventDefault();
					return;
				case KEY_RETURN:
					if (self.isOpen && self.$activeOption) {
						self.onOptionSelect({currentTarget: self.$activeOption});
						e.preventDefault();
					}
					return;
				case KEY_LEFT:
					self.advanceSelection(-1, e);
					return;
				case KEY_RIGHT:
					self.advanceSelection(1, e);
					return;
				case KEY_TAB:
					if (self.settings.selectOnTab && self.isOpen && self.$activeOption) {
						self.onOptionSelect({currentTarget: self.$activeOption});
	
						// Default behaviour is to jump to the next field, we only want this
						// if the current field doesn't accept any more entries
						if (!self.isFull()) {
							e.preventDefault();
						}
					}
					if (self.settings.create && self.createItem()) {
						e.preventDefault();
					}
					return;
				case KEY_BACKSPACE:
				case KEY_DELETE:
					self.deleteSelection(e);
					return;
			}
	
			if ((self.isFull() || self.isInputHidden) && !(IS_MAC ? e.metaKey : e.ctrlKey)) {
				e.preventDefault();
				return;
			}
		},
	
		/**
		 * Triggered on <input> keyup.
		 *
		 * @param {object} e
		 * @returns {boolean}
		 */
		onKeyUp: function(e) {
			var self = this;
	
			if (self.isLocked) return e && e.preventDefault();
			var value = self.$control_input.val() || '';
			if (self.lastValue !== value) {
				self.lastValue = value;
				self.onSearchChange(value);
				self.refreshOptions();
				self.trigger('type', value);
			}
		},
	
		/**
		 * Invokes the user-provide option provider / loader.
		 *
		 * Note: this function is debounced in the Selectize
		 * constructor (by `settings.loadDelay` milliseconds)
		 *
		 * @param {string} value
		 */
		onSearchChange: function(value) {
			var self = this;
			var fn = self.settings.load;
			if (!fn) return;
			if (self.loadedSearches.hasOwnProperty(value)) return;
			self.loadedSearches[value] = true;
			self.load(function(callback) {
				fn.apply(self, [value, callback]);
			});
		},
	
		/**
		 * Triggered on <input> focus.
		 *
		 * @param {object} e (optional)
		 * @returns {boolean}
		 */
		onFocus: function(e) {
			var self = this;
			var wasFocused = self.isFocused;
	
			if (self.isDisabled) {
				self.blur();
				e && e.preventDefault();
				return false;
			}
	
			if (self.ignoreFocus) return;
			self.isFocused = true;
			if (self.settings.preload === 'focus') self.onSearchChange('');
	
			if (!wasFocused) self.trigger('focus');
	
			if (!self.$activeItems.length) {
				self.showInput();
				self.setActiveItem(null);
				self.refreshOptions(!!self.settings.openOnFocus);
			}
	
			self.refreshState();
		},
	
		/**
		 * Triggered on <input> blur.
		 *
		 * @param {object} e
		 * @param {Element} dest
		 */
		onBlur: function(e, dest) {
			var self = this;
			if (!self.isFocused) return;
			self.isFocused = false;
	
			if (self.ignoreFocus) {
				return;
			} else if (!self.ignoreBlur && document.activeElement === self.$dropdown_content[0]) {
				// necessary to prevent IE closing the dropdown when the scrollbar is clicked
				self.ignoreBlur = true;
				self.onFocus(e);
				return;
			}
	
			var deactivate = function() {
				self.close();
				self.setTextboxValue('');
				self.setActiveItem(null);
				self.setActiveOption(null);
				self.setCaret(self.items.length);
				self.refreshState();
	
				// IE11 bug: element still marked as active
				(dest || document.body).focus();
	
				self.ignoreFocus = false;
				self.trigger('blur');
			};
	
			self.ignoreFocus = true;
			if (self.settings.create && self.settings.createOnBlur) {
				self.createItem(null, false, deactivate);
			} else {
				deactivate();
			}
		},
	
		/**
		 * Triggered when the user rolls over
		 * an option in the autocomplete dropdown menu.
		 *
		 * @param {object} e
		 * @returns {boolean}
		 */
		onOptionHover: function(e) {
			if (this.ignoreHover) return;
			this.setActiveOption(e.currentTarget, false);
		},
	
		/**
		 * Triggered when the user clicks on an option
		 * in the autocomplete dropdown menu.
		 *
		 * @param {object} e
		 * @returns {boolean}
		 */
		onOptionSelect: function(e) {
			var value, $target, $option, self = this;
	
			if (e.preventDefault) {
				e.preventDefault();
				e.stopPropagation();
			}
	
			$target = $(e.currentTarget);
			if ($target.hasClass('create')) {
				self.createItem(null, function() {
					if (self.settings.closeAfterSelect) {
						self.close();
					}
				});
			} else {
				value = $target.attr('data-value');
				if (typeof value !== 'undefined') {
					self.lastQuery = null;
					self.setTextboxValue('');
					self.addItem(value);
					if (self.settings.closeAfterSelect) {
						self.close();
					} else if (!self.settings.hideSelected && e.type && /mouse/.test(e.type)) {
						self.setActiveOption(self.getOption(value));
					}
				}
			}
		},
	
		/**
		 * Triggered when the user clicks on an item
		 * that has been selected.
		 *
		 * @param {object} e
		 * @returns {boolean}
		 */
		onItemSelect: function(e) {
			var self = this;
	
			if (self.isLocked) return;
			if (self.settings.mode === 'multi') {
				e.preventDefault();
				self.setActiveItem(e.currentTarget, e);
			}
		},
	
		/**
		 * Invokes the provided method that provides
		 * results to a callback---which are then added
		 * as options to the control.
		 *
		 * @param {function} fn
		 */
		load: function(fn) {
			var self = this;
			var $wrapper = self.$wrapper.addClass(self.settings.loadingClass);
	
			self.loading++;
			fn.apply(self, [function(results) {
				self.loading = Math.max(self.loading - 1, 0);
				if (results && results.length) {
					self.addOption(results);
					self.refreshOptions(self.isFocused && !self.isInputHidden);
				}
				if (!self.loading) {
					$wrapper.removeClass(self.settings.loadingClass);
				}
				self.trigger('load', results);
			}]);
		},
	
		/**
		 * Sets the input field of the control to the specified value.
		 *
		 * @param {string} value
		 */
		setTextboxValue: function(value) {
			var $input = this.$control_input;
			var changed = $input.val() !== value;
			if (changed) {
				$input.val(value).triggerHandler('update');
				this.lastValue = value;
			}
		},
	
		/**
		 * Returns the value of the control. If multiple items
		 * can be selected (e.g. <select multiple>), this returns
		 * an array. If only one item can be selected, this
		 * returns a string.
		 *
		 * @returns {mixed}
		 */
		getValue: function() {
			if (this.tagType === TAG_SELECT && this.$input.attr('multiple')) {
				return this.items;
			} else {
				return this.items.join(this.settings.delimiter);
			}
		},
	
		/**
		 * Resets the selected items to the given value.
		 *
		 * @param {mixed} value
		 */
		setValue: function(value, silent) {
			var events = silent ? [] : ['change'];
	
			debounce_events(this, events, function() {
				this.clear(silent);
				this.addItems(value, silent);
			});
		},
	
		/**
		 * Sets the selected item.
		 *
		 * @param {object} $item
		 * @param {object} e (optional)
		 */
		setActiveItem: function($item, e) {
			var self = this;
			var eventName;
			var i, idx, begin, end, item, swap;
			var $last;
	
			if (self.settings.mode === 'single') return;
			$item = $($item);
	
			// clear the active selection
			if (!$item.length) {
				$(self.$activeItems).removeClass('active');
				self.$activeItems = [];
				if (self.isFocused) {
					self.showInput();
				}
				return;
			}
	
			// modify selection
			eventName = e && e.type.toLowerCase();
	
			if (eventName === 'mousedown' && self.isShiftDown && self.$activeItems.length) {
				$last = self.$control.children('.active:last');
				begin = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$last[0]]);
				end   = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$item[0]]);
				if (begin > end) {
					swap  = begin;
					begin = end;
					end   = swap;
				}
				for (i = begin; i <= end; i++) {
					item = self.$control[0].childNodes[i];
					if (self.$activeItems.indexOf(item) === -1) {
						$(item).addClass('active');
						self.$activeItems.push(item);
					}
				}
				e.preventDefault();
			} else if ((eventName === 'mousedown' && self.isCtrlDown) || (eventName === 'keydown' && this.isShiftDown)) {
				if ($item.hasClass('active')) {
					idx = self.$activeItems.indexOf($item[0]);
					self.$activeItems.splice(idx, 1);
					$item.removeClass('active');
				} else {
					self.$activeItems.push($item.addClass('active')[0]);
				}
			} else {
				$(self.$activeItems).removeClass('active');
				self.$activeItems = [$item.addClass('active')[0]];
			}
	
			// ensure control has focus
			self.hideInput();
			if (!this.isFocused) {
				self.focus();
			}
		},
	
		/**
		 * Sets the selected item in the dropdown menu
		 * of available options.
		 *
		 * @param {object} $object
		 * @param {boolean} scroll
		 * @param {boolean} animate
		 */
		setActiveOption: function($option, scroll, animate) {
			var height_menu, height_item, y;
			var scroll_top, scroll_bottom;
			var self = this;
	
			if (self.$activeOption) self.$activeOption.removeClass('active');
			self.$activeOption = null;
	
			$option = $($option);
			if (!$option.length) return;
	
			self.$activeOption = $option.addClass('active');
	
			if (scroll || !isset(scroll)) {
	
				height_menu   = self.$dropdown_content.height();
				height_item   = self.$activeOption.outerHeight(true);
				scroll        = self.$dropdown_content.scrollTop() || 0;
				y             = self.$activeOption.offset().top - self.$dropdown_content.offset().top + scroll;
				scroll_top    = y;
				scroll_bottom = y - height_menu + height_item;
	
				if (y + height_item > height_menu + scroll) {
					self.$dropdown_content.stop().animate({scrollTop: scroll_bottom}, animate ? self.settings.scrollDuration : 0);
				} else if (y < scroll) {
					self.$dropdown_content.stop().animate({scrollTop: scroll_top}, animate ? self.settings.scrollDuration : 0);
				}
	
			}
		},
	
		/**
		 * Selects all items (CTRL + A).
		 */
		selectAll: function() {
			var self = this;
			if (self.settings.mode === 'single') return;
	
			self.$activeItems = Array.prototype.slice.apply(self.$control.children(':not(input)').addClass('active'));
			if (self.$activeItems.length) {
				self.hideInput();
				self.close();
			}
			self.focus();
		},
	
		/**
		 * Hides the input element out of view, while
		 * retaining its focus.
		 */
		hideInput: function() {
			var self = this;
	
			self.setTextboxValue('');
			self.$control_input.css({opacity: 0, position: 'absolute', left: self.rtl ? 10000 : -10000});
			self.isInputHidden = true;
		},
	
		/**
		 * Restores input visibility.
		 */
		showInput: function() {
			this.$control_input.css({opacity: 1, position: 'relative', left: 0});
			this.isInputHidden = false;
		},
	
		/**
		 * Gives the control focus.
		 */
		focus: function() {
			var self = this;
			if (self.isDisabled) return;
	
			self.ignoreFocus = true;
			self.$control_input[0].focus();
			window.setTimeout(function() {
				self.ignoreFocus = false;
				self.onFocus();
			}, 0);
		},
	
		/**
		 * Forces the control out of focus.
		 *
		 * @param {Element} dest
		 */
		blur: function(dest) {
			this.$control_input[0].blur();
			this.onBlur(null, dest);
		},
	
		/**
		 * Returns a function that scores an object
		 * to show how good of a match it is to the
		 * provided query.
		 *
		 * @param {string} query
		 * @param {object} options
		 * @return {function}
		 */
		getScoreFunction: function(query) {
			return this.sifter.getScoreFunction(query, this.getSearchOptions());
		},
	
		/**
		 * Returns search options for sifter (the system
		 * for scoring and sorting results).
		 *
		 * @see https://github.com/brianreavis/sifter.js
		 * @return {object}
		 */
		getSearchOptions: function() {
			var settings = this.settings;
			var sort = settings.sortField;
			if (typeof sort === 'string') {
				sort = [{field: sort}];
			}
	
			return {
				fields      : settings.searchField,
				conjunction : settings.searchConjunction,
				sort        : sort
			};
		},
	
		/**
		 * Searches through available options and returns
		 * a sorted array of matches.
		 *
		 * Returns an object containing:
		 *
		 *   - query {string}
		 *   - tokens {array}
		 *   - total {int}
		 *   - items {array}
		 *
		 * @param {string} query
		 * @returns {object}
		 */
		search: function(query) {
			var i, value, score, result, calculateScore;
			var self     = this;
			var settings = self.settings;
			var options  = this.getSearchOptions();
	
			// validate user-provided result scoring function
			if (settings.score) {
				calculateScore = self.settings.score.apply(this, [query]);
				if (typeof calculateScore !== 'function') {
					throw new Error('Selectize "score" setting must be a function that returns a function');
				}
			}
	
			// perform search
			if (query !== self.lastQuery) {
				self.lastQuery = query;
				result = self.sifter.search(query, $.extend(options, {score: calculateScore}));
				self.currentResults = result;
			} else {
				result = $.extend(true, {}, self.currentResults);
			}
	
			// filter out selected items
			if (settings.hideSelected) {
				for (i = result.items.length - 1; i >= 0; i--) {
					if (self.items.indexOf(hash_key(result.items[i].id)) !== -1) {
						result.items.splice(i, 1);
					}
				}
			}
	
			return result;
		},
	
		/**
		 * Refreshes the list of available options shown
		 * in the autocomplete dropdown menu.
		 *
		 * @param {boolean} triggerDropdown
		 */
		refreshOptions: function(triggerDropdown) {
			var i, j, k, n, groups, groups_order, option, option_html, optgroup, optgroups, html, html_children, has_create_option;
			var $active, $active_before, $create;
	
			if (typeof triggerDropdown === 'undefined') {
				triggerDropdown = true;
			}
	
			var self              = this;
			var query             = $.trim(self.$control_input.val());
			var results           = self.search(query);
			var $dropdown_content = self.$dropdown_content;
			var active_before     = self.$activeOption && hash_key(self.$activeOption.attr('data-value'));
	
			// build markup
			n = results.items.length;
			if (typeof self.settings.maxOptions === 'number') {
				n = Math.min(n, self.settings.maxOptions);
			}
	
			// render and group available options individually
			groups = {};
			groups_order = [];
	
			for (i = 0; i < n; i++) {
				option      = self.options[results.items[i].id];
				option_html = self.render('option', option);
				optgroup    = option[self.settings.optgroupField] || '';
				optgroups   = $.isArray(optgroup) ? optgroup : [optgroup];
	
				for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
					optgroup = optgroups[j];
					if (!self.optgroups.hasOwnProperty(optgroup)) {
						optgroup = '';
					}
					if (!groups.hasOwnProperty(optgroup)) {
						groups[optgroup] = [];
						groups_order.push(optgroup);
					}
					groups[optgroup].push(option_html);
				}
			}
	
			// sort optgroups
			if (this.settings.lockOptgroupOrder) {
				groups_order.sort(function(a, b) {
					var a_order = self.optgroups[a].$order || 0;
					var b_order = self.optgroups[b].$order || 0;
					return a_order - b_order;
				});
			}
	
			// render optgroup headers & join groups
			html = [];
			for (i = 0, n = groups_order.length; i < n; i++) {
				optgroup = groups_order[i];
				if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].length) {
					// render the optgroup header and options within it,
					// then pass it to the wrapper template
					html_children = self.render('optgroup_header', self.optgroups[optgroup]) || '';
					html_children += groups[optgroup].join('');
					html.push(self.render('optgroup', $.extend({}, self.optgroups[optgroup], {
						html: html_children
					})));
				} else {
					html.push(groups[optgroup].join(''));
				}
			}
	
			$dropdown_content.html(html.join(''));
	
			// highlight matching terms inline
			if (self.settings.highlight && results.query.length && results.tokens.length) {
				for (i = 0, n = results.tokens.length; i < n; i++) {
					highlight($dropdown_content, results.tokens[i].regex);
				}
			}
	
			// add "selected" class to selected options
			if (!self.settings.hideSelected) {
				for (i = 0, n = self.items.length; i < n; i++) {
					self.getOption(self.items[i]).addClass('selected');
				}
			}
	
			// add create option
			has_create_option = self.canCreate(query);
			if (has_create_option) {
				$dropdown_content.prepend(self.render('option_create', {input: query}));
				$create = $($dropdown_content[0].childNodes[0]);
			}
	
			// activate
			self.hasOptions = results.items.length > 0 || has_create_option;
			if (self.hasOptions) {
				if (results.items.length > 0) {
					$active_before = active_before && self.getOption(active_before);
					if ($active_before && $active_before.length) {
						$active = $active_before;
					} else if (self.settings.mode === 'single' && self.items.length) {
						$active = self.getOption(self.items[0]);
					}
					if (!$active || !$active.length) {
						if ($create && !self.settings.addPrecedence) {
							$active = self.getAdjacentOption($create, 1);
						} else {
							$active = $dropdown_content.find('[data-selectable]:first');
						}
					}
				} else {
					$active = $create;
				}
				self.setActiveOption($active);
				if (triggerDropdown && !self.isOpen) { self.open(); }
			} else {
				self.setActiveOption(null);
				if (triggerDropdown && self.isOpen) { self.close(); }
			}
		},
	
		/**
		 * Adds an available option. If it already exists,
		 * nothing will happen. Note: this does not refresh
		 * the options list dropdown (use `refreshOptions`
		 * for that).
		 *
		 * Usage:
		 *
		 *   this.addOption(data)
		 *
		 * @param {object|array} data
		 */
		addOption: function(data) {
			var i, n, value, self = this;
	
			if ($.isArray(data)) {
				for (i = 0, n = data.length; i < n; i++) {
					self.addOption(data[i]);
				}
				return;
			}
	
			if (value = self.registerOption(data)) {
				self.userOptions[value] = true;
				self.lastQuery = null;
				self.trigger('option_add', value, data);
			}
		},
	
		/**
		 * Registers an option to the pool of options.
		 *
		 * @param {object} data
		 * @return {boolean|string}
		 */
		registerOption: function(data) {
			var key = hash_key(data[this.settings.valueField]);
			if (!key || this.options.hasOwnProperty(key)) return false;
			data.$order = data.$order || ++this.order;
			this.options[key] = data;
			return key;
		},
	
		/**
		 * Registers an option group to the pool of option groups.
		 *
		 * @param {object} data
		 * @return {boolean|string}
		 */
		registerOptionGroup: function(data) {
			var key = hash_key(data[this.settings.optgroupValueField]);
			if (!key) return false;
	
			data.$order = data.$order || ++this.order;
			this.optgroups[key] = data;
			return key;
		},
	
		/**
		 * Registers a new optgroup for options
		 * to be bucketed into.
		 *
		 * @param {string} id
		 * @param {object} data
		 */
		addOptionGroup: function(id, data) {
			data[this.settings.optgroupValueField] = id;
			if (id = this.registerOptionGroup(data)) {
				this.trigger('optgroup_add', id, data);
			}
		},
	
		/**
		 * Removes an existing option group.
		 *
		 * @param {string} id
		 */
		removeOptionGroup: function(id) {
			if (this.optgroups.hasOwnProperty(id)) {
				delete this.optgroups[id];
				this.renderCache = {};
				this.trigger('optgroup_remove', id);
			}
		},
	
		/**
		 * Clears all existing option groups.
		 */
		clearOptionGroups: function() {
			this.optgroups = {};
			this.renderCache = {};
			this.trigger('optgroup_clear');
		},
	
		/**
		 * Updates an option available for selection. If
		 * it is visible in the selected items or options
		 * dropdown, it will be re-rendered automatically.
		 *
		 * @param {string} value
		 * @param {object} data
		 */
		updateOption: function(value, data) {
			var self = this;
			var $item, $item_new;
			var value_new, index_item, cache_items, cache_options, order_old;
	
			value     = hash_key(value);
			value_new = hash_key(data[self.settings.valueField]);
	
			// sanity checks
			if (value === null) return;
			if (!self.options.hasOwnProperty(value)) return;
			if (typeof value_new !== 'string') throw new Error('Value must be set in option data');
	
			order_old = self.options[value].$order;
	
			// update references
			if (value_new !== value) {
				delete self.options[value];
				index_item = self.items.indexOf(value);
				if (index_item !== -1) {
					self.items.splice(index_item, 1, value_new);
				}
			}
			data.$order = data.$order || order_old;
			self.options[value_new] = data;
	
			// invalidate render cache
			cache_items = self.renderCache['item'];
			cache_options = self.renderCache['option'];
	
			if (cache_items) {
				delete cache_items[value];
				delete cache_items[value_new];
			}
			if (cache_options) {
				delete cache_options[value];
				delete cache_options[value_new];
			}
	
			// update the item if it's selected
			if (self.items.indexOf(value_new) !== -1) {
				$item = self.getItem(value);
				$item_new = $(self.render('item', data));
				if ($item.hasClass('active')) $item_new.addClass('active');
				$item.replaceWith($item_new);
			}
	
			// invalidate last query because we might have updated the sortField
			self.lastQuery = null;
	
			// update dropdown contents
			if (self.isOpen) {
				self.refreshOptions(false);
			}
		},
	
		/**
		 * Removes a single option.
		 *
		 * @param {string} value
		 * @param {boolean} silent
		 */
		removeOption: function(value, silent) {
			var self = this;
			value = hash_key(value);
	
			var cache_items = self.renderCache['item'];
			var cache_options = self.renderCache['option'];
			if (cache_items) delete cache_items[value];
			if (cache_options) delete cache_options[value];
	
			delete self.userOptions[value];
			delete self.options[value];
			self.lastQuery = null;
			self.trigger('option_remove', value);
			self.removeItem(value, silent);
		},
	
		/**
		 * Clears all options.
		 */
		clearOptions: function() {
			var self = this;
	
			self.loadedSearches = {};
			self.userOptions = {};
			self.renderCache = {};
			self.options = self.sifter.items = {};
			self.lastQuery = null;
			self.trigger('option_clear');
			self.clear();
		},
	
		/**
		 * Returns the jQuery element of the option
		 * matching the given value.
		 *
		 * @param {string} value
		 * @returns {object}
		 */
		getOption: function(value) {
			return this.getElementWithValue(value, this.$dropdown_content.find('[data-selectable]'));
		},
	
		/**
		 * Returns the jQuery element of the next or
		 * previous selectable option.
		 *
		 * @param {object} $option
		 * @param {int} direction  can be 1 for next or -1 for previous
		 * @return {object}
		 */
		getAdjacentOption: function($option, direction) {
			var $options = this.$dropdown.find('[data-selectable]');
			var index    = $options.index($option) + direction;
	
			return index >= 0 && index < $options.length ? $options.eq(index) : $();
		},
	
		/**
		 * Finds the first element with a "data-value" attribute
		 * that matches the given value.
		 *
		 * @param {mixed} value
		 * @param {object} $els
		 * @return {object}
		 */
		getElementWithValue: function(value, $els) {
			value = hash_key(value);
	
			if (typeof value !== 'undefined' && value !== null) {
				for (var i = 0, n = $els.length; i < n; i++) {
					if ($els[i].getAttribute('data-value') === value) {
						return $($els[i]);
					}
				}
			}
	
			return $();
		},
	
		/**
		 * Returns the jQuery element of the item
		 * matching the given value.
		 *
		 * @param {string} value
		 * @returns {object}
		 */
		getItem: function(value) {
			return this.getElementWithValue(value, this.$control.children());
		},
	
		/**
		 * "Selects" multiple items at once. Adds them to the list
		 * at the current caret position.
		 *
		 * @param {string} value
		 * @param {boolean} silent
		 */
		addItems: function(values, silent) {
			var items = $.isArray(values) ? values : [values];
			for (var i = 0, n = items.length; i < n; i++) {
				this.isPending = (i < n - 1);
				this.addItem(items[i], silent);
			}
		},
	
		/**
		 * "Selects" an item. Adds it to the list
		 * at the current caret position.
		 *
		 * @param {string} value
		 * @param {boolean} silent
		 */
		addItem: function(value, silent) {
			var events = silent ? [] : ['change'];
	
			debounce_events(this, events, function() {
				var $item, $option, $options;
				var self = this;
				var inputMode = self.settings.mode;
				var i, active, value_next, wasFull;
				value = hash_key(value);
	
				if (self.items.indexOf(value) !== -1) {
					if (inputMode === 'single') self.close();
					return;
				}
	
				if (!self.options.hasOwnProperty(value)) return;
				if (inputMode === 'single') self.clear(silent);
				if (inputMode === 'multi' && self.isFull()) return;
	
				$item = $(self.render('item', self.options[value]));
				wasFull = self.isFull();
				self.items.splice(self.caretPos, 0, value);
				self.insertAtCaret($item);
				if (!self.isPending || (!wasFull && self.isFull())) {
					self.refreshState();
				}
	
				if (self.isSetup) {
					$options = self.$dropdown_content.find('[data-selectable]');
	
					// update menu / remove the option (if this is not one item being added as part of series)
					if (!self.isPending) {
						$option = self.getOption(value);
						value_next = self.getAdjacentOption($option, 1).attr('data-value');
						self.refreshOptions(self.isFocused && inputMode !== 'single');
						if (value_next) {
							self.setActiveOption(self.getOption(value_next));
						}
					}
	
					// hide the menu if the maximum number of items have been selected or no options are left
					if (!$options.length || self.isFull()) {
						self.close();
					} else {
						self.positionDropdown();
					}
	
					self.updatePlaceholder();
					self.trigger('item_add', value, $item);
					self.updateOriginalInput({silent: silent});
				}
			});
		},
	
		/**
		 * Removes the selected item matching
		 * the provided value.
		 *
		 * @param {string} value
		 */
		removeItem: function(value, silent) {
			var self = this;
			var $item, i, idx;
	
			$item = (typeof value === 'object') ? value : self.getItem(value);
			value = hash_key($item.attr('data-value'));
			i = self.items.indexOf(value);
	
			if (i !== -1) {
				$item.remove();
				if ($item.hasClass('active')) {
					idx = self.$activeItems.indexOf($item[0]);
					self.$activeItems.splice(idx, 1);
				}
	
				self.items.splice(i, 1);
				self.lastQuery = null;
				if (!self.settings.persist && self.userOptions.hasOwnProperty(value)) {
					self.removeOption(value, silent);
				}
	
				if (i < self.caretPos) {
					self.setCaret(self.caretPos - 1);
				}
	
				self.refreshState();
				self.updatePlaceholder();
				self.updateOriginalInput({silent: silent});
				self.positionDropdown();
				self.trigger('item_remove', value, $item);
			}
		},
	
		/**
		 * Invokes the `create` method provided in the
		 * selectize options that should provide the data
		 * for the new item, given the user input.
		 *
		 * Once this completes, it will be added
		 * to the item list.
		 *
		 * @param {string} value
		 * @param {boolean} [triggerDropdown]
		 * @param {function} [callback]
		 * @return {boolean}
		 */
		createItem: function(input, triggerDropdown) {
			var self  = this;
			var caret = self.caretPos;
			input = input || $.trim(self.$control_input.val() || '');
	
			var callback = arguments[arguments.length - 1];
			if (typeof callback !== 'function') callback = function() {};
	
			if (typeof triggerDropdown !== 'boolean') {
				triggerDropdown = true;
			}
	
			if (!self.canCreate(input)) {
				callback();
				return false;
			}
	
			self.lock();
	
			var setup = (typeof self.settings.create === 'function') ? this.settings.create : function(input) {
				var data = {};
				data[self.settings.labelField] = input;
				data[self.settings.valueField] = input;
				return data;
			};
	
			var create = once(function(data) {
				self.unlock();
	
				if (!data || typeof data !== 'object') return callback();
				var value = hash_key(data[self.settings.valueField]);
				if (typeof value !== 'string') return callback();
	
				self.setTextboxValue('');
				self.addOption(data);
				self.setCaret(caret);
				self.addItem(value);
				self.refreshOptions(triggerDropdown && self.settings.mode !== 'single');
				callback(data);
			});
	
			var output = setup.apply(this, [input, create]);
			if (typeof output !== 'undefined') {
				create(output);
			}
	
			return true;
		},
	
		/**
		 * Re-renders the selected item lists.
		 */
		refreshItems: function() {
			this.lastQuery = null;
	
			if (this.isSetup) {
				this.addItem(this.items);
			}
	
			this.refreshState();
			this.updateOriginalInput();
		},
	
		/**
		 * Updates all state-dependent attributes
		 * and CSS classes.
		 */
		refreshState: function() {
			var invalid, self = this;
			if (self.isRequired) {
				if (self.items.length) self.isInvalid = false;
				self.$control_input.prop('required', invalid);
			}
			self.refreshClasses();
		},
	
		/**
		 * Updates all state-dependent CSS classes.
		 */
		refreshClasses: function() {
			var self     = this;
			var isFull   = self.isFull();
			var isLocked = self.isLocked;
	
			self.$wrapper
				.toggleClass('rtl', self.rtl);
	
			self.$control
				.toggleClass('focus', self.isFocused)
				.toggleClass('disabled', self.isDisabled)
				.toggleClass('required', self.isRequired)
				.toggleClass('invalid', self.isInvalid)
				.toggleClass('locked', isLocked)
				.toggleClass('full', isFull).toggleClass('not-full', !isFull)
				.toggleClass('input-active', self.isFocused && !self.isInputHidden)
				.toggleClass('dropdown-active', self.isOpen)
				.toggleClass('has-options', !$.isEmptyObject(self.options))
				.toggleClass('has-items', self.items.length > 0);
	
			self.$control_input.data('grow', !isFull && !isLocked);
		},
	
		/**
		 * Determines whether or not more items can be added
		 * to the control without exceeding the user-defined maximum.
		 *
		 * @returns {boolean}
		 */
		isFull: function() {
			return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
		},
	
		/**
		 * Refreshes the original <select> or <input>
		 * element to reflect the current state.
		 */
		updateOriginalInput: function(opts) {
			var i, n, options, label, self = this;
			opts = opts || {};
	
			if (self.tagType === TAG_SELECT) {
				options = [];
				for (i = 0, n = self.items.length; i < n; i++) {
					label = self.options[self.items[i]][self.settings.labelField] || '';
					options.push('<option value="' + escape_html(self.items[i]) + '" selected="selected">' + escape_html(label) + '</option>');
				}
				if (!options.length && !this.$input.attr('multiple')) {
					options.push('<option value="" selected="selected"></option>');
				}
				self.$input.html(options.join(''));
			} else {
				self.$input.val(self.getValue());
				self.$input.attr('value',self.$input.val());
			}
	
			if (self.isSetup) {
				if (!opts.silent) {
					self.trigger('change', self.$input.val());
				}
			}
		},
	
		/**
		 * Shows/hide the input placeholder depending
		 * on if there items in the list already.
		 */
		updatePlaceholder: function() {
			if (!this.settings.placeholder) return;
			var $input = this.$control_input;
	
			if (this.items.length) {
				$input.removeAttr('placeholder');
			} else {
				$input.attr('placeholder', this.settings.placeholder);
			}
			$input.triggerHandler('update', {force: true});
		},
	
		/**
		 * Shows the autocomplete dropdown containing
		 * the available options.
		 */
		open: function() {
			var self = this;
	
			if (self.isLocked || self.isOpen || (self.settings.mode === 'multi' && self.isFull())) return;
			self.focus();
			self.isOpen = true;
			self.refreshState();
			self.$dropdown.css({visibility: 'hidden', display: 'block'});
			self.positionDropdown();
			self.$dropdown.css({visibility: 'visible'});
			self.trigger('dropdown_open', self.$dropdown);
		},
	
		/**
		 * Closes the autocomplete dropdown menu.
		 */
		close: function() {
			var self = this;
			var trigger = self.isOpen;
	
			if (self.settings.mode === 'single' && self.items.length) {
				self.hideInput();
			}
	
			self.isOpen = false;
			self.$dropdown.hide();
			self.setActiveOption(null);
			self.refreshState();
	
			if (trigger) self.trigger('dropdown_close', self.$dropdown);
		},
	
		/**
		 * Calculates and applies the appropriate
		 * position of the dropdown.
		 */
		positionDropdown: function() {
			var $control = this.$control;
			var offset = this.settings.dropdownParent === 'body' ? $control.offset() : $control.position();
			offset.top += $control.outerHeight(true);
	
			this.$dropdown.css({
				width : $control.outerWidth(),
				top   : offset.top,
				left  : offset.left
			});
		},
	
		/**
		 * Resets / clears all selected items
		 * from the control.
		 *
		 * @param {boolean} silent
		 */
		clear: function(silent) {
			var self = this;
	
			if (!self.items.length) return;
			self.$control.children(':not(input)').remove();
			self.items = [];
			self.lastQuery = null;
			self.setCaret(0);
			self.setActiveItem(null);
			self.updatePlaceholder();
			self.updateOriginalInput({silent: silent});
			self.refreshState();
			self.showInput();
			self.trigger('clear');
		},
	
		/**
		 * A helper method for inserting an element
		 * at the current caret position.
		 *
		 * @param {object} $el
		 */
		insertAtCaret: function($el) {
			var caret = Math.min(this.caretPos, this.items.length);
			if (caret === 0) {
				this.$control.prepend($el);
			} else {
				$(this.$control[0].childNodes[caret]).before($el);
			}
			this.setCaret(caret + 1);
		},
	
		/**
		 * Removes the current selected item(s).
		 *
		 * @param {object} e (optional)
		 * @returns {boolean}
		 */
		deleteSelection: function(e) {
			var i, n, direction, selection, values, caret, option_select, $option_select, $tail;
			var self = this;
	
			direction = (e && e.keyCode === KEY_BACKSPACE) ? -1 : 1;
			selection = getSelection(self.$control_input[0]);
	
			if (self.$activeOption && !self.settings.hideSelected) {
				option_select = self.getAdjacentOption(self.$activeOption, -1).attr('data-value');
			}
	
			// determine items that will be removed
			values = [];
	
			if (self.$activeItems.length) {
				$tail = self.$control.children('.active:' + (direction > 0 ? 'last' : 'first'));
				caret = self.$control.children(':not(input)').index($tail);
				if (direction > 0) { caret++; }
	
				for (i = 0, n = self.$activeItems.length; i < n; i++) {
					values.push($(self.$activeItems[i]).attr('data-value'));
				}
				if (e) {
					e.preventDefault();
					e.stopPropagation();
				}
			} else if ((self.isFocused || self.settings.mode === 'single') && self.items.length) {
				if (direction < 0 && selection.start === 0 && selection.length === 0) {
					values.push(self.items[self.caretPos - 1]);
				} else if (direction > 0 && selection.start === self.$control_input.val().length) {
					values.push(self.items[self.caretPos]);
				}
			}
	
			// allow the callback to abort
			if (!values.length || (typeof self.settings.onDelete === 'function' && self.settings.onDelete.apply(self, [values]) === false)) {
				return false;
			}
	
			// perform removal
			if (typeof caret !== 'undefined') {
				self.setCaret(caret);
			}
			while (values.length) {
				self.removeItem(values.pop());
			}
	
			self.showInput();
			self.positionDropdown();
			self.refreshOptions(true);
	
			// select previous option
			if (option_select) {
				$option_select = self.getOption(option_select);
				if ($option_select.length) {
					self.setActiveOption($option_select);
				}
			}
	
			return true;
		},
	
		/**
		 * Selects the previous / next item (depending
		 * on the `direction` argument).
		 *
		 * > 0 - right
		 * < 0 - left
		 *
		 * @param {int} direction
		 * @param {object} e (optional)
		 */
		advanceSelection: function(direction, e) {
			var tail, selection, idx, valueLength, cursorAtEdge, $tail;
			var self = this;
	
			if (direction === 0) return;
			if (self.rtl) direction *= -1;
	
			tail = direction > 0 ? 'last' : 'first';
			selection = getSelection(self.$control_input[0]);
	
			if (self.isFocused && !self.isInputHidden) {
				valueLength = self.$control_input.val().length;
				cursorAtEdge = direction < 0
					? selection.start === 0 && selection.length === 0
					: selection.start === valueLength;
	
				if (cursorAtEdge && !valueLength) {
					self.advanceCaret(direction, e);
				}
			} else {
				$tail = self.$control.children('.active:' + tail);
				if ($tail.length) {
					idx = self.$control.children(':not(input)').index($tail);
					self.setActiveItem(null);
					self.setCaret(direction > 0 ? idx + 1 : idx);
				}
			}
		},
	
		/**
		 * Moves the caret left / right.
		 *
		 * @param {int} direction
		 * @param {object} e (optional)
		 */
		advanceCaret: function(direction, e) {
			var self = this, fn, $adj;
	
			if (direction === 0) return;
	
			fn = direction > 0 ? 'next' : 'prev';
			if (self.isShiftDown) {
				$adj = self.$control_input[fn]();
				if ($adj.length) {
					self.hideInput();
					self.setActiveItem($adj);
					e && e.preventDefault();
				}
			} else {
				self.setCaret(self.caretPos + direction);
			}
		},
	
		/**
		 * Moves the caret to the specified index.
		 *
		 * @param {int} i
		 */
		setCaret: function(i) {
			var self = this;
	
			if (self.settings.mode === 'single') {
				i = self.items.length;
			} else {
				i = Math.max(0, Math.min(self.items.length, i));
			}
	
			if(!self.isPending) {
				// the input must be moved by leaving it in place and moving the
				// siblings, due to the fact that focus cannot be restored once lost
				// on mobile webkit devices
				var j, n, fn, $children, $child;
				$children = self.$control.children(':not(input)');
				for (j = 0, n = $children.length; j < n; j++) {
					$child = $($children[j]).detach();
					if (j <  i) {
						self.$control_input.before($child);
					} else {
						self.$control.append($child);
					}
				}
			}
	
			self.caretPos = i;
		},
	
		/**
		 * Disables user input on the control. Used while
		 * items are being asynchronously created.
		 */
		lock: function() {
			this.close();
			this.isLocked = true;
			this.refreshState();
		},
	
		/**
		 * Re-enables user input on the control.
		 */
		unlock: function() {
			this.isLocked = false;
			this.refreshState();
		},
	
		/**
		 * Disables user input on the control completely.
		 * While disabled, it cannot receive focus.
		 */
		disable: function() {
			var self = this;
			self.$input.prop('disabled', true);
			self.$control_input.prop('disabled', true).prop('tabindex', -1);
			self.isDisabled = true;
			self.lock();
		},
	
		/**
		 * Enables the control so that it can respond
		 * to focus and user input.
		 */
		enable: function() {
			var self = this;
			self.$input.prop('disabled', false);
			self.$control_input.prop('disabled', false).prop('tabindex', self.tabIndex);
			self.isDisabled = false;
			self.unlock();
		},
	
		/**
		 * Completely destroys the control and
		 * unbinds all event listeners so that it can
		 * be garbage collected.
		 */
		destroy: function() {
			var self = this;
			var eventNS = self.eventNS;
			var revertSettings = self.revertSettings;
	
			self.trigger('destroy');
			self.off();
			self.$wrapper.remove();
			self.$dropdown.remove();
	
			self.$input
				.html('')
				.append(revertSettings.$children)
				.removeAttr('tabindex')
				.removeClass('selectized')
				.attr({tabindex: revertSettings.tabindex})
				.show();
	
			self.$control_input.removeData('grow');
			self.$input.removeData('selectize');
	
			$(window).off(eventNS);
			$(document).off(eventNS);
			$(document.body).off(eventNS);
	
			delete self.$input[0].selectize;
		},
	
		/**
		 * A helper method for rendering "item" and
		 * "option" templates, given the data.
		 *
		 * @param {string} templateName
		 * @param {object} data
		 * @returns {string}
		 */
		render: function(templateName, data) {
			var value, id, label;
			var html = '';
			var cache = false;
			var self = this;
			var regex_tag = /^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;
	
			if (templateName === 'option' || templateName === 'item') {
				value = hash_key(data[self.settings.valueField]);
				cache = !!value;
			}
	
			// pull markup from cache if it exists
			if (cache) {
				if (!isset(self.renderCache[templateName])) {
					self.renderCache[templateName] = {};
				}
				if (self.renderCache[templateName].hasOwnProperty(value)) {
					return self.renderCache[templateName][value];
				}
			}
	
			// render markup
			html = self.settings.render[templateName].apply(this, [data, escape_html]);
	
			// add mandatory attributes
			if (templateName === 'option' || templateName === 'option_create') {
				html = html.replace(regex_tag, '<$1 data-selectable');
			}
			if (templateName === 'optgroup') {
				id = data[self.settings.optgroupValueField] || '';
				html = html.replace(regex_tag, '<$1 data-group="' + escape_replace(escape_html(id)) + '"');
			}
			if (templateName === 'option' || templateName === 'item') {
				html = html.replace(regex_tag, '<$1 data-value="' + escape_replace(escape_html(value || '')) + '"');
			}
	
			// update cache
			if (cache) {
				self.renderCache[templateName][value] = html;
			}
	
			return html;
		},
	
		/**
		 * Clears the render cache for a template. If
		 * no template is given, clears all render
		 * caches.
		 *
		 * @param {string} templateName
		 */
		clearCache: function(templateName) {
			var self = this;
			if (typeof templateName === 'undefined') {
				self.renderCache = {};
			} else {
				delete self.renderCache[templateName];
			}
		},
	
		/**
		 * Determines whether or not to display the
		 * create item prompt, given a user input.
		 *
		 * @param {string} input
		 * @return {boolean}
		 */
		canCreate: function(input) {
			var self = this;
			if (!self.settings.create) return false;
			var filter = self.settings.createFilter;
			return input.length
				&& (typeof filter !== 'function' || filter.apply(self, [input]))
				&& (typeof filter !== 'string' || new RegExp(filter).test(input))
				&& (!(filter instanceof RegExp) || filter.test(input));
		}
	
	});
	
	
	Selectize.count = 0;
	Selectize.defaults = {
		options: [],
		optgroups: [],
	
		plugins: [],
		delimiter: ',',
		splitOn: null, // regexp or string for splitting up values from a paste command
		persist: true,
		diacritics: true,
		create: false,
		createOnBlur: false,
		createFilter: null,
		highlight: true,
		openOnFocus: true,
		maxOptions: 1000,
		maxItems: null,
		hideSelected: null,
		addPrecedence: false,
		selectOnTab: false,
		preload: false,
		allowEmptyOption: false,
		closeAfterSelect: false,
	
		scrollDuration: 60,
		loadThrottle: 300,
		loadingClass: 'loading',
	
		dataAttr: 'data-data',
		optgroupField: 'optgroup',
		valueField: 'value',
		labelField: 'text',
		optgroupLabelField: 'label',
		optgroupValueField: 'value',
		lockOptgroupOrder: false,
	
		sortField: '$order',
		searchField: ['text'],
		searchConjunction: 'and',
	
		mode: null,
		wrapperClass: 'selectize-control',
		inputClass: 'selectize-input',
		dropdownClass: 'selectize-dropdown',
		dropdownContentClass: 'selectize-dropdown-content',
	
		dropdownParent: null,
	
		copyClassesToDropdown: true,
	
		/*
		load                 : null, // function(query, callback) { ... }
		score                : null, // function(search) { ... }
		onInitialize         : null, // function() { ... }
		onChange             : null, // function(value) { ... }
		onItemAdd            : null, // function(value, $item) { ... }
		onItemRemove         : null, // function(value) { ... }
		onClear              : null, // function() { ... }
		onOptionAdd          : null, // function(value, data) { ... }
		onOptionRemove       : null, // function(value) { ... }
		onOptionClear        : null, // function() { ... }
		onOptionGroupAdd     : null, // function(id, data) { ... }
		onOptionGroupRemove  : null, // function(id) { ... }
		onOptionGroupClear   : null, // function() { ... }
		onDropdownOpen       : null, // function($dropdown) { ... }
		onDropdownClose      : null, // function($dropdown) { ... }
		onType               : null, // function(str) { ... }
		onDelete             : null, // function(values) { ... }
		*/
	
		render: {
			/*
			item: null,
			optgroup: null,
			optgroup_header: null,
			option: null,
			option_create: null
			*/
		}
	};
	
	
	$.fn.selectize = function(settings_user) {
		var defaults             = $.fn.selectize.defaults;
		var settings             = $.extend({}, defaults, settings_user);
		var attr_data            = settings.dataAttr;
		var field_label          = settings.labelField;
		var field_value          = settings.valueField;
		var field_optgroup       = settings.optgroupField;
		var field_optgroup_label = settings.optgroupLabelField;
		var field_optgroup_value = settings.optgroupValueField;
	
		/**
		 * Initializes selectize from a <input type="text"> element.
		 *
		 * @param {object} $input
		 * @param {object} settings_element
		 */
		var init_textbox = function($input, settings_element) {
			var i, n, values, option;
	
			var data_raw = $input.attr(attr_data);
	
			if (!data_raw) {
				var value = $.trim($input.val() || '');
				if (!settings.allowEmptyOption && !value.length) return;
				values = value.split(settings.delimiter);
				for (i = 0, n = values.length; i < n; i++) {
					option = {};
					option[field_label] = values[i];
					option[field_value] = values[i];
					settings_element.options.push(option);
				}
				settings_element.items = values;
			} else {
				settings_element.options = JSON.parse(data_raw);
				for (i = 0, n = settings_element.options.length; i < n; i++) {
					settings_element.items.push(settings_element.options[i][field_value]);
				}
			}
		};
	
		/**
		 * Initializes selectize from a <select> element.
		 *
		 * @param {object} $input
		 * @param {object} settings_element
		 */
		var init_select = function($input, settings_element) {
			var i, n, tagName, $children, order = 0;
			var options = settings_element.options;
			var optionsMap = {};
	
			var readData = function($el) {
				var data = attr_data && $el.attr(attr_data);
				if (typeof data === 'string' && data.length) {
					return JSON.parse(data);
				}
				return null;
			};
	
			var addOption = function($option, group) {
				$option = $($option);
	
				var value = hash_key($option.attr('value'));
				if (!value && !settings.allowEmptyOption) return;
	
				// if the option already exists, it's probably been
				// duplicated in another optgroup. in this case, push
				// the current group to the "optgroup" property on the
				// existing option so that it's rendered in both places.
				if (optionsMap.hasOwnProperty(value)) {
					if (group) {
						var arr = optionsMap[value][field_optgroup];
						if (!arr) {
							optionsMap[value][field_optgroup] = group;
						} else if (!$.isArray(arr)) {
							optionsMap[value][field_optgroup] = [arr, group];
						} else {
							arr.push(group);
						}
					}
					return;
				}
	
				var option             = readData($option) || {};
				option[field_label]    = option[field_label] || $option.text();
				option[field_value]    = option[field_value] || value;
				option[field_optgroup] = option[field_optgroup] || group;
	
				optionsMap[value] = option;
				options.push(option);
	
				if ($option.is(':selected')) {
					settings_element.items.push(value);
				}
			};
	
			var addGroup = function($optgroup) {
				var i, n, id, optgroup, $options;
	
				$optgroup = $($optgroup);
				id = $optgroup.attr('label');
	
				if (id) {
					optgroup = readData($optgroup) || {};
					optgroup[field_optgroup_label] = id;
					optgroup[field_optgroup_value] = id;
					settings_element.optgroups.push(optgroup);
				}
	
				$options = $('option', $optgroup);
				for (i = 0, n = $options.length; i < n; i++) {
					addOption($options[i], id);
				}
			};
	
			settings_element.maxItems = $input.attr('multiple') ? null : 1;
	
			$children = $input.children();
			for (i = 0, n = $children.length; i < n; i++) {
				tagName = $children[i].tagName.toLowerCase();
				if (tagName === 'optgroup') {
					addGroup($children[i]);
				} else if (tagName === 'option') {
					addOption($children[i]);
				}
			}
		};
	
		return this.each(function() {
			if (this.selectize) return;
	
			var instance;
			var $input = $(this);
			var tag_name = this.tagName.toLowerCase();
			var placeholder = $input.attr('placeholder') || $input.attr('data-placeholder');
			if (!placeholder && !settings.allowEmptyOption) {
				placeholder = $input.children('option[value=""]').text();
			}
	
			var settings_element = {
				'placeholder' : placeholder,
				'options'     : [],
				'optgroups'   : [],
				'items'       : []
			};
	
			if (tag_name === 'select') {
				init_select($input, settings_element);
			} else {
				init_textbox($input, settings_element);
			}
	
			instance = new Selectize($input, $.extend(true, {}, defaults, settings_element, settings_user));
		});
	};
	
	$.fn.selectize.defaults = Selectize.defaults;
	$.fn.selectize.support = {
		validity: SUPPORTS_VALIDITY_API
	};
	
	
	Selectize.define('drag_drop', function(options) {
		if (!$.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
		if (this.settings.mode !== 'multi') return;
		var self = this;
	
		self.lock = (function() {
			var original = self.lock;
			return function() {
				var sortable = self.$control.data('sortable');
				if (sortable) sortable.disable();
				return original.apply(self, arguments);
			};
		})();
	
		self.unlock = (function() {
			var original = self.unlock;
			return function() {
				var sortable = self.$control.data('sortable');
				if (sortable) sortable.enable();
				return original.apply(self, arguments);
			};
		})();
	
		self.setup = (function() {
			var original = self.setup;
			return function() {
				original.apply(this, arguments);
	
				var $control = self.$control.sortable({
					items: '[data-value]',
					forcePlaceholderSize: true,
					disabled: self.isLocked,
					start: function(e, ui) {
						ui.placeholder.css('width', ui.helper.css('width'));
						$control.css({overflow: 'visible'});
					},
					stop: function() {
						$control.css({overflow: 'hidden'});
						var active = self.$activeItems ? self.$activeItems.slice() : null;
						var values = [];
						$control.children('[data-value]').each(function() {
							values.push($(this).attr('data-value'));
						});
						self.setValue(values);
						self.setActiveItem(active);
					}
				});
			};
		})();
	
	});
	
	Selectize.define('dropdown_header', function(options) {
		var self = this;
	
		options = $.extend({
			title         : 'Untitled',
			headerClass   : 'selectize-dropdown-header',
			titleRowClass : 'selectize-dropdown-header-title',
			labelClass    : 'selectize-dropdown-header-label',
			closeClass    : 'selectize-dropdown-header-close',
	
			html: function(data) {
				return (
					'<div class="' + data.headerClass + '">' +
						'<div class="' + data.titleRowClass + '">' +
							'<span class="' + data.labelClass + '">' + data.title + '</span>' +
							'<a href="javascript:void(0)" class="' + data.closeClass + '">&times;</a>' +
						'</div>' +
					'</div>'
				);
			}
		}, options);
	
		self.setup = (function() {
			var original = self.setup;
			return function() {
				original.apply(self, arguments);
				self.$dropdown_header = $(options.html(options));
				self.$dropdown.prepend(self.$dropdown_header);
			};
		})();
	
	});
	
	Selectize.define('optgroup_columns', function(options) {
		var self = this;
	
		options = $.extend({
			equalizeWidth  : true,
			equalizeHeight : true
		}, options);
	
		this.getAdjacentOption = function($option, direction) {
			var $options = $option.closest('[data-group]').find('[data-selectable]');
			var index    = $options.index($option) + direction;
	
			return index >= 0 && index < $options.length ? $options.eq(index) : $();
		};
	
		this.onKeyDown = (function() {
			var original = self.onKeyDown;
			return function(e) {
				var index, $option, $options, $optgroup;
	
				if (this.isOpen && (e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT)) {
					self.ignoreHover = true;
					$optgroup = this.$activeOption.closest('[data-group]');
					index = $optgroup.find('[data-selectable]').index(this.$activeOption);
	
					if(e.keyCode === KEY_LEFT) {
						$optgroup = $optgroup.prev('[data-group]');
					} else {
						$optgroup = $optgroup.next('[data-group]');
					}
	
					$options = $optgroup.find('[data-selectable]');
					$option  = $options.eq(Math.min($options.length - 1, index));
					if ($option.length) {
						this.setActiveOption($option);
					}
					return;
				}
	
				return original.apply(this, arguments);
			};
		})();
	
		var getScrollbarWidth = function() {
			var div;
			var width = getScrollbarWidth.width;
			var doc = document;
	
			if (typeof width === 'undefined') {
				div = doc.createElement('div');
				div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
				div = div.firstChild;
				doc.body.appendChild(div);
				width = getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
				doc.body.removeChild(div);
			}
			return width;
		};
	
		var equalizeSizes = function() {
			var i, n, height_max, width, width_last, width_parent, $optgroups;
	
			$optgroups = $('[data-group]', self.$dropdown_content);
			n = $optgroups.length;
			if (!n || !self.$dropdown_content.width()) return;
	
			if (options.equalizeHeight) {
				height_max = 0;
				for (i = 0; i < n; i++) {
					height_max = Math.max(height_max, $optgroups.eq(i).height());
				}
				$optgroups.css({height: height_max});
			}
	
			if (options.equalizeWidth) {
				width_parent = self.$dropdown_content.innerWidth() - getScrollbarWidth();
				width = Math.round(width_parent / n);
				$optgroups.css({width: width});
				if (n > 1) {
					width_last = width_parent - width * (n - 1);
					$optgroups.eq(n - 1).css({width: width_last});
				}
			}
		};
	
		if (options.equalizeHeight || options.equalizeWidth) {
			hook.after(this, 'positionDropdown', equalizeSizes);
			hook.after(this, 'refreshOptions', equalizeSizes);
		}
	
	
	});
	
	Selectize.define('remove_button', function(options) {
		if (this.settings.mode === 'single') return;
	
		options = $.extend({
			label     : '&times;',
			title     : 'Remove',
			className : 'remove',
			append    : true
		}, options);
	
		var self = this;
		var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + '</a>';
	
		/**
		 * Appends an element as a child (with raw HTML).
		 *
		 * @param {string} html_container
		 * @param {string} html_element
		 * @return {string}
		 */
		var append = function(html_container, html_element) {
			var pos = html_container.search(/(<\/[^>]+>\s*)$/);
			return html_container.substring(0, pos) + html_element + html_container.substring(pos);
		};
	
		this.setup = (function() {
			var original = self.setup;
			return function() {
				// override the item rendering method to add the button to each
				if (options.append) {
					var render_item = self.settings.render.item;
					self.settings.render.item = function(data) {
						return append(render_item.apply(this, arguments), html);
					};
				}
	
				original.apply(this, arguments);
	
				// add event listener
				this.$control.on('click', '.' + options.className, function(e) {
					e.preventDefault();
					if (self.isLocked) return;
	
					var $item = $(e.currentTarget).parent();
					self.setActiveItem($item);
					if (self.deleteSelection()) {
						self.setCaret(self.items.length);
					}
				});
	
			};
		})();
	
	});
	
	Selectize.define('restore_on_backspace', function(options) {
		var self = this;
	
		options.text = options.text || function(option) {
			return option[this.settings.labelField];
		};
	
		this.onKeyDown = (function() {
			var original = self.onKeyDown;
			return function(e) {
				var index, option;
				if (e.keyCode === KEY_BACKSPACE && this.$control_input.val() === '' && !this.$activeItems.length) {
					index = this.caretPos - 1;
					if (index >= 0 && index < this.items.length) {
						option = this.options[this.items[index]];
						if (this.deleteSelection(e)) {
							this.setTextboxValue(options.text.apply(this, [option]));
							this.refreshOptions(true);
						}
						e.preventDefault();
						return;
					}
				}
				return original.apply(this, arguments);
			};
		})();
	});

	Selectize.define( 'no_results', function( options ) {
        var self = this;
      
        options = $.extend({
          message: 'No match found.',
		  message2: 'Your insurance might be out of network, check information below.',      
          html: function(data) {
            return (
              '<div class="selectize-dropdown ' + data.classNames + '">' +
                '<div class="selectize-dropdown-content">' +
                  '<div class="no-results"> <p class="option option-1">' + data.message + '</p> <p class="option option-2">' + data.message2 + '</p> </div>' +
                '</div>' +
              '</div>'
            );
          }
        }, options );
      
        self.displayEmptyResultsMessage = function () {
          this.$empty_results_container.css('top', this.$control.outerHeight());
          this.$empty_results_container.css('width', this.$control.outerWidth());
          this.$empty_results_container.show();
          this.$control.addClass("dropdown-active");
        };
      
        self.refreshOptions = (function () {
          var original = self.refreshOptions;
      
          return function () {
            original.apply(self, arguments);
            if (this.hasOptions || !this.lastQuery) {
				this.$empty_results_container && this.$empty_results_container.hide()
            } else {
            	if(this.$empty_results_container && arguments[0] !== null && arguments[0] !== undefined) {
            		self.onBlur();
            	}
            	this.displayEmptyResultsMessage();
            }
          }
        })();
      
        self.onKeyDown = (function () {
          var original = self.onKeyDown;
      
          return function ( e ) {
            original.apply( self, arguments );
            if ( e.keyCode === 27 ) {
              this.$empty_results_container.hide();
            }
          }
        })();
      
        self.onBlur = (function () {
          var original = self.onBlur;
      
          return function () {
            original.apply( self, arguments );
            this.$empty_results_container.hide();
            this.$control.removeClass("dropdown-active");
          };
        })();
      
        self.setup = (function() {
          var original = self.setup;
          return function() {
            original.apply(self, arguments);
            self.$empty_results_container = $(options.html($.extend({
              classNames: self.$input.attr('class')
            }, options)));
            self.$empty_results_container.insertBefore(self.$dropdown);
            self.$empty_results_container.hide();
          };
        })();
	});

	Selectize.define("clear_button", function(options) {
		var self = this;
		if (self.settings.mode === "multiple") {
			return;
		}
	
		options = $.extend({
			label     : "<i class=\"fa fa-times\"></i>",
			className : "btn btn-block btn-link",
			append    : true
		}, options);
	
		self.on("initialize", function() {
			self.$clear_button = $("<button type=\"button\" tabindex=\"-1\"></button>");
			self.$clear_button.addClass(options.className).html(options.label);
			self.$clear_button.prop("disabled", !self.items.length);
			self.$clear_button.mousedown(function() {
				self.$control_input.val("");
				if (self.items.length) {
					self.clear();
					self.onChange();
				}
				
				self.focus();
			});
			self.$clear_button.insertBefore(self.$control);

			function buttonDisabled() {
				return (self.$control_input.val().length === 0 && self.items.length === 0) || !self.isFocused;
			}
			self.$control_input.on("input", function() {
				self.$clear_button.prop("disabled", buttonDisabled());
			});
			self.on("change", function() {
				self.$clear_button.prop("disabled", buttonDisabled());
			});
			self.on("blur", function() {
				self.$clear_button.prop("disabled", buttonDisabled());
			});
			self.on("focus", function() {
				self.$clear_button.prop("disabled", buttonDisabled());
			});
		});
	});

	Selectize.define("input_label", function(options) {
		var self = this;
	
		self.on("initialize", function() {
			self.$control_input.attr("aria-label", options.label)
		});
	});

	return Selectize;
}));
;
/**
 * Angular Selectize2
 * https://github.com/machineboy2045/angular-selectize
 **/

angular.module('selectize', []).value('selectizeConfig', {}).directive("selectize", ['selectizeConfig', function(selectizeConfig) {
  return {
    restrict: 'EA',
    require: '^ngModel',
    scope: { ngModel: '=', config: '=?', options: '=?', ngDisabled: '=', ngRequired: '&' },
    link: function(scope, element, attrs, modelCtrl) {

      Selectize.defaults.maxItems = null; //default to tag editor

      var selectize,
          config = angular.extend({}, Selectize.defaults, selectizeConfig, scope.config);

      modelCtrl.$isEmpty = function(val) {
        return val === undefined || val === null || !val.length; //override to support checking empty arrays
      };

      function createItem(input) {
        var data = {};
        data[config.labelField] = input;
        data[config.valueField] = input;
        return data;
      }

      function addOptions(options) {
        angular.forEach(options, function(opt) { selectize.registerOption(opt); });
      }

      function toggle(disabled) {
        disabled ? selectize.disable() : selectize.enable();
      }

      var validate = function() {
        var isInvalid = (scope.ngRequired() || attrs.required || config.required) && modelCtrl.$isEmpty(scope.ngModel);
        modelCtrl.$setValidity('required', !isInvalid);
      };

      function normalizeOptions(data) {
        if (!data)
          return [];

        data = angular.isArray(data) || angular.isObject(data) ? data : [data]

        angular.forEach(data, function(opt, key) {
            if (typeof opt === 'string') {
                data[key] = createItem(opt);
            }
        });
        return data;
      }

      function updateSelectize() {
        validate();

        selectize.$control.toggleClass('ng-valid', modelCtrl.$valid);
        selectize.$control.toggleClass('ng-invalid', modelCtrl.$invalid);
        selectize.$control.toggleClass('ng-dirty', modelCtrl.$dirty);
        selectize.$control.toggleClass('ng-pristine', modelCtrl.$pristine);

        if (!angular.equals(selectize.items, scope.ngModel)) {
          selectize.addOption(normalizeOptions(angular.copy(scope.ngModel)));
          selectize.setValue(scope.ngModel);
        }
      }

      var onChange = config.onChange,
          onOptionAdd = config.onOptionAdd;

      config.onChange = function() {
        if(scope.disableOnChange)
          return;

        if (!angular.equals(selectize.items, scope.ngModel))
          scope.$evalAsync(function() {
            var value = angular.copy(selectize.items);
            if (config.maxItems == 1) {
              value = value[0]
            }
            modelCtrl.$setViewValue( value );
          });

        if (onChange) {
          onChange.apply(this, arguments);
        }
      };

      config.onOptionAdd = function(value, data) {
        if( scope.options.indexOf(data) === -1 ) {
          scope.options.push(data);

          if (onOptionAdd) {
            onOptionAdd.apply(this, arguments);
          }
        }
      };

      if (scope.options) {
        // replace scope options with generated options while retaining a reference to the same array
        normalizeOptions(scope.options);
      } else {
        // default options = [ngModel] if no options specified
        scope.options = normalizeOptions(angular.copy(scope.ngModel));
      }

      var angularCallback = config.onInitialize;

      config.onInitialize = function() {
        selectize = element[0].selectize;
        addOptions(scope.options);
        selectize.setValue(scope.ngModel);

        //provides a way to access the selectize element from an
        //angular controller
        if (angularCallback) {
          angularCallback(selectize);
        }

        scope.$watch('options', function() {
          scope.disableOnChange = true;
          selectize.clearOptions();
          addOptions(scope.options);
          selectize.setValue(scope.ngModel);
          scope.disableOnChange = false;
        }, true);

        scope.$watchCollection('ngModel', updateSelectize);
        scope.$watch('ngDisabled', toggle);
      };

      element.selectize(config);

      element.on('$destroy', function() {
        if (selectize) {
          selectize.destroy();
          element = null;
        }
      });
    }
  };
}]);
;
/**
 * Fuse.js v6.5.3 - Lightweight fuzzy-search (http://fusejs.io)
 *
 * Copyright (c) 2021 Kiro Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Fuse = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    Object.defineProperty(subClass, "prototype", {
      value: Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      }),
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function isArray(value) {
    return !Array.isArray ? getTag(value) === '[object Array]' : Array.isArray(value);
  } // Adapted from: https://github.com/lodash/lodash/blob/master/.internal/baseToString.js

  var INFINITY = 1 / 0;
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }

    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }
  function toString(value) {
    return value == null ? '' : baseToString(value);
  }
  function isString(value) {
    return typeof value === 'string';
  }
  function isNumber(value) {
    return typeof value === 'number';
  } // Adapted from: https://github.com/lodash/lodash/blob/master/isBoolean.js

  function isBoolean(value) {
    return value === true || value === false || isObjectLike(value) && getTag(value) == '[object Boolean]';
  }
  function isObject(value) {
    return _typeof(value) === 'object';
  } // Checks if `value` is object-like.

  function isObjectLike(value) {
    return isObject(value) && value !== null;
  }
  function isDefined(value) {
    return value !== undefined && value !== null;
  }
  function isBlank(value) {
    return !value.trim().length;
  } // Gets the `toStringTag` of `value`.
  // Adapted from: https://github.com/lodash/lodash/blob/master/.internal/getTag.js

  function getTag(value) {
    return value == null ? value === undefined ? '[object Undefined]' : '[object Null]' : Object.prototype.toString.call(value);
  }

  var EXTENDED_SEARCH_UNAVAILABLE = 'Extended search is not available';
  var INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
  var LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = function LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key) {
    return "Invalid value for key ".concat(key);
  };
  var PATTERN_LENGTH_TOO_LARGE = function PATTERN_LENGTH_TOO_LARGE(max) {
    return "Pattern length exceeds max of ".concat(max, ".");
  };
  var MISSING_KEY_PROPERTY = function MISSING_KEY_PROPERTY(name) {
    return "Missing ".concat(name, " property in key");
  };
  var INVALID_KEY_WEIGHT_VALUE = function INVALID_KEY_WEIGHT_VALUE(key) {
    return "Property 'weight' in key '".concat(key, "' must be a positive integer");
  };

  var hasOwn = Object.prototype.hasOwnProperty;

  var KeyStore = /*#__PURE__*/function () {
    function KeyStore(keys) {
      var _this = this;

      _classCallCheck(this, KeyStore);

      this._keys = [];
      this._keyMap = {};
      var totalWeight = 0;
      keys.forEach(function (key) {
        var obj = createKey(key);
        totalWeight += obj.weight;

        _this._keys.push(obj);

        _this._keyMap[obj.id] = obj;
        totalWeight += obj.weight;
      }); // Normalize weights so that their sum is equal to 1

      this._keys.forEach(function (key) {
        key.weight /= totalWeight;
      });
    }

    _createClass(KeyStore, [{
      key: "get",
      value: function get(keyId) {
        return this._keyMap[keyId];
      }
    }, {
      key: "keys",
      value: function keys() {
        return this._keys;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return JSON.stringify(this._keys);
      }
    }]);

    return KeyStore;
  }();
  function createKey(key) {
    var path = null;
    var id = null;
    var src = null;
    var weight = 1;

    if (isString(key) || isArray(key)) {
      src = key;
      path = createKeyPath(key);
      id = createKeyId(key);
    } else {
      if (!hasOwn.call(key, 'name')) {
        throw new Error(MISSING_KEY_PROPERTY('name'));
      }

      var name = key.name;
      src = name;

      if (hasOwn.call(key, 'weight')) {
        weight = key.weight;

        if (weight <= 0) {
          throw new Error(INVALID_KEY_WEIGHT_VALUE(name));
        }
      }

      path = createKeyPath(name);
      id = createKeyId(name);
    }

    return {
      path: path,
      id: id,
      weight: weight,
      src: src
    };
  }
  function createKeyPath(key) {
    return isArray(key) ? key : key.split('.');
  }
  function createKeyId(key) {
    return isArray(key) ? key.join('.') : key;
  }

  function get(obj, path) {
    var list = [];
    var arr = false;

    var deepGet = function deepGet(obj, path, index) {
      if (!isDefined(obj)) {
        return;
      }

      if (!path[index]) {
        // If there's no path left, we've arrived at the object we care about.
        list.push(obj);
      } else {
        var key = path[index];
        var value = obj[key];

        if (!isDefined(value)) {
          return;
        } // If we're at the last value in the path, and if it's a string/number/bool,
        // add it to the list


        if (index === path.length - 1 && (isString(value) || isNumber(value) || isBoolean(value))) {
          list.push(toString(value));
        } else if (isArray(value)) {
          arr = true; // Search each item in the array.

          for (var i = 0, len = value.length; i < len; i += 1) {
            deepGet(value[i], path, index + 1);
          }
        } else if (path.length) {
          // An object. Recurse further.
          deepGet(value, path, index + 1);
        }
      }
    }; // Backwards compatibility (since path used to be a string)


    deepGet(obj, isString(path) ? path.split('.') : path, 0);
    return arr ? list : list[0];
  }

  var MatchOptions = {
    // Whether the matches should be included in the result set. When `true`, each record in the result
    // set will include the indices of the matched characters.
    // These can consequently be used for highlighting purposes.
    includeMatches: false,
    // When `true`, the matching function will continue to the end of a search pattern even if
    // a perfect match has already been located in the string.
    findAllMatches: false,
    // Minimum number of characters that must be matched before a result is considered a match
    minMatchCharLength: 1
  };
  var BasicOptions = {
    // When `true`, the algorithm continues searching to the end of the input even if a perfect
    // match is found before the end of the same input.
    isCaseSensitive: false,
    // When true, the matching function will continue to the end of a search pattern even if
    includeScore: false,
    // List of properties that will be searched. This also supports nested properties.
    keys: [],
    // Whether to sort the result list, by score
    shouldSort: true,
    // Default sort function: sort by ascending score, ascending index
    sortFn: function sortFn(a, b) {
      return a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1;
    }
  };
  var FuzzyOptions = {
    // Approximately where in the text is the pattern expected to be found?
    location: 0,
    // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
    // (of both letters and location), a threshold of '1.0' would match anything.
    threshold: 0.6,
    // Determines how close the match must be to the fuzzy location (specified above).
    // An exact letter match which is 'distance' characters away from the fuzzy location
    // would score as a complete mismatch. A distance of '0' requires the match be at
    // the exact location specified, a threshold of '1000' would require a perfect match
    // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
    distance: 100
  };
  var AdvancedOptions = {
    // When `true`, it enables the use of unix-like search commands
    useExtendedSearch: false,
    // The get function to use when fetching an object's properties.
    // The default will search nested paths *ie foo.bar.baz*
    getFn: get,
    // When `true`, search will ignore `location` and `distance`, so it won't matter
    // where in the string the pattern appears.
    // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
    ignoreLocation: false,
    // When `true`, the calculation for the relevance score (used for sorting) will
    // ignore the field-length norm.
    // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
    ignoreFieldNorm: false,
    // The weight to determine how much field length norm effects scoring.
    fieldNormWeight: 1
  };
  var Config = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, BasicOptions), MatchOptions), FuzzyOptions), AdvancedOptions);

  var SPACE = /[^ ]+/g; // Field-length norm: the shorter the field, the higher the weight.
  // Set to 3 decimals to reduce index size.

  function norm() {
    var weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var mantissa = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    var cache = new Map();
    var m = Math.pow(10, mantissa);
    return {
      get: function get(value) {
        var numTokens = value.match(SPACE).length;

        if (cache.has(numTokens)) {
          return cache.get(numTokens);
        } // Default function is 1/sqrt(x), weight makes that variable


        var norm = 1 / Math.pow(numTokens, 0.5 * weight); // In place of `toFixed(mantissa)`, for faster computation

        var n = parseFloat(Math.round(norm * m) / m);
        cache.set(numTokens, n);
        return n;
      },
      clear: function clear() {
        cache.clear();
      }
    };
  }

  var FuseIndex = /*#__PURE__*/function () {
    function FuseIndex() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$getFn = _ref.getFn,
          getFn = _ref$getFn === void 0 ? Config.getFn : _ref$getFn,
          _ref$fieldNormWeight = _ref.fieldNormWeight,
          fieldNormWeight = _ref$fieldNormWeight === void 0 ? Config.fieldNormWeight : _ref$fieldNormWeight;

      _classCallCheck(this, FuseIndex);

      this.norm = norm(fieldNormWeight, 3);
      this.getFn = getFn;
      this.isCreated = false;
      this.setIndexRecords();
    }

    _createClass(FuseIndex, [{
      key: "setSources",
      value: function setSources() {
        var docs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        this.docs = docs;
      }
    }, {
      key: "setIndexRecords",
      value: function setIndexRecords() {
        var records = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        this.records = records;
      }
    }, {
      key: "setKeys",
      value: function setKeys() {
        var _this = this;

        var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        this.keys = keys;
        this._keysMap = {};
        keys.forEach(function (key, idx) {
          _this._keysMap[key.id] = idx;
        });
      }
    }, {
      key: "create",
      value: function create() {
        var _this2 = this;

        if (this.isCreated || !this.docs.length) {
          return;
        }

        this.isCreated = true; // List is Array<String>

        if (isString(this.docs[0])) {
          this.docs.forEach(function (doc, docIndex) {
            _this2._addString(doc, docIndex);
          });
        } else {
          // List is Array<Object>
          this.docs.forEach(function (doc, docIndex) {
            _this2._addObject(doc, docIndex);
          });
        }

        this.norm.clear();
      } // Adds a doc to the end of the index

    }, {
      key: "add",
      value: function add(doc) {
        var idx = this.size();

        if (isString(doc)) {
          this._addString(doc, idx);
        } else {
          this._addObject(doc, idx);
        }
      } // Removes the doc at the specified index of the index

    }, {
      key: "removeAt",
      value: function removeAt(idx) {
        this.records.splice(idx, 1); // Change ref index of every subsquent doc

        for (var i = idx, len = this.size(); i < len; i += 1) {
          this.records[i].i -= 1;
        }
      }
    }, {
      key: "getValueForItemAtKeyId",
      value: function getValueForItemAtKeyId(item, keyId) {
        return item[this._keysMap[keyId]];
      }
    }, {
      key: "size",
      value: function size() {
        return this.records.length;
      }
    }, {
      key: "_addString",
      value: function _addString(doc, docIndex) {
        if (!isDefined(doc) || isBlank(doc)) {
          return;
        }

        var record = {
          v: doc,
          i: docIndex,
          n: this.norm.get(doc)
        };
        this.records.push(record);
      }
    }, {
      key: "_addObject",
      value: function _addObject(doc, docIndex) {
        var _this3 = this;

        var record = {
          i: docIndex,
          $: {}
        }; // Iterate over every key (i.e, path), and fetch the value at that key

        this.keys.forEach(function (key, keyIndex) {
          // console.log(key)
          var value = _this3.getFn(doc, key.path);

          if (!isDefined(value)) {
            return;
          }

          if (isArray(value)) {
            (function () {
              var subRecords = [];
              var stack = [{
                nestedArrIndex: -1,
                value: value
              }];

              while (stack.length) {
                var _stack$pop = stack.pop(),
                    nestedArrIndex = _stack$pop.nestedArrIndex,
                    _value = _stack$pop.value;

                if (!isDefined(_value)) {
                  continue;
                }

                if (isString(_value) && !isBlank(_value)) {
                  var subRecord = {
                    v: _value,
                    i: nestedArrIndex,
                    n: _this3.norm.get(_value)
                  };
                  subRecords.push(subRecord);
                } else if (isArray(_value)) {
                  _value.forEach(function (item, k) {
                    stack.push({
                      nestedArrIndex: k,
                      value: item
                    });
                  });
                } else ;
              }

              record.$[keyIndex] = subRecords;
            })();
          } else if (!isBlank(value)) {
            var subRecord = {
              v: value,
              n: _this3.norm.get(value)
            };
            record.$[keyIndex] = subRecord;
          }
        });
        this.records.push(record);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          keys: this.keys,
          records: this.records
        };
      }
    }]);

    return FuseIndex;
  }();
  function createIndex(keys, docs) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref2$getFn = _ref2.getFn,
        getFn = _ref2$getFn === void 0 ? Config.getFn : _ref2$getFn,
        _ref2$fieldNormWeight = _ref2.fieldNormWeight,
        fieldNormWeight = _ref2$fieldNormWeight === void 0 ? Config.fieldNormWeight : _ref2$fieldNormWeight;

    var myIndex = new FuseIndex({
      getFn: getFn,
      fieldNormWeight: fieldNormWeight
    });
    myIndex.setKeys(keys.map(createKey));
    myIndex.setSources(docs);
    myIndex.create();
    return myIndex;
  }
  function parseIndex(data) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref3$getFn = _ref3.getFn,
        getFn = _ref3$getFn === void 0 ? Config.getFn : _ref3$getFn,
        _ref3$fieldNormWeight = _ref3.fieldNormWeight,
        fieldNormWeight = _ref3$fieldNormWeight === void 0 ? Config.fieldNormWeight : _ref3$fieldNormWeight;

    var keys = data.keys,
        records = data.records;
    var myIndex = new FuseIndex({
      getFn: getFn,
      fieldNormWeight: fieldNormWeight
    });
    myIndex.setKeys(keys);
    myIndex.setIndexRecords(records);
    return myIndex;
  }

  function computeScore$1(pattern) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$errors = _ref.errors,
        errors = _ref$errors === void 0 ? 0 : _ref$errors,
        _ref$currentLocation = _ref.currentLocation,
        currentLocation = _ref$currentLocation === void 0 ? 0 : _ref$currentLocation,
        _ref$expectedLocation = _ref.expectedLocation,
        expectedLocation = _ref$expectedLocation === void 0 ? 0 : _ref$expectedLocation,
        _ref$distance = _ref.distance,
        distance = _ref$distance === void 0 ? Config.distance : _ref$distance,
        _ref$ignoreLocation = _ref.ignoreLocation,
        ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation;

    var accuracy = errors / pattern.length;

    if (ignoreLocation) {
      return accuracy;
    }

    var proximity = Math.abs(expectedLocation - currentLocation);

    if (!distance) {
      // Dodge divide by zero error.
      return proximity ? 1.0 : accuracy;
    }

    return accuracy + proximity / distance;
  }

  function convertMaskToIndices() {
    var matchmask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var minMatchCharLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Config.minMatchCharLength;
    var indices = [];
    var start = -1;
    var end = -1;
    var i = 0;

    for (var len = matchmask.length; i < len; i += 1) {
      var match = matchmask[i];

      if (match && start === -1) {
        start = i;
      } else if (!match && start !== -1) {
        end = i - 1;

        if (end - start + 1 >= minMatchCharLength) {
          indices.push([start, end]);
        }

        start = -1;
      }
    } // (i-1 - start) + 1 => i - start


    if (matchmask[i - 1] && i - start >= minMatchCharLength) {
      indices.push([start, i - 1]);
    }

    return indices;
  }

  // Machine word size
  var MAX_BITS = 32;

  function search(text, pattern, patternAlphabet) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref$location = _ref.location,
        location = _ref$location === void 0 ? Config.location : _ref$location,
        _ref$distance = _ref.distance,
        distance = _ref$distance === void 0 ? Config.distance : _ref$distance,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === void 0 ? Config.threshold : _ref$threshold,
        _ref$findAllMatches = _ref.findAllMatches,
        findAllMatches = _ref$findAllMatches === void 0 ? Config.findAllMatches : _ref$findAllMatches,
        _ref$minMatchCharLeng = _ref.minMatchCharLength,
        minMatchCharLength = _ref$minMatchCharLeng === void 0 ? Config.minMatchCharLength : _ref$minMatchCharLeng,
        _ref$includeMatches = _ref.includeMatches,
        includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches,
        _ref$ignoreLocation = _ref.ignoreLocation,
        ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation;

    if (pattern.length > MAX_BITS) {
      throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS));
    }

    var patternLen = pattern.length; // Set starting location at beginning text and initialize the alphabet.

    var textLen = text.length; // Handle the case when location > text.length

    var expectedLocation = Math.max(0, Math.min(location, textLen)); // Highest score beyond which we give up.

    var currentThreshold = threshold; // Is there a nearby exact match? (speedup)

    var bestLocation = expectedLocation; // Performance: only computer matches when the minMatchCharLength > 1
    // OR if `includeMatches` is true.

    var computeMatches = minMatchCharLength > 1 || includeMatches; // A mask of the matches, used for building the indices

    var matchMask = computeMatches ? Array(textLen) : [];
    var index; // Get all exact matches, here for speed up

    while ((index = text.indexOf(pattern, bestLocation)) > -1) {
      var score = computeScore$1(pattern, {
        currentLocation: index,
        expectedLocation: expectedLocation,
        distance: distance,
        ignoreLocation: ignoreLocation
      });
      currentThreshold = Math.min(score, currentThreshold);
      bestLocation = index + patternLen;

      if (computeMatches) {
        var i = 0;

        while (i < patternLen) {
          matchMask[index + i] = 1;
          i += 1;
        }
      }
    } // Reset the best location


    bestLocation = -1;
    var lastBitArr = [];
    var finalScore = 1;
    var binMax = patternLen + textLen;
    var mask = 1 << patternLen - 1;

    for (var _i = 0; _i < patternLen; _i += 1) {
      // Scan for the best match; each iteration allows for one more error.
      // Run a binary search to determine how far from the match location we can stray
      // at this error level.
      var binMin = 0;
      var binMid = binMax;

      while (binMin < binMid) {
        var _score2 = computeScore$1(pattern, {
          errors: _i,
          currentLocation: expectedLocation + binMid,
          expectedLocation: expectedLocation,
          distance: distance,
          ignoreLocation: ignoreLocation
        });

        if (_score2 <= currentThreshold) {
          binMin = binMid;
        } else {
          binMax = binMid;
        }

        binMid = Math.floor((binMax - binMin) / 2 + binMin);
      } // Use the result from this iteration as the maximum for the next.


      binMax = binMid;
      var start = Math.max(1, expectedLocation - binMid + 1);
      var finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen; // Initialize the bit array

      var bitArr = Array(finish + 2);
      bitArr[finish + 1] = (1 << _i) - 1;

      for (var j = finish; j >= start; j -= 1) {
        var currentLocation = j - 1;
        var charMatch = patternAlphabet[text.charAt(currentLocation)];

        if (computeMatches) {
          // Speed up: quick bool to int conversion (i.e, `charMatch ? 1 : 0`)
          matchMask[currentLocation] = +!!charMatch;
        } // First pass: exact match


        bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch; // Subsequent passes: fuzzy match

        if (_i) {
          bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
        }

        if (bitArr[j] & mask) {
          finalScore = computeScore$1(pattern, {
            errors: _i,
            currentLocation: currentLocation,
            expectedLocation: expectedLocation,
            distance: distance,
            ignoreLocation: ignoreLocation
          }); // This match will almost certainly be better than any existing match.
          // But check anyway.

          if (finalScore <= currentThreshold) {
            // Indeed it is
            currentThreshold = finalScore;
            bestLocation = currentLocation; // Already passed `loc`, downhill from here on in.

            if (bestLocation <= expectedLocation) {
              break;
            } // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.


            start = Math.max(1, 2 * expectedLocation - bestLocation);
          }
        }
      } // No hope for a (better) match at greater error levels.


      var _score = computeScore$1(pattern, {
        errors: _i + 1,
        currentLocation: expectedLocation,
        expectedLocation: expectedLocation,
        distance: distance,
        ignoreLocation: ignoreLocation
      });

      if (_score > currentThreshold) {
        break;
      }

      lastBitArr = bitArr;
    }

    var result = {
      isMatch: bestLocation >= 0,
      // Count exact matches (those with a score of 0) to be "almost" exact
      score: Math.max(0.001, finalScore)
    };

    if (computeMatches) {
      var indices = convertMaskToIndices(matchMask, minMatchCharLength);

      if (!indices.length) {
        result.isMatch = false;
      } else if (includeMatches) {
        result.indices = indices;
      }
    }

    return result;
  }

  function createPatternAlphabet(pattern) {
    var mask = {};

    for (var i = 0, len = pattern.length; i < len; i += 1) {
      var _char = pattern.charAt(i);

      mask[_char] = (mask[_char] || 0) | 1 << len - i - 1;
    }

    return mask;
  }

  var BitapSearch = /*#__PURE__*/function () {
    function BitapSearch(pattern) {
      var _this = this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$location = _ref.location,
          location = _ref$location === void 0 ? Config.location : _ref$location,
          _ref$threshold = _ref.threshold,
          threshold = _ref$threshold === void 0 ? Config.threshold : _ref$threshold,
          _ref$distance = _ref.distance,
          distance = _ref$distance === void 0 ? Config.distance : _ref$distance,
          _ref$includeMatches = _ref.includeMatches,
          includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches,
          _ref$findAllMatches = _ref.findAllMatches,
          findAllMatches = _ref$findAllMatches === void 0 ? Config.findAllMatches : _ref$findAllMatches,
          _ref$minMatchCharLeng = _ref.minMatchCharLength,
          minMatchCharLength = _ref$minMatchCharLeng === void 0 ? Config.minMatchCharLength : _ref$minMatchCharLeng,
          _ref$isCaseSensitive = _ref.isCaseSensitive,
          isCaseSensitive = _ref$isCaseSensitive === void 0 ? Config.isCaseSensitive : _ref$isCaseSensitive,
          _ref$ignoreLocation = _ref.ignoreLocation,
          ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation;

      _classCallCheck(this, BitapSearch);

      this.options = {
        location: location,
        threshold: threshold,
        distance: distance,
        includeMatches: includeMatches,
        findAllMatches: findAllMatches,
        minMatchCharLength: minMatchCharLength,
        isCaseSensitive: isCaseSensitive,
        ignoreLocation: ignoreLocation
      };
      this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
      this.chunks = [];

      if (!this.pattern.length) {
        return;
      }

      var addChunk = function addChunk(pattern, startIndex) {
        _this.chunks.push({
          pattern: pattern,
          alphabet: createPatternAlphabet(pattern),
          startIndex: startIndex
        });
      };

      var len = this.pattern.length;

      if (len > MAX_BITS) {
        var i = 0;
        var remainder = len % MAX_BITS;
        var end = len - remainder;

        while (i < end) {
          addChunk(this.pattern.substr(i, MAX_BITS), i);
          i += MAX_BITS;
        }

        if (remainder) {
          var startIndex = len - MAX_BITS;
          addChunk(this.pattern.substr(startIndex), startIndex);
        }
      } else {
        addChunk(this.pattern, 0);
      }
    }

    _createClass(BitapSearch, [{
      key: "searchIn",
      value: function searchIn(text) {
        var _this$options = this.options,
            isCaseSensitive = _this$options.isCaseSensitive,
            includeMatches = _this$options.includeMatches;

        if (!isCaseSensitive) {
          text = text.toLowerCase();
        } // Exact match


        if (this.pattern === text) {
          var _result = {
            isMatch: true,
            score: 0
          };

          if (includeMatches) {
            _result.indices = [[0, text.length - 1]];
          }

          return _result;
        } // Otherwise, use Bitap algorithm


        var _this$options2 = this.options,
            location = _this$options2.location,
            distance = _this$options2.distance,
            threshold = _this$options2.threshold,
            findAllMatches = _this$options2.findAllMatches,
            minMatchCharLength = _this$options2.minMatchCharLength,
            ignoreLocation = _this$options2.ignoreLocation;
        var allIndices = [];
        var totalScore = 0;
        var hasMatches = false;
        this.chunks.forEach(function (_ref2) {
          var pattern = _ref2.pattern,
              alphabet = _ref2.alphabet,
              startIndex = _ref2.startIndex;

          var _search = search(text, pattern, alphabet, {
            location: location + startIndex,
            distance: distance,
            threshold: threshold,
            findAllMatches: findAllMatches,
            minMatchCharLength: minMatchCharLength,
            includeMatches: includeMatches,
            ignoreLocation: ignoreLocation
          }),
              isMatch = _search.isMatch,
              score = _search.score,
              indices = _search.indices;

          if (isMatch) {
            hasMatches = true;
          }

          totalScore += score;

          if (isMatch && indices) {
            allIndices = [].concat(_toConsumableArray(allIndices), _toConsumableArray(indices));
          }
        });
        var result = {
          isMatch: hasMatches,
          score: hasMatches ? totalScore / this.chunks.length : 1
        };

        if (hasMatches && includeMatches) {
          result.indices = allIndices;
        }

        return result;
      }
    }]);

    return BitapSearch;
  }();

  var BaseMatch = /*#__PURE__*/function () {
    function BaseMatch(pattern) {
      _classCallCheck(this, BaseMatch);

      this.pattern = pattern;
    }

    _createClass(BaseMatch, [{
      key: "search",
      value: function
        /*text*/
      search() {}
    }], [{
      key: "isMultiMatch",
      value: function isMultiMatch(pattern) {
        return getMatch(pattern, this.multiRegex);
      }
    }, {
      key: "isSingleMatch",
      value: function isSingleMatch(pattern) {
        return getMatch(pattern, this.singleRegex);
      }
    }]);

    return BaseMatch;
  }();

  function getMatch(pattern, exp) {
    var matches = pattern.match(exp);
    return matches ? matches[1] : null;
  }

  var ExactMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(ExactMatch, _BaseMatch);

    var _super = _createSuper(ExactMatch);

    function ExactMatch(pattern) {
      _classCallCheck(this, ExactMatch);

      return _super.call(this, pattern);
    }

    _createClass(ExactMatch, [{
      key: "search",
      value: function search(text) {
        var isMatch = text === this.pattern;
        return {
          isMatch: isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, this.pattern.length - 1]
        };
      }
    }], [{
      key: "type",
      get: function get() {
        return 'exact';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^="(.*)"$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^=(.*)$/;
      }
    }]);

    return ExactMatch;
  }(BaseMatch);

  var InverseExactMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(InverseExactMatch, _BaseMatch);

    var _super = _createSuper(InverseExactMatch);

    function InverseExactMatch(pattern) {
      _classCallCheck(this, InverseExactMatch);

      return _super.call(this, pattern);
    }

    _createClass(InverseExactMatch, [{
      key: "search",
      value: function search(text) {
        var index = text.indexOf(this.pattern);
        var isMatch = index === -1;
        return {
          isMatch: isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, text.length - 1]
        };
      }
    }], [{
      key: "type",
      get: function get() {
        return 'inverse-exact';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^!"(.*)"$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^!(.*)$/;
      }
    }]);

    return InverseExactMatch;
  }(BaseMatch);

  var PrefixExactMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(PrefixExactMatch, _BaseMatch);

    var _super = _createSuper(PrefixExactMatch);

    function PrefixExactMatch(pattern) {
      _classCallCheck(this, PrefixExactMatch);

      return _super.call(this, pattern);
    }

    _createClass(PrefixExactMatch, [{
      key: "search",
      value: function search(text) {
        var isMatch = text.startsWith(this.pattern);
        return {
          isMatch: isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, this.pattern.length - 1]
        };
      }
    }], [{
      key: "type",
      get: function get() {
        return 'prefix-exact';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^\^"(.*)"$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^\^(.*)$/;
      }
    }]);

    return PrefixExactMatch;
  }(BaseMatch);

  var InversePrefixExactMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(InversePrefixExactMatch, _BaseMatch);

    var _super = _createSuper(InversePrefixExactMatch);

    function InversePrefixExactMatch(pattern) {
      _classCallCheck(this, InversePrefixExactMatch);

      return _super.call(this, pattern);
    }

    _createClass(InversePrefixExactMatch, [{
      key: "search",
      value: function search(text) {
        var isMatch = !text.startsWith(this.pattern);
        return {
          isMatch: isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, text.length - 1]
        };
      }
    }], [{
      key: "type",
      get: function get() {
        return 'inverse-prefix-exact';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^!\^"(.*)"$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^!\^(.*)$/;
      }
    }]);

    return InversePrefixExactMatch;
  }(BaseMatch);

  var SuffixExactMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(SuffixExactMatch, _BaseMatch);

    var _super = _createSuper(SuffixExactMatch);

    function SuffixExactMatch(pattern) {
      _classCallCheck(this, SuffixExactMatch);

      return _super.call(this, pattern);
    }

    _createClass(SuffixExactMatch, [{
      key: "search",
      value: function search(text) {
        var isMatch = text.endsWith(this.pattern);
        return {
          isMatch: isMatch,
          score: isMatch ? 0 : 1,
          indices: [text.length - this.pattern.length, text.length - 1]
        };
      }
    }], [{
      key: "type",
      get: function get() {
        return 'suffix-exact';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^"(.*)"\$$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^(.*)\$$/;
      }
    }]);

    return SuffixExactMatch;
  }(BaseMatch);

  var InverseSuffixExactMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(InverseSuffixExactMatch, _BaseMatch);

    var _super = _createSuper(InverseSuffixExactMatch);

    function InverseSuffixExactMatch(pattern) {
      _classCallCheck(this, InverseSuffixExactMatch);

      return _super.call(this, pattern);
    }

    _createClass(InverseSuffixExactMatch, [{
      key: "search",
      value: function search(text) {
        var isMatch = !text.endsWith(this.pattern);
        return {
          isMatch: isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, text.length - 1]
        };
      }
    }], [{
      key: "type",
      get: function get() {
        return 'inverse-suffix-exact';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^!"(.*)"\$$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^!(.*)\$$/;
      }
    }]);

    return InverseSuffixExactMatch;
  }(BaseMatch);

  var FuzzyMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(FuzzyMatch, _BaseMatch);

    var _super = _createSuper(FuzzyMatch);

    function FuzzyMatch(pattern) {
      var _this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$location = _ref.location,
          location = _ref$location === void 0 ? Config.location : _ref$location,
          _ref$threshold = _ref.threshold,
          threshold = _ref$threshold === void 0 ? Config.threshold : _ref$threshold,
          _ref$distance = _ref.distance,
          distance = _ref$distance === void 0 ? Config.distance : _ref$distance,
          _ref$includeMatches = _ref.includeMatches,
          includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches,
          _ref$findAllMatches = _ref.findAllMatches,
          findAllMatches = _ref$findAllMatches === void 0 ? Config.findAllMatches : _ref$findAllMatches,
          _ref$minMatchCharLeng = _ref.minMatchCharLength,
          minMatchCharLength = _ref$minMatchCharLeng === void 0 ? Config.minMatchCharLength : _ref$minMatchCharLeng,
          _ref$isCaseSensitive = _ref.isCaseSensitive,
          isCaseSensitive = _ref$isCaseSensitive === void 0 ? Config.isCaseSensitive : _ref$isCaseSensitive,
          _ref$ignoreLocation = _ref.ignoreLocation,
          ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation;

      _classCallCheck(this, FuzzyMatch);

      _this = _super.call(this, pattern);
      _this._bitapSearch = new BitapSearch(pattern, {
        location: location,
        threshold: threshold,
        distance: distance,
        includeMatches: includeMatches,
        findAllMatches: findAllMatches,
        minMatchCharLength: minMatchCharLength,
        isCaseSensitive: isCaseSensitive,
        ignoreLocation: ignoreLocation
      });
      return _this;
    }

    _createClass(FuzzyMatch, [{
      key: "search",
      value: function search(text) {
        return this._bitapSearch.searchIn(text);
      }
    }], [{
      key: "type",
      get: function get() {
        return 'fuzzy';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^"(.*)"$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^(.*)$/;
      }
    }]);

    return FuzzyMatch;
  }(BaseMatch);

  var IncludeMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(IncludeMatch, _BaseMatch);

    var _super = _createSuper(IncludeMatch);

    function IncludeMatch(pattern) {
      _classCallCheck(this, IncludeMatch);

      return _super.call(this, pattern);
    }

    _createClass(IncludeMatch, [{
      key: "search",
      value: function search(text) {
        var location = 0;
        var index;
        var indices = [];
        var patternLen = this.pattern.length; // Get all exact matches

        while ((index = text.indexOf(this.pattern, location)) > -1) {
          location = index + patternLen;
          indices.push([index, location - 1]);
        }

        var isMatch = !!indices.length;
        return {
          isMatch: isMatch,
          score: isMatch ? 0 : 1,
          indices: indices
        };
      }
    }], [{
      key: "type",
      get: function get() {
        return 'include';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^'"(.*)"$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^'(.*)$/;
      }
    }]);

    return IncludeMatch;
  }(BaseMatch);

  var searchers = [ExactMatch, IncludeMatch, PrefixExactMatch, InversePrefixExactMatch, InverseSuffixExactMatch, SuffixExactMatch, InverseExactMatch, FuzzyMatch];
  var searchersLen = searchers.length; // Regex to split by spaces, but keep anything in quotes together

  var SPACE_RE = / +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/;
  var OR_TOKEN = '|'; // Return a 2D array representation of the query, for simpler parsing.
  // Example:
  // "^core go$ | rb$ | py$ xy$" => [["^core", "go$"], ["rb$"], ["py$", "xy$"]]

  function parseQuery(pattern) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return pattern.split(OR_TOKEN).map(function (item) {
      var query = item.trim().split(SPACE_RE).filter(function (item) {
        return item && !!item.trim();
      });
      var results = [];

      for (var i = 0, len = query.length; i < len; i += 1) {
        var queryItem = query[i]; // 1. Handle multiple query match (i.e, once that are quoted, like `"hello world"`)

        var found = false;
        var idx = -1;

        while (!found && ++idx < searchersLen) {
          var searcher = searchers[idx];
          var token = searcher.isMultiMatch(queryItem);

          if (token) {
            results.push(new searcher(token, options));
            found = true;
          }
        }

        if (found) {
          continue;
        } // 2. Handle single query matches (i.e, once that are *not* quoted)


        idx = -1;

        while (++idx < searchersLen) {
          var _searcher = searchers[idx];

          var _token = _searcher.isSingleMatch(queryItem);

          if (_token) {
            results.push(new _searcher(_token, options));
            break;
          }
        }
      }

      return results;
    });
  }

  // to a singl match

  var MultiMatchSet = new Set([FuzzyMatch.type, IncludeMatch.type]);
  /**
   * Command-like searching
   * ======================
   *
   * Given multiple search terms delimited by spaces.e.g. `^jscript .python$ ruby !java`,
   * search in a given text.
   *
   * Search syntax:
   *
   * | Token       | Match type                 | Description                            |
   * | ----------- | -------------------------- | -------------------------------------- |
   * | `jscript`   | fuzzy-match                | Items that fuzzy match `jscript`       |
   * | `=scheme`   | exact-match                | Items that are `scheme`                |
   * | `'python`   | include-match              | Items that include `python`            |
   * | `!ruby`     | inverse-exact-match        | Items that do not include `ruby`       |
   * | `^java`     | prefix-exact-match         | Items that start with `java`           |
   * | `!^earlang` | inverse-prefix-exact-match | Items that do not start with `earlang` |
   * | `.js$`      | suffix-exact-match         | Items that end with `.js`              |
   * | `!.go$`     | inverse-suffix-exact-match | Items that do not end with `.go`       |
   *
   * A single pipe character acts as an OR operator. For example, the following
   * query matches entries that start with `core` and end with either`go`, `rb`,
   * or`py`.
   *
   * ```
   * ^core go$ | rb$ | py$
   * ```
   */

  var ExtendedSearch = /*#__PURE__*/function () {
    function ExtendedSearch(pattern) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$isCaseSensitive = _ref.isCaseSensitive,
          isCaseSensitive = _ref$isCaseSensitive === void 0 ? Config.isCaseSensitive : _ref$isCaseSensitive,
          _ref$includeMatches = _ref.includeMatches,
          includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches,
          _ref$minMatchCharLeng = _ref.minMatchCharLength,
          minMatchCharLength = _ref$minMatchCharLeng === void 0 ? Config.minMatchCharLength : _ref$minMatchCharLeng,
          _ref$ignoreLocation = _ref.ignoreLocation,
          ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation,
          _ref$findAllMatches = _ref.findAllMatches,
          findAllMatches = _ref$findAllMatches === void 0 ? Config.findAllMatches : _ref$findAllMatches,
          _ref$location = _ref.location,
          location = _ref$location === void 0 ? Config.location : _ref$location,
          _ref$threshold = _ref.threshold,
          threshold = _ref$threshold === void 0 ? Config.threshold : _ref$threshold,
          _ref$distance = _ref.distance,
          distance = _ref$distance === void 0 ? Config.distance : _ref$distance;

      _classCallCheck(this, ExtendedSearch);

      this.query = null;
      this.options = {
        isCaseSensitive: isCaseSensitive,
        includeMatches: includeMatches,
        minMatchCharLength: minMatchCharLength,
        findAllMatches: findAllMatches,
        ignoreLocation: ignoreLocation,
        location: location,
        threshold: threshold,
        distance: distance
      };
      this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
      this.query = parseQuery(this.pattern, this.options);
    }

    _createClass(ExtendedSearch, [{
      key: "searchIn",
      value: function searchIn(text) {
        var query = this.query;

        if (!query) {
          return {
            isMatch: false,
            score: 1
          };
        }

        var _this$options = this.options,
            includeMatches = _this$options.includeMatches,
            isCaseSensitive = _this$options.isCaseSensitive;
        text = isCaseSensitive ? text : text.toLowerCase();
        var numMatches = 0;
        var allIndices = [];
        var totalScore = 0; // ORs

        for (var i = 0, qLen = query.length; i < qLen; i += 1) {
          var searchers = query[i]; // Reset indices

          allIndices.length = 0;
          numMatches = 0; // ANDs

          for (var j = 0, pLen = searchers.length; j < pLen; j += 1) {
            var searcher = searchers[j];

            var _searcher$search = searcher.search(text),
                isMatch = _searcher$search.isMatch,
                indices = _searcher$search.indices,
                score = _searcher$search.score;

            if (isMatch) {
              numMatches += 1;
              totalScore += score;

              if (includeMatches) {
                var type = searcher.constructor.type;

                if (MultiMatchSet.has(type)) {
                  allIndices = [].concat(_toConsumableArray(allIndices), _toConsumableArray(indices));
                } else {
                  allIndices.push(indices);
                }
              }
            } else {
              totalScore = 0;
              numMatches = 0;
              allIndices.length = 0;
              break;
            }
          } // OR condition, so if TRUE, return


          if (numMatches) {
            var result = {
              isMatch: true,
              score: totalScore / numMatches
            };

            if (includeMatches) {
              result.indices = allIndices;
            }

            return result;
          }
        } // Nothing was matched


        return {
          isMatch: false,
          score: 1
        };
      }
    }], [{
      key: "condition",
      value: function condition(_, options) {
        return options.useExtendedSearch;
      }
    }]);

    return ExtendedSearch;
  }();

  var registeredSearchers = [];
  function register() {
    registeredSearchers.push.apply(registeredSearchers, arguments);
  }
  function createSearcher(pattern, options) {
    for (var i = 0, len = registeredSearchers.length; i < len; i += 1) {
      var searcherClass = registeredSearchers[i];

      if (searcherClass.condition(pattern, options)) {
        return new searcherClass(pattern, options);
      }
    }

    return new BitapSearch(pattern, options);
  }

  var LogicalOperator = {
    AND: '$and',
    OR: '$or'
  };
  var KeyType = {
    PATH: '$path',
    PATTERN: '$val'
  };

  var isExpression = function isExpression(query) {
    return !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
  };

  var isPath = function isPath(query) {
    return !!query[KeyType.PATH];
  };

  var isLeaf = function isLeaf(query) {
    return !isArray(query) && isObject(query) && !isExpression(query);
  };

  var convertToExplicit = function convertToExplicit(query) {
    return _defineProperty({}, LogicalOperator.AND, Object.keys(query).map(function (key) {
      return _defineProperty({}, key, query[key]);
    }));
  }; // When `auto` is `true`, the parse function will infer and initialize and add
  // the appropriate `Searcher` instance


  function parse(query, options) {
    var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref3$auto = _ref3.auto,
        auto = _ref3$auto === void 0 ? true : _ref3$auto;

    var next = function next(query) {
      var keys = Object.keys(query);
      var isQueryPath = isPath(query);

      if (!isQueryPath && keys.length > 1 && !isExpression(query)) {
        return next(convertToExplicit(query));
      }

      if (isLeaf(query)) {
        var key = isQueryPath ? query[KeyType.PATH] : keys[0];
        var pattern = isQueryPath ? query[KeyType.PATTERN] : query[key];

        if (!isString(pattern)) {
          throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
        }

        var obj = {
          keyId: createKeyId(key),
          pattern: pattern
        };

        if (auto) {
          obj.searcher = createSearcher(pattern, options);
        }

        return obj;
      }

      var node = {
        children: [],
        operator: keys[0]
      };
      keys.forEach(function (key) {
        var value = query[key];

        if (isArray(value)) {
          value.forEach(function (item) {
            node.children.push(next(item));
          });
        }
      });
      return node;
    };

    if (!isExpression(query)) {
      query = convertToExplicit(query);
    }

    return next(query);
  }

  function computeScore(results, _ref) {
    var _ref$ignoreFieldNorm = _ref.ignoreFieldNorm,
        ignoreFieldNorm = _ref$ignoreFieldNorm === void 0 ? Config.ignoreFieldNorm : _ref$ignoreFieldNorm;
    results.forEach(function (result) {
      var totalScore = 1;
      result.matches.forEach(function (_ref2) {
        var key = _ref2.key,
            norm = _ref2.norm,
            score = _ref2.score;
        var weight = key ? key.weight : null;
        totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm));
      });
      result.score = totalScore;
    });
  }

  function transformMatches(result, data) {
    var matches = result.matches;
    data.matches = [];

    if (!isDefined(matches)) {
      return;
    }

    matches.forEach(function (match) {
      if (!isDefined(match.indices) || !match.indices.length) {
        return;
      }

      var indices = match.indices,
          value = match.value;
      var obj = {
        indices: indices,
        value: value
      };

      if (match.key) {
        obj.key = match.key.src;
      }

      if (match.idx > -1) {
        obj.refIndex = match.idx;
      }

      data.matches.push(obj);
    });
  }

  function transformScore(result, data) {
    data.score = result.score;
  }

  function format(results, docs) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$includeMatches = _ref.includeMatches,
        includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches,
        _ref$includeScore = _ref.includeScore,
        includeScore = _ref$includeScore === void 0 ? Config.includeScore : _ref$includeScore;

    var transformers = [];
    if (includeMatches) transformers.push(transformMatches);
    if (includeScore) transformers.push(transformScore);
    return results.map(function (result) {
      var idx = result.idx;
      var data = {
        item: docs[idx],
        refIndex: idx
      };

      if (transformers.length) {
        transformers.forEach(function (transformer) {
          transformer(result, data);
        });
      }

      return data;
    });
  }

  var Fuse$1 = /*#__PURE__*/function () {
    function Fuse(docs) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var index = arguments.length > 2 ? arguments[2] : undefined;

      _classCallCheck(this, Fuse);

      this.options = _objectSpread2(_objectSpread2({}, Config), options);

      if (this.options.useExtendedSearch && !true) {
        throw new Error(EXTENDED_SEARCH_UNAVAILABLE);
      }

      this._keyStore = new KeyStore(this.options.keys);
      this.setCollection(docs, index);
    }

    _createClass(Fuse, [{
      key: "setCollection",
      value: function setCollection(docs, index) {
        this._docs = docs;

        if (index && !(index instanceof FuseIndex)) {
          throw new Error(INCORRECT_INDEX_TYPE);
        }

        this._myIndex = index || createIndex(this.options.keys, this._docs, {
          getFn: this.options.getFn,
          fieldNormWeight: this.options.fieldNormWeight
        });
      }
    }, {
      key: "add",
      value: function add(doc) {
        if (!isDefined(doc)) {
          return;
        }

        this._docs.push(doc);

        this._myIndex.add(doc);
      }
    }, {
      key: "remove",
      value: function remove() {
        var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function
          /* doc, idx */
        () {
          return false;
        };
        var results = [];

        for (var i = 0, len = this._docs.length; i < len; i += 1) {
          var doc = this._docs[i];

          if (predicate(doc, i)) {
            this.removeAt(i);
            i -= 1;
            len -= 1;
            results.push(doc);
          }
        }

        return results;
      }
    }, {
      key: "removeAt",
      value: function removeAt(idx) {
        this._docs.splice(idx, 1);

        this._myIndex.removeAt(idx);
      }
    }, {
      key: "getIndex",
      value: function getIndex() {
        return this._myIndex;
      }
    }, {
      key: "search",
      value: function search(query) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$limit = _ref.limit,
            limit = _ref$limit === void 0 ? -1 : _ref$limit;

        var _this$options = this.options,
            includeMatches = _this$options.includeMatches,
            includeScore = _this$options.includeScore,
            shouldSort = _this$options.shouldSort,
            sortFn = _this$options.sortFn,
            ignoreFieldNorm = _this$options.ignoreFieldNorm;
        var results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
        computeScore(results, {
          ignoreFieldNorm: ignoreFieldNorm
        });

        if (shouldSort) {
          results.sort(sortFn);
        }

        if (isNumber(limit) && limit > -1) {
          results = results.slice(0, limit);
        }

        return format(results, this._docs, {
          includeMatches: includeMatches,
          includeScore: includeScore
        });
      }
    }, {
      key: "_searchStringList",
      value: function _searchStringList(query) {
        var searcher = createSearcher(query, this.options);
        var records = this._myIndex.records;
        var results = []; // Iterate over every string in the index

        records.forEach(function (_ref2) {
          var text = _ref2.v,
              idx = _ref2.i,
              norm = _ref2.n;

          if (!isDefined(text)) {
            return;
          }

          var _searcher$searchIn = searcher.searchIn(text),
              isMatch = _searcher$searchIn.isMatch,
              score = _searcher$searchIn.score,
              indices = _searcher$searchIn.indices;

          if (isMatch) {
            results.push({
              item: text,
              idx: idx,
              matches: [{
                score: score,
                value: text,
                norm: norm,
                indices: indices
              }]
            });
          }
        });
        return results;
      }
    }, {
      key: "_searchLogical",
      value: function _searchLogical(query) {
        var _this = this;

        var expression = parse(query, this.options);

        var evaluate = function evaluate(node, item, idx) {
          if (!node.children) {
            var keyId = node.keyId,
                searcher = node.searcher;

            var matches = _this._findMatches({
              key: _this._keyStore.get(keyId),
              value: _this._myIndex.getValueForItemAtKeyId(item, keyId),
              searcher: searcher
            });

            if (matches && matches.length) {
              return [{
                idx: idx,
                item: item,
                matches: matches
              }];
            }

            return [];
          }

          var res = [];

          for (var i = 0, len = node.children.length; i < len; i += 1) {
            var child = node.children[i];
            var result = evaluate(child, item, idx);

            if (result.length) {
              res.push.apply(res, _toConsumableArray(result));
            } else if (node.operator === LogicalOperator.AND) {
              return [];
            }
          }

          return res;
        };

        var records = this._myIndex.records;
        var resultMap = {};
        var results = [];
        records.forEach(function (_ref3) {
          var item = _ref3.$,
              idx = _ref3.i;

          if (isDefined(item)) {
            var expResults = evaluate(expression, item, idx);

            if (expResults.length) {
              // Dedupe when adding
              if (!resultMap[idx]) {
                resultMap[idx] = {
                  idx: idx,
                  item: item,
                  matches: []
                };
                results.push(resultMap[idx]);
              }

              expResults.forEach(function (_ref4) {
                var _resultMap$idx$matche;

                var matches = _ref4.matches;

                (_resultMap$idx$matche = resultMap[idx].matches).push.apply(_resultMap$idx$matche, _toConsumableArray(matches));
              });
            }
          }
        });
        return results;
      }
    }, {
      key: "_searchObjectList",
      value: function _searchObjectList(query) {
        var _this2 = this;

        var searcher = createSearcher(query, this.options);
        var _this$_myIndex = this._myIndex,
            keys = _this$_myIndex.keys,
            records = _this$_myIndex.records;
        var results = []; // List is Array<Object>

        records.forEach(function (_ref5) {
          var item = _ref5.$,
              idx = _ref5.i;

          if (!isDefined(item)) {
            return;
          }

          var matches = []; // Iterate over every key (i.e, path), and fetch the value at that key

          keys.forEach(function (key, keyIndex) {
            matches.push.apply(matches, _toConsumableArray(_this2._findMatches({
              key: key,
              value: item[keyIndex],
              searcher: searcher
            })));
          });

          if (matches.length) {
            results.push({
              idx: idx,
              item: item,
              matches: matches
            });
          }
        });
        return results;
      }
    }, {
      key: "_findMatches",
      value: function _findMatches(_ref6) {
        var key = _ref6.key,
            value = _ref6.value,
            searcher = _ref6.searcher;

        if (!isDefined(value)) {
          return [];
        }

        var matches = [];

        if (isArray(value)) {
          value.forEach(function (_ref7) {
            var text = _ref7.v,
                idx = _ref7.i,
                norm = _ref7.n;

            if (!isDefined(text)) {
              return;
            }

            var _searcher$searchIn2 = searcher.searchIn(text),
                isMatch = _searcher$searchIn2.isMatch,
                score = _searcher$searchIn2.score,
                indices = _searcher$searchIn2.indices;

            if (isMatch) {
              matches.push({
                score: score,
                key: key,
                value: text,
                idx: idx,
                norm: norm,
                indices: indices
              });
            }
          });
        } else {
          var text = value.v,
              norm = value.n;

          var _searcher$searchIn3 = searcher.searchIn(text),
              isMatch = _searcher$searchIn3.isMatch,
              score = _searcher$searchIn3.score,
              indices = _searcher$searchIn3.indices;

          if (isMatch) {
            matches.push({
              score: score,
              key: key,
              value: text,
              norm: norm,
              indices: indices
            });
          }
        }

        return matches;
      }
    }]);

    return Fuse;
  }();

  Fuse$1.version = '6.5.3';
  Fuse$1.createIndex = createIndex;
  Fuse$1.parseIndex = parseIndex;
  Fuse$1.config = Config;

  {
    Fuse$1.parseQuery = parse;
  }

  {
    register(ExtendedSearch);
  }

  var Fuse = Fuse$1;

  return Fuse;

}));
;
/*global angular document navigator*/
(function withAngular(angular, navigator) {

  'use strict';

  var A_DAY_IN_MILLISECONDS = 86400000
    , isMobile = (function isMobile() {

      if (navigator.userAgent &&
        (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i))) {

        return true;
      }
    }())
    , generateMonthAndYearHeader = function generateMonthAndYearHeader(prevButton, nextButton, preventMobile) {

      if (preventMobile) {

        isMobile = false;
      }

      if (isMobile) {

        return [
          '<div class="_720kb-datepicker-calendar-header">',
            '<div class="_720kb-datepicker-calendar-header-middle _720kb-datepicker-mobile-item _720kb-datepicker-calendar-month">',
              '<select ng-model="month" title="{{ dateMonthTitle }}" ng-change="selectedMonthHandle(month)">',
                '<option ng-repeat="item in months" ng-selected="item === month" ng-disabled=\'!isSelectableMaxDate(item + " " + day + ", " + year) || !isSelectableMinDate(item + " " + day + ", " + year)\' ng-value="$index + 1" value="$index + 1">',
                  '{{ item }}',
                '</option>',
              '</select>',
            '</div>',
          '</div>',
          '<div class="_720kb-datepicker-calendar-header">',
            '<div class="_720kb-datepicker-calendar-header-middle _720kb-datepicker-mobile-item _720kb-datepicker-calendar-month">',
              '<select ng-model="mobileYear" title="{{ dateYearTitle }}" ng-change="setNewYear(mobileYear)">',
                '<option ng-repeat="item in paginationYears track by $index" ng-selected="year === item" ng-disabled="!isSelectableMinYear(item) || !isSelectableMaxYear(item)" ng-value="item" value="item">',
                  '{{ item }}',
                '</option>',
              '</select>',
            '</div>',
          '</div>'
        ];
      }

      return [
        '<div class="_720kb-datepicker-calendar-header">',
          '<div class="_720kb-datepicker-calendar-header-left">',
            '<a class="_720kb-datepicker-calendar-month-button" href="javascript:void(0)" ng-class="{\'_720kb-datepicker-item-hidden\': !willPrevMonthBeSelectable()}" ng-click="prevMonth()" title="{{ buttonPrevTitle }}">',
              prevButton,
            '</a>',
          '</div>',
          '<div class="_720kb-datepicker-calendar-header-middle _720kb-datepicker-calendar-month">',
            '{{month}}&nbsp;',
            '<a href="javascript:void(0)" ng-click="paginateYears(year); showYearsPagination = !showYearsPagination;">',
              '<span>',
                '{{year}}',
                '<i ng-class="{\'_720kb-datepicker-calendar-header-closed-pagination\': !showYearsPagination, \'_720kb-datepicker-calendar-header-opened-pagination\': showYearsPagination}">',
                  '<svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.4625 0.292499L5.5825 4.1725L1.7025 0.2925C1.3125 -0.0975002 0.6825 -0.0975001 0.2925 0.2925C-0.0974999 0.6825 -0.0974998 1.3125 0.2925 1.7025L4.8825 6.2925C5.2725 6.6825 5.9025 6.6825 6.2925 6.2925L10.8825 1.7025C11.2725 1.3125 11.2725 0.682498 10.8825 0.292498C10.4925 -0.0875015 9.8525 -0.0975014 9.4625 0.292499Z" fill="#557B92"/></svg>',
                '</i>',
              '</span>',
            '</a>',
          '</div>',
          '<div class="_720kb-datepicker-calendar-header-right">',
          '<a class="_720kb-datepicker-calendar-month-button" ng-class="{\'_720kb-datepicker-item-hidden\': !willNextMonthBeSelectable()}" href="javascript:void(0)" ng-click="nextMonth()" title="{{ buttonNextTitle }}">',
            nextButton,
          '</a>',
          '</div>',
        '</div>'
      ];
    }
    , generateYearsPaginationHeader = function generateYearsPaginationHeader(prevButton, nextButton) {

      return [
        '<div class="_720kb-datepicker-calendar-header header-year" ng-show="showYearsPagination">',
          '<div class="_720kb-datepicker-calendar-years-pagination">',
            '<a ng-class="{\'_720kb-datepicker-active\': y === year, \'_720kb-datepicker-disabled\': !isSelectableMaxYear(y) || !isSelectableMinYear(y)}" href="javascript:void(0)" ng-click="setNewYear(y)" ng-repeat="y in paginationYears track by $index">',
              '{{y}}',
            '</a>',
          '</div>',
          '<div class="_720kb-datepicker-calendar-years-pagination-pages">',
            '<a href="javascript:void(0)" ng-click="paginateYears(paginationYears[0])" ng-class="{\'_720kb-datepicker-item-hidden\': paginationYearsPrevDisabled}">',
              prevButton,
            '</a>',
            '<a href="javascript:void(0)" ng-click="paginateYears(paginationYears[paginationYears.length -1 ])" ng-class="{\'_720kb-datepicker-item-hidden\': paginationYearsNextDisabled}">',
              nextButton,
            '</a>',
          '</div>',
        '</div>'
      ];
    }
    , generateDaysColumns = function generateDaysColumns() {

      return [
      '<div class="_720kb-datepicker-calendar-days-header">',
        '<div ng-repeat="d in daysInString">',
          '{{d}}',
        '</div>',
      '</div>'
      ];
    }
    , generateDays = function generateDays() {

      return [
        '<div class="_720kb-datepicker-calendar-body">',
          '<a href="javascript:void(0)" ng-repeat="px in prevMonthDays" class="_720kb-datepicker-calendar-day _720kb-datepicker-disabled">',
            '{{px}}',
          '</a>',
          '<a href="javascript:void(0)" ng-repeat="item in days" ng-click="setDatepickerDay(item)" ng-class="{\'_720kb-datepicker-active\': selectedDay === item && selectedMonth === monthNumber && selectedYear === year, \'_720kb-datepicker-disabled\': !isSelectableMinDate(year + \'/\' + monthNumber + \'/\' + item ) || !isSelectableMaxDate(year + \'/\' + monthNumber + \'/\' + item) || !isSelectableDate(monthNumber, year, item) || !isSelectableDay(monthNumber, year, item),\'_720kb-datepicker-today\': item === today.getDate() && monthNumber === (today.getMonth() + 1) && year === today.getFullYear() && !selectedDay}" class="_720kb-datepicker-calendar-day">',
            '<span>{{item}}</span>',
          '</a>',
          '<a href="javascript:void(0)" ng-repeat="nx in nextMonthDays" class="_720kb-datepicker-calendar-day _720kb-datepicker-disabled">',
            '{{nx}}',
          '</a>',
        '</div>'
      ];
    }
    , generateHtmlTemplate = function generateHtmlTemplate(prevButton, nextButton, preventMobile) {

      var toReturn = [
        '<div class="_720kb-datepicker-calendar {{datepickerClass}} {{datepickerID}}" ng-class="{\'_720kb-datepicker-forced-to-open\': checkVisibility()}" ng-blur="hideCalendar()">',
        '</div>'
      ]
      , monthAndYearHeader = generateMonthAndYearHeader(prevButton, nextButton, preventMobile)
      , yearsPaginationHeader = generateYearsPaginationHeader(prevButton, nextButton)
      , daysColumns = generateDaysColumns()
      , days = generateDays()
      , iterator = function iterator(aRow) {

        toReturn.splice(toReturn.length - 1, 0, aRow);
      };

      monthAndYearHeader.forEach(iterator);
      yearsPaginationHeader.forEach(iterator);
      daysColumns.forEach(iterator);
      days.forEach(iterator);

      return toReturn.join('');
    }
    , datepickerDirective = function datepickerDirective($window, $compile, $locale, $filter, $interpolate, $timeout) {

      var linkingFunction = function linkingFunction($scope, element, attr) {

        //get child input
        var selector = attr.selector
          , thisInput = angular.element(selector ? element[0].querySelector('.' + selector) : element[0].children[0])
          , theCalendar
          , defaultPrevButton = '<b class="_720kb-datepicker-default-button left"><svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.4625 0.292499L5.5825 4.1725L1.7025 0.2925C1.3125 -0.0975002 0.6825 -0.0975001 0.2925 0.2925C-0.0974999 0.6825 -0.0974998 1.3125 0.2925 1.7025L4.8825 6.2925C5.2725 6.6825 5.9025 6.6825 6.2925 6.2925L10.8825 1.7025C11.2725 1.3125 11.2725 0.682498 10.8825 0.292498C10.4925 -0.0875015 9.8525 -0.0975014 9.4625 0.292499Z" fill="#557B92"/></svg></b>'
          , defaultNextButton = '<b class="_720kb-datepicker-default-button right"><svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.4625 0.292499L5.5825 4.1725L1.7025 0.2925C1.3125 -0.0975002 0.6825 -0.0975001 0.2925 0.2925C-0.0974999 0.6825 -0.0974998 1.3125 0.2925 1.7025L4.8825 6.2925C5.2725 6.6825 5.9025 6.6825 6.2925 6.2925L10.8825 1.7025C11.2725 1.3125 11.2725 0.682498 10.8825 0.292498C10.4925 -0.0875015 9.8525 -0.0975014 9.4625 0.292499Z" fill="#557B92"/></svg></b>'
          , prevButton = attr.buttonPrev || defaultPrevButton
          , nextButton = attr.buttonNext || defaultNextButton
          , dateFormat = attr.dateFormat
          //, dateMinLimit
          //, dateMaxLimit
          , dateDisabledDates = $scope.$eval($scope.dateDisabledDates)
          , dateEnabledDates = $scope.$eval($scope.dateEnabledDates)
          , dateDisabledWeekdays = $scope.$eval($scope.dateDisabledWeekdays)
          , date = new Date()
          , isMouseOn = false
          , isMouseOnInput = false
          , preventMobile = typeof attr.datepickerMobile !== 'undefined' && attr.datepickerMobile !== 'false'
          , datetime = $locale.DATETIME_FORMATS
          , pageDatepickers
          , hours24h = 86400000
          , htmlTemplate = generateHtmlTemplate(prevButton, nextButton, preventMobile)
          , n
          , onClickOnWindow = function onClickOnWindow() {

            if (!isMouseOn &&
              !isMouseOnInput && theCalendar) {

              $scope.hideCalendar();
            }
          }
          , setDaysInMonth = function setDaysInMonth(month, year) {

            var i
              , limitDate = new Date(year, month, 0).getDate()
              , firstDayMonthNumber = new Date(year + '/' + month + '/' + 1).getDay()
              , lastDayMonthNumber = new Date(year + '/' + month + '/' + limitDate).getDay()
              , prevMonthDays = []
              , nextMonthDays = []
              , howManyNextDays
              , howManyPreviousDays
              , monthAlias
              , dateWeekEndDay;

            $scope.days = [];
            $scope.dateWeekStartDay = $scope.validateWeekDay($scope.dateWeekStartDay);
            dateWeekEndDay = ($scope.dateWeekStartDay + 6) % 7;

            for (i = 1; i <= limitDate; i += 1) {

              $scope.days.push(i);
            }

            //get previous month days if first day in month is not first day in week
            if (firstDayMonthNumber === $scope.dateWeekStartDay) {

              //no need for it
              $scope.prevMonthDays = [];
            } else {

              howManyPreviousDays = firstDayMonthNumber - $scope.dateWeekStartDay;

              if (firstDayMonthNumber < $scope.dateWeekStartDay) {

                howManyPreviousDays += 7;
              }

              //get previous month
              if (Number(month) === 1) {

                monthAlias = 12;
              } else {

                monthAlias = month - 1;
              }
              //return previous month days
              for (i = 1; i <= new Date(year, monthAlias, 0).getDate(); i += 1) {

                prevMonthDays.push(i);
              }
              //attach previous month days
              $scope.prevMonthDays = prevMonthDays.slice(-howManyPreviousDays);
            }

            //get next month days if last day in month is not last day in week
            if (lastDayMonthNumber === dateWeekEndDay) {
              //no need for it
              $scope.nextMonthDays = [];
            } else {
              howManyNextDays = 6 - lastDayMonthNumber + $scope.dateWeekStartDay;

              if (lastDayMonthNumber < $scope.dateWeekStartDay) {

                howManyNextDays -= 7;
              }
              //get previous month

              //return next month days
              for (i = 1; i <= howManyNextDays; i += 1) {

                nextMonthDays.push(i);
              }
              //attach previous month days
              $scope.nextMonthDays = nextMonthDays;
            }
          }
          , resetToMinDate = function resetToMinDate() {

            $scope.month = $filter('date')(new Date($scope.dateMinLimit), 'MMMM');
            $scope.monthNumber = Number($filter('date')(new Date($scope.dateMinLimit), 'MM'));
            $scope.day = Number($filter('date')(new Date($scope.dateMinLimit), 'dd'));
            $scope.year = Number($filter('date')(new Date($scope.dateMinLimit), 'yyyy'));

            setDaysInMonth($scope.monthNumber, $scope.year);
          }
          , resetToMaxDate = function resetToMaxDate() {

            $scope.month = $filter('date')(new Date($scope.dateMaxLimit), 'MMMM');
            $scope.monthNumber = Number($filter('date')(new Date($scope.dateMaxLimit), 'MM'));
            $scope.day = Number($filter('date')(new Date($scope.dateMaxLimit), 'dd'));
            $scope.year = Number($filter('date')(new Date($scope.dateMaxLimit), 'yyyy'));

            setDaysInMonth($scope.monthNumber, $scope.year);
          }
          , prevYear = function prevYear() {

            $scope.year = Number($scope.year) - 1;
          }
          , nextYear = function nextYear() {

            $scope.year = Number($scope.year) + 1;
          }
          , localDateTimestamp = function localDateTimestamp(rawDate, dateFormatDefinition) {
            
            var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|MMMM|MMM|MM|M|dd?d?|yy?yy?y?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g
            ,formatDate,dateSplit, m, d, y, index, el, longName, shortName;

            for (index = 0; index < datetime.MONTH.length; index += 1) {
              longName = datetime.MONTH[index];
              shortName = datetime.SHORTMONTH[index];

              if (rawDate.indexOf(longName) !== -1) {
                rawDate = rawDate.replace(longName, index + 1);
                break;
              }

              if (rawDate.indexOf(shortName) !== -1) {
                rawDate = rawDate.replace(shortName, index + 1);
                break;
              }              
            }

            dateSplit = rawDate
              .split(/\D/)
              .filter(function dateSplitFilter(item) {
                return item.length > 0;
              });

            formatDate = dateFormatDefinition
              .match(formattingTokens)
              .filter(function fromatDateFilter(item) {
                return item.match(/^[a-zA-Z]+$/i) !== null;
              });

            for (index = 0; index < formatDate.length; index += 1) {
              el = formatDate[index];

              switch (true) {
                case el.indexOf('d') !== -1: {
                  d = dateSplit[index - (formatDate.length - dateSplit.length)];
                  break;
                }
                case el.indexOf('M') !== -1: {
                  m = dateSplit[index - (formatDate.length - dateSplit.length)];
                  break;
                }
                case el.indexOf('y') !== -1: {
                  y = dateSplit[index - (formatDate.length - dateSplit.length)];
                  break; 
                }
                default: {
                  break;  
                }                                 
              }
            }

            return new Date(y + '/' + m + '/' + d);
          }
          , setInputValue = function setInputValue() {

            if ($scope.isSelectableMinDate($scope.year + '/' + $scope.monthNumber + '/' + $scope.day) &&
                $scope.isSelectableMaxDate($scope.year + '/' + $scope.monthNumber + '/' + $scope.day)) {

              var modelDate = new Date($scope.year + '/' + $scope.monthNumber + '/' + $scope.day);

              if (attr.dateFormat) {

                thisInput.val($filter('date')(modelDate, dateFormat));
              } else {

                thisInput.val(modelDate);
              }

              thisInput.triggerHandler('input');
              thisInput.triggerHandler('change');//just to be sure;
            } else {

              return false;
            }
          }
          , classHelper = {
            'add': function add(ele, klass) {
              var classes;

              if (ele.className.indexOf(klass) > -1) {

                return;
              }

              classes = ele.className.split(' ');
              classes.push(klass);
              ele.className = classes.join(' ');
            },
            'remove': function remove(ele, klass) {
              var i
                , classes;

              if (ele.className.indexOf(klass) === -1) {

                return;
              }

              classes = ele.className.split(' ');
              for (i = 0; i < classes.length; i += 1) {

                if (classes[i] === klass) {

                  classes = classes.slice(0, i).concat(classes.slice(i + 1));
                  break;
                }
              }
              ele.className = classes.join(' ');
            }
          }
          , showCalendar = function showCalendar() {
            //lets hide all the latest instances of datepicker
            pageDatepickers = $window.document.getElementsByClassName('_720kb-datepicker-calendar');

            angular.forEach(pageDatepickers, function forEachDatepickerPages(value, key) {
              if (pageDatepickers[key].classList) {

                pageDatepickers[key].classList.remove('_720kb-datepicker-open');
              } else {

                classHelper.remove(pageDatepickers[key], '_720kb-datepicker-open');
              }
            });

            if (theCalendar.classList) {

              theCalendar.classList.add('_720kb-datepicker-open');
              if (dateFormat) {
                date = localDateTimestamp(thisInput[0].value.toString(), dateFormat);
              } else {
                date = new Date(thisInput[0].value.toString());
              }
              $scope.selectedMonth = Number($filter('date')(date, 'MM'));
              $scope.selectedDay = Number($filter('date')(date, 'dd'));
              $scope.selectedYear = Number($filter('date')(date, 'yyyy'));
            } else {

              classHelper.add(theCalendar, '_720kb-datepicker-open');
            }
            $scope.today = new Date();
            $timeout(function timeoutForYears() {
              if ($scope.selectedDay) {
                $scope.year = $scope.selectedYear;
                $scope.monthNumber = $scope.selectedMonth;
              } else {
                $scope.year = $scope.today.getFullYear();
                $scope.monthNumber = $scope.today.getMonth() + 1;
              }
              $scope.month = $filter('date')(new Date($scope.year, $scope.monthNumber - 1), 'MMMM');
              setDaysInMonth($scope.monthNumber, $scope.year);
            }, 0);
          }
          , checkToggle = function checkToggle() {
            if (!$scope.datepickerToggle) {

              return true;
            }

            return $scope.$eval($scope.datepickerToggle);
          }
          , checkVisibility = function checkVisibility() {
            if (!$scope.datepickerShow) {

              return false;
            }
            if (dateFormat) {
              date = localDateTimestamp(thisInput[0].value.toString(), dateFormat);
            } else {
              date = new Date(thisInput[0].value.toString());
            }
            $scope.selectedMonth = Number($filter('date')(date, 'MM'));
            $scope.selectedDay = Number($filter('date')(date, 'dd'));
            $scope.selectedYear = Number($filter('date')(date, 'yyyy'));
            return $scope.$eval($scope.datepickerShow);
          }
          , unregisterDataSetWatcher = $scope.$watch('dateSet', function dateSetWatcher(newValue) {

            if (newValue && !isNaN(Date.parse(newValue))) {
              date = new Date(newValue);
              console.log(date);
              $scope.month = $filter('date')(date, 'MMMM');//december-November like
              $scope.monthNumber = Number($filter('date')(date, 'MM')); // 01-12 like
              $scope.day = Number($filter('date')(date, 'dd')); //01-31 like
              $scope.year = Number($filter('date')(date, 'yyyy'));//2014 like
              
              setDaysInMonth($scope.monthNumber, $scope.year);

              if ($scope.dateSetHidden !== 'true') {
                setInputValue();
              }
            }
          })
          , unregisterDateMinLimitWatcher = $scope.$watch('dateMinLimit', function dateMinLimitWatcher(newValue) {
            if (newValue) {
              resetToMinDate();
            }
          })
          , unregisterDateMaxLimitWatcher = $scope.$watch('dateMaxLimit', function dateMaxLimitWatcher(newValue) {
            if (newValue) {
              resetToMaxDate();
            }
          })
          , unregisterDateFormatWatcher = $scope.$watch('dateFormat', function dateFormatWatcher(newValue) {
            if (newValue) {
              setInputValue();
            }
          })
          , unregisterDateDisabledDatesWatcher = $scope.$watch('dateDisabledDates', function dateDisabledDatesWatcher(newValue) {
            if (newValue) {
              dateDisabledDates = $scope.$eval(newValue);

              if (!$scope.isSelectableDate($scope.monthNumber, $scope.year, $scope.day)) {
                thisInput.val('');
                thisInput.triggerHandler('input');
                thisInput.triggerHandler('change');//just to be sure;
              }
            }
          })
          , unregisterDateEnabledDatesWatcher = $scope.$watch('dateEnabledDates', function dateEnabledDatesWatcher(newValue) {
            if (newValue) {
              dateEnabledDates = $scope.$eval(newValue);

              if (!$scope.isSelectableDate($scope.monthNumber, $scope.year, $scope.day)) {
                thisInput.val('');
                thisInput.triggerHandler('input');
                thisInput.triggerHandler('change');//just to be sure;
              }
            }
          });

        $scope.nextMonth = function nextMonth() {

          if ($scope.monthNumber === 12) {

            $scope.monthNumber = 1;
            //its happy new year
            nextYear();
          } else {

            $scope.monthNumber += 1;
          }

          //check if max date is ok
          if ($scope.dateMaxLimit) {

            if (!$scope.isSelectableMaxDate($scope.year + '/' + $scope.monthNumber + '/' + $scope.days[0])) {

              resetToMaxDate();
            }
          }

          //set next month
          $scope.month = $filter('date')(new Date($scope.year, $scope.monthNumber - 1), 'MMMM');
          //reinit days
          setDaysInMonth($scope.monthNumber, $scope.year);
          //deactivate selected day
          $scope.day = undefined;
        };

        $scope.willPrevMonthBeSelectable = function willPrevMonthBeSelectable() {
          var monthNumber = $scope.monthNumber
            , year = $scope.year
            , prevDay = $filter('date')(new Date(new Date(year + '/' + monthNumber + '/01').getTime() - hours24h), 'dd'); //get last day in previous month

          if (monthNumber === 1) {

            monthNumber = 12;
            year = year - 1;
          } else {

            monthNumber -= 1;
          }

          if ($scope.dateMinLimit) {
            if (!$scope.isSelectableMinDate(year + '/' + monthNumber + '/' + prevDay)) {

              return false;
            }
          }

          return true;
        };

        $scope.willNextMonthBeSelectable = function willNextMonthBeSelectable() {
          var monthNumber = $scope.monthNumber
            , year = $scope.year;

          if (monthNumber === 12) {

            monthNumber = 1;
            year += 1;
          } else {

            monthNumber += 1;
          }

          if ($scope.dateMaxLimit) {
            if (!$scope.isSelectableMaxDate(year + '/' + monthNumber + '/01')) {

              return false;
            }
          }

          return true;
        };

        $scope.prevMonth = function managePrevMonth() {

          if ($scope.monthNumber === 1) {

            $scope.monthNumber = 12;
            //its happy new year
            prevYear();
          } else {

            $scope.monthNumber -= 1;
          }
          //check if min date is ok
          if ($scope.dateMinLimit) {

            if (!$scope.isSelectableMinDate($scope.year + '/' + $scope.monthNumber + '/' + $scope.days[$scope.days.length - 1])) {

              resetToMinDate();
            }
          }
          //set next month
          $scope.month = $filter('date')(new Date($scope.year, $scope.monthNumber - 1), 'MMMM');
          //reinit days
          setDaysInMonth($scope.monthNumber, $scope.year);
          //deactivate selected day
          $scope.day = undefined;
        };

        $scope.selectedMonthHandle = function manageSelectedMonthHandle(selectedMonthNumber) {

          $scope.monthNumber = Number($filter('date')(new Date(selectedMonthNumber + '/01/2000'), 'MM'));
          setDaysInMonth($scope.monthNumber, $scope.year);
          setInputValue();
        };

        $scope.setNewYear = function setNewYear(year) {

          //deactivate selected day
          if (!isMobile) {
            $scope.day = undefined;
          }

          if ($scope.dateMaxLimit &&
            $scope.year < Number(year)) {

            if (!$scope.isSelectableMaxYear(year)) {

              return;
            }
          } else if ($scope.dateMinLimit &&
            $scope.year > Number(year)) {

            if (!$scope.isSelectableMinYear(year)) {

              return;
            }
          }

          $scope.paginateYears(year);
          $scope.showYearsPagination = false;
          $timeout(function timeoutForYears() {
            $scope.year = Number(year);
            setDaysInMonth($scope.monthNumber, $scope.year);
          }, 0);
        };

        $scope.hideCalendar = function hideCalendar() {
          if (theCalendar.classList) {
            theCalendar.classList.remove('_720kb-datepicker-open');
          } else {

            classHelper.remove(theCalendar, '_720kb-datepicker-open');
          }
        };

        $scope.setDatepickerDay = function setDatepickerDay(day) {

          if ($scope.isSelectableDay($scope.monthNumber, $scope.year, day) &&
              $scope.isSelectableDate($scope.monthNumber, $scope.year, day) &&
              $scope.isSelectableMaxDate($scope.year + '/' + $scope.monthNumber + '/' + day) &&
              $scope.isSelectableMinDate($scope.year + '/' + $scope.monthNumber + '/' + day)) {

            $scope.day = Number(day);
            $scope.selectedDay = $scope.day;
            $scope.selectedMonth = $scope.monthNumber;
            $scope.selectedYear = $scope.year;

            setInputValue();

            if (attr.hasOwnProperty('dateRefocus')) {
              thisInput[0].focus();
            }

            $scope.hideCalendar();
          }
        };

        $scope.paginateYears = function paginateYears(startingYear) {
          var i
           , theNewYears = []
           , daysToPrepend = 10
           , daysToAppend = 10;

          $scope.paginationYears = [];
          if (isMobile) {

            daysToPrepend = 50;
            daysToAppend = 50;
            if ( $scope.dateMinLimit && $scope.dateMaxLimit) {

              startingYear = new Date($scope.dateMaxLimit).getFullYear();
              daysToPrepend = startingYear - new Date($scope.dateMinLimit).getFullYear();
              daysToAppend = 1;
            }
          }

          for (i = daysToPrepend; i > 0; i -= 1) {

            theNewYears.push(Number(startingYear) - i);
          }

          for (i = 0; i < daysToAppend; i += 1) {

            theNewYears.push(Number(startingYear) + i);
          }
          //date typing in input date-typer
          if ($scope.dateTyper === 'true') {

            thisInput.on('keyup blur', function onTyping() {

              if (thisInput[0].value &&
                thisInput[0].value.length &&
                thisInput[0].value.length > 0) {

                try {
                  if (dateFormat) {
                    date = localDateTimestamp(thisInput[0].value.toString(), dateFormat);
                  } else {
                    date = new Date(thisInput[0].value.toString());
                  }

                  if (date.getFullYear() &&
                   !isNaN(date.getDay()) &&
                   !isNaN(date.getMonth()) &&
                   $scope.isSelectableDay(date.getMonth(), date.getFullYear(), date.getDay()) &&
                   $scope.isSelectableDate(date.getMonth(), date.getFullYear(), date.getDay()) &&
                   $scope.isSelectableMaxDate(date) &&
                   $scope.isSelectableMinDate(date)) {

                    $scope.$apply(function applyTyping() {

                      $scope.month = $filter('date')(date, 'MMMM');//december-November like
                      $scope.monthNumber = Number($filter('date')(date, 'MM')); // 01-12 like
                      $scope.day = Number($filter('date')(date, 'dd')); //01-31 like

                      if (date.getFullYear().toString().length === 4) {
                        $scope.year = Number($filter('date')(date, 'yyyy'));//2014 like
                      }
                      setDaysInMonth($scope.monthNumber, $scope.year);
                    });
                  }
                } catch (e) {

                  return e;
                }
              }
            });
          }
          //check range dates
          if ($scope.dateMaxLimit &&
            theNewYears &&
            theNewYears.length &&
            !$scope.isSelectableMaxYear(Number(theNewYears[theNewYears.length - 1]) + 1)) {

            $scope.paginationYearsNextDisabled = true;
          } else {

            $scope.paginationYearsNextDisabled = false;
          }

          if ($scope.dateMinLimit &&
            theNewYears &&
            theNewYears.length &&
            !$scope.isSelectableMinYear(Number(theNewYears[0]) - 1)) {

            $scope.paginationYearsPrevDisabled = true;
          } else {

            $scope.paginationYearsPrevDisabled = false;
          }

          $scope.paginationYears = theNewYears;
        };

        $scope.isSelectableDay = function isSelectableDay(monthNumber, year, day) {
          var i = 0;

          if (dateDisabledWeekdays && dateDisabledWeekdays.length > 0) {
            for (i; i <= dateDisabledWeekdays.length; i += 1) {
              if (dateDisabledWeekdays[i] === new Date(monthNumber + '/' + day + '/' + year).getDay()) {
                return false;
              }
            }
          }

          return true;
        };

        $scope.isSelectableDate = function isSelectableDate(monthNumber, year, day) {
          var i = 0;

          if (dateDisabledDates &&
            dateDisabledDates.length > 0) {

            for (i; i <= dateDisabledDates.length; i += 1) {

              if (new Date(dateDisabledDates[i]).getTime() === new Date(monthNumber + '/' + day + '/' + year).getTime()) {

                return false;
              }
            }
          }

          if (dateEnabledDates) {

            for (i; i <= dateEnabledDates.length; i += 1) {

              if (new Date(dateEnabledDates[i]).getTime() === new Date(monthNumber + '/' + day + '/' + year).getTime()) {

                return true;
              }
            }

            return false;
          }

          return true;
        };

        $scope.isSelectableMinDate = function isSelectableMinDate(aDate) {
          //if current date
          if (!!$scope.dateMinLimit &&
             !!new Date($scope.dateMinLimit) &&
             new Date(aDate).getTime() < new Date($scope.dateMinLimit).getTime()) {

            return false;
          }

          return true;
        };

        $scope.isSelectableMaxDate = function isSelectableMaxDate(aDate) {
          //if current date
          if (!!$scope.dateMaxLimit &&
             !!new Date($scope.dateMaxLimit) &&
             new Date(aDate).getTime() > new Date($scope.dateMaxLimit).getTime()) {

            return false;
          }

          return true;
        };

        $scope.isSelectableMaxYear = function isSelectableMaxYear(year) {
          if (!!$scope.dateMaxLimit &&
            year > new Date($scope.dateMaxLimit).getFullYear()) {

            return false;
          }

          return true;
        };

        $scope.isSelectableMinYear = function isSelectableMinYear(year) {
          if (!!$scope.dateMinLimit &&
            year < new Date($scope.dateMinLimit).getFullYear()) {

            return false;
          }

          return true;
        };

        $scope.validateWeekDay = function isValidWeekDay(weekDay) {
          var validWeekDay = Number(weekDay, 10);
          // making sure that the given option is valid
          if (!validWeekDay || validWeekDay < 0 || validWeekDay > 6) {

            validWeekDay = 0;
          }
          return validWeekDay;
        };

        // respect previously configured interpolation symbols.
        htmlTemplate = htmlTemplate.replace(/{{/g, $interpolate.startSymbol()).replace(/}}/g, $interpolate.endSymbol());
        $scope.dateMonthTitle = $scope.dateMonthTitle || 'Select month';
        $scope.dateYearTitle = $scope.dateYearTitle || 'Select year';
        $scope.buttonNextTitle = $scope.buttonNextTitle || 'Next';
        $scope.buttonPrevTitle = $scope.buttonPrevTitle || 'Prev';
        $scope.month = $filter('date')(date, 'MMMM');//december-November like
        $scope.monthNumber = Number($filter('date')(date, 'MM')); // 01-12 like
        $scope.day = Number($filter('date')(date, 'dd')); //01-31 like
        $scope.dateWeekStartDay = $scope.validateWeekDay($scope.dateWeekStartDay);

        if ($scope.dateMaxLimit) {

          $scope.year = Number($filter('date')(new Date($scope.dateMaxLimit), 'yyyy'));//2014 like
        } else {

          $scope.year = Number($filter('date')(date, 'yyyy'));//2014 like
        }
        $scope.months = datetime.MONTH;

        $scope.daysInString = [];
        for (n = $scope.dateWeekStartDay; n <= $scope.dateWeekStartDay + 6; n += 1) {

          $scope.daysInString.push(n % 7);
        }
        $scope.daysInString = $scope.daysInString.map(function mappingFunc(el) {

          return $filter('date')(new Date(new Date('06/08/2014').valueOf() + A_DAY_IN_MILLISECONDS * el), 'EEE');
        });

        //create the calendar holder and append where needed
        if ($scope.datepickerAppendTo &&
          $scope.datepickerAppendTo.indexOf('.') !== -1) {

          $scope.datepickerID = 'datepicker-id-' + new Date().getTime() + (Math.floor(Math.random() * 6) + 8);
          angular.element(document.getElementsByClassName($scope.datepickerAppendTo.replace('.', ''))[0]).append($compile(angular.element(htmlTemplate))($scope, function afterCompile(el) {

            theCalendar = angular.element(el)[0];
          }));
        } else if ($scope.datepickerAppendTo &&
          $scope.datepickerAppendTo.indexOf('#') !== -1) {

          $scope.datepickerID = 'datepicker-id-' + new Date().getTime() + (Math.floor(Math.random() * 6) + 8);
          angular.element(document.getElementById($scope.datepickerAppendTo.replace('#', ''))).append($compile(angular.element(htmlTemplate))($scope, function afterCompile(el) {

            theCalendar = angular.element(el)[0];
          }));
        } else if ($scope.datepickerAppendTo &&
          $scope.datepickerAppendTo === 'body') {
          $scope.datepickerID = 'datepicker-id-' + (new Date().getTime() + (Math.floor(Math.random() * 6) + 8));
          angular.element(document).find('body').append($compile(angular.element(htmlTemplate))($scope, function afterCompile(el) {

            theCalendar = angular.element(el)[0];
          }));
        } else {

          thisInput.after($compile(angular.element(htmlTemplate))($scope));
          //get the calendar as element
          theCalendar = element[0].querySelector('._720kb-datepicker-calendar');
        }
        //if datepicker-toggle="" is not present or true by default
        if (checkToggle()) {

          thisInput.on('focus click focusin', function onFocusAndClick() {

            isMouseOnInput = true;

            if (!isMouseOn &&
            !isMouseOnInput && theCalendar) {

              $scope.hideCalendar();
            } else {

              showCalendar();
            }
          });
        }

        thisInput.on('focusout blur', function onBlurAndFocusOut() {

          isMouseOnInput = false;
        });
        //some tricky dirty events to fire if click is outside of the calendar and show/hide calendar when needed
        angular.element(theCalendar).on('mouseenter', function onMouseEnter() {

          isMouseOn = true;
        });

        angular.element(theCalendar).on('mouseleave', function onMouseLeave() {

          isMouseOn = false;
        });

        angular.element(theCalendar).on('focusin', function onCalendarFocus() {

          isMouseOn = true;
        });

        angular.element($window).on('click focus focusin', onClickOnWindow);

        //check always if given range of dates is ok
        if ($scope.dateMinLimit &&
          !$scope.isSelectableMinYear($scope.year) ||
          !$scope.isSelectableMinDate($scope.year + '/' + $scope.monthNumber + '/' + $scope.day)) {

          resetToMinDate();
        }

        if ($scope.dateMaxLimit &&
          !$scope.isSelectableMaxYear($scope.year) ||
          !$scope.isSelectableMaxDate($scope.year + '/' + $scope.monthNumber + '/' + $scope.day)) {

          resetToMaxDate();
        }

        //datepicker boot start
        $scope.paginateYears($scope.year);

        setDaysInMonth($scope.monthNumber, $scope.year);
        $scope.checkVisibility = checkVisibility;

        $scope.$on('$destroy', function unregisterListener() {

          unregisterDataSetWatcher();
          unregisterDateMinLimitWatcher();
          unregisterDateMaxLimitWatcher();
          unregisterDateFormatWatcher();
          unregisterDateDisabledDatesWatcher();
          unregisterDateEnabledDatesWatcher();
          thisInput.off('focus click focusout blur');
          angular.element(theCalendar).off('mouseenter mouseleave focusin');
          angular.element($window).off('click focus focusin', onClickOnWindow);
        });
      };

      return {
        'restrict': 'AEC',
        'scope': {
          'dateSet': '@',
          'dateMinLimit': '@',
          'dateMaxLimit': '@',
          'dateMonthTitle': '@',
          'dateYearTitle': '@',
          'buttonNextTitle': '@',
          'buttonPrevTitle': '@',
          'dateDisabledDates': '@',
          'dateEnabledDates': '@',
          'dateDisabledWeekdays': '@',
          'dateSetHidden': '@',
          'dateTyper': '@',
          'dateWeekStartDay': '@',
          'datepickerAppendTo': '@',
          'datepickerToggle': '@',
          'datepickerClass': '@',
          'datepickerShow': '@'
        },
        'link': linkingFunction
      };
    };

  angular.module('720kb.datepicker', [])
               .directive('datepicker', ['$window', '$compile', '$locale', '$filter', '$interpolate', '$timeout', datepickerDirective]);
}(angular, navigator));
