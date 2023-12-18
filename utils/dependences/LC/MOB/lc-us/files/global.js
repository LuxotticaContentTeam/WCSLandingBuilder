/**
 * Add toTitleCase to String's prototype
 */

CommonFunctions.removeEmptyUtagEntries = function(utagObj){
    
    $.each(utagObj, function(key, val) {
          if (val == undefined) return; 
          
          if(val=="" || val==null){
                delete utagObj[key]             
          }
          if(typeof val == "string"){
	          val = val.replace(/\\/g, "\\\\");
	          val = val.replace(/'/g, "\\'");
	          val = val.replace(/"/g, "\\\"");
	          document.title = document.title.split(String.fromCharCode(8217)).join('');	// remove non-ascii apostrophe
          
          }else{
        	  if(utagObj.length <= 0){
        		  delete utagObj[key];
        	  }
          }
          utagObj[key]=val;
          
      });
}

$.validator.addMethod("atLeastOneLetter", function(value, element){
	var regex = /^(?=.*[A-Za-z])[A-Za-z\d$@$!%*?&()^#-_~]{6,}$/;
	return regex.test(value);
	
});

$.validator.addMethod("atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial", function(value, element){
	var regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])(.*)$/;
	return regex.test(value);
});

function incrementShopCartCounter(num){
	try{
		if(num === undefined) num = 1;
		$('#tah-quantity-header').html(parseInt($('#tah-quantity-header').html()) + num);
		$('#tah-quantity-header').show();
	}
	catch(e){
	}
}

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
	
	$(phone1Field, phone2Field, phone3Field).bind('keydown', numbersOnly);
}



var zipRegex;

function setupValidation(){
	if(typeof($) === 'undefined' || typeof($.validator) === 'undefined') return false;
	$.validator.addMethod("regex", function(value, element, regexpr) {          
	    return regexpr.test(value);
	}, "Please enter a valid pasword.");
	
	$.validator.addMethod("validEmail", function(value, element){
	    if(value == '') 
	        return true;
	    var temp1;
	    temp1 = true;
	    var ind = value.indexOf('@');
	    var str2=value.substr(ind+1);
	    var str3=str2.substr(0,str2.indexOf('.'));
	    if(str3.lastIndexOf('-')==(str3.length-1)||(str3.indexOf('-')!=str3.lastIndexOf('-')))
	        return false;
	    var str1=value.substr(0,ind);
	    if((str1.lastIndexOf('_')==(str1.length-1))||(str1.lastIndexOf('.')==(str1.length-1))||(str1.lastIndexOf('-')==(str1.length-1)))
	        return false;
	    str = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    temp1 = str.test(value);
	    return temp1;
	}, MessageHelper.messages["ERROR_EmailEmpty"]);
	
	$.validator.addMethod("postalFormatCheck", function(value, element){
		var regexObj = {canada : /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i ,usa : /^\d{5}(-\d{4})?$/};
		if($('#storeCountryName').val()!="" && $('#storeCountryName').val()=="US"){
			var regexp = new RegExp(regexObj.usa);
			return  regexp.test(value);
		}
		else{
			regexp = null;
			var regexp = new RegExp(regexObj.canada);
			return regexp.test(value)
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
	
	$.validator.addMethod("zipCode", function(value, element) 
			{
				var valid = false;
				var userInput  = value;
				
				// If countryRegex is undefined
				// Check against both US/Canadian postal codes
				// Otherwise, check against the specific country type
				if (zipRegex == undefined)
				{
					var zipCodeRegex = /^\d{5}(-\d{4})?$/;
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
		var currentYear = (new Date).getFullYear();
		var currentMonth = (new Date).getMonth() + 1;
		var currentDay = (new Date).getDate();
		if(dtYear>=currentYear){
			if(dtMonth>=currentMonth){
				if(dtDay>currentDay){
					return false;
				}
			}
		}
		return true;
	}
	
	$.validator.addMethod('contactQuantity', function(value, element, params) {
	      var left = parseInt($(params.left).val(), 10);
	      var right = parseInt($(params.right).val(), 10);
	      return ((left+right) > 0);
	});
	
	$.validator.addMethod('age', function(value, element) {
		var form = $(element).parents('form');
		var day = form.find('.validate-day').val();
		var month = form.find('.validate-month').val();
		var year = form.find('.validate-year').val();
		
		var dateIsSet = year != 0 || day != 0 || month != 0;
		return !dateIsSet || MyAccountDisplayExtJS.validateAge(new Date(year, month-1, day));
	}, '* invalid');
	
	
	jQuery.validator.addMethod("zip", function(value, element) {
		var trimmedValue = $.trim(value); 
		
	    return trimmedValue.match(constants.regex.zip.usa) || trimmedValue.match(constants.regex.zip.canada);
	    
	}, MessageHelper.messages["ERROR_ZipCodeEmpty"]);
	
	$.validator.addMethod("dotPos_formatCheck", function(value) {	
		var emailLength=value.length;
		var lastDotPos= value.lastIndexOf(".");
		if(emailLength-(lastDotPos+1)>=2){
			return true;
		}
		else{
			return false;
		}
		
	}, MessageHelper.messages["ERROR_EmailEmpty"]);
	
	$.validator.addMethod("specialCharacters", function(value) {
		var userInput  = value;
		var valid = false;
		
		if (userInput.indexOf ('!') == -1 && userInput.indexOf ('#') == -1)
			valid = true;
		
		return valid;
	}, '* invalid');
	

	$.validator.addMethod("atLeastOneLetterAndOneDigit", function(value, element){
		var regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(.*)$/;
		return regex.test(value);
	});

	if($('#storeCountryName').val()!="" && $('#storeCountryName').val()=="US")
		$.validator.messages.postalFormatCheck = 'Please enter a valid zip code'
	else
		$.validator.messages.postalFormatCheck = 'Please enter a valid postal code'

			$('#emailSignup').validate ({
				onfocusout: false,
				onkeyup: false,
				onclick: false,
				errorClass: 'required',
				errorElement: 'span',
				rules:
				{
					check18Years: {required:true},
					email: {required:true, email:true}
				},
				messages: 
				{
					check18Years: MessageHelper.messages["ERROR_CERT_18"],
					email: MessageHelper.messages["ERROR_EMAIL_EMPTY_FOOTER"]
				},
				errorPlacement:function(error, element) {
					if (element.attr("name") == "check18Years" && $('.footer-email #check18Years-error').length == 0){
						//$(error).insertAfter($('.signup-text'));
						$('#errorMessage18Years').append(error).removeClass('hide');
						$("#errorMessage18Years").css({"display" : "block"});
					}
					if (element.attr("name") == "email"  && $('.footer-email #Footer_Email_Input-error').length == 0){
						//$(error).insertAfter($('.signup-text'));
						//$(error).appemdTo($('#errorMessageEmail'));
						$('#errorMessageEmail').append(error).removeClass('hide');
						$("#errorMessageEmail").css({"display" : "block"});
						//$("#errorMessageEmail").removeClass('hide');
					}
				}
			});
	
	$('#LogonDialogForm').validate({
		onfocusout: false,
		onkeyup: false,
		onclick: false,
		errorClass: 'required',
		errorElement: 'span',
		rules: {
			logonId: { required:true, email:true, validEmail:true },
			logonPassword: { required:true, minlength:6, maxlength:32 }
		},
		messages:  {
			logonId:MessageHelper.messages["ERROR_Logon_modal_EmailInvalid"],
			logonPassword:MessageHelper.messages["ERROR_Logon_modal_PasswordEmpty"],
		},
		submitHandler: function(logonForm) {
			var f = $(logonForm);
			
			if (f.valid()) {
				var data = f.serializeArray(),
					newData = [];


				// since this is a jsonp request, we always set the destination URL to a jsonp-compatible page
				for (var i = 0; i < data.length; i++) {
					var d = data[i];
					if (d['name'] == 'URL') {
						var originalURL = d['value'];

						newData.push({
							name: 'URL',
							value: 'LogonAjaxView'
						});
					}
					if (d['name'] == 'myPerksRedirectURL') {
					 var myperksURL = d['value'];

						newData.push({
							name: 'URL',
							value: 'LogonAjaxView'
						});
					} else {
						newData.push(d);
					}
				}
			}
			
			if (newData != null) {
				$.ajax({
					url: getAbsoluteURL(true) + 'LogonAjax',
					data: newData,
					type: 'POST',
					dataType: 'json',
					success: function (data) {
						if(data == null || (data.passwordExpired && data.passwordExpired == '1')) {
							$('.header-sign-in-modal').css('display', 'none').attr('aria-hidden', 'true');
							$('.header-set-a-new-password-modal').attr('aria-hidden', 'true').css("display", "block");
							$('#myaccount-rectangle').removeClass('hide');
							$('#myaccount-rectangle > .backdrop').removeClass('hide');
							obj = {
	                			id: 'Error',
	                			Error_Source: "User",
	                			Error_Code: "Login",
	                			Error_Message: 'Your password has expired'
	                		}
	                		tealium_data2track.push(obj);
						} else if (data.success) {
							console.log('insert eaactivity cookie from logonFormSubmit');
							document.cookie = "eaactivity=true; max-age=2592000; path=/";
							
							utagData = {
								"site_events": {
									"authentication_complete": true,
								},
								"authentication_status": "authenticated",
								"registration_status": "registered"
							};
							//Analytics Framework
							try {
								var obj = {
									id: 'WCS-D-Login' // utag_data properties
								};

							} catch (err) {
								obj = {
	                    			id: 'Error',
	                    			Error_Source: "User",
	                    			Error_Code: "Login",
	                    			Error_Message: 'Wrong Email, Wrong Password',
	                    		}
	                    		tealium_data2track.push(obj);
							} finally {
								obj.id = 'WCS-D-Login';
								tealium_data2track.push(obj);
							}
							//END Analytics Framework
							callTrackAnalytics(utagData);

							var nextUrl = originalURL;
							var myPerksRedirectUrl = myperksURL;

							if (nextUrl.length && nextUrl.charAt(nextUrl.length - 1) == '#') {
								nextUrl = nextUrl.substring(0, x.length - 1);
							}

							if (myPerksRedirectUrl.length && myPerksRedirectUrl.charAt(myPerksRedirectUrl.length - 1) == '#') {
								myPerksRedirectUrl = myPerksRedirectUrl.substring(0, myPerksRedirectUrl.length - 1);
							}

							if (data.redirectToMyPerks == 'true') {
								window.location = myPerksRedirectUrl;
							} else {
								window.location = nextUrl;
							}
						}
						else {
							var errMsg = data.errorMessage;
							if (errMsg == 'EXIST_IN_US') {
								$('.LogOnFailureResponseMessageDiv').html(MessageHelper.messages["ERR_MSG_DID_YOU_MEAN"]);
								//	$('.LogOnFailureResponseMessageDiv').append("<a href=''>www.lenscrafters.com</a>?").show();
								$('.LogOnFailureResponseMessageDiv').append("<a target='_blank' href='" + MessageHelper.messages["RediectHomePageURL"] + "'>" + MessageHelper.messages["LenscrafterUS"] + "</a>?").show();
							}
							else if (errMsg == 'EXIST_IN_CA') {
								$('.LogOnFailureResponseMessageDiv').html(MessageHelper.messages["ERR_MSG_DID_YOU_MEAN"]);
								//	$('.LogOnFailureResponseMessageDiv').append("<a href=''>www.lenscrafters.ca</a>?").show();
								$('.LogOnFailureResponseMessageDiv').append("<a target='_blank' href='" + MessageHelper.messages["RediectHomePageURL"] + "'>" + MessageHelper.messages["LenscrafterCA"] + "</a>?").show();
							} else if (errMsg.includes('PSW_RST')) {
								//open modal update password (reset)
								var fromResetPassword=showLogonModal();
								if(!fromResetPassword){//not from reset password procedure
									$('.header-update-reset-password-modal').css('display', 'block');
								}
								if($(".thank-you-page-overlay")){
									$(".thank-you-page-overlay").removeClass('hidden');
								}
								$('#myaccount-rectangle > .backdrop').removeClass('hide');
								$('.header-sign-in-modal').css('display', 'none');
								$('#myaccount-rectangle').removeClass("hide");
								$("#passwordUpdateEmailInput").val(errMsg.split('PSW_RST:')[1]);
								return false;
							} else {
								$('.LogOnFailureResponseMessageDiv').html(data.errorMessage).show();
							}
							obj = {
                    			id: 'Error',
                    			Error_Source: "User",
                    			Error_Code: "Form Filling Error - Login",
                    			Error_Details: data.errorMessage,
                    			Error_Message: data.errorMessage,
                    		}
                    		tealium_data2track.push(obj);
						}
					},
					error: function (jqXHR, textStatus, errorThrown) { //unexpected error case - system error
						$('.LogOnFailureResponseMessageDiv').html('Login request failed - please try again later.').show();
						obj = {
	            			id: 'Error',
	            			Error_Source: "Server",
	            			Error_Code: "Login",
	            			Error_Message: 'Error with server on login',
	            		}
	            		tealium_data2track.push(obj);
					}
				});
			}
        	
        	
        }
	});
	
	$('.userRegModelForm').validate({
		onkeyup: false,
		onclick: false,
		errorClass: 'required',
		errorElement: 'span',
		rules: {
			logonId: { required:true, email:true, validEmail:true },
			logonIdVerify: { required:true, email:true, validEmail:true, equalTo: '#logonId_regModelField' },
			logonPassword: { required:true, maxlength:32, minlength:8, atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: true },
			logonPasswordVerify: { required:true, equalTo: '#logonPassword_regModelField', maxlength:32, atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: true },
			optin_18yrs: { required:true }
		},
		messages:  {
			logonId: MessageHelper.messages["ERROR_Logon_modal_EmailInvalid"],
			logonIdVerify: { required:MessageHelper.messages["ERROR_Logon_modal_EmailInvalid"], email:MessageHelper.messages["ERROR_Logon_modal_EmailInvalid"], equalTo:MessageHelper.messages["ERROR_Logon_modal_EmailMatch"], validEmail:MessageHelper.messages["ERROR_Logon_modal_EmailInvalid"]  },
			logonPassword: { required:MessageHelper.messages["ERROR_Logon_modal_PasswordEmpty"], minlength:MessageHelper.messages["ERROR_Logon_PasswordFormat_Update"], atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial:MessageHelper.messages["ERROR_Logon_PasswordFormat_Update"]},
			logonPasswordVerify: { required:MessageHelper.messages["ERROR_Logon_modal_PasswordEmpty"], maxlength:MessageHelper.messages["ERROR_Logon_modal_PasswordEmpty"], equalTo:MessageHelper.messages["ERROR_Logon_modal_PasswordMatch"], atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial:MessageHelper.messages["ERROR_Logon_PasswordFormat_Update"] }
		},
		errorPlacement:function(error, element) {
			console.log($(element).attr('name'))
			if (element.attr("name") == "optin_18yrs"){
				error.insertAfter($(element).next());
			}
			else{
				error.insertAfter(element);
			}
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
			logonPasswordOld : {required:true,minlength:6,maxlength:32},
			logonPassword :{required:true,minlength:6,maxlength:32,notEqualTo:'input[name=logonPasswordOld]'},
			logonPasswordVerify : {required:true,minlength:6,maxlength:32,equalTo:'#logonPassword_updateModal',notEqualTo:'input[name=logonPasswordOld]'}
		},
		messages: {
			logonPasswordOld :{required:MessageHelper.messages["OLD_PASSWORD_EMPTY_ERROR"],
								minlength: MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
								maxlength: MessageHelper.messages["PASSWORD_UPDATE_CONFIRM_ERROR"]},
			logonPassword :{required:MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
							minlength: MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
							maxlength: MessageHelper.messages["PASSWORD_UPDATE_CONFIRM_ERROR"],
							notEqualTo:MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"]},
			logonPasswordVerify: {required:MessageHelper.messages["ERROR_PASSWORD_VALID"],
								  minlength:MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
								  maxlength:MessageHelper.messages["PASSWORD_UPDATE_CONFIRM_ERROR"],
								  equalTo:MessageHelper.messages["PASSWORD_UPDATE_MISMATCH"],
								  notEqualTo:MessageHelper.messages["PASSWORD_UPDATE_MISMATCH"]}
		},
		submitHandler: function(form) {
			$('.success').hide();
			$('.PasswordUpdateFailureResponseMessageDiv').html('');
			
			$.ajax({
				url: getAbsoluteURL(true) + 'AjaxResetPassword',
				data: $(form).serializeArray(),
				type: 'POST',
				dataType: 'json',
				success: function(data) {
					if(data.success) {
						if($('#PasswordUpdateSubmitForm').parents('.header-set-a-new-password-modal').length){//Password reset modal, redirect to my account
							window.location = $('#WC_PasswordResetForm_FormInput_Forward_In_ResetPasswordForm_1').val();
						}else{//My account page, display success message
							$('#PasswordUpdateSubmitForm .fe.buttons').before('<div class="success">Your changes have been updated successfully.</div>')
						}
					}else{
						$('.PasswordUpdateFailureResponseMessageDiv').html(data.errorMessage);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) { //unexpected error case - system error
					$('.PasswordUpdateFailureResponseMessageDiv').html('Reset password update failed - please try again later.');
				}
			});
		}
	});
	
	$.validator.addMethod("cvv", function(cvv){
        var myRe = /^[0-9]{3,4}$/;
        var myArray = myRe.exec(cvv);
        if(cvv != myArray)
         {
           //invalid cvv number
           return false;
        }else{
            return true;  //valid cvv number
           }

    }, "Invalid CVV value");
	
}

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

function checkPswTotal(name) {
	var val = document.getElementById(name).value;
	
	if (val == '') {
		//Please enter a password
	} else {
		if (val.length < 8  || !hasUpperCase(val) || !hasLowerCase(val) || !hasNumber(val) || !hasSpecialChar(val)) {
			//Password does not meet minimum requirements.
		}
	}
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
        return this.optional(element) || /^[a-zA-Z\s-]+$/i.test(value); 
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
				var zipCodeRegex = /^\d{5}(-\d{4})?$/;
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
	
	$.validator.addMethod("check_date_of_birth", function(value, element) {

        var day = $("#dobDay_1").val();
        var month = $("#dobMonth_1").val();
        var year = $("#dobYear_1").val();
        var age = 18;

        var mydate = new Date();
        mydate.setFullYear(year, month - 1, day-1);

        var currdate = new Date();
        currdate.setFullYear(currdate.getFullYear() - age);

        return currdate > mydate;

    }, "You must be 18 years old to view eye exam information");
    $.validator.addMethod("check_date_of_birth_future", function(value, element) {

        var day = $("#dobDay_1").val();
        var month = $("#dobMonth_1").val();
        var year = $("#dobYear_1").val();

        var mydate = new Date();
        mydate.setFullYear(year, month - 1, day-1);

        var currdate = new Date();

        return currdate > mydate;

    }, "The provided birthday is invalid");
	
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


   function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    url = url.toLowerCase(); // This is just to avoid case sensitiveness  
    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
   }
   var resetPasswordemail = getParameterByName('resetPassword');
   var catalogId = getParameterByName('catalogId');
   var langId = getParameterByName('langId');
   var storeId = getParameterByName('storeId');
   var cid = getParameterByName('cid');
   var smtrctid = getParameterByName('smtrctid');
   var emailId = getParameterByName('emailId');
  
   if(resetPasswordemail !== undefined && resetPasswordemail == 'true'){	
		window.location.href="ChangePassword?catalogId="+catalogId+"&langId="+langId+"&storeId="+storeId+"&cid="+cid+"&smtrctid="+smtrctid+"&emailId="+emailId;
	} 
String.prototype.toTitleCase = function () {
	var replaced = this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    // The following is a fix to restore HTML Entities to lowercase.
	// This can be included in the above regex in the future.
	return replaced.replace(/&[A-Z]+/g, function(txt){return '&' + txt.charAt(1).toLowerCase()});
};

//If the ECMAScript 6 function String.includes() is not defined, include a polyfill
if (!('includes' in String.prototype)) {
String.prototype.includes = function(str, startIndex) {
 return ''.indexOf.call(this, str, startIndex) !== -1;
};
}


function calculateSummarySubtotal() {
	var subtotal = 0;
	$('.content-block').find('.price:visible').not('.listPrice').each(function() {
		subtotal += parseFloat($.trim($(this).html()).substring(1));
	});
	$('.price-subtotal').html('$' + subtotal.toFixed(2));
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

function populateTrialPack(divClass, data) {
	$(divClass).find('.pack-name').html(data.name);
	$(divClass).find('.pack-short-description').html(data.shortDescription);
	$(divClass).find('.pack-link').attr('href', data.url);
}

function addOnsClick(checkbox) {
	if(checkbox.is(':checked')) {
		var step2Row = checkbox.parents('.step1');
		
		var lensName = step2Row.find('label').html();
		var lensPrice = step2Row.find('.offerprice').html();
		if(!lensPrice) {
			lensPrice = step2Row.find('span.price').html();
		}
		
		var newRow = $('#addon-row-template').clone();
		newRow.find('.name').html(lensName);
		newRow.find('.price').html(lensPrice);
		newRow.attr('id', 'addon-row-' + checkbox.val());
		$('.lens-row:last').after(newRow.show());
	}
	else {
		$('#addon-row-' + checkbox.val()).remove();
	}
	
	calculateSummarySubtotal();
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


function calculateSummarySubtotal() {
	var subtotal = 0;
	$('.content-block').find('.price:visible').not('.listPrice').each(function() {
		subtotal += parseFloat($.trim($(this).html()).substring(1));
	});
	$('.price-subtotal').html('$' + subtotal.toFixed(2));
}


function hideShowAddonsDiv(){
	 var displayParent = false;
	    $(".add-ons .lens-container .check-row ").each(function()
			 { 
			  	if( $(this).css("display") != "none"){
				 	 displayParent = true; 
		  			}
			 }		 		
	    );
	    if(displayParent){
			$(".add-ons").show();
	    }else{
	    	$(".add-ons").hide();
	    }
}

function antiReflectiveSelect(onLoad) {
	return undefined;
}

function savePlacement(){
	currentTopPosition = $(window).scrollTop();
}

function getPlacement(){
	return currentTopPosition;
}

$(function(){
	/*
	 * add new custom show and hide methods for adding and removing custom class "hide"
	 * */

	$.fn.customShow = function() {
		return this.removeClass('hide').show();
	}
	$.fn.customHide = function() {
		return this.addClass('hide').hide();
	}
	$.fn.customToggle = function() {
		return this.toggle().toggleClass('hide');
	}
});


function eyeExamRemoveEyeExamAnalytics(){
	var country="us";
	var userAuthenticated = "not authenticated";
	var userRegistration ="not registered";
	if( document.getElementById("countryName") != null &&  document.getElementById("countryName").value == 'CA'){
		country="ca";
	}
	if( document.getElementById("userAuthenticated") != null &&  document.getElementById("userAuthenticated").value == 'R'){
		userAuthenticated ="authenticated";
		userRegistration ="registered";
	}
	data =  { "site_events": { 
		"remove_eye_exam": true
			},
		 "site_layout_type":"mobile",
		 "country" : country,
		 "authentication_status" : userAuthenticated,
		 "registration_status" :userRegistration
		};
	callTrackAnalytics(data);
}

function eyeExamEditEyeExamAnalytics(){
	var country="us";
	var userAuthenticated = "not authenticated";
	var userRegistration ="not registered";
	if( document.getElementById("countryName") != null &&  document.getElementById("countryName").value == 'CA'){
		country="ca";
	}
	if( document.getElementById("userAuthenticated") != null &&  document.getElementById("userAuthenticated").value == 'R'){
		userAuthenticated ="authenticated";
		userRegistration ="registered";
	}
	data =  { "site_events": { 
		"edit_eye_exam": true
			},
		 "site_layout_type":"mobile",
		 "country" : country,
		 "authentication_status" : userAuthenticated,
		 "registration_status" :userRegistration
	
		};
	callTrackAnalytics(data);
}

CommonFunctions.getUserInsuranceEligibilityStatus = function(){
	var userInsuranceEligibilityStatus = 'not synced';
	if (constants.ajaxParams['insuranceCheckEligibility']){
		userInsuranceEligibilityStatus = "synced";
	}
	return userInsuranceEligibilityStatus;
}

$(document.body).on('click', '.scheduleBack' ,function(e){
	/* UTAG-start*/
	var country="us";
	var userAuthenticated = "not authenticated";
	var userRegistration ="not registered";
	if( document.getElementById("countryName") != null &&  document.getElementById("countryName").value == 'CA'){
		country="ca";
	}
	if( document.getElementById("userAuthenticated") != null &&  document.getElementById("userAuthenticated").value == 'R'){
		userAuthenticated ="authenticated";
		userRegistration ="registered";
	}
	data =  { "site_events": { 
		"change_exam_location": true
			},
		 "site_layout_type":"mobile",
		 "country" : country,
		 "authentication_status" : userAuthenticated,
		 "registration_status" :userRegistration
		};
	callTrackAnalytics(data);
});

$(document.body).on('click', '.eyeExamEditExam' ,function(e){
	e.preventDefault();
	eyeExamEditEyeExamAnalytics();
	location.href=$(this).attr('href');
});

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


function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function isCorrectDate(month, day, year){
	try{
		var date = month + '/' + day + '/' + year;
		$.datepicker.parseDate('mm/dd/yy', date);
		valid = true;
	}catch(exc){
		utag_data.form_field = "invalid date";
		valid = false;
	}
	return valid;
}

function read_cookie(key)
{
    var result;
    return (result = new RegExp('(?:^|; )' + key + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
}

function create_cookie(name,value){
	document.cookie = name + "=" + value + "; path=/";
}

function setFiltersBack()
{
	create_cookie('BackURL', document.URL);
	create_cookie('BackupFacets', read_cookie('facets'));
}

function getBackFiltersAction(){
	create_cookie('facets', read_cookie('BackupFacets'));
	window.location = read_cookie('BackURL');
}

function validateAge(dobForm,month, day, year){
	var overEightteen = false;
	var yearDifference = year - dobForm.birth_year.value;
	if(yearDifference > 18){
		overEightteen = true;
	}else if (yearDifference == 18){ 
		if(dobForm.birth_month.value < month){
			overEightteen = true;
		}else if(dobForm.birth_month.value == month){
			if(dobForm.birth_date.value <= day){
				overEightteen = true;
			}
		}
	}
	if (!validateAge)
	{
		error_list.push("not 18");
	}
	return overEightteen;
}

function goToDesktop(){
	setCookie("WC_MOBILEDEVICEID", "0", null);
	location.reload(true);
	return false;
}

function setupEvents(){
	$('div[id^="un_exp_block_menu_m2"]').click(function() {
		var $this = $(this);
		
		if($('div[id^="un_exp_block_menu_m2"]').next().is(':visible')){
			$('div[id^="un_exp_block_menu_m2"]').next().slideUp();
			$('div[id^="un_exp_block_menu_m2"]').find('.exp_mm_o_inner').removeClass('exp_mm_o_inner').addClass('exp_mm_l_inner');
		}
		
	    if($this.next().is(':hidden')){
	    	$this.next().slideDown();
	    	$this.find('.exp_mm_l_inner').removeClass('exp_mm_l_inner').addClass('exp_mm_o_inner');
	    }
	});
}


function setupCountrySelector(){
	// handle the expanding/collapsing of the country selector
	$('#countrySelector').on('click', function(e){
		var $this = $(this);
		var children = $this.children('li');
		$this.toggleClass('selected');
		if($this.hasClass('selected')) $('html, body').animate({scrollTop: $this.offset().top}, "fast");
		
		// if it is not expanded, expand it
		if (children.eq(0).hasClass('selected')){
			children.eq(0).customHide().removeClass('selected');
			children.eq(1).customShow().addClass('selected');
			
			// return false in order to not navigate from the current page   
			return false;
		}else{
			children.eq(1).customHide().removeClass('selected');
			children.eq(0).customShow().addClass('selected');
			
			// don't return anything, so that the clicked child's event will fire
		}
	});
	
	// handle the switching of the countries
	$('#countrySelector > li li').click(function(e){
		e.preventDefault();
		
		var $this = $(this);
		if ($this.hasClass('current')){
			// do nothing -- the country is already selected
		}else{
			var nextUrl = $this.find('a').attr('href');
			document.location = nextUrl;
		}
	});
	
	
}

function socialShareUlink(social_url){
	utagLinkSafe({
		link_name : ["social_share"],
		site_events : ["social_share"],
		exit_url : social_url
	});
}
function callCustomerCareUlink(){
	utagLinkSafe({
		link_name : ["call_customer_care"],
		site_events : ["call_customer_care"]
	});
}





/** Password reset **/

function resetPassword(){
	var resetForm= document.ResetPasswordForm;
	var params = {};
	params.challengeAnswer = resetForm.challengeAnswer.value
	params.state = resetForm.state.value
	params.URL = resetForm.URL.value
	params.errorViewName = resetForm.errorViewName.value
	params.logonId =resetForm.logonId.value 
	params.email1 = resetForm.logonId.value
	params.emailType = "forgotpassword";
	params.senderEmail = resetForm.logonId.value;
	params.senderName = resetForm.logonId.value;
	params.email1 = resetForm.logonId.value
	params.receiveEmail = "true";
	params.recipientEmail = resetForm.logonId.value;
	params.receiveEmail = "true";
	params.fromName = resetForm.logonId.value;
	params.pdp_18yrs = "true";
	params.storeId = resetForm.storeId.value;
	invokeResetPasswordService(params);
}

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
				if (typeof serviceResponse == 'string'){
					serviceResponse = filterAjaxResponse(response);
				}
				
				if((serviceResponse.errorMessage!=null && !serviceResponse.errorMessage.success) || serviceResponse.success == false){
					$('.WC_PasswordResetForm_FormInput_logonId_In_ResetPasswordForm_1').addClass('required').removeClass('valid');
					var msg = $('.ResetPasswordErrorMsg').html();
					if($('.ResetPasswordFailureResponseMessageDiv').length > 0){
						var tempurl = MessageHelper.messages["RediectHomePageURL"];
						if(serviceResponse.errorMessage == 'EXIST_IN_US'){
							$('.ResetPasswordFailureResponseMessageDiv').html(MessageHelper.messages["ERR_MSG_DID_YOU_MEAN"]);
							$('.ResetPasswordFailureResponseMessageDiv').append("<a target='_blank' href= ' " + tempurl + " ' > " + MessageHelper.messages [ "LenscrafterUS"] + "</a>?").show();
							$('.ResetPasswordFailureResponseMessageDiv').css('display', 'block').attr('aria-hidden', 'false');
							$('.ResetPasswordFailureResponseMessageDiv').removeClass('hide').addClass('error-message');
							$('.ResetPasswordFormContainer div.required').not('.ResetPasswordFailureResponseMessageDiv').remove();
						}else if(serviceResponse.errorMessage == 'EXIST_IN_CA'){
							$('.ResetPasswordFailureResponseMessageDiv').html(MessageHelper.messages["ERR_MSG_DID_YOU_MEAN"]);
							$('.ResetPasswordFailureResponseMessageDiv').append("<a target='_blank' href= ' " + tempurl + " ' > " + MessageHelper.messages [ "LenscrafterCA"] + "</a>?").show();
							$('.ResetPasswordFailureResponseMessageDiv').css('display', 'block').attr('aria-hidden', 'false');
							$('.ResetPasswordFailureResponseMessageDiv').removeClass('hide').addClass('error-message');
							$('.ResetPasswordFormContainer div.required').not('.ResetPasswordFailureResponseMessageDiv').remove();
						}else {
							$('.ResetPasswordFailureResponseMessageDiv').html(serviceResponse.errorMessage);
							$('.ResetPasswordFailureResponseMessageDiv').css('display', 'block').attr('aria-hidden', 'false');
							$('.ResetPasswordFailureResponseMessageDiv').removeClass('hide').addClass('error-message');
							$('.ResetPasswordFormContainer div.required').not('.ResetPasswordFailureResponseMessageDiv').remove();
						}
					}
				}
				else if(serviceResponse.PASSWORDEXPIRED !=null){
					$('.ResetPasswordFormContainer').css('display', 'none');
					$('.header-set-a-new-password-modal').css('display', 'block');
					$('.sign-in-link').addClass("open");
					removeUIoverlay();
					addUIoverlay();
					return false;
				}
				else{
					data =  { "site_events": { 
			      				"forgot_password_submit": true
							}
						};
					callTrackAnalytics(data);
					var currentID = '';
					if(document.getElementsByClassName('WC_PasswordResetForm_FormInput_logonId_In_ResetPasswordForm_1')!= null){
						currentID = document.getElementsByClassName('WC_PasswordResetForm_FormInput_logonId_In_ResetPasswordForm_1')[0].value;
					}
					console.log('currentID:' + currentID);
					if(document.getElementById('logID')!=null){
						document.getElementById('logID').value = document.getElementsByClassName('WC_PasswordResetForm_FormInput_logonId_In_ResetPasswordForm_1')[0].value;
					}
					if($('.ResetPasswordSuccessFullResponseMessageDiv').length > 0) {
						$('.ResetPasswordFailureResponseMessageDiv').html('');										
						$('.ResetPasswordFormContainer').css('display', 'none');
						$('.header-reset-password-done-modal').css('display', 'block');
						$('body,html').scrollTop(0);
						$('.sentTempPasswordText').html($('.sentTempPasswordText').html().replace('{0}',currentID));
																
						//$('.ResetPasswordFailureResponseMessageDiv').html('');
						//$('#senderEmail').html(serviceResponse.senderEmail); // commented as it is not working server for testing
						//$('.ResetPasswordFormContainer').css('display', 'none').attr('aria-hidden', 'true');
						//$('#header-reset-password-done-modal').css('display', 'block').attr('aria-hidden', 'false');
						//$('.sentTempPasswordText').text($('.sentTempPasswordText').text().replace('{0}',currentID));
					}
					if($('.examResetPasswordSuccessFullResponseMessageDiv').length > 0){
						$('.examResetPasswordSuccessFullResponseMessageDiv').html(MessageHelper.messages["PASSWORD_RESET_SUCCESS"]);
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
							if($('.ResetPasswordFailureResponseMessageDiv').length > 0){
								$('.ResetPasswordFailureResponseMessageDiv').html(serviceResponse.errorMessage);
								$('.ResetPasswordFailureResponseMessageDiv').css('display', 'block').attr('aria-hidden', 'false');
								$('.ResetPasswordFailureResponseMessageDiv').removeClass('hide').addClass('error-message');
							}
						} else {
							if (serviceResponse.errorMessageKey) {
								if($('.ResetPasswordFailureResponseMessageDiv').length > 0){
									$('.ResetPasswordFailureResponseMessageDiv').html(serviceResponse.errorMessageKey);
									$('.ResetPasswordFailureResponseMessageDiv').css('display', 'block').attr('aria-hidden', 'false');
									$('.ResetPasswordFailureResponseMessageDiv').removeClass('hide').addClass('error-message');
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

function logonFormSubmit(logonForm) {
	var f = $(logonForm);
	utag_data.form_name = "logon";
	utag_data.form_field = error_list;
	if(f.valid()){
		
		var data = f.serializeArray(),
			newData = [],
			originalURL = null;
			myperksURL = null;
			
		
		// since this is a jsonp request, we always set the destination URL to a jsonp-compatible page
		for (var i = 0; i < data.length; i++){
			var d = data[i];
			if (d['name'] == 'URL'){
				originalURL = d['value'];
				
				newData.push({
					name: 'URL',
					value: 'LogonAjaxView'
				});
			}if (d['name'] == 'myPerksRedirectURL'){
				myperksURL = d['value'];
				
				newData.push({
					name: 'URL',
					value: 'LogonAjaxView'
				});
			}
			else{
				newData.push(d);
			}
		}
		
		$.ajax({
			url: getAbsoluteURL(true) + 'LogonAjax',
			data: newData,
			type: 'POST',
			dataType: 'json',
			success: function(data) {
			if(data.passwordExpired && data.passwordExpired == '1') {
					$('.header-sign-in-modal').css('display', 'none').attr('aria-hidden', 'true');
					$('.header-set-a-new-password-modal').attr('aria-hidden', 'true').css("display", "block");
				}
				else if(fromSubmitReview){
					
					window.location = originalURL;
				}
				else if(data.success) {
					 //Analytics Framework
					try{
			            var obj = {
			              id : 'WCS-M-MyLoginRegister-Login', // utag_data properties
			              Click_FocusElement:this
			           };                                             
			        }catch(err){
			            var obj = {
			                id: 'WCS-M-MyLoginRegister-Login-Error',
			                Error_Source: 'Server',
			                Error_Code: 'utag_data syntax - '+err.message
			            };
			            tealium_data2track.push(obj);
			        }
			        finally{
			            obj.id = 'WCS-M-MyLoginRegister-Login';
			            tealium_data2track.push(obj);  
			        }        
			        // END Analytics Framework
					var nextUrl = originalURL;
					var myPerksRedirectUrl = myperksURL;
					if (nextUrl.length && nextUrl.charAt(nextUrl.length -1) == '#'){
						nextUrl = nextUrl.substring(0, nextUrl.length - 1);
					}
					if (myPerksRedirectUrl.length && myPerksRedirectUrl.charAt(myPerksRedirectUrl.length -1) == '#'){
						myPerksRedirectUrl = myPerksRedirectUrl.substring(0, myPerksRedirectUrl.length - 1);
					}
					if(data.redirectToMyPerks=='true'){
						utagLinkSafe({link_name:"login"});
						
						window.location = myPerksRedirectUrl;
					}else{
						utagLinkSafe({link_name:"login"});
						
						window.location = nextUrl;
					}
				}
				else {
					obj = {
            			id: 'Error',
            			Error_Source: "User",
            			Error_Code: "Form Filling Error - Login",
            			Error_Details: data.errorMessage,
            			Error_Message: data.errorMessage,
            		}
            		tealium_data2track.push(obj);
					$('.LogOnFailureResponseMessageDiv').html(data.errorMessage).customShow();
				}
			},
			error: function(jqXHR, textStatus, errorThrown) { //unexpected error case - system error
				$('.LogOnFailureResponseMessageDiv').html('Login request failed - please try again later.').customShow();
			}
		});
	}
	return false;
}

/**
 * Remove tealium data
 * @param utagObj
 * @return
 */
CommonFunctions.removeEmptyUtagEntries = function(utagObj){
    
    $.each(utagObj, function(key, val) {
          if (val == undefined) return; 
          
          if(val=="" || val==null){
                delete utagObj[key]             
          }
          if(typeof val == "string"){
	          val = val.replace(/\\/g, "\\\\");
	          val = val.replace(/'/g, "\\'");
	          val = val.replace(/"/g, "\\\"");
	          document.title = document.title.split(String.fromCharCode(8217)).join('');	// remove non-ascii apostrophe
          
          }else{
        	  if(utagObj.length <= 0){
        		  delete utagObj[key];
        	  }
          }
          utagObj[key]=val;
          
      });
}

/**
 *  Convert a "dojo-filtered" ajax json response into a normal ajax response. Ideally this would
 *  be done using $.ajaxSetup, but that is not working
 */
function filterAjaxResponse(response){
	if (response && typeof response == 'string' && response.length){
		return $.parseJSON(response.replace(/^\s*\/\*/, "").replace(/\*\/\s*$/, ""));
	}else{
		return response;
	}
}

function clearResetPasswordFormErrorMessage(){
	if($('.ResetPasswordFailureResponseMessageDiv').length > 0 && $('.ResetPasswordFailureResponseMessageDiv').text().length > 0){
		$('.ResetPasswordFailureResponseMessageDiv').html('').removeClass('error-message');
	}
}

//provides utag.link functionality with added exception handling to prevent breaking everything;
//arguments are passed through, rather than explicitly enumerated
function utagLinkSafe() {
	try {
		console.debug('utagLinkSafe utag = ' + utag);
		if(typeof utag != "undefined"){
			utag.link.apply(utag, arguments);
		}
	} catch(err) {
		console.error(err);
	}
}

function utagViewSafe() {
	try {
		console.debug('utagViewSafe utag = ' + utag);
		if(typeof utag != "undefined"){
			utag.view.apply(utag, arguments);
		}
	} catch(err) {
		console.error(err);
	}
}

var error_list = new Array();    //holds errors for tealium tagging

//extend jquery with useful url functions
$.extend({
	getUrlVars: function() {
		var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++) {
	    	hash = hashes[i].split('=');
	    	if(vars[hash[0]]){ //if the var is already present, such as 'facet', append the new value to the existing value, separated by an ampersand
	    		var value = vars[hash[0]].split('#')[0]; //Handle '#notOpenRefine' at the end of the URL 
	    		value += '&' + decodeURIComponent(hash[1]);
	    		vars[hash[0]] = value;
	    	}else{
	    		vars.push(hash[0]);
	    		vars[hash[0]] = decodeURIComponent(hash[1]);
	    	}
	    }
	    return vars;
	},
	getUrlVar: function(name) {
		return $.getUrlVars()[name];
	}
});

function removeExamCookies(){
	$.cookie("exam1", '', { expires:-1, path: '/' });
	$.cookie("exam2", '', { expires:-1, path: '/' });
	$.cookie("exam3", '', { expires:-1, path: '/' });
	$.cookie("eapptsUserId", '', { expires:-1, path: '/' });
}

function recoModalOpen(){
	$('#recoModal').dialog ({
		width: '100%',
		modal:true,
		autoOpen:true,
		open:function (){
			var $this = $(this);
			var $header = $('#header_wrapper');
			$this.closest ('.ui-dialog').find('.ui-dialog-titlebar-close').remove();
			
			$('body, html').scrollTop(0);
			$this.closest('.ui-dialog').css({
				top: $header.outerHeight() + 'px',
				left: 0
			});
			$header.css({
				position: 'relative',
				'z-index': 10100
			});
		}
	});
}

function recoLinkClick(){
	$('.reco-link').live('click', function(){
		recoModalOpen();
	});
}

/* Positions dialogs just below the site's header */
function customPlaceDialog(dialog) {
	if(!(dialog instanceof jQuery)) dialog = $(dialog);
	if(dialog.length < 1) return false;
	dialog.customShow();
	$('body, html').scrollTop(0);
	var $header = $('#header_wrapper');
	$header.css({
		position: 'relative',
		'z-index': 11000
	});
	dialog.closest('.ui-dialog').css({top: ($header.outerHeight())}).focus();
	return true;
}

/* Positions datepickers just below site's header, and as a modal */
function customPlaceDatePicker(picker) {
	if(!(picker instanceof jQuery)) picker = $(picker);
	if(picker.length < 1) return false;
	if(picker.data('noShow') === true) return false;

	var $pickerDiv = $('#ui-datepicker-div');
	
	$pickerDiv.addClass('custom-placed');
	
	if($('.ui-widget-overlay').length < 1) {
		$('<div>')
			.addClass('ui-widget-overlay')
			.insertBefore('#ui-datepicker-div')
			.css({
				height: ($(document).outerHeight())
			});
		
		$pickerDiv.data('scrollTop', $(window).scrollTop());
		console.log($pickerDiv.data('scrollTop'));
	} 
	
	if($pickerDiv.find('a.close').length < 1){
		$pickerDiv.append($('<a class="close">Cancel</a>')
			.on('click', function(){
				picker.datepicker('hide');
			})
		);
	}
	
	$('body, html').scrollTop(0);
	$pickerDiv.attr('style', '')
	.css({
		top: ($('#header_wrapper').outerHeight())
	});
	$('#header_wrapper').css({
		'z-index': 10100,
		position: 'relative'
	});
}

function registerFormSubmit(registerForm){
	$(registerForm).find('input[name=account]').val($('.logonId_regModel').val());
	var f = $(registerForm);
	var receieveEmailCheck = true;
	var optinEmail = false;
	var optin_18yrsCheck = true;
	
	utag_data.form_name = "registration";
	utag_data.form_field = error_list;
	if(f.valid()){
		var data = f.serializeArray(),
			newData = [],
			originalURL = null;
			
		
		// since this is a jsonp request, we always set the destination URL to a jsonp-compatible page
		for (var i = 0; i < data.length; i++){
			var d = data[i];
		
			if (d['name'] == 'receiveEmail'&& d['value']=='on'){
				d['value']= true;
				receieveEmailCheck = false;
				optinEmail = true;
				//$('#userRegModelForm').find('input[name=optinStatus]').val("1");
				newData.push({
					name: 'optinStatus',
					value: "1"
				});
			}
	
			if (d['name'] == 'optin_18yrs'&& d['value']=='on'){
				d['value']= true;
				optin_18yrsCheck = false;
			}
			
			if (d['name'] == 'logonId'){
				
			}
			
			//only in confirmation page
			if(f.hasClass('confirmationPage')){
				if (d['name'] == 'age'&& d['value']=='on'){
					d['value']= true;
					d['name']= 'optin_18yrs';
					optin_18yrsCheck = false;
				}
				
				if (d['name'] == 'logonId'){
					var logonIdVerifyV = d['value'];
					newData.push({
						name: 'logonIdVerify',
						value: logonIdVerifyV
					});				
				}			

			}
			
			if (d['name'] == 'URL'){
				originalURL = d['value'];
				
				newData.push({
					name: 'URL',
					value: getAbsoluteURL(true) + 'UserRegistrationAddAjaxView'
				});
			}else{
				newData.push(d);
			}
		}
		
		if (receieveEmailCheck){
			newData.push({
				name: 'receiveEmail',
				value: false
			});
			newData.push({
				name: 'optinStatus',
				value: "0"
			});
			
		}
		if (optin_18yrsCheck){
			newData.push({
				name: 'optin_18yrs',
				value: false
			});
		}
		$.ajax({
			url: getAbsoluteURL(true) + 'UserRegistrationAddAjax',
			data: newData,
			type: 'POST',
			dataType: 'json',
			success: function(data) {
				if(data.success) {
					
					var tealiumData = {sc_event : 'event76'};
					
					utagData = {
				 			"site_events": {
				 				"registration_complete": true,
								"authentication_complete": true,
								"email_opt_in":optinEmail
				 			},
				 			"authentication_status" : "authenticated",
				 			"registration_status" : "registered",
				 			};
					callTrackAnalytics(utagData);
					 //Analytics Framework
					try{
					   var obj = {
						  id : 'WCS-M-Account-Create', // utag_data properties
						  attribute: 'WCS-M-MyLoginRegister-NewAccount-Create' 
					   };

					}catch(err){
						var obj = {
							id: 'WCS-M-Account-Create-Error',
							attribute: 'WCS-M-MyLoginRegister-NewAccount-Create-Error',
							Error_Source: 'Server',
							Error_Code: 'utag_data syntax - '+err.message
						};
						tealium_data2track.push(obj);
					}
					finally{
						obj.id = 'WCS-M-Account-Create';
						obj.attribute = 'WCS-M-MyLoginRegister-NewAccount-Create';
						tealium_data2track.push(obj);
					}
					//END Analytics Framework
					utagViewSafe(tealiumData);
					utagLinkSafe({link_name:"regComplete", customer_id:data.userId});					
					console.log('RegComplete Event Triggered Desktop - ' + JSON.stringify(data));
					if(f.hasClass('confirmationPage')){
						try{
				            var obj = {
				              id : 'WCS-M-CheckoutThankYou-NewAccount-Create', // utag_data properties
				              Click_FocusElement:this
				           };                                             
				        }catch(err){
				            var obj = {
				                id: 'WCS-M-CheckoutThankYou-NewAccount-Create-Error',
				                Error_Source: 'Server',
				                Error_Code: 'utag_data syntax - '+err.message
				            };
				            tealium_data2track.push(obj);
				        }
				        finally{
				            obj.id = 'WCS-M-CheckoutThankYou-NewAccount-Create';
				            tealium_data2track.push(obj);  		            
				        }     
					}
					if($('.PurchaseSyncCheckLogin').is(':checked')){
                       setTimeout(function(){
                    	   window.location = $('.URL_AccountPersonalization_Dsk').val();
						 }, 300);
					}else{
					   setTimeout(function(){
						   window.location.href = originalURL;
						 }, 300);
					}
					
					//window.location = originalURL;
					if(!receieveEmailCheck){
						utagLinkSafe({link_name:"emailSubscribe"});
					}
				}
				else {
					$('.RegFailureResponseMessageDiv').html(data.errorMessage);
					if($('#userRegModelFormConfirm').length > 0){
						$('body').animate({
			                scrollTop: $('#userRegModelFormConfirm').offset().top - $('#header_wrapper').innerHeight()
			            }, 200);
					}
				}
			},
			error: function(jqXHR, textStatus, errorThrown) { //unexpected error case - system error
				$('.RegFailureResponseMessageDiv').html('Registration request failed - please try again later.');
				if($('#userRegModelFormConfirm').length > 0){
					$('body').animate({
		                scrollTop: $('#userRegModelFormConfirm').offset().top - $('#header_wrapper').innerHeight()
		            }, 200);
				}
			}
		});
	}
	return false;
}

/**
 * Make a request to Google Maps Services to geocode a location and perform the given callback
 * when the request returns
 * @param location the location to geocode (zip code, address, etc.)
 * @param callbackName the name of the callback to use after the geocode is complete
 */
function performGeocode(location, callbackName) {
	if (location && location.length &&
		callbackName && callbackName.length) {
		
		try {
			var geocoder = new google.maps.Geocoder();
			
			geocoder.geocode({
				address : location
			}, callbackName);
		} catch(e) {
			console.warn('global.js - performGeocode(): google.maps.Geocoder is undefined');
		};
	}
}

$(document).ready(function(){
	setupValidation();
	setupCountrySelector();
	setupEvents();
	initCarousels();
	initTopNavigationLinkHandlers();
	refreshNotifications();
	//invokeLazyLoad();

	$('#bazaar_voice_review_summary_wrapper').show();
	
	$('.regSubmit').click(function() {
		var registerForm = $(this).parents('form');
		registerFormSubmit(registerForm);
	});

	
	if($("#zip_or_city").length > 0){
		var zip_or_city = $("#zip_or_city").val().replace(/%20/g, ' ');
		zip_or_city = zip_or_city.replace(/%2C/g, ',');
		$("#zip_or_city").val(zip_or_city);
	}
	
	function profileSubscribeFormSubmit(profileForm,isSubscribed,checkboxVal) {
		 var pf = $(profileForm);
	        if(pf.valid()){
	        	
			  var subscriptionForm = document.EmailSusbscriptionForm;
		      var optinEmail = false;
		      
			if(isSubscribed=='true' && checkboxVal=='email'){
	                if(subscriptionForm.recieveEmail_CheckBox.checked){
	                	$(".checkBoxareaEmail").hide().removeClass('visible');
	                	$(".checkBoxSubscribedareaEmail").show().addClass('visible');
	                }
	          }
	          if(isSubscribed=='false' && checkboxVal=='email'){
	        	  $(".checkBoxSubscribedareaEmail").hide().removeClass('visible');
	        	  $(".checkBoxareaEmail").show().addClass('visible');
	        	  subscriptionForm.recieveEmail_CheckBox.checked=false;
	          }
			  
			  if(isSubscribed=='true' && checkboxVal=='phone'){
	                if(subscriptionForm.receiveMobile_CheckBox.checked){
	                	$(".checkBoxareaPhone").hide().removeClass('visible');
	                	$(".checkBoxSubscribedareaPhone").show().addClass('visible');
	                 }
	          }if(isSubscribed=='false' && checkboxVal=='phone'){
	        	  $(".checkBoxSubscribedareaPhone").hide().removeClass('visible');
	        	  $(".checkBoxareaPhone").show().addClass('visible');
	        	  subscriptionForm.receiveMobile_CheckBox.checked=false;
	         }
	        }
	        return false;
	      }

	$('#subscribeContainer').on('change',".subscribeUserData",function(){
        var isSubscribed= $(this).attr('data-subscribe');
        var subscribeType = $(this).attr('data-subtype');
        profileSubscribeFormSubmit($(this).parents('form'),isSubscribed,subscribeType);
        return false;
      });

      $('#subscribeContainer').on('click','.subscribeUserLink',function(){
        var isSubscribed= $(this).attr('data-subscribe');
        var subscribeType = $(this).attr('data-subtype');
        var dataType = $(this).data("subtype");
        profileSubscribeFormSubmit($(this).parents('form'),isSubscribed,subscribeType);
        if(dataType == "email"){
        	var email = $(this).siblings(".pref-email").text().toLowerCase();
        	
        	var trimmedLowerMail = '';
			
			if(email){
				trimmedLowerMail = email.trim().toLowerCase();
			}
			
         	//Analytics Framework			
			try{
			   var obj = {
                  id : 'WCS-M-Unsubscribe', // utag_data properties
                  User_Email_MD5 : MD5(email),
                  User_Email_SHA256: sha256(trimmedLowerMail)
			   };

			}catch(err){
				var obj = {
					id: 'WCS-M-Unsubscribe-Error',
					Error_Source: 'Server',
					Error_Code: 'utag_data syntax - '+err.message
				};
				tealium_data2track.push(obj);
			}
			finally{
				obj.id = 'WCS-M-Unsubscribe';
				obj.User_Email_MD5 = MD5(email);
				obj.User_Email_SHA256 = sha256(trimmedLowerMail);
				tealium_data2track.push(obj);
			}
			// END Analytics Framework    

         }
        return false;
      });
      
      $('#sync_PurchaseEye').on('change',function(){
  		if($(this).is(':checked')){
  			
  			$('#CreateAccountURL').val($('#personalizationURL').val());
  		}else{
  			$('#CreateAccountURL').val($('#CreateMyAccountURL').val());
  		}
  		
          return false;
        });
	
	function refreshSubscribeArea(){
	  var url = 'mySubscriptionView?storeId='+constants.ajaxParams['storeId']+'&catalogId='+constants.ajaxParams['catalogId']+'&langId='+constants.ajaxParams['langId']+'&userId='+constants.ajaxParams['userId'];
	  $.ajax({
	        url: getAbsoluteURL(true) +  url,
	        dataType: 'html',
	        success: function(response) {
	              $('#subscribeContainer').html(response);
	
	        }
	  });
	}
	var PerkOfferName = $.cookie('lcOfferName')||'';
	var cookieToDelete = $('#lcCookieToDelete').val() ||'';
	if(PerkOfferName !==''){
		$('.perks-offer').first().addClass('recentlyAdded');
		$("<p class='selectedPerk'><span>&nbsp;</span>Just Added</p>").insertBefore(".recentlyAdded");
		if(cookieToDelete === 'true' && cookieToDelete != ''){
			document.cookie = "lcOfferName" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
	}
	$('.c-tabs').basicTabs();
	$('#ViewAllPastAppts').on('click', function() {
		var pastApptsMore = $('#pastApptsMore');
		pastApptsMore.css("display", "block");
	});
	
	if($('#sync_PurchaseEye').is(':checked')){
	    $('#CreateAccountURL').val($('#personalizationURL').val());
	    
    }else{
    	 $('#CreateAccountURL').val($('#CreateMyAccountURL').val());
        }
	
	$('#resetPassword').on('click', function(){
        var logId="";
        if(document.getElementById('logID')!=null){
              logId=document.getElementById('logID').value;
        }
        var URL=$('#UpdateFormURL').val();
        URL= URL+"&logId="+logId;
        window.location.href=URL;
	});

	$(".email-friend").click(function(){
		//  console.debug($(this).data('generic_email_view_url','abc'));
		   var url = $(this).attr('generic_email_view_url');
		   $.ajax({
				url: getAbsoluteURL() + url,
				success: function(data) {
			   		$('#EmailFriendFormDiv').removeClass("hide");
			   		$('#EmailFriendFormDiv').html(data);
			   		/*$('#EmailFriendFormDiv').dialog({
			   			draggable: false,
			   			resizable: false,
			   			modal: true,
			   			zIndex: 9999,
			   			minWidth:520,
			   			open:function ()
			   			{*/
			   				var st = setTimeout (function() {
			   					if($('#EmailThankYouSection').find("a.un_w94c").length == 0){
			   						$('#EmailThankYouSection').append('<a href="#" class="un_tertiary_action un_w94c cancel" id="backto">BACK TO PRODUCT</a>'); 
			   					}
			   					$('#EmailFriendFormDiv .cancel').bind ('click', function (e) {
				   					e.preventDefault ();
				   					$('#EmailFriendFormDiv').addClass('hide');
				   					$("#content_wrapper_box").removeClass("hide");
				   				});
			   				}, 2000);
			   				
			   				// Populate hidden form elements on modal open
			   				if($('input[name=directions]').length > 0){
			   					$('input[name=directions]').val($('#allDirections').text());
			   				}
			   				if($('input[name=totalDistance]').length > 0){
			   					$('input[name=totalDistance]').val($("#totalDist").text())
			   				}
			   				if($('input[name=mapImage]').length > 0){
			   					$('input[name=mapImage]').val($("#imageUrl").text())
			   				}
			   				if($('input[name=totalTime]').length > 0){
			   					$('input[name=totalTime]').val($("#timeTaken").text())
			   				}
			   				$("#content_wrapper_box").addClass("hide");
			   				$(window).scrollTop(0);
			   			/*},
			   			close:function ()
			   			{
			   				$('#EmailFriendFormDiv .cancel').unbind ('click');
			   			}*/
				}
			});
		   utagLinkSafe({link_name:"emailPDP"});
		  return false;
	  });
	
	$(".goToDesktop").click(goToDesktop);
	
	$('.email-friend').click(function(){
		utagLinkSafe({link_name:"emailPDP"});
	});
	
	$('.eye-exam-edit-click').click(function(){
		var country="us";
		var userAuthenticated = "not authenticated";
		var userRegistration ="not registered";
		if( document.getElementById("countryName") != null &&  document.getElementById("countryName").value == 'CA'){
			country="ca";
		}
		if( document.getElementById("userAuthenticated") != null &&  document.getElementById("userAuthenticated").value == 'R'){
			userAuthenticated ="authenticated";
			userRegistration ="registered";
		}
		
		data =  { "site_events": { 
			"edit_patient_info": true
				},
			 "site_layout_type":"mobile",
			 "country" : country,
			 "authentication_status" : userAuthenticated,
			 "registration_status" :userRegistration
			};
		callTrackAnalytics(data);
	});
		
	
	$('#social_facebook_Details_Like_Button_Display').click(function(){
		utagLinkSafe({link_name:"socialShare", social_site:"facebook"}); //facebook tealium tag
	});
	
	$('.pin-it-button').click(function(event){
		utag.link({link_name:"SocialShare", social_site:"Pinterest"});   //pinterest tealium tag
	});
	
	$('.twitter-share-button').click(function(event){
		utag.link({link_name:"SocialShare", social_site:"Twitter"});   //twitter tealium tag
	});
	
	$('#StoreLocatorPdpModelDiv').bind('dialogopen', function(e, ui){
		$(this).parent().addClass('store-pop');
		$(window).scrollTop(0);
		$(this).height($(document).height());
	});
	
	$('#EmailFriendFormDiv').bind('dialogopen', function(e, ui){
		$(this).parent().addClass('store-pop no-close');
		$(window).scrollTop(0);
		$(this).height($(document).height());
	});
	
	// Move your favorites link to navigation
	$('#favorites').insertAfter($('.un_header_menu div').eq(3)).customShow();
	
	$('#ResetPasswordForm').keypress(function(e) {		
		if(e.keyCode == 13) {
			clearResetPasswordFormErrorMessage();
			if($('#ResetPasswordForm').valid()){
				resetPassword();
			}
			return false;
		}
		return true;
	});
	
	(typeof(jQuery.validator) !== 'undefined') && jQuery.validator.addMethod("antipattern", function(value, element, param) {
		$('span[for=locationEntry],#ErrorDivStoreSearch').customHide();
		return this.optional(element) || !param.test(value);
	}, "Invalid format.");

	(typeof(jQuery.validator) !== 'undefined') && jQuery.validator.addMethod("logonIdVerifyRequired", function(value, element, param) {
		if(value == 'Enter e-mail address'){
			return false;
		}else{
			return true;
		}
	}, "Please enter a password");
	
	if(typeof($().dialog) !== 'undefined') {
		var cancelAppointmentModal = $('#CancelAppointmentModalDiv').dialog({
			autoOpen: false,
			draggable: false,
			resizable: false,
			modal: true,
			zIndex: 9999,
			width: '100%',
			dialogClass: 'myAccountModal',
			open:function ()
			{
				// position the dialog just below the site's header
				customPlaceDialog(this);
				
				$('#CancelAppointmentModalDiv .cancel').bind('click', function() {
					$('#CancelAppointmentModalDiv').dialog('close');
				});
			},
			close:function ()
			{
				$('#CancelAppointmentModalDiv .cancel').unbind('click');
			}
		});
	}
	
	// Cancel eye exam start
	$('.unsyncEyeExmas').on('click',function(e){
		$('.unsyncContainer').dialog('open');
	});	
	$('.cancelExam[data-appointment-id]').on('click',function(e){ 
		
		var country="us";
		var userAuthenticated = "not authenticated";
		var userRegistration ="not registered";
		var isFuture = $(this).attr('is-future') || '';
		if( document.getElementById("countryName") != null &&  document.getElementById("countryName").value == 'CA'){
			country="ca";
		}
		if( document.getElementById("userAuthenticated") != null &&  document.getElementById("userAuthenticated").value == 'R'){
			userAuthenticated ="authenticated";
			userRegistration ="registered";
		}
		if(isFuture != 'true'){
		data =  { "site_events": { 
			"cancel_eye_exam": true
				},
			 "site_layout_type":"mobile",
			 "country" : country,
			 "authentication_status" : userAuthenticated,
			 "registration_status" :userRegistration
			};
		}else{
			data =  { "site_events": { 
				"cancel_future_exam": true
					},
				 "site_layout_type":"mobile",
				 "country" : country,
				 "authentication_status" : userAuthenticated,
				 "registration_status" :userRegistration
				};
		}
		//Analytics Framework
		try{
		   var obj = {
		      id : 'WCS-M-Exam-Funnel-Cancellation' // utag_data properties
		   };
		    
		}catch(err){
		    var obj = {
		        id: 'WCS-M-Exam-Funnel-Cancellation-Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message
		    };
		    tealium_data2track.push(obj);
		}
		finally{
		    obj.id = 'WCS-M-Exam-Funnel-Cancellation';
		    tealium_data2track.push(obj);
		}
		//END Analytics Framework
		callTrackAnalytics(data);
		$('.cancelAppointmentId').val($(this).attr('data-appointment-id'));
	     $('.canceleyeExamContainer').dialog('open');
	});
	$('.closeEyeExamModel').on('click',function(e){
		if($('.canceleyeExamContainer').is(":visible")){
			$('.canceleyeExamContainer').dialog('close');
		}
		else if($('.unsyncContainer').is(":visible")){
			$('.unsyncContainer').dialog('close');
		}
	});

	$('.canceleyeExamContainer, .unsyncContainer').dialog({
		autoOpen: false,
		draggable: false,
		resizable: false,
		zIndex: 9999,
		modal: true,
		width:$(window).width()* 0.8
	});
	// Cancel eye exam end
	
	$('.showWaitModalContainer').dialog({
		dialogClass: "noModal-close",
		autoOpen: false,
		draggable: false,
		position: ['center',91],
		resizable: false,
		zIndex: 9999,
		modal: true,
		width:$(window).width()* 0.8,
		closeOnEscape: false
	});
	
	$('.exam-list.upcoming').on('click', 'a.cancelAppointment[data-appointment-id]', function(){
		$('.cancelAppointmentId').val($(this).attr('data-appointment-id'));
		cancelAppointmentModal.dialog('open');
		return false;
		utagLinkSafe({link_name:"apptRemove"});
	});
	
	// eye exam show details links
	$('#EyeExamsModalDiv .show-past-exam').on('click', function(){
		var $this = $(this);
		var index = $this.index('#EyeExamsModalDiv .show-past-exam');
		$('#EyeExamsModalDiv .show-past-exam').eq(index).toggle();
		$('#EyeExamsModalDiv .hide-past-exam').eq(index).toggle();
		$('#EyeExamsModalDiv .past .each-exam').eq(index).toggle();
	});
	$('#EyeExamsModalDiv .hide-past-exam').on('click', function(){
		var $this = $(this);
		var index = $this.index('#EyeExamsModalDiv .hide-past-exam');
		$('#EyeExamsModalDiv .show-past-exam').eq(index).toggle();
		$('#EyeExamsModalDiv .hide-past-exam').eq(index).toggle();
		$('#EyeExamsModalDiv .past .each-exam').eq(index).toggle();
	});
	
	$('#CancelAppointmentModalDiv .yes-cancel').on('click', function() {
		utagLinkSafe({link_id:"apptRemove"});
	})
	
	if($('#personalInfoForm').length > 0){
		(typeof($.validator) !== 'undefined') && $.validator.addMethod("postalFormatCheck", function(value, element){
			var regexObj = {canada : /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i ,usa : /^\d{5}(-\d{4})?$/};
			if($('#storeCountryName').val()!="" && $('#storeCountryName').val()=="US"){
				var regexp = new RegExp(regexObj.usa);
				return  regexp.test(value);
			}
			else{
				regexp = null;
				var regexp = new RegExp(regexObj.canada);
				return regexp.test(value)
			}
		});	
	}
	
	$(document.body).on('click','#header-insurance', function(){
		var _dlCopy = $.extend(true, {}, _dl);
        _dlCopy.site_events = {"insurance_shield_click": "true"};
        callTrackAnalytics(_dlCopy);
	});
});

function initTopNavigationLinkHandlers(){
	
	//Mobile Top level navigation
	$('#Header_MyAccount_Link, #Header_MyAccount_Link_Cached').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"My Account"});
	});
	$('#Header_SignIn_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Sign In"});
	});
	$('.headerLogout').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Signout"});
	});
	$('#Header_FindStore_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Find a store"});
	});
	$('#Header_Schedule_EyeExam_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Schedule an Eye Exam"});
	});
	$('#Header_MyFavorites_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"My Favorites"});
	});
	$('#Header_Browse_Catalog_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Browse Catalog"});
	});
	$('#Header_Find_Your_Look_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Find Your Look"});
	});
	$('#Header_Eyecare_And_Service_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service"});
	});
	$('#Header_Our_Vision_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision"});
	});
	$('#Header_Savings_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Savings"});
	});
	
	//
	$('#MobileHome_Find_Store_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Home | Find A Store"});
	});
	$('#MobileHome_Schedule_Eyeexam_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Home | Schedule An Eye Exam"});
	});
	$('#MobileHome_Offers_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Home | Offers"});
	});
	$('#MobileHome_Find_Your_Look_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Home | Find Your Look"});
	});
	
	
	//Products and Style
	$('#link_product_style').click(function(e){			
		//utag.link({link_name:"topNav",nav_link:"Products and Style"});		
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style"});
	});	
	$('#link_men').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Men"});
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Men"});
		console.log('top nav events fired');
	});	
	$('#link_women').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Women"});
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Women"});
	});	
	$('#link_kids').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Kids"});
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Kids"});
	});	
	$('#link_eyeglasses').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Eyeglases"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Eyeglases"});
	});	
	$('#link_sunglasses').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Sunglasses"});
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Sunglasses"});
	});
	$('#link_lenses').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Lenses"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Lenses"});
	});
	$('#link_contactlenses').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Contact Lenses"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Contact Lenses"});
	});
	$('#link_accessories').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Accessories"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Accessories"});
	});
	$('#link_prescription_sport').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Prescription Sport"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Prescription Sport"});
	});
	$('#link_prescription_safety').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Prescription Safety"});
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Prescription Safety"});
	});
	$('#link_brands').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Brands"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Brands"});	
	});
	$('#link_trends').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Trends"});
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Trends"});
	});
	$('#link_collections').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Collections"});
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Collections"});
	});
	
	
	//Eyecare and Service
	$('#link_eyecare_service').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service"});
	});
	$('#link_schedule_an_eyeexam_top').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Schedule an Eye Exam"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Schedule an Eye Exam"});	
	});
	$('#link_storelocations').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Store Locations"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Store Locations"});
	});
	$('#link_accufit').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Accufit"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Accufit"});
	});
	$('#link_mylook').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | My look"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | My look"});
	});
	$('#link_lenssimulator').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Lenssimulator"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Lenssimulator"});	
	});
	$('#link_visionguide').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Visionguide"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Visionguide"});
	});
	$('#link_doctors_office').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Doctor's office"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Doctor's office"});
	});
	$('#link_onsite_lab').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | On-site Lab"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | On-site Lab"});
	});
	$('#eyecare_service_link_visit_customer_service').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Visit Customer Service"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Visit Customer Service"});
	});
	$('#eyecare_service_link_purchasecare').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Purchase Care"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Purchase Care"});	
	});
	$('#eyecare_service_link_faqs').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | FAQs"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | FAQs"});	
	});
	$('#eyecare_service_link_contact_us').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Contact Us"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Contact Us"});
	});
	$('#link_seeing_eyeexams').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Seeing Eye Exams"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Seeing Eye Exams"});
	});
	$('#eyecare_service_link_schedule_an_eyeexam_bottom').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Schedule an Eye Exam"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Schedule an Eye Exam"});
	});
	
	//Savings
	$('#link_savings').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Savings"});	
	});
	$('#link_offers_and_discounts').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | Offers and Discounts"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | Offers and Discounts"});
	});
	$('#link_insurance').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | Insurance"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | Insurance"});	
	});
	$('#link_lenscrafters_creditcards').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | Lenscrafters credit card"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | Lenscrafters credit card"});
	});
	$('#savings_link_visit_customer_service').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | Visit Customer Service"});
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | Visit Customer Service"});
	});
	$('#savings_link_purchasecare').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | Purchase Care"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | Purchase Care"});	
	});
	$('#savings_link_faqs').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | FAQs"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | FAQs"});	
	});
	$('#savings_link_contact_us').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | Contact Us"});
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | Contact Us"});
	});	
	$('#savings_link_schedule_an_eyeexam_bottom').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | Schedule an Eye Exam"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | Schedule an Eye Exam"});
	});
	
	
	//Our Vision
	$('#link_ourvision').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision"});	
	});
	$('#link_about_lenscrafters').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | About Lenscrafters"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | About Lenscrafters"});
	});
	$('#link_ourstores').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | Our Stores"});
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | Our Stores"});
	});
	$('#link_onesight').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | Onesight"});
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | Onesight"});
	});
	$('#link_ourblog').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | Our Blog"});
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | Our Blog"});
	});
	$('#ourvision_link_visit_customer_service').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | Visit Customer Service"});
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | Visit Customer Service"});
	});
	$('#ourvision_link_purchasecare').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | Purchase Care"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | Purchase Care"});
	});
	$('#ourvision_link_faqs').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | FAQs"});
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | FAQs"});
	});
	$('#ourvision_link_contact_us').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | Contact Us"});
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | Contact Us"});
	});	
	$('#ourvision_link_schedule_an_eyeexam_bottom').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | Schedule an Eye Exam"});
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | Schedule an Eye Exam"});
	});
	console.log('initialized');
}

var carouselTimer = null;
function initCarousels(){
	var $allCarousels = $('div[id^="lc-carousel"]'),
	currentItem = null;
	 
	$allCarousels.each(function(){
		var $carousel = $(this);
		$carousel.customHide();
		$carousel.owlCarousel({
		  navigation : false,
	      lazyLoad:true,
	      slideSpeed : 300,
	      paginationSpeed : 400,
	      singleItem : true,
	      autoPlay : $carousel.attr('data-autoplay') ? ($carousel.attr('data-autoplay') === 'true' ? true : false) : true,
	      addClassActive : true,
	      afterInit : function(){
			//setupCarouselTimer();
		  },
		  afterMove : function(){
			//setupCarouselTimer();
		  },
		  startDragging: function(){
			  this.stop();
		  },
		  afterLazyLoad: function(elem, nextitem, totitem) {
			  if (nextitem <= totitem) {
				  var imgsrc = $carousel.find('.owl-item').eq(nextitem).find('img').data('src');
				  $carousel.find('.owl-item').eq(nextitem).find('img').attr("src", imgsrc).css({'display': 'inline', 'opacity': '1'});
			  }
		  }
	  });
	  $carousel.customShow();
	});
}

function initTopNavigationLinkHandlers(){
	
	//Mobile Top level navigation
	$('#Header_MyAccount_Link, #Header_MyAccount_Link_Cached').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"My Account"});
	});
	$('#Header_SignIn_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Sign In"});
	});
	$('.headerLogout').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Signout"});
	});
	$('#Header_FindStore_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Find a store"});
	});
	$('#Header_Schedule_EyeExam_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Schedule an Eye Exam"});
	});
	$('#Header_MyFavorites_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"My Favorites"});
	});
	$('#Header_Browse_Catalog_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Browse Catalog"});
	});
	$('#Header_Find_Your_Look_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Find Your Look"});
	});
	$('#Header_Eyecare_And_Service_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service"});
	});
	$('#Header_Our_Vision_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision"});
	});
	$('#Header_Savings_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Savings"});
	});
	
	//
	$('#MobileHome_Find_Store_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Home | Find A Store"});
	});
	$('#MobileHome_Schedule_Eyeexam_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Home | Schedule An Eye Exam"});
	});
	$('#MobileHome_Offers_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Home | Offers"});
	});
	$('#MobileHome_Find_Your_Look_Link').click(function(e){			
		utagLinkSafe({link_name:"topNav",nav_link:"Home | Find Your Look"});
	});
	
	
	//Products and Style
	$('#link_product_style').click(function(e){			
		//utag.link({link_name:"topNav",nav_link:"Products and Style"});		
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style"});
	});	
	$('#link_men').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Men"});
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Men"});
		console.log('top nav events fired');
	});	
	$('#link_women').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Women"});
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Women"});
	});	
	$('#link_kids').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Kids"});
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Kids"});
	});	
	$('#link_eyeglasses').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Eyeglases"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Eyeglases"});
	});	
	$('#link_sunglasses').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Sunglasses"});
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Sunglasses"});
	});
	$('#link_lenses').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Lenses"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Lenses"});
	});
	$('#link_contactlenses').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Contact Lenses"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Contact Lenses"});
	});
	$('#link_accessories').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Accessories"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Accessories"});
	});
	$('#link_prescription_sport').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Prescription Sport"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Prescription Sport"});
	});
	$('#link_prescription_safety').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Prescription Safety"});
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Prescription Safety"});
	});
	$('#link_brands').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Brands"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Brands"});	
	});
	$('#link_trends').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Trends"});
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Trends"});
	});
	$('#link_collections').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Products and Style | Collections"});
		utagLinkSafe({link_name:"topNav",nav_link:"Products and Style | Collections"});
	});
	
	
	//Eyecare and Service
	$('#link_eyecare_service').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service"});
	});
	$('#link_schedule_an_eyeexam_top').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Schedule an Eye Exam"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Schedule an Eye Exam"});	
	});
	$('#link_storelocations').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Store Locations"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Store Locations"});
	});
	$('#link_accufit').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Accufit"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Accufit"});
	});
	$('#link_mylook').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | My look"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | My look"});
	});
	$('#link_lenssimulator').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Lenssimulator"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Lenssimulator"});	
	});
	$('#link_visionguide').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Visionguide"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Visionguide"});
	});
	$('#link_doctors_office').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Doctor's office"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Doctor's office"});
	});
	$('#link_onsite_lab').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | On-site Lab"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | On-site Lab"});
	});
	$('#eyecare_service_link_visit_customer_service').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Visit Customer Service"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Visit Customer Service"});
	});
	$('#eyecare_service_link_purchasecare').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Purchase Care"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Purchase Care"});	
	});
	$('#eyecare_service_link_faqs').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | FAQs"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | FAQs"});	
	});
	$('#eyecare_service_link_contact_us').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Contact Us"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Contact Us"});
	});
	$('#link_seeing_eyeexams').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Seeing Eye Exams"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Seeing Eye Exams"});
	});
	$('#eyecare_service_link_schedule_an_eyeexam_bottom').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Eyecare and Service | Schedule an Eye Exam"});
		utagLinkSafe({link_name:"topNav",nav_link:"Eyecare and Service | Schedule an Eye Exam"});
	});
	
	//Savings
	$('#link_savings').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Savings"});	
	});
	$('#link_offers_and_discounts').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | Offers and Discounts"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | Offers and Discounts"});
	});
	$('#link_insurance').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | Insurance"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | Insurance"});	
	});
	$('#link_lenscrafters_creditcards').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | Lenscrafters credit card"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | Lenscrafters credit card"});
	});
	$('#savings_link_visit_customer_service').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | Visit Customer Service"});
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | Visit Customer Service"});
	});
	$('#savings_link_purchasecare').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | Purchase Care"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | Purchase Care"});	
	});
	$('#savings_link_faqs').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | FAQs"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | FAQs"});	
	});
	$('#savings_link_contact_us').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | Contact Us"});
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | Contact Us"});
	});	
	$('#savings_link_schedule_an_eyeexam_bottom').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Savings | Schedule an Eye Exam"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Savings | Schedule an Eye Exam"});
	});
	
	
	//Our Vision
	$('#link_ourvision').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision"});	
	});
	$('#link_about_lenscrafters').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | About Lenscrafters"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | About Lenscrafters"});
	});
	$('#link_ourstores').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | Our Stores"});
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | Our Stores"});
	});
	$('#link_onesight').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | Onesight"});
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | Onesight"});
	});
	$('#link_ourblog').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | Our Blog"});
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | Our Blog"});
	});
	$('#ourvision_link_visit_customer_service').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | Visit Customer Service"});
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | Visit Customer Service"});
	});
	$('#ourvision_link_purchasecare').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | Purchase Care"});	
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | Purchase Care"});
	});
	$('#ourvision_link_faqs').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | FAQs"});
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | FAQs"});
	});
	$('#ourvision_link_contact_us').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | Contact Us"});
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | Contact Us"});
	});	
	$('#ourvision_link_schedule_an_eyeexam_bottom').click(function(e){
		//utag.link({link_name:"topNav",nav_link:"Our Vision | Schedule an Eye Exam"});
		utagLinkSafe({link_name:"topNav",nav_link:"Our Vision | Schedule an Eye Exam"});
	});
	console.log('initialized');
}

function setupCarouselTimer(){
	clearInterval(carouselTimer);
	  carouselTimer = setInterval(function(){
			var owl = $('div[id^="lc-carousel"]').data('owlCarousel'),
				currentItem = $('div[id^="lc-carousel"]').find('.owl-item.active').index() + 1,
				totalItems = $('div[id^="lc-carousel"] .owl-item').length;
			
			if(currentItem >= totalItems) {
				currentItem = 0;
			}
			
			owl.goTo(currentItem)
		}, 5000)
}

//listen for messages from an iframe and set the frame height 
if(!window.addEventListener){
	window.attachEvent("onmessage", function(e){
		//$(window).scrollTop(0);
		
		try{
			var data = $.parseJSON(e.data);
			if (!_.isEmpty(data) && _.isNumber(data.height)){
				var bufferHeight = data.height + 100;
				$('#rightNowContainer, #rightNowWrapper').height(bufferHeight);
			}
		}catch(e){
		}
	});
}else{
	window.addEventListener("message", function(e){
		//$(window).scrollTop(0);
		
		try{
			var data = $.parseJSON(e.data);
			$('#rightNowContainer, #rightNowWrapper').height(data.height);
		}catch(e){
		}
	});
}

function getUrlParams() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

//update the underscore template settings, to allow them to not conflict with erb syntax

function updateTotalInput(){
	$("#card_number").val($("input[name='payment_card_1']").val() +
			$("input[name='payment_card_2']").val() +
			$("input[name='payment_card_3']").val() +
			$("input[name='payment_card_4']").val()).change();
}

function updateDateInput(){
	$(".expdateFinal").val($("select[name='payment_expire_month']").val() + '/'+
			$("select[name='payment_expire_year']").val()).change();
}


$(document).ready(function(){
	$('.submit-on-change').change(function() {
		var quantity = $(this).val();
		var quantityOther = $(this).parents(".control-select").siblings(".control-select").find("select").val();
		var partNumber = $(this).parents(".cart-item-container").find("input[name^='catalogId_']").val();
		var fullQuantity = parseFloat(quantity) + parseFloat(quantityOther);
		if(!typeof utag_data.Products == "undefined"){
			utag_data.Products[partNumber].Units = fullQuantity + "";
			var fullTotalPrice = fullQuantity*parseFloat(utag_data.Products[partNumber].PriceFull);
			var price = fullTotalPrice/ fullQuantity;
			var discounts = parseFloat($(this).parents(".cart-item-container").find("input[name='contactDiscount']").val()).toFixed(2);
			if(discounts < 0){
				discounts = discounts*-1;
			}
			var discountUnit = discounts/fullQuantity;
			utag_data.Products[partNumber].Price = (parseFloat(utag_data.Products[partNumber].PriceFull) - discountUnit).toFixed(2)+"";
			var contactOldSubtotal = parseFloat($(this).parents(".cart-item-container").find(".contactLPrice").data("contactsubtotal")).toFixed(2);
			var diffSubtotal = parseFloat(fullTotalPrice - contactOldSubtotal).toFixed(2);		
			utag_data.Order_ProductsAmount = parseFloat(utag_data.Order_ProductsAmount) + diffSubtotal;
		}
		var orderItemId = $(this).data('orderitemid');
		CheckoutHelperJS.updateContactLensQuantity(orderItemId, null,quantity);
	});
	
	// handle footer email signup form
	if(window.EmailSignupForm != undefined){
		EmailSignupForm.setupValidation();
	}
	
	$('form[name="SearchbasedSearchForm"]').on('submit', function(e) {
		document.cookie = 'facets=; path=/';
		if($(this).find('input[name="searchTerm"').val().length == 0) {
			e.preventDefault();
			return false;
		}
	});
	
	if($('.plp-actions').length > 0){//On PLP make entire thumbnail display link to the PDP
		$('.catalog-item').on('click',function(e){
			if($(e.target).is('a')){
	            return;
	        }
			var pdpURL = $(this).find('a[id^=catalogEntry_img]').prop('href');
			window.location = pdpURL;
		});
	}
});



CommonFunctions.removeEmptyUtagEntries = function(utagObj){
    
    $.each(utagObj, function(key, val) {
          if (val == undefined) return; 
          
          if(val=="" || val==null){
                delete utagObj[key]             
          }
          if(typeof val == "string"){
	          val = val.replace(/\\/g, "\\\\");
	          val = val.replace(/'/g, "\\'");
	          val = val.replace(/"/g, "\\\"");
	          document.title = document.title.split(String.fromCharCode(8217)).join('');	// remove non-ascii apostrophe
          
          }else{
        	  if(utagObj.length <= 0){
        		  delete utagObj[key];
        	  }
          }
          utagObj[key]=val;
          
      });
};

/**
Colors required inputs orange when not filled
 */
(function($){
	$(document).ready(function(){
		setTimeout(function(){
			$('.orangeFill').each(function(){
				var $this = $(this);
				console.log('element: '+$this.attr('id')+', '+$this.attr('name')+'. Val: '+$this.val());
				if($this.val() && $this.val() != $this.attr('placeholder')) {
					$this.addClass('ok');
				} else {
					$this.removeClass('ok');
				}
			});
		}, 1000);	
		
		setTimeout(function(){
			$('.contact-section-number').each(function(){
				var $this = $(this);
				if($this.find("input[name=phone1_1]").val() === '' || $this.find("input[name=phone1_2]").val() === '' || $this.find("input[name=phone1_3]").val() === '') {
					$this.removeClass("orangeFill ok");
				} else {
					$this.addClass("orangeFill ok");
				}
			});
		}, 1000);	
	});
	
	$(document).on("change focusout focus", "input.orangeFill, select.orangeFill", function(e){
		var $this = $(this);
		if(e.type == "focusin") {
			$this.addClass("ok");
		} else {
			$this.val($this.val().trim());
			if($this.val() === '') {
				$this.removeClass("ok");
			} else {
				$this.addClass("ok");
			}
		}
	});
	$(document).on("change focusout focus", ".contact-section-number", function(e){
		var $this = $(this);
		if(e.type == "focusin") {
			$this.addClass("orangeFill ok");
		} else {
			if($this.find("input[name=phone1_1]").val() === '' || $this.find("input[name=phone1_2]").val() === '' || $this.find("input[name=phone1_3]").val() === '') {
				$this.removeClass("orangeFill ok");
			} else {
				$this.addClass("orangeFill ok");
			}
		}
	});
})(jQuery);

function closeVisibleDialog() {
	var $dialog = $('.ui-dialog:visible .ui-dialog-content');
	if($dialog.length < 1) return false;
	return $dialog.dialog('close');
}

/**
 * Global functionality
 */
(function(){
	/**
	 * Execute specific function calls when DOM is ready
	 */
	$(document).ready(function(){
		console.log('Initializing global functionality...');
		pdpColors();             // Initialize the PDP colors widget - must be called before accordionMenus();
		accordionMenus();        // Accordion menus functionality
		customPlaceholders();    // Custom placeholder labels for text fields
		setFavCounter();         // Favorites counter in the header
		headerActions();         // Open hamburger menu and search field
		globalSearch();          // Search form validation and submit
		listingViewChange();     // Switch between grid and list views
		goToTopLinks();          // Go to top links functionality
		loadMoreHandler();       // View more results functionality for PLP
		catalogFiltersHandler(); // Open and close filters dialog functionality
		filterBrands();          // Expanding Brands filter list
		side360Views();          // "Side View" and "360 View" buttons for PDP
		phoneSegments();         // Auto focus next phone segment and validate numbers
		replaceName();           // dynamically add the first, last or full name (of the user) to select elements
		perksExpand();           // Perks cards expand/collapse
		
		if(typeof StickyNavs === 'object')  StickyNavs.init(); // Initialize Sticky header functionality
	});

	/**
	 * Sets the header favorites counter
	 */
	function setFavCounter() {
		var $headerFavLink = $('#Header_MyFavorites_Link');
		if($headerFavLink.length) {
			var count = parseInt($('#headerWishListCount').val());
			if(count !== NaN && count > 0) {
				$headerFavLink.text(count).addClass('on');
				
				// update dash board count.
				if($('#AccountOverview_FavoritesViewAll_Link').html() != null) {
					$('#AccountOverview_FavoritesViewAll_Link').html(MessageHelper.messages["ACC_YOUR_FAVORITES"] + ' (' + count + ')');
				}
				// update count in wishlist display page.
				if($('#WishListDisplay_FavCount').html() != null) {
					$('#WishListDisplay_FavCount').html(count);
				}
			} else {
				// update dash board count.
				if($('#AccountOverview_FavoritesViewAll_Link').html() != null) {
					$('#AccountOverview_FavoritesViewAll_Link').html(MessageHelper.messages["ACC_YOUR_FAVORITES"] + ' (0)');
				}
			}
		}
	}

	/**
	 * Accordion menus
	 */
	function accordionMenus($ul) {
		var $accordions = $ul ? $ul : $('.accordion-menu');
		if(typeof($accordions.each) !== 'function' ) $accordions = $($accordions);
		$accordions.each(function(){
			var $this = $(this);
			if($this.data('accordioned') === 'yes') return true;
			$this.data('accordioned', 'yes');
			var $links = $this.children('li').children('a');
			if($links.length) {
				$links.each(function(){
					var $this = $(this);
					var $listItem = $this.parent();
					var $sibling = $this.siblings().first();
					if($sibling.length) {
						$this.on('click', function(e){
							e.preventDefault();
							$listItem.toggleClass('expanded');
							$this.toggleClass('expanded');
							$links.not($this).next().stop().slideUp('fast').parent().removeClass('expanded');
							$links.not($this).removeClass('expanded');
							$sibling.removeClass('hide');
							$sibling.stop().slideToggle('fast');
						});
					}
				});
			}
		});
	}

	// Shows the content after a given menu (used for MainMenu and catalog-filters)
	function hideContent($menu) {
		$menu || ($menu = $('#MainMenu'));
		window.visibleWrappers = $menu.nextAll('div:visible');
		window.visibleWrappers.data('scrollPos', $(window).scrollTop());
		window.visibleWrappers.customHide();
		$('#SiteFooter').customHide();
	}
	
	// Hides the content after a given menu (used for MainMenu and catalog-filters)
	function showContent($menu) {
		if(!window.visibleWrappers) return false;
		$menu || ($menu = $('#MainMenu'));
		window.visibleWrappers.customShow();
		$('#SiteFooter').customShow();
		$('html, body').scrollTop(window.visibleWrappers.data('scrollPos'));
		window.visibleWrappers = null;
	}
	
	// Sets handlers for the header action buttons
	function headerActions() {
		$('.header_icons a.header_menu_icon').on('click', function(e){
			e.preventDefault();
			closeVisibleDialog();
			
			var $this = $(this);
			var $search = $('#header_search_wrapper');
			var $mainMenu = $('#MainMenu');
			var $menuLinksContent = $('#MenuLinks .top_level_content');
			var $siteHeader = $('#header_wrapper');
			var $totalPage = $("#PageContainer");
			var $page = $("#content_wrapper_box");
			var $footer = $("#SiteFooter");
			
			if(!$mainMenu.is(':visible')){
				closeFilters();
				$("#header_search_wrapper").hide();
				$('body, html').scrollTop(0);
				$("body, html").css({"overflow": "hidden", "-webkit-overflow-scrolling": "touch", "position": "relative", "height": "100vh"});
				$('.plp-actions').customHide();
				window.setTimeout(function() {
					$mainMenu.show(0, function() {
						$mainMenu.find('.top_level_header_icon a.close_icon').addClass('open');
						$menuLinksContent.slideDown(500);
					});
				}, 100);
			}
		});
		
		$('.top_level_header_icon a.close_icon').on('click', function(e){
			e.preventDefault();
			closeVisibleDialog();
			
			var $this = $(this);
			var $search = $('#header_search_wrapper');
			var $mainMenu = $('#MainMenu');
			var $menuLinksContent = $('#MenuLinks .top_level_content');
			var $siteHeader = $('#header_wrapper');
			var $totalPage = $("#PageContainer");
			var $page = $("#content_wrapper_box");
			var $footer = $("#SiteFooter");
			var $visiblePage = $('.second-level:visible');
			
			if($mainMenu.is(':visible')){
				$this.removeClass('active');
				window.setTimeout(function() {
					if ($visiblePage.length > 0) {
						$visiblePage.closest('.top-level').hide(0, function() {
							$mainMenu.find('.top_level_header_icon a.close_icon').removeClass('open');
							$menuLinksContent.slideUp(500, function() {
								$mainMenu.fadeOut(100);
							});
						});
					} else {
						$mainMenu.find('.top_level_header_icon a.close_icon').removeClass('open');
						$menuLinksContent.slideUp(500, function() {
							$mainMenu.fadeOut(100);
						});
					}
				}, 100);
				$("body").css("overflow","scroll");
				$('.plp-actions').customShow();
			}
		});
		
		$('.header_icons a.header_search_icon').on('click', function(e){
			e.preventDefault();
			closeVisibleDialog();
			var $this = $(this);
			$('.header_icons a').removeClass('active');
			var $search = $('#header_search_wrapper');
			var $mainMenu = $('#MainMenu');
			var $siteHeader = $('#header_wrapper');
			var $insuranceBox = $("#header-shield-box");
			var $page = $("#content_wrapper_box");
			var $footer = $("#SiteFooter");
			var $totalPage = $("#PageContainer");
			var $height = parseInt($(document).height());
			closeFilters();
			if($mainMenu.is(':visible')) {
				$mainMenu.customHide();
				$(".header_menu_icon").toggleClass("open");
				showContent();
				$('.header_icons a.header_menu_icon').removeClass('active');
			}
			
			// Lock page scrolling
			$('body, html').css({"overflow": "hidden", "-webkit-overflow-scrolling": "touch", "position": "relative", "height": "100vh"});
			
			if($search.is(':visible')){
				$search.customHide();
			} else {
				if($search.data('blurred') === true) {
					$search.data('blurred', false);
					$siteHeader.css({'border-bottom': ''});

					return true;
				}
				$search.detach().insertBefore('#MainMenu').customShow();
				$search.find('#SimpleSearchForm_SearchTerm').focus();
				$('body, html').scrollTop(0);
			}
		});
		
		$('#header_searchbar_container a.header_close_icon').on('click touchmove', function(e) {
			e.stopPropagation();
			
			// Unlock page scrolling
			$('body, html').css('overflow', 'auto');
			
			// Hide search results
			$('#header_search_wrapper').addClass('hide');
		});
	}
	
	// Toggles the filters menu.  If parameter close is true, this forces the filters to close.
	function openCloseFilters(close){
		var $filtersButton = $('.open-filters');
		var $filters = $('.catalog-filters');
		if($filters.is(':visible') || close) {
			$filtersButton.removeClass('open');
			$filters.customHide();
			showContent($filters.parent());
		} else {
			$filtersButton.addClass('open');
			$('.sortByFacetTemp').css('display', 'none');
			var top = (typeof(StickyNavs) === 'object' && typeof(StickyNavs.getTopOffset) === 'function')
					  ? StickyNavs.getTopOffset($('.plp-actions'))
					  : $('.plp-actions').offset().top;
			hideContent($filters.parent());
			$filters.customShow();
			
			$('html, body').scrollTop(top);
		}
	}
	
	// Closes the filters
	function closeFilters() {
		return openCloseFilters(true);
	}
	
	// Sets handlers for the filters menu
	function catalogFiltersHandler() {
		var $filtersButton = $('.open-filters');
		if($filtersButton.length < 1) return false;
		
		$('.filter-buttons .cancel').on('click', function(e){
			closeFilters();
		});
		
		$('.faceted_search_sidebar .filter-options input').on('click', function(e){
			var $this = $(this);
			
			categoryDisplayJS.toggleFacet($this.attr('data-label'), $this.attr('data-value'));
			categoryDisplayJS.toggleSeoOverrideValue($this.attr('data-label'), $this.attr('data-seo'));
			
			return true;
		});
		
		$('.faceted_search_sidebar .filter-options a').on('click', function(e){
			var $this = $(this);
			if($this.hasClass('facet-link-selected')){
				$this.removeClass('facet-link-selected');
			}else{
				$this.addClass('facet-link-selected');
			}
			categoryDisplayJS.toggleFacet($this.attr('data-label'), $this.attr('data-value'));
			categoryDisplayJS.toggleSeoOverrideValue($this.attr('data-label'), $this.attr('data-seo'));
			return true;
		});
		
		$('.sort-by .accordion-menu > li > a').on('click', function(){
			openCloseFilters(true);
		});
	}
	
	function globalSearch() {
		$('form[name="CatalogSearchForm"]').on('submit', function(e) {
			document.cookie = 'facets=; path=/';
			if($('#SimpleSearchForm_SearchTerm').val().length == 0) {
				e.preventDefault();
				return false;
			}
		});		
	}
	
	// Functionality for custom placeholders, used in the main Search form and in the footer's Sign Up form
	function customPlaceholders() {
		$('.custom-placeholder + input').on('blur focus', function(e) {
			if(e.type === 'focusin' || e.type === "focus") {
				$(this).prev('.custom-placeholder').customHide();
			} else {
				initPlaceholder();
			}
		});
		$('.custom-placeholder').on('click', function(e) {
			$(this).next('input').focus();
		});
		function initPlaceholder() {
			$('.custom-placeholder + input').each(function(){
				var $input = $(this);
				if(!$input.val().length) {
					$input.prev('.custom-placeholder').customShow();
				} else {
					$input.prev('.custom-placeholder').customHide();
				}
			});
		}
		initPlaceholder();
	}
	
	// Changes the view in PLP pages - from grid to list
	function listingViewChange() {
		
		var $viewSwitches = $('.change-view');
		if($viewSwitches.length < 1) {
			$('.product-list-container').customShow();
			return false;
		}
		
		var $productList = $('#product_list_container');
		
		$viewSwitches.on('click', function(e){
			e.preventDefault();
			var $this = $(this);
			if($this.hasClass('selected')) return true;
			if($this.hasClass('list')) {
				switchView('list');
			}
			if($this.hasClass('grid')) {
				switchView('grid');
			}
		});
		
		function switchView(type) {
			
			if($productList.length < 1) return false;
			
			type = setViewCookie(type);
			$productList.fadeOut("fast");
			$productList.queue(function(){
				var $this = $(this);
				$this.removeClass('list');
				$this.removeClass('grid');
				$this.addClass(type);
				$this.fadeIn("fast");
				$this.dequeue();
				
				var $viewSwitches = $('.change-view');
				$viewSwitches.addClass('selected');
				$viewSwitches.not('.'+type).removeClass('selected');
			});
		}
		
		function setViewCookie(value) {
			value = ((value !== 'list') && (value !== 'grid')) ? 'list' : value;
			$.cookie('plpViewMode', value, {expires: 15})
			return value;
		}
		
		var viewCookie = $.cookie('plpViewMode');
		switchView(viewCookie);
	}
	
	function goToTopLinks() {
		var $gttLinks = $('.go-to-top');
		if($gttLinks.length < 1) return false;
		$gttLinks.on('click', function(e){
			e.preventDefault();
			$('html, body').animate({scrollTop: 0}, "fast");
		});
	}
	
	function loadMoreHandler() {
		window.pageSize ||  (window.pageSize = 20);
		window.totalCount ||  (window.totalCount = 100);
		window.totalContentCount ||  (window.totalContentCount = 100);
		window.AjaxCategoriesDisplayView ||  (window.AjaxCategoriesDisplayView = "");
		window.SearchDisplayContentView ||  (window.SearchDisplayContentView = "");
		var isViewMoreClicked = false;
		
		var beginIndex = 0;
		$('#viewMoreProducts').on('click', function(e){
			e.preventDefault();
			beginIndex += window.pageSize;
			//console.debug('isViewMoreClicked ' + isViewMoreClicked);
			
			if(!isViewMoreClicked) {
				$("#moreProductsToDisplay").append(
						$('<div>').addClass('loadingIcon')
				);
				
				$('#viewMoreProducts').addClass('disabled');
				isViewMoreClicked = true;
				
				$.ajax({
					url: window.AjaxCategoriesDisplayView,
					type: 'post',
					data: {
						'beginIndex' : beginIndex 
					},
					success: function(result) {
						
						var $itemsShown = $('.items-shown');
						var currentItems = parseInt($itemsShown.first().text());
						var resultCount = Object.keys(JSON.parse(result)).length;
						var tempCount = resultCount + currentItems;
						if(tempCount >= window.totalCount){
							$itemsShown.text(window.totalCount);
						}
						else{
							$itemsShown.text(resultCount + currentItems);
						}
						var widget = $("#moreProductsToDisplay");
						widget.find('.loadingIcon').detach().remove();
						widget.getProductInfo({data: result});
						//console.debug('pageSize = ' + window.pageSize + ' window.totalCount ' + window.totalCount + ' currentItems ' + currentItems + ' resultCount ' + resultCount);
						if(beginIndex + window.pageSize >= window.totalCount){ 
							 $('#viewMoreProducts').addClass('hide');
				 		}
						$('.catalog-item').on('click',function(e){
							var pdpURL = $(this).find('a[id^=catalogEntry_img]').prop('href');
							if($(e.target).is('a')){
					            return;
					        }
							window.location = pdpURL;
						});
						$('#viewMoreProducts').removeClass('disabled');
						isViewMoreClicked = false;
						categoryDisplayJS.updateFavoriteLinks('TopCategoriesDisplay');
					}
				});
			}
		});
		
		
		$('#addEyeExamDetails').click(function(e){
			e.preventDefault();
			$(".error-message").remove();
			var f = $(this).parents('form');
			var $form = $('#addEyeExamSubmitForm');
	        var phone11 = $form.find('input[name=phone1_1]').val();
	          var phone12 = $form.find('input[name=phone1_2]').val();
	          var phone13 = $form.find('input[name=phone1_3]').val();
	          var phone1 = '(' + phone11 + ')' + phone12 + '-' + phone13;
	          $form.find('input[name=phone1]').val(phone1);
	          var month_val = $('#dobMonth_1').val();
	          var day_val = $('#dobDay_1').val();
	          var year_val = $('#dobYear_1').val();
	          if ( month_val < 10 ) {
	        		month_val = "0" + month_val;
	        	} else {
	        		month_val;
	        	}
	          if ( day_val < 10 ) {
	        	  day_val = "0" + day_val;
	        	} else {
	        		day_val;
	        	}
	        var DOB_format = month_val+'/'+day_val+'/'+year_val;
	        $form.find('input[name=dob]').val(DOB_format);
			var newData = f.serializeArray();
			
			if(f.valid()){
				addSyncValueToDb($form);
			}else{
				 $('html, body').animate({
                    scrollTop: $('.required.error-message:first').offset().top-60
                }, 2000);
                $('.required.error-message:first').focus();
			}
		});
		$('.unSyncContinue').on('click',function(){
		      var formData = $('#UnsyncppointmentForm').serializeArray();
		              $.ajax({
					      url: getAbsoluteURL(true) + 'AjaxUserRegistrationUpdate',
					      data: formData,
					      dataType: 'json',
					      crossDomain: true,
					      success: function(data) {
					        if(data.success) {
					              window.location.href=$('#addEyeExamURL').val();
					        }
		              },
		      });
		              
		});
		
		$('form#addEyeExamSubmitForm, form#accountPersonalizationForm').each(function(){
			var $thisEyeExam = $(this);
			var phone11 = $thisEyeExam.find('input[name=phone1_1]'),
				phone12 = $thisEyeExam.find('input[name=phone1_2]'),
				phone13 = $thisEyeExam.find('input[name=phone1_3]');
			setupPhoneFields(phone11, phone12, phone13);
		});
		/**
		$("input[name=phone1_1]").keyup(function() {
		   $("input[name=phone1_1]").val(this.value.substring(0,3));
		});

		$("input[name=phone1_2]").keyup(function() {
		   $("input[name=phone1_2]").val(this.value.substring(0,3));
		});

		$("input[name=phone1_3]").keyup(function() {
		   $("input[name=phone1_3]").val(this.value.substring(0,4));
		});
		**/
		$.validator.addMethod("validPhoneCheck", function (value, element) {
			var phoneVal=true;
			var phoneLength=0;
			phoneLength = $("input[name=phone1_1]").val().length+$("input[name=phone1_2]").val().length+$("input[name=phone1_3]").val().length;
			if(phoneLength > 0 && phoneLength < 10){
				phoneVal = false;
			}
			return phoneVal;
	    },MessageHelper.messages["PHONE_FIELDS_ERROR"]);
		
		$.validator.addMethod("validDOB", function (value, element) {
			var month = $( "#dobMonth_1").val();
			var day = $( "#dobDay_1").val();
			var year = $( "#dobYear_1").val();
			if(year != '' && month != '' && day != ''){
				var dateToCompare = new Date(year, month, day);
			    var currentDate = new Date();
			    if (dateToCompare > currentDate) {
			    	return false;
			    }
			}
			return true;
	    },MessageHelper.messages["BDAY_FIELDS_INVALID"]);
		
		$.validator.addMethod("validLeapYear", function (value, element) {
			var month = $( "#dobMonth_1").val();
			var day = $( "#dobDay_1").val();
			var year = $( "#dobYear_1").val();
			var date = new Date(year, month-1, day);
			if(year != '' && month != '' && day != ''){
				if(date.getFullYear() == year && date.getMonth()+1 == month && date.getDate() == day){
					return true;
				}else{
					return false;
				}
			}
			return true;
	    },MessageHelper.messages["BDAY_FIELDS_INVALID"]);
		
		
		$('#addEyeExamSubmitForm').validate({
			onfocusout: false,
	        onkeyup: false,
	        onclick: false,
	        errorClass: 'required',
	        errorElement: 'div',
	        rules: {
	            firstName: {required:true},
	            lastName: {required:true},
	            dobMonth: {validDOB:true, validLeapYear:true, required:true},
	            dobDay: {validDOB:true, validLeapYear:true, required:true},
	            dobYear: {validDOB:true, validLeapYear:true, required:true},
	            phone1_1: {validPhoneCheck:true, required:true, minlength: 3},
				phone1_2: {validPhoneCheck:true, required:true, minlength: 3},
				phone1_3: {validPhoneCheck:true, required:true, minlength: 4},
				consentCheckbox: {required:true}
	        },
	        messages: {
	            firstName: MessageHelper.messages["ERROR_FIELD_REQ"],
	            lastName: MessageHelper.messages["ERROR_FIELD_REQ"],
	            dobMonth: {
	                required: MessageHelper.messages["BDAY_FIELDS_REQ"]
	            },
	            dobDay: {
	                required: MessageHelper.messages["BDAY_FIELDS_REQ"]
	            },
	            dobYear: {
	                required: MessageHelper.messages["BDAY_FIELDS_REQ"]
	            },
	            phone1_1: {
	                required: MessageHelper.messages["ERROR_FIELD_REQ"]
	            },
	            phone1_2: {
	                required: MessageHelper.messages["ERROR_FIELD_REQ"]
	            },
	            phone1_3: {
	                required: MessageHelper.messages["ERROR_FIELD_REQ"]
	            },
	            consentCheckbox: MessageHelper.messages["ERROR_CONSENT_CHECKBOX"]
	        },
	        errorPlacement: function (error, element)
	        {
	            var noErrorElements = [];
	            var found = false;
	            for (var i = 0; i < noErrorElements.length; i++){
	                found = found || (noErrorElements[i] == element.attr("name"));
	            }
	            
	            if(!found){
	            	if($(element).attr('name') == 'consentCheckbox'){
	            		$(error).css({float:'none', display:'block'}).insertAfter($(element).next())
	                }else{
	                	if($(element).attr('name').indexOf ('dob') != -1 || $(element).attr('name').indexOf ('phone') != -1){
	                		element.parent ().append (error).addClass('validationError');
	                    }else{
	                    	$(error).addClass('validationError').insertAfter(element);
	                    }
	                }
	            }
				
	            if($(element).attr('name') == 'firstName'){
	            	error.addClass('error-message error-firstname-repeat').insertBefore(element.closest('form'));	
                }
	            if($(element).attr('name') == 'lastName'){
	            	error.addClass('error-message error-lastname-repeat').insertBefore(element.closest('form'));	
                }
	            if($(element).attr('name') == 'dobDay' || $(element).attr('name') == 'dobMonth' || $(element).attr('name') == 'dobYear'){
	            	error.addClass('error-message error-dob-repeat').insertBefore(element.closest('form'));	
                }
	            if($(element).attr('name') == 'phone1_1' || $(element).attr('name') == 'phone1_2' || $(element).attr('name') == 'phone1_3'){
	            	error.addClass('error-message error-phone-repeat').insertBefore(element.closest('form'));	
                }
	            if( $(element).attr('name') == 'consentCheckbox'){
	            	error.addClass('error-message error-consent-repeat').insertBefore(element.closest('form'));	
                }
	            error.attr('aria-label',$(element).attr('name')+': '+error.text()).attr('tabindex',0);
	            $(element).focus();
	            error_list.push(error.text());
	        },
	        showErrors: function(errorMap, errorList){
	            this.defaultShowErrors();
	            
	            $('.addMyExams div.error-phone-repeat:visible').each(function(i, obj) {
	                if($(this).text() == MessageHelper.messages["PHONE_FIELDS_ERROR"]){
	                	$('.addMyExams div.error-phone-repeat:visible').text(MessageHelper.messages["PHONE_FIELDS_ERROR"]);
	                }
	            });
	            
	            // prevent multiple copies of the same error from displaying
	            $('.addMyExams div.error-firstname-repeat').filter(function(i){return i != 0;}).hide();
	            $('.addMyExams div.error-lastname-repeat').filter(function(i){return i != 0;}).hide();
	            $('.addMyExams div.error-dob-repeat').filter(function(i){return i != 0;}).hide();
	            $('.addMyExams div.error-phone-repeat').filter(function(i){return i != 0;}).hide();
	            $('.addMyExams div.error-consent-repeat').filter(function(i){return i != 0;}).hide();
	            
	            $('.dobMonthData div.required:visible').filter(function(i){return i != 0;}).hide();
	            $('.phoneDetails div.required:visible').filter(function(i){return i != 0;}).hide();

	            if($('.phoneDetails span.required:visible').length > 0){
	            	$('.phoneDetails').addClass('validationError');
	            };
	        },
	        highlight: function(element, errorClass) 
	        {
	           $(element).addClass ("required");
	           $(element).parent().addClass('validationError');
	        },
	        unhighlight: function(element, errorClass) 
	        {
	           $(element).removeClass ("required");
	           $(element).parent().removeClass('validationError');
	        }
		});  
		
		$('#ViewmoreEyeExams').on('click',function(e){
			e.preventDefault();
			var hideDivCount = $('.pasteyeexam .bookEyeExam.hideEyeExam').length;
	        if(pastExamCount <= hideDivCount){
			$('.view-more-eye-exam').css('display', 'none');
		}
			var totalRow = $('.pasteyeexam .bookEyeExam').length, noOfRowsShow = 4;
			var hiddenRow = $('.pasteyeexam .bookEyeExam.hideEyeExam').length;			
			if(hiddenRow){
				var hiddenContent = $('.pasteyeexam .bookEyeExam.hideEyeExam:lt(4)').removeClass('hideEyeExam').addClass('showEyeExam');			
			}
			var showDivCount = $('.pasteyeexam .showEyeExam').length;
			if(pastExamCount <= showDivCount){
				$('.view-more-eye-exam').css('display', 'none');
			}
			
		});
		
		
		$('#viewMoreContent').on('click', function(){
			beginIndex += window.pageSize;//${pageSize};
				$("#moreContentToDisplay").append(
						$('<div>').addClass('loadingIcon')
				);
			$.ajax({
				url: window.SearchDisplayContentView,
				type: 'post',
				data: {
					'beginIndex' : beginIndex 
				},
				success: function(result) {
						$('#moreContentToDisplay').addClass('search-content-result-holder');
						var $contentShown = $('.content-shown');
						var currentItems = parseInt($contentShown.first().text());
						var resultCount = Object.keys(JSON.parse(result)).length;
						$contentShown.text(resultCount + currentItems);
						
						var widget = $("#moreContentToDisplay");
						widget.find('.loadingIcon').detach().remove();
						widget.getProductInfo({data: result});
						
						if(beginIndex + 20 >= window.totalContentCount){ 
							 $('#viewMoreContent').addClass('hide');
				 		}
					}
			});
		});
	}
	
	function pdpColors() {
		var $title = $('.colors-widget > p');
		var $colorLinks = $('.colors-widget > a');
		var $selectedColor = $colorLinks.filter('.selected').first();
		if($selectedColor.length < 1) $selectedColor = $colorLinks.first();
		if($colorLinks.length < 1) {
			return false;
		} else if($colorLinks.length < 4) {
			$title.text($selectedColor.text());
		}
	}
	
	// initializes the Brands facets section, sets up markup, alphabetical sorting, tabs functionality.
	function filterBrands() {
		var $brandsList = $('.facet-brand .brands-list');
		if($brandsList.children().length < 6) return false;
		
		// Create a container for the always-visible brands (brand logos)
		var $visible = $('<div class="brands-list images"></div>').insertBefore($brandsList);
		
		// Create the open/close "button"
		var $button = $('<a class="show-more">Show all Brands</a>').insertAfter($brandsList);
		
		$brandsList.children('div').each(function(index){
			var $this = $(this);
			if(index < 6) {
				// first six brands get attached to the always-visible container
				$this.detach().appendTo($visible);
			}else {
				// add a custom data field with the first letter of the brand, for filtering
				$this.data('starts', $this.find('a').text().trim().toLowerCase().substr(0,1));
			}
		});
		
		// Create the alphabetical tabs
		var $tabs = $('<div>')
					.addClass('tabs')
					.append($('<a href="#">').text('A - D').addClass('selected'))
					.append($('<a href="#">').text('E - O'))
					.append($('<a href="#">').text('P - Z'))
					.prependTo($brandsList);
		
		// Alphabetical tabs click handler
		$tabs.find('a').on('click', function(e){
			e.preventDefault();
			var $this = $(this);
			
			$this.siblings('a').removeClass('selected');
			$this.addClass('selected');
			
			showTab($this.index() + 1);
			
		});
		
		// Shows the appropriate brands according to alphabetical filter
		function showTab(index) {
			var indices = {'1': /[a-d]+/, '2': /[e-o]+/, '3': /[p-z]+/};
			var $container = $('.brands-list:not(.images)');
			$container.find('div').customHide();
			var filter = indices[index];
			$container.find('div')
					  .filter(function(){return filter.test($(this).data('starts'))})
					  .customShow();
		}
		
		// Initialize the tabs by showing first one initially
		showTab(1);
		
		// Hide the brands, only show the first six at the beginning
		$brandsList.customHide();
		
		// Click handler for open/close button
		$button.on('click', function(){
			var $this = $(this);
			$this.toggleClass('expanded');
			if($(this).hasClass('expanded')){
			$('.show-more').text("Show less Brands");
			}else{
				$('.show-more').text("Show all Brands");	
			}
			$brandsList.customToggle();
			if(!$brandsList.is(':visible')){
				$('html, body').animate({scrollTop: $visible.offset().top}, 'fast');
			}
		});
	}
	
	function side360Views() {
		$('#360View').on("click mousedown touchstart", function() {
			var $this = $(this);
			$this.siblings().removeClass('active');
			$this.addClass('active');
			$('#regularImage').customHide();
			$('#s7_spinview').customShow();
		});
		$('.sideView').on("click mousedown touchstart", function() {
			var $this = $(this);
			$this.siblings().removeClass('active');
			$this.addClass('active');
			$('#regularImage').customShow();
			$('#s7_spinview').customHide();
		});
	}
	$.fn.fakeNextInput = function(selector) {
		selector = selector ? selector : '';
	    var sel = this;
	    var nextel = sel;
	    while(nextel.next().length){
	    	nextel = nextel.next('input').length ? nextel.next('input') : nextel.next();
	    	if(nextel.is((selector ? selector : 'input'))) break;
	    }
	    
	    if(nextel.is(sel) || nextel.length < 1) return false;
	    
	    var between = sel.nextUntil(nextel);
	    
	    var nextval = nextel.val();
	    var nextid = nextel.attr('id');
	    var nextname = nextel.attr('name');
	    var nextmax = nextel.attr('maxlength');
	    var nextpat = nextel.attr('pattern');
	    nextel.val(sel.val());
	    nextel.attr('id', sel.attr('id'));
	    nextel.attr('name', sel.attr('name'));
	    nextel.attr('maxlength', sel.attr('maxlength'));
	    nextel.attr('pattern', sel.attr('pattern'));
	    sel.val(nextval);
	    sel.attr('id', nextid);
	    sel.attr('name', nextname);
	    sel.attr('maxlength', nextmax);
	    sel.attr('pattern', nextpat);
	    
	    nextel.detach().insertBefore(sel);
	    between.detach().insertBefore(sel);
	    
	    return this;
	};
	
	function phoneSegments() {
		var $phoneSegment = $('.phone-segment');
		if($phoneSegment.length < 1) return false;
		
		$phoneSegment.on('keyup', function(e){
			var $this = $(this);
			$this.val($this.val().replace(/\D/g,''));
			if($this.val().length >= $this.attr('maxlength')) {
				if($this.fakeNextInput('input.phone-segment')) $this.select();
			}
		});
		$phoneSegment.on('click', function(){
			$(this).select();
		});
	}
	
	function replaceName() {
		var firstName = $('input[name="firstName"]').val();
		var lastName  = $('input[name="lastName"]') .val();
		
		$('.replace-name').each(function(){
			var $this  = $(this);
			console.log($this.attr('data-before'));
			var before = $this.attr('data-before') !== undefined ? $this.attr('data-before'): '';
			var after  = $this.attr('data-after')  !== undefined ? $this.attr('data-after'):  '';
			
			var name = '';
			
			if($this.hasClass('first-name') && firstName !== '') name += firstName;
			if($this.hasClass('last-name') &&  $this.hasClass('first-name') && lastName !== '') name += ' ' + lastName;
			if($this.hasClass('last-name') &&  !$this.hasClass('first-name') && lastName !== '') name += lastName;
			if($this.hasClass('full-name')) name += firstName + lastName !== '' ? (' ' + lastName) : '';
			
			name = name.trim();
			
			name = before + name;
			name += after;
			
			if(name.trim() !== '') $this.text(name);
		});
		
	}
	
	function perksExpand() {
		$('body').on("click", ".perks-offer > a:first-child", function(e){
			e.preventDefault();
			var $this = $(this);
			$('.perks-offer').not($this.parent()).find('.restrictions').stop().slideUp('fast');
			$('.perks-offer >a:first-child').not($this).removeClass('active');
			$this.siblings('.restrictions').stop().slideToggle('fast');
			$this.toggleClass('active');
		});
	}
})(jQuery);

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

/**
* Scroll the browser to the given element on the page
* @param el the element to scroll to
*/
function scrollToElement(el, scrollTime, offset){
	if (offset == undefined) offset = 20;
	if (el != null && $(el).offset() != null){
		var t = 2000;
		if (scrollTime != null){
			t = scrollTime;
		}
		
		var page = $('html, body').clearQueue();
		if (t == 0){
			page.scrollTop($(el).offset().top - offset);
		}else{
			page.animate(
		    {
		        scrollTop: $(el).offset().top - offset
		    }, t, 'easeOutQuint');
		}
	}
}
(function( $ ) {
	  $.fn.basicTabs = function(options){
	    var settings = $.extend({
	      active_class: "is-active",
	      open_class: "is-open",
	      list_class: "c-tabs",
	      starting_tab: 1
	    }, options );

	    $("." + settings.list_class).each(function() {
	      $(this).children('li:nth-child(' + settings.starting_tab + ')' ).children('a').addClass(settings.active_class).next().addClass(settings.open_class).show();
	    });    
	    $("." + settings.list_class).on('click', 'li > a.c-tabs__link', function(event) {
	      if (!$(this).hasClass(settings.active_class)) {
	        event.preventDefault();
	        var tabs = $(this).closest("." + settings.list_class);
	        tabs.find("." + settings.open_class).removeClass(settings.open_class).hide();

	        $(this).next().toggleClass(settings.open_class).toggle();
	        tabs.find("." + settings.active_class).removeClass(settings.active_class);
	        $(this).addClass(settings.active_class);
	      } else {
	        event.preventDefault();
	      }
	    });
	  };
	}( jQuery ));


function refreshNotifications(){
    var thisUrl = getAbsoluteURL()+'AjaxAccountNotificationsView?storeId='+constants.ajaxParams['storeId']+'&catalogId='+constants.ajaxParams['catalogId']+'&langId='+constants.ajaxParams['langId'];
    $.ajax({ url: thisUrl,
          dataType: 'html',
        success: function(response){
                if(response.indexOf("totalNoOfAlerts")>0){
                      document.getElementById('ajaxRefreshNotifications').innerHTML = response;
                      var counter = document.getElementById('totalNoOfAlerts').value;
                      if(counter>0){
                            $('.notification-count').css('display','inline-block');
                      }                       
                }
          }
    });
}

function addSyncValueToDb(eyeExamHistoryForm){
	var pf = $(eyeExamHistoryForm);
	var showWaitModal = $('.showWaitModalForAddExam').val() || '';
	var eyeExamDelayTimeMs = $('#eyeExamDelayTimeMs').val() || '';
	$.ajax({
		url: getAbsoluteURL(true) +  'AjaxUserRegistrationUpdate',
		data: pf.serializeArray(),
        dataType: 'json',
        crossDomain: true,
		success: function(data) {
			console.log(eyeExamDelayTimeMs);
			// show the modal pop up and reload only for the first sync. If user is resyncing update the MBRATTR correspondingly
			if(showWaitModal === 'true' && showWaitModal !== '' && $('#reSyncUser').length == 0){
				$(".showWaitModalContainer").dialog('open');
				setTimeout(function() { 
					//call one more ajax to retrive all eye exam data
					$.ajax({
						url: getAbsoluteURL(true) +  'LCAjaxEyeExamHistorySyncCmd',
						data: pf.serializeArray(),
				        dataType: 'json',
				        crossDomain: true,
						success: function(data) {
							//$(".showWaitModalContainer").dialog('close');
							window.location.href=$('#EyeExamHistoryURL').val();
						}
					});
				}, eyeExamDelayTimeMs);
			}else{
				$.ajax({
					url: getAbsoluteURL(true) +  'LCAjaxEyeExamHistorySyncCmd',
					data: pf.serializeArray(),
			        dataType: 'json',
			        crossDomain: true,
					success: function(data) {
						//$(".showWaitModalContainer").dialog('close');
						window.location.href=$('#EyeExamHistoryURL').val();
					}
				});
			}
		},error: function(jqXHR, textStatus, errorThrown) { //unexpected error case - system error
			console.log('error is -' + errorThrown);
		}
	});
}


function checkMobile(phoneWrapClass){
	if($(phoneWrapClass + ' :visible').find('select :selected').text().indexOf('Mobile') > -1){
		return true;
	}
}
$(document).ready(function() {
	
	$('#shippingAddressForm .insert-manually input').on('change', function() {
        AddressHelperJS.avalaraFail=false;
        return false;
    });
    
    $('#shippingAddressForm .insert-manually select').on('change', function() {
        AddressHelperJS.avalaraFail=false;
        return false;
    });
	
    $("#addEyeExamSubmitForm input[name=phone1_1], #accountPersonalizationForm input[name=phone1_1]").keyup(function() {
        $("input[name=phone1_1]").val(this.value.substring(0, 3));
        if (this.value.length == 3) {
        	$("input[name=phone1_2]").focus();
          }
    });
    
	$(document).on('focus', '.pd-select-one .drop_down_checkout', function(){ 		
	    var _dlCopy = $.extend(true, {}, _dl);
	    _dlCopy.site_events = {"select_pupillary_distance": "true"};   
	    var indexEl = $("#currentItemIndex").val();
	    if ( indexEl>=0 && _dl.products_in_cart != undefined && _dl.products_in_cart.length > indexEl ) {
	        _dlCopy.product = [_dl.products_in_cart[indexEl]];
	    }                
	    callTrackAnalytics(_dlCopy);		
	});
	
	$(document).on('change', '.pd-select-one .drop_down_checkout', function(){
		$(this).blur();
	});
	
    $("#addEyeExamSubmitForm input[name=phone1_2], #accountPersonalizationForm input[name=phone1_2]").keyup(function() {
        $("input[name=phone1_2]").val(this.value.substring(0, 3));
        if (this.value.length == 3) {
        	$("input[name=phone1_3]").focus();
          }
    });

    $("#addEyeExamSubmitForm input[name=phone1_3], #accountPersonalizationForm input[name=phone1_3]").keyup(function() {
        $("input[name=phone1_3]").val(this.value.substring(0, 4));
    });
    
    $.validator.addMethod("check_date_of_birth", function(value, element) {

        var day = $("#dobDay_1").val();
        var month = $("#dobMonth_1").val();
        var year = $("#dobYear_1").val();
        var age = 18;

        var mydate = new Date();
        mydate.setFullYear(year, month - 1, day-1);

        var currdate = new Date();
        currdate.setFullYear(currdate.getFullYear() - age);

        return currdate > mydate;

    }, "You must be 18 years old to view eye exam information");
    $.validator.addMethod("check_date_of_birth_future", function(value, element) {

        var day = $("#dobDay_1").val();
        var month = $("#dobMonth_1").val();
        var year = $("#dobYear_1").val();

        var mydate = new Date();
        mydate.setFullYear(year, month - 1, day-1);

        var currdate = new Date();

        return currdate > mydate;

    }, "The provided birthday is invalid");
    $('form#accountPersonalizationForm #phone1Type_1').on('change', function(e) {
        e.preventDefault();
        if (checkMobile('.phoneNumeber')) {
            if (!$('.smsAgreement').is(':visible')) {
                $('.smsAgreement').show();
            }
        } else {
            //Uncheck SMS OptIn box to ensure validation passes
            $('input[name="offersCheckbox"]').attr('checked', false);
            $('.smsAgreement').hide();
            $('.phoneNumeber span.required:visible').hide();
        }
    });
    $.validator.addMethod("validAlphaNumberPurchaseSync", function (value, element) {
		if( value.match(/^([a-zA-Z0-9]+)$/) ) {
		     return true;
		}
		return false;
    },"Please enter a valid receipt number");
    
    $('#accountPersonalizationForm').validate({
        onkeyup: false,
        onclick: false,
        errorClass: 'required',
        errorElement: 'span',
        onfocusout: false,
        errorContainer: "#errorContainer", 
        errorLabelContainer: "#errorContainer", 
        rules: {
            firstName: {
                required: {
                    depends: function(element) {
                        return ($('form#accountPersonalizationForm .doctorDisplay input[type="checkbox"]').is(':checked'));
                    }
                }
            },
            lastName: {
                required: {
                    depends: function(element) {
                        return ($('form#accountPersonalizationForm .doctorDisplay input[type="checkbox"]').is(':checked') || $('form#accountPersonalizationForm .purchaseDisplayinfo input[type="checkbox"]').is(':checked'));
                    }
                }
            },
            phone1_1: {
                required: {
                    depends: function(element) {
                        return ($('form#accountPersonalizationForm .doctorDisplay input[type="checkbox"], form#accountPersonalizationForm .smsAgreement input[type="checkbox"]').is(':checked') || ($('form#accountPersonalizationForm input[name=phone1_2]').val()!== '') || ($('form#accountPersonalizationForm input[name=phone1_3]').val()!== ''));
                    }
                },
                minlength: 3,
                number: true
            },
            phone1_2: {
                required: {
                    depends: function(element) {
                        return ($('form#accountPersonalizationForm .doctorDisplay input[type="checkbox"], form#accountPersonalizationForm .smsAgreement input[type="checkbox"]').is(':checked') || ($('form#accountPersonalizationForm input[name=phone1_1]').val()!== '') || ($('form#accountPersonalizationForm input[name=phone1_3]').val()!== ''));
                    }
                },
                minlength: 3,
                number: true
            },
            phone1_3: {
                required: {
                    depends: function(element) {
                        return ($('form#accountPersonalizationForm .doctorDisplay input[type="checkbox"], form#accountPersonalizationForm .smsAgreement input[type="checkbox"]').is(':checked')  || ($('form#accountPersonalizationForm input[name=phone1_1]').val()!== '') || ($('form#accountPersonalizationForm input[name=phone1_2]').val()!== ''));
                    }
                },
                minlength: 4,
                number: true
            },
            dobMonth: {
                required: {
                    depends: function(element) {
                        return ($('form#accountPersonalizationForm .doctorDisplay input[type="checkbox"]').is(':checked') || ($('form#accountPersonalizationForm select[name=dobYear]').val()!== '') || ($('form#accountPersonalizationForm select[name=dobDay]').val()!== '') || $('form#accountPersonalizationForm .purchaseDisplayinfo input[type="checkbox"]').is(':checked'));
                    }
                }
            },
            dobDay: {
                required: {
                    depends: function(element) {
                        return ($('form#accountPersonalizationForm .doctorDisplay input[type="checkbox"]').is(':checked') || ($('form#accountPersonalizationForm select[name=dobYear]').val()!== '') || ($('form#accountPersonalizationForm select[name=dobMonth]').val()!== '') || $('form#accountPersonalizationForm .purchaseDisplayinfo input[type="checkbox"]').is(':checked'));
                    }
                }
            },
            dobYear: {
                required: {
                    depends: function(element) {
                        return ($('form#accountPersonalizationForm .doctorDisplay input[type="checkbox"]').is(':checked') || ($('form#accountPersonalizationForm select[name=dobMonth]').val()!== '') || ($('form#accountPersonalizationForm select[name=dobDay]').val()!== '') || $('form#accountPersonalizationForm .purchaseDisplayinfo input[type="checkbox"]').is(':checked'));
                    }
                },
                check_date_of_birth_future: {
                    depends: function(element) {
                        return ($('form#accountPersonalizationForm .doctorDisplay input[type="checkbox"]').is(':checked') || ($('form#accountPersonalizationForm select[name=dobMonth]').val()!== '') || ($('form#accountPersonalizationForm select[name=dobDay]').val()!== '') || $('form#accountPersonalizationForm .purchaseDisplayinfo input[type="checkbox"]').is(':checked'));
                    }
                },
                check_date_of_birth: {
                    depends: function(element) {
                        return ($('form#accountPersonalizationForm .doctorDisplay input[type="checkbox"]').is(':checked') || ($('form#accountPersonalizationForm select[name=dobMonth]').val()!== '') || ($('form#accountPersonalizationForm select[name=dobDay]').val()!== '') || $('form#accountPersonalizationForm .purchaseDisplayinfo input[type="checkbox"]').is(':checked'));
                    }
                }
            },
            receiptNumber: {
                required: {
                    depends: function(element) {
                        return ($('form#accountPersonalizationForm .purchaseDisplayinfo input[type="checkbox"]').is(':checked'));
                    }
                },
                validAlphaNumberPurchaseSync: {
            		depends: function(element) {
                		return ($('form#accountPersonalizationForm .purchaseDisplayinfo input[type="checkbox"]').is(':checked'));
            		}
                }
            }
        },
        messages: {
            firstName: {
                required: "Please enter a first name"
            },
            lastName: {
                required: "Please enter a last name"
            },
            phone1_1: {
                required: "Please enter a phone number",
                minlength:"Please enter a valid phone number",
                number:"Please enter a valid phone number"
            },
            phone1_2: {
                required: "Please enter a phone number",
                minlength:"Please enter a valid phone number",
                number:"Please enter a valid phone number"
            },
            phone1_3: {
                required: "Please enter a phone number",
                minlength:"Please enter a valid phone number",
                number:"Please enter a valid phone number"
            },
            dobMonth: {
                required: "Please enter your birthday"
            },
            dobDay: {
                required: "Please enter your birthday"
            },
            dobYear: {
                required: "Please enter your birthday"
            },
            receiptNumber: {
                required: "Please provide a receipt number"
            }
        },
        showErrors: function(errorMap, errorList) {
            this.defaultShowErrors();

            // prevent multiple copies of the same error from displaying
            var phoneText, ageText;
            var seen = {};
            $('#errorContainer span:visible').each(function() {
                var txt = $(this).text();
                if(txt == "Please enter a valid phone number"){
                	phoneText = true;
                } else if(txt == "Please enter your birthday"){
                	ageText = true
                };
                if (seen[txt])
                    $(this).hide();
                else
                    seen[txt] = true;
            });
            if(phoneText){
            	$('#errorContainer span:contains("Please enter a phone number")').hide();
            };
            if(ageText){
            	$('#errorContainer span:contains("The provided birthday is invalid")').hide();
            	$('#errorContainer span:contains("You must be 18 years old to view eye exam information")').hide();
            };
            $('#errorContainer').show();
            $('html, body').animate({
                scrollTop: ($('#errorContainer').offset().top - 100)
            }, 500);
            if($('.contact-section-number .required:visible').length > 0 && $('form#accountPersonalizationForm .smsAgreement input[type="checkbox"]').is(':checked')){
            	$('.contact-section-number').addClass('validationError');
            	$('#errorContainer .providePhone').show();
            	if(!$('form#accountPersonalizationForm .doctorDisplay input[type="checkbox"]').is(':checked')){
	            	if($('#errorContainer span:visible:contains("Please enter a phone number")').length>0){
	            		$('#errorContainer span:contains("Please enter a phone number")').hide();
	            		//$('.contact-section-number').removeClass('validationError');
	            	};
	            	if($('#errorContainer span:visible:contains("Please enter a valid phone number")').length>0){
	            		$('#errorContainer span.providePhone').hide();
	            	};
            	}else{
            		$('#errorContainer .providePhone').hide();
            	};
            } else{
            	$('#errorContainer .providePhone').hide();
            };
            if($('.dateOfBirth .required:visible').length > 0 ){
            	$('.dateOfBirth select').addClass('required');
            };
            if($('#accountPersonalizationForm .required:visible').length > 0 && $('form#accountPersonalizationForm .doctorDisplay input[type="checkbox"]').is(':checked')){
            	$('#errorContainer .examSync').show();
            }else{
            	$('#errorContainer .examSync').hide();
            };
            
            if($('#accountPersonalizationForm .required:visible').length > 0 && $('form#accountPersonalizationForm .purchaseDisplayinfo input[type="checkbox"]').is(':checked')){
            	$( "<span class='required purchaseSync'>To sync purchase history, please complete the highlighted fields below</span>" ).insertAfter( $( "#errorContainer .examSync" ) ).show();
            }else{
            	$('#errorContainer .purchaseSync').hide();
            };
            
            
            if($('#errorContainer span[for="dobMonth_1"]:visible, #errorContainer span[for="dobDay_1"]:visible , #errorContainer span[for="dobYear_1"]:visible').length == 0){
            	$('#accountPersonalizationForm .dobMonthContainer .crop').removeClass('validationError').find('select').removeClass('required');
            	$('#accountPersonalizationForm .dobDayContainer .crop').removeClass('validationError').find('select').removeClass('required');
            	$('#accountPersonalizationForm .dobYearContainer .crop').removeClass('validationError').find('select').removeClass('required');
            };
            if($('#errorContainer span:visible:contains("The provided birthday is invalid")').length > 0 || $('#errorContainer span:visible:contains("You must be 18 years old to view eye exam information")').length > 0 ){
            	$('#accountPersonalizationForm .dateOfBirth .crop').addClass('validationError');
            };
        },
        submitHandler: function(form) {
        	$('form#accountPersonalizationForm').each(function() {
                var $thisEyeExam = $(this);
                var phone11 = $thisEyeExam.find('input[name=phone1_1]').val(),
                    phone12 = $thisEyeExam.find('input[name=phone1_2]').val(),
                    phone13 = $thisEyeExam.find('input[name=phone1_3]').val();
                var ConcatPhoneNo = phone11+phone12+phone13;
                $thisEyeExam.find('input[name=phone1]').val(ConcatPhoneNo);
                
                var year 	= $thisEyeExam.find('select[name=dobYear]').val();
                var month 	= $thisEyeExam.find('select[name=dobMonth]').val();
                var day 	= $thisEyeExam.find('select[name=dobDay]').val();
                
                if ( month < 10 ) {
                	month = "0" + month;
            	} else {
            		month;
            	}
                if ( day < 10 ) {
                	day = "0" + day;
            	} else {
            		day;
            	}
              
                var mydate 	= null;
                if((year != null || year != '') && (month != null || month != '') && (day != null || day != '')){
                	mydate = year+'-'+month+'-'+day;
                }
                $thisEyeExam.find('input[name=dateOfBirth]').val(mydate);
            });
        	$('#errorContainer').hide();
            form.submit();
        },
        highlight: function(element, errorClass) {
            $(element).addClass("required");
            $(element).parent().addClass('validationError');
            $('#errorContainer').show();
        },
        unhighlight: function(element, errorClass) {
            $(element).removeClass("required");
            $(element).parent().removeClass('validationError');
            $('#errorContainer').hide();
        }
    });
    var showWaitModal = $('.showWaitModal').val() || '';
    var eyeExamDelayTimeMs = $('#eyeExamDelayTimeMs').val() || '';
    if(showWaitModal === 'true' && showWaitModal !== ''){
      $(".showWaitModalContainer").dialog('open');
      setTimeout(function() { $(".showWaitModalContainer").dialog('close'); window.location.href=$('#EyeExamHistoryURLVal').val();}, eyeExamDelayTimeMs);
    }
    
    $('.merch_assoc_carousel').owlCarousel();
});

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
            key == 46 || key == 45 ||
         // for new android device
            key == 229)
             return true;

         return false;
	}
	
	$(phone1Field).bind('keyup', function(e){
		if (this.value.length == 3 && ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode == 229))){
			if (navigator.userAgent.indexOf ('Mobile') == -1){
				$(phone2Field).focus().select();
			}
		}
	}).bind('keydown', numbersOnly).bind('input', function(){
		var $this = $(this),
			newValue = $this.val() || '';
		
		if (!newValue.match(/^\d{0,3}$/)){
			$this.val($this.data('current-value') || '');
		}else{
			$this.data('current-value', $this.val());
		}
	});
	
	$(phone2Field).bind('keyup', function(e){
		if (this.value.length == 3 && ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode == 229))){
			if (navigator.userAgent.indexOf ('Mobile') == -1){
				$(phone3Field).focus().select();
			}
		}
	}).bind('keydown', numbersOnly).bind('input', function(){
		var $this = $(this),
			newValue = $this.val() || '';
		
		if (!newValue.match(/^\d{0,3}$/)){
			$this.val($this.data('current-value') || '');
		}else{
			$this.data('current-value', $this.val());
		}
	});
	
	// don't autotab the third phone field, but still make it only accept numbers
	$(phone2Field).add(phone3Field).bind('keydown', numbersOnly).focus(function(){
		$(this).select();
	});
	
	$(phone3Field).bind('input', function(){
		var $this = $(this),
			newValue = $this.val() || '';
		
		if (!newValue.match(/^\d{0,4}$/)){
			$this.val($this.data('current-value') || '');
		}else{
			$this.data('current-value', $this.val());
		}
	});
}


function setupExamPhoneFields(phone1Field){
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
            key == 46 || key == 45 || key == 229)
             return true;

         return false;
	}
	
	$(phone1Field).bind('keyup', function(e){
		if (this.value.length == 3 && ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode == 229))){
			if (navigator.userAgent.indexOf ('Mobile') == -1){
				$(phone1Field).focus().select();
			}
		}
	}).bind('keydown', numbersOnly).bind('input', function(){
		var $this = $(this),
			newValue = $this.val() || '';
		
		if (!newValue.match(/^\d{0,10}$/)){
			$this.val($this.data('current-value') || '');
		}else{
			$this.data('current-value', $this.val());
		}
	});
}

function executeBackButtonStep3(){
	try{
		//alert("ill do my magic here");
		var allLockIds = document.getElementById('activeLockIds').value;
		//alert(allLockIds);
		var lockArray = allLockIds.split(",");
		//alert(lockArray[0]);
		//alert(lockArray[1]);
		//alert(lockArray[2]);
		var examToGoBack = '';
		for(var i=2;i>=0;i--){
			if(lockArray[i]!=null && lockArray[i].trim()!=''){
			//	alert(i + "is still alive and i will use it for back");
				examToGoBack = i+1;
				break;
			}
		}
		if(examToGoBack!=''){
			//alert(document.getElementById('ScheduleExamReview_EditExam_Link'+examToGoBack).href);
			document.getElementById('BackbuttonLink').href = document.getElementById('ScheduleExamReview_EditExam_Link'+examToGoBack).href.replace("&mobile=true","");
		}else{
			//alert('fallback needs to be handled');
			//alert(document.getElementById('AddAnotherExamLink').href);
			document.getElementById('BackbuttonLink').href = document.getElementsByClassName('AddAnotherExamLink').href;
		}
		//alert('i have set the necessary url');
		return true;
	}catch(e){
		return false;
	}
}

$(document).click(function(event) { 	
	if($(event.target).closest("div").attr("class") != 'sort-by'){
	    if(!$(event.target).closest('.sortByFacetTemp').length && !$(event.target).is('.sortByFacetTemp')) {
	        if($('.sortByFacetTemp').is(":visible")) {
	            //$('#sortByFacetTemp').hide();
	        }
	    }      
	}
});

$('body').on({
    'touchmove': function(e) { 
		if($('.sortByFacetTemp').is(":visible")) {
	        //$('#sortByFacetTemp').hide();
	    }
    }
});

$('#subscribeContainer').on('change',".subscribeUserData",function(){
    var isSubscribed= $(this).attr('data-subscribe');
    var subscribeType = $(this).attr('data-subtype');
    profileSubscribeFormSubmit($(this).parents('form'),isSubscribed,subscribeType);
    return false;
  });

$(document).on('change', "input[name='prescrNeed']", function(e, number) {
	e.preventDefault();
    var indexProduct = parseInt($(this).attr('data-index')) - 1;
    var orderItemId = $(this).attr('data-orderitemid');
    var isDoctor = $(this).is(':checked');
    var params = {
        storeId: constants.ajaxParams['storeId'],
        catalogId: constants.ajaxParams['catalogId'],
        langId: constants.ajaxParams['langId'],
        orderItemId: orderItemId,
        prescriptionNeed: isDoctor
    };

    $.ajax({
        type: "POST",
        url: getAbsoluteURL() + 'AjaxOrderChangeServicePrescriptionUpdateLC',
        traditional: true,
        data: params,
        success: function(data, textStatus, jqXHR) {
            if ( isDoctor && _dl.products_in_cart != undefined && _dl.products_in_cart.length > indexProduct ) {
                var _dlCopy = $.extend(true, {}, _dl);
                _dlCopy.site_events = {
                    "prescription_needed_click": "true"
                };
               
                _dlCopy.product_updated = [_dl.products_in_cart[indexProduct]];
                callTrackAnalytics(_dlCopy);
            }
            
            var params = [];
     		params.storeId = constants.ajaxParams['storeId'];
     		params.catalogId = constants.ajaxParams['catalogId'];
     		params.langId = constants.ajaxParams['langId'];
     		params.URL = "";
     		params.updatePrices = "1";
     		params.orderId = constants.ajaxParams['orderId'];
     		params.calculationUsageId = "-1";
     		
     		$('.lc-loader').show();
     		wc.service.invoke("AjaxOrderCalculate", params);
        }
    });
    return false;
});


function invokeLazyLoad(){
	if(typeof($.fn.lazyload) !== "undefined"){
		$('img.lazy').lazyload({
			effect:'fadeIn',
			threshold:100,
			skip_invisible:true
		}).on('load', function(){
			var $this = $(this);
			$this.closest('.lazy-container').find('.loader').remove();
		}).each(function(){
			if(this.complete) {
				$(this).trigger('load');
			}
		});
	};
}
$(window).load(function(){
	var hashVariable = window.location.hash.substr(1);
	if(hashVariable!='' && hashVariable!=null && hashVariable!=undefined){
		try{
			var srtLength=hashVariable.length;
			var n = hashVariable.indexOf("_", srtLength-3);
			if(n>=0){
			var divNum=hashVariable.substr(n+1, hashVariable.length);
			divNum=parseInt(divNum)+1;
		    hashVariable=hashVariable.substr(0,n)+'_'+divNum;
			$('#' + hashVariable).find("img.lazy").trigger("scroll");
			}
		}catch(except){
			console.log(except);
		}
	}
});
// START popup filer PLP
$( document ).ready(function() {
	   $(".open-filters").on("click",function(){
		   if ( $(".applyFilterButton").attr("onclick") == ""){
			   $(".applyFilterButton").attr("onclick","javascript:categoryDisplayJS.applyFilter();")
		   }
		   var parentClass = $(this).closest('.faceted_search').hasClass('contacts') ? 'contacts' : 'frames';
		   $('.faceted_search.'+parentClass).find(".faceted_search_sidebar").show();
		   $("html, body").css("overflow-y", "hidden");	  
	   });
	   $(".faceted-close").on("click",function(){
		   var parentClass = $(this).closest('.faceted_search').hasClass('contacts') ? 'contacts' : 'frames';
		   $('.faceted_search.'+parentClass).find(".faceted_search_sidebar").hide();
		   $('.faceted_search.'+parentClass).find(".faceted_search_prescription_sidebar").hide();
		   $("html, body").css("overflow-y", "scroll");
	   });
	   $(".open-filters-prescription").on("click", function (){
		   if ( $(".applyFilterButton").attr("onclick") == ""){
			   $(".applyFilterButton").attr("onclick","javascript:categoryDisplayJS.applyFilter();")
		   }
		   var parentClass = $(this).closest('.faceted_search').hasClass('contacts') ? 'contacts' : 'frames';
		   $('.faceted_search.'+parentClass).find(".faceted_search_prescription_sidebar").show();
		   $("html, body").css("overflow-y", "hidden");
	   });
	});
//END popup filer PLP


//START popup lens selection PDP
$( document ).ready(function() {
	   $(".lens-selection-popup").on("click",function(){
		   $("#lens-selection-popup").removeClass("hide").addClass("show");
		   // toggleStep1Step2($(mobileSelectLensStep1), $(mobileSelectLensStep2));
		   $("html, body").css("overflow-y", "hidden");
		   
	       _dl.site_events = {
	           "select_lens_type":"true"
	       };
	       callTrackAnalytics(_dl);
	   
	   });	  
	   
	   $("#lens-selection-modal-tabs ul li a").on("click", function(){
		   $("#lens-selection-modal-tabs ul li").removeClass("active");
		   $(this).parent("li").addClass("active")
	   });
	});
//END popup lens selection PDP

//START blazy home
//window.addEventListener('scroll', function (event) {
//		var homeBlazy = new Blazy({
//			success: function(ele){
//				if($(ele).parent().parent().find('.loader') != undefined)
//					$(ele).parent().parent().find('.loader').hide();
//	        }
//		});
//}, true);


// START Main menu
$( document ).ready(function() {
    $(".first-level").on("click", function(){
    	var menu = $(this).attr('class').split(' ')[0];
    	$("."+menu+".top-level").show();    	
    }).on('keypress', function(e) {
    	if(e.which === 13) {
            $(this).trigger('click');
    	}
    });
    $(".second-level").on("click", function(){
       	var menu = $(this).attr('class').split(' ')[0];
    	$("."+menu+".top-level").hide();	    			    	
    }).on('keypress', function(e) {
    	if(e.which === 13) {
            $(this).trigger('click');
    	}
    });
});			
//END Main menu

//START Contact Lenses accordion mobile Menu
	$(document).ready(function() {
	function close_accordion_section() {
		$('.accordion .accordion-section-title').removeClass('active');
		$('.accordion .accordion-section-content').slideUp(300).removeClass('open');
	}

	$('.accordion-section-title').click(function(e) {
		// Grab current anchor value
		var currentAttrValue = $(this).attr('href');

		if($(this).is('.active')) {
			close_accordion_section();
		}else {
			close_accordion_section();

			// Add active class to section title
			$(this).addClass('active');
			// Open up the hidden content panel
			$('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
		}

		e.preventDefault();
	});
	
});
//END Contact Lenses accordion mobile Menu
// Doctor Information prescription Accordion
$(document).ready(function(){
	var allTitles =  $('.accordion-title')
	var allPanels = $('.accordion-content').hide();
	$(".accordion-title").on("click", function(){
		$this = $(this);
		$target =  $this.next();
		if(!$target.hasClass('active')){
			 allPanels.removeClass('active').slideUp();
			allTitles.removeClass('open');
			$target.addClass('active').slideDown();
			$this.addClass('open');
		} else {
  			$target.removeClass('active').slideUp();
    		$this.removeClass('open');
  		}
		return false;
	});  
	
	$('body').on('click', '.modal-nav',function() {
		contactLensOptions.initContactLensValidator();
		LC2.selectedContactLens = $('#contactLensesFormMobile').serializeObject();
		$('#contactLensesFormMobile').submit();
		
	});
	//frame lens
	$('#content_wrapper_box').on('click', '.updownLensButton', function() {
        $(this).siblings(".lensQPS").slideToggle( 200 );
        //$(this).siblings(".lensEdit").toggle();
        $(this).toggleClass("open");
    });
	//CL
	$('#content_wrapper_box').on('click', '.updownCLButton', function() {
        $(this).siblings(".contact-lens-prescription-table").slideToggle( 200 );
        $(this).siblings(".contactLensEdit").toggle();
        $(this).toggleClass("open");
    });
    //frame lens TYP
    $('.thank-you-page').on('click', '.updownLensButton', function() {
        $(this).siblings(".lensQPS").slideToggle( 200 );
        //$(this).siblings(".lensEdit").toggle();
        $(this).toggleClass("open");
    });
	//CL TYP
	$('.thank-you-page').on('click', '.updownCLButton', function() {
        $(this).siblings(".contact-lens-prescription-table").slideToggle( 200 );
        $(this).siblings(".contactLensEdit").toggle();
        $(this).toggleClass("open");
    });
	
	$('#content_wrapper_box').on('click', '.contact-lens-modal-prescription', function(e) {
		 e.preventDefault();
		 var prescription = $(this);
  	     var editContacts = $(this);
  	     var sourceurl = $(this).data('url');
		 $.ajax({
            url:sourceurl,
            dataType: 'json',
            success: function(data){
            	 $.extend(data,  $(prescription).data());
                 $.extend(data,  $('#current-prescription-' + data['orderitemid']).serializeObject());
                 
 				if(data['OLD_R_PRD_POWER'] !== undefined)
 					data['RIGHT_EYE'] = true;
 				
 				if(data['OLD_L_PRD_POWER'] !== undefined)
 					data['LEFT_EYE'] = true;
 				var theTemplateScript = $(".contact-lenses-modal-template").html();
            	var theTemplate = Handlebars.compile(theTemplateScript);
            	
            	var theCompiledHtml = theTemplate(data);

			$('.contact-lens-selection-area-2').html(theCompiledHtml);
			$('.contact-lens-selection-area').dialog({
		        modal: false,
		        resizeable: false,
		        width: "100%",			        
		        open: function() {
		            var $this = $(this);
		            var $dialog = $this.closest('.ui-dialog');
		
		            $('.contact-lens-selection-area').data('bypassBeforeClose', false);
		            $dialog.css({
		                "top": "0px",
		                "height": "100%",
		                "position": "fixed",
		                "z-index": "20005"					                
		            });
		
		            savePlacement();
		
		            $(window).scrollTop(0);
					//$('.ui-widget-overlay').addClass('black-overlay');
		        },
		       	close: function() {
		            $(window).scrollTop(getPlacement());
		            $(this).data('closeTriggered', false);           
		        },
		        dialogClass: 'contact-lens-selection-modal'
		    });
		    }
        });
	});
});
//END Doctor Information prescription Accordion

// CALIFORNIA checkout dialog 
$(document).ready(function(){
	$("body").on("click", ".modal-california", function(){														
		$(".modal-california-box").dialog({
			 modal: true,
			 open: function() {
			 	var $this = $(this);
			 	var $dialog = $this.closest('.ui-dialog');
			 	$dialog.css({
	                "top": "25%",														                
	                "position": "fixed",
	                "left": "50%",														                 
					"transform": "translateX(-50%)",
	                "z-index": "20005"					                
	            });
			 	$('.ui-widget-overlay').addClass('black-overlay').css("z-index", "20000");																 
				}
		});															
	});
});
//END CALIFORNIA checkout dialog 
//Analytics Framework
$(document).ready(function(){
	$(document).on("click", "[class^='SBN_facet_']", function(){		
		try{
		   var obj = {
		      id : 'WCS-M-Search-FilterUpdated' // utag_data properties
		   };
		    
		}catch(err){
		    var obj = {
		        id: 'WCS-M-Search-FilterUpdated-Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message
		    };
		    tealium_data2track.push(obj);
		}
		finally{
		    obj.id = 'WCS-M-Search-FilterUpdated';
		    tealium_data2track.push(obj);		    
		}		
	});
	$(document).on("click", "#suggestedKeywordResults [role='listitem']", function(){		
		try{
		   var obj = {
			   Search_Type : 'Suggested' // utag_data properties
		   };
		    
		}catch(err){
		    var obj = {
		        id: 'WCS-M-Search_Type-Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message
		    };
		    tealium_data2track.push(obj);
		}
		finally{
		    obj.Search_Type = 'Suggested';
		    tealium_data2track.push(obj);	
		}		
	});
});
jQuery.validator.setDefaults({ 
    invalidHandler: function(form, validator) {
       // your custom function
		try{
		    var obj = {
		      id : 'WCS-M-Form-FillingError', // utag_data properties
		      Click_FocusElement:this
		   };                                             
		}catch(err){
		    var obj = {
		        id: 'WCS-M-Form-FillingError-Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message
		    };
		    tealium_data2track.push(obj);
		}
		finally{
		    obj.id = 'WCS-M-Form-FillingError';
		    tealium_data2track.push(obj); 		    
		}   
	   
    }
});
$(document).ready(function(){
	$(document).on("click", "#rn_FormSubmit_28_Button", function(){
		try{
		    var obj = {
		      id : 'WCS-M-CustomerSupport-MessageForm-ContactUs', // utag_data properties
		      Click_FocusElement:this
		   };                                             
		}catch(err){
		    var obj = {
		        id: 'WCS-M-CustomerSupport-MessageForm-ContactUs-Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message
		    };
		    tealium_data2track.push(obj);
		}
		finally{
		    obj.id = 'WCS-M-CustomerSupport-MessageForm-ContactUs';
		    tealium_data2track.push(obj); 
		}   

	});
});
//END Analytics Framework

$(document).on("click", ".button.HPBtn, .hp-zone1 .img-wrapper a", function(e) {
	try {
		tealium_data2track.push({
			id:'Click', 
			Click_FocusElement:this,
			Tracking_Type: 'hiddenaction'
		});
	} catch (err) {
		console.log(err.message)
	}
});

var sha256 = function sha256(ascii) {

	if(isBlank(ascii)){
		return undefined;
	}
	
	ascii = ascii.toLowerCase().trim();
	
	function isBlank(str) {
	    return (!str || /^\s*$/.test(str));
	}


	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};
	
	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;
	
	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = sha256.h = sha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}
	
	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return; // ASCII check: only accept characters in range 0-255
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)
	
	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);
		
		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if 
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&hash[5])^((~e)&hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
					)|0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
			
			hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1)|0;
		}
		
		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}
	
	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
};


var MD5 = function (string) {
	
	if(isBlank(string)){
		return undefined;
	}
	
	string = string.toLowerCase().trim();
	
	function isBlank(str) {
	    return (!str || /^\s*$/.test(str));
	}
	
   function RotateLeft(lValue, iShiftBits) {
           return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
   }

   function AddUnsigned(lX,lY) {
           var lX4,lY4,lX8,lY8,lResult;
           lX8 = (lX & 0x80000000);
           lY8 = (lY & 0x80000000);
           lX4 = (lX & 0x40000000);
           lY4 = (lY & 0x40000000);
           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
           if (lX4 & lY4) {
                   return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
           }
           if (lX4 | lY4) {
                   if (lResult & 0x40000000) {
                           return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                   } else {
                           return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                   }
           } else {
                   return (lResult ^ lX8 ^ lY8);
           }
   }

   function F(x,y,z) { return (x & y) | ((~x) & z); }
   function G(x,y,z) { return (x & z) | (y & (~z)); }
   function H(x,y,z) { return (x ^ y ^ z); }
   function I(x,y,z) { return (y ^ (x | (~z))); }

   function FF(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function GG(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function HH(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function II(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function ConvertToWordArray(string) {
           var lWordCount;
           var lMessageLength = string.length;
           var lNumberOfWords_temp1=lMessageLength + 8;
           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
           var lWordArray=Array(lNumberOfWords-1);
           var lBytePosition = 0;
           var lByteCount = 0;
           while ( lByteCount < lMessageLength ) {
                   lWordCount = (lByteCount-(lByteCount % 4))/4;
                   lBytePosition = (lByteCount % 4)*8;
                   lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                   lByteCount++;
           }
           lWordCount = (lByteCount-(lByteCount % 4))/4;
           lBytePosition = (lByteCount % 4)*8;
           lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
           lWordArray[lNumberOfWords-2] = lMessageLength<<3;
           lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
           return lWordArray;
   };

   function WordToHex(lValue) {
           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
           for (lCount = 0;lCount<=3;lCount++) {
                   lByte = (lValue>>>(lCount*8)) & 255;
                   WordToHexValue_temp = "0" + lByte.toString(16);
                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
           }
           return WordToHexValue;
   };

   function Utf8Encode(string) {
           string = string.replace(/\r\n/g,"\n");
           var utftext = "";

           for (var n = 0; n < string.length; n++) {

                   var c = string.charCodeAt(n);

                   if (c < 128) {
                           utftext += String.fromCharCode(c);
                   }
                   else if((c > 127) && (c < 2048)) {
                           utftext += String.fromCharCode((c >> 6) | 192);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }
                   else {
                           utftext += String.fromCharCode((c >> 12) | 224);
                           utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }

           }

           return utftext;
   };

   var x=Array();
   var k,AA,BB,CC,DD,a,b,c,d;
   var S11=7, S12=12, S13=17, S14=22;
   var S21=5, S22=9 , S23=14, S24=20;
   var S31=4, S32=11, S33=16, S34=23;
   var S41=6, S42=10, S43=15, S44=21;

   string = Utf8Encode(string);

   x = ConvertToWordArray(string);

   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

   for (k=0;k<x.length;k+=16) {
           AA=a; BB=b; CC=c; DD=d;
           a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
           d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
           c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
           b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
           a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
           d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
           c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
           b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
           a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
           d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
           c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
           b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
           a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
           d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
           c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
           b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
           a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
           d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
           c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
           b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
           a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
           d=GG(d,a,b,c,x[k+10],S22,0x2441453);
           c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
           b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
           a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
           d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
           c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
           b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
           a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
           d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
           c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
           b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
           a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
           d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
           c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
           b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
           a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
           d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
           c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
           b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
           a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
           d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
           c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
           b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
           a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
           d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
           c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
           b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
           a=II(a,b,c,d,x[k+0], S41,0xF4292244);
           d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
           c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
           b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
           a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
           d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
           c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
           b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
           a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
           d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
           c=II(c,d,a,b,x[k+6], S43,0xA3014314);
           b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
           a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
           d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
           c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
           b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
           a=AddUnsigned(a,AA);
           b=AddUnsigned(b,BB);
           c=AddUnsigned(c,CC);
           d=AddUnsigned(d,DD);
   		}

   	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

   	return temp.toLowerCase();
}

// remove exam cookies and persistent session cookie when signing out
function triggerLogout(){
	var $this = $('.logged_user_section .headerLogout');
	removeExamCookies();
	$.cookie("WC_PERSISTENT", '', { expires:-1, path: '/' });
	console.log($this.attr("data-url"));
	document.location = $this.attr("data-url");
};
