(function() { function bxBootstrap() {
	var re = /bot|crawl|slurp|spider|mediapartners|headlesschrome|snap-prefetch|remotasks|woorank|uptime\.com|facebookexternalhit|facebookcatalog/i;
	if (re.test(navigator.userAgent) || navigator.userAgent == '') {
		return;
	}

	if (!(window.bouncex&&bouncex.website)) {
		var pushedData = [];
		if(window.bouncex && bouncex.push && bouncex.length){
			pushedData = bouncex;
		}
		window.bouncex = {};
		bouncex.pushedData = pushedData;
		bouncex.website = {"id":6663,"name":"Oliver Peoples","cookie_name":"bounceClientVisit6663","domain":"oliverpeoples.com","ct":"bind_to_domain","ally":0,"ei":0,"tcjs":"","cjs":"","force_https":false,"waypoints":false,"content_width":900,"gai":"","swids":"","sd":0,"ljq":"auto","campaign_id":0,"is_preview":false,"aco":{"first_party_limit":"3500","local_storage":"1"},"cmp":{"gdpr":0,"gmp":0,"whitelist_check":0},"burls":[],"ple":false,"fbe":true,"mas":2,"map":1,"gar":true,"ete":1,"ettm":false,"etjs":"/* ---------------------------- SHARED VARIABLES ---------------------------- */\n\nvar CLEAN_URL = bouncex.utils.url.allowParams();\n\n/* --------------------------------- HELPERS -------------------------------- */\n\nfunction getItemId(url){\n    if (!url){\n        return '';\n    }\n    \n    return bouncex.utils.url.allowParams([], url).replace(/\\/$/g, '').split('/').pop();\n}\n\n/* ------------------------------ ITEM TRACKING ----------------------------- */\n\nfunction getItem() {\n    return {\n        id: getItemId(CLEAN_URL), \n        copy: jQuery('.product_text--title > h1').text(),\n        category: window.wunderkind.product.itemCategory || 'global',\n        url: CLEAN_URL,\n        imageurl: window.wunderkind.product.imgUrl,\n        instock: true\n    };\n}\n\nfunction initializeItemEvents() {\n    var item;\n\n    bouncex.et.onTrue(\n        function () {\n            item = getItem();\n            return !!item.id &&\n                !!item.copy &&\n                !!item.category &&\n                !!item.url &&\n                !!item.imageurl;\n        },\n        function () {\n            \n            if (item.url.indexOf('gift-card') > -1) {\n                return;\n            }\n            bouncex.push(['item', item]);\n            \n            bouncex.push(['view item', {\n                'item:id': item.id\n            }]);\n\n            initializeATCClickTracking(item.id);\n            \n        },\n        10\n    );\n}\n\n/* ---------------------------- CATEGORY TRACKING --------------------------- */\n\nfunction getItemIdsCat() {\n    var ids = [];\n\n    jQuery('.product__name a').each(function (i, e) {\n        var id = getItemId(jQuery(e).attr('href'));\n\n        if (id && ids.indexOf(id) < 0) {\n            ids.push(id);\n        }\n    });\n\n    return ids.join(',');\n}\n\nfunction getCategoryObject() {\n    return {\n        'page:url': CLEAN_URL,\n        'items:ids': getItemIdsCat()\n    };\n}\n\nfunction initializeCategoryEvents() {\n    var categoryObj;\n\n    bouncex.et.onTrue(\n        function () {\n            categoryObj = getCategoryObject();\n            return !!categoryObj['items:ids'].length &&\n                !!categoryObj['page:url'];\n        },\n        function () {\n            bouncex.push(['view category', categoryObj]);\n        },\n        10\n    );\n}\n\n/* ------------------------------- CART EVENTS ------------------------------ */\n\nfunction fireAddToCart(itemId, replenItem) {\n    bouncex.push(['add to cart', { 'item:id': itemId }]);\n\n    if (bouncex.vars.cart) {\n        return;\n    }\n    bouncex.setVar('cart', true);\n}\n\nfunction initializeATCClickTracking(itemId) {\n    bouncex.et.on(bouncex.document, 'click.bxatc', function () {\n        fireAddToCart(itemId);\n    }, '#productPageAdd2Cart');\n}\n\n\nfunction emptyCart() {\n    if (bouncex.website.pts === 'cart' && bouncex.vars.cart && !bouncex.vars.cart_qty) {\n        bouncex.push(['empty_cart']);\n        bouncex.setVar('cart', false);\n    }\n}\n\nfunction initializeCartEvents() {\n    bouncex.et.cart.init({\n        replenish: function () { },\n        replenishmentType: 'single'\n    });\n\n    emptyCart();\n}\n\n/* ------------------------------ USER TRACKING ----------------------------- */\n\nfunction initializeUserTracking() {\n    if (!bouncex.vars.logged_in || !!bouncex.vars.logged_in_identified) {\n        return;\n    }\n\n    var userEmail;\n\n    bouncex.et.onTrue(\n        function () {\n            userEmail = window.personEmail;\n            return bouncex.utils.validate.email(userEmail);\n        },\n        function () {\n            bouncex.push([\n                'user',\n                {\n                    'email': userEmail,\n                    'source': 'LoggedIn'\n                }\n            ]);\n            bouncex.setVar('logged_in_identified', true);\n        },\n        5\n    );\n}\n\n/* --------------------------- INITIALIZE TRACKING -------------------------- */\n\nfunction isValidDomain() {\n    return CLEAN_URL.indexOf('www.oliverpeoples.com') > -1;\n}\n\nfunction isEn() {\n    return bouncex.html.attr('lang') === 'en-US';\n}\n\nfunction isValidForTracking() {\n    return isValidDomain() && isEn();\n}\n\nfunction init() {\n    if (!isValidForTracking()) {\n        return;\n    }\n\n    initializeUserTracking();\n    initializeCartEvents();\n\n    switch (bouncex.website.pts) {\n        case 'category':\n        case 'search':\n            initializeCategoryEvents();\n            break;\n        case 'product':\n            initializeItemEvents();\n            break;\n        default:\n            break;\n    }\n}\n\ninit();\n","dge":false,"bxidLoadFirst":false,"pie":false,"cme":false,"gbi_enabled":0,"bpush":false,"pt":{"cart":{"testmode":false,"val":[[{"activation":"js","prop":"","prop2":"","prop3":"","val":"window.location.pathname === '/AjaxOrderItemDisplayView';"}]]},"category":{"testmode":false,"val":[[{"activation":"js","prop":"","prop2":"","prop3":"","val":"document.querySelectorAll('.filter__button-text').length > 0;"}],[{"activation":"current_page_url","prop":"not_contains","prop2":"","prop3":"","val":"SearchDisplay?"}]]},"checkout":{"testmode":false,"val":[[{"activation":"js","prop":"","prop2":"","prop3":"","val":"window.location.pathname === '/OrderShippingBillingView';"}]]},"home":{"testmode":false,"val":[[{"activation":"js","prop":"","prop2":"","prop3":"","val":"window.location.pathname === '/usa';"}]]},"product":{"testmode":false,"val":[[{"activation":"js","prop":"","prop2":"","prop3":"","val":"document.querySelectorAll('.PDP_addToCartMsg').length > 0;"}]]},"search":{"testmode":false,"val":[[{"activation":"current_page_url","prop":"contains","prop2":"","prop3":"","val":"SearchDisplay?"}]]}},"els":{"blank_site_element":""},"vars":[{"name":"logged_in","polling":"all","persist":"no","page_types":[],"testmode":false,"default":"false","code":"sessionStorage && sessionStorage['logged']","trigger":""},{"name":"ever_logged_in","polling":"all","persist":"permanent","page_types":[],"testmode":false,"default":"false","code":"bouncex.vars.logged_in || null;","trigger":""},{"name":"cart_qty","polling":"all","persist":"no","page_types":[],"testmode":false,"default":"0","code":"\nNumber(jQuery('.minishopcart-quantity-number').first().text());","trigger":""},{"name":"in_stock","polling":"none","persist":"no","page_types":[],"testmode":true,"default":"false","code":"","trigger":""},{"name":"submitted_onsite","polling":"all","persist":"permanent","page_types":[],"testmode":false,"default":"false","code":"jQuery('#mce-success-response').is(':visible') || null;","trigger":""},{"name":"page_url","polling":"none","persist":"no","page_types":["category","search"],"testmode":true,"default":"false","code":"","trigger":""},{"name":"logged_in_identified","polling":"none","persist":"visit","page_types":[],"testmode":false,"default":"false","code":"null;","trigger":"pageload"},{"name":"cart","polling":"none","persist":"permanent","page_types":[],"testmode":false,"default":"false","code":"null;","trigger":"pageload"},{"name":"cookie_modal_present","polling":"all","persist":"no","page_types":[],"testmode":false,"default":"false","code":"jQuery('.privacy_prompt1').is(':visible');","trigger":"pageload"},{"name":"page_type","polling":"all","persist":"no","page_types":[],"testmode":false,"default":"false","code":"bouncex.website.pts;","trigger":"pageload"},{"name":"attentive_visible","polling":"vars","persist":"no","page_types":[],"testmode":true,"default":"false","code":"jQuery('#attentive_overlay').length > 0;","trigger":"pageload"}],"dgu":"pixel.cdnwidget.com","dgp":false,"ba":{"enabled":0,"fbte":0},"biu":"assets.bounceexchange.com","bau":"api.bounceexchange.com","beu":"events.bouncex.net","ibx":{"tjs":"","cjs":"","miw":0,"mibcx":1,"te":1,"cart_rep":{"get":"","set":""},"ulpj":null,"cus":"","miw_exclude":"","enabled":1},"etjson":null,"osre":true,"osru":"osr.bounceexchange.com/v1/osr/items","checkDfp":false,"gamNetwork":"","spa":0,"spatm":1,"preinit_cjs":"","crs":{"integrations":null,"pageCount":null},"mat":0,"math":0,"cpnu":"coupons.bounceexchange.com","dfpcms":0,"sms":{"optm":"","eventSharing":false,"shqId":"","enabled":0},"pde":false,"fme":false,"fmx":"","sdk":{"android":{"enabled":false,"enabledVersions":[],"eventModifications":null},"ios":{"enabled":false,"enabledVersions":[],"eventModifications":null}},"onsite":{"enabled":1},"ads":{"enabled":0},"pubs":{"enabled":0},"websdk":{"enabled":0},"ga4_property_id":"","ga4_measurement_id":""}
;
		bouncex.tag = 'tag3';
		bouncex.$ = window.jQuery;
		bouncex.env = 'production';
		bouncex.restrictedTlds = {"casl":{"ca":1},"gdpr":{"ad":1,"al":1,"at":1,"ax":1,"ba":1,"be":1,"bg":1,"by":1,"xn--90ais":1,"ch":1,"cy":1,"cz":1,"de":1,"dk":1,"ee":1,"es":1,"eu":1,"fi":1,"fo":1,"fr":1,"uk":1,"gb":1,"gg":1,"gi":1,"gr":1,"hr":1,"hu":1,"ie":1,"im":1,"is":1,"it":1,"je":1,"li":1,"lt":1,"lu":1,"lv":1,"mc":1,"md":1,"me":1,"mk":1,"xn--d1al":1,"mt":1,"nl":1,"no":1,"pl":1,"pt":1,"ro":1,"rs":1,"xn--90a3ac":1,"ru":1,"su":1,"xn--p1ai":1,"se":1,"si":1,"sj":1,"sk":1,"sm":1,"ua":1,"xn--j1amh":1,"va":1,"tr":1}};
		bouncex.client = {
			supportsBrotli: 1
		};
		bouncex.assets = {"ads":"d639085d70dd54880f3dfcd56d5c66b0","creativesBaseStyles":"a53944a2","inbox":"48b3046e5658d067d380731acb25edd9","onsite":"5631bf90701659009118a89f964ae570","sms":"59133b5ff2491255abf0da3a6c439b40","websdk":"98cb0e9b7177c4b73a6e8bcf83f7595b"};
		bouncex.push = function(pushData) {
			bouncex.pushedData.push(pushData);
		}

		var runtime = document.createElement('script');
		runtime.setAttribute('src', '//assets.bounceexchange.com/assets/smart-tag/versioned/runtime_8b30b4890203fd4144c54b9ffd765f5e.br.js');
		runtime.setAttribute('async', 'async');
		runtime.setAttribute('onload', 'bouncex.initializeTag()');

		bouncex.initializeTag = function() {
			var script = document.createElement('script');
			script.setAttribute('src', '//assets.bounceexchange.com/assets/smart-tag/versioned/main-v2_b669f0854e04d626374d9b5ff1506c80.br.js');
			script.setAttribute('async', 'async');
			document.body.appendChild(script);


			bouncex.initializeTag = function() {};
		};

		document.body.appendChild(runtime);

	}


}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", bxBootstrap);
} else {
	bxBootstrap();
}})();