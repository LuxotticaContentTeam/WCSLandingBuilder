(window.vueWebpackJsonp=window.vueWebpackJsonp||[]).push([[20],{1109:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"copy-clipboard flex flex-col relative",class:{"py-2":!t.category}},[t.category?n("sgh-button",{attrs:{category:t.category,"dark-mode":t.darkMode},on:{click:function(e){return t.copyPromoCode()}}},[t._v("\n    "+t._s(t.$t("copy_code"))+" "+t._s(t.code)+"\n  ")]):n("a",{staticClass:"copy-clipboard--text py-2 cursor-pointer text-base font-medium mb-0",class:t.color,attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.copyPromoCode.apply(null,arguments)}}},[t._v("\n    "+t._s(t.$t("copy_code"))+" "+t._s(t.code)+"\n  ")]),t._v(" "),n("transition",{attrs:{name:"fade-in"}},[t.copied?n("p",{staticClass:"copy-clipboard__cta px-4 py-2 mb-0 rounded",class:t.category?t.darkMode?"dark-mode":"light-mode":""},[n("span",{staticClass:"text-base common__icon mr-0.8rem",class:t.category&&t.darkMode?"common__icon--check-white":"common__icon--check-black"},[t._v("check")]),t._v("\n      "+t._s(t.$t("code_copied"))+"\n    ")]):t._e()])],1)};o._withStripped=!0;var a=n(7),r={name:"sgh-copy-clipboard",props:{code:{default:"",type:String},color:{default:"",type:String},darkMode:{type:Boolean,default:!1},category:{type:String,default:""}},data:function(){return{copied:!1}},mounted:function(){Object(a.c)("cms")},computed:{isMobile:function(){return"tablet"==this.$mq||"tabletLandscape"==this.$mq}},methods:{copyPromoCode:function(){var t=this;navigator.clipboard.writeText(this.code),this.copied=!0,setTimeout((function(){t.copied=!1}),3e3)}}},i=(n(1583),n(4)),l=Object(i.a)(r,o,[],!1,null,"d6e85cc0",null);e.default=l.exports},1110:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"frame-container flex flex-col justify-start p-0 items-start"},[n("span",{staticClass:"Shop-by-brand grow-0 text-left"},[t._v("\n    "+t._s(t.title)+"\n  ")]),t._v(" "),n("div",{directives:[{name:"lazy-load",rawName:"v-lazy-load"}],staticClass:"container-image-logo flex flex-row flex-wrap"},[t._t("logos-brand"),t._v(" "),n("a",{staticClass:"container-image",attrs:{href:t.viewAllLink,"data-element-id":t.dataElementIdViewAll,"data-description":t.dataDescriptionViewAll}},[n("span",{staticClass:"view-all-span text-left grow-0 font-medium underline"},[t._v(t._s(t.viewAll))])])],2)])};o._withStripped=!0;var a={name:"sgh-brand-wall",props:{title:{type:String,required:!0},viewAllLink:{type:String,required:!0},viewAll:{type:String,required:!0},dataElementIdViewAll:{type:String,required:!1},dataDescriptionViewAll:{type:String,required:!1}}},r=(n(1584),n(4)),i=Object(r.a)(a,o,[],!1,null,"738cfd7c",null);e.default=i.exports},1111:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"news-letter-wrapper",class:t.bgColor},[n("div",{staticClass:"news-letter-container items-center p-0 flex justify-start flex-col",class:t.textColor},[n("div",{staticClass:"news-letter items-center flex justify-start flex-col p-0 grow-0",class:t.textColor},[t._t("title"),t._v(" "),t._t("description")],2),t._v(" "),n("div",{staticClass:"subscribe-button"},[t._t("button-subscribe")],2)])])};o._withStripped=!0;var a={name:"sgh-news-letter",props:{textColor:{type:String,default:"cms-custom-text-color-white"},bgColor:{type:String,default:"cms-custom-color-mine-shaft"}}},r=(n(1585),n(4)),i=Object(r.a)(a,o,[],!1,null,"ebf492ca",null);e.default=i.exports},1112:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"fade"},on:{"after-enter":t.onAfterEnter}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.active,expression:"active"}],staticClass:"header-top-controller h-screen top-0 left-0 fixed w-full"},[n("span",{staticClass:"common__icon--close-big common__icon cursor-pointer absolute",attrs:{tabindex:"0"},on:{click:t.closeController,keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.closeController.apply(null,arguments)}}},[t._v("close icon")]),t._v(" "),n("div",{ref:"bannerContent",staticClass:"\n        header-top-controller--contents\n        max-h-screen\n        flex\n        px-16\n        justify-between\n        gap-5\n        mdr:flex-col mdr:overflow-auto mdr:px-1.6rem\n      ",attrs:{tabindex:"0"}},[t._t("default")],2),t._v(" "),n("div",{staticClass:"h-full w-full header-top-controller__background",on:{click:t.closeController}})])])};o._withStripped=!0;n(21),n(5),n(82),n(72),n(37);var a=n(164),r=n(7),i={name:"sgh-header-top-controller",data:function(){return{active:!1}},mounted:function(){var t=this;this.$root.$on("activeController",(function(){t.active=!0,t.isMobile&&(document.body.style.overflow="hidden"),t.$nextTick((function(){this.setCountDown()}))})),Object(r.c)("cms")},computed:{isMobile:function(){return"tablet"==this.$mq||"tabletLandscape"==this.$mq}},methods:{closeController:function(){this.active=!1,this.isMobile&&document.body.style.removeProperty("overflow")},setCountDown:function(){var t=this.$slots.default.filter((function(t){return!t.text})),e=this.$t("promobar_ends_in"),n=new Date;n=Date.parse(n).toString(),t.map((function(t){var o,r,i=null==t||null===(o=t.data)||void 0===o?void 0:o.attrs["data-start"];if("false"!=(null==t||null===(r=t.data)||void 0===r?void 0:r.attrs["data-countdown"])&&i<=n){var l,c,s,d,u="true"==(null==t||null===(l=t.data)||void 0===l?void 0:l.attrs["data-highlighted"])?"header-top-controller--content__countdown-highlighted":"";setInterval(function(){var n;this.children[2].elm.innerHTML="  ".concat(e,": ").concat(Object(a.a)("".concat(null==t||null===(n=t.data)||void 0===n?void 0:n.attrs["data-end"]),"days"))}.bind(t),100),null==t||null===(c=t.data)||void 0===c||c.attrs["data-countdown"],null==t||null===(s=t.children[2])||void 0===s||null===(d=s.elm)||void 0===d||d.classList.add(u)}}))},onAfterEnter:function(){this.$refs.bannerContent.focus()}}},l=(n(1586),n(4)),c=Object(l.a)(i,o,[],!1,null,"3c273b91",null);e.default=c.exports},1347:function(t,e,n){},1348:function(t,e,n){},1349:function(t,e,n){},1350:function(t,e,n){},1583:function(t,e,n){"use strict";n(1347)},1584:function(t,e,n){"use strict";n(1348)},1585:function(t,e,n){"use strict";n(1349)},1586:function(t,e,n){"use strict";n(1350)}}]);