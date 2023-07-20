$(document).ready(function() {
    $("#ssn_input, #zip_input").keydown(function(e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    
    $('#tryAgainBtn, #tryDifferentInsurance').click(function() {
		  if(!$('#lc_step_6').hasClass("hidden"))
		  		$('#lc_step_6').addClass("hidden");
		  else if (!$('#lc_step_4').hasClass("hidden"))
			  $('#lc_step_4').addClass("hidden");
		  
		  if($('#lc_step_1').hasClass("hidden"))
			$('#lc_step_1').removeClass("hidden");
	});

    function reset_submit_form(){
      $("#personal-info-submit").removeClass("lc-btn-orange");
      $("#personal-info-submit").addClass("lc-disabled");
    }
    
    function enable_submit_form(){
      $("#personal-info-submit").addClass("lc-btn-orange");
      $("#personal-info-submit").removeClass("lc-disabled");
    }
    
    function check_personal_info(){
      reset_submit_form();
      var cont = 0;
      $("#personal-info").find("input, select").each(function() {
          if ($(this).attr("required") == "required") {
              var valore = $(this).val();
              if (valore == "" || valore == null || typeof valore == "undefined") {
                  cont++
              }
          }
      });
      if ($("#zip_input").val() == "" && $("#ssn_input").val() == "") {
          cont++
      }
      if(!$("#ageCheck").is(":checked")) {
          cont++
      }
      if (cont == 0) {
        enable_submit_form();
      }
    }

    $("#personal-info").keyup(function() {
        check_personal_info();
    });
    $("#personal-info").change(function() {
        check_personal_info();
    });

    function check_plan_info(){
      reset_submit_form();
      var cont = 0;
      $("#plan-info").find("input, select").each(function() {
          if ($(this).attr("required") == "required") {
              var valore = $(this).val();
              if (valore == "" || valore == null || typeof valore == "undefined") {
                  cont++
              }
          }
      });
      if(!$("#ageCheck").is(":checked")) {
          cont++
      }
      if (cont == 0) {
        enable_submit_form();
      }
    }
    $("#plan-info").keyup(function() {
        check_plan_info();
    });
    $("#plan-info").change(function() {
        check_plan_info();
    });
    $("#ageCheck").change(function() {
      if($("#plan-info").hasClass("lc-lookup-form-focus"))
        check_plan_info();
      else
        check_personal_info();
    });

    $("#personal-info input, #personal-info select").on({
        focus: function() {
            check_personal_info();

            $("#plan-info").removeClass("lc-lookup-form-focus");
            $("#personal-info").addClass("lc-lookup-form-focus");

            $("#personal_info").attr("checked", "checked");
            $("#plan_info").removeAttr("checked");
        },
        click: function() {
            check_personal_info();

            $("#plan-info").removeClass("lc-lookup-form-focus");
            $("#personal-info").addClass("lc-lookup-form-focus");

            $("#personal_info").attr("checked", "checked");
            $("#plan_info").removeAttr("checked");
        }
    });
    $("#plan-info input, #plan-info select").on({
        focus: function() {
            check_plan_info();

            $("#personal-info").removeClass("lc-lookup-form-focus");
            $("#plan-info").addClass("lc-lookup-form-focus");

            $("#personal_info").removeAttr("checked");
            $("#plan_info").attr("checked", "checked");
        },
        click: function() {
            check_plan_info();

            $("#personal-info").removeClass("lc-lookup-form-focus");
            $("#plan-info").addClass("lc-lookup-form-focus");

            $("#personal_info").removeAttr("checked");
            $("#plan_info").attr("checked", "checked");
        }
    });
    
    var tentative = parseInt(RiaHelper.getTentativeUserCookie());

    if (RiaHelper.getTentativeUserCookie() && tentative <= 0) {

        $("#lc_step_1").addClass("hidden");
        window.scrollTo(0, 0);
        $("#lc_step_5").removeClass("hidden"); // fail lock

    } else {
        if (RiaHelper.getTentativeUserCookie()) {
        	if (RiaHelper.getInsuranceCookie() !== '') {
        		var jsonInsuranceCookie = RiaHelper.loadJsonInsurance();

                if (jsonInsuranceCookie && jsonInsuranceCookie.data && jsonInsuranceCookie.data.contact && !jsonInsuranceCookie.data.contact[0]) {
                    $.post("/webapp/wcs/stores/jsonpInsuranceAjax.jsp", {
                        token: jsonInsuranceCookie.token,
                        infoForm: "sync",
                        storeId: 10851
                    }).done(function(data) {
                        if (data.reimbursement != null && data.discount != null && data.reimbursement == 0 && data.discount == 0) {
                            data.available = false;
                        }
                        jsonInsuranceCookie.data.contact[0] = data;
                        settingInsurance(jsonInsuranceCookie, false, _dl);
                    }).fail(function() {
                    	$("#lc_step_1").addClass("hidden");
        	            $(".lc_step_2").addClass("hidden");
        	            window.scrollTo(0, 0);
        	            $("#lc_step_6").removeClass("hidden"); // fail lock
                    });
                } else {
                    settingInsurance(jsonInsuranceCookie, false, _dl);
                }

            } else {
                openSessionExpiredMessage();
            }
        } else {
            if (RiaHelper.getInsuranceCookie() !== '') {
                RiaHelper.removeInsuranceCookie();
            }
        }
    }
});

//functions from abstract start
function selezionaradio(id) {
    $("#" + id).attr("checked", "checked");
    if (id == "ssn") {
        $("#zip_input").val("")
    } else {
        $("#ssn_input").val("")
    }
}

function getCookie(name) {
	var cookieArray = document.cookie.split(';');			
	var ca = cookieArray.map(function(cookie) {
		try {
			return decodeURIComponent(cookie);
		} catch(err) {
			return cookie;
		}
	});
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length + 1, c.length);
        }
    }
    return "";
}

function settingLoginSuccess() {
	$('#header-insurance').removeClass('not-logged').addClass('logged');
	
    var isPlanoLensSelected = $('#selectedLensPriceInHid').val() == 0;
    
    var $insuranceSwitch = $('#insurance-switch');
    
    if($insuranceSwitch) {
    	// if is pdp page
    	if($('.pdp-main-info.product').length > 0 && !isPlanoLensSelected && $('#contactLensesFormMobile').length == 0){
    		if(!$insuranceSwitch.hasClass('insurance-on')){
    			$insuranceSwitch.addClass('insurance-on');
    		}
    		$insuranceSwitch.find('span').text('Price with insurance');
	    }
    }
    
    $("#lc_step_1").addClass("hidden");
    $(".lc_step_2").addClass("hidden");
    window.scrollTo(0, 0);
    $("#lc_step_4").removeClass("hidden"); // recap benefit
}

function showInsuranceDateError() {
	if (site_layout == 'mobile')
        $("#birthMonth").parent('div').parent('div').addClass('error');
    else
        $("#birthMonth").parent('div').addClass('error');
    
    $('.validate-year, .validate-month, .validate-day').css('border', '1px solid #ce0a2d');
}

function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function checkInsurance() {
    $('.validate-month').css('border', '1px solid #3f2a2e');
    $('.validate-day').css('border', '1px solid #3f2a2e');
    $('.validate-year').css('border', '1px solid #3f2a2e');
    $('.validate-first-name').parent('div').removeClass('error');
    $('.validate-last-name').parent('div').removeClass('error');
    $('#zip_input').parent('div').removeClass('error');
    $('#ssn_input').parent('div').removeClass('error');
    if (site_layout == 'mobile') {
        $('#birthMonth').parent('div').parent('div').removeClass('error');
    } else {
        $('#birthMonth').parent('div').removeClass('error');
    }
    $('#planID').parent('div').removeClass('error');
    $('#memberID').parent('div').removeClass('error');
    $('#ageCheck').closest('div').removeClass('error');

    if (RiaHelper.getTentativeUserCookie() == "") {
        RiaHelper.setTentativeCookie(4);
    }
    
    var form = "",
        date = "",
        month = "",
        day = "",
        year = "",
        zip = "",
        ssn = "";
    
    var formValidated = true;
    
    if (!$("#ageCheck").is(":checked")) {
    	formValidated = false;
    	$("#ageCheck").parent('label').parent('div').addClass('error');
    	$('#ageUncheckedErr').css('display','block');
    }
    
    if (document.getElementById("plan_info").checked == true) {
        form = "plan";
        var planid = $("input[name='planID']").val();
        var memberid = $("input[name='memberID']").val();
        if (planid.length == '' || planid.length == 0) {
        	$("input[name='planID']").parent('div').addClass('error');
            formValidated = false;
        }
        if (memberid.length == '' || memberid.length == 0) {
        	$("input[name='memberID']").parent('div').addClass('error');
            formValidated = false;
        }
    } else {
        form = "personal";
        date = document.getElementById("birthMonth");
        month = date.options[date.selectedIndex].value;
        date = document.getElementById("birthDate");
        day = date.options[date.selectedIndex].value;
        date = document.getElementById("birthYear");
        year = date.options[date.selectedIndex].value;
        zip = $("input[name='zip']").val();
        ssn = $("input[name='ssn']").val();
        
        if ($("input#firstName").val() == '') {
            $('.validate-first-name').parent('div').addClass('error');
            formValidated = false;
        }
        
        if ($("input#lastName").val() == '') {
            $('.validate-last-name').parent('div').addClass('error');
            formValidated = false;
        }
        
        if (day == 0 || month == 0 || year == 0) {
            formValidated = false;
            showInsuranceDateError();
        } else {
        	// Leap year check
        	var selectedDate = new Date(year, (month - 1), day);
        	var selectedMonth = selectedDate.getMonth() + 1;
        	if (month < selectedMonth) {
        		formValidated = false;
        		showInsuranceDateError();
        	}
        }

        if (document.getElementById("zip").checked == true) {
            if (zip.length != 5) {
                $('#zip_input').parent('div').addClass('error');
                formValidated = false;
            }
        }
        
        if (document.getElementById("ssn").checked == true) {
            if (ssn.length != 4) {
                $('#ssn_input').parent('div').addClass('error');
                formValidated = false;
            }
        }
    }
    
    if(formValidated) {

	    $("#lc_step_1").addClass("hidden");
	    window.scrollTo(0, 0);
	    $(".lc_step_2").removeClass("hidden"); // loading
	
	
	    var IS_DEBUG_ACTIVE = false; // $.cookie('lux_omn_debug');
	
	    if (IS_DEBUG_ACTIVE) {
	        var data = {
	            'result': 'ok',
	            'data': {
	                'contact': [{
	                    'available': false,
	                    'nextServiceDate': '01/01/2018'
	                }],
	                'frames': [{
	                    //            'available': true,
	                    //            'reimbursement': '150',
	                    'available': false,
	                    'nextServiceDate': '01/01/2018'
	                }],
	                'frames_add' : [{
	                	'available': false
	                }],
	                'lenses': [{
	                    'available': false,
	                    'nextServiceDate': '01/01/2019'
	                }],
	                'lenses_add' : [{
	                	'available': false
	                }],
	                'exam': [{
	                    'available': false,
	                    'nextServiceDate': '01/01/2020'
	                }]
	            },
	            'patientInfo': {
	                'firstName': 'Ajeje',
	                'lastName': 'Brazof'
	            }
	        };
	        settingInsurance(data, true, _dl); // comment this line to see loading screen
	    } else {
	
	        // $.post( "/webapp/wcs/stores/servlet/AjaxInsuranceDoOnlineCustomerSearch", 
	        $.post("/webapp/wcs/stores/jsonpInsuranceAjax.jsp", {
	            //result: "ok",
	            planID: $("input[name='planID']").val(),
	            memberID: $("input[name='memberID']").val(),
	            firstName: $("input[name='firstName']").val(),
	            lastName: $("input[name='lastName']").val(),
	            birth_month: month,
	            birth_date: day,
	            birth_year: year,
	            zip: $("input[name='zip']").val(),
	            ssn: $("input[name='ssn']").val(),
	            infoForm: form,
	            storeId: 10851
	        }).done(function(data) {
	            settingInsurance(data, true, _dl);
	        }).fail(function() {
	            $("#lc_step_1").addClass("hidden");
	            $(".lc_step_2").addClass("hidden");
	            window.scrollTo(0, 0);
	            $("#lc_step_6").removeClass("hidden"); // fail lock
	        });
	    }
    }
}

function settingInsurance(json, switchActivated, dlObj) {
    
    if (json.result == "ok") {
        RiaHelper.setTentativeCookie(4);
        RiaHelper.setInsuranceCookie(json);
        settingDetailsInsurance(json.data);
	    if (switchActivated && $('.pdp-main-info.product').length > 0){
	    	//	deselect addons
			$(".lc-lens-enh-item.added").removeClass('added');
			$('.existing-lens-addons').empty();
			if ($('#contactLensesFormMobile').length > 0) {
				contactLensOptions.updateContactLensObject();
			} else {
	            saveLensSelectionData(false, function(){
	                 settingLoginSuccess();
	            }, true);
			}
	   }else{
	        settingLoginSuccess();
	   }
           
        constants.ajaxParams['insuranceCheckEligibility'] = true;
    } else {
        var tentative = parseInt(RiaHelper.getTentativeUserCookie());

        tentative = tentative - 1;
        if (tentative > 0) {
           
           try{
                var _dlCopy = $.extend(true, {}, dlObj);
                _dlCopy.site_events = {"insurance_sync_failure": "true"};
                _dlCopy.failure_try_count = tentative;
                _dlCopy.failure_reason = "user entered wrong data";
                
                if($('#personal_info').is(':checked')){
                
                _dlCopy.sync_method = "personal information";                     
                 
                 if($("#zip").is(':checked') && $("#zip_input").val().trim() != ''){
                     _dlCopy.zip_code = $("#zip_input").val();
                }          
                }else{
                _dlCopy.sync_method = "insurance information";
                }
                callTrackAnalytics(_dlCopy);
           }catch(err) {
                console.log('error');
           }
           
            RiaHelper.setTentativeCookie(tentative);

            if (tentative == 1)
                $('#one-more-chance').removeClass('hidden');
            
            $("#lc_step_1").addClass("hidden");
            $(".lc_step_2").addClass("hidden");
            window.scrollTo(0, 0);
            $("#lc_step_6").removeClass("hidden"); // try again
        } else {
           
           try{
                var _dlCopy = $.extend(true, {}, dlObj);
                _dlCopy.site_events = {
                     "insurance_account_locked": "true",
                     "insurance_sync_failure" : "true"
                };
                
                if($('#personal_info').is(':checked')){
                	_dlCopy.sync_method = "personal information";
                
                	if($("#zip").is(':checked') && $("#zip_input").val().trim() != ''){
                		_dlCopy.zip_code = $("#zip_input").val();
                	}          
                }else{
                	_dlCopy.sync_method = "insurance information";
                }
                callTrackAnalytics(_dlCopy);
           }catch(err) {
                console.log('error');
           }
           
            $("#lc_step_1").addClass("hidden");
            $(".lc_step_2").addClass("hidden");
            window.scrollTo(0, 0);
            $("#lc_step_5").removeClass("hidden"); // fail lock

            RiaHelper.setTentativeCookie();
        }

        constants.ajaxParams['insuranceCheckEligibility'] = false;
    }

    if (!json['trackingInfo']) {
    
     try{
                window._dl.insurance_status = CommonFunctions.getUserInsuranceEligibilityStatus();
                     
                var eligible_categories = [];
                var insCookie = JSON.parse(RiaHelper.getInsuranceCookie());
                console.log(insCookie);
                for(var cat in insCookie.data){
                if(insCookie.data[cat][0].available === true){
                     if((cat == 'frames' || cat == 'frames_add') && $.inArray('frames', eligible_categories) == -1){
                           eligible_categories.push('frames');
                     }else if(cat == 'lenses' || cat == 'lenses_add' && $.inArray('lenses', eligible_categories) == -1){
                           eligible_categories.push('lenses');
                     }else if(cat != 'frames_add' && cat != 'lenses_add'){
                           eligible_categories.push(cat);
                     }                          
                 }
                }
                
                if(eligible_categories.length > 0){
                window._dl.insurance_eligibility_status = eligible_categories;
                }            
                
                var dob = insCookie.patientInfo["dateOfBirth"];
                var ageRange = getInsuranceAgeRange(getAge(dob));
                
                var _dlCopy = $.extend(true, {}, window._dl);
                _dlCopy.site_events = {"insurance_sync_successful": "true"};                    
                _dlCopy.age = ageRange;            
                
                if(ageRange == "1"){
                _dlCopy.site_events.purchasing_for_child = true;
                }
                
                if($('#personal_info').is(':checked')){                         
                 _dlCopy.sync_method = "personal information";
                
                 if($("#zip").is(':checked') && $("#zip_input").val().trim() != ''){
                     _dlCopy.zip_code = $("#zip_input").val();
                 }          
                }else{
                _dlCopy.sync_method = "insurance information";
                }                    
                callTrackAnalytics(_dlCopy);
                
                
                //DEBUG CODE (LUXTO-120):
                //var func = _trackAnalytics;
                //_trackAnalytics = function(o){console.log('--- Tracking check: '+JSON.stringify(o,null,4)); func(o)}

                //tracking infos will be stored only if check eligibility is ok
                //but they will be sent in both cases (ok or ko)
                if (constants.ajaxParams['insuranceCheckEligibility']) {
                json['trackingInfo'] = {
                    insurance_status: window._dl.insurance_status,
                    insurance_eligibility_status: window._dl.insurance_eligibility_status
                    };
                RiaHelper.setTentativeCookie(4);
                RiaHelper.setInsuranceCookie(json);
                }
    } catch(err) {
                console.log(err);
           }  
    } else {
    if(typeof json['trackingInfo'].insurance_status !== 'undefined' &&
                typeof json['trackingInfo'].insurance_eligibility_status !== 'undefined') {
           window._dl.insurance_status = json['trackingInfo'].insurance_status;
           window._dl.insurance_eligibility_status = json['trackingInfo'].insurance_eligibility_status;
    }
    }
}


function settingDetailsInsurance(json) {

    if (json != "") {
    	var contact;
    	if(typeof json['contact'] == 'undefined') {
    		contact = false;
    	}
    	else {
    		contact = json['contact'][0].available;
    	}
    	if(typeof json['frames'] == 'undefined') {
    		frames = false;
    	}
    	else {
    		frames = json['frames'][0].available;
    	}
    	if(typeof json['lenses'] == 'undefined') {
    		lenses = false;
    	}
    	else {
    		lenses = json['lenses'][0].available;
    	}
    	if(typeof json['exam'] == 'undefined') {
    		exam = false;
    	}
    	else {
    		exam = json['exam'][0].available;
    	}
    	    	
    	$('#lc_step_4 p.lc-subtitle').text('Great news! You are eligible for the following insurance benefits:');
    	$('#lc_step_4 #tryDifferentInsurance').addClass('hidden');
    	$('#lc_step_4 #startShopping').removeClass('lc-btn-clear-blue').addClass('lc-btn-orange');
    	$('.lc-elig-messages div').addClass('hidden');
    	
    	var $needHelp = $('#lc_step_4 .lc-lookup-need-help');
    	
    	if ($needHelp)
    		$needHelp.addClass('hidden');
    	
    	if (contact) {
    		$('#lc_elig_contact_mobile').addClass('lc-elig-available');
            $('#lc_elig_contact_mobile .lc-sprite').removeClass('lc-contact-lenses');
            $('#lc_elig_contact_mobile .lc-sprite').addClass('lc-contact-lenses-green');
            $('#lc_elig_contact_mobile .lc-elig-available-msg').removeClass('hidden');
    	} else {
    		$('#lc_elig_contact_mobile').removeClass('lc-elig-available');
            $('#lc_elig_contact_mobile .lc-sprite').removeClass('lc-contact-lenses-green');
            $('#lc_elig_contact_mobile .lc-sprite').addClass('lc-contact-lenses');
            $('#lc_elig_contact_mobile .lc-elig-unavailable-msg').removeClass('hidden');
    	}
    	
    	if (exam) {
    		$('#lc_elig_exam_mobile').addClass('lc-elig-available');
            $('#lc_elig_exam_mobile .lc-sprite').removeClass('lc-exam');
            $('#lc_elig_exam_mobile .lc-sprite').addClass('lc-exam-green');
            $('#lc_elig_exam_mobile .lc-elig-available-msg').removeClass('hidden');
    	} else {
    		$('#lc_elig_exam_mobile').removeClass('lc-elig-available');
            $('#lc_elig_exam_mobile .lc-sprite').removeClass('lc-exam-green');
            $('#lc_elig_exam_mobile .lc-sprite').addClass('lc-exam');
            $('#lc_elig_exam_mobile .lc-elig-unavailable-msg').removeClass('hidden');
    	}
    	
    	$('#lc_elig_frames_mobile').addClass('lc-elig-available');
		$('#lc_elig_frames_mobile .lc-sprite').removeClass('lc-frames-big');
		$('#lc_elig_frames_mobile .lc-sprite').addClass('lc-frames-green');
		
		$('#lc_elig_lenses_mobile').addClass('lc-elig-available');
        $('#lc_elig_lenses_mobile .lc-sprite').removeClass('lc-lenses-big');
        $('#lc_elig_lenses_mobile .lc-sprite').addClass('lc-lenses-green');
        
        
        var frames_add = false;
        var lenses_add = false;
        
        if (json.hasOwnProperty('frames_add') && json.hasOwnProperty('lenses_add')) {
        	frames_add = json['frames_add'][0].available;
        	lenses_add = json['lenses_add'][0].available;
        }
        
    	if ((!frames && !lenses) && (frames_add && lenses_add)) {
    		$('#lc_elig_frames_mobile .lc-elig-complete-msg').removeClass('hidden');
    		$('#lc_elig_frames_mobile .lc-elig-available-msg').addClass('hidden');
    		$('#lc_elig_lenses_mobile .lc-elig-complete-msg').removeClass('hidden');
    		$('#lc_elig_lenses_mobile .lc-elig-available-msg').addClass('hidden');
		} else {
			if (frames) {
				$('#lc_elig_frames_mobile .lc-elig-available-msg').removeClass('hidden');
			} else if (frames_add) {
				$('#lc_elig_frames_mobile .lc-elig-add-msg').removeClass('hidden');
			} else {
				$('#lc_elig_frames_mobile').removeClass('lc-elig-available');
				$('#lc_elig_frames_mobile .lc-sprite').removeClass('lc-frames-green');
	    		$('#lc_elig_frames_mobile .lc-sprite').addClass('lc-frames-big');
	    		$('#lc_elig_frames_mobile .lc-elig-unavailable-msg').removeClass('hidden');
			}
			
			if (lenses) {
				$('#lc_elig_lenses_mobile .lc-elig-available-msg').removeClass('hidden');
			} else if (lenses_add) {
				$('#lc_elig_lenses_mobile .lc-elig-add-msg').removeClass('hidden');
			} else {
				$('#lc_elig_lenses_mobile').removeClass('lc-elig-available');
				$('#lc_elig_lenses_mobile .lc-sprite').removeClass('lc-lenses-green');
	    		$('#lc_elig_lenses_mobile .lc-sprite').addClass('lc-lenses-big');
	    		$('#lc_elig_lenses_mobile .lc-elig-unavailable-msg').removeClass('hidden');
			}
		}
    	
        if (!contact && !frames && !frames_add && !lenses && !lenses_add && !exam) {
        	$('#lc_step_4 p.lc-subtitle').text('So sorry, but you are not eligible:');
        	$('#lc_step_4 #tryDifferentInsurance').removeClass('hidden');
        	$('#lc_step_4 #startShopping').removeClass('lc-btn-orange').addClass('lc-btn-clear-blue');
        	
            if($needHelp)
            	$needHelp.removeClass('hidden');
        }
    }
}

function openSessionExpiredMessage() {
    if (RiaHelper.getCookie('tentative_user') === '4') {
    	RiaHelper.removeInsuranceCookie();

        if(!$('#lc_step_6').hasClass( "hidden" ))
    		$('#lc_step_6').addClass( "hidden" );
    	  
    	if($('#lc_step_1').hasClass( "hidden" ))
    		$('#lc_step_1').removeClass( "hidden" );
    	
    	$('#timedOutSession').css("display", "block");
        //location.reload();
    }
}
//functions from abstract end

function updatePDPInsurancePrices(switchActivated, onPricesUpdated) {
	var params = {};
	params['__PRICING_ENTRY'] = [];
	var totalPrice = 0.0;
	
	var fprice = $('#price').text().trim().substring(1);
    var fupc = $('#pdp-sku').text().trim().substring(9);
    var frameParams = {
        price: fprice,
        upc: fupc,
        quantity: '1',
        type: 'f'
    };
    
    var lensParams;
    var lens = $('.select-lens-type.active').find('input');
    
    if (lens.length > 0) {
    	lensParams = {
			price: $(lens).data('listprice'),
			upc: $(lens).data('lens-upc'),
			quantity: '1',
			type: 'l'
		};
    } else {
    	lensParams = {
			price: $('.lensPrice').val(),
			upc: $('.lensUPC').val(),
			quantity: '1',
			type: 'l'
    	};
    }

    if (typeof lensParams.upc !== 'undefined' && lensParams.upc !== ''
    	&& typeof lensParams.price !== 'undefined' && lensParams.price != '') {
    
	    totalPrice += parseFloat(frameParams.price) + parseFloat(lensParams.price);
	    
	    var enhancements = [];
	    $.each($('.lc-lens-enh-item.added > label > input'), function(index, enh) {
	    	enhancements.push ({
	        	price: $(this).data('price').substring(1), 
	        	upc:$(this).data('pn'), 
	        	quantity: '1',
	        	type: 'l' 
	    	});
	    	totalPrice += parseFloat($(this).data('price').substring(1));
	    });
	    
	    params['__PRICING_ENTRY'].push ( JSON.stringify( { frame: frameParams, lens: lensParams, enhancements: enhancements} ) );
	    
	    if(!switchActivated)
	    	showInsurancePriceLoader();
	    
	    sendRIARequest(params, function(response){
	    	var jsonResponse = $.parseJSON(response);
		    var discount =  $.parseJSON(jsonResponse['__PAIR_DISCOUNT']);
		    var frameDiscount = discount[0].frameDiscount;
		    var lensDiscount =  discount[0].lensDiscount;
		    var enhancementsDiscount = discount[0].enhancementsDiscount;
		    console.debug('frameDiscount:' + frameDiscount + ', lensDiscount:'+lensDiscount + 'enhancementsDiscount:'+enhancementsDiscount);
		    
		    var RIASavings = frameDiscount + lensDiscount + enhancementsDiscount;
		    totalPrice -= RIASavings;
		    
		    if (totalPrice < 0) 
		    	totalPrice = 0;
		    
		    if(!switchActivated)
			    closeInsurancePriceLoader();
		    
		    $('.total-savings').addClass('hide');
		    $('.total-savings-ria > .total_figures').text('$' + RIASavings.toFixed(2));
		    $('.total-savings-ria').removeClass('hide');
		    $('.main-total > .subtotal > span').text('$' + totalPrice.toFixed(2));
			$('#scrollBar .price > span').text('$' + totalPrice.toFixed(2));
			
			if(typeof onPricesUpdated !== 'undefined')
				onPricesUpdated(totalPrice, lensParams.price);
	    });
    }
}

function getAge(dateString){
	
	var arrDob = dateString.split("/");
	var bYear = arrDob[2];
	var bMonth = arrDob[0];
	var bDay = arrDob[1];	
	
    var today = new Date();
    var birthDate = new Date(bYear, bMonth, bDay);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getInsuranceAgeRange(age){
	
	switch (true) {
	    case (age >= 0 && age <= 10):
	    	ageRange = "1";
	        break;
	    case (age >= 11 && age <= 20):
	    	ageRange = "2";
	        break;
	    case (age >= 21 && age <= 30):
	    	ageRange = "3";
	        break;
	    case (age >= 31 && age <= 40):
	    	ageRange = "4";
	        break;
	    case (age >= 41 && age <= 50):
	    	ageRange = "5";
	        break;
	    case (age >= 51 && age <= 60):
	    	ageRange = "6";
	        break;
	    case (age >= 61 && age <= 70):
	    	ageRange = "7";
	        break;
	    default: ageRange = "8"    
	}
	
    return ageRange;
}

function sendRIARequest(RIAData, onSuccess, onError) {

    var jsonRIACookieContent = RiaHelper.getInsuranceCookie();
    RIAData['storeId'] = constants.ajaxParams['storeId'];
    RIAData['catalogId'] = constants.ajaxParams['catalogId'];
    RIAData['langId'] = constants.ajaxParams['langId'];
    RIAData['orderId'] = '.';
    RIAData['__RIA_SYNC_TOKEN'] = JSON.parse(jsonRIACookieContent).token;
    RIAData['__RIA_SYNC_INFO'] = JSON.parse(jsonRIACookieContent).riaInsuranceInformation;

    $('.not-insurable').addClass('hide');
    
    $.ajax({
        type: "POST",
        url: getAbsoluteURL() + 'CalculateProductInsuranceBenefit',
        traditional: true,
        data: RIAData,
        success: function(response) {
            onSuccess(response);
        },
        error: function(response) {
            onError(response)
        }
    });
}
