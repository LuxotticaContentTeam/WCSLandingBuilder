/*jslint forin: true, sloppy: true, unparam: true, vars: true, white: true */
/*global window, document, jQuery, log */

var opsm = window.opsm || {};

(function(window, document, $, opsm) {

	opsm.rx = (function () {

		var store_id = '',
			catalog_id = '',
			lang_id = '',
			rxcUrlJS = '',
			rxcUrlCSS = '',
			config = {},
			jsLoaded = false,
			translationLoaded = false,
			cssLoaded = false,
			responseLoaded = false;
		
		var deleteFromCartRX = function(frameOrderItemId, lensOrderItemId) {
			return opsm.product.deleteFromCartRX(frameOrderItemId, lensOrderItemId);
		}
		
		var addToCartRX = function(frameCatEntryId, lensCatEntryId) {
			return opsm.product.addToCartRX(frameCatEntryId, lensCatEntryId);
		};
		
		var addOnlyFrameToCart = function(frameCatEntryId) {
			return opsm.product.addToCart(null, frameCatEntryId);
		};
		
		var openEditPanel = function(ev) {
			if ($("#rxcApp").length === 0) {
				$("body").append("<div id='rxcApp'></div>");
			}
			
			const cartItem = $(ev.target).closest(".cart-item"),
				frameOrderItemId = cartItem.data("itemid"),
				frameCatentryId = cartItem.data("catentry-id"),
				framePartNumber = $("#sku_" + frameOrderItemId).val(),
				frameBrand = $("#brand_" + frameOrderItemId).val(),
				frameOfferPrice = $("#offerPrice_" + frameOrderItemId).val(),
				frameDisplayPrice = $("#displayPrice_" + frameOrderItemId).val(),
				//frameColor = $("#color_" + frameOrderItemId).val(); //TODO not working
				frameColor = $("#productCode_" + frameOrderItemId).val().split('__')[1];
				brandName = $('#manufacturerName').val();
			// TODO recover information from orderItems
			const parentFrameCatentryId = $("#parentCatentryId_" + frameOrderItemId).val();
			const lensCatentryId = $("#lensCatentryId_" + frameOrderItemId).val();
			const lensOrderItemId = $("#lensOrderItemId_" + frameOrderItemId).val();
			const frameName = $("#modelName_" + frameOrderItemId).val();
			//const frameModel = $("#model_" + frameOrderItemId).val();
            const frameModel = $("#productCode_" + frameOrderItemId).val().split('__')[0];
			const powerCombinedMin = $("#powerCombinedMin_" + frameOrderItemId).val();
			const powerCombinedMax = $("#powerCombinedMax_" + frameOrderItemId).val();
			const clen = $("clen_" + frameOrderItemId).val();
            const frameCategory= $("#rxCategory_" + frameOrderItemId).val();
			config.data = {
				"frame": {
					"catEntryId": frameCatentryId,
					"name": frameName,
					"upc": framePartNumber,
					"model": frameModel,
					"color": frameColor,
					"listPrice": frameDisplayPrice,
					"offerPrice": frameOfferPrice,
					"category": frameCategory,
//					"brand": frameModel,
					"brand": brandName,
					"imageUrl": "https://assets.opsm.com/is/image/OPSM/" + framePartNumber + "__001.png?impolicy=OP_PLP",
					"brandImageUrl": "",
					"clen": clen,
					"rxValues": {
						"powerCombinedMin": powerCombinedMin,
						"powerCombinedMax": powerCombinedMax
					}
				},
				"frameOnlyLensUPC": 'PLANO_ITEM',
				"lens": {
					"catEntryId": lensCatentryId
				}
			};
			config.cartMode = {
				frameOrderItemId: frameOrderItemId,
				lensOrderItemId: lensOrderItemId
			};
			loadJS();
			loadRXInfo(parentFrameCatentryId);
		}
		
		var openNewPanel = function() {
			populateFrameData();
			delete config.data.lens;
			delete config.cartMode;
			responseLoaded = false;
			loadJS();
			loadRXInfo($("#rx-parent-catentryID").val());
		}

		var openPanel = function() {
			loadTranslation();
			if (jsLoaded && responseLoaded) {
				utagFiller.setPDPParams();
				if (typeof RXC.rxcWidget !== "undefined" && RXC.rxcWidget !== null) {
					fixConfig();
					const myWidget = RXC.rxcWidget.new(config);
					myWidget.render();
					loadCSS();
				}
			}
		}

		var jsSuccessLoaded = function() {
			jsLoaded = true;
		}
		
		var translationSuccessLoaded = function() {
			translationLoaded = true;
		}

		var init = function() {
			store_id = $('#storeId').val();
			catalog_id = $('#catalogId').val();
			lang_id = $('#langId').val();
			var rxcUrlJSStoreconf = $("#rxcUrlJS").val();
			var rxcUrlCSSStoreconf = $("#rxcUrlCSS").val();
			
			if (typeof rxcUrlJSStoreconf !== "undefined" && rxcUrlJSStoreconf !== "") {
				rxcUrlJS = rxcUrlJSStoreconf;
			}
			if (typeof rxcUrlCSSStoreconf !== "undefined" && rxcUrlCSSStoreconf !== "") {
				rxcUrlCSS = rxcUrlCSSStoreconf;
			}
			
			const cartParamsArray = [];
			cartParamsArray.push("storeId=" + $('#storeId').val());
			cartParamsArray.push("catalogId=" + $("#catalogId").val());
			cartParamsArray.push("langId=" + $('#langId').val());
			cartParamsArray.push("orderId=.");
			cartParamsArray.push("calculationUsageId=-1");
			cartParamsArray.push("URL="+location.origin+"/webapp/wcs/stores/servlet/AjaxOrderItemDisplayView");
			cartParamsArray.push("errorViewName=AjaxOrderItemDisplayView");
					
			config = {
				selector: "#rxcApp",
				lensesData: {},
				layoutSettings: {
					enableGrayout: true,
					enableLargeIcons: false
				},
				actionsModule: {
					/** Callback when config.cartMode is undefined or null */
					genericAddToCart: function (_frameObject, _lensObject, _warrantyObject) {
						if (config.data.frameOnlyLensUPC !== _lensObject.lensPackage.upc) {
							return addToCartRX(_frameObject.catEntryId,_lensObject.lensPackage.catEntryId)
								.then( function (responseData, status, xhr) {
									let isAddToCartSuccess = true;
									if(responseData.errorCode || responseData.errorMessage || responseData.errorMessageKey){
										isAddToCartSuccess = false;
										utagFiller.asyncSendErrorEvolvedDetails('Unable to add product in the cart', '', 'Client', 'AddtoCart');
										if(String(responseData.errorCode).indexOf('_ITEM_ADD_FORB')!=-1
												&& String(responseData.errorMessageKey).indexOf('_ITEMS_IN_CART')!=-1) {
											var onPageMsg = 'Oops! Cannot add to cart, as you can have a complete pair only within an order. Please amend your cart to proceed.';
											if(responseData.errorMessageParam && responseData.errorMessageParam.length){
												if(String(responseData.errorMessageParam[0]).indexOf('Electronics-cart-has-others')!=-1) {
													onPageMsg = "Oops! Cannot add to cart, as you cannot purchase an Electronics item in conjunction with a non Electronic item. Please amend your cart to proceed.";
												} else if (String(responseData.errorMessageParam[0]).indexOf('Electronics-cart-has-electr')!=-1 ) {
													onPageMsg = "Oops! Cannot add to cart, as you cannot purchase an Electronics item in conjunction with a non Electronic item. Please amend your cart to proceed.";
												} else if (String(responseData.errorMessageParam[0]).indexOf('Electronics-many')!=-1 ) {
													onPageMsg = "Oops! Cannot add to cart, as you can only have one Electronics item within an order. Please amend your cart to proceed.";
												}
											}
											
											$.cookie('showmsg','ERR;;' + onPageMsg, {path:"/"});
										}
										location.href = location.href;
									} else {
										location.href = location.origin+"/OrderCalculate?"+cartParamsArray.join("&");
									}
								});
						} else {
							return addOnlyFrameToCart(_frameObject.catEntryId)
								.then( function () {
									location.href = location.origin+"/OrderCalculate?"+cartParamsArray.join("&");
								});
						}
					},
					/** Callback when config.cartMode is NOT undefined or null */
					genericSaveEditFromCart: function (_frameObject, _lensObject, _warrantyObject, _cartMode) {
						return deleteFromCartRX(_cartMode.frameOrderItemId, _cartMode.lensOrderItemId)
							.then (function () {
								return addToCartRX(_frameObject.catEntryId,_lensObject.lensPackage.catEntryId)
							})
							.then( function () {
								// Go to cart
								location.href = location.origin+"/OrderCalculate?"+cartParamsArray.join("&");
							});
					},
					genericSaveLensSelection: function (_frameObject, _lensObject, _warrantyObject) {
					},
					loadLearnMoreContent: function (_loadMoreContentName) {
						return $.ajax({
							url: "/ContentAreaESpotView",
							data: {
								storeId: 10151,
								langId: -1,
								catalogId: 12601,
								emsName: _loadMoreContentName,
								reqType: 'ajax'
							},
							type: "GET",
							dataType: 'html'
						});
					},
					genericExit: function () {
						// optional function to trigger events on configurator closure
					},
					loadContent: function(_loadContentName) {
						//return Promise.resolve('loadContent test: '+_loadContentName);
						//return TextService.call({param1: param}).then(function(response){return response.text})
						return Promise.resolve('');
					}
				},
				data: {},
				brand: "opsm",
				baseURLs: {
					genericImage: 'https://media.opsm.com/RXconfiguratorV5/',
					projectImage: 'https://media.opsm.com/RXconfiguratorV5/', 
					framesImage: 'https://assets.opsm.com/is/image/OPSM',
					assetsCDN: 'https://assets.opsm.com',
				},
				// here the pattern to match assets: first frame, second lens,
				// ray-ban frame (from PDP) with opsm lens (from lens selector) go to unbrandedFrameImages[rayban][unbranded]
				unbrandedFrameImages: {
					rayban: {
						rayban: 'https://assets.opsm.com/is/image/OPSM/#PARTNUMBER#__001.png?imwidth=680',
						default: 'https://assets.opsm.com/is/image/OPSM/#PARTNUMBER#__001.png?imwidth=680',
						unbranded: 'https://assets.opsm.com/extra/image/rxc/frames/#MO#__#CO#__RXP__FRAME__qt.png?imwidth=680',
					},
					raybanjr: {
						rayban: 'https://assets.opsm.com/is/image/OPSM/#PARTNUMBER#__001.png?imwidth=680',
						default: 'https://assets.opsm.com/is/image/OPSM/#PARTNUMBER#__001.png?imwidth=680',
						unbranded: 'https://assets.opsm.com/extra/image/rxc/frames/#MO#__#CO#__RXP__FRAME__qt.png?imwidth=680',
					},
					oakley: {
						oakley: 'https://assets.opsm.com/extra/image/rxc/frames/#MO#__#CO#__RXP__FRAME__qt.png?imwidth=680',
						default: 'https://assets.opsm.com/is/image/OPSM/#PARTNUMBER#__001.png?imwidth=680',
						unbranded: 'https://assets.opsm.com/is/image/OPSM/#PARTNUMBER#__001.png?imwidth=680',
					},
					default: {
						default: 'https://assets.opsm.com/is/image/OPSM/#PARTNUMBER#__001.png?imwidth=680',
						unbranded: 'https://assets.opsm.com/is/image/OPSM/#PARTNUMBER#__001.png?imwidth=680',
					},
				},
				paymentInstallment: {
			        type: 'afterpay',
			        installments: 4,
					multiplePaymentInstallment: true,
					types: ['afterpay'],
					contentIdentifier: "X_PDP_Installments",
			    },
                "dynamicPromoModule": {
                    getDiscount: function(_selectedFrame, _selectedData) {
                        return new Promise(function(resolve, reject) {
							let selectedFrame = {
								..._selectedFrame, 
								offerPrice:_selectedFrame.offerPrice
							};
							let selectedData = {
								..._selectedData, 
								lensPackage:{
									..._selectedData.lensPackage, 
									offerPrice:_selectedData.lensPackage.offerPrice
								}, 
								frame:{
									..._selectedData.frame, 
									offerPrice:_selectedData.frame.offerPrice
								}
							};
							
                            let data = {
                                storeId: store_id,
                                langId: lang_id,
                                catentries: _selectedFrame.catEntryId + "," + _selectedData.lensPackage.catEntryId,
                                reqType: 'ajax'
                            };
                            return $.ajax({
                                url: "/AjaxSimulateOrderPromotion",
                                data: data,
                                type: "GET",
                                dataType: 'json',
                                success: function(response) {
									if(response[_selectedFrame.catEntryId + ''] !== undefined) {
	                                    selectedData.frame.offerPrice = response[_selectedFrame.catEntryId + ''];
										selectedFrame.offerPrice = response[_selectedFrame.catEntryId + ''];
									}

									if(response[_selectedData.lensPackage.catEntryId + ''] !== undefined) {
	                                    selectedData.lensPackage.offerPrice = response[_selectedData.lensPackage.catEntryId + ''];
									}

                                    resolve({
                                        frame: selectedFrame,
                                        lensesData: selectedData
                                    });
                                },
                                error: function(response, textStatus, errorThrown) {
                                    resolve({
                                        frame: {},
                                        lensesData: {lensPromotionsDetails:[]}
                                    });                                    
                                }
                            });
                        }
                        );
                    }
                },
				translation: {
					//language: lang_id==='-99'?'en_NZ':'en_AU'
					language: 'en_AU'
				},
                prescriptionModule: {
                    prescriptionType: "FULL",
                    prescriptionFlows: ["MANUAL"],
                    enablePrismComment: false,
                    enablePrism: true,
                    activateDistanceAndReading: true,
                    hideMoreOptions: false,
                    checkAvailableFrames: function (_frame, _prescriptionObject) {
                        return null;
                    },
                    checkAvailableFrames: function (_frame, _prescriptionObject) {
                        return null;
                    },
                    loadExtendedPrescription: function (_requestObject) {
                    	let productId = null;
                    	let orderItemId = null;
                    	let _prescriptionObject = ManualInput.loadExtendedPrescription(
                    			ManualInput.suffix(productId,orderItemId));
                        return new Promise(function (resolve, reject) {
                            resolve(_prescriptionObject);
                        });
                    },
                    saveExtendedPrescription: function (_prescriptionObject) {
                    	let productId = null;
                    	let orderItemId = null;
                    	ManualInput.saveExtendedPrescription(_prescriptionObject,
                    			ManualInput.suffix(productId,orderItemId));
                        return new Promise(function (resolve, reject) {
                            resolve(_prescriptionObject);
                        });
                    },
                    clearExtendedPrescription: function (_requestObject) {
                    	let productId = null;
                    	let orderItemId = null;
                    	ManualInput.clearExtendedPrescription(
                    			ManualInput.suffix(productId,orderItemId));
                        return new Promise(function (resolve, reject) {
                            resolve({});
                        });
                    }
                }
			};
		};

		function loadCSS() {
			if (! cssLoaded) {
				cssLoaded = true;
				const link = document.createElement("link");
				link.setAttribute("type", "text/css");
				link.setAttribute("href", rxcUrlCSS);
				link.setAttribute("rel", "stylesheet");
				link.setAttribute("id", "RxcCss");
				document.body.appendChild(link);
			}
		}

		function loadJS() {
			if (! jsLoaded) {
				const src = rxcUrlJS;
				const script = document.createElement("script");
				script.setAttribute("type", "text/javascript");
				script.setAttribute("id", "RxcJs");
				script.src = src;
				script.onload = function () {
					opsm.rx.jsSuccessLoaded();
					opsm.rx.openPanel();
				};
				script.onerror = function () {};
				document.head.appendChild(script);
			} 
		}
		
		function loadTranslation() {
			if (! translationLoaded) {
				window.rxcTranslations = {
					en_AU: {
                        steps: {
                        	type: {
                    			title: "Choose your vision need",
                    			titleMobile: "Choose your vision need"
                        	},
                            color: {
                                confirmedTitle: "Colour:",
                                title: "Choose your lens colour",
                                titleMobile: "Choose your lens colour",
                                polarized: "Polarised only",
                                applyAndContinue: "Apply",
                                subtitle: "Enhanced color and contrast so you can see more detail"
                            },
                            treatments: {
                            	addToBag:"Add to cart"
                            },
                            review: {
                            	paymentInstallments: {
                            		modal: {
                            			afterpay: "With Afterpay, make 4 interest-free payments, every two weeks. You must be over 18, a resident of the country offering Afterpay, and meet additional eligibility criteria to qualify. Late fees may apply. Your first instalment may be due at the time of purchase. Estimated payment amounts shown on product pages exclude taxes and shipping charges, " +
                            					"which are added at checkout.<a target='_blank' href='https://www.afterpay.com/en-AU/terms-of-service'>Click here</a> for complete terms." 
                            		}
                            	}
                            },
                            advancedPrescription: {
                            	manual: {
                            		card: {
                            			description: 'This is our quickest and most popular method. We will then recommend the most suitable lens type.',
                            		},
                                    continueModal: {
                                        title: "Send prescription later",
                                        message: "By clicking on continue, you will be skipping the prescription step. We’ll ask you again during checkout, and after your order confirmation, you can either upload it or select it from my account.",
                                        continue: "Yes, continue",
                                        cancel: "No, go back"
                                    }
                            	},
                            	later: {
                                	card: {
                                		description: 'We’ll ask you again during checkout, and after your order confirmation, you can either upload it or select it from my account.',
                                	}
                                }
                            }
                        },
                        fallbackImageMessageTitle: "Lens colour preview not available"
                    }
				};
			}
		}

		function loadRXInfo(productId) {
			return $.ajax({
				url: "/AjaxRxInfo",
				data: {
					productId: productId,
					storeId: store_id,
					langId: lang_id,
					catalogId: catalog_id,
					itemId: $('#catEntryId').val(),
					reqType: 'ajax'
				},
				type: "GET",
				dataType: 'json',
				success: function(response){
					var brandImageUrlLP = $("#imagesDir").val() + "/brand/" + $("#brandImageName").val() + ".jpg";
					config.lensesData = response.lensesData;
					if (typeof response.framePrice !== "undefined" && response.framePrice !== null) {
						config.data.frame.offerPrice = response.framePrice;
						config.data.frame.listPrice = response.framePrice;
						config.data.frame.brandImageUrl = brandImageUrlLP;
					}
					responseLoaded = true;
					openPanel();
				}
			});
		}

		function populateFrameData(){
			config.data = JSON.parse(document.getElementById("rx-frame-info").innerHTML);
		}

		$(document).ready(function() {
			$('body').on('click', '.editRxPanel', function (e) {
				opsm.rx.openEditPanel(e)
			});
		});
		
		return {
			init : init,
			addToCartRX: addToCartRX,
			deleteFromCartRX: deleteFromCartRX,
			openNewPanel: openNewPanel,
			openEditPanel: openEditPanel,
			openPanel: openPanel,
			jsSuccessLoaded: jsSuccessLoaded,
			translationSuccessLoaded: translationSuccessLoaded
		};

		function fixConfig() {
			if (typeof config.lensesData !== "undefined" && config.lensesData !== null &&
				typeof config.lensesData.packages !== "undefined" && config.lensesData.packages !== null &&
				typeof config.lensesData.packages.length !== "undefined" && config.lensesData.packages.length > 0) {
				for (var i = 0; i < config.lensesData.packages.length; i++) {
					var singlePackage = config.lensesData.packages[i];
					if (singlePackage.lensPackage.type === "FRAME_ONLY") {
						singlePackage.lensPackage.upc = config.data.frameOnlyLensUPC;
					}
				}
			}
			if (typeof config.lensesData !== "undefined" && config.lensesData !== null &&
				typeof config.lensesData.content !== "undefined" && config.lensesData.content !== null) {
				if (typeof config.lensesData.content.blueLight !== "undefined" && config.lensesData.content.blueLight !== null) {
					for (let j in config.lensesData.content.blueLight) {
						const blueLightContent = config.lensesData.content.blueLight[j],
							blueLightDescription = blueLightContent.description;
						if (blueLightDescription.indexOf("\r\n") !== -1) {
							const blueLightDescriptionArray = blueLightDescription.split("\r\n");
							blueLightContent.longTitle = blueLightDescriptionArray[0];
							blueLightContent.description = blueLightDescriptionArray[1];
						}
					}
				}
				if (typeof config.lensesData.content.antiReflective !== "undefined" && config.lensesData.content.antiReflective !== null) {
					for (let j in config.lensesData.content.antiReflective) {
						const antiReflectiveContent = config.lensesData.content.antiReflective[j],
							antiReflectiveDescription = antiReflectiveContent.description;
						if (antiReflectiveDescription.indexOf("\r\n") !== -1) {
							const antiReflectiveDescriptionArray = antiReflectiveDescription.split("\r\n");
							antiReflectiveContent.longTitle = antiReflectiveDescriptionArray[0];
							antiReflectiveContent.description = antiReflectiveDescriptionArray[1];
						}
					}
				}
			}
		}
	}());
}(window, document, jQuery, opsm));

jQuery(opsm.rx.init);
