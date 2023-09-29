/*
 * Description : General OPSM JS functions which are used in other module javascript files 
 *
 */

var opsm = window.opsm || {};

/* error messages constants*/
opsm.errors = opsm.errors || {};
opsm.errors['SAME_EYE_COMBINATION_EXISTS'] = 'Oops! Cannot add to cart, as you can only have one contact lens type per eye within an order. Please amend your cart to proceed.';


(function(window,document,$,opsm){
/*
 * Description : General OPSM JS functions which are used in other module javascript files
 * 
 */
opsm.utils = (function(){
	
	let area_short = [];
	area_short.push({'auckland' : 'AUK' });
	
	let table = new Map();
	table.set('administrative_area_level_1', area_short);
	
	var changeGmapPlaceApiResults = function ($elArr, placeType, country) {
		if(!$elArr || !$elArr.length) return;
		
		let lowerCase = function($element){
			if($element.length && opsm.utils.getContent($element) != null ){
				return opsm.utils.getContent($element).toLowerCase();
			} else {
				return '';
			}
		}
		
		if (!Array.isArray($elArr)){
			$elArr = [$elArr];
		}
		let key = String(placeType);
		$elArr.forEach(function ($el) {
			if (table && table.has(key)){
				table.get(key).forEach(function(item){
					if(typeof item[lowerCase($el)] !== 'undefined'){
						opsm.utils.setContent($el, item[lowerCase($el)]);
					}
				});
			}
		});
		
	}
	
		var getDefaultMsgTimeout = function() { return 6000; }
		
		/**
		 * Converts a string to its html characters completely.
		 *
		 * @param {String} str String with unescaped HTML characters
		 **/
		var encode = function(str) {
			var buf = [];
			
			for (var i=str.length-1;i>=0;i--) {
				buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
			}
			
			return buf.join('');
		}
		/**
		 * Converts an html characterSet into its original character.
		 *
		 * @param {String} str htmlSet entities
		 **/
		var decode = function(str) {
			return str.replace(/&#(\d+);/g, function(match, dec) {
				return String.fromCharCode(dec);
			});
		}
		
		var isInt = function(value) {
			if (isNaN(value)) {
			    return false;
			}
			var x = parseFloat(value);
			return (x | 0) === x;
		};
		
		var manageInPageAlertMsg = function() {
			if ($('input.global-message:not(form input.global-message)').length) {
				$input = $('input.global-message:not(form input.global-message)');
				var message = $input.val();
				message = decode(message);
				isHtml = typeof($input.attr('isHtml')) != "undefined";
				timeout = $input.data('timeOut');
			}

			if(!message) return;
			
			if($input.hasClass('error')) {
				showAlertError(message, isHtml, timeout);
			} else if($input.hasClass('info')) {
				showAlertInfo(message, isHtml, timeout);
			} else if($input.hasClass('success')) {
				showAlertSuccess(message, isHtml, timeout);
			} else {
				showAlertInfo(message, isHtml, timeout);
			}	
					
			
		};
		
		var showAlertSuccess = function(text, isHtml, timeout) {
			_showAlert('alert-success', text, isHtml, timeout);
		};
		var showAlertError = function(text, isHtml, timeout) {
			_showAlert('alert-danger', text, isHtml, timeout);
		};
		var showAlertInfo = function(text, isHtml, timeout) {
			_showAlert('alert-info', text, isHtml, timeout);
		};
		
		//private function
		var _showAlert = function(stickyElementId, text, isHtml, timeout) {
			//define default timeout
			if (typeof timeout === "undefined" || timeout === null) timeout = getDefaultMsgTimeout();
			//manage pages with no header
			if($('#opsm-header-sticky').length) { $('#opsm-header-sticky').removeClass('temp-hidden'); }
			//pages without header can add their own alerts div
			var $el = $("#"+stickyElementId);
			if (!$el.length) return;
			if (isHtml)
				$el.html(text);
			else
				$el.text(text);
			$el.fadeIn(0);
			initGlobalMessageRemoval(timeout);
		};
		
		var ccf_validation = function (e) {
			  //console.log(e);
			//console.log(e);
			if (e.card_type == null) {
				  return;
			  };
			
		      setCardCode(e.card_type.name);
		      
		      /*
			e.card_type.name === "maestro" ? $(".vertical.maestro").slideDown({duration: 200}).animate({opacity: 1}, {queue: !1}) : $(".vertical.maestro").slideUp({duration: 200}).animate({opacity: 0}, {queue: !1,duration: 200});
		      */
		      return (e.length_valid && e.luhn_valid);
	    };
		
		var scrollAnimate = function(element,time, topval){
			$('html, body').animate({
				scrollTop: element.offset().top + topval
			}, time);
		};
		//Remove global message
		var initGlobalMessageRemoval = function(timeout) {
			if (typeof timeout === "undefined" || timeout === null) timeout = getDefaultMsgTimeout();
			var message = $(".alert:visible");
			if (message.length) {
				window.setTimeout(function() {
					$(window).on("scroll.gm touchstart.gm mouseup.gm mousemove.gm", function() {
						$(window).off("scroll.gm touchstart.gm mouseup.gm mousemove.gm");
						message.fadeOut(400);
						// message.animate(
						// 	{ display : "none" },
						// 	"slow",
						// 	function() {
						// 		message.hide();
						// 	}
						// );
					});
				}, timeout);
			}
		};
		
		var initGlobalMessageRemovalOld = function(timeout) {
			var message = $("#global-message:visible");
			if (message.length) {
				window.setTimeout(function() {
					$(window).on("scroll.gm touchstart.gm mouseup.gm mousemove.gm", function() {
						$('#global-message').removeAttr("class");
						$(window).off("scroll.gm touchstart.gm mouseup.gm mousemove.gm");
						var element = message.find(".inner");
						var height = element.outerHeight(true);
						var top = element.css("top");
						var newTop = parseInt(top, 10) - height;
						element.animate(
							{ top : newTop },
							"slow",
							function() {
								message.hide();
							}
						);
					});
				}, 60000);
			}
		};
		
		
//		var initGlobalMessageShowOld = function(strMsg, type){
//			$('#global-message').find("h2").html(strMsg);
//			$('#global-message').attr("class", type);
//			$('#global-message').css("display","");
//			
//			$('#global-message .inner').css("top","0");
//			initGlobalMessageRemovalOld();
//		};
		
		/* Validate feature dates and leap year code START */
		var checkDate = function(params) {
			var dateText;
			if(params.validation_type == "validate-date"){
				dateText = params.fields.date+"/"+params.fields.month+"/"+params.fields.year;
				var regexp = /^(\d{1,2})([-\.\/])(\d{1,2})\2(\d{4})$/;
				var matchtext = dateText.match(regexp);//alert(matchtext);
					if (matchtext === null) {
						return false;
					}
					var date = new Date(+matchtext[4], +matchtext[3] - 1, +matchtext[1]);
					return date.getFullYear() == +matchtext[4] && date.getMonth() == +matchtext[3] - 1 && date.getDate() == +matchtext[1];
			}
			else if(params.validation_type == "date-month"){
				//dateText = params.fields.month+"/"+params.fields.year;
				//alert(params.month);
					
					var now = new Date;
				 	//month = params.fields.month - 1;//alert(matchtext);
				 //alert(params.fields.month - 1+","+ now.getMonth());
					//alert(params.fields.month);
			        if (params.fields.year > now.getFullYear() && params.fields.year < now.getFullYear()+ 20) {
			        		return true; 		
			        }
			        else if(params.fields.year == now.getFullYear()){
			        	if(params.fields.month - 1 >= now.getMonth()){
			        		return true;
			        	}
			        }
			        else if(params.fields.year == now.getFullYear()+ 20){
			        	if(params.fields.month - 1 <= now.getMonth()){
			        		return true;
			        	}	
			        }
			        else{
			        return false;
			        }
					
					
					//return date.getFullYear() == +matchtext[2] && date.getMonth() == +matchtext[1] - 1;
			}
			
		};
		/* Validate feature dates and leap year code END */
		
		var setCardCode = function(cardname) {
			var cname = cardname;
			if(cname == 'visa'){
				$('#cardcode').val("001"); 
				$('#policyid').val("-9800"); 
			} else if (cname == 'mastercard' || cname == 'mc') {
				$('#cardcode').val("002");
				$('#policyid').val("-9801"); 
			} else if (cname == 'amex') {
				$('#cardcode').val("003");
				$('#policyid').val("-9803"); 
			}
		};
		
		var datedom = $(".edit-date") || '';
		
		/* function to validate date with current date Start */
		var futureDateValidation = function(day, month, year, datedom){
			var curr = new Date().getTime();
			var newDate = year.val()+'/'+month.val()+'/'+day.val(); // day.val()+","+month.val()+","+
			var toadysDate = new Date(newDate).getTime(); 
			if(toadysDate > curr){ 
				return true;
			} else { 
				$('.next-refill .form-error-message').addClass('visible').removeClass('invisible');
				return false;
			}
		};
			
		/* Function to fetch the date from DOM Elements Start */
		var dateDom = function(){
			var day = $('input[name="date"]',datedom), 
				month = $('input[name="month"]',datedom), 
				year = $('input[name="year"]',datedom);
			return futureDateValidation(day,month,year,datedom);
		};
		
		/* Function to display error message for date Start */
		var validateDateDispalyError = function(){
			var date_flag = false;
			if($('input.replace-text[name="date"]',datedom).hasClass('error')||$('input.replace-text[name="month"]',datedom).hasClass('error')||$('input.replace-text[name="year"]',datedom).hasClass('error'))
				date_flag = true;
			if(date_flag){
				$('.next-refill .form-error-message').addClass("visible").removeClass('invisible');
				return false;
			}
		};
		
		/* Function to remove comma and trim price to 2 decimal places */
		
		var trimPrice = function(str){
			str = str.replace(',','');
			return parseFloat(str).toFixed(2);
		};
		
		/*
		 * Funciton to laod the ajax loading icon via javascript on page load to use ajaxoverlay function in main.js
		 */
		var loadAjaxLoadImg = function(){
			$('body').append('<img class="loading-hdden" src="/wcsstore/OPSMStorefrontAssetStore/images/loading.gif">');
		};

		/*
		 * Function to save the page url in sessionStorage
		*/
		var registerPage = function(){
			var fromUrl = window.location.href;
			if (sessionStorage){
				sessionStorage.removeItem('previousUrl');
			}
			sessionStorage['previousUrl'] = fromUrl;
		};
		
		var getContent = function($el)
		{
			if ($el.is(':input'))
			{
				return $el.val();
			}
			return $el.text();
		}

		var setContent = function($el, content)
		{
			//this is used for country at checkout billing address
			if ($el.is('select')) {
				$elIdSelector = '#' + $el.prop('id');
				if(typeof content !== 'number' && !content) {
					if($el.find('option:first').length){
						$el
						.val($el.find("option:first").val())
						.trigger('change');
					}
				} else if ($el.find('option').length) {//($($elIdSelector + ' option[value='+content+']') ) {
					var optionValue = null;
					$el.find('option').filter(function() {
					    return $(this).val().toLowerCase() === content.toLowerCase();
					  }).each(function(){
						  //store the first found
						  if(optionValue === null){
							  optionValue = $(this).val();
						  }
						  //select the perfect match
						  if($(this).val() === content) {
							  optionValue = $(this).val();
						  }
					  });
	                if (optionValue !== null) {
	                	$el.val(optionValue).trigger('change');
	                }
				}
				return $el;
			}
			if ($el.is(':input'))
			{
				$el.val(content);
				return $el;
			}
			$el.text(content);
			return $el;
		}
		

	    var checkSpecialKeys = function(e) {
	        if (e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40)
	            return false;
	        else
	            return true;
	    }
	    
	    var debugForm = function()
	    {
	    	return $.cookie('OPSM_DEBUG_FORM') === 'true';
	    }
	    
	    var getParameterByName = function(sParam) {
			var sPageURL = window.location.search.substring(1);
			var sURLVariables = sPageURL.split("&");
			for (var i = 0; i < sURLVariables.length; i++) {
				var sParameterName = sURLVariables[i].split("=");
				if (sParameterName[0] == sParam) {
					return sParameterName[1];
				}
			}
		};
		
		$(document).ready(function(){
			//must be settled here since countrycode could not be set before
			opsm.utils.customerCareNr = '1800 626 300';
			if(typeof countryCode !== 'undefined'){
				switch(countryCode){
					case 'AU':
						opsm.utils.customerCareNr = '1800 626 300';
						break;
					case 'NZ':
						opsm.utils.customerCareNr = '0800 444 539';
						break;
				}
			}
		});
		
		return {
			getDefaultMsgTimeout:getDefaultMsgTimeout,
//			customerCareNr:customerCareNr,
			dateDom:dateDom,
			validateDateDispalyError:validateDateDispalyError,
			ccf_validation : ccf_validation,
			setCardCode : setCardCode,
			scrollAnimate:scrollAnimate,
			loadAjaxLoadImg : loadAjaxLoadImg,
			trimPrice : trimPrice,
			registerPage : registerPage,
			checkDate : checkDate,
			initGlobalMessageRemoval: initGlobalMessageRemoval,
			initGlobalMessageRemovalOld: initGlobalMessageRemovalOld,
//			initGlobalMessageShowOld: initGlobalMessageShowOld,
			showAlertSuccess: showAlertSuccess,
			showAlertError: showAlertError,
			showAlertInfo: showAlertInfo,
			manageInPageAlertMsg: manageInPageAlertMsg,
			overlayDiv: function(selectorParent, action, dimension) {
			    var parent = $(selectorParent);
			    var overlay = parent.find(".filters--topoverlay");
			    if (overlay.length === 0) {
			        if (typeof dimension !== "number" || dimension === null) {
			            dimension = 30;
			        }
			        var cssStyle = "position: absolute; top: calc(50% - " + dimension / 2 + "px); left: calc(50% - " + dimension / 2 + "px); width:" + dimension + "px; height:" + dimension + "px";
			        overlay = $("<div class=\"filters--topoverlay filters--topoverlay-show\"><div class=\"loading\" style=\"" + cssStyle + "\"></div></div>");
			        parent.append(overlay);
			    }
			    if (action === "show") {
			        overlay.addClass("filters--topoverlay-show");
			    }
			    if (action === "hide") {
			        overlay.removeClass("filters--topoverlay-show");
			    }
			},
			getContent: getContent,
			setContent: setContent,
			checkSpecialKeys: checkSpecialKeys,
			debugForm: debugForm,
			getParameterByName: getParameterByName,
			isInt: isInt,
			changeGmapPlaceApiResults : changeGmapPlaceApiResults
			
			//Already managed by 
//			overlayPage: function(action, dimension) {
//				var parent = $('html');
//			    var overlay = parent.find(".filters--topoverlay");
//			    if (overlay.length === 0) {
//			        if (typeof dimension !== "number" || dimension === null) {
//			            dimension = 30;
//			        }
//			        var cssFullPage = "position: fixed; top: 0; left: 0; width: calc(200%); width: -moz-calc(200%);  width: -webkit-calc(200%); height: 200%;"
//			        var cssSpinnerStyle = "position: fixed; top: calc(50% - " + dimension / 2 + "px); left: calc(50% - " + dimension / 2 + "px); width:" + dimension + "px; height:" + dimension + "px";
//			        overlay = $("<div style=\"" + cssFullPage + "\" class=\"overflow-hidden filters--topoverlay filters--topoverlay-show\"><div class=\"loading\" style=\"" + cssSpinnerStyle + "\"></div></div>");
//			        parent.append(overlay);
//			    }
//			    if (action === "show") {
//			        overlay.addClass("filters--topoverlay-show");
//			    }
//			    if (action === "hide") {
//			        overlay.removeClass("filters--topoverlay-show");
//			    }
//			}
		}
	}());

  /*
   * Description : +, _ button functionality of PDP, Cart Page
   * 
   */
	opsm.qtyBtns = (function(){
    
	    var item_qty = 0,
	    	update_via_ajax = false,
	    	minus_update_func,
	    	plus_update_func,
	    	btns_dom = '';
	    
	    
	    var increaseQty = function(e){
	        var curr_count = parseInt($('[name=quantity]',$(e).parent()).html());
	        $('[name=quantity]',$(e).parent()).html(curr_count+1);
	        $('.minus',$(e).parent()).prop('disabled',false);
	    }
	      
	    var decreaseQty = function(e){
	        var curr_count = parseInt($('[name=quantity]',$(e).parent()).html());
	        if (curr_count>1) {
	          $('[name=quantity]',$(e).parent()).html(curr_count-1);  
	        }
	        if (curr_count==2) {
	          $(e).prop('disabled',true);
	        }
	    }
	    
	    var initQuantityBtns = function(){
	    	
	    	$('.minus',btns_dom).on('click',function(e){
	    		e.preventDefault();
	    		minus_btn_func(this);
	    	});
	    	$('.plus',btns_dom).on('click',function(e){
	    		e.preventDefault();
	    		plus_btn_func(this);
	    	});
	    }
	    
	    var init = function(options){
	    	//console.log(options.increase_qty);
	    	if(typeof options == 'undefined'){
	    		update_via_ajax = false;
	    		minus_btn_func = decreaseQty;
	    		plus_btn_func = increaseQty;
	    	} else {
	    		update_via_ajax = options.update_via_ajax;
	    		minus_btn_func = options.decrease_qty;
	    		plus_btn_func = options.increase_qty;
	    	}
	    	btns_dom = $(document).on('load',$('.plus').parent(),function(){});
	    	btns_dom_minus = $(document).on('load',$('.minus').parent(),function(){});
	    	initQuantityBtns();
	    }
	    
	    return {
		      init : init
	    };
	}());
    
	    var applyPromoCodeUI = function(){
	      if($("#promoApplied").val() != null){
	        		$.cookie("promo", $('#promoCodesList').val());
	        	}
	        	var promovalue = $('#wcs-promoApplied').val();
	//        	if(promovalue == ""){
	//        		if($.cookie("promo")){
	//        			promovalue =$.cookie("promo");
	//        		}
	//        	}
				if(null!= promovalue && "" != promovalue) {
					if(promovalue.length) {
						$("#promo").find('label').addClass("c_on");
						$("#promo_code").show();
						$("#promocode").val(promovalue);
						$("#promocode").attr("disabled","disabled");
						$('#promofailure').hide();
						$('#promosuccess, .promo-container .remove, .success').show();
						$('#validate_promocode').hide();
						$('#promo promo-icon, #promo #has_promo').attr("disabled", "disabled");
						$("#has_promo").attr("disabled","disabled");
					}
				}
				//Remove promocode cookie if the page is Order Confirmation
				if ($('section.order-thankyou').length) {
					//remove promocode cookie
					$.cookie("promo", null);
				}
	            $(".badges_p2 span:nth-child(2)").addClass("badges-second-child");
	            $(".badges_p2 span:nth-child(3)").addClass("badges-third-child");
	            $(".badges_p2 span:nth-child(4)").addClass("badges-forth-child");
	            $(".badges_p2 span:nth-child(5)").addClass("badges-fifth-child");
	            
	            $('.order-wrapper > ul:last-child').css('border-bottom','none');
	    }  
}(window,document,jQuery,opsm));

//Bind functions to DOM load
jQuery(opsm.utils.manageInPageAlertMsg);

//opsm.qtyBtns.init({});

/* Common listeners for OPSM */
/* your account subscription */
if($('.subs-edit').length){
	$('a.radio').on('click',function(){//CREDIT CARDS
		//select radio
		$('a.radio').removeClass('open');
		$(this).addClass('open');
		//set payment option value
		//hide cards and saved card pmt options
		//$('.row3, .row4').hide();
		//$('.row6').fadeIn(1000);
	}); 
}
