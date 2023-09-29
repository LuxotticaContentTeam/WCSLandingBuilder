/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-csspositionsticky-flexbox-flexboxlegacy-flexboxtweener-flexwrap-forcetouch-touchevents-mq-prefixed-prefixedcss-prefixedcssvalue-setclasses !*/
 !function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,i,s,a;for(var u in C)if(C.hasOwnProperty(u)){if(e=[],t=C[u],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),x.push((o?"":"no-")+a.join("-"))}}function i(e){var t=_.className,n=Modernizr._config.classPrefix||"";if(b&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),b?_.className.baseVal=t:_.className=t)}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function a(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):b?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function u(){var e=t.body;return e||(e=a(b?"svg":"body"),e.fake=!0),e}function l(e,n,r,o){var i,s,l,f,c="modernizr",d=a("div"),p=u();if(parseInt(r,10))for(;r--;)l=a("div"),l.id=o?o[r]:c+(r+1),d.appendChild(l);return i=a("style"),i.type="text/css",i.id="s"+c,(p.fake?p:d).appendChild(i),p.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),d.id=c,p.fake&&(p.style.background="",p.style.overflow="hidden",f=_.style.overflow,_.style.overflow="hidden",_.appendChild(p)),s=n(d,e),p.fake?(p.parentNode.removeChild(p),_.style.overflow=f,_.offsetHeight):d.parentNode.removeChild(d),!!s}function f(e,t){return!!~(""+e).indexOf(t)}function c(e,t){return function(){return e.apply(t,arguments)}}function d(e,t,n){var o;for(var i in e)if(e[i]in t)return n===!1?e[i]:(o=t[e[i]],r(o,"function")?c(o,n||t):o);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function v(t,n,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,t,n);var i=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(i){var s=i.error?"error":"log";i[s].call(i,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!n&&t.currentStyle&&t.currentStyle[r];return o}function m(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(p(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+p(t[o])+":"+r+")");return i=i.join(" or "),l("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==v(e,null,"position")})}return n}function y(e,t,o,i){function u(){c&&(delete k.style,delete k.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var l=m(e,o);if(!r(l,"undefined"))return l}for(var c,d,p,v,y,h=["modernizr","tspan","samp"];!k.style&&h.length;)c=!0,k.modElem=a(h.shift()),k.style=k.modElem.style;for(p=e.length,d=0;p>d;d++)if(v=e[d],y=k.style[v],f(v,"-")&&(v=s(v)),k.style[v]!==n){if(i||r(o,"undefined"))return u(),"pfx"==t?v:!0;try{k.style[v]=o}catch(g){}if(k.style[v]!=y)return u(),"pfx"==t?v:!0}return u(),!1}function h(e,t,n,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+A.join(s+" ")+s).split(" ");return r(t,"string")||r(t,"undefined")?y(a,t,o,i):(a=(e+" "+N.join(s+" ")+s).split(" "),d(a,t,n))}function g(e,t,r){return h(e,n,n,t,r)}var x=[],C=[],S={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){C.push({name:e,fn:t,options:n})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=S,Modernizr=new Modernizr;var _=t.documentElement,b="svg"===_.nodeName.toLowerCase(),w=S._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];S._prefixes=w,Modernizr.addTest("csspositionsticky",function(){var e="position:",t="sticky",n=a("a"),r=n.style;return r.cssText=e+w.join(t+";"+e).slice(0,-e.length),-1!==r.position.indexOf(t)});var E=function(){function e(e,t){var o;return e?(t&&"string"!=typeof t||(t=a(t||"div")),e="on"+e,o=e in t,!o&&r&&(t.setAttribute||(t=a("div")),t.setAttribute(e,""),o="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),o):!1}var r=!("onblur"in t.documentElement);return e}();S.hasEvent=E;var T=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return l("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();S.mq=T;var z=S.testStyles=l;Modernizr.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var r=["@media (",w.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");z(r,function(e){n=9===e.offsetTop})}return n});var O="Moz O ms Webkit",A=S._config.usePrefixes?O.split(" "):[];S._cssomPrefixes=A;var P=function(t){var r,o=w.length,i=e.CSSRule;if("undefined"==typeof i)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+t;for(var s=0;o>s;s++){var a=w[s],u=a.toUpperCase()+"_"+r;if(u in i)return"@-"+a.toLowerCase()+"-"+t}return!1};S.atRule=P;var N=S._config.usePrefixes?O.toLowerCase().split(" "):[];S._domPrefixes=N;var j={elem:a("modernizr")};Modernizr._q.push(function(){delete j.elem});var k={style:j.elem.style};Modernizr._q.unshift(function(){delete k.style}),S.testAllProps=h;var M=S.prefixed=function(e,t,n){return 0===e.indexOf("@")?P(e):(-1!=e.indexOf("-")&&(e=s(e)),t?h(e,t,n):h(e,"pfx"))};Modernizr.addTest("forcetouch",function(){return E(M("mouseforcewillbegin",e,!1),e)?MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN&&MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN:!1}),S.testAllProps=g,Modernizr.addTest("flexbox",g("flexBasis","1px",!0)),Modernizr.addTest("flexboxlegacy",g("boxDirection","reverse",!0)),Modernizr.addTest("flexboxtweener",g("flexAlign","end",!0)),Modernizr.addTest("flexwrap",g("flexWrap","wrap",!0));var R=(S.prefixedCSS=function(e){var t=M(e);return t&&p(t)},function(e,t){var n=!1,r=a("div"),o=r.style;if(e in o){var i=N.length;for(o[e]=t,n=o[e];i--&&!n;)o[e]="-"+N[i]+"-"+t,n=o[e]}return""===n&&(n=!1),n});S.prefixedCSSValue=R,o(),i(x),delete S.addTest,delete S.addAsyncTest;for(var L=0;L<Modernizr._q.length;L++)Modernizr._q[L]();e.Modernizr=Modernizr}(window,document);