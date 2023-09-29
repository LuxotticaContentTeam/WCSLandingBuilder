var opsm = window.opsm || {};

opsm.UserArea = opsm.UserArea || {};

//function addressSuggestValidation() {
//	let $el = '';
//	if ($('#addressSuggest-updateAddress').length) $el=$('#addressSuggest-updateAddress');
//	else if ($('#addressSuggest-Account').length) $el=$('#addressSuggest-Account');
//	var addressSuggetValue=opsm.utils.getContent($el);
//	var city=$('#city').val();
//	var state=$('#state').val();
//	var zipCode = $('#zipCode').val();
//	if (city != null && city != addressSuggetValue ){
//		opsm.utils.setContent($el, city);
//		$('#addressSuggest_state').val(state);
//		$('#addressSuggest_postcode').val(zipCode);
//	}
//}

/*autoexecute*/
(function (window, document, $, opsm) {

	$(document).ready(function () {
		
		if($('#sign_up_form_mod, #sign_up_form, #register-form').length>0) {
			opsm.UserArea.addValidators();
			opsm.UserArea.LogonRegister.initData();
			opsm.UserArea.LogonRegister.initUI();
		}
		
		if($('body#accountActivation').length) {
			opsm.UserArea.addValidators();
			opsm.UserArea.LogonRegister.initData();
		}
		
		/*form email per reset, set new password after email, change pwd from account */
		if($('#forgot_password_form, form#reset-password, form#update_password').length>0) {
			opsm.UserArea.addValidators();
			opsm.UserArea.PasswordReset.init();
		}
		if($('.my-account-details-activation #complete-details').length>0) {
			opsm.UserArea.addValidators();
			opsm.UserArea.LogonRegister.completeActivationDetails();
		}
		
	});

}(window, document, jQuery, opsm));

opsm.UserArea =  {
		addValidators: function(){
			/*Custom Validator Method*/
			jQuery.validator.addMethod(
					"regex",
					function(value, element, regexp) {
						var re = /^.{6,20}$/;
						return this.optional(element) || re.test(value);	            
					},
					"Please check your input."
			);
			jQuery.validator.addMethod(
			        "regexpin",
			        function(value, element, regexp) {
			            var re = new RegExp(regexp);
			            return this.optional(element) || re.test(value);
			        },
			        "Your activation code should be numeric and must be some digits long."
			);	
			// Setup form validation on the #register-form element
			jQuery.validator.addMethod(
					"mobileAustralia",
					function(value, element) {
			
						if (this.optional(element) && value === "") {
							return true;
						}
						var country=$('#mobile').data('country');
						var pattern = '';
						var patternTrue = false;
						if(country != ''){
							if(country==='AU'){
								pattern = /^04[0-9]{2}\s?[0-9]{3}\s?[0-9]{3}$/;
								if(pattern.test(value) == true){
									patternTrue = true;
								}
							}else if(country==='NZ'){
								pattern1 = /^0[0-9]{1}\s?[0-9]{3}\s?[0-9]{4}$/;
								pattern2 = /^0[0-9]{2}\s?[0-9]{3}\s?[0-9]{4}$/;
								pattern3 = /^0[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/;
								pattern4 = /^0[0-9]{2}\s?[0-9]{4}\s?[0-9]{4}$/;
								pattern5 = /^0[0-9]{2}\s?[0-9]{3}\s?[0-9]{3}$/;
								if(pattern1.test(value) == true || pattern2.test(value) == true || pattern3.test(value) == true || pattern4.test(value) == true || pattern5.test(value) == true){
									patternTrue = true;
								}
							}
						}
						return patternTrue;
					},
					$("#mobile").length>0 ? $("#mobile").data("errors").required : ''
			);

			jQuery.validator.addMethod("dateValid", function(value, element) {
				var tmpdate = $('#dob').val();
				tmpdate = tmpdate.split("/");
				tmpdate = tmpdate[2] + "-" + tmpdate[1] + "-" + tmpdate[0];
				var timestamp = Date.parse(tmpdate);
			
				if (isNaN(timestamp) == true) {
					return false;
				} else{
					return true;
				}
			}, "Please enter a valid date." );
			
			jQuery.validator.addMethod("datePast", function(value, element) {
				var tmpdate = $('#dob').val();
				tmpdate = tmpdate.split("/");
				tmpdate = tmpdate[2] + "-" + tmpdate[1] + "-" + tmpdate[0];
				var timestamp = Date.parse(tmpdate);
				var datenow = Date.parse(new Date());
				return  (timestamp <= datenow);
			
			}, "Please enter a Past date." );
			
			
			jQuery.validator.addMethod("dateRange", function(value, element) {
				var tmpdate = $('#dob').val();
				tmpdate = tmpdate.split("/");
				return tmpdate[2] >= new Date().getFullYear() - 114;
			
			}, "Please enter a date between " + (new Date().getFullYear() - 114) + " and " + new Date().getFullYear());
		}
}

opsm.UserArea.PasswordReset =  {
		init: function(){
			//user update password modal
			if($('form#update_password').length) {
				$('#update_password a.linkbutton[data-dismiss="modal"]').on("click", function(){
					$('form#update_password').get(0).reset()
					thisFormValid.resetForm();
				})
				$('#show-pw-2').on('change', function() {
					var toggleType = $(this).is(':checked') ? 'text': 'password';
					$('#current-password').prop("type", toggleType);
					$('#new-password').prop("type", toggleType);
					$('#confirm-password').prop("type", toggleType);
				});
				
				var thisFormValid = $('form#update_password').validate({
			        
		            // Specify the validation rules
		            rules: {
		                "logonPasswordOld": {
		                	required: true
		                },
		                "logonPassword": {
		                	required: true,
		                	regex: "^.{6,20}$"
		                },
						"logonPasswordVerify": {
							required: true,
							equalTo: "#new-password"
						}
		            },
		            messages: {
		            	"logonPasswordOld": {
							required: $('#current-password').data("errors").required
						},
						"logonPassword": {
							required: $('#new-password').data("errors").required,
							regex: $('#new-password').data("errors").pattern
						},
						"logonPasswordVerify": {
							required: $('#confirm-password').data("errors").required,
							equalTo: $('#confirm-password').data("errors").match
						},
					},
					highlight: function(element) {
				        jQuery(element).closest('.opsm-form-group').addClass('error');
				    },
				    unhighlight: function(element) {
				        jQuery(element).closest('.opsm-form-group').removeClass('error');
				    },
					onfocusout : function(element) {
						$(element).valid();
					},
					errorClass : "error invalid-feedback",
					errorPlacement: function(error, element) {
						error.appendTo(element.closest(".opsm-form-group"));
					},
					invalidHandler: function(event, validator) {
						AjaxOverlay.triggerOverlay('hide');
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').select();
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').focus();
					},	            
					submitHandler: function(form) {
						AjaxOverlay.triggerOverlay('show');
						form.submit();
					}
		            
		        });
			}
		
			if($('form#reset-password').length>0) {
				$('input[type="checkbox"]').on('change', function() {
					var toggleType = $(this).is(':checked') ? 'text': 'password';
					$('#new-password').prop("type", toggleType);
					$('#confirm-password').prop("type", toggleType);
				});
				
				$("form#reset-password").validate({
			        
		            // Specify the validation rules
		            rules: {           
		                "logonPassword": {
		                	required: true,
							regex: "^.{6,20}$"
		                },
						"logonPasswordVerify": {
							required: true,
							equalTo: "#new-password"
						}
		            },
		            messages: {
						"logonPassword": {
							required: $("form#reset-password input[name='logonPassword']").data("errors").required,
							regex: $("form#reset-password input[name='logonPassword']").data("errors").pattern
						},
						"logonPasswordVerify": {
							required: $("form#reset-password input[name='logonPasswordVerify']").data("errors").required,
							equalTo: $("#confirm-password").data("errors").match
						},
					},
					highlight: function(element) {
				        jQuery(element).closest('.opsm-form-group').addClass('error');
				    },
				    unhighlight: function(element) {
				        jQuery(element).closest('.opsm-form-group').removeClass('error');
				    },
					onfocusout : function(element) {
						$(element).valid();
					},
					errorClass : "error invalid-feedback",
					errorPlacement: function(error, element) {
						error.appendTo(element.closest(".opsm-form-group"));
					},
					invalidHandler: function(event, validator) {
						AjaxOverlay.triggerOverlay('hide');
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').select();
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').focus();
					},	            
					submitHandler: function(form) {
						AjaxOverlay.triggerOverlay('show');
						form.submit();
					}
		            
		        });
			}
			
			if($('#forgot_password_form').length>0) {
				$("#forgot_password_form #username").keyup(function(){ /* OPTWO-3630 */
					$(this).val($(this).val().toLowerCase())
				});
			
				// Setup form validation on the #forgot_password_form element
				if ($("#username").length > 0) {
					$("#forgot_password_form").validate({
				        
			            // Specify the validation rules
			            rules: {           
			                "logonId": {
			                    required: true,
			                    email: true
			                }
			            },
			            
			            // Specify the validation error messages
			            messages: {
			                "logonId": {
			                    required: $("#username").data("errors").required,
			                    email: $("#username").data("errors").email
			                },
			            },
			            highlight: function(element) {
			            	jQuery(element).closest('.opsm-form-group').addClass('error');
			            },
			            unhighlight: function(element) {
			            	jQuery(element).closest('.opsm-form-group').removeClass('error');
			            },
			            onfocusout : function(element) {
			               $(element).valid();
			            },
			            errorClass : "error invalid-feedback",
			            errorPlacement: function(error, element) {
			                error.appendTo(element.closest(".opsm-form-group"));
			            },
			            invalidHandler: function(event, validator) {
			            	AjaxOverlay.triggerOverlay('hide');
			                $(this).find('.opsm-form-group.error:first').find('input[required="required"]').select();
			                $(this).find('.opsm-form-group.error:first').find('input[required="required"]').focus();
			            },	            
			            submitHandler: function(form) {
			            	AjaxOverlay.triggerOverlay('show');
			                form.submit();
			            }
			        });
				}
			}
	}
		
}
opsm.UserArea.LogonRegister =  {

		completeActivationDetails: function(){
			if($("form#complete-details").length > 0){
				
				
				if($('#addressSuggest-AccountDiv').length){
					$('#addressSuggest-AccountDiv').on('blur',function(){
						opsm.utils.setContent($('#addressSuggest-AccountDiv'),$('input[name=addressSuggest-Account]').val());
					})
					  $("#addressSuggest-AccountDiv").autocomplete({
				        source: getAddressData,
				        select: setSelectedCompleteRgstValue, //AU or NZ distinguish
				        focus: setSelectedCompleteRgstValue,
				        open: function() {
				            $(".ui-autocomplete:visible").css({
				                top: "+=1",
				                width: "-=20"
				            });
				            $(".ui-autocomplete").css({
				                "max-height": "14.5em",
				                "overflow-y": "auto"
				            });
				        }
				      }).data("uiAutocomplete")._renderItem = renderAccountAddressValue;
					$("#addressSuggest-AccountDiv").on("autocompleteselect", function(e){
						e.preventDefault();
						e.stopImmediatePropagation();
						opsm.utils.setContent($(this), $(this).data("futureVal"));
					});
				}
				$("form#complete-details").validate({
					rules : {
//			    		"addressSuggest-AccountDiv":{
//							regex: /^[^,]{1,50},\s?(.)*,\s?\d{2,6}$/
//			    		},
						"address1": {required: true},
						"addressSuggest-AccountDiv": {
							required: true
//							regex: /^[^,]{1,50},\s?(.)*,\s?\d{2,6}$/
						},
						"mobilePhone1": {
							required:true,
							mobileAustralia : true
	
						},
						"dob" : {
							required: true,
							dateValid: true,
							datePast: true,
							dateRange : true
						},
					},
					messages : {
						"address1" : $("#address1").data("errors").required,
						"addressSuggest-AccountDiv": {
							required: $("#addressSuggest-AccountDiv").data("errors").required,
							regex: $("#addressSuggest-AccountDiv").data("errors").regex
						},
						"mobilePhone1" : {required: $("#mobile").data("errors").required},
						"dob" : {
							required: $("#dob").data("errors").required
						},
					},
					onfocusout : function(element) {
						$(element).valid();
					},
					onkeyup : false,
					onkeydown : function(element) {
						$(element).valid();
					},
					errorClass : "error invalid-feedback",
					errorPlacement: function(error, element) {
						error.appendTo(element.closest(".opsm-form-group"));
					},
					invalidHandler: function(event, validator) {
						AjaxOverlay.triggerOverlay('hide');
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').select();
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').focus();
					},
					highlight : function(element) {
						jQuery(element).closest('.opsm-form-group').addClass('error');
					},
					unhighlight : function(element) {
						jQuery(element).closest('.opsm-form-group').removeClass('error');
						//addressSuggestValidation();
					},
					submitHandler: function(form) {
						var tmpdate = $('#dob').val();
						tmpdate = tmpdate.split("/");
						$("#dateOfBirth").val(tmpdate[2] + "-" + tmpdate[1] + "-" + tmpdate[0]);
						$("#birth_date").val(tmpdate[0]);
						$("#birth_month").val(tmpdate[1]);
						$("#birth_year").val(tmpdate[2]);
						if($('#city').val().length && $('#state').val().length && $('#zipCode').val().length){
							//Dyna validator AddressValidator.java needs input addressSuggest with first 4 valuesin csv
							//stored in $("input#addressSuggest-Send") by autocomplete.js
							//result = $('#city').val() + ', ' + $('#state').val() + ', ' + $('#zipCode').val() + ', ' + $('#addressSuggest-End').val();
							result = $("input#addressSuggest-Send").val();
							if($('input[name=addressSuggest]').length){
								$('input[name=addressSuggest]').val(result);
							} else {
								el= '<input type="hidden" name="addressSuggest" value="' +result+ '">';
								$('form#complete-details').append(el);
							}
							
							
//							nick = $('input#name-of-address');
//							if(!nick.val().length){
//								nick.val($('input#address').val());
//							}
							
							//already done in autocomplete
							//$('input[name="addressSuggest-AccountDiv"]').val(opsm.utils.getContent($('#addressSuggest-AccountDiv')));
							AjaxOverlay.triggerOverlay('show');
							form.submit();
						} else {
							$('input[name=addressSuggest-Account]').val("");
							$("#addressSuggest-AccountDiv").text("");
							$("#addressSuggest_postcode").val("");
							$("#addressSuggest_State").val("");
							form.valid();
							//$('input#addressSuggest1').val("");
//							opsm.utils.setContent($('#addressSuggest-AccountDiv'), "");
//							$('input#addressSuggest_state_updateAddress').val("");
//							$('input#addressSuggest_state_updateAddress').val("");
//							$('input#addressSuggest_state_updateAddress').valid();
						}
						AjaxOverlay.triggerOverlay('show');
						form.submit();
					}
				});
			}
		},

		initUI: function(){


			$("html, body").animate({ scrollTop: 0 });

			$('[autofocus]').focus();

			// ----------  toggle show/hide pswd  -------------------------- //

			// shared form login and only pwd login from account activation
			if($('form#sign_up_form, form#sign_up_form_mod').length) {
				$('#show-password, #checkbox-1').on('change', function() {
					var toggleType = $(this).is(':checked') ? 'text': 'password';
					$('#passwordLogon, #password-login, #password-login-mod').prop("type", toggleType);
				});   
			}
			
			//user register section
			if($("form#register-form").length){
				$('#showpassword').on('change', function() {
					var toggleType = $(this).is(':checked') ? 'text': 'password';
					$('#password').prop("type", toggleType);
					$('#password-2').prop("type", toggleType);
				});
			}
			
		},
		initData:function() {

			$.ajaxSetup({ cache: false });
			$('body').addClass('has-js');
			if (navigator.userAgent.indexOf('Mac OS X') != -1) {
				$("body").addClass("mac");
			}
			/*deleting promo code on click of sign in*/ 
//			$("body").on('click', 'main', function () {
//				$.cookie("promo", null);
//			});
			
			//fix for safari
			$(document).on("click touchend","#create-account", function(e){
				e.preventDefault();
				var dataUrl=$(this).data('url');
					location.href=dataUrl;
				});
			

			// -- show register page by url param -- //
			if($('#loginpage').length>0 && $('#registerpage').length>0){
				if(typeof urlParam('register') !== 'undefined'){
					toggleForms( $('#loginpage'), $('#registerpage'));
				} else {
					toggleForms( $('#registerpage'), $('#loginpage'));
				}
				
				/* OPSMD-4639 */
				if($('input.error.global-message').val() && $('input.error.global-message').val().length) {
					try {
						let errorObj = {
								Error_Details: "",
								Error_Message: $('input.error.global-message').val(),
						};
						if(window.location.pathname.indexOf('UserRegistrationAddWithApprovalCheckCmd') != -1){
							errorObj['Error_Source']= 'Server';
							errorObj['Error_Code']= 'Signup';
							errorObj.Error_Details = "Sign up Request Failed";
						} else if(window.location.pathname.indexOf('UserRegistrationAddWithApprovalCheckCmd') != -1){
							errorObj['Error_Source']= 'User';
							errorObj['Error_Code']= 'Login';
						}
						utagFiller.addError(errorObj);
					} catch (e) {}
				}
			}

			//------------------------------------------------------
			// /NEW PIN ACTIVATION FORM ------------------
			//------------------------------------------------------	

			if ($("#pinActivateForm").length > 0)
			{
				$("#pinActivateForm").validate({
					rules: {           
						"activationPin": {
							required: true,
							number: true,
		                    regexpin: "^[0-9]{1,6}$$"
						}
					},
					messages: {
						"activationPin": {
							required: $("#pinActivateForm input[name='activationPin']").data("errors").required,
							number: $("#pinActivateForm input[name='activationPin']").data("errors").pattern,
							regexpin:$("#pinActivateForm input[name='activationPin']").data("errors").pattern
						},
					},
					highlight: function(element) {
				        jQuery(element).closest('.opsm-form-group').addClass('error');
				    },
				    unhighlight: function(element) {
				        jQuery(element).closest('.opsm-form-group').removeClass('error');
				    },
					onfocusout : function(element) {
						if($(element).val().length){
							$(element).valid();
						}
					},
					onkeyup : function(element) {
						if($(element).val().length < 6){ $('#submitPin').prop('disabled', true); }
						else { $('#submitPin').prop('disabled', false); }
						$(element).valid();
					},
					errorClass : "error invalid-feedback",
					errorPlacement: function(error, element) {
						error.appendTo(element.closest(".opsm-form-group"));
					},
					invalidHandler: function(event, validator) {
						AjaxOverlay.triggerOverlay('hide');
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').select();
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').focus();
					},	            
					submitHandler: function(form) {
						AjaxOverlay.triggerOverlay('show');
						form.submit();
					}
				});	
			}

			

			//------------------------------------------------------
			// /NEW SIGN IN FORM ------------------
			//------------------------------------------------------	
			$("#passwordLogon").val('');
			$("#username").val('');

			if ($("#sign_up_form.from-activation").length > 0) {
				$("#sign_up_form").validate({
					rules: {     
						"logonPassword": {
							required: true
						}
					},
					messages: {
						"logonPassword": {
							required: $("#sign_up_form input[name='logonPassword']").data("errors").required
						}
					},
					highlight: function(element) {
				        jQuery(element).closest('.opsm-form-group').addClass('error');
				    },
				    unhighlight: function(element) {
				        jQuery(element).closest('.opsm-form-group').removeClass('error');
				    },
					onfocusout : function(element) {
						$(element).valid();
					},
					errorClass : "error invalid-feedback",
					errorPlacement: function(error, element) {
						error.appendTo(element.closest(".opsm-form-group"));
					},
					invalidHandler: function(event, validator) {
						AjaxOverlay.triggerOverlay('hide');
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').select();
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').focus();
					},	            
					submitHandler: function(form) {
						AjaxOverlay.triggerOverlay('show');
						form.submit();
					}
				});	
			}
				
				
			if ($('#sign_up_form:not(".from-activation")').length > 0)
			{
				$("#sign_up_form, #sign_up_form_mod").validate({
					rules: {           
						"logonId": {
							required: true,
							email: true
						},
						"logonPassword": {
							required: true
						}
					},
					messages: {
						"logonPassword": {
							required: $("#sign_up_form input[name='logonPassword']").data("errors").required
						},
						"logonId": {
							required: $("#sign_up_form input[name='logonId']").data("errors").required,
							email: $("#sign_up_form input[name='logonId']").data("errors").email
						},
					},
					highlight: function(element) {
				        jQuery(element).closest('.opsm-form-group').addClass('error');
				    },
				    unhighlight: function(element) {
				        jQuery(element).closest('.opsm-form-group').removeClass('error');
				    },
					errorClass : "error invalid-feedback",
					errorPlacement: function(error, element) {
						error.appendTo(element.closest(".opsm-form-group"));
					},
					invalidHandler: function(event, validator) {
						AjaxOverlay.triggerOverlay('hide');
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').select();
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').focus();
					},	            
					submitHandler: function(form) {
						AjaxOverlay.triggerOverlay('show');
						form.submit();
					}
				});	
			}
			//------------------------------------------------------
			// /NEW REGISTRATION FORM ------------------
			//------------------------------------------------------	
			$('#password-2').bind('copy paste', function(e) {
				e.preventDefault();
			});
			$('#password').bind('copy paste', function(e) {
				e.preventDefault();
			});

//			$("#password, #password-2").keyup(function(){
//				$(this).valid();
//			});
			// -----	validate choosen passw in register form  ---- //
//			$("#password").keyup(function(){
//				var passwordLen = $(this).val().length;
//				if (passwordLen < 6){
//					$(this).removeClass('ui-state-valid').addClass('error');
//				}else{
//					$(this).removeClass('error').addClass('ui-state-valid');
//				}
//				//For showing error message when confirm password is already entered and changing the new password.	
//				var passwordVal = $('#password').val();
//				var confirmPasswordVal = $('#password-2').val();
//				if (confirmPasswordVal == passwordVal){
//					$('#password-2').removeClass('error').addClass('ui-state-valid');
//				}else{
//					$('#password-2').removeClass('ui-state-valid').addClass('error');
//				}
//			});
//			$("#password-2").bind('keyup blur',function(){
//				var passwordVal = $('#password').val();
//				var confirmPasswordVal = $('#password-2').val();
//				if (confirmPasswordVal == passwordVal){
//					$(this).removeClass('error').addClass('ui-state-valid');
//				}else{
//					$(this).removeClass('ui-state-valid').addClass('error');
//				}
//			});

			$('#alreadyVisited').click(function(e) {
//				$("#opsm-detail").toggle();
				if(document.getElementById("syncInStore").value == 'false'){
					document.getElementById("syncInStore").value = true;
//					$('#mobile').attr('required', 'required');
//					$('#dob').attr('required', 'required');
				}else{
					document.getElementById("syncInStore").value = false;
				}
			});

			//  ---- Set hidden input syncInStore (true/false) ---- //

			$('#opsm-detail').on('change',function() {
//				document.getElementById("syncInStore").value = $('#opsm-detail').is(":visible") ? true : false;
				$('#syncInStore').val($('#opsm-detail').is(":visible") ? true : false);
			});   
			//-- ---------------------------------------------- --//		

			if ($("#register-form").length > 0)
			{
				$( "#dob" ).datepicker( "option", "disabled", true );
				
				$("#register-form").validate({
	
					// Specify the validation rules
					rules: {   
						"firstName": {
							required: true
						},
						"lastName": {
							required: true
						},                        
						"logonId": {
							required: true,
							email: true
						},
						"dateOfBirth" : {
							required: true,
							dateValid: true,
							datePast: true,
							dateRange : true
						},
						"mobileNumber" : {
							required:true,
							mobileAustralia : true
	
						},
						"logonPassword": {
							required: true,
							regex: "^.{6,20}$"
						},
						"logonPasswordVerify": {
							required: true,
							equalTo: "#password"
						}
					},
	
					// Specify the validation error messages
					messages: {
						"firstName": {
							required: $("#first-name").data("errors").required
						},
						"lastName": {
							required: $("#last-name").data("errors").required
						},
						"logonId": {
							required: $("#email").data("errors").required,
							email: $("#email").data("errors").email
						},
						"dateOfBirth" : {
							required: $("#dob").data("errors").required
						},
						"mobileNumber" : {required: $("#mobile").data("errors").required},
						"logonPassword": {
							required: $("#password").data("errors").required,
							regex: $("#password").data("errors").pattern
						},
						"logonPasswordVerify": {
							required: $("#password-2").data("errors").required,
							equalTo: $("#password-2").data("errors").match
						}
					},
					highlight: function(element) {
						if ($(element).is('#dob')) {
							$(element).parent().addClass("error");
						} else {
							jQuery(element).closest('.opsm-form-group').addClass('error');
						}
					},
					unhighlight: function(element) {
						if ($(element).is('#dob')) {
							$(element).parent().removeClass("error");
						} else {
							jQuery(element).closest('.opsm-form-group').removeClass('error');
						}
					},
					onfocusout : function(element) {
	//					setTimeout(function(){
	//					if((document.activeElement.id != 'birth_date' && document.activeElement.id != 'birth_month' && document.activeElement.id != 'birth_year') || (element.id === 'email')){
						$(element).valid();
	//					}
	//					}, 100);
	
					},
					onkeyup : false,
					onkeydown : function(element) {
						$(element).valid();
					},
					errorClass : "error invalid-feedback",
					errorPlacement: function(error, element) {
						error.appendTo(element.closest(".opsm-form-group"));
					},
					invalidHandler: function(event, validator) {
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').select();
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').focus();
						AjaxOverlay.triggerOverlay('hide');
					},
					submitHandler: function(form) {        	
						$("#email1").val($("#email").val());
						$("#mobile").attr( "placeholder", "" );
						//alert("placeholderval: "+$("#mobileNumber").attr( "placeholder" )); alert("feild val: "+$("#mobileNumber").val());
						if($("#mobile").val() == $("#mobile").attr( "placeholder" ))
							$("#mobile").val("");
						if($("#newsletter-flag").prop("checked") == true){
							$("#subscribe-phone").val($("#newsletter-flag").val());
						}
						
						var tmpdate = $('#dob').val();
						tmpdate = tmpdate.split("/");
						
						var tmpdateFmt = tmpdate[2] + "-" + tmpdate[1] + "-" + tmpdate[0];
						$('#dob', form).remove();
						$(form).append('<input type="hidden" name="dateOfBirth" value="' + tmpdateFmt + '">');
						
						//var dob_out = new Date ($("#dob").val());
						//dob_out = dob_out.getFullYear() + '-' + (dob_out.getMonth()+1) + '-' + dob_out.getDate();
						//$("#dob").val(dob_out);
						AjaxOverlay.triggerOverlay('show');
						form.submit();
					}
				});
			}

		}
}


	

function toggleForms ($hideEl, $showEl) {
	$hideEl.hide();
	$showEl.show();
}

function urlParam(name){
	var withValue = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (withValue!=null){
		return decodeURI(withValue[1]) || 0;
	} else{
		var noValue = new RegExp('[\?&]' + name).exec(window.location.href);
		if (noValue!=null){
			return null;
		} else {
			return undefined;
		}
	}
}






