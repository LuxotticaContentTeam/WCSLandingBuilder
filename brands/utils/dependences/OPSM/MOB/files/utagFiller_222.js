utagFiller = {
	/*** vars updated at every glasses PDP load and usueful only for ajax requests ***/
	partNumber: null,
	name: null,
	buyable: null,
	pageLoaded: false,
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
			Page_Language: 'EN',
			Page_Brand: "OPSM",
			Page_DeviceType: "X",
			Page_Platform: "WCS",
			User_LoginType: "Standard",
		};
		config = config ? config : {};
		$.extend(utag_data, baseConfig, config);
		
		/*
		utag_data.User_LoginStatus = "Guest";
		if (constants && constants.ajaxParams && constants.ajaxParams['loggedIn']){
			utag_data.user_id = constants.ajaxParams['userId'];
			utag_data.User_LoginStatus = "Logged";
			utag_data.User_Id = constants.ajaxParams['userId'];
		}
		*/
		//this.setMiniCartId();
	},
	
//	utagFiller.checkPasswordPolicy()
	checkPasswordPolicy: function() {
		var obj = {
				id: 'Error',
				Error_Source: 'User',
				Error_Code: 'Form Filling Error',
				Error_Message: '$error message shown in page$',
				Error_Details: '$technical error code$'
		}
		tealium_data2track.push(obj);
	},
	
	sentCancellationConfirm: function() {
		var obj = {
				id:'Event',
				Page_Type:'Cancellation',
				Page_Section1: 'Exam',
				Exam_PatientNum: '',
				Events_FunnelCancellation: '1'
		}
		tealium_data2track.push(obj);
	},
	
	setUser: function(config) {
		config = config ? config : {};
		$.extend(utag_data, config);
	},
	
	asyncSendCancellationExam: function() {
		var obj = {
	        id: 'Event',
	        Exam_PatientNum: '1',
	        Events_FunnelCancellation: '1'
	    };
		tealium_data2track.push(obj);
	},
	
	asyncSendError: function(errmessage, errdetails = '') {
		var obj = {
	        id: 'Error',
	        Error_Source: 'Server',
	        Error_Code: 'utag_data syntax',
	        Error_Details: errdetails,
	        Error_Message: errmessage
	    };
		tealium_data2track.push(obj);
	},
	
	asyncSendErrorEvolved: function(errmessage, source, code) {
		var obj = {};
		try{
			if (errmessage != null && errmessage.trim().length > 0) {
				errmessage = errmessage.trim();
				obj.Error_Message = this.UTILDecodeEntities(errmessage);
			}
			obj.id = 'Error';
		    obj.Error_Source = source;
	        //Error_Details: message,
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
	
	asyncSendErrorEvolvedDetails: function(errdetails, errmessage, source, code) {
		var obj = {};
		try{
			if (errdetails && errdetails.length && errdetails.trim().length > 0) {
				errdetails = errdetails.trim();
				obj.Error_Details = this.removeUnwantedParams(errdetails);
			}
			if (errmessage && errmessage.length && errmessage.trim().length > 0) {
				errmessage = errmessage.trim();
				obj.Error_Message = this.UTILDecodeEntities(errmessage);
			}
			if (code && code.length) {
				code = code.trim();
				obj.Error_Code = code;
			}
			obj.id = 'Error';
		    obj.Error_Source = source && source.length ? source : "Server";
		}catch(err){
			obj = {
		        id: 'Error',
		        Error_Source: source || "Server",
		        Error_Details: errdetails || '',
		        Error_Message: errmessage || '',
		        Error_Code: code || ''
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
		var md5email = "";
		if (email != null & email.length > 4) {
			//convert email to md5
			md5email = md5(email.trim().toLowerCase());
		}
		
		var obj;
		try{
		   obj = {
		      id: 'SignupForm',
		      User_Email_MD5  : md5email,
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
			utag_data.User_Email_MD5 = md5email;
		    tealium_data2track.push(obj);
		}
	},
	
	asyncUserLogon: function(){
		var email = $('#username').val();
		var md5email = "";
		if (email != null & email.length > 4) {
			//convert email to md5
			md5email = md5(email.trim().toLowerCase());
		}
		
		var obj;
		try{
		   obj = {
		      id: 'Login',
		      User_Email_MD5  : md5email,
		      User_Segments: "",
		      User_Id: "",
		      User_CrmId: ""
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
	
	asyncUserRegister: function(){
		var email = $('#email').val();
		var md5email = "";
		if (email != null & email.length > 4) {
			//convert email to md5
			md5email = md5(email.trim().toLowerCase());
		}
		
		var obj;
		try{
		   obj = {
		      id: 'Account-Create',
		      User_Email_MD5  : md5email,
		      User_Segments: "",
		      User_Id: "",
		      User_CrmId: ""
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
	setPatientNum: function(patientNum) {
		if(typeof patientNum !== 'undefined'){
			utag_data.Exam_PatientNum = patientNum; 
		}
	},
	setProductSelected: function(productSelected) {
		if(typeof productSelected !== 'undefined'){
			utag_data.Exam_ProductSelected = productSelected; 
		}
	},
	setExamId: function(esamId) {
		if(typeof esamId !== 'undefined'){
			utag_data.Exam_Id = esamId; 
		}
	},
	setAppointmentDate: function(appointmentDate) {
		if(typeof appointmentDate !== 'undefined'){
			utag_data.Exam_AppointmentDate = appointmentDate; 
		}
	},
	setFunnelCancellation: function(funnelCancellation) {
		if(typeof funnelCancellation !== 'undefined'){
			utag_data.Events_FunnelCancellation = funnelCancellation; 
		}
	},
	setQuestions: function(fitting,previousExam,wornBefore) {
		if(typeof fitting !== 'undefined'){
			utag_data.Exam_Fitting = fitting; 
		}
		if(typeof previousExam !== 'undefined'){
			utag_data.Exam_PreviousExam = previousExam; 
		}
		if(typeof wornBefore !== 'undefined'){
			utag_data.Exam_WornBefore = wornBefore; 
		}
	},
	setUserActivationPage: function(pageType, section1, section2, section3){		
		utag_data.Page_Type = pageType;
		if(typeof section1 === 'undefined'){
			section1 = pageType;
		}
		utag_data.Page_Section1 = section1;
		if(typeof section2 !== 'undefined'){
			utag_data.Page_Section2 = section2;
		}
		if(typeof section3 !== 'undefined'){
			var md5email = "";
			if (section3 != null & section3.length > 4) {
				//convert email to md5
				md5email = md5(section3.trim().toLowerCase());
				utag_data.User_Email_MD5 = md5email;
			}
		}
	},
	
	setCurrency: function(currency) {
		utag_data.Order_Currency = currency;
	},
	
	setCurrencyAndCart: function(currency, cart) {
		utag_data.Order_Currency = currency;
		utag_data.Order_CartId = cart;
	},
	
	setZipCode: function(zipCode) {
		if (zipCode != null) {
			zipCode = zipCode.trim();
		}
		utag_data.Exam_ZipCode = zipCode || '';
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
			}
			
			if (section1!= null && breadcrumbItems.length > 2) {
				section2 = $(breadcrumbItems[2]).text();
				
				section2 = this.toUpper(section2);
				if (section2 == "OCCHIALI DA VISTA") {
					section2 = 'OPTICS';
				}
			}
		}
	
		var toReturn = { section1: section1, section2: section2};
		return toReturn;
	},
	
	setContactOpsm: function(pageType, section1, section2){
		utag_data.Page_Type = "Static";
		utag_data.Page_Section1 = "Common";
		utag_data.Page_Section2 = "ContactOPSM";
		utag_data.Events_ActionContactUs = "1";
	},
	
	canUpdate : false,
	
	setSearchParams: function(keyword, type, resultItemsQnt){
		utag_data.Search_Keyword = keyword;
		utag_data.Search_Type = type;
		utag_data.Search_ResultItemsQnt = resultItemsQnt;
		
		utag_data.Events_SearchRun = "1";
	},
	
	setExamPageInfo: function(zipCode, currentPage) {
		utag_data.Page_Section1 = "Exam";
		utag_data.Page_Section2 = "";
		if (currentPage !== "ThankYouSchedulingPage") {
			utag_data.Page_Type = "Review";
		} else {
			utag_data.Page_Type = "Confirmation";
		}
		utag_data.Exam_ZipCode = zipCode.trim();
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
	
//	setOtherPage: function(type, name, section){
//		utag_data.Page_Type = type;
//		utag_data.Page_Section1 = name;
//		utag_data.Page_Section2 = section;
//	},
	
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
		utag_data.Error_Message = "Sorry, we can't see that page";
		
		var url = window.location.href;
		if (url != null && url.length>0) {
			//utag_data.Error_Details = encodeURIComponent(url);
			utag_data.Error_Details = url;
		} else {
			utag_data.Error_Details = "";
		}
	},
	
	setServerErrorPage: function(){
		utag_data.Page_Type = "Error";
		utag_data.Page_Section1 = "Other";
		utag_data.Page_Section2 = "ErrorHttp500";
		utag_data.Error_Source = "Server";
		utag_data.Error_Code = "Internal Server error 500";
		utag_data.Error_Message = "An error has occurred. Please contact your system administrator.";
		var url = window.location.href;
		if (url != null && url.length>0) {
			utag_data.Error_Details = this.removeUnwantedParams(url);
		} else {
			utag_data.Error_Details = "";
		}
	},
	
	setGenericErrorPage: function(){
		utag_data.Page_Type = "Error";
		utag_data.Page_Section1 = "Other";
		utag_data.Page_Section2 = "";
		utag_data.Error_Source = "Server";
		utag_data.Error_Code = "Generic Server error";
		utag_data.Error_Message = "";
		var url = window.location.href;
		if (url != null && url.length>0) {
			utag_data.Error_Details = this.removeUnwantedParams(url);
		} else {
			utag_data.Error_Details = "";
		}
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
	
	setPLPParams: function() {
		utag_data.Vm_IsBrowserSupported = isBrowserSupported_VM();
		
		utag_data.Search_FacetValues_String = '';
		utag_data.Events_SearchFiltering = '0';
		
		utag_data.Products = {};
		
		var upcs = $('.analyticsItemUPC').map(function() { return $(this).val(); });
		var clUpcs = $('.analyticsPLPCLUpc').map(function() { return $(this).val(); });
		var skus = $('.analyticsItemSKU').map(function() { return $(this).val(); });
		var prices = $('.analyticsProductPrice').map(function() { return $(this).val(); });
		var fullPrices = $('.analyticsProductPriceFull').map(function() { return $(this).val(); });
		var availabilities = $('.analyticsItemAvailable').map(function() { return $(this).val(); });
		var categories = $('.analyticsItemCategory').map(function() { return $(this).val(); });
		
		//utag_data.Search_ResultItemsQnt = "0";
		if (upcs != null) {
			//utag_data.Search_ResultItemsQnt = "" + upcs.length;
			for (var i=0; i< upcs.length; i++) {
				var upc = upcs[i] + "";
				if (clUpcs[i] != null && clUpcs[i] != "") {
					upc = clUpcs[i] + "";
				}
				
				utag_data.Products[upc] = {};
				if (skus != null && skus.length > i) {
					utag_data.Products[upc].Sku = "" + skus[i];
				}
				if (prices != null && prices.length > i) {
					var doublePrice = parseFloat(prices[i]).toFixed(2);
					utag_data.Products[upc].Price = "" + doublePrice;
				}
				if (fullPrices != null && fullPrices.length > i) {
					var doubleFullPrice = parseFloat(fullPrices[i]).toFixed(2);
					utag_data.Products[upc].PriceFull = "" + doubleFullPrice;
				}
				if (availabilities != null && availabilities.length > i) {
					var available = "Not-for-sale";
					if (availabilities[i] == 'true') {
						available = "Available";
					}
					utag_data.Products[upc].Status = available;
				}
				if (categories != null && categories.length > i) {
					var tempCat = "" + categories[i];
					if (tempCat.toUpperCase().trim() == 'FRAMES' || tempCat.toUpperCase().trim() == 'GLASSES' || tempCat.toUpperCase().trim() == 'OPTICS') {
						tempCat = 'OPTICS';
					} else if (tempCat.toUpperCase().trim() == 'SUNGLASSES' || tempCat.toUpperCase().trim() == 'SUN') {
						tempCat = 'SUN';
					}
					utag_data.Products[upc].Category = tempCat;
				}
				
				utag_data.Products[upc].Vm_IsUpcSupported = "0";
				utag_data.Products[upc].Conf_IsUpcSupported = "0";
			    utag_data.Products[upc].Engraving = "N";
			    utag_data.Products[upc].OosOptions = "None";
			    utag_data.Products[upc].LensUPC = "None";
			}
		}
	},
	
	pushFacets: function() {
		var finalFacets = "";
		if (opsm!= null && opsm.filters != null) {
			var facets = opsm.filters.selectedFilter;
			if (facets != null) {
				for (var i=0; i<facets.length; i++) {
					finalFacets += facets[i].filter;
					finalFacets += "=";
					finalFacets += facets[i].text.trim();
					finalFacets += "|";
				}
				if (finalFacets.length > 0) {
					finalFacets = finalFacets.slice(0, -1);
				}
			}
		}
		
//		if (!this.pageLoaded) {
//			this.pageLoaded = true;
//			
//			var obj;
//			try{
//			   obj = {
//			      id: 'Loading-Ready',
//			      Search_FacetValues_String : finalFacets
//			   };
//			    
//			}catch(err){
//			   obj = {
//			        id: 'Loading-Error',
//			        Error_Source: 'Server',
//			        Error_Code: 'utag_data syntax - '+err.message,
//			        Error_Detail: ''
//			    };
//			}
//			finally{
//			    tealium_data2track.push(obj);
//			}
//		} else {
		if (finalFacets != null && finalFacets.trim().length > 0) {
			utagFiller.asyncSetPLPParams(finalFacets);
		}
//		}
		
	},
	
	asyncSetPLPParams: function(finalFacets) {
		var obj;
		try{
			var Products = {};
			
			var upcs = $('.analyticsItemUPC').map(function() { return $(this).val(); });
			var clUpcs = $('.analyticsPLPCLUpc').map(function() { return $(this).val(); });
			var skus = $('.analyticsItemSKU').map(function() { return $(this).val(); });
			var prices = $('.analyticsProductPrice').map(function() { return $(this).val(); });
			var fullPrices = $('.analyticsProductPriceFull').map(function() { return $(this).val(); });
			var availabilities = $('.analyticsItemAvailable').map(function() { return $(this).val(); });
			var categories = $('.analyticsItemCategory').map(function() { return $(this).val(); });
			
			//var Search_ResultItemsQnt = "0";
			if (upcs != null) {
				//var Search_ResultItemsQnt = "" + upcs.length;
				for (var i=0; i< upcs.length; i++) {
					var upc = upcs[i] + "";
					if (clUpcs[i] != null && clUpcs[i] != "") {
						upc = clUpcs[i] + "";
					}
					
					Products[upc] = {};
					if (skus != null && skus.length > i) {
						Products[upc].Sku = "" + skus[i];
					}
					
					if (prices != null && prices.length > i) {
						var doublePrice = parseFloat(prices[i]).toFixed(2);
						Products[upc].Price = "" + doublePrice;
					}
					if (fullPrices != null && fullPrices.length > i) {
						var doubleFullPrice = parseFloat(fullPrices[i]).toFixed(2);
						Products[upc].PriceFull = "" + doubleFullPrice;
					}
					
					if (availabilities != null && availabilities.length > i) {
						var available = "Not-for-sale";
						if (availabilities[i] == 'true') {
							available = "Available";
						}
						Products[upc].Status = available;
					}
					if (categories != null && categories.length > i) {
						var tempCat = "" + categories[i];
						if (tempCat.toUpperCase().trim() == 'FRAMES' || tempCat.toUpperCase().trim() == 'GLASSES' || tempCat.toUpperCase().trim() == 'OPTICS') {
							tempCat = 'OPTICS';
						} else if (tempCat.toUpperCase().trim() == 'SUNGLASSES' || tempCat.toUpperCase().trim() == 'SUN') {
							tempCat = 'SUN';
						}
						Products[upc].Category = tempCat;
					}
					
					Products[upc].Vm_IsUpcSupported = "0";
					Products[upc].Conf_IsUpcSupported = "0";
				    Products[upc].Engraving = "N";
				    Products[upc].OosOptions = "None";
				    Products[upc].LensUPC = "None";
				}
			}
			
			var recordSetTotal = $('#analyticsSearchRecordSetTotal').val();
			var recordContentSetTotal = $('#analyticsSearchRecordContentSetTotal').val();
			var plpItemsQnt = $('#analyticsPLPTotal').val();
			
			var resultItemsQnt = "0";
			if (plpItemsQnt != null && plpItemsQnt.length > 0) {
				if (recordContentSetTotal != null && recordContentSetTotal.length > 0) {
					resultItemsQnt = '' + (parseInt(plpItemsQnt, 10) + parseInt(recordContentSetTotal, 10));
				} else {
					resultItemsQnt = plpItemsQnt;
				}
			} else if (recordContentSetTotal != null && recordContentSetTotal.length > 0) {
				resultItemsQnt = recordContentSetTotal;
			}
			
			if (!finalFacets) {
				finalFacets = "";
			}
		   obj = {
		      id: 'SearchFilterUpdated', 
		      Vm_IsBrowserSupported: "0", 
//		      Events_SearchFiltering: "0",
		      Events_SearchFiltering: (finalFacets.split('=').length - 1) < 0 ? "0" : (finalFacets.split('=').length - 1) + "",
		      Search_ResultItemsQnt: resultItemsQnt,
		      Search_FacetValues_String: finalFacets,
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
		    tealium_data2track.push(obj);
		}
	},
	
	asyncPromocodeTentative: function(promocode) {
		var obj;
		try{
		   obj = {
		      id: 'OrderDiscountCode-Tentative',
		      Order_DiscountCode : promocode
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
	
	asyncPromocodeApplied: function(promocode) {
		var obj;
		try{
		   obj = {
		      id: 'OrderDiscountCode-Applied',
		      Order_DiscountCode : promocode
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
	
	PDPBuildProduct: function() {
		var Products = {};
		var vm_IsUpcSupported = 0;
		if($('#try-on-btn').length){
			vm_IsUpcSupported = 1;
		}
		var upc = $('#analyticsPDPUpc').val() + "";
		var clUpc = $('#analyticsPDPCLUpc').val();
		
		if (clUpc != null && clUpc != "") {
			upc = clUpc + "";
		}
		
		if (typeof upc !== 'undefined' && upc != null) {
			var analyticsPDPModelCode = $('#analyticsPDPModelCode').val();
			var analyticsPDPManufacturer = $('#analyticsPDPManufacturer').val() || 'OPSM';
			var analyticsPDPImage = $('#analyticsPDPImage').val();
			var analyticsPDPAvailable = $('#analyticsPDPAvailable').val();
			var analyticsOOSOptions = $('#analyticsOOSOptions').val() || "";
			var analyticsPDPOfferPrice = $('#analyticsPDPOfferPrice').val();
			var analyticsPDPFullPrice = $('#analyticsPDPFullPrice').val();
			var analyticsPDPName = $('#analyticsPDPName').val() + "";
			var analyticsPDPCategory = $('#analyticsPDPCategory').val();
			
			var analyticsPDPMatType = $('#analyticsPDPMatType').val();
			var analyticsPDPShape = $('#analyticsPDPShape').val();
			var analyticsPDPSunglassesLensColor = $('#analyticsPDPSunglassesLensColor').val();
			var analyticsPDPLensColor = $('#analyticsPDPLensColor').val();
			var analyticsPDPColor = $('#analyticsPDPColor').val();
			
			var analyticsPDPSize = $('#analyticsPDPSize').val() || "";
			var analyticsPDPType = $('#analyticsPDPType').val();
			var analyticsPDPFrameType = $('#analyticsPDPFrameType').val() || "STD";
			var analyticsPDPBadges = $('#analyticsPDPBadges').val() || "";
			
			var analyticsPDPIsRX = $('#analyticsPDPIsRX').val();
			var analyticsPDPIsPolarized = $('#analyticsPDPIsPolarized').val();
			
			var analyticsLensType = $('#analyticsLensType').val() || "PLANO";
			
			//CALCULATE LENS TECHNOLOGY
			var lensTechnology = "";
			if (analyticsPDPIsPolarized != null && analyticsPDPIsPolarized.length > 0) {
				lensTechnology = "Polarized";
			} else if (analyticsPDPIsRX != null && analyticsPDPIsRX.length > 0) {
				lensTechnology = "RX";
			}
//			if (analyticsPDPIsRX != null && analyticsPDPIsRX.length > 0 && analyticsPDPIsPolarized != null && analyticsPDPIsPolarized.length > 0) {
//				lensTechnology = "Polarized,RX";
//			} else if (analyticsPDPIsRX != null && analyticsPDPIsRX.length > 0) {
//				lensTechnology = "RX";
//			} else if (analyticsPDPIsPolarized != null && analyticsPDPIsPolarized.length > 0) {
//				lensTechnology = "Polarized";
//			}
			
			//CALCULATE LENS COLOR
			var lensColor = analyticsPDPSunglassesLensColor;
			if (lensColor == null || lensColor.length == 0) {
				lensColor = analyticsPDPLensColor;
			}
			
			//FIX MULTIPLE VALUES
			if (analyticsPDPMatType!= null) {
				analyticsPDPMatType = analyticsPDPMatType.split(',')[0];
			}
			if (analyticsPDPShape!= null) {
				analyticsPDPShape = analyticsPDPShape.split(',')[0];
			}
			if (lensColor!= null) {
				lensColor = lensColor.split(',')[0];
			}
			if (analyticsPDPColor!= null) {
				analyticsPDPColor = analyticsPDPColor.split(',')[0];
			}
			
			//OVERRIDE IF CONTACT LENSES
			var analyticsPDPOfferPriceSubscription = $('#analyticsPDPOfferPriceSubscription').val();
			if (analyticsPDPOfferPriceSubscription != null && analyticsPDPOfferPriceSubscription.length > 0) {
				analyticsPDPOfferPrice = analyticsPDPOfferPriceSubscription;
				var analyticsPDPOfferPrice1 = parseFloat(analyticsPDPOfferPrice).toFixed(2);
				analyticsPDPOfferPrice = "" + analyticsPDPOfferPrice1;
			}
			//remove $
			if (analyticsPDPOfferPrice != null && analyticsPDPOfferPrice.length > 0) {
				analyticsPDPOfferPrice = analyticsPDPOfferPrice.replace('$', '').trim();
				var analyticsPDPOfferPrice1 = parseFloat(analyticsPDPOfferPrice).toFixed(2);
				analyticsPDPOfferPrice = "" + analyticsPDPOfferPrice1;
			}
			if (analyticsPDPFullPrice != null && analyticsPDPFullPrice.length > 0) {
				analyticsPDPFullPrice = analyticsPDPFullPrice.replace('$', '').trim();
				var analyticsPDPFullPrice1 = parseFloat(analyticsPDPFullPrice).toFixed(2);
				analyticsPDPFullPrice = "" + analyticsPDPFullPrice1;
			}
			
			Products[upc] = {};
			
			Products[upc].OosOptions = analyticsOOSOptions;
			Products[upc].Vm_IsUpcSupported = "" + vm_IsUpcSupported;
			Products[upc].Conf_IsUpcSupported = "0";
		    Products[upc].Engraving = "N";
		    Products[upc].Vto = "NotAvailable";
		    Products[upc].LensUPC = "None";
		    
		    Products[upc].Url = encodeURIComponent(window.location.href);
		    
			Products[upc].Sku = analyticsPDPModelCode || upc;
			Products[upc].MoCo = "None"; //<-- change this when available in the catalog attributes
			Products[upc].Category = analyticsPDPCategory; //section1Value || 
			
			Products[upc].Status = analyticsPDPAvailable;
			Products[upc].Price = analyticsPDPOfferPrice;
			Products[upc].PriceFull = analyticsPDPFullPrice;
			Products[upc].Brand = analyticsPDPManufacturer;
			Products[upc].ModelName = analyticsPDPName;
			//Products[upc].Stock = 
			Products[upc].Image = encodeURIComponent(analyticsPDPImage);
			
			Products[upc].LensColor = lensColor;
			Products[upc].LensTechnology = lensTechnology;
			Products[upc].FrameColor = analyticsPDPColor;
			Products[upc].FrameTechnology = analyticsPDPMatType;
			Products[upc].Shape = analyticsPDPShape;
			
			Products[upc].Size = analyticsPDPSize;
			Products[upc].Type = analyticsPDPType;
			Products[upc].FrameType = analyticsPDPFrameType;
			Products[upc].Badges = analyticsPDPBadges;
			
			Products[upc].LensType = analyticsLensType;
		}
		
		return Products;
	},
	
	setPDPParams: function() {
		utag_data.Vm_IsBrowserSupported = 0;
		if($('#try-on-btn').length){
			utag_data.Vm_IsBrowserSupported = isBrowserSupported_VM();
		}
		
		var _Products = this.PDPBuildProduct();
//		utag_data.Products = {};
		
		utag_data.Products = _Products;
		var upc = Object.keys(_Products)[0] || null;
		
		if (upc != null && upc.length) {
			upc = upc + '';
			
			if (utag_data.Page_Section2 == null || utag_data.Page_Section2.length == 0) {
				utag_data.Page_Section2 = upc;
			}
			var section1Value = $('#analyticsPDPSection1').val();
			if (section1Value != null && section1Value.length > 0) {
				utag_data.Page_Section1 = section1Value;
			}
		}
	},
	
	asyncAddToFavorites: function(element) {
		var products = {};
		
		var upc = $(element).attr("data-analytics-upc") + "";
		var sku = $(element).attr("data-analytics-sku");
		var category = $(element).attr("data-analytics-category");
		
		if (category != null) {
			if (category.toUpperCase().trim() == 'FRAMES' || category.toUpperCase().trim() == 'GLASSES' || category.toUpperCase().trim() == 'OPTICS') {
				category = 'OPTICS';
			} else if (category.toUpperCase().trim() == 'SUNGLASSES' || category.toUpperCase().trim() == 'SUN') {
				category = 'SUN';
			}
		}
		
		if (upc != null) {
			products[upc] = {};
			
			products[upc].OosOptions = "None";
			products[upc].Vm_IsUpcSupported = "0";
			products[upc].Conf_IsUpcSupported = "0";
			products[upc].Engraving = "N";
			products[upc].LensUPC = "None";
		    
			products[upc].Sku = sku;
			products[upc].Category = category;
			//products[upc].Moco = 
		}
		
		var obj;
		try{
		   obj = {
		      id: 'ProdFavAdd',
		      Vm_IsBrowserSupported: '0',
		      Products: products
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
	
	asyncPDPContactLensChange: function() {
		var obj;
		try{
			var upc = $('#analyticsPDPUpc').val() + "";
			var datas = {};
			datas.Products = {};
			
			if (typeof upc !== 'undefined' && upc != null) {
				var analyticsPDPModelCode = $('#analyticsPDPModelCode').val();
				var analyticsPDPManufacturer = $('#analyticsPDPManufacturer').val();
				var analyticsPDPImage = $('#analyticsPDPImage').val();
				var analyticsPDPAvailable = $('#analyticsPDPAvailable').val();
				var analyticsPDPOfferPrice = $('#analyticsPDPOfferPrice').val();
				var analyticsPDPFullPrice = $('#analyticsPDPFullPrice').val();
				var analyticsPDPName = $('#analyticsPDPName').val();
				var analyticsPDPCategory = $('#analyticsPDPCategory').val();
				
				var analyticsPDPMatType = $('#analyticsPDPMatType').val();
				var analyticsPDPShape = $('#analyticsPDPShape').val();
				var analyticsPDPSunglassesLensColor = $('#analyticsPDPSunglassesLensColor').val();
				var analyticsPDPLensColor = $('#analyticsPDPLensColor').val();
				var analyticsPDPColor = $('#analyticsPDPColor').val();
				
				var analyticsPDPSize = $('#analyticsPDPSize').val() || "";
				var analyticsPDPType = $('#analyticsPDPType').val();
				
				var analyticsPDPIsRX = $('#analyticsPDPIsRX').val();
				var analyticsPDPIsPolarized = $('#analyticsPDPIsPolarized').val();
				
				//CALCULATE LENS TECHNOLOGY
				var lensTechnology = "";
				if (analyticsPDPIsPolarized != null && analyticsPDPIsPolarized.length > 0) {
					lensTechnology = "Polarized";
				} else if (analyticsPDPIsRX != null && analyticsPDPIsRX.length > 0) {
					lensTechnology = "RX";
				}

				//CALCULATE LENS COLOR
				var lensColor = analyticsPDPSunglassesLensColor;
				if (lensColor == null || lensColor.length == 0) {
					lensColor = analyticsPDPLensColor;
				}
				
				//FIX MULTIPLE VALUES
				if (analyticsPDPMatType!= null) {
					analyticsPDPMatType = analyticsPDPMatType.split(',')[0];
				}
				if (analyticsPDPShape!= null) {
					analyticsPDPShape = analyticsPDPShape.split(',')[0];
				}
				if (lensColor!= null) {
					lensColor = lensColor.split(',')[0];
				}
				if (analyticsPDPColor!= null) {
					analyticsPDPColor = analyticsPDPColor.split(',')[0];
				}
				
				//OVERRIDE IF CONTACT LENSES
				var analyticsPDPOfferPriceSubscription = $('#analyticsPDPOfferPriceSubscription').val();
				if (analyticsPDPOfferPriceSubscription != null && analyticsPDPOfferPriceSubscription.length > 0) {
					analyticsPDPOfferPrice = analyticsPDPOfferPriceSubscription;
				}
				//remove $
				if (analyticsPDPOfferPrice != null && analyticsPDPOfferPrice.length > 0) {
					analyticsPDPOfferPrice = analyticsPDPOfferPrice.replace('$', '').trim();
				}
				if (analyticsPDPFullPrice != null && analyticsPDPFullPrice.length > 0) {
					analyticsPDPFullPrice = analyticsPDPFullPrice.replace('$', '').trim();
				}
				
				datas.Products[upc] = {};
				
				datas.Products[upc].OosOptions = "None";
				datas.Products[upc].Vm_IsUpcSupported = "0";
				datas.Products[upc].Conf_IsUpcSupported = "0";
			    datas.Products[upc].Engraving = "N";
			    datas.Products[upc].LensUPC = "None";
			    
			    datas.Products[upc].Url = encodeURIComponent(window.location.href);
			    
				datas.Products[upc].Sku = analyticsPDPModelCode;
				//datas.Products[upc].Moco = 
				datas.Products[upc].Category = analyticsPDPCategory;
				datas.Products[upc].Status = analyticsPDPAvailable;
				datas.Products[upc].Price = analyticsPDPOfferPrice;
				datas.Products[upc].PriceFull = analyticsPDPFullPrice;
				datas.Products[upc].Brand = analyticsPDPManufacturer;
				datas.Products[upc].ModelName = analyticsPDPName;
				//datas.Products[upc].Stock = 
				datas.Products[upc].Image = encodeURIComponent(analyticsPDPImage);
				
				datas.Products[upc].LensColor = lensColor;
				datas.Products[upc].LensTechnology = lensTechnology;
				datas.Products[upc].FrameColor = analyticsPDPColor
				datas.Products[upc].FrameTechnology = analyticsPDPMatType;
				datas.Products[upc].Shape = analyticsPDPShape;	
				
				datas.Products[upc].Size = analyticsPDPSize;
				datas.Products[upc].Type = analyticsPDPType;

				var totalQty =0 ;
				var boxes_left = $("#left-boxes").val(),
					boxes_right = $("#right-boxes").val();
				
				if (boxes_left > 0) {
					totalQty = totalQty + parseInt(boxes_left);
					if (boxes_right > 0) {
						totalQty = totalQty + parseInt(boxes_right);
					}
				} else {
					totalQty = totalQty + parseInt(boxes_right);
				}
				
				datas.Products[upc].Units = "" + totalQty;
			}
			
			obj = {
		      id: 'Prods-Update',
		      Vm_IsBrowserSupported: '0',
		      Products: datas.Products
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
	
	asyncAddToCartPDPParams: function(el) {
		
		var datas = {};
		datas.Vm_IsBrowserSupported = "0";
		datas.Products = {};
		
		if (typeof el !== 'undefined' && el != null) {
			var upc = $(el).attr('data-analytics-upc') + "";
			
			if (typeof upc !== 'undefined' && upc != null) {
				
				datas.Products[upc] = {};
				
				datas.Products[upc].OosOptions = "None";
				datas.Products[upc].Vm_IsUpcSupported = "0";
				datas.Products[upc].Conf_IsUpcSupported = "0";
			    datas.Products[upc].Engraving = "N";
			    datas.Products[upc].Status = 'Available';
			    datas.Products[upc].LensUPC = "None";
			    
			    var category = $(el).attr('data-analytics-category');
			    if (category != null) {
					if (category.toUpperCase().trim() == 'FRAMES' || category.toUpperCase().trim() == 'GLASSES' || category.toUpperCase().trim() == 'OPTICS') {
						category = 'OPTICS';
					} else if (category.toUpperCase().trim() == 'SUNGLASSES' || category.toUpperCase().trim() == 'SUN') {
						category = 'SUN';
					}
				}
			    
			    datas.Products[upc].Sku = $(el).attr('data-analytics-sku');
			    datas.Products[upc].Brand = $(el).attr('data-analytics-brand');
			    datas.Products[upc].Category = category;
			    datas.Products[upc].Price = $(el).attr('data-analytics-price').replace('$','');
			    
			    datas.Products[upc].ModelName = $(el).attr('data-analytics-modelname');
			    datas.Products[upc].Image = encodeURIComponent($(el).attr('data-analytics-image'));
			    datas.Products[upc].Url = encodeURIComponent($(el).attr('data-analytics-url'));
			    
			    var analyticsLensColor = $(el).attr('data-analytics-lenscolor');
				if (analyticsLensColor!= null) {
					datas.Products[upc].LensColor = analyticsLensColor.split(',')[0];
				}
				var analyticsPDPShape = $(el).attr('data-analytics-shape');
				if (analyticsPDPShape!= null) {
					datas.Products[upc].Shape = analyticsPDPShape.split(',')[0];
				}
				var analyticsFrameTechnology = $(el).attr('data-analytics-frametech');
				if (analyticsFrameTechnology!= null) {
					datas.Products[upc].FrameTechnology = analyticsFrameTechnology.split(',')[0];
				}
				var analyticsFrameColor = $(el).attr('data-analytics-framecolor');
				if (analyticsFrameColor!= null) {
					datas.Products[upc].FrameColor = analyticsFrameColor.split(',')[0];
				}

			}
		} else {
			//COPIED FROM setPDPParams
			
			var upc = $('#analyticsPDPUpc').val() + "";
			var clUpc = $('#analyticsPDPCLUpc').val();
			
			if (clUpc != null && clUpc != "") {
				upc = clUpc + "";
			}
			
			if (typeof upc !== 'undefined' && upc != null) {
				var analyticsPDPModelCode = $('#analyticsPDPModelCode').val();
				var analyticsPDPManufacturer = $('#analyticsPDPManufacturer').val();
				var analyticsPDPImage = $('#analyticsPDPImage').val();
				var analyticsPDPAvailable = $('#analyticsPDPAvailable').val();
				var analyticsPDPOfferPrice = $('#analyticsPDPOfferPrice').val();
				var analyticsPDPFullPrice = $('#analyticsPDPFullPrice').val();
				var analyticsPDPName = $('#analyticsPDPName').val();
				var analyticsPDPCategory = $('#analyticsPDPCategory').val();
				
				var analyticsPDPMatType = $('#analyticsPDPMatType').val();
				var analyticsPDPShape = $('#analyticsPDPShape').val();
				var analyticsPDPSunglassesLensColor = $('#analyticsPDPSunglassesLensColor').val();
				var analyticsPDPLensColor = $('#analyticsPDPLensColor').val();
				var analyticsPDPColor = $('#analyticsPDPColor').val();
				
				var analyticsPDPSize = $('#analyticsPDPSize').val() || "";
				var analyticsPDPType = $('#analyticsPDPType').val();
				
				var analyticsPDPIsRX = $('#analyticsPDPIsRX').val();
				var analyticsPDPIsPolarized = $('#analyticsPDPIsPolarized').val();
				
				//CALCULATE LENS TECHNOLOGY
				var lensTechnology = "";
				if (analyticsPDPIsPolarized != null && analyticsPDPIsPolarized.length > 0) {
					lensTechnology = "Polarized";
				} else if (analyticsPDPIsRX != null && analyticsPDPIsRX.length > 0) {
					lensTechnology = "RX";
				}

				//CALCULATE LENS COLOR
				var lensColor = analyticsPDPSunglassesLensColor;
				if (lensColor == null || lensColor.length == 0) {
					lensColor = analyticsPDPLensColor;
				}
				
				//FIX MULTIPLE VALUES
				if (analyticsPDPMatType!= null) {
					analyticsPDPMatType = analyticsPDPMatType.split(',')[0];
				}
				if (analyticsPDPShape!= null) {
					analyticsPDPShape = analyticsPDPShape.split(',')[0];
				}
				if (lensColor!= null) {
					lensColor = lensColor.split(',')[0];
				}
				if (analyticsPDPColor!= null) {
					analyticsPDPColor = analyticsPDPColor.split(',')[0];
				}
				
				//OVERRIDE IF CONTACT LENSES
				if ( $( "#lens-preview-toggler" ).length ) {
					if ($('#lens-preview-toggler').is(':checked')) {
						var analyticsPDPOfferPriceSubscription = $('#analyticsPDPOfferPriceSubscription').val();
						if (analyticsPDPOfferPriceSubscription != null && analyticsPDPOfferPriceSubscription.length > 0) {
							analyticsPDPOfferPrice = analyticsPDPOfferPriceSubscription;
						}
					} else {
						analyticsPDPOfferPrice = analyticsPDPFullPrice;
					}
				}
				//remove $
				if (analyticsPDPOfferPrice != null && analyticsPDPOfferPrice.length > 0) {
					analyticsPDPOfferPrice = analyticsPDPOfferPrice.replace('$', '').trim();
				}
				if (analyticsPDPFullPrice != null && analyticsPDPFullPrice.length > 0) {
					analyticsPDPFullPrice = analyticsPDPFullPrice.replace('$', '').trim();
				}
				
				datas.Products[upc] = {};
				
				datas.Products[upc].OosOptions = "None";
				datas.Products[upc].Vm_IsUpcSupported = "0";
				datas.Products[upc].Conf_IsUpcSupported = "0";
			    datas.Products[upc].Engraving = "N";
			    datas.Products[upc].LensUPC = "None";
			    
			    datas.Products[upc].Url = encodeURIComponent(window.location.href);
			    
				datas.Products[upc].Sku = analyticsPDPModelCode;
				//datas.Products[upc].Moco = 
				datas.Products[upc].Category = analyticsPDPCategory;
				datas.Products[upc].Status = analyticsPDPAvailable;
				datas.Products[upc].Price = analyticsPDPOfferPrice;
				datas.Products[upc].PriceFull = analyticsPDPFullPrice;
				datas.Products[upc].Brand = analyticsPDPManufacturer;
				datas.Products[upc].ModelName = analyticsPDPName;
				//datas.Products[upc].Stock = 
				datas.Products[upc].Image = encodeURIComponent(analyticsPDPImage);
				
				datas.Products[upc].LensColor = lensColor;
				datas.Products[upc].LensTechnology = lensTechnology;
				datas.Products[upc].FrameColor = analyticsPDPColor
				datas.Products[upc].FrameTechnology = analyticsPDPMatType;
				datas.Products[upc].Shape = analyticsPDPShape;
				
				datas.Products[upc].Size = analyticsPDPSize;
				datas.Products[upc].Type = analyticsPDPType;
				
				var totalQty =0 ;
				var boxes_left = $("#left-boxes").val(),
					boxes_right = $("#right-boxes").val();
				
				if (boxes_left > 0) {
					totalQty = totalQty + parseInt(boxes_left);
					if (boxes_right > 0) {
						totalQty = totalQty + parseInt(boxes_right);
					}
				} else if (boxes_right > 0) {
					totalQty = totalQty + parseInt(boxes_right);
				} else {
					totalQty = 1;
				}
				
				datas.Products[upc].Units = "" + totalQty;
			}
		}
		
		var obj;
		try{
		   obj = {
		      id: 'AddToCart', 
		      Vm_IsBrowserSupported: datas.Vm_IsBrowserSupported,
		      Products: datas.Products
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
	
	asyncOpenMiniCart: function() {
		
		//var products = {}
		//retrieve and add products
		
		var obj;
		try{
		   obj = {
		      id: 'MiniCartOverlay-Open',
		      //Products : products,
		      Vm_IsBrowserSupported: "0"
		      
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
	
	setCartParams: function() {
		if(restOrderAggr || false){
			//the restOrder.totalProductPrice = ORDER (exclude discounts, it is sum of listPrice or offerPrice when PST)
			utag_data.Order_ProductsAmount = parseFloat(restOrderAggr.totalProductPrice).toFixed(2);
			utag_data.Order_DiscountAmount = (parseFloat(restOrderAggr.totalAdjustment) + parseFloat(restOrderAggr.totalShippingCharge)).toFixed(2);
			//utag_data.Order_GiftCardCode = '';
			var orderDiscountCodes = [];
			for (var k=0; k < restOrderAggr.adjustment.length; k++) {
				let adj = restOrderAggr.adjustment[k];
				if(adj.usage != 'Shipping Adjustment'){
					let code = adj.code.split('-');
					code.splice(-1);
					orderDiscountCodes.push(code.join('-'));
				}
			}
			utag_data.Order_DiscountName = orderDiscountCodes.join(',');
			utag_data.Page_Design = "";
			utag_data.Products = {};
			if(restOrderAggr.x_orderItemAggr || false){
				for (var i=0; i< restOrderAggr.x_orderItemAggr.length; i++) {
					let item = restOrderAggr.x_orderItemAggr[i];
					
					let upc = item.partNumber + "";
					let //price = parseFloat(item.unitPrice),
						price = $('.js-cart-item[data-itemid^="' + item.orderItemId +'"]').find('.analyticsCartItemPrice').val(),
						quantity = parseInt(item.x_quantity),
						fullPrice = $('.js-cart-item[data-itemid^="' + item.orderItemId +'"]').find('.analyticsCartItemFullPrice').val(),
						category = $('.js-cart-item[data-itemid^="' + item.orderItemId +'"]').find('.analyticsCartItemCategory').val();
					const isAggregated = item.x_aggrItem.length > 0;
					//const isAggrCL = isAggregated && extAttrib = CL_REF
					const isRX = typeof item.x_orderItemLens !== 'undefined';
					
					utag_data.Products[upc] = {};
					utag_data.Products[upc].BackOrder = "0";
//					utag_data.Products[upc].Vm_IsUpcSupported = "0";
					utag_data.Products[upc].Conf_IsUpcSupported = "0";
				    utag_data.Products[upc].Engraving = "N";
				    //utag_data.Products[upc].OosOptions = "";
				    utag_data.Products[upc].Status = "Available";
					utag_data.Products[upc].Units = quantity + "";
					utag_data.Products[upc].Category = category;
					utag_data.Products[upc].Type = "STD";
					utag_data.Products[upc].LensType = "PLANO";
					utag_data.Products[upc].FrameType = "STD";
					utag_data.Products[upc].LensUPC = "";
					utag_data.Products[upc].LensUPC = "";
					utag_data.Products[upc].Sku = $('.js-cart-item[data-itemid^="' + item.orderItemId +'"]').find('.subtitle-prod').text().split('-')[0].trim();
					utag_data.Products[upc].ModelName = $('.js-cart-item[data-itemid^="' + item.orderItemId +'"]').find('.subtitle-prod').text().split('-')[0].trim();
					
					if(isRX){
						//price += parseFloat(item.x_orderItemLens.unitPrice);
						
						utag_data.Products[upc].LensUPC = item.x_orderItemLens.partNumber || "";
						utag_data.Products[upc].Type = "RX";
						
						utag_data.Products[upc].LensType = "RX";
//						utag_data.Products[upc].LensAntiblue = "true";
//			            utag_data.Products[upc].LensAntiReflective = "true";
//			            utag_data.Products[upc].LensTransition = 
//			            utag_data.Products[upc].LensDesign = 
//			            utag_data.Products[upc].LensType = 
//			            utag_data.Products[upc].LensIndex = 
//			            utag_data.Products[upc].LensBrand = 
//			            utag_data.Products[upc].LensTreatment = 
//			            utag_data.Products[upc].LensPolarized = 
					}

					//utag_data.Products[upc].Price = price.toFixed(2) + "";
					
					if (price != null && price.length > 0) {
						var price1 = parseFloat(price).toFixed(2);
						utag_data.Products[upc].Price = "" + price1
					}
					if (fullPrice != null && fullPrice.length > 0) {
						var fullPrice1 = parseFloat(fullPrice).toFixed(2);
						utag_data.Products[upc].PriceFull = "" + fullPrice1
					}
					//utag_data.Products[upc].Price = price + "";
				    //utag_data.Products[upc].PriceFull = fullPrice + "";
				}
			}
			
		}
		
	},
	setCartParamsOld: function() {
		var analyticsCartProductDiscount = $('#analyticsCartProductDiscount').val();
		var analyticsCartOrderLevelDiscount = $('#analyticsCartOrderLevelDiscount').val();
		var analyticsCartProductTotal = $('#analyticsCartProductTotal').val();
		var analyticsCartFreeGift = $('#analyticsCartFreeGift').val();
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
		
		if (analyticsCartDiscountTotal == '0.00') {
			analyticsCartDiscountTotal = '-' + analyticsCartDiscountTotal;
		}
		
		utag_data.Order_ProductsAmount = analyticsCartProductTotal;
		utag_data.Order_DiscountAmount = analyticsCartDiscountTotal;
		//utag_data.Order_ShippingAmount = analyticsCartShipping;
		
		var analyticsCartPromoCodeApplied = $('#analyticsCartPromoCodeApplied').val();
		
		utag_data.Order_GiftCardCode = '';
		utag_data.Order_DiscountCode = analyticsCartPromoCodeApplied;
		
		utag_data.Products = {};
		
		var upcs = $('.analyticsCartItemUPC').map(function() { return $(this).val(); });
		var cats = $('.analyticsCartItemCategory').map(function() { return $(this).val(); });
		var prices = $('.analyticsCartItemPrice').map(function() { return $(this).val(); });
		var fullPrices = $('.analyticsCartItemFullPrice').map(function() { return $(this).val(); });
		var quantities = $('.analyticsCartItemQuantity').map(function() { return $(this).val(); });

		for (var i=0; i< upcs.length; i++) {
			var upc = upcs[i] + "";
			
			// THIS IS REPETITION // TODO MOVE IN A COMMON FUNCTION
			var rxInfo = this.getRxInfo(upc);
			
			if (rxInfo && rxInfo.action == 'merge') {
				utag_data.Products[upc] = {};
				// new
				
			    utag_data.Products[upc].Price = rxInfo.data.totalPackOItemPriceNUM+"";
			    utag_data.Products[upc].PriceFull = rxInfo.data.totalPackOItemPriceNUM+"";
				
				utag_data.Products[upc].Type = "RX";
				//utag_data.Products[upc].LensColor = (lens.xLensColor) ? lens.xLensColor : "";
				utag_data.Products[upc].LensUPC = (rxInfo.data.lensItemPartN) ? rxInfo.data.lensItemPartN : "";
	            if (rxInfo.data.lensCatentItem.antiBlue && rxInfo.data.lensCatentItem.antiBlue.match(/true/i)) {
	            	utag_data.Products[upc].LensAntiblue = "true";
	            }
	            if (rxInfo.data.lensCatentItem.antiReflective && rxInfo.data.lensCatentItem.antiReflective.match(/true/i)) {
	            	utag_data.Products[upc].LensAntiReflective = "true";
	            }
	            utag_data.Products[upc].LensTransition = (rxInfo.data.lensCatentItem.transitionType) ? rxInfo.data.lensCatentItem.transitionType : "";
	            utag_data.Products[upc].LensDesign = (rxInfo.data.lensCatentItem.lensDesign) ? rxInfo.data.lensCatentItem.lensDesign : "";
	            utag_data.Products[upc].LensType = (rxInfo.data.lensCatentItem.correctionType) ? rxInfo.data.lensCatentItem.correctionType : "";
	            utag_data.Products[upc].LensIndex = (rxInfo.data.lensCatentItem.lensIndex) ? rxInfo.data.lensCatentItem.lensIndex : "";
	            utag_data.Products[upc].LensBrand = (rxInfo.data.lensCatentItem.lensBrand) ? rxInfo.data.lensCatentItem.lensBrand : "";
	            utag_data.Products[upc].LensTreatment = (rxInfo.data.lensCatentItem.lensTreatment) ? rxInfo.data.lensCatentItem.lensTreatment : "";
	            utag_data.Products[upc].LensPolarized = (rxInfo.data.lensCatentItem.lensPolarised) ? rxInfo.data.lensCatentItem.lensPolarised : "";
	            
				// new end
				
				utag_data.Products[upc].Category = cats[i];
				
				utag_data.Products[upc].Vm_IsUpcSupported = "0";
				utag_data.Products[upc].Conf_IsUpcSupported = "0";
			    utag_data.Products[upc].Engraving = "N";
			    utag_data.Products[upc].Status = "Available";
			    
			    utag_data.Products[upc].Units = quantities[i];
				continue
			} else if (rxInfo && rxInfo.action == 'skip') {
				continue;
			}
			// END - THIS IS REPETITION // TODO MOVE IN A COMMON FUNCTION
			
			utag_data.Products[upc] = {};
			utag_data.Products[upc].Category = cats[i];
			
			utag_data.Products[upc].Vm_IsUpcSupported = "0";
			utag_data.Products[upc].Conf_IsUpcSupported = "0";
		    utag_data.Products[upc].Engraving = "N";
		    utag_data.Products[upc].OosOptions = "None";
		    utag_data.Products[upc].Status = "Available";
		    utag_data.Products[upc].LensUPC = "None";
		    
		    utag_data.Products[upc].Units = quantities[i];
		    utag_data.Products[upc].Price = prices[i];
		    utag_data.Products[upc].PriceFull = fullPrices[i];		    
		}
	},
	asyncBAETFindStore: function(zipCode){
		var obj;
		try{
			if (zipCode != null) {
				zipCode = zipCode.trim();
			}
			
		   obj = {
		      id: 'Exam-Funnel-FindStoreResults', 
		      Exam_ZipCode: zipCode || '',
		      Store_Search_Keyword: zipCode || '',
		      Store_Search_Type: 'Search',
		      Store_Search_ResultItemsQnt: $('#totalStores').val() || '0'
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
	asyncBAETStoreSearch: function() {
		
	},
	asyncBAETThankYou: function() {
		var obj;
		try{
		   obj = {
		      id: 'Exam-Funnel-Info', 
		      Page_Type: 'Static',
		      Page_Section1: 'Account'
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
//	asyncBAETInfo: function(){
//		var obj;
//		try{
//			if (zipCode != null) {
//				zipCode = zipCode.trim();
//			}
//			
//		   obj = {
//		      id: 'Exam-Funnel-Info', 
//		      Page_Type: 'Info',
//		      Page_Section1: 'Exam',
//		      Page_Section2: 'PersonalInfo',
//		      Exam_ZipCode: zipCode || '',
//		      Exam_Fitting: '',
//		      Exam_PreviousExam: '',
//		      Exam_WornBefore: '',
//		      Exam_PatientNum: '1'
//		   };
//		    
//		}catch(err){
//		   obj = {
//		        id: 'Error',
//		        Error_Source: 'Server',
//		        Error_Code: 'utag_data syntax - '+err.message,
//		        Error_Detail: ''
//		    };
//		}
//		finally{
//		    tealium_data2track.push(obj);
//		}
//	},
	asyncBAETInfo: function(){
		var obj;
		try{			
		   obj = {
		      id: 'Exam-Funnel-Info',
		      Page_Type: 'Info',
		      Page_Section1: 'Exam',
		      Page_Section2: 'Scheduler',
		      Exam_ZipCode: '',
		      Exam_Fitting: 'Y,N',
		      Exam_PreviousExam: 'Y,N',
		      Exam_WornBefore: 'Y,N'
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
//		    tealium_data2track.push(obj);
		    $.extend(utag_data, obj)
		}
	},
	asyncBAETReview: function(){
		var obj;
		try{
			if (zipCode != null) {
				zipCode = zipCode.trim();
			}
			
		   obj = {
		      id: 'Exam-Funnel-Review', 
		      Page_Type: 'Review',
		      Page_Section1: 'Exam',
		      Page_Section2: 'CompleteBooking',
		      Exam_ZipCode: zipCode || '',
		      Exam_Fitting: '',
		      Exam_PreviousExam: '',
		      Exam_WornBefore: '',
		      Exam_PatientNum: '1'
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
	asyncBAETConfirmationEmail: function(emailSub, userEmail) {
		var obj;
		var isSub = 0;
		if(emailSub === 'newsletter') {
			isSub = '1';
		} else {
			isSub = '0';
		}
		try{
		   obj = {
		      User_EmailOptin: isSub,
		      User_Email_MD5: md5(emailSub.toLowerCase().trim()),
		      User_Email_SHA256: ''
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
//			tealium_data2track.push(obj);
		    $.extend(utag_data, obj);
		}
	},
	asyncBAETConfirmation: function(){
		var obj;
		try{
			if (zipCode != null) {
				zipCode = zipCode.trim();
			}
			
		   obj = {
		      id: 'Exam-Funnel-Confirmation', 
		      Page_Type: 'Confirmation',
		      Page_Section1: 'Exam',
		      Page_Section2: 'CompleteBooking',
		      Exam_ZipCode: zipCode || '',
		      Exam_Fitting: '',
		      Exam_PreviousExam: '',
		      Exam_WornBefore: '',
		      Exam_PatientNum: '1'
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
	
	asyncCheckoutLogin: function(){
		var obj;
		try{
		   obj = {
		      id: 'Checkout-Step-Login', 
		      Page_Type: 'Login',
		      Page_Section1: 'Checkout',
		      Page_Section2: ''
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
	
	asyncCheckoutPayment: function(shippingMode = "Standard", shippingType = "Home") {
		var obj;
		try{
			var Products = {};

			var upcs = $('.analyticsCartItemUPC').map(function() { return $(this).val(); });
			var cats = $('.analyticsCartItemCategory').map(function() { return $(this).val(); });
			var prices = $('.analyticsCartItemPrice').map(function() { return $(this).val(); });
			var fullPrices = $('.analyticsCartItemFullPrice').map(function() { return $(this).val(); });
			var quantities = $('.analyticsCartItemQuantity').map(function() { return $(this).val(); });
			
			for (var i=0; i< upcs.length; i++) {
				var upc = upcs[i] + "";
				
				Products[upc] = {};
				Products[upc].Category = cats[i];
				
				Products[upc].Vm_IsUpcSupported = "0";
				Products[upc].Conf_IsUpcSupported = "0";
			    Products[upc].Engraving = "N";
			    Products[upc].OosOptions = "None";
			    Products[upc].Status = "Available";
			    Products[upc].LensUPC = "None";
			    
			    Products[upc].Units = quantities[i];
			    
			    
			    Products[upc].Price = prices[i].replace('$','');
			    Products[upc].PriceFull = fullPrices[i].replace('$','');	    
			}
			
			var analyticsCartProductDiscount = $('#analyticsCartProductDiscount').val();
			var analyticsCartOrderLevelDiscount = $('#analyticsCartOrderLevelDiscount').val();
			var analyticsCartProductTotal = $('#analyticsCartProductTotal').val();
			var analyticsCartFreeGift = $('#analyticsCartFreeGift').val();
			var analyticsCartShipping = $('#analyticsCartShipping').val();
			var analyticsCartDiscountTotal = $('#analyticsCartDiscountTotal').val();
			
			var analyticsCartPromoCodeApplied = $('#analyticsCartPromoCodeApplied').val();
			
			if (analyticsCartProductTotal != null && analyticsCartProductTotal.length > 0) {
				analyticsCartProductTotal = parseFloat(analyticsCartProductTotal).toFixed(2);
			}
			if (analyticsCartDiscountTotal != null && analyticsCartDiscountTotal.length > 0) {
				analyticsCartDiscountTotal = parseFloat(analyticsCartDiscountTotal).toFixed(2);
			}
			if (analyticsCartShipping != null && analyticsCartShipping.length > 0) {
				analyticsCartShipping = parseFloat(analyticsCartShipping).toFixed(2);
			}
			
			if (analyticsCartDiscountTotal == '0.00') {
				analyticsCartDiscountTotal = '-' + analyticsCartDiscountTotal;
			}
			
			var address1 = $('#checkout-shipping-street-address_1').val();
			var address2 = $('#checkout-shipping-street-address_2').val();
			var suburb = $('#addressSuggest-bet').val();
			var zipCode = $('#addressSuggest_postcode').val().trim();
			var state = $('#addressSuggest_state').val();
			
			var newsletterCheck = $('#sign-up-from-checkout').is(":checked");
			var newletterCheckBin = '0';
			if (newsletterCheck) {
				newletterCheckBin = '1';
			}
			
			var completeAddress = '' + address1 + ' ' + address2 + ', ' + suburb + ' ' + zipCode + ' ' + state;
			
			var md5email = md5($('#checkout-shipping-e-mail').val().trim().toLowerCase());
			
			obj = {
		      id: 'Checkout-Step-Payment', 
		      Page_Type: 'Payment',
		      Page_Section1: 'Checkout',
		      Page_Section2: '',
		      Products: Products,
		      Order_CartId: utag_data.Order_CartId,
		      Order_Currency: utag_data.Order_Currency,
		      Order_ProductsAmount: analyticsCartProductTotal,
			  Order_DiscountAmount: analyticsCartDiscountTotal,
			  Order_GiftCardCode: '',
			  Order_DiscountCode: analyticsCartPromoCodeApplied,
			  Order_ShippingAmount: analyticsCartShipping,
			  Order_ShippingDiscount: '-0.00',
			  Order_ShippingTaxRate: '0.00',
			  Order_TaxAmount: '0.00',
			  Order_InsuranceAmount: '0.00',
			  Order_ShippingMode: shippingMode,
			  Order_ShippingType: shippingType,
			  Order_State: utag_data.Page_Country,
			  Order_ZipCode: zipCode,
			  Order_ShippingAddress: '',//completeAddress,
			  Order_InsuranceCode: '',
			  Order_Insured: '0',
			  Events_UserEmailSub: newletterCheckBin,
			  User_Email_MD5: md5email
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
	
	setCheckoutDeliveryParams: function(shippingMode = "Standard", shippingType = "Home") {
		
		var isRxOrder = $('#isRxOrder').val() === 'true' ? true : false;
		
		var analyticsCartProductDiscount = $('#analyticsCartProductDiscount').val();
		var analyticsCartOrderLevelDiscount = $('#analyticsCartOrderLevelDiscount').val();
		var analyticsCartProductTotal = $('#analyticsCartProductTotal').val();
		var analyticsCartFreeGift = $('#analyticsCartFreeGift').val();
		var analyticsCartShipping = $('#analyticsCartShipping').val();
		var analyticsCartDiscountTotal = $('#analyticsCartDiscountTotal').val();
		
		var analyticsCartPromoCodeApplied = $('#analyticsCartPromoCodeApplied').val();
		
		if (analyticsCartProductTotal != null && analyticsCartProductTotal.length > 0) {
			analyticsCartProductTotal = parseFloat(analyticsCartProductTotal).toFixed(2);
		}
		if (analyticsCartDiscountTotal != null && analyticsCartDiscountTotal.length > 0) {
			analyticsCartDiscountTotal = parseFloat(analyticsCartDiscountTotal).toFixed(2);
		}
		if (analyticsCartShipping != null && analyticsCartShipping.length > 0) {
			analyticsCartShipping = parseFloat(analyticsCartShipping).toFixed(2);
		}
		
		if (analyticsCartDiscountTotal == '0.00') {
			analyticsCartDiscountTotal = '-' + analyticsCartDiscountTotal;
		}

		utag_data.Order_ShippingAmount = analyticsCartShipping;
		utag_data.Order_ProductsAmount = analyticsCartProductTotal;
		utag_data.Order_DiscountAmount = analyticsCartDiscountTotal;
		utag_data.Order_ShippingMode = shippingMode;
		utag_data.Order_ShippingType = shippingType;
		utag_data.Order_GiftCardCode = ''; 
		utag_data.Order_DiscountCode = analyticsCartPromoCodeApplied;
		
		utag_data.Products = {};
		
		var upcs = $('.analyticsCartItemUPC').map(function() { return $(this).val(); });
		var cats = $('.analyticsCartItemCategory').map(function() { return $(this).val(); });
		var prices = $('.analyticsCartItemPrice').map(function() { return $(this).val(); });
		var fullPrices = $('.analyticsCartItemFullPrice').map(function() { return $(this).val(); });
		var quantities = $('.analyticsCartItemQuantity').map(function() { return $(this).val(); });
		
		for (var i=0; i< upcs.length; i++) {
			var upc = upcs[i] + "";
			
			// THIS IS REPETITION // TODO MOVE IN A COMMON FUNCTION
			var rxInfo = this.getRxInfo(upc);
			
			if (rxInfo && rxInfo.action == 'merge') {
				utag_data.Products[upc] = {};
				// new
				
			    utag_data.Products[upc].Price = rxInfo.data.totalPackOItemPriceNUM+"";
			    utag_data.Products[upc].PriceFull = rxInfo.data.totalPackOItemPriceNUM+"";
				
				utag_data.Products[upc].Type = "RX";
				//utag_data.Products[upc].LensColor = (lens.xLensColor) ? lens.xLensColor : "";
				utag_data.Products[upc].LensUPC = (rxInfo.data.lensItemPartN) ? rxInfo.data.lensItemPartN : "";
	            if (rxInfo.data.lensCatentItem.antiBlue && rxInfo.data.lensCatentItem.antiBlue.match(/true/i)) {
	            	utag_data.Products[upc].LensAntiblue = "true";
	            }
	            if (rxInfo.data.lensCatentItem.antiReflective && rxInfo.data.lensCatentItem.antiReflective.match(/true/i)) {
	            	utag_data.Products[upc].LensAntiReflective = "true";
	            }
	            utag_data.Products[upc].LensTransition = (rxInfo.data.lensCatentItem.transitionType) ? rxInfo.data.lensCatentItem.transitionType : "";
	            utag_data.Products[upc].LensDesign = (rxInfo.data.lensCatentItem.lensDesign) ? rxInfo.data.lensCatentItem.lensDesign : "";
	            utag_data.Products[upc].LensType = (rxInfo.data.lensCatentItem.correctionType) ? rxInfo.data.lensCatentItem.correctionType : "";
	            utag_data.Products[upc].LensIndex = (rxInfo.data.lensCatentItem.lensIndex) ? rxInfo.data.lensCatentItem.lensIndex : "";
	            utag_data.Products[upc].LensBrand = (rxInfo.data.lensCatentItem.lensBrand) ? rxInfo.data.lensCatentItem.lensBrand : "";
	            utag_data.Products[upc].LensTreatment = (rxInfo.data.lensCatentItem.lensTreatment) ? rxInfo.data.lensCatentItem.lensTreatment : "";
	            utag_data.Products[upc].LensPolarized = (rxInfo.data.lensCatentItem.lensPolarised) ? rxInfo.data.lensCatentItem.lensPolarised : "";
	            
				// new end
				
				utag_data.Products[upc].Category = cats[i];
				
				utag_data.Products[upc].Vm_IsUpcSupported = "0";
				utag_data.Products[upc].Conf_IsUpcSupported = "0";
			    utag_data.Products[upc].Engraving = "N";
			    utag_data.Products[upc].OosOptions = "None";
			    utag_data.Products[upc].Status = "Available";
			    
			    utag_data.Products[upc].Units = quantities[i];
				continue
			} else if (rxInfo && rxInfo.action == 'skip') {
				continue;
			}
			// END - THIS IS REPETITION // TODO MOVE IN A COMMON FUNCTION
			
			utag_data.Products[upc] = {};
			utag_data.Products[upc].Category = cats[i];
			
			utag_data.Products[upc].Vm_IsUpcSupported = "0";
			utag_data.Products[upc].Conf_IsUpcSupported = "0";
		    utag_data.Products[upc].Engraving = "N";
		    utag_data.Products[upc].OosOptions = "None";
		    utag_data.Products[upc].Status = "Available";
		    utag_data.Products[upc].LensUPC = "None";
		    
		    utag_data.Products[upc].Units = quantities[i];
		    
		    var price1 = prices[i].replace('$','');
		    var fullPrice1 =  fullPrices[i].replace('$','');
		    
		    if (price1 != null && price1.length > 0) {
				var price2 = parseFloat(price1).toFixed(2);
				utag_data.Products[upc].Price= "" + price2;
			}
			if (fullPrice1 != null && fullPrice1.length > 0) {
				var fullPrice2 = parseFloat(fullPrice1).toFixed(2);
				utag_data.Products[upc].PriceFull = "" + fullPrice2;
			}
			
		   // utag_data.Products[upc].Price = prices[i].replace('$','');
		    //utag_data.Products[upc].PriceFull = fullPrices[i].replace('$','');		    
		}
		
		orderItemDataMap
		
	},
	
	setTYPCheckoutParams: function(userPaymentMethod = '',orderShippingMode = "Standard", orderShippingType = "Home") {
		var analyticsCheckoutOrderId = $('#analyticsCheckoutOrderId').val();
		
		utag_data.Order_Id = analyticsCheckoutOrderId;
		utag_data.Order_State = utag_data.Page_Country;
		
		utag_data.Page_Section2 = "Standard";
		
		utag_data.Order_GiftCardCode = '';
		utag_data.Order_ShippingDiscount = '-0.00';
		utag_data.Order_ShippingTaxRate = '0.00';
	  	utag_data.Order_TaxAmount = '0.00';
	  	utag_data.Order_InsuranceAmount = '0.00';
	  	utag_data.Order_ShippingMode = orderShippingMode;
	  	utag_data.Order_ShippingType = orderShippingType;
	  	utag_data.Order_InsuranceCode = '';
	  	utag_data.Order_Insured = '0';
	  	utag_data.Order_Type = '';
	  	
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
		
		if (analyticsCartDiscountTotal == '0.00') {
			analyticsCartDiscountTotal = '-' + analyticsCartDiscountTotal;
		}
	  	
		var analyticsCartPromoCodeApplied = $('#analyticsCheckoutPromoCode').val();
	  	utag_data.Order_DiscountCode = analyticsCartPromoCodeApplied || '';
	  	
	  	utag_data.Order_ProductsAmount = analyticsCartProductTotal;
	  	utag_data.Order_DiscountAmount = analyticsCartDiscountTotal;
	  	utag_data.Order_ShippingAmount = analyticsCartShipping;
	  	
	  	var address = $('#analyticsCheckoutAddress').val();
		var city = $('#analyticsCheckoutCity').val();
		var zipCode = $('#analyticsCheckoutPostalCode').val().trim();
		var stateProvince = $('#analyticsCheckoutStateProvince').val();
		
		var completeAddress = '' + address + ', ' + city + ' ' + zipCode + ' ' + stateProvince;
	  	
	  	utag_data.Order_ZipCode = zipCode;
	  	utag_data.Order_ShippingAddress = '';//completeAddress;
	  	
	  	var analyticsCheckoutPaymentType = $('#analyticsCheckoutPaymentType').val() || userPaymentMethod;
	  	analyticsCheckoutPaymentType = analyticsCheckoutPaymentType.toUpperCase().trim();
	  	
	  	var Order_PaymentInstallments = '';
	  	if (analyticsCheckoutPaymentType == 'AFTERPAY') {
	  		Order_PaymentInstallments = '4';
	  	}
	  	
	  	if (analyticsCheckoutPaymentType === 'VISA') {
	  		analyticsCheckoutPaymentType = 'Visa';
	  	} else if (analyticsCheckoutPaymentType === 'MC' || analyticsCheckoutPaymentType === 'MASTER CARD' || analyticsCheckoutPaymentType === 'MASTERCARD') {
	  		analyticsCheckoutPaymentType = 'MasterCard';
	  	} else if (analyticsCheckoutPaymentType === 'AMEX' || analyticsCheckoutPaymentType === 'AMERICAN EXPRESS'  || analyticsCheckoutPaymentType === 'AMERICANEXPRESS') {
	  		analyticsCheckoutPaymentType = 'Amex';
	  	} else if (analyticsCheckoutPaymentType === 'PAYPAL') {
	  		analyticsCheckoutPaymentType = 'PayPal';
	  	} else if (analyticsCheckoutPaymentType === 'AFTERPAY') {
	  		analyticsCheckoutPaymentType = 'AfterPay';
	  	}
	  	
	  	utag_data.Order_PaymentType = analyticsCheckoutPaymentType;
	  	utag_data.Order_PaymentInstallments = Order_PaymentInstallments;
	  	
	  	
	  	var upcs = $('.analyticsCartItemUPC').map(function() { return $(this).val(); });
		var cats = $('.analyticsCartItemCategory').map(function() { return $(this).val(); });
		var prices = $('.analyticsCartItemPrice').map(function() { return $(this).val(); });
		var fullPrices = $('.analyticsCartItemFullPrice').map(function() { return $(this).val(); });
		var quantities = $('.analyticsCartItemQuantity').map(function() { return $(this).val(); });
		
		var sizes = $('.analyticsCartItemSize').map(function() { return $(this).val(); });
		var brands = $('.analyticsCartItemBrand').map(function() { return $(this).val(); });
		var types = $('.analyticsCartItemType').map(function() { return $(this).val(); });
		var skus = $('.analyticsCartItemSku').map(function() { return $(this).val(); });
		
		utag_data.Products = {};
		
		for (var i=0; i< upcs.length; i++) {
			var upc = upcs[i] + "";
			
			// THIS IS REPETITION // TODO MOVE IN A COMMON FUNCTION
			var rxInfo = this.getRxInfo(upc);
			
			if (rxInfo && rxInfo.action == 'merge') {
				utag_data.Products[upc] = {};
				// new
				
			    utag_data.Products[upc].Price = rxInfo.data.totalPackOItemPriceNUM+"";
			    utag_data.Products[upc].PriceFull = rxInfo.data.totalPackOItemPriceNUM+"";
				
				utag_data.Products[upc].Type = "RX";
				//utag_data.Products[upc].LensColor = (lens.xLensColor) ? lens.xLensColor : "";
				utag_data.Products[upc].LensUPC = (rxInfo.data.lensItemPartN) ? rxInfo.data.lensItemPartN : "";
	            if (rxInfo.data.lensCatentItem.antiBlue && rxInfo.data.lensCatentItem.antiBlue.match(/true/i)) {
	            	utag_data.Products[upc].LensAntiblue = "true";
	            }
	            if (rxInfo.data.lensCatentItem.antiReflective && rxInfo.data.lensCatentItem.antiReflective.match(/true/i)) {
	            	utag_data.Products[upc].LensAntiReflective = "true";
	            }
	            utag_data.Products[upc].LensTransition = (rxInfo.data.lensCatentItem.transitionType) ? rxInfo.data.lensCatentItem.transitionType : "";
	            utag_data.Products[upc].LensDesign = (rxInfo.data.lensCatentItem.lensDesign) ? rxInfo.data.lensCatentItem.lensDesign : "";
	            utag_data.Products[upc].LensType = (rxInfo.data.lensCatentItem.correctionType) ? rxInfo.data.lensCatentItem.correctionType : "";
	            utag_data.Products[upc].LensIndex = (rxInfo.data.lensCatentItem.lensIndex) ? rxInfo.data.lensCatentItem.lensIndex : "";
	            utag_data.Products[upc].LensBrand = (rxInfo.data.lensCatentItem.lensBrand) ? rxInfo.data.lensCatentItem.lensBrand : "";
	            utag_data.Products[upc].LensTreatment = (rxInfo.data.lensCatentItem.lensTreatment) ? rxInfo.data.lensCatentItem.lensTreatment : "";
	            utag_data.Products[upc].LensPolarized = (rxInfo.data.lensCatentItem.lensPolarised) ? rxInfo.data.lensCatentItem.lensPolarised : "";
	            
				// new end
				
				utag_data.Products[upc].Category = cats[i];
				
				utag_data.Products[upc].Vm_IsUpcSupported = "0";
				utag_data.Products[upc].Conf_IsUpcSupported = "0";
			    utag_data.Products[upc].Engraving = "N";
			    utag_data.Products[upc].OosOptions = "None";
			    utag_data.Products[upc].Status = "Available";
			    
			    utag_data.Products[upc].Units = quantities[i];
				continue
			} else if (rxInfo && rxInfo.action == 'skip') {
				continue;
			}
			
			// END - THIS IS REPETITION // TODO MOVE IN A COMMON FUNCTION
			
			utag_data.Products[upc] = {};
			utag_data.Products[upc].Category = cats[i];
			
			utag_data.Products[upc].Vm_IsUpcSupported = "0";
			utag_data.Products[upc].Conf_IsUpcSupported = "0";
		    utag_data.Products[upc].Engraving = "N";
		    utag_data.Products[upc].OosOptions = "None";
		    utag_data.Products[upc].Status = "Available";
		    utag_data.Products[upc].LensUPC = "None";
		    
		    utag_data.Products[upc].TaxRate = '0.00';
		    utag_data.Products[upc].Warranty = '0';
		    //utag_data.Products[upc].InsuranceAmount = '-0.00';
		    //utag_data.Products[upc].InsuranceCode = '';
		    utag_data.Products[upc].PerkCode = '';
		    utag_data.Products[upc].Cloth = '';
		    utag_data.Products[upc].Case = '';
		    utag_data.Products[upc].ModelCode = '';
		    utag_data.Products[upc].MoCo = 'None';
		    utag_data.Products[upc].Frame = '';
		    utag_data.Products[upc].Lens = '';
		    
		    utag_data.Products[upc].Size = sizes[i] || "";
		    utag_data.Products[upc].Brand = brands[i] || 'OPSM';
		    utag_data.Products[upc].Type = types[i] || '';
		    utag_data.Products[upc].Sku = skus[i] || upc;

		    utag_data.Products[upc].Units = quantities[i];
		    utag_data.Products[upc].Price = prices[i];
		    utag_data.Products[upc].PriceFull = fullPrices[i];		    
		}
	},
	addError: function(error_obj){
		const defError = {
			Error_Source: 'Anomaly',
			Error_Code: "Loading error", // or "404 - page not found"
			Error_Details: window.location.href, //alphanumeric - Error cause/source. Must specify details to drive IT through an exact fix. In case of Source "404" write the requested URL that generated the issue. In case of Source "Product" must be the requested product UPC.
			//Error_Message: "", //alphanumeric - Only if there's an error visualized to the user: the error message shown in the page e.g. "Oops, we can't find what you were looking for"

		};
		error_obj = error_obj ? error_obj : {};
		//clean urls
		if(defError.Error_Details){
			defError.Error_Details = this.removeUnwantedParams(defError.Error_Details);
		}
		if(error_obj.Error_Details){
			error_obj.Error_Details = this.removeUnwantedParams(error_obj.Error_Details);
		}
		
		$.extend(utag_data, defError, error_obj);
	},
	
	removeUnwantedParams: function(aString) {
		//TODO add polyfill for browser compatibility
		try {
			const url = new URL(aString);
			const params = new URLSearchParams(url.search.slice(1));
			params.delete('krypto');
			let paramsStr = params.toString().length > 0 ? '?' + params.toString() : '';
			return encodeURIComponent(String(url.origin) + String(url.pathname) + String(paramsStr)); 
		} catch (e) {
			return aString
		}
	},
	
	virtualPageLoad: function(pageType, section1) { // TODO: should be generic (used for Delivery page)
		var obj;
		try{
		   obj = {
		      id: 'Loading-Ready',
		      Page_Type: pageType,
		      Page_Section1: section1,
		   };
		    
		}catch(err){
		   obj = {
		        id: 'Loading-Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	virtualPageLoadFindStoreResult: function(id, keyword, typeSearch, resultQuantity) {
		var obj;
		try{
		   obj = {
		      id: id,
		      Store_Search_Keyword: keyword,
		      Store_Search_Type: typeSearch,
		      Store_Search_ResultItemsQnt: resultQuantity,
		      Events_FunnelStoreSearch: '1'
		   };
		    
		}catch(err){
		   obj = {
		        id: 'Loading-Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - ' + err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	virtualPageLoadBET: function(id, pageType, section1, section2) { // TODO: should be generic (used for Delivery page)
		var obj;
		try{
		   obj = {
		      id: id,
		      Page_Type: pageType,
		      Page_Section1: section1,
		      Page_Section2: section2
		   };
		    
		}catch(err){
		   obj = {
		        id: 'Loading-Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message,
		        Error_Detail: ''
		    };
		}
		finally{
		    tealium_data2track.push(obj);
		}
	},
	getRxInfo: function(upc) {
		if (window.orderItemDataMap) {
			var keys = Object.keys(orderItemDataMap);
			for (var i=0; i<keys.length; ++i) {
			  if(orderItemDataMap[ keys[i] ].frameCatentItem.upc == upc){
			    return {'action' : 'merge', 'data' : orderItemDataMap[ keys[i] ]};
			  }
			  if(orderItemDataMap[ keys[i] ].lensCatentItem.upc == upc){
			    return {'action' : 'skip', 'data' : orderItemDataMap[ keys[i] ]};
			  }
			}
		}
		return false;
	},
	
	/*
	 * Implemented actions : ['InitError' | 'Render' | 'FitGlasses']
	 */
	asyncVMEvent: function(action) {
		var obj;
		try {
			obj = {
				id: 'VirtualMirror',
				Vm_Action: action || ''
			};
			
			if(window.utag_data){
				var products = window.utag_data.Products || {};
				//for each product set VM_IsUpcSupported true - is necessary?
				obj.Products = products;
			}
		} catch(err) {
		   obj = {
		        id: 'Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - ' + err.message,
		        Error_Detail: ''
		    };
		} finally {
			//is any check on category needed?
			// if(utag_data.Products_Category_Array... ){}
			tealium_data2track.push(obj);
		}
	},
	
	asyncVMError: function(error_number_code, erroredParam) {
		var obj = {};
		try {
			var products = window.utag_data.Products || {};
			var upc = Object.keys(products)[0] || erroredParam;
			var divId = 'vm-virtual-mirror-wrapper';
			
			var VMErrors = {
				'1': {
					id: 'Error',
					Error_Source: 'Client',
					Error_Code: 'Vm - InvalidParametersError',
					Error_Details: erroredParam + ' parameter is invalid'
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

	/*
	 * inVStatus 0 for DISCO, 1 for ACTIVE
	 */
	buildInvObj : function(invStatus, invQty){
		var status = null;
		var OosOptions = '';
		invQty = !isNaN(invQty) && parseInt(invQty);
		if(invQty == 0) {
			status = 0 == invStatus ? 'Not-for-sale' : 'Out-of-stock';
			OosOptions = 0 == invStatus ? 'FindStore' : OosOptions;
		} else {
			status = 'Available';
		}
		return {Status: status, OosOptions: OosOptions};
	},
	
	/*
	 * inVStatus 0 for DISCO, 1 for ACTIVE
	 */
	asyncAddCustomInventory : function(upc, invStatus, invQty) {
		if(!upc || !upc.length || isNaN(invStatus) || isNaN(invQty)) {
			return;
		}
		try {
			//check Products is populated
			var _Products = JSON.parse(JSON.stringify(window.utag_data.Products || {}));
			if(Object.keys(_Products).length && 
					_Products.hasOwnProperty(upc + '')){

				var invObj = utagFiller.buildInvObj(invStatus, invQty);
				if(typeof invObj.Status != 'undefined' && invObj.Status != null){
					_Products[upc + ''].Status = invObj.Status;
					_Products[upc + ''].OosOptions = invObj.OosOptions;
					var obj = {
							id: 'Loading_Ready',
							Products: _Products
					};
				}
			}
		} catch(err) {
			obj = {
					id: 'Loading-Error',
					Error_Source: 'Server',
					Error_Code: 'utag_data object',
					Error_Detail: '' + err.message
			};
		} finally {
			tealium_data2track.push(obj);
		}
	},
	
	asyncPDPProductUpdate : function(upc, invStatus, invQty) {
		var obj = {};
		//this already sets Status and OosOption from dom elements
		var products = this.PDPBuildProduct();
		
		if(upc && upc.length && !isNaN(invStatus) && !isNaN(invQty)
				&& Object.keys(products).length && 
				products.hasOwnProperty(upc + '')) {
			var invObj = utagFiller.buildInvObj(invStatus, invQty);
			products[upc + ''].Status = invObj.Status;
			products[upc + ''].OosOptions = invObj.OosOptions;
		}
		try {
			obj = {
					id: 'Prods-Update',
					Products: products
			};
		} catch(err) {
			obj = {
					id: 'Error',
					Error_Source: 'Server',
					Error_Code: 'utag_data object',
					Error_Detail: '' + err.message
			};
		} finally {
			tealium_data2track.push(obj);
		}
	},
	
	cartBossOpenModal : function() {
		try {
			var obj = {
					id: 'Impression',
					Page_Section2: 'FindStore'
			};
		}
		catch (err) {
			obj = {
					id: 'Error',
					Error_Source: 'Server',
					Error_Code: 'utag_data object',
					Error_Detail: '' + err.message
			};
		}
		tealium_data2track.push(obj);
	},
	
	cartBossModalConfirm : function() {
		try {
			var obj = {
					id: 'Click',
					data_element_id: 'FindStoreOverlay_Confirm'
			};
		}
		catch (err) {
			obj = {
					id: 'Error',
					Error_Source: 'Server',
					Error_Code: 'utag_data object',
					Error_Detail: '' + err.message
			};
		}
		tealium_data2track.push(obj);
	},
	
	onShowSkipSubscription : function() {
		try {
			var obj = {
					id: 'Impression',
					Page_Section2: 'SkipNextOrder'
			};
		}
		catch (err) {
			obj = {
					id: 'Error',
					Error_Source: 'Server',
					Error_Code: 'utag_data object',
					Error_Detail: '' + err.message
			};
		}
		tealium_data2track.push(obj);
	},
	
	yesSkipPrescription : function() {
		try {
			var obj = {
					id: 'Click',
					data_element_id: 'X_X_SkipNextOrderOverlay_Confirm'
			};
		}
		catch (err) {
			obj = {
					id: 'Error',
					Error_Source: 'Server',
					Error_Code: 'utag_data object',
					Error_Detail: '' + err.message
			};
		}
		tealium_data2track.push(obj);
	},
	
	onShowPauseSubscription : function() {
		try {
			var obj = {
					id: 'Impression',
					Page_Section2: 'PauseSubscription'
			};
		}
		catch (err) {
			obj = {
					id: 'Error',
					Error_Source: 'Server',
					Error_Code: 'utag_data object',
					Error_Detail: '' + err.message
			};
		}
		tealium_data2track.push(obj);
	},
	
	yesPauseSubscription : function() {
		try {
			var obj = {
					id: 'Click',
					data_element_id: 'X_X_PauseSubscriptionOverlay_Confirm'
			};
		}
		catch (err) {
			obj = {
					id: 'Error',
					Error_Source: 'Server',
					Error_Code: 'utag_data object',
					Error_Detail: '' + err.message
			};
		}
		tealium_data2track.push(obj);
	},
	
	onShowProcessSubscription : function() {
		try {
			var obj = {
					id: 'Impression',
					Page_Section2: 'ProcessNow'
			};
		}
		catch (err) {
			obj = {
					id: 'Error',
					Error_Source: 'Server',
					Error_Code: 'utag_data object',
					Error_Detail: '' + err.message
			};
		}
		tealium_data2track.push(obj);
	},
	
	yesProcessSubscription : function() {
		try {
			var obj = {
					id: 'Click',
					data_element_id: 'X_X_ProcessNowOverlay_Confirm'
			};
		}
		catch (err) {
			obj = {
					id: 'Error',
					Error_Source: 'Server',
					Error_Code: 'utag_data object',
					Error_Detail: '' + err.message
			};
		}
		tealium_data2track.push(obj);
	},
	
	onShowCancelSubscription : function() {
		try {
			var obj = {
					id: 'Impression',
					Page_Section2: 'CancelSubscription'
			};
		}
		catch (err) {
			obj = {
					id: 'Error',
					Error_Source: 'Server',
					Error_Code: 'utag_data object',
					Error_Detail: '' + err.message
			};
		}
		tealium_data2track.push(obj);
	},
	
	yesCancelSubscription : function() {
		try {
			var obj = {
					id: 'Click',
					data_element_id: 'X_X_CancelSubscriptionOverlay_Confirm'
			};
		}
		catch (err) {
			obj = {
					id: 'Error',
					Error_Source: 'Server',
					Error_Code: 'utag_data object',
					Error_Detail: '' + err.message
			};
		}
		tealium_data2track.push(obj);
	}
}
var isBrowserSupported_VM = function() {
	//CHECKING IF IT'S IE
	return /MSIE|Trident/.test(window.navigator.userAgent) ? '0' : '1';
}