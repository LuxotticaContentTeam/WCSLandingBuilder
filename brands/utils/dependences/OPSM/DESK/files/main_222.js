function callAnalytics(ch, subSec, pName, errType){
	if(isAnalyticsEnabled){

		var loggedInStatus = "NotLoggedIn";
		if(isGuestUser != 'true'){
			loggedInStatus = "LoggedIn";
		}
		if(typeof utag_flag !== 'undefined' && utag_flag)
		utag.view({
			country : countryCode,
            currency : currencyCode,
			pageName : "OPSM_"+countryCode+":"+ch+":"+subSec+":"+pName,
			channel : ch,
			subSection : subSec,
			errorType : errType,
			productsList : "",
			authenticated:loggedInStatus
		});
	}
}
function callAnalyticsForError(ch, subSec, pName, errType, pageEvent, shareDetail){
	if(isAnalyticsEnabled){
		var loggedInStatus = "NotLoggedIn";
		if(isGuestUser != 'true'){
			loggedInStatus = "LoggedIn";
		}
		if(typeof utag_flag !== 'undefined' && utag_flag)

		utag.view({
			country : countryCode,
            currency : currencyCode,
			pageName : "OPSM_"+countryCode+":"+ch+":"+subSec+":"+pName,
			channel : ch,
			subSection : subSec,
			errorType : errType,
			pageEvents : pageEvent,
			shareDetails : shareDetail,
			productsList : "",
			authenticated:loggedInStatus
		});
	}
}


function callAnalyticsForPDPEmail(ch,subSec,shareDetail){
	if(isAnalyticsEnabled){
		var loggedInStatus = "NotLoggedIn";
		if(isGuestUser != 'true'){
			loggedInStatus = "LoggedIn";
		}
		if(typeof utag_flag !== 'undefined' && utag_flag)

		utag.view({
			country : countryCode,
            currency : currencyCode,
			pageName : "OPSM_"+countryCode+":"+ch+":"+subSec+":"+"ProductDetailModal",
			channel : ch,
			subSection : subSec,
			shareDetails : shareDetail,
			authenticated:loggedInStatus
		});
	}
}




function callAnalyticsWithPagination(ch, subSec, pName, errType, pNo, pageEvent, shareDetail){
	if(isAnalyticsEnabled){
		var loggedInStatus = "NotLoggedIn";
		if(isGuestUser != 'true'){
			loggedInStatus = "LoggedIn";
		}
		if(typeof utag_flag !== 'undefined' && utag_flag)
		utag.view({
			country : countryCode,
            currency : currencyCode,
			pageName : "OPSM_"+countryCode+":"+ch+":"+subSec+":"+pName,
			channel : ch,
			subSection : subSec,
			errorType : errType,
			pagination : pNo,
			pageEvents : pageEvent,
			shareDetails : shareDetail,
			productsList : "",
			authenticated:loggedInStatus
		});
	}
}

function callAnalyticsForClick(trackVars, trackEvents, prodList, bookTestSrc, socialShare, printPageType, sortProductsType, faqPageName, videoTtl, selectedStore, linkType, linkText, pName){
	if(isAnalyticsEnabled){
		if(typeof utag_flag !== 'undefined' && utag_flag)
		utag.track("link", {
			linkTrackVars:trackVars,
			linkTrackEvents:trackEvents,
			productsList:prodList,
			bookTestSource:bookTestSrc,
			shareDetails:socialShare,
			printType:printPageType,
			sortType:sortProductsType,
			faqName:faqPageName,
			videoTitle:videoTtl,
			StoreDetails:selectedStore,
			link_type:linkType,
			link_text:linkText,
			linkPageName:pName
		});
	}
}

function callAnalyticsForClickFromJS(trackVars, trackEvents, prodList, bookTestSrc, socialShare, printPageType, sortProductsType, faqPageName, videoTtl, selectedStore, linkType, linkText, pName){
	if(isAnalyticsEnabled){
		if(typeof utag_flag !== 'undefined' && utag_flag)
		utag.track("link", {
			linkTrackVars:trackVars,
			linkTrackEvents:trackEvents,
			productsList:prodList,
			bookTestSource:bookTestSrc,
			shareDetails:socialShare,
			printType:printPageType,
			sortType:sortProductsType,
			faqName:faqPageName,
			videoTitle:videoTtl,
			StoreDetails:selectedStore,
			link_type:linkType,
			link_text:linkText,
			linkPageName:pName
		});
	}
}


function callAnalyticsForCartClick(trackVars, trackEvents, prodList, bookTestSrc, socialShare, printPageType, sortProductsType, faqPageName, videoTtl, selectedStore, linkType, linkText, pName, addToCartSrc, cartUId){

	if(isAnalyticsEnabled){
		if(typeof utag_flag !== 'undefined' && utag_flag)
		utag.track("link", {
			linkTrackVars:trackVars,
			linkTrackEvents:trackEvents,
			productsList:prodList,
			addCartSource:addToCartSrc,
			cartId:cartUId,
			bookTestSource:bookTestSrc,
			shareDetails:socialShare,
			printType:printPageType,
			sortType:sortProductsType,
			faqName:faqPageName,
			videoTitle:videoTtl,
			StoreDetails:selectedStore,
			link_type:linkType,
			link_text:linkText,
			linkPageName:pName
		});
	}
}

function callAnalyticsForYourCartClick(trackVars, trackEvents, prodList, bookTestSrc, socialShare, printPageType, sortProductsType, faqPageName, videoTtl, selectedStore, linkType, linkText, pName,pcode){
	if(isAnalyticsEnabled){
		if(typeof utag_flag !== 'undefined' && utag_flag)
		utag.track("link", {
			linkTrackVars:trackVars,
			linkTrackEvents:trackEvents,
			productsList:prodList,
			bookTestSource:bookTestSrc,
			shareDetails:socialShare,
			printType:printPageType,
			sortType:sortProductsType,
			faqName:faqPageName,
			videoTitle:videoTtl,
			StoreDetails:selectedStore,
			link_type:linkType,
			link_text:linkText,
			linkPageName:pName,
			promoCode:pcode
		});
	}
}

function callAnalyticsWithProdList(ch, subSec, pName, errType, pNo, pageEvent, shareDetail,prodList){
	if(isAnalyticsEnabled){
		var loggedInStatus = "NotLoggedIn";
		if(isGuestUser != 'true'){
			loggedInStatus = "LoggedIn";
		}
		if(typeof utag_flag !== 'undefined' && utag_flag)
		utag.view({
			country : countryCode,
            currency : currencyCode,
			pageName : "OPSM_"+countryCode+":"+ch+":"+subSec+":"+pName,
			channel : ch,
			subSection : subSec,
			errorType : errType,
			pagination : pNo,
			pageEvents : pageEvent,
			shareDetails : shareDetail,
			productsList : prodList,
			prodAvailError : "",
			authenticated:loggedInStatus
		});
	}
}

function callAnalyticsWithAjaxCheckout(ch, subSec, pName, errType, pNo, pageEvent,rSource,uId,aFeature,autFeature){
	if(isAnalyticsEnabled){

		var loggedInStatus = "NotLoggedIn";
		if(isGuestUser != 'true'){
			loggedInStatus = "LoggedIn";
		}
		if(typeof utag_flag !== 'undefined' && utag_flag)
		utag.view({
			country : countryCode,
            currency : currencyCode,
			pageName : pName,
			channel : ch,
			subSection : subSec,
			errorType : errType,
			pagination : pNo,
			pageEvents : pageEvent,
			productsList : "",
			authenticated:loggedInStatus,
			registerSource :rSource,
			userId :uId,
			addressFeature : aFeature,
			authorityFeature : autFeature
		});
	}
}

function callAnalyticsAjaxDetailsPaymentCheckout(ch, subSec, pName, errType, pNo, pageEvent,rSource,uId,aFeature,autFeature){
	if(isAnalyticsEnabled){

		var loggedInStatus = "NotLoggedIn";
		if(isGuestUser != 'true'){
			loggedInStatus = "LoggedIn";
		}
		if(typeof utag_flag !== 'undefined' && utag_flag)
		utag.view({
			country : countryCode,
            currency : currencyCode,
			pageName : "OPSM_"+countryCode+":"+ch+":"+subSec+":"+pName,
			channel : ch,
			subSection : subSec,
			errorType : errType,
			pagination : pNo,
			pageEvents : pageEvent,
			productsList : "",
			authenticated:loggedInStatus,
			registerSource :rSource,
			userId :uId,
			addressFeature : aFeature,
			authorityFeature : autFeature
		});
	}
}

function callAnalyticsDetailsPaymentClick(trackVars, trackEvents, prodList, linkType, linkText,ch,subSec,pName){
	if(isAnalyticsEnabled){
		if(typeof utag_flag !== 'undefined' && utag_flag)
		utag.track("link", {
			linkTrackVars:trackVars,
			linkTrackEvents:trackEvents,
			productsList:prodList,
			link_type:linkType,
			link_text:linkText,
			channel : ch,
			subSection : subSec,
			linkPageName:"OPSM_"+countryCode+":"+ch+":"+subSec+":"+pName,
			country : countryCode,
            currency : currencyCode,
		});
	}

}
function callAnalyticsAjaxSignInUser(ch, subSec, pName, pageEvent,rSource,uId){
	if(isAnalyticsEnabled){

		var loggedInStatus = "LoggedIn";

		if(typeof utag_flag !== 'undefined' && utag_flag)

		utag.view({
			country : countryCode,
            currency : currencyCode,
			pageName : "OPSM_"+countryCode+":"+ch+":"+subSec+":"+pName,
			channel : ch,
			subSection : subSec,
			pageEvents : pageEvent,
			authenticated:loggedInStatus,
			loginSource :"OPSM_"+countryCode+":"+ch+":"+subSec+":"+rSource,
			userId :uId,

		});
	}
}


//Call Analytics for BET Error scenario
function callAnalyticsForBETError(trackVars,trackEvents,linkType,linkText,errType,ch,subSec,pName){
	if(isAnalyticsEnabled){
		if(typeof utag_flag !== 'undefined' && utag_flag)
		utag.track("link", {
			linkTrackVars:trackVars,
			linkTrackEvents:trackEvents,
			link_type:linkType,
			link_text:linkText,
			errorType : errType,
			linkPageName:"OPSM_"+countryCode+":"+ch+":"+subSec+":"+pName,
		});
	}
}


function callAnalyticsForEmailPopUp(ch, subSec,pName){
	if(isAnalyticsEnabled){

		var loggedInStatus = "NotLoggedIn";
		if(isGuestUser != 'true'){
			loggedInStatus = "LoggedIn";
		}
		if(typeof utag_flag !== 'undefined' && utag_flag)
		utag.view({
			country : countryCode,
            currency : currencyCode,
			pageName : "OPSM_"+countryCode+":"+ch+":"+subSec+":"+pName,
			channel : ch,
			subSection : subSec,
			authenticated:loggedInStatus
		});
	}
}

//Call Analytics click for phone number click on BET, FAS, FIS
function callAnalyticsForClickContactNo(trackVars, trackEvents, prodList, bookTestSrc, socialShare, printPageType, sortProductsType, faqPageName, videoTtl, selectedStore, linkType, linkText, contacted_store, pName){
	if(isAnalyticsEnabled){
		if(typeof utag_flag !== 'undefined' && utag_flag)
		utag.track("link", {
			linkTrackVars:trackVars,
			linkTrackEvents:trackEvents,
			productsList:prodList,
			bookTestSource:bookTestSrc,
			shareDetails:socialShare,
			printType:printPageType,
			sortType:sortProductsType,
			faqName:faqPageName,
			videoTitle:videoTtl,
			StoreDetails:selectedStore,
			link_type:linkType,
			link_text:linkText,
			contacted_store:contacted_store,
			linkPageName:pName
		});
	}
}

function callAnalyticsForSubscriptionSaveChanges(trackVars,trackEvents,linkType,clSub,linktext,pName){
	if(isAnalyticsEnabled){
		if(typeof utag_flag !== 'undefined' && utag_flag)
		utag.track("link", {
	        linkTrackVars:trackVars,
	        linkTrackEvents:trackEvents,
	        link_type:linkType,
	        clSubscriptionChanges:clSub,
	        link_text:linktext,
	        linkPageName:"OPSM_"+countryCode+":"+"Accounts"+":"+"Your Orders"+":"+pName
		});
	}
}

function callAnalyticsForSubscriptionSavePaymentChanges(trackVars,trackEvents,linkType,clSub,linktext,pName){
	if(isAnalyticsEnabled){
		if(typeof utag_flag !== 'undefined' && utag_flag)
			utag.track("link", {
		        linkTrackVars:trackVars,
		        linkTrackEvents:trackEvents,
		        link_type:linkType,
		        savePaymentMethod:clSub,
		        link_text:linktext,
		        linkPageName:"OPSM_"+countryCode+":"+"Accounts"+":"+"Your Orders"+":"+pName
		});
	}
}

function callAnalyticsForCancelSubscriptionOnLoad(ch,subSec){
	if(isAnalyticsEnabled){
		var loggedInStatus = "NotLoggedIn";
		if(isGuestUser != 'true'){
			loggedInStatus = "LoggedIn";
		}
		if(typeof utag_flag !== 'undefined' && utag_flag)

		utag.view({
			country : countryCode,
            currency : currencyCode,
			pageName : "OPSM_"+countryCode+":"+ch+":"+subSec+":"+"CancelSubscriptionModal",
			channel : ch,
			subSection : subSec,
			authenticated:loggedInStatus
		});
	}
}

function createProductImagesSlider() {
	var manifestfURL = $("#manifestfURL").val();
	if (typeof manifestfURL !== "undefined" && manifestfURL) {
		$.ajax({
			url: manifestfURL,
			dataType: 'json',
			success: initWithImages, 
			error: tryWithExpected
		});
	} else {
	  $(".product--slider-main").each(function (i, slide) {
		    var isMobile = Utils.isMobile();
		    var isCL = $(".contact-lenses").length > 0;
		    var checkVertical = !isMobile && !isCL;
		    var checkArrows = isCL && !isMobile;
		    var havingSpriteSpin = !!$(slide).find('.product--sprite-spin').length;
		    $(slide).data('slider-length', $(slide).children().length);
		    $(slide).not('.slick-initialized').slick({
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        arrows: checkArrows,
		        adaptiveHeight: true,
		        // asNavFor: '.product--slider-nav',
		        infinite: false,
		        swipe: isMobile,
		        swipeToSlide: true,
		        vertical: checkVertical,
		        verticalSwiping: checkVertical,
		        // swipe: isMobile || !havingSpriteSpin,
		        // swipeToSlide: isMobile || !havingSpriteSpin,
		        // touchMove: isMobile || !havingSpriteSpin,
		        // touchThreshold: isMobile || !havingSpriteSpin ? 5 : 1,
		        dots: true,
		    }).on('afterChange', function (event, slick, currentSlide) {
		        console.log(slick);
		        $(event.target).data('current-slide', currentSlide);
		        // Search for playing video
		        var videos = slick.$slides.find('.video-js');
		        videos.each(function (i, vid) {
		            var videoPlayer = videojs(vid);
		            videoPlayer.pause();
		        });

		        var currSlide = $(slick.$slides[currentSlide]);
		        // if (currSlide.find('.video-js').length) {
		        //     const video = currSlide.find('.video-js')[0];
		        //     const videoPlayer = videojs(video);
		        //     videoPlayer.play();
		        // }

//		        if (currSlide.find(spriteSpinCoverClass).length) {
//		            /**
//		             * if current slide contains spritespin
//		             * the show cover up
//		             */
//		            currSlide.find(spriteSpinCoverClass).css({
//		                display: ''
//		            });
//		        }

		        /**
		         * after changing slide, revert slick options
		         */
		        slick.setOption('touchThreshold', 5);
		        slick.setOption('swipe', true);
		        slick.setOption('swipeToSlide', true);

		        $(".product--slider-nav").find(".slick-slide[data-index=" + currentSlide + "]");
		        $(".product--slider-nav").find(".slick-slide[data-slick-index=" + currentSlide + "]").addClass("selected");
		    }).on('wheel', Utils.onSliderWheel);
		    
	  });
		//tryWithExpected();
	}
}

function initWithImages(jsonData) {
	if (typeof jsonData !== "undefined") {
		const imagesData = jsonData;
		if(imagesData && typeof imagesData.items !== "undefined" && imagesData.items) {
			let images360 = imagesData.items.filter(is360);
			let imagesSliderNew = imagesData.items.filter(function(itEl){return isNewShad(itEl);});
			let imagesSlider = imagesData.items.filter(function(itEl){return !isNew(itEl) && !is360(itEl) && !isPLP(itEl);});
			structImgeData = {};
			if (imagesSliderNew.length > 0) {
				structImgeData.imagesSlider = imagesSliderNew;
				structImgeData.images360 = [];
			} else {
				structImgeData.imagesSlider = imagesSlider;
				structImgeData.images360 = images360;
			}
			initProductImagesSlider(structImgeData); 
		}
	}
}

function is360(item){
	if(typeof item !== "undefined" && item && typeof item.file_key !== "undefined" ){
		return (item.file_key && String(item.file_key).indexOf('A') === String(item.file_key).length - 1);
	}
}

function isNew(item) {
	return isNewShad(item) || isNewNoShad(item);
}

function isNewShad(item){
	if(typeof item !== "undefined" && item && typeof item.file_key !== "undefined" ){
		return (item.file_key && String(item.file_key).indexOf('STD__shad') !== -1);
	}
}

function isNewNoShad(item){
	if(typeof item !== "undefined" && item && typeof item.file_key !== "undefined" ){
		return (item.file_key && String(item.file_key).indexOf('STD__noshad') !== -1);
	}
}

function isPLP(item){
	if(typeof item !== "undefined" && item && typeof item.file_key !== "undefined" ){
		return (item.file_key && (String(item.file_key).indexOf('_001') !== -1 || String(item.file_key).indexOf('_002') !== -1));
	}
}

function tryWithExpected() {
	let data;
	if($('#image_CAT').val() && ['OPT'].indexOf($('#image_CAT').val()) >= 0 ){
		data = '{ "items": [ { "type": "Degree", "file_key": "shad_fr" }, { "type": "Degree", "file_key": "000A" }, { "type": "Degree", "file_key": "shad_qt" }, { "type": "Degree", "file_key": "030A" }, { "type": "Degree", "file_key": "060A" }, { "type": "Degree", "file_key": "090A" }, { "type": "Degree", "file_key": "120A" }, { "type": "Degree", "file_key": "150A" }, { "type": "Degree", "file_key": "180A" }, { "type": "Degree", "file_key": "210A" }, { "type": "Degree", "file_key": "240A" }, { "type": "Degree", "file_key": "270A" }, { "type": "Degree", "file_key": "300A" }, { "type": "Degree", "file_key": "330A" } ] }';
	} else {
		data = '{ "items": [ { "type": "Degree", "file_key": "shad_qt" }]}';
	}
	initWithImages(JSON.parse(data));
}

function initProductImagesSlider(jsonData, str) { 
	const partnumber = $('#image_partn').val() || $('[data-analytics-sku]').data('analytics-sku');
	let current360 = [];
	if (typeof jsonData["images360"] !== "undefined" && jsonData["images360"] !== null) {
//		getImagesSet();
		current360 = jsonData["images360"];
	} 
	if (typeof jsonData["imagesSlider"] !== "undefined" && jsonData["imagesSlider"] !== null) {
		//parse the imageset and get three images
		var leftImage = $("#quarterImage").val(),
			rightImage,
			frontImage = $("#frontImage").val();
	//	var images = jsonData["IMAGE_SET"]; //slider
//		var imageList = images.split(",");
		var images = jsonData["imagesSlider"]; //slider
		var imageList = [];
	
		var imgPDP_sfx= $("#image_PDP").val() || '?impolicy=OP_PDP';
		var imgPDP_thumb_sfx= $("#image_PDP_thumb").val() || '?impolicy=OP_PDP_thumb';
		var akimUrl  =  $("#akimUrl").val();
		var akimZoomRatio = $("#akimZoomRatio").val();
		var akimImgExt  =  $("#image_ext").val() || '.png';
		var spinner = "";
		if (typeof current360 !== "undefined" && current360 !== null && current360.length) {
			for (var index = 0; index < current360.length; index++) {
				var item = current360[index];
				spinner += ","+ akimUrl + partnumber + "_" + item.file_key + akimImgExt +  imgPDP_sfx;
			}
			spinner = spinner.substring(1); // remove first comma
			$("#spinnerImages").val(spinner);
			$("#spritespin-product-mb").val(spinner);
		} else if (typeof current360 !== "undefined" && current360 !== null && current360.length === 0) {
			spinner = "";
		} else {
			spinner = $("#spinnerImages").val();
		}
	
		var count = 0;
	
		var hasVideo = 0;
		// var containsFront = false, containsQuarter = false;
		var isEmpty = false;
		if (images.length > 0 && images[0] === "") {
			imageList.pop(); isEmpty = true;
		}
		for(i=0; i < images.length; i ++) {
//			var image = imageList[i].substring(imageList[i].indexOf(';')).replace(";OPSM/","");
			var image =  partnumber + "_" + images[i].file_key + akimImgExt;
			if(image.indexOf("_qt") != -1) {
				containsQuarter = true;
			}
			if(image.indexOf("_fr") != -1) {
				containsFront = true;
			}
			imageList.push(image);
		}
		// if (! containsQuarter && isEmpty && typeof leftImage !== "undefined") {
		if (isEmpty && typeof leftImage !== "undefined") {
			imageList.push(leftImage);
		}
		// if (! containsFront && isEmpty && typeof frontImage !== "undefined") {
	//	if (isEmpty && typeof frontImage !== "undefined") {
	//			imageList.push(frontImage);
	//	}
		if (isNew({"file_key":imageList[0]})) {
			let config = $("#newImagesList").val();
			if (typeof config !== "string" || config.length === 0) {
				config = "shad__qt,shad__fr,shad__lt,shad__cfr,shad__bk,shad__al*,shad__fld,shad__fldg";
			}
			const configArray = config.split(",");
			const tempImageList = [];
			for (let i=0; i < configArray.length; i ++) {
				if (configArray[i].indexOf("*") !== -1) {
					// expected string like "base*|startingIndex|finalIndex"
					const imageAlternateArray = configArray[i].split("|");
					if (imageAlternateArray.length === 3) {
						const imageAlternateBase = imageAlternateArray[0];
						const imageAlternateStartingIndex = parseInt(imageAlternateArray[1]);
						const imageAlternateFinalIndex = parseInt(imageAlternateArray[2]);
						if (!isNaN(imageAlternateStartingIndex) && !isNaN(imageAlternateFinalIndex)) {
							for (let j = imageAlternateStartingIndex; j < imageAlternateFinalIndex; j++) {
								for (let k = 0; k < imageList.length; k++) {
									if (imageList[k].indexOf(imageAlternateBase.replace("*", j)) !== -1) {
										tempImageList.push(imageList[k]);
									}
								}
							}
						}
					}
				} else {
					for (let k=0; k < imageList.length; k++) {
						if (imageList[k].indexOf(configArray[i]) !== -1) {
							tempImageList.push(imageList[k]);
						}
					}
				}
			}
			imageList = tempImageList;
		} else {
			imageList.sort(function (a, b) {
				if (String(a).indexOf('shad_qt') != 1) return -1;
				if (String(b).indexOf('shad_qt') != 1) return 1;
				return 0;
			});
		}
		

		let videoName = '';
		switch(partnumber){
			case '8056597557184':
			case '8056597557115':
				videoName = 'https://media.opsm.com/STELLA/PDP/OPSM_PDP_Wayfarer_Transitions_D.mp4';							
				 break;
			case '8056597557153':
				videoName = 'https://media.opsm.com/STELLA/PDP/OPSM_PDP_Round_Transitions_D.mp4';
				break;
			case '8056597557207':
				videoName = 'https://media.opsm.com/STELLA/PDP/OPSM_PDP_Meteor_Transitions_D.mp4';
				break;
		}
		
		for(var i=0; i < imageList.length; i ++) {
//			var image = imageList[i].substring(imageList[i].indexOf(';')).replace(";OPSM/","");
			var image =  imageList[i];
			var imageAlt = $("#altImgPattern").val();
			if(image.indexOf("_qt") != -1) {
				leftImage = image;
				imageAlt += " quarter"
			}else if(image.indexOf("_al") != -1) {
				rightImage = image;
				imageAlt += " back"
			} else if(image.indexOf("_fr") != -1) {
				frontImage = image;
				imageAlt += " front";
			}
			
			if(i === 0 && videoName != ''){
				hasVideo = 1;
				$("#slide-main").append('<div class="text-center"><video style="width:74%;" class="" playsinline="" loop="" muted="" autoplay=""><source type="video/mp4" src="'+ videoName + '"></video></div>');
				$("[data-main-slide='#slide-main']")
					.append('<div><div class="thumb" data-index="' + (i) + '"><img class="img-fluid" src="'+ akimUrl + image + imgPDP_thumb_sfx + '" alt="' + imageAlt + '"/></div></div>');
				//slide-zoom
				$("#slide-zoom").append('<div class="text-center"><video style="width:74%;" class="" playsinline="" loop="" muted="" autoplay=""><source type="video/mp4" src="'+ videoName + '"></video></div>');
				$("[data-main-slide='#slide-main']")
					.append('<div><div class="thumb" data-index="' + (i) + '"><img class="img-fluid" src="'+ akimUrl + image + '?impolicy=OP_Large" alt="' + imageAlt + '"/></div></div>');
			
			}
			//Hide the slider if the PDP has just one image
			if(imageList.length == 1 && hasVideo == 0){
				$('.product-picture .options .views ul').hide();
				$('.product-picture .options .views h4').hide();
			}
			count++;
			
			var onloadfirst = "";
			if(i === 0) {
				onloadfirst = "'$(this).closest(\".slick-initialized\").slick(\"reinit\")'";
				$("#slide-main")
					.append('<div><img onload=' + onloadfirst + ' class="img-fluid" src="'+ akimUrl + image + imgPDP_sfx + '" alt="' + imageAlt + '"/></div>');
			} else {
				$("#slide-main")
				.append('<div><img class="img-fluid" src="'+ akimUrl + image + imgPDP_sfx + '" alt="' + imageAlt + '"/></div>');
			}
			$("[data-main-slide='#slide-main']")
				.append('<div><div class="thumb" data-index="' + (i + hasVideo) + '"><img class="img-fluid" src="'+ akimUrl + image + imgPDP_thumb_sfx + '" alt="' + imageAlt + '"/></div></div>');
			//slide-zoom
			$("#slide-zoom")
				.append('<div><img class="img-fluid" src="'+ akimUrl + image + '?impolicy=OP_Large" alt="' + imageAlt + '"/></div>');
			$("[data-main-slide='#slide-main']")
				.append('<div><div class="thumb" data-index="' + (i + hasVideo) + '"><img class="img-fluid" src="'+ akimUrl + image + '?impolicy=OP_Large" alt="' + imageAlt + '"/></div></div>');
			if (false && i === 0 && ($("#manufacturerName").val() === 'RAY-BAN' || $("#manufacturerName").val() === 'RAY-BAN JUNIOR')) {
				hasVideo = 1;
				$("#slide-main")
					.append('<div><div class="opsm-video"><div class="embed-responsive embed-responsive-16by9"><video class="embed-responsive-item video-js vjs-default-skin" id="carousel-yt-1" controls="" data-setup="{ &quot;techOrder&quot;: [&quot;youtube&quot;], &quot;sources&quot;: [{ &quot;type&quot;: &quot;video/youtube&quot;, &quot;src&quot;: &quot;https://www.youtube.com/watch?v=jObU-T6ewHg&quot;}], &quot;poster&quot;: &quot;' + $("#raybanVideoDisplayImage").val() + '&quot; }"></video></div></div></div>');
				$("[data-main-slide='#slide-main']")
					.append('<div><div class="thumb thumb-video" data-index="' + (i + hasVideo) + '"><img class="img-fluid" src="' + $("img.product--pdp-top-band-img").attr("src") + '" alt="Rayban Video"/></div></div>');
				//slide-zoom
				$("#slide-zoom")
					.append('<div><div class="opsm-video"><div class="embed-responsive embed-responsive-16by9"><video class="embed-responsive-item video-js vjs-default-skin" id="carousel-yt-1" controls="" data-setup="{ &quot;techOrder&quot;: [&quot;youtube&quot;], &quot;sources&quot;: [{ &quot;type&quot;: &quot;video/youtube&quot;, &quot;src&quot;: &quot;https://www.youtube.com/watch?v=jObU-T6ewHg&quot;}], &quot;poster&quot;: &quot;' + $("#raybanVideoDisplayImage").val() + '&quot; }"></video></div></div></div>');
				$("[data-main-slide='#slide-main']")
					.append('<div><div class="thumb thumb-video" data-index="' + (i + hasVideo) + '"><img class="img-fluid" src="' + $("img.product--pdp-top-band-img").attr("src") + '" alt="Rayban Video"/></div></div>');
			}
		}
//		if (spinner && spinner.length > 0) {
//			// remove 360 slide
//			var template360 =
//				'<div class="image360">' +
//					'<div class="d-md-none ">' +
//						'<div class="product--slider-main-cover product--slider-main-cover--mb">' +
//							'<img src="' + $("#imagesDir").val() + '/icons/mobile-rotate.svg" alt="TURN YOUR PHONE FOR 360° VIEW"/>' +
//								'<strong class="text-uppercase">TURN YOUR PHONE FOR 360° VIEW</strong></div>' +
//						'<img class="img-fluid" src="' + akimUrl + frontImage + imgPDP_sfx + '" alt="Rotate to view 360 image"/></div>' +
//						'<div class="d-none d-md-block">' +
//						'<div class="product--slider-main-cover product--slider-main-cover--dt">' +
//							'<img src="' + $("#imagesDir").val() + '/icons/drag.svg" alt="Drag To view 360 image"/>' +
//							'<strong class="text-uppercase">Drag To View</strong></div>' +
//						'<div class="product--sprite-spin" id="spritespin-product" data-images="' + spinner + '" data-width="781" data-height="322" data-open-lightbox></div>' +
//					'</div>' +
//				'</div>';
//			var templateThumb360 =
//				'<div class="image360">' +
//					'<div class="thumb" data-index="' + (count + hasVideo) + '"><img class="img-fluid" src="' + akimUrl + frontImage + imgPDP_thumb_sfx + '" alt="View 360 image"/>' +
//						'<div class="img-360">' +
//							'<img src="' + $("#imagesDir").val() + '/icons/360.svg"/>' +
//						'</div>' +
//					'</div>' +
//				'</div>';
//	
//			$("#slide-main").append(template360);
//			$("[data-main-slide='#slide-main']").append(templateThumb360);
//		}

		// Moved here from opsm-theplayhouse
		var productSliderMainClass = ".product--slider-main";
		var spriteSpinCoverClass = ".product--slider-main-cover";
		var sliderDesktopCoverClass = ".product--slider-main-cover--dt";
		
		$(productSliderMainClass).each(function (i, slide) {
	        var isMobile = Utils.isMobile();
	        var havingSpriteSpin = !!$(slide).find('.product--sprite-spin').length;
					var isCL = $(".contact-lenses").length > 0;
					var checkVertical = !isMobile && !isCL;
					var checkArrows = isCL && !isMobile;
					$(slide).data('slider-length', $(slide).children().length);
			
	        $(slide).not('.slick-initialized').slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: checkArrows,
						adaptiveHeight: true,
						// asNavFor: '.product--slider-nav',
						infinite: false,
						swipe: isMobile,
						swipeToSlide: true,
						vertical: checkVertical,
						verticalSwiping: checkVertical,
						// swipe: isMobile || !havingSpriteSpin,
						// swipeToSlide: isMobile || !havingSpriteSpin,
						// touchMove: isMobile || !havingSpriteSpin,
						// touchThreshold: isMobile || !havingSpriteSpin ? 5 : 1,
						dots: true,
				}).on('afterChange', function (event, slick, currentSlide) {
						console.log(slick);
						$(event.target).data('current-slide', currentSlide);
						// Search for playing video
						var videos = slick.$slides.find('.video-js');
						videos.each(function (i, vid) {
								var videoPlayer = videojs(vid);
								videoPlayer.pause();
						});
		
						var currSlide = $(slick.$slides[currentSlide]);
						// if (currSlide.find('.video-js').length) {
						//     const video = currSlide.find('.video-js')[0];
						//     const videoPlayer = videojs(video);
						//     videoPlayer.play();
						// }
		
						if (currSlide.find(spriteSpinCoverClass).length) {
								/**
								 * if current slide contains spritespin
								 * the show cover up
								 */
								currSlide.find(spriteSpinCoverClass).css({
										display: ''
								});
						}
		
						/**
						 * after changing slide, revert slick options
						 */
						slick.setOption('touchThreshold', 5);
						slick.setOption('swipe', true);
						slick.setOption('swipeToSlide', true);
		
						$(".product--slider-nav").find(".slick-slide[data-index=" + currentSlide + "]");
						$(".product--slider-nav").find(".slick-slide[data-slick-index=" + currentSlide + "]").addClass("selected");
				}).on('wheel', Utils.onSliderWheel);
	        var defaultSpriteSpinOptions = {
	                responsive: true,
	                animate: false,
	                frameTime: 80,
	                sense: 1,
	                senseLane: 1
	            };
	            var spritespin = $('#spritespin-product');
	            if (spritespin.length) {
	                spritespin
	                    .css({
	                        'padding-top': (spritespin.data('height') / spritespin.data('width') * 100) + '%'
	                    })
	                    .spritespin(Object.assign({
	                        source: spritespin.data('images').split(',')
	                    }, defaultSpriteSpinOptions));
	            }
	
	    });
		
	    /**
	     * product thumbnail slider
	     */
		$('.product--slider-nav').on('init', function(event, slick) {
	        slick.$slides.filter('[data-slick-index="0"]').addClass('selected');
	    });
	
		$('.product--slider-nav').not('.slick-initialized').slick({
	        slidesToShow: 3,
	        slidesToScroll: 1,
	        // asNavFor: '.product--slider-main',
	        focusOnSelect: false,
	        infinite: true
	    });
	
		$('.product--slider-nav').on('click', '.thumb', function () {
	        const index = $(this).data('index');
	        const slideId = $(this).closest('[data-main-slide]').data('main-slide');
	        const slide = $(slideId);
	        slide.slick('slickGoTo', index);
	        $(this).closest('.slick-slide')
	            .addClass('selected')
	            .siblings()
	            .removeClass('selected');
	    });

	    /**
	     * On uncovering the sprite spin,
	     * disable slide swipe ability
	     */
	    $('.product--slider-main-cover--dt').on('click', function(e) {
	        const cover = $(e.target).closest(sliderDesktopCoverClass);
	        cover.fadeOut();
	        const activeSlide = cover.closest(productSliderMainClass);
	
	        activeSlide.slick('slickSetOption', 'touchThreshold', 1);
	        activeSlide.slick('slickSetOption', 'swipe', false);
	        activeSlide.slick('slickSetOption', 'swipeToSlide', false);
	    });
	}
}

if(typeof AjaxOverlay == 'undefined')
{
	var AjaxOverlayClass = function(overlayId, overlayHtml)
	{
		var _status = false;
		var _triggerCount = 0;

		var _overlayId = overlayId;
		if (!_overlayId)
			_overlayId = 'global-ajax-loading';
		var _overlayHtml = overlayHtml;
		if (!_overlayHtml)
			_overlayHtml = '<div class="globaloverlay d-none" id="' + _overlayId + '"><div class="loading-container"><div class="loading loading--lg"></div></div>';

		var _overlaySelector = '#'+_overlayId;
		var _ensureOverlay = function()
		{
			if($(_overlaySelector).length === 0)
				$('body').append(_overlayHtml);
		}

		var _triggerOverlay = function(action){

			if(action === 'show'){

				if (_triggerCount < 0)
					_triggerCount = 0;

				if (_triggerCount === 0)
				{
					_ensureOverlay();
					$(_overlaySelector).removeClass('d-none');

					_status = true;
				}
				_triggerCount++;

			} else if (action === 'hide'){

				if (_triggerCount > 0)
					_triggerCount--;

				if (_triggerCount === 0)
				{
					_ensureOverlay();
					$(_overlaySelector).addClass('d-none');

					_status = false;
				}

			}
			return this.status;
		}

		this.show = function()
		{
			return _triggerOverlay('show');
		}

		this.hide = function()
		{
			return _triggerOverlay('hide');
		}

		this.getTriggerCount = function()
		{
			return _triggerCount;
		}

		this.getStatus = function()
		{
			return _status;
		}

		this.triggerOverlay = _triggerOverlay;
	}

	window.AjaxOverlay = new AjaxOverlayClass();
}

$.fn.extend( {
    limiter: function(limit, elem,elem_type) {
		$(this).on("keyup focus", function() {
			setCount($(this), elem,elem_type);
		});

		function setCount(src, elem,et) {
			var chars = 0;
			if(typeof(src) != "undefined"){
				if (typeof(src.value) != "undefined") {
					chars = src.value.length;
				} else {
					chars = src.html().length;
				}
				if(et=='textarea'){
					chars = src[0].value.length;
				}

				if (chars > limit) {
					src.value = src.value.substr(0, limit);
					chars = limit;
				}
				elem.html( limit - chars );
			}
		}
		setCount($(this)[0], elem);
    }
});

//----------------------------------------------------------
// Method to remove favorite in case of error - OPS-10
//----------------------------------------------------------
function hideFavouritesButton()  {
	var theButton = $(".pdp .product-main .actions a.favourites");
	var theReplacement = theButton.siblings(".favourites-added");
	theReplacement.hide();
	theButton.show();
};

//------------------------------------------------------
// Add to favourites button modal overlay --------------
//------------------------------------------------------

	//"button.make-favourite, a.add-to-favourites, .pdp .product-main .actions .favourites"
$(document).ready(function() {
	$("button.product--favourite").on('click' , function (e) {
		var $this = $(this);
		var catentryId = $(this).attr("rel");
		var favElement=this;
		e.preventDefault();
		e.stopPropagation();
		
		if (OPSMHeader.isPendingFavReq() === "true") {
			return;
		} else {
			OPSMHeader.setPendingFavReq(true);
		}
		var addedProducts = OPSMHeader.getFavList();
		var prodList = "";
//			if(isAnalyticsEnabled){
//				var prodList = $('#productsList_'+catentryId).attr("rel");
//			}
		var basePath = window.location.origin;
		if (!$(this).hasClass('active')){
//			showFavSignInCallOut(this);
			if(addedProducts.indexOf(catentryId) === -1){
				$.ajax({
					dataType:'json',
					url: basePath + "/FavouritesAddCmd?quantity=1&catEntryId="+catentryId+"&storeId="+$('#storeId').val(),
					success:function(result){
						utagFiller.asyncAddToFavorites(favElement);

						OPSMHeader.setPendingFavReq(false);
						if(result != null && result.itemAddStatus != undefined && result.itemAddStatus == 'limitExceeded'){
							$(favElement).removeClass("unmake-favourite");
							hideFavouritesButton();
							
						}else{
							if (result.catEntryId[0] === $this.attr("rel")) {
								$this.attr("rel", result.itemAdded);
							}
							
							$(e.target).closest('.product--favourite').addClass('product--favourite--yes')
								.find('.icon').addClass('icon-heart');
							$(e.target).closest('.product--favourite').find('.icon').removeClass('icon-heart-outline');

//							callAnalyticsForClick('prop2,events,products', 'event19', prodList, '', '', '', '', '', '', '', 'o', 'AddToFav', nameOfPage);


//							if($('#addtofav_'+catentryId).length > 0){
//								$('#addtofav_'+catentryId+', #quick-view-modal #addtofav_'+catentryId).addClass('active');
//								$('.add-to-favorite-cart .heart-grey-small').addClass('hide');
//								$('.add-to-favorite-cart .heart-icon').removeClass('hide');
//								$('.add-to-favourites.active .heart-icon + span').html(yourFavourites_u);
//								$('#T11-main-wrap .add-to-favourites.active .heart-icon + span').html(addedToFavourites);
//								//$('.pdp .product-main ul li a.add-to-favorite-cart').html(addedToFavourites);
//								$('#quick-view-modal .add-to-favourites.active .heart-icon + span').html(addedToFavourites);
//								var btn = $('.add-to-favorite-cart');
//								btn.addClass('added-to-favorite-cart');
//								$('.added-to-favorite-cart').removeClass('add-to-favourites');
//								btn.removeClass('favourites');
//								btn.addClass('added-favourites');
//							}

//							//Add if its a quick look
//							if($('#addtofavquick_'+catentryId).length > 0){
//								$('#addtofavquick_'+catentryId).addClass('active');
//								$('.add-to-favourites.active .heart-icon + span').html(yourFavourites_u);
//							}
//							$('.add-to-favourites.active .heart-icon + span').html(yourFavourites_u);


							//Show the call out overlay

							OPSMHeader.updateFavBadge(1, result.itemAdded);

							$(this).addClass('active');
						}

					},
					error: function (xhr, ajaxOptions, thrownError) {
						OPSMHeader.setPendingFavReq(false);
						$(".prd-container").html(addToFavouritesErrorMsg);

						utagFiller.asyncSendError(thrownError);
					}
				});
			} else {
				$.ajax({
					dataType:'json',
					url: basePath + "/FavouritesDeleteCmd?quantity=1&catEntryId="+catentryId+"&storeId="+$('#storeId').val(),
					success:function(result){
						OPSMHeader.setPendingFavReq(false);
						if(result != null && result.itemDeleteStatus != undefined) {
							$(e.target).closest('.product--favourite').find('.icon').addClass('icon-heart-outline');
							$(e.target).closest('.product--favourite').removeClass('product--favourite--yes')
								.find('.icon').removeClass('icon-heart');

							OPSMHeader.updateFavBadge(-1, catentryId);

							$(this).addClass('active');
							
						}
					},
					error: function (xhr, ajaxOptions, thrownError) {
						OPSMHeader.setPendingFavReq(false);
						$(".prd-container").html(addToFavouritesErrorMsg);
					}
				});
			}
		}
	});

	$('.header--cms-badge').on("change", function() {
		if ($(this).text().trim() === "0") {
			$(this).addClass("d-none");
		} else {
			$(this).removeClass("d-none");
		}
	});

	updateMiniCartOnPageLoad = function(opencart){
		var param = "storeId="+$('#storeId').val()+"&catalogId="+$('#catalogId').val()+"&langId="+$('#langId').val();

		$.ajax({
			type: "POST",
			url: window.location.origin + "/MiniShopCartDisplayView",
			data: param,
			cache:false,
			async:false,
			dataType: 'html',
			success: function(data){
				// data is html
				if ($(data).filter("#modal-cart").length !== 1) {
					// something went wrong with minicart.. block before it breaks everything
					return;
				}
				$("#modal-cart").modal("hide");
				$("#modal-cart-container").html(data);
				var cartcount = $("#order-items-quantity").val();
				Utils.updateCartBadge(cartcount);
				if (typeof opencart !== "undefined" && opencart === true) {
					//utagFiller.asyncOpenMiniCart();
					$("#modal-cart").modal('show');
				}
//				$('.js-remove-item-minicart').on('click',function(e){
//					clearTimeout(window.timeoutMiniCart);
//					e.preventDefault();
//					var item_id = $(this).attr("rel");
//					/*Hiding the product add message*/
//					$('#emptyShopCartDisplayCart').css('display','none');
//
//					var params = {};
//
//					params["storeId"] = $('#storeId').val();
//					params["catalogId"] = $('#catalogId').val();
//					params["langId"] = $('#langId').val();
//					params["orderId"] = ".";
//					params["calculationUsage"] = "-1,-2,-3,-4,-5,-6,-7";
//					params["orderItemId"] = item_id;
//					params["URL"] = 'ShopCartDisplayView';
//					params["fromOperation"] = 'Delete';
//					$.ajax({
//		    			type:"POST",
//		    			async:true,
//		    			url:"ShopCartCmd",
//		    			data: params,
//		    			success:function(responseData){
//		    				updateMiniCartOnPageLoad(true);
//		    			}
//					});
//				});
		  	},
		  	error: function (xhr, ajaxOptions, thrownError) {
		  		//console.log("Error");
		  	    Genericcallbackerror();
		  	}
		});
	}

	//controls menu icon quantity cart
	if ($("#modal-cart-container").length) {
		updateMiniCartOnPageLoad();
	} else if ($("#cartCount").length > 0 && $("#cartCount").val() !== '0') {
		$("#btn-cart .badge").text($("#cartCount").val());
	}

	//Hide promo-banner mobile when user focuses on inputs
	if($(window).width() < 768) {
		$('input[type="text"],input[type="email"],input[type="number"],input[type="password"],input[type="tel"]').on('focus', function() {
	    $("#sale-off-banner").hide();
	    $('.header').addClass('header--no-notibar');
		});
		$('input[type="text"],input[type="email"],input[type="number"],input[type="password"],input[type="tel"]').on('focusout', function() {
	    $("#sale-off-banner").show();
	    $('.header').removeClass('header--no-notibar');
		});
 	}
});


function Genericcallbackerror(error_msg,action){
	if(action){
		if($('#generic_mask').length == 0)
			$('body').append('<div id="generic_mask"> </div>');
		if($('#overlay_panel_services').length==0)
			$('body').append('<div id="overlay_panel_services" class="overlay-panel hide"></div>');

		var error_html = '<div class="maskclose"><div class="modal-container modal-width-465"><a href="#" class="close"><span class="btn-text">Close</span><span class="closethick-icon"></span></a><h2 class="topmargin-zero"><strong>ERROR</strong></h2><div class="content"><p>Sorry an error has occured. Your request cannot be processed.<br>Please try again later.</p></div></div></div>'
		$("#overlay_panel_services").removeClass("hide");
		$("#overlay_panel_services").addClass("show");
		greyoutHeight = $(document).height();
	    $('#generic_mask').css('height',greyoutHeight+70+'px').show();
	    $("#overlay_panel_services").html(error_html);
	}
 }

/**
 * Rule used to validate email on server-side (with current logic)
 * See https://github.com/jquery-validation/jquery-validation/blob/master/src/core.js
 * (this is a copy of rule 'remote' with custom Ajax call delegated to opsm.checkout.emailIdVerification(email) function)
 */
$.validator.addMethod( "remoteEmail", function( value, element, param, method ) {
	if ( this.optional( element ) ) {
		return "dependency-mismatch";
	}

	method = typeof method === "string" && method || "remoteEmail";

	var previous = this.previousValue( element, method ),
		validator, data, optionDataString;

	if ( !this.settings.messages[ element.name ] ) {
		this.settings.messages[ element.name ] = {};
	}
	previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
	this.settings.messages[ element.name ][ method ] = previous.message;

	param = typeof param === "string" && { url: param } || param;
	optionDataString = $.param( $.extend( { data: value }, param.data ) );
	if ( previous.old === optionDataString ) {
		return previous.valid;
	}

	previous.old = optionDataString;
	validator = this;
	this.startRequest( element );
	data = {};
	data[ element.name ] = value;

	var promise = opsm.checkout.emailIdVerification(value);
	promise.done(function(response) { // Emailid verification success
		var valid = true;
		if(response !== null){
			if(response.errorMessageKey != "" && response.errorMessageKey == "_ERR_RESTRICTED_EMAIL_DOMAINS" ){
				valid = false;
			} else {
				userIdExists = response.userExists;
				if(userIdExists == true && isGuestUser){ //Emailid present & user logged in as guest
					valid = false;
				}
			}
		}

		var errors, message, submitted;

		validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
		if ( valid ) {
			submitted = validator.formSubmitted;
			validator.resetInternals();
			validator.toHide = validator.errorsFor( element );
			validator.formSubmitted = submitted;
			validator.successList.push( element );
			validator.invalid[ element.name ] = false;
			validator.showErrors();
		} else {
			errors = {};
			message = response || validator.defaultMessage( element, { method: method, parameters: value } );
			errors[ element.name ] = previous.message = message;
			validator.invalid[ element.name ] = true;
			validator.showErrors( errors );
		}
		previous.valid = valid;
		validator.stopRequest( element, valid );

    });
	return 'pending';
}, "Email already in use. Please choose another email." );

var EmailRemoteStatus = function () {
  function EmailRemoteStatus(valid, error) {
    _classCallCheck(this, EmailRemoteStatus);

    var _this = this;
    _this.valid = valid?valid:false;
    _this.error = error?error:null;
  }

  _createClass(EmailRemoteStatus, []);

  return EmailRemoteStatus;
}();

var EmailRemoteValidator = function () {
  function EmailRemoteValidator() {
    _classCallCheck(this, EmailRemoteValidator);

    var _this = this;
    _this.checkedEmails = {};
  }

  _createClass(EmailRemoteValidator, [{
    key: 'addCheckedEmail',
    value: function addCheckedEmail(email, valid) {
      var _this2 = this;
      _this2.checkedEmails[email] = valid;
    }
  }, {
    key: 'checkEmail',
    value: function checkEmail(email) {
      var _this2 = this;
      return (typeof _this2.checkedEmails[email] === 'undefined' || _this2.checkedEmails[email].valid)?true:false;  //if email does not appear (it will be checked in the future) OR it is marked as valid, return true; otherwise return false
    }
  }, {
	    key: 'getEmailStatus',
	    value: function getEmailStatus(email) {
	      var _this2 = this;
	      var _emailStatus = _this2.checkedEmails[email];
	      return _emailStatus?_emailStatus:new EmailRemoteStatus(false, null);   //always returns an EmailRemoteStatus object
	    }
	  }, {
    key: 'removeCheckedEmail',
    value: function removeCheckedEmail(email) {
      var _this2 = this;
     delete _this2.checkedEmails[email]
    }
  }]);

  return EmailRemoteValidator;
}();

window.opsm = window.opsm || {};
window.opsm.emailRemoteValidator = window.opsm.emailRemoteValidator || new EmailRemoteValidator();
/**
 * Rule used to validate email reading status from a shared map (populated when someone else calls opsm.checkout.emailIdVerification(email))
 * See https://github.com/jquery-validation/jquery-validation/blob/master/src/core.js
 * (this is a copy of rule 'remote' which delegates validation to the object window.opsm.emailRemoteValidator)
 */
$.validator.addMethod( "remoteEmail2", function( value, element, param, method ) {

	return window.opsm.emailRemoteValidator.checkEmail(value);

}, "Email already in use. Please choose another email." );

$.validator.addMethod( "customCreditCard", (function(customCreditCardResult) {
        return function( value, element, param, method ) {
        	//leave this here, to be used also for debugging
	        function callback(e) {
	        	customCreditCardResult.valid = opsm.utils.ccf_validation(e);
	        }

	        if ($('input#tmp-cc-number').length <= 0)
	        {
	            $('body').append('<input id="tmp-cc-number" type="hidden" />');
	            $('input#tmp-cc-number').validateCreditCard(callback, {
	                  accept: ["visa", "amex", "mastercard"]
	            });
	        }

	        $('input#tmp-cc-number').val(value).trigger('input');   //callback will be called 'sync'

	        return customCreditCardResult.valid;
	        //var e = {"card_type":{"name":"visa","pattern":{},"valid_length":[16]},"luhn_valid":true,"length_valid":true}; callback(e); return true;
        }
}({valid: false})), "Invalid credit card number. Please insert a valid one" );

$.validator.addMethod( "suburb_state_postcode", function( value, element, param, method ) {

	var valid = 'true' === $(element).data('selected');
	valid = valid && 
		opsm.utils.getContent(
				$(element).siblings("[id^='hiddenStatePostcode']")
				.find("[class^='administrative_area_level_1-']")) != ''
		&& opsm.utils.getContent(
				$(element).siblings("[id^='hiddenStatePostcode']")
				.find("[class^='postal_code-']")) != '';
	return valid;

}, "Invalid Suburb/State/Postcode. Please choose a value from the list." );

$(document).ready(function() {
	if($("#share-your-favourites-form").length > 0){
		jQuery.validator.addMethod("notEqual", function(value, element, param) {
			  return this.optional(element) || value != param;
			}, "Please specify a different (non-default) value");

		var favourite_validator = $("#share-your-favourites-form").validate({
			messages : {
				"emailAddress" : {required: $("#friend-email").data("errors").required},
				"message" : {required: $("#friend-mail-message").data("errors").required},
				"yourName" : $("#mail-name").data("errors").required,
				"yourEmailAddress" : {required:$("#mail-email").data("errors").required}
			},
			rules : {
				"yourName": { notEqual: $("#mail-name").attr('placeholder') }
			},
			onfocusout : function(element) {
				$(element).valid();
			},
			onkeyup : false,
			errorClass : "input-error",
			errorPlacement: function(error, element) {
				error.appendTo(element.closest(".input-group"));
			},
			invalidHandler: function(event, validator) {
				if(validator.errorList.length > 0){
					validator.errorList[0].element.select();
					validator.errorList[0].element.focus();
				}
			},
			highlight : function(element) {
				if ($(element).parents(".input-date").length) {
					$(element).parent().addClass("is-error");
					if(this.errorList.length > 0){
						this.errorList[0].element.select();
						this.errorList[0].element.focus();
					}
					return;
				}
				$(element).closest(".input-group").addClass("is-error");
			},
			unhighlight : function(element) {
				if ($(element).parents(".input-date").length) {
					$(element).parent().removeClass("is-error");
					return;
				}
				$(element).closest(".input-group").removeClass("is-error");
			}
		});
		var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        var trident = ua.indexOf('Trident/');
        if (msie > 0 || trident>0) {
			$("#share-your-favourites-form input[required]").on("blur", function(){
				$("#share-your-favourites-form").validate().element( this );
			});
		}

		$("#share-your-favourites-form .save-changes").on('click',function(e){
			e.preventDefault();
			if($("#share-your-favourites-form").valid()){
				var data = $("#share-your-favourites-form").serialize();

					$.ajax({
						url: "SendEmail",
						data: data,
						type: "POST",
						dataType: 'json',
						beforeSend: function() {
							$('.shareSection').addClass('is-confirm');
							$('#email-form-modal form input').attr('disabled','disabled');
							$('#email-form-modal form textarea').attr('disabled','disabled');
							$('#email-form-modal form button').attr('disabled','disabled');
							$('#email-form-modal .fav-mail-close').addClass('disabled_anchor');
					    },
						success: function(result) {
					    	$('.shareSection').removeClass('is-confirm');
					    	$('#email-form-modal form input').removeAttr('disabled');
					    	$('#email-form-modal form textarea').removeAttr('disabled');
							$('#email-form-modal form button').removeAttr('disabled');
							$('#email-form-modal .fav-mail-close').removeClass('disabled_anchor');
				    		   if(null!=result && result.errorMessage!=null && result.errorMessage!=""){
				    			   $('.domainError').html(result.errorMessage);
				    			   $('.domainError').css("display","block");
				    		   }else{
				    			   $('.fav-mail-close').trigger( "click" );
				    			   $('#global-message .inner h2').text('Thanks, your favourites have been shared');
				    			   $('#global-message').show();
				    			   $('#global-message .inner').css('top', 0);
				    			   opsm.utils.initGlobalMessageRemovalOld();

				    			   $("html, body").animate({
										scrollTop : $('main.my-account-favourites').offset().top
									}, 800);
				    		   }
					    	$("#email-form-modal").modal("hide");
						},
					    error: function() {
					    	$('.shareSection').removeClass('is-confirm');
					    	$('#email-form-modal form input').removeAttr('disabled');
					    	$('#email-form-modal form textarea').removeAttr('disabled');
							$('#email-form-modal form button').removeAttr('disabled');
							$('#email-form-modal .fav-mail-close').removeClass('disabled_anchor');
					    	$("#email-form-modal").modal("hide");
					    }
					});

					callAnalyticsForError("Sharing", "EmailConfirmation", "YourFavouritesModal", "", "ShareSocial", "");

			}else{
				favourite_validator.focusInvalid();
				callAnalyticsForError("Sharing", "Email", "YourFavouritesModal", "ValidationError", "", "Email_YourFavourites");
			}
		});
	}
//	$("#email-form-share-wishlist .save-changes").on("click",function() {
//		var friendEmail = $("#friend-email").val();
//		var body = encodeURIComponent($("#message-form-modal").val());
//		var myNameThenSubject = encodeURIComponent("Wishlist from " + $("#user-name-form").val());
//		//var myEmail = encodeURIComponent($("#user-form-email").val());
//		window.open("mailto:" + friendEmail + "?subject=" + myNameThenSubject + "&body=" + body, "_blank");
//	});
	// set current url in sign in CL PDP
	$("#login-form-post-url").val(location.href);
	$("#login-form-post-signin").val(location.href);


	/*OOC-3739 | InStore subscription changes starts here*/
	var unitNum = $("#instore-subscription input[name=unitNumber]").val();
	var empId = $("#instore-subscription input[name=empID]").val();
	if(unitNum != ""){
		$('#instore-subscription .values').show();
		$('#instore-subscription .inputs').hide();
        $("#instore-subscription .staff-sign-up-btn").hide();
        $("#instore-subscription .staff-edit-btn").show();
	}

	$("#instore-sub").on('click', function(e){
		e.preventDefault();
		var unitNum = $("#instore-subscription input[name=unitNumber]").val();
		var empId = $("#instore-subscription input[name=empID]").val();
		if(unitNum == "" && empId == "") {
			$("#instore-subscription .emp-id-err").hide();
			$("#instore-subscription .unit-number-err").hide();
			$("#instore-subscription .unit-number-valid").hide();
		}
		else {
			if(unitNum == "" && empId != ""){
				$("#instore-subscription .unit-number-err").show();
				$("#instore-subscription .unit-number-valid").hide();
				return false;
			}
			if(unitNum != "" && empId == ""){
				$("#instore-subscription .emp-id-err").show();
				$("#instore-subscription .unit-number-err").hide();
				return false;
			}
			if(unitNum != "" && empId != ""){

				var self = this;
				var $parent = $(self).closest('div');
				opsm.utils.overlayDiv($parent, 'show', 15)

				var params = {};
				params.unitNumber = unitNum;
				params.employeeId = empId;
				$.ajax({
	    		  type: "POST",
	              url: $("#inStoreSubscriptionURL").val(),
	              data: params,
	              dataType: 'json',
	              complete: function(jqXHR, textStatus) {
	            	  opsm.utils.overlayDiv($parent, 'hide', 15);
	              },
	              success: function (data) {
					$("#instore-subscription .emp-id-valid").hide();
					$("#instore-subscription .unit-number-valid").hide();
	    		  	if(data.isValidStore != null && data.isValidStore == false) {
	    		  		$("#instore-subscription .unit-number-valid").show();
	    		  		$("#instore-subscription .unit-number-err").hide();
	                }
	            	if(data.savedInstore != null && data.savedInstore == true){
	            		$("#instore-subscription .unit-number-err").hide();
	            		$("#instore-subscription .emp-id-err").hide();
	            		$("#instore-subscription .unit-number-valid").hide();
	            		$('#instore-subscription .unit-number-div').text(data.unitNumber);
	            		$('#instore-subscription .emp-Id-div').text(data.employeeId);
	            		$('#instore-subscription .values').show();
	            		$('#instore-subscription .inputs').hide();
			            $("#instore-subscription .staff-sign-up-btn").hide();
			            $("#instore-subscription .staff-edit-btn").show();
	            	}
	              }
				});
			}
		}
	});

	$("#edit-btn").on("click", function(e){
		e.preventDefault();
		$("#instore-subscription .staff-sign-up-btn").show();
		$("#instore-subscription .staff-edit-btn").hide();
		$("#instore-subscription input.unit-number-input").val($('#instore-subscription .unit-number-div').text());
		$("#instore-subscription input.emp-id-input").val($('#instore-subscription .emp-Id-div').text());
		$('#instore-subscription .values').hide();
		$('#instore-subscription .inputs').show();
	});
	/*OOC-3739 | InStore subscription changes ends here*/
	/*
	$('input.input-noname').on('focus', function() {
		var name = $(this).attr('name');
		if (name)
			$(this).attr('data-name', name).removeAttr('name');
	}).on('blur', function() {
		var name = $(this).attr('data-name');
		if (name)
			$(this).attr('name', name).removeAttr('data-name');
	});
	*/
	/*$('input.autocomplete-off').each(function(){
		var realType = $(this).attr('data-type');
		if (realType)
			$(this).attr('type', realType);
	});*/

	$("[contenteditable]").each(function() {
		var $this = $(this);
		var $form = $this.closest('form');
        if ($form.length >= 1)
        	$this.get(0).form = $form.get(0);   //to mimic input prototype
	}).focusout(function(){
		var $this = $(this);
        if (!$this.text().trim().length) {
        	$this.empty();
        }
    });
});

//remove cookie for 'directly-go-to-payment' checkout behavior
$(document).ready(function() {
	if (!$('#checkout.contents').length)
	{
		$.removeCookie("clickPlaceOrder_"+$('#storeId').val(), {path: "/"});   //forcing the step "shipping-billing" for checkout
		/* OPSMD-6016 */
		var isFromSignIn = $.cookie("from_sign_in_"+$('#storeId').val()) == 1;
		$.removeCookie("from_sign_in_"+$('#storeId').val(), {path: "/"});
		$.removeCookie("presc_account_open_"+$('#storeId').val(), {path: "/"});
		/* END OPSMD-6016 */
	}
	//show a message saved in cookie
	if($.cookie('showmsg')) {
		try {
			var showMessageCookie = $.cookie('showmsg').split(";;");
			if("ERR" == showMessageCookie[0] && showMessageCookie[0]){
				opsm.utils.showAlertError(showMessageCookie[1]);
			}
		} catch(e){}
		$.removeCookie('showmsg', {path:"/"});
	}
});
