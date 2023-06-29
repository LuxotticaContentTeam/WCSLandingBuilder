$(document).ready(function() {

    //Rewrite close dropdown select birthday when scroll windows
    $(window).data('selectBox-bindings', true).bind('scroll.selectBox', '').bind('resize.selectBox', '');
    //Functions dialog modal

    var lc_width_modale = "";
    $(window).load(function() {
        if (site_layout == "mobile") {
            var wWidth = $(window).width();
            lc_width_modale = wWidth * 0.96;
        } else {
            lc_width_modale = "818";
        }
    });

    window.addEventListener('orientationchange', function() {
        if (site_layout == 'mobile') {
            $('.lc-dialog-form').parent().css('top', '180px');
        }
    }, false);

    lc_width_modale = "818";
    var insuranceModal = $('#insuranceModal .lc-dialog-form').dialog({
        autoOpen: false,
        modal: false,
        width: lc_width_modale,
        resizable: false,
        draggable: false,
        stack: false,
        title: "CHECK YOUR INSURANCE ELIGIBILITY ",
        dialogClass: 'lc-dialog-center',
        open: function(event, ui) {
            $('.ui-widget-overlay').not('#insuranceModal .ui-widget-overlay').remove();
            $('#insuranceModal').append('<div class="ui-widget-overlay black-overlay" style="display: none; width: 100%; height: 1674px; z-index: 9999 !important;"></div>');
            $('#insuranceModal  .ui-widget-overlay').off('click');

            $('#insuranceModal  .ui-widget-overlay').css('display', 'block');
            $('#insuranceModal  .ui-widget-overlay').addClass('black-overlay');
            if (site_layout == "mobile") {
                $(event.target).parent().css('top', '180px');
                $('#insuranceModal  .ui-widget-overlay').css('width', '100%');
            }
            $('#insuranceModal  .ui-widget-overlay').css('height', $(document).height() + 250);
        },
        close: function(event, ui) {
            // Header z-index workaround
            $('#header').css('z-index', 9600);

            if (!$('#insurance-switch').closest('.pdp-item-options').length > 0 && RiaHelper.isInsuranceOn()) {
                chooseInsurance(true);
            }
            $('#insuranceModal .ui-widget-overlay').remove();
            //$('#insuranceModal  .ui-widget-overlay').css('display', 'none');
            $('#insuranceModal  .ui-widget-overlay').removeClass('black-overlay');
        }
    });

    $('#insuranceModal').empty();
    insuranceModal.parent().appendTo('#insuranceModal');

    //    $(document).on('click','#insurance-switch', function() {
    //    	if($(this).hasClass('insurance-on')){
    //    		$(this).removeClass('insurance-on'); 
    //    		
    //    		var _dlCopy = $.extend(true, {}, _dl);
    //            _dlCopy.site_events = {"toggle_insurance_eligibility": "true"};
    //            _dlCopy.insurance_status = "not synced";
    //            callTrackAnalytics(_dlCopy);
    //            
    //            if (RiaHelper.isInsuranceOn()) {
    //    			RiaHelper.toggleInsurance(false);
    //    		}
    //    		
    //    		// TURN OFF INSURANCE IN CART
    //    		if($('.pdp-container').length == 0){
    //        		$('#cart-insurance-warning').css('display', 'none');
    //        		$('#ShoppingCartContent').css('border-color', '#d5d5d5');
    //        		chooseInsurance(false);
    //        	}else{
    //    			// TURN OFF INSURANCE IN PDP
    //    			$(this).find('span').text('Activate insurance');
    //    			var lens = $('.lens-hidden-data > .lensCatentryId').val();
    //    			if(lens != ''){
    //    				$.query.REMOVE("selectedLens");
    //    			    var param = $.query.SET("selectedLens", lens);
    //    				window.location.href = param.toString();
    //    				return;
    //    			}
    //   				window.location.reload();
    //    		}
    //    	} else {
    //    		// Perk Insurance Modal
    //    		if($('input[name=newPerksFlow]').length > 0 && $('#perk-amount').length > 0){
    //    			
    //    			var pIModalOver = $('#perks-insurance-modal-overlay');
    //            	var pIModal = $('#perks-insurance-modal');
    //            	var PIMUseIns = $('.perks-use-insurance');
    //            	
    //            	var closePIM = function(){
    //            		pIModal.css('display', 'none');
    //            		pIModalOver.css('display', 'none');
    //            	};
    //            	
    //            	pIModalOver.css('display', 'block');
    //            	pIModal.css('display', 'block');   	
    //            	
    //            	pIModal.find('.close-button, .perks-cancel').on('click', closePIM);	
    //            	pIModalOver.on('click', closePIM);
    //            	
    //            	PIMUseIns.on('click', function(){
    //            		closePIM();
    //            		$('#header').css('z-index', 0);
    //            		insuranceModal.dialog('open');    		
    //            	});
    //    		}
    //    		else{
    //    			turnInsuranceOn();
    //    		}   				
    //    	}
    //
    //
    //    	if($('.pdp-container').length == 0){
    //	    	var nItems = $('.cart-item-container').length;
    //	    	var nWithPrescrItems = $('.cart-item-container form.lc2.prescription-needed').length;
    //	        if(nItems !== nWithPrescrItems){
    //	        	if($('#insurance-switch').hasClass('insurance-on')){
    //	        		$('#insurance-switch').removeClass('insurance-on'); 
    //	        		// TURN OFF INSURANCE IN CART
    //	        		if (RiaHelper.isInsuranceOn()) {
    //	        			RiaHelper.toggleInsurance(false);
    //	        		}
    //	        		
    //	        		chooseInsurance(false);
    //	        	}
    //	        	//warning cannot activate insurance
    //	        	$('.not-insurable').removeClass('hide');
    //	        }
    //	    }
    //    	
    //    	
    //    });

    window.turnInsuranceOn = function() {

        var switchElement = $('#insurance-switch');

        // TURN ON INSURANCE CART
        if ($('.pdp-container').length == 0) {

            // IF THERE IS MORE THAN 1 ITEM IN CART
            var cartQty = $('#tah-quantity-header').text();
            if (cartQty > 1) {
                //$(this).addClass('insurance-on');

                $('#cart-insurance-warning').css('display', 'block');
                $('#ShoppingCartContent').css('border-color', '#CF0329');

                try {
                    console.log('Before event is fired.');
                    var _dlCopy = $.extend(true, {}, _dl);
                    _dlCopy.site_events = {
                        "insurance_cart_limit_error": "true"
                    };
                    _dlCopy.insurance_status = "synced";
                    _dlCopy.insurance_eligibility_status = window._dl.insurance_eligibility_status;
                    callTrackAnalytics(_dlCopy);
                    console.log('After event is fired.');
                } catch (e) {
                    console.log("error: " + e.stack);
                }

            } else {
                if (RiaHelper.getInsuranceCookie() == '') {
                    // Header z-index workaround
                    $('#header').css('z-index', 0);

                    //display modal if ria is not enabled
                    insuranceModal.dialog('open');
                    try {
                        var _dlCopy = $.extend(true, {}, _dl);
                        _dlCopy.site_events = {
                            "insurance_check_eligibility": "true"
                        };
                        _dlCopy.insurance_navigation = "member lookup overlay";
                        callTrackAnalytics(_dlCopy);
                    } catch (err) {
                        console.log('error');
                    }
                } else {
                    var _dlCopy = $.extend(true, {}, _dl);
                    _dlCopy.site_events = {
                        "toggle_insurance_eligibility": "true"
                    };
                    callTrackAnalytics(_dlCopy);

                    $('#insurance-header-link').removeClass('not-logged').addClass('logged');
                    switchElement.addClass('insurance-on');
                    if (!RiaHelper.isInsuranceOn()) {
                        RiaHelper.toggleInsurance(true);
                    }
                    chooseInsurance(true);
                }
            }
        } else {
            // TURN ON INSURANCE IN PDP

            var isPlanoLensSelected = $('#selectedLensPriceInHid').val() == 0;

            if (RiaHelper.getInsuranceCookie() == '') {
                //display modal if ria is not enabled
                insuranceModal.dialog('open');
                try {
                    var _dlCopy = $.extend(true, {}, _dl);
                    _dlCopy.site_events = {
                        "insurance_check_eligibility": "true"
                    };
                    _dlCopy.insurance_navigation = "member lookup overlay";
                    callTrackAnalytics(_dlCopy);
                } catch (err) {
                    console.log('error');
                }
            } else {
                var _dlCopy = $.extend(true, {}, _dl);
                _dlCopy.site_events = {
                    "toggle_insurance_eligibility": "true"
                };
                _dlCopy.insurance_status = "synced";
                callTrackAnalytics(_dlCopy);

                $('#insurance-header-link').removeClass('not-logged').addClass('logged');
                switchElement.addClass('insurance-on');
                switchElement.find('span').text('Price with insurance');
                if (!RiaHelper.isInsuranceOn()) {
                    RiaHelper.toggleInsurance(true);
                }

                if (isPlanoLensSelected) {
                    $('.not-insurable').removeClass('hide');
                    switchElement.removeClass('insurance-on');
                    saveLensSelectionData(false, LC2.currentLenses, undefined, true);
                } else {
                    saveLensSelectionData(false, LC2.currentLenses);
                }
            }
        }

    };

    window.closeInsuranceModal = function() {
        if ($('#insuranceModal').length > 0)
            insuranceModal.dialog('close');
        else
            window.location.href = '/lc-us/eyewear-all';
    };

    $("#insuranceModal .lc-close-dialog").click(function() {
        $('#insuranceModal .lc-dialog-form').dialog('close');
    });

    //Functions form custom
    $("#ssn").change(function() {
        $("#zip_input").val("");
        $("#ssn_input").add($("#ssn_input").next()).removeClass("hidden");
        $("#ssn").next().next().removeClass("hidden");
        $("#zip_input").add($("#zip_input").next()).addClass("hidden");
        $("#zip").next().next().addClass("hidden");
    });
    $("#zip").change(function() {
        $("#ssn_input").val("");
        $("#zip_input").add($("#zip_input").next()).removeClass("hidden");
        $("#zip").next().next().removeClass("hidden");
        $("#ssn_input").add($("#ssn_input").next()).addClass("hidden");
        $("#ssn").next().next().addClass("hidden");
    });

    function lc_reset_form(id_form) {
        $("#" + id_form).trigger("reset");
        $("#ageCheck").attr('checked', false);
    }
    //Dropdown
    $(".lc-elig-row").click(function() {
        if ($(this).next().hasClass('lc-elig-row-dropdown')) {
            if ($(this).hasClass("lc-open")) {
                $(this).removeClass("lc-open");
                $(this).next().slideUp(300);
            } else {
                $(this).addClass("lc-open");
                $(this).next().slideDown(300);
            }
        }
    });
    //Js for mobile
    $(window).load(function() {
        if (site_layout == "mobile") {
            if ($("#personal-info").hasClass("lc-lookup-form-focus"))
                lc_mobile_show_form_personal_info();
            else
                lc_mobile_show_form_plain_info();

            $("#plan_info").click(function() {
                lc_mobile_show_form_plain_info();
                $('html,body').animate({
                    scrollTop: 0
                });
            });
            $("#personal_info").click(function() {
                lc_mobile_show_form_personal_info();
                $('html,body').animate({
                    scrollTop: 0
                });
            });

            function lc_mobile_show_form_plain_info() {
                $("#personal-info").find(".lc-info").hide();
                $("#plan-info").find(".lc-info").slideDown(300);
            }

            function lc_mobile_show_form_personal_info() {
                $("#plan-info").find(".lc-info").hide();
                $("#personal-info").find(".lc-info").slideDown(300);
            }
        }

        // check if show item limit message in cart when user enters cart with insurance previously activated
        if (!$('.pdp-item-options').length > 0 &&
            RiaHelper.isInsuranceOn() &&
            $('#tah-quantity-header').text() > 1 &&
            $('#insurance-switch').hasClass('insurance-on')) {
            $('#cart-insurance-warning').css('display', 'block');
            $('#ShoppingCartContent').css('border-color', '#CF0329');
            try {
                console.log('Before event is fired.');
                var _dlCopy = $.extend(true, {}, _dl);
                _dlCopy.site_events = {
                    "insurance_cart_limit_error": "true"
                };
                callTrackAnalytics(_dlCopy);
                console.log('After event is fired.');
            } catch (e) {
                console.log("error: " + e.stack);
            }
        }

        if ($('.pdp-container').length == 0) {
            var nItems = $('.cart-item-container').length;
            var nWithPrescrItems = $('.cart-item-container form.lc2.prescription-needed').length;
            if (nItems !== nWithPrescrItems) {
                if (RiaHelper.isInsuranceOn()) {
                    $('#insurance-switch').removeClass('insurance-on');
                    if (RiaHelper.isInsuranceOn()) {
                        RiaHelper.toggleInsurance(false);
                    }
                    // TURN OFF INSURANCE IN CART
                    chooseInsurance(false);
                }
            }

        }


    });


});

function lc_change_title_dialog(new_title) {
    if (new_title != "") $('.lc-dialog-form').dialog('option', 'title', new_title);
}

//-----------------------------------------------------------------
//Licensed Materials - Property of IBM
//
//WebSphere Commerce
//
//(C) Copyright IBM Corp. 2006, 2010 All Rights Reserved.
//
//US Government Users Restricted Rights - Use, duplication or
//disclosure restricted by GSA ADP Schedule Contract with
//IBM Corp.
//-----------------------------------------------------------------
var mesi = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

$(document).ready(function() {

    if (RiaHelper.getInsuranceCookie() !== '') {
        $('#insurance-header-link').removeClass('not-logged').addClass('logged');

        if ($('#lc_step_6').hasClass("hidden"))
            $('#lc_step_6').removeClass("hidden");

        if (!$('#lc_step_1').hasClass("hidden"))
            $('#lc_step_1').addClass("hidden");

        changeInsuranceModalTitle(6);
    }



    if (document.getElementById("plan_info") !== null && document.getElementById("plan_info").checked == true) {
        onInfoChange('plan');
    }
    if (document.getElementById("personal_info") !== null && document.getElementById("personal_info").checked == true) {
        onInfoChange('personal');
    }

    $('#tryAgainBtn').click(function() {
        if (!$('#lc_step_6').hasClass("hidden"))
            $('#lc_step_6').addClass("hidden");

        if ($('#lc_step_1').hasClass("hidden"))
            $('#lc_step_1').removeClass("hidden");

        changeInsuranceModalTitle(1);

        if (document.getElementById("plan_info").checked == true) {
            onInfoChange('plan');
        }
        if (document.getElementById("personal_info").checked == true) {
            onInfoChange('personal');
        }

    });

    $('.useAnotherInsuranceButton').click(function() {
        if (RiaHelper.getInsuranceCookie() !== '') {
            RiaHelper.removeInsuranceCookie();
        }
        var isModal = true; //$('#insuranceModal').length > 0; 
        if (isModal) {
            event.preventDefault();
            if (!$('#lc_step_4').hasClass("hidden"))
                $('#lc_step_4').addClass("hidden");

            if ($('#lc_step_1').hasClass("hidden"))
                $('#lc_step_1').removeClass("hidden");

            changeInsuranceModalTitle(1);

        }
    });

    if (site_layout == 'mobile') {
        $("#personal-info").validate({
            validClass: "lc-valid"
        });
        $("#plan-info").validate({
            validClass: "lc-valid"
        });
    } else {
        $("#personal-info").validate();
        $("#plan-info").validate();
    }



    function check_personal_info() {
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
        if (!$("#ageCheck").is(":checked")) {
            cont++
        }
        if (cont == 0) {
            enable_submit_form();
        } else
            reset_submit_form();
    }

    $("#personal-info").keyup(function() {
        check_personal_info();
    });
    $("#personal-info").change(function() {
        check_personal_info();
    });

    function check_plan_info() {
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
        if (!$("#ageCheck").is(":checked")) {
            cont++
        }
        if (cont == 0) {
            enable_submit_form();
        } else
            reset_submit_form();
    }
    $("#plan-info").keyup(function() {
        check_plan_info();
    });
    $("#plan-info").change(function() {
        check_plan_info();
    });
    $("#ageCheck").change(function() {
        if ($("#plan-info").hasClass("lc-lookup-form-focus"))
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
    /*
	 for (var i = 1; i <= 12; i++) {
   var str = "" + i;
   var pad = "0";
   var ans = pad.substring(0, pad.length - str.length) + str;
   $(".month").append("<option value='" + i + "'>" + ans + "</option>");
	 }
	 for (var i = 1; i <= 31; i++) {
	      var str = "" + i;
	      var pad = "0";
	      var ans = pad.substring(0, pad.length - str.length) + str;
	      $(".day").append("<option value='" + i + "'>" + ans + "</option>")
	 }
	 var data = new Date();
	 for (var i = parseInt(data.getFullYear()); i >= 1900; i--) {
	      $(".year").append("<option value='" + i + "'>" + i + "</option>")
	 }
	 */

    var tentative = parseInt(RiaHelper.getTentativeUserCookie());

    //console.log("tentative: " + tentative);

    if (RiaHelper.getTentativeUserCookie() && tentative <= 0) {

        $("#lc_step_1").addClass("hidden");
        window.scrollTo(0, 0);
        $("#lc_step_5").removeClass("hidden"); // fail lock

        changeInsuranceModalTitle(5);

    } else {
        if (RiaHelper.getTentativeUserCookie()) {
            if (RiaHelper.getInsuranceCookie() !== '') {
                var jsonInsuranceCookie = RiaHelper.loadJsonInsurance();

                if (jsonInsuranceCookie && jsonInsuranceCookie.data && jsonInsuranceCookie.data.contact && !jsonInsuranceCookie.data.contact[0]) {
                    $.post("/webapp/wcs/stores/jsonpInsuranceAjax.jsp", {
                        token: jsonInsuranceCookie.token,
                        infoForm: "sync",
                        storeId: 15951
                    }).done(function(data) {
                        if (data.reimbursement != null && data.discount != null && data.reimbursement == 0 && data.discount == 0) {
                            data.available = false;
                        }
                        jsonInsuranceCookie.data.contact[0] = data;
                        settingInsurance(jsonInsuranceCookie, true, _dl);
                    }).fail(function() {
                        //alert("The store has encountered a problem processing the last request. Try again later. If the problem persists, contact your site administrator.");
                        $("#lc_step_1").addClass("hidden");
                        $("#lc_step_2").addClass("hidden");
                        window.scrollTo(0, 0);
                        $("#lc_step_6").removeClass("hidden"); // fail lock
                        changeInsuranceModalTitle(6);
                    });
                } else {
                    if (RiaHelper.isInsuranceOn() && !$(".checkout-step-4").length) {
                        settingInsurance(jsonInsuranceCookie, true, _dl);
                    }
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

    //TODO: timeout fn - commented for debug

    //    var idleState = false;
    //    var idleTimer = null;
    //    $('*').bind('click keydown keypress keyup dblclick', function () {
    //
    //      
    //      var user = RiaHelper.getTentativeUserCookie();
    //      var json = RiaHelper.loadJsonInsurance();
    //      clearTimeout(idleTimer);
    //      if (idleState == true) {
    //        
    //        console.log("hello");
    //        
    //        if (user != "" && json) {
    //          openSessionExpiredMessage();
    //        }   
    //      } else {
    //        if (user != "" && json) 
    //        { 
    //          RiaHelper.setTentativeCookie(4); 
    //        }	    		
    //      }
    //      idleState = false;
    //
    //      idleTimer = setTimeout(function () { 
    //        idleState = true; }, 1800000);
    //    });
    //    $("body").trigger("mousemove");

    //TODO: timeout fn - commented for debug
    /////////////});



    function checkForEmptyInputs($container) {
        var cont = 0;
        $container.find("input, select").each(function() {
            if ($(this).attr("required") == "required") {
                var valore = $(this).val();
                if (typeof valore === "undefined" || valore === "" || valore == null) {
                    cont++;
                }
            }
        });
        return cont;
    }

    function onPersonalInfoChange() {
        //$("#personal-info-submit").prop('disabled', true);
        var cont = 0;
        if (!$('#personal_info').is(':checked')) {
            cont++;
        } else {
            $("#plan-info-submit").prop('disabled', true);
        }
        if (cont <= 0) {
            cont += checkForEmptyInputs($(this));
        }
        if (cont <= 0) {
            if ($("#zip_input").val() == "" && $("#ssn_input").val() == "") {
                cont++;
            }
        }
        if (cont <= 0) {
            if (!$("#personal-info .ageCheck").is(':checked')) {
                cont++;
            }
        }
        if (cont == 0) {
            $("#personal-info-submit").prop('disabled', false);
        }
    }
    $("#personal-info, #personal_info").on('keyup change', onPersonalInfoChange);

    function onPlanInfoChange() {
        // $("#plan-info-submit").prop('disabled', true);
        var cont = 0;
        if (!$('#plan_info').is(':checked')) {
            cont++;
        } else {
            //$("#personal-info-submit").prop('disabled', true);
        }
        if (cont <= 0) {
            cont += checkForEmptyInputs($(this));
        }
        if (cont <= 0) {
            if (!$("#plan-info .ageCheck").is(':checked')) {
                cont++;
            }
        }
        if (cont == 0) {
            $("#plan-info-submit").prop('disabled', false);
        }
    }
    $("#plan-info, #plan_info").on('keyup change', onPlanInfoChange);

    function onInfoChange(type) {
        if (type === 'personal')
            onPersonalInfoChange()
        else
            onPlanInfoChange();
    }

    /**
     * Cambia lo sfondo al form selezionato
     */
    function sfondoGrigio(id) {
        /*
 	$("#" + id).css({
         "background-color": "#eeeeee"
     });
     */
    }

    function sfondoBianco(id) {
        /*
 	$("#" + id).css({
         "background-color": "#ffffff"
     });
     */
    }

    function btnAttiva(id) {
        $("#" + id + " button[type='submit']").removeAttr("disabled");
    }

    function btnDisattiva(id) {
        $("#" + id + " button[type='submit']").attr("disabled", "disabled");
    }

    function selectInfoForm(activePrefix, inactivePrefix) {
        sfondoGrigio(activePrefix + "-info");
        sfondoBianco(inactivePrefix + "-info");
        $("#" + activePrefix + "_info").prop('checked', true);
        $("#" + inactivePrefix + "_info").prop('checked', false);
        btnDisattiva(inactivePrefix + "-info");
        onInfoChange(activePrefix);
    }

    function manageSelectInfoForm(activePrefix, inactivePrefix) {
        $("#" + activePrefix + "-info input, #" + activePrefix + "-info select").on('focus click', function() {
            selectInfoForm(activePrefix, inactivePrefix);
        });
    }
    manageSelectInfoForm('personal', 'plan');
    manageSelectInfoForm('plan', 'personal');
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

    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
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

if (getCookie("restart") == "1") {
    document.cookie = "restart=2";
}

function settingLoginSuccess() {
    $('#insurance-header-link').removeClass('not-logged').addClass('logged');
    $('.vision-insurance-text').html('<i class="fa fa-spinner fa-spin" style="margin-right: 2px;"></i>' + $('.vision-insurance-text').text());

    var isRxOrder = $("#isRxOrder").val();

    var isPlanoLensSelected = $('#selectedLensPriceInHid').val() == 0;

    if ($('#insurance-switch')) {
        // if is pdp page
        if ($('.pdp-container').length > 0 && !isPlanoLensSelected) {
            if (!$('#insurance-switch').hasClass('insurance-on')) {
                $('#insurance-switch').addClass('insurance-on');
            }
            $('#insurance-switch').find('span').text('Price with insurance');
        }

        //		if($('#new-shopping-bag').length > 0){
        //			//NUOVO SWITCH
        //		  	$('#insurance-shopping-bag').attr('checked', true);
        //		  	/* global_redesign1.js */
        //		  	showInsuranceBenefit();
        //		}

    }

    /* Enables insurance in PDP after login and recalculates price (step 2) */
    if ($('#insurance-switch-pdp-step-2')) {
        $("input[name='addons-type']:checked").change();
    }
    
    /* Enables insurance in PDP after login and recalculates price (step 1) */
    if ($('#insurance-switch-pdp-step-1')) {
        $("input[name='lens-type']:checked").change();
    }

    //Switch menù
    if (isRxOrder == 'true') {
        $('#insurance-switch-menu').attr('checked', true);
        $('#insurance-shopping-bag').attr('checked', true);
        $('#insurance-switch-pdp-step-1').attr('checked', true);
        $('#insurance-switch-pdp-step-2').attr('checked', true);
        chooseInsurance(true);
    } else {
        $('#insurance-switch-menu').attr('checked', true);
        $('#insurance-shopping-bag').attr('checked', false);
        $('#insurance-switch-pdp-step-1').attr('checked', true);
        $('#insurance-switch-pdp-step-2').attr('checked', true);
        chooseInsurance(false);
    }

    if ($('.insurance-modal-wrapper').hasClass('open-from-cart')) {
        $('.insurance-modal-wrapper').removeClass('open-from-cart');
        $("#insurance-shopping-bag").prop('disabled', false);
        $('#insurance-shopping-bag').attr('checked', true);
        showInsuranceBenefit();
    }
    $('#insurance-span-pdp').hide();
    visionInsuranceSuccess();

}

function visionInsuranceSuccess() {
    reset_submit_form();
    /* Actually close the modal */
    $('#use-insurance-modal').removeClass('translate');
    setTimeout(function () {
        $('#use-insurance-modal').removeClass('open');
    }, 250);
    if ($('.insurance-modal-wrapper').hasClass('open-from-cart')) {
        $('.insurance-modal-wrapper').removeClass('open-from-cart');
    }
    $(".insurance-container-form .error-container-1").hide();
    $(".insurance-container-form .error-container-2").hide();
    $('.insurance-modal-container-button-paragraph').show();
    $('#personal-info-submit').show();
    $('#button-cancel-insurance').text('Cancel');
    //$('#personal-info-submit').text('Access your benefits');
    $('#button-cancel-insurance').css('float', 'left');
    $('#button-cancel-insurance').removeClass('.black-button');
    $('#button-cancel-insurance').addClass('.white-button');
    $('#personalInfo').trigger('reset');
}

function showInsuranceDateError() {
    if (site_layout == 'mobile')
        $("#birthMonth").parent('div').parent('div').addClass('error');
    else
        $("#birthMonth").parent('div').addClass('error');

    $('.validate-year, .validate-month, .validate-day').css('border', '1px solid #ce0a2d');
}

function checkInsurance() {
    $('#personal-info-submit').html('<i class="fa fa-spinner fa-spin" style="margin-right: 2px;"></i>' + $('#personal-info-submit').text());

    if (RiaHelper.getTentativeUserCookie() == '') {
        RiaHelper.setTentativeCookie(5);
    }

    var form = "",
        planID = "",
        memberID = "",
        date = "",
        month = "",
        day = "",
        year = "",
        zip = "",
        ssn = "",
        zip_ssn = $("input#zip_input").val();
    dateBirth = new Date($("input#dateBirth").val());

    var formValidatePlan = true;

    if ($("input#insuranceProvider").val() == 'EYEMED' && ($("input[name='planID']").val() === '' || $("input[name='planID']").val().length == 0)) {
        formValidatePlan = false;
    }

    if ($("input[name='memberID']").val() === '' || $("input[name='memberID']").val().length == 0) {
        formValidatePlan = false;
    }

    if (formValidatePlan) {
        form = "plan";
        planID = $("input[name='planID']").val();
        memberID = $("input[name='memberID']").val();
    } else {
        form = "personal";
    }

    month = dateBirth.getMonth() + 1;
    day = dateBirth.getDate();
    year = dateBirth.getFullYear();

    if (zip_ssn.length == 4) {
        ssn = zip_ssn;
    } else {
        zip = zip_ssn;
    }
    
    // GLDP-2470 - RIA Connection Timeout - start
    var requestTimeout = $("#insuranceRequestTimeout").val() != '' ? $("#insuranceRequestTimeout").val() : 0;
    // GLDP-2470 - RIA Connection Timeout - end

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
                'frames_add': [{
                    'nextServiceDate': '',
                    'available': false,
                    'lastServiceDate': ''
                }],
                'lenses': [{
                    'available': false,
                    'nextServiceDate': '01/01/2019'
                }],
                'lenses_add': [{
                    'nextServiceDate': '',
                    'available': false,
                    'lastServiceDate': ''
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
        //settingInsurance(data, false, _dl); // comment this line to see loading screen
    } else {
    	// GLDP-2470 - RIA Connection Timeout - start
    	
    	$.ajaxSetup({
    		timeout: requestTimeout
    	});
    	
    	// GLDP-2470 - RIA Connection Timeout - end
    	
        // $.post( "/webapp/wcs/stores/servlet/AjaxInsuranceDoOnlineCustomerSearch", 
        $.post("/webapp/wcs/stores/jsonpInsuranceAjax.jsp", {
            planID: planID,
            memberID: memberID,
            firstName: $("input#firstNameInsurance").val(),
            lastName: $("input#lastNameInsurance").val(),
            provider: $("input#insuranceProvider").val(),
            birth_month: month,
            birth_date: day,
            birth_year: year,
            zip: zip,
            ssn: ssn,
            infoForm: form,
            storeId: $("input#storeId").val()
        }).done(function(data) {
            settingInsurance(data, false, _dl);

        }).fail(function(xhr, status, error) {
            if(error === 'timeout') {
            	$("#error-timeout").show();

                // Analytics
            	var obj = {
                    id: 'Error',
                    Error_Source: 'Server',
                    Error_Code: 'InsurancePanel',
                    Error_Details: 'Cannot syn ' + $("input#insuranceProvider").val() + ' user profile - '+error,
                    Error_Message: 'Due to a technical problem, we are having trouble retrieving this information. Please try again in 5 minutes.'
                };
                tealium_data2track.push(obj);
            } else {
            	$("#error-no-user").show();
            	$(".input-plan-member-container").removeClass("hide");

                // Analytics
            	var obj = {
                    id: 'Error',
                    Error_Source: 'User',
                    Error_Code: 'InsurancePanel',
                    Error_Details: 'Cannot find user profile - '+error,
                    Error_Message: 'Make sure the information you entered matches your insurance plan, or add a few more details to help us find you.'
                };
                tealium_data2track.push(obj);
            }
            $('#personal-info-submit').text('Try Again');
        });
    }

}

function settingInsurance(json, reload, dlObj) {
	var jsonResult = json.result;
    var benefit = true;
    var eligibility = true;

    if (jsonResult == 'ok' && !json.data.hasOwnProperty('frames') && !json.data.hasOwnProperty('lenses') && !json.data.hasOwnProperty('frames_add') && !json.data.hasOwnProperty('lenses_add')) {
        jsonResult = "ko";
        benefit = false;
    }
    
    // v.fortunato - GLDP-3493
    if (jsonResult == 'ok' && (json.data.hasOwnProperty('frames') && !json.data.frames[0].available) && (json.data.hasOwnProperty('lenses') && !json.data.lenses[0].available) && (json.data.hasOwnProperty('frames_add') && !json.data.frames_add[0].available) && (json.data.hasOwnProperty('lenses_add') && !json.data.lenses_add[0].available)) {
    	jsonResult = "ko";
    	eligibility = false;
    }

    if (jsonResult == "ok") {
        if (RiaHelper.getInsuranceCookie() == '') {
            document.cookie = "restart=1";
        }

        RiaHelper.setTentativeCookie(5);
        RiaHelper.setInsuranceCookie(json);
        settingDetailsInsurance(json.data);

        if (!reload && $('.pdp-container').length > 0) {
            //	deselect addons
            $(".lc-lens-enh-item.added").removeClass('added');
            $('.existing-lens-addons').empty();
            saveLensSelectionData(false, LC2.currentLenses, function() {
                settingLoginSuccess();
            }, true);
        } else {
            settingLoginSuccess();
        }

        //GLDP-3929 - Analytics
        ut_insuranceCompany = $('#insuranceProvider').val() || "";
        //Capitalize insuranceCompany
        if (ut_insuranceCompany.length > 2) {
            ut_insuranceCompany = ut_insuranceCompany.charAt(0).toUpperCase() + ut_insuranceCompany.slice(1).toLowerCase();
        }

        ut_benefits = [];
        for (key in json.data) {
            // Push only frames or lenses (that's what we offer in glasses.com)
            if (Array.isArray(json.data[key]) && json.data[key].length > 0 && json.data[key][0].available == true && (key == 'frames' || key == 'lenses')) {
                ut_benefits.push(key);
            }
        }
        if (ut_benefits.length > 0) {
            ut_benefits = ut_benefits.join(",");
        } else {
            ut_benefits = "";
        }
        insuranceApplicedObj = {
            'id' : 'Insurance-Applied',
            'Order_InsuranceCode' : ut_insuranceCompany, // Name of the insurane company. For the tentative "Unknown"
            'Order_InsuranceBenefits' : ut_benefits //"frames", "lenses", "contact", "eye exam" - All benefits included in the insurance plan, comma separated e.g. "fames,lenses"
        }
        tealium_data2track.push(insuranceApplicedObj);

        constants.ajaxParams['insuranceCheckEligibility'] = true;
        window.dispatchEvent(new Event('insuranceEnabled'));


    } else {

        var tentative = parseInt(RiaHelper.getTentativeUserCookie());

        tentative = tentative - 1;
        console.log("tentativi rimasti: " + tentative);
        if (tentative > 0) {

            try {
                var _dlCopy = $.extend(true, {}, dlObj);
                _dlCopy.site_events = {
                    "insurance_sync_failure": "true"
                };
                _dlCopy.failure_try_count = tentative;
                _dlCopy.failure_reason = "user entered wrong data";

                if ($('#personal_info').is(':checked')) {

                    _dlCopy.sync_method = "personal information";

                    if ($("#zip").is(':checked') && $("#zip_input").val().trim() != '') {
                        _dlCopy.zip_code = $("#zip_input").val();
                    }
                } else {
                    _dlCopy.sync_method = "insurance information";
                }
                callTrackAnalytics(_dlCopy);
            } catch (err) {
                console.log('error');
            }

            RiaHelper.setTentativeCookie(tentative);

            /* Check for the error type to show */
            if (!benefit || !eligibility) {
                $("#error-no-benefits").show();
                
                //GLDP-3929 - Analytics
                insErrCode = $("#error-no-benefits > p.error-top").text() || "";
                insErrMsg = $("#error-no-benefits > p.error-bottom").text() || "";

                 // Analytics
                 try {
                    var obj = {
                        id: 'Insurance-Tentative',
                        Order_InsuranceCode : 'Unknown', 
                        Error_Source: 'User',
                        Error_Code: 'Insurance - '+insErrCode,
                        Error_Message: insErrMsg
                    };
                    tealium_data2track.push(obj);
                } catch (e) {
                    console.error(e);
                }
            } else {
                $("#error-no-user").show();
                
                // Analytics
                try {
                    var obj = {
                        id: 'Error',
                        Error_Source: 'User',
                        Error_Code: 'InsurancePanel',
                        Error_Details: 'Cannot find user profile',
                        Error_Message: 'Make sure the information you entered matches your insurance plan, or add a few more details to help us find you.'
                    };
                    tealium_data2track.push(obj);
                } catch (e) {
                    console.error(e);
                }
            }

            $(".input-plan-member-container").removeClass("hide");
            $('#personal-info-submit').text('Try Again');

        } else {

            try {
                var _dlCopy = $.extend(true, {}, dlObj);
                _dlCopy.site_events = {
                    "insurance_account_locked": "true",
                    "insurance_sync_failure": "true"
                };

                if ($('#personal_info').is(':checked')) {
                    _dlCopy.sync_method = "personal information";

                    if ($("#zip").is(':checked') && $("#zip_input").val().trim() != '') {
                        _dlCopy.zip_code = $("#zip_input").val();
                    }
                } else {
                    _dlCopy.sync_method = "insurance information";
                }
                callTrackAnalytics(_dlCopy);
            } catch (err) {
                console.log('error');
            }
            
            $(".insurance-container-form .error-container-1").hide();
            $(".insurance-container-form .error-container-2").show();
            $(".input-plan-member-container").removeClass("hide");
            $('.insurance-modal-container-button-paragraph').hide();
            $('#personal-info-submit').hide();
            $('#button-cancel-insurance').text('Close');
            $('#button-cancel-insurance').css('float', 'right');
            $('#button-cancel-insurance').removeClass('.white-button');
            $('#button-cancel-insurance').addClass('.black-button');

            // Analytics
            try {
                var obj = {
                    id: 'Error',
                    Error_Source: 'User',
                    Error_Code: 'InsurancePanel',
                    Error_Details: 'Cannot find user profile',
                    Error_Message: 'SO SORRY, TOO MANY FAILS. For your security, we have temporarily locked the insurance look up. You may try again in 5 minutes.'
                };
                tealium_data2track.push(obj);
            } catch (e) {
                console.error(e);
            }

            RiaHelper.setTentativeCookie();
        }

        constants.ajaxParams['insuranceCheckEligibility'] = false;
    }

    if (RiaHelper.getInsuranceCookie() !== '') {
        if (!json['trackingInfo']) {

            try {
                window._dl.insurance_status = getUserInsuranceEligibilityStatus();

                var eligible_categories = [];
                var insCookie = JSON.parse(RiaHelper.getInsuranceCookie());
                for (var cat in insCookie.data) {
                    if (insCookie.data[cat][0].available === true) {
                        if ((cat == 'frames' || cat == 'frames_add') && $.inArray('frames', eligible_categories) == -1) {
                            eligible_categories.push('frames');
                        } else if (cat == 'lenses' || cat == 'lenses_add' && $.inArray('lenses', eligible_categories) == -1) {
                            eligible_categories.push('lenses');
                        } else if (cat != 'frames_add' && cat != 'lenses_add') {
                            eligible_categories.push(cat);
                        }
                    }
                }

                if (eligible_categories.length > 0) {
                    window._dl.insurance_eligibility_status = eligible_categories;
                }

                var dob = insCookie.patientInfo["dateOfBirth"];
                var ageRange = getInsuranceAgeRange(getAge(dob));

                var _dlCopy = $.extend(true, {}, window._dl);
                _dlCopy.site_events = {
                    "insurance_sync_successful": "true"
                };
                _dlCopy.age = ageRange;

                if (ageRange == "1") {
                    _dlCopy.site_events.purchasing_for_child = true;
                }

                if ($('#personal_info').is(':checked')) {
                    _dlCopy.sync_method = "personal information";

                    if ($("#zip").is(':checked') && $("#zip_input").val().trim() != '') {
                        _dlCopy.zip_code = $("#zip_input").val();
                    }
                } else {
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
                    RiaHelper.setTentativeCookie(5);
                    RiaHelper.setInsuranceCookie(json);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            if (typeof json['trackingInfo'].insurance_status !== 'undefined' &&
                typeof json['trackingInfo'].insurance_eligibility_status !== 'undefined') {
                window._dl.insurance_status = json['trackingInfo'].insurance_status;
                window._dl.insurance_eligibility_status = json['trackingInfo'].insurance_eligibility_status;
            }
        }
    }
}


function settingDetailsInsurance(json) {

    var insurance, analize, failCount = 0;
    $('.useAnotherInsuranceButton').css("display", "none");
    $('.startShopInsFooterBtn').removeClass('noBenefitAvailable');
    $('#lc_step_4 #lookup-form-modal-container .lc-footer-dialog').css('display', 'flex');
    $('#lc_step_4 #lookup-form-modal-container .lc-lookup-need-help').css('display', 'none');
    var framesAvailable = false;
    var framesAddAvailable = false;
    var lensesAvailable = false;
    var lensesAddAvailable = false;

    if (json != "") {

        for (i = 0; i < Object.keys(json).length; i++) {
            insurance = Object.keys(json)[i];
            analize = json[insurance][0];

            if (insurance == 'contact') {
                if (analize.available == false) {
                    failCount++;
                    showBenefitUnavailableDiv('contact');
                } else {
                    showBenefitAvailableDiv('contact', 'benefits available', 'available');
                }
            } else if (insurance == 'exam') {
                if (analize.available == false) {
                    failCount++;
                    showBenefitUnavailableDiv('exam');
                } else {
                    showBenefitAvailableDiv('exam', 'benefits available', 'available');
                }
            } else if (insurance == 'frames') {
                framesAvailable = analize.available;
            } else if (insurance == 'frames_add') {
                framesAddAvailable = analize.available;
            } else if (insurance == 'lenses') {
                lensesAvailable = analize.available;
            } else if (insurance == 'lenses_add') {
                lensesAddAvailable = analize.available;
            }

            //END OF REFACTORING

        }

        //lenses cases
        if (lensesAvailable) {
            //show benefits available for lenses
            showBenefitAvailableDiv('lenses', 'benefits available', 'available');
        } else if (lensesAddAvailable) {
            //show additional benefits
            showBenefitAvailableDiv('lenses', 'additional insurance discount available', 'additional');
        } else {
            //show benefits UNAVAILABLE
            showBenefitUnavailableDiv('lenses');
            failCount++;
        }

        //frame cases
        if ((framesAddAvailable && !framesAvailable) && (lensesAddAvailable && !lensesAvailable)) {
            //show 40 percent off for both frames and lenses
            //frames
            showBenefitAvailableDiv('frames', '40&#37; off complete pair', 'offcp');
            //lenses
            showBenefitAvailableDiv('lenses', '40&#37; off complete pair', 'offcp');
        } else if (framesAvailable) {
            //show benefits available for frames
            showBenefitAvailableDiv('frames', 'benefits available', 'available');
        } else if (framesAddAvailable) {
            //show additional benefits
            showBenefitAvailableDiv('frames', 'additional insurance discount available', 'additional');
        } else {
            //show benefits UNAVAILABLE
            showBenefitUnavailableDiv('frames');
            failCount++;
        }

        if (failCount == 4) {
            $('#lc_step_4 .lc-subtitle').html('So sorry, but you are not eligible:');
            if ($('.startShopInsFooterBtn'))
                $('.startShopInsFooterBtn').addClass('noBenefitAvailable');
            if ($('.notEligibleButtonsContainer .startShopInsFooterBtn'))
                $('.notEligibleButtonsContainer  .startShopInsFooterBtn').css("display", "inline-block");
            $('.useAnotherInsuranceButton').css("display", "inline-block");
            $('#lc_step_4 #lookup-form-modal-container .lc-footer-dialog').css('display', 'none');
            $('#lc_step_4 #lookup-form-modal-container .lc-lookup-need-help').css('display', 'block');

        }
    }
}

function getInsuranceElegibilities(){
	try{
		var insuranceCookie = JSON.parse(RiaHelper.getInsuranceCookie());
		var elegibilities = '';
		for (var i = 0; i < insuranceCookie.trackingInfo.insurance_eligibility_status.length; i++){
			if (i > 0)
				elegibilities += ',';
			if (insuranceCookie.trackingInfo.insurance_eligibility_status[i] == 'exam')
				elegibilities += 'eye exam';
			else 
				elegibilities += insuranceCookie.trackingInfo.insurance_eligibility_status[i];
		}
		return elegibilities;
	} catch (e){
		return "";
	}
}

function clearBenefitAvailableDiv(divSuffix) {
    $('#lc_elig_' + divSuffix + ' .lc-elig-available-status .lc-elig-available-msg').addClass("hidden");
    $('#lc_elig_' + divSuffix + ' .lc-elig-available-status .lc-elig-add-msg').addClass("hidden");
    $('#lc_elig_' + divSuffix + ' .lc-elig-available-status .lc-elig-complete-msg').addClass("hidden");
    $('#lc_elig_' + divSuffix + ' .lc-elig-available-status .lc-elig-unavailable-msg').addClass("hidden");
    //hide espot div messages in order to display only the right one
    var isModal = $('#insuranceModal').length > 0;
    if (isModal) {
        //hide espot div subtitles for modal
        $('.' + divSuffix + 'Drop .lc-elig-available-msg').addClass("hidden");
        $('.' + divSuffix + 'Drop .lc-elig-add-msg').addClass("hidden");
        $('.' + divSuffix + 'Drop .lc-elig-complete-msg').addClass("hidden");
        $('.' + divSuffix + 'Drop .lc-elig-unavailable-msg').addClass("hidden");
    } else {
        //hide espot div dropdown placeholder subtitles
        $('.lc-elig-row-dropdown.' + divSuffix + 'Drop .lc-elig-available-msg').addClass("hidden");
        $('.lc-elig-row-dropdown.' + divSuffix + 'Drop .lc-elig-add-msg').addClass("hidden");
        $('.lc-elig-row-dropdown.' + divSuffix + 'Drop .lc-elig-complete-msg').addClass("hidden");
        $('.lc-elig-row-dropdown.' + divSuffix + 'Drop .lc-elig-unavailable-msg').addClass("hidden");
    }


}

//divSuffix is either frames, lenses, contact or exam
//msgtype is either available,additional,offcp
function showBenefitAvailableDiv(divSuffix, message, msgtype) {

    //clear
    clearBenefitAvailableDiv(divSuffix);

    var isModal = $('#insuranceModal').length > 0;

    if (isModal) {
        //title
        //add lc-elig-unavailable-msg class to change style
        $('#' + divSuffix + 'BenefitTitle').addClass("lc-elig-available-status");
        $('#' + divSuffix + 'framesBenefitTitle').removeClass("lc-elig-unavailable-msg");

        $('#lc_elig_' + divSuffix).addClass('lc-elig-available');
        //$('#lc_elig_'+divSuffix+' .lc-elig-available-status').html(message);
        if (msgtype == 'available') {
            //activate main message
            $('#lc_elig_' + divSuffix + ' .lc-elig-available-status .lc-elig-available-msg').removeClass("hidden");
            //activate dropdown placeholder subtitle
            $('.' + divSuffix + 'Drop .lc-elig-available-msg').removeClass("hidden");
        } else if (msgtype == 'additional') {
            $('#lc_elig_' + divSuffix + ' .lc-elig-available-status .lc-elig-add-msg').removeClass("hidden");
            //activate dropdown placeholder subtitle
            $('.' + divSuffix + 'Drop .lc-elig-add-msg').removeClass("hidden");
        } else if (msgtype == 'offcp') {
            $('#lc_elig_' + divSuffix + ' .lc-elig-available-status .lc-elig-complete-msg').removeClass("hidden");
            //activate dropdown placeholder subtitle
            $('.' + divSuffix + 'Drop .lc-elig-complete-msg').removeClass("hidden");
        }

    } else {
        $('#lc_elig_' + divSuffix).addClass('lc-elig-available');
        //$('#lc_elig_'+divSuffix+' .lc-elig-available-status').html(message);
        if (msgtype == 'available') {
            //activate main message
            $('#lc_elig_' + divSuffix + ' .lc-elig-available-status .lc-elig-available-msg').removeClass("hidden");
            //activate dropdown placeholder subtitle
            $('.lc-elig-row-dropdown.' + divSuffix + 'Drop .lc-elig-available-msg').removeClass("hidden");
        } else if (msgtype == 'additional') {
            $('#lc_elig_' + divSuffix + ' .lc-elig-available-status .lc-elig-add-msg').removeClass("hidden");
            //activate dropdown placeholder subtitle
            $('.lc-elig-row-dropdown.' + divSuffix + 'Drop .lc-elig-add-msg').removeClass("hidden");
        } else if (msgtype == 'offcp') {
            $('#lc_elig_' + divSuffix + ' .lc-elig-available-status .lc-elig-complete-msg').removeClass("hidden");
            //activate dropdown placeholder subtitle
            $('.lc-elig-row-dropdown.' + divSuffix + 'Drop .lc-elig-complete-msg').removeClass("hidden");
        }
    }

    $('#lc_elig_' + divSuffix + '_mobile').addClass('lc-elig-available');
    $('#lc_elig_' + divSuffix + '_mobile .lc-sprite').removeClass('lc-' + divSuffix + '-big');
    $('#lc_elig_' + divSuffix + '_mobile .lc-sprite').addClass('lc-' + divSuffix + '-green');
    $('#lc_elig_' + divSuffix + '_mobile #lc_elig_unvailable').remove();
}

//divSuffix is either frames, lenses, contact or exam
function showBenefitUnavailableDiv(divSuffix) {
    //clear
    clearBenefitAvailableDiv(divSuffix);

    var isModal = $('#insuranceModal').length > 0;
    if (isModal) {
        //title
        //add lc-elig-unavailable-msg class to change style
        $('#' + divSuffix + 'BenefitTitle').removeClass("lc-elig-available-status");
        $('#' + divSuffix + 'framesBenefitTitle').addClass("lc-elig-unavailable-msg");
        //subtitle
        $('.' + divSuffix + 'Drop .lc-elig-unavailable-msg').removeClass("hidden");
    } else {
        //title
        $('#lc_elig_' + divSuffix).removeClass('lc-elig-available');
        //$('#lc_elig_'+divSuffix+' .lc-elig-available-status').html('benefits unavailable');
        $('#lc_elig_' + divSuffix + ' .lc-elig-available-status .lc-elig-unavailable-msg').removeClass("hidden");
        //activate dropdown placeholder subtitle
        $('.lc-elig-row-dropdown.' + divSuffix + 'Drop .lc-elig-unavailable-msg').removeClass("hidden");
    }

    $('#lc_elig_' + divSuffix + '_mobile').removeClass('lc-elig-available');
    $('#lc_elig_' + divSuffix + '_mobile .lc-sprite').removeClass('lc-' + divSuffix + '-green');
    $('#lc_elig_' + divSuffix + '_mobile .lc-sprite').addClass('lc-' + divSuffix + '-big');
    if ($('#lc_elig_' + divSuffix + '_mobile #lc_elig_unvailable').length == 0) {
        $('#lc_elig_' + divSuffix + '_mobile').append('<div id="lc_elig_unvailable">benefits unavailable</div>');
    }
}

function changeInsuranceModalTitle(destStep) {

    if (destStep == 4) {
        $("span.ui-dialog-title").text('We found you!');
    } else
        $("span.ui-dialog-title").text('CHECK YOUR INSURANCE ELIGIBILITY');

}

function openSessionExpiredMessage() {
    if (RiaHelper.getCookie('tentative_user') === '5') {

        //alert('Your session has expired\n\nUnfortunately we are 30minutes session with insurance synced.\nYou can check you eligibility again and continue shopping.');

        RiaHelper.removeInsuranceCookie();

        if (!$('#lc_step_6').hasClass("hidden"))
            $('#lc_step_6').addClass("hidden");

        if ($('#lc_step_1').hasClass("hidden"))
            $('#lc_step_1').removeClass("hidden");

        changeInsuranceModalTitle(1);

        $('#timedOutSession').css("display", "block");
        $('#dialog-message').css("display", "block");
        //location.reload();
    }
}
//functions from abstract end


function updatePDPInsurancePrices(noLensToChoose, refresh, onPricesUpdated) {

    var params = {};
    params['__PRICING_ENTRY'] = [];
    var totalPrice = 0.0;

    var fprice = $('#price').text().trim().substring(1);
    var fupc = $('#pdp-sku').text().trim().substring(5);
    var frameParams = {
        price: fprice,
        upc: fupc,
        quantity: '1',
        type: 'f'
    };


    var lens = $('.select-lens-type.active').find('input');
    var lensParams;
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

    if (typeof lensParams.upc !== 'undefined' && lensParams.upc !== '' &&
        typeof lensParams.price !== 'undefined' && lensParams.price !== '') {
        totalPrice += parseFloat(frameParams.price) + parseFloat(lensParams.price);


        var enhancements = [];
        $.each($('.lc-lens-enh-item.added > label > input'), function(index, enh) {
            enhancements.push({
                price: $(this).data('price').substring(1),
                upc: $(this).data('pn'),
                quantity: '1',
                type: 'a'
            });
            totalPrice += parseFloat($(this).data('price').substring(1));
        });

        params['__PRICING_ENTRY'].push(JSON.stringify({
            frame: frameParams,
            lens: lensParams,
            enhancements: enhancements
        }));

        if (refresh) {
            $('#lc_step_loader').addClass('hide');
            $('#lens-selection-modal-page2').removeClass('hide');
        }

        sendRIARequest(params, function(response) {
            var jsonResponse = $.parseJSON(response);
            var discount = $.parseJSON(jsonResponse['__PAIR_DISCOUNT']);
            var frameDiscount = discount[0].frameDiscount;
            var lensDiscount = discount[0].lensDiscount;
            var enhancementsDiscount = discount[0].enhancementsDiscount;
            console.debug('frameDiscount:' + frameDiscount + ', lensDiscount:' + lensDiscount + 'enhancementsDiscount:' + enhancementsDiscount);

            var RIASavings = frameDiscount + lensDiscount + enhancementsDiscount;
            totalPrice -= RIASavings;

            if (totalPrice < 0)
                totalPrice = 0;

            if (refresh) {
                $('#lens-selection-modal-page1').removeClass('hide');
                $('#lc_step_loader').addClass('hide');
            }

            $('.total-savings').addClass("hide");
            $('.total-savings-ria > .total_figures').text('- $' + RIASavings.toFixed(2));
            $('.total-savings-ria').removeClass('hide');
            $('.main-total > .subtotal > span').text('$' + totalPrice.toFixed(2));
            $('#scrollBar .price > span').text('$' + totalPrice.toFixed(2));

            if (typeof onPricesUpdated !== 'undefined')
                onPricesUpdated(totalPrice, lensParams.price);
        });

    }
}

function hideWhenClickOutside(event, selector, callback) {
    if (!$(event.target).closest(selector).length) {
        var $selector = $(selector);
        if ($selector.is(":visible")) {
            callback($selector);
        }
    }
}

function hideStickyBoxWhenClickOutside(event) {
    hideWhenClickOutside(event, '.not_closing_divs', closeSticky);
}

var managedHideStickyBoxWhenClickOutside;

function openStickyOnDocumentReady(obj) {
    $(document).ready(function() {
        openSticky(obj);
    });
}

function openSticky(obj) {
    //    $("#sticky-open-text").toggle();
    //    $("#sticky-close-text").toggle();
    //    $("#sticky-box").toggle();
    var position = $("#sticky").position();
    var topP = position.top;
    var topPos = parseInt(topP) + 50;
    /*
    $("#sticky-box").css({
        "top": topPos + " px !important",
        "position": "absolute"
    });
    */
    if (!$('body').hasClass('lc-lookup')) {
        var barrel = true;
        managedHideStickyBoxWhenClickOutside = function(e) {
            if (barrel) {
                barrel = false;
                return;
            }
            hideStickyBoxWhenClickOutside(e);
        }

        $(document).on('click', managedHideStickyBoxWhenClickOutside);
    }
}

function closeSticky(obj) {
    $("#sticky-open-text").toggle();
    $("#sticky-close-text").toggle();
    $("#sticky-box").toggle();

    $(document).off('click', managedHideStickyBoxWhenClickOutside);
}



function reset_submit_form() {
    //$("#personal-info-submit").attr("disabled", "disabled");
    $("#personal-info-submit").removeClass("lc-btn-orange");
    $("#personal-info-submit").addClass("lc-disabled");
}

function enable_submit_form() {
    //$("#personal-info-submit").removeAttr("disabled");
    $("#personal-info-submit").addClass("lc-btn-orange");
    $("#personal-info-submit").removeClass("lc-disabled");
}


function getAge(dateString) {

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

function getInsuranceAgeRange(age) {

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
        default:
            ageRange = "8"
    }

    return ageRange;
}