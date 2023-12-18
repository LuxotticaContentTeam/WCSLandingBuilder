var current_dl = '';
currentOrderTAH = false;
currentOrderItemCount = 1;

lensSelected = false;
addInProgress = false;
addedTAHItem = false;

lensSelectDialogWidth = '1040px';

var pdpLanding = true;

function cartPageEditPrescription(orderItemId) {
    includeLens = true;
    var addOnsSplit = addOns.split('|');
    var addRxLenses = includeLens != false ? 'yes' : 'no';

    if (currentOrderTAH && !includeLens) {
        $('#lens-selection-area').dialog('close');
        showTAHRXError();
        return;
    }

    if (includeLens) {
        $.cookie('lastCompletedStep', '1', {
            path: '/'
        });
    }

    var params = {
        storeId: constants.ajaxParams['storeId'],
        catalogId: constants.ajaxParams['catalogId'],
        langId: constants.ajaxParams['langId'],
        orderId: '.',
        lensCatentryId: $('.lens-hidden-data > input[name=lensCatentryId]').val(),
        lensColor: $('.lens-hidden-data > input[name=lensColor]').val(),
        lens: $('.lens-hidden-data > input[name=lens]').val(),
        addOns: $('.lens-hidden-data > input[name=addOns]').val().split('|'),
        URL: '',
        includeLens: includeLens,
        orderItemId: orderItemId,
        fromPage: "ShopCart",
        addRxLenses: addRxLenses
    };
    
    $.ajax({
        type: "POST",
        url: getAbsoluteURL() + 'LCUpdateOrderItemLensDataCmd',
        traditional: true,
        data: params,
        success: function(data, textStatus, jqXHR) {
            var toCartParams = $.param({
                storeId: constants.ajaxParams['storeId'],
                catalogId: constants.ajaxParams['catalogId'],
                langId: constants.ajaxParams['langId'],
                URL: 'AjaxOrderItemDisplayView',
                errorViewName: 'AjaxOrderItemDisplayView',
                orderId: '.',
                updatePrices: '1',
                calculationUsageId: '-1'
            });
            window.location = getAbsoluteURL() + 'OrderCalculate?' + toCartParams;
        }
    });
}

function closeLensSelectionModal() {
    showModalPage1();
    $('#lens-selection-area').dialog('close');
}

function showModalPage1() {
    setTimeout(function() {
        $('#lens-selection-modal-page2').fadeOut('fast', function() {
            window.scrollTo(0, 0);
            $('#lens-selection-modal-page1').fadeIn('fast');
        });
    }, 100);
}

function showModalPage2() {
    setTimeout(function() {
        $('#lens-selection-modal-page1').fadeOut('fast', function() {
            window.scrollTo(0, 0);
            $('#lens-selection-modal-page2').fadeIn('fast');
        });
    }, 100);
}

function showModalPage2WithAnalytics(_dl_temp) {

    setTimeout(function() {
        $('#lens-selection-modal-page1').fadeOut('fast', function() {
            window.scrollTo(0, 0);
            $('#lens-selection-modal-page2').fadeIn('fast');
        });
    }, 100);

}

function ajaxAddGlassesToCart() {
    if (addInProgress)
        return;
    addInProgress = true;

    var isTAH = $('.tah-checkbox:checked').length > 0;

    if (isTAH && !includeLens) {
        showTAHRXError();
        return;
    }

    if (includeLens) {
        $.cookie('lastCompletedStep', '1', {
            path: '/'
        });
    }

    var params = {
        storeId: constants.ajaxParams['storeId'],
        catalogId: constants.ajaxParams['catalogId'],
        langId: constants.ajaxParams['langId'],
        orderId: currentOrderId,
        frameCatentryId: frameCatentryId,
        URL: '',
        lensCatentryId: $('.lens-hidden-data > input[name=lensCatentryId]').val(),
        lensColor: $('.lens-hidden-data > input[name=lensColor]').val(),
        lens: $('.lens-hidden-data > input[name=lens]').val(),
        addOns: $('.lens-hidden-data > input[name=addOns]').val(),
        includeLens: includeLens,
        tah: isTAH
    };
    
    if($.query.get('selectedPerkCode') != ''){
    	params['promoCode'] = $.query.get('selectedPerkCode');
    }
    
    var selectedWarrantyId = $('.lens-hidden-data > input[name=selectedWarranty]').val();
    
    if(selectedWarrantyId !== '') {
    	params.warrantyCatentryId = selectedWarrantyId;
        params.addWarranty = true;
    }

    $('.addToCartText').addClass('hide');
    $('.itemAdded').removeClass('hide');

    $.post(getAbsoluteURL() + 'LCOrderItemAddGlassesCmd', params, function(data) {
        var d = data.replace('/*', '');
        d = d.replace('*/', '');
        var jsonResponse = $.parseJSON(d);
        if (jsonResponse.errorCode === undefined) {
            $('.ajaxAddItemToCart').addClass('item-added');
            incrementShopCartCounter();
            addInProgress = true;
            addedTAHItem = isTAH;

            var orderItemCount = $('#tah-quantity-header').text().trim();
            try {
                var obj = {
                   	id : 'AddToCart',
                   	site_events: {
                   		add_to_cart: "true"
                   	}
                }				
				var _category = $('.lens-hidden-data > input[name=lensCategory]').val() == 'EYEGLASSES' ? 'OPTICS' : 'SUN';
				var _upc = $('.lens-hidden-data > input[name=framePartNumber]').val();
				var _color = $('.lens-hidden-data > input[name=lensColor]').val();
				var _glass = {};
				_glass.Status = 'Available';
				_glass.Sku = _upc; 					
				_glass.Price = $('#pdp-frame-price').val();
				_glass.Category = _category;
				_glass.Type = 'STD';
				_glass.Brand = $('.lens-hidden-data > input[name=frameBrand]').val(); 
//    				_glass.ModelName = frame.name; 
				_glass.LensUPC = $('.lens-hidden-data > input[name=lensUPC]').val();
				_glass.Lens = $('.lens-hidden-data > input[name=lensPartNumber]').val();
				if (_color != '') _glass.LensColor = _color;
				
				var _lens = {};				
				_lens.id = $('.lens-hidden-data > input[name=lensUPC]').val();       	
	          	_lens.reg_price = $('.lens-hidden-data > input[name=lensPrice]').val();
	        	_lens.category = _category; 
				_glass.applied_lenses = _lens; 			
				
				obj.Products = {};
				obj.Products[_upc] = _glass;			
            	
            	if (typeof orderItemCount != 'undefined' && parseInt(orderItemCount) <= 1) {
                    obj.site_events.cart_start = "true";
                }

				tealium_data2track.push(obj);    										
            } catch (e) {
                console.log("error in tracking analytics of add to cart: " + e.stack);
                var obj = {
			        id: 'WCS-M-Pdp-Prod-AddToCart-Error',
			        Error_Source: 'Server',
			        Error_Code: 'utag_data syntax - '+err.message
			    };
			    tealium_data2track.push(obj);
            }

            var toCartParams = $.param({
                storeId: constants.ajaxParams['storeId'],
                catalogId: constants.ajaxParams['catalogId'],
                langId: constants.ajaxParams['langId'],
                URL: 'AjaxOrderItemDisplayView',
                errorViewName: 'AjaxOrderItemDisplayView',
                orderId: '.',
                updatePrices: '1',
                calculationUsageId: '-1',
                chooseBenefit: RiaHelper.isInsuranceOn()
            });
            window.location = getAbsoluteURL() + 'OrderCalculate?' + toCartParams;
        } else {
            if (jsonResponse.errorCode == 2550) {
                console.debug('error type: ERR_DIDNT_LOGON - the customer did not log on to the system.');
                console.debug("redirecting to URL: " + "AjaxLogonForm?storeId=" + constants.ajaxParams['storeId'] + "&catalogId=" + constants.ajaxParams['catalogId'] + "&langId=" + constants.ajaxParams['langId'] + '&myAcctMain=1');
                document.location.href = "AjaxLogonForm?storeId=" + constants.ajaxParams['storeId'] + "&catalogId=" + constants.ajaxParams['catalogId'] + "&langId=" + constants.ajaxParams['langId'] + '&myAcctMain=1';
            } else if (jsonResponse.errorCode == 2510) {
                //redirect to a full page for sign in
                console.debug('error type: ERR_SESSION_TIMEOUT - use session has timed out');
                console.debug('redirecting to URL: ' + 'Logoff?URL=ReLogonFormView&storeId=' + constants.ajaxParams['storeId']);
                document.location.href = 'Logoff?URL=ReLogonFormView&storeId=' + constants.ajaxParams['storeId'];
                obj = {
	    			id: 'Add to cart',
	    			Error_Source: "Server",
	    			Error_Message: 'Add to cart over 10 sec'
	    		}
	    		tealium_data2track.push(obj);
            } else {
                showTAHError(jsonResponse.errorMessage);
                obj = {
	    			id: 'Add to cart',
	    			Error_Source: "Server",
	    			Error_Message: 'Add to cart no response'
	    		}
	    		tealium_data2track.push(obj);
            }
        }
    });
}

// For inputs matching the selector, check them if their value is within existingValues
function loadCheckElement(cssSelector, existingValues) {
    if (!$.isArray(existingValues)) {
        existingValues = [existingValues];
    }

    $(cssSelector).each(function(index, element) {
        if ($.inArray($(element).attr('value'), existingValues) > -1) {
            $(element).prop('checked', true);
        }
    });
}


function openLensSelectionModal(ignoreLoad) {
    var frameObject = {};
    var lenseObject = {};
    var products = [];
    //console.debug("selected:"+$('.rx-lens-choice:checked').attr('value'));
    frameObject.product_id = $('#frameUPC').val();
    frameObject.reg_price = $('#framePrice').val();
    frameObject.category = $('#frameCategory').val();

    if (typeof $('.rx-lens-choice:checked').attr('value') != 'undefined') {
        lenseObject.product_id = $('.rx-lens-choice:checked').attr('data-upc');
        lenseObject.reg_price = $('.rx-lens-choice:checked').attr('data-price');
        lenseObject.category = $('.rx-lens-choice:checked').attr('data-category');
        frameObject.applied_lenses = lenseObject;
    }
    products.push(frameObject);

    ignoreLoad || (ignoreLoad = false);

    $('.rx-lens-choice').prop('checked', false);
    $('.addOns').prop('checked', false);
    if (lensSelected && !ignoreLoad) {
        loadCheckElement('.rx-lens-choice', lensCatentryId);
        loadCheckElement('.lens-color-actual .catentry-radio', lens);
        loadCheckElement('.addOns', addOns.split('|'));
    }

    var initWithStep2 = $('#lens-selection-modal-page2').attr('data-initwithstep2');
    if (!initWithStep2) {
        showModalPage1();
    }

    $('#lens-selection-area').dialog({
        modal: true,
        resizeable: false,
        width: lensSelectDialogWidth,
        open: function() {
            var $this = $(this);
            var $dialog = $this.closest('.ui-dialog');

            $dialog.css({
                top: '7px'
            });

            $dialog.on('click', '.ui-dialog-titlebar-close', function(e) {
                e.preventDefault();
                closeLensSelectionModal();
            });

            savePlacement();

            $(window).scrollTop(0);

            $('.lens-container.accordion').accordion({
                heightStyle: 'content',
                active: 0,
                collapsible: true
            });

            $('h3', '.lens-container').off('click').on('click', function() {
                $(this).toggleClass('ui-state-active').next().toggle('fast')
            });

            $('.ui-widget-overlay').addClass('black-overlay');
        },
        close: function() {
            $(window).scrollTop(getPlacement());
        },
        dialogClass: 'lens-selection-modal'
    });
}

function lensProductChange(catEntryId) {
    var productId = $('input[name="productId"]:checked').val();
    var params = {
        storeId: constants.storeId,
        catalogId: constants.ajaxParams.catalogId,
        langId: constants.ajaxParams.langId,
        productId: productId,
        showSiblings: true
    };
}

function continueToColorAddOnsModal() {
    showModalPage2();
    var _dl = current_dl;
    callTrackAnalytics(_dl);
}

function stripPrice(price) {
    return parseFloat($.trim(price).substring(1));
}

function stripPriceCurrency(price) {
    var stripedPrice = 0;
    if (price != undefined)
        stripedPrice = parseFloat($.trim(price.replace('$', '').replace('$', '')));
    if (isNaN(stripedPrice)) {
        stripedPrice = 0;
    }
    return stripedPrice;
}

function bfEnabled() {
	var partNumber = document.getElementById('pdp-frame-upc').value;
	if (typeof bf != 'undefined') {
		if (bf.enabled) {
			if (bf.exclusion) {
				if (bf.exclusion.includes(partNumber)) {
					//bf.enabled && bf.exclusion && bf.exclusion.includes
					return false;
				} else {
					if (bf.inclusion) {
						if (bf.inclusion[partNumber] != undefined) {
							//bf.enabled && bf.exclusion && !bf.exclusion.includes && bf.inclusion && bf.inclusion.includes
							return true;
						} else {
							//bf.enabled && bf.exclusion && !bf.exclusion.includes && bf.inclusion && !bf.inclusion.includes
							return false;
						}
					} else {
						//bf.enabled && bf.exclusion && !bf.exclusion.includes && !bf.inclusion
						return true
					}
				}
			} else {
				if (bf.inclusion) {
					if (bf.inclusion[partNumber] != undefined) {
						//bf.enabled && !bf.exclusion && bf.inclusion && bf.inclusion.includes
						return true;
					} else {
						//bf.enabled && !bf.exclusion && bf.inclusion && !bf.inclusion.includes
						return false;
					}
				} else {
					//bf.enabled && !bf.exclusion && !bf.inclusion
					return true
				}
			}
		} else {
			// !bf.enabled
			return false;
		}
	} else {
		// !bf
		return false;
	}
}

function resetLensSelectionData() {
	//$('input.lensCatentryId, input.lensPrice, input.lensSaving, input.lensColor, input.lens_sku_id , input.addOns, input.lensUPC').val('')
	$('input.lensColor').val('')
	
	var autoSelectedLens = LC2.autoSelectedLens;		
	
	$('.lens-hidden-data > .lensCatentryId').val(autoSelectedLens.lens_id);
    $('.lens-hidden-data > .lensPrice').val(autoSelectedLens.current_price);
    $('.lens-hidden-data > .lensSaving').val(autoSelectedLens.saving);
    $('.lens-hidden-data > .lensUPC').val(autoSelectedLens.lens_color_categories[0].skus[0].lens_sku_code);	
	$('.lens-hidden-data > .lens_sku_id').val(autoSelectedLens.lens_color_categories[0].skus[0].lens_sku_id);
	
	// Resets lens selection to step 1
	$('ul.step-add-lens > li').removeClass('active');
	$('.lens-type-step').addClass('active');
	$('.step-template-html [class^="select-lens-step"]').removeClass('active-step').addClass('hide');
	$('.select-lens-step0').removeClass('hide').addClass('active-step');
	
	// Hide back button
	$('#stepBackButton').addClass("hide");
	
	// Resets check clear/sun/photo to the first check
	$('.lens-container li.active a#t1-0').click();
	
	// Removes check for selecetd lens
	$('div.select-lens-type').removeClass('active');
	$('.rx-lens-choice').prop('checked', false);
	
	// Hides lenses item from lens summary
	$('.lens-section').addClass('hide');
	
	// Removes check from lens color selection
	$('#lens-selection-area .lens-holder.check-row').removeClass('active');
	$('.catentry-radio[value]:checked').removeAttr('checked');
	$('.catentry-radio').prop('checked', false); 
	
	// Removes selection from the selected enhancement
	$('form.lc2 .lc-lens-enh .lc-lens-enh-item').removeClass('added');	
	
	// Removes selection from the selected addon
	$('input[name="addOns"]:checked').removeAttr('checked');
	$('.addOns').prop('checked', false);
	
	// Removes lens summary
	$('.lens-subsection').removeClass('selected');
	
	// Resets CONTINUE button text
	$('.button.apply').text('CONTINUE');
	
	// Resets lens selection breadcrumb
	$('.step-add-lens').find("li.done").removeClass("done");
	
	saveLensSelectionData();
	
    /*lensCatentryId = undefined;
    frameCatentryId = undefined;
    lensColor = undefined;
    lens = undefined;
    addOns = undefined;
    includeLens = undefined;
    lensSelected = false;*/
        
    // Hides addons item from lens summary
    $('li.lens-subsection, li.addons-section').removeClass('selected');
    
    $('li.no-lens').removeClass('hide');
    
    // Shows Add Lense button    
    $('ul.accordion-menu-select-lens').removeClass('hide');
    
    $.query.REMOVE("selectedLens");
}

function saveLensSelectionData(noLensToChoose, doAfterSaveLensSelectionData, noLoader) {
	
	lensCatentryId = $('#lens-selection-modal-page1 .select-lens-type.active .rx-lens-choice').val();	
    frameCatentryId = $('.ajaxAddItemToCart').attr('data-catentryid');
    var isPackage = $('.select-lens-type.active .rx-lens-choice').attr('data-package');
    var packagePrice = $('.select-lens-type.active .rx-lens-choice').attr('data-packageprice');
    if (!isNaN(packagePrice) && packagePrice != "") {
        packagePrice = parseFloat(packagePrice);
    }
    
    lensColor = $('.catentry-radio[value]:checked').closest('label[for^=lens-color-input]').find('span').text();    
    lens = $('.catentry-radio[value]:checked').attr('value');
    
    addOns = $.map($('.addOns:checked'), function(addOn) {
        return $(addOn).attr('value');
    }).join('|');
    if (addOns == '') {
        addOns = $.map($('.lc-lens-enh-item.added input'), function(addOn) {
            return $(addOn).attr('value');
        }).join('|');
    }
    includeLens = true;
    lensSelected = true;
    
    hideTAHError();
    
    var framePromoPrice = $('.rx-lens-choice:checked').attr('data-framepromoprice');
    $('.lens-hidden-data > .framePromoPrice').val(framePromoPrice);
    $('.lens-hidden-data > .addOns').val(addOns);
    var currentCategory = $('#lens-selection-modal-page1 .select-lens-type.active .rx-lens-choice').attr('data-category'); // ok
    $('.lensCategory').val(currentCategory);

    // Cart will immediately refresh and doesn't need to update display items
    if ($('#lens-selection-area').hasClass('cart-lens-options')) {
        cartPageEditPrescription($('#lens-selection-area').attr('data-orderitemid'));
        return;
    }

    var totalPrice = 0;
    var framePrice = 0;
    var lensPrice = $('.lens-hidden-data > .lensPrice').val();
    var lensSaving = $('.lens-hidden-data > .lensSaving').val();
    
    if (!RiaHelper.isInsuranceOn()) {
    	
    	//if RIA is off
    	totalPrice = updatePDPDataWithoutInsurance(isPackage, packagePrice);
	    
	    updatePDPData(totalPrice.toFixed(2), lensPrice, noLensToChoose, isPackage);
	    
	    if(typeof doAfterSaveLensSelectionData === 'function')
        	doAfterSaveLensSelectionData();
    }else{
    	//if RIA is on
		getRIAPricesForEnhancements(function(totalPrice, riaSavings){

			var enhancementsPrice = 0.0;
    		$('.lc-lens-enh-item.added').each(function() {
	            var $this = $(this);
	            var enhPrice = $this.find('.lc-lens-enh-price').text();
	            enhancementsPrice += stripPriceCurrency(enhPrice.replace('+', ''));
	        });
    	
	        if (riaSavings > 0) {
	        	$('.frame-section .price-value').css('text-decoration', 'initial');
	        	$('.frame-offer-section').addClass('hide');
	        	$('.lens-section .price-value').css('text-decoration', 'initial');
	        	$('.lens-offer-section').addClass('hide');
	        	$('.perk-saving-section').addClass('hide');
	        	$('.total-savings').addClass('hide');
	        	
	  	        $('.total-savings-ria > .total_figures').text('- $' + riaSavings.toFixed(2));
	  	        $('.total-savings-ria').removeClass('hide');
	  	    } else{
	  	    	totalPrice = updatePDPDataWithoutInsurance(isPackage, packagePrice);
	  	    } 
	        
	        updatePDPData(parseFloat(totalPrice).toFixed(2), lensPrice, noLensToChoose, isPackage);
	        if(typeof doAfterSaveLensSelectionData === 'function')
	        	doAfterSaveLensSelectionData();
		},noLoader);
    }
    
}

function updatePDPDataWithoutInsurance(isPackage, packagePrice){
	var isPerk = false;
	var partNumber =  document.getElementById('pdp-frame-upc').value;
    if (!(typeof $('.rx-lens-choice:checked').attr('data-perk') == 'undefined' || $('.rx-lens-choice:checked').attr('data-perk') == ''))
    	isPerk = true;
	
	var framePrice = 0;
	if ($('.frame-section .title > span.price-value > span').length > 0)
        framePrice += stripPriceCurrency($('.frame-section .title > span.price-value > span').text());
    else
        framePrice += stripPriceCurrency($('#offerPrice').text().trim());
	
    var totalPrice = framePrice;
    var lensPrice = $('.lens-hidden-data > .lensPrice').val();
    var lensSaving = $('.lens-hidden-data > .lensSaving').val();
    var addonsSaving = 0;
    if (lensPrice != '') {
        totalPrice += stripPriceCurrency(lensPrice);
        $('.addOns:checked').each(function() {
            var currentPrice = stripPriceCurrency($(this).closest('form.lc2').find('.price.product-price').text());
            if (!isNaN(currentPrice)) {
                totalPrice += currentPrice;
            }
            var currentAddon = stripPriceCurrency($(this).closest('form.lc2').find('.saving').text());
            if (!isNaN(currentAddon)) {
                addonsSaving += currentAddon;
            }
        });
    }

    //get total saving amount
    var frameSaving = 0;
    if ($('#discountPrice').length > 0) {
    	frameSaving = stripPriceCurrency($('#discountPrice').text().trim());
    } else if ($('.lens-hidden-data > .framePromoPrice').val() != "") {
    	frameSaving = framePrice - parseFloat($('.lens-hidden-data > .framePromoPrice').val());
    }
    
    /* Black Friday frame saving */
    if (bfEnabled() && !isPerk && !RiaHelper.isInsuranceOn()) {
    	frameSaving = (framePrice * bf.inclusion[partNumber]).toFixed(2);
    }

	var enhSaving = 0;
    $('.lc-lens-enh-item.added').each(function (){
		var $this = $(this);
		var currEnhSaving = 0;
		var enhPrice = stripPriceCurrency($this.find('.enh-price-value').text().replace('+',''));
		if($this.find('.lc-lens-enh-promoprice').length> 0)
			currEnhSaving += enhPrice - stripPriceCurrency($this.find('.lc-lens-enh-promoprice').text().replace('+',''));
		totalPrice += enhPrice - currEnhSaving ;
		enhSaving += currEnhSaving;
	});

    var totalSaving = parseFloat(frameSaving) + stripPriceCurrency(lensSaving) + parseFloat(addonsSaving) + parseFloat(enhSaving);
    if (isPackage) {
        totalSaving = parseFloat(frameSaving) + ((framePrice + stripPriceCurrency(lensPrice)) - packagePrice);
    }

	if(!isPerk){
		$.each( $('.lc-lens-enh-item.added'), function(index, element){
			if($(this).find('input[name=enh]').attr('data-perk')){
				isPerk = true;
				return;
			}
		});
	}
	
	if (isPerk || (bfEnabled() && !isPerk && !RiaHelper.isInsuranceOn())) {
		totalPrice -= parseFloat(frameSaving);
	}
	
	$('.frame-section .price-value').css('text-decoration', 'initial');
	$('.frame-offer-section').addClass('hide');
	$('.lens-section .price-value').css('text-decoration', 'initial');
	$('.lens-offer-section').addClass('hide');
	$('.perk-saving-section').addClass('hide');
	$('.total-savings').addClass('hide');
	
    if (totalSaving > 0) {
    	if (parseFloat(frameSaving) > 0) {
    		$('.frame-section .price-value').css('text-decoration', 'line-through');
			$('.frame-offer-section > .price').text('$' + (framePrice - parseFloat(frameSaving)).toFixed(2));
    		$('.frame-offer-section').removeClass('hide');
		}
    	if (stripPriceCurrency(lensSaving) > 0) {
    		$('.lens-section .price-value').css('text-decoration', 'line-through');
			$('.lens-offer-section > .price').text('$' + stripPriceCurrency(lensPrice).toFixed(2));
			$('.lens-offer-section').removeClass('hide');
		}
    	if(isPerk){
    		$('.perk-saving-section > .price').text('- $' + totalSaving.toFixed(2));
    		$('.perk-saving-section').removeClass('hide');
    	}
    	else {
    		$('.total-savings > .savings-label').text('Savings');    		
    		$('.total-savings > .total_figures').text('- $' + totalSaving.toFixed(2));
    		$('.total-savings').removeClass('hide');
    	}   
    }
    
    if (isPackage) {
        totalPrice = packagePrice;
    }
    
    return totalPrice;
}

function updatePDPData(totalPrice, lensPrice, noLensToChoose, isPackage){
	
	if (!isNaN(totalPrice)) {
	    $('.main-total > .subtotal > span').text('$' + totalPrice);
	    $('#scrollBar .price > span').text('$' + totalPrice);
	    if($("#affirm").length){
	    	$('#affirm').attr('data-amount', totalPrice*100);
	    	affirm.ui.refresh();
	    }
	}
	
	var text = $('.rx-lens-choice:checked').parent().find('.lens-option-title').text();
	var price = $('.rx-lens-choice:checked').parent().find('.price .price').text();
	
	if (!text.trim() && !lensPrice.trim()) {
	    text = $('#show-lens-options-PDP-main .existing-lens-selection-text .existing-lens-name').attr('data-nonrx-text');
	}
	
	if (!noLensToChoose) {
	    $('.lens-section .edit-lens-selection').show();
	}
	
	$('.new-lens-selection-text').hide();
	$('.lens-subsection .no-lens').addClass('hide');
	$('.addToCartText').parent().css("display", "block");
	$('.addToCartText').removeClass('hide');
	//$('.selectLensText').addClass('hide');
	$('#selectedLensTextUp').parent().css("display", "none");
	//$('.selectLensText').parent().css("display","none");
	$('.itemAdded').addClass('hide');
	
	var $addToCartButton = $('.order-subtotal .add-to-cart');
	$('.existing-lens-addons').empty();
	
	var color = $('input[name=lens]:checked').closest('label').text();
	if (color && color !== undefined) {
	    color = color.trim().replace(' *', '');
	    $('.existing-lens-color span').text(color);
	    for(var p in utag_data.Products) {
			var temp = utag_data.Products[p];
			temp.LensColor = color;
		}
	}
	
	
	if($('input[name="addOns"]:checked').length > 0 || $('.lc-lens-enh-item.added').length > 0){
		
		var addOnsTotalPrice = 0;
		$('input[name="addOns"]:checked').each(function() {
		    var $this = $(this),
		        description = $this.closest('form').find('label[for] > .addon-name').text(),
		        price = $this.closest('form').find('.price').text();
		    if (description !== undefined) {
		        description = description.trim();
		    }
		    if (price !== undefined) {
	            price = price.trim();
	            addOnsTotalPrice += parseFloat(price.replace('$', '').trim());
	        }
		    $('.existing-lens-addons').append(
		        '<p>' + description + '</p>');
		});

		var enhTotalPrice = 0;
		$('.lc-lens-enh-item.added').each(function() {
			var $this = $(this), 
				name = $this.find('.lc-lens-enh-name').text();
			
			var enhSaving = 0;
			var enhPrice = stripPriceCurrency($this.find('.enh-price-value').text().replace('+',''));
			if($this.find('.lc-lens-enh-promoprice').length> 0)
				enhSaving += enhPrice - stripPriceCurrency($this.find('.lc-lens-enh-promoprice').text().replace('+',''));
			enhTotalPrice += enhPrice - enhSaving;

			if (name !== undefined) {
				name = name.trim();
				$('.existing-lens-addons').append(
					'<p>' + name + '</p>');
			}

		});

		$('.addons-section .price').html('$' + parseFloat(addOnsTotalPrice + enhTotalPrice).toFixed(2));
	    $('li.addons-section').addClass('selected');
	}else{
		$('li.addons-section').removeClass('selected');
	}
	
	
	$('#selectLensOrAddToCartPDPScrollBar').removeClass('lens-not-selected').addClass('st-button-orange');
}

function showTAHError(text) {
    var $addToCartButton = $('.add-to-cart');
    var lensNotSelectedMessage = 'select-lens-error-message';
    if (!$addToCartButton.parent().find('.' + lensNotSelectedMessage).length) {
        $addToCartButton.parent().append('<span class="' + lensNotSelectedMessage + '">' + text + '<span>');
    } else {
        $('.' + lensNotSelectedMessage).text(text);
    }
    $('body').animate({
        scrollTop: $addToCartButton.offset().top
    }, 200);
    addInProgress = false;
}

function hideTAHError() {
	$('.select-lens-error-message').remove();
}

function showTAHRXError() {
    $('#tah-rx-error-modal').dialog({
        modal: true,
        resizeable: false,
        width: lensSelectDialogWidth,
        dialogClass: 'tah-rx-error-modal',
        open: function() {
            var $this = $(this);
            var $dialog = $this.closest('.ui-dialog');

            $dialog.on('click', '.ui-dialog-titlebar-close', function(e) {
                e.preventDefault();
                closeLensSelectionModal();
            });

            savePlacement();

            $(window).scrollTop(0);

        },
        close: function() {
            $(window).scrollTop(getPlacement());
            addInProgress = false;
        }
    });
}

$(function() {
    //this is necessary to populate the previously selected lens color
    if ($('#existingSunglassesCatEntryId').length > 0) {
        lensProductChange($('#existingSunglassesCatEntryId').val());
    }

    $('body').on('change', 'input[name="productId"]', function() {
        lensProductChange();
    });

    $('body').on('click', '#non-rx-lens-button', function(e) {
        saveLensSelectionData();
        setTimeout(function() {
            closeLensSelectionModal();
        }, 200);
    })
    .on('keypress', '#non-rx-lens-button', function(e) {
    	if(e.which === 13) {
            $(this).trigger( 'click' );
    	}
    });

    $('body').on('click', '.ajaxAddItemToCart', function(e) {
        if (currentOrderTAH || addedTAHItem) {
            showTAHError($('#tah-remove-tah-error').html());
            return false;
        }
        e.preventDefault();
        if (!$('.ajaxAddItemToCart').attr('data-rxable'))
            saveLensSelectionData();
        if (lensSelected)
            ajaxAddGlassesToCart();
        else
            openLensSelectionModal(false);
    });

    if ($('#show-lens-options-PDP-main').attr('data-rxable')) {
        $('body').on('click', '.edit-lens-selection', function(e) {
            e.preventDefault();

            _dl.site_events = {
                edit_lens: "true"
            };
            callTrackAnalytics(_dl);

            openLensSelectionModal(false);
        });
    }

    $('body').on('click', '#go-back-lens-modal-button', function(e) {
        e.preventDefault();
        showModalPage1();
    });

    $('body').on('click', '#confirmAccordionButton', function(e) {
        e.preventDefault();

        if ($('input[name="lens"]:checked')[0] != undefined) {
            //saveLensSelectionData();
            closeLensSelectionModal();
            
        } else {
            $('#lens-error').show();
        }
    });

    $('body').on('click', '.rx-lens-choice', function(e) {
        fillLensInfo($(".select-lens-type input[type='radio']:checked"));


        $('.rx-lens-choice + label').each(function() {
            var $this = $(this);

            if (!$this.attr('data-copy')) {
                $this.attr('data-copy', $this.text());
            }
        });

        $('.rx-lens-choice + label').each(function() {
            var $this = $(this);

            $this.removeClass('red')
                .text($this.attr('data-copy'));
        });

        var $label = $(this).next('label');

        $label.addClass('red')
            .text('selected');

        if ($('#data-holder').attr('data-issunglasses')) {
            $('.edit-addons').show();
            antiReflectiveSelect(false);
            showModalPage2();
        } else {
            closeLensSelectionModal();
        }
    })
    .on('keypress', '.rx-lens-choice', function(e) {
    	if(e.which === 13) {
            $(this).trigger( 'click' );
    	}
    });
    if (currentOrderTAH || currentOrderItemCount) {
        $('.tah-checkbox').prop('readonly', 'readonly');
        $('.tah-checkbox').prop('checked', false).on('click', function() {
            showTAHError($('#tah-remove-item-error').html());
            return false;
        });
    }
    if ($('#addTocartAllowed').attr('data-rxable')) {
        $('#addTocartAllowed a.ajaxAddToCart').css("display", "none");
    } else {
        $('#selectedLensTextUp').parent().css("display", "none");
    }
});


function getFrameData(){
	
	//get frame information
    var fprice = $('#framePrice').val();
    var fupc = $('#frameUPC').val();
	return { price: fprice, upc: fupc, quantity: '1', type: 'f' };
}

function getLensData(){
	
	var lensPrice, lensUPC; 
	lensUpc = $('.lens-hidden-data > .lensUPC').val();
    
	if (lensUpc == '99')
    	lensPrice = $('.lens-hidden-data > .lensPrice').val();
	else if($('.rx-lens-choice:checked').attr('data-package'))
        lensPrice = $('.rx-lens-choice:checked').attr('data-list_price');
    else
        lensPrice = $('.rx-lens-choice:checked').attr('data-price');
    
    if(lensPrice != '' && lensUpc != '')
        return {price: lensPrice, upc: lensUpc, quantity: '1', type: 'l'};
    else
        return null;		
}

function getRIAPricesForTab(tabNum) {

    var jsonRIACookieContent = RiaHelper.getInsuranceCookie();
    var hasInsurance = typeof jsonRIACookieContent !== 'undefined';

    var alreadyCalculated = typeof $('#tab-' + tabNum + '> div > .select-lens-type').find('input').eq(0).attr("data-lens-price-insurance") !== 'undefined';

    if (!hasInsurance || alreadyCalculated) {
        return;
    }

    //$('#lens-selection-modal-page1').addClass('hide');
    showInsurancePriceLoader();
    
    var params = {};
    params['__PRICING_ENTRY'] = [];

    var frameParams = getFrameData();

    //get lenses information
    var lenses = LC2.currentLenses.lens_categories[tabNum].lenses;
    $.each(lenses, function(index, lens) {
    	var lensParams = {
        	price: lens.list_price || lens.current_price,
            upc: lens.lens_color_categories[0].skus[0].lens_sku_code,
            quantity: '1',
            type: 'l'
        };

        params['__PRICING_ENTRY'].push(JSON.stringify({
            frame: frameParams,
            lens: lensParams
        }));
    });

    sendRIARequest(
        params,
        function(response) {
            var jsonResponse = $.parseJSON(response);
            var pairDiscounts = $.parseJSON(jsonResponse['__PAIR_DISCOUNT']);
            $.each(pairDiscounts, function(index, pair) {
                var frameDiscount = pair.frameDiscount;
                var lensDiscount = pair.lensDiscount;
                
                if(frameDiscount == 0 && lensDiscount == 0){
                	$('#tab-' + tabNum + ' .package-header').eq(index).css('display', 'block');
                	$('#tab-' + tabNum + ' .price.saving').eq(index).css('display', 'block');
                }else{
	                var frameInsPrice = parseFloat($('#framePrice').val()) - frameDiscount;
	                var lensInsPrice = (lenses[index].list_price || lenses[index].current_price) - lensDiscount;
	
	                if (frameInsPrice > 0)
	                    frameInsPrice = frameInsPrice.toFixed(2);
	                else frameInsPrice = 0;
	
	                if (lensInsPrice > 0)
	                    lensInsPrice = lensInsPrice.toFixed(2);
	                else lensInsPrice = 0;
	
	                var riaPrice = parseFloat(frameInsPrice) + parseFloat(lensInsPrice);
	                $('#tab-' + tabNum).find('.select-lens-type-price').eq(index).html('<span class="insurance-price-label">Price with insurance<br><p class="include-frame">(Lens + Frame)</p></span><span class="price">$' + riaPrice.toFixed(2) + "</span></div>");
	                $('#tab-' + tabNum + '> div > .select-lens-type').eq(index).find('.popup-table.current-price').hide();
	                $('#tab-' + tabNum + '> div > .select-lens-type').find('input').eq(index).attr("data-price-insurance", riaPrice.toFixed(2));
	                $('#tab-' + tabNum + '> div > .select-lens-type').find('input').eq(index).attr("data-lens-price-insurance", lensInsPrice);
	                $('#tab-' + tabNum + ' .package-header').eq(index).css('display', 'none');
	            }
            });
            
            closeInsurancePriceLoader();
        }
    );
}

function getRIAPricesForEnhancements(doAfterRIAPricesForEnhancements, noLoader){
	
	if(typeof noLoader === 'undefined' || !noLoader)
		showInsurancePriceLoader();
	
	var params = {};
	params['__PRICING_ENTRY'] = [];
	var totalPrice = 0.0;
	
    var frameParams = getFrameData();
    
    totalPrice += parseFloat(frameParams.price);
    
    var lensParams = getLensData();
    
    if(lensParams != null){
    	totalPrice += parseFloat(lensParams.price);
    }else{
    	lensSelected = false;
    }

	var enhancements = [];
    $.each($('.lc-lens-enh-item.added input'), function(index, enh) {
    	enhancements.push ({
        	price: $(this).attr('data-price').substring(1), 
        	upc:$(this).attr('data-sku-pn'), 
        	quantity: '1',
        	type: 'l' 
    	});
    	totalPrice += parseFloat($(this).attr('data-price').substring(1));
    });
    
    params['__PRICING_ENTRY'].push ( JSON.stringify( { frame: frameParams, lens: lensParams, enhancements: enhancements} ) );

    sendRIARequest(params, function(response){
    	$('#lc_step_loader').addClass('hide');
    	$('#lens-selection-modal-page2').removeClass('hide');
    	
    	var jsonResponse = $.parseJSON(response);		
	    var discount =  $.parseJSON(jsonResponse['__PAIR_DISCOUNT']);
	    var frameDiscount = discount[0].frameDiscount;
	    var lensDiscount =  discount[0].lensDiscount;
	    var enhancementsDiscount = discount[0].enhancementsDiscount;
	    totalPrice -= frameDiscount + lensDiscount + enhancementsDiscount;
	    
	    if(discount[0].lens != undefined){
	    	
		  if(!$('#insurance-switch').hasClass('insurance-on'))
					$('#insurance-switch').addClass('insurance-on');
			
		  pdpLanding=false;
	    }
	    
	    if (totalPrice > 0) 
	    	totalPrice = totalPrice.toFixed(2);
	    else totalPrice = 0;
	    
	    $('.calculate-price-enh').css('display', 'none');
	    $('.ria-modal-calculated-price').show();
	    $('.ria-modal-calculated-price > span').text('$' + totalPrice);
	    
	    $('#lens-selection-modal-page1').removeClass('hide');
		$('#lc_step_loader').addClass('hide');
    	
		if(typeof noLoader === 'undefined' || !noLoader)
			closeInsurancePriceLoader();
		
		if(typeof doAfterRIAPricesForEnhancements !== 'undefined')
			doAfterRIAPricesForEnhancements(totalPrice, frameDiscount + lensDiscount + enhancementsDiscount);
    });
}