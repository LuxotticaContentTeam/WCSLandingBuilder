/* One Click Reorder */
var ocr = {
	isMobile: false,
	storeId: null,
	catalogId: null,
	userId: null,
	lp : null,
	lpLoading: false,
	reorderStarted:false,

	init : function() {
		
		$.ajax({
			type: "GET",
			url: '/wcs/resources/store/' + constants.ajaxParams['storeId'] + '/usercontext/@self/contextdata',
			traditional: true,
			data: null,
			dataType: null,
			cache: false,
			
			headers: {
				'Cache-Control': 'no-cache',
				"Pragma": "no-cache"
			},
			
			success: function (data) {

				if (data && data.basicInfo) {
					constants.ajaxParams['userId'] = data.basicInfo.runAsId;
				} 
				
				// Get storeId and userId from constants
				if (constants && constants.ajaxParams
					&& constants.ajaxParams['storeId'] && constants.ajaxParams['catalogId']
					&& constants.ajaxParams['userId']) {
					
					ocr.storeId = constants.ajaxParams['storeId'];
					ocr.catalogId = constants.ajaxParams['catalogId'];
					ocr.userId = constants.ajaxParams['userId'];

					if ($('input#isOCRMobile').length) {
						ocr.isMobile = $('input#isOCRMobile').val();

						if (ocr.isMobile == 'true') {
							ocr.isMobile = true;

		                    // Mobile
		                    if ($('.ocr-plp-login-container').length) {
		                        ocr.loadLastPurchase(ocr.storeId, ocr.userId, function() {
		                            ocr.setupOCR();
		                            ocr.initPLPAccordion();
		                            ocr.initHeaderAccordion();
		                        });
		                    } else {
		                        ocr.loadLastPurchase(ocr.storeId, ocr.userId, function() {
		                            ocr.setupOCR();
		                            ocr.initHeaderAccordion();
		                        });
		                    }
						} else if (ocr.isMobile == 'false') {
							ocr.isMobile = false;

							// Desktop
							// If OCR is enabled in PLP and page is PLP, load last purchase data immediately
							if ($('.ocr-plp-login-container').length) {
								ocr.loadLastPurchase(ocr.storeId, ocr.userId, function() {
									ocr.setupOCR();
									ocr.initPLPCarousel();
									ocr.bindHeaderEvents();
								});
							} else {
								// If OCR is disabled in PLP or page is not PLP
								ocr.bindHeaderEvents();
							}
						} else {
							console.error('Unable to load OCR: invalid value for isMobile');
						}
					} else {
						console.error('Unable to load OCR: isMobile not found');
					}
				} else {
					console.error('Unable to load OCR: userId, catalogId or storeId not found');
				}
				
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.error('Unable to load getUserParams - usercontext/@self/contextdata');
			}
		});


	},
	
	loadLastPurchase: function(storeId, userId, callback) {
		if (!ocr.lpLoading) {
			ocr.setLastPurchaseLoading(true);

			$.get('/wcs/resources/ocr/' + storeId + '/lastContactLensesOrder/' + userId, function(data) {
				var responseData = data.response.data;

				if (responseData) {
					ocr.lp = {};

					// Clone response object
					$.extend(ocr.lp, responseData.dataContent);
				}
			})
			.done(function() {
				if (ocr.lp !== null) {
					callback();
				}
			})
			.fail(function() {
				console.error('Unable to load OCR last purchase');
			});
		}
	},

	bindHeaderEvents: function() {
//		var $contactsNavLink = $('#contacts_nav_link');
		
//		$contactsNavLink.on('mouseenter.ocr', function() {
			// If last purchase data is not loaded
			if (ocr.lp == null) {
				ocr.loadLastPurchase(ocr.storeId, ocr.userId, function() {
					ocr.setupOCR();
					ocr.initHeaderCarousel();
				});
			} else {
				// If last purchase data has already loaded
				ocr.setupOCR();
				ocr.initHeaderCarousel();
				ocr.setLastPurchaseLoading(false);
			}
//		});
	},

	setupOCR: function() {
		if (ocr.lp.userType == 'R') {
			$('.ocr-username').html(ocr.lp.userName);

			if (ocr.lp.contactInfo !== null && ocr.lp.contactInfo.length > 0) {
				/* If user is logged and has at least one eligible order */
				ocr.showLastPurchase();
			} else {
				/* If user is logged with no eligible order */
				ocr.showLogin();
			}
		} else if (ocr.lp.userType == 'G') {
			/* If user is guest */
			ocr.showLogin();
		}
	},

	showLastPurchase: function() {
		if (ocr.lp !== null && ocr.lp.contactInfo.length > 0) {
//			if (!ocr.isMobile) {
				// Desktop
				var $ocrHeaderLP = $('.ocr-header-lp');
				var $ocrPLPCarouselContainer = $('.ocr-plp-carousel-container');

				if ($ocrHeaderLP.length) {
					$('.nav-title .content.contact-lenses ul.link-list li.contact-brand')
						.not('.ocr-header-lp').removeClass('cl_brand_hovered');
					$ocrHeaderLP.removeClass('hide').addClass('cl_brand_hovered');
					$('.ocr-guest-content').addClass('hide');
				}
	
				if ($ocrPLPCarouselContainer.length) {
					$ocrPLPCarouselContainer.removeClass('hide');
					
				}
//			} else {
//				// Mobile
//				var $ocrAccordion = $('.ocr-accordion');
//
//				if ($ocrAccordion.length) {
//					$ocrAccordion.removeClass('hide');
//				}
//			}

			$('.ocr-reorder-all').one('click', function() {
				if(!ocr.reorderStarted){
					$(this).attr("disabled", true);
					ocr.reorderStarted=true;
					ocr.performReorder(ocr.lp.lastOrderId, ocr.lp.storeId,
					ocr.catalogId, -1, ocr.lp.lastOrderAddressId);
					$(this).removeAttr('disabled');
				}
				
			});
		}
	},

	showLogin: function() {
		if (ocr.lp.userType == 'R') {
			$('.ocr-guest-content').addClass('hide');
			$('.ocr-start-content').removeClass('hide');
		} else if(ocr.lp.userType == 'G') {
			$('.ocr-guest-content .ocr-button').one('click', function() {
				ocr.login();
			});
		}
		
		if (!ocr.isMobile) {
			$('.nav-title .content.contact-lenses ul.link-list').addClass('ocr-header-cl-margin');
		}
		
		$('.ocr-login-container').removeClass('hide');
	},

	populateHeaderCarousel: function() {
		var $ocrHeaderCarousel = $('.ocr-header-carousel');

		if (!$ocrHeaderCarousel.hasClass('slick-initialized')) {
			$ocrHeaderCarousel.empty();

			if (ocr.lp.contactInfo.length > 0) {
				var ocrHeaderCarouselContent = '';

				for (var i = 0; i < ocr.lp.contactInfo.length; i++) {
					var contact = ocr.lp.contactInfo[i];
					var boxListPrice = parseFloat(contact.pricePerBox).toFixed(2);
					var boxOfferPrice = ocr.getContactLensBoxPrice(contact.partnumber, contact.totQuantity);
					var template;
					if(contact.productURL !=undefined && contact.productURL.length>0){
						template = '<div><div class="ocr-product"><a href="'+contact.productURL+'"><img class="ocr-product-image" src="https://assets.lenscrafters.com/extra/image/LensCrafters/contacts_pim/' + contact.partnumber
						+ '_fr.png?imwidth=179" data-element-id="D_X_MainNav_ContactL-ReorderProd" /></a>';
					}else{
                        template = '<div><div class="ocr-product"><div class= "ocr-carousel-product-display"><img class="ocr-product-image" src="https://assets.lenscrafters.com/extra/image/LensCrafters/contacts_pim/' + contact.partnumber
						+ '_fr.png?imwidth=179" data-element-id="D_X_MainNav_ContactL-ReorderProd" />';
					}
					template = template + '<div class="ocr-product-name">' 
					    + contact.name + '</div></div><div class="divider"></div><div class="ocr-product-price">' 
					    + '<span class="ocr-product-qty">Quantity: ' + contact.totQuantity + ' boxes</span>';

					if (boxOfferPrice !== null) {
						template += '<span class="ocr-product-listprice strikethrough">$' + boxListPrice + '</span>'
							+ '<span class="ocr-product-offerprice">$' + boxOfferPrice + '</span>';
					} else {
						template += '<span class="ocr-product-listprice">$' + boxListPrice + '</span>';
					}

					template += '<span class="ocr-product-per-box">per box</span></div></div></div>';
					
					ocrHeaderCarouselContent += template;
				}

				$ocrHeaderCarousel.html(ocrHeaderCarouselContent);
			}
		}
	},

	populatePLPCarousel: function() {
		var $ocrPLPCarousel = $('.ocr-plp-carousel');

		if (!$ocrPLPCarousel.hasClass('slick-initialized')) {
			$ocrPLPCarousel.empty();

			if (ocr.lp.contactInfo.length > 0) {
				var ocrPLPCarouselContent = '';

				for (var i = 0; i < ocr.lp.contactInfo.length; i++) {
					var contact = ocr.lp.contactInfo[i];
					var boxListPrice = parseFloat(contact.pricePerBox).toFixed(2);
					var boxOfferPrice = ocr.getContactLensBoxPrice(contact.partnumber, contact.totQuantity);
					var template;
					if(contact.productURL !=undefined && contact.productURL.length>0){
                        template = '<div><div class="ocr-product"><a href="'+contact.productURL+'"><img class="ocr-product-image" src="//https://assets.lenscrafters.com/extra/image/LensCrafters/contacts/' + contact.partnumber
						+ '_fr.png?imwidth=179" data-element-id="X_PLP_Header_ReorderNow" /></a>';
					}else{
						template = '<div><div class="ocr-product"><img class="ocr-product-image" src="//https://assets.lenscrafters.com/extra/image/LensCrafters/contacts/' + contact.partnumber
						+ '_fr.png?imwidth=179" data-element-id="X_PLP_Header_ReorderNow" />';
					}
					template = template + '<div class="ocr-product-name-container"><div class="ocr-product-name">' 
					    + contact.name + '</div>'
						+ '<div class="ocr-product-qty">Quantity: ' + contact.totQuantity + ' boxes</div>'
						+ '<div class="ocr-product-price">';

					if (boxOfferPrice !== null) {
						template += '<span class="ocr-product-listprice strikethrough">$' + boxListPrice + '</span>'
							+ '<span class="ocr-product-offerprice">$' + boxOfferPrice + '</span>';
					} else {
						template += '<span class="ocr-product-listprice">$' + boxListPrice + '</span>';
					}

					template += '<span class="ocr-product-per-box">per box</span></div></div></div></div>';
					
					ocrPLPCarouselContent += template;
				}

				$ocrPLPCarousel.html(ocrPLPCarouselContent);
			}
		}
	},

	getContactLensBoxPrice : function(partnumber, quantity) {
		var boxOfferPrice = null;

		// Get box price from ASP if available
		if (typeof DISCOUNTS_MAP !== 'undefined' && DISCOUNTS_MAP[partnumber]) {
			$.each(DISCOUNTS_MAP[partnumber], function(key, value) {
				if (!isNaN(key) && (quantity >= parseInt(key)) && value.u && (boxOfferPrice == null)) {
					boxOfferPrice = parseFloat(value.u).toFixed(2);
				}
			});
		}

		return boxOfferPrice;
	},

	setLastPurchaseLoading: function(loading) {
		if (ocr.lpLoading !== loading) {
			ocr.lpLoading = loading;
		}

		$('.ocr-lp-loader-container').toggleClass('hide', !ocr.lpLoading);
	},

	initHeaderCarousel: function() {
		if (ocr.lp.contactInfo !== null && ocr.lp.contactInfo.length > 0) {
			setTimeout(function() {
				ocr.populateHeaderCarousel();

				var $ocrHeaderCarouselContainer = $('.ocr-header-carousel-container');
				var $ocrHeaderCarousel = $ocrHeaderCarouselContainer.find('.ocr-carousel');

				if (!$ocrHeaderCarousel.hasClass('slick-initialized')) {
					/* If there are more than 4 products show carousel navigation */
					if (ocr.lp.contactInfo.length > 4) {
//						$ocrHeaderCarouselContainer.find('.ocr-carousel-nav').removeClass('hide');
					}

					/* If there is more than 1 product change label */
					if (ocr.lp.contactInfo.length > 1) {
						$ocrHeaderCarouselContainer.find('.ocr-reorder-all').html('REORDER ALL');
						// TODO  $ocrHeaderCarouselContainer.find('.ocr-carousel-arrows').removeClass('hide');
					}

					$ocrHeaderCarousel.on('init', function(event, slick, direction) {
						$ocrHeaderCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(Math.floor(slick.currentSlide / slick.options.slidesToShow) + 1);
						$ocrHeaderCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-total').html(Math.floor(slick.slideCount / slick.options.slidesToShow) + 1);

						ocr.setLastPurchaseLoading(false);

						$ocrHeaderCarousel.css('visibility', 'visible').hide().fadeIn('slow');
					});

					$ocrHeaderCarousel.on('afterChange', function(slick, currentSlide) {
						$ocrHeaderCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(Math.floor(currentSlide.currentSlide / currentSlide.options.slidesToShow) + 1);
					});

					$ocrHeaderCarousel.slick({
						arrows: true,
						slidesToShow: 1,
						slidesToScroll: 1,
						appendArrows: $ocrHeaderCarouselContainer.find('.ocr-carousel-nav'),
					      prevArrow: $('.prev'),
					      nextArrow: $('.next'),
					});
				} else {
					$ocrHeaderCarousel.slick('resize');
				}
			}, 500);
		}
	},

	initPLPCarousel: function() {
		if (ocr.lp.contactInfo !== null && ocr.lp.contactInfo.length > 0) {
			ocr.populatePLPCarousel();

			var $ocrPLPCarouselContainer = $('.ocr-plp-carousel-container');
			var $ocrPLPCarousel = $ocrPLPCarouselContainer.find('.ocr-carousel');

			if (!$ocrPLPCarousel.hasClass('slick-initialized')) {
				/* If there is more than 1 product change label */
				if (ocr.lp.contactInfo.length > 1) {
					$ocrPLPCarouselContainer.find('.ocr-carousel-nav').removeClass('hide');
					$ocrPLPCarouselContainer.find('.ocr-reorder-all').html('REORDER ALL');
				}

				$ocrPLPCarousel.on('init', function(event, slick, direction) {
					$ocrPLPCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(slick.currentSlide + 1);
					$ocrPLPCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-total').html(slick.slideCount);

					ocr.setLastPurchaseLoading(false);

					$ocrPLPCarousel.css('visibility', 'visible').hide().fadeIn('slow');
				});

				$ocrPLPCarousel.on('afterChange', function(slick, currentSlide) {
					$ocrPLPCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(currentSlide.currentSlide + 1);
				});

				$ocrPLPCarousel.slick({
					arrows: true,
					appendArrows: $('.ocr-plp-carousel-container .ocr-carousel-nav'),
					draggable: false,
					speed: 0,
					waitForAnimate: false
				});
			}
		}
    },
    initHeaderAccordion: function() {
        var $ocrHeaderAccordion = $('.ocr-header-accordion');
        var $ocrAccordionHeader = $ocrHeaderAccordion.find('.ocr-accordion-header');
        var $ocrAccordionContent = $ocrHeaderAccordion.find('.ocr-accordion-content');

        $ocrAccordionHeader.on('click', function(event) {
            event.preventDefault();
    
            $ocrAccordionContent.slideToggle(500, function() {
                $ocrAccordionHeader.toggleClass('open');
    
                ocr.initMobileHeaderCarousel();
            });
        });
    },
    initPLPAccordion: function() {
        var $ocrHeaderAccordion = $('.ocr-plp-accordion');
        var $ocrAccordionHeader = $ocrHeaderAccordion.find('.ocr-accordion-header');
        var $ocrAccordionContent = $ocrHeaderAccordion.find('.ocr-accordion-content');

        $ocrAccordionHeader.on('click', function(event) {
            event.preventDefault();
    
            $ocrAccordionContent.slideToggle(500, function() {
                $ocrAccordionHeader.toggleClass('open');
    
                ocr.initMobilePLPCarousel();
            });
        });
    },
    populateMobileHeaderCarousel: function() {
        if (ocr.isMobile) {
            var $ocrMobileHeaderCarousel = $('.ocr-header-carousel');

            if (!$ocrMobileHeaderCarousel.hasClass('slick-initialized')) {
                $ocrMobileHeaderCarousel.empty();

                if (ocr.lp.contactInfo.length > 0) {
                    var ocrMobileHeaderCarouselContent = '';

                    for (var i = 0; i < ocr.lp.contactInfo.length; i++) {
                        var contact = ocr.lp.contactInfo[i];
                        var boxListPrice = parseFloat(contact.pricePerBox).toFixed(2);
                        var boxOfferPrice = ocr.getContactLensBoxPrice(contact.partnumber, contact.totQuantity);
                        var template;
					    if(contact.productURL !=undefined && contact.productURL.length>0){
                            template = '<div><div class="ocr-product"><a href="'+contact.productURL+'"><img class="ocr-product-image" src="//https://assets.lenscrafters.com/extra/image/LensCrafters/contacts/' + contact.partnumber
                            + '?$pngalpha$&wid=179" data-element-id="M_X_MainNav_ContactL-ReorderProd" /></a>';                            
					    }else{
					    	template = '<div><div class="ocr-product"><img class="ocr-product-image" src="//https://assets.lenscrafters.com/extra/image/LensCrafters/contacts/' + contact.partnumber
                            + '?$pngalpha$&wid=179" data-element-id="M_X_MainNav_ContactL-ReorderProd" />';
					    }
                        template = template + '<div class="ocr-product-name">' + contact.name + '</div>'
                            + '<div class="ocr-product-qty">Quantity: ' + contact.totQuantity + ' boxes</div>'
                            + '<div class="ocr-product-price">';
                        

                        if (boxOfferPrice !== null) {
                            template += '<span class="ocr-product-listprice strikethrough">$' + boxListPrice + '</span>'
                                + '<span class="ocr-product-offerprice">$' + boxOfferPrice + '</span>';
                        } else {
                            template += '<span class="ocr-product-listprice">$' + boxListPrice + '</span>';
                        }

                        template += '<span class="ocr-product-per-box">per box</span></div></div></div>';
                        
                        ocrMobileHeaderCarouselContent += template;
                    }

                    $ocrMobileHeaderCarousel.html(ocrMobileHeaderCarouselContent);
                }
            }
        }
    },
    initMobileHeaderCarousel: function() {
        if (ocr.isMobile) {
            if (ocr.lp.contactInfo !== null && ocr.lp.contactInfo.length > 0) {
                ocr.populateMobileHeaderCarousel();
    
                var $ocrMobileHeaderCarouselContainer = $('.ocr-header-carousel-container');
                var $ocrMobileHeaderCarousel = $ocrMobileHeaderCarouselContainer.find('.ocr-carousel');
    
                if (!$ocrMobileHeaderCarousel.hasClass('slick-initialized')) {
                    /* If there is more than 1 product change label */
                    if (ocr.lp.contactInfo.length > 1) {
                        $ocrMobileHeaderCarouselContainer.find('.ocr-carousel-nav').removeClass('hide');
                        $ocrMobileHeaderCarouselContainer.find('.ocr-reorder-all').html('REORDER ALL');
                    }
    
                    $ocrMobileHeaderCarousel.on('init', function(event, slick, direction) {
                        $ocrMobileHeaderCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(slick.currentSlide + 1);
                        $ocrMobileHeaderCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-total').html(slick.slideCount);
    
                        ocr.setLastPurchaseLoading(false);
    
                        $ocrMobileHeaderCarousel.css('visibility', 'visible').hide().fadeIn('slow');
                    });
    
                    $ocrMobileHeaderCarousel.on('afterChange', function(slick, currentSlide) {
                       $ocrMobileHeaderCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(currentSlide.currentSlide + 1);
                    });
    
                    $ocrMobileHeaderCarousel.slick({
                        arrows: true,
                        appendArrows: $ocrMobileHeaderCarouselContainer.find('.ocr-carousel-nav'),
                    });
                }
            }
        }
    },
    populateMobilePLPCarousel: function() {
        if (ocr.isMobile) {
            var $ocrMobilePLPCarousel = $('.ocr-plp-carousel');

            if (!$ocrMobilePLPCarousel.hasClass('slick-initialized')) {
                $ocrMobilePLPCarousel.empty();

                if (ocr.lp.contactInfo.length > 0) {
                    var ocrMobilePLPCarouselContent = '';

                    for (var i = 0; i < ocr.lp.contactInfo.length; i++) {
                        var contact = ocr.lp.contactInfo[i];
                        var boxListPrice = parseFloat(contact.pricePerBox).toFixed(2);
                        var boxOfferPrice = ocr.getContactLensBoxPrice(contact.partnumber, contact.totQuantity);
                        var template;
					    if(contact.productURL !=undefined && contact.productURL.length>0){
					    	template = '<div><div class="ocr-product"><a href="'+contact.productURL+'"><img class="ocr-product-image" src="//https://assets.lenscrafters.com/extra/image/LensCrafters/contacts/' + contact.partnumber
                            + '?_fr.png?imwidth=179" data-element-id="X_PLP_Header_ReorderNow" /></a>';
					    }else{
					    	template = '<div><div class="ocr-product"><img class="ocr-product-image" src="//https://assets.lenscrafters.com/extra/image/LensCrafters/contacts/' + contact.partnumber
                            + '?_fr.png?imwidth=179" data-element-id="X_PLP_Header_ReorderNow" />';
					    }
					    template = template + '<div class="ocr-product-name">' + contact.name + '</div>'
                            + '<div class="ocr-product-qty">Quantity: ' + contact.totQuantity + ' boxes</div>'
                            + '<div class="ocr-product-price">';
                        

                        if (boxOfferPrice !== null) {
                            template += '<span class="ocr-product-listprice strikethrough">$' + boxListPrice + '</span>'
                                + '<span class="ocr-product-offerprice">$' + boxOfferPrice + '</span>';
                        } else {
                            template += '<span class="ocr-product-listprice">$' + boxListPrice + '</span>';
                        }

                        template += '<span class="ocr-product-per-box">per box</span></div></div></div>';
                        
                        ocrMobilePLPCarouselContent += template;
                    }

                    $ocrMobilePLPCarousel.html(ocrMobilePLPCarouselContent);
                }
            }
        }
    },
    initMobilePLPCarousel: function() {
        if (ocr.isMobile) {
            if (ocr.lp.contactInfo !== null && ocr.lp.contactInfo.length > 0) {
                ocr.populateMobilePLPCarousel();
    
                var $ocrMobilePLPCarouselContainer = $('.ocr-plp-carousel-container');
                var $ocrMobilePLPCarousel = $ocrMobilePLPCarouselContainer.find('.ocr-carousel');
    
                if (!$ocrMobilePLPCarousel.hasClass('slick-initialized')) {
                    /* If there is more than 1 product change label */
                    if (ocr.lp.contactInfo.length > 1) {
                        $ocrMobilePLPCarouselContainer.find('.ocr-carousel-nav').removeClass('hide');
                        $ocrMobilePLPCarouselContainer.find('.ocr-reorder-all').html('REORDER ALL');
                    }
    
                    $ocrMobilePLPCarousel.on('init', function(event, slick, direction) {
                        $ocrMobilePLPCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(slick.currentSlide + 1);
                        $ocrMobilePLPCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-total').html(slick.slideCount);
    
                        ocr.setLastPurchaseLoading(false);
    
                        $ocrMobilePLPCarousel.css('visibility', 'visible').hide().fadeIn('slow');
                    });
    
                    $ocrMobilePLPCarousel.on('afterChange', function(slick, currentSlide) {
                       $ocrMobilePLPCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(currentSlide.currentSlide + 1);
                    });
    
                    $ocrMobilePLPCarousel.slick({
                        arrows: true,
                        appendArrows: $ocrMobilePLPCarouselContainer.find('.ocr-carousel-nav'),
                    });
                }
            }
        }
	},
	performReorder: function (orderId, storeId, catalogId, langId,addressId) {
		var params = {
			storeId: storeId,
			catalogId: catalogId,
			langId: langId,
			fromOrderId_1: orderId,
			billingAddressId: addressId,
			toOrderId: '.**.',
			ocrOrder: true,
			orderIncludesContactLenses: true,
			URL: 'AjaxOrderCalculate?URL=MyAccount&updatePrices=1&calculationUsageId=-1'
		};

		$.ajax({
			type: "GET",
			url: getAbsoluteURL() + 'AjaxOrderCopy',
			traditional: true,
			data: params,
			dataType: 'html',
			success: function (data) {
				if (data.indexOf("errorCode") > 0) {
					console.error('Cannot reorder order ' + orderId);
				}
				else {
					window.location.href = "OrderPaymentView?reorder=true&storeId=" + storeId + "&catalogId=" + catalogId + "&langId=-1";;
				}
				ocr.reorderStarted=false;
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.error('Cannot reorder order ' + orderId);
				ocr.reorderStarted=false;
			}
		});
	},
	login: function() {
		window.location.href = '/LogonForm?storeId=' + ocr.storeId + '&langId=-1&catalogId=' + ocr.catalogId + '&URL=' + encodeURIComponent(window.location.href);
	},
	performReorderFromListDetail: function (orderId, storeId, catalogId, langId, fromList,addressId) {
		if(!ocr.reorderStarted){
			var btnClass = fromList? "reorderListButton": "detailReorderButton";
			$('.'+btnClass).attr("disabled", true);
			ocr.reorderStarted=true;
			ocr.performReorder(orderId, storeId, catalogId, langId,addressId);
			$('.'+btnClass).removeAttr('disabled');
		}
	}
};