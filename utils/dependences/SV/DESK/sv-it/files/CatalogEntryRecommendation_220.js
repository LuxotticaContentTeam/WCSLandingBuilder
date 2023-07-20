CatalogEntryRecommendation = {
		init: function ()
		{

			if (window.runOnce)
			{
			   return false;
			}
			window.runOnce = true;
			
			$(".svEnableListCarousel").each(function(carouselIndex,v){
				
				$rootCarousel = $(v);
				
				if ($rootCarousel.closest('.header-contact-lenses-menu') != null && $rootCarousel.closest('.header-contact-lenses-menu').length > 0) {
					$('.header-contact-lenses-menu .single-product').removeClass('col-lg-4');
					return;
				} 
				
				var selector_src = '.single-product'; // elements to move
				var selector_dst = '.carousel-item .row'; // destination div
				
				$inner = $rootCarousel.find('.carousel-inner'); // the working container
                $products = $inner.find(selector_src); // select all the moving elements
                
                // determine the number of products to slide
                var desktopItems = 3;
                if (window.catalogEntryRecommendationSlides != null && window.catalogEntryRecommendationSlides>0) {  // special case for brands page
                	desktopItems = window.catalogEntryRecommendationSlides;
                }	
                
				var maxSiblings = ($('.isMobile').is(':visible')) ? 1 : desktopItems ;

				
                // determine if we actually have to activate the carousel
                var activateCarousel = ($products.length > maxSiblings) ? true : false ;

                var index = 0;
				$products.each(function(i,v){
					$product = $(v);
					
					if ( window.catalogEntryRecommendationSlides ) // special case for brands page
					{
						$product.addClass('col-lg-3').removeClass('col-lg-4');
					}
					
                    $destination = $inner.find(selector_dst).last(); // pick the last destination
					if ($destination.length === 0 || $destination.find(selector_src).length >= maxSiblings)
                    {
						$( '<div class="carousel-item"><div class="row"></div></div>' ).appendTo( $inner );
						if (activateCarousel)
						{
							// add the indicators
						    $('<li data-target="#carousel-'+carouselIndex+'" data-slide-to="'+index+'"></li>').appendTo($rootCarousel.find('.carousel-indicators'));
						    ++index;
						}
						$destination = $inner.find(selector_dst).last(); // update the destination
                    }

					$product.detach().appendTo($destination); // act the move
				});
				
				// update the carousel references...
				$rootCarousel.attr('id','carousel-'+carouselIndex);
				$rootCarousel.find('.carousel-item').first().addClass('active');
				if (activateCarousel)
				{
					$rootCarousel.find('.carousel-control-prev').attr('href','#carousel-'+carouselIndex);
					$rootCarousel.find('.carousel-control-next').attr('href','#carousel-'+carouselIndex);
					$rootCarousel.find('.carousel-indicators > li').first().addClass('active');
					$rootCarousel.carousel();
				}
				else
				{
					$rootCarousel.find('.carousel-item .row').css('justify-content','center');
					$rootCarousel.find('.carousel-control-prev').remove();
					$rootCarousel.find('.carousel-control-next').remove();
				}
				
				// remove garbage DOM
				$rootCarousel.find('.carousel-inner .product.card').each(function(i,v){
					if ($(v).children().length === 0)
					{
						$(v).remove();
					}
				});
			});

		},
		
		fixVerticalDivs: function() {
			if (window.verticalFixRunOnce){
			    return false;
			}
			window.verticalFixRunOnce = true;

			var prods = $('.single-prod .single-product .product'); //array dei prodotti

			if (prods != null && prods.length > 0) {
			    $('.single-prod .single-product .product').parents('.single-prod').each(function(z,v){
			    	var isAccessory = $(v).find('.product.card.accessories').length > 0;
			    	if (isAccessory) {
			    		$(v).addClass('accessories');
			    	}
			    	
			        var badgeNode = $(v).find(".product_info .promo-badge");
			        var badgeHtml = "";
			        if(badgeNode != null && badgeNode.length > 0){
			            if( typeof badgeNode.html() != 'undefined'){
			                badgeHtml = '<div class="promo-badge cl-header-menu-3piu1-badge-desktop d-inline-block mb-1 promo-badge--small">'+ badgeNode.html()+'</div>';
			            }	
			        }
			        var href = $(v).find('a').first().attr('href');
			        var urlImg = $(v).find('.product_image .image img').first().attr('src').replace('&wid=500','&wid=550');
			        var urlImg = $(v).find('.product_image .image img').first().attr('src').replace('&wid=275','&wid=550');
			        var productBrand =  $(v).find('.product_info .product_name .product-brand').first().text();
			        var productModel =  $(v).find('.product_info .product_name .product-model').first().text();
			        var price = $(v).find('.product_info .product-price-wrapper .product-price').first().text();
			        if (price != null && price.indexOf('A partire da') < 0) {
			        	price = price.replace(/\s/g,'');
			        }
			        $(v).empty();
			        var stringToAppend = '<a class="product card" href="'+href+'" data-element-id="X_HP_NewArrivals_Products"><div class="product--img product--img--dual">'+
			                '<div class="product--primary-img"><img class="card-img-top" src="'+urlImg+'" alt="" /></div>'+
			                '<div class="product--secondary-img"><img class="card-img-top" src="'+urlImg+'" /></div></div>'+
			                '<div class="product--content card-body">'+ badgeHtml +'<h5 class="product--name">'+productBrand+'</h5><p class="product--model">'+productModel+
			            '</p><h6 class="price-title product--price d-flex align-items-center justify-content-center">'+price+
			            '</h6></div></a>';
			        $(v).append(stringToAppend);
			    });
			}
		},
		
		initMinicart: function ()
		{
			
			$(".svEnableListCarousel.minicart-init-pending").each(function(carouselIndex,v){
				
				$rootCarousel = $(v);
				
				if ($rootCarousel.closest('.header-contact-lenses-menu') != null && $rootCarousel.closest('.header-contact-lenses-menu').length > 0) {
					$('.header-contact-lenses-menu .single-product').removeClass('col-lg-4');
					return;
				} 
				
				var selector_src = '.single-product'; // elements to move
				var selector_dst = '.carousel-item .row'; // destination div
				
				$inner = $rootCarousel.find('.carousel-inner'); // the working container
                $products = $inner.find(selector_src); // select all the moving elements
                
                // determine the number of products to slide
                var desktopItems = 3;
                if (window.catalogEntryRecommendationSlides != null && window.catalogEntryRecommendationSlides>0) {  // special case for brands page
                	desktopItems = window.catalogEntryRecommendationSlides;
                }	
                
				var maxSiblings = ($('.isMobile').is(':visible')) ? 1 : desktopItems ;

				
                // determine if we actually have to activate the carousel
                var activateCarousel = ($products.length > maxSiblings) ? true : false ;

                var index = 0;
				$products.each(function(i,v){
					$product = $(v);
					
					if ( window.catalogEntryRecommendationSlides ) // special case for brands page
					{
						$product.addClass('col-lg-3').removeClass('col-lg-4');
					}
					
                    $destination = $inner.find(selector_dst).last(); // pick the last destination
					if ($destination.length === 0 || $destination.find(selector_src).length >= maxSiblings)
                    {
						$( '<div class="carousel-item"><div class="row"></div></div>' ).appendTo( $inner );
						if (activateCarousel)
						{
							// add the indicators
						    $('<li data-target="#carousel-'+carouselIndex+'" data-slide-to="'+index+'"></li>').appendTo($rootCarousel.find('.carousel-indicators'));
						    ++index;
						}
						$destination = $inner.find(selector_dst).last(); // update the destination
                    }

					$product.detach().appendTo($destination); // act the move
				});
				
				// update the carousel references...
				$rootCarousel.attr('id','carousel-'+carouselIndex);
				$rootCarousel.find('.carousel-item').first().addClass('active');
				if (activateCarousel)
				{
					$rootCarousel.find('.carousel-control-prev').attr('href','#carousel-'+carouselIndex);
					$rootCarousel.find('.carousel-control-next').attr('href','#carousel-'+carouselIndex);
					$rootCarousel.find('.carousel-indicators > li').first().addClass('active');
					$rootCarousel.carousel();
				}
				else
				{
					$rootCarousel.find('.carousel-item .row').css('justify-content','center');
					$rootCarousel.find('.carousel-control-prev').remove();
					$rootCarousel.find('.carousel-control-next').remove();
				}
				
				// remove garbage DOM
				$rootCarousel.find('.carousel-inner .product.card').each(function(i,v){
					if ($(v).children().length === 0)
					{
						$(v).remove();
					}
				});
			});

		},
};
