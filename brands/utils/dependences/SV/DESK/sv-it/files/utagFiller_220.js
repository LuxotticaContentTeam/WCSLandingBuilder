utagFiller = {
	/*** vars updated at every glasses PDP load and usueful only for ajax requests ***/
	partNumber: null,
	name: null,
	buyable: null,
	/******/
	toUpper: function(string) {
		if (string != null) {
			return string.toUpperCase().trim(); //.replace(/ /g, '-')
		} else {
			return '';
		}
	},
	/*****/
	initialize: function(config){
		var baseConfig = {
			Page_Country: 'IT',
			Page_Language: 'IT',
			Page_Brand: "SV",
			Page_DeviceType: "X",
			Page_Platform: "WCS",
			//Order_CodeVersion: "1",
			Order_Currency: "EUR",
		    User_Email_MD5  : "",
		    User_Email_SHA256 : "",			
		    User_Phone_MD5  : "",
		    User_Phone_SHA256 : "",
		    User_Segments : "",
		    User_LoyaltyCard : "",
		    User_HasPrescription : "0"
		};
		config = config ? config : {};
		$.extend(utag_data, baseConfig, config);
		
		/*if (constants.ajaxParams['loggedIn']){
			utag_data.user_id = constants.ajaxParams['userId'];
			utag_data.User_LoginStatus = "Logged";
			utag_data.User_Id = constants.ajaxParams['userId'];
		}else{
			utag_data.User_LoginStatus = "Guest";
		}*/
		//this.setMiniCartId();
	},
	
	setUser: function(config) {
		config = config ? config : {};
		$.extend(utag_data, config);
		
//		if (userId)
//		{
//			utag_data.User_LoginStatus = "Logged";
//			//utag_data.user_id = userId;
//			utag_data.User_Id = userId;
//		}
//		else
//		{
//			utag_data.User_LoginStatus = "Guest";
//		}
	},
	
	asyncUserLogon: function(email){
		var obj;
		try{
			obj = {
		      id: "Event",
		      Events_UserLogin : "1",
		      User_LoginType : "Standard",
		      User_Id : userdataJS.User_Id,
		      User_Segments: ""
			};
			if(userdataJS.User_Email_MD5 != null && userdataJS.User_Email_MD5.trim().length > 0) {
			    obj["User_Email_MD5"] = userdataJS.User_Email_MD5;
			}

			if(userdataJS.User_Email_SHA256 != null && userdataJS.User_Email_SHA256.trim().length > 0) {
			    obj["User_Email_SHA256"] = userdataJS.User_Email_SHA256;
			}

			if(userdataJS.User_Phone_MD5 != null && userdataJS.User_Phone_MD5.trim().length > 0) {
				obj["User_Phone_MD5"] = userdataJS.User_Phone_MD5;
			}

			if(userdataJS.User_Phone_SHA256 != null && userdataJS.User_Phone_SHA256.trim().length > 0) {
				obj["User_Phone_SHA256"] = userdataJS.User_Phone_SHA256;
			}
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	asyncUserRegister: function(email){
		var obj;
		try{
			var md5email = "";
			var sha256email = "";
			if (email != null & email.length > 4) {
				md5email = md5(email.trim().toLowerCase());
				sha256email = sha256(email.trim().toLowerCase());
			}
			
			obj = {
		      id: 'Account-Create',
		      User_Email_MD5  : md5email,
		      User_Email_SHA256 : sha256email,
			  User_Phone_MD5  : "",
			  User_Phone_SHA256 : "",
		      //User_Id: "",
		      //User_CrmId: "",
		      User_Segments: ""

		   };
			
			//if ($('#usodati').is(':checked')) {
			if ($('#MAC_analytics_receiveEmail').val() == 'true') {
				obj.Events_UserEmailSub = '1';
			}			
		    
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	setPageSignupConfirmation: function(email, flagOptin, userId){
		var md5email = "";
		var sha256email = "";
		if (email != null & email.length > 4) {
			md5email = md5(email.trim().toLowerCase());
			sha256email = sha256(email.trim().toLowerCase());
		}
		utag_data.Events_UserAccountNew = "1";
		utag_data.Events_UserEmailSub = "0";
		if (flagOptin == 'true') {
			utag_data.Events_UserEmailSub = "1";
		}
		utag_data.User_Email_MD5 = md5email;
		utag_data.User_Email_SHA256 = sha256email;
		utag_data.User_Phone_MD5 = "";
		utag_data.User_Phone_SHA256 = "";
		utag_data.User_Id = userId;
		utag_data.User_Segments = "";
		utag_data.User_LoginType = "";
	},
	
	asyncSendError: function(errmessage, source, code) {
		var obj = {};
		try{
			if (errmessage != null && errmessage.trim().length > 0) {
				errmessage = errmessage.trim();
				obj.Error_Message = this.UTILDecodeEntities(errmessage);
				obj.Error_Details = this.UTILDecodeEntities(errmessage);
			}
			obj.id = 'Error';
		    obj.Error_Source = source;
	        //Error_Message: message,
		    obj.Error_Code = code;
		}catch(err){
			obj = {
		        id: 'Error',
		        Error_Source: source,
		        //Error_Details: errmessage,
		        Error_Message: errmessage,
		        Error_Code: code
		    };
		}
		finally{
			if (tealium_data2track != null) {
				tealium_data2track.push(obj);
			}
		}
	},
	
	UTILDecodeEntities: function (encodedString) {
		var textArea = document.createElement('textarea');
		textArea.innerHTML = encodedString;
		return textArea.value;
	},
	
	asyncUserNewsletterSignup: function(email) {
		var obj;
		try{
			var md5email = "";
			var sha256email = "";
			if (email != null & email.length > 4) {
				md5email = md5(email.trim().toLowerCase());
				sha256email = sha256(email.trim().toLowerCase());
			}
			
			obj = {
		      id: 'SignupForm',
		      User_Email_MD5  : md5email,
		      User_Email_SHA256 : sha256email
		      // se imposto phone, errore: ERROR > Variable should not be used! Please remove this variable or leave it as empty string.
			  //User_Phone_MD5  : "",
			  //User_Phone_SHA256 : ""
			};
		    
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	asyncGiftCardTentative: function(giftCardCode) {
		var obj;
		try{
		   obj = {
		      id: 'OrderGiftCard-Tentative',
		      Order_GiftCardCode : giftCardCode
		   };
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	asyncGiftCardApplied: function(giftCardCode) {
		var obj;
		try{
		   obj = {
		      id: 'OrderGiftCard-Applied',
		      Order_GiftCardCode : giftCardCode
		   };
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	asyncPromocodeTentative: function(promocode,errorSource, errorCode,errorMessage) {
		var obj;
		try{
		   obj = {
		      id: 'OrderDiscountCode-Tentative',
		      Order_DiscountCode : promocode,
		      Error_Source : errorSource,
		      Error_Code : errorCode,
		      Error_Message : errorMessage,
		      Order_DiscountName : ''
		   };
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	asyncPromocodeApplied: function(promocode, adjustmentsDiscount) {
		var obj;
		var skus3p1 = $('.analyticsCart3p1Items').map(function() { return $(this).val(); });
		promocode += ((skus3p1 != null && skus3p1.length > 0) ? ',3+1' : '');
		try{
		   obj = {
		      id: 'OrderDiscountCode-Applied',
		      Order_DiscountCode : promocode,
		      Order_DiscountName : adjustmentsDiscount
		   };
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	asyncPromocodeRemove: function(adjustmentsDiscount) {
		var obj;
		var skus3p1 = $('.analyticsCart3p1Items').map(function() { return $(this).val(); });
		var promocode = (skus3p1 != null && skus3p1.length > 0) ? '3+1' : '';
		try{
		   obj = {
		      id: 'OrderDiscountCode-Applied',
		      Order_DiscountCode : promocode,
		      Order_DiscountName : adjustmentsDiscount
		   };
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	asyncSendId: function(id) {
		var obj;
		try{
			
			var prod = window.analyticsProductPDP || {};
			
			obj = {
		      id: id,
		      Products: prod
			};
			
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	setPage: function(pageType, section1, section2){
		utag_data.Page_Type = pageType;
		if(typeof section1 === 'undefined'){
			section1 = pageType;
		}
		utag_data.Page_Section1 = section1;
		if(typeof section2 !== 'undefined'){
			utag_data.Page_Section2 = section2;
		}
	},
	

	setDiscountName: function(adjustment){
		var obj;
		try{
		   obj = {
		      id: 'OrderDiscountCode-Applied',
		      Order_DiscountName : adjustment
		   };
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	OnPageLoad: function(section1, section2, type){
		var obj;
		try{
			var sec1 = "";
			var sec2 = "";
			var ty = "";
			if (typeof section1 !== 'undefined') 
			{
				sec1 = section1;
			}
			else
			{
				sec1 = "Exam";
			}
			
			if (typeof section2 !== 'undefined') 
			{
				sec2 = section2;
			}
			else
			{
				sec2 = "Question1";
			}
			
			if (typeof type !== 'undefined') 
			{
				ty = type;
			}
			else
			{
				ty = "Info";
			}
			
			obj = {
				 id: 'VirtualPage-View', 
				 Page_Section1: sec1,
				 Page_Section2: sec2,
				 Page_Type: ty
			};
		}catch(err){
		   obj = {
			        id: 'Error',
			        Error_Source: 'Server',
			        Error_Code: 'utag_data syntax - '+err.message,
			        Error_Detail: ''
			    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	setTabSection: function(section){
		var obj;
		try{
		   obj = {
		      id: 'Exam-Funnel-Info',
		      Page_Section2 : section
		   };
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	setTabCancelAppointment: function(){
		var obj;
		try{
		   obj = {
		      id: 'Exam-Funnel-Cancellation', 
		      Exam_PatientNum: ""
		   };
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	asyncTabConfirmationPage: function(appointment, email){
		var obj;
		try{
			var md5email = "";
			var sha256email = "";
			if (email != null & email.length > 4) {
				md5email = md5(email.trim().toLowerCase());
				sha256email = sha256(email.trim().toLowerCase());
			}
			
		   obj = {
		      id: 'Exam-Funnel-Confirmation',
		      Exam_ZipCode: "",
			  Exam_Fitting: "",
			  Exam_PreviousExam: "",
			  Exam_WornBefore: "",	
			  Exam_PatientNum: "",
			  Exam_Id: "",
			  User_Email_MD5: md5email,
			  User_Email_SHA256 : sha256email,
			  User_Phone_MD5  : "",
			  User_Phone_SHA256 : ""
		   };
		   
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	getBreadcrumbParams: function() {
		var section1 = "";
		var section2 = "";
		var breadcrumbItems = $('#widget_breadcrumb > ul > li').toArray();
		if (breadcrumbItems.length > 1) {
			section1 = $(breadcrumbItems[1]).text();
			
			section1 = this.toUpper(section1);
			if (section1 == "OCCHIALI DA SOLE") {
				section1 = 'SUN';
			} else if (section1 == "OCCHIALI DA VISTA") {
				section1 = 'OPTICS';
			} else if (section1 == "LENTI A CONTATTO") {
				section1 = 'CONTACT LENSES';
			} else if (section1 == "ACCESSORI") {
				section1 = 'ACCESSORIES';
			}
			
			if (section1!= null && breadcrumbItems.length > 2) {
				section2 = $(breadcrumbItems[2]).text();
				section2 = this.toUpper(section2);
				if (section2 == "OCCHIALI DA SOLE") {
					section2 = 'SUN';
				} else if (section2 == "OCCHIALI DA VISTA") {
					section2 = 'OPTICS';
				} else if (section2 == "LENTI A CONTATTO") {
					section2 = 'CONTACTLENSES';
				} else if (section2 == "ACCESSORI LENTI A CONTATTO") {
					section2 = 'ACCESSORIES CONTACTLENSES';
				} else if (section2 == "ACCESSORI OCCHIALI DA SOLE") {
					section2 = 'ACCESSORIES SUN';
				}
				
			}
		}
		
		if(section1 == "") section1 = "OTHER";
		
		var toReturn = { section1: section1, section2: section2};
		return toReturn;
	},
	
	getPLPAnalytics: function() {
		var section1 = "";
		var section2 = "";

		//SVDP-6022
		if ($('#analyticsCategoryURL').length > 0) {
			let catURL = $('#analyticsCategoryURL').val();
			catURL = catURL.toLowerCase();
			if (catURL.startsWith('accessories')){
				section1 = 'ACCESSORIES';
			} else if (catURL.startsWith('sv_brand_')){
				section1 = 'Brand';
				section2 = this.toCamelCase(catURL.split('sv_brand_')[1].replace(/_/g, ' '),'');
			} else if (catURL.startsWith('sv_occasioni')){
				section1 = 'Clearance';
			} else if (catURL.startsWith('sv_trend_sostenibilità')){
				// this category is used in these pages
				// occhiali-sostenibili?facet_1=ads_f42057_ntk_cs%253A%2522Optical%2522
				// occhiali-sostenibili?facet_1=ads_f42057_ntk_cs%253A%2522Sun%2522
				// breadcrumb: Optical/Sun
				let breadcrumbItems = $('#widget_breadcrumb > ul > li').toArray();
				if (breadcrumbItems.length > 1) {
					section1 = $(breadcrumbItems[1]).text();					
					section1 = this.toUpper(section1);
					// "SUN" doesn't need correction
					if (section1 == "OPTICAL") {
						section1 = 'OPTICS';
					}
				}
				section2 = 'Occhiali-Sostenibili';
			} 
		}
		
		if(section1 == "") {
			let listFirstLevelURL = {
				URLs: [
			        {URL: "occhiali-da-sole", section1: "SUN", self: false},
			        {URL: "occhiali-da-vista", section1: "OPTICS", self: false},
			        {URL: "lenti-a-contatto", section1: "CONTACT LENSES", self: false},
			        {URL: "occhiali-da-lettura", section1: "OPTICS", self: true}
			    ]
			};			
			
			let urlPage = window.location.href.split('/').pop().split('?')[0];
			
			$.each(listFirstLevelURL.URLs, function(index, value) {
				 if(urlPage.startsWith(value.URL)) {
					 section1 = value.section1;
			    	 let tokens = urlPage.split(value.URL);
			    	 if(tokens.length == 2 && tokens[1] !== ''){
			    		 section2 = utagFiller.toCamelCase(tokens[1].substring(1).replace(/-/g, ' '),'-');
			    	 } else if (value.self){
			    		 section2 = utagFiller.toCamelCase(urlPage.replace(/-/g, ' '),'-');
			    	 }			    	 
			    	 return false;
			    }
			});
		}
		
		if(section1 == "") section1 = "OTHER";
		
		var toReturn = { section1: section1, section2: section2};
		return toReturn;
	},

	toCamelCase: function(str, separator) {
	    return str
	        .toLowerCase()          
	        .split(' ')             
	        .map((word, index) => {
	            return word[0].toUpperCase() + word.slice(1); 
	        })
	        .join(separator);
	},
	
	setCategory: function(section1, section2){
		var res = {};
		//SVDP-6022 section1, section2 from URL/Category
//		if (section1 == null) { //se non mi arriva in ingresso lo calcolo dal breadcrumb
//			res = this.getBreadcrumbParams();
//		}
		if (section1 == null) { 
		    res = this.getPLPAnalytics();
	    }		
		
		section1 = res.section1;
		section2 = res.section2;
		
		utag_data.Page_Type = "Plp";
		utag_data.Page_Section1 = section1;
		utag_data.Page_Section2 = section2;
		utag_data.Vm_IsBrowserSupported = isBrowserSupported();
		utag_data.Page_Design = "Editorial";

		this.setPLPList();
	},
	
	setProductAnalytics: function(partNumber) {
		utag_data.Products = {};
		utag_data.Order_Currency = "EUR";
		utag_data.Vm_IsBrowserSupported = isBrowserSupported();
		
		if(partNumber && $('#itemInfo' + partNumber).val().length > 0){
			let productAnalyticsObject = JSON.parse($('#itemInfo' + partNumber).val());
			
			utag_data.Products[partNumber] = productAnalyticsObject.analyticsObject;
			
			window.analyticsProductPDP = utag_data.Products;
		}
		
	},
	
	setPDP: function(partNumber, name, buyable){
		utag_data.Products = {};
		
		if (buyable == null) {
			buyable = $('#analyticsPDPItemAvailability').val();
		}
		
		var res = this.getBreadcrumbParams();
		utag_data.Order_Currency = "EUR";
		utag_data.Page_Type = "Pdp";
		
		var cat = $('#analyticsPDPItemProductType').val() || res.section1;
		
		if (cat == "CONTACT_LENS") {
			cat = 'CONTACT LENSES';
		}else if (cat == "OPTICAL") {
			cat = 'OPTICS';
		}else if (cat == "READERS") {
			cat = 'OPTICS';
		}
		
		utag_data.Page_Section1 = cat;
		
		if (partNumber == null) {
			partNumber = $('#PageHeading >#product-model').text().trim();
		}
		if (name == null) {
			if (cat == "CONTACT LENSES") {
				name = $('#analyticsPDPItemModelName').val();
			}
			else {
				//name = $('#PageHeading >#product-name').text();
				name = res.section2;
			}
		}
		utag_data.Page_Section2 = name;
		
		utag_data.Vm_IsBrowserSupported = isBrowserSupported();
		
		if (partNumber != null) {
			partNumber = partNumber + "";
			//partNumber = "'" + partNumber + "'";
			utag_data.Products[partNumber] = {};
			
			utag_data.Products[partNumber].Category = cat;
			
			utag_data.Products[partNumber].Status = buyable;
			
			utag_data.Products[partNumber].Units = "1";
			
			var isVMEnabled = $("#has-virtual-mirror").val() == 'true' ? '1' : '0';
			
			utag_data.Products[partNumber].Engraving = "N";
			//utag_data.Products[partNumber].Vm_IsUpcSupported = isVMEnabled;
			utag_data.Products[partNumber].Conf_IsUpcSupported = "0";
			utag_data.Products[partNumber].OosOptions = "";
			if (buyable == 'Out-of-stock')
				utag_data.Products[partNumber].OosOptions = "FindStore";
		    //utag_data.Products[partNumber].Warranty = "0";
		    
		    var htmlPrice = $('#price_display input[name="analyticsPDPSinglePrice"]').val();
		    if(typeof htmlPrice == 'undefined'){
		        htmlPrice = $('.partial-price-wrapper input[name="analyticsPDPSinglePrice"]').val();
		    }
		    //var fullPrice = $('#price_display input[name="analyticsPDPSingleFullPrice"]').val() || htmlPrice;
		    var fullPrice = $('#price_display input[name="analyticsPDPSingleFullPrice"]').val();
		    if(typeof fullPrice == 'undefined' || fullPrice == ''){
		    	fullPrice = $('.partial-price-wrapper input[name="analyticsPDPSingleFullPrice"]').val() || htmlPrice;
		    }
		    htmlPrice = htmlPrice.replace('€','').trim().replace('.','').replace(',','.');
		    utag_data.Products[partNumber].Price = htmlPrice;
		    
		    fullPrice = fullPrice.replace('€','').trim().replace('.','').replace(',','.');
		    utag_data.Products[partNumber].PriceFull = fullPrice;
			
			//utag_data.Products[partNumber].Type = $('#analyticsPDPItemType').val();
			
			var brand = $('#PDPItemBrand').val() || '';
			utag_data.Products[partNumber].Brand = brand;
			var size = $('#analyticsPDPItemSize').val() || '';
			utag_data.Products[partNumber].Size = size;
			
			utag_data.Products[partNumber].LensType = 'PLANO';
			utag_data.Products[partNumber].BackOrder = '0';
			
			var moco = $('#PDPItemMoco').val() || '';
			//utag_data.Products[partNumber].Moco = moco;
			var modelName = $('#PDPItemModelName').val() || '';
			utag_data.Products[partNumber].ModelName = modelName;
			var frameType = $('#analyticsPDPItemType').val() || '';
			//utag_data.Products[partNumber].FrameType = frameType;
			utag_data.Products[partNumber].FrameType = 'STD';
			
			
			var sku = $('#PDPItemSKU').val() || '';
			if (sku == null || sku == '') {
				sku = moco;
			}
			utag_data.Products[partNumber].Sku = sku;
			
			var upc = '';
			utag_data.Products[partNumber].UPC = upc;
			
			var frameShape = $('#PDPItemFrameShape').val() || '';
			var frameMaterialClass = $('#PDPItemFrameMaterialClass').val() || '';
			var lensTreatment = $('#PDPItemLensTreatment').val() || '';
			var lensTreatmentFacet = $('#PDPItemLensTreatmentFacet').val() || '';

			utag_data.Products[partNumber].Shape = frameShape;
			utag_data.Products[partNumber].FrameTechnology = frameMaterialClass;			
			utag_data.Products[partNumber].LensTechnology = lensTreatment;
			if(lensTreatmentFacet == 'Fotocromatica'){
                utag_data.Products[partNumber].LensTransition = lensTreatmentFacet;
                utag_data.Products[partNumber].LensAntiblue = '';
			}else if(lensTreatmentFacet == 'Anti-Blue'){
                utag_data.Products[partNumber].LensTransition = '';
                utag_data.Products[partNumber].LensAntiblue = lensTreatmentFacet;
            }else {
                utag_data.Products[partNumber].LensTransition = '';
                utag_data.Products[partNumber].LensAntiblue = '';
            }
			
			var image = $('#PDPItemImage').val() || '';
			utag_data.Products[partNumber].Image = image;
			utag_data.Products[partNumber].Url = window.location.href;
			
			utag_data.Products[partNumber].LensUPC = "";
		}
		
		window.analyticsProductPDP = utag_data.Products;
	},
	
	asyncAddAccessoryToCartFromCart: function(catEntryID) {
		var obj;
		try{
			var brand = $('.analyticsFromCartAccessoryBrand_'+catEntryID).val() || '';
			var moco = $('.analyticsFromCartAccessoryMoco_'+catEntryID).val() || '';
			var modelName = $('.analyticsFromCartAccessoryModelName_'+catEntryID).val() || '';
			var price = $('.analyticsFromCartAccessoryPrice_'+catEntryID).val() || '';
			var priceFull = $('.analyticsFromCartAccessoryPriceFull_'+catEntryID).val() || '';
			var upc = $('.analyticsFromCartAccessoryUPC_'+catEntryID).val() || '';
			var size = $('.analyticsFromCartAccessorySize_'+catEntryID).val() || '';
			
			var prod = {};
			prod[catEntryID] = {};
			prod[catEntryID].Brand = brand;
			prod[catEntryID].Category = 'ACCESSORIES';
			prod[catEntryID].Conf_IsUpcSupported = '0';
			prod[catEntryID].Engraving = 'N';
			prod[catEntryID].OosOptions = 'None';
			prod[catEntryID].Moco = moco;
			prod[catEntryID].ModelName = modelName;
			prod[catEntryID].Price = price;
			prod[catEntryID].PriceFull = priceFull;
			prod[catEntryID].Vm_IsUpcSupported = '0';
			prod[catEntryID].Size = size;
			prod[catEntryID].Sku = moco;
			prod[catEntryID].Status = 'Available';
			prod[catEntryID].Type = 'STD';
			prod[catEntryID].Units = '1';
			prod[catEntryID].UPC = upc;
			prod[catEntryID].Warranty = '0';
			
			obj = {
				id: 'AddToCart',
				Products: prod
			};
		}catch(err){
			obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}finally{
			tealium_data2track.push(obj);
		}
	},
	
	asyncAddToCartPDP: function(qtity, isContactLenses) {
		var obj;
		try{
			var prod = window.analyticsProductPDP || {};
			prod[Object.keys(prod)[0]].Units = qtity || '0';
			
			let prescription = $('#prescription-purchase').is(':checked');
			if (prescription) {
				let discountPerc = $('.discount-badge #discountPercentage').val();
				prod[Object.keys(prod)[0]].PriceFull = prod[Object.keys(prod)[0]].Price.toFixed(2); //.PriceFull
				//prod[Object.keys(prod)[0]].Price = (prod[Object.keys(prod)[0]].Price*0.8).toFixed(2);
				prod[Object.keys(prod)[0]].Price = (prod[Object.keys(prod)[0]].Price*((100-discountPerc)/100)).toFixed(2);
			} else {		
				// fix decimals
				prod[Object.keys(prod)[0]].PriceFull = prod[Object.keys(prod)[0]].PriceFull.toFixed(2);
				prod[Object.keys(prod)[0]].Price = prod[Object.keys(prod)[0]].Price.toFixed(2);
			}
			// fix decimals
			prod[Object.keys(prod)[0]].PricePerUnits = prod[Object.keys(prod)[0]].PricePerUnits.toFixed(2);
			prod[Object.keys(prod)[0]].PriceFullPerUnits = prod[Object.keys(prod)[0]].PriceFullPerUnits.toFixed(2);			
			
			if (isContactLenses && !prescription){
				var totalItemPrice = $("#analyticsPDPITotalPrice").val();
			    var itemPrice = "0.00";
			    if (totalItemPrice != null) {
			    	
			    	totalItemPrice = parseFloat(totalItemPrice.trim()).toFixed(2);
			    	var supportItemPrice = totalItemPrice/qtity;
			    	if (supportItemPrice != null) {
			    		itemPrice = parseFloat(supportItemPrice).toFixed(2);
			    	}			    				    
			    }
			    
			    prod[Object.keys(prod)[0]].Price = itemPrice;			    
			}				
			
			obj = {
		      id: 'AddToCart',
		      Products: prod
		   };

		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
			//console.log(obj);
		    tealium_data2track.push(obj);
		}
	},
	
	asyncAddToFavouritePDP: function(productId) {
		var obj;
		try{
			let prod, prodAnalytics;
			if(window.analyticsProductPDP){
				prodAnalytics = window.analyticsProductPDP || {};
			}else {
				Products = {};
				let prodPartNumber = $('.favBtn-' + productId).attr('data-fav-partnumber');
				let partNumber = $('#tileAnalyticsSKU' + prodPartNumber).val();
				Products[partNumber] = {};
				Products[partNumber].Category = $('#tileAnalyticsPT' + prodPartNumber).val();
				Products[partNumber].FrameType = "STD";
				Products[partNumber].LensType = "PLANO";
				prodAnalytics = Products;
			}
			
			obj = {
		      id: 'ProdFavAdd',
		      Products: prodAnalytics
		   };

		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
			//console.log(obj);
		    tealium_data2track.push(obj);
		}
	},
	
	wishlistModalPreviewPDP: function(productId) {
		var obj;
		try{
			let Products = {};
			let partNumber = $('#productPartNumber-' + productId).val();
			Products[partNumber] = {};
			Products[partNumber].Category = $('#productCategory-' + partNumber).val();
			Products[partNumber].FrameType = "STD";
			Products[partNumber].LensType = "PLANO";
						
			obj = {
		      id: 'Impression',
		      Page_Section2 : 'QuickView',
		      Products: Products
		   };

		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
			//console.log(obj);
		    tealium_data2track.push(obj);
		}
	},

	canUpdate : false,
	
	setExamPageInfo: function(zipCode, currentPage) {
		utag_data.Page_Section1 = "Exam";
		utag_data.Page_Section2 = "";
		if (currentPage !== "ThankYouSchedulingPage") {
			utag_data.Page_Type = "Review";
		} else {
			utag_data.Page_Type = "Confirmation";
		}
		utag_data.Exam_ZipCode = zipCode;
		if(sessionStorage.getItem("examContents") !== null){
			var parsedJson = JSON.parse(sessionStorage.getItem("examContents"));
			if (parsedJson.length > 0) {
				var previousExam = [];
				var fitting = [];
				var wornBefore = [];
				for(var i = 0; i < parsedJson.length; i++) {
					previousExam.push(parsedJson[i].previousExam);
					fitting.push(parsedJson[i].fitting);
					if (typeof parsedJson[i].wornBefore !== "undefined") {
						wornBefore.push(parsedJson[i].wornBefore);
					}
				}
				utag_data.Exam_PreviousExam = previousExam.join(",");
				utag_data.Exam_Fitting = fitting.join(",");
				utag_data.Exam_WornBefore = wornBefore.join(",");
				utag_data.Exam_PatientNum = "" + previousExam.length;
				if (currentPage === "ThankYouSchedulingPage") {
					sessionStorage.removeItem("examContents");
				}
			}
		}
	},
	
	setExamFlag: function(){
		sessionStorage.setItem("anotherExam", "true");
	},
	
	setOtherPage: function(type, name, section,design ){
		utag_data.Page_Type = type;
		utag_data.Page_Section1 = name;
		utag_data.Page_Section2 = section;
		if(design){
			utag_data.Page_Design = design;
		}
		
		if (type == 'FindStore' && name == 'Exam') {
			this.setExamFittingBaet();
		} else if (type == 'Info' && name == 'Exam') {
			this.setExamFittingBaet();
			this.setBaetZipCode();
		} else if (type == 'FindStoreExam' && name == 'Exam') {
			utag_data.Store_Search_Keyword = '';
			utag_data.Store_Search_Type = '';
			utag_data.Store_Search_ResultItemsQnt = '';
			utag_data.Events_FunnelStoreSearch = '1';
		}
	},
	
	setStaticPage: function(pageName){
		utag_data.Page_Type = "Static";
		utag_data.Page_Section1 = pageName;
		utag_data.Page_Section2 = "";
	},
	
	setNotFoundPage: function(){
		utag_data.Page_Type = "Error";
		utag_data.Page_Section1 = "Other";
		utag_data.Page_Section2 = "ErrorHttp404";
		utag_data.Error_Source = "404";
		utag_data.Error_Code = "404 - page not found";
		utag_data.Error_Message = "404 - page not found";
		utag_data.Error_Details = window.location.href;
	},
	
	setServerErrorPage: function(){
		utag_data.Page_Type = "Error";
		utag_data.Page_Section1 = "Other";
		utag_data.Page_Section2 = "ErrorHttp500";
		utag_data.Error_Source = "Server";
		utag_data.Error_Code = "500 - Server error";
		utag_data.Error_Message = "An error has occurred. Please contact your system administrator.";
	},
	
	setTimeoutPage: function(){
		utag_data.Page_Type = "Error";
		utag_data.Page_Section1 = "Other";
		utag_data.Page_Section2 = "";
		utag_data.Error_Source = "Server";
		utag_data.Error_Code = "User session timeout";
		utag_data.Error_Message = "Timeout della sessione";
		//utag_data.Error_Details = window.location.href;
	},
	
	setMiniCart: function(){
		var utag = {'id': 'MiniCartOverlay-Open'};
		utag.Products = {};
		
		let productElem = $("#utagMinicartProductInfo");
		var partNumber = productElem.attr("info-partnumber") + "";

		utag.Products[partNumber] = {};
					
		utag.Products[partNumber].Sku = productElem.attr("info-partnumber");
		utag.Products[partNumber].Category = productElem.attr("info-category");
		utag.Products[partNumber].Brand = productElem.attr("info-brand");
		utag.Products[partNumber].ModelName = productElem.attr("info-model");
		
		var listPrice = productElem.attr("list-price");
		if(typeof listPrice == 'undefined' || listPrice == ''){
			listPrice = productElem.attr("total-price");
		}
		utag.Products[partNumber].Price = (parseFloat(productElem.attr("discounted-price")).toFixed(2)).toString();
		utag.Products[partNumber].PriceFull = (parseFloat(listPrice).toFixed(2)).toString();
		utag.Products[partNumber].Units = productElem.attr("info-quantity");
		utag.Products[partNumber].Engraving = "N";
		utag.Products[partNumber].Status = "Available";

		tealium_data2track.push(utag);
	},

	setExamContent: function(form){
		// create or recover array of exams. e.g: [{examNumber: 1, previousExam: "Y", ...},{}]
		// each exam object is like as follow:
		//   {
		//     examNumber: 1|2|3,
		//     previousExam: "Y"|"N",
		//     fitting: "Y"|"N",
		//     wornBefore: undefined|"Y"|"N",
		//   }
		if (typeof jsonExams === "undefined" || jsonExams === null) {
		    jsonExams = JSON.parse(sessionStorage.getItem("examContents"));
		    if (jsonExams === null) {
		        jsonExams = [];
            }
		}
		var exam = {};
		var dataExamNumber = form.attr("data-exam-number"); // string
		exam.examNumber = parseInt(dataExamNumber); // number
		exam.previousExam = $("#previousExam_" + dataExamNumber + "_yes").prop("checked") ? "Y" : "N";
		exam.fitting = $("#fitting_" + dataExamNumber + "_yes").prop("checked") ? "Y" : "N";
		if (exam.fitting === "Y") {
			exam.wornBefore = $("#contacts_" + dataExamNumber + "_yes").prop("checked") ? "Y" : "N";
		}
		// if exam already found then replace it
		var examIndex = -1;
		for (var i = 0; i < jsonExams.length; i++) {
			if (jsonExams[i].examNumber === exam.examNumber) {
				examIndex = i;
			}
		}
		if (examIndex === -1) {
			jsonExams.push(exam);
		} else {
			jsonExams[examIndex] = exam;
		}
	},
	
	setExamContentFlag: function() {
		if (typeof jsonExams !== "undefined" && jsonExams !== null) {
			sessionStorage.setItem("examContents", JSON.stringify(jsonExams));
		}
	},
	
//	setFilters: function(){
//		if($(".facet-subnav .facet-link.selected").length > 0){
//			utag_data.Events_SearchFiltering = "1";
//			var facetValues = "";
//			$(".facet-options>li").each(function() {
//				var specificFilter = $(this).attr("id");
//				if(typeof specificFilter !== 'undefined'){
//					specificFilter = specificFilter.split("-").pop() + "=";
//				}
//				var filters = [];
//				for(var i = 0; i < $(this).find(".facet-subnav .selected").length; i++){
//					filters.push($($(this).find(".facet-subnav .selected")[i]).attr("data-item").split(":").pop());
//				}
//				if(filters.length>0){
//					facetValues = facetValues + specificFilter + filters.join("|") + "&";
//				}
//			});
//			var lastCharPos = facetValues.length-1;
//			if(facetValues.length > 0 && facetValues[lastCharPos] === "&"){
//				facetValues = facetValues.substr(0, lastCharPos);
//			}
//			utag_data.Search_FacetValues_String = facetValues;
//			if($(".total-items").length > 0){
//				utag_data.Search_ResultItemsQnt = $($(".total-items")[0]).text();
//			}
//		}else{
//			utag_data.Events_SearchFiltering = "0";
//		}
//	},
	
	setPLPList: function(){
		
		var qty = $('#analyticsPDPItemsCount').val() || '0';
		
		utag_data.Search_FacetValues_String = '';
		utag_data.Events_SearchFiltering = '0';
		utag_data.Search_ResultItemsQnt = qty;
		
		utag_data.Products = {};
		
		$('.product_listing_container > ul.products-listing--list > li').each(function(i) {
			if (i == 24) { // only first 24 results
	            return false;
			}
			var partNumber = $(this).find(".product--img").attr("data-product-partnumber");
			var isVMEnabled = "0";
			if(typeof partNumber !== 'undefined'){		
			    partNumber = partNumber + "";
			    isVMEnabled = $("#isVirtualMirror"+partNumber).val();
				utag_data.Products[partNumber] = {};
				//utag_data.Products[partNumber].Vm_IsUpcSupported = isVMEnabled;
				utag_data.Products[partNumber].Conf_IsUpcSupported = "0";
			    utag_data.Products[partNumber].Engraving = "N";
			    //utag_data.Products[partNumber].OosOptions = "None";
			    utag_data.Products[partNumber].OosOptions = "";
			    utag_data.Products[partNumber].Status = "Available";				 
			    utag_data.Products[partNumber].FrameType = "STD";
			    utag_data.Products[partNumber].LensType = "PLANO";			     
			    utag_data.Products[partNumber].Units = "1";
				utag_data.Products[partNumber].BackOrder = "0";		
				var cat = $("#tileAnalyticsPT"+partNumber).val();
				if(typeof cat !== 'undefined'){	
					if (cat.toUpperCase() == "CONTACT_LENS") {
						cat = 'CONTACT LENSES';
					} else if (cat.toUpperCase() == "OPTICAL") {
						cat = 'OPTICS';
					}
				    utag_data.Products[partNumber].Category = cat;
				}				
				var sku = $("#tileAnalyticsSKU"+partNumber).val();
				if(typeof sku !== 'undefined'){	
					utag_data.Products[partNumber].Sku = sku;	
					let price,pricefull;
					price = $("#tileAnalyticsPrice" + sku).val();
					pricefull = $("#tileAnalyticsPriceFull" + sku).val();					
					price = parseFloat(price.replace('€', '').trim().replace('.','').replace(',','.')).toFixed(2);
					pricefull = parseFloat(pricefull.replace('€', '').trim().replace('.','').replace(',','.')).toFixed(2);
					if(typeof cat !== 'undefined' && cat == 'CONTACT LENSES'){
						price = $("#tileAnalyticsPrice" + sku).val();
						pricefull = $("#tileAnalyticsPriceFull" + sku).val();
						price = parseFloat(price.replace('€', '').trim().replace(',','.')).toFixed(2);
						pricefull = parseFloat(pricefull.replace('€', '').trim().replace(',','.')).toFixed(2);
						
					}
					utag_data.Products[partNumber].Price = price;
					utag_data.Products[partNumber].PriceFull = pricefull;
				}

			}
			
		});
		
	},
	
	setCartParams: function() {
	    let cartIsEmpty = false;

		var analyticsCartProductTotal = $('#analyticsCartProductTotal').val() || '0.0';
		var analyticsCartShipping = $('#analyticsCartShipping').val() || '';
		var analyticsCartDiscountTotal = $('#analyticsCartDiscountTotal').val() || '0.0';
		var analyticsCartDiscountName = cartJS.cartObjectProcessed ? cartJS.calculatePromoApplied(cartJS.cartObjectProcessed) : '';
		
		if (analyticsCartProductTotal != null && analyticsCartProductTotal.length > 0) {
			analyticsCartProductTotal = parseFloat(analyticsCartProductTotal).toFixed(2);
		}
		if (analyticsCartDiscountTotal != null && analyticsCartDiscountTotal.length > 0) {
			analyticsCartDiscountTotal = parseFloat(analyticsCartDiscountTotal).toFixed(2);
		}
		if (analyticsCartShipping != null && analyticsCartShipping.length > 0) {
			analyticsCartShipping = parseFloat(analyticsCartShipping).toFixed(2);
		}

		if(analyticsCartProductTotal == 0){
		    cartIsEmpty = true;
		}

		 utag_data.Page_Design = cartIsEmpty ? 'Empty' : '';
		
		utag_data.Order_ProductsAmount = analyticsCartProductTotal;
		utag_data.Order_DiscountAmount = analyticsCartDiscountTotal;
		utag_data.Order_DiscountName = analyticsCartDiscountName;
		
		utag_data.Order_GiftCardCode = ''; 


		if(!cartIsEmpty){
		    var analyticsCheckoutOrderId = $('#analyticsCheckoutOrderId').val();
		    utag_data.Order_CartId = analyticsCheckoutOrderId;
		}
		//utag_data.Order_Id = analyticsCheckoutOrderId;
		
		utag_data.Products = {};
		
		var upcs = $('.analyticsCartItemUPC').map(function() { return $(this).val(); });
		var skus = $('.analyticsCartItemSKU').map(function() { return $(this).val(); });
		var brands = $('.analyticsCartItemBrand').map(function() { return $(this).val(); });
		var cats = $('.analyticsCartItemCategory').map(function() { return $(this).val(); });
		var mocos = $('.analyticsCartItemMoco').map(function() { return $(this).val(); });
		var modelnames = $('.analyticsCartItemModelName').map(function() { return $(this).val(); });
		var urls = $('.analyticsCartItemUrl').map(function() { return $(this).val(); });
		var images = $('.analyticsCartItemImage').map(function() { return $(this).val(); });
		
		var sizes = $('.analyticsCartItemSize').map(function() { return $(this).val(); });
		var frameShapes = $('.analyticsCartItemFrameShape').map(function() { return $(this).val(); });

		var frameMaterials = $('.analyticsCartItemFrameMaterial').map(function() { return $(this).val(); });
		var lensTreatments = $('.analyticsCartItemLensTreatment').map(function() { return $(this).val(); });
		var lensTreatmentFacets = $('.analyticsCartItemLensTreatmentFacet').map(function() { return $(this).val(); });
		
		var prices = $('.analyticsCartItemPrice').map(function() { return $(this).val(); });
		var fullPrices = $('.analyticsCartItemFullPrice').map(function() { return $(this).val(); });
		var quantities = $('.analyticsCartItemQuantity').map(function() { return $(this).val(); });
		
		
		var skus3p1 = $('.analyticsCart3p1Items').map(function() { return $(this).val(); });
		var analyticsCartPromoCode = $('#analyticsCartPromoCode').val();
		
		if (analyticsCartPromoCode != null && analyticsCartPromoCode.length > 0
				&& skus3p1 != null && skus3p1.length > 0) {
			utag_data.Order_DiscountCode = analyticsCartPromoCode + ",3+1";
		} else if (analyticsCartPromoCode != null && analyticsCartPromoCode.length > 0) {
			utag_data.Order_DiscountCode = analyticsCartPromoCode;
		} else if (skus3p1 != null && skus3p1.length > 0) {
			utag_data.Order_DiscountCode = "3+1";
		} else {
			utag_data.Order_DiscountCode = "";
		}
		
		
		for (var i=0; i< upcs.length; i++) {
			var upc = upcs[i] + "";
			//upc = "'" + upcs[i] + "'";;
			
			utag_data.Products[upc] = {};

			utag_data.Products[upc].Brand = brands[i];
			
			var cat = cats[i];
			if (cat == "CONTACT_LENS") {
				cat = 'CONTACT LENSES';
			} else if (cat == "OPTICAL") {
				cat = 'OPTICS';
			}
			utag_data.Products[upc].Category = cat;
            utag_data.Products[upc].Sku = skus[i];
            utag_data.Products[upc].ModelName = modelnames[i];
			
			utag_data.Products[upc].Url = urls[i];
			utag_data.Products[upc].Image = images[i];
			utag_data.Products[upc].Shape = frameShapes[i];
			utag_data.Products[upc].FrameTechnology = frameMaterials[i];
			utag_data.Products[upc].LensTechnology = lensTreatments[i];
			if(lensTreatmentFacets[i] == 'Fotocromatica'){
                utag_data.Products[upc].LensTransition = lensTreatmentFacets[i];
                utag_data.Products[upc].LensAntiblue = '';
			}else if(lensTreatmentFacets[i] == 'Anti-Blue'){
                utag_data.Products[upc].LensTransition = '';
                utag_data.Products[upc].LensAntiblue = lensTreatmentFacets[i];
            }else {
                utag_data.Products[upc].LensTransition = '';
                utag_data.Products[upc].LensAntiblue = '';
            }
			
			//utag_data.Products[upc].Vm_IsUpcSupported = "0";
			utag_data.Products[upc].Conf_IsUpcSupported = "0";
		    utag_data.Products[upc].Engraving = "N";
		    utag_data.Products[upc].OosOptions = "";
		    utag_data.Products[upc].Status = "Available";
		    utag_data.Products[upc].Warranty = "0";
		    utag_data.Products[upc].CancelledAmount = '';
		    utag_data.Products[upc].TaxRate = '';
		    utag_data.Products[upc].Status = 'Available';
		    utag_data.Products[upc].FrameType = 'STD';
		    utag_data.Products[upc].LensType = 'PLANO';
		    utag_data.Products[upc].BackOrder = '0';
		    
		    utag_data.Products[upc].Units = quantities[i];
		    var totalItemPrice = prices[i];
		    var totalFullItemPrice = fullPrices[i] || prices[i];
		    var itemPrice = "0.00";
		    if (totalItemPrice != null) {
		    	
		    	totalItemPrice = parseFloat(totalItemPrice.replace('€', '').trim().replace('.','').replace(',','.')).toFixed(2);
		    	var supportItemPrice = totalItemPrice/quantities[i];
		    	if (supportItemPrice != null) {
		    		itemPrice = parseFloat(supportItemPrice).toFixed(2);
		    	}
		    	
		    	/* commented because itemprice is already discounted
		    	if (skus3p1 != null && skus3p1.length > 0 && $.inArray(upc, skus3p1) >= 0 && quantities[i] >= 4 ) {
		    		switch (quantities[i]%4) {
		    			case 0:
		    				itemPrice = itemPrice * 3/4;
		    				break;
		    			case 1:
		    				itemPrice = itemPrice * 4/5;
		    				break;
		    			case 2:
		    				itemPrice = itemPrice * 5/6;
		    				break;
		    			case 3:
		    				itemPrice = itemPrice * 6/7;
		    				break;
		    		}
		    		itemPrice = parseFloat(itemPrice).toFixed(2);
		    	}
		    	*/
		    }
		    
		    var fullItemPrice = "0.00";
		    if (totalFullItemPrice != null) {
		    	totalFullItemPrice = parseFloat(totalFullItemPrice.replace('€', '').trim().replace('.','').replace(',','.')).toFixed(2);
		    	var fullSupportItemPrice = totalFullItemPrice/quantities[i];
		    	if (fullSupportItemPrice != null) {
		    		fullItemPrice = parseFloat(fullSupportItemPrice).toFixed(2);
		    	}
		    }
		    utag_data.Products[upc].Price = itemPrice;
		    utag_data.Products[upc].PriceFull = fullItemPrice; //itemPrice; //fullPrices[i];		    
		}
	},
	
	setCheckoutDeliveryParams: function() {
		var analyticsCartProductTotal = $('#analyticsCartProductTotal').val();
		var analyticsCartShipping = $('#analyticsCartShipping').val();
		var analyticsCartDiscountTotal = $('#analyticsCartDiscountTotal').val();
		var analyticsCartDiscountName = $('#analyticsCartDiscountName').val();
		
		if (analyticsCartProductTotal != null && analyticsCartProductTotal.length > 0) {
			analyticsCartProductTotal = parseFloat(analyticsCartProductTotal).toFixed(2);
		}
		if (analyticsCartDiscountTotal != null && analyticsCartDiscountTotal.length > 0) {
			analyticsCartDiscountTotal = parseFloat(analyticsCartDiscountTotal).toFixed(2);
		}
		if (analyticsCartShipping != null && analyticsCartShipping.length > 0) {
			analyticsCartShipping = parseFloat(analyticsCartShipping).toFixed(2);
		}
		
		utag_data.Order_ProductsAmount = analyticsCartProductTotal;
		utag_data.Order_DiscountAmount = analyticsCartDiscountTotal;
		utag_data.Order_DiscountName = analyticsCartDiscountName;
		utag_data.Order_ShippingDeliveryDate =
				
		utag_data.Order_GiftCardCode = ''; 
		
		var analyticsCheckoutOrderId = $('#analyticsCheckoutOrderId').val();
		//utag_data.Cart_Id = analyticsCheckoutOrderId;
		//utag_data.Order_Id = analyticsCheckoutOrderId;

		utag_data.Products = {};
		
		var upcs = $('.analyticsCartItemUPC').map(function() { return $(this).val(); });
		var skus = $('.analyticsCartItemSKU').map(function() { return $(this).val(); });
		var cats = $('.analyticsCartItemCategory').map(function() { return $(this).val(); });
		var modelnames = $('.analyticsCartItemModelName').map(function() { return $(this).val(); });
		var urls = $('.analyticsCartItemUrl').map(function() { return $(this).val(); });
		var images = $('.analyticsCartItemImage').map(function() { return $(this).val(); });
		
		var mocos = $('.analyticsCartItemMoco').map(function() { return $(this).val(); });
		var brands = $('.analyticsCartItemBrand').map(function() { return $(this).val(); });
		var sizes = $('.analyticsCartItemSize').map(function() { return $(this).val(); });

		var frameShapes = $('.analyticsCartItemFrameShape').map(function() { return $(this).val(); });
        var frameMaterials = $('.analyticsCartItemFrameMaterial').map(function() { return $(this).val(); });
        var lensTreatments = $('.analyticsCartItemLensTreatment').map(function() { return $(this).val(); });
        var lensTreatmentFacets = $('.analyticsCartItemLensTreatmentFacet').map(function() { return $(this).val(); });
		
		var prices = $('.analyticsCartItemPrice').map(function() { return $(this).val(); });
		var fullPrices = $('.analyticsCartItemFullPrice').map(function() { return $(this).val(); });
		var quantities = $('.analyticsCartItemQuantity').map(function() { return $(this).val(); });
		
		
		var skus3p1 = $('.analyticsCart3p1Items').map(function() { return $(this).val(); });
		var analyticsCartPromoCode = $('#analyticsCheckoutPromoCode').val();
		
		if (analyticsCartPromoCode != null && analyticsCartPromoCode.length > 0
				&& skus3p1 != null && skus3p1.length > 0) {
			utag_data.Order_DiscountCode = analyticsCartPromoCode + ",3+1";
		} else if (analyticsCartPromoCode != null && analyticsCartPromoCode.length > 0) {
			utag_data.Order_DiscountCode = analyticsCartPromoCode;
		} else if (skus3p1 != null && skus3p1.length > 0) {
			utag_data.Order_DiscountCode = "3+1";
		} else {
			utag_data.Order_DiscountCode = "";
		}
		
		for (var i=0; i< upcs.length; i++) {
			//var upc = "'" + upcs[i] + "'";
			var upc = upcs[i] + "";
			
			utag_data.Products[upc] = {};
			utag_data.Products[upc].Sku = skus[i];
			
			var cat = cats[i];
			if (cat == "CONTACT_LENS") {
				cat = 'CONTACT LENSES';
			} else if (cat == "OPTICAL") {
				cat = 'OPTICS';
			}
			utag_data.Products[upc].Category = cat;

			utag_data.Products[upc].ModelName = modelnames[i];
			utag_data.Products[upc].Url = urls[i];
			utag_data.Products[upc].Image = images[i];

			utag_data.Products[upc].Shape = frameShapes[i];
            utag_data.Products[upc].FrameTechnology = frameMaterials[i];
            utag_data.Products[upc].LensTechnology = lensTreatments[i];
            if(lensTreatmentFacets[i] == 'Fotocromatica'){
                utag_data.Products[upc].LensTransition = lensTreatmentFacets[i];
                utag_data.Products[upc].LensAntiblue = '';
            }else if(lensTreatmentFacets[i] == 'Anti-Blue'){
                utag_data.Products[upc].LensTransition = '';
                utag_data.Products[upc].LensAntiblue = lensTreatmentFacets[i];
            }else {
                utag_data.Products[upc].LensTransition = '';
                utag_data.Products[upc].LensAntiblue = '';
            }
			
			utag_data.Products[upc].Brand = brands[i];
			
			//utag_data.Products[upc].Vm_IsUpcSupported = "0";
			utag_data.Products[upc].Conf_IsUpcSupported = "0";
		    utag_data.Products[upc].Engraving = "N";
		    utag_data.Products[upc].OosOptions = "";
		    utag_data.Products[upc].Status = "Available";
		    utag_data.Products[upc].Warranty = "0";
		    //utag_data.Products[upc].CancelledUnits = '';
		    utag_data.Products[upc].CancelledAmount = '';
		    utag_data.Products[upc].FrameType = 'STD';
            utag_data.Products[upc].LensType = 'PLANO';
            utag_data.Products[upc].BackOrder = '0';
            utag_data.Products[upc].TaxRate = '';

		    
		    utag_data.Products[upc].Units = quantities[i];
		    var totalItemPrice = prices[i];
		    var totalFullItemPrice = fullPrices[i] || prices[i];
		    var itemPrice = "0.00";
		    if (totalItemPrice != null) {
		    	//totalItemPrice = parseFloat(totalItemPrice.replace('€', '').replace('.','').replace(',','.').trim()).toFixed(2);
		    	totalItemPrice = parseFloat(totalItemPrice).toFixed(2);
		    	var supportItemPrice = totalItemPrice/quantities[i];
		    	if (supportItemPrice != null) {
		    		itemPrice = parseFloat(supportItemPrice).toFixed(2);
		    	}
		    	
		    	/* commented because itemprice is already discounted
		    	if (skus3p1 != null && skus3p1.length > 0 && $.inArray(upc, skus3p1) >= 0 && quantities[i] >= 4 ) {
		    		switch (quantities[i]%4) {
		    			case 0:
		    				itemPrice = itemPrice * 3/4;
		    				break;
		    			case 1:
		    				itemPrice = itemPrice * 4/5;
		    				break;
		    			case 2:
		    				itemPrice = itemPrice * 5/6;
		    				break;
		    			case 3:
		    				itemPrice = itemPrice * 6/7;
		    				break;
		    		}
		    		itemPrice = parseFloat(itemPrice).toFixed(2);
		    	}
		    	*/
		    }
		    var fullItemPrice = "0.00";
		    if (totalFullItemPrice != null) {
		        totalFullItemPrice = parseFloat(totalFullItemPrice).toFixed(2);
		        var fullSupportItemPrice = totalFullItemPrice/quantities[i];
		        if (fullSupportItemPrice != null) {
		            fullItemPrice = parseFloat(fullSupportItemPrice).toFixed(2);
		        }
		        		    	
		    	if (skus3p1 != null && skus3p1.length > 0 && $.inArray(upc, skus3p1) >= 0 && quantities[i] >= 4 ) {
		    		switch (quantities[i]%4) {
		    			case 0:
		    				itemPrice = fullItemPrice * 3/4;
		    				break;
		    			case 1:
		    				itemPrice = fullItemPrice * 4/5;
		    				break;
		    			case 2:
		    				itemPrice = fullItemPrice * 5/6;
		    				break;
		    			case 3:
		    				itemPrice = fullItemPrice * 6/7;
		    				break;
		    		}
		    		itemPrice = parseFloat(itemPrice).toFixed(2);
		    	}		    	
		    }
		    utag_data.Products[upc].Price = itemPrice;
		    utag_data.Products[upc].PriceFull = fullItemPrice //itemPrice;		    
		}
		
		window.analyticsProductsList = utag_data.Products;
	},
	
	asyncCheckoutPaymentPage: function() {
		var obj;
		try{
			var analyticsCartProductTotal = $('#analyticsCartProductTotal').val();
			var analyticsCartShipping = $('#analyticsCartShipping').val();
			var analyticsCartDiscountTotal = $('#analyticsCartDiscountTotal').val();
			var analyticsCartDiscountName = $('#analyticsCartDiscountName').val();
			
			if (analyticsCartProductTotal != null && analyticsCartProductTotal.length > 0) {
				analyticsCartProductTotal = parseFloat(analyticsCartProductTotal).toFixed(2);
			}
			if (analyticsCartDiscountTotal != null && analyticsCartDiscountTotal.length > 0) {
				analyticsCartDiscountTotal = parseFloat(analyticsCartDiscountTotal).toFixed(2);
			}
			if (analyticsCartShipping != null && analyticsCartShipping.length > 0) {
				analyticsCartShipping = parseFloat(analyticsCartShipping).toFixed(2);
			}
			
			var analyticsCartPromoCode = '';
			var skus3p1 = $('.analyticsCart3p1Items').map(function() { return $(this).val(); });
			var analyticsTempPromoCode = $('#analyticsCheckoutPromoCode').val();
			
			if (analyticsTempPromoCode != null && analyticsTempPromoCode.length > 0
					&& skus3p1 != null && skus3p1.length > 0) {
				analyticsCartPromoCode = analyticsTempPromoCode + ",3+1";
			} else if (analyticsTempPromoCode != null && analyticsTempPromoCode.length > 0) {
				analyticsCartPromoCode = analyticsTempPromoCode;
			} else if (skus3p1 != null && skus3p1.length > 0) {
				analyticsCartPromoCode = "3+1";
			} else {
				analyticsCartPromoCode = "";
			}
			
			var analyticsCheckoutOrderId = $('#analyticsCheckoutOrderId').val();
			var analyticsShopCartDisplayURL = $('#analyticsShopCartDisplayURL').val();
			var order = cartJS.cartObjectProcessed;
			var shippingModeHiddenFlag = $('#checkoutIsPickingUpInStore').val();
			var shippingMode  = 'Standard';
			var shippingType  = 'Home';
			if(order.orderItem[0].shipModeCode == 'Green') {
				shippingMode  = 'Green';
			}
			//TODO: metodo espresso
			if (shippingModeHiddenFlag == 'true' || shippingModeHiddenFlag == true) {
				shippingMode = 'Pick-up-point';
				shippingType = 'Store';
			}
			
			var deliveryDate = cartJS.getCart().orderItem[0].getExpectedDeliveryDate().split("-").reverse().join("-");
			
			var address = $('#analyticsCheckoutAddress').val() || '';
			var city = $('#analyticsCheckoutCity').val() || '';
			var province = $('#analyticsCheckoutProvince').val() || '';
			var zipCode = $('#analyticsCheckoutCap').val() || '';
			var state = 'Italia';
			
			var completeAddress = '' + address + ', ' + city + ' (' + province + ') ' + zipCode + ' ' + state;
			
			var emailSub = '0';
			if ($('#policynotice').is(':checked')) {
				emailSub = '1';
			}
			
			let paymentType = '';
			if(cartJS.getCart().hasGiftCard){
				paymentType = 'GiftCard';
			}

			let pageSection = 'Standard';
			if(CheckoutManager.oneClickCheckout.isOneClickCheckoutFlux()){
			    pageSection = 'Reorder';
			}
			obj = {
                id: 'VirtualPage-View',
                Page_Section1: 'Checkout',
                Page_Section2: pageSection,
                Page_Type: 'Payment',
                Products: window.analyticsProductsList,
                Order_CartId: analyticsCheckoutOrderId,
                //Order_Id: analyticsCheckoutOrderId,
                Order_CartUrl: location.origin + analyticsShopCartDisplayURL,
                Order_Currency: 'EUR',
                Order_ProductsAmount: analyticsCartProductTotal,
                Order_DiscountAmount: analyticsCartDiscountTotal,
                Order_GiftCardCode: '',
                Order_DiscountCode: analyticsCartPromoCode,
                Order_DiscountName: analyticsCartDiscountName,
                Order_ShippingAmount: analyticsCartShipping,
                Order_ShippingDiscount: '0.00',
                Order_ShippingTaxRate: '0.00',
                Order_ShippingType: shippingType,
                Order_ShippingDeliveryDate: deliveryDate,
                Order_TaxAmount: '0.00',
                Order_ShippingMode: shippingMode,
                Order_State: 'IT',
                Order_ZipCode: zipCode,
                Events_UserEmailSub: emailSub,
                Order_PaymentType: paymentType,
                User_LoginType: 'Standard',
                Page_Country: 'IT',
                Page_Language: 'IT',
                Page_Brand: "SV",
                Page_DeviceType: "X",
                Page_Platform: "WCS",
                Order_Currency: "EUR",
                User_LoginStatus: utag_data.User_LoginStatus
		   };

		   var userEmail = $('#email1').val();
            obj.User_Email_MD5 = md5(userEmail.toLowerCase());
            obj.User_Email_SHA256 = sha256(userEmail.toLowerCase());
            var userPhone = $('#phone1').val();
            obj.User_Phone_MD5 = md5(userPhone.toLowerCase());
            obj.User_Phone_SHA256 = sha256(userPhone.toLowerCase());

		   $.each(utag_data.Products, function(){
               if (this.Category == 'CONTACT LENSES') {
                   this.TaxRate = '0.04';
               } else {
                   this.TaxRate = '0.22';
               }               
           });
		   
		   $.each(obj.Products, function(){

               this.Price = this.Price.toFixed(2);
               this.PriceFull = this.PriceFull.toFixed(2);
               this.PricePerUnits = this.PricePerUnits.toFixed(2);
               this.PriceFullPerUnits = this.PriceFullPerUnits.toFixed(2);

           });
		   

		   
		   var that = CheckoutManager;
		   that.signUpEmailForPolicyNotice = null;
		   if ($('#policynotice').is(':checked') )
		   {
			   that.signUpEmailForPolicyNotice = $.trim( $('#email1').val() );			   
			   var User_Email_MD5 = md5(that.signUpEmailForPolicyNotice.toLowerCase());
							   
			   if(User_Email_MD5 != null && User_Email_MD5.trim().length > 0) {
				   if(User_Email_MD5 != null && User_Email_MD5.trim().length > 0) {
					obj["User_Email_MD5"] = User_Email_MD5;
				}
			   }
			   
			   var User_Email_SHA256 = sha256(that.signUpEmailForPolicyNotice.trim().toLowerCase());
			   
			   if(User_Email_SHA256 != null && User_Email_SHA256.trim().length > 0) {
				   if(User_Email_SHA256 != null && User_Email_SHA256.trim().length > 0) {
					obj["User_Email_SHA256"] = User_Email_SHA256;
				}
			   }
		   }

		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
			//console.log(obj);
		    tealium_data2track.push(obj);
		}
	},

	asyncCheckoutGateway: function(paymentType) {
		var obj;
		try{
			var analyticsCartProductTotal = $('#analyticsCartProductTotal').val();
			var analyticsCartShipping = $('#analyticsCartShipping').val();
			var analyticsCartDiscountTotal = $('#analyticsCartDiscountTotal').val();
			
			if (analyticsCartProductTotal != null && analyticsCartProductTotal.length > 0) {
				analyticsCartProductTotal = parseFloat(analyticsCartProductTotal).toFixed(2);
			}
			if (analyticsCartDiscountTotal != null && analyticsCartDiscountTotal.length > 0) {
				analyticsCartDiscountTotal = parseFloat(analyticsCartDiscountTotal).toFixed(2);
			}
			if (analyticsCartShipping != null && analyticsCartShipping.length > 0) {
				analyticsCartShipping = parseFloat(analyticsCartShipping).toFixed(2);
			}
			
			var analyticsCartPromoCode = '';
			var skus3p1 = $('.analyticsCart3p1Items').map(function() { return $(this).val(); });
			var analyticsTempPromoCode = $('#analyticsCheckoutPromoCode').val();
			
			if (analyticsTempPromoCode != null && analyticsTempPromoCode.length > 0
					&& skus3p1 != null && skus3p1.length > 0) {
				analyticsCartPromoCode = analyticsTempPromoCode + ",3+1";
			} else if (analyticsTempPromoCode != null && analyticsTempPromoCode.length > 0) {
				analyticsCartPromoCode = analyticsTempPromoCode;
			} else if (skus3p1 != null && skus3p1.length > 0) {
				analyticsCartPromoCode = "3+1";
			} else {
				analyticsCartPromoCode = "";
			}

			var analyticsCheckoutOrderId = $('#analyticsCheckoutOrderId').val();
			var order = cartJS.cartObjectProcessed;
			var shippingModeHiddenFlag = $('#checkoutIsPickingUpInStore').val();
			var shippingMode  = 'Standard';
			//TODO: metodo espresso
			if (shippingModeHiddenFlag == 'true' || shippingModeHiddenFlag == true) {
				shippingMode = 'Pick-up-point';
			}
			
			var zipCode = $('#analyticsCheckoutCap').val() || '';
			
			if (paymentType == 'MASTERCARD') {
				paymentType = 'MasterCard';
			} else if (paymentType == 'VISA') {
				paymentType = 'Visa';
			} else if (paymentType == 'AMEX') {
				paymentType = 'Amex';
			} else if (paymentType == 'PAYPAL') {
				paymentType = 'PayPal';
			} else if (paymentType == 'PayPal-EC') {
				paymentType = 'PayPalExpressCheckout';
			} else if (paymentType == 'GiftCard') {
				paymentType = 'GiftCard';
			} else if (paymentType == 'GiftCard,PPL') {
				paymentType = 'GiftCard,PPL';
			} else if (paymentType == 'GiftCard,CC') {
				paymentType = 'GiftCard,CC';
			} else if (paymentType == null) {
				paymentType = '';
			}

			let pageSection = 'Standard';
            if(CheckoutManager.oneClickCheckout.isOneClickCheckoutFlux()){
                pageSection = 'Reorder';
            }
			
			obj = {
		      id: 'Checkout-Step-Gateway', 
		      //Page_Type: 'Payment',
		      //Page_Section1: 'Checkout',
		      Page_Section2: pageSection,
		      Products: window.analyticsProductsList,
		      Order_CartId: analyticsCheckoutOrderId,
		      //Order_Id: analyticsCheckoutOrderId,
		      Order_Currency: 'EUR',
		      Order_ProductsAmount: analyticsCartProductTotal,
			  Order_DiscountAmount: analyticsCartDiscountTotal,
			  Order_GiftCardCode: '',
			  Order_DiscountCode: analyticsCartPromoCode,
			  Order_ShippingAmount: analyticsCartShipping,
			  Order_ShippingDiscount: '0.00',
			  Order_ShippingTaxRate: '0.00',
			  Order_TaxAmount: '0.00',
			  Order_ShippingMode: shippingMode,
			  Order_State: 'IT',
			  Order_ZipCode: zipCode,
			  Order_ShippingAddress: '',//completeAddress,
			  Order_Insured: '0',
			  Order_PaymentType: paymentType
		   };

		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
			//console.log(obj);
		    tealium_data2track.push(obj);
		}
	},
	
	setTYPCheckoutParams: function() {
		var analyticsCartProductTotal = $('#analyticsCartProductTotal').val();
		var analyticsCartShipping = $('#analyticsCartShipping').val();
		var analyticsCartDiscountTotal = $('#analyticsCartDiscountTotal').val();
		var analyticsTYPDiscountName = $('#analyticsTYPDiscountName').val();
		
		if (analyticsCartProductTotal != null && analyticsCartProductTotal.length > 0) {
			analyticsCartProductTotal = parseFloat(analyticsCartProductTotal).toFixed(2);
		}
		if (analyticsCartDiscountTotal != null && analyticsCartDiscountTotal.length > 0) {
			analyticsCartDiscountTotal = parseFloat(analyticsCartDiscountTotal).toFixed(2);
		}
		if (analyticsCartShipping != null && analyticsCartShipping.length > 0) {
			analyticsCartShipping = parseFloat(analyticsCartShipping).toFixed(2);
		}
		
		utag_data.Order_ProductsAmount = analyticsCartProductTotal;
		utag_data.Order_DiscountAmount = analyticsCartDiscountTotal;
		utag_data.Order_ShippingAmount = analyticsCartShipping;
		utag_data.Order_DiscountName = analyticsTYPDiscountName;
				
		utag_data.Order_GiftCardCode = ''; 
		
	
		var skus3p1 = $('.analyticsCart3p1Items').map(function() { return $(this).val(); });
		var analyticsCartPromoCode = $('#analyticsCheckoutPromoCode').val();
		
		if (analyticsCartPromoCode != null && analyticsCartPromoCode.length > 0
				&& skus3p1 != null && skus3p1.length > 0) {
			utag_data.Order_DiscountCode = analyticsCartPromoCode + ",3+1";
		} else if (analyticsCartPromoCode != null && analyticsCartPromoCode.length > 0) {
			utag_data.Order_DiscountCode = analyticsCartPromoCode;
		} else if (skus3p1 != null && skus3p1.length > 0) {
			utag_data.Order_DiscountCode = "3+1";
		} else {
			utag_data.Order_DiscountCode = "";
		}
		
		
		var analyticsCheckoutOrderId = $('#analyticsCheckoutOrderId').val();
		utag_data.Order_CartId = analyticsCheckoutOrderId;
		utag_data.Order_Id = analyticsCheckoutOrderId;
		
		var analyticsShopCartDisplayURL = $('#analyticsShopCartDisplayURL').val();
		utag_data.Order_CartUrl = location.origin + analyticsShopCartDisplayURL;
		
		var zipCode = $('#analyticsCheckoutCap').val() || '';
		var shippingMode = $('#analyticsCheckoutShipMode').val() || '';
		var shippingType  = 'Home';
		if (shippingMode.trim() == 'Ritiro in negozio s&v' || shippingMode.trim() == 'Ritiro in negozio' 
			|| shippingMode.trim() == 'PickupInStoreSV') {
			shippingMode = 'Pick-up-point';
			shippingType = 'Store';
		} else if (shippingMode == 'Spedizione standard' || shippingMode == 'Mail') {
			shippingMode = 'Standard';
		} else if (shippingMode == 'Spedizione espressa' || shippingMode == 'Spedizione Express') {
			shippingMode = 'Express';
		}

		var deliveryDate = $(".analyticsCartDeliveryDate")[0].value;
		
		var paymentType = $('#analyticsCheckoutPaymentType').val() || '';
		if (paymentType.includes('PayPal')) {
			if (window.localStorage.getItem('isPayPalEC') == "true") {
				paymentType = 'PayPalExpressCheckout';
			}
		}
		
		utag_data.Order_ShippingDiscount = '-'+analyticsCartShipping;
		utag_data.Order_ShippingTaxRate = '0.00';
		utag_data.Order_TaxAmount = '0.00';
		utag_data.Order_Type = '';
		utag_data.Order_PaymentInstallments = '';
		utag_data.Events_UserEmailSub = '0';
		utag_data.Order_State = 'IT';
		utag_data.Order_ShippingMode = shippingMode;
		utag_data.Order_ShippingType = shippingType;
		utag_data.Order_ShippingDeliveryDate = deliveryDate;
		utag_data.Order_ZipCode = zipCode;
		utag_data.Order_PaymentType = paymentType;
		utag_data.Order_Insured = '0';

		var userEmail = $('#userEmailTYP').val();
        utag_data.User_Email_MD5 = md5(userEmail.toLowerCase());
        utag_data.User_Email_SHA256 = sha256(userEmail.toLowerCase());
        var userPhone = $('#userPhoneTYP').val();
        if (userPhone.startsWith("+39")) userPhone = userPhone.substring(3);
        utag_data.User_Phone_MD5 = md5(userPhone.toLowerCase());
        utag_data.User_Phone_SHA256 = sha256(userPhone.toLowerCase());
		
		var analyticsTYPRecurringFrequency = $('#analyticsTYPRecurringFrequency').val();
		if (analyticsTYPRecurringFrequency != null && analyticsTYPRecurringFrequency.trim().length > 0) {
			analyticsTYPRecurringFrequency = analyticsTYPRecurringFrequency.replace(/\D/g,''); //keep only numbers
			if (analyticsTYPRecurringFrequency.trim().length == 0) {
				analyticsTYPRecurringFrequency = '1';
			}
			utag_data.Order_SubscriptionFrequency = analyticsTYPRecurringFrequency;
		} else {
			utag_data.Order_SubscriptionFrequency = '0';
		}

		utag_data.Products = {};
		
		var upcs = $('.analyticsCartItemUPC').map(function() { return $(this).val(); });
		var skus = $('.analyticsCartItemDisplaySku').map(function() { return $(this).val(); });
		var brands = $('.analyticsCartItemBrand').map(function() { return $(this).val(); });
		var cats = $('.analyticsCartItemCategory').map(function() { return $(this).val(); });
		var mocos = $('.analyticsCartItemMoco').map(function() { return $(this).val(); });
		var modelnames = $('.analyticsCartItemModelName').map(function() { return $(this).val(); });
		var urls = $('.analyticsCartItemUrl').map(function() { return $(this).val(); });
		var images = $('.analyticsCartItemImage').map(function() { return $(this).val(); });
		
		var prices = $('.analyticsCartItemPrice').map(function() { return $(this).val(); });
		var fullPrices = $('.analyticsCartItemFullPrice').map(function() { return $(this).val(); });
		var quantities = $('.analyticsCartItemQty').map(function() { return $(this).val(); });
		
		var sizes = $('.analyticsCartItemSize').map(function() { return $(this).val(); });
		var frameShapes = $('.analyticsCartItemFrameShape').map(function() { return $(this).val(); });

        var frameMaterials = $('.analyticsCartItemFrameMaterial').map(function() { return $(this).val(); });
        var lensTreatments = $('.analyticsCartItemLensTreatment').map(function() { return $(this).val(); });
        var lensTreatmentFacets = $('.analyticsCartItemLensTreatmentFacet').map(function() { return $(this).val(); });
		var types = $('.analyticsCartItemType').map(function() { return $(this).val(); });
		var taxrates = $('.analyticsCartItemTaxRate').map(function() { return $(this).val(); });
		
		for (var i=0; i< upcs.length; i++) {
			var upc = upcs[i] + "";
			
			utag_data.Products[upc] = {};
			
			if (skus[i] != null && skus[i]!= '') {
				utag_data.Products[upc].Sku = skus[i];
			} else {
				utag_data.Products[upc].Sku = mocos[i]; //skus[i];
			}
			
			utag_data.Products[upc].Brand = brands[i];

			var cat = cats[i];
			if (cat == "CONTACT_LENS") {
				cat = 'CONTACT LENSES';
			} else if (cat == "OPTICAL") {
				cat = 'OPTICS';
			}
			utag_data.Products[upc].Category = cat;

			utag_data.Products[upc].ModelName = modelnames[i];
			utag_data.Products[upc].Url = urls[i];
			utag_data.Products[upc].Image = images[i];

			utag_data.Products[upc].Shape = frameShapes[i];
            utag_data.Products[upc].FrameTechnology = frameMaterials[i];
            utag_data.Products[upc].LensTechnology = lensTreatments[i];
            if(lensTreatmentFacets[i] == 'Fotocromatica'){
                utag_data.Products[upc].LensTransition = lensTreatmentFacets[i];
                utag_data.Products[upc].LensAntiblue = '';
            }else if(lensTreatmentFacets[i] == 'Anti-Blue'){
                utag_data.Products[upc].LensTransition = '';
                utag_data.Products[upc].LensAntiblue = lensTreatmentFacets[i];
            }else {
                utag_data.Products[upc].LensTransition = '';
                utag_data.Products[upc].LensAntiblue = '';
            }

			utag_data.Products[upc].TaxRate = taxrates[i];
			utag_data.Products[upc].FrameType = 'STD';
            utag_data.Products[upc].LensType = 'PLANO';
            utag_data.Products[upc].BackOrder = '0';
			
			//utag_data.Products[upc].Vm_IsUpcSupported = "0";
			utag_data.Products[upc].Conf_IsUpcSupported = "0";
		    utag_data.Products[upc].Engraving = "N";
		    utag_data.Products[upc].Status = "Available";
		    utag_data.Products[upc].Warranty = "0";
		    
		    utag_data.Products[upc].Units = quantities[i];
		    var totalItemPrice = prices[i];
		    var totalFullItemPrice = fullPrices[i] || prices[i];
		    var itemPrice = parseFloat(totalItemPrice).toFixed(2);
		    var fullItemPrice = parseFloat(totalFullItemPrice).toFixed(2);
		    
		    if (skus3p1 != null && skus3p1.length > 0 && $.inArray(upc, skus3p1) >= 0 && quantities[i] >= 4 ) {
	    		switch (quantities[i]%4) {
	    			case 0:
	    				itemPrice = fullItemPrice * 3/4;
	    				break;
	    			case 1:
	    				itemPrice = fullItemPrice * 4/5;
	    				break;
	    			case 2:
	    				itemPrice = fullItemPrice * 5/6;
	    				break;
	    			case 3:
	    				itemPrice = fullItemPrice * 6/7;
	    				break;
	    		}
	    		itemPrice = parseFloat(itemPrice).toFixed(2);
	    	}
		    
		    utag_data.Products[upc].Price = itemPrice;
		    utag_data.Products[upc].PriceFull = fullItemPrice;		    
		}
	},
	
	setSearchPage: function(searchType, searchTerm, total){
		utag_data.Page_Type = "Search";
		utag_data.Page_Section1 = "Common";
		utag_data.Page_Section2 = "InternalSearch";
		
		utag_data.Events_SearchRun = '1';
		utag_data.Events_SearchFiltering = '0';
		
		utag_data.Search_Type = searchType;
		utag_data.Search_Keyword = searchTerm;
		utag_data.Search_ResultItemsQnt = total;
	},
	
	asyncSearchParams: function(quantity, facets) {
		var obj;
		try{
			obj = {
		      id: 'SearchFilterUpdated',
		      //Search_Keyword: keyword,
		      //Search_Type: type,
		      Search_ResultItemsQnt: quantity,
		      Search_FacetValues_String: facets,
		      //Events_SearchRun : searchRun,
		      Events_SearchFiltering: '1'
			};
		   
		    var keyword = utag_data.Search_Keyword;
			var type = utag_data.Search_Type;
			//var searchRun = utag_data.Events_SearchRun;
			
			if (utag_data.Search_Keyword != null && utag_data.Search_Keyword.trim().length > 0) {
				obj.Search_Keyword = utag_data.Search_Keyword;
			}
			if (utag_data.Search_Type != null && utag_data.Search_Type.trim().length > 0) {
				obj.Search_Type = utag_data.Search_Type;
			}
//			if (utag_data.Events_SearchRun != null && utag_data.Events_SearchRun.trim().length > 0) {
//				obj.Events_SearchRun = utag_data.Events_SearchRun;
//			} else {
//				obj.Events_SearchRun = '0';
//			}
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	forceClickEvent: function(elem){
		tealium_data2track.push({
		   id: 'Click', 
		   Tracking_Type: 'link',
		   Click_FocusElement: elem
		});
	},
	
	fullClickEvent: function(dataElem) {
		tealium_data2track.push({
		   id:'Click', 
		   Tracking_Type: 'simulated',
		   data_element_id: dataElem,
		   data_description: ''
		});
	},
	
	clickEvent: function(elem) {
		tealium_data2track.push({
		   id:'Click', 
		   data_element_id: elem
		});
	},	
	
	openImpression: function(elem) {
		tealium_data2track.push({
		   id:'Impression',
		   Page_Section2: elem
		});
	},
	
	setExamFittingBaet: function() {
		var regex = new RegExp( "[\\?&]sv_type=([^&#]*)" );
		var results = regex.exec( location.href );
		if (results != null && results.length > 0 && results[1] == '2') {
			utag_data.Exam_Fitting = '1';
		} else {
			utag_data.Exam_Fitting = '0';
		}
	},
	
	setBaetZipCode: function() {
		try {
			//var zipCode = window.localStorage.getItem('storeAddressText').match(/\ - (\d+)/)[1];
			var regex = new RegExp( "[\\?&]sv_storeAddressText=([^&#]*)" );
			var results = regex.exec( location.href );
			if (results != null && results.length > 0) {
				var zipcode = decodeURIComponent(results[1]);
				utag_data.Exam_ZipCode = zipcode.match(/\ - (\d+)/)[1];
			}
		} catch(err) {
			utag_data.Exam_ZipCode = "";
		}
	},
	
	asyncStoreLocatorBaetSearchParams: function(numStores, keyword) {
		var obj;
		try{
			var qnt = '0';
			if (numStores != null) {
				qnt = '' + numStores; 
			}
			
			if (keyword == null) {
				keyword = '';
			}
			
			var type = "text";
			if (keyword == '') {
				type = "geolocalized";
			}
			
			obj = {
		      id: 'Exam-Funnel-FindStoreResults',
		      Store_Search_Keyword: keyword,
		      Store_Search_Type: type,
		      Store_Search_ResultItemsQnt: qnt
			};
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	asyncBaetBookAgain: function(email){
		var obj;
		try{
			obj = {
		      id: 'Exam-Funnel-AddExam'
			};
		}catch(err){
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	
	asyncVMEvent: function(action) {
		var obj;
		try {
			//ACTION POSSIBLE VALUES: Ready, TryOn, RequestWebcam, WebcamAllowed, Render, FitGlasses, AdjustGlasses, CloseMirror
			obj = {
				id: 'VirtualMirror',
				Vm_Action: action || ''
			};
			
			var noProductActions = ['RequestWebcam', 'WebcamAllowed', 'CloseMirror'];
			
			if (noProductActions.indexOf(action) < 0) {
				var prod = window.analyticsProductPDP || {};
				obj.Products = prod;
			}
		} catch(err) {
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - ' + err.message,
		        Error_Detail: ''
		    };
		} finally {
			if(utag_data.Products_Category_Csv != 'CONTACT LENSES'){
				tealium_data2track.push(obj);
			}
		}
	},
	
	asyncVMError: function(error_number_code, parameter) {
		var obj = {};
		try {
			var prod = window.analyticsProductPDP || {};
			var upc = Object.keys(prod)[0] || '';
			var divId = 'vm-virtual-mirror-wrapper';
			
			var VMErrors = {
				'1': {
					id: 'Error',
					Error_Source: 'Client',
					Error_Code: 'Vm - InvalidParametersError',
					Error_Details: parameter + ' parameter is invalid'
				},
				'2': {
					id: 'Error',
					Error_Source: 'Server',
					Error_Code: 'Vm - UpcSupportedError',
					Error_Details: 'failed to determine if upc ' + upc + ' is supported'
				},
				'3': {
					id: 'Error',
					Error_Source: 'Server',
					Error_Code: 'Vm - UpcMissingError',
					Error_Details: 'Upc ' + upc + ' could not be found'
				},
				'4': {
					id: 'Error',
					Error_Source: 'User',
					Error_Code: 'Vm - WebcamNotFoundError',
					Error_Details: 'webcam not found'
				},
				'5': {
					id: 'Error',
					Error_Source: 'User',
					Error_Code: 'Vm - WebcamRejectedError',
					Error_Details: 'webcam access was rejected by user'
				},
				'6': {
					id: 'Error',
					Error_Source: 'Client',
					Error_Code: 'Vm - MountComponentError',
					Error_Details: '"failed to mount component at divId: ' + divId
				},
				'7': {
					id: 'Error',
					Error_Source: 'Client',
					Error_Code: 'Vm - UnmountComponentError',
					Error_Details: 'failed to unmount component at divId: ' + divId
				}
			};
			
			obj = VMErrors[error_number_code];
			
		} catch(err) {
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - ' + err.message,
		        Error_Detail: ''
		    };
		} finally {
		    tealium_data2track.push(obj);
		}
	},
	
	asyncCartError: function(error_number_code) {
		var obj = {};
		try {
			
			var CartErrors = {
				'1': {
					id: 'Error',
					Error_Source: 'User',
					Error_Code: 'Cart - MixedCartStellaError',
					Error_Details: 'it is not possible to have a mixed cart with a Stella product'
				}
			};
			
			obj = CartErrors[error_number_code];
			
		} catch(err) {
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - ' + err.message,
		        Error_Detail: ''
		    };
		} finally {
		    tealium_data2track.push(obj);
		}
	},
	
	asyncRegistrationPasswordError: function() {
		var obj = {};
		try {
			obj = {
				id : 'Error',
				Error_Source: 'User',
				Error_Code: 'Form Filling Error',
				Error_Message: 'La password inserita non soddisfa i requisiti',
				Error_Details: 'La password inserita non soddisfa i requisiti'
			};
		} catch(err) {
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - ' + err.message,
		        Error_Detail: ''
		    };
		} finally {
		    tealium_data2track.push(obj);
		}
	},
	
	asyncRegistrationError: function() {
		var obj = {};
		try {
			obj = {
				id : 'Error',
				Error_Source: 'User',
				Error_Code: 'Form Filling Error',
				Error_Message: 'La form contiene degli errori',
				Error_Details: 'La form contiene degli errori'
			};
		} catch(err) {
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - ' + err.message,
		        Error_Detail: ''
		    };
		} finally {
		    tealium_data2track.push(obj);
		}
	}	
	
}

var isBrowserSupported = function() {
	//CHECKING IF IT'S IE
	return /MSIE|Trident/.test(window.navigator.userAgent) ? '0' : '1';
}