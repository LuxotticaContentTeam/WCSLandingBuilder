/*! lux-b2c-csr - v0.0.1 - 2023-06-14 *//*
 * Definizione dell'applicazione: utilizzare la variabile "appLensPanel" 
 * per successive definizioni (controllers, directives, ecc....)
 */

var appLensPanel = angular.module('LensPanelApp', ['ngCookies', 'ngSanitize', 'mgo-angular-wizard', 'duScroll', 'lcInsuranceModule']);

/*
 * CONSTANTS
 */

appLensPanel.value('lpConstants', {

	WIZARD_NAME: 'wizardLensPanel',
	LENS_CATEGORY: {
		EYE: 'EYEGLASSES',
		SUN: 'SUNGLASSES'
	},
	
	// corrispondono alle key del json
	BRANDS: {
		OUR_LENSES: 'LENSCRAFTERS_LENSES',
		RAYBAN: 'RAY-BAN_LENSES',
		OAKLEY: 'OAKLEY_LENSES',
		COSTA: 'COSTA_LENSES'
	},
	
	ESPOT: {
		'RAY-BAN_LENSES': 'RAY-BAN_AUTHENTICS',
		'OAKLEY_LENSES': 'OAKLEY_AUTHENTICS',
		'COSTA_LENSES': 'COSTA_AUTHENTICS'
	},
	
	ANALYTICS: {
		BRANDS: {
			'LENSCRAFTERS_LENSES': 'standard',
			'RAY-BAN_LENSES': 'Ray-Ban',
			'OAKLEY_LENSES': 'Oakley',
			'COSTA_LENSES': 'Costa'
		}
	},
	
    LOCALE: 'en-US',
    CURRENCY_SYMBOL: '$  ',
    BASE_PATH: '/wcsstore/LensCraftersStorefrontAssetStore/LensPanel/',
    URL_LOCAL: 'webapp/wcs/stores/servlet/'
    	
});

/*
 * LABELS
 */

appLensPanel.value('lpLabels', {
	
	footer: {
		frameOnly: 'Frame only',
		frameOnlyPrice: 'Frame only price:',
		save: 'Save and continue shopping',
		ask: 'We’ll ask for your prescription during checkout.',
		add: 'Add to bag',
		apply: 'Apply'
	},
	
	insurance: {
		loading: 'Insurance benefits syncing (could take up to 45 seconds)',
		loaded: 'Insurance benefits active',
		error: 'We are sorry, we encountered a problem retrieving insurance benefit'
	},
	
	stepLens: {
		title: 'Choose your lens',
		banner: 'Don\'t worry! We will take care of your prescription for you after the check-out.',
		moreInfo: 'Discover the lens'
	},
	
	stepTreatment: {
		title: 'Choose your lens treatment'
	},
	
	stepColor: {		
		title: 'Choose your lens color',
		polarized: 'Polarized',
		standard: 'Add polarized',
		allPolarized: 'All lenses are polarized',
		prePolarPrice: '(+ ',
		postPolarPrice: ')'
	},
	
	stepReview: {
		title: 'Review your selection',
		frame: 'Frame',
		size: 'Size',
		lenses: 'Lenses',
		edit: 'edit',
		total: 'Frame + Lenses',
		subtotal: 'Subtotal',
		gvp: 'GREAT VALUE PACKAGE',
		warranty: 'Add One Year'
	}
});

/* 
 * FILTERS 
 */

appLensPanel.filter('orderByPrice', function(lpDataset) {
	return function(input, priceAttr) {
		if (!angular.isObject(input)) return input;

		var array = [];
		for(var objectKey in input) {
			var obj = input[objectKey];
			obj.key = objectKey;
			array.push(obj);
		}

		array.sort(function(obj1, obj2){
			var price1 = parseFloat(obj1[priceAttr]);
			var price2 = parseFloat(obj2[priceAttr]);
			var disct1 = lpDataset.insurance.discounts[obj1.baseLensUPC] ? parseFloat(lpDataset.insurance.discounts[obj1.baseLensUPC]) : 0.00;
			var disct2 = lpDataset.insurance.discounts[obj2.baseLensUPC] ? parseFloat(lpDataset.insurance.discounts[obj2.baseLensUPC]) : 0.00;
			
			price1 -= disct1;
			price2 -= disct2;
			return price1 - price2;
		});

		return array;
	}
});

// change all specified character (blank is default) with the underscore
appLensPanel.filter('underscore', function() {
	return function(input, charToChange) {
		var input = input || '';
		var ch = charToChange || ' ';
		return input.split(ch).join('_');
	}
});;
appLensPanel

.directive('lpAnalyticsPush', function($log) {
	return {
		restrict: 'A',
		scope: {},
		link: function(scope, el, attr, ctrl) {
			var elementid = attr.elementId;
			var description = attr.description;
			var id = attr.id;
			var element = el[0];
			element.addEventListener('click', function(e) {
				try {
					if (elementid) {
						tealium_data2track.push({
							id: 'Click', 
							Click_FocusElement: element,
							Tracking_Type: 'link',
							data_element_id: elementid,
							data_description: description || elementid
						});
					} else if (id) {
						tealium_data2track.push({
							id: id, 
							Click_FocusElement: element
						});							
					}
				} catch (err) {
					$log.error(err);
				}
			});

			element.addEventListener('keyUp', function(e) {
				try {
					if (e.keyCode == 13) {
						if (elementid) {
							tealium_data2track.push({
								id: 'KeyUp', 
								Click_FocusElement: element,
								Tracking_Type: 'link',
								data_element_id: id,
								data_description: description || ''
							});
						} else if (id) {
							tealium_data2track.push({
								id: id, 
								Click_FocusElement: element
							});							
						}
					}
				} catch (err) {
					$log.error(err);
				}
			});
		}
	}	
});
;
appLensPanel

.directive('lpLensColor', function(lpConstants, lpDataset, WizardHandler) {

    return {

        restrict: 'E',
        templateUrl: lpConstants.BASE_PATH + 'app/templates/lensColor.htm',
        scope: {
        	color: '=',
        	index: '=',
        	length: '='
        },
        link: function(scope, iElement, iAttributes, ctrl) {
        	
        	scope.wizard = WizardHandler.wizard(lpConstants.WIZARD_NAME);
        	scope.constants = lpConstants;
        	
        	scope.selectColor = function() {
        		if (lpDataset.insurance.isLoading)
        			return;
        		
        		scope.wizard.context.selectedColorType = scope.color.type;
        		scope.wizard.context.selectedColor = scope.color.key;
        		scope.wizard.next();
        	}
        }
    }
});;
appLensPanel

.directive('lpLensTreatmentType', function(lpConstants, lpDataset, lpScroll, WizardHandler) {

    return {

        restrict: 'E',
        templateUrl: lpConstants.BASE_PATH + 'app/templates/lensTreatmentType.htm',
        scope: {
			code: '=',
			lensTypeName: '=',
        	treatmentType: '=',
        	index: '=',
        	twocols: '='
        },
        link: function(scope, iElement, iAttributes, ctrl) {
        	
        	scope.wizard = WizardHandler.wizard(lpConstants.WIZARD_NAME);
        	scope.constants = lpConstants;
			scope.treatmentsNumber = scope.treatmentType.treatments ? Object.keys(scope.treatmentType.treatments).length : 0;
			scope.dataset = lpDataset;
        	
        	scope.isTreatmentVisible = function() {
        		return scope.treatmentType.transition || scope.treatmentsNumber > 1;
        	}
        	
        	scope.isSelected = function() {
        		return scope.wizard.context.selectedTreatmentType == scope.code;
        	}
        	
        	scope.selectType = function() {
        		if (lpDataset.insurance.isLoading)
        			return;
        		
        		if (scope.treatmentsNumber == 0)
        			return;
        		
				scope.wizard.context.selectedTreatmentType = scope.code;
        		
        		// select directly
        		if (!scope.isTreatmentVisible()) {
        			scope.wizard.context.selectedTreatment = Object.keys(scope.treatmentType.treatments)[0];
        			
        			// next step
        			scope.wizard.next();
        		} else {
        			lpScroll.bottom();
        		}
			}
			
			scope.getPrice = function() {
				var price = scope.treatmentType.basePrice;

				if (lpDataset.insurance.isEnabled && typeof lpDataset.insurance.discounts[scope.treatmentType.baseLensUPC] !== 'undefined') {
					price = Math.max(0.00, scope.treatmentType.baseOfferPrice - lpDataset.insurance.discounts[scope.treatmentType.baseLensUPC]);
				}

				return price;
			}
        }
    }
})

.directive('lpLensTreatment', function(lpConstants, lpDataset, WizardHandler) {

    return {

        restrict: 'E',
        templateUrl: lpConstants.BASE_PATH + 'app/templates/lensTreatment.htm',
        scope: {
        	code: '=',
        	treatment: '='
        },
        link: function(scope, iElement, iAttributes, ctrl) {
        	
        	scope.wizard = WizardHandler.wizard(lpConstants.WIZARD_NAME);
        	scope.constants = lpConstants;        	
        	scope.labels = {
        		selectColor: 'Select a color:',
	        	confirm: 'Confirm'
        	}
        	
        	scope.hasColors = function() {
        		return Object.keys(scope.colors).length > 0;
			}
        	
        	scope.numberOfColors = function() {
        		return Object.keys(scope.colors).length;        		
        	}
			
			scope.getOfferPrice = function () {
				return scope.hasColors() ? scope.colors[Object.keys(scope.colors)[0]].lens.offerPrice : scope.treatment.lens.offerPrice;
			}

			scope.getPrice = function () {
				var price = scope.hasColors() ? scope.colors[Object.keys(scope.colors)[0]].lens.price : scope.treatment.lens.price;

				if (lpDataset.insurance.isEnabled) {
					var partNumber = null;
					var priceWithInsurance = null;
					var currentPriceWithInsurance = null;

					if (scope.hasColors()) {
						for (var colorKey in scope.colors) {
							partNumber = scope.colors[colorKey].lens.partNumber;

							if (typeof lpDataset.insurance.discounts[partNumber] !== 'undefined') {
								currentPriceWithInsurance = Math.max(0.00, scope.colors[colorKey].lens.offerPrice - lpDataset.insurance.discounts[partNumber]);

								if (priceWithInsurance == null || currentPriceWithInsurance < priceWithInsurance) {
									priceWithInsurance = currentPriceWithInsurance;
								}
							}
						}

						price = priceWithInsurance;
					} else {
						price = Math.max(0.00, scope.treatment.lens.offerPrice - lpDataset.insurance.discounts[scope.treatment.lens.partNumber]);
					}
				}

				return price;
			}
        	
        	// creates color list with type
			scope.colors = {};
			
        	for (colorTypeKey in scope.treatment.colorTypes) {
        		var colorType = scope.treatment.colorTypes[colorTypeKey];
        		
        		// add color type
        		angular.forEach(colorType.colors, function(color) {
        			color.type = colorTypeKey;
        		});
        		
           		angular.merge(scope.colors, colorType.colors);
        	}
        	
        	scope.selectTreatment = function() {
				if (lpDataset.insurance.isLoading)
					return;
        			
        		scope.wizard.next();
        	}
        	
        	scope.onClick = function() {
        		if (scope.hasColors())
        			return;
        		
        		scope.wizard.context.selectedTreatment = scope.code;
        		scope.selectTreatment();
        	}
        	
        	scope.selectColor = function(colorKey, typeKey) {
        		scope.wizard.context.selectedTreatment = scope.code;
        		scope.wizard.context.selectedColorType = typeKey;
        		scope.wizard.context.selectedColor = colorKey;
        	}
        	
        	scope.isColorSelected = function(colorKey) {
        		var _ctx = scope.wizard.context;
        		
        		if (_ctx.selectedTreatment != scope.code)
        			return false;

        		return _ctx.selectedColor == colorKey;
        	}
        	
        	scope.isConfirmVisible = function() {        		
        		
        		var _ctx = scope.wizard.context;
        		
        		if (_ctx.selectedTreatment != scope.code)
        			return false;
        		
        		var _colors = Object.keys(scope.colors);       		
        		return  _colors.length > 0 && _colors.indexOf(_ctx.selectedColor) != -1;
        	}
        }
    }
})

.directive('lpTreatmentLearnMore', function(lpConstants, $window) {
	
    return {

		restrict: 'E',
		templateUrl: lpConstants.BASE_PATH + 'app/templates/lensTreatmentLearnMore.htm',
	    scope: {
	    	treatment: '='
	    },
	    link: function(scope, iElement, iAttributes, ctrl) {
	    	
	    	scope.labels = {
	        	learnMore: 'Learn more'
	    	}
	    	scope.isVisible = false;
	    	
	    	scope.onMouseover = function() {
	    		if ($window.isMobile)
	    			return;
	    		
	    		this.isVisible = true;
	    	}
	    	
	    	scope.onMouseleave = function() {
	    		if ($window.isMobile)
	    			return;
	    		
	    		this.isVisible = false;
	    	}
	    	
	    	scope.show = function() { 
	    		this.isVisible = true; 
	    	}
	    	
	    	scope.hide = function() { 
	    		this.isVisible = false; 
	    	}
	    }
    }
});
;
appLensPanel

.directive('lpLensType', function(lpConstants, lpDataset, WizardHandler) {

    return {

        restrict: 'E',
        templateUrl: lpConstants.BASE_PATH + 'app/templates/lensType.htm',
        scope: {
        	code: '=',
        	type: '=',
        	index: '=',
        	twocols: '='
        },
        link: function(scope, iElement, iAttributes, ctrl) {
        	scope.wizard = WizardHandler.wizard(lpConstants.WIZARD_NAME);
        	scope.constants = lpConstants;        	
        	scope.labels = {
        		lensColor: 'Lens color:',
        		range: 'Suggested range: '
			};
			scope.name = scope.type.name.replace(/EYE|SUN/, '').trim();

			if (scope.name.indexOf("Costa") != -1) {
				scope.name = scope.name.replace(/Polarized/, '');
			}
        	
        	// colors
        	scope.colors = [];
        	
        	if (scope.type.colorTypes) {
	        	var _keyType;
				for (_keyType in scope.type.colorTypes) {
		        	var _colorType = scope.type.colorTypes[_keyType];
					if (_colorType.colors) {					
						var _keyColor;
						for (_keyColor in _colorType.colors) {
							var _color = _colorType.colors[_keyColor];
							scope.colors.push({
								type: _keyType,
								key: _keyColor,
								name: _color.name,
								url: _color.imageUrl,
								isPolarized: _color.polarized,
								lens: _color.lens
							});
						}
					}
				}
        	}
        	
        	scope.isSelected = function() {
        		return scope.wizard.context.selectedLensType == scope.code;
        	}
        	
        	// selection
        	scope.selectType = function() {
        		if (lpDataset.insurance.isLoading)
        			return;        		
        		
        		scope.wizard.context.selectedLensType = scope.code;
        		scope.wizard.context.selectedColorSet = scope.colors;
        		scope.wizard.next();
			}

			scope.getPrice = function() {
				var price = scope.type.basePrice;

				if (lpDataset.insurance.isEnabled && typeof lpDataset.insurance.discounts[scope.type.baseLensUPC] !== 'undefined') {
					price = Math.max(0.00, scope.type.baseOfferPrice - lpDataset.insurance.discounts[scope.type.baseLensUPC]);
				}

				return price;
			}
        }
    }
});;
/* Main Directive */

appLensPanel

.directive('lpMainModal', function(lpConstants, lpModalService) {
	
	return {
		
		restrict: 'E',
		templateUrl: lpConstants.BASE_PATH + 'app/templates/mainModal.htm',
        scope: {}
	}
	
});;
appLensPanel

.directive('lpInsuranceProgressbar', function(lpLabels, lpDataset) {
	
	var _tmpl = '<div class="progress" ng-show="insurance.isEnabled">'
		+ '<div class="progress-bar" role="progressbar" '
		+ 'ng-class="{\'progress-bar-striped progress-bar-animated\': insurance.isLoading, \'bg-danger\': insurance.isLoadingError}"'
		+ 'style="width: 100%" '
		+ '>{{insurance.isLoading ? labels.loading : (insurance.isLoadingError ? labels.error : labels.loaded)}}</div>'
		+ '</div>';
	
	return {
		restrict: 'E',
		template: _tmpl,
		scope: {},
		link: function(scope, el, attr, ctrl) {
			
			scope.labels = lpLabels.insurance;
			scope.insurance = lpDataset.insurance;
		}
	}
})

.directive('lpInsurancePrice', function(lpConstants, lpDataset) {
	
	var _tmpl = '<div class="price-wrapper" ng-hide="insurance.isLoading">'
		+ '<span class="starting-from" ng-if="startingfrom && !gvp()" ng-class="{\'insurance\': insurance.isEnabled}">Lens starting at </span>'
		+ '<span class="offer-price" ng-if="!gvp() && !insurance.isEnabled && (offerprice - price) > 0" '
		+ 'ng-class="{\'strike-through\': (offerprice - price) > 0}">{{offerprice | currency:constants.CURRENCY_SYMBOL}}</span>'
		+ '<span class="price" ng-if="price > 0 && !gvp()" ng-class="{\'insurance\': insurance.isEnabled}">'
		+ '{{price | currency:constants.CURRENCY_SYMBOL}}</span>'
		+ '<span class="price" ng-if="price <= 0 && !gvp()" ng-class="{\'insurance\': insurance.isEnabled}">FREE</span>'
		+ '<span class="gvp-price" ng-if="gvp()">Complete pair (frame + lenses) {{starting}} at {{price | currency:constants.CURRENCY_SYMBOL}}</span>'
		+ '</div><div class="step-loader" ng-show="insurance.isLoading"><em class="fa fa-spinner fa-spin"></em></div>';
	
	return {
		restrict: 'EA',
		template: _tmpl,
		scope: {
			startingfrom: '=',
			offerprice: '=',
			price: '='	
		},
		link: function(scope, el, attr, ctrl) {
			
			scope.constants = lpConstants;
			scope.insurance = lpDataset.insurance;
			scope.starting = angular.isDefined(attr.istreatment) && attr.istreatment == 'true'
				&& !scope.startingfrom ? '' : 'starting ';
			
			scope.gvp = function() {
				return lpDataset.insurance.isEnabled ? false : lpDataset.isGvp();
			}
		}
	}
})

.directive('lpInsuranceFramePrice', function(lpConstants, lpDataset) {
	
	var _tmpl = '<div class="price-wrapper" ng-hide="insurance.isLoading">'
		+ '<span class="offer-price" ng-if="!insurance.isEnabled && (offerprice - price) > 0" '
		+ 'ng-class="{\'strike-through\': (offerprice - price) > 0}">{{offerprice | currency:constants.CURRENCY_SYMBOL}}</span>'
		+ '<span class="price frame" ng-if="price > 0" ng-class="{\'insurance\': insurance.isEnabled}">'
		+ '{{price | currency:constants.CURRENCY_SYMBOL}}</span>'
		+ '<span class="price frame" ng-if="price <= 0" ng-class="{\'insurance\': insurance.isEnabled}">FREE</span>'
		+ '</div><div class="step-loader" ng-show="insurance.isLoading"><em class="fa fa-spinner fa-spin"></em></div>';
	
	return {
		restrict: 'EA',
		template: _tmpl,
		scope: {
			startingfrom: '=',
			offerprice: '=',
			price: '='
		},
		link: function(scope, el, attr, ctrl) {
			
			scope.constants = lpConstants;
			scope.insurance = lpDataset.insurance;
		}
	}
})

.directive('lpReviewPrice', function(lpConstants) {
	
	var _tmpl = '<div class="price-wrapper">'
		+ '<span class="offer-price" ng-if="(offerprice - price) > 0" '
		+ 'ng-class="{\'strike-through\': (offerprice - price) > 0}">{{offerprice | currency:constants.CURRENCY_SYMBOL}}'
		+ '</span>'
		+ '<span class="price" ng-class="{\'gvp-recap-price\': gvp, \'total-price\': total}" ng-if="price > 0">'
		+ '{{price | currency:constants.CURRENCY_SYMBOL}}'
		+ '</span>'
		+ '<span class="price" ng-class="{\'gvp-recap-price\': gvp, \'total-price\': total}" ng-if="price <= 0">FREE</span>'
		+ '</div>';
	
	return {
		restrict: 'EA',
		template: _tmpl,
		scope: {
			offerprice: '=',
			price: '=',
			gvp: '=?',
			total: '=?'
		},
		link: function(scope, el, attr, ctrl) {
			
			scope.constants = lpConstants;
			scope.gvp = scope.gvp || false;
		}
	}
})

.directive('lpGvpBanner', function() {
	var _tmpl = '<div class="col justify-content-center gvp-banner-layout">'
		+ '<span class="gvp-banner-text" ng-bind="gvpBannerText"></span>'
		+ '</div>';

	return {
		restrict: 'EA',
		template: _tmpl,
		scope: {},
		link: function(scope, el, attr, ctrl) {
			
			scope.gvpBannerText = 'Great value package';
		}
	}
});;
appLensPanel

.directive('lpWarrantyTooltip', function(lpConstants, lpUrl, $window) {
    return {

		restrict: 'E',
		templateUrl: lpConstants.BASE_PATH + 'app/templates/warrantyTooltip.htm',
	    scope: {},
	    link: function(scope, iElement, iAttributes, ctrl) {
	    	
	    	scope.labels = {
	    		warrantyName: 'Eyewear Protection Plan',
	        	title: 'Includes',
	        	item1: 'Accidental damage from handling',
	        	item2: 'Protection from normal wear and tear',
	        	item3: 'Unlimited use during the term',
	        	link: 'Discover more'
	    	}	    	
	    	scope.isVisible = false;
	    	
	    	scope.onMouseover = function() {
	    		if ($window.isMobile)
	    			return;
	    		
	    		this.isVisible = true;
	    	}
	    	
	    	scope.onMouseleave = function() {
	    		if ($window.isMobile)
	    			return;
	    		
	    		this.isVisible = false;
	    	}
	    	
	    	scope.toggleShow = function(event) { 
	    		if (!$window.isMobile)
	    			return;
	    		
	    		event.preventDefault();
	    		event.stopPropagation();
    			this.isVisible = !this.isVisible; 
	    	}
	    	
	    	scope.openDetail = function() {
	    		var url = lpUrl('/lc-us/purchase-care/details');
	    		$window.open(url, '_blank');
	    	}
	    	
	    	// add listener to close tooltip
	    	var _container = document.getElementById('lpStepReview');
	    	if (_container) {
	    		_container.addEventListener('click', function(event) {
	    			scope.$apply(function() {
	    				scope.isVisible = false;
	    			});
	    		});
	    	}
	    }
    }
});;
/* MAIN CONTROLLER */

appLensPanel.controller('lensPanelController', function($rootScope, $scope, lpModalService, lpConstants, lpLabels, lpDataset, lpRest, lpScroll, lpAnalytics,
	lcInsurance, $q, $timeout, $window, $httpParamSerializerJQLike, $log, WizardHandler) {

	// shortcut
	$scope.constants = lpConstants;
	$scope.labels = lpLabels;
	$scope.dataset = lpDataset;
	
	// visibility
	$scope.isVisible = function() {
		return lpModalService.isVisible;
	}
	
	// close modal
	$scope.exit = function(action, data) {

		// enable body scroll
		lpScroll.enable();

		// close modal
		$scope.wizardHandler.goToFirstStep();
		lpModalService.close(action, data);
	}
	
	// save data and exit
	$scope.save = function() {
		
		var _ctx = $scope.wizardHandler.context;
		var _lens = lpDataset.getLens(_ctx);
		
		$scope.exit(lpModalService.CLOSE_ACTION_SAVE, _lens);
	}
	
	// add to cart
	$scope.addToCart = function() {

		if (lpModalService.isAddingToCart)
			return;

		var _ctx = $scope.wizardHandler.context;
		var _lens = lpDataset.getLens(_ctx);

		if ($scope.callerId && $scope.callerId.indexOf(lpModalService.CALLERID_CART) != -1) {
			// If cart, apply to cart
			$scope.exit(lpModalService.CLOSE_ACTION_APPLY, _lens);
			return;
		}

		var _params = {
			storeId: lpDataset.storeId,
			catalogId: lpDataset.catalogId,
			langId: lpDataset.langId,
			orderId: lpDataset.currentOrderId,
			frameCatentryId: lpDataset.frameData.id,
			URL: '',
			lensCatentryId: _lens.productCatEntryId,
			lensColor: _lens.color,
			lens: _lens.catEntryId,
			addOns: '',
			includeLens: true,
			tah: false,
			addWarranty: _ctx.addWarranty
		};

		if (lpDataset.selectedPerkCode) {
			_params.promoCode = lpDataset.selectedPerkCode;
		}
		
		lpModalService.addToCart(_params)
			.then(function(data) {
				incrementShopCartCounter();
				var orderItemCount = angular.element(document.getElementById('tah-quantity-header')).text().trim();

				try {
					var _obj = {
						id: 'AddToCart', 
						site_events: {
							"add_to_cart": "true"
						}
					}
					
					if (typeof orderItemCount != 'undefined' && parseInt(orderItemCount) <= 1) {
						_obj.site_events.cart_start = "true";
					}

//					var shopping_cart = [];
					var _products = lpAnalytics.getProducts(lpDataset.frameData, _lens);
					_obj.Products = _products;
//					callTrackAnalytics(_dl);
					tealium_data2track.push(_obj);
					
				} catch (err) {
					$log.error("error in tracking analytics of add to cart: " + err.stack);
					var _obj = {
						id: 'WCS-D-Pdp-Prod-AddToCart-Error',
						Error_Source: 'Server',
						Error_Code: 'utag_data syntax - ' + err.message
					};
					tealium_data2track.push(_obj);
				}

				$timeout(function() {
					var toCartParams = {
						storeId: data.storeId[0],
						catalogId: data.catalogId[0],
						langId: data.langId[0],
						URL: 'AjaxOrderItemDisplayView',
						errorViewName: 'AjaxOrderItemDisplayView',
						orderId: '.',
						updatePrices: '1',
						calculationUsageId: '-1',
						chooseBenefit: lpDataset.insurance.isEnabled
					};
	
					$window.location.href = getAbsoluteURL() + 'OrderCalculate?' + $httpParamSerializerJQLike(toCartParams);
				}, 500);
			}, function(error) {
				$log.error(error);
			});
	}
	
	// reset modal after open
	var _reset = function(resetLensData) {
		if (resetLensData)
			lpDataset.lensData = {};
		
		if ($scope.wizardHandler && $scope.wizardHandler != null)
			$scope.wizardHandler.reset();
	}

	$scope.closeLensPanelPopup = {
		isVisible: false,
	
		open: function(redirect) {
			if (this.isVisible)
				return;
			
			this.redirect = redirect || false; 
			this.isVisible = true;
			
			angular.element(document.getElementById('close-lens-panel--')).focus();
			
			lpScroll.disable('lensPanelId');
		},
	
		close: function() {
			this.isVisible = false;
			lpScroll.enable('lensPanelId');
		},
		
		exit: function() {
			this.close();
			
			// exit
			$scope.exit();
			
			// home redirection
			if (this.redirect) {
				var _url = $window.location.hostname;
				if (_url.indexOf("localhost") != -1) {
					_url = 'https://localhost/webapp/wcs/stores/servlet';
				} else {
					_url = 'https://' + _url;
				}
				
				var _country = lpDataset.storeId == 10852 ? '/en-ca' : '/lc-us';				
				$window.location = _url + _country;
			}
		}
	}
	
	// initialization
	$scope.$on('lenspanel:opened', function(event, _params, _callerId, _context) {

		if (!_params.lensCategory)
			throw 'Undefined lensCategory property';
		if (!_params.lensData)
			throw 'Undefined lens data';

		$scope.callerId = _callerId;
		
		// disable body scroll
		lpScroll.disable();

		// if true reset previous lens data (only cart)
		var resetLensData = false;
		
		// workaround to hide cart header
		if (_callerId.indexOf(lpModalService.CALLERID_CART) != -1) {
			var _header = document.getElementById('header_wrapper');
			_header.style.zIndex = 30;
			
			var _el = document.getElementById('skipToMainContent');
			if (_el) _el.style.display = 'none';

			angular.element(document.getElementById('cart-section')).addClass("hidden");

			resetLensData = true;
		}
		
		// resets 
		_reset(resetLensData);
		
	    // dataset data
		angular.merge(lpDataset, _params);
		
		// merge frame data
		angular.merge(lpDataset.frameData, lpDataset.lensData.frame);
		delete lpDataset.lensData.frame;

		// merge perk data
		if (lpModalService.selectedPerkCode) {
			lpDataset.selectedPerkCode = lpModalService.selectedPerkCode;
		}

		// Check insurance enabled
		lpDataset.insurance.isEnabled = lcInsurance.isEnabled();
		
		// initial context from edit
		if (_context) {
			angular.merge($scope.wizardHandler.context, _context);
		} 

        // initialize first step
		$scope.stepLens.initialize();
		
		// scroll to top
		$timeout(function() {
			lpScroll.top();
			angular.element(document.getElementById('wcag-start')).focus();
			angular.element(document.getElementById('footer_wrapper')).addClass("hidden");
			angular.element(document.getElementById('header_wrapper')).addClass("hidden");
			angular.element(document.getElementById('pdp-wrapper')).addClass("hidden");
			angular.element(document.getElementById('site-breadcrumb')).addClass("hidden");
			angular.element(document.getElementById('main-navigation')).addClass("hidden");
			angular.element(document.getElementById('main-content-comp')).addClass("hidden");
		});
	});
	
	$scope.$on('wizard:created', function(event) {
		// wizard
		$timeout(function() {
			$scope.wizardHandler = WizardHandler.wizard(lpConstants.WIZARD_NAME);
			
			event.targetScope.brandStyle = function() {
				var _wizard = $scope.wizardHandler;
				
				if (_wizard && _wizard.currentStepTitle() == 'Review')
					return '';
				
				return lpDataset.getBrandStyle(this.context.selectedBrand);
			}
			
			// add methods to the wizard scope
			event.targetScope.backLabel = function(step) {
				var _label = 'Back';
				
				switch (step) {
				case 'Treatment':
				case 'Color':
					return _label.concat(' to Lens Selection');
				case 'Review':
					return _label.concat(lpDataset.lensCategory == lpConstants.LENS_CATEGORY.EYE ? ' to Treatment Selection' : ' to Color Selection');
				}
				
				return _label;
			}

			event.targetScope.closeLensPanelPopup = {
				isVisible: false,
			
				open: function() {
					if (this.isVisible)
						return;
					
					this.isVisible = true;
					lpScroll.disable('lensPanelId');

				},
			
				close: function() {
					this.isVisible = false;
					lpScroll.enable('lensPanelId');
				},
				
				exit: function() {
					this.close();

					// exit
					$scope.exit();
				}
			}
		});		
	});
	
	var _detect = function() {
        var _md = new MobileDetect($window.navigator.userAgent);
        $window.isMobile = _md.mobile() != null;        
        $window.isPhone = _md.phone() != null; 
	}
	
	// init
	$scope.init = function(_params) {
        // Detect Mobile (http://hgoebl.github.io/mobile-detect.js/)
		_detect();
        
        $window.addEventListener('resize', function(event) {
        	_detect();
        	
        	$scope.$digest();
        });
	}
	
	$scope.brandStyle = function() {
		if ($scope.wizardHandler && $scope.wizardHandler.currentStepTitle() == 'Review')
			return '';
		
		return lpDataset.getBrandStyle($scope.stepLens.tabSelected);
	}
	
	$scope.getFramePrice = function() {
		var framePrice = lpDataset.frameData.price ? lpDataset.frameData.price : lpDataset.frameData.offerPrice;

		if (lpDataset.insurance.isEnabled) {
			framePrice = lpDataset.frameData.offerPrice - lpDataset.insurance.discounts[lpDataset.frameData.partNumber];
		}

		return framePrice;
	}
	
	$scope.editFromCart = function() {
		return $scope.callerId && $scope.callerId.indexOf('CART_') != -1;
	}
	
	/* WIZARD */
	$scope.wizard = {
		template: lpConstants.BASE_PATH + 'app/templates/wizard.htm',	
		cancelled: function() {},
		finished: function(context) {
			
			console.log('Finished');
		}
	}
	
	/* ANALYTICS */
	var analyticsEnterStep = function(_pageType) {
		tealium_data2track.push({
			'id': 'LensPanel-View',
			'Page_Type': _pageType,  //  values can be 'LensPrescription', 'LensType', 'LensMaterial', 'LensTreatment', 'LensColor', 'LensReview'
			'Page_Section1': lpDataset.lensCategory == lpConstants.LENS_CATEGORY.EYE ? 'LensPanel' : 'SunLensPanel'
		});
	}
	
	/* STEPS LOGIC */
	
	// step Lens
	$scope.stepLens = {
		constants: lpConstants,
		labels: lpLabels.stepLens,
		dataset: lpDataset,
		
		initialize: function() {
			this.isDesktop = function() { return !$window.isMobile; };
			this.showBanner = false;
			
			// sort dei brands
			this.sortedLensBrands = [];

			for (var key in lpDataset.lensData.lensBrands) {
				this.sortedLensBrands.push(key);
			}
			this.sortedLensBrands.sort(function(key1, key2) {				
				return lpDataset.lensData.lensBrands[key2].sequence - lpDataset.lensData.lensBrands[key1].sequence;
			});
			//
			
			if ($scope.wizardHandler) {
				this.tabSelected = $scope.wizardHandler.context && $scope.wizardHandler.context.selectedBrand ? $scope.wizardHandler.context.selectedBrand : this.sortedLensBrands[0];
				this.tabChanged();

				analyticsEnterStep('LensType');
			}
		},
		
		// canenter function
		canEnter: function(context) {
			if (context.selectedBrand && context.selectedBrand != null) {
				this.wzData.tabSelected = context.selectedBrand;
				this.wzData.tabChanged();
			}

			analyticsEnterStep('LensType');
			return true;
		},
		
		// canexit function
		canExit: function(context) {
			var _this = this.wzData;
			
			if (!_this.tabSelected || !context.selectedLensType)
				return false;
						
			context.selectedBrand = _this.tabSelected;
			return true;			
		},
		
		tabsHidden: function() {
			if (!this.dataset.lensData.lensBrands)
				return true;
			
			return Object.keys(this.dataset.lensData.lensBrands).length < 2 
				&& this.dataset.lensData.lensBrands[lpConstants.BRANDS.OUR_LENSES] != null;
		},
		
		tabChanged: function() {
			if (!this.dataset.lensData.lensBrands)
				return;

			if (lpDataset.insurance.isLoading)
				return;

			this.backgroundImage = { 'background-image': 'url(' + this.dataset.lensData.lensBrands[this.tabSelected].bgImageUrl + ')' };
			this.lensTypes = this.dataset.lensData.lensBrands[this.tabSelected].lensTypes;
			this.lensTypesNumber = Object.keys(this.lensTypes).length;


			if (lpDataset.insurance.isEnabled) {
				this.getInsuranceForTab();
			}

			if (this.tabSelected != lpConstants.BRANDS.OUR_LENSES) {
				var lensCategory = $scope.dataset.lensCategory == lpConstants.LENS_CATEGORY.SUN ? 'Sun' : 'Eye';
				var espotname = 'DESK_' + lpConstants.ESPOT[this.tabSelected] + '_HEADER_' + lensCategory;

				var _this = this;

				lpRest.getBrandEspot(espotname).then(
					function (data) {
						_this.htmlContent = data;
					}
					, function (error) {
						console.log(error + ' [' + espotname + ']');
					});
			} else {
				this.htmlContent = '';
			}
		},
		
		selectTab: function(code) {	
			if (this.dataset.insurance.isLoading)
				return;
			
			$scope.wizardHandler.context.selectedBrand = code;
			this.tabSelected = code;
			this.tabChanged();
		},
				
		getInsuranceForTab: function() {
			var _defer = $q.defer();

			if (lpDataset.insurance.isLoading) {
				_defer.reject();
				return _defer.promise;
			}

			lpDataset.insurance.isLoading = true;
			lpDataset.insurance.isLoadingError = false;

			var data = {
				storeId: lpDataset.storeId,
				catalogId: lpDataset.catalogId,
				langId: lpDataset.langId,
				pricingEntries: []
			};

			angular.forEach(lpDataset.lensData.lensBrands[this.tabSelected].lensTypes, function(lensType, lensTypeKey) {
				if (typeof lpDataset.insurance.discounts[lensType.baseLensUPC] == 'undefined') {
					data.pricingEntries.push({
						frame: {
							price: lpDataset.frameData.offerPrice,
							upc: lpDataset.frameData.partNumber,
							quantity: '1',
							type: 'f'
						},
						lens: {
							price: lensType.basePrice,
							upc: lensType.baseLensUPC,
							quantity: '1',
							type: 'l'
						}
					});
				}
			});

			if (data.pricingEntries.length == 0) {
				lpDataset.insurance.isLoading = false;

				_defer.reject();
				return _defer.promise;
			}

			lcInsurance.getDiscounts(data)
				.then(function (response) {
					if (response && response.length > 0) {
						angular.forEach(response, function (value, key) {
							lpDataset.insurance.discounts[value.frame.upc] = value.frameDiscount;
							lpDataset.insurance.discounts[value.lens.upc] = value.lensDiscount;
						});

						lpDataset.insurance.isLoading = false;
						_defer.resolve();
					}
				}, function (error) {
					lpDataset.insurance.isLoading = false;
					lpDataset.insurance.isLoadingError = true;
					_defer.reject();
				});

			return _defer.promise;
		},

		moreInfoPopup : {
			isVisible: false,
			lpRest : lpRest,
			htmlContent : null,
		
			open: function() {
				if (this.isVisible)
					return;
				
				var espotname = 'DESK_Lens_Panel_Eye_Choose_Lenses';

				if ($scope.dataset.lensCategory){
					if($scope.dataset.lensCategory == lpConstants.LENS_CATEGORY.SUN){
						var espotname = 'DESK_Lens_Panel_Sun_Choose_Lenses';
					}
				} else{
					return;
				}

				var lensCategory = 'Eye';
				var isChromance = false;

				if($scope.dataset.lensCategory == lpConstants.LENS_CATEGORY.SUN){
					lensCategory = 'Sun';

					if ($scope.stepLens.tabSelected == lpConstants.BRANDS.RAYBAN){
						isChromance = $scope.dataset.isChromance(lpConstants.BRANDS.RAYBAN);
					}
				}

				if ($scope.stepLens.tabSelected !== lpConstants.BRANDS.OUR_LENSES) {
					if (!isChromance){
						espotname = 'DESK_Lens_Panel_' + lensCategory + '_' + lpConstants.ESPOT[$scope.stepLens.tabSelected];
					} else{
						espotname = 'DESK_Lens_Panel_Sun_RAY-BAN_CHROMANCE';
					}	
				}

				if($scope.dataset.isGvp()){
					if($scope.dataset.lensCategory == lpConstants.LENS_CATEGORY.SUN){
						espotname = 'DESK_Lens_Panel_Sun_Choose_Lenses_GVP'
					}else{
						espotname = 'DESK_Lens_Panel_Eye_Choose_Lenses_GVP'
					}
				}

				var _this = this;
				this.lpRest.getMoreInfoEspot(espotname).then(
					function(data){
						_this.backLabel = $window.isMobile ? 'Back' : 'Back To Lenses Selection';
						_this.htmlContent = data;
						_this.isVisible = true;
						lpScroll.disable('lensPanelId');
					}, function(error) {
						$log.error(error + ' ' + espotname);
					});
			},
		
			close: function() {
				this.isVisible = false;
				lpScroll.enable('lensPanelId');
			}
		}
	}
	
	// step Treatment
	$scope.stepTreatment = {
			
		labels: lpLabels.stepTreatment,
		dataset: lpDataset,
		
		// canenter function
		canEnter: function(context) {
			this.wzData.isDesktop = function() { return !$window.isMobile; };
			this.wzData.brandStyle = lpDataset.getBrandStyle(context.selectedBrand);
			this.wzData.lensTypeName = lpDataset.lensData.lensBrands[context.selectedBrand].lensTypes[context.selectedLensType].name.replace(/EYE|SUN/, '').trim();
			this.wzData.treatments = lpDataset.lensData.lensBrands[context.selectedBrand].lensTypes[context.selectedLensType].treatmentTypes;
			this.wzData.treatmentsNumber = Object.keys(this.wzData.treatments).length;
			this.wzData.backgroundImage = { 'background-image': 'url(' + lpDataset.lensData.lensBrands[context.selectedBrand].bgImageUrl + ')'};
			
			var _this = this.wzData;

			if(context.selectedBrand != lpConstants.BRANDS.OUR_LENSES){
				var espotname = 'DESK_' + lpConstants.ESPOT[context.selectedBrand] + '_HEADER_TREATMENT';
				
				lpRest.getBrandEspot(espotname).then(
				function(data){
					_this.htmlContent = data;
				}
				, function(error) {
					console.log(error);
				});
			}

			if (lcInsurance.isEnabled()) {
				this.wzData.getInsuranceForStep(context);
			}
			
			analyticsEnterStep('LensTreatment');
			return true;
		},
		
		// canexit function
		canExit: function(context) {
			return true;
		},

		getInsuranceForStep: function(context) {
			var _defer = $q.defer();

			if (lpDataset.insurance.isLoading) {
				_defer.reject();
				return _defer.promise;
			}

			lpDataset.insurance.isLoading = true;
			lpDataset.insurance.isLoadingError = false;

			var data = {
				storeId: lpDataset.storeId,
				catalogId: lpDataset.catalogId,
				langId: lpDataset.langId,
				pricingEntries: []
			};

			angular.forEach(lpDataset.lensData.lensBrands[context.selectedBrand].lensTypes[context.selectedLensType].treatmentTypes,
				 function(treatmentType, treatmentTypeKey) {
				angular.forEach(treatmentType.treatments, function(treatment, treatmentKey) {
					if (treatment.colorTypes) {
						angular.forEach(treatment.colorTypes, function(colorType, colorTypeKey) {
							if (colorType.colors) {
								angular.forEach(colorType.colors, function(color, colorKey) {
									if (typeof lpDataset.insurance.discounts[color.lens.partNumber] == 'undefined') {
										data.pricingEntries.push({
											frame: {
												price: lpDataset.frameData.offerPrice,
												upc: lpDataset.frameData.partNumber,
												quantity: '1',
												type: 'f'
											},
											lens: {
												price: color.lens.offerPrice,
												upc: color.lens.partNumber,
												quantity: '1',
												type: 'l'
											}
										});
									}
								});
							}
						});
					} else {
						if (typeof lpDataset.insurance.discounts[treatment.lens.partNumber] == 'undefined') {
							data.pricingEntries.push({
								frame: {
									price: lpDataset.frameData.offerPrice,
									upc: lpDataset.frameData.partNumber,
									quantity: '1',
									type: 'f'
								},
								lens: {
									price: treatment.lens.offerPrice,
									upc: treatment.lens.partNumber,
									quantity: '1',
									type: 'l'
								}
							});
						}
					}
				});
			});

			if (data.pricingEntries.length == 0) {
				lpDataset.insurance.isLoading = false;

				_defer.reject();
				return _defer.promise;
			}

			lcInsurance.getDiscounts(data)
				.then(function (response) {
					if (response && response.length > 0) {
						angular.forEach(response, function (value, key) {
							lpDataset.insurance.discounts[value.frame.upc] = value.frameDiscount;
							lpDataset.insurance.discounts[value.lens.upc] = value.lensDiscount;
						});

						lpDataset.insurance.isLoading = false;
						_defer.resolve();
					}
				}, function (error) {
					lpDataset.insurance.isLoading = false;
					lpDataset.insurance.isLoadingError = true;
					_defer.reject();
				});

			return _defer.promise;
		}
	}
	
	// step Color
	$scope.stepColor = {
			
		labels: lpLabels.stepColor,
		dataset: lpDataset,
		standard: [],
		polarized: [],
			
		// canenter function
		canEnter: function(context) {
			// selectedColorSet creato nella direttiva "lenstype"
			if (!context.selectedColorSet)
				return false;
			
			this.wzData.isMobile = function() { return $window.isMobile; };
			this.wzData.brandStyle = lpDataset.getBrandStyle(context.selectedBrand);
			this.polarizedMode = false;
			this.wzData.polarized = context.selectedColorSet.filter(function(color) { return color.isPolarized; });
			this.wzData.standard = context.selectedColorSet.filter(function(color) { return !color.isPolarized; });
			this.wzData.backgroundImage = { 'background-image': 'url(' + lpDataset.lensData.lensBrands[context.selectedBrand].bgImageUrl + ')'};

			if (this.wzData.standard.length > 0) {
				this.wzData.colors = this.wzData.standard;
			} else {
				this.wzData.colors = this.wzData.polarized;
			}
			
			// delta price
			if (this.wzData.isMixed()) {
				var _pLens = this.wzData.polarized[0].lens;
				var _sLens = this.wzData.standard[0].lens;
				
				if (_pLens && _sLens) {
					this.wzData.polarDeltaPrice = parseFloat(_pLens.offerPrice) - parseFloat(_sLens.offerPrice);
				}
			}

			var _this = this.wzData;

			if(context.selectedBrand != lpConstants.BRANDS.OUR_LENSES){
				var espotname = 'DESK_' + lpConstants.ESPOT[context.selectedBrand] + '_HEADER_COLOR';
				
				lpRest.getBrandEspot(espotname).then(
				function(data){
					_this.htmlContent = data;
				}
				, function(error) {
					console.log(error);
				});
			}

			if (lcInsurance.isEnabled())
				this.wzData.getInsuranceForStep(context);

			analyticsEnterStep('LensColor');
			return true;
		},
		
		// canexit function
		canExit: function(context) {
			if (!context.selectedColorType || !context.selectedColor)
				return false;
			
			return true;
		},
		
		isMixed: function() {
			return this.standard.length > 0 && this.polarized.length > 0;
		},
		
		togglePolarized: function() {
			this.polarizedMode = !this.polarizedMode;
			this.colors = this.polarizedMode ? this.polarized : this.standard;
		},
		
		polarizedText: function() {
			return this.polarizedMode ? this.labels.polarized : this.labels.standard;
		},

		getInsuranceForStep: function(context) {
			var _defer = $q.defer();

			if (lpDataset.insurance.isLoading) {
				_defer.reject();
				return _defer.promise;
			}

			lpDataset.insurance.isLoading = true;
			lpDataset.insurance.isLoadingError = false;

			var data = {
				storeId: lpDataset.storeId,
				catalogId: lpDataset.catalogId,
				langId: lpDataset.langId,
				pricingEntries: []
			};

			angular.forEach(lpDataset.lensData.lensBrands[context.selectedBrand].lensTypes[context.selectedLensType].colorTypes,
				 function(colorType, colorTypeKey) {
				if (colorType.colors) {
					angular.forEach(colorType.colors, function(color, colorKey) {
						if (typeof lpDataset.insurance.discounts[color.lens.partNumber] == 'undefined') {
							data.pricingEntries.push({
								frame: {
									price: lpDataset.frameData.offerPrice,
									upc: lpDataset.frameData.partNumber,
									quantity: '1',
									type: 'f'
								},
								lens: {
									price: color.lens.offerPrice,
									upc: color.lens.partNumber,
									quantity: '1',
									type: 'l'
								}
							});
						}
					});
				}
			});

			if (data.pricingEntries.length == 0) {
				lpDataset.insurance.isLoading = false;

				_defer.reject();
				return _defer.promise;
			}

			lcInsurance.getDiscounts(data)
				.then(function (response) {
					if (response && response.length > 0) {
						angular.forEach(response, function (value, key) {
							lpDataset.insurance.discounts[value.frame.upc] = value.frameDiscount;
							lpDataset.insurance.discounts[value.lens.upc] = value.lensDiscount;
						});

						lpDataset.insurance.isLoading = false;
						_defer.resolve();
					}
				}, function (error) {
					lpDataset.insurance.isLoading = false;
					lpDataset.insurance.isLoadingError = true;
					_defer.reject();
				});

			return _defer.promise;
		}
	}
	
	// step Review
	$scope.stepReview = {
			
		labels: lpLabels.stepReview,
		dataset: lpDataset,

		// canenter function
		canEnter: function(context) {
			var _brand = lpDataset.lensData.lensBrands[context.selectedBrand];
			
			if (!_brand || !_brand.lensTypes)
				return false;
			
			var _lensType = _brand.lensTypes[context.selectedLensType];
			
			if (!_lensType)
				return false;
			
			var _treatmentType = _lensType.treatmentTypes ? _lensType.treatmentTypes[context.selectedTreatmentType] : null;
			var _treatment = _treatmentType && _treatmentType.treatments ? _treatmentType.treatments[context.selectedTreatment] : null;

			var _colorType = null;

			if (_lensType.colorTypes) {
				_colorType = _lensType.colorTypes[context.selectedColorType];
			} else if (_treatment && _treatment.colorTypes) {
				_colorType = _treatment.colorTypes[context.selectedColorType];
			}

			var _color = _colorType && _colorType.colors ? _colorType.colors[context.selectedColor] : null;
			var _lens = lpDataset.getLens(context);

			this.wzData.frame = lpDataset.frameData;

			if (_lens.framePrice !== null && typeof _lens.framePrice !== 'undefined') {
				this.wzData.frame.price = _lens.framePrice;
			}

			this.wzData.lens = {
				brand: _brand.name,
				type: _lensType.name.replace(/EYE|SUN/, '').trim(),
				treatmentType: _treatmentType ? _treatmentType.name : null,
				colorType: _colorType ? _colorType.name : null,
				treatment: _treatment ? _treatment.name : null,
				color: _color ? _color.name : null,
				partNumber: _lens.partNumber,
				material: _lens.material,
				promotions: _lens.promotions,
				offerPrice: _lens.offerPrice,
				price: _lens.price
			};

			this.wzData.insurance = lpDataset.insurance;

			try {
				var _frameOfferPrice = parseFloat(this.wzData.frame.offerPrice);
				var _lensOfferPrice = parseFloat(this.wzData.lens.offerPrice);
				var _framePrice = _frameOfferPrice;
				var _lensPrice = _lensOfferPrice;
				var _insuranceSaving = 0.0;
				var _perkSaving = 0.0;

				if (this.wzData.insurance.isEnabled) {
					var _frameInsuranceDiscount = this.wzData.insurance.discounts[this.wzData.frame.partNumber];

					if (typeof _frameInsuranceDiscount !== 'undefined') {
						_framePrice = Math.max(0.00, _framePrice - _frameInsuranceDiscount);
						_insuranceSaving += _frameInsuranceDiscount;
					}

					var _lensInsuranceDiscount = this.wzData.insurance.discounts[this.wzData.lens.partNumber];

					if (typeof _lensInsuranceDiscount !== 'undefined') {
						_lensPrice = Math.max(0.00, _lensPrice - _lensInsuranceDiscount);
						_insuranceSaving += _lensInsuranceDiscount;
					}
				} else {
					if (this.wzData.frame.price != null && typeof this.wzData.frame.price !== 'undefined') {
						_framePrice = parseFloat(this.wzData.frame.price);

						if (this.wzData.frame.promotions && this.wzData.frame.promotions.perksAvailable) {
							_perkSaving += Math.max(0.00, _frameOfferPrice - _framePrice);
						}
					}

					if (this.wzData.lens.price != null && typeof this.wzData.lens.price !== 'undefined') {
						_lensPrice = parseFloat(this.wzData.lens.price);

						if (this.wzData.lens.promotions && this.wzData.lens.promotions.perksAvailable) {
							_perkSaving += Math.max(0.00, _lensOfferPrice - _lensPrice);
						}
					}
				}
				
				var _this = this.wzData;
				var _isGvp = function() {
					if (_this.insurance && _this.insurance.isEnabled)
						return false;
					
					return _this.lens && _this.lens.promotions && _this.lens.promotions.completePairAvailable;
				} 

				this.wzData.frameOfferPrice = _frameOfferPrice;
				this.wzData.lensOfferPrice = _lensOfferPrice;
				this.wzData.framePrice = _framePrice;
				this.wzData.lensPrice = _lensPrice;
				this.wzData.insuranceSaving = _insuranceSaving;
				this.wzData.perkSaving = _perkSaving;
				this.wzData.totalPrice = Math.max(0.00, _framePrice + _lensPrice);
				this.wzData.totalOfferPrice = _isGvp() ? (_frameOfferPrice + _lensOfferPrice) : this.wzData.totalPrice;
				this.wzData.gvp = _isGvp(); 
				this.wzData.addWarranty = context.addWarranty || false;
				this.wzData.warrantyChange = function() {
					context.addWarranty = this.addWarranty;
					
					// change total price
					var warrantyPrice = parseFloat(this.dataset.warrantyPrice);
					if (this.addWarranty) {
						this.totalPrice += warrantyPrice;
					} else {
						this.totalPrice -= warrantyPrice;						
					}

					context.totalPrice = this.totalPrice;
				}

				context.totalPrice = this.wzData.totalPrice;
				
			} catch (err) {
				$log.error(err);
			}

			analyticsEnterStep('LensReview');
			return true;
		},
		
		// canexit function
		canExit: function(context) {
			return true;
		},

		edit: function() {
			$scope.wizardHandler.goToFirstStep();
		}
	}
});
;
/*
 * Dataset
 */

appLensPanel

.factory('lpDataset', function(lpConstants, $q) {

    return {
    	
		getBrandStyle: function(brand) {
			if (this.isGvp())
				return 'gvp';
			
			return brand == lpConstants.BRANDS.RAYBAN ? 'rayban' : (brand == lpConstants.BRANDS.OAKLEY ? 'oakley' : (brand == lpConstants.BRANDS.COSTA ? 'costa' : 'our-lenses'));
		},

		isChromance: function(brand) {
			if (!this.lensData.lensBrands)
				return false;
			
			var _brand = this.lensData.lensBrands[brand];
			if (!_brand) {
				return false;
			}

			var check = false;
			angular.forEach(_brand.lensTypes, function(value, key) {
				if(check){
					return check;
				}
				angular.forEach(value.colorTypes, function(value2, key2) {
					if (key2 == 'CHROMANCE'){
						check = true;
						return;
					}
				});
			});

			return check;
		},
		
		isGvp: function() {
			return this.frameData.promotions && this.frameData.promotions.completePairAvailable;
		},
		
		getLens: function(context) {
			
			var _lens = { context: {}};
			if (!this.lensData.lensBrands)
				return _lens;
			
			var _brand = this.lensData.lensBrands[context.selectedBrand];
			if (!_brand) {
				throw 'Undefined brand: ' + context.selectedBrand;
			}
			
			var _lensType = _brand.lensTypes[context.selectedLensType];
			if (!_lensType) {
				throw 'Undefined lens type: ' + context.selectedLensType;
			}
			
			switch(this.lensCategory) {
			case lpConstants.LENS_CATEGORY.EYE:
				var _treatmentType = _lensType.treatmentTypes[context.selectedTreatmentType];
				if (!_treatmentType) {
					throw 'Undefined treatment type: ' + context.selectedTreatmentType;
				}

				var _treatment = _treatmentType.treatments[context.selectedTreatment];
				if (!_treatment) {
					throw 'Undefined treatment: ' + context.selectedTreatment;
				}
				
				if (_treatment.colorTypes) {
					var _colorType = _treatment.colorTypes[context.selectedColorType];
					if (!_colorType) {
						throw 'Undefined color type: ' + context.selectedColorType;
					}
					
					var _color = _colorType.colors[context.selectedColor];
					if (!_color) {
						throw 'Undefined color: ' + context.selectedColor;
					}
					
					angular.merge(_lens, _color.lens);
					_lens.color = _color.name;
				} else {
					angular.merge(_lens, _treatment.lens);					
				}
				break;
			case lpConstants.LENS_CATEGORY.SUN: 
				var _colorType = _lensType.colorTypes[context.selectedColorType];
				if (!_colorType) {
					throw 'Undefined color type: ' + context.selectedColorType;
				}

				var _color = _colorType.colors[context.selectedColor];
				if (!_color) {
					throw 'Undefined color: ' + context.selectedColor;
				}

				angular.merge(_lens, _color.lens);
				_lens.color = _color.name;
				break;
			default: 
				throw 'Invalid lens category: ' + this.lensCategory;
			}
			
			// add lens category
			_lens.category = this.lensCategory;
			
			// add context
			angular.merge(_lens.context, context);
			
			return _lens;
		},
		
		getLensPath: function(lensId, data) {
			var lensData = data || this.lensData;
			var lensPath = {};
			var lensFound = false;

			function getLensColorPath(parentObj) {
				for(var colorTypeKey in parentObj.colorTypes) {
					if (lensFound)
						break;

					var currentColorType = parentObj.colorTypes[colorTypeKey];
		
					for(var colorKey in currentColorType.colors) {
						if (lensFound)
							break;

						var currentColor = currentColorType.colors[colorKey];
		
						if (currentColor.lens && currentColor.lens.catEntryId == lensId) {
							lensPath.color = colorKey;
							lensFound = true;
						} else {
							delete lensPath.color;
						}
					}

					if (lensFound) {
						lensPath.colorType = colorTypeKey;
					} else {
						delete lensPath.colorType;
					}
				}
			}

			if (lensData.lensBrands) {
				for(var lensBrandKey in lensData.lensBrands) {
					if (lensFound)
						break;
					
					var currentLensBrand = lensData.lensBrands[lensBrandKey];

					for(var lensTypeKey in currentLensBrand.lensTypes) {
						if (lensFound)
							break;

						var currentLensType = currentLensBrand.lensTypes[lensTypeKey];

						if (currentLensType.treatmentTypes) {
							for (var treatmentTypeKey in currentLensType.treatmentTypes) {
								if (lensFound)
									break;

								var currentTreatmentType = currentLensType.treatmentTypes[treatmentTypeKey];

								for (var treatmentKey in currentTreatmentType.treatments) {
									if (lensFound)
										break;

									var currentTreatment = currentTreatmentType.treatments[treatmentKey];

									if (currentTreatment.colorTypes) {
										getLensColorPath(currentTreatment);
									} else {
										if (currentTreatment.lens && currentTreatment.lens.catEntryId == lensId) {
											lensPath.treatment = treatmentKey;
											lensFound = true;
										} else {
											delete lensPath.treatment;
										}
									}
								}

								if (lensFound) {
									lensPath.treatmentType = treatmentTypeKey;
								} else {
									delete lensPath.treatmentType;
								}
							}
						} else if (currentLensType.colorTypes) {
							getLensColorPath(currentLensType);
						}

						if (lensFound) {
							lensPath.lensType = lensTypeKey;
						} else {
							delete lensPath.lensType;
						}
					}

					if (lensFound) {
						lensPath.lensBrand = lensBrandKey;
					} else {
						delete lensPath.lensBrand;
					}
				}
			}

			return lensPath;
		},
		
		frameData: {},
		lensData: {},
	
		insurance: {
			isEnabled: false,
    		isLoading: false,
			isLoadingError: false,
			discounts: {}
		}
    }
});
;
appLensPanel.

factory('lpModalService', function($rootScope, $http, $httpParamSerializerJQLike, $q, $log) {
	
	return {
		
		CALLERID_PDP: 'PDP',
		CALLERID_CART: 'CART',
		
		CLOSE_ACTION_CANCEL: 'cancel',
		CLOSE_ACTION_SAVE: 'save',
		CLOSE_ACTION_ADDTOCART: 'addtocart',
		CLOSE_ACTION_APPLY: 'apply',
		
		// modal visibility
		isVisible: false,

		// Add to cart
		isAddingToCart: false,
		
		// caller
		callerId: null,

		// selected perk code
		selectedPerkCode: null,
		
		open: function(_params, _callerId, _context) {
			// event
			$rootScope.$broadcast('lenspanel:opened', _params, _callerId, _context);
			
			this.callerId = _callerId;
			this.isVisible = true;			
		},
		
		close: function(_action, _params) {
			this.isVisible = false;

			// event
			$rootScope.$broadcast('lenspanel:closed', this.callerId, _action || this.CLOSE_ACTION_CANCEL, _params);
			
			this.callerId = null;
		},

		addToCart: function(_params) {
			var _defer = $q.defer();

			if (this.isAddingToCart) {
				_defer.reject();
				return _defer;
			}

			this.isAddingToCart = true;

			var _this = this;
			
			$http.post(getAbsoluteURL() + 'LCOrderItemAddGlassesCmd', $httpParamSerializerJQLike(_params), {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
				.then(function(response) {
					var _data = response.data;

					if (typeof _data === 'string') {
						_data = _data ? _data.replace('/*', '').replace('*/', '') : {};
						_data = JSON.parse(_data);
					}
					
					_this.isAddingToCart = false;

					if (_data.errorMessage) {
						_defer.reject(_data.errorMessage);
					} else {
						_defer.resolve(response.data);
					}
				}, function(error) { 
					$log.error(error);

					_this.isAddingToCart = false;

					_defer.reject('Cannot add to cart');
				});

			return _defer.promise;
		},
		
		/**
		 * External function for RXC to add to cart, it also handles the warranty
		 */
		genericAddToCart: function(_selectedFrame, _selectedLens, _selectedWarranty) {
			var _params = {
	            frameCatentryId: _selectedFrame.catEntryId,
	            lensColor: _selectedLens.lensPackage.color || '',
	            lens: '' + _selectedLens.lensPackage.catEntryId,
	            orderId: '.',
				URL: '',
				addOns: '',
				includeLens: true,
				tah: false
	        };
			
		    if (_selectedWarranty) {
	            _params.warrantyCatentryId = _selectedWarranty.id;
	            _params.addWarranty = true;
	        } 
			
			var _defer = $q.defer();

			if (this.isAddingToCart) {
				_defer.reject();
				return _defer;
			}

			this.isAddingToCart = true;

			var _this = this;
			
			$http.post(getAbsoluteURL() + 'LCOrderItemAddGlassesCmd', $httpParamSerializerJQLike(_params), {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
				.then(function(response) {
					var _data = response.data;

					if (typeof _data === 'string') {
						_data = _data ? _data.replace('/*', '').replace('*/', '') : {};
						_data = JSON.parse(_data);
					}
					
					_this.isAddingToCart = false;

					if (_data.errorMessage) {
						_defer.reject(_data.errorMessage);
					} else {
						_defer.resolve(response.data);

						var _cartParams = ''
							+ 'storeId=' +  constants.ajaxParams['storeId']
							+ '&catalogId=' + constants.ajaxParams['catalogId']
							+ '&langId=' + (constants.ajaxParams['langId'] || '-1')
							+ '&URL=AjaxOrderItemDisplayView'
							+ '&errorViewName=AjaxOrderItemDisplayView'
							+ '&orderId=.'
							+ '&updatePrices=1'
							+ '&calculationUsageId=-1'
							+ '&chooseBenefit=false';

						window.location = getAbsoluteURL() + 'OrderCalculate?' + _cartParams;
					}
					
				}, function(error) { 
					$log.error(error);

					_this.isAddingToCart = false;

					_defer.reject('Cannot add to cart');
				});

			return _defer.promise;
		},
		
		/**
		 * External function for RXC to save lens selection
		 */
		genericSaveLensSelection: function(_selectedFrame, _selectedLens, _selectedWarranty, _selectedFrameBrandImage) {
			$rootScope.$apply(function() {
				$rootScope.rxc.selectedLens = _selectedLens;
				$rootScope.rxc.selectedWarranty = _selectedWarranty;
				$rootScope.rxc.selectedFrame = _selectedFrame;
				$rootScope.rxc.selectedFrameBrandImage = _selectedFrameBrandImage;
				$rootScope.genericCalculatePrices();
			});
		},
		
		/**
		 * External function for RXC to release widget
		 */
		genericExit: function() {
			// workaround to hide cart header
			var _header = document.getElementById('header_wrapper');
			_header.style.zIndex = '';

			$rootScope.$apply(function() {
				delete $rootScope.rxc.rxcWidget;
			});
		},
		
		/**
		 * External function for RXC to save lens selection in cart
		 */
		genericSaveEditFromCart: function(_selectedFrame, _selectedLens, _selectedWarranty, _cartData) {
	        var params = {
	            orderId: '.',
	            lensCatentryId: '' + _selectedLens.lensPackage.catEntryId,
	            lensColor:  _selectedLens.lensPackage.color || '',
	            lens:  '' + _selectedLens.lensPackage.catEntryId,
	            addOns: '',
	            URL: '',
	            includeLens: true,
	            orderItemId: _cartData.orderItemId,
	            fromPage: "ShopCart",
	            addRxLenses: true
	        };
	        
	        if (_selectedWarranty) {
				params.addWarranty = true;
				params.warrantyCatentryId = _selectedWarranty.id;
			}
	        /* to be fixed
	        else if (_params.warrantyCatentryIdToRemove){
				params.removeWarranty = true;
				params.warrantyCatentryId = _selectedWarranty.id;
			}*/

	        $.ajax({ //da cambiare in chiamata angular
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
	            },
	            error: function(xhr, text, error) {
	            	console.log(xhr);
	            }
	        });
		},
		
		loadContent: function(contentName) {
			var _defer = $q.defer();

			var urlPrefix = '';

			if (window.location.href.indexOf('127.0.0.1') != -1) {
				urlPrefix = 'https://localhost:8000';
			}

			$http.get(
				urlPrefix +
				'/wcs/resources/store/' +
				constants.ajaxParams['storeId'] +
				'/espot/' +
				contentName
			)
				.then(function(res) {
					if (
						res.data.MarketingSpotData &&
						res.data.MarketingSpotData.length > 0 &&
						res.data.MarketingSpotData[0].baseMarketingSpotActivityData &&
						res.data.MarketingSpotData[0].baseMarketingSpotActivityData.length > 0 &&
						res.data.MarketingSpotData[0].baseMarketingSpotActivityData[0]
							.marketingContentDescription &&
						res.data.MarketingSpotData[0].baseMarketingSpotActivityData[0]
							.marketingContentDescription.length > 0 &&
						res.data.MarketingSpotData[0].baseMarketingSpotActivityData[0]
							.marketingContentDescription[0].marketingText
					) {
						_defer.resolve(res.data.MarketingSpotData[0].baseMarketingSpotActivityData[0]
							.marketingContentDescription[0].marketingText);
					}
				});

			return _defer.promise;
		},

		loadLearnMoreContent: function(contentName) {
			return this.loadContent(contentName);
		},
	}
});
;
/*
 * Rest services
 */

appLensPanel

.factory('lpRest', function($http, $q, $log, $window, $timeout) {
	
	return {
		
		getUrlPrefix: function() {

			var urlPrefix = '';
			
			if ($window.location.href.indexOf("127.0.0.1") != -1){
				urlPrefix = 'https://localhost:8000';
			}
			
			return urlPrefix;
		},

		getBrandEspot: function(espotName) {
			var _defer = $q.defer();
			var urlPrefix = this.getUrlPrefix();

			$http.get(urlPrefix + '/wcs/resources/store/' + storeId + '/espot/' + espotName)
				.then(function (response) {
					if(response.data.MarketingSpotData
						&& response.data.MarketingSpotData.length > 0
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData 
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData.length > 0 
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription.length > 0
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription[0].marketingText){
						
						_defer.resolve(response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription[0].marketingText);
					}else{
						_defer.reject('Espot not found');
					}
				}, function (error) {
                	_defer.reject(error);
				});

			return _defer.promise;
		},

		getMoreInfoEspot: function(espotName) {
			var _defer = $q.defer();
			var urlPrefix = this.getUrlPrefix();

			$http.get(urlPrefix + '/wcs/resources/store/' + storeId + '/espot/' + espotName)
				.then(function (response) {
					if(response.data.MarketingSpotData
						&& response.data.MarketingSpotData.length > 0
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData 
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData.length > 0 
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription.length > 0
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription[0].marketingText){
						
						_defer.resolve(response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription[0].marketingText);
					}else{
						$log.error('Error getting espot');
						_defer.reject('Error getting espot');
					}
				}, function (error) {
					$log.error(error);
                	_defer.reject(error);
				});

			return _defer.promise;
		},
		
		getLenses: function(storeId, catalogId, frameId, selectedPerkCode) {
			
			var _defer = $q.defer();
			var urlPrefix = this.getUrlPrefix();
			var url = '/wcs/resources/store/' + storeId + '/catalog/' + catalogId + '/lenspanel/frameId/' + frameId + '/lenses';

			if (selectedPerkCode) {
				url += '?selectedPerkCode=' + selectedPerkCode;
			}

			$http.get(urlPrefix + url)
				.then(function(response) {
					if (response && response.data && response.data.response && response.data.response.status == 'ok') {
						
						_defer.resolve(response.data.response.data);
					} else {						
						$log.error(response.data.response.messages);
						_defer.reject(response.data.response.messages);						
					}
				}, function (error) {
					$log.error(error);
                	_defer.reject(error);
				});
				
			return _defer.promise;
		}
	}
});
;
/*
 * Utility services
 */

appLensPanel

.factory('lpAnalytics', function(lpConstants, lpDataset) {
	
	return {
		getProducts: function(frame, lens) {
			var _category = lpDataset.lensCategory == lpConstants.LENS_CATEGORY.EYE ? 'OPTICS' : 'SUN';
			var _products = {};
			var _glass = {};
			var _upc = frame.partNumber;
			_glass.Status = 'Available';
			_glass.Sku = _upc; 					
			_glass.Price = frame.price || frame.offerPrice;
			_glass.Category = _category;
			_glass.Type = lens.partNuber != '99' ? 'RX' : 'STD';
			_glass.Brand = frame.brand; 
			_glass.ModelName = frame.name; 
			_glass.LensUPC = lens.partNumber;
			_glass.Lens = lens.productPartNumber;
			_glass.LensColor = lens.color;
			
			var _lens = {};				
			_lens.id = lens.partNumber; 					              	
          	_lens.reg_price = lens.price || lens.offerPrice;
        	_lens.category = _category; 
			_glass.applied_lenses = _lens; 			
			_products[_upc] = _glass;			
			
			return _products;
		}
	}
})

.factory('lpUrl', function($window) {
	
	return function(uri) {
		var _url = $window.location.hostname;
		if (_url.indexOf("localhost") != -1) {
			_url = 'https://localhost/webapp/wcs/stores/servlet/lc-us';
		} else {
			_url = 'https://' + _url;
		}
		
		return uri ? _url + uri : _url;
	}
})

.factory('lpScroll', function($timeout) {
	
	return {
		
		containerId: 'lensPanelId',
		
		top: function() {
			var _this = this;
			
			$timeout(function() { 
				var _container = angular.element(document.getElementById(_this.containerId));
				_container.scrollTop(0);
			});
		},
		
		bottom: function() {
			var _this = this;
						
			$timeout(function() { 
				var _container = angular.element(document.getElementById(_this.containerId));
				_container.scrollTo(0, _container[0].scrollHeight);
			});
		},
		
		scrollTo: function(_id) {
			var _this = this;
						
			$timeout(function() { 
				var _container = angular.element(document.getElementById(_this.containerId));
				var _element = angular.element(document.getElementById(_id));
				_container.scrollToElement(_element, 0);
			});
		},
		
		disable: function(_id) {
			
			if (!_id) {
				var _els = document.querySelectorAll('html,body');
				var i;
				for (i=0; i<_els.length; i++) {
					_els[i].style.overflow = 'hidden';
				}
				return;
			}		
				
			var _el = document.getElementById(_id);
			
			if (_el)
				_el.style.overflow = 'hidden';
		},
		
		enable: function(_id) {

			if (!_id) {
				var _els = document.querySelectorAll('html,body');
				var i;
				for (i=0; i<_els.length; i++) {
					_els[i].style.overflow = '';
				}
				return;
			}		
			
			var _el = document.getElementById(_id);
			
			if (_el)
				_el.style.overflow = '';
		}
	}
})

.factory('lpLoader', function() {
	
	function _create() {
		// create loader item
		var _div = document.createElement('div');
		_div.id = 'loader';
		_div.className = 'wait-loader hidden';
		_div.addEventListener("click", function(event) {
			event.preventDefault();
        	event.stopImmediatePropagation();
		});
		
		// add spinner
		var _spin = document.createElement('em');
		_spin.className = 'fa fa-spinner fa-spin';
		_div.appendChild(_spin);
		
		// add to container
		var _container = document.getElementById('page-container');

		if (!angular.isUndefined(_container)) {
			_container.appendChild(_div);
		}
		
		return _div;
	}
	
	return {
		_loader: null,
		
		show: function() {
			if (this._loader == null) {					
				this._loader = _create();
			}
			
			this._loader.classList.remove("hidden");	
		},
		
		hide: function() {
			if (this._loader == null) {					
				this._loader = _create();
			}
			
			this._loader.classList.add("hidden");	
		}
	}
});;
/**
 * Easy to use Wizard library for Angular JS
 * @version v1.1.1 - 2017-06-07 * @link https://github.com/mgonto/angular-wizard
 * @author Martin Gontovnikas <martin@gon.to>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('templates-angularwizard', ['step.html', 'wizard.html']);

angular.module("step.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("step.html",
    "<section ng-show=\"selected\" ng-class=\"{current: selected, done: completed}\" class=\"step\" ng-transclude>\n" +
    "</section>");
}]);

angular.module("wizard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("wizard.html",
    "<div>\n" +
    "    <h2 ng-show=\"selectedStep.wzHeadingTitle != ''\">{{ selectedStep.wzHeadingTitle }}</h2>\n" +
    "\n" +
    "    <div class=\"steps\" ng-if=\"indicatorsPosition === 'bottom'\" ng-transclude></div>\n" +
    "    <ul class=\"steps-indicator steps-{{getEnabledSteps().length}}\" ng-if=\"!hideIndicators\">\n" +
    "      <li ng-class=\"{default: !step.completed && !step.selected, current: step.selected && !step.completed, done: step.completed && !step.selected, editing: step.selected && step.completed}\" ng-repeat=\"step in getEnabledSteps()\">\n" +
    "        <a ng-click=\"goTo(step)\">{{step.title || step.wzTitle}}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <div class=\"steps\" ng-if=\"indicatorsPosition === 'top'\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module('mgo-angular-wizard', ['templates-angularwizard']);

angular.module('mgo-angular-wizard').directive('wzStep', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            wzTitle: '@',
            wzHeadingTitle: '@',
            canenter : '=',
            canexit : '=',
            disabled: '@?wzDisabled',
            description: '@',
            wzData: '=',
            wzOrder: '@?'
        },
        require: '^wizard',
        templateUrl: function(element, attributes) {
          return attributes.template || "step.html";
        },
        link: function ($scope, $element, $attrs, wizard) {
            $attrs.$observe('wzTitle', function (value) {
                $scope.title = $scope.wzTitle;
            });
            $scope.title = $scope.wzTitle;
            wizard.addStep($scope);
            $scope.$on('$destroy', function(){
                wizard.removeStep($scope);
            });
        }
    };
});

//wizard directive
angular.module('mgo-angular-wizard').directive('wizard', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            currentStep: '=',
            onCancel: '&',
            onFinish: '&',
            hideIndicators: '=',
            editMode: '=',
            name: '@',
            indicatorsPosition: '@?'
        },
        templateUrl: function(element, attributes) {
            return attributes.template || "wizard.html";
        },

        //controller for wizard directive, treat this just like an angular controller
        controller: ['$scope', '$element', '$log', 'WizardHandler', '$q', '$timeout', function ($scope, $element, $log, WizardHandler, $q, $timeout) {
            //setting default step position if none declared.
            if ($scope.indicatorsPosition == undefined) {
                $scope.indicatorsPosition = 'bottom';
            }
            //this variable allows directive to load without having to pass any step validation
            var firstRun = true;
            //creating instance of wizard, passing this as second argument allows access to functions attached to this via Service
            WizardHandler.addWizard($scope.name || WizardHandler.defaultName, this);
            
            $scope.$on('$destroy', function() {
                WizardHandler.removeWizard($scope.name || WizardHandler.defaultName);
            });

            //steps array where all the scopes of each step are added
            $scope.steps = [];

            var stepIdx = function(step) {
                var idx = 0;
                var res = -1;
                angular.forEach($scope.getEnabledSteps(), function(currStep) {
                  if (currStep === step) {
                    res = idx;
                  }
                  idx++;
                });
                return res;
            };

            var stepByTitle = function(titleToFind) {
              var foundStep = null;
              angular.forEach($scope.getEnabledSteps(), function(step) {
                if (step.wzTitle === titleToFind) {
                  foundStep = step;
                }
              });
              return foundStep;
            };


            //update completed state for each step based on the editMode and current step number
            var handleEditModeChange = function() {
                var editMode = $scope.editMode;
                if (angular.isUndefined(editMode) || (editMode === null)) return;

                //Set completed for all steps to the value of editMode
                angular.forEach($scope.steps, function (step) {
                    step.completed = editMode;
                });

                //If editMode is false, set ONLY ENABLED steps with index lower then completedIndex to completed
                if (!editMode) {
                    var completedStepsIndex = $scope.currentStepNumber() - 1;
                    angular.forEach($scope.getEnabledSteps(), function(step, stepIndex) {
                        if(stepIndex < completedStepsIndex) {
                            step.completed = true;
                        }
                    });
                }
            };

            //access to context object for step validation
            $scope.context = {};

            //watching changes to currentStep
            $scope.$watch('currentStep', function(step) {
                //checking to make sure currentStep is truthy value
                if (!step) return;
                //setting stepTitle equal to current step title or default title
                var stepTitle = $scope.selectedStep.wzTitle;
                if ($scope.selectedStep && stepTitle !== $scope.currentStep) {
                    //invoking goTo() with step title as argument
                    $scope.goTo(stepByTitle($scope.currentStep));
                }
            });

            //watching steps array length and editMode value, if edit module is undefined or null the nothing is done
            //if edit mode is truthy, then all steps are marked as completed
            $scope.$watch('[editMode, steps.length]', function() {
                handleEditModeChange();
            }, true);

            //called each time step directive is loaded
            this.addStep = function(step) {
                var wzOrder = (step.wzOrder >= 0 && !$scope.steps[step.wzOrder]) ? step.wzOrder : $scope.steps.length;
                //adding the scope of directive onto step array
                $scope.steps[wzOrder] = step;
                //if this step is the new first then goTo it
                if ($scope.getEnabledSteps()[0] === step) {
                    //goTo first step
                    $scope.goTo($scope.getEnabledSteps()[0]);
                }
            };

            //called each time step directive is destroyed
            this.removeStep = function (step) {
                var index = $scope.steps.indexOf(step);
                if (index > 0) {
                    $scope.steps.splice(index, 1);
                }
            };

            this.context = $scope.context;

            $scope.getStepNumber = function(step) {
                return stepIdx(step) + 1;
            };

            $scope.goTo = function(step) {
                //if this is the first time the wizard is loading it bi-passes step validation
                if(firstRun){
                    //deselect all steps so you can set fresh below
                    unselectAll();
                    $scope.selectedStep = step;
                    //making sure current step is not undefined
                    if (!angular.isUndefined($scope.currentStep)) {
                        $scope.currentStep = step.wzTitle;
                    }
                    //setting selected step to argument passed into goTo()
                    step.selected = true;
                    //emit event upwards with data on goTo() invoktion
                    $scope.$emit('wizard:stepChanged', {step: step, index: stepIdx(step)});
                    //setting variable to false so all other step changes must pass validation
                    firstRun = false;
                } else {
                    //createing variables to capture current state that goTo() was invoked from and allow booleans
                    var thisStep;
                    //getting data for step you are transitioning out of
                    if($scope.currentStepNumber() > 0){
                        thisStep = $scope.currentStepNumber() - 1;
                    } else if ($scope.currentStepNumber() === 0){
                        thisStep = 0;
                    }
                    //$log.log('steps[thisStep] Data: ', $scope.getEnabledSteps()[thisStep].canexit);
                    $q.all([canExitStep($scope.getEnabledSteps()[thisStep], step), canEnterStep(step)]).then(function(data) {
                        if(data[0] && data[1]){
                            //deselect all steps so you can set fresh below
                            unselectAll();

                            //$log.log('value for canExit argument: ', $scope.currentStep.canexit);
                            $scope.selectedStep = step;
                            //making sure current step is not undefined
                            if(!angular.isUndefined($scope.currentStep)){
                                $scope.currentStep = step.wzTitle;
                            }
                            //setting selected step to argument passed into goTo()
                            step.selected = true;
                            //emit event upwards with data on goTo() invoktion
                            $scope.$emit('wizard:stepChanged', {step: step, index: stepIdx(step)});
                            //$log.log('current step number: ', $scope.currentStepNumber());
                        } else {
                            $scope.$emit('wizard:stepChangeFailed', {step: step, index: stepIdx(step)});
                        }
                    });
                }
            };

            function canEnterStep(step) {
                var defer;
                var canEnter;
                //If no validation function is provided, allow the user to enter the step
                if(step.canenter === undefined){
                    return true;
                }
                //If canenter is a boolean value instead of a function, return the value
                if(typeof step.canenter === 'boolean'){
                    return step.canenter;
                }
                //If canenter is a string instead of a function, evaluate the function
                if(typeof step.canenter === 'string'){
                    var splitFunction = step.canenter.split('(');
                    canEnter = eval('$scope.$parent.' + splitFunction[0] + '($scope.context' + splitFunction[1])
                } else {
                    canEnter = step.canenter($scope.context);
                }
                //Check to see if the canenter function is a promise which needs to be returned
                if(angular.isFunction(canEnter.then)){
                    defer = $q.defer();
                    canEnter.then(function(response){
                        defer.resolve(response);
                    });
                    return defer.promise;
                } else {
                    return canEnter === true;
                }
            }

            function canExitStep(step, stepTo) {
                var defer;
                var canExit;
                //Exiting the step should be allowed if no validation function was provided or if the user is moving backwards
                if(typeof(step.canexit) === 'undefined' || $scope.getStepNumber(stepTo) < $scope.currentStepNumber()){
                    return true;
                }
                //If canexit is a boolean value instead of a function, return the value
                if(typeof step.canexit === 'boolean'){
                    return step.canexit;
                }
                //If canenter is a string instead of a function, evaluate the function
                if(typeof step.canexit === 'string'){
                    var splitFunction = step.canexit.split('(');
                    canExit = eval('$scope.$parent.' + splitFunction[0] + '($scope.context' + splitFunction[1])
                } else {
                    canExit = step.canexit($scope.context);
                }
                //Check to see if the canexit function is a promise which needs to be returned
                if(angular.isFunction(canExit.then)){
                    defer = $q.defer();
                    canExit.then(function(response){
                        defer.resolve(response);
                    });
                    return defer.promise;
                } else {
                    return canExit === true;
                }
            }

            $scope.currentStepNumber = function() {
                //retreive current step number
                return stepIdx($scope.selectedStep) + 1;
            };

            $scope.getEnabledSteps = function() {
                return $scope.steps.filter(function(step){
                    return step && step.disabled !== 'true';
                });
            };
            
            //Progress percentual
            $scope.getProgressPercentual = function(steps, zeroBased) {
                return zeroBased ? Math.ceil((($scope.currentStepNumber() - 1) / steps) * 100) + '%' : Math.ceil(($scope.currentStepNumber() / steps) * 100) + '%';
            };

            //unSelect All Steps
            function unselectAll() {
                //traverse steps array and set each "selected" property to false
                angular.forEach($scope.getEnabledSteps(), function (step) {
                    step.selected = false;
                });
                //set selectedStep variable to null
                $scope.selectedStep = null;
            }

            //ALL METHODS ATTACHED TO this ARE ACCESSIBLE VIA WizardHandler.wizard().methodName()

            this.currentStepTitle = function(){
                return $scope.selectedStep ? $scope.selectedStep.wzTitle : '';
            };

            this.currentStepDescription = function(){
                return $scope.selectedStep ? $scope.selectedStep.description : '';
            };

            this.currentStep = function(){
                return $scope.selectedStep;
            };

            this.totalStepCount = function() {
                return $scope.getEnabledSteps().length;
            };

            //Access to enabled steps from outside
            this.getEnabledSteps = function(){
                return $scope.getEnabledSteps();
            };

            //Access to current step number from outside
            this.currentStepNumber = function(){
                return $scope.currentStepNumber();
            };

            //method used for next button within step
            this.next = function(callback) {
                var enabledSteps = $scope.getEnabledSteps();
                //setting variable equal to step  you were on when next() was invoked
                var index = stepIdx($scope.selectedStep);
                //checking to see if callback is a function
                if(angular.isFunction(callback)){
                   if(callback()){
                        if (index === enabledSteps.length - 1) {
                            this.finish();
                        } else {
                            //invoking goTo() with step number next in line
                            $scope.goTo(enabledSteps[index + 1]);
                        }
                   } else {
                        return;
                   }
                }
                if (!callback) {
                    //completed property set on scope which is used to add class/remove class from progress bar
                    $scope.selectedStep.completed = true;
                }
                //checking to see if this is the last step.  If it is next behaves the same as finish()
                if (index === enabledSteps.length - 1) {
                    this.finish();
                } else {
                    //invoking goTo() with step number next in line
                    $scope.goTo(enabledSteps[index + 1]);
                }

            };

            //used to traverse to any step, step number placed as argument
            this.goTo = function(step) {
                //wrapped inside $timeout so newly enabled steps are included.
                $timeout(function() {
                    var enabledSteps = $scope.getEnabledSteps();
                    var stepTo;
                    //checking that step is a Number
                    if (angular.isNumber(step)) {
                        stepTo = enabledSteps[step];
                    } else {
                        //finding the step associated with the title entered as goTo argument
                        stepTo = stepByTitle(step);
                    }
                    //going to step
                    $scope.goTo(stepTo);
                });
            };

            //calls finish() which calls onFinish() which is declared on an attribute and linked to controller via wizard directive.
            this.finish = function() {
                if ($scope.onFinish) {
                    $scope.onFinish();
                }
            };

            this.previous = function() {
                //getting index of current step
                var index = stepIdx($scope.selectedStep);
                //ensuring you aren't trying to go back from the first step
                if (index === 0) {
                    throw new Error("Can't go back. It's already in step 0");
                } else {
                    //go back one step from current step
                    $scope.goTo($scope.getEnabledSteps()[index - 1]);
                }
            };

            this.goToFirstStep = function() {
                //go back one step from current step
                $scope.goTo($scope.getEnabledSteps()[0]);
            };

            //cancel is alias for previous.
            this.cancel = function() {
            	if ($scope.onCancel) {
                    //onCancel is linked to controller via wizard directive:
                    $scope.onCancel();
                } else {
                    //getting index of current step
                    var index = stepIdx($scope.selectedStep);
                    //ensuring you aren't trying to go back from the first step
                    if (index === 0) {
                        throw new Error("Can't go back. It's already in step 0");
                    } else {
                        //go back one step from current step
                        $scope.goTo($scope.getEnabledSteps()[0]);
                    }                	
                }
            };

            //reset
            this.reset = function(){
                //traverse steps array and set each "completed" property to false
                angular.forEach($scope.getEnabledSteps(), function (step) {
                    step.completed = false;
                });
                //go to first step
                firstRun = true;
                this.goTo(0);
            };

            //change edit mode
            this.setEditMode = function(mode) {
                $scope.editMode = mode;
                handleEditModeChange();
            };
            
            // creation event
            $scope.$emit('wizard:created');
        }]
    };
});

function wizardButtonDirective(action) {
    angular.module('mgo-angular-wizard')
        .directive(action, function() {
            return {
                restrict: 'A',
                replace: false,
                require: '^wizard',
                link: function($scope, $element, $attrs, wizard) {

                    $element.on("click", function(e) {
                        e.preventDefault();
                        $scope.$apply(function() {
                            $scope.$eval($attrs[action]);
                            wizard[action.replace("wz", "").toLowerCase()]();
                        });
                    });
                }
            };
        });
}

wizardButtonDirective('wzNext');
wizardButtonDirective('wzPrevious');
wizardButtonDirective('wzFinish');
wizardButtonDirective('wzCancel');
wizardButtonDirective('wzReset');

angular.module('mgo-angular-wizard').factory('WizardHandler', function() {
   var service = {};
   
   var wizards = {};
   
   service.defaultName = "defaultWizard";
   
   service.addWizard = function(name, wizard) {
       wizards[name] = wizard;
   };
   
   service.removeWizard = function(name) {
       delete wizards[name];
   };
   
   service.wizard = function(name) {
       var nameToUse = name;
       if (!name) {
           nameToUse = service.defaultName;
       }
       
       return wizards[nameToUse];
   };
   
   return service;
});;
/**
  * x is a value between 0 and 1, indicating where in the animation you are.
  */
var duScrollDefaultEasing = function (x) {
  'use strict';

  if(x < 0.5) {
    return Math.pow(x*2, 2)/2;
  }
  return 1-Math.pow((1-x)*2, 2)/2;
};

var duScroll = angular.module('duScroll', [
  'duScroll.scrollspy',
  'duScroll.smoothScroll',
  'duScroll.scrollContainer',
  'duScroll.spyContext',
  'duScroll.scrollHelpers'
])
  //Default animation duration for smoothScroll directive
  .value('duScrollDuration', 350)
  //Scrollspy debounce interval, set to 0 to disable
  .value('duScrollSpyWait', 100)
  //Scrollspy forced refresh interval, use if your content changes or reflows without scrolling.
  //0 to disable
  .value('duScrollSpyRefreshInterval', 0)
  //Wether or not multiple scrollspies can be active at once
  .value('duScrollGreedy', false)
  //Default offset for smoothScroll directive
  .value('duScrollOffset', 0)
  //Default easing function for scroll animation
  .value('duScrollEasing', duScrollDefaultEasing)
  //Which events on the container (such as body) should cancel scroll animations
  .value('duScrollCancelOnEvents', 'scroll mousedown mousewheel touchmove keydown')
  //Whether or not to activate the last scrollspy, when page/container bottom is reached
  .value('duScrollBottomSpy', false)
  //Active class name
  .value('duScrollActiveClass', 'active');

if (typeof module !== 'undefined' && module && module.exports) {
  module.exports = duScroll;
}


angular.module('duScroll.scrollHelpers', ['duScroll.requestAnimation'])
.run(["$window", "$q", "cancelAnimation", "requestAnimation", "duScrollEasing", "duScrollDuration", "duScrollOffset", "duScrollCancelOnEvents", function($window, $q, cancelAnimation, requestAnimation, duScrollEasing, duScrollDuration, duScrollOffset, duScrollCancelOnEvents) {
  'use strict';

  var proto = {};

  var isDocument = function(el) {
    return (typeof HTMLDocument !== 'undefined' && el instanceof HTMLDocument) || (el.nodeType && el.nodeType === el.DOCUMENT_NODE);
  };

  var isElement = function(el) {
    return (typeof HTMLElement !== 'undefined' && el instanceof HTMLElement) || (el.nodeType && el.nodeType === el.ELEMENT_NODE);
  };

  var unwrap = function(el) {
    return isElement(el) || isDocument(el) ? el : el[0];
  };

  proto.duScrollTo = function(left, top, duration, easing) {
    var aliasFn;
    if(angular.isElement(left)) {
      aliasFn = this.duScrollToElement;
    } else if(angular.isDefined(duration)) {
      aliasFn = this.duScrollToAnimated;
    }
    if(aliasFn) {
      return aliasFn.apply(this, arguments);
    }
    var el = unwrap(this);
    if(isDocument(el)) {
      return $window.scrollTo(left, top);
    }
    el.scrollLeft = left;
    el.scrollTop = top;
  };

  var scrollAnimation, deferred;
  proto.duScrollToAnimated = function(left, top, duration, easing) {
    if(duration && !easing) {
      easing = duScrollEasing;
    }
    var startLeft = this.duScrollLeft(),
        startTop = this.duScrollTop(),
        deltaLeft = Math.round(left - startLeft),
        deltaTop = Math.round(top - startTop);

    var startTime = null, progress = 0;
    var el = this;

    var cancelScrollAnimation = function($event) {
      if (!$event || (progress && $event.which > 0)) {
        if(duScrollCancelOnEvents) {
          el.unbind(duScrollCancelOnEvents, cancelScrollAnimation);
        }
        cancelAnimation(scrollAnimation);
        deferred.reject();
        scrollAnimation = null;
      }
    };

    if(scrollAnimation) {
      cancelScrollAnimation();
    }
    deferred = $q.defer();

    if(duration === 0 || (!deltaLeft && !deltaTop)) {
      if(duration === 0) {
        el.duScrollTo(left, top);
      }
      deferred.resolve();
      return deferred.promise;
    }

    var animationStep = function(timestamp) {
      if (startTime === null) {
        startTime = timestamp;
      }

      progress = timestamp - startTime;
      var percent = (progress >= duration ? 1 : easing(progress/duration));

      el.scrollTo(
        startLeft + Math.ceil(deltaLeft * percent),
        startTop + Math.ceil(deltaTop * percent)
      );
      if(percent < 1) {
        scrollAnimation = requestAnimation(animationStep);
      } else {
        if(duScrollCancelOnEvents) {
          el.unbind(duScrollCancelOnEvents, cancelScrollAnimation);
        }
        scrollAnimation = null;
        deferred.resolve();
      }
    };

    //Fix random mobile safari bug when scrolling to top by hitting status bar
    el.duScrollTo(startLeft, startTop);

    if(duScrollCancelOnEvents) {
      el.bind(duScrollCancelOnEvents, cancelScrollAnimation);
    }

    scrollAnimation = requestAnimation(animationStep);
    return deferred.promise;
  };

  proto.duScrollToElement = function(target, offset, duration, easing) {
    var el = unwrap(this);
    if(!angular.isNumber(offset) || isNaN(offset)) {
      offset = duScrollOffset;
    }
    var top = this.duScrollTop() + unwrap(target).getBoundingClientRect().top - offset;
    if(isElement(el)) {
      top -= el.getBoundingClientRect().top;
    }
    return this.duScrollTo(0, top, duration, easing);
  };

  proto.duScrollLeft = function(value, duration, easing) {
    if(angular.isNumber(value)) {
      return this.duScrollTo(value, this.duScrollTop(), duration, easing);
    }
    var el = unwrap(this);
    if(isDocument(el)) {
      return $window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft;
    }
    return el.scrollLeft;
  };
  proto.duScrollTop = function(value, duration, easing) {
    if(angular.isNumber(value)) {
      return this.duScrollTo(this.duScrollLeft(), value, duration, easing);
    }
    var el = unwrap(this);
    if(isDocument(el)) {
      return $window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    }
    return el.scrollTop;
  };

  proto.duScrollToElementAnimated = function(target, offset, duration, easing) {
    return this.duScrollToElement(target, offset, duration || duScrollDuration, easing);
  };

  proto.duScrollTopAnimated = function(top, duration, easing) {
    return this.duScrollTop(top, duration || duScrollDuration, easing);
  };

  proto.duScrollLeftAnimated = function(left, duration, easing) {
    return this.duScrollLeft(left, duration || duScrollDuration, easing);
  };

  angular.forEach(proto, function(fn, key) {
    angular.element.prototype[key] = fn;

    //Remove prefix if not already claimed by jQuery / ui.utils
    var unprefixed = key.replace(/^duScroll/, 'scroll');
    if(angular.isUndefined(angular.element.prototype[unprefixed])) {
      angular.element.prototype[unprefixed] = fn;
    }
  });

}]);


//Adapted from https://gist.github.com/paulirish/1579671
angular.module('duScroll.polyfill', [])
.factory('polyfill', ["$window", function($window) {
  'use strict';

  var vendors = ['webkit', 'moz', 'o', 'ms'];

  return function(fnName, fallback) {
    if($window[fnName]) {
      return $window[fnName];
    }
    var suffix = fnName.substr(0, 1).toUpperCase() + fnName.substr(1);
    for(var key, i = 0; i < vendors.length; i++) {
      key = vendors[i]+suffix;
      if($window[key]) {
        return $window[key];
      }
    }
    return fallback;
  };
}]);

angular.module('duScroll.requestAnimation', ['duScroll.polyfill'])
.factory('requestAnimation', ["polyfill", "$timeout", function(polyfill, $timeout) {
  'use strict';

  var lastTime = 0;
  var fallback = function(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = $timeout(function() { callback(currTime + timeToCall); },
      timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

  return polyfill('requestAnimationFrame', fallback);
}])
.factory('cancelAnimation', ["polyfill", "$timeout", function(polyfill, $timeout) {
  'use strict';

  var fallback = function(promise) {
    $timeout.cancel(promise);
  };

  return polyfill('cancelAnimationFrame', fallback);
}]);


angular.module('duScroll.spyAPI', ['duScroll.scrollContainerAPI'])
.factory('spyAPI', ["$rootScope", "$timeout", "$interval", "$window", "$document", "scrollContainerAPI", "duScrollGreedy", "duScrollSpyWait", "duScrollSpyRefreshInterval", "duScrollBottomSpy", "duScrollActiveClass", function($rootScope, $timeout, $interval, $window, $document, scrollContainerAPI, duScrollGreedy, duScrollSpyWait, duScrollSpyRefreshInterval, duScrollBottomSpy, duScrollActiveClass) {
  'use strict';

  var createScrollHandler = function(context) {
    var timer = false, queued = false;
    var handler = function() {
      queued = false;
      var container = context.container,
          containerEl = container[0],
          containerOffset = 0,
          bottomReached;

      if (typeof HTMLElement !== 'undefined' && containerEl instanceof HTMLElement || containerEl.nodeType && containerEl.nodeType === containerEl.ELEMENT_NODE) {
        containerOffset = containerEl.getBoundingClientRect().top;
        bottomReached = Math.round(containerEl.scrollTop + containerEl.clientHeight) >= containerEl.scrollHeight;
      } else {
        var documentScrollHeight = $document[0].body.scrollHeight || $document[0].documentElement.scrollHeight; // documentElement for IE11
        bottomReached = Math.round($window.pageYOffset + $window.innerHeight) >= documentScrollHeight;
      }
      var compareProperty = (duScrollBottomSpy && bottomReached ? 'bottom' : 'top');

      var i, currentlyActive, toBeActive, spies, spy, pos;
      spies = context.spies;
      currentlyActive = context.currentlyActive;
      toBeActive = undefined;

      for(i = 0; i < spies.length; i++) {
        spy = spies[i];
        pos = spy.getTargetPosition();
        if (!pos || !spy.$element) continue;

        if((duScrollBottomSpy && bottomReached) || (pos.top + spy.offset - containerOffset < 20 && (duScrollGreedy || pos.top*-1 + containerOffset) < pos.height)) {
          //Find the one closest the viewport top or the page bottom if it's reached
          if(!toBeActive || toBeActive[compareProperty] < pos[compareProperty]) {
            toBeActive = {
              spy: spy
            };
            toBeActive[compareProperty] = pos[compareProperty];
          }
        }
      }

      if(toBeActive) {
        toBeActive = toBeActive.spy;
      }
      if(currentlyActive === toBeActive || (duScrollGreedy && !toBeActive)) return;
      if(currentlyActive && currentlyActive.$element) {
        currentlyActive.$element.removeClass(duScrollActiveClass);
        $rootScope.$broadcast(
          'duScrollspy:becameInactive',
          currentlyActive.$element,
          angular.element(currentlyActive.getTargetElement())
        );
      }
      if(toBeActive) {
        toBeActive.$element.addClass(duScrollActiveClass);
        $rootScope.$broadcast(
          'duScrollspy:becameActive',
          toBeActive.$element,
          angular.element(toBeActive.getTargetElement())
        );
      }
      context.currentlyActive = toBeActive;
    };

    if(!duScrollSpyWait) {
      return handler;
    }

    //Debounce for potential performance savings
    return function() {
      if(!timer) {
        handler();
        timer = $timeout(function() {
          timer = false;
          if(queued) {
            handler();
          }
        }, duScrollSpyWait, false);
      } else {
        queued = true;
      }
    };
  };

  var contexts = {};

  var createContext = function($scope) {
    var id = $scope.$id;
    var context = {
      spies: []
    };

    context.handler = createScrollHandler(context);
    contexts[id] = context;

    $scope.$on('$destroy', function() {
      destroyContext($scope);
    });

    return id;
  };

  var destroyContext = function($scope) {
    var id = $scope.$id;
    var context = contexts[id], container = context.container;
    if(context.intervalPromise) {
      $interval.cancel(context.intervalPromise);
    }
    if(container) {
      container.off('scroll', context.handler);
    }
    delete contexts[id];
  };

  var defaultContextId = createContext($rootScope);

  var getContextForScope = function(scope) {
    if(contexts[scope.$id]) {
      return contexts[scope.$id];
    }
    if(scope.$parent) {
      return getContextForScope(scope.$parent);
    }
    return contexts[defaultContextId];
  };

  var getContextForSpy = function(spy) {
    var context, contextId, scope = spy.$scope;
    if(scope) {
      return getContextForScope(scope);
    }
    //No scope, most likely destroyed
    for(contextId in contexts) {
      context = contexts[contextId];
      if(context.spies.indexOf(spy) !== -1) {
        return context;
      }
    }
  };

  var isElementInDocument = function(element) {
    while (element.parentNode) {
      element = element.parentNode;
      if (element === document) {
        return true;
      }
    }
    return false;
  };

  var addSpy = function(spy) {
    var context = getContextForSpy(spy);
    if (!context) return;
    context.spies.push(spy);
    if (!context.container || !isElementInDocument(context.container)) {
      if(context.container) {
        context.container.off('scroll', context.handler);
      }
      context.container = scrollContainerAPI.getContainer(spy.$scope);
      if (duScrollSpyRefreshInterval && !context.intervalPromise) {
        context.intervalPromise = $interval(context.handler, duScrollSpyRefreshInterval, 0, false);
      }
      context.container.on('scroll', context.handler).triggerHandler('scroll');
    }
  };

  var removeSpy = function(spy) {
    var context = getContextForSpy(spy);
    if(spy === context.currentlyActive) {
      $rootScope.$broadcast('duScrollspy:becameInactive', context.currentlyActive.$element);
      context.currentlyActive = null;
    }
    var i = context.spies.indexOf(spy);
    if(i !== -1) {
      context.spies.splice(i, 1);
    }
		spy.$element = null;
  };

  return {
    addSpy: addSpy,
    removeSpy: removeSpy,
    createContext: createContext,
    destroyContext: destroyContext,
    getContextForScope: getContextForScope
  };
}]);


angular.module('duScroll.scrollContainerAPI', [])
.factory('scrollContainerAPI', ["$document", function($document) {
  'use strict';

  var containers = {};

  var setContainer = function(scope, element) {
    var id = scope.$id;
    containers[id] = element;
    return id;
  };

  var getContainerId = function(scope) {
    if(containers[scope.$id]) {
      return scope.$id;
    }
    if(scope.$parent) {
      return getContainerId(scope.$parent);
    }
    return;
  };

  var getContainer = function(scope) {
    var id = getContainerId(scope);
    return id ? containers[id] : $document;
  };

  var removeContainer = function(scope) {
    var id = getContainerId(scope);
    if(id) {
      delete containers[id];
    }
  };

  return {
    getContainerId:   getContainerId,
    getContainer:     getContainer,
    setContainer:     setContainer,
    removeContainer:  removeContainer
  };
}]);


angular.module('duScroll.smoothScroll', ['duScroll.scrollHelpers', 'duScroll.scrollContainerAPI'])
.directive('duSmoothScroll', ["duScrollDuration", "duScrollOffset", "scrollContainerAPI", function(duScrollDuration, duScrollOffset, scrollContainerAPI) {
  'use strict';

  return {
    link : function($scope, $element, $attr) {
      $element.on('click', function(e) {
        if((!$attr.href || $attr.href.indexOf('#') === -1) && $attr.duSmoothScroll === '') return;

        var id = $attr.href ? $attr.href.replace(/.*(?=#[^\s]+$)/, '').substring(1) : $attr.duSmoothScroll;

        var target = document.getElementById(id) || document.getElementsByName(id)[0];
        if(!target || !target.getBoundingClientRect) return;

        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();

        var offset    = $attr.offset ? parseInt($attr.offset, 10) : duScrollOffset;
        var duration  = $attr.duration ? parseInt($attr.duration, 10) : duScrollDuration;
        var container = scrollContainerAPI.getContainer($scope);

        container.duScrollToElement(
          angular.element(target),
          isNaN(offset) ? 0 : offset,
          isNaN(duration) ? 0 : duration
        );
      });
    }
  };
}]);


angular.module('duScroll.spyContext', ['duScroll.spyAPI'])
.directive('duSpyContext', ["spyAPI", function(spyAPI) {
  'use strict';

  return {
    restrict: 'A',
    scope: true,
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink($scope, iElement, iAttrs, controller) {
          spyAPI.createContext($scope);
        }
      };
    }
  };
}]);


angular.module('duScroll.scrollContainer', ['duScroll.scrollContainerAPI'])
.directive('duScrollContainer', ["scrollContainerAPI", function(scrollContainerAPI){
  'use strict';

  return {
    restrict: 'A',
    scope: true,
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink($scope, iElement, iAttrs, controller) {
          iAttrs.$observe('duScrollContainer', function(element) {
            if(angular.isString(element)) {
              element = document.getElementById(element);
            }

            element = (angular.isElement(element) ? angular.element(element) : iElement);
            scrollContainerAPI.setContainer($scope, element);
            $scope.$on('$destroy', function() {
              scrollContainerAPI.removeContainer($scope);
            });
          });
        }
      };
    }
  };
}]);


angular.module('duScroll.scrollspy', ['duScroll.spyAPI'])
.directive('duScrollspy', ["spyAPI", "duScrollOffset", "$timeout", "$rootScope", function(spyAPI, duScrollOffset, $timeout, $rootScope) {
  'use strict';

  var Spy = function(targetElementOrId, $scope, $element, offset) {
    if(angular.isElement(targetElementOrId)) {
      this.target = targetElementOrId;
    } else if(angular.isString(targetElementOrId)) {
      this.targetId = targetElementOrId;
    }
    this.$scope = $scope;
    this.$element = $element;
    this.offset = offset;
  };

  Spy.prototype.getTargetElement = function() {
    if (!this.target && this.targetId) {
      this.target = document.getElementById(this.targetId) || document.getElementsByName(this.targetId)[0];
    }
    return this.target;
  };

  Spy.prototype.getTargetPosition = function() {
    var target = this.getTargetElement();
    if(target) {
      return target.getBoundingClientRect();
    }
  };

  Spy.prototype.flushTargetCache = function() {
    if(this.targetId) {
      this.target = undefined;
    }
  };

  return {
    link: function ($scope, $element, $attr) {
      var href = $attr.ngHref || $attr.href;
      var targetId;

      if (href && href.indexOf('#') !== -1) {
        targetId = href.replace(/.*(?=#[^\s]+$)/, '').substring(1);
      } else if($attr.duScrollspy) {
        targetId = $attr.duScrollspy;
      } else if($attr.duSmoothScroll) {
        targetId = $attr.duSmoothScroll;
      }
      if(!targetId) return;

      // Run this in the next execution loop so that the scroll context has a chance
      // to initialize
      var timeoutPromise = $timeout(function() {
        var spy = new Spy(targetId, $scope, $element, -($attr.offset ? parseInt($attr.offset, 10) : duScrollOffset));
        spyAPI.addSpy(spy);

        $scope.$on('$locationChangeSuccess', spy.flushTargetCache.bind(spy));
        var deregisterOnStateChange = $rootScope.$on('$stateChangeSuccess', spy.flushTargetCache.bind(spy));
        $scope.$on('$destroy', function() {
          spyAPI.removeSpy(spy);
          deregisterOnStateChange();
        });
      }, 0, false);
      $scope.$on('$destroy', function() {$timeout.cancel(timeoutPromise);});
    }
  };
}]);