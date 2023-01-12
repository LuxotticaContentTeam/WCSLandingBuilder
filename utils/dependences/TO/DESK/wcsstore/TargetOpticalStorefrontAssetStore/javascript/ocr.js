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
                    ocr.loadLastPurchase(ocr.storeId, ocr.userId, function() {
                    	ocr.setupOCR();
	                    
                    	if ($('.ocr-plp-login-container').length) {
	                            ocr.initPLPAccordion();
	                           //ocr.initHeaderAccordion();
	                    }
	                       
	                    $('#mobile-menu-reorder-section>a').on('click', function(){
					    	if(!$('.ocr-header-carousel').hasClass('slick-initialized')){
					    	   ocr.initHeaderAccordion();
					    	}
					    });                       
                    
                    });
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
		var $contactsNavBtn= $('#showReorderPanel');

		$contactsNavBtn.on('click', function() {
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
			}
		});
		
	},

	setupOCR: function() {
		if (ocr.lp.userType == 'R') {
			
			if (ocr.isMobile) {
			/* show accordion */
			$('#accordionText').html('Reorder yourlast purchase');
			$('#accordionArrow').addClass('fa-chevron-down').removeClass('fa-chevron-right');
			$('#accordionLink').attr('href','#collapse-reorder');
			$('#collapse-reorder').css('visibility','visible');
			}
			
			if(ocr.lp.userName !== null && ocr.lp.userName.length > 0){
				$('.ocr-username').html(ocr.lp.userName);
				$('.userNameSp').hide();
			}
			if (ocr.lp.contactInfo !== null && ocr.lp.contactInfo.length > 0) {
				/* If user is logged and has at least one eligible order */
				
				ocr.showLastPurchase();
				if (!ocr.isMobile) {
					$('.ocr-header-carousel-container').css('visibility','visible');
				}
			} else {
				/* If user is logged with no eligible order */
				/* show login */
				ocr.showLogin();
				if (!ocr.isMobile) {
					$('.ocr-header-carousel-container').css('visibility','visible');
				}
			}
		} else if (ocr.lp.userType == 'G') {
			/* If user is guest */
			ocr.showLogin();
			if (!ocr.isMobile) {
				$('.ocr-header-carousel-container').css('visibility','visible');
			}	
		}
	},

	showLastPurchase: function() {
		if (ocr.lp !== null && ocr.lp.contactInfo.length > 0) {
			if (!ocr.isMobile) {
				// Desktop
				var $ocrHeaderLP = $('.ocr-header-lp');
				var $ocrPLPCarouselContainer = $('.ocr-plp-carousel-container');

				if ($ocrHeaderLP.length) {
					$('.nav-title .content.contact-lenses ul.link-list li.contact-brand')
						.not('.ocr-header-lp').removeClass('cl_brand_hovered');
	
					$ocrHeaderLP.removeClass('hide').addClass('cl_brand_hovered');
				}
	
				if ($ocrPLPCarouselContainer.length) {
					$ocrPLPCarouselContainer.removeClass('hide');
				}
			} else {
				// Mobile
				var $ocrAccordion = $('.ocr-accordion');

				if ($ocrAccordion.length) {
					$ocrAccordion.removeClass('hide');
				}
			}

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
	showLogin: function(event) {
		if (ocr.lp.userType == 'R') {
			$('.ocr-guest-content').addClass('hide');
			$('.ocr-start-content').removeClass('hide');
			$('.ocr-login-container.ocr-plp-login-container').css('background-color','#dde2e6');
		} else if(ocr.lp.userType == 'G') {
			$('.ocr-guest-content .ocr-button').one('click', function(event) {
				if(ocr.isMobile){
                    if(event.target.className.indexOf('register')>0){
                        ocr.register();
                    }else{
                    	ocr.mobileLogin();
                    }
                    
				}else{
					ocr.login();
				}
				
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
			//$ocrHeaderCarousel.empty();

			if (ocr.lp.contactInfo.length > 0) {
				var ocrHeaderCarouselContent = '';

				for (var i = 0; i < ocr.lp.contactInfo.length; i++) {
					var contact = ocr.lp.contactInfo[i];
					var boxListPrice = parseFloat(contact.pricePerBox).toFixed(2);
					var partnumber = contact.partnumber.toLowerCase();
					var boxOfferPrice = ocr.getContactLensBoxPrice(partnumber, contact.totQuantity);
					var template;
					var productUrl='';
					if(contact.productURL !=undefined && contact.productURL.length>0){
						template = '<div><div class="ocr-product"><a data-element-id="X_X_MainNav_PDP" data-description="'+contact.name+'" href="'+contact.productURL+'"><img class="ocr-product-image" src="https://assets.targetoptical.com/extra/image/TargetOptical/contacts/' + contact.partnumber
						+ '_fr.png?imwidth=179"/></a>';
					}else{
						productUrl = getAbsoluteURL()+'ProductDisplay?storeId='+ocr.lp.storeId+'&productId='+ocr.lp.contactInfo[i].catEntryId+'&urlRequestType=Base&langId=-1&catalogId=12751';
						template = '<div><div class="ocr-product"><a data-element-id="X_X_MainNav_PDP" data-description="'+contact.name+'" href="'+productUrl+'"><img class="ocr-product-image" src="https://assets.targetoptical.com/extra/image/TargetOptical/contacts/' + contact.partnumber
						+ '_fr.png?imwidth=179"/></a>';
					}
					template = template + '<div class="ocr-product-name">' 
					    + contact.name + '</div><div class="ocr-product-qty">Quantity: ' + contact.totQuantity + ' boxes</div>'
						+ '<div class="ocr-product-price">';

					if (boxOfferPrice !== null) {
						
						template += '<span class="ocr-product-listprice strikethrough">$' + boxListPrice + '</span>';
						template +='<span class="ocr-product-offerprice">$' + boxOfferPrice + '</span>';
						template += '<span class="ocr-product-per-box">per box with instant savings</span>';
							
					} else {
						template += '<span class="ocr-product-listprice">$' + boxListPrice + '</span>';
						template += '<span class="ocr-product-per-box">per box </span>';
					}

					template += '</div></div></div>';
					
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
					var partnumber = contact.partnumber.toLowerCase();
					var boxOfferPrice = ocr.getContactLensBoxPrice(partnumber, contact.totQuantity);
					var template;
					var productUrl='';
					if(contact.productURL !=undefined && contact.productURL.length>0){
                        template = '<div><div class="ocr-product"><div class="ocr-image-container"><a data-element-id="X_PLP_Header_ReorderProd" href="'+contact.productURL+'"><img class="ocr-product-image" src="https://assets.targetoptical.com/extra/image/TargetOptical/contacts/' + contact.partnumber
						+ '_fr.png?imwidth=179" /></a></div>';
					}else{
						productUrl = getAbsoluteURL()+'ProductDisplay?storeId='+ocr.lp.storeId+'&productId='+ocr.lp.contactInfo[i].catEntryId+'&urlRequestType=Base&langId=-1&catalogId=12751';
						template = '<div><div class="ocr-product"><div class="ocr-image-container"><a data-element-id="X_PLP_Header_ReorderProd" href="'+productUrl+'"><img class="ocr-product-image" src="https://assets.targetoptical.com/extra/image/TargetOptical/contacts/' + contact.partnumber
						+ '_fr.png?imwidth=179"/></a></div>';
					}
					template = template + '<div class="ocr-product-name-container"><div class="ocr-product-name">' 
					    + contact.name + '</div><div class="ocr-product-brand">'+contact.brandName+'</div>'
						+ '<div class="ocr-product-qty">Quantity: ' + contact.totQuantity + '</div>'
						+ '<div class="ocr-product-price">';

					if (boxOfferPrice !== null) {
						template += '<span class="ocr-product-listprice strikethrough">$' + boxListPrice + '</span>';
						template +='<span class="ocr-product-offerprice">$' + boxOfferPrice + '</span>';
						template += '<span class="ocr-product-per-box">per box with instant savings</span>';
					} else {
						template += '<span class="ocr-product-listprice">$' + boxListPrice + '</span>';
						template += '<span class="ocr-product-per-box">per box</span>';
					}

					template += '</div></div></div></div>';
					
					ocrPLPCarouselContent += template;
				}

				$ocrPLPCarousel.html(ocrPLPCarouselContent);
				$('.ocr-carousel-title.ocr-contacts-icon').removeClass('hidden-element');
			}
		}
	},

	getContactLensBoxPrice : function(partnumber, quantity) {
		var boxOfferPrice = null;
		// Get box price from ASP if available
		if (typeof DISCOUNTS_MAP !== 'undefined' && DISCOUNTS_MAP[partnumber]) {
			$.each(DISCOUNTS_MAP[partnumber], function(key, value) {
				if (!isNaN(key) && quantity>= key && value.u) {
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
					/* If there are more than 1 products show carousel navigation */
					if (ocr.lp.contactInfo.length > 1) {
						$ocrHeaderCarouselContainer.find('.ocr-carousel-nav').removeClass('hide');
					}

					/* If there is more than 1 product change label */
					if (ocr.lp.contactInfo.length > 1) {
						$ocrHeaderCarouselContainer.find('.ocr-reorder-all').html('REORDER ALL');
					}

					$ocrHeaderCarousel.on('init', function(event, slick, direction) {
						$ocrHeaderCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(Math.floor(slick.currentSlide / slick.options.slidesToShow) + 1);
						$ocrHeaderCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-total').html(slick.slideCount);
                        
                        var progress=100/slick.slideCount;
                        $ocrHeaderCarouselContainer.find('.progress-bar').css('width',progress+'%');
                          
						ocr.setLastPurchaseLoading(false);
                    
						$ocrHeaderCarousel.css('visibility', 'visible').hide().fadeIn('slow');
					});

					$ocrHeaderCarousel.on('afterChange', function(slick, currentSlide) {
						$ocrHeaderCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(Math.floor(currentSlide.currentSlide / currentSlide.options.slidesToShow) + 1);

						var progress=100/ocr.lp.contactInfo.length;
                        $ocrHeaderCarouselContainer.find('.progress-bar').css('width',progress*(currentSlide.currentSlide+ 1)+'%'); 
					});

					$ocrHeaderCarousel.slick({
						arrows: true,
						slidesToShow: 1,
						slidesToScroll: 1,
						appendArrows: $ocrHeaderCarouselContainer.find('.ocr-carousel-nav')
					});
				} else {
					$ocrHeaderCarousel.slick('resize');
				}
			}, 500);
		}else{
            	var $ocrHeaderCarouselContainer = $('.ocr-header-carousel-container');
            	$ocrHeaderCarouselContainer.find('.ocr-button.ocr-reorder-all').html('SHOP CONTACT LENSES').attr('href','/to-us/contact-lenses').addClass('ocr-reorder-btn-shopCL');
            	$ocrHeaderCarouselContainer.find('.ocr-button.ocr-reorder-all').html('SHOP CONTACT LENSES').attr('data-element-id','D_X_MainNav_ContactL-ShopContactL');
            	$ocrHeaderCarouselContainer.find('.ocr-carousel-title').addClass('ocr-title-noOrd');
            	$ocrHeaderCarouselContainer.find('.ocr-carousel-desc').html('complete your first contact lens purchase and you can reorder next time with just one click!').addClass('ocr-desc-noOrd');
            	$ocrHeaderCarouselContainer.addClass('ocr-header-carousel-container-guest');
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

					$ocrPLPCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(slick.currentSlide<8 ? '0'+(slick.currentSlide+ 1) : slick.currentSlide+ 1 );
					$ocrPLPCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-total').html( slick.slideCount<8 ? '0'+slick.slideCount : slick.slideCount );
                    var progress=100/slick.slideCount;
                    $ocrPLPCarouselContainer.find('.progress-bar').css('width',progress+'%');            
					ocr.setLastPurchaseLoading(false);

					$ocrPLPCarousel.css('visibility', 'visible').hide().fadeIn('slow');
				});

				$ocrPLPCarousel.on('afterChange', function(slick, currentSlide) {
					$ocrPLPCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(currentSlide.currentSlide<8 ? '0'+(currentSlide.currentSlide+ 1) : currentSlide.currentSlide+ 1 );
                    var progress=100/ocr.lp.contactInfo.length;
                    $ocrPLPCarouselContainer.find('.progress-bar').css('width',progress*(currentSlide.currentSlide+ 1)+'%'); 

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
		var $ocrHeaderAccordion = $('#collapse-reorder');
		var $ocrAccordionContent = $ocrHeaderAccordion.find('.ocr-accordion-content');
		if(ocr.lp.userType=='G'){
			document.location=$('#mobile-menu-reorder-section a:first').attr('href');
		}
		$ocrAccordionContent.slideToggle(500, function() {
			//$ocrAccordionHeader.toggleClass('open');

			ocr.initMobileHeaderCarousel();
		});
        
    },
    initPLPAccordion: function() {
        var $ocrHeaderAccordion = $('.ocr-plp-accordion');
        var $ocrAccordionHeader = $ocrHeaderAccordion.find('.ocr-accordion-header');
        var $ocrAccordionContent = $ocrHeaderAccordion.find('.ocr-accordion-content');

        $ocrAccordionHeader.on('click', function(event) {
            event.preventDefault();
            if($('.ocr-accordion-subtitle').hasClass('hide')){
				$('.ocr-accordion-subtitle').removeClass('hide');
			}else{
				$('.ocr-accordion-subtitle').addClass('hide');
			}
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
                        var partnumber = contact.partnumber.toLowerCase();
                        var boxOfferPrice = ocr.getContactLensBoxPrice(partnumber, contact.totQuantity);
                        var template;
                        var productUrl='';
					    if(contact.productURL !=undefined && contact.productURL.length>0){
                            template = '<div><div class="ocr-product"><a data-element-id="X_X_MainNav_PDP" data-description="'+contact.name+'" href="'+contact.productURL+'"><img class="ocr-product-image" src="https://assets.targetoptical.com/extra/image/TargetOptical/contacts/' + contact.partnumber
                            + '_fr.png?imwidth=179"/></a>';                            
					    }else{
					    	productUrl = getAbsoluteURL()+'ProductDisplay?storeId='+ocr.lp.storeId+'&productId='+ocr.lp.contactInfo[i].catEntryId+'&urlRequestType=Base&langId=-1&catalogId=12751';
					    	template = '<div><div class="ocr-product"><a data-element-id="X_X_MainNav_PDP" data-description="'+contact.name+'" href="'+productUrl+'"><img class="ocr-product-image" src="https://assets.targetoptical.com/extra/image/TargetOptical/contacts/' + contact.partnumber
                            + '_fr.png?imwidth=179"/></a>';
					    }
                        template = template + '<div class="ocr-product-name">' + contact.name + '</div>'
                            + '<div class="ocr-product-qty">Quantity: ' + contact.totQuantity + ' boxes</div>'
                            + '<div class="ocr-product-price" style="text-align: center!important;">';
                        

                        if (boxOfferPrice !== null) {
                            template += '<span class="ocr-product-listprice strikethrough">$' + boxListPrice + '</span>';
                            template += '<span class="ocr-product-offerprice" style="color:black;">$' + boxOfferPrice + '</span><br>';
                            template += '<span class="ocr-product-per-box">per box with instant savings</span>';
                        } else {
                            template += '<span class="ocr-product-listprice">$' + boxListPrice + '</span>';
                            template += '<span class="ocr-product-per-box">per box </span>';
                        }

                        template += '</div></div></div>';
                        
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
                        var progress=100/slick.slideCount;
                        $ocrMobileHeaderCarouselContainer.find('.progress-bar').css('width',progress+'%');
                        ocr.setLastPurchaseLoading(false);
    
                        $ocrMobileHeaderCarousel.css('visibility', 'visible').hide().fadeIn('slow');
                    });
    
                    $ocrMobileHeaderCarousel.on('afterChange', function(slick, currentSlide) {
                       $ocrMobileHeaderCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(currentSlide.currentSlide + 1);
                        var progress=100/ocr.lp.contactInfo.length;
                        $ocrMobileHeaderCarouselContainer.find('.progress-bar').css('width',progress*(currentSlide.currentSlide+ 1)+'%'); 

                    });
    
                    $ocrMobileHeaderCarousel.slick({
                        arrows: true,
                        appendArrows: $ocrMobileHeaderCarouselContainer.find('.ocr-carousel-nav'),
                    });
                }
            }else{
            	var $ocrMobileHeaderCarouselContainer = $('.ocr-header-carousel-container');
            	$ocrMobileHeaderCarouselContainer.find('.ocr-button.ocr-reorder-all').html('SHOP CONTACT LENSES').attr('href','/to-us/contact-lenses').addClass('ocr-reorder-btn-shopCL');
            	$ocrHeaderCarouselContainer.find('.ocr-button.ocr-reorder-all').html('SHOP CONTACT LENSES').attr('data-element-id','"M_X_MainNav_ContactL-ShopContactL');
            	$('.ocr-accordion-content .ocr-accordion-title').addClass('ocr-title-noOrd');
            	$('.ocr-accordion-content .ocr-accordion-desc').html('complete your first contact lens purchase and you can reorder next time with just one click!').addClass('ocr-desc-noOrd');

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
                        var partnumber = contact.partnumber.toLowerCase();
                        var boxOfferPrice = ocr.getContactLensBoxPrice(partnumber, contact.totQuantity);
                        var template;
                        var productUrl='';
					    if(contact.productURL !=undefined && contact.productURL.length>0){
					    	template = '<div><div class="ocr-product"><div class="ocr-image-container"><a data-element-id="X_PLP_Header_ReorderProd" href="'+contact.productURL+'"><img class="ocr-product-image" src="https://assets.targetoptical.com/extra/image/TargetOptical/contacts/' + contact.partnumber
                            + '_fr.png?imwidth=179"/></a></div>';
					    }else{
					    	productUrl = getAbsoluteURL()+'ProductDisplay?storeId='+ocr.lp.storeId+'&productId='+ocr.lp.contactInfo[i].catEntryId+'&urlRequestType=Base&langId=-1&catalogId=12751';
					    	template = '<div><div class="ocr-product"><div class="ocr-image-container"><a data-element-id="X_PLP_Header_ReorderProd" href="'+productUrl+'"><img class="ocr-product-image" src="https://assets.targetoptical.com/extra/image/TargetOptical/contacts/' + contact.partnumber
                            + '_fr.png?imwidth=179"/></a></div>';
					    }
					    template = template + '<div id="cl-info"><div class="ocr-product-name">' + contact.name + '</div>'
                            + '<div class="ocr-product-qty">Quantity: ' + contact.totQuantity + '</div>'
                            + '<div class="ocr-product-price">';
                        

                        if (boxOfferPrice !== null) {
                        	template += '<span class="ocr-product-listprice strikethrough">$' + boxListPrice + '</span>';
                        	template += '<span class="ocr-product-offerprice" style="color: black;">$' + boxOfferPrice + '</span><br>';
                            template += '<div class="ocr-product-per-box" style="text-align: center!important; margin-top:10px;">per box with instant savings</div>';
                        } else {
                            template += '<span class="ocr-product-listprice">$' + boxListPrice + '</span>';
                            template += '<span class="ocr-product-per-box">per box </span>';
                        }
                        template += '</div></div></div></div>';

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
                        $ocrMobilePLPCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(slick.currentSlide<8 ? '0'+(slick.currentSlide+ 1) : slick.currentSlide+ 1 );
                        $ocrMobilePLPCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-total').html(slick.slideCount<8 ? '0'+slick.slideCount : slick.slideCount);
                        var progress=100/slick.slideCount;
                        $ocrMobilePLPCarouselContainer.find('.progress-bar').css('width',progress+'%'); 
                        ocr.setLastPurchaseLoading(false);
    
                        $ocrMobilePLPCarousel.css('visibility', 'visible').hide().fadeIn('slow');
                    });
    
                    $ocrMobilePLPCarousel.on('afterChange', function(slick, currentSlide) {
                    	var progress=100/ocr.lp.contactInfo.length;
                        $ocrMobilePLPCarouselContainer.find('.progress-bar').css('width',progress*(currentSlide.currentSlide+ 1)+'%'); 
                       $ocrMobilePLPCarouselContainer.find('.ocr-carousel-paging .ocr-carousel-current').html(currentSlide.currentSlide<8 ? '0'+(currentSlide.currentSlide+ 1) : currentSlide.currentSlide+ 1 );
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
					window.location.href = "ShippingBillingView?reorder=true&mode=payment&fromDoctorInfo=1&storeId="+storeId+"&catalogId="+catalogId+"&langId=-1&fromPage=fromShippingMethod";
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
		window.location.href = '/signup?storeId=' + ocr.storeId + '&langId=-1&catalogId=' + ocr.catalogId + '&URL=' + encodeURIComponent(window.location.href);
	},
    register: function() {
		window.location.href = '/UserRegistrationAddFormView?storeId=' + ocr.storeId + '&langId=-1&catalogId=' + ocr.catalogId + '&URL=' + encodeURIComponent(window.location.href);
	},
	mobileLogin: function() {
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

$(document).ready(function() {
	
       ocr.init(); 
    
   
});
