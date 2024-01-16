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
            $('#insurance-modal .lc-dialog-form').parent().css('top', '180px');
        }
    }, false);

    var insuranceModal = $('#insurance-modal .lc-dialog-form').dialog({
        autoOpen: false,
        modal: true,
        width: lc_width_modale,
        resizable: false,
        draggable: false,
        title: "CHECK YOUR INSURANCE ELIGIBILITY ",
        dialogClass: 'lc-dialog-center',
        open: function(event, ui) {
            $('.ui-widget-overlay').addClass('black-overlay');
            if (site_layout == "mobile") {
                $(event.target).parent().css('top', '180px');
                $('.ui-widget-overlay').css('width', '100%');
                $('.ui-widget-overlay').css('z-index', '1001');
            }
            $('.ui-widget-overlay').css('height', $(document).height() + 250);
        },
        close: function(event, ui) {
            $('.ui-widget-overlay').removeClass('black-overlay');
            if ($('.pdp-container').length == 0 && RiaHelper.isInsuranceOn()) {
                chooseInsurance(true);
            }
        }
    });

    $('#insurance-modal').empty();
    insuranceModal.parent().appendTo('#insurance-modal');

    // da verificare sessione e timeout
    $(document).on('click', '#insurance-switch', function() {
    	
    	tealium_data2track.push({
 		   id:'Click', 
 		   Tracking_Type: 'link',
 		   Click_FocusElement:this
 		});
    	
        if ($(this).hasClass('insurance-on')) {
            $(this).removeClass('insurance-on');

            var _dlCopy = $.extend(true, {}, _dl);
            _dlCopy.site_events = {
                "toggle_insurance_eligibility": "true"
            };
            _dlCopy.insurance_status = "not synced";
            callTrackAnalytics(_dlCopy);

            if (RiaHelper.isInsuranceOn()) {
                RiaHelper.toggleInsurance(false);
            }

            // TURN OFF INSURANCE IN CART
            if ($('.pdp-container').length == 0) {
                $(this).closest('#insurance-content').find('.error').addClass('hide');
                $('.cart-items-container').removeAttr('style');

                chooseInsurance(false);
            } else {
                // TURN OFF INSURANCE IN PDP
                $(this).find('span').text('Use insurance');
                var lens = $('.lens-hidden-data > .lensCatentryId').val();
                var lens = $('.lens-hidden-data > .lensCatentryId').val();
                if (lens) {
                    $.query.REMOVE("selectedLens");
                    var param = $.query.SET("selectedLens", lens);
                    window.location.href = param.toString();
                    return;
                }
                window.location.reload();
            }
        } else {
            // TURN ON INSURANCE CART
            if ($('.pdp-container').length == 0) {
                // Perk Insurance Modal
                if ($('input[name=newPerksFlow]').length > 0 && $('#perk-amount').length > 0) {
                    var pIModalOver = $('#perks-insurance-modal-overlay');
                    var pIModal = $('#perks-insurance-modal');
                    var PIMUseIns = $('.perks-use-insurance');

                    var closePIM = function() {
                        pIModal.css('display', 'none');
                        pIModalOver.css('display', 'none');
                    };

                    pIModalOver.css('display', 'block');
                    pIModal.css('display', 'block');

                    pIModal.find('.close-button, .perks-cancel').on('click', closePIM);
                    pIModalOver.on('click', closePIM);

                    PIMUseIns.on('click', function() {
                        closePIM();
                        $('#header').css('z-index', 0);
                        insuranceModal.dialog('open');
                    });
                } else {
                    turnInsuranceOnInCart();
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

                    $('#header-insurance').removeClass('not-logged');
                    $(this).addClass('insurance-on');
                    if (!RiaHelper.isInsuranceOn()) {
                        RiaHelper.toggleInsurance(true);
                    }

                    if ($('#contactLensesFormMobile').length > 0) {
                        // Contact PDP
                        contactLensOptions.updateContactLensObject();
                    } else {
                        // Frame PDP
                            saveLensSelectionData(false, null, false);
                        
                    }
                }
            }
        }


//        if ($('.pdp-container').length == 0) {
//
//            var nItems = $('.cart-item-container').length;
//            var nWithPrescrItems = $('.cart-item-container form.lc2.prescription-needed').length;
//            if (nItems !== nWithPrescrItems) {
//                if ($('#insurance-switch').hasClass('insurance-on')) {
//                    $('#insurance-switch').removeClass('insurance-on');
//                    // TURN OFF INSURANCE IN CART
//                    if (RiaHelper.isInsuranceOn()) {
//                        RiaHelper.toggleInsurance(false);
//                    }
//
//                    chooseInsurance(false);
//                }
//                //warning cannot activate insurance
////                $('.not-insurable').removeClass('hide');
//            }
//        }

    })
    .on('keypress', '#insurance-switch', function(e) {
    	if(e.which === 13) {
            $(this).trigger( 'click' );
    	}
    });

    window.proceedWithInsurance = function() {
        if (RiaHelper.getInsuranceCookie() == '') {
            //insurance was not active when seitch clicked
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
            //insurance was active when switch clicked
            var _dlCopy = $.extend(true, {}, _dl);
            _dlCopy.site_events = {
                "toggle_insurance_eligibility": "true"
            };
            _dlCopy.insurance_status = "synced";
            callTrackAnalytics(_dlCopy);

            $('#header-insurance').removeClass('not-logged').addClass('logged');
            if(typeof switchElement=="undefined"){
            	var switchElement = $('#insurance-switch');
            }
            switchElement.addClass('insurance-on');
            if (!RiaHelper.isInsuranceOn()) {
                RiaHelper.toggleInsurance(true);
            }
            chooseInsurance(true);
        }
    };
    
    window.insuranceCartLimitError = function() {
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
    }

    window.turnInsuranceOnInCart = function() {
        var switchElement = $('#insurance-switch');
        
        //per ogni prodotto contact lenses, contano quanti per OD e OS
        var leftContact = $('.cart-item-container.contactLens').find('select[title*="Left eye"]').length;
        var rightContact = $('.cart-item-container.contactLens').find('select[title*="Right eye"]').length;

        
        var nGlassesWithPlano = $(".cart-item-container.frame").filter(function() {
			var frameOrderItemId = $(this).data('orderitem-id');
			var lensOrderItemId = $('#'+ frameOrderItemId + '_AssociatedLenseOrderItemId').val();
			var lensUPC = $('#' + lensOrderItemId + '_UPC').val();
			if (lensUPC == 'No Prescription') {
				return this;
			}
		}).length;

		var nSunGlassesWithPlano = $('.cart-item-container.frame').filter(function() {
				var frameOrderItemId = $(this).data('orderitem-id');
				var lensOrderItemId = $('#'+ frameOrderItemId + '_AssociatedLenseOrderItemId').val();
				var frameType = $(this).data('frameType');
				var lensUPC = $('#' + lensOrderItemId + '_UPC').val();
				if (lensUPC == 'No Prescription' && frameType== 'SUN') {
					return this;
				}
			}).length;
		
		var nGlassesWithRx = $(".cart-item-container.frame").length - nGlassesWithPlano;

		if (leftContact + rightContact > 0) {
			// there are CLs in cart. Insurance is ok only if 1OD+1OS and no other items
			if (nGlassesWithRx == 0 && nGlassesWithPlano == 0) {
				proceedWithInsurance();
			} else {
				//warning: insurance covers just 1OD+1OS CLs
	            switchElement.closest('#insurance-content').find('.error.moreThanOneItemCL').removeClass('hide');
	            $('.cart-items-container').css('border', '1px solid #CF0329');
	            insuranceCartLimitError();
			}
		} else {
			// no CLs in cart
			if(nGlassesWithRx > 1 || nGlassesWithPlano > 1){
	            switchElement.closest('#insurance-content').find('.error.moreThanOneItem').removeClass('hide');
	            $('.cart-items-container').css('border', '1px solid #CF0329');
	            insuranceCartLimitError();
	        } else if(nSunGlassesWithPlano>0){
	            //PLANO SUN NOT INSURABLE LCDP-4555
				   $('.error.not-insurable').removeClass('hide');
	        }else {
	        	proceedWithInsurance();
	        }
		}
    };

    window.closeInsuranceModal = function() {
        insuranceModal.dialog('close');
    };
    error_on_calculate_ria = false;
    var insurancePriceLoader = $('#insurance-price-loader .lc-dialog-form').dialog({
        autoOpen: false,
        modal: true,
        width: lc_width_modale,
        resizable: false,
        draggable: false,
        title: "CHECK YOUR VISION INSURANCE ELIGIBILITY",
        dialogClass: 'lc-dialog-center',
        open: function(event, ui) {
            $('.ui-widget-overlay').addClass('black-overlay');
            if (site_layout == "mobile") {
                $(event.target).parent().css({
                    'top': '84vh',
                    'z-index': '9999999999'
                });                
                $('.ui-widget-overlay').css({
                    'width': '100%',
                    'z-index': '999999999'
                });
            }
            $('.ui-widget-overlay').css('height', $(document).height() + 250);
			$('#insurance-price-loader .lc-dialog-form .lc_step_price').removeClass('hidden');

        },
        close: function(event, ui) {
            $('.ui-widget-overlay').removeClass('black-overlay');
            if ($('.pdp-container').length == 0 && RiaHelper.isInsuranceOn() && !error_on_calculate_ria) {
                chooseInsurance(true);
            }
        }
    });

    $('#insurance-price-loader').empty();
    insurancePriceLoader.parent().appendTo('#insurance-price-loader');

    window.showInsurancePriceLoader = function() {
        insurancePriceLoader.dialog('open');
    }

    window.closeInsurancePriceLoader = function() {
        insurancePriceLoader.dialog('close');
    }

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
        $('#' + id_form).trigger('reset');
        $('#' + id_form + ' .error').removeClass('error');
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
                $('html, body').animate({
                    scrollTop: $(this).offset().top - 200
                });
            });

            $("#personal_info").click(function() {
                lc_mobile_show_form_personal_info();
                $('html, body').animate({
                    scrollTop: $(this).offset().top - 200
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
            $(".cart-items-container").length > 1 &&
            $('#insurance-switch').hasClass('insurance-on')) {
            $('#insurance-content').find('.error.moreThanOneItem').removeClass('hide');
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
        }
    });

});

function lc_change_title_dialog(new_title) {
    if (new_title != "") $('.lc-dialog-form').dialog('option', 'title', new_title);
}

//WCAG ACCESSIBILITY Start

$(document).on('keypress', '.control-checkbox', function(e) {
    	if(e.which === 13) {
            $(this).trigger( 'click' );
    	}
    });
$(document).on('keypress', '.cookFacet', function(e) {
    	if(e.which === 13) {
            $(this).trigger( 'click' );
    	}
    });
$('#SiteFooter label[for=eighteen_older]').on('keypress', function(e) {
    	if(e.which === 13) {
            $(this).trigger( 'click' );
    	}
    });
