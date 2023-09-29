/*jslint forin: true, sloppy: true, unparam: true, vars: true, white: true */
/*global window, document, jQuery, log */

var opsm = window.opsm || {};

(function(window, document, $, opsm) {

	opsm.product = (function () {

		var addContactLensesButton = $("#add-to-cart-pdp");

		var deleteFromCartRX = function(frameOrderItemId, lensOrderItemId) {
			/* currently deleting just the frame would be enough
			 * since server-side-controller removes both
			 */
			return Promise.all(
				[opsm.cart.deleteFromCart(frameOrderItemId),
				opsm.cart.deleteFromCart(lensOrderItemId)]
			);
		}
		
		var addToCartRX = function(frameCatEntryId, lensCatEntryId) {
			return addToCartRxPair({frameCatentryId: frameCatEntryId, lensCatentryId: lensCatEntryId})
		};
		
		var addToCart = function (ev, catEntryId, el, qty) {
			var quantity = 1;
			if ($("#quantity").length > 0) {
				quantity = $("#quantity").val();
			}
			if (typeof qty !== "undefined" && el !== null && !isNan(qty)) {
				quantity = parseInt(qty);
			}
			if (typeof catEntryId === "undefined" || catEntryId === null) {
				catEntryId = $("#fit-size-select button.isCurrent").val();
			}
			var paramArray = [];
			paramArray.push("storeId=" + $('#storeId').val());
			paramArray.push("catalogId=" + $("#catalogId").val());
			paramArray.push("langId=" + $('#langId').val());
			paramArray.push("orderId=.");
			paramArray.push("calculationUsage=-1,-2,-3,-4,-5,-6,-7");
			paramArray.push("keepAutoAddedOrderItemsBeforeCalculate=true");
			paramArray.push("catEntryId=" + catEntryId);
			paramArray.push("quantity=" + quantity);
			paramArray.push("calculateOrder=1");
			return _addToCart(catEntryId, paramArray.join("&"), el);
		};
		
		var _addToCart = function (catEntryId, param, el) {
			var url ="AjaxOrderChangeServiceItemAdd";
			  return $.ajax({
			    url: url,
			    type: "POST",
			    dataType: 'json',
			    data: param,
			    startTime: performance.now(),
			    complete: function (complete, status) {
			    	/* OPSMD-4639 */
			    	var time = performance.now() - this.startTime;
			    	//Convert milliseconds to seconds.
			        var seconds = time / 1000;
			        if (seconds > 10) {
			        	utagFiller.asyncSendErrorEvolvedDetails('Add to cart over 10sec', '', 'Client', 'AddtoCart');
			        }
			    },
			    success: function (responseData) {
			    	if($('body.pg-product-detail').length){
			    		/* OPSMD-4639 */
			    		let isAddToCartSuccess = true;
			    		if(responseData.errorCode || responseData.errorMessage || responseData.errorMessageKey){
			    			isAddToCartSuccess = false;
			    			utagFiller.asyncSendErrorEvolvedDetails('Unable to add product in the cart', '', 'Client', 'AddtoCart');

			    			if(String(responseData.errorCode).indexOf('_ITEM_ADD_FORB')!=-1
			    					&& String(responseData.errorMessageKey).indexOf('_ITEMS_IN_CART')!=-1) {
			    				var showMsg = "Oops! Cannot add to cart, as you can have a complete pair only within an order. Please amend your cart to proceed.";

			    				if(responseData.errorMessageParam && responseData.errorMessageParam.length){
			    					if(String(responseData.errorMessageParam[0]).indexOf('Electronics-cart-has-others')!=-1) {
			    						showMsg = "Oops! Cannot add to cart, as you cannot purchase an Electronics item in conjunction with a non Electronic item. Please amend your cart to proceed.";
			    					} else if (String(responseData.errorMessageParam[0]).indexOf('Electronics-cart-has-electr')!=-1 ) {
			    						showMsg = "Oops! Cannot add to cart, as you cannot purchase an Electronics item in conjunction with a non Electronic item. Please amend your cart to proceed.";
			    					} else if (String(responseData.errorMessageParam[0]).indexOf('Electronics-many')!=-1 ) {
			    						showMsg = "Oops! Cannot add to cart, as you can only have one Electronics item within an order. Please amend your cart to proceed.";
			    					}
			    				}
			    				opsm.utils.showAlertError(showMsg);
			    			}
			    		} else {
			    			//remove item from fav list
			    			if (typeof el !== "undefined" && el !== null) {
			    				removeFavItem(el, catEntryId, $('#storeId').val());
			    			}
			    			//Product.addToCart(1, ev);
			    			//updateMiniCartOnPageLoad(true);

			    			/* TODO WHAT SHOULD DO AFTER ADD?!?*/
			    			//$(".product--add-to-cart-btn").attr("disabled", "disabled");

//			    			utagFiller.asyncAddToCartPDPParams(el);

			    			var viewCartFirstCookie = $.cookie('viewCartFirst_' + $('#storeId').val());
//			    			// utag_data not defined
//			    			if (viewCartFirstCookie == null || viewCartFirstCookie == '') {
//			    			callAnalyticsForCartClick('prop2,events,products,eVar38,prop24,eVar35', 'scOpen,scAdd', $("#catNameAnalytics").val() + ';' + $("#pdpArticleNumberAnalytics").val() + ';;;;eVar32=' + $("#fit-size-select button.isCurrent").val(), '', '', '', '', '', '', '', 'o', 'Cart|Cart Add', utag_data.pageName, utag_data.pageName, responseData.orderId);
//			    			} else {
//			    			callAnalyticsForCartClick('prop2,events,products,prop24', 'scAdd', $("#catNameAnalytics").val() + ';' + $("#pdpArticleNumberAnalytics").val() + ';;;;eVar32=' + $("#fit-size-select button.isCurrent").val(), '', '', '', '', '', '', '', 'o', 'Cart|Cart Add', utag_data.pageName, '', '');
//			    			}

			    			//GTM removal
			    			/*
			    			if(typeof dataLayer != undefined && dataLayer != null && 'function' == typeof dataLayer.push) {
						        gtmAddToCart(
						          $('#modelName').val(),
						          $('#pdpArticleNumberAnalytics').val(),
						          $('#displayPriceString').val(),
						          $('#manufacturerName').val(),
						          $('#catNameAnalytics').val(),
						          $('#colorAttr').val(),
						          //parseInt($('#qty_' + $(".product--select-size select").val()).html()),
						          1,
						          $('#localeCurrency').val()
						        );
						      }
			    			 */

			    			var viewCartFirstCookieRenew = $.cookie('viewCartFirst_' + $('#storeId').val());
			    			if (viewCartFirstCookieRenew == null || viewCartFirstCookieRenew === '') {
			    				$.cookie('viewCartFirst_' + $('#storeId').val(), 'true', {path: '/'});
			    			}
			    			AjaxOverlay.show();
			    			window.location.href = $('#btn-cart').attr('href');
			    		}
			    	}
			    	

			    },
			    error: function (xhr, ajaxOptions, thrownError) {
			      var ajax_details = [xhr, ajaxOptions, thrownError];
			      $("#opsm-generic-error-modal").modal({backdrop: 'static'});
			      utagFiller.asyncSendErrorEvolvedDetails('Add to cart no response', thrownError, 'Server', 'AddtoCart');
			    }
			  });
			};

		var removeFavItem = function(el, catentryId, storeId) {
			if (typeof el !== 'undefined' && el != null) {
				var urlToCall = 'InterestItemDelete?catEntryId=' + catentryId + '&URL=YourFavouritesDisplay&storeId=' + storeId;

				$.ajax({
				    url: urlToCall,
				    type: "GET",
				    success: function (responseData) {
				    	//if last item of a type remove the entire section
				    	if ($(el).closest('.product-frame').parent().children('.product-frame').length == 1) {
				    		$(el).closest('.product-frame').parent().remove();
				    	} else {
				    		$(el).closest('.product-frame').remove();
				    	}
				    },
				    error: function (xhr, ajaxOptions, thrownError) {
				    }
				});

			}
		}

		var multipleContactsFlag = false;

		var productMainArea = $(".main-container");
		/*
		var cartButton = $(".pdp .product-main .add-cart");

		var slider;

		var sliderNav = $(".pdp .product-picture .views ul a");

		var stylesBox = $(".pdp .product-picture .styles");

		var shareBox = $(".pdp .share-with-friend");

		var navScrollTimeout, winResizeTimeout, nav, scrollPort;

		var setViewport = function(){
			nav = $(".nav");
			scrollPort = nav.find("ul");
		};

		var showHideShadows = function() {
			var navWidth = 0;
			var viewportSize = $('.nav ul').width();

			nav.find("li").each(function(){
				navWidth += $(this).outerWidth(true);
			});

			//console.log(navWidth);

			if (navWidth <= viewportSize) {
				nav.removeClass("nav-scroll-left nav-scroll-right");
			} else if (scrollPort.scrollLeft() === 0) {
				nav.addClass("nav-scroll-right").removeClass("nav-scroll-left");
			} else if (viewportSize + scrollPort.scrollLeft() >= navWidth) {
				nav.addClass("nav-scroll-left").removeClass("nav-scroll-right");
			} else {
				nav.addClass("nav-scroll-left nav-scroll-right");
			}
		};

		*/
		var isCL = function() {
			return Boolean($(".product--prescription").length);
		}
		/*
		var initCarousel = function() {


			var docWidth = $(document).width(), highlightedSwatch = $("#hdnHighlightedSwatch").val(), viewportImgCount, startSlide;
			switch(true){
			  case ( docWidth < 448):
			    viewportImgCount = 2;
			    break;
			  case (docWidth >= 448 && docWidth < 566):
			    viewportImgCount = 3;
			    break;
			  case (docWidth >= 566 && docWidth < 768):
			    viewportImgCount = 4;
			     break;
			  case (docWidth >= 768 && docWidth < 900):
			    viewportImgCount = 3;
			    break;
			  default:
			    viewportImgCount = 4;
			    break;
			}

			startSlide = Math.abs(Math.ceil((highlightedSwatch-viewportImgCount)/viewportImgCount));


			$('.swatchSlider').bxSlider({
		        slideWidth: 129,
		        slideSelector: 'div',
		        infiniteLoop: false,
		        hideControlOnEnd: true,
		        startSlide: startSlide,
		        minSlides: 2,
		        maxSlides: 4,
		        slideMargin: 5
		    });

			$(".swatchSlider").css("height","auto");
			$(".swatchSlider img").css("visibility","visible");

			setViewport();
			showHideShadows();
			scrollPort.on("scroll", function() {
				//console.log('Scrolling');
				clearTimeout(navScrollTimeout);
				navScrollTimeout = setTimeout(showHideShadows, 50);
			});

		}; */

		var addContactLensesToCart = function(catEntryId, form, ev) {

					var catalogId = $("#catalogId").val();
					var lensEyeAdded = "";
					var subflag = false;
					var leftPrescription = {};
					var rightPrescription = {};
					
					// Check for subscription selected
					if($("#lens-preview-toggler").is(":checked") || $("#subscribe-now").is(":checked")){
						subflag = true;
					}
					if($('#is-existing-cartitem-recurring').val() == "true"){// if the PDP loads with a subscription item in cart
						subflag = true;
					}
					
					if ($("#left-power").length > 0 && $("#right-power").length > 0) {
						var power_left = $("#left-power").val(), power_right = $("#right-power").val();
						rightPrescription["right_Power"] = power_right;
						leftPrescription["left_Power"] = power_left;
					}

					//Select Boxes of BC(Base Curve)
					var bc_right = $('#right-bc'),
						bc_left = $('#left-bc');

					if(bc_right.length != 0 && bc_left.length != 0) {
						var bc_right_val = bc_right.val(), bc_left_val = bc_left.val();
						rightPrescription["right_BC"] = bc_right_val;
						leftPrescription["left_BC"] = bc_left_val;
					}

					// Select boxes for dia
					var dia_right = $('#right-dia'),
						dia_left = $('#left-dia');

					if(dia_right.length != 0 && dia_left.length != 0) {
						var dia_right_val = dia_right.val(), dia_left_val = dia_left.val();
						rightPrescription["right_DIA"] = dia_right_val;
						leftPrescription["left_DIA"] = dia_left_val;
					}

					var cyl_right = $('#right-cyl'),
						cyl_left = $('#left-cyl');

					if(cyl_right.length != 0 && cyl_left.length != 0) {
						var cyl_right_val = cyl_right.val(), cyl_left_val = cyl_left.val();
						rightPrescription["right_CylPower"] = cyl_right_val;
						leftPrescription["left_CylPower"] = cyl_left_val;
					}

					var axis_right = $('#right-axis'),
						axis_left = $('#left-axis');

					if(axis_right.length != 0 && axis_left.length != 0) {
						var axis_right_val = axis_right.val(), axis_left_val = axis_left.val();
						rightPrescription["right_AXIS"] = axis_right_val;
						leftPrescription["left_AXIS"] = axis_left_val;
					}

					var add_right = $('#right-add'),
						add_left = $('#left-add');

					if(add_right.length != 0 && add_left.length != 0) {
						var add_right_val = add_right.val(), add_left_val = add_left.val();
						rightPrescription["right_ADD"] = add_right_val;
						leftPrescription["left_ADD"] = add_left_val;
					}

					var color_right = $('#right-color'),
					color_left = $('#left-color');

					if(color_right.length != 0 && color_left.length != 0) {
						var color_right_val = color_right.val(), color_left_val = color_left.val();
						rightPrescription["right_Color"] = color_right_val;
						leftPrescription["left_Color"] = color_left_val;
					}

					var itemType = $('#itemType').val();

					//var e = $($(divid).parent().next()).css('display'),
					var param = "storeId=" + $('#storeId').val() + "&catalogId=" + catalogId + "&langId=" + $('#langId').val()
						+ "&orderId=." + "&calculationUsage=-1,-2,-3,-4,-5,-6,-7" +"&keepAutoAddedOrderItemsBeforeCalculate=true"
						+ "&inventoryValidation=true" + "&catEntryId=" + catEntryId;
					
					param += "&calculateOrder=1";

					var totalQty =0 ;

					var boxes_left = $("#left-boxes").val(),
						boxes_right = $("#right-boxes").val();

					if (boxes_left > 0) {
						totalQty = totalQty + parseInt(boxes_left);
						if (boxes_right > 0) {
							lensEyeAdded = "both";
							totalQty = totalQty + parseInt(boxes_right);
						} else {
							boxes_right = 0;
							lensEyeAdded = "left";
						}
					} else {
						boxes_left = 0;
						lensEyeAdded = "right";
						totalQty = totalQty + parseInt(boxes_right);
					}
					param = param + "&left_Quantity=" + boxes_left + "&right_Quantity=" + boxes_right;

					param = param + "&quantity=" + totalQty;
					// Time

					var monthYearExpiryArray = $(".product--prescription .prescription--step-1 #expiry-date").val().split("/");
					if (monthYearExpiryArray.length === 2) {
						var month = monthYearExpiryArray[0];
						var year = monthYearExpiryArray[1];
						param = param + "&pres_end_month=" + month + "&pres_end_year=" + year;
					}
					var monthYearStartArray = $(".product--prescription .prescription--step-1 #start-date").val().split("/");
					if (monthYearStartArray.length === 2) {
						var month = monthYearStartArray[0];
						var year = monthYearStartArray[1];
						param = param + "&pres_start_month=" + month + "&pres_start_year=" + year;
						/* OPSMD-7789 add +12 month if expire date not provided*/
						try {
							if (monthYearExpiryArray.length === 1) {
								var expiryDate = new Date(parseInt(year)+1, parseInt(month)-1, 15); //mid of month
								var monthExp = ("0" + (expiryDate.getMonth() +1 )).slice(-2);
								param = param + "&pres_end_month=" + monthExp + "&pres_end_year=" + expiryDate.getFullYear();
							}
						} catch (e){console.error("Expiry date not set", e);}
					}
					param = param + "&subFlag="+ subflag + "&itemType="+itemType;

					if(document.getElementById("errorMessageCL") != null){
						document.getElementById("errorMessageCL").style.display = "none";
					}
					var parentCatentryId = $('#parentCatentryIdforLens').val();
					if(parentCatentryId != "") {
						param = param + "&parentCatentryId="+ parentCatentryId;
					}

					var genericSKUPartNumber = $('#genericSKUPartNumber').val();
					if(genericSKUPartNumber != "") {
						param = param + "&genericSKUPartNumber="+ genericSKUPartNumber;
					}

					if ($("#lens-preview-toggler").is(":checked") || $("#subscribe-now").is(":checked")) {
						param = param + "&isRecurringOrderItem=true&orderType=IS";
						if($("#freq-selection").val()){
							param = param + "&selected_freq=" + $("#freq-selection").val()
						}
					} else {
						param = param + "&isRecurringOrderItem=false&orderType=ST";
					}

					/* OPSMD-2811 */
					if( $('#prescription-valid').is(':checked')){
			    		 //params.isPrescriptionVerified = "true";
						param = param + "&isPrescriptionValidated=true";
			    	} else {
			    		 //params.isPrescriptionVerified = "false";
			    		 param = param + "&isPrescriptionValidated=false";
			    	}
					
					var skipLeft = false;
					var paramLeft = "";
					//iterate and if some value is null, skip this eye
					for (let k in  leftPrescription) {
						skipLeft = skipLeft || leftPrescription[k]==null;
						paramLeft += "&" + [k, leftPrescription[k]].join('=');
					};
					var skipRight = false;
					var paramRight = "";
					//iterate and if some value is null, skip this eye
					//for (const value of map1.values()) {
					for (let key in  rightPrescription) {
						skipRight = skipRight || rightPrescription[key]==null;
						paramRight += "&" + [key, rightPrescription[key]].join('=');
					};
					
					if(!skipLeft){
						param = param + paramLeft;
					}
					if(!skipRight){
						param = param + paramRight;
					}
					
					/* END */

					$.ajax({
						url: "AjaxOrderItemAdd",
						type: "POST",
						dataType: 'json',
						data: param,
						startTime: performance.now(),
					    complete: function (complete, status) {
					    	/* OPSMD-4639 */
					    	var time = performance.now() - this.startTime;
					    	//Convert milliseconds to seconds.
					        var seconds = time / 1000;
					        if (seconds > 10) {
					        	utagFiller.asyncSendErrorEvolvedDetails('Add to cart over 10sec', '', 'Client', 'AddtoCart');
					        }
					    },
						success: function (responseData) {
							/* OPSMD-4639 */
							var openCart = true;
							if (responseData.errorMessageParam && typeof responseData.errorMessageParam !== "undefined" 
								&& responseData.errorMessageParam.length > 0
									&& responseData.errorMessageParam[0] === "SAME_EYE_COMBINATION_EXISTS") {
								openCart = false;
								let showMsg = "Oops! Cannot add to cart, as you can only have one contact lens type per eye within an order. Please amend your cart to proceed.";
								opsm.utils.showAlertError(showMsg);
								utagFiller.asyncSendErrorEvolvedDetails('Unable to add product in the cart', showMsg, 'Client', 'AddtoCart');
							} else if (responseData.errorCode || responseData.errorMessage || responseData.errorMessageKey) {
								openCart = false;
								let showMsg = 'Oops! An error occurred while adding to cart';
								if(String(responseData.errorCode).indexOf('_ITEM_ADD_FORB')!=-1
										&& String(responseData.errorMessageKey).indexOf('_ITEMS_IN_CART')!=-1) {
									
									showMsg = "Oops! Cannot add to cart, as you can have a complete pair only within an order. Please amend your cart to proceed.";
					        		
									if(responseData.errorMessageParam && responseData.errorMessageParam.length){
										if(String(responseData.errorMessageParam[0]).indexOf('Electronics-cart-has-others')!=-1) {
											showMsg = "Oops! Cannot add to cart, as you cannot purchase an Electronics item in conjunction with a non Electronic item. Please amend your cart to proceed.";
										} else if (String(responseData.errorMessageParam[0]).indexOf('Electronics-cart-has-electr')!=-1 ) {
											showMsg = "Oops! Cannot add to cart, as you cannot purchase an Electronics item in conjunction with a non Electronic item. Please amend your cart to proceed.";
										} else if (String(responseData.errorMessageParam[0]).indexOf('Electronics-many')!=-1 ) {
											showMsg = "Oops! Cannot add to cart, as you can only have one Electronics item within an order. Please amend your cart to proceed.";
										}
									}
								}
								opsm.utils.showAlertError(showMsg);
								utagFiller.asyncSendErrorEvolvedDetails('Unable to add product in the cart', showMsg, 'Client', 'AddtoCart');
							} else if (responseData.errorMessageParam && typeof responseData.errorMessageParam !== "undefined" && responseData.errorMessageParam.length > 0) {
								openCart = false;
								let showMsg = 'Oops! An error occurred while adding to cart';
								opsm.utils.showAlertError(showMsg);
								utagFiller.asyncSendErrorEvolvedDetails('Unable to add product in the cart', showMsg, 'Client', 'AddtoCart');
							} else {
								utagFiller.asyncAddToCartPDPParams();
							}
							
							//Product.addToCart(totalQty, ev);
							updateMiniCartOnPageLoad(openCart);
				            //
				            // TODO :
				            // 1. Remove add to favorites, find a store
				            // 2. Error Message Space
				            // 3. Show loading message
				            // 4. Paper fold animation for checkout section
				            //

						//Calling analytics for add to cart

						/*var viewCartFirstCookie = $.cookie('viewCartFirst_'+$('#storeId').val());
						if(viewCartFirstCookie == null || viewCartFirstCookie == '') {
							callAnalyticsForCartClick('prop2,events,products,eVar38,prop27,eVar35', 'scOpen,scAdd', $("#catNameAnalytics").val() + ';'+$("#pdpArticleNumberAnalytics").val()+';;;;eVar32='+$("#productIdAnalytics").val(), '', '', '', '', '', '', '', 'o', 'Cart|Cart Add', utag_data.pageName,utag_data.pageName,responseData.orderId);
						} else {
							callAnalyticsForCartClick('prop2,events,products,prop27', 'scAdd', $("#catNameAnalytics").val() + ';'+$("#pdpArticleNumberAnalytics").val()+';;;;eVar32='+$("#productIdAnalytics").val(), '', '', '', '', '', '', '', 'o', 'Cart|Cart Add', utag_data.pageName,'','');

						}

						//Creating cookie for analytics for add to cart
						var viewCartFirstCookie = $.cookie('viewCartFirst_'+$('#storeId').val());
						if(viewCartFirstCookie == null || viewCartFirstCookie == '') {
							$.cookie('viewCartFirst_'+$('#storeId').val(), 'true', { path: '/' });
						}

							var err_msg = document.getElementById("errorMessageCL");

							if(null != responseData.addedToCart && '' != responseData.addedToCart && responseData.addedToCart == 'true'){
								var addtocart_btn = $('#addtocart_'+catEntryId),
								cartPageUrl = $('#cartPageUrl').val();

								err_msg.innerHTML =  "Sorry, only one contact lens product can be added to your cart. Remove other contact lenses from your cart to add this product.";
								err_msg.style.display = "block";

								//Hide the modality & subscription section
								$('.pdp.cl .cl-options').hide();
								$('.pdp.cl .cart-options .box-options').hide();

								addtocart_btn.text('EDIT CART');
								addtocart_btn.unbind().removeClass();
								addtocart_btn.attr('onClick', '');
								addtocart_btn.addClass('button');

								addtocart_btn.live('click', function(){
								    location.href = cartPageUrl;
								});

							}

							if(responseData.errorCode !=null){
								var errMsgParam = responseData.errorMessageParam;
								if(errMsgParam == 'SAME_EYE_COMBINATION_EXISTS'){
									var errMsg = "";
									if((lensEyeAdded == 'both' || lensEyeAdded == 'right') && $("#cl-options-boxes-right").val() > 0){//OPS-1004
										errMsg = "Your cart already contains right eye. To add right lenses, remove existing right lenses from your cart";
									}else{
										errMsg = "Your cart already contains left eye. To add left lenses, remove existing left lenses from your cart";
									}
									err_msg.innerHTML = errMsg;
								}else if(errMsgParam == 'SUB_NONSUB_COMBO_INVALID'){
									err_msg.innerHTML = "Sorry, you are only able to add contact lenses of the same modality " +
											"(e.g. Daily, Weekly, Monthly). To add lenses for this product, please remove existing lenses from cart.";
								}else if(errMsgParam == 'ATTRIBUTE_MISMATCH'){
									err_msg.innerHTML = "Sorry, you are only able to add contact lenses of the same modality " +
											"(e.g. Daily, Weekly, Monthly). To add lenses for this product, please remove existing lenses from cart.";
								}else if(errMsgParam == 'GENERIC_MERGE_FAILURE'){
									err_msg.innerHTML = "Sorry, an error has occurred while adding your product to cart. Please try again later."
								}else{
									if(err_msg)
										err_msg.innerHTML =  responseData.errorMessageParam;
								}
								if(err_msg)
									err_msg.style.display = "block";
								//opsm.product.initCartButton();
							}else{
								//Calling analytics for add to cart
								if($("#cl-options-boxes-left option:selected").val() != 0 && $("#cl-options-boxes-right option:selected").val() != 0) {

									$('.cl-options .left select').attr("disabled","disabled");
									$('.cl-options .left').addClass('lowOpacity');
									$('.cl-options .right select').attr("disabled","disabled");
									$('.cl-options .right').addClass('lowOpacity');
									$(".cart-options").hide();
								}
								else if($("#cl-options-boxes-right option:selected").val() != 0){
									$('.cl-options .right').addClass('lowOpacity');
									$('.cl-options .right select').attr("disabled","disabled");
							//		$('.cl-options .right select').siblings("span").html("");
				           //         $('#cl-options-boxes-right').siblings("span").html("0");
				                    $("#cl-options-boxes-right").val($("#cl-options-boxes-right option:first").val());
				                    multipleContactsFlag = true;

									if(document.getElementById("recurringOrderItem").value == "true"){
										$('.members-plan #do-members-plan').css('display','none');
										$('.members-plan').removeClass().addClass('maruntxt');
										$('#is-existing-cartitem-recurring').val('true');
									}else{
										$('.members-plan').removeClass().hide();
									}
								}
								else if($("#cl-options-boxes-left option:selected").val() != 0){
									$('.cl-options .left select').attr("disabled","disabled");
									$('.cl-options .left').addClass('lowOpacity');
						//			$('.cl-options .left select').siblings("span").html("");
				        //            $('#cl-options-boxes-left').siblings("span").html("0");
				                    $("#cl-options-boxes-left").val($("#cl-options-boxes-left option:first").val());
				                    multipleContactsFlag = true;

									if(document.getElementById("recurringOrderItem").value == "true"){
										$('.members-plan #do-members-plan').css('display','none');
										$('.members-plan').removeClass().addClass('maruntxt');
										$('#is-existing-cartitem-recurring').val('true');
									}else{
										$('.members-plan').removeClass().hide();
									}
								}

								if(($('.cl-options .right').hasClass('lowOpacity') || $('.cl-options .right').hasClass('faded'))&&
										($('.cl-options .left').hasClass('lowOpacity') || $('.cl-options .left').hasClass('faded'))){
									$(".cart-options").hide();
								}

								//if($.find(".cl-options").length > 0){
								//	$("select", $(".cl-options")).attr("disabled","disabled");
								//
								//}

								//Hiding Add to favs and find in store once the add to cart is clicked
								var cartCountForAnalytics = parseInt($('#shopcart').html());
								$('.AddToFavOverlay #addtofav_'+catEntryId).hide();
								$('.find-in-store-cart-'+catEntryId).hide();

								$('.pdp .product-main ul.actions').hide();

								$('.added-to-favorite-cart').hide();
								$('.remove-fav-link-'+catEntryId).hide();
								var item_count = parseInt($('.the-amount', $(divid).parent()).html()),
									cartupdate = $($(divid).parent().next());
					            //Add To Cart animation
								if(typeof responseData.addedToCart == 'undefined' || responseData.addedToCart != 'true'){
									$.opsm_obj.co_animate(cartupdate);
									// Update the Cart items in the header
									$('#shopcart').html(parseInt($('#shopcart').html()) + item_count);
									var updateCountAttr = parseInt(isNaN($("#cart-cnt").attr("data-items")) ? 0 : $("#cart-cnt").attr("data-items")) + item_count;
									$("a#cart-cnt").attr("data-items", updateCountAttr);
								}
					            item_count = parseInt($('.the-amount',$(divid).parent()).html());
					            var old_qty = $('#checkout-count_'+catEntryId).html() == '' ? 0 : (''+parseInt($('#checkout-count_'+catEntryId).html()) != 'NaN') ? parseInt($('#checkout-count_'+catEntryId).html()) : 0 ;

					            if(multipleContactsFlag){
					            	$('.pdp.cl .cart-options .box-options .boxes .the-amount').html("0");
									$('.pdp.cl .cart-options .box-options .contact-lens .the-price').html('$0.00');
									$('.pdp.cl .cart-options .box-options .the-period').html('0 months');
					            }

					            //Add contact lenses only once
					            if(typeof responseData.addedToCart == 'undefined' || responseData.addedToCart != 'true'){
					            	// for CL dont add old qty as left and right are considered as two
					            	// separate items
					            	$('#checkout-count_'+catEntryId).html(item_count);
					            }
					            $('#addtocart_'+catEntryId).addClass('add-to-cart').removeClass('add-to-cart-green');

								$('#minus_'+catEntryId).attr("disabled","disabled").css('color','#ccc');
								if($('.gift-quantity').length){
									$('.gift-quantity .minus').attr("disabled","disabled").css('color','#ccc');
								}

								$('#mm-your-cart .icon').addClass('hide');
								$('#mm-your-cart .cart-on').removeClass('hide');
								$('#mm-your-cart .link-text').css( "color", "#545454" );
								$('span#shopcart').css("color", "#545454");

								// Modifying the add to cart button CSS
								$(".add-cart").addClass('done');
							}*/

				        },
				        error: function (xhr, ajaxOptions, thrownError) {
				        	utagFiller.asyncSendErrorEvolvedDetails('Add to cart no response', thrownError, 'Server', 'AddtoCart');
				        	var ajax_details = [xhr,ajaxOptions,thrownError];
							Genericcallbackerror(ajax_details,true);
				        }
					});
		}
		var	addToCartContactLensAndTorics = function(form, ev) {
			var button = $(this);
			var isError = false;
			// Do validation when product is a CL
			if (isCL()) {
				// Find table with options
				var optionsTable = productMainArea.find(".cl-options table");
				// Remove all previous errors
				optionsTable.find(".cSelectbox.error").removeClass("error");
				optionsTable.find("tr.error").addClass("hidden");
				optionsTable.find("tr.error label").addClass("hidden").removeClass("visuallyhidden");
				var box_right = $("#cl-options-boxes-right"),
				box_left = $("#cl-options-boxes-left");

				// Check if at least one boxes are selected
				if (parseInt(box_right.val()) + parseInt(box_left.val()) <1 ) {
					isError = true;
					box_right.closest(".cSelectbox").addClass("error");
					box_left.closest(".cSelectbox").addClass("error");

					var errorRow = box_right.closest("tr").next(".error");

					errorRow.removeClass("hidden");
					errorRow.find("label:eq(1)").removeClass("hidden").removeClass('visuallyhidden');
					errorRow.find("label:eq(0)").addClass("visuallyhidden").removeClass("hidden");
				}

				// Check if at least two boxes are selected when members plan is activated
				//if ($(".members-plan").hasClass("c_on") && parseInt($("#cl-options-boxes-right").val()) + parseInt($("#cl-options-boxes-left").val()) < 2) {
				//	isError = true;
				//	$("#cl-options-boxes-right, #cl-options-boxes-left").closest(".cSelectbox").addClass("error");
				//	var errorRow = $("#cl-options-boxes-right").closest("tr").next(".error");
				//	errorRow.removeClass("hidden");
				//	errorRow.find("label:eq(0)").removeClass("hidden").removeClass('visuallyhidden');
				//	errorRow.find("label:eq(1)").addClass("visuallyhidden").removeClass("hidden");
				//}
				var rightCheck = 0,
				leftCheck = 0;

				if(parseInt(box_left.val()) > 0){
					rightCheck = 1;
				}
				if(parseInt(box_right.val()) > 0){
					leftCheck = 1;
				}

				// Check if all select boxes have a value selected
				optionsTable.find("select:visible").each(function() {
					var htmlTd,
					that = this,
					htmlTr = $(that).parents('.cl-options table tr');
					// Finding the TD that is selected
					if(rightCheck == 1){
						htmlTd = $('td',htmlTr).last();
						var select = $('.cSelectbox select',htmlTd);
						if (!select.prev("span").text() || select.prev("span").text() == "SELECT") {
							isError = true;
							select.closest(".cSelectbox",htmlTd).addClass("error");// Finding the selected select box div
							var errorRow = select.closest('tr').next(".error");// Finding the next error tr
							if (errorRow.hasClass("hidden")) {
								errorRow.removeClass("hidden");
								errorRow.find("label").removeClass("hidden");
							} else {
								errorRow.find("label").removeClass("hidden");
							}
						}
					}
					if(leftCheck == 1){
						htmlTd = $('td',htmlTr).first();
						var select = $('.cSelectbox select',htmlTd);
						if (!select.prev("span").text() || select.prev("span").text() == "SELECT") {
							isError = true;
							select.closest(".cSelectbox",htmlTd).addClass("error");// Finding the selected select box div
							var errorRow = select.closest('tr').next(".error");// Finding the next error tr
							if (errorRow.hasClass("hidden")) {
								errorRow.removeClass("hidden");
								errorRow.find("label").removeClass("hidden");
							} else {
								errorRow.find("label").removeClass("hidden");
							}
						}
					}
				});
			}
			if (isError) {
				return;
			}
			// Do animation, AJAX request etc.
			//button.showSpinner();

			button
			.on("hover", function() {
				$(this).removeClass("done");
			});
			//	.on("mouseout", function() {
			//		$(this).addClass("done");
			//	})
			//	.addClass("done")
			//;

			productMainArea
			.addClass("checkout-unfolded")
			.on("webkitAnimationEnd animationend", function() {
				$(this).addClass("checkout-unfolded-done");
			})
			;
			if (!"-webkit-animation" in document.body.style && !"animation" in document.body.style) {
				productMainArea.trigger("animationend");
			}
			//button.hideSpinner();
			if (isCL()) {
				opsm.product.addContactLensesToCart($('#addToCartId').val(), form, ev);
				var catEntryId = $('#addToCartId').val();
				//GTM removal
				/*
				if(typeof dataLayer != undefined && dataLayer != null && 'function' == typeof dataLayer.push) {
					gtmAddToCart($('#modelName').val(), $('#pdpArticleNumberAnalytics').val(),$('#displayPriceString').val(), $('#manufacturerName').val(), $('#catNameAnalytics').val(),'',parseInt($('#qty_'+catEntryId).html()),$('#localeCurrency').val());
				*/
			}
		};
		
		var addToCartRxPair = function (data) {
			/* '354049', '354061', 'serv1,serv2,serv3', '' */
			var mock = {
					frameCatentryId : '',
					lensCatentryId: '',
					//servCatentryIds: '',
					//warrCatentryId: ''
			};
			var rxDataDOM = {
					frameCatentryId: $('#frameCatEntryId').val() || mock.frameCatentryId,
					lensCatentryId: $('#lensCatEntryId').val() || mock.lensCatentryId,
					//servCatentryIds: $('#servCatentryIds').val() || mock.servCatentryIds,
					//warrCatentryId: $('#warrCatentryId').val() || mock.warrCatentryId,
			}
			var rxData = data || rxDataDOM;
			
			//quantity is set serverside
			//var quantity = 1;
//			if ($("#quantity").length > 0) {
//				quantity = $("#quantity").val();
//			}
			
			//non optional conditions
			if (rxData.frameCatentryId && rxData.lensCatentryId){
				var params = "storeId=" + $('#storeId').val();
				params += "&catalogId=" + $('#catalogId').val();
				params += "&langId=" + $('#langId').val();
				params += "&orderId=.";
				params += "&calculationUsage=-1,-2,-3,-4,-5,-6,-7";
				params += "&keepAutoAddedOrderItemsBeforeCalculate=true";
				params += "&inventoryValidation=true";
				
				params += "&isRxPair=true";
				params += "&frameCatentryId=" + rxData.frameCatentryId;
				//params += "&quantity=" + quantity;
				params += "&lensCatentryId=" + rxData.lensCatentryId;
				params += "&calculateOrder=1";
				
				/*if(rxData.servCatentryIds){
					params += "&servCatentryIds=" + rxData.servCatentryIds; //as csv
				}*/
				
				/*if(rxData.warrCatentryId){
					params += "&warrCatentryId=" + warrCatentryId;
				}*/
				var url = "AjaxOrderItemAdd";
				return $.ajax({
					url: url,
					type: "POST",
					dataType: 'json',
					data: params,
					startTime: performance.now(),
					complete: function (complete, status) {
						/* OPSMD-4639 */
						var time = performance.now() - this.startTime;
						//Convert milliseconds to seconds.
						var seconds = time / 1000;
						if (seconds > 10) {
							utagFiller.asyncSendErrorEvolvedDetails('Add to cart over 10sec', '', 'Client', 'AddtoCart');
						}
					},
					success: function (responseData) {
						if($('body.pg-product-detail').length){
							/* OPSMD-4639 */
							let isAddToCartSuccess = true;
							if(responseData.errorCode || responseData.errorMessage || responseData.errorMessageKey){
								isAddToCartSuccess = false;
								utagFiller.asyncSendErrorEvolvedDetails('Unable to add product in the cart', '', 'Client', 'AddtoCart');
								if(String(responseData.errorCode).indexOf('_ITEM_ADD_FORB')!=-1
										&& String(responseData.errorMessageKey).indexOf('_ITEMS_IN_CART')!=-1) {
									var showMsg = "Oops! Cannot add to cart, as you can have a complete pair only within an order. Please amend your cart to proceed.";
					        		
									if(responseData.errorMessageParam && responseData.errorMessageParam.length){
										if(String(responseData.errorMessageParam[0]).indexOf('Electronics-cart-has-others')!=-1) {
											showMsg = "Oops! Cannot add to cart, as you cannot purchase an Electronics item in conjunction with a non Electronic item. Please amend your cart to proceed.";
										} else if (String(responseData.errorMessageParam[0]).indexOf('Electronics-cart-has-electr')!=-1 ) {
											showMsg = "Oops! Cannot add to cart, as you cannot purchase an Electronics item in conjunction with a non Electronic item. Please amend your cart to proceed.";
										} else if (String(responseData.errorMessageParam[0]).indexOf('Electronics-many')!=-1 ) {
											showMsg = "Oops! Cannot add to cart, as you can only have one Electronics item within an order. Please amend your cart to proceed.";
										}
									}
									
									opsm.utils.showAlertError(showMsg);
								}
							} else {
								//lensPanel will forward to cart page
								//updateMiniCartOnPageLoad(true);
								
								//GTM removal
								/*
								if(typeof dataLayer != undefined && dataLayer != null && 'function' == typeof dataLayer.push) {
									gtmAddToCart(
									$('#modelName').val(),
									$('#pdpArticleNumberAnalytics').val(),
									$('#displayPriceString').val(),
									$('#manufacturerName').val(),
									$('#catNameAnalytics').val(),
									$('#colorAttr').val(),
									//parseInt($('#qty_' + $(".product--select-size select").val()).html()),
									1,
									$('#localeCurrency').val()
									);
								}
								*/
	
								var viewCartFirstCookieRenew = $.cookie('viewCartFirst_' + $('#storeId').val());
								if (viewCartFirstCookieRenew == null || viewCartFirstCookieRenew === '') {
									$.cookie('viewCartFirst_' + $('#storeId').val(), 'true', {path: '/'});
								}
	//							if(isAddToCartSuccess) {
	//								//TODO
	//								var el;
	//								utagFiller.asyncAddToCartPDPParams(el);
	//							}
							}
						}
					},
					error: function (xhr, ajaxOptions, thrownError) {
						var ajax_details = [xhr, ajaxOptions, thrownError];
						$("#opsm-generic-error-modal").modal({backdrop: 'static'});
						utagFiller.asyncSendErrorEvolvedDetails('Add to cart no response', thrownError, 'Server', 'AddtoCart');
					}
				});
			} else {
				return Promise.resolve();
			}
			
		};
		
		/*
		var initSwipe = function() {
			//$('.swipe-wrap img[src=""]').remove();

			slider = Swipe($(".pdp .swipe").get(0), {
				auto : 0,
				continuous: false,
				callback : function(pos) {
					if (pos > sliderNav.length - 1) pos = pos - 2;
					sliderNav.removeClass("active");
					sliderNav.eq(pos).addClass("active");
				}
			});
			sliderNav.on("click", function(e) {
				e.preventDefault();
				var pos = sliderNav.index($(this));
				if (slider.getPos() != pos) {
					slider.slide(pos, 300);
					//console.log($($(".swipe-wrap img")[pos]).attr("data-zoom-src"));
					$("#zoomImg").attr("href",$($(".swipe-wrap img")[pos]).attr("data-zoom-src"));
				}
			});
		};

		var initStyles = function() {
			if (!stylesBox.length) {
				return;
			}
			stylesBox.find("h4").on("click", function() {
				$("body").toggleClass("product-styles-open");
			});
		};

		var initFavouritesButton = function() {
			var theButton = $(".pdp .product-main .actions a.favourites");
			if (!theButton.length) {
				return;
			}
			var theReplacement = theButton.siblings(".favourites-added");
			if (!theReplacement.length) {
				return;
			}
			theButton.on("click", function(e) {
				e.preventDefault();
				$(this).hide();
				theReplacement.show();
			});
		};

		var initMoreInfoLink = function() {
			var theLink = $(".pdp .product-main .members-price a.info");
			var theExpandable = $(".pdp .details .members-price").closest(".detail");
			if (!theLink.length || !theExpandable.length) {
				return;
			}
			theLink.on("click", function(e) {
				e.preventDefault();
				$("html, body").animate({
					scrollTop : theExpandable.offset().top - 30
				}, 800, function() {
					theExpandable.eq(0).data("expandable").open();
				});
			});
		};

		var loadShareButtons = function() {
			// Due to missing support for media queries in IE8, we have to add it to this if statement
			if (shareBox.is(":visible") || $("html").hasClass("ie8")) {
				$(window).load(function() {
					// Facebook code
					// See: https://developers.facebook.com/docs/reference/plugins/like/
					shareBox.find(".facebook").html('<iframe src="//www.facebook.com/plugins/like.php?href=' + document.URL + '&amp;width=48&amp;height=21&amp;colorscheme=light&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;send=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:48px; height:21px;" allowTransparency="true"></iframe>');
					// Pinterest code
					// See: http://business.pinterest.com/widget-builder/#do_pin_it_button
					//shareBox.find(".pinterest").html('<a href="//pinterest.com/pin/create/button/?url=' + document.URL + '&media=' + $(".pdp .swipe img").first()[0].src + '&description=Next%20stop%3A%20Pinterest" data-pin-do="buttonPin" data-pin-config="beside"><img src="//assets.pinterest.com/images/pidgets/pin_it_button.png" /></a>');
					(function(d){
						var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
						p.type = 'text/javascript';
						p.async = true;
						p.src = '//assets.pinterest.com/js/pinit.js';
						f.parentNode.insertBefore(p, f);
					}(document));
					// Google+ code
					// See: https://developers.google.com/+/web/+1button/
					shareBox.find(".google").html('<div class="g-plusone" data-size="medium" data-annotation="none"></div>');
					(function() {
						var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
						po.src = 'https://apis.google.com/js/plusone.js';
						var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
					})();
					// Twitter code
					// See: https://twitter.com/about/resources/buttons#tweet
					shareBox.find(".twitter").html('<a href="https://twitter.com/share" class="twitter-share-button" data-text="Check out these frames I found @ OPSM. What do you think?" data-count="none">Tweet</a>');
					!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
				});
			}
		};
		*/

		/*
		var initZoomFeature = function(){

			$('#zoomImg').magnificPopup({type:'image',
					callbacks: {
					beforeOpen: function() {
				var loggedInStatus = "NotLoggedIn";
				if(isGuestUser != 'true'){
					loggedInStatus = "LoggedIn";
				}
				var ArticleNum=$('#pdpArticleNumberAnalytics').val();
				var categoryName=$('#catNameAnalytics').val();
				var topCategoryName=$('#topCatNameAnalytics').val();
				var productId=$('#productIdAnalytics').val();

				utag.view({
							country : countryCode,
							currency : currencyCode,
							pageName : "OPSM_"+countryCode+":"+topCategoryName+":"+categoryName+":"+"ProductImageZoom",
							channel: topCategoryName,
							subSection:categoryName,
							productsList:categoryName+";"+ArticleNum+";;;;"+"eVar32="+productId,
							pageEvents : "ProductImageZoom",
							authenticated: loggedInStatus
						});

						if($(window).width()<744)
							$('html, body').scrollTop(0);
					},
				    open: function() {
						if($(window).width()<744){
							$(document).bind('scroll',function(){
								if($(this).scrollTop()>0){
									$(".mfp-close").css("top","10px");
								}
								else{
									$(".mfp-close").css("top","75px");
								}
							});
						}
				    },
				    close: function() {
				    	if($(window).width()<744){
							$(".mfp-close").css("top","75px");
					    	$(document).unbind('scroll');
				    	}
				    }
				}
			 });
		};
		*/
		var init = function() {
			/*initFavouritesButton();
			initSwipe();
			initMoreInfoLink();
			loadShareButtons();
			opsm.qtyBtns.init();
			initZoomFeature();
			//initCarousel() ;
			$('.cl-options select').not(".disabled").removeAttr("disabled");*/
		};

		return {
			init : init,
			//initCarousel : initCarousel,
			//initFavouritesButton : initFavouritesButton,
			addToCart: addToCart,
			addToCartRX: addToCartRX,
			deleteFromCartRX: deleteFromCartRX,
			addToCartContactLensAndTorics: addToCartContactLensAndTorics,
			addContactLensesToCart: addContactLensesToCart,
			addToCartRxPair: addToCartRxPair
		};


	}());
	/*
	opsm.validateSub = (function(){
		function _validateSub (){

			this.isSubOn = function(){
				var leftCntBox = 0, rightCntBox = 0, boxCount = 0, zeroCount = 0,
				individualBoxPrice = $('.pdp.cl .cart-options .box-options .boxes .the-price');
				rightCntBox = parseInt($('.cSelectbox.box #cl-options-boxes-right').val());
				leftCntBox = parseInt($('.cSelectbox.box #cl-options-boxes-left').val());
				boxCount = rightCntBox + leftCntBox;

				var subCharge = parseFloat($("#subCharge").val()).toFixed(2);
				var theamount = parseFloat($(".the-amount").text()).toFixed(2);
				var totalAmount = theamount*subCharge;
				var totalParseAmount = parseFloat(totalAmount).toFixed(2);

				if(boxCount == 0 ){
					individualBoxPrice.html('@ $'+ subCharge).addClass("members-discount");
				} else{
					zeroCount = boxCount * subCharge;
					individualBoxPrice.html('@ $'+ zeroCount.toFixed(2)).addClass("members-discount");
				}
				individualBoxPrice.addClass("members-discount");
				$(".pdp .product-main .box-options .subtotal .the-price").html('$'+totalParseAmount).addClass("members-discount");
				$(".pdp .product-main .box-options .refill").removeClass("hidden");
				$("#recurringOrderItem").val('true');
			};
			this.subOff = function() {
				// code for Subscription off
				var leftCntBox = 0, rightCntBox = 0, boxCount = 0, zeroCount = 0,
				individualBoxPrice = $('.pdp.cl .cart-options .box-options .boxes .the-price');
				rightCntBox = parseInt($('.cSelectbox.box #cl-options-boxes-right').val());
				leftCntBox = parseInt($('.cSelectbox.box #cl-options-boxes-left').val());
				boxCount = rightCntBox + leftCntBox;

				var theamount = parseFloat($(".the-amount").text()).toFixed(2);
				var clSubCharge = parseFloat($('#clSubCharge').val()).toFixed(2);
				var totalAmount = theamount * clSubCharge
				var totalParseAmount = parseFloat(totalAmount).toFixed(2)
				if(boxCount != 0 ){
					individualBoxPrice.html('@ $'+ clSubCharge).removeClass("members-discount");
				}else{
				//	zeroCount = boxCount * clSubCharge;
				//	individualBoxPrice.html('@ $'+ zeroCount.toFixed(2)).addClass("members-discount");
				}
				individualBoxPrice.removeClass("members-discount");
				$(".pdp .product-main .box-options .subtotal .the-price").html('$'+totalParseAmount).removeClass("members-discount");
				$(".pdp .product-main .box-options .refill").addClass("hidden");
				$("#recurringOrderItem").val('false');
			};

			return this;
		}
		return new _validateSub();
	}());*/
}(window, document, jQuery, opsm));

jQuery(opsm.product.init);

// Generic Onload functions for pdp
$(document).ready(function(){

	/*OPSMD-2725 validate form fields on click of add prescription for cl */
	//$('.product--info-area  button#add-to-cart-pdp')
	if($('button#prescr-sel-pdp').length && $('form#prescription-step-1').length){
		$('button#prescr-sel-pdp').click(function(){
			if ($('form#prescription-step-1').data("activated")) {
				$('form#prescription-step-1').valid();
			} else {
				$('form#prescription-step-1').find(".opsm-form-group").addClass('blue');
			}
		});
	}
	/*OPSMD-2725 end */

	//Display the Refill Frequency under the Lens Description in CL PDP
	var boxMaxVal = 1, lensFreq, refillPeriod, clMonths, clDays, html;
	lensFreq = parseFloat($("#refill").attr("attr-freq"));
	refillPeriod = boxMaxVal * lensFreq;
	clMonths = Math.floor(refillPeriod / 30);
	clDays = refillPeriod % 30;
	html = clMonths + " months";
	if (clDays != 0) {
		html += " and " + clDays + " days";
	}
	$("span.lensPerBox_desc").html(html);

	resizeFullImage = function () {
		if ($(".product--prescription").length === 0) {
			if ($(window).width() >= 768) {
				if ($("#full-image-body").height() < $(".product--info-right").height()) {
					$("#full-image-body").css("min-height", $(".product--info-right").height());
				}
			} else {
				$("#full-image-body").css("min-height", "unset");
			}
		} else {
			// fix start-date height
			$("label[for=start-date]").css("min-height", $("label[for=expiry-date]").height());
		}
	}
	resizeFullImage();
	window.onresize = resizeFullImage;
/*	// CL PDP
	$('.pdp .product-main .box-options .members-plan').on('click', function(e) {
		e.preventDefault();
		callAnalyticsForClick('prop2,prop24', '', '', '', '', '', '', '', '', '', 'o', 'Subscription price', utag_data.pageName);
		var leftCntBox = 0, rightCntBox = 0, boxCount = 0, zeroCount = 0,
			individualBoxPrice = $('.pdp.cl .cart-options .box-options .boxes .the-price');
			rightCntBox = parseInt($('.cSelectbox.box #cl-options-boxes-right').val());
			leftCntBox = parseInt($('.cSelectbox.box #cl-options-boxes-left').val());
			boxCount = rightCntBox + leftCntBox;

		if (!($(this).hasClass("c_on"))) {

			$(this).addClass("c_on");
			var subCharge = parseFloat($("#subCharge").val()).toFixed(2);
			var theamount = parseFloat($(".the-amount").text()).toFixed(2);
			var totalAmount = theamount*subCharge;
			var totalParseAmount = parseFloat(totalAmount).toFixed(2);

			if(boxCount != 0 ){
				individualBoxPrice.html('@ $'+ subCharge).addClass("members-discount");
			} else{
				zeroCount = boxCount * subCharge;
				individualBoxPrice.html('@ $'+ zeroCount.toFixed(2)).addClass("members-discount");
			}
			individualBoxPrice.addClass("members-discount");
			$(".pdp .product-main .box-options .subtotal .the-price").html('$'+totalParseAmount).addClass("members-discount");
			$(".pdp .product-main .box-options .refill").removeClass("hidden");
			$("#recurringOrderItem").val('true');
		} else {

			$(this).removeClass("c_on");
			var theamount = parseFloat($(".the-amount").text()).toFixed(2);
			var clSubCharge = parseFloat($('#clSubCharge').val()).toFixed(2);
			var totalAmount = theamount * clSubCharge
			var totalParseAmount = parseFloat(totalAmount).toFixed(2)
			if(boxCount != 0 ){
				individualBoxPrice.html('@ $'+ clSubCharge).removeClass("members-discount");
			}else{
				zeroCount = boxCount * clSubCharge;
				individualBoxPrice.html('@ $'+ zeroCount.toFixed(2)).addClass("members-discount");
			}
			individualBoxPrice.removeClass("members-discount");
			$(".pdp .product-main .box-options .subtotal .the-price").html('$'+totalParseAmount).removeClass("members-discount");
			$(".pdp .product-main .box-options .refill").addClass("hidden");
			$("#recurringOrderItem").val('false');
		}
	});
	$('.pdp .add-cart').removeClass('hidden');
	opsm.product.initCarousel();
	if($('.members-plan').length!=0){
		if($('.members-plan').children('span').html().length >=50){
			$('.members-plan').css({'margin-bottom':'20px','height':'20px','overflow':'visible'});
		}else{
			$('.members-plan').css({'height':'20px','overflow':'hidden'})
		}
	}



	var item_count = parseInt($('.item-count').text());
	if(item_count){
		$('.pdp .cart-update').removeClass('hidden');
		$('.pdp .product-main ul.actions').hide();
	}

	if($("#is-existing-cartitem-recurring").val() == "true"){
		opsm.validateSub.isSubOn();
		//console.log('subOn');
	}
	else{
		opsm.validateSub.subOff();
		//console.log('subOff');
	}

	$(document).on("touchstart",".product-carousel img",function(){
		location.href = $(this).parent().attr("href");
	});*/

	var vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh + "px");
	window.addEventListener('resize', function() {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', vh + "px");
	});

	// Fix slick on tablet open full screen
//	resizeImagesInModal = function() {
//	    $("#full-image-container .product--slider-main .slick-slide").width($("#full-image-container .product--slider-main .slick-list").width());
//	    $("#full-image-container .product--slider-main .slick-list").height($("#full-image-container .product--slider-main .slick-current").height());
//	    $("#full-image-container .product--slider-nav .slick-current .img-fluid").click();
//	}

//	openFullScreenImages = function() {
//	    if (!$("#modal-full-screen-images").is(":visible") && 767 < $(document).width() && $(document).width() < 992) {
//	        $("#full-image-container").appendTo("#modal-full-screen-images .modal-body");
//	        $("#modal-full-screen-images").modal("show");
//	        resizeImagesInModal();
//	    }
//	}

//	$("#full-image-container .product--slider-main").on("click", openFullScreenImages);

//	$("#modal-full-screen-images button.close").on("click", function(ev) {
//	    $("#full-image-container").appendTo("#full-image-body");
//	    resizeImagesInModal();
//	})
});
