if(!window.addEventListener){
	window.attachEvent("onmessage", function(e){
		try{
			var data = $.parseJSON(e.data);
			console.log ($.isEmptyObject (data))
			if (!$.isEmptyObject (data)){
				var bufferHeight = data.height + 100;
				$('#rightNowContainer, #rightNowWrapper').height(bufferHeight);
			}
		}catch(e){
		}
	});
}else{
	window.addEventListener("message", function(e){
		try{
			var data = $.parseJSON(e.data);
			if (data.height){
				$('#rightNowContainer, #rightNowWrapper').height(data.height);
			}
		}catch(e){
		}
	});
}

function closeUpdatePsw() {
    $('.header-update-reset-password-modal').css('display', 'none').attr('aria-hidden', 'true');
    $('.background-update-reset').css('display', 'none');
    $('#new-password-update').val('');
    $('#confirm-new-password-update').val('');
    $('#logonPasswordOld').val('');
    return false;
 }

$(function(){
	$('.phoneNumberOnly').on('keyup', function(e){
		var $this = $(this);
		if ($this.val().match(/[^0-9-]/g)) {
			$this.val($this.val().replace(/[^0-9-]/g, ''));
	    }
		if ($this.val().match(/[0-9]{10}/)) {
			$this.val($this.val().match(new RegExp('[0-9]{4,6}$|[0-9]{3}', 'g')).join("-").substr(0,12));
		}
	});
});

function checkPswDouble(name, contentElement) {
	var val = document.getElementById(name).value;
	var elEightChar = document.getElementById('eight-char-' + contentElement);
	var elUpperChar = document.getElementById('upper-char-' + contentElement);
	var elLowerChar = document.getElementById('lower-char-' + contentElement);
	var elNumberChar = document.getElementById('number-char-' + contentElement);
	var elSpecialChar = document.getElementById('special-char-' + contentElement);
	//element.classList.add("mystyle");
	/*
	 * 
	 * 8 characters
	 * 1 uppercase letter (A-Z)
	 * 1 lowercase letter (a-z)
	 * 1 number (0-9)
	 * 1 special character (!£#)
	 * 
	 */
	if (val !== '') {
		//8 characters
		if (val.length >= 8) {
			//ok
			console.log('lungo 8');
			elEightChar.classList.add("correct");
			elEightChar.classList.remove("error");
		} else {
			//error
			elEightChar.classList.add("error");
			elEightChar.classList.remove("correct");
		}
		
		//1 uppercase letter (A-Z)
		if (hasUpperCase(val)){
			//ok
			console.log('Upper');
			elUpperChar.classList.add("correct");
			elUpperChar.classList.remove("error");
		} else {
			//error
			elUpperChar.classList.add("error");
			elUpperChar.classList.remove("correct");
		}
		
		//1 lowercase letter (a-z)
		if (hasLowerCase(val)){
			//ok
			console.log('Lower');
			elLowerChar.classList.add("correct");
			elLowerChar.classList.remove("error");
		} else {
			//error
			elLowerChar.classList.add("error");
			elLowerChar.classList.remove("correct");
		}
		
		//1 number (0-9)
		if (hasNumber(val)){
			//ok
			console.log('Number');
			elNumberChar.classList.add("correct");
			elNumberChar.classList.remove("error");
		} else {
			//error
			elNumberChar.classList.add("error");
			elNumberChar.classList.remove("correct");
		}
		
		//1 special character (!£#)
		if (hasSpecialChar(val)){
			//ok
			console.log('Special');
			elSpecialChar.classList.add("correct");
			elSpecialChar.classList.remove("error");
		} else {
			//error
			elSpecialChar.classList.add("error");
			elSpecialChar.classList.remove("correct");
		}
	} else {
		clearErrorDouble(contentElement);
	}
}

function clearErrorDouble(contentElement) {
	var elEightChar = document.getElementById('eight-char-' + contentElement);
	var elUpperChar = document.getElementById('upper-char-' + contentElement);
	var elLowerChar = document.getElementById('lower-char-' + contentElement);
	var elNumberChar = document.getElementById('number-char-' + contentElement);
	var elSpecialChar = document.getElementById('special-char-' + contentElement);
	
	elEightChar.classList.remove("error");
	elEightChar.classList.remove("correct");
	elUpperChar.classList.remove("error");
	elUpperChar.classList.remove("correct");
	elLowerChar.classList.remove("error");
	elLowerChar.classList.remove("correct");
	elNumberChar.classList.remove("error");
	elNumberChar.classList.remove("correct");
	elSpecialChar.classList.remove("error");
	elSpecialChar.classList.remove("correct");
}

function checkPsw(name) {
	var val = document.getElementById(name).value;
	var elEightChar = document.getElementById('eight-char');
	var elUpperChar = document.getElementById('upper-char');
	var elLowerChar = document.getElementById('lower-char');
	var elNumberChar = document.getElementById('number-char');
	var elSpecialChar = document.getElementById('special-char');
	//element.classList.add("mystyle");
	/*
	 * 
	 * 8 characters
	 * 1 uppercase letter (A-Z)
	 * 1 lowercase letter (a-z)
	 * 1 number (0-9)
	 * 1 special character (!£#)
	 * 
	 */
	if (val !== '') {
		//8 characters
		if (val.length >= 8) {
			//ok
			elEightChar.classList.add("correct");
			elEightChar.classList.remove("error");
		} else {
			//error
			elEightChar.classList.add("error");
			elEightChar.classList.remove("correct");
		}
		
		//1 uppercase letter (A-Z)
		if (hasUpperCase(val)){
			//ok
			elUpperChar.classList.add("correct");
			elUpperChar.classList.remove("error");
		} else {
			//error
			elUpperChar.classList.add("error");
			elUpperChar.classList.remove("correct");
		}
		
		//1 lowercase letter (a-z)
		if (hasLowerCase(val)){
			//ok
			elLowerChar.classList.add("correct");
			elLowerChar.classList.remove("error");
		} else {
			//error
			elLowerChar.classList.add("error");
			elLowerChar.classList.remove("correct");
		}
		
		//1 number (0-9)
		if (hasNumber(val)){
			//ok
			elNumberChar.classList.add("correct");
			elNumberChar.classList.remove("error");
		} else {
			//error
			elNumberChar.classList.add("error");
			elNumberChar.classList.remove("correct");
		}
		
		//1 special character (!£#)
		if (hasSpecialChar(val)){
			//ok
			elSpecialChar.classList.add("correct");
			elSpecialChar.classList.remove("error");
		} else {
			//error
			elSpecialChar.classList.add("error");
			elSpecialChar.classList.remove("correct");
		}
	} else {
		clearError();
	}
}

function clearError() {
	var elEightChar = document.getElementById('eight-char');
	var elUpperChar = document.getElementById('upper-char');
	var elLowerChar = document.getElementById('lower-char');
	var elNumberChar = document.getElementById('number-char');
	var elSpecialChar = document.getElementById('special-char');
	
	elEightChar.classList.remove("error");
	elEightChar.classList.remove("correct");
	elUpperChar.classList.remove("error");
	elUpperChar.classList.remove("correct");
	elLowerChar.classList.remove("error");
	elLowerChar.classList.remove("correct");
	elNumberChar.classList.remove("error");
	elNumberChar.classList.remove("correct");
	elSpecialChar.classList.remove("error");
	elSpecialChar.classList.remove("correct");
}

function hasUpperCase(myString) {
  return /[A-Z]/.test(myString);
}

function hasLowerCase(myString) {
  return /[a-z]/.test(myString);
}


function hasNumber(myString) {
  return /\d/.test(myString);
}

function hasSpecialChar(myString) {
	var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	return format.test(myString);
}

$(function(){
	$('.newPhoneNumberOnly').on('keypress', function(e){
		if (e.target.value.length === 1) {
			e.target.value = '('+e.target.value;
		}else if(e.target.value.length === 4){
			e.target.value = e.target.value+') ';
		}else if(e.target.value.length === 9){
			e.target.value += ' - ';
		}
		if (e.target.value.length === 16) {
			return e.target.value;
		}
		var key = e.keyCode;
		if (key === 8) { /* If backspace is pressed*/
			if (e.target.value.length === 2 || e.target.value.length === 6) {
				/*if next char to be removed is ' ' or '(' remove last two characters from input value*/
				e.target.value = e.target.value.substr(0, e.target.value.length - 2);
			}else if(e.target.value.length === 12){
				/*if next char to be removed is ' )' remove last three characters from input value*/
				e.target.value = e.target.value.substr(0, e.target.value.length - 3);
			}
			/*remove last character*/
			e.target.value = e.target.value.substr(0, e.target.value.length);
		}
		/*if key pressed is not number or input got date*/
		else if ((!((key > 47 && key < 58) || (key > 95 && key < 106)) ||
			e.target.value.length === 16 || e.shiftKey) && key != 9 && key != 37 && key != 39) {
			e.preventDefault(); //no nothing
		}
		if (e.target.value.match(/[^0-9\s()-]/g)) {
			e.target.value = e.target.value.replace(/[^0-9\s()-]/g, '');
	    }
	});
});

function getCustId(){
	if (constants.ajaxParams['userId'])
		return constants.ajaxParams['userId'];
	return '';
}

function isUserAuthenticated(){
	var isAuthenticated = "not authenticated";
	if (constants.ajaxParams['loggedIn']){
		isAuthenticated = "authenticated";
	}
	return isAuthenticated;
}

function getUserRegistrationStatus(){
	var isRegistered = '';
	if (constants.ajaxParams['loggedIn']){
		isRegistered = "registered";
	}
	return isRegistered;
}

function getUserInsuranceEligibilityStatus(){
	var userInsuranceEligibilityStatus = 'not synced';
	if (constants.ajaxParams['insuranceCheckEligibility']){
		userInsuranceEligibilityStatus = "synced";
	}
	return userInsuranceEligibilityStatus;
}

function getBasicDLObject(){
	var _dl = {
			page_name: '',
			authentication_status : '',
			registration_status : '',
			country: 'us',
			page_layout: "desktop",
			language: 'en'
		};
	_dl.authentication_status = isUserAuthenticated();
	_dl.registration_status = getUserRegistrationStatus();
	//_dl.insurance_status = getUserInsuranceEligibilityStatus();
	_dl.cust_id = getCustId();
	return _dl
}

/*
 * var glass = {
 * 	'product_id':'...',
 * 	'reg_price':'...',
 * 	'category':'...',
 * 	'frame_fit': '...',
 * 	'model': '...',
 * 	'frame_shape': '...',
 * 	'face_shape': '...',
 * 	'hto_product': '...',
 * 	'badge': '...'
 * };
 *
 *
 * var lens = {
 * 	'product_id':'...',
 * 	'reg_price':'...',
 * 	'category':'...',
 * };
 */

function addTrackProducts( glass, lens)
{

	if (_dl.products == null){
		_dl.products = [];
	}
	glass.applied_lenses = lens;
  	_dl.products.push(glass);

}


function addTrackProductsValues(product_id, reg_price,  category, brand, frame_fit, model, frame_shape, face_shape, hto_product, badge,
		lens_product_id, lens_reg_price,  lens_category)
{

	if (_dl.products == null){
		_dl.products = [];
	}
	//--glass
	var glass = {};
	glass.product_id =product_id;
	glass.reg_price =reg_price;
	glass.category =category;
	glass.brand =brand;
	glass.frame_fit = frame_fit;
	glass.model = model;
	glass.frame_shape = frame_shape;
	glass.face_shape = face_shape;
	glass.hto_product= hto_product;
	glass.badges=badge;
	//--lenti associate
	var lens = {};
	lens.product_id = lens_product_id;
  	lens.reg_price = lens_reg_price;
  	lens.category = lens_category;
  	glass.applied_lenses = lens;
  	_dl.products.push(glass);

}

function globalAddTrackProductsValues(product_id, reg_price,  category, brand, frame_fit, model, frame_shape, face_shape, hto_product, badge,
		lens_product_id, lens_reg_price,  lens_category)
{

	if (_dl.products == null){
		_dl.products = [];
	}
	//--glass
	var glass = {};
	glass.product_id =product_id;
	glass.reg_price =reg_price;
	glass.category =category;
	glass.brand =brand;
	glass.frame_fit = frame_fit;
	glass.model = model;
	glass.frame_shape = frame_shape;
	glass.face_shape = face_shape;
	glass.hto_product= hto_product;
	glass.badges=badge;
	//--lenti associate
	var lens = {};
	lens.product_id = lens_product_id;
  	lens.reg_price = lens_reg_price;
  	lens.category = lens_category;
  	glass.applied_lenses = lens;
  	return glass;

}



function addTrackProductsShoppingCart(glass, lens)
{

	if (_dl.shopping_cart == null){
		_dl.shopping_cart = [];
	}
	glass.applied_lenses = lens;
  	_dl.shopping_cart.push(glass);

}



function addTrackProductsValuesShoppingCart(product_id, reg_price,  category,brand, frame_fit, model, frame_shape, face_shape, hto_product, badge,
		lens_product_id, lens_reg_price,  lens_category)
{

	if (_dl.shopping_cart == null){
		_dl.shopping_cart = [];
	}
	//--glass
	var glass = {};
	glass.product_id =product_id;
	glass.reg_price =reg_price;
	glass.category =category;
	glass.brand =brand;
	glass.frame_fit = frame_fit;
	glass.model = model;
	glass.frame_shape = frame_shape;
	glass.face_shape = face_shape;
	glass.hto_product= hto_product;
	glass.badges=badge;
	//--lenti associate
	var lens = {};
	lens.product_id = lens_product_id;
  	lens.reg_price = lens_reg_price;
  	lens.category = lens_category;
  	glass.applied_lenses = lens;

  	_dl.shopping_cart.push(glass);

}



function addTrackProductsProductsViewed(glass, lens)
{

	if (_dl.products_viewed == null){
		_dl.products_viewed = [];
	}
	glass.applied_lenses = lens;
  	_dl.products_viewed.push(glass);

}



function addTrackProductsValuesProductsViewed(product_id, reg_price,  category, brand,frame_fit, model, frame_shape, face_shape, hto_product, badge,
		lens_product_id, lens_reg_price,  lens_category)
{

	if (_dl.products_viewed == null){
		_dl.products_viewed = [];
	}
	//--glass
	var glass = {};
	glass.product_id =product_id;
	glass.reg_price =reg_price;
	glass.category =category;
	glass.brand =brand;
	glass.frame_fit = frame_fit;
	glass.model = model;
	glass.frame_shape = frame_shape;
	glass.face_shape = face_shape;
	glass.hto_product= hto_product;
	glass.badges=badge;
	//--lenti associate
	var lens = {};
	lens.product_id = lens_product_id;
  	lens.reg_price = lens_reg_price;
  	lens.category = lens_category;
  	glass.applied_lenses = lens;

  	_dl.products_viewed.push(glass);

}



function addTrackProductsFavoriteProducts( glass, lens)
{
	if (_dl.favorite_products == null){
		_dl.favorite_products = [];
	}
	glass.applied_lenses = lens;
  	_dl.favorite_products.push(glass);

}



function addTrackProductsValuesFavoriteProducts(product_id, reg_price,  category, brand, frame_fit, model, frame_shape, face_shape, hto_product, badge,
		lens_product_id, lens_reg_price,  lens_category)
{

	if (_dl.favorite_products == null){
		_dl.favorite_products = [];
	}
	//--glass
	var glass = {};
	glass.product_id =product_id;
	glass.reg_price =reg_price;
	glass.category =category;
	glass.brand =brand;
	glass.frame_fit = frame_fit;
	glass.model = model;
	glass.frame_shape = frame_shape;
	glass.face_shape = face_shape;
	glass.hto_product= hto_product;
	glass.badges=badge;
	//--lenti associate
	var lens = {};
	lens.product_id = lens_product_id;
  	lens.reg_price = lens_reg_price;
  	lens.category = lens_category;
  	glass.applied_lenses = lens;

  	_dl.favorite_products.push(glass);

}





function callTrackAnalytics(_dl){
	try {

		    if(typeof _dl.shopping_cart == 'undefined'){
				if(sessionStorage.getItem('trackShoppingCart') !== null){
					var shopping_cart = $.parseJSON(sessionStorage.getItem('trackShoppingCart'));
					shopping_cart = shopping_cart == null ? [] : shopping_cart;
					_dl.shopping_cart = shopping_cart;
				}
			} 
			_dl.favorite_products = []; 
 
			_dl.products_viewed = []; 

			removeUndefinedRegistrationEntry(_dl);
			var objectFound = false;
			$.each( _dl, function( key, value ) {
				if(key=='site_events'){
					$.each( value, function( currentKey, currentVal) {
						//console.debug( currentKey + ": " + currentVal);
						if(objectFound == false){
							if(currentKey == 'remove_from_cart' || currentKey == 'add_to_cart' || currentKey == 'add_to_favorites' || currentKey == 'remove_from_favorites'){
								objectFound = true;
							}
						}
					});
				}
			});
			_trackAnalytics(_dl);

		} catch(err) {
			console.debug('_dl: error on tracking');
	}
}

function removeUndefinedRegistrationEntry(utagObj){
	$.each(utagObj, function(key, val) {
		if(key=='registration_status' && val=="undefined"){
			utagObj[key] = '';
		}
	});
}

function removeNullEntries(currentObject){
	var newObj = [];
    $.each(currentObject, function(key, val) {
    	if(typeof val == 'undefined' || val==null || val=='null' ){
    	} else {
    		newObj.push(val);
    	}
    });
    return newObj;
}

function seeEvents(el){
	var $el = $(el);

	var applicableEvents = {};
	$el.parents().andSelf().map(function(){
	    var $this = $(this),
	        events = $._data($this[0] , 'events');

	    if (events){
	    	var hasEvents = false;

	    	for (var eventType in events){
	    		var eventList = events[eventType];

	    		for (var i = 0; i < eventList.length; i++){
	    			var event = eventList[i];
	    			if (event.selector == null || event.selector == '' || $el.is(event.selector)){

	    				if (!applicableEvents[eventType]){
	    					applicableEvents[eventType] = [];
	    				}
	    				hasEvents = true;
	    				applicableEvents[eventType].push(event)
	    			}
	    		}

	    	}

	    }
	});

	return applicableEvents;
}


var zipRegex;

window.console = window.console || {};
window.console.log = window.console.log || function(){};
window.console.error = window.console.error || function(){};
window.console.debug = window.console.debug || function(){};

var processingMiniTAHCart = false;




/**
 * Invoke the reset password service.
 * @param params the url parameters to use in the service
 * @return a jquery promise object, which can have new handlers attached that fire when the ajax request succeeds or fails
 */
function invokeResetPasswordService(params){

	var promiseObj = $.ajax({
		url: getAbsoluteURL() +"AjaxResetPassword",
		data: params,
		dataType: 'html',
		type: 'post',
		success: function(response){
			try{
				var serviceResponse = response;
				if (typeof serviceResponse == 'string' && serviceResponse != '' && serviceResponse != 'null'){
					serviceResponse = filterAjaxResponse(response);
				}

				if((serviceResponse.ErrorMessageJson!=null && !serviceResponse.ErrorMessageJson.success) || serviceResponse.success == false){
					if($('#ResetPasswordFailureResponseMessageDiv').length > 0){
						$('#ResetPasswordFailureResponseMessageDiv').html(serviceResponse.errorMessage);
					}
					if($('#examResetPasswordFailureResponseMessageDiv').length > 0){
						var msg = $('#ResetPasswordErrorMsg').html();
						$('#examResetPasswordFailureResponseMessageDiv').html(msg);
					}
				}
				else if(serviceResponse.PASSWORDEXPIRED !=null){
					$('#header-reset-password-modal').css('display', 'none');
					$('#header-set-a-new-password-modal').css('display', 'block');
					$('.sign-in-link').addClass("open clicked no-show");
					removeUIoverlay();
					addUIoverlay();
					return false;
				}
				else{
					if($('#ResetPasswordSuccessFullResponseMessageDiv').length > 0) {
						$('#ResetPasswordFailureResponseMessageDiv').html('');
						$('#header-reset-password-modal').css('display', 'none').attr('aria-hidden', 'true');
						$('#header-reset-password-done-modal').css('display', 'block').attr('aria-hidden', 'false');
					}
					if($('#examResetPasswordSuccessFullResponseMessageDiv').length > 0){
						$('#examResetPasswordSuccessFullResponseMessageDiv').html(MessageHelper.messages["PASSWORD_RESET_SUCCESS"]);
					}
				}

			}catch(err){
				console.error(err);
			}
		},
		error: function(response){
			if (response){
				try{
					var serviceResponse = filterAjaxResponse(response.responseText);

					if(serviceResponse){
						 if (serviceResponse.errorMessage) {
							if($('#ResetPasswordFailureResponseMessageDiv').length > 0){
								$('#ResetPasswordFailureResponseMessageDiv').html(serviceResponse.errorMessage);
							}
						} else {
							if (serviceResponse.errorMessageKey) {
								if($('#ResetPasswordFailureResponseMessageDiv').length > 0){
									$('#ResetPasswordFailureResponseMessageDiv').html(serviceResponse.errorMessageKey);
								}
							}
						}
					}
				}catch(e){
					console.error(e);
				}
			}
		}
	});

	return promiseObj;
}


//EXTENSIONS:
(function( $ ) {

	$.fn.ariaHide = function() {
		this.hide().attr('aria-hidden', 'true');
		return this;
	};

	$.fn.ariaShow = function() {
		this.show().attr('aria-hidden', 'false');
		return this;
	};

	$.validator.setDefaults ({
		errorPlacement:function (error, element)
		{
			$(error).attr ('aria-live', 'rude').insertAfter (element);
		},
		invalidHandler:function (form, validator) {
			// Focus on first error
			var errors = validator.numberOfInvalids();
	        if (errors)
	            validator.errorList[0].element.focus();
		}
	});

	$.validator.addMethod("phoneValidation", function(value, element){
		if(value.length == 0) {
			var required = $(this).closest('.row').children(':radio').is(':checked');
			$(element).closest('.row').find('input:text').each(function() {
				required = required || $(this).val().length > 0;
			});
			return !required;
		}
		return value.length == element.maxLength;
	}, 'Please enter a valid number');

	$.validator.addMethod("postalFormatCheck", function(value, element){
		var regexObj = {canada : /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i ,usa : /^\d{5}(-\d{4})?$/};
		if($('#storeCountryName').val()=="CA"){
			return regexObj.canada.test(value);
		}
		else{
			return regexObj.usa.test(value);
		}
	});

	$.validator.addMethod('CCExp', function(value, element, params) {
	      var minMonth = new Date().getMonth() + 1;
	      var minYear = new Date().getFullYear();
	      var month = parseInt($(params.month).val(), 10);
	      var year = parseInt($(params.year).val(), 10);
	      return (year > minYear || (year === minYear && month >= minMonth));
	});

	$.validator.addMethod('contactQuantity', function(value, element, params) {
	      var left = parseInt($(params.left).val(), 10);
	      var right = parseInt($(params.right).val(), 10);
	      return ((left+right) > 0);
	});

	$.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-z]+$/i.test(value);
	}, "Letters only please");

	// Validate against special characters
	$.validator.addMethod("specialCharacters", function(value)
	{
		var userInput  = value;
		var valid = false;

		if (userInput.indexOf ('!') == -1 && userInput.indexOf ('#') == -1)
			valid = true;

		return valid;
	}, '* invalid');

	// Zip code/postal code validation
	$.validator.addMethod("zipCode", function(value, element)
	{
		var valid = false;
		var checkRegex = true;
		var form = $(element).closest('form').attr("id");
		if($('.drop_down_country')){
			if($('#'+form+' .drop_down_country').val() == 'IE'){
				checkRegex = false;
				valid = true;
				$('#zipCode').removeClass('required').next('.required').remove();
				$('#zipCode1').removeClass('required').next('.required').remove();
				if($('#zipCode').val() == ''){
					$('#zipCode').attr('name','zip');
				} else {
					$('#zipCode').attr('name','zipCode');
				}
				if($('#zipCode1').val() == ''){
					$('#zipCode1').attr('name','zip');
				} else {
					$('#zipCode1').attr('name','zipCode');
				}
			}
		}
		if(checkRegex){
			var userInput  = value;

			// If countryRegex is undefined
			// Check against both US/Canadian postal codes
			// Otherwise, check against the specific country type
			if (zipRegex == undefined)
			{
				regexp = new RegExp(zipCodeRegex);
				if( regexp.test(userInput) ) {
					valid = true;
				}
			}
			else
			{
				regexp = new RegExp (zipRegex);

				if(regexp.test(userInput))
					valid = true;
				else
					valid = false;
			}
		}
		return valid;
	}, '* invalid');

	$.validator.addMethod('date', function(value, element) {
		var form = $(element).parents('form');
		var day = form.find('.validate-day').val();
		var month = form.find('.validate-month').val();
		var year = form.find('.validate-year').val();

		var dateIsSet = year != 0 || day != 0 || month != 0;
		return !dateIsSet || isValidDate(year, month, day);
	}, '* invalid');

	$.validator.addMethod('age', function(value, element) {
		var form = $(element).parents('form');
		var day = form.find('.validate-day').val();
		var month = form.find('.validate-month').val();
		var year = form.find('.validate-year').val();

		var dateIsSet = year != 0 || day != 0 || month != 0;
		return !dateIsSet || MyAccountDisplayExtJS.validateAge(new Date(year, month-1, day));
	}, '* invalid');

	// Global JQuery validator methods
	// Phone number validation
	$.validator.addMethod("phoneNumber", function(value) {
		var val = value;
		var isCorrect = false;

		regexp = new RegExp (phoneNumberRegex);

		if(regexp.test(val) || $.trim(value).length == 0)
			isCorrect = true;
		else
			isCorrect = false;

		return isCorrect;
	}, '* Invalid');

	if($('#storeCountryName').val()=="US")
		$.validator.messages.postalFormatCheck = 'Please enter a valid ZIP code';
	else
		$.validator.messages.postalFormatCheck = 'Please enter a valid postal code';

	$.validator.addMethod("dotPos_formatCheck", function(value) {
		var emailLength=value.length;
		var lastDotPos= value.lastIndexOf(".");
		if(emailLength-(lastDotPos+1)>=2){
			return true;
		}
		else{
			return false;
		}

	},
	MessageHelper.messages["ERROR_EmailEmpty"]
);

})( jQuery );

jQuery.validator.addMethod("antipattern", function(value, element, param) {
    return this.optional(element) || !param.test(value);
}, "Invalid format.");

jQuery.validator.addMethod("logonIdVerifyRequired", function(value, element, param) {
	if(value == 'Enter e-mail address'){
		return false;
	}else{
		return true;
	}
}, "Please re-enter your email address");

if ($.validator){
	jQuery.validator.addMethod("zip", function(value, element) {
		var trimmedValue = $.trim(value);

	    return trimmedValue.match(constants.regex.zip.usa) || trimmedValue.match(constants.regex.zip.canada);

	}, MessageHelper.messages["ERROR_ZipCodeEmpty"]);

	// show the "did you mean to be on canada site" message if the user is searching for canada zip code
	jQuery.validator.addMethod("caZip", function(value, element) {

		if (constants.ajaxParams['storeId'] == '10852'){
			// user is on the canada store, so this is valid
			return true;
		}else if ($.trim(value).match(constants.regex.zip.usa)){
			// user is on the US store and typed a US zip, so this is valid
			return true;
		}else{
			// user on the US store and typed a non-US zip, so this is not valid
			return false;
		}

	}, MessageHelper.messages["STORE_FINDER_ZIP_COUNTRY_MISMATCH"]);
}

function removeEmptyUtagEntries(utagObj){
	$.each(utagObj, function(key, val) {
		if (val == undefined) return;

		if(val=="" || val==null){
			delete utagObj[key]
		}else if (typeof val == 'string'){
			val = val.replace(/\\/g, "\\\\");
			val = val.replace(/'/g, "\\'");
			val = val.replace(/"/g, "\\\"");
		}
		utagObj[key]=val;
	});
}

$.extend({
	getUrlVars: function() {
		var urlParams = [];
	    var hasParams = (window.location.search.indexOf('?') != -1) && (window.location.search.indexOf('=') != -1);

	    if (hasParams){
	    	var keyValuePairs = window.location.search.substring(1).split('&');
	    	for(var i = 0; i < keyValuePairs.length; i++) {
		    	var kvp = keyValuePairs[i].split('='),
		    		key = kvp[0],
		    		value = kvp[1];
		    	urlParams.push(key);
		    	urlParams[key] = decodeURIComponent(value);
		    }
	    }

	    return urlParams;
	},
	getUrlVar: function(name) {
		return $.getUrlVars()[name];
	}
});

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$.support.cors = true;
$.validator.setDefaults({ onkeyup: false });

/* Accessible Drop Down Menus */
var keyCodeMap = {
        48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
        65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
        77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
        96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9"
}

function updateDropdownMenus(that) {
	var $this = $(that).not ('#ResetPasswordForm input[type="text"]');

	$('.nav li > a').removeClass ('clicked hovered')
	$this.find ('> a:first').addClass('clicked hovered');
	repaint ();
}

$.fn.setup_navigation = function (settings)
{
	settings = jQuery.extend ({menuHoverClass: 'show-menu'}, settings);

	// Add ARIA role to menubar and menu items
	//$(this).attr('role', 'menubar').find('li').attr ('role', 'menuitem');
	$('#sub_links li').attr ('role', 'menuitem');

	var top_level_links = $(this).find('> li > a').not('.expand');

	// Set tabIndex to -1 so that top_level_links can't receive focus until menu is open
	$(top_level_links).siblings ('ul')
		.attr ('data-test','true')
		.attr ({ 'aria-hidden': 'true', 'role': 'menu' });
	$(top_level_links).siblings ('ul').not("#header-sign-in-modal, #header-register-modal").find ('a').attr ('tabIndex', -1);

	// Adding aria-haspopup for appropriate items
	$(top_level_links).each(function ()
	{
		//if ($(this).next('ul').length > 0)
			//$(this).parent('li').attr('aria-haspopup', 'true');
	});

	$(top_level_links).on ('keydown', function (e)
	{
		if (e.keyCode == 13)
		{
			var $href = $(this).attr ('href');

			if ($href != '#')
				window.location = $href;
		}
	});

	var __prjid5_shouldClose = false;
	var __prjid5_timeOut = 300;
	
	var mouseEnterOrFocus = function (ev)
	{
		__prjid5_closeFloatingMenu();
		__prjid5_shouldClose = false;
		
		//$('.nav li > a').not ($(this).find ('> a')).removeClass ('li-hovered');
		//$(top_level_links).not ($(this).find ('> a')).removeClass('hovered').next ('.menu').hide ();
		var $a = $(ev.target).closest("li.has-drop").find("> a")
		$('.nav li > a').not($a).removeClass ('li-hovered');
		$(top_level_links).not($a).removeClass('hovered').next ('.menu').hide ();

		var $this = $a.not('.expand');
		/*if ($this.attr("id") === "register")
		{
			$this.addClass ('hovered');
			return;
		}*/

		if($this.attr("id") == "register" && $("#Header_SignIn_Link").hasClass("clicked")){
			return;
		}

		if($this.attr("id") == "Header_SignIn_Link" && $("#register").hasClass("clicked")){
			return;
		}

		$this.addClass ('hovered');

		$this.closest('div')
			.find('.'+settings.menuHoverClass)
			.attr('aria-hidden', 'true')
			.removeClass(settings.menuHoverClass)
			.find('a')
			.attr('tabIndex', -1);

		$this.siblings('div')
			.attr('aria-hidden', 'false')
			.addClass(settings.menuHoverClass)
			.find('a').not ('.disabled')
			.attr('tabIndex', 0);
	};
	//$(top_level_links).closest('li > a').on('focus', mouseEnterOrFocus);
	$(top_level_links).closest('li').on('mouseenter focus', mouseEnterOrFocus);
	$(top_level_links).closest('li > a').on('mouseenter focus', mouseEnterOrFocus);
	//.on('focus', '> a:first', function(){$(this).closest('li').trigger('mouseleave');})
	$(top_level_links).closest('li').bind ('mouseleave', function () {
		__prjid5_shouldClose = true;
		setTimeout(function(){
			if(__prjid5_shouldClose==true && !$("input#headerEmailAddress").is(':focus') && !$("input#header-logonPassword").is(':focus')){
				__prjid5_closeFloatingMenu();
			}},
			__prjid5_timeOut);

	}).on('mousedown', function(e){
		//ENRICO updateDropdownMenus(this);
	})

	$(top_level_links).siblings ('.expand').on('keydown', function (e) {
		if (e.keyCode == 13)
		{
			$(this).hide ();

			$('.li-hovered, .hovered, .clicked').removeClass ('li-hovered hovered clicked');

			var $this = $(this).siblings('a');
			$this.addClass ('hovered');

			if ($('#header-reset-password-modal').is (':visible'))
			{
				$('#header-reset-password-modal').hide ();
				$('.sign-in-link').removeClass ('hovered no-show');
			}


			$this.closest('ul')
				.find('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
				.attr('tabIndex', -1);

			$this.siblings('ul')
				.attr('aria-hidden', 'false')
				.addClass(settings.menuHoverClass)
				.find('a').not ('.disabled')
				.attr('tabIndex', 0);



			if ($this.closest ('.show-mini-shop-cart').length > 0 || $this.closest ('.show-mini-tah-cart').length)
				var t = setTimeout (function () { $this.siblings('div').find ('input[type="text"], a').filter (':visible:first').focus (); }, 2000);
			else
				$this.siblings('ul').find ('input[type="text"], a').filter (':visible:first').focus ();

			if($this.attr('id') == 'Header_SignIn_Link'){
				$this.closest('ul').find('a.close-drop').css('display','block');
				$this.closest('ul').find('a.open-reset-password').attr('tabIndex',4);
				$this.closest('ul').find('a.live-chat-button').attr('tabIndex',6);
				$this.closest('ul').find('a.close-drop').attr('tabIndex',7);
			}

			return false;
		}
	});

	function __prjid5_closeFloatingMenu(){
		$('.nav li > a').removeClass ('hovered');
		$('.nav li').removeClass ('li-hovered');
		$('.'+settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex',-1);
		__prjid5_manageInsuranceTable();
	}

	function __prjid5_manageInsuranceTable(){
		if($(".nav li.insurance-header #__prjid5_toBeCopied_insurance").length>0){
			__prjid5_canSendForInsuranceOpening();
			$("#__prjid5_toBeCopied_insurance").appendTo("#register_success");
		}
	}

	// Bind arrow keys for navigation
	$(top_level_links).keydown(function(e){
		if(e.keyCode == 37)
		{
			e.preventDefault();

			// This is the first item
			if($(this).parent('li').prev('li').length == 0)
				$(this).parents('ul').find('> li').last().find('a').first().focus();
			else
				$(this).parent('li').prev('li').find('a').first().focus();

		}
		else if(e.keyCode == 38)
		{
			e.preventDefault();

			if($(this).parent('li').find('ul').length > 0)
			{
				$(this).parent('li').find('ul')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex', 0)
					.last().focus();
			}
		}
		else if(e.keyCode == 39)
		{
			e.preventDefault();

			// This is the last item
			if($(this).parent('li').next('li').length == 0)
				$(this).parents('ul').find('> li').first().find('a').first().focus();
			else
				$(this).parent('li').next('li').find('a').first().focus();

		}
		else if(e.keyCode == 40)
		{
			e.preventDefault();

			if($(this).parent('li').find('ul').length > 0) {
				$(this).parent('li').find('ul')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex',0)
						.first().focus();
			}
		}
		else if(e.keyCode == 13 || e.keyCode == 32)
		{
			// If submenu is hidden, open it
			e.preventDefault();

			$(this).parent('li').find('ul[aria-hidden=true]')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex', 0)
					.first().focus();

		}
		else if(e.keyCode == 27)
		{
			e.preventDefault();

			$('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
				.attr('tabIndex', -1);
		}
		else
		{
			$(this).parent('li').find('ul[aria-hidden=false] a').each(function()
			{
				if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode])
				{
					$(this).focus();
					return false;
				}
			});
		}
	});


	var links = $(top_level_links).parent('li').find('ul').find('a');

	$(links).keydown(function (e)
	{
		if(e.keyCode == 38)
		{
			e.preventDefault();

			// This is the first item
			if($(this).parent('li').prev('li').length == 0)
				$(this).parents('ul').parents('li').find('a').first().focus();
			else
				$(this).parent('li').prev('li').find('a').first().focus();

		}
		else if(e.keyCode == 40)
		{
			e.preventDefault();

			if($(this).parent('li').next('li').length == 0)
				$(this).parents('ul').parents('li').find('a').first().focus();
			else
				$(this).parent('li').next('li').find('a').first().focus();

		}
		else if(e.keyCode == 27 || e.keyCode == 37)
		{
			e.preventDefault();

			$(this)
				.parents('ul').first()
				.prev('a').focus()
				.parents('ul').first().find('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
				.attr('tabIndex', -1);
		}
		else if(e.keyCode == 32)
		{
			e.preventDefault();
			window.location = $(this).attr('href');
		}
		else
		{
			var found = false;

			$(this).parent('li').nextAll('li').find('a').each(function(){
				if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode])
				{
					$(this).focus();
					found = true;
					return false;
				}
			});

			if(!found)
			{
				$(this).parent('li').prevAll('li').find('a').each(function ()
				{
					if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode])
					{
						$(this).focus();
						return false;
					}
				});
			}
		}
	});


	// Hide menu if click or focus occurs outside of navigation
	$(this).find('a').last().keydown(function(e)
	{
		if(e.keyCode == 9)
		{
			// If the user tabs out of the navigation hide all menus
			$('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
				.attr('tabIndex',-1);
		}
	});

	$(document).click(function ()
	{
		closeFavs();
		$('.nav li > a').removeClass ('hovered');
		$('.nav li').removeClass ('li-hovered');
		$('.'+settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex',-1);
	}); 

	$(".re-order-order-history").click(function() {
		var _dl = getBasicDLObject();
		_dl.page_name = ["account","order-history"];

		var orders = [];
		var order = {};
		var orderId = $(this).attr("data-order-id");
		order.order_id = orderId;
		order.order_value = $('#'+orderId+'_Order_Total').val();
    	order.order_status = $('#'+orderId+'_Order_Status').val();
    	if(order.order_value === undefined){
    		order.order_value = $(".total_figures.total")[0].innerText;
    	}
		_dl.site_events = { "reorder_product": true };
        orders.push(order);
        _dl.orders = orders;
    	callTrackAnalytics(_dl);

		var url = $(this).attr("data-url");
		document.location = url;
	});
}

function closeFavs(){
	var top_level_links = $('#favorites-tray-button');
	$('body').addClass ('hide').removeClass ('hide');
	$(top_level_links).removeClass('clicked hovered').next ('.menu').hide ();
	$('.show-menu').attr('aria-hidden', 'true').removeClass('show-menu').find('a').attr('tabIndex',-1);
	repaint ();

	return false;
}
/* End Accessible Drop Down Menus */

function selectChosenBrand(){
	if($(".facet-subnav.brands li").toArray().length==1){
	    $(".facet-subnav.brands li a").addClass("selected");
	}
}

//CALLBACKS:
$(document).ready(function() {
	
	$('.UpdatePasswordUpdateSubmitForm').validate({
		onkeyup: false,
		onclick: false,
		errorClass: 'required',
		errorElement: 'span',
		rules: {
			logonId: {
				required: true,
				email: true,
			},
			logonPasswordOld: {
				required: true,
				minlength: 2,
			},
			logonPassword: {
				required: true,
				minlength: 8,
				atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: true,
			},
			logonPasswordVerify: {
				required: true,
				equalTo: '.logonPassword_updateModel',
			}
		},
		messages: {
			logonId: {
				required: MessageHelper.messages["ERROR_Logon_model_EmailInvalid"],
				email: MessageHelper.messages["ERROR_Logon_model_EmailInvalid"],
			},
			logonPasswordOld: {
				required: MessageHelper.messages["OLD_PASSWORD_EMPTY_ERROR"],
				minlength: MessageHelper.messages["OLD_PASSWORD_EMPTY_ERROR"],
			},
			logonPassword: {
				required: MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
				minlength: MessageHelper.messages["ERROR_PASSWORD_UPDATE_VALID"],
				atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: MessageHelper.messages["ERROR_PASSWORD_UPDATE_VALID"],
			},
			logonPasswordVerify: {
				required: MessageHelper.messages["PASSWORD_UPDATE_CONFIRM_ERROR"],
				equalTo: MessageHelper.messages["ERROR_PASSWORD_MISMATCH"],
			}
		},
		showErrors: function(errorMap, errorList){
			console.log(errorMap, errorList);
			this.defaultShowErrors();
	    }
	});


	$('.UpdatePasswordUpdateSubmitForm').on('submit', function ()  {
		updateFormSubmit($(this));
		return false;
	});

	function updateFormSubmit(form){
		var f = $(form);
		var currentTime = new Date().valueOf();
		startTime = new Date().valueOf();
		var timeDiff = currentTime - startTime;
		var sessiontimeOut = $('.sessionDuration').val() || '';
		if(timeDiff >= sessiontimeOut && sessiontimeOut != ''){
			
			window.location.reload();
		}else{
			if(f.valid()){
			$('#successPassword').hide();
			
			var logonId = $("#passwordUpdateEmailInput").val();
			var logonPassword = $('.WC_PasswordUpdateForm_FormInput_logonPasswordOld_In_Logon_1').val();
			var errorViewName = 'LogonAjaxView';
			var reLogonURL = 'LogonAjaxView';
			var rememberMe = 'true';
			var url = 'LogonAjaxView';
			var temp_signinPassword = '';
			var autoPopulatedEmail = $('.autoPopulatedEmailHiddenDesktop').val();
			
			var logonAjaxData = {
				'storeId': constants.ajaxParams['storeId'],
				'catalogId': constants.ajaxParams['catalogId'],
				'langId': constants.ajaxParams['langId'],
				'logonId': logonId,
				'logonPassword': logonPassword,
				'errorViewName': errorViewName,
				'reLogonURL': reLogonURL,
				'rememberMe': rememberMe,
				'URL': url,
				'temp_signinPassword': temp_signinPassword
			};
			var url = 'LogonAjax';
			$.ajax({
				url: getAbsoluteURL(true) +  url,
				data: logonAjaxData,
				type: 'POST',
				dataType: 'json',
				success: function(response) {
				/*
				 * if(response.passwordExpired && response.passwordExpired ==
				 * '1') { $('.header-sign-in-modal').css('display',
				 * 'none').attr('aria-hidden', 'true');
				 * $('.header-set-a-new-password-modal').attr('aria-hidden',
				 * 'true').css("display", "block"); } else
				 * if(fromSubmitReview){ window.location = ReviewSuccessURL; }
				 * else
				 */
				if(response.success) {
					var data = $('.UpdatePasswordUpdateSubmitForm').serializeArray(),
					newData = [],
					originalURL = null;
					myperksURL = null;
					// since this is a jsonp request, we always set the
					// destination URL to a jsonp-compatible page
					for (var i = 0; i < data.length; i++){
						var d = data[i];
						if (d['name'] == 'URL'){
							originalURL = d['value'];
							
							newData.push({
								name: 'URL',
								value: 'ResetPasswordAjaxView'
							});
						}else if (d['name'] == 'logonId') {
							newData.push({
								name: 'logonId',
								value: logonId
							});
						} else{
							newData.push(d);
						}
					}
					
					
					$.ajax({
						url: getAbsoluteURL(true) + 'ResetPassword',
						data: newData,
						type: 'POST',
						dataType: 'json',
						success: function(data) {
							
							if(data.success) {
								
								if ($('#guestShopperContinue')[0]) {
									var userType = document.getElementById("userType").value;
						            var nextStepURL = document.getElementById("nextStepURL").value;
						            var PhysicalStoreSelectionURL = document.getElementById("PhysicalStoreSelectionURL").value;
						            setTimeout(function() {
						                if (CheckoutHelperJS.canCheckoutContinue(userType) && CheckoutHelperJS.updateShoppingCart(document.ShopCartForm, true)) {
						                    ShipmodeSelectionExtJS.guestShopperContinue(nextStepURL, PhysicalStoreSelectionURL);
						                }
						            }, 500);
								}
								
								if ($('.schedule-exam-reset')[0]) {
									$('.header-update-reset-password-modal').css('display', 'none');
									sessionStorage.setItem('psw_reset', $('#new-password-update').val());
									$('.schedule-exam-reset')[0].click();
								} else {
									var nextUrl = '/to-us/my-account';
									window.location = nextUrl;
								}
							}
							else {
								$('.PasswordUpdateFailureResponseMessageDiv').html(data.errorMessage);
							}
						},
						error: function(jqXHR, textStatus, errorThrown) { // unexpected
																			// error
																			// case
																			// -
																			// system
																			// error
							$('.PasswordUpdateFailureResponseMessageDiv').html('Reset password update failed - please try again later.');
						}
					});			
				}
				else {
					if(response.errorCode == '20101'){
						$('.WC_PasswordUpdateForm_FormInput_EmailAddress').addClass('required').removeClass('valid resetHighlight');
					}else if(response.errorCode == '20301'){
						$('.WC_PasswordUpdateForm_FormInput_logonPasswordOld_In_Logon_1').addClass('required').removeClass('valid resetHighlight');
					}
					$('.PasswordUpdateFailureResponseMessageDiv').html(response.errorMessage).show();
					tealium_data2track.push({
					  'id' : 'Error',
					  'Error_Source': 'User',
					  'Error_Code': 'Form Filling Error',
					  'Error_Message': response.errorMessage,
					  'Error_Details': response.errorMessage
					});
				}
				},
				error: function(jqXHR, textStatus, errorThrown) { // unexpected
																	// error
																	// case
																	// -
																	// system
																	// error
					$('.PasswordUpdateFailureResponseMessageDiv').html('Reset password update failed - please try again later.').show();
				}
			});
			}
		}
	}

	$('.facet-link').not('.eye, .sun').each(function(i, el){
		$(this).addClass('eye');
	});

	$('.nav').setup_navigation();

	if (!constants.ajaxParams.loggedIn)
		setupTimeout ();

	$(document).on ('click', '.ui-widget-overlay', function ()
	{
		$('.ui-dialog-content').dialog ('close');
	});

	$('.live-chat-button').click(function(){
		$(document).trigger('utag', ['specialistChat']);

		hideLogonModal();
		$('#Header_SignIn_Link').removeClass('hovered')
								.removeClass('has_drop')
								.removeClass('no-show')
								.removeClass('clicked');

		/*var top_level_links = $(this).find('> li > a').not('.expand');
		$('body').addClass ('hide').removeClass ('hide');
		$(top_level_links).removeClass('clicked hovered').next ('.menu').hide ();
		//$('.'+settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex',-1);
		repaint ();*/

	});


	setupTooltips ();
	hideAllDialogs();

	var pathname = window.location.pathname;
	if (pathname.indexOf("LogonForm") != -1) {
        showLogonModal();
    }

	// Handle form submitting when hitting the enter key
	// Applies to all forms
	$('form input').on ('keypress', function (e) {
		if (e.keyCode ==  13) {
			e.preventDefault();
			$(this).closest ('form').submit ();
	    }
	});


	// click functions for sign in, register, forgot password custom modals
	/*$('.sign-in-link, .sign-in-link2').click(function() {
		openSignin();

		return false;
	});*/


	$('.account-link').click(function(e) {
		openRegister();

		return false;
	});

	/*$('.close-register').bind ('click', function ()
	{
		$('#header-register-modal').ariaHide().hide ();
		$('#register').removeClass ('hovered clicked');
		repaint ();
		return false;
	});*/

	$('.close-sign-in').bind ('click', function ()
	{
		$('.sign-in-link').removeClass ('hovered clicked');
		$('#header-sign-in-modal').ariaHide();
		repaint ();
		return false;
	});

	$('#userRegModalForm').submit(function() {
		if ($('#logonPassword_regModal').val () == '')
		{
			$('#logonPassword_regModal').attr("placeholder", "Enter password*");
		}

		if ($('#logonPasswordVerify_regModal').val () == '')
		{
			$('#logonPassword_regModal').attr("placeholder", "Re-enter password*");
		}

		registerFormSubmit(this);
		return false;
	});

	$('#LogonForm, #ContactLensesLogonForm').submit(function() {
		logonFormSubmit(this);
		return false;
	});

	$('.LogonDialogModalForm, #LogonFormLanding').submit(function() {
		removeExamCookies();

		if ($('#header-logonPassword').val () == '')
		{
			$('#header-logonPassword').show ();
			$('#header-logonPassword_temp').hide ();
		}

		if ($('#logonPassword3').val () == '')
		{
			$('#logonPassword3').show ();
		}

		if ($('#EyeExam_logonPassword3').val () == '')
		{
			$('#EyeExam_logonPassword3').show ();
			$('#EyeExam_temp_logonPassword3').hide ();
		}

		if($('#isEyeExamLandingPage').length > 0 && $(this).find('.LogOnModalSubmitButtonEyeExam').length > 0){
			logonFormSubmitEyeExamLanding(this);
		}
		else{
			logonFormSubmit(this);
		}
		return false;
	});

	$('.LogOnModalSubmitButton, #regSubmit').click(function() {
		$(this).closest('form').submit();
		return false;
	})

	$('.open-reset-password').click(function() {
		$('#header-sign-in-modal').ariaHide();
		$('#header-reset-password-modal').ariaShow();
		$('.sign-in-link').addClass("open clicked no-show");
		$('#WC_PasswordResetForm_FormInput_logonId_In_ResetPasswordForm_1').focus();
		return false;
	});

	$('.open-reset-password').on ('keydown', function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13)
			$('.open-reset-password').click ();
	});

	$('.close-reset-password').click(function(){
		$('.sign-in-link').removeClass("open no-show");
		$('#header-reset-password-modal').ariaHide();
		showLogonModal();
		return false;
	});

	$('.close-reset-password').on('keydown', function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		 if(code == 13)
			 $('.close-reset-password').click ();
	});

	$('.close-reset-password-done').click(function(){
		$('#header-reset-password-done-modal').ariaHide();
		$('.sign-in-link').removeClass("open no-show");
		return false;
	});

	$('.set-new-password').click(function(){
		$('#header-reset-password-modal').ariaHide();
		$('#header-set-a-new-password-modal').ariaShow();
		$('.sign-in-link').addClass("open clicked no-show");
		return false;
	});

	$('.close-set-new-password').click(function(){
		$('#header-set-a-new-password-modal').ariaHide();
		$('.sign-in-link').removeClass("open");
		return false;
	});

	$('#ResetPasswordForm').keypress(function(e) {
		if(e.keyCode == 13) {
			if($('#ResetPasswordForm').valid()){
				resetPassword();
			}
			return false;
		}
		return true;
	});

	$('#passwordResetSubmitButton').click(function() {
		if($('#ResetPasswordForm').valid()){
			resetPassword();
		}
		return false;
	});

	function resetPassword(){
		var resetForm= document.ResetPasswordForm;
		var params = {};
		params.challengeAnswer = resetForm.challengeAnswer.value;
		params.state = resetForm.state.value;
		params.URL = resetForm.URL.value;
		params.errorViewName = resetForm.errorViewName.value;
		params.logonId =resetForm.logonId.value;
		params.email1 = resetForm.logonId.value;
		params.emailType = "forgotpassword";
		params.senderEmail = resetForm.logonId.value;
		params.senderName = resetForm.logonId.value;
		params.email1 = resetForm.logonId.value
		params.recipientEmail = resetForm.logonId.value;
		params.receiveEmail = "true";
		params.fromName = resetForm.logonId.value;
		params.pdp_18yrs = "true";
		params.storeId = resetForm.storeId.value;
		invokeResetPasswordService(params);
		if($("#forgot_pswd-done-blk").length>0){
			$("#forgot_pswd-done-blk").removeClass("hide");
			$("#forgot_pswd_block").addClass("hide");
			$(".open-reset-password-block").addClass("hide");
		}
		return false;
	}

	$('#ResetPasswordForm').validate({
		onfocusout: false,
		onkeyup: false,
		onclick: false,
		errorClass: 'required',
		errorElement: 'span',

		rules: {
			logonId: {required:true, email:true}
		},
		messages: {
			logonId:{
				required: MessageHelper.messages["ERROR_Logon_modal_EmailInvalid"],
				email:MessageHelper.messages["ERROR_Logon_modal_EmailInvalid"]
			}
		}
	});


	var logonParameters = {
		onfocusout: false,
		onkeyup: false,
		onclick: false,
		errorClass: 'required',
		errorElement: 'span',
		ignore: 'input[type="hidden"]',

		rules: {
			logonId: {
				required: true,
				email: true
			},
			logonPassword :{required:true}
		},
		messages: {
			logonId:{
				required: MessageHelper.messages["ERROR_Logon_model_EmailEmpty"],
				email:MessageHelper.messages["ERROR_Logon_model_EmailInvalid"]
			},
			logonPassword:{required: MessageHelper.messages["ERROR_PASSWORD_VALID"]}
		},
		errorPlacement:function (error, element) {
			var afterElement = element;
			if(element.is(':password') && element.next().is(':text')) { //if we're swapping out password fields, place error message after both
				afterElement = element.next();
			}
			$(error).attr ('aria-live', 'rude').insertAfter (afterElement);
		}
	};

	$('#LogonDialogModalForm').validate(logonParameters);

	$('#EyeExamLogonDialogModalForm').validate(logonParameters);

	$('#ContactLensesLogonForm').validate(logonParameters);

	$('#LogonFormLanding').validate(logonParameters);

	window.registerParameters = {
		onfocusout: false,
		onclick: false,
		errorClass: 'required',
		errorElement: 'span',
		ignore: 'input[type="hidden"]',

		rules: {
			logonId: {
				required:true,
				email:true
			},
			logonIdVerify : {
				required:true,
				email:true,
				equalTo: '#logonId_regModal'
			},
			logonPassword :{
				required:true,
				minlength:6
			},
			logonPasswordVerify :{
				required:true,
				equalTo :'#logonPassword_regModal'
			},
			optin_18yrs : {required:true}
		},
		messages: {
			logonId:{
				required: MessageHelper.messages["ERROR_Logon_modal_EmailInvalid"],
				email:MessageHelper.messages["ERROR_Logon_modal_EmailInvalid"]
			},
			logonIdVerify:{
				required: MessageHelper.messages["ERROR_LOGON_MODEL_EMAIL_CONFIRM"],
				logonIdVerifyRequired: MessageHelper.messages["ERROR_LOGON_MODAL_EMAIL_CONFIRM"],
				email:MessageHelper.messages["ERROR_Logon_modal_EmailInvalid"],
				equalTo :MessageHelper.messages["ERROR_EMAIL_MISMATCH"]
			},
			logonPassword:{required: MessageHelper.messages["ERROR_PASSWORD_VALID"],
							minlength:MessageHelper.messages["ERROR_PASSWORD_VALID"]},
			logonPasswordVerify:{
				required: MessageHelper.messages["ERROR_PASSWORD_VALID"],
				equalTo : MessageHelper.messages["ERROR_PASSWORD_MISMATCH"]
			},
			optin_18yrs : {required:MessageHelper.messages["EYE_EXAM_ERROR_NOT_18_YEARS_OLD"]}
		},
		errorPlacement:function (error, element) {
			if ($(element).attr('name') == 'optin_18yrs' || $(element).is(':hidden')) {
				$(error).insertAfter ($(element).next());
			}
			else {
				$(error).insertAfter (element);
			}

			$(error).attr ('aria-live', 'rude');
		}
	};

	$('#userRegModalForm').validate(registerParameters);
	
	$.validator.addMethod("atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial", function(value, element){
		var regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])(.*)$/;
		return regex.test(value);
	});
	
	$('#userRegFormLanding').validate({
		onfocusout: false,
		onclick: false,
		errorClass: 'required',
		errorElement: 'span',
		ignore: 'input[type="hidden"]',

		rules: {
			logonId: {
				required:true,
				email:true
			},
			logonIdVerify : {
				required:true,
				email:true,
				equalTo: '#logonId_landing'
			},
			logonPassword :{
				required:true,
				minlength: 8,
				atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: true
			},
			logonPasswordVerify :{
				required:true,
				equalTo :'#logonPassword_landing'
			},
			optin_18yrs : {required:true}
		},
		messages: {
			logonId:{
				required: MessageHelper.messages["ERROR_Logon_modal_EmailInvalid"],
				email:MessageHelper.messages["ERROR_Logon_modal_EmailInvalid"]
			},
			logonIdVerify:{
				required: MessageHelper.messages["ERROR_LOGON_MODEL_EMAIL_CONFIRM"],
				logonIdVerifyRequired: MessageHelper.messages["ERROR_LOGON_MODAL_EMAIL_CONFIRM"],
				email:MessageHelper.messages["ERROR_Logon_modal_EmailInvalid"],
				equalTo :MessageHelper.messages["ERROR_EMAIL_MISMATCH"]
			},
			logonPassword:{
				required: MessageHelper.messages["ERROR_PASSWORD_VALID"],
				minlength: MessageHelper.messages["ERROR_Password_checks"],
				atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial:MessageHelper.messages["ERROR_PASSWORD_UPDATE_VALID"]
			},
			logonPasswordVerify:{
				required: MessageHelper.messages["ERROR_PASSWORD_VALID"],
				equalTo : MessageHelper.messages["ERROR_PASSWORD_MISMATCH"]
			},
			optin_18yrs : {required:MessageHelper.messages["EYE_EXAM_ERROR_NOT_18_YEARS_OLD"]}
		},
		invalidHandler: function (form, validator) {
			tealium_data2track.push({
				id : 'Error',
				Error_Source: 'User',
				Error_Code: 'Form Filling Error',
				Error_Message: validator.errorList[0].message,
				Error_Details: validator.errorList[0].message
			})
		},
		errorPlacement:function (error, element) {
			if ($(element).attr('name') == 'optin_18yrs' || $(element).is(':hidden')) {
				$(error).insertAfter ($(element).next());
			} else if ($(element).attr('name') == 'logonPassword') {
				$(error).insertAfter ($(element).closest("form").find(".check-psw .passwordRequirements"));
			}
			else {
				$(error).insertAfter(element);
			}

			$(error).attr ('aria-live', 'rude');
		},
		submitHandler: function(form) {
			if ($('#logonPassword_landing').val () == '')
			{
				$('#logonPassword_landing').show ();
				$('#logonPassword_landing_temp').hide ();
			}
	
			if ($('#logonPasswordVerify_landing').val () == '')
			{
				$('#logonPasswordVerify_landing').show ();
				$('#logonPasswordVerify_landing_temp').hide ();
			}
	
			registerFormSubmit(form);
			return false;
		}
	});
	
	$.validator.addMethod("notEqualTo", function(value, element, param){
		return value != $(param).val();
	}, 'Please enter a different value');

	$('#PasswordUpdateSubmitForm').validate({

		onkeyup: false,
		onclick: false,
		errorClass: 'required',
		errorElement: 'span',
		rules: {
			logonPasswordOld : {
				required:true
			},
			logonPassword :{
				required:true,
				minlength: 8,
				atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: true,
				notEqualTo:'input[name=logonPasswordOld]'
			},
			logonPasswordVerify : {
				required:true,
				equalTo:'#logonPassword_updateModal'
			}
		},
		messages: {
			logonPasswordOld :{ required:MessageHelper.messages["OLD_PASSWORD_EMPTY_ERROR"] },
			logonPassword :{
				required:MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
				minlength: MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
				notEqualTo:MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
				atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial:MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
			},
			logonPasswordVerify :{
				required:MessageHelper.messages["PASSWORD_UPDATE_CONFIRM_ERROR"],
				equalTo:MessageHelper.messages["PASSWORD_UPDATE_MISMATCH"]
			}
		},
		submitHandler: function(form) {
			$('.success').addClass("hide");
			$('#PasswordUpdateFailureResponseMessageDiv').html('');

			$.ajax({
				url: getAbsoluteURL(true) + 'AjaxResetPassword',
				data: $(form).serializeArray(),
				dataType: 'jsonp',
				crossDomain: true,
				success: function(data) {
					if(data.success) {
						if($('#PasswordUpdateSubmitForm').parents('#header-set-a-new-password-modal').length){//Password reset modal, redirect to my account
							window.location = $('#WC_PasswordResetForm_FormInput_Forward_In_ResetPasswordForm_1').val();
						}else{//My account page, display success message
							$("#change-pswd-block").addClass("hide");
							$("#change_pswd-done-blk").removeClass("hide");
							$("#change_pswd-done-blk .success").removeClass("hide");
							$('#PasswordUpdateSubmitForm .fe.buttons').before('<div class="success">Your changes have been updated successfully.</div>')
						}
					}else{
						$('#PasswordUpdateFailureResponseMessageDiv').html(data.errorMessage);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) { //unexpected error case - system error
					$('#PasswordUpdateFailureResponseMessageDiv').html('Reset password update failed - please try again later.');
				}
			});
		}
	});

	//Eye Exams Modal setup

	function getStoreDataExamModal(index){
		var store = {};
		var HTMLStore = $(".store-info").toArray()[index];
		store.store_id = HTMLStore.id.split("_").pop();
		store.online_scheduling = true;
		store.avail_exam = true;
		store.address = $(HTMLStore).find(".address")[0].innerText.trim();
		store.city = $(HTMLStore).find(".city")[0].innerText.trim();
		store.state = $(HTMLStore).find(".state")[0].innerText.trim();
		store.zip = $(HTMLStore).find(".postalCode")[0].innerText.trim();
		store.miles_from_customer = undefined;
		store.result_position = 0;
		return store;
	}

	/*** equivalent of mobile function sendDLForExamDataModal() ***/
	$('.openEyeExamsModal').click(function() {
		$('#EyeExamsModalDiv').dialog('open');
		var _dl = getBasicDLObject();
		_dl.page_name = ["account page", "exam modal"];
		_dl.site_events = {"eye_exam_info": true};
		_dl.exams = [];
		var index = 0;
		$(".exam-with").each(function(){
			var exam = {};
			exam.exam_id = $(this)[0].id.split("_").pop();
			exam.exam_date = $(this).find(".date_time")[0].innerText.trim();
			var dateToFormat = new Date($(this).find(".date_time")[0].innerText.trim());
			var formattedDate = ('0' + dateToFormat.getDate()).slice(-2);
		    var formattedMonth = ('0' + (dateToFormat.getMonth() + 1)).slice(-2);
		    var formattedYear = dateToFormat.getFullYear().toString().substr(2,2);
			exam.exam_date = formattedMonth + "" + formattedDate + "" + formattedYear;
			exam.exam_date
			var timeArray = $(this).find(".time")[0].innerText.trim().split(" ");
	        if(timeArray[1]==="PM"){
	            var hours = parseInt(timeArray[0].split(":")[0]) + 12;
	            exam.exam_time = hours + ":" + timeArray[0].split(":")[1];
	        }else{
	            exam.exam_time = timeArray[0];
	        }
			exam.store = [getStoreDataExamModal(index)];
			_dl.exams.push(exam);
			index++;
		});
		callTrackAnalytics(_dl);
		return false;
	});

	$('.return-to-your-account').click(function() {
		$('#EyeExamsModalDiv').dialog('close');
		return false;
	});

	$('#EyeExamsModalDiv').dialog({
		autoOpen: false,
		draggable: false,
		resizable: false,
		modal: true,
		zIndex: 9999,
		width:640,
		appendTo: "#modalList"
	});

	$('#AddToCartModal').dialog({
		autoOpen: false,
		draggable: false,
		resizable: false,
		modal: true,
		zIndex: 9999,
		width:700,
		position:['center', '100'],
		appendTo: "#modalList"
	});

	$('#AddToTryAtHomeModal').dialog({
		autoOpen: false,
		draggable: false,
		resizable: false,
		modal: true,
		zIndex: 9999,
		width:700,
		position:['center', '100'],
		appendTo: "#modalList"
	});


	$('#face-shape-modal').dialog({
		draggable: false,
		autoOpen: false,
		resizable: false,
		modal: true,
		zIndex: 9999,
		width:500,
		position:['center', '100'],
		appendTo: "#modalList"
	});

	$(".what-frames").click(function(){
		$('#face-shape-modal').dialog('open');
		return false;

	});

	var cancelAppointmentModal = $('#CancelAppointmentModalDiv').dialog({
		autoOpen: false,
		draggable: false,
		resizable: false,
		modal: true,
		zIndex: 9999,
		width:382,
		appendTo: "#modalList",
		open: function () {
			$(this).removeClass('hide');
			$(this).find('.no-cancel').bind('click', function () {
				cancelAppointmentModal.dialog('close');
			});
		},
		close: function () {
			$(this).find('.no-cancel').unbind('click');
		}
	});

	$('.exam-container').on('click', 'a.cancel-eye-exam-button[data-appointment-id]', function(){
		$('#cancelAppointmentId').val($(this).attr('data-appointment-id'));
		cancelAppointmentModal.dialog('open');
		return false;
	});

	$('#cancelAppointmentForm').on('submit', function(){
		$(document).trigger('utag', ['examDelete']);
	});

	// eye exam show details links
	$('#EyeExamsModalDiv .show-past-exam').on('click', function(){
		var index = $(this).index('#EyeExamsModalDiv .show-past-exam');
		$('#EyeExamsModalDiv .show-past-exam').eq(index).toggle();
		$('#EyeExamsModalDiv .hide-past-exam').eq(index).toggle();
		$('#EyeExamsModalDiv .past .each-exam').eq(index).toggle();
	});
	$('#EyeExamsModalDiv .hide-past-exam').on('click', function(){
		var index = $(this).index('#EyeExamsModalDiv .hide-past-exam');
		$('#EyeExamsModalDiv .show-past-exam').eq(index).toggle();
		$('#EyeExamsModalDiv .hide-past-exam').eq(index).toggle();
		$('#EyeExamsModalDiv .past .each-exam').eq(index).toggle();
	});

	$('.submit-on-change').change(function() {
		if($(this).val() != '' && submitRequest()) {
			$("input[id=newQuantity]").val($(this).val());
			$(this).parents('form').submit();
		}
	});

	$('a.submit-form').click(function() {
		if ($('#getDirectionsForm').is (':visible'))
			$('#getDirectionsForm').validate();

		$(this).parents('form').submit();
		return false;
	});

	// remove exam cookies when signing out
	$('#headerLogout').on('click', function(){
		removeExamCookies();
		sessionStorage.removeItem("trackShoppingCart"); 
	});

	$('.show-mini-shop-cart a').on ('mouseenter focus', function() {

	});

//	$('#Header_Try_Link, .js-cart-icon').on ('mouseenter focus', function() {
//		reloadMiniCart(false);
//	});

	$('#mini-tah-cart').on('click', '.interestItemDelete', function() {
		if(!processingMiniTAHCart) {
			var params = {};
			params.storeId = constants.ajaxParams['storeId'];
			params.catalogId = constants.ajaxParams['catalogId'];
			params.langId = constants.ajaxParams['langId'];
			params.catEntryId = $(this).data('catentryid');
			params.URL = 'MiniTryAtHomeDisplay';
			$.post(getAbsoluteURL() + 'GuestInterestItemDelete', params, function(data) {
				processTAHMiniCartResults(data);
			}, 'html');
		}

		return false;
	});

	var geoCity = $.cookie('to_city');
	var geoState = $.cookie('to_state');
	var lastValidSearch = localStorage.getItem("zipStoreSearch");
	if(lastValidSearch){
		$('#storeSearchForm [name="locationEntry"]').val(lastValidSearch);
		$('body').data('auto-search', true);
	}
	else {
		var locationDisplay = geoCity + ', ' + geoState;
		if(geoCity && geoState && geoCity != 'null' && geoState != 'null' && /\w/.test(locationDisplay)) {
			$('#storeSearchForm [name="locationEntry"]').val(locationDisplay);
			$('body').data('auto-search', true);
		}
	} 

	$(".email-friend").click(function(){
		//  console.debug($(this).data('generic_email_view_url','abc'));
		   var url = $(this).attr('generic_email_view_url');
		   $.ajax({
				url: getAbsoluteURL() + url,
				success: function(data) {
			   		$('#EmailFriendFormDiv').html(data);
			   		$('#EmailFriendFormDiv').dialog({
			   			modal: true,
			   			width:520,
			   			appendTo: "#modalList",
			   			open:function ()
			   			{

			   				$('#EmailFriendFormDiv .cancel, .ui-dialog-titlebar-close:visible').bind ('click', function (e)
			   				{
			   					e.preventDefault ();
			   					$('#EmailFriendFormDiv').dialog ('close');
			   				});
			   			},
			   			close:function ()
			   			{
			   				$('#EmailFriendFormDiv .cancel, .ui-dialog-titlebar-close:visible').unbind ('click');
			   				$('#EmailFriendFormDiv').prev ().find ('.ui-dialog-titlebar-close span').html ('Close');
			   				$('#EmailFriendFormDiv').html('');
			   			}
			   		});
				}
			});
		  return false;
	  });

	// Fixes an issue with this modal
	$.curCSS = function (element, attrib, val) {
	    $(element).css(attrib, val);
	};

	$('#temp_logonPasswordVerify2, #temp_logonPassword2, #EyeExam_temp_logonPassword3, #logonPassword_regModal_temp, #logonPasswordVerify_regModal_temp, #header-logonPassword_temp, #logonPassword3_temp, #logonPassword2_temp, #logonPasswordVerify2_temp, #logonPassword_landing_temp, #logonPasswordVerify_landing_temp, #landing-logonPassword_temp').focus(function() {
		$(this).css('display','none');
		$(this).prev().css('display','inline');
		$(this).prev().focus();
	});

	$('#logonPasswordVerify2, #logonPassword2, #logonPassword3, #EyeExam_logonPassword3, #header-logonPassword, #logonPassword_landing, #logonPasswordVerify_landing, #landing-logonPassword').blur(function() {
		if($(this).val()==null || $(this).val()== "")
		{
			$(this).css('display','none');

			if($(this).next('.required').length > 0)
			{
				var errorSpan = $(this).next('.required');
				var inputField = errorSpan.next();
				$(this).next('.required').insertAfter(inputField);
			}

			$(this).next().css('display','inline');
		}
	});

	$('.removeFacetCookie').click(function(e){
		document.cookie = 'facets=; path=/';
	});

	$('.cookieFacet').click(function (e){
		if(!$(this).hasClass("disabled")) {  //Prevents adding unclickable things to the cookie.
			var expires = '';
			var data =  $(this).data("item");
			//Change spaces to pluses so the data can be removed from the cookie later.
			data = data.replace(/ /g, "+");
			var cookInfo = $.cookie('facets');
			if(cookInfo != null && cookInfo != 'null'){
				document.cookie = 'facets=' + cookInfo + '|' + data + expires + '; path=/';
			}else{
				document.cookie = 'facets=' + '|' + data + expires + '; path=/';
			}
		}
	});

	$('.phoneSegment').keyup(function() {
		if($(this).attr('maxlength') == 3 && $(this).val().length == 3) {
			$(this).nextAll('input:first').focus();
		}
	});

	$(".extend-session").click(function(){
		//location.reload();
		var info = {
				storeId: categoryDisplayJS.storeId,
				catalogId: categoryDisplayJS.catalogId,
				langId: categoryDisplayJS.langId
			};
		$.ajax({
			url: getAbsoluteURL(false) + 'SuccessView',
			type: "POST",
			data: info,
			dataType: 'json',
			success: function() {
				setupTimeout ();
				$('#timeoutModal').dialog ('close');
			}

		});
	});

	$('a.disabled').bind('click', function() {
		return false;
	})

	$('body').on('click', '.favorite-button-tray', function(e) {
		e.preventDefault();
		
		//$('.js-favorites-icon').popover('dispose');
		
		var button = $(this);
		ajaxRemoveFromFavorites(button.attr('id').replace('remove-', ''), function(data) {
			var params = {
				storeId:		constants.ajaxParams['storeId'],
				catalogId:		constants.ajaxParams['catalogId'],
				langId:			constants.ajaxParams['langId']
			};
			$.get(getAbsoluteURL() + 'AjaxMiniWishListDisplay', params, function(data) {
				
				
				$(".favorite-button").each(function(index, favButton){
					if($(favButton).data('catentryid') == button.data('catentryid')){
						$(favButton).removeClass('favorited');
					}
				});
				$('#favourite-counter-print').text($('#itemCount-favourite').text().trim());

				$('#favourite-counter-print').hide();
				
			}, 'html');
			//$("favorite-tray-section").replaceWith(x);
			//document.location = window.location.href;
			//location.reload();
		});
	});

	initInterrupter();

	// Sync up all TAH checkboxes
	$('.tah-checkbox').prop('checked', $('.tah-checkbox').prop('checked'));
	// and keep them synced on click
	$('.tah-checkbox').on('change', function(){
		$('.tah-checkbox').prop('checked', $(this).prop('checked'));
	});

	$('.tah-link').on('click', function(){
		showTAHModal();
		return false;
	});
	$('#mini-shop-cart').on('click', '.tah-link', function(){
		showTAHModal();
		return false;
	});

	$('.pd-link').on('click', function(){
		showPDModal();
		return false;
	});

	$('.multiple-pd-link').on('click', function(){
		showMultiplePDModal();
		return false;
	});

	$('.face-shape-link').on('click', function(){
		showFSModal();
		return false;
	});

	$('body').on('click', '#autoSuggestProductLink', function(e) {
		e.preventDefault();
		var _dl = getBasicDLObject();
		_dl.page_name= ["store front","product details"];
		_dl.site_events = { "successful_search": true, "suggested_search:": true };
        _dl.keyword = $('#SimpleSearchForm_SearchTerm').val();
    	callTrackAnalytics(_dl);
		var url = $(this).attr("data-url");
		document.location = url;
	});

	$( "#catalog .item.espot" ).each(function( index ) {
		if($(this).find('.ad').length <= 0){
			$(this).hide();
		};
	});
 
	selectChosenBrand();
	
});


//GLOBAL UTILITY FUNCTIONS

function initInterrupter() {
	if(constants.ajaxParams.loggedIn) {
		return false;
	}

	if($.cookie('interrupterCounter') < 1) {
		$.cookie('interrupterCounter', 1, { expires: 7 });

		savePlacement();

		showStandardModal('#InterrupterModal');

		$('#InterrupterModal').dialog('option', 'close', function(){
			$(window).scrollTop(getPlacement());
		});
	}

	return true;
}

function showStandardModal(modalSelector, modalClass) {
	var $modal = $(modalSelector);

	if($modal.length < 1) return false;
	
	$modal.removeClass('hide');

	$modal.dialog({
		modal:true,
		resizeable:false,
		width: '520px',
		appendTo: "#modalList",
		dialogClass: modalClass + ' standard-modal'
	});
}

function showTAHModal() {
	showStandardModal('#tah-modal', 'tah-modal');
}

function showPDModal() {
	showStandardModal('#PDModal', 'pd-modal');
}

function showMultiplePDModal() {
	showStandardModal('#MultiplePDModal', 'multiple-modal');
}

function showFSModal() {
	showStandardModal('#FSModal', 'fs-modal');
}

function showAffirmAfterpayModal() {
	showStandardModal('#AffirmAfterpayModal', 'affirm-afterpay-dialog');
	document.querySelector('[aria-describedby="AffirmAfterpayModal"]').nextElementSibling.classList.add('gray-overlay');
	//hide standart button in modal 
	document.querySelector('[aria-describedby="AffirmAfterpayModal"]').getElementsByTagName("button")[0].classList.add('changeStyleButton');

}

function showLogonModal() {
	$('#header-register-modal').ariaHide();
	$('#header-reset-password-modal').ariaHide();
	$('#header-reset-password-done-modal').ariaHide();
	$('#header-set-a-new-password-modal').ariaHide();
	$('#header-sign-in-modal').ariaShow();

	$('#register').removeClass ('hovered clicked');
	$('.sign-in-link').addClass ('hovered clicked').removeClass ('no-show');
	repaint ();

	window.scrollTo(0, 0); //take the user to the top of the page (where the modal is displayed)
	$('#headerEmailAddress').focus();
}
function hideLogonModal() {
	$('#header-register-modal').ariaHide();
	$('#header-reset-password-modal').ariaHide();
	$('#header-reset-password-done-modal').ariaHide();
	$('#header-set-a-new-password-modal').ariaHide();
	$('#header-sign-in-modal').ariaHide();

	$('#register').removeClass ('hovered clicked');
	$('.sign-in-link').removeClass ('hovered clicked');
	repaint ();

	//window.scrollTo(0, 0); //take the user to the top of the page (where the modal is displayed)
	//$('#headerEmailAddress').focus();
}

function showRegisterModal() {
	location.href = "/to-us/signup";
	// prjid5 $("#header-sign-in-modal").closest("li");
	
	/* Redesign 2019
	$('.nav li > a').removeClass ('hovered');
	$('.nav li').removeClass ('li-hovered');
	$(".show-menu").attr('aria-hidden', 'true').removeClass("show-menu");

	$('#header-sign-in-modal').ariaHide();
	$('#header-reset-password-modal').ariaHide();
	$('#header-reset-password-done-modal').ariaHide();
	$('#header-set-a-new-password-modal').ariaHide();
	$('#header-register-modal').ariaShow();
	$('#header-register-modal #logonId_regModal').focus();



	$("#registermodal").dialog({
       modal: true,
       width: 800,
	   appendTo: "#modalList",
       dialogClass: "to-dialog to-redesign0717"
    });*/
	/* Redesign prjid5
	$("#__prjid5_LoginOnLogonModal").hide();
	$("#__prjid5_regInfosOnLogonModal").hide();
	$("#userRegModalForm").clone().appendTo("#__prjid5_showRegModal");
	*/
	/* redesign 2019 $('.sign-in-link').removeClass ('hovered clicked no-show');
	$('.account-link').addClass ('hovered clicked')
	$('#register').addClass ('hovered clicked');
	repaint ();*/
}
function hideRegisterModal() {
	$('#header-register-modal').ariaHide();
	$('#header-reset-password-modal').ariaHide();
	$('#header-reset-password-done-modal').ariaHide();
	$('#header-set-a-new-password-modal').ariaHide();
	$('#header-register-modal').ariaHide();

	//$("#__prjid5_LoginOnLogonModal").show();
	//$("#__prjid5_regInfosOnLogonModal").show();
	//$("#userRegModalForm").empty();


	$('#register').removeClass ('hovered clicked');
	$('.sign-in-link').removeClass ('hovered clicked');
	repaint ();

	//window.scrollTo(0, 0); //take the user to the top of the page (where the modal is displayed)
	//$('#headerEmailAddress').focus();
}

/**
 * Scroll the browser to the given element on the page
 * @param el the element to scroll to
 */
function scrollToElement(el, scrollTime){

	if (el != null && $(el).offset() != null){
		var t = 2000;
		if (scrollTime != null){
			t = scrollTime;
		}

		var page = $('html, body').clearQueue();
		if (t == 0){
			page.scrollTop($(el).offset().top - 20);
		}else{
			page.animate(
		    {
		        scrollTop: $(el).offset().top - 20
		    }, t, 'easeOutQuint');
		}
	}
}

var isDirty = true;
function disableDirtyFlag() {
	isDirty = false;
}

function registerFormSubmit(form){
	if($(form).valid()){

		if (form.account){
			form.account.value = form.logonId.value;
		}

		if($(form).find('#receiveEmail_checkBox:checked').length > 0){
		    form.receiveEmail.value = 'true';
		    form.optinStatus.value = 1;
		}

		$.ajax({
			url: getAbsoluteURL(true) + 'UserRegistrationAddAjax',
			data: $(form).serializeArray(),
			type: 'post',
			dataType: 'json',
			crossDomain: true,
			success: function(data) {
				if(data.success) {
					disableDirtyFlag();
					if(form.redirectURL){
                        window.location.href= decodeURIComponent(form.redirectURL.value);
					}else{
						window.location = getRegisterDestination();
					}
				}
				else {
					$(form).find ('input[type="text"]:first').focus ();
					$('.RegFailureResponseMessageDiv').show();
					$('.RegFailureResponseMessageDiv, #RegFailureResponseMessageDiv, #ExamRegFailureResponseMessageDiv').attr ('aria-live', 'rude').html(data.errorMessage);
					utagFiller.setUserRegistrationError();
				}
			},
			error: function(jqXHR, textStatus, errorThrown) { //unexpected error case - system error
				$(form).find ('input[type="text"]:first').focus ();
				$('.RegFailureResponseMessageDiv').show();
				$('.RegFailureResponseMessageDiv, #RegFailureResponseMessageDiv, #ExamRegFailureResponseMessageDiv').attr ('aria-live', 'rude').html('Registration request failed - please try again later.');
				utagFiller.setUserRegistrationError();
			}
		});
	}

	return false;
}



function logonFormSubmit(form) {
	if($(form).valid()) {
		$(".LogOnFailureResponseMessageDiv").addClass("hide");
		var formData = $(form).serializeObject();
		registration.logonId = formData.logonId;
		$.ajax({
			url: getAbsoluteURL(true) + 'LogonAjax',
			type : 'post',
			dataType: 'json',
			data: $(form).serializeArray(),
			crossDomain: true,
			success: function(data) {
				if(data.passwordExpired && data.passwordExpired == '1') {
					/*$('#header-sign-in-modal').ariaHide();
					$('#header-set-a-new-password-modal').ariaShow();
					$('.sign-in-link').addClass("open clicked no-show");
					$('#PasswordUpdateSubmitForm').find('input[name=logonId]').val(formData['logonId']);*/ 
					$("#logonIdForReset").val(registration.logonId);
					$("#change-pswd-block").removeClass("hide");
					$("#forgot_pswd-done-blk").addClass("hide");
				}
				else if(data.passwordReset && data.passwordReset == 'true'){
					$(form).find('.LogOnFailureResponseMessageDiv').html(MessageHelper.messages["MIGRATED_USER_LOGON_ERROR"]).removeClass("hide");
				}
				else if(data.success) {
					var params = {
							storeId:		constants.ajaxParams['storeId'],
							catalogId:		constants.ajaxParams['catalogId'],
							langId:			constants.ajaxParams['langId'],
							cache:          false,
							errorViewName:	'LogonAjaxView'
					};

					$.get('AjaxGetShopCartInfo', params, function(data) {
						if(data){
					    	data = data.replace(/^\s*\/\*/, "").replace(/\*\/\s*$/, "");
					    	var serviceResponse = $.parseJSON(JSON.stringify(data));
					    	serviceResponse = $.parseJSON(serviceResponse);
					    	var shopping_cart = [];

					    	if(serviceResponse.success != 'false'){
					       		$.each(serviceResponse, function(key, val) {
					       			var product = {};
					       			product.product_id = val.product_id;
					       			product.reg_price = val.reg_price;
					       			product.category = val.category;
					       			product.orderitem_id = val.orderitem_id;
					       			if(typeof val.applied_lenses != 'undefined'){
					       				product.applied_lenses = val.applied_lenses;
					       			}
					       			shopping_cart.push(product);
					       		});
								sessionStorage.setItem("trackShoppingCart", JSON.stringify(shopping_cart));
					       	}

					    	var wishListParams = {
									storeId:		constants.ajaxParams['storeId'],
									catalogId:		constants.ajaxParams['catalogId'],
									langId:			constants.ajaxParams['langId'],
									cache:          false,
									errorViewName:	'LogonAjaxView'
							};

							$.get('AjaxGetWishListInfo', wishListParams, function(data) {
							   	if(data){
							   		data = data.replace(/^\s*\/\*/, "").replace(/\*\/\s*$/, "");
							   		var serviceResponse = $.parseJSON(JSON.stringify(data));
							   		serviceResponse = $.parseJSON(serviceResponse);
							   		var favProducts = [];

							   		if(serviceResponse.success != 'false'){
							       		$.each(serviceResponse, function(key, val) {
							       			var favFrame = {};
							       			favFrame.product_id = val.UPC;
							       			favFrame.reg_price = val.price;
							       			favFrame.category = val.category;
							       			favProducts.push(favFrame);
							       		});
							       	} 
							    	//console.debug("favProducts:"+JSON.stringify(favProducts));
							    }
							   	disableDirtyFlag();
							   	if(formData.redirectURL){
                                    window.location.href= decodeURIComponent(formData.redirectURL); 
							   	}else{
							   		window.location = getRegisterDestination();
							   	}
								
							});
					    }
					});
				} else if (data.errorMessage && data.errorMessage.includes('PSW_RST')) {
					$('.header-update-reset-password-modal').css('display', 'block');
					$('.background-update-reset').css('display', 'block');
					$("#passwordUpdateEmailInput").val(data.errorMessage.split('PSW_RST:')[1]);
				}
				else {
					$(form).find ('input[type="text"]:first').focus ();
					$(form).find('.LogOnFailureResponseMessageDiv').removeClass("hide").attr ('aria-live', 'rude').html(data.errorMessage);
					tealium_data2track.push({
					  'id' : 'Error',
					  'Error_Source': 'User',
					  'Error_Code': 'Form Filling Error',
					  'Error_Message': data.errorMessage,
					  'Error_Details': data.errorMessage
					});
				}
			},
			error: function(jqXHR, textStatus, errorThrown) { //unexpected error case - system error
				$(form).find ('input[type="text"]:first').focus ();
				$(form).find('.LogOnFailureResponseMessageDiv').attr ('aria-live', 'rude').html('Login request failed - please try again later.');
				utagFiller.setLoginRequestError();
			}
		});
	}

	return false;
}

function showPassword(id){
	var x = document.getElementById(id);
	var icon = document.getElementById(id + '-icon');
	if (x.type === "password") {
		x.type = "text";
		icon.querySelector('.hide-password').style.display=""
		icon.querySelector('.show-password').style.display="none"
	} else {
		x.type = "password";
		icon.querySelector('.show-password').style.display=""
		icon.querySelector('.hide-password').style.display="none"
	}
}

function logonFormSubmitEyeExamLanding(form) {
	if($(form).valid()) {
		$.ajax({
			url: getAbsoluteURL(true) + 'LogonAjax',
			type : 'post',
			data: $(form).serializeArray(),
			dataType: 'json',
			crossDomain: true,
			success: function(data) {
				if(data.passwordExpired && data.passwordExpired == '1') {
					$('#header-set-a-new-password-modal').ariaShow();
					$('.sign-in-link').addClass("open clicked no-show");
				}
				else if(data.success) {
					disableDirtyFlag();
					window.location = $('#redirectURL').val();
				}
				else {
					$(form).find ('input[type="text"]:first').focus ();
					$('.LogOnFailureResponseMessageDivEyeExam').html(data.errorMessage);
					$('.LogOnFailureResponseMessageDivEyeExam').toggleClass("hide").attr ('aria-live', 'rude');
					tealium_data2track.push({
					  'id' : 'Error',
					  'Error_Source': 'User',
					  'Error_Code': 'Form Filling Error',
					  'Error_Message': data.errorMessage,
					  'Error_Details': data.errorMessage
					});
				}
			},
			error: function(jqXHR, textStatus, errorThrown) { //unexpected error case - system error
				$(form).find ('input[type="text"]:first').focus ();
				$('.LogOnFailureResponseMessageDivEyeExam').html('Login request failed - please try again later.');
				$('.LogOnFailureResponseMessageDivEyeExam').toggleClass("hide").attr ('aria-live', 'rude');
				utagFiller.setLoginRequestError();
			}
		});
	}

	return false;
}

function processTAHMiniCartResults(data) {
	$('#mini-tah-cart-contents').html(data);
	$('#tah-quantity-header').html($('#mini-tah-cart-contents .tah-quantity').html()); //update count in case it changed
	processingMiniTAHCart = false;
}

function hideAllDialogs() {
	$('.dialog').ariaHide();
	$('.ui-dialog').ariaHide();
}

/**
 * Set up the given phone fields to autotab and only accept numeric numbers
 * @param phone1Field
 * @param phone2Field
 * @param phone3Field
 */
function setupPhoneFields(phone1Field, phone2Field, phone3Field){
	// function to allow numbers only
	var numbersOnly = function(e){
		 var key = e.which || e.keyCode;

         if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
         // numbers
             key >= 48 && key <= 57 ||
         // Numeric keypad
             key >= 96 && key <= 105 ||
         // Backspace and Tab and Enter
            key == 8 || key == 9 || key == 13 ||
         // Home and End
            key == 35 || key == 36 ||
         // left and right arrows
            key == 37 || key == 39 ||
         // Del and Ins
            key == 46 || key == 45)
             return true;

         return false;
	}

	$(phone1Field).bind('keyup', function(e){
		if (this.value.length == 3 && ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))){
			$(phone2Field).focus().select();
		}
	}).bind('keydown', numbersOnly);
	$(phone2Field).bind('keyup', function(e){
		if (this.value.length == 3 && ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))){
			$(phone3Field).focus().select(e);
		}
	}).bind('keydown', numbersOnly);

	// don't autotab the third phone field, but still make it only accept numbers
	$(phone2Field).add(phone3Field).bind('keydown', numbersOnly).focus(function(){
		$(this).select();
	});
}

/**
 * var tpl = "This is a test string and %variableName";
 * stringTemplate(tpl, { variableName: 'an example on using this function!!!' })
 * ---> "This is a test string and an example on using this function!!!"
 */
function stringTemplate(text, vars, prefix){
	prefix = prefix || '%';

	if(vars != undefined && text != null){
		for (var variable in vars){
			var value = vars[variable];
			while (text.indexOf(prefix + variable) != -1){
				text = text.replace(prefix + variable, value);
			}

		}
	}
	return text;
}

/**
 * Make a request to mapquest to geocode a location and perform the given callback
 * when the request returns
 * @param location the location to geocode (zip code, address, etc.)
 * @param callbackName the name of the callback to use after the geocode is complete
 */
function performGeocode(location, callbackName){
	if (location && location.length &&
		callbackName && callbackName.length){

		var protocol = document.location.protocol;

		var url = protocol + '//www.mapquestapi.com/geocoding/v1/batch?key='+constants.services.mapquestKey+'&callback=' + callbackName + '&inFormat=kvp&outFormat=json&location='+encodeURIComponent(location);
		$('<script type="text/javascript" />').attr('src', url).appendTo('body');
	}
}

/**
 * Remove a user's eye exam cookies
 */
function removeExamCookies(){
	$.cookie("exam1", '', { expires:-1, path: '/' });
	$.cookie("exam2", '', { expires:-1, path: '/' });
	$.cookie("exam3", '', { expires:-1, path: '/' });
	$.cookie("eapptsUserId", '', { expires:-1, path: '/' });
}

function resetPassword() {
	$.ajax({
		url: getAbsoluteURL() + 'ResetPassword',
		data: $('#ResetPasswordForm').serializeArray(),
		dataType: 'jsonp',
		type: 'post',
		success: function(response){
			if(response.success){
				$('#ResetPasswordFailureResponseMessageDiv').html('');
				$('#header-reset-password-modal').ariaHide();
				$('#header-reset-password-done-modal').ariaShow();
				$('#examResetPasswordSuccessFullResponseMessageDiv').html(MessageHelper.messages["PASSWORD_RESET_SUCCESS"]);
			}
			else {
				$('#examResetPasswordSuccessFullResponseMessageDiv').html('');
				$('#ResetPasswordFailureResponseMessageDiv').html(response.errorMessage);
			}
		},
		error: function(response) { //this shouldn't happen, not an expected error case
			$('#ResetPasswordFailureResponseMessageDiv').html('We are currently experiencing an issue with resetting your password - please try again later.');
		}
	});
}

function isPOBox(address){
	var poboxRegex = /\b[P|p]*(OST|ost)*\.*\s*[O|o|0]*(ffice|FFICE)*\.*\s*[B|b][O|o|0][X|x]\b/;
	if(address) {
		return poboxRegex.test(address);
	}
	else {
		return false;
	}
}

function getRegisterDestination() {
	if($('#registerURL').length > 0) {
		var registerUrl = $('#registerURL').val();
		if(registerUrl == 'CURRENT') {
			var separator = '?';
			if($.getUrlVars().length > 0) {
				separator = '&';
			}
			return document.URL + separator + 'registered=1';
		}
		else {
			return registerUrl;
		}
	}
	else {
		return $('#accountURL').val();
	}
}

function isValidDate(year, month, day) {

	var rxDatePattern = /^(\d{8})$/;
	if(!rxDatePattern.test(''+year+month+day)) {
		return false;
	}

	var dtYear = parseInt(year, 10);
	var dtMonth = parseInt(month, 10);
	var dtDay = parseInt(day, 10);

	var isLeapYear = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));

	if(dtMonth < 1 || dtMonth > 12) {
		return false;
	}
	else if(dtDay < 1 || dtDay > 31) {
		return false;
	}
	else if((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) {
		return false;
	}
	else if(dtMonth == 2) {
		if (dtDay > 29 || (dtDay == 29 && !isLeapYear)) {
			return false;
		}
	}

	return true;
}

function setupTooltips ()
{
	var t = setTimeout (function () {
		$('.tooltip-link').each (function ()
		{
		    var $this = $(this),
		        $tool = $this.prev ('.tooltip'),
		        top = $tool.height () - 15,
		        left = ($tool.width () / 2) - 20;

		   $tool.css ('left', '-9999px').show ();
		   $tool.css ('top', '-' + top + 'px').css ('left', '-' + left + 'px').hide ();

		   $this.hover (function ()
		   {
			   $tool.show ();
		   },
		   function ()
		   {
			   $tool.hide ();
		   });
		});
	}, 100)
}


function setupTimeout ()
{
	// 25 minutes
	setTimeout (displayTimeoutModal, 1500000)
}

function displayTimeoutModal ()
{
	$('#timeoutModal').dialog({
		autoOpen: true,
		draggable: false,
		resizable: false,
		modal: true,
		zIndex: 9999,
		width:320,
		appendTo: "#modalList",
		open:function () {
			$(this).find ('.cancel').bind ('click', function () {
				$('#timeoutModal').dialog ('close');
			});
		},
		close:function () {
			$(this).find ('.cancel').unbind ('click');
		}
	});
}



function removeContactFromMiniCart(leftLensorderItemId,rightLensorderItemId){
	var params = {
			storeId : this.storeId,
			catalogId : this.catalogId,
			langId : this.langId,
			orderId : ".",
			orderItemId_1 :leftLensorderItemId,
			quantity_1 : 0,
			orderItemId_2 : rightLensorderItemId,
			quantity_2 : 0,
			calculationUsage : "-1,-2,-4,-5,-6,-7",
			url : "OrderCalculate"
			};

			//For handling multiple clicks
			if(!submitRequest()){
				return;
			}
			var theUrl = getAbsoluteURL(true);
			theUrl = theUrl.substring(theUrl.lastIndexOf(":") + 1);
			cursor_wait();

			$.ajax({
				url: theUrl +"AjaxOrderChangeServiceItemUpdateTO",
				type: "POST",
				data: params,
				dataType: 'json',
				success: function(response) {
				location.reload();
				}
			});
}


function removeFromMiniCart(frameOrderItemId,orderId){
	var params = {
			storeId : this.storeId,
			catalogId : this.catalogId,
			langId : this.langId,
			orderId : orderId,
			orderItemId : frameOrderItemId,
			calculationUsage : "-1,-2,-4,-5,-6,-7",
			url : "OrderCalculate"
			};
	//For handling multiple clicks
	if(!submitRequest()){
		return;
	}

	var theUrl = getAbsoluteURL(true);
	theUrl = theUrl.substring(theUrl.lastIndexOf(":") + 1);
	cursor_wait();

	$.ajax({
		url: theUrl +"AjaxFrameDeleteCmd",
		type: "POST",
		data: params,
		dataType: 'json',
		success: function(response) {
		location.reload();
		}
	});

}

function incrementShopCartCounter(num){
	try{
		if(num === undefined) num = 1;
		$('#tah-quantity-header').html(parseInt($('#tah-quantity-header').html()) + num);
		$('#tah-quantity-header').show();
	}
	catch(e){
	}
}


function repaint ()
{
	// Forces IE8 to redraw/repaint
	$('body').addClass ('nothing').removeClass ('nothing');

}

function ajaxAddToFavorites(catentryId, callback) {
	var params = {};
	params.storeId = constants.ajaxParams['storeId'];
	params.catalogId = constants.ajaxParams['catalogId'];
	params.langId = constants.ajaxParams['langId'];
	params.catEntryId = catentryId;
	params.URL = 'AjaxGetWishListInfo';
	$.post(getAbsoluteURL() + 'GuestInterestItemAdd', params, function(data) {
		if (callback!=null)
	    	callback();
		var favProducts = [];
		var _dl = getBasicDLObject();
		var pdp_upc = $('#pdpUPC').val();
		var products = [];
		var glass = {};
		var upc = $('#currentUPC_'+catentryId).val();
		glass.product_id = upc;
		if(typeof pdp_upc != 'undefined'){
			_dl.page_name= ["store front","product details"];
			glass.reg_price = $('#currentPrice_'+upc).val();
		} else {
			//console.debug("plp");
			var plpProductPrice = $('#WC_CatalogEntryDBThumbnailDisplayJSPF_'+catentryId+"_div_10").text().trim().replace('$','');
			glass.reg_price = plpProductPrice;
			if(typeof pageNameArray != 'undefined'){
				_dl.page_name = pageNameArray;
    	    } else {
    	    	_dl.page_name= ["store front","search results"];
    	    }
		}
		glass.category = $('#currentCategory_'+catentryId).val();
	    products.push(glass); 

	    _dl.products = products;
	    _dl.favorite_products = [];
	    _dl.site_events = { "add_to_favorites": true};
	    //console.debug("add_to_favorites:"+JSON.stringify(_dl));
		callTrackAnalytics(_dl);
	});

}

function ajaxRemoveFromFavorites(catentryId, callback) {
	var params = {};
	params.storeId = constants.ajaxParams['storeId'];
	params.catalogId = constants.ajaxParams['catalogId'];
	params.langId = constants.ajaxParams['langId'];
	params.catEntryId = catentryId;
	params.URL = 'AjaxGetWishListInfo';
	$.post(getAbsoluteURL() + 'GuestInterestItemDelete', params, function(data) {
		callback();
		var wishListParams = {};
		wishListParams.storeId = constants.ajaxParams['storeId'];
		wishListParams.catalogId = constants.ajaxParams['catalogId'];
		wishListParams.langId = constants.ajaxParams['langId'];
		wishListParams.catEntryId = catentryId;
		wishListParams.URL = 'AjaxGetWishListInfo';

		$.get('AjaxGetWishListInfo', wishListParams, function(data) {
	    	if(data){
	    		data = data.replace(/^\s*\/\*/, "").replace(/\*\/\s*$/, "");
	    		var serviceResponse = $.parseJSON(JSON.stringify(data));
	    		serviceResponse = $.parseJSON(serviceResponse);
	    		var favProducts = [];

	    	    if(serviceResponse.success != 'false'){
	    	    	$.each(serviceResponse, function(key, val) {
	    	    		var favGlass = {};
	    	    		favGlass.product_id = val.UPC;
	    	    		favGlass.reg_price = val.price;
	    	    		favGlass.category = val.category;
	    	    		favProducts.push(favGlass);
	    	    	});
	    		}

	    	    var _dl = getBasicDLObject();
	    		var pdp_upc = $('#lensCategory').val();
	    		var products = [];
	    		var glass = {};
	    		var upc = $('#currentUPC_'+catentryId).val();
	    		glass.product_id = upc;
	    		if(typeof pdp_upc != 'undefined'){
	    			_dl.page_name= ["store front","product details"];
	    			glass.reg_price = $('#currentPrice_'+upc).val();
	    		} else {
	    			glass.reg_price = $('#WC_CatalogEntryDBThumbnailDisplayJSPF_'+catentryId+"_div_10").text().trim().replace('$','');
	    			if(typeof pageNameArray != 'undefined'){
	    				_dl.page_name = pageNameArray;
	        	    } else {
	        	    	_dl.page_name= ["store front","search results"];
	        	    }
	    		}
	    		glass.category = $('#currentCategory_'+catentryId).val();
	    	    products.push(glass);
	    	    _dl.products = products;
	    	    _dl.favorite_products = favProducts;
	    	    _dl.site_events = { "remove_from_favorites": true}; 

	    		callTrackAnalytics(_dl);
	    	}

	    	/*var params = {};
			params.storeId = constants.ajaxParams['storeId'];
			params.catalogId = constants.ajaxParams['catalogId'];
			params.langId = constants.ajaxParams['langId'];
			params.catEntryId = catentryId;
			params.URL = 'AjaxGetWishListInfo';
			$.post(getAbsoluteURL() + 'GuestInterestItemDelete', params, callback);*/
		});
	});


	/*var wishListParams = {};
	wishListParams.storeId = constants.ajaxParams['storeId'];
	wishListParams.catalogId = constants.ajaxParams['catalogId'];
	wishListParams.langId = constants.ajaxParams['langId'];
	wishListParams.catEntryId = catentryId;
	wishListParams.URL = 'AjaxGetWishListInfo';

	$.get('AjaxGetWishListInfo', wishListParams, function(data) {
    	if(data){*/
    		// data = data.replace(/^\s*\/\*/, "").replace(/\*\/\s*$/, "");
    		/* var serviceResponse = $.parseJSON(JSON.stringify(data));
    		serviceResponse = $.parseJSON(serviceResponse);
    		var favProducts = [];

    	    if(serviceResponse.success != 'false'){
    	    	$.each(serviceResponse, function(key, val) {
    	    		var favGlass = {};
    	    		favGlass.product_id = val.UPC;
    	    		favGlass.reg_price = val.price;
    	    		favGlass.category = val.category;
    	    		favProducts.push(favGlass);
    	    	});
    		}

    	    var _dl = getBasicDLObject();
    		var pdp_upc = $('#lensCategory').val();
    		var products = [];
    		var glass = {};
    		var upc = $('#currentUPC_'+catentryId).val();
    		glass.product_id = upc;
    		if(typeof pdp_upc != 'undefined'){
    			_dl.page_name= ["store front","product details"];
    			glass.reg_price = $('#currentPrice_'+upc).val();
    		} else {
    			//glass.reg_price = $('#currentPrice_'+upc).val();
    			glass.reg_price = $('#WC_CatalogEntryDBThumbnailDisplayJSPF_'+catentryId+"_div_10").text().trim().replace('$','');
    			if(typeof pageNameArray != 'undefined'){
    				_dl.page_name = pageNameArray;
        	    } else {
        	    	_dl.page_name= ["store front","search results"];
        	    }
    		}
    		glass.category = $('#currentCategory_'+catentryId).val();
    	    products.push(glass);
    	    _dl.products = products;
    	    _dl.favorite_products = favProducts;
    	    _dl.site_events = { "remove_from_favorites": true};
    	    console.debug("remove_from_favorites:"+JSON.stringify(_dl));
    		callTrackAnalytics(_dl);
    	}

    	var params = {};
		params.storeId = constants.ajaxParams['storeId'];
		params.catalogId = constants.ajaxParams['catalogId'];
		params.langId = constants.ajaxParams['langId'];
		params.catEntryId = catentryId;
		params.URL = 'AjaxGetWishListInfo';
		$.post(getAbsoluteURL() + 'GuestInterestItemDelete', params, callback);
	});*/

}

function savePlacement(){
	currentTopPosition = $(window).scrollTop();
}

function getPlacement(){
	return currentTopPosition;
}

function createPopoverFor($element) {
    if (!$element.length) {
      //console.warn("No element found for popover content");
      return;
    }

    var data = $element.data(); // Copy the special data-target element contents

    if (data.target) {
      var contentElementId = data.target;
      var contentHtml = $(contentElementId).html();
      data.content = contentHtml;
    }

    $element.popover(data).on('mouseenter', function () {
      var trigger = this;
      $(this).popover('show');
      $('.popover').on('mouseleave', function () {
        $(trigger).popover('hide');
      });
    }).on('mouseleave', function () {
      var trigger = this;
      setTimeout(function () {
        if (!$('.popover:hover').length) {
          $(trigger).popover('hide');
        }
      }, 250);
    });
  } // Top news ticker

//function updateFavoritesCount(params) {
//	//$('.js-favorites-icon').popover('dispose');
//	
//	$.get(getAbsoluteURL() + 'AjaxMiniWishListDisplay', params, function(data) {
//		
//		$('#favourite-counter-print').text($('#itemCount-favourite').text().trim());
//		$('#favourite-counter-print').hide();
//	}, 'html');
//}

function openFavesTray() {
	closeMainNav();

	//$('#favorites-tray-button').addClass('active');

	var $favesTray = $('#favorites-tray');

	$favesTray.css({left: $(document).width()});
	$favesTray.css({minHeight: $(document).height()});

	$('#favorites-tray').removeClass('hide');
	$('#favorites-tray').animate({left: 0}, 100);

}

function closeFavesTray() {
	$('#favorites-tray-button').removeClass('active');

	var $favesTray = $('#favorites-tray');

	$favesTray.animate({left: $(document).width()}, 100, function(){
		$favesTray.addClass('hide');
	});
}

function toggleFavesTray() {
	var $favesTrayButton = $('#favorites-tray-button');

	if($favesTrayButton.hasClass('active')){
		closeFavesTray();
	} else {
		openFavesTray();
	}
}

(function($){
	/**
	 * Augment jQuery with a method to add a "loading" overlay above a div
	 * or other container
	 * */
	$.fn.loading = function(done){
		this.pastPosition = this.pastPosition ? this.pastPosition : this.css('position');
		if(done === true) {
			this.css('position', this.pastPosition ? this.pastPosition : 'static' );
			this.find('.loading_overlay').detach().remove();
		} else {
			if( !this.find('.loading_overlay').length ) {
				if( this.pastPosition == 'static' ||
					this.pastPosition == 'initial' ||
					this.pastPosition == 'inherit') {
						this.css('position', 'relative');
				}
				$('<div>').addClass('loading_overlay').appendTo(this);
			}
		}
		return this;
	}
	$.fn.loadingStart = function(){ return this.loading(false); }
	$.fn.loadingDone = function(){ return this.loading(true); }

	/**
	 * Add redraw method to jQuery elements
	 */
	$.fn.redraw = function(){
	  $(this).each(function(){
	    var redraw = this.offsetHeight;
	  });
	  return this;
	};

})(jQuery);


$(function(e){
	$('#header-sign-in-modal').keydown( function(e) {
	    if (e.keyCode == 9 && e.shiftKey) {
	    	openSignin();
			return false;
	    }
	  });

	if($("#CatalogPageSearch").length >0){
		$("#Search_Result_Summary tr:eq(0)").find("td:first a").focus();
	}
});

var processingMiniCart = false;
function reloadMiniCart(clearCurrent){
	if(!processingMiniCart) {
		if(clearCurrent){
			$('#mini-shop-cart-contents').empty();
		}
		if($("#mini-shop-cart-contents").find("*").size() == 0) { //only display if data not yet loaded // Compare loaded quantity with current quantity
			processingMiniCart = true;
			var params = {
				storeId: storeId,
				catalogId: catalogId,
				langId: langId
			};
			$.get(getAbsoluteURL() + 'AjaxQuickCartDisplay', params, function(data) {
				$('.popover-body #mini-shop-cart-contents').html(data);
				//$('#mini-shop-cart-contents').html(data);
				$('#order-quantity-header').html($('#mini-shop-cart-contents .order-quantity').html()); //update count in case it changed
				processingMiniCart = false;

				if ($('#WC_MiniShopCartDisplay_link_5').length > 0)
				{
				    $('#WC_MiniShopCartDisplay_link_5').on ('blur', function ()
				    {
				        $('a.hovered').removeClass ('hovered');
				        $('#mini-shop-cart').addClass ('hide').removeClass ('hide');
				    });
				}
				else
				{
				    $('.cart-view-all').on ('blur', function ()
				    {
				        $('a.hovered').removeClass ('hovered');
				        $('#mini-shop-cart').addClass ('hide').removeClass ('hide');
				    });
				}

			}, 'html');
		}
		else {
		}
	}
	if(!processingMiniTAHCart && $("#mini-tah-cart-contents").find("*").size() == 0) {
		//if($('#tah-quantity-header').html() != $('#mini-tah-cart-contents .tah-quantity').html()) { //only display if data not yet loaded
		/*processingMiniTAHCart = true;
			var params = {
				storeId: storeId,
				catalogId: catalogId,
				langId: langId
			};
			$.get(getAbsoluteURL() + 'MiniTryAtHomeDisplay', params, function(data) {
				processTAHMiniCartResults(data);
			}, 'html');*/
		//}
	}
}

function openSignin(){
	showLogonModal();

	$('#favorites-tray-button').removeClass('hovered clicked');
	$('.favorite-tray-section').removeClass('show-menu');
}

function openRegister(){
	if($("#header-sign-in-modal:visible").length == 0)
		showRegisterModal();

	$('#favorites-tray-button').removeClass('hovered clicked');
	$('.favorite-tray-section').removeClass('show-menu');
}

$(document).ready(function() {
	//$("#header-sign-in-modal").attr ('role', 'dialog');
	$("#header-register-modal").attr ('role', 'dialog');
	//$('#header-sign-in-modal .close-drop').focusout(function() {$('#LogonDialogModalForm #headerEmailAddress').focus();});
	$(".expand-signin, .expand-register").on("keydown", function(e) {
	    if (e.keyCode == 13) {
	        if($(this).attr('id') == 'Header_SignIn_Link'){
	        	openSignin();
	        	$(this).closest('ul').find('a.close-drop').css('display','block');
	        	$(this).closest('ul').find('a.open-reset-password').attr('tabIndex',4);
	        	$(this).closest('ul').find('a.live-chat-button').attr('tabIndex',7);
	        	$(this).closest('ul').find('a.close-drop').attr('tabIndex',8);
	        	$(this).css('background-position', '47px -187px');
	        	return false;
			}
	        if($(this).attr('id') == 'register'){
	        	openRegister();
	        	$(this).closest('ul').find('a.close-drop').css('display','block');
	        	$(this).closest('ul').find('a.close-drop').attr('tabIndex',9);
	        	$(this).css('background-position', '53px -187px');
	        	return false;
			}
	    }
	});
	//$("#sub_links ul:eq(0)").attr ('role', 'presentation');
	//$("#header_links ul li:nth-child(4)").removeAttr('role').removeAttr('aria-haspopup');

	if (RiaHelper.getInsuranceCookie() != "")
	{
		$('#insurance-header-link').removeClass('not-logged').addClass('logged');
	}

	$('.charsOnly').on('keyup', function(e){

		var $this = $(this);

		if ($this.val().match(/[^a-zA-Z ]/g)) {
			$this.val($this.val().replace(/[^a-zA-Z ]/g, ''));
        }
	});
	
	
	$('.UpdatePasswordUpdateSubmitForm').validate({
		onkeyup: false,
		onclick: false,
		errorClass: 'required',
		errorElement: 'span',
		rules: {
			logonId: {
				required: true,
				email: true,
			},
			logonPasswordOld: {
				required: true,
				minlength: 2,
			},
			logonPassword: {
				required: true,
				minlength: 8,
				atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: true,
			},
			logonPasswordVerify: {
				required: true,
				equalTo: '.logonPassword_updateModel',
			}
		},
		messages: {
			logonId: {
				required: MessageHelper.messages["ERROR_Logon_model_EmailInvalid"],
				email: MessageHelper.messages["ERROR_Logon_model_EmailInvalid"],
			},
			logonPasswordOld: {
				required: MessageHelper.messages["OLD_PASSWORD_EMPTY_ERROR"],
				minlength: MessageHelper.messages["OLD_PASSWORD_EMPTY_ERROR"],
			},
			logonPassword: {
				required: MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
				minlength: MessageHelper.messages["ERROR_PASSWORD_UPDATE_VALID"],
				atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: MessageHelper.messages["ERROR_PASSWORD_UPDATE_VALID"],
			},
			logonPasswordVerify: {
				required: MessageHelper.messages["PASSWORD_UPDATE_CONFIRM_ERROR"],
				equalTo: MessageHelper.messages["ERROR_PASSWORD_MISMATCH"],
			}
		},
		showErrors: function(errorMap, errorList){
			console.log(errorMap, errorList);
			this.defaultShowErrors();
	    }
	});
});

$(window).load(function() {

	//------ CODE TO OPEN MODAL POPUP FOR REGISTRATION

	var popup = $.cookie("hic_popup");
	if (popup === null || popup === '' || popup === undefined) {
		if ($('body div.hic_overlay').length <= 0)
		{
			$('<div class="hic_overlay"></div>').appendTo("body");
		}
		$.cookie("hic_popup", true, {
			expires: 1,
			path: '/'
		});
		setTimeout(function() {
			$("ul#header-register-modal").addClass('loginModal').show();
		}, 1000);
	}

	function setupTooltip(el)
	{
        var $a = $(el);
        var title = $a.attr('title');
        title += '<div class="arrow-down"></div>'
        $a.removeAttr('title');
        var $tooltip = $('<div class="tooltip"></div>');
        $tooltip.appendTo('body').hide();
        $tooltip.html(title);
        var toolWidth = $tooltip.width();
        var toolHeight = $tooltip.height();
         
        $a.on('focus', function(){
            //var top = e.pageY;
            var top = $a.offset().top - toolHeight - 40;
            //var left = e.pageX;
            var left = $a.offset().left + $a.width() / 2 - toolWidth / 2 - 1.5;
            $tooltip.css({
                display: 'block',
                top: top,
                left: left
            });
	   	});
	   
	   	$a.on('blur', function(){
	   		$tooltip.hide();
	   	});
	   	
        $a.mouseover(function (e) {
            //var top = e.pageY;
            var top = $a.offset().top - toolHeight - 40;
            //var left = e.pageX;
            var left = $a.offset().left + $a.width() / 2 - toolWidth / 2 - 1.5;
            $tooltip.css({
                display: 'block',
                top: top,
                left: left
            });
        });
        $a.mouseout(function () {
            $tooltip.hide();
        });
	}

    $('.tooltip-container').each(function () {
    	setupTooltip(this);
    });

    $('.tooltip-container-patient-info').each(function () {
    	setupTooltip(this);
    });

	//------ CODE TO OPEN MODAL POPUP FOR SIGNUP
    
    //------ CODE TO OPEN LENS CONFIGURATION
    if (document.getElementsByClassName('lens-subsection').length > 0) {
	    var buttonLensIsHide = document.getElementsByClassName('lens-subsection')[0].classList.contains('ng-hide').toString();
	    if (buttonLensIsHide == "false") {
	    	var paramPosition = window.location.href.includes('openRx=true').toString();
	    	if (paramPosition == "true"){
	    		openRXConfiguration();
	    	}
	    } 
    }
    
    function openRXConfiguration() {
    	document.getElementsByClassName('lens-subsection')[0].getElementsByTagName('lens-panel-lens-select')[0].getElementsByTagName('a')[0].click();
    }
});

var RiaHelper = {
	getCookie: function(cookieName) {
		var payload = "";
		var cookieArray = document.cookie.split(';');
        var ca = cookieArray.map(function(cookie) {
            try {
                return decodeURIComponent(cookie);
            } catch(err) {
                return cookie;
            }
        });
	    for(var i = 0; i <ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(cookieName) == 0) {
	            payload = c.substring(cookieName.length+1, c.length);
	        }
	    }
	    return payload;
	},

	getInsuranceCookie: function() {
		return RiaHelper.getCookie("json_insurance");
	},

	loadJsonInsurance: function() {
		var payload = RiaHelper.getInsuranceCookie();
		return !payload?null:JSON.parse(payload);
	},

	getTentativeUserCookie: function() {
		return RiaHelper.getCookie("tentative_user");
	},

	setInsuranceCookie: function(json) {
	    var now = new Date();
	    var time = now.getTime() + 1800 * 1000;
	    now.setTime(time);
		document.cookie = "json_insurance="+JSON.stringify(json)+"; path=/; expires=" + now.toUTCString() + ";"; // creo quello nuovo, salvandomi il json
	},
	
	toggleInsurance: function(on) {
		var now = new Date(),
			time = now.getTime() + 1800 * 1000;
		now.setTime(time);

		if (on) {
			//RiaHelper.setTentativeCookie(4);

			//PDP
			if($('.pdp-container').length > 0){
				//deselect addons
				$(".lc-lens-enh-item.added").removeClass('added');
				$('.existing-lens-addons').empty();
			}
		}
		document.cookie = 'ria_' + (on ? '0' : '1') + '=; Max-Age=0'
		document.cookie = 'ria_' + (on ? '1' : '0') + '=true; path=/; expires=' + now.toUTCString() + ';';
	},
	
	isInsuranceOn: function() {
		return RiaHelper.getCookie('ria_1') !== '' ? true : false;
	},

	saveJsonInsurance: function(json) {
		RiaHelper.setInsuranceCookie(json);
	},

	setTentativeCookie: function(val) {
	    var now = new Date();
	    var time = now.getTime() + 3600 * 1000;
		now.setTime(time);
		if (val) document.cookie = "tentative_user=" + val + "; path=/;"; // sessione
    	else document.cookie = "tentative_user=0; path=/; expires=" + now.toUTCString() + ";"; // blocco login
	},

	removeInsuranceCookie: function() {
		document.cookie = "json_insurance=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		document.cookie = "tentative_user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	},

	checkAllBenefits: function() {
		var benefits = false;
		var category;
		var json;

		if(RiaHelper.getInsuranceCookie())
		{
			json = JSON.parse(RiaHelper.getInsuranceCookie()).data;
			for(i=0; i<Object.keys(json).length && !benefits; i++)
			{
				category = Object.keys(json)[i];
				if(json[category][0].available == true) benefits = true;
			}
		}
		return benefits;
	},

	checkSingleBenefit: function(category) {
		var benefits = false;
		var category;
		var json;

		if(RiaHelper.getInsuranceCookie())
		{
			json = JSON.parse(RiaHelper.getInsuranceCookie()).data;
			for(i=0; i<Object.keys(json).length && !benefits; i++)
			{
				if(Object.keys(json)[i] == category)
				return json[Object.keys(json)[i]][0].available;
			}
		}
		return benefits;
	}

}

var MobileDeviceCookieManager = function(defaultValue) {

	this.defaultCookieValue = defaultValue;

	this.setMobileDeviceCookie = function(value) {
	    document.cookie = MobileDeviceCookieManager.MOBILE_DEVICE_COOKIE_NAME + "=" + value + ";path=/";
	};

	this.doesMobileDeviceCookieExist = function() {
	    if(document.cookie.indexOf(MobileDeviceCookieManager.MOBILE_DEVICE_COOKIE_NAME) < 0) {
	        this.setMobileDeviceCookie(this.defaultCookieValue);
	    }
	}

	this.redirectTo = function(value, beforeRedirectFunction) {
		this.setMobileDeviceCookie(value);
		if (typeof beforeRedirectFunction === 'function')
		{
			beforeRedirectFunction();   //useful to clean-up cookies
		}
		location.reload(true);
	}

	this.redirectToMobile = function() {
		this.redirectTo(MobileDeviceCookieManager.MOBILE_DEVICE_COOKIE_VALUE_MOBILE);
	}
}

MobileDeviceCookieManager.MOBILE_DEVICE_COOKIE_NAME = 'WC_MOBILEDEVICEID';
MobileDeviceCookieManager.MOBILE_DEVICE_COOKIE_VALUE_DESKTOP = '0';
MobileDeviceCookieManager.MOBILE_DEVICE_COOKIE_VALUE_MOBILE = '1';
MobileDeviceCookieManager.MOBILE_DEVICE_COOKIE_VALUE_TABLET = '2';

var mobileDeviceCookieManager = new MobileDeviceCookieManager(MobileDeviceCookieManager.MOBILE_DEVICE_COOKIE_VALUE_DESKTOP);   //default to "desktop"


var PdpHelper = {
		setOriginalImg: function()
		{
			$('.product-carousel .views').hide();
			$('.product-carousel #static button').hide();
			//var orig_img = $('img', '.static').data('orig-image');
			//$('img', '.static').prop('src', orig_img);
		}
}

/**
 * Open/close accordion
 * @param obj image object
 * @param block name block open/close
 */
function accordion(obj, block) {
	    if ($('div[accordion="'+block+'"]').hasClass("to-hide")) {
        $('div[accordion="'+block+'"]').removeClass("to-hide");
        $(obj).children().children().attr("src","/webapp/wcs/stores/TargetOpticalStorefrontAssetStore/images/insurance/arrow-up.png");
    } else {
        $('div[accordion="'+block+'"]').addClass("to-hide");
        $(obj).children().children().attr("src","/webapp/wcs/stores/TargetOpticalStorefrontAssetStore/images/insurance/arrow-down.png");
    }
}

function accordionTable(obj, block) {
	$('.to-table-row.list-lenses').each(function() {
	    if(!$(this).hasClass('to-hide')) 
	    	$(this).addClass('to-hide');
	    //$("#select-lens-alert").hide();
	    
	    if($('.select-color-lens').length > 0)
	    	$('.select-color-lens').show();
	    
	    $(this).find('#colorsAndAddOn').hide();
	});
	
	$('tr[class*="first-level-"]').each(function() {
	    if($(this).find('.lens-option-title').hasClass('copy-input-lenses')) 
	    	$(this).find('.lens-option-title').removeClass('copy-input-lenses');	  
	});
	
    if ($('tr[accordion="'+block+'"]').hasClass("to-hide")) {
    $('tr[accordion="'+block+'"]').removeClass("to-hide");
    } else {
        $('tr[accordion="'+block+'"]').addClass("to-hide");
    }
}

function accordion_promotion(obj, block) {

    if ($('ul[accordion="'+block+'"]').hasClass("open")) {
	    $('ul[accordion="'+block+'"]').removeClass("open");
	    //$(obj).attr("src","/webapp/wcs/stores/TargetOpticalStorefrontAssetStore/images/insurance/arrow-up.png");
	} else {
	    $('ul[accordion="'+block+'"]').addClass("open");
	    //$(obj).attr("src","/webapp/wcs/stores/TargetOpticalStorefrontAssetStore/images/insurance/arrow-down.png");
	}
}

String.prototype.replaceAt=function(index, replacement) {
	return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function eraseForm(form)
{
	if(form.indexOf('card-number') !== -1)
	{
		/*$('.to-card-number').each(function() {
		    $('.to-card-number .to-col-1 :input').val('');
		});
		$('.col-1 .cc_cvc')
		{
			$('.to-card-number .col-1 .cc_cvc :input').val('');
		}
		$('#c_firstname').val('');
		$('#c_lastname').val('');*/
		$(':input','#WC_StandardVisa_div_1')
		 .not(':button, :submit, :reset, :hidden')
		 .val('')
		 .removeAttr('checked')
		 .removeAttr('selected');

	}
	else
	{

		$(':input','#'+form+'')
		 .not(':button, :submit, :reset, :hidden')
		 .val('')
		 .removeAttr('checked')
		 .removeAttr('selected');
		if(form.indexOf('doctor') == -1)
		{
			$("#saveContinue1").addClass("disabled-click");
			$("#choose-select-shipping").attr("disabled", true);
			document.getElementById(form).blur();
		}
		else
		{
			$('.contact_information :input').each(function() {
			    $('this').val('');
			});
			$('#doctorstabelresult').hide();
			$('#submitDoctorInformation').removeClass('button-green').html('select');
		}
	}

}

function openRegisterMobDesktop(obj) {

    $("#confirmation_register_form").find(".row").each(function () {
        $(this).toggle();
    });
    var img = $(obj).find('img');
    var src = $(img).attr('src'); // $(obj).attr("src");
    var checkImg = src.includes("down");
    if (checkImg) {
        var src = $(img).attr("src", "/wcsstore/TargetOpticalStorefrontAssetStore/mobile20/images/arrow-up.png");
    } else {
        var src = $(img).attr("src", "/wcsstore/TargetOpticalStorefrontAssetStore/mobile20/images/arrow-down.png");
    }
}

function openSignInMobDesktop(obj) {
    $("#confirmation_signin_form").find(".signin-block").each(function () {
        $(this).toggle();
    });
    var img = $(obj).find('img');
    var src = $(img).attr('src'); //$(obj).attr("src");
    var checkImg = src.includes("down");
    if (checkImg) {
        var src = $(img).attr("src", "/wcsstore/TargetOpticalStorefrontAssetStore/mobile20/images/arrow-up.png");
    } else {
        var src = $(img).attr("src", "/wcsstore/TargetOpticalStorefrontAssetStore/mobile20/images/arrow-down.png");
    }
}

// handle footer email signup form
$(document).ready(function(){
	if(window.EmailSignupForm != undefined){
		EmailSignupForm.setupValidation();
	}
});
	
/*if(form.indexOf('card-number')
	{
		$('.to-card-number .to-col-1').each(function() {
		    $(':input').val('');
		});
		$('.col-1 .cc_cvc')
		{
			$(':input').val('');
		}
	}**/

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function searchProductFromArray(nameKey, myArray){

    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].product_id === nameKey) {
            return true;
        }
    }
    return false;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
}; 

/***     The following methods are used to add data to _dl objects  ***/

/*  This function is invoked to create and send the _dl object
 *  when a social link is clicked */
function socialClick(socialSite){
	var _dl = getBasicDLObject();
	_dl.site_events = {"social_media_share": true};
	_dl.social_network = socialSite;
	callTrackAnalytics(_dl);
}

/*  This function is invoked to create and send the _dl object
 *  when a user follows a link to an external site (for instance: Target.com) */
function exitFromSite(link){
	var _dl = getBasicDLObject();
	_dl.site_events = {"property_referral": true};
	_dl.exit_url = link;
	callTrackAnalytics(_dl);
}

/*  This function is invoked to create and send the _dl object
 *  when a mobile user clicks to send an email */
function sendDLforChat(){
	var _dl = getBasicDLObject();
	_dl.site_events = {"start_chat_session": true};
	callTrackAnalytics(_dl);
}

/* on the plp _dl should contain data related to the sorted items. */
function getListDetails(_dl){
	_dl.items_count_limit = $(".resultsNumber span.total-items").toArray()[0].innerText;
	_dl.items_sort = $(".sort-by li .active.on").toArray()[0].innerText;
}

/* The following method is invoked in order to populate the
 * _dl.filters with the updated values. */
function addFilterToDL(_dl){
	_dl.filters = {
		"gender": undefined,
		"type": undefined,
		"collection": undefined,
		"special_offers": undefined,
		"brands": undefined,
		"manufacturers": undefined,
		"price":{
			"min": undefined,
			"max": undefined
		},
		"frame_shape": undefined,
		"color": undefined,
		"face_shape": undefined,
		"fit": undefined,
		"materials":undefined
	};

	//$("#facet-type").attr("id", "facet-type-true"); /* facet-type is the id for types (correct) and special offers (wrong) >.> */
	_dl.filters.gender = getFilterValues("#facet-gender");
	_dl.filters.type = getFilterValues("#facet-type");
	_dl.filters.collection = getFilterValues("#facet-collections");
	_dl.filters.special_offers = getFilterValues("#facet-special-offer");
	_dl.filters.brands = getBrandValues("#facet-brands");

	//_dl.filters.manufacturers = getFilterValues(".facet-subnav contact-lens-manufacturer"); // don't working with getFilterValues for now
	_dl.filters.price = setPriceFilter();

	_dl.filters.frame_shape = getFilterValues("#facet-frame-shape");
	_dl.filters.color = getFilterValues("#facet-color");
	_dl.filters.face_shape = getFilterValues("#facet-faceshape");
	_dl.filters.fit = getFilterValues("#facet-fit");
	_dl.filters.materials = getFilterValues("#facet-material");
}

/* It takes the string filter values from html to push them in the _dl object */
function getFilterValues(htmlTag){
	var resultArray = [];
	var tmpArray = $( htmlTag + " .selected span" ).toArray();
	for (i = 0; i < tmpArray.length; i++) {
		elem = tmpArray[i].innerText.trim();
	    if (elem != "" && elem.indexOf("filter") === -1) {
	    	resultArray.push(elem);
	    }
	}
	return resultArray;
}

/* Brands filter is formatted differently from the other filters and required
*  an ad hoc method to parse the values */
function getBrandValues(htmlTag){
	var resultArray = [];
	var tmpArray = $( htmlTag + " .selected" ).toArray();
	for (i = 0; i < tmpArray.length; i++) {
		elem = $(tmpArray[i]).toArray()[0];
		resultArray.push($(elem).attr("data-item").split(":")[1]);
	}
	return resultArray;
}

/* used to obtain price filter values */
function setPriceFilter(){
	var price = {"min": undefined, "max": undefined};
    var facetCookieVal = null;
    if(typeof read_cookie === 'function'){
    	facetCookieVal = decodeURIComponent(read_cookie('facets'));
    }
    if ((facetCookieVal != null) && (facetCookieVal.indexOf('PR:') != -1)){
        var val1 = (facetCookieVal.split('PR:'))[1].split('|');
        var val2 = val1[0].split('-');
        lowerSelected = val2[0];
        upperSelected = val2[1];
    }else{
        lowerSelected = 0;
        upperSelected = typeof defaultMax != 'undefined' ? defaultMax : 250;
    }
	price.min = lowerSelected;
	price.max = upperSelected;
	return price;
}

function addSimilarProductsTo(_dl){
	var similProds = [];
	var brands = $("#other-looks .info .brand").toArray();
	var prodIds = $("#other-looks .productImagePdpLink").toArray();
	var prices = $("#other-looks .info .price").toArray();
	for(i=0; i<brands.length; i++){
		var tmpProd = {};
		tmpProd.model = brands[i].innerText;
		tmpProd.product_id = $(prodIds[i]).attr("href").split("/").pop().split("-").pop();
		tmpProd.reg_price = prices[i].innerText;
		similProds.push(tmpProd);
	}
	_dl.similar_products = similProds;
}

/*** To send _dl when user tries to register ***/
function sendDLRegisterRequest(){
	var _dl = getBasicDLObject();
	_dl.site_events = {"registration_start": true};
	callTrackAnalytics(_dl);
}

/*** To send _dl when user changes frames' color ***/
jQuery(document).on('click', 'a.to-select-colors-icon', function(event) {
	var _dl = getBasicDLObject();
	_dl = sendDLWhenPDPLoads();
	_dl.site_events = {"change_color": true};
	callTrackAnalytics(_dl);
});

/*** To send _dl when one of the correlated products is clicked ***/
jQuery(document).on('click', "#other-looks #productMainImage", function(event) {
	var _dl = getBasicDLObject();
	_dl = sendDLWhenPDPLoads();
	_dl.site_events = {"select_similar_products": true};
	var tmpSKU = $(this)[0].currentSrc.split("/");
	tmpSKU = tmpSKU[tmpSKU.length-1].substr(0,12);
	addSimilarProductsTo(_dl);
	var similProds = _dl.similar_products;
	var found = false;
	for(i=0; i<similProds.length && !found; i++){
		if(similProds[i].product_id===tmpSKU){
			found = true;
			_dl.products = [similProds[i]]; // taking values of the clicked correlated product
		}
	}
	callTrackAnalytics(_dl);
});


/*** Triggered when a lens tint is chosen ***/
jQuery(document).on('click', '#hic-colors .catentry-radio', changeLens);
function changeLens(){
	if($('.shopCartTotals').length <= 0)
	 {
		var dl = getBasicDLObject();
		dl = sendDLWhenPDPLoads();
		_dl.site_events = {"select_lens_tint": true};
		callTrackAnalytics(_dl);
	 }
}

/** triggered when user completes its registration ** TODO:call the function **/
function sendDLRegistration(choice){
	var _dl = getBasicDLObject();
	_dl.site_events = {"registration_complete": true, "authentication_complete": true, "email_opt_in": choice};
	callTrackAnalytics(_dl);
}

/** always triggered but it makes operations only when on page "get directions" **/
$(window).on('load', function(event) {
	if($("#TOStoreNameForGetDirections")[0] !== undefined){
		var store = {};
		store.store_name = $("#TOStoreNameForGetDirections")[0].innerText;
		var _dl = getBasicDLObject();
		_dl.site_events = {"get_directions": true};
		var found = false;
		var stores = []
		if(sessionStorage.getItem("store_list")!== null){
				stores = JSON.parse(sessionStorage.getItem("store_list"));
		}
		for( i=0; i<stores.length && !found; i++){
			if(stores[i].store_name.toUpperCase() === store.store_name){
				store = stores[i];
				found = true;
			}
		}
		_dl.page_name = ["store_locator", "get_directions"];
		_dl.site_events = "get_directions";
		_dl.stores = [store];

		callTrackAnalytics(_dl);
	}
});

/*** called when user accesses a detail order page from his account page ***/
function sendDLOnOpenOrderDetail(blockId){
	var _dl = getBasicDLObject();
	_dl.page_name = ["account","order-history"];
	var orders = [];
	var order = {};
	order.order_id = $("#"+blockId).find(".order_number_column_1 span")[0].innerText.trim();
	order.order_value = $('#'+order.order_id+'_Order_Total').val();
	order.order_status = $('#'+order.order_id+'_Order_Status').val();
	_dl.site_events = { "reorder_product": true };
    orders.push(order);
    _dl.orders = orders;
	callTrackAnalytics(_dl);
}

/*** Called from the account page when an email subscription preference is changed ***/
function sendDLOnEmailPref(){
	var _dl = getBasicDLObject();
	if($("#receiveEmail_CheckBox:checked").length>0){
		_dl.site_events = {"email_opt_in":true};
		_dl.customer_lead_id = _dl.cust_id;
		_dl.customer_lead_type = "receive_updates";
		_dl.customer_lead_level = "partial:email";
	}else{
		_dl.site_events = {"email_opt_out":true};
	}
	callTrackAnalytics(_dl);
}

/*** The following function is invoked when an exam schedule process is started ***/
function sendDLForExameSchedule(storeId){
	var _dl = getBasicDLObject();
	var stores = []
	if(sessionStorage.getItem("store_list")!== null){
			stores = JSON.parse(sessionStorage.getItem("store_list"));
	}
	for(i = 0; i<stores.length; i++){
		if(stores[i].store_id == storeId){
			_dl.stores = [stores[i]];
			sessionStorage.setItem("stores", JSON.stringify(stores[i]));
		}
	}
	_dl.zip_code = ""; //JSON.parse($.cookie("zip_code"));
	_dl.site_events = {"exam_scheduler_schedule":true};
	callTrackAnalytics(_dl);
}

/*** triggered on exam funnel step 3: review ***/
function getExamsFromCode(){
	var exams = [];
	$(".each-exam").each(function(index) {
		if(index>0){
			var exam = {};
			exam.exam_id = $(this).find("input[name='lockId']")[0].value;
			var dateTime = $(this).find("li.date_time")[0].innerText;
			var dateToFormat = new Date(dateTime.split(" at ")[0]);
		    var formattedDate = ('0' + dateToFormat.getDate()).slice(-2);
		    var formattedMonth = ('0' + (dateToFormat.getMonth() + 1)).slice(-2);
		    var formattedYear = dateToFormat.getFullYear().toString().substr(2,2);
			exam.exam_date = formattedMonth + "" + formattedDate + "" + formattedYear;
			var timeArray = dateTime.split(" at ").pop().split(" ");
            if(timeArray[1]==="PM"){
                var hours = parseInt(timeArray[0].split(":")[0]) + 12;
                exam.exam_time = hours + ":" + timeArray[0].split(":")[1];
            }else{
                exam.exam_time = timeArray[0];
            }
			var today = new Date();
			var formattedCreatedDate = ('0' + today.getDate()).slice(-2);
			exam.date_created = today.getMonth()+1 + "" + formattedCreatedDate +  "" + today.getFullYear().toString().substr(2,2);
			exam.time_created = today.getHours()+ ":"+ today.getMinutes();
			if (sessionStorage.getItem("stores") !== null){
				exam.stores = [JSON.parse(sessionStorage.getItem("stores"))];
			}
			exams.push(exam);
		}
	});
	return exams;
}

function sendDLForExamReview(){
	var _dl = getBasicDLObject();
	_dl.site_events = {"exam_scheduler_review": true};
	_dl.page_name = ['eye-exam', "step3"];
	_dl.exams = getExamsFromCode();
	$.cookie("exams", JSON.stringify(_dl.exams), {path:'/'});
	callTrackAnalytics(_dl);
}

/*** triggered on exam funnel step 4: confirm ***/
function sendDLForExamConfirm(){
	var _dl = getBasicDLObject();
	_dl.site_events = {"exam_scheduler_complete": true};
	_dl.page_name = ["eye_exam", "step4"];
	_dl.exams = [];
	if (JSON.parse($.cookie("exams")) && JSON.parse($.cookie("exams"))!== undefined){
		_dl.exams = [JSON.parse($.cookie("exams"))];
	}
	_dl.customer_lead_type = "exam scheduler";
	_dl.customer_lead_level = "fully qualified";
	_dl.customer_lead_id = _dl.exams[0].exam_id;
	callTrackAnalytics(_dl);
}

/** triggered to show applied filters as always visible **/
function __prjid5_showAppliedFiltersOnFacets(){
	$("#WC_CatalogSearchResultFacet_div_1 .facet-options > li").each(function(){
		var container = (this);
		$(container).append("<ul class='__prjid5_alwaysVisibleFilter' style='display:none'>");
		$(this).find("li a.selected").each(function(index){
			($(container).find(".__prjid5_alwaysVisibleFilter")).append("<li class='filter_"+ index + "'>");
			($(container).find(".__prjid5_alwaysVisibleFilter li.filter_"+ index)).append($(this).clone());
		});
	});
}


/*** triggered when the insurance overlay, on the menu, is opened***/
var __prjid5_shouldSend = true; // used to avoid multiple sends when the overlay is opened
function __prjid5_canSendForInsuranceOpening(){
	__prjid5_shouldSend = true;
}
function sendDLOnInsuranceOverlayOpening(){
	if(__prjid5_shouldSend == true){
		var _dl = getBasicDLObject();
		_dl.site_events = {"insurance_banner": true};
		_dl.page_name = ["eye_exam", "step4"];
		callTrackAnalytics(_dl);
		__prjid5_shouldSend = false;
	}
}


/*** To send _dl when the insurance accordion is clicked ***/
function sendDLOnCheckEligibilityOpening() {
	var _dl = getBasicDLObject();
	_dl.site_events = {"insurance_check_eligibility": true};
	_dl.insurance_navigation = "member lookup overlay";
	callTrackAnalytics(_dl);
};

/*** To send _dl when the edit lens button is clicked ***/
function sendDLOnEditLensButtonClick() {
	var _dl = getBasicDLObject();
	_dl.site_events = {"choose_your_lens": true};
	callTrackAnalytics(_dl);
};


/*** To send _dl when the edit lens button is clicked ***/
function sendDLOnInsuranceToggleClick(){
	var _dl = getBasicDLObject();
	_dl.site_events = {"toggle_insurance_eligibility ": true};
	callTrackAnalytics(_dl);
}

function __prjid5_createDLCookie(insuranceSyncMod){
	$.cookie('insuranceSyncMod', insuranceSyncMod + " information",{ path: '/' });
}

/*** To send _dl when insurance sync fails ***/
function sendDLOnInsuranceSync(data, tentative){
	var _dl = getBasicDLObject();
	if(data == undefined){ // can't communicate with RIA
		_dl.site_events = {"insurance_sync_failure ": true};
		_dl.failure_reason = "Server - Insurance failure - RIA missing response";
	}else{ // json insurance exists, so it's used to populate _dl
		if(data.result == 'ok'){ // communication ok, sync ok
			_dl.site_events = {"insurance_sync_successful ": true};
			_dl.sync_method = "personal information";
			if(data.patientInfo != null && data.patientInfo != 'undefined' ){
				_dl.zip_code = data.patientInfo.zip_code;
				if(data.patientInfo.dateOfBirth != null && data.patientInfo.dateOfBirth != 'undefined')
					_dl.age = new Date().getFullYear() - data.patientInfo.dateOfBirth.split("/").pop();
			}
			if($.cookie('insuranceSyncMod') != 'undefined' && $.cookie('insuranceSyncMod') != null && $.cookie('insuranceSyncMod') != '')
				_dl.sync_method = $.cookie('insuranceSyncMod');
		}else if(data.result == 'ko'){ // communication ok, sync ko: wrong data
			_dl.site_events = {"insurance_sync_failure ": true};
			_dl.failure_reason = "User  - Insurance failure -  wrong data";
			if(tentative !== null)
			_dl.failure_try_count = 5 - (tentative + 1);
		}else{  // sync error
			_dl.site_events = {"insurance_sync_failure ": true};
			_dl.failure_reason = "Frontend  - Insurance failure -  RIA data not readable";
		}
	}
	callTrackAnalytics(_dl);
}

/*** triggered on reorder, from personal account page ***/

function sendDLonReorder(orderId, status, value){
	var _dl = getBasicDLObject();
	_dl.site_events = {"reorder_product": true};
	_dl.page_name = ["account page"];
	_dl.orders = [];
	var order = {};
	order.order_id = orderId;
	order.order_value = parseFloat(Math.round(value * 100) / 100).toFixed(2); ;
	order.order_status = status;
	_dl.orders[0] = order;
	callTrackAnalytics(_dl);

}



/*** triggered when add to cart button is pressed, from personal account page ***/

function sendDLonAddToCart(orderId){

	var _dl = getBasicDLObject();
	_dl.site_events = {"add_to_cart": true, "cart_start": true};
	_dl.page_name = ["account page"];
	_dl.products_added = [];
	if($("#OrderTableDisplayExt_"+orderId+" .reorder_partnumber").length > 0){
		var orderInfos = $("#OrderTableDisplayExt_"+orderId+" .reorder_partnumber").toArray();
		for(i = 0; i< orderInfos.length; i++){
			var prod = {"partNumber": orderInfos[i].innerHTML};
			_dl.products_added.push(prod);
		}

	}
	callTrackAnalytics(_dl);
}

prjid5ShowFavButton = function(catEntryNumber){
	$(".fav_btn_" + catEntryNumber).addClass("__prjid5_showFavIcon")
} 

prjid5HideFavButton = function(catEntryNumber){ 
	$(".fav_btn_" + catEntryNumber).removeClass("__prjid5_showFavIcon");
}

function openDiv(t,d){
	jQuery(t).toggleClass('open');
	jQuery(d).toggleClass('hide');
}

function removeCookieWithName(cookieName){
	document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function createCookieWithExp(name, value, expTime){
	var date = new Date();
	date.setTime(date.getTime() + (expTime * 60 * 1000));
	$.cookie(name, value, { expires: date, path: '/'});
}

$("#header-reset-password-done-modal a").on('click', function(){
	$("#header-set-a-new-password-modal").show();
});


function isValidBirthDate(dateString){
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1918 || year > (new Date()).getFullYear() || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}

function isValidPhoneNumber(phoneNumber){ /*expecting phone numbers in the form (xxx) xxx-xxxx */
	var onlyDigits = phoneNumber.replace(/\D+/g, '');
	//var phoneNumRegEx = /\(\d{3}\)( ){0,1}\d{3}-\d{4}/g;
	var phoneNumRegEx = /^\d{10}$/;
	return result = phoneNumRegEx.test(onlyDigits); 
} 

/* ADA: skip-navigation-button, fix some tags roles */
$(document).ready(function(){
	//$("body").prepend('<a role="region" aria-label="skipper" href="#main_content_wrapper" id="skip">Skip navigation</a>');
	$("dd[role='presentation']").removeAttr("role");
	$("dt[role='presentation']").removeAttr("role");
});

$(window).load(function(){ 
	$("#oo_tab").attr("aria-hidden", "true");
	$("#_hjRemoteVarsFrame").attr("aria-hidden", "true");
	$("#__bkframe").attr("aria-hidden", "true");
	$("#ClickTaleDiv").attr("aria-hidden", "true");
	$("#ads").attr("aria-hidden", "true");  
	$(".tooltip").attr("aria-hidden", "true");  
	$(".bv-verify-css-loaded").attr("aria-hidden", "true");  
	$("#progress_bar_dialog").attr("aria-hidden", "true");  
});

/* ADA: keydown (enter) triggers click on the button */
function triggerCurrentBlockClick(e){ 
	if(e.keyCode === 13){
		$(event.target).click();
	}
}

/* ADA: show/hide fav button based on selected element */
$(window).on('load', function() {
	$(".item").focusin(function(){ 
		$(".item").removeClass("focusedItem");
		$(this).addClass("focusedItem");
	}); 
});


var initializeGoogleElements = function(){
	$(window).load(function(){
		if($("#WC__ShoppingCartAddressEntryForm_billingAddressCreateEditFormDiv_1_address_google_1_1").length>0){
			googlePlaceLoader();
		} 
	});
}

function setupTooltip(spanID, color){
    if(color === 'black'){
        $(spanID).addClass('blk-tooltip');
    }
    else if (color === 'white') {
        $(spanID).addClass('wht-tooltip');
    }
  $(spanID).addClass('visible');
  $(this).mouseout(function () {
      $(spanID).removeClass('visible');
  });
} 

function getInputHiddenValue(inputId) { 
	return $("#"+inputId).length > 0 ? $("#"+inputId).val() : "";
} 

/* CSP compliant, ADA accessibility: keydown (enter) triggers click on the button */
$(document).ready(function(){
	$('.keyboardAccessible').on('keydown', function(e) {
		if(e.keyCode === 13){
			$(this).click();
		}
	});
});

$(document).ready(function () {

	if ($('.shopping-cart-page').length > 0) {

		$('.to_accord_presc_details').click(function (e) {
			e.preventDefault();
			$(this).toggleClass('active');
			$(this).closest('li').find('>ul').toggleClass('open');

		}); 

		$('.to_additional_savings_1').click(function (e) {
			if ($('.to_additional_savings_dropdown_1').hasClass('to-hide')) {
				$('.to_additional_savings_dropdown_1').removeClass('to-hide');
				$(this).children().children().attr('src', '/images/arrow-up.png');
			} else {
				$('.to_additional_savings_dropdown_1').addClass('to-hide');
				$(this).children().children().attr('src', '/images/arrow-down.png');
			}
		});

		$('#regular-1').add('#regular-2').change(function (e) {
			$('.to_regular_1').add('.to_regular_2').toggleClass('to-title-price-evidence to-title-price');
		});

		$('#contact-regular-1').add('#contact-regular-2').change(function (e) {
			$('.to_contact_regular_1').add('.to_contact_regular_2').toggleClass('to-title-price-evidence to-title-price');
		});

	} else if ($('.to-pdp-container-right').length > 0) {


//		$('.to-pdp-container-right').stick_in_parent({
//			'parent': '.to-pdp-container-right-wrapper'
//		});

		$('.to-accordion-prescription').click(function (e) {
			if ($(this).attr('id') === 'single-lens-button') {
				$("#single-lens-button").attr("aria-checked", true);
				$('#panel2').addClass('active'); 
				$("#choice1-single-lens-button").attr("aria-checked", false);
				$('#panel1').removeClass('active'); 
				$("#progressive-lens-button").attr("aria-checked", false);
				//$("#select-lens-alert").show();
			} else{
				$("#single-lens-button").attr("aria-checked", false);
				$('#panel2').removeClass('active'); 
				if($(this).attr('id') === 'progressive-lens-button') {
					$("#progressive-lens-button").attr("aria-checked", true);
					$('#panel3').addClass('active'); 
					$("#choice1-single-lens-button").attr("aria-checked", false);
					$('#panel1').removeClass('active'); 
					//$("#select-lens-alert").show();
				}else{
					if($('#choice1-single-lens-button').hasClass("__prjid5_InsSunglNoPresc")) {
						$("#choice1-single-lens-button").attr("aria-checked", true);        			
						$('#panel1').addClass('active');
						//$('#select-lens-alert').hide();
					}
					$("#progressive-lens-button").attr("aria-checked", false);
					$('#panel3').removeClass('active');  
				}
			}
			
		});

		$('.to_additional_savings_1').click(function (e) {
			if ($('.to_additional_savings_dropdown_1').hasClass('to-hide')) {
				$('.to_additional_savings_dropdown_1').removeClass('to-hide');
				$(this).children().children().attr('src', '/images/arrow-up.png');
			} else {
				$('.to_additional_savings_dropdown_1').addClass('to-hide');
				$(this).children().children().attr('src', '/images/arrow-down.png');
			}
		});

	}
});

var CLMenuPanelManager = {
	brand: '',
	sortedLenses : [],
	CONTACTS_TO_BE_LOADED : 8,  
	
	loadContacts: function(brand){ 
		var numLoadedContacts = 0; 
		this.sortedLenses = [];
		if(typeof brand !== 'undefined' && brand !== null && brand !== ''){ 
			brand = brand.toLowerCase();
			if(window.CONTACTS_MAP != undefined){
				for (var product in CONTACTS_MAP) {  
					if(numLoadedContacts < this.CONTACTS_TO_BE_LOADED){
						if(typeof CONTACTS_MAP[product].name !== 'undefined'){
							var cuncatText = CONTACTS_MAP[product].brand; 
							cuncatText = cuncatText.toLowerCase(); // text containing name and manufacturer
							var toBeShown = true;
							for(var termsIndex = 0; termsIndex < brand.length && toBeShown; termsIndex++){ 
								if(cuncatText.indexOf(brand[termsIndex])<0){
									toBeShown = false;
								}
							}
							if(toBeShown){ 
								numLoadedContacts++;
								this.sortedLenses.push(product);
							} 
						}  
					}
				}
				this.populateMenu(brand);
			}
		}
	},  
	
	populateMenu: function(brand){
		var pagePosition = $("#ContactsNav_RightBlock"); 
		pagePosition.empty();
		var pageElem = $(".ContactsNav_RightBlockTemplate");
		var viewAllBtnTemplate = $(".ContactsNav_ViewAllTemplate");
		for (var index=0; index<this.sortedLenses.length; index++){ 
	    	var currentElem = pageElem.clone().appendTo(pagePosition); 
	    	var prodUPC = this.sortedLenses[index];   
	    	currentElem.removeAttr("aria-hidden");
	    	currentElem.attr('id', "ContactsNav_RB_" + prodUPC  );
			currentElem.find(".contactsNav_Right_Link").attr("href", "/to-us/" + CONTACTS_MAP[prodUPC].url);
			currentElem.find(".contactsNav_Right_Link").attr("data-element-id", "D_X_MainNav_ContactL-" + CONTACTS_MAP[prodUPC].name.toLowerCase().replaceAll(" ", ""));
			currentElem.find(".contactsNav_Right_Name").text(CONTACTS_MAP[prodUPC].name);
			currentElem.find(".contactsNav_Right_Price").text("$" + DISCOUNTS_MAP[prodUPC].r);
			currentElem.find(".contactsNav_Right_Img").attr("src", "https://assets.targetoptical.com/extra/image/TargetOptical/contacts/" + prodUPC.toUpperCase() + "_fr.png?imwidth=70");
			currentElem.find(".contactsNav_Right_Img").attr("alt", ""); 
			$(".contactsNav_Right_Brand").text(CONTACTS_MAP[prodUPC].brand);
			$("#reorderPanel").addClass("d-none");
			currentElem.removeClass("d-none").removeClass("ContactsNav_RightBlockTemplate").addClass("d-flex");
		} 
		var viewAllBtn = viewAllBtnTemplate.clone().appendTo(pagePosition); 
		viewAllBtn.removeClass("d-none").removeClass("ContactsNav_ViewAllTemplate").addClass("d-flex"); 
		brand = brand.trim().replaceAll(" ", "-");
		$(viewAllBtn).find("a").attr("href", $(viewAllBtn).find("a").attr("href").concat("/"+brand));
		this.showContactsPanel(); 
	},
	
	initListeners: function(){
		$(".menu_CLBrand_select").on('click', function(){ 
			$(".menu_CLBrand_select.active").removeClass("active");
			$(this).addClass("active"); 
			var currentCLElement = this;
			$.each($(this).parents(), function(index, parent) {
				if (this.className.indexOf('main-nav-mobile__panel') > -1) {
					window.location.href = currentCLElement.href;
				} else if (this.className.indexOf('main-nav-desktop__panel') > -1) {
					CLMenuPanelManager.loadContacts($(currentCLElement).attr("data-selected-brand"));
					return false;
				}
			});
			return false;
		});
		var defaultSelection = $($(".menu_CLBrand_select")[0]);
		defaultSelection.addClass("active"); 
		CLMenuPanelManager.loadContacts(defaultSelection.attr("data-selected-brand"));
		$("#showReorderPanel").on("click", CLMenuPanelManager.showReorderPanel);
	},
	

	showReorderPanel: function(){ 
		
		$("#contactsListPanel").addClass("d-none");
		$("#reorderPanel").removeClass("d-none");
		$(".menu_CLBrand_select.active").removeClass("active");
		ocr.init();

	},
	
	showContactsPanel: function(){
		$("#contactsListPanel").removeClass("d-none");
		$("#reorderPanel").addClass("d-none");
	} 
}

$(window).load(function(){ CLMenuPanelManager.initListeners(); });

function TealiumConsentPrivacyLink(){
	window.location.href = "/to-us/privacy-policy";
}
/*** ADA: make swiper buttons focusable only when navigated through keyboard ***/
$(window).on('load', function () {
	$(".swiper-button").on('click', function(){
		$(this).addClass("do-not-focus");
	});
	
	$(".swiper-button").on('focusout', function(){
		$(this).removeClass("do-not-focus");
	});
	
	$(".insurance-closing").click(function() {
		if(window.location.href.indexOf('AjaxOrderItemDisplayView') > -1 || window.location.href.indexOf('CartView') >-1){
			window.globalMethods.onInsuranceClosing('reset');
		}
	});
});



