productDisplayJS = {
		
		/** An array of entitled items which is used in various methods throughout ShoppingActions.js **/
		entitledItems:[],
	    
	    /** The language ID currently in use **/
	    langId: "-1",

	    /** The store ID currently in use **/
	    storeId: "",

	    /** The catalog ID currently in use **/
	    catalogId: "",

	    /** Holds the current user type such as guest or registered user. Allowed values are 'G' for guest and 'R' for registered.**/
	    userType: "",
	    
	    lockAdd: false,
	    
	    /**
	     * stores the currency symbol
	     */
	    currencySymbol: "",
	    
	    /**
	     * This array holds the json object returned from the service, holding the price information of the catEntry.
	     **/
	    itemPriceJsonOject: [],
	    
	    /** A map of attribute name value pairs for the currently selected attribute values **/
		selectedAttributesList: new Object(),
	    
	    /** A boolean used in a variety of the add to cart methods to tell whether or not the base item was added to the cart. **/
	    baseItemAddedToCart: false,
	    
	    setCommonParameters: function (langId, storeId, catalogId, userType, currencySymbol) {
	        productDisplayJS.langId = langId;
	        productDisplayJS.storeId = storeId;
	        productDisplayJS.catalogId = catalogId;
	        productDisplayJS.userType = userType;
	        productDisplayJS.currencySymbol = currencySymbol;
	        productDisplayJS.authToken = encodeURI($("#csrf_authToken").val());
	    },
		
		init: function()
		{
			productFullImageJS.initForPDP();
			// copy variant spec to pupup
			$('.targetSelectedVariant').html('').replaceWith(  $('.selected img').first().clone().css("width", "80px").removeClass("mx-auto")  );
						
			updateScalapayWidgetAmount(".scalapay-widget-pdp",$("#scalapayPriceToShow").val());
			calculateTotal();
		},

		initMiniTiles : function() {
			$('.product--colors div.product--color-item').each(function(){
				var thisEl= $(this);
				var thisImg = $(this).find("img");
				thisEl.hover(
						  function() {
							  var idThumb = thisImg.attr('id');
							  var identifier = idThumb.split("_",3);
							  if(identifier.length == 3){
								  $('#product_image_primary_' + identifier[2] + ' a img').attr('src',"https://assets.salmoiraghievigano.it/is/image/salmoiraghivigano/"+ identifier[1]+"__001.png?impolicy=SV_PLP_FR_PI21");
								  $('#product_image_secondary_' + identifier[2] + ' a source[media="(min-width:993px)"]').attr('srcset',"https://assets.salmoiraghievigano.it/is/image/salmoiraghivigano/"+ identifier[1]+"__002.png?impolicy=SV_PLP_FR_PI21");
								  productDisplayJS.setTileBagdesAndPrice(identifier[2],identifier[1]);
							  }
						  }
						  /*,
							function() {
							  if(thisImg.parents('.product--colors').length > 0){
								  var idThumb = thisImg.parents('.product--colors').find('li.selectedChild').find('img').attr('id');
								  var identifier = idThumb.split("_", 3);
								  if(identifier.length == 3){
									  $('#product_image_primary_' + identifier[2] + ' a img').attr('src',"https://assets.salmoiraghievigano.it/is/image/salmoiraghivigano/"+ identifier[1]+"_000A.png?impolicy=SV_PLP_FR");
									  $('#product_image_secondary_' + identifier[2] + ' a img').attr('src',"https://assets.salmoiraghievigano.it/is/image/salmoiraghivigano/"+ identifier[1]+"_030A.png?impolicy=SV_PLP_FR");
								  }
							  }
						  }*/
					);
			});
			
			$('.product--colors').each(function(){
				var thisUl = $(this);
				thisUl.hover(
					function(){},
					function() {
						if(thisUl.length > 0){
							  var idThumb = thisUl.find('div.selectedChild').find('img').attr('id');
							  if(typeof idThumb != 'undefined'){
								  var identifier = idThumb.split("_", 3);
								  if(identifier.length == 3){
									  $('#product_image_primary_' + identifier[2] + ' a img').attr('src',"https://assets.salmoiraghievigano.it/is/image/salmoiraghivigano/"+ identifier[1]+"__001.png?impolicy=SV_PLP_FR_PI21");
									  $('#product_image_secondary_' + identifier[2] + ' a source[media="(min-width:993px)"]').attr('srcset',"https://assets.salmoiraghievigano.it/is/image/salmoiraghivigano/"+ identifier[1]+"__002.png?impolicy=SV_PLP_FR_PI21");
									  productDisplayJS.setTileBagdesAndPrice(identifier[2],identifier[1]);
								  }
							  }
						  }
					}
				);
				if(thisUl.length > 0){
					  var idThumb = thisUl.find('div.selectedChild').find('img').attr('id');
					  if(typeof idThumb != 'undefined'){
						  var identifier = idThumb.split("_", 3);
						  productDisplayJS.setTileBagdesAndPrice(identifier[2],identifier[1]);
					  }
				}
			});

            $('.productStellaInfo').each(function(){
                let partNumber = $(this).attr('data-partnumber');
                let productPartNumber = $(this).attr('data-productpartnumber');
                productDisplayJS.setTileBagdesAndPrice(productPartNumber,partNumber);
            });
		},
		
		setChildBadgesZonaA : function(productPartNumber,childPartNumber){
			/*$("#promo"+productPartNumber).addClass("d-none");
			$("#preorder"+productPartNumber).addClass("d-none");			
			$("#newrelease"+productPartNumber).addClass("d-none");			
			$("#antiriflesso"+productPartNumber).addClass("d-none");
			$("#antiblu"+productPartNumber).addClass("d-none");
			$("#exclusive"+productPartNumber).addClass("d-none");
			$("#customBadge"+productPartNumber).addClass("d-none");
			$("#kids"+productPartNumber).addClass("d-none");
			$("#asian"+productPartNumber).addClass("d-none");
			$("#stella"+productPartNumber).addClass("d-none");*/
			$("#tileBadge"+productPartNumber).addClass("d-none");
			
			var valueOfBadge = $("#badgeZonaA"+childPartNumber).val();
			var isReaders = $("#isReaders"+childPartNumber).val();
			if(typeof valueOfBadge != 'undefined'){
				var badgesValue = jQuery.parseJSON(valueOfBadge);
				if(badgesValue['promo']){
					$("#promo"+productPartNumber).removeClass("d-none");
				}else if(badgesValue['preorder']){
					$("#preorder"+productPartNumber).removeClass("d-none");
				}else if(badgesValue['newrelease'] && !isReaders ){
					$("#newrelease"+productPartNumber).removeClass("d-none");
				}
				else if(badgesValue['treatmentAntiRiflesso'] && isReaders ){
					$("#antiriflesso"+productPartNumber).removeClass("d-none");
				}
				else if(badgesValue['treatmentAntiBlu'] && isReaders ){
					$("#antiblu"+productPartNumber).removeClass("d-none");
				}

				if(badgesValue['exclusive']){
                    $("#exclusive"+productPartNumber).removeClass("d-none");
                }
                if(badgesValue['customBadge']){
                    $("#customBadge"+productPartNumber).removeClass("d-none");
                }
				if(badgesValue['isProductStella']){
                    $("#stella"+productPartNumber).removeClass("d-none");
                }
				if(badgesValue['asian']){
                    $("#asian"+productPartNumber).removeClass("d-none");
                }
				if(badgesValue['kids']){
                    $("#kids"+productPartNumber).removeClass("d-none");
                }
				
				let listPrice = 0,offerPrice = 0;
				if(badgesValue['listPrice']){
					listPrice = Number(badgesValue['listPrice']);
					$("#productOldPrice"+productPartNumber).html(listPrice.toFixed(2).replace('.',','));
				}
				if(badgesValue['offerPrice']){
					offerPrice = Number(badgesValue['offerPrice']);
					$("#productListPrice"+productPartNumber).html(offerPrice.toFixed(2).replace('.',','));
				}
				if(listPrice > 0 && offerPrice > 0){
					if(listPrice > offerPrice){
						$("#productOldPrice"+productPartNumber).parent().show();
					}else {
						$("#productOldPrice"+productPartNumber).parent().hide();
					}		
				}
			}else {
				console.log("undefined -> "+childPartNumber);
			}
		},
		
		setTileBagdesAndPrice: function(productPartNumber,childPartNumber){
			$(".tileBadge"+productPartNumber).addClass("d-none");
			
			var valueOfBadge = $("#itemInfo"+childPartNumber).val();
			var isReaders = $("#isReaders"+childPartNumber).val() == 'true';
			if(typeof valueOfBadge != 'undefined'){
				var badgesValue = jQuery.parseJSON(valueOfBadge);
				if(badgesValue['promoPerc']){
					$("#promoPerc"+productPartNumber).html(badgesValue['promoPerc']);
					$("#promoPerc"+productPartNumber).removeClass("d-none");
				}else if(badgesValue['preorder']){
					$("#preorder"+productPartNumber).removeClass("d-none");
				}else if(badgesValue['newrelease'] && !isReaders ){
					$("#newrelease"+productPartNumber).removeClass("d-none");
				}
				else if(badgesValue['treatmentAntiRiflesso'] && isReaders ){
					$("#antiriflesso"+productPartNumber).removeClass("d-none");
				}
				else if(badgesValue['treatmentAntiBlu'] && isReaders ){
					$("#antiblu"+productPartNumber).removeClass("d-none");
				}

				if(badgesValue['exclusive']){
                    $("#exclusive"+productPartNumber).removeClass("d-none");
                }
                if(badgesValue['customBadge']){
                    if(badgesValue['customBadge'].toLowerCase() == 'gaming'){
                        $("#customBadge"+productPartNumber).removeClass("product--badge--sustainable");
                        $("#customBadge"+productPartNumber).addClass("product--badge--exclusive");
                    }else if(badgesValue['customBadge'].toLowerCase() == 'materiali alternativi'){
                        $("#customBadge"+productPartNumber).removeClass("product--badge--exclusive");
                        $("#customBadge"+productPartNumber).addClass("product--badge--sustainable");
                    }
                    $("#customBadge"+productPartNumber).html(badgesValue['customBadge']);
                    $("#customBadge"+productPartNumber).removeClass("d-none");
                }
				if(badgesValue['isProductStella']){
                    $("#stella"+childPartNumber).removeClass("d-none");
                }
				if(badgesValue['asianFit']){
                    $("#asian"+productPartNumber).removeClass("d-none");
                }
				if(badgesValue['kids']){
                    $("#kids"+productPartNumber).removeClass("d-none");
                }
				if(badgesValue['polarized']){
                    $("#polarized"+productPartNumber).removeClass("d-none");
                }
				
				let listPrice = 0,offerPrice = 0;
				if(badgesValue['itemDisplayPrice']){
					listPrice = Number(badgesValue['itemDisplayPrice']);
					$("#productOldPrice"+productPartNumber).html(listPrice.toFixed(2).replace('.',','));
				}
				if(badgesValue['itemOfferPrice']){
					offerPrice = Number(badgesValue['itemOfferPrice']);
					$("#productListPrice"+productPartNumber).html(offerPrice.toFixed(2).replace('.',','));
				}
				if(listPrice > 0 && offerPrice > 0){
					if(listPrice > offerPrice){
						$("#productOldPrice"+productPartNumber).parent().show();
					}else {
						$("#productOldPrice"+productPartNumber).parent().hide();
					}		
				}
				if(badgesValue['itemAvail'] && !badgesValue['itemAvail'].available){
                    $("#notavailable"+productPartNumber).removeClass("d-none");
                }
				var visibleBadgeSelector = '.tileBadge' + productPartNumber + ':not(.d-none)';
				if($(visibleBadgeSelector).length > 1 && $(window).width() <= 992) {
					$(visibleBadgeSelector).eq(1).addClass("mobile-grid-hidden");
					$(visibleBadgeSelector).slice(2).addClass("d-none");
				}
				if($(visibleBadgeSelector).length > 2 && $(window).width() >= 992) {
					$(visibleBadgeSelector).slice(2).addClass("d-none");
				}				
			}else {
				console.log("undefined -> "+childPartNumber);
			}
		},

		sortProducts : function(order) {
			var url = window.location.href;
			
			var pattern = new RegExp('\\b(orderBy=).*?(&|#|$)');
			if (url.search(pattern)>=0 && order > 0) {
				url = url.replace(pattern,'$1' + order + '$2');
			}else{
				url = url.replace(/[?#]$/, '');
				if(order > 0){
					url = url + (url.indexOf('?')>0 ? '&' : '?') + 'orderBy=' + order;
				}
				
			}
			window.location.href = url;
		},
		
		createCustomParams: function(customParams, eyes, isRecurring, frequency, parentProductId) {
			this.eyes = eyes;
			customParams["eye"] = eyes;
			customParams["attributeName"] = ["ParentProductId"];
			customParams["attributeValue"] = [parentProductId];
			customParams["attributeName"].push("OrderItemTimestamp");
			customParams["attributeValue"].push((new Date()).getTime());
			if (isRecurring) {
				customParams["attributeName"].push("RecurringFrequency");
				customParams["attributeValue"].push(frequency);
			}
			
			/*if (eyes === "both") {
				var attrName_1 = [], attrVal_1 = [], attrName_2 = [], attrVal_2 = [];
				
				attrName_1.push("LensEye"); attrVal_1.push("right");
				attrName_2.push("LensEye"); attrVal_2.push("left");
				attrName_1.push("ParentProductId"); attrVal_1.push(parentProductId);
				attrName_2.push("ParentProductId"); attrVal_2.push(parentProductId);
				if (isRecurring) {
					attrName_1.push("RecurringFrequency"); attrVal_1.push(frequency);
					attrName_2.push("RecurringFrequency"); attrVal_2.push(frequency);					
				}
				
				customParams["attributeName_1"] = attrName_1;
				customParams["attributeValue_1"] = attrVal_1;
				customParams["attributeName_2"] = attrName_2;
				customParams["attributeValue_2"] = attrVal_2;	
			} else if (eyes === "right" || eyes === "left") {
				customParams["attributeName"] = ["LensEye"];
				customParams["attributeValue"] = [eyes];
				if (isRecurring) {
					customParams["attributeName"].push("RecurringFrequency");
					customParams["attributeValue"].push(frequency);				
				}
			}*/
		},
		
		ValidatePrescriptionContactLenses: function (prescriptionId,showError) {
			var prescriptionNumber = 1;
	        if (typeof prescriptionId !== "undefined" && prescriptionId !== null) {
		        var prescriptionNumber = $("#" + prescriptionId).data("prescription");
	        }
			var prescriptionCompleted = true;
	        var prescriptionItemRight = $("#right-item_" + prescriptionNumber).val().replace("sku_","");
	        var prescriptionItemLeft = $("#left-item_" + prescriptionNumber).val().replace("sku_","");
	        let typeOfPurchase = 'single';
			if(productDisplayJS.isSubsPurchase()){
				typeOfPurchase = 'subs';
			}
	        var prescriptionQtyRight = $("#right-boxes_" + typeOfPurchase).val();
	        var prescriptionQtyLeft = $("#left-boxes_" + typeOfPurchase).val();
	        var prescriptionCompletedRight = (prescriptionItemRight !== "" && prescriptionQtyRight !== "");
	        var prescriptionCompletedLeft = (prescriptionItemLeft !== "" && prescriptionQtyLeft !== "");
	        if (parseInt(prescriptionQtyRight) > 0 && parseInt(prescriptionQtyLeft) > 0) {
	        	if (!prescriptionCompletedRight || !prescriptionCompletedLeft) {
	        		prescriptionCompleted = false;
	        	}
	        } else if (parseInt(prescriptionQtyRight) > 0) {
	        	if (!prescriptionCompletedRight) {
	        		prescriptionCompleted = false;
	        	}
	        }else if (parseInt(prescriptionQtyLeft) > 0) {
	        	if (!prescriptionCompletedLeft) {
	        		prescriptionCompleted = false;
	        	}
	        }else {
	            prescriptionCompleted = false;
	        }
	        if(!prescriptionCompleted && showError){
	        	$(".error-below-add-button").removeClass("d-none");
	        	
	        	var selectToSearch = "select + div";
	        	if(detectmob()){
	        		selectToSearch = ".basic-select select";
	        	}
	        	
	        	if (parseInt(prescriptionQtyLeft) > 0) {
	        		$("#leftEyePrescr").find(selectToSearch).each(function() {
	        			var $select = $(this);
	        			var selectVal = $select.text();
	        			if(detectmob()){
	        				selectVal = $select.children("option:selected").text();
	        			}
                
	        			if (selectVal === "--") {
	        				$select.addClass("border border-danger");
	        			}
        			});
	        	}
	        	if (parseInt(prescriptionQtyRight) > 0) {
	        		$("#rightEyePrescr").find(selectToSearch).each(function() {
	        			var $select = $(this);
	        			var selectVal = $select.text();
	        			if(detectmob()){
	        				selectVal = $select.children("option:selected").text();
	        			}
                
	        			if (selectVal === "--") {
	        				$select.addClass("border border-danger");
	        			}
        			});
	        	}
	        	$(window).scrollTop($('#prescription-wrapper_' + prescriptionNumber).offset().top - 80);
	        }
	        if($('#add2CartBtn').hasClass('loading-button')){
	        	prescriptionCompleted = false;
	        }
	        return prescriptionCompleted;
		},
		
	    AddContactLenses2ShopCartAjax: function (prescriptionId) {
	    	var customParams = {};
	    	var isRecurring = $("#prescription-purchase").is(":checked");
	    	var recurringFreq = $("#delivery-select").val();
	        var prescriptionNumber = 1;
	        if (typeof prescriptionId !== "undefined" && prescriptionId !== null) {
		        var prescriptionNumber = $("#" + prescriptionId).data("prescription");
	        }
	        var parentProductId = $("[data-itemsforprescription='" + prescriptionNumber + "']").attr("id").replace("product_", "");
	        var prescriptionCompleted = productDisplayJS.ValidatePrescriptionContactLenses(prescriptionId,true);
	        var prescriptionItemRight = $("#right-item_" + prescriptionNumber).val().replace("sku_","");
	        var prescriptionItemLeft = $("#left-item_" + prescriptionNumber).val().replace("sku_","");
	        let typeOfPurchase = 'single';
			if(productDisplayJS.isSubsPurchase()){
				typeOfPurchase = 'subs';
			}
	        var prescriptionQtyRight = $("#right-boxes_" + typeOfPurchase).val();
	        var prescriptionQtyLeft = $("#left-boxes_" + typeOfPurchase).val();
	        var quantities, availability;
	        if(prescriptionCompleted){
	        	if (prescriptionQtyRight > 0 && prescriptionQtyLeft > 0) {
      		        	this.createCustomParams(customParams, "both", isRecurring, recurringFreq, parentProductId);
      		            this.catEntries = [prescriptionItemRight, prescriptionItemLeft];
      		            availability = [$("#sku_" + prescriptionItemRight).data("available") !== 0, $("sku_" + prescriptionItemLeft).data("available") !== 0];
      		            quantities = [prescriptionQtyRight, prescriptionQtyLeft];
      	        } else if (prescriptionQtyRight > 0) {
      		        	this.createCustomParams(customParams, "right", isRecurring, recurringFreq, parentProductId);
      		            this.catEntries = prescriptionItemRight;
      		            availability = $("#sku_" + prescriptionItemRight).data("available") !== 0;
      		            quantities = prescriptionQtyRight;
      	        } else if (prescriptionQtyLeft > 0) {
      		        	this.createCustomParams(customParams, "left", isRecurring, recurringFreq, parentProductId);
      		            this.catEntries = prescriptionItemLeft;
      		            availability = $("#sku_" + prescriptionItemLeft).data("available") !== 0;
      		            quantities = prescriptionQtyLeft;
      	        } 
	        	
	        	let accessorySelected = $("div[data-accessory-atc].active");
	        	let quantitiesAcc, availabilityAcc, catentriesAcc;
	        	if(accessorySelected.length > 0){
	        		let accProductId = accessorySelected.attr('data-accessory-atc');
	        		catentriesAcc = accProductId;
	        		availabilityAcc = true;
	        		quantitiesAcc = "1";
	        		this.addToCart(catentriesAcc,quantitiesAcc,availabilityAcc,undefined,false,function(){productDisplayJS.addToCart(productDisplayJS.catEntries, quantities, availability, customParams)});
	        	}else {
	        		this.addToCart(this.catEntries, quantities, availability, customParams);
	        	}
	        	
	        }
	    },
		/**
	     * Add2ShopCartAjax This function is used to add a catalog entry to the shopping cart using an AJAX call. This will resolve the catentryId using entitledItemId and adds the item to the cart.
	     *				This function will resolve the SKU based on the entitledItemId passed in and call {@link productDisplayJS.AddItem2ShopCartAjax}.
	     * @param {String} entitledItemId A DIV containing a JSON object which holds information about a catalog entry. You can reference CachedProductOnlyDisplay.jsp to see how that div is constructed.
	     * @param {int} quantity The quantity of the item to add to the cart.
	     * @param {String} isPopup If the value is true, then this implies that the function was called from a quick info pop-up. 	
	     * @param {Object} customParams - Any additional parameters that needs to be passed during service invocation.
	     *
	     **/
	    
	    Add2ShopCartReadersAjax: function (quantity, isPopup, customParams) {
	    	var entitledItemId =$('input[name="pwrOptions"]:checked').val();
	    	this.addToCart(entitledItemId, quantity, "available",customParams);
	    },
	    
	    Add2ShopCartAjax: function (entitledItemId, quantity, isPopup, customParams) {
	    	this.addToCart(entitledItemId, quantity, "available",customParams);
	    },
	    
	    Add2ShopCartAjaxFromCart: function (entitledItemId, quantity, isPopup, customParams) {
	    	this.addToCart(entitledItemId, quantity, "available",customParams,"new");
	    },
	    
	    Add2ShopCartAjaxFromCartIncreaseQuantity: function (entitledItemId, quantity, isPopup, customParams) {
	    	this.addToCart(entitledItemId, quantity, "available",customParams,"update");
	    },
	    
	    Add2ShopCartAjaxAccessories: function (entitledItemId) {
	    	var quantity = $("#acc-quantity-select").val();
	    	
	    	var entitledItemIdArray = [];
	    	var quantityArray = [];
	    	var availableArray = [];
	    	if(parseInt(quantity) > 1)
	    	{
	    		for(i=1; i <= parseInt(quantity); i++)
	    		{
	    			entitledItemIdArray.push(entitledItemId);
	    			quantityArray.push("1");
	    			availableArray.push("available");
	    		}
	    		
	    		this.addToCart(entitledItemIdArray, quantityArray, availableArray);
	    	}
	    	else
	    	{
	    		this.addToCart(entitledItemId, quantity, "available");
	    	}
	    },
	    
	    oldAdd2ShopCartAjax: function (entitledItemId, quantity, isPopup, customParams) {
	        var dialog = $('#quick_cart_container').data("wc-WCDialog");
	        if (dialog) {
	            dialog.close();
	        }
	        if (browseOnly) {
	            MessageHelper.displayErrorMessage(Utils.getLocalizationMessage('ERROR_ADD2CART_BROWSE_ONLY'));
	            return;
	        }
	        var entitledItemJSON;

	        if ($("#" + entitledItemId).length) {
	            //the json object for entitled items are already in the HTML. 
	            entitledItemJSON = eval('(' + $("#" + entitledItemId).html() + ')');
	        } else {
	            //if $("#" + entitledItemId).length is 0, that means there's no <div> in the HTML that contains the JSON object. 
	            //in this case, it must have been set in catalogentryThumbnailDisplay.js when the quick info
	            entitledItemJSON = this.getEntitledItemJsonObject();
	        }

	        productDisplayJS.setEntitledItems(entitledItemJSON);
	        var catalogEntryId = productDisplayJS.getCatalogEntryId(entitledItemId);

	        if (catalogEntryId != null) {
	            var productId = entitledItemId.substring(entitledItemId.indexOf("_") + 1);
	            productDisplayJS.AddItem2ShopCartAjax(catalogEntryId, quantity, customParams, productId);
	            productDisplayJS.baseItemAddedToCart = true;
	            /*if($('#second_level_category_popup') != null){
					hidePopup('second_level_category_popup');
				}*/

	        } else if (isPopup == true) {
	            $('#second_level_category_popup').css("zIndex", '1');
	            MessageHelper.formErrorHandleClient('addToCartLinkAjax', Utils.getLocalizationMessage('ERR_RESOLVING_SKU'));
	        } else {
	            MessageHelper.displayErrorMessage(Utils.getLocalizationMessage('ERR_RESOLVING_SKU'));
	            productDisplayJS.baseItemAddedToCart = false;
	        }
	    },
	    
	    AddItem2ShopCartAjax: function (catEntryIdentifier, quantity, customParams, productId) {
	        if (browseOnly) {
	            MessageHelper.displayErrorMessage(Utils.getLocalizationMessage('ERROR_ADD2CART_BROWSE_ONLY'));
	            return;
	        }
	        var params = {
	            storeId: this.storeId,
	            catalogId: this.catalogId,
	            langId: this.langId,
	            orderId: "."
	        };
	        // Remove calculations for performance
	        // params.calculationUsage = "-1,-2,-5,-6,-7";
	        params.inventoryValidation = "true";
	        params.calculateOrder = "0";
	        var ajaxShopCartService = "AddOrderItem";

	        shoppingActionsJS.productAddedList = {};
	        if (Array.isArray(catEntryIdentifier) && Array.isArray(quantity)) {
	            for (var i = 0; i < catEntryIdentifier.length; i++) {
	                if (!isPositiveInteger(quantity[i])) {
	                    MessageHelper.displayErrorMessage(Utils.getLocalizationMessage('QUANTITY_INPUT_ERROR'));
	                    return;
	                }
	                params["catEntryId_" + (i + 1)] = catEntryIdentifier[i];
	                params["quantity_" + (i + 1)] = quantity[i];
	            }
	        } else {
	            if (!isPositiveInteger(quantity)) {
	                MessageHelper.displayErrorMessage(Utils.getLocalizationMessage('QUANTITY_INPUT_ERROR'));
	                return;
	            }
	            params.catEntryId = catEntryIdentifier;
	            params.quantity = quantity;

	            var selectedAttrList = {};
	            for (attr in productDisplayJS.selectedAttributesList['entitledItem_' + productId]) {
	                selectedAttrList[attr] = productDisplayJS.selectedAttributesList['entitledItem_' + productId][attr];
	            }

	            if (productId == undefined) {
	                shoppingActionsJS.saveAddedProductInfo(quantity, catEntryIdentifier, catEntryIdentifier, selectedAttrList);
	            } else {
	                shoppingActionsJS.saveAddedProductInfo(quantity, productId, catEntryIdentifier, selectedAttrList);
	            }
	        }

	        //Pass any other customParams set by other add on features
	        if (customParams != null && customParams != 'undefined') {
	            for (i in customParams) {
	                params[i] = customParams[i];
	            }
	            if (customParams['catalogEntryType'] == 'dynamicKit') {
	                ajaxShopCartService = "AddPreConfigurationToCart";
	            }
	        }

	        var contractIdElements = document.getElementsByName('contractSelectForm_contractId');
	        if (contractIdElements != null && contractIdElements != "undefined") {
	            for (i = 0; i < contractIdElements.length; i++) {
	                if (contractIdElements[i].checked) {
	                    params.contractId = contractIdElements[i].value;
	                    break;
	                }
	            }
	        }

	        //For Handling multiple clicks
	      /*  if (!submitRequest()) {
	            return;
	        }*/
			
			//cursor_wait();
			var addToCartEventConsumed = false;

			if(typeof callCenterIntegrationJS != 'undefined' && callCenterIntegrationJS != undefined && callCenterIntegrationJS != null){
				var catEntry = productDisplayJS.itemPriceJsonOject[params.catEntryId].catalogEntry;
				var partNumber = catEntry.catalogEntryIdentifier.externalIdentifier.partNumber;
				var wccParams = {};
				wccParams["partNumber"] = partNumber;
				addToCartEventConsumed = callCenterIntegrationJS.consumeAddToCartEvent(params,wccParams);
			}

			if(!addToCartEventConsumed) {
				wc.service.invoke(ajaxShopCartService, params);
			}
			
	        productDisplayJS.baseItemAddedToCart = true;

	        if (document.getElementById("headerShopCartLink") && document.getElementById("headerShopCartLink").style.display != "none") {
	            $("#headerShopCart").focus();
	        } else {
	            $("#headerShopCart1").focus();
	        }
	    },
	    
	    setEntitledItems: function (entitledItemArray) {
	        productDisplayJS.entitledItems = entitledItemArray;
	    },
	    
	    /**
	     * retrieves the entitledItemJsonObject
	     */
	    getEntitledItemJsonObject: function () {
	        return productDisplayJS.entitledItemJsonObject;
	    },
	    
	    getCatalogEntryId: function (entitledItemId) {
	        var attributeArray = [];
	        var selectedAttributes = productDisplayJS.selectedAttributesList[entitledItemId];
	        for (attribute in selectedAttributes) {
	            attributeArray.push(attribute + "_|_" + selectedAttributes[attribute]);
	        }
	        // there are no selected attribute and no entitled item, this must be a single sku item without defining attribute
	        if (selectedAttributes == null && this.entitledItems == null) {
	            return entitledItemId.substring(entitledItemId.indexOf("_") + 1);
	        }
	        return productDisplayJS.resolveSKU(attributeArray);
	    },
	    
	    /**
	     * resolveSKU Resolves a SKU using an array of defining attributes.
	     *
	     * @param {String[]} attributeArray An array of defining attributes upon which to resolve a SKU.
	     *
	     * @return {String} catentry_id The catalog entry ID of the SKU.
	     *
	     **/
	    resolveSKU: function (attributeArray) {
	        console.debug("Resolving SKU >> " + attributeArray + ">>" + this.entitledItems);
	        var catentry_id = "";
	        var attributeArrayCount = attributeArray.length;

	        // if there is only one item, no need to check the attributes to resolve the sku
	        if (this.entitledItems.length == 1) {
	            return this.entitledItems[0].catentry_id;
	        }
	        for (x in this.entitledItems) {
	            var catentry_id = this.entitledItems[x].catentry_id;
	            var Attributes = this.entitledItems[x].Attributes;
	            var attributeCount = 0;
	            for (index in Attributes) {
	                attributeCount++;
	            }

	            // Handle special case where a catalog entry has one sku with no attributes
	            if (attributeArrayCount == 0 && attributeCount == 0) {
	                return catentry_id;
	            }
	            if (attributeCount != 0 && attributeArrayCount >= attributeCount) {
	                var matchedAttributeCount = 0;

	                for (attributeName in attributeArray) {
	                    var attributeValue = attributeArray[attributeName];
	                    if (attributeValue in Attributes) {
	                        matchedAttributeCount++;
	                    }
	                }

	                if (attributeCount == matchedAttributeCount) {
	                    console.debug("CatEntryId:" + catentry_id + " for Attribute: " + attributeArray);
	                    this.disableBuyButtonforUnbuyable(x);
	                    return catentry_id;
	                }
	            }
	        }
	        return null;
	    },
	    
	    addToCart: function(catEntry, quantity, availability, customParams,fromCart, callback) {
	    	if (productDisplayJS.lockAdd) return;
			productDisplayJS.lockAdd = true;
	    	var isContactLenses = false;
	    	
	    	let catIdentifier = Array.isArray(catEntry) ? catEntry[0] : catEntry;
	    	let productPartNumber = $("#productPartNumber-" + catIdentifier).val();
	    	let deliveryDate, productCategory;
	    	let isReaders = $("#productCategoryReaders").val();
	    	if(typeof productPartNumber != 'undefined'){
	    		deliveryDate = $("#expectedDeliveryDate-" + productPartNumber).val();
		    	productCategory = $("#productCategory-" + productPartNumber).val();
	    	}
	    	if(typeof deliveryDate == 'undefined' && typeof isReaders != 'undefined'){
	    		deliveryDate = $("#expectedDeliveryDateReaders").val();
		    	productCategory = isReaders;
	    	}
	    	
	    	if(typeof deliveryDate == 'undefined'){
	    		deliveryDate = $("#expectedDeliveryDateCL").val();
	    	}
	    	if(typeof productCategory == 'undefined'){
		    	productCategory = $("#productCategoryCL").val();
	    	}
	    	
	    	if(deliveryDate.length > 0 || productCategory.length > 0){
	    		if(!customParams){
	    			customParams = {};
	    			customParams["attributeName"] = [];
	    			customParams["attributeValue"] = [];
	    		}
	    		if(deliveryDate.length > 0){
		    		customParams["attributeName"].push("ExpectedDeliveryDate");
					customParams["attributeValue"].push(deliveryDate);
	    		}
	    		if(productCategory.length > 0){
					customParams["attributeName"].push("ProductCategory");
					customParams["attributeValue"].push(productCategory);
	    		}
	    		customParams["attributeName"].push("OrderItemTimestamp");
				customParams["attributeValue"].push((new Date()).getTime());
	    	}
	    	var successCallback = function(data) {
				try {
					if(fromCart == "new"){
						location.reload();
					}else if (fromCart == "update"){
						
						cartJS.cartDetailsPromise().then((data) => {					
							cartJS.updateOrderDetails();
							cartJS.updateSummary();
						});
						
						if(cartJS.cartObjectProcessed && cartJS.getCart().orderItem){
							for(let item of cartJS.getCart().orderItem){
								if(item.partNumber == productPartNumber)
								{
									var orderItemId = item.orderItemId;
									
									var maxQuantityBuyable = $("#maxQuantityBuyable-"+orderItemId).val();
									var quantity = $("#qty_"+orderItemId).val();
									
									if(quantity == maxQuantityBuyable)
									{
										$("#buttonQtn_"+orderItemId+".plus").attr("disabled","disabled");
									}
								}
							}
							
						}
						
					}else {
						_closeCart();
						var newOrderItemIdsJSON =JSON.parse(data.trim().substring(2,data.length-2));
						var newOrderItemIds = newOrderItemIdsJSON.orderItem;
						miniCartJS.lastOrderItemId = "&objectId=" + newOrderItemIds[0].orderItemId;
						miniCartJS.loadMiniCart();
					}
		    		
				} catch (e) {
					setTimeout(function() { jsLogger.severe("addToCart0", "Response is fine, wrong JSON format - logic exception. e=" + e.message, JSON.stringify(data)); }, 50);
				}
	    	};
	    	
	    	if(callback){
	    		successCallback = callback;
	    	}
	    	
	    	if (typeof customParams !== "undefined" && customParams !== null && Array.isArray(customParams["attributeName"])) {
    			for(let attr of customParams["attributeName"]){
    				if(attr == 'ParentProductId'){
    					isContactLenses = true;
    				}
    			}	    		
	    	}
	    	
            if (isContactLenses && typeof customParams !== "undefined" && customParams !== null) {
            	//isContactLenses = true;
    	    	var isRecurring = $("#prescription-purchase").is(":checked");
            	successCallback = function(data) {
            		var newOrderItemIdsJSON;
            		try {
            			newOrderItemIdsJSON = JSON.parse(data.trim().substring(2,data.length-2));
            		
						//copy left-item_1 to left-item-in-cart
						var newOrderItemIds = newOrderItemIdsJSON.orderItem;
						if (typeof newOrderItemIds === "undefined") {
							console.log("Errore: \n" + data.trim());
							setTimeout(function() { jsLogger.severe("addToCart2", "newOrderItemIds is undefined"); }, 50);
							return;
						}
						$("#right-item-in-cart").val("");
						$("#left-item-in-cart").val("");
						if (productDisplayJS.eyes === "both") {
							miniCartJS.lastOrderItemId = "&objectId=" + newOrderItemIds[0].orderItemId + "|" + newOrderItemIds[1].orderItemId + "&objectId2="
								+ newOrderItemIds[1].orderItemId + "|" + newOrderItemIds[0].orderItemId
						} else if (this.eyes === "right") {
							miniCartJS.lastOrderItemId = "&objectId=" + newOrderItemIds[0].orderItemId;
						} else {
							miniCartJS.lastOrderItemId = "&objectId=" + newOrderItemIds[0].orderItemId;
						}
						if (typeof couponJS !== "undefined" && couponJS !== null) {
							couponJS.orderId = newOrderItemIdsJSON.orderId;
							if (isRecurring) {
								couponJS.applyCoupon(function(){miniCartJS.loadMiniCart()});
							} else {
								miniCartJS.loadMiniCart();
							}
						} else {
							miniCartJS.loadMiniCart();
						}
            		} catch (e) {
            			setTimeout(function() { jsLogger.severe("addToCart3", "Response is fine, wrong JSON format - logic exception. e=" + e.message, JSON.stringify(data)); }, 50);
            		}
            	};
            }
	    	var params = "storeId=" + this.storeId;
	    	params += "&catalogId=" + this.catalogId;
	    	params += "&langId=" + this.langId;
	    	params += "&orderId=.";
	    	params += "&inventoryValidation=true";
	    	params += "&calculateOrder=1";
	    	params += "&merge=*";
	        params += "&calculationUsage=-1,-2,-5,-6,-7";
	    	
	        if (Array.isArray(catEntry) && Array.isArray(quantity) && Array.isArray(availability)) {
	            for (var i = 1; i <= catEntry.length; i++) {
	                params += "&catEntryId_" + i + "=" + catEntry[i-1];
	                params += "&quantity_" + i + "=" + quantity[i-1];
	                if (typeof availability !== "undefined" && availability !== null) 
	                {
	                	params += "&xitem_field1_" + i + "=" + (availability[i-1]  === "true" || availability[i-1] ? "1" : "0");
	                }
	                if (isContactLenses) 
	                {
	                	params += "&comment_" + i + "=";
		                if (i === 1) {
		                	params += "right";
		                } else {
		                	params += "left";
		                }
	                }
	            }
	        } else {
                params += "&catEntryId=" + catEntry;
                params += "&quantity=" + quantity;
                if (typeof availability !== "undefined" && availability !== null) {
	                params += "&xitem_field1=" + (availability  === "true" || availability ? "1" : "0");
                }
                if (isContactLenses) {
                    params += "&comment=" + customParams["eye"];
                }
	        }
	        
            if (Array.isArray(customParams["attributeName"])) {
            	var attrNameArray = customParams["attributeName"];
            	var attrValueArray = customParams["attributeValue"];
                for (var j = 0; j < attrNameArray.length; j++) {
	                params += "&attributeName=" + attrNameArray[j];
                }
                for (var j = 0; j < attrValueArray.length; j++) {
	                params += "&attributeValue=" + attrValueArray[j];
                }
            }

            if (isContactLenses) {
	            var leftOrderItem = $("#left-item-in-cart").val();
	            var rightOrderItem = $("#right-item-in-cart").val();
	            if (leftOrderItem.indexOf("_") !== -1) {
	            	leftOrderItem = leftOrderItem.substring(0, leftOrderItem.indexOf("_"));
	            }
	            if (rightOrderItem.indexOf("_") !== -1) {
	            	rightOrderItem = rightOrderItem.substring(0, rightOrderItem.indexOf("_"));
	            }
	            if (leftOrderItem !== "" || rightOrderItem !== "") {
	            	/*
	            	var orderItemsToDelete = "";
	        		if(leftOrderItem !== "" && rightOrderItem !== ""){
	        			orderItemsToDelete = 'orderItemId_1=' + leftOrderItem + '&orderItemId_2=' + rightOrderItem;
	        		} else if (leftOrderItem !== "") {
	        			orderItemsToDelete = 'orderItemId=' + leftOrderItem;
	        		} else {
	        			orderItemsToDelete = 'orderItemId=' + rightOrderItem;
	        		}*/
	            	var orderItemsToDelete = [];
	            	if (leftOrderItem !== "") {
	            		orderItemsToDelete.push(leftOrderItem);
	            	}
	            	if (rightOrderItem !== "") {
	            		orderItemsToDelete.push(rightOrderItem);
	            	}
	            	this.DeleteItemFromCart(
            			orderItemsToDelete,
            			function(data) { productDisplayJS.addToCartRequest(params, successCallback); }
	            	);
	            } else {
	            	productDisplayJS.addToCartRequest(params, successCallback);
	            }
            } else {
            	productDisplayJS.addToCartRequest(params, successCallback);
            }
            
            var qtity = quantity;
            try {
            	if (Array.isArray(quantity)) {
            		qtity=0;
                	for(var i in quantity) { qtity += parseInt(quantity[i]); }
                }
            } catch (error) { 
            	qtity = 0;
            }
            
            if(fromCart)
            	utagFiller.asyncAddAccessoryToCartFromCart(catEntry);
            else
            	utagFiller.asyncAddToCartPDP(''+qtity, isContactLenses);
            
            if($('#wishlist-preview-modal').length > 0 && $('#wishlist-preview-modal').hasClass('show')){
            	$('#wishlist-preview-modal').modal('hide');
            }
            	
	    },
	    
	    addToCartRequest: function (params, successCallback) {
	    	if (typeof successCallback === "undefined" || successCallback === null) {
	    		successCallback = function(data) {miniCartJS.loadMiniCart();}
	    	}
	    	$.ajax( {
				url : getAbsoluteURL() + "AjaxRESTOrderItemAdd",
				type: "POST",
				data: params,
				dataType: 'html',
				async : true,
				success: function(data) {
					productDisplayJS.lockAdd = false;
					successCallback(data);
				},
				error: function(error) {
					productDisplayJS.lockAdd = false; 
					console.log("Error:" + error);
					
					setTimeout(function() { utagFiller.asyncSendError('Error in the backend addToCart flow', "Server", "AjaxRESTOrderItemAdd error"); }, 50);
					setTimeout(function() { jsLogger.severe("addToCartRequest", "Error in the backend addToCart flow (net error).", JSON.stringify(error)); }, 50);
				}
		    });
	    },
	    
	    prepopulatePrescription: function() {
	    	var leftItem = $("#left-item-in-cart").val(), leftpopulate = false;
	    	var rightItem = $("#right-item-in-cart").val(), rightpopulate =false;
	    	if (typeof leftItem !== "undefined" && leftItem !== null && leftItem !== "") {
	    		var leftItemArray = leftItem.split("_");
	    		if (leftItemArray.length < 3) {return}
	    		leftpopulate = true;
	    		
	    		selectTCHK("prescription-table_1");
	    		
	    		let leftItemObj = JSON.parse($('#left-item-in-cart-obj').val());
	    		$.each( leftItemObj, function( key, value ) {
	    			productDisplayJS.populateSelectInPrescription("left-" + key + "_1", value);
    			});	    		
	    		
	    		productDisplayJS.populateSelectInPrescription("left-boxes_single", parseFloat(leftItemArray[2]));
	    		productDisplayJS.populateSelectInPrescription("left-boxes_subs", parseFloat(leftItemArray[2]));
	    	}
	    	if (typeof rightItem !== "undefined" && rightItem !== null && rightItem !== "") {
	    		var rightItemArray = rightItem.split("_");
	    		if (rightItemArray.length < 3) {return}
	    		rightpopulate = true;
	    		
	    		selectTCHK("prescription-table_1");
	    		
	    		let rightItemObj = JSON.parse($('#right-item-in-cart-obj').val());
	    		$.each( rightItemObj, function( key, value ) {
	    			productDisplayJS.populateSelectInPrescription("right-" + key + "_1", value);
    			});	
	    		
	    		productDisplayJS.populateSelectInPrescription("right-boxes_single", parseFloat(rightItemArray[2]));
	    		productDisplayJS.populateSelectInPrescription("right-boxes_subs", parseFloat(rightItemArray[2]));
	    	}
	    	if (!leftpopulate && !rightpopulate && typeof $(".partial-price-wrapper.single .not-formatted-price").val() !== "undefined") {
	    		var boxNum = Math.min(Math.ceil(Math.ceil(60/parseFloat($(".partial-price-wrapper.single .not-formatted-price").val()))/2), 12);
	    		if($("#promoBadge").val() == '3+1'){
	    			boxNum = 2;
	    		}
	    		
	    		productDisplayJS.populateSelectInPrescription("right-boxes_single", boxNum);
	    		productDisplayJS.populateSelectInPrescription("left-boxes_single", boxNum);
	    		productDisplayJS.populateSelectInPrescription("right-boxes_subs", boxNum);
	    		productDisplayJS.populateSelectInPrescription("left-boxes_subs", boxNum);
	    		calculateTotal();
	    	}
	    	this.updateRefillTime();
	    },
	    
	    populateSelectInPrescription: function(selectId, value,triggerChange = true) {
	    	if(triggerChange){
	    		$("#" + selectId).val(value).trigger("change");
	    	}
	    	
    		$("#" + selectId + " + div").text(value);
    		$("#" + selectId + " + div + ul li[rel='" + value + "']").addClass("active");
	    },
	    
	    
	    updateRefillTime: function() {
	    	var minBoxes = 1;
	    		    	
	    	let typeOfPurchase = 'single';
			if(productDisplayJS.isSubsPurchase()){
				typeOfPurchase = 'subs';
			}
			
			let rightQnt = $("#right-boxes_" + typeOfPurchase).val();
	    	let leftQnt = $("#left-boxes_" + typeOfPurchase).val();
			
	    	if (rightQnt > 0 && leftQnt > 0) {
	    		minBoxes = Math.min(parseInt("0" + rightQnt), parseInt("0" + leftQnt));
	    	} else if (rightQnt > 0) {
	    		minBoxes = Math.max(parseInt("0" + rightQnt), 1);
	    	} else if (leftQnt > 0) {
	    		minBoxes = Math.max(parseInt("0" + leftQnt), 1);
	    	}
	    	var supplyDays = (minBoxes * parseInt("0" + $("#contact-lenses-supply").val()) / 30);
	    	if (supplyDays < 2) {
	    		selectedValue = "1|MON";
	    	} else if (supplyDays < 3) {
	    		selectedValue = "2|MON";
	    	} else if (supplyDays < 6) {
	    		selectedValue = "3|MON";
	    	} else if (supplyDays < 12) {
	    		selectedValue = "6|MON";
	    	} else {
	    		selectedValue = "12|MON";
	    	}
	    	$("#delivery-select").val(selectedValue).trigger("change");
	    	$("#delivery-select + div").html(    			
    			$("#delivery-select + div + ul li[rel='" + selectedValue + "']").text()
			);
	    	$("#delivery-select + div + ul li").removeClass("active");
	    	$("#delivery-select + div + ul li[rel='" + selectedValue + "']").addClass("active");
	    },
	    
	    DeleteItemFromMiniCart: function(orderItems) {
	    	this.DeleteItemFromCart(orderItems, function(){miniCartJS.initCartBadge();_closeCart();});
	    },
	    
	    DeleteItemFromCart: function(orderItems, successCallback) {
	    	if (!Array.isArray(orderItems)) {
	    		orderItems = orderItems.split("|");
	    	}
	    	var urlParams = "?storeId=" + this.storeId;
	    	urlParams += "&catalogId=" + this.catalogId;
	    	urlParams += "&langId=" + this.langId;
	    	urlParams += "&calculationUsage=-1,-2,-5,-6,-7";
	    	urlParams += "&authToken=" + encodeURI($("#csrf_authToken").val());
	    	
	    	var params = [];
	    	
	    	for(var i=1;i <= orderItems.length; i++) {
	    		params.push("orderItemId_" + i + "=" + orderItems[i-1]);
	    	}
	    	
	    	$.ajax( {
				url : getAbsoluteURL() + "AjaxRESTOrderItemDelete" + urlParams,
				type: "POST",
				data: params.join("&"),
				dataType: 'html',
				async : true,
				success: successCallback,
				error: function(error) {
					console.log("Error:" + error);
				}
		    });
	    },
	    
	    updateItemAvailability: function(itemId, quantity) {
	    	$("#sku_" + itemId).attr("data-available", quantity);
	    	productDisplayJS.refreshShippingDateCL();
	    },
	    
	    isSinglePurchase : function(){
	    	return $('#singlePurchase').hasClass('active');
	    },
	    
	    isSubsPurchase : function(){
	    	return $('#subsPurchase').hasClass('active');
	    },
	    
	    refreshShippingDateCL: function() {
	    	var prescriptionNumber = 1;
	    	var isPrescriptionComplete = false;
	    	let totalPackageQntRight = 0;
	    	let totalPackageQntLeft = 0;
	    	let selectedUPCRight = '';
	    	let selectedUPCLeft = '';
	    	let sameUPC = false;
	    	
    		let typeOfPurchase = 'single';
			if(productDisplayJS.isSubsPurchase()){
				typeOfPurchase = 'subs';
			}
	    	if($("#left-item_1").val() != ''){
	    		selectedUPCLeft = $("#left-item_1").val();
	    		totalPackageQntLeft = Number($("#left-boxes_"+ typeOfPurchase).val());
	    	}
	    	if($("#right-item_1").val() != ''){
	    		selectedUPCRight = $("#right-item_1").val();
	    		totalPackageQntRight = Number($("#right-boxes_"+ typeOfPurchase).val());
	    		sameUPC = selectedUPCLeft == selectedUPCRight;
	    		if(sameUPC){
	    			totalPackageQntRight += totalPackageQntLeft;
	    			totalPackageQntLeft = totalPackageQntRight;
	    		}	    		
	    	}
	    	
	    	
        	if (totalPackageQntRight > 0) {        		
        		var rightItem = $("#right-item_" + prescriptionNumber).val().replace("sku_","");
        		if(rightItem){
        			isPrescriptionComplete = true;
        		}
        		
        		let upc = $("#right-item_" + prescriptionNumber).data("partnumber");
        		
        		if(upc){
        			let previousQnt =  Number($("#sku_" + rightItem).attr('data-qnt'));        			
        			let lensPerBox =  Number($("#product-lensperbox").val());
	        		let totalLenses = totalPackageQntRight * lensPerBox;
        			if(!$("#sku_" + rightItem).attr('data-oneday') || previousQnt != totalLenses ){
        				let unitPrice = Number($("#product-unitprice").val());
    	        		let totalPrice = unitPrice * totalPackageQntRight;
    	        		
    	        		productDisplayJS.checkStockInfo(rightItem,'right',upc,totalPrice,totalLenses);
        			}else {
            			let rightCLDeliveryDate = $("#sku_" + rightItem).attr('data-oneday');
    	    			$('#right-item_1').attr('data-delivery',rightCLDeliveryDate);
    	    			if(sameUPC){
    	    			    $('#left-item_1').attr('data-delivery',rightCLDeliveryDate);
    	    			}
    	    			
        				productDisplayJS.updateDeliveryDateInfo();	       			
            		}
        		}
        		
        	}

        	if (totalPackageQntLeft > 0) {
        		var leftItem = $("#left-item_" + prescriptionNumber).val().replace("sku_","");
        		
        		isPrescriptionComplete = isPrescriptionComplete && leftItem;
        		
        		let upc = $("#sku_" + leftItem).data("partnumber");
        		
        		if(upc && !sameUPC){
        			let previousQnt =  Number($("#sku_" + leftItem).attr('data-qnt'));	
        			let lensPerBox = Number($("#product-lensperbox").val());
	        		let totalLenses = totalPackageQntLeft * lensPerBox;
        			if(!$("#sku_" + leftItem).attr('data-oneday') || previousQnt != totalLenses ){
        				let unitPrice = Number($("#product-unitprice").val());
    	        		let totalPrice = unitPrice * totalPackageQntLeft;
    	        		
    	        		productDisplayJS.checkStockInfo(leftItem,'left',upc,totalPrice,totalLenses);
        			}else {
        				let leftCLDeliveryDate = $("#sku_" + leftItem).attr('data-oneday');
    	    			$('#left-item_1').attr('data-delivery',leftCLDeliveryDate);
    	    			
        				productDisplayJS.updateDeliveryDateInfo();	       			
            		}
        		}
        	
        	}
	    },
	    
	    updateCLPricePromotion: function(promoType,updateQuantity) {
	    	var priceString = "€ ";
	    	
		    if(!productDisplayJS.isSubsPurchase())
		    {
		    	if(promoType == '3+1'){
		    		priceString += $("#price3piu1").val();
		    		$("#CLPrice").html(priceString);
		    		//$('.partial-price-wrapper input[name="analyticsPDPSinglePrice"]').val(priceString);
		    		$("#CLPriceOld").removeClass("d-none");
		    		$("#singlePurchase .discount-badge").html('-25%');
		    		$("#singlePurchase .discount-badge").removeClass("d-none");
		    		if(updateQuantity){
			    		productDisplayJS.populateSelectInPrescription('right-boxes_single',2);
			    		productDisplayJS.populateSelectInPrescription('left-boxes_single',2);
		    		}
		    	}else if(promoType == 'reset'){
	    			//$("#promoRadio5piu3").prop("checked", false);
	    			//$("#promoRadio3piu1").prop("checked", false);
	    			let promoCustomAvailable = $('#promoCustomAvailable').val();
	    			if(promoCustomAvailable == 'true'){
	    			    $('#singlePurchase').addClass("promo-active");
	    			    priceString += $("#priceCustom").val();
	    			    $("#CLPrice").html(priceString);
	    			    $("#CLPriceOld").removeClass("d-none");
	    			    let percDiscountCL = $("#promoCustomDiscountPercentage").val();
	    			    $("#singlePurchase .discount-badge").html('-'+ percDiscountCL + '%');
                        $("#singlePurchase .discount-badge").removeClass("d-none");
	    			}else {
	    			    $("#CLPrice").html($("#priceStandard").val());
                        $("#CLPrice").removeClass("d-none");
                        $("#CLPriceOld").addClass("d-none");
                        $("#singlePurchase .discount-badge").addClass("d-none");
	    			}
		    	}
		    }
	    },
	    
	    initCLPricePromotion: function() {
	    	var promo3piu1Avail = $("#promo3piu1Available").val();
	    	var promo5piu3Avail = $("#promo5piu3Available").val();
	    	if(promo5piu3Avail == 'true'){
	    		$("#promoRadio5piu3").prop("checked", true);
	    		productDisplayJS.updateCLPricePromotion('5+3',true);
	    	}else if(promo3piu1Avail == 'true'){
	    		$("#promoRadio3piu1").prop("checked", true);
	    		productDisplayJS.updateCLPricePromotion('3+1',true);
	    	}
	    },
	    
	    validatePromotionApplication: function(quantity) {
	    	var promo3piu1Avail = $("#promo3piu1Available").val();
	    	var promo5piu3Avail = $("#promo5piu3Available").val();
	    	
	    	var typeOfPurchase = 'single';
		    var purchaseType = $('#singlePurchase');
		    if(productDisplayJS.isSubsPurchase())
		    {
		    	typeOfPurchase = 'subs';
		    	purchaseType = $('#subsPurchase');
		    }
	    	
	    	if(promo5piu3Avail == 'true' && promo3piu1Avail == 'true'){
	    		if(quantity > 7){
	    			// promo5+3 should be checked and price updated
	    			$(purchaseType).addClass("promo-active");
		    		productDisplayJS.updateCLPricePromotion('5+3',false);
	    		}else if(quantity > 3){
	    			// promo3+1 should be checked and price updated
	    			$(purchaseType).addClass("promo-active");
		    		productDisplayJS.updateCLPricePromotion('3+1',false);
	    		}else {
	    			// both radio should be unchecked and price should be standard price
	    			$(purchaseType).removeClass("promo-active");
	    			productDisplayJS.updateCLPricePromotion('reset',false);
	    		}
	    	}else if(promo5piu3Avail == 'true'){
	    		if(quantity > 7){
	    			// promo5+3 should be checked and price updated
	    			$(purchaseType).addClass("promo-active");
		    		productDisplayJS.updateCLPricePromotion('5+3',false);
	    		}else {
	    			$(purchaseType).removeClass("promo-active");
	    			// both radio should be unchecked and price should be standard price
	    			productDisplayJS.updateCLPricePromotion('reset',false);
	    		}
	    	}else if(promo3piu1Avail == 'true'){
	    		if(quantity > 3){
	    			// promo3+1 should be checked and price updated
	    			$(purchaseType).addClass("promo-active");
		    		productDisplayJS.updateCLPricePromotion('3+1',false);
	    		}else {
	    			// both radio should be unchecked and price should be standard price
	    			$(purchaseType).removeClass("promo-active");
	    			productDisplayJS.updateCLPricePromotion('reset',false);
	    		}
	    	}else {
	    		$(purchaseType).removeClass("promo-active");
	    		// both radio should be unchecked and price should be standard price
	    		productDisplayJS.updateCLPricePromotion('reset',false);
	    	}
	    	
	    },
	    
	    updatePriceAccessories: function(catentryId) {
	        if($("#currentAccPrice_"+catentryId).length > 0){
	    	    var newQuantity = parseInt($("#acc-quantity-select").val());
	    	    var pricePerUnit = parseInt($("#currentAccPrice_"+catentryId).val());
                let totalPriceValue = Number(newQuantity * pricePerUnit);
                var totalPrice = totalPriceValue.toFixed(2).replace('.', ',');
                $("#offerPrice_"+catentryId).html("&euro; "+totalPrice);
                let upc = $("#product-model-hidden").val();
                productDisplayJS.checkStockInfoAccessories(upc,totalPriceValue,newQuantity);
	    	}
	    },
	    
	    // compare delivery date in dd-MM-yyyy format
	    compareDeliveryDate: function (d1String, d2String){
	    	let d1Array = d1String.split('-');
	    	let d2Array = d2String.split('-');
	    	if(d1Array.length == 3 && d2Array.length == 3){
	    		let d1Date = new Date(d1Array[2] + '-' + d1Array[1] + '-' + d1Array[0]);
	    		let d2Date = new Date(d2Array[2] + '-' + d2Array[1] + '-' + d2Array[0]);
	    		if(d1Date.getTime() > d2Date.getTime()){
	    			return 1;
	    		}else if(d1Date.getTime() < d2Date.getTime()){
	    			return -1;
	    		}else {
	    			return 0;
	    		}
	    	}
	    	return null;
	    },
	    
	    checkStockInfo: function(selectorId, side, upc, price, lensQuantity){
	    	getRealTimeStock(upc,price,lensQuantity).then((data) => {
	    		if(data.validResponse){
	    		    if($('#sku_' + selectorId).length == 0){
	    		        let prodId = $('#productId').val();
	    		        $('#product_' + prodId).append('<input type="hidden" id="sku_' + selectorId +'" />');
	    		    }
	    			$('#sku_' + selectorId).attr('data-oneday',data.deliveryDateFormatted);
	    			$('#sku_' + selectorId).attr('data-qnt',lensQuantity);

	    			if(side == 'right'){
	    				$('#right-item_1').attr('data-delivery',data.deliveryDateFormatted);
	    			}
	    			let sameUPC = $("#right-item_1").val() == $("#left-item_1").val();
	    			if(side == 'left' || sameUPC){
	    				$('#left-item_1').attr('data-delivery',data.deliveryDateFormatted);
	    			}
	    			if(data.deliveryDateFormatted != '3-5 giorni'){
	    				productDisplayJS.updateDeliveryDateInfo();	  
	    			}
	    		}else {
	    			console.log('Error response for upc: ' + upc + ', price:' + price + ', lensQuantity:' + lensQuantity);
	    		}
	    	});
	    },
	    
	    checkStockInfoAccessories: function(upc, price, accQuantity){
	    	getRealTimeStock(upc,price,accQuantity).then((data) => {
	    		if(data.validResponse){	    	    			
	    			$("#shipping-date").text(data.deliveryDateFormatted);
	    			$('#expectedDeliveryDate-' + upc).val(data.deliveryDateFormatted);
	    		}else {
	    			console.log('Error response for upc: ' + upc + ', price:' + price + ', lensQuantity:' + accQuantity);
	    		}
	    	});
	    },
	    
	    updateDeliveryDateInfo: function(){
			let leftDeliveryDate = $('#left-item_1').attr('data-delivery');
			let rightDeliveryDate = $('#right-item_1').attr('data-delivery');
			
			let updatedDate = $('#expectedDeliveryDateCL').val();
			if(leftDeliveryDate && rightDeliveryDate){
				updatedDate = productDisplayJS.compareDeliveryDate(leftDeliveryDate,rightDeliveryDate) < 0 ? rightDeliveryDate : leftDeliveryDate;
				
			}else if(leftDeliveryDate){
				updatedDate = leftDeliveryDate;
			}else if(rightDeliveryDate){
				updatedDate = rightDeliveryDate;
			}
			
			$("#shipping-date").text(updatedDate);
			$('#expectedDeliveryDateCL').val(updatedDate);
			
	    },
	    
	    selectAccessoryAddToCart : function (productId){
	    	if($("div[data-accessory-atc='" + productId + "']").hasClass('active')){
	    		$("div[data-accessory-atc='" + productId + "']").removeClass('active');
	    		$("#priceAccRecommPrice").val("0");
	    	} else {
	    		$("div[data-accessory-atc]").removeClass('active');
	    		$("div[data-accessory-atc='" + productId + "']").addClass('active');
	    		let priceAcc = $("div[data-accessory-atc='" + productId + "']").attr("data-accessory-atc-price");
	    		$("#priceAccRecommPrice").val(priceAcc);
	    	}
	    	calculateTotal();
	    },
	    
	    resetAccessoryAddToCart : function() {
	    	$("div[data-accessory-atc]").removeClass('active');
	    	$("#priceAccRecommPrice").val("0");
	    	calculateTotal();
	    },
	    
	    selectFrameSectionProduct(sku){
	    	if($('#checkTag-' + sku).hasClass('selected')){
	    		$('#checkTag-' + sku).removeClass('selected');
	    	}else {
	    		$('#checkTag-' + sku).addClass('selected');
	    	}
	    },
	    
	    updateFrameSectionProduct(sku){	    	
	    	if($('#checkTag-' + sku).hasClass('selected')){
	    		TABUtilJS.removeFromSelection(sku);
	    	}else {
	    		if(TABUtilJS.isSelectionAvailable()){
	    			TABUtilJS.addToSelection(sku);
	    		}
	    	}
	    },
	    
	    checkPrescriptionValid(side,callback){
	    	let paramsArray = [];
	    	
	    	paramsArray.push('langId=-4');
	    	let productId = $('#productId').val();
	    	paramsArray.push('productId=' + productId);
	    	
	    	if($('#'+ side + '-color_1').val()){
	    		let tintColor = encodeURIComponent($('#'+ side + '-color_1').val());
	    		paramsArray.push('tintColor=' + tintColor);
	    	}else {
	    		paramsArray.push('tintColor=');
	    	}
	    	if($('#'+ side + '-power_1').val()){
	    		let spherePower = encodeURIComponent($('#'+ side + '-power_1').val());
	    		paramsArray.push('spherePower=' + spherePower);
	    	}else {
	    		paramsArray.push('spherePower=');
	    	}
	    	if($('#'+ side + '-bc_1').val()){
	    		let baseCurve = encodeURIComponent($('#'+ side + '-bc_1').val());
	    		paramsArray.push('baseCurve=' + baseCurve);
	    	}else {
	    		paramsArray.push('baseCurve=');
	    	}
	    	if($('#'+ side + '-dia_1').val()){
	    		let diameter = encodeURIComponent($('#'+ side + '-dia_1').val());
	    		paramsArray.push('diameter=' + diameter);
	    	}else {
	    		paramsArray.push('diameter=');
	    	}
	    	if($('#'+ side + '-cyl_1').val()){
	    		let cylinder = encodeURIComponent($('#'+ side + '-cyl_1').val());
	    		paramsArray.push('cylinder=' + cylinder);
	    	}else {
	    		paramsArray.push('cylinder=');
	    	}
	    	if($('#'+ side + '-axis_1').val()){
	    		let axis = encodeURIComponent($('#'+ side + '-axis_1').val());
	    		let splitAxis = axis.split('.');
	    		paramsArray.push('axis=' + splitAxis[0]);
	    	}else {
	    		paramsArray.push('axis=');
	    	}
	    	if($('#'+ side + '-add_1').val()){
	    	    let splittedAddPower = $('#'+ side + '-add_1').val().trim().split(' ');
	    		let addPower = encodeURIComponent(splittedAddPower[0]);
	    		if(splittedAddPower.length > 1){
	    		    let other = splittedAddPower[1];
	    		    if(other == 'D'){
	    		        paramsArray.push('other=DISTANCE');
	    		    }else if(other == 'N'){
	    		        paramsArray.push('other=NEAR');
	    		    }
	    		}else {
	    		    paramsArray.push('other=');
	    		}
	    		paramsArray.push('addPower=' + addPower);
	    	}else {
	    		paramsArray.push('addPower=');
	    		paramsArray.push('other=');
	    	}

	    	
	    	let params = paramsArray.join('&');
	    	
	    	if(typeof callback == 'undefined'){
	    		callback = function(data) {
					let dataObj = cartJS.toJson(data);
					console.log(data);
				};
	    	}
	    	
	    	$.ajax( {
				url : "PrescriptionValidator",
			      data: params,
			      type: "POST",
				success: callback,
				error: function(error) {
					
					console.log("Error:" + error);
					
					setTimeout(function() { utagFiller.asyncSendError('Error in the backend addToCart flow', "Server", "checkPrescriptionValid error"); }, 50);
					setTimeout(function() { jsLogger.severe("checkPrescriptionValid", "Error in the backend addToCart flow (net error).", JSON.stringify(error)); }, 50);
				}
		    });
	    },
	    
	    validateResponsePrescription: function (side, data){
	    	let valid = true;
	    	
	    	if(data.tintColor != '' && $('#'+ side + '-color_1').val() != data.tintColor){
	    		valid = false;
	    	}
	    	if(data.spherePower != '' && $('#'+ side + '-power_1').val() != data.spherePower){
	    		valid = false;
	    	}
	    	if(data.addPower != ''){
                let addPowerCheck = data.addPower;
                if(data.other != ''){
                    if(data.other == 'DISTANCE'){
                        addPowerCheck += ' D';
                    }else if(data.other == 'NEAR'){
                        addPowerCheck += ' N';
                    }
                }
                if($('#'+ side + '-add_1').val() != addPowerCheck){
                    valid = false;
                }
            }

	    	if($('#'+ side + '-axis_1').val()){
	    	    let splitAxis = $('#'+ side + '-axis_1').val().split('.');
	    	    if(data.axis != '' && splitAxis[0] != data.axis){
                    valid = false;
                }
	    	}

	    	if(data.cylinder != '' && $('#'+ side + '-cyl_1').val() != data.cylinder){
	    		valid = false;
	    	}
	    	if(data.diameter != '' && $('#'+ side + '-dia_1').val() != data.diameter){
	    		valid = false;
	    	}
	    	if(data.baseCurve != '' && $('#'+ side + '-bc_1').val() != data.baseCurve){
	    		valid = false;
	    	}
	    	return valid;
	    },
	    
	    changeStatusAddToCartBtn: function(enable){
	    	let addToCartBtn = $('.shopperActions-wrapper #add2CartBtn');
	    	if(enable){
	    		disableSpinner(addToCartBtn);
	    	}else {
	    		spinnerFunc(addToCartBtn);
	    	}
	    }	    

};
