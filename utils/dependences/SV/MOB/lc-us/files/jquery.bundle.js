/*! lux-b2c-csr - v0.0.1 - 2022-04-13 *//**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};;
/**
 * jQuery.query - Query String Modification and Creation for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2009/8/13
 *
 * @author Blair Mitchelmore
 * @version 2.2.3
 *
 **/
new function(settings) { 
  // Various Settings
  var $separator = settings.separator || '&';
  var $spaces = settings.spaces === false ? false : true;
  var $suffix = settings.suffix === false ? '' : '[]';
  var $prefix = settings.prefix === false ? false : true;
  var $hash = $prefix ? settings.hash === true ? "#" : "?" : "";
  var $numbers = settings.numbers === false ? false : true;

  jQuery.query = new function() {
    var is = function(o, t) {
      return o != undefined && o !== null && (!!t ? o.constructor == t : true);
    };
    var parse = function(path) {
      var m, rx = /\[([^[]*)\]/g, match = /^([^[]+)(\[.*\])?$/.exec(path), base = match[1], tokens = [];
      while (m = rx.exec(match[2])) tokens.push(m[1]);
      return [base, tokens];
    };
    var set = function(target, tokens, value) {
      var o, token = tokens.shift();
      if (typeof target != 'object') target = null;
      if (token === "") {
        if (!target) target = [];
        if (is(target, Array)) {
          target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
        } else if (is(target, Object)) {
          var i = 0;
          while (target[i++] != null);
          target[--i] = tokens.length == 0 ? value : set(target[i], tokens.slice(0), value);
        } else {
          target = [];
          target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
        }
      } else if (token && token.match(/^\s*[0-9]+\s*$/)) {
        var index = parseInt(token, 10);
        if (!target) target = [];
        target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
      } else if (token) {
        var index = token.replace(/^\s*|\s*$/g, "");
        if (!target) target = {};
        if (is(target, Array)) {
          var temp = {};
          for (var i = 0; i < target.length; ++i) {
            temp[i] = target[i];
          }
          target = temp;
        }
        target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
      } else {
        return value;
      }
      return target;
    };
    
    var queryObject = function(a) {
      var self = this;
      self.keys = {};
      
      if (a.queryObject) {
        jQuery.each(a.get(), function(key, val) {
          self.SET(key, val);
        });
      } else {
        self.parseNew.apply(self, arguments);
      }
      return self;
    };
    
    queryObject.prototype = {
      queryObject: true,
      parseNew: function(){
        var self = this;
        self.keys = {};
        jQuery.each(arguments, function() {
          var q = "" + this;
          q = q.replace(/^[?#]/,''); // remove any leading ? || #
          q = q.replace(/[;&]$/,''); // remove any trailing & || ;
          if ($spaces) q = q.replace(/[+]/g,' '); // replace +'s with spaces
          
          jQuery.each(q.split(/[&;]/), function(){
            var key = decodeURIComponent(this.split('=')[0] || "");
            var val = decodeURIComponent(this.split('=')[1] || "");
            
            if (!key) return;
            
            if ($numbers) {
              if (/^[+-]?[0-9]+\.[0-9]*$/.test(val)) // simple float regex
                val = parseFloat(val);
              else if (/^[+-]?[1-9][0-9]*$/.test(val)) // simple int regex
                val = parseInt(val, 10);
            }
            
            val = (!val && val !== 0) ? true : val;
            
            self.SET(key, val);
          });
        });
        return self;
      },
      has: function(key, type) {
        var value = this.get(key);
        return is(value, type);
      },
      GET: function(key) {
        if (!is(key)) return this.keys;
        var parsed = parse(key), base = parsed[0], tokens = parsed[1];
        var target = this.keys[base];
        while (target != null && tokens.length != 0) {
          target = target[tokens.shift()];
        }
        return typeof target == 'number' ? target : target || "";
      },
      get: function(key) {
        var target = this.GET(key);
        if (is(target, Object))
          return jQuery.extend(true, {}, target);
        else if (is(target, Array))
          return target.slice(0);
        return target;
      },
      SET: function(key, val) {
        var value = !is(val) ? null : val;
        var parsed = parse(key), base = parsed[0], tokens = parsed[1];
        var target = this.keys[base];
        this.keys[base] = set(target, tokens.slice(0), value);
        return this;
      },
      set: function(key, val) {
        return this.copy().SET(key, val);
      },
      REMOVE: function(key, val) {
        if (val) {
          var target = this.GET(key);
          if (is(target, Array)) {
            for (tval in target) {
                target[tval] = target[tval].toString();
            }
            var index = $.inArray(val, target);
            if (index >= 0) {
              key = target.splice(index, 1);
              key = key[index];
            } else {
              return;
            }
          } else if (val != target) {
              return;
          }
        }
        return this.SET(key, null).COMPACT();
      },
      remove: function(key, val) {
        return this.copy().REMOVE(key, val);
      },
      EMPTY: function() {
        var self = this;
        jQuery.each(self.keys, function(key, value) {
          delete self.keys[key];
        });
        return self;
      },
      load: function(url) {
        var hash = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
        var search = url.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
        return new queryObject(url.length == search.length ? '' : search, url.length == hash.length ? '' : hash);
      },
      empty: function() {
        return this.copy().EMPTY();
      },
      copy: function() {
        return new queryObject(this);
      },
      COMPACT: function() {
        function build(orig) {
          var obj = typeof orig == "object" ? is(orig, Array) ? [] : {} : orig;
          if (typeof orig == 'object') {
            function add(o, key, value) {
              if (is(o, Array))
                o.push(value);
              else
                o[key] = value;
            }
            jQuery.each(orig, function(key, value) {
              if (!is(value)) return true;
              add(obj, key, build(value));
            });
          }
          return obj;
        }
        this.keys = build(this.keys);
        return this;
      },
      compact: function() {
        return this.copy().COMPACT();
      },
      toString: function() {
        var i = 0, queryString = [], chunks = [], self = this;
        var encode = function(str) {
          str = str + "";
          str = encodeURIComponent(str);
          if ($spaces) str = str.replace(/%20/g, "+");
          return str;
        };
        var addFields = function(arr, key, value) {
          if (!is(value) || value === false) return;
          var o = [encode(key)];
          if (value !== true) {
            o.push("=");
            o.push(encode(value));
          }
          arr.push(o.join(""));
        };
        var build = function(obj, base) {
          var newKey = function(key) {
            return !base || base == "" ? [key].join("") : [base, "[", key, "]"].join("");
          };
          jQuery.each(obj, function(key, value) {
            if (typeof value == 'object') 
              build(value, newKey(key));
            else
              addFields(chunks, newKey(key), value);
          });
        };
        
        build(this.keys);
        
        if (chunks.length > 0) queryString.push($hash);
        queryString.push(chunks.join($separator));
        
        return queryString.join("");
      }
    };
    
    return new queryObject(location.search, location.hash);
  };
}(jQuery.query || {}); // Pass in jQuery.query as settings object;
/*! lazysizes - v5.2.2 */

!function(e){var t=function(u,D,f){"use strict";var k,H;if(function(){var e;var t={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",fastLoadedClass:"ls-is-cached",iframeLoadMode:0,srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:true,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:true,ricTimeout:0,throttleDelay:125};H=u.lazySizesConfig||u.lazysizesConfig||{};for(e in t){if(!(e in H)){H[e]=t[e]}}}(),!D||!D.getElementsByClassName){return{init:function(){},cfg:H,noSupport:true}}var O=D.documentElement,i=u.HTMLPictureElement,P="addEventListener",$="getAttribute",q=u[P].bind(u),I=u.setTimeout,U=u.requestAnimationFrame||I,o=u.requestIdleCallback,j=/^picture$/i,r=["load","error","lazyincluded","_lazyloaded"],a={},G=Array.prototype.forEach,J=function(e,t){if(!a[t]){a[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")}return a[t].test(e[$]("class")||"")&&a[t]},K=function(e,t){if(!J(e,t)){e.setAttribute("class",(e[$]("class")||"").trim()+" "+t)}},Q=function(e,t){var a;if(a=J(e,t)){e.setAttribute("class",(e[$]("class")||"").replace(a," "))}},V=function(t,a,e){var i=e?P:"removeEventListener";if(e){V(t,a)}r.forEach(function(e){t[i](e,a)})},X=function(e,t,a,i,r){var n=D.createEvent("Event");if(!a){a={}}a.instance=k;n.initEvent(t,!i,!r);n.detail=a;e.dispatchEvent(n);return n},Y=function(e,t){var a;if(!i&&(a=u.picturefill||H.pf)){if(t&&t.src&&!e[$]("srcset")){e.setAttribute("srcset",t.src)}a({reevaluate:true,elements:[e]})}else if(t&&t.src){e.src=t.src}},Z=function(e,t){return(getComputedStyle(e,null)||{})[t]},s=function(e,t,a){a=a||e.offsetWidth;while(a<H.minSize&&t&&!e._lazysizesWidth){a=t.offsetWidth;t=t.parentNode}return a},ee=function(){var a,i;var t=[];var r=[];var n=t;var s=function(){var e=n;n=t.length?r:t;a=true;i=false;while(e.length){e.shift()()}a=false};var e=function(e,t){if(a&&!t){e.apply(this,arguments)}else{n.push(e);if(!i){i=true;(D.hidden?I:U)(s)}}};e._lsFlush=s;return e}(),te=function(a,e){return e?function(){ee(a)}:function(){var e=this;var t=arguments;ee(function(){a.apply(e,t)})}},ae=function(e){var a;var i=0;var r=H.throttleDelay;var n=H.ricTimeout;var t=function(){a=false;i=f.now();e()};var s=o&&n>49?function(){o(t,{timeout:n});if(n!==H.ricTimeout){n=H.ricTimeout}}:te(function(){I(t)},true);return function(e){var t;if(e=e===true){n=33}if(a){return}a=true;t=r-(f.now()-i);if(t<0){t=0}if(e||t<9){s()}else{I(s,t)}}},ie=function(e){var t,a;var i=99;var r=function(){t=null;e()};var n=function(){var e=f.now()-a;if(e<i){I(n,i-e)}else{(o||r)(r)}};return function(){a=f.now();if(!t){t=I(n,i)}}},e=function(){var v,m,c,h,e;var y,z,g,p,C,b,A;var n=/^img$/i;var d=/^iframe$/i;var E="onscroll"in u&&!/(gle|ing)bot/.test(navigator.userAgent);var _=0;var w=0;var M=0;var N=-1;var L=function(e){M--;if(!e||M<0||!e.target){M=0}};var x=function(e){if(A==null){A=Z(D.body,"visibility")=="hidden"}return A||!(Z(e.parentNode,"visibility")=="hidden"&&Z(e,"visibility")=="hidden")};var W=function(e,t){var a;var i=e;var r=x(e);g-=t;b+=t;p-=t;C+=t;while(r&&(i=i.offsetParent)&&i!=D.body&&i!=O){r=(Z(i,"opacity")||1)>0;if(r&&Z(i,"overflow")!="visible"){a=i.getBoundingClientRect();r=C>a.left&&p<a.right&&b>a.top-1&&g<a.bottom+1}}return r};var t=function(){var e,t,a,i,r,n,s,o,l,u,f,c;var d=k.elements;if((h=H.loadMode)&&M<8&&(e=d.length)){t=0;N++;for(;t<e;t++){if(!d[t]||d[t]._lazyRace){continue}if(!E||k.prematureUnveil&&k.prematureUnveil(d[t])){R(d[t]);continue}if(!(o=d[t][$]("data-expand"))||!(n=o*1)){n=w}if(!u){u=!H.expand||H.expand<1?O.clientHeight>500&&O.clientWidth>500?500:370:H.expand;k._defEx=u;f=u*H.expFactor;c=H.hFac;A=null;if(w<f&&M<1&&N>2&&h>2&&!D.hidden){w=f;N=0}else if(h>1&&N>1&&M<6){w=u}else{w=_}}if(l!==n){y=innerWidth+n*c;z=innerHeight+n;s=n*-1;l=n}a=d[t].getBoundingClientRect();if((b=a.bottom)>=s&&(g=a.top)<=z&&(C=a.right)>=s*c&&(p=a.left)<=y&&(b||C||p||g)&&(H.loadHidden||x(d[t]))&&(m&&M<3&&!o&&(h<3||N<4)||W(d[t],n))){R(d[t]);r=true;if(M>9){break}}else if(!r&&m&&!i&&M<4&&N<4&&h>2&&(v[0]||H.preloadAfterLoad)&&(v[0]||!o&&(b||C||p||g||d[t][$](H.sizesAttr)!="auto"))){i=v[0]||d[t]}}if(i&&!r){R(i)}}};var a=ae(t);var S=function(e){var t=e.target;if(t._lazyCache){delete t._lazyCache;return}L(e);K(t,H.loadedClass);Q(t,H.loadingClass);V(t,B);X(t,"lazyloaded")};var i=te(S);var B=function(e){i({target:e.target})};var T=function(e,t){var a=e.getAttribute("data-load-mode")||H.iframeLoadMode;if(a==0){e.contentWindow.location.replace(t)}else if(a==1){e.src=t}};var F=function(e){var t;var a=e[$](H.srcsetAttr);if(t=H.customMedia[e[$]("data-media")||e[$]("media")]){e.setAttribute("media",t)}if(a){e.setAttribute("srcset",a)}};var s=te(function(t,e,a,i,r){var n,s,o,l,u,f;if(!(u=X(t,"lazybeforeunveil",e)).defaultPrevented){if(i){if(a){K(t,H.autosizesClass)}else{t.setAttribute("sizes",i)}}s=t[$](H.srcsetAttr);n=t[$](H.srcAttr);if(r){o=t.parentNode;l=o&&j.test(o.nodeName||"")}f=e.firesLoad||"src"in t&&(s||n||l);u={target:t};K(t,H.loadingClass);if(f){clearTimeout(c);c=I(L,2500);V(t,B,true)}if(l){G.call(o.getElementsByTagName("source"),F)}if(s){t.setAttribute("srcset",s)}else if(n&&!l){if(d.test(t.nodeName)){T(t,n)}else{t.src=n}}if(r&&(s||l)){Y(t,{src:n})}}if(t._lazyRace){delete t._lazyRace}Q(t,H.lazyClass);ee(function(){var e=t.complete&&t.naturalWidth>1;if(!f||e){if(e){K(t,H.fastLoadedClass)}S(u);t._lazyCache=true;I(function(){if("_lazyCache"in t){delete t._lazyCache}},9)}if(t.loading=="lazy"){M--}},true)});var R=function(e){if(e._lazyRace){return}var t;var a=n.test(e.nodeName);var i=a&&(e[$](H.sizesAttr)||e[$]("sizes"));var r=i=="auto";if((r||!m)&&a&&(e[$]("src")||e.srcset)&&!e.complete&&!J(e,H.errorClass)&&J(e,H.lazyClass)){return}t=X(e,"lazyunveilread").detail;if(r){re.updateElem(e,true,e.offsetWidth)}e._lazyRace=true;M++;s(e,t,r,i,a)};var r=ie(function(){H.loadMode=3;a()});var o=function(){if(H.loadMode==3){H.loadMode=2}r()};var l=function(){if(m){return}if(f.now()-e<999){I(l,999);return}m=true;H.loadMode=3;a();q("scroll",o,true)};return{_:function(){e=f.now();k.elements=D.getElementsByClassName(H.lazyClass);v=D.getElementsByClassName(H.lazyClass+" "+H.preloadClass);q("scroll",a,true);q("resize",a,true);q("pageshow",function(e){if(e.persisted){var t=D.querySelectorAll("."+H.loadingClass);if(t.length&&t.forEach){U(function(){t.forEach(function(e){if(e.complete){R(e)}})})}}});if(u.MutationObserver){new MutationObserver(a).observe(O,{childList:true,subtree:true,attributes:true})}else{O[P]("DOMNodeInserted",a,true);O[P]("DOMAttrModified",a,true);setInterval(a,999)}q("hashchange",a,true);["focus","mouseover","click","load","transitionend","animationend"].forEach(function(e){D[P](e,a,true)});if(/d$|^c/.test(D.readyState)){l()}else{q("load",l);D[P]("DOMContentLoaded",a);I(l,2e4)}if(k.elements.length){t();ee._lsFlush()}else{a()}},checkElems:a,unveil:R,_aLSL:o}}(),re=function(){var a;var n=te(function(e,t,a,i){var r,n,s;e._lazysizesWidth=i;i+="px";e.setAttribute("sizes",i);if(j.test(t.nodeName||"")){r=t.getElementsByTagName("source");for(n=0,s=r.length;n<s;n++){r[n].setAttribute("sizes",i)}}if(!a.detail.dataAttr){Y(e,a.detail)}});var i=function(e,t,a){var i;var r=e.parentNode;if(r){a=s(e,r,a);i=X(e,"lazybeforesizes",{width:a,dataAttr:!!t});if(!i.defaultPrevented){a=i.detail.width;if(a&&a!==e._lazysizesWidth){n(e,r,i,a)}}}};var e=function(){var e;var t=a.length;if(t){e=0;for(;e<t;e++){i(a[e])}}};var t=ie(e);return{_:function(){a=D.getElementsByClassName(H.autosizesClass);q("resize",t)},checkElems:t,updateElem:i}}(),t=function(){if(!t.i&&D.getElementsByClassName){t.i=true;re._();e._()}};return I(function(){H.init&&t()}),k={cfg:H,autoSizer:re,loader:e,init:t,uP:Y,aC:K,rC:Q,hC:J,fire:X,gW:s,rAF:ee}}(e,e.document,Date);e.lazySizes=t,"object"==typeof module&&module.exports&&(module.exports=t)}("undefined"!=typeof window?window:{});;
// mimic dojo with a jquery implementation
dojo = {
	// internal properties, used to maintain the pub/sub model
	channels: {},
	channelContexts: {},
	
	// external methods
	addClass: function(el, val){
		if (typeof el == 'string'){
			$('#' + el).addClass(val);
		}else{
			$(el).addClass(val);
		}
	},
	addOnLoad:  function(f){
		$(document).ready(f);
	},
	attr: function(el, attrName, value){
		var $el;
		if (typeof el == 'string'){
			$el = $('#' + el); 
		}else{
			$el = $(el);
		}
		
		return $el.attr.apply($el, [attrName, value]);
	},
	back: {
		init: function(){},
		setInitialState : function(){}
	},
	byId: function(id){
		if (typeof id == 'string'){
			return document.getElementById(id);
		}else{
			return $(id)[0]; 
		}
	},
	connect: function(el, eventType, callback){
		var $el = null,
			eventType = eventType.replace('on', '');
		if (typeof el == 'string'){
			$el = $('#' + el);
		}else{
			$el = $(el);
		}
		$el.bind(eventType, callback);
	},
	cookie: function(){
		return $.cookie.apply(window, arguments);
	},
	dnd: {
		Moveable: function(){return {};},
		Source: function(){
			var obj = {
				copyOnly: false,
				setItem: function(){}
			}
			return obj;
		}
	},
	isArray: function(obj){
		return $.isArray(obj);
	},
	keys: {"BACKSPACE":8,"TAB":9,"CLEAR":12,"ENTER":13,"SHIFT":16,"CTRL":17,"ALT":18,"META":224,"PAUSE":19,"CAPS_LOCK":20,"ESCAPE":27,"SPACE":32,"PAGE_UP":33,"PAGE_DOWN":34,"END":35,"HOME":36,"LEFT_ARROW":37,"UP_ARROW":38,"RIGHT_ARROW":39,"DOWN_ARROW":40,"INSERT":45,"DELETE":46,"HELP":47,"LEFT_WINDOW":91,"RIGHT_WINDOW":92,"SELECT":93,"NUMPAD_0":96,"NUMPAD_1":97,"NUMPAD_2":98,"NUMPAD_3":99,"NUMPAD_4":100,"NUMPAD_5":101,"NUMPAD_6":102,"NUMPAD_7":103,"NUMPAD_8":104,"NUMPAD_9":105,"NUMPAD_MULTIPLY":106,"NUMPAD_PLUS":107,"NUMPAD_ENTER":108,"NUMPAD_MINUS":109,"NUMPAD_PERIOD":110,"NUMPAD_DIVIDE":111,"F1":112,"F2":113,"F3":114,"F4":115,"F5":116,"F6":117,"F7":118,"F8":119,"F9":120,"F10":121,"F11":122,"F12":123,"F13":124,"F14":125,"F15":126,"NUM_LOCK":144,"SCROLL_LOCK":145,"copyKey":17},
	parser: {
		instantiate: function(){}
	},
	publish: function(channel, params){
		// get the associated function and execute it
		var c = this.channels[channel],
			cc = this.channelContexts[channel]; 
		
		if (c == null){
			c = [];
			cc = [];
		}
		
		if (params == null){
			params = [];
		}
		
		for (var i = 0; i < c.length; i++){
			var fn = c[i],
				ctx = cc[i];
			
			if (typeof fn == 'function'){
				fn.apply(ctx, params);
			}else if (window[fn]){				
				window[fn].apply(ctx, params);
			}else{
				ctx[fn].apply(ctx, params);
			}
		}
	},
	query: function(selector, el){
		var results = [];
		if (el == null){
			results = $(selector).toArray();
		}else if ((typeof el) == 'string'){
			results = $(selector, '#' + el).toArray();
		}else if ((typeof el) == 'object'){
			results = $(selector, el).toArray();
		}
		
		results.forEach = function(fn){
			$.each(results, function(index, element){
				fn.apply(element, [element, index]);
			});
		}
		
		return results;
	},
	registerModulePath: function(){},
	removeClass: function(el, val){
		if (typeof el == 'string'){
			$('#' + el).removeClass(val);
		}else{
			$(el).removeClass(val);
		}
	},
	require: function(){},
	style: function(id, prop, value){
		$('#' + id).css(prop, value);
	},
	subscribe: function(channel, ctx, fn){
		// map the channel to the given function
		var c = this.channels[channel],
			cc = this.channelContexts[channel]; 
		
		if (c == null){
			this.channels[channel] = [];
			this.channelContexts[channel] = [];
			
			c = this.channels[channel];
			cc = this.channelContexts[channel];
		}
		
		if (fn == null){
			// if fn is null, then then ctx (context) is really the callback
			c.push(ctx);
			cc.push(window);
		}else{
			// the user provided a context
			c.push(fn);
			cc.push(ctx);
		}
	},
	trim: function(val){
		return $.trim(val);
	}
};

// a class to represent a service
function WCService(properties){
	this.actionId = properties.actionId;
	this.failureHandler = properties.failureHandler;
	this.formId = properties.formId;
	this.id = properties.id;
	this.initProperties = properties.initProperties;
	this.successHandler = properties.successHandler;
	this.url = properties.url;
	this.validateForm = properties.validateForm;
	this.validateParameters = properties.validateParameters;
}

// a class to represent a widget
function WCWidget(id, controllerId, widgetId){
	this.id = id;
	this.controllerId = controllerId;
	this.widgetId = widgetId;
	this.objectId = $('#' + this.id).attr('objectid');
	
	this.controller = wc.render.getRefreshControllerById(controllerId);
	
	this.refresh = function(params){
		if (params == null){
			params = {}; 
		}
		// call the associated refresh controller's refresh method
		this.controller.refresh(this, params);
	}
}

// a class to represent a context
function WCContext(id, properties, url){
	this.id = id;
	this.properties = properties || {};
	this.url = url;
	this.contextChangedEventName = id + "/RenderContextChanged";
	
	/**
	 * When a context is updated, make an ajax request to the associated URL
	 * Aftewards, publish the "RenderContextChanged" and "modelchanged" events,
	 * which will force all subscribed controllers to make their necessary updates 
	 */
	this.update = function(updates){
		if (this.url) {
			for (var key in updates){
				if (updates[key]){
					this.properties[key] = updates[key];
				}else{
					delete this.properties[key];
				}
			}
			
			
			dojo.publish("ajaxRequestInitiated");
			
			var promise = $.ajax({
				url: this.url,
				data: properties,
				dataType: 'json',
				type: 'post',
				context: this});
			
			promise.done(function(data){
				if ($.isArray(data.renderContextChanges)) {
					for (var i = 0; i < data.renderContextChanges.length; i++) {
						var name = data.renderContextChanges[i];
						request.properties[name] = data[name];
					}
					
					dojo.publish(this.contextChangedEventName, [data]);
				}
			});
			promise.always(function(){
				dojo.publish("ajaxRequestCompleted");
			})
		}
		else {
			console.debug("wc.render.updateContext - url not specified");
			
			// local render context
			var data = {
				renderContextChanges: []
			};
			for (var name in updates) {
				var value = updates[name];
				if (value != this.properties[name]) {
					data.renderContextChanges.push(name);
					//wd-todo
					if (typeof value == "undefined")  {
						delete this.properties[name];
					}
					else {
						this.properties[name] = value;
						data[name] = value;
						console.debug("updating render context: " + name + " = " + value);
					}
				}
			}
			console.debug("publishing " + this.contextChangedEventName + " event")
			dojo.publish(this.contextChangedEventName, [data]);
		}
	}
}

// a function to represent a controller
function WCController(properties){
	this.id = properties.id;
	this.renderContext = properties.renderContext;
	this.url = properties.url;
	this.formId = properties.formId;
	this.modelChangedHandler = properties.modelChangedHandler;
	this.renderContextChangedHandler = properties.renderContextChangedHandler;
	this.postRefreshHandler = properties.postRefreshHandler;
	this.currentRCProperties = {};
	
	
	// set up internal events
	this.getWidgets = function(){
		var domElements = $('[controllerId="' + this.id + '"]');
		
		var widgets = domElements.map(function(){
			var $this = $(this);
			return new WCWidget(this.id, $this.attr('controllerId'), $this.attr('widgetId'));
		});
		
		return widgets.toArray(); 
	}
	this.renderContextChanged = function(message){
		var widgets = this.getWidgets();
		
		for (var i in widgets){
			this.renderContextChangedHandler(message, widgets[i]);
		}
		
		this.syncRCProperties();
	}
	this.modelChanged = function(message){
		// when a context changes, the associated controller's modelChanged mehtod is called
		// this method will get all the controller's widgets and refresh them
		var widgets = this.getWidgets();
		
		for (var i in widgets){
			this.modelChangedHandler(message, widgets[i]);
		}
	}
	this.syncRCProperties = function() {
		// summary: Synchronize the local copy of the render context properties with the current
		//		render context properties.
		if (this.renderContext) {
			var properties = {};
			var rc = this.renderContext.properties
			for (var prop in rc) {
				properties[prop] = rc[prop];
			}
			this.currentRCProperties = properties;
		}	
	},
	this.testForChangedRC = function(propertyNames) {
		// summary: Test for changes to the render context.
		var change = false;
		for (var i = 0; i < propertyNames.length; i++) {
			var prop = propertyNames[i];
			if (this.currentRCProperties[prop] != this.renderContext.properties[prop]) {
				change = true;
				break;
			}
		}
		return change;
	}
	this.refresh = function(widget, parameters){
		
		// this method will refresh a rendering area by making a call to this controller's url, using the given parameters
		// when that returns, the content in the associated widgets will be updated with the ajax response contents 
		
		if (!parameters){
			parameters = {};
		}
		
		// update parameters with form data
		var formNode = null;
		if (this.formId){
			var formData = $('#' + this.formId).serializeArray();
			for (var i = 0; i < formData.length; i++){
				var d = formData[i];
				parameters[d.name] = d.value;
			}
			formNode = document.getElementById(this.formId);
		}		
		
		if (!parameters.requesttype) {
			parameters.requesttype = 'ajax';
		}
		
		//Remove all instances of "amp;" in the URL which was added on the JSP by c:out
		this.url = this.url.replace(/amp;/g, "");
		
		dojo.publish("ajaxRequestInitiated");
		var promise = $.ajax({
			url: this.url,
			data: parameters,
			dataType: 'text',
			type: 'post',
			context: this});
		
		promise.done(function(data){
			function getIds(idType, controllerURL) {
				var myId = "";
				if (parameters && parameters[idType]) {
					myId = parameters[idType];
				}
				if (myId == "" && formNode != null && formNode[idType]) {
					myId = formNode[idType];
					if (formNode[idType].value != null) {
						myId = formNode[idType].value;
					}
				}
				if (myId == "" && controllerURL) {
					var temp = controllerURL;
					if (temp.indexOf(idType) != -1) {
						temp = temp.substring(temp.indexOf(idType));
						var tokens = temp.split("&");
						var tokens2 = tokens[0].split("=");
						myId = tokens2[1];
					}
				}
				return myId;
			}

			// determine storeId, catalogId and langId to use in our redirect url
			var storeId = getIds("storeId", this.url);
			var catalogId = getIds("catalogId", this.url);
			var langId = getIds("langId", this.url);

			var errorCodeBegin = data.indexOf('errorCode');
			if (errorCodeBegin != -1) {
				// get error code   
				var errorCodeEnd = data.indexOf(',', errorCodeBegin);
				var errorCodeString = data.substring(errorCodeBegin, errorCodeEnd);

				console.debug('error condition encountered - error code: ' + errorCodeString);
				// error code: ERR_DIDNT_LOGON
				// This error code is returned in the scenario where logon is required and user is not logged on
				if (errorCodeString.indexOf('2550') != -1) {
					console.debug('error type: ERR_DIDNT_LOGON - the customer did not log on to the system.');
					console.debug("redirecting to URL: " + "AjaxLogonForm?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId + '&myAcctMain=1');	
					document.location.href = "AjaxLogonForm?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId + '&myAcctMain=1';
				}
				// error code: ERR_SESSION_TIMEOUT
				// This error code is returned in the scenario where user's logon session has timed out
				else if (errorCodeString.indexOf('2510') != -1) {
					//redirect to a full page for sign in
					console.debug('error type: ERR_SESSION_TIMEOUT - use session has timed out');
					console.debug('redirecting to URL: ' + 'Logoff?URL=ReLogonFormView&storeId='+storeId);	
					document.location.href = 'Logoff?URL=ReLogonFormView&storeId='+storeId;	

				// error code: ERR_PROHIBITED_CHAR
				// This error code is returned in the scenario where user has entered prohibited character(s) in the request
				} else if (errorCodeString.indexOf('2520') != -1) {
					console.debug('error type: ERR_PROHIBITED_CHAR - detected prohibited characters in request');
					console.debug("redirecting to URL: " + "ProhibitedCharacterErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId);	
					document.location.href = "ProhibitedCharacterErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId;
				
				// error code: ERR_CSRF
				// This error code is returned in the scenario where a cross-site request forgery attempt was caught
				} else if (errorCodeString.indexOf('2540') != -1) {
					console.debug('error type: ERR_CSRF - cross site request forgery attempt was detected');
					console.debug("redirecting to URL: " + "CrossSiteRequestForgeryErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId);
					document.location.href = "CrossSiteRequestForgeryErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId;

				// error code: _ERR_INVALID_COOKIE
				// This error code is returned in the scenario where a cookie error occurs
				} else if (errorCodeString.indexOf('CMN1039E') != -1) {
					console.debug('error type: _ERR_INVALID_COOKIE - cookie error was detected');
					console.debug("redirecting to URL: " + "CookieErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId);
					document.location.href = "CookieErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId;
				}

			} else {
				var controller = widget.controller;
				console.debug("RefreshController.refresh - calling refreshHandler for " + widget);
				
				var $body = angular.element(document.body);  
		        var $rootScope = $body.scope().$root;
				// refresh the area
				if(typeof $rootScope !== 'undefined' && $rootScope.wrapAngular != undefined && typeof $rootScope.wrapAngular === 'function')
				    $rootScope.wrapAngular($('#' + widget.id).html(data));
				else
				    $('#' + widget.id).html(data)
				
				if (controller.postRefreshHandler != null) {
					console.debug("RefreshController.refresh - calling postRefreshHandler for " + widget);
					controller.postRefreshHandler(widget);
				}
			}
		});
		promise.always(function(){
			dojo.publish("ajaxRequestCompleted");
		});

	}
	
	// subscribe the controller to the context
	if ($.isFunction(this.renderContextChangedHandler)) {
		if (this.renderContext){
			dojo.subscribe(this.renderContext.contextChangedEventName, this, "renderContextChanged");
		}
	}
	
	if ($.isFunction(this.modelChangedHandler)){
		dojo.subscribe("modelChanged", this, "modelChanged");
	}
}

wc = {
	service : {
		servicesMap: {}, 
			
		declare: function(properties){
			var s = new WCService(properties);
			this.servicesMap[s.id] = s;
			
			return s;
		},
		getServiceById: function(serviceId){
			return this.servicesMap[serviceId]; 
		},
		invoke: function(serviceId, parameters){
			// parameters should be a hash of kvp
			var service = this.servicesMap[serviceId];
			var promise = null;
			if (service){
				// get the submit parameters
				var data = parameters;
				if (parameters instanceof Array){
					data = {};
					for (var key in parameters){
						data[key] = parameters[key];
					}
				}else if (parameters == null){
					data = {};
				}
				
				// get data from the associated form, if any
				if (service.formId && service.formId != ''){
					var formData = $('#' + service.formId).serializeArray();
					for (var i = 0; i < formData.length; i++){
						var d = formData[i];
						data[d.name] = d.value;
					}
				}
				
				promise = $.ajax({
					url: service.url,
					data: data,
					dataType: 'text',
					traditional: true, // handle arrays
					type: 'post'
				});
				
				// attach the success and failure handlers; 
				// set the "this" keyword to be ServiceDeclarationJS while inside the success/fail handler
				promise.done(function(response){
					var serviceResponse = filterAjaxResponse(response);
					
					// if successful, call the success method
					if (serviceResponse == null || (!serviceResponse.errorMessage && !serviceResponse.errorMessageKey)){
						if (service.successHandler){
							service.successHandler.apply(ServicesDeclarationJS, [serviceResponse]);

							var modelChangedMessage = $.extend(true, {}, serviceResponse);
							modelChangedMessage.actionId = service.actionId;
							modelChangedMessage.serviceId = service.serviceId;
							
							dojo.publish("modelChanged", [modelChangedMessage]);
							if (service.actionId) {
								console.debug("success: publishing modelChanged/" + service.actionId + " event");
								dojo.publish("modelChanged/" + service.actionId, [modelChangedMessage]);
							}
						}
					}else{
						// HANDLE LOGON AND PASSWORD ERRORS
						// determine storeId, catalogId and langId to use in our redirect url
						var storeId = ServicesDeclarationJS.storeId;
						var catalogId = ServicesDeclarationJS.catalogId;
						var langId = ServicesDeclarationJS.langId;

						// error code: ERR_USER_NOT_LOGGED_ON
						// This error code is returned in the scenario where logon is required and user is not logged on
						if (serviceResponse.errorCode == '2500') {
							var myURL = serviceResponse.originatingCommand;
							myURL = myURL.replace('?', '%3F');
							myURL = myURL.replace(/&amp;/g, '%26');						
							myURL = myURL.replace(/&/g, '%26');
							myURL = myURL.replace(/=/g, '%3D');

							myURL = 'LogonForm?nextUrl=' + myURL + "&storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId + '&myAcctMain=1';
							console.debug('error type: ERR_USER_NOT_LOGGED_ON - only registered user can invoke the command');
							console.debug('redirecting to URL: ' + myURL);	
							document.location.href = myURL;
						// error code: ERR_DIDNT_LOGON
						// This error code is returned in the scenario where logon is required and user is not logged on
						} else if (serviceResponse.errorCode == '2550') {
							var myURL = serviceResponse.originatingCommand;
							myURL = myURL.replace('?', '%3F');
							myURL = myURL.replace(/&amp;/g, '%26');
							myURL = myURL.replace(/&/g, '%26');
							myURL = myURL.replace(/=/g, '%3D');
							myURL = 'AjaxLogonForm?nextUrl=' + myURL + "&storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId + '&myAcctMain=1';
							console.debug('error type: ERR_DIDNT_LOGON - the customer did not log on to the system.');
							console.debug('redirecting to URL: ' + myURL);	
							document.location.href = myURL;								
						// error code: ERR_PASSWORD_REREQUEST 
						// This error code is returned in the scenario where password is required to proceed
						} else if (serviceResponse.errorCode == '2530') {
							var myURL = serviceResponse.originatingCommand;
							myURL = myURL.replace('?', '%3F');
							myURL = myURL.replace(/&amp;/g, '%26');
							myURL = myURL.replace(/&/g, '%26');
							myURL = myURL.replace(/=/g, '%3D');
							myURL = 'PasswordReEnterErrorView?nextUrl=' + myURL + "&storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId;
							console.debug('error type: ERR_PASSWORD_REREQUEST - password is required');
							console.debug('redirecting to URL: ' + myURL);	
							document.location.href = myURL;

						// error code: ERR_SESSION_TIMEOUT
						// This error code is returned in the scenario where user's logon session has timed out
						} else if (serviceResponse.errorCode == '2510') {
							//redirect to a full page for sign in
							console.debug('error type: ERR_SESSION_TIMEOUT - use session has timed out');
							console.debug('redirecting to URL: ' + 'Logoff?URL=ReLogonFormView&storeId=' + storeId);
							document.location.href = 'Logoff?URL=ReLogonFormView&storeId=' + storeId;	
							
						// error code: ERR_PROHIBITED_CHAR
						// This error code is returned in the scenario where user has entered prohibited character(s) in the request
						} else if (serviceResponse.errorCode == '2520') {
							console.debug('error type: ERR_PROHIBITED_CHAR - detected prohibited characters in request');
							console.debug("redirecting to URL: " + "ProhibitedCharacterErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId);	
							document.location.href = "ProhibitedCharacterErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId;
						
						// error code: ERR_CSRF
						// This error code is returned in the scenario where a cross-site request forgery attempt was caught
						} else if (serviceResponse.errorCode == '2540') {
							console.debug('error type: ERR_CSRF - cross site request forgery attempt was detected');
							console.debug("redirecting to URL: " + "CrossSiteRequestForgeryErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId);
							document.location.href = "CrossSiteRequestForgeryErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId;
							
						// error code: _ERR_INVALID_COOKIE
						// This error code is returned in the scenario where a cookie error occurs
						} else if (serviceResponse.errorCode == 'CMN1039E') {
							console.debug('error type: _ERR_INVALID_COOKIE - cookie error was detected');
							console.debug("redirecting to URL: " + "CookieErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId);
							document.location.href = "CookieErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId;
							
						} else {
							console.debug('calling service.failureHandler');
							service.failureHandler(serviceResponse);
						}
					}
				});
				promise.fail(function(response){
					var serviceResponse = filterAjaxResponse(response);
					if (service.failureHandler){
						service.failureHandler.apply(ServicesDeclarationJS, [serviceResponse]);
					}
				});
				promise.always(function(){
					// mark the ajax request complete
					dojo.publish("ajaxRequestCompleted");
				});
			}
			
			return promise;
		}		
	},
	
	// functions for backwards compatibility
	render: {
		contexts: {},
		controllers: {},
		
		declareRefreshController: function(properties){
			var controller = new WCController(properties);
			this.controllers[controller.id] = controller;
			return controller;
		},
		getRefreshControllerById: function(id){
			return this.controllers[id];
		},
		declareContext: function(id, properties, updateContextURL){
			if(this.contexts[id] != null && this.contexts[id] != ""){
				//console.debug("Render context with id =  " + id + " already exits.Please use a different id");		
				return;
			}
			
			this.contexts[id] = new WCContext(id, properties, updateContextURL); 
			return this.contexts[id];
		},
		getContextById: function(id){
			return this.contexts[id];
		},
		updateContext: function(id, updates){
			this.contexts[id].update(updates);
		}
	}
}

// maintain backwards compatibility by providing a dummy dijit object
dijit = {
	byNode: function(){return {};},
	byId: function(){},
	registry: {
		byClass: function(){
			var obj = {
				forEach: function(){}
			};
			return obj;
		}
	},
	Tooltip: function(){}
}

// dojo-reliant classes
CommonControllersDeclarationJS =  {
	setControllerURL : function(){}
}


/**
 *  Convert a "dojo-filtered" ajax json response into a normal ajax response. Ideally this would
 *  be done using $.ajaxSetup, but that is not working
 */
function filterAjaxResponse(responseText){
	var resp = responseText;
	try{
		resp = $.parseJSON(resp.replace(/^\s*\/\*/, "").replace(/\*\/\s*$/, ""));
	}catch(e){
		console.debug(e);
	}
	
	return resp;
}

function parseWidget(){};
if (jQuery)(function($) {
    $.extend($.fn, {
        selectBox: function(method, data) {
            var typeTimer, typeSearch = '',
                isMac = navigator.platform.match(/mac/i);
            var init = function(select, data) {
                var options;
                if (navigator.userAgent.match(/iPhone|Android|IEMobile|BlackBerry/i)) return false;
                if (select.tagName.toLowerCase() !== 'select') return false;
                select = $(select);
                if (select.data('selectBox-control')) return false;
                var control = $('<a class="selectBox" href="javascript:void(0);" />'),
                    inline = select.attr('multiple') || parseInt(select.attr('size')) > 1;
                var settings = data || {};
                control.width(select.outerWidth()).addClass(select.attr('class')).attr('title', select.attr('title') || '').attr('tabindex', parseInt(select.attr('tabindex'))).css('display', 'inline-block').bind('focus.selectBox', function() {
                    if (this !== document.activeElement && document.body !== document.activeElement) $(document.activeElement).blur();
                    if (control.hasClass('selectBox-active')) return;
                    control.addClass('selectBox-active');
                    select.trigger('focus')
                }).bind('blur.selectBox', function() {
                    if (!control.hasClass('selectBox-active')) return;
                    control.removeClass('selectBox-active');
                    select.trigger('blur')
                });
                if (!$(window).data('selectBox-bindings')) {
                    $(window).data('selectBox-bindings', true).bind('scroll.selectBox', hideMenus).bind('resize.selectBox', hideMenus)
                }
                if (select.attr('disabled')) control.addClass('selectBox-disabled');
                select.bind('click.selectBox', function(event) {
                    control.focus();
                    event.preventDefault()
                });
                if (inline) {
                    options = getOptions(select, 'inline');
                    control.append(options).data('selectBox-options', options).addClass('selectBox-inline selectBox-menuShowing').bind('keydown.selectBox', function(event) {
                        handleKeyDown(select, event)
                    }).bind('keypress.selectBox', function(event) {
                        handleKeyPress(select, event)
                    }).bind('mousedown.selectBox', function(event) {
                        if ($(event.target).is('A.selectBox-inline')) event.preventDefault();
                        if (!control.hasClass('selectBox-focus')) control.focus()
                    }).insertAfter(select);
                    if (!select[0].style.height) {
                        var size = select.attr('size') ? parseInt(select.attr('size')) : 5;
                        var tmp = control.clone().removeAttr('id').css({
                            position: 'absolute',
                            top: '-9999em'
                        }).show().appendTo('body');
                        tmp.find('.selectBox-options').html('<li><a>\u00A0</a></li>');
                        var optionHeight = parseInt(tmp.find('.selectBox-options A:first').html('&nbsp;').outerHeight());
                        tmp.remove();
                        control.height(optionHeight * size)
                    }
                    disableSelection(control)
                } else {
                    var label = $('<span class="selectBox-label" />'),
                        arrow = $('<span class="selectBox-arrow" />');
                    label.attr('class', getLabelClass(select)).text(getLabelText(select));
                    options = getOptions(select, 'dropdown');
                    options.appendTo('BODY');
                    control.data('selectBox-options', options).addClass('selectBox-dropdown').append(label).append(arrow).bind('mousedown.selectBox', function(event) {
                        if (control.hasClass('selectBox-menuShowing')) {
                            hideMenus()
                        } else {
                            event.stopPropagation();
                            options.data('selectBox-down-at-x', event.screenX).data('selectBox-down-at-y', event.screenY);
                            showMenu(select)
                        }
                    }).bind('keydown.selectBox', function(event) {
                        handleKeyDown(select, event)
                    }).bind('keypress.selectBox', function(event) {
                        handleKeyPress(select, event)
                    }).bind('open.selectBox', function(event, triggerData) {
                        if (triggerData && triggerData._selectBox === true) return;
                        showMenu(select)
                    }).bind('close.selectBox', function(event, triggerData) {
                        if (triggerData && triggerData._selectBox === true) return;
                        hideMenus()
                    }).insertAfter(select);
                    var labelWidth = control.width() - arrow.outerWidth() - parseInt(label.css('paddingLeft')) - parseInt(label.css('paddingLeft'));
                    label.width(labelWidth);
                    disableSelection(control)
                }
                select.addClass('selectBox').data('selectBox-control', control).data('selectBox-settings', settings).hide()
            };
            var getOptions = function(select, type) {
                var options;
                var _getOptions = function(select, options) {
                    select.children('OPTION, OPTGROUP').each(function() {
                        if ($(this).is('OPTION')) {
                            if ($(this).length > 0) {
                                generateOptions($(this), options)
                            } else {
                                options.append('<li>\u00A0</li>')
                            }
                        } else {
                            var optgroup = $('<li class="selectBox-optgroup" />');
                            optgroup.text($(this).attr('label'));
                            options.append(optgroup);
                            options = _getOptions($(this), options)
                        }
                    });
                    return options
                };
                switch (type) {
                    case 'inline':
                        options = $('<ul class="selectBox-options" />');
                        options = _getOptions(select, options);
                        options.find('A').bind('mouseover.selectBox', function(event) {
                            addHover(select, $(this).parent())
                        }).bind('mouseout.selectBox', function(event) {
                            removeHover(select, $(this).parent())
                        }).bind('mousedown.selectBox', function(event) {
                            event.preventDefault();
                            if (!select.selectBox('control').hasClass('selectBox-active')) select.selectBox('control').focus()
                        }).bind('mouseup.selectBox', function(event) {
                            hideMenus();
                            selectOption(select, $(this).parent(), event)
                        });
                        disableSelection(options);
                        return options;
                    case 'dropdown':
                        options = $('<ul class="selectBox-dropdown-menu selectBox-options" />');
                        options = _getOptions(select, options);
                        options.data('selectBox-select', select).css('display', 'none').appendTo('BODY').find('A').bind('mousedown.selectBox', function(event) {
                            event.preventDefault();
                            if (event.screenX === options.data('selectBox-down-at-x') && event.screenY === options.data('selectBox-down-at-y')) {
                                options.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y');
                                hideMenus()
                            }
                        }).bind('mouseup.selectBox', function(event) {
                            if (event.screenX === options.data('selectBox-down-at-x') && event.screenY === options.data('selectBox-down-at-y')) {
                                return
                            } else {
                                options.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y')
                            }
                            selectOption(select, $(this).parent());
                            hideMenus()
                        }).bind('mouseover.selectBox', function(event) {
                            addHover(select, $(this).parent())
                        }).bind('mouseout.selectBox', function(event) {
                            removeHover(select, $(this).parent())
                        });
                        var classes = select.attr('class') || '';
                        if (classes !== '') {
                            classes = classes.split(' ');
                            for (var i in classes) options.addClass(classes[i] + '-selectBox-dropdown-menu')
                        }
                        disableSelection(options);
                        return options
                }
            };
            var getLabelClass = function(select) {
                var selected = $(select).find('OPTION:selected');
                return ('selectBox-label ' + (selected.attr('class') || '')).replace(/\s+$/, '')
            };
            var getLabelText = function(select) {
                var selected = $(select).find('OPTION:selected');
                return selected.text() || '\u00A0'
            };
            var setLabel = function(select) {
                select = $(select);
                var control = select.data('selectBox-control');
                if (!control) return;
                control.find('.selectBox-label').attr('class', getLabelClass(select)).text(getLabelText(select))
            };
            var destroy = function(select) {
                select = $(select);
                var control = select.data('selectBox-control');
                if (!control) return;
                var options = control.data('selectBox-options');
                options.remove();
                control.remove();
                select.removeClass('selectBox').removeData('selectBox-control').data('selectBox-control', null).removeData('selectBox-settings').data('selectBox-settings', null).show()
            };
            var refresh = function(select) {
                select = $(select);
                select.selectBox('options', select.html())
            };
            var showMenu = function(select) {
                select = $(select);
                var control = select.data('selectBox-control'),
                    settings = select.data('selectBox-settings'),
                    options = control.data('selectBox-options');
                if (control.hasClass('selectBox-disabled')) return false;
                hideMenus();
                var borderBottomWidth = isNaN(control.css('borderBottomWidth')) ? 0 : parseInt(control.css('borderBottomWidth'));
                options.width(control.innerWidth()).css({
                    top: control.offset().top + control.outerHeight() - borderBottomWidth,
                    left: control.offset().left
                });
                if (select.triggerHandler('beforeopen')) return false;
                var dispatchOpenEvent = function() {
                    select.triggerHandler('open', {
                        _selectBox: true
                    })
                };
                if ( typeof(settings) == "undefined") { return; }
                switch (settings.menuTransition) {
                    case 'fade':
                        options.fadeIn(settings.menuSpeed, dispatchOpenEvent);
                        break;
                    case 'slide':
                        options.slideDown(settings.menuSpeed, dispatchOpenEvent);
                        break;
                    default:
                        options.show(settings.menuSpeed, dispatchOpenEvent);
                        break
                }
                if (!settings.menuSpeed) dispatchOpenEvent();
                var li = options.find('.selectBox-selected:first');
                keepOptionInView(select, li, true);
                addHover(select, li);
                control.addClass('selectBox-menuShowing');
                $(document).bind('mousedown.selectBox', function(event) {
                    if ($(event.target).parents().andSelf().hasClass('selectBox-options')) return;
                    hideMenus()
                })
            };
            var hideMenus = function() {
                if ($(".selectBox-dropdown-menu:visible").length === 0) return;
                $(document).unbind('mousedown.selectBox');
                $(".selectBox-dropdown-menu").each(function() {
                    var options = $(this),
                        select = options.data('selectBox-select'),
                        control = select.data('selectBox-control'),
                        settings = select.data('selectBox-settings');
                    if (select.triggerHandler('beforeclose')) return false;
                    var dispatchCloseEvent = function() {
                        select.triggerHandler('close', {
                            _selectBox: true
                        })
                    };
                    if ( typeof(settings) == "undefined") { return; }
                    switch (settings.menuTransition) {
                        case 'fade':
                            options.fadeOut(settings.menuSpeed, dispatchCloseEvent);
                            break;
                        case 'slide':
                            options.slideUp(settings.menuSpeed, dispatchCloseEvent);
                            break;
                        default:
                            options.hide(settings.menuSpeed, dispatchCloseEvent);
                            break
                    }
                    if (!settings.menuSpeed) dispatchCloseEvent();
                    control.removeClass('selectBox-menuShowing')
                })
            };
            var selectOption = function(select, li, event) {
                select = $(select);
                li = $(li);
                var control = select.data('selectBox-control'),
                    settings = select.data('selectBox-settings');
                if (control.hasClass('selectBox-disabled')) return false;
                if (li.length === 0 || li.hasClass('selectBox-disabled')) return false;
                if (select.attr('multiple')) {
                    if (event.shiftKey && control.data('selectBox-last-selected')) {
                        li.toggleClass('selectBox-selected');
                        var affectedOptions;
                        if (li.index() > control.data('selectBox-last-selected').index()) {
                            affectedOptions = li.siblings().slice(control.data('selectBox-last-selected').index(), li.index())
                        } else {
                            affectedOptions = li.siblings().slice(li.index(), control.data('selectBox-last-selected').index())
                        }
                        affectedOptions = affectedOptions.not('.selectBox-optgroup, .selectBox-disabled');
                        if (li.hasClass('selectBox-selected')) {
                            affectedOptions.addClass('selectBox-selected')
                        } else {
                            affectedOptions.removeClass('selectBox-selected')
                        }
                    } else if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {
                        li.toggleClass('selectBox-selected')
                    } else {
                        li.siblings().removeClass('selectBox-selected');
                        li.addClass('selectBox-selected')
                    }
                } else {
                    li.siblings().removeClass('selectBox-selected');
                    li.addClass('selectBox-selected')
                }
                if (control.hasClass('selectBox-dropdown')) {
                    control.find('.selectBox-label').text(li.text())
                }
                var i = 0,
                    selection = [];
                if (select.attr('multiple')) {
                    control.find('.selectBox-selected A').each(function() {
                        selection[i++] = $(this).attr('rel')
                    })
                } else {
                    selection = li.find('A').attr('rel')
                }
                control.data('selectBox-last-selected', li);
                if (select.val() !== selection) {
                    select.val(selection);
                    setLabel(select);
                    select.trigger('change')
                }
                return true
            };
            var addHover = function(select, li) {
                select = $(select);
                li = $(li);
                var control = select.data('selectBox-control'),
                    options = control.data('selectBox-options');
                options.find('.selectBox-hover').removeClass('selectBox-hover');
                li.addClass('selectBox-hover')
            };
            var removeHover = function(select, li) {
                select = $(select);
                li = $(li);
                var control = select.data('selectBox-control'),
                    options = control.data('selectBox-options');
                options.find('.selectBox-hover').removeClass('selectBox-hover')
            };
            var keepOptionInView = function(select, li, center) {
                if (!li || li.length === 0) return;
                select = $(select);
                var control = select.data('selectBox-control'),
                    options = control.data('selectBox-options'),
                    scrollBox = control.hasClass('selectBox-dropdown') ? options : options.parent(),
                    top = parseInt(li.offset().top - scrollBox.position().top),
                    bottom = parseInt(top + li.outerHeight());
                if (center) {
                    scrollBox.scrollTop(li.offset().top - scrollBox.offset().top + scrollBox.scrollTop() - (scrollBox.height() / 2))
                } else {
                    if (top < 0) {
                        scrollBox.scrollTop(li.offset().top - scrollBox.offset().top + scrollBox.scrollTop())
                    }
                    if (bottom > scrollBox.height()) {
                        scrollBox.scrollTop((li.offset().top + li.outerHeight()) - scrollBox.offset().top + scrollBox.scrollTop() - scrollBox.height())
                    }
                }
            };
            var handleKeyDown = function(select, event) {
                select = $(select);
                var control = select.data('selectBox-control'),
                    options = control.data('selectBox-options'),
                    settings = select.data('selectBox-settings'),
                    totalOptions = 0,
                    i = 0;
                if (control.hasClass('selectBox-disabled')) return;
                switch (event.keyCode) {
                    case 8:
                        event.preventDefault();
                        typeSearch = '';
                        break;
                    case 9:
                    case 27:
                        hideMenus();
                        removeHover(select);
                        break;
                    case 13:
                        if (control.hasClass('selectBox-menuShowing')) {
                            selectOption(select, options.find('LI.selectBox-hover:first'), event);
                            if (control.hasClass('selectBox-dropdown')) hideMenus()
                        } else {
                            showMenu(select)
                        }
                        break;
                    case 38:
                    case 37:
                        event.preventDefault();
                        if (control.hasClass('selectBox-menuShowing')) {
                            var prev = options.find('.selectBox-hover').prev('LI');
                            totalOptions = options.find('LI:not(.selectBox-optgroup)').length;
                            i = 0;
                            while (prev.length === 0 || prev.hasClass('selectBox-disabled') || prev.hasClass('selectBox-optgroup')) {
                                prev = prev.prev('LI');
                                if (prev.length === 0) {
                                    if (settings.loopOptions) {
                                        prev = options.find('LI:last')
                                    } else {
                                        prev = options.find('LI:first')
                                    }
                                }
                                if (++i >= totalOptions) break
                            }
                            addHover(select, prev);
                            selectOption(select, prev, event);
                            keepOptionInView(select, prev)
                        } else {
                            showMenu(select)
                        }
                        break;
                    case 40:
                    case 39:
                        event.preventDefault();
                        if (control.hasClass('selectBox-menuShowing')) {
                            var next = options.find('.selectBox-hover').next('LI');
                            totalOptions = options.find('LI:not(.selectBox-optgroup)').length;
                            i = 0;
                            while (next.length === 0 || next.hasClass('selectBox-disabled') || next.hasClass('selectBox-optgroup')) {
                                next = next.next('LI');
                                if (next.length === 0) {
                                    if (settings.loopOptions) {
                                        next = options.find('LI:first')
                                    } else {
                                        next = options.find('LI:last')
                                    }
                                }
                                if (++i >= totalOptions) break
                            }
                            addHover(select, next);
                            selectOption(select, next, event);
                            keepOptionInView(select, next)
                        } else {
                            showMenu(select)
                        }
                        break
                }
            };
            var handleKeyPress = function(select, event) {
                select = $(select);
                var control = select.data('selectBox-control'),
                    options = control.data('selectBox-options');
                if (control.hasClass('selectBox-disabled')) return;
                switch (event.keyCode) {
                    case 9:
                    case 27:
                    case 13:
                    case 38:
                    case 37:
                    case 40:
                    case 39:
                        break;
                    default:
                        if (!control.hasClass('selectBox-menuShowing')) showMenu(select);
                        event.preventDefault();
                        clearTimeout(typeTimer);
                        typeSearch += String.fromCharCode(event.charCode || event.keyCode);
                        options.find('A').each(function() {
                            if ($(this).text().trim().substr(0, typeSearch.length).toLowerCase() === typeSearch.toLowerCase()) {
                                addHover(select, $(this).parent());
                                keepOptionInView(select, $(this).parent());
                                return false
                            }
                        });
                        typeTimer = setTimeout(function() {
                            typeSearch = ''
                        }, 1000);
                        break
                }
            };
            var enable = function(select) {
                select = $(select);
                select.attr('disabled', false);
                var control = select.data('selectBox-control');
                if (!control) return;
                control.removeClass('selectBox-disabled')
            };
            var disable = function(select) {
                select = $(select);
                select.attr('disabled', true);
                var control = select.data('selectBox-control');
                if (!control) return;
                control.addClass('selectBox-disabled')
            };
            var setValue = function(select, value) {
                select = $(select);
                select.val(value);
                value = select.val();
                var control = select.data('selectBox-control');
                if (!control) return;
                var settings = select.data('selectBox-settings'),
                    options = control.data('selectBox-options');
                setLabel(select);
                options.find('.selectBox-selected').removeClass('selectBox-selected');
                options.find('A').each(function() {
                    if (typeof(value) === 'object') {
                        for (var i = 0; i < value.length; i++) {
                            if ($(this).attr('rel') == value[i]) {
                                $(this).parent().addClass('selectBox-selected')
                            }
                        }
                    } else {
                        if ($(this).attr('rel') == value) {
                            $(this).parent().addClass('selectBox-selected')
                        }
                    }
                });
                if (settings.change) settings.change.call(select)
            };
            var setOptions = function(select, options) {
                select = $(select);
                var control = select.data('selectBox-control'),
                    settings = select.data('selectBox-settings');
                switch (typeof(data)) {
                    case 'string':
                        select.html(data);
                        break;
                    case 'object':
                        select.html('');
                        for (var i in data) {
                            if (data[i] === null) continue;
                            if (typeof(data[i]) === 'object') {
                                var optgroup = $('<optgroup label="' + i + '" />');
                                for (var j in data[i]) {
                                    optgroup.append('<option value="' + j + '">' + data[i][j] + '</option>')
                                }
                                select.append(optgroup)
                            } else {
                                var option = $('<option value="' + i + '">' + data[i] + '</option>');
                                select.append(option)
                            }
                        }
                        break
                }
                if (!control) return;
                control.data('selectBox-options').remove();
                var type = control.hasClass('selectBox-dropdown') ? 'dropdown' : 'inline';
                options = getOptions(select, type);
                control.data('selectBox-options', options);
                switch (type) {
                    case 'inline':
                        control.append(options);
                        break;
                    case 'dropdown':
                        setLabel(select);
                        $("BODY").append(options);
                        break
                }
            };
            var disableSelection = function(selector) {
                $(selector).css('MozUserSelect', 'none').bind('selectstart', function(event) {
                    event.preventDefault()
                })
            };
            var generateOptions = function(self, options) {
                var li = $('<li />'),
                    a = $('<a />');
                li.addClass(self.attr('class'));
                li.data(self.data());
                a.attr('rel', self.val()).text(self.text());
                li.append(a);
                if (self.attr('disabled')) li.addClass('selectBox-disabled');
                if (self.attr('selected')) li.addClass('selectBox-selected');
                options.append(li)
            };
            switch (method) {
                case 'control':
                    return $(this).data('selectBox-control');
                case 'settings':
                    if (!data) return $(this).data('selectBox-settings');
                    $(this).each(function() {
                        $(this).data('selectBox-settings', $.extend(true, $(this).data('selectBox-settings'), data))
                    });
                    break;
                case 'options':
                    if (data === undefined) return $(this).data('selectBox-control').data('selectBox-options');
                    $(this).each(function() {
                        setOptions(this, data)
                    });
                    break;
                case 'value':
                    if (data === undefined) return $(this).val();
                    $(this).each(function() {
                        setValue(this, data)
                    });
                    break;
                case 'refresh':
                    $(this).each(function() {
                        refresh(this)
                    });
                    break;
                case 'enable':
                    $(this).each(function() {
                        enable(this)
                    });
                    break;
                case 'disable':
                    $(this).each(function() {
                        disable(this)
                    });
                    break;
                case 'destroy':
                    $(this).each(function() {
                        destroy(this)
                    });
                    break;
                default:
                    $(this).each(function() {
                        init(this, method)
                    });
                    break
            }
            return $(this)
        }
    })
})(jQuery);;
/*!
 * jQuery Tools v1.2.7 - The missing UI library for the Web
 * 
 * overlay/overlay.js
 * scrollable/scrollable.js
 * tabs/tabs.js
 * tooltip/tooltip.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 */
(function(b){function m(a,c){var d=this,h=a.add(d),n=b(window),e,f,k,g=b.tools.expose&&(c.mask||c.expose),l=Math.random().toString().slice(10);g&&("string"==typeof g&&(g={color:g}),g.closeOnClick=g.closeOnEsc=!1);var i=c.target||a.attr("rel");f=i?b(i):a;if(!f.length)throw"Could not find Overlay: "+i;a&&-1==a.index(f)&&a.click(function(b){d.load(b);return b.preventDefault()});b.extend(d,{load:function(a){if(d.isOpened())return d;var p=o[c.effect];if(!p)throw'Overlay: cannot find effect : "'+c.effect+
 '"';c.oneInstance&&b.each(q,function(){this.close(a)});a=a||b.Event();a.type="onBeforeLoad";h.trigger(a);if(a.isDefaultPrevented())return d;k=true;g&&b(f).expose(g);var j=c.top,e=c.left,i=f.outerWidth({margin:true}),m=f.outerHeight({margin:true});typeof j=="string"&&(j=j=="center"?Math.max((n.height()-m)/2,0):parseInt(j,10)/100*n.height());e=="center"&&(e=Math.max((n.width()-i)/2,0));p[0].call(d,{top:j,left:e},function(){if(k){a.type="onLoad";h.trigger(a)}});if(g&&c.closeOnClick)b.mask.getMask().one("click",
 d.close);if(c.closeOnClick)b(document).on("click."+l,function(a){b(a.target).parents(f).length||d.close(a)});if(c.closeOnEsc)b(document).on("keydown."+l,function(a){a.keyCode==27&&d.close(a)});return d},close:function(a){if(!d.isOpened())return d;a=a||b.Event();a.type="onBeforeClose";h.trigger(a);if(!a.isDefaultPrevented()){k=false;o[c.effect][1].call(d,function(){a.type="onClose";h.trigger(a)});b(document).off("click."+l+" keydown."+l);g&&b.mask.close();return d}},getOverlay:function(){return f},
 getTrigger:function(){return a},getClosers:function(){return e},isOpened:function(){return k},getConf:function(){return c}});b.each(["onBeforeLoad","onStart","onLoad","onBeforeClose","onClose"],function(a,e){if(b.isFunction(c[e]))b(d).on(e,c[e]);d[e]=function(a){if(a)b(d).on(e,a);return d}});e=f.find(c.close||".close");!e.length&&!c.close&&(e=b('<a class="close"></a>'),f.prepend(e));e.click(function(a){d.close(a)});c.load&&d.load()}b.tools=b.tools||{version:"@VERSION"};b.tools.overlay={addEffect:function(a,
 b,d){o[a]=[b,d]},conf:{close:null,closeOnClick:!0,closeOnEsc:!0,closeSpeed:"fast",effect:"default",fixed:!b.browser.msie||6<b.browser.version,left:"center",load:!1,mask:null,oneInstance:!0,speed:"normal",target:null,top:"10%"}};var q=[],o={};b.tools.overlay.addEffect("default",function(a,c){var d=this.getConf(),h=b(window);d.fixed||(a.top+=h.scrollTop(),a.left+=h.scrollLeft());a.position=d.fixed?"fixed":"absolute";this.getOverlay().css(a).fadeIn(d.speed,c)},function(a){this.getOverlay().fadeOut(this.getConf().closeSpeed,
 a)});b.fn.overlay=function(a){var c=this.data("overlay");if(c)return c;b.isFunction(a)&&(a={onBeforeLoad:a});a=b.extend(!0,{},b.tools.overlay.conf,a);this.each(function(){c=new m(b(this),a);q.push(c);b(this).data("overlay",c)});return a.api?c:this}})(jQuery);(function(d){function p(f,b){var c=d(b);return 2>c.length?c:f.parent().find(b)}function u(f,b){var c=this,n=f.add(c),g=f.children(),l=0,j=b.vertical;k||(k=c);1<g.length&&(g=d(b.items,f));1<b.size&&(b.circular=!1);d.extend(c,{getConf:function(){return b},getIndex:function(){return l},getSize:function(){return c.getItems().size()},getNaviButtons:function(){return h.add(m)},getRoot:function(){return f},getItemWrap:function(){return g},getItems:function(){return g.find(b.item).not("."+b.clonedClass)},
move:function(a,b){return c.seekTo(l+a,b)},next:function(a){return c.move(b.size,a)},prev:function(a){return c.move(-b.size,a)},begin:function(a){return c.seekTo(0,a)},end:function(a){return c.seekTo(c.getSize()-1,a)},focus:function(){return k=c},addItem:function(a){a=d(a);if(b.circular){g.children().last().before(a);g.children().first().replaceWith(a.clone().addClass(b.clonedClass))}else{g.append(a);m.removeClass("disabled")}n.trigger("onAddItem",[a]);return c},seekTo:function(a,e,f){a.jquery||(a=
a*1);if(b.circular&&a===0&&l==-1&&e!==0||!b.circular&&a<0||a>c.getSize()||a<-1)return c;var i=a;a.jquery?a=c.getItems().index(a):i=c.getItems().eq(a);var h=d.Event("onBeforeSeek");if(!f){n.trigger(h,[a,e]);if(h.isDefaultPrevented()||!i.length)return c}i=j?{top:-i.position().top}:{left:-i.position().left};l=a;k=c;if(e===void 0)e=b.speed;g.animate(i,e,b.easing,f||function(){n.trigger("onSeek",[a])});return c}});d.each(["onBeforeSeek","onSeek","onAddItem"],function(a,e){if(d.isFunction(b[e]))d(c).on(e,
b[e]);c[e]=function(a){if(a)d(c).on(e,a);return c}});if(b.circular){var q=c.getItems().slice(-1).clone().prependTo(g),r=c.getItems().eq(1).clone().appendTo(g);q.add(r).addClass(b.clonedClass);c.onBeforeSeek(function(a,b,d){if(!a.isDefaultPrevented()){if(b==-1){c.seekTo(q,d,function(){c.end(0)});return a.preventDefault()}b==c.getSize()&&c.seekTo(r,d,function(){c.begin(0)})}});var o=f.parents().add(f).filter(function(){if(d(this).css("display")==="none")return true});o.length?(o.show(),c.seekTo(0,0,
function(){}),o.hide()):c.seekTo(0,0,function(){})}var h=p(f,b.prev).click(function(a){a.stopPropagation();c.prev()}),m=p(f,b.next).click(function(a){a.stopPropagation();c.next()});b.circular||(c.onBeforeSeek(function(a,e){setTimeout(function(){if(!a.isDefaultPrevented()){h.toggleClass(b.disabledClass,e<=0);m.toggleClass(b.disabledClass,e>=c.getSize()-1)}},1)}),b.initialIndex||h.addClass(b.disabledClass));2>c.getSize()&&h.add(m).addClass(b.disabledClass);b.mousewheel&&d.fn.mousewheel&&f.mousewheel(function(a,
e){if(b.mousewheel){c.move(e<0?1:-1,b.wheelSpeed||50);return false}});if(b.touch){var s,t;g[0].ontouchstart=function(a){a=a.touches[0];s=a.clientX;t=a.clientY};g[0].ontouchmove=function(a){if(a.touches.length==1&&!g.is(":animated")){var b=a.touches[0],d=s-b.clientX,b=t-b.clientY;c[j&&b>0||!j&&d>0?"next":"prev"]();a.preventDefault()}}}if(b.keyboard)d(document).on("keydown.scrollable",function(a){if(b.keyboard&&!a.altKey&&!a.ctrlKey&&!a.metaKey&&!d(a.target).is(":input")&&!(b.keyboard!="static"&&k!=
c)){var e=a.keyCode;if(j&&(e==38||e==40)){c.move(e==38?-1:1);return a.preventDefault()}if(!j&&(e==37||e==39)){c.move(e==37?-1:1);return a.preventDefault()}}});b.initialIndex&&c.seekTo(b.initialIndex,0,function(){})}d.tools=d.tools||{version:"@VERSION"};d.tools.scrollable={conf:{activeClass:"active",circular:!1,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:"> *",items:".items",keyboard:!0,mousewheel:!1,next:".next",prev:".prev",size:1,speed:400,vertical:!1,touch:!0,
wheelSpeed:0}};var k;d.fn.scrollable=function(f){var b=this.data("scrollable");if(b)return b;f=d.extend({},d.tools.scrollable.conf,f);this.each(function(){b=new u(d(this),f);d(this).data("scrollable",b)});return f.api?b:this}})(jQuery);(function(d){function n(c,a,b){var e=this,l=c.add(this),g=c.find(b.tabs),f=a.jquery?a:c.children(a),i;g.length||(g=c.children());f.length||(f=c.parent().find(a));f.length||(f=d(a));d.extend(this,{click:function(a,h){var f=g.eq(a),j=!c.data("tabs");"string"==typeof a&&a.replace("#","")&&(f=g.filter('[href*="'+a.replace("#","")+'"]'),a=Math.max(g.index(f),0));if(b.rotate){var k=g.length-1;if(0>a)return e.click(k,h);if(a>k)return e.click(0,h)}if(!f.length){if(0<=i)return e;a=b.initialIndex;f=g.eq(a)}if(a===
i)return e;h=h||d.Event();h.type="onBeforeClick";l.trigger(h,[a]);if(!h.isDefaultPrevented())return m[j?b.initialEffect&&b.effect||"default":b.effect].call(e,a,function(){i=a;h.type="onClick";l.trigger(h,[a])}),g.removeClass(b.current),f.addClass(b.current),e},getConf:function(){return b},getTabs:function(){return g},getPanes:function(){return f},getCurrentPane:function(){return f.eq(i)},getCurrentTab:function(){return g.eq(i)},getIndex:function(){return i},next:function(){return e.click(i+1)},prev:function(){return e.click(i-
1)},destroy:function(){g.off(b.event).removeClass(b.current);f.find('a[href^="#"]').off("click.T");return e}});d.each(["onBeforeClick","onClick"],function(a,c){if(d.isFunction(b[c]))d(e).on(c,b[c]);e[c]=function(a){if(a)d(e).on(c,a);return e}});b.history&&d.fn.history&&(d.tools.history.init(g),b.event="history");g.each(function(a){d(this).on(b.event,function(b){e.click(a,b);return b.preventDefault()})});f.find('a[href^="#"]').on("click.T",function(a){e.click(d(this).attr("href"),a)});location.hash&&
"a"==b.tabs&&c.find('[href="'+location.hash+'"]').length?e.click(location.hash):(0===b.initialIndex||0<b.initialIndex)&&e.click(b.initialIndex)}d.tools=d.tools||{version:"@VERSION"};d.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialEffect:!1,initialIndex:0,event:"click",rotate:!1,slideUpSpeed:400,slideDownSpeed:400,history:!1},addEffect:function(c,a){m[c]=a}};var m={"default":function(c,a){this.getPanes().hide().eq(c).show();a.call()},fade:function(c,
a){var b=this.getConf(),e=b.fadeOutSpeed,d=this.getPanes();e?d.fadeOut(e):d.hide();d.eq(c).fadeIn(b.fadeInSpeed,a)},slide:function(c,a){var b=this.getConf();this.getPanes().slideUp(b.slideUpSpeed);this.getPanes().eq(c).slideDown(b.slideDownSpeed,a)},ajax:function(c,a){this.getPanes().eq(0).load(this.getTabs().eq(c).attr("href"),a)}},j,k;d.tools.tabs.addEffect("horizontal",function(c,a){if(!j){var b=this.getPanes().eq(c),e=this.getCurrentPane();k||(k=this.getPanes().eq(0).width());j=!0;b.show();e.animate({width:0},
{step:function(a){b.css("width",k-a)},complete:function(){d(this).hide();a.call();j=!1}});e.length||(a.call(),j=!1)}});d.fn.tabs=function(c,a){var b=this.data("tabs");b&&(b.destroy(),this.removeData("tabs"));d.isFunction(a)&&(a={onBeforeClick:a});a=d.extend({},d.tools.tabs.conf,a);this.each(function(){b=new n(d(this),c,a);d(this).data("tabs",b)});return a.api?b:this}})(jQuery);(function(e){function p(a,b,d){var f=d.relative?a.position().top:a.offset().top,c=d.relative?a.position().left:a.offset().left,h=d.position[0],f=f-(b.outerHeight()-d.offset[0]),c=c+(a.outerWidth()+d.offset[1]);/iPad/i.test(navigator.userAgent)&&(f-=e(window).scrollTop());var i=b.outerHeight()+a.outerHeight();"center"==h&&(f+=i/2);"bottom"==h&&(f+=i);h=d.position[1];a=b.outerWidth()+a.outerWidth();"center"==h&&(c-=a/2);"left"==h&&(c-=a);return{top:f,left:c}}function n(a,b){var d=this,f=a.add(d),c,
h=0,i=0,m=a.attr("title"),q=a.attr("data-tooltip"),r=o[b.effect],l,s=a.is(":input"),n=s&&a.is(":checkbox, :radio, select, :button, :submit"),t=a.attr("type"),j=b.events[t]||b.events[s?n?"widget":"input":"def"];if(!r)throw'Nonexistent effect "'+b.effect+'"';j=j.split(/,\s*/);if(2!=j.length)throw"Tooltip: bad events configuration for "+t;a.on(j[0],function(a){clearTimeout(h);b.predelay?i=setTimeout(function(){d.show(a)},b.predelay):d.show(a)}).on(j[1],function(a){clearTimeout(i);b.delay?h=setTimeout(function(){d.hide(a)},
b.delay):d.hide(a)});m&&b.cancelDefault&&(a.removeAttr("title"),a.data("title",m));e.extend(d,{show:function(k){if(!c){if(q)c=e(q);else if(b.tip)c=e(b.tip).eq(0);else if(m)c=e(b.layout).addClass(b.tipClass).appendTo(document.body).hide().append(m);else{c=a.next();c.length||(c=a.parent().next())}if(!c.length)throw"Cannot find tooltip for "+a;}if(d.isShown())return d;c.stop(true,true);var g=p(a,c,b);b.tip&&c.html(a.data("title"));k=e.Event();k.type="onBeforeShow";f.trigger(k,[g]);if(k.isDefaultPrevented())return d;
g=p(a,c,b);c.css({position:"absolute",top:g.top,left:g.left});l=true;r[0].call(d,function(){k.type="onShow";l="full";f.trigger(k)});g=b.events.tooltip.split(/,\s*/);if(!c.data("__set")){c.off(g[0]).on(g[0],function(){clearTimeout(h);clearTimeout(i)});if(g[1]&&!a.is("input:not(:checkbox, :radio), textarea"))c.off(g[1]).on(g[1],function(b){b.relatedTarget!=a[0]&&a.trigger(j[1].split(" ")[0])});b.tip||c.data("__set",true)}return d},hide:function(a){if(!c||!d.isShown())return d;a=e.Event();a.type="onBeforeHide";
f.trigger(a);if(!a.isDefaultPrevented()){l=false;o[b.effect][1].call(d,function(){a.type="onHide";f.trigger(a)});return d}},isShown:function(a){return a?l=="full":l},getConf:function(){return b},getTip:function(){return c},getTrigger:function(){return a}});e.each(["onHide","onBeforeShow","onShow","onBeforeHide"],function(a,c){if(e.isFunction(b[c]))e(d).on(c,b[c]);d[c]=function(a){if(a)e(d).on(c,a);return d}})}e.tools=e.tools||{version:"@VERSION"};e.tools.tooltip={conf:{effect:"toggle",fadeOutSpeed:"fast",
predelay:0,delay:30,opacity:1,tip:0,fadeIE:!1,position:["top","center"],offset:[0,0],relative:!1,cancelDefault:!0,events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,b,d){o[a]=[b,d]}};var o={toggle:[function(a){var b=this.getConf(),d=this.getTip(),b=b.opacity;1>b&&d.css({opacity:b});d.show();a.call()},function(a){this.getTip().hide();a.call()}],fade:[function(a){var b=
this.getConf();!e.browser.msie||b.fadeIE?this.getTip().fadeTo(b.fadeInSpeed,b.opacity,a):(this.getTip().show(),a())},function(a){var b=this.getConf();!e.browser.msie||b.fadeIE?this.getTip().fadeOut(b.fadeOutSpeed,a):(this.getTip().hide(),a())}]};e.fn.tooltip=function(a){var b=this.data("tooltip");if(b)return b;a=e.extend(!0,{},e.tools.tooltip.conf,a);"string"==typeof a.position&&(a.position=a.position.split(/,?\s/));this.each(function(){b=new n(e(this),a);e(this).data("tooltip",b)});return a.api?
b:this}})(jQuery);;
/* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),n&&i.callbacks.onCreate&&"function"==typeof i.callbacks.onCreate&&i.callbacks.onCreate.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=e("#mCSB_"+n.idx),s=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&Q(t),o&&n&&i.callbacks.onBeforeUpdate&&"function"==typeof i.callbacks.onBeforeUpdate&&i.callbacks.onBeforeUpdate.call(this),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),l.css("max-height","none"),l.height()!==t.height()&&l.css("max-height",t.height()),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r)),n.overflowed=y.call(this),M.call(this),i.autoDraggerLength&&S.call(this),b.call(this),T.call(this);var c=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?s[0].height()>s[0].parent().height()?B.call(this):(G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(B.call(this),"y"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[1]&&G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?s[1].width()>s[1].parent().width()?B.call(this):(G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(B.call(this),"x"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[0]&&G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),N.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=Y.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=X.call(this,c[0],"y"),c[1]=X.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=ne()?0:d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",G(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",G(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&Q(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){o.data(a);N.call(this,"remove"),k.call(this),t&&B.call(this),M.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),N.call(this,"remove"),k.call(this),B.call(this),n.removeData(a),$(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),$(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir='"+n.langDir+"' /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p)),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){var o=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],a=t.parent().width();return o[0]>a?o[0]:o[1]>a?o[1]:"100%"},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");if(n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis){i.css({width:"auto","min-width":0,"overflow-x":"scroll"});var r=Math.ceil(i[0].scrollWidth);3===n.advanced.autoExpandHorizontalScroll||2!==n.advanced.autoExpandHorizontalScroll&&r>i.parent().width()?i.css({width:r,"min-width":"100%","overflow-x":"inherit"}):i.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=oe(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' "+r+" />","<a href='#' class='"+d[14]+"' "+r+" />","<a href='#' class='"+d[15]+"' "+r+" />","<a href='#' class='"+d[16]+"' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},C=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},y=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1),s=i[0].scrollHeight,c=i[0].scrollWidth;return s>r&&(r=s),c>l&&(l=c),[r>n.height(),l>n.width()]},B=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(Q(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),G(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),G(t,"_resetX")}},T=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),W.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(I.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}P.call(this),U.call(this),i.advanced.autoScrollOnFocus&&H.call(this),i.scrollButtons.enable&&F.call(this),i.keyboard.enable&&q.call(this),n.bindEvents=!0}},k=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),n.advanced.extraDraggableSelectors&&l.add(e(n.advanced.extraDraggableSelectors)),o.bindEvents&&(e(document).add(e(!A()||top.document)).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),$(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),$(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),$(s[0],"onCompleteTimeout"),o.bindEvents=!1)},M=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},O=function(t){var o=t.type,a=t.target.ownerDocument!==document&&null!==frameElement?[e(frameElement).offset().top,e(frameElement).offset().left]:null,n=A()&&t.target.ownerDocument!==top.document&&null!==frameElement?[e(t.view.frameElement).offset().top,e(t.view.frameElement).offset().left]:[0,0];switch(o){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return a?[t.originalEvent.pageY-a[0]+n[0],t.originalEvent.pageX-a[1]+n[1],!1]:[t.originalEvent.pageY,t.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],r=t.originalEvent.touches.length||t.originalEvent.changedTouches.length;return t.target.ownerDocument!==document?[i.screenY,i.screenX,r>1]:[i.pageY,i.pageX,r>1];default:return a?[t.pageY-a[0]+n[0],t.pageX-a[1]+n[1],!1]:[t.pageY,t.pageX,!1]}},I=function(){function t(e,t,a,n){if(h[0].idleTimer=d.scrollInertia<233?250:0,o.attr("id")===f[1])var i="x",s=(o[0].offsetLeft-t+n)*l.scrollRatio.x;else var i="y",s=(o[0].offsetTop-e+a)*l.scrollRatio.y;G(r,s.toString(),{dir:i,drag:!0})}var o,n,i,r=e(this),l=r.data(a),d=l.opt,u=a+"_"+l.idx,f=["mCSB_"+l.idx+"_dragger_vertical","mCSB_"+l.idx+"_dragger_horizontal"],h=e("#mCSB_"+l.idx+"_container"),m=e("#"+f[0]+",#"+f[1]),p=d.advanced.releaseDraggableSelectors?m.add(e(d.advanced.releaseDraggableSelectors)):m,g=d.advanced.extraDraggableSelectors?e(!A()||top.document).add(e(d.advanced.extraDraggableSelectors)):e(!A()||top.document);m.bind("contextmenu."+u,function(e){e.preventDefault()}).bind("mousedown."+u+" touchstart."+u+" pointerdown."+u+" MSPointerDown."+u,function(t){if(t.stopImmediatePropagation(),t.preventDefault(),ee(t)){c=!0,s&&(document.onselectstart=function(){return!1}),L.call(h,!1),Q(r),o=e(this);var a=o.offset(),l=O(t)[0]-a.top,u=O(t)[1]-a.left,f=o.height()+a.top,m=o.width()+a.left;f>l&&l>0&&m>u&&u>0&&(n=l,i=u),C(o,"active",d.autoExpandScrollbar)}}).bind("touchmove."+u,function(e){e.stopImmediatePropagation(),e.preventDefault();var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;t(n,i,r,l)}),e(document).add(g).bind("mousemove."+u+" pointermove."+u+" MSPointerMove."+u,function(e){if(o){var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;if(n===r&&i===l)return;t(n,i,r,l)}}).add(p).bind("mouseup."+u+" touchend."+u+" pointerup."+u+" MSPointerUp."+u,function(){o&&(C(o,"active",d.autoExpandScrollbar),o=null),c=!1,s&&(document.onselectstart=null),L.call(h,!0)})},D=function(){function o(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,b=0,C=0,d=1,y.removeClass("mCS_touch_action");var o=I.offset();u=O(e)[0]-o.top,f=O(e)[1]-o.left,z=[O(e)[0],O(e)[1]]}function n(e){if(te(e)&&!c&&!O(e)[2]&&(T.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!C||b)&&d)){g=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left,n="mcsLinearOut";if(E.push(o),W.push(a),z[2]=Math.abs(O(e)[0]-z[0]),z[3]=Math.abs(O(e)[1]-z[1]),B.overflowed[0])var i=D[0].parent().height()-D[0].height(),r=u-o>0&&o-u>-(i*B.scrollRatio.y)&&(2*z[3]<z[2]||"yx"===T.axis);if(B.overflowed[1])var l=D[1].parent().width()-D[1].width(),h=f-a>0&&a-f>-(l*B.scrollRatio.x)&&(2*z[2]<z[3]||"yx"===T.axis);r||h?(U||e.preventDefault(),b=1):(C=1,y.addClass("mCS_touch_action")),U&&e.preventDefault(),w="yx"===T.axis?[u-o,f-a]:"x"===T.axis?[null,f-a]:[u-o,null],I[0].idleTimer=250,B.overflowed[0]&&s(w[0],R,n,"y","all",!0),B.overflowed[1]&&s(w[1],R,n,"x",L,!0)}}function i(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),Q(y),p=K();var o=M.offset();h=O(e)[0]-o.top,m=O(e)[1]-o.left,E=[],W=[]}function r(e){if(te(e)&&!c&&!O(e)[2]){d=0,e.stopImmediatePropagation(),b=0,C=0,v=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left;if(!(v-g>30)){_=1e3/(v-p);var n="mcsEaseOut",i=2.5>_,r=i?[E[E.length-2],W[W.length-2]]:[0,0];x=i?[o-r[0],a-r[1]]:[o-h,a-m];var u=[Math.abs(x[0]),Math.abs(x[1])];_=i?[Math.abs(x[0]/4),Math.abs(x[1]/4)]:[_,_];var f=[Math.abs(I[0].offsetTop)-x[0]*l(u[0]/_[0],_[0]),Math.abs(I[0].offsetLeft)-x[1]*l(u[1]/_[1],_[1])];w="yx"===T.axis?[f[0],f[1]]:"x"===T.axis?[null,f[1]]:[f[0],null],S=[4*u[0]+T.scrollInertia,4*u[1]+T.scrollInertia];var y=parseInt(T.contentTouchScroll)||0;w[0]=u[0]>y?w[0]:0,w[1]=u[1]>y?w[1]:0,B.overflowed[0]&&s(w[0],S[0],n,"y",L,!1),B.overflowed[1]&&s(w[1],S[1],n,"x",L,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&G(y,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C,y=e(this),B=y.data(a),T=B.opt,k=a+"_"+B.idx,M=e("#mCSB_"+B.idx),I=e("#mCSB_"+B.idx+"_container"),D=[e("#mCSB_"+B.idx+"_dragger_vertical"),e("#mCSB_"+B.idx+"_dragger_horizontal")],E=[],W=[],R=0,L="yx"===T.axis?"none":"all",z=[],P=I.find("iframe"),H=["touchstart."+k+" pointerdown."+k+" MSPointerDown."+k,"touchmove."+k+" pointermove."+k+" MSPointerMove."+k,"touchend."+k+" pointerup."+k+" MSPointerUp."+k],U=void 0!==document.body.style.touchAction&&""!==document.body.style.touchAction;I.bind(H[0],function(e){o(e)}).bind(H[1],function(e){n(e)}),M.bind(H[0],function(e){i(e)}).bind(H[2],function(e){r(e)}),P.length&&P.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(H[0],function(e){o(e),i(e)}).bind(H[1],function(e){n(e)}).bind(H[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,j(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=O(e)[0]-a.top+f[0].offsetTop,c=O(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(){t||(i&&(i=0,n("off",null)),c=!1)})},W=function(){function t(t,a){if(Q(o),!z(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100,d=i.scrollInertia;if("x"===i.axis||"x"===i.mouseWheel.axis)var u="x",f=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.width()?.9*l.width():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),p=c[1][0].offsetLeft,g=c[1].parent().width()-c[1].width(),v="y"===i.mouseWheel.axis?t.deltaY||a:t.deltaX;else var u="y",f=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.height()?.9*l.height():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),p=c[0][0].offsetTop,g=c[0].parent().height()-c[0].height(),v=t.deltaY||a;"y"===u&&!n.overflowed[0]||"x"===u&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),i.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==p||0>v&&p!==g||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<5&&!i.mouseWheel.normalizeDelta&&(h=t.deltaFactor,d=17),G(o,(m-v*h).toString(),{dir:u,dur:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},R=new Object,A=function(t){var o=!1,a=!1,n=null;if(void 0===t?a="#empty":void 0!==e(t).attr("id")&&(a=e(t).attr("id")),a!==!1&&void 0!==R[a])return R[a];if(t){try{var i=t.contentDocument||t.contentWindow.document;n=i.body.innerHTML}catch(r){}o=null!==n}else{try{var i=top.document;n=i.body.innerHTML}catch(r){}o=null!==n}return a!==!1&&(R[a]=o),o},L=function(e){var t=this.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}},z=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},P=function(){var t,o=e(this),n=o.data(a),i=a+"_"+n.idx,r=e("#mCSB_"+n.idx+"_container"),l=r.parent(),s=e(".mCSB_"+n.idx+"_scrollbar ."+d[12]);s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(o){c=!0,e(o.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(){c=!1}).bind("click."+i,function(a){if(t&&(t=0,e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail"))){Q(o);var i=e(this),s=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!n.overflowed[1])return;var c="x",u=a.pageX>s.offset().left?-1:1,f=Math.abs(r[0].offsetLeft)-u*(.9*l.width())}else{if(!n.overflowed[0])return;var c="y",u=a.pageY>s.offset().top?-1:1,f=Math.abs(r[0].offsetTop)-u*(.9*l.height())}G(o,f.toString(),{dir:c,scrollEasing:"mcsEaseInOut"})}})},H=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(){var o=e(document.activeElement),a=r.find(".mCustomScrollBox").length,i=0;o.is(n.advanced.autoScrollOnFocus)&&(Q(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=a?(i+17)*a:0,t[0]._focusTimeout=setTimeout(function(){var e=[ae(o)[0],ae(o)[1]],a=[r[0].offsetTop,r[0].offsetLeft],s=[a[0]+e[0]>=0&&a[0]+e[0]<l.height()-o.outerHeight(!1),a[1]+e[1]>=0&&a[0]+e[1]<l.width()-o.outerWidth(!1)],c="yx"!==n.axis||s[0]||s[1]?"all":"none";"x"===n.axis||s[0]||G(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i}),"y"===n.axis||s[1]||G(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i})},t[0]._focusTimer))})},U=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(){0===i.scrollTop()&&0===i.scrollLeft()||e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},F=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("contextmenu."+r,function(e){e.preventDefault()}).bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.scrollButtons.scrollAmount,j(t,e,o)}if(a.preventDefault(),ee(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},q=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||j(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){Q(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-f*(.9*d.width());else var h="y",m=Math.abs(c[0].offsetTop)-f*(.9*d.height());G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},j=function(t,o,n,i,r){function l(e){u.snapAmount&&(f.scrollAmount=u.snapAmount instanceof Array?"x"===f.dir[0]?u.snapAmount[1]:u.snapAmount[0]:u.snapAmount);var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],m="x"===f.dir[0]?s[1]+f.dir[1]*(d[1]*n):s[0]+f.dir[1]*(d[0]*n),v="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),x="auto"!==f.scrollAmount?v:m,_=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",w=!!e;return e&&17>a&&(x="x"===f.dir[0]?s[1]:s[0]),G(t,x.toString(),{dir:f.dir[0],scrollEasing:_,dur:a,onComplete:w}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),$(f,"step"),Q(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],Q(t),oe(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},Y=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},X=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1)-s.width():l.outerHeight(!1)-s.height(),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?ae(m)[1]:ae(m)[0];case"string":case"number":if(oe(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&oe(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?ae(m)[1]:ae(m)[0]}return e(t).length?"x"===o?ae(e(t))[1]:ae(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},N=function(t){function o(){return clearTimeout(f[0].autoUpdate),0===l.parents("html").length?void(l=null):void(f[0].autoUpdate=setTimeout(function(){return c.advanced.updateOnSelectorChange&&(s.poll.change.n=i(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void r(3)):c.advanced.updateOnContentResize&&(s.poll.size.n=l[0].scrollHeight+l[0].scrollWidth+f[0].offsetHeight+l[0].offsetHeight+l[0].offsetWidth,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void r(1)):!c.advanced.updateOnImageLoad||"auto"===c.advanced.updateOnImageLoad&&"y"===c.axis||(s.poll.img.n=f.find("img").length,s.poll.img.n===s.poll.img.o)?void((c.advanced.updateOnSelectorChange||c.advanced.updateOnContentResize||c.advanced.updateOnImageLoad)&&o()):(s.poll.img.o=s.poll.img.n,void f.find("img").each(function(){n(this)}))},c.advanced.autoUpdateTimeout))}function n(t){function o(e,t){return function(){
return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),r(2)}if(e(t).hasClass(d[2]))return void r();var n=new Image;n.onload=o(n,a),n.src=t.src}function i(){c.advanced.updateOnSelectorChange===!0&&(c.advanced.updateOnSelectorChange="*");var e=0,t=f.find(c.advanced.updateOnSelectorChange);return c.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function r(e){clearTimeout(f[0].autoUpdate),u.update.call(null,l[0],e)}var l=e(this),s=l.data(a),c=s.opt,f=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(f[0].autoUpdate),void $(f[0],"autoUpdate")):void o()},V=function(e,t,o){return Math.round(e/t)*t-o},Q=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){Z.call(this)})},G=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||w>=S[0]+y,c.callbacks.alwaysTriggerOffsets||-B>=w]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[x[0].offsetTop,x[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?Y.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?Y.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,0===m.scrollTop()&&0===m.scrollLeft()||(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){if(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount){var v=c.snapAmount instanceof Array?"x"===n.dir?c.snapAmount[1]:c.snapAmount[0]:c.snapAmount;o=V(o,v,c.snapOffset)}switch(n.dir){case"x":var x=e("#mCSB_"+s.idx+"_dragger_horizontal"),_="left",w=h[0].offsetLeft,S=[f.width()-h.outerWidth(!1),x.parent().width()-x.width()],b=[o,0===o?0:o/s.scrollRatio.x],y=p[1],B=g[1],T=y>0?y/s.scrollRatio.x:0,k=B>0?B/s.scrollRatio.x:0;break;case"y":var x=e("#mCSB_"+s.idx+"_dragger_vertical"),_="top",w=h[0].offsetTop,S=[f.height()-h.outerHeight(!1),x.parent().height()-x.height()],b=[o,0===o?0:o/s.scrollRatio.y],y=p[0],B=g[0],T=y>0?y/s.scrollRatio.y:0,k=B>0?B/s.scrollRatio.y:0}b[1]<0||0===b[0]&&0===b[1]?b=[0,0]:b[1]>=S[1]?b=[S[0],S[1]]:b[0]=-b[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),J(x[0],_,Math.round(b[1]),u[1],n.scrollEasing),!s.tweenRunning&&(0===w&&b[0]>=0||w===S[0]&&b[0]<=S[0])||J(h[0],_,Math.round(b[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,C(x),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&b[1]>=S[1]-T&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&b[1]<=k&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,C(x,"hide")},e)}}})}},J=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=K()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=K(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},K=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},Z=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},$=function(e,t){try{delete e[t]}catch(o){e[t]=null}},ee=function(e){return!(e.which&&1!==e.which)},te=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},oe=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},ae=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]},ne=function(){function e(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}var t=e();return t?document[t]:!1};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).bind("load",function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+ae(n)[0]>=0&&a[0]+ae(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+ae(n)[1]>=0&&a[1]+ae(n)[1]<o.width()-n.outerWidth(!1)},mcsInSight:e.expr[":"].mcsInSight||function(t,o,a){var n,i,r,l,s=e(t),c=s.parents(".mCSB_container"),d="exact"===a[3]?[[1,0],[1,0]]:[[.9,.1],[.6,.4]];if(c.length)return n=[s.outerHeight(!1),s.outerWidth(!1)],r=[c[0].offsetTop+ae(s)[0],c[0].offsetLeft+ae(s)[1]],i=[c.parent()[0].offsetHeight,c.parent()[0].offsetWidth],l=[n[0]<i[0]?d[0]:d[1],n[1]<i[1]?d[0]:d[1]],r[0]-i[0]*l[0][0]<0&&r[0]+n[0]-i[0]*l[0][1]>=0&&r[1]-i[1]*l[1][0]<0&&r[1]+n[1]-i[1]*l[1][1]>=0},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});
