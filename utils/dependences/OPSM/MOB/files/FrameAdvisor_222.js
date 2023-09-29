var isFrameAdvisor = true; // TODO used in StaticContentPageDisplay.jsp ?
var fa2_country = '';
var fa2_langId = document.getElementById('FA_LANGID').value;
if(fa2_langId === '-1') {
	fa2_country = 'AU';
} else if(fa2_langId === '-99') {
	fa2_country = 'NZ';
}

frameAdvisorJS = {
    frameAdvisorWidget: null,
    
    config : {
		selector: '#frameadv-ui',
		locale: "en-" + fa2_country,
		facescanSource: 'FASA_OPSMCOM',
		facescanRegion: 'AU',
		frameAdvAPICore: 'fa_catalog',
		frameAdvAPIStore: 'OPSM@AU',
		frameAdvKey: '579f89cc-bf30-4eb4-8135-51ebdf6991a8',
		startMinimized: true,
		resultCallback: (data) => {
            result = frameAdvisorJS.getProducts(data.products)
            frameAdvisorJS.log("resultCallback", result)
            return result
        },
		enableSizeAdvisor: true,
		enableVideoMode: false,
		productTypes: ['eyeglasses', 'sunglasses'],
		defaultProductType: 'eyeglasses',
		productRequestRowsLimit: 24,
		facescanPrivacy: {
            privacyPolicy: $("#FA_PRIVACY_POLICY").val(),
            termsAndConditions: $("#FA_TERMS_AND_CONDITIONS").val(),
            localizationText: ''
        },
		addToBagCallback: product => {
			frameAdvisorJS.log("addtocart", product)
			return opsm.product.addToCart(null, product.catEntryId)
			.then( function () {
				const cartParamsArray = [];
				cartParamsArray.push("storeId=" + WCParamJS.storeId);
				cartParamsArray.push("catalogId=" + WCParamJS.catalogId);
				cartParamsArray.push("langId=" + WCParamJS.langId);
				cartParamsArray.push("orderId=.");
				cartParamsArray.push("calculationUsageId=-1");
				cartParamsArray.push("URL="+location.origin+"/webapp/wcs/stores/servlet/AjaxOrderItemDisplayView");
				cartParamsArray.push("errorViewName=AjaxOrderItemDisplayView");
				location.href = location.origin+"/OrderCalculate?"+cartParamsArray.join("&");
			});
		
		},
		openRXConfigurator: product => {
			frameAdvisorJS.log("openrx", product)
			location.href = product.url + "?openlenspanel=true";
		},
		saveProfileDataCallback: data => {
			if (isLoggedInUser=="false") {
				location.href = location.origin+"/sign-in";
			}
			resultData = frameAdvisorJS.saveProfileData(data);
			frameAdvisorJS.log("saveprofile ", resultData);
			return new Promise(function (resolve, reject) {
				resolve()
			})
		},
		getProfileDataCallback: () => {
			resultData = frameAdvisorJS.getProfileData();
			frameAdvisorJS.log("getuserprofile", resultData);
			if (!frameAdvisorJS.isEmpty(resultData)) {
				return new Promise(function (resolve, reject) {
					resolve({
						accessToken: resultData.accessToken,
				 		refreshToken: resultData.refreshToken,
				 		userUUID: resultData.userUUID,
				 	})
				})
			}
		},
		resetProfileDataCallback: userId => {
			frameAdvisorJS.log("resetProfileDataCallback ", userId);
			var params = {};
			params.isUpdateUserData = "true";
			params.userUUID = "";
			params.accessToken = "";
			params.refreshToken = "";
			frameAdvisorJS.saveProfileData(params);
		},
		
	},

    renderFrameAdvisor: function(){
        if(frameAdvisorJS.frameAdvisorWidget) {
        	if( document.querySelectorAll(".fa__floating-button-info").length ) {
        		document.querySelector(".fa__floating-button-button").click();
        	} else {
        		frameAdvisorJS.frameAdvisorWidget.render();
                sessionStorage.setItem("frame-advisor-widget", "true");
            	var el = document.getElementById('frameadv-ui');
            	el.classList.remove("d-none");
               	el.classList.remove("hidden-wrapper");
        	}
        }
    },
    
    getProducts : function(products) {
        let storeId = WCParamJS.storeId;
        let catalogId = WCParamJS.catalogId;
        let langId = WCParamJS.langId;
        let parameters = "storeId="+storeId +"&catalogId="+ catalogId+"&langId="+langId;
        var url = "/AjaxFA2ProductData?"+parameters;
        url = frameAdvisorJS.buildUrl(url, products);
        let productsCatalog = [];
        $.ajax({
            url: url,
            type: "GET",
            async: false,
            contentType: "application/json",
            success: function(response) {
            	if (response) {
					for(var indp = 0; indp < products.length; indp++) {
						var data = response[products[indp].upc];
						if (data) {
		            		let productDetails = products[indp];
		            		productDetails.catEntryId = data.catEntryId;
		            		productDetails.brandName = frameAdvisorJS.htmlDecode(data.manufacturer);
		            		productDetails.productName = data.name;
		            		productDetails.imageUrl = "https://assets.opsm.com/is/image/OPSM/" + data.partNumber + "__001.png?impolicy=OP_PLP"
		            		productDetails.url = location.origin+"/"+data.type+"/"+data.mfPartNumber+"/"+data.partNumber;
		            		productDetails.price = data.priceOffer;
		            		if (data.priceOffer!==data.priceDisplay){
			            		productDetails.priceFull = data.priceDisplay;
		            		}  
		            		productDetails.frameColor = data.frameColor;
		            		productDetails.lensColor = data.lensColor;
		            		productDetails.rxAvailable = data.rxAvailable;
		            		productDetails.brandlogoUrl = data.brandlogoUrl;
		            		productsCatalog.push(productDetails);
        				}
    				}
            	}
            	frameAdvisorJS.log("getproducts ",productsCatalog);
            }
        });    	
        return productsCatalog;
     },
     
     buildUrl : function(url, products) {
		let partNumbers = '';
		for(var i = 0; i < products.length; i++) {
			var upc = products[i].upc;
			partNumbers += (partNumbers != '' ? ',':'') + upc;
		}
		url = url.concat('&partNumbers=' + partNumbers);
		
		return url;
	},
	
	htmlDecode : function(input) {
		var doc = new DOMParser().parseFromString(input, "text/html");
		return doc.documentElement.textContent;
	},
	
	getProfileData : function(data) {
		var urlCmd = "/FrameAdvisorUserDataUpdateCmd";
		var params = {};
		params.isUpdateUserData = "false";
		let responseResult = {};
		$.ajax({
			url: urlCmd,
			type: "GET",
			data: params,
			async: false,
			dataType : 'json',
			success: function(response) {
				responseResult = response.RequestProperties;
			},
			error: function (xhr, ajaxOptions, thrownError) {
				frameAdvisorJS.log("exception getProfileData", ajaxOptions);
			}
		});
		return responseResult;
	},

	saveProfileData : function(data) {
		var urlCmd = "/FrameAdvisorUserDataUpdateCmd";
		var params = {};
		params.isUpdateUserData = "true";
		params.userUUID = data.userUUID;
		params.accessToken = data.accessToken;
		params.refreshToken = data.refreshToken;
        let responseResult = {};
		$.ajax({
			url: urlCmd,
			type: "GET",
			data: params,
			async: false,
			dataType : 'json',
			success: function(response) {
				responseResult = response.RequestProperties;
			},
			error: function (xhr, ajaxOptions, thrownError) {
				frameAdvisorJS.log("exception saveProfileData", ajaxOptions);
			}
		});
		return responseResult;
	},
	
	isEmpty : function (obj) {
		for(var prop in obj) {
	        if(obj.hasOwnProperty(prop)) {
	            return false;
	        }
	    }
	    return true;
	},
	
	log : function (msg, obj) {
		if (localStorage.getItem("DEBUG")) {
			console.log("fa-"+msg, obj);
		}
	}
	
}

window.addEventListener("DOMContentLoaded", function () {
	
	var el = document.getElementById('frameadv-maximized');
	if (el) {
		frameAdvisorJS.config.startMinimized = false;
	}
	
	frameAdvisorJS.log("mode minimized ", frameAdvisorJS.config.startMinimized);
    frameAdvisorJS.frameAdvisorWidget = frameAdvisor.FrameAdvisorWidget.new(frameAdvisorJS.config);
    if (sessionStorage.getItem("frame-advisor-widget")) {
    	frameAdvisorJS.frameAdvisorWidget.render();
    	frameAdvisorJS.log("start minimized ", frameAdvisorJS.config.startMinimized);
		var el = document.getElementById('frameadv-ui');
		el.classList.add("hidden-wrapper");
    	el.classList.remove("d-none");
    }
    
    document.querySelector('body').addEventListener('fa-loading', (e) => {
    }, false);
    
    document.querySelector('body').addEventListener('fa-minimize', (e) => {
    	var el = document.getElementById('frameadv-ui');
    	el.classList.add("hidden-wrapper");
    	document.querySelector('body').classList.remove("modal-open");
    	document.querySelector('html').classList.remove("modal-open");
			document.querySelector('.fa-overlay').classList.add("d-none");
    }, false);
    
    document.querySelector('body').addEventListener('fa-maximize', (e) => {
		var el = document.getElementById('frameadv-ui');
    	el.classList.remove("d-none", "hidden-wrapper");
    	document.querySelector('body').classList.add("modal-open");
    	document.querySelector('html').classList.add("modal-open");
    	document.querySelector('.fa-overlay').classList.remove("d-none");
    }, false);
    
    document.querySelector('body').addEventListener('fa-close', (e) => {
    	var el = document.getElementById('frameadv-ui');
    	el.classList.add("hidden-wrapper");
    	document.querySelector('body').classList.remove("modal-open");
    	document.querySelector('html').classList.remove("modal-open");
			document.querySelector('.fa-overlay').classList.add("d-none");
			frameAdvisorJS.frameAdvisorWidget.closeApp()
    }, false);
    
    document.querySelector('body').addEventListener('fa-loaded', (e) => {
    }, false);
    
    frameAdvisorJS.frameAdvisorWidget.getSuggestedSizes({ XS: 109, S: 125, M: 129, L: 133, XL: 137 }).then(data => {
    	frameAdvisorJS.log("getsuggestedsizes: ", data)
    });    
	/*
    frameAdvisorJS.frameAdvisorWidget.getUserData().then(data => {
    	frameAdvisorJS.log("getuserdata: ", data)
    });
    window.onGetUserData = () => {
    	frameAdvisorJS.frameAdvisorWidget.getUserData().then(data => {
	    	frameAdvisorJS.log("getuserdata: ", data)
		})
	}
	*/
});

