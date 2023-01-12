/** 
 * @fileOverview This javascript is used across the site
 * @version 1.0
 */
EmailSignupForm ={	
	/**
	 * The email signup form.
	 */
	signupForm: $('form.emailSignup'),
	
	submitted: false,
	
	registerModal: $('#registerAfterOffers'),
	
	registerForm: $('#EmailRegisterForm'),
	
	/**
	 * Setup validation on the email form.
	 */
	setupValidation: function(){
		var $signupForm = this.signupForm;
		var emailObj = this;

		$signupForm.each(function(){
			var f = $(this);
			
			f.validate ({
				onfocusout: false,
				onkeyup: false,
				onclick: false,
				errorClass: 'required',
				errorElement: 'span',
				rules:
				{
//					check18Years: {required:true},
					newsletterinput: {
						required:true, 
						email:true
					}
				},
				messages: 
				{
//					check18Years: MessageHelper.messages["ERROR_CERT_18"],
					newsletterinput: MessageHelper.messages["ERROR_EMAIL_EMPTY_FOOTER"]
				},
				highlight: function(element, errorClass) 
				{
				   $(element).addClass ("required");
				},
				unhighlight: function(element, errorClass) 
				{
				   $(element).removeClass ("required");
				},
				errorPlacement:function (error, element) {
					if (element.attr ("name") == "check18Years"){
						error.insertAfter(f.find('label[for*="18"], label[for*=eighteen], label[for=step3Offers]'));
					}
					else if (element.attr ("name") == "newsletterinput"){
						error.insertAfter(f.find('.fe'));
					}
					else{
						error.insertAfter(element);
					}
				}
			});
		});
		
		$signupForm.submit(function(){
			if (!emailObj.submitted){
				emailObj.submit(emailObj);
			}
			return false;
		});
		
		this.setupEmailRegisterModal();
		
	},
	
	/**
	 * Submit the email form.
	 */
	submit: function(emailObj){
		var $signupForm = this.signupForm;
		var	$emailSuccessMessage = $('.successMessageEmail');
		var	$subscribedMessage = $('.subscribed');
		var	$loggedInMessage = $('.logged');
		
		$subscribedMessage.hide ();
		$loggedInMessage.hide ();
		$emailSuccessMessage.hide ();
		
		if ($signupForm.valid()){
			console.log('insert eaactivity cookie from $signupForm');
			document.cookie = "eaactivity=true; max-age=2592000; path=/";

			emailObj.submitted = true;
			var submitURL = getAbsoluteURL() + 'TOEmailSubscription';
			
			$.ajax({
				url: submitURL,
				data: $signupForm.serialize(),
				dataType: 'json',
				type: 'post',
				complete: function(response){
					emailObj.submitted = false;
					try{
						var responseData = JSON.parse(response.responseText);
						
						if(responseData['status'] == '0' || responseData['status'] == '200' ){
							
							// show a popup register modal
							if(!constants.ajaxParams.loggedIn && typeof $emailSubmitted == "undefined" ){
								emailObj.registerModal.dialog('open');
							}
							
							
							$("#create-account-email").val($signupForm.find("input[name='email']").val());
							$('#EmailRegisterForm').find('input[name=logonIdVerify]').val($('#create-account-email').val());
							
							//Still want to show the success message.
							$emailSuccessMessage.html ("<span></span>" + MessageHelper.messages['EMAIL_SIGNUP_SUCCESS']).show();
							$emailSuccessMessage.detach().insertAfter($signupForm);
							$('#emailSignup').hide();
							
							
							utagLinkSafe({link_name:"emailSubscribe"});
							//Analytics Framework
							//MD5() defined in global.js
							// user_email_md5 has been added with ticket TODP-2969							
							var $emailSubmitted = $("input[name=newsletterinput]").val();
							// TODP-4657: the event has to be triggered for each entry point available.
							//if(utag_data.Page_Type == "Home"){ 
							var obj = {
								id : 'SignupForm', // utag_data properties
								User_Email_MD5 : md5($emailSubmitted.toLowerCase()),
								User_Email_SHA256 : sha256($emailSubmitted.toLowerCase()),
								User_EmailOptin : '1'
							};
							tealium_data2track.push(obj);
							// END Analytics Framework

							// refresh page after signup
							setTimeout(function() {
								window.onbeforeunload = function () {
									window.scrollTo(0,0);
								};
								location.reload();
							}, 1000);
						}else if( (responseData['status'] == '100' || responseData['status'] == '300') && $signupForm.find('[name=showRegister]').val() == 'true'){
							if ($signupForm.hasClass ('offers'))
								$('.emailSignup.offers .subscribed').show ();
							else {
								$('.emailSignup.section .subscribed').text('The email address you provided is already subscribed.');
								$('.emailSignup.section .subscribed').show ();
							}
						}else{
							MessageHelper.displayErrorMessage(constants.error.ajax);
						}
					}catch(err){
						MessageHelper.displayErrorMessage(constants.error.ajax);
					}
				}
			});
			
		}
		
		return false;
	},
	
	/**
	 * Set up the register modal that displays after opting in.
	 */
	setupEmailRegisterModal: function(){
		
		this.registerModal.dialog({	
			autoOpen: false,
			draggable: false,
			resizable: false,
			modal: true,
			appendTo: "#modalList",
			position : ['center'],
			zIndex: 9999,
			minWidth:490
		});
		
		
		 if ($('#logonPassword').val () == '')
			 $('#logonPassword').show ().prev ('input').hide ();

		if ($('#logonPasswordVerify').val () == '')
			$('#logonPasswordVerify').show ().prev ('input').hide (); 
		
		var examRegisterParameters = $.extend(true, {}, window.registerParameters);
		examRegisterParameters.rules = {
			logonId	:{required:true,email:true},
			logonIdVerify : {required:true,email:true,equalTo: "#EmailRegisterForm input[name=logonId]"},
			logonPassword : {required:true, minlength:6},
			logonPasswordVerify :{required:true,equalTo :'#EmailRegisterForm input[name=logonPassword]'},
			optin_18yrs : {required:true}
		};
		examRegisterParameters.messages = {
			logonId	:{required:MessageHelper.messages['ERROR_Logon_model_EmailInvalid']},
			logonIdVerify : {required:MessageHelper.messages['ERROR_LOGON_MODEL_EMAIL_CONFIRM'],email:MessageHelper.messages['ERROR_LOGON_MODEL_EMAIL_CONFIRM'],equalTo: MessageHelper.messages['ERROR_EMAIL_MISMATCH']},
			logonPassword : {required:MessageHelper.messages['ERROR_PASSWORD_ENTER'],minlength:MessageHelper.messages["PASSWORD_MIN_LENGTH_ERROR"]},
			logonPasswordVerify :{required:MessageHelper.messages['ERROR_PASSWORD_RE_ENTER']},
			optin_18yrs : {required:MessageHelper.messages['EYE_EXAM_ERROR_NOT_18_YEARS_OLD']}
		};
		examRegisterParameters.onkeyup = false;
		examRegisterParameters.onfocusout = false;
		
		examRegisterParameters.submitHandler = function(form){
			var f = $(form);

			$.ajax({
				url: getAbsoluteURL(true) + 'UserRegistrationAddAjax',
				data: f.serializeArray(),
				dataType: 'jsonp',
				crossDomain: true,
				success: function(data) {
					if(data.success) {
						EmailSignupForm.registerModal.dialog('close');
						constants.ajaxParams.loggedIn = true;
					}
					else {
						f.find('.registrationFailureMessage').hide().html(data.errorMessage).fadeIn(400).delay(5000).fadeOut(400);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					f.find('.registrationFailureMessage').hide().html(data.errorMessage).fadeIn(400).delay(5000).fadeOut(400);
				}
			});
			
			return false;
		};
		this.registerForm.validate(examRegisterParameters);
		var rf = this.registerForm;
		this.registerForm.find('a.submit').click(function(){
			rf.submit();
			return false;
		});

	}
}
