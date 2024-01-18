// Copyright 2006-2021 ClickTale Ltd., US Patent Pending

window.ClickTaleGlobal = window.ClickTaleGlobal || {};
window.ClickTaleSettings = window.ClickTaleSettings || {};

ClickTaleGlobal.init = ClickTaleGlobal.init || {};
ClickTaleGlobal.scripts = ClickTaleGlobal.scripts || {};

ClickTaleGlobal.scripts.filter = ClickTaleGlobal.scripts.filter || (function () {
	var recordingThreshold = Math.random() * 100;

	return {
		isRecordingApproved: function(percentage) {
			return recordingThreshold <= percentage;
		}
	}
})();
	
		
// Copyright 2006-2021 ClickTale Ltd., US Patent Pending
// PID: 1070



/*browsers exclusion start*/ ClickTaleSettings.PTC.doOnlyWhen = function (toDoHandler, toCheckHandler, interval, times, failHandler) {
            if ((!toDoHandler) || (!toCheckHandler)) return;
            if (typeof interval == 'undefined') interval = 1000;
            if (typeof times == 'undefined') times = 20;
        
            if (--times < 0) {
                if (typeof failHandler === 'function') {
                    failHandler();
                }
                return;
            }
            if (toCheckHandler()) {
                toDoHandler();
                return;
            }
        
            setTimeout(function () { ClickTaleSettings.PTC.doOnlyWhen(toDoHandler, toCheckHandler, interval, times, failHandler); }, interval);
        }
        ClickTaleSettings.PTC.doOnlyWhen(function () { 
            if (window.ClickTaleSettings.PTC.okToRunPCC) { 
                (function(){
                    window.ClickTaleSettings = window.ClickTaleSettings || {};
                    ClickTaleSettings.PTC = ClickTaleSettings.PTC || {};
                    ClickTaleSettings.PTC.originalPCCLocation = 'P56_PID1070';
                    
                    function k(a,b,c,d,e){a&&b&&("undefined"==typeof c&&(c=1E3),"undefined"==typeof d&&(d=20),0>--d?"function"===typeof e&&e():b()?a():setTimeout(function(){k(a,b,c,d,e)},c))};function n(a,b){b||(b=document);return b instanceof Element||b instanceof Document?Array.prototype.slice.call(b.querySelectorAll(a)):"string"===typeof b?n(a,document.querySelectorAll(b)):Array.isArray(b)||b instanceof HTMLCollection||b instanceof NodeList?Array.prototype.reduce.call(b,function(c,d){return c.concat(Array.prototype.slice.call(d.querySelectorAll(a)))},[]):[]}
function p(a,b){if(a&&a.nodeType&&9===a.nodeType)return!1;var c=Element.prototype;p=function(d,e){return d&&document.documentElement.contains(d)?p.b.call(d,e):!1};p.b=c.webkitMatchesSelector||c.mozMatchesSelector||c.msMatchesSelector||c.matches;return p(a,b)}function r(a,b){r=Element.prototype.closest?function(c,d){return c&&c instanceof Element?Element.prototype.closest.call(c,d):null}:function(c,d){for(;c&&!p(c,d);)c=c.parentElement;return c};return r(a,b)};var t=!1,aa=Object.defineProperty&&Object.defineProperty({},"passive",{get:function(){t=!0}});document.addEventListener("test",function(){},aa);var v=t?{passive:!0,capture:!0}:!0,w=t?{passive:!0,capture:!1}:!1,ba=0;
function y(a){function b(){2==++c&&a()}if(!~y.b.indexOf(a)){y.b.push(a);var c=0;z(b);if("function"==typeof ClickTaleIsRecording&&!0===ClickTaleIsRecording())b();else{var d=window.ClickTaleOnRecording||function(){};window.ClickTaleOnRecording=function(){b();return d.apply(this,arguments)}}}}y.b=[];function z(a){function b(){c||(c=!0,a())}var c=!1;"loading"!=document.readyState?b():document.addEventListener&&document.addEventListener("DOMContentLoaded",b,!1)}
function A(a,b,c,d,e){if("string"===typeof b&&-1!=b.indexOf(" "))return b.split(/\s+/).forEach(function(h){return A(a,h,c,d,e)}),a;if("string"===typeof a)Array.prototype.forEach.call(document.querySelectorAll(a),function(h){A(h,b,c,d,e)});else if(a instanceof Array||a instanceof NodeList)Array.prototype.forEach.call(a,function(h){A(h,b,c,d,e)});else{var f="";"string"==typeof c&&("mouseenter"==b?(b="mouseover",f="mouseenter"):"mouseleave"==b&&(b="mouseout",f="mouseleave"));a.addEventListener(b,function(h,
g,l,m,q,x){return function(Q){if("function"===typeof l)l.apply(this,arguments),q&&h.removeEventListener(g,arguments.callee,v);else{var J=Q.relatedTarget,u=r(Q.target,l);u&&h.compareDocumentPosition(u)&Node.DOCUMENT_POSITION_CONTAINED_BY&&("mouseenter"==x||"mouseleave"==x?J&&(J==u||u.compareDocumentPosition(J)&Node.DOCUMENT_POSITION_CONTAINED_BY)||m.apply(u,arguments):m.apply(u,arguments),q&&h.removeEventListener(g,arguments.callee,v))}}}(a,b,c,d,e,f),v)}return a}
function ca(a,b){document.addEventListener("mouseup",function(c){a===c.target&&b();document.removeEventListener("mouseup",arguments.callee,v)},v)}function da(a,b){function c(d){document.removeEventListener("touchend",arguments.callee,v);a===d.target&&b()}document.addEventListener("touchend",c,v);document.addEventListener("touchmove",function(d){document.removeEventListener("touchmove",arguments.callee,v);document.removeEventListener("touchend",c,v)},v)}
function B(a,b){var c=C();c&&(B=c.m?da:ca,B(a,b))};function D(a){if(window.CSS&&"function"===typeof window.CSS.escape)D=function(d){return window.CSS.escape.call(window.CSS,d)};else{var b=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,c=function(d,e){return e?"\x00"===d?"\ufffd":d.slice(0,-1)+"\\"+d.charCodeAt(d.length-1).toString(16)+" ":"\\"+d};D=function(d){return d.replace(b,c)}}return D(a)}function E(a){return btoa(encodeURIComponent(a).replace(/%([0-9A-F]{2})/g,function(b,c){return String.fromCharCode(+("0x"+c))}))};function F(a){window._uxa=window._uxa||[];window._uxa.push.apply(window._uxa,arguments)}function ea(a){a=void 0===a?window.location.pathname+window.location.hash.replace("#","?__"):a;F(["trackPageview",a])}function G(a,b,c,d){a=["setCustomVariable",a,b,c];d&&a.push(d);F(a)};function fa(){if(window.ClickTaleMonitor&&ClickTaleMonitor.Settings&&"function"===typeof ClickTaleMonitor.Settings.get){var a=ClickTaleMonitor.Settings.get();a.monitor&&a.monitor.onStop&&"function"==typeof a.monitor.onStop&&(a.monitor.onStop(function(){a.started=!1}),ClickTaleMonitor.App.prototype.dispose.call(a.monitor,!1,!1,!0))}}
function ha(a,b){if(window.ClickTaleMonitor&&"function"==typeof ClickTaleMonitor.restart&&H()){var c=c||500;if(I){I=!1;var d=ClickTaleMonitor.Settings.get(),e=d.shouldStartMonitorCallback||function(){},f="";d&&d.config&&d.config.transport&&(f=d.config.transport.url||"");fa();d=ClickTaleMonitor.Settings.get();f&&d.configure({transport:{url:f}});"function"===typeof d.shouldStartMonitor&&d.shouldStartMonitor(e);ClickTaleMonitor.restart(a,b);setTimeout(function(){I=!0},c)}}}var I=!0;
function H(){var a=!1;if(window.ClickTaleMonitor&&"function"===typeof window.ClickTaleMonitor.isMonitoring&&window.ClickTaleMonitor.isMonitoring())a=!0;else if(window.ClickTaleMonitor){var b=window.ClickTaleMonitor&&ClickTaleMonitor.Settings&&"function"==typeof ClickTaleMonitor.Settings.get?ClickTaleMonitor.Settings.get():null;if(b)b.onStart(function(){H.b=!0})}else return k(H,function(){return!!window.ClickTaleMonitor},1E3,10),!1;H=function(){return H.b};H.b=a;return H.b}H.b=!1;H();function K(a){"function"===typeof ClickTaleExec&&ClickTaleExec(a)}function L(){"function"===typeof ClickTaleStop&&ClickTaleStop()}function M(a,b){"function"===typeof ClickTaleEvent&&(b?!0!==M.b[a]&&(M.b[a]=!0,ClickTaleEvent(a)):ClickTaleEvent(a))}M.b={};
function N(a,b){a&&"object"==typeof a&&"string"==typeof b&&(window.ClickTaleContext&&-1!=document.referrer.indexOf(location.hostname)&&window.parent.ct&&window.parent.ct.ElementAddressing&&"function"===typeof window.parent.ct.ElementAddressing.forceSetCustomElementID?window.parent.ct.ElementAddressing.forceSetCustomElementID(a,b):(window.ClickTaleContext||"function"!==typeof ClickTaleSetCustomElementID||-1==ClickTaleSetCustomElementID.toString().indexOf("duplicate registration of custom id")?window.ClickTaleSetCustomElementID=
window.ClickTaleSetCustomElementID||function(c,d){c.ClickTale=c.ClickTale||{};c.ClickTale.CustomID=d}:N=function(c,d){c.ClickTale=c.ClickTale||{};c.ClickTale.CustomID=d},window.ClickTaleSetCustomElementID(a,b)))}
function ia(){Array.prototype.forEach.call(document.querySelectorAll('[id]:not([id=""])'),function(a){if(!p(a,'input[type="hidden"], script')){var b=a.getAttribute("id");b.match(/(?:\r|\n)/)&&"function"===typeof ClickTaleNote&&ClickTaleNote("ctlib.api.SetCustomElementIdDuplicates: ids with line break found!");a=document.querySelectorAll('[id="'+D(b)+'"]');var c=O;1<a.length&&!c[b]&&(c[b]=!0,Array.prototype.forEach.call(a,function(d,e){N(d,b.replace(/(\r|\n|\r\n|\s+)+/g,"_").replace(/\W/g,"_")+"_"+
e)}))}})}var O={};function ja(a,b){"function"===typeof ClickTaleLogical&&(M.b={},O={},P.b&&P.b instanceof R&&P.b.clear(),b?ClickTaleLogical(a,b):ClickTaleLogical(a))}function C(){if("function"===typeof ClickTaleDetectAgent){var a=ClickTaleDetectAgent();if(a)return C=function(){return a},C()}return null}function S(a){if("function"===typeof ClickTaleRegisterTouchAction){var b=a.getBoundingClientRect();ClickTaleRegisterTouchAction(a,b.left+document.body.scrollLeft,b.top+document.body.scrollTop)}}
function ka(){if("boolean"!=typeof T){var a=C();a&&(T=!!a.m)}if(!b){var b="mousedown";T&&(b="touchstart")}a="img, a, button, textarea, input, select";T&&(a+=", label[for]");A(document,b,a,function(c){var d=c.target,e=this;if(T)if(p(this,"label[for]"))B(d,function(g){return function(){var l,m;(l=g.getAttribute("for"))&&(m=document.getElementById(l))&&S(m)}.bind(e)}(d,c));else{var f=-1,h=function(g){clearTimeout(f);document.removeEventListener("touchstart",arguments.callee,w);B(d,function(l){return function(){function m(x){document.removeEventListener("touchend",
arguments.callee,w);clearTimeout(q)}var q=-1;document.addEventListener("touchend",m,w);q=setTimeout(function(){document.removeEventListener("touchend",m,w);S(l)},50)}.bind(e)}(d,c))};document.addEventListener("touchstart",h,w);f=setTimeout(function(){document.removeEventListener("touchstart",h,w);S(d)},50)}else B(d,function(g,l){return function(){function m(x){x.target===g&&(U=!0);document.removeEventListener("click",arguments.callee,!0);clearTimeout(q)}var q=setTimeout(function(){U||"function"===
typeof window.ClickTaleRegisterElementAction&&ClickTaleRegisterElementAction("click",l);document.removeEventListener("click",m,!0);U=void 0},200);document.addEventListener("click",m,!0)}.bind(e)}(d,c))})}var T,U;
function la(){var a=V,b=document.location,c=ma,d=W;if(X){X=!1;var e=e||400;d?(L(),window.ClickTaleIncludedOnDOMReady=!0,window.ClickTaleIncludedOnWindowLoad=!0,"function"===typeof ClickTaleUploadPage&&ClickTaleUploadPage(void 0,void 0),ja(b.href,c)):(Array.isArray(window.ClickTaleOnStop)&&window.ClickTaleOnStop.forEach(function(f){if("function"===typeof f)try{f.call(window)}catch(h){}}),ea(b.pathname));ha(b,c);a();clearTimeout(na);na=setTimeout(function(){X=!0},e)}}var na=-1,X=!0;
function R(){this.f=!1;this.b="";this.init=function(a){this.f||(this.f=!0,document.addEventListener("input",this.g,v));this.h(a);this.b=this.b?this.b+","+a:a};this.g=function(a){a=a.target;if(p(a,this.b)){var b=n(this.b).indexOf(a);K("document.querySelectorAll('"+this.b+"')["+b+"].value = Base64Decode('"+E(a.value)+"');")}}.bind(this);this.h=function(a){var b="";n(a).forEach(function(c,d){b+="document.querySelectorAll('"+a+"')["+d+"].value = Base64Decode('"+E(c.value)+"'); "});b&&K(b)};this.clear=
function(){document.removeEventListener("input",this.g,v);this.f=!1;this.b=""}}function P(a){P.b=P.b||new R;P.b.init(a)}P.b=null;var oa=M;function pa(a,b){return a instanceof Element?b instanceof Element?a===b:p(a,b):!1}var qa=B;var W=!1,Y=!1,ra=!0,ma=location.href,Z;function sa(){if("boolean"===typeof Y){var a=Y.toString();"function"===typeof ClickTaleField&&ClickTaleField("isMobile",a)}}
function V(){ia();ma=location.href;if(ra)ra=!1;else for(var a=window.ClickTaleSettings&&window.ClickTaleSettings.PTC&&window.ClickTaleSettings.PTC.InitFuncs?window.ClickTaleSettings.PTC.InitFuncs:[],b=0,c=a.length;b<c;b++)if("function"===typeof a[b])a[b]();W?sa():y(function(){W=!0;sa()});var d=window.utag_data;k(function(){"Pdp"==d.Page_Type&&(Z=[{displayName:"Page Type",key:"Page_Type",slot:1,value:""},{displayName:"Page Name",key:"Page_Name",slot:2,value:""},{displayName:"Page Section 1",key:"Page_Section1",
slot:3,value:""},{displayName:"Action",key:"Action",slot:4,value:""}],Z.forEach(function(e){var f=d[e.key];f&&(e.value=f)}))},function(){return!!d&&d.Page_Type},250,20)}function ta(){window._uxa=window._uxa||[];Z&&Z.forEach(function(a){a.value&&G(a.slot,a.displayName,a.value,3)});window._uxa.push(["trackPageview",window.location.pathname]);Z.forEach(function(a){var b=a.displayName;G(a.slot,void 0===b?"t":b,"")})}
function ua(){if(!window.ClickTaleFirstPCCGo){window.ClickTaleFirstPCCGo=!0;var a=C();a&&(Y=a.m);V();A(document,Y?"touchstart":"mousedown","#exit-modal-out button:not(:first-of-type), #exit-modal-out a, a.back-to-pdp",function(b){var c=b.target;qa(c,function(d,e,f){return function(){var h=document.querySelector('[data-element-id*="LensPanel_Type"]');(!h&&pa(f,"#exit-modal-out button:not(:first-of-type),#exit-modal-out a")||h&&pa(f,"a.back-to-pdp"))&&k(function(){ta()},function(){var g;if(g=document.querySelector("#pdp-wrapper")){var l=
g.getRootNode?g.getRootNode({composed:!1}):g.ownerDocument;g=!!(g.compareDocumentPosition(l)&Node.DOCUMENT_POSITION_CONTAINS&&(g.offsetWidth||g.offsetHeight||g.getClientRects().length))}else g=!1;return g},250,20)}.bind(f)}(c,b,this))})}}
(function(a){function b(){2==++ba&&a()}z(b);if("function"==typeof ClickTale)b();else{Array.isArray(window.ClickTaleOnReadyList)&&window.ClickTaleOnReadyList.push(b);var c=window.ClickTaleOnRecording||function(){};window.ClickTaleOnRecording=function(){b();return c.apply(this,arguments)}}})(function(){ka();ua()});window.clickTaleStartEventSignal=function(a){la();a&&"string"===typeof a&&oa(a)};window.clickTaleEndEventSignal=function(){L()};
                })();
            } 
        }, function () { return !!(window.ClickTaleSettings && ClickTaleSettings.PTC && typeof ClickTaleSettings.PTC.okToRunPCC != 'undefined'); }, 500, 20);


//Signature:XkxIPo4N5wwDvdZcAae4evAPc1r6d8S/8hSw+HVLrw2gTqdQghRN+5dfszlqc/FNETdM18DvJ442wwGgloifOfL50xvXcgH/vzfKJIFRNw7ojTa3WrdOR6C1ZQQW6LwztxD0oj8zsvi+ac0z3SklMeeJ3joQSnNSSnqgParjF7M=